// Check shared/approaches.js and shared/facts.js.
//  - Every runnable problem has facts: an input line, an output line, 2 to 4 constraints and a target time and space.
//    Every test case (visible and hidden) keeps every constraint.
//  - Every SQL problem has an input line and an output line.
//  - Every story problem has approaches. Each problem with approaches has 2 or 3 of them, from brute force to best,
//    each with a name, an idea, time and space with a reason, JavaScript and 1 to 3 pitfalls. The best approach
//    meets the target. Every approach's JavaScript passes the problem's tests through the real runner harness
//    (one marked slow runs the visible examples only). Python, when given and when Python 3 is installed, too.
//  - The practice lists (shared/lists.js) use real registry ids with no repeats, Core skills 20 inside All, Starter 50 inside Core 150
//    inside All; every Core problem has approaches; the registry records each problem's lists.
//  - None of it names an outside problem site.
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { spawnSync } = require('child_process');
const { TEST_SPECS, judge, showValue } = require('../shared/tests_spec.js');
const { SQL_SPECS } = require('../shared/sql_spec.js');
const { jsWorkerSource, PY_HARNESS, JS_TIME_LIMIT } = require('../shared/runner.js');
global.TEST_SPECS = TEST_SPECS;
const { PROBLEM_FACTS, SQL_FACTS, factHolds, problemFacts } = require('../shared/facts.js');
const { APPROACHES, approachTiers } = require('../shared/approaches.js');

const read = (...p) => fs.readFileSync(path.join(__dirname, '..', ...p), 'utf8');
const win = { localStorage: { getItem: () => null, setItem: () => {} } };
const { PROBLEMS } = new Function('window', read('shared', 'catalog.js') + '\nreturn { PROBLEMS };')(win);

let bad = 0;
const fail = (id, msg) => { bad++; console.log('  ✗', id, msg); };
const BIG_O = /^O\(.+\)( (amortized |average )?per [a-z]+)?$/;
const OUTSIDE = /leet\s*code/i;

// Facts for every problem.
for (const [id, spec] of Object.entries(TEST_SPECS)) {
  const f = PROBLEM_FACTS[id];
  if (!f) { fail(id, 'no facts (input, output, constraints, target)'); continue; }
  const [input, output, time, space, note, cons] = f;
  if (!input || !output) fail(id, 'needs an input line and an output line');
  if (!BIG_O.test(time) || !/^O\(.+\)$/.test(space)) fail(id, 'target should read like O(n) and O(1): ' + time + ' / ' + space);
  if (typeof note !== 'string') fail(id, 'the note should be a string');
  const lines = problemFacts(id).cons;
  if (lines.length < 2 || lines.length > 4) fail(id, 'needs 2 to 4 constraints, has ' + lines.length);
  if (lines.some((l) => !l || /undefined|NaN/.test(l))) fail(id, 'a constraint does not read: ' + JSON.stringify(lines));
  const cases = spec.examples.concat(spec.hidden);
  cons.forEach((c, k) => cases.forEach(([args, want], i) => {
    let ok = false;
    try { ok = factHolds(c, spec, args, want); } catch (e) { ok = false; }
    if (!ok) fail(id, 'case ' + i + ' breaks the constraint "' + lines[k] + '": ' + showValue(args).slice(0, 80));
  }));
}
Object.keys(PROBLEM_FACTS).forEach((id) => { if (!TEST_SPECS[id]) fail(id, 'facts for a problem with no spec'); });
for (const id of Object.keys(SQL_SPECS)) if (!SQL_FACTS[id] || !SQL_FACTS[id][0] || !SQL_FACTS[id][1]) fail(id, 'SQL problem needs an input line and an output line');
if (OUTSIDE.test(JSON.stringify([PROBLEM_FACTS, SQL_FACTS]))) fail('facts', 'names an outside problem site');

// Our tiered lists (shared/lists.js): real registry ids, no repeats, Starter inside Core inside All.
{
  const { SHEET, PROBLEM_LISTS, listIds, listName } = new Function('window', read('shared', 'catalog.js') + '\n' + read('shared', 'sheet.js') + '\n' + read('shared', 'lists.js') + '\nreturn { SHEET, PROBLEM_LISTS, listIds, listName };')(win);
  const reg = JSON.parse(read('data', 'problem-registry.json')).entries;
  const regIds = new Set(reg.map((e) => e.id));
  const want = { starter: 50, core: 150, skills: 20, all: reg.length };
  const sets = {};
  for (const l of PROBLEM_LISTS) {
    const ids = listIds(l);
    sets[l.id] = new Set(ids);
    ids.filter((id) => !regIds.has(id)).forEach((id) => fail('list ' + l.id, 'not a registry id: ' + id));
    if (sets[l.id].size !== ids.length) fail('list ' + l.id, 'repeats a problem: ' + ids.filter((id, i) => ids.indexOf(id) !== i).join(', '));
    if (want[l.id] !== undefined && ids.length !== want[l.id]) fail('list ' + l.id, 'should hold ' + want[l.id] + ' problems, holds ' + ids.length);
    if (!new RegExp(' ' + ids.length + '$').test(listName(l))) fail('list ' + l.id, 'its name does not show its size: ' + listName(l));
    if (OUTSIDE.test(JSON.stringify(l))) fail('list ' + l.id, 'names an outside problem site');
  }
  if (Object.keys(want).some((k) => !sets[k])) fail('lists', 'needs starter, core and all');
  else {
    [...sets.starter].filter((id) => !sets.core.has(id)).forEach((id) => fail('list starter', id + ' is not in Core'));
    [...sets.core].filter((id) => !sets.all.has(id)).forEach((id) => fail('list core', id + ' is not in All'));
    [...sets.skills].filter((id) => !sets.all.has(id)).forEach((id) => fail('list skills', id + ' is not in All'));
    if (sets.all.size !== regIds.size) fail('list all', 'should hold every registry problem');
    [...sets.core].filter((id) => !APPROACHES[id]).forEach((id) => fail('list core', id + ' has no approaches'));
  }
  // The registry records each problem's lists.
  reg.forEach((e) => {
    const on = PROBLEM_LISTS.filter((l) => sets[l.id].has(e.id)).map((l) => l.id);
    if (JSON.stringify(e.lists || []) !== JSON.stringify(on)) fail('registry ' + e.id, 'lists ' + JSON.stringify(e.lists) + ' should be ' + JSON.stringify(on) + ' (run the build)');
  });
  if (SHEET.length !== reg.length) fail('lists', 'the sheet and the registry disagree on the problem count');
}

// Approaches.
for (const p of PROBLEMS) if (TEST_SPECS[p.id] && !APPROACHES[p.id]) fail(p.id, 'story problem has no approaches');
if (OUTSIDE.test(JSON.stringify(APPROACHES))) fail('approaches', 'names an outside problem site');

function harness(code, fn, cases, io, drive) {
  return new Promise((resolve) => {
    const out = [];
    let finished = false;
    const finish = () => { if (!finished) { finished = true; resolve(out); } };
    const ctx = { console: {}, JSON, Math, Date, Array, Object, String, Number, Map, Set, Infinity, Error, Function, Promise, BigInt, setTimeout, clearTimeout };
    ctx.self = ctx;
    ctx.postMessage = (m) => { out.push(m); if (m.type === 'done' || m.type === 'fatal') finish(); };
    try { vm.runInNewContext(jsWorkerSource(code, fn, cases, io, drive), ctx, { timeout: 8000 }); } catch (e) { out.push({ type: 'fatal', error: e.message }); finish(); }
    setTimeout(finish, JS_TIME_LIMIT + 4000);
  });
}

(async () => {
  const pyJobs = [];
  let count = 0;
  for (const [id, list] of Object.entries(APPROACHES)) {
    const spec = TEST_SPECS[id];
    if (!spec) { fail(id, 'approaches for a problem with no spec'); continue; }
    if (!Array.isArray(list) || list.length < 2 || list.length > 3) { fail(id, 'needs 2 or 3 approaches'); continue; }
    const tiers = approachTiers(list.length);
    const f = PROBLEM_FACTS[id];
    const best = list[list.length - 1];
    if (f && (best.time !== f[2] || best.space !== f[3])) fail(id, 'the best approach (' + best.time + ', ' + best.space + ') should meet the target (' + f[2] + ', ' + f[3] + ')');
    for (let k = 0; k < list.length; k++) {
      const a = list[k];
      const where = id + ' / ' + tiers[k];
      for (const key of ['name', 'idea', 'time', 'space', 'why', 'js']) if (typeof a[key] !== 'string' || !a[key].trim()) fail(where, 'missing ' + key);
      if (!/^O\(.+\)/.test(a.time || '') || !/^O\(.+\)$/.test(a.space || '')) fail(where, 'time and space should read like O(n)');
      if (!Array.isArray(a.pitfalls) || a.pitfalls.length < 1 || a.pitfalls.length > 3) fail(where, 'needs 1 to 3 pitfalls');
      if (a.slow && k === list.length - 1) fail(where, 'the best approach cannot be the slow one');
      if (!a.js) continue;
      if (!a.js.includes(spec.fn)) fail(where, 'the JavaScript does not define ' + spec.fn);
      const cases = a.slow ? spec.examples : spec.examples.concat(spec.hidden);
      const msgs = await harness(a.js, spec.fn, cases.map((c) => c[0]), spec.io, spec.drive ? spec.drive.toString() : null);
      const got = msgs.filter((m) => m.type === 'case');
      if (got.length !== cases.length || !msgs.length || msgs[msgs.length - 1].type !== 'done') { fail(where, 'JavaScript did not finish: ' + JSON.stringify(msgs.slice(-1)).slice(0, 200)); continue; }
      got.forEach((m) => { if (m.error || !judge(spec, cases[m.i][0], m.got, cases[m.i][1])) fail(where, 'JavaScript fails case ' + m.i + ': ' + (m.error || showValue(m.got)).slice(0, 120) + ' for ' + showValue(cases[m.i][0]).slice(0, 80)); });
      count++;
      if (a.py && !(spec.langs && !spec.langs.includes('py'))) pyJobs.push({ where, code: a.py, fn: spec.fn, io: spec.io || null, cases, spec });
    }
  }
  // Python: one process runs every approach's cases through the page's Python harness.
  const py = ['python3', 'python'].find((cmd) => { try { return spawnSync(cmd, ['-c', 'import sys; sys.exit(0 if sys.version_info[0] == 3 else 1)']).status === 0; } catch (e) { return false; } });
  let pyCount = 0;
  if (!py) console.log('  (Python 3 not found: skipped the Python approaches)');
  else if (pyJobs.length) {
    const script = PY_HARNESS + '\nimport sys\nfor code, name, io, cases in json.loads(sys.stdin.read()):\n    try:\n        exec(code, globals())\n    except Exception as e:\n        print(json.dumps({"error": "compile: " + str(e)}))\n        continue\n    out = []\n    for args in cases:\n        try:\n            out.append(json.loads(__run(json.dumps(args), name, json.dumps(io))))\n        except Exception as e:\n            out.append({"__err": type(e).__name__ + ": " + str(e)})\n    print(json.dumps(out))\n';
    const r = spawnSync(py, ['-c', script], { input: JSON.stringify(pyJobs.map((j) => [j.code, j.fn, j.io, j.cases.map((c) => c[0])])), encoding: 'utf8', maxBuffer: 1 << 28 });
    const lines = (r.stdout || '').trim().split(/\r?\n/);
    pyJobs.forEach((j, n) => {
      let res; try { res = JSON.parse(lines[n]); } catch (e) { fail(j.where, 'Python gave no answer: ' + (r.stderr || '').slice(-300)); return; }
      if (!Array.isArray(res)) { fail(j.where, 'Python ' + res.error); return; }
      res.forEach((got, i) => { if ((got && got.__err) || !judge(j.spec, j.cases[i][0], got, j.cases[i][1])) fail(j.where, 'Python fails case ' + i + ': ' + (got && got.__err ? got.__err : showValue(got)).slice(0, 120)); });
      pyCount++;
    });
  }
  console.log('Facts: ' + Object.keys(PROBLEM_FACTS).length + ' problems, ' + Object.keys(SQL_FACTS).length + ' SQL. Approaches: ' + Object.keys(APPROACHES).length + ' problems, ' + count + ' in JavaScript, ' + pyCount + ' in Python');
  console.log(bad ? bad + ' problem(s)' : 'approaches clean');
  if (bad) process.exitCode = 1;
})();
