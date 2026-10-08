## Why it works

Two words are anagrams exactly when they contain each letter the same number of times. The 26 letter counts are therefore a label that all anagrams share and no other word shares.

Collecting words in a [[hash-map|map]] from label to list puts every word in exactly one group with all of its anagrams.

## Complexity

Building each label takes one pass over the word: **O(n · k) time** for n words of length up to k. The map stores every word: **O(n · k) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Empty words** share the label of all zeros.
- **Duplicates**, such as two copies of eat, both go in the group.
- **One word:** one group.
