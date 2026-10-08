## Intuition

Think of the view from a train window. As the train moves, one thing leaves the view on one side and one thing enters on the other; everything in between is still there. A sliding window keeps a running summary of a [[subarray]] and updates it from what enters and what leaves, instead of starting again at every position.

There are two kinds, and they rely on different facts. A **fixed** window always holds exactly k items. A **variable** window grows its right edge and shrinks its left edge to keep a condition true.

## Recognition clues

- The task is about consecutive items: a subarray or substring, not a [[subsequence]].
- It asks for the best, longest, shortest or number of such stretches.
- Neighbouring stretches overlap, so recomputing each one repeats most of the work.

## Template

```python
# Fixed size k
window = sum(items[:k])
best = window
for start in range(1, len(items) - k + 1):
    window += items[start + k - 1] - items[start - 1]
    best = max(best, window)
```

## Preconditions

A **fixed** window only needs k to be fixed. It does not care whether values are negative. A **variable** window needs a monotone condition: once a window breaks the rule, growing it must not fix it, and shrinking a valid window must not break it. For sums that usually means every value is zero or more.

## When it fails

Variable windows break on negative values. Take "the shortest subarray with a sum of at least 4" on `[3, -2, 5]`. The window grows to the whole array (sum 6), then shrinks by dropping 3. The sum falls to 3, too small, so it stops and reports length 3. But `[5]` alone has sum 5 and length 1. Dropping −2 would have **raised** the sum, which the shrinking rule never expects. Problems like this need a different technique, such as [[prefix-sum|prefix sums]] with a sorted structure.
