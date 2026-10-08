## Intuition

A maze explorer with chalk follows one corridor as far as it goes, marking every junction. At a dead end they walk back to the last junction with an unexplored corridor. On a [[tree]], this becomes [[recursion]]: ask each child for its answer, then combine them at the parent.

## Recognition clues

- Trees: depth, paths, mirroring, validating, any question answered by combining children's answers.
- Grids or graphs: count connected regions, copy a structure, or check reachability.
- You need to explore everything, but not shortest distances.

## Template

```python
def dfs(node):
    if node is None:
        return base_answer
    left = dfs(node.left)
    right = dfs(node.right)
    return combine(node, left, right)
```

## Preconditions

On graphs and grids, mark each node when you first visit it; otherwise cycles loop forever. Recursion depth equals the path length, so very deep inputs may need an explicit [[stack]].

## When it fails

Depth-first finds *a* route, not the shortest one; use breadth-first search for fewest steps. On a chain of 100,000 nodes, recursion can overflow the call stack.
