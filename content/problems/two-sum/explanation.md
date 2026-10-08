## Why it works

Keep this [[invariant]]: *after processing position `i − 1`, the map holds every value seen so far with a position where it occurs.*

When guest `i` arrives, any answer that uses `i` as the later guest needs an earlier guest worth exactly `target − nums[i]`. The map contains every earlier value, so one lookup decides whether such a guest exists. Looking up before writing `nums[i]` down guarantees the two positions differ. If no lookup ever succeeds, no pair exists.

## Edge cases

- **No pair:** the loop ends without a hit; return no answer.
- **Equal values**, such as `[3, 3]` with target 6: the first 3 is written down, and the second finds it.
- **Half the target on its own**, such as `[6]` with target 12: the lookup happens before 6 is written, so 6 never pairs with itself.
- **Negative numbers** work the same way: the needed partner may be negative.
