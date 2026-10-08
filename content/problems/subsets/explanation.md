## Why it works

Each snack is either in or out, so a basket is a sequence of n yes/no answers. The search answers them in order: at depth i it has decided snacks 0 to i − 1, and it tries both answers for snack i before backing up.

Every sequence of answers is reached exactly once, so every basket is listed exactly once. Undoing the last choice after exploring it returns the basket to the state its parent call expects.

## Complexity

There are 2ⁿ baskets of up to n snacks: **O(n · 2ⁿ) time**, and the search itself needs **O(n) [[auxiliary-space|auxiliary space]]** besides the output.

## Edge cases

- **No snacks:** only the empty basket.
- **Saving a reference** instead of a copy makes every saved basket end up empty.
- **Duplicate snacks** would need sorting and skipping equal values.
