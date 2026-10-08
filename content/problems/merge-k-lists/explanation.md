## Why it works

Keep this [[invariant]]: *the heap holds the front carriage of every train that still has carriages.*

The smallest remaining carriage overall must be one of those fronts, because each train is sorted. Popping the heap's minimum and pushing that train's next carriage keeps the invariant. Each of the N carriages is pushed and popped once.

## Complexity

N carriages, each with heap operations on at most k items: **O(N log k) time**, **O(k) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **No trains or only empty trains:** the result is empty.
- **One train:** returned as it is.
- **Equal values:** a tie-breaker (the train's index) avoids comparing nodes.
