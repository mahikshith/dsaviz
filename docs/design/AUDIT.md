# DSAMaxxing user-perspective audit

Date 2026-11-01. Built site `dist/index.html`, Edge, 1440 and 390 wide (plus 1280, 1024, 768, 320 for overlap).
Two people: (A) a complete beginner on first visit; (B) a learner on day 5 (seeded: 6 stories, 5 code passes, 14 sheet ticks, Start here lessons 1 to 6).
Screenshot paths are relative to `C:\Users\mahik\Desktop\DSAMaxxing\notes\audit\` (folders: `fresh/` first visit, `day5/` seeded, `j1/ j2/ j3/ chap/` journeys, `mid/` and `sd-*.png` other widths, `seg/` crops of long pages). The scripts that made them are in the same folder.
Severity: blocker = user cannot continue or is misled; high = most users hit it and it hurts; medium = noticeable friction; low = polish. No item below is a hard blocker; the worst are marked high.

## Cross-site (every page)

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | overlap | At 1280 and 1024 the top pill nav is too wide: "AI/ML" sits on top of the search icon and the streak pill touches it. At 390 the nav icons overlap (search over the sheet icon) and labels are cut ("Sta", "Learr"). | Go icon-only or use a menu below 1400; hide labels before they collide; test 1024, 1280 and 390. | sd-SystemDesign-1280.png, mid/Home-1024.png, seg/Ch-390_0.png |
| high | confusing | Two back controls that say different things: a "Front page" or "Home" back button right next to a "Home" tab (on Learn the back button reads "Home", then "Home" again). The back label changes by page ("Problem", "Lesson", "Revisit") and is often not where Back goes. | One back control, labelled with the real destination; remove it where it duplicates a nav tab. | j3/02-bypattern-1440.png, fresh/Start-1440.png |
| medium | confusing | The streak pill shows a bare flame and a number (0 or 5) with no word. A first-timer does not know what it counts. | Add "day streak" text at wide widths and a tooltip; link it to the week view. | fresh/Home-1440.png |
| medium | wordy | Every page opens with a paragraph, then cards each with their own paragraph, then another explainer. Pages read like documentation, not something to do. | One line per page header; put the rest behind "Why" or "How". | fresh/Concepts-1440.png |
| medium | spacing | Different card grids with different gaps and padding (4 equal stat cards, mixed 8+4 Home, 3-column dense Concepts, 4-column System design). Spacing is not from one scale. | One spacing scale (8/16/24/40) and one card padding for all pages. | day5/Home-1440.png, fresh/Concepts-1440.png |
| medium | confusing | Counts disagree: "562 practice problems" and "47 animated stories" (front page) vs "62 stories" (Home) vs "37 lessons" (Concepts) vs "Core 150" beside a header that says 562. A reader cannot trust any number. | One source of truth per label; say "stories" vs "problems" consistently. | fresh/Main-1440.png, day5/Home-1440.png |
| low | wordy | Demo content (league, buddies, activity feed, testimonials) sits on Home, Profile and the front page. It is tagged "Demo" but still adds noise that looks real. | Hide demo blocks until accounts exist, or fold them into one "Preview" area. | fresh/Home-1440.png |

## Front page (Main)

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | wordy | 8100px tall at 1440 and 15400px at 390: hero, three personas, how a story plays, testimonials, patterns, plain words, activity feed, Start here, why it sticks, around the stories, more. Too many things at once; nobody reaches the bottom. | Cut to hero, "how it works" (3 steps), pick your start (3 cards), one proof block. Move the rest to About. | fresh/Main-1440.png, seg/Main-1440_0.png to _4.png |
| high | confusing | A person who has never coded sees "Start here" only mid-page (after the league and activity feed). The top buttons are "Play a story free" and "Browse patterns", which assume they know what a pattern is. | Add a hero button "Never coded? Start here", or ask one question that routes. | seg/Main-1440_0.png |
| medium | spacing | Hero stat row wraps unevenly: "562 practice problems" breaks to two lines, the language list breaks mid item over three rows, dots float between. | Three equal columns, shorter labels, languages on one line. | seg/Main-1440_0.png |
| medium | confusing | "One library, three starting lines" cards are quotes ("I knew this once. Interview's Friday.") ending in a path like "Pattern tracks -> timed practice". The cards are not clickable, so the next action is unclear. | Make each card a button that opens the matching page. | seg/Main-1440_0.png |
| medium | wordy | Testimonials are labelled "Illustrative learner journeys" in tiny grey type below the strip. They read as real reviews. | Remove them, or label them clearly above the cards. | seg/Main-1440_1.png |
| low | spacing | The testimonial strip is cut off at the right edge with no scroll cue; a large empty gap follows before the next heading. | Add arrows or wrap to a grid; reduce the gap. | seg/Main-1440_1.png |
| medium | spacing | At 390 the hero buttons wrap their text ("Play a story / free", "Browse / patterns") and the live preview is about 280px of small text before the next section. | Stack the buttons full width; trim the preview. | seg/Main-390_0.png |

## Home (returning and first visit)

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | confusing | On day 5 there are three ways forward at once: "Continue: Valid Anagram" (story), "or today's story The Orchard Rule", and "Keep going: lesson 7" (Start here). No best one is stated. | One primary resume button (last thing touched); the others as small links. | day5/Home-1440.png |
| high | wordy | After the hero: 4 stat cards, medals (87 of them), this week, league (demo), up next table. Eight blocks. | Keep resume, streak/week, up next. Move medals and league to Profile. | day5/Home-1440.png |
| medium | confusing | For a brand-new user the hero says "Your first story is waiting" with "Start: Valid Anagram" (a hash map problem) while the card beside it says "New to coding? Start here". Which is for me? | With no activity, ask: "New to code?" -> lesson 1, "I can code" -> a story. | fresh/Home-1440.png |
| medium | spacing | Four stat cards each have an empty lower half (icon, number, label, bar); on first visit all values are 0 so the row is four empty boxes. | Hide the row until first activity, or show one "your first goal" card. | fresh/Home-1440.png |
| medium | overlap | "Up next" tabs truncate: "Stacks, queu...", "Graphs & gri...", "Dynamic pr..."; at 390 they become "Str... Ar... M... St... Lin... Tr...". | Scroll the tabs or use a select on small screens. | fresh/Home-1440.png, day5/Home-390.png |
| low | confusing | "Medals 0 of 87" and a row of 8 locked hexagons; a newcomer does not know what a medal is. | Hide locked medals until one is earned; show only "next medal". | fresh/Home-1440.png |
| low | confusing | Streak, "5 of 7 days this week" and "longest streak 5 days" appear in three places (nav, stat card, This week). | Show once; link elsewhere. | day5/Home-1440.png |

## Start here (hub)

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | spacing | The path map is cramped: 6 columns of 64px boxes with one-line labels. Above it a hero card has an empty bottom half; below it 18 problems. The eye has no place to go. | Render the path as a vertical list of chapters with a clear current step; keep the graph as optional "see the map". | fresh/Start-1440.png |
| high | confusing | Arrows between lessons are faint, 1px, short, and many run behind boxes. "Needs 7, 9, 17" is jargon with numbers that mean nothing until you find those boxes. The legend "Arrows point from a lesson to what it unlocks" is 12px grey. | Remove arrows; say "Do these first: Input, if/else, Loop a list" by name, or just order the list. | fresh/Start-1440.png, j1/04-panel-1440.png |
| high | dead end | Clicking a lesson box (e.g. 22) changes nothing above the fold. The detail panel opens to the right of the map, 560px down; at 900px tall the user sees only a faint outline on the box and thinks the click failed. | Scroll the panel into view, open it as a drawer, or make the box open the lesson with a hover preview. | j1/03-after-click22-1440.png, j1/04-panel-1440.png |
| high | overlap | Lesson titles are cut: "return / pr...", "Running t...", "Nested lo...", "Project: p...", "Project: g...", "Counting ...", "Read a pr...". The words that mean something are the ones lost. | Allow two lines, or shorten names to fit. | fresh/Start-1440.png |
| medium | confusing | Before any click, the area right of the map shows a ghost preview (near-black text on black). First-timers read it as a broken panel. | Show a real "start here" panel until a box is chosen. | fresh/Start-1440.png |
| medium | confusing | Tabs "Level 1 / Level 2 / Level 3 / Level 4 . soon / Level 5 . soon" tell a beginner there is a lot they cannot use, with no plain description of what levels are. | Hide soon levels; call them "Part 1: Basics" and so on. | fresh/Start-1440.png |
| medium | confusing | "First problems" says they open after lesson 26, but rows say "after lesson 21 / 22 / 26". Unclear if anything is locked. | One rule stated once; grey out only what is locked. | fresh/Start-1440.png |
| medium | confusing | The lesson 22 panel says "finish lesson 17 (Loop a list) first" while the lesson page says "Know these first: Visiting every item". Same lesson, two names (hub: "Loop a list", lesson page: "Visiting every item"). | One title per lesson everywhere. | j1/04-panel-1440.png, j1/05-lesson22-1440.png |
| low | wordy | "Your road map" lists four steps with a paragraph each, then "The path" repeats it. | Keep one. | fresh/Start-1440.png |

## Start here lesson (Chapter)

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | confusing | The lesson opens on the "About this lesson" tab, not the animation. The first thing a beginner sees on lesson 1 is a wall of cards (What it is, Where used, Key words, How it works, Use when, Skip when, Mistakes, Cheat sheet). The actual lesson is on the other tab. | Default to "Lesson". Make About a collapsed "More about this lesson" below it. | chap/l1-default-1440.png, fresh/Chapter-1440.png |
| high | spacing | About tab: cards are full width but text stops at about 60% of it; "Know these first" is a half-width card holding one line ("Nothing. This is a good place to start.") beside a taller card, leaving blanks. Nine "i" help buttons repeat. | Single column about 70 characters wide, merge short cards, drop the "i" buttons. | chap/l1-default-1440.png, chap/l1-about-bottom-1440.png |
| medium | overlap | The page body scrolls inside a fixed box under the header; lines of text are cut in half by the tab bar edge while scrolling, and a full-page capture shows only 1060px. Nested scrolling hides the page length. | Let the page scroll normally. | chap/l1-about-bottom-1440.png |
| medium | confusing | Two tab systems plus a language switch on one page: "1 Story ... 5 Check" pills, "Lesson / About" tabs, and Python/JavaScript. | One step bar; language switch inside the code step. | chap/l1-lessontab-1440.png |
| medium | spacing | On the Lesson tab the stage (computer, You, toaster) pushes the toaster below the 900px fold; the first beat sentence sits in a half-empty box. | Compact the stage to fit about 700px. | chap/l1-lessontab-1440.png |
| medium | confusing | Mobile: the step pill bar is cut at "3 Try it" with no scroll cue; the Python/JS switch floats alone on its own row. | Wrap, or show "Step 1 of 5". | seg/Ch-390_0.png |
| low | confusing | The header shows "First run ->" (the next lesson link) above the title with no label; it looks like a stray link. | Label it "Next lesson: First run". | chap/l1-default-1440.png |

## Learn (Library: Map / Learning path / By pattern / By company)

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | wordy | Four views, a search box, a "Start: Valid Anagram" button, a difficulty filter and four sort buttons all sit above the content. | Default to one view; hide sort and filter until a list is open. | j3/02-bypattern-1440.png |
| high | overlap | Map view: text about 10px, and about 24 nodes marked SOON. A newcomer sees a dense subway map of things they cannot open. | Hide coming-soon nodes; enlarge labels; show only the next three. | seg/Pat-1440_0.png |
| high | confusing | By pattern: the first pattern is open by default and shows a table with story names, a "story v" toggle that pushes a paragraph into the middle of the table, company chips, and a "Start: ..." button per row. "Start: Two Sum II" opens the code editor, not the story. | Two named actions: "Watch story" (primary) and "Write code". | seg/j3q_0.png, j3/20-code-1440.png |
| medium | overlap | "Start: Longest Palindromic S...", "Start: Container With Most ...", "Start: Trapping Rain Water": button labels are cut or differ in width so buttons look ragged. | Fixed-width "Watch" and "Code" buttons; the title is already on the row. | seg/j3q_0.png |
| medium | confusing | Pattern counts differ: Learn "0 of 9 solved" for Two Pointers, Sheet "0/25" for the same pattern. | Say "9 stories" vs "25 problems". | j3/02-bypattern-1440.png, day5/Sheet-1440.png |
| medium | dead end | The page is "Library" in its heading, "Learn" in the nav, "Patterns" in the code, and the back button from other pages says "Learn". | One name. | seg/Pat-1440_0.png |
| low | confusing | The map calls step one "First programs / Your first programs"; the Start page calls it "A program" and "Start here". | One name. | seg/Pat-1440_0.png, fresh/Start-1440.png |

## Story (the animation)

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | confusing | Desktop: the first screen is the problem text and the "Solution / Plan it first" panel with all six solution steps already visible; the animation is below the fold. This spoils "guess the pattern first" and hides the product. | Animation and Play on the first screen; plan collapsed until asked. | j3/22-story-1440.png |
| medium | confusing | Two back controls with different labels within 100px: nav "< Problem" and page "< Back to the problem". On mobile the page back says "Library". | One back, one label. | j3/22-story-1440.png, seg/St-390_0.png |
| medium | wordy | The right pane has tabs Solution / Approaches / Your code, five language buttons, "Values right now", complexity lines, and seven collapsible sections (Predict, Try your own input, Go deeper, Hints, Why this pattern, My notes, other stories). | Show Play and one sentence; open the rest on demand. | j3/22-story-1440.png |
| low | confusing | The nav shows "Learn" selected but there is no breadcrumb (Code has one). | Add Library / Pattern / Story breadcrumb. | j3/22-story-1440.png |

## Code (problem page)

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | confusing | Run and Submit are below the fold at 1440x900; the editor fills the screen with 5 lines of code and 400px of empty editor. | Shorter editor or a sticky Run/Submit bar. | j2/05-problem-1440.png |
| medium | dead end | "Story - The Guest List" is a label, not a link; the way to the story is further down as "Watch ...". A user who came from the Sheet cannot reach the story from the top. | Make the label a button "Watch the story". | j2/05-problem-1440.png |
| medium | confusing | Breadcrumb says "Library / Hash Map / Code" while the nav back says "Sheet". Back goes to the Sheet (correct), the breadcrumb names something else. | Breadcrumb reflects the way the user came. | j2/05-problem-1440.png |
| low | confusing | The header strip says "562 problems, all solvable here" next to a picker with the label "Problem". | Remove the sentence; label the picker "Jump to problem". | j2/05-problem-1440.png |

## Sheet

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | broken | Repro of the owner's bug: pick list "Core 150", set status "Done", then click a pattern in the left rail whose count is 0 (Hash map 0/10): the panel shows only "No problems match these filters." and "Showing 0 of 150". It does not say that Done caused it, and the rail still lets you pick a 0 pattern. | Disable rail items with 0 under the current status filter; message "No finished Hash map problems yet. Show all Hash map (10)". | j2/04-hashmap-done-1440.png |
| high | overlap | The left rail is truncated at every width: "Two p...", "Sliding...", "Prefix s...", "Breadt...", "Depth-...", "Backtra...", "Linked l...". It is the main navigation of the page and the pattern name is the part cut. At 768 it shrinks further. | Widen to about 260px or list one pattern per row with full names. | day5/Sheet-1440.png, j2/02-core150-done-1440.png, seg/Sheet-768_0.png |
| high | confusing | Two filter groups side by side that both start with an "All" pill (difficulty: All/Easy/Medium/Hard; status: All/To do/Done/Starred), then a pattern dropdown that duplicates the rail, a company dropdown, and four list cards above. Seven filter controls, no order. | One "Filters" row: Status, Difficulty; pattern only in the rail; lists as one dropdown. | day5/Sheet-1440.png |
| medium | confusing | The header contradicts itself: big "150 PROBLEMS" beside "562 problems, all solvable here, in 32 groups. Each group ..." (also cut off). A group header says "5 match 5/13" while one list shows 5 rows. | Subtitle follows the list picked; one meaning for "match". | j2/02-core150-done-1440.png |
| medium | confusing | "Starter 50 / Core 150 / Core skills 20 / All 562": nobody knows what these are until reading the grey line under the cards. | Rename plainly and put a one-line description inside each card. | day5/Sheet-1440.png |
| medium | overlap | At 768 the desktop layout is just squeezed: search placeholder "Problem nam", "Any compo", company chips cut ("Micros"). No tablet layout. | Collapse the rail into a top dropdown below 1100. | seg/Sheet-768_0.png |
| medium | spacing | On mobile, eight stacked controls (header, 2 buttons, random, 4 list cards, search, 2 pill rows, 2 dropdowns) take over 700px before the first problem; the pattern rail is gone. | One "Filters" button that opens a sheet. | seg/Sheet-390_0.png |
| low | confusing | Today's 5 shows "0/5 . 2026-11-01" (a raw date) and small coloured dots with no key. | Say "Today" and add a key. | day5/Sheet-1440.png |
| low | dead end | Sheet -> Solve -> Back works (button says "Sheet"), but filters and scroll reset, so a user deep in a filtered list loses their place. | Keep filters and scroll on return. | j2/05-problem-1440.png |

## Concepts

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | wordy | Seven track cards in a 3-column masonry grid, 37 lessons each with subtitle, steps and time, plus "Feeds these sheet groups" lists. About 1900px of text. | One track per row, open on click; drop the "feeds" lists. | fresh/Concepts-1440.png |
| medium | overlap | Many subtitles cut with an ellipsis ("how work grows as the list grows . ..."); 51 cut items at 320, 18 at 768 and 1024. | Wrap to two lines. | fresh/Concepts-1440.png |
| medium | confusing | A "slider" badge on some lessons and not others, never explained. | Say "interactive" or remove it. | fresh/Concepts-1440.png |
| low | spacing | Uneven column heights leave a big empty block under Trees and Heaps and under the last row. | Equal-height cards or a single column. | fresh/Concepts-1440.png |

## System design, Git, AI/ML

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | overlap | System design: every lesson subtitle is cut ("bigger machine . mor...", "full example . the 4..."); 56 to 61 cut items at 320, 768 and 1024. At 1280 titles also cut ("SOLID in one pi...", "Search autoco..."). | Wrap subtitles; single column below 1200. | sd-SystemDesign-1440.png, sd-SystemDesign-1280.png |
| medium | wordy | 40 lessons shown at once in three long lists plus a four-step method card; no start point beyond one button. | Show the first 5 per group with "show all". | sd-SystemDesign-1440.png |
| medium | overlap | AI/ML has 57 cut items at 320 and is 2700px tall at 390. | Same wrap fix. | fresh/AIML-390.png |
| low | confusing | Git, System design and AI/ML are hidden from the phone pill unless active, so a phone user cannot find them from it. | Put them in the menu with a visible "More". | fresh/Git-390.png |

## Revisit

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| medium | confusing | Revisit is not in the nav; it sits under "Learn" with a back button that says "Problem". A returning user finds it only through Home or Profile. | Add "11 due" with a link on Home. | day5/Revisit-1440.png |
| medium | spacing | The card fills the top-left 60%; the left column below is empty for 800px while the right column has three tall cards. | Collapse "Why revisit" into help. | day5/Revisit-1440.png |
| low | confusing | "Retention" shows a single dash and a bar until the first review. | Hide until there is data. | day5/Revisit-1440.png |

## Profile

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| high | confusing | Reminder settings (WhatsApp, 9:30 PM, Email) look real, but the text says reminders start "when accounts launch". The "Pattern certificate" says "NOT YET ... exam opens when accounts launch". Users set things that do nothing. | Grey out or remove until they work. | day5/Profile-1440.png |
| medium | wordy | Eleven blocks: identity, patterns ring, six stats, activity map, certificates, medals (87), reminders, buddies. "Streak" and "Longest streak" both show "5 days" side by side. | Merge the streak cards; move medals and certificates to a second tab. | day5/Profile-1440.png |
| medium | dead end | "Erase my progress" is a plain text link in the same card as the reminder options and the Plan button, with no label of what it deletes. | Move it to a "Danger zone" with a confirm. | day5/Profile-1440.png |
| low | spacing | Activity map shows 6 months of empty squares with 5 filled at the far right; tiny month labels. | Show the last 8 weeks. | day5/Profile-1440.png |

## Interview, Glossary, Basics, Contests, Leaderboard, About

| Sev | Type | Problem | Fix | Shot |
|---|---|---|---|---|
| medium | wordy | About is 4440px at 1440 and 8295px at 390, longer than the front page. | Cut to one screen plus a short FAQ. | fresh/About-1440.png |
| medium | confusing | Leaderboard and Contests use demo data with real-looking names; a first-time user may take "You are #20 of 20" as a real ranking. | Replace with "Leagues start with accounts" until live. | fresh/Leaderboard-1440.png |
| low | overlap | At 320 these pages clip chips and tabs past the right edge (Interview "Mock interview", Leaderboard "Your college", Basics code chips). | Wrap tab rows. | (overflow scan, ovf.js) |
| low | dead end | These pages are not in the main nav; the only way is the menu or search, and the back label depends on the previous page. | Add an obvious "More" entry. | fresh/Glossary-1440.png |

## Journeys

1. **Home -> Start here -> lesson 22 -> back.** Clicking lesson 22 gives no visible reaction above the fold (the panel is 560px down). "Open lesson 22" works. The lesson opens on the About tab. Browser Back and the nav back ("Start here") both return to the hub, which scrolls to the top and no longer shows the chosen lesson. (j1/)
2. **Sheet -> problem -> back.** Works; back is labelled "Sheet". Filters and scroll reset. Run/Submit are below the fold. (j2/)
3. **Learn -> pattern -> story -> problem.** Four tabs and sort controls before the list; first pattern pre-opened; "Start: X" opens the code editor, not the story; the story link is far down the code page as "Watch ...". Back chain Story -> Code -> Learn works but nav labels change at every step. (j3/)
4. **Day 5 resume.** Home shows two resume buttons plus a story suggestion. The streak is only a bare number in the nav and a stat card. The "streak at risk" state could not be shown because the seed counted activity today; not verified. (day5/)

## TOP 15 (damage to a first-time user)

1. Lesson 1 opens on "About this lesson" (a card wall), not the animation. (Start here lesson)
2. Clicking a lesson on the Start map shows nothing above the fold; the panel is 560px down. (Start here)
3. The front page is 8100px (15400px on a phone) and buries the beginner route mid-page. (Front page)
4. Start map: tiny boxes, cut titles, faint arrows, "Needs 7, 9, 17" jargon. (Start here)
5. The top nav overlaps at 1280, 1024 and 390 (AI/ML over search; labels cut). (all pages)
6. Two back buttons that say different things, plus a "Home" back next to a Home tab. (all pages)
7. Home shows eight blocks and two or three competing "continue" buttons. (Home)
8. Sheet: "No problems match" with no reason; the rail offers 0-count patterns. (Sheet)
9. Sheet rail names cut off ("Two p...", "Sliding..."); seven filter controls with two "All" pills. (Sheet)
10. Learn: four views, sort and filter before content; map text about 10px with about 24 SOON nodes. (Learn)
11. "Start: X" in Learn opens the code editor, not the story. (Learn, Code)
12. Story page shows the full solution plan and puts the animation below the fold. (Story)
13. Reminders, certificate exam and league look usable but are fake or "when accounts launch". (Profile, Home, Leaderboard)
14. System design, Concepts and AI/ML cut lesson subtitles with "..." at every width. (System design, Concepts)
15. Code page: Run and Submit below the fold; editor mostly empty. (Code)
