## Situation

Coins worth **1, 1, 1** are dropped into a jar one at a time. After each coin, you write the running total in a notebook.

## Goal

Count how many stretches of consecutive coins add up to exactly k = 2.

## Rules

- A stretch is one or more consecutive coins.
- Coins can have negative values (debts), so totals can go down.
- Count every stretch, even if two have the same coins' values.

## Worked example

Running totals are 0, 1, 2, 3. Pairs of checkpoints that differ by 2 are (0, 2) and (1, 3): **2** stretches.
