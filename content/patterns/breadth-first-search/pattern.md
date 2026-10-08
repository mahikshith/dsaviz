## Intuition

Drop a stone in a pond: the ripple reaches everything one step away, then everything two steps away, and so on. Breadth-first search explores a [[graph]] the same way. A [[queue]] makes sure nearer [[node|nodes]] are always explored before farther ones, which is why the first time it reaches a node, it has found the fewest edges to it.

## Recognition clues

- You need the fewest steps, moves or hops between two states.
- Every step costs the same: an [[unweighted]] graph or a grid.
- The problem talks about levels, layers, rings or a minimum number of moves.

## Template

```python
from collections import deque

distance = {start: 0}
queue = deque([start])
while queue:
    node = queue.popleft()
    for nxt in neighbours[node]:
        if nxt not in distance:
            distance[nxt] = distance[node] + 1
            queue.append(nxt)
```

## Preconditions

All edges must cost the same. Record a node's distance when it is **discovered**, that is, when it joins the queue, not when it leaves; otherwise the same node can be queued many times.

## When it fails

With different edge costs, the fewest edges is not the cheapest route: three short streets can beat one long motorway, but BFS would pick the motorway. Use Dijkstra's algorithm for weighted graphs. And swapping the queue for a stack turns this into depth-first search, which finds *a* route but not necessarily the shortest.
