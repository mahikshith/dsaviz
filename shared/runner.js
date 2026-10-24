// @@RUNNER@@ — generated block (from shared/runner.js): runs learner code off the main thread.
// JavaScript runs in a Web Worker built from a Blob; Python runs in Pyodide inside another
// worker, loaded on demand from a pinned jsDelivr URL. Nothing here uses eval on the page.
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
const JS_TIME_LIMIT = 3000;
const PY_TIME_LIMIT = 5000;

// Linked lists, trees and graphs travel as plain JSON and are turned into nodes here, in the
// same way in JavaScript (below) and Python (PY_HARNESS). The encodings are documented at the
// top of shared/tests_spec.js. Each node class is written on one line: the JS worker prelude
// must stay one line so error line numbers match the learner's code.
function __DsListNode(val, next) { this.val = val === undefined ? 0 : val; this.next = next === undefined ? null : next; }
function __DsTreeNode(val, left, right) { this.val = val === undefined ? 0 : val; this.left = left === undefined ? null : left; this.right = right === undefined ? null : right; }
function __DsNode(val, neighbors) { this.val = val === undefined ? 0 : val; this.neighbors = neighbors === undefined ? [] : neighbors; }
// Build the argument the learner receives from its JSON form. ctx collects what the reader needs later.
function __ioMake(kind, v, ctx, K) {
  if (kind === 'list') { var head = null; for (var i = v.length - 1; i >= 0; i--) head = new K.L(v[i], head); return head; }
  if (kind === 'lists') { var out = []; for (var j = 0; j < v.length; j++) out.push(__ioMake('list', v[j], ctx, K)); return out; }
  if (kind === 'cycle') {
    var nodes = []; for (var a = 0; a < v[0].length; a++) nodes.push(new K.L(v[0][a], null));
    for (var b = 0; b + 1 < nodes.length; b++) nodes[b].next = nodes[b + 1];
    if (v[1] >= 0 && nodes.length) nodes[nodes.length - 1].next = nodes[v[1]];
    return nodes.length ? nodes[0] : null;
  }
  if (kind === 'tree') {
    if (!v.length || v[0] === null) return null;
    var root = new K.T(v[0]), q = [root], k = 1;
    for (var h = 0; h < q.length && k < v.length; h++) {
      if (k < v.length && v[k] !== null) { q[h].left = new K.T(v[k]); q.push(q[h].left); } k++;
      if (k < v.length && v[k] !== null) { q[h].right = new K.T(v[k]); q.push(q[h].right); } k++;
    }
    return root;
  }
  if (kind === 'graph') {
    var g = []; for (var c = 0; c < v.length; c++) g.push(new K.G(c + 1, []));
    for (var d = 0; d < v.length; d++) for (var e = 0; e < v[d].length; e++) g[d].neighbors.push(g[v[d][e] - 1]);
    ctx.orig = g;
    return g.length ? g[0] : null;
  }
  return v;
}
// Turn what the learner returned back into JSON.
function __ioRead(kind, r, ctx) {
  if (kind === 'list') {
    var out = [], n = r, steps = 0;
    while (n) { if (++steps > 100000) throw new Error('The returned list never ends (it has a loop).'); out.push(n.val); n = n.next; }
    return out;
  }
  if (kind === 'tree') {
    if (!r) return [];
    var res = [], q = [r], seen = 0;
    for (var i = 0; i < q.length; i++) {
      if (++seen > 100000) throw new Error('The returned tree is too big or has a loop.');
      var t = q[i]; if (t === null) { res.push(null); continue; }
      res.push(t.val); q.push(t.left || null); q.push(t.right || null);
    }
    while (res.length && res[res.length - 1] === null) res.pop();
    return res;
  }
  if (kind === 'graph') {
    if (!r) return [];
    var orig = ctx.orig || [], byVal = {}, list = [r], max = 0;
    byVal[r.val] = r;
    for (var j = 0; j < list.length; j++) {
      if (orig.indexOf(list[j]) >= 0) throw new Error('Node ' + list[j].val + ' is an original node. Return a copy of every node.');
      max = Math.max(max, list[j].val);
      for (var m = 0; m < list[j].neighbors.length; m++) { var nb = list[j].neighbors[m]; if (!byVal[nb.val]) { byVal[nb.val] = nb; list.push(nb); } }
    }
    var adj = []; for (var x = 1; x <= max; x++) adj.push(byVal[x] ? byVal[x].neighbors.map(function (y) { return y.val; }) : []);
    return adj;
  }
  return r;
}
// Call fn (or construct a design class) with JSON args, the way the worker harness does.
function __ioCall(f, args, io, K) {
  io = io || {};
  if (io.design) {
    // With io.ctor the first op is the class name and its args go to the constructor.
    var first = io.ctor ? 1 : 0, obj = io.ctor ? new (Function.prototype.bind.apply(f, [null].concat(args[1][0])))() : new f(), outs = io.ctor ? [null] : [];
    for (var i = first; i < args[0].length; i++) {
      if (typeof obj[args[0][i]] !== 'function') throw new Error('The class has no method named ' + args[0][i] + '.');
      var o = obj[args[0][i]].apply(obj, args[1][i]); outs.push(o === undefined ? null : o);
    }
    return outs;
  }
  var kinds = io.args || [], ctx = {}, call = [];
  for (var a = 0; a < args.length; a++) call.push(__ioMake(kinds[a], args[a], ctx, K));
  var r = f.apply(null, call);
  if (typeof io.inplace === 'number') return __ioRead(kinds[io.inplace], call[io.inplace], ctx);
  if (r === undefined) return undefined;
  return __ioRead(io.ret, r, ctx);
}
const IO_NODES = { L: __DsListNode, T: __DsTreeNode, G: __DsNode };
function oneLine(f) { return f.toString().replace(/\n\s*/g, ' '); }

// The worker script for one JavaScript run: a one-line prelude, the learner's code, then the
// harness. The prelude is one line so error line numbers are the learner's line + 1.
function jsWorkerSource(code, fn, cases, io) {
  const prelude = 'var __logs = []; (function () { var fmt = function (a) { if (typeof a === "string") return a; try { var s = JSON.stringify(a); return s === undefined ? String(a) : s; } catch (e) { return String(a); } }; var log = function () { if (__logs.length < 200) __logs.push(Array.prototype.map.call(arguments, fmt).join(" ")); }; console.log = console.info = console.warn = console.error = console.debug = log; ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "importScripts", "indexedDB", "caches"].forEach(function (k) { try { self[k] = undefined; } catch (e) {} }); self.ListNode = ' + oneLine(__DsListNode) + '; self.TreeNode = ' + oneLine(__DsTreeNode) + '; self.Node = ' + oneLine(__DsNode) + '; self.__DsK = { L: self.ListNode, T: self.TreeNode, G: self.Node }; })();';
  const harness = '\n;(function () {\n' +
    '  var __f = null; try { __f = (typeof ' + fn + ' === "function") ? ' + fn + ' : null; } catch (__e) {}\n' +
    '  if (!__f) { self.postMessage({ type: "fatal", error: "No function named ' + fn + ' was found. Keep the name from the starter code." }); return; }\n' +
    '  var __cases = ' + JSON.stringify(cases) + ', __io = ' + JSON.stringify(io || null) + ';\n' +
    '  ' + __ioMake.toString() + '\n  ' + __ioRead.toString() + '\n  ' + __ioCall.toString() + '\n' +
    '  for (var __i = 0; __i < __cases.length; __i++) {\n' +
    '    __logs = []; var __t0 = Date.now();\n' +
    '    try { var __out = __ioCall(__f, JSON.parse(JSON.stringify(__cases[__i])), __io, self.__DsK); var __txt; try { __txt = JSON.stringify(__out); } catch (__e) { __txt = undefined; }\n' +
    '      self.postMessage({ type: "case", i: __i, got: __txt === undefined ? null : JSON.parse(__txt), undef: __out === undefined, logs: __logs, ms: Date.now() - __t0 }); }\n' +
    '    catch (__e) { self.postMessage({ type: "case", i: __i, error: (__e && __e.name ? __e.name + ": " : "") + (__e && __e.message ? __e.message : String(__e)), logs: __logs, ms: Date.now() - __t0 }); }\n' +
    '  }\n' +
    '  self.postMessage({ type: "done" });\n' +
    '})();\n';
  return prelude + '\n' + code + harness;
}

// The Python side of the harness: the same node classes and JSON encodings as above.
const PY_HARNESS = [
  'import json',
  'from typing import *',
  'class ListNode:',
  '    def __init__(self, val=0, next=None):',
  '        self.val = val',
  '        self.next = next',
  'class TreeNode:',
  '    def __init__(self, val=0, left=None, right=None):',
  '        self.val = val',
  '        self.left = left',
  '        self.right = right',
  'class Node:',
  '    def __init__(self, val=0, neighbors=None):',
  '        self.val = val',
  '        self.neighbors = neighbors if neighbors is not None else []',
  '_DsL, _DsT, _DsG = ListNode, TreeNode, Node',
  'def _ds_make(kind, v, ctx):',
  '    if kind == "list":',
  '        head = None',
  '        for x in reversed(v):',
  '            head = _DsL(x, head)',
  '        return head',
  '    if kind == "lists":',
  '        return [_ds_make("list", x, ctx) for x in v]',
  '    if kind == "cycle":',
  '        nodes = [_DsL(x) for x in v[0]]',
  '        for a, b in zip(nodes, nodes[1:]):',
  '            a.next = b',
  '        if v[1] >= 0 and nodes:',
  '            nodes[-1].next = nodes[v[1]]',
  '        return nodes[0] if nodes else None',
  '    if kind == "tree":',
  '        if not v or v[0] is None:',
  '            return None',
  '        root = _DsT(v[0])',
  '        q, k, h = [root], 1, 0',
  '        while h < len(q) and k < len(v):',
  '            if k < len(v) and v[k] is not None:',
  '                q[h].left = _DsT(v[k])',
  '                q.append(q[h].left)',
  '            k += 1',
  '            if k < len(v) and v[k] is not None:',
  '                q[h].right = _DsT(v[k])',
  '                q.append(q[h].right)',
  '            k += 1',
  '            h += 1',
  '        return root',
  '    if kind == "graph":',
  '        g = [_DsG(i + 1) for i in range(len(v))]',
  '        for i, row in enumerate(v):',
  '            g[i].neighbors = [g[j - 1] for j in row]',
  '        ctx["orig"] = set(id(x) for x in g)',
  '        ctx["keep"] = g',
  '        return g[0] if g else None',
  '    return v',
  'def _ds_read(kind, r, ctx):',
  '    if kind == "list":',
  '        out, n = [], r',
  '        while n is not None:',
  '            if len(out) > 100000:',
  '                raise ValueError("The returned list never ends (it has a loop).")',
  '            out.append(n.val)',
  '            n = n.next',
  '        return out',
  '    if kind == "tree":',
  '        if r is None:',
  '            return []',
  '        res, q, i = [], [r], 0',
  '        while i < len(q):',
  '            if i > 200000:',
  '                raise ValueError("The returned tree is too big or has a loop.")',
  '            t = q[i]',
  '            i += 1',
  '            if t is None:',
  '                res.append(None)',
  '                continue',
  '            res.append(t.val)',
  '            q.append(t.left)',
  '            q.append(t.right)',
  '        while res and res[-1] is None:',
  '            res.pop()',
  '        return res',
  '    if kind == "graph":',
  '        if r is None:',
  '            return []',
  '        orig, by, todo = ctx.get("orig", set()), {r.val: r}, [r]',
  '        for x in todo:',
  '            if id(x) in orig:',
  '                raise ValueError("Node " + str(x.val) + " is an original node. Return a copy of every node.")',
  '            for nb in x.neighbors:',
  '                if nb.val not in by:',
  '                    by[nb.val] = nb',
  '                    todo.append(nb)',
  '        return [[y.val for y in by[k].neighbors] if k in by else [] for k in range(1, max(by) + 1)]',
  '    return r',
  'def __run(args_json, name, io_json="null"):',
  '    fn = globals().get(name)',
  '    if not callable(fn):',
  '        raise NameError("No function named " + name + " was found. Keep the name from the starter code.")',
  '    args, io = json.loads(args_json), json.loads(io_json) or {}',
  '    if io.get("design"):',
  '        start = 1 if io.get("ctor") else 0',
  '        obj = fn(*args[1][0]) if start else fn()',
  '        outs = [None] * start',
  '        for op, a in zip(args[0][start:], args[1][start:]):',
  '            m = getattr(obj, op, None)',
  '            if not callable(m):',
  '                raise AttributeError("The class has no method named " + op + ".")',
  '            outs.append(m(*a))',
  '        return json.dumps(outs)',
  '    kinds, ctx = io.get("args") or [], {}',
  '    call = [_ds_make(kinds[i] if i < len(kinds) else None, a, ctx) for i, a in enumerate(args)]',
  '    r = fn(*call)',
  '    if isinstance(io.get("inplace"), int):',
  '        k = io["inplace"]',
  '        return json.dumps(_ds_read(kinds[k] if k < len(kinds) else None, call[k], ctx))',
  '    return json.dumps(_ds_read(io.get("ret"), r, ctx))',
  ''
].join('\n');

const PY_WORKER = [
  'var py = null, ready = null;',
  'function boot(url) {',
  '  if (!ready) ready = new Promise(function (ok, bad) {',
  '    try { importScripts(url + "pyodide.js"); } catch (e) { bad(new Error("Could not download Python. Check your connection.")); return; }',
  '    loadPyodide({ indexURL: url }).then(function (p) { py = p; ok(); }, bad);',
  '  });',
  '  return ready;',
  '}',
  'var HARNESS = ' + JSON.stringify(PY_HARNESS) + ';',
  'function tidy(msg) { var lines = String(msg).trim().split("\\n"); var at = ""; for (var i = 0; i < lines.length; i++) { var m = lines[i].match(/File "<exec>", line (\\d+)/); if (m) at = " (line " + m[1] + ")"; } return lines[lines.length - 1] + at; }',
  'self.onmessage = function (e) {',
  '  var d = e.data;',
  '  boot(d.url).then(function () {',
  '    if (d.type === "load") { self.postMessage({ type: "ready" }); return; }',
  '    var logs = [];',
  '    py.setStdout({ batched: function (s) { if (logs.length < 200) logs.push(s); } });',
  '    py.setStderr({ batched: function (s) { if (logs.length < 200) logs.push(s); } });',
  '    var ns = py.globals.get("dict")();',
  '    try { py.runPython(HARNESS, { globals: ns }); py.runPython(d.code, { globals: ns }); }',
  '    catch (err) { self.postMessage({ type: "fatal", error: tidy(err.message), logs: logs }); ns.destroy(); return; }',
  '    var run = ns.get("__run");',
  '    for (var i = 0; i < d.cases.length; i++) {',
  '      logs = []; var t0 = Date.now();',
  '      try { var txt = run(JSON.stringify(d.cases[i]), d.fn, JSON.stringify(d.io || null)); self.postMessage({ type: "case", i: i, got: JSON.parse(txt), undef: false, logs: logs, ms: Date.now() - t0 }); }',
  '      catch (err) { self.postMessage({ type: "case", i: i, error: tidy(err.message), logs: logs, ms: Date.now() - t0 }); }',
  '    }',
  '    run.destroy(); ns.destroy();',
  '    self.postMessage({ type: "done" });',
  '  }, function (err) { self.postMessage({ type: "loadfail", error: err && err.message ? err.message : String(err) }); });',
  '};'
].join('\n');

function canRunCode() { return typeof Worker !== 'undefined' && typeof Blob !== 'undefined' && typeof URL !== 'undefined' && !!URL.createObjectURL; }
function blobWorker(src) {
  const url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
  const w = new Worker(url);
  w.__url = url;
  return w;
}
function killWorker(w) { if (!w) return; try { w.terminate(); } catch (e) {} try { URL.revokeObjectURL(w.__url); } catch (e) {} }

// Run code against a list of argument arrays. Calls back with:
//   onCase(i, { got, undef, error, logs, ms }), then onEnd({ fatal, timeout, line })
// Returns a cancel function.
function runJs(code, fn, cases, onCase, onEnd, io) {
  let w, ended = false;
  const end = (r) => { if (ended) return; ended = true; clearTimeout(timer); killWorker(w); onEnd(r || {}); };
  try { w = blobWorker(jsWorkerSource(code, fn, cases, io)); } catch (e) { onEnd({ fatal: 'This browser blocked the code runner: ' + e.message }); return () => {}; }
  const timer = setTimeout(() => end({ timeout: true }), JS_TIME_LIMIT);
  w.onmessage = (e) => {
    const d = e.data || {};
    if (d.type === 'case') onCase(d.i, d);
    else if (d.type === 'fatal') end({ fatal: d.error });
    else if (d.type === 'done') end({});
  };
  w.onerror = (e) => {
    if (e.preventDefault) e.preventDefault();
    const line = e.lineno ? e.lineno - 1 : 0;
    end({ fatal: String(e.message || 'Your code could not run.').replace(/^Uncaught /, '') + (line > 0 ? ' (line ' + line + ')' : ''), line });
  };
  return () => end({ cancelled: true });
}

// Python keeps one worker alive between runs (Pyodide takes a few seconds to load).
const PY = { worker: null, state: 'off', waiters: [] };
function loadPython(onState) {
  if (PY.state === 'ready') { onState('ready'); return; }
  PY.waiters.push(onState);
  if (PY.state === 'loading') return;
  PY.state = 'loading';
  try { PY.worker = blobWorker(PY_WORKER); } catch (e) { PY.state = 'off'; PY.waiters.splice(0).forEach((f) => f('failed', 'This browser blocked the code runner.')); return; }
  PY.worker.onmessage = (e) => {
    const d = e.data || {};
    if (d.type === 'ready') { PY.state = 'ready'; PY.waiters.splice(0).forEach((f) => f('ready')); }
    else if (d.type === 'loadfail') { killWorker(PY.worker); PY.worker = null; PY.state = 'off'; PY.waiters.splice(0).forEach((f) => f('failed', d.error)); }
  };
  PY.worker.onerror = (e) => { if (e.preventDefault) e.preventDefault(); killWorker(PY.worker); PY.worker = null; PY.state = 'off'; PY.waiters.splice(0).forEach((f) => f('failed', 'Python could not start.')); };
  PY.worker.postMessage({ type: 'load', url: PYODIDE_URL });
}
function runPython(code, fn, cases, onCase, onEnd, io) {
  let ended = false, timer = null;
  const end = (r) => { if (ended) return; ended = true; clearTimeout(timer); onEnd(r || {}); };
  loadPython((state, msg) => {
    if (ended) return;
    if (state !== 'ready') { end({ fatal: msg || 'Python could not load.' }); return; }
    const w = PY.worker;
    timer = setTimeout(() => {
      // A runaway loop can only be stopped by killing the worker; Python reloads on the next run.
      killWorker(w); PY.worker = null; PY.state = 'off';
      end({ timeout: true });
    }, PY_TIME_LIMIT);
    w.onmessage = (e) => {
      const d = e.data || {};
      if (d.type === 'case') onCase(d.i, d);
      else if (d.type === 'fatal') end({ fatal: d.error, logs: d.logs });
      else if (d.type === 'done') end({});
    };
    w.postMessage({ type: 'run', url: PYODIDE_URL, code, fn, cases, io: io || null });
  });
  return () => end({ cancelled: true });
}
function stopPython() { killWorker(PY.worker); PY.worker = null; PY.state = 'off'; PY.waiters = []; }
if (typeof module !== 'undefined' && module.exports) module.exports = { jsWorkerSource, JS_TIME_LIMIT, PY_HARNESS, IO_NODES, __ioCall };
// @@END-RUNNER@@
