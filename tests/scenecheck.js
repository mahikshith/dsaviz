// Data check for every animated story: code-line maps, narration at all depths, a plain-words task, and every step renders
// on the problem page in every language and both code tabs, with the step's code line lit and its caption filled.
const fs = require('fs');
const src = fs.readFileSync(require('path').join(__dirname, '..', 'pages', 'Story.dc.html'), 'utf8');
const script = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const store = {};
const f = new Function('store', `const window = { localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } }, addEventListener(){}, removeEventListener(){} };
const setInterval = () => 1, clearInterval = () => {};
class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, o); } }
${script}; return { SCENES, SCENE_ORDER, Component, PROBLEMS, STORY_CAST, STORY_TASKS };`);
const { SCENES, SCENE_ORDER, Component, PROBLEMS, STORY_CAST, STORY_TASKS } = f(store);
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
console.log(bad ? bad + ' problems' : 'all scenes clean');
if (bad) process.exitCode = 1;
