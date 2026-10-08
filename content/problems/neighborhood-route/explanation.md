## Why it works

Keep this [[invariant]]: *corners leave the queue in nondecreasing order of distance, and every recorded distance is the true [[distance]] from home.*

Home starts alone in the queue at distance 0. A corner taken out at distance d adds its undiscovered neighbours at distance d + 1 to the back, behind any corners still waiting at distance d, so the order holds. A corner reached for the first time cannot be closer than d + 1: if it were, it would have been discovered from a corner at distance d − 1 or less, and all of those left the queue earlier. Corners already discovered are skipped, because their recorded distance is already as small as it can be. The argument needs every street to cost the same; with different costs, use Dijkstra's algorithm.

## Complexity

Every corner joins the queue at most once and every street is looked at twice at most, once from each end: **O(V + E) time** for V corners and E streets. The queue, the distances and the route notes use **O(V) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Already there:** if start equals the goal, the answer is 0 streets and the route is just that corner.
- **Unreachable:** if the queue empties before the goal is discovered, there is no route.
- **Loops:** a corner that was already discovered is skipped, so cycles never cause repeated work.
- **Several shortest routes:** BFS returns one of them, depending on the order the streets are listed. They all have the same length.
- **Duplicate streets:** a street listed twice simply leads to an already discovered corner the second time.
