// DSA concept lesson check: loads src/ai/render.js (the shared scene renderer) with src/concepts/lessons.js and
// validates every lesson. Captions are present, end a sentence and are at most 140 characters; scenes only
// reference real items and stay on the canvas; 6-16 steps per lesson; sliders change what is shown; every
// "Now try" link resolves to a problem in the registry (data/problem-registry.json); every pattern-map group is
// a real sheet group; nothing names an outside problem site; and the values each lesson computes match this
// file's own reference code (sorts end sorted, hashing buckets, shortest paths, sieve, powers...).
// Also renders every step of the ConceptLesson page headlessly and checks the built pages carry the current code.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8').replace(/\r\n/g, '\n');
const src = read('src', 'ai', 'render.js') + '\n' + read('src', 'concepts', 'lessons.js');
const M = new Function(src + '\nreturn { CS_TRACKS, CS_LESSONS, csSteps, aiSceneProblems, aiFlatten, aiPaint, aiTween, aiColors };')();
let problems = 0;
const fail = (where, msg) => { problems++; console.log('  ✗', where, msg); };

const registry = JSON.parse(read('data', 'problem-registry.json')).entries;
const known = {}; registry.forEach((e) => { known[e.row] = e; known[e.id] = e; });
const win = { localStorage: { getItem: () => null, setItem: () => {} } };
const { SHEET_GROUPS, PATTERN_MAP } = new Function('window', read('shared', 'catalog.js') + '\n' + read('shared', 'sheet.js') + '\n' + read('shared', 'pattern_intros.js') + '\nreturn { SHEET_GROUPS, PATTERN_MAP };')(win);
const groupNames = SHEET_GROUPS.map(([n]) => n);
const mapNodes = PATTERN_MAP.nodes.map(([n]) => n);

if (/leet\s*code/i.test(read('src', 'concepts', 'lessons.js'))) fail('lessons.js', 'names an outside problem site');

// ---- reference code: each returns an error string, or '' when the lesson's numbers are right ----
const sortedCopy = (a) => a.slice().sort((x, y) => x - y);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const lastBarsInOrder = (steps) => {
  const sc = steps[steps.length - 1].scene;
  const items = (sc.bars && sc.bars.length ? sc.bars : (sc.boxes || []).filter((b) => /^[ma]\d+$/.test(b.id))).filter((b) => b.val !== undefined || b.label !== undefined);
  const vals = items.slice().sort((a, b) => a.x - b.x).map((b) => Number(b.val !== undefined ? b.val : b.label));
  return same(vals, sortedCopy(vals)) ? '' : 'last picture is not sorted: ' + vals.join(' ');
};
const REF = {
  bigo: (s, n) => { const lg = Math.max(1, Math.ceil(Math.log2(n))); return same(s.out, [1, lg, n, n * lg, n * n, Math.pow(2, n)]) ? '' : 'step counts wrong: ' + s.out; },
  arrays: (s, p) => { const a = [7, 3, 9, 4, 6]; a.splice(p, 0, 5); return s.out.moved === 5 - p && same(s.out.after, a) ? '' : 'insert result wrong'; },
  recursion: (s, n) => { let f = 1; for (let i = 2; i <= n; i++) f *= i; return s.out === f ? '' : 'fact(' + n + ') = ' + s.out + ', want ' + f; },
  bubble: (s) => (same(s.out, sortedCopy([6, 3, 8, 2, 7, 4])) ? lastBarsInOrder(s) : 'did not sort'),
  selection: (s) => (same(s.out, sortedCopy([6, 3, 8, 2, 7, 4])) ? lastBarsInOrder(s) : 'did not sort'),
  insertion: (s) => (same(s.out, sortedCopy([6, 3, 8, 2, 7, 4])) ? lastBarsInOrder(s) : 'did not sort'),
  merge: (s) => (same(s.out, sortedCopy([5, 2, 7, 1, 6, 3, 8, 4])) ? lastBarsInOrder(s) : 'did not sort'),
  quick: (s) => (same(s.out, sortedCopy([5, 2, 8, 1, 9, 3, 7, 4])) ? lastBarsInOrder(s) : 'did not sort'),
  heapsort: (s) => (same(s.out, sortedCopy([3, 9, 2, 7, 5, 8, 1])) ? lastBarsInOrder(s) : 'did not sort'),
  countradix: (s) => (same(s.out.counting, sortedCopy([3, 1, 4, 1, 0, 3, 2, 1])) && same(s.out.radix, sortedCopy([329, 457, 657, 839, 436, 720, 355])) ? '' : 'counting or radix result wrong'),
  hashing: (s, m) => {
    const keys = [15, 8, 22, 31, 4, 17, 29, 12]; const c = {}; keys.forEach((k) => { c[k % m] = (c[k % m] || 0) + 1; });
    return same(s.out.buckets, keys.map((k) => k % m)) && s.out.worst === Math.max(...Object.values(c)) ? '' : 'bucket numbers wrong';
  },
  openaddr: (s) => {
    const t = new Array(11).fill(null); [12, 23, 5, 34, 16, 9, 27].forEach((k) => { let b = k % 11; while (t[b] !== null) b = (b + 1) % 11; t[b] = k; });
    return same(s.out, t) ? '' : 'probe table wrong';
  }
};

const trackIds = M.CS_TRACKS.map((t) => t.id);
const ids = {};
const T = { accent: '#C5F04A', right: '#5AC8FA', left: '#C5F04A', flame: '#FF8A3D', ok: '#30D158', muted: '#8E8E93', text: '#F5F5F7', text2: '#C7C7CC', faint: '#55555C', line: '#26262C', line2: '#34343C', surface: '#151518', sunk: '#1F1F23', onAccent: '#0A0A0A', mono: 'mono', body: 'body', diff: { Hard: ['#FF453A'] } };
const C = M.aiColors(T);

M.CS_LESSONS.forEach((L, li) => {
  const where = L.id || 'lesson ' + li;
  if (!L.id) fail(where, 'missing id'); else if (ids[L.id]) fail(where, 'duplicate id'); else ids[L.id] = 1;
  if (trackIds.indexOf(L.track) < 0) fail(where, 'unknown track ' + L.track);
  ['title', 'tag', 'idea'].forEach((k) => { if (!L[k] || !String(L[k]).trim()) fail(where, 'missing ' + k); });
  if (L.idea && L.idea.length > 140) fail(where, 'idea is ' + L.idea.length + ' chars (max 140)');
  if ('credit' in L) fail(where, 'carries a content credit; lessons are 100% our own writing');
  // Now try: 1-3 of our own problems, each in the registry
  if (!Array.isArray(L.tryIt) || L.tryIt.length < 1 || L.tryIt.length > 3) fail(where, 'needs 1-3 "now try" problems');
  (L.tryIt || []).forEach((id) => { if (!known[id]) fail(where, 'now-try ' + id + ' is not in the problem registry'); });
  if (!Array.isArray(L.groups) || !L.groups.length) fail(where, 'needs at least one sheet group for the pattern map');
  (L.groups || []).forEach((g) => { if (groupNames.indexOf(g) < 0) fail(where, 'group ' + g + ' is not a sheet group'); });
  if ((L.groups || []).length && !L.groups.some((g) => mapNodes.indexOf(g) >= 0)) fail(where, 'no group is a node on the pattern map');
  if (typeof L.make !== 'function') { fail(where, 'no make()'); return; }
  const values = [undefined];
  if (L.param) {
    const P = L.param;
    if (!(P.min < P.max) || !(P.step > 0) || P.value < P.min || P.value > P.max) fail(where, 'slider range is not valid');
    if (!P.label || !P.hint) fail(where, 'slider needs a label and a hint');
    for (let v = P.min; v <= P.max + 1e-9; v += P.step) values.push(Number(v.toFixed(4)));
  }
  values.forEach((v) => {
    let steps;
    try { steps = M.csSteps(li, v); } catch (e) { fail(where, 'make(' + v + ') threw: ' + e.message); return; }
    const tagv = where + (v === undefined ? '' : ' @' + v);
    if (!Array.isArray(steps) || steps.length < 6 || steps.length > 16) fail(tagv, 'has ' + (steps ? steps.length : 0) + ' steps (6-16)');
    (steps || []).forEach((s, i) => {
      const w = tagv + ' step ' + (i + 1);
      const say = (s.say || '').trim();
      if (!say) fail(w, 'empty caption');
      if (say.length > 140) fail(w, 'caption is ' + say.length + ' chars (max 140): ' + say);
      if (/undefined|NaN|\{\{|\[\w+\]$/.test(say)) fail(w, 'caption has a placeholder: ' + say);
      if (!/[.!?”’)]$/.test(say)) fail(w, 'caption should end a sentence: ' + say);
      if (/leet\s*code/i.test(say)) fail(w, 'names an outside problem site');
      if (!s.scene || typeof s.scene !== 'object') { fail(w, 'missing scene'); return; }
      M.aiSceneProblems(s.scene, s.focus).forEach((p) => fail(w, p));
      const flat = M.aiFlatten(s.scene, C, s.focus);
      const painted = JSON.stringify(M.aiPaint(flat, T));
      if (/NaN|undefined/.test(painted)) fail(w, 'painted scene has NaN or undefined');
      flat.rects.concat(flat.halos).forEach((r) => { if (r.op > 0.05 && (r.x < -20 || r.y < -40 || r.x + r.w > 980 || r.y + r.h > 580)) fail(w, 'rect off canvas ' + r.k); });
      flat.circles.forEach((c) => { if (c.op > 0.05 && (c.cx - c.r < -10 || c.cx + c.r > 970 || c.cy - c.r < -40 || c.cy + c.r > 580)) fail(w, 'circle off canvas ' + c.k); });
      flat.texts.forEach((x) => { if (x.op > 0.05 && (x.x < 0 || x.x > 960 || x.y < -30 || x.y > 575)) fail(w, 'text off canvas ' + x.k + ' "' + x.text + '"'); });
      if (i > 0) M.aiTween(M.aiFlatten(steps[i - 1].scene, C, steps[i - 1].focus), flat, 0.5);
    });
    if (REF[L.id] && steps) {
      const pv = v === undefined ? (L.param ? L.param.value : 0) : v;
      let err; try { err = REF[L.id](steps, pv); } catch (e) { err = 'reference check threw: ' + e.message; }
      if (err) fail(tagv, err);
    }
  });
  if (L.sorts && !REF[L.id]) fail(where, 'a sort lesson needs a reference check');
  if (L.param) {
    try { if (JSON.stringify(M.csSteps(li, L.param.min)) === JSON.stringify(M.csSteps(li, L.param.max))) fail(where, 'slider does not change anything'); } catch (e) { /* reported above */ }
  }
  let nSteps = 0; try { nSteps = M.csSteps(li).length; } catch (e) { return; }
  console.log('✓ ' + L.id + ': ' + nSteps + ' steps' + (L.param ? ', slider ' + L.param.label : '') + (REF[L.id] ? ', values checked' : '') + ', now try ' + L.tryIt.length);
});
trackIds.forEach((t) => { if (!M.CS_LESSONS.some((L) => L.track === t)) console.log('  note: no lessons yet in track ' + t); });
Object.keys(REF).forEach((id) => { if (!ids[id]) fail('REF', 'reference for a missing lesson ' + id); });

// The pages must carry the current lesson code (run the build after editing src/concepts or src/ai/render.js).
['ConceptLesson', 'Concepts'].forEach((n) => {
  const file = path.join(root, 'pages', n + '.dc.html');
  if (!fs.existsSync(file)) { fail(n, 'page missing'); return; }
  const page = read('pages', n + '.dc.html');
  const a = page.indexOf('// @@CONCEPTS@@'); const b = page.indexOf('// @@END-CONCEPTS@@');
  if (a < 0 || b < 0) fail(n, 'missing the @@CONCEPTS@@ block');
  else if (page.slice(a, b).indexOf(src.trim().slice(0, 200)) < 0 || page.slice(a, b).indexOf(src.trim().slice(-200)) < 0) fail(n, 'lesson code is out of date: run python scripts/build_pages.py');
});
// The pattern map links every lesson from its groups' nodes.
const pat = read('pages', 'Patterns.dc.html');
const pa = pat.indexOf('// @@CONCEPT-MAP@@'); const pb = pat.indexOf('// @@END-CONCEPT-MAP@@');
if (pa < 0 || pb < 0) fail('Patterns', 'missing the @@CONCEPT-MAP@@ block');
else {
  const CM = new Function(pat.slice(pa, pb) + '\nreturn CONCEPT_MAP;')();
  M.CS_LESSONS.forEach((L) => L.groups.filter((g) => mapNodes.indexOf(g) >= 0).forEach((g) => { if (!(CM[g] || []).some(([id]) => id === L.id)) fail('Patterns', g + ' does not link ' + L.id + ': run the build'); }));
}

// Render the lesson page for every lesson and step, at slider ends, desktop and mobile.
const script = read('pages', 'ConceptLesson.dc.html').match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const store = {};
const P = new Function('store', `const window = { localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; }, removeItem: (k) => { delete store[k]; } }, addEventListener(){}, removeEventListener(){}, innerWidth: 1440, location: { search: '' } };
const setInterval = () => 1, clearInterval = () => {};
class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, typeof o === 'function' ? o(this.state) : o); } forceUpdate() {} }
${script}; return { Component };`)(store);
const c = new P.Component({});
M.CS_LESSONS.forEach((L, li) => {
  const vals = L.param ? [L.param.min, L.param.value, L.param.max] : [null];
  vals.forEach((pv) => [false, true].forEach((mobile) => {
    const n = M.csSteps(li, pv === null ? undefined : pv).length;
    for (let i = 0; i < n; i++) {
      c.setState({ lesson: li, step: i, param: pv, mobile });
      const v = c.renderVals();
      const txt = JSON.stringify(v, (k, x) => (typeof x === 'function' ? undefined : x));
      if (/undefined|NaN/.test(txt)) { const m = txt.match(/.{60}(undefined|NaN).{40}/); fail(L.id + ' render step ' + (i + 1), m && m[0]); break; }
      if (i === n - 1 && (!v.tryIt || !v.tryIt.items.length || v.tryIt.items.some((t) => !/^Code\.dc\.html\?problem=/.test(t.href)))) fail(L.id, 'last step does not show "now try" links to our problem page');
    }
  }));
});

console.log(M.CS_LESSONS.length + ' concept lessons');
console.log(problems ? problems + ' problem(s)' : 'all concept lessons valid');
if (problems) process.exitCode = 1;
