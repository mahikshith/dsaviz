## Situation

A small bookstore keeps one shelf in price order, from the cheapest book on the left to the most expensive on the right. A customer arrives with a gift voucher worth exactly **18** and wants to spend all of it on **two different books**.

The shelf holds five books priced **2, 4, 7, 11 and 15**.

## Goal

Tell the customer the shelf positions of two different books whose prices add up to exactly 18. Positions are counted from 0 ([[zero-based-index|zero-based]]). If no two books work, return no result.

## Rules

- The shelf is in [[nondecreasing]] price order. Equal prices can sit side by side.
- The two books must be different books, so their positions must differ. Two books may still share a price.
- The shelf stays as it is: report positions on the original shelf and never re-sort it.
- Any pair that totals exactly 18 is a correct answer.

## Worked example

With prices 2, 4, 7, 11 and 15 and a voucher of 18, the books at positions 2 and 3 cost 7 and 11, and 7 + 11 = 18. The answer is **[2, 3]**.

With prices 1, 3, 5 and 9 and a voucher of 7, no two different books add up to 7, so the answer is **null**.
