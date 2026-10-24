# DSAMaxxing

Data structures and algorithms, taught as animated stories. Every problem has a story, a cast of characters per pattern, three explanation depths (kid, builder, expert) and code in Python, Java, C++, JavaScript and Go.

## See it

Open `dist/index.html` in any browser by double-clicking it. That one file is the whole website: 15 linked pages, 9 animated stories, and four themes: Max (the default: near-black, volt lime, Anton headlines, Outfit body), light, dark and terminal. It needs no server and no internet apart from the web fonts.

Or serve it locally:

```bash
npm start            # http://localhost:5173
```

## Work on it

Requirements: Node 18+ and Python 3.

```bash
npm install          # React, used only to bundle the site
npm run build        # sync shared code into pages/, then bundle dist/index.html
npm test             # logic back-test of every page + every animated story
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
| `scripts/build_pages.py` | Copies `shared/` and `src/` into the matching blocks of `pages/`. |
| `scripts/build_site.py` + `site-runtime.js` | Bundles all pages into `dist/index.html` with a small React renderer (no eval). |
| `tests/` | `backtest.js`, `scenecheck.js`, `sheetcheck.js` (master sheet integrity), `site-test.js`. |

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

## State

Progress lives in the browser's `localStorage` under `dsaviz-*` keys (kept from the old name so existing progress survives the rename): theme, user, problem, lang, saved, deck, prefs, onboard. The master sheet keeps ticks and stars in `dsaviz-sheet-v1` as `{ v: 1, done: { id: timestamp }, star: { id: 1 } }`, and can export or import that as a JSON file. There is no backend yet. The contact form prepares an email to mahikshith97@gmail.com rather than sending one.

## Known gaps

- 14 of 58 stories are animated (Two Pointers, Sliding Window, Hash Map, Stack, Greedy, Intervals). The rest have story, synopsis and briefing.
- Language basics: only chapter 03 is written.
- Pages are laid out at 1440px and scaled down on small screens; there is no dedicated mobile layout.
- Success stories on the landing page are labelled illustrative. Replace them with real, consented stories before launch.
