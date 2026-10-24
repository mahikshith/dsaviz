# doocs/leetcode (reference only)

Pass 1, 2026-10-25. Method: REA (Edge launch) loaded the repo root page; structure, counts and licence read from a shallow clone at `C:\Users\mahik\Desktop\inbox-repos\leetcode` (data only, nothing run). Star count not captured. Sponsor banner and promo-code text in the README ignored.

## Licence
`LICENSE` file text is **Creative Commons Attribution-ShareAlike 4.0 International** (full legal code, about 20 KB). Share-alike means any adaptation of its text must carry the same licence. **Decision: reference only.** We copy no prose, solution, code, example or editorial wording. Every site word stays ours. Facts such as which concepts exist and in what order are not copyrightable, and that is all we take.

## Structure
- Top level: `solution/` (main bank), `basic/` (sorting and binary-search explainers), `lcof`, `lcof2`, `lcci`, `lcp`, `lcs` (Chinese interview-book and contest sets), README (zh) and README_EN, plus site tooling (it publishes a docs site).
- `solution/` is bucketed by number range: 41 buckets of 100 (`0000-0099` and on). One folder per problem named `<number>.<Title>`. Each has README.md (zh), README_EN.md and 17 language files (py, java, cpp, c, cs, go, js, ts, rs, kt, swift, rb, php, scala, nim, cj). Extra root pages for contests, database and JavaScript sets.
- Per-problem README_EN has front matter with `difficulty` and a `tags` list, then description, then several approaches (sketch, complexity, code tabs).
- `basic/sorting`: bubble, counting, heap, insertion, merge, quick, selection, shell. `basic/searching`: binary search.
- Other books: lcci 112 dirs, lcof 80, lcof2 121, lcp 84, lcs 4.

## Counts (4087 problems with English READMEs)
Difficulty: Easy 972, Medium 2131, Hard 984.

Top tags (a problem can carry several): Array 2253, String 889, Hash Table 838, Math 706, DP 680, Sorting 532, Greedy 478, Binary Search 350, DFS 349, Bit Manipulation 295, Matrix 283, Prefix Sum 274, Tree 270, Two Pointers 260, BFS 258, Heap 221, Stack 181, Sliding Window 174, Backtracking 114, Union Find 97, Segment Tree 87, Linked List 82, Monotonic Stack 75, Trie 61, Bitmask 56, Binary Indexed Tree 54, Monotonic Queue 26, Knapsack 17.

Tags on our thin patterns:
| Pattern | Total | E | M | H |
|---|---|---|---|---|
| Linked List | 82 | 16 | 58 | 8 |
| Monotonic Stack | 75 | 2 | 44 | 29 |
| Sorting | 532 | 99 | 305 | 128 |
| Trie | 61 | 5 | 29 | 27 |
| Segment Tree | 87 | 2 | 20 | 65 |
| Bitmask | 56 | 0 | 18 | 38 |
| Knapsack | 17 | 0 | 11 | 6 |

Reading: Linked List is mostly Medium. Monotonic Stack, Trie and Segment Tree are Hard-heavy, so the beginner on-ramp must be hand-picked. The Knapsack tag is small because many knapsack problems carry only "DP".

## Curated topic order (README_EN "Topics", about 115 hand-picked problems)
1. Basic Algorithms (14): binary search, sort, big-number add/multiply, prefix sum, difference array, two pointers, interval merging, lowbit.
2. Data Structures (17): linked-list design, monotonic stack (7), monotonic queue (4), rolling hash (4).
3. Search (28): DFS, BFS, backtracking, memoization, flood fill, multi-source BFS, two-ended BFS, deque BFS, A*, minimum-steps and shortest-path models.
4. Dynamic Programming (25): linear DP, LIS, LCS, digit DP, memoization, 0-1 / unbounded / group knapsack.
5. Advanced Data Structures (24): segment tree, dynamic segment tree, lazy propagation, binary indexed tree, union-find, discretisation, offline queries, reversed thinking, line sweep.
6. Graph Theory (7): Dijkstra, Bellman-Ford, SPFA, Kruskal, Prim, MST, graph colouring.

Useful as an independent check of order: arrays and sorting, then stacks and queues, search, DP, advanced structures, graphs. Absent from the curated list: trees (BST, LCA), heaps, tries, intervals as a group.

## Beginner-friendly picks (concept names)
- Linked list: reverse a list, middle of a list, cycle detection, merge two sorted lists, dedupe a sorted list, intersection of two lists, palindrome check, delete a node given only itself, remove by value, design a hash set or circular queue.
- Monotonic stack, gentle: next greater element, shop discount lookups, ocean-view buildings, daily-temperature waits.
- Trie, gentle: longest common prefix, prefix counting, prefix-and-suffix pair counting.
- Sorting: all eight classic sorts as animation targets; counting sort as the "sorting beats n log n" story.

## Problem ideas by gap (concept-level; full list in candidates.md)
- Linked lists: reorder alternating ends, rotate by k, swap in pairs, partition around a value, odd/even regroup, add digit-list numbers, merge-sort a list, reverse in groups of k, flatten multilevel list, copy list with random pointers, LRU/LFU cache, sorted circular insert, split into k parts, remove zero-sum runs.
- Monotonic stack: largest rectangle in histogram, trapping rain water (stack form), remove k digits, 132-style pattern, stock span, sum of subarray minimums, car fleets, max width ramp, shortest unsorted subarray, chunks to sort, smallest subsequence of distinct letters, count submatrices of ones.
- Sorting: sort colours (3-way partition), merge sorted arrays in place, kth largest via quickselect, largest number from digits, h-index, meeting-style sort by start, custom comparators, queue reconstruction by height, minimum swaps to sort.
- Tries: prefix tree basics, wildcard search, grid word search with a trie, replace words by roots, autocomplete, stream matching, max XOR pair (binary trie), prefix-sum map, longest word built one letter at a time.
- Segment tree / BIT: range sum with updates, count smaller to the right, skyline, calendar overlaps, reverse pairs, falling squares, lazy range-add.
- Interval and bitmask DP: shortest path visiting all nodes, tour over a small set, partition into k equal-sum subsets, smallest sufficient team, can-I-win with a used mask, matchsticks to square, hats assignment, work sessions, burst balloons, strange printer, remove boxes, merge stones.
- Knapsack: equal-subset partition, target sum, last stone weight II, coin change both flavours, ones and zeroes (2D capacity), perfect squares, profitable schemes, largest integer with digit costs, tallest billboard, group knapsack.
- Fast and slow pointers: list cycle and its start, middle node, happy-number loop, palindrome list, duplicate number as cycle, circular array loop.
- In-place reversal: reverse list, reverse sublist, reverse in k-groups, swap pairs, rotate list, reverse words, reverse only letters.

## Take and skip
Take: the six-section order as a sanity check; the tag taxonomy, including topics we do not teach yet (Monotonic Queue, Rolling Hash, Ordered Set, Discretisation, Line Sweep); "reversed thinking" and "offline" as story hooks; the eight sorts as animation list.
Skip: all text, solutions, code, example I/O, numbering and links; the Chinese-only sets (lcof, lcp, lcs).
Gaps we can beat: grouped by number, not by pattern; no visual intuition; Hard-heavy on exactly the patterns beginners find scary.
