## Why it works

Keep this [[invariant]]: *each course's count is the number of its prerequisites not yet taken, and the [[queue]] holds courses whose count is zero and that have not been taken.*

A course is taken only when all its prerequisites are done, so the order produced is valid. If the prerequisites contain a loop, no course on the loop can ever reach zero, because each waits on another, so fewer than n courses are taken. If there is no loop, some untaken course always has count zero, so every course is eventually taken.

## Complexity

Each course and each prerequisite pair is handled once: **O(V + E) time**, **O(V + E) [[auxiliary-space|auxiliary space]]** for the lists and counts.

## Edge cases

- **No prerequisites:** every course is ready at once; True.
- **A course requiring itself** is a loop; False.
- **Disconnected groups of courses** are handled together by the same queue.
