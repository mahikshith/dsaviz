# NeetCode (neetcode.io) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt: `User-agent: *` / empty `Disallow:` plus `Sitemap: https://neetcode.io/sitemap.xml` = allowed. No bot check or rate limit seen. Not logged in; no sign-in attempted.
- Pages captured: `/`, `/roadmap`, `/practice` (redirects to `/practice/practice/coreSkills`), `/practice/practice/neetcode150`, `/courses`, `/versus`, `/pro`, `/terms`, one problem page `/problems/dijkstra/question`, and the stylesheet `styles.6d929de3ea03c3fa.css`.
- Angular single-page app; content rendered after about 4 s. Roadmap graph node geometry is not in DOM text (drawn in a pannable/zoomable graph; only labels were captured).
- Curated lists are reference only: counts, structure and about 10 sample names with links. We do not copy the lists.

## Summary and business model
- Founded 2020 by Navi (Navdeep Singh) from a YouTube channel. Pitch: "A better way to prepare" for coding interviews; claims 1M+ engineers, 1,000+ practice problems with video explanations.
- Freemium. Free: roadmap, practice lists with in-browser editor, many problem pages, some lessons. Pro: lifetime $297 (struck from $599), one-year $119 (struck from $199, auto-renew off by default), gift plans, private Discord. Pro adds 200+ videos, 300+ problems, written guides, solutions in 8 languages, NeetBot AI assistant, AI hints/debug with diff, company-tagged problems (100+ companies), cloud sync. Redeem codes at `/redeem`.
- Revenue = Pro plans and gifts; trust built with success-story testimonials and the YouTube audience. Terms: refunds generally not offered because content is consumable.

## Sitemap and URL patterns
- `/` home; `/roadmap` (graph); `/practice` (hub) then `/practice/practice/<list>` where list = `coreSkills`, `blind75`, `neetcode150`, `neetcode250`; `/practice/company/<Company>` (Amazon, Google, Meta, Microsoft, Netflix, OpenAI; Pro-gated tags).
- `/problems/<slug>/question` (also `/solution`, `/submissions`, `/discuss` tabs); `/courses`, `/courses/<course>/<n>`, `/courses/lessons/<slug>` (11 free lessons).
- `/versus` (beta head-to-head), `/pro`, `/pro/gift`, `/redeem`, `/terms`, `/privacy`. Practice menu also lists Cheatsheets, Quizzes, AI Coding (beta), System Design, Machine Learning, Build Your GPT, Low Level Design, Databases.

## Features and how they work
- **Roadmap graph**: "the recommended order to learn topics"; a node graph with dependency edges (animated dash flow in CSS `dashflow`), settings to enable Dragging, Panning, Zooming. Clicking a topic opens its problem list (same as NeetCode 150). Home page shows a list version with a blurb and progress ring per topic (e.g. "Hash maps, frequency counting..." 0/9).
- **Practice pages**: a list switcher (Core Skills, NeetCode 150, Blind 75, NeetCode 250, NeetCode All); header counters Easy/Medium/Hard with solved over total; topic accordions (18 for NeetCode 150) each with a solved fraction; table columns Status | Problem | Difficulty (plus star, video, solution links); a large LeetCode-style tag cloud with counts for the whole library.
- **Progress tracking**: solved state, per-topic fractions, calendar of the month (day cells), current streak and best streak ("Solve one problem a day"), streak repair, delete-all-progress. Anonymous state kept locally ("Code stored in other browsers must be reset separately"); signed-in users get ranking and cloud sync. Problems solved on-site are auto-marked solved.
- **Problem page**: tabs Question | Solution | Submissions | Discuss; description with examples; language selector (Python, Java, C++, JavaScript, C#, Go, Kotlin, Swift); Monaco code editor with settings (font size, tab size, Vim keys, relative line numbers, word wrap, IntelliSense, AI features, celebration animation on accept); test cases console, Run and Submit buttons; NeetBot and Hint buttons; acceptance rate.
- **Core Skills (20 implement-it problems)**: data-structure design tasks (dynamic array, singly linked list, deque, BST, hash table, heap, graph, union-find, segment tree), sorting (insertion, merge, quick), graph algorithms (matrix DFS, matrix BFS, Dijkstra, Prim, Kruskal, topological sort), DP (0/1 and unbounded knapsack). 4 free, 16 Pro. Difficulty split 4 Easy / 12 Medium / 4 Hard.
- **Versus (beta)**: race a friend on one problem, any difficulty, 15-25 min, Python, hidden identities; needs an account.
- **Courses**: video + interactive text lessons grouped by track.

## Content coverage
- NeetCode 150 = 150 problems (28 Easy / 101 Medium / 21 Hard) across 18 topics, in order: Arrays & Hashing 9, Two Pointers 5, Sliding Window 6, Binary Search 7, Linked List 11, Stack 6, Trees 15, Tries 3, Backtracking 10, Heap/Priority Queue 7, Graphs 13, Advanced Graphs 6, 1-D DP 12, 2-D DP 11, Greedy 8, Intervals 6, Bit Manipulation 7, Math & Geometry 8. Home page roadmap shows the first 13 topics with one-line descriptors.
- Other lists: Blind 75, NeetCode 250, NeetCode All (everything covered on YouTube), Core Skills (20).
- Courses (10): DSA: Algorithms & Data Structures for Beginners (25 h, Medium), Advanced Algorithms (25 h, Hard); System Design: for Beginners (10 h), System Design Interview; Python: for Beginners (12 h), for Coding Interviews (8 h), OOP (8 h); Full Stack: SQL for Beginners (10 h), Full Stack Development (20 h); OOD: Interviews (8 h), Design Patterns (8 h).
- 11 lessons (e.g. Big-O Notation; 8 Data Structures for Coding Interviews; Sorting Algorithms Cheat Sheet; 5 Graph Algorithms for Coding Interviews): `https://neetcode.io/courses/lessons/big-o-notation`, `.../8-data-structures`, `.../sorting-algorithms`, `.../5-graph-algorithms`.
- Sample problem pages (about 10): [Dijkstra](https://neetcode.io/problems/dijkstra/question), [Binary Search Tree](https://neetcode.io/problems/binarySearchTree/question), [Hash Table](https://neetcode.io/problems/hashTable/question), [Heap](https://neetcode.io/problems/heap/question), [Union Find](https://neetcode.io/problems/unionFind/question), [Segment Tree](https://neetcode.io/problems/segmentTree/question), [Merge Sort](https://neetcode.io/problems/mergeSort/question), [Quick Sort](https://neetcode.io/problems/quickSort/question), [Kruskal](https://neetcode.io/problems/kruskal/question), [Topological Sort](https://neetcode.io/problems/topologicalSort/question).
- Library tag counts (whole library): Array 624, String 273, Hash Table 233, Dynamic Programming 189, Sorting 154, DFS 147, Math 138, Tree 120, BFS 117, Greedy 109, ... about 70 tags.

## Design language
- Stack: Tailwind v4 utilities layered over Bulma colours; Monaco editor; Angular.
- Fonts: Geist (UI) and Geist Mono (code); Monaco monospace in the editor; fallback Inter/system.
- Palette from CSS: white `#fff`, near-black `#0a0a0a`, dark grey `#363636`, light grey `#f5f5f5`; accent blue-violet `#485fc7`, teal `#00d1b2`, link blue `#3e8ed0`, success green `#48c78e`, warning `#ffe08a`, danger `#f14668`; hover darks `#3850b7`, `#00947e`. Difficulty colours conventional green/yellow/red.
- Components: sticky top nav (Courses, Practice, Roadmap, Versus, Pro, Sign In), pills (`9999px` radius), 4px-radius buttons, progress rings, month-calendar streak widget, modal dialogs, tabbed problem pane with draggable splitter.
- Motion: subtle: fade-up, fadeIn, progress fill, dashed-line flow on roadmap edges, celebration animation on accepted solution; transitions around 0.15-0.3 s with Tailwind default easing.
- Tone: friendly personal creator voice ("Hi, I'm Navi"), outcome-focused testimonials, emoji icons in list tabs.

## Terms / licence (shown on site)
- Site design, logo and video content copyright 2022-present Neetcode.io; materials protected by copyright and trademark. Users grant a licence to content they post; paid refunds generally not offered. Our use: learn UX patterns only; do not copy problem text, lists' ordering or descriptions, videos, or branding.

## Adopt for DSAMaxxing
**P0**
- Roadmap as a dependency graph of patterns with progress ring per node; clicking a node opens that pattern's story and practice list (build our own graph and order).
- Local-first progress: per-pattern fractions, streak counter and month calendar in localStorage, with delete-all.
- Pattern-first grouping with a one-line "when to reach for it" descriptor per node.
**P1**
- Header counters (Easy/Medium/Hard solved over total) and a status|problem|difficulty list row.
- "Implement it" mini-tasks beside each visualizer (their Core Skills idea), where the user rebuilds the structure the animation just showed.
- Lightweight celebration animation on completing a story.
**P2**
- Streak repair, ranking, Versus-style race later.
- Company tags and cheatsheets as a later paid layer.
- Pro tier idea: cloud sync of progress.
