// AI lesson renderer: turns a lesson scene (points, lines, nets, tokens, boxes…) into four lists of
// SVG primitives (rects, paths, circles, texts) and eases between two scenes. Pure functions only:
// tests/aicheck.js loads this file with lessons.js and checks every scene through aiSceneProblems().
const AI_VIEW = { w: 960, h: 540 };
const AI_EASE_MS = 700;

function aiColors(t) {
  const bad = (t.diff && t.diff.Hard && t.diff.Hard[0]) || t.flame;
  // Second class colour: blue where the theme has one distinct from the accent, otherwise the left colour.
  const b = t.right !== t.accent ? t.right : t.left;
  return { a: t.accent, b, c: t.flame, ok: t.ok, bad, m: t.muted, t: t.text, t2: t.text2, f: t.faint, l: t.line2, ln: t.line, bg: t.surface, sunk: t.sunk, on: t.onAccent };
}
function aiNum(v, d) { return typeof v === 'number' && isFinite(v) ? v : d; }
function aiFmt(v, n) { const s = Number(v).toFixed(n === undefined ? 2 : n); return s.replace('-', '−'); }
function aiTokW(text) { return Math.round(String(text).length * 8.6 + 22); }

// Geometry helpers for anchoring arrows on boxes, nodes, tokens and points.
function aiAnchors(scene) {
  const A = {};
  (scene.boxes || []).forEach((b) => { A[b.id] = { x: b.x + b.w / 2, y: b.y + b.h / 2, hw: b.w / 2, hh: b.h / 2 }; });
  (scene.nodes || []).forEach((n) => { A[n.id] = { x: n.x, y: n.y, r: aiNum(n.r, 22) }; });
  (scene.tokens || []).forEach((k) => { const w = aiNum(k.w, aiTokW(k.text)); A[k.id] = { x: k.x, y: k.y, hw: w / 2, hh: 17 }; });
  (scene.points || []).forEach((p) => { A[p.id] = { x: p.x, y: p.y, r: aiNum(p.r, 7) + 3 }; });
  return A;
}
function aiEdgePoint(a, dx, dy) {
  if (a.r !== undefined) { const L = Math.hypot(dx, dy) || 1; return [a.x + (dx / L) * a.r, a.y + (dy / L) * a.r]; }
  if (a.hw === undefined) return [a.x, a.y];
  const s = Math.min(dx ? a.hw / Math.abs(dx) : Infinity, dy ? a.hh / Math.abs(dy) : Infinity);
  return [a.x + dx * s, a.y + dy * s];
}
function aiRef(A, r) { return typeof r === 'string' ? A[r] : r && typeof r.x === 'number' ? { x: r.x, y: r.y } : undefined; }
function aiHead(x1, y1, x2, y2, s) {
  const L = Math.hypot(x2 - x1, y2 - y1) || 1; const ux = (x2 - x1) / L; const uy = (y2 - y1) / L;
  return [[x2, y2], [x2 - ux * s - uy * s * 0.55, y2 - uy * s + ux * s * 0.55], [x2 - ux * s + uy * s * 0.55, y2 - uy * s - ux * s * 0.55]];
}

// Problems in a scene: references to missing items, focus on missing ids, numbers that are not numbers.
function aiSceneProblems(scene, focus) {
  const out = []; const A = aiAnchors(scene);
  const ids = {};
  ['regions', 'paths', 'rings', 'edges', 'links', 'arrows', 'bars', 'boxes', 'nodes', 'points', 'tokens', 'labels'].forEach((k) => (scene[k] || []).forEach((it) => {
    if (!it.id) out.push(k + ' item without an id');
    else if (ids[it.id]) out.push('duplicate id ' + it.id); else ids[it.id] = 1;
  }));
  (scene.edges || []).forEach((e) => { if (!A[e.from] || A[e.from].r === undefined) out.push('edge ' + e.id + ' from missing node ' + e.from); if (!A[e.to] || A[e.to].r === undefined) out.push('edge ' + e.id + ' to missing node ' + e.to); });
  (scene.links || []).forEach((l) => { const tk = {}; (scene.tokens || []).forEach((k) => { tk[k.id] = 1; }); if (!tk[l.from] || !tk[l.to]) out.push('link ' + l.id + ' between missing tokens ' + l.from + '→' + l.to); });
  (scene.arrows || []).forEach((a) => { if (!aiRef(A, a.from)) out.push('arrow ' + a.id + ' from missing ' + JSON.stringify(a.from)); if (!aiRef(A, a.to)) out.push('arrow ' + a.id + ' to missing ' + JSON.stringify(a.to)); });
  (focus || []).forEach((f) => { if (!ids[f]) out.push('focus on missing id ' + f); });
  const txt = JSON.stringify(scene);
  if (/NaN|Infinity|null/.test(txt)) out.push('scene has NaN, Infinity or null');
  return out;
}

// Scene -> primitives. Every primitive has a stable key so two scenes can be eased into each other.
function aiFlatten(scene, C, focus) {
  const R = []; const P = []; const G = []; const O = []; const T = []; const H = [];
  const F = {}; (focus || []).forEach((f) => { F[f] = 1; });
  const hasF = (focus || []).length > 0;
  const dim = (id) => (hasF && !F[id] ? 0.42 : 1);
  const dimT = (id) => (hasF && !F[id] ? 0.72 : 1); // context text stays readable
  const col = (c, d) => C[c] || C[d] || C.t;
  const A = aiAnchors(scene);
  const halo = (id, x, y, w, h, rx) => { if (F[id]) H.push({ k: 'h:' + id, x: x - 8, y: y - 8, w: w + 16, h: h + 16, rx: rx + 8 }); };
  const text = (k, x, y, s, o) => T.push({ k, x, y, text: String(s), fill: o.fill, size: o.size || 14, weight: o.weight || 500, anchor: o.anchor || 'start', op: aiNum(o.op, 1), mono: !!o.mono });

  (scene.regions || []).forEach((g) => R.push({ k: 'g:' + g.id, x: g.x, y: g.y, w: g.w, h: g.h, rx: aiNum(g.rx, 6), fill: col(g.c, 'm'), stroke: 'none', sw: 0, dash: '', op: aiNum(g.op, 0.14) }));
  if (scene.axes) {
    const x = scene.axes;
    P.push({ k: 'ax', pts: [[x.x0, x.y1], [x.x0, x.y0], [x.x1, x.y0]], mode: 'L', fill: 'none', stroke: C.l, sw: 1.5, dash: '', op: 1 });
    if (x.xl) text('ax:x', x.x1, x.y0 + 28, x.xl, { fill: C.m, size: 13, anchor: 'end' });
    if (x.yl) text('ax:y', x.x0 + 8, x.y1 - 10, x.yl, { fill: C.m, size: 13 });
  }
  (scene.paths || []).forEach((p) => {
    P.push({ k: 'p:' + p.id, pts: p.pts, mode: p.mode || 'L', fill: p.fill ? col(p.fill) : 'none', stroke: col(p.c, 'm'), sw: aiNum(p.w, 3), dash: p.dash ? '6 6' : '', op: aiNum(p.op, 1) * dim(p.id) });
  });
  (scene.rings || []).forEach((g) => {
    O.push({ k: 'o:' + g.id, cx: g.x, cy: g.y, r: g.r, fill: 'none', stroke: col(g.c, 'm'), sw: aiNum(g.w, 2), dash: g.dash === false ? '' : '5 6', op: aiNum(g.op, 1) * dim(g.id) });
    halo(g.id, g.x - g.r, g.y - g.r, g.r * 2, g.r * 2, g.r);
  });
  (scene.edges || []).forEach((e) => {
    const a = A[e.from]; const b = A[e.to]; if (!a || !b) return;
    const p1 = aiEdgePoint(a, b.x - a.x, b.y - a.y); const p2 = aiEdgePoint(b, a.x - b.x, a.y - b.y);
    const w = aiNum(e.w, 0.5);
    P.push({ k: 'e:' + e.id, pts: [p1, p2], mode: 'L', fill: 'none', stroke: e.c ? col(e.c) : w >= 0 ? C.b : C.c, sw: 1.5 + 5 * Math.min(1, Math.abs(w)), dash: '', op: 0.9 * dim(e.id) });
    if (e.label !== undefined && e.label !== '') {
      const f = aiNum(e.at, 0.5); const mx = p1[0] + (p2[0] - p1[0]) * f; const my = p1[1] + (p2[1] - p1[1]) * f;
      G.push({ k: 'el:' + e.id, x: mx - 34, y: my - 13, w: 68, h: 24, rx: 6, fill: C.bg, stroke: e.lc ? col(e.lc) : C.ln, sw: 1, dash: '', op: 1 });
      text('et:' + e.id, mx, my + 5, e.label, { fill: e.lc ? col(e.lc) : C.t2, size: 13, anchor: 'middle', mono: true, op: dimT(e.id) });
    }
  });
  (scene.links || []).forEach((l) => {
    const a = A[l.from]; const b = A[l.to]; if (!a || !b) return;
    const up = l.below ? 1 : -1;
    const y1 = a.y + up * a.hh; const y2 = b.y + up * b.hh;
    const lift = 26 + Math.abs(b.x - a.x) * 0.32;
    const cx = (a.x + b.x) / 2; const cy = Math.min(y1, y2) * (up < 0 ? 1 : 0) + Math.max(y1, y2) * (up > 0 ? 1 : 0) + up * lift;
    const w = Math.max(0, Math.min(1, aiNum(l.w, 0.5)));
    const sx = a.x + (b.x > a.x ? 6 : b.x < a.x ? -6 : 0);
    P.push({ k: 'l:' + l.id, pts: [[sx, y1], [cx, cy], [b.x, y2]], mode: 'Q', fill: 'none', stroke: col(l.c, 'a'), sw: 1 + 7 * w, dash: '', op: (0.25 + 0.75 * w) * dim(l.id) * aiNum(l.op, 1) });
    if (w > 0.12) P.push({ k: 'lh:' + l.id, pts: aiHead(cx, cy, b.x, y2, 7 + 6 * w), mode: 'Z', fill: col(l.c, 'a'), stroke: 'none', sw: 0, dash: '', op: (0.25 + 0.75 * w) * dim(l.id) * aiNum(l.op, 1) });
  });
  (scene.arrows || []).forEach((r) => {
    const a = aiRef(A, r.from); const b = aiRef(A, r.to); if (!a || !b) return;
    const p1 = aiEdgePoint(a, b.x - a.x, b.y - a.y); const p2 = aiEdgePoint(b, a.x - b.x, a.y - b.y);
    const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) || 1; const gap = 5;
    const s = [p1[0] + (p2[0] - p1[0]) * gap / L, p1[1] + (p2[1] - p1[1]) * gap / L];
    const e = [p2[0] - (p2[0] - p1[0]) * (gap + 8) / L, p2[1] - (p2[1] - p1[1]) * (gap + 8) / L];
    const tip = [p2[0] - (p2[0] - p1[0]) * gap / L, p2[1] - (p2[1] - p1[1]) * gap / L];
    const c = col(r.c, 'm'); const op = aiNum(r.op, 1) * dim(r.id);
    P.push({ k: 'r:' + r.id, pts: [s, e], mode: 'L', fill: 'none', stroke: c, sw: aiNum(r.w, 2.5), dash: r.dash ? '6 6' : '', op });
    P.push({ k: 'rh:' + r.id, pts: aiHead(s[0], s[1], tip[0], tip[1], 11), mode: 'Z', fill: c, stroke: 'none', sw: 0, dash: '', op });
    if (r.label) {
      const mx = (s[0] + tip[0]) / 2 + aiNum(r.lx, 0); const my = (s[1] + tip[1]) / 2 + aiNum(r.ly, -10);
      text('rt:' + r.id, mx, my, r.label, { fill: r.lc ? col(r.lc) : C.t2, size: 13, anchor: 'middle', op: aiNum(r.op, 1) * dimT(r.id), mono: !!r.mono });
    }
  });
  (scene.bars || []).forEach((b) => {
    const op = aiNum(b.op, 1) * dim(b.id);
    R.push({ k: 'b:' + b.id, x: b.x, y: b.y, w: b.w, h: Math.max(0, b.h), rx: aiNum(b.rx, 3), fill: b.hollow ? 'none' : col(b.c, 'm'), stroke: b.hollow ? col(b.c, 'm') : 'none', sw: b.hollow ? 2 : 0, dash: b.hollow ? '4 4' : '', op });
    if (b.label) text('bl:' + b.id, b.x + b.w / 2, aiNum(b.ly, b.y + b.h + 18), b.label, { fill: C.t2, size: 12, anchor: 'middle', op: dimT(b.id), mono: !!b.mono });
    if (b.val) text('bv:' + b.id, aiNum(b.vx, b.x + b.w / 2), aiNum(b.vy, b.y - 7), b.val, { fill: C.t, size: 12, anchor: b.vx !== undefined ? 'start' : 'middle', op: dimT(b.id), mono: true });
  });
  (scene.boxes || []).forEach((b) => {
    const solid = b.solid; const c = col(b.c, 'l'); const op = aiNum(b.op, 1) * dim(b.id); const opT = aiNum(b.op, 1) * dimT(b.id);
    R.push({ k: 'x:' + b.id, x: b.x, y: b.y, w: b.w, h: b.h, rx: aiNum(b.rx, 12), fill: solid ? C.a : C.sunk, stroke: solid ? C.a : c, sw: 2, dash: b.dash ? '6 6' : '', op });
    const cy = b.y + b.h / 2; const two = b.sub ? 9 : 0;
    if (b.label) text('xt:' + b.id, b.x + b.w / 2, cy + 5 - two, b.label, { fill: solid ? C.on : C.t, size: aiNum(b.size, 16), weight: 700, anchor: 'middle', op: opT, mono: !!b.mono });
    if (b.sub) text('xs:' + b.id, b.x + b.w / 2, cy + 5 + 12, b.sub, { fill: solid ? C.on : C.t2, size: 12, anchor: 'middle', op: opT, mono: !!b.subMono });
    halo(b.id, b.x, b.y, b.w, b.h, aiNum(b.rx, 12));
  });
  (scene.nodes || []).forEach((n) => {
    const r = aiNum(n.r, 22); const op = aiNum(n.op, 1) * dim(n.id); const opT = aiNum(n.op, 1) * dimT(n.id);
    O.push({ k: 'n:' + n.id, cx: n.x, cy: n.y, r, fill: n.solid ? C.a : C.sunk, stroke: col(n.c, 'b'), sw: 2.5, dash: '', op });
    if (n.label !== undefined && n.label !== '') text('nt:' + n.id, n.x, n.y + 5, n.label, { fill: n.solid ? C.on : C.t, size: 13, weight: 700, anchor: 'middle', op: opT, mono: true });
    if (n.sub) text('ns:' + n.id, n.x, aiNum(n.sy, n.y + r + 18), n.sub, { fill: n.sc ? col(n.sc) : C.t2, size: 13, anchor: 'middle', op: opT, mono: !!n.subMono });
    halo(n.id, n.x - r, n.y - r, r * 2, r * 2, r);
  });
  (scene.points || []).forEach((p) => {
    const r = aiNum(p.r, 7); const c = col(p.c, 'm'); const op = aiNum(p.op, 1) * dim(p.id); const opT = aiNum(p.op, 1) * dimT(p.id);
    O.push({ k: 'pt:' + p.id, cx: p.x, cy: p.y, r, fill: p.hollow ? C.bg : c, stroke: c, sw: p.hollow ? 2.5 : 1.5, dash: '', op });
    if (p.ring) O.push({ k: 'pr:' + p.id, cx: p.x, cy: p.y, r: r + 6, fill: 'none', stroke: c, sw: 2, dash: '', op });
    if (p.label) text('pl:' + p.id, p.x + aiNum(p.lx, r + 7), p.y + aiNum(p.ly, 5), p.label, { fill: p.lc ? col(p.lc) : C.t2, size: 13, op: opT, anchor: p.la || 'start' });
    halo(p.id, p.x - r, p.y - r, r * 2, r * 2, r);
  });
  (scene.tokens || []).forEach((k) => {
    const w = aiNum(k.w, aiTokW(k.text)); const op = aiNum(k.op, 1) * dim(k.id); const opT = aiNum(k.op, 1) * dimT(k.id);
    R.push({ k: 'k:' + k.id, x: k.x - w / 2, y: k.y - 17, w, h: 34, rx: 8, fill: k.solid ? C.a : C.sunk, stroke: k.solid ? C.a : col(k.c, 'l'), sw: 2, dash: k.dash ? '5 5' : '', op });
    text('kt:' + k.id, k.x, k.y + 5, k.text, { fill: k.solid ? C.on : C.t, size: 15, weight: 600, anchor: 'middle', op: opT, mono: true });
    if (k.sub) text('ks:' + k.id, k.x, k.y + 36, k.sub, { fill: k.sc ? col(k.sc) : C.t2, size: 12, anchor: 'middle', op: opT, mono: true });
    halo(k.id, k.x - w / 2, k.y - 17, w, 34, 8);
  });
  (scene.labels || []).forEach((l) => text('t:' + l.id, l.x, l.y, l.text, { fill: col(l.c, 't'), size: aiNum(l.size, 14), weight: aiNum(l.weight, 500), anchor: l.anchor || 'start', op: aiNum(l.op, 1), mono: !!l.mono }));
  return { rects: R, paths: P, tags: G, circles: O, texts: T, halos: H };
}

function aiEaseInOut(x) { x = Math.max(0, Math.min(1, x)); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
const AI_NUM_KEYS = ['x', 'y', 'w', 'h', 'rx', 'cx', 'cy', 'r', 'sw', 'op', 'size'];
// Ease scene A into scene B: shared keys move, new keys fade in, missing keys fade out.
function aiTween(A, B, k) {
  if (!A || k >= 1) return B;
  const out = {};
  ['rects', 'paths', 'tags', 'circles', 'texts', 'halos'].forEach((list) => {
    const from = {}; (A[list] || []).forEach((p) => { from[p.k] = p; });
    const seen = {};
    const res = (B[list] || []).map((b) => {
      seen[b.k] = 1;
      const a = from[b.k];
      const o = Object.assign({}, b);
      if (!a) { if (o.op !== undefined) o.op = b.op * k; else o.op = k; return o; }
      AI_NUM_KEYS.forEach((n) => { if (typeof a[n] === 'number' && typeof b[n] === 'number') o[n] = a[n] + (b[n] - a[n]) * k; });
      if (a.pts && b.pts && a.pts.length === b.pts.length) o.pts = b.pts.map((q, i) => [a.pts[i][0] + (q[0] - a.pts[i][0]) * k, a.pts[i][1] + (q[1] - a.pts[i][1]) * k]);
      if (list === 'texts' && a.text !== b.text && k < 0.5) o.text = a.text;
      return o;
    });
    (A[list] || []).forEach((a) => { if (!seen[a.k] && aiNum(a.op, 1) * (1 - k) > 0.02) { const o = Object.assign({}, a); o.op = aiNum(a.op, 1) * (1 - k); res.push(o); } });
    out[list] = res;
  });
  return out;
}
function aiD(p) {
  const f = (q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1);
  if (!p.pts || !p.pts.length) return 'M0 0';
  if (p.mode === 'Q' && p.pts.length === 3) return 'M' + f(p.pts[0]) + ' Q' + f(p.pts[1]) + ' ' + f(p.pts[2]);
  return 'M' + p.pts.map(f).join(' L') + (p.mode === 'Z' ? ' Z' : '');
}
// Primitives -> template-ready values (every item in a list carries the same fields).
function aiPaint(S, t, textScale) {
  const ts = textScale || 1;
  const r1 = (v) => Math.round(aiNum(v, 0) * 10) / 10;
  return {
    halos: S.halos.map((h) => ({ x: r1(h.x), y: r1(h.y), w: r1(Math.max(0, h.w)), h: r1(Math.max(0, h.h)), rx: r1(h.rx), op: r1(aiNum(h.op, 1)) })),
    tags: S.tags.map((r) => ({ x: r1(r.x), y: r1(r.y), w: r1(Math.max(0, r.w)), h: r1(Math.max(0, r.h)), rx: r1(r.rx), fill: r.fill, stroke: r.stroke, sw: r1(r.sw), op: Math.round(aiNum(r.op, 1) * 100) / 100 })),
    rects: S.rects.map((r) => ({ x: r1(r.x), y: r1(r.y), w: r1(Math.max(0, r.w)), h: r1(Math.max(0, r.h)), rx: r1(r.rx), fill: r.fill, stroke: r.stroke, sw: r1(r.sw), dash: r.dash || 'none', op: Math.round(aiNum(r.op, 1) * 100) / 100 })),
    paths: S.paths.map((p) => ({ d: aiD(p), fill: p.fill, stroke: p.stroke, sw: r1(p.sw), dash: p.dash || 'none', op: Math.round(aiNum(p.op, 1) * 100) / 100 })),
    circles: S.circles.map((c) => ({ cx: r1(c.cx), cy: r1(c.cy), r: r1(Math.max(0, c.r)), fill: c.fill, stroke: c.stroke, sw: r1(c.sw), dash: c.dash || 'none', op: Math.round(aiNum(c.op, 1) * 100) / 100 })),
    texts: S.texts.map((x) => ({ x: r1(x.x), y: r1(x.y), text: x.text, fill: x.fill, size: Math.round(x.size * ts), weight: x.weight, anchor: x.anchor, op: Math.round(aiNum(x.op, 1) * 100) / 100, font: x.mono ? t.mono : t.body }))
  };
}
