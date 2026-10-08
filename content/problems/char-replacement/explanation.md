## Why it works

A window of size `w` whose most common letter appears `top` times needs exactly `w − top` repaints.

The window grows by one tile each step. If it would need more than `k` repaints, its left tile leaves, so its size stays the same instead of growing. The window therefore never shrinks, and its size always equals the best answer found so far. The trick is that `top` is never decreased when a tile leaves. That can only make `top` too large, which keeps the window from growing when it should not. And `best` only increases when some letter reaches a new high count inside the current window, which means a real window of that size needs at most `k` repaints. So every increase is genuine, and the longest valid stretch is found.

## Complexity

Each tile enters and leaves the window at most once: **O(n) time**. The tally has at most 26 letters: **O(1) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **k = 0:** the answer is the longest run of one repeated letter.
- **k at least the length:** the whole wall can be one colour.
- **All one colour:** no repaints needed; the answer is the length.
