// ---------- Matrix: the  tiler who turns whole floors ----------
// The floor is a visual: 'grid'. Each step carries the tile numbers after the move (vals) and a state per tile (cells).

// The Turning Tile Floor — Rotate Image
function tileFloorScene() {
  const n = 4;
  const floor = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
  const m = floor.map((row) => row.slice());
  // where every tile must end up after a quarter-turn clockwise
  const goal = floor.map((_, r) => floor.map((__, c) => floor[n - 1 - c][r]));
  const copy = () => m.map((row) => row.slice());
  const diag = [...Array(n).keys()].map((i) => [i, i]);
  const steps = [];
  const swapped = new Set();
  let moves = 0;
  steps.push({ kind: 'intro', vals: copy(), i: '—', j: '—', a: '—', b: '—', phase: 'start', moves, path: diag, actorAt: [0, 0], focus: [],
    dialog: [say('narr', 'There are sixteen painted tiles. The owner wants the floor turned a quarter-turn to the right.'), say('tiler', 'I cannot lift the whole floor. I can only swap two tiles at a time.'), say('narr', 'Then fold it first, and flip it after.')],
    nar: { kid: 'The tiler turns the floor in two moves. First the tiler folds it along the fold line, from the top-left corner to the bottom-right. Then the tiler flips every row.', builder: 'Turn the floor in place in two passes. First swap m[i][j] with m[j][i], which means the tile in row i, column j trades places with the tile in row j, column i (this is called a transpose). Then reverse each row. The tiles on the fold line never move in the first pass.', expert: 'A quarter-turn to the right equals a transpose followed by a flip of each row. Both only swap tiles, so the turn needs O(1) extra space and no second grid.' } });
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const a = m[i][j], b = m[j][i];
    m[i][j] = b; m[j][i] = a; moves++;
    swapped.add(i + ',' + j); swapped.add(j + ',' + i);
    steps.push({ kind: 'swap', vals: copy(), i, j, a, b, phase: 'fold', moves, path: diag, actorAt: [i, j], focus: [[i, j], [j, i]], swapped: new Set(swapped),
      dialog: [say('tiler', 'Tile ' + a + ' sits at row ' + i + ', column ' + j + '. Its mirror spot is row ' + j + ', column ' + i + ', where ' + b + ' is.'), say('narr', 'Swap them. Each pair across the line trades places once.')],
      nar: { kid: 'Tiles ' + a + ' and ' + b + ' face each other across the fold line. The tiler swaps them.', builder: 'i = ' + i + ', j = ' + j + ': swap m[' + i + '][' + j + '] and m[' + j + '][' + i + ']. Now m[' + i + '][' + j + '] = ' + b + '.', expert: 'Only places where j is more than i are visited, so each pair off the fold line is swapped once. That is n(n−1)/2 = 6 swaps for n = 4.' } });
  }
  for (let r = 0; r < n; r++) {
    const before = m[r].slice();
    m[r].reverse(); moves += 2;
    steps.push({ kind: 'mirror', vals: copy(), i: r, j: '—', a: before[0], b: before[n - 1], phase: 'mirror', moves, path: null, actorAt: [r, n - 1], focus: [], row: r, done: r === n - 1,
      dialog: r === n - 1
        ? [say('tiler', 'Last row. ' + before.join(' ') + ' becomes ' + m[r].join(' ') + '.'), say('narr', 'Every tile is where a quarter-turn would put it. The floor is turned.')]
        : [say('tiler', 'Row ' + r + ' reads ' + before.join(' ') + '. I flip it end to end.'), say('narr', 'Now it reads ' + m[r].join(' ') + '.')],
      nar: r === n - 1
        ? { kid: 'The tiler flips the last row. Look at the top row: 13 9 5 1. That was the left side, read from the bottom up. The floor has turned!', builder: 'Reverse row ' + r + '. All rows are done. Now m is the turned floor, and no second grid was used.', expert: 'In total there are 6 swaps for the fold and 8 swaps for the flips, which is 14 swaps for 16 tiles. This takes O(n²) time and O(1) extra space.' }
        : { kid: 'The tiler flips row ' + r + ' so its first tile goes last. ' + before.join(' ') + ' becomes ' + m[r].join(' ') + '.', builder: 'row.reverse() on row ' + r + ': swap the ends and walk inward, which is 2 swaps for 4 tiles.', expert: 'Reversing a row swaps tiles from both ends: n/2 swaps per row.' } });
  }
  const T = { intro: ['Fold line drawn', 'plain'], swap: ['Across the line → swap', 'cool'], mirror: ['Flip the row end to end', 'warn'] };
  steps.forEach((st) => {
    st.verdict = st.done ? 'Quarter-turn done!' : T[st.kind][0];
    st.tone = st.done ? 'ok' : T[st.kind][1];
    st.done = !!st.done;
    const focus = new Set(st.focus.map(([r, c]) => r + ',' + c));
    st.cells = floor.map((row, r) => row.map((_, c) => {
      if (st.done) return 'ok';
      if (st.kind === 'mirror') return r === st.row ? 'cur' : r < st.row ? 'ok' : 'stored';
      if (focus.has(r + ',' + c)) return 'cur';
      if (r === c) return 'buy';
      if (st.swapped && st.swapped.has(r + ',' + c)) return 'stored';
      return 'in';
    }));
    const k = st.vals.reduce((sum, row, r) => sum + row.filter((v, c) => v === goal[r][c]).length, 0);
    st.meter = { text: 'tiles in place: ' + k + ' / 16', pct: (k / 16) * 100, mark: 100, markLabel: 'all 16 turned' };
    st.watch = [['i', st.i, 'left'], ['j', st.j, 'left'], [st.kind === 'mirror' ? 'row[0] was' : 'm[i][j] was', st.a, 'right'], [st.kind === 'mirror' ? 'row[-1] was' : 'm[j][i] was', st.b, 'right'], ['pass', st.phase, 'text'], ['swaps', st.moves, st.done ? 'ok' : 'text']];
    delete st.swapped; delete st.focus; delete st.phase; delete st.a; delete st.b; delete st.i; delete st.j; delete st.moves; delete st.row;
  });
  const code = {
    py: [['def rotate(m):', ''], ['    n = len(m)', '', 'intro'], ['    for i in range(n):', ''], ['        for j in range(i + 1, n):', ''], ['            m[i][j], m[j][i] = m[j][i], m[i][j]', '', 'swap'], ['    for row in m:', ''], ['        row.reverse()', '  # mirror', 'mirror']],
    java: [['void rotate(int[][] m) {', ''], ['    int n = m.length;', '', 'intro'], ['    for (int i = 0; i < n; i++)', ''], ['        for (int j = i + 1; j < n; j++) {', ''], ['            int t = m[i][j];', ''], ['            m[i][j] = m[j][i];', '  // fold', 'swap'], ['            m[j][i] = t;', ''], ['        }', ''], ['    for (int[] row : m)', ''], ['        for (int l = 0, r = n - 1; l < r; l++, r--) {', ''], ['            int t = row[l];', ''], ['            row[l] = row[r];', '  // mirror', 'mirror'], ['            row[r] = t;', ''], ['        }', ''], ['}', '']],
    cpp: [['void rotate(vector<vector<int>>& m) {', ''], ['    int n = m.size();', '', 'intro'], ['    for (int i = 0; i < n; i++)', ''], ['        for (int j = i + 1; j < n; j++)', ''], ['            swap(m[i][j], m[j][i]);', '  // fold', 'swap'], ['    for (auto& row : m)', ''], ['        reverse(row.begin(), row.end());', '  // mirror', 'mirror'], ['}', '']],
    js: [['function rotate(m) {', ''], ['  const n = m.length;', '', 'intro'], ['  for (let i = 0; i < n; i++)', ''], ['    for (let j = i + 1; j < n; j++)', ''], ['      [m[i][j], m[j][i]] = [m[j][i], m[i][j]];', '', 'swap'], ['  for (const row of m)', ''], ['    row.reverse();', '  // mirror', 'mirror'], ['}', '']],
    go: [['func rotate(m [][]int) {', ''], ['    n := len(m)', '', 'intro'], ['    for i := 0; i < n; i++ {', ''], ['        for j := i + 1; j < n; j++ {', ''], ['            m[i][j], m[j][i] = m[j][i], m[i][j]', '', 'swap'], ['        }', ''], ['    }', ''], ['    for _, row := range m {', ''], ['        for l, r := 0, n-1; l < r; l, r = l+1, r-1 {', ''], ['            row[l], row[r] = row[r], row[l]', ' // mirror', 'mirror'], ['        }', ''], ['    }', ''], ['}', '']]
  };
  return {
    id: 'rotate-image', pattern: 'Matrix', cast: 'tiler', short: 'Tile Floor', visual: 'grid', items: floor, width: 420, maxTile: 50,
    gridLabel: 'Tile floor', legend: [['buy', 'on the fold line'], ['cur', 'moving now'], ['stored', 'folded'], ['ok', 'in its final spot'], ['path', 'fold line']],
    goal: 'Turn the floor a quarter-turn right, two tiles at a time', status: ['Floor unturned', 'Floor turned'],
    lines: tagLines(code), code,
    rules: [['Draw the fold line from corner to corner', 'intro'], ['Swap each tile with its twin across the line', 'swap'], ['Then flip every row end to end', 'mirror']],
    complexity: [['O(n²)', 'n is the side of the square, so n² is the number of tiles; each is touched a fixed number of times'], ['O(1)', 'swaps only, no second floor']],
    quest: ['The owner of the old bathhouse wants the tiled floor turned a quarter-turn to the right. The tiles are glued in a 4 by 4 square, numbered 1 to 16.', 'The tiler has no spare floor to work on and may only swap two tiles at a time. Can the tiler still turn the floor?'],
    example: ['m = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]', 'after = [[13,9,5,1],[14,10,6,2],[15,11,7,3],[16,12,8,4]]'],
    hints: ['“After the turn, the top row is the old left column, read from bottom to top. Which easy moves get you close?”', '“Swap every tile with its twin across the corner-to-corner line. Rows become columns. Is the order right yet?”', '“Fold across the corner-to-corner line, then flip each row end to end. Two easy passes make one turn.”'],
    clues: ['a square of tiles', 'turn it a quarter-turn', 'no spare floor (in place)'],
    quizFb: ['“A fresh floor would work, but there is none. The turn has to happen in place.”', '“Yes! Folding turns rows into columns. Flipping each row then puts them in the right order.”', '“Flipping rows alone gives a mirror image, not a turn. Tile 1 would land top-right, not where it belongs.”', '“Sliding rows down moves them, but no row ever turns into a column. The floor would not turn.”'],
    steps
  };
}

SCENE_REGISTRY.push(tileFloorScene);
PATTERN_KITS['Matrix'] = { right: 1, spot: 'Why fold, not lift?', ask: 'How should the tiler turn the floor?',
  quiz: [['Lay a fresh floor', 'Copy every tile into a new square, turned'], ['Fold, then mirror', 'Swap across the corner-to-corner line, then flip each row'], ['Flip every row', 'Turn each row end to end and stop'], ['Slide the rows down', 'Move every row one place lower, wrapping around']] };
STORY_CAST.tiler = { name: 'Tiler', initial: 'T', color: 'left', radius: '8px' };
