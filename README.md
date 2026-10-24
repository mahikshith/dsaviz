# DSAMaxxing

Data structures and algorithms, taught as animated stories. Every problem has a story, a cast of characters per pattern, three explanation depths (kid, builder, expert) and code in Python, Java, C++, JavaScript and Go.

## See it

Open `dist/index.html` in any browser by double-clicking it. That one file is the whole website: 19 linked pages, 32 animated stories, a code editor that runs JavaScript and Python in the browser, a step-by-step Git visual, a System design section (12 animated HLD and LLD lessons), and four themes: Max (the default: near-black, volt lime, Anton headlines, Outfit body), light, dark and terminal. It needs no server and no internet apart from the web fonts.

Or serve it locally:

```bash
npm start            # http://localhost:5173
```

## Work on it

Requirements: Node 18+ and Python 3.

```bash
npm install          # React, CodeMirror and esbuild, used only to bundle the site
npm run build        # sync shared code into pages/, then bundle dist/index.html
npm test             # back-test of every page, every animated story, every test spec, the sheet, every Git lesson step and every system design lesson
npm run test:browser # optional; needs: npm install --no-save playwright && npx playwright install chromium
```

Edit, then `npm run build`, then refresh `dist/index.html`.

## Layout

| Path | What it is |
| --- | --- |
| `pages/*.dc.html` | One file per page: markup template, then a `<script type="text/x-dc">` with a `Component` class whose `renderVals()` fills the `{{holes}}`. |
| `pages/canvas.json` | Board positions for the design-canvas view. |
| `shared/` | Code copied into every page by the build: themes (`themes_common.js`), the problem catalog (`catalog.js`), the master sheet (`sheet.js`, Sheet page only), the menu drawer. |
| `src/story/` | The story engine: `scenes_tp.js` (Two Pointers, engine header), `scenes_sw.js`, `scenes_hm.js`, and one `scenes_<code>.js` per newer pattern; `tail.js` (scene registry and quiz kits), `comp.js` (the player), `story_body.html` (its markup). |
| `src/pages/` | Sources for the Revisit, Profile and Welcome pages. |
| `src/code/` | The Code page (`code_body.html`, `code.js`: problem on the left, code pane on the right) and the CodeMirror editor entry (`editor.js`). |
| `src/git/` | The Git page's model: `sim.js` (a small Git: files, staging area, commits, branches, origin, stash) and `lessons.js` (8 lessons, one command and one caption per step). |
| `shared/tests_spec.js` | Test spec per problem: signatures in 5 languages, 3 examples, hidden cases, comparator, JS reference. |
| `shared/code_pane.html` + `code_pane.js` | The self-contained code pane (`CodeRunner`): language tabs, timer, editor, Run/Submit, custom input, console. Any page can drop it in with the `<!-- CODE PANE -->` and `// @@CODE-PANE@@` markers. |
| `shared/runner.js` | Runs learner code: JavaScript in a Blob Web Worker (3 s limit), Python in Pyodide from jsDelivr (5 s limit). |
| `scripts/build_pages.py` | Copies `shared/` and `src/` into the matching blocks of `pages/`. |
| `scripts/build_site.py` + `site-runtime.js` | Bundles all pages into `dist/index.html` with a small React renderer (no eval). It runs `scripts/build_editor.js` (esbuild) and inlines the editor inside `window.DS_EDITOR_LOAD`, so it is only parsed until the Code page opens. |
| `src/sd/` | System design: `engine.js` (frames, number formats, progress, node sizes) and `lessons.js` (9 HLD and 3 LLD lessons as data: nodes, links, steps). Used by `SystemDesign` (the hub) and `SDLesson` (the player). |
| `tests/` | `backtest.js`, `scenecheck.js`, `sheetcheck.js` (master sheet integrity), `specs.js` (every spec complete; JS references pass every case), `gitcheck.js` (replays every Git lesson), `sdcheck.js` (validates every system design lesson), `site-test.js`. |

Edit shared code in `shared/` or `src/`, not inside `pages/`; the build overwrites those blocks.

### Template syntax used in pages

- `{{path.to.value}}` in text or attributes. A lone hole in an attribute passes the raw value, such as a function for `onClick`.
- `<sc-for list="{{items}}" as="it">…</sc-for>` repeats, `<sc-if value="{{flag}}">…</sc-if>` shows conditionally.
- `onClick`, `onChange`, `onMouseEnter`, `onMouseLeave`, `onTouchStart`, `ref`.
- Links to `X.dc.html` move between pages. `hint-*` attributes are editor hints and are ignored.

## Add an animated story

1. Write a scene function in the right `src/story/scenes_*.js` (copy a sibling). It returns items, steps (each with `kind`, `dialog`, narration at three depths, `meter`, `watch`), code in five languages, and a `lines` map from step kind to code line.
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

Use `visual: 'letters'` with per-step `cells` states (`in`, `out`, `cur`, `hit`, `dup`, `ok`, `paint`, `stored`, `buy`, `best`) or `visual: 'planks'` for bar heights. Give `actorLabels` one name for a single walker or two names for an L/R pair.

For maps, floors and tables use `visual: 'grid'` (see `scenes_mx.js`, `scenes_df.js`, `scenes_bf.js`, `scenes_dp.js`). `items` is a 2D array of values, up to 8 by 8, and every step carries `cells`, a 2D array of the same state names in the same shape. Optional per step: `vals` (the values at that moment, for tables that fill in or tiles that move), `path` (a list of `[r, c]` drawn as a line under the tiles) and `actorAt: [r, c]` (the companion's badge; `cast` must be a `STORY_CAST` key). Optional per scene: `rowHeads`/`colHeads` to replace the faint indices, `legend` as `[[state, label]]` (use `'path'` for the line), and `maxTile`. Code lines can carry a third element naming the step kinds they serve, and `lines: tagLines(code)` builds the lines map. `scenecheck.js` fails if any step's grid is a different shape from `items`.

## Add a Git lesson

1. Add an entry to `GIT_LESSONS` in `src/git/lessons.js`: a start (`empty`, `local` or `cloned`) and steps of `[command, caption]`. Keep captions to one idea in short, everyday sentences.
2. If a command is new, teach it to `gitRun` in `src/git/sim.js`.
3. Run `npm run build && npm test`. `gitcheck.js` fails if Git would refuse a step, if a commit saves something that was not staged, or if a caption runs long.

## Add a system design lesson

1. Add an entry to `SD_LESSONS` in `src/sd/lessons.js`: `nodes` (box centres on a 1080 × 440 canvas; kinds `client`, `lb`, `server`, `cache`, `db`, `queue`, `cdn`, `dns`, `worker`, `limiter`, `car`, or `class`/`iface` with `lines`), `links`, and 8 to 15 steps. Each step has a `cmd`, one `say` caption (140 characters at most) and one `focus`, plus any of `add`, `drop`, `mark`, `sub`, `go` (requests along links), `nums` and `math`.
2. Put the arithmetic behind a number in `check` (`qps`, `gb`, `ms`, `cap`, `b62`) so the test recomputes it.
3. HLD lessons adapted from the System Design Primer set `credit: 'sdp'`, which shows the CC BY 4.0 credit on the lesson. Write every word yourself.
4. Run `npm run build && npm test`. `sdcheck.js` fails if a step names a missing or hidden node, a request skips a drawn link, boxes overlap, a caption runs long, or a number disagrees with its check.

## State

Progress lives in the browser's `localStorage` under `dsaviz-*` keys (kept from the old name so existing progress survives the rename): theme, user, problem, lang, saved, deck, prefs, onboard, `dsaviz-code-v1` (code per problem and language), and `dsaviz-sd-progress` / `dsaviz-sd-lesson` (furthest step per system design lesson, and the lesson to open). The master sheet keeps ticks and stars in `dsaviz-sheet-v1` as `{ v: 1, done: { id: timestamp }, star: { id: 1 } }`, and can export or import that as a JSON file. There is no backend yet. The contact form prepares an email to mahikshith97@gmail.com rather than sending one.

## Add a coding problem

Add a spec to `TEST_SPECS` in `shared/tests_spec.js` (write the inputs yourself), then `npm run build && npm test`. The Code page opens with `?problem=<id>` or the last problem picked anywhere on the site. Java, C++ and Go are edit-only for now.

## Known gaps

- 32 of 58 catalog problems have an animated story, covering 15 of the 16 patterns (Backtracking is next). The rest have story, synopsis and briefing.
- Language basics: only chapter 03 is written.
- Pages are laid out at 1440px and scaled down on small screens; there is no dedicated mobile layout.
- Success stories on the landing page are labelled illustrative. Replace them with real, consented stories before launch.
