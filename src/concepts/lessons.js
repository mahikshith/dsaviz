// DSA concept lessons. Drawn by the AI lesson renderer (src/ai/render.js): same scene vocabulary, same easing,
// same 960 x 540 canvas. Each lesson: id, track, title, tag, minutes, idea (one line), groups (sheet groups and
// pattern-map nodes it feeds), tryIt (1-3 sheet row ids for "Now try"), optional param (one slider) and
// make(p) -> steps. A step is { say, focus: [ids], scene }. Steps may carry `out`, the values the lesson
// computed, so tests/conceptcheck.js can check them against its own reference code.
// All explanations, data and pictures are our own.
const CS_TRACKS = [
  { id: 'found', title: 'Foundations', short: 'Foundations', blurb: 'Count the steps, see memory as boxes, and watch recursion stack up its calls.' },
  { id: 'sort', title: 'Sorting', short: 'Sorting', blurb: 'Every classic sort on the same bars: the slow simple ones, the fast clever ones, and two that never compare.' },
  { id: 'lin', title: 'Hashing and linear structures', short: 'Hash & lists', blurb: 'How a hash map really finds a key, and the plumbing of lists, stacks, queues and deques.' },
  { id: 'tree', title: 'Trees and heaps', short: 'Trees', blurb: 'Words for trees, the four walks, search trees and the heap behind every priority queue.' },
  { id: 'graph', title: 'Graphs', short: 'Graphs', blurb: 'Store a graph, order its tasks, find the cheapest routes and connect it all for the least cost.' },
  { id: 'math', title: 'Math for coding', short: 'Math', blurb: 'Divisors, primes, remainders, fast powers and counting without listing everything.' },
  { id: 'bits', title: 'Bits and string matching', short: 'Bits & strings', blurb: 'Tricks with ones and zeros, and three ways to find a word in a text without starting over.' }
];

// ---------- shared helpers ----------
const CS_W = 960;
const csR = (v) => Math.round(v * 10) / 10;
// Merge scene layers: later layers add items; an item with the same id replaces the earlier one.
function csScene() {
  const out = {};
  Array.prototype.slice.call(arguments).forEach((L) => {
    if (!L) return;
    Object.keys(L).forEach((k) => {
      if (k === 'axes') { out.axes = L.axes; return; }
      if (!Array.isArray(L[k])) return;
      const cur = out[k] || [];
      L[k].forEach((it) => { const i = cur.findIndex((c) => c.id === it.id); if (i >= 0) cur[i] = it; else cur.push(it); });
      out[k] = cur;
    });
  });
  return out;
}
// Steps drop empty options (fill: null and the like), so builders can write `fill: on ? 'a' : null`.
function csClean(scene) {
  const out = {};
  Object.keys(scene || {}).forEach((k) => {
    if (!Array.isArray(scene[k])) { out[k] = scene[k]; return; }
    out[k] = scene[k].filter(Boolean).map((it) => { const o = {}; Object.keys(it).forEach((f) => { if (it[f] !== null && it[f] !== undefined) o[f] = it[f]; }); return o; });
  });
  return out;
}
function csStep(say, focus, scene) { return { say, focus: focus || [], scene: csClean(scene) }; }
function csLabel(id, x, y, text, o) { return Object.assign({ id, x, y, text: String(text), c: 'm', size: 14 }, o || {}); }
// A small colour key in the top-left corner: [[colour, words], ...].
function csLegend(items, y) {
  // Labels never dim with the focus, so the key stays readable on every step.
  const labels = []; let x = 24;
  items.forEach(([c, words], i) => {
    labels.push({ id: 'lgp' + i, x, y: y || 18, text: '■', c, size: 16 });
    labels.push({ id: 'lgt' + i, x: x + 18, y: y || 18, text: words, c: 't2', size: 13 });
    x += 34 + words.length * 7.2;
  });
  return { labels };
}
// A row of cells. o: x, y, w, h, gap, p (id prefix), keys (ids per cell), fill (colour per cell), c (border per cell),
// idx (false hides the index labels), idxText(i), size, dash (per cell).
function csCells(vals, o) {
  o = o || {};
  const n = vals.length; const w = o.w || 64; const h = o.h || 56; const gap = o.gap === undefined ? 8 : o.gap;
  const x0 = o.x !== undefined ? o.x : (CS_W - (n * w + (n - 1) * gap)) / 2; const y = o.y === undefined ? 220 : o.y; const p = o.p || 'c';
  const at = (a, i) => (Array.isArray(a) ? a[i] : typeof a === 'function' ? a(i) : undefined);
  const boxes = vals.map((v, i) => {
    const b = { id: p + (o.keys ? o.keys[i] : i), x: csR(x0 + i * (w + gap)), y, w, h, rx: 8, label: String(v), mono: true, size: o.size || 18 };
    const f = at(o.fill, i); if (f) b.fill = f;
    const c = at(o.c, i); if (c) b.c = c;
    if (at(o.dash, i)) b.dash = true;
    if (o.op !== undefined) b.op = o.op;
    return b;
  });
  const labels = o.idx === false ? [] : vals.map((v, i) => ({ id: p + 'i' + i, x: csR(x0 + i * (w + gap) + w / 2), y: y + h + 20, text: o.idxText ? o.idxText(i) : String(i), c: 'm', size: 13, anchor: 'middle', mono: true }));
  return { boxes, labels };
}
function csCellX(n, i, o) { o = o || {}; const w = o.w || 64; const gap = o.gap === undefined ? 8 : o.gap; const x0 = o.x !== undefined ? o.x : (CS_W - (n * w + (n - 1) * gap)) / 2; return csR(x0 + i * (w + gap) + w / 2); }
// Bars for the sorts. arr is [{ v, k }]: k is the item's identity, so a bar keeps its id when it moves.
// colOf(item, index) gives the fill; marks are [name, index, text, colour] pointers drawn under the bars.
function csBars(arr, colOf, o) {
  o = o || {};
  const n = arr.length; const w = o.w || 72; const gap = o.gap || 18; const base = o.base || 420; const unit = o.unit || 32;
  const x0 = (CS_W - (n * w + (n - 1) * gap)) / 2;
  const bars = arr.map((it, i) => { const h = 24 + it.v * unit; return { id: 'b' + it.k, x: csR(x0 + i * (w + gap)), y: base - h, w, h, rx: 6, c: colOf(it, i), val: String(it.v) }; });
  const labels = arr.map((it, i) => ({ id: 'ix' + i, x: csR(x0 + i * (w + gap) + w / 2), y: base + 22, text: String(i), c: 'm', size: 13, anchor: 'middle', mono: true }));
  (o.marks || []).forEach(([name, i, text, c]) => labels.push({ id: 'mk' + name, x: csR(x0 + i * (w + gap) + w / 2), y: base + 48, text, c: c || 'a', size: 14, weight: 700, anchor: 'middle', mono: true }));
  return { bars, labels };
}
function csItems(vals) { return vals.map((v, k) => ({ v, k })); }
function csList(a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1] : String(a[0]); }
function csBig(v) {
  if (v < 1e6) return String(Math.round(v));
  const e = Math.floor(Math.log10(v)); return (v / Math.pow(10, e)).toFixed(1) + ' × 10^' + e;
}
// Binary-tree layout by heap index: level d, slot p -> x across `width` centred on cx.
function csTreeXY(i, o) {
  o = o || {};
  const d = Math.floor(Math.log2(i + 1)); const p = i - (Math.pow(2, d) - 1); const width = o.width || 560; const cx = o.cx || 480;
  return { x: csR(cx - width / 2 + (p + 0.5) * width / Math.pow(2, d)), y: (o.y || 70) + d * (o.dy || 76) };
}

// ---------- Foundations: Big-O by counting steps ----------
function csBigO(n) {
  const lg = Math.max(1, Math.ceil(Math.log2(n)));
  const rows = [
    ['o1', 'O(1)', 'read a[i]', 1],
    ['olog', 'O(log n)', 'binary search', lg],
    ['on', 'O(n)', 'sum a list', n],
    ['onlog', 'O(n log n)', 'merge sort', n * lg],
    ['on2', 'O(n²)', 'check every pair', n * n],
    ['o2n', 'O(2ⁿ)', 'try every subset', Math.pow(2, n)]
  ];
  const top = 70; const gapY = 66; const x0 = 250; const span = 520; const maxLog = Math.log10(Math.pow(2, 64)) + 0.5;
  const width = (c) => csR(8 + span * Math.log10(c + 1) / maxLog);
  const row = (r, i, on) => {
    const [id, name, ex, count] = r; const y = top + i * gapY;
    return {
      labels: [csLabel(id + 'n', 40, y + 8, name, { c: on ? 't' : 'm', size: 18, weight: 700, mono: true }), csLabel(id + 'e', 40, y + 30, ex, { size: 13 }),
        csLabel(id + 'v', x0 + width(count) + 12, y + 14, on ? csBig(count) + (count === 1 ? ' step' : ' steps') : '', { c: on ? 't' : 'm', size: 15, weight: 700, mono: true })],
      bars: [{ id: id + 'b', x: x0, y: y - 6, w: on ? width(count) : 0, h: 30, rx: 5, c: ['ok', 'ok', 'b', 'b', 'c', 'bad'][i] }]
    };
  };
  const upto = (k, extra) => csScene.apply(null, rows.map((r, i) => row(r, i, i <= k)).concat([{ labels: [csLabel('nlab', 920, 24, 'n = ' + n, { anchor: 'end', c: 'a', size: 18, weight: 700, mono: true })] }, extra]));
  const s = [];
  s.push(csStep('Speed is measured by counting basic steps, not seconds. Then a fast or slow computer does not change the answer.', ['nlab'], upto(-1)));
  s.push(csStep('Reading a[i] is one step, whatever n is. The work does not grow at all. That is O(1), constant time.', ['o1b'], upto(0)));
  s.push(csStep('Halving the list each time needs about log₂ n steps. For n = ' + n + ' that is ' + lg + '. Binary search lives here.', ['ologb'], upto(1)));
  s.push(csStep('One pass over every item is ' + n + ' steps for n = ' + n + '. Double n and the work doubles. That is O(n).', ['onb'], upto(2)));
  s.push(csStep('Good sorts do about n × log n steps: ' + csBig(n * lg) + ' here. Only a little worse than one pass.', ['onlogb'], upto(3)));
  s.push(csStep('Checking every pair is n × n = ' + csBig(n * n) + ' steps. Double n and the work goes up four times.', ['on2b'], upto(4)));
  s.push(csStep('Trying every subset is 2ⁿ = ' + csBig(Math.pow(2, n)) + ' steps. Each extra item doubles the work.', ['o2nb'], upto(5)));
  s.push(csStep('The bars use a log scale: one notch right means ten times more steps. Drag n and watch the gaps open up.', [], upto(5)));
  s.push(csStep('Big-O keeps only the fastest-growing part. 3n² + 5n + 2 is O(n²), because for big n the n² term swamps the rest.', ['on2b'], upto(5)));
  s.push(csStep('Big-O usually means the worst case. A linear search is 1 step if the item is first, and n steps if it is missing.', ['onb'], upto(5)));
  s.push(csStep('Memory is counted the same way. A copy of the list is O(n) extra space; two index variables are O(1).', [], upto(5)));
  s.out = rows.map((r) => r[3]);
  return s;
}

// ---------- Foundations: arrays in memory ----------
function csArrays(pos) {
  const vals = [7, 3, 9, 4, 6]; const n = vals.length; const ins = 5;
  const o = { y: 220, w: 72, gap: 0, idx: true };
  const addr = (i) => csLabel('ad' + i, csCellX(8, i, o), 200, String(1000 + 4 * i), { anchor: 'middle', size: 12, mono: true });
  const row = (arr, keys, fill, extra) => {
    const cells = csCells(arr, Object.assign({}, o, { x: csCellX(8, 0, o) - 36, keys, fill, p: 'c' }));
    const blanks = []; for (let i = arr.length; i < 8; i++) blanks.push({ id: 'free' + i, x: csCellX(8, i, o) - 36, y: o.y, w: 72, h: 56, rx: 8, dash: true, c: 'l' });
    const ad = []; for (let i = 0; i < 8; i++) ad.push(addr(i));
    return csScene({ boxes: blanks, labels: ad.concat([csLabel('cap', 120, 170, 'address', { size: 12 })]) }, cells, extra);
  };
  const keys = [0, 1, 2, 3, 4];
  const s = [];
  s.push(csStep('An array is one unbroken block of memory. Every slot has the same size, here 4 bytes, so slot addresses go up by 4.', ['ad0', 'ad1', 'ad2'], row(vals, keys)));
  s.push(csStep('To read a[3] the computer does one sum: 1000 + 3 × 4 = 1012. No searching at all, so any index is O(1).', ['c3'],
    row(vals, keys, (i) => (i === 3 ? 'a' : null), { labels: [csLabel('math', 480, 120, 'a[3] is at 1000 + 3 × 4 = 1012', { anchor: 'middle', c: 'a', size: 20, weight: 700, mono: true })] })));
  const moved = n - pos;
  s.push(csStep('Now insert 5 at index ' + pos + '. There is no gap there, so ' + (moved === 0 ? 'nothing needs to move: it is the end.' : 'the items from index ' + pos + ' on must move.'), ['new'],
    row(vals, keys, null, { boxes: [{ id: 'new', x: csCellX(8, pos, o) - 36, y: 80, w: 72, h: 56, rx: 8, label: String(ins), mono: true, size: 18, fill: 'c' }] })));
  const shifted = vals.slice(0, pos).concat([null]).concat(vals.slice(pos));
  const shKeys = keys.slice(0, pos).concat(['gap']).concat(keys.slice(pos));
  const shScene = (withNew) => {
    const arr = shifted.map((v) => (v === null ? (withNew ? ins : '') : v));
    const ks = shKeys.map((k) => (k === 'gap' ? 'new' : k));
    const sc = row(arr, ks, (i) => (i === pos && withNew ? 'c' : i > pos ? 'b' : null));
    if (!withNew) sc.boxes = sc.boxes.filter((b) => b.id !== 'cnew').concat([{ id: 'new', x: csCellX(8, pos, o) - 36, y: 80, w: 72, h: 56, rx: 8, label: String(ins), mono: true, size: 18, fill: 'c' }]);
    else sc.boxes = sc.boxes.map((b) => (b.id === 'cnew' ? Object.assign({}, b, { id: 'new' }) : b));
    return sc;
  };
  s.push(csStep(moved ? 'Each of the ' + moved + ' items slides one slot right, starting from the end so nothing is overwritten.' : 'Inserting at the end is easy: there is a free slot right there.', [], shScene(false)));
  s.push(csStep('Then 5 drops into the gap. ' + (moved ? 'We moved ' + moved + (moved === 1 ? ' item' : ' items') + ' to add one.' : 'Nothing moved.'), ['new'], shScene(true)));
  s.push(csStep('At the front, all n items move. So inserting or deleting in the middle of an array is O(n) in the worst case.', [], shScene(true)));
  const after = shifted.map((v) => (v === null ? ins : v));
  const afterKeys = shKeys.map((k) => (k === 'gap' ? 'new' : k));
  const del = Math.min(2, after.length - 1);
  const delArr = after.slice(0, del).concat(after.slice(del + 1)); const delKeys = afterKeys.slice(0, del).concat(afterKeys.slice(del + 1));
  s.push(csStep('Deleting a[' + del + '] leaves a hole, so everything after it slides one slot left to close it. Also O(n).', [], row(delArr, delKeys, (i) => (i >= del ? 'b' : null))));
  s.push(csStep('Adding at the end moves nothing when there is spare room. That is why push and append are fast.', ['free6', 'free7'], row(delArr, delKeys)));
  const big = [];
  for (let i = 0; i < 12; i++) big.push({ id: 'g' + i, x: 60 + i * 70, y: 400, w: 64, h: 44, rx: 8, c: i < 8 ? 'b' : 'l', dash: i >= 8, label: i < delArr.length ? String(delArr[i]) : '', mono: true, size: 16 });
  s.push(csStep('When the block is full, a block twice the size is made and everything is copied over. Rare copies keep append O(1) on average.', ['g0'],
    row(delArr, delKeys, null, { boxes: big, labels: [csLabel('gl', 60, 386, 'new block, twice the size', { c: 'b', size: 13 })] })));
  const grid = []; const gl = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) grid.push({ id: 'm' + r + c, x: 300 + c * 64, y: 70 + r * 52, w: 60, h: 46, rx: 6, label: r + ',' + c, mono: true, size: 13, fill: r === 1 && c === 2 ? 'a' : null });
  for (let i = 0; i < 12; i++) gl.push({ id: 'fl' + i, x: 96 + i * 64, y: 330, w: 60, h: 46, rx: 6, label: Math.floor(i / 4) + ',' + (i % 4), mono: true, size: 13, fill: i === 6 ? 'a' : null });
  s.push(csStep('A grid is stored row after row in one block. Cell (r, c) sits at r × width + c: (1, 2) is slot 1 × 4 + 2 = 6.', ['m12', 'fl6'],
    { boxes: grid.concat(gl), labels: [csLabel('gt', 300, 50, '3 × 4 grid', { size: 13 }), csLabel('ft', 96, 316, 'the same grid in memory', { size: 13 })] }));
  s.out = { moved, after };
  return s;
}

// ---------- Foundations: strings ----------
function csStrings() {
  const word = 'river'; const L = word.split('');
  const o = { y: 160, w: 72, gap: 8 };
  const base = (fill, extra) => csScene(csCells(L.map((c) => "'" + c + "'"), Object.assign({}, o, { fill, keys: L.map((c, i) => i) })), extra);
  const codes = { labels: L.map((c, i) => csLabel('cd' + i, csCellX(5, i, o), 260, String(c.charCodeAt(0)), { anchor: 'middle', c: 'b', size: 16, weight: 700, mono: true })) };
  const s = [];
  s.push(csStep("A string is an array of characters. s[0] is 'r' and s[4] is 'r' again. Reading any one by index is O(1).", ['c0', 'c4'], base((i) => (i === 0 || i === 4 ? 'a' : null))));
  s.push(csStep("Each character is stored as a number. In ASCII, 'r' is 114 and 'v' is 118, so comparing letters is comparing numbers.", ['cd0', 'cd2'], base(null, codes)));
  s.push(csStep('Comparing two strings goes letter by letter until one differs. "river" and "rival" differ at index 3, so that took 4 checks.', ['c3'],
    base((i) => (i < 3 ? 'ok' : i === 3 ? 'c' : null), { tokens: 'rival'.split('').map((c, i) => ({ id: 'w' + i, x: csCellX(5, i, o), y: 320, text: "'" + c + "'", c: i < 3 ? 'ok' : i === 3 ? 'c' : 'l' })) })));
  s.push(csStep("In Python, Java and JavaScript a string cannot change in place. s[0] = 'R' fails: strings are immutable.", ['c0'],
    base((i) => (i === 0 ? 'bad' : null), { labels: [csLabel('err', 480, 300, "s[0] = 'R'  →  error", { anchor: 'middle', c: 'bad', size: 20, weight: 700, mono: true })] })));
  const copy = csCells(['R', 'i', 'v', 'e', 'r'].map((c) => "'" + c + "'"), { y: 330, w: 72, gap: 8, p: 'n', fill: (i) => (i === 0 ? 'c' : 'b') });
  s.push(csStep("To change one letter you build a new string: 'R' + s[1:]. Every letter is copied, so even a one-letter change is O(n).", ['n0'], base(null, copy)));
  s.push(csStep('A slice like s[1:4] copies 3 letters into a new string. Slicing costs as much as the slice is long.', ['c1', 'c2', 'c3'],
    base((i) => (i >= 1 && i < 4 ? 'b' : null), csCells(["'i'", "'v'", "'e'"], { y: 330, w: 72, gap: 8, p: 'sl', fill: 'b' }))));
  const grow = []; let tot = 0;
  for (let i = 1; i <= 5; i++) { tot += i; grow.push({ id: 'gr' + i, x: 120, y: 60 + i * 52, w: i * 80, h: 40, rx: 6, fill: i === 5 ? 'c' : 'b', label: word.slice(0, i), mono: true, size: 15 }); }
  s.push(csStep('Adding one letter at a time in a loop copies the whole string every time: 1 + 2 + … + n copies, which is O(n²).', ['gr5'],
    { boxes: grow, labels: [csLabel('gt', 120, 90, 's = s + letter, five times: ' + tot + ' letters copied', { size: 14, c: 't2' })] }));
  s.push(csStep('Instead, collect the pieces in a list and join them once at the end. Each letter is copied once: O(n).', ['jn'],
    { tokens: L.map((c, i) => ({ id: 'pc' + i, x: 200 + i * 70, y: 150, text: "'" + c + "'", c: 'b' })), boxes: [{ id: 'jn', x: 330, y: 300, w: 300, h: 56, rx: 10, fill: 'ok', label: '"river"', mono: true, size: 20 }],
      arrows: [{ id: 'ja', from: { x: 480, y: 180 }, to: { x: 480, y: 296 }, c: 'ok', label: "''.join(pieces)", lx: 80, mono: true }] }));
  s.push(csStep("Unicode gives every character in every language a number. 'é' is 233. Some characters take more than one byte to store.", ['u1'],
    { tokens: [{ id: 'u0', x: 300, y: 200, text: "'a' = 97" }, { id: 'u1', x: 480, y: 200, text: "'é' = 233", fill: 'a' }, { id: 'u2', x: 660, y: 200, text: "'ж' = 1078" }] }));
  return s;
}

// ---------- Foundations: recursion ----------
function csRecursion(n) {
  const s = []; const plateW = 300; const px = 330; const baseY = 470; const ph = 46;
  const plate = (k, depth, state) => ({ id: 'p' + k, x: px, y: baseY - (depth + 1) * (ph + 6), w: plateW, h: ph, rx: 10, label: 'fact(' + k + ')' + (state ? '  ' + state : ''), mono: true, size: 16, fill: state && state.indexOf('=') >= 0 ? 'ok' : k === 1 ? 'c' : null, c: 'b' });
  const side = { labels: [csLabel('st', px, 120 - 0, '', {})] };
  const code = { labels: [csLabel('code1', 40, 40, 'def fact(n):', { c: 't2', size: 15, mono: true }), csLabel('code2', 60, 66, 'if n == 1: return 1', { c: 't2', size: 15, mono: true }), csLabel('code3', 60, 92, 'return n * fact(n - 1)', { c: 't2', size: 15, mono: true })] };
  const stackOf = (k, results) => { const boxes = []; for (let d = 0; d < k; d++) { const v = n - d; boxes.push(plate(v, d, results[v] !== undefined ? '= ' + results[v] : v === 1 ? 'base case' : 'waits for fact(' + (v - 1) + ')')); } return boxes; };
  void side;
  s.push(csStep('A recursive function solves a problem by calling itself on a smaller copy of the same problem.', [], csScene(code)));
  s.push(csStep('fact(n) = n × fact(n − 1), and fact(1) = 1. That last rule is the base case: the place where the calling stops.', ['code2'], csScene(code)));
  const res = {};
  for (let d = 1; d <= n; d++) {
    const v = n - d + 1;
    const say = d === 1 ? 'Calling fact(' + n + ') puts a plate on the call stack. It holds n = ' + n + ' while it waits for an answer.'
      : v === 1 ? 'fact(1) is the base case. It answers 1 straight away, without calling anything.'
        : 'fact(' + (v + 1) + ') calls fact(' + v + '). A new plate goes on top; the ones below are paused.';
    s.push(csStep(say, ['p' + v], csScene(code, { boxes: stackOf(d, res) })));
  }
  let acc = 1;
  for (let v = 1; v <= n; v++) {
    acc = v === 1 ? 1 : acc * v; res[v] = acc;
    const say = v === 1 ? 'fact(1) returns 1. Its plate comes off the top, and fact(2) wakes up with the answer.'
      : 'fact(' + v + ') gets ' + (acc / v) + ' back and returns ' + v + ' × ' + (acc / v) + ' = ' + acc + '.' + (v === n ? ' That is the final answer.' : ' Off comes its plate.');
    const boxes = stackOf(n - v + 1, res).map((b) => (b.id === 'p' + v ? Object.assign({}, b, { fill: 'ok' }) : b));
    s.push(csStep(say, ['p' + v], csScene(code, { boxes })));
  }
  s.push(csStep('Plates come off in the reverse order they went on: last in, first out. The call stack really is a stack.', [], csScene(code, { boxes: [plate(n, 0, '= ' + acc)] })));
  s.push(csStep('Every call must reach a base case. Without one, plates pile up until the program runs out of stack space and crashes.', ['code2'], csScene(code)));
  s.out = acc;
  return s;
}

// ---------- Sorting: shared ----------
const CS_SORT_DATA = [6, 3, 8, 2, 7, 4];
const CS_SORT_KEY = [['b', 'compared'], ['c', 'moved'], ['ok', 'in final place']];
function csSorted(arr) { for (let i = 1; i < arr.length; i++) if (arr[i - 1].v > arr[i].v) return false; return true; }

function csBubble() {
  const s = []; let arr = csItems(CS_SORT_DATA); const n = arr.length; const done = {};
  const sc = (hi, marks) => csScene(csLegend(CS_SORT_KEY), csBars(arr, (it, i) => hi[i] || (done[it.k] ? 'ok' : 'm'), { marks }));
  s.push(csStep('Bubble sort walks the list and swaps any two neighbours that are out of order. Here are six numbers to sort.', [], sc({})));
  for (let p = 0; p < n - 1; p++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - p; j++) {
      const a = arr[j]; const b = arr[j + 1]; const sw = a.v > b.v;
      if (sw) { arr = arr.slice(); arr[j] = b; arr[j + 1] = a; swapped = true; }
      if (p === 0) {
        const say = sw ? a.v + ' is bigger than ' + b.v + ', so they swap. The bigger one keeps moving right.' : a.v + ' is smaller than ' + b.v + ': already in order, so no swap.';
        s.push(csStep(say, ['b' + a.k, 'b' + b.k], sc({ [j]: sw ? 'c' : 'b', [j + 1]: sw ? 'c' : 'b' }, [['j', j, 'j'], ['j1', j + 1, 'j+1']])));
      }
    }
    const last = arr[n - 1 - p]; done[last.k] = 1;
    if (!swapped) {
      arr.forEach((it) => { done[it.k] = 1; });
      s.push(csStep('Pass ' + (p + 1) + ' made no swaps at all, so the list must be sorted. We can stop early.', [], sc({})));
      break;
    }
    s.push(csStep(p === 0 ? 'After one pass the biggest number, ' + last.v + ', has bubbled to the end. It is in its final place.' : 'Pass ' + (p + 1) + ': ' + last.v + ' bubbles up and settles into place.', ['b' + last.k], sc({})));
    if (p === n - 2) arr.forEach((it) => { done[it.k] = 1; });
  }
  arr.forEach((it) => { done[it.k] = 1; });
  s.push(csStep('Sorted. Up to n passes, each a walk over the list: O(n²) comparisons. Simple, stable, but slow on big lists.', [], sc({})));
  s.out = arr.map((it) => it.v);
  return s;
}

function csSelection() {
  const s = []; let arr = csItems(CS_SORT_DATA); const n = arr.length; const done = {};
  const sc = (hi, marks) => csScene(csLegend(CS_SORT_KEY), csBars(arr, (it, i) => hi[i] || (done[it.k] ? 'ok' : 'm'), { marks }));
  s.push(csStep('Selection sort finds the smallest number left and swaps it to the front. Then it repeats on the rest.', [], sc({})));
  for (let i = 0; i < n - 1; i++) {
    let m = i; for (let j = i + 1; j < n; j++) if (arr[j].v < arr[m].v) m = j;
    const mv = arr[m]; const front = arr[i];
    if (i === 0) {
      const hi = {}; for (let j = 0; j < n; j++) hi[j] = 'b'; hi[m] = 'c';
      s.push(csStep('Pass 1 scans every number to find the smallest. It is ' + mv.v + ', at index ' + m + '.', ['b' + mv.k], sc(hi, [['min', m, 'min']])));
    }
    if (m !== i) { arr = arr.slice(); arr[i] = mv; arr[m] = front; }
    done[mv.k] = 1;
    const say = i === 0 ? 'Swap ' + mv.v + ' with the ' + front.v + ' at the front. Slot 0 is now final and never looked at again.'
      : m === i ? 'Pass ' + (i + 1) + ': the smallest left is ' + mv.v + ', and it is already in slot ' + i + '. No swap needed.'
        : 'Pass ' + (i + 1) + ': the smallest left is ' + mv.v + '. It swaps into slot ' + i + '.';
    s.push(csStep(say, ['b' + mv.k], sc({ [i]: 'c' }, [['min', i, 'slot ' + i]])));
  }
  arr.forEach((it) => { done[it.k] = 1; });
  s.push(csStep('The last number is in place by default. Sorted.', [], sc({})));
  s.push(csStep('Every pass scans the whole rest, even on a sorted list: about n²/2 comparisons, O(n²). But it makes at most n − 1 swaps.', [], sc({})));
  s.out = arr.map((it) => it.v);
  return s;
}

function csInsertion() {
  const s = []; let arr = csItems(CS_SORT_DATA); const n = arr.length;
  let sortedTo = 0;
  const sc = (hi, marks) => csScene(csLegend([['b', 'sorted part'], ['c', 'being placed']]), csBars(arr, (it, i) => hi[i] || (i <= sortedTo ? 'b' : 'm'), { marks }));
  s.push(csStep('Insertion sort grows a sorted part on the left, like sorting cards in your hand: take the next card and slide it into place.', [], sc({})));
  s.push(csStep('At first the sorted part is just ' + arr[0].v + '. One card on its own is always sorted.', ['b' + arr[0].k], sc({})));
  for (let i = 1; i < n; i++) {
    const key = arr[i]; let j = i - 1; const passed = [];
    while (j >= 0 && arr[j].v > key.v) { passed.push(arr[j].v); j--; }
    const pos = j + 1;
    arr = arr.slice(); arr.splice(i, 1); arr.splice(pos, 0, key); sortedTo = i;
    const say = passed.length === 0 ? 'Take ' + key.v + '. It is bigger than ' + arr[i - 1].v + ', so it stays where it is. No moves.'
      : 'Take ' + key.v + '. ' + csList(passed.slice().reverse()) + (passed.length === 1 ? ' is' : ' are') + ' bigger, so ' + (passed.length === 1 ? 'it slides' : 'they slide') + ' right and ' + key.v + ' drops in at index ' + pos + '.';
    s.push(csStep(say, ['b' + key.k], sc({ [pos]: 'c' }, [['k', pos, 'key']])));
  }
  s.push(csStep('Sorted. A nearly sorted list needs few slides, close to O(n). A reversed list slides everything: O(n²).', [], sc({})));
  s.push(csStep('It sorts in place, keeps equal items in order, and is quick on small lists, so real sort functions use it for short runs.', [], sc({})));
  s.out = arr.map((it) => it.v);
  return s;
}

// Merge sort on cells. Groups are drawn left to right with a gap between them; y moves with the level.
function csMergeSort() {
  const vals = [5, 2, 7, 1, 6, 3, 8, 4]; const items = csItems(vals);
  const cellW = 60; const gap = 6; const ggap = 30;
  const lay = (groups, y, fill) => {
    const total = items.length * cellW + (items.length - groups.length) * gap + (groups.length - 1) * ggap;
    let x = (CS_W - total) / 2; const boxes = [];
    groups.forEach((g, gi) => { g.forEach((it, i) => { boxes.push({ id: 'm' + it.k, x: csR(x), y, w: cellW, h: 52, rx: 8, label: String(it.v), mono: true, size: 18, fill: fill ? fill(it, gi, i) : null, c: 'b' }); x += cellW + (i < g.length - 1 ? gap : 0); }); x += ggap; });
    return boxes;
  };
  const split = (g, size) => { const out = []; for (let i = 0; i < g.length; i += size) out.push(g.slice(i, i + size)); return out; };
  const sortG = (gs) => gs.map((g) => g.slice().sort((a, b) => a.v - b.v));
  const show = (gs) => gs.map((g) => '[' + g.map((x) => x.v).join(' ') + ']').join(' ');
  const s = [];
  s.push(csStep('Merge sort splits the list in half, sorts each half, then merges the two sorted halves into one.', [], { boxes: lay([items], 60) }));
  s.push(csStep('Split it into two halves of four.', [], { boxes: lay(split(items, 4), 150) }));
  s.push(csStep('Split again, into pairs.', [], { boxes: lay(split(items, 2), 240) }));
  s.push(csStep('And again, until every piece is a single number. One number on its own is already sorted.', [], { boxes: lay(split(items, 1), 330) }));
  const g2 = sortG(split(items, 2));
  s.push(csStep('Now merge back up. Each pair merges into order: ' + show(g2) + '.', [], { boxes: lay(g2, 240, () => 'b') }));
  const g4 = sortG(split(items, 4));
  s.push(csStep('To merge two sorted lists, compare their fronts and take the smaller. Pairs become ' + show(g4) + '.', [], { boxes: lay(g4, 150, () => 'b') }));
  const final = sortG([items])[0];
  const A = g4[0].slice(); const B = g4[1].slice(); const took = [];
  while (A.length && B.length) took.push((A[0].v <= B[0].v ? A : B).shift().v);
  s.push(csStep('Last merge: ' + took.slice(0, 4).join(', then ') + '… one walk over both halves puts all eight in order.', [], { boxes: lay(g4, 150, (it) => (took.indexOf(it.v) >= 0 && took.indexOf(it.v) < 4 ? 'ok' : 'b')) }));
  s.push(csStep('Sorted: ' + final.map((x) => x.v).join(' ') + '.', [], { boxes: lay([final], 60, () => 'ok') }));
  s.push(csStep('There are log₂ 8 = 3 levels of splitting, and merging one level touches all n numbers. Total O(n log n), on any input.', [], { boxes: lay([final], 60, () => 'ok') }));
  s.push(csStep('The merge writes into a spare array, so merge sort uses O(n) extra space. It is stable: equal items keep their order.', [], { boxes: lay([final], 60, () => 'ok') }));
  s.out = final.map((x) => x.v);
  return s;
}

function csQuick() {
  const s = []; let arr = csItems([5, 2, 8, 1, 9, 3, 7, 4]); const n = arr.length; const done = {};
  const sc = (hi, marks) => csScene(csLegend([['c', 'pivot'], ['b', 'smaller than pivot'], ['ok', 'in final place']]), csBars(arr, (it, i) => hi[i] || (done[it.k] ? 'ok' : 'm'), { marks, w: 64, gap: 16 }));
  s.push(csStep('Quick sort picks a pivot, moves smaller numbers to its left and bigger ones to its right, then sorts each side the same way.', [], sc({})));
  const parts = [];
  const part = (lo, hi) => {
    const pv = arr[hi]; let i = lo; const smaller = [];
    for (let j = lo; j < hi; j++) if (arr[j].v < pv.v) { smaller.push(arr[j].v); arr = arr.slice(); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; i++; }
    const mid = arr.slice();
    arr = arr.slice(); const t = arr[i]; arr[i] = arr[hi]; arr[hi] = t;
    return { lo, hi, pv, at: i, smaller, mid };
  };
  const rec = (lo, hi) => {
    if (lo > hi) return;
    if (lo === hi) { done[arr[lo].k] = 1; return; }
    const r = part(lo, hi); parts.push(Object.assign(r, { after: arr.slice(), doneBefore: Object.assign({}, done) })); done[r.pv.k] = 1;
    rec(lo, r.at - 1); rec(r.at + 1, hi);
  };
  const keep = arr;
  rec(0, n - 1);
  const finalArr = arr; const finalDone = done;
  // replay for the pictures
  const p0 = parts[0];
  arr = keep; Object.keys(done).forEach((k) => delete done[k]);
  s.push(csStep('Take the last number, ' + p0.pv.v + ', as the pivot.', ['b' + p0.pv.k], sc({ [n - 1]: 'c' }, [['p', n - 1, 'pivot']])));
  arr = p0.mid;
  const hi1 = {}; for (let i = 0; i < p0.smaller.length; i++) hi1[i] = 'b'; hi1[n - 1] = 'c';
  s.push(csStep('Walk the rest once. ' + csList(p0.smaller) + (p0.smaller.length === 1 ? ' is' : ' are') + ' smaller than ' + p0.pv.v + ', so ' + (p0.smaller.length === 1 ? 'it is' : 'they are') + ' swapped to the front.', [], sc(hi1, [['p', n - 1, 'pivot']])));
  arr = p0.after; done[p0.pv.k] = 1;
  const hi2 = {}; for (let i = 0; i < p0.at; i++) hi2[i] = 'b';
  s.push(csStep('Swap the pivot in right after them. ' + p0.pv.v + ' is now in its final spot, index ' + p0.at + ', and never moves again.', ['b' + p0.pv.k], sc(hi2, [['p', p0.at, 'pivot']])));
  parts.slice(1).forEach((r) => {
    arr = r.after; Object.keys(r.doneBefore).forEach((k) => { done[k] = 1; }); done[r.pv.k] = 1;
    const seg = r.mid.slice(r.lo, r.hi + 1).map((x) => x.v);
    s.push(csStep('Now the part [' + seg.join(' ') + ']: pivot ' + r.pv.v + ' lands at index ' + r.at + '. Parts of size one are already done.', ['b' + r.pv.k], sc({ [r.at]: 'c' }, [['p', r.at, 'pivot']])));
  });
  arr = finalArr; Object.assign(done, finalDone); arr.forEach((it) => { done[it.k] = 1; });
  s.push(csStep('Sorted, in place, with no spare array.', [], sc({})));
  s.push(csStep('Good pivots halve the work: O(n log n) on average. Always picking the biggest gives O(n²), so real code picks pivots at random.', [], sc({})));
  s.out = arr.map((it) => it.v);
  return s;
}

function csHeapSort() {
  const vals = [3, 9, 2, 7, 5, 8, 1]; let a = csItems(vals); const n = a.length; let size = n;
  const tree = (fill) => {
    const nodes = []; const edges = [];
    a.forEach((it, i) => { const p = csTreeXY(i, { y: 60, dy: 82, width: 600 }); const inHeap = i < size; nodes.push({ id: 'n' + it.k, x: p.x, y: p.y, r: 24, label: String(it.v), size: 16, op: inHeap ? 1 : 0.2, fill: fill && fill[i] ? fill[i] : null, c: 'b' }); });
    for (let i = 1; i < size; i++) edges.push({ id: 'e' + i, from: 'n' + a[Math.floor((i - 1) / 2)].k, to: 'n' + a[i].k, w: 0.15, c: 'l' });
    return { nodes, edges };
  };
  const row = (fill) => csCells(a.map((it) => it.v), { y: 380, w: 60, gap: 6, keys: a.map((it) => it.k), p: 'a', fill: (i) => (i >= size ? 'ok' : fill && fill[i] ? fill[i] : null) });
  const sc = (fill) => csScene(tree(fill), row(fill));
  const sift = (i, lim) => { for (;;) { const l = 2 * i + 1; const r = l + 1; let m = i; if (l < lim && a[l].v > a[m].v) m = l; if (r < lim && a[r].v > a[m].v) m = r; if (m === i) return; a = a.slice(); const t = a[i]; a[i] = a[m]; a[m] = t; i = m; } };
  const s = [];
  s.push(csStep('Heap sort first turns the list into a max-heap: a tree where every parent is at least as big as its children.', [], sc()));
  s.push(csStep('No tree is really built. The children of index i live at 2i + 1 and 2i + 2, so the array already is a tree.', ['n' + a[0].k, 'n' + a[1].k, 'n' + a[2].k], sc({ 0: 'a', 1: 'b', 2: 'b' })));
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) sift(i, n);
  s.push(csStep('Fix each parent from the bottom up by sifting it down below any bigger child. Now the biggest, ' + a[0].v + ', is at the root.', ['n' + a[0].k], sc({ 0: 'a' })));
  for (let end = n - 1; end > 0; end--) {
    const top = a[0]; a = a.slice(); a[0] = a[end]; a[end] = top; size = end; sift(0, size);
    const say = end === n - 1 ? 'Swap the root ' + top.v + ' with the last item and lock it in at the end. Then sift the new root down to fix the heap.'
      : 'Take ' + top.v + ' off the top into slot ' + end + ', then sift down. The heap shrinks by one' + (end === 1 ? ' and only one item is left.' : '.');
    s.push(csStep(say, ['a' + top.k, 'n' + a[0].k], sc({ 0: 'a' })));
  }
  size = 0;
  s.push(csStep('Sorted, in place, in O(n log n): n removals, and each sift-down climbs at most log n levels. It is not stable.', [], sc()));
  s.out = a.map((it) => it.v);
  return s;
}

function csCountRadix() {
  const A = [3, 1, 4, 1, 0, 3, 2, 1]; const s = [];
  const tok = (pos) => A.map((v, i) => ({ id: 't' + i, x: pos[i][0], y: pos[i][1], text: String(v), w: 46, fill: pos[i][2] || null }));
  const top = A.map((v, i) => [210 + i * 76, 70]);
  const binX = (v) => 220 + v * 130;
  const bins = (counts) => ({ boxes: [0, 1, 2, 3, 4].map((v) => ({ id: 'bin' + v, x: binX(v) - 50, y: 140, w: 100, h: 44, rx: 8, label: 'value ' + v, size: 14, c: 'b' })),
    labels: [0, 1, 2, 3, 4].map((v) => csLabel('cnt' + v, binX(v), 210, counts ? 'count ' + counts[v] : '', { anchor: 'middle', c: 'a', size: 15, weight: 700, mono: true })) });
  const counts = [0, 0, 0, 0, 0]; const inBin = A.map((v) => { const h = counts[v]++; return [binX(v), 250 + h * 42]; });
  s.push(csStep('Counting sort never compares two numbers. When the values are small whole numbers, it just counts each value.', [], csScene({ tokens: tok(top) }, bins())));
  s.push(csStep('Drop each number into the box for its value. The 1 shows up ' + counts[1] + ' times, the 4 only once.', ['cnt1'], csScene({ tokens: tok(inBin) }, bins(counts))));
  const order = A.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0] || x[1] - y[1]);
  const outPos = []; order.forEach(([v, i], j) => { outPos[i] = [210 + j * 76, 470, 'ok']; });
  s.push(csStep('Read the boxes left to right, writing each value as many times as it was counted: ' + order.map((x) => x[0]).join(' ') + '.', [], csScene({ tokens: tok(outPos) }, bins(counts))));
  s.push(csStep('One pass to count, one to write: O(n + k), where k is the range of values. A huge range like 0 to a billion wastes space.', [], csScene({ tokens: tok(outPos) }, bins(counts))));
  const R = [329, 457, 657, 839, 436, 720, 355];
  const rTok = (arr, d) => ({ tokens: arr.map((v, j) => ({ id: 'r' + v, x: 130 + j * 116, y: 260, text: String(v), w: 84, sub: d ? 'digit ' + String(v)[3 - d] : '', fill: d === 3 ? 'ok' : null })) });
  s.push(csStep('Radix sort handles bigger numbers one digit at a time, from the last digit to the first, with a stable counting sort each time.', [], rTok(R, 0)));
  let cur = R.slice(); const names = ['', 'ones', 'tens', 'hundreds'];
  for (let d = 1; d <= 3; d++) {
    const p = Math.pow(10, d - 1); cur = cur.slice().sort((x, y) => Math.floor(x / p) % 10 - Math.floor(y / p) % 10);
    s.push(csStep('Sort by the ' + names[d] + ' digit only: ' + cur.join(' ') + '.' + (d === 3 ? ' Now the whole list is in order.' : ''), [], rTok(cur, d)));
  }
  s.push(csStep('Stable means ties keep their order. So each pass keeps the work of the passes before it, and the last pass finishes the job.', [], rTok(cur, 3)));
  s.push(csStep('With d digits and base 10, that is d passes of O(n + 10) each: O(d × n). Not a single comparison.', [], rTok(cur, 3)));
  s.out = { counting: order.map((x) => x[0]), radix: cur };
  return s;
}

// ---------- Hashing: chaining ----------
function csHashing(m) {
  const keys = [15, 8, 22, 31, 4, 17, 29, 12]; const s = [];
  const bw = Math.min(64, Math.floor((900 - (m - 1) * 8) / m));
  const bx = (b, mm, w) => csR((CS_W - (mm * w + (mm - 1) * 8)) / 2 + b * (w + 8) + w / 2);
  const table = (mm, w, fillB) => ({ boxes: Array.from({ length: mm }, (_, b) => ({ id: 'bk' + b, x: bx(b, mm, w) - w / 2, y: 130, w, h: 44, rx: 8, label: String(b), mono: true, size: 14, c: 'b', fill: fillB && fillB[b] ? fillB[b] : null })), labels: [csLabel('tl', 40, 116, 'buckets', { size: 13 })] });
  const placed = (n, mm, w, hiKey) => {
    const depth = {}; const toks = [];
    keys.forEach((k, i) => {
      if (i < n) { const b = k % mm; const d = depth[b] = (depth[b] || 0) + 1; toks.push({ id: 'k' + k, x: bx(b, mm, w), y: 180 + d * 44, text: String(k), w: Math.max(40, w - 6), fill: k === hiKey ? 'a' : null }); }
      else toks.push({ id: 'k' + k, x: csR(160 + i * 90), y: 48, text: String(k), w: 52, c: 'm' });
    });
    return { tokens: toks, depth };
  };
  const first = keys[0];
  s.push(csStep('A hash map keeps keys in an array of buckets. A hash function turns each key into a bucket number.', [], csScene(table(m, bw), placed(0, m, bw))));
  s.push(csStep('Here the hash is key mod ' + m + '. h(' + first + ') = ' + first + ' mod ' + m + ' = ' + (first % m) + ', so ' + first + ' goes in bucket ' + (first % m) + '. One sum, no search.', ['k' + first, 'bk' + (first % m)], csScene(table(m, bw), placed(1, m, bw, first))));
  let col = -1; const seen = {}; keys.forEach((k, i) => { const b = k % m; if (col < 0 && seen[b] !== undefined) col = i; seen[b] = 1; });
  if (col > 0) {
    const k = keys[col];
    s.push(csStep(k + ' mod ' + m + ' = ' + (k % m) + ' too. Two keys landing in the same bucket is called a collision.', ['k' + k, 'bk' + (k % m)], csScene(table(m, bw, { [k % m]: 'c' }), placed(col + 1, m, bw, k))));
  } else s.push(csStep('With ' + m + ' buckets these keys happen not to collide. With more keys, two would surely share a bucket.', [], csScene(table(m, bw), placed(keys.length, m, bw))));
  s.push(csStep('Chaining keeps a short list in every bucket. A key that collides simply joins the list for its bucket.', [], csScene(table(m, bw), placed(Math.max(col + 1, 2), m, bw))));
  const all = placed(keys.length, m, bw); let worst = 0; let wb = 0; Object.keys(all.depth).forEach((b) => { if (all.depth[b] > worst) { worst = all.depth[b]; wb = Number(b); } });
  s.push(csStep('All ' + keys.length + ' keys are in. The busiest bucket, ' + wb + ', holds ' + worst + (worst === 1 ? ' key.' : ' keys.'), ['bk' + wb], csScene(table(m, bw, { [wb]: 'c' }), all)));
  const look = 29;
  s.push(csStep('To find ' + look + ', hash it to bucket ' + (look % m) + ', then walk only that short list. On average that is O(1).', ['k' + look], csScene(table(m, bw, { [look % m]: 'a' }), placed(keys.length, m, bw, look))));
  s.push(csStep('If every key landed in one bucket, a lookup would walk all n keys: O(n). A good hash function spreads keys evenly.', [], csScene(table(m, bw), all)));
  const lf = keys.length / m;
  s.push(csStep('The load factor is keys ÷ buckets: ' + keys.length + ' ÷ ' + m + ' ≈ ' + lf.toFixed(2) + '. The higher it gets, the longer the lists.', [], csScene(table(m, bw), all, { labels: [csLabel('lf', 920, 116, 'load ' + lf.toFixed(2), { anchor: 'end', c: 'a', size: 15, weight: 700, mono: true })] })));
  const m2 = m * 2; const bw2 = Math.min(64, Math.floor((900 - (m2 - 1) * 8) / m2));
  s.push(csStep('So the table grows to ' + m2 + ' buckets and every key is hashed again. Rare big moves keep the average cost O(1).', [], csScene(table(m2, bw2), placed(keys.length, m2, bw2))));
  s.out = { buckets: keys.map((k) => k % m), worst };
  return s;
}

// ---------- Hashing: open addressing ----------
function csOpenAddr() {
  const m = 11; const keys = [12, 23, 5, 34, 16, 9, 27]; const slot = new Array(m).fill(null); const where = {}; const probes = {};
  keys.forEach((k) => { let b = k % m; const path = [b]; while (slot[b] !== null) { b = (b + 1) % m; path.push(b); } slot[b] = k; where[k] = b; probes[k] = path; });
  const cw = 70; const x = (b) => csR((CS_W - (m * cw + (m - 1) * 6)) / 2 + b * (cw + 6) + cw / 2);
  const sc = (n, hi, extra, tomb) => {
    const boxes = Array.from({ length: m }, (_, b) => ({ id: 's' + b, x: x(b) - cw / 2, y: 260, w: cw, h: 52, rx: 8, c: 'b', label: tomb === b ? '×' : '', mono: true, size: 18, dash: tomb === b }));
    const labels = Array.from({ length: m }, (_, b) => csLabel('si' + b, x(b), 336, String(b), { anchor: 'middle', size: 13, mono: true }));
    const tokens = keys.map((k, i) => (i < n && tomb !== where[k] ? { id: 'k' + k, x: x(where[k]), y: 286, text: String(k), w: cw - 12, fill: hi === k ? 'a' : null } : i >= n ? { id: 'k' + k, x: csR(200 + i * 90), y: 90, text: String(k), w: 52 } : null)).filter(Boolean);
    return csScene({ boxes, labels, tokens }, extra);
  };
  const path = (k) => ({ arrows: probes[k].slice(0, -1).map((b, i) => ({ id: 'pr' + i, from: { x: x(b), y: 236 }, to: { x: x(probes[k][i + 1]), y: 236 }, c: 'c', w: 2.5 })) });
  const s = [];
  s.push(csStep('Open addressing keeps every key inside the table itself. No lists: if a slot is taken, try the next one.', [], sc(0)));
  const say = (k) => { const p = probes[k]; return p.length === 1 ? k + ' mod 11 = ' + p[0] + '. Slot ' + p[0] + ' is free, so it goes straight in.' : k + ' mod 11 = ' + p[0] + ', but that slot is taken. Linear probing tries the next slots and lands in ' + where[k] + '.'; };
  for (let i = 0; i < 5; i++) s.push(csStep(say(keys[i]), ['k' + keys[i]], sc(i + 1, keys[i], path(keys[i]))));
  s.push(csStep(say(9) + ' Then 27 hashes to 5 and walks on to ' + where[27] + '.', ['k27'], sc(7, 27, path(27))));
  s.push(csStep('Keys bunch into runs called clusters, and every run makes the next probe longer. Slots ' + where[12] + ' to ' + where[34] + ' and 5 to ' + where[27] + ' are clusters.', [], sc(7)));
  s.push(csStep('To find 34, start at slot 1 and walk until you meet 34 or an empty slot. An empty slot means the key is not here.', ['k34'], sc(7, 34, path(34))));
  s.push(csStep('Deleting 23 cannot just empty slot 2, or the search for 34 would stop there. Leave a tombstone that searches walk past.', ['s2'], sc(7, null, null, where[23])));
  s.push(csStep('Open addressing needs spare room: about 70% full at most. Past that, probes get long, so the table grows and rehashes.', [], sc(7, null, null, where[23])));
  s.push(csStep('Other probe orders spread keys better: quadratic probing jumps 1, 4, 9 slots ahead, and double hashing uses a second hash.', [], sc(7)));
  s.out = slot;
  return s;
}

// ---------- Linear: linked list ----------
function csLinked() {
  const nw = 96; const nh = 56; const y = 220;
  const node = (id, v, x, yy, fill) => ({ id, x, y: yy === undefined ? y : yy, w: nw, h: nh, rx: 10, label: String(v), mono: true, size: 18, c: 'b', fill: fill || null });
  const next = (id, a, b, yy, c) => ({ id, from: { x: a.x + nw, y: (yy === undefined ? y : yy) + 20 }, to: { x: b.x, y: (yy === undefined ? y : yy) + 20 }, c: c || 'b', w: 2.5 });
  const lay = (vals, ids, x0) => vals.map((v, i) => node(ids[i], v, (x0 || 70) + i * 150));
  const chain = (boxes, extra) => {
    const arrows = []; for (let i = 0; i + 1 < boxes.length; i++) arrows.push(next('nx' + boxes[i].id, boxes[i], boxes[i + 1]));
    const last = boxes[boxes.length - 1];
    const nul = { id: 'nul', x: last.x + nw + 70, y: y + 20, text: 'NULL', w: 60, c: 'm' };
    arrows.push({ id: 'nx' + last.id, from: { x: last.x + nw, y: y + 20 }, to: { x: nul.x - 30, y: y + 20 }, c: 'm', w: 2 });
    const head = { id: 'head', x: boxes[0].x + nw / 2, y: 120, text: 'head', w: 70, fill: 'a' };
    arrows.push({ id: 'ha', from: { x: head.x, y: 138 }, to: { x: head.x, y: y }, c: 'a', w: 2.5 });
    return csScene({ boxes, arrows, tokens: [nul, head] }, extra);
  };
  const base = lay([4, 9, 2, 7], ['A', 'B', 'C', 'D']);
  const s = [];
  s.push(csStep('A linked list is a chain of nodes. Each node holds a value and a pointer to the next node.', [], chain(base)));
  s.push(csStep('Nodes can sit anywhere in memory. Only the pointers keep the order, and the last node points to null.', ['nul'], chain(base)));
  s.push(csStep('To reach the third node you start at head and follow two pointers. Getting to index i is O(i), not O(1) like an array.', ['C'],
    chain(base.map((b, i) => (i < 3 ? Object.assign({}, b, { fill: i === 2 ? 'a' : 'b' }) : b)))));
  const withHead = [node('N', 5, 70, y)].concat(lay([4, 9, 2, 7], ['A', 'B', 'C', 'D'], 220));
  s.push(csStep('Insert 5 at the front: point the new node at the old head, then move head to it. Two pointer changes, O(1).', ['N'], chain(withHead.map((b) => (b.id === 'N' ? Object.assign({}, b, { fill: 'c' }) : b)))));
  const mid = [node('N', 5, 40), node('A', 4, 180), node('B', 9, 320), node('M', 6, 460), node('C', 2, 600), node('D', 7, 740)];
  s.push(csStep('Insert 6 after the 9 you are holding: new.next = 9.next, then 9.next = new. Also O(1), no shifting.', ['M'], chain(mid.map((b) => (b.id === 'M' ? Object.assign({}, b, { fill: 'c' }) : b)))));
  const skip = [node('N', 5, 70), node('A', 4, 220), node('B', 9, 370), node('M', 6, 520), node('D', 7, 670)];
  s.push(csStep('Delete the 2 by skipping it: 6.next = 6.next.next. Nothing points at it now, so its memory is freed.', ['M', 'D'],
    chain(skip, { boxes: [Object.assign(node('C', 2, 595, 360), { op: 0.35, dash: true })] })));
  const tail = { tokens: [{ id: 'tail', x: 670 + nw / 2, y: 120, text: 'tail', w: 70, fill: 'b' }], arrows: [{ id: 'ta', from: { x: 670 + nw / 2, y: 138 }, to: { x: 670 + nw / 2, y: y }, c: 'b', w: 2.5 }] };
  s.push(csStep('Keep a tail pointer as well, and adding at the end becomes O(1) too.', ['tail'], chain(skip, tail)));
  const prev = { arrows: skip.slice(1).map((b, i) => ({ id: 'pv' + b.id, from: { x: b.x, y: y + 40 }, to: { x: skip[i].x + nw, y: y + 40 }, c: 'c', w: 2.5 })) };
  s.push(csStep('A doubly linked list adds a prev pointer to every node. You can walk backwards and unlink a node you hold in O(1).', [], chain(skip, prev)));
  const circ = chain(skip, { arrows: [{ id: 'nxD', from: { x: 670 + nw / 2, y: y + nh }, to: { x: 70 + nw / 2, y: y + nh }, c: 'a', w: 2.5, label: 'back to the head', ly: 30 }] });
  circ.tokens = circ.tokens.filter((t) => t.id !== 'nul');
  s.push(csStep('In a circular list the last node points back to the head instead of null. Handy for taking turns round a table.', ['nxD'], circ));
  s.push(csStep('Arrays win at reading by index. Linked lists win at inserting and deleting where you already stand.', [], chain(skip)));
  return s;
}

// ---------- Linear: stack and queue ----------
function csStackQueue() {
  const s = [];
  const stack = (vals, hi) => {
    const boxes = []; for (let i = 0; i < 5; i++) boxes.push({ id: 'st' + i, x: 120, y: 420 - i * 58, w: 180, h: 50, rx: 8, c: 'b', dash: i >= vals.length, label: i < vals.length ? String(vals[i]) : '', mono: true, size: 18, fill: hi === i ? 'c' : null });
    const top = { id: 'top', x: 340, y: 445 - vals.length * 58, text: 'top = ' + vals.length, w: 96, fill: 'a' };
    return { boxes, tokens: [top], labels: [csLabel('sl', 120, 100, 'STACK · last in, first out', { c: 't', size: 15, weight: 700 })] };
  };
  const queue = (slots, head, tail, hi) => {
    const boxes = slots.map((v, i) => ({ id: 'q' + i, x: 470 + i * 76, y: 300, w: 68, h: 52, rx: 8, c: 'b', dash: v === null, label: v === null ? '' : String(v), mono: true, size: 18, fill: hi === i ? 'c' : null }));
    const labels = slots.map((v, i) => csLabel('qi' + i, 504 + i * 76, 374, String(i), { anchor: 'middle', size: 13, mono: true }))
      .concat([csLabel('ql', 470, 100, 'QUEUE · first in, first out', { c: 't', size: 15, weight: 700 })]);
    const tokens = [{ id: 'qh', x: 504 + head * 76, y: 250, text: 'head', w: 60, fill: 'a' }, { id: 'qt', x: 504 + tail * 76, y: 410, text: 'tail', w: 56, fill: 'b' }];
    return { boxes, labels, tokens };
  };
  const Q0 = [null, null, null, null, null, null];
  s.push(csStep('A stack is last in, first out, like a pile of plates. A queue is first in, first out, like a line at a shop.', [], csScene(stack([]), queue(Q0, 0, 0))));
  s.push(csStep('A stack on an array: push writes at index top, then adds 1 to top. Push 3, then 8. Each push is O(1).', ['st1'], csScene(stack([3, 8], 1), queue(Q0, 0, 0))));
  s.push(csStep('Push 5, then pop. Pop takes from the top, so the 5 pushed last comes off first.', ['st2'], csScene(stack([3, 8, 5], 2), queue(Q0, 0, 0))));
  s.push(csStep('Peek reads a[top − 1] without removing it. Undo buttons and the call stack both work this way.', ['st1'], csScene(stack([3, 8], 1), queue(Q0, 0, 0))));
  s.push(csStep('A queue on an array keeps two indexes: tail, where new items join, and head, where they leave. Enqueue 3, 8 and 5.', ['qt'], csScene(stack([3, 8]), queue([3, 8, 5, null, null, null], 0, 3, 2))));
  s.push(csStep('Dequeue takes from head and moves head right: out goes 3. Shifting everyone left instead would cost O(n).', ['qh'], csScene(stack([3, 8]), queue([null, 8, 5, null, null, null], 1, 3, 1))));
  const QF = [9, 8, 5, 1, 4, 6];
  s.push(csStep('Enqueue 1, 4, 6 and 9. When tail runs off the end it wraps round to index 0, where the 3 used to be. A circular queue.', ['q0'], csScene(stack([3, 8]), queue(QF, 1, 1, 0))));
  s.push(csStep('Wrapping is one sum: tail = (tail + 1) mod size. Now head equals tail and all six slots are full, so keep a count to tell full from empty.', ['qt', 'qh'], csScene(stack([3, 8]), queue(QF, 1, 1))));
  s.push(csStep('Both can sit on a linked list too: a stack pushes and pops at the head; a queue adds at the tail and removes at the head.', [], csScene(stack([3, 8]), queue(QF, 1, 1))));
  s.push(csStep('Reach for a stack to match brackets, undo, or walk depth first. Reach for a queue to take turns or walk breadth first.', [], csScene(stack([3, 8]), queue(QF, 1, 1))));
  return s;
}

// ---------- Linear: deque ----------
function csDeque() {
  const m = 8; const cw = 76; const x = (i) => csR((CS_W - (m * cw + (m - 1) * 6)) / 2 + i * (cw + 6) + cw / 2);
  const sc = (slots, front, back, hi, extra) => csScene({
    boxes: slots.map((v, i) => ({ id: 'd' + i, x: x(i) - cw / 2, y: 240, w: cw, h: 56, rx: 8, c: 'b', dash: v === null, label: v === null ? '' : String(v), mono: true, size: 18, fill: hi === i ? 'c' : null })),
    labels: slots.map((v, i) => csLabel('di' + i, x(i), 320, String(i), { anchor: 'middle', size: 13, mono: true })),
    tokens: [{ id: 'fr', x: x(front), y: 190, text: 'front', w: 70, fill: 'a' }, { id: 'bk', x: x(back), y: 356, text: 'back', w: 64, fill: 'b' }]
  }, extra);
  const E = [null, null, null, null, null, null, null, null];
  const s = [];
  s.push(csStep('A deque, said "deck", is a queue open at both ends. You can add or remove at the front and at the back, each in O(1).', [], sc(E, 0, 0)));
  s.push(csStep('On a circular array it keeps a front index and a back index. Push 3 and then 5 at the back.', ['d0', 'd1'], sc([3, 5, null, null, null, null, null, null], 0, 1, 1)));
  s.push(csStep('Push 8 at the front. Index 0 is taken, so front steps back one and wraps round to slot 7.', ['d7', 'fr'], sc([3, 5, null, null, null, null, null, 8], 7, 1, 7)));
  s.push(csStep('Reading from front to back now gives 8, 3, 5. The wrap is just index math: front = (front − 1 + size) mod size.', ['fr'], sc([3, 5, null, null, null, null, null, 8], 7, 1)));
  s.push(csStep('Pop at the back: 5 leaves and back moves left to slot 0. Pop at the front: 8 leaves and front moves to slot 0.', ['d0'], sc([3, null, null, null, null, null, null, null], 0, 0, 0)));
  const win = [1, 3, 2, 5, 4];
  s.push(csStep('Deques shine in sliding windows: keep the indexes of useful values in order, drop stale ones at the front and beaten ones at the back.', [],
    { tokens: win.map((v, i) => ({ id: 'w' + i, x: 260 + i * 110, y: 200, text: String(v), w: 60, fill: i === 3 || i === 4 ? 'b' : null })), labels: [csLabel('wl', 480, 290, 'window of 3: deque keeps 5, 4', { anchor: 'middle', c: 'b', size: 16, weight: 700 })] }));
  s.push(csStep('The front of that deque is always the biggest value in the window, so each window maximum is read in O(1).', ['w3'],
    { tokens: win.map((v, i) => ({ id: 'w' + i, x: 260 + i * 110, y: 200, text: String(v), w: 60, fill: i === 3 ? 'a' : i === 4 ? 'b' : null })), labels: [csLabel('wl', 480, 290, 'max of [2 5 4] is 5', { anchor: 'middle', c: 'a', size: 16, weight: 700 })] }));
  s.push(csStep('A deque can act as a stack or a queue. Python has collections.deque, Java has ArrayDeque, C++ has std::deque.', [], sc([3, null, null, null, null, null, null, null], 0, 0)));
  return s;
}

// ---------- Trees: binary search tree shared ----------
// A BST as nested objects; layout x by in-order rank, y by depth. Node ids follow the value.
function csBstInsert(root, v) { if (!root) return { v, l: null, r: null }; if (v < root.v) root.l = csBstInsert(root.l, v); else root.r = csBstInsert(root.r, v); return root; }
function csBstBuild(vals) { let r = null; vals.forEach((v) => { r = csBstInsert(r, v); }); return r; }
function csBstOrder(t, kind, out) {
  out = out || []; if (!t) return out;
  if (kind === 'pre') out.push(t.v);
  csBstOrder(t.l, kind, out);
  if (kind === 'in') out.push(t.v);
  csBstOrder(t.r, kind, out);
  if (kind === 'post') out.push(t.v);
  return out;
}
function csBstLevel(t) { const out = []; const q = t ? [t] : []; while (q.length) { const n = q.shift(); out.push(n.v); if (n.l) q.push(n.l); if (n.r) q.push(n.r); } return out; }
function csBstScene(t, o) {
  o = o || {}; const order = csBstOrder(t, 'in'); const nodes = []; const edges = [];
  const gap = Math.min(100, 760 / Math.max(1, order.length - 1));
  const x0 = 480 - gap * (order.length - 1) / 2;
  const walk = (n, d, parent) => {
    if (!n) return;
    const x = csR(x0 + order.indexOf(n.v) * gap); const y = 60 + d * (o.dy || 92);
    nodes.push({ id: 'v' + n.v, x, y, r: 24, label: String(n.v), size: 16, c: 'b', fill: o.fill && o.fill[n.v] ? o.fill[n.v] : null, sub: o.sub && o.sub[n.v] !== undefined ? String(o.sub[n.v]) : null, sc: 'a', subMono: true });
    if (parent) edges.push({ id: 'e' + n.v, from: 'v' + parent.v, to: 'v' + n.v, w: 0.15, c: o.edge && o.edge[n.v] ? o.edge[n.v] : 'l' });
    walk(n.l, d + 1, n); walk(n.r, d + 1, n);
  };
  walk(t, 0, null);
  return { nodes, edges };
}
function csBstPath(t, v) { const p = []; let n = t; while (n) { p.push(n.v); if (v === n.v) break; n = v < n.v ? n.l : n.r; } return p; }
const CS_BST = [8, 3, 10, 1, 6, 14, 4, 7];

function csTrees() {
  const t = csBstBuild(CS_BST); const s = [];
  const sc = (o, extra) => csScene(csBstScene(t, o), extra);
  const line = (id, text, c) => ({ labels: [csLabel(id, 480, 490, text, { anchor: 'middle', c: c || 'a', size: 18, weight: 700, mono: true })] });
  s.push(csStep('A tree is nodes joined by edges with no loops. The node at the top, here 8, is the root.', ['v8'], sc({ fill: { 8: 'a' } })));
  s.push(csStep('Each node has one parent above it and up to two children below in a binary tree. 3 is the parent of 1 and 6.', ['v3', 'v1', 'v6'], sc({ fill: { 3: 'a', 1: 'b', 6: 'b' } })));
  s.push(csStep('Nodes with no children are leaves: 1, 4, 7 and 14. Any node with everything under it forms a subtree.', ['v1', 'v4', 'v7', 'v14'], sc({ fill: { 1: 'ok', 4: 'ok', 7: 'ok', 14: 'ok' } })));
  s.push(csStep('Depth counts edges down from the root: 6 is at depth 2. The height of the tree is its deepest leaf: 3 here.', ['v6', 'v4'], sc({ sub: { 8: 'd0', 3: 'd1', 10: 'd1', 1: 'd2', 6: 'd2', 14: 'd2', 4: 'd3', 7: 'd3' } })));
  const walks = [['pre', 'Pre-order visits a node, then its left subtree, then its right. Copying a tree uses this order.'],
    ['in', 'In-order visits left, then the node, then right. On a search tree like this one it gives the values sorted.'],
    ['post', 'Post-order visits both subtrees before the node. Deleting a tree or adding up sizes uses this order.']];
  const out = {};
  walks.forEach(([k, say]) => {
    const ord = csBstOrder(t, k); out[k] = ord; const sub = {}; ord.forEach((v, i) => { sub[v] = i + 1; });
    s.push(csStep(say, [], sc({ sub }, line('ln', k + '-order: ' + ord.join(' ')))));
  });
  const lvl = csBstLevel(t); out.level = lvl; const sub = {}; lvl.forEach((v, i) => { sub[v] = i + 1; });
  s.push(csStep('Level order reads the tree row by row, top to bottom, using a queue. This is breadth-first search on a tree.', [], sc({ sub }, line('ln', 'level order: ' + lvl.join(' ')))));
  s.push(csStep('The first three are depth-first: recursion, or a stack, goes deep before wide. Level order goes wide before deep.', [], sc({}, line('ln', 'depth first: stack · breadth first: queue', 'b'))));
  s.push(csStep('Every walk visits each node once, so each costs O(n) time. The extra space is the height for depth-first walks.', [], sc({})));
  s.out = out;
  return s;
}

function csBst() {
  let t = csBstBuild(CS_BST); const s = [];
  const sc = (o) => csBstScene(t, o);
  const pathFill = (p, last) => { const f = {}; p.forEach((v) => { f[v] = 'b'; }); if (last !== undefined) f[last] = 'a'; return f; };
  s.push(csStep('In a binary search tree, everything left of a node is smaller and everything right is bigger. That rule holds at every node.', ['v8'], sc({ fill: { 8: 'a' } })));
  const p7 = csBstPath(t, 7);
  s.push(csStep('To find 7: smaller than 8, go left; bigger than 3, go right; bigger than 6, go right. Found in ' + p7.length + ' looks.', p7.map((v) => 'v' + v), sc({ fill: pathFill(p7, 7) })));
  s.push(csStep('Each look drops one level, so a search costs the height of the tree. On a bushy tree that is about log n.', [], sc({})));
  t = csBstInsert(t, 5); const p5 = csBstPath(t, 5);
  s.push(csStep('Insert 5 by searching for it: 8, 3, 6, 4, and 4 has no right child. The new leaf goes there. Nothing else moves.', ['v5'], sc({ fill: pathFill(p5, 5) })));
  const del = (n, v) => {
    if (!n) return null;
    if (v < n.v) { n.l = del(n.l, v); return n; }
    if (v > n.v) { n.r = del(n.r, v); return n; }
    if (!n.l) return n.r; if (!n.r) return n.l;
    let m = n.r; while (m.l) m = m.l; n.v = m.v; n.r = del(n.r, m.v); return n;
  };
  s.push(csStep('Delete a leaf like 1: just cut it off. Its parent forgets it.', ['v1'], sc({ fill: { 1: 'bad' } })));
  t = del(t, 1);
  s.push(csStep('Delete 10, which has one child: its child 14 moves up into its place. The order rule still holds.', ['v10'], sc({ fill: { 10: 'bad', 14: 'b' } })));
  t = del(t, 10);
  s.push(csStep('Now 10 is gone and 14 hangs straight off 8.', ['v14'], sc({ fill: { 14: 'b' } })));
  s.push(csStep('Delete 3, which has two children. Swap in its successor, the smallest value in its right subtree: 4.', ['v3', 'v4'], sc({ fill: { 3: 'bad', 4: 'a' } })));
  t = del(t, 3);
  s.push(csStep('4 now sits where 3 was, and 4’s old child 5 moves up to fill its old spot. In-order is still sorted: ' + csBstOrder(t, 'in').join(' ') + '.', ['v4', 'v5'], sc({ fill: { 4: 'a', 5: 'b' } })));
  s.push(csStep('Insert values already in order and the tree becomes one long line, so search is O(n). Balanced trees rotate to stay about log n tall.', [], sc({})));
  s.out = csBstOrder(t, 'in');
  return s;
}

// ---------- Trees: heap sift up and sift down (a min-heap) ----------
function csHeap() {
  let a = [2, 5, 3, 9, 6, 8]; const s = [];
  const sc = (fill, ghost) => {
    const nodes = []; const edges = [];
    a.forEach((v, i) => { const p = csTreeXY(i, { y: 60, dy: 86, width: 600 }); nodes.push({ id: 'h' + v, x: p.x, y: p.y, r: 24, label: String(v), size: 16, c: 'b', fill: fill && fill[v] ? fill[v] : null }); if (i) edges.push({ id: 'he' + i, from: 'h' + a[Math.floor((i - 1) / 2)], to: 'h' + v, w: 0.15, c: 'l' }); });
    const row = csCells(a, { y: 400, w: 60, gap: 6, keys: a, p: 'r', fill: (i) => (fill && fill[a[i]] ? fill[a[i]] : null) });
    return csScene({ nodes, edges }, row, ghost);
  };
  s.push(csStep('A min-heap is a tree where every parent is at most its children, so the smallest value is always at the root.', ['h2'], sc({ 2: 'a' })));
  s.push(csStep('It lives in an array. The parent of index i is at (i − 1) ÷ 2, rounded down, and the tree is always filled left to right.', [], sc()));
  a = a.concat([1]);
  s.push(csStep('Push 1: put it in the next free spot, the end of the array. Now the heap rule may be broken.', ['h1'], sc({ 1: 'c' })));
  const up = () => { let i = a.length - 1; const swaps = []; while (i > 0) { const p = Math.floor((i - 1) / 2); if (a[p] <= a[i]) break; swaps.push(a[p]); const t = a[p]; a = a.slice(); a[p] = a[i]; a[i] = t; i = p; } return swaps; };
  const sw = up();
  s.push(csStep('Sift up: while 1 is smaller than its parent, swap them. It swaps past ' + csList(sw) + ' and ends at the root.', ['h1'], sc({ 1: 'c' })));
  s.push(csStep('A push climbs at most the height of the tree, which is about log n. So push is O(log n).', [], sc({ 1: 'a' })));
  const top = a[0]; const last = a[a.length - 1]; a = [last].concat(a.slice(1, -1));
  s.push(csStep('Pop the minimum, ' + top + ': take it from the root, move the last item, ' + last + ', up to the root, and shrink the heap.', ['h' + last], sc({ [last]: 'c' })));
  const down = () => { let i = 0; const swaps = []; for (;;) { const l = 2 * i + 1; const r = l + 1; let m = i; if (l < a.length && a[l] < a[m]) m = l; if (r < a.length && a[r] < a[m]) m = r; if (m === i) break; swaps.push(a[m]); a = a.slice(); const t = a[i]; a[i] = a[m]; a[m] = t; i = m; } return swaps; };
  const sd = down();
  s.push(csStep('Sift down: swap ' + last + ' with its smaller child until both children are bigger. It swaps with ' + csList(sd) + '.', ['h' + last], sc({ [last]: 'c', [a[0]]: 'a' })));
  s.push(csStep('Now ' + a[0] + ' is at the root, the new minimum. Pop is O(log n) too, and peeking at the top is O(1).', ['h' + a[0]], sc({ [a[0]]: 'a' })));
  s.push(csStep('Building a heap from n items by sifting down from the last parent is only O(n). A priority queue is just this heap.', [], sc()));
  s.out = a.slice();
  return s;
}

// ---------- Graphs: shared ----------
const CS_GN = { A: [150, 130], B: [420, 80], C: [690, 130], D: [200, 400], E: [480, 340], F: [780, 400] };
const CS_GE = [['A', 'B', 2], ['A', 'D', 1], ['D', 'B', 3], ['B', 'C', 5], ['B', 'E', 3], ['D', 'E', 7], ['C', 'E', 1], ['C', 'F', 6], ['E', 'F', 3]];
function csGraph(o) {
  o = o || {}; const N = o.nodes || CS_GN; const E = o.edges || CS_GE;
  const nodes = Object.keys(N).map((k) => ({ id: 'g' + k, x: N[k][0], y: N[k][1], r: o.r || 26, label: k, size: o.size || 16, c: 'b', fill: o.fill && o.fill[k] ? o.fill[k] : null, sub: o.sub && o.sub[k] !== undefined ? String(o.sub[k]) : null, sc: 'a', subMono: true }));
  const edges = E.map(([a, b, w]) => { const key = a + b; const c = o.edgeC && o.edgeC[key]; return { id: 'e' + key, from: 'g' + a, to: 'g' + b, w: c ? 0.55 : 0.15, c: c || 'l', label: w === undefined ? '' : String(w), lc: c || null, op: o.edgeOp && o.edgeOp[key] !== undefined ? o.edgeOp[key] : null }; });
  return { nodes, edges };
}
function csAdj(E) { const g = {}; E.forEach(([a, b, w]) => { (g[a] = g[a] || []).push([b, w]); (g[b] = g[b] || []).push([a, w]); }); return g; }

function csGraphRep() {
  const N = { 0: [110, 120], 1: [330, 120], 2: [110, 360], 3: [330, 360], 4: [220, 480] };
  const E = [['0', '1'], ['0', '2'], ['1', '2'], ['1', '3'], ['3', '4']];
  const g = (o) => csGraph(Object.assign({ nodes: N, edges: E }, o || {}));
  const has = (i, j) => E.some(([a, b]) => (a === String(i) && b === String(j)) || (a === String(j) && b === String(i)));
  const matrix = (hi) => {
    const boxes = []; const labels = [];
    for (let i = 0; i < 5; i++) {
      labels.push(csLabel('mr' + i, 470, 128 + i * 60, String(i), { anchor: 'middle', size: 14, mono: true }), csLabel('mc' + i, 520 + i * 60, 80, String(i), { anchor: 'middle', size: 14, mono: true }));
      for (let j = 0; j < 5; j++) boxes.push({ id: 'm' + i + j, x: 494 + j * 60, y: 96 + i * 60, w: 52, h: 52, rx: 6, label: has(i, j) ? '1' : '0', mono: true, size: 16, fill: has(i, j) ? (hi && hi(i, j) ? 'a' : 'b') : null, c: 'l' });
    }
    return { boxes, labels };
  };
  const list = () => {
    const tokens = []; const labels = [];
    for (let i = 0; i < 5; i++) {
      labels.push(csLabel('lr' + i, 470, 110 + i * 70, i + ' →', { size: 16, mono: true, c: 't', weight: 700 }));
      const nb = []; for (let j = 0; j < 5; j++) if (has(i, j)) nb.push(j);
      nb.forEach((j, k) => tokens.push({ id: 'l' + i + j, x: 560 + k * 64, y: 104 + i * 70, text: String(j), w: 48, fill: 'b' }));
    }
    return { tokens, labels };
  };
  const s = [];
  s.push(csStep('A graph is a set of nodes (vertices) joined by edges. Here there are 5 nodes and 5 edges.', [], g()));
  s.push(csStep('Edges can be two-way, like friendships, or one-way, like follows. They can also carry a weight, such as a distance.', [], g({ edgeC: { 13: 'a' } })));
  s.push(csStep('Neighbours of a node are the nodes one edge away. Node 1 has three: 0, 2 and 3. That count is its degree.', ['g1'], g({ fill: { 1: 'a', 0: 'b', 2: 'b', 3: 'b' } })));
  s.push(csStep('An adjacency matrix is a V × V grid: a 1 in row i, column j means an edge from i to j. Two-way edges make it symmetric.', [], csScene(g(), matrix())));
  s.push(csStep('Is 1 joined to 3? Look at one cell: O(1). But the grid needs V² cells even when edges are few.', ['m13', 'm31'], csScene(g({ edgeC: { 13: 'a' } }), matrix((i, j) => (i === 1 && j === 3) || (i === 3 && j === 1)))));
  s.push(csStep('An adjacency list keeps, for each node, just the list of its neighbours. It takes O(V + E) space.', [], csScene(g(), list())));
  s.push(csStep('Listing the neighbours of a node costs its degree, which is what BFS and DFS need. Most graphs in problems use lists.', ['l10', 'l12', 'l13'], csScene(g({ fill: { 1: 'a' } }), list())));
  s.push(csStep('Pick a matrix for small, dense graphs or quick edge checks. Pick lists for big, sparse ones. A grid of cells is a graph too.', [], csScene(g(), list())));
  return s;
}

function csTopo() {
  const N = { plan: [110, 270], shop: [320, 130], table: [320, 410], cook: [540, 130], eat: [690, 300], wash: [880, 300] };
  const E = [['plan', 'shop'], ['shop', 'cook'], ['plan', 'table'], ['cook', 'eat'], ['table', 'eat'], ['eat', 'wash']];
  const indeg = {}; Object.keys(N).forEach((k) => { indeg[k] = 0; }); E.forEach(([, b]) => { indeg[b]++; });
  const sc = (deg, fill, extra) => csScene({
    nodes: Object.keys(N).map((k) => ({ id: 't' + k, x: N[k][0], y: N[k][1], r: 36, label: k, size: 13, c: 'b', fill: fill[k] || null, sub: deg ? 'in ' + deg[k] : null, sc: 'a', subMono: true })),
    arrows: E.map(([a, b]) => ({ id: 'a' + a + b, from: 't' + a, to: 't' + b, c: fill[a] === 'ok' ? 'm' : 'b', w: 2.5, op: fill[a] === 'ok' ? 0.35 : 1 }))
  }, extra);
  const s = [];
  s.push(csStep('A topological order lists tasks so every task comes after the ones it needs. An arrow from plan to shop means plan first.', [], sc(null, {})));
  const deg = Object.assign({}, indeg);
  s.push(csStep('Kahn’s method counts arrows coming into each task. A task with zero is ready now. Only plan is ready.', ['tplan'], sc(deg, { plan: 'a' })));
  const q = Object.keys(N).filter((k) => deg[k] === 0); const order = []; const fill = {};
  while (q.length) {
    const u = q.shift(); order.push(u); fill[u] = 'ok'; const freed = [];
    E.forEach(([a, b]) => { if (a === u) { deg[b]--; if (deg[b] === 0) { q.push(b); freed.push(b); } } });
    q.forEach((k) => { fill[k] = 'a'; });
    const say = 'Take ' + u + ' and write it down. ' + (freed.length ? 'Its arrows go, so ' + csList(freed) + (freed.length === 1 ? ' drops to zero and is ready.' : ' drop to zero and are ready.') : q.length ? 'Nothing new becomes ready.' : 'Nothing is left.');
    s.push(csStep(say, ['t' + u], sc(Object.assign({}, deg), Object.assign({}, fill), { labels: [csLabel('ord', 480, 520, 'order: ' + order.join(' → '), { anchor: 'middle', c: 'a', size: 16, weight: 700, mono: true })] })));
  }
  s.push(csStep('If tasks are left over but none has zero arrows in, there is a loop of tasks waiting on each other: no order exists.', [], sc(null, fill)));
  s.push(csStep('Each task and each arrow is handled once: O(V + E). A depth-first search that lists tasks as it finishes them works too.', [], sc(null, fill)));
  s.out = { order, edges: E };
  return s;
}

function csDijkstra() {
  const g = csAdj(CS_GE); const nodes = Object.keys(CS_GN); const dist = {}; const prev = {}; const done = {};
  nodes.forEach((k) => { dist[k] = Infinity; }); dist.A = 0;
  const sub = () => { const o = {}; nodes.forEach((k) => { o[k] = dist[k] === Infinity ? '∞' : dist[k]; }); return o; };
  const treeC = () => { const c = {}; nodes.forEach((k) => { if (prev[k]) { c[prev[k] + k] = 'ok'; c[k + prev[k]] = 'ok'; } }); return c; };
  const fillOf = (cur) => { const f = {}; nodes.forEach((k) => { if (done[k]) f[k] = 'ok'; }); if (cur) f[cur] = 'a'; return f; };
  const s = [];
  s.push(csStep('Dijkstra finds the cheapest route from one start node to every other, as long as no edge cost is negative.', [], csGraph()));
  s.push(csStep('Start: A costs 0 and every other node is unknown, ∞. Keep unsettled nodes in a min-heap ordered by cost.', ['gA'], csGraph({ sub: sub(), fill: { A: 'a' } })));
  for (let r = 0; r < nodes.length; r++) {
    let u = null; nodes.forEach((k) => { if (!done[k] && (u === null || dist[k] < dist[u])) u = k; });
    done[u] = 1; const upd = [];
    g[u].forEach(([v, w]) => { if (!done[v] && dist[u] + w < dist[v]) { dist[v] = dist[u] + w; prev[v] = u; upd.push(v + ' drops to ' + dist[v]); } });
    const say = 'Settle ' + u + ' at ' + dist[u] + ', the cheapest unsettled node. ' + (upd.length ? 'Through it, ' + csList(upd) + '.' : 'No neighbour gets cheaper through it.');
    s.push(csStep(say, ['g' + u], csGraph({ sub: sub(), fill: fillOf(u), edgeC: treeC() })));
  }
  s.push(csStep('The green edges form the shortest-path tree: each node remembers the edge it arrived by, so routes can be read back.', [], csGraph({ sub: sub(), fill: fillOf(), edgeC: treeC() })));
  s.push(csStep('With a heap, each update costs log V, so the whole run is O((V + E) log V).', [], csGraph({ sub: sub(), fill: fillOf(), edgeC: treeC() })));
  s.out = Object.assign({}, dist);
  return s;
}

function csBellman() {
  const N = { S: [110, 270], A: [360, 120], B: [360, 420], C: [620, 270], D: [860, 270] };
  const E = [['C', 'D', 1], ['A', 'C', 3], ['B', 'A', -4], ['S', 'B', 5], ['S', 'A', 2]];
  const dist = { S: 0, A: Infinity, B: Infinity, C: Infinity, D: Infinity };
  const sc = (hiE, fill) => csScene({
    nodes: Object.keys(N).map((k) => ({ id: 'g' + k, x: N[k][0], y: N[k][1], r: 26, label: k, size: 16, c: 'b', fill: (fill && fill[k]) || null, sub: dist[k] === Infinity ? '∞' : String(dist[k]), sc: 'a', subMono: true })),
    arrows: E.map(([a, b, w]) => ({ id: 'a' + a + b, from: 'g' + a, to: 'g' + b, c: hiE && hiE[a + b] ? hiE[a + b] : w < 0 ? 'c' : 'b', w: 2.5, label: String(w).replace('-', '−'), lc: w < 0 ? 'c' : 't2' }))
  });
  const s = [];
  s.push(csStep('Bellman-Ford finds cheapest routes even when some edges cost less than nothing, like the −4 from B to A.', ['aBA'], sc({ BA: 'c' })));
  s.push(csStep('Dijkstra would settle A at 2 too early. The real best is S → B → A: 5 − 4 = 1. Negative edges break its greedy choice.', ['gA'], sc({ SB: 'a', BA: 'a' }, { A: 'c' })));
  s.push(csStep('Instead, relax every edge, in any fixed order, again and again. Relax means: if going through this edge is cheaper, take it.', [], sc()));
  const n = Object.keys(N).length; let rounds = 0;
  for (let r = 1; r <= n - 1; r++) {
    const before = JSON.stringify(dist); const ch = [];
    E.forEach(([a, b, w]) => { if (dist[a] + w < dist[b]) { dist[b] = dist[a] + w; ch.push(b + ' = ' + dist[b]); } });
    rounds = r;
    if (JSON.stringify(dist) === before) { s.push(csStep('Round ' + r + ' changes nothing, so every cost is final. We can stop early.', [], sc())); break; }
    s.push(csStep('Round ' + r + ' over all five edges: ' + csList(ch) + '.', [], sc(null, (() => { const f = {}; ch.forEach((c) => { f[c[0]] = 'a'; }); return f; })())));
  }
  s.push(csStep('A shortest route uses at most V − 1 edges, so V − 1 rounds always do. Each round checks E edges: O(V × E).', [], sc()));
  s.push(csStep('One more round as a test: if any cost still drops, there is a loop with a negative total, and no cheapest route exists.', [], sc()));
  s.out = Object.assign({}, dist); s.rounds = rounds;
  return s;
}

function csFloyd() {
  const N = { 1: [90, 110], 2: [320, 110], 3: [320, 380], 4: [90, 380] };
  const E = [['1', '2', 3], ['2', '3', 2], ['1', '3', 8], ['3', '4', 1], ['4', '1', 2], ['2', '4', 7]];
  const n = 4; const INF = Infinity; const d = []; for (let i = 0; i < n; i++) { d.push([]); for (let j = 0; j < n; j++) d[i].push(i === j ? 0 : INF); }
  E.forEach(([a, b, w]) => { d[a - 1][b - 1] = w; });
  const graph = (hiNode) => ({ nodes: Object.keys(N).map((k) => ({ id: 'g' + k, x: N[k][0], y: N[k][1], r: 26, label: k, size: 16, c: 'b', fill: hiNode === Number(k) ? 'a' : null })),
    arrows: E.map(([a, b, w]) => ({ id: 'a' + a + b, from: 'g' + a, to: 'g' + b, c: 'b', w: 2.5, label: String(w), lc: 't2', lx: a + b === '13' ? -60 : a + b === '24' ? 60 : 0, ly: a + b === '13' || a + b === '24' ? -50 : -10 })) });
  const mat = (changed, via) => {
    const boxes = []; const labels = [];
    for (let i = 0; i < n; i++) {
      labels.push(csLabel('fr' + i, 500, 128 + i * 76, 'from ' + (i + 1), { anchor: 'end', size: 13 }), csLabel('fc' + i, 560 + i * 90, 70, 'to ' + (i + 1), { anchor: 'middle', size: 13 }));
      for (let j = 0; j < n; j++) boxes.push({ id: 'f' + i + j, x: 520 + j * 90, y: 92 + i * 76, w: 80, h: 64, rx: 8, label: d[i][j] === INF ? '∞' : String(d[i][j]), mono: true, size: 18, c: via !== undefined && (i === via || j === via) ? 'a' : 'l', fill: changed && changed[i + ',' + j] ? 'c' : null });
    }
    return { boxes, labels };
  };
  const s = [];
  s.push(csStep('Floyd-Warshall finds the cheapest route between every pair of nodes at once, using a table of costs.', [], csScene(graph(), mat())));
  s.push(csStep('Start with the direct edges only. Each cell is the cost from row to column; ∞ means no direct edge yet.', [], csScene(graph(), mat())));
  for (let k = 0; k < n; k++) {
    const ch = {}; const list = [];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (d[i][k] + d[k][j] < d[i][j]) { d[i][j] = d[i][k] + d[k][j]; ch[i + ',' + j] = 1; list.push((i + 1) + '→' + (j + 1)); }
    const say = 'Allow stops at node ' + (k + 1) + '. Every cell asks: is going via ' + (k + 1) + ' cheaper? ' + (list.length ? csList(list.slice(0, 4)) + (list.length > 4 ? ' and more' : '') + ' improve.' : 'Nothing improves.');
    s.push(csStep(say, ['g' + (k + 1)].concat(Object.keys(ch).map((c) => 'f' + c.replace(',', ''))), csScene(graph(k + 1), mat(ch, k))));
  }
  s.push(csStep('After every node has had its turn as a stop, the table holds all the cheapest costs. 1 to 4 is ' + d[0][3] + ', by 1 → 2 → 3 → 4.', ['f03'], csScene(graph(), mat({ '0,3': 1 }))));
  s.push(csStep('Three nested loops over n nodes: O(n³) time and O(n²) space. Fine for a few hundred nodes, and it handles negative edges.', [], csScene(graph(), mat())));
  s.out = d.map((r) => r.slice());
  return s;
}

function csKruskal() {
  const sorted = CS_GE.slice().sort((x, y) => x[2] - y[2]);
  const parent = {}; Object.keys(CS_GN).forEach((k) => { parent[k] = k; });
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const state = {}; let total = 0;
  const toks = () => sorted.map(([a, b, w], i) => ({ id: 'k' + a + b, x: 88 + i * 98, y: 500, text: a + b + ' ' + w, w: 84, fill: state[a + b] === 'in' ? 'ok' : state[a + b] === 'out' ? 'bad' : null, op: state[a + b] === 'out' ? 0.7 : 1 }));
  const sc = () => { const ec = {}; const eo = {}; Object.keys(state).forEach((k) => { if (state[k] === 'in') ec[k] = 'ok'; else eo[k] = 0.25; }); const sub = {}; Object.keys(CS_GN).forEach((k) => { sub[k] = 'set ' + find(k); }); return csScene(csGraph({ edgeC: ec, edgeOp: eo, sub }), { tokens: toks() }); };
  const s = [];
  s.push(csStep('A minimum spanning tree joins every node using the cheapest set of edges with no loop. Kruskal builds it edge by edge.', [], csScene(csGraph(), { tokens: toks() })));
  s.push(csStep('Sort all the edges from cheapest to dearest, shown along the bottom. Every node starts in a set of its own.', [], sc()));
  let taken = 0;
  for (const [a, b, w] of sorted) {
    if (taken === Object.keys(CS_GN).length - 1) break;
    const ra = find(a); const rb = find(b);
    if (ra !== rb) { parent[ra] = rb; state[a + b] = 'in'; total += w; taken++; s.push(csStep('Edge ' + a + b + ', cost ' + w + ': ' + a + ' and ' + b + ' are in different sets, so take it and union the two sets.', ['e' + a + b, 'k' + a + b], sc())); }
    else { state[a + b] = 'out'; s.push(csStep('Edge ' + a + b + ', cost ' + w + ': ' + a + ' and ' + b + ' are already in one set. Taking it would make a loop, so skip it.', ['e' + a + b, 'k' + a + b], sc())); }
  }
  s.push(csStep('Five edges join six nodes, so the tree is done. Total cost: ' + total + '.', [], sc()));
  s.push(csStep('Union-find answers "same set?" in nearly O(1). Sorting dominates: O(E log E) in all.', [], sc()));
  s.out = total;
  return s;
}

function csPrim() {
  const g = csAdj(CS_GE); const inT = { A: 1 }; const ec = {}; let total = 0;
  const sc = (front) => { const f = {}; Object.keys(inT).forEach((k) => { f[k] = 'ok'; }); const c = Object.assign({}, ec); (front || []).forEach((k) => { if (!c[k]) c[k] = 'b'; }); return csGraph({ fill: f, edgeC: c }); };
  const key = (a, b) => (CS_GE.some(([x, y]) => x === a && y === b) ? a + b : b + a);
  const frontier = () => { const out = []; Object.keys(inT).forEach((u) => g[u].forEach(([v]) => { if (!inT[v]) out.push(key(u, v)); })); return out; };
  const s = [];
  s.push(csStep('Prim also builds a minimum spanning tree, but grows one tree outward from a start node, here A.', ['gA'], sc()));
  s.push(csStep('The blue edges leave the tree. Keep them in a min-heap by cost, and always take the cheapest one.', [], sc(frontier())));
  while (Object.keys(inT).length < Object.keys(CS_GN).length) {
    let best = null; Object.keys(inT).forEach((u) => g[u].forEach(([v, w]) => { if (!inT[v] && (!best || w < best[2])) best = [u, v, w]; }));
    const [u, v, w] = best; inT[v] = 1; ec[key(u, v)] = 'ok'; total += w;
    s.push(csStep('The cheapest edge leaving the tree is ' + u + v + ', cost ' + w + '. Add it, and ' + v + ' joins the tree.', ['g' + v], sc(frontier())));
  }
  s.push(csStep('All six nodes are in. Total cost ' + total + ', the same as Kruskal: a graph’s minimum total is unique even if the tree is not.', [], sc()));
  s.push(csStep('With a heap, Prim runs in O(E log V). It suits dense graphs; Kruskal suits sparse ones whose edges are easy to sort.', [], sc()));
  s.out = total;
  return s;
}

// ---------- Math ----------
function csGcd(b0) {
  const a0 = 120; const scale = 6.5; const rows = []; let a = a0; let b = b0;
  while (b) { rows.push([a, b, Math.floor(a / b), a % b]); const r = a % b; a = b; b = r; }
  const g = a;
  const sc = (k, done) => {
    const boxes = []; const labels = [];
    rows.slice(0, k).forEach(([x, y, q, r], i) => {
      const yy = 40 + i * 78; let xx = 60;
      for (let j = 0; j < q && j < 24; j++) { boxes.push({ id: 'q' + i + '_' + j, x: csR(xx), y: yy, w: csR(y * scale - 3), h: 40, rx: 4, fill: 'b', label: y * scale > 30 ? String(y) : '', mono: true, size: 13 }); xx += y * scale; }
      if (r) boxes.push({ id: 'rm' + i, x: csR(xx), y: yy, w: csR(r * scale), h: 40, rx: 4, fill: done ? 'm' : 'c', label: r * scale > 24 ? String(r) : '', mono: true, size: 13 });
      labels.push(csLabel('eq' + i, 60, yy + 60, x + ' = ' + q + ' × ' + y + ' + ' + r, { c: 't2', size: 14, mono: true }));
    });
    return { boxes, labels };
  };
  const s = [];
  s.push(csStep('The greatest common divisor of two numbers is the biggest number that divides both. Euclid found a fast way.', [], { labels: [csLabel('gq', 480, 260, 'gcd(' + a0 + ', ' + b0 + ') = ?', { anchor: 'middle', c: 'a', size: 34, weight: 700, mono: true })] }));
  s.push(csStep('Any number that divides a and b also divides a − b, and so a mod b. So gcd(a, b) = gcd(b, a mod b).', [], { labels: [csLabel('gr', 480, 260, 'gcd(a, b) = gcd(b, a mod b)', { anchor: 'middle', c: 'a', size: 30, weight: 700, mono: true })] }));
  rows.forEach(([x, y, q, r], i) => {
    const say = 'Fit ' + y + ' into ' + x + ': it goes ' + q + (q === 1 ? ' time' : ' times') + ' with ' + r + ' left over. ' + (r ? 'Now find gcd(' + y + ', ' + r + ').' : 'Nothing left, so ' + y + ' divides both.');
    s.push(csStep(say, [r ? 'rm' + i : 'q' + i + '_0'], sc(i + 1)));
  });
  s.push(csStep('The answer is the last non-zero remainder: gcd(' + a0 + ', ' + b0 + ') = ' + g + '. Every bar above is built from blocks of ' + g + '.', [], sc(rows.length, true)));
  s.push(csStep('gcd = 1 means the two numbers share no factor at all: they are coprime. That test comes up again for modular inverses.', [], sc(rows.length, true)));
  s.push(csStep('The numbers shrink at least by half every two steps, so Euclid takes O(log n) steps. And lcm(a, b) = a × b ÷ gcd(a, b) = ' + (a0 * b0 / g) + '.', [], sc(rows.length, true)));
  s.out = g;
  return s;
}

function csSieve() {
  const N = 50; const cols = 7; const crossed = {}; const by = {};
  const sc = (hiP) => ({ boxes: Array.from({ length: N - 1 }, (_, i) => { const v = i + 2; const r = Math.floor(i / cols); const c = i % cols; return { id: 's' + v, x: 240 + c * 70, y: 30 + r * 66, w: 62, h: 56, rx: 8, label: String(v), mono: true, size: 16, op: crossed[v] ? 0.25 : 1, fill: hiP === v ? 'a' : by[v] === hiP && hiP ? 'c' : !crossed[v] && hiP === 0 ? 'ok' : null, c: 'l' }; }) });
  const s = [];
  s.push(csStep('A prime has exactly two divisors: 1 and itself. The sieve finds every prime up to n by crossing out the rest.', [], sc()));
  [2, 3, 5, 7].forEach((p) => {
    const hit = []; for (let m = p * p; m <= N; m += p) if (!crossed[m]) { crossed[m] = 1; by[m] = p; hit.push(m); }
    const say = p === 2 ? '2 is prime. Cross out its multiples from 2 × 2 = 4: every even number above 2 goes, ' + hit.length + ' in all.'
      : p + ' is the next number not crossed out, so it is prime. Cross out its multiples from ' + p + ' × ' + p + ' = ' + (p * p) + '.';
    s.push(csStep(say, ['s' + p], sc(p)));
  });
  s.push(csStep('Why start at p × p? Smaller multiples like 2 × 7 were already crossed out by a smaller prime.', ['s49'], sc(7)));
  s.push(csStep('We can stop at 7, because 8 × 8 = 64 is past 50. Every number still standing is prime.', [], sc(0)));
  const primes = []; for (let v = 2; v <= N; v++) if (!crossed[v]) primes.push(v);
  s.push(csStep('That leaves ' + primes.length + ' primes up to 50. The sieve costs about O(n log log n): close to one pass.', [], sc(0)));
  s.out = primes;
  return s;
}

function csModArith() {
  const m = 7; const cx = 270; const cy = 270; const R = 190;
  const clock = (hi, extra) => csScene({ nodes: Array.from({ length: m }, (_, i) => ({ id: 'c' + i, x: csR(cx + R * Math.sin(2 * Math.PI * i / m)), y: csR(cy - R * Math.cos(2 * Math.PI * i / m)), r: 26, label: String(i), size: 16, c: 'b', fill: hi === i ? 'a' : null })),
    labels: [csLabel('mm', cx, cy + 6, 'mod 7', { anchor: 'middle', c: 'm', size: 18, mono: true })] }, extra);
  const eq = (lines) => ({ labels: lines.map((l, i) => csLabel('q' + i, 540, 170 + i * 50, l, { c: i === lines.length - 1 ? 'a' : 't', size: 20, weight: 700, mono: true })) });
  const s = [];
  s.push(csStep('a mod m is the remainder after dividing a by m. It always lands between 0 and m − 1, like a clock with m hours.', [], clock()));
  s.push(csStep('17 mod 7: walk 17 steps round a 7-hour clock and you stop at 3, because 17 = 2 × 7 + 3.', ['c3'], clock(3, eq(['17 = 2 × 7 + 3', '17 mod 7 = 3']))));
  s.push(csStep('You can take the mod before adding: (a + b) mod m = ((a mod m) + (b mod m)) mod m. The clock does not care.', ['c1'], clock(1, eq(['(17 + 12) mod 7', '= (3 + 5) mod 7', '= 1']))));
  s.push(csStep('The same works for multiplying: (a × b) mod m = ((a mod m) × (b mod m)) mod m. Numbers stay small the whole way.', ['c1'], clock(1, eq(['(17 × 12) mod 7', '= (3 × 5) mod 7', '= 15 mod 7 = 1']))));
  s.push(csStep('That is why problems say "answer mod 1,000,000,007": take the mod after every step and nothing ever overflows.', [], clock(null, eq(['ans = (ans × x) % MOD', 'MOD = 1,000,000,007']))));
  s.push(csStep('Subtraction can go negative: (3 − 5) mod 7 should be 5. Add m before taking the mod: (3 − 5 + 7) mod 7 = 5.', ['c5'], clock(5, eq(['(3 − 5) mod 7', '= (3 − 5 + 7) mod 7', '= 5']))));
  s.push(csStep('Division does not work this way. To divide under a mod you multiply by an inverse instead, which needs its own lesson.', [], clock(null, eq(['(a ÷ b) mod m ≠', '(a mod m) ÷ (b mod m)']))));
  return s;
}

function csFastPow(e) {
  const B = 3; const M = 1000; const bits = e.toString(2).split('').reverse();
  const sq = []; let p = B % M; for (let i = 0; i < bits.length; i++) { sq.push(p); p = p * p % M; }
  let res = 1; const used = [];
  const toks = (k, showBits) => ({ tokens: sq.map((v, i) => ({ id: 'p' + i, x: 110 + i * 125, y: 200, text: String(v), w: 84, op: i < k ? 1 : 0.15, fill: showBits && bits[i] === '1' && i < k ? 'a' : null, sub: showBits ? 'bit ' + bits[i] : null })),
    labels: sq.map((v, i) => csLabel('pl' + i, 110 + i * 125, 160, '3^' + Math.pow(2, i), { anchor: 'middle', size: 14, mono: true, c: i < k ? 't2' : 'm' })) });
  const s = [];
  s.push(csStep('Work out 3^' + e + ' mod 1000. Multiplying 3 by itself ' + (e - 1) + ' more times is slow for a big power. There is a much faster way.', [], { labels: [csLabel('t', 480, 260, '3^' + e + ' mod 1000', { anchor: 'middle', c: 'a', size: 34, weight: 700, mono: true })] }));
  s.push(csStep('Square again and again: 3, 3², 3⁴, 3⁸… Each square is one multiply, with the mod taken every time.', [], toks(sq.length, false)));
  s.push(csStep(e + ' in binary is ' + e.toString(2) + '. So 3^' + e + ' is the product of the squares whose bit is 1.', [], toks(sq.length, true)));
  bits.forEach((bt, i) => {
    if (bt !== '1') return;
    res = res * sq[i] % M; used.push(Math.pow(2, i));
    if (used.length <= 5) s.push(csStep('Bit for 3^' + Math.pow(2, i) + ' is 1: multiply it in. Running answer: ' + res + '.', ['p' + i], csScene(toks(sq.length, true), { labels: [csLabel('run', 480, 330, 'answer so far: ' + res, { anchor: 'middle', c: 'a', size: 22, weight: 700, mono: true })] })));
  });
  s.push(csStep('3^' + e + ' mod 1000 = ' + res + ', since ' + e + ' = ' + used.join(' + ') + '.', [], csScene(toks(sq.length, true), { labels: [csLabel('run', 480, 330, 'answer: ' + res, { anchor: 'middle', c: 'a', size: 22, weight: 700, mono: true })] })));
  s.push(csStep('About 2 × log₂ n multiplies instead of n: a power of a billion takes about 60 steps. This is O(log n).', [], toks(sq.length, true)));
  s.out = res;
  return s;
}

function csModInv(a) {
  const p = 11; const row = Array.from({ length: p - 1 }, (_, i) => (a * (i + 1)) % p); const inv = row.indexOf(1) + 1;
  const tab = (hi) => csScene(csCells(row, { y: 230, w: 72, gap: 6, p: 'x', idxText: (i) => 'x=' + (i + 1), fill: (i) => (hi && i === inv - 1 ? 'a' : null) }),
    { labels: [csLabel('tl', 72, 210, a + ' × x mod 11', { size: 14 })] });
  let r = 1; for (let i = 0; i < p - 2; i++) r = r * a % p;
  const s = [];
  s.push(csStep('Dividing by ' + a + ' under mod 11 means multiplying by a number x with ' + a + ' × x mod 11 = 1. That x is the inverse of ' + a + '.', [], tab()));
  s.push(csStep('Here is ' + a + ' × x mod 11 for every x from 1 to 10. Each answer appears once, so exactly one x gives 1.', [], tab()));
  s.push(csStep('It is x = ' + inv + ': ' + a + ' × ' + inv + ' = ' + (a * inv) + ', and ' + (a * inv) + ' mod 11 = 1. So dividing by ' + a + ' is the same as multiplying by ' + inv + '.', ['x' + (inv - 1)], tab(true)));
  s.push(csStep('Searching every x is slow for a big modulus. Fermat’s little theorem: for a prime p, a^(p−1) mod p = 1.', [], tab(true)));
  s.push(csStep('So a × a^(p−2) mod p = 1, and the inverse is a^(p−2) mod p. Here ' + a + '^9 mod 11 = ' + r + '. Fast power gets it in O(log p).', [], tab(true)));
  s.push(csStep('Example: (8 ÷ ' + a + ') mod 11 becomes 8 × ' + inv + ' mod 11 = ' + (8 * inv % 11) + '. This is how nCr mod a prime is computed.', [], tab(true)));
  s.push(csStep('An inverse exists only when a and m share no factor. For a modulus that is not prime, extended Euclid finds it instead.', [], tab()));
  s.out = { inv, fermat: r };
  return s;
}

function csNcr(k) {
  const n = 6; const T = []; for (let i = 0; i <= n; i++) { T.push([]); for (let j = 0; j <= i; j++) T[i].push(j === 0 || j === i ? 1 : T[i - 1][j - 1] + T[i - 1][j]); }
  const bw = 60; const tri = (rowsShown, hi) => { const boxes = []; for (let i = 0; i < rowsShown; i++) for (let j = 0; j <= i; j++) boxes.push({ id: 'p' + i + '_' + j, x: csR(480 - (i + 1) * (bw + 8) / 2 + j * (bw + 8)), y: 40 + i * 62, w: bw, h: 48, rx: 8, label: String(T[i][j]), mono: true, size: 16, fill: hi && hi[i + ',' + j] ? hi[i + ',' + j] : null, c: 'l' }); return { boxes }; };
  const s = [];
  s.push(csStep('nCr counts the ways to choose r things from n when order does not matter. Picking 2 of A, B, C gives AB, AC and BC: 3 ways.', [], { tokens: ['AB', 'AC', 'BC'].map((x, i) => ({ id: 'c' + x, x: 380 + i * 100, y: 200, text: x, fill: 'b' })) }));
  s.push(csStep('If order mattered there would be 6: AB and BA count twice. Permutations are combinations times r! orderings.', [], { tokens: ['AB', 'BA', 'AC', 'CA', 'BC', 'CB'].map((x, i) => ({ id: 'q' + x, x: 230 + i * 100, y: 200, text: x, fill: i % 2 ? 'c' : 'b' })) }));
  s.push(csStep('The formula: nCr = n! ÷ (r! × (n − r)!). The factorials get huge fast, so code usually builds the answer another way.', [], { labels: [csLabel('f', 480, 260, 'nCr = n! ÷ (r! (n − r)!)', { anchor: 'middle', c: 'a', size: 30, weight: 700, mono: true })] }));
  s.push(csStep('Pascal’s triangle: every row starts and ends with 1, and every other number is the sum of the two above it.', [], tri(3)));
  s.push(csStep('Why it works: to choose r from n, either you take the last item (choose r − 1 from the rest) or you skip it (choose r).', ['p4_2'], tri(5, { '3,1': 'b', '3,2': 'b', '4,2': 'a' })));
  const hi = { [n + ',' + k]: 'a' }; if (k > 0 && k < n) { hi[(n - 1) + ',' + (k - 1)] = 'b'; hi[(n - 1) + ',' + k] = 'b'; }
  s.push(csStep('Row n holds every nC0 … nCn. Row ' + n + ' gives 6C' + k + ' = ' + T[n][k] + (k > 0 && k < n ? ', from ' + T[n - 1][k - 1] + ' + ' + T[n - 1][k] + ' above it.' : '.'), ['p' + n + '_' + k], tri(n + 1, hi)));
  s.push(csStep('Each row adds up to 2ⁿ, the number of subsets of n things. Row 6 adds to 64.', [], tri(n + 1)));
  s.push(csStep('Building the triangle takes O(n²) additions. For one big nCr mod a prime, use factorials and modular inverses.', [], tri(n + 1)));
  s.out = T[n][k];
  return s;
}

function csInclExcl() {
  const n = 30; const cnt = (f) => { let c = 0; for (let i = 1; i <= n; i++) if (f(i)) c++; return c; };
  const two = (o) => ({ rings: [{ id: 'rA', x: 400, y: 260, r: 150, c: 'b', w: 3, dash: false }, { id: 'rB', x: 560, y: 260, r: 150, c: 'c', w: 3, dash: false }].concat(o && o.C ? [{ id: 'rC', x: 480, y: 400, r: 120, c: 'ok', w: 3, dash: false }] : []),
    labels: [csLabel('la', 300, 110, 'multiples of 2', { anchor: 'middle', c: 'b', size: 15, weight: 700 }), csLabel('lb', 660, 110, 'multiples of 3', { anchor: 'middle', c: 'c', size: 15, weight: 700 })].concat(o && o.C ? [csLabel('lc', 480, 545, 'multiples of 5', { anchor: 'middle', c: 'ok', size: 15, weight: 700 })] : []).concat(o && o.labels ? o.labels : []) });
  const A = cnt((i) => i % 2 === 0); const B = cnt((i) => i % 3 === 0); const AB = cnt((i) => i % 6 === 0); const AorB = cnt((i) => i % 2 === 0 || i % 3 === 0);
  const C = cnt((i) => i % 5 === 0); const ABC = cnt((i) => i % 2 === 0 || i % 3 === 0 || i % 5 === 0);
  const s = [];
  s.push(csStep('How many numbers from 1 to 30 divide by 2 or by 3? We can count without listing them, if we are careful about overlap.', [], two()));
  s.push(csStep('Multiples of 2: 30 ÷ 2 = ' + A + '. Multiples of 3: 30 ÷ 3 = ' + B + '. But ' + A + ' + ' + B + ' = ' + (A + B) + ' is too many.', [], two({ labels: [csLabel('na', 330, 270, String(A), { anchor: 'middle', c: 't', size: 28, weight: 700, mono: true }), csLabel('nb', 630, 270, String(B), { anchor: 'middle', c: 't', size: 28, weight: 700, mono: true })] })));
  s.push(csStep('Numbers like 6 and 12 sit in both circles, so they were counted twice. They are the multiples of 6: there are ' + AB + '.', [], two({ labels: [csLabel('nab', 480, 270, String(AB), { anchor: 'middle', c: 'a', size: 28, weight: 700, mono: true })] })));
  s.push(csStep('Add the singles, subtract the overlap once: ' + A + ' + ' + B + ' − ' + AB + ' = ' + AorB + '. That is inclusion-exclusion.', [], two({ labels: [csLabel('tot', 480, 500, A + ' + ' + B + ' − ' + AB + ' = ' + AorB, { anchor: 'middle', c: 'a', size: 22, weight: 700, mono: true })] })));
  s.push(csStep('Add multiples of 5 as a third set. Add the three singles, subtract the three pairs, then add back the middle.', [], two({ C: true })));
  s.push(csStep('15 + 10 + 6 − 5 − 3 − 2 + 1 = ' + ABC + '. Numbers divisible by 2, 3 and 5 were removed too often, so they come back once.', [], two({ C: true, labels: [csLabel('tot', 480, 50, '15 + 10 + 6 − 5 − 3 − 2 + 1 = ' + ABC, { anchor: 'middle', c: 'a', size: 20, weight: 700, mono: true })] })));
  s.push(csStep('The rule: odd-sized groups are added, even-sized ones subtracted. So 30 − ' + ABC + ' = ' + (n - ABC) + ' numbers divide by none of them.', [], two({ C: true })));
  s.out = { two: AorB, three: ABC };
  return s;
}

// ---------- Bits and strings ----------
function csBits(x) {
  const Y = 106; const bitsOf = (v) => { const b = []; for (let i = 7; i >= 0; i--) b.push((v >> i) & 1); return b; };
  const row = (id, v, y, name, hi) => csScene(csCells(bitsOf(v), { y, w: 56, gap: 6, p: id, x: 300, idx: false, fill: (i) => (hi && hi[7 - i] ? hi[7 - i] : bitsOf(v)[i] ? 'b' : null) }),
    { labels: [csLabel(id + 'n', 280, y + 34, name, { anchor: 'end', c: 't', size: 16, weight: 700, mono: true }), csLabel(id + 'v', 810, y + 34, '= ' + v, { c: 'a', size: 16, weight: 700, mono: true })] });
  const places = { labels: [7, 6, 5, 4, 3, 2, 1, 0].map((p, i) => csLabel('pv' + i, 328 + i * 62, 40, String(Math.pow(2, p)), { anchor: 'middle', size: 13, mono: true })) };
  const s = [];
  const pc = bitsOf(x).filter(Boolean).length; const low = x & -x;
  s.push(csStep('A number is stored as bits. Each place is worth twice the one to its right: ' + x + ' is ' + x.toString(2).padStart(8, '0') + '.', [], csScene(places, row('x', x, 70, 'x'))));
  s.push(csStep('AND keeps a 1 only where both numbers have a 1. It is how a mask picks out the bits you care about.', [], csScene(places, row('x', x, 70, 'x'), row('y', Y, 170, 'y'), row('r', x & Y, 290, 'x & y'))));
  s.push(csStep('OR gives a 1 where either has a 1. XOR gives a 1 only where they differ, so x ^ x = 0 and x ^ 0 = x.', [], csScene(places, row('x', x, 70, 'x'), row('y', Y, 170, 'y'), row('r', x ^ Y, 290, 'x ^ y'))));
  s.push(csStep('Shifting left by 1 doubles a number; shifting right halves it, dropping the last bit. 1 << i is a mask with only bit i set.', [], csScene(places, row('x', x, 70, 'x'), row('r', (x << 1) & 255, 290, 'x << 1'))));
  const i = 4; const m = 1 << i;
  s.push(csStep('Set bit ' + i + ' with x | (1 << ' + i + '). Its value is now ' + (x | m) + '.', [], csScene(places, row('x', x, 70, 'x'), row('m', m, 170, 'mask'), row('r', x | m, 290, 'set', { [i]: 'a' }))));
  s.push(csStep('Clear bit ' + i + ' with x & ~(1 << ' + i + '), and flip it with x ^ (1 << ' + i + '). Test it with (x >> ' + i + ') & 1.', [], csScene(places, row('x', x, 70, 'x'), row('m', m, 170, 'mask'), row('r', x ^ m, 290, 'flip', { [i]: 'c' }))));
  s.push(csStep(x ? 'x & −x keeps only the lowest set bit: here ' + low + '. Fenwick trees step with exactly this trick.' : 'x is 0, so it has no lowest set bit: x & −x is 0. Drag the slider to try another number.', [], csScene(places, row('x', x, 70, 'x'), row('r', low, 290, 'x & −x', { [Math.log2(low || 1)]: 'a' }))));
  s.push(csStep('x & (x − 1) clears the lowest set bit. Repeat until x is 0 and count the rounds: ' + x + ' has ' + pc + (pc === 1 ? ' set bit.' : ' set bits.'), [], csScene(places, row('x', x, 70, 'x'), row('r', x & (x - 1), 290, 'x & (x−1)'))));
  s.push(csStep('So x is a power of two exactly when x > 0 and x & (x − 1) = 0. ' + x + (x > 0 && (x & (x - 1)) === 0 ? ' is one.' : ' is not.'), [], csScene(places, row('x', x, 70, 'x'), row('r', x & (x - 1), 290, 'x & (x−1)'))));
  s.push(csStep('Counting bits for every number from 0 to n is quick too: bits(i) = bits(i >> 1) + (i & 1).', [], csScene(places, row('x', x, 70, 'x'), row('r', x >> 1, 290, 'x >> 1'))));
  s.out = { pc, low, and: x & Y, xor: x ^ Y };
  return s;
}

function csPrefixFn(P) { const pi = new Array(P.length).fill(0); for (let i = 1, k = 0; i < P.length; i++) { while (k && P[i] !== P[k]) k = pi[k - 1]; if (P[i] === P[k]) k++; pi[i] = k; } return pi; }
function csKmp() {
  const P = 'ABABC'; const T = 'ABABDABABABC'; const pi = csPrefixFn(P); const cw = 60;
  const text = (hi) => csCells(T.split(''), { y: 120, w: cw, gap: 6, p: 't', x: 84, fill: (i) => (hi && hi[i] ? hi[i] : null) });
  const pat = (off, hi) => ({ boxes: P.split('').map((c, i) => ({ id: 'p' + i, x: 84 + (off + i) * (cw + 6), y: 230, w: cw, h: 56, rx: 8, label: c, mono: true, size: 18, c: 'b', fill: hi && hi[i] ? hi[i] : null })) });
  const piRow = { boxes: pi.map((v, i) => ({ id: 'pi' + i, x: 300 + i * 74, y: 410, w: 64, h: 48, rx: 8, label: String(v), mono: true, size: 18, c: 'a' })), labels: P.split('').map((c, i) => csLabel('pc' + i, 332 + i * 74, 396, c, { anchor: 'middle', size: 14, mono: true })).concat([csLabel('pt', 280, 440, 'prefix fn', { anchor: 'end', size: 14 })]) };
  const s = [];
  s.push(csStep('Find "' + P + '" in the text. The simple way slides the pattern one place on each mismatch and compares again from scratch.', [], csScene(text(), pat(0))));
  s.push(csStep('KMP never moves backwards in the text. After a mismatch it already knows how much of the pattern still lines up.', [], csScene(text(), pat(0))));
  s.push(csStep('For each spot in the pattern, the prefix function stores the longest part that is both a prefix and a suffix of it so far.', [], csScene(text(), pat(0), piRow)));
  s.push(csStep('At "ABAB" the answer is 2: "AB" starts it and ends it. So if we fail right after "ABAB", "AB" is already matched.', ['pi3'], csScene(text(), pat(0, { 0: 'b', 1: 'b', 2: 'a', 3: 'a' }), piRow)));
  // the search
  let j = 0; let found = -1; const events = [];
  for (let i = 0; i < T.length; i++) {
    while (j && T[i] !== P[j]) { events.push({ i, j, to: pi[j - 1] }); j = pi[j - 1]; }
    if (T[i] === P[j]) j++;
    if (j === P.length) { found = i - P.length + 1; break; }
  }
  const e0 = events[0];
  const hiT = {}; for (let k = 0; k < e0.i; k++) hiT[k] = 'ok'; hiT[e0.i] = 'bad';
  s.push(csStep('Compare along: A B A B match, then D meets C. A mismatch at pattern spot ' + e0.j + '.', ['t' + e0.i], csScene(text(hiT), pat(0, { 4: 'bad' }), piRow)));
  s.push(csStep('Jump: the prefix function says 2 letters still match, so slide the pattern to line up its "AB" with the text’s last "AB".', ['pi3'], csScene(text(hiT), pat(e0.i - e0.to, { 0: 'b', 1: 'b' }), piRow)));
  s.push(csStep('D still does not match, and no smaller prefix helps, so the pattern starts fresh after the D. The text pointer never went back.', [], csScene(text({ [e0.i]: 'bad' }), pat(e0.i + 1), piRow)));
  const hiF = {}; for (let k = found; k < found + P.length; k++) hiF[k] = 'ok';
  s.push(csStep('Keep going the same way. The pattern is found at index ' + found + '.', [], csScene(text(hiF), pat(found, { 0: 'ok', 1: 'ok', 2: 'ok', 3: 'ok', 4: 'ok' }), piRow)));
  s.push(csStep('Building the prefix function is O(m) and the search is O(n), so KMP is O(n + m) even on the nastiest text.', [], csScene(text(hiF), pat(found), piRow)));
  s.out = { pi, found };
  return s;
}

function csZ() {
  const S = 'aabxaab'; const n = S.length; const z = new Array(n).fill(0);
  for (let i = 1, l = 0, r = 0; i < n; i++) { if (i < r) z[i] = Math.min(r - i, z[i - l]); while (i + z[i] < n && S[z[i]] === S[i + z[i]]) z[i]++; if (i + z[i] > r) { l = i; r = i + z[i]; } }
  const cells = (hi, show) => csScene(csCells(S.split(''), { y: 140, w: 72, gap: 8, p: 's', fill: (i) => (hi && hi[i] ? hi[i] : null) }),
    { boxes: z.map((v, i) => ({ id: 'z' + i, x: csCellX(n, i, { w: 72, gap: 8 }) - 36, y: 330, w: 72, h: 52, rx: 8, label: show && show(i) ? (i === 0 ? '–' : String(v)) : '', mono: true, size: 18, c: 'a', dash: !(show && show(i)) })), labels: [csLabel('zl', 90, 362, 'Z', { anchor: 'middle', c: 'a', size: 18, weight: 700, mono: true })] });
  const s = [];
  s.push(csStep('The Z-array says, for every position i, how many letters starting at i match the start of the string.', [], cells()));
  s.push(csStep('At i = 4, "aab" matches the first three letters "aab" and then the string ends. So Z[4] = 3.', ['z4'], cells({ 0: 'b', 1: 'b', 2: 'b', 4: 'a', 5: 'a', 6: 'a' }, (i) => i === 4)));
  s.push(csStep('At i = 1, "a" matches but then "b" meets "a". So Z[1] = 1. At i = 2, "b" does not match "a" at all: Z[2] = 0.', ['z1', 'z2'], cells({ 0: 'b', 1: 'a' }, (i) => i <= 2 && i > 0)));
  s.push(csStep('Speed-up: keep the window [l, r) of the rightmost match found. Inside it, copy the Z value already worked out for that spot.', [], cells({ 4: 'b', 5: 'b', 6: 'b' }, (i) => i <= 4)));
  s.push(csStep('Then only extend past r by comparing new letters. r only moves right, so the whole array takes O(n).', [], cells(null, () => true)));
  s.push(csStep('Z = [–, ' + z.slice(1).join(', ') + '].', [], cells(null, () => true)));
  s.push(csStep('To find a pattern, build Z for pattern + "$" + text. Any spot whose Z equals the pattern length is a match.', [], cells(null, () => true)));
  s.out = z;
  return s;
}

function csRollHash() {
  const T = 'abracadabra'; const P = 'cad'; const B = 31; const M = 101; const code = (c) => c.charCodeAt(0) - 96;
  const h = (str) => str.split('').reduce((a, c) => (a * B + code(c)) % M, 0);
  const m = P.length; const hp = h(P); let pow = 1; for (let i = 1; i < m; i++) pow = pow * B % M;
  const hs = []; let cur = h(T.slice(0, m)); hs.push(cur);
  for (let i = m; i < T.length; i++) { cur = ((cur - code(T[i - m]) * pow % M + M) % M * B + code(T[i])) % M; hs.push(cur); }
  const found = hs.findIndex((v, i) => v === hp && T.substr(i, m) === P);
  const sc = (w, hi) => csScene(csCells(T.split(''), { y: 120, w: 68, gap: 8, p: 't', x: 62, fill: (i) => (i >= w && i < w + m ? hi || 'b' : null) }),
    { labels: [csLabel('hw', 480, 290, 'window "' + T.substr(w, m) + '" hash = ' + hs[w], { anchor: 'middle', c: 't', size: 20, weight: 700, mono: true }), csLabel('hp', 480, 340, 'pattern "' + P + '" hash = ' + hp, { anchor: 'middle', c: 'a', size: 20, weight: 700, mono: true })] });
  const s = [];
  s.push(csStep('Rabin-Karp turns the pattern and every same-length window of the text into a number, a hash, and compares numbers.', [], sc(0)));
  s.push(csStep('Read the letters as digits in base 31 (a = 1, b = 2…) and keep the remainder mod 101. "' + P + '" hashes to ' + hp + '.', ['hp'], sc(0)));
  s.push(csStep('The first window "' + T.substr(0, m) + '" hashes to ' + hs[0] + '. Different number, so it cannot be a match. No letters compared.', ['hw'], sc(0)));
  s.push(csStep('Rolling: to slide one step, remove the left letter’s share, multiply by 31 and add the new letter. O(1) per slide.', [], sc(1)));
  s.push(csStep('Window 2, "' + T.substr(2, m) + '", hashes to ' + hs[2] + '. Still no match, so we keep rolling.', [], sc(2)));
  s.push(csStep('At index ' + found + ' the window "' + P + '" hashes to ' + hp + ' too. Equal hashes, so check the letters: a real match.', [], sc(found, 'ok')));
  s.push(csStep('Different strings can share a hash by chance. That is why a hash match is always checked letter by letter.', [], sc(found, 'ok')));
  s.push(csStep('Average cost is O(n + m). Hashing every window also finds repeated substrings fast, as in "longest duplicate" problems.', [], sc(found, 'ok')));
  s.out = { hp, hs, found };
  return s;
}

const CS_LESSONS = [
  { id: 'bigo', track: 'found', title: 'Big-O by counting steps', tag: 'how work grows with n', minutes: 4, make: csBigO,
    idea: 'Count the steps an algorithm takes as the input grows. The shape of that growth is its Big-O.',
    param: { label: 'Input size n', min: 1, max: 64, step: 1, value: 16, digits: 0, hint: 'Every step count is worked out for your n.' },
    groups: ['Binary Search', 'Hash Map'], tryIt: ['binary-search', 'contains-duplicate', 'two-sum'] },
  { id: 'arrays', track: 'found', title: 'Arrays in memory', tag: 'index math and shifting', minutes: 4, make: csArrays,
    idea: 'An array is one block of equal slots. Reading any index is one sum; inserting in the middle shifts everything after it.',
    param: { label: 'Insert at index', min: 0, max: 5, step: 1, value: 1, digits: 0, hint: 'The items that must shift are counted for your index.' },
    groups: ['Two Pointers', 'Matrix'], tryIt: ['remove-element', 'move-zeroes', 'merge-sorted-array'] },
  { id: 'strings', track: 'found', title: 'Strings as arrays', tag: 'characters, copies, joins', minutes: 3, make: csStrings,
    idea: 'A string is an array of character codes that cannot change in place, so every edit makes a copy.',
    groups: ['String Algorithms', 'Two Pointers'], tryIt: ['reverse-string', 'valid-anagram', 'string-compression'] },
  { id: 'recursion', track: 'found', title: 'Recursion from zero', tag: 'the call stack as plates', minutes: 4, make: csRecursion,
    idea: 'A function that calls itself on a smaller input, with a base case to stop. Each call waits on a stack of plates.',
    param: { label: 'n in fact(n)', min: 1, max: 6, step: 1, value: 4, digits: 0, hint: 'One plate per call: watch the stack grow and shrink.' },
    groups: ['Depth-First Search', 'Backtracking', 'Trees'], tryIt: ['fibonacci-number', 'powx-n', 'maximum-depth-of-binary-tree'] },
  { id: 'bubble', track: 'sort', title: 'Bubble sort', tag: 'swap neighbours until calm', minutes: 3, make: csBubble, sorts: true,
    idea: 'Walk the list swapping neighbours that are out of order. Each pass floats the biggest left to the end.',
    groups: ['Sorting'], tryIt: ['sort-an-array', 'height-checker'] },
  { id: 'selection', track: 'sort', title: 'Selection sort', tag: 'pick the smallest, repeat', minutes: 3, make: csSelection, sorts: true,
    idea: 'Find the smallest of what is left and swap it to the front. Few swaps, but always about n² looks.',
    groups: ['Sorting'], tryIt: ['sort-an-array', 'relative-ranks'] },
  { id: 'insertion', track: 'sort', title: 'Insertion sort', tag: 'like sorting cards', minutes: 3, make: csInsertion, sorts: true,
    idea: 'Grow a sorted part on the left. Slide each new item left past bigger ones until it fits.',
    groups: ['Sorting', 'Linked Lists'], tryIt: ['insertion-sort-list', 'sort-an-array'] },
  { id: 'merge', track: 'sort', title: 'Merge sort', tag: 'split, then merge', minutes: 4, make: csMergeSort, sorts: true,
    idea: 'Split in half until pieces are single items, then merge sorted pieces back up. Always O(n log n).',
    groups: ['Sorting', 'Linked Lists'], tryIt: ['sort-an-array', 'sort-list', 'merge-sorted-array'] },
  { id: 'quick', track: 'sort', title: 'Quick sort', tag: 'partition round a pivot', minutes: 4, make: csQuick, sorts: true,
    idea: 'Pick a pivot, put smaller items left and bigger ones right, then sort each side. Fast on average, in place.',
    groups: ['Sorting', 'Two Pointers'], tryIt: ['sort-colors', 'kth-largest-element-in-an-array', 'sort-an-array'] },
  { id: 'heapsort', track: 'sort', title: 'Heap sort', tag: 'a heap inside the array', minutes: 4, make: csHeapSort, sorts: true,
    idea: 'Arrange the array as a max-heap, then keep moving the root to the end and fixing the heap.',
    groups: ['Sorting', 'Heap'], tryIt: ['kth-largest-element-in-an-array', 'last-stone-weight', 'sort-an-array'] },
  { id: 'countradix', track: 'sort', title: 'Counting and radix sort', tag: 'sorting without comparing', minutes: 4, make: csCountRadix,
    idea: 'Small whole numbers can be counted instead of compared. Radix sort repeats that one digit at a time.',
    groups: ['Sorting'], tryIt: ['height-checker', 'relative-sort-array', 'h-index'] },
  { id: 'hashing', track: 'lin', title: 'Hashing and chaining', tag: 'how a hash map finds a key', minutes: 4, make: csHashing,
    idea: 'A hash function turns a key into a bucket number. Keys that collide share a short list in that bucket.',
    param: { label: 'Buckets', min: 5, max: 11, step: 1, value: 7, digits: 0, hint: 'Every key is hashed again for your bucket count.' },
    groups: ['Hash Map', 'Design'], tryIt: ['design-hashmap', 'two-sum', 'contains-duplicate'] },
  { id: 'openaddr', track: 'lin', title: 'Open addressing', tag: 'probing for a free slot', minutes: 4, make: csOpenAddr,
    idea: 'Keep every key in the table itself. When a slot is taken, probe the next one until a free slot turns up.',
    groups: ['Hash Map', 'Design'], tryIt: ['design-hashset', 'first-unique-character-in-a-string'] },
  { id: 'linked', track: 'lin', title: 'Linked lists', tag: 'nodes and pointers', minutes: 4, make: csLinked,
    idea: 'Nodes hold a value and a pointer to the next. Changing a pointer or two inserts or deletes in O(1).',
    groups: ['Linked Lists', 'In-place Reversal'], tryIt: ['design-linked-list', 'reverse-linked-list', 'remove-linked-list-elements'] },
  { id: 'stackqueue', track: 'lin', title: 'Stacks and queues', tag: 'last in or first in', minutes: 4, make: csStackQueue,
    idea: 'A stack takes from the top it last added to; a queue takes from the front. Both are O(1) on an array.',
    groups: ['Stack', 'Breadth-First Search'], tryIt: ['valid-parentheses', 'implement-queue-using-stacks', 'design-circular-queue'] },
  { id: 'deque', track: 'lin', title: 'Deques', tag: 'a queue open at both ends', minutes: 3, make: csDeque,
    idea: 'Add and remove at both ends in O(1). A circular array with a front and a back index does it.',
    groups: ['Monotonic Stack & Queue', 'Design', 'Sliding Window'], tryIt: ['design-circular-deque', 'sliding-window-maximum'] },
  { id: 'trees', track: 'tree', title: 'Trees and the four walks', tag: 'root, leaves, pre, in, post, level', minutes: 4, make: csTrees,
    idea: 'A tree is nodes with one parent each. Walk it depth first in three orders, or level by level with a queue.',
    groups: ['Trees', 'Depth-First Search', 'Breadth-First Search'], tryIt: ['binary-tree-inorder-traversal', 'binary-tree-level-order-traversal', 'maximum-depth-of-binary-tree'] },
  { id: 'bst', track: 'tree', title: 'Binary search trees', tag: 'search, insert, delete', minutes: 4, make: csBst,
    idea: 'Smaller to the left, bigger to the right at every node, so each comparison throws away a whole subtree.',
    groups: ['Trees', 'Binary Search'], tryIt: ['search-in-a-binary-search-tree', 'insert-into-a-binary-search-tree', 'delete-node-in-a-bst'] },
  { id: 'heap', track: 'tree', title: 'Heaps and priority queues', tag: 'sift up, sift down', minutes: 4, make: csHeap,
    idea: 'Keep the smallest at the root. A push sifts up, a pop sifts down, each in O(log n).',
    groups: ['Heap'], tryIt: ['kth-largest-element-in-a-stream', 'last-stone-weight', 'find-median-from-data-stream'] },
  { id: 'graphrep', track: 'graph', title: 'Storing a graph', tag: 'matrix or adjacency list', minutes: 3, make: csGraphRep,
    idea: 'Nodes and edges, stored as a V × V grid for quick checks or as neighbour lists to save space.',
    groups: ['Graphs', 'Breadth-First Search', 'Depth-First Search'], tryIt: ['find-center-of-star-graph', 'find-the-town-judge', 'find-if-path-exists-in-graph'] },
  { id: 'topo', track: 'graph', title: 'Topological sort', tag: 'Kahn’s ready queue', minutes: 4, make: csTopo,
    idea: 'Order tasks so each comes after what it needs: keep taking a task with nothing left waiting on it.',
    groups: ['Graphs', 'Breadth-First Search'], tryIt: ['course-schedule', 'course-schedule-ii', 'find-all-possible-recipes-from-given-supplies'] },
  { id: 'dijkstra', track: 'graph', title: 'Dijkstra’s shortest paths', tag: 'settle the cheapest node', minutes: 4, make: csDijkstra,
    idea: 'Always settle the cheapest node not yet settled and update its neighbours. Needs costs that are not negative.',
    groups: ['Graphs', 'Heap'], tryIt: ['network-delay-time', 'path-with-minimum-effort', 'path-with-maximum-probability'] },
  { id: 'bellman', track: 'graph', title: 'Bellman-Ford', tag: 'negative edges allowed', minutes: 4, make: csBellman,
    idea: 'Relax every edge, V − 1 times over. Slower than Dijkstra, but it copes with negative costs and spots negative loops.',
    groups: ['Graphs'], tryIt: ['cheapest-flights-within-k-stops', 'network-delay-time'] },
  { id: 'floyd', track: 'graph', title: 'Floyd-Warshall', tag: 'every pair at once', minutes: 4, make: csFloyd,
    idea: 'Let each node in turn be a stop on the way, and improve every pair’s cost through it. O(n³) for all pairs.',
    groups: ['Graphs', 'Dynamic Programming'], tryIt: ['course-schedule-iv', 'evaluate-division'] },
  { id: 'kruskal', track: 'graph', title: 'Kruskal and union-find', tag: 'cheapest edges, no loops', minutes: 4, make: csKruskal,
    idea: 'Take edges cheapest first, skipping any that would close a loop. Union-find tells you in nearly O(1).',
    groups: ['Graphs', 'Greedy'], tryIt: ['min-cost-to-connect-all-points', 'redundant-connection', 'number-of-operations-to-make-network-connected'] },
  { id: 'prim', track: 'graph', title: 'Prim’s spanning tree', tag: 'grow one tree outward', minutes: 3, make: csPrim,
    idea: 'Start at one node and keep adding the cheapest edge that leaves the tree, until every node is in.',
    groups: ['Graphs', 'Heap'], tryIt: ['min-cost-to-connect-all-points'] },
  { id: 'gcd', track: 'math', title: 'GCD with Euclid', tag: 'remainders all the way down', minutes: 3, make: csGcd,
    idea: 'gcd(a, b) = gcd(b, a mod b). Keep taking remainders until one is zero; the last non-zero one is the answer.',
    param: { label: 'b in gcd(120, b)', min: 10, max: 96, step: 2, value: 84, digits: 0, hint: 'Euclid’s steps are worked out for your b.' },
    groups: ['Math & Geometry'], tryIt: ['greatest-common-divisor-of-strings', 'check-if-it-is-a-straight-line'] },
  { id: 'sieve', track: 'math', title: 'The sieve of primes', tag: 'cross out the multiples', minutes: 3, make: csSieve,
    idea: 'Every number left standing after crossing out multiples of smaller primes is prime.',
    groups: ['Math & Geometry'], tryIt: ['count-primes', 'ugly-number'] },
  { id: 'modarith', track: 'math', title: 'Modular arithmetic', tag: 'clock maths', minutes: 3, make: csModArith,
    idea: 'Remainders wrap round like a clock. Add, subtract and multiply, taking the mod as you go, and numbers stay small.',
    groups: ['Math & Geometry'], tryIt: ['add-digits', 'excel-sheet-column-title', 'find-the-winner-of-the-circular-game'] },
  { id: 'fastpow', track: 'math', title: 'Fast power', tag: 'square and multiply', minutes: 3, make: csFastPow,
    idea: 'Square the base again and again and multiply in the squares the exponent’s binary digits ask for.',
    param: { label: 'Exponent n in 3^n', min: 1, max: 40, step: 1, value: 13, digits: 0, hint: 'The squares and the binary digits are recomputed for your n.' },
    groups: ['Math & Geometry', 'Bit Manipulation'], tryIt: ['powx-n'] },
  { id: 'modinv', track: 'math', title: 'Modular inverse', tag: 'dividing under a mod', minutes: 3, make: csModInv,
    idea: 'To divide by a under a prime modulus p, multiply by a^(p−2) mod p, the number that turns a into 1.',
    param: { label: 'a (mod 11)', min: 1, max: 10, step: 1, value: 3, digits: 0, hint: 'The table and the inverse are worked out for your a.' },
    groups: ['Math & Geometry'], tryIt: ['unique-paths', 'pascals-triangle-ii'] },
  { id: 'ncr', track: 'math', title: 'nCr and Pascal’s triangle', tag: 'counting choices', minutes: 4, make: csNcr,
    idea: 'Ways to choose r of n, order ignored. Each entry of Pascal’s triangle is the sum of the two above it.',
    param: { label: 'r in 6Cr', min: 0, max: 6, step: 1, value: 2, digits: 0, hint: 'Your entry and the two it comes from are lit up.' },
    groups: ['Math & Geometry', 'Dynamic Programming'], tryIt: ['pascals-triangle', 'unique-paths', 'pascals-triangle-ii'] },
  { id: 'inclexcl', track: 'math', title: 'Inclusion-exclusion', tag: 'count without double counting', minutes: 3, make: csInclExcl,
    idea: 'Add the sets, subtract every overlap of two, add back overlaps of three, and so on.',
    groups: ['Math & Geometry'], tryIt: ['ugly-number-ii', 'fizz-buzz'] },
  { id: 'bits', track: 'bits', title: 'Bit tricks', tag: 'masks, set, clear, lowest bit', minutes: 4, make: csBits,
    idea: 'AND, OR, XOR and shifts work on all bits at once. Masks pick bits out; x & (x − 1) drops the lowest one.',
    param: { label: 'x', min: 0, max: 255, step: 1, value: 44, digits: 0, hint: 'Every row is recomputed for your x.' },
    groups: ['Bit Manipulation'], tryIt: ['number-of-1-bits', 'counting-bits', 'single-number'] },
  { id: 'kmp', track: 'bits', title: 'KMP string search', tag: 'the prefix function', minutes: 4, make: csKmp,
    idea: 'Know in advance how much of the pattern still matches after a mismatch, so the text is never read twice.',
    groups: ['String Algorithms'], tryIt: ['find-the-index-of-the-first-occurrence-in-a-string', 'longest-happy-prefix', 'shortest-palindrome'] },
  { id: 'zfunc', track: 'bits', title: 'The Z-array', tag: 'prefix matches at every spot', minutes: 3, make: csZ,
    idea: 'For each position, how far the string matches its own start. Reuse earlier answers inside the rightmost match.',
    groups: ['String Algorithms'], tryIt: ['repeated-substring-pattern', 'longest-happy-prefix'] },
  { id: 'rollhash', track: 'bits', title: 'Rolling hash', tag: 'Rabin-Karp', minutes: 3, make: csRollHash,
    idea: 'Turn every window of the text into a number you can update in O(1) as it slides, and compare numbers.',
    groups: ['String Algorithms', 'Sliding Window'], tryIt: ['longest-duplicate-substring', 'repeated-substring-pattern', 'find-the-index-of-the-first-occurrence-in-a-string'] }
];
const CS_STEP_CACHE = {};
function csSteps(i, p) {
  const L = CS_LESSONS[i];
  const v = L.param ? (p === undefined || p === null ? L.param.value : p) : 0;
  const key = i + ':' + v;
  return CS_STEP_CACHE[key] || (CS_STEP_CACHE[key] = L.make(v));
}
