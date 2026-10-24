// ---- page ----
// Code page: the problem on the left, the shared code pane (CodeRunner) on the right.
// Opened with ?problem=<id>, or with the problem last chosen anywhere on the site.
// The picker lists every master sheet problem, grouped and ordered as the sheet is. A row opens the problem
// by its pid (shared/sheet.js). SQL problems (shared/sql_spec.js) swap the left side for the schema panel and
// the code pane for the SQL pane (shared/sql_pane.*).
function sqlInfo(id) { const q = SQL_SPECS[id]; return { id, title: q.title, diff: q.diff, pattern: 'SQL', story: null, time: null }; }
const knownProblem = (id) => !!(id && (TEST_SPECS[id] || SQL_SPECS[id]));
const CODE_GROUPS = SHEET_GROUPS.map(([name]) => ({ name, items: SHEET.filter((r) => r.pattern === name && knownProblem(r.pid)).map((r) => ({ id: r.pid, title: r.name })) }))
  .filter((g) => g.items.length);
const CODE_SOLVABLE = CODE_GROUPS.reduce((n, g) => n + g.items.length, 0);
const CODE_COUNT_LINE = SHEET.length + ' problems, ' + (CODE_SOLVABLE === SHEET.length ? 'all solvable here' : CODE_SOLVABLE + ' solvable here');
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

class Component extends DCLogic {
  constructor(props) {
    super(props);
    let last = null;
    try { last = window.localStorage.getItem(PROBLEM_KEY); } catch (e) {}
    const pid = queryProblem() || (knownProblem(last) ? last : 'two-sum-ii');
    this.state = { theme: loadTheme(), pid };
    this.runner = new CodeRunner(this, TEST_SPECS[pid] ? pid : 'two-sum-ii');
    this.sql = new SqlRunner(this, pid);
  }
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
    this.setState({ pid });
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const isSql = !!SQL_SPECS[this.state.pid];
    const spec = isSql ? null : TEST_SPECS[this.state.pid];
    const P = isSql ? sqlInfo(this.state.pid) : specInfo(this.state.pid);
    return {
      t, ...navVals(this, t, themeKey, 'Code'), themeBtns: themeButtons(this, themeKey, t),
      cr: this.runner.vals(t), sq: this.sql.vals(t),
      isSql, notSql: !isSql, asideOverflow: isSql ? 'auto' : 'hidden',
      P, ask: isSql ? SQL_SPECS[this.state.pid].ask : spec.ask, diffBg: t.diff[P.diff][1], diffFg: t.diff[P.diff][2],
      keepProblem: () => saveProblem(this.state.pid),
      pid: this.state.pid,
      groups: CODE_GROUPS.map((g) => ({ label: g.name + ' (' + g.items.length + ')', items: g.items.map((p) => ({ id: p.id, label: p.title })) })),
      testCount: CODE_COUNT_LINE,
      hasStory: !!P.story, noStory: !P.story, hasTime: !!P.time,
      kicker: P.story ? 'Story · ' + P.story : isSql ? 'SQL · SQLite' : P.pattern,
      pickProblem: (e) => this.pickProblem(e && e.target ? e.target.value : e),
      examples: isSql ? [] : spec.examples.map(([args, want]) => ({ input: showArgs(spec, args), output: showValue(want) }))
    };
  }
}
