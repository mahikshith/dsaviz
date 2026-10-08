## Why it works

With running totals P (P[0] = 0), the stretch from i to j adds up to `P[j+1] − P[i]`. So the stretches ending at j that add up to k correspond one-to-one with earlier checkpoints whose total is `P[j+1] − k`.

Keeping a count of how many times each total has appeared lets one lookup count them all. Looking up before recording the current total ensures only earlier checkpoints are counted. This works with negative values, unlike a sliding window.

## Complexity

One pass with one lookup per coin: **O(n) time**. The notebook holds up to n + 1 totals: **O(n) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Negative values:** a sliding window fails here; prefix counts do not.
- **k = 0:** equal running totals fence off zero-sum stretches.
- **Repeated totals:** each earlier occurrence is a separate stretch.
