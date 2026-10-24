// Check shared/tests_spec.js: every animated story has a complete spec, and the JavaScript
// reference solution passes every case. The references also run through the real worker harness
// (shared/runner.js) inside a Node vm, so the page's runner and its list/tree/graph encodings are
// exercised too. If Python 3 is installed, the Python harness gets a smoke test as well.
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { spawnSync } = require('child_process');
const { TEST_SPECS, CODE_LANGS, starterCode, judge, runRef, showValue, specInfo } = require('../shared/tests_spec.js');
const { jsWorkerSource, PY_HARNESS } = require('../shared/runner.js');

let bad = 0;
const fail = (id, msg) => { bad++; console.log('  ✗', id, msg); };

// Every animated story in the catalog must have a spec.
const catalog = fs.readFileSync(path.join(__dirname, '..', 'shared', 'catalog.js'), 'utf8');
const { PROBLEMS, PATTERNS } = new Function('const window = {};\n' + catalog + '\nreturn { PROBLEMS, PATTERNS };')();
global.PROBLEMS = PROBLEMS;
for (const p of PROBLEMS.filter((x) => x.animated)) if (!TEST_SPECS[p.id]) fail(p.id, 'animated story has no test spec');

const CMPS = ['exact', 'unordered', 'unordered-deep', 'float', 'any'];
const KINDS = [null, undefined, 'list', 'lists', 'cycle', 'tree', 'graph'];
const DIFFS = ['Starter', 'Easy', 'Medium', 'Hard'];
const GROUPS = PATTERNS.map((p) => p[0]).concat(['Trees', 'Graphs', 'Tries', 'Bit Manipulation', 'Math']);

function harness(code, fn, cases, io) {
  const out = [];
  const ctx = { console: {}, JSON, Math, Date, Array, Object, String, Number, Map, Set, Infinity, Error, Function };
  ctx.self = ctx;
  ctx.postMessage = (m) => out.push(m);
  vm.runInNewContext(jsWorkerSource(code, fn, cases, io), ctx, { timeout: 4000 });
  return out;
}

for (const [id, spec] of Object.entries(TEST_SPECS)) {
  const info = specInfo(id);
  if (!PROBLEMS.find((p) => p.id === id)) {
    if (!Array.isArray(spec.meta) || spec.meta.length !== 4) fail(id, 'not in the catalog, so it needs meta: [title, number, difficulty, pattern]');
    else if (typeof info.title !== 'string' || typeof info.n !== 'number' || !DIFFS.includes(info.diff) || !GROUPS.includes(info.pattern)) fail(id, 'bad meta ' + JSON.stringify(spec.meta));
  }
  for (const [lang] of CODE_LANGS) {
    if (!spec.sig || !spec.sig[lang]) fail(id, 'no ' + lang + ' signature');
    else if (!spec.sig[lang].includes(spec.fn)) fail(id, lang + ' signature does not name ' + spec.fn);
  }
  if (!CMPS.includes(spec.cmp)) fail(id, 'unknown comparator ' + spec.cmp);
  if (spec.cmp === 'any' && typeof spec.check !== 'function') fail(id, "cmp 'any' needs a check function");
  const io = spec.io || {};
  for (const k of (io.args || []).concat([io.ret])) if (!KINDS.includes(k)) fail(id, 'unknown io kind ' + k);
  if (io.design && (spec.params.length !== 2 || !spec.starter)) fail(id, 'design problems take [ops, args] and need starter code');
  if (!spec.ask) fail(id, 'no problem statement');
  if (!Array.isArray(spec.examples) || spec.examples.length !== 3) fail(id, 'needs exactly 3 visible examples');
  if (!Array.isArray(spec.hidden) || spec.hidden.length < 5) fail(id, 'needs 5 or more hidden cases');
  if (typeof spec.ref !== 'function') { fail(id, 'no JS reference'); continue; }
  const cases = spec.examples.concat(spec.hidden);
  const seen = new Set();
  cases.forEach(([args, want], i) => {
    if (!Array.isArray(args) || args.length !== spec.params.length) fail(id, 'case ' + i + ' has ' + (args && args.length) + ' args, wants ' + spec.params.length);
    const key = showValue(args);
    if (seen.has(key)) fail(id, 'duplicate case ' + key);
    seen.add(key);
    if (spec.cmp === 'any' && !judge(spec, args, want, want)) fail(id, 'the expected answer fails its own check for ' + key);
    let got;
    try { got = runRef(spec, args); } catch (e) { fail(id, 'reference throws on ' + key + ': ' + e.message); return; }
    if (!judge(spec, args, got, want)) fail(id, 'reference gives ' + showValue(got) + ' for ' + key + ', spec says ' + showValue(want));
  });
  // The JS starter must parse, and must fail the examples (it returns nothing yet).
  try { new Function(starterCode(spec, 'js')); } catch (e) { fail(id, 'JS starter does not parse: ' + e.message); }
  // Reference through the worker harness, written as a learner would (a declaration and a const).
  const src = spec.ref.toString();
  const asDecl = io.design ? 'class ' + spec.fn + ' ' + src.replace(/^class\s*/, '') : 'function ' + spec.fn + src.replace(/^function\s*/, '');
  const asConst = 'const ' + spec.fn + ' = ' + src + ';';
  for (const code of [asDecl, asConst]) {
    const msgs = harness(code, spec.fn, cases.map((c) => c[0]), spec.io);
    const got = msgs.filter((m) => m.type === 'case');
    if (got.length !== cases.length || msgs[msgs.length - 1].type !== 'done') { fail(id, 'harness did not finish: ' + JSON.stringify(msgs.slice(-1))); continue; }
    got.forEach((m) => { if (m.error || !judge(spec, cases[m.i][0], m.got, cases[m.i][1])) fail(id, 'harness case ' + m.i + ' failed: ' + (m.error || showValue(m.got))); });
  }
  const starterMsgs = harness(starterCode(spec, 'js'), spec.fn, spec.examples.map((c) => c[0]), spec.io);
  const passes = starterMsgs.filter((m) => m.type === 'case' && !m.error && !m.undef && judge(spec, spec.examples[m.i][0], m.got, spec.examples[m.i][1])).length;
  if (passes === spec.examples.length) fail(id, 'the empty starter already passes every example');
  console.log('✓', id.padEnd(36), spec.examples.length + ' examples, ' + spec.hidden.length + ' hidden, cmp ' + spec.cmp + (spec.io ? ', io ' + JSON.stringify(spec.io) : ''));
}
// The harness reports learner errors and console output.
const msgs = harness('function f(a) { console.log("hi", [a]); if (a > 1) throw new Error("boom"); return a; }', 'f', [[1], [2]]);
if (msgs[0].logs[0] !== 'hi [1]' || msgs[0].got !== 1 || !/boom/.test(msgs[1].error)) { bad++; console.log('  ✗ harness log/error capture', JSON.stringify(msgs)); }
if (harness('function g() {}', 'f', [[1]])[0].type !== 'fatal') { bad++; console.log('  ✗ harness should report a missing function'); }
// A learner may declare their own ListNode class without clashing with the provided one.
const own = harness('class ListNode { constructor(v, n) { this.val = v; this.next = n || null; } }\nfunction f(h) { return new ListNode(h.val * 2, h.next); }', 'f', [[[1, 2]]], { args: ['list'], ret: 'list' });
if (own[0].error || showValue(own[0].got) !== '[2,2]') { bad++; console.log('  ✗ learner-defined ListNode', JSON.stringify(own)); }
// Returning an original graph node is reported.
const orig = harness('function f(n) { return n; }', 'f', [[[[2], [1]]]], { args: ['graph'], ret: 'graph' });
if (!/original node/.test(orig[0].error || '')) { bad++; console.log('  ✗ graph copy check', JSON.stringify(orig)); }

// Python harness smoke test: the same encodings, run by the local Python if there is one.
// Each row: code, function name, the call's argument list, io, expected JSON.
const pyTests = [
  ['def f(head):\n    prev = None\n    while head:\n        head.next, prev, head = prev, head, head.next\n    return prev\n', 'f', [[1, 2, 3]], { args: ['list'], ret: 'list' }, [3, 2, 1]],
  ['def f(root):\n    if root: root.left, root.right = f(root.right), f(root.left)\n    return root\n', 'f', [[5, 3, 8, null, 4]], { args: ['tree'], ret: 'tree' }, [5, 8, 3, null, null, 4]],
  ['def f(node):\n    seen = {}\n    def c(n):\n        if n in seen: return seen[n]\n        seen[n] = Node(n.val)\n        seen[n].neighbors = [c(x) for x in n.neighbors]\n        return seen[n]\n    return c(node) if node else None\n', 'f', [[[2, 3], [1], [1]]], { args: ['graph'], ret: 'graph' }, [[2, 3], [1], [1]]],
  ['def f(node):\n    return node\n', 'f', [[[2], [1]]], { args: ['graph'], ret: 'graph' }, 'error'],
  ['def f(head):\n    s = q = head\n    while q and q.next:\n        s, q = s.next, q.next.next\n        if s is q: return True\n    return False\n', 'f', [[[1, 2, 3], 0]], { args: ['cycle'] }, true],
  ['def f(nums):\n    nums.sort()\n', 'f', [[3, 1, 2]], { inplace: 0 }, [1, 2, 3]],
  ['class C:\n    def __init__(self, k): self.k = k\n    def get(self, x): return x * self.k\n    def nop(self): pass\n', 'C', [['C', 'get', 'nop'], [[3], [4], []]], { design: true, ctor: true }, [null, 12, null]]
];
const py = ['python3', 'python'].find((cmd) => { try { return spawnSync(cmd, ['-c', 'import sys; sys.exit(0 if sys.version_info[0] == 3 else 1)']).status === 0; } catch (e) { return false; } });
if (!py) console.log('  (Python 3 not found: skipped the Python harness smoke test)');
else {
  const script = PY_HARNESS + '\nimport sys\nfor code, name, args, io in json.loads(sys.stdin.read()):\n    exec(code, globals())\n    try:\n        print(__run(json.dumps(args), name, json.dumps(io)))\n    except Exception as e:\n        print(json.dumps("error"))\n';
  const r = spawnSync(py, ['-c', script], { input: JSON.stringify(pyTests.map((t) => t.slice(0, 4))), encoding: 'utf8' });
  const lines = (r.stdout || '').trim().split(/\r?\n/);
  let pyBad = 0;
  pyTests.forEach((t, i) => {
    let got; try { got = JSON.parse(lines[i]); } catch (e) { got = undefined; }
    if (showValue(got) !== showValue(t[4])) { pyBad++; console.log('  ✗ Python harness case ' + i + ': ' + (lines[i] || r.stderr)); }
  });
  bad += pyBad;
  if (!pyBad) console.log('✓ Python harness: lists, trees, graphs, cycles, in-place and design classes');
}
console.log('Runnable tests: ' + Object.keys(TEST_SPECS).length + ' problems');
console.log(bad ? bad + ' problem(s)' : 'all specs pass');
if (bad) process.exitCode = 1;
