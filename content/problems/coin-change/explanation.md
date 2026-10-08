## Why it works

Any way of making amount a ends with some coin c, after making a − c. So `fewest[a] = 1 + min(fewest[a − c])` over coins c ≤ a, with `fewest[0] = 0`.

Filling the table from 0 upwards means every smaller amount is already final when it is needed. Choosing the largest coin first is not always right: with coins 1, 3 and 4, making 6 greedily gives 4 + 1 + 1, but 3 + 3 uses only two coins. The table considers every last coin, so it never makes that mistake.

## Complexity

a amounts × k coins: **O(a · k) time**, **O(a) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Amount 0:** 0 coins.
- **Unreachable amount:** stays infinite; return −1.
- **Greedy fails** for coin sets such as 1, 3, 4.
