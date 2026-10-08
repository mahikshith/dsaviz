## Why it works

Keep this [[invariant]]: *the pile holds the days not yet answered, and their temperatures decrease from bottom to top.*

When a day is warmer than the top of the pile, it is the first warmer day for that top day, since every day in between was already processed and was not warmer. So the top is answered and removed, and the check repeats. Then the new day is pushed; it is not warmer than the day below it, so the order stays decreasing.

## Complexity

Each day is pushed once and popped at most once: **O(n) time**. The pile can hold every day: **O(n) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Falling temperatures:** every day waits on the pile; all answers are 0.
- **Equal temperatures:** not warmer; they stay on the pile.
- **Rising temperatures:** each day is answered by the next.
