# DSAMaxxing (repo: dsaviz) — notes for Claude Code

DSA learning site: problems told as stories with step-by-step animations. Static only, no backend. See README.md for layout.

## Workflow

- Never hand-edit the generated blocks inside `pages/*.dc.html`: `@@THEMES@@`, `@@CATALOG@@`, `@@DRAWER@@`, `@@TESTS-SPEC@@`, `@@RUNNER@@`, `@@CODE-PANE@@`, `<!-- MENU DRAWER -->`, `<!-- CODE PANE -->`, the Story engine, and the bodies and scripts of Revisit, Profile, Welcome and Code. Edit `shared/` or `src/` and run `npm run build`.
- Other page markup and page-specific scripts are edited directly in `pages/*.dc.html`.
- After any change: `npm run build && npm test`. The tests must print "all clear", "all scenes clean" and "all specs pass".
- `dist/index.html` is generated and committed so the site opens without a build. Rebuild it before committing.

## Conventions

- Themes: `max` (default: near-black, volt lime `#C5F04A`, Anton display, Outfit body), `paper` (light), `ink` (dark), `field` (terminal, monospace). Anton is uppercased by page CSS; paragraphs, italics and small text set in `t.display` fall back to Outfit automatically. Colors come from `THEMES` tokens (`t.text`, `t.accent`…), never literals in markup, except inside the always-dark story scene.
- Every `<button>` needs an `onClick`. Links between pages use `href="X.dc.html"`, never `href="#"`.
- Each page root is a fixed `width: 1440px; height: Npx` div. If content grows, raise the height in three places: the root div, `$preview.height` in `data-props`, and the board's `h` in `pages/canvas.json`. The terminal theme runs taller, so size for it.
- Companions per pattern are in `PATTERNS` in `shared/catalog.js`. Old Hoot is the mentor everywhere.
- Copy style: plain, direct sentences. No placeholder brackets.

## Skills

Project skills live in `.claude/skills/`. Review notes and licenses: `docs/research/skills.md`.

- Before building or changing any screen, check the installed skills: the project `.claude/skills`, plus the global skills and plugins (frontend-design, design:design-critique, design:accessibility-review, design:design-system, and the motion and storytelling skills here). Follow the relevant ones. Afterwards, check the result against them with design-critique and accessibility-review passes on screenshots. If a skill doesn't fit, or its check fails for a good reason, use judgment and note the decision in the PR description.
- Story scenes (beats, hero element, camera): `explainer-engaging` (one hero travels through stations, camera follows, pull-out reveal) and `data-storytelling` (hook, context, rising action, climax, resolution; progressive reveal).
- Motion and easing: `motion-design` (LottieFiles: durations, easing, choreography, 1/3 rules, reduced motion) and `design-motion-principles` (frequency gate, create/audit motion, reduced motion is mandatory).
- Explainer pacing: `explainer-default` (one line at a time, camera pushes in, ~2 s holds), `explainer-high-energy` (beat-locked, shape carries every transition). Use their story and pacing rules; their `render.mjs` / `npm i playwright` step is not part of our build.
- Graphics and video: `motion-broll` (one morphing shape, spring engine, pure `seek(t)` frames) and `sound-effects` (cue list, CC0 sfx library, loudness checks). Both ship scripts: don't run them without the owner's OK.
