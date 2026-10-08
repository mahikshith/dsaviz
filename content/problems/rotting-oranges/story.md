## Situation

A crate of oranges is laid out in a grid: **2** is rotten, **1** is fresh and **0** is an empty spot. Every minute, any fresh orange next to a rotten one (up, down, left or right) rots too.

## Goal

Return the number of minutes until no fresh orange is left, or −1 if some orange can never rot.

## Rules

- Rot spreads only up, down, left and right.
- Empty spots block the spread.
- If nothing is fresh at the start, the answer is 0.

## Worked example

In the first crate the rot spreads ring by ring and reaches the last fresh orange after **4** minutes.
