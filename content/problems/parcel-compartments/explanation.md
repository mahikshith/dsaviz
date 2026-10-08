## Why it works

Keep this [[invariant]]: *the stack holds the opening symbols read so far that are still unmatched, oldest at the bottom and most recent on top.*

Pushing an opener keeps it true. When a closer arrives, its only possible partner is the most recent unmatched opener, the top. If the stack is empty there is no partner; if the top has another shape, the nesting is crossed. Either way the log is wrong. A matching top is popped, which keeps the invariant. At the end the log is correct exactly when no opener is left unmatched, that is, when the stack is empty.

## Complexity

Each symbol is pushed or popped at most once: **O(n) time**. A log that only opens compartments puts every symbol on the stack: **O(n) [[auxiliary-space|auxiliary space]]** in the worst case.

## Edge cases

- **Empty log:** nothing to check, so the answer is True.
- **Closing first**, as in `)(`: the stack is empty when the lid arrives, so the answer is False at once.
- **Crossed lids**, as in `([)]`: the counts match but the order does not. Counting symbols alone is not enough.
- **Left open**, as in `((`: no lid was wrong, but the stack is not empty at the end.
