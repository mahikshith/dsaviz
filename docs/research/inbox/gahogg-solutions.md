# gahogg/Leetcode-Solutions (reference only)

Pass 1, 2026-10-25. Method: REA (Edge launch) loaded the repo root page; structure read from a shallow clone at `C:\Users\mahik\Desktop\inbox-repos\Leetcode-Solutions` (data only, nothing run). Star count not captured. No YouTube or channel links followed.

## Licence
**No LICENSE file in the repo** (root has only the problem folders). No licence means all rights reserved by default. **Reference only**: we take the problem-name list and its rough ordering, nothing else. The shallow clone shows one commit, so history gives no ordering signal.

## Structure
- Flat: 125 folders at root, each named `<Title> - Leetcode <number>`. No topic folders, no README, no index.
- Each folder holds the same solution in 4 languages: Python, Java, C++, JavaScript (one file each).
- Comment style in files is short and code-first (one Python sample about 1.4 KB for the classic first problem). We do not reuse any of it.
- Because the list is flat, grouping below is our own, from titles.

## Counts (125 problems; our grouping from titles, approximate)
| Group | Approx. count |
|---|---|
| Arrays and strings (two pointers, sliding window, prefix/suffix, in-place edits) | 34 |
| Hash maps and sets | 9 |
| Binary search and sorted arrays | 9 |
| Stack, queue, design | 9 |
| Linked lists | 9 |
| Trees (traversal, BST, LCA, depth) | 19 |
| Graphs and grids (BFS, DFS, topo sort, shortest path, MST) | 13 |
| Heap / top-K | 4 |
| Backtracking | 8 |
| DP | 9 |
| Greedy, intervals, math, bits | 12 |
Difficulty is not recorded anywhere in the repo. By title the list is roughly 40% Easy, 50% Medium, 10% Hard, and heavy on the classic "starter 150" set.

## Beginner-friendly items (concept names)
Running sum of an array, contains duplicate, valid anagram, ransom note, jewels and stones, valid palindrome, merge strings alternately, remove element or duplicates in place, reverse a string, reverse a linked list, middle of a list, merge two sorted lists, linked-list cycle, binary search plus first-bad-version, search insert position, squares of a sorted array, climbing stairs, Fibonacci, best time to buy and sell, single number, number of 1 bits, valid parentheses, baseball-game stack, same tree, symmetric tree, invert a tree, max depth, path sum, summary ranges, base-7 conversion, find closest to zero.

## Pattern coverage in the list vs our thin patterns
| Our thin pattern | In this repo |
|---|---|
| Linked Lists | reverse, merge two sorted, merge k sorted, remove nth from end, remove duplicates, middle, cycle, copy with random pointer, insert gcds between nodes, LRU cache: about 9, mostly the classics |
| Monotonic Stack | daily temperatures, largest rectangle in histogram, trapping rain water: 3 |
| Sorting | sort colours, merge sorted array, merge intervals, kth largest, top K frequent: light, few sorting-for-its-own-sake items |
| Tries | implement a prefix tree: 1 |
| Segment Tree | none |
| Interval and Bitmask DP | none |
| Knapsack | coin change, combination sum: 2 |
| Fast and Slow | cycle and middle: 2 |
| In-place Reversal | reverse list, reverse string: 2 |
Conclusion: a "starter set" source, helpful for confirming that our beginner tier includes the usual suspects, not for advanced patterns.

## Problem ideas (concept-level, no numbers)
Already common in sheets, so low novelty; new-to-us flavours to check against our bank:
- "Insert greatest common divisors between list neighbours" (linked list with arithmetic).
- "Count tree nodes equal to the average of their subtree" and "count good nodes on the path" (tree DFS carrying state).
- "Average of each level of a tree" (BFS with aggregation).
- "Wait for a warmer day" and "largest rectangle in a histogram" as a paired monotonic-stack lesson (easy-to-hard ladder).
- "Longest repeating character replacement" and "max consecutive ones with k flips" (sliding window with a budget).
- "Pacific-Atlantic water flow" (multi-source reverse flood fill) and "rotting oranges" (multi-source BFS).
- "Minimum cost to connect all points" (MST) and "network delay time" (Dijkstra) as the small graph-weights pair.
- "Summary ranges" and "H-index" as gentle interval/sorting warm-ups.
Added to candidates.md only where it fills a thin pattern.

## Take and skip
Take: the title list as a cross-check that nothing classic is missing; the idea of the same lesson ladder (easy then hard version of the same pattern).
Skip: all code and comments, numbers, the filenames convention, any link out.
