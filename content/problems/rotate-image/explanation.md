## Why it works

A clockwise quarter turn sends the tile at (r, c) to (c, n − 1 − r).

Transposing sends (r, c) to (c, r); mirroring each row then sends (c, r) to (c, n − 1 − r). Composed, that is exactly the quarter turn. The transpose swaps each pair above the diagonal once (starting the inner loop at `r + 1`), so no pair is swapped back.

## Complexity

Each tile is moved a constant number of times: **O(n²) time**, **O(1) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **1 × 1:** nothing moves.
- **Swapping every pair twice**, by looping the inner index over the whole row, undoes the transpose.
- **Rectangular matrices** cannot be rotated in place; they change shape.
