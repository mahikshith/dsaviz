## Intuition

A tortoise and a hare start on the same track. The hare covers two steps for every one of the tortoise. On a straight track the hare reaches the end while the tortoise is exactly halfway; on a looped track the hare laps the tortoise and they meet.

## Recognition clues

- A [[linked-list|linked list]] where you need the middle, a [[cycle]], or the start of a cycle.
- You cannot index into the structure, and counting it first would take a second pass.
- O(1) extra memory is required.

## Template

```python
slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow is fast:
        return True        # they met: there is a cycle
return False               # fast fell off the end; slow is at the middle
```

## Preconditions

You need to move along the structure one link at a time, and to compare nodes by identity. Check `fast` and `fast.next` before each double step.

## When it fails

If you need to know where a duplicate value is, not just whether a loop exists, a set of visited nodes is simpler. With an array you can index directly, so the middle is just `n // 2`.
