## Situation

A conductor must turn a train of carriages **1, 2, 3, 4, 5** around so it can leave in the other direction. Each carriage is only coupled to the one in front of it.

## Goal

Return the train with every coupling reversed, so the last carriage is now first.

## Rules

- Re-couple the existing carriages; do not build new ones.
- Use only a few hands at a time.

## Worked example

**1 → 2 → 3 → 4 → 5** becomes **5 → 4 → 3 → 2 → 1**.
