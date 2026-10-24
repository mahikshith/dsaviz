// ---- page ----
// Revisit: today's spaced-repetition queue from DS. Every finished story and every ticked sheet problem is a card.
// One card at a time: name, pattern, "What's the key move?", Reveal, then rate recall 1-4 (Again, Hard, Good, Easy).
const RV_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const RV_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const RV_GRADE_NOTE = ['Forgot it', 'Slow to come', 'Remembered', 'Instant'];
const rvTitle = (slug) => String(slug || '').replace(/^sheet:/, '').split('-').map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');
const rvDate = (key) => { const [y, m, d] = key.split('-').map(Number); const x = new Date(y, m - 1, d); return RV_DAYS[x.getDay()] + ' ' + d + ' ' + RV_MONTHS[m - 1]; };
// A card as the page shows it: names and lines come from the catalog for stories, from the stored sheet row otherwise.
function rvCard(c) {
  const P = c.kind === 'story' ? PROBLEMS.find((p) => p.id === c.id) : null;
  const pattern = P ? P.pattern : c.pattern || '';
  const slug = c.id.replace(/^sheet:/, '');
  return {
    id: c.id, kind: c.kind, P, pattern,
    name: P ? P.title : c.name || rvTitle(slug),
    story: P ? P.story : '',
    when: PATTERN_WHEN[pattern] || '',
    rule: c.kind === 'story' ? c.rule : c.hint,
    noteId: P ? P.id : c.story || slug,
    // A story card replays its story; a sheet card opens our problem page.
    href: P ? (P.animated ? 'Story.dc.html' : 'Briefing.dc.html') : c.story ? 'Code.dc.html?problem=' + encodeURIComponent(c.story) : solveHref(slug),
    go: () => { if (P) saveProblem(P.id); },
    linkLabel: P ? (P.animated ? 'Replay the story' : 'Read the briefing') : 'Solve it again',
    due: c.due, late: c.late, inDays: c.inDays, reps: c.reps
  };
}
function rvMobile() { try { return typeof window.innerWidth === 'number' && window.innerWidth < 760; } catch (e) { return false; } }
function rvDayName(offset) { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + offset); return RV_DAYS[d.getDay()]; }

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { theme: loadTheme(), queue: DS.reviewDue().map((c) => c.id), pos: 0, revealed: false, results: [], saved: loadSaved() };
  }
  componentDidMount() {
    listenTheme(this);
    // Keys: Space or Enter reveals (when focus is not on another control), 1-4 rate. Ignored while typing or with a modifier held.
    this.onKey = (e) => {
      const tag = e.target && e.target.tagName;
      if (e.ctrlKey || e.metaKey || e.altKey || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (this.state.pos >= this.state.queue.length) return;
      if (!this.state.revealed && (e.key === ' ' || e.key === 'Enter') && tag !== 'BUTTON' && tag !== 'A') { e.preventDefault(); this.reveal(); }
      else if (this.state.revealed && /^[1-4]$/.test(e.key)) { e.preventDefault(); this.rate(Number(e.key)); }
    };
    // Phones get a 420px single-column layout (the runtime zooms it to fit); desktop keeps the 1440px board.
    this.onResize = () => { if (rvMobile() !== this.mobile) this.forceUpdate(); };
    try { window.addEventListener('keydown', this.onKey); window.addEventListener('resize', this.onResize); } catch (e) {}
  }
  componentWillUnmount() { unlistenTheme(this); try { window.removeEventListener('keydown', this.onKey); window.removeEventListener('resize', this.onResize); } catch (e) {} }
  focus(ids) { setTimeout(() => { try { for (const id of ids) { const el = document.getElementById(id); if (el) { el.focus(); return; } } } catch (e) {} }, 30); }
  reveal() { this.setState({ revealed: true }); this.focus(['rv-answer']); }
  rate(grade) {
    const id = this.state.queue[this.state.pos];
    if (!id) return;
    const next = DS.review(id, grade);
    this.setState({ results: this.state.results.concat([{ id, grade, interval: next.interval }]), pos: this.state.pos + 1, revealed: false });
    this.focus(['rv-reveal', 'rv-done']);
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const s = this.state;
    const all = DS.reviewCards();
    const byId = {};
    all.forEach((c) => { byId[c.id] = c; });
    const Q = s.queue.filter((id) => byId[id]);
    const total = Q.length;
    const inSession = s.pos < total;
    const C = inSession ? rvCard(byId[Q[s.pos]]) : null;
    const now = new Date();
    const results = s.results;
    const recalled = results.filter((r) => r.grade > 1).length;
    const left = Math.max(0, total - s.pos);
    const up = DS.reviewUpcoming(7);
    const ret = DS.retention(30);
    const maxW = Math.max(1, ...up.counts.map((c) => c.n));
    const next = up.cards[0];
    const noCards = all.length === 0;
    const note = C ? DS.note(C.noteId) : '';
    const preview = C ? DS.reviewPreview(C.id) : [];
    const retColor = ret.pct === null ? t.muted : ret.pct >= 70 ? t.ok : ret.pct >= 50 ? t.medFg : t.left;
    const m = this.mobile = rvMobile();
    const L = m ? { rootW: 420, rootH: 'auto', pad: '16px 16px 112px', cols: 'minmax(0, 1fr)', gap: '24px', h1: '34px', h2: '28px', count: '36px', countPad: '12px 16px', cardPad: '20px', ansPad: '16px', rateCols: 'repeat(2, minmax(0, 1fr))', statCols: 'minmax(0, 1fr)' }
      : { rootW: 1440, rootH: '1320px', pad: '32px 40px', cols: 'minmax(0, 1fr) 420px', gap: '32px', h1: '48px', h2: '40px', count: '48px', countPad: '16px 24px', cardPad: '32px', ansPad: '24px', rateCols: 'repeat(4, minmax(0, 1fr))', statCols: 'repeat(3, minmax(0, 1fr))' };
    const blankCard = { name: '', story: '', hasStory: false, pattern: '', kind: '', meta: '', when: '', hasWhen: false, rule: '', hasRule: false, ruleTitle: '', note: '', hasNote: false, href: '', go: null, linkLabel: '' };
    return {
      t, L, ...navVals(this, t, themeKey, 'Revisit'),
      today: RV_DAYS[now.getDay()] + ' ' + now.getDate() + ' ' + RV_MONTHS[now.getMonth()],
      dueCount: String(left),
      dueUnit: left === 1 ? 'card due today' : 'cards due today',
      headline: inSession ? 'Due today' : total ? 'All caught up for today.' : 'Nothing due.',
      subline: inSession ? 'Say the key move out loud, then reveal it and rate how well you knew it. The better you knew it, the longer until it comes back.'
        : total ? 'Every card you rated has a new date. Shaky ones come back soon, solid ones much later.'
        : noCards ? 'Finish a story to start your queue.' : 'Your next card comes back ' + DS.whenLabel(next ? next.inDays : 1) + '. Finished stories and ticked sheet problems join the queue the day after.',
      progressLabel: inSession ? 'Card ' + (s.pos + 1) + ' of ' + total : total + ' of ' + total + ' done',
      showProgress: total > 0,
      bars: Q.map((id, i) => {
        const r = results[i];
        return { label: rvCard(byId[id]).name, bg: r ? (r.grade > 1 ? t.ok : t.left) : i === s.pos ? t.accent : t.line2 };
      }),
      inSession, sessionDone: !inSession && total > 0, emptyDue: total === 0,
      noCards, someUpcoming: total === 0 && !noCards,
      card: C ? {
        name: C.name, story: C.story, hasStory: !!C.story, pattern: C.pattern || 'Sheet problem', kind: C.kind === 'story' ? 'Story' : 'Sheet',
        meta: C.late ? (C.late === 1 ? 'A day overdue' : C.late + ' days overdue') : C.reps ? 'Due today' : 'First review',
        when: C.when, hasWhen: !!C.when, rule: C.rule, hasRule: !!C.rule,
        ruleTitle: C.kind === 'story' ? 'The key rule' : 'The key move',
        note, hasNote: !!note, href: C.href, go: C.go, linkLabel: C.linkLabel
      } : blankCard,
      revealed: s.revealed, hidden: !s.revealed,
      reveal: () => this.reveal(),
      rates: preview.map((p, i) => ({
        label: p.label, key: String(p.grade), when: p.when, note: RV_GRADE_NOTE[i],
        border: i === 0 ? t.flame : i === 3 ? t.ok : t.line2,
        aria: p.label + ', key ' + p.grade + ': ' + RV_GRADE_NOTE[i].toLowerCase() + '. Comes back ' + p.when + '.',
        pick: () => this.rate(p.grade)
      })),
      doneTitle: recalled + ' of ' + total + ' remembered.',
      doneStats: [[String(results.length), results.length === 1 ? 'card reviewed' : 'cards reviewed'], ['+' + results.length * DS.XP.revisit, 'XP earned'], [String(up.counts[0].n), up.counts[0].n === 1 ? 'card due tomorrow' : 'cards due tomorrow']].map(([v, k]) => ({ v, k })),
      // retention and upcoming
      retPct: ret.pct === null ? '–' : ret.pct + '%', retColor,
      retAria: ret.pct === null ? 'Retention: no reviews yet' : 'Retention ' + ret.pct + ' percent',
      retLine: ret.pct === null ? 'Shows up after your first review.' : ret.recalled + ' of ' + ret.reviews + (ret.reviews === 1 ? ' review' : ' reviews') + ' recalled in the last 30 days.',
      retAdvice: ret.pct === null ? 'Above 70% means the gaps suit you.' : ret.pct >= 70 ? 'Healthy. Keep the daily habit.' : ret.pct >= 50 ? 'Some cards are slipping. Rate honestly and they come back sooner.' : 'Lots of Again. Clear the queue before starting new stories.',
      retBar: ret.pct === null ? '0%' : ret.pct + '%',
      week: up.counts.map((c, i) => ({ n: c.n, h: Math.round((c.n / maxW) * 72) + 4, d: i === 0 ? 'Tmrw' : rvDayName(i + 1), aria: rvDate(c.date) + ': ' + c.n + (c.n === 1 ? ' card' : ' cards'), color: c.n ? t.accent : t.line2 })),
      weekTotal: up.counts.reduce((a, c) => a + c.n, 0) + ' in the next 7 days',
      upcoming: up.cards.slice(0, 6).map((c) => { const v = rvCard(c); return { name: v.name, pattern: v.pattern || 'Sheet problem', when: c.inDays <= 1 ? 'Tomorrow' : rvDate(c.due) }; }),
      hasUpcoming: up.cards.length > 0, noUpcoming: up.cards.length === 0,
      upcomingMore: up.cards.length > 6 ? '+' + (up.cards.length - 6) + ' more later' : '',
      hasMore: up.cards.length > 6,
      queueSize: all.length + (all.length === 1 ? ' card' : ' cards') + ' in your queue',
      saved: s.saved.map((id) => PROBLEMS.find((p) => p.id === id)).filter(Boolean).map((p) => ({ story: p.story, pattern: p.pattern, href: p.animated ? 'Story.dc.html' : 'Briefing.dc.html', go: () => saveProblem(p.id) })),
      noSaved: s.saved.length === 0
    };
  }
}
