// ---- page ----
const ONBOARD_KEY = 'dsaviz-onboard';
const REASONS = [
  ['placements', '🎓', 'Campus placements', 'Online assessments and interviews are coming up'],
  ['switch', '💼', 'Switching jobs', 'I code for a living, but DSA rounds scare me'],
  ['maang', '🎯', 'FAANG / MAANG prep', 'Aiming for Google, Amazon, Microsoft and the like'],
  ['fun', '🌱', 'Learning for the joy of it', 'I want to finally understand how this stuff works']
];
const LEVELS = [
  ['zero', '✏️', 'I’ve never really written code', 'We’ll start with language basics, then the gentlest stories', 'Basics.dc.html', 'strings'],
  ['lang', '🧩', 'I know a language, but not DSA', 'Start the learning path at Strings — two friends on a hallway', 'Story.dc.html', 'strings'],
  ['some', '⚙️', 'I’ve solved some practice problems', 'Jump to patterns: Two Pointers, Sliding Window, Hash Map', 'Story.dc.html', 'arrays'],
  ['ready', '🚀', 'Interview-ready, just need a refresh', 'Revisit daily, then mock interviews and company tracks', 'Interview.dc.html', 'arrays']
];
const GOALS = [['5', '☕', '5 minutes', 'Casual · one story step set'], ['10', '🚶', '10 minutes', 'Regular · most people pick this'], ['20', '🏃', '20 minutes', 'Serious · a story a day'], ['40', '🔥', '40 minutes', 'Intense · placement season mode']];
const WLANGS = ['Python', 'Java', 'C++', 'JavaScript', 'Go'];
const TIMES = [['07:30', '7:30 AM'], ['13:00', '1:00 PM'], ['18:30', '6:30 PM'], ['21:30', '9:30 PM']];
const CHANNELS = [['WhatsApp', 'WhatsApp'], ['Email', 'Email'], ['Push', 'App notification']];
const STEP_NAMES = ['About you', 'Where to start', 'Daily goal', 'Reminders', 'Your plan'];
const HOOTS = [
  'Hoo! I’m Old Hoot. I’m in every story, with a hint when you’re stuck, never the answer.',
  'Be honest. I’ll never make you feel slow. Every step starts in plain words, because everyone starts somewhere.',
  'Ten minutes a day, every day, beats three hours on Sunday. Your brain keeps what it sees often.',
  'I only nudge if you haven’t learned yet that day. One message, then I go back to my branch.',
  'That’s your week. Walk the first story now and your streak starts today.'
];
const PLANS = {
  zero: [['Python basics: lists', 'Basics'], ['Loops & enumerate', 'Glossary'], ['The Mirror Hallway', 'Story'], ['Revisit + dictionaries', 'Revisit'], ['The Guest List', 'Story'], ['The Scrabble Swap', 'Story'], ['Rest or catch up', 'Streak freeze']],
  lang: [['The Mirror Hallway', 'Story'], ['The Scrabble Swap', 'Story'], ['Revisit 3 cards', 'Revisit'], ['The Train of Unique Faces', 'Story'], ['The Guest List', 'Story'], ['The Lantern Bridge', 'Story'], ['Rest or catch up', 'Streak freeze']],
  some: [['The Lantern Bridge', 'Story'], ['The Train of Unique Faces', 'Story'], ['The Coat-Check Counter', 'Story'], ['Revisit 5 cards', 'Revisit'], ['The Rain Barrel Builders', 'Story'], ['The Market Stall Diary', 'Story'], ['Pattern radar quiz', 'Interview']],
  ready: [['Revisit 5 cards', 'Revisit'], ['Pattern radar quiz', 'Interview'], ['The Paint Touch-up', 'Story'], ['Company track: Amazon', 'Interview'], ['Mock interview · 45 min', 'Interview'], ['Revisit 5 cards', 'Revisit'], ['Mock interview · 45 min', 'Interview']]
};
const FIRST = { zero: null, lang: 'valid-palindrome', some: 'two-sum-ii', ready: null };

class Component extends DCLogic {
  constructor(props) {
    super(props);
    const saved = readJSON(ONBOARD_KEY, {});
    this.state = Object.assign({ theme: loadTheme(), step: 0, name: '', reason: null, level: null, goal: '10', lang: 'Python', time: '21:30', channel: 'WhatsApp', date: '' }, saved && typeof saved === 'object' ? saved : {}, { step: 0 });
  }
  componentDidMount() { listenTheme(this); }
  componentWillUnmount() { unlistenTheme(this); }
  persist() {
    const { name, reason, level, goal, lang, time, channel, date } = this.state;
    writeJSON(ONBOARD_KEY, { name, reason, level, goal, lang, time, channel, date });
    const prefs = readJSON('dsaviz-prefs', {});
    writeJSON('dsaviz-prefs', Object.assign({}, prefs && typeof prefs === 'object' ? prefs : {}, { goal, time, channel, lang: lang === 'JavaScript' ? 'JS' : lang }));
    const code = { Python: 'py', Java: 'java', 'C++': 'cpp', JavaScript: 'js', Go: 'go' }[lang];
    try { window.localStorage.setItem('dsaviz-lang', code); } catch (e) {}
  }
  renderVals() {
    const themeKey = this.state.theme || this.props.theme || 'max';
    const t = THEMES[themeKey] || THEMES.max;
    const st = this.state;
    const step = st.step;
    const pick = (key, v) => () => this.setState({ [key]: v });
    const card = (key) => ([v, icon, label, sub]) => {
      const on = st[key] === v;
      return { icon, label, sub, on, border: on ? t.accent : t.line, bg: on ? t.warnBg : t.surface, pick: pick(key, v) };
    };
    const chip = (key) => ([v, label]) => {
      const on = st[key] === v;
      return { label, on, bg: on ? t.text : 'transparent', fg: on ? t.bg : t.text, border: on ? t.text : t.line2, pick: pick(key, v) };
    };
    const name = (st.name || '').trim() || 'friend';
    const can = [!!st.reason && !!(st.name || '').trim(), !!st.level, !!st.goal && !!st.lang, !!st.time && !!st.channel, true][step];
    const level = LEVELS.find(([k]) => k === st.level) || LEVELS[1];
    const plan = PLANS[level[0]];
    const first = FIRST[level[0]];
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let countdown = '';
    if (st.date) {
      const d = Math.ceil((new Date(st.date) - today) / 86400000);
      if (d > 0) countdown = ' Your interview is ' + d + ' days away, so the Interview prep page has a plan sized to fit.';
    }
    const reasonLine = { placements: 'Built around placement season: patterns that show up in online assessments first.', switch: 'Built for evenings after work: short stories, no marathon sessions.', maang: 'Weighted toward the patterns big-tech interviews lean on most.', fun: 'No pressure, no deadlines — just the stories in the order they make most sense.' }[st.reason] || '';
    return {
      t, themeBtns: themeButtons(this, themeKey, t),
      hoot: HOOTS[step],
      stepper: STEP_NAMES.map((label, i) => ({
        label, mark: i < step ? '✓' : String(i + 1),
        bg: i === step ? 'rgba(255,255,255,0.08)' : 'transparent',
        dotBg: i < step ? t.ok : i === step ? t.bandAccent : 'rgba(255,255,255,0.1)',
        dotFg: i <= step ? '#111317' : t.bandMuted,
        fg: i === step ? t.bandText : t.bandMuted, weight: i === step ? '700' : '500'
      })),
      stepNo: step + 1, progress: ((step + 1) / 5) * 100 + '%',
      s0: step === 0, s1: step === 1, s2: step === 2, s3: step === 3, s4: step === 4,
      name: st.name, setName: (e) => this.setState({ name: e.target.value.slice(0, 24) }),
      reasons: REASONS.map(card('reason')),
      levels: LEVELS.map(([v, icon, label, sub]) => card('level')([v, icon, label, sub])),
      goals: GOALS.map(card('goal')),
      langs: WLANGS.map((l) => chip('lang')([l, l])),
      times: TIMES.map(chip('time')),
      channels: CHANNELS.map(chip('channel')),
      date: st.date, setDate: (e) => this.setState({ date: e.target.value }),
      planLine: reasonLine + ' ' + GOALS.find(([g]) => g === st.goal)[2] + ' a day in ' + st.lang + ', with a nudge at ' + TIMES.find(([v]) => v === st.time)[1] + ' on ' + CHANNELS.find(([v]) => v === st.channel)[1] + '.' + countdown,
      plan: plan.map(([what, kind], i) => {
        const d = new Date(today); d.setDate(today.getDate() + i);
        return { day: i === 0 ? 'Today' : days[d.getDay()], what, kind, bg: i === 0 ? t.warnBg : t.surface, border: i === 0 ? t.accent : t.line, dayColor: i === 0 ? t.accent : t.muted };
      }),
      summary: [['Starting point', level[2]], ['Daily goal', GOALS.find(([g]) => g === st.goal)[2]], ['Price', 'Free in early access']].map(([k, v]) => ({ k, v })),
      atFirst: step === 0, backOp: step === 0 ? 0.4 : 1,
      back: () => this.setState({ step: Math.max(0, step - 1) }),
      notLast: step < 4, isLast: step === 4,
      cantNext: !can, nextBg: can ? t.accent : t.faint,
      next: () => { if (can) { this.persist(); this.setState({ step: Math.min(4, step + 1) }); } },
      hint: can ? (step < 4 ? 'You can change all of this later in your profile.' : '') : ['Pick a reason to continue.', 'Pick the closest match.', '', '', ''][step],
      startHref: level[4],
      startLabel: level[0] === 'zero' ? 'Start with the basics →' : level[0] === 'ready' ? 'Open my interview plan →' : 'Start my first story →',
      finish: () => { this.persist(); saveUser(true); if (first) saveProblem(first); },
      skip: () => { saveUser(true); }
    };
  }
}
