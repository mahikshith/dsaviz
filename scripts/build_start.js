// Data the Start here build needs, printed as JSON:
//   watch     [{ id, code, stdin }]: the "Watch it run" program of every ready lesson (traced by scripts/build_pages.py)
//   problems  { spec id: [title, 'Pattern · Difficulty'] } for every problem in src/start/needs.js, so the hub can
//             list first problems without loading every test spec.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
const S = new Function(require('./start_files.js').startSource(false) + '\nreturn { START_CHAPTERS, START_NEEDS };')();
const win = { localStorage: { getItem: () => null, setItem() {} } };
const T = new Function('module', 'window', read('shared', 'catalog.js') + '\n' + read('shared', 'tests_spec.js') + '\nreturn { specInfo, TEST_SPECS };')({}, win);
const problems = {};
Object.keys(S.START_NEEDS).forEach((id) => { if (T.TEST_SPECS[id]) { const P = T.specInfo(id); problems[id] = [P.title, P.pattern + ' · ' + P.diff]; } });
process.stdout.write(JSON.stringify({
  watch: S.START_CHAPTERS.filter((c) => c.ready && c.watch).map((c) => ({ id: c.id, code: c.watch.code, stdin: c.watch.stdin || [] })),
  problems
}));
