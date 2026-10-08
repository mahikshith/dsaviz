## Why it works

Keep this [[invariant]]: *`prev` is the head of the already-reversed front part, and `curr` is the head of the untouched rest.*

Saving `curr.next` before pointing `curr` at `prev` keeps the rest of the train reachable. After the switch, `curr` belongs to the reversed part, so moving both pointers forward restores the invariant. When `curr` runs out, `prev` heads the whole reversed train.

## Complexity

One pass: **O(n) time**, **O(1) [[auxiliary-space|auxiliary space]]**. The recursive version also uses O(n) call-stack space.

## Edge cases

- **Empty train:** return nothing.
- **One carriage:** returned unchanged.
- **Forgetting to save next** loses the rest of the train.
