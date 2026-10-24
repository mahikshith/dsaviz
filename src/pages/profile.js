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
const CERTIFIED = { 'Hash Map': ['Certified 20 Sep 2026', 'DSV-HM-2026-5177'] };
function certRows() {
  return CERT_PATTERNS.map(([name, mark]) => {
    const core = PROBLEMS.filter((p) => p.pattern === name && p.animated);
    const have = core.filter((p) => p.status === 'done').length;
    const cert = CERTIFIED[name] && have >= core.length ? CERTIFIED[name] : null;
    return { name, mark, have, need: core.length, when: cert ? cert[0] : '', id: cert ? cert[1] : '', core };
  });
}
const BUDDIES = [
  ['Ananya Rao', 'AR', 'Final year · PES University', 12, true],
  ['Rohit Verma', 'RV', 'SDE-1 · Bengaluru', 5, false],
  ['Meera Nair', 'MN', 'M.Tech · IIIT Hyderabad', 2, false]
];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYNAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function loadPrefs() { const v = readJSON(PREFS_KEY, {}); return Object.assign({}, PREF_DEFAULT, v && typeof v === 'object' ? v : {}); }
// Clipboard can be blocked (permissions, iframes); the button still confirms.
function copyText(text) { try { const w = navigator.clipboard && navigator.clipboard.writeText(text); if (w && w.catch) w.catch(() => {}); } catch (e) {} }
function noise(i) { return Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1; }

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { theme: loadTheme(), prefs: loadPrefs(), savedAt: false, cert: Math.max(0, certRows().findIndex((c) => c.when)), day: null, shared: false, copied: false, nudged: [], del: 0 };
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
    // 26 weeks of activity, ending today; quieter at the start, a real habit by the end.
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = new Date(today); start.setDate(today.getDate() - today.getDay() - 175);
    const todayIdx = 175 + today.getDay();
    const dayIdx = this.state.day === null ? todayIdx : this.state.day;
    const levels = [t.sunk, t.okBg, 'color-mix(in srgb, ' + t.ok + ' 45%, ' + t.okBg + ')', 'color-mix(in srgb, ' + t.ok + ' 75%, ' + t.okBg + ')', t.ok];
    let total = 0, active = 0;
    const cells = [];
    for (let i = 0; i < 182; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      const future = d > today;
      const ramp = i / 182;
      const streak = i > todayIdx - 23 && i <= todayIdx;
      let n = future ? 0 : streak ? 1 + Math.floor(noise(i) * 5) : noise(i) < 0.25 + ramp * 0.55 ? 1 + Math.floor(noise(i + 7) * (2 + ramp * 4)) : 0;
      if (i === todayIdx - 23) n = 0;
      total += n; if (n) active++;
      const lvl = n === 0 ? 0 : n < 2 ? 1 : n < 4 ? 2 : n < 6 ? 3 : 4;
      const label = DAYNAMES[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()];
      const story = PROBLEMS[(i * 7) % PROBLEMS.length].story;
      cells.push({ n, d, label, story, bg: future ? 'transparent' : levels[lvl], border: i === dayIdx ? '2px solid ' + t.text : future ? '1px dashed ' + t.line : '0',
        tip: label + ': ' + (n ? n + ' story step' + (n > 1 ? 's' : '') : 'no learning'), pick: () => { if (!future) this.setState({ day: i }); } });
    }
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
    return {
      t, themeBtns: themeButtons(this, themeKey, t),
      chips: ['Level 9 · 2,640 XP', 'Lantern League #14', 'Python', 'Placements: December 2026'],
      shareLabel: this.state.shared ? 'Profile link copied ✓' : 'Share my profile',
      shareProfile: () => { copyText('DSAMaxxing · Aarav Sharma · 23-day streak'); this.setState({ shared: true }); },
      stats: [['23', 'day streak', t.flame], ['31', 'longest streak', t.text], [String(PROBLEMS.filter((p) => p.status === 'done').length), 'stories finished', t.text], [String(CERTS.filter((x) => x.when).length), 'pattern certified', t.ok], ['78%', 'revisit recall', t.text]].map(([v, k, color]) => ({ v, k, color })),
      heatTitle: total + ' story steps and revisit cards in 6 months · ' + active + ' active days',
      months, cells,
      day: {
        date: sel.label + (dayIdx === todayIdx ? ' · today' : ''),
        head: sel.n ? sel.n + ' story step' + (sel.n > 1 ? 's' : '') : 'A rest day',
        line: sel.n ? 'Mostly ' + sel.story + (sel.n > 3 ? ', plus a Revisit session.' : '.') : 'Nothing that day. Rest days happen — a streak freeze covers one a week.'
      },
      legend: levels,
      certs: CERTS.map(({ name, mark, have, need, when }, i) => {
        const done = !!when, on = i === this.state.cert;
        return {
          name, mark, on, pct: need ? Math.round((have / need) * 100) + '%' : '0%',
          color: done ? t.ok : have ? t.diff.Medium[0] : t.faint,
          state: done ? 'Certified' : !need ? 'Coming soon' : have >= need ? 'Exam ready' : have ? 'In progress' : 'Not started', stateColor: done ? t.ok : t.muted,
          note: done ? when : !need ? 'Its stories are being animated' : have + ' of ' + need + ' core stories walked',
          border: on ? t.text : t.line, bg: done ? t.okBg : t.surface, op: need ? 1 : 0.7,
          pick: () => this.setState({ cert: i })
        };
      }),
      cert: {
        earned, locked: !earned, color: earned ? t.ok : t.muted, bg: earned ? t.okBg : t.sunk,
        title: earned ? c[0] : c[0] + ' — not yet',
        line: earned ? 'Aarav Sharma walked every core ' + c[0] + ' story and passed the pattern exam: spot the pattern in 5 unseen problems, then rebuild the key code from memory.' : soon ? pattern[2] + '’s stories are being animated. The exam opens once they’re ready — the briefings are already in the library.' : 'Walk all ' + c[3] + ' core ' + c[0] + ' stories to unlock the 10-minute pattern exam. ' + pattern[2] + ' is waiting.',
        meta: earned ? c[4] + ' · ID ' + c[5] : soon ? 'Coming soon' : c[2] + ' of ' + c[3] + ' core stories walked',
        linkedin: 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=' + enc(certName) + '&organizationName=DSAMaxxing&issueYear=2026&issueMonth=9&certId=' + enc(c[5] || ''),
        whatsapp: 'https://wa.me/?text=' + enc('I just earned the ' + certName + ' on DSAMaxxing — every ' + c[0] + ' problem as a story. Try it: 7 free days with code AARAV7'),
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
      buddies: BUDDIES.map(([name, initials, where, streak, today], i) => {
        const nudged = this.state.nudged.includes(i);
        return {
          name, initials, where, streak: streak + ' days', color: [t.right, t.ok, t.left][i],
          done: today || nudged, btn: today ? 'Learned today ✓' : nudged ? 'Nudged ✓' : 'Nudge', btnFg: today || nudged ? t.muted : t.text,
          nudge: () => { if (!today && !nudged) this.setState({ nudged: this.state.nudged.concat([i]) }); }
        };
      }),
      deleting: this.state.del === 1, notDeleting: this.state.del !== 1,
      deleteLabel: this.state.del === 2 ? 'Deletion requested — check your email to confirm' : 'Delete my account',
      askDelete: () => { if (this.state.del !== 2) this.setState({ del: 1 }); },
      confirmDelete: () => this.setState({ del: 2 }),
      cancelDelete: () => this.setState({ del: 0 }),
      copyLabel: this.state.copied ? 'Copied ✓' : 'Copy',
      copyCode: () => { copyText('AARAV7'); this.setState({ copied: true }); },
      inviteWa: 'https://wa.me/?text=' + enc('I’m learning DSA as stories on DSAMaxxing — Two Pointers finally clicked. Use my code AARAV7 for 7 free days.'),
      milestones: [['23', '23-day streak', 'today', t.flame], ['HM', 'Hash Map certificate', '20 Sep', t.ok], ['50', '50 revisit cards', '17 Sep', t.right], ['1st', 'First story walked: The Mirror Hallway', '3 Jun', t.accent]].map(([mark, name, when, bg]) => ({ mark, name, when, bg, fg: t.onAccent }))
    };
  }
}
