## Why it works

Keep this [[invariant]]: *after day `d`, `buy` is the cheapest day among days 0 to `d`, and `best` is the best profit from any sale on days 1 to `d`.*

On day `d + 1`, the best sale that day buys at the cheapest earlier day, which is exactly `buy`. Comparing that profit with `best` keeps the second half true; moving `buy` when today is cheaper keeps the first half true. A cheaper day only helps sales that come after it, which is why it replaces `buy` rather than changing `best`.

## Complexity

One pass: **O(n) time**, **O(1) [[auxiliary-space|auxiliary space]]**. Trying every pair of days is O(n²).

## Edge cases

- **One day:** no sale is possible; 0.
- **Falling prices:** every day is a new cheapest; the profit stays 0.
- **A late dip**, as in 2, 4, 1: the cheapest day comes last and is never used, which is correct.
