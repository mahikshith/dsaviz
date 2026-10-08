## Why it works

Let best_here be the best total of a stretch ending at the current leg. That stretch either is the leg alone or extends the best stretch ending at the previous leg, so `best_here = max(x, best_here + x)`.

The best stretch anywhere ends at some leg, so the answer is the largest best_here seen. This "best ending here" [[subproblem]] is what makes it dynamic programming; it is known as Kadane's algorithm.

## Complexity

One pass: **O(n) time**, **O(1) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **All negative:** the answer is the largest single leg, not 0.
- **One leg:** that leg.
- **All positive:** the whole array.
