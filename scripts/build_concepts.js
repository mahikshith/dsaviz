// Concept lesson data the other pages need, printed as JSON for scripts/build_pages.py:
//   rows: sheet row id -> [title, difficulty, group] for every "Now try" problem (the lesson player's links)
//   map:  sheet group -> [[lesson id, title], ...] (the pattern map's lesson links on the Patterns page)
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');

function build() {
  const win = { localStorage: { getItem: () => null, setItem: () => {} } };
  const { SHEET } = new Function('window', read('shared', 'catalog.js') + '\n' + read('shared', 'sheet.js') + '\nreturn { SHEET };')(win);
  const { CS_LESSONS } = new Function(read('src', 'ai', 'render.js') + '\n' + read('src', 'concepts', 'lessons.js') + '\nreturn { CS_LESSONS };')();
  const byId = {}; SHEET.forEach((r) => { byId[r.id] = r; });
  const rows = {}; const map = {};
  CS_LESSONS.forEach((L) => {
    L.tryIt.forEach((id) => { const r = byId[id]; if (r) rows[id] = [r.name, r.diff, r.pattern]; });
    L.groups.forEach((g) => { (map[g] = map[g] || []).push([L.id, L.title]); });
  });
  return { rows, map };
}
if (require.main === module) process.stdout.write(JSON.stringify(build()));
module.exports = { build };
