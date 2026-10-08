## Why it works

Keep this [[invariant]]: *every counted character left of `left` matches its mirror partner right of `right`.*

It holds at the start, because nothing has been compared yet. Skipping a space or punctuation mark changes nothing that counts. When two counted characters match, both pointers move inward and the matched part grows by one pair. A mismatch proves the text is not a palindrome. When the pointers meet or cross, every pair has matched.

## Complexity

Each character is passed by a pointer at most once: **O(n) time** and **O(1) [[auxiliary-space|auxiliary space]]**.

## Edge cases

- **Empty or one character:** the loop never runs, so the answer is True.
- **Only punctuation**, such as "!?": the pointers skip until they meet; True.
- **Capitals:** "Aa" is True, because letters are compared in lowercase.
- **Digits count:** "1a1" is True and "12" is False.
