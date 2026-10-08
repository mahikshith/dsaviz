## Intuition

A scribe climbing a staircase writes, on every step, how many ways there are to reach it. Each new note is just a sum of notes already written, so nothing is ever worked out twice. Dynamic programming is that habit: name a [[subproblem]], find how a bigger answer is built from smaller ones, and fill the answers in order.

## Recognition clues

- "How many ways", "fewest", "most", "longest", "is it possible", over choices that build on each other.
- A [[recursion|recursive]] solution recomputes the same smaller question again and again.
- Greedy choices can be shown to fail on some example.

## Template

```python
best = [base] * (n + 1)
for i in range(1, n + 1):
    best[i] = combine(best[j] for j in earlier_states(i))
return best[n]
```

## Preconditions

You need a recurrence: a rule that builds each answer only from smaller ones, with no cycles between subproblems. Write the base cases first.

## When it fails

If the number of distinct subproblems is huge, such as every subset of a large set, the table is too big. If a simple greedy rule is provably correct, it is usually simpler and uses less memory.
