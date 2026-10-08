## Why it works

Keep this [[invariant]]: *after the first `i` pairs, `count[x]` equals (copies of x among the first i letters of s) minus (copies of x among the first i letters of t).*

Each step adds one for `s[i]` and subtracts one for `t[i]`, which keeps it true. After all pairs, a count of zero for every letter means both words contain each letter equally often, which is exactly the definition of an anagram. Any non-zero count is a letter one word has more of.

## Complexity

One pass over both words: **O(n) time**. The tally holds at most 26 letters: **O(1) [[auxiliary-space|auxiliary space]]** for a fixed alphabet. Sorting both words instead costs O(n log n).

## Edge cases

- **Different lengths:** they can never be anagrams; answer False before counting.
- **Repeated letters**, such as aab and aba: counts handle repeats naturally.
- **Same word:** every count cancels immediately; True.
- **Empty words:** two empty words are anagrams of each other.
