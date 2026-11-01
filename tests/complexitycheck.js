// Complexity page check: table row counts, every pattern present, curves computed right at sample n, section ids,
// plain-English sentence length, and the wiring (page registered, Why fold, shared tables ranked).
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8').replace(/\r\n/g, '\n');
let bad = 0;
const fail = (where, msg) => { bad++; console.log('  ✗', where, msg); };

const X = new Function(read('src', 'complexity.js') + `
return { CX_CURVES, CX_NS, CX_DS, CX_SORTS, CX_GRAPHS, CX_PATTERNS, CX_TABS, CX_TARGETS, CX_SPACE, CX_SPACE_FACTS, CX_RANK,
  cxLog10, cxSteps, cxCount, cxTime, cxReadout, cxTable, cxRules, cxTarget, cxTargetSteps, cxChart, cxLayout, cxSpaceFrame, cxStackFrame, cxLegendVal, cxCell };`)();

// Curves at sample n.
const near = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const samples = [
  ['const', 1000, 1], ['log', 1024, 10], ['log', 1000, Math.log2(1000)], ['lin', 1000, 1000], ['nlog', 8, 24], ['nlog', 1000, 1000 * Math.log2(1000)],
  ['quad', 1000, 1e6], ['quad', 10, 100], ['exp', 10, 1024], ['exp', 20, 1048576], ['fact', 5, 120], ['fact', 10, 3628800], ['fact', 20, 2432902008176640000]
];
for (const [id, n, want] of samples) {
  const got = X.cxSteps(id, n);
  if (!near(got, want, 1e-9)) fail('curve ' + id + ' at ' + n, 'got ' + got + ', want ' + want);
}
if (X.cxSteps('exp', 1000) !== Infinity) fail('curve exp', 'n = 1000 should not fit in a number');
if (!near(X.cxLog10('fact', 1000), 2567.6, 0.001)) fail('curve fact', 'log10(1000!) is about 2567.6, got ' + X.cxLog10('fact', 1000));
if (!near(X.cxLog10('fact', 171), Math.log10(1.24101807e309), 0.001)) fail('curve fact', 'Stirling branch near 171! is off');
if (X.CX_CURVES.length !== 7) fail('curves', 'need 7 curves, found ' + X.CX_CURVES.length);
// Order at n = 1000 must climb: 1 < log n < n < n log n < n^2 < 2^n < n!
for (let i = 1; i < X.CX_CURVES.length; i++) {
  if (!(X.cxLog10(X.CX_CURVES[i].id, 1000) > X.cxLog10(X.CX_CURVES[i - 1].id, 1000))) fail('curve order', X.CX_CURVES[i].name + ' is not above ' + X.CX_CURVES[i - 1].name + ' at n = 1,000');
}
// Readout words.
const words = [[1000, '1 thousand'], [1e6, '1 million'], [1e9, '1 billion'], [1e12, '1 trillion']];
for (const [v, want] of words) if (X.cxCount(Math.log10(v)) !== want && !(v === 1000 && X.cxCount(3) === '1,000')) fail('cxCount', v + ' read as "' + X.cxCount(Math.log10(v)) + '", want "' + want + '"');
if (!/^At n = 1,000, O\(n²\) takes about 1 million steps\.$/.test(X.cxReadout('quad', 1000).steps)) fail('readout', 'quad at 1,000: ' + X.cxReadout('quad', 1000).steps);
if (!/1 followed by 301 zeros/.test(X.cxReadout('exp', 1000).steps)) fail('readout', '2^1000 should read as a 1 and 301 zeros: ' + X.cxReadout('exp', 1000).steps);
if (!/second/.test(X.cxReadout('lin', 1e6).time)) fail('readout', 'time text for n = 1,000,000: ' + X.cxReadout('lin', 1e6).time);

// Chart geometry: no NaN at any stop, every curve drawn.
const P = { axis: '#000', grid: '#111', text: '#fff', curves: Object.fromEntries(X.CX_CURVES.map((c) => [c.id, { c: '#fff', dash: 'none' }])) };
for (const n of X.CX_NS) {
  const ch = X.cxChart(n, 'quad', 760, 380, P);
  if (ch.paths.length !== 7) fail('chart n=' + n, 'expected 7 paths, got ' + ch.paths.length);
  if (JSON.stringify(ch).includes('NaN')) fail('chart n=' + n, 'NaN in geometry');
  if (ch.texts.some((t) => t.size < 14)) fail('chart n=' + n, 'a label is under 14px');
}

// Table row counts.
const want = { ds: 12, sort: 9, graph: 9, patterns: 16 };
for (const [id, k] of Object.entries(want)) {
  const t = X.cxTable(id, {});
  if (t.rows.length !== k) fail('table ' + id, 'expected ' + k + ' rows, got ' + t.rows.length);
  t.rows.forEach((r) => { if (r.cells.length !== t.cols.length) fail('table ' + id, r.cells[0].t + ' has ' + r.cells.length + ' cells for ' + t.cols.length + ' columns'); r.cells.forEach((c, i) => { if (t.cols[i].kind === 'cx' && c.r === -1) fail('table ' + id, r.cells[0].t + ': "' + c.t + '" has no rank in CX_RANK'); }); });
  const groups = new Set(t.rows.map((r) => r.group));
  t.groups.forEach((g) => { if (!groups.has(g)) fail('table ' + id, 'filter group "' + g + '" has no rows'); });
  groups.forEach((g) => { if (!t.groups.includes(g)) fail('table ' + id, 'row group "' + g + '" is not in the filter list'); });
}
if (X.cxTable('ds', { worst: true }).rows.length !== 12) fail('table ds', 'worst-case view lost rows');
const names = (id) => X.cxTable(id, {}).rows.map((r) => r.cells[0].t);
for (const n of ['BFS', 'DFS']) void n;
for (const n of ['Breadth-first search', 'Depth-first search', 'Dijkstra', 'Bellman-Ford', 'Floyd-Warshall', 'Prim', 'Kruskal', 'Topological sort', 'Union-find']) if (!names('graph').includes(n)) fail('table graph', 'missing ' + n);
for (const n of ['Merge sort', 'Quick sort', 'Heap sort', 'Insertion sort']) if (!names('sort').includes(n)) fail('table sort', 'missing ' + n);
// A few facts we must not get wrong.
const row = (id, n) => X.cxTable(id, {}).rows.find((r) => r.cells[0].t === n).cells.map((c) => c.t);
if (row('sort', 'Quick sort')[3] !== 'O(n²)') fail('table sort', 'quick sort worst case is O(n²)');
if (row('sort', 'Merge sort')[5] !== 'Yes' || row('sort', 'Heap sort')[5] !== 'No') fail('table sort', 'stability of merge or heap sort is wrong');
if (row('graph', 'Dijkstra')[1] !== 'O((V + E) log V)') fail('table graph', 'Dijkstra time');
if (row('graph', 'Bellman-Ford')[1] !== 'O(V E)') fail('table graph', 'Bellman-Ford time');
if (row('graph', 'Floyd-Warshall')[1] !== 'O(V³)') fail('table graph', 'Floyd-Warshall time');
if (X.cxTable('ds', { worst: true }).rows.find((r) => r.cells[0].t === 'Hash table').cells[2].t !== 'O(n)') fail('table ds', 'hash table worst search is O(n)');
if (X.cxTable('ds', {}).rows.find((r) => r.cells[0].t === 'Hash table').cells[2].t !== 'O(1)') fail('table ds', 'hash table average search is O(1)');

// Every pattern the site has, by exact name.
const win = { localStorage: { getItem: () => null, setItem() {} }, matchMedia: () => ({ matches: false }) };
const cat = new Function('window', read('shared', 'catalog.js') + '\nreturn { PATTERNS };')(win);
const have = new Set(X.CX_PATTERNS.map((p) => p.name));
cat.PATTERNS.forEach((p) => { if (!have.has(p[0])) fail('patterns', 'no row for ' + p[0]); });
have.forEach((n) => { if (!cat.PATTERNS.some((p) => p[0] === n)) fail('patterns', n + ' is not a pattern the site has'); });
if (cat.PATTERNS.length !== 16) fail('patterns', 'the site has ' + cat.PATTERNS.length + ' patterns, the page is built for 16');

// Input size targets.
const ti = [[1, 0], [10, 0], [11, 1], [20, 1], [21, 2], [500, 2], [501, 3], [5000, 3], [5001, 4], [1e6, 4], [1e6 + 1, 5], [1e9, 5]];
for (const [n, i] of ti) if (X.cxTarget(n) !== i) fail('target', 'n = ' + n + ' should pick row ' + i + ', got ' + X.cxTarget(n));
if (X.CX_TARGETS.length !== 6) fail('target', 'need 6 rows');
X.CX_TARGETS.forEach((r, i) => { const s = X.cxTargetSteps(i); if (!(s > 1e6 && s < 3e8)) fail('target', r.label + ' is ' + s + ' steps at its limit, not near 100 million'); });

// Rules: frames exist, shapes are valid, layout has no NaN.
const rules = X.cxRules();
['one', 'nested', 'halve', 'two', 'tree', 'drop', 'amortized'].forEach((id) => { if (!rules.some((r) => r.id === id)) fail('rules', 'missing rule ' + id); });
const PAL = { s: Object.fromEntries(['idle', 'range', 'on', 'done', 'hot', 'dim'].map((k) => [k, { fill: '#1', stroke: '#2', text: '#3' }])), edge: '#4', muted: '#5', text: '#6' };
for (const r of rules) {
  if (r.frames.length < 3) fail('rule ' + r.id, 'needs at least 3 steps');
  if (!r.frames[r.frames.length - 1].big) fail('rule ' + r.id, 'the last step must give the answer (big)');
  for (const w of [358, 760]) for (const f of r.frames) { const L = X.cxLayout(f, w, PAL, 14); if (JSON.stringify(L).includes('NaN') || L.h < 20) fail('rule ' + r.id, 'layout broke at width ' + w + ': ' + f.say); L.rects.forEach((q) => { if (q.x < -0.5 || q.x + q.w > w + 0.5) fail('rule ' + r.id, 'a box leaves the picture at width ' + w + ': ' + f.say); }); }
}
const fib = rules.find((r) => r.id === 'tree').frames;
if (fib[2].stats[0][1] !== 9) fail('rule tree', 'fib(4) makes 9 calls, the page shows ' + fib[2].stats[0][1]);
const am = rules.find((r) => r.id === 'amortized').frames;
const lastStats = am[am.length - 1].stats;
if (lastStats[0][1] !== 9 || lastStats[1][1] !== 15) fail('rule amortized', '9 pushes copy 15 items, page shows ' + JSON.stringify(lastStats));
const hv = rules.find((r) => r.id === 'halve').frames;
if (hv[4].stats[0][1] !== 4 || hv[4].stats[1][1] !== 1) fail('rule halve', 'last round should read 4 rounds and 1 item left');
for (const w of [358, 760]) for (const e of X.CX_SPACE) { const L = X.cxLayout(X.cxSpaceFrame(e), w, PAL, 14); if (JSON.stringify(L).includes('NaN')) fail('space ' + e.id, 'layout broke at ' + w); }
for (let d = 1; d <= 8; d++) { const L = X.cxLayout(X.cxStackFrame(d), 326, PAL, 14); if (JSON.stringify(L).includes('NaN') || L.rects.length !== d + 1) fail('stack ' + d, 'layout broke'); }

// Plain English: every sentence in the page text is 18 words or fewer, with no banned words.
const strings = [];
const walk = (v, key) => { if (typeof v === 'string') strings.push([key, v]); else if (Array.isArray(v)) v.forEach((x) => walk(x, key)); else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => { if (!['id', 'group', 'code', 'cx', 'fits', 'label', 'access', 'search', 'insert', 'del', 'space', 'best', 'avg', 'worst', 'time', 'name', 'title', 'say', 'col', 'par', 'rank', 'spaceRank', 'max', 'extra', 'grid', 's', 't'].includes(k) || k === 'say') walk(x, k); }); };
[X.CX_CURVES, X.CX_DS, X.CX_SORTS, X.CX_GRAPHS, X.CX_PATTERNS, X.CX_TABS, X.CX_TARGETS, X.CX_SPACE, X.CX_SPACE_FACTS.map((f) => f[1])].forEach((o) => walk(o));
rules.forEach((r) => r.frames.forEach((f) => strings.push(['rule ' + r.id, f.say])));
const BANNED = /\b(just|simply|obviously|clearly|trivially|easy|easily)\b/i;
const sentences = (s) => s.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-Z0-9])/).map((x) => x.trim()).filter(Boolean);
let count = 0;
for (const [k, text] of strings) {
  if (/^O\(/.test(text) || text.length < 4) continue;
  for (const s of sentences(text)) {
    count++;
    const w = s.split(/\s+/).filter((x) => /[A-Za-z]{2,}|^[aI]$/.test(x)).length;
    if (w > 18) fail('text ' + k, w + ' words: "' + s + '"');
    if (BANNED.test(s)) fail('text ' + k, 'banned word in "' + s + '"');
  }
}

// The page itself.
const page = read('pages', 'Complexity.dc.html');
if (!/data-fluid="true" data-page="Complexity"/.test(page)) fail('page', 'root needs data-fluid and data-page="Complexity"');
if (!page.includes("navVals(this, t, themeKey, 'Complexity')")) fail('page', "renderVals needs ...navVals(this, t, themeKey, 'Complexity')");
if (!page.includes('<!-- PILL NAV -->')) fail('page', 'no pill nav marker');
if (!page.includes('why: whyVals(whyHub(\'complexity\'))') || !page.includes('<!-- WHY -->')) fail('page', 'no Why fold');
if (!page.includes('speedVals(this)') || !page.includes('paced(')) fail('page', 'the step player must use speedVals and paced');
['grow', 'rules', 'space', 'target'].forEach((id) => { if (!page.includes('<section id="' + id + '"')) fail('page', 'no section with id="' + id + '"'); });
if (!page.includes('<section id="{{tb.id}}"')) fail('page', 'table sections need id="{{tb.id}}"');
['ds', 'sort', 'graph', 'patterns'].forEach((id) => { if (!X.CX_TABS.some((t) => t.id === id)) fail('page', 'no table section ' + id); });
if (!/<h1[^>]*var\(--fs56\)/.test(page)) fail('page', 'H1 must use --fs56');
const h2s = (page.match(/<h2[^>]*>/g) || []).filter((h) => h.includes('cx-h-') || h.includes('tb.hid'));
if (h2s.length < 5 || h2s.some((h) => !h.includes('var(--fs32)'))) fail('page', 'every section heading must use --fs32');
if (!page.includes('.ds-box') && !page.includes('class="ds-box"')) fail('page', 'sections need .ds-box');
if (!page.includes('ds-hit')) fail('page', 'no .ds-hit');
// Wiring.
if (!read('scripts', 'build_site.py').includes("'Complexity'")) fail('wiring', 'Complexity missing from scripts/build_site.py ORDER');
const st = read('tests', 'site-test.js');
if (!/const PAGES = \[[^\]]*'Complexity'/.test(st)) fail('wiring', 'Complexity missing from tests/site-test.js PAGES');
if (!/const LAYOUT_PAGES = \[[^\]]*'Complexity'/.test(st)) fail('wiring', 'Complexity missing from LAYOUT_PAGES');
if (!/page\.indexOf\('@@COMPLEXITY@@'\)|@@COMPLEXITY@@/.test(page) || !page.includes('function cxLog10(')) fail('wiring', 'src/complexity.js is not built into the page (run npm run build)');

console.log('Complexity: ' + Object.entries(want).map(([k, v]) => k + ' ' + v).join(', ') + ', 7 curves, ' + rules.length + ' rules, ' + count + ' sentences read');
// Links into the page name a real section.
{
  const fs2 = require('fs'), path2 = require('path');
  const home = path2.join(__dirname, '..');
  const page = fs2.readFileSync(path2.join(home, 'pages', 'Complexity.dc.html'), 'utf8');
  ['pages/Code.dc.html', 'pages/Story.dc.html', 'pages/Snapshot.dc.html'].forEach((f) => {
    const s2 = fs2.readFileSync(path2.join(home, f), 'utf8');
    if (!s2.includes('Complexity.dc.html')) throw new Error(f + ' has no link to Complexity');
    for (const m of s2.matchAll(/Complexity\.dc\.html\?at=(\w+)/g)) if (!page.includes('"' + m[1] + '"') && !page.includes("'" + m[1] + "'")) throw new Error(f + ' links to missing section ' + m[1]);
  });
}

console.log(bad ? bad + ' problem(s)' : 'complexity clean');
if (bad) process.exitCode = 1;
