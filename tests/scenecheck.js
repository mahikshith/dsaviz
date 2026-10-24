// Data check for every animated story: code-line maps, narration at all depths, a plain-words task, and every step renders
// on the problem page in every language and both code tabs, with the step's code line lit and its caption filled.
const fs = require('fs');
const src = fs.readFileSync(require('path').join(__dirname, '..', 'pages', 'Story.dc.html'), 'utf8');
const script = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const store = {};
const f = new Function('store', `const window = { localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } }, addEventListener(){}, removeEventListener(){} };
const setInterval = () => 1, clearInterval = () => {};
class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, o); } }
${script}; return { SCENES, SCENE_ORDER, Component, PROBLEMS, STORY_CAST, STORY_TASKS, SCENE_INPUT, runFromText, predictQuestion, predictKind, graphBox, graphEdgeKey };`);
const { SCENES, SCENE_ORDER, Component, PROBLEMS, STORY_CAST, STORY_TASKS, SCENE_INPUT, runFromText, predictQuestion, predictKind, graphBox, graphEdgeKey } = f(store);
// graph stories: at most 12 nodes with unique ids inside the unit box, edges between real nodes, no two nodes drawn on top of
// each other (checked at the desktop and the phone size), and every step's states, notes and actor name real nodes and edges
const NODE_STATES = new Set(['in', 'out', 'future', 'cur', 'hit', 'dup', 'ok', 'paint', 'stored', 'buy', 'best']);
const EDGE_STATES = new Set(['', 'path', 'out', 'active', 'hide']);
function checkGraph(S, where, report) {
  const G = S.graph;
  if (!G || !Array.isArray(G.nodes) || !Array.isArray(G.edges) || !G.nodes.length) { report(where + ' graph needs nodes and edges'); return; }
  const ids = new Set();
  for (const n of G.nodes) {
    if (typeof n.id !== 'string') report(where + ' node ids are strings, got ' + JSON.stringify(n.id));
    if (ids.has(n.id)) report(where + ' duplicate node id ' + n.id);
    ids.add(n.id);
    if (!(n.x >= 0 && n.x <= 1 && n.y >= 0 && n.y <= 1)) report(where + ' node ' + n.id + ' is outside the unit box');
    if (n.label == null || String(n.label).length > 3) report(where + ' node ' + n.id + ' needs a label of 1 to 3 characters');
  }
  if (G.nodes.length > 12) report(where + ' graph has ' + G.nodes.length + ' nodes (at most 12)');
  const keys = new Set();
  for (const e of G.edges) {
    const k = graphEdgeKey(e);
    if (!ids.has(e.from) || !ids.has(e.to)) report(where + ' edge ' + k + ' names a node that does not exist');
    if (e.from === e.to) report(where + ' edge ' + k + ' loops on one node');
    if (keys.has(k)) report(where + ' duplicate edge ' + k);
    keys.add(k);
  }
  for (const phone of [false, true]) {
    const B = graphBox(S, phone), list = G.nodes;
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const [a, b] = [B.pos[list[i].id], B.pos[list[j].id]];
      if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 2 * B.r + 6) report(where + ' nodes ' + list[i].id + ' and ' + list[j].id + ' overlap' + (phone ? ' on a phone' : ''));
    }
  }
  if (!STORY_CAST[S.cast]) report(where + ' graph cast missing from STORY_CAST ' + S.cast);
  S.steps.forEach((st, i) => {
    if (!st.nodes || typeof st.nodes !== 'object') { report(where + ' ' + i + ' graph step has no nodes'); return; }
    for (const [k, v] of Object.entries(st.nodes)) {
      if (!ids.has(k)) report(where + ' ' + i + ' nodes names unknown node ' + k);
      if (!NODE_STATES.has(v)) report(where + ' ' + i + ' unknown node state ' + v);
    }
    for (const [k, v] of Object.entries(st.edges || {})) {
      if (!keys.has(k)) report(where + ' ' + i + ' edges names unknown edge ' + k);
      if (!EDGE_STATES.has(v)) report(where + ' ' + i + ' unknown edge state ' + v);
    }
    for (const k of Object.keys(st.vals || {})) if (!ids.has(k)) report(where + ' ' + i + ' vals names unknown node ' + k);
    if (st.actorAt != null && !ids.has(st.actorAt)) report(where + ' ' + i + ' actorAt is not a node ' + st.actorAt);
  });
}

let bad = 0;
for (const id of SCENE_ORDER) {
  const S = SCENES[id];
  if (!PROBLEMS.find((p) => p.id === id)) { console.log('no problem', id); bad++; }
  const kinds = new Set(S.steps.map((s) => s.kind));
  for (const lang of ['py', 'java', 'cpp', 'js', 'go']) {
    const code = S.code[lang], lines = S.lines[lang] || S.lines.py;
    for (const k of kinds) { const n = lines[k]; if (!n || !code[n - 1]) { console.log(id, lang, 'no line for', k); bad++; } }
    for (const [, k] of S.rules) { const n = lines[k]; if (!n) { console.log(id, lang, 'rule no line', k); bad++; } }
    if (lang === 'py' || process.argv[2] === 'all') console.log(id, lang, [...kinds].map((k) => k + '→' + (code[lines[k] - 1] || ['?'])[0].trim()).join(' | '));
  }
  S.steps.forEach((st, i) => {
    for (const lv of ['kid', 'builder', 'expert']) if (!st.nar[lv]) { console.log(id, i, 'no nar', lv); bad++; }
    if (!st.meter || !st.watch || st.watch.length !== 6) { console.log(id, i, 'meter/watch'); bad++; }
    const txt = JSON.stringify(st);
    if (/undefined|NaN/.test(txt)) { console.log(id, i, 'undefined/NaN in step', txt.slice(0, 200)); bad++; }
  });
  // grid stories: every step's cells (and vals, if any) must be the same shape as items; path and actor stay on the grid
  if (S.visual === 'grid') {
    const R = S.items.length, C = R && S.items[0].length;
    const shape = (g) => Array.isArray(g) && g.length === R && g.every((row) => Array.isArray(row) && row.length === C);
    const inside = (p) => Array.isArray(p) && p.length === 2 && p[0] >= 0 && p[0] < R && p[1] >= 0 && p[1] < C;
    if (!R || !C || !shape(S.items)) { console.log(id, 'grid items not rectangular'); bad++; }
    if (R > 8 || C > 8) { console.log(id, 'grid larger than 8x8'); bad++; }
    if (!STORY_CAST[S.cast]) { console.log(id, 'grid cast missing from STORY_CAST', S.cast); bad++; }
    for (const [k, n] of [['rowHeads', R], ['colHeads', C]]) if (S[k] && S[k].length !== n) { console.log(id, k, 'length', S[k].length, '!=', n); bad++; }
    S.steps.forEach((st, i) => {
      if (!shape(st.cells)) { console.log(id, i, 'cells do not match items', R + 'x' + C); bad++; }
      if (st.vals && !shape(st.vals)) { console.log(id, i, 'vals do not match items'); bad++; }
      if (st.path && !st.path.every(inside)) { console.log(id, i, 'path leaves the grid'); bad++; }
      if (st.actorAt && !inside(st.actorAt)) { console.log(id, i, 'actorAt off the grid'); bad++; }
    });
  }
  if (!STORY_TASKS[id] || STORY_TASKS[id].split(/[.?!](\s|$)/).filter((x) => x && x.trim()).length > 5) { console.log(id, 'no plain-words task (or more than 5 sentences)'); bad++; }
  if (!PROBLEMS.find((p) => p.id === id).animated) { console.log(id, 'has a scene but is not marked animated in the catalog'); bad++; }
  // tree stories: node ids unique, every parent exists, one root, no loops; every step's states name real nodes only
  if (S.visual === 'tree') {
    const STATES = new Set(['in', 'out', 'future', 'cur', 'hit', 'dup', 'ok', 'paint', 'stored', 'buy', 'best']);
    const EDGES = new Set(['', 'path', 'out']);
    const checkTree = (list, where) => {
      const ids = new Set();
      if (!Array.isArray(list) || !list.length) { console.log(id, where, 'tree is empty'); bad++; return ids; }
      for (const n of list) { if (ids.has(n.id)) { console.log(id, where, 'duplicate node id', n.id); bad++; } ids.add(n.id); }
      for (const n of list) if (n.parent != null && !ids.has(n.parent)) { console.log(id, where, 'node', n.id, 'has missing parent', n.parent); bad++; }
      if (list.filter((n) => n.parent == null).length !== 1) { console.log(id, where, 'tree needs exactly one root'); bad++; }
      const byId = Object.fromEntries(list.map((n) => [n.id, n]));
      let deepest = 0;
      for (const n of list) {
        let d = 0, at = n;
        while (at && at.parent != null && d <= list.length) { at = byId[at.parent]; d++; }
        if (d > list.length) { console.log(id, where, 'loop through node', n.id); bad++; break; }
        deepest = Math.max(deepest, d);
      }
      if (list.length > 16 || deepest > 4) { console.log(id, where, 'tree too big:', list.length, 'nodes, depth', deepest); bad++; }
      return ids;
    };
    const base = checkTree(S.tree, 'tree');
    if (!STORY_CAST[S.cast]) { console.log(id, 'tree cast missing from STORY_CAST', S.cast); bad++; }
    S.steps.forEach((st, i) => {
      const ids = st.tree ? checkTree(st.tree, 'step ' + i + ' tree') : base;
      if (st.tree && (ids.size !== base.size || [...base].some((x) => !ids.has(x)))) { console.log(id, i, 'step tree has different nodes'); bad++; }
      if (!st.nodes || typeof st.nodes !== 'object') { console.log(id, i, 'tree step has no nodes'); bad++; return; }
      for (const [k, v] of Object.entries(st.nodes)) {
        if (!ids.has(k)) { console.log(id, i, 'nodes names unknown node', k); bad++; }
        if (!STATES.has(v)) { console.log(id, i, 'unknown node state', v); bad++; }
      }
      for (const [k, v] of Object.entries(st.edge || {})) {
        if (!ids.has(k)) { console.log(id, i, 'edge names unknown node', k); bad++; }
        if (!EDGES.has(v)) { console.log(id, i, 'unknown edge state', v); bad++; }
      }
      for (const key of ['vals', 'tags']) for (const k of Object.keys(st[key] || {})) if (!ids.has(k)) { console.log(id, i, key, 'names unknown node', k); bad++; }
      if (st.actorAt != null && !ids.has(st.actorAt)) { console.log(id, i, 'actorAt is not a node', st.actorAt); bad++; }
    });
  }
  if (S.visual === 'graph') checkGraph(S, id, (m) => { console.log(m); bad++; });
  // render every step in every language, on both code tabs, with every fold open
  store['dsaviz-problem'] = id;
  const c = new Component({});
  if (c.state.scene !== id) { console.log(id, 'page did not open this story'); bad++; continue; }
  let renders = 0;
  for (const lang of ['py', 'java', 'cpp', 'js', 'go']) {
    c.runner.setLang(lang);
    const lines = S.lines[lang] || S.lines.py, code = S.code[lang];
    for (let i = 0; i < S.steps.length; i++) for (const tab of ['solution', 'code']) {
      c.setState({ step: i, tab, codeOpened: tab === 'code', deeper: true, showHints: true, why: true, hints: S.hints.length, pick: 0 });
      const v = c.renderVals(); renders++;
      const txt = JSON.stringify(v, (k, x) => (typeof x === 'function' ? undefined : x));
      if (/undefined|NaN/.test(txt)) { const m = txt.match(/.{60}(undefined|NaN).{40}/); console.log(id, lang, 'render step', i, tab, m && m[0]); bad++; break; }
      const want = lines[S.steps[i].kind];
      if (v.lineMarkOp !== 1 || v.lineMark !== 'translateY(' + (want - 1) * 24 + 'px)' || v.code.length !== code.length) { console.log(id, lang, 'step', i, 'code line not lit', v.lineMark); bad++; }
      if (!v.caption || !v.expert || !v.task || !v.exampleIn || !v.exampleOut) { console.log(id, lang, 'step', i, 'missing caption, expert note, task or example'); bad++; }
      if (v.stepLabel !== 'Step ' + (i + 1) + ' of ' + S.steps.length) { console.log(id, 'step label', v.stepLabel); bad++; }
    }
  }
  console.log(id, S.steps.length, 'steps ok;', renders, 'renders; more:', c.renderVals().moreStories.map((x) => x.story).join(' / '));
}
// ---- Try your own input: every scene with make(input) runs its presets and 20 random inputs. The answer must match
// a reference solver written here (not the scene's own code), every step must render with no undefined or NaN, and
// every step kind needs a code line. Then a few bad inputs must give a plain error, not a crash.
const pairs = (a, t) => { const out = []; for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] + a[j] === t) out.push([i, j]); return out; };
const levelKids = (arr) => {   // LeetCode level order → { val, left, right } nodes
  if (!arr.length || arr[0] == null) return null;
  const root = { v: arr[0] }, q = [root];
  let i = 1;
  while (q.length && i < arr.length) {
    const nd = q.shift();
    for (const side of ['l', 'r']) { if (i >= arr.length) break; const x = arr[i++]; if (x != null) { nd[side] = { v: x }; q.push(nd[side]); } }
  }
  return root;
};
const REF = {
  'two-sum-ii': (v) => { const [[i, j]] = pairs(v.nums, v.target); return [i + 1, j + 1]; },
  'valid-palindrome': (v) => { const c = v.s.toLowerCase().replace(/[^a-z0-9]/g, ''); return c === c.split('').reverse().join(''); },
  container: (v) => { let b = 0; for (let i = 0; i < v.nums.length; i++) for (let j = i + 1; j < v.nums.length; j++) b = Math.max(b, Math.min(v.nums[i], v.nums[j]) * (j - i)); return b; },
  'longest-substring': (v) => { let b = 0; for (let i = 0; i < v.s.length; i++) for (let j = i; j < v.s.length; j++) { const w = v.s.slice(i, j + 1); if (new Set(w).size === w.length) b = Math.max(b, w.length); } return b; },
  'best-time-stock': (v) => { let b = 0; for (let i = 0; i < v.nums.length; i++) for (let j = i + 1; j < v.nums.length; j++) b = Math.max(b, v.nums[j] - v.nums[i]); return b; },
  'two-sum': (v) => pairs(v.nums, v.target)[0],
  'contains-duplicate': (v) => new Set(v.nums).size !== v.nums.length,
  'valid-anagram': (v) => v.s.split('').sort().join('') === v.t.split('').sort().join(''),
  'binary-search': (v) => v.nums.indexOf(v.target),
  'search-rotated': (v) => v.nums.indexOf(v.target),
  'find-min-rotated': (v) => Math.min.apply(null, v.nums),
  'unique-paths': (v) => { const [m, n] = v.size; let r = 1; for (let k = 1; k <= m - 1; k++) r = (r * (n - 1 + k)) / k; return Math.round(r); },
  'climbing-stairs': (v) => { const f = [1, 1]; for (let i = 2; i <= v.n; i++) f[i] = f[i - 1] + f[i - 2]; return f[v.n]; },
  'house-robber': (v) => { let best = 0; const n = v.nums.length; for (let mask = 0; mask < 1 << n; mask++) { if (mask & (mask >> 1)) continue; let s = 0; for (let i = 0; i < n; i++) if (mask & (1 << i)) s += v.nums[i]; best = Math.max(best, s); } return best; },
  'number-of-islands': (v) => {
    const g = v.grid.map((r) => r.slice()), R = g.length, C = g[0].length;
    let n = 0;
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (g[r][c] === '1') { n++; const q = [[r, c]]; g[r][c] = '0'; while (q.length) { const [a, b] = q.pop(); [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => { const x = a + dr, y = b + dc; if (x >= 0 && y >= 0 && x < R && y < C && g[x][y] === '1') { g[x][y] = '0'; q.push([x, y]); } }); } }
    return n;
  },
  'max-depth': (v) => { const d = (nd) => (nd ? 1 + Math.max(d(nd.l), d(nd.r)) : 0); return d(levelKids(v.arr)); },
  // a loop of needs means no order: colour search for a back arrow
  'course-schedule': (v) => {
    const out = Array.from({ length: v.n }, () => []), mark = Array(v.n).fill(0);
    v.pre.forEach(([a, b]) => out[b].push(a));
    const loop = (x) => { if (mark[x] === 1) return true; if (mark[x] === 2) return false; mark[x] = 1; const r = out[x].some(loop); mark[x] = 2; return r; };
    return !out.some((_, x) => loop(x));
  },
  // the last road whose removal leaves every town connected
  'redundant-connection': (v) => {
    const n = v.edges.length;
    for (let skip = n - 1; skip >= 0; skip--) {
      const seen = new Set([1]), todo = [1];
      while (todo.length) { const x = todo.pop(); v.edges.forEach(([a, b], i) => { if (i === skip) return; const y = a === x ? b : b === x ? a : 0; if (y && !seen.has(y)) { seen.add(y); todo.push(y); } }); }
      if (seen.size === n) return v.edges[skip];
    }
    return null;
  },
  // Bellman-Ford: relax every road n times
  'network-delay-time': (v) => {
    const d = Array(v.n + 1).fill(Infinity); d[v.k] = 0;
    for (let r = 0; r < v.n; r++) v.times.forEach(([a, b, w]) => { if (d[a] + w < d[b]) d[b] = d[a] + w; });
    const m = Math.max.apply(null, d.slice(1));
    return m === Infinity ? -1 : m;
  },
  'largest-rectangle-in-histogram': (v) => { let b = 0; for (let i = 0; i < v.nums.length; i++) { let lo = Infinity; for (let j = i; j < v.nums.length; j++) { lo = Math.min(lo, v.nums[j]); b = Math.max(b, lo * (j - i + 1)); } } return b; }
};
const BAD = ['', '[1, 2', 'hello world and more', '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12', '[[1, 2], 3', 'null', '1 / 22 / 333'];
let runs = 0;
const clean = (x) => JSON.stringify(x, (k, y) => (typeof y === 'function' ? undefined : y));
for (const id of Object.keys(SCENE_INPUT)) {
  const spec = SCENE_INPUT[id];
  if (!SCENES[id]) { console.log('custom input for unknown scene', id); bad++; continue; }
  if (!REF[id]) { console.log(id, 'has make(input) but no reference solver in scenecheck.js'); bad++; continue; }
  for (const k of ['hint', 'example', 'presets', 'random', 'parse', 'show', 'check', 'make']) if (!spec[k]) { console.log(id, 'custom input is missing', k); bad++; }
  if (spec.presets.length < 3 || spec.presets.length > 4) { console.log(id, 'needs 3 or 4 presets'); bad++; }
  const inputs = spec.presets.map(([label, fn]) => [label, fn()]).concat(Array.from({ length: 20 }, (_, i) => ['random ' + (i + 1), spec.random()]));
  inputs.push(['the box example', spec.parse(spec.example)]);
  store['dsaviz-problem'] = id;
  const c = new Component({});
  for (const [label, input] of inputs) {
    const where = id + ' [' + label + '] ' + JSON.stringify(input);
    const err = spec.check(input);
    if (err) { console.log(where, 'a preset or random input fails its own check:', err); bad++; continue; }
    const text = spec.show(input);
    let back;
    try { back = spec.parse(text); } catch (e) { console.log(where, 'show() text does not parse back:', text, e.message); bad++; continue; }
    if (clean(back) !== clean(input)) { console.log(where, 'parse(show(input)) differs:', clean(back)); bad++; }
    const res = runFromText(id, text);
    if (res.error) { console.log(where, 'runFromText failed:', res.error); bad++; continue; }
    const S = res.scene;
    runs++;
    const want = REF[id](input);
    if (clean(S.answer) !== clean(want)) { console.log(where, 'answer', clean(S.answer), 'but the reference says', clean(want)); bad++; }
    if (!S.custom || !S.steps.length || S.steps[0].kind !== 'intro' || !S.steps[S.steps.length - 1].done) { console.log(where, 'a run starts with intro and ends on a done step'); bad++; }
    if (S.visual === 'grid') {
      const R = S.items.length, C = S.items[0].length;
      if (R > 6 && C > 1 || C > 9) { console.log(where, 'grid too big', R, C); bad++; }
      S.steps.forEach((st, i) => { if (!Array.isArray(st.cells) || st.cells.length !== R || st.cells.some((row) => row.length !== C)) { console.log(where, i, 'cells do not match items'); bad++; } });
    } else if (S.visual === 'tree') {
      if (S.tree.length > 15) { console.log(where, 'tree has more than 15 nodes'); bad++; }
    } else if (S.visual === 'graph') {
      checkGraph(S, where, (m) => { console.log(m); bad++; });
    } else if (S.items.length > 9) { console.log(where, 'more than 9 items'); bad++; }
    if (S.width && S.width > 640) { console.log(where, 'row is too wide for the stage:', S.width); bad++; }
    S.steps.forEach((st, i) => {
      if (/undefined|NaN/.test(clean(st))) { console.log(where, 'step', i, 'has undefined or NaN', clean(st).slice(0, 160)); bad++; }
      for (const lv of ['kid', 'builder', 'expert']) if (!st.nar[lv]) { console.log(where, i, 'no text at', lv); bad++; }
      if (!st.meter || st.watch.length !== 6 || !st.verdict) { console.log(where, i, 'meter, watch or verdict'); bad++; }
    });
    const langs = label === 'random 1' || !label.startsWith('random') ? ['py', 'java', 'cpp', 'js', 'go'] : ['py'];
    for (const lang of langs) {
      c.runner.setLang(lang);
      const lines = S.lines[lang] || S.lines.py;
      for (let i = 0; i < S.steps.length; i++) {
        if (!lines[S.steps[i].kind]) { console.log(where, lang, 'no code line for', S.steps[i].kind); bad++; break; }
        c.setState({ run: S, step: i, tab: 'solution', deeper: true, customOpen: true });
        const v = c.renderVals();
        const txt = clean(v);
        if (/undefined|NaN/.test(txt)) { const m = txt.match(/.{60}(undefined|NaN).{40}/); console.log(where, lang, 'render step', i, m && m[0]); bad++; break; }
        if (v.lineMarkOp !== 1 || v.stepLabel !== 'Step ' + (i + 1) + ' of ' + S.steps.length || !v.customActive) { console.log(where, lang, 'step', i, 'line or label'); bad++; break; }
      }
    }
  }
  for (const text of BAD) {
    const res = runFromText(id, text);
    if (!res.error && !res.scene) { console.log(id, 'bad input gave neither a scene nor an error:', text); bad++; }
    if (res.error && (/undefined|NaN|TypeError|of null/.test(res.error) || !/[.?]$/.test(res.error))) { console.log(id, 'error is not plain:', res.error); bad++; }
  }
  c.setState({ run: null, step: 0 });
}
// Stories without custom input hide the fold.
for (const id of SCENE_ORDER.filter((x) => !SCENE_INPUT[x]).slice(0, 3)) {
  store['dsaviz-problem'] = id;
  if (new Component({}).renderVals().hasCustom) { console.log(id, 'shows the custom input fold without make(input)'); bad++; }
}
console.log(Object.keys(SCENE_INPUT).length + ' stories take your own input; ' + runs + ' runs checked against reference solvers');

// ---- Predict the next step: every question, on every story and on custom runs, has 2 or 3 different choices and exactly one right one,
// and the right one is the next step's kind.
let asked = 0;
const predictCheck = (S, where) => {
  S.steps.forEach((st, j) => {
    const q = predictQuestion(S, j);
    if (!q) return;
    asked++;
    const right = q.choices.filter((x) => x.right);
    if (q.choices.length < 2 || q.choices.length > 3) { console.log(where, j, 'predict needs 2 or 3 choices', q.choices.length); bad++; }
    if (right.length !== 1) { console.log(where, j, 'predict has', right.length, 'right choices'); bad++; }
    if (new Set(q.choices.map((x) => x.label)).size !== q.choices.length) { console.log(where, j, 'predict choices repeat'); bad++; }
    const rule = S.rules.find(([, k]) => k === predictKind(S, st.kind));
    if (!rule || !right[0] || !rule[0].endsWith(right[0].label.slice(1))) { console.log(where, j, 'the right choice is not the next step’s rule', right[0] && right[0].label); bad++; }
    if (!q.cue || /undefined|NaN/.test(q.cue)) { console.log(where, j, 'predict cue missing'); bad++; }
  });
};
SCENE_ORDER.forEach((id) => predictCheck(SCENES[id], id));
Object.keys(SCENE_INPUT).forEach((id) => { const spec = SCENE_INPUT[id]; for (let k = 0; k < 5; k++) predictCheck(spec.make(spec.random()), id + ' (custom)'); });
// The player asks, takes an answer, logs it in DS and moves on.
{
  store['dsaviz-problem'] = 'two-sum-ii';
  const c = new Component({});
  c.togglePredict();
  c.stepNext();
  if (!c.state.ask) { console.log('predict: Next did not ask before step 1'); bad++; }
  else {
    const q = c.state.ask, i = q.choices.findIndex((x) => x.right);
    c.answer(i);
    if (c.state.step !== q.at || !c.state.fb || !c.state.fb.ok) { console.log('predict: a right answer did not move on with feedback'); bad++; }
    if (!/^Right/.test(c.renderVals().feedback)) { console.log('predict: feedback line missing'); bad++; }
    c.stepNext();
    if (c.state.ask) { console.log('predict: asked twice in a row'); bad++; }
  }
  if (!(JSON.parse(store['dsaviz-predict-v1'] || '{}').total >= 1)) { console.log('predict: the pick was not logged in DS'); bad++; }
}
console.log(asked + ' predict questions checked');
console.log(bad ? bad + ' problems' : 'all scenes clean');
if (bad) process.exitCode = 1;
