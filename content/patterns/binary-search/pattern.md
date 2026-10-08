## Intuition

Guess a number between 1 and 100 and you are told "higher" or "lower". Guessing the middle each time halves what is left, so seven guesses always suffice. Binary search does this on any sorted range: compare with the middle and throw away the half that cannot hold the answer.

## Recognition clues

- The input is sorted, or a yes/no condition switches from no to yes exactly once along the range.
- The task asks for a position, a boundary, or the smallest value that works.
- A straight scan would be O(n) on a large input.

## Template

```python
low, high = 0, len(items) - 1
while low <= high:
    mid = (low + high) // 2
    if items[mid] == target:
        return mid
    if items[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
return -1
```

## Preconditions

Sorted order, or a monotone condition. Decide whether your bounds are inclusive and how `mid` rounds before you write the loop; most bugs live there.

## When it fails

On unsorted data, comparing with the middle says nothing about either half. Off-by-one mistakes are the other classic failure: with `low < high` instead of `low <= high` in the template above, a one-item range is never checked.
