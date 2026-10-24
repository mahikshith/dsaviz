// ---------- Breadth-First Search on trees: Rill visits one floor at a time ----------
// These stories use visual: 'tree' and join the Breadth-First Search kit from scenes_bf.js, each with its own quiz (kit).

// Builds a tree list from a level-order array (null = an empty spot). Shared with scenes_dft.js.
function levelTree(arr) {
  const list = [];
  if (!arr.length || arr[0] == null) return list;
  const make = (v, parent, side) => { const id = 'n' + list.length; list.push({ id, label: String(v), parent, side }); return id; };
  const q = [make(arr[0], null, null)];
  let i = 1;
  while (q.length && i < arr.length) {
    const p = q.shift();
    for (const side of ['L', 'R']) {
      if (i >= arr.length) break;
      const v = arr[i++];
      if (v != null) q.push(make(v, p, side));
    }
  }
  return list;
}
const kidsOf = (list, id) => list.filter((n) => n.parent === id).sort((a, b) => (a.side === 'R') - (b.side === 'R')).map((n) => n.id);

// Floors of the Treehouse — Binary Tree Level Order Traversal
function treehouseScene() {
  const list = levelTree([3, 9, 20, 8, null, 15, 7]);
  const val = (id) => list.find((n) => n.id === id).label;
  const fate = {}, steps = [], floors = [];
  let q = [list[0].id], floor = [], visited = 0, level = 0;
  const show = (ids) => '[' + ids.map(val).join(',') + ']';
  const board = (fresh) => floors.map((f, i) => ['floor ' + i, f.join(' '), fresh && i === floors.length - 1 ? 'fresh' : '']);
  const snap = (kind, at, extra) => {
    const nodes = {};
    list.forEach((n) => { nodes[n.id] = fate[n.id] || 'in'; });
    q.forEach((id) => { nodes[id] = 'buy'; });
    if (at && kind === 'visit') nodes[at] = 'cur';
    return Object.assign({ kind, nodes, edge: {}, actorAt: at, queue: show(q), floorNow: '[' + floor.join(',') + ']', visited, level, board: board(kind === 'floor') }, extra);
  };
  steps.push(snap('intro', list[0].id, { node: '—', size: 1,
    dialog: [say('hoot', 'Rill wants a list of who lives on each floor of the treehouse, top floor first.'), say('rill', 'I’ll keep a line of people to visit. Only the top floor is in it now.'), say('hoot', 'Visit everyone in line for this floor, and send the people below them to the back.')],
    nar: { kid: 'The treehouse has three floors. Rill starts with a line that holds just the person at the top, 3.', builder: 'q = deque([root]). Each round of the while loop handles exactly one floor: the people in q when the round starts.', expert: 'BFS with a FIFO queue visits nodes in order of depth. Taking len(q) at the start of a round splits the queue into floors.' } }));
  while (q.length) {
    const size = q.length;
    floor = [];
    const floorIds = [];
    for (let i = 0; i < size; i++) {
      const id = q.shift();
      floorIds.push(id);
      floor.push(val(id)); visited++;
      const kids = kidsOf(list, id);
      kids.forEach((k) => q.push(k));
      const edge = {}; kids.forEach((k) => { edge[k] = 'path'; });
      fate[id] = 'stored';
      steps.push(snap('visit', id, { node: val(id), size, edge,
        dialog: [say('rill', 'Hello, ' + val(id) + '! You’re on floor ' + level + '.'), say('hoot', kids.length ? 'Send ' + listText(kids.map(val)) + ' to the back of the line.' : 'Nobody lives below ' + val(id) + '. Nothing to add.')],
        nar: { kid: 'Rill visits ' + val(id) + ' and writes it down for floor ' + level + '. ' + (kids.length ? listText(kids.map(val)) + ' live' + (kids.length === 1 ? 's' : '') + ' just below, so they join the back of the line.' : 'No one lives below, so the line gets no one new.'), builder: 'node = q.popleft() → ' + val(id) + '. floor = [' + floor.join(', ') + ']. ' + (kids.length ? 'Append ' + kids.map(val).join(', ') + '. ' : '') + 'q = ' + show(q) + '.', expert: 'Children join the back of the queue, behind everyone on this floor, so the next floor never mixes in early. Visit ' + (i + 1) + ' of ' + size + ' this round.' } }));
    }
    floors.push(floor.slice());
    const doneFloor = floor.slice();
    const st = snap('floor', null, { node: '—', size,
      dialog: [say('rill', 'That’s everyone on floor ' + level + ': ' + doneFloor.join(', ') + '.'), say('hoot', q.length ? 'Write the floor down. The line now holds exactly the next floor.' : 'Write it down. The line is empty, so that was the last floor.')],
      nar: { kid: 'Floor ' + level + ' is finished. Rill writes ' + doneFloor.join(', ') + ' on the list. ' + (q.length ? 'Everyone left in line lives on the next floor down.' : 'Nobody is left in line.'), builder: 'out.append([' + doneFloor.join(', ') + ']). q = ' + show(q) + (q.length ? ', which is all of floor ' + (level + 1) + '.' : ', so the while loop ends.'), expert: 'After the round, the queue holds exactly the next level: every node of this level has been popped and only their children were pushed.' } });
    floorIds.forEach((id) => { st.nodes[id] = 'ok'; });
    st.actorAt = floorIds[floorIds.length - 1];
    steps.push(st);
    level++;
  }
  steps.push(snap('done', list[0].id, { node: '—', size: 0, done: true,
    dialog: [say('rill', 'The line is empty. I’ve met everyone.'), say('hoot', 'Three floors, top to bottom: ' + floors.map((f) => '[' + f.join(',') + ']').join(' ') + '.')],
    nar: { kid: 'Everyone has been visited, floor by floor. The list reads: ' + floors.map((f) => f.join(' ')).join(', then ') + '.', builder: 'return out → ' + JSON.stringify(floors.map((f) => f.map(Number))) + '.', expert: 'Each node enters and leaves the queue once: O(n) time. The queue holds at most one level: O(w), the widest floor.' } }));
  const T = { intro: ['One person in line: the top', 'plain'], visit: ['Visit, then queue who is below', 'cool'], floor: ['Floor finished → write it down', 'ok'], done: [floors.length + ' floors listed!', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.meter = { text: 'people visited: ' + st.visited + ' / ' + list.length, pct: (st.visited / list.length) * 100, mark: 100, markLabel: 'all ' + list.length };
    st.watch = [['node', st.node, 'left'], ['queue', st.queue, 'right'], ['floor', st.floorNow, 'right'], ['floor size', st.size, 'text'], ['floor no.', st.level, 'text'], ['floors done', st.board.length, st.done ? 'ok' : 'text']];
    delete st.node; delete st.queue; delete st.floorNow; delete st.size; delete st.level; delete st.visited;
  });
  const code = {
    py: [['def levelOrder(root):', ''], ['    if not root:', ''], ['        return []', ''], ['    out, q = [], deque([root])', '  # the line', 'intro'], ['    while q:', ''], ['        floor = []', ''], ['        for _ in range(len(q)):', '  # just this floor'], ['            node = q.popleft()', ''], ['            floor.append(node.val)', '  # visit', 'visit'], ['            if node.left: q.append(node.left)', ''], ['            if node.right: q.append(node.right)', ''], ['        out.append(floor)', '  # floor done', 'floor'], ['    return out', '', 'done']],
    java: [['List<List<Integer>> levelOrder(TreeNode root) {', ''], ['    List<List<Integer>> out = new ArrayList<>();', ''], ['    if (root == null) return out;', ''], ['    Deque<TreeNode> q = new ArrayDeque<>(List.of(root));', '  // the line', 'intro'], ['    while (!q.isEmpty()) {', ''], ['        List<Integer> floor = new ArrayList<>();', ''], ['        for (int n = q.size(); n > 0; n--) {', '  // just this floor'], ['            TreeNode node = q.poll();', ''], ['            floor.add(node.val);', '  // visit', 'visit'], ['            if (node.left != null) q.add(node.left);', ''], ['            if (node.right != null) q.add(node.right);', ''], ['        }', ''], ['        out.add(floor);', '  // floor done', 'floor'], ['    }', ''], ['    return out;', '', 'done'], ['}', '']],
    cpp: [['vector<vector<int>> levelOrder(TreeNode* root) {', ''], ['    vector<vector<int>> out;', ''], ['    if (!root) return out;', ''], ['    queue<TreeNode*> q; q.push(root);', '  // the line', 'intro'], ['    while (!q.empty()) {', ''], ['        vector<int> floor;', ''], ['        for (int n = q.size(); n > 0; n--) {', '  // just this floor'], ['            TreeNode* node = q.front(); q.pop();', ''], ['            floor.push_back(node->val);', '  // visit', 'visit'], ['            if (node->left) q.push(node->left);', ''], ['            if (node->right) q.push(node->right);', ''], ['        }', ''], ['        out.push_back(floor);', '  // floor done', 'floor'], ['    }', ''], ['    return out;', '', 'done'], ['}', '']],
    js: [['function levelOrder(root) {', ''], ['  if (!root) return [];', ''], ['  const out = [], q = [root];', '  // the line', 'intro'], ['  while (q.length) {', ''], ['    const floor = [];', ''], ['    for (let n = q.length; n > 0; n--) {', '  // just this floor'], ['      const node = q.shift();', ''], ['      floor.push(node.val);', '  // visit', 'visit'], ['      if (node.left) q.push(node.left);', ''], ['      if (node.right) q.push(node.right);', ''], ['    }', ''], ['    out.push(floor);', '  // floor done', 'floor'], ['  }', ''], ['  return out;', '', 'done'], ['}', '']],
    go: [['func levelOrder(root *TreeNode) [][]int {', ''], ['    out := [][]int{}', ''], ['    if root == nil {', ''], ['        return out', ''], ['    }', ''], ['    q := []*TreeNode{root}', '  // the line', 'intro'], ['    for len(q) > 0 {', ''], ['        floor := []int{}', ''], ['        for n := len(q); n > 0; n-- {', '  // just this floor'], ['            node := q[0]; q = q[1:]', ''], ['            floor = append(floor, node.Val)', '  // visit', 'visit'], ['            if node.Left != nil { q = append(q, node.Left) }', ''], ['            if node.Right != nil { q = append(q, node.Right) }', ''], ['        }', ''], ['        out = append(out, floor)', '  // floor done', 'floor'], ['    }', ''], ['    return out', '', 'done'], ['}', '']]
  };
  return {
    id: 'level-order', pattern: 'Breadth-First Search', cast: 'rill', short: 'Floors', visual: 'tree', items: [], tree: list,
    treeLabel: 'Treehouse', legend: [['in', 'not in line yet'], ['buy', 'waiting in line'], ['cur', 'Rill is here'], ['stored', 'visited'], ['ok', 'floor just written'], ['path', 'just sent to the line']],
    board: true, boardTitle: 'Floors',
    goal: 'List who lives on each floor, top to bottom.', status: ['Visiting floors…', floors.length + ' floors'],
    lines: tagLines(code), code,
    rules: [['Put the top person in the line', 'intro'], ['Visit the next in line, send the people below to the back', 'visit'], ['Everyone on this floor visited → write the floor down', 'floor'], ['The line is empty → the list is done', 'done']],
    complexity: [['O(n)', 'each person joins and leaves the line once'], ['O(w)', 'the line holds at most one floor, w = the widest floor']],
    quest: ['A treehouse has people on three floors. Each person can point to at most two people on the floor just below.', 'The party planner needs a list, floor by floor from the top: who lives on each one, left to right?'],
    example: ['root = [3, 9, 20, 8, null, 15, 7]', '[[3], [9, 20], [8, 15, 7]]'],
    hints: ['Old Hoot: “Going deep down one side mixes floors up. How can you finish a whole floor before starting the next?”', '“Keep a line. Whoever you visit sends the people below them to the back of it.”', '“At the start of each round, count the line. Visit exactly that many people: that is one floor.”'],
    clues: ['top to bottom, floor by floor', 'left to right on each floor', 'people only know who is below them'],
    kit: { right: 0, spot: 'Why a line, not a dive?', ask: 'How should Rill list the floors?',
      quiz: [['Visit with a line, floor by floor', 'Count the line, visit that many, queue who is below'], ['Dive down one side first', 'Go as deep as possible, then come back'], ['Sort everyone by name', 'Line people up by their number'], ['Visit only the left side', 'Follow the left pointer down to the bottom']] },
    quizFb: ['Old Hoot: “Yes! The line always holds the next floor, so each round writes exactly one floor.”', 'Old Hoot: “Diving visits 3, 9, 8 first. That jumps floors before floor 1 is finished.”', 'Old Hoot: “Sorting by number gives 3, 7, 8, 9… and loses which floor anyone lives on.”', 'Old Hoot: “The left side alone misses 20, 15 and 7.”'],
    steps
  };
}

// The View from the Right Balcony — Binary Tree Right Side View
function balconyScene() {
  const list = levelTree([1, 2, 3, 4, 5, null, 6, 7]);
  const val = (id) => list.find((n) => n.id === id).label;
  const fate = {}, steps = [], view = [];
  let q = [list[0].id], visited = 0, level = 0, iNow = '—', sizeNow = 1;
  const show = (ids) => '[' + ids.map(val).join(',') + ']';
  const board = (fresh) => view.map((v, i) => ['floor ' + i, v, fresh && i === view.length - 1 ? 'fresh' : '']);
  const snap = (kind, at, extra) => {
    const nodes = {};
    list.forEach((n) => { nodes[n.id] = fate[n.id] || 'in'; });
    q.forEach((id) => { nodes[id] = 'buy'; });
    if (at && kind !== 'intro' && kind !== 'done') nodes[at] = 'cur';
    return Object.assign({ kind, nodes, edge: {}, actorAt: at, queue: show(q), visited, level, i: iNow, size: sizeNow, board: board(kind === 'seen') }, extra);
  };
  steps.push(snap('intro', list[0].id, { node: '—',
    dialog: [say('hoot', 'Stand on the right-hand balcony and look in. On each floor you can only see one person.'), say('rill', 'The last one on each floor, counting left to right. Everyone else hides behind them.'), say('hoot', 'So visit floor by floor, and write down whoever comes last.')],
    nar: { kid: 'From the right balcony, the person furthest right on each floor blocks the rest. Rill will visit each floor and spot who comes last.', builder: 'Level-order BFS. In each round, the person with i == n − 1 (the last of the round) goes into view.', expert: 'The right side view is the last node of each BFS level. A DFS that visits right first and records the first node at each new depth gives the same answer.' } }));
  while (q.length) {
    const n = q.length;
    sizeNow = n;
    for (let i = 0; i < n; i++) {
      const id = q.shift();
      iNow = i; visited++;
      const kids = kidsOf(list, id);
      kids.forEach((k) => q.push(k));
      const edge = {}; kids.forEach((k) => { edge[k] = 'path'; });
      const last = i === n - 1;
      const queued = kids.length ? ' ' + listText(kids.map(val)) + ' join' + (kids.length === 1 ? 's' : '') + ' the line.' : '';
      if (last) {
        view.push(val(id)); fate[id] = 'ok';
        const hidden = n > 1 ? ' and hides the other ' + (n - 1) : '';
        steps.push(snap('seen', id, { node: val(id), edge,
          dialog: [say('rill', val(id) + ' is the last one on floor ' + level + '. I can see ' + val(id) + ' from the balcony!'), say('hoot', 'Write ' + val(id) + ' down.' + (kids.length ? ' And send ' + listText(kids.map(val)) + ' to the back of the line.' : ''))],
          nar: { kid: val(id) + ' is furthest right on floor ' + level + hidden + '. Rill writes ' + val(id) + ' on the view list.' + queued, builder: 'i = ' + i + ' == n − 1 = ' + (n - 1) + ' → view.append(' + val(id) + '). view = [' + view.join(', ') + '].', expert: (level === 3 ? 'Floor 3 has only ' + val(id) + ', on the left side of the tree. A “walk down the right edge” idea misses it; BFS cannot.' : 'The last pop of a round is the rightmost node of that level.') } }));
      } else {
        fate[id] = 'stored';
        steps.push(snap('visit', id, { node: val(id), edge,
          dialog: [say('rill', val(id) + ' is on floor ' + level + ', but someone is still to the right of it.'), say('hoot', 'So it is hidden. Just send whoever is below it to the line.')],
          nar: { kid: val(id) + ' is not the last on floor ' + level + ', so someone to its right blocks the view.' + queued, builder: 'node = q.popleft() → ' + val(id) + '. i = ' + i + ' < n − 1, so it is not in the view. q = ' + show(q) + '.', expert: 'Hidden nodes still matter: their children belong to the next level and must be queued, in order.' } }));
      }
    }
    level++;
  }
  steps.push(snap('done', list[0].id, { node: '—', done: true,
    dialog: [say('rill', 'The line is empty. Every floor checked.'), say('hoot', 'From the balcony you see ' + view.join(', ') + '. Note 7: it is on the left, but nobody stands to its right.')],
    nar: { kid: 'Rill saw one person on each floor: ' + view.join(', ') + '. Even 7 counts, because nobody on its floor blocks it.', builder: 'return view → [' + view.join(', ') + '].', expert: 'O(n) time: each node is queued and popped once. O(w) space for the queue.' } }));
  const T = { intro: ['Who can you see from the right?', 'plain'], visit: ['Not last → hidden', 'cool'], seen: ['Last on the floor → seen!', 'ok'], done: [view.length + ' people in view', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.meter = { text: 'people visited: ' + st.visited + ' / ' + list.length, pct: (st.visited / list.length) * 100, mark: 100, markLabel: 'all ' + list.length };
    st.watch = [['node', st.node, 'left'], ['i', st.i, 'left'], ['floor size n', st.size, 'text'], ['queue', st.queue, 'right'], ['view', '[' + st.board.map(([, v]) => v).join(',') + ']', st.done ? 'ok' : 'right'], ['floor no.', st.level, 'text']];
    delete st.node; delete st.queue; delete st.visited; delete st.level; delete st.i; delete st.size;
  });
  const code = {
    py: [['def rightSideView(root):', ''], ['    if not root:', ''], ['        return []', ''], ['    view, q = [], deque([root])', '  # the line', 'intro'], ['    while q:', ''], ['        n = len(q)', '  # people on this floor'], ['        for i in range(n):', ''], ['            node = q.popleft()', '  # visit', 'visit'], ['            if i == n - 1:', ''], ['                view.append(node.val)', '  # last one: seen', 'seen'], ['            if node.left: q.append(node.left)', ''], ['            if node.right: q.append(node.right)', ''], ['    return view', '', 'done']],
    java: [['List<Integer> rightSideView(TreeNode root) {', ''], ['    List<Integer> view = new ArrayList<>();', ''], ['    if (root == null) return view;', ''], ['    Deque<TreeNode> q = new ArrayDeque<>(List.of(root));', '  // the line', 'intro'], ['    while (!q.isEmpty()) {', ''], ['        int n = q.size();', '  // people on this floor'], ['        for (int i = 0; i < n; i++) {', ''], ['            TreeNode node = q.poll();', '  // visit', 'visit'], ['            if (i == n - 1) view.add(node.val);', '  // last one: seen', 'seen'], ['            if (node.left != null) q.add(node.left);', ''], ['            if (node.right != null) q.add(node.right);', ''], ['        }', ''], ['    }', ''], ['    return view;', '', 'done'], ['}', '']],
    cpp: [['vector<int> rightSideView(TreeNode* root) {', ''], ['    vector<int> view;', ''], ['    if (!root) return view;', ''], ['    queue<TreeNode*> q; q.push(root);', '  // the line', 'intro'], ['    while (!q.empty()) {', ''], ['        int n = q.size();', '  // people on this floor'], ['        for (int i = 0; i < n; i++) {', ''], ['            TreeNode* node = q.front(); q.pop();', '  // visit', 'visit'], ['            if (i == n - 1) view.push_back(node->val);', '  // last one: seen', 'seen'], ['            if (node->left) q.push(node->left);', ''], ['            if (node->right) q.push(node->right);', ''], ['        }', ''], ['    }', ''], ['    return view;', '', 'done'], ['}', '']],
    js: [['function rightSideView(root) {', ''], ['  if (!root) return [];', ''], ['  const view = [], q = [root];', '  // the line', 'intro'], ['  while (q.length) {', ''], ['    const n = q.length;', '  // people on this floor'], ['    for (let i = 0; i < n; i++) {', ''], ['      const node = q.shift();', '  // visit', 'visit'], ['      if (i === n - 1) view.push(node.val);', '  // last one: seen', 'seen'], ['      if (node.left) q.push(node.left);', ''], ['      if (node.right) q.push(node.right);', ''], ['    }', ''], ['  }', ''], ['  return view;', '', 'done'], ['}', '']],
    go: [['func rightSideView(root *TreeNode) []int {', ''], ['    view := []int{}', ''], ['    if root == nil {', ''], ['        return view', ''], ['    }', ''], ['    q := []*TreeNode{root}', '  // the line', 'intro'], ['    for len(q) > 0 {', ''], ['        n := len(q)', '  // people on this floor'], ['        for i := 0; i < n; i++ {', ''], ['            node := q[0]; q = q[1:]', '  // visit', 'visit'], ['            if i == n-1 { view = append(view, node.Val) }', '  // last one: seen', 'seen'], ['            if node.Left != nil { q = append(q, node.Left) }', ''], ['            if node.Right != nil { q = append(q, node.Right) }', ''], ['        }', ''], ['    }', ''], ['    return view', '', 'done'], ['}', '']]
  };
  return {
    id: 'right-side-view', pattern: 'Breadth-First Search', cast: 'rill', short: 'Balcony', visual: 'tree', items: [], tree: list,
    treeLabel: 'Treehouse seen from the right', legend: [['in', 'not in line yet'], ['buy', 'waiting in line'], ['cur', 'Rill is here'], ['stored', 'hidden from the balcony'], ['ok', 'seen from the balcony']],
    board: true, boardTitle: 'Balcony view',
    goal: 'Who can you see from the right balcony?', status: ['Checking floors…', view.length + ' in view'],
    lines: tagLines(code), code,
    rules: [['Put the top person in the line', 'intro'], ['Visit someone who is not last: they are hidden', 'visit'], ['The last one on a floor is seen → write it down', 'seen'], ['The line is empty → that is the view', 'done']],
    complexity: [['O(n)', 'each person joins and leaves the line once'], ['O(w)', 'the line holds at most one floor']],
    quest: ['The treehouse has four floors. You stand on a balcony at the right-hand side and look straight in.', 'On each floor the person furthest right blocks everyone else. Who do you see, from the top floor down?'],
    example: ['root = [1, 2, 3, 4, 5, null, 6, 7]', '[1, 3, 6, 7]'],
    hints: ['Old Hoot: “Is the person you see always on the right edge of the tree? Look at the bottom floor.”', '“You see exactly one person per floor: the last one, counting left to right.”', '“Visit floor by floor with a line. Count the floor first, and write down the person you visit last.”'],
    clues: ['one answer per floor', 'the rightmost on each floor', 'the bottom floor may be on the left'],
    kit: { right: 0, spot: 'Why visit floors, not the edge?', ask: 'How should Rill find the view?',
      quiz: [['Floor by floor, keep the last', 'Visit each floor with a line and write down its last person'], ['Walk down the right edge', 'Follow the right pointer to the bottom'], ['Take every right child', 'Anyone who is a right child is seen'], ['Dive left first', 'Go deep on the left, then the right']] },
    quizFb: ['Old Hoot: “Yes! The last person of each floor is the one you see, even on the left side.”', 'Old Hoot: “The right edge is 1, 3, 6, then stops. You would miss 7 on the bottom floor.”', 'Old Hoot: “5 is a right child but 6 blocks it. And 7 is a left child, yet you see it.”', 'Old Hoot: “Diving left first meets 4 and 7 before 3. It never says who is last on a floor.”'],
    steps
  };
}

SCENE_REGISTRY.push(treehouseScene, balconyScene);
