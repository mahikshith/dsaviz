## Why it works

Scanning cell by cell, the first time we meet a land cell of some island, that island has not been chalked yet, so we count it. The flood fill then chalks every land cell connected to it, so no other cell of that island can start a second count.

Every island is therefore counted exactly once, and water is never counted.

## Complexity

Each cell is visited a constant number of times: **O(m·n) time**. The recursion or explicit stack can hold every cell: **O(m·n) [[auxiliary-space|auxiliary space]]** in the worst case.

## Edge cases

- **All water:** 0.
- **All land:** 1.
- **Diagonal-only contact:** separate islands.
- **Very large islands** can make recursion too deep; an explicit stack or BFS avoids that.
