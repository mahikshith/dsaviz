## Why it works

Keep this [[invariant]]: *`window_sum` is the total of the k days from `start` to `start + k − 1`, and `best` is the largest total among stretches starting at or before `start`, with `best_start` the earliest of them.*

Building the first window makes it true for start 0. Sliding to the next start subtracts exactly the day that left and adds exactly the day that entered, so `window_sum` stays correct. `best` changes only when a total is strictly larger, so a tie never replaces an earlier stretch. After the last start, `best` has seen every stretch.

The **prefix sums** approach reaches the same answer another way: after writing `P[i]`, the total of the first i days, any stretch from `a` to `a + k − 1` totals `P[a + k] − P[a]`.

## Complexity

Sliding window: **O(n) time** and **O(1) [[auxiliary-space|auxiliary space]]**. Prefix sums: **O(n) time** and **O(n) auxiliary space** for the running totals, which pays off when many different ranges are asked about. Recomputing every stretch: O(n·k) time.

## Edge cases

- **k = 1:** each stretch is a single day; the answer is the busiest day.
- **k = n:** there is exactly one stretch, starting at day 0.
- **Ties:** compare with `>` rather than `>=`, so an equal total never replaces an earlier stretch.
- **Invalid k:** k = 0, or k larger than the number of days, has no stretch at all. The player rejects it with a message instead of guessing.
- **Negative values:** a fixed window does not depend on values being non-negative, unlike many variable-size windows.
