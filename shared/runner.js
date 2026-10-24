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
// Build the argument the learner receives from its JSON form. ctx collects what the reader needs later:
// ctx.lists (the nodes of each list built, in order), ctx.tree (the last tree built) and ctx.orig (original nodes).
function __ioMake(kind, v, ctx, K) {
  if (kind === 'list' || kind === 'cycle' || kind === 'joined') {
    var vals = kind === 'list' ? v : v[0], nodes = [];
    for (var a = 0; a < vals.length; a++) nodes.push(new K.L(vals[a], null));
    for (var b = 0; b + 1 < nodes.length; b++) nodes[b].next = nodes[b + 1];
    var tail = null;
    if (kind === 'cycle' && v[1] >= 0 && nodes.length) tail = nodes[v[1]];
    if (kind === 'joined' && v[1] >= 0) tail = ((ctx.lists || [])[0] || [])[v[1]] || null;
    if (tail) { if (nodes.length) nodes[nodes.length - 1].next = tail; else if (kind === 'joined') return tail; }
    (ctx.lists = ctx.lists || []).push(nodes);
    return nodes.length ? nodes[0] : null;
  }
  if (kind === 'lists') { var out = []; for (var j = 0; j < v.length; j++) out.push(__ioMake('list', v[j], ctx, K)); return out; }
  if (kind === 'rlist') {
    var rn = []; for (var ri = 0; ri < v.length; ri++) rn.push(new K.L(v[ri][0], null));
    for (var rj = 0; rj < rn.length; rj++) { rn[rj].next = rn[rj + 1] || null; rn[rj].random = v[rj][1] === null ? null : rn[v[rj][1]]; }
    ctx.orig = rn;
    return rn.length ? rn[0] : null;
  }
  if (kind === 'tree' || kind === 'ntree') {
    if (!v.length || v[0] === null) { ctx.tree = null; return null; }
    var root = new K.T(v[0]), q = [root], k = 1;
    for (var h = 0; h < q.length && k < v.length; h++) {
      if (k < v.length && v[k] !== null) { q[h].left = new K.T(v[k]); q.push(q[h].left); } k++;
      if (k < v.length && v[k] !== null) { q[h].right = new K.T(v[k]); q.push(q[h].right); } k++;
    }
    if (kind === 'ntree') for (var nt = 0; nt < q.length; nt++) q[nt].next = null;
    ctx.tree = root;
    return root;
  }
  if (kind === 'tnode') {
    var st = ctx.tree ? [ctx.tree] : [];
    while (st.length) { var x = st.pop(); if (x.val === v) return x; if (x.left) st.push(x.left); if (x.right) st.push(x.right); }
    return null;
  }
  if (kind === 'graph') {
    var g = []; for (var c = 0; c < v.length; c++) g.push(new K.G(c + 1, []));
    for (var d = 0; d < v.length; d++) for (var e = 0; e < v[d].length; e++) g[d].neighbors.push(g[v[d][e] - 1]);
    ctx.orig = g;
    return g.length ? g[0] : null;
  }
  // Hidden-answer helpers: a function or object the learner asks, which counts the questions.
  if (kind === 'guess' || kind === 'badver') {
    var asked = 0;
    return function (n) {
      if (++asked > 64) throw new Error('Asked more than 64 times. Halve the range on each question.');
      return kind === 'guess' ? (n > v ? -1 : n < v ? 1 : 0) : n >= v;
    };
  }
  if (kind === 'mountain') {
    var reads = 0;
    return { length: function () { return v.length; }, get: function (i) { if (++reads > 100) throw new Error('Called get more than 100 times.'); if (i < 0 || i >= v.length) throw new Error('get(' + i + ') is outside the array.'); return v[i]; } };
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
  if (kind === 'listpos') {
    if (!r) return -1;
    var at = ((ctx.lists || [])[0] || []).indexOf(r);
    if (at < 0) throw new Error('Return one of the nodes you were given (or null), not a new node.');
    return at;
  }
  if (kind === 'rlist') {
    var orig = ctx.orig || [], seenR = [], cur = r;
    while (cur) { if (seenR.length > 100000) throw new Error('The returned list never ends (it has a loop).'); if (orig.indexOf(cur) >= 0) throw new Error('Node ' + cur.val + ' is an original node. Return a copy of every node.'); seenR.push(cur); cur = cur.next; }
    return seenR.map(function (x) { if (x.random && seenR.indexOf(x.random) < 0) throw new Error('A random pointer leads outside the copied list.'); return [x.val, x.random ? seenR.indexOf(x.random) : null]; });
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
  if (kind === 'trees') { var all = []; for (var ti = 0; ti < (r || []).length; ti++) all.push(__ioRead('tree', r[ti], ctx)); return all; }
  if (kind === 'ntree') {
    // Walk each level along the next pointers; '#' ends a level.
    var outN = [], first = r, guard = 0;
    while (first) {
      var lead = null;
      for (var w = first; w; w = w.next) {
        if (++guard > 100000) throw new Error('The next pointers loop.');
        outN.push(w.val);
        if (!lead) lead = w.left || w.right || null;
      }
      outN.push('#');
      first = lead;
    }
    return outN;
  }
  if (kind === 'graph') {
    if (!r) return [];
    var origG = ctx.orig || [], byVal = {}, list = [r], max = 0;
    byVal[r.val] = r;
    for (var j = 0; j < list.length; j++) {
      if (origG.indexOf(list[j]) >= 0) throw new Error('Node ' + list[j].val + ' is an original node. Return a copy of every node.');
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
    var first = io.ctor ? 1 : 0, cargs = io.ctor ? args[1][0].slice() : [], cctx = {};
    for (var ci = 0; ci < cargs.length; ci++) cargs[ci] = __ioMake((io.ctorArgs || [])[ci], cargs[ci], cctx, K);
    var obj = io.ctor ? new (Function.prototype.bind.apply(f, [null].concat(cargs)))() : new f(), outs = io.ctor ? [null] : [];
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
  // keepFirst: k means the function returns a count n and the answer is [n, the first n items of argument k].
  if (typeof io.keepFirst === 'number') return [r, Array.isArray(call[io.keepFirst]) ? call[io.keepFirst].slice(0, r) : null];
  if (r === undefined) return undefined;
  return __ioRead(io.ret, r, ctx);
}
const IO_NODES = { L: __DsListNode, T: __DsTreeNode, G: __DsNode };
function oneLine(f) { return f.toString().replace(/\n\s*/g, ' '); }

// A driver (spec.drive) runs one case itself, for problems that are not one plain call: concurrency
// problems whose methods are called from several "threads" at once, or a class used in a round trip.
// It gets the learner's function or class, the case's JSON args and helpers H.make(kind, v, ctx) and
// H.read(kind, r, ctx), and returns the JSON answer or a Promise of it. A case that is still waiting
// after DRIVE_WAIT ms fails on its own, so one stuck case does not hide the rest.
const DRIVE_WAIT = 1000;
const DRIVE_STUCK = 'Still waiting after 1 second. Is a task waiting for a signal that never comes?';

// The worker script for one JavaScript run: a one-line prelude, the learner's code, then the
// harness. The prelude is one line so error line numbers are the learner's line + 1.
function jsWorkerSource(code, fn, cases, io, drive) {
  const prelude = 'var __logs = []; (function () { var fmt = function (a) { if (typeof a === "string") return a; try { var s = JSON.stringify(a); return s === undefined ? String(a) : s; } catch (e) { return String(a); } }; var log = function () { if (__logs.length < 200) __logs.push(Array.prototype.map.call(arguments, fmt).join(" ")); }; console.log = console.info = console.warn = console.error = console.debug = log; ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "importScripts", "indexedDB", "caches"].forEach(function (k) { try { self[k] = undefined; } catch (e) {} }); self.ListNode = ' + oneLine(__DsListNode) + '; self.TreeNode = ' + oneLine(__DsTreeNode) + '; self.Node = ' + oneLine(__DsNode) + '; self.__DsK = { L: self.ListNode, T: self.TreeNode, G: self.Node }; })();';
  const harness = '\n;(function () {\n' +
    '  var __f = null; try { __f = (typeof ' + fn + ' === "function") ? ' + fn + ' : null; } catch (__e) {}\n' +
    '  if (!__f) { self.postMessage({ type: "fatal", error: "No function named ' + fn + ' was found. Keep the name from the starter code." }); return; }\n' +
    '  var __cases = ' + JSON.stringify(cases) + ', __io = ' + JSON.stringify(io || null) + ';\n' +
    '  ' + __ioMake.toString() + '\n  ' + __ioRead.toString() + '\n  ' + __ioCall.toString() + '\n' +
    '  var __drive = ' + (drive || 'null') + ';\n' +
    '  var __H = { make: function (k, v, c) { return __ioMake(k, v, c || {}, self.__DsK); }, read: function (k, r, c) { return __ioRead(k, r, c || {}); } };\n' +
    '  function __ok(i, out, t0) { var txt; try { txt = JSON.stringify(out); } catch (e) { txt = undefined; } self.postMessage({ type: "case", i: i, got: txt === undefined ? null : JSON.parse(txt), undef: out === undefined, logs: __logs, ms: Date.now() - t0 }); }\n' +
    '  function __bad(i, e, t0) { self.postMessage({ type: "case", i: i, error: (e && e.name ? e.name + ": " : "") + (e && e.message ? e.message : String(e)), logs: __logs, ms: Date.now() - t0 }); }\n' +
    '  var __i = 0;\n' +
    '  function __next() {\n' +
    '    while (__i < __cases.length) {\n' +
    '      var i = __i++, t0 = Date.now(); __logs = [];\n' +
    '      if (__drive) {\n' +
    '        var p; try { p = Promise.resolve(__drive(__f, JSON.parse(JSON.stringify(__cases[i])), __H)); } catch (e) { __bad(i, e, t0); continue; }\n' +
    '        var stuck = new Promise(function (ok, no) { setTimeout(function () { no(new Error(' + JSON.stringify(DRIVE_STUCK) + ')); }, ' + DRIVE_WAIT + '); });\n' +
    '        Promise.race([p, stuck]).then(function (out) { __ok(i, out, t0); }, function (e) { __bad(i, e, t0); }).then(__next);\n' +
    '        return;\n' +
    '      }\n' +
    '      try { __ok(i, __ioCall(__f, JSON.parse(JSON.stringify(__cases[i])), __io, self.__DsK), t0); } catch (e) { __bad(i, e, t0); }\n' +
    '    }\n' +
    '    self.postMessage({ type: "done" });\n' +
    '  }\n' +
    '  __next();\n' +
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
  '    if kind in ("list", "cycle", "joined"):',
  '        vals = v if kind == "list" else v[0]',
  '        nodes = [_DsL(x) for x in vals]',
  '        for a, b in zip(nodes, nodes[1:]):',
  '            a.next = b',
  '        tail = None',
  '        if kind == "cycle" and v[1] >= 0 and nodes:',
  '            tail = nodes[v[1]]',
  '        if kind == "joined" and v[1] >= 0:',
  '            first = ctx.get("lists", [[]])[0]',
  '            tail = first[v[1]] if v[1] < len(first) else None',
  '        if tail is not None:',
  '            if nodes:',
  '                nodes[-1].next = tail',
  '            elif kind == "joined":',
  '                return tail',
  '        ctx.setdefault("lists", []).append(nodes)',
  '        return nodes[0] if nodes else None',
  '    if kind == "lists":',
  '        return [_ds_make("list", x, ctx) for x in v]',
  '    if kind == "rlist":',
  '        nodes = [_DsL(x[0]) for x in v]',
  '        for i, n in enumerate(nodes):',
  '            n.next = nodes[i + 1] if i + 1 < len(nodes) else None',
  '            n.random = None if v[i][1] is None else nodes[v[i][1]]',
  '        ctx["orig"] = set(id(x) for x in nodes)',
  '        ctx["keep"] = nodes',
  '        return nodes[0] if nodes else None',
  '    if kind in ("tree", "ntree"):',
  '        if not v or v[0] is None:',
  '            ctx["tree"] = None',
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
  '        if kind == "ntree":',
  '            for x in q:',
  '                x.next = None',
  '        ctx["tree"] = root',
  '        return root',
  '    if kind == "tnode":',
  '        st = [ctx["tree"]] if ctx.get("tree") else []',
  '        while st:',
  '            x = st.pop()',
  '            if x.val == v:',
  '                return x',
  '            st += [c for c in (x.left, x.right) if c]',
  '        return None',
  '    if kind == "graph":',
  '        g = [_DsG(i + 1) for i in range(len(v))]',
  '        for i, row in enumerate(v):',
  '            g[i].neighbors = [g[j - 1] for j in row]',
  '        ctx["orig"] = set(id(x) for x in g)',
  '        ctx["keep"] = g',
  '        return g[0] if g else None',
  '    if kind in ("guess", "badver"):',
  '        asked = [0]',
  '        def ask(n):',
  '            asked[0] += 1',
  '            if asked[0] > 64:',
  '                raise ValueError("Asked more than 64 times. Halve the range on each question.")',
  '            if kind == "badver":',
  '                return n >= v',
  '            return -1 if n > v else 1 if n < v else 0',
  '        return ask',
  '    if kind == "mountain":',
  '        class MountainArray:',
  '            reads = 0',
  '            def length(self):',
  '                return len(v)',
  '            def get(self, i):',
  '                MountainArray.reads += 1',
  '                if MountainArray.reads > 100:',
  '                    raise ValueError("Called get more than 100 times.")',
  '                if i < 0 or i >= len(v):',
  '                    raise IndexError("get(" + str(i) + ") is outside the array.")',
  '                return v[i]',
  '        return MountainArray()',
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
  '    if kind == "listpos":',
  '        if r is None:',
  '            return -1',
  '        first = ctx.get("lists", [[]])[0]',
  '        for i, x in enumerate(first):',
  '            if x is r:',
  '                return i',
  '        raise ValueError("Return one of the nodes you were given (or None), not a new node.")',
  '    if kind == "rlist":',
  '        orig, seen, n = ctx.get("orig", set()), [], r',
  '        while n is not None:',
  '            if len(seen) > 100000:',
  '                raise ValueError("The returned list never ends (it has a loop).")',
  '            if id(n) in orig:',
  '                raise ValueError("Node " + str(n.val) + " is an original node. Return a copy of every node.")',
  '            seen.append(n)',
  '            n = n.next',
  '        pos = {id(x): i for i, x in enumerate(seen)}',
  '        out = []',
  '        for x in seen:',
  '            rnd = getattr(x, "random", None)',
  '            if rnd is not None and id(rnd) not in pos:',
  '                raise ValueError("A random pointer leads outside the copied list.")',
  '            out.append([x.val, None if rnd is None else pos[id(rnd)]])',
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
  '    if kind == "trees":',
  '        return [_ds_read("tree", x, ctx) for x in (r or [])]',
  '    if kind == "ntree":',
  '        out, first, guard = [], r, 0',
  '        while first is not None:',
  '            lead, w = None, first',
  '            while w is not None:',
  '                guard += 1',
  '                if guard > 100000:',
  '                    raise ValueError("The next pointers loop.")',
  '                out.append(w.val)',
  '                if lead is None:',
  '                    lead = w.left or w.right',
  '                w = getattr(w, "next", None)',
  '            out.append("#")',
  '            first = lead',
  '        return out',
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
  '    if io.get("pydrive"):',
  '        env = {"_ds_make": _ds_make, "_ds_read": _ds_read, "json": json}',
  '        exec(io["pydrive"], env)',
  '        return json.dumps(env["_ds_drive"](fn, args))',
  '    if io.get("design"):',
  '        start = 1 if io.get("ctor") else 0',
  '        cctx, ckinds = {}, io.get("ctorArgs") or []',
  '        cargs = [_ds_make(ckinds[i] if i < len(ckinds) else None, a, cctx) for i, a in enumerate(args[1][0])] if start else []',
  '        obj = fn(*cargs) if start else fn()',
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
  '    if isinstance(io.get("keepFirst"), int):',
  '        k = io["keepFirst"]',
  '        return json.dumps([r, call[k][:r] if isinstance(call[k], list) and isinstance(r, int) else None])',
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
  '    py.setStdout({ batched: function (s) { if (logs.length < 500) logs.push(s); } });',
  '    py.setStderr({ batched: function (s) { if (logs.length < 500) logs.push(s); } });',
  '    var ns = py.globals.get("dict")();',
  '    if (d.program) {',
  '      try { py.runPython(HARNESS, { globals: ns }); py.runPython(d.prelude, { globals: ns }); py.runPython(d.code, { globals: ns }); }',
  '      catch (err) { self.postMessage({ type: "fatal", error: tidy(err.message), logs: logs }); ns.destroy(); return; }',
  '      ns.destroy(); self.postMessage({ type: "done", logs: logs }); return;',
  '    }',
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
function runJs(code, fn, cases, onCase, onEnd, io, drive) {
  let w, ended = false;
  const end = (r) => { if (ended) return; ended = true; clearTimeout(timer); killWorker(w); onEnd(r || {}); };
  try { w = blobWorker(jsWorkerSource(code, fn, cases, io, drive)); } catch (e) { onEnd({ fatal: 'This browser blocked the code runner: ' + e.message }); return () => {}; }
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
// Program mode (the Start here track): run a whole program and collect what it prints. No function is called.
// stdin is a list of lines; input() in Python and prompt() in JavaScript hand out the next one. Each answer is
// printed as PROGRAM_IN + question + PROGRAM_SEP + answer, so the page can show it like a terminal and leave it
// out when it compares output. The JS prelude stays one line and opens a try block, so error line numbers are
// the learner's line + 1, as in function mode.
const PROGRAM_IN = '\u0000in';
const PROGRAM_SEP = '\u0001';
const PROGRAM_NO_INPUT = 'EOFError: the program asked for more input than it was given. Add another line in the Input box.';
function jsProgramSource(code, stdin) {
  const prelude = 'var __logs = [], __in = ' + JSON.stringify((stdin || []).map(String)) + '; (function () { var fmt = function (a) { if (typeof a === "string") return a; if (a === undefined) return "undefined"; try { var s = JSON.stringify(a); return s === undefined ? String(a) : s; } catch (e) { return String(a); } }; var log = function () { if (__logs.length < 500) __logs.push(Array.prototype.map.call(arguments, fmt).join(" ")); }; console.log = console.info = console.warn = console.error = console.debug = log; ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "importScripts", "indexedDB", "caches"].forEach(function (k) { try { self[k] = undefined; } catch (e) {} }); self.prompt = function (q) { if (!__in.length) { var x = new Error(' + JSON.stringify(PROGRAM_NO_INPUT.replace(/^EOFError: /, '')) + '); x.name = "EOFError"; throw x; } var v = __in.shift(); __logs.push(' + JSON.stringify(PROGRAM_IN) + ' + (q == null ? "" : String(q)) + ' + JSON.stringify(PROGRAM_SEP) + ' + v); return v; }; })(); try {';
  const tail = '\n} catch (__e) { var __s = String((__e && __e.stack) || ""), __f = __s.split(String.fromCharCode(10)).filter(function (l) { return l.indexOf("blob:") >= 0 || l.indexOf("<anonymous>") >= 0; })[0] || "", __p = __f.replace(")", "").trim().split(":"), __n = Number(__p[__p.length - 2]); self.postMessage({ type: "fatal", error: (__e && __e.name ? __e.name + ": " : "") + (__e && __e.message ? __e.message : String(__e)) + (__n > 1 ? " (line " + (__n - 1) + ")" : ""), logs: __logs }); }\nself.postMessage({ type: "done", logs: __logs });\n';
  return prelude + '\n' + code + tail;
}
function pyProgramPrelude(stdin) {
  return ['__ds_in = ' + JSON.stringify((stdin || []).map(String)),
    'def input(prompt=""):',
    '    if not __ds_in:',
    '        raise EOFError(' + JSON.stringify(PROGRAM_NO_INPUT.replace(/^EOFError: /, '')) + ')',
    '    v = __ds_in.pop(0)',
    '    print(' + JSON.stringify(PROGRAM_IN) + ' + str(prompt) + ' + JSON.stringify(PROGRAM_SEP) + ' + v)',
    '    return v', ''].join('\n');
}
// Run a program. onEnd({ logs, fatal, timeout, cancelled }). Returns a cancel function.
function runProgram(lang, code, stdin, onEnd) {
  let ended = false, timer = null, w = null;
  const end = (r) => { if (ended) return; ended = true; clearTimeout(timer); if (lang !== 'py') killWorker(w); onEnd(r || {}); };
  if (lang !== 'py') {
    try { w = blobWorker(jsProgramSource(code, stdin)); } catch (e) { onEnd({ fatal: 'This browser blocked the code runner: ' + e.message }); return () => {}; }
    timer = setTimeout(() => end({ timeout: true }), JS_TIME_LIMIT);
    w.onmessage = (e) => { const d = e.data || {}; if (d.type === 'fatal') end({ fatal: d.error, logs: d.logs }); else if (d.type === 'done') end({ logs: d.logs }); };
    w.onerror = (e) => {
      if (e.preventDefault) e.preventDefault();
      const line = e.lineno ? e.lineno - 1 : 0;
      end({ fatal: String(e.message || 'Your code could not run.').replace(/^Uncaught /, '') + (line > 0 ? ' (line ' + line + ')' : ''), logs: [] });
    };
    return () => end({ cancelled: true });
  }
  loadPython((state, msg) => {
    if (ended) return;
    if (state !== 'ready') { end({ fatal: msg || 'Python could not load.' }); return; }
    const pw = PY.worker;
    timer = setTimeout(() => { killWorker(pw); PY.worker = null; PY.state = 'off'; end({ timeout: true }); }, PY_TIME_LIMIT);
    pw.onmessage = (e) => { const d = e.data || {}; if (d.type === 'fatal') end({ fatal: d.error, logs: d.logs }); else if (d.type === 'done') end({ logs: d.logs }); };
    pw.postMessage({ type: 'run', program: true, url: PYODIDE_URL, prelude: pyProgramPrelude(stdin), code, cases: [] });
  });
  return () => end({ cancelled: true });
}
// Printed lines without the echoed input answers, trimmed at the end of each line and of the whole output.
function programOutput(logs) {
  const lines = [];
  (logs || []).forEach((chunk) => String(chunk).split('\n').forEach((l) => { if (l.indexOf(PROGRAM_IN) !== 0) lines.push(l.replace(/\s+$/, '')); }));
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  return lines.join('\n');
}
function stopPython() { killWorker(PY.worker); PY.worker = null; PY.state = 'off'; PY.waiters = []; }
if (typeof module !== 'undefined' && module.exports) module.exports = { jsWorkerSource, JS_TIME_LIMIT, PY_HARNESS, IO_NODES, __ioCall, __ioMake, __ioRead, DRIVE_WAIT, DRIVE_STUCK, jsProgramSource, pyProgramPrelude, programOutput, PROGRAM_IN, PROGRAM_SEP };
// @@END-RUNNER@@
