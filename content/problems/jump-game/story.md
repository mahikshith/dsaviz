## Situation

Stepping stones cross a river. Each stone is marked with the longest leap you can make from it: **2, 3, 1, 1, 4**. You start on the first stone.

## Goal

Answer True if you can reach the last stone, and False otherwise.

## Rules

- From a stone marked k you may leap 1 to k stones forward.
- A stone marked 0 is a dead end.

## Worked example

From the first stone leap 1 to the stone marked 3, then leap 3 to the last stone: **True**. With **3, 2, 1, 0, 4**, every route ends on the 0: **False**.
