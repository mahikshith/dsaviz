## Why it works

At depth k, the first k chairs hold k different guests. Trying each unseated guest in chair k and recursing builds every arrangement of the remaining guests behind each choice. Different choices for chair k lead to different orders, and every order is reached by choosing its guests chair by chair, so each of the n! orders appears exactly once.

## Complexity

n! orders of length n: **O(n · n!) time**, **O(n) [[auxiliary-space|auxiliary space]]** besides the output.

## Edge cases

- **One guest:** one order.
- **Repeated values** would produce duplicate orders unless equal guests are skipped at the same chair.
- **Forgetting to unseat** leaves later chairs with too few guests.
