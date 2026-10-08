# Design tokens

The look is a calm editorial field guide: warm paper, serif headings, generous reading space, and a visible algorithm stage. The tokens are defined once in `src/app/globals.css` for light and dark themes. Dark applies through `prefers-color-scheme`, or through `data-theme="dark"` set by the theme toggle.

## Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--canvas` | `#f7f2e9` | `#1d1824` | Page background |
| `--surface` | `#fffcf6` | `#282131` | Panels |
| `--surface-sunk` | `#f2ece4` | `#221c2a` | Explanation box, sample cases |
| `--text` | `#262230` | `#f5eee7` | Primary text |
| `--muted` | `#5f5766` | `#c0b4c8` | Secondary text |
| `--border` | `#ddd3e1` | `#54445f` | Decorative separation only |
| `--control-border` | `#857190` | `#9a88a8` | Control and cell outlines (≥ 3:1) |
| `--primary` | `#68428a` | `#c4a7ed` | Actions, selected navigation, **left pointer** |
| `--on-primary` | `#ffffff` | `#1d1824` | Content on primary fills |
| `--accent` | `#b5472f` | `#f2a58f` | Explanatory emphasis, entering items, focus ring |
| `--comparison` | `#8a6200` | `#e8c269` | Comparisons, **right pointer**, queued nodes |
| `--success` | `#21634d` | `#8cd2b4` | Confirmed answers, best so far, shortest route |
| `--danger` | `#a62d43` | `#f3a1b0` | Invalid input, mismatches |
| `--*-soft` | | | Fills behind the matching colour |
| `--hatch` | `#b9aebd` | `#6b5d77` | Hatching on discarded or leaving cells |
| `--code-bg`, `--code-active` | | | Reference code and its highlighted line |

`--muted` is slightly darker than the brief's `#655d6c`, so it passes 4.5:1 on the sunk explanation and code backgrounds as well as on the page.

**Contrast is tested.** `tests/unit/contrast.test.ts` reads these tokens and checks every text pair in use against 4.5:1 and control and graphic boundaries against 3:1, in both themes. `--border` fails 3:1 by design, so it is never the only boundary of a control.

**Colour is never the only signal.** Pointers carry names (`L · left`, `R · right`, `i · first`). Discarded cells are hatched and listed in the legend. Changed variables also get the text "(changed)" for screen readers. Difficulty is a word.

## Type

| Role | Family | Fallbacks |
| --- | --- | --- |
| Headings | Fraunces (variable) | Iowan Old Style, Georgia, serif |
| Interface and body | Instrument Sans (variable) | Segoe UI, system-ui, sans-serif |
| Code, indices, variables | JetBrains Mono (variable) | Cascadia Mono, Consolas, monospace |

These continue the previous dsaviz look. The brief suggests Source Serif 4, Source Sans 3 and IBM Plex Mono as examples; swapping them means changing three `@fontsource-variable/*` imports in `src/app/layout.tsx` and three variables. The fonts are self-hosted through Fontsource (SIL Open Font License).

Body text is 17 px (16.5 px on phones) with line height 1.6, and reading columns are capped near 68 characters. Headings use `clamp()` between about 30 and 54 px.

## Space, shape and motion

- 8 px rhythm with 4 px refinements. The page gutter is 32 px, or 16 px under 768 px.
- Radii: 14 px for panels (`--radius-lg`), 10 px for cells and boxes, 8 px for controls.
- Controls are 44 px high (36 px for compact secondary ones).
- Motion is 240 ms (`--motion`) with a gentle ease-out, used only to move pointers, shift windows and add stack or queue items. Reduced motion removes it completely.
- Focus: a 3 px accent outline with a 3 px offset, on everything focusable.
