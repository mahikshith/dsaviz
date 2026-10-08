## Why it works

For position i, the product of everyone else is (product of `nums[0..i−1]`) × (product of `nums[i+1..n−1]`).

The left pass writes the first factor into `answer[i]` before multiplying `nums[i]` into the running product, so `nums[i]` is excluded. The right pass does the same from the other end and multiplies in the second factor. No division is used, so zeros cause no trouble.

## Complexity

Two passes: **O(n) time**. Apart from the answer list, two running numbers: **O(1) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **One zero:** only that position has a non-zero score.
- **Two zeros:** every score is 0.
- **Negative numbers:** handled naturally.
