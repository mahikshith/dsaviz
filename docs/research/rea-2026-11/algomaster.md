# AlgoMaster.io - live re-check (2026-11-01)

Method. robots.txt checked first: it only disallows named scraper bots (PiplBot, TurnitinBot, PetalBot, MoodleBot, magpie-crawler, ImagesiftBot); generic agents are allowed. Pages were loaded logged out, no forms, no login. No bot check or CAPTCHA appeared on any page (checked page text and title for challenge wording on every load).
Screenshots: REA `capture_browser_scenario` (Edge, launch mode, 1440x900 and 390x844). REA has no JS-evaluate action, so computed styles (px values below) were read with a separate headless Edge over CDP (`getComputedStyle`, `getBoundingClientRect`). All numbers are measured, not guessed. Screenshots are private reference only (`screenshots/algomaster/`).
Pages loaded: /, /learn/dsa/course-introduction, /learn/dsa/two-pointers-introduction, /practice/dsa-patterns, /practice/dsa/trapping-rain-water?list=am-300, /courses (about 7 pages, 1440 and 390). Earlier research (`../algomaster.md`) re-confirmed where noted.

## Navigation
- Top banner (28px, green, dismissible promo). Header 57px: logo, then dropdown buttons Learn, Practice, Interview, Resources, Newsletter, a phone-app icon; right side Premium (outlined green), search button with "F" shortcut chip, theme toggle, streak counter (flame + 0), Login (filled green).
- Footer mega-list in 4 columns of links (courses, practice, tools, company).
- Mobile (390): header collapses to logo, search, streak, login icon, hamburger. Header 49px.

## Sidebar
- Lesson pages only: left course sidebar 320px wide (x 8..328) with a 6px drag handle and collapse chevron. Content: "Back to Home", course title (17px/700), `0%` big percent + Certificate badge + `0/771` counter + thin progress bar, search box "Search chapters..." plus a filter button, then 31 collapsible sections, each a 40px-tall button: icon, name 14px/600, `done/total` counter (13px, muted), chevron. Section items 36px tall rows, 2px gap, 13px text, 8px padding, small 20px status icon at left.
- Within a section, items are grouped by sub-label (e.g. "Opposite Direction", green 14px) with code-icon problem rows.
- Right rail on lesson pages (256px, x 1134): a Premium promo card, then "Reading Progress 0%" bar and "On this page" TOC with an active green bar.
- Problem page and pattern sheet have no course sidebar.

## Content width
- Lesson: prose column 691px wide box (inner text 641px at 18px), between 320px sidebar and 256px right rail. Site CSS variable `--reading-max-width: 56rem` (896px) caps it when rails are hidden.
- Problem page: full viewport, site chrome hidden (fixed full-screen overlay, z-index 9999).
- Pattern sheet: `container max-w-6xl` = 1152px, centred (1440 viewport: x 139..1291).
- Landing and courses: `container` max 1400px, 16px/24px side padding.

## Clicks (counted by link inspection; pages reached by URL)
- Home to a lesson: 1 click (hero course card "Data Structures and Algorithms" goes to /learn/dsa, which renders the first chapter with the sidebar). To a specific concept chapter: 2.
- Home to a problem: 3 (Practice menu, DSA Problems, then a table row) - or 2 from inside a lesson via the sidebar's problem rows.

## Problem page
- Layout at 1440: two panes, left 648px (45%), 1px divider, right 791px (55%). Right pane splits vertically: editor 501px (65%) over a test panel 270px (35%), 1px divider. Resizable (handles show a dotted grip).
- Top bar (49px): logo, list-menu icon, problem-set dropdown ("AlgoMaster 300"), prev/next arrows with the neighbouring problem names, shuffle, AlgoChat (AI), timer `00:00`, theme, fullscreen, close.
- Left tabs (14px/500, icons, 2px green underline on active): Problem, Solution, Submissions, Notes, Discussion. Right pane: language dropdown (Java), editor tabs "Solution 1 +", toolbar icons (format, settings, expand, copy, reset). Test panel tabs: Test Cases, Output, Feedback; buttons Evaluate (amber), Run (green outline), Submit (blue). Case chips "Case 1..10", INPUT label, "Visualize" chip.
- Editor: Monaco, Consolas 13px, bg rgb(30,30,30).
- Title 20px/700 with a small difficulty icon; chips under it: difficulty pill (`hard` 12px/600, pill radius, text rgb(248,113,113) on rgba(69,10,10,.5), padding 2/10), Topics and Companies pill buttons (Companies shows a lock for logged-out users).
- Statement 18px / 31.5px line height. Example cards: boxed "Input" blue chip, "Output" green chip, array values drawn as indexed cell boxes with copy and collapse buttons.
- Hints: a collapsed accordion (Radix) inside the Problem tab; trigger text "Hint 1", 14px, chevron rotates 180deg when open; hints are revealed one by one by clicking, no score penalty shown.
- Solutions: a tab in the same left pane. Clicking Solution (logged out) rendered the full write-up in place (heading "Understanding the Problem", prose, constraints). Not gated in the case checked; earlier research reports company-tagged lists and some mock rows gated to Premium.
- Mobile (390): the three panes stack vertically in one screen: statement (about 335px), editor (about 270px), test panel with Evaluate/Run/Submit as a full-width row of three 40px buttons. Left tabs scroll horizontally ("Not..." clipped). Top bar keeps logo, menu, set dropdown, prev/shuffle/next, AI icon, close.

## Progress display
- Course header on lesson pages: big `0%`, `0/771`, thin bar, Certificate badge (lock). Section counters `0/24`. Reading Progress bar and `0%` in the right rail.
- Pattern sheet: header progress per tier ("0/300 solved" with Easy/Medium/Hard counts), each group card has a 128x16 rounded pill progress bar (track rgb(39,39,42)) and a counter.
- Bottom action bar on lessons (48px, fixed): Join Discord, prev, Notes, Star, Complete, Ask AI, next; right side Book view, layout, font size, fullscreen.
- Logged out: all zeros; per-user state could not be observed.

## Type sizes (px, 1440 unless noted)
| Role | Size / weight / line-height |
|---|---|
| Body base | 16 / 400 / 24, Inter |
| Lesson body | 18 / 400 / 31.5 (1.75), colour rgba(242,242,242,.9) |
| Lesson h1 | 36 / 700 / 40, tracking -0.9px (390: 30 / 37.5) |
| Lesson h2 | 30 / 700 / 45 |
| Lesson h3 | 24 / 700 / 36 |
| Inline code | 18 / 400 mono (ui-monospace stack), green rgb(34,197,94), 1px border rgba(39,39,42,.5), radius 6, padding 2 |
| Editor code | 13, Consolas |
| Table text | 14 / 400 / 20 (390: 12 / 16); headers 14 / 500 muted rgb(161,161,170) |
| Sidebar item / section | 13 / 400 ; 14 / 600 |
| Labels and chips | 12-14 / 500-600 |
| Landing h1 | 72 / 700 (letter spacing -3.6px); landing h2 60 and 36 |

## Spacing (measured)
- Prose: paragraph margin-bottom 16; list items 8 apart; h2 margin-bottom 8 (heading to text), sections separated by large heading line boxes (h2 line box 45); embedded demo blocks `my-6` (24) or `my-2` (8).
- Lesson header block margin-bottom 32; meta chips row has 20px top margin and 16px top padding under a 1px border.
- Sidebar rows: 36px high, pitch 38 (2px gap); section buttons 40px high, pitch 44.
- Cards: `rounded-lg` (8px), 1px border rgb(39,39,42), bg rgb(28,25,23); stat bar card padding 12/16; filter bar padding 10/16 with 12px gap; course cards 96px high; group table rows 73px (padding 16).
- Tabs on pattern sheet: 4 cards each 271x58, small gap.

## Colours and states
- Background rgb(12,10,9); card rgb(28,25,23); border rgb(39,39,42); text rgb(242,242,242); muted rgb(161,161,170). Primary green hsl(142.1 70.6% 45.3%) = about rgb(34,197,94).
- Active sidebar item: bg rgba(34,197,94,.06) plus a 3px rounded green bar at the left edge, text full white; inactive: muted text, hover bg muted/40 and 2px right shift.
- Done: a small check icon in the row's status cell (`opacity-0 scale-50` until solved). Done colour itself not observable logged out.
- Locked/premium: lock icon, green "Unlock ..." button outline (e.g. "Unlock Audio", Certificate), Companies lock. No greyed-out rows.
- Difficulty, pattern-sheet text: Easy rgb(20,184,166) teal, Medium rgb(250,204,21) yellow, Hard rgb(244,63,94) rose, 16/600, radius 8, padding 4/8. Problem page chip: Hard rgb(248,113,113) on rgba(69,10,10,.5). Lesson "High Priority" chip red on dark red.
- Test-case chip: Case 1 selected has a green border and green text; others neutral.
- Buttons: Evaluate amber, Run green, Submit blue, Login green.

## Empty states
- Logged-out zero states: `0%`, `0/771`, `0 solved`. A leaderboard shows login redirect (earlier research). No explicit "no results" copy found on the pages checked.

## Not reached
- Anything behind login: personal progress, streak calendar, submissions history, notes, leaderboard, saved highlights, certificate. Hint text contents were not expanded (no state needed; structure read from DOM). Pattern sheet lazy-loads groups on scroll (10 of 59 rendered). Chapter list under /learn/dsa/<chapter> reached only for two chapters.
