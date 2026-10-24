# DSAMaxxing (repo: dsaviz) — notes for Claude Code

DSA learning site: problems told as stories with step-by-step animations. Static only, no backend. See README.md for layout.

## Workflow

- Never hand-edit the generated blocks inside `pages/*.dc.html`: `@@THEMES@@`, `@@CATALOG@@`, `@@DRAWER@@`, `@@TESTS-SPEC@@`, `@@MOCK-HINTS@@` (sheet hints for the mock interview), `@@SOLVE@@` (sheet row id to problem page id, every page), `@@SHEET@@` (Sheet and Code pages), `@@RUNNER@@`, `@@CODE-PANE@@`, `@@SQL-SPEC@@`, `@@SQL-PANE@@`, `<!-- SQL PANE -->`, `@@GITSIM@@` (from `src/git/`), `@@SDLESSONS@@` (from `src/sd/`), `<!-- MENU DRAWER -->`, `<!-- CODE PANE -->`, the Story engine, and the bodies and scripts of Revisit, Profile, Welcome and Code. Edit `shared/` or `src/` and run `npm run build`.
- Other page markup and page-specific scripts are edited directly in `pages/*.dc.html`.
- After any change: `npm run build && npm test`. The tests must print "all clear", "data clean", "mock interview clean", "all scenes clean" and "all specs pass", "all sql specs pass", "sheet clean", "all git steps consistent", "all system design lessons consistent", "all ai lessons valid", "search clean", "copy clean", "contests clean", "pwa clean", "links clean", "registry clean" and "start here clean".
- `dist/index.html` is generated and committed so the site opens without a build. Rebuild it before committing.

## Conventions

- Every new problem goes through the problem registry: the beginner track, the 800 batch, research ideas, new stories, anything. Add it to the master sheet (`shared/sheet.js`) with its spec, run `npm run build` (it rebuilds `data/problem-registry.json` and `docs/problems/REGISTRY.md` with `scripts/build_registry.js`), and `tests/registrycheck.js` fails when its normalized title or an alias is taken, or when a problem with the same signature and pattern has a near-identical statement (similar ones are listed for review). Check REGISTRY.md before writing a problem. No outside problem numbers in it.
- Every problem is ours. Sheet rows, Today's 5, the random pick, Revisit cards, briefings and pattern cards open our own problem page (`Code.dc.html?problem=<pid>`) or the story. The shipped site never names or links an outside problem site and shows no outside problem numbers; `tests/linkcheck.js` fails the build otherwise. Statements, examples and tests are written in our own words.

- Themes: `max` (default: near-black, volt lime `#C5F04A`, Anton display, Outfit body), `paper` (light), `ink` (dark), `field` (terminal, monospace). Anton is uppercased by page CSS; paragraphs, italics and small text set in `t.display` fall back to Outfit automatically. Colors come from `THEMES` tokens (`t.text`, `t.accent`…), never literals in markup, except inside the always-dark story scene.
- Every `<button>` needs an `onClick`. Links between pages use `href="X.dc.html"`, never `href="#"`.
- Phones: every page has a real layout below 760px. A page root carries `data-fluid="true" data-page="Name"`; the shared rules in `shared/ui/phone.html` (copied into each helmet between `<!-- PHONE CSS -->` markers) stack it into one column with 16px gutters, and per-element `data-m` words (`pad`, `col`, `wrap`, `hide`, `two`, `one`, `keep`…) fine-tune it. Page-only phone rules go in that page's helmet inside `@media (max-width: 759px)`, scoped with `[data-page="Name"]` (helmets are global). Keep desktop pixel-identical: phone CSS lives only inside the media query. `dsPhone()` (shared/ui.js) is the runtime flag for content changes; the page re-renders when it flips. When phones show blocks in another order, render them in that order with `phoneOrder()` (shared/ui.js) instead of CSS `order`, so tab and screen-reader order match what is seen. The problem page's storyboard is laid out again at real size on phones (`phoneScene()` in src/story/comp.js). `npm run test:browser` checks every page at 390x844.
- Each page root is a fixed `width: 1440px; height: Npx` div. If content grows, raise the height in three places: the root div, `$preview.height` in `data-props`, and the board's `h` in `pages/canvas.json`. The terminal theme runs taller, so size for it.
- Companions per pattern are in `PATTERNS` in `shared/catalog.js`. Old Hoot is the mentor everywhere. The Start here track adds Dot (a new learner) and Bolt (a literal robot), in `START_CAST` (src/start/engine.js) and `STORY_CAST`.
- Start here (programming from zero) is all our own writing: lessons, stories and exercises are never adapted from another course, whatever its licence. Never mention LeetCode in the track; tests/startcheck.js fails on it.
- Learner data comes only from `DS` (`shared/data.js`, see docs/BACKEND.md). No hard-coded streaks, XP or names; sample data for server features is flagged `demo: true` and shown with a Demo tag.
- Every page except Auth and Welcome starts with the shared pill nav: put `<!-- PILL NAV --><!-- /PILL NAV -->` in the markup and `...navVals(this, t, themeKey, 'Page')` in `renderVals`. Spacing uses 4/8/12/16/24/32.
- Copy style: plain, direct sentences. No placeholder brackets.

## Skills

Project skills live in `.claude/skills/`. Review notes and licenses: `docs/research/skills.md`.

- Before building or changing any screen, check the installed skills: the project `.claude/skills`, plus the global skills and plugins (frontend-design, design:design-critique, design:accessibility-review, design:design-system, and the motion and storytelling skills here). Follow the relevant ones. Afterwards, check the result against them with design-critique and accessibility-review passes on screenshots. If a skill doesn't fit, or its check fails for a good reason, use judgment and note the decision in the PR description.
- Story scenes (beats, hero element, camera): `explainer-engaging` (one hero travels through stations, camera follows, pull-out reveal) and `data-storytelling` (hook, context, rising action, climax, resolution; progressive reveal).
- Motion and easing: `motion-design` (LottieFiles: durations, easing, choreography, 1/3 rules, reduced motion) and `design-motion-principles` (frequency gate, create/audit motion, reduced motion is mandatory).
- Explainer pacing: `explainer-default` (one line at a time, camera pushes in, ~2 s holds), `explainer-high-energy` (beat-locked, shape carries every transition). Use their story and pacing rules; their `render.mjs` / `npm i playwright` step is not part of our build.
- Graphics and video: `motion-broll` (one morphing shape, spring engine, pure `seek(t)` frames) and `sound-effects` (cue list, CC0 sfx library, loudness checks). Both ship scripts: don't run them without the owner's OK.
