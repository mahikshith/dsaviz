// "Why learn this?" check: every lesson (AI & ML, DSA concepts, System design, Start here) has About data the fold is built from
// (a `what` sentence and at least one `uses` line), every pattern the site knows has its own text in src/why.js, and every track
// hub has one. The text itself is held to the readability rules in tests/readcheck.js.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8').replace(/\r\n/g, '\n');
let bad = 0;
const fail = (id, msg) => { bad++; console.log('  ✗', id, msg); };

const W = new Function(read('src', 'why.js') + '\nreturn WHY;')();
const A = new Function(read('shared', 'about.js') + '\nreturn { whyFromAbout, whyVals };')();
const win = { localStorage: { getItem: () => null, setItem() {} }, matchMedia: () => ({ matches: false }) };

// Lessons and their About data.
const ai = new Function(read('src', 'ai', 'render.js') + '\n' + read('src', 'ai', 'lessons.js') + '\nreturn AI_LESSONS;')().map((L) => L.id);
const sd = new Function('window', read('src', 'sd', 'engine.js') + '\n' + read('src', 'sd', 'lessons.js') + '\nreturn SD_LESSONS;')(win).map((L) => L.id);
const cs = new Function(read('src', 'concepts', 'lessons.js') + '\nreturn CS_LESSONS;')().map((L) => L.id);
const S = new Function(read('src', 'ai', 'render.js') + '\n' + require('../scripts/start_files.js').startSource() + '\nreturn { START_CHAPTERS };')();
const start = S.START_CHAPTERS.filter((c) => c.ready).map((c) => c.id);
const about = (dir, file, key) => require(path.join(root, 'src', dir, file))[key];
const sets = [
  ['ai', ai, Object.assign({}, about('ai', 'about_ml.js', 'AI_ABOUT_ML'), about('ai', 'about_now.js', 'AI_ABOUT_NOW'))],
  ['sd', sd, Object.assign({}, about('sd', 'about_hld.js', 'SD_ABOUT_HLD'), about('sd', 'about_lld.js', 'SD_ABOUT_LLD'))],
  ['dsa', cs, Object.assign({}, about('concepts', 'about_a.js', 'CONCEPT_ABOUT_A'), about('concepts', 'about_b.js', 'CONCEPT_ABOUT_B'))],
  ['start', start, about('start', 'about.js', 'START_ABOUT')]
];
let lessons = 0;
for (const [track, ids, data] of sets) {
  if (!ids.length) fail(track, 'no lessons found');
  for (const id of ids) {
    lessons++;
    const w = A.whyFromAbout(data[id]);
    if (!w) { fail(track + ':' + id, 'no About `what`, so no Why text'); continue; }
    if (!w.does) fail(track + ':' + id, 'empty first sentence');
    if (!w.where.length) fail(track + ':' + id, 'no `uses`, so nothing for "where it shows up"');
  }
}

// Patterns: every name the catalog, the problems and the pattern intros use.
const cat = new Function('window', read('shared', 'catalog.js') + '\nreturn { PATTERNS, PROBLEMS, PATTERN_WHEN };')(win);
const names = new Set(cat.PATTERNS.map((p) => p[0]));
cat.PROBLEMS.forEach((p) => { if (p.pattern) names.add(p.pattern); });
Object.keys(cat.PATTERN_WHEN).forEach((n) => names.add(n));
for (const n of names) {
  const e = W.patterns[n];
  if (!e || e.length !== 3 || e.some((x) => !x)) fail('pattern:' + n, 'needs three sentences in src/why.js (what it lets you do, a real app, an interview)');
}
Object.keys(W.patterns).forEach((n) => { if (!names.has(n)) fail('pattern:' + n, 'in src/why.js but not a pattern the site has'); });

// Hubs.
['start', 'concepts', 'sd', 'ai', 'patterns', 'git', 'complexity'].forEach((h) => {
  const e = W.hubs[h];
  if (!e || e.length !== 3 || e.some((x) => !x)) fail('hub:' + h, 'needs three sentences in src/why.js');
});
Object.keys(W.hubs).forEach((h) => { if (!['start', 'concepts', 'sd', 'ai', 'patterns', 'git', 'complexity'].includes(h)) fail('hub:' + h, 'unknown hub'); });

// Every page that still shows the fold has its marker and feeds it values. The five lesson pages (step 2 of PLAN-2026-11) no longer
// show it: they must not carry the phrase, the block or the values.
const pages = { Start: 'whyHub', Concepts: 'whyHub', SystemDesign: 'whyHub', AIML: 'whyHub', Complexity: 'whyHub', Briefing: 'whyPattern', Story: 'whyPattern' };
for (const [pg, fn] of Object.entries(pages)) {
  const s = read('pages', pg + '.dc.html');
  if (!s.includes('<!-- WHY -->') || !s.includes('{{why.does}}')) fail(pg, 'no Why block');
  if (!s.includes('why: whyVals(' + fn)) fail(pg, 'renderVals does not pass why: whyVals(' + fn + '(...))');
}
// The Roadmap (the Patterns page, step 5) has no Why block either.
for (const pg of ['Chapter', 'ConceptLesson', 'SDLesson', 'AILesson', 'Git', 'Patterns']) {
  const s = read('pages', pg + '.dc.html');
  const body = s.slice(s.indexOf('</helmet>'), s.indexOf('<script type="text/x-dc"'));
  if (/Why learn this/i.test(body)) fail(pg, '"Why learn this?" is shown on a lesson page');
  if (body.includes('<!-- WHY -->') || body.includes('{{why.')) fail(pg, 'still has a Why block');
}

console.log('Why learn this: ' + lessons + ' lessons, ' + names.size + ' patterns, 7 hubs');
console.log(bad ? bad + ' problem(s)' : 'why clean');
if (bad) process.exitCode = 1;
