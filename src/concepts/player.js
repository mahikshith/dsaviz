// ---- page ----
// The concept lesson player (ConceptLesson page). scripts/build_pages.py copies this file in after the
// "// ---- page ----" marker. Scenes come from src/concepts/lessons.js, drawn by src/ai/render.js.
const CS_LESSON_KEY = 'dsaviz-concept-lesson';
function csMobile() { try { return typeof window.innerWidth === 'number' && window.innerWidth < 760; } catch (e) { return false; } }
function csReduced() { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } }
function csNow() { try { return typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now(); } catch (e) { return Date.now(); } }
function csLoadLesson() {
  try { const id = window.localStorage.getItem(CS_LESSON_KEY); const i = CS_LESSONS.findIndex((L) => L.id === id); return i >= 0 ? i : 0; } catch (e) { return 0; }
}
function csParamText(P, v) { return P.digits ? Number(v).toFixed(P.digits) : String(Math.round(v)); }

class Component extends DCLogic {
  constructor(props) {
    super(props);
    const lesson = csLoadLesson();
    this.state = { theme: loadTheme(), user: loadUser(), lesson, step: 0, param: null, playing: false, mobile: csMobile(), tab: CS_LESSONS[lesson].track, drawer: false, sayKey: 0 };
    this.from = null; this.t0 = 0; this.cur = null;
  }
  componentDidMount() {
    listenTheme(this);
    this.onKey = (e) => {
      if (!e || !e.key) return;
      if (e.key === 'Escape' && this.state.drawer) { this.setState({ drawer: false }); return; }
      if (this.state.drawer || this.state.sOpen) return;
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowRight') { this.stop(); this.go(this.state.step + 1); if (e.preventDefault) e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { this.stop(); this.go(this.state.step - 1); if (e.preventDefault) e.preventDefault(); }
      else if (e.key === 'Home') { this.stop(); this.go(0); }
      else if (e.key === 'End') { this.stop(); this.go(this.steps().length - 1); }
      else if (e.key === ' ' && !/BUTTON|A/.test(tag)) { this.togglePlay(); if (e.preventDefault) e.preventDefault(); }
    };
    this.onResize = () => { const m = csMobile(); if (m !== this.state.mobile) this.setState({ mobile: m }); };
    try { window.addEventListener('keydown', this.onKey); window.addEventListener('resize', this.onResize); } catch (e) {}
  }
  componentWillUnmount() {
    unlistenTheme(this); clearInterval(this.timer); this.dead = true;
    try { if (this.raf) window.cancelAnimationFrame(this.raf); window.removeEventListener('keydown', this.onKey); window.removeEventListener('resize', this.onResize); } catch (e) {}
  }
  steps(lesson, param) {
    const i = lesson === undefined ? this.state.lesson : lesson;
    return csSteps(i, param === undefined ? (lesson === undefined ? this.state.param : null) : param);
  }
  // Start an eased move from whatever is on screen now to the next scene (skipped when motion is reduced).
  ease() {
    if (csReduced() || !this.cur) { this.from = null; return; }
    let raf = null;
    try { raf = typeof window.requestAnimationFrame === 'function' ? window.requestAnimationFrame.bind(window) : null; } catch (e) { raf = null; }
    if (!raf) { this.from = null; return; }
    this.from = this.cur; this.t0 = csNow();
    if (this.raf) return;
    const tick = () => {
      if (this.dead) return;
      if (csNow() - this.t0 >= AI_EASE_MS) { this.from = null; this.raf = null; this.forceUpdate(); return; }
      this.forceUpdate(); this.raf = raf(tick);
    };
    this.raf = raf(tick);
  }
  go(step, lesson, param) {
    const L = lesson === undefined ? this.state.lesson : lesson;
    const P = param === undefined ? (lesson === undefined ? this.state.param : null) : param;
    const n = csSteps(L, P).length;
    const k = Math.max(0, Math.min(n - 1, step));
    if (k === this.state.step && L === this.state.lesson && P === this.state.param) return;
    const patch = { step: k, lesson: L, param: P, sayKey: this.state.sayKey + 1 };
    if (L !== this.state.lesson) { patch.tab = CS_LESSONS[L].track; try { window.localStorage.setItem(CS_LESSON_KEY, CS_LESSONS[L].id); } catch (e) {} }
    // Reaching the last step finishes the lesson: progress, streak and XP all come from DS.
    if (k === n - 1) DS.finishLesson('dsa:' + CS_LESSONS[L].id);
    this.ease();
    this.setState(patch);
  }
  stop() { clearInterval(this.timer); if (this.state.playing) this.setState({ playing: false }); }
  togglePlay() {
    if (this.state.playing) { this.stop(); return; }
    if (this.state.step >= this.steps().length - 1) this.go(0);
    this.setState({ playing: true });
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.state.step >= this.steps().length - 1) { this.stop(); return; }
      this.go(this.state.step + 1);
    }, 3800);
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const C = aiColors(t);
    const mobile = !!this.state.mobile;
    const li = this.state.lesson;
    const lesson = CS_LESSONS[li];
    const steps = this.steps();
    const st = steps[Math.min(this.state.step, steps.length - 1)];
    const n = steps.length;
    const target = aiFlatten(st.scene, C, st.focus);
    let shown = target;
    if (this.from) shown = aiTween(this.from, target, aiEaseInOut((csNow() - this.t0) / AI_EASE_MS));
    this.cur = shown;
    const S = aiPaint(shown, t);
    const P = lesson.param;
    const pv = P ? (this.state.param === null || this.state.param === undefined ? P.value : this.state.param) : 0;
    const inTab = CS_LESSONS.map((L, i) => [L, i]).filter(([L]) => L.track === this.state.tab);
    const nextI = li + 1 < CS_LESSONS.length ? li + 1 : -1;
    const atEnd = this.state.step === n - 1;
    const done = {}; DS.lessons().ids.forEach((id) => { done[id] = 1; });
    return Object.assign({
      t, themeBtns: themeButtons(this, themeKey, t),
      L: {
        desk: !mobile, mob: mobile, rootW: mobile ? 420 : 1440, rootH: mobile ? 'auto' : '900px', gutter: mobile ? 12 : 20,
        cols: mobile ? 'minmax(0, 1fr)' : '252px minmax(0, 1fr) 292px', trackWrap: mobile ? 'nowrap' : 'wrap',
        navPad: mobile ? '12px 16px' : '16px 14px', navBorder: mobile ? '0' : '1px solid ' + t.line, navBottom: mobile ? '1px solid ' + t.line : '0',
        lessonDir: mobile ? 'row' : 'column', lessonScroll: mobile ? 'auto' : 'visible',
        mainPad: mobile ? '14px 16px' : '16px 20px', h1: mobile ? 24 : 30, titleWrap: mobile ? 'wrap' : 'nowrap', titleWs: mobile ? 'normal' : 'nowrap',
        canvasGrow: mobile ? '0' : '1', svgH: mobile ? 'auto' : '100%', svgW: mobile ? '720px' : '100%', canvasScroll: mobile ? 'auto' : 'hidden', canvasJustify: mobile ? 'flex-start' : 'center',
        nowCols: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) 300px', ctrlJustify: mobile ? 'flex-start' : 'flex-end', saySize: mobile ? 17 : 19,
        asidePad: mobile ? '0 16px 24px' : '16px 16px 18px', asideBorder: mobile ? '0' : '1px solid ' + t.line, asideScroll: mobile ? 'visible' : 'auto', readMin: mobile ? '0' : '160px'
      },
      tracks: CS_TRACKS.filter((tr) => CS_LESSONS.some((L) => L.track === tr.id)).map((tr) => {
        const on = this.state.tab === tr.id;
        return { label: tr.short, on, bg: on ? t.text : 'transparent', fg: on ? t.bg : t.muted, pick: () => this.setState({ tab: tr.id }) };
      }),
      lessons: inTab.map(([L, i], k) => {
        const cur = i === li;
        return {
          num: String(k + 1).padStart(2, '0'), title: L.title, tag: L.tag + (done['dsa:' + L.id] ? ' · done' : ''), cur: cur ? 'page' : 'false',
          bg: cur ? t.sunk : 'transparent', fg: cur ? t.text : t.text2, border: cur ? t.accent : 'transparent', numFg: cur ? t.accent : t.muted,
          pick: () => { this.stop(); this.go(0, i, null); }
        };
      }),
      lesson: { title: lesson.title, tag: lesson.tag, minutes: lesson.minutes, idea: lesson.idea },
      nextLesson: { show: atEnd && nextI >= 0, label: nextI >= 0 ? 'Next lesson: ' + CS_LESSONS[nextI].title : '', go: () => { this.stop(); if (nextI >= 0) this.go(0, nextI, null); } },
      S, canvasLabel: 'Step ' + (this.state.step + 1) + ' of ' + n + '. ' + st.say,
      say: st.say, sayKey: lesson.id + ':' + this.state.sayKey, stepNo: this.state.step + 1, stepCount: n,
      atFirst: this.state.step === 0, atLast: atEnd,
      dots: steps.map((s, i) => ({ label: 'Step ' + (i + 1) + ' of ' + n, cur: i === this.state.step ? 'step' : 'false', bg: i === this.state.step ? t.accent : i < this.state.step ? t.text2 : t.line2, go: () => { this.stop(); this.go(i); } })),
      // Phones scroll the 720px picture sideways: start each lesson with its middle in view.
      canvasRef: (el) => {
        if (!el || !mobile || el.getAttribute('data-cs') === lesson.id) return;
        try { el.setAttribute('data-cs', lesson.id); setTimeout(() => { el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2); }, 0); } catch (e) {}
      },
      readRef: (el) => {
        if (!el || mobile) return;
        setTimeout(() => { try { const cur = el.querySelector('[aria-current="step"]'); if (cur) { const li = cur.parentNode; const top = li.offsetTop; if (top < el.scrollTop || top + li.offsetHeight > el.scrollTop + el.clientHeight) el.scrollTop = Math.max(0, top - 8); } } catch (e) {} }, 0);
      },
      transcript: steps.map((s, i) => { const cur = i === this.state.step; return { n: i + 1, say: s.say, cur: cur ? 'step' : 'false', bar: cur ? t.accent : 'transparent', bg: cur ? t.surface : 'transparent', fg: cur ? t.text : t.text2, numFg: cur ? t.accent : t.muted, go: () => { this.stop(); this.go(i); } }; }),
      restart: () => { this.stop(); this.go(0); },
      prev: () => { this.stop(); this.go(this.state.step - 1); },
      next: () => { this.stop(); this.go(this.state.step + 1); },
      togglePlay: () => this.togglePlay(),
      playText: this.state.playing ? 'Pause' : 'Play', playLabel: this.state.playing ? 'Pause the lesson' : 'Play the lesson step by step',
      slider: {
        show: !!P, label: P ? P.label : '', hint: P ? P.hint : '',
        min: P ? P.min : 0, max: P ? P.max : 1, step: P ? P.step : 1, value: pv,
        text: P ? csParamText(P, pv) : '', minText: P ? csParamText(P, P.min) : '', maxText: P ? csParamText(P, P.max) : '',
        border: t.line,
        later: !!P && this.state.step < 3,
        jump: () => { this.stop(); this.go(n - 1); },
        change: (e) => {
          if (!P) return;
          const raw = Number(e && e.target ? e.target.value : P.value);
          const snapped = Math.round((Math.max(P.min, Math.min(P.max, isFinite(raw) ? raw : P.value)) - P.min) / P.step) * P.step + P.min;
          const v = Number(snapped.toFixed(4));
          if (v === pv) return;
          this.ease();
          this.setState({ param: v, step: Math.min(this.state.step, csSteps(li, v).length - 1) });
        }
      },
      // "Now try": our own problem pages, titles from the master sheet (CONCEPT_ROWS, generated at build time).
      tryIt: {
        atEnd, border: atEnd ? t.accent : t.line, groups: lesson.groups.join(', '),
        items: lesson.tryIt.map((id) => { const r = CONCEPT_ROWS[id] || [id, '', '']; return { title: r[0], meta: [r[1], r[2]].filter(Boolean).join(' · '), href: solveHref(id), go: () => {} }; })
      }
    }, navVals(this, t, themeKey, 'ConceptLesson'));
  }
}
