## Why it works

Keep this [[invariant]]: *every person in the notebook has exactly one copy, and once a person's walk finishes, their copy is linked to copies of all their friends.*

The first visit to a person creates their copy and notes it before visiting friends, so a cycle that leads back finds the notebook entry instead of copying again. Every friendship is followed once from each side, linking the two copies.

## Complexity

Every person and friendship is handled a constant number of times: **O(V + E) time**. The notebook and recursion hold up to V entries: **O(V) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Empty graph:** return nothing.
- **One person with no friends:** a single copy.
- **Cycles:** without the notebook the copy never finishes.
