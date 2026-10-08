## Why it works

Start both walkers at a placeholder in front of the head, and move the scout n + 1 steps. The gap between them is now n + 1 links. Moving both together keeps the gap. When the scout steps past the last carriage, the marker is exactly n + 1 links from the end, which is the carriage just before the n-th from the end, so relinking its `next` removes the right one. The placeholder makes removing the first carriage the same as any other.

## Edge cases

- **Remove the head**, such as n equal to the length: the placeholder makes this ordinary.
- **One carriage:** the result is empty.
- **n = 1:** remove the last carriage.
