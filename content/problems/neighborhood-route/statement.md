Given an undirected, [[unweighted]] [[graph]] as a list of edges `streets`, a start node `start` and a goal node `goal`, return the length of a shortest path from `start` to `goal` together with one such path, or `None` if `goal` cannot be reached.

- If `start == goal`, return distance 0 with the path `[start]`.
- Any shortest path is accepted.
- Duplicate edges are allowed and change nothing.
- This method is only correct when every edge has the same cost.
- In the interactive player: at most 16 edges and 10 nodes, nodes are single capital letters, and no edge joins a node to itself.
