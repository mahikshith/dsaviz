## Situation

A staircase has **5** steps. You may climb **one or two** steps with each move. A scribe walking up writes on every step how many different ways there are to reach it.

## Goal

Return the number of different sequences of moves that reach the top step exactly.

## Rules

- Each move is 1 or 2 steps up.
- Different orders count as different ways: 1 + 2 and 2 + 1 are two ways.
- You start on the ground, step 0.

## Worked example

Step 1 can be reached 1 way and step 2 in 2 ways (1 + 1 or 2). Step 3: 2 + 1 = 3 ways. Step 4: 3 + 2 = 5. Step 5: 5 + 3 = **8**.
