## Situation

A web of four friends forms a ring: person 1 is friends with 2 and 4, person 2 with 1 and 3, and so on. A photocopier must make a completely separate copy of the web.

## Goal

Return a copy of the web: new people with the same numbers and the same friendships, sharing nothing with the original.

## Rules

- Friendships go both ways.
- In the examples, the web is written as a list: entry i lists the friends of person i + 1.
- The answer is written the same way, describing the copy.

## Worked example

The ring 1–2–3–4–1 copies to a new ring with the same friendships: **[[2, 4], [1, 3], [2, 4], [1, 3]]**.
