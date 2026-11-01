# Complexity reference: research notes

Reference only. No prose or tables copied. All site text is our own. Facts checked against standard texts (CLRS, Sedgewick) and the Python TimeComplexity wiki page.

| Source | Covers | Structure ideas | License |
|---|---|---|---|
| https://github.com/krahets/hello-algo | Complexity analysis chapters: time, space, recursion cost | Worked loop examples, "common types" ladder, space from call stack | CC BY-NC-SA 4.0 (non-commercial: reference only) |
| https://github.com/jwl-7/leetcode-cheatsheet | Big-O time/space, code templates, sorts | One-page quick tables per topic | see repo |
| https://github.com/Chalarangelo/30-seconds-of-code | Big-O cheat sheet: structure ops average/worst, sorts best/avg/worst | Two tables: structures, sorting | CC BY 4.0 (check repo) |
| https://github.com/RehanSaeed/.NET-Big-O-Algorithm-Complexity-Cheat-Sheet | Time/space of common algorithms, growth chart | Colour-coded growth chart | see repo |
| https://github.com/tajpouria/algorithms-and-data-structures-cheat-sheet | Big-O, arrays, lists, hashing, search, sort | Short per-topic notes | see repo |

## Ideas we use
- Growth chart with a slider, plus a plain "about X steps" readout.
- Rules as small steps: one loop, nested, halving, two loops, recursion tree, drop constants, amortized.
- Space: extra memory vs input; call stack depth.
- Sortable/filterable tables; own 16-pattern table.
- "Input size tells the target" ladder (limits to complexity).
