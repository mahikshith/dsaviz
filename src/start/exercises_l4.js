// Practice for Level 4, Clean code and working with others: four or five exercises per lesson, all set in the school shop.
// Same format as exercises.js. Every word is our own.

Object.assign(START_EXERCISES, {
  'clean-names': [
    { id: 'clean-names:1', kind: 'choose', title: 'The best name', ask: 'A variable holds the number of days left in the school term. Which name is best?',
      choices: ['days_left', 'd', 'x2', 'thing'], answer: 0, why: 'days_left says what the number means. One letter or a vague word makes the reader guess.', hints: ['Which name could you read aloud in a sentence?', 'A good name says what the value means.'] },
    { id: 'clean-names:2', kind: 'predict', title: 'Same job, new names', ask: 'What does this print?',
      code: { py: 'def f(a, b):\n    return a * b\n\ndef total_cost(price, count):\n    return price * count\n\nprint(f(3, 4) == total_cost(3, 4))', js: 'function f(a, b) {\n  return a * b;\n}\n\nfunction total_cost(price, count) {\n  return price * count;\n}\n\nconsole.log(f(3, 4) === total_cost(3, 4));' },
      choices: { py: ['True', 'False', '12', 'An error'], js: ['true', 'false', '12', 'An error'] }, answer: 0, why: 'The computer ignores names. Both functions multiply two numbers, so the answers match.', hints: ['Work out f(3, 4) first.', 'Names change how people read the code, not what it does.'] },
    { id: 'clean-names:3', kind: 'fix', title: 'The old name', fn: 'total_cost', params: ['price', 'count'], ask: 'A parameter was renamed, but the body still uses the old name p. Fix the body.',
      starter: { py: 'def total_cost(price, count):\n    return p * count\n', js: 'function total_cost(price, count) {\n  return p * count;\n}\n' }, ref: { py: 'def total_cost(price, count):\n    return price * count\n', js: 'function total_cost(price, count) {\n  return price * count;\n}\n' },
      cases: [[[3, 2], 6], [[5, 0], 0], [[1, 10], 10], [[4, 4], 16]], hints: ['Inside the function the value is called price.', 'Change p to price.'] },
    { id: 'clean-names:4', kind: 'fill', title: 'Read the names', ask: 'Fill the blank so the program prints 12.',
      code: { py: 'def total_cost(price, count):\n    return ___ * count\n\nprint(total_cost(4, 3))', js: 'function total_cost(price, count) {\n  return ___ * count;\n}\n\nconsole.log(total_cost(4, 3));' }, answers: { py: ['price'], js: ['price'] },
      cases: [{ out: '12' }], hints: ['Which parameter holds the cost of one?', 'The two parameters are price and count.'] },
    { id: 'clean-names:5', kind: 'write', title: 'A yes or no name', fn: 'is_empty', params: ['items'], ask: 'Write is_empty(items). It returns True when the list has no items, and False otherwise.',
      starter: { py: 'def is_empty(items):\n    return 0\n', js: 'function is_empty(items) {\n  return 0;\n}\n' },
      ref: { py: 'def is_empty(items):\n    return len(items) == 0\n', js: 'function is_empty(items) {\n  return items.length === 0;\n}\n' },
      cases: [[[[]], true], [[[1]], false], [[[1, 2, 3]], false], [[['a']], false]], hints: ['Count the items with len(items).', 'The comparison itself is the yes or no answer.'] }
  ],
  'no-surprises': [
    { id: 'no-surprises:1', kind: 'choose', title: 'Spot the surprise', ask: 'Which function hides a surprise in its name?',
      choices: ['get_total(cart), which also empties the cart', 'total_of(cart), which only returns a number', 'empty_cart(cart), which empties the cart', 'sorted_copy(items), which returns a new list'], answer: 0,
      why: 'The name get_total promises a number. Emptying the cart is a change nobody expects.', hints: ['Which name promises less than the function does?', 'A change is fine when the name warns you.'] },
    { id: 'no-surprises:2', kind: 'predict', title: 'The shared basket', ask: 'What does this print?',
      code: { py: 'def add_one(items):\n    items.append(1)\n\nbasket = [5]\nadd_one(basket)\nprint(basket)', js: 'function add_one(items) {\n  items.push(1);\n}\n\nlet basket = [5];\nadd_one(basket);\nconsole.log(basket);' },
      choices: { py: ['[5, 1]', '[5]', '[1]', 'An error'], js: ['[5,1]', '[5]', '[1]', 'An error'] }, answer: 0, why: 'The function and the caller share one list. The append inside the function shows in basket.', hints: ['Is the list copied when it is passed in?', 'Both names point at one list.'] },
    { id: 'no-surprises:3', kind: 'fix', title: 'Keep my scores', ask: 'add_bonus should give a new list and leave scores alone. It prints 2 2, but it should print 1 2. Fix it.',
      starter: { py: 'def add_bonus(scores):\n    for i in range(len(scores)):\n        scores[i] = scores[i] + 1\n    return scores\n\nscores = [1, 2]\nnew_scores = add_bonus(scores)\nprint(scores[0], new_scores[0])\n', js: 'function add_bonus(scores) {\n  for (let i = 0; i < scores.length; i++) {\n    scores[i] = scores[i] + 1;\n  }\n  return scores;\n}\n\nlet scores = [1, 2];\nlet new_scores = add_bonus(scores);\nconsole.log(scores[0], new_scores[0]);\n' },
      ref: { py: 'def add_bonus(scores):\n    result = []\n    for s in scores:\n        result.append(s + 1)\n    return result\n\nscores = [1, 2]\nnew_scores = add_bonus(scores)\nprint(scores[0], new_scores[0])\n', js: 'function add_bonus(scores) {\n  let result = [];\n  for (let s of scores) {\n    result.push(s + 1);\n  }\n  return result;\n}\n\nlet scores = [1, 2];\nlet new_scores = add_bonus(scores);\nconsole.log(scores[0], new_scores[0]);\n' },
      cases: [{ out: '1 2' }], hints: ['The loop changes scores itself.', 'Build a new list called result, add to it, and return that.'] },
    { id: 'no-surprises:4', kind: 'write', title: 'A new list, please', fn: 'doubled', params: ['numbers'], ask: 'Write doubled(numbers). It returns a new list with every number times 2. Do not change the list you were given.',
      starter: { py: 'def doubled(numbers):\n    return []\n', js: 'function doubled(numbers) {\n  return [];\n}\n' },
      ref: { py: 'def doubled(numbers):\n    result = []\n    for n in numbers:\n        result.append(n * 2)\n    return result\n', js: 'function doubled(numbers) {\n  let result = [];\n  for (let n of numbers) {\n    result.push(n * 2);\n  }\n  return result;\n}\n' },
      cases: [[[[1, 2, 3]], [2, 4, 6]], [[[]], []], [[[5]], [10]], [[[-1, 0]], [-2, 0]]], hints: ['Start with an empty list called result.', 'Loop over numbers, append each one doubled, then return result.'] }
  ],
  'comprehensions': [
    { id: 'comprehensions:1', kind: 'predict', title: 'Add ten', ask: 'What does this print?',
      code: { py: 'nums = [1, 2, 3]\nprint([n + 10 for n in nums])', js: 'let nums = [1, 2, 3];\nconsole.log(nums.map((n) => n + 10));' },
      choices: { py: ['[11, 12, 13]', '[1, 2, 3]', '[10, 10, 10]', 'An error'], js: ['[11,12,13]', '[1,2,3]', '[10,10,10]', 'An error'] }, answer: 0, why: 'For each n, the new list gets n + 10. The old list is not changed.', hints: ['What is built for each n?', 'n + 10 for 1, then 2, then 3.'] },
    { id: 'comprehensions:2', kind: 'choose', title: 'Keep the even ones', ask: 'Which line builds a list of only the even numbers?',
      choices: [{ py: '[n for n in nums if n % 2 == 0]', js: 'nums.filter((n) => n % 2 === 0)' }, { py: '[n % 2 == 0 for n in nums]', js: 'nums.map((n) => n % 2 === 0)' }, { py: '[n * 2 for n in nums]', js: 'nums.map((n) => n * 2)' }, { py: '[n for n in nums]', js: 'nums.map((n) => n)' }], answer: 0,
      why: 'The if at the end keeps only the items that pass. The second line builds True and False values instead.', hints: ['Which line has a question that removes some items?', 'The question n % 2 == 0 is True for even numbers.'] },
    { id: 'comprehensions:3', kind: 'fill', title: 'Fill the question', ask: 'Fill the blank so evens keeps only even numbers. The program should print 3.',
      code: { py: 'def evens(numbers):\n    return [n for n in numbers if ___]\n\nprint(len(evens([1, 2, 3, 4, 6])))', js: 'function evens(numbers) {\n  return numbers.filter((n) => ___);\n}\n\nconsole.log(evens([1, 2, 3, 4, 6]).length);' },
      answers: { py: ['n % 2 == 0'], js: ['n % 2 === 0'] }, cases: [{ out: '3' }], hints: ['An even number leaves 0 when you take % 2.', { py: 'Write n % 2 == 0', js: 'Write n % 2 === 0' }] },
    { id: 'comprehensions:4', kind: 'write', title: 'Word lengths', fn: 'lengths', params: ['words'], ask: 'Write lengths(words). It returns a list with the length of each word.',
      starter: { py: 'def lengths(words):\n    return []\n', js: 'function lengths(words) {\n  return [];\n}\n' },
      ref: { py: 'def lengths(words):\n    return [len(w) for w in words]\n', js: 'function lengths(words) {\n  return words.map((w) => w.length);\n}\n' },
      cases: [[[['hi', 'cat']], [2, 3]], [[[]], []], [[['a']], [1]], [[['shop', 'to', 'pencil']], [4, 2, 6]]], hints: ['len(w) gives the length of one word.', { py: 'Write [len(w) for w in words]', js: 'Write words.map((w) => w.length)' }] },
    { id: 'comprehensions:5', kind: 'fix', title: 'Only the positives', fn: 'positives', params: ['numbers'], ask: 'positives should keep only numbers above 0, but it keeps everything. Fix it.',
      starter: { py: 'def positives(numbers):\n    return [n for n in numbers]\n', js: 'function positives(numbers) {\n  return numbers.map((n) => n);\n}\n' },
      ref: { py: 'def positives(numbers):\n    return [n for n in numbers if n > 0]\n', js: 'function positives(numbers) {\n  return numbers.filter((n) => n > 0);\n}\n' },
      cases: [[[[1, -2, 3]], [1, 3]], [[[]], []], [[[-1, 0]], []], [[[5]], [5]]], hints: ['The line has no question yet.', { py: 'Add if n > 0 at the end.', js: 'Use filter with n > 0.' }] }
  ],
  'type-hints': [
    { id: 'type-hints:1', kind: 'choose', title: 'Read the arrow', ask: 'A function is written def shout(text: str) -> str:. What does -> str tell the reader?',
      choices: ['The function gives back text', 'The function must be called with text', 'The function prints text', 'The function cannot fail'], answer: 0, why: 'The arrow and type after the brackets say what the function hands back.', hints: ['Look at where the arrow is.', 'The part before the arrow describes what goes in.'] },
    { id: 'type-hints:2', kind: 'predict', title: 'A hint that is wrong', ask: 'What does this print?',
      code: { py: 'def half(n: int) -> int:\n    return n / 2\n\nprint(half(5))', js: 'function half(n /* number */) /* gives a whole number */ {\n  return n / 2;\n}\n\nconsole.log(half(5));' },
      choices: stSame(['2.5', '2', '3', 'An error']), answer: 0, why: 'The hint says int, but Python does not check it. 5 divided by 2 is 2.5.', hints: ['Does Python check the hint?', '5 / 2 gives a decimal.'] },
    { id: 'type-hints:3', kind: 'fix', title: 'Half of it', fn: 'half', params: ['n'], ask: 'half(n: int) -> float should return n divided by 2, with the decimal part. It cuts the decimal off. Fix it.',
      starter: { py: 'def half(n: int) -> float:\n    return n // 2\n', js: 'function half(n /* number */) /* gives a number */ {\n  return Math.floor(n / 2);\n}\n' },
      ref: { py: 'def half(n: int) -> float:\n    return n / 2\n', js: 'function half(n /* number */) /* gives a number */ {\n  return n / 2;\n}\n' },
      cases: [[[5], 2.5], [[4], 2], [[1], 0.5], [[0], 0]], hints: ['// throws the decimal part away.', 'A single / keeps it.'] },
    { id: 'type-hints:4', kind: 'write', title: 'A hinted function', fn: 'full_name', params: ['first', 'last'], ask: 'Write full_name(first: str, last: str) -> str. It returns the first name, a space, then the last name.',
      starter: { py: 'def full_name(first: str, last: str) -> str:\n    return ""\n', js: 'function full_name(first /* string */, last /* string */) /* gives a string */ {\n  return "";\n}\n' },
      ref: { py: 'def full_name(first: str, last: str) -> str:\n    return first + " " + last\n', js: 'function full_name(first /* string */, last /* string */) /* gives a string */ {\n  return first + " " + last;\n}\n' },
      cases: [[['Kai', 'Noor'], 'Kai Noor'], [['A', 'B'], 'A B'], [['Mira', 'Tom'], 'Mira Tom']], hints: ['Join three pieces of text with +.', 'The middle piece is a single space: " ".'] }
  ]
});
