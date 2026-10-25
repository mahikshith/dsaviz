// ---- page ----
// The DSA concepts hub (Concepts page). scripts/build_pages.py copies this file in after "// ---- page ----".
function csHubMobile() { try { return typeof window.innerWidth === 'number' && window.innerWidth < 760; } catch (e) { return false; } }

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { theme: loadTheme(), user: loadUser(), mobile: csHubMobile(), drawer: false };
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
    // Desktop board height: the hero plus each row of three track cards (tallest card per row).
    let boardH = 360;
    for (let r = 0; r < tracks.length; r += 3) boardH += 196 + 52 * Math.max.apply(null, tracks.slice(r, r + 3).map((tr) => CS_LESSONS.filter((L) => L.track === tr.id).length));
    return Object.assign({
      t, themeBtns: themeButtons(this, themeKey, t),
      L: {
        desk: !mobile, rootW: mobile ? 420 : 1440, rootH: mobile ? 'auto' : boardH + 'px', gutter: mobile ? 12 : 24,
        pad: mobile ? '20px 16px 28px' : '22px 40px 24px', gap: 20,
        heroCols: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) auto', h1: mobile ? 56 : 80, lead: mobile ? 16 : 17, chipJustify: mobile ? 'flex-start' : 'flex-end',
        trackCols: mobile ? 'minmax(0, 1fr)' : 'repeat(3, minmax(0, 1fr))'
      },
      count: CS_LESSONS.length,
      chips: [[CS_LESSONS.length, 'lessons'], [doneAll + ' / ' + CS_LESSONS.length, 'finished by you'], [steps, 'animated steps'], [Object.keys(tries).length, 'problems to try']].map(([n, label]) => ({ n, label })),
      tracks: tracks.map((tr, k) => {
        const mine = CS_LESSONS.map((L, i) => [L, i]).filter(([L]) => L.track === tr.id);
        const groups = {}; mine.forEach(([L]) => L.groups.forEach((g) => { groups[g] = 1; }));
        return {
          hid: 'cs-track-' + tr.id, num: k + 1, title: tr.title, blurb: tr.blurb, color: colors[k % colors.length], delay: (k * 0.06) + 's',
          next: Object.keys(groups).join(' · '),
          count: mine.length, done: mine.filter(([L]) => isDone(L)).length,
          lessons: mine.map(([L, i], j) => ({
            num: String(j + 1).padStart(2, '0'), title: L.title, done: isDone(L),
            aria: L.title + ', ' + csSteps(i).length + ' steps' + (isDone(L) ? ', finished' : ''),
            meta: L.tag + ' · ' + csSteps(i).length + ' steps · ' + L.minutes + ' min',
            slider: !!L.param,
            go: () => { try { window.localStorage.setItem('dsaviz-concept-lesson', L.id); } catch (e) {} }
          }))
        };
      })
    }, navVals(this, t, themeKey, 'Concepts'));
  }
}
