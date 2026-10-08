## Why it works

This is breadth-first search with many starting points. Putting every rotten orange in the [[queue]] at distance 0 makes the search spread from all of them at once.

Processing one level of the queue per minute means every orange rots at its true [[distance]] from the nearest rotten orange, exactly as the minute-by-minute spread would. The answer is the last level reached. If a fresh orange is never reached, no rotten orange connects to it, so the answer is −1.

## Complexity

Each cell enters the queue at most once: **O(m·n) time**, **O(m·n) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **No fresh oranges:** 0, even with no rotten ones.
- **Fresh but no rotten oranges:** −1.
- **Isolated fresh orange:** −1.
