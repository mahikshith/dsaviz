## Situation

Weather watchers record the daily temperature: **73, 74, 75, 71, 69, 72, 76, 73**. For every day, they want to know how long until a warmer day.

## Goal

Return, for each day, the number of days until a strictly warmer one, or 0 if none comes.

## Rules

- Only later days count.
- Equal temperatures are not warmer.

## Worked example

Day 0 (73) waits **1** day for 74. Day 2 (75) waits **4** days for 76. The last two days never see warmer: **0**.
