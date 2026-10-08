## Why it works

Every way to reach step `i` ends with a final move, either a 1-step from step `i − 1` or a 2-step from step `i − 2`. These two groups never overlap and together cover every way. So `ways[i] = ways[i − 1] + ways[i − 2]`.

With the base cases `ways[0] = 1` (standing still on the ground) and `ways[1] = 1`, filling the table from the bottom up means both values a step needs are already written when it is reached. This [[subproblem]] structure is what makes it dynamic programming.

## Complexity

The table version does one addition per step: **O(n) time** and **O(n) [[auxiliary-space|auxiliary space]]**. Keeping only the last two notes brings the space to **O(1)**. Plain [[recursion]] without notes takes O(2ⁿ) time.

## Edge cases

- **n = 1:** one way.
- **n = 2:** two ways; the base cases already give 1 + 1.
- **Large n:** the answers grow like Fibonacci numbers, so very large n needs big integers.
