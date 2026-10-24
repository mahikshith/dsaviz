// ---- page ----
const PREFS_KEY = 'dsaviz-prefs';
const PREF_DEFAULT = { goal: '20', time: '21:30', channel: 'WhatsApp', depth: 'Builder', lang: 'Python' };
const PREF_GROUPS = [
  ['goal', 'Daily goal', 'Minutes a day you promise yourself', [['5', '5 min · casual'], ['10', '10 min · regular'], ['20', '20 min · serious'], ['40', '40 min · intense']]],
  ['time', 'Reminder time', 'Old Hoot nudges you once a day', [['07:30', '7:30 AM'], ['13:00', '1:00 PM'], ['18:30', '6:30 PM'], ['21:30', '9:30 PM']]],
  ['channel', 'Remind me on', 'Pick the one you actually check', [['WhatsApp', 'WhatsApp'], ['Email', 'Email'], ['Push', 'App notification'], ['Off', 'No reminders']]],
  ['depth', 'Start stories at', 'You can always switch inside a story', [['Kid', 'Kid depth'], ['Builder', 'Builder depth'], ['Expert', 'Expert depth']]],
  ['lang', 'Code in', 'Every story shows this language first', [['Python', 'Python'], ['Java', 'Java'], ['C++', 'C++'], ['JS', 'JavaScript'], ['Go', 'Go']]]
];
// Certificates: walk a pattern's core (animated) stories, then pass its 10-minute exam.
const CERT_PATTERNS = [['Two Pointers', 'TP'], ['Sliding Window', 'SW'], ['Hash Map', 'HM'], ['Binary Search', 'BS'], ['Stack', 'ST'], ['Breadth-First Search', 'BF']];
// Certificates need the pattern exam, which needs accounts; none are issued yet.
const CERTIFIED = {};
function certRows() {
  return CERT_PATTERNS.map(([name, mark]) => {
    const core = PROBLEMS.filter((p) => p.pattern === name && p.animated);
    const have = core.filter((p) => p.status === 'done').length;
    const cert = CERTIFIED[name] && have >= core.length ? CERTIFIED[name] : null;
    return { name, mark, have, need: core.length, when: cert ? cert[0] : '', id: cert ? cert[1] : '', core };
  });
}
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYNAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function loadPrefs() { const v = readJSON(PREFS_KEY, {}); return Object.assign({}, PREF_DEFAULT, v && typeof v === 'object' ? v : {}); }
// Clipboard can be blocked (permissions, iframes); the button still confirms.
function copyText(text) { try { const w = navigator.clipboard && navigator.clipboard.writeText(text); if (w && w.catch) w.catch(() => {}); } catch (e) {} }

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { theme: loadTheme(), prefs: loadPrefs(), savedAt: false, cert: Math.max(0, certRows().findIndex((c) => c.when)), day: null, shared: false, nudged: [], del: 0 };
    // Medals earned since the last visit shine once; then they are marked seen.
    const medals = DS.medals(PROBLEMS, PATTERNS);
    this.fresh = {};
    medals.forEach((m) => { if (m.fresh) this.fresh[m.key] = 1; });
    DS.markMedalsSeen(medals);
  }
  componentDidMount() { listenTheme(this); }
  componentWillUnmount() { unlistenTheme(this); }
  setPref(k, v) {
    const prefs = Object.assign({}, this.state.prefs, { [k]: v });
    writeJSON(PREFS_KEY, prefs);
    this.setState({ prefs, savedAt: true });
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    // 26 weeks of real activity from DS: stories, sheet ticks, passed tests and revisit cards.
    const hm = DS.heatmap(26);
    const todayIdx = hm.todayIndex;
    const dayIdx = this.state.day === null ? todayIdx : this.state.day;
    const levels = [t.sunk, t.okBg, 'color-mix(in srgb, ' + t.ok + ' 45%, ' + t.okBg + ')', 'color-mix(in srgb, ' + t.ok + ' 75%, ' + t.okBg + ')', t.ok];
    const plural = (n, one, many) => n + ' ' + (n === 1 ? one : many || one + 's');
    const cells = hm.cells.map((c, i) => {
      const d = new Date(c.ts);
      const label = DAYNAMES[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()];
      const parts = [c.story ? plural(c.story, 'story', 'stories') : '', c.sheet ? plural(c.sheet, 'sheet tick') : '', c.code ? plural(c.code, 'passed test') : '', c.lesson ? plural(c.lesson, 'lesson') : '', c.revisit ? plural(c.revisit, 'revisit card') : ''].filter(Boolean);
      return { n: c.n, d, label, parts, bg: c.future ? 'transparent' : levels[c.level], border: i === dayIdx ? '2px solid ' + t.text : c.future ? '1px dashed ' + t.line : '0',
        tip: label + ': ' + (c.n ? parts.join(', ') : 'no learning'), pick: () => { if (!c.future) this.setState({ day: i }); } };
    });
    const months = [];
    for (let w = 0; w < 26; w++) {
      const d = cells[w * 7].d;
      const prev = w ? cells[(w - 1) * 7].d : null;
      const lastLabel = months.reduce((a, m, j) => (m ? j : a), -9);
      months.push(prev && prev.getMonth() !== d.getMonth() && w - lastLabel > 2 && w < 25 ? MONTHS[d.getMonth()] : '');
    }
    const sel = cells[dayIdx];
    const CERTS = certRows();
    const cr = CERTS[this.state.cert];
    const c = [cr.name, cr.mark, cr.have, cr.need, cr.when, cr.id];
    const earned = !!cr.when;
    const soon = cr.need === 0;
    const pattern = PATTERNS.find(([n]) => n === c[0]);
    const nextP = cr.core.find((p) => p.status !== 'done') || PROBLEMS.find((p) => p.pattern === c[0] && p.status !== 'done') || PROBLEMS.find((p) => p.pattern === c[0]);
    const certName = c[0] + ' pattern certificate';
    const enc = encodeURIComponent;
    const prefs = this.state.prefs;
    const me = DS.profile();
    const st = DS.streak();
    const xp = DS.xp();
    const stories = DS.stories();
    const sheet = DS.sheet();
    const pats = DS.patterns(PROBLEMS, PATTERNS).filter((p) => p.total);
    const top = pats.slice().sort((a, b) => b.pct - a.pct || pats.indexOf(a) - pats.indexOf(b)).slice(0, 4);
    const ringColors = [t.accent, t.right, t.flame, t.ok];
    const buddyData = DS.buddies();
    const who = me.name || 'A DSAMaxxing learner';
    const firstDay = hm.cells.find((x) => x.n);
    return {
      t, ...navVals(this, t, themeKey, 'Profile'), themeBtns: themeButtons(this, themeKey, t),
      me: {
        title: me.name || 'Your profile', hasName: !!me.initials, noName: !me.initials, initials: me.initials, icon: ICONS.user,
        avatarBg: me.initials ? t.accent : t.sunk, avatarFg: me.initials ? t.onAccent : t.text,
        line: me.isNew ? 'Nothing learned yet. Your progress shows up here as you go.' : firstDay ? 'Learning since ' + new Date(firstDay.ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Learning for a while now',
        cta: me.name ? 'Change my goals' : 'Set your name and goals'
      },
      chips: ['Level ' + xp.level + ' · ' + xp.total.toLocaleString('en-US') + ' XP'].concat(prefs.lang ? [prefs.lang === 'JS' ? 'JavaScript' : prefs.lang] : [], ['Saved in this browser']),
      shareLabel: this.state.shared ? 'Copied ✓' : 'Copy my stats',
      shareProfile: () => { copyText('DSAMaxxing · ' + who + ' · ' + st.current + '-day streak · ' + stories.count + ' stories · ' + sheet.ticked + ' sheet problems'); this.setState({ shared: true }); },
      rings: ringSet(t, top.map((p, i) => ({ label: p.name, value: p.done + '/' + p.total, pct: p.pct, color: ringColors[i] })), 136, 11),
      tiles: statTiles(t, [
        { icon: 'flame', color: t.flame, value: st.current, unit: st.current === 1 ? 'day' : 'days', label: 'Streak', pct: null },
        { icon: 'flame', color: t.medFg, value: st.longest, unit: st.longest === 1 ? 'day' : 'days', label: 'Longest streak', pct: null },
        { icon: 'story', color: t.accent, value: stories.count, unit: '/ ' + PROBLEMS.length, label: 'Stories finished', pct: (stories.count / PROBLEMS.length) * 100 },
        { icon: 'sheet', color: t.right, value: sheet.ticked, unit: '/ ' + sheet.total, label: 'Sheet ticked', pct: (sheet.ticked / sheet.total) * 100 },
        { icon: 'bolt', color: t.ok, value: xp.total.toLocaleString('en-US'), unit: 'XP', label: 'Level ' + xp.level, pct: xp.pct }
      ]),
      shelf: medalShelf(t, DS.medals(PROBLEMS, PATTERNS), 20, this.fresh),
      heatTitle: hm.activeDays ? plural(hm.activeDays, 'active day') + ' in 6 months' : 'Your 6 months start today',
      months, cells,
      day: {
        date: sel.label + (dayIdx === todayIdx ? ' · today' : ''),
        head: sel.n ? plural(sel.n, 'thing') + ' done' : dayIdx === todayIdx ? 'Nothing yet today' : 'A rest day',
        line: sel.n ? sel.parts.join(' · ') : dayIdx === todayIdx ? 'Finish a story or lesson, tick a sheet problem or pass a code test. Each one lights up today.' : 'Nothing that day. Rest days happen.'
      },
      legend: levels,
      certs: CERTS.map(({ name, mark, have, need, when }, i) => {
        const done = !!when, on = i === this.state.cert;
        return {
          name, mark, on, pct: need ? Math.round((have / need) * 100) + '%' : '0%',
          color: done ? t.ok : have ? t.diff.Medium[0] : t.faint,
          state: done ? 'Certified' : !need ? 'Coming soon' : have >= need ? 'Core done' : have ? 'In progress' : 'Not started', stateColor: done ? t.ok : t.muted,
          note: done ? when : !need ? 'Its stories are being animated' : have + ' of ' + need + ' core stories walked',
          border: on ? t.text : t.line, bg: done ? t.okBg : t.surface, op: need ? 1 : 0.7,
          pick: () => this.setState({ cert: i })
        };
      }),
      cert: {
        earned, locked: !earned, color: earned ? t.ok : t.muted, bg: earned ? t.okBg : t.sunk,
        title: earned ? c[0] : c[0] + ' — not yet',
        line: earned ? who + ' walked every core ' + c[0] + ' story and passed the pattern exam: spot the pattern in 5 unseen problems, then rebuild the key code from memory.' : soon ? pattern[2] + '’s stories are being animated. The exam opens once they’re ready — the briefings are already in the library.' : 'Walk all ' + c[3] + ' core ' + c[0] + ' stories to unlock the 10-minute pattern exam. ' + pattern[2] + ' is waiting.',
        meta: earned ? c[4] + ' · ID ' + c[5] : soon ? 'Coming soon' : c[2] + ' of ' + c[3] + ' core stories walked',
        linkedin: 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=' + enc(certName) + '&organizationName=DSAMaxxing&issueYear=2026&issueMonth=9&certId=' + enc(c[5] || ''),
        whatsapp: 'https://wa.me/?text=' + enc('I just earned the ' + certName + ' on DSAMaxxing — every ' + c[0] + ' problem as a story.'),
        cta: soon ? 'Read ' + nextP.story : c[2] ? 'Continue: ' + nextP.story : 'Start with ' + nextP.story,
        nextHref: nextP.animated ? 'Story.dc.html' : 'Briefing.dc.html',
        go: () => saveProblem(nextP.id),
        help: earned ? 'Recruiters can check the ID. It lists the stories you walked and your exam score.' : 'Certificates list exactly what you practised, so they mean something on a CV.'
      },
      savedNote: this.state.savedAt ? 'Saved ✓' : '',
      prefGroups: PREF_GROUPS.map(([key, title, sub, opts]) => ({
        title, sub,
        opts: opts.map(([v, label]) => {
          const on = prefs[key] === v;
          return { label, on, bg: on ? t.text : 'transparent', fg: on ? t.bg : t.text, border: on ? t.text : t.line2, pick: () => this.setPref(key, v) };
        })
      })),
      buddies: buddyData.list.map((bd, i) => {
        const nudged = this.state.nudged.includes(i);
        return {
          name: bd.name, initials: bd.initials, where: bd.where, streak: bd.streak + ' days', color: [t.right, t.ok, t.left][i % 3],
          done: bd.learnedToday || nudged, btn: bd.learnedToday ? 'Learned today ✓' : nudged ? 'Nudged ✓' : 'Nudge', btnFg: bd.learnedToday || nudged ? t.muted : t.text,
          nudge: () => { if (!bd.learnedToday && !nudged) this.setState({ nudged: this.state.nudged.concat([i]) }); }
        };
      }),
      deleting: this.state.del === 1, notDeleting: this.state.del !== 1,
      deleteLabel: this.state.del === 2 ? 'Deletion requested — check your email to confirm' : 'Delete my account',
      askDelete: () => { if (this.state.del !== 2) this.setState({ del: 1 }); },
      confirmDelete: () => this.setState({ del: 2 }),
      cancelDelete: () => this.setState({ del: 0 }),
      inviteWa: 'https://wa.me/?text=' + enc('I’m learning DSA as stories on DSAMaxxing. Every problem is a story you watch step by step.'),
    };
  }
}
