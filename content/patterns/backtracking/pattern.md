## Intuition

Packing a picnic basket, you ask one question per snack: in the basket or not? Each answer opens a branch. When a branch is finished, you take the last snack back out and try the other answer. Backtracking explores every candidate this way, building and unbuilding one choice at a time, using [[recursion]].

## Recognition clues

- "All subsets", "all permutations", "all combinations that…", "does any path spell…".
- The answer is a list of candidates, often exponentially many.
- A partial candidate can sometimes be rejected early.

## Template

```python
def explore(choice_so_far, start):
    if is_complete(choice_so_far):
        answers.append(list(choice_so_far))
        return
    for option in options_from(start):
        choice_so_far.append(option)      # choose
        explore(choice_so_far, next_start(option))
        choice_so_far.pop()               # undo
```

## Preconditions

Every choice must be undone exactly once after exploring it. Copy the candidate when recording it, or later changes will alter the saved answer.

## When it fails

Backtracking is exponential by nature. If the question asks only for a count or a best value, and smaller versions repeat, dynamic programming is usually far faster.
