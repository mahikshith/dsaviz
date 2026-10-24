// Builds the site search index from the shared data and prints it as JSON.
// scripts/build_pages.py runs this and writes the result into the // @@SEARCH@@ block of every page with the pill nav.
// tests/searchcheck.js loads it too, so the index and the test always agree.
//
// Each item is [type, id, title, sub, keywords]. Types, in the order results are grouped when scores tie:
//   story    an animated story (catalog problem with animated: true)  -> Story page
//   start    a Start here lesson that is ready                       -> Chapter page
//   pattern  one of the 16 patterns                                   -> Library, pattern view
//   problem  a problem with runnable tests (TEST_SPECS and SQL_SPECS) -> Code page
//   git      a Git lesson                                             -> Git page
//   sd       a system design lesson                                   -> SDLesson page
//   ai       an AI & ML lesson                                        -> AILesson page
//   term     a glossary keyword                                       -> Glossary page
//   sheet    a master sheet row                                       -> Sheet page
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8').replace(/\r\n/g, '\n');

function load() {
  const store = {};
  const win = { localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } }, matchMedia: () => ({ matches: false }) };
  const data = new Function('window', read('shared', 'catalog.js') + '\n' + read('shared', 'sheet.js') +
    '\nreturn { PATTERNS, PROBLEMS, SHEET };')(win);
  const spec = new Function('module', 'window', read('shared', 'catalog.js') + '\n' + read('shared', 'tests_spec.js') +
    '\nreturn { TEST_SPECS, specInfo };')({}, win);
  const sql = new Function('module', read('shared', 'sql_spec.js') + '\nreturn SQL_SPECS;')({});
  const git = new Function(read('src', 'git', 'sim.js') + '\n' + read('src', 'git', 'lessons.js') + '\nreturn GIT_LESSONS;')();
  const sd = new Function('window', read('src', 'sd', 'engine.js') + '\n' + read('src', 'sd', 'lessons.js') + '\nreturn SD_LESSONS;')(win);
  const ai = new Function(read('src', 'ai', 'render.js') + '\n' + read('src', 'ai', 'lessons.js') + '\nreturn { AI_LESSONS, AI_TRACKS };')();
  const start = new Function(read('src', 'start', 'engine.js') + '\n' + read('src', 'start', 'chapters.js') + '\nreturn { START_CHAPTERS, START_PARTS };')();
  // The glossary keeps its keywords in the Glossary page's own script.
  const gloss = read('pages', 'Glossary.dc.html');
  const a = gloss.indexOf('const KEYWORDS = [');
  const b = gloss.indexOf('\n];', a) + 3;
  if (a < 0 || b < 3) throw new Error('KEYWORDS not found in pages/Glossary.dc.html');
  const KEYWORDS = new Function(gloss.slice(a, b) + '\nreturn KEYWORDS;')();
  return Object.assign(data, spec, { sql, git, sd, ai, KEYWORDS, start });
}

function build() {
  const D = load();
  const items = [];
  const add = (type, id, title, sub, kw) => items.push([type, id, title, sub, [...new Set((kw || []).filter(Boolean))].join(' ')]);
  const animated = D.PROBLEMS.filter((p) => p.animated);
  // sub is the second line of a result; the group header already names the type. kw holds extra words to match.
  animated.forEach((p) => add('story', p.id, p.title, p.story + ' · ' + p.pattern, [String(p.n)]));
  const ready = D.start.START_CHAPTERS.filter((c) => c.ready);
  ready.forEach((c) => add('start', c.id, c.title, 'Level ' + (c.level || 1) + ' · Lesson ' + c.n + ' · ' + c.short, ['beginner', 'start here', 'basics'].concat(c.teaches)));
  D.PATTERNS.forEach(([name, tag, cast]) => add('pattern', name, name, tag, [cast]));
  Object.keys(D.TEST_SPECS).forEach((id) => {
    const P = D.specInfo(id);
    add('problem', id, P.title, P.pattern + ' · ' + P.diff, [String(P.n)]);
  });
  Object.keys(D.sql).forEach((id) => add('problem', id, D.sql[id].title, 'SQL · ' + D.sql[id].diff, [String(D.sql[id].n), 'sql']));
  D.git.forEach((L) => add('git', L.id, L.title, L.tag, ['git']));
  D.sd.forEach((L) => add('sd', L.id, L.title, (L.track === 'lld' ? 'LLD' : 'HLD') + ' · ' + L.tag));
  const track = {};
  D.ai.AI_TRACKS.forEach((t) => { track[t.id] = t.short; });
  D.ai.AI_LESSONS.forEach((L) => add('ai', L.id, L.title, track[L.track] + ' · ' + L.tag));
  D.KEYWORDS.forEach((k) => add('term', k.id, k.id, k.gist, [k.cat]));
  D.SHEET.forEach((r) => add('sheet', r.id, r.name, r.pattern + ' · ' + r.diff, [String(r.n)]));
  // only the 16 patterns count here; stories in sheet groups (Graphs, Tries) are extra
  const names = new Set(D.PATTERNS.map((p) => p[0]));
  const patterns = new Set(animated.map((p) => p.pattern).filter((x) => names.has(x)));
  const counts = {
    stories: animated.length, storyPatterns: patterns.size, patterns: D.PATTERNS.length, catalog: D.PROBLEMS.length,
    sheet: D.SHEET.length, runnable: Object.keys(D.TEST_SPECS).length, sql: Object.keys(D.sql).length,
    git: D.git.length, sd: D.sd.length, ai: D.ai.AI_LESSONS.length, terms: D.KEYWORDS.length, start: ready.length
  };
  return { items, counts };
}

if (require.main === module) process.stdout.write(JSON.stringify(build()));
module.exports = { build };
