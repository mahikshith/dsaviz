// Copy check: fails when page copy goes stale. Explanations are one plain level with a "Go deeper" fold now
// (no Kid / Builder / Expert switch), there are no video lessons or narration, early access is free, and
// counts come from the data (SITE_INDEX.counts), not from numbers typed into the markup.
// Scans every page's markup and its own script (generated blocks are checked at their source in shared/ and src/).
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
let problems = 0;
const fail = (where, msg) => { problems++; console.log('  ✗', where, msg); };

// Generated script blocks: their sources (shared/, src/) are scanned on their own below.
const BLOCKS = ['THEMES', 'CATALOG', 'SHEET', 'SHEET-COUNT', 'DATA', 'DRAWER', 'UI', 'SEARCH', 'FIND', 'NAV', 'TESTS-SPEC', 'RUNNER', 'CODE-PANE', 'SQL-SPEC', 'SQL-PANE', 'GITSIM', 'SDLESSONS', 'AILESSONS', 'CONCEPTS', 'CONCEPT-MAP', 'CONTESTS', 'MOCK-HINTS'];
function stripBlocks(s) {
  BLOCKS.forEach((b) => {
    const start = '// @@' + b + '@@', end = b === 'CATALOG' ? '// @@END@@' : '// @@END-' + b + '@@';
    let i;
    while ((i = s.indexOf(start)) >= 0) { const j = s.indexOf(end, i); if (j < 0) break; s = s.slice(0, i) + s.slice(j + end.length); }
  });
  return s;
}

// Rules for any copy (markup and script strings).
const ANY = [
  [/\b(kid|builder|expert)[ -](depth|version|level|mode)\b/i, 'old Kid / Builder / Expert depth wording'],
  [/\bat (kid|builder|expert) depth\b/i, 'old depth wording'],
  [/depth you pick|your depth\b|story depth/i, 'old depth switch'],
  [/like (you'?re|you’re|I'?m|I’m) a kid/i, 'old "explain like a kid" wording'],
  [/\b(video lessons?|narrated|narration|voice-?over)\b/i, 'video or narration (there is none)'],
  [/trial is running|start 3-day free trial|no card for the trial|3 days free|you both get 7 more days/i, 'trial copy that contradicts free early access'],
  [/rebuild the code|shuffled lines|three small quests/i, 'a feature that does not exist']
];
// Rules for visible markup only.
const MARKUP = [
  [/>\s*(Kid|Builder|Expert)\s*</, 'a Kid / Builder / Expert label'],
  [/>[^<{]*\b\d+ (animated )?(stories|practice problems|sheet problems|runnable problems)\b/i, 'a hard-coded count; read it from SITE_INDEX.counts'],
  [/>[^<{]*![^<]*</, 'an exclamation mark in page copy']
];

function check(where, text, markup) {
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    ANY.forEach(([re, msg]) => { if (re.test(line)) fail(where + ':' + (i + 1), msg + ': ' + line.trim().slice(0, 100)); });
    if (markup) MARKUP.forEach(([re, msg]) => { const m = line.replace(/<!--.*?-->/g, '').match(re); if (m) fail(where + ':' + (i + 1), msg + ': ' + m[0].slice(0, 100)); });
  });
}

const pagesDir = path.join(root, 'pages');
let scanned = 0;
fs.readdirSync(pagesDir).filter((f) => f.endsWith('.dc.html')).forEach((f) => {
  const src = fs.readFileSync(path.join(pagesDir, f), 'utf8');
  const a = src.indexOf('<x-dc>'), b = src.indexOf('</x-dc>');
  const markup = src.slice(a, b).replace(/<style[\s\S]*?<\/style>/g, (m) => m.replace(/[^\n]/g, ''));
  check(f, markup, true);
  const m = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
  if (m) check(f + ' (script)', stripBlocks(m[1]), false);
  scanned++;
});
// Sources of the generated blocks and bodies.
[['shared', ['drawer.html', 'drawer.js', 'nav.js', 'search.js', 'data.js', 'contests.js']], ['shared/ui', ['nav.html', 'tiles.html', 'rings.html', 'medals.html']],
  ['src/pages', null], ['src/code', ['code_body.html', 'code.js']], ['src/story', ['story_body.html', 'comp.js']], ['src/concepts', null]].forEach(([dir, files]) => {
  const d = path.join(root, dir);
  (files || fs.readdirSync(d)).forEach((f) => { check(dir + '/' + f, fs.readFileSync(path.join(d, f), 'utf8'), f.endsWith('.html')); scanned++; });
});
// Entry points that resume or open a problem say "Continue: <problem title>" (or "Start: ..."), never "Replay" or a story name.
['pages/Patterns.dc.html', 'pages/Home.dc.html', 'shared/drawer.js', 'shared/catalog.js', 'src/pages/profile.js'].forEach((f) => {
  fs.readFileSync(path.join(root, f), 'utf8').split(/\r?\n/).forEach((line, i) => {
    if (/SITE_INDEX\s*=/.test(line)) return;
    if (/['">]Replay\b|Play story|Read story/.test(line)) fail(f + ':' + (i + 1), 'a Replay / Play story label; use "Continue: <problem title>" or "Start: ..."');
  });
});
// No named mascots (CLAUDE.md): the cast is gone outside the Start here track, which has its own check (tests/startcheck.js).
// Case-sensitive whole words, so ordinary words such as "dot product" or "bolt" in lower case do not match.
const MASCOT = /\b(Old Hoot|Hoot|Lumi|Roo|Bolt|Pip)\b/;
const MASCOT_SKIP = ['Start.dc.html', 'Chapter.dc.html'];
function checkMascots(where, text) {
  // the Start here data generated into Home (@@START-LITE@@) belongs to the Start track's check
  text = text.replace(/\/\/ @@START-LITE@@[\s\S]*?\/\/ @@END-START-LITE@@/g, '');
  text.split('\n').forEach((line, i) => {
    const m = line.match(MASCOT);
    if (m) fail(where + ':' + (i + 1), 'a named mascot "' + m[0] + '" in learner text; use a plain role: ' + line.trim().slice(0, 100));
  });
}
function walk(dir, exts) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full, exts));
    else if (exts.some((x) => e.name.endsWith(x))) out.push(full);
  });
  return out;
}
fs.readdirSync(pagesDir).filter((f) => f.endsWith('.dc.html') && !MASCOT_SKIP.includes(f)).forEach((f) => {
  checkMascots(f, fs.readFileSync(path.join(pagesDir, f), 'utf8'));
});
['shared', 'src/story', 'src/code', 'src/pages'].forEach((dir) => {
  walk(path.join(root, dir), ['.js', '.html']).forEach((full) => {
    checkMascots(path.relative(root, full).split(path.sep).join('/'), fs.readFileSync(full, 'utf8'));
  });
});
// "i" explainers (CLAUDE.md, shared/ui/phone.html): every <span class="ds-tip"> in a page holds a button whose
// aria-describedby names the role="tooltip" span beside it, and the tooltip ids are unique on the page.
// CSS comments are skipped first, so the example in the phone CSS comment does not count.
fs.readdirSync(pagesDir).filter((f) => f.endsWith('.dc.html')).forEach((f) => {
  const src = fs.readFileSync(path.join(pagesDir, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const tipWord = (src.match(/class="ds-tip"/g) || []).length;
  const blocks = [...src.matchAll(/<span class="ds-tip">([\s\S]*?)<\/span><\/span>/g)].map((m) => m[1]);
  if (blocks.length !== tipWord) fail(f, 'a class="ds-tip" span that is not a button plus tooltip pair');
  const ids = [];
  blocks.forEach((b) => {
    const btn = b.match(/<button[^>]*aria-describedby="([^"]+)"[^>]*>/);
    const tip = b.match(/<span role="tooltip" id="([^"]+)"/);
    if (!btn || !tip) { fail(f, 'ds-tip without a button with aria-describedby and a role="tooltip" span'); return; }
    if (btn[1] !== tip[1]) fail(f, 'aria-describedby "' + btn[1] + '" does not match tooltip id "' + tip[1] + '"');
    if (!/onClick="/.test(btn[0])) fail(f, 'ds-tip button without onClick: ' + tip[1]);
    ids.push(tip[1]);
  });
  ids.filter((id, i) => ids.indexOf(id) !== i).forEach((id) => fail(f, 'duplicate tip id ' + id));
});

console.log('copy: ' + scanned + ' files scanned');
console.log(problems ? problems + ' copy problem(s)' : 'copy clean');
if (problems) process.exitCode = 1;
