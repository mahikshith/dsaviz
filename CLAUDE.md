# dsaviz — notes for Claude Code

DSA learning site: problems told as stories with step-by-step animations. Static only, no backend. See README.md for layout.

## Workflow

- Never hand-edit the generated blocks inside `pages/*.dc.html`: `@@THEMES@@`, `@@CATALOG@@`, `@@DRAWER@@`, `<!-- MENU DRAWER -->`, the Story engine, and the bodies and scripts of Revisit, Profile and Welcome. Edit `shared/` or `src/` and run `npm run build`.
- Other page markup and page-specific scripts are edited directly in `pages/*.dc.html`.
- After any change: `npm run build && npm test`. Both tests must print "all clear" or "all scenes clean".
- `dist/index.html` is generated and committed so the site opens without a build. Rebuild it before committing.

## Conventions

- Themes: `paper` (light), `ink` (dark), `field` (terminal, monospace). Colors come from `THEMES` tokens (`t.text`, `t.accent`…), never literals in markup, except inside the always-dark story scene.
- Every `<button>` needs an `onClick`. Links between pages use `href="X.dc.html"`, never `href="#"`.
- Each page root is a fixed `width: 1440px; height: Npx` div. If content grows, raise the height in three places: the root div, `$preview.height` in `data-props`, and the board's `h` in `pages/canvas.json`. The terminal theme runs taller, so size for it.
- Companions per pattern are in `PATTERNS` in `shared/catalog.js`. Old Hoot is the mentor everywhere.
- Copy style: plain, direct sentences. No placeholder brackets.
