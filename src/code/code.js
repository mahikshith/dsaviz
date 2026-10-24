// ---- page ----
// Code page: the problem on the left, the shared code pane (CodeRunner) on the right.
// Opened with ?problem=<id>, or with the problem last chosen anywhere on the site.
// The picker lists every problem with a spec, grouped by pattern in library order, easiest first, then the SQL
// problems: those swap the left side for the schema panel and the code pane for the SQL pane (shared/sql_pane.*).
const CODE_GROUP_ORDER = PATTERNS.map((p) => p[0]).concat(['Linked Lists', 'Monotonic Stack & Queue', 'Trees', 'Graphs', 'Tries', 'Sorting', 'Design', 'String Algorithms', 'Bit Manipulation', 'Math']);
const CODE_DIFF_ORDER = { Starter: 0, Easy: 1, Medium: 2, Hard: 3 };
const CODE_GROUPS = CODE_GROUP_ORDER.map((name) => ({
  name,
  items: Object.keys(TEST_SPECS).map(specInfo).filter((p) => p.pattern === name)
    .sort((a, b) => CODE_DIFF_ORDER[a.diff] - CODE_DIFF_ORDER[b.diff] || a.title.localeCompare(b.title))
})).filter((g) => g.items.length);
// SQL problems (shared/sql_spec.js) come last, in the master sheet's order, and open the SQL mode.
CODE_GROUPS.push({ name: 'SQL', items: Object.keys(SQL_SPECS).map(sqlInfo) });
const CODE_COUNT = Object.keys(TEST_SPECS).length;
const SQL_COUNT = Object.keys(SQL_SPECS).length;
function sqlInfo(id) { const q = SQL_SPECS[id]; return { id, title: q.title, n: q.n, diff: q.diff, pattern: 'SQL', story: null, time: null }; }
const knownProblem = (id) => !!(id && (TEST_SPECS[id] || SQL_SPECS[id]));
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
      groups: CODE_GROUPS.map((g) => ({ label: g.name + ' (' + g.items.length + ')', items: g.items.map((p) => ({ id: p.id, label: p.title + (p.story || p.pattern === 'SQL' ? '' : ' · no story yet') })) })),
      testCount: 'Runnable tests: ' + CODE_COUNT + ' problems + ' + SQL_COUNT + ' SQL',
      hasStory: !!P.story, noStory: !P.story, hasTime: !!P.time,
      kicker: 'LeetCode ' + P.n + (P.story ? ' · ' + P.story : isSql ? ' · SQLite' : ''),
      pickProblem: (e) => this.pickProblem(e && e.target ? e.target.value : e),
      examples: isSql ? [] : spec.examples.map(([args, want]) => ({ input: showArgs(spec, args), output: showValue(want) }))
    };
  }
}
