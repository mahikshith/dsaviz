## Why it works

Keep this [[invariant]]: *at the start of each round, the [[queue]] holds exactly the nodes of the next floor, left to right.*

It holds for the top floor. Taking exactly that many nodes from the front records the floor, and adding each node's children in left-then-right order places the next floor in the queue, in order, behind them. So each round produces one floor.

## Complexity

Each node is added and removed once: **O(n) time**. The queue holds at most one floor: **O(w) [[auxiliary-space|auxiliary space]]**, where w is the widest floor.

## Edge cases

- **Empty tree:** no floors.
- **A one-sided tree:** every floor has one node.
- **Missing children** are simply not added.
