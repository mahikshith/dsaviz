// Reads the master sheet (shared/sheet.js) the way the pages do and prints what the build needs as JSON:
//   total  how many rows the sheet holds
//   index  group -> [[id, title]] (SHEET_INDEX, for pages without the whole sheet)
//   rows   [[id, pid, hint]] in sheet order; pid is the id the Code page knows the problem by
// scripts/build_pages.py runs this.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');

function load() {
  const win = { localStorage: { getItem: () => null, setItem: () => {} } };
  return new Function('window', read('shared', 'catalog.js') + '\n' + read('shared', 'sheet.js') + '\nreturn { SHEET, SHEET_GROUPS };')(win);
}

function build() {
  const { SHEET, SHEET_GROUPS } = load();
  const index = {};
  SHEET_GROUPS.forEach(([g]) => { index[g] = SHEET.filter((r) => r.pattern === g).map((r) => [r.id, r.name]); });
  return { total: SHEET.length, index, rows: SHEET.map((r) => [r.id, r.pid, r.hint]) };
}

if (require.main === module) process.stdout.write(JSON.stringify(build()));
module.exports = { build };
