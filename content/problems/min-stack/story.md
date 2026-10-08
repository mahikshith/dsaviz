## Situation

In a busy canteen, plates are piled up and taken from the top. Each plate has a number, and the manager keeps asking: what is the smallest number in the pile right now?

## Goal

Support four operations, each answered at once: push a plate, pop the top plate, read the top plate, and report the smallest plate in the pile.

## Rules

- pop, top and getMin are only called on a non-empty pile.
- Each operation should take constant time.
- The answer lists the result of each operation; push and pop return nothing.

## Worked example

Push −2, 0, −3. getMin gives **−3**. Pop removes −3, top gives **0**, and getMin gives **−2**.
