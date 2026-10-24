# takeUforward / TUF (takeuforward.org) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt: `*` allowed; disallows `/profile/edit`, `/api/`, `/plus/account`; sitemap at `/sitemap.xml`. No bot check, no login (login prompts appeared and were not used).
- Pages: `/`, `/prep-hub/strivers-a2z-dsa-sheet?page=sheet`, `/pricing`. The old `/strivers-a2z-dsa-course/...` path was not fetched; the home page links to the new Prep Hub URL.
- The A2Z sheet page shows counts and topic fractions only; the problem rows are behind login or lazy rendering, so no sample problem names were captured.

## Summary and business model
- Indian placement and interview prep platform grown from a YouTube channel (Striver). Pitch: one learning platform for tech interviews. Pillars: Prep Hub (DSA, System Design, Core CS), Planly (personal planner), practice (DSA, SQL, aptitude), notes, revision lists, an online compiler, community, and an AI helper called TUFY.
- Freemium: "Start learning for free" plus paid "TUF+" plans. The pricing page shows three tiers (Basic, Core, Max) with durations 12, 24, 48 months and Lifetime. Headline prices shown in INR: Basic 4,398 (struck 7,331, "40% OFF"), Core 6,298 (struck 10,498), Max 11,999 (struck 19,999). Basic and Core list the same module bullets (Planly, DSA, DBMS and SQL, OS, networks, aptitude, premium problems, OOPs, LLD, company questions by 30/60/90 days, AI content and assessment, HLD, backend principles) and differ by TUFY credits (10,000 vs 15,000). Max includes items scheduled for 2027. Countdown "offer ends" timers push urgency. Which duration a displayed price belongs to was not clear from the capture.
- Social proof: "100K+ learners placed", learner testimonials with company names, a Hall of Fame.

## Sitemap / URL patterns
- `/` home, `/pricing`, `/prep-hub`, `/prep-hub/strivers-a2z-dsa-sheet?page=sheet`, `/prep-hub?open=core-cs` and `?open=system-design`, `/planly`, `/practice/dsa`, `/practice/sql`, `/practice/quantitative`, `/potd`, `/lists`, `/notes`, `/ide`, `/codespace`, `/community`, `/dashboard`, `/hall-of-fame`, `/blogs`, `/contact-us`, `/privacy-policy`, `/terms-and-conditions`, `/cancellation-policy`.
- Login redirects look like `/get-started?next=<path>&type=login`.

## Features and how they work
- **A2Z sheet page**: header stats strip (about 6,100 online, 10,000 learners), overall progress "0 / 495 problems", split into three tiers (Basic 84, Core 287, Pro 109), then a topic list with solved fractions per topic. Progress needs login ("Log in/Sign up to track your progress"). A Daily Planner side panel is login-gated.
- **Planly**: the home page shows a mock dashboard: topics 12/24, time spent, last active, percent progress, "today's task 3/10" with timed tasks of 20 to 50 minutes. Stated steps: about you, goals, weekly sprints, solve and practice, time tracker, progress tracker, and "missed a day or task?" re-plan.
- Home FAQ covers beginner start and free vs paid.

## Content coverage (counts)
- A2Z sheet: 495 problems in 20 groups as shown on the page: Beginner Problems 83, Sorting 7, Arrays 32, Hashing 6, Binary Search 32, Strings (Basic and Medium) 7, Recursion 22, Linked-List 49, Bit Manipulation 14, Greedy 14, Sliding Window / 2 Pointer 13, Stack / Queues 31, Binary Trees 32, Binary Search Trees 15, Heaps 20, Graphs 46, Dynamic Programming 53, Tries 7, Strings (Advanced) 9, Maths 3. Reference only: we do not reproduce ordering or lists.

## Design language
- Next.js with utility CSS; system UI font stack (no custom webfont seen).
- Components: top nav (Dashboard, Explore, Pricing, Get Started), hero with progress mock cards, plan cards with feature bullets and duration tabs, countdown timers, testimonial cards with "Read more", accordion FAQ, WhatsApp, Discord and social footer.
- Palette not extracted (CSS not captured).

## License / terms
Footer: (c) 2026 Moveforward Private Limited. Terms, privacy and cancellation/refund pages exist (not read).

## Adopt for DSAMaxxing
**P0**
- Progress strip at the top of a sheet: overall ring plus tier split plus per-topic fraction, with a "log in to save" nudge (our version: local first, optional account later).
**P1**
- Planner concept: a daily task list with time estimates and a re-plan when a day is missed.
- Tier labels on content (Basic, Core, Pro) that map neatly onto free vs paid.
**P2**
- Hall of Fame outcome stories; lifetime tier with countdown pricing (test carefully, urgency timers can feel pushy).
