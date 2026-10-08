## Intuition

A conductor turning a train around unhooks each carriage and re-hooks it facing backwards. Three hands are enough: one on the carriage already turned, one on the carriage being turned, and one on the carriage ahead, so the rest of the train is never lost. A [[linked-list|linked list]] reverses the same way, in place.

## Recognition clues

- The task changes the order of a linked list: reverse it, reverse part of it, or reverse groups.
- You are asked for O(1) extra memory.
- Copying the values into an array would be the obvious, but disallowed, shortcut.

## Template

```python
prev, curr = None, head
while curr:
    nxt = curr.next      # save the rest of the list
    curr.next = prev     # turn this link around
    prev, curr = curr, nxt
return prev              # the old tail is the new head
```

## Preconditions

You must be allowed to change the links. Save `next` before overwriting `curr.next`, or the rest of the list is lost.

## When it fails

If the list must stay unchanged, reverse a copy or use a stack instead. Forgetting to save `next`, or returning `curr` instead of `prev`, are the two classic bugs.
