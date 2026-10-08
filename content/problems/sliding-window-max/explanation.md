## Why it works

Keep this [[invariant]]: *the deque holds positions inside the current window, in increasing position order and strictly decreasing height order.*

When a newcomer arrives, any person at the back who is not taller can never be a window's maximum again, because the newcomer is at least as tall and stays in view longer. Removing them keeps the heights decreasing. The front is the tallest in view, unless it has slid out, in which case it is removed. Each position is added and removed at most once.

## Complexity

Every position enters and leaves the deque at most once: **O(n) time**. The deque holds at most k positions: **O(k) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **k = 1:** the answer is the input itself.
- **k = n:** one window; one maximum.
- **Equal heights:** removing equal values at the back is safe because the newcomer replaces them.
