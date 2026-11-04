// ---- page ----
// The Problems page (pages/Sheet.dc.html; the page file keeps its old name until step 10). Markup: src/pages/problems_body.html.
// A table of every problem in the master sheet (SHEET, shared/sheet.js): title, topic, difficulty, done. A search box and three filters
// (topic, difficulty, done), then two switches: "Due for review" (the problems the old Revisit page offered today, from DS.reviewDue())
// and "Timed" (opening a problem then shows a countdown on the Problem page; remembered in dsaviz-timed). The filters live in the URL
// (?q=&topic=&difficulty=&done=&due=1&page=), so Back restores them. Timed is a setting, not a filter, so it is not in the URL.
// Rows are paged, PR_PAGE at a time, so the page never draws all of them at once: search and filters run over all 562 first, then the page
// shows one slice (12 pages). Today's 5, Random, lists, stars, notes, export and import, group folds and the company filter are gone from
// the page; their data and code stay in the source (shared/lists.js, shared/sheet.js).
const PR_PAGE = 50;
const PR_DIFFS = ['Easy', 'Medium', 'Hard'];
const PR_TOPICS = SHEET_GROUPS.map(([n]) => n);
const PR_DONE = [['yes', 'Done'], ['no', 'Not done']];
const PR_TIMED_KEY = DS.TIMED.key;
function prTimed() { try { return window.localStorage.getItem(PR_TIMED_KEY) === '1'; } catch (e) { return false; } }
const PR_M = DS.TIMED.minutes;
const PR_TIP_TIMED = 'Timed starts a countdown when you open a problem: ' + PR_M.Easy + ' minutes for Easy, ' + PR_M.Medium + ' for Medium and ' + PR_M.Hard + ' for Hard.';
// The problems the old Revisit page offered today: sheet cards by row id, and story cards through the row that holds the story.
function prDueRows() {
  const out = new Set();
  try {
    DS.reviewDue().forEach((c) => {
      if (c.kind === 'sheet') out.add(c.id.replace(/^sheet:/, ''));
      else if (c.kind === 'story') SHEET.forEach((r) => { if (r.story === c.id || r.pid === c.id) out.add(r.id); });
    });
  } catch (e) {}
  return out;
}
// Done: ticked in the old sheet, solved on the Problem page, or its story finished.
function prDoneRows(prog) {
  const ids = new Set();
  try { DS.codePasses().ids.forEach((i) => ids.add(i)); DS.stories().ids.forEach((i) => ids.add(i)); } catch (e) {}
  const out = new Set();
  SHEET.forEach((r) => { if (prog.done[r.id] || ids.has(r.pid) || (r.story && ids.has(r.story))) out.add(r.id); });
  return out;
}
// The filters from a query string; anything unknown is ignored.
function prParse(search) {
  const out = { q: '', topic: '', diff: '', done: '', due: false, page: 1 };
  try {
    const p = new URLSearchParams(search || '');
    out.q = (p.get('q') || '').slice(0, 80);
    const topic = p.get('topic') || '', diff = p.get('difficulty') || '', done = p.get('done') || '';
    if (PR_TOPICS.includes(topic)) out.topic = topic;
    if (PR_DIFFS.includes(diff)) out.diff = diff;
    if (PR_DONE.some(([k]) => k === done)) out.done = done;
    out.due = p.get('due') === '1';
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
  if (s.due) p.set('due', '1');
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
function prFilter(s, doneSet, dueSet) {
  const words = searchNorm(s.q).split(' ').filter(Boolean);
  return SHEET.filter((r) => (!s.topic || r.pattern === s.topic) && (!s.diff || r.diff === s.diff) &&
    (!s.done || (s.done === 'yes') === doneSet.has(r.id)) && (!s.due || dueSet.has(r.id)) && prMatches(r, words));
}

class Component extends DCLogic {
  constructor(props) {
    super(props);
    let search = '';
    try { search = window.location.search; } catch (e) {}
    this.state = Object.assign({ theme: loadTheme(), user: loadUser(), drawer: false, prog: loadSheetProgress(), status: '', timed: prTimed(), tip: '' }, prParse(search));
  }
  componentDidMount() {
    listenTheme(this);
    // Progress from another tab: read it again (a new prog object also makes the done and due sets be worked out again).
    this.onSheet = (e) => { if (!e.key || String(e.key).indexOf('dsaviz-') === 0) this.setState({ prog: loadSheetProgress() }); };
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
  // Which rows are done and which are due: worked out once per progress object, not on every keystroke or page change.
  sets(prog) {
    if (!this.cache || this.cache.prog !== prog) this.cache = { prog, done: prDoneRows(prog), due: prDueRows() };
    return this.cache;
  }
  clear() { this.set({ q: '', topic: '', diff: '', done: '', due: false }, true); }
  setTimed(on) {
    try { window.localStorage.setItem(PR_TIMED_KEY, on ? '1' : '0'); } catch (e) {}
    this.setState({ timed: on, status: on ? 'Timed is on.' : 'Timed is off.' });
  }
  go(page) {
    this.set({ page }, true);
    try { window.scrollTo(0, 0); } catch (e) {}
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const s = this.state, prog = s.prog;
    const { done: doneSet, due: dueSet } = this.sets(prog);
    const all = prFilter(s, doneSet, dueSet);
    const pages = Math.max(1, Math.ceil(all.length / PR_PAGE));
    const page = Math.min(Math.max(1, s.page), pages);
    const rows = all.slice((page - 1) * PR_PAGE, page * PR_PAGE).map((r) => {
      const done = doneSet.has(r.id);
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
      dueOn: s.due ? 'true' : 'false', onDue: () => this.set({ due: !s.due }, true),
      timedOn: s.timed ? 'true' : 'false', onTimed: () => this.setTimed(!s.timed),
      tipTimedText: PR_TIP_TIMED, tipDue: s.tip === 'due', tipTimed: s.tip === 'timed',
      onTipDue: () => this.setState({ tip: s.tip === 'due' ? '' : 'due' }),
      onTipTimed: () => this.setState({ tip: s.tip === 'timed' ? '' : 'timed' }),
      rows, hasRows: rows.length > 0, noRows: rows.length === 0,
      emptyText: s.due && !s.q && !s.topic && !s.diff && !s.done ? 'No problems are due for review.' : 'No problems match.',
      clearFilters: () => this.clear(),
      hasPager: pages > 1, atFirst: page <= 1, atLast: page >= pages, pos: 'Page ' + page + ' of ' + pages,
      prevPage: () => this.go(page - 1), nextPage: () => this.go(page + 1),
      status: s.status
    };
  }
}
