// ---- page ----
// Code page: the problem on the left, the shared code pane (CodeRunner) on the right.
// Opened with ?problem=<id>, or with the problem last chosen anywhere on the site.
const CODE_PROBLEMS = PROBLEMS.filter((p) => TEST_SPECS[p.id]);
function queryProblem() {
  try { const q = new URLSearchParams(window.location.search).get('problem'); return TEST_SPECS[q] ? q : null; } catch (e) { return null; }
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
    const last = loadProblem();
    const pid = queryProblem() || (last && TEST_SPECS[last.id] ? last.id : 'two-sum-ii');
    this.state = { theme: loadTheme(), pid };
    this.runner = new CodeRunner(this, pid);
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
    setQueryProblem(null);
  }
  pickProblem(pid) {
    if (!TEST_SPECS[pid] || pid === this.state.pid) return;
    saveProblem(pid);
    setQueryProblem(pid);
    this.runner.setProblem(pid);
    this.setState({ pid });
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const spec = TEST_SPECS[this.state.pid];
    const P = PROBLEMS.find((p) => p.id === this.state.pid);
    return {
      t, themeBtns: themeButtons(this, themeKey, t),
      cr: this.runner.vals(t),
      P, ask: spec.ask, diffBg: t.diff[P.diff][1], diffFg: t.diff[P.diff][2],
      keepProblem: () => saveProblem(this.state.pid),
      pid: this.state.pid,
      problems: CODE_PROBLEMS.map((p) => ({ id: p.id, label: p.title })),
      pickProblem: (e) => this.pickProblem(e && e.target ? e.target.value : e),
      examples: spec.examples.map(([args, want]) => ({ input: showArgs(spec, args), output: showValue(want) }))
    };
  }
}
