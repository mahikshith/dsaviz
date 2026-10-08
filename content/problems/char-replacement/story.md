## Situation

A painter is touching up a wall of square tiles. Their colours, from left to right, are **A, A, B, A, B, B, A**. There is just enough paint left for **one** tile.

## Goal

Find the length of the longest stretch of neighbouring tiles that can be made all the same colour by repainting at most k tiles.

## Rules

- Repainting changes one tile to any colour.
- At most k tiles may be repainted.
- The stretch must be consecutive.

## Worked example

With k = 1, the stretch **AABA** becomes AAAA by repainting its one B: length **4**. No stretch of 5 can be made one colour with a single repaint.
