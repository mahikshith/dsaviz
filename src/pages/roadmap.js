// ---- page ----
// The Roadmap page (pages/Patterns.dc.html; the file keeps its old name until step 10). Markup: src/pages/roadmap_body.html.
// One page, one scroll, no tabs and no folds: the title, then every track as a block in a grid, in teaching order. A block has its name,
// done out of total, a thin bar and all of its lessons. Data: ROADMAP (scripts/build_roadmap_page.js), progress: DS.
//   Start here   lessons grouped by chapter; each chapter heading has an id (ch-1 ...) so Back from a lesson can return to it
//   DSA concepts, Git, System design, AI & ML   one link per lesson
//   Patterns     each pattern opens the Problems page filtered by that topic (?topic=, step 4)
//   Complexity   each section opens on the Complexity page (rebuilt in step 8)
// Opening a lesson writes the key the lesson page reads (SEARCH_TYPES in shared/search.js), as a search result does, then the runtime opens the page.
// Each block marks its first lesson not done as "Up next". Chips under the title jump to a block and mark the one being read.
// Back from a lesson returns here with the scroll kept (shared/nav.js lessonBack). ?at=ch-4 scrolls a chapter or track into view.
const RM_SEEN_KEY = 'dsaviz-roadmap-seen';
// key, name, width in the 6-column desktop grid (DSA concepts 4 in two columns and Patterns 2 in one column hold about the same height), width in the 2-column tablet grid. Desktop rows: 1 / 4+2 / 3+3 / 1 / 1, chosen so the blocks
// in a row hold about the same number of lines (no big empty block); on a tablet: 2 / 2 / 2 / 1+1 / 2 / 2.
const RM_TRACKS = [['start', 'Start here', 6, 2], ['dsa', 'DSA concepts', 4, 2], ['patterns', 'Patterns', 2, 2], ['cplx', 'Complexity', 3, 1],
  ['git', 'Git', 3, 1], ['sd', 'System design', 6, 2], ['ai', 'AI & ML', 6, 2]];
function rmSeen() { try { const v = JSON.parse(window.localStorage.getItem(RM_SEEN_KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
function rmMarkSeen(id) { try { const v = rmSeen(); if (!v.includes(id)) { v.push(id); window.localStorage.setItem(RM_SEEN_KEY, JSON.stringify(v)); } } catch (e) {} }
// Done: ticked in the old sheet, solved on the Problem page, or its story finished (the same rule as the Problems page).
function rmDoneRows(prog) {
  const ids = new Set();
  try { DS.codePasses().ids.forEach((i) => ids.add(i)); DS.stories().ids.forEach((i) => ids.add(i)); } catch (e) {}
  const out = new Set();
  SHEET.forEach((r) => { if (prog.done[r.id] || ids.has(r.pid) || (r.story && ids.has(r.story))) out.add(r.id); });
  return out;
}
function rmOpen(type, id) { try { window.localStorage.setItem(SEARCH_TYPES[type][2], id); } catch (e) {} }

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { theme: loadTheme(), user: loadUser(), drawer: false, prog: loadSheetProgress(), at: 'start' };
  }
  componentDidMount() {
    listenTheme(this);
    let q = 0;
    this.onScroll = () => { if (!q) q = (window.requestAnimationFrame || ((f) => setTimeout(f, 16)))(() => { q = 0; this.mark(); }); };
    try { window.addEventListener('scroll', this.onScroll, { passive: true }); } catch (e) {}
    // A search result for a pattern lands here: send it to the Problems page filtered by that topic.
    try {
      const focus = searchFocus('dsaviz-pattern-focus');
      if (focus && window.__dsNav) { window.__dsNav('Sheet.dc.html', '?topic=' + encodeURIComponent(focus), true); return; }
    } catch (e) {}
    // ?at=ch-4 (or ?at=track-git): bring that chapter or track into view once the page has drawn it.
    try {
      const at = new URLSearchParams(window.location.search).get('at');
      if (at) searchReveal('#' + at.replace(/[^A-Za-z0-9_-]/g, ''));
    } catch (e) {}
  }
  // The jump chip of the block being read is marked: the last block whose top has passed the top bar (and chip row on a phone).
  mark() {
    try {
      const line = window.innerWidth < 760 ? 120 : 80;
      if (this.lock && Date.now() < this.lock) return;
      // Blocks side by side share a top: the first of them (the left one) counts, until a chip names the other.
      let at = RM_TRACKS[0][0], best = -1e9;
      RM_TRACKS.forEach(([k]) => { const el = document.getElementById('track-' + k); if (!el) return; const top = el.getBoundingClientRect().top; if (top <= line && top > best + 1) { at = k; best = top; } });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) at = RM_TRACKS[RM_TRACKS.length - 1][0];
      if (at !== this.state.at) this.setState({ at });
    } catch (e) {}
  }
  componentWillUnmount() { unlistenTheme(this); try { window.removeEventListener('scroll', this.onScroll); } catch (e) {} }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const lessonDone = {};
    try { DS.lessons().ids.forEach((i) => { lessonDone[i] = 1; }); } catch (e) {}
    let startDone = {};
    try { startDone = DS.start().done || {}; } catch (e) {}
    const seen = rmSeen();
    const doneRows = rmDoneRows(this.state.prog);
    const item = (href, title, done, go, note) => ({ href, title, tick: done ? '✓' : '', sr: done ? ', done' : '', go, note: note || '' });
    const mk = (key, name, w, tw, groups, done, total, unit) => {
      const pct = total ? Math.round((done / total) * 100) : 0;
      // The first lesson not done is marked "Up next": the one place to click.
      let found = false;
      groups.forEach((g) => g.items.forEach((l) => { l.up = !found && !l.tick; if (l.up) found = true; }));
      return { key, name, w: String(w), t: String(tw), id: 'track-' + key, hid: 'track-' + key + '-h', groups, done, total, pct,
        count: done + ' of ' + total + ' ' + unit, aria: name + ': ' + done + ' of ' + total + ' ' + unit };
    };
    const lessons = (type, hrefPage, list) => {
      const items = list.map(([id, title]) => item(hrefPage, title, !!lessonDone[type + ':' + id], () => rmOpen(type, id)));
      return [{ titled: false, id: '', title: '', items }];
    };
    const out = RM_TRACKS.map(([key, name, w, tw]) => {
      if (key === 'start') {
        let done = 0, total = 0;
        const groups = ROADMAP.start.map((ch) => ({
          titled: true, id: 'ch-' + ch.n, title: 'Chapter ' + ch.n + ': ' + ch.title,
          items: ch.lessons.map(([id, title]) => {
            const d = !!startDone[id]; total++; if (d) done++;
            return item('Chapter.dc.html?ch=' + id, title, d, () => rmOpen('start', id));
          })
        }));
        return mk(key, name, w, tw, groups, done, total, 'done');
      }
      if (key === 'patterns') {
        const per = {};
        SHEET.forEach((r) => { const p = per[r.pattern] || (per[r.pattern] = [0, 0]); p[1]++; if (doneRows.has(r.id)) p[0]++; });
        let done = 0, total = 0;
        const items = PATTERNS.map(([n]) => {
          const p = per[n] || [0, 0]; done += p[0]; total += p[1];
          return item('Sheet.dc.html?topic=' + encodeURIComponent(n), n, p[1] > 0 && p[0] === p[1], () => {}, p[0] + '/' + p[1]);
        });
        return mk(key, name, w, tw, [{ titled: false, id: '', title: '', items }], done, total, 'solved');
      }
      if (key === 'cplx') {
        const items = ROADMAP.cplx.map(([id, title]) => item('Complexity.dc.html', title, seen.includes(id), () => { rmOpen('cplx', id); rmMarkSeen(id); }));
        return mk(key, name, w, tw, [{ titled: false, id: '', title: '', items }], items.filter((x) => x.tick).length, items.length, 'opened');
      }
      const page = { dsa: 'ConceptLesson.dc.html', git: 'Git.dc.html', sd: 'SDLesson.dc.html', ai: 'AILesson.dc.html' }[key];
      const groups = lessons(key, page, ROADMAP[key]);
      const items = groups[0].items;
      return mk(key, name, w, tw, groups, items.filter((x) => x.tick).length, items.length, 'done');
    });
    // A "Jump to:" line of text links under the title (not tabs): each scrolls to its block, and the one in view is underlined.
    const chips = RM_TRACKS.map(([key, name]) => ({ key, label: name, aria: 'Go to ' + name, cur: this.state.at === key ? 'true' : 'false',
      go: () => { this.lock = Date.now() + 1500; this.setState({ at: key }); try { const el = document.getElementById('track-' + key); if (el) el.scrollIntoView({ block: 'start', behavior: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); } catch (e) {} } }));
    return { t, ...navVals(this, t, themeKey, 'Patterns'), tracks: out, chips };
  }
}
