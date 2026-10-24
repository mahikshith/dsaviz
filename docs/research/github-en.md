# GitHub (US/English) research for DSAMaxxing

## Method

- Date: 2026-10-24. Tool: REA MCP server, `capture_browser_scenario` (launch mode, headless Edge, DOM captured after each step), parsed with `parse.py`. All facts below (stars, license badge, folders, README headings) come from the live GitHub pages REA loaded. No generic web search, no API.
- robots.txt (https://github.com/robots.txt) was read with REA. For `User-agent: *` it disallows `/*/tree/`, `/*/raw/`, `/*/blame/`, `/*/archive/`, `/*/forks`, `/*/stargazers`, `/*/commits/`, `?tab=`, `?q=` and `/search`. Repo root pages and `/topics/*` are not disallowed, so only those were fetched. The file also says "if you would like to crawl GitHub contact us" and gives AI crawlers (ClaudeBot etc.) `Crawl-delay: 1`. Our pace was 2 pages per call, several seconds apart. If the site will crawl GitHub at scale, contact GitHub first.
- No bot check, CAPTCHA or rate limit was met. No login used. One early burst of 3 parallel calls ran before the robots guardrail reached me; it only touched repo roots (one dropped with "Connection closed" and was redone).
- Not opened (so unverified): LICENSE files, README bodies beyond the root page, `/blob/` pages. Copyright holder is therefore only known where the README showed it.
- Guardrail: lists are reference only. Below we keep sizes, topics/structure and about 10 sample names, never list contents, ordering or descriptions.
- Stars are the figures GitHub showed on 2026-10-24 (k = thousand, rounded by GitHub).
- Verdict key: **ADAPT** = permissive (MIT, Apache-2.0, CC BY, CC0), reuse with attribution. **SA** = share-alike (CC BY-SA, GPL), reuse forces the same license on the derivative. **FACTS** = NC / ND / custom / no license shown: ideas, topic names and structure only, write our own content.

## 1. DSA problem lists and pattern repos

| Repo | Stars | License | What it covers | Structure | Verdict |
|---|---|---|---|---|---|
| [neetcode-gh/leetcode](https://github.com/neetcode-gh/leetcode) | 6.5k | MIT | Solutions to the NeetCode problem set in about 15 languages | folders per language (python, java, cpp, go, rust...), `articles`, `hints`; README groups problems under 18 headings: Arrays & Hashing, Two Pointers, Sliding Window, Stack, Binary Search, Linked List, Trees, Tries, Heap/Priority Queue, Backtracking, Graphs, Advanced Graphs, 1-D DP, 2-D DP, Greedy, Intervals, Math & Geometry, Bit Manipulation; `.problemSiteData.json` | ADAPT (code and category taxonomy; problem statements belong to LeetCode, do not copy) |
| [seanprashad/leetcode-patterns](https://github.com/seanprashad/leetcode-patterns) | 14.3k | CC BY-NC 4.0 (from the LICENSE commit note) | Pattern-based question list with notes, company tags, difficulty | Next.js site: `src`, `public`, `scripts`; README sections Background, Fundamentals, Notes, Question List, Solutions | FACTS (non-commercial; our site is monetized) |
| [ashishps1/awesome-leetcode-resources](https://github.com/ashishps1/awesome-leetcode-resources) | 18.0k | GPL-3.0 | Link list: fundamental concepts, patterns, articles, curated problems, playlists, courses, books, newsletter, visualization | `patterns`, `images`; one README with 9 emoji-headed sections | SA / FACTS |
| [Chanda-Abdul/Several-Coding-Patterns...](https://github.com/Chanda-Abdul/Several-Coding-Patterns-for-Solving-Data-Structures-and-Algorithms-Problems-during-Interviews) | 4.9k | none shown (all rights reserved by default) | 16 numbered patterns: sliding window, two pointers, fast/slow, merge intervals, cyclic sort, in-place list reversal, tree BFS/DFS, two heaps, subsets, modified binary search, XOR, top-K, k-way merge, 0/1 knapsack, topological sort | one markdown file per pattern plus `images` | FACTS (write our own) |
| [kdn251/interviews](https://github.com/kdn251/interviews) | 65.3k | MIT | Interview cheat sheet: data structures, algorithms, complexity, books, videos | `company`, `leetcode`, `cracking-the-coding-interview`, `uva` with Java solutions; README sections Data Structures (linked list ... segment tree, heap, hashing, graph), Algorithms (sorting, graph, greedy, bitmasks), Runtime Analysis | ADAPT (complexity tables, structure) |
| [jwasham/coding-interview-university](https://github.com/jwasham/coding-interview-university) | 363.3k | CC-BY-SA-4.0 | Full CS self-study plan for interviews | root README of checklists (Study Plan, Topics of Study, Getting the Job, Extras), `extras`, `translations` | SA (copying forces CC BY-SA on us); use topic-order idea only |
| [yangshun/tech-interview-handbook](https://github.com/yangshun/tech-interview-handbook) | 143.1k | MIT | Handbook: algorithms, behavioral, resumes, negotiation, practice question lists | pnpm monorepo: `apps` (Docusaurus site), `packages`, `algorithms`, `assets` | ADAPT (best permissive source for study-plan structure) |
| [labuladong/fucking-algorithm](https://github.com/labuladong/fucking-algorithm) | 136.0k | none shown | Pattern-by-pattern algorithm notes with a visualization panel and plugins | folders per series (DP, data structures, thinking, high-frequency), multi-language solutions; README mostly Chinese | FACTS |
| [krahets/hello-algo](https://github.com/krahets/hello-algo) | 130.9k | CC BY-NC-SA 4.0 | Animated, runnable DSA book in several human and ~13 programming languages | `docs`, `codes`, `en`, `ja`, `zh-hant`, `ru`, mkdocs site | FACTS (NC); best UX reference for animated chapters |
| [TheAlgorithms/Python](https://github.com/TheAlgorithms/Python) | 225.5k | MIT | Reference implementations of a very wide range of algorithms | one folder per topic (backtracking, bit_manipulation, ciphers, data_structures, divide_and_conquer, dynamic_programming...) | ADAPT (code to back our visualizations) |
| [trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms) | 196.7k | MIT | Data structures and algorithms in JS, each with its own README | `src/data-structures`, `src/algorithms/<topic>`, translated READMEs; "by Topic" and "by Paradigm" views, Big-O tables | ADAPT (JS fits a browser site) |
| [DopplerHQ/awesome-interview-questions](https://github.com/DopplerHQ/awesome-interview-questions) | 85.2k | none shown | List of lists of interview questions per language/framework | single README, ~50 language/framework sections | FACTS (barely DSA; skip) |

## 2. Interview prep and curricula

| Repo | Stars | License | What it covers | Structure | Verdict |
|---|---|---|---|---|---|
| [ossu/computer-science](https://github.com/ossu/computer-science) | 210.3k | MIT | Free self-taught CS degree path: prerequisites, intro, core and advanced tracks, final project | `coursepages`, `extras`, CURRICULAR_GUIDELINES, FAQ; README tiers (Core CS/programming/math/systems/theory, Advanced) | ADAPT (track/tier idea) |

(tech-interview-handbook, interviews and coding-interview-university also belong here; see section 1.)

## 3. System design

| Repo | Stars | License | What it covers | Structure | Verdict |
|---|---|---|---|---|---|
| [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer) | 375.4k | CC BY 4.0 (README: "Copyright 2017 Donne Martin") | System design guide, 4-step answering method, worked interview problems, Anki flashcards | `solutions`, `resources`, `images`, multi-language READMEs; study guide, approach steps, back-of-envelope math, questions with solutions | ADAPT with attribution (CC BY allows commercial use) |
| [ByteByteGoHq/system-design-101](https://github.com/ByteByteGoHq/system-design-101) | 90.7k | CC BY-NC-ND 4.0 | Visual explainers of systems | `data`, `scripts`, README ToC | FACTS (NC and ND) |
| [karanpratapsingh/system-design](https://github.com/karanpratapsingh/system-design) | 46.6k | custom file, not recognised by GitHub (terms unverified) | Book-style course: IP/OSI/DNS, load balancing, caching, databases, CAP, messaging | `diagrams`, one long README | FACTS until LICENSE is read |
| [ashishps1/awesome-system-design-resources](https://github.com/ashishps1/awesome-system-design-resources) | 42.8k | GPL-3.0 | Link list: core concepts, networking, API, DB, caching, async, distributed systems, trade-offs, interview problems Easy/Medium/Hard, papers | `diagrams`, `implementations` (e.g. consistent hashing) | SA / FACTS |
| [madd86/awesome-system-design](https://github.com/madd86/awesome-system-design) | 12.6k | CC0-1.0 | Curated links: articles (intro/interviews/advanced), books, videos, tools by category | `media`, one readme | ADAPT (CC0; still credit) |
| [binhnguyennus/awesome-scalability](https://github.com/binhnguyennus/awesome-scalability) | 75.0k | MIT | Scalability/reliability articles grouped by Principle, Scalability, Availability, Stability, Performance, Intelligence, Architecture, Interview, Organization | README plus Jekyll config | ADAPT (taxonomy; link out) |

## 4. Algorithm visualizers

| Repo | Stars | License | What it covers | Structure | Verdict |
|---|---|---|---|---|---|
| [algorithm-visualizer/algorithm-visualizer](https://github.com/algorithm-visualizer/algorithm-visualizer) | 48.9k | MIT | Online platform that animates algorithms from code through tracer calls | React app (`src`, `public`); README points to separate `algorithms` and `tracers` repos | ADAPT (code-drives-animation idea) |
| [algorithm-visualizer/algorithms](https://github.com/algorithm-visualizer/algorithms) | 498 | none shown | Algorithm snippets feeding that site | folders by paradigm: Backtracking, Branch and Bound, Brute Force, Divide and Conquer, DP, Greedy, Simple Recursive, Uncategorized | FACTS (taxonomy only) |
| [TamimEhsan/AlgorithmVisualizer](https://github.com/TamimEhsan/AlgorithmVisualizer) | 452 | MIT | React/Next.js visualizers (pathfinding, sorting, heap...) | Next.js app, Tailwind | ADAPT (small readable reference) |
| [midudev/alg0.dev](https://github.com/midudev/alg0.dev) | 220 | MIT (README: "MIT created by @midudev") | 40+ algorithms in 8 categories (sorting, data structures, graphs, searching, DP, backtracking, divide & conquer, concepts), step controls, shown code, keyboard shortcuts | Astro site, `src`, `scripts` | ADAPT (UX reference) |
| Topic [/topics/algorithm-visualization](https://github.com/topics/algorithm-visualization) | 361 repos | | Sample tools: AlgorithmVisualizer, SortVision, alg0.dev, AlgoFlow, Path-Finding-Visualizer, VisualSort, QUADTREE-VISUALIZER, grid-pathfinder, manim-algorithm-animation-maker, maze-flux | | discovery only |
| Topic [/topics/leetcode](https://github.com/topics/leetcode) | 15,162 repos | | Samples: CS-Notes, fucking-algorithm, hello-algo, LeetCodeAnimation, interviews, leetcode-master, doocs/leetcode, algorithm-pattern, leetcode-patterns, awesome-leetcode-resources | | discovery only |

## 5. ML / AI learning

| Repo | Stars | License | What it covers | Structure | Verdict |
|---|---|---|---|---|---|
| [microsoft/ML-For-Beginners](https://github.com/microsoft/ML-For-Beginners) | 91.7k | MIT | 12 weeks, 26 lessons, 52 quizzes of classic ML | numbered module folders `1-Introduction`...`9-Real-World`, `quiz-app`, `sketchnotes`, `translations` | ADAPT (lesson+quiz layout) |
| [GokuMohandas/Made-With-ML](https://github.com/GokuMohandas/Made-With-ML) | 49.8k | MIT | Production ML: train, tune, evaluate, serve, test, CI/CD | `madewithml`, `notebooks`, `deploy`, `tests`, `docs` | ADAPT |
| [d2l-ai/d2l-en](https://github.com/d2l-ai/d2l-en) | 29.9k | CC BY-SA 4.0 text, modified MIT sample code (LICENSE-SUMMARY) | Interactive deep learning book | `chapter_*` folders | SA for text; code ADAPT under its terms |
| [karpathy/nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) | 24.9k | MIT | NN lecture series from scratch up to tokenization | `lectures` | ADAPT |
| [karpathy/micrograd](https://github.com/karpathy/micrograd) | 18.0k | MIT | Tiny autograd engine and NN library with training/graph-tracing demos | `micrograd`, `test`, notebooks | ADAPT (base for a backprop visualizer) |
| [mlabonne/llm-course](https://github.com/mlabonne/llm-course) | 84.6k | Apache-2.0 | LLM roadmap: Fundamentals, Scientist, Engineer, plus Colab notebooks | README roadmap, `img` | ADAPT (roadmap structure) |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 107.2k | custom file (LICENSE.txt), terms unverified | GPT-style LLM built chapter by chapter | `ch01`...`ch07`, appendices A-E, `setup` | FACTS until LICENSE read |
| [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) | 122.1k | MIT | 21 lessons on building with generative AI | numbered lesson folders | ADAPT (structure) |
| [ageron/handson-ml3](https://github.com/ageron/handson-ml3) | 14.4k | Apache-2.0 | Notebooks for the Hands-On ML book | numbered notebooks 01-19 | ADAPT |

32 repos plus 2 topic pages were loaded (34 GitHub pages and robots.txt).

## Adopt for DSAMaxxing (priority order)

1. **Pattern taxonomy (neetcode-gh/leetcode MIT, with kdn251/interviews MIT).** Use the 18-category NeetCode-style grouping (arrays/hashing through bit manipulation) as the DSA track skeleton. Category names are not copyrightable; write our own blurbs, link to the original judge for statements. Credit neetcode-gh.
2. **Study-plan structure (tech-interview-handbook MIT, ossu/computer-science MIT).** Copy the shape: prerequisites, core, advanced, schedule pages, interview logistics. Adapt text with attribution only where reused; otherwise write fresh.
3. **System-design module (system-design-primer CC BY 4.0, awesome-scalability MIT, madd86 CC0).** Adopt the 4-step answering method, back-of-envelope cheat sheet and per-topic pages (DNS, CDN, load balancer, cache, DB, CAP). Draw our own diagrams (ByteByteGo is NC-ND). Use awesome-scalability headings as a further-reading taxonomy and link out.
4. **Visualizer UX and engine (algorithm-visualizer MIT, alg0.dev MIT, TamimEhsan MIT; hello-algo as UX-only reference).** Step/play/pause/scrub controls, code panel with active-line highlight, keyboard shortcuts, tracer idea (algorithm code emits events that drive drawing). Group visualizers by paradigm (brute force, D&C, DP, greedy, backtracking). Back them with MIT reference code from TheAlgorithms/Python and trekhleb/javascript-algorithms.
5. **ML/AI track (ML-For-Beginners MIT, nn-zero-to-hero MIT, micrograd MIT, llm-course Apache-2.0).** Lesson, quiz, sketchnote layout; a three-tier LLM roadmap (fundamentals, scientist, engineer); micrograd as the base for an autograd/backprop visualizer. Keep Apache-2.0 NOTICE duties.
6. Lower: TheAlgorithms/Python and trekhleb as the algorithm library; Made-With-ML for an MLOps add-on; generative-ai-for-beginners for lesson structure.

Do not reuse text/assets from: seanprashad/leetcode-patterns (CC BY-NC), hello-algo (CC BY-NC-SA), ByteByteGo (CC BY-NC-ND), the two GPL-3.0 ashishps1 lists, jwasham and d2l text (CC BY-SA), or repos with no license shown (labuladong, Chanda-Abdul, DopplerHQ, algorithm-visualizer/algorithms). Ideas, topic names and structure are fine; prose, orderings and images are not.

Open items: read the LICENSE of karanpratapsingh/system-design and rasbt/LLMs-from-scratch (GitHub showed no SPDX type), and every MIT/Apache LICENSE for the exact copyright line before publishing the attribution page.
