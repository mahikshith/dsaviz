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

---

# Pass 2 (2026-10-25): standalone lessons and remaining cheatsheets
Method: REA, 21 pages in 5 calls. Structure, ordering and teaching devices only; no wording recorded (their terms bar derivatives).

## Gating: most cheatsheets are Pro-only
Pro-locked (page shows only an "available for NeetCode Pro members" notice, so no content): Nested Loop Complexity, Tree, Heap and Graph crash courses, Graph Input Types, Data Structures in the Real World, Coding Patterns List, Patterns Explained. Readable free: Recursion Guide, Hash Map Crash Course, Big-O, Sorting. Free pages carry an ad block (Carbon), so our product should stay ad-free. The 20 System Design Concepts and 30-Day JavaScript lessons rendered empty (likely gated). Locked titles still hint at content: tree/heap/graph "crash courses", how graph problems present their input (edge list, adjacency list, matrix), and a patterns list.

## Free cheatsheets: teaching devices
- **Recursion Guide for Beginners:** analogy first (a gift box holding either a value or smaller boxes) mapping to base case vs recursive case; one worked example (Fibonacci) reusing the same two subheadings; ends with a three-item checklist (can it shrink into similar smaller problems, are base cases clear, does each call move toward a base case). Mentions stack overflow when a base case is missing. Order: analogy, vocabulary, example, checklist.
- **Hash Map Crash Course:** food-themed mnemonic for "hash" and "map", then the O(1) promise. Three numbered parts: operations (add/remove, check key, check value, access, iterate), common use cases (pair sum, duplicate detection, counting), under the hood (hashing, hash functions, resize and rehash, open addressing, chaining). Notes: O(1) is average case, bad hash functions hurt, avoid when order matters. Arrow-bullet outline style.
- **Page furniture:** "On This Page" side list, Progress marker, NOTES block at the bottom.

## Standalone lessons (/courses/lessons/*)
Each has an "Updated" date and author byline, a code-language tab strip (Python, Java, C++, JavaScript) and code blocks.
| lesson | sections in order | device |
|---|---|---|
| How to Use NeetCode Effectively | Prerequisites (1 a programming language, 2 data structures and algorithms, 3 optional advanced algorithms and math), then How to Practice (just start; what if you cannot solve it; am I ready; which topics matter most; other resources) | prerequisites then practice; do/don't lists with time boxes (look at a solution after about 15-20 min, try something easier after 45-60 min); readiness rule: solve unseen mediums in 20-25 min; top four topics: arrays, hash maps, trees, graphs |
| Big-O Notation (lesson) | O(1), O(n), O(n^2), O(n*m), O(n^3), O(log n), O(n log n), O(2^n), O(c^n), O(n!), O(sqrt n) | 11 classes, each a short description plus code; says Big-O is the worst case; links to the beginners course. Order differs from the cheatsheet (cheatsheet runs by growth; lesson groups by loop shape) |
| 8 Data Structures | Arrays, Linked Lists, HashMaps, Queues, Trees, Prefix Trees, Heaps, Graphs | 1-2 sentence blurb each plus "Learn more" link; notes linked lists and trees are special graphs |
| Sorting Algorithms | Insertion, Merge, Quick, Bucket | prose + code per algorithm, language tabs |
| 5 Graph Algorithms | DFS, BFS, Union-Find, Topological Sort, Dijkstra | five graph tools in rising difficulty |
| Python Cheat Sheet | Variables, If, Loops, Math, Arrays, Strings, Queues, HashSets, HashMaps, Tuples, Heaps, Functions, Classes | language reference ordered like the data-structure ladder |
| 8 Design Patterns | Creational (Factory, Builder, Singleton), Behavioural (Observer/PubSub, Iterator, Strategy), Structural (Facade, Adapter) | grouped by family |
| MongoDB Crash Course | Setup, shell, collections, CRUD, aggregation, indexes, operators, ACID, references | task-by-task |
| Design a YouTube Clone | Introduction, Background, Requirements, High Level Design (7 components), Detailed Design (sign up, upload, processing), Limitations and Future Work, References | worked design write-up template |

## What this adds for DSAMaxxing
- Their must-know core: structures = arrays, linked lists, stacks, queues, binary trees, hash maps, heaps, graphs; algorithms = binary search, tree traversals, merge/quick sort, BFS, DFS; top-4 priority = arrays, hash maps, trees, graphs. Good basis for a marked "core" path in our track.
- Neither their roadmap nor lessons includes a "what is a program / variables / loops" on-ramp (separate Python course). Our Start here can be one connected path.
- Free-vs-Pro gap we can beat: nested-loop complexity, tree/heap/graph crash courses and pattern lists are Pro there; free, visual, interactive versions are a differentiator.
- Devices worth borrowing as ideas (written our own way): analogy-first recursion with one reused example and a three-line checklist; do/don't practice rules with time boxes; a "when to peek at the solution" rule; a readiness rule of thumb; language-tab code blocks; "Updated" bylines; a mini outline at the top of every guide.

## Links (pass 2)
| URL | date | status | note |
|---|---|---|---|
| https://neetcode.io/cheatsheets/recursion-guide | 2026-10-25 | read | free |
| https://neetcode.io/cheatsheets/hashmap-crash-course | 2026-10-25 | read | free |
| https://neetcode.io/cheatsheets/nested-loop-complexity | 2026-10-25 | Pro-locked | no content |
| https://neetcode.io/cheatsheets/tree-crash-course | 2026-10-25 | Pro-locked | no content |
| https://neetcode.io/cheatsheets/heap-crash-course | 2026-10-25 | Pro-locked | no content |
| https://neetcode.io/cheatsheets/graph-crash-course | 2026-10-25 | Pro-locked | no content |
| https://neetcode.io/cheatsheets/graph-input-types | 2026-10-25 | Pro-locked | no content |
| https://neetcode.io/cheatsheets/12-data-structures-in-the-real-world | 2026-10-25 | Pro-locked | no content |
| https://neetcode.io/cheatsheets/24-patterns-list | 2026-10-25 | Pro-locked | no content |
| https://neetcode.io/cheatsheets/patterns-explained | 2026-10-25 | Pro-locked | no content |
| https://neetcode.io/courses/lessons/how-to-use-neetcode-effectively | 2026-10-25 | read | free |
| https://neetcode.io/courses/lessons/big-o-notation | 2026-10-25 | read | free |
| https://neetcode.io/courses/lessons/8-data-structures | 2026-10-25 | read | free |
| https://neetcode.io/courses/lessons/sorting-algorithms | 2026-10-25 | read | free |
| https://neetcode.io/courses/lessons/5-graph-algorithms | 2026-10-25 | read | free |
| https://neetcode.io/courses/lessons/python-for-coding-interviews | 2026-10-25 | read | titled Python Cheat Sheet |
| https://neetcode.io/courses/lessons/8-design-patterns | 2026-10-25 | read | free |
| https://neetcode.io/courses/lessons/mongodb | 2026-10-25 | read | free |
| https://neetcode.io/courses/lessons/design-youtube | 2026-10-25 | read | free |
| https://neetcode.io/courses/lessons/20-sysdes-concepts | 2026-10-25 | empty render | likely gated |
| https://neetcode.io/courses/lessons/30-day-javascript-challenge | 2026-10-25 | empty render | likely gated |
| other cheatsheets (binary-search-course, binary-variations, sliding-window-variations, monotonic-stack, top-k-pattern, backtracking-patterns, 76-interview-terms) | 2026-10-25 | not opened | likely Pro-locked like siblings |
