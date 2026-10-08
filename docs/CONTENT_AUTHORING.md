# Writing a lesson

A lesson is a folder under `content/problems/<slug>/`. If an adapter for its algorithm already exists, adding a lesson needs no code changes at all. `chalkboard-slogan` was added this way, as the fifth lesson.

## 1. Copy the template

```bash
cp -r content/problems/_template content/problems/my-new-lesson
```

Folders starting with `_` are ignored. Keep `"status": "draft"` while you work: drafts are validated and visible at `/authoring/` in development, but they never appear in public pages, counts, search or the production build.

## 2. Files

| File | Holds |
| --- | --- |
| `meta.json` | Ids, titles, difficulty, topics, pattern memberships, story-to-data mapping, examples with expected outputs, approaches, transfer question, self-check list |
| `story.md` | `## Situation`, `## Goal`, `## Rules`, `## Worked example` |
| `statement.md` | The formal statement |
| `explanation.md` | `## Straightforward approach`, `## Turning point`, `## Why it works`, `## Complexity`, `## Edge cases` |
| `narration.json` | For each approach, a template for each event, in story and formal wording |
| `checkpoints.json` | At least one prediction question on a specific frame |
| `reference/<approach>.py`, `.ts` | Read-only reference code with anchor comments |
| `practice/starter.py`, `.ts` | The scratchpad's starting code |

### The story contract

A published lesson covers all twelve parts. Validation checks the ones marked ✔.

1. Situation ✔ 2. Goal ✔ 3. Rules ✔ 4. Mapping ✔ (`meta.mapping`) 5. Worked example ✔ 6. Straightforward approach ✔ 7. Turning point ✔ 8. Guided trace ✔ (the adapter and narration) 9. Prediction checkpoint ✔ 10. Code and reasoning ✔ (reference code and "Why it works") 11. Complexity and edge cases ✔ 12. Transfer ✔ (`meta.transfer`)

Keep the situation within about 100–180 words; a test enforces 180. Use everyday scenarios, depict the real entities, and state every rule that affects the answer: index base, duplicates, whether the input may change, and what to return when there is no answer.

### Markdown

Standard Markdown, with these additions and limits:

- `[[term-id]]` or `[[term-id|shown text]]` links a glossary entry from `content/glossary.json`. The page explains it in place.
- Links must be `/internal/paths`, `#anchors` or `https://` URLs.
- Raw HTML and images are rejected. Fenced code blocks marked `python` or `typescript` are highlighted.

### Narration

Each key is an event kind, or `kind:variant` when the adapter declares variants. `{field}` placeholders must be fields that event declares. The player uses `story` or `formal` wording depending on the learner's toggle, for the same frame. Explain what changed and why in one or two sentences; keep proofs in "Why it works".

### Reference code anchors

End a line with `# @anchor name` (Python) or `// @anchor a, b` (TypeScript). Anchors name operations, not line numbers, so each language marks its own lines. Every anchor the adapter can emit must appear in every language, and validation lists any that are missing. The marker comments are removed before display.

### Checkpoints

`frameId` is the frame shown while the question is asked: the learner predicts the *next* frame. Find frame ids in the authoring preview's raw-frame panel, or in a validation error. Exactly one choice is correct, and every choice needs feedback that teaches.

### Checkers

`meta.checker` decides how expected outputs are compared:

- `exact`: plain equality.
- `target-pair`: any valid pair is accepted.
- `window-max`: the earliest best window.
- `shortest-route`: any valid shortest path.

## 3. Validate and preview

```bash
npm run validate      # every rule, with file and reason for each problem
npm run dev           # then open /authoring/ and /problems/<slug>/
```

Validation fails on:

- missing sections, unknown adapters, patterns, variants, topics or glossary terms
- duplicate ids or slugs, malformed example inputs, wrong expected outputs
- missing or unknown code anchors, checkpoints on frames that don't exist
- narration placeholders the event lacks, unsafe links or raw HTML
- published paths that reference drafts

## 4. Publish

Set `"status": "published"` and run `npm run build`. The build runs validation first and fails rather than ship a broken lesson. Raise `contentVersion` whenever you change a published lesson in a way that matters; My learning then tells returning learners the lesson has changed.

## Adding a pattern

Create `content/patterns/<id>/pattern.json` and `pattern.md`, with the sections `## Intuition`, `## Recognition clues`, `## Template`, `## Preconditions` and `## When it fails`. Variants live in the JSON, each with what it requires. `visual.scene` is a static scene model drawn by the same renderers as the lessons. A published pattern with no lessons shows an honest "lessons in progress" state.

## Adding an algorithm (needs code review)

1. Write `src/engine/adapters/<name>.ts`: declare `events`, implement `parseInput`, `trace` (with `createTracer`) and `view`.
2. Register its id in `src/engine/registry/ids.ts`, `all.ts` and `client.ts`.
3. Add tests to `tests/unit/adapters.test.ts` against a simple baseline, and sample inputs to `tests/unit/trace.test.ts`.
4. If it needs a new kind of picture, extend `SceneModel` and `SceneView`. Otherwise reuse arrays, graph, stack or queue.

Content can only choose among registered adapters. It can never supply code to run.
