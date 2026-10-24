# AlgoSimplified research (for the DSAMaxxing rebrand)

Source: algosimplified.dev, observed via the REA MCP server only. Facts, names and structure are recorded; prose is paraphrased. Per the owner rule, curated sheets are reference only: sizes, topic counts, difficulty splits, fields and UI behaviour are recorded, plus about ten example problems per sheet. Their full lists and ordering are not reproduced.

## Method

- Tools: `mcp__rea__capture_browser_scenario` (Edge launch mode, 1280x720, DOM and accessibility-tree capture) for pages; a network capture with response bodies for the home page, `/dsa-master-sheet/`, the main stylesheet (`/_astro/blind-75.Dx9EjP5m.css`) and the web manifest. Design tokens were extracted from that stylesheet with a token script. Page-script bodies (`/_astro/*.astro_astro_type_script_*.js`) were read for the DSA sheet and Blind 75 to learn how progress is stored.
- Date: 2026-10-24.
- Pages rendered: 15 (home, DSA Master, LeetCode 150, Blind 75, Google sheet, LLD, HLD, Concurrency, courses index plus 2 course pages, posts index plus 1 article, search, `/category/coding`), plus `robots.txt`, the stylesheet, the manifest and 2 script bodies. See `links/algosimplified.md`.
- robots.txt: all paths allowed for generic agents except `/videos`; content signal is search=yes, ai-train=no, use=reference; named AI training crawlers are disallowed. Treat everything here as reference only. No `/videos` page was fetched. No bot check, challenge or rate limit was met.
- Limits: no per-lesson course pages, other articles, or `/category/finance|news|tutorial` were fetched (crawl kept minimal after the owner rule). Storage keys were confirmed from script source only for the DSA Master Sheet and Blind 75; the other sheets use the same inline `progressManager` pattern but their keys were not captured. The Google sheet was read from an accessibility tree only, so its storage key is unknown. Several REA calls dropped with "Connection closed" and were retried.

## Summary and business model

- Pitch: free "serious" engineering content: two long courses (Kafka, a Go key-value database), eight articles, and seven practice sheets (DSA Master, LeetCode 150, Blind 75, a 2,627-problem Google sheet, LLD, HLD, Concurrency).
- Free, no accounts: the home page promises no accounts, paywalls or setup friction. All progress lives in the visitor's browser (`localStorage`). No login anywhere.
- Monetisation: ad slots only (placeholder boxes labelled "Custom Ad Space" with banner ids, plus an `adsbygoogle` tag on the article and search pages); Google Analytics (gtag) and Cloudflare Web Analytics beacons. No pricing page and no premium tier seen. Footer social links are dead placeholders (`#`).
- Positioning drift: the footer and category menu still describe "coding and finance" (Coding, Finance, Tutorials, Tech News), but the content is almost all backend and DSA (one finance article). It reads as a repurposed blog template.
- Stack: Astro 5.13.9 static site, Tailwind CSS utilities, Cloudflare in front. Installable (web manifest, standalone display, theme colour #0f2742, 192 and 512 icons). Sheets are client-rendered from a JS array inside each page script.
- Quality problems to avoid: marketing numbers do not match the data (LeetCode 150 page claims 50 Easy / 75 Medium / 25 Hard, the data is 40 / 92 / 18; Blind 75's banner groups 26 / 17 / 8 / 6 / 18 while the list groups 15 / 11 / 6 / 11 / 6 / 8 ...); the DSA sheet renders a YouTube icon on every row whose link is the literal string `undefined` (this is the broken `/dsa-master-sheet/undefined`); 35 of 42 Concurrency rows, 30 of 30 HLD rows and 17 of 27 LLD rows point to the same unrelated LeetCode page (design-parking-system); the Google sheet's daily-challenge date is stale.

## Full sitemap and URL patterns

| Area | URL pattern | Notes |
|---|---|---|
| Home | `/` | hero, course cards, practice tracks, latest articles, CTA |
| DSA Master Sheet | `/dsa-master-sheet/` | 207 problems, 19 topics |
| LeetCode 150 | `/leetcode-150/` | 150, 24 topics |
| Blind 75 | `/blind-75/` | 75, 12 topics |
| Google sheet | `/google-sheet` | 2,627 Medium+Hard, 73 tags, daily challenge |
| LLD / HLD | `/lld-sheet/`, `/hld-sheet/` | 27 / 30 prompts |
| Concurrency | `/top-concurrency/` | 42 prompts, 7 groups |
| Courses | `/courses/`, `/courses/<slug>/`, `/courses/<slug>/NN-<lesson>` | slugs: kafka-mastery (10 lessons), go-database (15); lesson ids are two-digit numbered slugs |
| Articles | `/posts/`, `/posts/<slug>` | 8 articles, dated Jan 2024 |
| Search | `/search/` | client-side filter over posts and courses |
| Categories | `/category/coding`, `/category/finance`, `/category/tutorial`, `/category/news` | coding page is byte-identical to the home page; others not fetched |
| Broken | `/dsa-master-sheet/undefined` | from the empty YouTube field |
| Meta | `/robots.txt`, `/sitemap-index.xml`, `/site.webmanifest`, `/og-image.svg` | |

Trailing-slash handling is inconsistent: nav links omit it, canonical pages are served with it. Practice Sheets is a header dropdown; mobile has a hamburger.

## Every feature and how it works

### Shared sheet shell (the six client-rendered sheets)
- Hero (title, one-paragraph pitch), a "why / how to use" marketing block, a stats strip, then the tool: search box, difficulty select (All, Easy, Medium, Hard), category select, a favourites toggle, a random button, expand/collapse all, then the grouped list. A progress panel shows completed, total, percent and a bar.
- Row anatomy (Blind 75, LeetCode 150, Concurrency, HLD, LLD): solved checkbox, star button (favourite), the problem name as the outbound link (new tab, noopener), and a rounded difficulty pill on the right. The DSA Master Sheet differs: checkbox, name, small difficulty tag, an outbound LeetCode icon, a (broken) YouTube icon and a star.
- Groups are collapsible cards with a count ("N problems", or done/total on DSA); a chevron rotates on toggle. DSA starts collapsed, the others open.
- Per-sheet accent for checkboxes: blue (DSA, LeetCode 150, Blind 75), cyan (Concurrency), orange (HLD), purple (LLD).

### Progress, solved checkboxes and storage
- Pure client state. Each problem has a string id (a LeetCode-style slug). Toggling a checkbox flips a boolean in an object keyed by id and writes the whole object as JSON to `localStorage`.
- Confirmed keys: DSA Master Sheet `dsa-progress` and `dsa-favorites`; Blind 75 `blind75Progress` and `blind75Favorites`. Others not captured (inline `progressManager.toggleProblem(id)` handlers, same pattern).
- Counters: completed = number of true values, total = size of the data array, percent rounded, bar width set from the percent. Blind 75 wraps load/save in try/catch; the DSA sheet does not.
- No sync, export or account; clearing the browser loses everything. The Google sheet has a Reset All button and a "saved locally" note.
- Weak spots: no streaks, timestamps or notes; progress keyed only by id; the favourite star state is toggled by class and is easy to desync.

### Filters
- Text search (case-insensitive substring on the name), difficulty equality, category equality, favourites-only. All combine with AND and the list re-renders. Empty state is a friendly "no problems found, adjust filters" box. No company tags and no multi-select.

### Difficulty tags
- Three levels. Easy emerald/green, medium amber, hard rose/red; DSA uses dark tinted chips (900 background with 300 text), the others solid 600 pills with 100 text.

### Topic tags
- One category per problem on the small sheets. The Google sheet is the exception: several LeetCode topic tags per problem (about 3.6 on average), up to four chips plus "+N more".

### Random unsolved
- A button picks a uniformly random problem among those not ticked and opens a modal with name, difficulty chip, topic chip, "Open on LeetCode" and Close; clicking outside closes it. If everything is solved a congratulation card shows. It ignores active filters. (DSA leaves console.log calls in.)

### Google sheet (the large one)
- 2,627 Medium and Hard LeetCode problems (Medium 1,807, Hard 820; 2,174 free, 453 premium; Easy excluded).
- Daily challenge: 25 randomly chosen Medium/Hard problems for "today", each with index, difficulty, title link, tag line and a "Mark as solved" checkbox. It claims a daily refresh, yet showed 2 September 2026 on a 24 October crawl, so the pick is probably fixed at build time.
- Main list: grouped by topic tag, sorted within a tag by a frequency score (highest first); the first 12 per tag are rendered. Row fields: LeetCode number and title (link), difficulty, acceptance rate, frequency score, a "Solution" chip on some rows, up to four tag chips, a Premium badge, "View on LeetCode" and a Solved checkbox.
- Tools: search box, difficulty select (All, Medium, Hard), tag select with 73 tags, "0 / 2,627 solved" progress, percent and Reset All.

### Search
- `/search/`: one text box, type chips (All 10, Posts 8, Courses 2) and a popular-tags cloud (about 48 buttons with a `data-tag` attribute). Filtering is client-side over cards already in the DOM; an ad slot sits above the results and a no-results card exists.

### Courses
- The index has a three-point value strip (production depth, structured progression, systems-first topics) and two course cards (level badge, lesson count, tag chips, "View curriculum").
- Course page: level badge, a "Bestseller" ribbon (Kafka), title, blurb, Start Learning button, a meta grid (Lessons, Duration, Level, Instructor), overview, audience list, rationale, prerequisites, emphasis bullets, then a curriculum with modules (lesson counts), each lesson numbered with a duration range and level. Kafka: 10 lessons in 4 modules, 25-30 h, intermediate. Go database: 15 lessons in 5 modules, 80-100 h, advanced (from hash maps, WAL and SSTables through a TCP server, transactions and replication to security and a capstone). Lessons are separate pages. No completion tracking seen on the course page.

### Blog
- `/posts/`: featured article, card grid (date, category badge, read time, open link), an "All articles" library, category pills (coding, finance, tutorial). 8 articles: 5 Kafka, 2 Redis, 1 algorithmic trading. Article page: date, "Featured" label, share links, tag chips, ad slot, long prose with about 40 H2/H3 headings, and a related-posts block.

## Content coverage

Sizes, difficulty splits and topic counts are exact counts from the rendered data. Example problems are a sample, not the sheet.

### DSA Master Sheet: 207 problems (page text says "200+")
- Difficulty: Easy 39, Medium 127, Hard 41. Fields: name, difficulty, topic, LeetCode link, empty YouTube link, checkbox, star.
- Topics (19) with counts: Array 13, Hashing 6, 2 Pointers 3, Intervals 2, Sliding Window 6, Strings 11, Stacks 11, Queues 4, Math and Number Theory 11, Binary Search 19, Linked Lists 13, Binary Trees 13, Binary Search Tree 5, Recursion / Backtracking 6, Heaps 8, Greedy 4, Dynamic Programming 41, Graphs 26, Trie 5.
- DP (41, 12 of them Hard) and Graphs (26) dominate; Intervals and 2 Pointers are tiny. Several niche contest-style hard items sit next to the classics.
- Examples (10):
  - [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) (medium)
  - [Group Anagrams](https://leetcode.com/problems/group-anagrams/) (medium)
  - [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) (hard)
  - [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) (medium)
  - [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (medium)
  - [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) (easy)
  - [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) (easy)
  - [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) (hard)
  - [Coin Change](https://leetcode.com/problems/coin-change/) (medium)
  - [Course Schedule](https://leetcode.com/problems/course-schedule/) (medium)

### Blind 75: 75 problems
- Difficulty: Easy 19, Medium 49, Hard 7. Fields: name (link), difficulty, checkbox, star; groups collapse and show "N problems".
- Topics (12): Array 15, String 11, Linked List 6, Tree 11, Graph 6, Dynamic Programming 8, Greedy 4, Backtracking 3, Heap 3, Trie 2, Bit Manipulation 4, Math 2.
- Page adds a 4-week study outline and unsourced success statistics. Examples (one per topic, 10):
  - Array: [Two Sum](https://leetcode.com/problems/two-sum/) (Easy)
  - String: [Valid Anagram](https://leetcode.com/problems/valid-anagram/) (Easy)
  - Linked List: [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) (Easy)
  - Tree: [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) (Easy)
  - Graph: [Clone Graph](https://leetcode.com/problems/clone-graph/) (Medium)
  - Dynamic Programming: [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) (Easy)
  - Backtracking: [Word Search](https://leetcode.com/problems/word-search/) (Medium)
  - Heap: [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) (Hard)
  - Trie: [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) (Medium)
  - Bit Manipulation: [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) (Easy)

### LeetCode 150: 150 problems
- Difficulty: Easy 40, Medium 92, Hard 18 (page text claims 50/75/25). Same row anatomy as Blind 75.
- Topics (24): Array 16, String 8, Two Pointers 5, Sliding Window 4, Matrix 5, Hashmap 9, Intervals 4, Stack 5, Linked List 11, Binary Tree General 14, Binary Tree BFS 4, Binary Search Tree 3, Graph General 6, Graph BFS 3, Trie 3, Backtracking 7, Divide and Conquer 4, Kadane's Algorithm 2, Binary Search 7, Heap 4, Bit Manipulation 6, Math 6, 1D DP 5, Multidimensional DP 9.
- The page's own "coverage" list (arrays and strings 25, concurrency 15, ...) does not match the data. Examples (10):
  - Array: [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) (Easy)
  - Matrix: [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/) (Medium)
  - Hashmap: [Ransom Note](https://leetcode.com/problems/ransom-note/) (Easy)
  - Stack: [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) (Easy)
  - Linked List: [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) (Easy)
  - Graph General: [Number of Islands](https://leetcode.com/problems/number-of-islands/) (Medium)
  - Backtracking: [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) (Medium)
  - Binary Search: [Search Insert Position](https://leetcode.com/problems/search-insert-position/) (Easy)
  - Heap: [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (Medium)
  - 1D DP: [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) (Easy)

### Top Concurrency: 42 problems
- Difficulty: Easy 1, Medium 15, Hard 26. Six problems in each of seven groups: Threading, Synchronization, Parallel Programming, Concurrent Data Structures, Async Programming, Deadlock Prevention, Performance Optimization. Cyan accent.
- Only about 7 rows link to a real LeetCode concurrency problem (examples: [Print in Order](https://leetcode.com/problems/print-in-order/), [Design Bounded Blocking Queue](https://leetcode.com/problems/design-bounded-blocking-queue/)); the others are named prompts (parallel matrix multiply, concurrent hash map, lock-free structures, dining philosophers) sharing one unrelated URL. Page copy covers mutexes, semaphores, condition variables, atomics, work stealing, false sharing.

### HLD Sheet: 30 prompts
- Difficulty: Medium 7, Hard 23. Seven groups: Social Media 5, E-commerce 5, Streaming 4, Storage 4, Messaging 4, Search 4, Gaming 4. Classic "design X" prompts (a social feed, a marketplace, a video service, a distributed cache, a chat system, a web search engine, an online game platform). Orange accent. All 30 links are the same unrelated LeetCode URL, so the sheet has no external content.

### LLD Sheet: 27 prompts
- Difficulty: Easy 3, Medium 15, Hard 9. Six groups: Design Patterns 5, Object-Oriented Design 5, Data Structures 5, Concurrency 4, Caching 4, Messaging 4. Purple accent. Real links: [Design HashMap](https://leetcode.com/problems/design-hashmap/), [LRU Cache](https://leetcode.com/problems/lru-cache/), [Design Bounded Blocking Queue](https://leetcode.com/problems/design-bounded-blocking-queue/); the rest (parking lot, patterns, message queue ...) use the shared placeholder link.

### Google sheet: 2,627 problems, 73 topic tags
- Difficulty: Medium 1,807, Hard 820. Free 2,174, Premium 453.
- Tag counts (sum 9,337, so problems carry several tags): Array 1620, Dynamic Programming 610, String 589, Hash Table 570, Math 469, Greedy 393, Sorting 388, Depth-First Search 291, Binary Search 290, Breadth-First Search 230, Matrix 227, Tree 213, Bit Manipulation 211, Prefix Sum 204, Database 198, Heap (Priority Queue) 187, Graph 175, Two Pointers 167, Stack 151, Sliding Window 139, Binary Tree 139, Counting 117, Design 115, Simulation 113, Backtracking 108, Enumeration 100, Union Find 96, Number Theory 73, Ordered Set 73, Monotonic Stack 68, Segment Tree 68, Linked List 66, Bitmask 55, Combinatorics 54, Trie 54, No Tag 52.
- Remaining tags: Divide and Conquer 51, Binary Indexed Tree 43, Queue 43, Recursion 39, Memoization 39, Shortest Path 38, Topological Sort 37, Hash Function 36, Geometry 35, Binary Search Tree 30, Rolling Hash 30, String Matching 27, Game Theory 26, Monotonic Queue 20, Interactive 19, Brainteaser 17, Data Stream 16, Merge Sort 12, Doubly-Linked List 12, Randomized 12, Iterator 8, Line Sweep 8, Quickselect 7, Probability and Statistics 7, Suffix Array 7, Concurrency 7, Bucket Sort 6, Counting Sort 6, Minimum Spanning Tree 6, Reservoir Sampling 4, Radix Sort 3, Eulerian Circuit 3, Strongly Connected Component 3, Shell 2, Rejection Sampling 2, Sort 2, Biconnected Component 1.
- Top by frequency in the Array group: [42 Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) (Hard, freq 99.4), [56 Merge Intervals](https://leetcode.com/problems/merge-intervals/) (Medium, 97.7), [560 Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) (94.3), [4 Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) (Hard, 94.0), [200 Number of Islands](https://leetcode.com/problems/number-of-islands/) (93.9), [49 Group Anagrams](https://leetcode.com/problems/group-anagrams/) (90.9), [11 Container With Most Water](https://leetcode.com/problems/container-with-most-water/) (90.8), [15 3Sum](https://leetcode.com/problems/3sum/) (89.9). String group leader: [5 Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) (96.3).

## Design language

- Fonts: sans stack `Inter, system-ui, sans-serif` (no @font-face in the stylesheet, so Inter renders only if installed, otherwise system-ui); mono stack `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`. Sizes used: 12, 14, 16, 18, 20, 24, 30, 36, 60 px; weights 500, 600, 700. Hero H1 is 36 to 60 px bold with tight tracking.
- Brand tokens (CSS): navy #0c2748, navy-deep #071a2e, gold #e8b923, mist #e8f0f7; theme-color meta #0f2742; manifest background #f8fafc.
- Neutrals (Tailwind gray/slate): #fff, #f9f9f9, #f1f5f9, #f3f4f6, #e2e8f0, #e5e7eb, #cbd5e1, #d1d5db, #94a3b8, #9ca3af, #64748b, #6b7280, #475569, #4b5563, #334155, #374151, #1f2937, #1e293b, #111827, #0f172a.
- Accents: blue #3b82f6 (focus ring at 50%), cyan #06b6d4 and #0891b2; status tints emerald (easy), amber (medium), rose/red (hard); orange and purple as sheet accents; amber-400 for favourites; amber wash #fffbeb and green wash #f0fdf4 for callouts.
- Page frame: white sticky header (95% white, backdrop blur, slate-100 bottom border) over a slate-50 / gray-50 body. Home and blog are light; sheet pages use a dark hero and dark gray-800/700 cards for the tool, so the site feels like two products. Widths: max-w-7xl (80rem) for tools, 3xl to 4xl for text, 65ch prose.
- Radius: 4 px, 6 px, 8 px (cards, rows), 12 px, 16 and 24 px (hero panels), full pills for difficulty chips.
- Motion: Tailwind transitions only, 150 ms with cubic-bezier(0.4, 0, 0.2, 1), 200 ms chevron rotate, a few 300 and 500 ms; hover colour shifts on rows; smooth scroll-to-top when you click the current page link. No keyframes, no illustrations.
- Components: sticky nav with dropdown, hero with two CTAs, stat trio, course cards with level badge and tag chips, practice-track cards, article cards, accordion groups, difficulty pills, checkbox rows, modal, progress bar, empty state, footer with quick links and categories.
- Copy tone: plain, confident, engineering-first ("serious", "production-oriented"); some inflated claims (success rates, "curated by FAANG engineers") with no evidence.

## Adopt for DSAMaxxing

P0
1. Browser-local progress store, done better. Why: zero friction and no login proves the "free" promise; they lack export, streaks and timestamps. How: one versioned object keyed by problem id with solvedAt and starred, try/catch on every read and write, JSON export and import.
2. One data-driven sheet shell: collapsible topic groups with done/total, three-colour difficulty pill, search, difficulty and topic filters, favourites, expand all, overall progress bar. Why: proven and fast to scan. How: one component fed by a JSON file per sheet, not per-page duplicated scripts.
3. Random unsolved picker (modal with open link) that respects the active filters. Why: cheap and removes choice paralysis. How: filter to unsolved, pick uniformly, clear "all done" state.
4. Link integrity as a build check. Why: their `undefined` YouTube links and the 80-plus rows pointing at a placeholder are the clearest failure. How: fail the build on empty, duplicate or placeholder URLs.
5. Honest counts. Why: their banners contradict their data. How: derive every total and difficulty split from the data.

P1
6. Daily challenge of N unsolved problems, seeded by date so it is stable for the day and ticks off in place. Why: habit loop; theirs looks build-time and stale. How: seed = UTC date, computed client-side.
7. Multi-tag problems with a frequency weight (the large-sheet model: several tags, acceptance rate, frequency score, premium flag, top 12 per tag with show more). Why: study by topic or by interview frequency. How: tags array and numeric weight per problem; lazy-load beyond 12.
8. Tag select with counts, and Medium+Hard presets.
9. Per-sheet accent colour for wayfinding. How: one CSS variable per sheet.
10. Course and lesson pages with module accordion, duration, level, and lesson completion feeding the same progress store.

P2
11. Article cards with read time, category pill and related posts; search chips (all, posts, courses) with a tag cloud.
12. PWA manifest and theme colour for installability.
13. Keep any ad slots off the tool and away from the visualiser; they are their only revenue.
14. Avoid: dead social links, mixed light and dark pages, unsupported statistics, leftover console logs, a one-category-per-problem limit.
