# DSAMaxxing research

What this folder is for: research for turning dsaviz into **DSAMaxxing**. Each source was read live with the local **REA (Reverse Engineering Anything) MCP server** (`rea`), mainly with `capture_browser_scenario`. That tool drives Edge, captures the DOM and accessibility tree, and captures network bodies, which is how we got the live stylesheets. `inspect_web_page` was also used. Each guide was then reasoned from its REA extract. Date of all crawls: 2026-10-24.

## Rules we followed

- **Bot checks stop crawling.** If a site serves a bot check, CAPTCHA or rate limit, we stop and record the gap. We never route around it. prachub.com is the one case so far.
- **robots.txt is respected.** See [extracts/robots.md](extracts/robots.md). algosimplified's content signals allow reference use only and forbid AI training. GitHub disallows `/tree`, `/raw` and `/search`, so we read only repo roots and topic pages.
- **Login-only pages are skipped** and noted, never entered.
- **Copyright.**
  - Guides summarize in our own words. No prose, questions, answers, code or images were copied.
  - Problem names and links to the original problems are facts.
  - Curated lists are reference only: we record their size, topics and structure, plus about 10 example links. DSAMaxxing's sheet is our own selection, order and wording.
- **Licences decide reuse.** Only MIT, Apache-2.0, CC BY and CC0 material may be adapted, and only with credit (see [ATTRIBUTION.md](ATTRIBUTION.md)). Non-commercial (NC), no-derivatives (ND), share-alike (SA), unlicensed and custom-licence sources are facts-only.

## Index

| Bucket | Guide | Links log | REA extract | Status |
|---|---|---|---|---|
| Competitor | [algomaster.io](algomaster.md) | [links](links/algomaster.md) | [extracts/algomaster](extracts/algomaster/) | 25 pages |
| Competitor | [algosimplified.dev](algosimplified.md) | [links](links/algosimplified.md) | [extracts/algosimplified](extracts/algosimplified/) | 15 pages + 7 sheets |
| Competitor | [codolio.com](codolio.md) | [links](links/codolio.md) | [extracts/codolio](extracts/codolio/) | 18 pages |
| Competitor | [prachub.com](prachub.md) | [links](links/prachub.md) | [extracts/prachub](extracts/prachub/) | blocked by bot check: no data |
| GitHub, English | [github-en](github-en.md) | [links](links/github-en.md) | in guide | 32 repos |
| GitHub, Chinese | [github-cn](github-cn.md) | [links](links/github-cn.md) | in guide | 16 repos + 2 sites |
| Visual teaching | [VisuAlgo](platforms/visualgo.md) | [links](links/visualgo.md) | in guide | 6 pages |
| Visual teaching | [USFCA visualizations](platforms/usfca.md) | [links](links/usfca.md) | in guide | 9 pages |
| Visual teaching | [NeetCode](platforms/neetcode.md) | [links](links/neetcode.md) | in guide | 10 pages |
| Visual teaching | [ByteByteGo](platforms/bytebytego.md) | [links](links/bytebytego.md) | in guide | 9 pages |
| Course platforms | [Scaler](platforms/scaler.md), [InterviewBit](platforms/interviewbit.md), [Coursera](platforms/coursera.md), [CodeSignal](platforms/codesignal.md) | [scaler](links/scaler.md), [ib](links/interviewbit.md), [coursera](links/coursera.md), [codesignal](links/codesignal.md) | in guide | 37 pages |
| Our own look | [Gym Buddy visual language](gym-buddy-visual-language.md) | n/a | `mahikshith/workout` | done |

## dsaviz today

- 14 static pages bundled into one file, `dist/index.html`. React is used only for bundling, and there is no backend.
- A catalog of 58 problems across 16 patterns: Two Pointers, Sliding Window, Hash Map, Prefix Sum, Binary Search, Matrix, Intervals, Greedy, Stack, Heap, In-place Reversal, Fast & Slow, DFS, BFS, Backtracking and DP.
- 9 animated stories, covering 3 of those 16 patterns. Each pattern has a cast of companions, and Old Hoot is the mentor.
- Three explanation depths (kid, builder, expert) and five code languages.
- Pages: Library (learning path, by pattern, by company), Revisit (a spaced-review demo), Profile (heatmap, certificates), Leaderboard, Interview, Glossary and Basics.
- Progress lives in localStorage. Streak and league figures are demo data.

## Feature gap

✓ = has it, ◐ = partial or demo, ✗ = missing. "Us" is dsaviz today.

| Feature | Us | algomaster | algosimplified | codolio | NeetCode | VisuAlgo / USFCA | Plan |
|---|---|---|---|---|---|---|---|
| Animated, scrubbable step-through | ◐ (9 stories) | ✓ (647 animations) | ✗ | ✗ | ✗ | ✓ | More stories (PR 4+) |
| Story and characters per pattern | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | Our moat: keep it |
| Code panel with active-line highlight | ✓ | ✓ | ✗ | ✗ | ✗ | VisuAlgo pseudocode | Keep it |
| Input presets / custom input in visualizer | ✗ | ✓ | ✗ | ✗ | ✗ | ✓ | Add to the player |
| Speed control and keyboard transport | ◐ | ✓ | ✗ | ✗ | ✗ | ✓ | Add (Space, arrows, +/−) |
| Pattern-first master sheet with filters | ◐ (58) | ✓ (300) | ✓ (207 + more) | ✓ (company) | ✓ (150) | ✗ | Our own sheet (PR 3) |
| Company tags | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | Expand them |
| Favourites and revision stars | ◐ | ✓ | ✓ | ✓ | ✗ | ✗ | PR 3 |
| Random unsolved pick | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | PR 3 |
| Daily challenge, seeded by date | ◐ (demo) | ✗ | ✓ (stale) | ✗ | ✗ | ✗ | PR 2/3 |
| Spaced-repetition revisit queue | ◐ (demo) | ✗ | ✗ | ✓ | ✗ | ✗ | Make it real, local |
| Streak, heatmap, XP | ◐ (demo) | ✓ | ✗ | ✓ | ✓ | ✗ | Real localStorage data |
| Progress export/import | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Add (no rival has it) |
| Pattern roadmap graph | ◐ (8-stage path) | ✓ | ✗ | ✗ | ✓ | ✗ | Rings on the path |
| System design track | ✗ | ✓ | ✓ (HLD sheet, links broken) | ✗ | ◐ | ✗ | Later, seeded from CC BY primer |
| LLD / concurrency | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | Later |
| AI/ML track | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Later (MIT/Apache sources) |
| Mock interview / timer | ◐ | ✓ | ✗ | ✗ | ✓ (Versus) | ✗ | Local timer and rubric |
| Shareable stats card | ◐ (copy text) | ✗ | ✗ | ✓ | ✗ | ✗ | Client-rendered PNG |
| Link and count integrity checks | ✗ | n/a | ✗ (broken) | n/a | n/a | n/a | Build-time test |

## What DSAMaxxing takes, in order

1. **Rebrand and theme (PR 1, open):** the Max theme, Anton/Outfit type and the new wordmark.
2. **Components (PR 2):**
   - A floating pill nav: Patterns · Sheet · Visualizers · System design · AI/ML · Interview.
   - Stat tiles, progress rings and a metal medal shelf, from the Gym Buddy language.
   - A live mini visualizer on the home page.
   - A real local streak and heatmap.
3. **Master sheet (PR 3):**
   - Our own curation, with problem names linking to the original problems.
   - Grouped by our 16+ patterns in our own order.
   - Filters for difficulty, pattern, company, status and revision star, plus a random unsolved pick and a date-seeded daily challenge.
   - One versioned progress store with export/import.
   - A build test that fails on empty or placeholder links and on wrong counts.
4. **Stories (PR 4+):**
   - Animated stories for the 13 patterns that have none, written by parallel subagents in `src/story/scenes_*.js` style.
   - Five languages each, and `scenecheck` must pass.
   - The player gains input presets, speed control and keyboard transport.
5. **System design:** the 4-step method, back-of-envelope sheets and per-topic pages, adapted from system-design-primer (CC BY 4.0, credited). Diagrams are our own.
6. **AI/ML:** lesson layout ideas from ML-For-Beginners (MIT), a backprop visualizer modelled on micrograd (MIT), and a roadmap shape from llm-course (Apache-2.0).
7. **Interview:** a local mock timer with a self-score rubric, and our own behavioural and LLD prompts.

## Top findings

1. Only VisuAlgo, USFCA and algomaster have step-through visualizers, and none of them tells a story. Animated stories with a cast are our clear moat, so more stories is the highest-value work.
2. Progress everywhere is either local-only with no export (algosimplified) or behind a login (algomaster, codolio). A local-first versioned store with export/import beats both, with no backend.
3. Most rival sheets have quality bugs: broken links, placeholder links and counts that contradict the data. Integrity tests in our build would be a quiet advantage.
4. The best-known "free" learning sources (hello-algo, labuladong, leetcode-patterns, ByteByteGo's repo) are non-commercial or unlicensed, so facts-only for a monetized site. The permissive ones (NeetCode's repo, tech-interview-handbook, system-design-primer, algorithm-visualizer, ML-For-Beginners, llm-course) can seed structure with credit.
5. Pricing anchors: algomaster Rs 2,999/mo to Rs 14,999 lifetime; codolio Rs 849–1,499; NeetCode Pro $119/yr or $297 lifetime. dsaviz's current Rs 299/mo or Rs 1,999/yr is well under all of them.
