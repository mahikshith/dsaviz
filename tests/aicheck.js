// AI & ML lesson check: loads src/ai/render.js + lessons.js and validates every lesson's data.
// Captions are present and at most 140 characters, every reference in a scene points at a real item,
// steps per lesson are 8-15, sliders have sane ranges and still give valid steps at both ends,
// and every AI-now lesson lists primary sources whose links are http(s). Also renders every step
// of the AILesson page headlessly and checks the built page carries the current lesson code.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const src = ['render.js', 'lessons.js'].map((f) => fs.readFileSync(path.join(root, 'src', 'ai', f), 'utf8').replace(/\r\n/g, '\n')).join('\n');
const M = new Function(src + '\nreturn { AI_TRACKS, AI_LESSONS, AI_NEXT, aiSteps, aiSceneProblems, aiFlatten, aiPaint, aiTween, aiColors };')();
let problems = 0;
const fail = (where, msg) => { problems++; console.log('  ✗', where, msg); };

const trackIds = M.AI_TRACKS.map((t) => t.id);
const ids = {};
const URL_RE = /^https?:\/\/[^\s/$.?#][^\s]*$/i;
const T = { accent: '#C5F04A', right: '#5AC8FA', left: '#C5F04A', flame: '#FF8A3D', ok: '#30D158', muted: '#8E8E93', text: '#F5F5F7', text2: '#C7C7CC', faint: '#55555C', line: '#26262C', line2: '#34343C', surface: '#151518', sunk: '#1F1F23', onAccent: '#0A0A0A', mono: 'mono', body: 'body', diff: { Hard: ['#FF453A'] } };
const C = M.aiColors(T);

M.AI_LESSONS.forEach((L, li) => {
  const where = L.id || 'lesson ' + li;
  if (!L.id) fail(where, 'missing id'); else if (ids[L.id]) fail(where, 'duplicate id'); else ids[L.id] = 1;
  if (trackIds.indexOf(L.track) < 0) fail(where, 'unknown track ' + L.track);
  ['title', 'tag', 'idea'].forEach((k) => { if (!L[k] || !String(L[k]).trim()) fail(where, 'missing ' + k); });
  if (L.idea && L.idea.length > 140) fail(where, 'idea is ' + L.idea.length + ' chars (max 140)');
  if (typeof L.make !== 'function') { fail(where, 'no make()'); return; }
  const values = [undefined];
  if (L.param) {
    const P = L.param;
    if (!(P.min < P.max) || !(P.step > 0) || P.value < P.min || P.value > P.max) fail(where, 'slider range is not valid');
    if (!P.label || !P.hint) fail(where, 'slider needs a label and a hint');
    values.push(P.min, P.max);
  }
  values.forEach((v) => {
    let steps;
    try { steps = M.aiSteps(li, v); } catch (e) { fail(where, 'make(' + v + ') threw: ' + e.message); return; }
    const tagv = where + (v === undefined ? '' : ' @' + v);
    if (!Array.isArray(steps) || steps.length < 8 || steps.length > 15) fail(tagv, 'has ' + (steps ? steps.length : 0) + ' steps (8-15)');
    (steps || []).forEach((s, i) => {
      const w = tagv + ' step ' + (i + 1);
      const say = (s.say || '').trim();
      if (!say) fail(w, 'empty caption');
      if (say.length > 140) fail(w, 'caption is ' + say.length + ' chars (max 140): ' + say);
      if (/undefined|NaN|\{\{|\[\w+\]$/.test(say)) fail(w, 'caption has a placeholder: ' + say);
      if (!/[.!?”’)]$/.test(say)) fail(w, 'caption should end a sentence: ' + say);
      if (!s.scene || typeof s.scene !== 'object') { fail(w, 'missing scene'); return; }
      M.aiSceneProblems(s.scene, s.focus).forEach((p) => fail(w, p));
      const flat = M.aiFlatten(s.scene, C, s.focus);
      const painted = JSON.stringify(M.aiPaint(flat, T));
      if (/NaN|undefined/.test(painted)) fail(w, 'painted scene has NaN or undefined');
      // everything stays on the 960 x 540 canvas
      flat.rects.concat(flat.halos).forEach((r) => { if (r.op > 0.05 && (r.x < -20 || r.y < -20 || r.x + r.w > 980 || r.y + r.h > 560)) fail(w, 'rect off canvas ' + r.k); });
      flat.texts.forEach((x) => { if (x.op > 0.05 && (x.x < 0 || x.x > 960 || x.y < 8 || x.y > 540)) fail(w, 'text off canvas ' + x.k + ' "' + x.text + '"'); });
      if (i > 0) M.aiTween(M.aiFlatten(steps[i - 1].scene, C, steps[i - 1].focus), flat, 0.5);
    });
  });
  if (L.track === 'now') {
    if (!Array.isArray(L.sources) || !L.sources.length) fail(where, 'AI-now lesson without sources');
    (L.sources || []).forEach((s, i) => {
      ['title', 'org', 'date', 'link'].forEach((k) => { if (!s[k] || !String(s[k]).trim()) fail(where, 'source ' + (i + 1) + ' missing ' + k); });
      if (s.link && !URL_RE.test(s.link)) fail(where, 'source ' + (i + 1) + ' link is not http(s): ' + s.link);
      if (s.date && !/^\d{4}(-\d{2}(-\d{2})?)?$/.test(s.date)) fail(where, 'source ' + (i + 1) + ' date should be YYYY, YYYY-MM or YYYY-MM-DD');
    });
  }
  // all lesson writing is our own: no content credits (AI-now sources are cited facts, kept under sources)
  if ('credit' in L) fail(where, 'carries a content credit; lessons are 100% our own writing');
  // a slider must change what the lesson shows: its two ends give different captions or scenes
  if (L.param) {
    try {
      const lo = JSON.stringify(M.aiSteps(li, L.param.min)); const hi = JSON.stringify(M.aiSteps(li, L.param.max));
      if (lo === hi) fail(where, 'slider does not change anything');
    } catch (e) { /* reported above */ }
  }
  let nSteps = 0; try { nSteps = M.aiSteps(li).length; } catch (e) { return; }
  console.log('✓ ' + L.id + ': ' + nSteps + ' steps' + (L.param ? ', slider ' + L.param.label : '') + (L.sources ? ', ' + L.sources.length + ' sources' : ''));
});
trackIds.forEach((t) => { if (!M.AI_LESSONS.some((L) => L.track === t)) fail('tracks', 'no lessons in ' + t); });
if (M.AI_LESSONS.length < 29) fail('lessons', 'only ' + M.AI_LESSONS.length + ' lessons (want 29+)');
if (M.AI_LESSONS.filter((L) => L.track === 'ml').length < 16) fail('lessons', 'want at least 16 ML lessons');
if (M.AI_LESSONS.filter((L) => L.track === 'now').length < 13) fail('lessons', 'want at least 13 AI-now lessons');

// The pages must carry the same lesson code (run the build after editing src/ai).
['AILesson', 'AIML'].forEach((n) => {
  const file = path.join(root, 'pages', n + '.dc.html');
  if (!fs.existsSync(file)) { fail(n, 'page missing'); return; }
  const page = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const a = page.indexOf('// @@AILESSONS@@'); const b = page.indexOf('// @@END-AILESSONS@@');
  if (a < 0 || b < 0) fail(n, 'missing the @@AILESSONS@@ block');
  else if (page.slice(a, b).indexOf(src.trim().slice(0, 200)) < 0 || page.slice(a, b).indexOf(src.trim().slice(-200)) < 0) fail(n, 'lesson code is out of date: run python scripts/build_pages.py');
});

// Render the lesson page for every lesson and step, at slider ends, desktop and mobile.
const pageSrc = fs.readFileSync(path.join(root, 'pages', 'AILesson.dc.html'), 'utf8');
const script = pageSrc.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const store = {};
const P = new Function('store', `const window = { localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } }, addEventListener(){}, removeEventListener(){}, innerWidth: 1440 };
const setInterval = () => 1, clearInterval = () => {};
class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, typeof o === 'function' ? o(this.state) : o); } forceUpdate() {} }
${script}; return { Component };`)(store);
const c = new P.Component({});
M.AI_LESSONS.forEach((L, li) => {
  const vals = L.param ? [L.param.min, L.param.value, L.param.max] : [null];
  vals.forEach((pv) => [false, true].forEach((mobile) => {
    const n = M.aiSteps(li, pv === null ? undefined : pv).length;
    for (let i = 0; i < n; i++) {
      c.setState({ lesson: li, step: i, param: pv, mobile, sources: i === n - 1 });
      const v = c.renderVals();
      const txt = JSON.stringify(v, (k, x) => (typeof x === 'function' ? undefined : x));
      if (/undefined|NaN/.test(txt)) { const m = txt.match(/.{60}(undefined|NaN).{40}/); fail(L.id + ' render step ' + (i + 1), m && m[0]); break; }
    }
  }));
});

// About this lesson: every lesson has one, with the parts the tab shows, and links that point at real lessons.
const { AI_ABOUT_ML } = require(path.join(root, 'src', 'ai', 'about_ml.js'));
const { AI_ABOUT_NOW } = require(path.join(root, 'src', 'ai', 'about_now.js'));
const ABOUT = Object.assign({}, AI_ABOUT_ML, AI_ABOUT_NOW);
const lessonIds = new Set(M.AI_LESSONS.map((L) => L.id));
M.AI_LESSONS.forEach((L) => {
  const a = ABOUT[L.id];
  if (!a) { fail(L.id, 'no About this lesson entry in src/ai/about_ml.js or about_now.js'); return; }
  ['what', 'analogy'].forEach((k) => { if (typeof a[k] !== 'string' || !a[k].trim()) fail(L.id + ' about', 'missing ' + k); });
  [['uses', 3, 3], ['words', 3, 8], ['steps', 3, 5], ['use', 1, 4], ['avoid', 1, 4], ['mistakes', 1, 5], ['cheat', 2, 8], ['next', 1, 4], ['sources', 1, 12]].forEach(([k, lo, hi]) => {
    const n = Array.isArray(a[k]) ? a[k].length : -1;
    if (n < lo || n > hi) fail(L.id + ' about', k + ' needs ' + lo + (hi > lo ? ' to ' + hi : '') + ' items, has ' + n);
  });
  if (a.math) {
    if (!Array.isArray(a.math.lines) || !a.math.lines.length) fail(L.id + ' about', 'math without lines');
    if (!Array.isArray(a.math.symbols) || !a.math.symbols.every((x) => Array.isArray(x) && x.length === 2 && x[1])) fail(L.id + ' about', 'every math symbol needs a meaning');
  }
  (a.next || []).forEach((r) => { if (!lessonIds.has(r)) fail(L.id + ' about', 'next "' + r + '" is not a lesson id'); });
  (a.before || []).forEach((r) => { if (/^[a-z]+$/.test(r) && !lessonIds.has(r)) fail(L.id + ' about', 'before "' + r + '" looks like an id but is not a lesson'); });
});
Object.keys(ABOUT).forEach((id) => { if (!lessonIds.has(id)) fail(id, 'About entry for a lesson that does not exist'); });
const aboutPage = pageSrc.indexOf('// @@AI-ABOUT@@');
if (aboutPage < 0 || pageSrc.indexOf('const AI_ABOUT = ', aboutPage) < 0) fail('AILesson', 'missing the @@AI-ABOUT@@ block: run python scripts/build_pages.py');

console.log(problems ? problems + ' problem(s)' : 'all ai lessons valid');
if (problems) process.exitCode = 1;
