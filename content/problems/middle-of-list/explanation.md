## Why it works

After k loops, slow has moved k carriages and fast 2k. The loop stops when fast is on the last carriage (odd length) or past it (even length). For n carriages that happens when k = ⌊n / 2⌋, so slow stands on carriage ⌊n / 2⌋ counting from 0, which is the middle, or the second middle when n is even.

## Edge cases

- **One carriage:** the loop never runs; it is the middle.
- **Two carriages:** the second one is returned.
- **Checking fast.next** before the double step avoids stepping off the end.
