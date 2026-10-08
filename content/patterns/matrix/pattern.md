## Intuition

Turning a square floor of tiles a quarter-turn looks complicated, but it is two simple moves: flip the floor across its diagonal, then mirror each row. Many [[grid]] operations decompose into moves that each have a one-line index rule.

## Recognition clues

- The input is a 2D grid and the task moves cells around: rotate, flip, transpose, spiral.
- You are asked to work in place.
- Writing out where one cell goes shows a simple rule, such as `(r, c) → (c, n − 1 − r)`.

## Template

```python
n = len(m)
for r in range(n):                 # transpose
    for c in range(r + 1, n):
        m[r][c], m[c][r] = m[c][r], m[r][c]
for row in m:                      # mirror each row
    row.reverse()
```

## Preconditions

In-place rotation needs a square matrix. Visit each swapped pair once: the transpose loop starts `c` at `r + 1`.

## When it fails

Rectangular matrices change shape when rotated, so they need a new matrix. Swapping every pair twice, by looping `c` over the whole row, undoes the transpose.
