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

---

# Pass 3 (2026-10-25): full public deep dive
Method: REA `capture_browser_scenario` (Edge launch mode), about 45 page loads in 12 calls, plus the roadmap drawer clicked once per node (18 clicks). robots.txt allows all (checked again); no bot check, login prompt or rate limit hit. Nothing gated was opened or bypassed; gated spots are named below. Structure, counts, ordering and UX only; no wording, lists or solutions copied, no LeetCode numbers recorded. Player names on the Versus leaderboard are not recorded.

## 1. Sitemap of what was reached
`/sitemap.xml` lists 2,269 URLs: 1,126 `/solutions/<slug>`, 1,093 `/problems/<slug>`, 25 `/practice/*`, 10 `/courses/*`, 6 `/ai-coding/solution/*`, 4 `/cheatsheets/*` (only the four free ones), 2 `/versus*`, plus `/`, `/roadmap`, `/pro`.

| area | URL pattern | reached | gate |
|---|---|---|---|
| Home | `/` | yes | open |
| Roadmap | `/roadmap` | yes, all 18 node drawers | open |
| Practice hub | `/practice` redirects to Core Skills; left menu groups: Coding Interviews (Problems, Company Tagged, Cheatsheets, Quizzes), AI Coding (beta), System Design, Machine Learning (Problems, Build Your GPT), Low Level Design, Databases | menu read | LLD, Databases: no own URL found; Quizzes and Cheatsheets redirect to Core Skills and the Big-O sheet |
| Lists | `/practice/practice/{coreSkills, blind75, neetcode150, neetcode250, allNC, systemDesign}` | yes | tail of each list Pro |
| Company lists | `/practice/company`, `/practice/company/<name>` (24 companies, 14 in sitemap) | yes (Google) | one sample problem free per company, rest Pro |
| Review | `/practice/review` | yes | marked "Deprecated" on the page |
| ML | `/practice/machine-learning`, `/practice/machine-learning/project` | yes | all 36 problems tagged free |
| AI coding (beta) | `/practice/ai-coding`, 6 `/ai-coding/solution/<slug>` | list only | solutions not opened |
| Problem page | `/problems/<slug>/{question,solution,submissions,discuss}`, mirror `/solutions/<slug>` | question and solution of one free problem | many Pro |
| Courses | `/courses`, `/courses/<course>/<n>` for dsa-for-beginners, advanced-algorithms, system-design-for-beginners, system-design-interview, full-stack-dev, ood-interview, design-patterns | yes, sidebar and first lesson | most lessons Pro |
| Missing courses | `ai-engineering/0` redirects back to `/courses`; guessed slugs for the Python and SQL courses render blank | no | not public or different slug |
| Cheatsheets | 4 in sitemap (Big-O, Recursion, Sorting, HashMap); left nav shows 16 | Big-O re-read | 12 Pro (pass 2) |
| Lessons | `/courses/lessons/*` (11) | pass 2 | two empty renders |
| Versus | `/versus`, `/versus/leaderboard` | leaderboard read | playing needs sign-in |
| Pro | `/pro`, `/pro/gift`, `/redeem` | `/pro` read | purchase not touched |
| Legal | `/terms`, `/privacy` | terms in pass 1 | open |

Nav bar everywhere: Courses, Practice, Roadmap, Versus (NEW badge), Pro, Sign In, plus a "Get Pro" banner. Footer: link trio (Blind 75, NeetCode 150, NeetCode 250, How to use), socials (skipped), contact, legal. Home page claims 1M+ engineers and 1,000+ problems with video explanations, and shows success-story quotes with employer names. Social links, Discord and YouTube skipped.

## 2. Roadmap: 18 nodes, 21 edges, per-node counts
Graph read from the page's own node and edge data (a prerequisite DAG drawn top to bottom, with settings for dragging, panning, zooming). Edge = "learn this first".
Edges: Arrays and Hashing to Two Pointers and to Stack; Two Pointers to Binary Search, Sliding Window and Linked List; Linked List and Binary Search to Trees; Trees to Tries, Heap and Backtracking; Backtracking to Graphs and to 1-D DP; Heap to Intervals, Greedy and Advanced Graphs; Graphs to Advanced Graphs and to 2-D DP; 1-D DP to 2-D DP and to Bit Manipulation; 2-D DP and Bit Manipulation to Math and Geometry. Observation: Stack, Sliding Window, Tries, Intervals and Greedy are leaves; Math and Geometry is the sink.

Click on a node opens a side drawer (no URL change) with: title and solved fraction, a "Prerequisites" strip of chips that each name a course lesson (and which course it lives in), then the node's problem table (Status, Star, Problem, Difficulty, Solution). Each node card carries a thin progress bar. A header strip shows Easy/Medium/Hard solved over total (28/101/21 of 150), a list switcher (NeetCode 150, Blind 75, 250, All), and a month calendar with streak.

| node | problems | E/M/H | prerequisite chips (lessons) |
|---|---|---|---|
| Arrays and Hashing | 9 | 3/6/0 | dynamic arrays, hash usage, hash implementation (beginners course); prefix sums (advanced) |
| Two Pointers | 5 | 1/3/1 | two pointers (advanced) |
| Stack | 6 | 1/4/1 | stacks (beginners) |
| Binary Search | 7 | 1/5/1 | search array, search range (beginners) |
| Sliding Window | 6 | 1/3/2 | fixed-size and variable-size windows (advanced) |
| Linked List | 11 | 3/6/2 | singly and doubly linked lists (beginners); fast and slow pointers (advanced) |
| Trees | 15 | 6/7/2 | BST insert/remove, DFS, BFS, BST sets/maps (beginners); iterative DFS (advanced) |
| Tries | 3 | 0/2/1 | trie (advanced) |
| Heap / Priority Queue | 7 | 2/4/1 | heap properties, push/pop, heapify (beginners); two heaps (advanced) |
| Backtracking | 10 | 0/9/1 | tree maze (beginners); subsets, combinations, permutations (advanced) |
| Graphs | 13 | 0/12/1 | intro to graphs, matrix DFS, matrix BFS, adjacency list (beginners) |
| Advanced Graphs | 6 | 0/3/3 | Dijkstra, Prim, Kruskal, topological sort (advanced) |
| 1-D DP | 12 | 2/10/0 | 1-dimension DP (beginners); palindromes (advanced) |
| 2-D DP | 11 | 0/7/4 | 2-dimension DP (beginners); 0/1 knapsack, unbounded knapsack, LCS (advanced) |
| Intervals | 6 | 1/4/1 | none |
| Greedy | 8 | 0/8/0 | Kadane's (advanced) |
| Bit Manipulation | 7 | 5/2/0 | bit operations (beginners) |
| Math and Geometry | 8 | 2/6/0 | none |

Takeaways: every node is a pattern bucket with 3 to 15 problems; node-to-lesson linking is the glue between the roadmap and the courses; mediums dominate (101 of 150); two nodes (Intervals, Math) have no lesson. The home page shows the same nodes as a vertical list with a one-line blurb and a 0/N ring.

## 3. Practice lists: sizes and topic splits (counts only)
All lists share one page template: title, one-line blurb, Solved x/N, Starred count, list-switcher tabs with emoji, Easy/Medium/Hard counters, topic accordions each with a solved fraction, a table, and a tag cloud of the whole library.

| list | total | E/M/H | notes |
|---|---|---|---|
| Core Skills | 20 | 4/12/4 | 4 free, 16 Pro; sections: data structures to implement (9), sorting (3), graphs (6), DP (2) |
| Blind 75 | 75 | 19/49/7 | same 18 topics |
| NeetCode 150 | 150 | 28/101/21 | the roadmap list |
| NeetCode 250 | 250 | 60/155/35 | "150 plus 100", pitched as the most beginner-friendly list for people new to algorithms |
| NeetCode All | 1,126 | 241/702/183 | 824 free, 302 Pro; described as everything solved on YouTube, unstructured, good for random picks; adds a 19th tab "JavaScript" with 30 items |
| System Design list | 19 | 8/4/7 | single table, difficulty tag only |
| Machine Learning | 36 | 13/21/2 | 7 sections: math foundations 6, build a neural net 5, PyTorch 4, training 4, NLP 4, attention and transformers 3, build GPT 10 |
| AI Coding (beta) | 6 | 0/2/4 | 3-phase sessions (bug fix, implement, optimise) |

Topic split across lists, in the 150-list order (Arrays and Hashing, Two Pointers, Sliding Window, Binary Search, Linked List, Stack, Trees, Tries, Backtracking, Heap, Graphs, Advanced Graphs, 1-D DP, 2-D DP, Greedy, Intervals, Bit Manipulation, Math and Geometry):
- Blind 75: 8, 3, 4, 2, 6, 1, 11, 3, 2, 1, 6, 1, 10, 2, 2, 5, 5, 3 (uneven: stack 1, heap 1; trees 11, 1-D DP 10).
- NeetCode 250: 22, 13, 9, 14, 14, 14, 23, 4, 17, 12, 21, 10, 17, 16, 14, 7, 10, 13.
- NeetCode All: 208, 48, 47, 49, 41, 42, 112, 16, 45, 36, 76, 36, 61, 67, 79, 24, 33, 76 (sum 1,096; the other 30 are the JavaScript tab).
- NeetCode 150 split is already in platforms/neetcode.md.

Library tag cloud (top): array 624, string 273, hash table 233, DP 189, sorting 154, DFS 147, math 138, tree 120, BFS 117, greedy 109, then matrix, binary tree, two pointers, binary search, stack, bit, design, heap, prefix sum, sliding window, backtracking, linked list, simulation, graph, counting, union-find (about 70 tags).

Company Tagged (`/practice/company`): 24 companies in a carousel, each with a count, "sorted by how often asked". Top counts: Google 789, Amazon 746, Meta 642, Microsoft 603, Bloomberg 551, TikTok 226, Oracle 200, Apple 189, Uber 154, Goldman Sachs 145, TCS 141, Infosys 127, LinkedIn 100, Walmart Labs 95, Zoho 90. Free tier shows one problem per company, then a "join Pro for all N" banner. Same solved counters and calendar side panel.

Review list (`/practice/review`, deprecated): a table of the early curated set with extra columns for submission count and like/dislike percentage. Idea only: community signal columns.

## 4. Courses: outlines (summaries)
Course page = left sidebar of sections and numbered lessons (title, minutes, FREE tag), progress "n / total", main pane with the open lesson, Next link, "On This Page" outline, Mark Complete, "View Code" (code courses), "How was this lesson?" rating, and a Suggested Problems table under each lesson.

| course | lessons | free | arc |
|---|---|---|---|
| Algorithms and Data Structures for Beginners | 35 (intro + 34), 12 sections | 3 | RAM and arrays (static, dynamic), stacks, linked lists (singly, doubly), queues, recursion (factorial, Fibonacci), sorting (insertion, merge, quick, bucket), binary search (array, range), trees (binary tree, BST, insert/remove, DFS, BFS, sets and maps), backtracking (one tree-maze lesson), heaps (properties, push/pop, heapify), hashing (usage, implementation), graphs (intro, matrix DFS, matrix BFS, adjacency list), DP (1-D, 2-D), bit operations. Intro advertises 34 videos, 34 articles, 63 exercises with video answers, 85 animations, 77 diagrams; pitch is interview-focused, active learning, progressive order |
| Advanced Algorithms | 22 | 1 | arrays (Kadane, windows fixed/variable, two pointers, prefix sums), fast/slow pointers, trees (trie, union-find, segment tree, iterative DFS), two heaps, backtracking (subsets, combinations, permutations), graphs (Dijkstra, Prim, Kruskal, topological sort), DP (two knapsacks, LCS, palindromes). 8 to 32 minutes each. Free lesson opens with brute force, then the better way, language tabs |
| System Design for Beginners | 21 | 2 | background (computer architecture, application architecture, design requirements), networking (basics, TCP/UDP, DNS), APIs (HTTP, WebSockets, paradigms, design), caching (caching, CDNs), proxies (load balancing, consistent hashing), storage (SQL, NoSQL, replication and sharding, CAP, object storage), big data (message queues, MapReduce). Free lessons are prose with diagrams and a closing notes block |
| System Design Interview | 10 | 2 | how to approach, then 9 designs (rate limiter, URL shortener, microblog, chat, video site, file sync, maps, key-value store, message queue), 23 to 31 minutes each; body gated beyond the two free ones |
| Full Stack Development | 22 | 5 | one project: demo and architecture, video-processing service (init, local processing, containerise, cloud storage), cloud deploy (pub/sub, buckets), web app (framework, navbar, auth, sign-in), data store, upload and watch features, deploy, limitations |
| Object Oriented Design Interviews | 7 | 1 | seven game/system designs (grid game, card game, parking lot, bank, recommender, elevator, chess); each: background, requirement questions, basics, class design, code |
| Object Oriented Design Patterns | 11 | 4 | intro on the four OOP pillars, then creational (factory method, singleton, builder, prototype), structural (adapter, decorator, facade), behavioural (strategy, observer, state) |
| Python (3 courses) and SQL for Beginners | 4 cards | n/a | listed on `/courses` with hours and Easy tag, no public URL reached |
| AI Engineering | in sitemap | n/a | `/courses/ai-engineering/0` redirects to `/courses` (unreleased) |

Totals reached: 128 lessons in 7 courses, 18 free (14 percent). Typical lesson 8 to 30 minutes. Free lessons are the intro or "taste" lessons.

The 11-lesson standalone shelf stays as recorded in pass 2; two of them (20 system design concepts, 30-day JavaScript) still render empty.

## 5. Cheatsheets
Left nav (on every cheatsheet), 16 sheets in 4 groups: Fundamentals (Big O, Recursion, Nested Loop Complexity); Data Structures (HashMap, Tree, Heap, Graph crash courses, Graph Input Types, Data Structures in the Real World); Patterns (Sorting, Binary Search, Binary Search Variations, Sliding Window, Monotonic Stack, Top K, Backtracking Patterns, Patterns Explained, Coding Patterns List); Interview Prep (Interview Terms). Public: 4 (Big O, Recursion, Sorting, HashMap); the sitemap lists only those. A "Solutions" link sits above the group list. Every sheet: title, one-line framing, numbered sections, NOTES block, "On This Page" outline and a Progress marker.

## 6. Problem page and editor (UI patterns)
Observed on a free problem (question and solution tabs).
- Header tabs: Question, Solution, Submissions, Discuss (with a comment count). Title, difficulty chip, anchors for Topics, Company Tags, Hints.
- Question tab order: statement, two examples, constraints, topic tags, "recommended time and space complexity" (a target stated before solving), three progressive hints, company tags with frequency counts, "Seen this in a real interview? Yes/No" (opens a 4-step form), acceptance rate.
- Editor pane: language dropdown (Python, Java, C++, JavaScript, TypeScript, C#, Go, Kotlin, Swift, Rust; each shows a version string), an Auto mode, solution tabs with "+", buttons NeetBot, Hint, Run, Submit; Monaco editor with line/column readout; below it Test Case and Output tabs (Case 1, Case 2, editable input) and a Console. Run and Submit have keyboard shortcuts; an accessibility help dialog lists them (command palette, format document, tab focus trap toggle).
- Settings dialog: font size (12 to 24), tab size, Vim key bindings, relative line numbers, word wrap, IntelliSense, AI features on/off, "ask NeetBot on selection", celebration animation on accept.
- Dialogs: reset code (this problem, or all via profile), close solution (code lost warning), clear problem history (submissions, saved code in all languages, mark incomplete), replace editor code with a past submission to show a suggested fix, language notes (for example a missing built-in sorted container in Python), "Daily Streak" modal after a solve, GitHub sync (remove file from repo).
- Solution tab: video link, a prerequisites block (lesson chip plus three concept notes), then one numbered section per approach from brute force up to the best (this problem had four), each = Intuition, Algorithm, an embedded step-through animation ("Step n / N", speed 0.5x/1x/2x, input drawn as an indexed array), code tabs in 8 languages, Time and Space Complexity; ends with "Common Pitfalls". An ad block (Carbon) sits above the prerequisites.
- Page shell: sticky top nav, collapsible left "Practice" menu on list pages, draggable splitter between question and editor, side panel on list pages with month calendar, current and best streak, "solve one a day", sign-in prompt for ranking, "Delete Progress" and "Streak Repair" modals (repair counter).
- Progress model: anonymous = local only (warns that code in other browsers must be reset separately); signed in = cloud sync, ranking, GitHub push. Solved is set automatically on an accepted submission.
- Machine Learning adds a "Build Your GPT" project: each solved problem fills one file in a project tree (normalisation, embeddings, attention, transformer, GPT, KV cache, training loop, generation); progress bar, download ZIP, push to GitHub.
- Versus: lobby plus leaderboard (tabs All, Master, Diamond, Gold, Silver, Bronze, Beginner; columns rank, player, tier, rating, record W-L-T, win percent; 50 rows then "Load more"; generated anonymous usernames).

## 7. Free vs Pro (what is open, what is paywalled)
Pricing (page read): Lifetime $297 (struck $599), one year $119 (struck $199, auto-renew off by default), gift plan; both include a private Discord. FAQ topics: what is included, auto-renew, future updates, student discount, refunds, account sharing and transfer.

| feature | free | Pro |
|---|---|---|
| Roadmap graph, drawers, node progress | yes | n/a |
| 150 / 250 / Blind 75 lists and in-browser run | yes (editor works; list tail locked) | full |
| NeetCode All | 824 of 1,126 | +302 |
| Core Skills | 4 of 20 | 16 |
| Machine Learning (36) | free | n/a |
| Courses | 18 of 128 lessons | all, plus exercises with video solutions |
| Cheatsheets | 4 of 16 | 12 |
| Solutions with step animations | free-tagged problems | all, in 8 languages |
| Company tags | one sample per company | 100+ companies, full lists |
| NeetBot, AI hints, debug with side-by-side fix | limited | included |
| Cloud sync of code | no (local) | yes |
| Video explanations | YouTube | 200+ videos in-site |
| Versus play | needs account | n/a |
| Streak, calendar, stars | yes | n/a |
| Ads (Carbon) | shown on free solution pages | not verified |

Pro page pitch tiles (8): video courses (200+ videos), practice problems (300+), written guides, code solutions (8 languages), NeetBot, AI hints and debug, company tagged problems (100+ companies), cloud sync; then success stories and a "Show more" list.

## 8. Feature parity: what NeetCode has that DSAMaxxing does not
Compared against the checklist in docs/research/README.md and the default-branch README (`origin/claude/gracious-edison-tx7t62`: 553-problem sheet, 351 problems with tests, JS and Python run in browser, SQL on SQLite, 47 stories, system design 29 lessons, 21 AI/ML lessons, Git visual, search, PWA, contests, four themes, mock interview, pattern map).

Already ahead or equal: animated stories with a cast; local-first progress with export/import; search; offline PWA; SQL practice; Git visual; system design and AI/ML animated lessons; four themes; no ads; mock interview page; pattern map; company tags and filters on the sheet.

Gaps, ranked by value for DSAMaxxing (backend need noted):
1. **Roadmap node drawer** with prerequisite lesson chips plus the node's problem list in place, and a progress bar on each card. Our pattern map has cards and links but no inline drawer. No backend.
2. **Roadmap pan/zoom/drag settings** on a prerequisite DAG (ours is a fixed 6x10 grid). Low priority; no backend.
3. **Lesson-to-problem linking both ways** (each lesson ends with Suggested Problems; each problem links back to its prerequisite lesson). We link stories to problems one way. No backend.
4. **Multi-approach solutions**: brute force, better, best as numbered sections, each with Intuition, Algorithm, its own step animation and a Time and Space block, ending with Common Pitfalls. Our problem page has one story per problem. High value, no backend.
5. **"Recommended time and space target" shown before solving** on every problem page. (We have 3 hints.) No backend.
6. **Animation speed presets and "Step n / N" readout** (0.5x, 1x, 2x). Checklist already plans speed control in `problem-page`; keep it.
7. **More languages in the runner**: Java, C++, Go (they offer 10). Already planned as `runner-more-langs`.
8. **Editor preferences**: font size, tab size, Vim bindings, relative line numbers, word wrap, IntelliSense toggle, celebration toggle; keyboard shortcuts for Run and Submit; an editor accessibility help dialog. Not in checklist.
9. **Per-problem submissions history**, "replace editor code with a past submission", **reset code** and **clear problem history** dialogs. Not in checklist; local-first possible.
10. **Streak repair** and a "Daily Streak" modal after a solve. Streak and heatmap are on our list; repair is new.
11. **Header counters** per list (Solved, Starred, Free, Pro) and Easy/Medium/Hard solved over total. Revision stars are on our list; the counter framing is new.
12. **Course player shell**: left sidebar of sections with minutes per lesson and a FREE tag, per-course progress, Mark Complete, "How was this lesson?" rating, Next link, On This Page outline. We have lesson players but no course shell with durations and per-course progress.
13. **Cheatsheet library** (16 sheets, 4 groups) with On This Page, Progress marker and NOTES block. We have Basics and Glossary only.
14. **Named tiered lists** (75 short, 150 core, 250 beginner, all) with per-topic fractions. Our master sheet has groups but no named tiers.
15. **Company-frequency lists**: 24 companies ranked by question count, "sorted by how often asked". We have company tags; a ranked page per company is new. Data needs sourcing.
16. **Machine Learning coding track** (36 problems) that assembles into a downloadable project, with GitHub push. We have ML lessons but no coding problems. Large; needs a Python ML runner.
17. **AI-assisted interview sessions** (3 phases, written reflection, voice follow-up). Needs an AI backend; later.
18. **Interview experience crowdsourcing**, acceptance rates, submissions and discuss tabs, community like/dislike column. Needs backend.
19. **Versus head-to-head races** with rating tiers and leaderboard. Needs backend; our leaderboard is demo data.
20. **Cloud sync and GitHub sync of code.** Needs backend (checklist already defers it).
21. **Core Skills "implement it" list**: build the structure yourself (dynamic array, linked list, deque, BST, hash table, heap, graph, union-find, segment tree; sorts; graph algorithms; two knapsacks). P1 in platforms/neetcode.md; still not in the checklist.
22. **System design practice list** (19 questions with difficulty) beside the course; ours has 29 lessons but no practice list by difficulty.
23. **OOD interview designs** as a course (7 games and systems); ours has 9 LLD lessons.
24. Out of scope per owner: video lessons, TTS. Not adopting: ads.

## 9. Beginner-friendly: feed "Start here"
- Show minutes per lesson and an N-lesson progress count on every course page.
- State plainly that every lesson is free (they paywall most).
- Roadmap prerequisites that name the exact lesson; ours can name the exact story.
- Solutions that start from the slow idea and improve it are easier for beginners than a single best answer.
- A "common pitfalls" end block per problem.
