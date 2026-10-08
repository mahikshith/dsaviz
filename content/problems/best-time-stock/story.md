## Situation

A market stall owner keeps a diary of the morning price of mangoes: **7, 1, 5, 3, 6 and 4** over six days. Looking back, they wonder how much they could have earned by buying a crate once and selling it on a later morning.

## Goal

Return the largest possible profit from one buy followed by one later sell. If no sale makes money, the answer is 0.

## Rules

- Buy once, then sell once, on a strictly later day.
- You may choose not to trade at all, which earns 0.
- Prices are whole numbers.

## Worked example

Buying at 1 on day 1 and selling at 6 on day 4 earns **5**, the best possible. If prices only fall, such as 7, 6, 4, 3, 1, the answer is **0**.
