// System design lesson engine, shared by the hub (SystemDesign) and the player (SDLesson).
// A lesson is a diagram (nodes + links) and a list of steps. Each step changes the diagram a little
// (add, drop, mark, sub), sends requests along links (go), names one focus node and carries the
// back-of-envelope numbers forward. sdFrames() turns the step list into full snapshots.
// tests/sdcheck.js validates every lesson; run it after editing src/sd/lessons.js.

// The diagram is drawn on a fixed 1080 x 440 canvas. Node positions are box centres on it.
const SD_W = 1080;
const SD_H = 440;
const SD_KINDS = {
  client: 'M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2',
  car: 'M5 15l1.6-5h10.8l1.6 5M3.5 15h17v4h-17zM7 19v1.5M17 19v1.5M7.5 17h.01M16.5 17h.01',
  dns: 'M12 3v18M5 5h10l2.5 2.5L15 10H5zM19 12H9l-2.5 2.5L9 17h10z',
  cdn: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM3 12h18M12 3c3.5 3.5 3.5 14.5 0 18M12 3c-3.5 3.5-3.5 14.5 0 18',
  lb: 'M3 12h6M9 12l5-6h7M9 12l5 6h7M9 12h12',
  server: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
  cache: 'M13 2L5 14h6l-1 8 8-12h-6z',
  db: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  queue: 'M3 7h4v10H3zM10 7h4v10h-4zM17 7h4v10h-4z',
  worker: 'M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',
  limiter: 'M6 4h12l-1.5 16h-9zM6.5 9h11',
  net: 'M2 12h5M17 12h5M7 8h10v8H7zM10 8V5M14 8V5',
  watch: 'M3 12h4l3-7 4 14 3-7h4',
  class: '',
  iface: ''
};
const SD_CLASS_KINDS = ['class', 'iface'];
// Badge text for each mark state. A mark can also be [state, 'own text'].
const SD_MARKS = { hot: 'busy', down: 'down', hit: 'hit', miss: 'miss', new: 'new', stale: 'stale', good: 'ok', bad: 'broken' };
const SD_STEP_KEYS = ['cmd', 'say', 'focus', 'phase', 'add', 'drop', 'mark', 'sub', 'go', 'par', 'nums', 'math', 'check'];
const SD_METHOD = [
  ['Ask', 'Who uses it, what must it do, how big will it get?'],
  ['Sketch', 'Draw the fewest boxes that work end to end.'],
  ['Zoom in', 'Pick the hard parts and design them properly.'],
  ['Scale', 'Find the bottleneck, fix it, repeat.']
];

function sdNodeSize(n) {
  if (SD_CLASS_KINDS.indexOf(n.kind) >= 0) return { w: n.w || 190, h: 44 + 18 * (n.lines || []).length + (n.kind === 'iface' ? 14 : 0) };
  return { w: n.w || 136, h: 64 };
}
function sdNode(L, id) { return L.nodes.find((n) => n.id === id); }
// A link [a, b, hideWhen?] is drawn while both ends are visible and hideWhen (a node id) is not.
function sdLinkOn(link, vis) { return vis.indexOf(link[0]) >= 0 && vis.indexOf(link[1]) >= 0 && !(link[2] && vis.indexOf(link[2]) >= 0); }
function sdFindLink(L, a, b) { return L.links.find((k) => (k[0] === a && k[1] === b) || (k[0] === b && k[1] === a)); }
// Where the straight line from a's centre towards b leaves a's box.
function sdEdge(n, toward) {
  const s = sdNodeSize(n); const dx = toward.x - n.x; const dy = toward.y - n.y;
  const k = Math.min(dx ? (s.w / 2 + 4) / Math.abs(dx) : Infinity, dy ? (s.h / 2 + 4) / Math.abs(dy) : Infinity);
  return { x: n.x + dx * k, y: n.y + dy * k };
}
function sdMarkOf(v) { if (!v) return null; return Array.isArray(v) ? { state: v[0], text: v[1] } : { state: v, text: SD_MARKS[v] }; }

function sdFrames(L) {
  let vis = L.nodes.filter((n) => n.on).map((n) => n.id);
  let marks = {}; let subs = {}; let math = L.math || ''; let phase = 0;
  const nums = Object.assign({ qps: null, ms: null, gb: null }, L.nums || {});
  let prevNums = Object.assign({}, nums);
  return L.steps.map((s, i) => {
    const before = vis.slice();
    (s.add || []).forEach((id) => { if (vis.indexOf(id) < 0) vis.push(id); });
    (s.drop || []).forEach((id) => { vis = vis.filter((x) => x !== id); });
    marks = Object.assign({}, marks); subs = Object.assign({}, subs);
    Object.keys(s.mark || {}).forEach((k) => { if (s.mark[k] == null) delete marks[k]; else marks[k] = s.mark[k]; });
    Object.keys(s.sub || {}).forEach((k) => { if (s.sub[k] == null) delete subs[k]; else subs[k] = s.sub[k]; });
    Object.keys(marks).forEach((k) => { if (vis.indexOf(k) < 0) delete marks[k]; });
    Object.keys(subs).forEach((k) => { if (vis.indexOf(k) < 0) delete subs[k]; });
    if (s.nums) Object.assign(nums, s.nums);
    if (s.math) math = s.math;
    if (s.phase) phase = s.phase;
    const changed = Object.keys(nums).filter((k) => nums[k] !== prevNums[k] && i > 0);
    prevNums = Object.assign({}, nums);
    const hops = (s.go || []).map((h, k) => ({ from: h[0], to: h[1], label: h[2] || '', tone: h[3] || 'req', at: h[4] != null ? h[4] : s.par ? 0 : k }));
    return {
      i, cmd: s.cmd, say: s.say, focus: s.focus, phase, math, check: s.check || null,
      vis: vis.slice(), added: vis.filter((x) => before.indexOf(x) < 0),
      marks, subs, nums: Object.assign({}, nums), changed, hops
    };
  });
}

// Number formatting for the numbers strip.
function sdTrim(x) { return String(Math.round(x * 10) / 10).replace(/\.0$/, ''); }
function sdFmtQps(v) {
  if (v == null) return '—';
  if (v === 0) return '0/s';
  if (v < 1) return '<1/s';
  if (v < 1000) return Math.round(v).toLocaleString('en-US') + '/s';
  if (v < 1e6) return sdTrim(v / 1000) + 'k/s';
  return sdTrim(v / 1e6) + 'M/s';
}
function sdFmtMs(v) {
  if (v == null) return '—';
  if (v < 1) return '<1 ms';
  if (v < 1000) return Math.round(v) + ' ms';
  if (v < 60000) return sdTrim(v / 1000) + ' s';
  return sdTrim(v / 60000) + ' min';
}
function sdFmtGb(v) {
  if (v == null) return '—';
  if (v === 0) return '0';
  if (v < 1) return sdTrim(v * 1000) + ' MB';
  if (v < 1000) return sdTrim(v) + ' GB';
  return sdTrim(v / 1000) + ' TB';
}
// Short-code alphabet for the URL shortener lesson: a-z, then A-Z, then 0-9.
const SD_B62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function sdBase62(n) { let s = ''; do { s = SD_B62[n % 62] + s; n = Math.floor(n / 62); } while (n > 0); return s; }

// Progress is kept per lesson as the furthest step reached (1-based).
const SD_PROGRESS_KEY = 'dsaviz-sd-progress';
const SD_LESSON_KEY = 'dsaviz-sd-lesson';
function sdLoadProgress() { try { const v = JSON.parse(window.localStorage.getItem(SD_PROGRESS_KEY) || '{}'); return v && typeof v === 'object' ? v : {}; } catch (e) { return {}; } }
function sdSaveProgress(p) { try { window.localStorage.setItem(SD_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {} }
function sdPickLesson(id) { try { window.localStorage.setItem(SD_LESSON_KEY, id); } catch (e) {} }
function sdLoadLesson() { try { return window.localStorage.getItem(SD_LESSON_KEY) || ''; } catch (e) { return ''; } }

// Widen infrastructure boxes (sized for the monospace Terminal theme) so their label and every sub line the lesson shows fit on one line.
// Runs once at load, so a box keeps one width for the whole lesson and links never jump.
function sdAutoWidths(lessons) {
  lessons.forEach((L) => L.nodes.forEach((n) => {
    if (SD_CLASS_KINDS.indexOf(n.kind) >= 0) return;
    let sub = 0;
    L.steps.forEach((s) => { const v = s.sub && s.sub[n.id]; if (v) sub = Math.max(sub, v.length); });
    const need = 62 + Math.max(n.label.length * 9.2, sub * 7.3);
    n.w = Math.max(n.w || 136, Math.ceil(need / 4) * 4);
  }));
}
