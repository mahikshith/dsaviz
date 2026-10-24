// Check shared/tests_spec.js: every animated story and every master sheet row (SQL aside) has a complete spec, and the
// JavaScript reference solution passes every case. The references also run through the real worker harness
// (shared/runner.js) inside a Node vm, so the page's runner and its list/tree/graph encodings and its drivers
// (concurrency problems, round trips) are exercised too. If Python 3 is installed, the Python harness gets a
// smoke test as well.
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { spawnSync } = require('child_process');
const { TEST_SPECS, CODE_LANGS, RUNNABLE, starterCode, judge, runRefAsync, showValue, specInfo } = require('../shared/tests_spec.js');
const { jsWorkerSource, PY_HARNESS, JS_TIME_LIMIT } = require('../shared/runner.js');

let bad = 0;
const fail = (id, msg) => { bad++; console.log('  ✗', id, msg); };

// Every animated story in the catalog must have a spec, and so must every sheet row outside SQL.
const read = (...p) => fs.readFileSync(path.join(__dirname, '..', ...p), 'utf8');
const win = { localStorage: { getItem: () => null, setItem: () => {} } };
const { PROBLEMS, PATTERNS, SHEET, SHEET_GROUPS } = new Function('window', read('shared', 'catalog.js') + '\n' + read('shared', 'sheet.js') + '\nreturn { PROBLEMS, PATTERNS, SHEET, SHEET_GROUPS };')(win);
global.PROBLEMS = PROBLEMS;
for (const p of PROBLEMS.filter((x) => x.animated)) if (!TEST_SPECS[p.id]) fail(p.id, 'animated story has no test spec');
for (const r of SHEET.filter((x) => x.pattern !== 'SQL')) if (!TEST_SPECS[r.pid]) fail(r.id, 'sheet row has no test spec (' + r.pid + ')');

const CMPS = ['exact', 'unordered', 'unordered-deep', 'float', 'any'];
const KINDS = [null, undefined, 'list', 'lists', 'cycle', 'joined', 'rlist', 'tree', 'ntree', 'trees', 'tnode', 'listpos', 'graph', 'guess', 'badver', 'mountain'];
const DIFFS = ['Starter', 'Easy', 'Medium', 'Hard'];
const GROUPS = PATTERNS.map((p) => p[0]).concat(SHEET_GROUPS.map(([g]) => g), ['Math']);

// Run code through the worker harness in a vm. Resolves with the messages once the harness says done (or fails).
function harness(code, fn, cases, io, drive) {
  return new Promise((resolve) => {
    const out = [];
    let finished = false;
    const finish = () => { if (!finished) { finished = true; resolve(out); } };
    const ctx = { console: {}, JSON, Math, Date, Array, Object, String, Number, Map, Set, Infinity, Error, Function, Promise, setTimeout, clearTimeout };
    ctx.self = ctx;
    ctx.postMessage = (m) => { out.push(m); if (m.type === 'done' || m.type === 'fatal') finish(); };
    try { vm.runInNewContext(jsWorkerSource(code, fn, cases, io, drive), ctx, { timeout: 4000 }); } catch (e) { out.push({ type: 'fatal', error: e.message }); finish(); }
    setTimeout(finish, JS_TIME_LIMIT + 2000);
  });
}

(async () => {
  for (const [id, spec] of Object.entries(TEST_SPECS)) {
    const info = specInfo(id);
    if (!PROBLEMS.find((p) => p.id === id)) {
      if (!Array.isArray(spec.meta) || spec.meta.length !== 3) fail(id, 'not in the catalog, so it needs meta: [title, difficulty, sheet group]');
      else if (typeof info.title !== 'string' || !DIFFS.includes(info.diff) || !GROUPS.includes(info.pattern)) fail(id, 'bad meta ' + JSON.stringify(spec.meta));
    }
    for (const [lang] of CODE_LANGS) {
      if (!spec.sig || !spec.sig[lang]) fail(id, 'no ' + lang + ' signature');
      else if (!spec.sig[lang].includes(spec.fn)) fail(id, lang + ' signature does not name ' + spec.fn);
    }
    if (!CMPS.includes(spec.cmp)) fail(id, 'unknown comparator ' + spec.cmp);
    if (spec.cmp === 'any' && typeof spec.check !== 'function') fail(id, "cmp 'any' needs a check function");
    if (spec.langs && (!spec.langs.length || !spec.langs.every((l) => RUNNABLE[l]) || !spec.langNote)) fail(id, 'langs must name runnable languages and come with a langNote');
    if (spec.drive && typeof spec.drive !== 'function') fail(id, 'drive must be a function');
    if (spec.drive && !(spec.langs && !spec.langs.includes('py')) && !(spec.io && spec.io.pydrive)) fail(id, 'a JS driver needs io.pydrive, or langs without Python');
    const io = spec.io || {};
    for (const k of (io.args || []).concat([io.ret], io.ctorArgs || [])) if (!KINDS.includes(k)) fail(id, 'unknown io kind ' + k);
    if (io.design && (spec.params.length !== 2 || !spec.starter)) fail(id, 'design problems take [ops, args] and need starter code');
    if (!spec.ask) fail(id, 'no problem statement');
    if (/leetcode/i.test(JSON.stringify([spec.ask, spec.examples, spec.hidden, spec.langNote || '']))) fail(id, 'mentions an outside site');
    if (!Array.isArray(spec.examples) || spec.examples.length !== 3) fail(id, 'needs exactly 3 visible examples');
    if (!Array.isArray(spec.hidden) || spec.hidden.length < 5) fail(id, 'needs 5 or more hidden cases');
    if (typeof spec.ref !== 'function') { fail(id, 'no JS reference'); continue; }
    const cases = spec.examples.concat(spec.hidden);
    const seen = new Set();
    for (let i = 0; i < cases.length; i++) {
      const [args, want] = cases[i];
      if (!Array.isArray(args) || args.length !== spec.params.length) fail(id, 'case ' + i + ' has ' + (args && args.length) + ' args, wants ' + spec.params.length);
      const key = showValue(args);
      if (seen.has(key)) fail(id, 'duplicate case ' + key);
      seen.add(key);
      if (spec.cmp === 'any' && !judge(spec, args, want, want)) fail(id, 'the expected answer fails its own check for ' + key);
      let got;
      try { got = await runRefAsync(spec, args); } catch (e) { fail(id, 'reference throws on ' + key + ': ' + e.message); continue; }
      if (!judge(spec, args, got, want)) fail(id, 'reference gives ' + showValue(got) + ' for ' + key + ', spec says ' + showValue(want));
    }
    // The JS starter must parse, and must fail the examples (it returns nothing yet).
    try { new Function(starterCode(spec, 'js')); } catch (e) { fail(id, 'JS starter does not parse: ' + e.message); }
    // Reference through the worker harness, written as a learner would (a declaration and a const).
    const src = spec.ref.toString();
    const isClass = /^class\b/.test(src);
    const asDecl = isClass ? 'class ' + spec.fn + ' ' + src.replace(/^class\s*/, '') : /^async\s/.test(src) ? 'async function ' + spec.fn + src.replace(/^async\s+function\s*/, '') : 'function ' + spec.fn + src.replace(/^function\s*/, '');
    const asConst = 'const ' + spec.fn + ' = ' + src + ';';
    const drive = spec.drive ? spec.drive.toString() : null;
    for (const code of [asDecl, asConst]) {
      const msgs = await harness(code, spec.fn, cases.map((c) => c[0]), spec.io, drive);
      const got = msgs.filter((m) => m.type === 'case');
      if (got.length !== cases.length || msgs[msgs.length - 1].type !== 'done') { fail(id, 'harness did not finish: ' + JSON.stringify(msgs.slice(-1))); continue; }
      got.forEach((m) => { if (m.error || !judge(spec, cases[m.i][0], m.got, cases[m.i][1])) fail(id, 'harness case ' + m.i + ' failed: ' + (m.error || showValue(m.got))); });
    }
    const starterMsgs = await harness(starterCode(spec, 'js'), spec.fn, spec.examples.map((c) => c[0]), spec.io, drive);
    const passes = starterMsgs.filter((m) => m.type === 'case' && !m.error && !m.undef && judge(spec, spec.examples[m.i][0], m.got, spec.examples[m.i][1])).length;
    if (passes === spec.examples.length) fail(id, 'the empty starter already passes every example');
    console.log('✓', id.padEnd(36), spec.examples.length + ' examples, ' + spec.hidden.length + ' hidden, cmp ' + spec.cmp + (spec.io ? ', io ' + Object.keys(spec.io).join('/') : '') + (spec.drive ? ', driver' : ''));
  }
  // The harness reports learner errors and console output.
  const msgs = await harness('function f(a) { console.log("hi", [a]); if (a > 1) throw new Error("boom"); return a; }', 'f', [[1], [2]]);
  if (msgs[0].logs[0] !== 'hi [1]' || msgs[0].got !== 1 || !/boom/.test(msgs[1].error)) { bad++; console.log('  ✗ harness log/error capture', JSON.stringify(msgs)); }
  if ((await harness('function g() {}', 'f', [[1]]))[0].type !== 'fatal') { bad++; console.log('  ✗ harness should report a missing function'); }
  // A learner may declare their own ListNode class without clashing with the provided one.
  const own = await harness('class ListNode { constructor(v, n) { this.val = v; this.next = n || null; } }\nfunction f(h) { return new ListNode(h.val * 2, h.next); }', 'f', [[[1, 2]]], { args: ['list'], ret: 'list' });
  if (own[0].error || showValue(own[0].got) !== '[2,2]') { bad++; console.log('  ✗ learner-defined ListNode', JSON.stringify(own)); }
  // Returning an original graph node is reported.
  const orig = await harness('function f(n) { return n; }', 'f', [[[[2], [1]]]], { args: ['graph'], ret: 'graph' });
  if (!/original node/.test(orig[0].error || '')) { bad++; console.log('  ✗ graph copy check', JSON.stringify(orig)); }
  // A driver case that never finishes fails on its own and the next case still runs.
  const stuck = await harness('function f(x) { return x; }', 'f', [[1], [2]], null, '(f, args) => args[0] === 1 ? new Promise(() => {}) : f(args[0])');
  if (!/Still waiting/.test((stuck[0] || {}).error || '') || (stuck[1] || {}).got !== 2) { bad++; console.log('  ✗ stuck driver case', JSON.stringify(stuck)); }

  // Python harness smoke test: the same encodings, run by the local Python if there is one.
  // Each row: code, function name, the call's argument list, io, expected JSON.
  const pyTests = [
    ['def f(head):\n    prev = None\n    while head:\n        head.next, prev, head = prev, head, head.next\n    return prev\n', 'f', [[1, 2, 3]], { args: ['list'], ret: 'list' }, [3, 2, 1]],
    ['def f(root):\n    if root: root.left, root.right = f(root.right), f(root.left)\n    return root\n', 'f', [[5, 3, 8, null, 4]], { args: ['tree'], ret: 'tree' }, [5, 8, 3, null, null, 4]],
    ['def f(node):\n    seen = {}\n    def c(n):\n        if n in seen: return seen[n]\n        seen[n] = Node(n.val)\n        seen[n].neighbors = [c(x) for x in n.neighbors]\n        return seen[n]\n    return c(node) if node else None\n', 'f', [[[2, 3], [1], [1]]], { args: ['graph'], ret: 'graph' }, [[2, 3], [1], [1]]],
    ['def f(node):\n    return node\n', 'f', [[[2], [1]]], { args: ['graph'], ret: 'graph' }, 'error'],
    ['def f(head):\n    s = q = head\n    while q and q.next:\n        s, q = s.next, q.next.next\n        if s is q: return True\n    return False\n', 'f', [[[1, 2, 3], 0]], { args: ['cycle'] }, true],
    ['def f(nums):\n    nums.sort()\n', 'f', [[3, 1, 2]], { inplace: 0 }, [1, 2, 3]],
    ['class C:\n    def __init__(self, k): self.k = k\n    def get(self, x): return x * self.k\n    def nop(self): pass\n', 'C', [['C', 'get', 'nop'], [[3], [4], []]], { design: true, ctor: true }, [null, 12, null]],
    ['def f(a, b):\n    return b.next\n', 'f', [[1, 2, 3], [[9], 1]], { args: ['list', 'joined'], ret: 'listpos' }, 1],
    ['def f(h):\n    out, n = [], h\n    while n:\n        out.append(ListNode(n.val)); n = n.next\n    for i, x in enumerate(out):\n        x.next = out[i + 1] if i + 1 < len(out) else None\n        x.random = out[0]\n    return out[0] if out else None\n', 'f', [[[5, null], [6, 0]]], { args: ['rlist'], ret: 'rlist' }, [[5, 0], [6, 0]]],
    ['def f(r):\n    if r and r.left: r.left.next = r.right\n    return r\n', 'f', [[1, 2, 3]], { args: ['ntree'], ret: 'ntree' }, [1, '#', 2, 3, '#']],
    ['def f(r, t):\n    return t.val * 10\n', 'f', [[4, 2, 6], 6], { args: ['tree', 'tnode'] }, 60],
    ['def f(r):\n    return [r.left, r.right]\n', 'f', [[1, 2, 3]], { args: ['tree'], ret: 'trees' }, [[2], [3]]],
    ['def f(n, g):\n    lo, hi = 1, n\n    while True:\n        m = (lo + hi) // 2\n        r = g(m)\n        if r == 0: return m\n        if r < 0: hi = m - 1\n        else: lo = m + 1\n', 'f', [100, 37], { args: [null, 'guess'] }, 37],
    ['def f(a):\n    return a.get(1) + a.length()\n', 'f', [[1, 5, 2]], { args: ['mountain'] }, 8],
    ['def f(nums):\n    nums[0] = 9\n    return 2\n', 'f', [[1, 2, 3]], { keepFirst: 0 }, [2, [9, 2]]],
    ['class B:\n    def __init__(self, root): self.v = root.val\n    def get(self): return self.v\n', 'B', [['B', 'get'], [[[7, 1]], []]], { design: true, ctor: true, ctorArgs: ['tree'] }, [null, 7]],
    ['class Z:\n    def twice(self, x): return x * 2\n', 'Z', [21], { pydrive: 'def _ds_drive(cls, args):\n    return cls().twice(args[0])\n' }, 42]
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
    if (!pyBad) console.log('✓ Python harness: lists, joined lists, random pointers, trees, next pointers, graphs, cycles, oracles, in-place, keepFirst, drivers and design classes');
  }
  console.log('Runnable tests: ' + Object.keys(TEST_SPECS).length + ' problems');
  console.log(bad ? bad + ' problem(s)' : 'all specs pass');
  if (bad) process.exitCode = 1;
})();
