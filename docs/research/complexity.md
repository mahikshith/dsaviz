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

## GitHub survey, round 2 (README and structure only)

Reference only. No prose or tables copied. Licences read from the GitHub API. NC or unlicensed repos are idea sources, never code or text sources.

| Repo | Covers | Licence | Idea we lacked |
|---|---|---|---|
| https://github.com/ericdrowell/BigOCheatSheet | The classic Big-O cheat sheet site: growth chart, structure and sort tables | none stated | Colour-coded good/bad cells (we have this in tables) |
| https://github.com/trekhleb/javascript-algorithms | Algorithms and structures with a Big-O section and one growth chart | MIT | Nothing new; chart is a static picture, ours is live |
| https://github.com/kdn251/interviews | Interview guide, per-structure time-complexity bullets, sort table | MIT | Per-structure operation lists (we have a table) |
| https://github.com/williamfiset/Algorithms | Large Java implementations with notes | MIT | Complexity written beside each implementation |
| https://github.com/TheAlgorithms/Python | Python implementations, many with complexity notes | MIT | Python-flavoured cost per operation (we added a Python table) |
| https://github.com/algorithm-visualizer/algorithm-visualizer | Code-driven visualiser with tracers | MIT | Step counter beside the animation (we show counts in rules) |
| https://github.com/jwasham/coding-interview-university | Study plan with a Big-O section | CC BY-SA 4.0 | A study-order hint; no visual idea |
| https://github.com/krahets/hello-algo | Chinese/English illustrated book; complexity chapter with recursion cost | NOASSERTION (NC-SA per docs) | Worst/best/average framed on one search; reference only |
| https://github.com/labuladong/fucking-algorithm | Chinese notes; separate pages on complexity basics and analysis | none stated | "Common slow habits" framing (slicing, copying, hidden loops) |
| https://github.com/CyC2018/CS-Notes | Chinese interview notes, algorithm section | none stated | Nothing new on complexity |
| https://github.com/doocs/leetcode | Chinese/English solutions, each states time and space | CC BY-SA 4.0 | Per-problem complexity line (we have 16 patterns) |
| https://github.com/azl397985856/leetcode | Chinese problem write-ups with complexity per solution | NOASSERTION | Same as above |

Official source used to check facts: Python docs, "Time complexity of built-in types" (the old wiki page now redirects there).

## Ideas added to the page (round 2)
- Python built-ins table: list, dict, set and deque actions, average and worst.
- Best, average and worst case on one search, with a check counter.
- Common slow habits: six habits, each with a quick fix.

## Ideas skipped
- Log/straight scale toggle: the chart is log by design; a straight scale flattens six curves. Candidate later.
- JS and Java built-ins: no single official complexity table; engines differ, so we cannot verify.
- Recursion-tree visual and amortized: already on the page.
