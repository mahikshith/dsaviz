// ---- page ----
// Today's revisit queue: anything you rated in a story that is due, topped up from stories you've walked.
const WALKED = ['valid-anagram', 'longest-substring', 'two-sum-ii', 'contains-duplicate', 'valid-palindrome', 'two-sum', 'best-time-stock', 'container'];
const AGO = ['6 days ago', '3 days ago', '9 days ago', '2 weeks ago', '4 days ago'];
const DISTRACT = ['Two Pointers', 'Sliding Window', 'Hash Map', 'Binary Search', 'Stack', 'Prefix Sum', 'Greedy'];
const RATES = [['Again', 'in 10 min', 0], ['Hard', 'in 2 days', 2], ['Good', 'in 5 days', 5], ['Easy', 'in 12 days', 12]];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const BASE_WEEK = [0, 3, 4, 2, 6, 1, 3];
function buildQueue() {
  const deck = loadDeck();
  const due = Object.keys(deck).filter((id) => deck[id] && deck[id].due <= 1 && PROBLEMS.some((p) => p.id === id));
  const ids = [];
  due.concat(WALKED).forEach((id) => { if (!ids.includes(id)) ids.push(id); });
  return ids.slice(0, 5);
}

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { theme: loadTheme(), queue: buildQueue(), pos: 0, picked: null, results: [], saved: loadSaved() };
  }
  componentDidMount() { listenTheme(this); }
  componentWillUnmount() { unlistenTheme(this); }
  rate(label, days) {
    const id = this.state.queue[this.state.pos];
    const deck = loadDeck();
    deck[id] = { due: days, rated: label };
    storeDeck(deck);
    const right = this.state.picked === PROBLEMS.find((p) => p.id === id).pattern;
    this.setState({ results: this.state.results.concat([{ id, right, label, days }]), pos: this.state.pos + 1, picked: null });
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'paper';
    const t = THEMES[themeKey] || THEMES.paper;
    const Q = this.state.queue.map((id) => PROBLEMS.find((p) => p.id === id));
    const pos = Math.min(this.state.pos, Q.length - 1);
    const P = Q[pos];
    const done = this.state.pos >= Q.length;
    const patIdx = PATTERNS.findIndex(([n]) => n === P.pattern);
    const pat = PATTERNS[patIdx];
    const picked = this.state.picked;
    const right = picked === P.pattern;
    // four options: the right one plus three neighbours from the distractor list, in a fixed order per card
    const others = DISTRACT.filter((n) => n !== P.pattern);
    const opts = [P.pattern, others[pos % others.length], others[(pos + 2) % others.length], others[(pos + 4) % others.length]];
    const order = [[0, 1, 2, 3], [1, 0, 3, 2], [2, 3, 0, 1], [3, 2, 1, 0], [1, 3, 0, 2]][pos % 5].map((i) => opts[i]);
    const results = this.state.results;
    const xp = results.reduce((s, r) => s + (r.right ? 10 : 4), 0) + (done ? 10 : 0);
    const firstSentence = P.synopsis.split(/(?<=[.?!])\s/)[0];
    const now = new Date();
    const week = BASE_WEEK.map((n, i) => (i === 0 ? Q.length - Math.min(this.state.pos, Q.length) : n) + results.filter((r) => r.days === i).length);
    const maxW = Math.max(...week, 1);
    const correct = results.filter((r) => r.right).length;
    const STRENGTH = [['Two Pointers', 92], ['Hash Map', 81], ['Sliding Window', 64], ['Binary Search', 38], ['Stack', 22]];
    return {
      t, themeBtns: themeButtons(this, themeKey, t),
      today: DAYS[now.getDay()] + ' ' + now.getDate() + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][now.getMonth()],
      headline: done ? 'All caught up. Your library is fresh.' : Q.length - this.state.pos + ' stories are fading. Bring them back in about ' + Math.max(2, (Q.length - this.state.pos) * 1.2).toFixed(0) + ' minutes.',
      progressLabel: done ? Q.length + ' / ' + Q.length + ' done' : 'Card ' + (pos + 1) + ' of ' + Q.length,
      xp,
      queue: Q.map((p, i) => {
        const r = results[i];
        const state = r ? (r.right ? 'right' : 'wrong') : i === this.state.pos ? 'now' : 'todo';
        return {
          story: p.story,
          bg: state === 'right' ? t.ok : state === 'wrong' ? t.left : state === 'now' ? t.accent : t.sunk,
          mark: state === 'right' ? '✓' : state === 'wrong' ? '↺' : String(i + 1),
          dotBg: state === 'right' ? t.ok : state === 'wrong' ? t.warnBg : state === 'now' ? t.accent : t.sunk,
          dotFg: state === 'right' ? t.onAccent : state === 'now' ? t.onAccent : t.text,
          note: r ? (r.right ? 'Remembered' : 'Mixed up') + ' · back ' + RATES.find(([l]) => l === r.label)[1] : state === 'now' ? 'Now' : 'Last walked ' + AGO[i % AGO.length]
        };
      }),
      inSession: !done, sessionDone: done,
      card: {
        story: P.story, n: P.n, diff: P.diff, dBg: t.diff[P.diff][1], dFg: t.diff[P.diff][2], ago: AGO[pos % AGO.length],
        cue: firstSentence, synopsis: P.synopsis, initial: pat[2][0], companion: pat[2], role: pat[3],
        href: P.animated ? 'Story.dc.html' : 'Briefing.dc.html',
        replay: P.animated ? 'Replay the animated story →' : 'Read the briefing again →',
        go: () => saveProblem(P.id)
      },
      options: order.map((name) => {
        const on = picked === name, isRight = name === P.pattern;
        const show = picked !== null;
        return {
          name, on, tag: (PATTERNS.find(([n]) => n === name) || ['', ''])[1],
          border: show && isRight ? t.ok : on ? t.left : t.line,
          bg: show && isRight ? t.okBg : on ? t.warnBg : t.surface,
          pick: () => { if (this.state.picked === null) this.setState({ picked: name }); }
        };
      }),
      answered: picked !== null,
      fbTitle: right ? 'Yes — ' + P.pattern + '. ' + pat[1] + '.' : 'Not quite. This one is ' + P.pattern + ': ' + pat[1].toLowerCase() + '.',
      fbBg: right ? t.okBg : t.sunk,
      rates: RATES.map(([label, when, days]) => ({ label, when, bg: t.surface, pick: () => this.rate(label, days) })),
      doneTitle: correct + ' of ' + Q.length + ' remembered.',
      doneLine: 'Every story you rated is scheduled: the ones you knew come back later, the shaky ones come back soon. Your streak is safe for today.',
      doneStats: [[correct + '/' + Q.length, 'patterns named from the story alone'], ['+' + xp, 'XP earned'], [String(week[1]), 'cards due tomorrow']].map(([v, k]) => ({ v, k })),
      restart: () => this.setState({ pos: 0, picked: null, results: [], queue: buildQueue() }),
      week: week.map((n, i) => {
        const d = new Date(now); d.setDate(now.getDate() + i);
        return { n, h: Math.round((n / maxW) * 84) + 2, d: i === 0 ? 'Today' : DAYS[d.getDay()], color: i === 0 ? t.accent : t.line2, fg: i === 0 ? t.text : t.muted, weight: i === 0 ? '700' : '500' };
      }),
      weekTotal: week.reduce((a, b) => a + b, 0),
      strength: STRENGTH.map(([name, v]) => {
        const bump = results.filter((r) => r.right && PROBLEMS.find((p) => p.id === r.id).pattern === name).length * 3;
        const pct = Math.min(99, v + bump);
        return { name, pct: pct + '%', color: pct > 75 ? t.ok : pct > 50 ? t.diff.Medium[0] : t.left, fg: pct > 75 ? t.ok : t.muted };
      }),
      saved: this.state.saved.map((id) => PROBLEMS.find((p) => p.id === id)).filter(Boolean).map((p) => ({ story: p.story, pattern: p.pattern, href: p.animated ? 'Story.dc.html' : 'Briefing.dc.html', go: () => saveProblem(p.id) })),
      noSaved: this.state.saved.length === 0
    };
  }
}
