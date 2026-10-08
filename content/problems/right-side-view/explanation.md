## Why it works

In a right-first depth-first walk, all rooms of a floor are reached in right-to-left order. The first time the walk reaches depth d, it is at the rightmost room of floor d, because every room further right on that floor would have been visited earlier.

So recording a room exactly when the view has d entries gives one room per floor, the right one.

## Complexity

Each node is visited once: **O(n) time**, **O(h) [[auxiliary-space|auxiliary space]]** for the recursion.

## Edge cases

- **Left branch deeper than right:** lower floors are seen through the left side.
- **Empty tree:** empty view.
- **One node:** just that node.
