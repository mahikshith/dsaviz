# InterviewBit (interviewbit.com) - live check (2026-11-01)

Method. robots.txt honoured: only /profile is disallowed. No bot check or CAPTCHA appeared. No login, sign-up or forms. I did not click "Unlock Hint" (it is a state change inside the app). I dismissed nothing: one welcome modal ("See What's New") covers /courses/programming/ at load; I left it and measured around it.
Screenshots: REA `capture_browser_scenario` (Edge, 1440x900 and 390x844), including one click on the "Hints" tab of a problem. Computed styles from a separate headless Edge via CDP (REA has no JS-eval action). Private reference only, `screenshots/interviewbit/`.
Pages loaded (about 10): /, /practice/, /courses/programming/, /courses/programming/arrays/, /courses/programming/arrays/arrays-in-programming-fundamentals/, /problems/max-sum-contiguous-subarray/, /coding-interview-questions/ (1440 and 390 for the important ones).

## Navigation
- Desktop header 48px, sticky, white: hamburger-less; logo, Practice, Resources (menu), Contests, Online IDE (menu), Free Mock (menu), Events (teal "New" tag), Scaler, search icon; right: Sign in (outline teal), Experience Scaler (filled teal). A slim promo ribbon (42px, "Have an interview? Get ready...") sits above on the home page.
- Problem page replaces the nav with its own 52px bar: hamburger, logo, Sign In, Experience Scaler.
- Mobile (390): hamburger, logo, Experience Scaler pill, plus bell and activity icons on problem pages. Mega menu slide-in lists Practice, Resources, Contests, Online IDE, Free Mock, Events, Scaler, Interview Guides, All Problems, Fast Track Courses, Community, Blog.

## Sidebar
- Course/topic pages: a 280px left "Contents" panel with a collapse chevron. Structure: "LEVEL 1" label (14px, letter-spaced caps), topic accordions (Time Complexity, Arrays...), a "Jump to Level 2" lock chip drawn over a divider line (teal chip, lock icon), "LEVEL 2" label, then lesson items (14px, grey rgb(153,153,153) text, each with a 22px outlined circle joined by a vertical connector line - a stepper rail). Separate 1px right border.
- On mobile the Contents panel becomes a floating teal pill "Contents" bottom left.
- Problem list page: no sidebar; a right column (about 286px) with the progress donut card and leaderboard.

## Content width
- Topic/lesson page at 1440: sidebar 0..280, lesson area x 305..1415 (about 1110px, inner text 1085), hero band 232px tall pale teal gradient across full width.
- Problem list and practice pages: container about 1165-1200px.
- Problem page: full viewport.

## Clicks (by link inspection)
- Home to a lesson area: Practice (1), Programming track (2), Arrays topic (3), which already shows the Arrays lesson index; opening a lesson from the sidebar is 4. Home to a problem: Practice (1), All Problems/coding questions (2), a problem row (3); or "Start Solving Now" CTA (1) then a tile.

## Problem page (public, renders logged out)
- Split at 1440: left statement pane 547px (38%), drag handle (vertical dots) about 14px wide, right pane about 893px (62%). Editor fills right pane almost full height; a thin horizontal handle ("...") sits above a collapsed console area at the bottom.
- Top of left pane: 4 tabs (12px; active has bold dark text on a grey pill, inactive text rgb(134,152,152)): Description, Discussion, Submissions, Hints. Then title (16/600), breadcrumb "Programming - Arrays", difficulty chip, "33.1% Success" chip, thumbs-up count, comment count, Bookmark, "Asked In" company logos.
- Statement sections are labelled bold 14px headings (Problem Description, Problem Constraints, Input Format, Output Format, Example) each over a light grey quoted block.
- Right pane header: timer `00:00:07`, "Score: 225 / 225" chip with info icon, language dropdown "C (Gcc-4.8)", reset, settings, shortcuts, more.
- Bottom bar (50px, fixed): "All Problems" outline button, prev/next arrows with `56/749` counter, cloud-sync tick, console toggle, Custom Input, Run (outline), Submit (filled teal).
- Editor: Monaco, 14px, dark rgb(30,30,30), starter code with docblock.
- Hints: tab "Hints" shows a 3-segment control: Hint, Solution Approach, Complete Solution, each with a lock icon. Open state shows "Hint is Locked!", a lock illustration, and a warning that unlocking deducts 10% of score, button "Unlock Hint". So reveal is a gated ladder with a score penalty; contents were not opened.
- Mobile (390): statement shown in a collapsible header ("Max Sum Contiguous Subarray v"), sections stacked, floating edit button at right to switch to code, and a modal "Switch to Desktop for a better problem solving experience" with "Got it". Editor flow is effectively desktop-only.

## Progress display
- Course page: per-topic lock chips; topic tiles show "12 Articles / 44 Problems" and progress circles; side panel with `0 / 275` (green easy), `0 / 287` (orange medium), `0 / 53` (red hard), `0 / 615` total, and a leaderboard card.
- Lesson area: each section card ("Primers", "Examples") has a 50px circle `0/3` and rows with a 22px empty radio circle, name, time in mins, and points (30 Pts, 60 Pts, 150 Pts, 200 Pts).
- Problem list: "Your Progress: Solved /956, Attempted, Accuracy" donut card (100px donut inside a 286x138 card).
- Score/points system: per-problem score 225, minus 10% per hint.

## Type sizes (px)
| Role | Size / weight / line-height |
|---|---|
| Body | 16 / 400 / 22.4, Lato (Nunito on some pages), colour rgb(81,81,81) / rgb(26,61,60) |
| Topic page h1 | 32 / 600 / 44.8, colour rgb(13,50,49) |
| Lesson tile section title | 22 / 800 / 30.8 (e.g. "Video Courses") |
| Problem list h1 | 24 / 700 / 33.6 |
| Problem title | 16 / 600 |
| Problem body | 14 / 400 / 24 (390: 14 / 21) |
| Tabs | 12 / 600 active, 12 / 400 inactive |
| Lesson sidebar item | 14 / 400 / 19.6 |
| Code | monospace 14 (editor Monaco 14) |
| Stat labels | 14 |

## Spacing
- Section cards in lesson area: white, radius about 8, shadow; card padding about 22; gap between cards 20; rows in a card 46px high with a 10px gap, two columns of about 530px with 16px gutter.
- Hero band 232px; hero h1 margin-bottom 10.
- Statement blocks: label then quoted block with about 10px padding; section gap about 30px.
- Header 48; problem top bar 52; bottom bar 50.

## Colours and states
- Primary teal (Experience Scaler / Submit / Go to Problems / links). Text deep green-grey rgb(26,61,60). Page white; hero pale teal gradient.
- Difficulty chip (problem page and list): Easy bg rgb(184,245,197) text rgb(0,102,36); Medium bg rgb(255,226,184) text rgb(102,41,0); Hard bg rgb(252,184,192) text rgb(102,0,0); 14px (12 on phone), radius 6, padding about 0/10.
- Difficulty counters (text only): Easy rgb(0,154,42), Medium rgb(217,124,0), Hard rgb(170,0,15).
- Locked: teal "Jump to Level 2" chip with a lock; hint segments with lock icons. Active tab: grey pill. Done/active sidebar item colours: not observable logged out (all circles empty grey).

## Empty states
- `0/3`, `0 / 275`, "Solved /956", "Score 225 / 225" are the logged-out zero states. A "See What's New" onboarding modal (badges, level bonuses, certificate) appears on first visit.

## Not reached
- Anything after sign in: saved progress, submissions, accepted-state styling, leaderboard rank, hint/solution content (behind unlock and score penalty), test-case results, certificate. Lesson article body for the arrays lesson is largely a tile index (Primers/Examples), not prose.
