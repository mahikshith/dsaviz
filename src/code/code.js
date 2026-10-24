// ---- page ----
// Code page: the problem on the left, the shared code pane (CodeRunner) on the right.
// Opened with ?problem=<id>, or with the problem last chosen anywhere on the site.
// The picker lists every problem with a spec, grouped by pattern in library order, easiest first.
const CODE_GROUP_ORDER = PATTERNS.map((p) => p[0]).concat(['Trees', 'Graphs', 'Tries', 'Bit Manipulation', 'Math']);
const CODE_DIFF_ORDER = { Starter: 0, Easy: 1, Medium: 2, Hard: 3 };
const CODE_GROUPS = CODE_GROUP_ORDER.map((name) => ({
  name,
  items: Object.keys(TEST_SPECS).map(specInfo).filter((p) => p.pattern === name)
    .sort((a, b) => CODE_DIFF_ORDER[a.diff] - CODE_DIFF_ORDER[b.diff] || a.title.localeCompare(b.title))
})).filter((g) => g.items.length);
const CODE_COUNT = Object.keys(TEST_SPECS).length;
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
    const P = specInfo(this.state.pid);
    return {
      t, ...navVals(this, t, themeKey, 'Code'), themeBtns: themeButtons(this, themeKey, t),
      cr: this.runner.vals(t),
      P, ask: spec.ask, diffBg: t.diff[P.diff][1], diffFg: t.diff[P.diff][2],
      keepProblem: () => saveProblem(this.state.pid),
      pid: this.state.pid,
      groups: CODE_GROUPS.map((g) => ({ label: g.name + ' (' + g.items.length + ')', items: g.items.map((p) => ({ id: p.id, label: p.title + (p.story ? '' : ' · no story yet') })) })),
      testCount: 'Runnable tests: ' + CODE_COUNT + ' problems',
      hasStory: !!P.story, noStory: !P.story, hasTime: !!P.time,
      kicker: 'LeetCode ' + P.n + (P.story ? ' · ' + P.story : ''),
      pickProblem: (e) => this.pickProblem(e && e.target ? e.target.value : e),
      examples: spec.examples.map(([args, want]) => ({ input: showArgs(spec, args), output: showValue(want) }))
    };
  }
}
