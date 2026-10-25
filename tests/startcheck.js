// Start here check: every ready lesson is complete (story, watch it run, try it, 3+ exercises, one check), captions
// are short, scenes stay on the canvas, every exercise reference really works (JavaScript always, Python when it is
// installed), the traces are current, the needs tags and the path are consistent, and nothing names LeetCode.
// Levels 2 and 3 ask for more: 7+ story beats, 4 or 5 exercises of 3+ kinds, and a "Watch it run" picture (plates for
// the call stack, boxes and arrows for objects) whose every step stays on its canvas.
// Counts: the hub, the roadmap's Start here lane and node cards, Home and Profile all count lessons with one helper
// (DS.startCounts, built from src/start/chapters.js); the numbers must agree.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
let bad = 0;
const fail = (id, msg) => { bad++; console.log('  ✗', id, msg); };

const S = new Function(read('src', 'ai', 'render.js') + '\n' + require('../scripts/start_files.js').startSource() +
  '\nreturn { START_CHAPTERS, START_EXERCISES, START_NEEDS, START_NEEDS_KEYS, START_TRACES, START_PROBLEMS, START_PARTS, START_LEVELS, START_PLACEMENT, START_CAST, START_ROAD, stSceneProblems, startTraceSay, startTaughtBy, startFirstProblems, startProgress, startHelp, stPlates, stRefs, stQueue, stScene, stMemNeeded, stMemScenes, stMemSay, stFlatten };')();
const R = require('../shared/runner.js');
const win = { localStorage: { getItem: () => null, setItem() {} } };
const T = new Function('module', 'window', read('shared', 'catalog.js') + '\n' + read('shared', 'tests_spec.js') + '\nreturn { TEST_SPECS, specInfo, judge };')({}, win);

const text = (v, lang) => (v && typeof v === 'object' ? (v[lang] !== undefined ? v[lang] : v.py) : v);
const MAX = 140;

// ---------- runners ----------
function runJs(code, stdin) {
  const out = [];
  const ctx = { console: {}, JSON, Math, Date, Array, Object, String, Number, Map, Set, Error, Boolean, parseInt, parseFloat, isNaN, Infinity };
  ctx.self = ctx;
  ctx.postMessage = (m) => out.push(m);
  try { vm.runInNewContext(R.jsProgramSource(code, stdin || []), ctx, { timeout: 3000, filename: 'blob:start' }); } catch (e) { return { error: e.message, out: '' }; }
  const fatal = out.find((m) => m.type === 'fatal');
  const done = out.find((m) => m.type === 'done') || {};
  return { error: fatal ? fatal.error : null, out: R.programOutput((fatal || done).logs || []) };
}
const py = ['python3', 'python'].find((cmd) => { try { return spawnSync(cmd, ['-c', 'import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)']).status === 0; } catch (e) { return false; } });
// Run many Python programs in one process: [{ code, stdin }] -> [{ out, error }]
function runPyAll(jobs) {
  if (!py || !jobs.length) return null;
  const script = [
    'import sys, json, io, contextlib',
    'jobs = json.loads(sys.stdin.read())',
    'res = []',
    'for j in jobs:',
    '    buf = io.StringIO()',
    '    g = {"__name__": "__main__"}',
    '    err = None',
    '    try:',
    '        with contextlib.redirect_stdout(buf):',
    '            exec(j["prelude"], g)',
    '            exec(compile(j["code"], "<exec>", "exec"), g)',
    '    except BaseException as e:',
    '        err = type(e).__name__ + ": " + str(e)',
    '    res.append({"out": buf.getvalue(), "error": err})',
    'print(json.dumps(res))'
  ].join('\n');
  const r = spawnSync(py, ['-c', script], { input: JSON.stringify(jobs.map((j) => ({ code: j.code, prelude: R.pyProgramPrelude(j.stdin || []) }))), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env: Object.assign({}, process.env, { PYTHONIOENCODING: 'utf-8', PYTHONUTF8: '1' }) });
  if (r.status !== 0) { fail('python', r.stderr.slice(0, 300)); return null; }
  // echo: the output with the answers typed into input() shown the way a terminal (and the tracer) shows them
  return JSON.parse(r.stdout).map((x) => ({ error: x.error, out: R.programOutput([x.out]),
    echo: R.programOutput([x.out.split(String.fromCharCode(10)).map((l) => (l.indexOf(R.PROGRAM_IN) === 0 ? l.slice(R.PROGRAM_IN.length).replace(R.PROGRAM_SEP, '') : l)).join(String.fromCharCode(10))]) }));
}
const pyJobs = []; // { code, stdin, check(result) }
const traceJobs = []; // trace exercises, checked with the real tracer
const wantOut = (c, lang) => R.programOutput([String(text(c.out, lang))]);

// ---------- the path ----------
const ids = new Set();
const before = {};
S.START_CHAPTERS.forEach((c, i) => {
  if (ids.has(c.id)) fail(c.id, 'duplicate lesson id');
  ids.add(c.id);
  if (!c.title || !c.idea || !c.short || typeof c.n !== 'number' || typeof c.minutes !== 'number') fail(c.id, 'needs id, n, short, title, idea and minutes');
  if (c.idea.length > MAX) fail(c.id, 'idea runs over ' + MAX + ' characters');
  if (c.short.length > 15) fail(c.id, 'map label over 15 characters: ' + c.short);
  const part = S.START_PARTS.find((p) => p.n === c.part);
  if (!part) fail(c.id, 'unknown part ' + c.part);
  else if (part.level !== (c.level || 1)) fail(c.id, 'part ' + c.part + ' is in another level');
  if (!S.START_LEVELS.find((L) => L.n === (c.level || 1))) fail(c.id, 'unknown level');
  (c.teaches || []).forEach((k) => { if (!S.START_NEEDS_KEYS[k]) fail(c.id, 'teaches an unknown key ' + k); });
  (c.after || []).concat(c.soft || []).forEach((a) => { if (!before[a]) fail(c.id, 'builds on ' + a + ', which is not an earlier lesson'); });
  before[c.id] = true;
  if (/\bleet\s*code\b/i.test(JSON.stringify(c))) fail(c.id, 'mentions LeetCode');
});
// Lesson numbers run 1, 2, 3... inside each level.
S.START_LEVELS.forEach((L) => {
  const ns = S.START_CHAPTERS.filter((c) => (c.level || 1) === L.n).map((c) => c.n);
  ns.forEach((n, i) => { if (n !== i + 1) fail('level ' + L.n, 'lesson numbers should run 1, 2, 3...: got ' + ns.join(',')); });
});
const level1 = S.START_CHAPTERS.filter((c) => (c.level || 1) === 1);
if (level1.length !== 27) fail('level 1', 'has ' + level1.length + ' lessons, wants the 24 lessons, the bridge and counting steps: 27');
S.START_PLACEMENT.forEach((q, i) => {
  if (!(q.answer >= 0 && q.answer < q.choices.length)) fail('placement ' + (i + 1), 'answer out of range');
  q.marks.forEach((m) => { if (!ids.has(m)) fail('placement ' + (i + 1), 'marks unknown lesson ' + m); });
});
if (S.START_PLACEMENT.length < 5 || S.START_PLACEMENT.length > 8) fail('placement', 'wants 5 to 8 questions');
// The later-level visuals stay on the canvas.
[S.stScene(S.stPlates(['main', 'f(3)', 'f(2)', 'f(1)'], 200, 340)), S.stRefs([['a', 'o1'], ['b', 'o1']], [{ id: 'o1', text: '[1, 2]' }], 60, 80), S.stQueue(['fetch', 'timer'], 'click', ['load'], 120)]
  .forEach((sc, i) => S.stSceneProblems(sc, []).forEach((p) => fail('visual ' + i, p)));

// ---------- each ready lesson ----------
const exIds = new Set();
let ready = 0, exCount = 0;
S.START_CHAPTERS.filter((c) => c.ready).forEach((c) => {
  ready++;
  const id = c.id;
  // story
  if (!Array.isArray(c.story) || c.story.length < 5) fail(id, 'story needs 5 or more beats');
  else c.story.forEach((b, i) => {
    if (!S.START_CAST[b.who]) fail(id, 'beat ' + (i + 1) + ' speaker ' + b.who + ' is not in the cast');
    if (!b.say || b.say.length > MAX) fail(id, 'beat ' + (i + 1) + ' caption is empty or over ' + MAX + ' characters');
    S.stSceneProblems(b.scene, b.focus).forEach((p) => fail(id, 'beat ' + (i + 1) + ': ' + p));
    [].concat(b.line === null || b.line === undefined ? [] : b.line).forEach((l) => { if (!(l >= 0 && l < c.code.py.length)) fail(id, 'beat ' + (i + 1) + ' lights a missing code line ' + l); });
    if (/\b(red|green|blue|lime|orange|yellow|purple)\b/i.test(b.say)) fail(id, 'beat ' + (i + 1) + ' names a colour (themes change colours)');
  });
  if (!c.code || !c.code.py || !c.code.js || c.code.py.length !== c.code.js.length) fail(id, 'code card needs py and js with the same number of lines');
  // watch it run
  const tr = S.START_TRACES[id];
  if (!c.watch || !c.watch.code) fail(id, 'no watch program');
  else if (!tr || !tr.steps || tr.steps.length < 2) fail(id, 'no trace: run python scripts/build_pages.py');
  else {
    tr.steps.forEach((s, i) => { const say = S.startTraceSay(tr.steps, i); if (!say || say.length > MAX) fail(id, 'trace caption ' + (i + 1) + ' is empty or too long: ' + say); });
    if (tr.steps[tr.steps.length - 1].e !== (c.watch.error ? 'error' : 'end')) fail(id, c.watch.error ? 'the watch program should stop with an error' : 'the watch program does not finish cleanly');
    pyJobs.push({ code: c.watch.code, stdin: c.watch.stdin, check: (r) => { if (!!r.error !== !!c.watch.error || r.echo !== R.programOutput([tr.steps[tr.steps.length - 1].o])) fail(id, 'trace output differs from a real run: rebuild'); } });
  }
  // try it
  if (!c.tryit || !c.tryit.py || !c.tryit.js || !Array.isArray(c.tryit.goals) || c.tryit.goals.length < 2) fail(id, 'try it needs py, js and 2+ goals');
  else {
    const j = runJs(c.tryit.js, c.tryit.stdin);
    if (!!j.error !== !!c.tryit.errors) fail(id, c.tryit.errors ? 'try it (js) should show an error' : 'try it (js) fails: ' + j.error);
    pyJobs.push({ code: c.tryit.py, stdin: c.tryit.stdin, check: (r) => { if (!!r.error !== !!c.tryit.errors) fail(id, c.tryit.errors ? 'try it (py) should show an error' : 'try it (py) fails: ' + r.error); else if (r.out !== j.out && !c.tryit.differs) fail(id, 'try it prints differently in py and js'); } });
  }
  // check
  if (!c.check || !text(c.check.q, 'py') || !text(c.check.q, 'js') || !Array.isArray(c.check.choices) || c.check.choices.filter((x) => x[1]).length !== 1) fail(id, 'check needs a question and exactly one right choice');
  else c.check.choices.forEach(([t, , why]) => { if (!why || why.length > MAX * 1.5) fail(id, 'check feedback missing or long'); if (!text(t, 'py') || !text(t, 'js')) fail(id, 'check choice has no text'); });
  // exercises
  const exs = S.START_EXERCISES[id] || [];
  if (exs.length < 3 || exs.length > 5) fail(id, 'wants 3 to 5 exercises, has ' + exs.length);
  if ((c.level || 1) >= 2) {
    if (exs.length < 4) fail(id, 'a Level ' + c.level + ' lesson wants 4 or 5 exercises, has ' + exs.length);
    if (new Set(exs.map((e) => e.kind)).size < 3) fail(id, 'a Level ' + c.level + ' lesson wants 3 or more kinds of exercise');
    if (!Array.isArray(c.story) || c.story.length < 7) fail(id, 'a Level ' + c.level + ' story wants 7 or more beats');
    if (tr && !S.stMemNeeded(tr)) fail(id, 'a Level ' + c.level + ' lesson needs a Watch it run picture: calls on the stack or objects (watch.heap)');
    if (c.level === 3 && !(c.watch && c.watch.heap)) fail(id, 'a Level 3 watch program draws its objects: set watch.heap');
    if (c.level === 3 && !c.story.some((b) => b.scene.boxes && b.scene.boxes.length && (b.scene.arrows || []).length)) fail(id, 'a Level 3 story shows objects as boxes with arrows');
  }
  // The picture: every step on its own canvas, no NaN, a spoken description, the same canvas for every step.
  if (tr && S.stMemNeeded(tr)) {
    const pic = S.stMemScenes(tr);
    if (pic.scenes.length !== tr.steps.length) fail(id, 'picture has a scene per step');
    pic.scenes.forEach((sc, i) => {
      S.stSceneProblems(sc, [], { w: pic.w, h: pic.h }).forEach((p) => fail(id, 'picture step ' + (i + 1) + ': ' + p));
      const flat = S.stFlatten(sc, { a: '#a', b: '#b', c: '#c', ok: '#o', bad: '#x', m: '#m', t: '#t', t2: '#u', f: '#f', l: '#l', ln: '#n', bg: '#g', sunk: '#s', on: '#k' }, []);
      if (JSON.stringify(flat).indexOf('NaN') >= 0) fail(id, 'picture step ' + (i + 1) + ' has a NaN');
      if (!S.stMemSay(tr.steps[i])) fail(id, 'picture step ' + (i + 1) + ' has no description');
    });
    if (pic.w > 1100) fail(id, 'picture is wider than 1100 units: too small to read');
  }
  exs.forEach((e) => checkExercise(c, e));
  exCount += exs.length;
});
Object.keys(S.START_EXERCISES).forEach((k) => { if (!S.START_CHAPTERS.find((c) => c.id === k && c.ready)) fail(k, 'exercises for a lesson that is missing or not ready'); });

function checkExercise(c, e) {
  const id = e.id || '?';
  if (!e.id || !e.id.startsWith(c.id + ':')) fail(id, 'exercise id must start with the lesson id');
  if (exIds.has(e.id)) fail(id, 'duplicate exercise id'); exIds.add(e.id);
  if (!e.title || !e.ask || e.ask.length > 2 * MAX) fail(id, 'needs a title and a short ask');
  if (!Array.isArray(e.hints) || e.hints.length < 2 || e.hints.some((h) => ['py', 'js'].some((l) => !text(h, l) || text(h, l).length > MAX))) fail(id, 'needs a ladder of 2+ short hints');
  if (/\bleet\s*code\b/i.test(JSON.stringify(e))) fail(id, 'mentions LeetCode');
  const langs = ['py', 'js'];
  if (e.kind === 'predict') {
    langs.forEach((lang) => {
      const ch = e.choices[lang];
      if (!Array.isArray(ch) || !(e.answer >= 0 && e.answer < ch.length)) { fail(id, lang + ' choices or answer missing'); return; }
      if (new Set(ch).size !== ch.length) fail(id, lang + ' choices repeat');
      if (lang === 'js') { const r = runJs(e.code.js); const got = r.error ? 'An error' : r.out; if (got !== R.programOutput([ch[e.answer]])) fail(id, 'js prints ' + JSON.stringify(got) + ', the answer says ' + JSON.stringify(ch[e.answer])); }
      else pyJobs.push({ code: e.code.py, check: (r) => { if ((r.error ? 'An error' : r.out) !== R.programOutput([ch[e.answer]])) fail(id, 'py prints ' + JSON.stringify(r.error || r.out) + ', the answer says ' + JSON.stringify(ch[e.answer])); } });
    });
    if (!e.why) fail(id, 'predict needs a why');
  } else if (e.kind === 'choose') {
    if (!Array.isArray(e.choices) || !(e.answer >= 0 && e.answer < e.choices.length) || !e.why) fail(id, 'choose needs choices, an answer and a why');
  } else if (e.kind === 'order') {
    const n = e.lines.py.length;
    if (e.lines.js.length !== n) fail(id, 'py and js need the same number of lines');
    const sh = e.shuffle || [];
    if (sh.length !== n || new Set(sh).size !== n || sh.some((x) => x < 0 || x >= n)) fail(id, 'shuffle must be an order of the lines');
    if (sh.every((x, i) => x === i)) fail(id, 'shuffle shows the answer already');
    programCases(id, e, { py: e.lines.py.join('\n') + '\n', js: e.lines.js.join('\n') + '\n' }, { py: sh.map((k) => e.lines.py[k]).join('\n') + '\n', js: sh.map((k) => e.lines.js[k]).join('\n') + '\n' });
  } else if (e.kind === 'fill') {
    const built = {}, empty = {};
    langs.forEach((lang) => {
      const blanks = (e.code[lang].match(/___/g) || []).length;
      if (!blanks || (e.answers[lang] || []).length !== blanks) fail(id, lang + ' needs one answer per blank');
      let k = 0; built[lang] = e.code[lang].replace(/___/g, () => e.answers[lang][k++] || '') + '\n';
      empty[lang] = e.code[lang].replace(/___/g, '') + '\n';
    });
    programCases(id, e, built, empty);
  } else if (e.kind === 'trace') {
    if (!e.code || !e.var || !Array.isArray(e.answer) || !e.answer.length) fail(id, 'trace needs code, var and answer');
    else traceJobs.push(e);
  } else if (e.kind === 'fix' || e.kind === 'write') {
    if (e.fn) functionCases(id, e);
    else programCases(id, e, e.ref, e.starter);
  } else fail(id, 'unknown kind ' + e.kind);
}
// A program exercise: the reference passes every case; the starter (or the shuffled lines) fails at least one.
function programCases(id, e, ref, starter) {
  if (!Array.isArray(e.cases) || !e.cases.length) { fail(id, 'needs cases'); return; }
  let jsStarterPasses = true;
  e.cases.forEach((cs, i) => {
    const r = runJs(ref.js, cs.stdin);
    if (r.error || r.out !== wantOut(cs, 'js')) fail(id, 'js reference case ' + (i + 1) + ': ' + (r.error || JSON.stringify(r.out)) + ' wants ' + JSON.stringify(wantOut(cs, 'js')));
    const s = runJs(starter.js, cs.stdin);
    if (s.error || s.out !== wantOut(cs, 'js')) jsStarterPasses = false;
    pyJobs.push({ code: ref.py, stdin: cs.stdin, check: (x) => { if (x.error || x.out !== wantOut(cs, 'py')) fail(id, 'py reference case ' + (i + 1) + ': ' + (x.error || JSON.stringify(x.out)) + ' wants ' + JSON.stringify(wantOut(cs, 'py'))); } });
  });
  if (jsStarterPasses) fail(id, 'the js starter already passes');
}
function functionCases(id, e) {
  const spec = { fn: e.fn, params: e.params, cmp: e.cmp || 'exact' };
  if (!Array.isArray(e.cases) || e.cases.length < 3) { fail(id, 'a function exercise needs 3+ cases'); return; }
  const out = [];
  const ctx = { console: {}, JSON, Math, Date, Array, Object, String, Number, Map, Set, Error };
  ctx.self = ctx; ctx.postMessage = (m) => out.push(m);
  vm.runInNewContext(R.jsWorkerSource(e.ref.js, e.fn, e.cases.map((x) => x[0])), ctx, { timeout: 3000 });
  out.filter((m) => m.type === 'case').forEach((m) => { if (m.error || !T.judge(spec, e.cases[m.i][0], m.got, e.cases[m.i][1])) fail(id, 'js reference case ' + (m.i + 1) + ': ' + (m.error || JSON.stringify(m.got))); });
  if (out.find((m) => m.type === 'fatal')) fail(id, 'js reference: ' + out.find((m) => m.type === 'fatal').error);
  const harness = e.ref.py + '\nimport json as _j\nfor _a in _j.loads(' + JSON.stringify(JSON.stringify(e.cases.map((x) => x[0]))) + '):\n    print(_j.dumps(' + e.fn + '(*_a)))\n';
  pyJobs.push({ code: harness, check: (x) => {
    if (x.error) { fail(id, 'py reference: ' + x.error); return; }
    x.out.split('\n').forEach((l, i) => { if (!T.judge(spec, e.cases[i][0], JSON.parse(l), e.cases[i][1])) fail(id, 'py reference case ' + (i + 1) + ': ' + l); });
  } });
}
// ---------- run Python ----------
const res = runPyAll(pyJobs);
if (!py) console.log('  (Python 3 not found: Python references skipped; JavaScript references checked)');
else if (res) res.forEach((r, i) => pyJobs[i].check(r));
// trace exercises and the stored traces, with the real tracer
if (py) {
  const tracer = read('src', 'start', 'tracer.py');
  const reqs = traceJobs.map((e) => ({ code: e.code, stdin: [] }));
  const ready = S.START_CHAPTERS.filter((c) => c.ready && c.watch);
  ready.forEach((c) => reqs.push({ code: c.watch.code, stdin: c.watch.stdin || [], heap: !!c.watch.heap }));
  const r = spawnSync(py, ['-c', tracer.replace("if __name__ == '__main__':", 'if True:')], { input: JSON.stringify(reqs), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) fail('tracer', r.stderr.slice(0, 300));
  else {
    const out = JSON.parse(r.stdout);
    traceJobs.forEach((e, i) => {
      const seq = [];
      let last;
      out[i].steps.forEach((s) => { const f = s.s[0]; if (!f) return; const v = (f[2].find((x) => x[0] === e.var) || [])[1]; if (v !== undefined && v !== last) { seq.push(v); last = v; } });
      if (JSON.stringify(seq) !== JSON.stringify(e.answer.map(String))) fail(e.id, 'trace of ' + e.var + ' is ' + JSON.stringify(seq) + ', answer says ' + JSON.stringify(e.answer));
    });
    ready.forEach((c, k) => { if (JSON.stringify(out[traceJobs.length + k]) !== JSON.stringify(S.START_TRACES[c.id])) fail(c.id, 'src/start/traces.js is stale: run python scripts/build_pages.py'); });
  }
}

// ---------- needs ----------
const DIFF_OK = ['Starter', 'Easy'];
Object.entries(S.START_NEEDS).forEach(([pid, needs]) => {
  if (!T.TEST_SPECS[pid]) { fail(pid, 'needs.js names a problem with no spec'); return; }
  if (!DIFF_OK.includes(T.specInfo(pid).diff)) fail(pid, 'only easy problems belong in needs.js');
  needs.forEach((k) => { if (!S.START_NEEDS_KEYS[k]) fail(pid, 'unknown need ' + k); });
  if (!needs.includes('functions') || !needs.includes('return')) fail(pid, 'every runnable problem needs functions and return');
  if (!S.START_PROBLEMS[pid]) fail(pid, 'no title in START_PROBLEMS: rebuild');
});
S.START_CHAPTERS.forEach((c) => (c.first || []).forEach((pid) => {
  const needs = S.START_NEEDS[pid];
  if (!needs) { fail(c.id, 'first problem ' + pid + ' has no needs in needs.js'); return; }
  const taught = S.startTaughtBy(c.id);
  const late = needs.filter((k) => !taught.includes(k));
  if (late.length) fail(c.id, 'first problem ' + pid + ' needs ' + late.join(', ') + ', taught later');
}));

// ---------- DS wiring: progress, streak, XP, medals, revisit cards, the ring ----------
{
  const built = JSON.parse(spawnSync('node', [path.join(root, 'scripts', 'build_start.js')], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).stdout);
  const store = {};
  const window = { localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } } };
  const src = read('shared', 'data.js').replace('/*@@START-MEDALS@@*/[]', JSON.stringify(built.medals)).replace('/*@@START-OUTLINE@@*/[]', JSON.stringify(built.outline));
  const DS = new Function('window', src + '\nreturn DS;')(window);
  DS.setClock(() => new Date(2026, 9, 21, 20, 0, 0).getTime());
  const ok = (cond, msg) => { if (!cond) fail('DS', msg); };
  const first = S.START_CHAPTERS[0], ex = S.START_EXERCISES[first.id];
  const sets = built.medals;
  const written = (n) => S.START_CHAPTERS.some((c) => (c.level || 1) === n && c.ready);
  ok(sets.filter((g) => g.level === 1).length === 5 && sets.filter((g) => g.level === 2).length === (written(2) ? 4 : 0) && sets.filter((g) => g.level === 3).length === (written(3) ? 4 : 0), 'medal sets: five for Level 1, four each for Levels 2 and 3 once written');
  ok(sets.every((g) => g.lessons.length && g.lessons.every((id) => S.START_CHAPTERS.find((c) => c.id === id && c.ready))), 'every medal is made of ready lessons');
  [1, 2, 3].filter(written).forEach((n) => { const mine = [].concat(...sets.filter((g) => g.level === n).map((g) => g.lessons)); const all = S.START_CHAPTERS.filter((c) => (c.level || 1) === n).map((c) => c.id); ok(mine.length === all.length && all.every((id) => mine.includes(id)), 'the Level ' + n + ' medals cover every Level ' + n + ' lesson once'); });
  ok(DS.startMedals().length === sets.length && DS.startMedals().every((m) => !m.tier && m.next.tier === 'bronze'), 'every Start here medal starts unearned');
  ok(DS.startRing() === null, 'no Start here ring before the learner starts');
  ok(DS.profile().isNew, 'a new learner is new');
  DS.startPass(ex[0].id);
  ok(DS.streak().activeToday && DS.xp().total === DS.XP.start, 'a passed exercise counts for the streak and XP');
  DS.startPass(ex[0].id);
  ok(DS.xp().total === DS.XP.start, 'passing the same exercise twice gives XP once');
  ok(!DS.profile().isNew, 'a learner with a passed exercise is not new');
  DS.startFinish(first.id);
  ok(DS.lessons().ids.includes('start:' + first.id), 'a finished lesson is logged as start:<id>');
  ok(DS.startMedals()[0].tier === 'bronze', 'one finished lesson earns the chapter bronze');
  ok(DS.medals([], []).some((m) => m.start), 'DS.medals includes the beginner set');
  ok(DS.reviewCards().some((c) => c.kind === 'start' && c.id === 'start:' + first.id), 'a finished lesson becomes a revisit card');
  const ring = DS.startRing();
  ok(ring && ring.done === 1 && ring.total === S.START_CHAPTERS.filter((c) => (c.level || 1) === 1).length, 'the ring counts every Level 1 lesson');
  DS.startPlace([S.START_CHAPTERS[1].id]);
  ok(DS.startRing().done === 2, 'placement-known lessons fill the ring');
  ok(S.startProgress(DS.start()).rows[1].known, 'placement marks a lesson known');

  // ---------- one source for every Start here count ----------
  const RM = new Function('window', read('shared', 'roadmap.js') + '\nreturn { ROADMAP_NODES, rmStartNodeCounts, rmStartLaneCounts };')(window);
  const hub = DS.startCounts(1);
  ok(hub.total === level1.length, 'the hub counts all ' + level1.length + ' Level 1 lessons (got ' + hub.total + ')');
  ok(hub.done === 2, 'the hub counts finished and known lessons');
  const ring2 = DS.startRing();
  ok(ring2.total === hub.total && ring2.done === hub.done, 'Profile’s ring agrees with the hub');
  const lane = (k) => RM.ROADMAP_NODES.filter((n) => n.lane === k && n.track === 'start');
  const startLane = RM.rmStartLaneCounts('start', lane('start'), DS);
  ok(startLane.total === hub.total && startLane.done === hub.done, 'the roadmap’s Start here lane agrees with the hub: ' + startLane.done + ' of ' + startLane.total + ' vs ' + hub.done + ' of ' + hub.total);
  const nodeSum = lane('start').map((n) => RM.rmStartNodeCounts(n, DS)).reduce((a, c) => ({ total: a.total + c.total, done: a.done + c.done }), { total: 0, done: 0 });
  ok(nodeSum.total === hub.total && nodeSum.done === hub.done, 'the Start here node cards add up to the lane total');
  const seen = {};
  lane('start').concat(lane('core')).forEach((n) => n.lessons.forEach(([lid, title]) => {
    seen[lid] = (seen[lid] || 0) + 1;
    const ch = S.START_CHAPTERS.find((c) => c.id === lid);
    if (n.go && !ch) fail(n.id, 'roadmap lesson ' + lid + ' is not in src/start/chapters.js');
    if (n.go && ch && ch.title !== title) fail(n.id, 'roadmap title for ' + lid + ' should be ' + JSON.stringify(ch.title));
    if (n.go && ch && !ch.ready) fail(n.id, 'a live roadmap node lists ' + lid + ', which is not written yet');
  }));
  level1.forEach((c) => { if (seen[c.id] !== 1) fail('roadmap', 'Level 1 lesson ' + c.id + ' should sit on exactly one Start here node (found ' + (seen[c.id] || 0) + ')'); });
  S.START_CHAPTERS.filter((c) => (c.level || 1) > 1 && c.ready).forEach((c) => {
    const live = lane('core').filter((n) => n.go && n.lessons.some(([lid]) => lid === c.id));
    if (live.length !== 1) fail('roadmap', 'ready lesson ' + c.id + ' should sit on exactly one live core node (found ' + live.length + ')');
  });
  const core = RM.rmStartLaneCounts('core', lane('core'), DS);
  const ready23 = S.START_CHAPTERS.filter((c) => (c.level || 1) > 1 && c.ready).length;
  ok(core.total === ready23, 'the core lane counts every written Level 2 and 3 lesson: ' + core.total + ' vs ' + ready23);
  const firstNode = RM.ROADMAP_NODES.find((n) => n.id === 's-programs');
  ok(RM.rmStartNodeCounts(firstNode, DS).total === firstNode.lessons.length, 'the Your first programs card counts its own lessons');
  // The pages read these counts, not their own.
  [['Start', ['const counts = DS.startCounts(1);', "counts.done + ' of ' + counts.total + ' Level 1 lessons done'"]], ['Home', ['const startCount = DS.startCounts(1);', "startCount.done + ' of ' + startCount.total + ' Level 1 lessons done'"]],
    ['Patterns', ['rmStartNodeCounts(n, DS)', 'rmStartLaneCounts(l.key, l.nodes, DS)']]].forEach(([p, need]) => { const src = read('pages', p + '.dc.html'); need.forEach((x) => { if (src.indexOf(x) < 0) fail(p, 'should count Start here lessons with the shared helper: ' + x); }); });
  if (read('src', 'pages', 'profile.js').indexOf('DS.startRing()') < 0) fail('Profile', 'should count Start here lessons with DS.startRing');
}

// ---------- error help and pages ----------
[['NameError: name \'pront\' is not defined (line 1)', /pront/], ['SyntaxError: unterminated string literal (detected at line 1) (line 1)', /quote/], ['TypeError: can only concatenate str (not "int") to str', /str\(\)/], ['ZeroDivisionError: division by zero', /zero/], ['Timeout', /never finished/], ['IndentationError: expected an indented block', /indent/i]]
  .forEach(([m, re]) => { if (!re.test(S.startHelp(m, 'py'))) fail('help', 'no plain help for ' + m); });
if (!/ReferenceError/.test(S.startHelp('ReferenceError: x is not defined', 'js'))) fail('help', 'JavaScript names should say ReferenceError');
// No LeetCode mentions in our track's own files and page code (the generated shared blocks are checked elsewhere).
require('../scripts/start_files.js').startFiles().concat(['tracer.py']).forEach((f) => { if (/leet\s*code/i.test(read('src', 'start', f))) fail(f, 'mentions LeetCode'); });
['Start', 'Chapter'].forEach((n) => {
  const s = read('pages', n + '.dc.html');
  const own = s.slice(s.indexOf('<!-- /PILL NAV -->'), s.indexOf('</x-dc>')).replace(/<!-- CODE PANE -->[\s\S]*?<!-- \/CODE PANE -->/, '') + s.slice(s.indexOf('// ---- page ----'));
  if (/leet\s*code/i.test(own)) fail(n, 'page mentions LeetCode');
});

// ---------- no mascot names in learner text ----------
// The cast is roles, not characters: the guide narrates, "You" is the learner, "The computer" runs the code.
// The old invented names must not show anywhere in the track's learner text (its lessons, exercises, cast and pages' track code).
const CAST_ROLES = ['Guide', 'You', 'The computer', 'A friend', 'The canteen worker'];
Object.keys(S.START_CAST).forEach((k) => { if (CAST_ROLES.indexOf(S.START_CAST[k].name) < 0) fail('cast ' + k, 'name ' + S.START_CAST[k].name + ' is not a plain role'); });
const OLD_NAMES = /(Old Hoot|Hoot|Bolt|Dot|Pip|Penny|Nova|Zip|Mop|Dash)/;
const learnerText = JSON.stringify([S.START_CHAPTERS, S.START_EXERCISES, S.START_PLACEMENT, S.START_PARTS, S.START_LEVELS, S.START_CAST, S.START_ROAD]);
const badName = learnerText.match(OLD_NAMES);
if (badName) fail('cast', 'a mascot name shows in Start here learner text: ' + badName[0]);
const startFileList = require('../scripts/start_files.js').startFiles();
startFileList.forEach((f) => { const m = read('src', 'start', f).match(OLD_NAMES); if (m) fail(f, 'mentions the old name ' + m[0]); });
const hubSrc = read('pages', 'Start.dc.html');
if (/are your guides|Old Hoot|Hoot, Dot|the guides/.test(hubSrc)) fail('Start', 'the hub still has the guides row');
const chapterSrc = read('pages', 'Chapter.dc.html');
['trace table', 'Trace table', 'No variables yet.', 'Old Hoot'].forEach((t) => { if (chapterSrc.indexOf(t) >= 0) fail('Chapter', 'still shows: ' + t); });

console.log('✓ ' + ready + ' ready lessons of ' + S.START_CHAPTERS.length + ', ' + exCount + ' exercises, ' + Object.keys(S.START_NEEDS).length + ' tagged problems' + (py ? ', Python checked' : ''));
console.log(bad ? bad + ' problem(s)' : 'start here clean');
if (bad) process.exitCode = 1;
