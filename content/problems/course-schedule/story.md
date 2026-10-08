## Situation

A college lists **2** courses. To take course 1 you must first take course 0. A student wants to know whether they can finish everything.

## Goal

Answer True if there is an order that takes every course after its prerequisites, and False otherwise.

## Rules

- A pair [a, b] means course b must be taken before course a.
- Courses are numbered 0 to n − 1.

## Worked example

With [1, 0], take course 0 then course 1: **True**. If course 0 also requires course 1, neither can be taken first: **False**.
