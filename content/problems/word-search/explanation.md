## Why it works

The search tries every path that could spell the word: from each starting square, it extends the path one matching neighbour at a time. A chalk mark keeps any square from being used twice on the current path, and rubbing it out when backing up lets other paths use it.

Because a path is abandoned only when its next letter cannot match, no valid path is ever skipped, so if the word can be traced, the search finds it.

## Complexity

In the worst case each of the m·n starting squares explores up to 4ᴸ paths for a word of length L, though mismatches cut most short. The current path needs **O(L) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Word longer than the grid:** impossible.
- **Reusing a square:** prevented by the chalk mark.
- **Single-letter word:** any matching square.
