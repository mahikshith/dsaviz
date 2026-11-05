// The course front, one layout and one view model for four pages: Start here (Start.dc.html), DSA concepts (Concepts.dc.html), System design
// (SystemDesign.dc.html) and AI & ML (AIML.dc.html). Markup: src/pages/hub_body.html. scripts/build_pages.py puts the two lines
// `const HUB_KEY = '...'; const HUB_PAGE = '...';` in front of this file, one pair per page, and the page keeps its own lesson data
// (START_CHAPTERS, CS_LESSONS, SD_LESSONS, AI_LESSONS), which hubSections() below reads.
// The page: Back link, the track name, one line, done out of total with a thin bar, one Continue (or Start) button for the Up next lesson,
// a short "How the lessons work" strip (at most three points, no fold), then the lessons as a full-width grid of equal blocks, grouped by
// section or chapter. A block shows the lesson title, its time if the track has one, and Done or Up next. One click opens the lesson.
// Opening a lesson writes the key the lesson page reads (SEARCH_TYPES in shared/search.js), as the Roadmap and a search result do.
const HUB_META = {
  start: { name: 'Start here', type: 'start', lessonPage: 'Chapter.dc.html',
    line: 'Learn to program from zero, one short lesson at a time, in Python.',
    how: ['Each lesson is a short read with a small exercise to try.', 'Go in order: every lesson builds on the one before.', 'Your progress is saved in this browser.'] },
  dsa: { name: 'DSA concepts', type: 'dsa', lessonPage: 'ConceptLesson.dc.html',
    line: 'The main ideas behind data structures and algorithms, each one shown step by step.',
    how: ['Each lesson is an animation. Press Play, or step through it.', 'Some lessons have a slider so you can change the input.', 'Finish a lesson and it gets a tick.'] },
  sd: { name: 'System design', type: 'sd', lessonPage: 'SDLesson.dc.html',
    line: 'How big systems are built: servers, caches, databases and queues, then whole systems.',
    how: ['Each lesson is a diagram. Press Play and watch requests travel.', 'Start with Fundamentals. Case studies use them all.', 'Finish a lesson and it gets a tick.'] },
  ai: { name: 'AI & ML', type: 'ai', lessonPage: 'AILesson.dc.html',
    line: 'The maths and ideas behind machine learning and today’s AI, from a straight line to transformers.',
    how: ['Each lesson is a short animation of a few minutes.', 'The first section builds the maths. Later lessons use it.', 'Finish a lesson and it gets a tick.'] }
};
// The lessons of each track in teaching order, grouped: [{ id, title, items: [{ id, title, min }] }].
function hubSections(key) {
  if (key === 'start') {
    const ready = START_CHAPTERS.filter((c) => c.ready);
    return START_PARTS.map((p) => ({ id: 'ch-' + p.n, title: 'Chapter ' + p.n + ': ' + p.title,
      items: ready.filter((c) => c.part === p.n).map((c) => ({ id: c.id, title: c.title, min: c.minutes })) })).filter((s) => s.items.length);
  }
  if (key === 'dsa') {
    return CS_TRACKS.map((tr) => ({ id: tr.id, title: tr.title, items: CS_LESSONS.filter((L) => L.track === tr.id).map((L) => ({ id: L.id, title: L.title, min: L.minutes })) })).filter((s) => s.items.length);
  }
  if (key === 'sd') {
    return [['hld', 'Fundamentals', (x) => x.track === 'hld' && !x.method], ['case', 'Case studies', (x) => x.track === 'hld' && !!x.method], ['lld', 'Low-level design', (x) => x.track === 'lld']]
      .map(([id, title, pick]) => ({ id, title, items: SD_LESSONS.filter(pick).map((x) => ({ id: x.id, title: x.title, min: 0 })) })).filter((s) => s.items.length);
  }
  return AI_TRACKS.map((tr) => ({ id: tr.id, title: tr.title, items: AI_LESSONS.filter((L) => L.track === tr.id).map((L) => ({ id: L.id, title: L.title, min: L.minutes })) })).filter((s) => s.items.length);
}
// Back: to the Roadmap, or to Home or Problems when the learner came from there. Never to another course front or a lesson.
const HUB_BACK = { Patterns: 'Roadmap', Home: 'Home', Sheet: 'Problems' };
function hubBack(self) {
  let to = null;
  try { to = window.__dsTrail ? window.__dsTrail() : null; } catch (e) {}
  const name = to ? String(to.page).replace('.dc.html', '') : '';
  const use = !!(to && HUB_BACK[name] && name !== self);
  return { label: 'Back to ' + (use ? HUB_BACK[name] : 'Roadmap'), href: '#back',
    go: (e) => { try { if (e && e.preventDefault) e.preventDefault(); } catch (x) {} try { if (use) window.__dsBack(); else window.__dsNav('Patterns.dc.html', '', true); } catch (x) {} } };
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
    const meta = HUB_META[HUB_KEY];
    const doneIds = {};
    try { DS.lessons().ids.forEach((i) => { doneIds[i] = 1; }); } catch (e) {}
    let startDone = {};
    try { startDone = DS.start().done || {}; } catch (e) {}
    const isDone = (id) => (HUB_KEY === 'start' ? !!startDone[id] : !!doneIds[meta.type + ':' + id]);
    let total = 0, done = 0, upFound = false, up = null, first = null;
    const sections = hubSections(HUB_KEY).map((s) => {
      let sd = 0;
      const items = s.items.map((l) => {
        const d = isDone(l.id); total++; if (d) { done++; sd++; }
        const isUp = !d && !upFound; if (isUp) upFound = true;
        const it = { title: l.title, href: meta.lessonPage + (HUB_KEY === 'start' ? '?ch=' + l.id : ''), done: d, up: isUp,
          time: l.min ? l.min + ' min' : '', meta: !!(l.min || d || isUp), mark: d ? '✓' : '', status: d ? 'Done' : isUp ? 'Up next' : '', upShow: isUp, doneShow: d,
          aria: l.title + (l.min ? ', ' + l.min + ' minutes' : '') + (d ? ', done' : isUp ? ', up next' : ''),
          go: () => { try { window.localStorage.setItem(SEARCH_TYPES[meta.type][2], l.id); } catch (e) {} } };
        if (!first) first = it; if (isUp) up = it;
        return it;
      });
      return { id: s.id, hid: 'hub-' + s.id + '-h', title: s.title, items, count: sd + ' of ' + items.length + ' done' };
    });
    const target = up || first;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return {
      t, ...navVals(this, t, themeKey, HUB_PAGE),
      hub: { name: meta.name, line: meta.line, how: meta.how.map((text, i) => ({ n: String(i + 1), text })), done, total, pct, count: done + ' of ' + total + ' done',
        aria: meta.name + ': ' + done + ' of ' + total + ' lessons done' },
      back: hubBack(HUB_PAGE),
      cont: target ? { href: target.href, go: target.go, label: (up ? (done ? 'Continue' : 'Start') : 'Start again') + ': ' + target.title } : { href: '#', go: () => {}, label: '' },
      sections
    };
  }
}
