## Why it works

The longest path from a node goes through the node itself and then down whichever child has the longer path. So `depth(node) = 1 + max(depth(left), depth(right))`, with `depth(empty) = 0`.

Each call solves a smaller tree, so the [[recursion]] ends, and every node is asked once.

## Complexity

**O(n) time**; the call stack is as deep as the tree: **O(h) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Empty tree:** 0.
- **One node:** 1.
- **Completely one-sided tree:** depth equals the number of nodes.
