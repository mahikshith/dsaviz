# AtCoder (atcoder.jp) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt: `*` disallows `/contests/*/standings/`, `/contests/*/submissions/`, `/contests/*/clarifications/`, `/submissions/`, `/servertime/`, `/users/*/history/`; Bingbot crawl-delay 30; Google-Extended and Applebot-Extended disallowed entirely. The page also sets `<meta name="robots" content="noai, noimageai">`. Because of that AI opt-out, the crawl was limited to **2 public pages** (`/?lang=en`, `/contests/archive?lang=en`) and only site-level facts (structure, naming, counts) were noted. No problem statements, editorials or user data were collected. No bot check, no login.

## Summary and business model
- Japanese competitive-programming contest site run by AtCoder Inc. (company page linked). Weekly rated contests for beginners to experts, plus long-running heuristic (optimisation) contests and sponsored contests. Revenue is not shown on captured pages; the archive filters include "sponsored" contest categories, which hints at company sponsorship.
- Free to read; login for participation (Sign Up / Sign In buttons, not used).

## Sitemap / URL patterns
- `/` home (English with `?lang=en`), `/contests/` , `/contests/archive`, `/contests/<id>` (examples: abc481, arc233, agc079, ahc073, practice, practice2), `/ranking`, `/hof`, `/faq`, `/posts/<n>` (announcements), `/company`, `/contact`, `/login`, `/home`, `/personal`.
- Contest id prefixes: ABC (beginner), ARC (regular), AGC (grand), AHC (heuristic), plus special series.

## Features and how they work
- **Home**: panels for Permanent Contests (a "first-time users" practice contest and a library practice contest), Upcoming Contests, Recent Contests, Daily Contests (weekday contests), Ranking: Algorithm, Ranking: Heuristic, announcements. Each contest row shows start time, a rated-range symbol and the name.
- **Archive page**: filters for Rated Range (ABC class rated up to ~1999, ARC up to ~2799, AGC up to ~9999, AHC), Category (weekday, unofficial, sponsored tournaments, sponsored parallel rated/unrated, sponsored ABC/ARC, heuristic, sponsored heuristic), contest-name search, paginated list.
- Rating ladder shown as a top-N leaderboard with ratings (top rating about 3,730).

## Content coverage (counts)
- Home lists 13 contests in the current window (7 upcoming, 5 recent, 1 daily). Archive paginates (page numbers up to 19 visible at least). Ratings and user counts beyond the leaderboard not captured.

## Design language
- Stylesheets (served from `img.atcoder.jp/public/<build>/css/`): Bootstrap 3 (`bootstrap.min.css`), `base.css`, KaTeX for math, code-prettify for highlighting.
- Look: plain Bootstrap tables and panels, small coloured rating symbols, time-zone links to timeanddate. Utilitarian; no custom animations seen.

## License / terms
Not captured. Treat content as copyrighted; the site explicitly signals "noai". Facts only.

## Adopt for DSAMaxxing
**P1**
- Rated-range labelling on a problem or path ("good for 400-800 level") as a lightweight difficulty ladder.
**P2**
- Weekly cadence of a short contest as an engagement loop later; "first-time user practice contest" as an onboarding lane.
