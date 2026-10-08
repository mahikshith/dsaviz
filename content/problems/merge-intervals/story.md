## Situation

A scheduler's diary lists the day's meetings in no particular order: **1–3, 2–6, 8–10, 15–18**. Some overlap.

## Goal

Rewrite the diary as the fewest blocks of busy time, each covering one or more overlapping meetings, sorted by start.

## Rules

- Two meetings overlap if one starts at or before the other ends.
- A block covers from the earliest start to the latest end of its meetings.

## Worked example

1–3 and 2–6 overlap, so they become **1–6**. The diary becomes **1–6, 8–10, 15–18**.
