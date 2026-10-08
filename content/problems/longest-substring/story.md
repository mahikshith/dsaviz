## Situation

The night train is boarding. Eight passengers climb in one after another, each wearing a letter badge: **a, b, c, a, b, c, b, b**. Through the window, the guard looks for the longest run of neighbouring passengers in which no badge appears twice.

## Goal

Return the length of the longest run of consecutive passengers with no repeated badge.

## Rules

- The run must be consecutive: neighbours in boarding order.
- Within the run, every badge is different.
- Badges are lowercase letters.

## Worked example

In **abcabcbb** the runs abc, bca and cab are all 3 long; any longer run repeats a badge. The answer is **3**. In **abba**, ab and ba are both 2 long: **2**.
