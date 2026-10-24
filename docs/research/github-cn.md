# GitHub, Chinese-language CS learning repos (research bucket)

## Method

- Date: 2026-10-24. Every fact below comes from pages REA reached (REA MCP `capture_browser_scenario`, Edge launch mode, DOM capture after load, parsed with the shared `parse.py`). No generic web search.
- Robots check first: `github.com/robots.txt` was fetched via REA. Repo root pages and `/topics/*` are allowed; `/tree/`, `/raw/`, `/blame/`, `/search`, archives are disallowed, so only repo root pages and one topic page were crawled. `hello-algo.com/robots.txt` and `csdiy.wiki/robots.txt` returned the site's normal or 404 page (no robots file served). Volume was low (1 to 2 pages per browser launch, about 25 page loads total). No bot check, CAPTCHA or rate limit appeared. The Tsinghua OJ page is a login page and was not entered.
- Curated-list rule: for list-style repos only sizes, topic counts, structure and about 10 sample names are recorded. No full list order or descriptions reproduced. All prose is mine, in English.
- Star counts are as displayed on 2026-10-24 (GitHub rounds). License is what the GitHub sidebar or README shows; "none shown" means no license in the sidebar.

Verdict key:
- **Adapt+attribute**: permissive (MIT, Apache-2.0, CC BY; CC BY-SA adds share-alike duty).
- **Facts only**: NC, ND, none shown, or unclear. Use for structure and ordering ideas only; write our own text, problems and diagrams.

Correction to the brief: hello-algo is **CC BY-NC-SA 4.0** (non-commercial, share-alike), not permissive. The site will be monetized, so hello-algo text, code, images and animations cannot be adapted. Facts only.

## 1. Data structures and algorithms

| Repo | Stars | License | Covers | Structure | Verdict |
|---|---|---|---|---|---|
| [krahets/hello-algo](https://github.com/krahets/hello-algo) (site [hello-algo.com](https://www.hello-algo.com/)) | 131k | CC BY-NC-SA 4.0 (text, code, images, video) | Beginner DSA book; "animated illustrations, one-click runnable code" | 17 chapters: preface, intro, complexity, data structure types, array/linked list, stack/queue, hashing, tree, heap, graph, searching, sorting, divide and conquer, backtracking, DP, greedy, appendix. Prose in zh-Hans, zh-Hant, en, ja, ru. Code in 12 to 14 languages. About 500 animated illustrations; 3,000 community Q&A. | Facts only (NC) |
| [labuladong/fucking-algorithm](https://github.com/labuladong/fucking-algorithm) (live content at [labuladong.online](https://labuladong.online/en/)) | 136k | None shown | Pattern-first LeetCode teaching; repo is an older snapshot (60+ articles), the current material is on a members site with a visualizer, AI helper and editor plugins | Repo folders: DP series, data structure series, algorithmic thinking series, high-frequency interview series. Site: languages, algorithms (DP, graph, backtracking, binary tree), AI coding, full stack, roadmap. zh, site also en. Visualizer on nearly every solution. | Facts only |
| [halfrost/LeetCode-Go](https://github.com/halfrost/LeetCode-Go) | 34k | MIT | Go solutions and an e-book ("LeetCode Cookbook": PWA, dark mode, PDF) | Topic table (array, string, two pointers, list, stack, tree, DP, backtracking, DFS, BFS, binary search, math, hash, sort, bit, union find, sliding window, segment tree, BIT) with done markers. en with zh README. | Adapt+attribute (notes and code); problems are LeetCode's |
| [youngyangyang04/leetcode-master](https://github.com/youngyangyang04/leetcode-master) (Code Random Thoughts) | 63k | None shown; README demands source credit | About 200 curated problems in a fixed order, illustrated write-ups plus videos, 50+ mind maps | README is the study path. Each module: theory, problems, summary. zh, C++ primary. | Facts only |
| [doocs/leetcode](https://github.com/doocs/leetcode) | 37k | CC-BY-SA-4.0 | Multi-language LeetCode, Offer, CCI solutions | Folders by problem set (solution, lcof, lcof2, lcci, lcp, lcs, basic). zh primarily. | Share-alike; problem text is LeetCode's. Structure ideas only |
| [azl397985856/leetcode](https://github.com/azl397985856/leetcode) | 56k | CC BY-NC-ND 4.0 | Problem analyses, "thinkings", templates, cheat sheets, 91-day plan | Folders: problems, thinkings, templates, selected, daily, collections. zh and en. Author sells a book and coaching. | Facts only |
| [greyireland/algorithm-pattern](https://github.com/greyireland/algorithm-pattern) | 15.5k | MIT | Reusable pattern templates | Folders: basic_algorithm, data_structure, advanced_algorithm, practice_algorithm; en and zh | Adapt+attribute |
| [MisterBooo/LeetCodeAnimation](https://github.com/MisterBooo/LeetCodeAnimation) | 77k | None shown | Animated LeetCode explanations; full stepper (single-step, rewind, speed, voice) only on author's site | Folders: problems, docs, tools. zh | Facts only; shows demand for step-through visuals |

Other CN repos on the `github.com/topics/leetcode` page (15,162 repos on that topic), listed but not visited: geekxh/hello-algorithm, apachecn/apachecn-algo-zh, huihut/interview, afatcoder/LeetcodeTop.

## 2. Interview fundamentals and system design

| Repo | Stars | License | Covers | Structure | Verdict |
|---|---|---|---|---|---|
| [CyC2018/CS-Notes](https://github.com/CyC2018/CS-Notes) | 186k | None in sidebar; README asks for credit and share-alike | Interview basics | Ten groups: algorithms, OS, networking, database, Java, system design (distributed, cluster, cache, MQ), OOP and patterns, tools, coding practice. zh, images inline | Facts only |
| [Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide) | 159k | Apache-2.0 | Java/backend interview guide, now with AI app dev | VuePress site; zh with en and ja READMEs | Adapt+attribute possible, but off-topic |
| [doocs/advanced-java](https://github.com/doocs/advanced-java) | 79k | CC-BY-SA-4.0, but README says most content is another author's, copyright reserved | High concurrency, distributed, microservices | Q&A grouped by MQ, search, cache, sharding. zh | Facts only (provenance unclear) |
| [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer) | 375k | CC BY 4.0 | System design primer with Anki flashcards | README, `solutions/`, `images/`; `README-zh-Hans.md` and `README-zh-TW.md` translations in root | Adapt+attribute (including the zh-Hans translation, check translator credit) |

## 3. Self-study maps and course sites

| Repo | Stars | License | Covers | Structure | Verdict |
|---|---|---|---|---|---|
| [PKUFlyingPig/cs-self-learning](https://github.com/PKUFlyingPig/cs-self-learning) (site [csdiy.wiki](https://csdiy.wiki/)) | 76k | MIT for contributor text; embedded course resources keep their authors' licenses | Review of public university courses for self-study | MkDocs Material site, zh and en. Categories: math, programming, DSA (CS61B, Princeton Algorithms I and II, MIT 6.006 and 6.046, CS170), systems, OS, DB, networks, compilers, graphics, AI/ML, ML systems. Course page = why, resources, own assignment repo | Adapt+attribute (learning-map structure) |
| Chinese university courses linked from csdiy: NJU OS ([jyywiki.cn](https://jyywiki.cn/), CC BY-NC 4.0), HIT OS, PKU/NJU/USTC/SJTU compilers, PKU/NJU software analysis, USTC graphics | n/a | varies | Course home pages | Slides and labs | Facts only; no Chinese DSA course among them |
| Tsinghua DSA online judge (`dsa.cs.tsinghua.edu.cn/oj/`) | n/a | n/a | PA and LAB assignments for the university's data structures courses (2026 autumn) | Login-gated; 71k registered users | Not crawlable |

## 4. Machine learning notes

| Repo | Stars | License | Covers | Structure | Verdict |
|---|---|---|---|---|---|
| [datawhalechina/pumpkin-book](https://github.com/datawhalechina/pumpkin-book) | 26k | CC BY-NC-SA 4.0 | Formula derivations for a standard ML textbook | By textbook chapter; VitePress; zh | Facts only |
| [datawhalechina/leedl-tutorial](https://github.com/datawhalechina/leedl-tutorial) | 17k | CC BY-NC-SA 4.0 | Hung-yi Lee's DL course as a book | DL intro, optimization, CNN and self-attention, Transformer, GAN, self-supervised, diffusion, adversarial, XAI, transfer, RL, lifelong, compression, meta-learning, ChatGPT; plus homework code | Facts only |
| [apachecn/ailearning](https://github.com/apachecn/ailearning) | 43k | CC BY-NC-SA 4.0 | Machine Learning in Action notes, NLP, PyTorch | Chapter per algorithm with owner table; stale (last commit Nov 2024) | Facts only |

## Style and ordering notes

### hello-algo animation and illustration style
- On the quick sort page, sections go: algorithm flow, characteristics, why it is fast, pivot optimization, recursion-depth optimization; each is short text plus figures.
- An "animation figure" is a click-through slideshow of pre-rendered still frames (10 on that page), one image per step, alt text naming the step. Not video, not live execution.
- Code blocks sit in language tabs (13 on that page) with copy and run, and there is a giscus comment widget.
- Light use of "note" callouts. Chapters end with Summary and Exercises; starred sections are optional extras (cache, number encoding, AVL tree).
- Order: complexity, data structure classification, array/list, stack/queue, hashing, tree, heap, graph, searching, sorting, divide and conquer, backtracking, DP, greedy. Structures first, algorithm families after; DP and greedy last.
- Marketing: professor endorsements, "500 animated illustrations", community Q&A count.

### labuladong framework and pattern taxonomy (structure only)
- Philosophy: reusable thinking frameworks beat answer dumps; a "core framework" chapter precedes topic chapters.
- Named frames: two pointers on list and array, sliding window template, binary tree "traverse vs decompose" thinking, recursion as one view with two modes, DP framework, backtracking framework, BFS framework, greedy, divide and conquer, complexity analysis.
- Data structure track: dynamic array, lists, queue/stack, hash table, binary tree and variants (BST, red-black, trie, heap, segment tree), graph basics, ten sorts each tied to a pattern (quick sort as tree pre-order, merge sort as post-order).
- Product wrapper: visualizer panel on solution code, AI assistant, Chrome/VS Code/JetBrains plugins, mini-games inside lessons, paid tier.

### leetcode-master ordering (reference only)
- Array, linked list, hash, string, two pointers, stack/queue, binary tree, backtracking, greedy, DP, monotonic stack, graph. Each module: theory, problem series, summary.

## Adopt for DSAMaxxing (prioritized)

1. Step-frame animation as the core teaching primitive. Hello-algo shows learners like numbered steps per operation. Go further with live, scrubbable animations driven by real algorithm state. Build our own; do not use their images (NC).
2. Two-tier structure: patterns/frameworks first (traverse vs decompose, sliding window, two pointers, DP framework), then per-structure chapters. Name patterns in our own words.
3. Lesson template: short theory, framed visual, language-switch code, summary, exercises; star optional extras.
4. Language tabs and in-page run (start with 3 to 4 languages).
5. Pattern outline from greyireland/algorithm-pattern (MIT): basic, data structure, advanced, practice split, with attribution.
6. A "what to study next" learning map in csdiy style (MIT): category, course, why, resources.
7. Per-lesson Q&A threads (hello-algo's 3,000 Q&A suggests community pull).
8. Downloadable cheat sheet per pattern; peers monetize with book, PDF, plugin and member tiers.
9. System design: CC BY material (system-design-primer, including zh-Hans) can seed a design track with attribution.
10. Avoid: copying curated lists or order (leetcode-master, CS-Notes), any NC or ND content, LeetCode problem statements.

## Gaps
- No Chinese-university DSA course site was reachable without login.
- LeetCodeAnimation: algomooc.com not crawled.
- Repos listed but not visited: geekxh/hello-algorithm, apachecn/apachecn-algo-zh, huihut/interview, afatcoder/LeetcodeTop.
