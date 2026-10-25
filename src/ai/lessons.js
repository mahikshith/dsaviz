// AI & ML lessons. Each lesson: id, track ('ml' or 'now'), title, tag, minutes, idea (one line),
// optional param (the one slider that matters), sources (AI-now lessons, facts only), and
// make(p) -> steps. A step is { say, focus: [ids], scene }. Scenes use the vocabulary in render.js:
// axes, regions, paths, rings, edges, links, arrows, bars, boxes, nodes, points, tokens, labels.
// The canvas is 960 x 540. All explanations are our own words.
const AI_TRACKS = [
  { id: 'ml', title: 'ML & data science foundations', short: 'ML foundations', blurb: 'How computers learn from examples: fit lines, vote, split, group, shrink data, and check the score honestly.' },
  { id: 'now', title: 'AI now', short: 'AI now', blurb: 'The ideas behind today’s AI: how text is read, how models pay attention, think, use tools, draw images and get tested.' }
];
// Planned next, from the research curriculum. Shown on the hub as "next up", not as lessons.
const AI_NEXT = {
  ml: ['Random forests', 'pandas and SQL: group by and joins', 'Optimizers: momentum and Adam'],
  now: ['Long context and “lost in the middle”', 'Multimodal models', 'Small and on-device models', 'Reasoning with verifiable rewards']
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
  s.push(aiStep('Each dot is a flat: its size runs along the bottom, its rent up the side. We want one straight line that fits them.', pts.map((q) => q.id), aiScene({ axes, points: pts })));
  s.push(aiStep('The line is rent = w × size + b: w tilts it and b lifts it. We guess w = 0 and b = 0.5, a flat line.', ['fit'], aiScene({ axes, points: pts, paths: [line(0, 0.5)] })));
  s.push(aiStep('Each dashed gap is an error. Multiply each gap by itself, then average them: that number is the loss.', resid(0, 0.5).map((r) => r.id), aiScene({ axes, points: pts, paths: [line(0, 0.5)].concat(resid(0, 0.5)) })));
  s.push(aiStep('The loss starts at ' + lossTxt + '. Learning means changing w and b to make the loss small.', ['ro3'], at(0)));
  s.push(aiStep('The gradient points to where the loss grows fastest, which is uphill. We step the opposite way and nudge the line.', ['push'], at(0, { arrows: [{ id: 'push', from: { x: sx(7), y: sy(0.5) - 8 }, to: { x: sx(7), y: sy(5.2) }, c: 'a', w: 3, label: 'downhill', lx: 44 }] })));
  const cap = {
    1: blew ? 'One step, and the line swings past the dots. This step size is too big.' : zig ? 'One big step: the line jumps up past the dots. Big steps zigzag.' : slow ? 'One tiny step: the line barely moves. The loss dips a little.' : 'After one step the line tilts up and the loss drops.',
    2: blew ? 'It swings back even further. Each correction overshoots more.' : zig ? 'It swings back below. Each swing is a little smaller.' : slow ? 'Two steps. Still creeping, because each step is the learning rate times the gradient.' : 'Two steps. Step size is the learning rate times the gradient, so a steep slope means a big step.',
    4: blew ? 'Four steps. The loss is climbing instead of falling.' : zig ? 'Four steps. The zigzag settles toward the dots.' : slow ? 'Four steps. Tiny steps are safe but slow.' : 'Four steps. The biggest errors shrink first.',
    8: blew ? 'Eight steps, and the line flies off the chart. The loss explodes.' : slow ? 'Eight steps. The loss curve falls gently.' : 'Eight steps. The line hugs the dots and the loss curve flattens.',
    20: blew ? 'The loss keeps growing. This is called divergence: the learning rate is too big for this data.' : 'Twenty steps. The changes are small now because the slope of the loss is nearly flat.',
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
  s.push(aiStep('A new movie arrives, shown as the ring. This method, k-nearest neighbours, lets the closest movies vote.', ['q'], base()));
  s.push(aiStep('First, measure the distance from the new movie to every movie you have rated.', [], aiScene(base(), { paths: lines(all.length) })));
  s.push(aiStep('Sort by distance. The very closest is one you skipped, an odd one out among movies you liked.', [sorted[0].id], aiScene(base(), { paths: lines(all.length).map((l, i) => (i === 0 ? Object.assign({}, l, { c: 't', w: 3, dash: false }) : Object.assign({}, l, { op: 0.35 }))) })));
  s.push(aiStep('k is how many neighbours get a vote. With k = 1, only that closest movie counts.', ['kr'], aiScene(base(ids(1)), { paths: lines(1, 't'), rings: [ring(1)] })));
  s.push(aiStep('One vote, and it says skip. With k = 1, a single odd movie decided everything.', ['q', 'vB'], aiScene(base(ids(1), 'b'), { paths: lines(1, 't'), rings: [ring(1)] }, bars(v1, 1))));
  s.push(aiStep('Now use your slider value, k = ' + k + '. The circle grows until it holds ' + k + ' neighbour' + (k > 1 ? 's' : '') + '.', ['kr'], aiScene(base(ids(k)), { paths: lines(k, 't'), rings: [ring(k)] })));
  s.push(aiStep('Count the votes inside the circle: ' + vk.a + ' liked, ' + vk.b + ' skipped.', ['vA', 'vB'], aiScene(base(ids(k)), { paths: lines(k, 't'), rings: [ring(k)] }, bars(vk, k))));
  s.push(aiStep('The majority wins: ' + winTxt + '.', ['q'], aiScene(base(ids(k), win), { rings: [ring(k)] }, bars(vk, k))));
  s.push(aiStep('A small k chases odd dots, and a large k blurs real edges. Pick an odd k to avoid ties; try the slider.', ['kr'], aiScene(base(ids(k), win), { rings: [ring(k)] }, bars(vk, k))));
  s.push(aiStep('There is no training step. It keeps every example and does all its work when a question arrives.', [], aiScene(base(ids(k), win), bars(vk, k))));
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
  s.push(aiStep('Each dot is a day: Sam either played tennis or stayed in. Across is heat and up is wind.', [], base));
  s.push(aiStep('A decision tree asks yes-or-no questions, one at a time. It wants groups where every day is the same.', [], base));
  s.push(aiStep('It tries every possible cut and keeps the best. First question: is the wind above 5?', ['cut1', 'root'], t1));
  s.push(aiStep('Above the line, Sam stayed in every day. That group is pure, so it becomes a leaf, an end point: stay in.', ['leafNo'], t2));
  s.push(aiStep('Below the line it is mixed: on three very hot days Sam stayed in too.', ['b6', 'b7', 'b8'], t2));
  s.push(aiStep('So ask a second question, only on the calm side: is the heat above 8?', ['cut2', 'node2'], t3));
  s.push(aiStep('Hot and calm: stay in. Mild and calm: play, so every group is pure now.', ['leafHot', 'leafYes'], t4));
  s.push(aiStep('A new day arrives: heat 4, wind 2.5. Walk down the tree from the top to decide what Sam does.', ['q'], aiScene(t4, { points: [qd] })));
  s.push(aiStep('Wind above 5 is no, and heat above 8 is no. So the leaf says play.', ['root', 'node2', 'leafYes'], aiScene(t4, { points: [Object.assign({}, qd, { c: 'a', hollow: false })], arrows: [hot(a2), hot(a4)] })));
  s.push(aiStep('A cut is chosen by how much purer it makes the groups. Gini impurity and entropy are two ways to score that.', ['cut1', 'cut2'], t4));
  s.push(aiStep('Keep splitting and every day gets its own tiny box. The tree has memorised random quirks, not the pattern.', tiny.map((r) => r.id), aiScene(t4, { regions: tiny })));
  s.push(aiStep('So we stop early. A limit on depth or group size keeps the tree simple.', ['root'], t4));
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
  s.push(aiStep('Here are sixteen measurements of a wavy pattern. Each has a little random error mixed in.', [], aiScene({ axes, points: train('m').concat(test('m')) })));
  s.push(aiStep('Hide six of them. The model learns from the filled dots and never sees the rings, which are the test set.', D.vx.map((x, i) => 'te' + i), aiScene({ axes, points: train().concat(test('b', true)) })));
  s.push(aiStep('Fit a line to the filled dots. Degree 1 means no bends, so it cannot follow the wave.', ['fitC'], aiScene({ axes, points: train().concat(test('b', true)) }, { paths: [curve(1)] })));
  s.push(aiStep('Error is how far the dots sit from the curve. Both errors are high, so the model is too simple: underfitting.', ['bTr', 'bTe'], view(1)));
  s.push(aiStep('Degree 3 can bend twice. Now the curve follows the wave.', ['fitC'], view(3)));
  s.push(aiStep('Both errors drop. Even the hidden test dots sit close to the curve.', ['bTr', 'bTe'], view(3)));
  s.push(aiStep('Degree 9 can bend eight times, so it passes through every training dot. Train error is almost zero.', ['fitC', 'bTr'], view(9)));
  s.push(aiStep('Between the dots it swings wildly, so the test dots are far off. That is overfitting: it memorised the training dots.', ['bTe'].concat(D.vx.map((x, i) => 'te' + i)), view(9)));
  s.push(aiStep('Now plot both errors as the curve gets more bendy. Train error keeps falling, but test error falls and then climbs.', ['chtr', 'chte'], view(9, true)));
  s.push(aiStep('The best model is where test error is lowest, here degree ' + ch.best + ', not where train error is lowest.', ['chBest'], view(ch.best, true)));
  s.push(aiStep('Your pick is degree ' + deg + ', with train error ' + fmt(D.err[deg].tr) + ' and test error ' + fmt(D.err[deg].te) + '. Move the slider and watch the test bar.', ['bTe'], view(deg, true)));
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
  s.push(aiStep('A neuron multiplies each input by a weight, a number for how much it matters. Then it adds the results and a bias, an extra nudge.', ['h1'], aiScene({ nodes: [node('x1', '1.0', 'input'), node('x2', '0.5', 'input'), node('h1', 'Σ', 'neuron')], edges: edges(W0, null, ['w11', 'w12']) })));
  s.push(aiStep('Next it squashes the total with tanh. Big totals flatten out near 1 or −1, and small ones barely change.', ['tanh'], aiScene({ nodes: [node('x1', '1.0', 'input'), node('x2', '0.5', 'input'), node('h1', 'Σ', 'neuron')], edges: edges(W0, null, ['w11', 'w12']) }, tanhInset())));
  s.push(aiStep('Two neurons feed one output: a tiny network with six weights. Thick lines are big weights.', ['w11', 'w12', 'w21', 'w22', 'v1', 'v2'], aiScene({ nodes: [node('x1', '1.0', 'input'), node('x2', '0.5', 'input'), node('h1', '', 'h1'), node('h2', '', 'h2'), node('y', '', 'output')], edges: edges(W0) })));
  s.push(aiStep('In the forward pass, the inputs 1.0 and 0.5 flow left to right. Each circle now shows its value.', ['h1', 'h2', 'y'], fwd(W0, f0)));
  s.push(aiStep('The output is ' + aiFmt(f0.y) + ', but the target is 1.00. The loss, how wrong we are, is (output − target) squared = ' + aiFmt(f0.L) + '.', ['loss'], fwd(W0, f0)));
  s.push(aiStep('Backward pass: for each number, ask how much the loss changes if it grows a little. At the output, that answer (the gradient) is ' + aiFmt(f0.g.y) + '.', ['y'], fwd(W0, f0, { gy: true })));
  s.push(aiStep('Each last weight gets blame for what flowed through it. Its gradient is ' + aiFmt(f0.g.y) + ' × h, where h is that neuron’s value.', ['v1', 'v2'], fwd(W0, f0, { gy: true, lab: gradLab(f0, ['v1', 'v2']) })));
  s.push(aiStep('Blame flows back into each hidden neuron through its weight. This hand-off of blame is called the chain rule.', ['h1', 'h2'], fwd(W0, f0, { gy: true, g: true, lab: gradLab(f0, ['v1', 'v2']) })));
  s.push(aiStep('Going back through tanh shrinks the blame by a known factor. Then the first four weights get their share.', ['w11', 'w12', 'w21', 'w22'], fwd(W0, f0, { gy: true, g: true, lab: gradLab(f0, ['v1', 'v2', 'w11', 'w12', 'w21', 'w22']) })));
  s.push(aiStep('Update: each weight takes a step against its gradient. The learning rate, ' + lr.toFixed(2) + ', sets how big the step is.', ['w11', 'w12', 'w21', 'w22', 'v1', 'v2'], aiScene({ nodes: [node('x1', '1.0', 'input'), node('x2', '0.5', 'input'), node('h1', '', 'h1'), node('h2', '', 'h2'), node('y', '', 'output')], edges: edges(W1), boxes: [lossBox(f0.L, { label: 'loss ?' })], arrows: [arrowL] })));
  s.push(aiStep('Forward again with the new weights: output ' + aiFmt(f1.y) + ', loss ' + aiFmt(f1.L) + (f1.L < f0.L ? '. Lower.' : '. Higher: that step was too big.'), ['loss'], fwd(W1, f1)));
  s.push(aiStep('Repeat 30 times and the output reaches ' + aiFmt(f30.y) + ', loss ' + aiFmt(f30.L) + '. Try a different learning rate.', ['y', 'loss'], fwd(W, f30)));
  s.push(aiStep('This loop is called backpropagation: guess forward, share blame backward, then nudge the weights. Big networks repeat it billions of times.', [], fwd(W, f30)));
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
  s.push(aiStep('A computer cannot compare words directly. So each word becomes a list of numbers, called an embedding.', ['tk0', 'tk1', 'tk2'], { tokens: row }));
  s.push(aiStep('With two numbers, a word is an arrow on a map. Real models use hundreds of numbers, but the idea is the same.', [], map()));
  s.push(aiStep('Training places words used in similar ways near each other. Animals point one way, vehicles another.', [], map(null, true)));
  s.push(aiStep('To compare two words, look at the angle between their arrows, not where the tips land.', ['v_cat', 'v_kitten'], aiScene(map(['cat', 'kitten']), { paths: [arc('cat', 'kitten', 'arc')] })));
  s.push(aiStep('Cat and kitten make a small angle. Their cosine similarity, which scores how alike they point, is ' + aiFmt(cos('cat', 'kitten')) + '.', ['arc'], aiScene(map(['cat', 'kitten']), { paths: [arc('cat', 'kitten', 'arc')] })));
  s.push(aiStep('Cat and truck make a wide angle. Their cosine score is ' + aiFmt(cos('cat', 'truck')) + ', so they have little in common.', ['arc'], aiScene(map(['cat', 'truck']), { paths: [arc('cat', 'truck', 'arc')] })));
  s.push(aiStep('The score is 1 for the same direction, 0 for unrelated, and −1 for opposite.', ['scale'], aiScene(map(['cat', 'truck']), { paths: [arc('cat', 'truck', 'arc')], bars: [{ id: 'scale', x: 640, y: 80, w: 280, h: 10, c: 'l', label: '−1          0          1', ly: 112, mono: true }] })));
  s.push(aiStep('Arrow length does not matter. A short arrow and a long one score high if they point the same way.', ['v_kitten', 'v_cat'], map(['cat', 'kitten'])));
  s.push(aiStep('Which words are closest to puppy? Score every word against it and sort the scores.', pc.list.map((it) => 'cb_' + it.w), aiScene(map(['puppy']), pc.scene)));
  s.push(aiStep('Top matches: ' + pc.list[0].w + ', then ' + pc.list[1].w + '. The vehicles come last, and this is how search by meaning works.', ['cb_' + pc.list[0].w, 'cb_' + pc.list[1].w], aiScene(map(['puppy', pc.list[0].w, pc.list[1].w]), pc.scene)));
  s.push(aiStep('The same trick powers recommendations, grouping, and finding the right text for a chatbot to read.', [], aiScene(map(null, true), pc.scene)));
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
  s.push(aiStep('A sentence is cut into tokens, which are small pieces of text. A transformer, the model behind chatbots, reads them all at once.', [], base()));
  s.push(aiStep('Each token starts as an embedding, a list of numbers for its meaning. But “it” alone does not say what it points to.', ['tk7'], base(it())));
  s.push(aiStep('Attention lets “it” look at every other token and decide which ones matter.', ['tk7'], aiScene(base(it()), arcs(flat, 'm', 0.6))));
  s.push(aiStep('“it” asks a question, called a query. Every token holds a key that says what it contains.', ['tk7'], aiScene(keys, qk)));
  s.push(aiStep('Match the query with each key to get one score per token. A high score is a good match, and “cat” scores highest.', ['sb1'], aiScene(keys, qk, scoreBars())));
  s.push(aiStep('Softmax turns the scores into weights: shares that are never negative and add up to 100%.', row.map((k, i) => 'sb' + i), aiScene(keys, wBars())));
  s.push(aiStep('Arrow thickness shows the weights. Most of “it”’s attention goes to “cat”.', ['at1'], aiScene(base(it()), arcs(wts), wBars())));
  s.push(aiStep('“it” then mixes in every token’s information, in proportion to those shares. So its embedding now carries some “cat”.', ['tk7'], aiScene(base((k, i) => (i === Q ? { c: 'a', sub: '≈ cat', solid: true } : {})), arcs(wts), wBars())));
  s.push(aiStep('Temperature ' + T.toFixed(1) + ' divides the scores before softmax. Low values sharpen the focus and high values spread it out; try the slider.', ['at1'], aiScene(base(it()), arcs(wts), wBars())));
  const allLinks = []; [[2, 1], [5, 2], [4, 5], [8, 7], [9, 7], [6, 2], [3, 5]].forEach(([a, b], i) => allLinks.push({ id: 'all' + i, from: 'tk' + a, to: 'tk' + b, w: 0.55, c: 'b' }));
  s.push(aiStep('Every token does this at the same time, so the whole sentence updates in one pass.', [], aiScene(base(), { links: allLinks }, arcs(wts, 'a', 0.6))));
  const head2 = []; for (let i = 0; i < 9; i++) head2.push({ id: 'h2_' + i, from: 'tk' + (i + 1), to: 'tk' + i, w: 0.6, c: 'c', below: true });
  s.push(aiStep('Several heads, which are separate attention workers, run side by side. One links “it” to “cat”; another looks at the previous word.', ['h2_0', 'at1'], aiScene(base(), arcs(wts), { links: head2 }, { labels: [{ id: 'hA', x: 40, y: 120, text: 'head 1', c: 'a', size: 13 }, { id: 'hB', x: 40, y: 400, text: 'head 2', c: 'c', size: 13 }] })));
  s.push(aiStep('Stack dozens of these layers, and each token’s meaning comes from the whole sentence.', [], aiScene(base(), arcs(wts), { links: head2.concat(allLinks) })));
  s.push(aiStep('The cost is that every token looks at every token. Double the length and the work becomes four times bigger.', ['n2'], aiScene(base(), { links: allLinks }, arcs(wts, 'a', 0.5), { labels: [{ id: 'n2', x: 480, y: 440, text: '10 tokens → 100 pairs · 1,000 tokens → 1,000,000 pairs', c: 't', size: 16, weight: 700, anchor: 'middle', mono: true }] })));
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
  s.push(aiStep('Psychologists describe two ways of thinking. System 1 is fast and automatic; System 2 is slow and careful.', ['fast', 'slow'], aiScene(lanes)));
  s.push(aiStep('A model that answers in one go acts like System 1. A reasoning model writes out steps first.', ['slow'], aiScene(lanes, q('question', ''), arrowQ)));
  s.push(aiStep('Easy question: 7 + 5. The fast lane answers 12 at once, and it is right.', ['fa'], aiScene(lanes, q('7 + 5 = ?', 'easy'), arrowQ, { boxes: [ans('fa', 100, '12', true)] })));
  s.push(aiStep('The slow lane also says 12, after writing a step. It is right too, but it used more time.', ['sa'], aiScene(lanes, q('7 + 5 = ?', 'easy'), arrowQ, { boxes: [ans('fa', 100, '12', true), { id: 'w0', x: 330, y: 270, w: 210, h: 54, label: '7 + 5 = 12', c: 'b', mono: true, size: 15 }, ans('sa', 390, '12', true)] })));
  s.push(aiStep('A harder one: a bat and a ball cost 1.10 together, and the bat costs 1.00 more. What does the ball cost?', ['q'], aiScene(lanes, hardQ, arrowQ)));
  s.push(aiStep('The fast lane blurts out 0.10. That is wrong: the bat would cost 1.10 and the total would be 1.20.', ['fa'], aiScene(lanes, hardQ, arrowQ, fastWrong)));
  const stepCap = ['Slow lane, step 1: call the ball x.', 'Step 2: the bat costs 1.00 more, so it is x + 1.00.', 'Step 3: together they cost 1.10, so x + x + 1.00 = 1.10.', 'Step 4: so 2x = 0.10 and x = 0.05. Check: 0.05 + 1.05 = 1.10.'];
  for (let i = 1; i <= 4; i++) {
    const say = i <= budget ? stepCap[i - 1] : i === budget + 1 ? 'Out of budget after ' + budget + ' step' + (budget > 1 ? 's' : '') + '. It must answer now, so it guesses 0.10, which is wrong.' : 'Still out of budget. A bigger thinking budget would let it finish; try the slider.';
    const fin = i === 4 && done ? { boxes: [ans('sa', 390, '0.05', true)] } : i > budget ? { boxes: [ans('sa', 390, '0.10', false)] } : null;
    s.push(aiStep(say, i <= budget ? ['w' + (i - 1)] : ['cut'], aiScene(lanes, hardQ, arrowQ, fastWrong, scratch(i), out(i), fin)));
  }
  const curve = []; for (let i = 0; i <= 40; i++) { const x = i / 40; curve.push([aiR(320 + x * 560), aiR(440 - (1 - Math.exp(-4 * x)) * 300)]); }
  const chart = { paths: [{ id: 'cAx', pts: [[320, 120], [320, 440], [890, 440]], c: 'l', w: 1.5 }, { id: 'curve', pts: curve, c: 'a', w: 3 }], points: [{ id: 'you', x: aiR(320 + (budget / 6) * 560), y: aiR(440 - (1 - Math.exp(-4 * budget / 6)) * 300), c: 'a', r: 8, ring: true, label: 'budget ' + budget, ly: 26, lx: -20 }], labels: [{ id: 'cY', x: 330, y: 112, text: '↑ accuracy on hard problems', c: 'm', size: 13 }, { id: 'cX', x: 890, y: 466, text: 'thinking tokens →', c: 'm', size: 13, anchor: 'end' }, { id: 'cNote', x: 890, y: 500, text: 'illustrative shape, not measured data', c: 'm', size: 12, anchor: 'end' }] };
  s.push(aiStep('Using extra computer power while answering is called test-time compute. Reasoning models are trained to do this.', ['curve'], aiScene(chart, q('budget', 'tokens to think'))));
  s.push(aiStep('More thinking helps on hard problems, up to a point, then the gains flatten. Easy questions barely need it.', ['you'], aiScene(chart, q('budget', 'tokens to think'))));
  s.push(aiStep('Distillation means teaching the fast model with the slow model’s worked answers. Careful habits then become quick reflexes.', ['distil'], aiScene(lanes, hardQ, scratch(4), { boxes: [ans('fa', 100, '0.05', true)], arrows: [{ id: 'distil', from: 'slow', to: 'fast', c: 'a', w: 3, label: 'distil', lx: 34 }] })));
  s.push(aiStep('You may see “System 3” online. It is not an agreed term, and we found no source that defines it.', ['s3'], aiScene(lanes, hardQ, arrowQ, fastWrong, scratch(4), out(5), done ? { boxes: [ans('sa', 390, '0.05', true)] } : { boxes: [ans('sa', 390, '0.10', false)] }, { labels: [{ id: 's3', x: 610, y: 500, text: '“System 3”: informal label, no agreed definition', c: 'm', size: 14, anchor: 'middle' }] })));
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
  s.push(aiStep('A generative model would paint every hidden pixel, even each leaf. Much of that detail cannot be guessed.', ['pix'], aiScene(img(true), { bars: pixGrid, boxes: [box('pix', 300, 230, 'pixel painter', 'predicts raw pixels')], arrows: [{ id: 'toPix', from: 'pix', to: { x: 556, y: 250 }, c: 'm' }] })));
  s.push(aiStep('JEPA works differently. A context encoder turns the visible patches into a list of numbers.', ['ctx'], aiScene(img(true), { boxes: [ctxEnc], bars: ctxVec, arrows: [{ id: 'iCtx', from: { x: 260, y: 200 }, to: 'ctx', c: 'm' }] })));
  s.push(aiStep('During training, a target encoder turns the hidden block into numbers too. These numbers are the answer key.', ['tgt'], aiScene(pipe, { bars: ctxVec.concat(tgtVec), arrows: [{ id: 'iCtx', from: { x: 260, y: 200 }, to: 'ctx', c: 'm' }, { id: 'iTgt', from: { x: 260, y: 300 }, to: 'tgt', c: 'm' }, { id: 'tL', from: 'tgt', to: 'loss', c: 'm' }] })));
  const full = aiScene(pipe, { bars: ctxVec.concat(tgtVec, predVec), arrows: [{ id: 'iCtx', from: { x: 260, y: 200 }, to: 'ctx', c: 'm' }, { id: 'iTgt', from: { x: 260, y: 300 }, to: 'tgt', c: 'm' }, { id: 'cP', from: 'ctx', to: 'pred', c: 'm' }, { id: 'pL', from: 'pred', to: 'loss', c: 'a' }, { id: 'tL', from: 'tgt', to: 'loss', c: 'm' }] });
  s.push(aiStep('A predictor takes the visible numbers and guesses the hidden block’s numbers.', ['pred'], full));
  s.push(aiStep('The loss is a score for how wrong the guess is. It compares the two lists of numbers, not pixels.', ['loss'], full));
  s.push(aiStep('So the model learns the gist: a tall tree on the left. It ignores details no one could guess.', ['pv0', 'pv1', 'pv2', 'pv3', 'pv4', 'pv5'], aiScene(full, { labels: [{ id: 'gist', x: 760, y: 470, text: '“tree, left, tall”', c: 'a', size: 15, weight: 700 }] })));
  s.push(aiStep('This version is called I-JEPA. It works on images and comes from Meta in 2023.', [], aiScene(full, { labels: [{ id: 'name', x: 50, y: 400, text: 'I-JEPA · images', c: 't', size: 18, weight: 700 }] })));
  const frames = []; for (let f = 0; f < 4; f++) for (let i = 0; i < 4; i++) frames.push({ id: 'vf' + f + '_' + i, x: 60 + f * 110 + (i % 2) * 44, y: 170 + Math.floor(i / 2) * 44, w: 40, h: 40, c: f >= 2 && i === 1 ? 'l' : ['b', 'a', 'ok', 'b'][i], op: f >= 2 && i === 1 ? 0.25 : 0.7, rx: 3 });
  s.push(aiStep('V-JEPA uses the same idea for video. It hides a region across frames and predicts its numbers.', ['vf2_1', 'vf3_1'], { bars: frames, labels: [{ id: 'vT', x: 60, y: 150, text: 'four video frames, one region hidden over time', c: 'm', size: 13 }, { id: 'name', x: 60, y: 320, text: 'V-JEPA · video', c: 't', size: 18, weight: 700 }] }));
  const goal = { id: 'goal', x: 760, y: 200, w: 150, h: 70, label: 'goal picture', c: 'ok' };
  const arm = { id: 'arm', x: 120, y: 220, w: 150, h: 70, label: 'robot now', c: 't' };
  const ghosts = [['m1', 90, 'c'], ['m2', 235, 'ok'], ['m3', 380, 'c']].map(([id, y, c]) => ({ id, x: 450, y, w: 160, h: 56, label: 'imagined move', sub: c === 'ok' ? 'closest to goal' : 'farther', c, dash: c !== 'ok' }));
  s.push(aiStep('V-JEPA 2 adds some robot data. It imagines what each move would do and picks the one that lands nearest the goal.', ['m2'], { boxes: [arm, goal].concat(ghosts), arrows: [{ id: 'g1', from: 'arm', to: 'm1', c: 'm', dash: true }, { id: 'g2', from: 'arm', to: 'm2', c: 'a' }, { id: 'g3', from: 'arm', to: 'm3', c: 'm', dash: true }, { id: 'g4', from: 'm2', to: 'goal', c: 'a' }], labels: [{ id: 'name', x: 120, y: 470, text: 'V-JEPA 2 · a world model for planning', c: 't', size: 18, weight: 700 }] }));
  s.push(aiStep('Open question: is predicting numbers better than painting pixels? So far the evidence is mostly about vision and robots.', [], aiScene(full)));
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
  const index = (qdot, hot) => ({ boxes: [{ id: 'ix', x: IX[0], y: IX[1], w: IX[2], h: IX[3], label: '', c: 'l', dash: true }], labels: [{ id: 'ixT', x: IX[0] + 12, y: IX[1] + 22, text: 'meaning map', c: 'm', size: 13 }],
    points: dotPos.map(([u, v], i) => ({ id: 'd' + i, x: aiR(IX[0] + 20 + u * (IX[2] - 40)), y: aiR(IX[1] + 30 + v * (IX[3] - 45)), c: hot && hot.indexOf(i) >= 0 ? 'a' : 'm', r: 6, label: '#' + (i + 1), lx: 9 })).concat(qdot ? [{ id: 'qd', x: aiR(IX[0] + 20 + 0.32 * (IX[2] - 40)), y: aiR(IX[1] + 30 + 0.4 * (IX[3] - 45)), c: 't', r: 8, ring: true, hollow: true }] : []),
    rings: qdot && hot ? [{ id: 'near', x: aiR(IX[0] + 20 + 0.32 * (IX[2] - 40)), y: aiR(IX[1] + 30 + 0.4 * (IX[3] - 45)), r: 62, c: 'a' }] : [] });
  const top = [0, 2, 1];
  const prompt = { id: 'prompt', x: 450, y: 340, w: 200, h: 150, label: 'prompt', sub: 'question + #1, #3, #2', c: 'a' };
  const s = [];
  s.push(aiStep('You ask a chatbot about your own company. The model was trained on the public web, not your files.', ['q'], { boxes: [qBox, llm], arrows: [{ id: 'qa', from: 'q', to: 'llm', c: 'm' }] }));
  s.push(aiStep('Without help it can only guess, and a confident guess can be wrong. This is called a hallucination.', ['ans'], { boxes: [qBox, llm, ansBox('“30 days, probably”', 'a guess', 'bad')], arrows: [{ id: 'qa', from: 'q', to: 'llm', c: 'm' }, { id: 'la', from: 'llm', to: 'ans', c: 'm' }] }));
  s.push(aiStep('RAG starts before any question. Cut your documents into small pieces, called chunks.', ['c0', 'c1', 'c2', 'c3', 'c4', 'c5'], aiScene({ boxes: [qBox, llm] }, cards())));
  s.push(aiStep('Turn each chunk into an embedding, a list of numbers for its meaning. Store them in an index, where similar meanings sit close together.', ['ix'], aiScene({ boxes: [qBox, llm] }, cards(), index())));
  s.push(aiStep('When the question arrives, it becomes an embedding too: a new dot on the same map.', ['qd'], aiScene({ boxes: [qBox, llm] }, cards(), index(true), { arrows: [{ id: 'qi', from: 'q', to: 'ix', c: 'm', dash: true }] })));
  s.push(aiStep('Retrieve means finding the nearest chunks. The top three are about refunds, returns and shipping.', ['near'], aiScene({ boxes: [qBox, llm] }, cards(top, true), index(true, top))));
  s.push(aiStep('Paste those chunks into the prompt next to the question, with their numbers.', ['prompt'], aiScene({ boxes: [qBox, llm, prompt] }, cards(top, true), index(true, top), { arrows: [{ id: 'cp', from: 'c2', to: 'prompt', c: 'a' }, { id: 'pl', from: 'prompt', to: 'llm', c: 'a' }] })));
  s.push(aiStep('Generate means the model writes the answer from the pasted text and points to its source.', ['ans'], aiScene({ boxes: [qBox, llm, prompt, ansBox('“Within 14 days [#1]”', 'grounded in your docs', 'ok')] }, cards(top, true), { arrows: [{ id: 'pl', from: 'prompt', to: 'llm', c: 'a' }, { id: 'la', from: 'llm', to: 'ans', c: 'ok' }] })));
  const split = { boxes: [{ id: 'c0', x: 40, y: 330, w: 186, h: 50, label: 'Refunds: within', sub: '#1a', c: 'bad', size: 13 }, { id: 'c0b', x: 240, y: 330, w: 186, h: 50, label: '14 days of purchase', sub: '#1b', c: 'bad', size: 13 }] };
  s.push(aiStep('How you cut matters. Cut a sentence in half and neither piece holds the full fact.', ['c0', 'c0b'], aiScene({ boxes: [qBox, llm] }, split)));
  s.push(aiStep('If the policy changes, update the index instead of retraining the model.', ['ix'], aiScene({ boxes: [qBox, llm] }, cards(), index())));
  s.push(aiStep('Some versions let the model decide when to look things up. Others add extra context to each chunk first.', [], aiScene({ boxes: [qBox, llm, prompt] }, cards(top, true), index(true, top))));
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
  s.push(aiStep('It first thinks: “Which test fails?” Then it picks a tool, a program it may use.', ['model'], frame()));
  s.push(aiStep('It sends a tool call, a short message that names the tool and what to give it.', ['call'], frame('tRun', null, call('tRun', '{tool: run_tests}'))));
  s.push(aiStep('The tool runs and sends back an observation, which is what happened: one test fails, test_total.', ['obs'], frame('tRun', obs('1 failed: test_total', 'bad'), back('tRun'))));
  s.push(aiStep('The model reads that, thinks again, and calls read_file to look at the code.', ['call'], frame('tRead', obs('1 failed: test_total', 'bad'), call('tRead', '{tool: read_file}'))));
  s.push(aiStep('Observation: the total skips the last item. It finds the bug.', ['obs'], frame('tRead', obs('total uses items[:-1]'), back('tRead'))));
  s.push(aiStep('Next action: edit_file with the fix.', ['call'], frame('tEdit', obs('total uses items[:-1]'), call('tEdit', '{tool: edit_file}'))));
  s.push(aiStep('Then it runs the tests again to check its own work. All pass.', ['obs'], frame('tRun', obs('all tests pass', 'ok'), back('tRun'))));
  s.push(aiStep('Goal met, so it stops. Think, act, observe, repeat: that loop is the whole idea.', ['model'], frame(null, obs('all tests pass', 'ok'), { boxes: [Object.assign({}, goal, { c: 'ok', sub: 'done' })] })));
  s.push(aiStep('A workflow follows fixed steps written in code, but an agent chooses its own next step. Start with the simpler one.', [], frame()));
  const apps = ['chat app', 'code editor', 'notes app'].map((l, i) => ({ id: 'ap' + i, x: 60, y: 110 + i * 120, w: 180, h: 60, label: l, c: 'b' }));
  const tls = ['files', 'calendar', 'database'].map((l, i) => ({ id: 'tl' + i, x: 720, y: 110 + i * 120, w: 180, h: 60, label: l, c: 'a' }));
  const wires = []; apps.forEach((a, i) => tls.forEach((t, j) => wires.push({ id: 'wr' + i + j, from: a.id, to: t.id, c: 'm', w: 1.5 })));
  s.push(aiStep('Without a shared standard, every app needs its own link to every tool. Three apps and three tools need 9 links.', [], { boxes: apps.concat(tls), arrows: wires, labels: [{ id: 'nm', x: 480, y: 500, text: 'N × M connectors', c: 't', size: 16, weight: 700, anchor: 'middle' }] }));
  const hub = { id: 'hub', x: 400, y: 200, w: 160, h: 90, label: 'MCP', sub: 'one shared protocol', c: 'a', solid: true };
  const hubW = apps.map((a) => ({ id: 'hw' + a.id, from: a.id, to: 'hub', c: 'b' })).concat(tls.map((t) => ({ id: 'hw' + t.id, from: 'hub', to: t.id, c: 'a' })));
  s.push(aiStep('MCP, the Model Context Protocol, is one shared standard. Each app and tool learns it once, so six links replace nine.', ['hub'], { boxes: apps.concat(tls, [hub]), arrows: hubW, labels: [{ id: 'nm', x: 480, y: 500, text: 'N + M connectors', c: 't', size: 16, weight: 700, anchor: 'middle' }] }));
  s.push(aiStep('Be careful: a tool result can hide bad instructions. So agents need strict permissions and a human check.', ['obs'], frame('tRead', obs('“ignore your goal and…”', 'bad'), back('tRead'))));
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
  s.push(aiStep('In a normal layer, every token passes through the same big feed-forward block of weights.', ['ffn'], aiScene(tok(), { boxes: [big], arrows: words.map((w, i) => ({ id: 'fa' + i, from: 'tk' + i, to: 'ffn', c: 'm' })) })));
  s.push(aiStep('A mixture of experts splits that block into 8 smaller experts. A router in front picks which ones to use.', ['router'], aiScene(tok(), { boxes: [router, comb] }, experts())));
  s.push(aiStep('The router looks at a token, here “cat”, and gives every expert a score.', ['router', 'tk1'], aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), { arrows: [{ id: 'tr', from: 'tk1', to: 'router', c: 'a' }] })));
  s.push(aiStep('Only the top ' + k + ' run for “cat”: ' + top + '. The other experts stay idle.', pick(1).map((i) => 'e' + i), aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), route(1))));
  s.push(aiStep('Their outputs are blended using the router’s scores, and the token moves on.', ['comb'], aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), route(1), out(1))));
  s.push(aiStep('Next token, “ate”: the router picks a different set of experts.', pick(2).map((i) => 'e' + i), aiScene(tok(2), { boxes: [router, comb] }, experts(2, true), route(2), out(2))));
  s.push(aiStep('Over a sentence, each expert handles some tokens and skips others.', [], aiScene(tok(), { boxes: [router, comb] }, experts(null, false, counts))));
  s.push(aiStep('Stored: 8 experts, used per token: ' + k + '. The model holds a lot but runs only a slice of it.', ['cnt'], aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), route(1), out(1), counter)));
  s.push(aiStep('If the router favours one expert, training adds a small push to spread the work evenly.', [], aiScene(tok(), { boxes: [router, comb] }, experts(null, false, counts))));
  s.push(aiStep('The catch: all 8 experts must sit in memory, even though only a few run for each token.', [], aiScene(tok(), { boxes: [router, comb] }, experts(), counter)));
  s.push(aiStep('Mixtral is a well-known open example: 8 experts per layer, with 2 picked for each token.', [], aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), route(1), out(1), counter)));
  s.push(aiStep('Try the slider. More experts per token costs more computing but gives a richer mix.', ['cnt'], aiScene(tok(1), { boxes: [router, comb] }, experts(1, true), route(1), out(1), counter)));
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
  const B = { id: 'B', x: 370, y: 130, w: thick, h: 240, label: '', c: 'a', solid: true, rx: 4 };
  const A = { id: 'A', x: 370 + thick + 24, y: 130, w: 200, h: thick, label: '', c: 'a', solid: true, rx: 4 };
  const dW = { id: 'dW', x: 700, y: 130, w: 240, h: 240, label: 'B × A', sub: 'a full-size update', c: 'a', dash: true };
  const labs = { labels: [{ id: 'aT', x: 370, y: 392, text: 'B: 4096 × r', c: 'a', size: 13 }, { id: 'bT', x: 370 + thick + 24, y: 130 + thick + 22, text: 'A: r × 4096', c: 'a', size: 13 }] };
  const count = (n, c) => ({ labels: [{ id: 'cnt', x: 480, y: 470, text: 'trainable: ' + fmtN(n) + ' weights per matrix', c: c || 't', size: 18, weight: 700, anchor: 'middle', mono: true }, { id: 'cnt2', x: 480, y: 500, text: 'full matrix: ' + fmtN(full), c: 'm', size: 13, anchor: 'middle', mono: true }] });
  const lock = { labels: [{ id: 'lock', x: 180, y: 400, text: 'frozen: never changes', c: 'm', size: 13, anchor: 'middle' }] };
  const lowR = aiScene({ boxes: [Wm] }, cellsW(false), lock, { boxes: [A, B] }, labs);
  const s = [];
  s.push(aiStep('Fine-tuning adapts a trained model to a new job, like answering in your company’s style.', ['W'], aiScene({ boxes: [Wm] }, cellsW(false))));
  s.push(aiStep('Full fine-tuning changes every weight. A single matrix, a big grid of weights, holds 16.8 million of them.', ['W'], aiScene({ boxes: [Wm] }, cellsW(true), count(full, 'c'))));
  s.push(aiStep('LoRA freezes the original weights instead. W never changes during training.', ['W'], aiScene({ boxes: [Wm] }, cellsW(false), lock)));
  s.push(aiStep('It adds two thin grids beside W: B is tall and thin, A is short and wide.', ['A', 'B'], lowR));
  s.push(aiStep('Multiply B × A to get an update as big as W, built from far fewer numbers.', ['dW'], aiScene(lowR, { boxes: [dW], arrows: [{ id: 'ab', from: 'B', to: 'dW', c: 'a' }] })));
  s.push(aiStep('The new answer is the old answer plus a small learned correction from B and A.', ['dW', 'W'], aiScene(lowR, { boxes: [dW], labels: [{ id: 'eq', x: 480, y: 440, text: 'output = W·x + B·A·x', c: 't', size: 18, weight: 700, anchor: 'middle', mono: true }] })));
  s.push(aiStep('Only A and B are trained. With rank r = ' + r + ' (their thickness), that is ' + fmtN(lora) + ' weights, not ' + fmtN(full) + '.', ['cnt'], aiScene(lowR, { boxes: [dW] }, count(lora, 'a'))));
  s.push(aiStep('The rank r is the thickness of A and B. A bigger r learns more but costs more; try the slider.', ['A', 'B'], aiScene(lowR, { boxes: [dW] }, count(lora, 'a'))));
  const notes = ['support', 'legal', 'code'].map((l, i) => ({ id: 'ad' + i, x: 370 + i * 190, y: 200, w: 150, h: 70, label: l + ' adapter', sub: 'few MB', c: i === 0 ? 'a' : 'l' }));
  s.push(aiStep('These small add-ons are called adapters. One base model can swap between many, one for each task.', ['ad0', 'ad1', 'ad2'], aiScene({ boxes: [Wm] }, cellsW(false), lock, { boxes: notes })));
  const q4 = []; for (let i = 0; i < 16; i++) q4.push({ id: 'wc' + i, x: 70 + (i % 4) * 56, y: 140 + Math.floor(i / 4) * 56, w: 52, h: 52, c: 'b', op: 0.3, rx: 2 });
  s.push(aiStep('QLoRA goes further. It shrinks the frozen model into 4-bit numbers so it fits on one graphics card.', ['W'], aiScene({ boxes: [Object.assign({}, Wm, { sub: 'stored in 4 bits' })] }, { bars: q4 }, { boxes: [A, B] }, labs)));
  s.push(aiStep('After training, add B × A into W once. The tuned model then runs as fast as before.', ['W'], aiScene({ boxes: [Object.assign({}, Wm, { label: 'W + B·A', sub: 'merged' })] }, cellsW(false), { arrows: [{ id: 'merge', from: { x: 700, y: 250 }, to: 'W', c: 'a', label: 'merge' }] })));
  s.push(aiStep('LoRA: freeze the giant, train a small patch. That is how many people tune large models today.', ['A', 'B'], aiScene(lowR, { boxes: [dW] }, count(lora, 'a'))));
  return s;
}

// ---------- shared: a small seeded random source, so every learner sees the same "random" data ----------
function aiRng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
}
function aiGauss(rnd) { const u = Math.max(1e-9, rnd()); const v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
const aiSig = (z) => 1 / (1 + Math.exp(-z));
const aiPct = (v) => Math.round(v * 100) + '%';

// ---------- ML: logistic regression and the sigmoid ----------
const AI_LOGI = (() => {
  const fail = [0.8, 1.5, 2.2, 3.0, 3.6, 4.6, 5.8]; const pass = [4.1, 5.2, 6.0, 6.6, 7.3, 8.1, 9.0];
  const X = fail.concat(pass); const Y = fail.map(() => 0).concat(pass.map(() => 1));
  const loss = (w, b) => X.reduce((s, x, i) => { const p = Math.min(1 - 1e-12, Math.max(1e-12, aiSig(w * x + b))); return s - (Y[i] ? Math.log(p) : Math.log(1 - p)); }, 0) / X.length;
  let w = 0; let b = 0;
  for (let it = 0; it < 20000; it++) {
    let gw = 0; let gb = 0;
    X.forEach((x, i) => { const e = aiSig(w * x + b) - Y[i]; gw += e * x / X.length; gb += e / X.length; });
    w -= 0.1 * gw; b -= 0.1 * gb;
  }
  // least-squares straight line through the same 0/1 labels, to show why a line is the wrong shape
  const mx = X.reduce((a, c) => a + c, 0) / X.length; const my = Y.reduce((a, c) => a + c, 0) / Y.length;
  const slope = X.reduce((s, x, i) => s + (x - mx) * (Y[i] - my), 0) / X.reduce((s, x) => s + (x - mx) * (x - mx), 0);
  return { fail, pass, X, Y, loss, w, b, mid: -b / w, slope, icpt: my - slope * mx };
})();
function aiLogistic(p) {
  const D = AI_LOGI; const wU = p; const bU = -wU * D.mid;
  const sx = (v) => aiR(80 + (v / 10) * 480); const sy = (q) => aiR(420 - q * 280);
  const axes = { x0: 80, y0: 480, x1: 570, y1: 70, xl: 'hours studied →', yl: '↑ chance of passing' };
  const guide = { paths: [{ id: 'g1', pts: [[80, sy(1)], [570, sy(1)]], c: 'l', w: 1, dash: true }, { id: 'g0', pts: [[80, sy(0)], [570, sy(0)]], c: 'l', w: 1, dash: true }],
    labels: [{ id: 'g1t', x: 72, y: sy(1) + 5, text: '1', c: 'm', size: 12, anchor: 'end' }, { id: 'g0t', x: 72, y: sy(0) + 5, text: '0', c: 'm', size: 12, anchor: 'end' }] };
  const pts = (hl) => ({ points: D.fail.map((x, i) => ({ id: 'f' + i, x: sx(x), y: sy(0), c: 'b', r: 7, ring: hl && hl.indexOf('f' + i) >= 0 }))
    .concat(D.pass.map((x, i) => ({ id: 'p' + i, x: sx(x), y: sy(1), c: 'a', r: 7, ring: hl && hl.indexOf('p' + i) >= 0 }))) });
  const legend = { points: [{ id: 'lgP', x: 640, y: 80, c: 'a', r: 7, label: 'passed (1)' }, { id: 'lgF', x: 640, y: 108, c: 'b', r: 7, label: 'failed (0)' }] };
  const curve = (w, b, id) => { const out = []; for (let i = 0; i <= 60; i++) { const x = (10 * i) / 60; out.push([sx(x), sy(aiSig(w * x + b))]); } return { id: id || 'sig', pts: out, c: 't', w: 3.5 }; };
  const line = () => { const seg = aiClipY(sx(0), sy(D.icpt), sx(10), sy(D.slope * 10 + D.icpt), sy(1.15), sy(-0.15)); return { id: 'lin', pts: seg, c: 'c', w: 3 }; };
  const ro = (w, b) => ({ labels: [
    { id: 'r1', x: 640, y: 200, text: 'w = ' + aiFmt(w) + '   b = ' + aiFmt(b), c: 't', size: 15, mono: true },
    { id: 'r2', x: 640, y: 232, text: 'log loss = ' + aiFmt(D.loss(w, b), 3), c: 'c', size: 18, weight: 700, mono: true },
    { id: 'r3', x: 640, y: 262, text: 'best: w = ' + aiFmt(D.w) + ', loss ' + aiFmt(D.loss(D.w, D.b), 3), c: 'm', size: 13, mono: true }
  ] });
  const base = (hl) => aiScene({ axes }, guide, legend, pts(hl));
  const at5 = aiSig(D.w * 5 + D.b);
  const thr = { paths: [{ id: 'cut', pts: [[sx(D.mid), 80], [sx(D.mid), 470]], c: 'a', w: 2.5, dash: true }], labels: [{ id: 'cutT', x: sx(D.mid) + 8, y: 92, text: 'p = 0.5 at ' + aiFmt(D.mid, 1) + ' h', c: 'a', size: 13 }] };
  // the most expensive point under the trained model: a confident mistake
  let worst = 0; let worstL = -1;
  D.X.forEach((x, i) => { const q = aiSig(D.w * x + D.b); const l = -(D.Y[i] ? Math.log(q) : Math.log(1 - q)); if (l > worstL) { worstL = l; worst = i; } });
  const worstId = worst < D.fail.length ? 'f' + worst : 'p' + (worst - D.fail.length);
  const lossU = D.loss(wU, bU); const lossB = D.loss(D.w, D.b);
  const s = [];
  s.push(aiStep('Fourteen students. Across is hours studied; up is 1 for a student who passed and 0 for one who failed.', [], base()));
  s.push(aiStep('We want the chance of passing. A straight line is a poor fit: it goes below 0 and above 1.', ['lin'], aiScene(base(), { paths: [line()] })));
  s.push(aiStep('The sigmoid fixes that. It squeezes any number into the range 0 to 1 along an S-shaped curve.', ['sig'], aiScene(base(), { paths: [curve(1.5, -7.5)] })));
  s.push(aiStep('Logistic regression works out w × hours + b and feeds it into the sigmoid. The result is a probability, a chance from 0 to 1.', ['sig', 'r1'], aiScene(base(), { paths: [curve(D.w, D.b)] }, ro(D.w, D.b))));
  s.push(aiStep('Read it off: a student who studies 5 hours has about a ' + aiPct(at5) + ' chance of passing.', ['sig'], aiScene(base(), { paths: [curve(D.w, D.b)], points: [{ id: 'q5', x: sx(5), y: sy(at5), c: 't', r: 8, ring: true, hollow: true, label: aiPct(at5), lx: 14 }] }, ro(D.w, D.b))));
  s.push(aiStep('To decide pass or fail, pick a threshold, a cut-off chance. At 0.5, the boundary falls at ' + aiFmt(D.mid, 1) + ' hours of study.', ['cut'], aiScene(base(), { paths: [curve(D.w, D.b)] }, thr, ro(D.w, D.b))));
  s.push(aiStep('Training uses log loss, a penalty for giving a low chance to what really happened. Being sure and wrong costs most.', [worstId], aiScene(base([worstId]), { paths: [curve(D.w, D.b)] }, thr, ro(D.w, D.b))));
  s.push(aiStep('Gradient descent nudges w and b until the average log loss is as low as it can go, ' + aiFmt(lossB, 3) + ' here.', ['r2'], aiScene(base(), { paths: [curve(D.w, D.b)] }, ro(D.w, D.b))));
  s.push(aiStep('Your slider sets w = ' + aiFmt(wU, 1) + ', keeping the same midpoint. Its log loss is ' + aiFmt(lossU, 3) + (lossU <= lossB + 0.002 ? ', as good as the best.' : ', worse than the best.'), ['sig', 'r2'], aiScene(base(), { paths: [curve(wU, bU)] }, thr, ro(wU, bU))));
  s.push(aiStep('A small w gives a flat curve that is unsure about everyone. A big w is a hard step that pays heavily for every mistake.', ['sig'], aiScene(base(), { paths: [curve(wU, bU)] }, thr, ro(wU, bU))));
  s.push(aiStep('With many inputs it is the same idea: one weight per input, one sum, one sigmoid. The boundary becomes a flat sheet.', ['cut'], aiScene(base(), { paths: [curve(D.w, D.b)] }, thr, ro(D.w, D.b))));
  return s;
}

// ---------- ML: precision, recall and the confusion matrix ----------
const AI_CM = {
  spam: [0.95, 0.9, 0.85, 0.8, 0.72, 0.66, 0.58, 0.45, 0.35],
  ham: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.52, 0.62, 0.7, 0.12]
};
function aiCounts(T) {
  const tp = AI_CM.spam.filter((v) => v >= T).length; const fn = AI_CM.spam.length - tp;
  const fp = AI_CM.ham.filter((v) => v >= T).length; const tn = AI_CM.ham.length - fp;
  return { tp, fn, fp, tn, prec: tp + fp ? tp / (tp + fp) : null, rec: tp / (tp + fn), acc: (tp + tn) / (tp + fn + fp + tn) };
}
function aiConfusion(p) {
  const T = Math.round(p * 100) / 100; const K = aiCounts(T);
  const sx = (v) => aiR(80 + v * 800);
  const axisLine = { paths: [{ id: 'nl', pts: [[80, 196], [880, 196]], c: 'l', w: 1.5 }], labels: [{ id: 'nl0', x: 80, y: 218, text: '0', c: 'm', size: 12, anchor: 'middle' }, { id: 'nl1', x: 880, y: 218, text: '1', c: 'm', size: 12, anchor: 'middle' }, { id: 'nlT', x: 480, y: 218, text: 'spam score from the model →', c: 'm', size: 12, anchor: 'middle' },
    { id: 'rowS', x: 70, y: 115, text: 'spam', c: 'a', size: 13, anchor: 'end', weight: 700 }, { id: 'rowH', x: 70, y: 165, text: 'not spam', c: 'b', size: 13, anchor: 'end', weight: 700 }] };
  const dots = (pick) => ({ points: AI_CM.spam.map((v, i) => ({ id: 's' + i, x: sx(v), y: 110, c: 'a', r: 7, ring: pick && pick('s', v) }))
    .concat(AI_CM.ham.map((v, i) => ({ id: 'h' + i, x: sx(v), y: 160, c: 'b', r: 7, ring: pick && pick('h', v) }))) });
  const thr = { paths: [{ id: 'thr', pts: [[sx(T), 70], [sx(T), 200]], c: 't', w: 3 }], regions: [{ id: 'flag', x: sx(T), y: 84, w: aiR(880 - sx(T) + 6), h: 100, c: 'c', op: 0.1 }],
    labels: [{ id: 'thrT', x: sx(T), y: 60, text: 'threshold ' + T.toFixed(2), c: 't', size: 13, anchor: 'middle', mono: true }] };
  const top = (pick) => aiScene(axisLine, thr, dots(pick));
  const ids = (k) => (k === 'tp' ? AI_CM.spam.map((v, i) => [v, 's' + i]).filter(([v]) => v >= T) : k === 'fn' ? AI_CM.spam.map((v, i) => [v, 's' + i]).filter(([v]) => v < T)
    : k === 'fp' ? AI_CM.ham.map((v, i) => [v, 'h' + i]).filter(([v]) => v >= T) : AI_CM.ham.map((v, i) => [v, 'h' + i]).filter(([v]) => v < T)).map((x) => x[1]);
  const cell = (id, x, y, n, name, c) => ({ id, x, y, w: 150, h: 80, label: String(n), sub: name, c, size: 22, mono: true });
  const grid = { boxes: [cell('TP', 210, 280, K.tp, 'caught spam', 'ok'), cell('FN', 370, 280, K.fn, 'missed spam', 'bad'), cell('FP', 210, 370, K.fp, 'good mail flagged', 'bad'), cell('TN', 370, 370, K.tn, 'good mail kept', 'ok')],
    labels: [{ id: 'cH1', x: 285, y: 268, text: 'flagged', c: 'm', size: 13, anchor: 'middle' }, { id: 'cH2', x: 445, y: 268, text: 'let through', c: 'm', size: 13, anchor: 'middle' },
      { id: 'rH1', x: 200, y: 325, text: 'is spam', c: 'm', size: 13, anchor: 'end' }, { id: 'rH2', x: 200, y: 415, text: 'is not spam', c: 'm', size: 13, anchor: 'end' }] };
  const fmtP = (v) => (v === null ? 'none flagged' : aiPct(v));
  const pr = { labels: [{ id: 'prec', x: 600, y: 300, text: 'precision ' + fmtP(K.prec), c: 'a', size: 18, weight: 700, mono: true }, { id: 'rec', x: 600, y: 332, text: 'recall    ' + aiPct(K.rec), c: 'b', size: 18, weight: 700, mono: true }] };
  const chart = (() => {
    const X = (t) => aiR(600 + ((t - 0.05) / 0.9) * 300); const Yv = (v) => aiR(500 - v * 130);
    const ts = []; for (let t = 0.05; t <= 0.951; t += 0.05) ts.push(Math.round(t * 100) / 100);
    const P = ts.map((t) => [X(t), Yv(aiCounts(t).prec === null ? 1 : aiCounts(t).prec)]); const R = ts.map((t) => [X(t), Yv(aiCounts(t).rec)]);
    return { paths: [{ id: 'chAx', pts: [[600, 362], [600, 500], [905, 500]], c: 'l', w: 1.5 }, { id: 'chP', pts: P, c: 'a', w: 3 }, { id: 'chR', pts: R, c: 'b', w: 3 }, { id: 'chNow', pts: [[X(Math.min(0.95, Math.max(0.05, T))), 366], [X(Math.min(0.95, Math.max(0.05, T))), 500]], c: 't', w: 2, dash: true }],
      labels: [{ id: 'chX', x: 905, y: 522, text: 'threshold →', c: 'm', size: 12, anchor: 'end' }] };
  })();
  const s = [];
  s.push(aiStep('Twenty emails each get a spam score from 0 to 1. The top row really is spam; the bottom row is good mail.', [], aiScene(axisLine, dots())));
  s.push(aiStep('Pick a threshold, a cut-off score, here ' + T.toFixed(2) + '. Every email at or above it is flagged as spam.', ['thr', 'flag'], top()));
  s.push(aiStep('True positives: spam we caught. ' + K.tp + ' of the 9 spam emails sit at or above the line.', ids('tp'), top((r, v) => r === 's' && v >= T)));
  s.push(aiStep('False positives are good mail we flagged: ' + K.fp + ' of them. For email this is the costly mistake.', ids('fp'), top((r, v) => r === 'h' && v >= T)));
  s.push(aiStep('False negatives are spam that slipped through: ' + K.fn + ' of them. Annoying, but nothing important is lost.', ids('fn'), top((r, v) => r === 's' && v < T)));
  s.push(aiStep('True negatives: good mail let through, ' + K.tn + '. Every email lands in exactly one of these four groups.', ids('tn'), top((r, v) => r === 'h' && v < T)));
  s.push(aiStep('Put the four counts in a 2 × 2 grid. That grid is the confusion matrix.', ['TP', 'FN', 'FP', 'TN'], aiScene(top(), grid)));
  s.push(aiStep('Precision asks: of everything flagged, how much was really spam? ' + (K.prec === null ? 'Nothing is flagged, so it is undefined.' : K.tp + ' of ' + (K.tp + K.fp) + ' = ' + aiPct(K.prec) + '.'), ['TP', 'FP', 'prec'], aiScene(top(), grid, pr)));
  s.push(aiStep('Recall asks: of all the spam, how much did we catch? ' + K.tp + ' of 9 = ' + aiPct(K.rec) + '.', ['TP', 'FN', 'rec'], aiScene(top(), grid, pr)));
  s.push(aiStep('Accuracy, the share of emails marked correctly, is ' + aiPct(K.acc) + ' here, but it can mislead. If 1 email in 100 is spam, flagging nothing scores 99%.', ['TN'], aiScene(top(), grid, pr)));
  s.push(aiStep('Raise the threshold and precision tends to rise while recall falls. The two curves show the trade-off.', ['chP', 'chR'], aiScene(top(), grid, pr, chart)));
  s.push(aiStep('Pick the threshold by the cost of each mistake. A spam filter guards precision; a disease test guards recall.', ['thr'], aiScene(top(), grid, pr, chart)));
  return s;
}

// ---------- ML: k-means clustering ----------
const AI_KM = (() => {
  const off = [[-0.8, 0.3], [0.5, 0.6], [0.2, -0.7], [-0.4, -0.5], [0.9, -0.1], [-0.1, 0.9], [0.6, -0.6], [-0.9, -0.3]];
  const blobs = [[2.6, 7.2, 1.1], [7.3, 7.6, 0.9], [5.2, 2.6, 1.2]];
  const P = []; blobs.forEach(([cx, cy, k]) => off.forEach(([dx, dy]) => P.push([aiR(cx + dx * k), aiR(cy + dy * k)])));
  const init = [2, 5, 7, 1, 3, 9];
  const d2 = (a, b) => (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]);
  const run = (k) => {
    let C = init.slice(0, k).map((i) => P[i].slice());
    const hist = [];
    for (let it = 0; it < 30; it++) {
      const A = P.map((q) => { let best = 0; C.forEach((c, j) => { if (d2(q, c) < d2(q, C[best])) best = j; }); return best; });
      const N = C.map((c, j) => { const m = P.filter((q, i) => A[i] === j); return m.length ? [m.reduce((s, q) => s + q[0], 0) / m.length, m.reduce((s, q) => s + q[1], 0) / m.length] : c; });
      hist.push({ C: C.map((c) => c.slice()), A, N });
      const moved = N.some((c, j) => d2(c, C[j]) > 1e-12);
      C = N;
      if (!moved) break;
    }
    const last = hist[hist.length - 1];
    const inertia = P.reduce((s, q, i) => s + d2(q, last.N[last.A[i]]), 0);
    return { hist, inertia, final: last };
  };
  const runs = {}; for (let k = 1; k <= 6; k++) runs[k] = run(k);
  // the elbow: the k after which the drop in total distance shrinks the most
  let bend = 2; let bestGain = -Infinity;
  for (let k = 2; k <= 5; k++) { const gain = (runs[k - 1].inertia - runs[k].inertia) - (runs[k].inertia - runs[k + 1].inertia); if (gain > bestGain) { bestGain = gain; bend = k; } }
  return { P, runs, bend };
})();
function aiKmeans(p) {
  const k = Math.max(2, Math.min(5, Math.round(p)));
  const D = AI_KM; const R = D.runs[k];
  const [sx, sy] = aiScale(70, 530, 480, 60, 0, 10);
  const axes = { x0: 70, y0: 480, x1: 530, y1: 60, xl: 'minutes per visit →', yl: '↑ visits per week' };
  // group colours that stay apart in every theme; centres also carry a letter, and spokes show membership
  const COL = ['a', 'b', 'ok', 't', 'm'];
  const pts = (A) => ({ points: D.P.map((q, i) => ({ id: 'd' + i, x: sx(q[0]), y: sy(q[1]), c: A ? COL[A[i]] : 'm', r: 6 })) });
  const cents = (C) => ({ points: C.map((c, j) => ({ id: 'c' + j, x: sx(c[0]), y: sy(c[1]), c: COL[j], r: 11, hollow: true, ring: true, label: 'ABCDE'[j], lx: 16, ly: -12, lc: 't' })) });
  const spokes = (A, C) => ({ paths: D.P.map((q, i) => ({ id: 'sp' + i, pts: [[sx(q[0]), sy(q[1])], [sx(C[A[i]][0]), sy(C[A[i]][1])]], c: COL[A[i]], w: 1.2, dash: true, op: 0.7 })) });
  const moves = (C, N) => ({ arrows: C.map((c, j) => ({ id: 'mv' + j, from: { x: sx(c[0]), y: sy(c[1]) }, to: { x: sx(N[j][0]), y: sy(N[j][1]) }, c: COL[j], w: 2.5, op: Math.hypot(N[j][0] - c[0], N[j][1] - c[1]) > 0.15 ? 1 : 0 })) });
  const h = R.hist; const h1 = h[Math.min(1, h.length - 1)];
  const elbow = (() => {
    const X = (kk) => aiR(620 + ((kk - 1) / 5) * 280); const maxI = D.runs[1].inertia; const Yv = (v) => aiR(440 - (1 - v / maxI) * 0 - (v / maxI) * 220);
    const pts2 = []; for (let kk = 1; kk <= 6; kk++) pts2.push([X(kk), Yv(D.runs[kk].inertia)]);
    return { paths: [{ id: 'elAx', pts: [[620, 210], [620, 440], [905, 440]], c: 'l', w: 1.5 }, { id: 'el', pts: pts2, c: 'a', w: 3 }],
      points: [{ id: 'elK', x: X(k), y: Yv(R.inertia), c: 'a', r: 8, ring: true, label: 'k = ' + k, lx: 12, ly: -12 }],
      labels: [{ id: 'elT', x: 620, y: 196, text: 'total distance² by k', c: 'm', size: 13 }, { id: 'elX', x: 905, y: 462, text: 'k = 1 … 6 →', c: 'm', size: 12, anchor: 'end' }] };
  })();
  const ro = (txt) => ({ labels: [{ id: 'ro', x: 620, y: 110, text: txt, c: 't', size: 15, mono: true }] });
  const s = [];
  s.push(aiStep('Each dot is a shop customer: how long they stay, and how often they come. Nobody has put them in groups.', [], aiScene({ axes }, pts())));
  s.push(aiStep('k-means finds groups by itself. You choose k, the number of groups; your slider says k = ' + k + '.', [], aiScene({ axes }, pts(), ro('k = ' + k))));
  s.push(aiStep('Start by dropping ' + k + ' centres onto the map, here on ' + k + ' customers picked at random.', h[0].C.map((c, j) => 'c' + j), aiScene({ axes }, pts(), cents(h[0].C), ro('k = ' + k))));
  s.push(aiStep('Assign: every customer joins the centre nearest to it. The dashed lines show who joined whom.', [], aiScene({ axes }, pts(h[0].A), spokes(h[0].A, h[0].C), cents(h[0].C), ro('round 1'))));
  s.push(aiStep('Update: move each centre to the average position of its members. Some centres travel a long way.', h[0].C.map((c, j) => 'mv' + j), aiScene({ axes }, pts(h[0].A), cents(h[0].N), moves(h[0].C, h[0].N), ro('round 1'))));
  const switched = h1.A.filter((g, i) => g !== h[0].A[i]).length;
  const moved1 = h1.N.some((c, j) => Math.hypot(c[0] - h1.C[j][0], c[1] - h1.C[j][1]) > 1e-9);
  s.push(aiStep('Assign again with the new centres. ' + (switched ? switched + ' customer' + (switched > 1 ? 's switch' : ' switches') + ' group.' : 'Nobody switches group this time.'), [], aiScene({ axes }, pts(h1.A), spokes(h1.A, h1.C), cents(h1.C), ro('round 2'))));
  s.push(aiStep(moved1 ? 'Update again. The moves get smaller each round.' : 'Update again. No centre moves: each already sits in the middle of its group.', [], aiScene({ axes }, pts(h1.A), cents(h1.N), moves(h1.C, h1.N), ro('round 2'))));
  s.push(aiStep('After ' + h.length + ' rounds nothing changes, so it stops. With k = ' + k + ', each lettered centre marks one group.', [], aiScene({ axes }, pts(R.final.A), spokes(R.final.A, R.final.N), cents(R.final.N), ro(h.length + ' rounds, settled'))));
  s.push(aiStep('The score adds up each customer’s distance to their centre, each multiplied by itself: ' + aiFmt(R.inertia, 1) + ' for k = ' + k + '.', ['ro'], aiScene({ axes }, pts(R.final.A), spokes(R.final.A, R.final.N), cents(R.final.N), ro('distance² = ' + aiFmt(R.inertia, 1)))));
  s.push(aiStep('More groups nearly always lower that score, so it cannot pick k alone. Plot k = 1 to 6 and look for the bend.', ['el'], aiScene({ axes }, pts(R.final.A), spokes(R.final.A, R.final.N), cents(R.final.N), elbow)));
  s.push(aiStep('The curve bends at k = ' + D.bend + ': after that, extra groups barely help. Your k = ' + k + (k === D.bend ? ' sits right on the bend.' : ' is off the bend. Try ' + D.bend + '.'), ['elK'], aiScene({ axes }, pts(R.final.A), spokes(R.final.A, R.final.N), cents(R.final.N), elbow)));
  s.push(aiStep('Watch out: k-means likes round blobs of similar size. Bad starting centres can also trap it.', [], aiScene({ axes }, pts(R.final.A), spokes(R.final.A, R.final.N), cents(R.final.N), elbow)));
  return s;
}

// ---------- ML: PCA, squash two columns into one ----------
const AI_PCA = (() => {
  const ts = [-2, -1.7, -1.4, -1.2, -0.9, -0.7, -0.5, -0.3, -0.1, 0, 0.2, 0.4, 0.5, 0.7, 0.9, 1.1, 1.3, 1.5, 1.8, 2.1];
  const rnd = aiRng(11);
  const P = ts.map((t) => [aiR(5 + 1.6 * t + aiGauss(rnd) * 0.4), aiR(5 + 1.0 * t + aiGauss(rnd) * 0.45)]);
  const n = P.length; const mx = P.reduce((s, q) => s + q[0], 0) / n; const my = P.reduce((s, q) => s + q[1], 0) / n;
  const sxx = P.reduce((s, q) => s + (q[0] - mx) * (q[0] - mx), 0) / n; const syy = P.reduce((s, q) => s + (q[1] - my) * (q[1] - my), 0) / n;
  const sxy = P.reduce((s, q) => s + (q[0] - mx) * (q[1] - my), 0) / n;
  const best = 0.5 * Math.atan2(2 * sxy, sxx - syy);
  const along = (a) => sxx * Math.cos(a) * Math.cos(a) + 2 * sxy * Math.cos(a) * Math.sin(a) + syy * Math.sin(a) * Math.sin(a);
  return { P, mx, my, total: sxx + syy, best, along };
})();
function aiPca(p) {
  const D = AI_PCA; const ang = (p * Math.PI) / 180; const bestDeg = Math.round(((D.best * 180) / Math.PI + 180) % 180);
  const S = 44; const ox = 300 - D.mx * S; const oy = 290 + D.my * S;
  const X = (v) => aiR(ox + v * S); const Y = (v) => aiR(oy - v * S);
  const axes = { x0: 70, y0: 505, x1: 540, y1: 50, xl: 'height →', yl: '↑ arm span' };
  const pts = (op) => ({ points: D.P.map((q, i) => ({ id: 'd' + i, x: X(q[0]), y: Y(q[1]), c: 'a', r: 6, op: op || 1 })) });
  const cross = { paths: [{ id: 'cx', pts: [[X(D.mx - 4.6), Y(D.my)], [X(D.mx + 4.6), Y(D.my)]], c: 'l', w: 1.5, dash: true }, { id: 'cy', pts: [[X(D.mx), Y(D.my - 5)], [X(D.mx), Y(D.my + 5)]], c: 'l', w: 1.5, dash: true }],
    points: [{ id: 'mean', x: X(D.mx), y: Y(D.my), c: 't', r: 5, label: 'average', lx: 10, ly: 18 }] };
  const axis = (a, id, c) => ({ id, pts: [[X(D.mx - 4.6 * Math.cos(a)), Y(D.my - 4.6 * Math.sin(a))], [X(D.mx + 4.6 * Math.cos(a)), Y(D.my + 4.6 * Math.sin(a))]], c, w: 3.5 });
  const proj = (a) => {
    const u = [Math.cos(a), Math.sin(a)];
    const feet = D.P.map((q) => { const t = (q[0] - D.mx) * u[0] + (q[1] - D.my) * u[1]; return [D.mx + t * u[0], D.my + t * u[1]]; });
    return { paths: D.P.map((q, i) => ({ id: 'pj' + i, pts: [[X(q[0]), Y(q[1])], [X(feet[i][0]), Y(feet[i][1])]], c: 'm', w: 1.2, dash: true })),
      points: feet.map((f, i) => ({ id: 'ft' + i, x: X(f[0]), y: Y(f[1]), c: 't', r: 4, hollow: true })) };
  };
  const share = (a) => D.along(a) / D.total;
  const bars = (a) => ({ bars: [
    { id: 'bYou', x: 640, y: 150, w: aiR(260 * share(a)), h: 30, c: 'c', val: aiPct(share(a)), vx: aiR(650 + 260 * share(a)), vy: 171 },
    { id: 'bBest', x: 640, y: 230, w: aiR(260 * share(D.best)), h: 30, c: 'a', val: aiPct(share(D.best)), vx: aiR(650 + 260 * share(D.best)), vy: 251 }
  ], labels: [{ id: 'lYou', x: 640, y: 140, text: 'spread kept by your axis (' + p + '°)', c: 'm', size: 13 }, { id: 'lBest', x: 640, y: 220, text: 'spread kept by PC1 (' + bestDeg + '°)', c: 'm', size: 13 }] });
  const s = [];
  s.push(aiStep('Twenty people, two measurements each: height and arm span. Tall people tend to have long arms, so the dots lean.', [], aiScene({ axes }, pts())));
  s.push(aiStep('PCA starts by centring: measure everything from the average person, the cross in the middle.', ['mean'], aiScene({ axes }, cross, pts())));
  s.push(aiStep('Draw a line through the centre at your angle, ' + p + '°. We want one line that keeps as much of the spread as possible.', ['you'], aiScene({ axes }, cross, pts(), { paths: [axis(ang, 'you', 'c')] })));
  s.push(aiStep('Drop each dot straight onto the line. Each person is now one number: how far along the line they land.', [], aiScene({ axes }, cross, pts(0.5), { paths: [axis(ang, 'you', 'c')] }, proj(ang))));
  s.push(aiStep('Measure how spread out the landed dots are. Your axis keeps ' + aiPct(share(ang)) + ' of the total spread.', ['bYou'], aiScene({ axes }, cross, pts(0.5), { paths: [axis(ang, 'you', 'c')] }, proj(ang), bars(ang))));
  s.push(aiStep('PCA turns the line until the spread is largest: ' + bestDeg + '°, keeping ' + aiPct(share(D.best)) + '. This best line is called PC1.', ['pc1', 'bBest'], aiScene({ axes }, cross, pts(0.5), { paths: [axis(D.best, 'pc1', 'a')] }, proj(D.best), bars(ang))));
  s.push(aiStep('The maths behind it: PC1 comes from the covariance matrix, a table of how the columns change together.', ['pc1'], aiScene({ axes }, cross, pts(), { paths: [axis(D.best, 'pc1', 'a')] }, bars(ang))));
  s.push(aiStep('PC2 sits at right angles to PC1 and holds the rest, ' + aiPct(1 - share(D.best)) + '. Little is lost by dropping it.', ['pc2'], aiScene({ axes }, cross, pts(), { paths: [axis(D.best, 'pc1', 'a'), axis(D.best + Math.PI / 2, 'pc2', 'b')] }, bars(ang))));
  s.push(aiStep('With 100 columns, the first two or three lines often keep most of the spread. That is how big tables get drawn in 2D.', ['pc1'], aiScene({ axes }, cross, pts(0.5), { paths: [axis(D.best, 'pc1', 'a')] }, proj(D.best), bars(ang))));
  s.push(aiStep('Two cautions: put columns on the same scale first, and remember PCA finds spread, not meaning.', [], aiScene({ axes }, cross, pts(), { paths: [axis(D.best, 'pc1', 'a')] }, bars(ang))));
  return s;
}

// ---------- ML: the bias-variance picture ----------
const AI_BV = (() => {
  const f = (x) => 5 + 2.5 * Math.sin(x * 0.75);
  const xs = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5];
  const rnd = aiRng(7);
  const sets = []; for (let k = 0; k < 12; k++) sets.push(xs.map((x) => f(x) + aiGauss(rnd) * 0.9));
  const grid = []; for (let i = 0; i <= 36; i++) grid.push(0.5 + (9 * i) / 36);
  const by = {};
  for (let d = 1; d <= 7; d++) {
    const fits = sets.map((ys) => aiPolyFit(xs, ys, d));
    const vals = fits.map((g) => grid.map((x) => g(x)));
    const mean = grid.map((x, j) => vals.reduce((s, v) => s + v[j], 0) / vals.length);
    const bias2 = grid.reduce((s, x, j) => s + Math.pow(mean[j] - f(x), 2), 0) / grid.length;
    const vari = grid.reduce((s, x, j) => s + vals.reduce((t, v) => t + Math.pow(v[j] - mean[j], 2), 0) / vals.length, 0) / grid.length;
    by[d] = { fits, mean, bias2, vari };
  }
  let best = 1; for (let d = 2; d <= 7; d++) if (by[d].bias2 + by[d].vari < by[best].bias2 + by[best].vari) best = d;
  return { f, xs, sets, grid, by, best, noise: 0.81 };
})();
function aiBiasVar(p) {
  const deg = Math.max(1, Math.min(7, Math.round(p)));
  const D = AI_BV;
  const [sx, sy] = aiScale(70, 560, 480, 60, 0, 10);
  const axes = { x0: 70, y0: 480, x1: 560, y1: 60, xl: 'x →', yl: '↑ y' };
  const cl = (v) => aiR(Math.max(50, Math.min(490, sy(v))));
  const truth = { paths: [{ id: 'truth', pts: D.grid.map((x) => [sx(x), cl(D.f(x))]), c: 'm', w: 2.5, dash: true }] };
  const dots = (k) => ({ points: D.xs.map((x, i) => ({ id: 'd' + i, x: sx(x), y: cl(D.sets[k][i]), c: 'a', r: 6 })) });
  const fit = (d, k, id, extra) => Object.assign({ id: id || 'fit', pts: D.grid.map((x) => [sx(x), cl(D.by[d].fits[k](x))]), c: 't', w: 3 }, extra || {});
  const many = (d) => ({ paths: D.sets.map((ys, k) => fit(d, k, 'f' + k, { c: 'b', w: 1.5, op: 0.45 })) });
  const mean = (d) => ({ paths: [{ id: 'mean', pts: D.grid.map((x, j) => [sx(x), cl(D.by[d].mean[j])]), c: 't', w: 4 }] });
  const fmt = (v) => (v > 99 ? '> 99' : aiFmt(v));
  const ro = (d) => ({ labels: [
    { id: 'rd', x: 630, y: 90, text: 'degree ' + d, c: 't', size: 18, weight: 700, mono: true },
    { id: 'rb', x: 630, y: 122, text: 'bias²     ' + fmt(D.by[d].bias2), c: 'c', size: 15, mono: true },
    { id: 'rv', x: 630, y: 148, text: 'variance  ' + fmt(D.by[d].vari), c: 'b', size: 15, mono: true },
    { id: 'rn', x: 630, y: 174, text: 'noise     ' + aiFmt(D.noise), c: 'm', size: 15, mono: true }
  ] });
  const chart = () => {
    const X = (d) => aiR(630 + ((d - 1) / 6) * 270); const Yv = (e) => aiR(470 - Math.min(1, Math.log10(1 + e * 3) / Math.log10(1 + 3 * 4)) * 200);
    const line = (key, c) => ({ id: 'ch' + key, pts: [1, 2, 3, 4, 5, 6, 7].map((d) => [X(d), Yv(key === 'tot' ? D.by[d].bias2 + D.by[d].vari : D.by[d][key])]), c, w: key === 'tot' ? 3.5 : 2.5 });
    return { paths: [{ id: 'chAx', pts: [[630, 262], [630, 470], [905, 470]], c: 'l', w: 1.5 }, line('bias2', 'c'), line('vari', 'b'), line('tot', 't')],
      points: [{ id: 'chBest', x: X(D.best), y: Yv(D.by[D.best].bias2 + D.by[D.best].vari), c: 't', r: 8, ring: true }, { id: 'chYou', x: X(deg), y: Yv(D.by[deg].bias2 + D.by[deg].vari), c: 'a', r: 6 }],
      labels: [{ id: 'chT', x: 630, y: 248, text: 'bias², variance and their sum', c: 'm', size: 13 }, { id: 'chX', x: 905, y: 492, text: 'degree 1 … 7 →', c: 'm', size: 12, anchor: 'end' }] };
  };
  const tot = (d) => aiFmt(D.by[d].bias2 + D.by[d].vari);
  const s = [];
  s.push(aiStep('The dashed curve is the true pattern behind some data. In real life you never get to see it.', ['truth'], aiScene({ axes }, truth)));
  s.push(aiStep('What you get is a sample: ten points, each with some random error mixed in.', [], aiScene({ axes }, truth, dots(0))));
  s.push(aiStep('Fit a curve of your degree, ' + deg + ', to those ten points.', ['fit'], aiScene({ axes }, truth, dots(0), { paths: [fit(deg, 0)] })));
  s.push(aiStep('Draw a fresh sample from the same pattern and fit again. The curve comes out different.', ['fit'], aiScene({ axes }, truth, dots(1), { paths: [fit(deg, 1)] })));
  s.push(aiStep('Do it twelve times. Twelve samples give twelve fits, all trying to find the same pattern.', [], aiScene({ axes }, truth, many(deg))));
  s.push(aiStep('Average the twelve fits. Bias is how far that average sits from the truth, a habit of missing the same way.', ['mean', 'rb'], aiScene({ axes }, truth, many(deg), mean(deg), ro(deg))));
  s.push(aiStep('Variance is how far single fits scatter around their average. It shows how much the answer depends on the luck of the sample.', ['rv'], aiScene({ axes }, truth, many(deg), mean(deg), ro(deg))));
  s.push(aiStep('Error on new data is about bias² + variance + noise (bias² is bias times itself). No model can remove noise.', ['rb', 'rv', 'rn'], aiScene({ axes }, truth, many(deg), mean(deg), ro(deg))));
  s.push(aiStep('Degree 1 is too stiff: bias² ' + fmt(D.by[1].bias2) + ', variance only ' + fmt(D.by[1].vari) + '. Every fit misses the wave the same way.', ['mean'], aiScene({ axes }, truth, many(1), mean(1), ro(1))));
  s.push(aiStep('Degree 7 is too loose: bias² ' + fmt(D.by[7].bias2) + ' but variance ' + fmt(D.by[7].vari) + '. The fits chase the noise and disagree.', [], aiScene({ axes }, truth, many(7), mean(7), ro(7))));
  s.push(aiStep('Their sum is lowest at degree ' + D.best + '. Your degree ' + deg + ' scores ' + tot(deg) + ' against ' + tot(D.best) + ' at the best.', ['chtot', 'chBest'], aiScene({ axes }, truth, many(deg), mean(deg), ro(deg), chart())));
  s.push(aiStep('More data, or a penalty on wiggly curves, shrinks variance. Then a flexible model is safer to use.', ['chvari'], aiScene({ axes }, truth, mean(deg), ro(deg), chart())));
  return s;
}

// ---------- AI now: tokens and byte-pair encoding ----------
const AI_BPE = (() => {
  const words = [['play', 5], ['played', 3], ['playing', 4], ['player', 2], ['plays', 3], ['replay', 2]];
  let corpus = words.map(([w, n]) => ({ toks: w.split(''), n }));
  const merges = []; const states = [corpus.map((x) => x.toks.slice())]; const tops = [];
  for (let m = 0; m < 12; m++) {
    const cnt = {}; const order = [];
    corpus.forEach((x) => { for (let i = 0; i + 1 < x.toks.length; i++) { const k = x.toks[i] + '\u0001' + x.toks[i + 1]; if (!(k in cnt)) { cnt[k] = 0; order.push(k); } cnt[k] += x.n; } });
    if (!order.length) break;
    const ranked = order.slice().sort((a, b) => cnt[b] - cnt[a] || order.indexOf(a) - order.indexOf(b));
    tops.push(ranked.slice(0, 5).map((k) => [k.split('\u0001'), cnt[k]]));
    const [a, b] = ranked[0].split('\u0001');
    merges.push([a, b, cnt[ranked[0]]]);
    corpus = corpus.map((x) => { const out = []; for (let i = 0; i < x.toks.length; i++) { if (i + 1 < x.toks.length && x.toks[i] === a && x.toks[i + 1] === b) { out.push(a + b); i++; } else out.push(x.toks[i]); } return { toks: out, n: x.n }; });
    states.push(corpus.map((x) => x.toks.slice()));
  }
  const chars = {}; words.forEach(([w]) => w.split('').forEach((c) => { chars[c] = 1; }));
  const encode = (word, nm) => {
    let t = word.split('');
    merges.slice(0, nm).forEach(([a, b]) => { const out = []; for (let i = 0; i < t.length; i++) { if (i + 1 < t.length && t[i] === a && t[i + 1] === b) { out.push(a + b); i++; } else out.push(t[i]); } t = out; });
    return t;
  };
  return { words, merges, states, tops, base: Object.keys(chars).length, encode };
})();
function aiTokens(p) {
  const D = AI_BPE; const nm = Math.max(0, Math.min(D.merges.length, Math.round(p)));
  const rowY = (r) => 96 + r * 64;
  const chipsRow = (r, toks, hot) => { const out = []; let x = 150; toks.forEach((tk, i) => { const w = aiTokW(tk); out.push({ id: 'w' + r + '_' + i, x: aiR(x + w / 2), y: rowY(r), text: tk, c: hot && hot.indexOf(tk) >= 0 ? 'a' : 'l', solid: hot && hot.indexOf(tk) >= 0 }); x += w + 6; }); return out; };
  const corpus = (state, hot) => ({ tokens: [].concat.apply([], state.map((toks, r) => chipsRow(r, toks, hot))), labels: D.words.map(([w, n], r) => ({ id: 'n' + r, x: 120, y: rowY(r) + 5, text: '×' + n, c: 'm', size: 14, anchor: 'end', mono: true })) });
  const pairBars = (top) => ({ bars: top.map(([pr, n], i) => ({ id: 'pb' + i, x: 740, y: 90 + i * 44, w: aiR(n * 9), h: 26, c: i === 0 ? 'a' : 'm', val: String(n), vx: aiR(748 + n * 9), vy: 108 + i * 44 })),
    labels: top.map(([pr], i) => ({ id: 'pl' + i, x: 728, y: 108 + i * 44, text: pr[0] + ' + ' + pr[1], c: 't2', size: 14, anchor: 'end', mono: true })).concat([{ id: 'pT', x: 620, y: 62, text: 'pair counts (weighted by ×)', c: 'm', size: 13 }]) });
  const mergeList = (n) => ({ labels: D.merges.slice(0, n).map(([a, b], i) => ({ id: 'ml' + i, x: 640, y: 92 + i * 28, text: (i + 1) + '. ' + a + ' + ' + b + ' → ' + a + b, c: 't', size: 14, mono: true }))
    .concat([{ id: 'mlT', x: 640, y: 62, text: n ? 'merges learned, in order' : 'no merges yet', c: 'm', size: 13 }]) });
  const word = (toks, y, sub) => ({ tokens: aiTokenRow(toks, y, 6).map((k, i) => Object.assign(k, { id: 'nw' + i, c: 'a' })), labels: [{ id: 'nwT', x: 480, y: y + 44, text: sub, c: 'm', size: 13, anchor: 'middle' }] });
  const first = D.merges[0]; const vocab = D.base + nm;
  const newTok = D.encode('replaying', nm);
  const s = [];
  s.push(aiStep('A model reads numbers, not letters. So text is first cut into pieces called tokens, and each piece gets an id.', [], { tokens: aiTokenRow(['re', 'play', 'ing', ' it'], 230, 10).map((k, i) => Object.assign(k, { sub: 'id ' + [57, 12, 31, 8][i] })) }));
  s.push(aiStep('One token per whole word needs a huge word list. A word it never saw, like replaying, gets no id at all.', ['nw0'], aiScene({ tokens: D.words.map(([w], i) => ({ id: 'v' + i, x: 140 + (i % 3) * 170, y: 140 + Math.floor(i / 3) * 70, text: w, c: 'l' })) }, { tokens: [{ id: 'nw0', x: 480, y: 380, text: 'replaying', c: 'bad', dash: true, sub: 'not in the vocabulary' }] })));
  s.push(aiStep('One token per letter never misses a word, but even short text becomes a long row. Long rows cost more.', [], word('replaying'.split(''), 260, '9 tokens for one word')));
  s.push(aiStep('Byte-pair encoding sits between the two. It starts from letters, using a small practice text.', [], corpus(D.states[0])));
  s.push(aiStep('Count every pair of neighbouring tokens. The most common pair is ' + first[0] + ' + ' + first[1] + ', seen ' + first[2] + ' times.', ['pb0'], aiScene(corpus(D.states[0], [first[0], first[1]]), pairBars(D.tops[0]))));
  s.push(aiStep('Merge that pair into one new token, ' + first[0] + first[1] + ', everywhere it appears. The vocabulary grows by one.', [], aiScene(corpus(D.states[1], [first[0] + first[1]]), mergeList(1))));
  s.push(aiStep(nm ? 'Repeat: count, merge the top pair, again and again. Your slider runs ' + nm + ' merge' + (nm > 1 ? 's' : '') + '.' : 'Your slider is at 0 merges, so the text is still plain letters. Slide it right.', nm ? ['ml' + (nm - 1)] : [], aiScene(corpus(D.states[nm]), mergeList(nm))));
  const whole = D.words.filter((w, r) => D.states[nm][r].length === 1).map((w) => w[0]);
  const wholeTxt = whole.length === D.words.length ? 'Every practice word is now one token. ' : whole.length ? whole.join(', ') + (whole.length > 1 ? ' are now one token each. ' : ' is now one token. ') : 'No whole word is one token yet. ';
  s.push(aiStep(wholeTxt + 'Vocabulary: ' + D.base + ' letters + ' + nm + ' merge' + (nm === 1 ? '' : 's') + ' = ' + vocab + '.', [], aiScene(corpus(D.states[nm]), mergeList(nm))));
  s.push(aiStep('A new word is split by replaying the merges in order. Here replaying becomes ' + newTok.length + ' token' + (newTok.length > 1 ? 's' : '') + ': ' + newTok.join(' · ') + '.', ['nw0'], aiScene(word(newTok, 300, newTok.length + ' tokens instead of 9 letters'), mergeList(nm))));
  s.push(aiStep('Nothing is ever unknown. A rare word falls back to smaller pieces, down to single letters if needed.', [], word(D.encode('replayer', nm), 300, 'replayer, never seen, still splits')));
  s.push(aiStep('Tokens are how cost is counted. Prices and length limits are measured in tokens, and some languages need more.', [], word(newTok, 300, 'cost and context are counted in tokens')));
  s.push(aiStep('Real tokenizers learn tens of thousands of merges from huge amounts of text. They often start from raw bytes.', [], aiScene(corpus(D.states[nm]), mergeList(nm))));
  return s;
}

// ---------- AI now: evals and benchmarks ----------
function aiEvals(p) {
  const n = Math.max(20, Math.round(p));
  const pa = 0.72; const pb = 0.67;
  const se = (q) => Math.sqrt((q * (1 - q)) / n);
  const ma = 1.96 * se(pa); const mb = 1.96 * se(pb); const md = 1.96 * Math.sqrt(se(pa) * se(pa) + se(pb) * se(pb));
  const real = pa - pb > md;
  const pts = (v) => Math.round(v * 1000) / 10;
  const model = { id: 'model', x: 40, y: 220, w: 180, h: 90, label: 'model', sub: 'takes the exam', c: 'b' };
  const exam = (id, y, label, sub, on) => ({ id, x: 600, y, w: 320, h: 80, label, sub, c: on ? 'a' : 'l', op: on === false ? 0.5 : 1 });
  const exams = (hot) => ({ boxes: [exam('mc', 80, 'answer key', 'multiple choice, e.g. MMLU', hot === 'mc' || (hot ? false : undefined)), exam('tests', 230, 'unit tests', 'code must pass, e.g. SWE-bench', hot === 'tests' || (hot ? false : undefined)), exam('judge', 380, 'a judge', 'a model or people pick the better answer', hot === 'judge' || (hot ? false : undefined))] });
  const arrow = (to) => ({ arrows: [{ id: 'ex', from: 'model', to, c: 'a', w: 3 }] });
  const Yv = (v) => aiR(470 - v * 380);
  const bar = (id, x, q, m, c, label) => ({ bars: [{ id, x, y: Yv(q), w: 90, h: aiR(q * 380), c, label, ly: 494, val: pts(q) + '%', vy: Yv(q + m) - 10 }],
    paths: [{ id: id + 'e', pts: [[x + 45, Yv(Math.max(0, q - m))], [x + 45, Yv(Math.min(1, q + m))]], c: 't', w: 2.5 }, { id: id + 't', pts: [[x + 30, Yv(Math.min(1, q + m))], [x + 60, Yv(Math.min(1, q + m))]], c: 't', w: 2.5 }, { id: id + 'b', pts: [[x + 30, Yv(Math.max(0, q - m))], [x + 60, Yv(Math.max(0, q - m))]], c: 't', w: 2.5 }] });
  const scores = aiScene(bar('bA', 300, pa, ma, 'a', 'model A'), bar('bB', 480, pb, mb, 'b', 'model B'), { paths: [{ id: 'base', pts: [[270, 470], [600, 470]], c: 'l', w: 1.5 }], labels: [
    { id: 'nq', x: 660, y: 140, text: n.toLocaleString('en-US') + ' questions', c: 't', size: 18, weight: 700, mono: true },
    { id: 'mA', x: 660, y: 176, text: 'A: ±' + pts(ma) + ' points', c: 'a', size: 14, mono: true },
    { id: 'mB', x: 660, y: 202, text: 'B: ±' + pts(mb) + ' points', c: 'b', size: 14, mono: true },
    { id: 'mD', x: 660, y: 238, text: 'gap 5 ± ' + pts(md) + ' points', c: real ? 'ok' : 'bad', size: 15, weight: 700, mono: true }
  ] });
  const leak = { boxes: [{ id: 'leak', x: 300, y: 70, w: 270, h: 70, label: 'test questions leaked', sub: 'into the training data', c: 'bad', dash: true }] };
  const satur = (() => { const yrs = [0, 1, 2, 3, 4]; const v = [0.42, 0.61, 0.78, 0.88, 0.92]; return { paths: [{ id: 'sAx', pts: [[300, 120], [300, 460], [880, 460]], c: 'l', w: 1.5 }, { id: 'sat', pts: yrs.map((x, i) => [300 + x * 140, aiR(460 - v[i] * 330)]), c: 'a', w: 3.5 }, { id: 'cap', pts: [[300, aiR(460 - 0.95 * 330)], [880, aiR(460 - 0.95 * 330)]], c: 'm', w: 1.5, dash: true }],
    labels: [{ id: 'sY', x: 310, y: 112, text: '↑ best score on one benchmark', c: 'm', size: 13 }, { id: 'sX', x: 880, y: 484, text: 'years →', c: 'm', size: 13, anchor: 'end' }, { id: 'sN', x: 880, y: 512, text: 'illustrative shape, not measured data', c: 'm', size: 12, anchor: 'end' }] }; })();
  const s = [];
  s.push(aiStep('A benchmark is a fixed exam. Every model gets the same questions, marked the same way, so scores can be compared.', ['model'], aiScene({ boxes: [model] }, exams())));
  s.push(aiStep('Some exams have an answer key. MMLU asks multiple-choice questions across 57 subjects and counts the right ones.', ['mc'], aiScene({ boxes: [model] }, exams('mc'), arrow('mc'))));
  s.push(aiStep('Code can be marked by tests. SWE-bench gives real bug reports from GitHub; a fix counts only if the project’s tests pass.', ['tests'], aiScene({ boxes: [model] }, exams('tests'), arrow('tests'))));
  s.push(aiStep('Open answers need a judge: people voting, or a strong model. Judges have habits, such as liking longer answers.', ['judge'], aiScene({ boxes: [model] }, exams('judge'), arrow('judge'))));
  s.push(aiStep('One number hides a lot. HELM reports many measures across many tasks, not only accuracy.', [], aiScene({ boxes: [model] }, exams(), { arrows: [{ id: 'e1', from: 'model', to: 'mc', c: 'm' }, { id: 'e2', from: 'model', to: 'tests', c: 'm' }, { id: 'e3', from: 'model', to: 'judge', c: 'm' }] })));
  s.push(aiStep('A score is an estimate. Model A gets 72% and model B 67% on the same ' + n.toLocaleString('en-US') + ' questions.', ['bA', 'bB'], scores));
  s.push(aiStep('Each score has a margin of error: how far luck alone could move it. With ' + n.toLocaleString('en-US') + ' questions, A’s is about ±' + pts(ma) + ' points.', ['bAe', 'mA'], scores));
  s.push(aiStep(real ? 'The 5-point gap is bigger than its margin of ±' + pts(md) + ', so A is very likely better.' : 'The 5-point gap is smaller than its margin of ±' + pts(md) + ', so this exam cannot tell A from B. Add questions.', ['mD'], scores));
  s.push(aiStep('Leaks inflate scores. If test questions were in the training data, the model may remember answers instead of working them out.', ['leak'], aiScene(scores, leak)));
  s.push(aiStep('Benchmarks also saturate. Once top models score above 90%, the exam cannot tell them apart, so harder ones appear.', ['sat'], satur));
  s.push(aiStep('Easy tests can flatter too. Finding one fact in a long text is simpler than the harder tasks in RULER.', ['cap'], satur));
  s.push(aiStep('Keeping tests private helps against leaks. People are also trying double-blind setups so private scores can be trusted.', ['leak'], aiScene(scores, leak)));
  s.push(aiStep('The best eval is your own: real examples from your task, kept out of training and marked consistently.', ['model'], aiScene({ boxes: [model] }, exams())));
  return s;
}

// ---------- AI now: distillation ----------
function aiDistill(p) {
  const T = Math.round(p * 10) / 10;
  const cls = ['cat', 'tiger', 'dog', 'car', 'banana'];
  const zt = [6, 3.5, 3, -1, -2];
  const z0 = [1, 0.6, 0.5, 0.4, 0.3];
  const qT = aiSoftmax(zt, T); const q1 = aiSoftmax(zt, 1);
  const kl = (P, Q) => P.reduce((s, v, i) => s + (v > 0 ? v * Math.log(v / Q[i]) : 0), 0);
  // train the student's five logits to match the teacher's soft targets at temperature T (gradient of the cross-entropy)
  let z = z0.slice();
  for (let it = 0; it < 300; it++) { const q = aiSoftmax(z, T); z = z.map((v, i) => v - 1.0 * (q[i] - qT[i]) / T); }
  const qs0 = aiSoftmax(z0, T); const qs1 = aiSoftmax(z, T);
  const teacher = { id: 'teacher', x: 40, y: 70, w: 210, h: 90, label: 'teacher', sub: 'big · slow · accurate', c: 'b' };
  const student = { id: 'student', x: 40, y: 330, w: 210, h: 90, label: 'student', sub: 'small · fast', c: 'a' };
  const chart = (id, y0, probs, c, title) => ({ bars: probs.map((v, i) => ({ id: id + i, x: 330 + i * 120, y: aiR(y0 - v * 150), w: 70, h: aiR(v * 150), c, label: cls[i], ly: y0 + 18, val: aiPct(v), vy: aiR(y0 - v * 150 - 7) })),
    labels: [{ id: id + 'T', x: 330, y: y0 - 166, text: title, c: 'm', size: 13 }] });
  const hard = [1, 0, 0, 0, 0];
  const kl0 = kl(qT, qs0); const kl1 = kl(qT, qs1);
  const s = [];
  s.push(aiStep('A big teacher model is accurate, but slow and costly to run. We want something that fits on a phone.', ['teacher'], { boxes: [teacher, Object.assign({}, student, { op: 0.4 })] }));
  s.push(aiStep('The student is a much smaller model. Trained on its own from labels, it usually ends up less accurate.', ['student'], { boxes: [teacher, student] }));
  s.push(aiStep('Normal training uses hard labels: this photo is a cat, 100%, and every other answer gets 0.', ['h0'], aiScene({ boxes: [teacher, student] }, chart('h', 470, hard, 'm', 'hard label for one photo'))));
  s.push(aiStep('The teacher gives more: cat ' + aiPct(q1[0]) + ', tiger ' + aiPct(q1[1]) + ', dog ' + aiPct(q1[2]) + ', and almost nothing for car or banana.', ['t0', 't1', 't2'], aiScene({ boxes: [teacher, student] }, chart('t', 230, q1, 'b', 'teacher at temperature 1'))));
  s.push(aiStep('Those small numbers carry knowledge: a cat looks more like a tiger than like a car. Hard labels throw that away.', ['t1', 't3'], aiScene({ boxes: [teacher, student] }, chart('t', 230, q1, 'b', 'teacher at temperature 1'))));
  s.push(aiStep('Temperature T softens them: it divides the teacher’s scores before softmax turns them into chances. At your T = ' + T + ', tiger gets ' + aiPct(qT[1]) + '.', ['t1'], aiScene({ boxes: [teacher, student] }, chart('t', 230, qT, 'b', 'teacher at temperature ' + T))));
  s.push(aiStep('Before training, the student’s guesses at T = ' + T + ' are nearly flat. Their gap from the teacher, the KL divergence, is ' + aiFmt(kl0, 3) + '.', ['s0', 's1', 's2', 's3', 's4'], aiScene({ boxes: [teacher, student] }, chart('t', 230, qT, 'b', 'teacher at temperature ' + T), chart('s', 480, qs0, 'a', 'student before training'))));
  s.push(aiStep('Training nudges the student to match the teacher’s soft bars. After 300 small steps the gap is ' + aiFmt(kl1, 4) + '.', ['s0', 's1', 's2', 's3', 's4'], aiScene({ boxes: [teacher, student], arrows: [{ id: 'teach', from: 'teacher', to: 'student', c: 'a', w: 3, label: 'soft targets', lx: 52 }] }, chart('t', 230, qT, 'b', 'teacher at temperature ' + T), chart('s', 480, qs1, 'a', 'student after training'))));
  s.push(aiStep('In practice the loss, the error score, mixes both. The student matches the soft targets and still gets the hard label right.', ['student'], aiScene({ boxes: [teacher, student] }, chart('t', 230, qT, 'b', 'teacher at temperature ' + T), chart('s', 480, qs1, 'a', 'student after training'))));
  s.push(aiStep('DistilBERT is a well-known case. It is about 40% smaller and 60% faster than BERT, and keeps about 97% of its skill.', ['student'], { boxes: [Object.assign({}, teacher, { label: 'BERT' }), Object.assign({}, student, { label: 'DistilBERT', sub: '40% smaller · 60% faster' })], arrows: [{ id: 'teach', from: 'teacher', to: 'student', c: 'a', w: 3, label: 'distil', lx: 34 }] }));
  s.push(aiStep('The same trick works for reasoning. Train a fast model on a slow model’s worked answers to copy its careful habits.', ['teach'], { boxes: [Object.assign({}, teacher, { label: 'slow reasoner', sub: 'writes steps' }), Object.assign({}, student, { label: 'fast model', sub: 'answers at once' })], arrows: [{ id: 'teach', from: 'teacher', to: 'student', c: 'a', w: 3, label: 'worked answers', lx: 64 }] }));
  s.push(aiStep('A student rarely beats its teacher. Some model licences also forbid training on their outputs, so check first.', ['teacher'], { boxes: [teacher, student] }));
  return s;
}

// ---------- ML: gradient boosting ----------
const AI_GB = (() => {
  const f = (x) => 3 + 2 * Math.sin(x * 0.8) + 0.25 * x;
  const rnd = aiRng(3); const rnd2 = aiRng(5);
  const X = []; const Y = []; const VX = []; const VY = [];
  for (let i = 0; i < 24; i++) { const x = aiR(0.2 + i * 0.41); X.push(x); Y.push(f(x) + aiGauss(rnd) * 0.8); }
  for (let i = 0; i < 24; i++) { const x = 0.4 + i * 0.4; VX.push(x); VY.push(f(x) + aiGauss(rnd2) * 0.8); }
  const lr = 0.5; const R = 100;
  const F0 = Y.reduce((a, b) => a + b, 0) / Y.length;
  const xs = X.slice().sort((a, b) => a - b);
  const cuts = []; for (let i = 0; i + 1 < xs.length; i++) cuts.push((xs[i] + xs[i + 1]) / 2);
  const stumps = [];
  const at = (k, x) => stumps.slice(0, k).reduce((s, t) => s + lr * (x < t.t ? t.l : t.r), F0);
  const mse = (P, T) => P.reduce((s, q, i) => s + (q - T[i]) * (q - T[i]), 0) / P.length;
  let pred = X.map(() => F0);
  const tr = [mse(pred, Y)]; const te = [mse(VX.map(() => F0), VY)];
  for (let r = 0; r < R; r++) {
    // fit a one-split tree (a stump) to the current residuals: best cut by squared error
    const res = Y.map((y, i) => y - pred[i]);
    let best = null;
    cuts.forEach((t) => {
      let sl = 0; let nl = 0; let sr = 0; let nr = 0;
      X.forEach((x, i) => { if (x < t) { sl += res[i]; nl++; } else { sr += res[i]; nr++; } });
      const l = sl / nl; const rr = sr / nr;
      const sse = X.reduce((s, x, i) => s + Math.pow(res[i] - (x < t ? l : rr), 2), 0);
      if (!best || sse < best.sse) best = { t, l, r: rr, sse };
    });
    stumps.push(best);
    pred = X.map((x, i) => pred[i] + lr * (x < best.t ? best.l : best.r));
    tr.push(mse(pred, Y)); te.push(mse(VX.map((x) => at(r + 1, x)), VY));
  }
  let bestK = 0; te.forEach((e, k) => { if (e < te[bestK]) bestK = k; });
  return { X, Y, lr, R, F0, stumps, at, tr, te, bestK };
})();
function aiGBoost(p) {
  const D = AI_GB; const N = Math.max(1, Math.min(D.R, Math.round(p)));
  const [sx, sy] = aiScale(70, 560, 480, 60, 0, 10);
  const axes = { x0: 70, y0: 480, x1: 560, y1: 60, xl: 'size →', yl: '↑ price' };
  const cl = (v) => aiR(Math.max(60, Math.min(480, sy(v))));
  const dots = () => ({ points: D.X.map((x, i) => ({ id: 'd' + i, x: sx(x), y: cl(D.Y[i]), c: 'a', r: 6 })) });
  const grid = []; for (let i = 0; i <= 200; i++) grid.push(i / 20);
  const model = (k) => ({ paths: [{ id: 'fit', pts: grid.map((x) => [sx(x), cl(D.at(k, x))]), c: 't', w: 3.5 }] });
  const res = (k) => ({ paths: D.X.map((x, i) => ({ id: 'r' + i, pts: [[sx(x), cl(D.Y[i])], [sx(x), cl(D.at(k, x))]], c: 'c', w: 2, dash: true })) });
  const ro = (k) => ({ labels: [
    { id: 'ro1', x: 630, y: 90, text: k + (k === 1 ? ' tree' : ' trees'), c: 't', size: 18, weight: 700, mono: true },
    { id: 'ro2', x: 630, y: 122, text: 'training error  ' + aiFmt(D.tr[k]), c: 'a', size: 15, mono: true },
    { id: 'ro3', x: 630, y: 148, text: 'held-out error  ' + aiFmt(D.te[k]), c: 'b', size: 15, mono: true },
    { id: 'ro4', x: 630, y: 174, text: 'learning rate   ' + D.lr, c: 'm', size: 13, mono: true }
  ] });
  const top = Math.max(D.tr[0], D.te[0]);
  const CX = (k) => aiR(630 + (k / D.R) * 280); const CY = (e) => aiR(470 - Math.min(1, e / top) * 200);
  const chart = () => ({ paths: [{ id: 'chAx', pts: [[630, 262], [630, 470], [910, 470]], c: 'l', w: 1.5 },
    { id: 'chTr', pts: D.tr.map((e, k) => [CX(k), CY(e)]), c: 'a', w: 2.5 }, { id: 'chTe', pts: D.te.map((e, k) => [CX(k), CY(e)]), c: 'b', w: 2.5 }],
  points: [{ id: 'chBest', x: CX(D.bestK), y: CY(D.te[D.bestK]), c: 'b', r: 7, ring: true }, { id: 'chYou', x: CX(N), y: CY(D.te[N]), c: 't', r: 6 }],
  labels: [{ id: 'chT', x: 630, y: 248, text: 'error as trees are added', c: 'm', size: 13 }, { id: 'chX', x: 910, y: 492, text: 'trees 0 … ' + D.R + ' →', c: 'm', size: 12, anchor: 'end' }] });
  const s1 = D.stumps[0];
  const stump = { paths: [{ id: 'st1', pts: [[sx(0), cl(D.F0 + s1.l)], [sx(s1.t), cl(D.F0 + s1.l)], [sx(s1.t), cl(D.F0 + s1.r)], [sx(10), cl(D.F0 + s1.r)]], c: 'c', w: 3, dash: true }],
    labels: [{ id: 'stQ', x: 630, y: 240, text: 'tree 1: size above ' + aiFmt(s1.t, 1) + '?', c: 't', size: 15, mono: true },
      { id: 'stL', x: 630, y: 268, text: 'no  → add ' + aiFmt(s1.l), c: 'c', size: 14, mono: true }, { id: 'stR', x: 630, y: 292, text: 'yes → add ' + aiFmt(s1.r), c: 'c', size: 14, mono: true }] };
  const base = () => aiScene({ axes }, dots());
  const tail = N < D.bestK ? 'Your ' + N + (N === 1 ? ' tree stops' : ' trees stop') + ' early; more would still help.' : N === D.bestK ? 'Your ' + N + ' trees land right on it.' : 'Your trees past that mostly chase random quirks.';
  const s = [];
  s.push(aiStep('Twenty-four houses: size across, price up. We want a model that predicts the price from the size.', [], base()));
  s.push(aiStep('Boosting starts with the plainest guess there is: every house costs the average, ' + aiFmt(D.F0, 1) + '.', ['fit'], aiScene(base(), model(0), ro(0))));
  s.push(aiStep('The residuals are what the guess gets wrong: real price minus predicted price, one dashed line per house.', [], aiScene(base(), model(0), res(0), ro(0))));
  s.push(aiStep('Fit a tiny tree to the residuals. It asks one question, “is the size above ' + aiFmt(s1.t, 1) + '?”, and gives one average answer per side.', ['st1', 'stQ'], aiScene(base(), model(0), res(0), stump)));
  s.push(aiStep('Add that tree to the model, but shrunk by the learning rate ' + D.lr + ', a small step size. The curve takes one small step toward the data.', ['fit'], aiScene(base(), model(1), ro(1))));
  s.push(aiStep('The new residuals are smaller. Tree 2 is fitted to these leftovers, not to the prices themselves.', ['ro2'], aiScene(base(), model(1), res(1), ro(1))));
  s.push(aiStep('Each new tree fixes part of what the team still gets wrong. After 3 trees the training error is ' + aiFmt(D.tr[3]) + ', down from ' + aiFmt(D.tr[0]) + '.', ['fit', 'ro2'], aiScene(base(), model(3), res(3), ro(3))));
  s.push(aiStep('After your ' + N + (N === 1 ? ' tree' : ' trees') + ' it is ' + aiFmt(D.tr[N]) + '. Many small steps draw a curve that no single tiny tree could.', ['fit'], aiScene(base(), model(N), ro(N))));
  s.push(aiStep('Training error only ever falls. Error on held-out houses, which the model never saw, falls too, then stops improving.', ['chTr', 'chTe'], aiScene(base(), model(N), ro(N), chart())));
  s.push(aiStep('Held-out error is lowest at ' + D.bestK + ' trees (' + aiFmt(D.te[D.bestK]) + '). ' + tail, ['chBest', 'chYou'], aiScene(base(), model(N), ro(N), chart())));
  s.push(aiStep('A smaller learning rate needs more trees but usually works better on new data. Tune the rate and tree count together.', ['ro4'], aiScene(base(), model(N), ro(N), chart())));
  const pair = (c1, c2) => ({ boxes: [{ id: 'rf', x: 80, y: 150, w: 360, h: 110, label: 'random forest', sub: 'many trees side by side, averaged', c: c1 }, { id: 'gb', x: 520, y: 150, w: 360, h: 110, label: 'boosting', sub: 'trees in a row, each fixes the last', c: c2 }] });
  s.push(aiStep('A random forest grows its trees side by side and averages them. Boosting grows them one by one, each fixing the last.', ['gb'], pair('b', 'a')));
  s.push(aiStep('XGBoost and LightGBM are fast versions of this recipe. They are a strong first choice for tables of data.', ['gb'], aiScene(pair('b', 'a'), { labels: [{ id: 'lib', x: 700, y: 310, text: 'XGBoost · LightGBM · CatBoost', c: 'a', size: 15, anchor: 'middle', mono: true }] })));
  return s;
}

// ---------- ML: regularization, L1 against L2 ----------
const AI_REG = (() => {
  const A = [[2, 0.7], [0.7, 1.2]]; const ws = [2.2, 0.6];
  const L = (w) => { const d0 = w[0] - ws[0]; const d1 = w[1] - ws[1]; return A[0][0] * d0 * d0 + 2 * A[0][1] * d0 * d1 + A[1][1] * d1 * d1; };
  // L2: minimise L(w) + λ|w|²  →  (A + λI) w = A w*
  const ridge = (lam) => { const a = A[0][0] + lam; const b = A[0][1]; const d = A[1][1] + lam; const r0 = A[0][0] * ws[0] + A[0][1] * ws[1]; const r1 = A[1][0] * ws[0] + A[1][1] * ws[1]; const det = a * d - b * b; return [(d * r0 - b * r1) / det, (a * r1 - b * r0) / det]; };
  // L1: minimise L(w) + λ(|w1| + |w2|) by exact coordinate steps (soft thresholding)
  const soft = (z, g) => (z > g ? z - g : z < -g ? z + g : 0);
  const lasso = (lam) => { const w = ws.slice(); for (let it = 0; it < 400; it++) for (let j = 0; j < 2; j++) { const k = 1 - j; w[j] = soft(ws[j] - (A[j][k] * (w[k] - ws[k])) / A[j][j], lam / (2 * A[j][j])); } return w; };
  let zeroAt = null; for (let i = 0; i <= 600 && zeroAt === null; i++) if (Math.abs(lasso(i / 100)[1]) < 1e-9) zeroAt = i / 100;
  const tr = A[0][0] + A[1][1]; const det = A[0][0] * A[1][1] - A[0][1] * A[0][1]; const disc = Math.sqrt((tr * tr) / 4 - det);
  const e1 = tr / 2 + disc; const e2 = tr / 2 - disc;
  const n1 = Math.hypot(A[0][1], e1 - A[0][0]); const v1 = [A[0][1] / n1, (e1 - A[0][0]) / n1]; const v2 = [-v1[1], v1[0]];
  // every point where L(w) = c: an ellipse around w*
  const ring = (c) => { const out = []; for (let i = 0; i <= 72; i++) { const t = (2 * Math.PI * i) / 72; const a = Math.sqrt(c / e1) * Math.cos(t); const b = Math.sqrt(c / e2) * Math.sin(t); out.push([ws[0] + a * v1[0] + b * v2[0], ws[1] + a * v1[1] + b * v2[1]]); } return out; };
  return { ws, L, ridge, lasso, zeroAt, ring };
})();
function aiReg(p) {
  const D = AI_REG; const lam = Math.round(p * 10) / 10;
  const S = 75; const ox = 290; const oy = 300;
  const X = (v) => aiR(Math.max(30, Math.min(600, ox + v * S))); const Y = (v) => aiR(Math.max(30, Math.min(522, oy - v * S)));
  const axes = { paths: [{ id: 'axX', pts: [[X(-3), Y(0)], [X(4), Y(0)]], c: 'l', w: 1.5 }, { id: 'axY', pts: [[X(0), Y(-3)], [X(0), Y(3)]], c: 'l', w: 1.5 }],
    labels: [{ id: 'axXt', x: 586, y: Y(0) + 24, text: 'w1 →', c: 'm', size: 13, anchor: 'end' }, { id: 'axYt', x: X(0) + 10, y: Y(3) + 4, text: '↑ w2', c: 'm', size: 13 }] };
  const star = { points: [{ id: 'wstar', x: X(D.ws[0]), y: Y(D.ws[1]), c: 't', r: 6, label: 'w*', lx: 10, ly: -10 }] };
  const rings = (extra) => ({ paths: [0.15, 0.6].map((c, i) => ({ id: 'ring' + i, pts: D.ring(c).map((q) => [X(q[0]), Y(q[1])]), c: 'm', w: 1.5, op: 0.7 }))
    .concat(extra ? [{ id: 'touch', pts: D.ring(Math.max(1e-6, D.L(extra))).map((q) => [X(q[0]), Y(q[1])]), c: 't', w: 2, dash: true }] : []) });
  const r2 = D.ridge(lam); const r1 = D.lasso(lam);
  const circle = (w, show) => { const R = Math.hypot(w[0], w[1]); const pts = []; for (let i = 0; i <= 72; i++) { const t = (2 * Math.PI * i) / 72; pts.push([X(R * Math.cos(t)), Y(R * Math.sin(t))]); } return { id: 'l2shape', pts, c: 'b', w: 3, op: show ? 1 : 0 }; };
  const diamond = (w) => { const R = Math.abs(w[0]) + Math.abs(w[1]); return { id: 'l1shape', pts: [[X(R), Y(0)], [X(0), Y(R)], [X(-R), Y(0)], [X(0), Y(-R)], [X(R), Y(0)]], c: 'c', w: 3 }; };
  const dot = (id, w, c, label, ly) => ({ id, x: X(w[0]), y: Y(w[1]), c, r: 8, ring: true, label, lx: 14, ly: ly || 5 });
  const f2 = (w) => '(' + aiFmt(w[0]) + ', ' + aiFmt(w[1]) + ')';
  const zero = Math.abs(r1[1]) < 1e-9;
  const bars = () => {
    const B = (id, x, v, c, label) => ({ id, x, y: aiR(v >= 0 ? 400 - v * 70 : 400), w: 34, h: aiR(Math.abs(v) * 70), c, label, ly: 422, val: aiFmt(v), vy: aiR(400 - Math.max(0, v) * 70 - 7) });
    return { bars: [B('bn1', 640, D.ws[0], 'm', 'w1'), B('bn2', 680, D.ws[1], 'm', 'w2'), B('b21', 760, r2[0], 'b', 'w1'), B('b22', 800, r2[1], 'b', 'w2'), B('b11', 880, r1[0], 'c', 'w1'), B('b12', 920, r1[1], 'c', 'w2')],
      labels: [{ id: 'bT', x: 640, y: 210, text: 'weights at λ = ' + lam, c: 'm', size: 13 }, { id: 'bN', x: 677, y: 450, text: 'none', c: 'm', size: 12, anchor: 'middle' },
        { id: 'bL2', x: 797, y: 450, text: 'L2', c: 'b', size: 12, anchor: 'middle', weight: 700 }, { id: 'bL1', x: 917, y: 450, text: 'L1', c: 'c', size: 12, anchor: 'middle', weight: 700 }] };
  };
  const ro = { labels: [{ id: 'roL', x: 640, y: 90, text: 'λ = ' + lam, c: 't', size: 18, weight: 700, mono: true },
    { id: 'ro2', x: 640, y: 122, text: 'L2 → ' + f2(r2), c: 'b', size: 15, mono: true }, { id: 'ro1', x: 640, y: 148, text: 'L1 → ' + f2(r1), c: 'c', size: 15, mono: true }] };
  const path = (fn, id, c) => { const pts = []; for (let i = 0; i <= 30; i++) { const w = fn(i / 10); pts.push([X(w[0]), Y(w[1])]); } return { id, pts, c, w: 3 }; };
  const base = () => aiScene(axes, rings(), star);
  const s = [];
  s.push(aiStep('This model has two weights, w1 and w2. Each ring is one level of error, and the centre, w*, fits the data best.', ['wstar'], base()));
  s.push(aiStep('Fitting the data this closely can need big weights that overreact to random quirks. Regularization charges a price for big weights.', ['wstar'], base()));
  s.push(aiStep('L2, also called ridge, adds a price λ × (w1² + w2²), where λ sets its strength. Equal L2 prices form a circle around zero.', ['l2shape'], aiScene(base(), { paths: [circle(r2.map((v) => v || 0.6), true)] }, ro)));
  s.push(aiStep(lam === 0 ? 'At λ = 0 there is no price at all, so L2 stays at w*. Move the slider to add one.'
    : 'The answer is where an error ring first touches a circle. At λ = ' + lam + ', L2 gives ' + f2(r2) + ': both shrink, neither is zero.', ['p2', 'touch'],
  aiScene(axes, rings(r2), star, { paths: [circle(r2, true)], points: [dot('p2', r2, 'b', 'L2', -12)] }, ro)));
  s.push(aiStep('L1, also called lasso, adds a price λ × (|w1| + |w2|), where |w| drops the minus sign. Equal L1 prices form a diamond.', ['l1shape'], aiScene(base(), { paths: [diamond(r1[0] ? r1 : [0.6, 0])] }, ro)));
  s.push(aiStep(zero ? 'At λ = ' + lam + ' the error ring touches the diamond at a corner, so w2 is exactly 0. L1 keeps w1 = ' + aiFmt(r1[0]) + '.'
    : lam === 0 ? 'At λ = 0 L1 also stays at w*. Raise λ to about ' + D.zeroAt + ' and the ring reaches the corner, where w2 is exactly 0.' : 'At λ = ' + lam + ' the ring touches a flat side: L1 gives ' + f2(r1) + '. At λ ≈ ' + D.zeroAt + ' it reaches the corner and w2 hits 0.', ['p1', 'touch'],
  aiScene(axes, rings(r1), star, { paths: [diamond(r1)], points: [dot('p1', r1, 'c', 'L1', 18)] }, ro)));
  s.push(aiStep(lam === 0 ? 'Side by side at λ = 0 both are the plain fit. Raise λ to see them part ways.'
    : 'Side by side at λ = ' + lam + ': L2 shrinks both weights. L1 shrinks too, but drives the weaker weight toward exactly zero.', ['b12', 'b22'], aiScene(axes, rings(), star, { points: [dot('p2', r2, 'b', 'L2', -12), dot('p1', r1, 'c', 'L1', 18)] }, ro, bars())));
  s.push(aiStep('As λ grows from 0 to 3, the L2 answer glides toward zero but never reaches it. L1 sets w2 to exactly 0 at λ ≈ ' + D.zeroAt + '.', ['path2', 'path1'], aiScene(axes, rings(), star, { paths: [path(D.ridge, 'path2', 'b'), path(D.lasso, 'path1', 'c')], points: [dot('p2', r2, 'b', 'L2', -12), dot('p1', r1, 'c', 'L1', 18)] }, ro)));
  s.push(aiStep('So L1 also picks inputs, because a weight of zero means the model ignores that input. L2 keeps every input, only quieter.', ['b11', 'b12'], aiScene(axes, rings(), star, { points: [dot('p2', r2, 'b', 'L2', -12), dot('p1', r1, 'c', 'L1', 18)] }, ro, bars())));
  s.push(aiStep('To choose λ, try several values and keep the one that scores best on held-back data. This is done with cross-validation.', ['roL'], aiScene(axes, rings(), star, { points: [dot('p2', r2, 'b', 'L2', -12), dot('p1', r1, 'c', 'L1', 18)] }, ro, bars())));
  return s;
}

// ---------- ML: k-fold cross-validation ----------
const AI_CV = (() => {
  const rnd = aiRng(9);
  const X = []; const Y = [];
  for (let i = 0; i < 20; i++) { const x = aiR(0.3 + i * 0.49); X.push(x); Y.push(2 + 1.5 * x - 0.12 * x * x + aiGauss(rnd) * 0.8); }
  // a fixed shuffle, so folds are random-looking but the same for everyone
  const order = X.map((x, i) => i); const r2 = aiRng(21);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(r2() * (i + 1)); const t = order[i]; order[i] = order[j]; order[j] = t; }
  const rank = []; order.forEach((idx, pos) => { rank[idx] = pos; });
  const mse = (g, idx) => idx.reduce((s, i) => s + Math.pow(g(X[i]) - Y[i], 2), 0) / idx.length;
  const all = X.map((x, i) => i);
  const train = {}; for (let d = 1; d <= 6; d++) train[d] = mse(aiPolyFit(X, Y, d), all);
  const cache = {};
  const cv = (k) => {
    if (cache[k]) return cache[k];
    const fold = (i) => rank[i] % k;
    const out = { fold, by: {} };
    for (let d = 1; d <= 6; d++) {
      const scores = []; const fits = [];
      for (let f = 0; f < k; f++) {
        const tr = all.filter((i) => fold(i) !== f); const te = all.filter((i) => fold(i) === f);
        const g = aiPolyFit(tr.map((i) => X[i]), tr.map((i) => Y[i]), d);
        fits.push(g); scores.push(mse(g, te));
      }
      out.by[d] = { scores, fits, mean: scores.reduce((a, b) => a + b, 0) / k };
    }
    let best = 1; for (let d = 2; d <= 6; d++) if (out.by[d].mean < out.by[best].mean) best = d;
    out.best = best;
    return (cache[k] = out);
  };
  return { X, Y, train, cv, full: (d) => aiPolyFit(X, Y, d) };
})();
function aiCrossVal(p) {
  const D = AI_CV; const k = Math.max(2, Math.min(10, Math.round(p))); const C = D.cv(k);
  const [sx, sy] = aiScale(70, 560, 480, 60, 0, 10);
  const axes = { x0: 70, y0: 480, x1: 560, y1: 60, xl: 'x →', yl: '↑ y' };
  const cl = (v) => aiR(Math.max(60, Math.min(480, sy(v))));
  const dots = (testFold) => ({ points: D.X.map((x, i) => {
    const test = testFold !== undefined && C.fold(i) === testFold;
    return { id: 'd' + i, x: sx(x), y: cl(D.Y[i]), c: test ? 'b' : 'a', r: test ? 8 : 6, hollow: test, ring: test };
  }) });
  const grid = []; for (let i = 0; i <= 60; i++) grid.push(0.2 + (9.6 * i) / 60);
  const curve = (g, id, c) => ({ paths: [{ id: id || 'fit', pts: grid.map((x) => [sx(x), cl(g(x))]), c: c || 't', w: 3 }] });
  const strip = (on) => {
    const w = aiR(280 / k - 4);
    return { bars: Array.from({ length: k }, (v, f) => ({ id: 'fold' + f, x: aiR(630 + f * (280 / k)), y: 70, w, h: 26, c: f === on ? 'b' : 'a', hollow: f !== on, rx: 5 })),
      labels: [{ id: 'foldT', x: 630, y: 58, text: k + ' folds of about ' + Math.round(20 / k) + ' points', c: 'm', size: 13 }] };
  };
  const foldBars = (d) => {
    const sc = C.by[d].scores; const top = Math.max.apply(null, sc.concat([C.by[d].mean])) || 1; const w = aiR(260 / k - 6);
    return { bars: sc.map((v, f) => ({ id: 'fs' + f, x: aiR(640 + f * (260 / k)), y: aiR(400 - (v / top) * 140), w, h: aiR((v / top) * 140), c: 'b' })),
      paths: [{ id: 'fMean', pts: [[632, aiR(400 - (C.by[d].mean / top) * 140)], [908, aiR(400 - (C.by[d].mean / top) * 140)]], c: 't', w: 2.5, dash: true }],
      labels: [{ id: 'fsT', x: 630, y: 236, text: 'error on each fold, degree ' + d, c: 'm', size: 13 }, { id: 'fsM', x: 908, y: aiR(392 - (C.by[d].mean / top) * 140), text: 'average ' + aiFmt(C.by[d].mean), c: 't', size: 13, anchor: 'end', mono: true }] };
  };
  const chart = () => {
    const top = Math.max(D.train[1], C.by[1].mean, C.by[6].mean) * 1.05;
    const CX = (d) => aiR(640 + ((d - 1) / 5) * 260); const CY = (e) => aiR(460 - Math.min(1, e / top) * 190);
    return { paths: [{ id: 'chAx', pts: [[632, 262], [632, 460], [910, 460]], c: 'l', w: 1.5 },
      { id: 'chTr', pts: [1, 2, 3, 4, 5, 6].map((d) => [CX(d), CY(D.train[d])]), c: 'a', w: 2.5 }, { id: 'chCv', pts: [1, 2, 3, 4, 5, 6].map((d) => [CX(d), CY(C.by[d].mean)]), c: 'b', w: 3 }],
    points: [{ id: 'chBest', x: CX(C.best), y: CY(C.by[C.best].mean), c: 'b', r: 8, ring: true }],
    labels: [{ id: 'chT', x: 632, y: 248, text: 'training error and cross-validation error', c: 'm', size: 13 }, { id: 'chX', x: 910, y: 482, text: 'degree 1 … 6 →', c: 'm', size: 12, anchor: 'end' },
      { id: 'chA', x: 910, y: CY(D.train[6]) + 18, text: 'training', c: 'a', size: 12, anchor: 'end' }, { id: 'chB', x: 910, y: CY(C.by[6].mean) - 8, text: 'cross-validation', c: 'b', size: 12, anchor: 'end' }] };
  };
  const ro = (lines) => ({ labels: lines.map((t, i) => ({ id: 'ro' + i, x: 630, y: 140 + i * 26, text: t, c: i ? 'm' : 't', size: i ? 14 : 16, weight: i ? 500 : 700, mono: true })) });
  const D2 = C.by[2];
  const s = [];
  s.push(aiStep('Twenty measurements. We must pick a model: a line, or a curve of degree 2 to 6. Higher degree means more bendy.', [], aiScene({ axes }, dots())));
  s.push(aiStep('Score curves on the data they learned from and the bendiest always looks best: degree 6 scores ' + aiFmt(D.train[6]) + ', the line ' + aiFmt(D.train[1]) + '.', ['fit'], aiScene({ axes }, dots(), curve(D.full(6)), ro(['training error', 'degree 1: ' + aiFmt(D.train[1]), 'degree 6: ' + aiFmt(D.train[6])]))));
  s.push(aiStep('So hold some points back and test on those instead. With only 20 points, which ones you hold back can change the winner.', ['d0'], aiScene({ axes }, dots(0))));
  s.push(aiStep('k-fold cross-validation cuts the data into k equal parts, called folds. Your k is ' + k + ', so each fold holds about ' + Math.round(20 / k) + ' points.', ['fold0'], aiScene({ axes }, dots(), strip(-1))));
  s.push(aiStep('Round 1: train a degree 2 curve on all folds except the first. Then score it on the first, which it never saw: error ' + aiFmt(D2.scores[0]) + '.', ['fold0', 'fit'], aiScene({ axes }, dots(0), strip(0), curve(D2.fits[0]))));
  s.push(aiStep('Repeat until each fold has been the test set once. Every point gets scored exactly once, by a curve that never saw it.', ['fs0'], aiScene({ axes }, dots(k - 1), strip(k - 1), curve(D2.fits[k - 1]), foldBars(2))));
  s.push(aiStep('Average the ' + k + ' scores to get the cross-validation error. For degree 2 it is ' + aiFmt(D2.mean) + '.', ['fMean', 'fsM'], aiScene({ axes }, dots(), strip(-1), foldBars(2))));
  s.push(aiStep('Do the same for every degree. Training error keeps falling, but cross-validation error is lowest at degree ' + C.best + '.', ['chCv', 'chBest'], aiScene({ axes }, dots(), strip(-1), chart())));
  s.push(aiStep('Pick degree ' + C.best + ', then train it once more on all 20 points. That final curve is the model you keep.', ['fit'], aiScene({ axes }, dots(), curve(D.full(C.best)), strip(-1), chart())));
  s.push(aiStep('More folds train on more data each round but cost more runs. Five or ten folds is the usual choice.', ['fold0'], aiScene({ axes }, dots(), curve(D.full(C.best)), strip(-1), chart())));
  s.push(aiStep('Keep a final test set that cross-validation never touches, for one honest check at the very end.', [], aiScene({ axes }, dots(), curve(D.full(C.best)))));
  return s;
}

// ---------- ML: naive Bayes ----------
const AI_NB = {
  words: ['free', 'win', 'money', 'lunch', 'meeting', 'report'],
  spam: [5, 4, 4, 1, 0, 0],
  ham: [1, 0, 1, 3, 4, 3],
  mail: ['free', 'lunch', 'meeting'],
  prior: 0.5
};
function aiNaiveBayes(p) {
  const D = AI_NB; const a = Math.round(p * 10) / 10; const V = D.words.length;
  const tot = (c) => c.reduce((x, y) => x + y, 0);
  const P = (c, w) => { const n = c[D.words.indexOf(w)]; return (n + a) / (tot(c) + a * V); };
  const pS = D.mail.map((w) => P(D.spam, w)); const pH = D.mail.map((w) => P(D.ham, w));
  const S = pS.reduce((x, y) => x * y, D.prior); const H = pH.reduce((x, y) => x * y, 1 - D.prior);
  const post = S + H > 0 ? S / (S + H) : 0;
  const g = (v) => (v === 0 ? '0' : v.toPrecision(2));
  const bars = (hl) => ({ bars: D.words.flatMap((w, i) => [
    { id: 'bs' + i, x: 70 + i * 80, y: 300 - D.spam[i] * 40, w: 26, h: D.spam[i] * 40, c: 'c', val: String(D.spam[i]), op: !hl || hl.indexOf(w) >= 0 ? 1 : 0.35 },
    { id: 'bh' + i, x: 100 + i * 80, y: 300 - D.ham[i] * 40, w: 26, h: D.ham[i] * 40, c: 'b', val: String(D.ham[i]), op: !hl || hl.indexOf(w) >= 0 ? 1 : 0.35 }
  ]),
  labels: D.words.map((w, i) => ({ id: 'bw' + i, x: 96 + i * 80, y: 324, text: w, c: 't2', size: 13, anchor: 'middle', mono: true }))
    .concat([{ id: 'lgS', x: 70, y: 60, text: '■ in 6 spam emails', c: 'c', size: 13 }, { id: 'lgH', x: 250, y: 60, text: '■ in 6 normal emails', c: 'b', size: 13 }]) });
  const mailRow = (subs, sc) => ({ tokens: D.mail.map((w, i) => ({ id: 'm' + i, x: 140 + i * 150, y: 420, text: w, sub: subs ? subs[i] : '', sc: sc || 't2' })),
    labels: [{ id: 'mT', x: 70, y: 384, text: 'new email:', c: 'm', size: 13 }] });
  const ro = (lines) => ({ labels: lines.map((t, i) => ({ id: 'ro' + i, x: 600, y: 100 + i * 28, text: t[0], c: t[1], size: i ? 14 : 16, weight: i ? 500 : 700, mono: true })) });
  const odds = () => ({ bars: [{ id: 'pS', x: 600, y: 330, w: aiR(300 * post), h: 30, c: 'c', val: aiPct(post) + ' spam', vx: aiR(608 + 300 * post), vy: 351 },
    { id: 'pH', x: 600, y: 380, w: aiR(300 * (1 - post)), h: 30, c: 'b', val: aiPct(1 - post) + ' normal', vx: aiR(608 + 300 * (1 - post)), vy: 401 }] });
  const fmtP = (arr) => arr.map((v) => aiFmt(v, 3));
  const lines = [['α = ' + a, 't'], ['spam:   ' + fmtP(pS).join(' × ') + ' × 0.5', 'c'], ['        = ' + g(S), 'c'], ['normal: ' + fmtP(pH).join(' × ') + ' × 0.5', 'b'], ['        = ' + g(H), 'b']];
  const s = [];
  s.push(aiStep('Twelve emails, already sorted: 6 spam and 6 normal. Count how often each word appears in each pile.', [], bars()));
  s.push(aiStep('“free” appears 5 times in spam and once in normal mail. “meeting” never appears in spam at all.', ['bs0', 'bh0', 'bs4', 'bh4'], bars(['free', 'meeting'])));
  s.push(aiStep('A new email arrives: “free lunch meeting”. Is it spam?', ['m0', 'm1', 'm2'], aiScene(bars(D.mail), mailRow())));
  s.push(aiStep('Bayes’ rule flips the question. We ask how likely these words are if it is spam, times how common spam is (here 50%).', ['m0', 'm1', 'm2'], aiScene(bars(D.mail), mailRow())));
  s.push(aiStep('The naive part: pretend each word appears on its own. Then the chance of the email is one chance per word, multiplied together.', ['m0', 'm1', 'm2'], aiScene(bars(D.mail), mailRow(['P(free)', 'P(lunch)', 'P(meeting)']))));
  s.push(aiStep('A zero count would wipe out the whole product, so we add a small α to every count. Your α is ' + a + '.', ['ro0'], aiScene(bars(D.mail), mailRow(['P(free)', 'P(lunch)', 'P(meeting)']), ro(lines.slice(0, 1)))));
  s.push(aiStep('If spam: P(free) × P(lunch) × P(meeting) × 50% = ' + g(S) + '.', ['m0', 'm1', 'm2', 'ro1'], aiScene(bars(D.mail), mailRow(fmtP(pS), 'c'), ro(lines.slice(0, 3)))));
  s.push(aiStep('If normal: the same product with the normal-mail counts = ' + g(H) + '.', ['m0', 'm1', 'm2', 'ro3'], aiScene(bars(D.mail), mailRow(fmtP(pH), 'b'), ro(lines))));
  s.push(aiStep('Scale the two so they add up to 100%. This email is ' + aiPct(post) + ' likely to be spam.', ['pS'], aiScene(mailRow(), ro(lines), odds())));
  s.push(aiStep(a === 0 ? 'At α = 0, “meeting” never appeared in spam, so the spam score is exactly 0. One word decided everything.'
    : 'At α = 0, “meeting” would make the spam score exactly 0, so one word would decide everything. Adding α, called smoothing, stops that.', ['m2'], aiScene(mailRow(), ro(lines), odds())));
  s.push(aiStep('Real filters add numbers called logs instead, because multiplying thousands of tiny chances would round to zero.', [], aiScene(mailRow(), ro(lines), odds())));
  s.push(aiStep('Naive Bayes is fast and needs little data. It is a strong first try for text, even though words do affect each other.', ['pS'], aiScene(mailRow(), odds())));
  return s;
}

// ---------- ML: the SVM margin ----------
const AI_SVM = (() => {
  const A = [[6.0, 7.2], [7.1, 6.4], [7.8, 8.0], [6.6, 8.6], [8.4, 6.9], [5.6, 8.4], [8.9, 8.6], [7.4, 5.4]];
  const B = [[2.2, 3.0], [3.4, 2.0], [1.8, 4.4], [3.9, 3.6], [2.8, 1.4], [4.6, 2.6], [1.5, 2.4], [3.2, 4.9]];
  // for a normal direction θ: the widest street with that direction (gap between the two groups' projections)
  const street = (th) => {
    const u = [Math.cos(th), Math.sin(th)];
    const pa = A.map((q) => q[0] * u[0] + q[1] * u[1]); const pb = B.map((q) => q[0] * u[0] + q[1] * u[1]);
    const lo = Math.min.apply(null, pa); const hi = Math.max.apply(null, pb);
    return { u, gap: lo - hi, c: (lo + hi) / 2, lo, hi, pa, pb };
  };
  let best = 0; let bestGap = -Infinity;
  for (let i = 0; i < 3600; i++) { const g = street((i / 3600) * 2 * Math.PI).gap; if (g > bestGap) { bestGap = g; best = (i / 3600) * 2 * Math.PI; } }
  // the line direction is the normal turned by 90°
  const lineDeg = Math.round((((best * 180) / Math.PI - 90) % 180 + 180) % 180);
  return { A, B, street, best, bestGap, lineDeg };
})();
function aiSvm(p) {
  const D = AI_SVM; const deg = Math.round(p);
  // your line at deg°: its normal is deg + 90°; pick the side that puts the first group on the high side
  const th0 = ((deg + 90) * Math.PI) / 180; const s0 = D.street(th0); const s1 = D.street(th0 + Math.PI);
  const you = s0.gap >= s1.gap ? s0 : s1; const ok = you.gap > 0;
  const best = D.street(D.best);
  const [sx, sy] = aiScale(70, 520, 490, 40, 0, 10);
  const axes = { x0: 70, y0: 490, x1: 520, y1: 40, xl: 'feature 1 →', yl: '↑ feature 2' };
  const pts = (rings) => ({ points: D.A.map((q, i) => ({ id: 'a' + i, x: sx(q[0]), y: sy(q[1]), c: 'a', r: 7, ring: rings && rings.indexOf('a' + i) >= 0 }))
    .concat(D.B.map((q, i) => ({ id: 'b' + i, x: sx(q[0]), y: sy(q[1]), c: 'b', r: 7, ring: rings && rings.indexOf('b' + i) >= 0 }))) });
  const legend = { points: [{ id: 'lgA', x: 600, y: 60, c: 'a', r: 7, label: 'group 1' }, { id: 'lgB', x: 720, y: 60, c: 'b', r: 7, label: 'group 2' }] };
  // the part of the line u·p = c that lies inside the 0..10 square
  const seg = (u, c) => {
    const d = [-u[1], u[0]]; const p0 = [u[0] * c, u[1] * c]; let t0 = -50; let t1 = 50;
    [[0, 0, 10], [1, 0, 10]].forEach(([k, lo, hi]) => {
      if (Math.abs(d[k]) < 1e-9) { if (p0[k] < lo || p0[k] > hi) { t0 = 1; t1 = 0; } return; }
      const a = (lo - p0[k]) / d[k]; const b = (hi - p0[k]) / d[k]; t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b));
    });
    if (t0 >= t1) return [[sx(5), sy(5)], [sx(5), sy(5)]];
    return [[sx(p0[0] + d[0] * t0), sy(p0[1] + d[1] * t0)], [sx(p0[0] + d[0] * t1), sy(p0[1] + d[1] * t1)]];
  };
  const streetOf = (st, id, c) => ({ paths: [{ id, pts: seg(st.u, st.c), c, w: 3.5 },
    { id: id + 'L', pts: seg(st.u, st.lo), c, w: 1.5, dash: true }, { id: id + 'H', pts: seg(st.u, st.hi), c, w: 1.5, dash: true }] });
  const sv = []; D.A.forEach((q, i) => { if (best.pa[i] - best.lo < 0.02) sv.push('a' + i); }); D.B.forEach((q, i) => { if (best.hi - best.pb[i] < 0.02) sv.push('b' + i); });
  const m = (st) => aiFmt(st.gap / 2);
  const share = ok ? you.gap / best.gap : 0;
  const bars = () => ({ bars: [{ id: 'bYou', x: 600, y: 330, w: aiR(300 * Math.max(0, share)), h: 28, c: 'c', val: ok ? aiPct(share) : 'no street', vx: aiR(608 + 300 * Math.max(0, share)), vy: 350 },
    { id: 'bBest', x: 600, y: 400, w: 300, h: 28, c: 'a', val: '100%', vx: 908, vy: 420 }],
  labels: [{ id: 'lYou', x: 600, y: 320, text: 'your street width (' + deg + '°)', c: 'm', size: 13 }, { id: 'lBest', x: 600, y: 390, text: 'widest street (' + D.lineDeg + '°)', c: 'm', size: 13 }] });
  const ro = (lines) => ({ labels: lines.map((t, i) => ({ id: 'ro' + i, x: 600, y: 140 + i * 28, text: t[0], c: t[1], size: 15, mono: true })) });
  const cands = { paths: [[0.3, 4.6], [0.9, 5.2], [0.62, 6.1]].map((q, i) => { const u = [Math.cos(q[0]), Math.sin(q[0])]; return { id: 'cand' + i, pts: seg(u, q[1]), c: i === 2 ? 'c' : 'm', w: 2 }; }) };
  const s = [];
  s.push(aiStep('Two groups of points can be split by plenty of straight lines. Which one should we trust?', [], aiScene({ axes }, legend, pts(), cands)));
  s.push(aiStep('A line that almost touches a point is fragile. A new point a little to one side would land on the wrong side.', ['cand2'], aiScene({ axes }, legend, pts(), cands)));
  s.push(aiStep('The margin is the empty street around a line. It is the distance from the line to the nearest point.', ['svm', 'svmL', 'svmH'], aiScene({ axes }, legend, pts(), streetOf(best, 'svm', 'a'))));
  s.push(aiStep(ok ? 'Your line at ' + deg + '°, centred in its widest street, has a margin of ' + m(you) + '.' : 'At ' + deg + '° no straight line can split the two groups. Turn the slider.',
    ['you'], aiScene({ axes }, legend, pts(), ok ? streetOf(you, 'you', 'c') : { paths: [{ id: 'you', pts: seg(you.u, you.c), c: 'c', w: 3.5 }] }, ro([['your margin: ' + (ok ? m(you) : 'none'), 'c']]))));
  s.push(aiStep('A support vector machine picks the line with the widest street. Here it runs at ' + D.lineDeg + '°, with a margin of ' + m(best) + '.', ['svm'],
    aiScene({ axes }, legend, pts(), streetOf(best, 'svm', 'a'), ro([['your margin: ' + (ok ? m(you) : 'none'), 'c'], ['best margin: ' + m(best), 'a']]))));
  s.push(aiStep('Only the ' + sv.length + ' points on the street’s edges fix the line. They are the support vectors; moving any other point changes nothing.', sv,
    aiScene({ axes }, legend, pts(sv), streetOf(best, 'svm', 'a'))));
  s.push(aiStep(ok ? 'Your line keeps ' + aiPct(share) + ' of the widest possible street.' : 'Your line keeps no street at all: some points sit on its wrong side.', ['bYou'],
    aiScene({ axes }, legend, pts(), streetOf(best, 'svm', 'a'), ok ? streetOf(you, 'you', 'c') : {}, bars())));
  const mid = best.c; const u = best.u; const stray = { points: [{ id: 'stray', x: sx(5 + u[0] * (mid - 5 * u[0] - 5 * u[1]) + 0.3 * u[0]), y: sy(5 + u[1] * (mid - 5 * u[0] - 5 * u[1]) + 0.3 * u[1]), c: 'b', r: 8, ring: true, label: 'overlap', lx: 14 }] };
  s.push(aiStep('Real data overlaps. A soft margin allows a few points in the street, at a cost set by C.', ['stray'], aiScene({ axes }, legend, pts(), streetOf(best, 'svm', 'a'), stray)));
  s.push(aiStep('For curved boundaries, the kernel trick compares points as if in a richer space, without building it.', ['svm'], aiScene({ axes }, legend, pts(), streetOf(best, 'svm', 'a'))));
  s.push(aiStep('SVMs were a top choice before deep learning, and they still work well on small, clean datasets.', [], aiScene({ axes }, legend, pts(sv), streetOf(best, 'svm', 'a'))));
  return s;
}

// ---------- AI now: diffusion in two dimensions ----------
const AI_DIF = (() => {
  const T = 1000; const ab = [1]; let prod = 1;
  for (let t = 1; t <= T; t++) { const beta = 1e-4 + ((0.02 - 1e-4) * (t - 1)) / (T - 1); prod *= 1 - beta; ab.push(prod); }
  const rnd = aiRng(17);
  const data = []; for (let i = 0; i < 48; i++) { const a = (2 * Math.PI * i) / 48 + (rnd() - 0.5) * 0.08; const r = 1 + aiGauss(rnd) * 0.03; data.push([r * Math.cos(a), r * Math.sin(a)]); }
  const eps = data.map(() => [aiGauss(rnd), aiGauss(rnd)]);
  const noised = (t) => data.map((q, i) => [Math.sqrt(ab[t]) * q[0] + Math.sqrt(1 - ab[t]) * eps[i][0], Math.sqrt(ab[t]) * q[1] + Math.sqrt(1 - ab[t]) * eps[i][1]]);
  // the best possible denoiser for this data set: the average clean point, weighted by how likely each one is to have produced x
  const clean = (x, t) => {
    const s = Math.sqrt(ab[t]); const v = 1 - ab[t];
    const lw = data.map((q) => -((x[0] - s * q[0]) ** 2 + (x[1] - s * q[1]) ** 2) / (2 * v));
    const mx = Math.max.apply(null, lw); const w = lw.map((l) => Math.exp(l - mx)); const sum = w.reduce((a, b) => a + b, 0);
    return [data.reduce((a, q, i) => a + q[0] * w[i], 0) / sum, data.reduce((a, q, i) => a + q[1] * w[i], 0) / sum];
  };
  const rnd2 = aiRng(99); const start = []; for (let i = 0; i < 40; i++) start.push([aiGauss(rnd2), aiGauss(rnd2)]);
  const cache = {};
  // deterministic sampling in N steps (DDIM style): guess the clean point, then re-noise it to the next, smaller level
  const sample = (N) => {
    if (cache[N]) return cache[N];
    const ts = []; for (let j = 0; j <= N; j++) ts.push(Math.round((T * (N - j)) / N));
    const states = [start.map((q) => q.slice())];
    let xs = states[0];
    for (let j = 0; j < N; j++) {
      const t = ts[j]; const s2 = ts[j + 1];
      xs = xs.map((x) => {
        const x0 = clean(x, t); const e = [(x[0] - Math.sqrt(ab[t]) * x0[0]) / Math.sqrt(1 - ab[t]), (x[1] - Math.sqrt(ab[t]) * x0[1]) / Math.sqrt(1 - ab[t])];
        return s2 === 0 ? x0 : [Math.sqrt(ab[s2]) * x0[0] + Math.sqrt(1 - ab[s2]) * e[0], Math.sqrt(ab[s2]) * x0[1] + Math.sqrt(1 - ab[s2]) * e[1]];
      });
      states.push(xs);
    }
    const dist = xs.reduce((a, x) => a + Math.abs(Math.hypot(x[0], x[1]) - 1), 0) / xs.length;
    return (cache[N] = { states, dist });
  };
  return { T, data, noised, clean, start, sample };
})();
function aiDiffusion(p) {
  const D = AI_DIF; const N = Math.max(1, Math.min(50, Math.round(p))); const run = D.sample(N);
  const S = 78; const ox = 300; const oy = 285;
  const X = (v) => aiR(ox + Math.max(-3, Math.min(3, v)) * S); const Y = (v) => aiR(oy - Math.max(-3, Math.min(3, v)) * S);
  const frame = { paths: [{ id: 'box', pts: [[X(-3), Y(-3)], [X(-3), Y(3)], [X(3), Y(3)], [X(3), Y(-3)], [X(-3), Y(-3)]], c: 'l', w: 1.5 }] };
  const ring = (op) => ({ rings: [{ id: 'truth', x: ox, y: oy, r: S, c: 'm', op: op || 0.6 }] });
  const dots = (P, c, pre) => ({ points: P.map((q, i) => ({ id: (pre || 'd') + i, x: X(q[0]), y: Y(q[1]), c: c || 'a', r: 5 })) });
  const tag = (t) => ({ labels: [{ id: 'tag', x: X(-3) + 10, y: Y(3) + 22, text: t, c: 'm', size: 13, mono: true }] });
  const ro = (lines) => ({ labels: lines.map((t, i) => ({ id: 'ro' + i, x: 640, y: 120 + i * 28, text: t[0], c: t[1], size: i ? 14 : 16, weight: i ? 500 : 700, mono: true })) });
  const half = run.states[Math.floor(N / 2)]; const fin = run.states[N];
  const d1 = D.sample(1).dist; const d50 = D.sample(50).dist;
  const t300 = D.noised(300);
  const arrows = { arrows: [0, 6, 12, 18, 24, 30, 36, 42].map((i) => { const c = D.clean(t300[i], 300); return { id: 'ar' + i, from: { x: X(t300[i][0]), y: Y(t300[i][1]) }, to: { x: X(c[0]), y: Y(c[1]) }, c: 't', w: 2 }; }) };
  const top = Math.max(d1, run.dist, d50) || 1;
  const bars = () => ({ bars: [[1, d1], [N, run.dist], [50, d50]].map((q, i) => ({ id: 'q' + i, x: 640, y: 300 + i * 56, w: aiR(Math.max(2, (q[1] / top) * 260)), h: 28, c: i === 1 ? 'c' : 'm', val: aiFmt(q[1]), vx: aiR(648 + Math.max(2, (q[1] / top) * 260)), vy: 320 + i * 56 })),
    labels: [[1, 0], [N, 1], [50, 2]].map((q) => ({ id: 'ql' + q[1], x: 640, y: 292 + q[1] * 56, text: q[0] + (q[0] === 1 ? ' step' : ' steps') + (q[1] === 1 ? ' (yours)' : ''), c: 'm', size: 13 })).concat([{ id: 'qT', x: 640, y: 262, text: 'average distance from the ring', c: 'm', size: 13 }]) });
  const where = run.dist < 0.08 ? 'sit right on the ring' : run.dist < 0.3 ? 'sit near the ring' : 'bunch up inside the ring';
  const s = [];
  s.push(aiStep('Think of a picture as one point in a huge space. Here each “picture” has only two numbers, and the training pictures form a ring.', ['truth'], aiScene(frame, ring(), dots(D.data), tag('training data'))));
  s.push(aiStep('Forward process: add a little random noise, step after step. After 100 of 1,000 steps the ring is already fuzzy.', [], aiScene(frame, ring(), dots(D.noised(100)), tag('step 100 of 1,000'))));
  s.push(aiStep('After 300 steps the ring is hard to see. Each dot is now mostly noise.', [], aiScene(frame, ring(), dots(t300), tag('step 300 of 1,000'))));
  s.push(aiStep('By step 1,000 nothing of the ring is left, only a round cloud of noise. This direction needs no learning.', [], aiScene(frame, ring(0.3), dots(D.noised(1000)), tag('step 1,000: pure noise'))));
  s.push(aiStep('A diffusion model learns the reverse: shown a noisy dot, it guesses the noise. Here we use the exact best guess.', ['ar0', 'ar12', 'ar24'], aiScene(frame, ring(), dots(t300, 'm'), arrows, tag('step 300: where is clean?'))));
  s.push(aiStep('To make something new, start from fresh random noise. None of these dots came from the ring.', [], aiScene(frame, ring(0.3), dots(run.states[0], 'c', 'n'), tag('new noise'), ro([['steps: ' + N, 't']]))));
  s.push(aiStep('Now walk backwards, removing a slice of the predicted noise each time. You chose ' + N + (N === 1 ? ' step' : ' steps') + '; here is the halfway point.', [], aiScene(frame, ring(0.4), dots(half, 'c', 'n'), tag('halfway back'), ro([['steps: ' + N, 't']]))));
  s.push(aiStep((N === 1 ? 'After that one step' : 'After all ' + N + ' steps') + ' the new dots ' + where + '. Their average distance from it is ' + aiFmt(run.dist) + '.', ['truth'], aiScene(frame, ring(), dots(fin, 'c', 'n'), tag('done'), ro([['steps: ' + N, 't'], ['distance: ' + aiFmt(run.dist), 'c']]))));
  s.push(aiStep('Fewer steps are faster but rougher: one step gives ' + aiFmt(d1) + ', fifty give ' + aiFmt(d50) + '. Skipping steps this way is called DDIM.', ['q1'], aiScene(frame, ring(), dots(fin, 'c', 'n'), bars())));
  s.push(aiStep('Real images have millions of numbers instead of two. It is the same idea: noise in, picture out, one step at a time.', [], aiScene(frame, ring(), dots(fin, 'c', 'n'), bars())));
  s.push(aiStep('Text-to-image models get your prompt as a hint at every step. So the noise is removed toward pictures that match the words.', [], aiScene(frame, ring(), dots(fin, 'c', 'n'), tag('“a ring”'))));
  s.push(aiStep('Latent diffusion runs the steps on a small, squeezed copy of the image. Then it expands it to full size at the end.', [],
    { boxes: [{ id: 'enc', x: 60, y: 200, w: 220, h: 90, label: 'noise, small', sub: 'compressed space', c: 'b' }, { id: 'den', x: 370, y: 200, w: 220, h: 90, label: 'denoise steps', sub: 'cheap at this size', c: 'a' }, { id: 'dec', x: 680, y: 200, w: 220, h: 90, label: 'decoder', sub: 'full-size picture', c: 'b' }],
      arrows: [{ id: 'e1', from: 'enc', to: 'den', c: 'm' }, { id: 'e2', from: 'den', to: 'dec', c: 'm' }] }));
  return s;
}

// ---------- AI now: preference tuning, RLHF and DPO ----------
const AI_PREF = (() => {
  const ans = [['A', 'clear, with an example'], ['B', 'correct but dense'], ['C', 'rude'], ['D', 'confident but wrong']];
  const ref = [0.25, 0.35, 0.15, 0.25];
  const votes = [[0, 1, 8, 2], [0, 2, 9, 1], [0, 3, 9, 1], [1, 2, 7, 3], [1, 3, 8, 2], [2, 3, 4, 6]]; // [i, j, i wins, j wins]
  // reward model: Bradley-Terry fit, P(i beats j) = sigmoid(r_i - r_j), by gradient ascent on the log-likelihood
  const r = [0, 0, 0, 0];
  for (let it = 0; it < 6000; it++) {
    const g = [0, 0, 0, 0];
    votes.forEach(([i, j, wi, wj]) => { const q = aiSig(r[i] - r[j]); g[i] += wi * (1 - q) - wj * q; g[j] -= wi * (1 - q) - wj * q; });
    for (let k = 0; k < 4; k++) r[k] += 0.02 * g[k];
  }
  const mean = r.reduce((a, b) => a + b, 0) / 4; for (let k = 0; k < 4; k++) r[k] -= mean;
  const norm = (v) => { const s = v.reduce((a, b) => a + b, 0); return v.map((x) => x / s); };
  // RLHF's best policy under a KL leash of strength β: π(y) ∝ π_ref(y) · exp(r(y) / β)
  const rlhf = (beta) => norm(ref.map((q, k) => q * Math.exp(r[k] / beta)));
  // DPO: tune the policy's own logits on the votes, loss −log σ(β · [(log π(w) − log π_ref(w)) − (log π(l) − log π_ref(l))])
  const dpo = (beta) => {
    const th = ref.map(Math.log);
    const lr = 0.02 / (beta * beta);
    for (let it = 0; it < 6000; it++) {
      const g = [0, 0, 0, 0];
      votes.forEach(([i, j, wi, wj]) => {
        const d = th[i] - th[j] - (Math.log(ref[i]) - Math.log(ref[j]));
        const q = aiSig(beta * d);
        g[i] += beta * (wi * (1 - q) - wj * q); g[j] -= beta * (wi * (1 - q) - wj * q);
      });
      for (let k = 0; k < 4; k++) th[k] += lr * g[k];
    }
    return aiSoftmax(th, 1);
  };
  return { ans, ref, votes, r, rlhf, dpo };
})();
function aiPrefs(p) {
  const D = AI_PREF; const beta = Math.round(p * 10) / 10;
  const pr = D.rlhf(beta); const pd = D.dpo(beta);
  const gap = Math.max.apply(null, pr.map((v, k) => Math.abs(v - pd[k]))) * 100;
  const boxes = (hl) => ({ boxes: D.ans.map((a, k) => ({ id: 'ans' + k, x: 40, y: 70 + k * 105, w: 250, h: 70, label: 'answer ' + a[0], sub: a[1], c: hl && hl.indexOf(k) >= 0 ? 'a' : 'l' })) });
  const row = (k, slot) => 70 + k * 105 + 8 + slot * 20;
  const bar = (id, k, slot, v, c) => ({ id, x: 330, y: row(k, slot), w: aiR(Math.max(1, v * 420)), h: 16, c, val: aiPct(v), vx: aiR(338 + Math.max(1, v * 420)), vy: row(k, slot) + 13 });
  const legend = (items) => ({ labels: items.map((it, i) => ({ id: 'lg' + i, x: 330 + i * 170, y: 48, text: '■ ' + it[0], c: it[1], size: 13 })) });
  const start = () => ({ bars: D.ref.map((v, k) => bar('s' + k, k, 0, v, 'm')) });
  const rl = () => ({ bars: pr.map((v, k) => bar('r' + k, k, 1, v, 'b')) });
  const dp = () => ({ bars: pd.map((v, k) => bar('p' + k, k, 2, v, 'a')) });
  const rew = () => ({ bars: D.r.map((v, k) => ({ id: 'rw' + k, x: aiR(v >= 0 ? 600 : 600 + v * 90), y: 70 + k * 105 + 22, w: aiR(Math.max(1, Math.abs(v) * 90)), h: 24, c: v >= 0 ? 'ok' : 'bad', val: (v >= 0 ? '+' : '') + aiFmt(v), vx: v >= 0 ? aiR(608 + v * 90) : aiR(Math.max(330, 592 + v * 90 - 50)), vy: 70 + k * 105 + 39 })),
    paths: [{ id: 'rwAx', pts: [[600, 60], [600, 470]], c: 'l', w: 1.5 }], labels: [{ id: 'rwT', x: 600, y: 48, text: 'reward score', c: 'm', size: 13, anchor: 'middle' }] });
  const voteList = { labels: D.votes.map((v, i) => ({ id: 'v' + i, x: 520, y: 100 + i * 32, text: D.ans[v[0]][0] + ' vs ' + D.ans[v[1]][0] + ':  ' + v[2] + ' – ' + v[3], c: 't', size: 15, mono: true }))
    .concat([{ id: 'vT', x: 520, y: 68, text: 'votes from 10 people per pair', c: 'm', size: 13 }]) };
  const lo = D.rlhf(0.1); const hi = D.rlhf(2);
  const s = [];
  s.push(aiStep('A pretrained model can answer the same question in many ways. Here are four answers, with how often it picks each.', ['s0', 's1', 's2', 's3'], aiScene(boxes(), start(), legend([['before tuning', 'm']]))));
  s.push(aiStep('People compare answers two at a time and pick the better one. A beat B in 8 of 10 votes, and C lost nearly every time.', ['v0'], aiScene(boxes(), voteList)));
  s.push(aiStep('RLHF, learning from human feedback, starts with a reward model, a scorer for preferred answers. A scores ' + aiFmt(D.r[0]) + ' and C scores ' + aiFmt(D.r[2]) + '.', ['rw0', 'rw2'], aiScene(boxes([0]), rew())));
  s.push(aiStep('Step 2: tune the model to earn more reward, on a leash that keeps it near its start. β sets the leash strength.', [], aiScene(boxes(), start(), legend([['before tuning', 'm']]))));
  s.push(aiStep('With your β = ' + beta + ', the tuned model picks A ' + aiPct(pr[0]) + ' of the time, and the rude answer C only ' + aiPct(pr[2]) + '.', ['r0', 'r2'], aiScene(boxes([0]), start(), rl(), legend([['before', 'm'], ['after RLHF', 'b']]))));
  s.push(aiStep('A small β is a loose leash: at β = 0.1, A gets ' + aiPct(lo[0]) + '. A big β barely moves: at β = 2, A gets ' + aiPct(hi[0]) + '.', ['r0'], aiScene(boxes([0]), start(), rl(), legend([['before', 'm'], ['after RLHF', 'b']]))));
  s.push(aiStep('That route needs a separate reward model and a fiddly training loop. DPO asks whether we can skip both.', [], aiScene(boxes(), start(), rl(), legend([['before', 'm'], ['after RLHF', 'b']]))));
  s.push(aiStep('DPO, direct preference optimization, trains on the votes directly. It raises the winner’s chance and lowers the loser’s.', ['ans0'], aiScene(boxes([0]), voteList)));
  s.push(aiStep('Trained on the same votes with the same β, DPO picks A ' + aiPct(pd[0]) + ' of the time. It matches RLHF ' + (gap < 0.05 ? 'to within 0.1 points' : 'within ' + aiFmt(gap, 1) + ' points') + ' on every answer.', ['p0', 'r0'], aiScene(boxes([0]), start(), rl(), dp(), legend([['before', 'm'], ['after RLHF', 'b'], ['after DPO', 'a']]))));
  s.push(aiStep('That match is the DPO paper’s key result: the tuned model can stand in for the reward model.', ['p0', 'p1', 'p2', 'p3'], aiScene(boxes(), start(), rl(), dp(), legend([['before', 'm'], ['after RLHF', 'b'], ['after DPO', 'a']]))));
  s.push(aiStep('Votes are the hard part. They reflect who was asked, and a model can learn to please rather than help.', ['v0', 'v5'], aiScene(boxes(), voteList)));
  return s;
}

// ---------- AI now: vision transformers ----------
const AI_VIT = {
  img: ['..a......a..', '.aaa....aaa.', '.aaaaaaaaaa.', 'aaaaaaaaaaaa', 'aatbaaaabtaa', 'aaaaaaaaaaaa', 'aaaaaccaaaaa', 'aaaaaaaaaaaa', 'aaaattttaaaa', '.aaaaaaaaaa.', '..aaaaaaaa..', '...aaaaaa...'],
  side: 192
};
function aiVit(p) {
  const D = AI_VIT; const P = Math.max(8, Math.min(32, Math.round(p / 8) * 8));
  const n = D.side / P; const T = n * n; const L = P * P * 3;
  const cell = 24; const x0 = 40; const y0 = 90; const px = (cell * 12) / D.side; // screen pixels per image pixel
  const runs = [];
  D.img.forEach((row, r) => { let c = 0; while (c < 12) { const ch = row[c]; let e = c; while (e < 12 && row[e] === ch) e++; if (ch !== '.') runs.push({ id: 'px' + r + '_' + c, x: x0 + c * cell, y: y0 + r * cell, w: (e - c) * cell, h: cell, c: ch, rx: 0 }); c = e; } });
  const pic = (op) => ({ bars: [{ id: 'bg', x: x0, y: y0, w: cell * 12, h: cell * 12, c: 'l', rx: 4, op: 0.5 * (op || 1) }].concat(runs.map((b) => Object.assign({}, b, { op: op || 1 }))) });
  const gridL = () => { const out = []; for (let i = 1; i < n; i++) { const o = aiR(i * P * px); out.push({ id: 'gv' + i, pts: [[x0 + o, y0], [x0 + o, y0 + cell * 12]], c: 't', w: 1.5 }); out.push({ id: 'gh' + i, pts: [[x0, y0 + o], [x0 + cell * 12, y0 + o]], c: 't', w: 1.5 }); } return { paths: out }; };
  const patchAt = (ix, iy) => ({ x: aiR(x0 + ix * P * px), y: aiR(y0 + iy * P * px), s: aiR(P * px) });
  const eye = patchAt(Math.floor((2 * 16) / P), Math.floor((4 * 16) / P));
  const earL = patchAt(Math.floor((2 * 16 + 8) / P), 0); const earR = patchAt(Math.floor((9 * 16 + 8) / P), 0);
  const hl = (q, id) => ({ bars: [{ id, x: q.x, y: q.y, w: q.s, h: q.s, c: 't', hollow: true, rx: 2 }] });
  const fmtN = (v) => v.toLocaleString('en-US');
  const words = ['[class]', 'p1', 'p2', 'p3', 'p4', '…', 'p' + T];
  const row = (withPos, cls) => {
    const ws = (cls ? words : words.slice(1)).map(aiTokW); let x = 380;
    return { tokens: (cls ? words : words.slice(1)).map((w, i) => { const t = { id: 'tk' + (cls ? i : i + 1), x: aiR(x + ws[i] / 2), y: 130, text: w, solid: cls && i === 0, sub: withPos && w !== '…' && w !== '[class]' ? '+ pos ' + w.slice(1) : '' }; x += ws[i] + 10; return t; }) };
  };
  const model = (focus) => ({ boxes: [{ id: 'tf', x: 380, y: 230, w: 540, h: 90, label: 'transformer layers', sub: 'every token attends to every other', c: focus ? 'a' : 'l' }] });
  const out = { boxes: [{ id: 'head', x: 380, y: 380, w: 220, h: 64, label: 'class: cat', c: 'a' }], arrows: [{ id: 'toHead', from: { x: 430, y: 322 }, to: 'head', c: 'a', w: 2.5 }] };
  const flat = { tokens: [{ id: 'flat', x: 650, y: 130, text: fmtN(L) + ' numbers', c: 'a' }], arrows: [{ id: 'flatA', from: { x: eye.x + eye.s, y: eye.y + eye.s / 2 }, to: { x: 560, y: 130 }, c: 'a', w: 2.5 }] };
  const cost = { labels: [{ id: 'cost', x: 650, y: 420, text: fmtN(T) + ' tokens → ' + fmtN(T * T) + ' pairs', c: 't', size: 18, weight: 700, anchor: 'middle', mono: true },
    { id: 'cost2', x: 650, y: 452, text: 'patch ' + P + ' px · picture 192 × 192', c: 'm', size: 13, anchor: 'middle', mono: true }] };
  const attn = { arrows: [{ id: 'ear', from: { x: earL.x + earL.s / 2, y: earL.y + earL.s / 2 }, to: { x: earR.x + earR.s / 2, y: earR.y + earR.s / 2 }, c: 'a', w: 3, label: 'ear ↔ ear', ly: -12 },
    { id: 'eyeA', from: { x: eye.x + eye.s / 2, y: eye.y + eye.s / 2 }, to: { x: earR.x + earR.s / 2, y: earR.y + earR.s }, c: 'b', w: 2 }] };
  const s = [];
  s.push(aiStep('A transformer reads a row of tokens, but a picture is a grid of pixels. So how can it read a picture?', [], aiScene(pic(), model())));
  s.push(aiStep('Cut the picture into square patches, like floor tiles. With ' + P + '-pixel patches, this 192 × 192 picture gives ' + n + ' × ' + n + ' = ' + T + ' patches.', ['gv1'], aiScene(pic(), gridL(), cost)));
  s.push(aiStep('Each patch is flattened into one long list: ' + P + ' × ' + P + ' pixels × 3 colours = ' + fmtN(L) + ' numbers.', ['flat', 'eye'], aiScene(pic(0.6), gridL(), hl(eye, 'eye'), flat)));
  s.push(aiStep('One learned layer turns every such list into a new list of numbers. Now each patch is a token, like a word.', ['flat'], aiScene(pic(0.6), gridL(), hl(eye, 'eye'), { tokens: [{ id: 'flat', x: 650, y: 130, text: 'one vector', c: 'a', solid: true }], arrows: flat.arrows })));
  s.push(aiStep('Line the tokens up in reading order. Go left to right along the top row, then the next row down.', ['tk1', 'tk2'], aiScene(pic(0.6), gridL(), row(false, false))));
  s.push(aiStep('Add a position code to each token, so the model knows where each tile came from. Without it, the layout is lost.', ['tk1'], aiScene(pic(0.6), gridL(), row(true, false))));
  s.push(aiStep('Put one extra token, the class token, at the front. After the last layer, it holds the answer that names the picture.', ['tk0'], aiScene(pic(0.6), gridL(), row(true, true), model(), out)));
  s.push(aiStep('Inside, every patch looks at every other patch. The two ear tiles can see each other in the very first layer.', ['ear'], aiScene(pic(), gridL(), attn, model(true))));
  s.push(aiStep('Attention compares every pair, so the work grows fast: ' + fmtN(T) + ' tokens make ' + fmtN(T * T) + ' pairs.', ['cost'], aiScene(pic(0.6), gridL(), attn, cost)));
  s.push(aiStep('Halve the patch size and you get four times the tokens and sixteen times the pairs. The original paper used 16-pixel patches.', ['cost'], aiScene(pic(0.6), gridL(), cost, { labels: [{ id: 'orig', x: 650, y: 490, text: '224 × 224 picture, 16 px → 196 tokens', c: 'a', size: 13, anchor: 'middle', mono: true }] })));
  s.push(aiStep('A vision transformer has no built-in sense of which pixels are close. So it needs many training images, or tricks such as DeiT’s.', ['tf'], aiScene(pic(), gridL(), model(true))));
  s.push(aiStep('Patches can also be hidden on purpose. MAE hides 75% of them and trains the model to fill in the gaps.', [], aiScene(pic(0.25), gridL(), hl(eye, 'eye'), hl(earR, 'earR'))));
  s.push(aiStep('Many chat models that handle pictures work this way. A vision transformer turns patches into tokens for the language model.', ['tf'], aiScene(pic(), gridL(), row(false, false), model(true))));
  return s;
}

const AI_LESSONS = [
  { id: 'gradient', track: 'ml', title: 'Fit a line by gradient descent', tag: 'fitting a straight line', minutes: 4, make: aiGradient,
    idea: 'Learning means shrinking one how-wrong number by taking small steps downhill.',
    param: { label: 'Learning rate', min: 0.002, max: 0.04, step: 0.002, value: 0.01, digits: 3, hint: 'The size of each step. The line settles, crawls, zigzags or blows up.' } },
  { id: 'knn', track: 'ml', title: 'k-nearest neighbours', tag: 'sorting by vote', minutes: 3, make: aiKnn,
    idea: 'To label something new, let the known examples closest to it vote.',
    param: { label: 'k, neighbours who vote', min: 1, max: 9, step: 2, value: 3, digits: 0, hint: 'k = 1 trusts one neighbour. Bigger k smooths out odd examples.' } },
  { id: 'tree', track: 'ml', title: 'Decision tree splits', tag: 'questions that sort', minutes: 3, make: aiTree,
    idea: 'A tree asks yes-or-no questions that sort things into neat groups, one question at a time.' },
  { id: 'overfit', track: 'ml', title: 'Train, test and overfitting', tag: 'does it work on new data?', minutes: 4, make: aiOverfit,
    idea: 'A model that memorises its examples fails on new ones, so test it on data it never saw.',
    param: { label: 'Curve degree', min: 1, max: 9, step: 1, value: 3, digits: 0, hint: 'How many bends the curve may make. Watch the test error.' } },
  { id: 'backprop', track: 'ml', title: 'A neuron and backprop', tag: 'tiny neural net', minutes: 5, make: aiBackprop,
    idea: 'After a wrong guess, walk backward through the network to see how much each knob caused it.',
    param: { label: 'Learning rate', min: 0.1, max: 1.5, step: 0.1, value: 0.5, digits: 2, hint: 'How far each weight moves against its gradient.' } },
  { id: 'embeddings', track: 'ml', title: 'Embeddings and cosine similarity', tag: 'meaning as direction', minutes: 3, make: aiEmbed,
    idea: 'Words become arrows of numbers. Similar meanings point the same way.' },
  { id: 'attention', track: 'now', title: 'Attention in a transformer', tag: 'words looking at words', minutes: 4, make: aiAttention,
    idea: 'Each word piece looks at all the others and borrows from the ones that matter most.',
    param: { label: 'Temperature', min: 0.3, max: 3, step: 0.1, value: 1, digits: 1, hint: 'Scores are divided by this before softmax. Low is sharp, high is flat.' },
    sources: [
      { title: 'Attention Is All You Need', org: 'Vaswani et al., Google', date: '2017-06-12', link: 'https://arxiv.org/abs/1706.03762' },
      { title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness', org: 'Dao, Fu, Ermon, Rudra et al.', date: '2022-05-27', link: 'https://arxiv.org/abs/2205.14135' },
      { title: 'Lost in the Middle: How Language Models Use Long Contexts', org: 'Liu, Lin, Hewitt, Paranjape et al.', date: '2023-07-06', link: 'https://arxiv.org/abs/2307.03172' }
    ] },
  { id: 'systems', track: 'now', title: 'System 1 and System 2 thinking', tag: 'models that think first', minutes: 4, make: aiSystems,
    idea: 'Some AI models think longer before answering, writing out steps first.',
    param: { label: 'Thinking budget (steps)', min: 1, max: 6, step: 1, value: 6, digits: 0, hint: 'How many written steps the slow lane may take before it must answer.' },
    sources: [
      { title: 'From System 1 to System 2: A Survey of Reasoning Large Language Models', org: 'Li, Zhang, Zhang, Zhang et al.', date: '2025-02-24', link: 'https://arxiv.org/abs/2502.17419' },
      { title: 'Distilling System 2 into System 1', org: 'Yu, Xu, Weston, Kulikov', date: '2024-07-08', link: 'https://arxiv.org/abs/2407.06023' },
      { title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models', org: 'Wei et al.', date: '2022-01-28', link: 'https://arxiv.org/abs/2201.11903' },
      { title: 'Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters', org: 'Snell, Lee, Xu, Kumar', date: '2024-08-06', link: 'https://arxiv.org/abs/2408.03314' },
      { title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning', org: 'DeepSeek-AI', date: '2025-01-22', link: 'https://arxiv.org/abs/2501.12948' }
    ] },
  { id: 'jepa', track: 'now', title: 'JEPA: predict meaning, not pixels', tag: 'guessing hidden parts', minutes: 4, make: aiJepa,
    idea: 'Instead of painting the missing pixels, guess the meaning of the hidden part.',
    sources: [
      { title: 'Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture (I-JEPA)', org: 'Assran, Duval, Misra, Bojanowski et al.', date: '2023-01-19', link: 'https://arxiv.org/abs/2301.08243' },
      { title: 'I-JEPA: The first AI model based on Yann LeCun’s vision for more human-like AI', org: 'Meta AI', date: '2023-06-13', link: 'https://ai.meta.com/blog/yann-lecun-ai-model-i-jepa/' },
      { title: 'Revisiting Feature Prediction for Learning Visual Representations from Video (V-JEPA)', org: 'Bardes, Garrido, Ponce, Chen et al.', date: '2024-04', link: 'https://arxiv.org/abs/2404.08471' },
      { title: 'V-JEPA: The next step toward advanced machine intelligence', org: 'Meta AI', date: '2024-02-15', link: 'https://ai.meta.com/blog/v-jepa-yann-lecun-ai-model-video-joint-embedding-predictive-architecture/' },
      { title: 'V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning', org: 'Assran, Bardes, Fan, Garrido et al.', date: '2025-06-11', link: 'https://arxiv.org/abs/2506.09985' },
      { title: 'Introducing the V-JEPA 2 world model and new benchmarks for physical reasoning', org: 'Meta AI', date: '2025-06-11', link: 'https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/' }
    ] },
  { id: 'rag', track: 'now', title: 'RAG: retrieve, then generate', tag: 'answers from real documents', minutes: 3, make: aiRag,
    idea: 'Look up the right passages first, then let the model answer from them.',
    sources: [
      { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', org: 'Lewis, Perez, Piktus, Petroni et al.', date: '2020-05-22', link: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection', org: 'Asai, Wu, Wang, Sil et al.', date: '2023-10-17', link: 'https://arxiv.org/abs/2310.11511' },
      { title: 'Contextual retrieval in AI systems', org: 'Anthropic', date: '2024-09-19', link: 'https://www.anthropic.com/research/contextual-retrieval' },
      { title: 'Lost in the Middle: How Language Models Use Long Contexts', org: 'Liu, Lin, Hewitt, Paranjape et al.', date: '2023-07-06', link: 'https://arxiv.org/abs/2307.03172' }
    ] },
  { id: 'agents', track: 'now', title: 'Agents, tools and MCP', tag: 'think, act, repeat', minutes: 4, make: aiAgents,
    idea: 'An agent thinks, uses a tool, reads what came back, and repeats until the goal is done.',
    sources: [
      { title: 'ReAct: Synergizing Reasoning and Acting in Language Models', org: 'Yao, Zhao, Yu, Du et al.', date: '2022-10-06', link: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Toolformer: Language Models Can Teach Themselves to Use Tools', org: 'Schick, Dwivedi-Yu, Dessi et al.', date: '2023-02-09', link: 'https://arxiv.org/abs/2302.04761' },
      { title: 'Introducing the Model Context Protocol', org: 'Anthropic', date: '2024-11-25', link: 'https://www.anthropic.com/news/model-context-protocol' },
      { title: 'Building effective AI agents', org: 'Anthropic', date: '2024-12-19', link: 'https://www.anthropic.com/research/building-effective-agents' },
      { title: 'Specification: Model Context Protocol (version 2026-07-28)', org: 'modelcontextprotocol.io', date: '2026-07-28', link: 'https://modelcontextprotocol.io/specification/2026-07-28' },
      { title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues?', org: 'Jimenez, Yang, Wettig, Yao et al.', date: '2023-10-10', link: 'https://arxiv.org/abs/2310.06770' }
    ] },
  { id: 'moe', track: 'now', title: 'Mixture of experts', tag: 'a router picks experts', minutes: 3, make: aiMoe,
    idea: 'The model holds many small experts, but a router picks only a few for each piece of text.',
    param: { label: 'Experts per token', min: 1, max: 4, step: 1, value: 2, digits: 0, hint: 'How many experts the router runs for each token.' },
    sources: [
      { title: 'Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer', org: 'Shazeer, Mirhoseini, Maziarz, Davis et al.', date: '2017-01-23', link: 'https://arxiv.org/abs/1701.06538' },
      { title: 'Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity', org: 'Fedus, Zoph, Shazeer', date: '2021-01-11', link: 'https://arxiv.org/abs/2101.03961' },
      { title: 'Mixtral of Experts', org: 'Jiang, Sablayrolles, Roux, Mensch et al.', date: '2024-01-08', link: 'https://arxiv.org/abs/2401.04088' },
      { title: 'DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models', org: 'Dai, Deng, Zhao, Xu et al.', date: '2024-01-11', link: 'https://arxiv.org/abs/2401.06066' },
      { title: 'Mixture of Experts Explained', org: 'Hugging Face', date: '2023-12-11', link: 'https://huggingface.co/blog/moe' }
    ] },
  { id: 'lora', track: 'now', title: 'Fine-tuning with LoRA', tag: 'small adapters', minutes: 3, make: aiLora,
    idea: 'Keep the big model fixed and train two small add-on grids that change its answers.',
    param: { label: 'Rank r', min: 1, max: 16, step: 1, value: 4, digits: 0, hint: 'The thickness of the adapter matrices, and so the number of trainable weights.' },
    sources: [
      { title: 'LoRA: Low-Rank Adaptation of Large Language Models', org: 'Hu, Shen, Wallis, Allen-Zhu et al.', date: '2021-06-17', link: 'https://arxiv.org/abs/2106.09685' },
      { title: 'QLoRA: Efficient Finetuning of Quantized LLMs', org: 'Dettmers, Pagnoni, Holtzman, Zettlemoyer', date: '2023-05-23', link: 'https://arxiv.org/abs/2305.14314' },
      { title: 'PEFT: Parameter-Efficient Fine-Tuning of Billion-Scale Models on Low-Resource Hardware', org: 'Hugging Face', date: '2023-02-10', link: 'https://huggingface.co/blog/peft' },
      { title: 'Making LLMs even more accessible with bitsandbytes, 4-bit quantization and QLoRA', org: 'Hugging Face', date: '2023-05-24', link: 'https://huggingface.co/blog/4bit-transformers-bitsandbytes' }
    ] },
  { id: 'logistic', track: 'ml', title: 'Logistic regression and the sigmoid', tag: 'chances from a line', minutes: 4, make: aiLogistic,
    idea: 'Turn a score into a chance between 0 and 1, then train it to give good chances.',
    param: { label: 'Weight w (steepness)', min: 0.2, max: 4, step: 0.1, value: 1, digits: 1, hint: 'How steep the curve is around its midpoint. The log loss is recomputed for your w.' } },
  { id: 'confusion', track: 'ml', title: 'Precision, recall and the confusion matrix', tag: 'how good is the sorter?', minutes: 4, make: aiConfusion,
    idea: 'Ask two questions: how much of what we flagged was right, and how many real ones we caught?',
    param: { label: 'Threshold', min: 0.1, max: 0.9, step: 0.05, value: 0.5, digits: 2, hint: 'Emails scoring at or above this are flagged. Every count is recomputed.' } },
  { id: 'kmeans', track: 'ml', title: 'k-means clustering', tag: 'groups without labels', minutes: 4, make: aiKmeans,
    idea: 'Drop some centres, let each point join the nearest one, move the centres, and repeat.',
    param: { label: 'k, number of groups', min: 2, max: 5, step: 1, value: 3, digits: 0, hint: 'k-means really runs for your k. Watch the score on the elbow chart.' } },
  { id: 'pca', track: 'ml', title: 'PCA: many columns into few', tag: 'fewer columns, same story', minutes: 3, make: aiPca,
    idea: 'Find the direction where the data spreads most, then describe each point by where it lands.',
    param: { label: 'Axis angle (degrees)', min: 0, max: 175, step: 5, value: 0, digits: 0, hint: 'Turn your axis and see how much of the spread it keeps.' } },
  { id: 'biasvar', track: 'ml', title: 'The bias-variance picture', tag: 'stiff or jumpy', minutes: 4, make: aiBiasVar,
    idea: 'A stiff model misses the pattern, a flexible one wobbles with luck, and some error is unavoidable.',
    param: { label: 'Curve degree', min: 1, max: 7, step: 1, value: 3, digits: 0, hint: 'Twelve samples are fitted at your degree; bias² and variance are measured.' } },
  { id: 'tokens', track: 'now', title: 'Tokens and byte-pair encoding', tag: 'how text becomes numbers', minutes: 4, make: aiTokens,
    idea: 'Start with single letters and keep joining the most common neighbouring pair into one new piece.',
    param: { label: 'Merges', min: 0, max: AI_BPE.merges.length, step: 1, value: 6, digits: 0, hint: 'Byte-pair encoding really runs this many merges on the practice text.' },
    sources: [
      { title: 'Neural Machine Translation of Rare Words with Subword Units', org: 'Sennrich, Haddow, Birch', date: '2015-08-31', link: 'https://arxiv.org/abs/1508.07909' }
    ] },
  { id: 'distill', track: 'now', title: 'Distillation: big teacher, small student', tag: 'small model copies big one', minutes: 4, make: aiDistill,
    idea: 'A small model learns from a big model’s full set of chances, not only the right answer.',
    param: { label: 'Temperature T', min: 1, max: 10, step: 0.5, value: 4, digits: 1, hint: 'The teacher’s scores are divided by T before softmax. Higher is softer.' },
    sources: [
      { title: 'Distilling the Knowledge in a Neural Network', org: 'Hinton, Vinyals, Dean', date: '2015-03-09', link: 'https://arxiv.org/abs/1503.02531' },
      { title: 'DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter', org: 'Sanh, Debut, Chaumond, Wolf', date: '2019-10-02', link: 'https://arxiv.org/abs/1910.01108' },
      { title: 'Distilling System 2 into System 1', org: 'Yu, Xu, Weston, Kulikov', date: '2024-07-08', link: 'https://arxiv.org/abs/2407.06023' }
    ] },
  { id: 'evals', track: 'now', title: 'Evals and benchmarks', tag: 'what a score is worth', minutes: 4, make: aiEvals,
    idea: 'A benchmark is a fixed exam, and its score is only an estimate that can be off.',
    param: { label: 'Questions in the exam', min: 20, max: 2000, step: 20, value: 100, digits: 0, hint: 'More questions shrink the margin of error on each score.' },
    sources: [
      { title: 'Measuring Massive Multitask Language Understanding (MMLU)', org: 'Hendrycks, Burns, Basart, Zou et al.', date: '2020-09-07', link: 'https://arxiv.org/abs/2009.03300' },
      { title: 'Holistic Evaluation of Language Models (HELM)', org: 'Liang, Bommasani, Lee, Tsipras et al.', date: '2022-11-16', link: 'https://arxiv.org/abs/2211.09110' },
      { title: 'Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena', org: 'Zheng, Chiang, Sheng, Zhuang et al.', date: '2023-06-09', link: 'https://arxiv.org/abs/2306.05685' },
      { title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues?', org: 'Jimenez, Yang, Wettig, Yao et al.', date: '2023-10-10', link: 'https://arxiv.org/abs/2310.06770' },
      { title: 'RULER: What’s the Real Context Size of Your Long-Context Language Models?', org: 'Hsieh, Sun, Kriman, Acharya et al.', date: '2024-04-09', link: 'https://arxiv.org/abs/2404.06654' },
      { title: 'Piloting the world’s first double-blind AI evaluations', org: 'Google DeepMind', date: '2026-08-27', link: 'https://deepmind.google/blog/piloting-the-worlds-first-double-blind-ai-evaluations/' }
    ] },
  { id: 'gboost', track: 'ml', title: 'Gradient boosting', tag: 'trees that fix each other', minutes: 4, make: aiGBoost,
    idea: 'Add many tiny trees one at a time, each fixing what the model still gets wrong.',
    param: { label: 'Trees', min: 1, max: 100, step: 1, value: 10, digits: 0, hint: 'Boosting really runs this many rounds. Training and held-out error are recomputed.' } },
  { id: 'regular', track: 'ml', title: 'Regularization: L1 and L2', tag: 'a price on big numbers', minutes: 4, make: aiReg,
    idea: 'Charge a price for big weights, so L2 shrinks them a little and L1 pushes some to zero.',
    param: { label: 'Penalty λ', min: 0, max: 2.5, step: 0.1, value: 1, digits: 1, hint: 'Both penalties are solved exactly for your λ.' } },
  { id: 'crossval', track: 'ml', title: 'Cross-validation', tag: 'honest scores from little data', minutes: 4, make: aiCrossVal,
    idea: 'Test every point with a model that never saw it, by holding back one slice at a time.',
    param: { label: 'Folds k', min: 2, max: 10, step: 1, value: 5, digits: 0, hint: 'k-fold cross-validation really runs for your k, on six curve degrees.' } },
  { id: 'nbayes', track: 'ml', title: 'Naive Bayes', tag: 'counting words to spot spam', minutes: 4, make: aiNaiveBayes,
    idea: 'Multiply one chance per word, pretending words are separate, and compare spam with normal mail.',
    param: { label: 'Smoothing α', min: 0, max: 2, step: 0.1, value: 1, digits: 1, hint: 'Added to every word count before the chances are worked out.' } },
  { id: 'svm', track: 'ml', title: 'Support vector machines', tag: 'the widest street', minutes: 3, make: aiSvm,
    idea: 'Of all the lines that split two groups, pick the one with the widest empty street around it.',
    param: { label: 'Line angle (degrees)', min: 0, max: 175, step: 5, value: 90, digits: 0, hint: 'Your line is centred in the widest street it can have at this angle.' } },
  { id: 'diffusion', track: 'now', title: 'Diffusion: noise to image', tag: 'how image models draw', minutes: 4, make: aiDiffusion,
    idea: 'Learn to clean noise step by step, then start from pure noise and end with a picture.',
    param: { label: 'Denoising steps', min: 1, max: 50, step: 1, value: 10, digits: 0, hint: 'The backward walk really runs with this many steps.' },
    sources: [
      { title: 'Deep Unsupervised Learning using Nonequilibrium Thermodynamics', org: 'Sohl-Dickstein, Weiss, Maheswaranathan, Ganguli', date: '2015-03-12', link: 'https://arxiv.org/abs/1503.03585' },
      { title: 'Denoising Diffusion Probabilistic Models', org: 'Ho, Jain, Abbeel', date: '2020-06-19', link: 'https://arxiv.org/abs/2006.11239' },
      { title: 'Denoising Diffusion Implicit Models', org: 'Song, Meng, Ermon', date: '2020-10-06', link: 'https://arxiv.org/abs/2010.02502' },
      { title: 'Score-Based Generative Modeling through Stochastic Differential Equations', org: 'Song, Sohl-Dickstein, Kingma, Kumar et al.', date: '2020-11-26', link: 'https://arxiv.org/abs/2011.13456' },
      { title: 'High-Resolution Image Synthesis with Latent Diffusion Models', org: 'Rombach, Blattmann, Lorenz, Esser et al.', date: '2021-12-20', link: 'https://arxiv.org/abs/2112.10752' },
      { title: 'Classifier-Free Diffusion Guidance', org: 'Ho, Salimans', date: '2022-07-26', link: 'https://arxiv.org/abs/2207.12598' },
      { title: 'The Annotated Diffusion Model', org: 'Hugging Face', date: '2022-06-07', link: 'https://huggingface.co/blog/annotated-diffusion' }
    ] },
  { id: 'prefs', track: 'now', title: 'RLHF and DPO', tag: 'learning from human choices', minutes: 4, make: aiPrefs,
    idea: 'People pick the better of two answers, and the model learns to give winning answers more often.',
    param: { label: 'Leash strength β', min: 0.1, max: 2, step: 0.1, value: 0.5, digits: 1, hint: 'RLHF and DPO are both solved for your β, from the same votes.' },
    sources: [
      { title: 'Deep reinforcement learning from human preferences', org: 'Christiano, Leike, Brown, Martic et al.', date: '2017-06-12', link: 'https://arxiv.org/abs/1706.03741' },
      { title: 'Training language models to follow instructions with human feedback', org: 'Ouyang, Wu, Jiang, Almeida et al.', date: '2022-03-04', link: 'https://arxiv.org/abs/2203.02155' },
      { title: 'Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback', org: 'Bai, Jones, Ndousse, Askell et al.', date: '2022-04-12', link: 'https://arxiv.org/abs/2204.05862' },
      { title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model', org: 'Rafailov, Sharma, Mitchell, Ermon et al.', date: '2023-05-29', link: 'https://arxiv.org/abs/2305.18290' },
      { title: 'Illustrating Reinforcement Learning from Human Feedback (RLHF)', org: 'Hugging Face', date: '2022-12-09', link: 'https://huggingface.co/blog/rlhf' }
    ] },
  { id: 'vit', track: 'now', title: 'Vision transformers', tag: 'picture pieces as words', minutes: 3, make: aiVit,
    idea: 'Cut a picture into patches, treat each patch like a word, and let a transformer read them.',
    param: { label: 'Patch size (pixels)', min: 8, max: 32, step: 8, value: 16, digits: 0, hint: 'The token count and the attention pairs are recomputed for your patch size.' },
    sources: [
      { title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale', org: 'Dosovitskiy, Beyer, Kolesnikov, Weissenborn et al.', date: '2020-10-22', link: 'https://arxiv.org/abs/2010.11929' },
      { title: 'Training data-efficient image transformers & distillation through attention', org: 'Touvron, Cord, Douze, Massa et al.', date: '2020-12-23', link: 'https://arxiv.org/abs/2012.12877' },
      { title: 'Masked Autoencoders Are Scalable Vision Learners', org: 'He, Chen, Xie, Li et al.', date: '2021-11-11', link: 'https://arxiv.org/abs/2111.06377' },
      { title: 'Visual Instruction Tuning (LLaVA)', org: 'Liu, Li, Wu, Lee', date: '2023-04-17', link: 'https://arxiv.org/abs/2304.08485' }
    ] }
];
// Track order: ML from a line to clusters; AI now from tokens to evals (the capstone).
const AI_ORDER = ['gradient', 'logistic', 'knn', 'tree', 'nbayes', 'svm', 'confusion', 'overfit', 'crossval', 'biasvar', 'regular', 'gboost', 'kmeans', 'pca', 'backprop', 'embeddings',
  'tokens', 'attention', 'vit', 'systems', 'agents', 'rag', 'moe', 'lora', 'prefs', 'distill', 'diffusion', 'jepa', 'evals'];
AI_LESSONS.sort((a, b) => AI_ORDER.indexOf(a.id) - AI_ORDER.indexOf(b.id));
const AI_STEP_CACHE = {};
function aiSteps(i, p) {
  const L = AI_LESSONS[i];
  const v = L.param ? (p === undefined || p === null ? L.param.value : p) : 0;
  const key = i + ':' + v;
  return AI_STEP_CACHE[key] || (AI_STEP_CACHE[key] = L.make(v));
}
