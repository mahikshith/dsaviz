# roadmap.sh - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt: `*` allowed except `/og/`, `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/verify-*`, `/account`, `/dashboard`, `/feed`, `/ask`, `/teams/`. No bot check. No login. A cookie-consent dialog (OneTrust) was present in the DOM; it was neither accepted nor changed.
- Pages: `/` and `/datastructures-and-algorithms`. The roadmap diagram itself is an interactive SVG/canvas, so its node labels did not come through the DOM text capture; only the page chrome and stats did.

## Summary and business model
- Community-made developer roadmaps (role-based, skill-based, best-practices), now also AI Tutor, lesson "Packs" (Pro), project ideas, guides and newsletters. Headline claims: 6th most starred project on GitHub, 370K stars, 3.2M+ registered users, 52K Discord members.
- Freemium: roadmaps are free to read; "Upgrade" / "Go Pro" unlocks lesson packs (each starts with free lessons), AI tutor limits and progress features. A "Sign up free" prompt tracks progress. Price not shown on captured pages.

## Sitemap / URL patterns
- `/<roadmap-slug>` (e.g. `/datastructures-and-algorithms`, `/computer-science`, `/leetcode`, `/system-design`), `/packs` and `/packs/<pack>` (e.g. git, html, css), `/<roadmap>/projects` (e.g. backend, frontend), `/guides`, `/newsletters`, `/teams/...` (auth only).

## Features and how they work
- **Roadmap page** (Data Structures and Algorithms, subtitle "step by step guide to learn ... in 2026"): action bar with Roadmap / AI Tutor tabs, Personalize, Join, Download, and a counter "41,396+ others tracking their progress on this roadmap". The node graph itself was not readable in the capture.
- **Home**: three tiers of cards - Role-based (31), Skill-based (60), Best Practices (5) - then Lesson Packs (new: Git, Internet, HTML, CSS, JavaScript, CLI apps with Node, Linux, Docker, APIs, RegEx, several marked "Coming soon") and a Guides feed (articles, interview-question lists with quizzes).
- **Search**: Ctrl-K palette "Search roadmaps or learn anything with AI".
- **Social proof band**: GitHub stars, registered users, Discord members, monthly growth numbers.

## Content coverage (counts)
- 31 role-based roadmaps, 60 skill-based roadmaps (including Data Structures and Algorithms, LeetCode, Computer Science, System Design), 5 best-practices lists, 10 lesson packs (7 of them "coming soon"), plus guides such as merge sort and linked lists vs lists.

## Design language
- Utility CSS with the system UI font stack (no custom webfont seen). "New" pills, a tab bar on roadmap pages, card grids on the home page.
- Colours and motion not extracted (hashed bundles `root-*.css`, `index-*.css` not captured).

## License / terms
Not captured on these pages. Roadmap content is community-created; read the repo's licence and the site's Terms before reuse. Facts only here.

## Adopt for DSAMaxxing
**P0**
- A visual learning-path map (nodes linked by dependencies) as the main hub, with "N learners tracking this" social proof. Matches the NeetCode roadmap finding in this research set.
**P1**
- Ctrl-K command palette to jump to any pattern or problem.
- Join / Personalize actions on the path: save progress locally first, ask for sign-up only after value is shown.
**P2**
- "Packs" idea: a small paid lesson bundle per topic with free first lessons.
