// ---------- Backtracking: the marker, who marks every path and rubs it out on the way back ----------
// The picture is a visual: 'tree', the decision tree. Each stop is one set of choices; the chalk trail runs from the start to where
// the marker stands. Stops appear the moment the marker first reaches them, so the tree grows exactly as the code explores it.

// Shared bookkeeping for the three stories: the stops seen so far, what became of each one, and the current trail.
function chalkBook() {
  const B = { list: [], fate: {}, trail: [] };
  B.node = (id, label, parent) => { if (!B.list.some((n) => n.id === id)) B.list.push({ id, label, parent }); };
  // fate: 'ok' answer written down, 'future' explored and rubbed out, 'out' too dear, never entered
  B.look = () => {
    const nodes = {}, edge = {};
    B.list.forEach((n) => { if (B.fate[n.id]) nodes[n.id] = B.fate[n.id]; });
    B.trail.forEach((id, i) => { nodes[id] = i === B.trail.length - 1 ? 'cur' : 'paint'; });
    B.list.forEach((n) => { if (n.parent != null && nodes[n.id]) edge[n.id] = B.trail.includes(n.id) ? 'path' : nodes[n.id] === 'out' ? 'out' : ''; });
    return { nodes, edge, actorAt: B.trail.length ? B.trail[B.trail.length - 1] : B.list[0].id };
  };
  return B;
}
const listText = (xs) => xs.join(', ').replace(/, ([^,]*)$/, ' and $1');

// The Picnic Basket Choices — Subsets
function basketScene() {
  const nums = [1, 2, 3], total = 2 ** nums.length;
  const B = chalkBook(), out = [], path = [], steps = [];
  const idOf = (p) => 'b' + p.join('');
  const name = (p) => (p.length ? '{' + p.join(',') + '}' : '{ }');
  let popped = [], start = 0;
  const snap = (kind, extra) => Object.assign({ kind, path: path.slice(), start, count: out.length }, B.look(), extra);
  B.node('b', '{ }', null); B.trail = ['b']; B.fate.b = 'ok'; out.push([]);
  steps.push(snap('intro', { snack: '—',
    dialog: [say('narr', 'Three snacks: 1, 2 and 3. How many different baskets can you pack?'), say('marker', 'I’ll take one path for each basket, and mark each snack I put in.'), say('narr', 'The empty basket counts too. Write it down first.')],
    nar: { kid: 'The marker starts at the top with an empty basket. Even an empty basket is a choice, so he writes it on his list.', builder: 'dfs(0) starts with path = []. Its first line records a copy of path, so [] is answer 1.', expert: 'Each call records its path on entry, so every node of this tree is one subset. A set of n items has 2ⁿ subsets: here 2³ = 8.' } }));
  const undoStep = () => {
    if (!popped.length) return;
    const back = name(path);
    steps.push(snap('undo', { snack: popped[popped.length - 1],
      dialog: [say('marker', 'Nothing more to add here. I take out ' + listText(popped) + ' and rub out the mark' + (popped.length > 1 ? 's' : '') + '.'), say('narr', 'Now you stand at ' + back + ' again, just as before.')],
      nar: { kid: 'No snacks are left to try down there. The marker takes ' + listText(popped) + ' back out and walks up to ' + back + '.', builder: popped.map(() => 'path.pop()').join(', ') + ' → path = [' + path.join(', ') + ']. The loop at ' + back + ' tries its next snack.', expert: 'Un-choosing puts path back exactly as it was before the choice, so one shared list serves every branch. Open calls: ' + (path.length + 1) + '.' } }));
    popped = [];
  };
  const dfs = (s) => {
    for (let j = s; j < nums.length; j++) {
      undoStep();
      const from = name(path);
      path.push(nums[j]); start = j + 1;
      const id = idOf(path);
      B.node(id, name(path), idOf(path.slice(0, -1))); B.trail.push(id); B.fate[id] = 'ok'; out.push(path.slice());
      steps.push(snap('choose', { snack: nums[j],
        dialog: [say('marker', 'From ' + from + ', I put snack ' + nums[j] + ' in and step down.'), say('narr', 'The basket is ' + name(path) + '. New, so write it down. That makes ' + out.length + '.')],
        nar: { kid: 'The marker puts snack ' + nums[j] + ' in the basket and marks it. The basket is now ' + name(path) + '. He writes it on the list.', builder: 'path.append(' + nums[j] + ') → path = [' + path.join(', ') + ']. Then dfs(' + (j + 1) + ') records it. Baskets so far: ' + out.length + '.', expert: 'The next call starts at index ' + (j + 1) + ', so a snack is only ever added after the ones already in. That is why {2,1} never appears next to {1,2}.' } }));
      dfs(j + 1);
      B.trail.pop(); path.pop(); popped.push(nums[j]); start = s;
    }
  };
  dfs(0);
  undoStep();
  B.trail = [];
  steps.push(snap('done', { snack: '—', done: true, actorAt: 'b',
    dialog: [say('marker', 'Back at the top. Every snack has been tried in every spot.'), say('narr', 'And each stop on the tree is one basket: ' + out.length + ' in all.')],
    nar: { kid: 'The marker is back at the start. Every stop on the tree is a different basket, so he has all ' + out.length + ' of them.', builder: 'dfs(0) returns. out holds ' + out.length + ' lists: ' + out.map((p) => '[' + p.join(',') + ']').join(' ') + '.', expert: '2ⁿ subsets, each copied in O(n): O(n·2ⁿ) time. The path and the call stack are O(n) deep, not counting the output.' } }));
  const T = { intro: ['Write down the empty basket', 'plain'], choose: ['Choose → step down', 'cool'], undo: ['Un-choose → step back up', 'warn'], done: [out.length + ' baskets found!', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.meter = { text: 'baskets: ' + st.count + ' / ' + total, pct: (st.count / total) * 100, mark: 100, markLabel: 'all ' + total + ' baskets' };
    st.watch = [['start', st.start, 'left'], ['snack', st.snack, 'left'], ['path', '[' + st.path.join(',') + ']', 'right'], ['depth', st.path.length, 'right'], ['baskets', st.count, st.done ? 'ok' : 'text'], ['open calls', st.done ? 0 : st.path.length + 1, 'text']];
    delete st.path; delete st.start; delete st.count; delete st.snack;
  });
  const code = {
    py: [['def subsets(nums):', ''], ['    out, path = [], []', ''], ['    def dfs(start):', ''], ['        out.append(path[:])', '  # write the basket down'], ['        for j in range(start, len(nums)):', ''], ['            path.append(nums[j])', '  # choose', 'choose'], ['            dfs(j + 1)', '  # explore'], ['            path.pop()', '  # un-choose', 'undo'], ['    dfs(0)', '', 'intro'], ['    return out', '', 'done']],
    java: [['List<List<Integer>> subsets(int[] nums) {', ''], ['    List<List<Integer>> out = new ArrayList<>();', ''], ['    dfs(nums, 0, new ArrayList<>(), out);', '', 'intro'], ['    return out;', '', 'done'], ['}', ''], ['void dfs(int[] nums, int start, List<Integer> path, List<List<Integer>> out) {', ''], ['    out.add(new ArrayList<>(path));', '  // write it down'], ['    for (int j = start; j < nums.length; j++) {', ''], ['        path.add(nums[j]);', '  // choose', 'choose'], ['        dfs(nums, j + 1, path, out);', '  // explore'], ['        path.remove(path.size() - 1);', '  // un-choose', 'undo'], ['    }', ''], ['}', '']],
    cpp: [['void dfs(vector<int>& nums, int start, vector<int>& path, vector<vector<int>>& out) {', ''], ['    out.push_back(path);', '  // write it down'], ['    for (int j = start; j < nums.size(); j++) {', ''], ['        path.push_back(nums[j]);', '  // choose', 'choose'], ['        dfs(nums, j + 1, path, out);', '  // explore'], ['        path.pop_back();', '  // un-choose', 'undo'], ['    }', ''], ['}', ''], ['vector<vector<int>> subsets(vector<int>& nums) {', ''], ['    vector<vector<int>> out; vector<int> path;', ''], ['    dfs(nums, 0, path, out);', '', 'intro'], ['    return out;', '', 'done'], ['}', '']],
    js: [['function subsets(nums) {', ''], ['  const out = [], path = [];', ''], ['  const dfs = (start) => {', ''], ['    out.push([...path]);', '  // write it down'], ['    for (let j = start; j < nums.length; j++) {', ''], ['      path.push(nums[j]);', '  // choose', 'choose'], ['      dfs(j + 1);', '  // explore'], ['      path.pop();', '  // un-choose', 'undo'], ['    }', ''], ['  };', ''], ['  dfs(0);', '', 'intro'], ['  return out;', '', 'done'], ['}', '']],
    go: [['func subsets(nums []int) [][]int {', ''], ['    out, path := [][]int{}, []int{}', ''], ['    var dfs func(start int)', ''], ['    dfs = func(start int) {', ''], ['        out = append(out, append([]int{}, path...))', ''], ['        for j := start; j < len(nums); j++ {', ''], ['            path = append(path, nums[j])', '  // choose', 'choose'], ['            dfs(j + 1)', '  // explore'], ['            path = path[:len(path)-1]', '  // un-choose', 'undo'], ['        }', ''], ['    }', ''], ['    dfs(0)', '', 'intro'], ['    return out', '', 'done'], ['}', '']]
  };
  return {
    id: 'subsets', pattern: 'Backtracking', cast: 'marker', short: 'Baskets', visual: 'tree', items: [], tree: B.list,
    treeLabel: 'Decision tree of baskets', legend: [['cur', 'The marker is here'], ['paint', 'chosen: on the trail'], ['ok', 'basket written down']],
    goal: 'List every basket you can pack from 3 snacks.', status: ['Packing baskets…', out.length + ' baskets'],
    lines: tagLines(code), code,
    rules: [['Start empty and write that basket down', 'intro'], ['Put the next snack in and step down', 'choose'], ['Take it back out and step up', 'undo'], ['Back at the top → the list is complete', 'done']],
    complexity: [['O(n·2ⁿ)', '2ⁿ baskets, each copied onto the list'], ['O(n)', 'the trail is at most n snacks deep (plus the list itself)']],
    quest: ['The marker is packing for a picnic. There are three snacks on the table, numbered 1, 2 and 3. A basket can hold any of them, or none.', 'The picnic club wants a list of every different basket, with no basket listed twice. Order inside a basket does not matter.'],
    example: ['nums = [1, 2, 3]', '[ ] [1] [1,2] [1,2,3] [1,3] [2] [2,3] [3]'],
    hints: ['“Every snack is either in or out. How many baskets does that make for three snacks?”', '“Build a basket one snack at a time. After each choice, write the basket down, then try adding a later snack.”', '“Choose a snack, explore from there, then take it back out before you try the next one. Only add snacks that come after the last one, so no basket repeats.”'],
    clues: ['list every possible group', 'each item is in or out', 'no group listed twice'],
    quizFb: ['“Taking the best snack each time builds just one basket. We need all eight.”', '“Yes! Choose a snack, explore, then rub it out and try the next. Every basket shows up exactly once.”', '“Two friends from both ends look for one pair. A basket can hold any number of snacks.”', '“Starting over for each basket works, but you would rebuild the same beginnings again and again.”'],
    steps
  };
}

// The Seating Chart — Permutations
function seatingScene() {
  const guests = [1, 2, 3], n = guests.length;
  const B = chalkBook(), out = [], path = [], used = new Set(), steps = [];
  const idOf = (p) => 'p' + p.join('');
  const name = (p) => (p.length ? p.join(' ') : 'start');
  let popped = [];
  const board = () => out.map((p, i) => ['#' + (i + 1), p.join(' '), i === out.length - 1 ? 'fresh' : '']).reverse();
  const snap = (kind, extra) => Object.assign({ kind, path: path.slice(), used: [...used], count: out.length, board: board() }, B.look(), extra);
  B.node('p', 'start', null); B.trail = ['p']; B.fate.p = 'future';
  steps.push(snap('intro', { guest: '—',
    dialog: [say('narr', 'Three guests, three chairs in a row. In how many orders can they sit?'), say('marker', 'I’ll fill one chair at a time and chalk each guest who is seated.'), say('narr', 'When a row is full, write it down. Then stand someone up and try again.')],
    nar: { kid: 'Three chairs are empty. The marker will seat guests one chair at a time. Each full row is one seating for the list.', builder: 'dfs() starts with path = [] and used = {}. A path of length 3 is a full seating.', expert: 'Each level of the tree fills one chair. Level k has n − k free guests, so there are n! = 3·2·1 = 6 leaves.' } }));
  const undoStep = () => {
    if (!popped.length) return;
    const back = name(path);
    steps.push(snap('undo', { guest: popped[popped.length - 1],
      dialog: [say('marker', 'No one else can sit here. I stand up guest' + (popped.length > 1 ? 's ' : ' ') + listText(popped) + ' and rub out the chalk.'), say('narr', 'Back at “' + back + '”. Who has not had a turn in the next chair?')],
      nar: { kid: 'Every guest has had a turn in that chair. The marker stands up guest ' + listText(popped) + ' and walks back up to “' + back + '”.', builder: popped.map((g) => 'pop ' + g).join(', ') + ' → path = [' + path.join(', ') + '], used = {' + [...used].join(', ') + '}. The loop tries the next guest.', expert: 'Removing the guest from both path and used undoes the choice completely, so the next branch starts clean. Depth back to ' + path.length + '.' } }));
    popped = [];
  };
  const dfs = () => {
    if (path.length === n) { out.push(path.slice()); return true; }
    for (const g of guests) {
      if (used.has(g)) continue;
      undoStep();
      const from = name(path);
      used.add(g); path.push(g);
      const id = idOf(path);
      B.node(id, name(path), idOf(path.slice(0, -1))); B.trail.push(id);
      if (path.length === n) {
        out.push(path.slice()); B.fate[id] = 'ok';
        steps.push(snap('seat', { guest: g,
          dialog: [say('marker', 'Guest ' + g + ' takes the last chair. The row reads ' + path.join(' ') + '.'), say('narr', 'All three chairs full. That is seating ' + out.length + '. Write it down.')],
          nar: { kid: 'Guest ' + g + ' sits in the last chair. The row is full: ' + path.join(' ') + '. The marker writes it on the list.', builder: 'path = [' + path.join(', ') + '], len(path) == 3 → out.append(path[:]). Seatings: ' + out.length + '.', expert: 'A leaf is a full permutation. It is copied, because path keeps changing after this call returns.' } }));
        path.pop(); used.delete(g); B.trail.pop(); popped.push(g);
        continue;
      }
      B.fate[id] = 'future';
      steps.push(snap('choose', { guest: g,
        dialog: [say('marker', 'From “' + from + '”, guest ' + g + ' sits in chair ' + path.length + '. The marker mark on.'), say('narr', 'Now step down and fill the next chair.')],
        nar: { kid: 'Guest ' + g + ' is free, so the marker seats them in chair ' + path.length + ' and marks them. Then he moves on to the next chair.', builder: 'used.add(' + g + '); path.append(' + g + ') → path = [' + path.join(', ') + ']. Call dfs() for chair ' + (path.length + 1) + '.', expert: 'The used set makes the “is this guest free?” check O(1). Each choice shrinks the free set by one.' } }));
      dfs();
      path.pop(); used.delete(g); B.trail.pop(); popped.push(g);
    }
    return false;
  };
  dfs();
  undoStep();
  B.trail = [];
  steps.push(snap('done', { guest: '—', done: true, actorAt: 'p',
    dialog: [say('marker', 'Every guest has had a turn in every chair.'), say('narr', 'Six seatings, and no row written twice.')],
    nar: { kid: 'The marker is back at the start with no chalk left on anyone. He found all ' + out.length + ' ways to seat the guests.', builder: 'dfs() returns. out holds ' + out.length + ' seatings: ' + out.map((p) => p.join('')).join(', ') + '.', expert: 'n! leaves, each copied in O(n): O(n·n!) time. The path, the used set and the stack are O(n), not counting the output.' } }));
  const T = { intro: ['Three empty chairs', 'plain'], choose: ['Choose → seat a guest', 'cool'], seat: ['Row full → write it down', 'ok'], undo: ['Un-choose → stand them up', 'warn'], done: [out.length + ' seatings found!', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    st.meter = { text: 'seatings: ' + st.count + ' / 6', pct: (st.count / 6) * 100, mark: 100, markLabel: '3! = 6 rows' };
    st.watch = [['guest', st.guest, 'left'], ['path', '[' + st.path.join(',') + ']', 'right'], ['used', '{' + st.used.join(',') + '}', 'right'], ['chairs left', n - st.path.length, 'text'], ['seatings', st.count, st.done ? 'ok' : 'text'], ['depth', st.path.length, 'text']];
    delete st.path; delete st.used; delete st.count; delete st.guest;
  });
  const code = {
    py: [['def permute(nums):', ''], ['    out, path, used = [], [], set()', ''], ['    def dfs():', ''], ['        if len(path) == len(nums):', ''], ['            out.append(path[:])', '  # a full row', 'seat'], ['            return', ''], ['        for x in nums:', ''], ['            if x in used:', ''], ['                continue', '  # already seated'], ['            used.add(x); path.append(x)', '  # choose', 'choose'], ['            dfs()', '  # explore'], ['            path.pop(); used.remove(x)', '  # un-choose', 'undo'], ['    dfs()', '', 'intro'], ['    return out', '', 'done']],
    java: [['List<List<Integer>> permute(int[] nums) {', ''], ['    List<List<Integer>> out = new ArrayList<>();', ''], ['    dfs(nums, new ArrayList<>(), new boolean[nums.length], out);', '', 'intro'], ['    return out;', '', 'done'], ['}', ''], ['void dfs(int[] nums, List<Integer> path, boolean[] used, List<List<Integer>> out) {', ''], ['    if (path.size() == nums.length) {', ''], ['        out.add(new ArrayList<>(path));', '  // a full row', 'seat'], ['        return;', ''], ['    }', ''], ['    for (int i = 0; i < nums.length; i++) {', ''], ['        if (used[i]) continue;', '  // already seated'], ['        used[i] = true; path.add(nums[i]);', '  // choose', 'choose'], ['        dfs(nums, path, used, out);', '  // explore'], ['        path.remove(path.size() - 1); used[i] = false;', '  // un-choose', 'undo'], ['    }', ''], ['}', '']],
    cpp: [['void dfs(vector<int>& nums, vector<int>& path, vector<bool>& used, vector<vector<int>>& out) {', ''], ['    if (path.size() == nums.size()) {', ''], ['        out.push_back(path);', '  // a full row', 'seat'], ['        return;', ''], ['    }', ''], ['    for (int i = 0; i < nums.size(); i++) {', ''], ['        if (used[i]) continue;', '  // already seated'], ['        used[i] = true; path.push_back(nums[i]);', '  // choose', 'choose'], ['        dfs(nums, path, used, out);', '  // explore'], ['        path.pop_back(); used[i] = false;', '  // un-choose', 'undo'], ['    }', ''], ['}', ''], ['vector<vector<int>> permute(vector<int>& nums) {', ''], ['    vector<vector<int>> out; vector<int> path;', ''], ['    vector<bool> used(nums.size(), false);', ''], ['    dfs(nums, path, used, out);', '', 'intro'], ['    return out;', '', 'done'], ['}', '']],
    js: [['function permute(nums) {', ''], ['  const out = [], path = [], used = new Set();', ''], ['  const dfs = () => {', ''], ['    if (path.length === nums.length) {', ''], ['      out.push([...path]);', '  // a full row', 'seat'], ['      return;', ''], ['    }', ''], ['    for (const x of nums) {', ''], ['      if (used.has(x)) continue;', '  // already seated'], ['      used.add(x); path.push(x);', '  // choose', 'choose'], ['      dfs();', '  // explore'], ['      path.pop(); used.delete(x);', '  // un-choose', 'undo'], ['    }', ''], ['  };', ''], ['  dfs();', '', 'intro'], ['  return out;', '', 'done'], ['}', '']],
    go: [['func permute(nums []int) [][]int {', ''], ['    out, path := [][]int{}, []int{}', ''], ['    used := make([]bool, len(nums))', ''], ['    var dfs func()', ''], ['    dfs = func() {', ''], ['        if len(path) == len(nums) {', ''], ['            out = append(out, append([]int{}, path...))', '  // a full row', 'seat'], ['            return', ''], ['        }', ''], ['        for i, x := range nums {', ''], ['            if used[i] { continue }', '  // already seated'], ['            used[i] = true; path = append(path, x)', '  // choose', 'choose'], ['            dfs()', '  // explore'], ['            path = path[:len(path)-1]; used[i] = false', '  // un-choose', 'undo'], ['        }', ''], ['    }', ''], ['    dfs()', '', 'intro'], ['    return out', '', 'done'], ['}', '']]
  };
  return {
    id: 'permutations', pattern: 'Backtracking', cast: 'marker', short: 'Seating', visual: 'tree', items: [], tree: B.list,
    treeLabel: 'Decision tree of seatings', legend: [['cur', 'The marker is here'], ['paint', 'seated: on the trail'], ['future', 'tried, rubbed out'], ['ok', 'full row written down']],
    board: true, boardTitle: 'Seatings',
    goal: 'Find every order the 3 guests can sit in.', status: ['Seating guests…', out.length + ' seatings'],
    lines: tagLines(code), code,
    rules: [['Three empty chairs, no one seated', 'intro'], ['Seat a free guest in the next chair', 'choose'], ['Last chair filled → write the row down', 'seat'], ['Stand the guest up and rub out the chalk', 'undo'], ['Back at the start → every order found', 'done']],
    complexity: [['O(n·n!)', 'n! full rows, each copied onto the list'], ['O(n)', 'the trail and the seated set hold at most n guests']],
    quest: ['Three guests, numbered 1, 2 and 3, are coming to dinner. There are three chairs in a row.', 'The host wants a list of every possible seating order, each one exactly once, so she can pick her favourite.'],
    example: ['nums = [1, 2, 3]', '123 132 213 231 312 321'],
    hints: ['“How many guests could sit in the first chair? And once one is seated, how many are left for the second?”', '“Fill the chairs one at a time. Keep track of who is already seated so nobody sits twice.”', '“Seat a free guest, fill the rest of the row, then stand that guest up and seat the next free one in the same chair.”'],
    clues: ['every order of the items', 'each item used once per order', 'list them all'],
    quizFb: ['“Seating the best guest first gives one row. We need every row.”', '“Yes! Seat someone, fill the rest, then stand them up and try the next guest in that chair.”', '“Two friends from both ends swap a pair. They cannot list all six orders.”', '“Starting over for every row repeats the same first chairs again and again.”'],
    steps
  };
}

// The Exact Price Basket — Combination Sum
function priceScene() {
  const prices = [2, 3], target = 6;
  const B = chalkBook(), out = [], path = [], steps = [];
  const idOf = (p) => 'c' + p.join('');
  const name = (p) => (p.length ? p.join('+') : 'start');
  const sum = (p) => p.reduce((a, b) => a + b, 0);
  let popped = [];
  const board = () => out.map((p, i) => [p.join('+'), '= ' + target, i === out.length - 1 ? 'fresh' : '']).reverse();
  const tags = {};
  const snap = (kind, extra) => Object.assign({ kind, path: path.slice(), count: out.length, board: board(), tags: Object.assign({}, tags) }, B.look(), extra);
  B.node('c', 'start', null); B.trail = ['c']; B.fate.c = 'future'; tags.c = 0;
  steps.push(snap('intro', { item: '—', start: 0,
    dialog: [say('narr', 'The shop sells items for 2 and 3 coins. You may buy each as often as you like. Which baskets cost exactly 6?'), say('marker', 'I’ll add items cheapest first, and never go back to a cheaper one.'), say('narr', 'Good. Then 2+3 and 3+2 can’t both turn up.')],
    nar: { kid: 'The marker has an empty basket that costs 0. He will add items one at a time until the price is exactly 6.', builder: 'Sort the prices: [2, 3]. dfs(start = 0, total = 0). Each call may only add items from index start onward.', expert: 'Only adding items at index ≥ start keeps every basket in sorted order, so each multiset is built once. The number under each stop is the running total.' } }));
  const undoStep = () => {
    if (!popped.length) return;
    const back = name(path);
    steps.push(snap('undo', { item: popped[popped.length - 1], start: '—',
      dialog: [say('marker', 'Nothing more fits down there. I take out ' + listText(popped) + ' and rub out the chalk.'), say('narr', 'Back at ' + back + ', which costs ' + sum(path) + '. Try the next item.')],
      nar: { kid: 'Every choice below was tried. The marker takes ' + listText(popped) + ' back out of the basket and walks up to ' + back + '.', builder: popped.map(() => 'path.pop()').join(', ') + ' → path = [' + path.join(', ') + '], total = ' + sum(path) + '.', expert: 'Each return hands control back to the caller’s loop, which then tries its next index. Depth back to ' + path.length + '.' } }));
    popped = [];
  };
  const dfs = (start, total) => {
    for (let j = start; j < prices.length; j++) {
      const p = prices[j];
      if (total + p > target) {
        undoStep();
        const tryPath = path.concat([p]), id = idOf(tryPath);
        B.node(id, name(tryPath), idOf(path)); B.fate[id] = 'out'; tags[id] = total + p;
        steps.push(snap('prune', { item: p, start,
          dialog: [say('marker', 'Adding a ' + p + ' makes ' + (total + p) + '. That is more than ' + target + '.'), say('narr', 'So don’t step down. The items after it cost even more, so stop here.')],
          nar: { kid: 'The marker checks before he steps: ' + total + ' + ' + p + ' = ' + (total + p) + ', too much. He doesn’t go down that path at all.', builder: total + ' + ' + p + ' > ' + target + ' → break. The prices are sorted, so every later item is too dear as well.', expert: 'Pruning: a branch that already overshoots can never come back to ' + target + ', so its whole subtree is skipped. Sorting lets one break cut all later siblings too.' } }));
        break;
      }
      undoStep();
      const from = name(path);
      path.push(p);
      const id = idOf(path);
      B.node(id, name(path), idOf(path.slice(0, -1))); B.trail.push(id); tags[id] = total + p;
      if (total + p === target) {
        out.push(path.slice()); B.fate[id] = 'ok';
        steps.push(snap('found', { item: p, start: j,
          dialog: [say('marker', 'A ' + p + ' brings the price to exactly ' + target + '!'), say('narr', 'Write down ' + path.join(' + ') + '. That is basket ' + out.length + '.')],
          nar: { kid: 'The marker adds a ' + p + '. Now the basket costs exactly ' + target + '. He writes ' + path.join(' + ') + ' on the list.', builder: 'path = [' + path.join(', ') + '], total = ' + target + ' == target → out.append(path[:]) and return.', expert: 'Hitting the target ends this branch: any further item would overshoot, since every price is positive.' } }));
      } else {
        B.fate[id] = 'future';
        steps.push(snap('choose', { item: p, start: j,
          dialog: [say('marker', 'From ' + from + ', I add a ' + p + '. The basket costs ' + (total + p) + '.'), say('narr', 'Still under ' + target + '. Step down and keep adding.')],
          nar: { kid: 'The marker puts a ' + p + '-coin item in and marks it. The basket now costs ' + (total + p) + '. That is still less than ' + target + '.', builder: 'path.append(' + p + ') → path = [' + path.join(', ') + ']. Call dfs(' + j + ', ' + (total + p) + '): start stays ' + j + ', so a ' + p + ' may be added again.', expert: 'Passing j (not j + 1) allows reuse of the same item. Never going below j keeps baskets in order, so there are no repeats.' } }));
        dfs(j, total + p);
      }
      path.pop(); B.trail.pop(); popped.push(p);
    }
  };
  dfs(0, 0);
  undoStep();
  B.trail = [];
  steps.push(snap('done', { item: '—', start: '—', done: true, actorAt: 'c',
    dialog: [say('marker', 'Back at the start. Every basket under 6 has been tried.'), say('narr', 'Two baskets cost exactly 6: ' + out.map((p) => p.join('+')).join(' and ') + '.')],
    nar: { kid: 'The marker is back at the start with no chalk left. He found ' + out.length + ' baskets that cost exactly ' + target + '.', builder: 'dfs(0, 0) returns. out = ' + out.map((p) => '[' + p.join(',') + ']').join(', ') + '.', expert: 'The tree is at most target / min(price) deep. The worst case is exponential in that depth, which pruning keeps small in practice.' } }));
  const T = { intro: ['An empty basket costs 0', 'plain'], choose: ['Choose → add an item', 'cool'], found: ['Exactly ' + target + ' → write it down', 'ok'], prune: ['Too dear → don’t step down', 'warn'], undo: ['Un-choose → take it back out', 'warn'], done: [out.length + ' baskets found!', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done;
    const tot = sum(st.path);
    st.meter = { text: 'basket costs: ' + tot + ' / ' + target, pct: (tot / target) * 100, mark: 100, markLabel: 'target ' + target };
    st.watch = [['item', st.item, 'left'], ['start', st.start, 'left'], ['path', '[' + st.path.join(',') + ']', 'right'], ['total', tot, tot === target ? 'ok' : 'right'], ['left to spend', target - tot, 'text'], ['baskets', st.count, st.done ? 'ok' : 'text']];
    delete st.path; delete st.count; delete st.item; delete st.start;
  });
  const code = {
    py: [['def combinationSum(prices, target):', ''], ['    prices.sort()', ''], ['    out, path = [], []', ''], ['    def dfs(start, total):', ''], ['        if total == target:', ''], ['            out.append(path[:])', '  # exactly right', 'found'], ['            return', ''], ['        for j in range(start, len(prices)):', ''], ['            if total + prices[j] > target:', ''], ['                break', '  # too dear: skip the rest', 'prune'], ['            path.append(prices[j])', '  # choose', 'choose'], ['            dfs(j, total + prices[j])', '  # explore'], ['            path.pop()', '  # un-choose', 'undo'], ['    dfs(0, 0)', '', 'intro'], ['    return out', '', 'done']],
    java: [['List<List<Integer>> combinationSum(int[] prices, int target) {', ''], ['    Arrays.sort(prices);', ''], ['    List<List<Integer>> out = new ArrayList<>();', ''], ['    dfs(prices, target, 0, 0, new ArrayList<>(), out);', '', 'intro'], ['    return out;', '', 'done'], ['}', ''], ['void dfs(int[] p, int target, int start, int total, List<Integer> path, List<List<Integer>> out) {', ''], ['    if (total == target) {', ''], ['        out.add(new ArrayList<>(path));', '  // exactly right', 'found'], ['        return;', ''], ['    }', ''], ['    for (int j = start; j < p.length; j++) {', ''], ['        if (total + p[j] > target) break;', '  // too dear', 'prune'], ['        path.add(p[j]);', '  // choose', 'choose'], ['        dfs(p, target, j, total + p[j], path, out);', '  // explore'], ['        path.remove(path.size() - 1);', '  // un-choose', 'undo'], ['    }', ''], ['}', '']],
    cpp: [['void dfs(vector<int>& p, int target, int start, int total, vector<int>& path, vector<vector<int>>& out) {', ''], ['    if (total == target) {', ''], ['        out.push_back(path);', '  // exactly right', 'found'], ['        return;', ''], ['    }', ''], ['    for (int j = start; j < p.size(); j++) {', ''], ['        if (total + p[j] > target) break;', '  // too dear', 'prune'], ['        path.push_back(p[j]);', '  // choose', 'choose'], ['        dfs(p, target, j, total + p[j], path, out);', '  // explore'], ['        path.pop_back();', '  // un-choose', 'undo'], ['    }', ''], ['}', ''], ['vector<vector<int>> combinationSum(vector<int>& prices, int target) {', ''], ['    sort(prices.begin(), prices.end());', ''], ['    vector<vector<int>> out; vector<int> path;', ''], ['    dfs(prices, target, 0, 0, path, out);', '', 'intro'], ['    return out;', '', 'done'], ['}', '']],
    js: [['function combinationSum(prices, target) {', ''], ['  prices.sort((a, b) => a - b);', ''], ['  const out = [], path = [];', ''], ['  const dfs = (start, total) => {', ''], ['    if (total === target) {', ''], ['      out.push([...path]);', '  // exactly right', 'found'], ['      return;', ''], ['    }', ''], ['    for (let j = start; j < prices.length; j++) {', ''], ['      if (total + prices[j] > target) break;', '  // too dear', 'prune'], ['      path.push(prices[j]);', '  // choose', 'choose'], ['      dfs(j, total + prices[j]);', '  // explore'], ['      path.pop();', '  // un-choose', 'undo'], ['    }', ''], ['  };', ''], ['  dfs(0, 0);', '', 'intro'], ['  return out;', '', 'done'], ['}', '']],
    go: [['func combinationSum(prices []int, target int) [][]int {', ''], ['    sort.Ints(prices)', ''], ['    out, path := [][]int{}, []int{}', ''], ['    var dfs func(start, total int)', ''], ['    dfs = func(start, total int) {', ''], ['        if total == target {', ''], ['            out = append(out, append([]int{}, path...))', '  // exactly right', 'found'], ['            return', ''], ['        }', ''], ['        for j := start; j < len(prices); j++ {', ''], ['            if total+prices[j] > target { break }', '  // too dear', 'prune'], ['            path = append(path, prices[j])', '  // choose', 'choose'], ['            dfs(j, total+prices[j])', '  // explore'], ['            path = path[:len(path)-1]', '  // un-choose', 'undo'], ['        }', ''], ['    }', ''], ['    dfs(0, 0)', '', 'intro'], ['    return out', '', 'done'], ['}', '']]
  };
  return {
    id: 'combination-sum', pattern: 'Backtracking', cast: 'marker', short: 'Price', visual: 'tree', items: [], tree: B.list, tags: true,
    treeLabel: 'Decision tree of baskets, with each basket’s price', legend: [['cur', 'The marker is here'], ['paint', 'chosen: on the trail'], ['future', 'tried, rubbed out'], ['ok', 'costs exactly 6'], ['out', 'too dear: skipped']],
    board: true, boardTitle: 'Baskets of 6',
    goal: 'Find every basket that costs exactly 6 coins.', status: ['Filling baskets…', out.length + ' baskets'],
    lines: tagLines(code), code,
    rules: [['Start with an empty basket that costs 0', 'intro'], ['Add an item from here on and step down', 'choose'], ['Costs exactly the target → write it down', 'found'], ['Next item overshoots → stop trying this stop', 'prune'], ['Take the item back out and step up', 'undo'], ['Back at the start → every basket found', 'done']],
    complexity: [['O(k·2ᵗ)', 'roughly: t = target ÷ cheapest price is the deepest the tree can go, k is a basket’s length'], ['O(t)', 'the trail is at most t items deep (plus the list itself)']],
    quest: ['A little shop sells two items: one costs 2 coins and one costs 3. You can buy the same item as many times as you like.', 'The marker has exactly 6 coins and wants to spend every one. Which baskets cost exactly 6? A basket of 2+3 is the same as 3+2.'],
    example: ['prices = [2, 3], target = 6', '[2, 2, 2] and [3, 3]'],
    hints: ['“If a basket already costs more than 6, can adding more ever fix it?”', '“Add items one at a time. When the price is exactly 6, write the basket down. When it would go over, stop.”', '“Only add items at or after the last one you added. 2 then 3 is allowed, 3 then 2 is not. That stops repeats.”'],
    clues: ['reach an exact total', 'items can be reused', 'order does not matter'],
    quizFb: ['“Taking the dearest item first finds 3+3, but it misses 2+2+2.”', '“Yes! Add an item, explore, then take it out and try the next. Stop early when the price runs over.”', '“Two friends from both ends find a pair. Here a basket can hold three items or more.”', '“Starting from an empty basket every time redoes the same first steps again and again.”'],
    steps
  };
}

SCENE_REGISTRY.push(basketScene, seatingScene, priceScene);
PATTERN_KITS['Backtracking'] = { right: 1, spot: 'Why rub out, not start over?', ask: 'How should the marker find every answer?',
  quiz: [['Take the best choice each time', 'Pick whatever looks best and never look back'], ['Choose, explore, un-choose', 'Mark a choice, go deeper, then rub it out and try the next'], ['Two friends from both ends', 'One at each end, walking inward'], ['Start over for every answer', 'Build each answer again from nothing']] };
STORY_CAST.marker = { name: 'Marker', initial: 'M', color: 'right', radius: '6px' };
