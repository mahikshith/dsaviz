## Situation

Two trains pull into a junction, each with carriages numbered in increasing order: **1, 2, 4** and **1, 3, 4**. A signal operator must zip them into one train.

## Goal

Return a single train containing every carriage, in increasing order.

## Rules

- Both trains are already in order.
- Every carriage must appear exactly once.
- Carriages are re-linked, not copied.

## Worked example

Taking the smaller front carriage each time gives **1, 1, 2, 3, 4, 4**.
