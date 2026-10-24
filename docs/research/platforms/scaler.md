# Scaler (scaler.com) platform research

## 1. Method
- Date: 2026-10-24. Tools: REA MCP `capture_browser_scenario` (launch mode, Edge/Chromium 156, 1280x720, one to two pages per call), parsed to `rea/scaler/`.
- robots.txt read first (see below) and respected. No bot check, CAPTCHA or rate limit met. No login attempted.
- Pages captured (11 + 2 stylesheets): home, `/courses/data-structures-and-algorithms/`, `/topics/data-structures/`, `/topics/data-structures/binary-search-algorithm/`, `/topics/course/dsa-interviews-java/`, `/topics/challenges/`, `/topics/contests/`, `/ai-practice-labs/`, `/academy/`, one 404 probe. CSS: Topics app stylesheet (cloudfront) and one main-site chunk.
- robots.txt: all spiders allowed except `/profile`, `/event/*`, `/topics/*?` (query URLs), `/topics/page/*`, `/topics/category/*`, `/topics/*/amp/*`, `/academy/profile`, careers subpaths and sign-up/password paths. Sitemap at `/sitemap.xml`. Everything visited is outside these rules.
- Full URL record: `docs/research/links/scaler.md`.

## 2. Summary and business model
Scaler is an Indian paid-programme edtech (12-month "Software and AI Engineering" Academy, plus data science, AI/ML, DevOps, IIT-Roorkee degree tie-ups). The public site is a funnel: a free content layer called **Scaler Topics** (tutorials, free certificate courses, challenges, contests, compilers) feeds a lead form ("Request a callback", mobile OTP) for the paid programmes. The home page now pitches an "AI era" career, AI mock interviews and 17 AI practice labs. Pricing is not shown on the public pages visited; the revenue model observed is lead capture into counsellor-sold programmes. The Topics app sits on a separate CDN origin and Next.js build; the marketing site uses a Storyblok-driven Next build. InterviewBit (see its own file) is a sibling product from the same company (shared "Kings Gambit Labs" author tag).

## 3. Sitemap and URL patterns
- `/` corporate home; `/academy/`, `/courses/<slug>/` (programme landing pages), `/ai-practice-labs/`, `/blog/`, `/events`, `/about`, `/review/`.
- `/topics/` (Topics app): `/topics/<hub>/` (e.g. `data-structures`, `java`, `python`, `dbms`), `/topics/<hub>/<article-slug>/` (about 125 DSA article slugs linked from the DSA hub), `/topics/course/<slug>/` (free video courses), `/topics/challenges/`, `/topics/contests/`, `/topics/articles/`, `/topics/hubs/`, `/topics/events/`, `/topics/<lang>/online-<lang>-compiler/`.
- Trailing slash canonical. Arrays article slug is `array-data-structure` (my guess `arrays-in-data-structure` returned a Next 404 page).

## 4. Features and how they work
- **Topic tree / hub**: the DSA hub groups 22 numbered modules, each listing lessons with minutes. It doubles as the table of contents of a free video course (Aditya Jain, C++, 4.5 rating, about 48k enrolled) and a tabbed view: Reading Track, Video Courses, Articles.
- **Progress and certificate**: a hub states a certificate is granted when all modules are done; sign-in is needed up front to track progress. Free courses show "Certification included" and a sample certificate link.
- **Video courses with per-module challenge**: the DSA-interviews Java course has 11 modules, 80 lessons, 13h 6m, an 11-challenge quiz gate (5 questions each in the ones sampled), 67k enrolled, rated 4.9.
- **Challenges**: list of article-linked coding/MCQ sets ("No. of Questions: 3", "Solve Now"), 407 result pages, searchable by topic; each challenge attaches to an article.
- **Contests**: "DSA Fortnightly" archive, numbered, dated (Apr 2023 onward), status Ended; old contests can be practised.
- **Articles**: each has author, read time, last-updated date, views, a "Cheatsheet" link, takeaways section, exercise section, and an in-page programme upsell block (programme cards with duration and "NSDC Certified" badge).
- **AI Practice Labs** (17): DSA Coding Lab (editor plus test cases), Probing Interviews Lab (AI asks why-this-approach questions after you solve), AI Coding Lab (4 phases on a real codebase), SQL labs, schema/class-diagram/LLD labs, ML notebook, Linux and Debug Simulator labs, Project Interviews lab. Each lab card carries a rating (4.5 to 4.7) and "practise problems asked at" company logos.
- **Company tags**: only as logos on lab cards; no per-problem company filter observed on public pages.
- **Streaks, leaderboards, coins**: none on the public Scaler pages.
- **Visual teaching**: articles are text and static figures; no interactive visualiser observed.
- Free **online compilers** per language and utilities (formatter, JSON validator).

## 5. Content coverage (reference only; counts and about ten samples)
- DSA hub: 22 modules, about 125 article links. Module sizes in minutes: introduction 23, complexity 21, problem-solving techniques 32, searching 24, sorting 92, strings (data structure 16, pattern matching 25), linked lists 24, hashing 50, trees 211, greedy/DP 47, graphs (basic 56, components 38, spanning 21, shortest path 38, flow 25, advanced 31), maths 79.
- Sample articles: [Binary Search](https://www.scaler.com/topics/data-structures/binary-search-algorithm/), [Dijkstra](https://www.scaler.com/topics/data-structures/dijkstra-algorithm/), [KMP](https://www.scaler.com/topics/data-structures/kmp-algorithm/), [Segment Trees](https://www.scaler.com/topics/data-structures/segment-trees-in-data-structure/), [Trie](https://www.scaler.com/topics/data-structures/trie-data-structure/), [Disjoint Set](https://www.scaler.com/topics/data-structures/disjoint-set/), [Dynamic Programming](https://www.scaler.com/topics/data-structures/dynamic-programming/), [Fenwick Tree](https://www.scaler.com/topics/data-structures/fenwick-tree/), [Topological Sort](https://www.scaler.com/topics/data-structures/topological-sort-algorithm/), [Red Black Tree](https://www.scaler.com/topics/data-structures/red-black-tree/).
- Interview course modules (11): Arrays, Binary Search, Recursion and Backtracking, Dynamic Programming, Sorting, Stack and Queue, LinkedList, Trees, HashMap, Heap, Graphs. Course page: [DSA Problem Solving for Interviews using Java](https://www.scaler.com/topics/course/dsa-interviews-java/).
- Other free courses seen: [DSA in C++](https://www.scaler.com/topics/course/cpp-data-structures/), [Dynamic Programming](https://www.scaler.com/topics/course/dynamic-programming/), [Instagram System Design](https://www.scaler.com/topics/course/instagram-system-design/), [DBMS](https://www.scaler.com/topics/course/dbms/).
- Academy DSA course: 7 modules over 9.5 to 11.5 months by level (language fundamentals 2 mo, DSA 4.5 mo, SQL 0.5, LLD/projects 3.5, system design 1, electives, Gen AI 2); DSA module topics span complexity, arrays, bit manipulation, maths, recursion, backtracking, sorting, binary search, two pointers, hashing, strings, linked lists, stacks, queues, trees, tries, heaps, greedy, DP, graphs.

## 6. Design language
- Fonts (Topics CSS): Source Sans Pro for body, Source Serif 4 for long reading, Plus Jakarta Sans, clashGrotesk and "agatho" display faces, custom icon fonts.
- Palette from CSS: link/primary blue `#0f87ff`, deeper `#005bb3`/`#0b69bf`; success green `#1a8452`; neutrals `#f6f7f8`, `#e8eaed`, `#dcdcdc`, `#c8c8c8`; a blue ramp (`#e6f4ff` to `#002a66`) and a pink ramp (`#ffe6f1` to `#ff2e8b`) for accents.
- Tokens: border radius 0.4rem base, 0.8rem on most cards, 1.6rem on large containers; 1rem spare font size; bold weight 800.
- Motion: only utility keyframes (shimmer, spin, blink, indeterminate, flash bar slide-in). Marketing pages rely on carousels.
- Components: sticky mega-nav with product tabs, carousels, accordions for modules, rating badges, "NSDC certified" chips, sticky callback form with OTP, floating app download promo.
- Tone: aspirational career copy ("proof matters"), AI-first framing, heavy CTA density; article layer is plain explanatory.

## 7. Adopt for DSAMaxxing
- P0: numbered module hub with per-lesson minutes and total time (clear learning path, no login needed to read).
- P0: certificate rule stated plainly ("finish every module") plus progress tracked per hub.
- P0: pair every article with a small practice set (3 questions) via "Solve Now".
- P1: "probing interview" mode where an AI or scripted follower asks why-this-approach after a solve.
- P1: cheatsheet link per article and takeaways block at top.
- P1: archived contest series, dated and numbered, replayable.
- P2: read-time, last-updated and view-count meta on articles.
- P2: pink/blue accent ramps for topic-category colour coding.
- Avoid: lead-form pop-ups, OTP gates and programme upsells inside articles.
