## Why it works

Keep this [[invariant]]: *everything before `write` is the books read so far, in order, and everything from `write` to `read` is a gap.*

When `read` finds a book, swapping it with position `write` moves it to the end of the tidy part and moves a gap (or the book itself, when `write == read`) behind it. Gaps are skipped. When `read` finishes, the tidy part holds every book in order and the rest are gaps.

## Edge cases

- **No gaps:** every swap is a book with itself; nothing changes.
- **All gaps:** `write` never moves.
- **Gap at the end already:** stays there.
