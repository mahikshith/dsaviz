## Intuition

A scheduler with a diary sorts meetings by start time and walks through them. If a meeting starts before the previous one ends, the two become one longer meeting; otherwise a new meeting begins. After sorting, one pass settles every [[interval]].

## Recognition clues

- Inputs are ranges with a start and an end.
- The task mentions overlaps, gaps, merging, free time or rooms.
- Comparing every pair of ranges would be O(n²).

## Template

```python
intervals.sort(key=lambda iv: iv[0])
merged = []
for start, end in intervals:
    if merged and start <= merged[-1][1]:
        merged[-1][1] = max(merged[-1][1], end)
    else:
        merged.append([start, end])
```

## Preconditions

You must be able to sort by start. Decide whether touching ranges, such as 1–3 and 3–5, count as overlapping, and use `<=` or `<` to match.

## When it fails

If intervals arrive one at a time and must be queried in between, re-sorting each time is too slow; balanced trees or interval trees fit better. Sorting by end instead of start answers different questions, such as the most non-overlapping meetings.
