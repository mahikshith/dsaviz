// @@LISTS@@ — generated block (from shared/lists.js): our own tiered practice lists on the Sheet.
// Each list is our own pick and order. Ids are problem page ids from the registry (data/problem-registry.json).
//   starter  50 problems: the first step in every core pattern, mostly easy, in the order we teach them
//   core     150 problems: every story problem plus the problems that cover each pattern's main moves;
//            every core problem has approaches (shared/approaches.js)
//   skills   20 "implement it yourself" problems: build each core structure and algorithm from scratch
//   all      every problem on the master sheet, in sheet order
// Starter is inside Core and Core is inside All; tests/approachcheck.js checks that and the ids.
const PROBLEM_LISTS = [
  { id: 'starter', title: 'Starter', blurb: 'Fifty first steps: one or two easy wins in every core pattern.', ids: [
    'valid-palindrome', 'move-zeroes', 'remove-duplicates-from-sorted-array', 'squares-of-a-sorted-array',
    'merge-sorted-array', 'merge-two-lists', 'two-sum-ii', 'container', 'best-time-stock', 'longest-substring',
    'minimum-size-subarray-sum', 'contains-duplicate', 'valid-anagram', 'two-sum', 'ransom-note',
    'first-unique-character-in-a-string', 'majority-element', 'group-anagrams', 'running-sum-of-1d-array',
    'product-except-self', 'binary-search', 'search-insert-position', 'search-a-2d-matrix', 'rotate-image',
    'spiral-matrix', 'meeting-rooms', 'merge-intervals', 'best-time-to-buy-and-sell-stock-ii', 'jump-game',
    'valid-parentheses', 'min-stack', 'daily-temperatures', 'last-stone-weight', 'kth-largest', 'reverse-linked-list',
    'middle-of-list', 'linked-list-cycle', 'invert-tree', 'max-depth', 'same-tree', 'number-of-islands',
    'level-order', 'subsets', 'permutations', 'climbing-stairs', 'house-robber', 'max-subarray',
    'remove-duplicates-from-sorted-list', 'single-number', 'plus-one'
  ] },
  { id: 'core', title: 'Core', blurb: 'The core of interview prep: every story problem plus each pattern’s main moves, all with approaches.', ids: [
    'valid-palindrome', 'move-zeroes', 'remove-duplicates-from-sorted-array', 'squares-of-a-sorted-array',
    'merge-sorted-array', 'merge-two-lists', 'two-sum-ii', 'sort-colors', 'remove-nth', 'container', '3sum',
    'longest-palindrome', 'trapping-rain',
    'best-time-stock', 'minimum-size-subarray-sum', 'longest-substring', 'max-consecutive-ones-iii',
    'char-replacement', 'permutation-in-string', 'find-all-anagrams-in-a-string', 'min-window', 'sliding-window-max',
    'contains-duplicate', 'valid-anagram', 'two-sum', 'ransom-note', 'first-unique-character-in-a-string',
    'majority-element', 'group-anagrams', 'longest-consecutive', 'valid-sudoku', 'lru-cache',
    'running-sum-of-1d-array', 'range-sum-query-immutable', 'product-except-self', 'subarray-sum-k',
    'subarray-sums-divisible-by-k',
    'binary-search', 'search-insert-position', 'find-first-and-last-position-of-element-in-sorted-array',
    'search-a-2d-matrix', 'find-min-rotated', 'search-rotated', 'koko-eating-bananas', 'time-based-key-value-store',
    'rotate-image', 'spiral-matrix', 'set-matrix-zeroes', 'search-a-2d-matrix-ii',
    'meeting-rooms', 'merge-intervals', 'insert-interval', 'non-overlapping-intervals', 'meeting-rooms-ii',
    'best-time-to-buy-and-sell-stock-ii', 'jump-game', 'jump-game-ii', 'gas-station', 'partition-labels',
    'task-scheduler',
    'valid-parentheses', 'min-stack', 'evaluate-reverse-polish-notation', 'decode-string', 'daily-temperatures',
    'asteroid-collision', 'car-fleet', 'largest-rectangle-in-histogram',
    'last-stone-weight', 'kth-largest', 'top-k-frequent', 'k-closest-points-to-origin', 'merge-k-lists',
    'find-median-from-data-stream',
    'reverse-linked-list', 'palindrome-linked-list', 'reverse-linked-list-ii', 'reorder-list',
    'middle-of-list', 'linked-list-cycle', 'happy-number', 'linked-list-cycle-ii', 'find-the-duplicate-number',
    'invert-tree', 'max-depth', 'same-tree', 'validate-bst', 'number-of-islands', 'max-area-of-island', 'clone-graph',
    'pacific-atlantic-water-flow', 'number-of-provinces',
    'level-order', 'right-side-view', 'shortest-path-in-binary-matrix', 'rotting-oranges', '01-matrix',
    'course-schedule', 'course-schedule-ii', 'word-ladder',
    'letter-combinations-of-a-phone-number', 'subsets', 'combination-sum', 'combination-sum-ii', 'permutations',
    'generate-parentheses', 'word-search', 'palindrome-partitioning', 'n-queens',
    'climbing-stairs', 'min-cost-climbing-stairs', 'house-robber', 'house-robber-ii', 'max-subarray',
    'maximum-product-subarray', 'unique-paths', 'coin-change', 'partition-equal-subset-sum', 'word-break',
    'decode-ways', 'lis', 'longest-common-subsequence', 'edit-distance',
    'remove-duplicates-from-sorted-list', 'add-two-numbers',
    'diameter-of-binary-tree', 'balanced-binary-tree', 'symmetric-tree', 'subtree-of-another-tree',
    'lowest-common-ancestor-of-a-binary-search-tree', 'kth-smallest-element-in-a-bst',
    'construct-binary-tree-from-preorder-and-inorder-traversal', 'binary-tree-maximum-path-sum',
    'find-the-town-judge', 'is-graph-bipartite', 'redundant-connection', 'network-delay-time',
    'min-cost-to-connect-all-points', 'cheapest-flights-within-k-stops',
    'longest-common-prefix', 'implement-trie-prefix-tree', 'design-add-and-search-words-data-structure',
    'number-of-1-bits', 'single-number', 'counting-bits', 'missing-number',
    'palindrome-number', 'plus-one', 'roman-to-integer', 'powx-n'
  ] },
  { id: 'skills', title: 'Core skills', blurb: 'Implement it yourself: build each structure and algorithm from scratch, in the order we teach them.', ids: [
    'dynamic-array', 'design-linked-list', 'min-stack', 'design-circular-queue', 'design-hashset', 'design-hashmap',
    'min-heap', 'implement-trie-prefix-tree', 'union-find', 'lru-cache',
    'insertion-sort-passes', 'counting-sort', 'sort-an-array', 'partition-around-a-pivot', 'binary-search',
    'bfs-visit-order', 'dfs-visit-order', 'course-schedule-ii', 'network-delay-time', 'zero-one-knapsack'
  ] },
  { id: 'all', title: 'All', blurb: 'Every problem on the master sheet.', ids: null }
];
// The ids of a list, in its order; All is every sheet problem, read from the sheet.
function listIds(list) { return list.ids || SHEET.map((r) => r.pid); }
// "Starter 50", "Core 150", "All 553".
function listName(list) { return list.title + ' ' + listIds(list).length; }
if (typeof module !== 'undefined' && module.exports) module.exports = { PROBLEM_LISTS, listIds, listName };
// @@END-LISTS@@
