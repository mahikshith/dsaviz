// Integrity test for the master sheet (shared/sheet.js) and the Sheet page.
// Fails on duplicate ids or numbers, bad links, missing fields, long hints, and counts that are not derived from the data.
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
const LINK = /^https:\/\/leetcode\.com\/problems\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/;
const ids = new Map(), nums = new Map();
if (SHEET.length < 180 || SHEET.length > 220) fail('sheet has ' + SHEET.length + ' problems, expected 180 to 220');
if (new Set(groupNames).size !== groupNames.length) fail('duplicate group name');
SHEET.forEach((r, i) => {
  const at = '#' + i + ' ' + (r.id || '(no id)');
  if (!r.id || typeof r.id !== 'string') fail(at + ': missing id');
  if (ids.has(r.id)) fail(at + ': duplicate id, also row ' + ids.get(r.id)); else ids.set(r.id, i);
  if (!Number.isInteger(r.n) || r.n <= 0) fail(at + ': bad LeetCode number ' + r.n);
  if (nums.has(r.n)) fail(at + ': duplicate number ' + r.n + ', also ' + nums.get(r.n)); else nums.set(r.n, r.id);
  if (!r.name || !r.name.trim()) fail(at + ': missing name');
  if (!r.url || !r.url.trim() || /undefined|null|#|placeholder|example/i.test(r.url)) fail(at + ': empty or placeholder link "' + r.url + '"');
  else if (!LINK.test(r.url)) fail(at + ': link does not match https://leetcode.com/problems/<slug>/: ' + r.url);
  else if (r.url !== 'https://leetcode.com/problems/' + r.id + '/') fail(at + ': link slug differs from id');
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
});
// every catalog problem is in the sheet once, with the same number and pattern
PROBLEMS.forEach((p) => {
  const rows = SHEET.filter((r) => r.story === p.id);
  if (rows.length !== 1) { fail('catalog problem ' + p.id + ' appears ' + rows.length + ' times in the sheet'); return; }
  if (rows[0].n !== p.n) fail('catalog problem ' + p.id + ': number ' + p.n + ' vs sheet ' + rows[0].n);
  if (rows[0].pattern !== p.pattern) fail('catalog problem ' + p.id + ': pattern ' + p.pattern + ' vs sheet ' + rows[0].pattern);
});
SHEET.filter((r) => r.story).forEach((r) => { if (!PROBLEMS.some((p) => p.id === r.story)) fail(r.id + ': story ' + r.story + ' is not in the catalog'); });

// ---- 2. the built page carries the current data ----
const page = read('pages', 'Sheet.dc.html');
const lf = (x) => x.replace(/\r\n/g, '\n').trim();
const a = page.indexOf('// @@SHEET@@'), b = page.indexOf('// @@END-SHEET@@');
if (a < 0 || b < 0) fail('Sheet.dc.html has no @@SHEET@@ block');
else if (lf(page.slice(a, b + '// @@END-SHEET@@'.length)) !== lf(sheetSrc)) fail('Sheet.dc.html is stale: run npm run build');

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
console.log('sheet: ' + SHEET.length + ' problems in ' + SHEET_GROUPS.length + ' groups; ' + DIFFS.map((d) => d + ' ' + SHEET.filter((r) => r.diff === d).length).join(', ') + '; ' + SHEET.filter((r) => r.story).length + ' with stories');
console.log(problems ? problems + ' sheet problem(s)' : 'sheet clean');
if (problems) process.exitCode = 1;
