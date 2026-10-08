## Intuition

Keep a running total in the margin: after each item, write down the sum so far. Then the total of any stretch is the running total at its end minus the running total just before its start. One pass of preparation turns every range question into a single subtraction.

## Recognition clues

- Many questions ask for totals of different ranges of the same array.
- The obvious answer re-adds overlapping ranges again and again.
- The values can be added and subtracted exactly, such as counts or whole numbers.

## Template

```python
prefix = [0]
for v in items:
    prefix.append(prefix[-1] + v)

# total of items[a] .. items[b], inclusive
total = prefix[b + 1] - prefix[a]
```

## Preconditions

Subtraction must undo addition. That holds for sums and counts but not for operations like maximum: the largest of the first 5 items and the largest of the first 2 items tell you nothing about the largest of items 2 to 4.

## When it fails

If the array changes between questions, every prefix after the change must be rewritten, which costs O(n) per update. When updates and range questions are mixed, structures such as a Fenwick tree fit better. For a single pass over fixed-size stretches, a [[window]] uses O(1) memory where prefix sums use O(n).
