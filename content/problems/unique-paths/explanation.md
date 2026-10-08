## Why it works

Every route into square (r, c), other than the start, ends with a move from (r − 1, c) or from (r, c − 1). Those two groups of routes are different and together cover everything, so `ways[r][c] = ways[r − 1][c] + ways[r][c − 1]`, with one route along the top row and one down the left column.

Filling the grid row by row, left to right, means both values are ready when needed. With one row, the old entry is the square above and the freshly updated left entry is the square to the left.

## Complexity

One addition per square: **O(rows · cols) time**, **O(cols) [[auxiliary-space|auxiliary space]]** with a single row. The count also equals the binomial coefficient C(rows + cols − 2, rows − 1).

## Edge cases

- **One row or one column:** exactly one route.
- **1 × 1:** one route of zero moves.
- **Large grids:** the count grows fast and needs big integers.
