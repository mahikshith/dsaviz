## Intuition

A stone-hopper crossing a river does not plan every route. At each stone they note the farthest stone they could reach so far. If they ever stand beyond that point, they are stuck; if the farthest reach passes the far bank, they make it. Keeping one number, the best so far, replaces exploring every path.

## Recognition clues

- The question asks for a maximum, minimum or yes/no that can be settled while scanning once.
- A single "best so far" value seems to summarise everything that matters about the past.
- An argument like "taking the better option now can never hurt later" is easy to make.

## Template

```python
reach = 0
for i, step in enumerate(items):
    if i > reach:
        return False          # this position cannot be reached
    reach = max(reach, i + step)
return True
```

## Preconditions

You need a reason, an [[invariant]] or an exchange argument, that the local choice is safe. Without one, a greedy answer is just a guess.

## When it fails

Making change with coins 1, 3 and 4 for 6: greedy takes 4 + 1 + 1 (three coins), but 3 + 3 uses two. When a locally best choice can block a better combination, use dynamic programming instead.
