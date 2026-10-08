## Situation

A tortoise and a hare race along a track of carriages **3, 2, 0, −4**. The hare runs two carriages for every one the tortoise walks. The track might loop back on itself.

## Goal

Answer True if the track contains a loop, and False if it ends.

## Rules

- In the examples, `pos` is the position the last carriage links back to, or −1 for none. It only describes the input; your code receives just the head.
- Compare carriages by identity: equal numbers may be different carriages.

## Worked example

With **3, 2, 0, −4** and the last carriage linking back to position 1, the hare eventually lands on the tortoise: **True**.
