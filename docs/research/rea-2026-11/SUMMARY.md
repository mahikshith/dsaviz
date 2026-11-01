# REA live study summary (2026-11-01): AlgoMaster, Scaler, InterviewBit

Measured logged-out in Edge at 1440 and 390. No bot checks or stops. Notes describe structure only. Screenshots are private reference and are not committed.

| | AlgoMaster | Scaler (Topics) | InterviewBit |
|---|---|---|---|
| Nav | Banner 28 + header 57; Learn, Practice, Interview, Resources, Newsletter dropdowns; streak chip; Login | 88px two-row: programme strip + Topics, Explore, Skill Test, Courses, Free Masterclass; Sign In | 48px: Practice, Resources, Contests, Online IDE, Free Mock, Events, Scaler; Sign in |
| Sidebar | Lesson only: 320px course tree, 31 sections with done/total, search and filter; 256px right TOC and progress rail | None public; inline module accordion; 312px sticky enrol card | Lesson/topic: 280px Contents with Level labels and a stepper rail of circles |
| Content width | 691 (text 641) between rails; sheet 1152; container 1400 | 844 main + 312 card inside 1260; article column 640 | Lesson area about 1110 beside the 280 sidebar |
| Home to lesson / problem | 1 / 3 clicks | Lesson gated by sign-up; article 3 clicks; problem gated | About 3-4 / 3 |
| Problem split | 45/55 (648/791); right pane editor 65 / tests 35; tabs Problem, Solution, Submissions, Notes, Discussion; test tabs Test Cases, Output, Feedback | Public IDE only: 60/40, output over input 50/50; no problem page public | 38/62 (547/893); tabs Description, Discussion, Submissions, Hints |
| Hints / solutions | Hint accordion in the Problem tab, one by one; Solution is a tab with a full write-up | Not observable | Hints tab: 3 locked levels (Hint, Solution Approach, Complete Solution); unlocking costs 10% of score |
| Progress | `0%`, `0/771`, section counters, pill bars per group, reading-progress rail, solved counts by difficulty | 16px module circles, rating and enrolled count; no bars logged out | `0/3` ring per section, difficulty counters, donut, points per item, score 225/225 |
| Body type | 18 / 31.5, Inter | 16-18 / 22-28, Source Sans | 14-16, Lato |
| Headings | h1 36, h2 30, h3 24 | h1 32-40, h2 24, h3 20 | h1 32, section 22/800, list h1 24 |
| Code | Inline 18 green mono; editor 13 Consolas | Mono 16, light on navy | Monaco 14 |
| Labels | 12-14 / 500-600 | 14 | 12-14 |
| Spacing | p 16, li 8, blocks 24, header 32, sidebar row 36 + 2 gap | p 10-16, h2 mb 16, module header 60 | Cards 20 apart, rows 46 + 10, hero 232 |
| Active / done / locked | Active: green 6% tint + 3px green bar; done: check icon; locked: lock icon | Not visible; the gate is a sign-up redirect | Active tab: grey pill; lock chip "Jump to Level 2"; done not visible |
| Difficulty | Text teal / yellow / rose (16/600); problem chip red on dark red | None public | Chips pale green / amber / pink with dark text; counters green, orange, red |
| Empty states | Zeros, no copy | None | Zeros, `0/3`, welcome modal |
| 390 phone | Panes stack (statement, editor, tests); sidebar behind menu; no horizontal scroll | Root scales to 0.9; IDE full width with sticky Run bar | Problem becomes read-only plus a "Switch to Desktop" modal; Contents is a floating pill |

## Shared patterns

1. Progress is always done/total plus a ring or bar at every level (course, section, group, item), and shows zeros logged out.
2. Lessons list their problems inline, and problem pages have prev/next and a position counter or set name.
3. Problem page: statement left, editor right, tests under the editor, drag handles, split near 40-45 / 55-60. Tabs sit on the statement pane; Run and Submit sit at the bottom right.
4. Hints are a ladder, never one big reveal: an accordion on AlgoMaster, three locked steps with a stated cost on InterviewBit. Solutions sit behind a tab or an explicit unlock.
5. Phone: stack the panes or give up gracefully. AlgoMaster stacks three panels, InterviewBit warns "switch to desktop", and Scaler keeps a full-width editor with a sticky Run bar. None needs horizontal scroll.
6. Calm dense type: body 16-18px at 1.4-1.75 line height, headings step 36/30/24 or 32/24/20, labels 12-14px, a reading column of about 640-700px.
7. State colour is small and semantic: green for active and easy, amber or yellow for medium, red or rose for hard, a lock icon for gated, a pale tint plus a thin bar for the active row.
8. Difficulty shows in two shapes: a small text label in lists, a pill chip on the problem page.
9. Gating is a sign-up wall, not a hidden page. Public pages render the statement but lock hints, submit and saved progress. Scaler is the extreme: its lessons and challenges redirect to sign-up.
10. Sticky chrome is short: 48-57px header, 50px bottom action bar on lessons and problems.

## Not reachable, on any site, without login

- Real done/active/locked styling, streaks, saved progress, submission history, and hint and solution text behind unlock.
- Scaler's free-course lessons and challenge/problem pages. Its only public IDE is the generic online compiler.
- AlgoMaster's pattern sheet lazy-loads groups on scroll, so only 10 of 59 were rendered.
- No mobile menu drawer was opened on any site.

## Method

The REA scenario tool has no script step, so px and colour values come from headless Edge over CDP on the same public pages. Click counts come from link inspection. Robots.txt was honoured on all three sites; roughly 7 to 12 pages per site.
