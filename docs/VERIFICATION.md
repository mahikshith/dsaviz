# Verification record

What was checked for the 0.5 rebuild, how, and what remains open. Recorded on 1 October 2026 on Windows 11 with Node 24.19 and npm 11.17.

## Commands run, and results

| Check | Command | Result |
| --- | --- | --- |
| Type check | `npm run typecheck` | Pass |
| Content validation | `npm run validate` | 0 errors; 4 expected warnings for the draft `depth-first-search` pattern, which has unfinished sections |
| Unit tests | `npm test` | 286 passed (7 files) |
| Production build | `npm run build` | Pass: 19 static pages in `out/` |
| Browser tests | `npm run test:e2e` | 53 passed. With `--repeat-each=2`: 106 of 106 |

### What the unit tests cover

- **Algorithm correctness against simple baselines.**
  - Both pair adapters are checked on every sorted array of length up to 5 with values 0–5, across all targets: more than 5,000 cases, compared semantically.
  - Both window adapters are checked against recomputing every window on 200 generated inputs, ties included.
  - Bracket matching is checked against repeated pair deletion on all 9,331 strings of length up to 5.
  - BFS is checked against unit-weight relaxation on 300 random graphs, including cycles, duplicate streets and unreachable goals.
  - The palindrome adapter is checked against clean-and-reverse on 400 strings.
  - Edge cases from the brief are covered: empty input, one element, duplicates, no solution, invalid k, k = 1, k = n, self-loops, unknown corners and unsorted rejection.
- **Trace correctness, separately from output.** For every adapter and sample:
  - The trace starts with `present` and ends on a terminal event.
  - Ids are sequential and every event is declared with its anchor, fields and variant.
  - Counters never decrease, and frames are frozen and share no state.
  - Traces are deterministic, every frame has a view, and pointers and bands stay in bounds.
  - Event and state agree (a pointer move changes exactly that pointer by one; `window_sum` equals the window's sum; the stack holds only openers; queue distances never decrease).
  - The voucher trace matches the brief's ten frames exactly.
- **Playback:**
  - Next then previous restores the same frame. Seek clamps, snaps and pauses, and long jumps are flagged so they skip animation.
  - A checkpoint blocks next, play and autoplay until answered or skipped.
  - A tick while paused does nothing. Speed, view and language changes keep the cursor.
  - Loading a run resets it, and rapid loads end on the last one.
- **Content rules.** The real content has no errors, and drafts are excluded. One problem appears in two patterns with a single record, and every situation is at most 180 words. Validation catches each of these, each injected into a copy of the content:
  - a missing section
  - an unknown adapter or pattern
  - a duplicate slug
  - a malformed example
  - a wrong expected output
  - a missing code anchor
  - a checkpoint on a frame that doesn't exist
  - a narration placeholder the event lacks
  - an unsafe link or raw HTML
  - a published path pointing at a draft
- **Progress:**
  - Milestones are separate, and watching a walkthrough never counts as practised.
  - One canonical record serves both pattern views. Checkpoint answers and bookmarks are reversible.
  - Malformed stored data is normalised. Saved progress persists and reloads; it survives storage that throws and works with no storage at all.
- **Colour contrast** for 40 foreground and background pairs in each theme (text 4.5:1, control and graphic boundaries 3:1), read from `globals.css`.

### What the browser tests cover (installed Chrome, production build)

- **Voucher lesson:**
  - Keyboard stepping, then the prediction gate, which moves focus to the question.
  - Wrong and then right answers with feedback, and Continue.
  - The highlighted code line follows the step, also after switching to TypeScript.
  - Previous, seek to the end, and the output.
- **Story and formal views:** the same frame in different wording.
- **Custom input:**
  - Unsorted prices are rejected for opposite pointers with a field error and `aria-invalid`, and a non-number names the bad token.
  - The same unsorted input runs with "check every pair".
- **Autoplay:** does not start on arrival, advances on its own, and stops at the checkpoint.
- **Progress:**
  - Practised and bookmarked survive a reload.
  - The busiest-days lesson counts in both Sliding window and Prefix sums.
  - My learning shows "1 of 5".
- **Catalogs:** practice filters live in the URL and survive reload; pattern search finds aliases ("moving range" finds Sliding window).
- **Mixed review:** pattern names stay hidden until revealed.
- **Glossary:** terms open a definition and close with Escape, returning focus.
- **BFS:** the graph, queue and unreachable example all work.
- **Reduced motion:** sets transition durations to 0 while state still updates.
- **No page-wide horizontal scroll** at 320 px and 768 px on 10 key pages. The story comes before the walkthrough on a phone.

## Manual inspection

In the in-app browser, against the dev server and the production build:

- Every route at 1440 × 900, in light and dark themes.
- The lesson workspace at 1024 × 768, where the rail becomes a drawer.
- Phones at 375 × 812 and 320 px; all 14 routes were measured for overflow.

Two layout bugs were found and fixed this way:

- The mode tabs stopped the lesson grid from shrinking below 403 px.
- A screen-reader-only label inside the scrolling code panel escaped its container and widened the page.

## Performance

JavaScript per page, gzipped, for modern browsers. The polyfills file is `noModule`, so modern browsers skip it.

| Page | JS | HTML (raw) |
| --- | --- | --- |
| `/` | 146 KB | 52 KB |
| `/patterns/` | 139 KB | 21 KB |
| `/practice/` | 151 KB | 27 KB |
| `/problems/book-voucher-pair/` | 151 KB | 74 KB |

About 126 KB of each page is the React and Next.js runtime; the app's own code is 4–15 KB per route. Each algorithm adapter is a separate 2–3 KB chunk, fetched only when a learner switches example or approach or enters custom input. The default walkthrough is pre-rendered into the HTML. These figures are close to the brief's "roughly 150 KB" target, not well under it. Core Web Vitals were not measured on real devices.

## Known limits and decisions

- **No code runner.** Practice is an honest scratchpad with samples and a self-check list. "Practised" is the learner's own judgement and says so.
- **Screen readers.** Structure, labels, live regions and focus handling were built and tested in automation. A pass with real NVDA, JAWS or VoiceOver has not been done.
- **Zoom.** 200% zoom is approximated by the 320 and 768 px checks (the same CSS widths); browser zoom itself was not driven separately.
- **Fonts.** The previous site's Fraunces, Instrument Sans and JetBrains Mono were kept instead of the brief's suggested Source family, to preserve the look the owner liked. Swapping them is a three-line change; see DESIGN_TOKENS.md.
- **Name.** "Pattern Atlas" is a placeholder; check it before launch.
- **Old content.** The previous 58-problem catalog and nine animated stories (git commit `9376a08`) were not ported. Each port needs an adapter (or an existing one) and content written to the contract.
- **Toolchain on this network.** Native binaries for Next.js SWC and Rollup could not be downloaded here, so the build used the WebAssembly fallbacks (`scripts/next.mjs`, and the `rollup` override). On a normal network the native packages install and are used automatically.
- **Trace cap.** The 2,000-frame cap is enforced, but per-adapter input limits keep real traces under 100 frames, so a 2,000-frame trace was not profiled in the UI.
