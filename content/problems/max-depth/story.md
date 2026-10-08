## Situation

A tree has branches splitting at every node: **3** at the top, **9** and **20** below, and **15** and **7** under 20.

## Goal

Return how many nodes lie on the longest path from the top down to a leaf.

## Rules

- Count nodes, not edges: a single node has depth 1.
- An empty tree has depth 0.

## Worked example

The path **3 → 20 → 15** has 3 nodes, so the depth is **3**.
