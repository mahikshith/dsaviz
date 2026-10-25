// Integrity test for the master sheet (shared/sheet.js) and the Sheet page.
// Fails on duplicate ids or titles, rows without an in-site problem page (a test spec or a SQL spec), missing fields,
// long hints, groups whose difficulty falls as they go, and counts that are not derived from the data. Slugs that do not look like their title are listed for review.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
let problems = 0;
const fail = (msg) => { problems++; console.log('  ✗', msg); };

const catalogSrc = read('shared', 'catalog.js');
const sheetSrc = read('shared', 'sheet.js');
const store = {};
const win = { localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } } };
const { SHEET, SHEET_GROUPS, PROBLEMS, SHEET_KEY } = new Function('window', catalogSrc + '\n' + sheetSrc + '\nreturn { SHEET, SHEET_GROUPS, PROBLEMS, SHEET_KEY };')(win);

// ---- 1. data ----
const DIFFS = ['Easy', 'Medium', 'Hard'];
const groupNames = SHEET_GROUPS.map(([n]) => n);
// Every row opens our own problem page: its pid names a test spec or a SQL spec.
const { TEST_SPECS } = require('../shared/tests_spec.js');
const { SQL_SPECS } = require('../shared/sql_spec.js');
const pids = new Map();
const ids = new Map(), titles = new Map();
const review = [];
// Loose kebab-case: drop apostrophes and backticks, turn any other run of punctuation or spaces into one hyphen.
const kebab = (t) => t.toLowerCase().replace(/['`’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
if (SHEET.length < 500 || SHEET.length > 600) fail('sheet has ' + SHEET.length + ' problems, expected 500 to 600');
if (new Set(groupNames).size !== groupNames.length) fail('duplicate group name');
SHEET.forEach((r, i) => {
  const at = '#' + i + ' ' + (r.id || '(no id)');
  if (!r.id || typeof r.id !== 'string') fail(at + ': missing id');
  if (ids.has(r.id)) fail(at + ': duplicate id, also row ' + ids.get(r.id)); else ids.set(r.id, i);
  if (!r.name || !r.name.trim()) fail(at + ': missing name');
  else {
    const tk = r.name.trim().toLowerCase();
    if (titles.has(tk)) fail(at + ': duplicate title "' + r.name + '", also ' + titles.get(tk)); else titles.set(tk, r.id);
    // punctuation edge cases (Pow(x, n) -> powx-n) are fine when only the hyphens differ
    if (r.id && kebab(r.name) !== r.id && kebab(r.name).replace(/-/g, '') !== r.id.replace(/-/g, '')) review.push(r.id + ' <- "' + r.name + '"');
  }
  if ('n' in r || 'url' in r || 'link' in r || 'premium' in r) fail(at + ': rows carry no outside number, link or premium flag');
  if (!r.pid || !(TEST_SPECS[r.pid] || SQL_SPECS[r.pid])) fail(at + ': no in-site problem page (no spec or SQL spec named ' + r.pid + ')');
  else if (r.pattern === 'SQL' ? !SQL_SPECS[r.pid] : !TEST_SPECS[r.pid]) fail(at + ': ' + r.pattern + ' row opens the wrong kind of page');
  if (r.href !== 'Code.dc.html?problem=' + r.pid) fail(at + ': href should be Code.dc.html?problem=' + r.pid + ', is ' + r.href);
  if (pids.has(r.pid)) fail(at + ': problem page ' + r.pid + ' is also row ' + pids.get(r.pid)); else pids.set(r.pid, r.id);
  if (!DIFFS.includes(r.diff)) fail(at + ': missing or unknown difficulty "' + r.diff + '"');
  if (!r.pattern || !groupNames.includes(r.pattern)) fail(at + ': missing or unknown pattern "' + r.pattern + '"');
  if (!r.hint || !r.hint.trim()) fail(at + ': missing hint');
  else if (r.hint.length > 120) fail(at + ': hint is ' + r.hint.length + ' characters (max 120)');
  if (/[[\]{}<>]|TODO|TBD|lorem/i.test(r.hint || '')) fail(at + ': hint looks like a placeholder');
});
groupNames.forEach((g) => {
  const rows = SHEET.filter((r) => r.pattern === g);
  if (!rows.length) fail('group ' + g + ' is empty');
  rows.forEach((r, i) => { if (r.seq !== i + 1) fail(g + ': sequence breaks at ' + r.id); });
  // difficulty may wobble, but on average it must not fall: compare each half's mean, and each third's
  const rank = rows.map((r) => DIFFS.indexOf(r.diff));
  const mean = (a) => a.reduce((x, y) => x + y, 0) / (a.length || 1);
  [2, 3].forEach((parts) => {
    if (rows.length < parts * 2) return;
    const size = rows.length / parts;
    const means = Array.from({ length: parts }, (_, k) => mean(rank.slice(Math.round(k * size), Math.round((k + 1) * size))));
    for (let k = 1; k < parts; k++) if (means[k] < means[k - 1]) fail(g + ': difficulty falls on average (' + means.map((m) => m.toFixed(2)).join(' > ') + ')');
  });
});
// every catalog problem is in the sheet once, with the same number and pattern
PROBLEMS.forEach((p) => {
  const rows = SHEET.filter((r) => r.story === p.id);
  if (rows.length !== 1) { fail('catalog problem ' + p.id + ' appears ' + rows.length + ' times in the sheet'); return; }
  if (rows[0].pattern !== p.pattern) fail('catalog problem ' + p.id + ': pattern ' + p.pattern + ' vs sheet ' + rows[0].pattern);
});
SHEET.filter((r) => r.story).forEach((r) => { if (!PROBLEMS.some((p) => p.id === r.story)) fail(r.id + ': story ' + r.story + ' is not in the catalog'); });
Object.keys(TEST_SPECS).concat(Object.keys(SQL_SPECS)).forEach((id) => { if (!pids.has(id)) fail('spec ' + id + ' is not on the sheet'); });
// SOLVE_IDS (every page) maps a row id to its problem page id where they differ.
{
  const home = read('pages', 'Revisit.dc.html');
  const m = home.match(/const SOLVE_IDS = (\{[^\n]*\});/);
  if (!m) fail('Revisit.dc.html has no SOLVE_IDS: run npm run build');
  else {
    const S = JSON.parse(m[1]);
    SHEET.forEach((r) => { if ((S[r.id] || r.id) !== r.pid) fail('SOLVE_IDS sends ' + r.id + ' to ' + (S[r.id] || r.id) + ', the sheet says ' + r.pid); });
  }
}

// ---- 2. the built page carries the current data ----
const page = read('pages', 'Sheet.dc.html');
const lf = (x) => x.replace(/\r\n/g, '\n').trim();
const a = page.indexOf('// @@SHEET@@'), b = page.indexOf('// @@END-SHEET@@');
if (a < 0 || b < 0) fail('Sheet.dc.html has no @@SHEET@@ block');
else if (lf(page.slice(a, b + '// @@END-SHEET@@'.length)) !== lf(sheetSrc)) fail('Sheet.dc.html is stale: run npm run build');

// Main and Home show the sheet size from a generated SHEET_TOTAL
['Main', 'Home'].forEach((name) => {
  const m = read('pages', name + '.dc.html').match(/const SHEET_TOTAL = (\d+);/);
  if (!m) fail(name + '.dc.html has no SHEET_TOTAL: run npm run build');
  else if (Number(m[1]) !== SHEET.length) fail(name + '.dc.html says SHEET_TOTAL ' + m[1] + ' but the sheet has ' + SHEET.length + ': run npm run build');
});

// ---- 3. counts in the UI come from the data ----
const markup = page.slice(page.indexOf('<x-dc>'), page.indexOf('</x-dc>'));
const visibleText = markup.replace(/<!-- MENU DRAWER -->[\s\S]*?<!-- \/MENU DRAWER -->/, '').replace(/<!-- PILL NAV -->[\s\S]*?<!-- \/PILL NAV -->/, '').replace(/<helmet>[\s\S]*?<\/helmet>/, '').replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '\n').replace(/\{\{[^}]*\}\}/g, '');
const ALLOWED = ["Today's 5", "today's 5"];
visibleText.split('\n').map((x) => x.trim()).filter(Boolean).forEach((line) => {
  let rest = line; ALLOWED.forEach((w) => { rest = rest.split(w).join(''); });
  if (/\d/.test(rest)) fail('hard-coded number in Sheet markup: "' + line + '"');
});
const canvas = JSON.parse(read('pages', 'canvas.json'));
const board = canvas.boards['Sheet.dc.html'];
if (!board) fail('Sheet.dc.html missing from pages/canvas.json');
const drawer = read('shared', 'drawer.js');
const menuLine = (drawer.match(/\['Sheet\.dc\.html'[^\]]*\]/) || [''])[0];
if (!menuLine) fail('Sheet.dc.html missing from the menu drawer');
[['canvas title', board ? board.title : ''], ['menu entry', menuLine]].forEach(([where, text]) => {
  ALLOWED.forEach((w) => { text = text.split(w).join(''); });
  (text.match(/\d+/g) || []).forEach((n) => { if (Number(n) !== SHEET.length) fail(where + ' says ' + n + ' but the sheet has ' + SHEET.length); });
});
const sizes = [...page.matchAll(/height: (\d+)px; box-sizing: border-box; background: \{\{t\.bg\}\}/g)].map((m) => +m[1]);
const preview = JSON.parse(page.match(/data-props='([^']*)'/)[1]).$preview.height;
if (!sizes.length || sizes[0] !== preview || !board || board.h !== preview) fail('root height, $preview.height and canvas h differ: ' + [sizes[0], preview, board && board.h].join(' / '));
if (!/PAGES = \[[^\]]*'Sheet'/.test(read('tests', 'site-test.js'))) fail("Sheet missing from tests/site-test.js PAGES");
if (!/ORDER = \[[^\]]*'Sheet'/.test(read('scripts', 'build_site.py'))) fail('Sheet missing from build_site.py ORDER');

// run the page script headlessly
const script = page.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
for (const k of Object.keys(store)) delete store[k];
const sandbox = `
  const window = { localStorage: win.localStorage, addEventListener: () => {}, removeEventListener: () => {} };
  const setInterval = () => 0; const clearInterval = () => {};
  class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, typeof o === 'function' ? o(this.state) : o); } forceUpdate() {} }
  ${script}
  return { Component, todaysFive, SHEET, SHEET_GROUPS };`;
const P = new Function('win', sandbox)(win);
const c = new P.Component({});
c.componentDidMount();
let v = c.renderVals();
const expectEq = (what, got, want) => { if (got !== want) fail(what + ': UI shows ' + got + ', data says ' + want); };
const check = (label) => {
  v = c.renderVals();
  const done = SHEET.filter((r) => c.state.prog.done[r.id]).length;
  expectEq(label + ' total', v.total, SHEET.length);
  expectEq(label + ' solved', v.solved, done);
  if (!v.subLine.includes(String(SHEET.length))) fail(label + ' subtitle does not show the derived total');
  expectEq(label + ' difficulty tile sum', v.diffTiles.reduce((s, d) => s + d.total, 0), SHEET.length);
  v.diffTiles.forEach((d) => {
    expectEq(label + ' ' + d.label + ' total', d.total, SHEET.filter((r) => r.diff === d.label).length);
    expectEq(label + ' ' + d.label + ' done', d.done, SHEET.filter((r) => r.diff === d.label && c.state.prog.done[r.id]).length);
  });
  expectEq(label + ' ring count', v.rings.length, SHEET_GROUPS.length);
  v.rings.forEach((g) => {
    const all = SHEET.filter((r) => r.pattern === g.name);
    expectEq(label + ' ring ' + g.name, g.count, all.filter((r) => c.state.prog.done[r.id]).length + '/' + all.length);
  });
  v.groups.forEach((g) => {
    const all = SHEET.filter((r) => r.pattern === g.name);
    expectEq(label + ' group ' + g.name + ' total', g.total, all.length);
    expectEq(label + ' group ' + g.name + ' done', g.done, all.filter((r) => c.state.prog.done[r.id]).length);
  });
};
check('fresh');
// tick three rows and star one, through the UI handlers
v.groups[0].rows[0].toggle(); v = c.renderVals();
v.groups[0].rows[2].toggle(); v = c.renderVals();
v.groups[0].rows[1].starToggle(); v = c.renderVals();
check('after ticks');
const saved = JSON.parse(store[SHEET_KEY] || 'null');
if (!saved || saved.v !== 1 || typeof saved.done !== 'object' || typeof saved.star !== 'object') fail('progress not saved as { v:1, done, star } under ' + SHEET_KEY);
else {
  if (Object.keys(saved.done).length !== 2 || !Object.values(saved.done).every((ts) => typeof ts === 'number' && ts > 0)) fail('done map should hold 2 timestamps');
  if (Object.keys(saved.star).length !== 1 || Object.values(saved.star)[0] !== 1) fail('star map should hold { id: 1 }');
}
// filters: difficulty, status, pattern, company and search
c.setState({ diff: 'Hard' }); check('filter Hard');
if (!c.renderVals().groups.every((g) => g.rows.every((r) => r.diff === 'Hard'))) fail('difficulty filter lets other difficulties through');
for (let i = 0; i < 25; i++) {
  c.randomPick();
  const r = SHEET.find((x) => x.id === c.state.pick);
  if (!r || r.diff !== 'Hard' || c.state.prog.done[r.id]) { fail('random unsolved ignored the filters: ' + (r && r.id)); break; }
}
c.setState({ diff: 'All', status: 'done' });
expectEq('status done rows', c.renderVals().groups.reduce((s, g) => s + g.rows.length, 0), 2);
c.setState({ status: 'star' });
expectEq('status starred rows', c.renderVals().groups.reduce((s, g) => s + g.rows.length, 0), 1);
c.setState({ status: 'all', pattern: 'Heap' });
if (c.renderVals().groups.some((g) => g.name !== 'Heap')) fail('pattern filter shows other groups');
c.setState({ pattern: 'All', company: 'Amazon' });
const amazon = c.renderVals().groups.reduce((s, g) => s + g.rows.length, 0);
expectEq('company Amazon rows', amazon, SHEET.filter((r) => r.story && PROBLEMS.find((p) => p.id === r.story).cos.includes('Amazon')).length);
c.setState({ company: 'All', query: 'rotated' });
if (c.renderVals().groups.reduce((s, g) => s + g.rows.length, 0) !== SHEET.filter((r) => /rotated/i.test(r.name)).length) fail('search does not match names');
c.setState({ query: '' });
// Today's 5: five distinct problems, unsolved before today, the same all day
const noon = Date.parse('2026-10-24T12:00:00Z');
const t1 = P.todaysFive({ done: {}, star: {} }, noon).map((r) => r.id);
const t2 = P.todaysFive({ done: {}, star: {} }, noon + 6 * 3600e3).map((r) => r.id);
const solvedToday = { done: { [t1[0]]: noon + 3600e3 }, star: {} };
const t3 = P.todaysFive(solvedToday, noon + 7 * 3600e3).map((r) => r.id);
const solvedBefore = { done: { [t1[0]]: noon - 86400e3 }, star: {} };
const t4 = P.todaysFive(solvedBefore, noon).map((r) => r.id);
if (t1.length !== 5 || new Set(t1).size !== 5) fail("Today's 5 is not five distinct problems");
if (t1.join() !== t2.join()) fail("Today's 5 changes during the day");
if (t1.join() !== t3.join()) fail("Today's 5 changes after solving one today");
if (t4.includes(t1[0])) fail("Today's 5 includes a problem solved on an earlier day");
if (t1.join() === P.todaysFive({ done: {}, star: {} }, noon + 86400e3).map((r) => r.id).join()) fail("Today's 5 is the same on the next day");

const counts = {};
SHEET.forEach((r) => { counts[r.pattern] = (counts[r.pattern] || 0) + 1; });
console.log('sheet: ' + SHEET.length + ' problems in ' + SHEET_GROUPS.length + ' groups; ' + DIFFS.map((d) => d + ' ' + SHEET.filter((r) => r.diff === d).length).join(', ') + '; ' + SHEET.filter((r) => r.story).length + ' with stories; every row opens its own problem page');
console.log('  per group: ' + SHEET_GROUPS.map(([g]) => g + ' ' + (counts[g] || 0)).join(', '));
if (review.length) console.log('  slug review (' + review.length + ', not failures): ' + review.join('; '));
console.log(problems ? problems + ' sheet problem(s)' : 'sheet clean');
if (problems) process.exitCode = 1;
