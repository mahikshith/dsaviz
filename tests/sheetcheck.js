// Integrity test for the master sheet (shared/sheet.js) and the Problems page (pages/Sheet.dc.html, built from src/pages/problems_body.html and problems.js).
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

// Main shows the sheet size from a generated SHEET_TOTAL (Home reads SHEET.length itself)
['Main'].forEach((name) => {
  const m = read('pages', name + '.dc.html').match(/const SHEET_TOTAL = (\d+);/);
  if (!m) fail(name + '.dc.html has no SHEET_TOTAL: run npm run build');
  else if (Number(m[1]) !== SHEET.length) fail(name + '.dc.html says SHEET_TOTAL ' + m[1] + ' but the sheet has ' + SHEET.length + ': run npm run build');
});

// ---- 3. the Problems page: no numbers in its markup, nothing from the old Sheet page, the data still in the source ----
const markup = page.slice(page.indexOf('<x-dc>'), page.indexOf('</x-dc>'));
const visibleText = markup.replace(/<!-- MENU DRAWER -->[\s\S]*?<!-- \/MENU DRAWER -->/, '').replace(/<!-- PILL NAV -->[\s\S]*?<!-- \/PILL NAV -->/, '').replace(/<helmet>[\s\S]*?<\/helmet>/, '').replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '\n').replace(/\{\{[^}]*\}\}/g, '');
visibleText.split('\n').map((x) => x.trim()).filter(Boolean).forEach((line) => { if (/\d/.test(line)) fail('hard-coded number in Problems markup: "' + line + '"'); });
// The old Sheet page's features are gone from the page (their data and code stay in shared/sheet.js, shared/lists.js and the build).
["Today's 5", 'Random', 'Open all', 'Close all', 'Export', 'Import', 'Starter', 'Core', 'Company', 'Add a note', 'Star for revision'].forEach((w) => {
  if (visibleText.includes(w)) fail('the Problems page still shows "' + w + '"');
});
if (!/<h1>Problems<\/h1>/.test(markup)) fail('the Problems page has no h1 "Problems"');
if (!/<div data-shell/.test(markup)) fail('the Problems page is not on the shared frame (data-shell)');
if (!read('shared', 'lists.js').includes('PROBLEM_LISTS')) fail('shared/lists.js lost its data');
const canvas = JSON.parse(read('pages', 'canvas.json'));
const board = canvas.boards['Sheet.dc.html'];
if (!board) fail('Sheet.dc.html missing from pages/canvas.json');
const drawer = read('shared', 'drawer.js');
// Step 5: Problems is in the top bar and the phone menu's Main sections (NAV_ITEMS in shared/nav.js), not repeated in the drawer's site list.
const menuLine = (read('shared', 'nav.js').match(/\['sheet', 'Problems', 'Sheet\.dc\.html'[^\]]*\]/) || [''])[0];
if (!menuLine) fail('Sheet.dc.html missing from the top bar items (shared/nav.js NAV_ITEMS)');
if (/\['Sheet\.dc\.html'/.test(drawer)) fail('Sheet.dc.html is repeated in the drawer site list');
[['canvas title', board ? board.title : ''], ['menu entry', menuLine]].forEach(([where, text]) => {
  (text.match(/\d+/g) || []).forEach((n) => { if (Number(n) !== SHEET.length) fail(where + ' says ' + n + ' but the sheet has ' + SHEET.length); });
});
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
  return { Component, prParse, prQuery, PR_PAGE, DS };`;
const P = new Function('win', sandbox)(win);
// The page reads the learner's data from DS (the real one, from shared/data.js). Here three of its readers are replaced, to say what is due for
// review, solved on the Problem page, or finished as a story.
const stub = { due: [], passes: [], stories: [] };
P.DS.reviewDue = () => stub.due; P.DS.codePasses = () => ({ ids: stub.passes }); P.DS.stories = () => ({ ids: stub.stories });
if (!P.DS.TIMED || P.DS.TIMED.key !== "dsaviz-timed") fail("DS.TIMED is missing");
const expectEq = (what, got, want) => { if (JSON.stringify(got) !== JSON.stringify(want)) fail(what + ': page shows ' + JSON.stringify(got).slice(0, 120) + ', data says ' + JSON.stringify(want).slice(0, 120)); };
// The rows on every page of one component, in order.
const allRows = (c) => { const ids = []; const m = /of (\d+)$/.exec(c.renderVals().pos || 'of 1'); const n = m ? +m[1] : 1; for (let pg = 1; pg <= n; pg++) { c.setState({ page: pg }); c.renderVals().rows.forEach((r) => ids.push(r.id)); } c.setState({ page: 1 }); return ids; };
const mk = () => { const c = new P.Component({}); c.componentDidMount(); return c; };
{
  const c = mk(); const v = c.renderVals();
  expectEq('first page size', v.rows.length, P.PR_PAGE);
  if (!v.hasPager || !v.atFirst || v.atLast) fail('the first page needs a pager with Previous off and Next on');
  // all of the sheet is reachable, each problem once, in sheet order
  expectEq('every problem reachable by paging', allRows(c), SHEET.map((r) => r.id));
  const row = v.rows[0];
  expectEq('row fields (no story names or summaries)', Object.keys(row).sort(), ['diff', 'href', 'id', 'name', 'sr', 'tick', 'topic']);
  if (!/^Code\.dc\.html\?problem=[a-z0-9-]+$/.test(row.href)) fail('a row links to ' + row.href);
  // paging
  v.nextPage(); expectEq('next page', c.state.page, 2);
  const v2 = c.renderVals(); if (v2.atFirst) fail('page 2 says it is the first'); v2.prevPage(); expectEq('previous page', c.state.page, 1);
  // each filter alone, then combined; the page returns to 1 when a filter changes
  c.setState({ page: 3 });
  c.renderVals().onDiff({ target: { value: 'Hard' } });
  expectEq('page after a filter', c.state.page, 1);
  expectEq('difficulty Hard', allRows(c), SHEET.filter((r) => r.diff === 'Hard').map((r) => r.id));
  c.renderVals().onTopic({ target: { value: 'Heap' } });
  expectEq('topic Heap + Hard', allRows(c), SHEET.filter((r) => r.diff === 'Hard' && r.pattern === 'Heap').map((r) => r.id));
  c.renderVals().onDiff({ target: { value: '' } });
  expectEq('topic Heap', allRows(c), SHEET.filter((r) => r.pattern === 'Heap').map((r) => r.id));
  c.renderVals().onTopic({ target: { value: 'not a topic' } });
  expectEq('an unknown topic is ignored', c.state.topic, '');
  // search: titles and topics, every word
  c.renderVals().onQ({ target: { value: 'rotated' } });
  expectEq('search "rotated"', allRows(c), SHEET.filter((r) => /rotated/i.test(r.name)).map((r) => r.id));
  c.renderVals().onQ({ target: { value: 'two pointers' } });
  expectEq('search by topic', allRows(c), SHEET.filter((r) => ['two', 'pointers'].every((w) => (r.name + ' ' + r.pattern).toLowerCase().includes(w))).map((r) => r.id));
  // done: mark two rows done, then filter on it, and combine
  c.renderVals().clearFilters();
  expectEq('Clear filters', [c.state.q, c.state.topic, c.state.diff, c.state.done, c.state.due], ['', '', '', '', false]);
  // Due for review: sheet cards by row id and story cards by the row that holds the story; nothing due means the one-line empty state
  {
    const storyRow = SHEET.find((r) => r.story), plain = SHEET.find((r) => !r.story && r.id !== SHEET[0].id);
    stub.due = [{ kind: 'sheet', id: 'sheet:' + plain.id }, { kind: 'story', id: storyRow.story }, { kind: 'start', id: 'start:variables' }];
    const u = mk(); u.renderVals().onDue();
    expectEq('Due for review lists the due problems', allRows(u).sort(), [plain.id, storyRow.id].sort());
    u.renderVals().onDiff({ target: { value: plain.diff === 'Easy' ? 'Hard' : 'Easy' } });
    if (!u.renderVals().rows.every((r) => r.id !== plain.id)) fail('Due for review does not combine with the difficulty filter');
    // (the page works out what is due once per progress object, so nothing due is a new page)
    stub.due = []; const u2 = mk(); u2.renderVals().onDue();
    const none = u2.renderVals();
    if (!none.noRows || none.emptyText !== 'No problems are due for review.') fail('with nothing due the page should say so in one line');
    none.clearFilters(); if (u2.state.due || !u2.renderVals().hasRows) fail('Clear filters should also switch Due for review off');
  }
  // Done also counts a problem solved on the Problem page or a finished story
  {
    stub.passes = [SHEET[3].pid]; stub.stories = [];
    const w = mk(); w.renderVals().onDone({ target: { value: 'yes' } });
    expectEq('solved on the Problem page counts as done', allRows(w), [SHEET[3].id]);
    stub.passes = [];
  }
  // Timed: a switch that is remembered; off by default
  {
    delete store['dsaviz-timed'];
    const m = mk(); if (m.renderVals().timedOn !== 'false') fail('Timed should be off by default');
    m.renderVals().onTimed(); expectEq('Timed on is stored', store['dsaviz-timed'], '1'); if (m.renderVals().timedOn !== 'true') fail('Timed switch does not turn on');
    expectEq('Timed is remembered', mk().renderVals().timedOn, 'true');
    mk().renderVals().onTimed(); expectEq('Timed off is stored', store['dsaviz-timed'], '0');
    delete store['dsaviz-timed'];
  }
  const mine = [SHEET[0].id, SHEET[5].id];
  store[SHEET_KEY] = JSON.stringify({ v: 1, done: { [mine[0]]: Date.now(), [mine[1]]: Date.now() }, star: {} });
  const d = mk();
  d.renderVals().onDone({ target: { value: 'yes' } });
  expectEq('done filter', allRows(d), mine);
  if (d.renderVals().rows.some((r) => r.tick !== '✓' || r.sr !== 'Done')) fail('done rows need a tick and the word Done for screen readers');
  d.renderVals().onDone({ target: { value: 'no' } });
  expectEq('not done filter', allRows(d).length, SHEET.length - 2);
  d.renderVals().onDiff({ target: { value: SHEET[0].diff } }); d.renderVals().onDone({ target: { value: 'yes' } });
  expectEq('done + difficulty', allRows(d), mine.filter((id) => SHEET.find((r) => r.id === id).diff === SHEET[0].diff));
  // nothing matches: one line and a way out
  d.renderVals().onQ({ target: { value: 'zzzzqqq' } });
  const none = d.renderVals();
  if (!none.noRows || none.hasRows || none.hasPager) fail('a search with no match should show only the empty message');
  none.clearFilters(); if (!d.renderVals().hasRows) fail('Clear filters leaves the list empty');
  delete store[SHEET_KEY];
}
// The address: filters round-trip, and anything unknown is dropped.
{
  const f = { q: 'two sum', topic: 'Heap', diff: 'Hard', done: 'no', due: true, page: 3 };
  expectEq('query round trip', P.prParse(P.prQuery(f)), f);
  expectEq('empty filters make an empty query', P.prQuery({ q: '', topic: '', diff: '', done: '', due: false, page: 1 }), '');
  expectEq('unknown values are dropped', P.prParse('?topic=Nope&difficulty=Impossible&done=maybe&page=-4'), { q: '', topic: '', diff: '', done: '', due: false, page: 1 });
}

const counts = {};
SHEET.forEach((r) => { counts[r.pattern] = (counts[r.pattern] || 0) + 1; });
console.log('sheet: ' + SHEET.length + ' problems in ' + SHEET_GROUPS.length + ' groups; ' + DIFFS.map((d) => d + ' ' + SHEET.filter((r) => r.diff === d).length).join(', ') + '; ' + SHEET.filter((r) => r.story).length + ' with stories; every row opens its own problem page');
console.log('  per group: ' + SHEET_GROUPS.map(([g]) => g + ' ' + (counts[g] || 0)).join(', '));
if (review.length) console.log('  slug review (' + review.length + ', not failures): ' + review.join('; '));
console.log(problems ? problems + ' sheet problem(s)' : 'sheet clean');
if (problems) process.exitCode = 1;
