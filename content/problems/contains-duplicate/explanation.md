## Why it works

Keep this [[invariant]]: *before looking at position `i`, the set holds exactly the values at positions 0 to `i − 1`.*

If `nums[i]` is in the set, an earlier position holds the same value: a repeat. If not, adding it keeps the invariant. If the loop finishes, every value was checked against all earlier ones and none matched.

## Edge cases

- **Empty or single value:** no pair exists; the answer is False.
- **Repeat at the very end:** the whole list is scanned before it is found.
- **Negative numbers and zero** are ordinary set entries.
