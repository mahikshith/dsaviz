## Why it works

Keep this [[invariant]]: *the heap holds the k largest scores seen so far (or all of them, before k have arrived).*

When a new score arrives, push it; if the heap now holds k + 1 scores, popping the smallest leaves the k largest. After all scores, the heap holds the k largest overall, and its smallest, the top, is the k-th largest.

## Complexity

Each score costs one push and at most one pop on a heap of size k: **O(n log k) time**, **O(k) [[auxiliary-space|auxiliary space]]**. Quickselect averages O(n) time but needs care to avoid a bad worst case.

## Edge cases

- **k = 1:** the maximum.
- **k = n:** the minimum.
- **Duplicates** count separately, which the heap handles naturally.
