## Situation

A diary already holds tidy, sorted meetings: **1–3, 6–9**. A late booking for **2–5** arrives.

## Goal

Return the diary with the late booking added, still sorted and with no overlaps.

## Rules

- The existing meetings are sorted by start and do not overlap.
- Overlapping or touching meetings merge into one.

## Worked example

2–5 overlaps 1–3, so they become 1–5. The diary becomes **1–5, 6–9**.
