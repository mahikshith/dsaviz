## Why it works

Because the diary is sorted and tidy, the meetings fall into three consecutive groups: those that end before the new meeting starts (untouched), those that overlap it (all merge into one), and those that start after it ends (untouched).

The first loop copies group one. The second absorbs every meeting whose start is at or before the new end, widening the new meeting to the smallest start and largest end. The rest are copied. Each meeting is visited once.

## Complexity

One pass: **O(n) time**, **O(n) [[auxiliary-space|auxiliary space]]** for the output.

## Edge cases

- **No overlap, inserted in the middle:** the merged group is empty; the new meeting goes between.
- **Before or after everything:** inserted at the start or end.
- **Swallows everything:** a single block remains.
