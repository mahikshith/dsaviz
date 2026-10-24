// ---- page ----
// Code page: the problem on the left, the shared code pane (CodeRunner) on the right.
// Opened with ?problem=<id>, or with the problem last chosen anywhere on the site.
// The picker lists every master sheet problem, grouped and ordered as the sheet is. A row opens the problem
// by its pid (shared/sheet.js). SQL problems (shared/sql_spec.js) swap the left side for the schema panel and
// the code pane for the SQL pane (shared/sql_pane.*).
// Left column, top to bottom: the statement, Input / Output / Constraints, the examples with a one-line why,
// "Aim for", the hint ladder (shared/hints.js), "Plan it first" (shared/plans.js), then "Still stuck? Watch the story".
function sqlInfo(id) { const q = SQL_SPECS[id]; return { id, title: q.title, diff: q.diff, pattern: 'SQL', story: null, time: null }; }
const knownProblem = (id) => !!(id && (TEST_SPECS[id] || SQL_SPECS[id]));
const CODE_GROUPS = SHEET_GROUPS.map(([name]) => ({ name, items: SHEET.filter((r) => r.pattern === name && knownProblem(r.pid)).map((r) => ({ id: r.pid, title: r.name })) }))
  .filter((g) => g.items.length);
const CODE_SOLVABLE = CODE_GROUPS.reduce((n, g) => n + g.items.length, 0);
const CODE_COUNT_LINE = SHEET.length + ' problems, ' + (CODE_SOLVABLE === SHEET.length ? 'all solvable here' : CODE_SOLVABLE + ' solvable here');
const HINT_NAMES = ['Nudge', 'Approach', 'Key trick'];
function queryProblem() {
  try { const q = new URLSearchParams(window.location.search).get('problem'); return knownProblem(q) ? q : null; } catch (e) { return null; }
}
function setQueryProblem(id) {
  try {
    const u = new URL(window.location.href);
    if (id) u.searchParams.set('problem', id); else u.searchParams.delete('problem');
    window.history.replaceState(window.history.state, '', u.pathname + u.search + u.hash);
  } catch (e) {}
}
// The statement's format slot. Specs may carry input, output, constraints (a list) and aim (target complexity),
// either on the spec itself or under spec.format; this page only renders them.
function statementExtras(spec) {
  const f = (spec && (spec.format || spec)) || {};
  const list = (x) => (Array.isArray(x) ? x : x ? [x] : []).map(String).filter(Boolean);
  return { input: f.input ? String(f.input) : '', output: f.output ? String(f.output) : '', constraints: list(f.constraints), aim: f.aim ? String(f.aim) : '' };
}
function problemSolved(pid) { try { return typeof DS !== 'undefined' && DS.problemStatus(pid) === 'done'; } catch (e) { return false; } }

class Component extends DCLogic {
  constructor(props) {
    super(props);
    let last = null;
    try { last = window.localStorage.getItem(PROBLEM_KEY); } catch (e) {}
    const pid = queryProblem() || (knownProblem(last) ? last : 'two-sum-ii');
    this.state = Object.assign({ theme: loadTheme(), pid }, this.freshProblem(pid));
    this.runner = new CodeRunner(this, TEST_SPECS[pid] ? pid : 'two-sum-ii');
    this.sql = new SqlRunner(this, pid);
  }
  // Per-problem view state: the plan is open until the problem is solved; hints, the solution and the order game start closed.
  freshProblem(pid) { return { planOpen: !problemSolved(pid), solOpen: false, hintN: 0, hover: -1, ord: null, ordMsg: '', ordOk: false, dragAt: -1, inserted: false }; }
  componentDidMount() {
    listenTheme(this);
    this.runner.mount();
    saveProblem(this.state.pid);
    setQueryProblem(this.state.pid);
  }
  componentWillUnmount() {
    unlistenTheme(this);
    this.runner.unmount();
    this.sql.unmount();
    setQueryProblem(null);
  }
  pickProblem(pid) {
    if (!knownProblem(pid) || pid === this.state.pid) return;
    saveProblem(pid);
    setQueryProblem(pid);
    if (SQL_SPECS[pid]) this.sql.setProblem(pid); else this.runner.setProblem(pid);
    this.setState(Object.assign({ pid }, this.freshProblem(pid)));
  }
  // ---- "Order the steps": the plan shuffled; move steps with drag, or with the Up and Down buttons ----
  startOrder() { const plan = planFor(this.state.pid); if (plan) this.setState({ ord: planShuffle(this.state.pid, plan.steps.length), ordMsg: '', ordOk: false, planOpen: true }); }
  moveStep(i, d) {
    const ord = (this.state.ord || []).slice(), j = i + d;
    if (j < 0 || j >= ord.length) return;
    [ord[i], ord[j]] = [ord[j], ord[i]];
    this.setState({ ord, ordMsg: '', ordOk: false });
    // keep keyboard focus with the step that moved
    setTimeout(() => {
      try {
        const el = document.getElementById('ord-' + (d < 0 ? 'up' : 'down') + '-' + j) || document.getElementById('ord-' + (d < 0 ? 'down' : 'up') + '-' + j);
        if (el && !el.disabled) el.focus(); else { const o = document.getElementById('ord-' + (d < 0 ? 'down' : 'up') + '-' + j); if (o) o.focus(); }
      } catch (e) {}
    }, 0);
  }
  dropStep(to) {
    const from = this.state.dragAt, ord = (this.state.ord || []).slice();
    if (from < 0 || from === to || to < 0 || to >= ord.length) { this.setState({ dragAt: -1 }); return; }
    const [x] = ord.splice(from, 1);
    ord.splice(to, 0, x);
    this.setState({ ord, dragAt: -1, ordMsg: '', ordOk: false });
  }
  checkOrder() {
    const plan = planFor(this.state.pid), ord = this.state.ord;
    if (!plan || !ord) return;
    const ok = planOrderRight(plan, ord);
    this.setState({ ordOk: ok, ordMsg: ok ? 'Right order. That is the plan.' : planOrderScore(plan, ord) + ' of ' + ord.length + ' steps are in the right place. Keep moving them.' });
  }
  insertPlan() {
    const plan = planFor(this.state.pid);
    if (!plan) return;
    if (SQL_SPECS[this.state.pid]) this.sql.insertPlan(plan); else this.runner.insertPlan(plan);
    this.setState({ inserted: true });
  }
  planVals(t, P) {
    const pid = this.state.pid, plan = planFor(pid);
    if (!plan) return { has: false };
    const spec = TEST_SPECS[pid] || SQL_SPECS[pid];
    const ref = planRefLines(pid, spec);
    const hv = this.state.hover >= 0 ? plan.steps[this.state.hover] : null;
    const isSql = !!SQL_SPECS[pid];
    const ord = this.state.ord;
    const ordering = !!ord;
    const steps = plan.steps.map(([text, a, b], i) => {
      const on = i === this.state.hover;
      return {
        n: i + 1, text, bg: on ? t.hl : 'transparent', border: on ? t.accent : 'transparent',
        enter: () => this.setState({ hover: i }), leave: () => { if (this.state.hover === i) this.setState({ hover: -1 }); }
      };
    });
    return {
      has: true, goal: plan.goal, count: plan.steps.length + ' steps',
      open: this.state.planOpen, openX: this.state.planOpen ? 'true' : 'false', toggle: () => this.setState({ planOpen: !this.state.planOpen }),
      listing: !ordering, steps,
      insert: () => this.insertPlan(), insertLabel: this.state.inserted ? 'Plan is in your code' : 'Insert plan as comments',
      insertAria: 'Put the ' + plan.steps.length + ' plan steps into your ' + (isSql ? 'query' : 'code') + ' as comments',
      offerOrder: planOffersOrder(pid, P.diff) && !ordering, startOrder: () => this.startOrder(),
      // the order game
      ordering,
      ord: ordering ? ord.map((k, i) => ({
        text: plan.steps[k][0], pos: i + 1, upId: 'ord-up-' + i, downId: 'ord-down-' + i,
        up: () => this.moveStep(i, -1), down: () => this.moveStep(i, 1), noUp: i === 0, noDown: i === ord.length - 1,
        upAria: 'Move step ' + (i + 1) + ' up', downAria: 'Move step ' + (i + 1) + ' down',
        drag: (e) => { try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(i)); } catch (x) {} this.setState({ dragAt: i }); },
        over: (e) => { if (e && e.preventDefault) e.preventDefault(); },
        drop: (e) => { if (e && e.preventDefault) e.preventDefault(); this.dropStep(i); },
        end: () => this.setState({ dragAt: -1 }),
        mark: this.state.ordMsg && k === i ? '✓' : '', op: this.state.dragAt === i ? '0.5' : '1'
      })) : [],
      check: () => this.checkOrder(), stopOrder: () => this.setState({ ord: null, ordMsg: '', ordOk: false }),
      hasOrdMsg: !!this.state.ordMsg, ordMsg: this.state.ordMsg, ordBg: this.state.ordOk ? t.okBg : t.sunk,
      stopLabel: this.state.ordOk ? 'Done' : 'Stop ordering',
      // the reference solution, folded by default
      solOpen: this.state.solOpen, solX: this.state.solOpen ? 'true' : 'false',
      toggleSol: () => this.setState({ solOpen: !this.state.solOpen }),
      solLabel: this.state.solOpen ? 'Hide solution' : 'Show solution',
      solKind: isSql ? 'Reference query' : 'Reference solution in JavaScript',
      solHint: hv ? 'Step ' + (this.state.hover + 1) + ' is ' + (hv[1] === hv[2] ? 'line ' + (hv[1] + 1) : 'lines ' + (hv[1] + 1) + ' to ' + (hv[2] + 1)) + '.' : 'Point at a step, or tab to it, to light its lines.',
      ref: ref.map((code, i) => {
        const lit = !!hv && i >= hv[1] && i <= hv[2];
        return { n: i + 1, code, bg: lit ? t.hl : 'transparent', bar: lit ? t.accent : 'transparent', num: lit ? t.accent : t.muted };
      })
    };
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const isSql = !!SQL_SPECS[this.state.pid];
    const spec = isSql ? null : TEST_SPECS[this.state.pid];
    const P = isSql ? sqlInfo(this.state.pid) : specInfo(this.state.pid);
    const X = statementExtras(isSql ? SQL_SPECS[this.state.pid] : spec);
    const H = isSql ? null : hintsFor(this.state.pid);
    const hintN = this.state.hintN;
    return {
      t, ...navVals(this, t, themeKey, 'Code'), themeBtns: themeButtons(this, themeKey, t),
      cr: this.runner.vals(t), sq: this.sql.vals(t),
      isSql, notSql: !isSql, asideOverflow: 'auto',
      P, ask: isSql ? SQL_SPECS[this.state.pid].ask : spec.ask, diffBg: t.diff[P.diff][1], diffFg: t.diff[P.diff][2],
      keepProblem: () => saveProblem(this.state.pid),
      pid: this.state.pid,
      groups: CODE_GROUPS.map((g) => ({ label: g.name + ' (' + g.items.length + ')', items: g.items.map((p) => ({ id: p.id, label: p.title })) })),
      testCount: CODE_COUNT_LINE,
      hasStory: !!P.story, noStory: !P.story, hasTime: !!P.time,
      storyHref: 'Story.dc.html?from=code',
      kicker: P.story ? 'Story · ' + P.story : isSql ? 'SQL · SQLite' : P.pattern,
      pickProblem: (e) => this.pickProblem(e && e.target ? e.target.value : e),
      // the format slot (filled by the specs when they carry it)
      hasFormat: !!(X.input || X.output || X.constraints.length), fmtInput: X.input, hasFmtInput: !!X.input, fmtOutput: X.output, hasFmtOutput: !!X.output,
      hasConstraints: X.constraints.length > 0, constraints: X.constraints.map((c) => ({ c })), hasAim: !!X.aim, aim: X.aim,
      examples: isSql ? [] : spec.examples.map(([args, want], i) => ({ input: showArgs(spec, args), output: showValue(want), why: H && H.why[i] ? H.why[i] : '', hasWhy: !!(H && H.why[i]) })),
      // the hint ladder: nudge, approach, key trick, one at a time
      hasHints: !!H, hintsShown: H ? H.hints.slice(0, hintN).map((h, i) => ({ name: HINT_NAMES[i], text: h, n: i + 1 })) : [],
      moreHints: !!H && hintN < 3, nextHint: () => this.setState({ hintN: Math.min(3, hintN + 1) }),
      nextHintLabel: hintN ? 'Next hint: ' + HINT_NAMES[Math.min(2, hintN)].toLowerCase() : 'Show a hint',
      hintCount: hintN + ' of 3',
      plan: this.planVals(t, P)
    };
  }
}
