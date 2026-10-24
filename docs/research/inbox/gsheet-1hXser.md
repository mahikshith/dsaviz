# Google Sheet 1hXser... (DSA 375-question sheet)

Status: reachable without sign-in (public export worked, 2026-10-25). Read once as CSV. Structure and idea names only; no sheet content is republished.

## Findings
- Title in sheet: "DSA by Shradha Ma'am" (Apna College YouTube channel). A single tab: 375 questions, columns Topics / Question / Companies / Remarks.
- Pacing guidance in the header: Easy 5-10 min, Medium 15-20 min, Hard 40-60 min (88 hard); suggests 5 questions a day.
- Companies column: free-text lists of firms that reportedly asked each question (quality is uneven, copied style). Remarks column is mostly empty, occasionally a technique hint (Kadane, two pointers, stacks, auxiliary arrays).
- Questions use LeetCode/GfG-style titles, some with typos; some are GfG "Set 1/Set 2" items. We must re-title everything in our own words and drop numbers/links.

### Topic order and size (as in the sheet)
Arrays 26 > Strings 22 > 2D Arrays 10 > Searching & Sorting 23 > Backtracking 21 > Linked List 26 > Stacks & Queues 27 > Greedy 22 > Binary Trees 33 > Binary Search Trees 21 > Heaps & Hashing 28 > Graphs 40 > Tries 6 > DP 54 > Bit Manipulation 10 > Segment Trees 6. Total 375.

Observations vs our curriculum:
- Backtracking comes before linked lists/trees (unusual; we put it after recursion and trees).
- Hashing is bundled with heaps; no separate two-pointer / sliding-window / intervals / monotonic-stack topics (they hide inside Arrays and Stacks).
- DP is the largest block (54), Graphs next (40). Tries and Segment Trees are small tail topics.
- No math/number theory, no union-find, no topological-sort topic label (inside Graphs).

## Beginner-friendly -> Start here
- Arrays: find max/min, reverse in place, contains-duplicate, best time to buy/sell, max subarray (Kadane).
- Strings: valid palindrome, valid anagram, valid parentheses, longest common prefix.
- Linked list: reverse, detect cycle, merge two sorted lists.
- Stacks/queues: stack via queues, queue reversal, postfix evaluation.
- Trees: max depth, invert tree, level order.
- DP: climbing stairs as the entry point.
- Bit manipulation: count set bits, power of two.
- Sheet pacing idea (time-boxed difficulty, N a day) is worth borrowing as a "daily plan" feature.

## Problem ideas
See candidates.md rows tagged gsheet-1hXser. Highlights: Kadane's, rotated-array search/min, 3Sum / two-pointer container, merge intervals, next permutation, product except self, trapping rain water, set-matrix-zeroes, spiral/rotate matrix, island counting (grid DFS), N-Queens / sudoku / rat in a maze, activity selection, tree views (left view), BST predecessor/successor, top-K frequent, range sum query (segment tree), count smaller after self.
DS/ML interview topics: none.

## Links seen
| link | what | followed |
|---|---|---|
| Apna College YouTube channel (header text) | creator channel | no (YouTube skipped) |
| Per-question links, if any | not present in the CSV export | n/a |

## Licence and terms
No licence stated in the sheet. Treat as all rights reserved by the creator. Used only as structure/idea reference; every title, statement, hint and solution in DSAMaxxing is written by us, no LeetCode numbers or links, no company-tag lists copied.
