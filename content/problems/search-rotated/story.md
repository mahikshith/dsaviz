## Situation

A shelf of books sorted by number was spun around a hidden point, so it now reads **4, 5, 6, 7, 0, 1, 2**. You want book **0**.

## Goal

Return the position of the wanted book, or −1 if it is not there.

## Rules

- Before spinning, numbers increased and were all different.
- Positions count from 0.
- Aim for O(log n) looks.

## Worked example

Book 0 is at position **4**. Book 3 is not on the shelf: **−1**.
