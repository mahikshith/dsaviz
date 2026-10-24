// @@CODE-PANE@@ — generated block (from shared/code_pane.js): the self-contained code pane.
// Markup lives in shared/code_pane.html (holes under {{cr.*}}). A page uses it like this:
//   constructor:          this.runner = new CodeRunner(this, problemId, opts);
//     opts.starter(pid, lang)  starter code for a problem with no test spec yet (the pane then edits only)
//     opts.hideLangs / opts.hideClock  the host page draws its own language tabs or timer
//     opts.onResult(pid, mode, passed, total)  called when a Run or Submit finishes (the mock interview counts them)
//   componentDidMount:    this.runner.mount();
//   componentWillUnmount: this.runner.unmount();
//   renderVals:           return { t, cr: this.runner.vals(t, themeKey), ... };
//   switching problem:    this.runner.setProblem(id);
// The timer never starts on its own: cr.startClock / cr.pauseClock / cr.resetClock drive it (the mock interview keeps its own clock).
// The last Run or Submit result is kept for this tab (sessionStorage), so coming back to a problem shows it again.
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
const RUN_KEY = 'dsaviz-run-v1';
function loadRuns() { try { const v = JSON.parse(window.sessionStorage.getItem(RUN_KEY)); return v && typeof v === 'object' ? v : {}; } catch (e) { return {}; } }
function keptRun(pid, lang) { const r = loadRuns()[pid]; return r && r.lang === lang && r.out && r.out.done ? r : null; }
function keepRun(pid, lang, out, status) {
  try { const all = loadRuns(); all[pid] = { lang, out, status }; window.sessionStorage.setItem(RUN_KEY, JSON.stringify(all)); } catch (e) {}
}

class CodeRunner {
  constructor(host, pid, opts) {
    this.host = host;
    this.opts = opts || {};
    let lang = 'py';
    try { const l = window.localStorage.getItem(CODE_LANG_KEY); if (CODE_LANGS.some(([k]) => k === l)) lang = l; } catch (e) {}
    this.pid = this.known(pid) ? pid : Object.keys(TEST_SPECS)[0];
    const kept = keptRun(this.pid, lang);
    this.s = { lang, code: savedCode(this.pid, lang) || this.starter(lang), out: kept ? kept.out : null, busy: false, status: kept ? kept.status : '',
      custom: '', elapsed: 0, clockOn: false, solvedIn: null, copied: false, confirmReset: false };
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
  spec() { return TEST_SPECS[this.pid]; }
  known(pid) { return !!TEST_SPECS[pid] || (!!this.opts.starter && !!pid); }
  starter(lang) { const spec = this.spec(); return spec ? starterCode(spec, lang) : this.opts.starter ? this.opts.starter(this.pid, lang) : ''; }
  mount() { this.clock = setInterval(() => { if (this.s.clockOn && this.s.solvedIn === null) this.set({ elapsed: this.s.elapsed + 1 }); }, 1000); }
  startClock() { if (this.s.solvedIn === null) this.set({ clockOn: true }); }
  pauseClock() { this.set({ clockOn: false }); }
  resetClock() { this.set({ clockOn: false, elapsed: 0, solvedIn: null }); }
  // "Insert plan as comments": the plan's steps go into the learner's code in the chosen language.
  insertPlan(plan) {
    const spec = this.spec();
    if (!plan || !spec) return;
    const now = this.editor ? this.editor.getDoc() : this.s.code;
    const code = insertPlanComments(now, plan, this.s.lang, spec.sig && spec.sig[this.s.lang]);
    if (code === now) return;
    if (this.editor) this.editor.setDoc(code);
    storeCode(this.pid, this.s.lang, code);
    this.set({ code });
  }
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
    const kept = keptRun(pid, this.s.lang);
    this.set({ code: this.showCode(), out: kept ? kept.out : null, busy: false, status: kept ? kept.status : '', custom: '', elapsed: 0, clockOn: false, solvedIn: null });
  }
  setLang(lang) {
    if (lang === this.s.lang) return;
    this.stopRun();
    try { window.localStorage.setItem(CODE_LANG_KEY, lang); } catch (e) {}
    this.s.lang = lang;
    const kept = keptRun(this.pid, lang);
    this.set({ code: this.showCode(), out: kept ? kept.out : null, busy: false, status: kept ? kept.status : '' });
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
    return out.cases.filter((c, i) => { const r = out.results[i]; return r && !r.error && !r.undef && judge(spec, c[0], r.got, c[1]); }).length;
  }
  execute(mode) {
    if (this.s.busy) return;
    const spec = this.spec(), lang = this.s.lang;
    if (!spec || !specRuns(spec, lang)) return;
    const code = this.editor ? this.editor.getDoc() : this.s.code;
    let cases = mode === 'submit' ? spec.examples.concat(spec.hidden) : spec.examples.slice();
    const titles = cases.map((c, i) => (i < spec.examples.length ? 'Example ' + (i + 1) : 'Hidden ' + (i - spec.examples.length + 1)));
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
        const solved = mode === 'submit' && passed === cases.length && this.s.solvedIn === null;
        if (solved && typeof DS !== 'undefined') DS.passCode(this.pid);
        if (this.opts.onResult && !end.cancelled) { try { this.opts.onResult(this.pid, mode, end.fatal || end.timeout ? 0 : passed, cases.length); } catch (e) {} }
        if (!end.cancelled) keepRun(this.pid, lang, out, status);
        this.set({ busy: false, status, solvedIn: solved ? this.s.elapsed : this.s.solvedIn, clockOn: solved ? false : this.s.clockOn });
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
    let rows = [], badge = '', badgeOk = false, msg = '', msgBg = t.sunk, msgMono = false;
    if (out) {
      const passed = this.passCount(out), total = out.cases.length;
      if (out.fatal) { msg = out.fatal; msgBg = t.warnBg; msgMono = true; }
      else if (out.timeout) msg = 'Your code ran past ' + limit + ' seconds and was stopped. Is there a loop that never ends?';
      if (out.mode === 'run') {
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
      langs: CODE_LANGS.map(([k, label]) => ({ label: label === 'JavaScript' ? 'JS' : label, on: lang === k, bg: lang === k ? t.text : 'transparent', fg: lang === k ? t.bg : t.muted, pick: () => this.setLang(k) })),
      clock, clockLabel: (solved ? 'Solved in ' : 'Time on this problem: ') + clock, clockFg: solved ? t.ok : t.muted,
      clockIdle: !s.clockOn && s.elapsed === 0 && !solved, clockShown: s.clockOn || s.elapsed > 0 || solved, clockOn: s.clockOn,
      startClock: () => this.startClock(), resetClock: () => this.resetClock(),
      toggleClock: () => (s.clockOn ? this.pauseClock() : this.startClock()),
      clockToggleLabel: s.clockOn ? 'Pause' : 'Resume', clockToggleAria: s.clockOn ? 'Pause the timer' : 'Resume the timer', canToggleClock: !solved,
      copy: () => this.copy(), copyLabel: s.copied ? 'Copied' : 'Copy',
      reset: () => this.reset(), resetLabel: s.confirmReset ? 'Click again to reset' : 'Reset', resetBorder: s.confirmReset ? t.accent : t.line,
      resetAria: s.confirmReset ? 'Click again to replace your code with the starter code' : 'Reset to the starter code',
      runnable, notRunnable: hasTests && !runnable, busy: s.busy,
      notRunnableMsg: hasTests && spec.langs && RUNNABLE[lang] ? spec.langNote || 'This one runs in ' + spec.langs.map((k) => (CODE_LANGS.find(([x]) => x === k) || [k, k])[1]).join(' and ') + ' here. Switch language to run it.' : 'Running Java, C++ and Go in the browser is coming. Copy it to your IDE for now.',
      run: () => this.execute('run'), submit: () => this.execute('submit'),
      custom: s.custom, setCustom: (e) => this.set({ custom: e && e.target ? e.target.value : '' }),
      customHint: !spec ? '' : spec.drive ? 'Custom input is off for this problem' : 'Custom input, e.g. ' + spec.examples[0][0].map(showValue).join(', '),
      statusText: s.status || (runnable ? (lang === 'py' && PY.state !== 'ready' ? 'Python loads on your first run' : 'Runs in your browser') : ''),
      statusColor: s.busy ? t.accent : t.muted,
      hasBadge: !!badge, badge, badgeBg: badgeOk ? t.okBg : t.warnBg, badgeFg: badgeOk ? t.ok : fail,
      hasMsg: !!msg, msg, msgBg, msgFont: msgMono ? t.mono : t.body,
      rows,
      showHint: !out,
      hint: !hasTests ? '' : runnable ? 'Run tries the ' + spec.examples.length + ' examples (plus your custom input). Submit adds ' + spec.hidden.length + ' hidden tests. Saved in this browser. In the editor, Esc then Tab moves focus on.' : 'Write it here, then copy it into your IDE to run it.'
    };
  }
}
// @@END-CODE-PANE@@
