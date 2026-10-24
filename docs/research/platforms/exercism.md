# Exercism (exercism.org) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt: `*` allows `/` but disallows `/users/`, `/*/users/`, `/adverts/`; sitemap at `/sitemap.xml`. No bot check, no login (Sign up / Log in seen, not used).
- Pages: `/` and `/tracks`. Stylesheets identified (`assets.exercism.org/assets/website-*.css`, `application-*.css`) but not captured.

## Summary and business model
- Non-profit practice platform: "Get really good at programming." Free exercises in many languages with optional human mentoring ("Deepen your knowledge with human mentoring, for free"). Revenue is donation-led: a Donate link, an "Insiders" thank-you programme for donors, partner "Perks" offers page, and sponsor/advert pages (an `/adverts/` path is blocked in robots).
- A separate beginners product, **Jiki**, is advertised in a top banner ("Learn to code and build in the LLM-era").

## Sitemap / URL patterns
- `/tracks` (all languages), `/tracks/<lang>` and exercises under a track, `/mentoring`, `/docs`, `/contributing`, `/donate`, `/insiders`, `/impact`, `/hu`-style locale prefixes (paths like `/de`, `/hu`).
- Journey menu: "Your Journey", "Your Favorites"; Discover menu: Perks, Community Videos, Brief Introduction Series, Interviews and Stories, Discord, Forum.

## Features and how they work
- **Tracks page**: "85 languages for you to master" with faceted filters (Paradigm, Typing, Execution mode, Platform, Runtime, Used for) and a card per language. Each card shows "Learning Mode" tag, number of exercises, number of concepts, and paradigm chips (e.g. a Python card: 146 exercises, 17 concepts, imperative, object-oriented, functional).
- **Three ways to work** (home): write code locally with the CLI, use the in-browser editor, or get automated analysis on your code.
- **Mentoring**: pitched through four benefits (you do not know what you do not know, learn language conventions, learning with others is fun, plus general why).
- Track cards carry a "Learning Mode" tag and a concepts count, hinting at a concept tree per language (not opened).
- Many UI locales (about 40 listed, a subset marked "coming soon"), including right-to-left Arabic, Persian, Hebrew, Urdu.

## Content coverage (counts)
- 85 languages, "over 8,763 coding exercises" (sample titles "Allergies", "Queen Attack", "Zebra Puzzle"). Banner mentions 65+ languages in a menu blurb (menu and hero numbers differ).
- Not DSA-specific; useful as a model for tracks, concepts and mentorship.

## Design language
- Font stack: Poppins (loaded as a custom `PoppinsInitial` font face with preloaded woff2 files) for headings and UI.
- Components: mega-menu nav, language cards with chips, faceted filter bar, locale picker with direction awareness, tag pills ("Learning Mode", "New").
- Palette and motion not extracted (CSS not captured).

## License / terms
Not captured on these pages. Exercism content is community-contributed; check each track's repository licence before reuse.

## Adopt for DSAMaxxing
**P1**
- Track cards that show "N exercises, N concepts" and a mode tag, with faceted filters (by technique, difficulty, language).
- Concept map per track with "learn" and "practice" modes separate.
**P2**
- Optional peer or human review (mentoring) as a later paid or volunteer feature; donation or "Insiders" style supporter tier for non-core revenue.
