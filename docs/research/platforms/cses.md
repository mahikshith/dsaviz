# CSES Problem Set (cses.fi) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24. Main stylesheet `/cses.css?1` also captured (DOM view of the raw file).
- robots.txt: not present (the path returned the site's own 404 page). No bot check, no login (Login link seen, not used).
- Pages: `/`, `/problemset/`, and the stylesheet.

## Summary and business model
- Free judge and course system (the Code Submission Evaluation System), Finnish-language content appears alongside English. Home panels: CSES Problem Set (algorithm practice), a Finnish olympiad-prep collection, the CSES Blog, "CSES for Teachers" (teachers create courses and track student progress), and archive collections for the Baltic and Central European olympiads (2005 to 2021). No ads, no prices, no premium tier seen. Nav: Home, Courses, Contests, Statistics, About; a dark-mode link.

## Sitemap / URL patterns
- `/problemset/` (list), `/problemset/task/<id>` (e.g. 1068, 1069), `/problemset/stats/`, `/problemset/list`, `/login`, `/darkmode`, `/courses`, `/contests`.

## Features and how they work
- **Problem list**: every task is a row with name and a count "solved / attempted" next to it (e.g. 182369 / 190414 for the most solved task) so you can read the difficulty from the ratio. After login the row shows a status icon (full, partial, zero, skipped, pending, compile error) in coloured score cells.
- **Task page** (not read): statement, constraints strip, sample cases with view/save/copy actions.
- **Stats page**; **courses** with teachers; contests.

## Content coverage (counts)
- 400 problems in 18 sections (measured from the list): Introductory 24, Sorting and Searching 35, Dynamic Programming 23, Graph Algorithms 36, Range Queries 25, Tree Algorithms 16, Mathematics 37, String Algorithms 21, Geometry 16, Advanced Techniques 25, Sliding Window 11, Interactive 6, Bitwise Operations 11, Construction 8, Advanced Graph 28, Counting 18, Additional Problems I 30, Additional Problems II 30. A "General" block holds intro, account and statistics links.
- The most-solved task has about 182k solvers; typical hard tasks fall under 10k.

## Design language
- Extremely lightweight CSS (about 21 kB). Font: Verdana with sans-serif fallback; code in monospace 14px.
- Palette: header `#292929` with white text; page white with black text; link blue `#009`; hover grey `#ebebeb`; orange focus ring `#ff9b30`.
- Home panels are four tinted tiles in a 2x2 grid: `#8EF39A` green, `#94B5EC` blue, `#FFD996` orange, `#FF9B96` red, each with a soft shadow and a black bottom-rule heading.
- Verdict colours: AC `#8ee98e`, WA `#e98e8e`, TLE `#c78ee9`, RTE `#e9ae8e`, MLE `#e9e58e`; score cells full `#7cf07c`, partial `#f0f07c`, zero `#f07c7c`, pending `#9a9ef2`.
- Notable: a 101-step red-to-green background gradient class set (`c0` to `c100`, from `#f07c7c` through yellow to `#7cf07c`) used for percent-coloured cells.
- Task list rows: 1.6 line height, grey hairline separators, hover tint, icon in a 44px left gutter. Icons: Font Awesome 5 plus a custom "Iconses" font.
- Motion: only `transition: box-shadow 0.4s` on inputs.

## License / terms
Not shown on captured pages.

## Adopt for DSAMaxxing
**P0**
- Show social proof on each problem row as "solved / attempted" (we can start with our own aggregate counts) so difficulty is visible without a label.
**P1**
- Percent-to-colour gradient (red to green) for mastery cells in the progress map.
- Tiny ordered section lists (18 sections) as a model for a flat, scannable pattern index.
**P2**
- "For Teachers" classroom mode with progress tracking per student.
