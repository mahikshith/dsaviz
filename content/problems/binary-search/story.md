## Situation

A librarian is looking for the book with call number **21** on a shelf sorted by call number: **3, 8, 12, 17, 21, 30, 34**. Walking the whole shelf is slow, and the shelf is sorted.

## Goal

Return the shelf position of the book with the target call number, counting from 0, or −1 if it is not there.

## Rules

- The shelf is in increasing order and no call number appears twice.
- Each check of a book tells you whether the target is smaller, larger or equal.

## Worked example

The middle book is 17, smaller than 21, so the target is to its right. The middle of 21, 30, 34 is 30, larger, so the target is to its left. That leaves 21, at position **4**. Looking for 5 instead ends with **−1**.
