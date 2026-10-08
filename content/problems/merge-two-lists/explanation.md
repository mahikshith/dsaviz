## Why it works

Keep this [[invariant]]: *the merged part is sorted and contains exactly the carriages removed from the two fronts.*

Since both trains are sorted, the smallest carriage not yet merged is one of the two front carriages. Linking it next keeps the merged part sorted. When one train is empty, the rest of the other is sorted and every carriage in it is at least as large as the merged part, so it can be attached whole.

## Edge cases

- **One empty train:** return the other.
- **Equal carriages:** either can go first; the result is still sorted.
- **Very different lengths:** the long tail is attached in one step.
