## Why it works

Keep this [[invariant]]: *every index from 0 to `reach` is reachable, and no index beyond `reach` is reachable using only the indices visited so far.*

Reachable indices form an unbroken stretch: if you can land on index j, you can land on every index before it on the way. Visiting a reachable index i extends the stretch to `i + nums[i]` if that is further. If the loop arrives at an index beyond `reach`, nothing visited can get there, so the end is unreachable.

## Complexity

One pass: **O(n) time**, **O(1) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **One stone:** already at the end.
- **Zeros:** only a problem if every route stops on one.
- **First stone is 0** with more stones after: stuck immediately.
