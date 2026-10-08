## Intuition

A talent show keeps only its best k acts in a small room, with the weakest act standing by the door. A new act gets in only if it beats that weakest one, who then leaves. A [[heap]] is that room: the weakest kept item is always on top, and swapping it out costs O(log k).

## Recognition clues

- "k largest", "k smallest", "k most frequent", "k closest".
- You repeatedly need the smallest or largest remaining item.
- Several sorted sources must be combined into one order.

## Template

```python
import heapq

best = []
for x in items:
    heapq.heappush(best, x)
    if len(best) > k:
        heapq.heappop(best)   # drop the weakest
return best[0]                 # the k-th largest
```

## Preconditions

Items must be comparable. A heap of size k gives O(n log k) time and O(k) memory, which beats sorting everything when k is much smaller than n.

## When it fails

A heap only knows its top. Finding an arbitrary item or listing everything in order still costs O(n log n). When k is close to n, sorting once is simpler and just as fast.
