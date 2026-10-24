// @@THEMES@@ — generated block, shared by every board.
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SERIF = "'Fraunces', Georgia, serif";
const SANS = "'Instrument Sans', system-ui, sans-serif";
const POSTER = "'Anton', Impact, sans-serif";
const OUTFIT = "'Outfit', system-ui, sans-serif";
const THEMES = {
  // DSAMaxxing: near-black surfaces, one volt-lime accent, Anton headlines (uppercased by the page CSS), Outfit body.
  max: { bg: '#0A0A0B', surface: '#151518', sunk: '#1F1F23', line: '#26262C', line2: '#34343C', text: '#F5F5F7', text2: '#C7C7CC', muted: '#8E8E93', faint: '#55555C', accent: '#C5F04A', onAccent: '#0A0A0A', left: '#C5F04A', right: '#5AC8FA', ok: '#30D158', okBg: '#16301E', warnBg: '#3A2414', coolBg: '#13293A', medFg: '#FF9F0A', owl: '#8E8E93', logoL: '#C5F04A', logoR: '#5AC8FA', codeBg: '#0E0E10', hl: '#2A3214', flame: '#FF8A3D',
    band: '#151518', bandText: '#F5F5F7', bandMuted: '#8E8E93', bandAccent: '#C5F04A', shadow: 'rgba(0,0,0,0.5)', display: POSTER, body: OUTFIT, mono: MONO,
    diff: { Starter: ['#5AC8FA', '#13293A', '#8ED8FB'], Easy: ['#30D158', '#16301E', '#6FE08A'], Medium: ['#FF9F0A', '#3A2A10', '#FFC061'], Hard: ['#FF453A', '#3A1614', '#FF8A82'] } },
  paper: { bg: '#F6F2EA', surface: '#FFFDF8', sunk: '#EFE8DA', line: '#E2D9C8', line2: '#D8CDB9', text: '#1D1B18', text2: '#4A453E', muted: '#6B645A', faint: '#B9AE9A', accent: '#C2521F', onAccent: '#FFFDF8', left: '#C2521F', right: '#24478A', ok: '#2E7D4F', okBg: '#DDEFE3', warnBg: '#F7DCCB', coolBg: '#D9E3F5', medFg: '#6B4A00', owl: '#8C7B62', logoL: '#E98A56', logoR: '#8FB0EA', codeBg: '#FFFDF8', hl: '#FBE7C6', flame: '#D9622B',
    band: '#1D1B18', bandText: '#F6F2EA', bandMuted: '#C9C3B8', bandAccent: '#E98A56', shadow: 'rgba(60,40,20,0.16)', display: SERIF, body: SANS, mono: MONO,
    diff: { Starter: ['#3E9C86', '#DCEFE9', '#1F5E50'], Easy: ['#2E7D4F', '#DDEFE3', '#1E5A37'], Medium: ['#C99526', '#F6E2B8', '#6B4A00'], Hard: ['#C2432A', '#F7D6CC', '#8A2C1A'] } },
  ink: { bg: '#111317', surface: '#181B21', sunk: '#20242C', line: '#2A2F38', line2: '#3A3F4A', text: '#ECE9E2', text2: '#C9CCD3', muted: '#9A9EA8', faint: '#5A5F6A', accent: '#F5A06E', onAccent: '#111317', left: '#F5A06E', right: '#6F98E6', ok: '#6FCF97', okBg: '#1F3A2A', warnBg: '#40281C', coolBg: '#1E2A44', medFg: '#F2C66D', owl: '#7D6E58', logoL: '#E98A56', logoR: '#5B86D9', codeBg: '#14161B', hl: '#2C2820', flame: '#F5A06E',
    band: '#1B1F26', bandText: '#ECE9E2', bandMuted: '#9A9EA8', bandAccent: '#F5A06E', shadow: 'rgba(0,0,0,0.45)', display: SERIF, body: SANS, mono: MONO,
    diff: { Starter: ['#8FD3C1', '#17332D', '#9FE0CE'], Easy: ['#6FCF97', '#1F3A2A', '#8EDDAE'], Medium: ['#E8B04A', '#3D3218', '#F2C66D'], Hard: ['#F07A5F', '#44221B', '#F79B85'] } },
  field: { bg: '#0C110B', surface: '#111910', sunk: '#18231A', line: '#23321F', line2: '#2E4228', text: '#C9EBB4', text2: '#B4D3A1', muted: '#7F9C70', faint: '#435A38', accent: '#9FE870', onAccent: '#0C110B', left: '#E8B04A', right: '#9FE870', ok: '#9FE870', okBg: '#1E3316', warnBg: '#3A2C12', coolBg: '#1B2A16', medFg: '#E8B04A', owl: '#4F6B3F', logoL: '#E8B04A', logoR: '#9FE870', codeBg: '#070B06', hl: '#1D2E17', flame: '#E8B04A',
    band: '#070B06', bandText: '#C9EBB4', bandMuted: '#7F9C70', bandAccent: '#9FE870', shadow: 'rgba(0,0,0,0.6)', display: MONO, body: MONO, mono: MONO,
    diff: { Starter: ['#8FD3C1', '#132A22', '#9FE0CE'], Easy: ['#9FE870', '#1E3316', '#B8F08F'], Medium: ['#E8B04A', '#3A2C12', '#F0C574'], Hard: ['#F07A5F', '#3A1A12', '#F79B85'] } }
};
const THEME_KEY = 'dsaviz-theme';
const USER_KEY = 'dsaviz-user';
function loadTheme() { try { const k = window.localStorage.getItem(THEME_KEY); return THEMES[k] ? k : 'max'; } catch (e) { return 'max'; } }
function saveTheme(k) { try { window.localStorage.setItem(THEME_KEY, k); } catch (e) {} }
function loadUser() { try { return window.localStorage.getItem(USER_KEY) === '1'; } catch (e) { return false; } }
function saveUser(on) { try { if (on) window.localStorage.setItem(USER_KEY, '1'); else window.localStorage.removeItem(USER_KEY); } catch (e) {} }
function themeButtons(cmp, themeKey, t) {
  return [['max', 'Max'], ['paper', 'Light'], ['ink', 'Dark'], ['field', 'Terminal']].map(([k, label]) => ({
    label, on: themeKey === k,
    bg: themeKey === k ? t.text : 'transparent', fg: themeKey === k ? t.bg : t.muted,
    pick: () => { saveTheme(k); cmp.setState({ theme: k }); }
  }));
}
function listenTheme(cmp) {
  cmp.onStorage = (e) => {
    if (e.key === THEME_KEY && THEMES[e.newValue]) cmp.setState({ theme: e.newValue });
    if (e.key === USER_KEY) cmp.setState({ user: e.newValue === '1' });
  };
  try { window.addEventListener('storage', cmp.onStorage); } catch (e) {}
}
function unlistenTheme(cmp) {
  try { window.removeEventListener('storage', cmp.onStorage); } catch (e) {}
}
// Streak week for the signed-in learner (Aarav): Mon–Thu done, today still open.
const WEEK = [['M', true], ['T', true], ['W', true], ['T', true], ['F', false], ['S', false], ['S', false]];
function streakDays(t) {
  return WEEK.map(([d, on], i) => ({ d, bg: on ? t.flame : 'transparent', fg: on ? t.onAccent : t.muted, border: on ? t.flame : (i === 4 ? t.text : t.line2) }));
}
// @@END-THEMES@@
