# DSAMaxxing redesign brief

Owner's words: clean, but not good enough. Simple, refreshing, something people want to use daily. Learn from other sites, build something new. Too much happening at once. A calm, relaxing place. It looks vibe coded.

## The learner

A nervous beginner opens the site and wonders if they are clever enough. They need one clear next step, a sign that they are making progress, and a reason to come back tomorrow. Everything else can wait behind a tab, a fold or a link.

## Principles

1. **One primary action per screen.** One lime button. Everything else is a text link or a quiet control.
2. **Progressive disclosure.** The first screen holds at most three blocks. Detail (About, the full path, the sheet) is one click away, never in the way.
3. **Calm visual rhythm.** Few surfaces, no heavy borders, no gradients on text, no glow. Depth comes from a slightly lighter surface, not from outlines.
4. **Generous, even spacing.** Gaps between same-kind items are equal. Whitespace is the main design material.
5. **At most two type sizes per card.** A title and a quieter line. Nothing else competes.
6. **Quiet colour.** Near-black ground, soft grey text. Lime (#C5F04A) marks the one thing to press, today on the calendar, and the current step. If lime appears more than three times on a screen, remove some.
7. **Motion explains.** Frequent actions (tabs, steps, hover) get 120-200 ms or nothing. Nothing loops except the lesson animation, and that waits for the learner.

## Type

| Role | Font | Size / line | Use |
|---|---|---|---|
| Display | Anton | 56-88 / 1.0 | Page title only, once per page |
| Heading | Outfit 600 | 24 / 32 | Section titles |
| Body | Outfit 400 | 17-18 / 28 | Reading text, list titles |
| Label | Outfit 500 | 15 / 24 | Meta lines, tabs, calendar weekdays |
| Chip | Outfit 500 | 13 / 16 | Small tags only |
| Code | JetBrains Mono | 15 / 24 | Code only |

Body never goes below 17 px, labels never below 15 px.

## Spacing

An 8 px grid with five steps: **8, 16, 24, 32, 48**. Inside a card use 24 (16 on phones). Between cards 24. Between page sections 48. Multiples of 48 are allowed for page margins on Calm focus. No other values.

## Components

- **Cards.** One level only: a surface (#101214) with a 16 px radius and no border. Never a card inside a card; use dividers or spacing inside.
- **Lists.** Rows separated by a 1 px hairline or by space, not both. Title on the left, meta in muted text, one chevron at most.
- **Path nodes.** A 48 px circle with the lesson number. Done is filled with a check, current has a lime ring, later is plain. Nodes are joined by a short line ending in a small arrowhead that points to what they unlock.
- **Buttons.** One primary (lime fill, dark text, 56 px high, 12 px radius). Secondary is text with an arrow. Press scales to 0.98.
- **Tabs.** Text with a 2 px underline on the active one. Two or three tabs, never more. About lives in a tab.
- **Filters.** Only when a list has more than about 12 items. A single row of text options, no pills inside pills.
- **Calendar.** A real month grid, Monday first. Days done form a continuous band; today is the lime end cap.

## Copy rule

Each card has a title, a meta line of 8 words or fewer, and one action. No second paragraph. No fact twice on one page. Story names stay inside the story player.

## Avoid

- Cards inside cards.
- Gradient text, glow, glass, hard shadows.
- The generic hero plus three cards layout, and the big number with a small label.
- Uppercase eyebrow labels over every heading.
- Heavy borders on everything, coloured side stripes on cards.
- Emoji, mascots, decorative icons that carry no meaning.
- Truncating anything the learner must choose.
- More than one thing moving at once.

## Two directions for the owner

- **A, Calm focus.** One column, one huge lesson title, one button. The calendar and the path sit quietly underneath. Lots of air.
- **B, Daily habit.** The page is a daily plan: today's three small steps, a calendar with the streak chain, the path as a short strip. Compact and rhythmic, still one primary button.

Mockups: `mock-a-home.html`, `mock-a-lesson.html`, `mock-b-home.html`, `mock-b-lesson.html`. Screenshots in `shots/`.

## Decision (owner, 2026-11-01)

- **Home is direction B:** "Today" with three small steps, the streak bar beside a real calendar, and the "On the path" strip with arrows. Mockup: research branch, docs/design/mock-b-home.html.
- **Lesson pages are direction A:** one picture, one Next button, Lesson and About tabs. Mockup: docs/design/mock-a-lesson.html.
- **Below the fold on Home goes the full roadmap:** Start here levels, Core programming, DSA patterns, System design and AI & ML, as evenly spaced rows with arrows and done, next and locked states. Each row folds open to its lessons. No dead space at 1440x900 or 390.

## Rule for every page

Every page feels the same: simple, serene, calm. Keep all the information and the site's purpose. Never delete content to look simple: use progressive disclosure instead. One clear primary action per screen; details go in folds, tabs and filters. Check every page PR against this.

## One type scale

One H1 size (56px, `--fs56`) and one section-heading size (32px, `--fs32`) on every page. Headings stay on one line at 1280 and wider: shorten the words before making the type smaller. `DS_PASS=layout` in tests/site-test.js fails when a heading wraps.
