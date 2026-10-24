// @@SQL-PANE@@ — generated block (from shared/sql_pane.js): the Code page's SQL mode.
// Markup lives in shared/sql_pane.html (holes under {{sq.*}}); the schema panel's data comes from sq.tables.
// SQLite runs as sql.js (WebAssembly) inside a Blob worker, loaded on demand from a pinned jsDelivr URL, the
// way Pyodide is. Each dataset gets a fresh in-memory database: CREATE TABLE, INSERT, then the learner's SQL.
// Needs the @@SQL-SPEC@@ block, plus blobWorker/killWorker/canRunCode (@@RUNNER@@) and savedCode/storeCode (@@CODE-PANE@@).
const SQLJS_URL = 'https://cdn.jsdelivr.net/npm/sql.js@1.14.2/dist/';
const SQL_TIME_LIMIT = 4000;
const SQL_SHOW_ROWS = 50;
const SQL_WORKER = [
  'var SQL = null, ready = null;',
  'function boot(url) {',
  '  if (!ready) ready = new Promise(function (ok, bad) {',
  '    try { importScripts(url + "sql-wasm.js"); } catch (e) { bad(new Error("Could not download SQLite. Check your connection.")); return; }',
  '    initSqlJs({ locateFile: function (f) { return url + f; } }).then(function (s) { SQL = s; ok(); }, bad);',
  '  });',
  '  return ready;',
  '}',
  'var sqlExec = ' + sqlExec.toString() + ';',
  'self.onmessage = function (e) {',
  '  var d = e.data;',
  '  boot(d.url).then(function () {',
  '    if (d.type === "load") { self.postMessage({ type: "ready" }); return; }',
  '    for (var i = 0; i < d.sets.length; i++) { var t0 = Date.now(); var r = sqlExec(SQL, d.sets[i], d.query, d.after); self.postMessage({ type: "set", i: i, res: r, ms: Date.now() - t0 }); }',
  '    self.postMessage({ type: "done" });',
  '  }, function (err) { ready = null; self.postMessage({ type: "loadfail", error: err && err.message ? err.message : String(err) }); });',
  '};'
].join('\n');

// One SQLite worker stays alive between runs; a run that goes past the limit kills it.
const SQLW = { worker: null, state: 'off', waiters: [] };
function loadSql(onState) {
  if (SQLW.state === 'ready') { onState('ready'); return; }
  SQLW.waiters.push(onState);
  if (SQLW.state === 'loading') return;
  SQLW.state = 'loading';
  const fail = (msg) => { killWorker(SQLW.worker); SQLW.worker = null; SQLW.state = 'off'; SQLW.waiters.splice(0).forEach((f) => f('failed', msg)); };
  try { SQLW.worker = blobWorker(SQL_WORKER); } catch (e) { SQLW.worker = null; fail('This browser blocked the SQL runner.'); return; }
  SQLW.worker.onmessage = (e) => {
    const d = e.data || {};
    if (d.type === 'ready') { SQLW.state = 'ready'; SQLW.waiters.splice(0).forEach((f) => f('ready')); }
    else if (d.type === 'loadfail') fail(d.error || 'SQLite could not load.');
  };
  SQLW.worker.onerror = (e) => { if (e.preventDefault) e.preventDefault(); fail('SQLite could not start.'); };
  SQLW.worker.postMessage({ type: 'load', url: SQLJS_URL });
}
// Run query on each setup script. Calls onSet(i, { res, ms }) then onEnd({ fatal, timeout }). Returns a cancel function.
function runSql(setups, query, after, onSet, onEnd) {
  let ended = false, timer = null;
  const end = (r) => { if (ended) return; ended = true; clearTimeout(timer); onEnd(r || {}); };
  loadSql((state, msg) => {
    if (ended) return;
    if (state !== 'ready') { end({ fatal: msg || 'SQLite could not load.' }); return; }
    const w = SQLW.worker;
    timer = setTimeout(() => { killWorker(w); SQLW.worker = null; SQLW.state = 'off'; end({ timeout: true }); }, SQL_TIME_LIMIT);
    w.onmessage = (e) => {
      const d = e.data || {};
      if (d.type === 'set') onSet(d.i, d);
      else if (d.type === 'done') end({});
    };
    w.postMessage({ type: 'run', url: SQLJS_URL, sets: setups, query, after: after || null });
  });
  return () => end({ cancelled: true });
}

function sqlStarter(spec) {
  const names = sqlTables(spec).map((tb) => tb.name);
  if (spec.after) return '-- SQLite. Change the table ' + names[0] + ' with a DELETE.\n';
  return '-- SQLite. Tables: ' + names.join(', ') + '\nSELECT *\nFROM ' + names[0] + ';\n';
}
// Mark rows of a grid that appear in list (as a multiset), for the diff.
function sqlMarks(rows, list) {
  const left = {};
  list.forEach((r) => { const k = sqlRowKey(r); left[k] = (left[k] || 0) + 1; });
  return rows.map((r) => { const k = sqlRowKey(r); if (left[k]) { left[k]--; return true; } return false; });
}

class SqlRunner {
  constructor(host, pid) {
    this.host = host;
    this.pid = SQL_SPECS[pid] ? pid : Object.keys(SQL_SPECS)[0];
    this.s = { code: this.saved(), out: null, busy: false, status: '', rowsOpen: false, setOpen: false, copied: false, confirmReset: false };
    this.editor = null;
    this.el = null;
    this.ref = (el) => {
      if (el === this.el) return;
      if (this.editor) { this.editor.destroy(); this.editor = null; }
      this.el = el;
      if (el) setTimeout(() => this.mountEditor(), 0);
    };
  }
  spec() { return SQL_SPECS[this.pid]; }
  saved() { return savedCode(this.pid, 'sql') || sqlStarter(this.spec()); }
  set(patch) { Object.assign(this.s, patch); this.host.setState({}); }
  unmount() {
    clearTimeout(this.resetTimer); clearTimeout(this.copyTimer);
    this.stopRun();
    if (this.editor) { this.editor.destroy(); this.editor = null; }
    this.el = null;
  }
  mountEditor() {
    const el = this.el;
    if (!el || this.editor || typeof document === 'undefined' || !el.appendChild) return;
    const t = this.tokens || THEMES.max;
    const onChange = (code) => { this.s.code = code; storeCode(this.pid, 'sql', code); };
    try {
      if (!window.__dsEditor && typeof window.DS_EDITOR_LOAD === 'function') window.__dsEditor = window.DS_EDITOR_LOAD();
      if (window.__dsEditor) {
        this.editor = window.__dsEditor.create(el, { doc: this.s.code, lang: 'sql', theme: t, onChange, label: 'SQL editor', wrap: true, onRun: () => this.execute('run') });
        this.editorTheme = [t.codeBg, t.text, t.accent, t.mono].join('|');
        return;
      }
    } catch (e) { console.error(e); }
    const ta = document.createElement('textarea');
    ta.value = this.s.code; ta.spellcheck = false; ta.setAttribute('aria-label', 'SQL editor');
    const paint = (x) => { ta.style.cssText = 'width:100%;height:100%;box-sizing:border-box;border:0;resize:none;outline:none;padding:12px 16px;font:14px/1.65 ' + x.mono + ';background:' + x.codeBg + ';color:' + x.text; };
    paint(t);
    ta.addEventListener('input', () => onChange(ta.value));
    el.appendChild(ta);
    this.editor = { getDoc: () => ta.value, setDoc: (s) => { ta.value = s; }, setLanguage() {}, setTheme: paint, destroy: () => ta.remove() };
    this.editorTheme = [t.codeBg, t.text, t.accent, t.mono].join('|');
  }
  stopRun() { if (this.cancel) { const c = this.cancel; this.cancel = null; c(); } }
  // "Insert plan as comments": the plan's clause steps go on top of the query as -- lines.
  insertPlan(plan) {
    if (!plan) return;
    const now = this.editor ? this.editor.getDoc() : this.s.code;
    const code = insertPlanComments(now, plan, 'sql', '');
    if (code === now) return;
    if (this.editor) this.editor.setDoc(code);
    storeCode(this.pid, 'sql', code);
    this.set({ code });
  }
  setProblem(pid) {
    if (!SQL_SPECS[pid] || pid === this.pid) return;
    this.stopRun();
    this.pid = pid;
    const code = this.saved();
    if (this.editor) this.editor.setDoc(code);
    this.set({ code, out: null, busy: false, status: '', setOpen: false });
  }
  reset() {
    clearTimeout(this.resetTimer);
    if (!this.s.confirmReset) {
      this.set({ confirmReset: true });
      this.resetTimer = setTimeout(() => this.set({ confirmReset: false }), 3000);
      return;
    }
    this.stopRun();
    storeCode(this.pid, 'sql', null);
    const code = this.saved();
    if (this.editor) this.editor.setDoc(code);
    this.set({ confirmReset: false, code, out: null, busy: false, status: '' });
  }
  copy() {
    const code = this.editor ? this.editor.getDoc() : this.s.code;
    try { if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(code); } catch (e) {}
    clearTimeout(this.copyTimer);
    this.set({ copied: true });
    this.copyTimer = setTimeout(() => this.set({ copied: false }), 1500);
  }
  // Run: the visible dataset. Submit: every dataset, visible first.
  execute(mode) {
    if (this.s.busy) return;
    const spec = this.spec(), pid = this.pid;
    const query = this.editor ? this.editor.getDoc() : this.s.code;
    const idx = mode === 'submit' ? spec.sets.map((x, i) => i) : [0];
    if (!canRunCode()) { this.set({ out: { mode, idx, results: [], fatal: 'This browser cannot run SQL here.', done: true } }); return; }
    if (!query.replace(/--[^\n]*/g, '').trim()) { this.set({ out: { mode, idx, results: [], fatal: 'Write a query first.', done: true }, status: '' }); return; }
    const out = { mode, idx, results: [], fatal: null, timeout: false, done: false, t0: Date.now() };
    this.set({ busy: true, out, setOpen: false, status: SQLW.state !== 'ready' ? 'Loading SQLite… (first run only)' : 'Running…' });
    this.cancel = runSql(idx.map((i) => sqlSetup(spec, i)), query, spec.after,
      (k, r) => { out.results[k] = r; if (this.s.out === out) this.set({ status: 'Running…' }); },
      (end) => {
        if (this.s.out !== out) return;
        this.cancel = null;
        out.done = true; out.fatal = end.fatal || null; out.timeout = !!end.timeout;
        const passed = idx.filter((i, k) => out.results[k] && sqlJudge(spec, i, out.results[k].res).ok).length;
        const status = end.cancelled ? '' : end.timeout ? 'Stopped after ' + SQL_TIME_LIMIT / 1000 + ' seconds' : end.fatal ? 'Could not run'
          : (mode === 'run' ? (passed ? 'Matches' : out.results[0] && out.results[0].res.error ? 'Error' : 'Does not match') : passed + ' / ' + idx.length + ' passed') + ' · ' + (Date.now() - out.t0) + ' ms';
        if (mode === 'submit' && passed === idx.length && !end.fatal && !end.timeout && typeof DS !== 'undefined') DS.passCode(pid);
        this.set({ busy: false, status });
      });
  }

  // A result grid for the template: header cells, rows of cells, marked rows, and a note when rows were cut.
  grid(t, title, cols, rows, marks, markWord) {
    const fail = t.diff.Hard[2], shown = rows.slice(0, SQL_SHOW_ROWS);
    return {
      title, cols: cols.map((c) => ({ c })), empty: !rows.length, emptyText: 'No rows.',
      rows: shown.map((r, i) => {
        const m = !!(marks && marks[i]);
        return { bg: m ? t.warnBg : 'transparent', cells: r.map((v) => ({ v: sqlShow(v), fg: v === null || v === undefined ? t.muted : m ? fail : t.text })).concat(markWord ? [{ v: m ? markWord : '', fg: fail }] : []) };
      }),
      more: rows.length > shown.length, moreText: (rows.length - shown.length) + ' more rows not shown.',
      hasMark: !!markWord
    };
  }
  setLabel(i) { return i === 0 ? 'the visible dataset' : 'hidden dataset ' + i; }

  vals(t) {
    this.tokens = t;
    const tk = [t.codeBg, t.text, t.accent, t.mono].join('|');
    if (this.editor && this.editorTheme !== tk) { this.editorTheme = tk; Promise.resolve().then(() => this.editor && this.editor.setTheme(t)); }
    const s = this.s, spec = this.spec(), out = s.out, fail = t.diff.Hard[2];
    const tables = sqlTables(spec);
    const sample = (i) => tables.map((tb) => this.grid(t, tb.name, tb.cols.map((c) => c[0]), spec.sets[i].rows[tb.name] || []));
    let badge = '', badgeOk = false, msg = '', msgBg = t.sunk, msgMono = false, panels = [], failAt = -1;
    if (out) {
      if (out.fatal) { msg = out.fatal; msgBg = t.warnBg; msgMono = true; }
      else if (out.timeout) { msg = 'Your query ran past ' + SQL_TIME_LIMIT / 1000 + ' seconds and was stopped. Is a join missing its ON?'; msgBg = t.warnBg; }
      else if (!out.done) msg = out.mode === 'run' ? 'Running on the visible dataset…' : 'Running ' + out.idx.length + ' datasets…';
      else {
        const verdicts = out.idx.map((i, k) => (out.results[k] ? sqlJudge(spec, i, out.results[k].res) : { ok: false, why: 'Did not run.', missing: [], extra: [] }));
        const passed = verdicts.filter((v) => v.ok).length;
        failAt = verdicts.findIndex((v) => !v.ok);
        if (out.mode === 'run') { badge = passed ? 'Matches' : out.results[0] && out.results[0].res.error ? 'Error' : 'Does not match'; badgeOk = !!passed; }
        else { badge = passed + ' / ' + out.idx.length + ' datasets passed'; badgeOk = passed === out.idx.length; }
        if (failAt < 0) {
          const r = out.results[0].res;
          if (out.mode === 'run') { msg = 'Your result matches the expected rows' + (spec.order ? ', in order' : '') + '. Submit runs it on ' + (spec.sets.length - 1) + ' hidden datasets too.'; panels.push(this.grid(t, 'Your result · ' + r.values.length + ' row' + (r.values.length === 1 ? '' : 's'), r.columns, r.values)); }
          else msg = 'Accepted. Your query passed all ' + spec.sets.length + ' datasets, including ' + (spec.sets.length - 1) + ' hidden ones.';
          msgBg = t.okBg;
        } else {
          const i = out.idx[failAt], v = verdicts[failAt], r = out.results[failAt] ? out.results[failAt].res : null;
          const want = spec.sets[i].want;
          if (r && r.error) { msg = (out.mode === 'submit' ? 'Error on ' + this.setLabel(i) + ':\n' : '') + r.error; msgMono = true; }
          else {
            msg = (out.mode === 'submit' ? 'First failing: ' + this.setLabel(i) + '. ' : '') + v.why + (v.order ? ' Check your ORDER BY.' : '');
            if (r) panels.push(this.grid(t, 'Your result · ' + r.values.length + ' row' + (r.values.length === 1 ? '' : 's'), r.columns, r.values, v.cols ? null : sqlMarks(r.values, v.extra), v.extra.length ? 'not expected' : ''));
            panels.push(this.grid(t, 'Expected · ' + want.length + ' row' + (want.length === 1 ? '' : 's'), spec.cols, want, sqlMarks(want, v.missing), v.missing.length ? 'missing' : ''));
          }
          msgBg = t.warnBg;
          if (s.setOpen && i > 0) panels = panels.concat(sample(i).map((g) => Object.assign(g, { title: 'Hidden dataset ' + i + ' · ' + g.title })));
        }
      }
    }
    const failSet = out && out.done && failAt >= 0 ? out.idx[failAt] : 0;
    return {
      ref: this.ref,
      tables: tables.map((tb, k) => ({ name: tb.name, cols: tb.cols.map(([n, ty]) => ({ n, ty: ty.toLowerCase() })), grid: sample(0)[k] })),
      rowsOpen: s.rowsOpen, rowsClosed: !s.rowsOpen, rowsLabel: s.rowsOpen ? 'Hide sample rows' : 'Show sample rows',
      toggleRows: () => this.set({ rowsOpen: !s.rowsOpen }),
      tablesNote: 'Run uses these rows. Submit also tries ' + (spec.sets.length - 1) + ' hidden datasets with the same tables and different rows.',
      copy: () => this.copy(), copyLabel: s.copied ? 'Copied' : 'Copy',
      reset: () => this.reset(), resetLabel: s.confirmReset ? 'Click again to reset' : 'Reset', resetBorder: s.confirmReset ? t.accent : t.line,
      resetAria: s.confirmReset ? 'Click again to replace your query with the starter' : 'Reset to the starter query',
      busy: s.busy, run: () => this.execute('run'), submit: () => this.execute('submit'),
      statusText: s.status || (SQLW.state === 'ready' ? 'Runs in your browser' : 'SQLite loads on your first run'),
      statusColor: s.busy ? t.accent : t.muted,
      hasBadge: !!badge, badge, badgeBg: badgeOk ? t.okBg : t.warnBg, badgeFg: badgeOk ? t.ok : fail,
      hasMsg: !!msg, msg, msgBg, msgFont: msgMono ? t.mono : t.body,
      panels,
      canShowSet: failSet > 0, setLabel: (s.setOpen ? 'Hide' : 'Show') + ' hidden dataset ' + failSet + '\'s tables', setOpen: s.setOpen,
      toggleSet: () => this.set({ setOpen: !s.setOpen }),
      showHint: !out,
      hint: 'Run checks your query on the visible tables. Submit adds ' + (spec.sets.length - 1) + ' hidden datasets. Ctrl+Enter runs; in the editor, Esc then Tab moves focus on. Saved in this browser.'
    };
  }
}
// @@END-SQL-PANE@@
