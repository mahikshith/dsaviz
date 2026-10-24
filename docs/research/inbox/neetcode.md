# NeetCode (inbox pass 1)

Date: 2026-10-25. Method: REA `capture_browser_scenario` (Edge, launch mode), 6 pages. Structure, order and ideas only; nothing copied.

## robots.txt
`User-agent: *` with an empty `Disallow:` (everything allowed), sitemap at /sitemap.xml. No AI-agent rules. Respected; no bot check or rate limit met.

## Licence and terms (https://neetcode.io/terms)
- Site design, logo and video content are under copyright 2022-present; footer says all rights reserved. No open licence.
- Terms bar distributing, publishing or making derivative works of site material. So: facts and structure only, no reuse of text, code, images or videos.
- Pro membership: lifetime or one-year plans, personal use only, no account sharing, mostly no refunds, "extensive free content" offered as the trial. Useful pricing-model reference for DSAMaxxing (free core, paid extras).
- Governing law: Washington State.

## Findings

### Courses page (/courses): 5 tracks, 11 courses
Each card carries hours and a difficulty tag.
1. Data Structures and Algorithms (2): "Algorithms & Data Structures for Beginners" (25h, Medium), then "Advanced Algorithms" (25h, Hard).
2. System Design (2): beginners (10h, Medium), then interview questions.
3. Python (3): beginners (12h, Easy), for coding interviews (8h, Easy), OOP (8h, Easy).
4. Full Stack (2): SQL for beginners (10h, Easy, interactive PostgreSQL), full stack app (20h, Medium).
5. Object Oriented Design (2): interviews (8h), patterns (8h).

Below sits an "All Lessons" shelf of 11 short standalone lessons: how to use the site, Python cheat sheet, Big-O, 8 data structures, sorting cheat sheet, 5 graph algorithms, 8 design patterns, 20 system design concepts, 30-day JavaScript challenge, a design-a-video-site walkthrough, a MongoDB crash course.

Pattern: beginners course then advanced course; hours + difficulty tag on every card; a language track separate from the algorithms track. Per-course module lists are not exposed on this page, so the inner lesson order is a gap.

### Roadmap (/roadmap): recommended topic order, 18 nodes
Arrays and Hashing, Two Pointers, Binary Search, Stack, Sliding Window, Linked List, Trees, Tries, Heap / Priority Queue, Backtracking, Graphs, 1-D Dynamic Programming, Intervals, Greedy, Advanced Graphs, Math and Geometry, 2-D Dynamic Programming, Bit Manipulation.
- Shown as a prerequisite graph; clicking a topic opens its problem list. List sets: Blind 75, NeetCode 150 (28 easy / 101 medium / 21 hard), 250, All.
- Progress extras: solved counter by difficulty, daily streak calendar with streak repair, "solve one a day".
- Observation: Big-O, recursion and sorting are not nodes in the graph (they live in cheatsheets); Greedy and Bit Manipulation come late.

### Cheatsheets library (left nav on every cheatsheet)
Grouped: Fundamentals (Big O, Recursion Guide, Nested Loop Complexity); Data Structures (HashMap, Tree, Heap, Graph crash courses, Graph Input Types, Data Structures in the Real World); Patterns (Sorting Algorithms, Binary Search, Binary Search Variations, Sliding Window, Monotonic Stack, Top K, Backtracking Patterns, Patterns Explained, Coding Patterns List); Interview Prep (Interview Terms). A fundamentals, structures, patterns, interview ladder.

### Big-O cheatsheet (/cheatsheets/big-o-notation)
- Framed as code snippets for understanding time complexity: one numbered section per class, each = heading, one-line plain description, code snippet (snippets not recorded).
- Order, 10 classes: O(1); O(log n); O(n); O(sqrt n); O(n log n); O(n*m) bilinear; O(n^2); O(n^3); O(2^n); O(n!).
- Unusual: sqrt n and bilinear n*m get their own sections. Callouts tie classes to shapes: quadratic = nested loop over the same array (two sequential passes stay O(n)); exponential = include/exclude decision trees (subsets); factorial = permutations.
- Closing notes: Big-O measures growth rate, not absolute speed; O(1) is not automatically fast.
- Sorting companion: 11 algorithms (quick, merge, heap, insertion, Timsort, bubble, Shellsort, bucket, radix, counting, selection), each with best / average / worst time and worst-case space, k defined where used; intro stresses stability.
- Page furniture: "On This Page" list and a Progress marker. No table or curve chart in the text extraction (a visual may exist but was not captured).

## Links seen
| URL | date | status | note |
|---|---|---|---|
| https://neetcode.io/robots.txt | 2026-10-25 | read | allow all |
| https://neetcode.io/courses | 2026-10-25 | read | course catalogue |
| https://neetcode.io/cheatsheets/big-o-notation | 2026-10-25 | read | 10 classes |
| https://neetcode.io/roadmap | 2026-10-25 | read | 18-node order |
| https://neetcode.io/terms | 2026-10-25 | read | copyright, memberships |
| https://neetcode.io/cheatsheets/sorting-algorithms | 2026-10-25 | read | 11 sorts |
| https://neetcode.io/courses/lessons/* (11 lessons) | 2026-10-25 | not opened | short lessons; pass 2 candidate |
| https://neetcode.io/cheatsheets/* (other 16) | 2026-10-25 | not opened | recursion, nested loops, hashmap, tree, heap, graph, patterns |
| https://neetcode.io/practice, /solutions, /versus | 2026-10-25 | not opened | problem lists, solutions, head-to-head mode |
| https://neetcode.io/pro, /redeem | 2026-10-25 | skipped | sales and referral |
| discord.gg, youtube.com, twitter, linkedin | 2026-10-25 | skipped | off-topic or YouTube |

## Beginner-friendly: feed "Start here"
- Hours and difficulty tag on every course card; a "beginners" course precedes "advanced".
- Cheat sheets grouped fundamentals, structures, patterns; plain one-line description before code.
- Big-O ladder with sqrt n and n*m plus the sequential-vs-nested warning; ours should show the growth shapes visually and count steps live.
- A "how to use the site" first stop; daily-streak and one-a-day nudge.
- Gap we can fill: recursion and sorting are not inside the roadmap graph, and the DSA track has no programming-first on-ramp (they use a separate Python track).

## Problem ideas (names and concepts only)
Added to candidates.md: pair sum in sorted array, longest run without repeats, balanced brackets, min stack, reverse list in place, tree depth, level-order walk, prefix tree, kth largest via heap, subsets, permutations, combination sum, course ordering (topological), climbing stairs, coin change, non-adjacent loot, jump reach, lone number via XOR, count set bits.
