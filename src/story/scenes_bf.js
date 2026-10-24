// ---------- Breadth-First Search: Rill, the ripple that spreads one ring at a time ----------
// The crate is a visual: 'grid'. One step is one minute: one full ring of the ripple.

// The Spreading Ripple — Rotting Oranges
function orangesScene() {
  const crate = [
    [2, 1, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 1, 2]
  ];
  const R = crate.length, C = crate[0].length;
  const g = crate.map((row) => row.slice());
  const when = crate.map((row) => row.map((v) => (v === 2 ? 0 : -1)));   // minute each orange went bad
  let queue = [];
  let fresh = 0;
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    if (g[r][c] === 2) queue.push([r, c]);
    if (g[r][c] === 1) fresh++;
  }
  const startFresh = fresh;
  const where = (p) => 'row ' + p[0] + ', column ' + p[1];
  const log = [];
  const steps = [];
  steps.push({ kind: 'intro', minute: 0, vals: g.map((row) => row.slice()), when: when.map((x) => x.slice()), fresh, queued: queue.length, spread: 0, board: [['min 0', queue.length + ' bad', 'fresh']],
    dialog: [say('hoot', 'A crate of oranges. A 1 is fresh, a 2 has gone bad, a 0 is an empty slot.'), say('rill', 'Each minute, a bad orange spoils the fresh ones right next to it. Up, down, left, right.'), say('hoot', 'How many minutes until none are fresh?')],
    nar: { kid: 'Two oranges are bad: one in the top-left corner and one in the bottom-right. Each minute, the bad spreads to the fresh oranges touching them, like a ripple in a pond.', builder: 'Put every bad orange in a queue and count the fresh ones (' + fresh + '). Each minute, take everyone in the queue and spoil their fresh neighbours. The new bad ones join the queue for the next minute.', expert: 'Multi-source BFS (breadth-first search: visit everything 1 step away, then 2 steps, and so on). Starting from all bad oranges at once, ring k is exactly the oranges whose nearest bad orange is k steps away.' } });
  let minute = 0;
  while (queue.length && fresh) {
    minute++;
    const next = [];
    for (const [r, c] of queue) {
      for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
        if (nr >= 0 && nr < R && nc >= 0 && nc < C && g[nr][nc] === 1) {
          g[nr][nc] = 2; fresh--; when[nr][nc] = minute; next.push([nr, nc]);
        }
      }
    }
    const from = queue.length;
    queue = next;
    log.unshift(['min ' + minute, '+' + next.length, 'fresh']);
    steps.push({ kind: 'spread', minute, vals: g.map((row) => row.slice()), when: when.map((x) => x.slice()), fresh, queued: next.length, spread: next.length, board: log.map(([k, v], i) => [k, v, i === 0 ? 'fresh' : '']),
      dialog: [say('rill', 'Minute ' + minute + '. The ' + from + ' orange' + (from === 1 ? '' : 's') + ' that went bad last time spoil their neighbours: ' + next.map(where).join('; ') + '.'), say('hoot', fresh ? fresh + ' fresh orange' + (fresh === 1 ? ' is' : 's are') + ' left.' : 'That was the last fresh orange.')],
      nar: { kid: 'Minute ' + minute + ': the ripple moves one ring out. ' + next.length + ' more orange' + (next.length === 1 ? '' : 's') + ' go bad. ' + (fresh ? fresh + ' fresh one' + (fresh === 1 ? '' : 's') + ' left.' : 'None are fresh now!'), builder: 'minutes = ' + minute + '. Pop the ' + from + ' queued orange' + (from === 1 ? '' : 's') + '; each fresh neighbour becomes 2, fresh -= 1, and joins the queue. Queue size now: ' + next.length + '.', expert: 'Level ' + minute + ' of the BFS. Each orange enters the queue once, when it first goes bad, so it is never counted twice.' } });
  }
  const answer = fresh === 0 ? minute : -1;
  steps.push({ kind: 'done', minute, vals: g.map((row) => row.slice()), when: when.map((x) => x.slice()), fresh, queued: queue.length, spread: 0, board: log.map(([k, v]) => [k, v, '']), done: true,
    dialog: [say('rill', 'No fresh oranges are left.'), say('hoot', 'It took ' + answer + ' minutes for the whole crate to go bad.')],
    nar: { kid: 'Every orange has gone bad. It took ' + answer + ' minutes, one ring of the ripple per minute.', builder: 'fresh == 0 → return minutes = ' + answer + '. (If any fresh orange could never be reached, we would return -1.)', expert: 'Each square enters the queue at most once and checks 4 neighbours: O(R·C) time, O(R·C) queue space.' } });
  const T = { intro: ['Bad oranges queued', 'plain'], spread: ['One minute → one ring spoils', 'warn'], done: [answer + ' minutes in all', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.cells = st.vals.map((row, r) => row.map((v, c) => {
      if (v === 0) return 'out';
      if (v === 1) return 'in';
      if (!st.done && st.kind === 'spread' && st.when[r][c] === st.minute) return 'hit';
      return 'dup';
    }));
    const gone = startFresh - st.fresh;
    st.meter = { text: 'fresh left: ' + st.fresh + ' / ' + startFresh, pct: (gone / startFresh) * 100, mark: 100, markLabel: 'all spoiled' };
    st.watch = [['minutes', st.minute, 'left'], ['fresh', st.fresh, 'right'], ['spoiled now', st.spread, 'left'], ['queue size', st.queued, 'right'], ['ripple ring', st.kind === 'intro' ? 'start' : 'ring ' + st.minute, 'text'], ['result', st.done ? answer : '…', st.done ? 'ok' : 'text']];
    delete st.when; delete st.minute; delete st.fresh; delete st.queued; delete st.spread;
  });
  const code = {
    py: [['def orangesRotting(grid):', ''], ['    R, C = len(grid), len(grid[0])', ''], ['    queue, fresh = [], 0', ''], ['    for r in range(R):', ''], ['        for c in range(C):', ''], ['            if grid[r][c] == 2: queue.append((r, c))', '', 'intro'], ['            if grid[r][c] == 1: fresh += 1', ''], ['    D = ((1, 0), (-1, 0), (0, 1), (0, -1))', ''], ['    minutes = 0', ''], ['    while queue and fresh:', ''], ['        minutes += 1', '  # one ring', 'spread'], ['        nxt = []', ''], ['        for r, c in queue:', ''], ['            for dy, dx in D:', ''], ['                y, x = r + dy, c + dx', ''], ['                if 0 <= y < R and 0 <= x < C \\', ''], ['                        and grid[y][x] == 1:', ''], ['                    grid[y][x] = 2', ''], ['                    fresh -= 1', ''], ['                    nxt.append((y, x))', ''], ['        queue = nxt', ''], ['    return minutes if fresh == 0 else -1', '', 'done']],
    java: [['int orangesRotting(int[][] g) {', ''], ['    int R = g.length, C = g[0].length, fresh = 0;', ''], ['    Deque<int[]> q = new ArrayDeque<>();', ''], ['    for (int r = 0; r < R; r++)', ''], ['        for (int c = 0; c < C; c++) {', ''], ['            if (g[r][c] == 2) q.add(new int[]{r, c});', '', 'intro'], ['            if (g[r][c] == 1) fresh++;', ''], ['        }', ''], ['    int[][] D = {{1,0},{-1,0},{0,1},{0,-1}};', ''], ['    int minutes = 0;', ''], ['    while (!q.isEmpty() && fresh > 0) {', ''], ['        minutes++;', '  // one ring', 'spread'], ['        for (int k = q.size(); k > 0; k--) {', ''], ['            int[] p = q.poll();', ''], ['            for (int[] d : D) {', ''], ['                int y = p[0] + d[0], x = p[1] + d[1];', ''], ['                if (y < 0 || x < 0) continue;', ''], ['                if (y >= R || x >= C) continue;', ''], ['                if (g[y][x] != 1) continue;', ''], ['                g[y][x] = 2; fresh--;', ''], ['                q.add(new int[]{y, x});', ''], ['            }', ''], ['        }', ''], ['    }', ''], ['    return fresh == 0 ? minutes : -1;', '', 'done'], ['}', '']],
    cpp: [['int orangesRotting(vector<vector<int>>& g) {', ''], ['    int R = g.size(), C = g[0].size(), fresh = 0;', ''], ['    queue<pair<int,int>> q;', ''], ['    for (int r = 0; r < R; r++)', ''], ['        for (int c = 0; c < C; c++) {', ''], ['            if (g[r][c] == 2) q.push({r, c});', '', 'intro'], ['            if (g[r][c] == 1) fresh++;', ''], ['        }', ''], ['    int D[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};', ''], ['    int minutes = 0;', ''], ['    while (!q.empty() && fresh > 0) {', ''], ['        minutes++;', '  // one ring', 'spread'], ['        for (int k = q.size(); k > 0; k--) {', ''], ['            auto [r, c] = q.front(); q.pop();', ''], ['            for (auto& d : D) {', ''], ['                int y = r + d[0], x = c + d[1];', ''], ['                if (y < 0 || x < 0) continue;', ''], ['                if (y >= R || x >= C) continue;', ''], ['                if (g[y][x] != 1) continue;', ''], ['                g[y][x] = 2; fresh--;', ''], ['                q.push({y, x});', ''], ['            }', ''], ['        }', ''], ['    }', ''], ['    return fresh == 0 ? minutes : -1;', '', 'done'], ['}', '']],
    js: [['function orangesRotting(g) {', ''], ['  const R = g.length, C = g[0].length;', ''], ['  let queue = [], fresh = 0;', ''], ['  for (let r = 0; r < R; r++)', ''], ['    for (let c = 0; c < C; c++) {', ''], ['      if (g[r][c] === 2) queue.push([r, c]);', '', 'intro'], ['      if (g[r][c] === 1) fresh++;', ''], ['    }', ''], ['  const D = [[1, 0], [-1, 0], [0, 1], [0, -1]];', ''], ['  let minutes = 0;', ''], ['  while (queue.length && fresh) {', ''], ['    minutes++;', '  // one ring', 'spread'], ['    const next = [];', ''], ['    for (const [r, c] of queue)', ''], ['      for (const [dy, dx] of D) {', ''], ['        const y = r + dy, x = c + dx;', ''], ['        if (g[y]?.[x] !== 1) continue;', ''], ['        g[y][x] = 2; fresh--;', ''], ['        next.push([y, x]);', ''], ['      }', ''], ['    queue = next;', ''], ['  }', ''], ['  return fresh === 0 ? minutes : -1;', '', 'done'], ['}', '']],
    go: [['func orangesRotting(g [][]int) int {', ''], ['    R, C, fresh := len(g), len(g[0]), 0', ''], ['    queue := [][2]int{}', ''], ['    for r := 0; r < R; r++ {', ''], ['        for c := 0; c < C; c++ {', ''], ['            switch g[r][c] {', ''], ['            case 2:', ''], ['                queue = append(queue, [2]int{r, c})', '', 'intro'], ['            case 1:', ''], ['                fresh++', ''], ['            }', ''], ['        }', ''], ['    }', ''], ['    D := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}', ''], ['    minutes := 0', ''], ['    for len(queue) > 0 && fresh > 0 {', ''], ['        minutes++', '  // one ring', 'spread'], ['        next := [][2]int{}', ''], ['        for _, p := range queue {', ''], ['            for _, d := range D {', ''], ['                y, x := p[0]+d[0], p[1]+d[1]', ''], ['                if y < 0 || x < 0 {', ''], ['                    continue', ''], ['                }', ''], ['                if y < R && x < C && g[y][x] == 1 {', ''], ['                    g[y][x] = 2', ''], ['                    fresh--', ''], ['                    next = append(next, [2]int{y, x})', ''], ['                }', ''], ['            }', ''], ['        }', ''], ['        queue = next', ''], ['    }', ''], ['    if fresh > 0 {', ''], ['        return -1', ''], ['    }', ''], ['    return minutes', '', 'done'], ['}', '']]
  };
  return {
    id: 'rotting-oranges', pattern: 'Breadth-First Search', cast: 'rill', short: 'Oranges', visual: 'grid', items: crate, width: 420, maxTile: 44,
    board: true, boardTitle: 'Ripple log',
    gridLabel: 'Orange crate', legend: [['in', 'fresh (1)'], ['hit', 'spoiled this minute'], ['dup', 'bad (2)'], ['out', 'empty slot (0)']],
    goal: 'How many minutes until no orange is fresh?', status: ['Ripple spreading…', answer + ' minutes'],
    lines: tagLines(code), code,
    rules: [['Queue every bad orange, count the fresh', 'intro'], ['Each minute, the queued ones spoil their neighbours', 'spread'], ['No fresh left → report the minutes', 'done']],
    complexity: [['O(R·C)', 'each orange joins the queue once'], ['O(R·C)', 'the queue can hold a whole ring']],
    quest: ['A crate of oranges sits in a warm shed. Two have already gone bad. Every minute, a bad orange spoils any fresh orange touching it: above, below, left or right.', 'Rill wants to know how many minutes pass before no fresh orange is left. If some fresh orange can never be reached, the answer is -1.'],
    example: ['grid = [[2,1,1,0,1],[1,1,0,1,1],[0,1,0,1,0],[1,1,1,1,0],[0,0,0,1,2]]', 'answer = ' + answer],
    hints: ['Old Hoot: “Everything that goes bad in the same minute is the same distance from a bad orange. What does that remind you of?”', '“Think of ripples. Start from all the bad oranges at once and spread one ring per minute.”', '“Queue the bad ones. Each minute, empty the queue: spoil fresh neighbours and queue them for next minute. Count the minutes.”'],
    clues: ['spreads to neighbours', 'everything spreads at the same time', 'count the minutes (rings)'],
    quizFb: ['Old Hoot: “Yes! All the bad oranges spread together, one ring per minute, and the rings count the minutes.”', 'Old Hoot: “Going deep down one path spoils oranges in the wrong order. You would get the wrong number of minutes.”', 'Old Hoot: “There are 14 fresh oranges but it only takes a few minutes. Many spoil in the same minute.”', 'Old Hoot: “The bad oranges are in two corners. Distance from one corner ignores the other one.”'],
    steps
  };
}

SCENE_REGISTRY.push(orangesScene);
PATTERN_KITS['Breadth-First Search'] = { right: 0, spot: 'Why rings, not one path?', ask: 'How should Rill count the minutes?',
  quiz: [['Ripple out, ring by ring', 'Every bad orange spreads to its neighbours at the same time'], ['Follow one path deep', 'Chase one bad orange as far as it goes, then try the next'], ['Count the fresh oranges', 'The answer is how many fresh ones there are'], ['Measure from one corner', 'Minutes = steps from the top-left square']] };
STORY_CAST.rill = { name: 'Rill', initial: 'R', color: 'right', radius: '999px' };
