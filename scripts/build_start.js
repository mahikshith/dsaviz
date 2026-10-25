// Data the Start here build needs, printed as JSON:
//   watch     [{ id, code, stdin }]: the "Watch it run" program of every ready lesson (traced by scripts/build_pages.py)
//   problems  { spec id: [title, 'Pattern · Difficulty'] } for every problem in src/start/needs.js, so the hub can
//             list first problems without loading every test spec.
//   medals    the Start here medal set for DS (shared/data.js): one per Level 1 chapter (parts 1 to 4), one for the
//             bridge and counting steps (parts 5 and 6), and one per part of Levels 2 and 3, each with its lesson and exercise ids.
//   outline   [id, level, part, n, short, ready] for every lesson: DS.startCounts() counts from it on every page.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
const S = new Function(require('./start_files.js').startSource(false) + '\nreturn { START_CHAPTERS, START_NEEDS, START_EXERCISES };')();
const win = { localStorage: { getItem: () => null, setItem() {} } };
const T = new Function('module', 'window', read('shared', 'catalog.js') + '\n' + read('shared', 'tests_spec.js') + '\nreturn { specInfo, TEST_SPECS };')({}, win);
const problems = {};
Object.keys(S.START_NEEDS).forEach((id) => { if (T.TEST_SPECS[id]) { const P = T.specInfo(id); problems[id] = [P.title, P.pattern + ' · ' + P.diff]; } });
// [parts, label, mark]: Level 1 by chapter, then the bridge with counting steps, then each part of Levels 2 and 3.
const MEDAL_SETS = [[[1], 'Start ch 1', 'S1'], [[2], 'Start ch 2', 'S2'], [[3], 'Start ch 3', 'S3'], [[4], 'Start ch 4', 'S4'], [[5, 6], 'Bridge', 'BR'],
  [[7], 'Calls & stack', 'F1'], [[8], 'Arguments', 'F2'], [[9], 'Function values', 'F3'], [[10], 'Recursion', 'F4'],
  [[11], 'Objects', 'O1'], [[12], 'References', 'O2'], [[13], 'Family trees', 'O3'], [[14], 'Building well', 'O4']];
// A set joins the shelf once every lesson in it is written.
const medals = MEDAL_SETS.filter(([parts]) => { const ls = S.START_CHAPTERS.filter((c) => parts.includes(c.part)); return ls.length && ls.every((c) => c.ready); }).map(([parts, label, mark]) => {
  const ls = S.START_CHAPTERS.filter((c) => parts.includes(c.part));
  return { level: ls.length ? (ls[0].level || 1) : 1, part: parts[0], label, mark, lessons: ls.map((c) => c.id),
    exercises: [].concat(...ls.map((c) => (S.START_EXERCISES[c.id] || []).map((e) => e.id))) };
});
const outline = S.START_CHAPTERS.map((c) => [c.id, c.level || 1, c.part, c.n, c.short, c.ready ? 1 : 0]);
process.stdout.write(JSON.stringify({
  watch: S.START_CHAPTERS.filter((c) => c.ready && c.watch).map((c) => ({ id: c.id, code: c.watch.code, stdin: c.watch.stdin || [], heap: !!c.watch.heap })),
  problems,
  medals,
  outline
}));
