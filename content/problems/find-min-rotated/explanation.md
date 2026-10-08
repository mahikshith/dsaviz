## Why it works

Keep this [[invariant]]: *the minimum lies between `low` and `high`.*

If `nums[mid] > nums[high]`, the drop happens after `mid`, so the minimum is in `mid + 1..high`. Otherwise `mid..high` is increasing, so the minimum is at `mid` or to its left, and `high = mid` keeps it in range. The range shrinks every step until one position remains.

## Complexity

The range halves each step: **O(log n) time**, **O(1) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Not rotated:** the comparison always goes left; the first element is returned.
- **Two elements:** one comparison decides.
- **Duplicates** are not allowed here; with them, the worst case becomes O(n).
