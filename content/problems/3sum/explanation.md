## Why it works

After sorting, fix position `i`. Every trio whose smallest value sits at `i` needs a pair to its right adding up to `−nums[i]`. The two pointers find all such pairs: a total that is too small cannot use the current left value with any remaining partner, and a total that is too large cannot use the current right value, by the same argument as the gift-voucher lesson.

Skipping a fixed value equal to the previous one, and skipping equal neighbours after a match, removes repeated trios without missing any distinct one.

## Complexity

Sorting costs O(n log n); each fixed friend runs one O(n) squeeze: **O(n²) time**. Apart from the output and sorting, **O(1) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Fewer than three values:** no trio.
- **All zeros:** exactly one trio, [0, 0, 0].
- **Repeated values:** must be skipped to avoid listing a trio twice.
