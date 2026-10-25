// ---------- Depth-First Search: the  explorer who goes deep before going wide ----------
// The map is a visual: 'grid'. The trail (path) is the explorer's chain of open calls, from where he landed to where he stands.

// Islands on the Map — Number of Islands
function islandsScene() {
  const map = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '1', '1'],
    ['0', '0', '0', '1', '0'],
    ['0', '1', '0', '0', '0'],
    ['1', '1', '1', '0', '1']
  ];
  const R = map.length, C = map[0].length;
  const g = map.map((row) => row.slice());
  const owner = map.map((row) => row.map(() => -1));   // which island chalked each square
  const land = map.flat().filter((x) => x === '1').length;
  const where = (r, c) => 'row ' + r + ', column ' + c;
  const dirName = (a, b) => (b[0] > a[0] ? 'down' : b[0] < a[0] ? 'up' : b[1] > a[1] ? 'right' : 'left');
  const steps = [];
  const trail = [];
  let islands = 0, size = 0, chalked = 0, last = null;
  steps.push({ kind: 'intro', r: '—', c: '—', vals: map.map((row) => row.slice()), owner: owner.map((x) => x.slice()), islands, size, chalked, trail: [], actorAt: [0, 0],
    dialog: [say('narr', 'A sea map, 5 squares by 5. A 1 is land, a 0 is water. How many islands are there?'), say('explorer', 'Land squares that touch up, down, left or right are the same island.'), say('narr', 'So when you find land, explore all of it before you count again.')],
    nar: { kid: 'The explorer reads the map row by row. When he steps on new land, that is a new island. He chalks every square of it so he never counts it twice.', builder: 'Scan every square. On an unvisited "1", add one to islands and call chalk(r, c), which marks the square and spreads to its four neighbours.', expert: 'Count connected components in a grid graph: each square is a node, with edges to its 4 neighbours. One DFS (depth-first search: follow a path as deep as it goes, then back up) per component.' } });
  const visit = (r, c) => {
    if (r < 0 || c < 0 || r >= R || c >= C || g[r][c] !== '1') return;
    g[r][c] = '#'; owner[r][c] = islands - 1; size++; chalked++;
    trail.push([r, c]);
    const first = trail.length === 1;
    const parent = trail.length > 1 ? trail[trail.length - 2] : null;
    const backed = !first && last && (last[0] !== parent[0] || last[1] !== parent[1]);
    const dir = parent ? dirName(parent, [r, c]) : '';
    const st = { kind: first ? 'found' : 'chalk', r, c, vals: g.map((row) => row.slice()), owner: owner.map((x) => x.slice()), islands, size, chalked, trail: trail.map((p) => p.slice()), actorAt: [r, c] };
    if (first) {
      st.dialog = [say('explorer', 'Land at ' + where(r, c) + ', and no chalk on it.'), say('narr', 'Then it is a new island. That makes ' + islands + '. The marker it and explore.')];
      st.nar = { kid: 'The explorer finds land with no chalk. It must be a new island! That is island number ' + islands + '. He chalks the square.', builder: 'grid[' + r + '][' + c + '] == "1" → islands = ' + islands + ', then chalk(' + r + ', ' + c + ') writes "#" there.', expert: 'The scan only starts a DFS on an unvisited land square, so each component is counted exactly once, at its first square in reading order.' };
    } else if (backed) {
      st.dialog = [say('explorer', 'Dead end. I walk back along my trail to ' + where(parent[0], parent[1]) + '.'), say('explorer', 'From there, ' + dir + ' is land. Chalked!')];
      st.nar = { kid: 'The explorer hit water or chalk on every side, so he walked back along his trail. Then he found more land ' + dir + ' and chalked it.', builder: 'Some chalk() calls returned at once (water, chalk or the edge). Back in chalk(' + parent[0] + ', ' + parent[1] + '), the ' + dir + ' call lands on fresh land: grid[' + r + '][' + c + '] = "#".', expert: 'Returning from a call is the “back up” half of DFS. The drawn trail is the call stack: ' + trail.length + ' calls deep right now.' };
    } else {
      st.dialog = [say('explorer', 'Going ' + dir + ' to ' + where(r, c) + '. Land!'), say('narr', 'The marker it and keep going deeper.')];
      st.nar = { kid: 'The explorer steps ' + dir + ' and finds more land. Same island! He chalks it and keeps going.', builder: 'chalk(' + r + ', ' + c + ') from chalk(' + parent[0] + ', ' + parent[1] + '): it is "1", so mark it "#". This island has ' + size + ' squares so far.', expert: 'Each square is marked before its neighbours are tried, so no square is entered twice. Trail depth: ' + trail.length + '.' };
    }
    steps.push(st);
    last = [r, c];
    visit(r + 1, c); visit(r - 1, c); visit(r, c + 1); visit(r, c - 1);
    trail.pop();
  };
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    if (g[r][c] === '1') { islands++; size = 0; last = null; visit(r, c); }
  }
  steps.push({ kind: 'done', r: R - 1, c: C - 1, vals: g.map((row) => row.slice()), owner: owner.map((x) => x.slice()), islands, size, chalked, trail: [], actorAt: [R - 1, C - 1], done: true,
    dialog: [say('explorer', 'I’ve read the last square. Every bit of land has chalk on it.'), say('narr', 'You found ' + islands + ' islands, and counted each one once.')],
    nar: { kid: 'The whole map is read and all land is chalked. There are ' + islands + ' islands!', builder: 'The scan ends → return islands = ' + islands + '.', expert: 'Every square is scanned once and chalked at most once: O(R·C) time. The trail can grow to R·C calls in the worst case, so O(R·C) space.' } });
  const T = { intro: ['Ready to read the map', 'plain'], found: ['New land → new island', 'warn'], chalk: ['Land next door → chalk it', 'cool'], done: [islands + ' islands found!', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    const cur = st.islands - 1;
    st.cells = st.vals.map((row, r) => row.map((v, c) => {
      if (v === '0') return 'out';
      if (v === '1') return 'in';
      if (st.done) return 'stored';
      if (st.kind !== 'intro' && r === st.r && c === st.c) return st.kind === 'found' ? 'hit' : 'cur';
      return st.owner[r][c] === cur ? 'ok' : 'stored';
    }));
    st.path = st.trail.length > 1 ? st.trail : null;
    st.meter = { text: 'land chalked: ' + st.chalked + ' / ' + land, pct: (st.chalked / land) * 100, mark: 100, markLabel: 'all ' + land + ' land squares' };
    st.watch = [['r', st.r, 'left'], ['c', st.c, 'left'], ['grid[r][c]', st.kind === 'intro' ? '—' : st.done ? '"' + st.vals[st.r][st.c] + '"' : '"#"', 'right'], ['islands', st.islands, st.done ? 'ok' : 'text'], ['this island', st.kind === 'intro' ? 0 : st.size, 'text'], ['trail depth', st.trail.length, 'right']];
    delete st.owner; delete st.trail; delete st.islands; delete st.size; delete st.chalked; delete st.r; delete st.c;
  });
  const code = {
    py: [['def numIslands(grid):', ''], ['    rows, cols = len(grid), len(grid[0])', ''], ['    def chalk(r, c):', ''], ['        if not (0 <= r < rows and 0 <= c < cols):', ''], ['            return', ''], ['        if grid[r][c] != "1":', ''], ['            return', '  # water or chalk'], ['        grid[r][c] = "#"', '  # chalk it', 'chalk'], ['        chalk(r + 1, c); chalk(r - 1, c)', ''], ['        chalk(r, c + 1); chalk(r, c - 1)', ''], ['    islands = 0', '', 'intro'], ['    for r in range(rows):', ''], ['        for c in range(cols):', ''], ['            if grid[r][c] == "1":', ''], ['                islands += 1', '  # new island', 'found'], ['                chalk(r, c)', ''], ['    return islands', '', 'done']],
    java: [['int numIslands(char[][] g) {', ''], ['    int islands = 0;', '', 'intro'], ['    for (int r = 0; r < g.length; r++)', ''], ['        for (int c = 0; c < g[0].length; c++)', ''], ['            if (g[r][c] == \'1\') {', ''], ['                islands++;', '  // new island', 'found'], ['                chalk(g, r, c);', ''], ['            }', ''], ['    return islands;', '', 'done'], ['}', ''], ['void chalk(char[][] g, int r, int c) {', ''], ['    if (r < 0 || c < 0 || r >= g.length) return;', ''], ['    if (c >= g[0].length || g[r][c] != \'1\') return;', ''], ['    g[r][c] = \'#\';', '  // chalk it', 'chalk'], ['    chalk(g, r + 1, c); chalk(g, r - 1, c);', ''], ['    chalk(g, r, c + 1); chalk(g, r, c - 1);', ''], ['}', '']],
    cpp: [['void chalk(vector<vector<char>>& g, int r, int c) {', ''], ['    if (r < 0 || c < 0 || r >= g.size()) return;', ''], ['    if (c >= g[0].size() || g[r][c] != \'1\') return;', ''], ['    g[r][c] = \'#\';', '  // chalk it', 'chalk'], ['    chalk(g, r + 1, c); chalk(g, r - 1, c);', ''], ['    chalk(g, r, c + 1); chalk(g, r, c - 1);', ''], ['}', ''], ['int numIslands(vector<vector<char>>& g) {', ''], ['    int islands = 0;', '', 'intro'], ['    for (int r = 0; r < g.size(); r++)', ''], ['        for (int c = 0; c < g[0].size(); c++)', ''], ['            if (g[r][c] == \'1\') {', ''], ['                islands++;', '  // new island', 'found'], ['                chalk(g, r, c);', ''], ['            }', ''], ['    return islands;', '', 'done'], ['}', '']],
    js: [['function numIslands(g) {', ''], ['  const chalk = (r, c) => {', ''], ['    if (r < 0 || c < 0 || r >= g.length) return;', ''], ['    if (c >= g[0].length || g[r][c] !== "1") return;', ''], ['    g[r][c] = "#";', '  // chalk it', 'chalk'], ['    chalk(r + 1, c); chalk(r - 1, c);', ''], ['    chalk(r, c + 1); chalk(r, c - 1);', ''], ['  };', ''], ['  let islands = 0;', '', 'intro'], ['  for (let r = 0; r < g.length; r++)', ''], ['    for (let c = 0; c < g[0].length; c++)', ''], ['      if (g[r][c] === "1") {', ''], ['        islands++;', '  // new island', 'found'], ['        chalk(r, c);', ''], ['      }', ''], ['  return islands;', '', 'done'], ['}', '']],
    go: [['func numIslands(g [][]byte) int {', ''], ['    var chalk func(r, c int)', ''], ['    chalk = func(r, c int) {', ''], ['        if r < 0 || c < 0 || r >= len(g) ||', ''], ['            c >= len(g[0]) || g[r][c] != \'1\' {', ''], ['            return', '  // water or chalk'], ['        }', ''], ['        g[r][c] = \'#\'', '  // chalk it', 'chalk'], ['        chalk(r+1, c); chalk(r-1, c)', ''], ['        chalk(r, c+1); chalk(r, c-1)', ''], ['    }', ''], ['    islands := 0', '', 'intro'], ['    for r := range g {', ''], ['        for c := range g[r] {', ''], ['            if g[r][c] == \'1\' {', ''], ['                islands++', '  // new island', 'found'], ['                chalk(r, c)', ''], ['            }', ''], ['        }', ''], ['    }', ''], ['    return islands', '', 'done'], ['}', '']]
  };
  return {
    id: 'number-of-islands', pattern: 'Depth-First Search', cast: 'explorer', short: 'Islands', visual: 'grid', items: map, width: 420, maxTile: 44,
    gridLabel: 'Sea map', legend: [['in', 'land, no chalk yet'], ['cur', 'The explorer is here'], ['ok', 'chalked: this island'], ['stored', 'chalked: earlier island'], ['out', 'water'], ['path', 'The explorer’s trail']],
    goal: 'Count the islands. Each one counts once.', status: ['Reading the map…', islands + ' islands'],
    lines: tagLines(code), code,
    rules: [['Start with zero islands', 'intro'], ['Unchalked land → a new island', 'found'], ['The marker it, then try all four neighbours', 'chalk'], ['Map read → report the count', 'done']],
    complexity: [['O(R·C)', 'each square is read once and chalked at most once'], ['O(R·C)', 'the trail can wind through every square']],
    quest: ['An old sea map shows a 5 by 5 patch of ocean. Each square is either land (1) or water (0). Land squares that touch up, down, left or right belong to the same island.', 'The harbour master wants to know: how many separate islands are there? The explorer has a stick of chalk.'],
    example: ['grid = 11000 / 11011 / 00010 / 01000 / 11101', 'answer = 4'],
    hints: ['“Counting land squares gives 12, but many of them are the same island. How can you tell you’ve seen an island before?”', '“When you find new land, explore the whole island right away. Mark every square you step on.”', '“Scan the map. Unmarked land → islands += 1, then chalk it and its land neighbours, and theirs, until none are left.”'],
    clues: ['a grid of land and water', 'touching land is one island', 'never count an island twice'],
    quizFb: ['“That counts squares, not islands. The top-left island alone has 4 squares.”', '“Islands bend across rows. The one at the bottom-left uses rows 3 and 4.”', '“Yes! Find land, chalk the whole island at once, and the scan will never count it again.”', '“Comparing every pair is slow, and two squares can share an island without touching each other.”'],
    steps
  };
}

SCENE_REGISTRY.push(islandsScene);
PATTERN_KITS['Depth-First Search'] = { right: 2, spot: 'Why chalk, not count?', ask: 'How should the explorer count the islands?',
  quiz: [['Count every land square', 'Each 1 on the map is an island'], ['Count runs in each row', 'An island is a stretch of land in one row'], ['The marker each island you find', 'Explore all of it at once, so it is never counted again'], ['Compare every pair of squares', 'Check which land squares touch which']] };
STORY_CAST.explorer = { name: 'Explorer', initial: 'E', color: 'left', radius: '999px' };

// ---------- Your own input (see practice.js) ----------
function islandsRun(input) {
  const map = (input || SCENE_INPUT['number-of-islands'].default).grid.map((row) => row.slice());
  const R = map.length, C = map[0].length;
  const g = map.map((row) => row.slice()), owner = map.map((row) => row.map(() => -1));
  const land = map.flat().filter((x) => x === '1').length;
  const where = (r, c) => 'row ' + r + ', column ' + c;
  const dirName = (a, b) => (b[0] > a[0] ? 'down' : b[0] < a[0] ? 'up' : b[1] > a[1] ? 'right' : 'left');
  const steps = [], trail = [];
  let islands = 0, size = 0, chalked = 0;
  const snap = (kind, r, c, extra) => Object.assign({ r, c, vals: g.map((row) => row.slice()), owner: owner.map((x) => x.slice()), islands, size, chalked, trail: trail.map((p) => p.slice()), actorAt: [r === '—' ? 0 : r, c === '—' ? 0 : c] }, extra);
  steps.push(runStep('intro', snap('intro', '—', '—'), [say('narr', 'A ' + R + ' by ' + C + ' map. 1 is land, 0 is water. How many islands?'), say('explorer', 'Land that touches up, down, left or right is one island.')],
    'The explorer reads the map row by row. New land means a new island, and he chalks all of it so it is never counted twice.', 'Scan every square. On unchalked land: islands += 1, then chalk(r, c).', 'Count connected groups: one search per group, O(R·C) in total.'));
  const visit = (r, c) => {
    if (r < 0 || c < 0 || r >= R || c >= C || g[r][c] !== '1') return;
    g[r][c] = '#'; owner[r][c] = islands - 1; size++; chalked++;
    trail.push([r, c]);
    const first = trail.length === 1, parent = first ? null : trail[trail.length - 2];
    if (first) {
      steps.push(runStep('found', snap('found', r, c), [say('explorer', 'Land at ' + where(r, c) + ', no chalk on it.'), say('narr', 'A new island. That makes ' + islands + '.')],
        'The explorer finds land with no chalk. That is island number ' + islands + '. He chalks it.', 'grid[' + r + '][' + c + '] == "1" → islands = ' + islands + ', chalk(' + r + ', ' + c + ').', 'Each island is counted once, at its first square in reading order.'));
    } else {
      const dir = dirName(parent, [r, c]);
      steps.push(runStep('chalk', snap('chalk', r, c), [say('explorer', 'Going ' + dir + ' to ' + where(r, c) + '. Land!'), say('narr', 'The marker it and keep going.')],
        'The explorer steps ' + dir + ' and finds more land on the same island. He chalks it.', 'chalk(' + r + ', ' + c + '): "1" → "#". This island has ' + size + ' squares so far.', 'Mark first, then try the neighbours, so no square is entered twice.'));
    }
    visit(r + 1, c); visit(r - 1, c); visit(r, c + 1); visit(r, c - 1);
    trail.pop();
  };
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (g[r][c] === '1') { islands++; size = 0; visit(r, c); }
  steps.push(runStep('done', snap('done', R - 1, C - 1, { done: true }), [say('explorer', 'I read the last square.'), say('narr', islands === 1 ? 'There is 1 island.' : 'There are ' + islands + ' islands.')],
    islands === 1 ? 'The whole map is read. There is 1 island.' : 'The whole map is read. There are ' + islands + ' islands.', 'The scan ends → return islands = ' + islands + '.', 'Every square is read once and chalked at most once: O(R·C).'));
  runFinish(steps, { intro: ['Ready to read the map', 'plain'], found: ['New land → new island', 'warn'], chalk: ['Land next door → chalk it', 'cool'], done: [islands + (islands === 1 ? ' island found' : ' islands found'), 'ok'] }, (st) => {
    const cur = st.islands - 1;
    st.cells = st.vals.map((row, r) => row.map((x, c) => {
      if (x === '0') return 'out';
      if (x === '1') return 'in';
      if (st.done) return 'stored';
      if (st.kind !== 'intro' && r === st.r && c === st.c) return st.kind === 'found' ? 'hit' : 'cur';
      return st.owner[r][c] === cur ? 'ok' : 'stored';
    }));
    st.path = st.trail.length > 1 ? st.trail : null;
    st.meter = { text: 'land chalked: ' + st.chalked + ' / ' + land, pct: land ? (st.chalked / land) * 100 : 100, mark: 100, markLabel: 'all ' + land + ' land squares' };
    st.watch = [['r', st.r, 'left'], ['c', st.c, 'left'], ['grid[r][c]', st.kind === 'intro' ? '—' : st.done ? '"' + st.vals[st.r][st.c] + '"' : '"#"', 'right'], ['islands', st.islands, st.done ? 'ok' : 'text'], ['this island', st.kind === 'intro' ? 0 : st.size, 'text'], ['trail depth', st.trail.length, 'right']];
    if (!st.path) delete st.path;
    ['owner', 'trail', 'islands', 'size', 'chalked', 'r', 'c'].forEach((k) => delete st[k]);
  });
  return runScene('number-of-islands', {
    items: map, status: ['Reading the map…', islands + (islands === 1 ? ' island' : ' islands')],
    example: ['grid = ' + map.map((row) => row.join('')).join(' / '), 'answer = ' + islands], answer: islands, input: { grid: map }
  }, steps);
}
SCENE_INPUT['number-of-islands'] = {
  hint: 'rows of 0 and 1, split by /', example: '11000 / 11011 / 00010 / 01000 / 11101',
  default: { grid: ['11000', '11011', '00010', '01000', '11101'].map((r) => r.split('')) },
  presets: [['Story example', () => SCENE_INPUT['number-of-islands'].default], ['Random', () => SCENE_INPUT['number-of-islands'].random()], ['All water', () => ({ grid: ['000', '000'].map((r) => r.split('')) })], ['Checkerboard', () => ({ grid: ['1010', '0101', '1010'].map((r) => r.split('')) })]],
  random: () => { const R = rint(2, 6), C = rint(2, 6); return { grid: Array.from({ length: R }, () => Array.from({ length: C }, () => (Math.random() < 0.45 ? '1' : '0'))) }; },
  parse: parseGrid, show: showGrid,
  check: (v) => (v.grid.length < 2 || v.grid.length > 6 ? 'Use 2 to 6 rows, so the map stays readable.'
    : !v.grid.every((row) => row.length === v.grid[0].length) ? 'Every row needs the same number of squares.'
    : v.grid[0].length < 2 || v.grid[0].length > 6 ? 'Use 2 to 6 squares per row, so the map stays readable.' : ''),
  make: islandsRun
};
