## Situation

You cycle from **home**, at corner A, to the **library**, at corner H. Every street in the neighbourhood is one block long, and you can ride any street in either direction. Some corners connect in several ways, and some routes loop back on themselves.

## Goal

Find the fewest streets you need to ride from home to the library, and one route that uses exactly that many.

## Rules

- Corners are labelled with letters. A street joins two different corners.
- Every street counts as one block: the length of a route is its number of streets.
- Streets work in both directions.
- If the library cannot be reached at all, say so.
- When several routes are equally short, any one of them is a correct answer.

## Worked example

Two streets leave home, to B and to C. From those you reach D and E, then F and G, and then the library at H. The fewest streets is **4**, for example A → B → D → F → H. The route A → C → E → G → H is also 4 streets long and just as correct.
