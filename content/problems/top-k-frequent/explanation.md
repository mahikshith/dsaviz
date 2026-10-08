## Why it works

The map gives each song's count in one pass. A song's count is between 1 and n, so putting each song on the shelf for its count groups songs by count without comparing them. Reading shelves from n downwards visits songs from most to least requested, so the first k collected are the top k.

## Complexity

Counting and shelving are both linear: **O(n) time**, **O(n) [[auxiliary-space|auxiliary space]]**. The heap version is O(n log k).

## Edge cases

- **k equals the number of distinct songs:** return every song.
- **One song:** it is the answer.
- **Ties at the k-th place** would make the answer ambiguous; the problem guarantees none.
