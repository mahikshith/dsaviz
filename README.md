# Pattern Atlas (dsaviz)

Data structures and algorithms taught through short stories, step-by-step walkthroughs and practice grouped by pattern. "Pattern Atlas" is a working name; check that it is free to use before launch. It is set in one place, `src/lib/site.ts`.

Each lesson has three modes:

- **Understand**: a short story, the formal statement, and a table that maps every story term to the data.
- **Visualize**: a walkthrough you step through forwards and backwards. The diagram, explanation, variables and highlighted code line all come from the same trace frame. It includes one prediction question.
- **Practice**: a scratchpad with sample cases and a self-check list. There is no code runner yet, and the site never pretends there is.

Five lessons are published: opposite pointers (two lessons), fixed sliding window and prefix sums (one problem in two patterns), stack matching, and breadth-first search.

## Run it

Requirements: Node 20.9 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build (static export to `out/`) and a local check of it:

```bash
npm run build        # validates content, then builds
npm start            # serves out/ at http://localhost:4173
```

`out/` is plain HTML, CSS and JS. Host it on any static host: GitHub Pages, Netlify, Vercel, S3 or similar. There is no server and no backend.

### If the native compiler can't be downloaded

Some networks block the download of Next.js's native compiler (`@next/swc-*`) and other native binaries. `scripts/next.mjs` detects this and falls back to the WebAssembly compiler with webpack. It is slower (about a minute for a first build) but produces the same site. The test tooling uses Rollup's WebAssembly build through an `overrides` entry in `package.json` for the same reason.

## Checks

```bash
npm run typecheck    # TypeScript
npm run validate     # content rules (also runs as part of build)
npm test             # unit tests: algorithms, traces, player, content, progress, contrast
npm run test:e2e     # browser tests against out/ (run npm run build first)
npm run check        # typecheck + unit tests + build
```

Browser tests use the Chrome already installed on the machine. Use `PW_CHANNEL=msedge` for Edge, or `PW_CHANNEL=bundled` after `npx playwright install chromium`.

## Where things are

| Path | What it is |
| --- | --- |
| `content/` | Lessons, patterns, glossary, topics and paths: Markdown and JSON, validated at build |
| `content/problems/_template/` | Copy this to start a new lesson |
| `src/engine/` | Trace contracts, pure algorithm adapters, adapter registries, output checkers, narration presenter |
| `src/visuals/scenes/` | Reusable renderers: arrays (SVG), graphs (SVG), stacks and queues (HTML lists) |
| `src/features/player/` | Playback reducer, scheduler, stage, controls, checkpoint, code panel, custom input |
| `src/features/lesson/` | Lesson workspace (modes, rail, practice, glossary) |
| `src/features/catalog/` | Pattern catalog, practice catalog, path pages |
| `src/features/progress/`, `src/lib/progress/` | Local progress: model, storage adapter, provider, My learning |
| `src/lib/content/` | Schemas, loader and validation, Markdown, reference-code anchors |
| `src/app/` | Routes |
| `docs/` | Architecture, design tokens, authoring guide, verification record |

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how a lesson runs from one deterministic trace
- [docs/CONTENT_AUTHORING.md](docs/CONTENT_AUTHORING.md): how to add a lesson or pattern
- [docs/DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md): colour, type and spacing tokens, with contrast rules
- [docs/VERIFICATION.md](docs/VERIFICATION.md): what was checked, how, and the known limits

## History

Before version 0.5 this repository held a different site: fixed 1440 px pages in a custom `.dc.html` template format, bundled into one `dist/index.html`. That version is in git history (commit `9376a08`) if any of its 58-problem catalog or nine animated stories should be ported. To port one, write it to the authoring contract in `docs/CONTENT_AUTHORING.md`.
