# InterviewBit (interviewbit.com) platform research

## 1. Method
- Date: 2026-10-24. Tools: REA MCP `capture_browser_scenario` (launch mode, Edge/Chromium 156), parsed into `rea/interviewbit/`.
- robots.txt read first: only `/profile` is disallowed; sitemap `sitemap.xml.gz`. Respected. No bot check, CAPTCHA or rate limit met; no login attempted (sign-in modals recorded, not used).
- Pages captured (11): home, `/courses/programming/`, `/practice/`, `/coding-interview-questions/` (reached via `/all-problem-list/` redirect), `/problems/gas-station/`, `/google-interview-questions/`, `/interview-preparation-kit/`, `/courses/fast-track/`, `/contests/`. CSS: main `ibpp-*.css` and `base.css`.
- Full URL record: `docs/research/links/interviewbit.md`.

## 2. Summary and business model
Free interview-practice site run by Scaler (same company; the nav carries a prominent "Scaler" tab and many calls to "Experience Scaler"). Business model observed: free practice and guides acquire users; funnel to Scaler programmes via events, "career roadmap" and prep-kit forms. Claims 1M+ learners, app rating 4.5 with 100K+ downloads, a web app. Account is required for progress, streak, submit and leaderboard (Google sign-in or email).

## 3. Sitemap and URL patterns
- `/courses/<track>/` tracks: `programming`, `data-science-and-machine-learning`, `databases`, `shell`, `system-design`; `/courses/programming/<topic>` topic pages (arrays, backtracking, binary-search, bit-manipulation, dynamic-programming, graph-data-structure-algorithms, greedy-algorithm, hashing, heaps-and-maps, linked-lists, math, stacks-and-queues, strings, time-complexity, tree-data-structure, two-pointers; plus `ninja-test`).
- `/courses/programming/topics/puzzles/`, `/puzzles/`.
- `/problems/<slug>/` problem pages; `/coding-interview-questions/` (also `/all-problem-list/`) is the master filterable list.
- `/<company>-interview-questions/` (google, amazon, facebook, tcs, accenture, infosys, wipro, cognizant, capgemini, deloitte, zoho, hcl) and `/<subject>-interview-questions/` (java, python, sql, javascript, data-structure, system-design, hr, etc.).
- `/<lang>-cheat-sheet/`, `/<subject>-mcq/`, `/online-<lang>-compiler/`, `/courses/fast-track-<lang>/`, `/contests/`, `/mock-interview/`, `/peer-mock-interview/`, `/interview-preparation-kit/`, `/blog/`, `/events`, `/discussion/`.

## 4. Features and how they work
- **Leveled topic tree (Programming track)**: 16 topics arranged in 8 levels. Each topic card lists article count and problem count and a "Topic Strength %" meter. Solving a topic unlocks a bonus. A warning appears when you open a higher level without finishing earlier ones, with a "Jump to level N" checkpoint-problems route that unlocks all prior levels.
- **Progress panel**: easy/medium/hard solved counters out of totals (275 / 287 / 53 = 615) plus a streak, goal, coins and score header; shown blank until sign-in.
- **Badges and certificate**: badge per completed topic, level bonuses, certificate for completing the track.
- **Leaderboard**: top-3 scored list, updated every 30 minutes; your rank hidden until sign-in.
- **Problem list filters**: difficulty, status (all, bookmarks, attempted, solved), topics, companies; sort; "Pick Random". Columns: topic, difficulty, average solve time in minutes, submission count, "Asked in" company chips. Progress header: Solved / 956, Attempted, Accuracy.
- **Problem page**: statement with constraints and examples, language picker, code editor with line numbers, custom input, Run and Submit (login needed to test or submit), a running timer, per-problem score (700 on the sample), submissions counter, "Seen in an interview?" feedback form, "All Problems 1/749" next-prev control.
- **Company guides**: per company page with process, rounds, prep tips, FAQ, PDF download and a tagged problem list (Google: 98 problems).
- **Prep kit**: asks for target companies (up to 5), roles, interview date, then generates a day/week-wise plan with MCQs, coding problems and self-assessment tests.
- **Mock**: free mock assessment and anonymous peer mock interviews with personalised peer matching.
- **Fast Track courses**: byte-size language refreshers (Python, Java, C++, JS, C#) with 28 to 35 problems each.
- **Contests**: 121 listed, tabs Active/Upcoming/Archived, including company hiring contests.
- **Visual teaching**: none beyond text and static diagrams; no interactive visualisations.
- **Streaks**: explicitly marketed in user testimonials and shown in the header.

## 5. Content coverage (counts; about ten sample names)
- Practice hub totals: Programming 615 problems, Data Science 77, System Design 8, Databases 45, Puzzle 54, Scripting 12. Master list 956 problems (home claims 800+). Fast Track: Java 35, JavaScript 28, Python 31, C++ 35, C# 35.
- Programming track topics (articles / problems): Time Complexity 6/15, Arrays 12/44, Math 6/29, Binary Search 5/16, Bit Manipulation 5/11, Strings 3/33, Two Pointers 1/16, Linked Lists 5/19, Stacks and Queues 8/12, Backtracking 7/15, Hashing 6/22, Heaps and Maps 3/11, Tree 4/45, Dynamic Programming 7/67, Greedy 5/10, Graph 7/32. Levels: 1 Time Complexity; 2 Arrays, Math; 3 Binary Search, Bit Manipulation, Strings, Two Pointers; 4 Linked Lists, Stacks and Queues; 5 Backtracking, Hashing; 6 Heaps and Maps, Tree; 7 Dynamic Programming, Greedy; 8 Graph.
- Sample problems (names are facts): [Gas Station](https://www.interviewbit.com/problems/gas-station/) (Greedy, medium), Majority Element (Greedy, easy), Distribute Candy (Greedy, medium), Longest Increasing Subsequence (DP, medium), Unique Binary Search Trees (DP, easy), Max Rectangle in Binary Matrix (DP), Distinct Subsequences (DP), Scramble String (DP, hard), Regular Expression Match (DP, hard), Min Jumps Array (DP). Problem links follow `/problems/<slug>/`.
- Company guides sample: [Google](https://www.interviewbit.com/google-interview-questions/), [Amazon](https://www.interviewbit.com/amazon-interview-questions/), [TCS](https://www.interviewbit.com/tcs-interview-questions/), [Infosys](https://www.interviewbit.com/infosys-interview-questions/), [Zoho](https://www.interviewbit.com/zoho-interview-questions/).
- Free video courses cross-sold on /practice/: DBMS, Python for beginners, Java DSA, C++, DSA in C++, OS, networking; 15k to 280k enrolled each.

## 6. Design language
- Font: Lato (with system fallback), icon fonts `sr-icons` and `ibpp-practice`.
- Palette from CSS: dark teal ink `#1a3d3c`, brand teal `#0097a0`/`#00ccd0`/`#007779`, light grey `#f1f3f3`, soft blue-white `#f8faff`, accent blue `#0f87ff`/`#0b65bf`, coral `#ff506c`, red `#d0021b`, green `#56c68e`, grey text `#869898`/`#506b6a`/`#818080`.
- Tokens: radius 0.8rem on cards (also 0.6, 1.5rem), 180ms transitions.
- Motion keyframes: drop-in, fade-in, fade-in-up, slide-in-down, zoom-out, pulse, rotate, horizontal-scroll.
- Components: mega-menu with sub-descriptions, topic cards with strength meter, level headers with checkpoint modal, data table with chips, sign-in modal (Google first), testimonial carousel, event cards with certificate chip.
- Tone: encouraging and metrics-driven ("topic strength", "bonus", "streak").

## 7. Adopt for DSAMaxxing
- P0: levelled topic tree with per-topic "strength %", article and problem counts, and a checkpoint skip route.
- P0: problem table with difficulty, status, topic, company filters, avg time and submissions.
- P0: header with streak, daily goal, score; badge per completed topic.
- P1: company-tagged problem lists and company guide pages.
- P1: a plan builder (companies, role, date) producing a dated schedule.
- P1: "pick random" and next/prev within the filtered list.
- P2: leaderboard refreshed on a fixed interval.
- P2: per-problem solve timer and "seen in an interview?" signal.
- Avoid: login wall before every action; keep read-only progress available locally.
