## Why it works

Keep this [[invariant]]: *if the target is on the shelf, its position lies between `low` and `high`, inclusive.*

At the start these cover the whole shelf. If the middle value is smaller than the target, every value at or before the middle is smaller too, because the shelf is sorted, so the target can only be after it and `low = mid + 1` keeps the invariant. The larger case is symmetric. Each check removes at least half of the range, so the loop ends after about log₂ n checks. If the range becomes empty, the target was never there.

## Complexity

Each probe halves the range: **O(log n) time**, **O(1) [[auxiliary-space|auxiliary space]]**. Seven books need at most 3 probes; a million need at most 20.

## Edge cases

- **Missing target:** the range empties; return −1.
- **One book:** a single probe decides.
- **Target smaller or larger than everything:** the range shrinks to one end and then empties.
- **Off by one:** using `low < high`, or setting `low = mid`, can skip the last candidate or loop forever.
