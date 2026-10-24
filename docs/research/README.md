# DSAMaxxing research

What this folder is for: research for turning dsaviz into **DSAMaxxing**. Each source was read live with the local **REA (Reverse Engineering Anything) MCP server** (`rea`), mainly with `capture_browser_scenario`. That tool drives Edge, captures the DOM and accessibility tree, and captures network bodies, which is how we got the live stylesheets. `inspect_web_page` was also used. Each guide was then reasoned from its REA extract. Date of all crawls: 2026-10-24.

## Rules we followed

- **Bot checks stop crawling.** If a site serves a bot check, CAPTCHA or rate limit, we stop and record the gap. We never route around it. Blocked so far: prachub.com, LeetCode, HackerRank, Codeforces, OpenAI blog, OpenReview.
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
| More DSA platforms | [summary: platforms-more](platforms-more.md), plus 17 guides in `platforms/` | `links/<site>.md` | in guides | 14 crawled; LeetCode, HackerRank and Codeforces blocked |
| System design (HLD/LLD) | [system-design](system-design.md) | [links](links/system-design.md) | in guide | 22 pages |
| ML & data science | [ml-data-science](ml-data-science.md) | [links](links/ml-data-science.md) | in guide | 15 sources |
| AI now | [ai-now](ai-now.md) | [links](links/ai-now.md) | in guide | 60 primary sources |
| Skills | skills.md on branch `dsamaxxing/skills` | n/a | n/a | 8 installed, 2 rejected |
| Visual teaching | [Git visualizer (algomaster.io)](git-visualizer.md) | [links](links/git-visualizer.md) | in guide | 7 pages |
| Our own look | [Gym Buddy visual language](gym-buddy-visual-language.md) | n/a | `mahikshith/workout` | done |

## dsaviz today

- 14 static pages bundled into one file, `dist/index.html`. React is used only for bundling, and there is no backend.
- A catalog of 58 problems across 16 patterns: Two Pointers, Sliding Window, Hash Map, Prefix Sum, Binary Search, Matrix, Intervals, Greedy, Stack, Heap, In-place Reversal, Fast & Slow, DFS, BFS, Backtracking and DP.
- 9 animated stories, covering 3 of those 16 patterns. Each pattern has a cast of companions, and Old Hoot is the mentor.
- Three explanation depths (kid, builder, expert) and five code languages.
- Pages: Library (learning path, by pattern, by company), Revisit (a spaced-review demo), Profile (heatmap, certificates), Leaderboard, Interview, Glossary and Basics.
- Progress lives in localStorage. Streak and league figures are demo data.

## Feature parity checklist

Owner decisions (2026-10-24):
- No video lessons and no text-to-speech: visual stories only.
- Prefer integrating free, permissively licensed open-source projects over building from scratch. The site will be monetized, so licences must allow commercial use.
- Features that need a backend (leaderboard, accounts, cross-device sync) use demo data until a real backend is built after the rest is done.
- Problem count matters to beginners, so grow the sheet to 500+ quality problems.

Every feature seen on any researched site, who has it, and where DSAMaxxing stands. **Have** means we already do it; **Better** means we do it better than any rival seen; **Building** means an open PR does it; **Planned** means it's queued with a PR name. Every missing item has a plan.

### Learn: explanations and visuals

| Feature | Who has it | DSAMaxxing | PR |
|---|---|---|---|
| Animated, scrubbable step-through per problem | algomaster (647), VisuAlgo, USFCA | **Better**: 25 stories with a cast, code-line sync and a watch panel; more coming | #3 #4 #5, `stories-grid` |
| Story or characters per pattern | nobody | **Better** (unique) | n/a |
| Pseudocode/code panel synced to the step | VisuAlgo, algomaster | **Have**, in 5 languages | n/a |
| Grid/matrix and DP-table visuals | VisuAlgo, USFCA | **Building** | `stories-grid` |
| Tree and graph visuals (DFS/BFS/backtracking trees) | VisuAlgo, USFCA, hello-algo | **Planned** | `stories-tree` |
| Custom input and input presets in the visualizer | VisuAlgo, USFCA, algomaster | **Planned** | `player-input` |
| Speed control and keyboard transport | VisuAlgo, USFCA | **Building** (one-page player) | `problem-page` |
| One-page problem view (statement, example, animation, code) | LeetCode, NeetCode, algomaster | **Building** | `problem-page` |
| Plain one-level explanation with a "go deeper" fold | Brilliant, CS50 Shorts | **Building** (replaces the Kid/Builder/Expert switch) | `problem-page` |
| Predict-the-next-step questions | Brilliant, VisuAlgo e-lecture quiz | **Have** (predict mode) | n/a |
| Concept lessons before problems | algomaster, Educative, Scaler, hello-algo | **Partial** (Basics, Glossary) | `pattern-intros` |
| "Use it when" card per pattern | Educative Grokking, NeetCode | **Planned** | `pattern-intros` |
| Video lessons | NeetCode, AlgoExpert, CS50, takeUforward | **Out of scope** (owner decision): visual stories only | n/a |
| Text-to-speech narration | algomaster (tts keyframes) | **Out of scope** (owner decision) | n/a |

### Practise: problems and code

| Feature | Who has it | DSAMaxxing | PR |
|---|---|---|---|
| In-browser editor | LeetCode, NeetCode, algomaster, CodeSignal, AlgoExpert | **Building**: CodeMirror 6 | #8 |
| Run and submit against hidden tests | LeetCode, NeetCode, CSES, InterviewBit | **Building**: JS and Python run in the browser; tests for 9 problems | #8, then `tests-all` |
| Java/C++/Go execution | LeetCode, HackerRank | **Planned** (WASM toolchains or Judge0-style API later) | `runner-more-langs` |
| Test specs for every animated problem | LeetCode | **Planned** | `tests-all` |
| Master sheet with pattern groups and filters | algomaster, algosimplified, NeetCode, takeUforward, codolio | **Building**: 216 problems now, growing to 500+ (our own curation) | #6, `sheet-500` |
| Company tags and filter | algomaster, codolio, InterviewBit, LeetCode | **Have** (catalog), on the sheet | #6 |
| Random unsolved pick | algomaster, algosimplified | **Building** | #6 |
| Daily challenge or problem of the day | algosimplified, GfG, freeCodeCamp, LeetCode | **Building** ("Today's 5") | #6 |
| Revision stars and favourites | algomaster, algosimplified, codolio | **Building** | #6 |
| Spaced-repetition revisit queue | codolio | **Partial** (demo Revisit page) | `revisit-real` |
| Notes per problem | codolio, LeetCode | **Planned** | `notes` |
| Mock interview timer and self-score rubric | algomaster, NeetCode Versus, Hello Interview | **Partial** (Interview page) | `interview-mock` |
| Contest calendar | codolio, AtCoder | **Planned** (static list) | `contests` |
| SQL and concurrency tracks | algomaster, algosimplified | **Planned** (later) | n/a |

### Progress and motivation

| Feature | Who has it | DSAMaxxing | PR |
|---|---|---|---|
| Local-first progress, no login needed | algosimplified, freeCodeCamp, NeetCode (logged out) | **Have** | n/a |
| Progress export and import | nobody seen | **Better** (unique) | #6 |
| Streak and heatmap from real activity | codolio, NeetCode, takeUforward, InterviewBit | **Partial** (demo data) | `progress-real` |
| Progress rings per pattern and tier | takeUforward, NeetCode, InterviewBit | **Building** (sheet), more planned | #6, `components` |
| Medals and badges | InterviewBit, Gym Buddy (ours) | **Partial** (certificates) | `components` |
| XP toasts and celebrations | algomaster, prachub | **Partial** | `components` |
| Shareable stats card (image) | codolio | **Partial** (copy text) | `share-card` |
| Leaderboard | algomaster, codolio, InterviewBit | **Partial** (demo; real needs a backend) | `backend` (later) |
| Roadmap or dependency graph | roadmap.sh, NeetCode, algomaster | **Partial** (8-stage path) | `pattern-map` |

### Sections beyond DSA

| Feature | Who has it | DSAMaxxing | PR |
|---|---|---|---|
| System design (HLD) course | ByteByteGo, Hello Interview, Design Gurus, algomaster | **Planned**, seeded from system-design-primer (CC BY) | `sd-hld` |
| LLD and design patterns | refactoring.guru, algomaster, Design Gurus | **Planned**, seeded from kousiknath/LowLevelDesign (MIT) and our own words | `sd-lld` |
| ML & data science | Kaggle Learn, fast.ai, Google MLCC, d2l | **Planned**, seeded from Google MLCC (CC BY) and the HF course (Apache-2.0) | `ml-track` |
| AI now (reasoning, JEPA, agents, RAG, MoE…) | nobody in one place | **Planned**: unique | `ai-now` |
| Git, visual and one-screen | algomaster | **Building** | `git-visual` |

### Platform

| Feature | Who has it | DSAMaxxing | PR |
|---|---|---|---|
| Mobile-friendly layout | most | **Partial** (scaled 1440 layout) | `mobile` |
| Mobile app | algomaster, NeetCode | **Not planned** (a PWA later) | `pwa` |
| Theme choice | algomaster, CodeSignal | **Better** (Max, Light, Dark, Terminal) | #1 |
| Search across the site | algosimplified, GfG | **Partial** (library search) | `search` |
| AI tutor or hints | Scaler, Educative, CodeSignal, NeetBot | **Partial** (3 hints per problem); AI later | `ai-tutor` (later) |
| Link and count integrity tests | nobody | **Better** | #6 |
| Accessibility passes | rarely visible | **Have** (each UI PR runs one) | ongoing |

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
