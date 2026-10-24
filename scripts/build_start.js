// Data the Start here build needs, printed as JSON:
//   watch     [{ id, code, stdin }]: the "Watch it run" program of every ready lesson (traced by scripts/build_pages.py)
//   problems  { spec id: [title, 'Pattern · Difficulty'] } for every problem in src/start/needs.js, so the hub can
//             list first problems without loading every test spec.
//   medals    the beginner medal set for DS (shared/data.js): one per Level 1 chapter (parts 1 to 4) and one for the
//             bridge (part 5), each with its lesson and exercise ids.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
const S = new Function(require('./start_files.js').startSource(false) + '\nreturn { START_CHAPTERS, START_NEEDS, START_EXERCISES };')();
const win = { localStorage: { getItem: () => null, setItem() {} } };
const T = new Function('module', 'window', read('shared', 'catalog.js') + '\n' + read('shared', 'tests_spec.js') + '\nreturn { specInfo, TEST_SPECS };')({}, win);
const problems = {};
Object.keys(S.START_NEEDS).forEach((id) => { if (T.TEST_SPECS[id]) { const P = T.specInfo(id); problems[id] = [P.title, P.pattern + ' · ' + P.diff]; } });
const medals = [1, 2, 3, 4, 5].map((part) => {
  const ls = S.START_CHAPTERS.filter((c) => (c.level || 1) === 1 && c.part === part);
  return { part, label: part === 5 ? 'Bridge' : 'Start ch ' + part, mark: part === 5 ? 'BR' : 'S' + part, lessons: ls.map((c) => c.id),
    exercises: [].concat(...ls.map((c) => (S.START_EXERCISES[c.id] || []).map((e) => e.id))) };
});
process.stdout.write(JSON.stringify({
  watch: S.START_CHAPTERS.filter((c) => c.ready && c.watch).map((c) => ({ id: c.id, code: c.watch.code, stdin: c.watch.stdin || [] })),
  problems,
  medals
}));
