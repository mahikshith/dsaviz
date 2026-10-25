# DSAMaxxing status (2026-10-25)

## Merged into the default branch (`claude/gracious-edison-tx7t62`)

- **#45 player controls, #46 editor settings:** Play/Pause in every player, plus editor settings, submission history, streak freeze and Core skills 20. The sheet now has 562 problems.
- **type-scale:**
  - Site-wide reading scale through `var(--fsN)` tokens (scripts/typescale.py): body 17–18px, labels 15–16px, chips 13px.
  - Text size setting (Normal / Large / Extra large) in the menu, plus an automatic lift for 1280px screens.
  - Stage text minimums: labels 14px and captions 16px on screen.
  - Code editor at 16px.
  - Speed button (0.5×–2×, remembered) next to Play in every player.
  - Readability pass in tests/site-test.js: no reading text under 15px and no pane 40% or more empty.
- **info-tips:** an "i" button on section headers in the lesson, problem, story and About pages.
- **about-tab, about-wire, about-ml/now, sd-about-hld/lld, concepts-about-a/b, start-about, start-wire:** an "About this lesson" tab on every AI & ML (29), System design (40), DSA concept (37) and Start here (50) lesson. Math is rendered at build time with KaTeX to MathML. The tab opens on a lesson's first visit.
- **plain-ai + ai-review-fixes, sd-plain + sd-fixes, concepts-plain + concepts-fixes:**
  - Plain-English rewrites of each track.
  - Beginner reviews found 213 / 291 / 179 issues, all fixed. Notes are in the workspace's notes/review-*.md.
- **readcheck:** tests/readcheck.js enforces plain English on AI & ML, System design, DSA concepts and Start here.
- **start-fixes, start-plain:**
  - Start here: guides row removed; Exercise N of M header; "Your variables" and "Step-by-step table".
  - Plain wording; the guide speaks as plain text.
- **start-fixes-2 (partial):** beginner-review fixes for Start here lessons 1–12 only (real Python error messages, type() output and the like).
- **no-mascots:** Old Hoot, Dot, Bolt, Lumi, Roo and the rest are replaced by plain roles everywhere. copycheck and startcheck fail on the old names.

## Not finished

- **Start here beginner review, lessons 13–50:**
  - The list is in the workspace notes (review-start-beginner.md and review-start-fixes.md).
  - Known wrong fact still open: the `init` About calls `__init__` a constructor.
  - Leftover data names to clean: bolt, nova, Ray, Kim in Level 3 code.
- **Stories (62):** not rewritten in plain English yet, and no beginner review. Their About-style intro does not exist yet.

## Remaining queue, in order

1. Start here review fixes for lessons 13–50 (see above).
2. Stories: plain-English rewrite, then a beginner review and its fixes.
3. Guided animated tour of the pages.
4. Start here Levels 4–5.
5. AI & ML batch 4 (~20 lessons) and the unsupervised batch (~10).
6. Problems 562 → 800 through the registry.

Already done, so not in the queue:
- speed control
- Text size setting
- folder move (everything is in `C:\Users\mahik\Desktop\DSAMaxxing\`; see its README)

## Rule for next week

One task at a time. Use Haiku or Sonnet subagents only for small, independent pieces, and never several big agents in parallel. Merge each piece, then build and run `npm test`. Run the browser test (`tools/edge-check.sh`, about an hour) only at the end of a batch.
