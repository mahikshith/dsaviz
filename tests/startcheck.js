// Start here check: every ready lesson is complete (story, watch it run, try it, 3+ exercises, one check), captions
// are short, scenes stay on the canvas, every exercise reference really works (JavaScript always, Python when it is
// installed), the traces are current, the needs tags and the path are consistent, and nothing names LeetCode.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
let bad = 0;
const fail = (id, msg) => { bad++; console.log('  ✗', id, msg); };

const S = new Function(read('src', 'ai', 'render.js') + '\n' + require('../scripts/start_files.js').startSource() +
  '\nreturn { START_CHAPTERS, START_EXERCISES, START_NEEDS, START_NEEDS_KEYS, START_TRACES, START_PROBLEMS, START_PARTS, START_LEVELS, START_PLACEMENT, START_CAST, START_ROAD, stSceneProblems, startTraceSay, startTaughtBy, startFirstProblems, startProgress, startHelp, stPlates, stRefs, stQueue, stScene };')();
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
if (level1.length < 26) fail('level 1', 'has ' + level1.length + ' lessons, wants the 24 lessons, the bridge and counting steps');
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
      if (lang === 'js') { const r = runJs(e.code.js); const got = r.error ? 'ERROR' : r.out; if (got !== R.programOutput([ch[e.answer]])) fail(id, 'js prints ' + JSON.stringify(got) + ', the answer says ' + JSON.stringify(ch[e.answer])); }
      else pyJobs.push({ code: e.code.py, check: (r) => { if ((r.error ? 'ERROR' : r.out) !== R.programOutput([ch[e.answer]])) fail(id, 'py prints ' + JSON.stringify(r.error || r.out) + ', the answer says ' + JSON.stringify(ch[e.answer])); } });
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
  ready.forEach((c) => reqs.push({ code: c.watch.code, stdin: c.watch.stdin || [] }));
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

console.log('✓ ' + ready + ' ready lessons of ' + S.START_CHAPTERS.length + ', ' + exCount + ' exercises, ' + Object.keys(S.START_NEEDS).length + ' tagged problems' + (py ? ', Python checked' : ''));
console.log(bad ? bad + ' problem(s)' : 'start here clean');
if (bad) process.exitCode = 1;
