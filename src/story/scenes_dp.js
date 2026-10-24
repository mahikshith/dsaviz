// ---------- Dynamic Programming: Sol, the scribe who writes every small answer down ----------
// The notebook is a visual: 'grid'. A 2D table for Unique Paths; a one-row grid for the 1D stories.
// A blank tile is a note Sol has not written yet.

// The Grid Walker's Notebook — Unique Paths
function gridWalkerScene() {
  const m = 4, n = 4;
  const ways = [...Array(m)].map(() => Array(n).fill(0));
  const shown = [...Array(m)].map(() => Array(n).fill(''));
  const snap = () => shown.map((row) => row.slice());
  const steps = [];
  const total = m * n;
  let written = 0;
  steps.push({ kind: 'intro', vals: snap(), at: null, from: [], written, r: '—', c: '—', up: '—', left: '—', actorAt: [0, 0],
    dialog: [say('hoot', 'A robot starts in the top-left square and wants the bottom-right one. It may only move right or down.'), say('sol', 'How many different routes are there? I’ll write the answer for every square, small ones first.')],
    nar: { kid: 'Sol has a notebook shaped like the floor. In each square he will write how many different ways the robot can get there.', builder: 'ways[r][c] = number of routes from (0, 0) to (r, c). The answer is ways[3][3]. Start with a table of zeros.', expert: 'Dynamic programming (DP: solve small versions first and store them). Every route into (r, c) arrives from above or from the left, so ways[r][c] = ways[r−1][c] + ways[r][c−1].' } });
  for (let c = 0; c < n; c++) { ways[0][c] = 1; shown[0][c] = 1; written++; }
  steps.push({ kind: 'edge', vals: snap(), at: null, row: 0, from: [], written, r: 0, c: '0..3', up: '—', left: '—', actorAt: [0, n - 1],
    dialog: [say('sol', 'The top row is easy. The robot can only keep moving right to get there.'), say('hoot', 'So there is exactly 1 way into each of those squares.')],
    nar: { kid: 'To reach any square in the top row, the robot just goes right, right, right. Only 1 way each. Sol writes 1s.', builder: 'ways[0][c] = 1 for every c.', expert: 'Base case: the first row has a single monotone route.' } });
  for (let r = 0; r < m; r++) { if (!shown[r][0]) written++; ways[r][0] = 1; shown[r][0] = 1; }
  steps.push({ kind: 'side', vals: snap(), at: null, col: 0, from: [], written, r: '0..3', c: 0, up: '—', left: '—', actorAt: [m - 1, 0],
    dialog: [say('sol', 'Same for the left column. The robot can only keep moving down.'), say('hoot', '1 way into each of those too.')],
    nar: { kid: 'To reach a square in the left column, the robot just goes down. Only 1 way each. More 1s in the notebook.', builder: 'ways[r][0] = 1 for every r.', expert: 'Second base case: the first column. Both edges together seed the table.' } });
  for (let r = 1; r < m; r++) for (let c = 1; c < n; c++) {
    ways[r][c] = ways[r - 1][c] + ways[r][c - 1]; shown[r][c] = ways[r][c]; written++;
    const up = ways[r - 1][c], left = ways[r][c - 1];
    steps.push({ kind: 'fill', vals: snap(), at: [r, c], from: [[r - 1, c], [r, c - 1]], written, r, c, up, left, actorAt: [r, c],
      dialog: [say('sol', 'Row ' + r + ', column ' + c + '. From above: ' + up + ' ways. From the left: ' + left + ' ways.'), say('hoot', 'Every route comes from one of those two. So ' + up + ' + ' + left + ' = ' + ways[r][c] + '.')],
      nar: { kid: 'The robot can only arrive from the square above or the square to the left. Sol adds their notes: ' + up + ' + ' + left + ' = ' + ways[r][c] + '.', builder: 'ways[' + r + '][' + c + '] = ways[' + (r - 1) + '][' + c + '] + ways[' + r + '][' + (c - 1) + '] = ' + up + ' + ' + left + ' = ' + ways[r][c] + '.', expert: 'Both notes were written earlier (row by row, left to right), so each square costs O(1). No route is counted twice: its last move is either down or right, never both.' } });
  }
  const answer = ways[m - 1][n - 1];
  const route = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 3]];
  steps.push({ kind: 'done', vals: snap(), at: [m - 1, n - 1], from: [], written, r: m - 1, c: n - 1, up: ways[m - 2][n - 1], left: ways[m - 1][n - 2], actorAt: [m - 1, n - 1], path: route, done: true,
    dialog: [say('sol', 'The bottom-right square says ' + answer + '.'), say('hoot', 'The drawn line is just one of those ' + answer + ' routes. Sol never had to walk any of them.')],
    nar: { kid: 'The last square says ' + answer + '. There are ' + answer + ' different routes! The drawn line shows one of them.', builder: 'return ways[3][3] = ' + answer + '.', expert: 'O(m·n) time and space; one row of notes is enough to get O(n) space. The count is also the binomial C(6, 3) = 20.' } });
  const T = { intro: ['Empty notebook', 'plain'], edge: ['Top row → 1 way each', 'cool'], side: ['Left column → 1 way each', 'cool'], fill: ['Above + left', 'warn'], done: [answer + ' routes!', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    const from = new Set(st.from.map(([r, c]) => r + ',' + c));
    st.cells = st.vals.map((row, r) => row.map((v, c) => {
      if (st.done) return r === m - 1 && c === n - 1 ? 'ok' : 'stored';
      if (st.at && st.at[0] === r && st.at[1] === c) return 'cur';
      if (from.has(r + ',' + c)) return 'buy';
      if (st.kind === 'edge' && r === 0) return 'cur';
      if (st.kind === 'side' && c === 0 && r > 0) return 'cur';
      return v === '' ? 'future' : 'stored';
    }));
    st.meter = { text: 'notes written: ' + st.written + ' / ' + total, pct: (st.written / total) * 100, mark: 100, markLabel: 'all ' + total + ' squares' };
    st.watch = [['r', st.r, 'left'], ['c', st.c, 'left'], ['ways[r-1][c]', st.up, 'right'], ['ways[r][c-1]', st.left, 'right'], ['ways[r][c]', st.kind === 'fill' || st.done ? st.vals[st.at[0]][st.at[1]] : st.kind === 'intro' ? '—' : 1, 'text'], ['answer', st.done ? answer : '…', st.done ? 'ok' : 'text']];
    delete st.at; delete st.from; delete st.written; delete st.r; delete st.c; delete st.up; delete st.left; delete st.row; delete st.col;
  });
  const code = {
    py: [['def uniquePaths(m, n):', ''], ['    ways = [[0] * n for _ in range(m)]', '', 'intro'], ['    for c in range(n):', ''], ['        ways[0][c] = 1', '  # top row', 'edge'], ['    for r in range(m):', ''], ['        ways[r][0] = 1', '  # left side', 'side'], ['    for r in range(1, m):', ''], ['        for c in range(1, n):', ''], ['            ways[r][c] = ways[r-1][c] + ways[r][c-1]', '', 'fill'], ['    return ways[m-1][n-1]', '', 'done']],
    java: [['int uniquePaths(int m, int n) {', ''], ['    int[][] ways = new int[m][n];', '', 'intro'], ['    for (int c = 0; c < n; c++)', ''], ['        ways[0][c] = 1;', '  // top row', 'edge'], ['    for (int r = 0; r < m; r++)', ''], ['        ways[r][0] = 1;', '  // left side', 'side'], ['    for (int r = 1; r < m; r++)', ''], ['        for (int c = 1; c < n; c++)', ''], ['            ways[r][c] = ways[r-1][c] + ways[r][c-1];', '', 'fill'], ['    return ways[m-1][n-1];', '', 'done'], ['}', '']],
    cpp: [['int uniquePaths(int m, int n) {', ''], ['    vector<vector<int>> ways(m, vector<int>(n, 0));', '', 'intro'], ['    for (int c = 0; c < n; c++)', ''], ['        ways[0][c] = 1;', '  // top row', 'edge'], ['    for (int r = 0; r < m; r++)', ''], ['        ways[r][0] = 1;', '  // left side', 'side'], ['    for (int r = 1; r < m; r++)', ''], ['        for (int c = 1; c < n; c++)', ''], ['            ways[r][c] = ways[r-1][c] + ways[r][c-1];', '', 'fill'], ['    return ways[m-1][n-1];', '', 'done'], ['}', '']],
    js: [['function uniquePaths(m, n) {', ''], ['  const ways = Array.from({ length: m },', '', 'intro'], ['    () => Array(n).fill(0));', ''], ['  for (let c = 0; c < n; c++)', ''], ['    ways[0][c] = 1;', '  // top row', 'edge'], ['  for (let r = 0; r < m; r++)', ''], ['    ways[r][0] = 1;', '  // left side', 'side'], ['  for (let r = 1; r < m; r++)', ''], ['    for (let c = 1; c < n; c++)', ''], ['      ways[r][c] = ways[r-1][c] + ways[r][c-1];', '', 'fill'], ['  return ways[m-1][n-1];', '', 'done'], ['}', '']],
    go: [['func uniquePaths(m, n int) int {', ''], ['    ways := make([][]int, m)', '', 'intro'], ['    for r := range ways {', ''], ['        ways[r] = make([]int, n)', ''], ['    }', ''], ['    for c := 0; c < n; c++ {', ''], ['        ways[0][c] = 1', '  // top row', 'edge'], ['    }', ''], ['    for r := 0; r < m; r++ {', ''], ['        ways[r][0] = 1', '  // left side', 'side'], ['    }', ''], ['    for r := 1; r < m; r++ {', ''], ['        for c := 1; c < n; c++ {', ''], ['            ways[r][c] = ways[r-1][c] + ways[r][c-1]', '', 'fill'], ['        }', ''], ['    }', ''], ['    return ways[m-1][n-1]', '', 'done'], ['}', '']]
  };
  return {
    id: 'unique-paths', pattern: 'Dynamic Programming', cast: 'sol', short: 'Grid', visual: 'grid', items: shown.map((row) => row.map(() => '')), width: 420, maxTile: 48,
    gridLabel: 'Sol’s notebook', legend: [['cur', 'writing now'], ['buy', 'notes it adds up'], ['stored', 'written'], ['future', 'not yet'], ['path', 'one route']],
    goal: 'How many routes from the top-left to the bottom-right?', status: ['Filling the notebook…', answer + ' routes'],
    lines: tagLines(code), code,
    rules: [['Start with an empty notebook', 'intro'], ['Top row: 1 way each', 'edge'], ['Left column: 1 way each', 'side'], ['Any other square: above + left', 'fill'], ['Read the bottom-right note', 'done']],
    complexity: [['O(m·n)', 'one quick sum per square'], ['O(m·n)', 'one note per square']],
    quest: ['A little robot stands in the top-left corner of a 4 by 4 floor. Its battery only lets it roll right or down, one square at a time.', 'Sol wants to know how many different routes lead to the bottom-right corner, without walking every one of them.'],
    example: ['m = 4, n = 4', 'answer = 20'],
    hints: ['Old Hoot: “Look at the last move of any route into a square. Where could the robot have been just before?”', '“It was either just above or just to the left. Every route comes through one of those two.”', '“Fill the edges with 1s. Then each square = the note above + the note on the left. Read the corner.”'],
    clues: ['moves only right or down', 'count the routes', 'small answers build bigger ones'],
    quizFb: ['Old Hoot: “Walking every route works here, but a 15 by 15 floor has over 40 million routes.”', 'Old Hoot: “There is no best move here. We need to count all routes, not pick one.”', 'Old Hoot: “Two friends from both ends need a row to squeeze. A floor of routes has nothing to squeeze.”', 'Old Hoot: “Yes! Each square only needs the notes above and to its left. Write them down and add.”'],
    steps
  };
}

// Notes on the Staircase — Climbing Stairs
function staircaseScene() {
  const n = 6;
  const ways = Array(n + 1).fill(0);
  const shown = Array(n + 1).fill('');
  const steps = [];
  const row = () => [shown.slice()];
  steps.push({ kind: 'intro', vals: row(), i: '—', a: '—', b: '—', at: -1, from: [], actorAt: [0, 0],
    dialog: [say('hoot', 'Six stairs up to the attic. You can climb one stair or two stairs at a time.'), say('sol', 'How many different ways to reach the top? I’ll note the answer for each stair, from the bottom up.')],
    nar: { kid: 'Sol makes one note per stair. Each note says how many ways there are to reach that stair.', builder: 'ways[i] = number of ways to reach stair i. Stairs 0 to 6, so the list has 7 slots. The answer is ways[6].', expert: 'A 1D DP: each state depends only on the two states before it.' } });
  ways[0] = 1; ways[1] = 1; shown[0] = 1; shown[1] = 1;
  steps.push({ kind: 'base', vals: row(), i: '0, 1', a: '—', b: '—', at: 1, from: [], actorAt: [0, 1],
    dialog: [say('sol', 'Standing at the bottom counts as 1 way. Stair 1 can only be reached one way: one small step.'), say('hoot', 'Two notes to start with.')],
    nar: { kid: 'At the bottom (stair 0) there is 1 way: you are already there. Stair 1 has only 1 way: one small step.', builder: 'ways[0] = 1 and ways[1] = 1.', expert: 'Base cases. ways[0] = 1 counts the empty climb, which makes the sum rule work for stair 2.' } });
  for (let i = 2; i <= n; i++) {
    ways[i] = ways[i - 1] + ways[i - 2]; shown[i] = ways[i];
    steps.push({ kind: 'fill', vals: row(), i, a: ways[i - 1], b: ways[i - 2], at: i, from: [i - 1, i - 2], actorAt: [0, i],
      dialog: [say('sol', 'To land on stair ' + i + ', your last move was one stair from ' + (i - 1) + ', or two stairs from ' + (i - 2) + '.'), say('hoot', ways[i - 1] + ' + ' + ways[i - 2] + ' = ' + ways[i] + ' ways.')],
      nar: { kid: 'You reach stair ' + i + ' from stair ' + (i - 1) + ' or from stair ' + (i - 2) + '. Add their notes: ' + ways[i - 1] + ' + ' + ways[i - 2] + ' = ' + ways[i] + '.', builder: 'ways[' + i + '] = ways[' + (i - 1) + '] + ways[' + (i - 2) + '] = ' + ways[i - 1] + ' + ' + ways[i - 2] + ' = ' + ways[i] + '.', expert: 'The last move splits all climbs into two groups that never overlap, so adding them counts each climb once.' } });
  }
  steps.push({ kind: 'done', vals: row(), i: n, a: ways[n - 1], b: ways[n - 2], at: n, from: [], actorAt: [0, n], done: true,
    dialog: [say('sol', 'The note on stair 6 says ' + ways[n] + '.'), say('hoot', 'That is ' + ways[n] + ' different ways up, and you only did 5 additions.')],
    nar: { kid: 'Stair 6 says ' + ways[n] + '. There are ' + ways[n] + ' different ways to climb to the attic!', builder: 'return ways[6] = ' + ways[n] + '.', expert: 'O(n) time. Only the last two notes are ever read, so two variables would give O(1) space. (These are the Fibonacci numbers.)' } });
  const T = { intro: ['Empty notes', 'plain'], base: ['Bottom and stair 1 → 1 way', 'cool'], fill: ['One back + two back', 'warn'], done: [ways[n] + ' ways up!', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.cells = [st.vals[0].map((v, c) => {
      if (st.done) return c === n ? 'ok' : 'stored';
      if (st.kind === 'base' && c <= 1) return 'cur';
      if (c === st.at) return 'cur';
      if (st.from.includes(c)) return 'buy';
      return v === '' ? 'future' : 'stored';
    })];
    const k = st.vals[0].filter((v) => v !== '').length;
    st.meter = { text: 'stairs noted: ' + k + ' / ' + (n + 1), pct: (k / (n + 1)) * 100, mark: 100, markLabel: 'top stair' };
    st.watch = [['i', st.i, 'left'], ['ways[i-1]', st.a, 'right'], ['ways[i-2]', st.b, 'right'], ['ways[i]', st.kind === 'fill' || st.done ? st.vals[0][st.at] : '—', 'left'], ['n', n, 'text'], ['answer', st.done ? ways[n] : '…', st.done ? 'ok' : 'text']];
    delete st.i; delete st.a; delete st.b; delete st.at; delete st.from;
  });
  const code = {
    py: [['def climbStairs(n):', ''], ['    ways = [0] * (n + 1)', '', 'intro'], ['    ways[0] = ways[1] = 1', '', 'base'], ['    for i in range(2, n + 1):', ''], ['        ways[i] = ways[i - 1] + ways[i - 2]', '', 'fill'], ['    return ways[n]', '', 'done']],
    java: [['int climbStairs(int n) {', ''], ['    int[] ways = new int[n + 1];', '', 'intro'], ['    ways[0] = ways[1] = 1;', '', 'base'], ['    for (int i = 2; i <= n; i++)', ''], ['        ways[i] = ways[i - 1] + ways[i - 2];', '', 'fill'], ['    return ways[n];', '', 'done'], ['}', '']],
    cpp: [['int climbStairs(int n) {', ''], ['    vector<int> ways(n + 1, 0);', '', 'intro'], ['    ways[0] = ways[1] = 1;', '', 'base'], ['    for (int i = 2; i <= n; i++)', ''], ['        ways[i] = ways[i - 1] + ways[i - 2];', '', 'fill'], ['    return ways[n];', '', 'done'], ['}', '']],
    js: [['function climbStairs(n) {', ''], ['  const ways = Array(n + 1).fill(0);', '', 'intro'], ['  ways[0] = ways[1] = 1;', '', 'base'], ['  for (let i = 2; i <= n; i++)', ''], ['    ways[i] = ways[i - 1] + ways[i - 2];', '', 'fill'], ['  return ways[n];', '', 'done'], ['}', '']],
    go: [['func climbStairs(n int) int {', ''], ['    ways := make([]int, n+1)', '', 'intro'], ['    ways[0], ways[1] = 1, 1', '', 'base'], ['    for i := 2; i <= n; i++ {', ''], ['        ways[i] = ways[i-1] + ways[i-2]', '', 'fill'], ['    }', ''], ['    return ways[n]', '', 'done'], ['}', '']]
  };
  return {
    id: 'climbing-stairs', pattern: 'Dynamic Programming', cast: 'sol', short: 'Stairs', visual: 'grid', items: [shown.map(() => '')], rowHeads: ['ways'], width: 420, maxTile: 54,
    gridLabel: 'Notes for stairs 0 to 6', legend: [['cur', 'writing now'], ['buy', 'notes it adds up'], ['stored', 'written'], ['future', 'not yet']],
    goal: 'How many ways to climb 6 stairs, 1 or 2 at a time?', status: ['Climbing…', ways[n] + ' ways'],
    lines: tagLines(code), code,
    rules: [['Make one blank note per stair', 'intro'], ['Bottom and stair 1: 1 way each', 'base'], ['Any other stair: one back + two back', 'fill'], ['Read the top stair’s note', 'done']],
    complexity: [['O(n)', 'one addition per stair'], ['O(n)', 'one note per stair (two would do)']],
    quest: ['Six creaky stairs lead up to the attic. You can take one stair or skip ahead two, as you like.', 'Sol wants to know how many different ways there are to get to the top.'],
    example: ['n = 6', 'answer = 13'],
    hints: ['Old Hoot: “Think about your very last move onto the top stair. What could it have been?”', '“It was a 1-stair move from stair 5 or a 2-stair move from stair 4. So the top needs the notes for 5 and 4.”', '“ways[i] = ways[i − 1] + ways[i − 2], starting from ways[0] = ways[1] = 1. Fill upward.”'],
    clues: ['1 or 2 stairs per move', 'count every way', 'each stair builds on the two below'],
    quizFb: ['Old Hoot: “Listing every climb works for 6 stairs. For 45 stairs there are over a billion.”', 'Old Hoot: “Always taking two stairs finds one climb, but we need to count all of them.”', 'Old Hoot: “There is no pair to squeeze toward here. Each stair depends on the stairs just below it.”', 'Old Hoot: “Yes! Each stair adds the two notes below it. Write them down once, never redo them.”'],
    steps
  };
}

// The Careful Night Walk — House Robber
function nightWalkScene() {
  const loot = [2, 7, 9, 3, 1, 5];
  const n = loot.length;
  const best = Array(n).fill('');
  const steps = [];
  const grid = () => [loot.slice(), best.slice()];
  steps.push({ kind: 'intro', vals: grid(), i: '—', take: '—', skip: '—', at: -1, from: [], actorAt: [0, 0],
    dialog: [say('hoot', 'Six houses left a treat bag on the step. Neighbours share a doorbell: take from two side by side and it rings.'), say('sol', 'Top row is what each house left. In the row below, I’ll note the most I can carry home by each house.')],
    nar: { kid: 'Sol walks down the street. Under each house he notes the most treats he could have by then, never taking from two houses side by side.', builder: 'best[i] = the most you can collect from houses 0..i with no two neighbours. The answer is best[5].', expert: 'A 1D DP over prefixes. The no-neighbours rule means best[i] only depends on best[i−1] and best[i−2].' } });
  best[0] = loot[0];
  steps.push({ kind: 'first', vals: grid(), i: 0, take: loot[0], skip: 0, at: 0, from: [], actorAt: [1, 0],
    dialog: [say('sol', 'Only one house so far. Take its ' + loot[0] + '.'), say('hoot', 'Nothing to lose yet.')],
    nar: { kid: 'With only the first house, the best plan is to take its ' + loot[0] + ' treats.', builder: 'best[0] = loot[0] = ' + loot[0] + '.', expert: 'Base case: a one-house street.' } });
  for (let i = 1; i < n; i++) {
    const take = loot[i] + (i > 1 ? best[i - 2] : 0), skip = best[i - 1];
    const took = take > skip;
    best[i] = took ? take : skip;
    const back2 = i > 1 ? best[i - 2] : 0;
    steps.push({ kind: took ? 'take' : 'skip', vals: grid(), i, take, skip, at: i, from: took ? (i > 1 ? [i - 2] : []) : [i - 1], actorAt: [1, i],
      dialog: took
        ? [say('sol', 'House ' + i + ' left ' + loot[i] + '. Take it, plus my note from two houses back: ' + loot[i] + ' + ' + back2 + ' = ' + take + '.'), say('hoot', 'Skipping would only keep ' + skip + '. Take it.')]
        : [say('sol', 'House ' + i + ' left ' + loot[i] + '. Taking it gives ' + loot[i] + ' + ' + back2 + ' = ' + take + '.'), say('hoot', 'But skipping keeps ' + skip + ', which is more. Walk past it.')],
      nar: took
        ? { kid: 'Take this house (' + loot[i] + ') plus the best from two houses back (' + back2 + ') = ' + take + '. That beats ' + skip + ', so Sol writes ' + take + '.', builder: 'take = loot[' + i + '] + best[' + (i - 2) + '] = ' + take + ', skip = best[' + (i - 1) + '] = ' + skip + '. best[' + i + '] = ' + take + '.', expert: 'Taking house i forbids house i−1, so it pairs with the best plan ending by i−2. max(take, skip) covers both cases.' }
        : { kid: 'Taking this house only gives ' + take + '. Skipping it keeps ' + skip + '. Sol skips and writes ' + skip + '.', builder: 'take = ' + take + ' < skip = ' + skip + ' → best[' + i + '] = best[' + (i - 1) + '] = ' + skip + '.', expert: 'A skip copies the previous note forward. The table never goes down from left to right.' } });
  }
  const answer = best[n - 1];
  steps.push({ kind: 'done', vals: grid(), i: n - 1, take: '—', skip: '—', at: n - 1, from: [], actorAt: [1, n - 1], done: true,
    dialog: [say('sol', 'The last note says ' + answer + '.'), say('hoot', 'That is 2 + 9 + 5, and no two of those houses are neighbours.')],
    nar: { kid: 'The last note says ' + answer + '. That is the most Sol can carry home without ringing a bell.', builder: 'return best[5] = ' + answer + '.', expert: 'O(n) time. Only two earlier notes are read, so two variables would give O(1) space.' } });
  const T = { intro: ['Empty notes', 'plain'], first: ['One house → take it', 'cool'], take: ['Take it + two back', 'warn'], skip: ['Skip it → copy the last note', 'cool'], done: ['Most treats: ' + answer, 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.cells = [
      loot.map((_, c) => (c === st.at && !st.done ? 'cur' : 'in')),
      st.vals[1].map((v, c) => {
        if (st.done) return c === n - 1 ? 'ok' : 'stored';
        if (c === st.at) return 'cur';
        if (st.from.includes(c)) return 'buy';
        return v === '' ? 'future' : 'stored';
      })
    ];
    const k = st.vals[1].filter((v) => v !== '').length;
    st.meter = { text: 'houses noted: ' + k + ' / ' + n, pct: (k / n) * 100, mark: 100, markLabel: 'end of the street' };
    st.watch = [['i', st.i, 'left'], ['loot[i]', st.at >= 0 ? loot[st.at] : '—', 'left'], ['take', st.take, 'right'], ['skip', st.skip, 'right'], ['best[i]', st.at >= 0 ? st.vals[1][st.at] : '—', 'text'], ['answer', st.done ? answer : '…', st.done ? 'ok' : 'text']];
    delete st.i; delete st.take; delete st.skip; delete st.at; delete st.from;
  });
  const code = {
    py: [['def rob(loot):', ''], ['    best = [0] * len(loot)', '', 'intro'], ['    best[0] = loot[0]', '', 'first'], ['    for i in range(1, len(loot)):', ''], ['        take = loot[i] + (best[i-2] if i > 1 else 0)', ''], ['        skip = best[i - 1]', ''], ['        if take > skip:', ''], ['            best[i] = take', '  # take it', 'take'], ['        else:', ''], ['            best[i] = skip', '  # walk past', 'skip'], ['    return best[-1]', '', 'done']],
    java: [['int rob(int[] loot) {', ''], ['    int[] best = new int[loot.length];', '', 'intro'], ['    best[0] = loot[0];', '', 'first'], ['    for (int i = 1; i < loot.length; i++) {', ''], ['        int take = loot[i] + (i > 1 ? best[i-2] : 0);', ''], ['        int skip = best[i - 1];', ''], ['        if (take > skip)', ''], ['            best[i] = take;', '  // take it', 'take'], ['        else', ''], ['            best[i] = skip;', '  // walk past', 'skip'], ['    }', ''], ['    return best[loot.length - 1];', '', 'done'], ['}', '']],
    cpp: [['int rob(vector<int>& loot) {', ''], ['    vector<int> best(loot.size(), 0);', '', 'intro'], ['    best[0] = loot[0];', '', 'first'], ['    for (int i = 1; i < loot.size(); i++) {', ''], ['        int take = loot[i] + (i > 1 ? best[i-2] : 0);', ''], ['        int skip = best[i - 1];', ''], ['        if (take > skip)', ''], ['            best[i] = take;', '  // take it', 'take'], ['        else', ''], ['            best[i] = skip;', '  // walk past', 'skip'], ['    }', ''], ['    return best.back();', '', 'done'], ['}', '']],
    js: [['function rob(loot) {', ''], ['  const best = Array(loot.length).fill(0);', '', 'intro'], ['  best[0] = loot[0];', '', 'first'], ['  for (let i = 1; i < loot.length; i++) {', ''], ['    const take = loot[i] + (i > 1 ? best[i-2] : 0);', ''], ['    const skip = best[i - 1];', ''], ['    if (take > skip)', ''], ['      best[i] = take;', '  // take it', 'take'], ['    else', ''], ['      best[i] = skip;', '  // walk past', 'skip'], ['  }', ''], ['  return best[loot.length - 1];', '', 'done'], ['}', '']],
    go: [['func rob(loot []int) int {', ''], ['    best := make([]int, len(loot))', '', 'intro'], ['    best[0] = loot[0]', '', 'first'], ['    for i := 1; i < len(loot); i++ {', ''], ['        take, skip := loot[i], best[i-1]', ''], ['        if i > 1 {', ''], ['            take += best[i-2]', ''], ['        }', ''], ['        if take > skip {', ''], ['            best[i] = take', '  // take it', 'take'], ['        } else {', ''], ['            best[i] = skip', '  // walk past', 'skip'], ['        }', ''], ['    }', ''], ['    return best[len(loot)-1]', '', 'done'], ['}', '']]
  };
  return {
    id: 'house-robber', pattern: 'Dynamic Programming', cast: 'sol', short: 'Street', visual: 'grid', items: [loot.slice(), loot.map(() => '')], rowHeads: ['loot', 'best'], width: 420, maxTile: 54,
    gridLabel: 'Six houses: treats left, and Sol’s best so far', legend: [['cur', 'this house'], ['buy', 'note it builds on'], ['stored', 'written'], ['future', 'not yet']],
    goal: 'Most treats, never from two houses side by side', status: ['Walking the street…', answer + ' treats'],
    lines: tagLines(code), code,
    rules: [['Make one blank note per house', 'intro'], ['First house: take it', 'first'], ['This house + two back beats the last note → take', 'take'], ['Otherwise skip and copy the last note', 'skip'], ['Read the last note', 'done']],
    complexity: [['O(n)', 'one choice per house'], ['O(n)', 'one note per house (two would do)']],
    quest: ['On treat night, six houses on Lantern Lane leave bags on their steps: 2, 7, 9, 3, 1 and 5 treats. Next-door neighbours share one doorbell. Take from two side by side and it rings.', 'Sol walks the street once. What is the most he can carry home without the bell ringing?'],
    example: ['loot = [2, 7, 9, 3, 1, 5]', 'answer = 16   (2 + 9 + 5)'],
    hints: ['Old Hoot: “At each house you have two choices. What are they, and what does each one cost you?”', '“Take this house and you can’t have taken the one before. Skip it and you keep whatever you had.”', '“best[i] = max(loot[i] + best[i − 2], best[i − 1]). Walk left to right.”'],
    clues: ['no two neighbours', 'take or skip at each house', 'the best so far builds on earlier bests'],
    quizFb: ['Old Hoot: “Trying every take-or-skip mix is 2 choices per house. For 100 houses that is far too many.”', 'Old Hoot: “Grabbing the biggest bag first takes 9, then 5, then 2 here, which happens to work. Try [3, 4, 3]: grab 4, and you miss 3 + 3 = 6.”', 'Old Hoot: “Two friends from both ends compare far-apart houses. The rule here is about next-door neighbours.”', 'Old Hoot: “Yes! At each house, compare taking it (plus the note two back) with skipping it. Write the better one down.”'],
    steps
  };
}

// The Exact Change Counter — Coin Change
function changeScene() {
  const coins = [1, 3, 4], amount = 6;
  const INF = Infinity;
  const best = [0].concat(Array(amount).fill(INF));
  const show = (v) => (v === INF ? '∞' : v);
  const row = () => [best.map(show)];
  const steps = [];
  steps.push({ kind: 'intro', vals: row(), a: '—', tries: '—', win: '—', at: 0, from: [], actorAt: [0, 0],
    dialog: [say('hoot', 'Coins of 1, 3 and 4. A customer needs exactly 6 in change, using as few coins as possible.'), say('sol', 'I’ll write the fewest coins for every amount from 0 to 6. Making 0 takes no coins.'), say('hoot', 'And the rest?'), say('sol', 'Unknown for now. I mark them ∞, meaning “no way found yet”.')],
    nar: { kid: 'Sol writes one note for each amount from 0 to 6. Each note will say the fewest coins that make that amount. Zero needs zero coins.', builder: 'best[a] = fewest coins that add up to a. best[0] = 0; every other amount starts at infinity.', expert: 'Unbounded-coin DP: each coin may be used again and again. ∞ marks “no way found yet”. In Java, C++ and Go, amount + 1 plays ∞, since no answer needs more coins than the amount.' } });
  for (let a = 1; a <= amount; a++) {
    const tries = [];
    for (const c of coins) {
      if (c <= a) {
        const v = best[a - c] + 1;
        tries.push([c, v]);
        if (v < best[a]) best[a] = v;
      }
    }
    const win = tries.find(([, v]) => v === best[a]);
    const tryText = tries.map(([c, v]) => 'a ' + c + ' leaves ' + (a - c) + ' → ' + v).join('; ');
    steps.push({ kind: 'fill', vals: row(), a, tries: tries.map(([c, v]) => c + ':' + v).join(' '), win: win[0], at: a, from: [a - win[0]], actorAt: [0, a],
      dialog: [say('sol', 'To make ' + a + ', I try each coin that fits: ' + tryText + '.'), say('hoot', 'Fewest is ' + best[a] + (best[a] === 1 ? ' coin' : ' coins') + ', using a ' + win[0] + ' first.')],
      nar: { kid: 'To make ' + a + ', Sol tries each coin and looks up what is left in his notes. Using a ' + win[0] + ' is best: ' + (a - win[0]) + ' takes ' + best[a - win[0]] + ', plus this coin = ' + best[a] + '.', builder: 'best[' + a + '] = min over coins c ≤ ' + a + ' of best[' + a + ' − c] + 1 = ' + best[a] + ' (coin ' + win[0] + ').', expert: a === amount ? 'Greedy (biggest coin first) would pay 4 + 1 + 1 = 3 coins. The table finds 3 + 3 = 2, because it checks every last coin.' : 'Each amount checks ' + coins.length + ' coins at most: O(amount × coins) in total.' } });
  }
  const answer = best[amount] === INF ? -1 : best[amount];
  steps.push({ kind: 'done', vals: row(), a: amount, tries: '—', win: '—', at: amount, from: [], actorAt: [0, amount], done: true,
    dialog: [say('sol', 'The note for 6 says ' + answer + '.'), say('hoot', 'Two coins: 3 + 3. The biggest-coin-first trick would have used three.')],
    nar: { kid: 'Making 6 takes just ' + answer + ' coins: a 3 and another 3.', builder: 'best[6] = ' + answer + ' is not ∞ → return ' + answer + '. (If it were still ∞, return -1.)', expert: 'O(amount · k) time for k coins, O(amount) space.' } });
  const T = { intro: ['0 needs no coins', 'plain'], fill: ['Try each coin, keep the fewest', 'warn'], done: ['Fewest coins: ' + answer, 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.cells = [st.vals[0].map((v, c) => {
      if (st.done) return c === amount ? 'ok' : 'stored';
      if (st.kind === 'fill' && c === st.at) return 'cur';
      if (st.from.includes(c)) return 'buy';
      return v === '∞' ? 'future' : 'stored';
    })];
    const k = st.vals[0].filter((v) => v !== '∞').length;
    st.meter = { text: 'amounts solved: ' + k + ' / ' + (amount + 1), pct: (k / (amount + 1)) * 100, mark: 100, markLabel: 'amount 6' };
    st.watch = [['a', st.a, 'left'], ['coin used', st.win, 'right'], ['best[a - coin]', st.kind === 'fill' ? st.vals[0][st.at - st.win] : '—', 'right'], ['best[a]', st.kind === 'intro' ? '—' : st.vals[0][st.at], 'left'], ['tries', st.tries, 'text'], ['answer', st.done ? answer : '…', st.done ? 'ok' : 'text']];
    delete st.a; delete st.tries; delete st.win; delete st.at; delete st.from;
  });
  const code = {
    py: [['def coinChange(coins, amount):', ''], ['    inf = float("inf")', ''], ['    best = [0] + [inf] * amount', '', 'intro'], ['    for a in range(1, amount + 1):', ''], ['        for c in coins:', ''], ['            if c <= a:', ''], ['                best[a] = min(best[a], best[a-c] + 1)', '', 'fill'], ['    ans = best[amount]', ''], ['    return ans if ans < inf else -1', '', 'done']],
    java: [['int coinChange(int[] coins, int amount) {', ''], ['    int[] best = new int[amount + 1];', ''], ['    Arrays.fill(best, amount + 1);', '  // plays ∞'], ['    best[0] = 0;', '', 'intro'], ['    for (int a = 1; a <= amount; a++)', ''], ['        for (int c : coins)', ''], ['            if (c <= a && best[a-c] + 1 < best[a])', ''], ['                best[a] = best[a-c] + 1;', '', 'fill'], ['    return best[amount] > amount ? -1 : best[amount];', '', 'done'], ['}', '']],
    cpp: [['int coinChange(vector<int>& coins, int amount) {', ''], ['    vector<int> best(amount + 1, amount + 1);', ''], ['    best[0] = 0;', '', 'intro'], ['    for (int a = 1; a <= amount; a++)', ''], ['        for (int c : coins)', ''], ['            if (c <= a && best[a-c] + 1 < best[a])', ''], ['                best[a] = best[a-c] + 1;', '', 'fill'], ['    return best[amount] > amount ? -1 : best[amount];', '', 'done'], ['}', '']],
    js: [['function coinChange(coins, amount) {', ''], ['  const best = Array(amount + 1).fill(Infinity);', ''], ['  best[0] = 0;', '', 'intro'], ['  for (let a = 1; a <= amount; a++)', ''], ['    for (const c of coins)', ''], ['      if (c <= a)', ''], ['        best[a] = Math.min(best[a], best[a-c] + 1);', '', 'fill'], ['  const ans = best[amount];', ''], ['  return ans === Infinity ? -1 : ans;', '', 'done'], ['}', '']],
    go: [['func coinChange(coins []int, amount int) int {', ''], ['    best := make([]int, amount+1)', ''], ['    for a := 1; a <= amount; a++ {', ''], ['        best[a] = amount + 1', '  // plays ∞', 'intro'], ['    }', ''], ['    for a := 1; a <= amount; a++ {', ''], ['        for _, c := range coins {', ''], ['            if c <= a && best[a-c]+1 < best[a] {', ''], ['                best[a] = best[a-c] + 1', '', 'fill'], ['            }', ''], ['        }', ''], ['    }', ''], ['    if best[amount] > amount {', ''], ['        return -1', ''], ['    }', ''], ['    return best[amount]', '', 'done'], ['}', '']]
  };
  return {
    id: 'coin-change', pattern: 'Dynamic Programming', cast: 'sol', short: 'Change', visual: 'grid', items: [best.map(() => '')], rowHeads: ['fewest'], width: 420, maxTile: 54,
    gridLabel: 'Fewest coins for amounts 0 to 6', legend: [['cur', 'amount being solved'], ['buy', 'note it builds on'], ['stored', 'solved'], ['future', '∞: not solved yet']],
    goal: 'Make exactly 6 with the fewest coins (1, 3 and 4)', status: ['Counting change…', answer + ' coins'],
    lines: tagLines(code), code,
    rules: [['0 takes no coins; the rest start at ∞', 'intro'], ['For each amount, try every coin and keep the fewest', 'fill'], ['Read the note for the full amount', 'done']],
    complexity: [['O(amount · k)', 'each amount tries all k coins'], ['O(amount)', 'one note per amount']],
    quest: ['The corner shop has only three kinds of coin: 1, 3 and 4. A customer is owed exactly 6.', 'Sol wants to hand over the fewest coins possible. Grabbing the biggest coin first looks smart. Is it?'],
    example: ['coins = [1, 3, 4]   amount = 6', 'answer = 2   (3 + 3)'],
    hints: ['Old Hoot: “Grab a 4 first and you need 4 + 1 + 1. Is that really the fewest?”', '“Whatever coin you hand over last, the rest is a smaller amount. Have you solved that smaller amount already?”', '“best[a] = min over coins c of best[a − c] + 1. Fill amounts from 1 up to 6.”'],
    clues: ['fewest coins', 'any coin can be used many times', 'biggest-first can be wrong'],
    quizFb: ['Old Hoot: “Trying every mix of coins explodes quickly. 100 in coins of 1, 3 and 4 has thousands of mixes.”', 'Old Hoot: “Biggest first gives 4 + 1 + 1 = 3 coins. But 3 + 3 is only 2. Greedy fails here.”', 'Old Hoot: “Two friends could find a pair, but change can need any number of coins.”', 'Old Hoot: “Yes! Solve every smaller amount first. Each new amount just tries each coin and looks up the rest.”'],
    steps
  };
}

SCENE_REGISTRY.push(gridWalkerScene, staircaseScene, nightWalkScene, changeScene);
PATTERN_KITS['Dynamic Programming'] = { right: 3, spot: 'Why notes, not every path?', ask: 'How should Sol work it out?',
  quiz: [['Try every possibility', 'List every route or mix, one by one'], ['Take the best-looking move', 'Grab the biggest step each time'], ['Two friends from both ends', 'One at each end, walking inward'], ['Write small answers down', 'Solve smaller versions first and reuse the notes']] };
STORY_CAST.sol = { name: 'Sol', initial: 'S', color: 'right', radius: '8px' };

// ---------- Your own input (see practice.js) ----------
function gridWalkerRun(input) {
  const [m, n] = (input || SCENE_INPUT['unique-paths'].default).size;
  const ways = [...Array(m)].map(() => Array(n).fill(0));
  const shown = [...Array(m)].map(() => Array(n).fill(''));
  const snap = () => shown.map((row) => row.slice());
  const total = m * n, steps = [];
  let written = 0;
  steps.push(runStep('intro', { vals: snap(), at: null, from: [], written, r: '—', c: '—', up: '—', left: '—', actorAt: [0, 0] }, [say('hoot', 'A ' + m + ' by ' + n + ' floor. The robot moves only right or down.'), say('sol', 'I’ll write the number of routes into every square.')],
    'Sol writes, in each square, how many ways the robot can reach it.', 'ways[r][c] = routes from the top-left to (r, c). The answer is ways[' + (m - 1) + '][' + (n - 1) + '].', 'Every route into a square comes from above or from the left.'));
  for (let c = 0; c < n; c++) { ways[0][c] = 1; shown[0][c] = 1; written++; }
  steps.push(runStep('edge', { vals: snap(), at: null, from: [], written, r: 0, c: '0..' + (n - 1), up: '—', left: '—', actorAt: [0, n - 1] }, [say('sol', 'The top row: the robot can only keep going right.'), say('hoot', 'So 1 way into each.')],
    'Any square in the top row has just 1 way in: keep going right.', 'ways[0][c] = 1 for every c.', 'Base case: one straight route.'));
  for (let r = 0; r < m; r++) { if (!shown[r][0]) written++; ways[r][0] = 1; shown[r][0] = 1; }
  steps.push(runStep('side', { vals: snap(), at: null, from: [], written, r: '0..' + (m - 1), c: 0, up: '—', left: '—', actorAt: [m - 1, 0] }, [say('sol', 'The left column: the robot can only keep going down.'), say('hoot', '1 way into each of those too.')],
    'Any square in the left column has just 1 way in: keep going down.', 'ways[r][0] = 1 for every r.', 'Second base case: the first column.'));
  for (let r = 1; r < m; r++) for (let c = 1; c < n; c++) {
    const up = ways[r - 1][c], left = ways[r][c - 1];
    ways[r][c] = up + left; shown[r][c] = ways[r][c]; written++;
    steps.push(runStep('fill', { vals: snap(), at: [r, c], from: [[r - 1, c], [r, c - 1]], written, r, c, up, left, actorAt: [r, c] }, [say('sol', 'From above: ' + up + '. From the left: ' + left + '.'), say('hoot', up + ' + ' + left + ' = ' + ways[r][c] + '.')],
      'The robot arrives from above or from the left. Sol adds their notes: ' + up + ' + ' + left + ' = ' + ways[r][c] + '.', 'ways[' + r + '][' + c + '] = ' + up + ' + ' + left + ' = ' + ways[r][c] + '.', 'Both notes were written earlier, so each square takes one addition.'));
  }
  const answer = ways[m - 1][n - 1];
  const route = [];
  for (let c = 0; c < n; c++) route.push([0, c]);
  for (let r = 1; r < m; r++) route.push([r, n - 1]);
  steps.push(runStep('done', { vals: snap(), at: [m - 1, n - 1], from: [], written, r: m - 1, c: n - 1, up: ways[m - 2][n - 1], left: ways[m - 1][n - 2], actorAt: [m - 1, n - 1], path: route, done: true }, [say('sol', 'The bottom-right square says ' + answer + '.'), say('hoot', 'The line is one of those ' + answer + ' routes.')],
    'The last square says ' + answer + '. There are ' + answer + ' different routes.', 'return ways[' + (m - 1) + '][' + (n - 1) + '] = ' + answer + '.', 'One addition per square: O(m·n) time.'));
  runFinish(steps, { intro: ['Empty notebook', 'plain'], edge: ['Top row → 1 way each', 'cool'], side: ['Left column → 1 way each', 'cool'], fill: ['Above + left', 'warn'], done: [answer + ' routes', 'ok'] }, (st) => {
    const from = new Set(st.from.map(([r, c]) => r + ',' + c));
    st.cells = st.vals.map((row, r) => row.map((v, c) => {
      if (st.done) return r === m - 1 && c === n - 1 ? 'ok' : 'stored';
      if (st.at && st.at[0] === r && st.at[1] === c) return 'cur';
      if (from.has(r + ',' + c)) return 'buy';
      if (st.kind === 'edge' && r === 0) return 'cur';
      if (st.kind === 'side' && c === 0 && r > 0) return 'cur';
      return v === '' ? 'future' : 'stored';
    }));
    st.meter = { text: 'notes written: ' + st.written + ' / ' + total, pct: (st.written / total) * 100, mark: 100, markLabel: 'all ' + total + ' squares' };
    st.watch = [['r', st.r, 'left'], ['c', st.c, 'left'], ['ways[r-1][c]', st.up, 'right'], ['ways[r][c-1]', st.left, 'right'], ['ways[r][c]', st.kind === 'fill' || st.done ? st.vals[st.at[0]][st.at[1]] : st.kind === 'intro' ? '—' : 1, 'text'], ['answer', st.done ? answer : '…', st.done ? 'ok' : 'text']];
    ['at', 'from', 'written', 'r', 'c', 'up', 'left'].forEach((k) => delete st[k]);
  });
  return runScene('unique-paths', {
    items: shown.map((row) => row.map(() => '')), goal: 'How many routes across a ' + m + ' by ' + n + ' floor?', status: ['Filling the notebook…', answer + ' routes'],
    example: ['m = ' + m + ', n = ' + n, 'answer = ' + answer], answer, input: { size: [m, n] }
  }, steps);
}
SCENE_INPUT['unique-paths'] = {
  hint: 'rows and columns, each from 2 to 6', example: '4, 4',
  default: { size: [4, 4] },
  presets: [['Story example', () => ({ size: [4, 4] })], ['Random', () => ({ size: [rint(2, 6), rint(2, 6)] })], ['One long row', () => ({ size: [2, 6] })], ['Largest', () => ({ size: [6, 6] })]],
  random: () => ({ size: [rint(2, 6), rint(2, 6)] }),
  parse: (t) => ({ size: parseInts(t, 2, '3, 4') }), show: (v) => v.size.join(', '),
  check: (v) => (v.size.every((x) => x >= 2 && x <= 6) ? '' : 'Use 2 to 6 rows and 2 to 6 columns, so the notebook stays readable.'),
  make: gridWalkerRun
};

function staircaseRun(input) {
  const n = (input || SCENE_INPUT['climbing-stairs'].default).n;
  const ways = Array(n + 1).fill(0), shown = Array(n + 1).fill(''), steps = [];
  const row = () => [shown.slice()];
  steps.push(runStep('intro', { vals: row(), i: '—', a: '—', b: '—', at: -1, from: [], actorAt: [0, 0] }, [say('hoot', n + ' stairs. Climb one or two at a time.'), say('sol', 'I’ll note the number of ways to reach each stair.')],
    'Sol makes one note per stair: how many ways there are to reach it.', 'ways[i] = ways to reach stair i. The answer is ways[' + n + '].', 'Each stair depends only on the two below it.'));
  ways[0] = 1; ways[1] = 1; shown[0] = 1; shown[1] = 1;
  steps.push(runStep('base', { vals: row(), i: '0, 1', a: '—', b: '—', at: 1, from: [], actorAt: [0, 1] }, [say('sol', 'The bottom counts as 1 way. Stair 1 has 1 way: one small step.')],
    'Stair 0 has 1 way (you are there). Stair 1 has 1 way: one small step.', 'ways[0] = 1 and ways[1] = 1.', 'Base cases. ways[0] = 1 makes the sum work for stair 2.'));
  for (let i = 2; i <= n; i++) {
    ways[i] = ways[i - 1] + ways[i - 2]; shown[i] = ways[i];
    steps.push(runStep('fill', { vals: row(), i, a: ways[i - 1], b: ways[i - 2], at: i, from: [i - 1, i - 2], actorAt: [0, i] }, [say('sol', 'Stair ' + i + ' comes from stair ' + (i - 1) + ' or stair ' + (i - 2) + '.'), say('hoot', ways[i - 1] + ' + ' + ways[i - 2] + ' = ' + ways[i] + '.')],
      'You reach stair ' + i + ' from stair ' + (i - 1) + ' or ' + (i - 2) + '. Add their notes: ' + ways[i - 1] + ' + ' + ways[i - 2] + ' = ' + ways[i] + '.', 'ways[' + i + '] = ' + ways[i - 1] + ' + ' + ways[i - 2] + ' = ' + ways[i] + '.', 'The last move splits the climbs into two groups that never overlap.'));
  }
  steps.push(runStep('done', { vals: row(), i: n, a: ways[n - 1], b: ways[n - 2], at: n, from: [], actorAt: [0, n], done: true }, [say('sol', 'Stair ' + n + ' says ' + ways[n] + '.')],
    'Stair ' + n + ' says ' + ways[n] + '. There are ' + ways[n] + ' ways to the top.', 'return ways[' + n + '] = ' + ways[n] + '.', (n - 1) + ' additions: O(n) time.'));
  runFinish(steps, { intro: ['Empty notes', 'plain'], base: ['Bottom and stair 1 → 1 way', 'cool'], fill: ['One back + two back', 'warn'], done: [ways[n] + ' ways up', 'ok'] }, (st) => {
    st.cells = [st.vals[0].map((v, c) => (st.done ? (c === n ? 'ok' : 'stored') : st.kind === 'base' && c <= 1 ? 'cur' : c === st.at ? 'cur' : st.from.includes(c) ? 'buy' : v === '' ? 'future' : 'stored'))];
    const k = st.vals[0].filter((v) => v !== '').length;
    st.meter = { text: 'stairs noted: ' + k + ' / ' + (n + 1), pct: (k / (n + 1)) * 100, mark: 100, markLabel: 'top stair' };
    st.watch = [['i', st.i, 'left'], ['ways[i-1]', st.a, 'right'], ['ways[i-2]', st.b, 'right'], ['ways[i]', st.kind === 'fill' || st.done ? st.vals[0][st.at] : '—', 'left'], ['n', n, 'text'], ['answer', st.done ? ways[n] : '…', st.done ? 'ok' : 'text']];
    ['i', 'a', 'b', 'at', 'from'].forEach((k2) => delete st[k2]);
  });
  return runScene('climbing-stairs', {
    items: [shown.map(() => '')], gridLabel: 'Notes for stairs 0 to ' + n, goal: 'How many ways to climb ' + n + ' stairs, 1 or 2 at a time?', status: ['Climbing…', ways[n] + ' ways'],
    example: ['n = ' + n, 'answer = ' + ways[n]], answer: ways[n], input: { n }
  }, steps);
}
SCENE_INPUT['climbing-stairs'] = {
  hint: 'how many stairs, from 2 to 8', example: '6',
  default: { n: 6 },
  presets: [['Story example', () => ({ n: 6 })], ['Random', () => ({ n: rint(2, 8) })], ['Fewest', () => ({ n: 2 })], ['Most', () => ({ n: 8 })]],
  random: () => ({ n: rint(2, 8) }),
  parse: (t) => ({ n: parseInts(t, 1, '6')[0] }), show: (v) => String(v.n),
  check: (v) => (v.n >= 2 && v.n <= 8 ? '' : 'Use 2 to 8 stairs, so every note stays readable.'),
  make: staircaseRun
};

function nightWalkRun(input) {
  const loot = (input || SCENE_INPUT['house-robber'].default).nums.slice(), n = loot.length;
  const best = Array(n).fill(''), steps = [];
  const grid = () => [loot.slice(), best.slice()];
  steps.push(runStep('intro', { vals: grid(), i: '—', take: '—', skip: '—', at: -1, from: [], actorAt: [0, 0] }, [say('hoot', n + ' houses left treats. Never take from two side by side.'), say('sol', 'Under each house I note the most I could carry by then.')],
    'Sol walks the street. Under each house he notes the most treats he could have by then.', 'best[i] = most from houses 0..i with no two neighbours.', 'best[i] only needs best[i−1] and best[i−2].'));
  best[0] = loot[0];
  steps.push(runStep('first', { vals: grid(), i: 0, take: loot[0], skip: 0, at: 0, from: [], actorAt: [1, 0] }, [say('sol', 'One house so far. Take its ' + loot[0] + '.')],
    'With only the first house, take its ' + loot[0] + '.', 'best[0] = loot[0] = ' + loot[0] + '.', 'Base case: a one-house street.'));
  for (let i = 1; i < n; i++) {
    const back2 = i > 1 ? best[i - 2] : 0, take = loot[i] + back2, skip = best[i - 1], took = take > skip;
    best[i] = took ? take : skip;
    steps.push(runStep(took ? 'take' : 'skip', { vals: grid(), i, take, skip, at: i, from: took ? (i > 1 ? [i - 2] : []) : [i - 1], actorAt: [1, i] },
      took ? [say('sol', loot[i] + ' + ' + back2 + ' = ' + take + '.'), say('hoot', 'That beats ' + skip + '. Take it.')] : [say('sol', loot[i] + ' + ' + back2 + ' = ' + take + '.'), say('hoot', 'Skipping keeps ' + skip + '. Walk past.')],
      took ? 'Take this house (' + loot[i] + ') plus the best from two back (' + back2 + '): ' + take + '. That beats ' + skip + '.' : 'Taking this house gives only ' + take + '. Skipping keeps ' + skip + ', so Sol skips it.',
      'take = ' + take + ', skip = ' + skip + ' → best[' + i + '] = ' + best[i] + '.', took ? 'Taking house ' + i + ' rules out house ' + (i - 1) + '.' : 'A skip copies the last note forward.'));
  }
  const answer = best[n - 1];
  steps.push(runStep('done', { vals: grid(), i: n - 1, take: '—', skip: '—', at: n - 1, from: [], actorAt: [1, n - 1], done: true }, [say('sol', 'The last note says ' + answer + '.')],
    'The last note says ' + answer + '. That is the most Sol can carry home.', 'return best[' + (n - 1) + '] = ' + answer + '.', 'One choice per house: O(n) time.'));
  runFinish(steps, { intro: ['Empty notes', 'plain'], first: ['One house → take it', 'cool'], take: ['Take it + two back', 'warn'], skip: ['Skip it → copy the last note', 'cool'], done: ['Most treats: ' + answer, 'ok'] }, (st) => {
    st.cells = [loot.map((_, c) => (c === st.at && !st.done ? 'cur' : 'in')), st.vals[1].map((v, c) => (st.done ? (c === n - 1 ? 'ok' : 'stored') : c === st.at ? 'cur' : st.from.includes(c) ? 'buy' : v === '' ? 'future' : 'stored'))];
    const k = st.vals[1].filter((v) => v !== '').length;
    st.meter = { text: 'houses noted: ' + k + ' / ' + n, pct: (k / n) * 100, mark: 100, markLabel: 'end of the street' };
    st.watch = [['i', st.i, 'left'], ['loot[i]', st.at >= 0 ? loot[st.at] : '—', 'left'], ['take', st.take, 'right'], ['skip', st.skip, 'right'], ['best[i]', st.at >= 0 ? st.vals[1][st.at] : '—', 'text'], ['answer', st.done ? answer : '…', st.done ? 'ok' : 'text']];
    ['i', 'take', 'skip', 'at', 'from'].forEach((k2) => delete st[k2]);
  });
  return runScene('house-robber', {
    items: [loot.slice(), loot.map(() => '')], gridLabel: n + ' houses: treats left, and Sol’s best so far', status: ['Walking the street…', answer + ' treats'],
    example: ['loot = ' + showList(loot), 'answer = ' + answer], answer, input: { nums: loot }
  }, steps);
}
SCENE_INPUT['house-robber'] = {
  hint: 'treats per house, from 0 to 20', example: '2, 7, 9, 3, 1, 5',
  default: { nums: [2, 7, 9, 3, 1, 5] },
  presets: [['Story example', () => ({ nums: [2, 7, 9, 3, 1, 5] })], ['Random', () => ({ nums: rlist(rint(4, 9), 0, 20) })], ['Greedy trap', () => ({ nums: [3, 4, 3] })], ['All equal', () => ({ nums: [5, 5, 5, 5, 5] })]],
  random: () => ({ nums: rlist(rint(3, 9), 0, 20) }),
  parse: (t) => ({ nums: parseNums(t) }), show: (v) => v.nums.join(', '),
  check: (v) => checkCount(v.nums, 3, 9, 'houses') || checkRange(v.nums, 0, 20, 'Treats'),
  make: nightWalkRun
};
