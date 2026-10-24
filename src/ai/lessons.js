// AI & ML lessons. Each lesson: id, track ('ml' or 'now'), title, tag, minutes, idea (one line),
// optional param (the one slider that matters), optional credit, sources (AI-now lessons), and
// make(p) -> steps. A step is { say, focus: [ids], scene }. Scenes use the vocabulary in render.js:
// axes, regions, paths, rings, edges, links, arrows, bars, boxes, nodes, points, tokens, labels.
// The canvas is 960 x 540. All explanations are our own words.
const AI_TRACKS = [
  { id: 'ml', title: 'ML & data science foundations', short: 'ML foundations', blurb: 'How machines learn from examples: fit a line, vote with neighbours, split with questions, and spot overfitting.' },
  { id: 'now', title: 'AI now', short: 'AI now', blurb: 'The ideas behind today’s models: attention, reasoning, agents, retrieval, experts and cheap fine-tuning.' }
];
// Planned next, from the research curriculum. Shown on the hub as "next up", not as lessons.
const AI_NEXT = {
  ml: ['Logistic regression and the decision threshold', 'k-means clustering', 'PCA: squash many columns into two', 'pandas and SQL: group by and joins'],
  now: ['Long context and “lost in the middle”', 'Multimodal models', 'Small and on-device models', 'Evals and benchmarks']
};

// ---------- shared helpers ----------
const aiR = (v) => Math.round(v * 10) / 10;
function aiScale(x0, x1, y0, y1, lo, hi) {
  // data square [lo, hi] -> screen box; returns [sx, sy]
  return [(v) => aiR(x0 + ((v - lo) / (hi - lo)) * (x1 - x0)), (v) => aiR(y0 - ((v - lo) / (hi - lo)) * (y0 - y1))];
}
function aiClone(o) { return JSON.parse(JSON.stringify(o)); }
// Merge scene layers: later layers add items; an item with the same id replaces the earlier one.
function aiScene() {
  const out = {};
  Array.prototype.slice.call(arguments).forEach((L) => {
    if (!L) return;
    Object.keys(L).forEach((k) => {
      if (k === 'axes') { out.axes = L.axes; return; }
      const cur = out[k] || [];
      L[k].forEach((it) => { const i = cur.findIndex((c) => c.id === it.id); if (i >= 0) cur[i] = it; else cur.push(it); });
      out[k] = cur;
    });
  });
  return out;
}
function aiStep(say, focus, scene) { return { say, focus: focus || [], scene }; }
// Clip the segment (xa, ya)-(xb, yb) to ylo..yhi (screen y grows down). Returns null if fully outside.
function aiClipY(xa, ya, xb, yb, ytop, ybot) {
  let t0 = 0; let t1 = 1; const dy = yb - ya;
  if (Math.abs(dy) < 1e-9) return ya >= ytop && ya <= ybot ? [[xa, ya], [xb, yb]] : null;
  const ta = (ytop - ya) / dy; const tb = (ybot - ya) / dy;
  t0 = Math.max(t0, Math.min(ta, tb)); t1 = Math.min(t1, Math.max(ta, tb));
  if (t0 > t1) return null;
  return [[aiR(xa + (xb - xa) * t0), aiR(ya + dy * t0)], [aiR(xa + (xb - xa) * t1), aiR(ya + dy * t1)]];
}
function aiSoftmax(xs, T) { const m = Math.max.apply(null, xs); const e = xs.map((x) => Math.exp((x - m) / T)); const s = e.reduce((a, b) => a + b, 0); return e.map((x) => x / s); }
function aiTokenRow(words, y, gap) {
  const ws = words.map(aiTokW); const total = ws.reduce((a, b) => a + b, 0) + gap * (words.length - 1);
  let x = (AI_VIEW.w - total) / 2;
  return words.map((w, i) => { const cx = x + ws[i] / 2; x += ws[i] + gap; return { id: 'tk' + i, x: aiR(cx), y, text: w }; });
}

// ---------- ML 1: linear regression by gradient descent ----------
function aiGradient(p) {
  const lr = p;
  const X = [1, 2, 3, 4, 5, 6, 7, 8]; const Y = [2.1, 2.9, 3.2, 4.4, 4.6, 5.9, 6.2, 7.1];
  const [sx, sy] = aiScale(80, 600, 480, 60, 0, 9);
  const loss = (w, b) => X.reduce((s, x, i) => s + Math.pow(w * x + b - Y[i], 2), 0) / X.length;
  const hist = [{ w: 0, b: 0.5, L: loss(0, 0.5) }];
  for (let i = 0; i < 150; i++) {
    const { w, b } = hist[i];
    let gw = 0; let gb = 0;
    X.forEach((x, j) => { const e = w * x + b - Y[j]; gw += (2 / X.length) * e * x; gb += (2 / X.length) * e; });
    const nw = w - lr * gw; const nb = b - lr * gb;
    hist.push({ w: nw, b: nb, L: loss(nw, nb) });
  }
  const L0 = hist[0].L;
  const blew = !(hist[150].L < L0) || !isFinite(hist[150].L);
  const zig = !blew && lr >= 0.03; const slow = lr <= 0.006;
  const axes = { x0: 80, y0: 480, x1: 600, y1: 60, xl: 'size of flat →', yl: '↑ rent' };
  const pts = X.map((x, i) => ({ id: 'd' + i, x: sx(x), y: sy(Y[i]), c: 'a', r: 7 }));
  const line = (w, b) => {
    const seg = aiClipY(sx(0), sy(b), sx(9), sy(w * 9 + b), 50, 490);
    return seg ? { id: 'fit', pts: seg, c: 'b', w: 4 } : { id: 'fit', pts: [[sx(0), 490], [sx(9), 490]], c: 'b', w: 4, op: 0 };
  };
  const resid = (w, b) => X.map((x, i) => {
    const yy = Math.max(50, Math.min(490, sy(w * x + b)));
    return { id: 'res' + i, pts: [[sx(x), sy(Y[i])], [sx(x), aiR(yy)]], c: 'c', w: 2, dash: true };
  });
  // Mini loss chart (top right). Always 151 points so the curve can draw itself smoothly.
  const cx0 = 660; const cx1 = 920; const cy0 = 250; const cy1 = 96;
  const chartBase = {
    paths: [{ id: 'lossAx', pts: [[cx0, cy1 - 6], [cx0, cy0], [cx1, cy0]], c: 'l', w: 1.5 }],
    labels: [{ id: 'lossT', x: cx0, y: cy1 - 18, text: 'loss over steps', c: 'm', size: 13 }, { id: 'lossX', x: cx1, y: cy0 + 22, text: 'steps →', c: 'm', size: 12, anchor: 'end' }]
  };
  const curve = (n) => {
    const pt = (i) => { const k = Math.min(i, n); const h = Math.min(1.15, (isFinite(hist[k].L) ? hist[k].L : L0 * 2) / L0); return [aiR(cx0 + (k / 150) * (cx1 - cx0)), aiR(cy0 - h * (cy0 - cy1) / 1.15)]; };
    const pts2 = []; for (let i = 0; i <= 150; i++) pts2.push(pt(i));
    return { id: 'lossC', pts: pts2, c: 'c', w: 3 };
  };
  const readout = (i) => {
    const h = hist[i]; const big = (v) => (Math.abs(v) > 999 ? (v > 0 ? '> 999' : '< −999') : aiFmt(v));
    return { labels: [
      { id: 'ro1', x: 660, y: 310, text: 'step ' + i, c: 'm', size: 13, mono: true },
      { id: 'ro2', x: 660, y: 338, text: 'w = ' + big(h.w) + '   b = ' + big(h.b), c: 't', size: 15, mono: true },
      { id: 'ro3', x: 660, y: 368, text: 'loss = ' + (h.L > 9999 || !isFinite(h.L) ? 'huge' : aiFmt(h.L)), c: 'c', size: 18, weight: 700, mono: true },
      { id: 'ro4', x: 660, y: 398, text: 'learning rate = ' + lr.toFixed(3), c: 'm', size: 13, mono: true }
    ] };
  };
  const at = (i, extra) => aiScene({ axes, points: pts }, chartBase, { paths: [line(hist[i].w, hist[i].b), curve(i)].concat(resid(hist[i].w, hist[i].b)) }, readout(i), extra);
  const lossTxt = aiFmt(L0, 1);
  const s = [];
  s.push(aiStep('Each dot is a flat: its size along the bottom, its rent up the side. We want one straight line that fits them.', pts.map((q) => q.id), aiScene({ axes, points: pts })));
  s.push(aiStep('The model is a line: rent = w × size + b. Start with a guess, w = 0 and b = 0.5. A flat line.', ['fit'], aiScene({ axes, points: pts, paths: [line(0, 0.5)] })));
  s.push(aiStep('The dashed gaps are the errors. Square each one and average them. That one number is the loss.', resid(0, 0.5).map((r) => r.id), aiScene({ axes, points: pts, paths: [line(0, 0.5)].concat(resid(0, 0.5)) })));
  s.push(aiStep('The loss starts at ' + lossTxt + '. Learning means changing w and b until it is as small as we can get it.', ['ro3'], at(0)));
  s.push(aiStep('The gradient points uphill on the loss. Step the other way: tilt and lift the line a little.', ['push'], at(0, { arrows: [{ id: 'push', from: { x: sx(7), y: sy(0.5) - 8 }, to: { x: sx(7), y: sy(5.2) }, c: 'a', w: 3, label: 'downhill', lx: 44 }] })));
  const cap = {
    1: blew ? 'One step, and the line swings past the dots. This step size is too big.' : zig ? 'One big step: the line jumps up past the dots. Big steps zigzag.' : slow ? 'One tiny step: the line barely moves. The loss dips a little.' : 'After one step the line tilts up and the loss drops.',
    2: blew ? 'It swings back even further. Each correction overshoots more.' : zig ? 'It swings back below. Each swing is a little smaller.' : slow ? 'Two steps. Still creeping: each step is learning rate × gradient.' : 'Two steps. Each step is learning rate × gradient, so a big gradient means a big step.',
    4: blew ? 'Four steps. The loss is climbing instead of falling.' : zig ? 'Four steps. The zigzag settles toward the dots.' : slow ? 'Four steps. Tiny steps are safe but slow.' : 'Four steps. The biggest errors shrink first.',
    8: blew ? 'Eight steps. The line flies off the chart. The loss explodes.' : slow ? 'Eight steps. The loss curve falls gently.' : 'Eight steps. The line hugs the dots and the loss curve flattens.',
    20: blew ? 'This is divergence: the learning rate is past the safe limit for this data.' : 'Twenty steps. The changes are small now because the slope of the loss is nearly flat.',
    50: blew ? 'No number of steps will fix it. Only a smaller learning rate will.' : slow ? 'Fifty steps. Getting there, slowly.' : 'Fifty steps. Almost nothing changes from step to step.',
    150: blew ? 'After 150 steps the loss is huge. Drag the slider left to make the steps smaller.' : 'After 150 steps it has settled. These w and b are the trained model.'
  };
  [1, 2, 4, 8, 20, 50, 150].forEach((i) => s.push(aiStep(cap[i], i === 150 || i === 1 ? ['fit'] : ['lossC'], at(i))));
  s.push(aiStep('Try the learning-rate slider. Too small crawls, too big overshoots, and in between it settles fast.', ['ro4'], at(150)));
  return s;
}

// ---------- ML 2: k-nearest neighbours ----------
function aiKnn(p) {
  const k = Math.max(1, Math.round(p));
  const [sx, sy] = aiScale(80, 560, 490, 50, 0, 10);
  const A = [[2, 3], [3, 4.5], [3.8, 3.2], [4.2, 5.8], [5.8, 4.2], [4.5, 2.2], [2.5, 6], [6.2, 6.4], [1.6, 4.4]];
  const B = [[7, 7.5], [8, 6.5], [8.5, 8.5], [7.5, 9], [9, 7], [6.5, 8.2], [5.4, 5.3]];
  const Q = [5, 5];
  const all = A.map((q, i) => ({ id: 'a' + i, x: q[0], y: q[1], cls: 'a' })).concat(B.map((q, i) => ({ id: 'b' + i, x: q[0], y: q[1], cls: 'b' })));
  all.forEach((d) => { d.dist = Math.hypot(d.x - Q[0], d.y - Q[1]); });
  const sorted = all.slice().sort((u, v) => u.dist - v.dist);
  const axes = { x0: 80, y0: 490, x1: 560, y1: 50, xl: 'action →', yl: '↑ romance' };
  const pts = (hl) => all.map((d) => ({ id: d.id, x: sx(d.x), y: sy(d.y), c: d.cls, r: 7, ring: hl && hl.indexOf(d.id) >= 0 }));
  const q = (c) => ({ id: 'q', x: sx(Q[0]), y: sy(Q[1]), c: c || 't', r: 9, hollow: !c, ring: true, label: 'new movie', lx: 16, ly: -16 });
  const legend = { points: [{ id: 'lgA', x: 640, y: 80, c: 'a', r: 7, label: 'you liked it' }, { id: 'lgB', x: 640, y: 110, c: 'b', r: 7, label: 'you skipped it' }] };
  const base = (hl, qc) => aiScene({ axes }, legend, { points: pts(hl).concat([q(qc)]) });
  const lines = (n, c) => sorted.slice(0, n).map((d) => ({ id: 'ln' + d.id, pts: [[sx(Q[0]), sy(Q[1])], [sx(d.x), sy(d.y)]], c: c || 'm', w: 1.5, dash: true }));
  const ring = (n) => ({ id: 'kr', x: sx(Q[0]), y: sy(Q[1]), r: aiR(sorted[n - 1].dist * 48 + 12), c: 't' });
  const votes = (n) => { const top = sorted.slice(0, n); return { a: top.filter((d) => d.cls === 'a').length, b: top.filter((d) => d.cls === 'b').length }; };
  const bars = (v, n) => ({ bars: [
    { id: 'vA', x: 660, y: 440 - v.a * 30, w: 80, h: v.a * 30, c: 'a', label: 'liked', val: String(v.a) },
    { id: 'vB', x: 780, y: 440 - v.b * 30, w: 80, h: v.b * 30, c: 'b', label: 'skipped', val: String(v.b) }
  ], labels: [{ id: 'vT', x: 640, y: 160, text: 'votes from the ' + n + ' nearest', c: 'm', size: 13 }] });
  const v1 = votes(1); const vk = votes(k);
  const win = vk.a > vk.b ? 'a' : 'b'; const winTxt = win === 'a' ? 'you would like it' : 'you would skip it';
  const ids = (n) => sorted.slice(0, n).map((d) => d.id);
  const s = [];
  s.push(aiStep('Each dot is a movie you rated, placed by how much action and romance it has. The key shows which you liked.', [], base()));
  s.push(aiStep('A new movie arrives, the ring. Will you like it? k-nearest neighbours asks the movies closest to it.', ['q'], base()));
  s.push(aiStep('First, measure the distance from the new movie to every movie you have rated.', [], aiScene(base(), { paths: lines(all.length) })));
  s.push(aiStep('Sort by distance. The very closest is one you skipped, an odd one out among movies you liked.', [sorted[0].id], aiScene(base(), { paths: lines(all.length).map((l, i) => (i === 0 ? Object.assign({}, l, { c: 't', w: 3, dash: false }) : Object.assign({}, l, { op: 0.35 }))) })));
  s.push(aiStep('k is how many neighbours get a vote. With k = 1, only that closest movie counts.', ['kr'], aiScene(base(ids(1)), { paths: lines(1, 't'), rings: [ring(1)] })));
  s.push(aiStep('One vote, and it says skip. With k = 1, a single odd movie decided everything.', ['q', 'vB'], aiScene(base(ids(1), 'b'), { paths: lines(1, 't'), rings: [ring(1)] }, bars(v1, 1))));
  s.push(aiStep('Now use your slider value, k = ' + k + '. The circle grows until it holds ' + k + ' neighbour' + (k > 1 ? 's' : '') + '.', ['kr'], aiScene(base(ids(k)), { paths: lines(k, 't'), rings: [ring(k)] })));
  s.push(aiStep('Count the votes inside the circle: ' + vk.a + ' liked, ' + vk.b + ' skipped.', ['vA', 'vB'], aiScene(base(ids(k)), { paths: lines(k, 't'), rings: [ring(k)] }, bars(vk, k))));
  s.push(aiStep('The majority wins: ' + winTxt + '.', ['q'], aiScene(base(ids(k), win), { rings: [ring(k)] }, bars(vk, k))));
  s.push(aiStep('Small k chases odd dots. Large k blurs real edges. Odd k avoids ties between two classes. Try the slider.', ['kr'], aiScene(base(ids(k), win), { rings: [ring(k)] }, bars(vk, k))));
  s.push(aiStep('There is no training step. kNN keeps every example and does all its work when a question arrives.', [], aiScene(base(ids(k), win), bars(vk, k))));
  return s;
}

// ---------- ML 3: decision tree splits ----------
function aiTree() {
  const [sx, sy] = aiScale(70, 470, 480, 80, 0, 10);
  const A = [[2, 2], [3, 1.5], [1.5, 3.5], [3.5, 3], [2.5, 4.2], [6, 2], [7, 1.2], [6.5, 3.2], [4.8, 4]];
  const B = [[1.5, 7], [3, 8], [2.5, 6.2], [7.5, 7], [8.5, 8], [6.2, 6.5], [8.8, 2.5], [9.2, 4], [8.4, 1.5], [4.5, 8.8]];
  const axes = { x0: 70, y0: 480, x1: 470, y1: 80, xl: 'heat →', yl: '↑ wind' };
  const pts = A.map((q, i) => ({ id: 'a' + i, x: sx(q[0]), y: sy(q[1]), c: 'a' })).concat(B.map((q, i) => ({ id: 'b' + i, x: sx(q[0]), y: sy(q[1]), c: 'b' })));
  const legend = { points: [{ id: 'lgA', x: 90, y: 40, c: 'a', label: 'played tennis' }, { id: 'lgB', x: 250, y: 40, c: 'b', label: 'stayed in' }] };
  const base = aiScene({ axes, points: pts }, legend);
  const cut1 = { id: 'cut1', pts: [[sx(0), sy(5)], [sx(10), sy(5)]], c: 't', w: 3 };
  const cut2 = { id: 'cut2', pts: [[sx(8), sy(0)], [sx(8), sy(5)]], c: 't', w: 3 };
  const regTop = { id: 'rTop', x: sx(0), y: sy(10), w: sx(10) - sx(0), h: sy(5) - sy(10), c: 'b' };
  const regHot = { id: 'rHot', x: sx(8), y: sy(5), w: sx(10) - sx(8), h: sy(0) - sy(5), c: 'b' };
  const regOk = { id: 'rOk', x: sx(0), y: sy(5), w: sx(8) - sx(0), h: sy(0) - sy(5), c: 'a' };
  const root = { id: 'root', x: 610, y: 70, w: 200, h: 58, label: 'wind above 5?', c: 'l' };
  const leafNo = { id: 'leafNo', x: 800, y: 200, w: 140, h: 58, label: 'stay in', sub: 'pure: all stayed in', c: 'b' };
  const node2 = { id: 'node2', x: 530, y: 200, w: 200, h: 58, label: 'heat above 8?', c: 'l' };
  const leafHot = { id: 'leafHot', x: 640, y: 340, w: 140, h: 58, label: 'stay in', sub: 'too hot', c: 'b' };
  const leafYes = { id: 'leafYes', x: 470, y: 340, w: 140, h: 58, label: 'play', sub: 'pure: all played', c: 'a' };
  const a1 = { id: 'ar1', from: 'root', to: 'leafNo', label: 'yes', c: 'm', lx: 16 };
  const a2 = { id: 'ar2', from: 'root', to: 'node2', label: 'no', c: 'm', lx: -18 };
  const a3 = { id: 'ar3', from: 'node2', to: 'leafHot', label: 'yes', c: 'm', lx: 18 };
  const a4 = { id: 'ar4', from: 'node2', to: 'leafYes', label: 'no', c: 'm', lx: -16 };
  const t1 = aiScene(base, { paths: [cut1], boxes: [root] });
  const t2 = aiScene(t1, { regions: [regTop], boxes: [leafNo], arrows: [a1] });
  const t3 = aiScene(t2, { paths: [cut2], boxes: [node2], arrows: [a2] });
  const t4 = aiScene(t3, { regions: [regHot, regOk], boxes: [leafHot, leafYes], arrows: [a3, a4] });
  const qd = { id: 'q', x: sx(4), y: sy(2.5), c: 't', r: 9, hollow: true, ring: true, label: 'new day', lx: 16, ly: -16 };
  const hot = (o) => Object.assign({}, o, { c: 'a' });
  const tiny = [[4.8, 4], [2.5, 6.2], [9.2, 4]].map((q, i) => ({ id: 'tiny' + i, x: sx(q[0]) - 18, y: sy(q[1]) - 18, w: 36, h: 36, c: i === 0 ? 'a' : 'b', op: 0.35 }));
  const s = [];
  s.push(aiStep('Each dot is a day: Sam either played tennis or stayed in (see the key). Across is heat, up is wind.', [], base));
  s.push(aiStep('A decision tree asks yes-or-no questions, one at a time, to sort the days into pure groups.', [], base));
  s.push(aiStep('It tries every possible cut and keeps the best. First question: is the wind above 5?', ['cut1', 'root'], t1));
  s.push(aiStep('Above the line, Sam stayed in every day. That side is pure, so it becomes a leaf: stay in.', ['leafNo'], t2));
  s.push(aiStep('Below the line it is mixed: on three very hot days Sam stayed in too.', ['b6', 'b7', 'b8'], t2));
  s.push(aiStep('So ask a second question, only on the calm side: is the heat above 8?', ['cut2', 'node2'], t3));
  s.push(aiStep('Hot and calm: stay in. Mild and calm: play. Every group is pure now.', ['leafHot', 'leafYes'], t4));
  s.push(aiStep('A new day arrives: heat 4, wind 2.5. Walk the tree from the top to classify it.', ['q'], aiScene(t4, { points: [qd] })));
  s.push(aiStep('Wind above 5? No. Heat above 8? No. The leaf says play.', ['root', 'node2', 'leafYes'], aiScene(t4, { points: [Object.assign({}, qd, { c: 'a', hollow: false })], arrows: [hot(a2), hot(a4)] })));
  s.push(aiStep('Each cut is chosen by how much purer it makes the groups. Gini impurity and entropy measure that.', ['cut1', 'cut2'], t4));
  s.push(aiStep('Keep splitting and every single day gets its own tiny box. The tree has memorised noise.', tiny.map((r) => r.id), aiScene(t4, { regions: tiny })));
  s.push(aiStep('So we stop early: a depth limit or a minimum group size keeps the tree simple and general.', ['root'], t4));
  return s;
}

// ---------- ML 4: train/test and overfitting ----------
function aiPolyFit(xs, ys, d) {
  // least squares on z = (x - 5) / 5 with normal equations and partial pivoting
  const n = d + 1; const M = []; const v = [];
  for (let i = 0; i < n; i++) { M.push(new Array(n).fill(0)); v.push(0); }
  xs.forEach((x, k) => { const z = (x - 5) / 5; const pw = []; for (let i = 0; i < n; i++) pw.push(Math.pow(z, i)); for (let i = 0; i < n; i++) { v[i] += pw[i] * ys[k]; for (let j = 0; j < n; j++) M[i][j] += pw[i] * pw[j]; } });
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]]; [v[c], v[p]] = [v[p], v[c]];
    for (let r = c + 1; r < n; r++) { const f = M[r][c] / M[c][c]; for (let j = c; j < n; j++) M[r][j] -= f * M[c][j]; v[r] -= f * v[c]; }
  }
  const w = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) { let s = v[r]; for (let j = r + 1; j < n; j++) s -= M[r][j] * w[j]; w[r] = s / M[r][r]; }
  return (x) => { const z = (x - 5) / 5; let s = 0; for (let i = n - 1; i >= 0; i--) s = s * z + w[i]; return s; };
}
const AI_OF = (() => {
  const f = (x) => 5 + 2.5 * Math.sin(x * 0.75);
  const tx = [0.5, 1.4, 2.3, 3.1, 4.2, 5.0, 6.1, 7.0, 8.2, 9.3]; const tn = [-0.3, -0.3, 0.6, 0.2, -0.8, 0.2, -0.9, 0.6, 0.8, 0.9];
  const vx = [1.0, 2.8, 4.6, 5.6, 7.6, 8.8]; const vn = [0.3, 0.2, 0.3, -0.1, -0.5, 0];
  const ty = tx.map((x, i) => f(x) + tn[i]); const vy = vx.map((x, i) => f(x) + vn[i]);
  const mse = (g, xs, ys) => xs.reduce((s, x, i) => s + Math.pow(g(x) - ys[i], 2), 0) / xs.length;
  const fits = {}; const err = {};
  for (let d = 1; d <= 9; d++) { fits[d] = aiPolyFit(tx, ty, d); err[d] = { tr: mse(fits[d], tx, ty), te: mse(fits[d], vx, vy) }; }
  return { tx, ty, vx, vy, fits, err };
})();
function aiOverfit(p) {
  const deg = Math.max(1, Math.min(9, Math.round(p)));
  const D = AI_OF;
  const [sx, sy] = aiScale(70, 560, 480, 60, 0, 10);
  const axes = { x0: 70, y0: 480, x1: 560, y1: 60, xl: 'x →', yl: '↑ y' };
  const train = (c) => D.tx.map((x, i) => ({ id: 'tr' + i, x: sx(x), y: sy(D.ty[i]), c: c || 'a' }));
  const test = (c, hollow) => D.vx.map((x, i) => ({ id: 'te' + i, x: sx(x), y: sy(D.vy[i]), c: c || 'b', hollow }));
  const curve = (d) => { const pts = []; for (let i = 0; i <= 80; i++) { const x = 0.3 + (9.2 * i) / 80; pts.push([sx(x), aiR(Math.max(50, Math.min(490, sy(D.fits[d](x)))))]); } return { id: 'fitC', pts, c: 't', w: 3 }; };
  const fmt = (e) => (e > 99 ? '> 99' : aiFmt(e));
  const bars = (d) => {
    const h = (e) => aiR(Math.min(1, e / 3) * 150);
    return { bars: [
      { id: 'bTr', x: 640, y: 470 - h(D.err[d].tr), w: 90, h: h(D.err[d].tr), c: 'a', label: 'train error', val: fmt(D.err[d].tr) },
      { id: 'bTe', x: 790, y: 470 - h(D.err[d].te), w: 90, h: h(D.err[d].te), c: 'b', label: 'test error', val: fmt(D.err[d].te) }
    ], labels: [{ id: 'deg', x: 640, y: 290, text: 'degree ' + d, c: 't', size: 18, weight: 700, mono: true }] };
  };
  const chart = () => {
    const X = (d) => aiR(640 + ((d - 1) / 8) * 270); const Y = (e) => aiR(240 - Math.min(1, Math.log10(1 + e * 3) / Math.log10(1 + 3 * 3)) * 150);
    const line = (k, c) => ({ id: 'ch' + k, pts: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => [X(d), Y(D.err[d][k])]), c, w: 3 });
    let best = 1; for (let d = 2; d <= 9; d++) if (D.err[d].te < D.err[best].te) best = d;
    return { best, paths: [{ id: 'chAx', pts: [[640, 84], [640, 240], [915, 240]], c: 'l', w: 1.5 }, line('tr', 'a'), line('te', 'b')],
      points: [{ id: 'chBest', x: X(best), y: Y(D.err[best].te), c: 'b', r: 8, ring: true }],
      labels: [{ id: 'chT', x: 640, y: 56, text: 'error by degree', c: 'm', size: 13 }, { id: 'chL1', x: 750, y: 56, text: '— train', c: 'a', size: 13, weight: 700 }, { id: 'chL2', x: 820, y: 56, text: '— test', c: 'b', size: 13, weight: 700 }, { id: 'chX', x: 915, y: 262, text: 'more flexible →', c: 'm', size: 12, anchor: 'end' }] };
  };
  const ch = chart();
  const view = (d, withChart) => aiScene({ axes, points: train().concat(test('b', true)) }, { paths: [curve(d)] }, withChart ? { paths: ch.paths, points: ch.points, labels: ch.labels } : null, bars(d));
  const s = [];
  s.push(aiStep('Sixteen measurements of a wavy pattern, each with a little noise mixed in.', [], aiScene({ axes, points: train('m').concat(test('m')) })));
  s.push(aiStep('Hide six of them. Filled dots train the model. The rings are the test set: the model never sees them.', D.vx.map((x, i) => 'te' + i), aiScene({ axes, points: train().concat(test('b', true)) })));
  s.push(aiStep('Fit a straight line, degree 1, to the filled dots. It cannot follow the wave. That is underfitting.', ['fitC'], aiScene({ axes, points: train().concat(test('b', true)) }, { paths: [curve(1)] })));
  s.push(aiStep('Both errors are high: it is wrong on the dots it trained on and on the hidden ones.', ['bTr', 'bTe'], view(1)));
  s.push(aiStep('Degree 3 can bend twice. Now the curve follows the wave.', ['fitC'], view(3)));
  s.push(aiStep('Both errors drop. Even the hidden test dots sit close to the curve.', ['bTr', 'bTe'], view(3)));
  s.push(aiStep('Degree 9 can bend eight times. It passes through every training dot. Train error is almost zero.', ['fitC', 'bTr'], view(9)));
  s.push(aiStep('But between the dots it swings wildly, so the test dots are far off. That is overfitting.', ['bTe'].concat(D.vx.map((x, i) => 'te' + i)), view(9)));
  s.push(aiStep('Plot both errors against flexibility. Train error keeps falling. Test error falls, then climbs.', ['chtr', 'chte'], view(9, true)));
  s.push(aiStep('The best model sits at the bottom of the test curve, here degree ' + ch.best + ', not where train error is lowest.', ['chBest'], view(ch.best, true)));
  s.push(aiStep('Your pick: degree ' + deg + '. Train error ' + fmt(D.err[deg].tr) + ', test error ' + fmt(D.err[deg].te) + '. Move the slider and watch the test bar.', ['bTe'], view(deg, true)));
  s.push(aiStep('The rule: judge a model only on data it never saw while learning.', D.vx.map((x, i) => 'te' + i), view(deg, true)));
  return s;
}

// ---------- ML 5: a neuron and backprop on a tiny net ----------
function aiNet(W, x1, x2, t) {
  const a1 = W.w11 * x1 + W.w12 * x2 + W.b1; const a2 = W.w21 * x1 + W.w22 * x2 + W.b2;
  const h1 = Math.tanh(a1); const h2 = Math.tanh(a2);
  const y = W.v1 * h1 + W.v2 * h2 + W.c; const L = Math.pow(y - t, 2);
  const gy = 2 * (y - t);
  const g = { v1: gy * h1, v2: gy * h2, c: gy };
  const gh1 = gy * W.v1; const gh2 = gy * W.v2;
  const ga1 = gh1 * (1 - h1 * h1); const ga2 = gh2 * (1 - h2 * h2);
  Object.assign(g, { w11: ga1 * x1, w12: ga1 * x2, b1: ga1, w21: ga2 * x1, w22: ga2 * x2, b2: ga2, h1: gh1, h2: gh2, y: gy });
  return { h1, h2, y, L, g };
}
function aiBackprop(p) {
  const lr = p; const x1 = 1.0; const x2 = 0.5; const T = 1.0;
  const W0 = { w11: 0.5, w12: -0.4, b1: 0, w21: -0.3, w22: 0.8, b2: 0, v1: 0.6, v2: -0.5, c: 0 };
  const upd = (W, g) => { const o = {}; Object.keys(W).forEach((k) => { o[k] = W[k] - lr * g[k]; }); return o; };
  const f0 = aiNet(W0, x1, x2, T); const W1 = upd(W0, f0.g); const f1 = aiNet(W1, x1, x2, T);
  let W = W1; let f = f1; for (let i = 1; i < 30; i++) { W = upd(W, f.g); f = aiNet(W, x1, x2, T); }
  const f30 = f;
  const pos = { x1: [110, 110], x2: [110, 430], h1: [420, 110], h2: [420, 430], y: [680, 270] };
  const node = (id, label, sub, extra) => Object.assign({ id, x: pos[id][0], y: pos[id][1], r: 30, label, sub, c: id[0] === 'x' ? 'm' : 'b', subMono: true }, extra || {});
  const E = [['w11', 'x1', 'h1'], ['w12', 'x2', 'h1'], ['w21', 'x1', 'h2'], ['w22', 'x2', 'h2'], ['v1', 'h1', 'y'], ['v2', 'h2', 'y']];
  const edges = (Wt, lab, only) => E.filter((e) => !only || only.indexOf(e[0]) >= 0).map(([k, a, b]) => ({ id: k, from: a, to: b, w: Wt[k], label: lab ? lab(k) : 'w ' + aiFmt(Wt[k]), at: k[0] === 'v' ? 0.45 : k === 'w12' || k === 'w21' ? 0.3 : 0.5 }));
  const lossBox = (L, extra) => Object.assign({ id: 'loss', x: 790, y: 235, w: 150, h: 70, label: 'loss ' + aiFmt(L), sub: 'target 1.00', c: 'c', mono: true }, extra || {});
  const arrowL = { id: 'toLoss', from: 'y', to: 'loss', c: 'm' };
  const tanhInset = () => { const pts = []; for (let i = 0; i <= 40; i++) { const z = -3 + (6 * i) / 40; pts.push([aiR(560 + (z + 3) * 30), aiR(470 - Math.tanh(z) * 40)]); } return { paths: [{ id: 'tanhAx', pts: [[560, 470], [740, 470]], c: 'l', w: 1.5 }, { id: 'tanh', pts, c: 'a', w: 3 }], labels: [{ id: 'tanhT', x: 560, y: 410, text: 'tanh squashes any sum into −1…1', c: 'm', size: 13 }] }; };
  const fwd = (Wt, fr, opts) => {
    const o = opts || {};
    return aiScene({ nodes: [
      node('x1', '1.0', 'input'), node('x2', '0.5', 'input'),
      node('h1', aiFmt(fr.h1), o.g ? 'grad ' + aiFmt(fr.g.h1) : 'h1', o.g ? { sc: 'c' } : null),
      node('h2', aiFmt(fr.h2), o.g ? 'grad ' + aiFmt(fr.g.h2) : 'h2', o.g ? { sc: 'c' } : null),
      node('y', aiFmt(fr.y), o.gy ? 'grad ' + aiFmt(fr.g.y) : 'output', o.gy ? { sc: 'c' } : null)
    ], edges: edges(Wt, o.lab), boxes: [lossBox(fr.L)], arrows: [arrowL] });
  };
  const gradLab = (fr, set) => (k) => (set.indexOf(k) >= 0 ? 'g ' + aiFmt(fr.g[k]) : 'w ' + aiFmt(W0[k]));
  const s = [];
  s.push(aiStep('A neuron multiplies each input by a weight, adds them up with a bias, then squashes the total.', ['h1'], aiScene({ nodes: [node('x1', '1.0', 'input'), node('x2', '0.5', 'input'), node('h1', 'Σ', 'neuron')], edges: edges(W0, null, ['w11', 'w12']) })));
  s.push(aiStep('The squash here is tanh: big totals flatten out near 1 or −1, small ones pass almost unchanged.', ['tanh'], aiScene({ nodes: [node('x1', '1.0', 'input'), node('x2', '0.5', 'input'), node('h1', 'Σ', 'neuron')], edges: edges(W0, null, ['w11', 'w12']) }, tanhInset())));
  s.push(aiStep('Two neurons feed one output. That is a tiny network with six weights. Thick lines are big weights.', ['w11', 'w12', 'w21', 'w22', 'v1', 'v2'], aiScene({ nodes: [node('x1', '1.0', 'input'), node('x2', '0.5', 'input'), node('h1', '', 'h1'), node('h2', '', 'h2'), node('y', '', 'output')], edges: edges(W0) })));
  s.push(aiStep('Forward pass: inputs 1.0 and 0.5 flow left to right. Each node now shows its value.', ['h1', 'h2', 'y'], fwd(W0, f0)));
  s.push(aiStep('The output is ' + aiFmt(f0.y) + ' but the target is 1.00. Loss = (output − target)² = ' + aiFmt(f0.L) + '.', ['loss'], fwd(W0, f0)));
  s.push(aiStep('Backward pass: how much would the loss change if each number wiggled? At the output that is ' + aiFmt(f0.g.y) + '.', ['y'], fwd(W0, f0, { gy: true })));
  s.push(aiStep('Each last weight gets blame in proportion to what flowed through it: its gradient is ' + aiFmt(f0.g.y) + ' × h.', ['v1', 'v2'], fwd(W0, f0, { gy: true, lab: gradLab(f0, ['v1', 'v2']) })));
  s.push(aiStep('Blame flows back into each hidden neuron through its weight. That is the chain rule.', ['h1', 'h2'], fwd(W0, f0, { gy: true, g: true, lab: gradLab(f0, ['v1', 'v2']) })));
  s.push(aiStep('Going back through tanh scales blame by (1 − h²). Then the first four weights get theirs.', ['w11', 'w12', 'w21', 'w22'], fwd(W0, f0, { gy: true, g: true, lab: gradLab(f0, ['v1', 'v2', 'w11', 'w12', 'w21', 'w22']) })));
  s.push(aiStep('Update: every weight steps against its gradient, sized by the learning rate ' + lr.toFixed(2) + '. Lines change thickness.', ['w11', 'w12', 'w21', 'w22', 'v1', 'v2'], aiScene({ nodes: [node('x1', '1.0', 'input'), node('x2', '0.5', 'input'), node('h1', '', 'h1'), node('h2', '', 'h2'), node('y', '', 'output')], edges: edges(W1), boxes: [lossBox(f0.L, { label: 'loss ?' })], arrows: [arrowL] })));
  s.push(aiStep('Forward again with the new weights: output ' + aiFmt(f1.y) + ', loss ' + aiFmt(f1.L) + (f1.L < f0.L ? '. Lower.' : '. Higher: that step was too big.'), ['loss'], fwd(W1, f1)));
  s.push(aiStep('Repeat 30 times and the output reaches ' + aiFmt(f30.y) + ', loss ' + aiFmt(f30.L) + '. Try a different learning rate.', ['y', 'loss'], fwd(W, f30)));
  s.push(aiStep('That is backprop: a forward pass, the chain rule backward, then a nudge. Big nets repeat it billions of times.', [], fwd(W, f30)));
  return s;
}

// ---------- ML 6: embeddings and cosine similarity ----------
function aiEmbed() {
  const O = [430, 470];
  const W = [['cat', 28, 230], ['kitten', 36, 160], ['dog', 52, 220], ['puppy', 60, 160], ['apple', 102, 200], ['banana', 112, 170], ['car', 150, 230], ['truck', 161, 200]];
  const vec = W.map(([w, a, L]) => { const r = (a * Math.PI) / 180; return { w, a, L, x: aiR(O[0] + Math.cos(r) * L), y: aiR(O[1] - Math.sin(r) * L), ux: Math.cos(r), uy: Math.sin(r) }; });
  const by = {}; vec.forEach((v) => { by[v.w] = v; });
  const cos = (a, b) => by[a].ux * by[b].ux + by[a].uy * by[b].uy;
  const grp = { cat: 'a', kitten: 'a', dog: 'a', puppy: 'a', apple: 'c', banana: 'c', car: 'b', truck: 'b' };
  const arrows = (hl, colour) => vec.map((v) => ({ id: 'v_' + v.w, from: { x: O[0], y: O[1] }, to: { x: v.x, y: v.y }, c: colour ? grp[v.w] : hl && hl.indexOf(v.w) >= 0 ? 't' : 'm', w: 2.5, op: hl && hl.indexOf(v.w) < 0 ? 0.35 : 1 }));
  const words = (colour) => vec.map((v) => ({ id: 'w_' + v.w, x: aiR(v.x + v.ux * 34), y: aiR(v.y - v.uy * 18 + 5), text: v.w, c: colour ? grp[v.w] : 't', size: 15, weight: 600, anchor: 'middle' }));
  const origin = { points: [{ id: 'origin', x: O[0], y: O[1], c: 'm', r: 4 }] };
  const map = (hl, colour) => aiScene(origin, { arrows: arrows(hl, colour), labels: words(colour) });
  const arc = (a, b, id) => { const A = by[a].a; const B = by[b].a; const pts = []; for (let i = 0; i <= 24; i++) { const d = ((A + ((B - A) * i) / 24) * Math.PI) / 180; pts.push([aiR(O[0] + Math.cos(d) * 70), aiR(O[1] - Math.sin(d) * 70)]); } return { id, pts, c: 't', w: 2.5 }; };
  const nums = (v) => '[' + aiFmt(v.ux * (v.L / 230)) + ', ' + aiFmt(v.uy * (v.L / 230)) + ']';
  const row = aiTokenRow(['cat', 'kitten', 'car'], 120, 120).map((k, i) => Object.assign(k, { sub: nums(by[k.text]) }));
  const cosBars = (q) => {
    const list = vec.filter((v) => v.w !== q).map((v) => ({ w: v.w, c: cos(q, v.w) })).sort((a, b) => b.c - a.c);
    return { list, scene: { bars: list.map((it, i) => ({ id: 'cb_' + it.w, x: 760, y: aiR(70 + i * 46), w: aiR(Math.max(2, (it.c + 1) * 80)), h: 24, c: grp[it.w], vx: aiR(766 + Math.max(2, (it.c + 1) * 80)), vy: aiR(87 + i * 46), val: aiFmt(it.c) })), labels: list.map((it, i) => ({ id: 'cl_' + it.w, x: 748, y: aiR(87 + i * 46), text: it.w, c: 't2', size: 13, anchor: 'end' })).concat([{ id: 'cbT', x: 680, y: 44, text: 'cosine with ' + q, c: 'm', size: 13 }]) } };
  };
  const pc = cosBars('puppy');
  const s = [];
  s.push(aiStep('A computer cannot compare words directly, so each word becomes a list of numbers called an embedding.', ['tk0', 'tk1', 'tk2'], { tokens: row }));
  s.push(aiStep('With two numbers, a word is an arrow on a map. Real models use hundreds of numbers, but the idea is the same.', [], map()));
  s.push(aiStep('Training places words used in similar ways near each other. Animals point one way, vehicles another.', [], map(null, true)));
  s.push(aiStep('To compare two words, look at the angle between their arrows, not where the tips land.', ['v_cat', 'v_kitten'], aiScene(map(['cat', 'kitten']), { paths: [arc('cat', 'kitten', 'arc')] })));
  s.push(aiStep('cat and kitten: a small angle. Their cosine similarity is ' + aiFmt(cos('cat', 'kitten')) + ', close to 1.', ['arc'], aiScene(map(['cat', 'kitten']), { paths: [arc('cat', 'kitten', 'arc')] })));
  s.push(aiStep('cat and truck: a wide angle. Cosine ' + aiFmt(cos('cat', 'truck')) + '. They have little in common.', ['arc'], aiScene(map(['cat', 'truck']), { paths: [arc('cat', 'truck', 'arc')] })));
  s.push(aiStep('Cosine runs from 1 for the same direction, through 0 for unrelated, to −1 for opposite.', ['scale'], aiScene(map(['cat', 'truck']), { paths: [arc('cat', 'truck', 'arc')], bars: [{ id: 'scale', x: 640, y: 80, w: 280, h: 10, c: 'l', label: '−1          0          1', ly: 112, mono: true }] })));
  s.push(aiStep('Length does not matter. kitten’s short arrow and cat’s long one score high because they point almost the same way.', ['v_kitten', 'v_cat'], map(['cat', 'kitten'])));
  s.push(aiStep('Ask which words are closest to puppy: score every word by cosine and sort.', pc.list.map((it) => 'cb_' + it.w), aiScene(map(['puppy']), pc.scene)));
  s.push(aiStep('Top matches: ' + pc.list[0].w + ', then ' + pc.list[1].w + '. The vehicles come last. Search by meaning works this way.', ['cb_' + pc.list[0].w, 'cb_' + pc.list[1].w], aiScene(map(['puppy', pc.list[0].w, pc.list[1].w]), pc.scene)));
  s.push(aiStep('The same trick powers recommendations, clustering, and the retrieval step in RAG.', [], aiScene(map(null, true), pc.scene)));
  return s;
}

// ---------- AI now 1: attention ----------
function aiAttention(p) {
  const T = p;
  const words = ['The', 'cat', 'sat', 'on', 'the', 'mat', 'because', 'it', 'was', 'tired'];
  const row = aiTokenRow(words, 290, 12);
  const Q = 7; // "it"
  const score = [0.2, 3.0, 0.8, 0.1, 0.3, 1.6, 0.6, 1.2, 0.4, 1.4];
  const wts = aiSoftmax(score, T);
  const toks = (extra) => row.map((k, i) => Object.assign({}, k, extra ? extra(k, i) : {}));
  const base = (extra) => ({ tokens: toks(extra) });
  const maxS = 3.0;
  const scoreBars = () => ({ bars: row.map((k, i) => ({ id: 'sb' + i, x: aiR(k.x - 14), y: aiR(500 - (score[i] / maxS) * 120), w: 28, h: aiR((score[i] / maxS) * 120), c: 'm', val: aiFmt(score[i], 1) })), labels: [{ id: 'sbT', x: 40, y: 360, text: 'scores', c: 'm', size: 13 }] });
  const wBars = () => ({ bars: row.map((k, i) => ({ id: 'sb' + i, x: aiR(k.x - 14), y: aiR(500 - wts[i] * 150), w: 28, h: aiR(wts[i] * 150), c: 'a', val: Math.round(wts[i] * 100) + '%' })), labels: [{ id: 'sbT', x: 40, y: 360, text: 'weights', c: 'm', size: 13 }] });
  const arcs = (ws, c, op) => ({ links: row.map((k, i) => (i === Q ? null : { id: 'at' + i, from: 'tk' + Q, to: 'tk' + i, w: ws[i] / Math.max.apply(null, ws.filter((x, j) => j !== Q)), c: c || 'a', op: op || 1 })).filter(Boolean) });
  const flat = row.map(() => 0.35);
  const it = (extra) => (k, i) => (i === Q ? Object.assign({ c: 'a' }, extra || {}) : {});
  const qk = { labels: [{ id: 'qLab', x: row[Q].x, y: 240, text: 'query: what am I looking for?', c: 'a', size: 13, anchor: 'middle' }] };
  const keys = base((k, i) => (i === Q ? { c: 'a', sub: 'q' } : { sub: 'k' }));
  const s = [];
  s.push(aiStep('A sentence is cut into tokens. A transformer reads them all at once, side by side.', [], base()));
  s.push(aiStep('Each token starts as an embedding. But “it” alone does not say what it refers to.', ['tk7'], base(it())));
  s.push(aiStep('Attention lets “it” look at every other token and decide which ones matter for its meaning.', ['tk7'], aiScene(base(it()), arcs(flat, 'm', 0.6))));
  s.push(aiStep('“it” sends out a query. Every token offers a key that says what it contains.', ['tk7'], aiScene(keys, qk)));
  s.push(aiStep('Score = query · key, one number per token. A high score is a good match, and “cat” scores highest.', ['sb1'], aiScene(keys, qk, scoreBars())));
  s.push(aiStep('Softmax turns the scores into weights that are all positive and add up to 100%.', row.map((k, i) => 'sb' + i), aiScene(keys, wBars())));
  s.push(aiStep('Arrow thickness shows the weights. Most of “it”’s attention goes to “cat”.', ['at1'], aiScene(base(it()), arcs(wts), wBars())));
  s.push(aiStep('“it” then takes a weighted mix of every token’s value, so its embedding now carries some “cat”.', ['tk7'], aiScene(base((k, i) => (i === Q ? { c: 'a', sub: '≈ cat', solid: true } : {})), arcs(wts), wBars())));
  s.push(aiStep('Temperature ' + T.toFixed(1) + ': scores are divided by it before softmax. Lower sharpens, higher spreads. Try the slider.', ['at1'], aiScene(base(it()), arcs(wts), wBars())));
  const allLinks = []; [[2, 1], [5, 2], [4, 5], [8, 7], [9, 7], [6, 2], [3, 5]].forEach(([a, b], i) => allLinks.push({ id: 'all' + i, from: 'tk' + a, to: 'tk' + b, w: 0.55, c: 'b' }));
  s.push(aiStep('Every token does this at the same time, so the whole sentence updates in one pass.', [], aiScene(base(), { links: allLinks }, arcs(wts, 'a', 0.6))));
  const head2 = []; for (let i = 0; i < 9; i++) head2.push({ id: 'h2_' + i, from: 'tk' + (i + 1), to: 'tk' + i, w: 0.6, c: 'c', below: true });
  s.push(aiStep('Several heads run side by side. Here one links “it” to “cat”; another just looks at the previous word.', ['h2_0', 'at1'], aiScene(base(), arcs(wts), { links: head2 }, { labels: [{ id: 'hA', x: 40, y: 120, text: 'head 1', c: 'a', size: 13 }, { id: 'hB', x: 40, y: 400, text: 'head 2', c: 'c', size: 13 }] })));
  s.push(aiStep('Stack dozens of these layers, and each token’s meaning is built from the whole context.', [], aiScene(base(), arcs(wts), { links: head2.concat(allLinks) })));
  s.push(aiStep('The cost: every token looks at every token, so work grows with the square of the length.', ['n2'], aiScene(base(), { links: allLinks }, arcs(wts, 'a', 0.5), { labels: [{ id: 'n2', x: 480, y: 440, text: '10 tokens → 100 pairs · 1,000 tokens → 1,000,000 pairs', c: 't', size: 16, weight: 700, anchor: 'middle', mono: true }] })));
  return s;
}

// ---------- AI now 2: System 1 vs System 2 ----------
function aiSystems(p) {
  const budget = Math.max(1, Math.round(p));
  const fastLane = { id: 'fast', x: 300, y: 70, w: 620, h: 110, label: '', c: 'l', dash: true };
  const slowLane = { id: 'slow', x: 300, y: 220, w: 620, h: 240, label: '', c: 'l', dash: true };
  const lanes = { boxes: [fastLane, slowLane], labels: [{ id: 'fastT', x: 316, y: 96, text: 'Fast: answer in one pass (System 1)', c: 'm', size: 13 }, { id: 'slowT', x: 316, y: 246, text: 'Slow: write steps, then answer (System 2)', c: 'm', size: 13 }] };
  const q = (label, sub) => ({ boxes: [{ id: 'q', x: 40, y: 200, w: 220, h: 90, label, sub, c: 't' }] });
  const ans = (id, y, label, ok) => ({ id, x: 796, y, w: 112, h: 50, label, c: ok ? 'ok' : 'bad', sub: ok ? 'right' : 'wrong', mono: true });
  const work = ['ball = x', 'bat = x + 1.00', 'x + x + 1.00 = 1.10', 'x = 0.05 ✓'];
  const scratch = (n) => ({ boxes: work.slice(0, Math.min(n, budget)).map((w, i) => ({ id: 'w' + i, x: 330 + (i % 2) * 230, y: 270 + Math.floor(i / 2) * 80, w: 210, h: 54, label: w, c: i === 3 ? 'ok' : 'b', mono: true, size: 15 })) });
  const out = (n) => (n > budget ? { labels: [{ id: 'cut', x: 330, y: 440, text: 'budget used up after ' + budget + ' step' + (budget > 1 ? 's' : ''), c: 'bad', size: 13 }] } : null);
  const arrowQ = { arrows: [{ id: 'qf', from: 'q', to: 'fast', c: 'm' }, { id: 'qs', from: 'q', to: 'slow', c: 'm' }] };
  const hardQ = q('ball = ?', 'bat + ball = 1.10 · bat is 1.00 more');
  const fastWrong = { boxes: [ans('fa', 100, '0.10', false)] };
  const done = budget >= 4;
  const s = [];
  s.push(aiStep('Psychology names two modes of thinking. System 1 is fast and automatic. System 2 is slow and careful.', ['fast', 'slow'], aiScene(lanes)));
  s.push(aiStep('A plain language model answering in one pass behaves like System 1. A reasoning model writes out steps first.', ['slow'], aiScene(lanes, q('question', ''), arrowQ)));
  s.push(aiStep('Easy question: 7 + 5. The fast lane answers 12 at once, and it is right.', ['fa'], aiScene(lanes, q('7 + 5 = ?', 'easy'), arrowQ, { boxes: [ans('fa', 100, '12', true)] })));
  s.push(aiStep('The slow lane also says 12, after writing a step. Right too, but it spent more time and tokens.', ['sa'], aiScene(lanes, q('7 + 5 = ?', 'easy'), arrowQ, { boxes: [ans('fa', 100, '12', true), { id: 'w0', x: 330, y: 270, w: 210, h: 54, label: '7 + 5 = 12', c: 'b', mono: true, size: 15 }, ans('sa', 390, '12', true)] })));
  s.push(aiStep('A harder one: a bat and a ball cost 1.10 together. The bat costs 1.00 more than the ball. What is the ball?', ['q'], aiScene(lanes, hardQ, arrowQ)));
  s.push(aiStep('The fast lane blurts 0.10. It feels right, but then the bat would be 1.10 and the total 1.20. Wrong.', ['fa'], aiScene(lanes, hardQ, arrowQ, fastWrong)));
  const stepCap = ['Slow lane, step 1: call the ball x.', 'Step 2: the bat costs 1.00 more, so it is x + 1.00.', 'Step 3: together they cost 1.10, so x + x + 1.00 = 1.10.', 'Step 4: so 2x = 0.10 and x = 0.05. Check: 0.05 + 1.05 = 1.10.'];
  for (let i = 1; i <= 4; i++) {
    const say = i <= budget ? stepCap[i - 1] : i === budget + 1 ? 'Out of budget after ' + budget + ' step' + (budget > 1 ? 's' : '') + '. It must answer now, and it guesses 0.10. Wrong.' : 'Still out of budget. A bigger thinking budget would let it finish. Try the slider.';
    const fin = i === 4 && done ? { boxes: [ans('sa', 390, '0.05', true)] } : i > budget ? { boxes: [ans('sa', 390, '0.10', false)] } : null;
    s.push(aiStep(say, i <= budget ? ['w' + (i - 1)] : ['cut'], aiScene(lanes, hardQ, arrowQ, fastWrong, scratch(i), out(i), fin)));
  }
  const curve = []; for (let i = 0; i <= 40; i++) { const x = i / 40; curve.push([aiR(320 + x * 560), aiR(440 - (1 - Math.exp(-4 * x)) * 300)]); }
  const chart = { paths: [{ id: 'cAx', pts: [[320, 120], [320, 440], [890, 440]], c: 'l', w: 1.5 }, { id: 'curve', pts: curve, c: 'a', w: 3 }], points: [{ id: 'you', x: aiR(320 + (budget / 6) * 560), y: aiR(440 - (1 - Math.exp(-4 * budget / 6)) * 300), c: 'a', r: 8, ring: true, label: 'budget ' + budget, ly: 26, lx: -20 }], labels: [{ id: 'cY', x: 330, y: 112, text: '↑ accuracy on hard problems', c: 'm', size: 13 }, { id: 'cX', x: 890, y: 466, text: 'thinking tokens →', c: 'm', size: 13, anchor: 'end' }, { id: 'cNote', x: 890, y: 500, text: 'illustrative shape, not measured data', c: 'm', size: 12, anchor: 'end' }] };
  s.push(aiStep('Spending extra compute while answering is called test-time compute. Reasoning models are trained to use it.', ['curve'], aiScene(chart, q('budget', 'tokens to think'))));
  s.push(aiStep('More thinking helps on hard problems, up to a point, then the gains flatten. Easy questions barely need it.', ['you'], aiScene(chart, q('budget', 'tokens to think'))));
  s.push(aiStep('Distillation: train the fast model on the slow model’s worked answers, so careful habits become reflexes.', ['distil'], aiScene(lanes, hardQ, scratch(4), { boxes: [ans('fa', 100, '0.05', true)], arrows: [{ id: 'distil', from: 'slow', to: 'fast', c: 'a', w: 3, label: 'distil', lx: 34 }] })));
  s.push(aiStep('You may see “System 3” online. It is not an established term: we found no primary source that defines it.', ['s3'], aiScene(lanes, hardQ, arrowQ, fastWrong, scratch(4), out(5), done ? { boxes: [ans('sa', 390, '0.05', true)] } : { boxes: [ans('sa', 390, '0.10', false)] }, { labels: [{ id: 's3', x: 610, y: 500, text: '“System 3”: informal label, no agreed definition', c: 'm', size: 14, anchor: 'middle' }] })));
  return s;
}

// ---------- AI now 3: JEPA ----------
function aiJepa() {
  const G = 4; const C = 52; const X0 = 50; const Y0 = 150;
  const scene = ['b', 'b', 'c', 'b', 'b', 'b', 'b', 'b', 'a', 'a', 'b', 'b', 'ok', 'a', 'ok', 'ok'];
  const hidden = [6, 7, 10, 11];
  const cells = (mask, dimAll) => scene.map((c, i) => ({ id: 'px' + i, x: X0 + (i % G) * C, y: Y0 + Math.floor(i / G) * C, w: C - 4, h: C - 4, c: mask && hidden.indexOf(i) >= 0 ? 'l' : c, op: mask && hidden.indexOf(i) >= 0 ? 0.25 : dimAll ? 0.3 : 0.7, rx: 4 }));
  const img = (mask, dimAll) => ({ bars: cells(mask, dimAll), labels: [{ id: 'imgT', x: X0, y: Y0 - 18, text: mask ? 'picture with a hidden block' : 'a picture, cut into patches', c: 'm', size: 13 }] });
  const box = (id, x, y, label, sub, c) => ({ id, x, y, w: 170, h: 64, label, sub, c: c || 'l' });
  const ctxEnc = box('ctx', 300, 120, 'context encoder', 'sees visible patches');
  const tgtEnc = box('tgt', 300, 330, 'target encoder', 'sees the hidden block');
  const pred = box('pred', 540, 120, 'predictor', 'guesses the hidden part');
  const lossB = box('loss', 760, 230, 'compare', 'distance between vectors', 'c');
  const vec = (id, x, y, vals, c) => vals.map((v, i) => ({ id: id + i, x: x + i * 16, y: y - v * 40, w: 12, h: aiR(v * 40), c, rx: 2 }));
  const ctxVec = vec('cv', 330, 250, [0.6, 0.3, 0.9, 0.5, 0.7, 0.2], 'b');
  const predVec = vec('pv', 790, 120 + 40, [0.5, 0.8, 0.3, 0.6, 0.4, 0.7], 'a');
  const tgtVec = vec('tv', 790, 400, [0.55, 0.75, 0.35, 0.6, 0.45, 0.65], 'b');
  const pipe = aiScene(img(true), { boxes: [ctxEnc, pred, tgtEnc, lossB] });
  const s = [];
  s.push(aiStep('Take a picture and cut it into patches: sky, sun, a tree, grass.', [], img(false)));
  s.push(aiStep('Hide a block of patches. The model’s job is to work out what belongs there.', hidden.map((i) => 'px' + i), img(true)));
  const pixGrid = []; for (let i = 0; i < 36; i++) pixGrid.push({ id: 'g' + i, x: 560 + (i % 6) * 34, y: 150 + Math.floor(i / 6) * 34, w: 30, h: 30, c: ['a', 'ok', 'b', 'c', 'a', 'ok'][(i * 7) % 6], op: 0.45 + ((i * 13) % 5) * 0.1, rx: 2 });
  s.push(aiStep('A generative model would paint every hidden pixel, down to each leaf. Much of that detail cannot be predicted.', ['pix'], aiScene(img(true), { bars: pixGrid, boxes: [box('pix', 300, 230, 'pixel painter', 'predicts raw pixels')], arrows: [{ id: 'toPix', from: 'pix', to: { x: 556, y: 250 }, c: 'm' }] })));
  s.push(aiStep('JEPA does something else. A context encoder turns the visible patches into a vector of numbers.', ['ctx'], aiScene(img(true), { boxes: [ctxEnc], bars: ctxVec, arrows: [{ id: 'iCtx', from: { x: 260, y: 200 }, to: 'ctx', c: 'm' }] })));
  s.push(aiStep('During training, a target encoder turns the hidden block into a vector too. That is the answer key.', ['tgt'], aiScene(pipe, { bars: ctxVec.concat(tgtVec), arrows: [{ id: 'iCtx', from: { x: 260, y: 200 }, to: 'ctx', c: 'm' }, { id: 'iTgt', from: { x: 260, y: 300 }, to: 'tgt', c: 'm' }, { id: 'tL', from: 'tgt', to: 'loss', c: 'm' }] })));
  const full = aiScene(pipe, { bars: ctxVec.concat(tgtVec, predVec), arrows: [{ id: 'iCtx', from: { x: 260, y: 200 }, to: 'ctx', c: 'm' }, { id: 'iTgt', from: { x: 260, y: 300 }, to: 'tgt', c: 'm' }, { id: 'cP', from: 'ctx', to: 'pred', c: 'm' }, { id: 'pL', from: 'pred', to: 'loss', c: 'a' }, { id: 'tL', from: 'tgt', to: 'loss', c: 'm' }] });
  s.push(aiStep('A predictor takes the context vector and guesses the vector of the hidden block.', ['pred'], full));
  s.push(aiStep('The loss compares the two vectors, not pixels. Learning makes the guess land near the answer key.', ['loss'], full));
  s.push(aiStep('So the model learns the gist, a tree here, tall and on the left, and ignores details no one could guess.', ['pv0', 'pv1', 'pv2', 'pv3', 'pv4', 'pv5'], aiScene(full, { labels: [{ id: 'gist', x: 760, y: 470, text: '“tree, left, tall”', c: 'a', size: 15, weight: 700 }] })));
  s.push(aiStep('That is I-JEPA, for images (Meta, 2023): a joint-embedding predictive architecture.', [], aiScene(full, { labels: [{ id: 'name', x: 50, y: 400, text: 'I-JEPA · images', c: 't', size: 18, weight: 700 }] })));
  const frames = []; for (let f = 0; f < 4; f++) for (let i = 0; i < 4; i++) frames.push({ id: 'vf' + f + '_' + i, x: 60 + f * 110 + (i % 2) * 44, y: 170 + Math.floor(i / 2) * 44, w: 40, h: 40, c: f >= 2 && i === 1 ? 'l' : ['b', 'a', 'ok', 'b'][i], op: f >= 2 && i === 1 ? 0.25 : 0.7, rx: 3 });
  s.push(aiStep('V-JEPA applies the same idea to video: hide a region across frames and predict it in vector space.', ['vf2_1', 'vf3_1'], { bars: frames, labels: [{ id: 'vT', x: 60, y: 150, text: 'four video frames, one region hidden over time', c: 'm', size: 13 }, { id: 'name', x: 60, y: 320, text: 'V-JEPA · video', c: 't', size: 18, weight: 700 }] }));
  const goal = { id: 'goal', x: 760, y: 200, w: 150, h: 70, label: 'goal picture', c: 'ok' };
  const arm = { id: 'arm', x: 120, y: 220, w: 150, h: 70, label: 'robot now', c: 't' };
  const ghosts = [['m1', 90, 'c'], ['m2', 235, 'ok'], ['m3', 380, 'c']].map(([id, y, c]) => ({ id, x: 450, y, w: 160, h: 56, label: 'imagined move', sub: c === 'ok' ? 'closest to goal' : 'farther', c, dash: c !== 'ok' }));
  s.push(aiStep('V-JEPA 2 adds some robot data. It imagines what each move would do and picks the one that lands nearest the goal.', ['m2'], { boxes: [arm, goal].concat(ghosts), arrows: [{ id: 'g1', from: 'arm', to: 'm1', c: 'm', dash: true }, { id: 'g2', from: 'arm', to: 'm2', c: 'a' }, { id: 'g3', from: 'arm', to: 'm3', c: 'm', dash: true }, { id: 'g4', from: 'm2', to: 'goal', c: 'a' }], labels: [{ id: 'name', x: 120, y: 470, text: 'V-JEPA 2 · a world model for planning', c: 't', size: 18, weight: 700 }] }));
  s.push(aiStep('Open question: is predicting in vector space better than generating? The evidence so far is mostly vision and robotics.', [], aiScene(full)));
  return s;
}

// ---------- AI now 4: RAG ----------
function aiRag() {
  const qBox = { id: 'q', x: 40, y: 50, w: 290, h: 64, label: 'What is our refund window?', sub: 'your question', c: 't', size: 15 };
  const llm = { id: 'llm', x: 420, y: 200, w: 170, h: 80, label: 'language model', c: 'b' };
  const ansBox = (label, sub, c) => ({ id: 'ans', x: 680, y: 200, w: 250, h: 80, label, sub, c, size: 15 });
  const chunks = ['Refunds: within 14 days', 'Shipping takes 3–5 days', 'Returns need a receipt', 'Store hours: 9 to 6', 'Warranty lasts 1 year', 'Gift cards never expire'];
  const card = (i, c, op) => ({ id: 'c' + i, x: 30 + (i % 2) * 200, y: 330 + Math.floor(i / 2) * 64, w: 192, h: 50, label: chunks[i], sub: '#' + (i + 1), c: c || 'l', size: 13, op: op === undefined ? 1 : op });
  const cards = (hot, faint) => ({ boxes: chunks.map((x, i) => card(i, hot && hot.indexOf(i) >= 0 ? 'a' : 'l', faint && hot && hot.indexOf(i) < 0 ? 0.45 : 1)) });
  const IX = [680, 330, 250, 170];
  const dotPos = [[0.25, 0.3], [0.7, 0.2], [0.35, 0.5], [0.85, 0.75], [0.6, 0.85], [0.15, 0.8]];
  const index = (qdot, hot) => ({ boxes: [{ id: 'ix', x: IX[0], y: IX[1], w: IX[2], h: IX[3], label: '', c: 'l', dash: true }], labels: [{ id: 'ixT', x: IX[0] + 12, y: IX[1] + 22, text: 'vector index', c: 'm', size: 13 }],
    points: dotPos.map(([u, v], i) => ({ id: 'd' + i, x: aiR(IX[0] + 20 + u * (IX[2] - 40)), y: aiR(IX[1] + 30 + v * (IX[3] - 45)), c: hot && hot.indexOf(i) >= 0 ? 'a' : 'm', r: 6, label: '#' + (i + 1), lx: 9 })).concat(qdot ? [{ id: 'qd', x: aiR(IX[0] + 20 + 0.32 * (IX[2] - 40)), y: aiR(IX[1] + 30 + 0.4 * (IX[3] - 45)), c: 't', r: 8, ring: true, hollow: true }] : []),
    rings: qdot && hot ? [{ id: 'near', x: aiR(IX[0] + 20 + 0.32 * (IX[2] - 40)), y: aiR(IX[1] + 30 + 0.4 * (IX[3] - 45)), r: 62, c: 'a' }] : [] });
  const top = [0, 2, 1];
  const prompt = { id: 'prompt', x: 450, y: 340, w: 200, h: 150, label: 'prompt', sub: 'question + #1, #3, #2', c: 'a' };
  const s = [];
  s.push(aiStep('You ask a chatbot about your own company. The model was trained on the public web, not your files.', ['q'], { boxes: [qBox, llm], arrows: [{ id: 'qa', from: 'q', to: 'llm', c: 'm' }] }));
  s.push(aiStep('Without help it can only guess, and a confident guess can be wrong. This is called a hallucination.', ['ans'], { boxes: [qBox, llm, ansBox('“30 days, probably”', 'a guess', 'bad')], arrows: [{ id: 'qa', from: 'q', to: 'llm', c: 'm' }, { id: 'la', from: 'llm', to: 'ans', c: 'm' }] }));
  s.push(aiStep('RAG starts before any question: cut your documents into small chunks.', ['c0', 'c1', 'c2', 'c3', 'c4', 'c5'], aiScene({ boxes: [qBox, llm] }, cards())));
  s.push(aiStep('Turn each chunk into an embedding and store it in a vector index, where similar meanings sit close together.', ['ix'], aiScene({ boxes: [qBox, llm] }, cards(), index())));
  s.push(aiStep('When the question arrives, it becomes an embedding too: a new dot on the same map.', ['qd'], aiScene({ boxes: [qBox, llm] }, cards(), index(true), { arrows: [{ id: 'qi', from: 'q', to: 'ix', c: 'm', dash: true }] })));
  s.push(aiStep('Retrieve: the nearest chunks light up. The top three are about refunds, returns and shipping.', ['near'], aiScene({ boxes: [qBox, llm] }, cards(top, true), index(true, top))));
  s.push(aiStep('Paste those chunks into the prompt next to the question, with their numbers.', ['prompt'], aiScene({ boxes: [qBox, llm, prompt] }, cards(top, true), index(true, top), { arrows: [{ id: 'cp', from: 'c2', to: 'prompt', c: 'a' }, { id: 'pl', from: 'prompt', to: 'llm', c: 'a' }] })));
  s.push(aiStep('Generate: the model answers from the pasted text and cites it. “Within 14 days [#1].”', ['ans'], aiScene({ boxes: [qBox, llm, prompt, ansBox('“Within 14 days [#1]”', 'grounded in your docs', 'ok')] }, cards(top, true), { arrows: [{ id: 'pl', from: 'prompt', to: 'llm', c: 'a' }, { id: 'la', from: 'llm', to: 'ans', c: 'ok' }] })));
  const split = { boxes: [{ id: 'c0', x: 40, y: 330, w: 186, h: 50, label: 'Refunds: within', sub: '#1a', c: 'bad', size: 13 }, { id: 'c0b', x: 240, y: 330, w: 186, h: 50, label: '14 days of purchase', sub: '#1b', c: 'bad', size: 13 }] };
  s.push(aiStep('Chunking matters. Cut a sentence in half and neither piece holds the full fact, so retrieval can miss it.', ['c0', 'c0b'], aiScene({ boxes: [qBox, llm] }, split)));
  s.push(aiStep('Policy changed? Update the index, not the model. No retraining is needed for fresh or private facts.', ['ix'], aiScene({ boxes: [qBox, llm] }, cards(), index())));
  s.push(aiStep('Variants: Self-RAG lets the model decide when to retrieve; contextual retrieval adds context to each chunk first.', [], aiScene({ boxes: [qBox, llm, prompt] }, cards(top, true), index(true, top))));
  s.push(aiStep('Retrieve, then generate. Most company chatbots and doc search tools work this way.', ['ans'], aiScene({ boxes: [qBox, llm, prompt, ansBox('“Within 14 days [#1]”', 'grounded in your docs', 'ok')] }, cards(top, true), index(true, top), { arrows: [{ id: 'qi', from: 'q', to: 'ix', c: 'm', dash: true }, { id: 'pl', from: 'prompt', to: 'llm', c: 'a' }, { id: 'la', from: 'llm', to: 'ans', c: 'ok' }] })));
  return s;
}

// ---------- AI now 5: agents, tools and MCP ----------
function aiAgents() {
  const goal = { id: 'goal', x: 30, y: 60, w: 230, h: 70, label: 'Goal: fix the failing test', c: 't', size: 15 };
  const model = { id: 'model', x: 330, y: 200, w: 200, h: 90, label: 'model', sub: 'thinks, picks a tool', c: 'b' };
  const mcp = { id: 'mcp', x: 620, y: 40, w: 320, h: 330, label: '', c: 'l', dash: true };
  const tool = (id, y, label, hot) => ({ id, x: 650, y, w: 260, h: 60, label, sub: hot || '', c: hot ? 'a' : 'l', mono: true, size: 15 });
  const tools = (hot) => [tool('tRun', 90, 'run_tests', hot === 'tRun' ? 'called' : ''), tool('tRead', 180, 'read_file', hot === 'tRead' ? 'called' : ''), tool('tEdit', 270, 'edit_file', hot === 'tEdit' ? 'called' : '')];
  const obs = (label, c) => ({ id: 'obs', x: 330, y: 400, w: 300, h: 70, label, sub: 'what came back', c: c || 'l', mono: true, size: 14 });
  const frame = (hot, o, extra) => aiScene({ boxes: [goal, model, mcp].concat(tools(hot)), labels: [{ id: 'mcpT', x: 640, y: 64, text: 'tools on an MCP server', c: 'm', size: 13 }], arrows: [{ id: 'gm', from: 'goal', to: 'model', c: 'm' }] }, o ? { boxes: [o] } : null, extra);
  const call = (to, label) => ({ arrows: [{ id: 'call', from: 'model', to, c: 'a', w: 3, label, mono: true, ly: -12 }] });
  const back = (from) => ({ arrows: [{ id: 'back', from, to: 'obs', c: 'b' }, { id: 'om', from: 'obs', to: 'model', c: 'b' }] });
  const s = [];
  s.push(aiStep('An agent is a model in a loop. It gets a goal and works toward it one action at a time.', ['goal'], frame()));
  s.push(aiStep('First it thinks: “I should see which test fails.” Then it picks a tool.', ['model'], frame()));
  s.push(aiStep('It sends a tool call: a small structured message naming the tool and its inputs.', ['call'], frame('tRun', null, call('tRun', '{tool: run_tests}'))));
  s.push(aiStep('The tool runs and sends back an observation: one test fails, test_total.', ['obs'], frame('tRun', obs('1 failed: test_total', 'bad'), back('tRun'))));
  s.push(aiStep('The model reads that, thinks again, and calls read_file to look at the code.', ['call'], frame('tRead', obs('1 failed: test_total', 'bad'), call('tRead', '{tool: read_file}'))));
  s.push(aiStep('Observation: the total skips the last item. It finds the bug.', ['obs'], frame('tRead', obs('total uses items[:-1]'), back('tRead'))));
  s.push(aiStep('Next action: edit_file with the fix.', ['call'], frame('tEdit', obs('total uses items[:-1]'), call('tEdit', '{tool: edit_file}'))));
  s.push(aiStep('Then it runs the tests again to check its own work. All pass.', ['obs'], frame('tRun', obs('all tests pass', 'ok'), back('tRun'))));
  s.push(aiStep('Goal met, so it stops. Think, act, observe, repeat: that loop is the whole idea.', ['model'], frame(null, obs('all tests pass', 'ok'), { boxes: [Object.assign({}, goal, { c: 'ok', sub: 'done' })] })));
  s.push(aiStep('A workflow follows fixed steps written in code. An agent chooses its own next step. Start with the simpler one.', [], frame()));
  const apps = ['chat app', 'code editor', 'notes app'].map((l, i) => ({ id: 'ap' + i, x: 60, y: 110 + i * 120, w: 180, h: 60, label: l, c: 'b' }));
  const tls = ['files', 'calendar', 'database'].map((l, i) => ({ id: 'tl' + i, x: 720, y: 110 + i * 120, w: 180, h: 60, label: l, c: 'a' }));
  const wires = []; apps.forEach((a, i) => tls.forEach((t, j) => wires.push({ id: 'wr' + i + j, from: a.id, to: t.id, c: 'm', w: 1.5 })));
  s.push(aiStep('Without a shared standard, every app needs custom glue for every tool: 3 apps × 3 tools = 9 connectors.', [], { boxes: apps.concat(tls), arrows: wires, labels: [{ id: 'nm', x: 480, y: 500, text: 'N × M connectors', c: 't', size: 16, weight: 700, anchor: 'middle' }] }));
  const hub = { id: 'hub', x: 400, y: 200, w: 160, h: 90, label: 'MCP', sub: 'one shared protocol', c: 'a', solid: true };
  const hubW = apps.map((a) => ({ id: 'hw' + a.id, from: a.id, to: 'hub', c: 'b' })).concat(tls.map((t) => ({ id: 'hw' + t.id, from: 'hub', to: t.id, c: 'a' })));
  s.push(aiStep('MCP, the Model Context Protocol, is one open standard. Each app and each tool speaks it once: N + M.', ['hub'], { boxes: apps.concat(tls, [hub]), arrows: hubW, labels: [{ id: 'nm', x: 480, y: 500, text: 'N + M connectors', c: 't', size: 16, weight: 700, anchor: 'middle' }] }));
  s.push(aiStep('Care is needed: tool results can carry hidden instructions, so agents need tight permissions and human checks.', ['obs'], frame('tRead', obs('“ignore your goal and…”', 'bad'), back('tRead'))));
  return s;
}

// ---------- AI now 6: mixture of experts ----------
function aiMoe(p) {
  const k = Math.max(1, Math.min(4, Math.round(p)));
  const words = ['The', 'cat', 'ate', 'fish'];
  const logits = [[0.2, 1.6, 0.1, 0.9, 0.3, 0.4, 1.1, 0.2], [2.1, 0.3, 1.4, 0.2, 0.6, 0.1, 0.5, 1.0], [0.4, 0.2, 0.6, 2.2, 1.5, 0.3, 0.2, 0.9], [1.8, 0.5, 0.3, 0.4, 0.2, 1.3, 0.9, 0.1]];
  const probs = logits.map((l) => aiSoftmax(l, 1));
  const pick = (ti) => probs[ti].map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]).slice(0, k).map((x) => x[1]);
  const tok = (hl) => ({ tokens: words.map((w, i) => ({ id: 'tk' + i, x: 80, y: 130 + i * 90, text: w, c: hl === i ? 'a' : 'l' })) });
  const router = { id: 'router', x: 220, y: 230, w: 130, h: 80, label: 'router', sub: 'scores experts', c: 't' };
  const comb = { id: 'comb', x: 800, y: 230, w: 130, h: 80, label: 'mix', sub: 'weighted sum', c: 't' };
  const expert = (i, on, sub) => ({ id: 'e' + i, x: 440 + (i % 2) * 170, y: 40 + Math.floor(i / 2) * 120, w: 150, h: 70, label: 'expert ' + (i + 1), sub: sub || '', c: on ? 'a' : 'l', op: on === false ? 0.5 : 1 });
  const experts = (ti, showScores, counts) => ({ boxes: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const on = ti === null || ti === undefined ? null : pick(ti).indexOf(i) >= 0;
    const sub = counts ? counts[i] + ' token' + (counts[i] === 1 ? '' : 's') : showScores ? Math.round(probs[ti][i] * 100) + '%' : '';
    return expert(i, on, sub);
  }) });
  const route = (ti) => ({ arrows: [{ id: 'tr', from: 'tk' + ti, to: 'router', c: 'a' }].concat(pick(ti).map((i) => ({ id: 're' + i, from: 'router', to: 'e' + i, c: 'a', w: 2 + probs[ti][i] * 6 }))) });
  const out = (ti) => ({ arrows: pick(ti).map((i) => ({ id: 'ec' + i, from: 'e' + i, to: 'comb', c: 'b', w: 2 })) });
  const counts = [0, 0, 0, 0, 0, 0, 0, 0]; [0, 1, 2, 3].forEach((ti) => pick(ti).forEach((i) => { counts[i]++; }));
  const big = { id: 'ffn', x: 440, y: 120, w: 320, h: 300, label: 'one big feed-forward block', sub: 'every weight used for every token', c: 'b' };
  const counter = { labels: [{ id: 'cnt', x: 480, y: 525, text: 'stored: 8 experts · used per token: ' + k, c: 't', size: 16, weight: 700, anchor: 'middle', mono: true }] };
  const top = pick(1).map((i) => 'expert ' + (i + 1)).join(' and ');
  const s = [];
  s.push(aiStep('In a normal transformer layer, every token passes through the same big feed-forward block.', ['ffn'], aiScene(tok(), { boxes: [big], arrows: words.map((w, i) => ({ id: 'fa' + i, from: 'tk' + i, to: 'ffn', c: 'm' })) })));
  s.push(aiStep('A mixture of experts splits that block into 8 smaller experts. A router sits in front of them.', ['router'], aiScene(tok(), { boxes: [router, comb] }, experts())));
  s.push(aiStep('The router looks at a token, here “cat”, and gives every expert a score.', ['router', 'tk1'], aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), { arrows: [{ id: 'tr', from: 'tk1', to: 'router', c: 'a' }] })));
  s.push(aiStep('Only the top ' + k + ' run for “cat”: ' + top + '. The other experts stay idle.', pick(1).map((i) => 'e' + i), aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), route(1))));
  s.push(aiStep('Their outputs are mixed, weighted by the router’s scores, and the token moves on.', ['comb'], aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), route(1), out(1))));
  s.push(aiStep('Next token, “ate”: the router picks a different set of experts.', pick(2).map((i) => 'e' + i), aiScene(tok(2), { boxes: [router, comb] }, experts(2, true), route(2), out(2))));
  s.push(aiStep('Over a sentence, each expert handles some tokens and skips others.', [], aiScene(tok(), { boxes: [router, comb] }, experts(null, false, counts))));
  s.push(aiStep('Stored: 8 experts. Used per token: ' + k + '. The model holds a lot of knowledge but runs only a slice of it.', ['cnt'], aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), route(1), out(1), counter)));
  s.push(aiStep('If the router keeps sending tokens to one favourite expert, training adds a balancing nudge to spread the load.', [], aiScene(tok(), { boxes: [router, comb] }, experts(null, false, counts))));
  s.push(aiStep('The catch: all 8 experts must sit in memory, even though only a few run for each token.', [], aiScene(tok(), { boxes: [router, comb] }, experts(), counter)));
  s.push(aiStep('Mixtral is a well-known open example: 8 experts per layer, with 2 picked for each token.', [], aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), route(1), out(1), counter)));
  s.push(aiStep('Try the slider: more experts per token means more compute but a richer mix for each token.', ['cnt'], aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), route(1), out(1), counter)));
  return s;
}

// ---------- AI now 7: fine-tuning with LoRA ----------
function aiLora(p) {
  const r = Math.max(1, Math.min(16, Math.round(p)));
  const d = 4096; const full = d * d; const lora = 2 * d * r;
  const fmtN = (n) => n.toLocaleString('en-US');
  const Wm = { id: 'W', x: 60, y: 130, w: 240, h: 240, label: 'W', sub: '4096 × 4096 weights', c: 'b' };
  const cellsW = (lit) => { const out = []; for (let i = 0; i < 64; i++) out.push({ id: 'wc' + i, x: 70 + (i % 8) * 28, y: 140 + Math.floor(i / 8) * 28, w: 24, h: 24, c: lit ? 'c' : 'b', op: lit ? 0.6 : 0.18, rx: 2 }); return { bars: out }; };
  const thick = Math.max(6, r * 6);
  const A = { id: 'A', x: 370, y: 130, w: thick, h: 240, label: '', c: 'a', solid: true, rx: 4 };
  const B = { id: 'B', x: 370 + thick + 24, y: 130, w: 200, h: thick, label: '', c: 'a', solid: true, rx: 4 };
  const dW = { id: 'dW', x: 700, y: 130, w: 240, h: 240, label: 'B × A', sub: 'a full-size update', c: 'a', dash: true };
  const labs = { labels: [{ id: 'aT', x: 370, y: 392, text: 'A: 4096 × r', c: 'a', size: 13 }, { id: 'bT', x: 370 + thick + 24, y: 130 + thick + 22, text: 'B: r × 4096', c: 'a', size: 13 }] };
  const count = (n, c) => ({ labels: [{ id: 'cnt', x: 480, y: 470, text: 'trainable: ' + fmtN(n) + ' weights per matrix', c: c || 't', size: 18, weight: 700, anchor: 'middle', mono: true }, { id: 'cnt2', x: 480, y: 500, text: 'full matrix: ' + fmtN(full), c: 'm', size: 13, anchor: 'middle', mono: true }] });
  const lock = { labels: [{ id: 'lock', x: 180, y: 400, text: 'frozen: never changes', c: 'm', size: 13, anchor: 'middle' }] };
  const lowR = aiScene({ boxes: [Wm] }, cellsW(false), lock, { boxes: [A, B] }, labs);
  const s = [];
  s.push(aiStep('Fine-tuning adapts a trained model to a new job, like answering in your company’s style.', ['W'], aiScene({ boxes: [Wm] }, cellsW(false))));
  s.push(aiStep('Full fine-tuning changes every weight. One layer matrix alone holds 16.8 million of them.', ['W'], aiScene({ boxes: [Wm] }, cellsW(true), count(full, 'c'))));
  s.push(aiStep('LoRA freezes the original weights instead. W never changes during training.', ['W'], aiScene({ boxes: [Wm] }, cellsW(false), lock)));
  s.push(aiStep('Then it adds two thin matrices beside W: A, tall and thin, and B, short and wide.', ['A', 'B'], lowR));
  s.push(aiStep('Multiply B × A and you get an update the same size as W, built from far fewer numbers.', ['dW'], aiScene(lowR, { boxes: [dW], arrows: [{ id: 'ab', from: 'B', to: 'dW', c: 'a' }] })));
  s.push(aiStep('The layer’s output becomes W·x + B·A·x: the old answer plus a small learned correction.', ['dW', 'W'], aiScene(lowR, { boxes: [dW], labels: [{ id: 'eq', x: 480, y: 440, text: 'output = W·x + B·A·x', c: 't', size: 18, weight: 700, anchor: 'middle', mono: true }] })));
  s.push(aiStep('Only A and B are trained. With rank r = ' + r + ', that is ' + fmtN(lora) + ' weights instead of ' + fmtN(full) + '.', ['cnt'], aiScene(lowR, { boxes: [dW] }, count(lora, 'a'))));
  s.push(aiStep('The rank r is the knob: the thickness of A and B. Bigger r can learn more but costs more. Try the slider.', ['A', 'B'], aiScene(lowR, { boxes: [dW] }, count(lora, 'a'))));
  const notes = ['support', 'legal', 'code'].map((l, i) => ({ id: 'ad' + i, x: 370 + i * 190, y: 200, w: 150, h: 70, label: l + ' adapter', sub: 'few MB', c: i === 0 ? 'a' : 'l' }));
  s.push(aiStep('Adapters are tiny files, so one base model can carry many of them and swap per task.', ['ad0', 'ad1', 'ad2'], aiScene({ boxes: [Wm] }, cellsW(false), lock, { boxes: notes })));
  const q4 = []; for (let i = 0; i < 16; i++) q4.push({ id: 'wc' + i, x: 70 + (i % 4) * 56, y: 140 + Math.floor(i / 4) * 56, w: 52, h: 52, c: 'b', op: 0.3, rx: 2 });
  s.push(aiStep('QLoRA goes further: it squeezes the frozen base to 4-bit numbers so it fits on one GPU, and trains adapters on top.', ['W'], aiScene({ boxes: [Object.assign({}, Wm, { sub: 'stored in 4 bits' })] }, { bars: q4 }, { boxes: [A, B] }, labs)));
  s.push(aiStep('After training, B × A can be added into W once, so the tuned model runs as fast as the original.', ['W'], aiScene({ boxes: [Object.assign({}, Wm, { label: 'W + B·A', sub: 'merged' })] }, cellsW(false), { arrows: [{ id: 'merge', from: { x: 700, y: 250 }, to: 'W', c: 'a', label: 'merge' }] })));
  s.push(aiStep('LoRA: freeze the giant, train a small patch. That is how most people fine-tune large models today.', ['A', 'B'], aiScene(lowR, { boxes: [dW] }, count(lora, 'a'))));
  return s;
}

const AI_LESSONS = [
  { id: 'gradient', track: 'ml', title: 'Fit a line by gradient descent', tag: 'linear regression', minutes: 4, make: aiGradient,
    idea: 'Learning is lowering one number, the loss, by taking small steps downhill.',
    param: { label: 'Learning rate', min: 0.002, max: 0.04, step: 0.002, value: 0.01, digits: 3, hint: 'The size of each step. The line settles, crawls, zigzags or blows up.' } },
  { id: 'knn', track: 'ml', title: 'k-nearest neighbours', tag: 'classification by vote', minutes: 3, make: aiKnn,
    idea: 'Label something new by letting its closest known examples vote.',
    param: { label: 'k, neighbours who vote', min: 1, max: 9, step: 2, value: 3, digits: 0, hint: 'k = 1 trusts one neighbour. Bigger k smooths out odd examples.' } },
  { id: 'tree', track: 'ml', title: 'Decision tree splits', tag: 'questions that sort', minutes: 3, make: aiTree,
    idea: 'A tree asks the yes-or-no question that best purifies the groups, then repeats.' },
  { id: 'overfit', track: 'ml', title: 'Train, test and overfitting', tag: 'generalisation', minutes: 4, make: aiOverfit,
    idea: 'A model that memorises its training data fails on new data. Always test on data it never saw.',
    param: { label: 'Curve degree', min: 1, max: 9, step: 1, value: 3, digits: 0, hint: 'How many bends the curve may make. Watch the test error.' } },
  { id: 'backprop', track: 'ml', title: 'A neuron and backprop', tag: 'tiny neural net', minutes: 5, make: aiBackprop,
    idea: 'Backprop runs the chain rule backward to find how much each weight caused the error.',
    credit: { text: 'The step-by-step idea follows micrograd by Andrej Karpathy (MIT licence). Our numbers and code.', link: 'https://github.com/karpathy/micrograd' },
    param: { label: 'Learning rate', min: 0.1, max: 1.5, step: 0.1, value: 0.5, digits: 2, hint: 'How far each weight moves against its gradient.' } },
  { id: 'embeddings', track: 'ml', title: 'Embeddings and cosine similarity', tag: 'meaning as direction', minutes: 3, make: aiEmbed,
    idea: 'Words become arrows of numbers. Similar meanings point the same way.' },
  { id: 'attention', track: 'now', title: 'Attention in a transformer', tag: 'tokens looking at tokens', minutes: 4, make: aiAttention,
    idea: 'Each token scores every other token, then mixes in the ones that match.',
    param: { label: 'Temperature', min: 0.3, max: 3, step: 0.1, value: 1, digits: 1, hint: 'Scores are divided by this before softmax. Low is sharp, high is flat.' },
    sources: [
      { title: 'Attention Is All You Need', org: 'Vaswani et al., Google', date: '2017-06-12', link: 'https://arxiv.org/abs/1706.03762' },
      { title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness', org: 'Dao, Fu, Ermon, Rudra et al.', date: '2022-05-27', link: 'https://arxiv.org/abs/2205.14135' },
      { title: 'Lost in the Middle: How Language Models Use Long Contexts', org: 'Liu, Lin, Hewitt, Paranjape et al.', date: '2023-07-06', link: 'https://arxiv.org/abs/2307.03172' }
    ] },
  { id: 'systems', track: 'now', title: 'System 1 and System 2 thinking', tag: 'reasoning models', minutes: 4, make: aiSystems,
    idea: 'Reasoning models spend extra compute at answer time, writing steps before they reply.',
    param: { label: 'Thinking budget (steps)', min: 1, max: 6, step: 1, value: 6, digits: 0, hint: 'How many written steps the slow lane may take before it must answer.' },
    sources: [
      { title: 'From System 1 to System 2: A Survey of Reasoning Large Language Models', org: 'Li, Zhang, Zhang, Zhang et al.', date: '2025-02-24', link: 'https://arxiv.org/abs/2502.17419' },
      { title: 'Distilling System 2 into System 1', org: 'Yu, Xu, Weston, Kulikov', date: '2024-07-08', link: 'https://arxiv.org/abs/2407.06023' },
      { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models', org: 'Wei et al.', date: '2022-01-28', link: 'https://arxiv.org/abs/2201.11903' },
      { title: 'Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters', org: 'Snell, Lee, Xu, Kumar', date: '2024-08-06', link: 'https://arxiv.org/abs/2408.03314' },
      { title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning', org: 'DeepSeek-AI', date: '2025-01-22', link: 'https://arxiv.org/abs/2501.12948' }
    ] },
  { id: 'jepa', track: 'now', title: 'JEPA: predict meaning, not pixels', tag: 'world models', minutes: 4, make: aiJepa,
    idea: 'Instead of painting missing pixels, predict the hidden part’s embedding.',
    sources: [
      { title: 'Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture (I-JEPA)', org: 'Assran, Duval, Misra, Bojanowski et al.', date: '2023-01-19', link: 'https://arxiv.org/abs/2301.08243' },
      { title: 'I-JEPA: The first AI model based on Yann LeCun’s vision for more human-like AI', org: 'Meta AI', date: '2023-06-13', link: 'https://ai.meta.com/blog/yann-lecun-ai-model-i-jepa/' },
      { title: 'Revisiting Feature Prediction for Learning Visual Representations from Video (V-JEPA)', org: 'Bardes, Garrido, Ponce, Chen et al.', date: '2024-04', link: 'https://arxiv.org/abs/2404.08471' },
      { title: 'V-JEPA: The next step toward advanced machine intelligence', org: 'Meta AI', date: '2024-02-15', link: 'https://ai.meta.com/blog/v-jepa-yann-lecun-ai-model-video-joint-embedding-predictive-architecture/' },
      { title: 'V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning', org: 'Assran, Bardes, Fan, Garrido et al.', date: '2025-06-11', link: 'https://arxiv.org/abs/2506.09985' },
      { title: 'Introducing the V-JEPA 2 world model and new benchmarks for physical reasoning', org: 'Meta AI', date: '2025-06-11', link: 'https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/' }
    ] },
  { id: 'rag', track: 'now', title: 'RAG: retrieve, then generate', tag: 'grounded answers', minutes: 3, make: aiRag,
    idea: 'Look up the right passages first, then let the model answer from them.',
    sources: [
      { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', org: 'Lewis, Perez, Piktus, Petroni et al.', date: '2020-05-22', link: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection', org: 'Asai, Wu, Wang, Sil et al.', date: '2023-10-17', link: 'https://arxiv.org/abs/2310.11511' },
      { title: 'Contextual retrieval in AI systems', org: 'Anthropic', date: '2024-09-19', link: 'https://www.anthropic.com/research/contextual-retrieval' },
      { title: 'Lost in the Middle: How Language Models Use Long Contexts', org: 'Liu, Lin, Hewitt, Paranjape et al.', date: '2023-07-06', link: 'https://arxiv.org/abs/2307.03172' }
    ] },
  { id: 'agents', track: 'now', title: 'Agents, tools and MCP', tag: 'the agent loop', minutes: 4, make: aiAgents,
    idea: 'An agent thinks, calls a tool, reads the result, and repeats until the goal is met.',
    sources: [
      { title: 'ReAct: Synergizing Reasoning and Acting in Language Models', org: 'Yao, Zhao, Yu, Du et al.', date: '2022-10-06', link: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Toolformer: Language Models Can Teach Themselves to Use Tools', org: 'Schick, Dwivedi-Yu, Dessi et al.', date: '2023-02-09', link: 'https://arxiv.org/abs/2302.04761' },
      { title: 'Introducing the Model Context Protocol', org: 'Anthropic', date: '2024-11-25', link: 'https://www.anthropic.com/news/model-context-protocol' },
      { title: 'Building effective AI agents', org: 'Anthropic', date: '2024-12-19', link: 'https://www.anthropic.com/research/building-effective-agents' },
      { title: 'Specification: Model Context Protocol (version 2026-07-28)', org: 'modelcontextprotocol.io', date: '2026-07-28', link: 'https://modelcontextprotocol.io/specification/2026-07-28' },
      { title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues?', org: 'Jimenez, Yang, Wettig, Yao et al.', date: '2023-10-10', link: 'https://arxiv.org/abs/2310.06770' }
    ] },
  { id: 'moe', track: 'now', title: 'Mixture of experts', tag: 'a router picks experts', minutes: 3, make: aiMoe,
    idea: 'Many experts are stored, but a router runs only a few of them for each token.',
    param: { label: 'Experts per token', min: 1, max: 4, step: 1, value: 2, digits: 0, hint: 'How many experts the router runs for each token.' },
    sources: [
      { title: 'Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer', org: 'Shazeer, Mirhoseini, Maziarz, Davis et al.', date: '2017-01-23', link: 'https://arxiv.org/abs/1701.06538' },
      { title: 'Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity', org: 'Fedus, Zoph, Shazeer', date: '2021-01-11', link: 'https://arxiv.org/abs/2101.03961' },
      { title: 'Mixtral of Experts', org: 'Jiang, Sablayrolles, Roux, Mensch et al.', date: '2024-01-08', link: 'https://arxiv.org/abs/2401.04088' },
      { title: 'DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models', org: 'Dai, Deng, Zhao, Xu et al.', date: '2024-01-11', link: 'https://arxiv.org/abs/2401.06066' },
      { title: 'Mixture of Experts Explained', org: 'Hugging Face', date: '2023-12-11', link: 'https://huggingface.co/blog/moe' }
    ] },
  { id: 'lora', track: 'now', title: 'Fine-tuning with LoRA', tag: 'small adapters', minutes: 3, make: aiLora,
    idea: 'Freeze the big model and train two thin matrices whose product is the update.',
    param: { label: 'Rank r', min: 1, max: 16, step: 1, value: 4, digits: 0, hint: 'The thickness of the adapter matrices, and so the number of trainable weights.' },
    sources: [
      { title: 'LoRA: Low-Rank Adaptation of Large Language Models', org: 'Hu, Shen, Wallis, Allen-Zhu et al.', date: '2021-06-17', link: 'https://arxiv.org/abs/2106.09685' },
      { title: 'QLoRA: Efficient Finetuning of Quantized LLMs', org: 'Dettmers, Pagnoni, Holtzman, Zettlemoyer', date: '2023-05-23', link: 'https://arxiv.org/abs/2305.14314' },
      { title: 'PEFT: Parameter-Efficient Fine-Tuning of Billion-Scale Models on Low-Resource Hardware', org: 'Hugging Face', date: '2023-02-10', link: 'https://huggingface.co/blog/peft' },
      { title: 'Making LLMs even more accessible with bitsandbytes, 4-bit quantization and QLoRA', org: 'Hugging Face', date: '2023-05-24', link: 'https://huggingface.co/blog/4bit-transformers-bitsandbytes' }
    ] }
];
const AI_STEP_CACHE = {};
function aiSteps(i, p) {
  const L = AI_LESSONS[i];
  const v = L.param ? (p === undefined || p === null ? L.param.value : p) : 0;
  const key = i + ':' + v;
  return AI_STEP_CACHE[key] || (AI_STEP_CACHE[key] = L.make(v));
}
