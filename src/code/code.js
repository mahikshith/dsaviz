// ---- page ----
// The Problem page (Code.dc.html; the old Story page is folded into it). Opens straight into the problem, split 45 / 55.
// Left, with real tabs: Problem (statement, examples, constraints, "Asked at" tags, and a Story switch that shows the animated story with
// its controls in the same pane), Hints (one at a time, shared/hints.js), Solution (asks once, then the approaches) and History (your attempts).
// Right: the editor, the tests under it, and Run at the bottom right. Run checks every test (the examples and the hidden ones).
// Python and JavaScript run through CodeRunner (shared/code_pane.js), SQL through SqlRunner (shared/sql_pane.js).
// The story engine is the Story page's (src/story, class StoryComponent): this page borrows its player, stage and controls.
// Opened with ?problem=<id> (and &story=1 for the story), or with the problem last chosen anywhere on the site.
function sqlInfo(id) { const q = SQL_SPECS[id]; return { id, title: q.title, diff: q.diff, pattern: 'SQL', story: null, time: null }; }
const knownProblem = (id) => !!(id && (TEST_SPECS[id] || SQL_SPECS[id]));
const CODE_GROUPS = SHEET_GROUPS.map(([name]) => ({ name, items: SHEET.filter((r) => r.pattern === name && knownProblem(r.pid)).map((r) => ({ id: r.pid, title: r.name })) }))
  .filter((g) => g.items.length);
const PB_TABS = [['problem', 'Problem'], ['hints', 'Hints'], ['solution', 'Solution'], ['history', 'History']];
const PB_LANGS = ['py', 'js'];
const PB_SEEN = 'dsaviz-solution-seen:';
const PB_STORY_KEY = 'dsaviz-problem-story';
// Timed (set with the Timed switch on the Problems page): a countdown on the Problem page (minutes per difficulty: DS.TIMED).
// It starts when the problem opens and can be paused, resumed or stopped. Nothing else from the old Interview page.
const PB_TIMED_KEY = DS.TIMED.key;
const PB_MINUTES = DS.TIMED.minutes;
function pbTimedOn() { try { return window.localStorage.getItem(PB_TIMED_KEY) === '1'; } catch (e) { return false; } }
function pbSeconds(pid) {
  const d = SQL_SPECS[pid] ? SQL_SPECS[pid].diff : TEST_SPECS[pid] ? specInfo(pid).diff : 'Medium';
  return (PB_MINUTES[d] || 30) * 60;
}
function pbClockText(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
// "Back to ...": what the learner came from, by the page's own name.
const PB_BACK = { Sheet: 'Problems', Patterns: 'Roadmap', Start: 'Start here', Concepts: 'DSA concepts', SystemDesign: 'System design', AIML: 'AI & ML',
  Complexity: 'Complexity', Git: 'Git', ConceptLesson: 'the lesson', Chapter: 'the lesson', SDLesson: 'the lesson', AILesson: 'the lesson' };
// Only a list or a lesson is a place to go back to; from Home, the front page or anywhere else the answer is Problems.
function pbBackVals() {
  let to = null;
  try { to = window.__dsTrail ? window.__dsTrail() : null; } catch (e) {}
  const name = to ? String(to.page).replace('.dc.html', '') : '';
  const use = !!(to && PB_BACK[name]);
  return {
    label: 'Back to ' + (use ? PB_BACK[name] : 'Problems'), href: '#back',
    go: (e) => {
      try { if (e && e.preventDefault) e.preventDefault(); } catch (x) {}
      try { if (use) window.__dsBack(); else window.__dsNav('Sheet.dc.html', '', true); } catch (x) {}
    }
  };
}
function queryProblem() {
  try { const q = new URLSearchParams(window.location.search).get('problem'); return knownProblem(q) ? q : null; } catch (e) { return null; }
}
function setQuery(id, story) {
  try {
    const u = new URL(window.location.href);
    if (id) u.searchParams.set('problem', id); else u.searchParams.delete('problem');
    if (id && story) u.searchParams.set('story', '1'); else u.searchParams.delete('story');
    window.history.replaceState(window.history.state, '', u.pathname + u.search + u.hash);
  } catch (e) {}
}
// Which problem opens, and whether with the story on. Read once per visit (a search result for a story leaves a one-time flag).
let PB_INIT = null;
function pbInitial() {
  if (PB_INIT) return PB_INIT;
  let last = null, story = false;
  try { last = window.localStorage.getItem(PROBLEM_KEY); } catch (e) {}
  try { story = new URLSearchParams(window.location.search).get('story') === '1'; } catch (e) {}
  const flag = typeof searchFocus === 'function' ? searchFocus(PB_STORY_KEY) === '1' : false;
  PB_INIT = { pid: queryProblem() || (knownProblem(last) ? last : 'two-sum-ii'), story: story || flag };
  return PB_INIT;
}
function pbSolSeen(pid) { try { return window.localStorage.getItem(PB_SEEN + pid) === '1'; } catch (e) { return false; } }
const pbLangName = (k) => (k === 'sql' ? 'SQL' : (CODE_LANGS.find(([x]) => x === k) || [k, k])[1]);

class Component extends StoryComponent {
  constructor(props) {
    super(props);
    const init = pbInitial(), pid = init.pid, hasScene = !!SCENES[pid] && PROBLEMS.some((p) => p.id === pid);
    this.navPage = 'Code';
    this.phoneStage = true;
    this.state = Object.assign(this.state, { theme: loadTheme(), pid, pbTab: 'problem', pbStory: init.story && hasScene, pbHint: 0, pbSol: pbSolSeen(pid), pbSel: null, pbArm: false,
      pbLeft: pbSeconds(pid), pbPaused: false, pbClockOff: false });
    if (hasScene) this.state.scene = pid;
    this.approaches = new ApproachPane(this, pid, { lang: () => this.runner.s.lang });
    this.sql = new SqlRunner(this, pid);
    this.runner.s.prefs = Object.assign({}, this.runner.s.prefs, { celebrate: false });
    this.vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
    this.stageSize();
    PB_INIT = null;
  }
  // One Run checks every test, so a single button is all the learner needs; a finished run is also an attempt in History.
  makeRunner() {
    const pid = pbInitial().pid;
    return new CodeRunner(this, TEST_SPECS[pid] ? pid : 'two-sum-ii', { single: true, runLabel: 'Run', langs: PB_LANGS, onResult: (id, mode, passed, total) => this.pbResult(id, mode, passed, total) });
  }
  pageKeysOn() { return !!this.state.pbStory && this.state.pbTab === 'problem'; }
  // How wide the story's stage may be: the left pane's width (45% from 1024px, the whole width below), less its padding, the scrollbar and the stage's border.
  stageSize() {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const pane = w >= 1024 ? Math.floor(w * 0.45) : w;
    const pad = w >= 640 ? 48 : 32, bar = w >= 1024 ? 16 : 0;
    STAGE_W = pane - pad - bar - 2 - 8;
  }
  componentDidMount() {
    super.componentDidMount();
    saveProblem(this.state.pid);
    this.pbSyncUrl();
    this.onSize = () => { if (window.innerWidth !== this.vw) { this.vw = window.innerWidth; this.stageSize(); this.setState({}); } };
    window.addEventListener('resize', this.onSize);
    // The Timed countdown: one tick a second, only while it is on, running and above zero.
    this.clockTimer = setInterval(() => {
      if (pbTimedOn() && !this.state.pbPaused && !this.state.pbClockOff && this.state.pbLeft > 0) this.setState({ pbLeft: this.state.pbLeft - 1 });
    }, 1000);
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    clearInterval(this.clockTimer);
    this.sql.unmount();
    clearTimeout(this.armTimer);
    window.removeEventListener('resize', this.onSize);
    setQuery(null);
  }
  pbSyncUrl() { setQuery(this.state.pid, this.state.pbStory && !!SCENES[this.state.pid]); }
  pbTop() { setTimeout(() => { try { const el = document.getElementById('pb-panel'); if (el) el.scrollTop = 0; } catch (e) {} }, 0); }
  // The problems of this one's group (pattern), in the sheet's order: Previous, Next and "4 of 75".
  pbGroup() {
    const g = CODE_GROUPS.find((x) => x.items.some((i) => i.id === this.state.pid)) || CODE_GROUPS[0];
    return { name: g.name, items: g.items, at: Math.max(0, g.items.findIndex((i) => i.id === this.state.pid)) };
  }
  pbNeighbour(d) {
    const g = this.pbGroup(), j = g.at + d;
    return j >= 0 && j < g.items.length ? g.items[j] : null;
  }
  pickProblem(pid) {
    if (!knownProblem(pid) || pid === this.state.pid) return;
    this.stop();
    saveProblem(pid);
    if (SQL_SPECS[pid]) this.sql.setProblem(pid); else this.runner.setProblem(pid);
    this.approaches.setProblem(pid);
    const hasScene = !!SCENES[pid] && PROBLEMS.some((p) => p.id === pid);
    const patch = { pid, pbTab: 'problem', pbHint: 0, pbSol: pbSolSeen(pid), pbSel: null, pbArm: false, pbLeft: pbSeconds(pid), pbPaused: false, pbClockOff: false, pbStory: this.state.pbStory && hasScene,
      step: 0, played: false, playing: false, run: null, ask: null, fb: null, lastAsk: -9 };
    if (hasScene) patch.scene = pid;
    this.setState(patch);
    this.pbSyncUrl();
    this.pbTop();
  }
  setTab(k) { if (k !== 'problem') this.stop(); this.setState({ pbTab: k, pbSel: null, pbArm: false }); this.pbTop(); }
  flipStory() {
    const on = !this.state.pbStory;
    this.stop();
    this.setState({ pbStory: on, step: 0, played: false, playing: false, ask: null, fb: null, lastAsk: -9 });
    this.pbSyncUrl();
  }
  // A finished Run: passing every test solves the problem; an attempt that is not the untouched starter goes in History.
  pbResult(pid, mode, passed, total) {
    try {
      const r = this.runner, lang = r.s.lang, code = r.editor ? r.editor.getDoc() : r.s.code;
      if (total > 0 && passed === total && DS.problemStatus(pid) !== 'done') DS.passCode(pid);
      if (mode !== 'program' && code !== r.starter(lang)) DS.addSubmission(pid, { lang, passed, total, code });
    } catch (e) {}
  }
  // The same for SQL, once per finished Submit (the SQL runner has no result hook, so the page notices it when it draws).
  pbLogSql() {
    const out = this.sql.s.out;
    if (!out || !out.done || out.logged || out.mode !== 'submit' || out.fatal || out.timeout) return;
    out.logged = true;
    try {
      const spec = this.sql.spec(), code = this.sql.editor ? this.sql.editor.getDoc() : this.sql.s.code;
      const passed = out.idx.filter((i, k) => out.results[k] && sqlJudge(spec, i, out.results[k].res).ok).length;
      DS.addSubmission(this.state.pid, { lang: 'sql', passed, total: out.idx.length, code });
    } catch (e) {}
  }
  // ---- hints and the solution ----
  hintList(pid) {
    if (SQL_SPECS[pid]) { const r = SHEET.find((x) => x.pid === pid); return r && r.hint ? [r.hint] : []; }
    const H = hintsFor(pid);
    return H ? H.hints : [];
  }
  confirmSolution() {
    try { window.localStorage.setItem(PB_SEEN + this.state.pid, '1'); } catch (e) {}
    this.setState({ pbSol: true });
  }
  // ---- history ----
  histVals(t) {
    const pid = this.state.pid, bad = t.diff.Hard[2];
    let list = [];
    try { list = DS.submissions(pid); } catch (e) {}
    const okAll = (x) => x.total > 0 && x.passed === x.total;
    const sub = this.state.pbSel ? list.find((x) => x.id === this.state.pbSel) : null;
    const say = (x) => (okAll(x) ? 'All ' + x.total + ' tests passed' : 'Not yet: ' + x.passed + ' of ' + x.total + ' tests passed');
    return {
      empty: !list.length, any: list.length > 0, listing: !sub, picked: !!sub,
      rows: list.map((x, i) => ({
        mark: okAll(x) ? '✓' : '✗', markFg: okAll(x) ? t.ok : bad, verdict: say(x), when: whenSubmitted(x.at), lang: pbLangName(x.lang),
        aria: 'Attempt ' + (list.length - i) + ', ' + whenSubmitted(x.at) + ', ' + pbLangName(x.lang) + ', ' + say(x),
        open: () => this.setState({ pbSel: x.id, pbArm: false })
      })),
      clear: () => this.armed(() => { try { DS.clearSubmissions(pid); } catch (e) {} this.setState({ pbSel: null }); }),
      clearLabel: this.state.pbArm ? 'Click again to clear' : 'Clear history',
      back: () => this.setState({ pbSel: null, pbArm: false }),
      when: sub ? whenSubmitted(sub.at) : '', lang: sub ? pbLangName(sub.lang) : '',
      verdict: sub ? say(sub) : '', verdictFg: sub && okAll(sub) ? t.ok : t.text,
      lines: sub ? sub.code.split('\n').map((code, i) => ({ n: i + 1, code })) : [],
      restore: () => sub && this.armed(() => this.restoreSub(sub)),
      restoreLabel: this.state.pbArm ? 'Click again to replace your code' : 'Restore this code'
    };
  }
  // Clear and restore throw things away: the first click only arms them for 3 seconds.
  armed(go) {
    clearTimeout(this.armTimer);
    if (!this.state.pbArm) { this.setState({ pbArm: true }); this.armTimer = setTimeout(() => this.setState({ pbArm: false }), 3000); return; }
    this.setState({ pbArm: false });
    go();
  }
  restoreSub(sub) {
    const pid = this.state.pid;
    if (SQL_SPECS[pid]) {
      storeCode(pid, 'sql', sub.code);
      if (this.sql.editor) this.sql.editor.setDoc(sub.code);
      this.sql.set({ code: sub.code });
    } else {
      const r = this.runner;
      if (sub.lang !== r.s.lang && PB_LANGS.includes(sub.lang)) r.setLang(sub.lang);
      storeCode(pid, r.s.lang, sub.code);
      if (r.editor) r.editor.setDoc(sub.code);
      r.set({ code: sub.code });
    }
    this.setState({ pbTab: 'problem', pbSel: null });
  }
  // ---- the tests panel ----
  // One line says where the learner stands; below it only the first test that fails is spelled out, then a chip for every test.
  testsVals(t, cr) {
    const r = this.runner, out = r.s.out, spec = r.spec(), bad = t.diff.Hard[2];
    const o = { title: 'Press Run to test your code', color: t.text, hasNote: false, note: '', hasMsg: false, msg: '', hasHelp: false, help: '', hasFail: false, fail: { title: '', input: '', expected: '', hasExpected: false, got: '', gotColor: t.text, hasLogs: false, logs: '' },
      hasConsole: false, console: [], hasChips: false, chips: [], hasPanels: false, panels: [], hasNext: false };
    if (!spec) return o;
    if (!cr.runnable) { o.title = 'This language cannot run this problem'; o.hasNote = true; o.note = cr.notRunnableMsg; return o; }
    if (!out) { if (r.s.busy) o.title = 'Running…'; return o; }
    if (!out.done) { o.title = 'Running…'; o.hasNote = !!r.s.status; o.note = r.s.status; return o; }
    if (out.fatal) { o.title = 'Your code did not run'; o.hasMsg = true; o.msg = cr.msg; o.hasHelp = cr.hasHelp; o.help = cr.help; return o; }
    if (out.timeout) { o.title = 'Not yet: your code ran too long'; o.hasMsg = true; o.msg = cr.msg; return o; }
    if (spec.program && !(spec.cases && spec.cases.length)) { o.title = 'Your program printed'; o.hasConsole = true; o.console = cr.console; return o; }
    const rows = cr.rows, total = rows.length, passed = rows.filter((x) => !x.failed).length, first = rows.find((x) => x.failed);
    if (!first) {
      o.title = 'All ' + total + ' tests pass'; o.color = t.ok;
      o.hasNext = !!this.pbNeighbour(1);
    } else {
      o.title = 'Not yet: ' + passed + ' of ' + total + ' tests pass';
      o.hasFail = true;
      o.fail = { title: first.title, input: first.input, expected: first.expected, hasExpected: first.verdict !== 'Error', got: first.got, gotColor: bad, hasLogs: first.hasLogs, logs: first.logs };
      o.hasHelp = cr.hasHelp; o.help = cr.help;
    }
    o.hasChips = total > 0;
    o.chips = rows.map((x) => ({ title: x.title, bad: !!x.failed, good: !x.failed, state: x.failed ? 'failed' : 'passed', fg: x.failed ? bad : t.ok }));
    return o;
  }
  sqlTestsVals(t, sq) {
    const o = { title: 'Press Run to test your code', color: t.text, hasNote: false, note: '', hasMsg: false, msg: '', hasHelp: false, help: '', hasFail: false, fail: { title: '', input: '', expected: '', hasExpected: false, got: '', gotColor: t.text, hasLogs: false, logs: '' },
      hasConsole: false, console: [], hasChips: false, chips: [], hasPanels: false, panels: [], hasNext: false };
    const out = this.sql.s.out;
    if (!out) { if (sq.busy) o.title = 'Running…'; return o; }
    if (!out.done) { o.title = 'Running…'; o.hasMsg = sq.hasMsg; o.msg = sq.msg; return o; }
    if (!sq.hasBadge) { o.title = out.timeout ? 'Not yet: your query ran too long' : 'Your query did not run'; o.hasMsg = sq.hasMsg; o.msg = sq.msg; return o; }
    const m = /^(\d+) \/ (\d+) datasets passed$/.exec(sq.badge);
    const ok = sq.badgeBg === t.okBg;
    if (m) o.title = ok ? 'All ' + m[2] + ' tests pass' : 'Not yet: ' + m[1] + ' of ' + m[2] + ' tests pass';
    else if (sq.badge === 'Matches') o.title = 'Your result matches. Press Submit to try the hidden tables.';
    else if (sq.badge === 'Error') o.title = 'Not yet: the query has an error';
    else o.title = 'Not yet: your result does not match';
    o.color = ok ? t.ok : t.text;
    o.hasMsg = sq.hasMsg; o.msg = sq.msg; o.hasPanels = sq.panels.length > 0; o.panels = sq.panels;
    return o;
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = Object.assign({}, THEMES[themeKey] || THEMES.max, STORY_EXTRA[themeKey] || STORY_EXTRA.paper);
    const pid = this.state.pid, tab = this.state.pbTab;
    const isSql = !!SQL_SPECS[pid];
    const spec = isSql ? null : TEST_SPECS[pid];
    const P = isSql ? sqlInfo(pid) : specInfo(pid);
    const hasScene = !isSql && !!SCENES[pid] && PROBLEMS.some((p) => p.id === pid);
    const showStory = hasScene && this.state.pbStory && tab === 'problem';
    const sv = super.renderVals();   // the story's values are always there (state.scene keeps the last story shown), so the markup's holes all resolve
    this.pbLogSql();
    const cr = this.runner.vals(t), sq = this.sql.vals(t);
    const H = isSql ? null : hintsFor(pid), hints = this.hintList(pid);
    const hintN = Math.min(this.state.pbHint, hints.length);
    const g = this.pbGroup(), prev = this.pbNeighbour(-1), next = this.pbNeighbour(1);
    const cat = PROBLEMS.find((p) => p.id === pid);
    const cos = cat && cat.cos ? cat.cos : [];
    const facts = isSql ? null : factsVals(t, pid);
    const apv = this.approaches.vals(t);
    const refLines = !isSql && spec ? planRefLines(pid, spec) : [];
    const hasSolution = apv.has || refLines.length > 0;
    const langs = isSql ? [] : PB_LANGS.filter((k) => specRuns(spec, k));
    const lang = this.runner.s.lang;
    const busy = isSql ? sq.busy : cr.busy;
    const tests = isSql ? this.sqlTestsVals(t, sq) : this.testsVals(t, cr);
    const mod = typeof paneMac === 'function' && paneMac() ? '⌘' : 'Ctrl';
    const posText = (g.at + 1) + ' of ' + g.items.length;
    return Object.assign({}, sv, {
      t, ...navVals(this, t, themeKey, 'Code'), cr, sq, ap: apv,
      pbBad: t.diff.Hard[2],
      pbBack: pbBackVals(),
      pbClock: (() => {
        const left = this.state.pbLeft, paused = this.state.pbPaused;
        return { show: pbTimedOn() && !this.state.pbClockOff, text: left > 0 ? pbClockText(left) : 'Time is up', aria: left > 0 ? pbClockText(left) + ' left' + (paused ? ', paused' : '') : 'Time is up',
          up: left <= 0 ? 'true' : 'false', toggle: () => this.setState({ pbPaused: !paused }), toggleLabel: paused ? 'Resume' : 'Pause', toggleOff: left <= 0,
          stop: () => this.setState({ pbClockOff: true }) };
      })(),
      pbPos: { text: posText, aria: 'Problem ' + posText + ' in ' + g.name },
      pbPrev: { off: !prev, aria: prev ? 'Previous problem: ' + prev.title : 'No previous problem', go: () => prev && this.pickProblem(prev.id) },
      pbNext: { off: !next, aria: next ? 'Next problem: ' + next.title : 'No next problem', go: () => next && this.pickProblem(next.id) },
      pbTabs: PB_TABS.map(([k, label]) => ({ label, id: 'pb-tab-' + k, sel: tab === k ? 'true' : 'false', idx: tab === k ? '0' : '-1', pick: () => this.setTab(k) })),
      pbTabId: 'pb-tab-' + tab,
      pbTabKey: (e) => {
        if (!e || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
        if (e.preventDefault) e.preventDefault();
        const i = PB_TABS.findIndex(([k]) => k === tab), j = (i + (e.key === 'ArrowRight' ? 1 : PB_TABS.length - 1)) % PB_TABS.length;
        this.setTab(PB_TABS[j][0]);
        setTimeout(() => { try { const el = document.getElementById('pb-tab-' + PB_TABS[j][0]); if (el) el.focus(); } catch (x) {} }, 0);
      },
      pbOnProblem: tab === 'problem', pbOnHints: tab === 'hints', pbOnSolution: tab === 'solution', pbOnHistory: tab === 'history',
      // the problem
      P, diffFg: t.diff[P.diff] ? t.diff[P.diff][2] : t.text, hasTime: !!P.time && !isSql,
      isSql, notSql: !isSql,
      hasCos: cos.length > 0, cos: cos.map((name) => ({ name })),
      ask: isSql ? SQL_SPECS[pid].ask : spec.ask,
      examples: isSql ? [] : spec.examples.map(([args, want], i) => ({ input: showArgs(spec, args), output: showValue(want), why: H && H.why[i] ? H.why[i] : '', hasWhy: !!(H && H.why[i]) })),
      hasCons: !!facts && facts.hasCons, cons: facts ? facts.cons : [],
      hasScene, pbSwitch: { on: hasScene && this.state.pbStory ? 'true' : 'false', flip: () => this.flipStory() },
      pbShowStory: showStory, pbShowStatement: !showStory,
      // hints, one at a time
      pbHasHints: hints.length > 0, pbNoHints: hints.length === 0,
      pbHintsShown: hints.slice(0, hintN).map((text, i) => ({ label: 'Hint ' + (i + 1) + ' of ' + hints.length, text })),
      pbMoreHints: hintN < hints.length, pbHintsDone: hints.length > 0 && hintN >= hints.length,
      pbNextHint: () => this.setState({ pbHint: Math.min(hints.length, hintN + 1) }),
      pbNextHintLabel: hintN ? 'Show hint ' + (hintN + 1) : 'Show the first hint',
      pbToSolution: () => this.setTab('solution'), pbToHints: () => this.setTab('hints'),
      // the solution: asks once per problem
      pbSolMissing: !hasSolution, pbSolAsk: hasSolution && !this.state.pbSol, pbSolShow: hasSolution && this.state.pbSol, pbSolYes: () => this.confirmSolution(),
      pbRefOnly: !apv.has && refLines.length > 0, pbRefKind: 'Reference solution in JavaScript', pbRefCode: refLines.join('\n'),
      pbHist: this.histVals(t),
      // the right side
      pbLangs: langs.map((k) => ({ label: k === 'js' ? 'JavaScript' : 'Python', on: lang === k ? 'true' : 'false', pick: () => this.runner.setLang(k) })),
      pbManyLangs: !isSql && langs.length > 1, pbOneLang: !isSql && langs.length === 1, pbLangName: langs.length ? pbLangName(langs[0]) : '',
      pbReset: isSql ? { label: sq.resetLabel, aria: sq.resetAria, go: sq.reset } : { label: cr.resetLabel, aria: cr.resetAria, go: cr.reset },
      pbT: tests, pbBusy: busy,
      pbRun: isSql ? sq.run : cr.run,
      pbRunOff: busy || (!isSql && !cr.runnable),
      pbRunLabel: busy ? 'Running…' : 'Run',
      pbRunTitle: 'Run every test (' + mod + ' + apostrophe)', pbRunKeys: isSql ? '' : cr.runKeysAria,
      pbRunNote: isSql ? this.sql.s.status : this.runner.s.status
    });
  }
}
