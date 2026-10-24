# Git visualizer: algomaster.io as the reference

Why this exists: the owner finds algomaster.io's Git visuals far clearer than ours, because they show the whole Git picture on one screen. This note records how theirs is laid out and how it behaves, then sets out our design. It covers layout and interaction only. No text, code, SVG or image of theirs was copied.

## Method

- Tool: the local REA MCP server (`rea`), `capture_browser_scenario` in launch mode with Microsoft Edge. Each call covered one to three pages, captured the DOM after each step, and took screenshots at 1440x900.
- Steps: we clicked the diagram's own controls (Reset, Previous step) through REA `click` actions and captured a screenshot after each, to see how the state changes. We used `press PageDown` to scroll long lessons.
- Date: 2026-10-24.
- Rules: no login, no premium content, and no bot check was hit. Several REA calls timed out or lost the browser and were re-run with fewer pages.
- Pages: see [links/git-visualizer.md](links/git-visualizer.md). There is no Git category under `/animations`: the index lists DSA, system design, concurrency, AI/ML and SQL, and `/animations/git` returns 404. Their Git visuals live inside the course lessons at `/learn/git/...`.

## What they do

### Where the visuals live

- The Git course is a three-column reading page: a chapter list on the left (167 chapters in 19 sections), the article in the middle, and "On this page" with reading progress on the right. A bottom bar has previous/next chapter, notes, star, complete and Ask AI.
- The step-by-step diagram sits inside the article, in a dark rounded card with a small toolbar above it: fullscreen, "practice drawing" and "explain with AI".
- Other lessons (for example three-way merge, rebase) mostly use prose plus code blocks in a Monaco-style shell box. Their commit-graph pictures were not visible in our captures.

### Layout of the staging-area diagram

- Three zones side by side as tall vertical lifelines: Working Directory, Staging Area, Local Repository. Each zone's name is a solid green label at the top and repeated at the bottom of its line.
- Lifelines are dashed vertical lines. State is shown as small amber chips sitting on a lifeline, for example a file with "(modified)" or "(staged)" in brackets, or a commit list.
- Commands are horizontal arrows between lifelines, labelled with the command in small bold text, such as an `add` arrow from the working line to the staging line and a `commit` arrow from staging to the repository.
- Time runs top to bottom, so the whole history of the example is visible at once, like a sequence diagram.

### Interaction

- A control strip under the diagram: Reset (keyboard R), Previous step, Play (Space), Next step, and a step counter "n / 9".
- A row of dots under the controls marks progress; the current dot is brighter.
- Each step reveals one more chip or arrow. Previous step removes the last one. We saw step 9/9 drop to 8/9 when Previous was clicked, removing the final repository chip.
- The diagram opens at its final step (9/9), so a reader first sees the whole picture and can then step back through it.

### Colours

- Dark card on a near-black page, with a brand green for accents and zone labels.
- Amber or yellow fill for state chips, white for arrows and their labels, grey for dashed lifelines.

## What makes it clear

1. **Every zone is on screen at once.** The reader never loses track of where a file is, because all three places stay visible.
2. **Commands are arrows between places.** `add` and `commit` read as movements, not as abstract verbs.
3. **One change per step.** Each step adds one arrow or one chip, so cause and effect stay paired.
4. **The end state comes first.** Opening on the finished picture gives an overview before the walk-through.
5. **Small, familiar controls.** Prev, Play and Next with a counter and dots, plus keyboard shortcuts.

Gaps we can improve on:

- Their diagram is a static sequence chart: files do not visibly travel, and there is no commit graph, branches, HEAD or remote in the same view.
- Each lesson has its own separate diagram, so the reader rebuilds the mental picture each time.
- Captions are in the surrounding article, not tied to the current step.

## Our design (built in `pages/Git.dc.html` on branch `dsamaxxing/git-visual`)

- **One screen, one model.** Four columns, always visible: Working directory, Staging area, Local repository, Remote. Above them, a live commit graph with branch labels, a HEAD label and `origin/*` labels. Everything fits in 1440x900; under 760px wide the zones stack.
- **A command bar.** A terminal line shows the current command, with up to three lines of short output. Steps that are not Git commands (editing a file, a teammate pushing) are marked as such.
- **Things move.** On each step a chip flies from the source zone to the target zone (a file name for `add`, a commit id for `commit` and `push`). The arriving item pops in, the receiving zone lights up, and the arrow between zones shows the verb.
- **One caption per step.** One idea, short sentences, everyday words. A test enforces the length.
- **Controls.** Restart, Prev, Play/Pause, Next, a "step n/N" counter and a clickable progress bar. Keyboard: left and right arrows, and Space.
- **Eight lessons, same screen:** first commit (init, add, commit); status and diff; branch and switch; merge (fast-forward and 3-way); rebase; push, fetch and pull; stash; reset vs revert.
- **A small Git model.** Every lesson step runs through a deterministic model, so the picture is always a real Git state. A node test (`tests/gitcheck.js`) replays every step. It checks that a file is staged before it is committed, that a commit saves exactly what was staged, that refs and parents point at real commits, and that the model refuses what Git refuses.
- **Max theme:** near-black `#0A0A0B`, cards `#151518`, volt lime `#C5F04A` accent, Anton headlines, Outfit body text, JetBrains Mono for commands, file names and ids. The other three site themes also work.
- **Different on purpose:** we start each lesson at step 1, not at the end, because the live graph already gives the overview. Faded commits show history that no branch points to any more (after a rebase or a reset).

## Our earlier Git content (for reference)

Branch `origin/feature/git-ml-resources` (a separate Next.js rewrite; read only, not changed) has a Git lab: `src/features/git/` with a simulator (`sim.ts`), command list (`commands.ts`) and six guided tours (`tours.ts`): first commit; branch and merge; rebase vs merge; undo safely (restore, reset, revert); stash; and push and pull with a remote. Its tests (`tests/unit/git.test.ts`) cover add and commit, fast-forward and merge commits, rebase, the three reset modes, revert, amend, restore, stash, a dirty switch being refused, push and a rejected stale push, and running every tour step. The new static page covers the same ground, adds status and diff as their own lesson, and puts all four zones and the graph on one screen.
