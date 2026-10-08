## Why it works

Every basket can be written with its items in non-decreasing order, and the search only builds baskets in that order: after adding item i, the next item comes from index i or later. So each basket is built exactly once.

Because items are sorted and positive, once an item would overshoot the remaining budget, every later item would too, so the loop stops there.

## Complexity

The number of baskets can grow exponentially with the target; pruning keeps the search to baskets that can still fit. The current basket is at most target / smallest item long: **O(target / min) [[auxiliary-space|auxiliary space]]** besides the output.

## Edge cases

- **No basket fits:** return an empty list.
- **Target equal to one item:** that item alone is a basket.
- **Starting the next step at index 0** would list the same basket in many orders.
