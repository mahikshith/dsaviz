## Why it works

If there is no loop, the hare reaches the end and the answer is False.

If there is a loop, both walkers eventually enter it. From then on, each step brings the hare one carriage closer to the tortoise around the loop, because it moves two while the tortoise moves one. The gap shrinks by one each step, so it reaches zero: they meet within one lap.

## Complexity

The walkers meet within a number of steps proportional to the list's length: **O(n) time**, **O(1) [[auxiliary-space|auxiliary space]]**. The set version uses O(n) memory.

## Edge cases

- **Empty list or one carriage without a loop:** False.
- **A carriage linking to itself** is a loop of length 1.
- **Equal values** must not be mistaken for the same carriage.
