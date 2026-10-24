# Educative (educative.io) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge), date 2026-10-24. DOM capture for `/`; accessibility-tree capture for `/courses/grokking-coding-interview` and `/pricing` (the DOM of the course page exceeded REA's response cap).
- robots.txt: `*` allowed (empty Disallow); Googlebot has a few parameter and `/courses/*/lta/` blocks; sitemap at `/sitemap.xml`. ChatGPT-User and Google-Extended explicitly allowed. No bot check, no login.
- Redirects seen: `/` became `/?ver=b` (A/B variant); `/pricing` redirected to `/unlimited`. Stylesheet not captured, so design facts below are limited to what the page text and fonts show.

## Summary and business model
- Text-and-interactive-coding learning platform (no video-first), "3.1 million developers". Pitch on home: "Big tech has evolved. Interview prep hasn't." Interview-prep centred: Grokking courses, AI mock interviews (31,000+ conducted), AI Tutor, roadmaps by level and by employer loop.
- Subscription ("Educative Unlimited"). Three tiers on `/unlimited`: Standard (INR 562/month billed annually 6,737 vs 21,732 list), Premium (832/month, 9,982/yr vs 32,200) marked best for interview prep, Premium Plus (1,011/month, 12,128/yr vs 39,123) marked best for career growth. A running "69% off before Halloween" promo with a live countdown and "lock in for life" wording. Tier gates: Standard = 2,300+ courses, personalised tutorials, code feedback; Premium adds 330+ projects, code debugger, breakout sessions, 3 AI mock interviews per month; Premium Plus adds 330+ cloud labs, expert interview coach, 7 AI mock interviews per month. Monthly, Annual and Two-Year billing tabs; gift subscriptions.
- Free entry: "Start this Course for Free" and "Join for free"; individual courses show free preview lessons.

## Sitemap / URL patterns
- `/courses/<course-slug>` and `/courses/<course-slug>/<lesson-slug>`; `/explore`, `/explore/early-access`, `/answers`, `/cheatsheets`, `/compilers`, `/games`, `/blog`, `/ai-tutor`, `/assessments`, `/blind75`, `/cloudlabs`, `/data-science`, `/generative-ai`, `/faq/general-faq`, `/unlimited`, `/about-us`, `/careers`, `/contactUs`.
- Nav shows a Resources mega-menu: Newsletter, Blog, Guides, Free Cheatsheets, Answers, Games (daily challenges), Compilers, Educative Wrapped report, AI Tutor, search with Cmd-K.

## Features and how they work
- **Course page** (Grokking the Coding Interview Patterns): language selector (C#, C++, Go, Java, JavaScript, Python), "Start Preparing", "Course Content" button, "What's included" list, a **Learning Roadmap** where each pattern is a collapsible card with a one-line description, an intro lesson and a long list of problems tagged easy/med/hard, plus an "Optimize My Roadmap" button that re-orders for a target company and role. Course carries an "Updated yesterday" tag and a 4.9 rating.
- **AI Tutor** on every lesson; **AI mock interviews** with scoring rubrics; instant code feedback including time and space complexity; quizzes with instant feedback.
- **Home**: tabs for "Your loop" (target employer plus level plus stage: Screen, Coding, System design, Behavioral, Offer), course shelf with New/Updated badges and dates, case-study teasers, FAQ block.

## Content coverage (counts)
- Grokking the Coding Interview Patterns: 28 patterns, 1,125 lessons across 31 modules, 579 quizzes, 17 AI mock interviews. 28 patterns as shown (about 10 sampled): Two Pointers, Fast and Slow Pointers, Sliding Window, Intervals, In-Place Linked List Manipulation, Two Heaps, K-way Merge, Top K Elements, Modified Binary Search, Subsets (plus Greedy, Backtracking, DP, Cyclic Sort, Topological Sort, Sort and Search, Matrices, Stacks, Graphs, Tree DFS, Tree BFS, Trie, Hash Maps, Union Find, Custom Data Structures, Bitwise Manipulation, Math and Geometry, and a Challenge Yourself set). Each pattern holds dozens of linked problems with a difficulty tag. Reference only; we do not reproduce the lists.
- Catalog claims 2,300+ courses and 330+ projects and cloud labs. Grokking Modern System Design: 209 lessons, 10 mock interviews, rating 4.7.

## Design language
- From the DOM and accessibility tree (no visual render or CSS captured, so palette and type are unverified; Roboto appears in embedded widget styles): badge pills (New, Updated), tab strips, collapsible pattern accordions, slide carousels (previous/next/slide dots), sticky top nav with a Resources mega-menu and Cmd-K search, a countdown banner above the nav for promos.
- Motion: carousel slides, accordion expand, ticking promo timer.

## License / terms
Not captured. Commercial, copyrighted course content. Facts only.

## Adopt for DSAMaxxing
**P0**
- Pattern cards: one collapsible card per pattern with a one-line "use it when" blurb, an intro, then graded problems. Same shape as our pattern stories.
- Free-preview rule: first lessons of every course free, paywall after.
**P1**
- Per-company or per-role "Optimize my roadmap" re-ordering (can be a simple filter in v1).
- Instant feedback on complexity ("your solution is O(n^2) here").
**P2**
- AI mock interviews with rubric scoring; tiered gating by monthly AI-credit counts; time-limited promo banners.
