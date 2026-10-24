// System design check: validates the lesson data in src/sd/ and renders every step of both pages.
// Every step names existing, visible nodes; requests only travel along drawn links; captions are
// plain and at most 140 characters; and the napkin numbers agree with the arithmetic in `check`
// and with the servers on the diagram. Also checks that the pages carry the current build.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const src = ['engine.js', 'lessons.js'].map((f) => fs.readFileSync(path.join(root, 'src', 'sd', f), 'utf8').replace(/\r\n/g, '\n')).join('\n');
const store = {};
const sandbox = 'const window = { localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } } };\n';
const E = new Function('store', sandbox + src + '\nreturn { SD_LESSONS, SD_CREDITS, SD_KINDS, SD_MARKS, SD_STEP_KEYS, SD_CLASS_KINDS, SD_W, SD_H, sdFrames, sdNodeSize, sdLinkOn, sdFindLink, sdBase62, sdFmtQps, sdFmtMs, sdFmtGb };')(store);
let problems = 0;
const fail = (where, msg) => { problems++; console.log('  ✗', where, msg); };
const BANNED = /hello ?interview|design ?gurus|bytebytego|refactoring\.guru|designing data-intensive|\bDDIA\b/i;
const SECONDS = { day: 86400, month: 2592000 };
const near = (a, b) => (b === 0 ? a === 0 : Math.abs(a - b) / Math.abs(b) <= 0.15);

const ids = new Set();
const tracks = { hld: 0, lld: 0 };
for (const L of E.SD_LESSONS) {
  const where0 = L.id;
  if (ids.has(L.id)) fail(where0, 'duplicate lesson id'); ids.add(L.id);
  if (!(L.track in tracks)) fail(where0, 'unknown track ' + L.track); else tracks[L.track]++;
  if (!L.title || !L.tag || !L.scenario) fail(where0, 'needs a title, tag and scenario');
  if (L.steps.length < 8 || L.steps.length > 15) fail(where0, L.steps.length + ' steps (want 8 to 15)');
  if (L.credit && !(L.credit in E.SD_CREDITS)) fail(where0, 'unknown credit ' + L.credit);
  if (L.credit === 'sdp' && L.track !== 'hld') fail(where0, 'the System Design Primer credit is for HLD lessons');
  if (L.credit === 'kn' && L.track !== 'lld') fail(where0, 'the LowLevelDesign credit is for LLD lessons');
  if (L.method && L.track !== 'hld') fail(where0, 'only HLD case studies use the four-step method');
  if (L.track === 'hld' && (!L.labels || L.labels.length !== 3)) fail(where0, 'HLD lessons need three number labels');
  // nodes: known kinds, inside the canvas, unique ids
  const nodeIds = new Set();
  L.nodes.forEach((n) => {
    if (nodeIds.has(n.id)) fail(where0, 'duplicate node ' + n.id); nodeIds.add(n.id);
    if (!(n.kind in E.SD_KINDS)) fail(where0, n.id + ' has unknown kind ' + n.kind);
    if (E.SD_CLASS_KINDS.indexOf(n.kind) >= 0 && !(n.lines && n.lines.length)) fail(where0, n.id + ' is a class with no members');
    const s = E.sdNodeSize(n);
    if (n.x - s.w / 2 < 0 || n.x + s.w / 2 > E.SD_W || n.y - s.h / 2 < 0 || n.y + s.h / 2 > E.SD_H) fail(where0, n.id + ' sticks out of the canvas');
  });
  L.links.forEach((k) => k.forEach((id) => { if (!nodeIds.has(id)) fail(where0, 'link names a missing node ' + id); }));
  // text: plain, our own words
  const text = JSON.stringify(L);
  if (BANNED.test(text)) fail(where0, 'mentions a source we must not use');
  if (/\{\{|\[\w+\]|TODO|lorem/i.test(L.steps.map((s) => s.say + ' ' + s.cmd).join(' '))) fail(where0, 'placeholder text in a step');

  L.steps.forEach((s, i) => Object.keys(s).forEach((k) => { if (E.SD_STEP_KEYS.indexOf(k) < 0) fail(L.id + ' step ' + (i + 1), 'unknown field ' + k); }));
  const frames = E.sdFrames(L);
  let lastPhase = 0;
  frames.forEach((f, i) => {
    const where = L.id + ' step ' + (i + 1);
    const s = L.steps[i];
    const say = (f.say || '').trim();
    if (!say) fail(where, 'missing caption');
    if (say.length > 140) fail(where, 'caption is ' + say.length + ' chars (max 140)');
    if (!/[.!?]$/.test(say)) fail(where, 'caption should end with a full stop');
    if (!f.cmd || !f.cmd.trim()) fail(where, 'missing scenario bar text');
    if (f.cmd && f.cmd.length > 60) fail(where, 'scenario bar text is long: ' + f.cmd.length);
    if (f.math && f.math.length > 90) fail(where, 'napkin line is long: ' + f.math.length);
    ['add', 'drop'].forEach((k) => (s[k] || []).forEach((id) => { if (!nodeIds.has(id)) fail(where, k + ' names a missing node ' + id); }));
    Object.keys(s.mark || {}).forEach((id) => {
      if (!nodeIds.has(id)) fail(where, 'mark names a missing node ' + id);
      const v = s.mark[id]; const st = Array.isArray(v) ? v[0] : v;
      if (v != null && !(st in E.SD_MARKS)) fail(where, 'unknown mark ' + st);
    });
    Object.keys(s.sub || {}).forEach((id) => { if (!nodeIds.has(id)) fail(where, 'sub names a missing node ' + id); });
    // one focus per step, on something you can see
    if (!f.focus) fail(where, 'no focus');
    else if (f.vis.indexOf(f.focus) < 0) fail(where, 'focus ' + f.focus + ' is not on the diagram');
    Object.keys(f.marks).concat(Object.keys(f.subs)).forEach((id) => { if (f.vis.indexOf(id) < 0) fail(where, id + ' is marked but hidden'); });
    // visible nodes never overlap
    const vis = f.vis.map((id) => L.nodes.find((n) => n.id === id));
    vis.forEach((a, x) => vis.slice(x + 1).forEach((b) => {
      const sa = E.sdNodeSize(a); const sb = E.sdNodeSize(b);
      if (Math.abs(a.x - b.x) < (sa.w + sb.w) / 2 + 8 && Math.abs(a.y - b.y) < (sa.h + sb.h) / 2 + 8) fail(where, a.id + ' overlaps ' + b.id);
    }));
    // requests travel only along drawn links between visible nodes
    f.hops.forEach((h) => {
      if (!nodeIds.has(h.from) || !nodeIds.has(h.to)) { fail(where, 'hop names a missing node ' + h.from + '→' + h.to); return; }
      if (f.vis.indexOf(h.from) < 0 || f.vis.indexOf(h.to) < 0) fail(where, 'hop ' + h.from + '→' + h.to + ' touches a hidden node');
      const link = E.sdFindLink(L, h.from, h.to);
      if (!link) fail(where, 'no link for hop ' + h.from + '→' + h.to);
      else if (!E.sdLinkOn(link, f.vis)) fail(where, 'link ' + h.from + '–' + h.to + ' is not drawn at this step');
      if (['req', 'back', 'bad'].indexOf(h.tone) < 0) fail(where, 'unknown hop tone ' + h.tone);
      if (h.label.length > 16) fail(where, 'hop label is long: ' + h.label);
    });
    if (f.hops.length > 6) fail(where, f.hops.length + ' hops; keep one idea per step');
    // the method ribbon only moves forward
    if (L.method) { if (!f.phase) fail(where, 'method lesson step without a phase'); if (f.phase < lastPhase) fail(where, 'phase goes backwards'); lastPhase = f.phase; }
    else if (s.phase) fail(where, 'phase set on a lesson without the method');
    // numbers: real values or null, and the napkin arithmetic holds
    ['qps', 'ms', 'gb'].forEach((k) => { const v = f.nums[k]; if (v !== null && !(typeof v === 'number' && isFinite(v) && v >= 0)) fail(where, 'bad number ' + k + ' = ' + v); });
    const c = f.check || {};
    if (c.qps) { const want = c.qps[0] / SECONDS[c.qps[1]]; if (!near(f.nums.qps, want)) fail(where, 'qps ' + f.nums.qps + ' but ' + c.qps[0] + ' a ' + c.qps[1] + ' is ' + want.toFixed(4)); }
    if (c.gb) { const want = c.gb[0] * c.gb[1] / 1e9; if (!near(f.nums.gb, want)) fail(where, 'storage ' + f.nums.gb + ' GB but ' + c.gb[0] + ' × ' + c.gb[1] + ' B is ' + want + ' GB'); }
    if (c.ms) { const sum = c.ms.reduce((a, b) => a + b, 0); if (f.nums.ms !== sum) fail(where, 'latency ' + f.nums.ms + ' ms but the parts add up to ' + sum); }
    if (c.cap) {
      const up = f.vis.filter((id) => { const n = L.nodes.find((x) => x.id === id); const m = f.marks[id]; return n.kind === 'server' && !(m === 'down' || (Array.isArray(m) && m[0] === 'down')); }).length;
      const fits = f.nums.qps <= up * c.cap[0];
      if (fits !== c.cap[1]) fail(where, up + ' working servers × ' + c.cap[0] + ' vs ' + f.nums.qps + '/s: says fits=' + c.cap[1]);
    }
    if (c.b62 && E.sdBase62(c.b62[0]) !== c.b62[1]) fail(where, c.b62[0] + ' in base 62 is ' + E.sdBase62(c.b62[0]) + ', not ' + c.b62[1]);
    if (c.b62 && f.cmd.indexOf(c.b62[1]) < 0) fail(where, 'scenario bar does not show the code ' + c.b62[1]);
  });
  // a case study walks the four steps end to end: every phase 1 to 4 appears
  if (L.method) [1, 2, 3, 4].forEach((p) => { if (!frames.some((f) => f.phase === p)) fail(where0, 'four-step lesson never reaches step ' + p); });
  console.log('✓ ' + L.id.padEnd(10) + ' ' + L.track + ' ' + String(L.steps.length).padStart(2) + ' steps · ' + frames.map((f) => E.sdFmtQps(f.nums.qps)).filter((x, i, a) => a.indexOf(x) === i).join(' → '));
}
if (tracks.hld < 20) fail('lessons', 'want at least 20 HLD lessons, have ' + tracks.hld);
if (tracks.lld < 9) fail('lessons', 'want at least 9 LLD lessons, have ' + tracks.lld);
if (E.SD_LESSONS.filter((L) => L.method).length < 6) fail('lessons', 'want at least 6 four-step case studies');
[[0.0006, '<1/s'], [23, '23/s'], [2300, '2.3k/s'], [40000, '40k/s']].forEach(([v, w]) => { if (E.sdFmtQps(v) !== w) fail('format', 'qps ' + v + ' → ' + E.sdFmtQps(v)); });
[[0.5, '<1 ms'], [56, '56 ms'], [2400, '2.4 s'], [120000, '2 min']].forEach(([v, w]) => { if (E.sdFmtMs(v) !== w) fail('format', 'ms ' + v + ' → ' + E.sdFmtMs(v)); });
[[0.01, '10 MB'], [2, '2 GB'], [3000, '3 TB'], [8640, '8.6 TB']].forEach(([v, w]) => { if (E.sdFmtGb(v) !== w) fail('format', 'gb ' + v + ' → ' + E.sdFmtGb(v)); });

// The pages must carry the same engine and lessons, and every step must render cleanly.
for (const name of ['SystemDesign', 'SDLesson']) {
  const page = fs.readFileSync(path.join(root, 'pages', name + '.dc.html'), 'utf8').replace(/\r\n/g, '\n');
  const a = page.indexOf('// @@SDLESSONS@@'); const b = page.indexOf('// @@END-SDLESSONS@@');
  if (a < 0 || b < 0) { fail(name, 'missing the @@SDLESSONS@@ block'); continue; }
  if (page.slice(a, b).indexOf(src.trim().slice(0, 200)) < 0 || page.slice(a, b).indexOf(src.trim().slice(-200)) < 0) fail(name, 'lessons are out of date: run python scripts/build_pages.py');
  const script = page.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
  const st = {};
  const C = new Function('store', `const window = { localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } }, addEventListener(){}, removeEventListener(){}, innerWidth: 1440 };
    const setInterval = () => 1, clearInterval = () => {};
    class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, typeof o === 'function' ? o(this.state) : o); } forceUpdate() {} }
    ${script}; return Component;`)(st);
  const bad = (v) => /undefined|NaN/.test(JSON.stringify(v, (k, x) => (typeof x === 'function' ? undefined : x)));
  for (const theme of ['max', 'paper', 'ink', 'field']) for (const mobile of [false, true]) {
    if (name === 'SystemDesign') {
      const c = new C({}); c.setState({ theme, mobile });
      if (bad(c.renderVals())) fail(name, 'renders undefined/NaN in ' + theme + (mobile ? ' mobile' : ''));
      continue;
    }
    E.SD_LESSONS.forEach((L, li) => {
      const c = new C({});
      L.steps.forEach((s, i) => {
        c.setState({ theme, mobile, lesson: li, step: i });
        const v = c.renderVals();
        if (bad(v)) { const m = JSON.stringify(v).match(/.{60}(undefined|NaN).{30}/); fail(name, L.id + ' step ' + (i + 1) + ' renders ' + (m && m[0])); }
      });
    });
  }
}
console.log(problems ? problems + ' problem(s)' : 'all system design lessons consistent');
if (problems) process.exitCode = 1;
