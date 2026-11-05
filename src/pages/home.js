// ---- page ----
// Home (pages/Home.dc.html). Markup: src/pages/home_body.html. Data: ROADMAP (scripts/build_roadmap_page.js), SHEET, PROBLEMS and PATTERNS, progress from DS.
// Two views of one page, chosen by whether the learner has done anything yet:
//   New visitor   one plain line about the site, one lime "Start here" button (the first Start here lesson) and three plain links.
//   Returning     the next lesson with its track and a lime "Continue" button, then four equal tiles: lessons done, problems solved,
//                 streak (days) and medals; then, only if something is due, one "Due for review" line that opens Problems with that filter.
// The next lesson is the first lesson not done, in Roadmap order: Start here, DSA concepts, Git, System design, AI & ML (the same lesson the
// Roadmap marks "Up next" in that track). Lessons done counts those five tracks, as the Roadmap does. Problems solved uses the Problems page rule
// (ticked, passed on the Problem page, or its story finished). Medals are the ones DS.medals() has awarded (bronze, silver or gold).
// Opening a lesson writes the key the lesson page reads (SEARCH_TYPES in shared/search.js), as the Roadmap and a search result do.
const HM_TRACKS = [['start', 'Start here', 'Chapter.dc.html'], ['dsa', 'DSA concepts', 'ConceptLesson.dc.html'], ['git', 'Git', 'Git.dc.html'],
  ['sd', 'System design', 'SDLesson.dc.html'], ['ai', 'AI & ML', 'AILesson.dc.html']];
function hmOpen(type, id) { try { window.localStorage.setItem(SEARCH_TYPES[type][2], id); } catch (e) {} }
// Every lesson of the five tracks in teaching order: { type, id, title, track, href, done }.
function hmLessons() {
  const done = {};
  try { DS.lessons().ids.forEach((i) => { done[i] = 1; }); } catch (e) {}
  let startDone = {};
  try { startDone = DS.start().done || {}; } catch (e) {}
  const out = [];
  HM_TRACKS.forEach(([key, track, page]) => {
    const rows = key === 'start' ? ROADMAP.start.reduce((a, ch) => a.concat(ch.lessons), []) : ROADMAP[key];
    rows.forEach(([id, title]) => out.push({ type: key, id, title, track, done: key === 'start' ? !!startDone[id] : !!done[key + ':' + id],
      href: page + (key === 'start' ? '?ch=' + id : '') }));
  });
  return out;
}
// Problems solved: the same rule as the Problems page.
function hmSolved() {
  const ids = new Set();
  try { DS.codePasses().ids.forEach((i) => ids.add(i)); DS.stories().ids.forEach((i) => ids.add(i)); } catch (e) {}
  let ticks = {};
  try { ticks = DS.sheet().done || {}; } catch (e) {}
  return SHEET.filter((r) => ticks[r.id] || ids.has(r.pid) || (r.story && ids.has(r.story))).length;
}
// Problems due for review today: the rows the Problems page shows under "Due for review".
function hmDue() {
  const out = new Set();
  try {
    DS.reviewDue().forEach((c) => {
      if (c.kind === 'sheet') out.add(c.id.replace(/^sheet:/, ''));
      else if (c.kind === 'story') SHEET.forEach((r) => { if (r.story === c.id || r.pid === c.id) out.add(r.id); });
    });
  } catch (e) {}
  return out.size;
}

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { theme: loadTheme(), user: loadUser(), drawer: false };
  }
  componentDidMount() { listenTheme(this); }
  componentWillUnmount() { unlistenTheme(this); }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const lessons = hmLessons();
    const doneN = lessons.filter((l) => l.done).length;
    const solved = hmSolved();
    let streak = 0, today = false;
    try { const s = DS.streak(); streak = s.current; today = s.activeToday; } catch (e) {}
    let medalsEarned = 0, medalsTotal = 0;
    try { const m = DS.medals(PROBLEMS, PATTERNS); medalsTotal = m.length; medalsEarned = m.filter((x) => x.tier).length; } catch (e) {}
    const isNew = !doneN && !solved && !streak && !medalsEarned;
    const first = lessons[0];
    const up = lessons.find((l) => !l.done);
    const pct = (n, total) => (total ? Math.min(100, Math.round((n / total) * 100)) : 0);
    const go = (l) => () => hmOpen(l.type, l.id);
    const tile = (key, num, name, note, total) => ({ key, num: String(num), name, note, total: total || 0, hasBar: !!total, pct: pct(num, total) });
    const due = hmDue();
    const first1 = SHEET[0];
    return {
      t, ...navVals(this, t, themeKey, 'Home'),
      isNew, isBack: !isNew,
      intro: { title: 'Learn to code from zero', line: 'Short lessons and practice problems you run in your browser, from your first program to data structures, system design and AI.' },
      start: { href: first.href, go: go(first) },
      links: [{ label: 'Roadmap', href: 'Patterns.dc.html' }, { label: 'Problems', href: 'Sheet.dc.html' }, { label: 'Try the first problem', href: first1 ? first1.href : 'Sheet.dc.html' }],
      next: up ? { kicker: 'Up next in ' + up.track, title: up.title, href: up.href, go: go(up), button: 'Continue' }
        : { kicker: 'Every lesson is done', title: 'Keep going with problems', href: 'Sheet.dc.html', go: () => {}, button: 'Open Problems' },
      tiles: [
        tile('lessons', doneN, 'Lessons done', 'of ' + lessons.length, lessons.length),
        tile('problems', solved, 'Problems solved', 'of ' + SHEET.length, SHEET.length),
        tile('streak', streak, 'Day streak', streak ? (today ? 'You did something today' : 'Do one thing today to keep it') : 'Do one thing today to start one'),
        tile('medals', medalsEarned, 'Medals', medalsEarned ? 'of ' + medalsTotal : 'Finish a track to earn one', medalsTotal)
      ],
      due: { show: due > 0, text: 'Due for review: ' + due + (due === 1 ? ' problem' : ' problems') }
    };
  }
}
