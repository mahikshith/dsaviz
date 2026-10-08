## Why it works

Keep this [[invariant]]: *`tails[k]` is the smallest possible top of any staircase of length k + 1 among the people seen so far, and `tails` is strictly increasing.*

A new height h extends the longest staircase whose top is below h; the first entry not below h is replaced by h, which lowers that length's best top without breaking the order. If no entry is at least h, h extends the longest staircase. The length of `tails` is therefore the longest staircase.

## Complexity

Each person does one binary search: **O(n log n) time**, **O(n) [[auxiliary-space|auxiliary space]]**. The simpler table version is O(n²).

## Edge cases

- **Equal heights** do not extend each other.
- **Falling line:** every staircase has one person.
- **`tails` is not itself a staircase from the line**, only its length is meaningful.
