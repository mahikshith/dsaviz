## Why it works

Keep a counter of how many of each list item the window still needs, plus the total still missing.

Growing the window by one stall lowers the need for that item. When nothing is missing, the window covers the list; shrinking from the left keeps it covering until removing a needed item. The shortest cover ending at each right edge is found at that moment. Because the left edge never needs to move back, each stall enters and leaves the window once.

## Complexity

Each character enters and leaves the window at most once: **O(n + m) time**. The counter holds at most one entry per distinct character: **O(m) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **List longer than the street:** no window.
- **Repeated list items:** the counter must track how many.
- **Whole street needed:** the answer is the whole string.
