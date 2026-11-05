# Scaler (scaler.com) - live check (2026-11-01)

Method. robots.txt honoured: it disallows /profile, /event/*, /careers/, sign-up and password pages, and `/topics/*?` (any query string under /topics/), /topics/page/*, /topics/category/*. I only requested clean URLs without queries. One note: the lesson and challenge URLs under /topics/course/... redirected server-side to `...?event=signup_event` (a sign-up gate). That landing URL matches the query disallow pattern; I made no further requests to it beyond the single redirect each time (3 loads in total, 2 of them from computed-style probes) and used no query URLs on purpose.
No bot check or CAPTCHA was seen on any page. No login, no forms, no sign-up.
Screenshots: REA `capture_browser_scenario` (Edge, 1440x900 and 390x844). Computed styles read via headless Edge CDP (REA has no JS-eval action). Private reference only, `screenshots/scaler/`.
Pages loaded (about 12): scaler.com/, /topics/, /topics/data-structures/ (hub), /topics/data-structures/array-data-structure/ (article), /topics/course/dsa-beginners-java/ (free course page), its lesson video URL /video/724/ and challenge URL /challenge/386983/ (both redirected to the sign-up gate), /topics/challenges/, /topics/java/online-java-compiler/ (public IDE), /topics/courses/, /topics/tools/, /academy/.

## What Scaler is
scaler.com is a lead-generation marketing site for paid programmes (Academy: Software and AI Engineering, Data Science, AI/ML, DevOps, Neovarsity, AI FDE, IITR degree). The free learning product is "Scaler Topics" at /topics/ (articles, free video courses, challenges, tools). Lessons and practice problems for the free DSA course are behind sign-up.

## Navigation
- Two-row desktop header, total 88px: dark navy strip (32px) with Scaler programme links (Academy, Data Science, AI/ML, DevOps, Neovarsity, AI FDE Program, IITR Degree Program); main row (56px) with Scaler Topics logo tile, Topics, Explore, Skill Test (with orange "New" tag), Courses, Free Masterclass (all dropdowns), search field (224x32), Sign In (outline) and Experience Scaler (filled blue).
- Marketing /academy/ has its own sticky 65px nav: Program, Masterclass, Alumni, Resources, Login, Placement Report; large dark hero.
- Mobile (390): logo, "Experience SCALER" pill, hamburger. Header about 43px.
- Footer: very tall (about 1000px at 1440, 1953px at 390): programme links, tools, compilers, topics.

## Sidebar
- No persistent course sidebar on any public page. The curriculum is an inline accordion on the course page and hub page: each module is a 60px-high header (icon tile, "MODULE 1" label with 2.08px tracking, module title 20px, duration and chevron), rows under it are lesson lines with a 16px icon, title and minutes.
- Article page: single centred column (640px) with a right rail at x about 1008 (a thin border line, empty for this article), floating "Explore with AI" pill bottom right. A "Topics Covered" collapsible sits under the byline.
- Course and hub pages: right sticky card (312px, x 1038..1350) with Start Learning, "Certificate Included", feature list, module count and hours.

## Content width
- Site container 1260px (x 90..1350) on hub and course pages; main column 844px (x 90..934), gap about 104px to the 312px right card.
- Article column 640px (x 184..824); article h2 blocks and cards inside are 608-640px.
- Compiler/IDE page: full width.
- Tools/challenge grid: 3 columns of about 409px cards, gap about 16px, inside the 1260 container.

## Clicks (by link inspection)
- Home (/topics/) to the free DSA course page: 1-2 clicks (Courses card, or Courses menu). To the first lesson: "Start Learning" (2nd click) leads to the sign-up gate; the lesson was NOT reachable logged out.
- A readable public lesson: Topics menu to Data Structures hub (2), then an article (3).
- To a problem: challenge URLs also gate to sign-up; the only public practice-like page is the online compiler (Explore/Tools menu to compiler, 3 clicks) or the /topics/challenges/ list of cards (no problem detail public).

## Problem / IDE page (public part)
- Online compiler at /topics/java/online-java-compiler/: toolbar row (breadcrumb, "Start Java Course" outline button right), language dropdown "Java 8", fullscreen, save, More, Run (crimson). Below, split: editor 864px (60%) + right column 568px (40%) with two stacked panes "Custom Output" and "Custom Input" each about 345px (50/50), dotted drag grips. Editor dark navy (rgb about 0,20,45), file tab "index-1" with unsaved dot and "+" button, minimap.
- Below the IDE: a long SEO explainer article (h1 32px, h2 24px, text 18/28).
- Mobile: editor full width, Run as a full-width 40px sticky bar at the bottom, output panes pushed below.
- No tabs, hints, solutions or test cases on any public page. Hint/solution reveal mechanics: not observable (gated).

## Progress display
- Hub page: 16px circular progress marks per module row (empty outline logged out). Course card: star rating "4.95", "Enrolled: 57405", Free tag. Course page stats strip: Duration (9h 7m, 12 modules), Challenges (7), Course Level, Certificate. No percent or bar logged out.

## Type sizes (px, 1440)
| Role | Size / weight / line-height |
|---|---|
| Body | 16 / 400 / 22.4 (hub intro paragraphs 24 line-height), Source Sans Pro, colour rgb(97,115,142) |
| Article body | 18 / 400 / 28 |
| Article h1 | 32 / 600 / 48 (hub h1 40 / 600 / 56) |
| Article h2 | 24 / 600 / 36, with a 4px crimson left rule |
| Article h3 / h4 | 20 / 600 / 32 ; 18 / 600 |
| Course title | 32 / 600 / 48, subtitle 18 / 400 / 28 |
| Module label | 16, letter-spacing 2.08px, uppercase |
| Small labels | 14 (tags, Free tag 14/400 green) |
| Code | monospace 16, light-on-dark rgb(186,198,216) |
At 390 the root scales to 0.9 (body 14.4, h1 28.8, h2 21.6, article text 16.2).

## Spacing
- h2/h3 margin-bottom 16 in articles (10 on course page); paragraphs margin-bottom 16 (articles) or 10; h4 margin-top 8; about-section heading margin-top 32, bottom 8.
- Hub module cards 724x60+ header, rows about 40px; course stats card 114..910 inside a 90..934 grey panel with 24px inner padding; challenge cards 409x152, inner padding about 16, thumb 120x120.
- Primary CTA button 327x38, radius 8, bg rgb(0,91,179), text 16.

## Colours and states
- Text navy rgb(26,44,71); body grey-blue rgb(97,115,142); primary blue rgb(0,91,179); accent crimson (article h2 rule, "Run"); Free = green rgb(0,154,42); "Intermediate" level in navy 600. Pale blue-grey page bands rgb(250,251,252).
- Done / active / locked states: not visible (no logged-in state). Sign-up gate is the lock. No easy/medium/hard colours on public pages (challenge cards show "Article" and "No. of Questions: 3" only).
- Hub tabs: "Reading Track", "Video Courses", "Articles" as three 280x56 cards; active has white fill and shadow, inactive grey with border.

## Empty states
- None found. Search box placeholder "Search for Articles, Topics".

## Not reached
- Free-course lesson pages, challenge/problem pages, tests, certificates, progress, saved bookmarks (all behind sign-up). Hints/solutions/test cases. Sidebar done/locked styling. Scaler Academy's student product (login only). Mobile menu drawer was not opened.
