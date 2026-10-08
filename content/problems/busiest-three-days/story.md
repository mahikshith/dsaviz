## Situation

A neighbourhood library counts its visitors at closing time every day. The manager wants to know which **three consecutive days** last week were the busiest, to plan extra help for the same stretch next week.

Last week's counts, from day 0 to day 6, were **4, 2, 7, 1, 8, 3 and 5**.

## Goal

Report the first day of the busiest three-day stretch and how many visitors it had in total.

## Rules

- A stretch is consecutive: days 2, 3 and 4 form a stretch; days 2, 4 and 5 do not. It is a [[subarray]], not a [[subsequence]].
- Every stretch has exactly k = 3 days.
- Days are numbered from 0.
- If two stretches tie, report the earlier one.
- Visitor counts are whole numbers and never negative.

## Worked example

The stretches and their totals are: days 0–2: 13, days 1–3: 10, days 2–4: 16, days 3–5: 12, days 4–6: 16. Two stretches reach 16, so the earlier one wins: it starts on **day 2** with **16** visitors.
