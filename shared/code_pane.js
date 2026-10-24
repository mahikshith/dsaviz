// @@CODE-PANE@@ — generated block (from shared/code_pane.js): the self-contained code pane.
// Markup lives in shared/code_pane.html (holes under {{cr.*}}). A page uses it like this:
//   constructor:          this.runner = new CodeRunner(this, problemId, opts);
//     opts.starter(pid, lang)  starter code for a problem with no test spec yet (the pane then edits only)
//     opts.hideLangs / opts.hideClock  the host page draws its own language tabs or timer
//     opts.onResult(pid, mode, passed, total)  called when a Run or Submit finishes (the mock interview counts them)
//     opts.specs  where specs live (default TEST_SPECS); opts.langs  the language keys to offer (default all)
//     opts.single  one button (opts.runLabel, default 'Check') that runs every case and lists them; no Submit or custom input
//     opts.explain(message, lang)  a plain-words note shown under an error (the Start here track's error help)
//   Program specs ({ program: true, starter, cases: [{ stdin, out }] }) run the whole program (runProgram in runner.js)
//   and compare what it prints; with no cases, Run just shows the output, and opts.stdin() gives the input lines.
//   componentDidMount:    this.runner.mount();
//   componentWillUnmount: this.runner.unmount();
//   renderVals:           return { t, cr: this.runner.vals(t, themeKey), ... };
//   switching problem:    this.runner.setProblem(id);
// Needs the @@TESTS-SPEC@@ and @@RUNNER@@ blocks, plus readJSON/writeJSON from the catalog.
const CODE_KEY = 'dsaviz-code-v1';
const CODE_LANG_KEY = 'dsaviz-lang';
function loadCodeStore() { const v = readJSON(CODE_KEY, {}); return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; }
function savedCode(pid, lang) { const s = loadCodeStore(); return s[pid] && typeof s[pid][lang] === 'string' ? s[pid][lang] : null; }
function storeCode(pid, lang, code) {
  const s = loadCodeStore();
  s[pid] = Object.assign({}, s[pid]);
  if (code === null) delete s[pid][lang]; else s[pid][lang] = code;
  writeJSON(CODE_KEY, s);
}
const pad2 = (n) => String(n).padStart(2, '0');

class CodeRunner {
  constructor(host, pid, opts) {
    this.host = host;
    this.opts = opts || {};
    let lang = 'py';
    try { const l = window.localStorage.getItem(CODE_LANG_KEY); if (CODE_LANGS.some(([k]) => k === l)) lang = l; } catch (e) {}
    this.specs = this.opts.specs || TEST_SPECS;
    if (this.opts.langs && !this.opts.langs.includes(lang)) lang = this.opts.langs[0];
    this.pid = this.known(pid) ? pid : Object.keys(this.specs)[0];
    this.s = { lang, code: savedCode(this.pid, lang) || this.starter(lang), out: null, busy: false, status: '',
      custom: '', elapsed: 0, solvedIn: null, copied: false, confirmReset: false };
    this.editor = null;
    this.el = null;
    this.ref = (el) => {
      if (el === this.el) return;
      // The pane can be swapped out (the Code page's SQL mode) or leave and come back (the mock interview): always start a fresh editor on mount.
      if (this.editor) { this.editor.destroy(); this.editor = null; }
      this.el = el;
      if (el) setTimeout(() => this.mountEditor(), 0);
    };
  }
  set(patch) { Object.assign(this.s, patch); this.host.setState({}); }
  spec() { return this.specs[this.pid]; }
  known(pid) { return !!this.specs[pid] || (!!this.opts.starter && !!pid); }
  starter(lang) { const spec = this.spec(); return spec ? starterCode(spec, lang) : this.opts.starter ? this.opts.starter(this.pid, lang) : ''; }
  mount() { this.clock = setInterval(() => { if (this.s.solvedIn === null) this.set({ elapsed: this.s.elapsed + 1 }); }, 1000); }
  unmount() {
    clearInterval(this.clock); clearTimeout(this.resetTimer); clearTimeout(this.copyTimer);
    this.stopRun();
    if (this.editor) { this.editor.destroy(); this.editor = null; }
  }

  // The CodeMirror bundle is wrapped in DS_EDITOR_LOAD by the site build and only runs here.
  // Without it (the design canvas, an old browser) a plain textarea stands in.
  mountEditor() {
    const el = this.el;
    if (!el || this.editor || typeof document === 'undefined' || !el.appendChild) return;
    const t = this.tokens || THEMES.max;
    const onChange = (code) => { this.s.code = code; storeCode(this.pid, this.s.lang, code); };
    try {
      if (!window.__dsEditor && typeof window.DS_EDITOR_LOAD === 'function') window.__dsEditor = window.DS_EDITOR_LOAD();
      if (window.__dsEditor) { this.editor = window.__dsEditor.create(el, { doc: this.s.code, lang: this.s.lang, theme: t, onChange }); this.editorTheme = [t.codeBg, t.text, t.accent, t.mono].join('|'); return; }
    } catch (e) { console.error(e); }
    const ta = document.createElement('textarea');
    ta.value = this.s.code; ta.spellcheck = false; ta.setAttribute('aria-label', 'Code editor');
    const paint = (x) => { ta.style.cssText = 'width:100%;height:100%;box-sizing:border-box;border:0;resize:none;outline:none;padding:12px 16px;tab-size:4;font:14px/1.65 ' + x.mono + ';background:' + x.codeBg + ';color:' + x.text; };
    paint(t);
    ta.addEventListener('input', () => onChange(ta.value));
    el.appendChild(ta);
    this.editor = { getDoc: () => ta.value, setDoc: (s) => { ta.value = s; }, setLanguage() {}, setTheme: paint, destroy: () => ta.remove() };
    this.editorTheme = [t.codeBg, t.text, t.accent, t.mono].join('|');
  }
  showCode() {
    const code = savedCode(this.pid, this.s.lang) || this.starter(this.s.lang);
    if (this.editor) { this.editor.setLanguage(this.s.lang); this.editor.setDoc(code); }
    return code;
  }
  stopRun() { if (this.cancel) { const c = this.cancel; this.cancel = null; c(); } }
  setProblem(pid) {
    if (!this.known(pid) || pid === this.pid) return;
    this.stopRun();
    this.pid = pid;
    this.set({ code: this.showCode(), out: null, busy: false, status: '', custom: '', elapsed: 0, solvedIn: null });
  }
  setLang(lang) {
    if (lang === this.s.lang) return;
    this.stopRun();
    if (this.opts.langs && !this.opts.langs.includes(lang)) return;
    try { window.localStorage.setItem(CODE_LANG_KEY, lang); } catch (e) {}
    this.s.lang = lang;
    this.set({ code: this.showCode(), out: null, busy: false, status: '' });
  }
  // Reset throws away the learner's code, so the first click only arms it for 3 seconds.
  reset() {
    clearTimeout(this.resetTimer);
    if (!this.s.confirmReset) {
      this.set({ confirmReset: true });
      this.resetTimer = setTimeout(() => this.set({ confirmReset: false }), 3000);
      return;
    }
    this.stopRun();
    storeCode(this.pid, this.s.lang, null);
    this.set({ confirmReset: false, code: this.showCode(), out: null, busy: false, status: '' });
  }
  copy() {
    const code = this.editor ? this.editor.getDoc() : this.s.code;
    try { if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(code); } catch (e) {}
    clearTimeout(this.copyTimer);
    this.set({ copied: true });
    this.copyTimer = setTimeout(() => this.set({ copied: false }), 1500);
  }
  // Custom input is written like the call's arguments: [3, 8, 1], 9
  customCase() {
    const spec = this.spec();
    const text = this.s.custom.trim();
    if (!text) return null;
    if (spec.drive) return { error: 'Custom input is off for this problem: its tests start several tasks at once. Run checks the examples.' };
    let args;
    try { args = JSON.parse('[' + text + ']'); } catch (e) { return { error: 'Custom input should look like the arguments of a call, in JSON: ' + spec.examples[0][0].map(showValue).join(', ') + '. Strings need double quotes.' }; }
    if (args.length !== spec.params.length) return { error: 'Custom input needs ' + spec.params.length + ' value' + (spec.params.length > 1 ? 's' : '') + ': ' + spec.params.join(', ') + '.' };
    let want;
    try { want = runRef(spec, args); } catch (e) { return { error: 'That custom input is outside what this problem allows.' }; }
    return { args, want };
  }
  passCount(out) {
    const spec = this.spec();
    if (out.program) return out.cases.filter((c, i) => { const r = out.results[i]; return r && !r.error && c.out !== undefined && r.got === programOutput([String(this.wantOut(c))]); }).length;
    return out.cases.filter((c, i) => { const r = out.results[i]; return r && !r.error && !r.undef && judge(spec, c[0], r.got, c[1]); }).length;
  }
  // A whole program: run it once per case (or once with the page's input lines) and compare what it prints.
  executeProgram() {
    const spec = this.spec(), lang = this.s.lang;
    const code = this.editor ? this.editor.getDoc() : this.s.code;
    const cases = spec.cases && spec.cases.length ? spec.cases : [{ stdin: this.opts.stdin ? this.opts.stdin() : [] }];
    const out = { mode: 'program', program: true, cases, titles: cases.map((c, i) => (spec.cases && spec.cases.length ? 'Test ' + (i + 1) : 'Output')), results: [], fatal: null, timeout: false, done: false, t0: Date.now() };
    if (!canRunCode()) { this.set({ out: Object.assign(out, { fatal: 'This browser cannot run code here.', done: true }) }); return; }
    const loading = lang === 'py' && PY.state !== 'ready';
    this.set({ busy: true, out, status: loading ? 'Loading Python… (first run only)' : 'Running…' });
    let i = 0;
    const next = () => {
      if (this.s.out !== out) return;
      if (i >= cases.length) {
        this.cancel = null; out.done = true;
        const passed = this.passCount(out);
        const graded = !!(spec.cases && spec.cases.length);
        if (this.opts.onResult) { try { this.opts.onResult(this.pid, 'program', passed, graded ? cases.length : 0); } catch (e) {} }
        this.set({ busy: false, status: graded ? passed + ' / ' + cases.length + ' passed' : 'Done in ' + (Date.now() - out.t0) + ' ms' });
        return;
      }
      const k = i++;
      this.cancel = runProgram(lang, code, cases[k].stdin || [], (end) => {
        if (this.s.out !== out || end.cancelled) return;
        out.results[k] = { logs: end.logs || [], got: programOutput(end.logs), error: end.fatal || null, timeout: !!end.timeout };
        if (end.timeout) { out.timeout = true; i = cases.length; }
        this.set({});
        next();
      });
    };
    next();
  }
  wantOut(c) { const w = c.out; return w && typeof w === 'object' ? (w[this.s.lang] !== undefined ? w[this.s.lang] : w.py) : w; }
  execute(mode) {
    if (this.s.busy) return;
    const spec = this.spec(), lang = this.s.lang;
    if (!spec || !specRuns(spec, lang)) return;
    if (spec.program) { this.executeProgram(); return; }
    if (this.opts.single) mode = 'all';
    const code = this.editor ? this.editor.getDoc() : this.s.code;
    let cases = mode === 'submit' || mode === 'all' ? spec.examples.concat(spec.hidden || []) : spec.examples.slice();
    const titles = cases.map((c, i) => (mode === 'all' ? 'Test ' + (i + 1) : i < spec.examples.length ? 'Example ' + (i + 1) : 'Hidden ' + (i - spec.examples.length + 1)));
    if (mode === 'run') {
      const cc = this.customCase();
      if (cc && cc.error) { this.set({ out: { mode, results: [], fatal: cc.error, cases: [], titles: [], done: true }, status: '' }); return; }
      if (cc) { cases = cases.concat([[cc.args, cc.want]]); titles.push('Custom'); }
    }
    if (!canRunCode()) { this.set({ out: { mode, results: [], fatal: 'This browser cannot run code here. Copy it to your IDE for now.', cases, titles, done: true } }); return; }
    const out = { mode, cases, titles, results: [], fatal: null, timeout: false, done: false, t0: Date.now() };
    const loading = lang === 'py' && PY.state !== 'ready';
    this.set({ busy: true, out, status: loading ? 'Loading Python… (first run only)' : 'Running…' });
    this.cancel = (lang === 'py' ? runPython : runJs)(code, spec.fn, cases.map((c) => c[0]),
      (i, r) => { out.results[i] = r; if (this.s.out === out) this.set({ status: 'Running…' }); },
      (end) => {
        if (this.s.out !== out) return;
        this.cancel = null;
        out.done = true; out.fatal = end.fatal || null; out.timeout = !!end.timeout;
        const passed = this.passCount(out);
        const limit = (lang === 'py' ? PY_TIME_LIMIT : JS_TIME_LIMIT) / 1000;
        const status = end.cancelled ? '' : end.timeout ? 'Stopped after ' + limit + ' seconds' : end.fatal ? 'Could not run' : passed + ' / ' + cases.length + ' passed · ' + (Date.now() - out.t0) + ' ms';
        const solved = (mode === 'submit' || mode === 'all') && passed === cases.length && this.s.solvedIn === null;
        if (solved && mode === 'submit' && typeof DS !== 'undefined') DS.passCode(this.pid);
        if (this.opts.onResult && !end.cancelled) { try { this.opts.onResult(this.pid, mode, end.fatal || end.timeout ? 0 : passed, cases.length); } catch (e) {} }
        this.set({ busy: false, status, solvedIn: solved ? this.s.elapsed : this.s.solvedIn });
      }, spec.io, lang === 'js' && spec.drive ? spec.drive.toString() : null);
  }

  vals(t) {
    this.tokens = t;
    const tk = [t.codeBg, t.text, t.accent, t.mono].join('|');
    if (this.editor && this.editorTheme !== tk) { this.editorTheme = tk; Promise.resolve().then(() => this.editor && this.editor.setTheme(t)); }
    const s = this.s, spec = this.spec(), lang = s.lang;
    const out = spec ? s.out : null;
    const hasTests = !!spec;
    const runnable = hasTests && specRuns(spec, lang);
    const fail = t.diff.Hard[2];
    const limit = (lang === 'py' ? PY_TIME_LIMIT : JS_TIME_LIMIT) / 1000;
    let rows = [], badge = '', badgeOk = false, msg = '', msgBg = t.sunk, msgMono = false, consoleLines = [], help = '';
    const graded = !!(spec && spec.program && spec.cases && spec.cases.length);
    const showLog = (logs) => programLines(logs, t);
    if (out && out.program) {
      const passed = this.passCount(out), total = out.cases.length;
      const errs = out.results.filter((r) => r && r.error).map((r) => r.error);
      if (out.fatal) { msg = out.fatal; msgBg = t.warnBg; msgMono = true; }
      else if (out.timeout) msg = 'Your program ran past ' + limit + ' seconds and was stopped. Is there a loop that never ends?';
      const err = out.fatal || errs[0] || (out.timeout ? 'Timeout' : '');
      if (err && this.opts.explain) help = this.opts.explain(err, lang) || '';
      if (!graded) {
        const r = out.results[0];
        if (r) { consoleLines = showLog(r.logs); if (r.error) consoleLines.push({ text: r.error, fg: fail, weight: 700 }); }
        if (r && !r.error && !consoleLines.length && out.done) consoleLines = [{ text: '(nothing was printed)', fg: t.muted, weight: 400 }];
      } else {
        rows = out.cases.map((c, i) => {
          const r = out.results[i];
          const want = programOutput([String(this.wantOut(c))]);
          const ok = !!r && !r.error && r.got === want;
          return {
            title: out.titles[i], input: c.stdin && c.stdin.length ? c.stdin.join(' ⏎ ') : 'no input', expected: want || '(nothing)', failed: !ok,
            got: !r ? (out.done ? 'did not run' : '…') : r.error ? r.error : r.got || '(nothing was printed)',
            mark: !r ? '·' : ok ? '✓' : '✗', verdict: !r ? (out.done ? 'Skipped' : 'Running') : ok ? 'Passed' : r.error ? 'Error' : 'Different output',
            markColor: !r ? t.muted : ok ? t.ok : fail, gotColor: ok ? t.text : fail, border: ok || !r ? t.line : fail, hasLogs: false, logs: ''
          };
        });
        if (out.done && !out.fatal) { badge = passed + ' / ' + total + ' passed'; badgeOk = passed === total; }
      }
    } else if (out) {
      const passed = this.passCount(out), total = out.cases.length;
      if (out.fatal) { msg = out.fatal; msgBg = t.warnBg; msgMono = true; }
      else if (out.timeout) msg = 'Your code ran past ' + limit + ' seconds and was stopped. Is there a loop that never ends?';
      const firstErr = out.fatal || (out.results.find((r) => r && r.error) || {}).error || (out.timeout ? 'Timeout' : '');
      if (firstErr && this.opts.explain) help = this.opts.explain(firstErr, lang) || '';
      if (out.mode === 'run' || out.mode === 'all') {
        rows = out.cases.map(([args, want], i) => {
          const r = out.results[i];
          const ok = !!r && !r.error && !r.undef && judge(spec, args, r.got, want);
          return {
            title: out.titles[i], input: showArgs(spec, args), expected: showValue(want) + (spec.cmp === 'any' ? '  (one valid answer)' : ''), failed: !ok,
            got: !r ? (out.done ? 'did not run' : '…') : r.error ? r.error : r.undef ? 'nothing (did you forget to return?)' : showValue(r.got),
            mark: !r ? '·' : ok ? '✓' : '✗', verdict: !r ? (out.done ? 'Skipped' : 'Running') : ok ? 'Passed' : r.error ? 'Error' : 'Wrong answer',
            markColor: !r ? t.muted : ok ? t.ok : fail, gotColor: ok ? t.text : fail, border: ok || !r ? t.line : fail,
            hasLogs: !!(r && r.logs && r.logs.length), logs: r && r.logs ? r.logs.join('\n') : ''
          };
        }).filter((row, i) => out.results[i] || !out.done || !out.fatal);
        if (out.done && !out.fatal) { badge = passed + ' / ' + total + ' passed'; badgeOk = passed === total; }
      } else if (out.done) {
        badge = passed + ' / ' + total + ' tests passed'; badgeOk = passed === total;
        if (!out.fatal) {
          const firstBad = out.cases.findIndex((c, i) => { const r = out.results[i]; return !(r && !r.error && !r.undef && judge(spec, c[0], r.got, c[1])); });
          if (firstBad < 0) msg = 'Accepted. Every test passed, including ' + spec.hidden.length + ' hidden ones' + (s.solvedIn !== null ? ', in ' + pad2(Math.floor(s.solvedIn / 60)) + ':' + pad2(s.solvedIn % 60) : '') + '.';
          else msg = (msg ? msg + '\n\n' : '') + 'First failing input:\n' + showArgs(spec, out.cases[firstBad][0]);
          msgBg = firstBad < 0 ? t.okBg : t.warnBg; msgMono = firstBad >= 0;
        }
      } else msg = 'Running ' + total + ' tests…';
    }
    const solved = s.solvedIn !== null;
    const clock = pad2(Math.floor(s.elapsed / 60)) + ':' + pad2(s.elapsed % 60);
    return {
      ref: this.ref,
      showLangs: !this.opts.hideLangs, showClock: !this.opts.hideClock, hasTests, noTests: !hasTests, elapsed: s.elapsed,
      langs: CODE_LANGS.filter(([k]) => !this.opts.langs || this.opts.langs.includes(k)).map(([k, label]) => ({ label: label === 'JavaScript' ? 'JS' : label, on: lang === k, bg: lang === k ? t.text : 'transparent', fg: lang === k ? t.bg : t.muted, pick: () => this.setLang(k) })),
      clock, clockLabel: (solved ? 'Solved in ' : 'Time on this problem: ') + clock, clockFg: solved ? t.ok : t.muted,
      copy: () => this.copy(), copyLabel: s.copied ? 'Copied' : 'Copy',
      reset: () => this.reset(), resetLabel: s.confirmReset ? 'Click again to reset' : 'Reset', resetBorder: s.confirmReset ? t.accent : t.line,
      resetAria: s.confirmReset ? 'Click again to replace your code with the starter code' : 'Reset to the starter code',
      runnable, notRunnable: hasTests && !runnable, busy: s.busy,
      notRunnableMsg: hasTests && spec.langs && RUNNABLE[lang] ? spec.langNote || 'This one runs in ' + spec.langs.map((k) => (CODE_LANGS.find(([x]) => x === k) || [k, k])[1]).join(' and ') + ' here. Switch language to run it.' : 'Running Java, C++ and Go in the browser is coming. Copy it to your IDE for now.',
      run: () => this.execute('run'), submit: () => this.execute('submit'),
      runLabel: spec && spec.program && !graded ? 'Run' : this.opts.single || graded ? (this.opts.runLabel || 'Check') : 'Run', showSubmit: !this.opts.single && !(spec && spec.program), showCustom: !this.opts.single && !(spec && spec.program), noCustom: !!(this.opts.single || (spec && spec.program)),
      hasConsole: !!(spec && spec.program && !graded), console: consoleLines, consoleEmpty: !consoleLines.length,
      hasHelp: !!help, help,
      custom: s.custom, setCustom: (e) => this.set({ custom: e && e.target ? e.target.value : '' }),
      customHint: !spec || !spec.examples ? '' : spec.drive ? 'Custom input is off for this problem' : 'Custom input, e.g. ' + spec.examples[0][0].map(showValue).join(', '),
      statusText: s.status || (runnable ? (lang === 'py' && PY.state !== 'ready' ? 'Python loads on your first run' : 'Runs in your browser') : ''),
      statusColor: s.busy ? t.accent : t.muted,
      hasBadge: !!badge, badge, badgeBg: badgeOk ? t.okBg : t.warnBg, badgeFg: badgeOk ? t.ok : fail,
      hasMsg: !!msg, msg, msgBg, msgFont: msgMono ? t.mono : t.body,
      rows,
      showHint: !out,
      hint: !hasTests ? '' : spec.program ? (graded ? 'Check runs your program and compares what it prints. Saved in this browser.' : 'Press Run to see what your program prints. Saved in this browser.') : this.opts.single ? 'Check runs ' + (spec.examples.length + (spec.hidden || []).length) + ' tests on your function. Saved in this browser.' : runnable ? 'Run tries the ' + spec.examples.length + ' examples (plus your custom input). Submit adds ' + spec.hidden.length + ' hidden tests. Saved in this browser. In the editor, Esc then Tab moves focus on.' : 'Write it here, then copy it into your IDE to run it.'
    };
  }
}
// Printed lines for the console, with the answers given to input() / prompt() shown the way a terminal does.
function programLines(logs, t) {
  const out = [];
  (logs || []).forEach((chunk) => String(chunk).split('\n').forEach((l) => {
    if (l.indexOf(PROGRAM_IN) === 0) { const [q, a] = l.slice(PROGRAM_IN.length).split(PROGRAM_SEP); out.push({ text: q + a, fg: t.muted, weight: 400, typed: true }); }
    else out.push({ text: l, fg: t.text, weight: 400 });
  }));
  while (out.length && !out[out.length - 1].text) out.pop();
  return out.slice(0, 300);
}
// @@END-CODE-PANE@@
