// What each easy runnable problem needs, in START_NEEDS_KEYS words. Keyed by the Code page's problem id (TEST_SPECS).
// A lesson's "First problems" (its `first` list) only shows problems whose needs are all taught by then;
// tests/startcheck.js checks that, and that every id here is a real Easy or Starter problem with a spec.
// Every runnable problem asks for a function that returns its answer, so each one needs functions and return.
const START_NEEDS = {
  // after lesson 21: loops, lists, strings and if are enough
  'running-sum-of-1d-array': ['functions', 'return', 'lists', 'scan', 'accumulate'],
  'find-the-highest-altitude': ['functions', 'return', 'lists', 'scan', 'accumulate'],
  'fizz-buzz': ['functions', 'return', 'loops', 'if', 'math', 'lists', 'types'],
  'length-of-last-word': ['functions', 'return', 'strings', 'loops'],
  'number-of-good-pairs': ['functions', 'return', 'lists', 'nested'],
  'missing-number': ['functions', 'return', 'lists', 'scan', 'accumulate', 'math'],
  // after lesson 22: a dictionary does the remembering
  'two-sum': ['functions', 'return', 'lists', 'scan', 'dicts'],
  'contains-duplicate': ['functions', 'return', 'lists', 'scan', 'dicts'],
  'valid-anagram': ['functions', 'return', 'strings', 'dicts'],
  'first-unique-character-in-a-string': ['functions', 'return', 'strings', 'dicts'],
  'ransom-note': ['functions', 'return', 'strings', 'dicts'],
  'majority-element': ['functions', 'return', 'lists', 'dicts'],
  // after lesson 26, How to read a problem
  'best-time-stock': ['functions', 'return', 'lists', 'scan', 'if'],
  'valid-palindrome': ['functions', 'return', 'strings', 'while', 'if'],
  'merge-strings-alternately': ['functions', 'return', 'strings', 'while'],
  'is-subsequence': ['functions', 'return', 'strings', 'while', 'if'],
  'add-digits': ['functions', 'return', 'while', 'math'],
  'single-number': ['functions', 'return', 'lists', 'dicts']
};
