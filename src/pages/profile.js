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
// ---- share card: a 1200x630 PNG drawn on a canvas in the browser, in the Max theme. Nothing leaves the page.
// It shows only the wordmark, the name the learner typed (if any), streak, stories, sheet count and the top three pattern rings.
const SHARE_W = 1200, SHARE_H = 630;
function shareStats() {
  const me = DS.profile(), st = DS.streak(), stories = DS.stories(), sheet = DS.sheet();
  const pats = DS.patterns(PROBLEMS, PATTERNS).filter((p) => p.total);
  const top = pats.slice().sort((a, b) => b.pct - a.pct || b.done - a.done || pats.indexOf(a) - pats.indexOf(b)).slice(0, 3);
  return { name: me.name, streak: st.current, stories: stories.count, storyTotal: PROBLEMS.length, sheet: sheet.ticked, sheetTotal: sheet.total, top };
}
function shareAlt(d) {
  return 'DSAMaxxing progress card' + (d.name ? ' for ' + d.name : '') + ': ' + d.streak + '-day streak, ' + d.stories + ' of ' + d.storyTotal + ' stories finished, ' + d.sheet + ' of ' + d.sheetTotal + ' sheet problems solved. Top patterns: ' + d.top.map((p) => p.name + ' ' + p.pct + '%').join(', ') + '.';
}
function drawShareCard(canvas, d) {
  const T = THEMES.max;
  canvas.width = SHARE_W; canvas.height = SHARE_H;
  const x = canvas.getContext('2d');
  const display = "'Anton', Impact, 'Arial Narrow', sans-serif", body = "'Outfit', system-ui, sans-serif";
  x.fillStyle = T.bg; x.fillRect(0, 0, SHARE_W, SHARE_H);
  // A lime glow in the corner and a faint dot grid, so the card reads as ours at a glance.
  const g = x.createRadialGradient(1080, 60, 0, 1080, 60, 520);
  g.addColorStop(0, 'rgba(197,240,74,0.22)'); g.addColorStop(1, 'rgba(197,240,74,0)');
  x.fillStyle = g; x.fillRect(0, 0, SHARE_W, SHARE_H);
  x.fillStyle = 'rgba(255,255,255,0.05)';
  for (let gx = 36; gx < SHARE_W; gx += 36) for (let gy = 36; gy < SHARE_H; gy += 36) x.fillRect(gx, gy, 2, 2);
  x.fillStyle = T.accent; x.fillRect(0, 0, 12, SHARE_H);
  x.textBaseline = 'alphabetic'; x.textAlign = 'left';
  // wordmark and name
  x.fillStyle = T.accent; x.font = '64px ' + display;
  x.fillText('DSAMAXXING', 72, 118);
  x.fillStyle = T.text2; x.font = '500 26px ' + body;
  x.fillText(d.name ? d.name.slice(0, 32) + '\u2019s progress' : 'My progress', 72, 164);
  // three stats
  const stats = [[String(d.streak), 'day streak', T.flame], [String(d.stories), 'of ' + d.storyTotal + ' stories finished', T.text], [String(d.sheet), 'of ' + d.sheetTotal + ' sheet problems', T.text]];
  stats.forEach(([v, label, color], i) => {
    const sx = 72 + i * 360;
    x.fillStyle = color; x.font = '120px ' + display;
    x.fillText(v, sx, 330);
    x.fillStyle = T.muted; x.font = '500 24px ' + body;
    x.fillText(label, sx, 370);
  });
  x.fillStyle = T.line2; x.fillRect(72, 410, SHARE_W - 144, 2);
  // top three pattern rings
  const colors = [T.accent, T.right, T.flame];
  x.fillStyle = T.muted; x.font = '700 18px ' + body;
  x.fillText('TOP PATTERNS', 72, 452);
  d.top.forEach((p, i) => {
    const cx = 72 + 52 + i * 340, cy = 532, r = 44;
    x.lineWidth = 12; x.lineCap = 'round';
    x.strokeStyle = T.line2; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke();
    if (p.pct > 0) { x.strokeStyle = colors[i]; x.beginPath(); x.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * p.pct) / 100); x.stroke(); }
    x.fillStyle = T.text; x.textAlign = 'center'; x.font = '700 22px ' + body;
    x.fillText(p.pct + '%', cx, cy + 8);
    x.textAlign = 'left'; x.font = '600 22px ' + body; x.fillStyle = T.text;
    let label = p.name;
    while (x.measureText(label).width > 200 && label.length > 4) label = label.slice(0, -1);
    if (label !== p.name) label = label.trim() + '\u2026';
    x.fillText(label, cx + r + 20, cy - 4);
    x.fillStyle = T.muted; x.font = '500 18px ' + body;
    x.fillText(p.done + ' of ' + p.total + ' stories', cx + r + 20, cy + 22);
  });
  x.textAlign = 'right'; x.fillStyle = T.muted; x.font = '500 18px ' + body;
  x.fillText('DSA, told as stories', SHARE_W - 72, 452);
  x.textAlign = 'left';
}
function canCopyImage() { try { return !!(navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem !== 'undefined'); } catch (e) { return false; } }

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { theme: loadTheme(), prefs: loadPrefs(), savedAt: false, cert: Math.max(0, certRows().findIndex((c) => c.when)), day: null, nudged: [], del: 0, share: null, shareMsg: '' };
    // Medals earned since the last visit shine once; then they are marked seen.
    const medals = DS.medals(PROBLEMS, PATTERNS);
    this.fresh = {};
    medals.forEach((m) => { if (m.fresh) this.fresh[m.key] = 1; });
    DS.markMedalsSeen(medals);
  }
  componentDidMount() { listenTheme(this); }
  componentWillUnmount() { unlistenTheme(this); }
  focusId(id) { setTimeout(() => { try { const el = document.getElementById(id); if (el) el.focus(); } catch (e) {} }, 30); }
  // Draw the card once the display fonts are ready (they fall back to Impact and system fonts if they never load).
  shareProgress() {
    const d = shareStats();
    const draw = () => {
      try {
        const c = document.createElement('canvas');
        drawShareCard(c, d);
        this.canvas = c;
        this.setState({ share: { url: c.toDataURL('image/png'), alt: shareAlt(d) }, shareMsg: '' });
        this.focusId('pf-share');
      } catch (e) { this.setState({ share: null, shareMsg: 'This browser cannot draw the card.' }); }
    };
    try {
      if (document.fonts && document.fonts.load) Promise.all([document.fonts.load('64px Anton'), document.fonts.load('500 24px Outfit'), document.fonts.load('700 22px Outfit')]).then(draw, draw);
      else draw();
    } catch (e) { draw(); }
  }
  downloadShare() {
    if (!this.state.share) return;
    const name = 'dsamaxxing-progress-' + DS.dayKey(Date.now()) + '.png';
    try {
      const a = document.createElement('a');
      a.href = this.state.share.url; a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      this.setState({ shareMsg: 'Saved ' + name + ' to your downloads.' });
    } catch (e) { this.setState({ shareMsg: 'Download is blocked here. Right-click the image to save it.' }); }
  }
  copyShare() {
    const done = (msg) => this.setState({ shareMsg: msg });
    if (!this.canvas || !canCopyImage()) { done('This browser cannot copy images. Download it instead.'); return; }
    try {
      this.canvas.toBlob((blob) => {
        if (!blob) { done('Could not copy the image. Download it instead.'); return; }
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(() => done('Copied. Paste it into a post or chat.'), () => done('Copy was blocked. Download it instead.'));
      }, 'image/png');
    } catch (e) { done('Could not copy the image. Download it instead.'); }
  }
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
      pageH: 2040 + (this.state.share ? 392 : 0),
      shareProfile: () => this.shareProgress(),
      shareOpen: !!this.state.share, shareUrl: this.state.share ? this.state.share.url : '', shareAlt: this.state.share ? this.state.share.alt : '',
      shareMsg: this.state.shareMsg, canCopy: canCopyImage(),
      downloadShare: () => this.downloadShare(), copyShare: () => this.copyShare(),
      closeShare: () => { this.setState({ share: null, shareMsg: '' }); this.focusId('pf-share-btn'); },
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
