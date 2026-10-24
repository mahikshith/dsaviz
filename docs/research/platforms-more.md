# More DSA and interview platforms - comparison and ideas for DSAMaxxing

Date of research: 2026-10-24. Method: REA MCP `capture_browser_scenario` (launch mode, Edge) on public pages only, robots.txt checked first, no logins. Per-site details are in `docs/research/platforms/<site>.md`; visited URLs are in `docs/research/links/<site>.md`. Already covered elsewhere and skipped: NeetCode, ByteByteGo, VisuAlgo, USFCA, Scaler, InterviewBit, Coursera, CodeSignal.

## Status
- **Done (14):** GeeksforGeeks (2 pages only, see note), takeUforward, Educative, AlgoExpert, AtCoder (2 pages, noai), CSES, Exercism, roadmap.sh, Brilliant, Khan Academy (2 pages, robots unreadable), CS50, MIT OCW, Udacity, freeCodeCamp.
- **Blocked (3):** LeetCode (Cloudflare check), HackerRank (edge Access Denied), Codeforces (Cloudflare check, plus robots disallows AI crawlers). Stopped at the first block, nothing bypassed.
- **Restraint notes:** GeeksforGeeks robots lists `anthropic-ai` as disallowed and AtCoder sets `noai`, so each was limited to two pages and site-level facts. Khan Academy returned a challenge page for robots.txt only. Pricing for Brilliant was not fetched. CSS was captured only for CSES (full), and palette tokens read from inline CSS for freeCodeCamp.

## Comparison table

| Site | Model | Price seen | Killer feature | Visual teaching | Progress mechanics | License / terms |
|---|---|---|---|---|---|---|
| LeetCode | blocked | n/a | n/a | n/a | n/a | n/a |
| GeeksforGeeks | free articles + paid courses + partner promos | course prices not shown | One mega "map of everything" DSA page with 25 sections | n (text + code; no animation seen) | sign in to save; POTD | not captured; AI-crawler limits in robots |
| takeUforward | freemium, TUF+ plans (12/24/48 mo, lifetime) | INR 4,398 / 6,298 / 11,999 headline (period unclear) | A2Z sheet with progress rings by tier and topic + Planly daily planner | n (YouTube-led) | overall ring, tier split, topic fractions, planner, missed-day re-plan | (c) Moveforward Pvt Ltd |
| Educative | subscription (Educative Unlimited) | INR 562 / 832 / 1,011 per month billed annually (69% promo) | Pattern-by-pattern Grokking roadmap with 1,125 lessons, AI tutor and AI mocks | partial (interactive text lessons, diagrams) | roadmap, 579 quizzes (checkmarks not seen logged out) | not captured; commercial |
| AlgoExpert | one purchase, annual access bundles | USD 59 All Access (struck 343) | Two-part video per question, hero demo workspace | partial (whiteboard videos) | question completion, 4 timed assessments, certificate | (c) AlgoExpert LLC |
| Codeforces | blocked | n/a | n/a | n/a | n/a | robots disallows AI crawlers |
| AtCoder | free, contest platform, sponsored contests | free | Weekly rated contests with rating ladder by class (ABC/ARC/AGC) | n | rating, contest history | noai meta; not captured |
| CSES | free judge and course system | free | 400 curated tasks in 18 sections with solved/attempted counts | n | per-task status icons, section stats | not shown |
| Exercism | non-profit, donations | free | Language tracks with concept trees and human mentoring | n | track and concept progress | community content, per-repo |
| roadmap.sh | freemium: free roadmaps, Pro packs and AI tutor | not shown | Visual role/skill roadmaps with community progress counts (41k tracking DSA) | y (node-link roadmaps) | per-roadmap tracking, join | terms not read |
| Brilliant | subscription | not captured | Bite-size interactive visual lessons plus AI tutor | y (interactive visuals) | mastery dashboard, adaptive plan | commercial |
| Khan Academy (Computing) | non-profit, donations | free | Unit pages with Learn then Practice blocks and challenges | partial (videos, coding challenges) | practice sets with question counts, teacher tracking | mostly CC BY-NC-SA (not verified on page) |
| CS50 | free OCW + paid edX certificates | free; paid cert via edX | One-idea "Shorts" per algorithm with transcripts | partial (lecture video plus short concept clips) | problem set submission via edX | CC BY-NC-SA 4.0 (verified) |
| MIT OCW 6.006 | free, gifts | free | Full course kit: videos, notes, problem sets with solutions | n | none (self-paced) | CC BY-NC-SA per brief; badge on page |
| Udacity | subscription Nanodegrees | INR 5,250 to 6,300 per month; 35,999 one-time | Project-based DSA program with reviewed projects | n | project reviews, certificate | commercial |
| freeCodeCamp | non-profit, donations | free | Everything open logged out; sign in only to save; daily challenge | n | certificates, saved progress | open source; footer policies |
| HackerRank | blocked | n/a | n/a | n/a | n/a | n/a |

## Top 10 ideas for DSAMaxxing

1. **Start with a pattern map, not a list.** A dependency graph of patterns (roadmap.sh, NeetCode) where each node shows progress and "N learners here". Our own graph, our own order. (P0)
2. **Free to browse, sign in only to sync.** freeCodeCamp and takeUforward both gate only progress saving. Keep local-first progress and ask for an account after value is shown. (P0)
3. **One-idea animated shorts.** CS50's per-concept clips map straight onto our visualizer stories: one algorithm, one short, with captions, transcript and code beside it. (P0)
4. **Active recall between animation steps.** Brilliant-style tiny predict-the-next-step questions turn passive watching into practice; this is our visual-teaching edge. (P0)
5. **Pattern cards with a "use it when" line.** Educative's Grokking card shape (one-line blurb, intro, graded problems) is the clearest way to teach recognition. (P0)
6. **Progress that shows where you stand.** takeUforward's ring plus tier split plus topic fractions, and CSES's solved/attempted ratio as hidden difficulty. Colour scale red to green for mastery cells. (P1)
7. **Learn then Practice inside each topic**, with short challenge tasks (Khan Academy) such as "implement swap" before the full algorithm, and a capstone project at the end of a path (Udacity). (P1)
8. **A hero demo that works before signup.** AlgoExpert embeds a mini workspace; we embed a live algorithm animation. Pair with a program-page template (build list, skills, prerequisites, hours) for the paid path. (P1)
9. **Retention loops.** Daily challenge with archive (freeCodeCamp, GfG POTD), planner with re-plan after a missed day (TUF Planly), weekly contest cadence later (AtCoder). (P1)
10. **Pricing shape.** First lessons free everywhere; annual access with a visible struck price (AlgoExpert USD 59 vs 343, Educative 69% promo) and tiered AI-feature credits (Educative). Test lightly: urgency countdowns can feel pushy. (P2)

## Design notes worth reusing (our own tokens, not theirs)
- CSES: tiny CSS, verdict colours (green accept, red wrong, purple time-limit), 101-step red-to-green heat scale, four-tile pastel home grid.
- freeCodeCamp: dark navy ramp (`#0a0a23` to `#2a2a40`) with gold, blue and green accents, semantic foreground/background tokens for light and dark.
- Educative and Udacity: badge pills (New, Updated), level tags, "+N more" skill chips, collapsible pattern cards.
- Fonts across the set are mostly neutral sans (Lato, Source Sans, Poppins, Verdana); Geist and Inter-style UI fonts appear elsewhere in this research set.

## Licensing summary for a monetised site
- CS50 and MIT OCW are CC BY-NC-SA: facts and structure only, no copied prose, slides, problems or videos.
- Khan Academy content is mostly CC BY-NC-SA (not verified on the pages read); treat the same.
- All curated lists (A2Z sheet, Grokking patterns, CSES set) were taken for counts and topic structure only.
