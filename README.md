# DSAMaxxing

Data structures and algorithms, taught as animated stories. Every problem has a story, a cast of characters per pattern, and code in Python, Java, C++, JavaScript and Go. Each problem opens on one page: the task in plain words, one example and the animation on the left; the solution (with the running line lit) and your own code on the right.

## See it

Open `dist/index.html` in any browser by double-clicking it. That one file is the whole website: 22 linked pages, 40 animated stories covering all 16 patterns, a master sheet of 553 problems, a code editor that runs 351 problems' tests in JavaScript and Python in the browser plus SQL practice on SQLite, a step-by-step Git visual, a System design section (29 animated lessons: 14 HLD fundamentals, 6 four-step case studies, 9 LLD), 21 animated AI & ML lessons, and four themes: Max (the default: near-black, volt lime, Anton headlines, Outfit body), light, dark and terminal. It needs no server and no internet apart from the web fonts.

Or serve it locally:

```bash
npm start            # http://localhost:5173
```

### Install it as an offline app

Served over http(s), the site is an installable web app that works offline. The build writes these next to `index.html`:

| File | What it does |
| --- | --- |
| `dist/manifest.webmanifest` | Name (DSAMaxxing), colours (`#0A0A0B` background, lime `#C5F04A` icon) and icons. |
| `dist/sw.js` | Cache-first service worker. It caches `index.html`, the manifest, the icons and the web fonts on install, in a cache named after the build hash, so each new build replaces the old copy. Pyodide and sql.js files from the CDN are cached the first time a learner runs code. |
| `dist/icons/` | The lime "M" logo as PNG: 192 and 512 (rounded), a 512 maskable icon and a 180 apple-touch-icon. |

To host it, copy the whole `dist/` folder to any static host (GitHub Pages, Netlify, Cloudflare Pages, an S3 bucket, nginx) and keep `manifest.webmanifest`, `sw.js` and `icons/` in the same folder as `index.html`. Service workers need https (or `localhost`). Open the site once online; after that it loads with no network, and the browser offers "Install". The worker is only registered over http(s): double-clicking `dist/index.html` still opens the single file exactly as before.

## Work on it

Requirements: Node 18+ and Python 3.

```bash
npm install          # React, CodeMirror and esbuild, used only to bundle the site
npm run build        # sync shared code into pages/, then bundle dist/index.html
npm test             # back-test of every page, the data layer, every animated story, every test spec, the sheet, every Git lesson step and every system design lesson and every AI & ML lesson
npm run test:browser # optional; every page at 1440px, then at 390x844 (phone) in max and paper
                     # needs: npm install --no-save playwright && npx playwright install chromium
                     # or: npm install --no-save playwright-core, then DS_BROWSER=msedge (or chrome) npm run test:browser
```

Edit, then `npm run build`, then refresh `dist/index.html`.

## Layout

| Path | What it is |
| --- | --- |
| `pages/*.dc.html` | One file per page: markup template, then a `<script type="text/x-dc">` with a `Component` class whose `renderVals()` fills the `{{holes}}`. |
| `pages/canvas.json` | Board positions for the design-canvas view. |
| `shared/` | Code copied into every page by the build: themes (`themes_common.js`), the problem catalog (`catalog.js`), the master sheet (`sheet.js`, Sheet page only), the data layer `DS` (`data.js`), the pill nav and menu (`nav.js`, `drawer.js`, `ui/nav.html`) and the shared components (`ui.js`, `ui/tiles.html`, `ui/rings.html`, `ui/medals.html`), and the phone layout rules (`ui/phone.html`). |
| `src/story/` | The story engine: `scenes_tp.js` (Two Pointers, engine header), `scenes_sw.js`, `scenes_hm.js`, and one `scenes_<code>.js` per newer pattern; `practice.js` (your own input and predict-the-next-step helpers), `tail.js` (scene registry and quiz kits), `tasks.js` (each problem in plain words), `comp.js` (the problem page), `story_body.html` (its markup). |
| `src/pages/` | Sources for the Revisit, Profile and Welcome pages. |
| `src/code/` | The Code page (`code_body.html`, `code.js`: problem on the left, code pane on the right) and the CodeMirror editor entry (`editor.js`). |
| `src/git/` | The Git page's model: `sim.js` (a small Git: files, staging area, commits, branches, origin, stash) and `lessons.js` (8 lessons, one command and one caption per step). |
| `src/ai/` | The AI & ML pages (`AIML` hub, `AILesson` player): `render.js` (scene to SVG, easing between steps) and `lessons.js` (21 lessons in two tracks: 11 ML foundations, 10 AI now; each step is one caption plus a scene of points, lines, nets, tokens, attention arcs or boxes and arrows; optional slider; sources for AI-now lessons). |
| `shared/pattern_intros.js` | The Library's pattern map (`PATTERN_MAP`: hand-placed nodes on a 6 by 10 grid, edges meaning "learn this first") and one card per node (`PATTERN_INTROS`: clues, a 5 to 8 line template, two common mistakes, companion, and links to stories, first sheet problems and runnable problems). The "use it when" line itself comes from `PATTERN_WHEN` in `catalog.js`. The build adds `SHEET_INDEX` (sheet slugs per group) so the map can count ticks. |
| `shared/tests_spec.js` | Test specs for 351 problems (every catalog problem plus popular sheet problems): signatures in 5 languages, 3 examples, 5+ hidden cases, comparator, JS reference. The top of the file documents how linked lists, trees, graphs, in-place answers and design classes are written as JSON. |
| `shared/code_pane.html` + `code_pane.js` | The self-contained code pane (`CodeRunner`): language tabs, timer, editor, Run/Submit, custom input, console. Any page can drop it in with the `<!-- CODE PANE -->` and `// @@CODE-PANE@@` markers. |
| `shared/runner.js` | Runs learner code: JavaScript in a Blob Web Worker (3 s limit), Python in Pyodide from jsDelivr (5 s limit). |
| `shared/sql_spec.js` | SQL problems (the sheet's SQL group): our own CREATE TABLE schema, a visible dataset plus 3 to 5 hidden ones (rows and expected result), output columns, ordered or any-order rows, a reference query and a tempting wrong one (`trap`). Also the helpers that build each dataset, run a query and diff the result. |
| `shared/sql_pane.html` + `sql_pane.js` | The Code page's SQL mode (`SqlRunner`): SQL editor, Run (visible dataset, result grid), Submit (every dataset, pass count, first failing dataset's diff) and the schema panel's data. SQLite is sql.js 1.14.2 from jsDelivr, in a Blob worker (4 s limit). |
| `scripts/build_pages.py` | Copies `shared/` and `src/` into the matching blocks of `pages/`. |
| `scripts/build_site.py` + `site-runtime.js` | Bundles all pages into `dist/index.html` with a small React renderer (no eval). It runs `scripts/build_editor.js` (esbuild) and inlines the editor inside `window.DS_EDITOR_LOAD`, so it is only parsed until the Code page opens. |
| `src/sd/` | System design: `engine.js` (frames, number formats, progress, node sizes) and `lessons.js` (20 HLD and 9 LLD lessons as data: nodes, links, steps). The hub shows three shelves: fundamentals, case studies (lessons with `method: true`) and LLD. Used by `SystemDesign` (the hub) and `SDLesson` (the player). |
| `scripts/build_search.js` + `shared/search.js` | Site search. The build turns the catalog, sheet, specs, Git, system design and AI lessons and the glossary into `SITE_INDEX` (the `@@SEARCH@@` block, also holding the counts pages show); `search.js` scores queries. The pill nav's search box (press `/`) opens results grouped by type. `build_site.py` keeps one copy of the index in `dist/index.html`. |
| `shared/contests.js` | The contest calendar's rules (Contests page): each recurring contest as a UTC start plus a weekly RRULE, the 14-day expansion in the learner's time zone, and the `.ics` writer. See docs/BACKEND.md. |
| `scripts/pwa.py` | Writes the offline app files (manifest, `sw.js`, icons) during `build_site.py`. |
| `tests/` | `mockcheck.js` (plays whole mock interviews on the Interview page with a stubbed runner), `contestcheck.js` (contest dates across time zones and daylight saving, valid `.ics`), `pwacheck.js` (manifest, icons, service worker, head links), `searchcheck.js` (index coverage, no duplicate keys, known queries), `copycheck.js` (fails on stale copy: old depth wording, trial claims, hard-coded counts), `backtest.js`, `mapcheck.js` (pattern map and intro cards), `scenecheck.js`, `sheetcheck.js` (master sheet integrity), `specs.js` (every spec complete; JS references pass every case), `sqlcheck.js` (every SQL reference passes every dataset on real SQLite, every trap fails one), `gitcheck.js` (replays every Git lesson), `sdcheck.js` (validates every system design lesson), `aicheck.js` (AI & ML lesson data), `site-test.js`. |

Edit shared code in `shared/` or `src/`, not inside `pages/`; the build overwrites those blocks.

### Template syntax used in pages

- `{{path.to.value}}` in text or attributes. A lone hole in an attribute passes the raw value, such as a function for `onClick`.
- `<sc-for list="{{items}}" as="it">…</sc-for>` repeats, `<sc-if value="{{flag}}">…</sc-if>` shows conditionally.
- `onClick`, `onChange`, `onMouseEnter`, `onMouseLeave`, `onTouchStart`, `ref`.
- Links to `X.dc.html` move between pages. `hint-*` attributes are editor hints and are ignored.

## Add an animated story

1. Write a scene function in the right `src/story/scenes_*.js` (copy a sibling). It returns items, steps (each with `kind`, `dialog`, `nar` (`kid` is the plain caption, `expert` fills the Go deeper fold, `builder` is still checked by scenecheck), `meter`, `watch`), code in five languages, and a `lines` map from step kind to code line.
2. Register it in `SCENE_LIST` in `src/story/tail.js`.
3. Set its `animated` flag to `true` in `shared/catalog.js`.
4. Run `npm run build && npm test`. `scenecheck.js` fails if a step kind has no code line or a narration is missing.

### A story for a new pattern

Patterns other than Two Pointers, Sliding Window and Hash Map live in their own file, `src/story/scenes_<code>.js`. The build picks up every `scenes_*.js` file, and the file registers itself, so `tail.js` and `comp.js` stay untouched:

```js
function guessScene() { /* same shape as lanternScene() */ }
SCENE_REGISTRY.push(guessScene);
PATTERN_KITS['Binary Search'] = { right: 1, spot: 'Why halve, not walk?', ask: 'How should Gus search?',
  quiz: [['Check every number', '…'], ['Halve the doubt', '…'], ['…', '…'], ['…', '…']] };
STORY_CAST.gus = { name: 'Gus', initial: 'G', color: 'left', radius: '999px' };  // color: a theme key or a hex
```

### Your own input and Predict

A story can also take the learner's own values. Below the scene function, register `SCENE_INPUT['my-id'] = { hint, example, presets, random, parse, show, check, make }` (see `src/story/practice.js` for the parsers, checks and `fitRow`). `make(input)` re-runs the simulation and returns the same scene shape: it keeps the story's code and rules and rebuilds `items`, `steps`, `example` and `answer`, with short template captions per step kind. `check` keeps visuals readable (3 to 9 items, grids up to 6 by 6, trees up to 15 nodes) and returns one plain sentence when the input is wrong. Stories without an entry hide the "Try your own input" fold. A step kind the story never needed (such as "not found") gets its code line from `runLines(base, { kind: /regex/ })` and a rule. Add a reference solver for the id to `REF` in `tests/scenecheck.js`: it runs every preset and 20 random inputs against it.

The Predict toggle builds each question from `rules`: the words after "→" are the choices and the next step's kind is the right one. Use `predictAlias` to fold kinds that share a rule, `predictFull: true` when the short forms sound alike, and `predictCue(step)` when the meter text would give the answer away. Picks are counted by `DS.logPredict`.

Add the problem in plain words to `STORY_TASKS` in `src/story/tasks.js` (two to four short sentences: the real task first, then the characters). `scenecheck.js` fails without it.

Use `visual: 'letters'` with per-step `cells` states (`in`, `out`, `cur`, `hit`, `dup`, `ok`, `paint`, `stored`, `buy`, `best`) or `visual: 'planks'` for bar heights. Give `actorLabels` one name for a single walker or two names for an L/R pair.

For maps, floors and tables use `visual: 'grid'` (see `scenes_mx.js`, `scenes_df.js`, `scenes_bf.js`, `scenes_dp.js`). `items` is a 2D array of values, up to 8 by 8, and every step carries `cells`, a 2D array of the same state names in the same shape. Optional per step: `vals` (the values at that moment, for tables that fill in or tiles that move), `path` (a list of `[r, c]` drawn as a line under the tiles) and `actorAt: [r, c]` (the companion's badge; `cast` must be a `STORY_CAST` key). Optional per scene: `rowHeads`/`colHeads` to replace the faint indices, `legend` as `[[state, label]]` (use `'path'` for the line), and `maxTile`. Code lines can carry a third element naming the step kinds they serve, and `lines: tagLines(code)` builds the lines map. `scenecheck.js` fails if any step's grid is a different shape from `items`.

For decision trees and binary trees use `visual: 'tree'` (see `scenes_bt.js`, `scenes_dft.js`, `scenes_bft.js`). `tree` is a list of `{ id, label, parent, side }` (one root, up to about 16 nodes and depth 4; `side: 'L'` or `'R'` keeps a lone child on its own side). The engine lays it out top-down. Every step carries `nodes`, a map from id to a state name; a node missing from the map is hidden, so a tree can grow as it is explored. Optional per step: `edge` (id → `'path'` or `'out'`, for the line into that node), `actorAt` (a node id), `vals` (id → new label), `tags` (id → a short note drawn beside the node; set `tags: true` on the scene) and `tree` (a reshaped copy with the same ids, for moves such as swapping children). A scene can also bring its own `kit` (quiz) when the pattern's default quiz is about another problem. `scenecheck.js` fails on duplicate ids, missing parents, loops, or a step that names a node that does not exist.

## Add an AI & ML lesson

1. Add an entry to `AI_LESSONS` in `src/ai/lessons.js` (and its id to `AI_ORDER`) with `make(p)` returning 8 to 15 steps of `{ say, focus, scene }`. Captions are one plain sentence or two, at most 140 characters, and never name a colour (colours change with the theme).
2. AI-now lessons need `sources`: title, org, date and an http(s) link to the primary source. Explain in our own words. A slider must recompute real maths: `aicheck.js` fails if its two ends give the same lesson.
3. Run `npm run build && npm test`. `aicheck.js` fails on long captions, missing references, off-canvas items or bad links.

## Add a Git lesson

1. Add an entry to `GIT_LESSONS` in `src/git/lessons.js`: a start (`empty`, `local` or `cloned`) and steps of `[command, caption]`. Keep captions to one idea in short, everyday sentences.
2. If a command is new, teach it to `gitRun` in `src/git/sim.js`.
3. Run `npm run build && npm test`. `gitcheck.js` fails if Git would refuse a step, if a commit saves something that was not staged, or if a caption runs long.

## Add a system design lesson

1. Add an entry to `SD_LESSONS` in `src/sd/lessons.js` (and its id to `SD_ORDER`): `nodes` (box centres on a 1080 × 440 canvas; kinds `client`, `lb`, `server`, `cache`, `db`, `queue`, `cdn`, `dns`, `worker`, `limiter`, `car`, `net`, `watch`, or `class`/`iface` with `lines`), `links`, and 8 to 15 steps. Each step has a `cmd`, one `say` caption (140 characters at most) and one `focus`, plus any of `add`, `drop`, `mark`, `sub`, `go` (requests along links), `nums` and `math`.
2. Put the arithmetic behind a number in `check` (`qps`, `gb`, `ms`, `cap`, `b62`) so the test recomputes it.
3. HLD lessons adapted from the System Design Primer set `credit: 'sdp'` (CC BY 4.0); LLD lessons whose problem idea comes from kousiknath/LowLevelDesign set `credit: 'kn'` (MIT). The lesson page shows the credit, and THIRD_PARTY_NOTICES.md lists it. Write every word yourself. A case study sets `method: true` and gives every step a `phase` 1 to 4; it must reach all four.
4. Run `npm run build && npm test`. `sdcheck.js` fails if a step names a missing or hidden node, a request skips a drawn link, boxes overlap, a caption runs long, or a number disagrees with its check.

## State

Progress lives in the browser's `localStorage` under `dsaviz-*` keys (kept from the old name so existing progress survives the rename): theme, user, problem, lang, saved, deck, prefs, onboard, `dsaviz-code-v1` (code per problem and language), and `dsaviz-sd-progress` / `dsaviz-sd-lesson` (furthest step per system design lesson, and the lesson to open). The master sheet keeps ticks and stars in `dsaviz-sheet-v1` as `{ v: 1, done: { id: timestamp }, star: { id: 1 } }`, and can export or import that as a JSON file. Pages read all learner data through `DS` in `shared/data.js`: streak, heatmap, XP, stories, sheet ticks and medals come from `dsaviz-activity-v1` and the keys above, so a new learner starts at zero. The league, buddies and feed need a server, so they are sample data marked with a Demo tag. [docs/BACKEND.md](docs/BACKEND.md) lists every function and where a real API plugs in. There is no backend yet. The contact form prepares an email to mahikshith97@gmail.com rather than sending one.

## Mock interview

The Interview page's Mock interview tab: pick a length (30 minutes is one problem, 45 or 60 is two), a difficulty mix, an optional pattern and Python or JavaScript. Start picks unsolved runnable problems and opens them in the shared code pane with a countdown, a think-aloud box and folded hints (each costs 3 points). The story and pattern stay hidden. The review shows tests passed, time and hints, then a six-area self-score (1 to 4 each, weighted to 100) with a pass, borderline or no-hire band, labelled practice only. Saved mocks go to `dsaviz-mock-v1`, draw a trend chart and count for the streak. The hints come from the sheet (`@@MOCK-HINTS@@`, built from `shared/sheet.js`).

## Add a coding problem

Add a spec to `TEST_SPECS` in `shared/tests_spec.js` (write the inputs yourself), then `npm run build && npm test`. A problem that is not in the catalog also needs `meta: [title, LeetCode number, difficulty, pattern]`. Linked lists, trees and graphs are written as arrays (level order with `null` for trees); set `io` so the runner builds the nodes. Every animated story must have a spec, or `tests/specs.js` fails.

The Code page lists every problem with a spec, grouped by pattern, and opens with `?problem=<id>` or the last problem picked anywhere on the site. Java, C++ and Go are edit-only for now.

## Add a SQL problem

Add an entry to `SQL_SPECS` in `shared/sql_spec.js`, keyed by the sheet's slug: `title` and `n` exactly as in the sheet's SQL group, `ask` in our own words naming every output column, `schema` (one `CREATE TABLE Name (col TYPE, ...)` per table, our own names), `cols`, `order`, and `sets` (the first is shown and run by Run; 3 to 5 more are hidden). Each set lists `rows` per table and the `want` rows. Write a `ref` query and a `trap` (the most tempting mistake), then `npm run build && npm test`. `sqlcheck.js` fails if the reference misses any set, if no set catches the trap, or if a table uses LeetCode's name. A problem that changes a table (a DELETE) sets `after`, the SELECT that reads the answer.

## Known gaps

- 40 of 57 catalog problems have an animated story, covering all 16 patterns. The rest have story, synopsis and briefing. Pages read these counts from `SITE_INDEX.counts`, so they stay current.
- Language basics: only chapter 03 is written.
- Pages are laid out at 1440px and scaled down on small screens. Two pages have their own phone layout: the problem page (`Story.dc.html`, `data-fluid`: below 760px it stacks problem, example, animation and code) and the Git page (`data-fit`).
- Success stories on the landing page are labelled illustrative. Replace them with real, consented stories before launch.

## Third-party code

The site bundles React and CodeMirror 6 (MIT), loads Pyodide (MPL-2.0) from jsDelivr when a learner runs Python and sql.js (MIT) when they run SQL, and uses Google Fonts under the SIL Open Font License. esbuild (MIT) is used only at build time. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for every component, its version and its licence.
