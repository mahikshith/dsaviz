# AlgoMaster.io research (for the DSAMaxxing rebrand)

Source: algomaster.io, observed via the REA MCP server only. Facts, names and structure are recorded; prose is paraphrased. Per coordinator rule, no curated sheet is republished wholesale (see Content coverage).

## Method

- Tool: `mcp__rea__capture_browser_scenario` (Edge launch mode, 1280x720, DOM capture) for pages; a direct network capture of the main stylesheet (token extraction script) for design tokens.
- Date: 2026-10-24.
- Pages rendered: 25 (23 from the first crawl, plus `/animations/dsa` and `/practice/dsa/trapping-rain-water`), plus 3 stylesheets. See `links/algomaster.md`.
- Blocked or limited: `/leaderboard` redirects to `/login` (login required). No bot check or rate limit was met. Two multi-page REA batches failed (response over the 10 MB cap, or connection closed), so chapter pages (`/learn/dsa/<chapter>`) were NOT rendered. Their structure is inferred from the course-introduction page, which embeds the whole 771-item sidebar.
- `/practice/dsa-patterns` server-renders only 10 of 59 pattern groups (the rest lazy-load on scroll: "Loading more patterns (10 of 59 groups)"), so full group names and problems are not captured. Logged-in state (progress, streak, XP) is not observable.

## Summary and business model

- Pitch: "master patterns, not just problems". Pattern-based interview prep: DSA, system design (fundamentals and interviews), low-level design, concurrency, behavioral, SQL, plus AI/ML, core CS, backend, languages, git. Creator-led brand (Ashish Pratap Singh; newsletter, YouTube, GitHub). Claims 1M+ learners (LinkedIn 245K+, YouTube 275K+, Instagram 400K+, newsletter 150K+, GitHub stars 100K+).
- Freemium: the DSA course says a significant portion is free; premium unlocks all concepts and problems, animations, company tags, AI features and unlimited code submissions. Gates seen: the Google company page lists 5 of 463 problems then "Upgrade to Premium"; many mock-interview rows are tagged Premium (the first row of each list is free).
- Pricing (INR, on /premium, one-time, no auto-renewal): Monthly (1 month) Rs 2,999; Annual Rs 6,999 (struck Rs 9,299, 25% off, "Most Popular"); Lifetime Rs 14,999 (struck Rs 24,999, 40% off, "Best Value"). Site-wide banner: up to 40% off. Annual and Lifetime add the newsletter; Lifetime adds all future content and priority support. Mobile app is free to download; premium is priced on the web.
- Social proof: "Hired" testimonial cards with company badges, a community quotes carousel, a creator bio.

## Full sitemap and URL patterns

```
/                              landing
/courses                       catalogue (8 interview, 3 AI/ML, 2 core CS, 3 backend, 5 languages, git)
/learn/dsa  -> /learn/dsa/course-introduction   (771-chapter course)
/learn/dsa/<chapter-slug>      concept chapters AND problem chapters share this pattern
/learn/system-design/*  /learn/system-design-interviews/*  /learn/lld/*  /learn/concurrency-interview/*
/learn/behavioral/*  /learn/sql-interview/*  /learn/job-search/*  /learn/ml-system-design/*
/learn/{java,python,cpp,csharp,go,git,kafka,microservices,api-design,operating-systems,
        computer-networks,ai-engineering,genai-system-design-interviews}
/practice/dsa-patterns         pattern sheet (AlgoMaster 75/150/300/600 tabs)
/practice/dsa/<slug>?list=am-300   problem page (list param selects the sheet)
/practice/company -> /practice/company/google   (42 companies)
/practice/{system-design,low-level-design,concurrency}   practice lists
/interview/{coding,system-design,low-level-design}       AI mock interviews (+ /interview/coding/history)
/animations                    6 hubs: /animations/{dsa-concepts,dsa,system-design,concurrency,ai-ml,sql}
/roadmaps -> /roadmaps/<id>    28 roadmaps
/resume -> /resume/build  (+ /resume/review, /resume/track)
/premium  /mobile  /faqs  /login  /leaderboard (login)  /dashboard  /releases  /contact  /policies/*
```

| Pattern | Meaning |
|---|---|
| `/learn/<course>/<chapter-slug>` | reader page with course sidebar |
| `/practice/dsa/<slug>?list=am-300` | problem page; `list` selects the sheet tier |
| `/practice/company/<slug>` | company list (camelCase slugs such as goldmanSachs, walmartLabs, deshaw) |
| `/animations/<category>` | animation index; animations link to `/animations/<slug>` (652 links seen) |
| `/roadmaps/<id>` | short ids: dsa, os, cn, js, de, dl, ml, and so on |
| `/interview/<type>` | mock interview setup pages |

## Every feature and how it works

- Pattern sheet (`/practice/dsa-patterns`): four tiers by time budget (75: under 1 month; 150: 1-3 months; 300: 3+ months; 600: 6+ months). Header controls: "Pick Random Problem" (Unsolved / Starred / Any radio, each with a count), Filters, Sort, "Start Mock Interview". Progress bar "0/300 solved" with per-difficulty counts (Easy 48, Medium 196, Hard 56 on the 300 tier). Groups are collapsible accordions with a "0/N" counter (59 groups on the 300 tier). Table columns: Status, Problem, Difficulty, Frequency, LeetCode (outbound link), Solution, Actions (star). A row opens `/practice/dsa/<slug>?list=...`; the matching concept chapter is `/learn/dsa/<slug>`.
- Progress tracking: per-chapter "Complete" and "Star" buttons in the reader; the course header shows "0/771", a percent and a Certificate badge; sidebar sections show done/total; a reading-progress percentage. Logged-out state shows zeros, so state is server-side per account. The only localStorage key found in the HTML is `theme`.
- Streaks, XP, leaderboard: the mobile mockup shows a flame streak count, "This Week", Level, XP (2,450 sample) and Rank. CSS keyframes `xp-reward-pop` and `xp-reward-shine` imply an XP toast on completion. `/leaderboard` needs login.
- Reader tools: listen mode (TTS, male/female voice, speed, text highlighting; keyframes `tts-pulse`, `speaking`), multi-colour highlights, inline notes, a per-course notebook (searchable, downloadable), Ask AI on a selection or code block, reading controls (CSS vars `--reading-font-size:1.125rem`, `--reading-line-height:1.75`, `--reading-max-width:56rem`, `--reading-heading-scale`), fullscreen, a "Book" view (`?book`), an on-this-page TOC, a Discord link.
- Quizzes: concept chapters end with multiple-choice quizzes ("Check answer", instant feedback); the marketing also lists code completion and matching.
- Problem page: statement, example cards that draw arrays as indexed cells, constraints, a "Solve on LeetCode" link, Topics and Companies dropdowns, 3-4 progressive hints, language picker (Java, Python, C++, C#, Go, JavaScript, TypeScript), timer, test-case tabs (10 cases), Run / Submit / Evaluate, Feedback, Visualize input, submission history, several solution approaches from brute force to optimal with complexity.
- Visualizers: a step player with counter (e.g. "0 / 17"), speed (1x), custom input, a code pane with line highlighting, variable and data-structure state, approach tabs, language switch. Counts: 140 DSA concept, 647 DSA problem, 333 system design, 37 concurrency, 95 AI/ML, 31 SQL animations. Algo colours below; pattern keyframes `pattern-node-hop` and `pattern-border-spin`.
- Company tags: 42 companies with problem counts (Google 468, Amazon 430, Microsoft 401, Bloomberg 397, Meta 360, down to Media.net 10). The page shows "x / 463" progress, a Show Topics toggle, filters, a Mock Interview button, and a free preview of 5 rows then a paywall.
- AI mock interviews. Coding: interviewer style (Strict / Standard / Coaching), level (L3 / L4 / L5), optional no-run mode, problem mix with timers (Easy 15, Medium 30, Hard 45 min), company pools, summary card (e.g. 105 min, 2 Medium + 1 Hard), scoring over six weighted areas (understanding 10, approach 25, implementation 25, testing 15, complexity 15, communication 10), each rated 1-4 and combined to /100 against a level-based hiring bar (70 at mid-level). System design: 12 sections, 55 problems. LLD: 9 sections, 45 problems. Rows have Learn / Simulation / Start-or-Premium columns.
- Concurrency practice: 50 problems in groups (e.g. synchronization primitives 7, locking strategies 5), difficulty and topic filters, random problem.
- Resume builder (beta): Build / Review / Track tabs, ATS-friendly layouts, AI drafts bullets and summary; sign-in needed to save; start blank, import PDF, or clone from a review.
- Roadmaps: 28 short opinionated topic sequences (languages, CS, AI/DS, frameworks, development tracks, deployment).
- Mobile app (iOS and Android): home with continue-learning card and streak, course progress, patterns practice, company practice, animations; tabs Home / Learn / Search / Ask AI / Profile; offline lessons, listen mode, daily streaks with reminders.
- Auth: Google, GitHub, email. Theme toggle stored in localStorage `theme`; dark mode via `.dark`.
- Misc: newsletter and blog (blog.algomaster.io), Discord, a releases page with a requests tab, a certificate on course completion.

## Content coverage

- Marketing claims: 60+/70+/75+ patterns (copy varies by page), 600+ DSA problems, 150 system design, 107 LLD and 50 concurrency practice problems, 42 companies.
- DSA course sidebar: 771 chapters in 31 sections (section chapter counts as shown): Welcome 3, Interview strategy 5, Programming fundamentals 7, DSA warmup 65, Big O 8, Math 24, Sorting 24, Arrays 19, Strings 18, Bit manipulation 13, Hash tables 22, Two pointers 17, Sliding window 22, Prefix sum 13, Kadane 8, Binary search 25, Matrix 9, Linked list 28, Stacks 37, Queues 17, Recursion and backtracking 28, Binary tree 47, BST and ordered set 20, Heaps 19, Intervals 17, Tries 15, Data-structure design 22, Greedy 19, Graphs 82, Dynamic programming 92, Advanced topics 26 (string matching, Fenwick and segment trees, line sweep). Stated study loop: concept, quiz, patterns, problems, compare with optimal, review complexity, revisit.
- Pattern sheet (300 tier): 300 problems, 48 Easy / 196 Medium / 56 Hard, 59 groups. Rendered groups with counts: Arrays 10, Strings 6, Bit Manipulation 7, Hash Tables 13, Two Pointers 5, Prefix Sum 5, Sliding Window fixed 5, Sliding Window dynamic 5, Kadane 4, Matrix 5. Typical group size is 4-13 problems. Full list deliberately not reproduced.
- Sample problems (examples only, LeetCode links):
  - Trapping Rain Water (Hard): https://leetcode.com/problems/trapping-rain-water/
  - Two Sum II: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted
  - 3Sum: https://leetcode.com/problems/3Sum
  - Container With Most Water: https://leetcode.com/problems/container-with-most-water
  - Group Anagrams: https://leetcode.com/problems/group-anagrams
  - Minimum Window Substring: https://leetcode.com/problems/minimum-window-substring
  - Subarray Sum Equals K: https://leetcode.com/problems/subarray-sum-equals-k
  - Maximum Subarray: https://leetcode.com/problems/maximum-subarray
  - Product of Array Except Self: https://leetcode.com/problems/product-of-array-except-self
  - Valid Sudoku: https://leetcode.com/problems/valid-sudoku
- Animation catalogue (/animations/dsa) is grouped like the course: pattern printing, sorting, array, string, bit, hash, two pointers, prefix sum, sliding window, and onward.

## Design language

- Fonts: Inter (sans, `--font-sans`) and JetBrains Mono (code); system mono fallbacks. Reading size 1.125rem, line-height 1.75.
- Theme: shadcn HSL tokens. Light: background 0 0% 100%, foreground 240 10% 3.9%, primary 142.1 76.2% 36.3% (green), primary-foreground 355.7 100% 97.3%, secondary/muted/accent 240 4.8% 95.9%, muted-foreground 240 3.8% 46.1%, border/input 240 5.9% 90%, destructive 0 84.2% 60.2%, ring = primary. Dark (`.dark`): background 20 14.3% 4.1%, foreground 0 0% 95%, card 24 9.8% 10%, primary 142.1 70.6% 45.3%, secondary 240 3.7% 15.9%, muted 0 0% 15%, border 240 3.7% 15.9%, destructive 0 62.8% 30.6%. Chart colours light: 12 76% 61%, 173 58% 39%, 197 37% 24%, 43 74% 66%, 27 87% 67%; dark: 220 70% 50%, 160 60% 45%, 30 80% 55%, 280 65% 60%, 340 75% 55%.
- Algo colours: #00D084 active, #00CEFF standard, #d6f7ff secondary, #FCB900 highlight, #EF4444 error, #9B59B6 special, muted oklch(0.269 0 0). Frequent utility hexes: #4ade80, #34d399, #60a5fa, #3b82f6, #52525b, #18181b, #09090b, #0a66c2.
- Radius: `--radius` 0.5rem; pills 9999px; also 2px, .25rem, 1rem.
- Motion: .15s transitions dominate (23 uses) with cubic-bezier(.4,0,.2,1); .3s and .5s for larger moves. Keyframes: accordion-down/up, fade-in-up, pulse-once, ping, bounce, scroll marquees (testimonials), xp-reward-pop/shine, pattern-node-hop, pattern-border-spin, tts-pulse, speaking.
- Components: shadcn/Radix (561 `data-state` attributes: accordions, tabs, dropdowns, dialogs), Sonner toasts, sticky top bar with promo banner, left course sidebar accordion, right on-this-page TOC, reader action bar (Notes, Star, Complete, Ask AI), difficulty chips, progress bars with difficulty split, pricing cards with badges. Next.js app.
- Copy tone: confident, benefit-led, short imperatives, second person, numeric proof points everywhere, honest free/premium framing.

## Adopt for DSAMaxxing

P0
1. Pattern-first sheet with time-budget tiers and per-group plus per-difficulty progress. Why: it is the core navigation idea. Map: static JSON of our own groups; `solved` and `starred` in localStorage keyed by slug; accordions; random-pick (Unsolved / Starred / Any).
2. Step-through visualizer player (step counter, speed, code-line highlight, custom input, variable panel). Why: our differentiator. Map: fully client side; reuse the five-state colour semantics (active, standard, highlight, error, special) in our own palette.
3. Concept, quiz, problems flow with Complete and Star buttons and sidebar counters. Why: gives a sense of progress. Map: localStorage plus a course manifest.
4. Token architecture: HSL CSS variables, `.dark` class, Inter plus JetBrains Mono, 0.5rem radius, 150ms ease. Why: proven and easy to theme. Map: copy the structure, pick our own accent (not their green).

P1
5. Daily streak and XP toast with a pop animation. Why: habit loop. Map: localStorage dates; no leaderboard (needs a backend).
6. Problem page layout: statement, constraints, 3-4 progressive hints, difficulty chip, link out to the original problem, multi-approach solutions with complexity.
7. Topic and frequency filter chips on rows, using our own tagging.
8. Reader preferences (font size, line height, width, theme) via CSS variables saved locally.
9. Short opinionated roadmap pages by track.

P2
10. Listen mode (Web Speech API) and highlights/notes in localStorage with export.
11. Local mock-interview timer (15/30/45 min timeboxes, six-area self-score rubric), no AI.
12. Completion badge; PWA offline mode instead of a native app.
13. Skip: paid tiers, AI tutor, server leaderboard, resume builder.
