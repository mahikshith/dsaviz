// Data check for every animated story: code-line maps, narration at all depths, every step renders, build-it puzzles solve.
const fs = require('fs');
const src = fs.readFileSync(require('path').join(__dirname, '..', 'pages', 'Story.dc.html'), 'utf8');
const script = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const store = {};
const f = new Function('store', `const window = { localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } }, addEventListener(){}, removeEventListener(){} };
const setInterval = () => 1, clearInterval = () => {};
class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, o); } }
${script}; return { SCENES, SCENE_ORDER, Component, PROBLEMS, STORY_CAST };`);
const { SCENES, SCENE_ORDER, Component, PROBLEMS, STORY_CAST } = f(store);
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
  // render every step at every level/lang/chapter
  store['dsaviz-problem'] = id;
  const c = new Component({});
  for (let i = 0; i < S.steps.length; i++) for (const ch of [0, 1, 2, 3, 4]) {
    c.setState({ step: i, chapter: ch, predict: true, ask: i < S.steps.length - 1 });
    const v = c.renderVals();
    const txt = JSON.stringify(v, (k, x) => (typeof x === 'function' ? undefined : x));
    if (/undefined|NaN/.test(txt)) { const m = txt.match(/.{60}(undefined|NaN).{40}/); console.log(id, 'render step', i, 'ch', ch, m && m[0]); bad++; break; }
  }
  // parsons: check that the answer is solvable and shows ok
  for (const lang of ['py', 'java', 'cpp', 'js', 'go']) {
    c.setState({ lang, built: [], checked: null, chapter: 3, spellMode: 'build' });
    let v = c.renderVals();
    const n = c.spellLines().length;
    v.showSpell(); v = c.renderVals();
    if (!v.spellOk) { console.log(id, lang, 'parsons not ok'); bad++; }
    // wrong order is flagged
    c.setState({ built: [...Array(n).keys()].reverse(), checked: null }); v = c.renderVals(); v.checkSpell(); v = c.renderVals();
    if (v.spellOk && n > 1) { console.log(id, lang, 'reverse accepted'); bad++; }
  }
  console.log(id, S.steps.length, 'steps ok; tabs:', c.renderVals().sceneTabs.map((x) => x.label).join('/'));
}
console.log(bad ? bad + ' problems' : 'all scenes clean');
if (bad) process.exitCode = 1;
