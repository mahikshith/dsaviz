## Why it works

A node is valid exactly when its value lies strictly between the largest ancestor it sits to the right of and the smallest ancestor it sits to the left of. Those two numbers are the range passed down.

Going left keeps the lower limit and tightens the upper limit to the parent's value; going right does the opposite. If every node lies within its range, every ancestor's rule holds; if any node falls outside, some ancestor's rule is broken.

## Complexity

Each node is checked once: **O(n) time**, **O(h) [[auxiliary-space|auxiliary space]]** for the recursion.

## Edge cases

- **Rule broken by a grandparent**, as in the third example: comparing only with the parent misses it.
- **Equal values:** not allowed here.
- **Empty tree:** valid.
