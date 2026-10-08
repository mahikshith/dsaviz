## Intuition

Picture two people searching a row of boxes, one starting at each end. After every look, one of them can say "nothing at my end can be part of the answer" and take a step inward. Neither ever walks back, so the search ends after at most one step per box.

The power comes from a rule that tells you **which end to drop**. In a sorted array, a total that is too small means the smallest value is useless; a total that is too large means the largest value is useless. In a mirror check, a matching pair means both ends are finished.

## Recognition clues

- The input is sorted, or has a mirror structure you can compare from both ends.
- You need a pair, or the two ends of something, that satisfies a condition.
- The obvious solution compares every pair, which is O(n²).
- You are asked to use O(1) extra space.

## Template

```python
left, right = 0, len(items) - 1
while left < right:
    if is_answer(left, right):
        return left, right
    if left_end_is_ruled_out(left, right):
        left += 1
    else:
        right -= 1
return None
```

## Preconditions

You need a reason that makes dropping one end **safe**: sorted order for sums, or a mirror rule for [[palindrome|palindromes]]. Without that reason, moving a pointer can skip the answer. Sorting the input first only works when the task asks for values, not original positions, because sorting changes positions.

## When it fails

On unsorted input, a total that is too small proves nothing about the left value. Take `[2, 7, 1, 3]` with target 9, where 2 + 7 = 9 is an answer. The ends give 2 + 3 = 5, too small, so the left pointer drops 2, the very value we needed. The pointers then meet without finding a pair.
