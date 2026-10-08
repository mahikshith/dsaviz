## Intuition

A pile of plates: you add to the top and you take from the top. A [[stack]] is the right tool whenever **the most recent unfinished thing must be dealt with first**: nested compartments, nested brackets, an undo history, the functions waiting for a call to return.

## Recognition clues

- Items open and close, and they must close in the reverse order of opening.
- At each step you need the most recent item that is still waiting.
- The input has nested structure: brackets, tags, folders, function calls.

## Template

```python
stack = []
for item in items:
    if opens(item):
        stack.append(item)
    elif not stack or not closes(stack[-1], item):
        return False
    else:
        stack.pop()
return not stack
```

## Preconditions

The structure must nest: anything opened later closes earlier. If items can finish in any order, like parking spaces that free up independently, a stack gives wrong answers and a set or a counter is the right tool.

## When it fails

Counting alone is tempting but wrong: `([)]` has one of each opener and closer, yet the pairs cross. A stack catches this because it checks order, not just totals. And when there is only one kind of bracket, a single counter is enough; the stack earns its place when several kinds must match.
