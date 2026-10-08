## Why it works

Keep this [[invariant]]: *the window `s[left..right]` has no repeated character, and no valid substring ending at `right` starts before `left`.*

When `s[right]` was last seen at a position inside the window, any substring ending at `right` that includes that earlier position contains the character twice. So the earliest valid start is one past it, and the left edge jumps there. If the earlier position is already left of the window, it does not matter and `left` stays put; that is why the code checks `last[ch] >= left`. The window is then the longest valid substring ending at `right`, and `best` keeps the longest over all `right`.

## Complexity

Each character is read once and `left` only moves forward: **O(n) time**. The map holds at most one entry per distinct character: **O(k) [[auxiliary-space|auxiliary space]]**, at most 26 for lowercase letters.

## Edge cases

- **Empty string:** no characters; the answer is 0.
- **All the same**, such as bbbbb: the window is always 1 long.
- **Earlier twin outside the window**, as in abba: without the `>= left` check, the left edge would jump backwards and the answer would be wrong.
- **All different:** the window grows to the whole string.
