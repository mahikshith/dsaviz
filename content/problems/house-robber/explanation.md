## Why it works

Let best(i) be the most collectable from houses 0 to i. The group either skips house i, collecting best(i − 1), or sings there, collecting `money[i] + best(i − 2)`, since house i − 1 must then be skipped. So `best(i) = max(best(i − 1), money[i] + best(i − 2))`.

Each best only needs the two before it, which is why two running numbers are enough.

## Complexity

One pass: **O(n) time**, **O(1) [[auxiliary-space|auxiliary space]]** with two running totals.

## Edge cases

- **One house:** take it.
- **Two houses:** take the larger.
- **Zeros:** skipping costs nothing.
