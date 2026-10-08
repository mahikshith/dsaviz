## Why it works

Every palindrome has a centre: its middle letter (odd length) or the gap between its two middle letters (even length). Expanding from that centre, the stretch stays a palindrome exactly as long as the next two outer letters match.

Trying all 2n − 1 centres therefore finds every maximal palindrome, and the longest of those is the answer.

## Complexity

Each of the 2n − 1 centres expands at most n/2 times: **O(n²) time**, **O(1) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **One letter:** the letter itself.
- **Even length**, such as cbbd: needs the between-letters centres.
- **All the same letter:** the whole word.
