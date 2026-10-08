## Why it works

After sorting by start, keep this [[invariant]]: *the merged list is sorted, its blocks do not overlap, and it covers exactly the meetings processed so far.*

The next meeting starts no earlier than every processed meeting, so the only block it can overlap is the last one. If it starts at or before that block's end, stretching the block keeps the invariant; otherwise it starts a new block that cannot overlap anything before it.

## Complexity

Sorting dominates: **O(n log n) time**. The output holds up to n blocks: **O(n) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Touching meetings**, such as 1–4 and 4–5: merged here; some problems treat them as separate.
- **One meeting inside another**, such as 1–10 and 2–3: the end stays 10, which is why we take the maximum.
- **Unsorted input:** sorting first is essential.
