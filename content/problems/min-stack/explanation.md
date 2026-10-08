## Why it works

Keep this [[invariant]]: *each entry on the stack stores its value and the minimum of all values at or below it.*

Pushing computes the new minimum from the entry below in one step. Popping removes the top entry, and the entry now on top already stores the minimum of the plates that remain, because those plates did not change. So getMin is always the top entry's note.

## Complexity

Every operation is **O(1)**. The notes double the stored numbers: **O(n) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Equal values:** each copy stores its own note, so popping one keeps the other's minimum.
- **Decreasing pushes:** every note changes, and every pop restores the previous one.
- **Calling getMin on an empty pile** is not allowed here.
