// Complexity reference: data and maths for pages/Complexity.dc.html (injected between the @@COMPLEXITY@@ markers by
// scripts/build_pages.py; tests/complexitycheck.js loads this file on its own). Plain functions, no DOM.
// All text is our own, plain English, sentences of 18 words or fewer. Facts follow CLRS, Sedgewick and the Python TimeComplexity page.

// ---- a) growth curves. cxLog10(id, n) is log10 of the number of steps, so n! and 2^n at big n stay finite.
const CX_CURVES = [
  { id: 'const', name: 'O(1)', say: 'constant', note: 'The same work whatever the size. Example: read one slot of a list.' },
  { id: 'log', name: 'O(log n)', say: 'logarithmic', note: 'Cut the problem in half each step. Example: binary search.' },
  { id: 'lin', name: 'O(n)', say: 'linear', note: 'Touch each item once. Example: find the largest number.' },
  { id: 'nlog', name: 'O(n log n)', say: 'linearithmic', note: 'Split in halves, then join. Example: merge sort.' },
  { id: 'quad', name: 'O(n²)', say: 'quadratic', note: 'Compare every item with every item. Example: two loops inside each other.' },
  { id: 'exp', name: 'O(2ⁿ)', say: 'exponential', note: 'The work doubles with each extra item. Example: try every subset.' },
  { id: 'fact', name: 'O(n!)', say: 'factorial', note: 'Try every order of the items. Example: every route through n towns.' }
];
// The stops of the n slider.
const CX_NS = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 10000, 100000, 1000000];
const CX_N_DEFAULT = 9;

function cxLog10Fact(n) {
  if (n < 2) return 0;
  if (n <= 170) { let s = 0; for (let k = 2; k <= n; k++) s += Math.log10(k); return s; }
  return n * Math.log10(n) - n * Math.LOG10E + 0.5 * Math.log10(2 * Math.PI * n);
}
function cxLog10(id, n) {
  const lg = Math.max(1, Math.log2(n));
  switch (id) {
    case 'const': return 0;
    case 'log': return Math.log10(lg);
    case 'lin': return Math.log10(n);
    case 'nlog': return Math.log10(n * lg);
    case 'quad': return 2 * Math.log10(n);
    case 'exp': return n * Math.log10(2);
    case 'fact': return cxLog10Fact(n);
  }
  return 0;
}
// The step count itself; Infinity when it does not fit in a number.
function cxSteps(id, n) { const v = cxLog10(id, n); return v > 300 ? Infinity : Math.pow(10, v); }

function cxGroup(x) { return Math.round(x).toLocaleString('en-US'); }
function cxSig(x) { const r = Number(x.toPrecision(2)); return r >= 100 ? cxGroup(r) : String(r); }
// A size written in words, from its log10: "9,966", "1 million", "a 1 followed by 301 zeros".
function cxCount(v) {
  if (v < 5) return cxGroup(Math.pow(10, v));
  const units = [[6, 'thousand'], [9, 'million'], [12, 'billion'], [15, 'trillion']];
  for (const [top, name] of units) {
    if (v < top) return cxSig(Math.pow(10, v - (top - 3))) + ' ' + name;
  }
  return 'a 1 followed by ' + cxGroup(Math.floor(v)) + ' zeros';
}
// How long that many steps take on a computer that does a billion simple steps each second.
function cxTime(v) {
  const s = v - 9;
  if (s < -3) return 'less than a thousandth of a second';
  if (s < 0) { const ms = cxSig(Math.pow(10, s + 3)); return 'about ' + ms + (ms === '1' ? ' millisecond' : ' milliseconds') + ', a thousandth of a second each'; }
  if (s < Math.log10(60)) return 'about ' + cxSig(Math.pow(10, s)) + ' seconds';
  if (s < Math.log10(3600)) return 'about ' + cxSig(Math.pow(10, s) / 60) + ' minutes';
  if (s < Math.log10(86400)) return 'about ' + cxSig(Math.pow(10, s) / 3600) + ' hours';
  if (s < Math.log10(86400 * 365)) return 'about ' + cxSig(Math.pow(10, s) / 86400) + ' days';
  const y = s - Math.log10(86400 * 365);
  if (y > 10.15) return 'far longer than the age of the universe';
  return 'about ' + cxCount(y) + ' years';
}
// The sentence under the chart.
function cxReadout(id, n) {
  const c = CX_CURVES.find((x) => x.id === id);
  const v = cxLog10(id, n);
  return { steps: 'At n = ' + cxGroup(n) + ', ' + c.name + ' takes about ' + cxCount(v) + ' steps.', time: 'A computer doing a billion steps a second needs ' + cxTime(v) + '.' };
}
function cxSup(s) { return String(s).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]); }
function cxLegendVal(v) { return v < 15 ? cxCount(v) : '10' + cxSup(Math.floor(v)); }
function cxShort(k) { const t = ['1', '10', '100', '1K', '10K', '100K', '1M', '10M', '100M', '1B', '10B', '100B', '1T']; return k < t.length ? t[k] : '10^' + k; }

// Geometry for the growth chart: log scale up the side, n across. P is a palette: { axis, grid, text, curves: { id: { c, dash } } }.
function cxChart(n, sel, W, H, P) {
  const mL = 52, mR = 16, mT = 16, mB = 40;
  const pw = W - mL - mR, ph = H - mT - mB;
  const top = Math.max(3, Math.ceil(2 * Math.log10(Math.max(n, 2))));
  const xs = (k) => mL + (k - 1) / (Math.max(n, 2) - 1) * pw;
  const ys = (v) => mT + ph * (1 - v / top);
  const out = { lines: [], paths: [], texts: [], top };
  const step = Math.max(1, Math.ceil(top / 6));
  for (let k = 0; k <= top; k += step) {
    out.lines.push({ x1: mL, x2: W - mR, y1: ys(k), y2: ys(k), stroke: P.grid, w: 1 });
    out.texts.push({ x: mL - 8, y: ys(k) + 5, s: cxShort(k), fill: P.text, size: 14, anchor: 'end', weight: 500 });
  }
  out.lines.push({ x1: mL, x2: mL, y1: mT, y2: mT + ph, stroke: P.axis, w: 1.5 });
  out.lines.push({ x1: mL, x2: W - mR, y1: mT + ph, y2: mT + ph, stroke: P.axis, w: 1.5 });
  out.texts.push({ x: mL, y: H - 12, s: 'n = 1', fill: P.text, size: 14, anchor: 'start', weight: 500 });
  out.texts.push({ x: W - mR, y: H - 12, s: 'n = ' + cxGroup(n), fill: P.text, size: 14, anchor: 'end', weight: 500 });
  const pts = Math.min(Math.max(n, 2), 80);
  const draw = (cv) => {
    let d = '', prev = null;
    for (let i = 0; i < pts; i++) {
      const k = pts === 1 ? 1 : 1 + (Math.max(n, 2) - 1) * i / (pts - 1);
      const v = cxLog10(cv.id, k);
      if (v > top) {
        if (prev) { const f = (top - prev.v) / (v - prev.v); d += ' L' + xs(prev.k + (k - prev.k) * f).toFixed(1) + ' ' + ys(top).toFixed(1); }
        break;
      }
      d += (d ? ' L' : 'M') + xs(k).toFixed(1) + ' ' + ys(Math.max(0, v)).toFixed(1);
      prev = { k, v };
    }
    const cc = P.curves[cv.id];
    out.paths.push({ d, stroke: cc.c, dash: cc.dash, w: cv.id === sel ? 4.5 : 2.25, opacity: cv.id === sel ? 1 : 0.8 });
  };
  CX_CURVES.filter((c) => c.id !== sel).forEach(draw);
  draw(CX_CURVES.find((c) => c.id === sel));
  return out;
}

// ---- b) how to work it out. A frame: say, stats, rows of cells ({ t, s, col, par }), bars, big (the answer).
// Cell states: idle, range, on, done, hot, dim, hide.
function cxCells(n, f) { const a = []; for (let i = 0; i < n; i++) a.push(Object.assign({ t: String(i + 1), s: 'idle' }, f ? f(i) : {})); return a; }

function cxRuleOne() {
  const row = (k, on) => [{ cells: cxCells(8, (i) => ({ s: i < k ? 'done' : (on && i === k ? 'on' : 'idle') })) }];
  return {
    id: 'one', title: 'One loop', code: 'for item in items:\n    look_at(item)', frames: [
      { say: 'A list has 8 items. A loop looks at each item one time.', stats: [['Steps so far', 0]], rows: row(0, false) },
      { say: 'The loop looks at item 1. That is 1 step.', stats: [['Steps so far', 1]], rows: row(0, true) },
      { say: 'Then item 2. That makes 2 steps in total.', stats: [['Steps so far', 2]], rows: row(1, true) },
      { say: 'Then item 3. Each item costs one step.', stats: [['Steps so far', 3]], rows: row(2, true) },
      { say: 'It keeps going. Every item gets exactly one visit.', stats: [['Steps so far', 7]], rows: row(7, false) },
      { say: '8 items took 8 steps. With 80 items it takes 80. Steps grow in line with n.', stats: [['Steps so far', 8]], rows: row(8, false), big: 'O(n)' }
    ]
  };
}
function cxRuleNested() {
  const grid = (done, cur) => Array.from({ length: 4 }, (_, r) => ({ cells: cxCells(4, (c) => ({ t: '', s: r < done ? 'done' : (cur && r === 0 && c === 0 ? 'on' : 'idle') })) }));
  return {
    id: 'nested', title: 'Nested loops', code: 'for a in items:\n    for b in items:\n        pair(a, b)', frames: [
      { say: 'Each row is one item of the outer loop. Each box in it is one inner step.', stats: [['Steps so far', 0]], rows: grid(0, false) },
      { say: 'The outer loop picks item 1. The inner loop starts at the left of the row.', stats: [['Steps so far', 1]], rows: grid(0, true) },
      { say: 'The inner loop finishes the whole row before the outer loop moves on.', stats: [['Steps so far', 4]], rows: grid(1, false) },
      { say: 'Row 2 adds 4 more steps.', stats: [['Steps so far', 8]], rows: grid(2, false) },
      { say: '4 rows of 4 steps each make 16 steps.', stats: [['Steps so far', 16]], rows: grid(4, false) },
      { say: 'n items give n rows of n steps. Ten times more items means 100 times more steps.', stats: [['Steps so far', 16]], rows: grid(4, false), big: 'O(n²)' }
    ]
  };
}
function cxRuleHalve() {
  const spans = [[0, 16], [8, 16], [8, 12], [10, 12], [11, 12]];
  const row = (k) => [{ cells: cxCells(16, (i) => { const [a, b] = spans[k]; const inside = i >= a && i < b; return { s: k === 4 && i === 11 ? 'on' : (inside ? 'range' : 'dim') }; }) }];
  const stat = (k) => [['Rounds so far', k], ['Items left', spans[k][1] - spans[k][0]]];
  const say = [
    'A sorted list has 16 items. We look for the number in box 12.',
    'Check the middle. Our number is in the right half, so the left half is dropped.',
    'Check the middle again. Half of what is left is dropped.',
    'Half again. Only 2 items are left.',
    'One item is left. We found it after 4 rounds.'
  ];
  const fr = say.map((s, k) => ({ say: s, stats: stat(k), rows: row(k) }));
  fr.push({ say: '16 items took 4 rounds. 32 items would take 5. Doubling the list adds one round.', stats: stat(4), rows: row(4), big: 'O(log n)' });
  return { id: 'halve', title: 'Halving', code: 'while size > 1:\n    size = size // 2', frames: fr };
}
function cxRuleTwo() {
  const rows = (a, b) => [{ cap: 'First loop', cells: cxCells(8, () => ({ t: '', s: a ? 'done' : 'idle' })) }, { cap: 'Second loop', cells: cxCells(8, () => ({ t: '', s: b ? 'done' : 'idle' })) }];
  return {
    id: 'two', title: 'Two loops', code: 'for a in items:\n    look_at(a)\nfor b in items:\n    look_at(b)', frames: [
      { say: 'Two loops run one after the other. Neither sits inside the other.', stats: [['Steps so far', 0]], rows: rows(false, false) },
      { say: 'The first loop takes n steps.', stats: [['Steps so far', 8]], rows: rows(true, false) },
      { say: 'The second loop takes n more steps. The total is n + n.', stats: [['Steps so far', 16]], rows: rows(true, true) },
      { say: 'n + n is 2n. We drop the 2 soon, so this is still O(n), not O(n²).', stats: [['Steps so far', 16]], rows: rows(true, true), big: 'O(n)' }
    ]
  };
}
const CX_FIB = [
  [{ t: 'fib(4)', col: 2.625 }],
  [{ t: 'fib(3)', col: 1.25, par: 0 }, { t: 'fib(2)', col: 4, par: 0, rep: 1 }],
  [{ t: 'fib(2)', col: 0.5, par: 0 }, { t: 'fib(1)', col: 2, par: 0 }, { t: 'fib(1)', col: 3.5, par: 1, rep: 1 }, { t: 'fib(0)', col: 4.5, par: 1, rep: 1 }],
  [{ t: 'fib(1)', col: 0, par: 0 }, { t: 'fib(0)', col: 1, par: 0 }]
];
const CX_MERGE = [
  [{ t: '8', col: 3.5 }],
  [{ t: '4', col: 1.5, par: 0 }, { t: '4', col: 5.5, par: 0 }],
  [{ t: '2', col: 0.5, par: 0 }, { t: '2', col: 2.5, par: 0 }, { t: '2', col: 4.5, par: 1 }, { t: '2', col: 6.5, par: 1 }],
  [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ t: '1', col: i, par: Math.floor(i / 2) }))
];
function cxTree(tree, levels, hot, plain) {
  return tree.map((lvl, li) => ({ cells: lvl.map((c) => ({ t: c.t, col: c.col, par: c.par, s: li >= levels ? 'hide' : (hot && c.rep ? 'hot' : (plain ? 'done' : (li === levels - 1 ? 'on' : 'done'))) })) }));
}
function cxCalls(rows) { let n = 0; rows.forEach((r) => r.cells.forEach((c) => { if (c.s !== 'hide') n++; })); return n; }
function cxRuleRecursion() {
  const fib = (levels, hot) => { const rows = cxTree(CX_FIB, levels, hot); return { rows, stats: [['Calls so far', cxCalls(rows)]] }; };
  const mer = (levels, plain) => { const rows = cxTree(CX_MERGE, levels, false, plain); return { rows, stats: [['Levels', levels]] }; };
  return {
    id: 'tree', title: 'Recursion trees', code: 'def fib(n):\n    if n < 2: return n\n    return fib(n - 1) + fib(n - 2)', frames: [
      Object.assign({ say: 'To find fib(4), the function calls itself twice: fib(3) and fib(2). Each box is one call.' }, fib(2, false)),
      Object.assign({ say: 'Those calls call themselves again. The tree keeps growing.' }, fib(3, false)),
      Object.assign({ say: 'fib(4) needs 9 calls. Each call below the top makes two more.' }, fib(4, false)),
      Object.assign({ say: 'Look at the orange boxes. The tree works out fib(2) twice and throws the first answer away.' }, fib(4, true)),
      Object.assign({ say: 'Each new level roughly doubles the calls. That is O(2ⁿ) growth, which gets huge fast.', big: 'O(2ⁿ)' }, fib(4, true)),
      Object.assign({ code: 'def merge_sort(items):\n    split in half, sort each half,\n    then join the two sorted halves', say: 'Merge sort is different. It splits a list of 8 into two lists of 4. Each box shows a list size.' }, mer(2)),
      Object.assign({ say: 'It halves again until every list has 1 item. That is 3 splits, which is log n.' }, mer(4)),
      Object.assign({ say: 'Joining the lists back touches every item once per level. So each level costs n.', stats: [['Levels × work each', '3 × 8 = 24']] }, mer(4, true), { stats: [['Levels × work each', '3 × 8 = 24']] }),
      Object.assign({ say: 'log n levels with n work each gives O(n log n). Far less than 2ⁿ.', big: 'O(n log n)' }, mer(4, true), { stats: [['Levels × work each', '3 × 8 = 24']] })
    ]
  };
}
function cxRuleDrop() {
  const bars = (n, dim) => {
    const v = [3 * n * n, 5 * n, 20], tot = v[0] + v[1] + v[2], names = ['3n²', '5n', '20'];
    return v.map((x, i) => ({ label: names[i], text: names[i] + ' = ' + cxGroup(x) + ' steps (' + Math.round(x / tot * 1000) / 10 + '% of the total)', frac: x / v[0], s: dim && i > 0 ? 'dim' : (i === 0 ? 'on' : 'done') }));
  };
  return {
    id: 'drop', title: 'Drop the small parts', code: 'steps = 3 * n * n + 5 * n + 20', frames: [
      { say: 'A method takes 3n² + 5n + 20 steps. Here n is 10.', stats: [['n', 10]], bars: bars(10, false) },
      { say: 'At n = 100, the 3n² part is almost all of the work.', stats: [['n', 100]], bars: bars(100, false) },
      { say: 'At n = 1,000 the small parts hardly matter at all.', stats: [['n', '1,000']], bars: bars(1000, false) },
      { say: 'So we drop the small parts, 5n and 20. Only the fastest-growing part stays.', stats: [['n', '1,000']], bars: bars(1000, true) },
      { say: 'Then we drop the constant 3. It scales the work but does not change how it grows.', stats: [['Keep', 'n²']], bars: bars(1000, true), big: 'O(n²)' }
    ]
  };
}
function cxRuleAmortized() {
  const fr = [];
  let cap = 1, size = 0, copies = 0, pushes = 0;
  const view = (copied, fresh) => [{ cells: cxCells(cap, (i) => ({ t: i < size ? String(i + 1) : '', s: i === fresh ? 'on' : (i < copied ? 'hot' : (i < size ? 'done' : 'idle')) })) }];
  const stats = () => [['Pushes', pushes], ['Copies', copies], ['Steps per push', pushes ? (Math.round((pushes + copies) / pushes * 10) / 10).toFixed(1) : '0']];
  fr.push({ say: 'A growing list has room for 1 item. Adding an item is called a push.', stats: stats(), rows: view(0, -1) });
  const push = () => { let copied = 0; if (size === cap) { copied = cap; copies += cap; cap *= 2; } size++; pushes++; return copied; };
  [1, 2, 3, 4, 5].forEach((k) => {
    const old = cap, copied = push();
    fr.push({ say: copied ? 'Push ' + k + '. The list is full, so it copies ' + old + (old === 1 ? ' item' : ' items') + ' into a space of ' + cap + '.' : 'Push ' + k + '. There is room, so this costs 1 step.', stats: stats(), rows: view(copied, size - 1) });
  });
  push(); push(); push();
  fr.push({ say: 'Pushes 6, 7 and 8 each fit. They cost 1 step each.', stats: stats(), rows: view(0, size - 1) });
  const old9 = cap, c9 = push();
  fr.push({ say: 'Push 9. The list is full again, so it copies ' + old9 + ' items into a space of ' + cap + '.', stats: stats(), rows: view(c9, size - 1) });
  fr.push({ say: 'A push is sometimes slow, but the average stays small. Averaged over many pushes, that is amortized O(1).', stats: stats(), rows: view(0, -1), big: 'O(1) amortized' });
  return { id: 'amortized', title: 'Amortized', code: 'items.append(x)  # copies when full', frames: fr };
}
function cxRules() { return [cxRuleOne(), cxRuleNested(), cxRuleHalve(), cxRuleTwo(), cxRuleRecursion(), cxRuleDrop(), cxRuleAmortized()]; }

// Lay out one frame as shapes. W is the width in pixels; P holds the colours per cell state.
function cxLayout(frame, W, P, fs) {
  const pad = 12, gap = 6;
  const out = { rects: [], texts: [], lines: [], h: 0 };
  let y = pad;
  const rows = frame.rows || [];
  if (rows.length) {
    const tree = rows.some((r) => r.cells.some((c) => c.col !== undefined));
    let maxN = 0;
    rows.forEach((r) => { maxN = Math.max(maxN, r.cells.length); });
    rows.forEach((r) => r.cells.forEach((c, i) => { c._col = c.col !== undefined ? c.col : i + (maxN - r.cells.length) / 2; }));
    let maxCol = 0, maxLen = 0;
    rows.forEach((r) => r.cells.forEach((c) => { maxCol = Math.max(maxCol, c._col); maxLen = Math.max(maxLen, c.t.length); }));
    const avail = W - 2 * pad;
    const wantW = Math.max(maxLen * 9 + 14, 22);
    let unit = Math.min(tree ? 72 : 44, avail / (maxCol + 1));
    unit = Math.max(unit, 20);
    let boxW = Math.max(Math.min(unit - gap, 66), Math.min(wantW, unit - 2));
    if (frame.cellW) { boxW = Math.min(frame.cellW, avail); unit = boxW + gap; }
    const boxH = maxLen > 2 ? 34 : Math.min(boxW, 34);
    const rowGap = tree ? 26 : 8;
    const total = maxCol * unit + boxW, x0 = (W - total) / 2;
    const placed = [];
    rows.forEach((r, ri) => {
      if (r.cap) { out.texts.push({ x: x0, y: y + 14, s: r.cap, fill: P.muted, size: 14, anchor: 'start', weight: 500 }); y += 22; }
      placed[ri] = r.cells.map((c) => ({ x: x0 + c._col * unit, y, c }));
      placed[ri].forEach(({ x, c }) => {
        if (c.s === 'hide') return;
        const st = P.s[c.s] || P.s.idle;
        out.rects.push({ x, y, w: boxW, h: boxH, rx: 6, fill: st.fill, stroke: st.stroke, sw: st.sw || 1.5 });
        if (c.t) out.texts.push({ x: x + boxW / 2, y: y + boxH / 2 + fs * 0.35, s: c.t, fill: st.text, size: fs, anchor: 'middle', weight: 600 });
        if (ri > 0 && c.par !== undefined && placed[ri - 1][c.par] && placed[ri - 1][c.par].c.s !== 'hide') {
          const p = placed[ri - 1][c.par];
          out.lines.push({ x1: p.x + boxW / 2, y1: p.y + boxH, x2: x + boxW / 2, y2: y, stroke: P.edge, w: 1.5 });
        }
      });
      y += boxH + rowGap;
    });
    y -= rowGap - 8;
  }
  const bars = frame.bars || [];
  if (bars.length) {
    const avail = W - 2 * pad;
    bars.forEach((b) => {
      const st = P.s[b.s] || P.s.idle;
      out.texts.push({ x: pad, y: y + 16, s: b.text, fill: b.s === 'dim' ? P.muted : P.text, size: fs, anchor: 'start', weight: 500 });
      y += 24;
      out.rects.push({ x: pad, y, w: avail, h: 14, rx: 7, fill: P.s.idle.fill, stroke: 'none', sw: 0 });
      out.rects.push({ x: pad, y, w: Math.max(4, avail * b.frac), h: 14, rx: 7, fill: st.fill === 'transparent' ? P.s.dim.stroke : (b.s === 'on' ? st.fill : st.stroke), stroke: 'none', sw: 0 });
      y += 14 + 16;
    });
    y -= 8;
  }
  out.h = Math.ceil(y + pad);
  return out;
}

// ---- c) space. Three examples of extra memory next to the input, and the call stack.
const CX_SPACE = [
  { id: 'max', title: 'Find the biggest', cx: 'O(1)', say: 'It keeps one number: the biggest seen so far. The input does not count, so the extra space is O(1).', extra: 1, grid: 0 },
  { id: 'copy', title: 'Make a sorted copy', cx: 'O(n)', say: 'It builds a second list as long as the input. The extra space grows with n: O(n).', extra: 6, grid: 0 },
  { id: 'pairs', title: 'Table of all pairs', cx: 'O(n²)', say: 'It stores one box for every pair of items. 6 items need 36 boxes: O(n²).', extra: 0, grid: 6 }
];
function cxSpaceFrame(ex) {
  const n = 6;
  const rows = [{ cap: 'Input: ' + n + ' items', cells: cxCells(n, () => ({ t: '', s: 'range' })) }];
  if (ex.grid) {
    rows.push({ cap: 'Extra memory: ' + ex.grid * ex.grid + ' boxes', cells: [] });
    for (let r = 0; r < ex.grid; r++) rows.push({ cells: cxCells(ex.grid, () => ({ t: '', s: 'hot' })) });
  } else rows.push({ cap: 'Extra memory: ' + ex.extra + (ex.extra === 1 ? ' box' : ' boxes'), cells: cxCells(ex.extra, () => ({ t: '', s: 'hot' })) });
  return { rows };
}
function cxStackFrame(depth) {
  const rows = [];
  for (let k = 0; k <= depth; k++) rows.push({ cells: [{ t: 'countdown(' + k + ')', s: k === 0 ? 'on' : 'done' }] });
  return { rows, cellW: 124 };
}
const CX_STACK_CODE = 'def countdown(n):\n    if n == 0: return\n    countdown(n - 1)';
const CX_SPACE_FACTS = [
  ['O(1)', 'A loop that keeps a few numbers while it works.'],
  ['O(log n)', 'Binary search written with recursion. It goes about log n calls deep.'],
  ['O(n)', 'A copy of the input, or recursion that goes n calls deep.'],
  ['O(n)', 'Merge sort. It needs a second list to join the halves.'],
  ['O(h)', 'Depth-first search on a tree. The stack is as tall as the tree.'],
  ['O(n²)', 'A grid with one box for every pair of items.']
];

// ---- d) tables. Complexity text is written without O( ); the rank orders the sorting of a column.
const CX_RANK = {
  '1': 0, 'α(n)': 0.5, 'log n': 1, 'k': 2, 'h': 2, 'n': 3, 'V': 3, 'V + E': 3, 'n + k': 3, 'd(n + k)': 3.5, 'n log k': 3.8, 'n log n': 4, 'E log V': 4, 'E log E': 4,
  '(V + E) log V': 4.2, 'n k': 4.5, 'n m': 5, 'n²': 5, 'V²': 5, 'V E': 5.5, 'n³': 6, 'V³': 6, '2ⁿ': 7, 'n!': 8, '—': 99
};
function cxCell(text, rank) {
  if (text === '—') return { t: '—', r: 99 };
  const r = rank !== undefined ? rank : CX_RANK[text];
  return { t: 'O(' + text + ')', r: r === undefined ? -1 : r };
}
// [average, worst] per action. A dash means the structure does not offer that action.
const CX_DS = [
  { name: 'Array', group: 'Lists', note: 'Fixed size, items side by side. Insert and delete shift the items after.', access: ['1', '1'], search: ['n', 'n'], insert: ['n', 'n'], del: ['n', 'n'], space: 'n' },
  { name: 'Dynamic array', group: 'Lists', note: 'A Python list. Adding at the end is O(1) amortized.', access: ['1', '1'], search: ['n', 'n'], insert: ['n', 'n'], del: ['n', 'n'], space: 'n' },
  { name: 'Sorted array', group: 'Lists', note: 'Binary search finds items fast, but adding one shifts the rest.', access: ['1', '1'], search: ['log n', 'log n'], insert: ['n', 'n'], del: ['n', 'n'], space: 'n' },
  { name: 'Singly linked list', group: 'Lists', note: 'Insert and delete are quick once you hold the spot.', access: ['n', 'n'], search: ['n', 'n'], insert: ['1', '1'], del: ['1', '1'], space: 'n' },
  { name: 'Doubly linked list', group: 'Lists', note: 'Each node also knows the one before it.', access: ['n', 'n'], search: ['n', 'n'], insert: ['1', '1'], del: ['1', '1'], space: 'n' },
  { name: 'Stack', group: 'Lists', note: 'Last in, first out. Push and pop at the top.', access: ['n', 'n'], search: ['n', 'n'], insert: ['1', '1'], del: ['1', '1'], space: 'n' },
  { name: 'Queue', group: 'Lists', note: 'First in, first out. Add at the back, remove at the front.', access: ['n', 'n'], search: ['n', 'n'], insert: ['1', '1'], del: ['1', '1'], space: 'n' },
  { name: 'Hash table', group: 'Hashing and trees', note: 'Worst case happens when many keys land in one slot.', access: ['—', '—'], search: ['1', 'n'], insert: ['1', 'n'], del: ['1', 'n'], space: 'n' },
  { name: 'Binary search tree', group: 'Hashing and trees', note: 'Worst case is a tree that leans into one long chain.', access: ['—', '—'], search: ['log n', 'n'], insert: ['log n', 'n'], del: ['log n', 'n'], space: 'n' },
  { name: 'Balanced search tree', group: 'Hashing and trees', note: 'AVL and red-black trees keep their height near log n.', access: ['—', '—'], search: ['log n', 'log n'], insert: ['log n', 'log n'], del: ['log n', 'log n'], space: 'n' },
  { name: 'Binary heap', group: 'Hashing and trees', note: 'Peeking at the smallest item is O(1). Finding any other item is slow.', access: ['—', '—'], search: ['n', 'n'], insert: ['log n', 'log n'], del: ['log n', 'log n'], space: 'n' },
  { name: 'Trie', group: 'Hashing and trees', note: 'Stores words letter by letter. k is the length of the word.', access: ['—', '—'], search: ['k', 'k'], insert: ['k', 'k'], del: ['k', 'k'], space: 'n k' }
];
// [best, average, worst], extra space, stable.
const CX_SORTS = [
  { name: 'Bubble sort', note: 'Swaps neighbours. Stops early if nothing moved.', best: 'n', avg: 'n²', worst: 'n²', space: '1', stable: true },
  { name: 'Selection sort', note: 'Picks the smallest item each round.', best: 'n²', avg: 'n²', worst: 'n²', space: '1', stable: false },
  { name: 'Insertion sort', note: 'Great for lists that are nearly sorted.', best: 'n', avg: 'n²', worst: 'n²', space: '1', stable: true },
  { name: 'Merge sort', note: 'Splits, sorts the halves, joins them.', best: 'n log n', avg: 'n log n', worst: 'n log n', space: 'n', stable: true },
  { name: 'Quick sort', note: 'Splits around a pivot. A bad pivot gives the worst case.', best: 'n log n', avg: 'n log n', worst: 'n²', space: 'log n', stable: false },
  { name: 'Heap sort', note: 'Builds a heap, then takes the largest item again and again.', best: 'n log n', avg: 'n log n', worst: 'n log n', space: '1', stable: false },
  { name: 'Counting sort', note: 'Counts each value. k is the range of the values.', best: 'n + k', avg: 'n + k', worst: 'n + k', space: 'n + k', stable: true },
  { name: 'Radix sort', note: 'Sorts digit by digit. d is the number of digits.', best: 'd(n + k)', avg: 'd(n + k)', worst: 'd(n + k)', space: 'n + k', stable: true },
  { name: 'Timsort', note: 'What Python and Java use. It spots runs that are already sorted.', best: 'n', avg: 'n log n', worst: 'n log n', space: 'n', stable: true }
];
// V is the number of nodes (vertices) and E the number of edges.
const CX_GRAPHS = [
  { name: 'Breadth-first search', group: 'Search', time: 'V + E', space: 'V', best: 'Fewest steps in an unweighted graph.' },
  { name: 'Depth-first search', group: 'Search', time: 'V + E', space: 'V', best: 'Exploring every path, and finding cycles.' },
  { name: 'Dijkstra', group: 'Shortest path', time: '(V + E) log V', space: 'V', best: 'Shortest path when no edge is negative.' },
  { name: 'Bellman-Ford', group: 'Shortest path', time: 'V E', space: 'V', best: 'Shortest path with negative edges.' },
  { name: 'Floyd-Warshall', group: 'Shortest path', time: 'V³', space: 'V²', best: 'Shortest path between every pair of nodes.' },
  { name: 'Prim', group: 'Spanning tree', time: 'E log V', space: 'V', best: 'Cheapest tree that links all nodes, growing from one node.' },
  { name: 'Kruskal', group: 'Spanning tree', time: 'E log E', space: 'V', best: 'Cheapest tree that links all nodes, adding edges by weight.' },
  { name: 'Topological sort', group: 'Order and sets', time: 'V + E', space: 'V', best: 'Ordering tasks that depend on each other.' },
  { name: 'Union-find', group: 'Order and sets', time: 'α(n)', space: 'n', best: 'Joining groups and asking if two items share one. Time is per action.' }
];
// Time and space of the usual solution to each of our 16 patterns. Names match shared/catalog.js.
const CX_PATTERNS = [
  { name: 'Two Pointers', group: 'Lists and ranges', time: 'n', space: '1', note: 'One pass. Sorting first adds O(n log n).' },
  { name: 'Sliding Window', group: 'Lists and ranges', time: 'n', space: 'k', note: 'The window holds at most k items.' },
  { name: 'Hash Map', group: 'Lists and ranges', time: 'n', space: 'n', note: 'Trades memory for fast lookups.' },
  { name: 'Prefix Sum', group: 'Lists and ranges', time: 'n', space: 'n', note: 'Build once in O(n). Then each range total costs O(1).' },
  { name: 'Binary Search', group: 'Search and choice', time: 'log n', space: '1', note: 'The list must be sorted, or the answer must be testable.' },
  { name: 'Matrix', group: 'Lists and ranges', time: 'n m', space: '1', note: 'A grid with n rows and m columns. Often done in place.' },
  { name: 'Intervals', group: 'Lists and ranges', time: 'n log n', space: 'n', note: 'Sort by start, then sweep once.' },
  { name: 'Greedy', group: 'Search and choice', time: 'n log n', space: '1', note: 'Usually a sort, then one pass.' },
  { name: 'Stack', group: 'Lists and ranges', time: 'n', space: 'n', note: 'Each item is pushed and popped once.' },
  { name: 'Heap', group: 'Search and choice', time: 'n log k', space: 'k', note: 'Keeps only the best k items in the heap.' },
  { name: 'In-place Reversal', group: 'Lists and ranges', time: 'n', space: '1', note: 'Rewires links or swaps items without a copy.' },
  { name: 'Fast & Slow Pointers', group: 'Lists and ranges', time: 'n', space: '1', note: 'Two speeds find cycles and middles.' },
  { name: 'Depth-First Search', group: 'Trees and graphs', time: 'V + E', space: 'h', note: 'h is the depth of the stack. On a tree, V + E is the same as n.' },
  { name: 'Breadth-First Search', group: 'Trees and graphs', time: 'V + E', space: 'V', note: 'The queue can hold a whole level.' },
  { name: 'Backtracking', group: 'Search and choice', time: '2ⁿ to n!', space: 'n', note: 'Tries every choice. Space is the depth of the choices.', rank: 7.5 },
  { name: 'Dynamic Programming', group: 'Search and choice', time: 'n²', space: 'n to n²', note: 'Number of states times the work for each state.', spaceRank: 4.5 }
];
const CX_TABS = [
  { id: 'ds', title: 'Data structures', intro: 'Cost of common actions with n items. Switch between the average and the worst case.' },
  { id: 'sort', title: 'Sorting algorithms', intro: 'Time to sort n items. Stable means equal items keep their order.' },
  { id: 'graph', title: 'Graph algorithms', intro: 'V is the number of nodes and E is the number of edges between them.' },
  { id: 'patterns', title: 'Our 16 patterns', intro: 'The usual cost of each pattern. Your problem may differ a little.' }
];
// Table view: { cols: [{ label, kind }], rows: [{ group, hay, cells: [{ t, sub, r }] }], groups }.
function cxTable(id, opt) {
  opt = opt || {};
  const cx = (s) => { const c = cxCell(s); return c; };
  const name = (n, note) => ({ t: n, sub: note, r: n.toLowerCase() });
  const mk = (cols, rows) => ({ cols, rows: rows.map((r) => Object.assign(r, { hay: (r.cells.map((c) => c.t + ' ' + (c.sub || '')).join(' ') + ' ' + (r.group || '')).toLowerCase() })) });
  if (id === 'ds') {
    const w = opt.worst ? 1 : 0;
    const t = mk(['Structure', 'Reach by position', 'Search', 'Add', 'Remove', 'Space'].map((l, i) => ({ label: l, kind: i ? 'cx' : 'text' })), CX_DS.map((d) => ({
      group: d.group, cells: [name(d.name, d.note), cx(d.access[w]), cx(d.search[w]), cx(d.insert[w]), cx(d.del[w]), cx(d.space)]
    })));
    t.groups = ['Lists', 'Hashing and trees'];
    return t;
  }
  if (id === 'sort') {
    const t = mk(['Algorithm', 'Best', 'Average', 'Worst', 'Extra space', 'Stable'].map((l, i) => ({ label: l, kind: i === 0 ? 'text' : (i === 5 ? 'text' : 'cx') })), CX_SORTS.map((s) => ({
      group: s.stable ? 'Stable' : 'Not stable', cells: [name(s.name, s.note), cx(s.best), cx(s.avg), cx(s.worst), cx(s.space), { t: s.stable ? 'Yes' : 'No', r: s.stable ? 0 : 1 }]
    })));
    t.groups = ['Stable', 'Not stable'];
    return t;
  }
  if (id === 'graph') {
    const t = mk(['Algorithm', 'Time', 'Space', 'Best for'].map((l, i) => ({ label: l, kind: i === 1 || i === 2 ? 'cx' : 'text' })), CX_GRAPHS.map((g) => ({
      group: g.group, cells: [name(g.name, ''), cx(g.time), cx(g.space), { t: g.best, r: g.best.toLowerCase() }]
    })));
    t.groups = ['Search', 'Shortest path', 'Spanning tree', 'Order and sets'];
    return t;
  }
  const t = mk(['Pattern', 'Typical time', 'Typical space', 'Note'].map((l, i) => ({ label: l, kind: i === 1 || i === 2 ? 'cx' : 'text' })), CX_PATTERNS.map((p) => ({
    group: p.group, cells: [name(p.name, ''), p.rank !== undefined ? cxCell(p.time, p.rank) : cx(p.time), p.spaceRank !== undefined ? cxCell(p.space, p.spaceRank) : cx(p.space), { t: p.note, r: p.note.toLowerCase() }]
  })));
  t.groups = ['Lists and ranges', 'Search and choice', 'Trees and graphs'];
  return t;
}

// ---- e) input size tells you the target.
const CX_TARGETS = [
  { max: 10, label: 'n up to 10', cx: 'O(n!)', fits: 'n!', idea: 'Try every order of the items.' },
  { max: 20, label: 'n up to 20', cx: 'O(2ⁿ)', fits: '2ⁿ', idea: 'Try every subset or every yes-or-no choice.' },
  { max: 500, label: 'n up to 500', cx: 'O(n³)', fits: 'n³', idea: 'Three loops inside each other.' },
  { max: 5000, label: 'n up to 5,000', cx: 'O(n²)', fits: 'n²', idea: 'Two loops inside each other.' },
  { max: 1000000, label: 'n up to 1,000,000', cx: 'O(n log n)', fits: 'n log n', idea: 'Sort first, or split in halves and join.' },
  { max: Infinity, label: 'n larger than that', cx: 'O(n) or O(log n)', fits: 'n', idea: 'One pass over the input, or cut the search in half.' }
];
function cxTarget(n) { let i = 0; while (CX_TARGETS[i].max < n) i++; return i; }
// The step count of each target row at its own limit (for the check: all must stay near a hundred million).
function cxTargetSteps(i) {
  const lim = CX_TARGETS[i].max;
  const n = isFinite(lim) ? lim : 10000000;
  return [Math.pow(10, cxLog10Fact(n)), Math.pow(2, n), n * n * n, n * n, n * Math.log2(n), n][i];
}
