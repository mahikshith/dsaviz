# Data layer and backend plan

Every page reads learner data through one module, `DS`, in `shared/data.js`. The build copies it into each page between `// @@DATA@@` and `// @@END-DATA@@`, right after the catalog.

There is no server yet. `DS` has two kinds of functions:

- **Real.** These read this browser's `localStorage`. A new learner sees zeros and empty states, never sample numbers.
- **Demo.** These need accounts and a server, so they return sample data marked `demo: true`. Pages put a small "Demo" tag next to anything they show from these. The learner's own row inside demo data is always real.

`npm test` runs `tests/datacheck.js` against this module: the empty state, logging, streak math across days, sheet ticks, medals, the demo flags, the review scheduler and queue, notes, and the backup file.

## Storage keys

| Key | Written by | Shape |
| --- | --- | --- |
| `dsaviz-activity-v1` | `DS.logActivity` | `{ v: 1, days: { 'YYYY-MM-DD': { story, code, lesson, revisit, mock, xp } }, stories: { id: ts }, code: { id: ts }, lessons: { id: ts } }` |
| `dsaviz-sheet-v1` | Sheet page | `{ v: 1, done: { slug: ts }, star: { slug: 1 } }`. DS only reads it. |
| `dsaviz-deck` | older Story and Revisit pages | `{ id: { due, rated } }`. Legacy: only read for medals. |
| `dsaviz-review-v1` | `DS.review`, `DS.addCard` | `{ v: 1, cards: { id: { due: 'YYYY-MM-DD', interval, ease, reps, lapses, last, grade, prev, name, pattern, rule, hint, story } }, log: [{ id, at, grade }] }`. Sheet cards are `sheet:<slug>`. |
| `dsaviz-start-v1` | `DS.startPass`, `DS.startFinish`, `DS.startVisit`, `DS.startPlace` | `{ v: 1, done: { lesson: ts }, ex: { exercise: ts }, skip: { lesson: 1 }, placed: ts, last: lesson, stage: { lesson: stage } }`: the Start here track. `skip` holds lessons the placement check marked known. |
| `dsaviz-predict-v1` | `DS.logPredict` | `{ v: 1, streak, best, right, total }`: the Predict toggle on the story player. A wrong pick resets `streak`. |
| `dsaviz-mock-v1` | `DS.mockStart`, `mockRecord`, `mockHint`, `mockNotes`, `mockExtend`, `mockEnd`, `mockSave`, `mockAbandon` | `{ v: 1, live: { id, startedAt, mins, extra, mix, pattern, lang, problems: [{ id, title, diff, pattern, hints, best, total, submitted, runs }], notes, endedAt } or null, history: [{ id, at, mins, used, hints, passed, total, problems, scores: { area: 1-4 }, score, band }] }`. The clock is `startedAt` plus the minutes, so a reload keeps going. The Interview page also keeps its setup choices in `dsaviz-mock-cfg`. |
| `dsaviz-notes-v1` | `DS.setNote`, `DS.importBackup` | `{ v: 1, notes: { id: { text, at } } }`. Story ids, or the sheet slug for rows without a story. Max 2000 characters. |
| `dsaviz-onboard` | Welcome page | `{ name, reason, level, goal, lang, time, channel, date }` |
| `dsaviz-prefs` | Profile and Welcome pages | `{ goal, time, channel, lang }` (older saves may also hold `depth`, which is ignored) |
| `dsaviz-medals-seen` | `DS.markMedalsSeen` | `{ 'Pattern:tier': 1 }`, so a medal shines once |
| `dsaviz-problem` | many pages (`saveProblem`) | the problem id the learner last opened |

Days are local calendar dates, so a streak follows the learner's own midnight.

## What gets logged, and where

| Event | Call | Where it is made |
| --- | --- | --- |
| A story reaches its last step | `DS.finishStory(id)` | `src/story/comp.js`, `go()` |
| A story or revisit card is rated | `DS.review(id, grade)` (logs a revisit) | `src/story/comp.js` `rate()` (re-rating uses `{ redo: true }`), `src/pages/revisit.js` `rate()` |
| A story is finished / a sheet box is ticked | `DS.addCard(id, { rule } / { name, pattern, hint, story })` | `src/story/comp.js` `go()`, Sheet page `toggleDone()` and import |
| Every code test passes on Submit | `DS.passCode(id)` | `shared/code_pane.js`, where `solved` is set |
| A Git, system design or AI & ML lesson reaches its last step | `DS.finishLesson('git:' / 'sd:' / 'ai:' + id)` | `go()` in `pages/Git.dc.html`, `pages/SDLesson.dc.html`, `pages/AILesson.dc.html` |
| A mock interview is self-scored and saved | `DS.mockSave(scores)` (logs a `mock`) | Interview page, `saveMock()` |
| A sheet box is ticked | nothing to call | DS reads the tick timestamps in `dsaviz-sheet-v1` |

## Real functions

| Function | Returns | A real API would |
| --- | --- | --- |
| `logActivity(kind, id)` | `{ day, first, xp }` or `null` for an unknown kind. `kind` is `'story'`, `'code'`, `'lesson'`, `'revisit'` or `'mock'`. | `POST /me/activity { kind, id, at }`. Keep writing locally first so it works offline, then sync. |
| `finishStory(id)`, `passCode(id)`, `finishLesson(id)`, `rateCard(id)` | same as `logActivity` | same |
| `days()` | `{ 'YYYY-MM-DD': { story, code, lesson, sheet, revisit, mock, xp, total } }`, active days only | `GET /me/activity?from=&to=` |
| `streak()` | `{ current, longest, activeToday, atRisk, week: [{ d, date, on, today, future }] }`. `week` is Monday first. A streak that ran through yesterday stays alive today with `atRisk: true`. | compute on the server from the same days, so it agrees across devices |
| `heatmap(weeks = 26)` | `{ weeks, cells: [{ date, ts, n, story, sheet, code, revisit, level 0-4, future, today }], total, activeDays, todayIndex }`, Sunday-first columns | `GET /me/heatmap?weeks=26` |
| `xp()` | `{ total, week, today, level, into, need, pct }`. 500 XP a level. | `GET /me/xp` |
| `XP`, `XP_RULES` | points per event: story 50, code 30, lesson 30, sheet tick 10, revisit card 5, mock interview 20 | server config |
| `stories()` | `{ ids, count, at: { id: ts } }` | `GET /me/stories` |
| `codePasses()` | `{ ids, count }` | `GET /me/code` |
| `lessons()` | `{ ids, count }`, ids prefixed `git:`, `sd:`, `ai:` | `GET /me/lessons` |
| `sheet()` | `{ ticked, starred, total, done }` | `GET /me/sheet`; the Sheet page already exports and imports this shape |
| `problemStatus(id)` | `'done'`, `'now'` (the open problem) or `'todo'` | derived from the above |
| `bindCatalog(PROBLEMS)` | makes each problem's `status` a live getter over `problemStatus`. Runs automatically on pages with the catalog. | none |
| `patterns(PROBLEMS, PATTERNS)` | `[{ name, tag, companion, done, total, pct }]` | derived |
| `medals(PROBLEMS, PATTERNS)` | `[{ pattern, mark, tier, next: { tier, have, need, unit, pct } or null, fresh, key, done, total }]`. Bronze: first story in the pattern. Silver: half its stories. Gold: every story done and rated in Revisit. | `GET /me/medals`, with `fresh` set by the server |
| `markMedalsSeen(medals)` | nothing | `POST /me/medals/seen` |
| `profile()` | `{ name, initials, signedIn, isNew, lang, goal, reason, date, demo: false }` | `GET /me` |
| `eraseProgress()` | nothing. Removes the activity log, sheet ticks, revisit cards (`dsaviz-review-v1` and the old deck), seen medals, the predict streak, mock interviews, saved stories, saved code and system design progress from this browser. Notes, theme, profile and settings stay. | `DELETE /me/progress` |
| `schedule(card, grade, ts)` | the pure SM-2-style scheduler. Grade 1 Again, 2 Hard, 3 Good, 4 Easy. First review: 1 / 3 / 6 days; then x1.2 (Hard), x ease (Good), x ease x 1.3 (Easy), at least +1 day, capped at 365. Again: tomorrow, reps reset, ease -0.2. Ease 1.3 to 3.0, starts at 2.5. | server-side scheduler |
| `reviewCards()`, `reviewDue()`, `reviewUpcoming(days = 7)` | every finished story and ticked sheet problem as a card `{ id, kind, due, isDue, late, inDays, interval, ease, reps, name, pattern, rule, hint }`; a card never rated is due the day after it was earned. Upcoming adds `counts: [{ date, n }]` from tomorrow. | `GET /me/revisions?due=today` |
| `review(id, grade, { redo })`, `reviewPreview(id)`, `addCard(id, meta)`, `whenLabel(days)` | rate a card; what each grade would do; store card details | `POST /me/revisions/{id}` |
| `retention(days = 30)` | `{ pct, reviews, recalled, today }`: share of reviews not rated Again; `pct` is null before the first review | `GET /me/retention` |
| `mockPick(cands, cfg, rand)`, `mockStart(cfg, picks)`, `mockSession()` | picks 1 (30 min) or 2 (45, 60 min) unsolved problems for the difficulty mix (`easy`, `standard`, `hard`) and optional pattern; starts and reads the live session with `limit`, `used`, `left`, `over`, `ended`, `allSubmitted` | `POST /me/mocks`, `GET /me/mocks/live` |
| `mockRecord(pid, mode, passed, total)`, `mockHint(pid)`, `mockNotes(text)`, `mockExtend(min)`, `mockEnd()`, `mockAbandon()` | update the live session; the best Submit per problem counts; nothing changes after `mockEnd` | `PATCH /me/mocks/live` |
| `mockScore(scores, hints)`, `mockSave(scores)`, `mockHistory(n = 10)` | rubric math over `MOCK_AREAS` (understanding 10, approach 25, code 20, correctness 20, complexity 15, communication 10; each 1-4 gives (s-1)/3 of its weight), minus `MOCK_HINT_COST` (3) per hint; bands pass 70+, borderline 50-69, no hire below. Practice only. History: `{ list, count, trend, best, avg, change }` | `POST /me/mocks/{id}/score`, `GET /me/mocks` |
| `start()`, `startPass(exercise)`, `startFinish(lesson)`, `startVisit(lesson, stage)`, `startPlace(lessons)` | Start here progress. A passed exercise logs a `start` activity (10 XP once, counts for the streak); a finished lesson logs the lesson `start:<id>` (30 XP) and becomes a Revisit card (`kind: 'start'`). | `GET/POST /me/start` |
| `startMedals()`, `startRing()` | The Start here medal sets (one per Level 1 chapter, one for the bridge and counting steps, and one per part of Levels 2 and 3 once written: bronze for one lesson, silver for half, gold for every lesson and exercise; `DS.medals` includes them) and Level 1 as one ring (`null` before the learner starts). The build fills `START_MEDALS` from src/start. | derived |
| `startCounts(level, ids)`, `startOutline()` | Lesson counts `{ total, ready, done, pct, ids }` for a level (or every level with `null`) or for a list of lesson ids. The one source for every Start here count: the hub, the roadmap's lanes and node cards, Home and Profile. `done` includes lessons marked known. The build fills `START_OUTLINE` from src/start/chapters.js. | derived |
| `predict()`, `logPredict(ok)` | `{ streak, best, right, total }` for predict-the-next-step picks; `logPredict` returns the new counts | `GET/POST /me/predict` |
| `note(id)`, `notes()`, `setNote(id, text)`, `mergeNotes(map)` | notes per problem | `GET/PUT /me/notes/{id}` |
| `exportBackup()`, `importBackup(file)` | the sheet backup file `{ v: 1, done, star, notes }`; import merges (earliest tick wins, a note is replaced only by a newer one) and returns `{ ticks, notes }` or null | `GET/POST /me/backup` |
| `dayKey(ts)`, `setClock(fn)` | helpers; `setClock` is for tests | none |

## Demo functions

| Function | Returns | A real API would |
| --- | --- | --- |
| `leaderboard(tab)` | `{ demo: true, tab, rows: [{ name, where, xp, streak, me, rank, seed }], you: { rank, of, xp, toPromotion } }`. `tab` is `league`, `all`, `friends` or `college`. 19 sample learners, plus the learner's real row: weekly XP on `league` and `friends`, total XP otherwise. | `GET /leagues/current`, `GET /leaderboard?scope=all|friends|college` |
| `buddies()` | `{ demo: true, list: [{ name, initials, where, streak, learnedToday }] }` | `GET /me/buddies`, plus `POST /me/buddies/{id}/nudge` |
| `feed()` | `{ demo: true, list: [{ who, verb, what, tag }] }` | `GET /feed` (opt-in, anonymised) |

To switch one of these to a server, keep its return shape, fetch into a cache when the page mounts, return the cache from the function, and drop `demo: true`. The "Demo" tags are tied to `demo`, so they go away with it.

## Contest calendar (placeholder rules)

The Contests page does not fetch anything. `shared/contests.js` (copied into the page between `// @@CONTESTS@@` markers) lists each recurring contest as a rule: `{ id, platform, name, start, rrule, minutes, link }`, where `start` is one known start in UTC and `rrule` is an iCalendar weekly rule (`FREQ=WEEKLY`, optionally `INTERVAL=2`). `contestDays(now, tz, 14, platforms)` expands the rules into the next 14 local days, and `contestIcs(runs, stamp)` writes the `.ics` file in the browser. Codeforces has no fixed day, so it has `rrule: null` and a link to its own calendar. The page tells learners that times follow each platform's usual schedule and to check the platform before they start. `tests/contestcheck.js` pins the dates across time zones and daylight saving, and checks the `.ics` output.

This is a stand-in until there is a backend. A real one would:

- `GET /contests?from=&to=`: fetch each platform's published schedule on a timer (Codeforces, AtCoder and CodeChef all list upcoming contests), store them as `{ id, platform, name, start, end, link }` in UTC, and serve the next few weeks. Codeforces rounds would then show up on the calendar.
- Keep the same run shape (`{ c, start, end }`), so `contestDays` and `contestIcs` work on fetched runs unchanged. Fall back to the rules when the request fails or the site is offline.
- Later: reminders (`POST /me/contest-reminders`) and a subscribable calendar feed (`GET /me/contests.ics`), which need accounts.

The selected platform chip is kept in `dsaviz-contest-filter` (`All`, `Codeforces`, `AtCoder` or `CodeChef`; an older saved value falls back to `All`).

## Shared components

`shared/ui.js` builds view models and `shared/ui/*.html` holds the markup. The build copies each between its comment markers (`PILL NAV`, `STAT TILES`, `RINGS`, `MEDALS`).

| Builder | Markup | Holes |
| --- | --- | --- |
| `navVals(cmp, t, themeKey, page)` in `shared/nav.js` | `shared/ui/nav.html` plus the menu drawer | `nav.*`, `drawer*`, `menu` |
| `statTiles(t, [{ icon, color, value, unit, label, pct }])` | `shared/ui/tiles.html` | `tiles` |
| `ringSet(t, [{ label, value, pct, color }], size, stroke)` | `shared/ui/rings.html` | `rings` |
| `medalShelf(t, DS.medals(...), slots, freshKeys)` | `shared/ui/medals.html` | `shelf` |

The nav lists Home, Learn, Sheet, Code, Git, System design and AI/ML. Every section now has a page; a section whose page is missing from `pages/` would show as "Soon", because the build fills `NAV_PAGES` from the folder. The one-screen pages (Story, Code, Git, System design, AI & ML and their lesson players) keep their 900px layouts: the nav replaces their old header. Below 760px the nav moves to a fixed bar at the bottom at real size, using the `--fit` zoom that `scripts/site-runtime.js` sets. Every animation stops under `prefers-reduced-motion`.
