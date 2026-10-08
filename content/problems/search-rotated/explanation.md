## Why it works

Keep this [[invariant]]: *if the target is on the shelf, it lies between `low` and `high`.*

At `mid`, either `nums[low..mid]` is sorted (when `nums[low] <= nums[mid]`) or `nums[mid..high]` is. For the sorted half we know its smallest and largest values, so we can tell exactly whether the target could be inside it. If it can, the other half is discarded; if not, the sorted half is discarded. Either way the range halves.

## Complexity

One halving search: **O(log n) time**, **O(1) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Not rotated:** the left half is always sorted; it is an ordinary binary search.
- **Target at the cut:** handled by the sorted-half checks.
- **One book:** a single comparison.
