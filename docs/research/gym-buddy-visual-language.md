# Gym Buddy visual language (reference for DSAMaxxing)

Source: the owner's own app, `mahikshith/workout`: `src/theme.ts`, `src/ui.tsx`, `src/rings.tsx`, `src/medals.tsx`, `app/(tabs)/_layout.tsx` and `docs/DESIGN.md`. Read on 2026-10-24. Visual elements only: no fitness logic carries over.

DSAMaxxing takes this look whole: near-black surfaces, one volt-lime accent, poster-style Anton headlines and quiet Outfit body text. The mockup on `mockups/dsamaxxing` is already drawn in it.

## Type

| Role | Font | Size / line height | Notes |
|---|---|---|---|
| display (page titles) | Anton 400 | 34 / 40 | uppercase, letter-spacing 0.5 |
| h1 (hero titles) | Anton 400 | 28 / 34 | uppercase, letter-spacing 0.4 |
| num (big stats) | Anton 400 | 28 / 34 | numbers carry the information |
| h2 (section titles) | Outfit 700 | 22 / 28 | 1-3 words |
| h3 (card titles) | Outfit 600 | 17 / 23 | |
| body | Outfit 400 | 16 / 23 | |
| small | Outfit 500 | 14 / 19 | grey `#8E8E93` by default |
| label (eyebrows) | Outfit 600 | 13 / 17 | uppercase, letter-spacing 1.2, `#B4B4BA` |

The app has no code font, so DSAMaxxing adds JetBrains Mono for code and complexity notes. Screens never set their own font or size; they pick a variant.

## Palette

| Token | Hex | Use |
|---|---|---|
| bg | `#0A0A0B` | page |
| card | `#151518` | cards, tiles, rows |
| card2 | `#1F1F23` | insets, ring tracks, chips |
| line | `#26262C` | every 1px border ("present, never loud") |
| text | `#F5F5F7` | primary text |
| muted | `#8E8E93` | small print |
| dim | `#55555C` | disabled, locked |
| accent | `#C5F04A` | volt lime: the one accent |
| accentInk | `#0A0A0A` | text on accent fills |
| warm | `#FF8A3D` | streaks and warnings |
| pink | `#FF5C8A` | secondary category |
| blue | `#5AC8FA` | secondary category |
| danger | `#FF453A` | errors |
| ok | `#30D158` | done |

The user can swap the accent: lime `#C5F04A`, champagne gold `#E6C36A`, ember `#FF7A45`, glacier `#7DD3FC`, rose `#F4A3B5`. The accent is read at render time, so a swap repaints everything.

Tints are the accent plus a hex alpha suffix: `+22` for icon squares, `+18`/`+30` for glows.

Medal metals (light, mid, shadow): bronze `#F2BE95 #B97A4E #6E3F22`, silver `#F7F8FA #B8BCC6 #62666F`, gold `#FFEAA8 #E0B04A #8E6618`.

## Shape and spacing

- Radius: `sm 10`, `md 14`, `lg 16` (every card), `xl 20`. Bigger than 16 "reads as toy-like". Pills are fully round (height/2).
- Spacing scale only: 4, 8, 12, 16, 24, 32. Page gutter 12, card padding 16 (tiles 14), sections 32 apart, content 12 under a section title.
- Surfaces step up: page, card, inset. Never a card inside a card.
- Touch targets 44px or more. Buttons are 56 tall, chips 40, section action pills 28.

## Components

- **IconBox**: an Ionicon centred on a rounded square (radius = 0.32 × size) tinted `color + '22'`, or solid with `accentInk` for the icon. Every row and tile starts with one.
- **Tile** (stat tile): IconBox (32), one big number (Outfit 700, 24) with a small muted unit, a 1-2 word label, and an optional 4px progress bar at the bottom. No sentences.
- **Section**: an h2 title with a small pill action right next to it (accent text + chevron, card fill, line border), not pushed to the far edge.
- **ListRow**: icon or thumb, title, sub line, right slot. 12 padding, radius 14, card fill, line border.
- **Banner**: an icon + title + action row with a coloured border.
- **Fold**: a collapsible for long or occasional text; it fades in over 200ms.
- **Chip**: a pill toggle, card2 fill, line border, accent when on.
- **Ring / Rings**: SVG progress rings. Concentric rings go outermost first, with a gap of stroke/3. The track is card2 and the cap is round. It hides at zero so no dot shows. It animates over 700ms with an ease-out cubic.
- **Medal shelf**: hexagon medals. Earned ones are metal (a gradient from the three tones). The next one to earn is outlined with a thin accent progress ring and an "N of M" caption. Locked ones are outlined with a lock. A newly earned medal pops and gets one diagonal white shine sweep (delay 350, 900ms, ease-in-out cubic, opacity 0.6).
- **Floating pill nav**: a bar floating 16 from the sides and 12+ from the bottom, 64 tall, radius 32. Its fill is `rgba(24,24,27,0.55)` with a frosted blur (a solid `rgba(24,24,27,0.96)` where blur is costly), plus a hairline glass edge. Tabs are icons only. The active tab expands into a lime pill showing its icon and label in accentInk.
- **Streak pill**: a 40-tall pill, card fill, line border, flame icon plus a counting number.
- **Breath / pulse circle**: two stacked accent glows (`+18`, `+30`) that scale with a sine ease, plus a dot row for reps. This is a good model for a "tick" animation.

## Motion

- Press: scale to 0.97 in 120ms (ease-out quad), back in 220ms with `cubic-bezier(0.32, 0.72, 0, 1)`. Nav items scale to 0.9, pills to 0.95, cards to 0.98.
- Entry: `Rise`, a fade and slide-down at 380ms, staggered 50ms per item.
- Progress: 700ms ease-out cubic for rings and bars.
- Crossfades: 200ms. Slide holds: 450ms ease-in-out quad with 700ms holds.
- Celebration: medal pop plus one shine. Haptics: light on tap, success on unlock. The web has no haptics; use a short scale pop instead.
- On the web, respect `prefers-reduced-motion`: drop the stagger and shine, keep the instant state change.

## Words (from DESIGN.md)

- A card holds a 1-4 word title, one meta line of 6 words or fewer (parts joined with " · "), and at most one action.
- Big number, small unit, short label.
- Sentence case. No exclamation marks. No "Unleash", "Elevate" or "Journey to". Bold only for titles and numbers.
- Left-align. Centre only hero numbers and empty states.
- One job per screen, one primary button, at most three blocks above the fold.

## Mapping to DSAMaxxing (web)

| Gym Buddy | DSAMaxxing |
|---|---|
| `c` tokens | a new `THEMES` entry (`max`) in `shared/`; the existing paper/ink/field themes stay as alternates |
| Ionicons | inline SVG icons, one stroke style |
| Tile | stat tiles: solved, streak, patterns done, revision due |
| Rings | per-pattern progress rings on Patterns and Profile |
| Medal shelf | pattern-mastery medals (bronze = story watched, silver = 50% solved, gold = all solved and revised) |
| Floating pill nav | a fixed bottom-centre pill on mobile, top-centre on desktop: Patterns · Sheet · Visualizers · System design · AI/ML · Interview |
| Streak pill | daily streak from localStorage |
| Breath circle | the "tick" pulse for the live visualizer on the home page |
