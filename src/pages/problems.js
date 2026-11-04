// ---- page ----
// The Problems page (pages/Sheet.dc.html; the page file keeps its old name until step 10). Markup: src/pages/problems_body.html.
// A table of every problem in the master sheet (SHEET, shared/sheet.js): title, topic, difficulty, done. A search box and three filters
// (topic, difficulty, done). The filters live in the URL (?q=&topic=&difficulty=&done=&page=), so Back restores them.
// Rows are paged, PR_PAGE at a time, so the page never draws all of them at once. Today's 5, Random, lists, stars, notes, export and
// import, group folds and the company filter are gone from the page; their data and code stay in the source (shared/lists.js, shared/sheet.js).
const PR_PAGE = 50;
const PR_DIFFS = ['Easy', 'Medium', 'Hard'];
const PR_TOPICS = SHEET_GROUPS.map(([n]) => n);
const PR_DONE = [['yes', 'Done'], ['no', 'Not done']];
// The filters from a query string; anything unknown is ignored.
function prParse(search) {
  const out = { q: '', topic: '', diff: '', done: '', page: 1 };
  try {
    const p = new URLSearchParams(search || '');
    out.q = (p.get('q') || '').slice(0, 80);
    const topic = p.get('topic') || '', diff = p.get('difficulty') || '', done = p.get('done') || '';
    if (PR_TOPICS.includes(topic)) out.topic = topic;
    if (PR_DIFFS.includes(diff)) out.diff = diff;
    if (PR_DONE.some(([k]) => k === done)) out.done = done;
    const n = parseInt(p.get('page') || '1', 10);
    if (n > 1) out.page = n;
  } catch (e) {}
  return out;
}
// The query string for a set of filters (empty when nothing is set).
function prQuery(s) {
  const p = new URLSearchParams();
  if (s.q) p.set('q', s.q);
  if (s.topic) p.set('topic', s.topic);
  if (s.diff) p.set('difficulty', s.diff);
  if (s.done) p.set('done', s.done);
  if (s.page > 1) p.set('page', String(s.page));
  const str = p.toString();
  return str ? '?' + str : '';
}
// Every word of the search is somewhere in the title or the topic.
function prMatches(r, words) {
  if (!words.length) return true;
  const hay = searchNorm(r.name + ' ' + r.pattern);
  return words.every((w) => hay.indexOf(w) >= 0);
}
function prFilter(s, prog) {
  const words = searchNorm(s.q).split(' ').filter(Boolean);
  return SHEET.filter((r) => (!s.topic || r.pattern === s.topic) && (!s.diff || r.diff === s.diff) &&
    (!s.done || (s.done === 'yes') === !!prog.done[r.id]) && prMatches(r, words));
}

class Component extends DCLogic {
  constructor(props) {
    super(props);
    let search = '';
    try { search = window.location.search; } catch (e) {}
    this.state = Object.assign({ theme: loadTheme(), user: loadUser(), drawer: false, prog: loadSheetProgress(), status: '' }, prParse(search));
  }
  componentDidMount() {
    listenTheme(this);
    this.onSheet = (e) => { if (e.key === SHEET_KEY) this.setState({ prog: loadSheetProgress() }); };
    // Back and Forward inside the page: read the filters from the address again.
    this.onPop = () => { try { if (window.location.hash === '#Sheet') this.setState(Object.assign(prParse(window.location.search), { status: 'List updated.' })); } catch (e) {} };
    try { window.addEventListener('storage', this.onSheet); window.addEventListener('popstate', this.onPop); } catch (e) {}
  }
  componentWillUnmount() { unlistenTheme(this); try { window.removeEventListener('storage', this.onSheet); window.removeEventListener('popstate', this.onPop); } catch (e) {} }
  // Change the filters and put them in the address. Typing replaces the entry; a filter or page change adds one, so Back undoes it.
  set(patch, push) {
    const next = Object.assign({}, this.state, { page: 1 }, patch);
    this.setState(Object.assign({}, patch, { page: next.page, status: 'List updated.' }));
    try {
      const url = window.location.pathname + prQuery(next) + window.location.hash;
      if (url !== window.location.pathname + window.location.search + window.location.hash) window.history[push ? 'pushState' : 'replaceState'](null, '', url);
    } catch (e) {}
  }
  clear() { this.set({ q: '', topic: '', diff: '', done: '' }, true); }
  go(page) {
    this.set({ page }, true);
    try { window.scrollTo(0, 0); } catch (e) {}
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const s = this.state, prog = s.prog;
    const all = prFilter(s, prog);
    const pages = Math.max(1, Math.ceil(all.length / PR_PAGE));
    const page = Math.min(Math.max(1, s.page), pages);
    const rows = all.slice((page - 1) * PR_PAGE, page * PR_PAGE).map((r) => {
      const done = !!prog.done[r.id];
      return { id: r.id, name: r.name, href: r.href, topic: r.pattern, diff: r.diff, tick: done ? '✓' : '', sr: done ? 'Done' : 'Not done' };
    });
    const opt = (v, label) => ({ v, label });
    return {
      t, ...navVals(this, t, themeKey, 'Sheet'),
      dEasy: t.diff.Easy[2], dMedium: t.diff.Medium[2], dHard: t.diff.Hard[2],
      q: s.q, onQ: (e) => this.set({ q: ((e && e.target && e.target.value) || '').slice(0, 80) }, false),
      topicSel: s.topic, topicOpts: [opt('', 'All topics')].concat(PR_TOPICS.map((n) => opt(n, n))),
      onTopic: (e) => { const v = (e && e.target && e.target.value) || ''; this.set({ topic: PR_TOPICS.includes(v) ? v : '' }, true); },
      diffSel: s.diff, diffOpts: [opt('', 'All difficulties')].concat(PR_DIFFS.map((n) => opt(n, n))),
      onDiff: (e) => { const v = (e && e.target && e.target.value) || ''; this.set({ diff: PR_DIFFS.includes(v) ? v : '' }, true); },
      doneSel: s.done, doneOpts: [opt('', 'All')].concat(PR_DONE.map(([k, l]) => opt(k, l))),
      onDone: (e) => { const v = (e && e.target && e.target.value) || ''; this.set({ done: PR_DONE.some(([k]) => k === v) ? v : '' }, true); },
      rows, hasRows: rows.length > 0, noRows: rows.length === 0,
      clearFilters: () => this.clear(),
      hasPager: pages > 1, atFirst: page <= 1, atLast: page >= pages, pos: 'Page ' + page + ' of ' + pages,
      prevPage: () => this.go(page - 1), nextPage: () => this.go(page + 1),
      status: s.status
    };
  }
}
