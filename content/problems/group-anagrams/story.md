## Situation

A letter-sorting office receives words: **eat, tea, tan, ate, nat, bat**. Each must go into a pigeonhole with every other word made of exactly the same letters.

## Goal

Return the groups of words, one group per pigeonhole.

## Rules

- Two words share a pigeonhole if they use the same letters the same number of times.
- Groups and the words inside them may be in any order.
- Words use lowercase letters a to z.

## Worked example

**eat, tea, ate** share one pigeonhole, **tan, nat** another, and **bat** is alone.
