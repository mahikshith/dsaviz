## Why it works

The water above rock i is `min(tallest left of i, tallest right of i) − heights[i]`.

Keep `left_max` (tallest rock the left walker has passed, including its current rock) and `right_max` likewise. If `heights[left] < heights[right]`, then some rock on the right is at least as tall as `left_max`, so the true limit at `left` is `left_max`: the right side can only be taller. The water at `left` is settled and the walker moves on. The other case is symmetric. Each rock is settled exactly once.

## Complexity

One pass with two walkers: **O(n) time**, **O(1) [[auxiliary-space|auxiliary space]]**. Precomputing both tables takes O(n) memory.

## Edge cases

- **Fewer than three rocks:** nothing can be trapped.
- **Rising or falling rocks:** water runs off; 0.
- **Equal heights at the walkers:** moving either side is safe.
