## Why it works

Keep this [[invariant]]: *every pair not yet measured that could beat `best` lies inside `[left, right]`.*

Say `heights[left] < heights[right]`. Any pair using `left` with a partner `j < right` is narrower than the current barrel, and its water level is at most `heights[left]`, so it holds less than the barrel just measured. Nothing is lost by dropping `left`. The case where the right wall is shorter or equal is symmetric. Each step drops one plank, so after n − 1 steps every useful pair has been considered.

## Complexity

One measurement per plank dropped: **O(n) time** and **O(1) [[auxiliary-space|auxiliary space]]**. Trying every pair takes O(n²).

## Edge cases

- **Two planks:** exactly one barrel.
- **Equal walls:** moving either side is safe; this lesson moves the right one.
- **A zero-height plank** holds no water with any partner and is dropped as soon as it is the shorter wall.
