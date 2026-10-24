// ---------- Depth-First Search on trees: Moss goes all the way down one branch before trying the next ----------
// These stories use visual: 'tree' and join the Depth-First Search kit from scenes_df.js. Each brings its own quiz (kit),
// because the pattern's default quiz is about islands. levelTree() is defined in scenes_bft.js.

const mossTrail = (trail, list) => {
  const edge = {};
  list.forEach((n) => { if (n.parent != null) edge[n.id] = trail.includes(n.id) ? 'path' : ''; });
  return edge;
};
const sideOf = (list, id, side) => { const n = list.find((x) => x.parent === id && x.side === side); return n ? n.id : null; };

// The Tallest Branch — Maximum Depth of Binary Tree
function tallestScene() {
  const list = levelTree([8, 3, 10, 1, 6, null, 14, null, null, 4]);
  const val = (id) => list.find((n) => n.id === id).label;
  const fate = {}, tags = {}, trail = [], steps = [];
  let best = 0, done = 0;
  const snap = (kind, at, extra) => {
    const nodes = {};
    list.forEach((n) => { nodes[n.id] = fate[n.id] || 'in'; });
    trail.forEach((id, i) => { nodes[id] = i === trail.length - 1 ? 'cur' : 'paint'; });
    return Object.assign({ kind, nodes, edge: mossTrail(trail, list), tags: Object.assign({}, tags), actorAt: at, depthNow: trail.length, best, finished: done }, extra);
  };
  steps.push(snap('intro', list[0].id, { node: '—', l: '—', r: '—', ans: '—',
    dialog: [say('hoot', 'How tall is this tree? Count the branches on the longest way from the top down to a tip.'), say('moss', 'I can’t see the whole tree at once. I’ll ask each branch how deep it goes.'), say('hoot', 'And each branch asks its own two children first.')],
    nar: { kid: 'Moss stands at the top branch, 8. To learn how tall the tree is, he asks each branch how far down it goes.', builder: 'maxDepth(root) asks maxDepth(left) and maxDepth(right), then returns 1 + the bigger answer. An empty child answers 0.', expert: 'Post-order DFS: a node’s answer depends only on its children’s answers, so solve the children first, then combine. The number under a branch is its answer, passed up.' } }));
  const visit = (id) => {
    trail.push(id);
    const L = sideOf(list, id, 'L'), R = sideOf(list, id, 'R');
    if (!L && !R) {
      fate[id] = 'stored'; tags[id] = '↑1'; done++; best = Math.max(best, trail.length);
      steps.push(snap('leaf', id, { node: val(id), l: 0, r: 0, ans: 1,
        dialog: [say('moss', 'Branch ' + val(id) + ' has no children at all.'), say('hoot', 'So it is just itself: 1 deep. Pass that up.')],
        nar: { kid: 'Branch ' + val(id) + ' is a tip. Nothing grows below it, so it answers 1: just itself.', builder: 'maxDepth(' + val(id) + '): both children are None and return 0. 1 + max(0, 0) = 1.', expert: 'A leaf is the smallest case. Its answer comes straight from the two empty calls, with no further work. The trail is ' + trail.length + ' calls deep.' } }));
      trail.pop();
      return 1;
    }
    steps.push(snap('ask', id, { node: val(id), l: '?', r: '?', ans: '?',
      dialog: [say('moss', 'Branch ' + val(id) + ', how deep do you go?'), say('hoot', 'It can’t answer yet. First it asks ' + (L && R ? 'its two children' : 'its one child') + '.')],
      nar: { kid: 'Moss climbs down to branch ' + val(id) + '. It doesn’t know its answer yet, so it asks the branches below it first.', builder: 'maxDepth(' + val(id) + ') calls maxDepth(left) first. This call waits until both children answer.', expert: 'The call stops here and waits. Open calls on the trail: ' + trail.length + '. That is the stack depth right now.' } }));
    const a = L ? visit(L) : 0, b = R ? visit(R) : 0;
    const ans = 1 + Math.max(a, b);
    fate[id] = 'stored'; tags[id] = '↑' + ans; done++;
    const isRoot = trail.length === 1;
    if (isRoot) fate[id] = 'ok';
    steps.push(snap('report', id, { node: val(id), l: a, r: b, ans,
      dialog: [say('moss', 'Branch ' + val(id) + ' heard ' + a + ' from the left and ' + b + ' from the right.'), say('hoot', 'Take the bigger one and add 1 for itself: ' + ans + '.')],
      nar: { kid: 'Both answers are in: ' + a + ' and ' + b + '. Branch ' + val(id) + ' takes the bigger, ' + Math.max(a, b) + ', adds 1 for itself, and answers ' + ans + '.', builder: 'maxDepth(' + val(id) + ') = 1 + max(' + a + ', ' + b + ') = ' + ans + '.' + (isRoot ? ' That is the root, so it is the answer.' : ''), expert: 'Each node is finished once, after both subtrees. ' + (isRoot ? 'The root closes last, so its value is the whole tree’s height.' : 'The call returns and the trail shrinks to ' + (trail.length - 1) + '.') } }));
    trail.pop();
    return ans;
  };
  const height = visit(list[0].id);
  steps.push(snap('done', list[0].id, { node: val(list[0].id), l: '—', r: '—', ans: height, done: true,
    dialog: [say('moss', 'The top branch says ' + height + '.'), say('hoot', 'The longest way down is 8 → 3 → 6 → 4. That is ' + height + ' branches.')],
    nar: { kid: 'The answer reached the top. The tallest way down has ' + height + ' branches: 8, 3, 6 and 4.', builder: 'maxDepth(root) returns ' + height + '.', expert: 'Every node is visited once: O(n) time. The stack is as deep as the tree: O(h), which is O(n) for a tree shaped like a line.' } }));
  const T = { intro: ['How deep is the tree?', 'plain'], ask: ['Not sure yet → ask the children', 'cool'], leaf: ['A tip → answer 1', 'warn'], report: ['Answer = 1 + the deeper child', 'warn'], done: ['The tree is ' + height + ' deep!', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.meter = { text: 'branches answered: ' + st.finished + ' / ' + list.length, pct: (st.finished / list.length) * 100, mark: 100, markLabel: 'all ' + list.length + ' branches' };
    st.watch = [['node', st.node, 'left'], ['left answer', st.l, 'right'], ['right answer', st.r, 'right'], ['answer', st.ans, st.done ? 'ok' : 'text'], ['deepest tip', st.best, 'text'], ['open calls', st.done ? 0 : st.depthNow, 'text']];
    delete st.node; delete st.l; delete st.r; delete st.ans; delete st.best; delete st.depthNow; delete st.finished;
  });
  const code = {
    py: [['def maxDepth(root):', '', 'intro'], ['    if not root:', ''], ['        return 0', '  # empty: no branch'], ['    left = maxDepth(root.left)', '  # ask the children', 'ask'], ['    right = maxDepth(root.right)', ''], ['    return 1 + max(left, right)', '  # 1 for me + the deeper child', 'report|leaf|done']],
    java: [['int maxDepth(TreeNode root) {', '', 'intro'], ['    if (root == null) return 0;', '  // empty: no branch'], ['    int left = maxDepth(root.left);', '  // ask the children', 'ask'], ['    int right = maxDepth(root.right);', ''], ['    return 1 + Math.max(left, right);', '  // 1 for me + the deeper child', 'report|leaf|done'], ['}', '']],
    cpp: [['int maxDepth(TreeNode* root) {', '', 'intro'], ['    if (!root) return 0;', '  // empty: no branch'], ['    int left = maxDepth(root->left);', '  // ask the children', 'ask'], ['    int right = maxDepth(root->right);', ''], ['    return 1 + max(left, right);', '  // 1 for me + the deeper child', 'report|leaf|done'], ['}', '']],
    js: [['function maxDepth(root) {', '', 'intro'], ['  if (!root) return 0;', '  // empty: no branch'], ['  const left = maxDepth(root.left);', '  // ask the children', 'ask'], ['  const right = maxDepth(root.right);', ''], ['  return 1 + Math.max(left, right);', '  // 1 for me + the deeper child', 'report|leaf|done'], ['}', '']],
    go: [['func maxDepth(root *TreeNode) int {', '', 'intro'], ['    if root == nil {', ''], ['        return 0', '  // empty: no branch'], ['    }', ''], ['    left := maxDepth(root.Left)', '  // ask the children', 'ask'], ['    right := maxDepth(root.Right)', ''], ['    return 1 + max(left, right)', '  // 1 for me + the deeper child', 'report|leaf|done'], ['}', '']]
  };
  return {
    id: 'max-depth', pattern: 'Depth-First Search', cast: 'moss', short: 'Tallest', visual: 'tree', items: [], tree: list, tags: true,
    treeLabel: 'Binary tree', legend: [['in', 'not asked yet'], ['cur', 'Moss is here'], ['paint', 'waiting for answers'], ['stored', 'answered (number below)'], ['path', 'Moss’s trail']],
    goal: 'How many branches are on the longest way down?', status: ['Asking branches…', height + ' deep'],
    lines: tagLines(code), code,
    rules: [['Start at the top branch', 'intro'], ['Ask both children before answering', 'ask'], ['A tip with no children answers 1', 'leaf'], ['Answer 1 + the deeper child’s answer', 'report'], ['The top branch’s answer is the height', 'done']],
    complexity: [['O(n)', 'every branch answers exactly once'], ['O(h)', 'the trail is as long as the tree is tall']],
    quest: ['An old tree has seven branches. Each branch splits into at most two smaller ones.', 'The gardener wants to know how tall it is: how many branches are on the longest way from the top down to a tip?'],
    example: ['root = [8, 3, 10, 1, 6, null, 14, null, null, 4]', 'answer = 4  (8 → 3 → 6 → 4)'],
    hints: ['Old Hoot: “If you knew how deep the left side goes and how deep the right side goes, how deep would this branch be?”', '“A branch with nothing under it is 1 deep. An empty spot is 0 deep.”', '“Ask the left child, ask the right child, then answer 1 + the bigger of the two. Start that question at the top.”'],
    clues: ['a tree, top to tips', 'the longest way down', 'each branch only knows its children'],
    kit: { right: 2, spot: 'Why ask the children first?', ask: 'How should Moss measure the tree?',
      quiz: [['Count every branch', 'The height is how many branches there are'], ['Always go left', 'Walk down the left side and count'], ['Ask the children, add one', 'Each branch answers 1 + its deeper child'], ['Measure the widest floor', 'The height is the most branches side by side']] },
    quizFb: ['Old Hoot: “There are 7 branches, but the longest way down only passes 4 of them.”', 'Old Hoot: “Going left finds 8 → 3 → 1, only 3 deep. The longest way turns right at 3.”', 'Old Hoot: “Yes! Each branch waits for its children, then answers 1 + the bigger answer.”', 'Old Hoot: “The widest floor has 3 branches, but that tells you nothing about how deep the tree goes.”'],
    steps
  };
}

// The Mirror Garden — Invert Binary Tree
function mirrorGardenScene() {
  const list = levelTree([4, 2, 7, 1, 3, 6, 9]);
  const val = (id) => list.find((n) => n.id === id).label;
  const fate = {}, trail = [], steps = [];
  let swaps = 0, seen = 0;
  const snap = (kind, at, extra) => {
    const nodes = {};
    list.forEach((n) => { nodes[n.id] = fate[n.id] || 'in'; });
    trail.forEach((id, i) => { nodes[id] = i === trail.length - 1 ? 'cur' : 'paint'; });
    return Object.assign({ kind, tree: list.map((n) => Object.assign({}, n)), nodes, edge: mossTrail(trail, list), actorAt: at, depthNow: trail.length, swaps, seen }, extra);
  };
  steps.push(snap('intro', list[0].id, { node: '—', wasL: '—', wasR: '—',
    dialog: [say('hoot', 'The garden must look as if you saw it in a mirror. Every left bed goes right, and every right bed goes left.'), say('moss', 'I’ll swap the two beds at each gardener, then visit the children.'), say('hoot', 'Start with the head gardener at the top.')],
    nar: { kid: 'Each gardener looks after a left bed and a right bed. Moss will swap the two beds of every gardener. Then the whole garden is mirrored.', builder: 'invert(node): swap node.left and node.right, then call invert on both children. An empty spot just returns.', expert: 'Pre-order DFS: do the work at the node, then recurse. Mirroring every node’s two children mirrors the whole tree.' } }));
  const visit = (id) => {
    trail.push(id); seen++;
    const L = sideOf(list, id, 'L'), R = sideOf(list, id, 'R');
    const wasL = L ? val(L) : 'empty', wasR = R ? val(R) : 'empty';
    list.forEach((n) => { if (n.parent === id) n.side = n.side === 'L' ? 'R' : 'L'; });
    fate[id] = 'ok';
    if (!L && !R) {
      steps.push(snap('leaf', id, { node: val(id), wasL, wasR,
        dialog: [say('moss', 'Gardener ' + val(id) + ' has two empty beds.'), say('hoot', 'Swapping nothing with nothing changes nothing. Move on.')],
        nar: { kid: 'Gardener ' + val(id) + ' has no beds below. Swapping two empty beds looks the same, so Moss moves on.', builder: 'invert(' + val(id) + '): left and right are both None. The swap runs, but nothing moves.', expert: 'A leaf is its own mirror image. Its two calls on None return at once. Trail depth: ' + trail.length + '.' } }));
    } else {
      swaps++;
      steps.push(snap('swap', id, { node: val(id), wasL, wasR,
        dialog: [say('moss', 'Gardener ' + val(id) + ': ' + wasL + ' was on the left, ' + wasR + ' on the right. Swap!'), say('hoot', 'Now go down and do the same for the new left bed.')],
        nar: { kid: 'Moss swaps gardener ' + val(id) + '’s beds. ' + wasR + ' moves to the left and ' + wasL + ' moves to the right. Everything below them moves too.', builder: 'invert(' + val(id) + '): left, right = right, left. Now left = ' + wasR + ' and right = ' + wasL + '. Then invert(left) and invert(right).', expert: 'The swap moves whole subtrees by changing two pointers, in O(1). Their insides get mirrored by the calls that follow.' } }));
    }
    const kids = list.filter((n) => n.parent === id).sort((a, b) => (a.side === 'R') - (b.side === 'R'));
    kids.forEach((k) => visit(k.id));
    trail.pop();
  };
  visit(list[0].id);
  steps.push(snap('done', list[0].id, { node: val(list[0].id), wasL: '—', wasR: '—', done: true,
    dialog: [say('moss', 'Every gardener’s beds are swapped.'), say('hoot', 'The bottom row read 1 3 6 9. Now it reads 9 6 3 1, the old row backwards.')],
    nar: { kid: 'Every gardener has swapped beds. The bottom row used to read 1 3 6 9. Now it reads 9 6 3 1, a perfect mirror.', builder: 'invert(root) returns root. The tree in level order is now [4, 7, 2, 9, 6, 3, 1].', expert: 'Each node is visited once with O(1) work: O(n) time. Recursion depth is the height: O(h).' } }));
  const T = { intro: ['Mirror the whole garden', 'plain'], swap: ['Swap the two beds', 'cool'], leaf: ['No beds → nothing to swap', 'warn'], done: ['The garden is mirrored!', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.meter = { text: 'gardeners visited: ' + st.seen + ' / ' + list.length, pct: (st.seen / list.length) * 100, mark: 100, markLabel: 'all ' + list.length };
    st.watch = [['node', st.node, 'left'], ['left was', st.wasL, 'right'], ['right was', st.wasR, 'right'], ['swaps', st.swaps, 'text'], ['visited', st.seen, st.done ? 'ok' : 'text'], ['open calls', st.done ? 0 : st.depthNow, 'text']];
    delete st.node; delete st.wasL; delete st.wasR; delete st.swaps; delete st.seen; delete st.depthNow;
  });
  const code = {
    py: [['def invertTree(root):', '', 'intro'], ['    if not root:', ''], ['        return None', '  # an empty spot'], ['    root.left, root.right = root.right, root.left', '  # swap the beds', 'swap|leaf'], ['    invertTree(root.left)', ''], ['    invertTree(root.right)', ''], ['    return root', '', 'done']],
    java: [['TreeNode invertTree(TreeNode root) {', '', 'intro'], ['    if (root == null) return null;', '  // an empty spot'], ['    TreeNode tmp = root.left;', ''], ['    root.left = root.right; root.right = tmp;', '  // swap the beds', 'swap|leaf'], ['    invertTree(root.left);', ''], ['    invertTree(root.right);', ''], ['    return root;', '', 'done'], ['}', '']],
    cpp: [['TreeNode* invertTree(TreeNode* root) {', '', 'intro'], ['    if (!root) return nullptr;', '  // an empty spot'], ['    swap(root->left, root->right);', '  // swap the beds', 'swap|leaf'], ['    invertTree(root->left);', ''], ['    invertTree(root->right);', ''], ['    return root;', '', 'done'], ['}', '']],
    js: [['function invertTree(root) {', '', 'intro'], ['  if (!root) return null;', '  // an empty spot'], ['  [root.left, root.right] = [root.right, root.left];', '  // swap the beds', 'swap|leaf'], ['  invertTree(root.left);', ''], ['  invertTree(root.right);', ''], ['  return root;', '', 'done'], ['}', '']],
    go: [['func invertTree(root *TreeNode) *TreeNode {', '', 'intro'], ['    if root == nil {', ''], ['        return nil', '  // an empty spot'], ['    }', ''], ['    root.Left, root.Right = root.Right, root.Left', '  // swap the beds', 'swap|leaf'], ['    invertTree(root.Left)', ''], ['    invertTree(root.Right)', ''], ['    return root', '', 'done'], ['}', '']]
  };
  return {
    id: 'invert-tree', pattern: 'Depth-First Search', cast: 'moss', short: 'Mirror', visual: 'tree', items: [], tree: steps[0].tree,
    treeLabel: 'Garden tree', legend: [['in', 'not visited yet'], ['cur', 'Moss is here'], ['paint', 'on Moss’s trail'], ['ok', 'beds swapped'], ['path', 'Moss’s trail']],
    goal: 'Mirror the garden: every left bed goes right.', status: ['Swapping beds…', 'Mirrored'],
    lines: tagLines(code), code,
    rules: [['Start with the head gardener', 'intro'], ['Swap this gardener’s two beds, then visit them', 'swap'], ['No beds below → nothing to swap', 'leaf'], ['Everyone visited → the garden is mirrored', 'done']],
    complexity: [['O(n)', 'every gardener is visited once'], ['O(h)', 'the trail is as long as the tree is tall']],
    quest: ['The Mirror Garden has seven gardeners. Each one looks after a left bed and a right bed, and each bed has its own gardener below.', 'The queen wants the garden to look exactly as it does in her mirror. Every left must become right, all the way down.'],
    example: ['root = [4, 2, 7, 1, 3, 6, 9]', '[4, 7, 2, 9, 6, 3, 1]'],
    hints: ['Old Hoot: “What changes for the head gardener alone, if the garden is mirrored?”', '“Her two beds trade places. Then the same is true for every gardener below her.”', '“At each gardener: swap left and right, then do the same for both children. An empty spot needs nothing.”'],
    clues: ['every node, left and right', 'the same small job everywhere', 'the shape is mirrored'],
    kit: { right: 2, spot: 'Why swap at every gardener?', ask: 'How should Moss mirror the garden?',
      quiz: [['Reverse the bottom row', 'Flip the tips and leave the rest'], ['Swap only at the top', 'Trade the two big halves and stop'], ['Swap at every gardener', 'Swap left and right, then do the same below'], ['Sort each floor backwards', 'Line every floor up from big to small']] },
    quizFb: ['Old Hoot: “Then 2 and 7 stay put. A mirror flips every floor, not just the bottom.”', 'Old Hoot: “The halves trade sides, but inside each half the beds are still the old way round.”', 'Old Hoot: “Yes! One swap at every gardener, top to bottom, mirrors the whole garden.”', 'Old Hoot: “Sorting changes who sits where. A mirror only flips left and right.”'],
    steps
  };
}

// The Orchard Rule — Validate Binary Search Tree
function orchardScene() {
  const list = levelTree([8, 3, 10, 1, 6, null, 14, null, null, 4, 9]);
  const num = (id) => Number(list.find((n) => n.id === id).label);
  const fate = {}, tags = {}, trail = [], steps = [];
  const show = (x) => (x === -Infinity ? '−∞' : x === Infinity ? '∞' : String(x));
  const range = (lo, hi) => '(' + show(lo) + ', ' + show(hi) + ')';
  let checked = 0, broken = null;
  const snap = (kind, at, extra) => {
    const nodes = {};
    list.forEach((n) => { nodes[n.id] = fate[n.id] || 'in'; });
    trail.forEach((id, i) => { if (fate[id] !== 'hit') nodes[id] = i === trail.length - 1 ? 'cur' : 'paint'; });
    return Object.assign({ kind, nodes, edge: mossTrail(trail, list), tags: Object.assign({}, tags), actorAt: at, depthNow: trail.length, checked }, extra);
  };
  steps.push(snap('intro', list[0].id, { node: '—', lo: '—', hi: '—', inside: '—',
    dialog: [say('hoot', 'The orchard rule: every tree on a left branch is shorter than every tree above it on that side. Every tree on a right branch is taller.'), say('moss', 'So I’ll carry the allowed range down with me.'), say('hoot', 'The top tree can be any height. Each step down makes the range tighter.')],
    nar: { kid: 'Every tree must fit between a low limit and a high limit. Moss starts at the top, where any height is fine.', builder: 'check(node, lo, hi) fails if node.val is not strictly between lo and hi. Going left, hi becomes node.val. Going right, lo does.', expert: 'Checking only parent and child is not enough: the rule is about every ancestor. Passing (lo, hi) down carries all of them at O(1) per step. The range shows under each tree.' } }));
  const visit = (id, lo, hi) => {
    trail.push(id); checked++;
    const v = num(id);
    tags[id] = range(lo, hi);
    if (!(lo < v && v < hi)) {
      fate[id] = 'hit'; broken = id;
      steps.push(snap('fail', id, { node: v, lo: show(lo), hi: show(hi), inside: 'no',
        dialog: [say('moss', 'Tree ' + v + ' must be between ' + show(lo) + ' and ' + show(hi) + '. But ' + v + ' is taller than ' + show(hi) + '!'), say('hoot', 'It is fine next to 6, but it sits on the left side of 8. The rule is broken.')],
        nar: { kid: 'Tree ' + v + ' is taller than its parent 6, which is fine. But it is on the left of 8, so it must be shorter than 8. It is not. The rule is broken!', builder: 'check(' + v + ', ' + show(lo) + ', ' + show(hi) + '): ' + v + ' is not < ' + show(hi) + ' → return False.', expert: 'This is the case a parent-only check misses: ' + v + ' > 6 locally, but the ancestor 8 set hi = 8 when the walk went left.' } }));
      return false;
    }
    fate[id] = 'ok';
    steps.push(snap('check', id, { node: v, lo: show(lo), hi: show(hi), inside: 'yes',
      dialog: [say('moss', 'Tree ' + v + ' must be between ' + show(lo) + ' and ' + show(hi) + '. It is.'), say('hoot', 'Then go left with the top cut to ' + v + ', and right with the bottom raised to ' + v + '.')],
      nar: { kid: 'Tree ' + v + ' fits its limits, ' + show(lo) + ' to ' + show(hi) + '. Moss gives the trees below it new, tighter limits and walks on.', builder: show(lo) + ' < ' + v + ' < ' + show(hi) + ' ✓. Next: check(left, ' + show(lo) + ', ' + v + ') and check(right, ' + v + ', ' + show(hi) + ').', expert: 'The left side inherits hi = ' + v + ', the right side lo = ' + v + '. Each range is the tightest one all ancestors allow. Trail depth: ' + trail.length + '.' } }));
    const L = sideOf(list, id, 'L'), R = sideOf(list, id, 'R');
    if (L && !visit(L, lo, v)) return false;
    if (R && !visit(R, v, hi)) return false;
    trail.pop();
    return true;
  };
  const ok = visit(list[0].id, -Infinity, Infinity);
  const unchecked = list.length - checked;
  steps.push(snap('done', list[0].id, { node: num(list[0].id), lo: '—', hi: '—', inside: ok ? 'yes' : 'no', done: true,
    dialog: [say('moss', 'The “no” travels back up my trail to the top.'), say('hoot', 'One broken tree is enough. The other ' + unchecked + ' never need checking.')],
    nar: { kid: 'One tree broke the rule, so the whole orchard fails. Moss doesn’t need to check the last ' + unchecked + ' trees.', builder: 'Each call returns False as soon as a child does. isValidBST(root) = ' + (ok ? 'True' : 'False') + '.', expert: 'Short-circuit and: the right subtree of 8 is never visited. Worst case O(n) time, O(h) stack.' } }));
  const T = { intro: ['Any height fits at the top', 'plain'], check: ['Inside its limits → pass them down', 'cool'], fail: ['Outside its limits → rule broken', 'warn'], done: ['Not a valid orchard', 'warn'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.meter = { text: 'trees checked: ' + st.checked + ' / ' + list.length, pct: (st.checked / list.length) * 100, mark: 100, markLabel: 'all ' + list.length + ' trees' };
    st.watch = [['node', st.node, 'left'], ['low', st.lo, 'right'], ['high', st.hi, 'right'], ['inside?', st.inside, st.inside === 'no' ? 'left' : 'ok'], ['checked', st.checked, 'text'], ['open calls', st.depthNow, 'text']];
    delete st.node; delete st.lo; delete st.hi; delete st.inside; delete st.checked; delete st.depthNow;
  });
  const code = {
    py: [['def isValidBST(root):', ''], ['    def check(node, lo, hi):', ''], ['        if not node:', ''], ['            return True', '  # an empty spot is fine'], ['        if not (lo < node.val < hi):', ''], ['            return False', '  # rule broken', 'fail|done'], ['        return (check(node.left, lo, node.val) and', '  # tighter limits', 'check'], ['                check(node.right, node.val, hi))', ''], ['    return check(root, float("-inf"), float("inf"))', '', 'intro']],
    java: [['boolean isValidBST(TreeNode root) {', ''], ['    return check(root, Long.MIN_VALUE, Long.MAX_VALUE);', '', 'intro'], ['}', ''], ['boolean check(TreeNode node, long lo, long hi) {', ''], ['    if (node == null) return true;', '  // an empty spot is fine'], ['    if (node.val <= lo || node.val >= hi) return false;', '  // rule broken', 'fail|done'], ['    return check(node.left, lo, node.val)', '  // tighter limits', 'check'], ['        && check(node.right, node.val, hi);', ''], ['}', '']],
    cpp: [['bool check(TreeNode* node, long lo, long hi) {', ''], ['    if (!node) return true;', '  // an empty spot is fine'], ['    if (node->val <= lo || node->val >= hi) return false;', '  // rule broken', 'fail|done'], ['    return check(node->left, lo, node->val)', '  // tighter limits', 'check'], ['        && check(node->right, node->val, hi);', ''], ['}', ''], ['bool isValidBST(TreeNode* root) {', ''], ['    return check(root, LONG_MIN, LONG_MAX);', '', 'intro'], ['}', '']],
    js: [['function isValidBST(root) {', ''], ['  const check = (node, lo, hi) => {', ''], ['    if (!node) return true;', '  // an empty spot is fine'], ['    if (node.val <= lo || node.val >= hi) return false;', '  // rule broken', 'fail|done'], ['    return check(node.left, lo, node.val)', '  // tighter limits', 'check'], ['      && check(node.right, node.val, hi);', ''], ['  };', ''], ['  return check(root, -Infinity, Infinity);', '', 'intro'], ['}', '']],
    go: [['func isValidBST(root *TreeNode) bool {', ''], ['    var check func(n *TreeNode, lo, hi int) bool', ''], ['    check = func(n *TreeNode, lo, hi int) bool {', ''], ['        if n == nil {', ''], ['            return true', '  // an empty spot is fine'], ['        }', ''], ['        if n.Val <= lo || n.Val >= hi {', ''], ['            return false', '  // rule broken', 'fail|done'], ['        }', ''], ['        return check(n.Left, lo, n.Val) &&', '  // tighter limits', 'check'], ['            check(n.Right, n.Val, hi)', ''], ['    }', ''], ['    return check(root, math.MinInt, math.MaxInt)', '', 'intro'], ['}', '']]
  };
  return {
    id: 'validate-bst', pattern: 'Depth-First Search', cast: 'moss', short: 'Orchard', visual: 'tree', items: [], tree: list, tags: true,
    treeLabel: 'Orchard tree, with each tree’s allowed range', legend: [['in', 'not checked yet'], ['cur', 'Moss is here'], ['ok', 'fits its range'], ['hit', 'breaks the rule'], ['path', 'Moss’s trail']],
    goal: 'Does every tree obey the orchard rule?', status: ['Checking trees…', 'Answer: false'],
    lines: tagLines(code), code,
    rules: [['Start at the top: any height is allowed', 'intro'], ['Fits its range → go down with tighter limits', 'check'], ['Outside its range → the rule is broken', 'fail'], ['Pass the answer back up to the top', 'done']],
    complexity: [['O(n)', 'each tree is checked at most once'], ['O(h)', 'the trail is as long as the orchard is tall']],
    quest: ['In the orchard every tree has a height. The rule: everything on a tree’s left side is shorter than it, and everything on its right side is taller.', 'That must hold for every ancestor, not just the parent. The inspector asks Moss: does this orchard obey the rule?'],
    example: ['root = [8, 3, 10, 1, 6, null, 14, null, null, 4, 9]', 'false  (9 is on the left of 8)'],
    hints: ['Old Hoot: “Tree 9 is taller than its parent 6. Is that enough to make it fine?”', '“Each tree has a lowest and a highest height it may be, set by every tree above it.”', '“Carry a range down. Going left, the top limit becomes this tree’s height. Going right, the bottom limit does. Fail as soon as a tree is outside its range.”'],
    clues: ['left is smaller, right is bigger', 'the rule holds for every ancestor', 'one break fails the whole tree'],
    kit: { right: 2, spot: 'Why carry limits, not just compare?', ask: 'How should Moss check the orchard?',
      quiz: [['Compare each tree with its parent', 'Left child shorter, right child taller'], ['Check the top three trees', 'If the top is right, the rest follows'], ['Carry the limits down', 'Each tree must fit a range set by all trees above it'], ['Count the trees on each side', 'Both sides should have the same number']] },
    quizFb: ['Old Hoot: “Then 9 passes, since 9 > 6. But 9 sits on the left of 8, so it must be shorter than 8.”', 'Old Hoot: “The break here is three floors down. The top three trees look fine.”', 'Old Hoot: “Yes! Each step down tightens the range, so every ancestor’s rule travels with Moss.”', 'Old Hoot: “The rule is about heights, not how many trees there are. Uneven sides are allowed.”'],
    steps
  };
}

SCENE_REGISTRY.push(tallestScene, mirrorGardenScene, orchardScene);

// ---------- Your own input (see practice.js) ----------
function treeDepthOf(list) {
  const byId = {};
  list.forEach((x) => { byId[x.id] = x; });
  return Math.max.apply(null, list.map((x) => { let d = 1, at = x; while (at.parent != null) { at = byId[at.parent]; d++; } return d; }));
}
function tallestRun(input) {
  const arr = (input || SCENE_INPUT['max-depth'].default).arr.slice();
  const list = levelTree(arr);
  const val = (id) => list.find((x) => x.id === id).label;
  const fate = {}, tags = {}, trail = [], steps = [];
  let best = 0, done = 0;
  const snap = (at, extra) => {
    const nodes = {};
    list.forEach((x) => { nodes[x.id] = fate[x.id] || 'in'; });
    trail.forEach((id, i) => { nodes[id] = i === trail.length - 1 ? 'cur' : 'paint'; });
    return Object.assign({ nodes, edge: mossTrail(trail, list), tags: Object.assign({}, tags), actorAt: at, depthNow: trail.length, best, finished: done }, extra);
  };
  steps.push(runStep('intro', snap(list[0].id, { node: '—', l: '—', r: '—', ans: '—' }), [say('hoot', 'How tall is this tree of ' + list.length + (list.length === 1 ? ' branch?' : ' branches?')), say('moss', 'I’ll ask each branch how deep it goes.')],
    'Moss starts at the top branch, ' + val(list[0].id) + '. Each branch answers after its children do.', 'maxDepth(node) = 1 + max(maxDepth(left), maxDepth(right)). Empty answers 0.', 'Children first, then the parent: every branch answers once.'));
  const visit = (id) => {
    trail.push(id);
    const L = sideOf(list, id, 'L'), R = sideOf(list, id, 'R');
    if (!L && !R) {
      fate[id] = trail.length === 1 ? 'ok' : 'stored'; tags[id] = '↑1'; done++; best = Math.max(best, trail.length);
      steps.push(runStep('leaf', snap(id, { node: val(id), l: 0, r: 0, ans: 1 }), [say('moss', 'Branch ' + val(id) + ' has no children.'), say('hoot', 'So it is 1 deep.')],
        'Branch ' + val(id) + ' is a tip. Nothing grows below it, so it answers 1.', 'maxDepth(' + val(id) + ') = 1 + max(0, 0) = 1.', 'The smallest case needs no more calls. Open calls: ' + trail.length + '.'));
      trail.pop();
      return 1;
    }
    steps.push(runStep('ask', snap(id, { node: val(id), l: '?', r: '?', ans: '?' }), [say('moss', 'Branch ' + val(id) + ', how deep do you go?'), say('hoot', 'It asks ' + (L && R ? 'its two children' : 'its one child') + ' first.')],
      'Branch ' + val(id) + ' does not know yet, so it asks the branches below it first.', 'maxDepth(' + val(id) + ') calls its children and waits.', 'This call waits. Open calls: ' + trail.length + '.'));
    const a = L ? visit(L) : 0, b = R ? visit(R) : 0, ans = 1 + Math.max(a, b);
    const isRoot = trail.length === 1;
    fate[id] = isRoot ? 'ok' : 'stored'; tags[id] = '↑' + ans; done++;
    steps.push(runStep('report', snap(id, { node: val(id), l: a, r: b, ans }), [say('moss', 'Branch ' + val(id) + ' heard ' + a + ' and ' + b + '.'), say('hoot', 'The bigger one plus 1: ' + ans + '.')],
      'The answers are ' + a + ' and ' + b + '. Branch ' + val(id) + ' takes the bigger, adds 1, and answers ' + ans + '.', 'maxDepth(' + val(id) + ') = 1 + max(' + a + ', ' + b + ') = ' + ans + '.', isRoot ? 'The top branch closes last, so its answer is the height.' : 'The call returns and the trail gets shorter.'));
    trail.pop();
    return ans;
  };
  const height = visit(list[0].id);
  steps.push(runStep('done', snap(list[0].id, { node: val(list[0].id), l: '—', r: '—', ans: height, done: true }), [say('moss', 'The top branch says ' + height + '.')],
    'The answer reached the top. The tree is ' + height + (height === 1 ? ' branch' : ' branches') + ' deep.', 'maxDepth(root) returns ' + height + '.', 'Every branch answered once: O(n) time, O(h) for the trail.'));
  runFinish(steps, { intro: ['How deep is the tree?', 'plain'], ask: ['Not sure yet → ask the children', 'cool'], leaf: ['A tip → answer 1', 'warn'], report: ['Answer = 1 + the deeper child', 'warn'], done: ['The tree is ' + height + ' deep', 'ok'] }, (st) => {
    st.meter = { text: 'branches answered: ' + st.finished + ' / ' + list.length, pct: (st.finished / list.length) * 100, mark: 100, markLabel: 'all ' + list.length + ' branches' };
    st.watch = [['node', st.node, 'left'], ['left answer', st.l, 'right'], ['right answer', st.r, 'right'], ['answer', st.ans, st.done ? 'ok' : 'text'], ['deepest tip', st.best, 'text'], ['open calls', st.done ? 0 : st.depthNow, 'text']];
    ['node', 'l', 'r', 'ans', 'best', 'depthNow', 'finished'].forEach((k) => delete st[k]);
  });
  return runScene('max-depth', {
    tree: list, status: ['Asking branches…', height + ' deep'],
    example: ['root = ' + showTree({ arr }), 'answer = ' + height], answer: height, input: { arr }
  }, steps);
}
function randTreeArr() {
  const n = rint(1, 15), arr = [rint(1, 20)];
  for (let i = 1; arr.filter((x) => x != null).length < n && i < 40; i++) arr.push(Math.random() < 0.3 ? null : rint(1, 20));
  while (arr.length && arr[arr.length - 1] == null) arr.pop();
  const list = levelTree(arr);
  return list.length <= 15 && treeDepthOf(list) <= 4 ? { arr } : { arr: [rint(1, 9), rint(1, 9), rint(1, 9)] };
}
SCENE_INPUT['max-depth'] = {
  hint: 'level by level, null for a gap', example: '[8, 3, 10, 1, 6, null, 14, null, null, 4]',
  default: { arr: [8, 3, 10, 1, 6, null, 14, null, null, 4] },
  presets: [['Story example', () => ({ arr: [8, 3, 10, 1, 6, null, 14, null, null, 4] })], ['Random', randTreeArr], ['Full tree', () => ({ arr: [1, 2, 3, 4, 5, 6, 7] })], ['A single line', () => ({ arr: [1, 2, null, 3, null, 4] })]],
  random: randTreeArr,
  parse: parseTree, show: showTree,
  check: (v) => {
    if (v.arr[0] == null) return 'The first value is the top branch, so it cannot be null.';
    if (!v.arr.every((x) => x == null || (x >= -99 && x <= 99))) return 'Values must be whole numbers from −99 to 99.';
    const list = levelTree(v.arr);
    if (list.length > 15) return 'Use at most 15 branches, so the tree stays readable.';
    return treeDepthOf(list) > 4 ? 'Keep the tree 4 levels deep or less, so it fits the stage.' : '';
  },
  make: tallestRun
};
