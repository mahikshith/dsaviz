// @@SHEET@@ — generated block: the DSAMaxxing master sheet (our own selection, order and hints).
// Each group runs from the easiest idea to the hardest. Rows: LeetCode slug, number, official name, difficulty,
// a one-line hint in our own words, and the catalog story id when the problem has a story here.
// Groups: our 16 patterns first, then five topic groups. Company tags come only from the catalog (PROBLEMS).
const SHEET_EXTRA_GROUPS = [
  ["Trees", "Recursion on shapes with one parent per node"],
  ["Graphs", "Weighted roads, unions and shortest trips"],
  ["Tries", "A letter tree for prefixes"],
  ["Bit Manipulation", "Thinking in ones and zeros"],
  ["Math", "Digits, powers and primes"]
];
const SHEET_DATA = {
  "Two Pointers": [
    ["reverse-string", 344, "Reverse String", "Easy", "Swap the two ends, then step both inward until they meet.", null],
    ["valid-palindrome", 125, "Valid Palindrome", "Easy", "Skip anything that is not a letter or digit, then compare the two ends, ignoring case.", "valid-palindrome"],
    ["move-zeroes", 283, "Move Zeroes", "Easy", "A writer pointer marks where the next non-zero goes. A reader walks ahead and hands them over.", "move-zeroes"],
    ["remove-duplicates-from-sorted-array", 26, "Remove Duplicates from Sorted Array", "Easy", "Sorted means repeats sit together. Write a value only when it differs from the last one written.", null],
    ["squares-of-a-sorted-array", 977, "Squares of a Sorted Array", "Easy", "The biggest square is at one of the two ends. Fill the answer from the back.", null],
    ["merge-sorted-array", 88, "Merge Sorted Array", "Easy", "Fill from the back of the bigger array so nothing gets overwritten.", null],
    ["merge-two-sorted-lists", 21, "Merge Two Sorted Lists", "Easy", "Keep a dummy head. Always attach the smaller of the two front nodes.", "merge-two-lists"],
    ["is-subsequence", 392, "Is Subsequence", "Easy", "Walk the long string once and move the short pointer only on a match.", null],
    ["valid-palindrome-ii", 680, "Valid Palindrome II", "Easy", "On the first mismatch, try skipping the left letter or the right one and check the rest.", null],
    ["two-sum-ii-input-array-is-sorted", 167, "Two Sum II - Input Array Is Sorted", "Medium", "Sum too small? Move the left pointer up. Too big? Move the right pointer down.", "two-sum-ii"],
    ["remove-nth-node-from-end-of-list", 19, "Remove Nth Node From End of List", "Medium", "Send one pointer n steps ahead, then move both. When the leader stops, the trailer is just before the target.", "remove-nth"],
    ["sort-colors", 75, "Sort Colors", "Medium", "Three pointers: zeros grow from the left, twos from the right, and a middle scanner decides.", null],
    ["container-with-most-water", 11, "Container With Most Water", "Medium", "The shorter wall limits the water, so always move the shorter wall inward.", "container"],
    ["3sum", 15, "3Sum", "Medium", "Sort, fix one number, then run Two Sum II on the rest. Skip repeated values.", "3sum"],
    ["longest-palindromic-substring", 5, "Longest Palindromic Substring", "Medium", "Grow outward from every centre, both on a letter and between two letters.", "longest-palindrome"],
    ["trapping-rain-water", 42, "Trapping Rain Water", "Hard", "Water above a bar is the lower of the tallest wall on each side. Walk in from the side with the lower wall.", "trapping-rain"]
  ],
  "Sliding Window": [
    ["maximum-average-subarray-i", 643, "Maximum Average Subarray I", "Easy", "Fixed window: add the new number, drop the old one, and track the best sum.", null],
    ["best-time-to-buy-and-sell-stock", 121, "Best Time to Buy and Sell Stock", "Easy", "Remember the cheapest price so far. Each day, check what selling today would earn.", "best-time-stock"],
    ["contains-duplicate-ii", 219, "Contains Duplicate II", "Easy", "Keep a set of the last k numbers. A repeat inside the set means yes.", null],
    ["maximum-number-of-vowels-in-a-substring-of-given-length", 1456, "Maximum Number of Vowels in a Substring of Given Length", "Medium", "Fixed window of size k. Count vowels in and out as it slides.", null],
    ["minimum-size-subarray-sum", 209, "Minimum Size Subarray Sum", "Medium", "Grow until the sum reaches the target, then shrink from the left while it still does.", null],
    ["longest-substring-without-repeating-characters", 3, "Longest Substring Without Repeating Characters", "Medium", "On a repeat, jump the left edge just past where that letter was last seen.", "longest-substring"],
    ["max-consecutive-ones-iii", 1004, "Max Consecutive Ones III", "Medium", "Let the window hold at most k zeros. Shrink from the left when it holds more.", null],
    ["longest-repeating-character-replacement", 424, "Longest Repeating Character Replacement", "Medium", "Window size minus the most common letter count must stay at or below k.", "char-replacement"],
    ["permutation-in-string", 567, "Permutation in String", "Medium", "Slide a window the length of the short string and compare letter counts.", null],
    ["find-all-anagrams-in-a-string", 438, "Find All Anagrams in a String", "Medium", "Same window as Permutation in String, but record every start where the counts match.", null],
    ["fruit-into-baskets", 904, "Fruit Into Baskets", "Medium", "Longest window with at most two different values. Count each value inside.", null],
    ["minimum-window-substring", 76, "Minimum Window Substring", "Hard", "Grow until every needed letter is covered, then squeeze from the left and record the shortest.", "min-window"],
    ["sliding-window-maximum", 239, "Sliding Window Maximum", "Hard", "Keep a deque of indexes with falling values. The front is the window maximum.", "sliding-window-max"],
    ["subarrays-with-k-different-integers", 992, "Subarrays with K Different Integers", "Hard", "Exactly k equals at most k minus at most k-1. Count each with a window.", null]
  ],
  "Hash Map": [
    ["contains-duplicate", 217, "Contains Duplicate", "Easy", "Drop each number into a set. If it is already there, you found a repeat.", "contains-duplicate"],
    ["valid-anagram", 242, "Valid Anagram", "Easy", "Count letters up for one word and down for the other. Every count must end at zero.", "valid-anagram"],
    ["two-sum", 1, "Two Sum", "Easy", "For each number, look up the partner you need in a map of numbers seen so far.", "two-sum"],
    ["ransom-note", 383, "Ransom Note", "Easy", "Count the magazine letters, then spend them on the note. Running out means no.", null],
    ["first-unique-character-in-a-string", 387, "First Unique Character in a String", "Easy", "Count every letter in one pass, then find the first letter with a count of one.", null],
    ["isomorphic-strings", 205, "Isomorphic Strings", "Easy", "Map letters both ways. A letter may never point to two different partners.", null],
    ["group-anagrams", 49, "Group Anagrams", "Medium", "Give every word a key, its sorted letters or letter counts, and group by that key.", "group-anagrams"],
    ["longest-consecutive-sequence", 128, "Longest Consecutive Sequence", "Medium", "Put all numbers in a set. Only start counting from a number whose smaller neighbour is missing.", "longest-consecutive"],
    ["valid-sudoku", 36, "Valid Sudoku", "Medium", "One set per row, per column and per 3x3 box. A repeat in any set fails the board.", null],
    ["insert-delete-getrandom-o1", 380, "Insert Delete GetRandom O(1)", "Medium", "An array for random picks plus a map from value to index. Delete by swapping with the last item.", null],
    ["lru-cache", 146, "LRU Cache", "Medium", "A map for instant lookup plus a linked list kept in order of last use.", null],
    ["first-missing-positive", 41, "First Missing Positive", "Hard", "Use the array itself as the map: put each value v at index v-1, then find the first gap.", null]
  ],
  "Prefix Sum": [
    ["running-sum-of-1d-array", 1480, "Running Sum of 1d Array", "Easy", "Each answer is the previous answer plus the current number.", null],
    ["find-pivot-index", 724, "Find Pivot Index", "Easy", "Left sum equals total minus left sum minus the current number.", null],
    ["range-sum-query-immutable", 303, "Range Sum Query - Immutable", "Easy", "Store running totals once. Any range sum is one subtraction.", null],
    ["product-of-array-except-self", 238, "Product of Array Except Self", "Medium", "Multiply the product of everything to the left by the product of everything to the right.", "product-except-self"],
    ["range-sum-query-2d-immutable", 304, "Range Sum Query 2D - Immutable", "Medium", "Running totals in two directions. A rectangle is one big box minus two strips plus a corner.", null],
    ["subarray-sum-equals-k", 560, "Subarray Sum Equals K", "Medium", "Count how often each running total appears. Look up total minus k at every step.", "subarray-sum-k"],
    ["subarray-sums-divisible-by-k", 974, "Subarray Sums Divisible by K", "Medium", "Two running totals with the same remainder mod k frame a valid subarray.", null],
    ["contiguous-array", 525, "Contiguous Array", "Medium", "Count 0 as -1. Equal running totals mean the stretch between them is balanced.", null],
    ["continuous-subarray-sum", 523, "Continuous Subarray Sum", "Medium", "Remember the first index of each remainder. A repeat at least two apart means yes.", null],
    ["matrix-block-sum", 1314, "Matrix Block Sum", "Medium", "Build 2D running totals once, then read each block with four lookups.", null],
    ["number-of-submatrices-that-sum-to-target", 1074, "Number of Submatrices That Sum to Target", "Hard", "Fix a top and bottom row, squash the columns into one list, then run Subarray Sum Equals K.", null]
  ],
  "Binary Search": [
    ["binary-search", 704, "Binary Search", "Easy", "Look at the middle and throw away the half that cannot hold the target.", "binary-search"],
    ["search-insert-position", 35, "Search Insert Position", "Easy", "Find the first index whose value is at least the target.", null],
    ["first-bad-version", 278, "First Bad Version", "Easy", "The answer is the first true in a run of false then true. Halve toward it.", null],
    ["find-first-and-last-position-of-element-in-sorted-array", 34, "Find First and Last Position of Element in Sorted Array", "Medium", "Run two searches: one leans left for the first match, one leans right for the last.", null],
    ["search-a-2d-matrix", 74, "Search a 2D Matrix", "Medium", "Read the grid as one long sorted list and turn each index into a row and column.", null],
    ["find-peak-element", 162, "Find Peak Element", "Medium", "If the next value is higher, a peak lies to the right. Otherwise it lies here or to the left.", null],
    ["find-minimum-in-rotated-sorted-array", 153, "Find Minimum in Rotated Sorted Array", "Medium", "Compare the middle with the right end to tell which side holds the drop.", "find-min-rotated"],
    ["search-in-rotated-sorted-array", 33, "Search in Rotated Sorted Array", "Medium", "One half is always sorted. Check if the target fits there, else search the other half.", "search-rotated"],
    ["koko-eating-bananas", 875, "Koko Eating Bananas", "Medium", "Search over eating speeds, not the array. Test each speed against the hour limit.", null],
    ["capacity-to-ship-packages-within-d-days", 1011, "Capacity To Ship Packages Within D Days", "Medium", "Search over ship sizes. A greedy loading pass tells you if a size is enough.", null],
    ["time-based-key-value-store", 981, "Time Based Key-Value Store", "Medium", "Each key keeps its values in time order. Find the latest time not after the query.", null],
    ["split-array-largest-sum", 410, "Split Array Largest Sum", "Hard", "Search over the largest allowed part sum. Count how many parts a greedy cut needs.", null],
    ["median-of-two-sorted-arrays", 4, "Median of Two Sorted Arrays", "Hard", "Binary search a cut in the shorter array so both left halves together hold half the items.", null]
  ],
  "Matrix": [
    ["transpose-matrix", 867, "Transpose Matrix", "Easy", "Row i, column j moves to row j, column i.", null],
    ["matrix-diagonal-sum", 1572, "Matrix Diagonal Sum", "Easy", "Add both diagonals and do not count the centre twice when the size is odd.", null],
    ["rotate-image", 48, "Rotate Image", "Medium", "Turning a quarter clockwise is a transpose followed by flipping each row.", "rotate-image"],
    ["spiral-matrix", 54, "Spiral Matrix", "Medium", "Keep four walls. Walk one edge, then pull that wall in.", null],
    ["spiral-matrix-ii", 59, "Spiral Matrix II", "Medium", "Same four walls as Spiral Matrix, but write 1, 2, 3 as you walk.", null],
    ["set-matrix-zeroes", 73, "Set Matrix Zeroes", "Medium", "Use the first row and column as notes for which rows and columns to clear.", null],
    ["search-a-2d-matrix-ii", 240, "Search a 2D Matrix II", "Medium", "Start at the top-right corner. Too big? Go left. Too small? Go down.", null],
    ["game-of-life", 289, "Game of Life", "Medium", "Count eight neighbours. Store the next state in spare bits so updates do not leak.", null]
  ],
  "Intervals": [
    ["summary-ranges", 228, "Summary Ranges", "Easy", "Extend a run while the next number is one more. Close it when the chain breaks.", null],
    ["merge-intervals", 56, "Merge Intervals", "Medium", "Sort by start. Merge whenever the next start is not after the current end.", "merge-intervals"],
    ["insert-interval", 57, "Insert Interval", "Medium", "Copy the ones that end before, merge the ones that overlap, then copy the rest.", "insert-interval"],
    ["interval-list-intersections", 986, "Interval List Intersections", "Medium", "Two pointers. The overlap is the later start to the earlier end. Advance whichever ends first.", null],
    ["non-overlapping-intervals", 435, "Non-overlapping Intervals", "Medium", "Sort by end and keep the one that finishes first. Count the ones you drop.", null],
    ["minimum-number-of-arrows-to-burst-balloons", 452, "Minimum Number of Arrows to Burst Balloons", "Medium", "Sort by end and shoot at the first end. A new arrow only when a balloon starts after it.", null],
    ["car-pooling", 1094, "Car Pooling", "Medium", "Add riders at pickup and remove them at drop-off on a timeline. Check the load never goes over.", null],
    ["my-calendar-i", 729, "My Calendar I", "Medium", "A new booking fits if it ends before or starts after every booking it touches.", null],
    ["minimum-interval-to-include-each-query", 1851, "Minimum Interval to Include Each Query", "Hard", "Sort queries and intervals. Push intervals that started into a heap by size and pop the ones that ended.", null]
  ],
  "Greedy": [
    ["assign-cookies", 455, "Assign Cookies", "Easy", "Sort both. Give each child the smallest cookie that is big enough.", null],
    ["lemonade-change", 860, "Lemonade Change", "Easy", "Count your fives and tens. Give change with a ten first when you can.", null],
    ["best-time-to-buy-and-sell-stock-ii", 122, "Best Time to Buy and Sell Stock II", "Medium", "Collect every rise from one day to the next.", null],
    ["jump-game", 55, "Jump Game", "Medium", "Track the farthest spot you can reach. If you stand beyond it, you are stuck.", "jump-game"],
    ["jump-game-ii", 45, "Jump Game II", "Medium", "Treat each jump as a level. Count a jump when you pass the edge of the current reach.", null],
    ["gas-station", 134, "Gas Station", "Medium", "If the tank goes negative, no station up to here can be the start. Begin again after it.", null],
    ["hand-of-straights", 846, "Hand of Straights", "Medium", "Always start a group at the smallest card left and use up the next ones in a row.", null],
    ["partition-labels", 763, "Partition Labels", "Medium", "Note each letter's last position. Cut when the scan reaches the farthest last position so far.", null],
    ["valid-parenthesis-string", 678, "Valid Parenthesis String", "Medium", "Track the lowest and highest possible number of open brackets as you read.", null],
    ["task-scheduler", 621, "Task Scheduler", "Medium", "The most frequent task sets the frame. Fill the gaps between its copies with the others.", null],
    ["candy", 135, "Candy", "Hard", "One pass from the left for rising ratings, one from the right, then take the larger count.", null]
  ],
  "Stack": [
    ["valid-parentheses", 20, "Valid Parentheses", "Easy", "Push openers. Each closer must match the opener on top.", "valid-parentheses"],
    ["remove-all-adjacent-duplicates-in-string", 1047, "Remove All Adjacent Duplicates In String", "Easy", "Push each letter, but pop instead when it matches the top.", null],
    ["next-greater-element-i", 496, "Next Greater Element I", "Easy", "Keep a stack of values waiting for something bigger. A bigger value answers them all.", null],
    ["min-stack", 155, "Min Stack", "Medium", "Store the smallest-so-far next to every pushed value.", "min-stack"],
    ["evaluate-reverse-polish-notation", 150, "Evaluate Reverse Polish Notation", "Medium", "Push numbers. An operator pops two, works them out, and pushes the result.", null],
    ["simplify-path", 71, "Simplify Path", "Medium", "Split on slashes. A name is pushed, two dots pops, one dot does nothing.", null],
    ["decode-string", 394, "Decode String", "Medium", "On an opening bracket, save the count and text so far. On a closing one, repeat and join.", null],
    ["daily-temperatures", 739, "Daily Temperatures", "Medium", "Keep a stack of days still waiting for a warmer one. A warm day pops them and sets their wait.", "daily-temperatures"],
    ["online-stock-span", 901, "Online Stock Span", "Medium", "Each stack item keeps a price and its span. Lower prices fold into the new one.", null],
    ["asteroid-collision", 735, "Asteroid Collision", "Medium", "Only a left-mover hitting a right-mover on top can crash. Resolve crashes until it is safe.", null],
    ["car-fleet", 853, "Car Fleet", "Medium", "Sort by position. A car that would arrive no later than the car ahead joins its fleet.", null],
    ["largest-rectangle-in-histogram", 84, "Largest Rectangle in Histogram", "Hard", "Keep bars in rising order. When a shorter bar comes, pop and measure each taller bar's widest box.", null]
  ],
  "Heap": [
    ["last-stone-weight", 1046, "Last Stone Weight", "Easy", "A max heap hands you the two heaviest stones every round.", null],
    ["kth-largest-element-in-a-stream", 703, "Kth Largest Element in a Stream", "Easy", "Keep a min heap of size k. Its top is the kth largest.", null],
    ["kth-largest-element-in-an-array", 215, "Kth Largest Element in an Array", "Medium", "A min heap of size k, or quickselect for average linear time.", "kth-largest"],
    ["top-k-frequent-elements", 347, "Top K Frequent Elements", "Medium", "Count, then keep the k biggest counts in a small heap or in buckets by count.", "top-k-frequent"],
    ["k-closest-points-to-origin", 973, "K Closest Points to Origin", "Medium", "A max heap of size k by squared distance. No square roots needed.", null],
    ["sort-characters-by-frequency", 451, "Sort Characters By Frequency", "Medium", "Count letters, then pop the most frequent and write it that many times.", null],
    ["reorganize-string", 767, "Reorganize String", "Medium", "Always place the most common letter that is not the one you just placed.", null],
    ["merge-k-sorted-lists", 23, "Merge k Sorted Lists", "Hard", "Put each list's head in a min heap. Pop the smallest and push its next node.", "merge-k-lists"],
    ["find-median-from-data-stream", 295, "Find Median from Data Stream", "Hard", "A max heap for the lower half and a min heap for the upper half, kept balanced.", null],
    ["ipo", 502, "IPO", "Hard", "Unlock projects you can afford into a max heap by profit, then take the best one.", null]
  ],
  "In-place Reversal": [
    ["reverse-linked-list", 206, "Reverse Linked List", "Easy", "Walk the list with prev and current. Point each node back before you move on.", "reverse-linked-list"],
    ["palindrome-linked-list", 234, "Palindrome Linked List", "Easy", "Find the middle, reverse the second half, then compare the halves.", null],
    ["maximum-twin-sum-of-a-linked-list", 2130, "Maximum Twin Sum of a Linked List", "Medium", "Reverse the second half and add the nodes in pairs.", null],
    ["swap-nodes-in-pairs", 24, "Swap Nodes in Pairs", "Medium", "With a dummy head, re-link two nodes at a time and step forward by two.", null],
    ["reverse-linked-list-ii", 92, "Reverse Linked List II", "Medium", "Stop just before the range, then move each next node to the front of the range.", null],
    ["rotate-list", 61, "Rotate List", "Medium", "Close the list into a ring, then cut it at the new tail.", null],
    ["reorder-list", 143, "Reorder List", "Medium", "Split in the middle, reverse the back half, then zip the two halves together.", null],
    ["reverse-nodes-in-k-group", 25, "Reverse Nodes in k-Group", "Hard", "Check that k nodes remain, reverse them, then join the group back to the rest.", null]
  ],
  "Fast & Slow Pointers": [
    ["middle-of-the-linked-list", 876, "Middle of the Linked List", "Easy", "The fast pointer moves two steps for every one. When it stops, the slow one is in the middle.", "middle-of-list"],
    ["linked-list-cycle", 141, "Linked List Cycle", "Easy", "If there is a loop, the fast pointer will lap the slow one and they meet.", "linked-list-cycle"],
    ["happy-number", 202, "Happy Number", "Easy", "The digit-square sums form a chain. Either it reaches 1 or it loops.", null],
    ["intersection-of-two-linked-lists", 160, "Intersection of Two Linked Lists", "Easy", "When a walker ends, restart it on the other list. Both cover the same distance and meet.", null],
    ["delete-the-middle-node-of-a-linked-list", 2095, "Delete the Middle Node of a Linked List", "Medium", "Give fast a one-step head start so slow stops just before the middle.", null],
    ["linked-list-cycle-ii", 142, "Linked List Cycle II", "Medium", "After they meet, restart one pointer at the head. Moving one step each, they meet at the loop's entry.", null],
    ["find-the-duplicate-number", 287, "Find the Duplicate Number", "Medium", "Treat each value as a pointer to an index. The repeat is where the loop begins.", null],
    ["circular-array-loop", 457, "Circular Array Loop", "Medium", "Run fast and slow from each start, stopping when direction flips or a loop has length one.", null]
  ],
  "Depth-First Search": [
    ["invert-binary-tree", 226, "Invert Binary Tree", "Easy", "Swap the two children, then do the same for each child.", "invert-tree"],
    ["maximum-depth-of-binary-tree", 104, "Maximum Depth of Binary Tree", "Easy", "Depth is one plus the deeper of the two children.", "max-depth"],
    ["same-tree", 100, "Same Tree", "Easy", "Both empty is a match. Otherwise the values and both subtrees must match.", null],
    ["flood-fill", 733, "Flood Fill", "Easy", "From the start cell, repaint and spread to neighbours of the old colour.", null],
    ["validate-binary-search-tree", 98, "Validate Binary Search Tree", "Medium", "Pass down the allowed low and high limits. Every node must sit inside them.", "validate-bst"],
    ["number-of-islands", 200, "Number of Islands", "Medium", "Each new land cell starts an island. Sink all the land connected to it.", "number-of-islands"],
    ["max-area-of-island", 695, "Max Area of Island", "Medium", "Same sinking walk as Number of Islands, but count the cells as you go.", null],
    ["clone-graph", 133, "Clone Graph", "Medium", "Map each old node to its copy. Make a copy on first visit, then wire up the neighbours.", "clone-graph"],
    ["surrounded-regions", 130, "Surrounded Regions", "Medium", "Mark every O that can reach the border. Flip the unmarked ones.", null],
    ["pacific-atlantic-water-flow", 417, "Pacific Atlantic Water Flow", "Medium", "Walk uphill from each ocean's edge. Keep the cells both oceans reach.", null],
    ["number-of-provinces", 547, "Number of Provinces", "Medium", "Each unvisited city starts a new group. Visit everyone it connects to.", null],
    ["longest-increasing-path-in-a-matrix", 329, "Longest Increasing Path in a Matrix", "Hard", "DFS from each cell to larger neighbours, and save each cell's best answer.", null]
  ],
  "Breadth-First Search": [
    ["binary-tree-level-order-traversal", 102, "Binary Tree Level Order Traversal", "Medium", "Use a queue. Note its size, then empty exactly that many nodes for one level.", "level-order"],
    ["binary-tree-right-side-view", 199, "Binary Tree Right Side View", "Medium", "Go level by level and keep the last node of each level.", "right-side-view"],
    ["binary-tree-zigzag-level-order-traversal", 103, "Binary Tree Zigzag Level Order Traversal", "Medium", "Level order as usual, then reverse every other level.", null],
    ["shortest-path-in-binary-matrix", 1091, "Shortest Path in Binary Matrix", "Medium", "BFS over open cells with eight moves. The first time you reach the corner is the shortest.", null],
    ["rotting-oranges", 994, "Rotting Oranges", "Medium", "Start the queue with every rotten orange at once. Each ring of the queue is one minute.", "rotting-oranges"],
    ["01-matrix", 542, "01 Matrix", "Medium", "Start from all zeros together and spread outward, writing distances as you go.", null],
    ["course-schedule", 207, "Course Schedule", "Medium", "Take courses with no remaining requirements first. If some never free up, there is a cycle.", "course-schedule"],
    ["course-schedule-ii", 210, "Course Schedule II", "Medium", "Same idea as Course Schedule, but record the order in which courses are freed.", null],
    ["open-the-lock", 752, "Open the Lock", "Medium", "Each lock code is a node with eight neighbours. BFS from 0000 and skip the deadends.", null],
    ["word-ladder", 127, "Word Ladder", "Hard", "Words are nodes and one-letter changes are edges. BFS gives the fewest steps.", null]
  ],
  "Backtracking": [
    ["letter-combinations-of-a-phone-number", 17, "Letter Combinations of a Phone Number", "Medium", "For each digit, try every letter it maps to, then move to the next digit.", null],
    ["subsets", 78, "Subsets", "Medium", "For each number, choose: leave it out or put it in.", "subsets"],
    ["subsets-ii", 90, "Subsets II", "Medium", "Sort first. At the same depth, skip a value equal to the one you just tried.", null],
    ["combinations", 77, "Combinations", "Medium", "Pick numbers in rising order and stop once you hold k.", null],
    ["permutations", 46, "Permutations", "Medium", "Fill each position with any unused number, then undo and try the next.", "permutations"],
    ["combination-sum", 39, "Combination Sum", "Medium", "You may reuse a number, so stay on the same index after picking it. Stop when the sum goes over.", "combination-sum"],
    ["combination-sum-ii", 40, "Combination Sum II", "Medium", "Each number once: move to the next index, and skip equal values at the same depth.", null],
    ["generate-parentheses", 22, "Generate Parentheses", "Medium", "Add an opener while some are left. Add a closer only while it would still match an opener.", null],
    ["word-search", 79, "Word Search", "Medium", "From each cell, follow the next letter in four directions. Mark cells on the way in and clear them on the way out.", "word-search"],
    ["palindrome-partitioning", 131, "Palindrome Partitioning", "Medium", "Cut off a palindrome prefix and solve the rest the same way.", null],
    ["n-queens", 51, "N-Queens", "Hard", "Place one queen per row. Track used columns and both diagonals to prune fast.", null],
    ["sudoku-solver", 37, "Sudoku Solver", "Hard", "Fill the next empty cell with any legal digit, then go deeper. Undo when stuck.", null]
  ],
  "Dynamic Programming": [
    ["climbing-stairs", 70, "Climbing Stairs", "Easy", "Ways to reach a step are the ways to reach the step before plus the one two below.", "climbing-stairs"],
    ["min-cost-climbing-stairs", 746, "Min Cost Climbing Stairs", "Easy", "Cheapest cost to stand on a step is its cost plus the cheaper of the two steps below.", null],
    ["house-robber", 198, "House Robber", "Medium", "At each house: skip it, or take it and add the best from two houses back.", "house-robber"],
    ["house-robber-ii", 213, "House Robber II", "Medium", "The houses form a circle, so solve once without the first house and once without the last.", null],
    ["maximum-subarray", 53, "Maximum Subarray", "Medium", "Either extend the running sum or start fresh here, whichever is bigger.", "max-subarray"],
    ["maximum-product-subarray", 152, "Maximum Product Subarray", "Medium", "Track both the largest and smallest product, since a negative flips them.", null],
    ["unique-paths", 62, "Unique Paths", "Medium", "Paths into a cell are the paths from above plus the paths from the left.", "unique-paths"],
    ["minimum-path-sum", 64, "Minimum Path Sum", "Medium", "Each cell adds its value to the cheaper of the cell above and the cell to the left.", null],
    ["coin-change", 322, "Coin Change", "Medium", "Fewest coins for an amount is one plus the best for that amount minus each coin.", "coin-change"],
    ["coin-change-ii", 518, "Coin Change II", "Medium", "Loop coins on the outside so each mix is counted once, not once per order.", null],
    ["partition-equal-subset-sum", 416, "Partition Equal Subset Sum", "Medium", "Can some numbers reach half the total? Track reachable sums, going downward each round.", null],
    ["word-break", 139, "Word Break", "Medium", "A prefix works if some shorter good prefix is followed by a dictionary word.", "word-break"],
    ["decode-ways", 91, "Decode Ways", "Medium", "Read one digit or two digits at a time. Zeros only work as part of 10 or 20.", null],
    ["longest-increasing-subsequence", 300, "Longest Increasing Subsequence", "Medium", "Keep the smallest possible tail for each length and binary search where each number goes.", "lis"],
    ["longest-common-subsequence", 1143, "Longest Common Subsequence", "Medium", "Grid of prefixes: matching letters add one to the diagonal, otherwise take the better neighbour.", null],
    ["edit-distance", 72, "Edit Distance", "Medium", "Grid of prefixes. Each cell is the cheapest of insert, delete or replace from a neighbour.", null],
    ["burst-balloons", 312, "Burst Balloons", "Hard", "Pick the balloon that pops last in a range. Its neighbours are then the range edges.", null],
    ["regular-expression-matching", 10, "Regular Expression Matching", "Hard", "Grid over both strings. A star means use the letter zero times or once more.", null]
  ],
  "Trees": [
    ["symmetric-tree", 101, "Symmetric Tree", "Easy", "Compare the left subtree with a mirror of the right: outside with outside, inside with inside.", null],
    ["diameter-of-binary-tree", 543, "Diameter of Binary Tree", "Easy", "At each node, the longest path through it is left height plus right height.", null],
    ["balanced-binary-tree", 110, "Balanced Binary Tree", "Easy", "Return each height, or a fail signal as soon as two sides differ by more than one.", null],
    ["lowest-common-ancestor-of-a-binary-search-tree", 235, "Lowest Common Ancestor of a Binary Search Tree", "Medium", "Walk down. The first node that falls between the two values is the answer.", null],
    ["kth-smallest-element-in-a-bst", 230, "Kth Smallest Element in a BST", "Medium", "An in-order walk visits values in sorted order. Stop at the kth one.", null],
    ["lowest-common-ancestor-of-a-binary-tree", 236, "Lowest Common Ancestor of a Binary Tree", "Medium", "If both sides report a find, this node is the answer. Otherwise pass up whichever side found one.", null],
    ["construct-binary-tree-from-preorder-and-inorder-traversal", 105, "Construct Binary Tree from Preorder and Inorder Traversal", "Medium", "Preorder gives the root. Its place in inorder splits the left and right subtrees.", null],
    ["binary-tree-maximum-path-sum", 124, "Binary Tree Maximum Path Sum", "Hard", "Each node passes up its best single branch, but checks a path that bends through itself.", null],
    ["serialize-and-deserialize-binary-tree", 297, "Serialize and Deserialize Binary Tree", "Hard", "Write a preorder list with markers for empty spots, then read it back in the same order.", null]
  ],
  "Graphs": [
    ["find-the-town-judge", 997, "Find the Town Judge", "Easy", "Count trust given and trust received. The judge receives n-1 and gives none.", null],
    ["redundant-connection", 684, "Redundant Connection", "Medium", "Union-find: the first edge that joins two nodes already in one group is the extra one.", null],
    ["network-delay-time", 743, "Network Delay Time", "Medium", "Dijkstra from the source. The answer is the longest of the shortest times.", null],
    ["min-cost-to-connect-all-points", 1584, "Min Cost to Connect All Points", "Medium", "Grow a tree by always adding the cheapest edge to a new point.", null],
    ["cheapest-flights-within-k-stops", 787, "Cheapest Flights Within K Stops", "Medium", "Relax all flights once per allowed stop, using a copy of last round's prices.", null],
    ["reconstruct-itinerary", 332, "Reconstruct Itinerary", "Hard", "Take tickets in name order and add an airport to the route once it has no tickets left. Then reverse.", null],
    ["swim-in-rising-water", 778, "Swim in Rising Water", "Hard", "Dijkstra where a path costs its highest cell. Always expand the lowest cell you can reach.", null]
  ],
  "Tries": [
    ["implement-trie-prefix-tree", 208, "Implement Trie (Prefix Tree)", "Medium", "Each node holds child links by letter and an end-of-word flag.", null],
    ["design-add-and-search-words-data-structure", 211, "Design Add and Search Words Data Structure", "Medium", "A trie, where a dot tries every child at that depth.", null],
    ["search-suggestions-system", 1268, "Search Suggestions System", "Medium", "Sort the products, then for each typed prefix take the first three that match.", null],
    ["word-search-ii", 212, "Word Search II", "Hard", "Put all words in a trie and walk the grid along trie paths. Remove words once found.", null]
  ],
  "Bit Manipulation": [
    ["number-of-1-bits", 191, "Number of 1 Bits", "Easy", "n AND (n-1) clears the lowest set bit. Count how many times until zero.", null],
    ["single-number", 136, "Single Number", "Easy", "XOR everything. Pairs cancel and the lone number is left.", null],
    ["counting-bits", 338, "Counting Bits", "Easy", "Bits in i equal bits in i shifted right by one, plus its last bit.", null],
    ["missing-number", 268, "Missing Number", "Easy", "XOR every index and every value together. What is left is the missing one.", null],
    ["sum-of-two-integers", 371, "Sum of Two Integers", "Medium", "XOR adds without carries, AND shifted left is the carry. Repeat until no carry.", null],
    ["single-number-ii", 137, "Single Number II", "Medium", "Count each bit position across all numbers. Counts not divisible by three belong to the loner.", null]
  ],
  "Math": [
    ["palindrome-number", 9, "Palindrome Number", "Easy", "Reverse only the back half of the digits and compare it with the front half.", null],
    ["plus-one", 66, "Plus One", "Easy", "Add from the last digit. Nines become zeros and carry left.", null],
    ["reverse-integer", 7, "Reverse Integer", "Medium", "Pop digits off the end and push them on, checking for overflow before each push.", null],
    ["powx-n", 50, "Pow(x, n)", "Medium", "Square the base and halve the power. Odd powers multiply in one extra base.", null],
    ["count-primes", 204, "Count Primes", "Medium", "Sieve: from each prime p, cross out p squared, then every pth number after it.", null],
    ["max-points-on-a-line", 149, "Max Points on a Line", "Hard", "For each point, group the others by reduced slope. The biggest group plus one is a line.", null]
  ]
};
// Flat list, in group order. seq is our order inside the group, starting at 1.
const SHEET_GROUPS = PATTERNS.map(([name, tag]) => [name, tag]).concat(SHEET_EXTRA_GROUPS);
const SHEET = [];
SHEET_GROUPS.forEach(([group]) => (SHEET_DATA[group] || []).forEach(([id, n, name, diff, hint, story], i) => {
  SHEET.push({ id, n, name, diff, pattern: group, hint, story, seq: i + 1, url: 'https://leetcode.com/problems/' + id + '/' });
}));
const SHEET_KEY = 'dsaviz-sheet-v1';
// Progress: { v: 1, done: { id: timestamp }, star: { id: 1 } }. Unknown ids are kept so an older export still imports.
function cleanSheetProgress(o) {
  const out = { v: 1, done: {}, star: {} };
  if (!o || typeof o !== 'object' || o.v !== 1) return out;
  if (o.done && typeof o.done === 'object') Object.keys(o.done).forEach((k) => { const ts = Number(o.done[k]); if (isFinite(ts) && ts > 0) out.done[k] = ts; });
  if (o.star && typeof o.star === 'object') Object.keys(o.star).forEach((k) => { if (o.star[k]) out.star[k] = 1; });
  return out;
}
function loadSheetProgress() { try { return cleanSheetProgress(JSON.parse(window.localStorage.getItem(SHEET_KEY))); } catch (e) { return cleanSheetProgress(null); } }
function saveSheetProgress(p) { try { window.localStorage.setItem(SHEET_KEY, JSON.stringify(p)); } catch (e) {} }
// @@END-SHEET@@
