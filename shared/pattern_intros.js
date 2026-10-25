// @@INTROS@@ — generated block (from shared/pattern_intros.js): the pattern map and the "use it when" cards.
// PATTERN_MAP: our own order for learning the 16 patterns and the sheet-only groups. An edge [a, b] means "learn a before b".
// Nodes are placed by hand on a grid: col 0-5 runs left to right, row 0-9 top to bottom. No physics, no auto layout.
// PATTERN_INTROS: one card per node. The "use it when" line itself is PATTERN_WHEN in shared/catalog.js (one source).
// Every text field is our own plain words, at most 280 characters.
// companion = the role that stands for the pattern in its story, from PATTERNS (the guide, for sheet-only groups).
// stories = catalog ids (PROBLEMS), sheet = sheet slugs (SHEET), run = spec ids (TEST_SPECS). tests/mapcheck.js checks all of it.
// SHEET_INDEX (group -> [[slug, name]]) is appended by the build from shared/sheet.js, so pages without the sheet can count ticks.
const PATTERN_MAP = {
  cols: 6, rows: 10,
  nodes: [
    // [name, short label, col, row]
    ['Math & Geometry', 'Math', 0, 0], ['Hash Map', 'Hash map', 0, 1], ['Two Pointers', 'Two pointers', 0, 2], ['Stack', 'Stack', 0, 3],
    ['Linked Lists', 'Linked lists', 0, 6], ['Sorting', 'Sorting', 0, 7],
    ['Bit Manipulation', 'Bits', 1, 0], ['Prefix Sum', 'Prefix sum', 1, 1], ['Sliding Window', 'Sliding window', 1, 2], ['Depth-First Search', 'DFS', 1, 4],
    ['Fast & Slow Pointers', 'Fast & slow', 1, 5], ['In-place Reversal', 'List reversal', 1, 6], ['Binary Search', 'Binary search', 1, 8], ['Intervals', 'Intervals', 1, 9],
    ['String Algorithms', 'String algos', 2, 2], ['Matrix', 'Matrix', 2, 3], ['Monotonic Stack & Queue', 'Monotonic stack', 2, 4], ['Backtracking', 'Backtracking', 2, 5],
    ['Breadth-First Search', 'BFS', 2, 6], ['Heap', 'Heap', 2, 7], ['Design', 'Design', 2, 8], ['Greedy', 'Greedy', 2, 9],
    ['Segment Tree & BIT', 'Segment tree', 3, 1], ['Dynamic Programming', 'DP basics', 3, 5], ['Trees', 'Trees', 3, 6.5],
    ['DP on Grids & Strings', 'Grid & string DP', 4, 4], ['Knapsack & LIS', 'Knapsack & LIS', 4, 5], ['Tries', 'Tries', 4, 6.5], ['Graphs', 'Graphs', 4, 8],
    ['Interval & Bitmask DP', 'Range & mask DP', 5, 0]
  ],
  edges: [
    ['Two Pointers', 'Sliding Window'], ['Hash Map', 'Sliding Window'], ['Hash Map', 'Prefix Sum'], ['Two Pointers', 'Matrix'],
    ['Sorting', 'Binary Search'], ['Sorting', 'Intervals'], ['Intervals', 'Greedy'], ['Sorting', 'Heap'],
    ['Stack', 'Monotonic Stack & Queue'], ['Sliding Window', 'Monotonic Stack & Queue'], ['Sliding Window', 'String Algorithms'],
    ['Linked Lists', 'In-place Reversal'], ['Linked Lists', 'Fast & Slow Pointers'],
    ['Stack', 'Depth-First Search'], ['Depth-First Search', 'Breadth-First Search'], ['Depth-First Search', 'Trees'], ['Breadth-First Search', 'Trees'],
    ['Trees', 'Tries'], ['Trees', 'Graphs'], ['Heap', 'Graphs'],
    ['Depth-First Search', 'Backtracking'], ['Backtracking', 'Dynamic Programming'],
    ['Dynamic Programming', 'DP on Grids & Strings'], ['Matrix', 'DP on Grids & Strings'], ['Dynamic Programming', 'Knapsack & LIS'],
    ['Knapsack & LIS', 'Interval & Bitmask DP'], ['Bit Manipulation', 'Interval & Bitmask DP'], ['Math & Geometry', 'Bit Manipulation'],
    ['Prefix Sum', 'Segment Tree & BIT'], ['Linked Lists', 'Design']
  ],
  // Sheet groups that sit outside the DSA order: shown as side tracks under the map.
  side: ['SQL', 'Concurrency']
};

const PATTERN_INTROS = {
  'Two Pointers': {
    companion: 'the left and right markers',
    clues: ['"sorted array" plus a pair or a target sum', 'palindrome, reverse or compare from both ends', 'do it in place with O(1) extra space'],
    template: ['l, r = 0, n - 1', 'while l < r:', '  if good(a[l], a[r]): record it', '  if need bigger: l += 1', '  else: r -= 1', 'return answer'],
    mistakes: ['Moving both pointers when only one side is decided, and skipping the answer.', 'Forgetting to skip equal values, so 3Sum style answers repeat.'],
    stories: ['two-sum-ii', 'valid-palindrome', 'container'], sheet: ['reverse-string', 'reverse-vowels-of-a-string', 'valid-palindrome'], run: ['two-sum-ii', 'container', 'move-zeroes']
  },
  'Sliding Window': {
    companion: 'the window-keeper',
    clues: ['"longest" or "shortest" substring or subarray', '"at most k" changes, distinct letters or a sum limit', 'every element is used in one unbroken run'],
    template: ['l = 0', 'for r in range(n):', '  add a[r] to window', '  while window breaks the rule:', '    remove a[l]; l += 1', '  best = max(best, r - l + 1)', 'return best'],
    mistakes: ['Shrinking with an if instead of a while, so the window stays broken.', 'Updating the best answer before the window is valid again.'],
    stories: ['longest-substring', 'char-replacement', 'best-time-stock'], sheet: ['maximum-average-subarray-i', 'best-time-to-buy-and-sell-stock', 'contains-duplicate-ii'], run: ['longest-substring', 'permutation-in-string', 'minimum-size-subarray-sum']
  },
  'Hash Map': {
    companion: 'the shopkeeper',
    clues: ['find a pair or complement that adds to a target', 'count, group or match letters and items', 'duplicates, anagrams or first unique'],
    template: ['seen = {}', 'for i, x in enumerate(a):', '  need = target - x', '  if need in seen:', '    return [seen[need], i]', '  seen[x] = i'],
    mistakes: ['Storing x before checking for its partner, so x pairs with itself.', 'Using a list where a set is needed, so every lookup is slow again.'],
    stories: ['two-sum', 'valid-anagram', 'contains-duplicate'], sheet: ['contains-duplicate', 'valid-anagram', 'find-the-difference-of-two-arrays'], run: ['two-sum', 'group-anagrams', 'longest-consecutive']
  },
  'Prefix Sum': {
    companion: 'the tally keeper',
    clues: ['"sum of subarray" equals k, or many range-sum queries', 'everything except index i', 'a pivot or balance point'],
    template: ['pre = [0]', 'for x in a: pre.append(pre[-1] + x)', '# sum of a[i..j]', 'total = pre[j + 1] - pre[i]', '# count earlier totals', 'count[pre_total] += 1'],
    mistakes: ['Off by one: pre has n + 1 entries, so a[i..j] is pre[j+1] - pre[i].', 'Forgetting to seed the count with total 0, missing ranges that start at index 0.'],
    stories: ['product-except-self', 'subarray-sum-k'], sheet: ['running-sum-of-1d-array', 'find-the-highest-altitude', 'find-pivot-index'], run: ['product-except-self', 'subarray-sum-k', 'find-pivot-index']
  },
  'Binary Search': {
    companion: 'the guesser',
    clues: ['sorted input and O(log n) wanted', '"minimum speed", "smallest capacity" or other answer ranges', 'rotated or shifted sorted data'],
    template: ['lo, hi = 0, n - 1', 'while lo <= hi:', '  mid = (lo + hi) // 2', '  if ok(mid): ans = mid; hi = mid - 1', '  else: lo = mid + 1', 'return ans'],
    mistakes: ['Mixing loop styles (lo < hi with hi = mid - 1) and looping forever or skipping the answer.', 'Searching the array when the answer is a number range, like a speed or a day.'],
    stories: ['binary-search', 'search-rotated', 'find-min-rotated'], sheet: ['binary-search', 'guess-number-higher-or-lower', 'search-insert-position'], run: ['binary-search', 'koko-eating-bananas', 'search-a-2d-matrix']
  },
  'Matrix': {
    companion: 'the tiler',
    clues: ['rotate, transpose or spiral', 'mark rows and columns without extra space', 'n by n grid, in place'],
    template: ['n = len(g)', 'for i in range(n):', '  for j in range(i + 1, n):', '    g[i][j], g[j][i] = g[j][i], g[i][j]', 'for row in g:', '  row.reverse()'],
    mistakes: ['Looping j from 0 in a transpose, which swaps every pair twice and undoes it.', 'Mixing up rows and columns: g[r][c] is row first.'],
    stories: ['rotate-image'], sheet: ['transpose-matrix', 'reshape-the-matrix', 'matrix-diagonal-sum'], run: ['rotate-image', 'spiral-matrix', 'set-matrix-zeroes']
  },
  'Intervals': {
    companion: 'the scheduler',
    clues: ['meetings, bookings or [start, end] pairs', 'merge, insert or remove overlaps', 'how many rooms or arrows'],
    template: ['a.sort(key=start)', 'out = [a[0]]', 'for s, e in a[1:]:', '  if s <= out[-1].end:', '    out[-1].end = max(out[-1].end, e)', '  else: out.append([s, e])'],
    mistakes: ['Not sorting by start first, so overlaps are missed.', 'Setting the merged end to e instead of the larger of the two ends.'],
    stories: ['merge-intervals', 'insert-interval'], sheet: ['summary-ranges', 'meeting-rooms', 'merge-intervals'], run: ['merge-intervals', 'insert-interval', 'non-overlapping-intervals']
  },
  'Greedy': {
    companion: 'the jumper',
    clues: ['"minimum number of" jumps, coins of a fixed kind or groups', 'can you reach the end', 'sort first, then take in order'],
    template: ['sort items if needed', 'reach = 0', 'for i, x in enumerate(a):', '  if i > reach: return False', '  reach = max(reach, i + x)', 'return True'],
    mistakes: ['Trusting greedy without a reason; some problems (odd coin sets) need DP.', 'Sorting by the wrong key, such as start time when end time decides.'],
    stories: ['jump-game'], sheet: ['assign-cookies', 'lemonade-change', 'can-place-flowers'], run: ['jump-game', 'gas-station', 'partition-labels']
  },
  'Stack': {
    companion: 'the stack',
    clues: ['matching brackets or nested structure', '"next greater" or "days until warmer"', 'undo, back or evaluate an expression'],
    template: ['st = []', 'for i, x in enumerate(a):', '  while st and beats(x, st[-1]):', '    j = st.pop()', '    answer[j] = i - j', '  st.append(i)'],
    mistakes: ['Popping from an empty stack; check it first.', 'Pushing values when you need indexes to measure distance.'],
    stories: ['valid-parentheses', 'daily-temperatures'], sheet: ['valid-parentheses', 'baseball-game', 'remove-all-adjacent-duplicates-in-string'], run: ['valid-parentheses', 'min-stack', 'evaluate-reverse-polish-notation']
  },
  'Heap': {
    companion: 'the triage nurse',
    clues: ['"k largest", "k closest" or "top k"', 'merge k sorted lists or streams', 'always process the cheapest next'],
    template: ['h = []', 'for x in a:', '  heappush(h, x)', '  if len(h) > k:', '    heappop(h)', 'return h[0]'],
    mistakes: ['Using a max-heap for k largest; a min-heap of size k is smaller and faster.', 'Sorting everything when only k items matter.'],
    stories: ['kth-largest', 'top-k-frequent', 'merge-k-lists'], sheet: ['last-stone-weight', 'kth-largest-element-in-a-stream', 'the-k-weakest-rows-in-a-matrix'], run: ['kth-largest', 'last-stone-weight', 'k-closest-points-to-origin']
  },
  'In-place Reversal': {
    companion: 'the conductor',
    clues: ['reverse a list or a slice of it', 'palindrome linked list', 'reorder or swap nodes in pairs'],
    template: ['prev, cur = None, head', 'while cur:', '  nxt = cur.next', '  cur.next = prev', '  prev, cur = cur, nxt', 'return prev'],
    mistakes: ['Losing the rest of the list by changing cur.next before saving it.', 'Returning head, which is now the tail.'],
    stories: ['reverse-linked-list'], sheet: ['reverse-linked-list', 'palindrome-linked-list', 'maximum-twin-sum-of-a-linked-list'], run: ['reverse-linked-list', 'palindrome-linked-list', 'reorder-list']
  },
  'Fast & Slow Pointers': {
    companion: 'the tortoise and hare',
    clues: ['cycle in a linked list or a number sequence', 'middle of a list in one pass', 'find the duplicate with O(1) space'],
    template: ['slow = fast = head', 'while fast and fast.next:', '  slow = slow.next', '  fast = fast.next.next', '  if slow is fast: return True', 'return False'],
    mistakes: ['Checking fast.next.next without first checking fast.next.', 'Comparing values instead of nodes, so equal values look like a loop.'],
    stories: ['linked-list-cycle', 'middle-of-list'], sheet: ['middle-of-the-linked-list', 'linked-list-cycle', 'happy-number'], run: ['linked-list-cycle', 'happy-number', 'find-the-duplicate-number']
  },
  'Depth-First Search': {
    companion: 'the explorer',
    clues: ['tree depth, paths or a property of every subtree', 'count islands or connected parts', 'copy or check a whole structure'],
    template: ['def dfs(node):', '  if not node: return base', '  if node in seen: return', '  seen.add(node)', '  for nb in next_of(node):', '    dfs(nb)', '  return combine'],
    mistakes: ['Forgetting the seen set on graphs, so the search loops forever.', 'Missing the empty base case, so recursion breaks on a leaf.'],
    stories: ['max-depth', 'invert-tree', 'number-of-islands'], sheet: ['invert-binary-tree', 'maximum-depth-of-binary-tree', 'same-tree'], run: ['max-depth', 'number-of-islands', 'max-area-of-island']
  },
  'Breadth-First Search': {
    companion: 'the ripple',
    clues: ['"minimum steps", "shortest path" on an unweighted grid', 'level order or right side view', 'spreading: rot, fire or infection by the minute'],
    template: ['q = deque([start]); seen = {start}', 'while q:', '  for _ in range(len(q)):', '    x = q.popleft()', '    for nb in next_of(x):', '      if nb not in seen:', '        seen.add(nb); q.append(nb)', '  steps += 1'],
    mistakes: ['Marking seen when popping instead of when pushing, so nodes enter twice.', 'Not freezing len(q) per level, which mixes up the levels.'],
    stories: ['level-order', 'right-side-view', 'rotting-oranges'], sheet: ['minimum-depth-of-binary-tree', 'average-of-levels-in-binary-tree', 'binary-tree-level-order-traversal'], run: ['level-order', 'rotting-oranges', 'course-schedule']
  },
  'Backtracking': {
    companion: 'the marker',
    clues: ['"all subsets", "all permutations" or "all combinations"', 'small n, often 10 to 20', 'trace a word or path on a board'],
    template: ['def go(i, path):', '  if done(i): out.append(path[:]); return', '  for c in choices(i):', '    path.append(c)', '    go(next_i, path)', '    path.pop()'],
    mistakes: ['Appending path instead of a copy, so every answer ends up empty.', 'Forgetting to undo the choice (or the board mark) after the call.'],
    stories: ['subsets', 'permutations', 'combination-sum'], sheet: ['binary-watch', 'letter-combinations-of-a-phone-number', 'subsets'], run: ['subsets', 'permutations', 'word-search']
  },
  'Dynamic Programming': {
    companion: 'the scribe',
    clues: ['"number of ways" or "minimum cost" to reach something', 'each step depends on one or two earlier steps', 'brute force tries every choice and repeats work'],
    template: ['dp = [0] * (n + 1)', 'dp[0] = base', 'for i in range(1, n + 1):', '  dp[i] = best(dp[i - 1], dp[i - 2] + cost(i))', 'return dp[n]'],
    mistakes: ['Filling the table in an order where dp[i] reads cells not yet filled.', 'A wrong base case, which quietly shifts every answer.'],
    stories: ['climbing-stairs', 'house-robber', 'coin-change'], sheet: ['fibonacci-number', 'n-th-tribonacci-number', 'climbing-stairs'], run: ['climbing-stairs', 'coin-change', 'decode-ways']
  },
  'Linked Lists': {
    companion: 'the guide',
    clues: ['remove, insert or merge nodes', 'only a head pointer is given', 'edits near the head are awkward'],
    template: ['dummy = Node(0, head)', 'cur = dummy', 'while cur.next:', '  if drop(cur.next): cur.next = cur.next.next', '  else: cur = cur.next', 'return dummy.next'],
    mistakes: ['Special-casing the head instead of using a dummy node.', 'Moving cur forward after a delete and skipping the next node.'],
    stories: [], sheet: ['remove-duplicates-from-sorted-list', 'convert-binary-number-in-a-linked-list-to-integer', 'remove-linked-list-elements'], run: ['merge-two-lists', 'remove-nth']
  },
  'Monotonic Stack & Queue': {
    companion: 'the guide',
    clues: ['next greater or smaller element', 'max or min of every window', 'remove digits or letters to get the smallest result'],
    template: ['dq = deque()', 'for i, x in enumerate(a):', '  while dq and a[dq[-1]] <= x: dq.pop()', '  dq.append(i)', '  if dq[0] <= i - k: dq.popleft()', '  if i >= k - 1: out.append(a[dq[0]])'],
    mistakes: ['Storing values instead of indexes, so you cannot tell when one leaves the window.', 'Using the wrong comparison and keeping items that should go.'],
    stories: ['sliding-window-max', 'largest-rectangle-in-histogram'], sheet: ['final-prices-with-a-special-discount-in-a-shop', 'next-greater-element-ii', 'remove-k-digits'], run: ['sliding-window-max', 'daily-temperatures', 'largest-rectangle-in-histogram']
  },
  'Trees': {
    companion: 'the guide',
    clues: ['binary tree or BST in the title', 'height, diameter, balance or kth smallest', 'build or compare trees'],
    template: ['def solve(node):', '  if not node: return 0', '  l = solve(node.left)', '  r = solve(node.right)', '  best = max(best, l + r)', '  return 1 + max(l, r)'],
    mistakes: ['Checking a BST rule only against the parent, not the whole allowed range.', 'Returning the global best from the helper instead of the height.'],
    stories: ['validate-bst'], sheet: ['binary-tree-inorder-traversal', 'binary-tree-preorder-traversal', 'binary-tree-postorder-traversal'], run: ['diameter-of-binary-tree', 'balanced-binary-tree', 'kth-smallest-element-in-a-bst']
  },
  'Graphs': {
    companion: 'the guide',
    clues: ['prerequisites or build order', 'connected groups, friends or provinces', 'cheapest flight or network delay'],
    template: ['adj = build(edges)', 'indeg = count_in(adj)', 'q = [v for v in nodes if indeg[v] == 0]', 'while q:', '  v = q.pop(); order.append(v)', '  for w in adj[v]:', '    indeg[w] -= 1', '    if indeg[w] == 0: q.append(w)'],
    mistakes: ['Assuming a tree: graphs can loop, so always track visited.', 'Building edges one way when the graph is undirected.'],
    stories: ['course-schedule', 'clone-graph', 'redundant-connection', 'network-delay-time'], sheet: ['find-the-town-judge', 'find-center-of-star-graph', 'is-graph-bipartite'], run: ['course-schedule', 'course-schedule-ii', 'clone-graph']
  },
  'Tries': {
    companion: 'the guide',
    clues: ['"starts with" or autocomplete', 'a dictionary of words plus many queries', 'word search with a long word list'],
    template: ['root = {}', 'def insert(w):', '  node = root', '  for ch in w:', '    node = node.setdefault(ch, {})', '  node["$"] = True'],
    mistakes: ['Forgetting the end-of-word mark, so "app" matches when only "apple" was added.', 'Rebuilding the trie for every query.'],
    stories: ['implement-trie-prefix-tree'], sheet: ['longest-common-prefix', 'implement-trie-prefix-tree', 'design-add-and-search-words-data-structure'], run: ['implement-trie-prefix-tree']
  },
  'Sorting': {
    companion: 'the guide',
    clues: ['ranks, order or "relative" in the title', 'compare neighbours after ordering', 'custom order by frequency or a rule'],
    template: ['order = sorted(range(n), key=lambda i: rule(a[i]))', 'result = []', 'for k, i in enumerate(order):', '  if k and same_group(a[order[k - 1]], a[i]): ...', '  result.append(answer_for(i, k))', 'return result'],
    mistakes: ['Sorting the input when the original index is still needed later.', 'A key that breaks ties the wrong way.'],
    stories: [], sheet: ['height-checker', 'relative-ranks', 'relative-sort-array'], run: ['merge-intervals', 'sort-colors']
  },
  'Design': {
    companion: 'the guide',
    clues: ['"implement" or "design" a class', 'get and put in O(1)', 'recent calls, caches or counters'],
    template: ['class Cache:', '  def __init__(self, cap):', '    self.map = {}', '    self.order = linked_list()', '  def get(self, k):', '    move k to front; return value'],
    mistakes: ['Picking one structure when two together (map plus list) are needed for speed.', 'Forgetting to evict or update both structures together.'],
    stories: ['lru-cache'], sheet: ['design-parking-system', 'number-of-recent-calls', 'design-hashset'], run: ['lru-cache', 'min-stack']
  },
  'String Algorithms': {
    companion: 'the guide',
    clues: ['find one string inside another', 'rotate, split or parse text', 'repeated substrings'],
    template: ['for i in range(len(s) - len(p) + 1):', '  j = 0', '  while j < len(p) and s[i + j] == p[j]:', '    j += 1', '  if j == len(p): return i', 'return -1'],
    mistakes: ['Off-by-one on the last start position.', 'Building new strings in a loop, which turns O(n) into O(n²).'],
    stories: [], sheet: ['defanging-an-ip-address', 'length-of-last-word', 'find-the-index-of-the-first-occurrence-in-a-string'], run: ['valid-palindrome', 'isomorphic-strings']
  },
  'DP on Grids & Strings': {
    companion: 'the guide',
    clues: ['paths through a grid moving right or down', 'compare two strings: common part or edits', 'a square or triangle of numbers'],
    template: ['dp = table(m + 1, n + 1)', 'for i in 1..m:', '  for j in 1..n:', '    if a[i-1] == b[j-1]:', '      dp[i][j] = dp[i-1][j-1] + 1', '    else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])'],
    mistakes: ['Mixing 0-based strings with a 1-based table.', 'Forgetting the first row and column base values.'],
    stories: ['unique-paths'], sheet: ['pascals-triangle-ii', 'unique-paths-ii', 'triangle'], run: ['unique-paths', 'longest-common-subsequence', 'edit-distance']
  },
  'Knapsack & LIS': {
    companion: 'the guide',
    clues: ['split into two equal sums, or reach a target', 'each item used once, or as often as you like', 'longest increasing run, keeping order'],
    template: ['dp = [False] * (T + 1); dp[0] = True', 'for x in items:', '  for s in range(T, x - 1, -1):', '    dp[s] = dp[s] or dp[s - x]', 'return dp[T]'],
    mistakes: ['Looping the budget upward for use-once items, which reuses an item.', 'Treating a subsequence like a subarray; items need not touch.'],
    stories: ['coin-change'], sheet: ['target-sum', 'last-stone-weight-ii', 'ones-and-zeroes'], run: ['partition-equal-subset-sum', 'lis', 'coin-change']
  },
  'Interval & Bitmask DP': {
    companion: 'the guide',
    clues: ['burst, merge or cut a range in the best order', 'n is tiny (up to about 16) and order matters', 'visit or assign every item once'],
    template: ['for length in 2..n:', '  for i in 0..n - length:', '    j = i + length - 1', '    for k in i..j - 1:', '      dp[i][j] = best(dp[i][j], dp[i][k] + dp[k+1][j] + cost)'],
    mistakes: ['Filling by i and j instead of by length, so small ranges are not ready.', 'Using bitmasks when n is large; 2^n blows up past about 20.'],
    stories: [], sheet: ['minimum-score-triangulation-of-polygon', 'beautiful-arrangement', 'minimum-number-of-work-sessions-to-finish-the-tasks'], run: []
  },
  'Bit Manipulation': {
    companion: 'the guide',
    clues: ['"every element appears twice except one"', 'count set bits or powers of two', 'O(1) extra space with integers'],
    template: ['x = 0', 'for v in a:', '  x ^= v', 'ones = bin(n).count("1")', 'is_pow2 = n > 0 and n & (n - 1) == 0'],
    mistakes: ['Forgetting operator precedence: wrap bit tests in brackets.', 'Ignoring negative numbers and fixed widths in languages like Java.'],
    stories: [], sheet: ['number-of-1-bits', 'power-of-two', 'single-number'], run: ['single-number', 'missing-number', 'counting-bits']
  },
  'Math & Geometry': {
    companion: 'the guide',
    clues: ['digits, primes, powers or remainders', 'points, lines or areas on a plane', 'very large n where a loop is too slow'],
    template: ['while n > 0:', '  d = n % 10', '  use d', '  n //= 10', 'return result'],
    mistakes: ['Integer overflow when multiplying before taking the remainder.', 'Comparing floats with == instead of a small tolerance.'],
    stories: [], sheet: ['fizz-buzz', 'subtract-the-product-and-sum-of-digits-of-an-integer', 'palindrome-number'], run: ['happy-number']
  },
  'Segment Tree & BIT': {
    companion: 'the guide',
    clues: ['update one value, then query a range', 'count smaller numbers after each item', 'many queries on a changing array'],
    template: ['def update(i, delta):', '  while i <= n: tree[i] += delta; i += i & -i', 'def query(i):', '  s = 0', '  while i > 0: s += tree[i]; i -= i & -i', '  return s'],
    mistakes: ['Using 0-based indexes in a Fenwick tree, which loops forever at 0.', 'Rebuilding prefix sums after every update instead of using a tree.'],
    stories: [], sheet: ['range-sum-query-mutable', 'count-of-smaller-numbers-after-self', 'reverse-pairs'], run: []
  }
};
// @@END-INTROS@@
