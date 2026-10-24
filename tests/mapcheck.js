// Integrity test for the pattern map and the "use it when" cards (shared/pattern_intros.js).
// Fails if a pattern or sheet group has no node or no card, an edge names a missing node, the graph has a loop,
// two nodes share a spot, a link points at a story, sheet slug or spec that does not exist, or a text field runs long.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
let problems = 0;
const fail = (msg) => { problems++; console.log('  ✗', msg); };

const win = { localStorage: { getItem: () => null, setItem: () => {} } };
const src = read('shared', 'catalog.js') + '\n' + read('shared', 'sheet.js') + '\n' + read('shared', 'tests_spec.js') + '\n' + read('shared', 'pattern_intros.js');
const { PATTERNS, PATTERN_WHEN, PROBLEMS, SHEET, SHEET_GROUPS, TEST_SPECS, PATTERN_MAP, PATTERN_INTROS } =
  new Function('window', src + '\nreturn { PATTERNS, PATTERN_WHEN, PROBLEMS, SHEET, SHEET_GROUPS, TEST_SPECS, PATTERN_MAP, PATTERN_INTROS };')(win);

const LIMIT = 280;
const patternNames = PATTERNS.map(([n]) => n);
const groupNames = SHEET_GROUPS.map(([n]) => n);
const nodes = PATTERN_MAP.nodes.map(([name, label, col, row]) => ({ name, label, col, row }));
const byName = new Map();

// ---- 1. nodes ----
nodes.forEach((n) => {
  if (byName.has(n.name)) fail('duplicate node ' + n.name);
  byName.set(n.name, n);
  if (!groupNames.includes(n.name)) fail('node ' + n.name + ' is not a pattern or a sheet group');
  if (!n.label || n.label.length > 18) fail('node ' + n.name + ': short label missing or longer than 18 characters');
  if (!(n.col >= 0 && n.col < PATTERN_MAP.cols)) fail('node ' + n.name + ': column ' + n.col + ' is off the map');
  if (!(n.row >= 0 && n.row <= PATTERN_MAP.rows - 1)) fail('node ' + n.name + ': row ' + n.row + ' is off the map');
});
patternNames.forEach((p) => { if (!byName.has(p)) fail('pattern ' + p + ' has no node on the map'); });
groupNames.forEach((g) => { if (!byName.has(g) && !PATTERN_MAP.side.includes(g)) fail('sheet group ' + g + ' is neither on the map nor a side track'); });
PATTERN_MAP.side.forEach((g) => { if (!groupNames.includes(g)) fail('side track ' + g + ' is not a sheet group'); if (byName.has(g)) fail('side track ' + g + ' is also a node'); });
// Nodes in one column need a full row between them, or their labels collide.
nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => {
  if (a.col === b.col && Math.abs(a.row - b.row) < 1) fail('nodes ' + a.name + ' and ' + b.name + ' overlap');
}));

// ---- 2. edges: real nodes, left to right, no duplicates, no loops ----
const seen = new Set();
const next = new Map(nodes.map((n) => [n.name, []]));
PATTERN_MAP.edges.forEach(([a, b]) => {
  const k = a + ' -> ' + b;
  if (!byName.has(a) || !byName.has(b)) { fail('edge ' + k + ' names a missing node'); return; }
  if (seen.has(k)) fail('duplicate edge ' + k);
  seen.add(k);
  if (a === b) fail('edge ' + k + ' loops on itself');
  if (byName.get(a).col >= byName.get(b).col) fail('edge ' + k + ' does not run left to right');
  next.get(a).push(b);
});
const state = new Map();
const visit = (n, trail) => {
  if (state.get(n) === 'done') return;
  if (state.get(n) === 'open') { fail('the map has a loop: ' + trail.concat(n).join(' -> ')); return; }
  state.set(n, 'open');
  next.get(n).forEach((m) => visit(m, trail.concat(n)));
  state.set(n, 'done');
};
nodes.forEach((n) => visit(n.name, []));
// Edges that cross make the map hard to read; keep them to a handful.
const pts = (a, b) => [byName.get(a).col, byName.get(a).row, byName.get(b).col, byName.get(b).row];
const crosses = (p, q) => {
  const [x1, y1, x2, y2] = p, [x3, y3, x4, y4] = q;
  const d = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3);
  if (Math.abs(d) < 1e-9) return false;
  const t = ((x3 - x1) * (y4 - y3) - (y3 - y1) * (x4 - x3)) / d, u = ((x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1)) / d;
  return t > 1e-6 && t < 1 - 1e-6 && u > 1e-6 && u < 1 - 1e-6;
};
const E = PATTERN_MAP.edges.filter(([a, b]) => byName.has(a) && byName.has(b));
let crossings = 0;
E.forEach((e, i) => E.slice(i + 1).forEach((f) => { if (crosses(pts(...e), pts(...f))) crossings++; }));
if (crossings > 4) fail(crossings + ' edge crossings (at most 4)');

// ---- 3. cards ----
const storyIds = new Set(PROBLEMS.map((p) => p.id));
const sheetGroup = new Map(SHEET.map((r) => [r.id, r.pattern]));
const text = (s) => typeof s === 'string' && s.trim().length > 0;
// Brackets are fine (code such as pre[j + 1]); bracketed fill-in words are not.
const placeholder = /TODO|TBD|lorem|\{\{|\[(?:insert|placeholder|your|name)[^\]]*\]/i;
Object.keys(PATTERN_INTROS).forEach((k) => { if (!byName.has(k)) fail('card ' + k + ' has no node'); });
nodes.forEach(({ name }) => {
  const c = PATTERN_INTROS[name];
  if (!c) { fail(name + ': no "use it when" card'); return; }
  const at = name + ': ';
  const long = (field, s) => { if (!text(s)) fail(at + field + ' is empty'); else { if (s.length > LIMIT) fail(at + field + ' is ' + s.length + ' characters (max ' + LIMIT + ')'); if (field !== 'template' && placeholder.test(s)) fail(at + field + ' looks like a placeholder'); } };
  if ('when' in c) fail(at + 'the "use it when" line belongs in PATTERN_WHEN (catalog.js), not in the card');
  if (!Array.isArray(c.clues) || c.clues.length < 2 || c.clues.length > 3) fail(at + 'needs 2 or 3 clues');
  else c.clues.forEach((s, i) => long('clue ' + (i + 1), s));
  if (!Array.isArray(c.template) || c.template.length < 5 || c.template.length > 8) fail(at + 'template needs 5 to 8 lines');
  else long('template', c.template.join('\n'));
  if (!Array.isArray(c.mistakes) || c.mistakes.length !== 2) fail(at + 'needs exactly 2 common mistakes');
  else c.mistakes.forEach((s, i) => long('mistake ' + (i + 1), s));
  ['stories', 'sheet', 'run'].forEach((f) => { if (!Array.isArray(c[f])) fail(at + f + ' must be a list'); });
  if (!Array.isArray(c.stories) || !Array.isArray(c.sheet) || !Array.isArray(c.run)) return;
  c.stories.forEach((id) => { if (!storyIds.has(id)) fail(at + 'story "' + id + '" is not in the catalog'); });
  if (patternNames.includes(name)) {
    const own = PROBLEMS.filter((p) => p.pattern === name).map((p) => p.id);
    if (!c.stories.length) fail(at + 'a pattern card must link at least one story');
    c.stories.forEach((id) => { if (storyIds.has(id) && !own.includes(id)) fail(at + 'story "' + id + '" belongs to another pattern'); });
  }
  if (c.sheet.length < 2 || c.sheet.length > 4) fail(at + 'link 2 to 4 first sheet problems');
  c.sheet.forEach((id) => {
    if (!sheetGroup.has(id)) fail(at + 'sheet slug "' + id + '" is not on the sheet');
    else if (sheetGroup.get(id) !== name) fail(at + 'sheet slug "' + id + '" is in group ' + sheetGroup.get(id));
  });
  const firsts = SHEET.filter((r) => r.pattern === name).slice(0, 6).map((r) => r.id);
  c.sheet.forEach((id) => { if (sheetGroup.get(id) === name && !firsts.includes(id)) fail(at + 'sheet slug "' + id + '" is not among the first problems of its group'); });
  c.run.forEach((id) => { if (!TEST_SPECS[id]) fail(at + 'runnable "' + id + '" has no test spec'); });
  if (c.run.length > 4) fail(at + 'at most 4 runnable problems');
  if (new Set(c.stories.concat(c.sheet.map((s) => 'sheet:' + s), c.run.map((s) => 'run:' + s))).size !== c.stories.length + c.sheet.length + c.run.length) fail(at + 'a link is listed twice');
  const who = patternNames.includes(name) ? PATTERNS.find(([n]) => n === name)[2] : 'Old Hoot';
  if (c.companion !== who) fail(at + 'companion should be ' + who + ', got ' + c.companion);
});

// ---- 4. one "use it when" line per pattern and group, in PATTERN_WHEN ----
groupNames.forEach((g) => {
  const w = PATTERN_WHEN && PATTERN_WHEN[g];
  if (!text(w)) { fail(g + ': no "use it when" line in PATTERN_WHEN'); return; }
  if (!/^Use it when /.test(w)) fail(g + ': the PATTERN_WHEN line should start "Use it when"');
  if (w.length > LIMIT) fail(g + ': PATTERN_WHEN line is ' + w.length + ' characters (max ' + LIMIT + ')');
});
Object.keys(PATTERN_WHEN || {}).forEach((k) => { if (!groupNames.includes(k)) fail('PATTERN_WHEN has a line for unknown group ' + k); });

// ---- 5. the Patterns page carries the generated block ----
const page = read('pages', 'Patterns.dc.html');
if (!/\/\/ @@INTROS@@[\s\S]*const SHEET_INDEX = [\s\S]*\/\/ @@END-INTROS@@/.test(page)) fail('pages/Patterns.dc.html is missing the built INTROS block; run npm run build');

console.log('✓ ' + nodes.length + ' nodes, ' + E.length + ' edges, ' + crossings + ' crossings, ' + Object.keys(PATTERN_INTROS).length + ' cards');
console.log(problems ? problems + ' problem(s)' : 'map clean');
if (problems) process.exitCode = 1;
