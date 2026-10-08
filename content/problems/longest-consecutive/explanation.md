## Why it works

Every run has exactly one first page: the page x for which x − 1 is missing. Counting upwards only from such pages visits each page of each run once in total, so all the counting together is O(n).

Membership checks use a set, so each check is one step on average.

## Complexity

Each page is inserted once and checked a constant number of times: **O(n) time**, **O(n) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Duplicates:** the set removes them.
- **Negative numbers:** handled the same way.
- **Empty list:** 0.
