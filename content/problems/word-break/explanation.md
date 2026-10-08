## Why it works

Let can[i] mean "the first i letters split into words". can[0] is true. A position i is reachable exactly when some earlier reachable position j has `s[j:i]` in the dictionary, because that word is the last piece of the split.

Filling can[] from left to right means every j is final before it is used, and the answer is can[n].

## Complexity

For each position, check every earlier position: **O(n²) time** (plus the cost of slicing words), **O(n) [[auxiliary-space|auxiliary space]]** for the marks.

## Edge cases

- **A word that fits but leads nowhere**, as car in cars: other splits must still be tried, which the marks handle.
- **Repeated words** are allowed.
- **No word fits at the start:** False immediately.
