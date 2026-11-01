// ---- page ----
// The DSA concepts hub (Concepts page). scripts/build_pages.py copies this file in after "// ---- page ----".
function csHubMobile() { try { return typeof window.innerWidth === 'number' && window.innerWidth < 760; } catch (e) { return false; } }

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { theme: loadTheme(), user: loadUser(), mobile: csHubMobile(), drawer: false, open: -1 };
  }
  componentDidMount() {
    listenTheme(this);
    this.onResize = () => { const m = csHubMobile(); if (m !== this.state.mobile) this.setState({ mobile: m }); };
    try { window.addEventListener('resize', this.onResize); } catch (e) {}
  }
  componentWillUnmount() { unlistenTheme(this); try { window.removeEventListener('resize', this.onResize); } catch (e) {} }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const mobile = !!this.state.mobile;
    const C = aiColors(t);
    const steps = CS_LESSONS.reduce((s, L, i) => s + csSteps(i).length, 0);
    const tries = {}; CS_LESSONS.forEach((L) => L.tryIt.forEach((id) => { tries[id] = 1; }));
    const doneIds = {}; DS.lessons().ids.forEach((id) => { doneIds[id] = 1; });
    const isDone = (L) => !!doneIds['dsa:' + L.id];
    const doneAll = CS_LESSONS.filter(isDone).length;
    const colors = [C.a, C.b, C.c, C.ok, C.a, C.b, C.c];
    const tracks = CS_TRACKS.filter((tr) => CS_LESSONS.some((L) => L.track === tr.id));
    const trk = tracks.map((tr, k) => {
      const mine = CS_LESSONS.map((L, i) => [L, i]).filter(([L]) => L.track === tr.id);
      const groups = {}; mine.forEach(([L]) => L.groups.forEach((g) => { groups[g] = 1; }));
      return {
        id: tr.id, title: tr.title, blurb: tr.blurb, next: Object.keys(groups).join(' · '),
        count: mine.length, done: mine.filter(([L]) => isDone(L)).length,
        lessons: mine.map(([L, i], j) => ({
          num: String(j + 1).padStart(2, '0'), title: L.title, done: isDone(L), rule: j === 0 ? 'transparent' : t.line,
          aria: L.title + ', ' + csSteps(i).length + ' steps' + (isDone(L) ? ', finished' : ''),
          meta: L.tag + ' · ' + csSteps(i).length + ' steps · ' + L.minutes + ' min' + (L.param ? ' · interactive' : ''),
          chip: isDone(L) ? 'done' : 'start', chipFg: isDone(L) ? t.ok : t.muted,
          go: () => { try { window.localStorage.setItem('dsaviz-concept-lesson', L.id); } catch (e) {} }
        }))
      };
    });
    const firstOpen = Math.max(0, trk.findIndex((x) => x.lessons.some((l) => !l.done)));
    const openIdx = this.state.open === -1 ? firstOpen : this.state.open;
    const allL = [].concat(...trk.map((x) => x.lessons));
    const nextL = allL.find((x) => !x.done) || allL[0];
    return Object.assign({
      t, themeBtns: themeButtons(this, themeKey, t),
      L: { desk: !mobile, rootW: mobile ? 420 : 1440, pad: mobile ? '24px 16px 32px' : '24px 48px 48px' },
      total: { done: doneAll, count: CS_LESSONS.length },
      resume: { text: (doneAll > 0 ? 'Continue: ' : 'Start with: ') + nextL.title, pick: nextL.go },
      tracks: trk.map((x, k) => ({ ...x, open: k === openIdx, lessons: k === openIdx ? x.lessons : [], chev: k === openIdx ? 'rotate(180deg)' : 'rotate(0deg)',
        toggle: () => this.setState({ open: k === openIdx ? -2 : k }) }))
    }, navVals(this, t, themeKey, 'Concepts'));
  }
}
