## Situation

A maze is a grid of letters:

`A B C E`
`S F C S`
`A D E E`

You want to trace the word **ABCCED** by moving between squares that share a side.

## Goal

Answer True if the word can be traced, and False otherwise.

## Rules

- Each step moves up, down, left or right.
- A square may be used at most once in a word.

## Worked example

**ABCCED** is traced A → B → C along the top, down to C, then E and D: **True**. **ABCB** would need the B square twice: **False**.
