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
// The timer never starts on its own: cr.startClock / cr.pauseClock / cr.resetClock drive it (the mock interview keeps its own clock).
// The last Run or Submit result is kept for this tab (sessionStorage), so coming back to a problem shows it again.
// Editor settings (the gear) are DS.editorPrefs(). Ctrl/Cmd + ' runs, Ctrl/Cmd + Enter submits, from the editor or anywhere on the page.
// Every Submit is saved with DS.addSubmission; the History tab lists them, shows one, diffs it with the current code or restores it.
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
const hasDS = () => typeof DS !== 'undefined' && !!DS.editorPrefs;
const EDITOR_FALLBACK = { fontSize: 16, tabSize: 0, wrap: false, relative: false, vim: false, brackets: true, autocomplete: true, celebrate: true };
function paneEditorPrefs() { try { return hasDS() ? DS.editorPrefs() : Object.assign({}, EDITOR_FALLBACK); } catch (e) { return Object.assign({}, EDITOR_FALLBACK); } }
// A line diff of two texts: [{ op: ' ' | '-' | '+', text }]. '-' lines are only in a, '+' lines only in b.
// The common start and end are trimmed first; the middle is an LCS table, or a plain swap when it is too big.
function lineDiff(a, b) {
  const x = String(a).split('\n'), y = String(b).split('\n');
  let lo = 0;
  while (lo < x.length && lo < y.length && x[lo] === y[lo]) lo++;
  let hx = x.length, hy = y.length;
  while (hx > lo && hy > lo && x[hx - 1] === y[hy - 1]) { hx--; hy--; }
  const head = x.slice(0, lo).map((text) => ({ op: ' ', text })), tail = x.slice(hx).map((text) => ({ op: ' ', text }));
  const mx = x.slice(lo, hx), my = y.slice(lo, hy), n = mx.length, m = my.length;
  let mid = [];
  if (n * m > 160000) mid = mx.map((text) => ({ op: '-', text })).concat(my.map((text) => ({ op: '+', text })));
  else {
    const L = [];
    for (let i = 0; i <= n; i++) L.push(new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = mx[i] === my[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    let i = 0, j = 0;
    while (i < n || j < m) {
      if (i < n && j < m && mx[i] === my[j]) { mid.push({ op: ' ', text: mx[i] }); i++; j++; }
      else if (j < m && (i === n || L[i][j + 1] >= L[i + 1][j])) { mid.push({ op: '+', text: my[j] }); j++; }
      else { mid.push({ op: '-', text: mx[i] }); i++; }
    }
  }
  return head.concat(mid, tail);
}
const PANE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// "Today, 14:05", "Yesterday, 09:12" or "23 Oct, 14:05" (the year is added when it is not this year).
function whenSubmitted(ts, nowTs) {
  const d = new Date(ts), n = new Date(nowTs == null ? Date.now() : nowTs);
  const day = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const gap = Math.round((day(n) - day(d)) / 86400000);
  const time = pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  if (gap === 0) return 'Today, ' + time;
  if (gap === 1) return 'Yesterday, ' + time;
  return d.getDate() + ' ' + PANE_MONTHS[d.getMonth()] + (d.getFullYear() !== n.getFullYear() ? ' ' + d.getFullYear() : '') + ', ' + time;
}
const paneMac = () => { try { return /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || ''); } catch (e) { return false; } };
// The shortcuts sheet, with Cmd on a Mac and Ctrl elsewhere.
function paneShortcuts() {
  const mod = paneMac() ? '⌘' : 'Ctrl';
  return [['Run the examples', [mod, "'"]], ['Submit every test', [mod, 'Enter']], ['Leave the editor', ['Esc', 'Tab']], ['Indent, or indent less', ['Tab', 'Shift + Tab']],
    ['Comment a line on or off', [mod, '/']], ['Undo, redo', [mod + ' + Z', mod + ' + Shift + Z']], ['Search the site', ['/']]];
}
const PANE_SWITCHES = [['wrap', 'Word wrap', 'Long lines fold onto the next line'], ['relative', 'Relative line numbers', 'Count lines from the cursor'],
  ['vim', 'Vim keys', 'Normal, insert and visual modes'], ['brackets', 'Bracket matching', 'Close and highlight brackets'],
  ['autocomplete', 'Autocomplete', 'Suggest words as you type'], ['celebrate', 'Celebrate when accepted', 'A short burst when every test passes']];
// A small burst of colour over the editor when every test passes. Skipped when the learner asks for reduced motion.
function paneCelebrate(anchor, t) {
  try {
    if (!anchor || !anchor.getBoundingClientRect || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    if (!document.getElementById('ds-burst-css')) {
      const css = document.createElement('style');
      css.id = 'ds-burst-css';
      css.textContent = '@keyframes ds-burst{0%{transform:translate(0,0) rotate(0);opacity:1}100%{transform:translate(var(--dx),var(--dy)) rotate(var(--r));opacity:0}}';
      document.head.appendChild(css);
    }
    const r = anchor.getBoundingClientRect();
    const box = document.createElement('div');
    box.setAttribute('aria-hidden', 'true');
    box.style.cssText = 'position:fixed;left:' + (r.left + r.width / 2) + 'px;top:' + (r.top + r.height * 0.6) + 'px;width:0;height:0;pointer-events:none;z-index:60';
    const colors = [t.accent, t.ok, t.medFg, t.right || t.accent];
    for (let i = 0; i < 28; i++) {
      const a = (Math.PI * 2 * i) / 28 + Math.random() * 0.3, dist = 90 + Math.random() * 120;
      const bit = document.createElement('span');
      bit.style.cssText = 'position:absolute;width:' + (6 + (i % 3) * 2) + 'px;height:' + (i % 2 ? 6 : 10) + 'px;border-radius:2px;background:' + colors[i % colors.length] +
        ';--dx:' + Math.round(Math.cos(a) * dist) + 'px;--dy:' + Math.round(Math.sin(a) * dist - 40) + 'px;--r:' + Math.round(Math.random() * 540 - 270) + 'deg;animation:ds-burst 900ms cubic-bezier(.2,.7,.3,1) forwards';
      box.appendChild(bit);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 1000);
  } catch (e) {}
}

class CodeRunner {
  constructor(host, pid, opts) {
    this.host = host;
    this.opts = opts || {};
    let lang = 'py';
    try { const l = window.localStorage.getItem(CODE_LANG_KEY); if (CODE_LANGS.some(([k]) => k === l)) lang = l; } catch (e) {}
    this.specs = this.opts.specs || TEST_SPECS;
    if (this.opts.langs && !this.opts.langs.includes(lang)) lang = this.opts.langs[0];
    this.pid = this.known(pid) ? pid : Object.keys(this.specs)[0];
    const kept = keptRun(this.pid, lang);
    this.s = { lang, code: savedCode(this.pid, lang) || this.starter(lang), out: kept ? kept.out : null, busy: false, status: kept ? kept.status : '',
      custom: '', elapsed: 0, clockOn: false, solvedIn: null, copied: false, confirmReset: false,
      view: 'code', prefsOpen: false, keysOpen: false, prefs: paneEditorPrefs(), sel: null, diff: false, confirmRestore: false, confirmClear: false };
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
  mount() {
    this.clock = setInterval(() => { if (this.s.clockOn && this.s.solvedIn === null) this.set({ elapsed: this.s.elapsed + 1 }); }, 1000);
    // Ctrl/Cmd + ' runs and Ctrl/Cmd + Enter submits from anywhere on the page. The editor handles its own (and marks the event handled).
    this.keys = (e) => {
      if (!e || e.defaultPrevented || !(e.ctrlKey || e.metaKey) || e.altKey || !this.el) return;
      if (e.key === "'" || e.key === 'Enter') { e.preventDefault(); this.shortcut(e.key === 'Enter' ? 'submit' : 'run'); }
    };
    try { window.addEventListener('keydown', this.keys); } catch (e) {}
  }
  // Run or Submit from a keyboard shortcut: only when this problem can run here.
  shortcut(mode) {
    const spec = this.spec();
    if (!spec || !specRuns(spec, this.s.lang) || this.s.busy) return;
    if (this.s.view !== 'code') this.set({ view: 'code' });
    this.execute(mode === 'submit' && !this.opts.single && !spec.program ? 'submit' : 'run');
  }
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
    clearInterval(this.clock); clearTimeout(this.resetTimer); clearTimeout(this.copyTimer); clearTimeout(this.restoreTimer); clearTimeout(this.clearTimer);
    try { if (this.keys) window.removeEventListener('keydown', this.keys); } catch (e) {}
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
      if (window.__dsEditor) {
        this.editor = window.__dsEditor.create(el, { doc: this.s.code, lang: this.s.lang, theme: t, onChange, prefs: this.s.prefs, onRun: () => this.shortcut('run'), onSubmit: () => this.shortcut('submit') });
        this.editorTheme = [t.codeBg, t.text, t.accent, t.mono].join('|');
        return;
      }
    } catch (e) { console.error(e); }
    const ta = document.createElement('textarea');
    ta.value = this.s.code; ta.spellcheck = false; ta.setAttribute('aria-label', 'Code editor');
    let theme = t;
    const paint = (x) => { theme = x; const p = this.s.prefs; ta.style.cssText = 'width:100%;height:100%;box-sizing:border-box;border:0;resize:none;outline:none;padding:12px 16px;tab-size:' + (p.tabSize || 4) + ';white-space:' + (p.wrap ? 'pre-wrap' : 'pre') + ';font:calc(' + p.fontSize + 'px * var(--ts, 1))/1.65 ' + x.mono + ';background:' + x.codeBg + ';color:' + x.text; };
    paint(t);
    ta.addEventListener('input', () => onChange(ta.value));
    el.appendChild(ta);
    this.editor = { getDoc: () => ta.value, setDoc: (s) => { ta.value = s; }, setLanguage() {}, setTheme: paint, setPrefs: () => paint(theme), destroy: () => ta.remove() };
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
    this.set({ code: this.showCode(), out: kept ? kept.out : null, busy: false, status: kept ? kept.status : '', custom: '', elapsed: 0, clockOn: false, solvedIn: null, sel: null, diff: false, confirmRestore: false, confirmClear: false });
  }
  setLang(lang) {
    if (lang === this.s.lang) return;
    this.stopRun();
    if (this.opts.langs && !this.opts.langs.includes(lang)) return;
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
  // -- editor settings --
  setPref(patch) {
    const prefs = hasDS() ? DS.setEditorPrefs(patch) : Object.assign({}, this.s.prefs, patch);
    if (this.editor && this.editor.setPrefs) this.editor.setPrefs(prefs);
    this.set({ prefs });
  }
  resetPrefs() {
    const prefs = hasDS() ? DS.resetEditorPrefs() : Object.assign({}, EDITOR_FALLBACK);
    if (this.editor && this.editor.setPrefs) this.editor.setPrefs(prefs);
    this.set({ prefs });
  }
  // The settings panel and the shortcuts sheet share one spot; closing either puts focus back on the gear.
  openPanel(which) {
    this.set({ prefsOpen: which === 'prefs', keysOpen: which === 'keys' });
    setTimeout(() => { try { const el = document.querySelector(which === 'keys' ? '[data-cp-keys] button' : '[data-cp-prefs] button'); if (el) el.focus(); } catch (e) {} }, 0);
  }
  closePanel() {
    this.set({ prefsOpen: false, keysOpen: false });
    setTimeout(() => { try { const el = document.querySelector('[data-cp-gear]'); if (el) el.focus(); } catch (e) {} }, 0);
  }
  // -- submission history --
  history() { try { return hasDS() ? DS.submissions(this.pid) : []; } catch (e) { return []; } }
  showView(view) { this.set({ view, sel: null, diff: false, confirmRestore: false, confirmClear: false, prefsOpen: false, keysOpen: false }); }
  pick(id) { this.set({ sel: id, diff: false, confirmRestore: false }); }
  // Restore replaces the code in the editor, so the first click only arms it for 3 seconds.
  restore(sub) {
    clearTimeout(this.restoreTimer);
    if (!this.s.confirmRestore) {
      this.set({ confirmRestore: true });
      this.restoreTimer = setTimeout(() => this.set({ confirmRestore: false }), 3000);
      return;
    }
    if (sub.lang !== this.s.lang && CODE_LANGS.some(([k]) => k === sub.lang)) this.setLang(sub.lang);
    storeCode(this.pid, this.s.lang, sub.code);
    if (this.editor) this.editor.setDoc(sub.code);
    this.set({ code: sub.code, view: 'code', sel: null, diff: false, confirmRestore: false });
  }
  clearHistory() {
    clearTimeout(this.clearTimer);
    if (!this.s.confirmClear) {
      this.set({ confirmClear: true });
      this.clearTimer = setTimeout(() => this.set({ confirmClear: false }), 3000);
      return;
    }
    if (hasDS()) DS.clearSubmissions(this.pid);
    this.set({ confirmClear: false, sel: null, diff: false });
  }
  // The code to compare a submission with: what is in the editor now in that language.
  currentCode(lang) { return lang === this.s.lang ? (this.editor ? this.editor.getDoc() : this.s.code) : savedCode(this.pid, lang) || this.starter(lang); }
  historyVals(t) {
    const s = this.s, list = this.history();
    const langName = (k) => (CODE_LANGS.find(([x]) => x === k) || [k, k])[1];
    const okAll = (x) => x.total > 0 && x.passed === x.total;
    const fail = t.diff.Hard[2];
    const sub = s.sel ? list.find((x) => x.id === s.sel) : null;
    const rows = list.map((x, i) => ({
      id: x.id, n: list.length - i, when: whenSubmitted(x.at), lang: langName(x.lang), score: x.passed + ' / ' + x.total,
      verdict: okAll(x) ? 'Accepted' : x.passed ? 'Partly passed' : 'Not passed', mark: okAll(x) ? '✓' : '✗', markFg: okAll(x) ? t.ok : fail,
      aria: 'Submission ' + (list.length - i) + ', ' + whenSubmitted(x.at) + ', ' + langName(x.lang) + ', ' + x.passed + ' of ' + x.total + ' tests passed',
      open: () => this.pick(x.id)
    }));
    let lines = [], diff = [], plus = 0, minus = 0;
    if (sub) {
      lines = sub.code.split('\n').map((code, i) => ({ n: i + 1, code }));
      if (s.diff) {
        diff = lineDiff(sub.code, this.currentCode(sub.lang)).map((d) => {
          if (d.op === '+') plus++; else if (d.op === '-') minus++;
          return { mark: d.op === ' ' ? '' : d.op === '+' ? '+' : '−', code: d.text, bg: d.op === '+' ? t.okBg : d.op === '-' ? t.warnBg : 'transparent', fg: d.op === '+' ? t.ok : d.op === '-' ? fail : t.muted,
            sr: d.op === '+' ? 'Added: ' : d.op === '-' ? 'Removed: ' : '' };
        });
      }
    }
    return {
      count: list.length, empty: !list.length, any: list.length > 0, rows, listing: !sub, picked: !!sub,
      max: hasDS() ? DS.SUB_MAX : 20,
      title: sub ? langName(sub.lang) + ' · ' + sub.passed + ' / ' + sub.total + ' passed' : '', when: sub ? whenSubmitted(sub.at) : '',
      verdict: sub ? (okAll(sub) ? 'Accepted' : 'Not every test passed') : '', verdictFg: sub && okAll(sub) ? t.ok : fail,
      back: () => this.set({ sel: null, diff: false, confirmRestore: false }),
      showCode: () => this.set({ diff: false }), showDiff: () => this.set({ diff: true }),
      codeOn: sub ? (!s.diff ? 'true' : 'false') : 'false', diffOn: s.diff ? 'true' : 'false',
      codeBg: !s.diff ? t.text : 'transparent', codeFg: !s.diff ? t.bg : t.muted, diffBg: s.diff ? t.text : 'transparent', diffFg: s.diff ? t.bg : t.muted,
      viewing: !!sub && !s.diff, diffing: !!sub && s.diff, lines, diff,
      diffSummary: !s.diff ? '' : plus || minus ? plus + ' line' + (plus === 1 ? '' : 's') + ' added and ' + minus + ' removed in your code since this submission.' : 'Your code is the same as this submission.',
      restore: () => sub && this.restore(sub), restoreLabel: s.confirmRestore ? 'Click again to replace your code' : 'Restore this code',
      restoreBorder: s.confirmRestore ? t.accent : t.line2,
      clear: () => this.clearHistory(), clearLabel: s.confirmClear ? 'Click again to clear' : 'Clear history', clearBorder: s.confirmClear ? t.accent : t.line,
      clearAria: s.confirmClear ? 'Click again to delete every saved submission for this problem' : 'Clear the submission history for this problem'
    };
  }
  prefsVals(t) {
    const p = this.s.prefs;
    const seg = (on) => ({ bg: on ? t.text : 'transparent', fg: on ? t.bg : t.muted, on: on ? 'true' : 'false' });
    return {
      open: this.s.prefsOpen, keysOpen: this.s.keysOpen, gearOn: this.s.prefsOpen || this.s.keysOpen ? 'true' : 'false',
      gear: () => (this.s.prefsOpen || this.s.keysOpen ? this.closePanel() : this.openPanel('prefs')),
      close: () => this.closePanel(), keys: () => this.openPanel('keys'), backToPrefs: () => this.openPanel('prefs'),
      onKey: (e) => { if (e && e.key === 'Escape') { if (e.preventDefault) e.preventDefault(); if (e.stopPropagation) e.stopPropagation(); this.closePanel(); } },
      font: p.fontSize + ' px', fontAria: 'Text size ' + p.fontSize + ' pixels',
      smaller: () => this.setPref({ fontSize: Math.max(12, p.fontSize - 1) }), larger: () => this.setPref({ fontSize: Math.min(20, p.fontSize + 1) }),
      noSmaller: p.fontSize <= 12, noLarger: p.fontSize >= 20,
      tabs: [[0, 'Auto'], [2, '2'], [4, '4']].map(([v, label]) => Object.assign({ label, aria: v ? v + ' spaces' : 'The language’s usual indent', pick: () => this.setPref({ tabSize: v }) }, seg(p.tabSize === v))),
      switches: PANE_SWITCHES.map(([k, label, note]) => ({ k, label, note, on: p[k] ? 'true' : 'false', id: 'cp-sw-' + k,
        track: p[k] ? t.accent : t.muted, knob: p[k] ? t.onAccent : t.surface, x: p[k] ? '18px' : '2px', flip: () => this.setPref({ [k]: !p[k] }) })),
      reset: () => this.resetPrefs(),
      shortcuts: paneShortcuts().map(([what, keys]) => ({ what, keys: keys.map((k, i) => ({ k, sep: i ? (what === 'Leave the editor' ? 'then' : what.indexOf(',') > 0 ? 'or' : '+') : '', hasSep: i > 0 })) }))
    };
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
        if (!end.cancelled) keepRun(this.pid, lang, out, status);
        if (mode === 'submit' && !end.cancelled && hasDS()) { try { DS.addSubmission(this.pid, { lang, passed: end.fatal || end.timeout ? 0 : passed, total: cases.length, code }); } catch (e) {} }
        if ((mode === 'submit' || mode === 'all') && !end.cancelled && !end.fatal && passed === cases.length && this.s.prefs.celebrate) paneCelebrate(this.el, this.tokens || THEMES.max);
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
    const hv = this.opts.single ? null : this.historyVals(t), hvAll = hv || this.historyVals(t);
    const inHistory = !!hv && s.view === 'history';
    const mod = paneMac() ? '⌘' : 'Ctrl';
    return {
      ref: this.ref,
      // Code and History tabs (History is not offered in the single-button mode)
      tabs: !!hv, hist: hvAll, inHistory, inCode: !inHistory, editorShow: inHistory ? 'none' : 'block',
      viewRole: hv ? 'tabpanel' : 'group', viewName: inHistory ? 'Submission history' : 'Code editor',
      codeTab: () => this.showView('code'), historyTab: () => this.showView('history'),
      codeSel: inHistory ? 'false' : 'true', histSel: inHistory ? 'true' : 'false',
      codeTabBg: inHistory ? 'transparent' : t.text, codeTabFg: inHistory ? t.muted : t.bg, histTabBg: inHistory ? t.text : 'transparent', histTabFg: inHistory ? t.bg : t.muted,
      codeTabIdx: inHistory ? '-1' : '0', histTabIdx: inHistory ? '0' : '-1',
      tabKey: (e) => { if (e && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { if (e.preventDefault) e.preventDefault(); this.showView(inHistory ? 'code' : 'history'); setTimeout(() => { try { const el = document.getElementById(inHistory ? 'cp-tab-code' : 'cp-tab-hist'); if (el) el.focus(); } catch (x) {} }, 0); } },
      histCount: hv && hv.count ? String(hv.count) : '', hasHistCount: !!(hv && hv.count),
      pf: this.prefsVals(t),
      runKeys: mod + " + '", submitKeys: mod + ' + Enter', runKeysAria: paneMac() ? "Meta+'" : "Control+'", submitKeysAria: paneMac() ? 'Meta+Enter' : 'Control+Enter',
      runTitle: 'Run the examples (' + mod + " + ')", submitTitle: 'Submit every test (' + mod + ' + Enter)',
      showLangs: !this.opts.hideLangs, showClock: !this.opts.hideClock, hasTests, noTests: !hasTests, elapsed: s.elapsed,
      langs: CODE_LANGS.filter(([k]) => !this.opts.langs || this.opts.langs.includes(k)).map(([k, label]) => ({ label: label === 'JavaScript' ? 'JS' : label, on: lang === k, bg: lang === k ? t.text : 'transparent', fg: lang === k ? t.bg : t.muted, pick: () => this.setLang(k) })),
      clock, clockLabel: (solved ? 'Solved in ' : 'Time on this problem: ') + clock, clockFg: solved ? t.ok : t.muted,
      clockIdle: !s.clockOn && s.elapsed === 0 && !solved, clockShown: s.clockOn || s.elapsed > 0 || solved, clockOn: s.clockOn,
      startClock: () => this.startClock(), resetClock: () => this.resetClock(),
      toggleClock: () => (s.clockOn ? this.pauseClock() : this.startClock()),
      clockToggleLabel: s.clockOn ? 'Pause' : 'Resume', clockToggleAria: s.clockOn ? 'Pause the timer' : 'Resume the timer', canToggleClock: !solved,
      copy: () => this.copy(), copyLabel: s.copied ? 'Copied' : 'Copy',
      reset: () => this.reset(), resetLabel: s.confirmReset ? 'Click again to reset' : 'Reset code', resetBorder: s.confirmReset ? t.accent : t.line,
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
      hint: !hasTests ? '' : spec.program ? (graded ? 'Check runs your program and compares what it prints. Saved in this browser.' : 'Press Run to see what your program prints. Saved in this browser.') : this.opts.single ? 'Check runs ' + (spec.examples.length + (spec.hidden || []).length) + ' tests on your function. Saved in this browser.' : runnable ? 'Run tries the ' + spec.examples.length + ' examples (plus your custom input). Submit adds ' + spec.hidden.length + ' hidden tests. Saved in this browser. ' + mod + " + ' runs, " + mod + ' + Enter submits; in the editor, Esc then Tab moves focus on.' : 'Write it here, then copy it into your IDE to run it.'
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
