## Why it works

The mirror of a tree has the same root, with the mirror of the old right subtree on the left and the mirror of the old left subtree on the right.

The function does exactly that: swap the children, then mirror each one. Each call works on a smaller tree, and an empty tree is its own mirror, so the [[recursion]] ends and every node is swapped once.

## Complexity

Each node is visited once: **O(n) time**. The call stack holds one call per level: **O(h) [[auxiliary-space|auxiliary space]]**, where h is the height.

## Edge cases

- **Empty tree:** returned as it is.
- **A single node:** nothing to swap.
- **A very deep, one-sided tree:** recursion depth equals its height.
