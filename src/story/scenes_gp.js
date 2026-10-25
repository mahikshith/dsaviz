// ---------- Graphs: dots joined by lines (visual: 'graph') ----------
// S.graph holds hand-placed nodes in a unit box and the edges between them; each step colours nodes and edges and writes a
// short note under some nodes (see graphAt in comp.js). Course Schedule joins the ripple's ripples (Breadth-First Search),
// Clone Graph joins the explorer (Depth-First Search). Redundant Connection and Network Delay Time belong to the Graphs group,
// with the  courier who knows every road.

const many = (n, one, more) => n + ' ' + (n === 1 ? one : more || one + 's');
const listAnd = (xs) => xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1];
// [[1, 0], [2, 1]] style pairs or triples, as text: forgiving about spaces, strict about the numbers.
function parseTuples(text, k, sample) {
  const raw = String(text || '').trim();
  const bad = () => inErr('Write the list in square brackets, like ' + sample + '.');
  if (!/^\[[\s\S]*\]$/.test(raw)) throw bad();
  const inner = raw.slice(1, -1).trim();
  if (!inner) return [];
  const re = new RegExp('\\[\\s*' + Array(k).fill('(-?\\d+)').join('\\s*,\\s*') + '\\s*\\]', 'g');
  const out = [];
  let m, rest = inner;
  while ((m = re.exec(inner))) out.push(m.slice(1, k + 1).map(Number));
  rest = inner.replace(re, '').replace(/[\s,]/g, '');
  if (rest || !out.length) throw bad();
  return out;
}
const showTuples = (list) => '[' + list.map((p) => '[' + p.join(', ') + ']').join(', ') + ']';

// ---------- The Prerequisite Map — Course Schedule (Kahn's order, the ripple) ----------
const COURSE_POS = { 0: [0, 0], 1: [0, 1], 2: [0.36, 0], 3: [0.36, 1], 4: [0.68, 0.5], 5: [1, 0.5] };
function courseBuild(v) {
  const n = v.n, pre = v.pre;
  const hand = n === 6 && JSON.stringify(pre) === JSON.stringify(SCENE_INPUT['course-schedule'].default.pre);
  const ids = Array.from({ length: n }, (_, i) => String(i));
  const nodes = hand ? ids.map((id) => ({ id, label: id, x: COURSE_POS[id][0], y: COURSE_POS[id][1] })) : ringGraph(ids);
  const edges = pre.map(([a, b]) => ({ from: String(b), to: String(a), directed: true }));
  const needs = Array(n).fill(0), unlocks = Array.from({ length: n }, () => []);
  pre.forEach(([a, b]) => { unlocks[b].push(a); needs[a]++; });
  const look = Array(n).fill('in'), used = {}, line = [], steps = [];
  let taken = 0, cur = null, nxt = null, active = null;
  const snap = (extra) => {
    const st = { nodes: {}, edges: Object.assign({}, used), vals: {}, line: line.slice(), taken, cur, nxt, needNow: nxt == null ? '—' : needs[nxt] };
    ids.forEach((id, i) => { st.nodes[id] = look[i]; if (look[i] !== 'ok') st.vals[id] = 'needs ' + needs[i]; });
    if (active) st.edges[active] = 'active';
    if (cur != null) st.actorAt = String(cur);
    return Object.assign(st, extra);
  };
  const free0 = ids.filter((_, i) => needs[i] === 0);
  steps.push(runStep('intro', snap(), [say('narr', 'The ripple wants to take all ' + n + ' classes. An arrow means “take this one first”.'), say('ripple', 'I’ll write under each class how many classes it still waits for.')],
    'The ripple plans her classes. An arrow from one class to another means “take this one first”. The number under each class says how many it still waits for.',
    'needs[c] = how many arrows point into class c. unlocks[b] lists the classes that wait for b.',
    'This is a directed graph. Kahn’s method repeatedly takes a class with no unmet needs, so it lists the classes in a safe order, or shows there is none.'));
  free0.forEach((id) => { look[Number(id)] = 'buy'; line.push(Number(id)); });
  steps.push(runStep('seed', snap(), free0.length ? [say('ripple', listAnd(free0.map((x) => 'Class ' + x)) + (free0.length === 1 ? ' waits' : ' wait') + ' for nothing.'), say('narr', 'Then put ' + (free0.length === 1 ? 'it' : 'them') + ' in the line first.')] : [say('ripple', 'Every class waits for another one.'), say('narr', 'Then nobody can even start.')],
    free0.length ? listAnd(free0.map((x) => 'Class ' + x)) + (free0.length === 1 ? ' waits' : ' wait') + ' for nothing, so ' + (free0.length === 1 ? 'it joins' : 'they join') + ' the line first.' : 'No class is free to start. Every class waits for another one.',
    'line = [' + free0.join(', ') + ']: every class with needs[c] == 0.',
    'The classes that wait for nothing are the only safe places to begin. Any valid order starts with one of them.'));
  while (line.length) {
    const c = line.shift();
    cur = c; nxt = null; taken++;
    look[c] = 'cur';
    steps.push(runStep('take', snap(), [say('ripple', 'Class ' + c + ' is at the front of the line. I take it.'), say('narr', 'That makes ' + taken + ' of ' + n + '.')],
      'The ripple takes class ' + c + ' from the front of the line. That makes ' + taken + ' of ' + n + '.',
      'c = line.popleft() = ' + c + ', taken = ' + taken + '.',
      'Class ' + c + ' has no unmet needs, so taking it now is always safe. Each class leaves the line once.'));
    for (const a of unlocks[c]) {
      nxt = a; active = c + '-' + a; needs[a]--;
      if (needs[a] === 0) {
        look[a] = 'buy'; line.push(a);
        steps.push(runStep('free', snap(), [say('ripple', 'Class ' + a + ' was waiting for ' + c + '.'), say('narr', 'And that was the last thing it needed. Into the line it goes.')],
          'Class ' + a + ' was waiting for class ' + c + '. That was the last class it needed, so class ' + a + ' joins the line.',
          'needs[' + a + '] -= 1 → 0, so line.append(' + a + '). line = [' + line.join(', ') + '].',
          'A class joins the line exactly when its last arrow is used. That keeps the line full of safe choices.'));
      } else {
        steps.push(runStep('unlock', snap(), [say('ripple', 'Class ' + a + ' was waiting for ' + c + '.'), say('narr', 'It still waits for ' + many(needs[a], 'more class', 'more classes') + '.')],
          'Class ' + a + ' was waiting for class ' + c + '. Now it waits for ' + many(needs[a], 'more class', 'more classes') + '.',
          'needs[' + a + '] -= 1 → ' + needs[a] + '. Not zero yet, so it stays out of the line.',
          'Each arrow is used once, when the class it starts from is taken. That is why the whole run is O(V + E).'));
      }
      used[active] = 'out'; active = null;
    }
    look[c] = 'ok';
  }
  cur = null; nxt = null;
  const ok = taken === n;
  const left = ids.filter((_, i) => look[i] !== 'ok');
  if (ok) {
    steps.push(runStep('done', snap({ done: true }), [say('ripple', 'The line is empty and I took all ' + n + ' classes.'), say('narr', 'So there is a good order. The answer is True.')],
      'The line is empty and every class got taken, one after another. The ripple can finish all ' + n + '. The answer is True.',
      'taken == numCourses (' + n + ') → return True.',
      'Every class and every arrow was handled once: O(V + E) time, O(V + E) space for the lists.'));
  } else {
    left.forEach((id) => { look[Number(id)] = 'hit'; });
    steps.push(runStep('stuck', snap({ done: true }), [say('ripple', 'The line is empty, but ' + listAnd(left.map((x) => 'class ' + x)) + ' still ' + (left.length === 1 ? 'waits' : 'wait') + '.'), say('narr', 'They wait on each other in a loop. The answer is False.')],
      'The line is empty, but ' + listAnd(left.map((x) => 'class ' + x)) + ' still ' + (left.length === 1 ? 'waits' : 'wait') + '. They wait on each other in a loop, so the answer is False.',
      'taken = ' + taken + ' < ' + n + ' → return False.',
      'A class outside the line forever sits on a loop of arrows, or waits for one. Kahn’s method finds loops without searching for them.'));
  }
  runFinish(steps, { intro: ['Count what each class waits for', 'plain'], seed: ['Free classes join the line', 'cool'], take: ['Take the front class', 'cool'], unlock: ['One less to wait for', 'warn'], free: ['Nothing left to wait for → join the line', 'warn'], done: ['All ' + n + ' classes taken → True', 'ok'], stuck: ['Some classes wait in a loop → False', 'ok'] }, (st) => {
    st.meter = { text: 'classes taken: ' + st.taken + ' / ' + n, pct: (st.taken / n) * 100, mark: 100, markLabel: 'all ' + n + ' classes' };
    st.watch = [['c', st.cur == null ? '—' : st.cur, 'left'], ['next', st.nxt == null ? '—' : st.nxt, 'right'], ['needs[next]', st.needNow, 'right'], ['line', '[' + st.line.join(', ') + ']', 'text'], ['taken', st.taken, 'text'], ['result', st.kind === 'done' ? 'True' : st.kind === 'stuck' ? 'False' : '…', st.done ? 'ok' : 'text']];
    ['line', 'taken', 'cur', 'nxt', 'needNow'].forEach((k) => delete st[k]);
  });
  return { steps, over: { graph: { nodes, edges }, answer: ok, status: ['Planning…', ok ? 'All classes fit' : 'Stuck in a loop'],
    example: ['numCourses = ' + n + ', prerequisites = ' + showTuples(pre), 'answer = ' + (ok ? 'True' : 'False')] } };
}
function courseScene() {
  const run = courseBuild(SCENE_INPUT['course-schedule'].default);
  const code = {
    py: [['def canFinish(numCourses, prerequisites):', ''], ['    needs = [0] * numCourses', '  # how many classes each one waits for', 'intro'], ['    unlocks = [[] for _ in range(numCourses)]', ''], ['    for a, b in prerequisites:', ''], ['        unlocks[b].append(a)', '  # b comes before a'], ['        needs[a] += 1', ''], ['    line = deque(c for c in range(numCourses) if needs[c] == 0)', '', 'seed'], ['    taken = 0', ''], ['    while line:', ''], ['        c = line.popleft()', '  # take the front class', 'take'], ['        taken += 1', ''], ['        for nxt in unlocks[c]:', ''], ['            needs[nxt] -= 1', '  # one less to wait for', 'unlock'], ['            if needs[nxt] == 0:', ''], ['                line.append(nxt)', '  # free now: join the line', 'free'], ['    return taken == numCourses', '', 'done|stuck']],
    java: [['boolean canFinish(int numCourses, int[][] prerequisites) {', ''], ['    int[] needs = new int[numCourses];', '  // classes each one waits for', 'intro'], ['    List<List<Integer>> unlocks = new ArrayList<>();', ''], ['    for (int i = 0; i < numCourses; i++) unlocks.add(new ArrayList<>());', ''], ['    for (int[] p : prerequisites) {', ''], ['        unlocks.get(p[1]).add(p[0]);', '  // p[1] comes before p[0]'], ['        needs[p[0]]++;', ''], ['    }', ''], ['    Deque<Integer> line = new ArrayDeque<>();', ''], ['    for (int c = 0; c < numCourses; c++) if (needs[c] == 0) line.add(c);', '', 'seed'], ['    int taken = 0;', ''], ['    while (!line.isEmpty()) {', ''], ['        int c = line.poll();', '  // take the front class', 'take'], ['        taken++;', ''], ['        for (int nxt : unlocks.get(c)) {', ''], ['            needs[nxt]--;', '  // one less to wait for', 'unlock'], ['            if (needs[nxt] == 0) line.add(nxt);', '  // free now', 'free'], ['        }', ''], ['    }', ''], ['    return taken == numCourses;', '', 'done|stuck'], ['}', '']],
    cpp: [['bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {', ''], ['    vector<int> needs(numCourses, 0);', '  // classes each one waits for', 'intro'], ['    vector<vector<int>> unlocks(numCourses);', ''], ['    for (auto& p : prerequisites) {', ''], ['        unlocks[p[1]].push_back(p[0]);', '  // p[1] comes before p[0]'], ['        needs[p[0]]++;', ''], ['    }', ''], ['    queue<int> line;', ''], ['    for (int c = 0; c < numCourses; c++) if (needs[c] == 0) line.push(c);', '', 'seed'], ['    int taken = 0;', ''], ['    while (!line.empty()) {', ''], ['        int c = line.front(); line.pop();', '  // take the front class', 'take'], ['        taken++;', ''], ['        for (int nxt : unlocks[c]) {', ''], ['            needs[nxt]--;', '  // one less to wait for', 'unlock'], ['            if (needs[nxt] == 0) line.push(nxt);', '  // free now', 'free'], ['        }', ''], ['    }', ''], ['    return taken == numCourses;', '', 'done|stuck'], ['}', '']],
    js: [['function canFinish(numCourses, prerequisites) {', ''], ['  const needs = new Array(numCourses).fill(0);', '  // classes each one waits for', 'intro'], ['  const unlocks = Array.from({ length: numCourses }, () => []);', ''], ['  for (const [a, b] of prerequisites) {', ''], ['    unlocks[b].push(a);', '  // b comes before a'], ['    needs[a]++;', ''], ['  }', ''], ['  const line = [];', ''], ['  for (let c = 0; c < numCourses; c++) if (needs[c] === 0) line.push(c);', '', 'seed'], ['  let taken = 0;', ''], ['  while (line.length) {', ''], ['    const c = line.shift();', '  // take the front class', 'take'], ['    taken++;', ''], ['    for (const nxt of unlocks[c]) {', ''], ['      needs[nxt]--;', '  // one less to wait for', 'unlock'], ['      if (needs[nxt] === 0) line.push(nxt);', '  // free now', 'free'], ['    }', ''], ['  }', ''], ['  return taken === numCourses;', '', 'done|stuck'], ['}', '']],
    go: [['func canFinish(numCourses int, prerequisites [][]int) bool {', ''], ['    needs := make([]int, numCourses)', '  // classes each one waits for', 'intro'], ['    unlocks := make([][]int, numCourses)', ''], ['    for _, p := range prerequisites {', ''], ['        unlocks[p[1]] = append(unlocks[p[1]], p[0])', '  // p[1] comes first'], ['        needs[p[0]]++', ''], ['    }', ''], ['    line := []int{}', ''], ['    for c := 0; c < numCourses; c++ { if needs[c] == 0 { line = append(line, c) } }', '', 'seed'], ['    taken := 0', ''], ['    for len(line) > 0 {', ''], ['        c := line[0]; line = line[1:]', '  // take the front class', 'take'], ['        taken++', ''], ['        for _, nxt := range unlocks[c] {', ''], ['            needs[nxt]--', '  // one less to wait for', 'unlock'], ['            if needs[nxt] == 0 { line = append(line, nxt) }', '  // free now', 'free'], ['        }', ''], ['    }', ''], ['    return taken == numCourses', '', 'done|stuck'], ['}', '']]
  };
  return Object.assign({
    id: 'course-schedule', pattern: 'Breadth-First Search', cast: 'ripple', short: 'Classes', visual: 'graph', items: [],
    graphLabel: 'Classes and what they need first', legend: [['in', 'still waiting'], ['buy', 'in the line'], ['cur', 'The ripple takes it'], ['ok', 'taken']],
    goal: 'Can the ripple take every class?',
    lines: tagLines(code), code,
    rules: [['Count what each class waits for', 'intro'], ['Classes that wait for nothing join the line', 'seed'], ['Line not empty → take the class at the front', 'take'], ['It still waits for others → count one less', 'unlock'], ['Its count reaches 0 → it joins the line', 'free'], ['Line empty, all taken → True', 'done'], ['Line empty, some still waiting → False', 'stuck']],
    complexity: [['O(V + E)', 'each class and each arrow is handled once'], ['O(V + E)', 'the lists of arrows and the line']],
    quest: ['The ripple signs up for six classes, numbered 0 to 5. Some classes need another class first: 2 needs 0 and 1, 3 needs 1, 4 needs 2 and 3, and 5 needs 4.', 'Can she take all six, one after another, without breaking a rule?'],
    hints: ['“Which classes could the ripple take on day one?”', '“After she takes a class, which other classes come one step closer to being free?”', '“Count what each class waits for. Keep a line of classes at 0. Take one, lower the counts it unlocks, and add any that reach 0. Did you take them all?”'],
    clues: ['some things must come before others', 'a loop of needs makes it impossible', 'yes or no: is there a safe order?'],
    kit: { right: 1, spot: 'Why start with the free classes?', ask: 'How should the ripple plan?',
      quiz: [['Start anywhere and follow arrows', 'Pick a class and walk to whatever it unlocks'], ['Take free classes first', 'Keep a line of classes that wait for nothing, and count down the rest'], ['Sort by class number', 'Take 0, then 1, then 2, and so on'], ['Take the busiest class first', 'Start with the class that unlocks the most']] },
    quizFb: ['“Class 2 unlocks 4, but 4 also needs 3. Following arrows alone breaks a rule.”', '“Yes! A class with nothing left to wait for is always safe. Taking it frees others.”', '“Numbers mean nothing here. Class 1 could need class 5.”', '“The busiest class may still be waiting for something. Only a free class is safe.”']
  }, run.over, { steps: run.steps });
}
SCENE_INPUT['course-schedule'] = {
  hint: 'the number of classes, then [class, needs first] pairs', example: '4, [[1, 0], [2, 1], [3, 2]]',
  default: { n: 6, pre: [[2, 0], [2, 1], [3, 1], [4, 2], [4, 3], [5, 4]] },
  presets: [['Story example', () => SCENE_INPUT['course-schedule'].default], ['Random', () => SCENE_INPUT['course-schedule'].random()], ['A loop', () => ({ n: 4, pre: [[1, 0], [2, 1], [3, 2], [1, 3]] })], ['Nothing needed', () => ({ n: 3, pre: [] })]],
  random: () => {
    const n = rint(3, 7), order = rdistinct(n, 0, n - 1), pre = [], seen = new Set();
    for (let tries = 0; tries < 30 && pre.length < rint(2, Math.min(9, n + 2)); tries++) {
      let i = rint(0, n - 1), j = rint(0, n - 1);
      if (i === j) continue;
      if (i > j) [i, j] = [j, i];
      const a = order[j], b = order[i], key = a + ',' + b;
      if (!seen.has(key)) { seen.add(key); pre.push([a, b]); }
    }
    if (Math.random() < 0.3 && pre.length) { const [a, b] = pre[0]; if (!seen.has(b + ',' + a)) pre.push([b, a]); }
    return { n, pre };
  },
  parse: (text) => {
    const m = String(text || '').trim().match(/^(\d+)\s*,\s*(\[[\s\S]*\])$/);
    if (!m) throw inErr('Write the number of classes, then the pairs, like 4, [[1, 0], [2, 1]].');
    return { n: Number(m[1]), pre: parseTuples(m[2], 2, '[[1, 0], [2, 1]]') };
  },
  show: (v) => v.n + ', ' + showTuples(v.pre),
  check: (v) => {
    if (v.n < 2 || v.n > 8) return 'Use 2 to 8 classes, so the map stays readable.';
    if (v.pre.length > 12) return 'Use at most 12 pairs, so the map stays readable.';
    if (!v.pre.every((p) => p.every((x) => x >= 0 && x < v.n))) return 'Classes are numbered 0 to ' + (v.n - 1) + '.';
    if (v.pre.some(([a, b]) => a === b)) return 'A class cannot need itself.';
    if (new Set(v.pre.map((p) => p.join(','))).size !== v.pre.length) return 'Write each pair only once.';
    return '';
  },
  make: (v) => { const r = courseBuild(v); return runScene('course-schedule', r.over, r.steps); }
};

// ---------- The Friendship Photocopier — Clone Graph (the explorer) ----------
function cloneScene() {
  const adj = { 1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [1, 3] };
  const at = { 1: [0, 0], 2: [0.36, 0], 3: [0.36, 1], 4: [0, 1] };
  const nodes = [], edges = [];
  [1, 2, 3, 4].forEach((k) => { nodes.push({ id: 'o' + k, label: String(k), x: at[k][0], y: at[k][1] }); nodes.push({ id: 'c' + k, label: k + '′', x: at[k][0] + 0.64, y: at[k][1] }); });
  [[1, 2], [2, 3], [3, 4], [4, 1]].forEach(([a, b]) => { edges.push({ from: 'o' + a, to: 'o' + b }); edges.push({ from: 'c' + a, to: 'c' + b }); });
  const keyOf = (p, a, b) => { const e = edges.find((x) => (x.from === p + a && x.to === p + b) || (x.from === p + b && x.to === p + a)); return graphEdgeKey(e); };
  const made = {}, links = {}, trail = [], board = [], steps = [];
  let linkCount = 0;
  const snap = (extra) => {
    const st = { nodes: {}, edges: {}, vals: {}, board: board.map((r) => r.slice()), made: Object.keys(made).length, linkCount, depth: trail.length };
    [1, 2, 3, 4].forEach((k) => {
      st.nodes['o' + k] = trail.length && trail[trail.length - 1] === k ? 'cur' : trail.includes(k) ? 'paint' : made[k] ? 'stored' : 'in';
      if (made[k]) { st.nodes['c' + k] = 'ok'; st.vals['c' + k] = (links[k] || []).length + ' of 2'; }
    });
    [[1, 2], [2, 3], [3, 4], [4, 1]].forEach(([a, b]) => {
      const one = (links[a] || []).includes(b) || (links[b] || []).includes(a);
      st.edges[keyOf('c', a, b)] = one ? '' : 'hide';
      const ia = trail.indexOf(a), ib = trail.indexOf(b);
      if (ia >= 0 && ib >= 0 && Math.abs(ia - ib) === 1) st.edges[keyOf('o', a, b)] = 'path';
    });
    if (trail.length) st.actorAt = 'o' + trail[trail.length - 1];
    return Object.assign(st, extra);
  };
  steps.push(runStep('intro', snap({ old: '—', nb: '—' }), [say('narr', 'Four friends, and each line is a friendship. Make a copy of the whole group.'), say('explorer', 'I’ll copy each friend once and write it in my notebook.'), say('narr', 'And the friendships?'), say('explorer', 'Each copy gets the copies of its friends.')],
    'The explorer must copy a group of four friends. Each line on the left is a friendship. The copies on the right must have the same friendships.',
    'copies = {}. clone(old): if old is in copies, return its copy. Else make one, write it down, then clone each neighbour and link it.',
    'A deep copy of a graph. The notebook (a hash map from old node to copy) stops loops: 1 → 2 → 1 would never end without it.'));
  const clone = (k, from) => {
    if (made[k]) {
      (links[from] = links[from] || []).push(k); linkCount++;
      const st = snap({ old: from, nb: k });
      st.edges[keyOf('c', from, k)] = 'active';
      board.forEach((r) => { r[2] = r[0] === String(k) ? 'hit' : ''; });
      st.board = board.map((r) => r.slice());
      steps.push(runStep('reuse', st, [say('explorer', 'Friend ' + k + ' is already in my notebook.'), say('narr', 'So ' + from + '′ just links to ' + k + '′. No new copy.')],
        'Friend ' + k + ' was copied before. The explorer looks it up in his notebook, and ' + from + '′ links to ' + k + '′.',
        'clone(' + k + '): ' + k + ' in copies → return ' + k + '′. Append it to ' + from + '′.neighbors.',
        'This lookup is what stops the loop. Without it, clone(' + k + ') would copy ' + k + ' again and run forever.'));
      board.forEach((r) => { r[2] = ''; });
      return;
    }
    made[k] = true; trail.push(k);
    board.forEach((r) => { r[2] = ''; });
    board.push([String(k), '→ ' + k + '′', 'fresh']);
    steps.push(runStep('copy', snap({ old: k, nb: '—' }), [say('explorer', 'Friend ' + k + ' has no copy yet. I make ' + k + '′.'), say('narr', 'Write it in the notebook before anything else.')],
      'Friend ' + k + ' has no copy yet. The explorer makes ' + k + '′ and writes “' + k + ' → ' + k + '′” in his notebook.',
      'copies[' + k + '] = Node(' + k + '). Written down before visiting the friends, so a loop back finds it.',
      'Writing the copy down first is the key order. Friends of ' + k + ' may lead straight back to ' + k + '.'));
    board.forEach((r) => { r[2] = ''; });
    for (const nb of adj[k]) {
      if (made[nb]) clone(nb, k);
      else {
        clone(nb, k);
        (links[k] = links[k] || []).push(nb); linkCount++;
        const st = snap({ old: k, nb });
        st.edges[keyOf('c', k, nb)] = 'active';
        steps.push(runStep('link', st, [say('explorer', 'Back at ' + k + '. Friend ' + nb + ' is copied now.'), say('narr', 'Link ' + k + '′ to ' + nb + '′.')],
          'The explorer comes back to friend ' + k + '. The copy of ' + nb + ' is ready, so ' + k + '′ links to ' + nb + '′.',
          'clone(' + nb + ') returned ' + nb + '′. ' + k + '′.neighbors.append(' + nb + '′).',
          'The call for ' + nb + ' finished its whole part of the graph first. That is depth-first order.'));
      }
    }
    trail.pop();
  };
  clone(1, null);
  steps.push(runStep('done', snap({ old: 1, nb: '—', done: true }), [say('explorer', 'Every friend has a copy, and every copy has its friends.'), say('narr', 'Hand back 1′. The whole copy hangs off it.')],
    'All four friends are copied, and every copy has both of its friends. The explorer hands back copy 1′.',
    'clone(1) returns 1′. 4 copies, 8 links (each friendship twice, once from each side).',
    'Each node is copied once and each link is made once: O(V + E) time, O(V) for the notebook and the call stack.'));
  runFinish(steps, { intro: ['Copy every friend and friendship', 'plain'], copy: ['Not in the notebook → make a copy', 'cool'], reuse: ['Already copied → link to it', 'warn'], link: ['Friend copied → link the copies', 'cool'], done: ['Copy complete → return 1′', 'ok'] }, (st) => {
    st.meter = { text: 'links made: ' + st.linkCount + ' / 8', pct: (st.linkCount / 8) * 100, mark: 100, markLabel: '4 friendships, both ways' };
    st.watch = [['old', st.old == null ? '—' : st.old, 'left'], ['friend', st.nb, 'right'], ['copies', st.made + ' / 4', 'text'], ['links', st.linkCount + ' / 8', 'text'], ['call depth', st.depth, 'right'], ['result', st.done ? '1′' : '…', st.done ? 'ok' : 'text']];
    ['old', 'nb', 'made', 'linkCount', 'depth'].forEach((k) => delete st[k]);
  });
  const code = {
    py: [['def cloneGraph(node):', ''], ['    copies = {}', '  # old node → its copy', 'intro'], ['    def clone(old):', ''], ['        if old in copies:', ''], ['            return copies[old]', '  # copied before: reuse', 'reuse'], ['        copies[old] = Node(old.val)', '  # write it down first', 'copy'], ['        for nb in old.neighbors:', ''], ['            copies[old].neighbors.append(clone(nb))', '', 'link'], ['        return copies[old]', ''], ['    return clone(node) if node else None', '', 'done']],
    java: [['Map<Node, Node> copies = new HashMap<>();', '  // old node → its copy', 'intro'], ['Node cloneGraph(Node node) {', ''], ['    if (node == null) return null;', ''], ['    if (copies.containsKey(node))', ''], ['        return copies.get(node);', '  // copied before: reuse', 'reuse'], ['    Node copy = new Node(node.val);', ''], ['    copies.put(node, copy);', '  // write it down first', 'copy'], ['    for (Node nb : node.neighbors)', ''], ['        copy.neighbors.add(cloneGraph(nb));', '', 'link'], ['    return copy;', '', 'done'], ['}', '']],
    cpp: [['unordered_map<Node*, Node*> copies;', '  // old node → its copy', 'intro'], ['Node* cloneGraph(Node* node) {', ''], ['    if (!node) return nullptr;', ''], ['    if (copies.count(node))', ''], ['        return copies[node];', '  // copied before: reuse', 'reuse'], ['    Node* copy = new Node(node->val);', ''], ['    copies[node] = copy;', '  // write it down first', 'copy'], ['    for (Node* nb : node->neighbors)', ''], ['        copy->neighbors.push_back(cloneGraph(nb));', '', 'link'], ['    return copy;', '', 'done'], ['}', '']],
    js: [['function cloneGraph(node) {', ''], ['  const copies = new Map();', '  // old node → its copy', 'intro'], ['  const clone = (old) => {', ''], ['    if (copies.has(old))', ''], ['      return copies.get(old);', '  // copied before: reuse', 'reuse'], ['    const copy = new Node(old.val);', ''], ['    copies.set(old, copy);', '  // write it down first', 'copy'], ['    for (const nb of old.neighbors)', ''], ['      copy.neighbors.push(clone(nb));', '', 'link'], ['    return copy;', ''], ['  };', ''], ['  return node ? clone(node) : null;', '', 'done'], ['}', '']],
    go: [['func cloneGraph(node *Node) *Node {', ''], ['    copies := map[*Node]*Node{}', '  // old node → its copy', 'intro'], ['    var clone func(old *Node) *Node', ''], ['    clone = func(old *Node) *Node {', ''], ['        if c, ok := copies[old]; ok {', ''], ['            return c', '  // copied before: reuse', 'reuse'], ['        }', ''], ['        copy := &Node{Val: old.Val}', ''], ['        copies[old] = copy', '  // write it down first', 'copy'], ['        for _, nb := range old.Neighbors {', ''], ['            copy.Neighbors = append(copy.Neighbors, clone(nb))', '', 'link'], ['        }', ''], ['        return copy', ''], ['    }', ''], ['    if node == nil { return nil }', ''], ['    return clone(node)', '', 'done'], ['}', '']]
  };
  return {
    id: 'clone-graph', pattern: 'Depth-First Search', cast: 'explorer', short: 'Copier', visual: 'graph', items: [],
    graph: { nodes, edges }, graphLabel: 'Friends on the left, copies on the right',
    legend: [['cur', 'The explorer is here'], ['paint', 'waiting on the trail'], ['stored', 'copied'], ['ok', 'a copy'], ['path', 'The explorer’s trail']],
    board: true, boardTitle: 'The explorer’s notebook',
    goal: 'Copy every friend and every friendship', status: ['Copying…', 'Copy complete'],
    lines: tagLines(code), code,
    rules: [['Start with an empty notebook', 'intro'], ['Friend not in the notebook → make a copy', 'copy'], ['Friend already copied → link to that copy', 'reuse'], ['Back from a new copy → link the two copies', 'link'], ['Every friend copied → return the first copy', 'done']],
    predictFull: true,
    complexity: [['O(V + E)', 'each friend is copied once, each link made once'], ['O(V)', 'the notebook and the call stack']],
    quest: ['Four friends form a ring: 1 knows 2 and 4, 2 knows 1 and 3, 3 knows 2 and 4, and 4 knows 1 and 3.', 'The explorer must hand back a full copy: new friends with the same numbers and the same friendships, starting from friend 1.'],
    example: ['adjList = [[2, 4], [1, 3], [2, 4], [1, 3]]', 'answer = [[2, 4], [1, 3], [2, 4], [1, 3]]  (all new nodes)'],
    answer: [[2, 4], [1, 3], [2, 4], [1, 3]],
    hints: ['“Friend 1 knows 2, and 2 knows 1. What stops you copying them back and forth forever?”', '“Keep a notebook from each old friend to its copy. Check it before you copy anyone.”', '“clone(old): if it is in the notebook, return the copy. Else make the copy, write it down, then add clone(friend) for each friend.”'],
    clues: ['a deep copy, not the same nodes', 'friendships can loop back', 'every node is reachable from the first'],
    kit: { right: 2, spot: 'Why a notebook, not just recursion?', ask: 'How should the explorer copy the group?',
      quiz: [['Copy each friend, then each friend’s friends', 'Recurse into every friend without remembering anything'], ['Hand back the same friends', 'Return the nodes you were given'], ['Keep a notebook of copies', 'Old friend → copy, checked before making a new one'], ['Copy the friends in number order', 'Make 1′, 2′, 3′, 4′, then guess the links']] },
    quizFb: ['“1 knows 2 and 2 knows 1. Without remembering, the copying never stops.”', '“That is not a copy. Change one and the other changes too.”', '“Yes! Write each copy down first, and every loop back finds it in the notebook.”', '“You only get friend 1. You have to walk the friendships to find the rest.”'],
    steps
  };
}

// ---------- the  courier who knows every road ----------
// The Extra Road — Redundant Connection (union-find with parent pointers)
const ROAD_POS = { 1: [0, 0.5], 2: [0.32, 0], 3: [0.32, 1], 4: [0.66, 0], 5: [0.66, 1], 6: [1, 0.5] };
function roadsBuild(v) {
  const list = v.edges, n = list.length;
  const hand = JSON.stringify(list) === JSON.stringify(SCENE_INPUT['redundant-connection'].default.edges);
  const ids = Array.from({ length: n }, (_, i) => String(i + 1));
  const nodes = hand ? ids.map((id) => ({ id, label: id, x: ROAD_POS[id][0], y: ROAD_POS[id][1] })) : ringGraph(ids);
  const edges = list.map(([a, b]) => ({ from: String(a), to: String(b) }));
  const head = Array.from({ length: n + 1 }, (_, i) => i), size = Array(n + 1).fill(1);
  const kept = {}, steps = [];
  let joins = 0, answer = null;
  const find = (x) => { const hops = [x]; while (head[x] !== x) { head[x] = head[head[x]]; x = head[x]; hops.push(x); } return { root: x, hops }; };
  const snap = (extra) => {
    const st = { nodes: {}, edges: Object.assign({}, kept), vals: {}, joins };
    ids.forEach((id) => { const i = Number(id); st.nodes[id] = size[find0(i)] > 1 ? 'stored' : 'in'; st.vals[id] = head[i] === i ? 'head' : '→' + head[i]; });
    return Object.assign(st, extra);
  };
  const find0 = (x) => { while (head[x] !== x) x = head[x]; return x; };
  steps.push(runStep('intro', snap({ a: '—', b: '—', ra: '—', rb: '—' }), [say('narr', 'These ' + n + ' towns were joined by ' + (n - 1) + ' roads, no loops. Then one extra road was built.'), say('checker', 'Every town starts as its own head. I’ll read the roads in order.'), say('narr', 'Which road joins two towns that were already joined?')],
    'The checker reads the roads one at a time. Each town notes which town it reports to. A town that reports to itself is the head of its group.',
    'head[x] = x for every town. For each road (a, b): find the head of a and of b. Same head → this road is extra. Else join the groups.',
    'Union-find keeps groups as trees of parent pointers. Each “find” walks up to the head; walks are kept short by pointing towns closer to the head.'));
  for (const [a, b] of list) {
    const fa = find(a), fb = find(b), key = a + '-' + b;
    const st = snap({ a, b, ra: fa.root, rb: fb.root });
    st.nodes[String(a)] = 'cur'; st.nodes[String(b)] = 'cur'; st.edges[key] = 'active'; st.actorAt = String(a);
    if (fa.root === fb.root) {
      st.nodes[String(a)] = 'hit'; st.nodes[String(b)] = 'hit'; st.done = true;
      answer = [a, b];
      steps.push(runStep('cycle', st, [say('checker', 'Town ' + a + ' and town ' + b + ' both report to ' + fa.root + '.'), say('narr', 'They were already joined. Road ' + a + '–' + b + ' is the extra one.')],
        'Town ' + a + ' and town ' + b + ' have the same head, ' + fa.root + '. They were already joined, so road ' + a + '–' + b + ' makes a loop. It is the extra road.',
        'find(' + a + ') = find(' + b + ') = ' + fa.root + ' → return [' + a + ', ' + b + '].',
        'The first road that joins two towns in one group closes the only loop. It is also the last road of that loop in the list, as the problem asks.'));
      break;
    }
    steps.push(runStep('look', st, [say('checker', 'Road ' + a + '–' + b + '. Town ' + a + '’s head is ' + fa.root + ', town ' + b + '’s head is ' + fb.root + '.'), say('narr', 'Two different heads, so two different groups.')],
      'Road ' + a + '–' + b + '. The checker follows the arrows: town ' + a + '’s head is ' + fa.root + ' and town ' + b + '’s head is ' + fb.root + '. Different heads, so the towns are not joined yet.',
      'find(' + a + ') = ' + fa.root + ', find(' + b + ') = ' + fb.root + '. Different → union.',
      'find walks ' + (fa.hops.length - 1) + ' and ' + (fb.hops.length - 1) + ' hops. Pointing towns closer to the head on the way keeps later walks short.'));
    const [big, small] = size[fa.root] >= size[fb.root] ? [fa.root, fb.root] : [fb.root, fa.root];
    head[small] = big; size[big] += size[small]; joins++;
    kept[key] = 'path';
    const sj = snap({ a, b, ra: fa.root, rb: fb.root });
    sj.nodes[String(small)] = 'cur'; sj.actorAt = String(small);
    steps.push(runStep('join', sj, [say('checker', 'Head ' + small + ' now reports to head ' + big + '.'), say('narr', 'One group of ' + size[big] + ' towns.')],
      'The checker joins the two groups. Head ' + small + ' now reports to ' + big + ', so the group has ' + many(size[big], 'town') + '. The road is kept.',
      'head[' + small + '] = ' + big + ' (the smaller group joins the bigger one).',
      'Hanging the smaller group under the bigger one keeps every walk short: about O(α(n)) per find, which is almost constant.'));
  }
  runFinish(steps, { intro: ['Every town is its own head', 'plain'], look: ['Different heads → not joined yet', 'cool'], join: ['Join the two groups', 'cool'], cycle: ['Same head → extra road', 'ok'] }, (st) => {
    st.meter = { text: 'roads kept: ' + st.joins + ' / ' + (n - 1), pct: (st.joins / (n - 1)) * 100, mark: 100, markLabel: 'a tree needs ' + (n - 1) };
    st.watch = [['road', st.a === '—' ? '—' : '[' + st.a + ', ' + st.b + ']', 'left'], ['find(a)', st.ra, 'right'], ['find(b)', st.rb, 'right'], ['groups', n - st.joins, 'text'], ['kept', st.joins, 'text'], ['result', st.kind === 'cycle' ? '[' + st.a + ', ' + st.b + ']' : '…', st.done ? 'ok' : 'text']];
    ['a', 'b', 'ra', 'rb', 'joins'].forEach((k) => delete st[k]);
  });
  return { steps, over: { graph: { nodes, edges }, answer, status: ['Reading roads…', 'Extra road: ' + answer[0] + '–' + answer[1]],
    example: ['edges = ' + showTuples(list), 'answer = [' + answer.join(', ') + ']'] } };
}
function roadsScene() {
  const run = roadsBuild(SCENE_INPUT['redundant-connection'].default);
  const code = {
    py: [['def findRedundantConnection(edges):', ''], ['    head = list(range(len(edges) + 1))', '  # every town is its own head', 'intro'], ['    size = [1] * (len(edges) + 1)', ''], ['    def find(x):', ''], ['        while head[x] != x:', ''], ['            head[x] = head[head[x]]', '  # point closer to the head'], ['            x = head[x]', ''], ['        return x', ''], ['    for a, b in edges:', ''], ['        ra, rb = find(a), find(b)', '', 'look'], ['        if ra == rb:', ''], ['            return [a, b]', '  # already joined: extra road', 'cycle'], ['        if size[ra] < size[rb]: ra, rb = rb, ra', ''], ['        head[rb] = ra', '  # smaller group joins bigger', 'join'], ['        size[ra] += size[rb]', '']],
    java: [['int[] head, size;', ''], ['int find(int x) {', ''], ['    while (head[x] != x) { head[x] = head[head[x]]; x = head[x]; }', ''], ['    return x;', ''], ['}', ''], ['int[] findRedundantConnection(int[][] edges) {', ''], ['    int n = edges.length;', ''], ['    head = new int[n + 1]; size = new int[n + 1];', ''], ['    for (int i = 0; i <= n; i++) { head[i] = i; size[i] = 1; }', '  // own head', 'intro'], ['    for (int[] e : edges) {', ''], ['        int ra = find(e[0]), rb = find(e[1]);', '', 'look'], ['        if (ra == rb) return e;', '  // already joined: extra road', 'cycle'], ['        if (size[ra] < size[rb]) { int t = ra; ra = rb; rb = t; }', ''], ['        head[rb] = ra;', '  // smaller group joins bigger', 'join'], ['        size[ra] += size[rb];', ''], ['    }', ''], ['    return new int[0];', ''], ['}', '']],
    cpp: [['vector<int> head, sz;', ''], ['int find(int x) {', ''], ['    while (head[x] != x) { head[x] = head[head[x]]; x = head[x]; }', ''], ['    return x;', ''], ['}', ''], ['vector<int> findRedundantConnection(vector<vector<int>>& edges) {', ''], ['    int n = edges.size();', ''], ['    head.resize(n + 1); sz.assign(n + 1, 1);', ''], ['    iota(head.begin(), head.end(), 0);', '  // every town is its own head', 'intro'], ['    for (auto& e : edges) {', ''], ['        int ra = find(e[0]), rb = find(e[1]);', '', 'look'], ['        if (ra == rb) return e;', '  // already joined: extra road', 'cycle'], ['        if (sz[ra] < sz[rb]) swap(ra, rb);', ''], ['        head[rb] = ra;', '  // smaller group joins bigger', 'join'], ['        sz[ra] += sz[rb];', ''], ['    }', ''], ['    return {};', ''], ['}', '']],
    js: [['function findRedundantConnection(edges) {', ''], ['  const head = Array.from({ length: edges.length + 1 }, (_, i) => i);', '  // own head', 'intro'], ['  const size = new Array(edges.length + 1).fill(1);', ''], ['  const find = (x) => {', ''], ['    while (head[x] !== x) { head[x] = head[head[x]]; x = head[x]; }', ''], ['    return x;', ''], ['  };', ''], ['  for (const [a, b] of edges) {', ''], ['    let ra = find(a), rb = find(b);', '', 'look'], ['    if (ra === rb) return [a, b];', '  // already joined: extra road', 'cycle'], ['    if (size[ra] < size[rb]) [ra, rb] = [rb, ra];', ''], ['    head[rb] = ra;', '  // smaller group joins bigger', 'join'], ['    size[ra] += size[rb];', ''], ['  }', ''], ['}', '']],
    go: [['func findRedundantConnection(edges [][]int) []int {', ''], ['    head := make([]int, len(edges)+1)', ''], ['    size := make([]int, len(edges)+1)', ''], ['    for i := range head { head[i], size[i] = i, 1 }', '  // own head', 'intro'], ['    find := func(x int) int {', ''], ['        for head[x] != x { head[x] = head[head[x]]; x = head[x] }', ''], ['        return x', ''], ['    }', ''], ['    for _, e := range edges {', ''], ['        ra, rb := find(e[0]), find(e[1])', '', 'look'], ['        if ra == rb { return e }', '  // already joined: extra road', 'cycle'], ['        if size[ra] < size[rb] { ra, rb = rb, ra }', ''], ['        head[rb] = ra', '  // smaller group joins bigger', 'join'], ['        size[ra] += size[rb]', ''], ['    }', ''], ['    return nil', ''], ['}', '']]
  };
  return Object.assign({
    id: 'redundant-connection', pattern: 'Graphs', cast: 'checker', short: 'Roads', visual: 'graph', items: [],
    graphLabel: 'Towns and roads', legend: [['in', 'on its own'], ['stored', 'in a group'], ['cur', 'on this road'], ['path', 'road kept'], ['active', 'road being read']],
    goal: 'Which road was built last and makes a loop?',
    lines: tagLines(code), code,
    rules: [['Every town starts as its own head', 'intro'], ['Read the next road → find both heads', 'look'], ['Different heads → join the groups', 'join'], ['Same head → this road is extra', 'cycle']],
    predictFull: true,
    complexity: [['O(n · α(n))', 'each road does two finds, each almost constant'], ['O(n)', 'one head and one size per town']],
    quest: ['Six towns were linked by five roads, with no loop anywhere. Then a sixth road was added: [[1, 2], [1, 3], [2, 4], [3, 5], [4, 5], [5, 6]].', 'The checker must find the road that can be closed while every town stays reachable. If several work, pick the one that comes last in the list.'],
    hints: ['“Before a road is built, are its two towns already linked some other way?”', '“Keep groups of linked towns. Each town points toward the head of its group.”', '“For each road, find both heads. Same head → that road is the extra one. Different → point one head at the other.”'],
    clues: ['a tree plus one extra edge', 'the edge that closes a loop', 'the answer is the last such edge in the list'],
    kit: { right: 2, spot: 'Why heads, not a fresh search per road?', ask: 'How should the checker find the extra road?',
      quiz: [['Search the map for every road', 'Before each road, walk the map to see if its towns already meet'], ['Count roads per town', 'A town with three roads must be on the loop'], ['Keep groups with a head each', 'Two towns are joined when they report to the same head'], ['Drop the longest road', 'The extra road is the one that looks out of place']] },
    quizFb: ['“That works, but each walk costs O(n), so all of them cost O(n²).”', '“A town can have many roads without being on a loop. Counting can’t tell.”', '“Yes! Same head means already joined, so that road closes a loop.”', '“Roads have no length here. Only how they join the towns matters.”']
  }, run.over, { steps: run.steps });
}
// a tree on n towns plus one extra road, shuffled
function randomTreePlus(n) {
  const order = rdistinct(n, 1, n), edges = [], have = new Set();
  for (let i = 1; i < n; i++) { const a = order[i], b = order[rint(0, i - 1)]; edges.push(a < b ? [a, b] : [b, a]); have.add(Math.min(a, b) + ',' + Math.max(a, b)); }
  for (let tries = 0; tries < 50; tries++) { const a = rint(1, n), b = rint(1, n); if (a !== b && !have.has(Math.min(a, b) + ',' + Math.max(a, b))) { edges.push([Math.min(a, b), Math.max(a, b)]); break; } }
  for (let i = edges.length - 1; i > 0; i--) { const j = rint(0, i); [edges[i], edges[j]] = [edges[j], edges[i]]; }
  return { edges };
}
SCENE_INPUT['redundant-connection'] = {
  hint: 'roads as [town, town] pairs: a tree on towns 1 to n plus one extra road', example: '[[1, 2], [2, 3], [1, 3]]',
  default: { edges: [[1, 2], [1, 3], [2, 4], [3, 5], [4, 5], [5, 6]] },
  presets: [['Story example', () => SCENE_INPUT['redundant-connection'].default], ['Random', () => SCENE_INPUT['redundant-connection'].random()], ['A triangle', () => ({ edges: [[1, 2], [2, 3], [1, 3]] })], ['Loop at the end', () => ({ edges: [[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]] })]],
  random: () => randomTreePlus(rint(3, 8)),
  parse: (text) => ({ edges: parseTuples(text, 2, '[[1, 2], [2, 3], [1, 3]]') }),
  show: (v) => showTuples(v.edges),
  check: (v) => {
    const n = v.edges.length;
    if (n < 3 || n > 8) return 'Use 3 to 8 roads, so the map stays readable.';
    if (!v.edges.every((p) => p.every((x) => x >= 1 && x <= n))) return 'With ' + n + ' roads the towns are numbered 1 to ' + n + '.';
    if (v.edges.some(([a, b]) => a === b)) return 'A road must join two different towns.';
    if (new Set(v.edges.map(([a, b]) => Math.min(a, b) + ',' + Math.max(a, b))).size !== n) return 'Write each road only once.';
    const seen = new Set([1]), todo = [1];
    while (todo.length) { const x = todo.pop(); v.edges.forEach(([a, b]) => { const y = a === x ? b : b === x ? a : 0; if (y && !seen.has(y)) { seen.add(y); todo.push(y); } }); }
    return seen.size === n ? '' : 'Every town must be reachable, like a tree with one extra road.';
  },
  make: (v) => { const r = roadsBuild(v); return runScene('redundant-connection', r.over, r.steps); }
};

// The First Delivery Round — Network Delay Time (Dijkstra)
const DELAY_POS = { 1: [0, 0.5], 2: [0.38, 0], 3: [0.38, 1], 4: [0.72, 0.5], 5: [1, 0.5] };
function delayBuild(v) {
  const { times, n, k } = v;
  const def = SCENE_INPUT['network-delay-time'].default;
  const hand = n === def.n && k === def.k && JSON.stringify(times) === JSON.stringify(def.times);
  const ids = Array.from({ length: n }, (_, i) => String(i + 1));
  const nodes = hand ? ids.map((id) => ({ id, label: id, x: DELAY_POS[id][0], y: DELAY_POS[id][1] })) : ringGraph(ids);
  const edges = times.map(([a, b, w]) => ({ from: String(a), to: String(b), w, directed: true }));
  const roads = {};
  times.forEach(([a, b, w]) => { (roads[a] = roads[a] || []).push([b, w]); });
  const best = { [k]: 0 }, via = {}, done = new Set(), seen = {}, steps = [];
  let heap = [[0, k]], cur = null;
  const heapRows = (fresh) => heap.slice().sort((x, y) => x[0] - y[0] || x[1] - y[1]).map(([t, u]) => ['town ' + u, 't = ' + t, fresh && fresh[0] === t && fresh[1] === u ? 'fresh' : '']);
  const snap = (extra, fresh) => {
    const st = { nodes: {}, edges: Object.assign({}, seen), vals: {}, board: heapRows(fresh), settled: done.size, cur };
    ids.forEach((id) => { const u = Number(id); st.nodes[id] = done.has(u) ? 'ok' : best[u] != null ? 'buy' : 'future'; st.vals[id] = best[u] != null ? 't ' + best[u] : '∞'; });
    done.forEach((u) => { if (via[u]) st.edges[via[u]] = 'path'; });
    if (cur != null) { st.nodes[String(cur)] = 'cur'; st.actorAt = String(cur); }
    return Object.assign(st, extra);
  };
  steps.push(runStep('intro', snap({ u: '—', t: '—' }), [say('narr', 'A message leaves town ' + k + ' at time 0. Each arrow shows how long a road takes, one way only.'), say('checker', 'I always visit the town I can reach soonest next. My list is sorted by time.'), say('narr', 'When does the last town get the message?')],
    'The checker carries a message out of town ' + k + '. The number on each arrow is how long that road takes. Every other town starts at “never” (∞).',
    'best = {' + k + ': 0}, heap = [(0, ' + k + ')]. Pop the smallest time, then try every road out of that town.',
    'Dijkstra’s method. Road times are never negative, so the smallest time on the list can never get better. That town is settled for good.'));
  while (heap.length) {
    heap.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
    const [t, u] = heap.shift();
    if (done.has(u)) {
      cur = u;
      steps.push(runStep('stale', snap({ u, t }), [say('checker', 'Town ' + u + ' at time ' + t + '? I already settled it at ' + best[u] + '.'), say('narr', 'An old note. Cross it off.')],
        'This note says town ' + u + ' at time ' + t + ', but the checker already reached it at time ' + best[u] + '. It is an old note, so he skips it.',
        'u = ' + u + ' is in done → continue.',
        'Instead of changing a time inside the heap, the method adds a new note and skips old ones later. Each road adds at most one note.'));
      continue;
    }
    done.add(u); cur = u;
    steps.push(runStep('settle', snap({ u, t }), [say('checker', 'Town ' + u + ' is next on my list, at time ' + t + '.'), say('narr', 'Nothing on the list is sooner, so ' + t + ' is final.')],
      'Town ' + u + ' is the soonest town on the checker’s list, at time ' + t + '. Nothing can beat that now, so town ' + u + ' is settled.',
      'pop (' + t + ', ' + u + '). done.add(' + u + '). Settled: ' + done.size + ' of ' + n + '.',
      'Every other note is at time ' + t + ' or later, and roads only add time. So no later route can reach town ' + u + ' sooner.'));
    for (const [w2, w] of roads[u] || []) {
      const key = u + '-' + w2, nt = t + w, old = best[w2];
      if (old == null || nt < old) {
        best[w2] = nt; heap.push([nt, w2]); via[w2] = key;
        const st = snap({ u, t, v: w2, w, nt }, [nt, w2]);
        st.edges[key] = 'active';
        steps.push(runStep('improve', st, [say('checker', 'From ' + u + ' to ' + w2 + ' takes ' + w + ': time ' + t + ' + ' + w + ' = ' + nt + '.'), say('narr', old == null ? 'Town ' + w2 + ' had no time yet. Write ' + nt + '.' : 'That beats ' + old + '. Write ' + nt + '.')],
          'The road to town ' + w2 + ' takes ' + w + ', so the checker could get there at time ' + nt + '. ' + (old == null ? 'That is the first time found for town ' + w2 + '.' : 'That is sooner than ' + old + ', so he writes the new time.'),
          t + ' + ' + w + ' = ' + nt + ' < ' + (old == null ? '∞' : old) + ' → best[' + w2 + '] = ' + nt + ', push (' + nt + ', ' + w2 + ').',
          'This is called relaxing a road. A town’s time only goes down, and only when a road gives a sooner arrival.'));
      } else {
        const st = snap({ u, t, v: w2, w, nt });
        st.edges[key] = 'active';
        steps.push(runStep('keep', st, [say('checker', 'From ' + u + ' to ' + w2 + ': ' + t + ' + ' + w + ' = ' + nt + '.'), say('narr', 'Town ' + w2 + ' already has ' + old + '. Keep it.')],
          'Going to town ' + w2 + ' this way arrives at time ' + nt + '. Town ' + w2 + ' already has ' + old + ', which is not later, so nothing changes.',
          t + ' + ' + w + ' = ' + nt + ' ≥ ' + old + ' → no change.',
          'A road that does not give a sooner time is simply ignored. It may still be checked once from each settled town.'));
      }
      seen[key] = seen[key] || 'out';
    }
  }
  cur = null;
  const all = done.size === n, last = all ? Math.max.apply(null, Object.values(best)) : -1;
  const lateTown = all ? Object.keys(best).find((x) => best[x] === last) : null;
  const missing = ids.filter((id) => !done.has(Number(id)));
  if (all) {
    steps.push(runStep('done', snap({ u: '—', t: '—', done: true }), [say('checker', 'My list is empty. Every town got the message.'), say('narr', 'The last one was town ' + lateTown + ', at time ' + last + '. That is the answer.')],
      'Every town got the message. The last one was town ' + lateTown + ', at time ' + last + ', so the answer is ' + last + '.',
      'All ' + n + ' towns settled → return max(best) = ' + last + '.',
      'Each road is relaxed once and each note is pushed and popped once: O(E log E) time with a heap, O(V + E) space.'));
  } else {
    const st = snap({ u: '—', t: '—', done: true });
    missing.forEach((id) => { st.nodes[id] = 'hit'; });
    steps.push(runStep('unreached', st, [say('checker', 'My list is empty, but ' + listAnd(missing.map((x) => 'town ' + x)) + ' never got the message.'), say('narr', 'No road leads there. The answer is -1.')],
      'The checker’s list is empty, but ' + listAnd(missing.map((x) => 'town ' + x)) + ' never got the message. No road leads there, so the answer is -1.',
      'Only ' + done.size + ' of ' + n + ' towns settled → return -1.',
      'A town that never joins the list cannot be reached from town ' + k + ' at all, whatever the times.'));
  }
  runFinish(steps, { intro: ['Start at time 0', 'plain'], settle: ['Soonest on the list → settle it', 'cool'], improve: ['Sooner arrival → write the new time', 'warn'], keep: ['Not sooner → keep the old time', 'plain'], stale: ['Old note → skip it', 'plain'], done: ['Last town reached at ' + last, 'ok'], unreached: ['A town is never reached → -1', 'ok'] }, (st) => {
    st.meter = { text: 'towns settled: ' + st.settled + ' / ' + n, pct: (st.settled / n) * 100, mark: 100, markLabel: 'all ' + n + ' towns' };
    st.watch = [['u', st.u, 'left'], ['time t', st.t, 'left'], ['road', st.v == null ? '—' : st.u + ' → ' + st.v + ' (' + st.w + ')', 'right'], ['t + w', st.nt == null ? '—' : st.nt, 'right'], ['settled', st.settled, 'text'], ['result', st.kind === 'done' ? last : st.kind === 'unreached' ? -1 : '…', st.done ? 'ok' : 'text']];
    ['u', 't', 'v', 'w', 'nt', 'settled', 'cur'].forEach((x) => delete st[x]);
  });
  return { steps, over: { graph: { nodes, edges }, answer: last, status: ['Delivering…', all ? 'All reached at ' + last : 'A town is cut off'],
    example: ['times = ' + showTuples(times) + ', n = ' + n + ', k = ' + k, 'answer = ' + last] } };
}
function delayScene() {
  const run = delayBuild(SCENE_INPUT['network-delay-time'].default);
  const code = {
    py: [['def networkDelayTime(times, n, k):', ''], ['    roads = defaultdict(list)', ''], ['    for u, v, w in times:', ''], ['        roads[u].append((v, w))', ''], ['    best = {k: 0}', '  # soonest known time per town', 'intro'], ['    heap, done = [(0, k)], set()', ''], ['    while heap:', ''], ['        t, u = heapq.heappop(heap)', ''], ['        if u in done:', ''], ['            continue', '  # an old note', 'stale'], ['        done.add(u)', '  # soonest: settled', 'settle'], ['        for v, w in roads[u]:', ''], ['            if t + w < best.get(v, float("inf")):', '', 'keep'], ['                best[v] = t + w', '  # a sooner arrival', 'improve'], ['                heapq.heappush(heap, (t + w, v))', ''], ['    return max(best.values()) if len(done) == n else -1', '', 'done|unreached']],
    java: [['int networkDelayTime(int[][] times, int n, int k) {', ''], ['    List<int[]>[] roads = new List[n + 1];', ''], ['    for (int i = 0; i <= n; i++) roads[i] = new ArrayList<>();', ''], ['    for (int[] r : times) roads[r[0]].add(new int[]{r[1], r[2]});', ''], ['    int[] best = new int[n + 1];', ''], ['    Arrays.fill(best, Integer.MAX_VALUE); best[k] = 0;', '  // soonest known time', 'intro'], ['    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);', ''], ['    heap.add(new int[]{0, k});', ''], ['    boolean[] done = new boolean[n + 1];', ''], ['    int settled = 0, last = 0;', ''], ['    while (!heap.isEmpty()) {', ''], ['        int[] top = heap.poll(); int t = top[0], u = top[1];', ''], ['        if (done[u]) continue;', '  // an old note', 'stale'], ['        done[u] = true; settled++; last = t;', '  // settled', 'settle'], ['        for (int[] r : roads[u]) {', ''], ['            if (t + r[1] < best[r[0]]) {', '', 'keep'], ['                best[r[0]] = t + r[1];', '  // a sooner arrival', 'improve'], ['                heap.add(new int[]{best[r[0]], r[0]});', ''], ['            }', ''], ['        }', ''], ['    }', ''], ['    return settled == n ? last : -1;', '', 'done|unreached'], ['}', '']],
    cpp: [['int networkDelayTime(vector<vector<int>>& times, int n, int k) {', ''], ['    vector<vector<pair<int,int>>> roads(n + 1);', ''], ['    for (auto& r : times) roads[r[0]].push_back({r[1], r[2]});', ''], ['    vector<int> best(n + 1, INT_MAX); best[k] = 0;', '  // soonest known time', 'intro'], ['    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> heap;', ''], ['    heap.push({0, k});', ''], ['    vector<bool> done(n + 1); int settled = 0, last = 0;', ''], ['    while (!heap.empty()) {', ''], ['        auto [t, u] = heap.top(); heap.pop();', ''], ['        if (done[u]) continue;', '  // an old note', 'stale'], ['        done[u] = true; settled++; last = t;', '  // settled', 'settle'], ['        for (auto [v, w] : roads[u]) {', ''], ['            if (t + w < best[v]) {', '', 'keep'], ['                best[v] = t + w;', '  // a sooner arrival', 'improve'], ['                heap.push({best[v], v});', ''], ['            }', ''], ['        }', ''], ['    }', ''], ['    return settled == n ? last : -1;', '', 'done|unreached'], ['}', '']],
    js: [['function networkDelayTime(times, n, k) {', ''], ['  const roads = Array.from({ length: n + 1 }, () => []);', ''], ['  for (const [u, v, w] of times) roads[u].push([v, w]);', ''], ['  const best = new Array(n + 1).fill(Infinity); best[k] = 0;', '  // soonest known time', 'intro'], ['  const heap = [[0, k]], done = new Set();', '  // a sorted list stands in for a heap'], ['  let last = 0;', ''], ['  while (heap.length) {', ''], ['    heap.sort((a, b) => a[0] - b[0]);', ''], ['    const [t, u] = heap.shift();', ''], ['    if (done.has(u)) continue;', '  // an old note', 'stale'], ['    done.add(u); last = t;', '  // settled', 'settle'], ['    for (const [v, w] of roads[u]) {', ''], ['      if (t + w < best[v]) {', '', 'keep'], ['        best[v] = t + w;', '  // a sooner arrival', 'improve'], ['        heap.push([best[v], v]);', ''], ['      }', ''], ['    }', ''], ['  }', ''], ['  return done.size === n ? last : -1;', '', 'done|unreached'], ['}', '']],
    go: [['func networkDelayTime(times [][]int, n int, k int) int {', ''], ['    roads := make([][][2]int, n+1)', ''], ['    for _, r := range times { roads[r[0]] = append(roads[r[0]], [2]int{r[1], r[2]}) }', ''], ['    best := make([]int, n+1)', ''], ['    for i := range best { best[i] = math.MaxInt32 }', ''], ['    best[k] = 0', '  // soonest known time', 'intro'], ['    h := &Heap{{0, k}}', '  // a min-heap of [time, town]'], ['    done := make([]bool, n+1)', ''], ['    settled, last := 0, 0', ''], ['    for h.Len() > 0 {', ''], ['        top := heap.Pop(h).([2]int); t, u := top[0], top[1]', ''], ['        if done[u] { continue }', '  // an old note', 'stale'], ['        done[u] = true; settled++; last = t', '  // settled', 'settle'], ['        for _, r := range roads[u] {', ''], ['            if t+r[1] < best[r[0]] {', '', 'keep'], ['                best[r[0]] = t + r[1]', '  // a sooner arrival', 'improve'], ['                heap.Push(h, [2]int{best[r[0]], r[0]})', ''], ['            }', ''], ['        }', ''], ['    }', ''], ['    if settled < n { return -1 }', '', 'unreached'], ['    return last', '', 'done'], ['}', '']]
  };
  return Object.assign({
    id: 'network-delay-time', pattern: 'Graphs', cast: 'checker', short: 'Delivery', visual: 'graph', items: [],
    graphLabel: 'Towns and one-way roads with travel times', legend: [['future', 'not reached'], ['buy', 'on the list'], ['cur', 'The checker is here'], ['ok', 'settled'], ['path', 'fastest road in']],
    board: true, boardTitle: 'The checker’s list',
    goal: 'When does the last town get the message?',
    lines: tagLines(code), code,
    rules: [['Start town at time 0', 'intro'], ['Take the soonest town on the list → settle it', 'settle'], ['Already settled → skip the old note', 'stale'], ['Road gives a sooner time → write it down', 'improve'], ['Road is not sooner → keep the old time', 'keep'], ['List empty, all towns reached → the latest time', 'done'], ['List empty, a town missed → -1', 'unreached']],
    predictFull: true,
    complexity: [['O(E log E)', 'each road adds at most one note to the heap'], ['O(V + E)', 'the road lists, the times and the heap']],
    quest: ['Five towns are joined by one-way roads. Each road takes a fixed time: 1 → 2 takes 4, 1 → 3 takes 1, 3 → 2 takes 2, 2 → 4 takes 1, 3 → 4 takes 5 and 4 → 5 takes 3.', 'A message leaves town 1 at time 0 and goes down every road at once. When has every town got it?'],
    hints: ['“Which town is sure to get the message first, after town 1?”', '“The town with the smallest time on your list can’t be beaten later. Settle it, then try its roads.”', '“Keep a list sorted by time. Pop the soonest; skip it if settled; else settle it and write any sooner times for its neighbours. The answer is the biggest final time.”'],
    clues: ['roads have times, all positive', 'one-way roads', 'everyone must be reached; how long does it take?'],
    kit: { right: 3, spot: 'Why the soonest town first?', ask: 'How should the checker plan the round?',
      quiz: [['Walk the fewest roads', 'Spread one road at a time, like ripples'], ['Try every route', 'List every path from town 1 and keep the fastest'], ['Follow the cheapest road from here', 'Always take the shortest road out of where you stand'], ['Settle the soonest town next', 'Keep a list sorted by arrival time and always take the top']] },
    quizFb: ['“Fewest roads is not fastest. 1 → 3 → 2 uses two roads but beats 1 → 2.”', '“That finds the answer, but the number of routes grows very fast.”', '“The shortest next road can lead somewhere slow. The checker needs the soonest total time.”', '“Yes! The soonest time on the list can never be beaten, so settle that town next.”']
  }, run.over, { steps: run.steps });
}
SCENE_INPUT['network-delay-time'] = {
  hint: 'roads as [from, to, time], then n and k', example: '[[1, 2, 3], [2, 3, 1], [1, 3, 5]], 3, 1',
  default: { times: [[1, 2, 4], [1, 3, 1], [3, 2, 2], [2, 4, 1], [3, 4, 5], [4, 5, 3]], n: 5, k: 1 },
  presets: [['Story example', () => SCENE_INPUT['network-delay-time'].default], ['Random', () => SCENE_INPUT['network-delay-time'].random()], ['A town cut off', () => ({ times: [[1, 2, 2], [2, 3, 2]], n: 4, k: 1 })], ['Two ways round', () => ({ times: [[2, 1, 1], [2, 3, 1], [3, 4, 1], [1, 4, 4]], n: 4, k: 2 })]],
  random: () => {
    const n = rint(3, 7), times = [], seen = new Set();
    for (let tries = 0; tries < 60 && times.length < rint(n, Math.min(10, 2 * n)); tries++) {
      const a = rint(1, n), b = rint(1, n);
      if (a === b || seen.has(a + ',' + b)) continue;
      seen.add(a + ',' + b); times.push([a, b, rint(1, 9)]);
    }
    return { times, n, k: rint(1, n) };
  },
  parse: (text) => {
    const m = String(text || '').trim().match(/^(\[[\s\S]*\])\s*,\s*(\d+)\s*,\s*(\d+)$/);
    if (!m) throw inErr('Write the roads, then n and k, like [[1, 2, 3], [2, 3, 1]], 3, 1.');
    return { times: parseTuples(m[1], 3, '[[1, 2, 3], [2, 3, 1]]'), n: Number(m[2]), k: Number(m[3]) };
  },
  show: (v) => showTuples(v.times) + ', ' + v.n + ', ' + v.k,
  check: (v) => {
    if (v.n < 2 || v.n > 8) return 'Use 2 to 8 towns, so the map stays readable.';
    if (v.times.length < 1 || v.times.length > 12) return 'Use 1 to 12 roads, so the map stays readable.';
    if (v.k < 1 || v.k > v.n) return 'The start town k must be one of the towns, 1 to ' + v.n + '.';
    if (!v.times.every(([a, b]) => a >= 1 && a <= v.n && b >= 1 && b <= v.n)) return 'Towns are numbered 1 to ' + v.n + '.';
    if (v.times.some(([a, b]) => a === b)) return 'A road must join two different towns.';
    if (!v.times.every(([, , w]) => w >= 1 && w <= 99)) return 'Road times must be whole numbers from 1 to 99.';
    if (new Set(v.times.map(([a, b]) => a + ',' + b)).size !== v.times.length) return 'Write each one-way road only once.';
    return '';
  },
  make: (v) => { const r = delayBuild(v); return runScene('network-delay-time', r.over, r.steps); }
};

SCENE_REGISTRY.push(courseScene, cloneScene, roadsScene, delayScene);
PATTERN_KITS['Graphs'] = { right: 2, spot: 'Why heads, not a search?', ask: 'How should the checker work it out?',
  quiz: [['Search from scratch every time', 'Walk the whole map for each question'], ['Count the roads', 'Use how many roads each town has'], ['Keep a small record per town', 'A head, a time or a count that each step updates'], ['Guess and check', 'Try answers until one fits']] };
STORY_CAST.checker = { name: 'Checker', initial: 'C', color: 'right', radius: '8px' };
