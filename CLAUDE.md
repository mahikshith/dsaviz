# Pattern Atlas: notes for Claude Code

DSA lessons built from stories, deterministic walkthroughs and pattern-grouped practice. Next.js (App Router) with a static export, React, TypeScript, CSS Modules and zod. There is no backend. See README.md and docs/ARCHITECTURE.md.

## Workflow

- After changes: `npm run typecheck && npm test`. For content changes, also run `npm run validate`. Before handing off, run `npm run build && npm run test:e2e`.
- `npm run dev` and `npm run build` go through `scripts/next.mjs`, which falls back to the WebAssembly compiler when the native one is missing. Don't call `next` directly in scripts.
- Lessons live in `content/`. Adding a lesson that uses an existing adapter must never require route, player or control changes. If it seems to, the contract is wrong; fix the contract.

## Rules that keep lessons correct

- The trace is the single source of truth. Adapters in `src/engine/adapters/` are pure: no DOM, timers, React or shared mutable state. Emit frames through `createTracer`, which copies and freezes each frame.
- Every event kind is declared in the adapter's `events` with its anchor and fields. Narration templates may only use declared fields, and validation enforces this.
- Code anchors are trailing comments: `# @anchor name` or `// @anchor a, b`. Every anchor an adapter can emit must appear in every reference language.
- Content may only reference adapter ids in `src/engine/registry/ids.ts`. A new algorithm needs a reviewed adapter added to `ids.ts`, `all.ts` and `client.ts`, plus unit tests against a simple baseline.
- Client components must not import `src/lib/content/load.ts` or anything that uses `node:fs`. Browser-safe catalog helpers live in `catalogShared.ts`.
- Never fake results: no code-runner results, user counts, testimonials or company frequency data.

## Conventions

- Colours come from the tokens in `src/app/globals.css`, in both light and dark themes. `tests/unit/contrast.test.ts` checks the pairs in use; add a pair there when you introduce one.
- Pair every colour with a label, a symbol or text. Pointers carry names, and difficulty is a word.
- Interactive controls are at least 44 px high (36 px for compact secondary controls). Every icon-only button needs an `aria-label`.
- Copy is plain and direct. Stories stay short and depict the real problem entities.
