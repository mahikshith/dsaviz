## Intuition

A coat-check counter never searches the racks: it hands out a ticket and finds the coat by its ticket number. A [[hash-map|hash map]] does the same for data. Write each item down under a key as you pass it, and any later question about it ("have I seen this?", "how many?", "where was it?") takes one step.

## Recognition clues

- The obvious solution compares every pair, or rescans everything seen so far.
- You need to know whether something appeared before, how often, or where.
- Order does not matter for the lookup, only equality.
- Extra memory is allowed.

## Template

```python
seen = {}
for i, x in enumerate(items):
    partner = need(x)
    if partner in seen:
        return seen[partner], i
    seen[x] = i
```

## Preconditions

Items must have a key you can compare for exact equality: a number, a string, or a signature such as a word's sorted letters. Hash lookups are O(1) on average, not in every worst case, and they need O(n) memory.

## When it fails

A map cannot answer "what is the nearest value?" or "what lies between 3 and 9?", because it keeps no order; use sorting or a binary search for those. And when memory is tight but the input is sorted, [[pointer|two pointers]] often answer pair questions in O(1) extra space.
