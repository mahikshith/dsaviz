## Why it works

Keep this [[invariant]]: *if an answer exists, both of its positions lie between `left` and `right`.*

It holds at the start, when `left` and `right` are the two ends. When `prices[left] + prices[right] < target`, every partner `j ≤ right` gives `prices[left] + prices[j] ≤ prices[left] + prices[right] < target`, so no answer uses `left`, and moving it inward keeps the invariant true. The case `> target` is symmetric for `right`. Each step shrinks the range by one, so the loop ends. If the pointers meet without a match, fewer than two books remain and no answer exists.

## Complexity

Opposite pointers makes at most n − 1 comparisons: **O(n) time** and **O(1) [[auxiliary-space|auxiliary space]]**, just two indices. Checking every pair takes **O(n²) time** and O(1) space. The player stores every step so you can go backwards; that memory belongs to the player, not the algorithm.

## Edge cases

- **Empty shelf or one book:** the loop never runs, so the answer is null.
- **Equal prices:** `[3, 3, 6, 8]` with target 6 returns `[0, 1]`. The positions differ even though the prices match.
- **Half the target:** a single book priced 9 cannot pay an 18 voucher on its own, because `left < right` keeps the two positions distinct.
- **Unsorted input:** opposite pointers is not correct without sorted order. The player rejects unsorted prices for this approach instead of silently sorting them, because sorting would change the positions you must report.
