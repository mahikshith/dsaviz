// Check shared/tests_spec.js: every problem with a story has a complete spec, and the JavaScript
// reference solution passes every case. The references also run through the real worker harness
// (shared/runner.js) inside a Node vm, so the page's runner is exercised too.
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { TEST_SPECS, CODE_LANGS, starterCode, sameResult, showValue } = require('../shared/tests_spec.js');
const { jsWorkerSource } = require('../shared/runner.js');

let bad = 0;
const fail = (id, msg) => { bad++; console.log('  ✗', id, msg); };

// The animated stories in the catalog must all have a spec.
const catalog = fs.readFileSync(path.join(__dirname, '..', 'shared', 'catalog.js'), 'utf8');
const { PROBLEMS } = new Function('const window = {};\n' + catalog + '\nreturn { PROBLEMS };')();
for (const p of PROBLEMS.filter((x) => x.animated)) if (!TEST_SPECS[p.id]) fail(p.id, 'animated story has no test spec');

function harness(code, fn, cases) {
  const out = [];
  const ctx = { console: {}, JSON, Math, Date, Array, Object, String, Number, Map, Set, Infinity };
  ctx.self = ctx;
  ctx.postMessage = (m) => out.push(m);
  vm.runInNewContext(jsWorkerSource(code, fn, cases), ctx, { timeout: 2000 });
  return out;
}

for (const [id, spec] of Object.entries(TEST_SPECS)) {
  if (!PROBLEMS.find((p) => p.id === id)) fail(id, 'not in the catalog');
  for (const [lang] of CODE_LANGS) {
    if (!spec.sig || !spec.sig[lang]) fail(id, 'no ' + lang + ' signature');
    else if (!spec.sig[lang].includes(spec.fn)) fail(id, lang + ' signature does not name ' + spec.fn);
  }
  if (!['exact', 'unordered', 'float'].includes(spec.cmp)) fail(id, 'unknown comparator ' + spec.cmp);
  if (!spec.ask) fail(id, 'no problem statement');
  if (!Array.isArray(spec.examples) || spec.examples.length !== 3) fail(id, 'needs exactly 3 visible examples');
  if (!Array.isArray(spec.hidden) || spec.hidden.length < 3 || spec.hidden.length > 5) fail(id, 'needs 3-5 hidden cases');
  if (typeof spec.ref !== 'function') { fail(id, 'no JS reference'); continue; }
  const cases = spec.examples.concat(spec.hidden);
  const seen = new Set();
  cases.forEach(([args, want], i) => {
    if (!Array.isArray(args) || args.length !== spec.params.length) fail(id, 'case ' + i + ' has ' + (args && args.length) + ' args, wants ' + spec.params.length);
    const key = showValue(args);
    if (seen.has(key)) fail(id, 'duplicate case ' + key);
    seen.add(key);
    const got = spec.ref(...JSON.parse(JSON.stringify(args)));
    if (!sameResult(spec.cmp, got, want)) fail(id, 'reference gives ' + showValue(got) + ' for ' + key + ', spec says ' + showValue(want));
  });
  // The JS starter must parse, and must fail the examples (it returns nothing yet).
  try { new Function(starterCode(spec, 'js')); } catch (e) { fail(id, 'JS starter does not parse: ' + e.message); }
  // Reference through the worker harness, written as a learner would (a const arrow and a declaration).
  const asDecl = 'function ' + spec.fn + spec.ref.toString().replace(/^function\s*/, '');
  const asConst = 'const ' + spec.fn + ' = ' + spec.ref.toString() + ';';
  for (const code of [asDecl, asConst]) {
    const msgs = harness(code, spec.fn, cases.map((c) => c[0]));
    const got = msgs.filter((m) => m.type === 'case');
    if (got.length !== cases.length || msgs[msgs.length - 1].type !== 'done') { fail(id, 'harness did not finish: ' + JSON.stringify(msgs.slice(-1))); continue; }
    got.forEach((m) => { if (m.error || !sameResult(spec.cmp, m.got, cases[m.i][1])) fail(id, 'harness case ' + m.i + ' failed: ' + (m.error || showValue(m.got))); });
  }
  const starterMsgs = harness(starterCode(spec, 'js'), spec.fn, spec.examples.map((c) => c[0]));
  const passes = starterMsgs.filter((m) => m.type === 'case' && !m.error && !m.undef && sameResult(spec.cmp, m.got, spec.examples[m.i][1])).length;
  if (passes === spec.examples.length) fail(id, 'the empty starter already passes every example');
  console.log('✓', id.padEnd(20), spec.examples.length + ' examples, ' + spec.hidden.length + ' hidden, cmp ' + spec.cmp);
}
// The harness reports learner errors and console output.
const msgs = harness('function f(a) { console.log("hi", [a]); if (a > 1) throw new Error("boom"); return a; }', 'f', [[1], [2]]);
if (msgs[0].logs[0] !== 'hi [1]' || msgs[0].got !== 1 || !/boom/.test(msgs[1].error)) { bad++; console.log('  ✗ harness log/error capture', JSON.stringify(msgs)); }
if (harness('function g() {}', 'f', [[1]])[0].type !== 'fatal') { bad++; console.log('  ✗ harness should report a missing function'); }
console.log(bad ? bad + ' problem(s)' : 'all specs pass');
if (bad) process.exitCode = 1;
