// @@RUNNER@@ — generated block (from shared/runner.js): runs learner code off the main thread.
// JavaScript runs in a Web Worker built from a Blob; Python runs in Pyodide inside another
// worker, loaded on demand from a pinned jsDelivr URL. Nothing here uses eval on the page.
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
const JS_TIME_LIMIT = 3000;
const PY_TIME_LIMIT = 5000;

// The worker script for one JavaScript run: a one-line prelude, the learner's code, then the
// harness. The prelude is one line so error line numbers are the learner's line + 1.
function jsWorkerSource(code, fn, cases) {
  const prelude = 'var __logs = []; (function () { var fmt = function (a) { if (typeof a === "string") return a; try { var s = JSON.stringify(a); return s === undefined ? String(a) : s; } catch (e) { return String(a); } }; var log = function () { if (__logs.length < 200) __logs.push(Array.prototype.map.call(arguments, fmt).join(" ")); }; console.log = console.info = console.warn = console.error = console.debug = log; ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "importScripts", "indexedDB", "caches"].forEach(function (k) { try { self[k] = undefined; } catch (e) {} }); })();';
  const harness = '\n;(function () {\n' +
    '  var __f = null; try { __f = (typeof ' + fn + ' === "function") ? ' + fn + ' : null; } catch (__e) {}\n' +
    '  if (!__f) { self.postMessage({ type: "fatal", error: "No function named ' + fn + ' was found. Keep the name from the starter code." }); return; }\n' +
    '  var __cases = ' + JSON.stringify(cases) + ';\n' +
    '  for (var __i = 0; __i < __cases.length; __i++) {\n' +
    '    __logs = []; var __t0 = Date.now();\n' +
    '    try { var __out = __f.apply(null, JSON.parse(JSON.stringify(__cases[__i]))); var __txt; try { __txt = JSON.stringify(__out); } catch (__e) { __txt = undefined; }\n' +
    '      self.postMessage({ type: "case", i: __i, got: __txt === undefined ? null : JSON.parse(__txt), undef: __out === undefined, logs: __logs, ms: Date.now() - __t0 }); }\n' +
    '    catch (__e) { self.postMessage({ type: "case", i: __i, error: (__e && __e.name ? __e.name + ": " : "") + (__e && __e.message ? __e.message : String(__e)), logs: __logs, ms: Date.now() - __t0 }); }\n' +
    '  }\n' +
    '  self.postMessage({ type: "done" });\n' +
    '})();\n';
  return prelude + '\n' + code + harness;
}

const PY_WORKER = [
  'var py = null, ready = null;',
  'function boot(url) {',
  '  if (!ready) ready = new Promise(function (ok, bad) {',
  '    try { importScripts(url + "pyodide.js"); } catch (e) { bad(new Error("Could not download Python. Check your connection.")); return; }',
  '    loadPyodide({ indexURL: url }).then(function (p) { py = p; ok(); }, bad);',
  '  });',
  '  return ready;',
  '}',
  'var HARNESS = "import json\\nfrom typing import *\\ndef __run(args_json, name):\\n    fn = globals().get(name)\\n    if not callable(fn):\\n        raise NameError(\\"No function named \\" + name + \\" was found. Keep the name from the starter code.\\")\\n    return json.dumps(fn(*json.loads(args_json)))\\n";',
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
  '      try { var txt = run(JSON.stringify(d.cases[i]), d.fn); self.postMessage({ type: "case", i: i, got: JSON.parse(txt), undef: false, logs: logs, ms: Date.now() - t0 }); }',
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
function runJs(code, fn, cases, onCase, onEnd) {
  let w, ended = false;
  const end = (r) => { if (ended) return; ended = true; clearTimeout(timer); killWorker(w); onEnd(r || {}); };
  try { w = blobWorker(jsWorkerSource(code, fn, cases)); } catch (e) { onEnd({ fatal: 'This browser blocked the code runner: ' + e.message }); return () => {}; }
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
function runPython(code, fn, cases, onCase, onEnd) {
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
    w.postMessage({ type: 'run', url: PYODIDE_URL, code, fn, cases });
  });
  return () => end({ cancelled: true });
}
function stopPython() { killWorker(PY.worker); PY.worker = null; PY.state = 'off'; PY.waiters = []; }
if (typeof module !== 'undefined' && module.exports) module.exports = { jsWorkerSource, JS_TIME_LIMIT };
// @@END-RUNNER@@
