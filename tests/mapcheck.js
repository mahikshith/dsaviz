// Integrity test for the pattern map, the "use it when" cards (shared/pattern_intros.js) and the roadmap (shared/roadmap.js).
// Fails if a pattern or sheet group has no node or no card, an edge names a missing node, the graph has a loop,
// two nodes share a spot, a link points at a story, sheet slug or spec that does not exist, or a text field runs long.
// Roadmap: every node opens a real page, group or merged lesson, or is coming soon with a named track; edges run in lane
// order without loops; every checklist topic has a node; recursion and sorting are concept nodes of their own.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
let problems = 0;
const fail = (msg) => { problems++; console.log('  ✗', msg); };

const win = { localStorage: { getItem: () => null, setItem: () => {} } };
const src = read('shared', 'catalog.js') + '\n' + read('shared', 'sheet.js') + '\n' + read('shared', 'tests_spec.js') + '\n' + read('shared', 'pattern_intros.js') + '\n' + read('shared', 'roadmap.js');
const { PATTERNS, PATTERN_WHEN, PROBLEMS, SHEET, SHEET_GROUPS, TEST_SPECS, PATTERN_MAP, PATTERN_INTROS, ROADMAP_TRACKS, ROADMAP_LANES, ROADMAP_NODES, ROADMAP_PATTERN_COVERS, ROADMAP_EDGES } =
  new Function('window', src + '\nreturn { PATTERNS, PATTERN_WHEN, PROBLEMS, SHEET, SHEET_GROUPS, TEST_SPECS, PATTERN_MAP, PATTERN_INTROS, ROADMAP_TRACKS, ROADMAP_LANES, ROADMAP_NODES, ROADMAP_PATTERN_COVERS, ROADMAP_EDGES };')(win);

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

// ---- 6. the roadmap (shared/roadmap.js): lanes, nodes, targets, edges, coverage ----
// Topics a learner meets, from the coverage checklist (docs/research/inbox/coverage-checklist.md on research/dsamaxxing):
// every topic it marks covered, partial or planned for the Start, Story and Sheet tracks. Each needs a node that covers it.
const REQUIRED_TOPICS = [
  // language basics and core programming (checklist section 1, research core-programming.md Levels 2-5)
  'variables and types', 'operators', 'input and output', 'conditionals', 'loops', 'functions', 'call stack', 'scope and closures',
  'lists', 'strings', 'dictionaries and sets', 'errors and exceptions', 'files and JSON', 'modules', 'comprehensions',
  'classes and objects', 'references and memory', 'encapsulation', 'inheritance and polymorphism', 'type hints',
  'iterators and generators', 'decorators', 'async and event loop', 'threads and concurrency', 'testing and debugging', 'git', 'sql',
  // complexity, arrays, searching, sorting, hashing (2.1-2.5)
  'big-o', 'amortized analysis', 'arrays', 'dynamic arrays', 'two pointers', 'sliding window', 'prefix sums', 'matrix',
  'linear search', 'binary search', 'bubble sort', 'selection sort', 'insertion sort', 'merge sort', 'quick sort', 'heap sort',
  'counting and radix sort', 'quickselect', 'hashing', 'collisions',
  // recursion, greedy, DP (2.6-2.7)
  'recursion', 'backtracking', 'divide and conquer', 'greedy', 'intervals', 'dynamic programming', 'knapsack', 'lis', 'grid dp',
  'interval dp', 'bitmask dp',
  // lists, stacks, trees, graphs (2.8-2.11)
  'linked lists', 'doubly and circular lists', 'fast and slow pointers', 'stacks', 'queues and deques', 'monotonic stack',
  'trees', 'tree traversals', 'bst', 'balanced trees', 'heaps', 'segment tree', 'fenwick tree', 'tries',
  'graphs', 'bfs', 'dfs', 'topological sort', 'union-find', 'dijkstra', 'bellman-ford', 'floyd-warshall', 'minimum spanning tree',
  'scc and bridges', 'network flow',
  // bits, math, strings, randomized, design (2.12-2.18)
  'bits', 'number theory', 'modular arithmetic', 'combinatorics', 'geometry', 'string matching', 'randomized algorithms',
  'design with data structures',
  // branches (section 3 and the system design lessons)
  'system design', 'machine learning', 'statistics and probability'
];
const pageFiles = new Set(fs.readdirSync(path.join(root, 'pages')).filter((f) => f.endsWith('.dc.html')));
const laneKeys = ROADMAP_LANES.map(([k]) => k);
const laneIx = new Map(laneKeys.map((k, i) => [k, i]));
const laneCols = new Map(ROADMAP_LANES.map(([k, , , cols]) => [k, cols]));
if (new Set(laneKeys).size !== laneKeys.length) fail('roadmap: two lanes share a key');
['start', 'core', 'concepts', 'patterns', 'practice', 'branches'].forEach((k, i) => { if (laneKeys[i] !== k) fail('roadmap: lane ' + (i + 1) + ' should be ' + k + ', got ' + laneKeys[i]); });
ROADMAP_LANES.forEach(([k, title, line, cols]) => {
  if (!text(title) || !text(line)) fail('roadmap lane ' + k + ': title or line missing');
  if (!(cols >= 2)) fail('roadmap lane ' + k + ': needs at least 2 columns');
});
if (laneCols.get('patterns') !== PATTERN_MAP.cols) fail('roadmap: the patterns lane must have PATTERN_MAP.cols columns');
// Lesson ids a track's source already has (empty when the track is not merged yet).
const trackIds = {};
Object.keys(ROADMAP_TRACKS).forEach((k) => {
  const tr = ROADMAP_TRACKS[k];
  if (!text(tr.name) || !text(tr.page) || !text(tr.prefix) || !text(tr.src)) fail('track ' + k + ': name, page, prefix and src are required');
  if (!text(tr.param) === !text(tr.key)) fail('track ' + k + ': opens a lesson by a URL param or by a saved key, exactly one');
  const dir = path.join(root, tr.src);
  const ids = new Set();
  if (fs.existsSync(dir)) fs.readdirSync(dir).filter((f) => f.endsWith('.js')).forEach((f) => {
    for (const m of read(tr.src, f).matchAll(/\bid:\s*'([a-z0-9-]+)'/g)) ids.add(m[1]);
  });
  trackIds[k] = { ids, merged: fs.existsSync(dir) && pageFiles.has(tr.page) };
});
// The roadmap draws the pattern nodes from PATTERN_MAP; the test joins them the same way the page does.
const rnodes = ROADMAP_NODES.concat(PATTERN_MAP.nodes.map(([name, label, col, row]) => ({ id: name, lane: 'patterns', label, col, row, name, group: name, covers: ROADMAP_PATTERN_COVERS[name] })));
const rBy = new Map();
let soonCount = 0, liveCount = 0;
rnodes.forEach((n) => {
  const at = 'roadmap node ' + n.id + ': ';
  if (rBy.has(n.id)) fail('roadmap: duplicate node ' + n.id);
  rBy.set(n.id, n);
  if (!laneIx.has(n.lane)) { fail(at + 'unknown lane ' + n.lane); return; }
  if (!n.label || n.label.length > 18) fail(at + 'label missing or longer than 18 characters');
  if (!(n.col >= 0 && n.col < laneCols.get(n.lane))) fail(at + 'column ' + n.col + ' is off its lane');
  if (!(n.row >= 0 && n.row <= 12)) fail(at + 'row ' + n.row + ' is off the map');
  if (!text(n.name)) fail(at + 'needs a full name');
  if (!Array.isArray(n.covers)) fail(at + 'covers must be a list');
  else n.covers.forEach((c) => { if (!REQUIRED_TOPICS.includes(c)) fail(at + 'covers "' + c + '", which is not a checklist topic'); });
  const kinds = ['track', 'group', 'page'].filter((k) => n[k] !== undefined);
  if (kinds.length !== 1) { fail(at + 'needs exactly one target: a track, a group or a page (has ' + (kinds.join(', ') || 'none') + ')'); return; }
  if (!n.group) {
    if (!text(n.blurb)) fail(at + 'needs a blurb');
    else { if (n.blurb.length > 160) fail(at + 'blurb is ' + n.blurb.length + ' characters (max 160)'); if (placeholder.test(n.blurb)) fail(at + 'blurb looks like a placeholder'); }
  }
  if (n.track !== undefined) {
    const tr = ROADMAP_TRACKS[n.track];
    if (!tr) { fail(at + 'unknown track ' + n.track); return; }
    if (typeof n.go !== 'string') fail(at + 'go must be a string: the first lesson id, or empty for coming soon');
    if (!Array.isArray(n.lessons) || !n.lessons.length) { fail(at + 'needs its lessons, live or planned'); return; }
    n.lessons.forEach((l) => { if (!Array.isArray(l) || !/^[a-z0-9-]+$/.test(l[0] || '') || !text(l[1])) fail(at + 'a lesson must be [id, title]'); });
    if (n.go) {
      // Live: the go lesson is one of its lessons, the track's page exists and every lesson is in the track's source.
      liveCount++;
      if (!n.lessons.some(([id]) => id === n.go)) fail(at + 'go "' + n.go + '" is not one of its lessons');
      if (!trackIds[n.track].merged) fail(at + 'is live but the ' + tr.name + ' track (' + tr.src + ', pages/' + tr.page + ') is not in this branch');
      else n.lessons.forEach(([id]) => { if (!trackIds[n.track].ids.has(id)) fail(at + 'lesson "' + id + '" is not in ' + tr.src); });
    } else soonCount++;
  }
  if (n.group !== undefined && !groupNames.includes(n.group)) fail(at + 'group ' + n.group + ' is not a sheet group');
  if (n.page !== undefined) {
    if (!pageFiles.has(n.page)) fail(at + 'page ' + n.page + ' does not exist');
    if (!['sheet', 'mock', 'sd', 'ai', 'git'].includes(n.progress)) fail(at + 'progress must be sheet, mock, sd, ai or git');
  }
});
// Every sheet group (side tracks too) sits on the roadmap.
groupNames.forEach((g) => { if (!rnodes.some((n) => n.group === g)) fail('roadmap: sheet group ' + g + ' has no node'); });
// Recursion and sorting are taught as concepts of their own.
['c-recursion', 'c-sorting'].forEach((id) => { const n = rBy.get(id); if (!n || n.lane !== 'concepts') fail('roadmap: the ' + id + ' node must exist in the concepts lane'); });
// No overlaps: nodes in one lane and column need a full row between them.
rnodes.forEach((a, i) => rnodes.slice(i + 1).forEach((b) => {
  if (a.lane === b.lane && a.col === b.col && Math.abs(a.row - b.row) < 1) fail('roadmap: nodes ' + a.id + ' and ' + b.id + ' overlap');
}));
// Edges: real nodes, no duplicates; left to right inside a lane, down the page between lanes; no loops anywhere.
const rEdges = PATTERN_MAP.edges.concat(ROADMAP_EDGES);
const rSeen = new Set(), rNext = new Map(rnodes.map((n) => [n.id, []]));
rEdges.forEach(([a, b]) => {
  const k = a + ' -> ' + b;
  if (!rBy.has(a) || !rBy.has(b)) { fail('roadmap edge ' + k + ' names a missing node'); return; }
  if (rSeen.has(k)) fail('roadmap: duplicate edge ' + k);
  rSeen.add(k);
  const A = rBy.get(a), B = rBy.get(b);
  if (A.lane === B.lane) { if (A.col >= B.col) fail('roadmap edge ' + k + ' does not run left to right inside its lane'); }
  else if (laneIx.get(A.lane) > laneIx.get(B.lane)) fail('roadmap edge ' + k + ' runs back up from ' + A.lane + ' to ' + B.lane);
  rNext.get(a).push(b);
});
const rState = new Map();
const rVisit = (n, trail) => {
  if (rState.get(n) === 'done') return;
  if (rState.get(n) === 'open') { fail('the roadmap has a loop: ' + trail.concat(n).join(' -> ')); return; }
  rState.set(n, 'open');
  rNext.get(n).forEach((m) => rVisit(m, trail.concat(n)));
  rState.set(n, 'done');
};
rnodes.forEach((n) => rVisit(n.id, []));
// Connected: every node outside the first lane has an edge in or out, so nothing floats alone.
rnodes.forEach((n) => { if (!rEdges.some(([a, b]) => a === n.id || b === n.id)) fail('roadmap node ' + n.id + ' has no edges'); });
// Each lane is entered from the lane above, so the roadmap reads as one path.
laneKeys.slice(1).forEach((k) => { if (!rEdges.some(([a, b]) => rBy.has(a) && rBy.has(b) && rBy.get(b).lane === k && laneIx.get(rBy.get(a).lane) < laneIx.get(k))) fail('roadmap: nothing leads into lane ' + k); });
// Crossings inside each new lane (the patterns lane is checked above).
let rCross = 0;
laneKeys.filter((k) => k !== 'patterns').forEach((k) => {
  const le = rEdges.filter(([a, b]) => rBy.has(a) && rBy.has(b) && rBy.get(a).lane === k && rBy.get(b).lane === k);
  const p2 = (a, b) => [rBy.get(a).col, rBy.get(a).row, rBy.get(b).col, rBy.get(b).row];
  let c = 0;
  le.forEach((e, i) => le.slice(i + 1).forEach((f) => { if (crosses(p2(...e), p2(...f))) c++; }));
  if (c > 3) fail('roadmap lane ' + k + ': ' + c + ' edge crossings (at most 3)');
  rCross += c;
});
// Coverage: every checklist topic has a node.
const covered = new Set(rnodes.reduce((a, n) => a.concat(n.covers || []), []));
REQUIRED_TOPICS.forEach((topic) => { if (!covered.has(topic)) fail('roadmap: no node covers the checklist topic "' + topic + '"'); });
if (!/\/\/ @@INTROS@@[\s\S]*const ROADMAP_NODES = [\s\S]*\/\/ @@END-INTROS@@/.test(read('pages', 'Patterns.dc.html'))) fail('pages/Patterns.dc.html is missing the roadmap in its INTROS block; run npm run build');
console.log('✓ roadmap: ' + rnodes.length + ' nodes in ' + laneKeys.length + ' lanes (' + liveCount + ' live lesson nodes, ' + soonCount + ' coming soon), ' + rEdges.length + ' edges, ' + rCross + ' crossings outside the patterns, ' + REQUIRED_TOPICS.length + ' checklist topics covered');
console.log('✓ ' + nodes.length + ' nodes, ' + E.length + ' edges, ' + crossings + ' crossings, ' + Object.keys(PATTERN_INTROS).length + ' cards');
console.log(problems ? problems + ' problem(s)' : 'map clean');
if (problems) process.exitCode = 1;
