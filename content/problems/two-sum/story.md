## Situation

The coat-check counter at a party hands each arriving guest a numbered ticket. Tonight five guests arrive one by one, wearing the numbers **4, 9, 2, 7 and 5**. The host wants two guests whose numbers add up to exactly **12** for a party game.

## Goal

Return the arrival positions of two different guests whose numbers add up to the target, earlier guest first. Positions are counted from 0. If no two guests work, return no answer.

## Rules

- Guests arrive in no particular order of number.
- The two guests must be different people, though they may wear the same number.
- Any pair that adds up to the target is a correct answer.

## Worked example

With 4, 9, 2, 7, 5 and a target of 12, the guests at positions 3 and 4 wear 7 and 5. The answer is **[3, 4]**. With 3, 3 and a target of 6, the answer is **[0, 1]**.
