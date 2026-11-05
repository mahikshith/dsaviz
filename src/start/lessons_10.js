// Level 4, lessons 1 to 4: names that explain themselves, a function that does what its name says, one-line lists and
// type hints. One world all the way through Level 4: the school shop. Every word is our own.
// (Helpers here are function declarations on purpose: the lesson files are joined in file-name order.)

function l4Chip(id, x, y, text, o) { return { tokens: [Object.assign({ id, x, y, text }, o || {})] }; }
function l4Say(id, x, y, text, o) { return { labels: [Object.assign({ id, x, y, text, size: 16, c: 't2' }, o || {})] }; }
function l4Jar(id, x, y, value, tag, o) { return { boxes: [Object.assign({ id, x, y, w: 150, h: 76, text: value, tag }, o || {})] }; }
function l4Arrow(id, from, to, o) { return { arrows: [Object.assign({ id, from, to, c: 'a' }, o || {})] }; }

// ---------- L4.1 Names that explain themselves ----------
const ST401_CODE = {
  py: ['def total_cost(price, count):', '    return price * count', 'total = total_cost(3, 2)', 'print(total)'],
  js: ['function total_cost(price, count) {', '  return price * count; }', 'let total = total_cost(3, 2);', 'console.log(total);']
};
function st401Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const bad = st1Card('bad', 120, 130, 400, ['def f(a, b):', '    return a * b', 't = f(3, 2)', 'print(t)'], []);
  const good = (cur) => st1Card('good', 120, 130, 400, ST401_CODE.py, cur);
  return [
    stBeat('dot', 'I wrote this last week and I cannot read it now. What is f? What are a and b?', stScene(cast, bad), ['bad', 'cast:dot']),
    stBeat('hoot', 'The computer does not care what a name means. It only needs the name to match everywhere. People read the meaning.', stScene(cast, l4Jar('j1', 90, 150, '3', 'a'), l4Jar('j2', 400, 150, '3', 'price'), l4Say('s1', 165, 262, 'A what?'), l4Say('s2', 475, 262, 'A price. Clear.')), ['j1', 'j2']),
    stBeat('hoot', 'Rule one: a name says what the value is. Write price and count, not a and b.', stScene(cast, good([0, 1])), ['good'], [0, 1]),
    stBeat('hoot', 'Rule two: a function name says what the function does. total_cost tells you far more than f.', stScene(cast, l4Chip('f', 160, 170, 'f'), l4Chip('tc', 440, 170, 'total_cost', { solid: true }), l4Say('s1', 160, 222, 'What does it do?'), l4Say('s2', 440, 222, 'It adds up a cost.')), ['f', 'tc'], 0),
    stBeat('dot', 'Can a name have two words? I want to write total cost.', stScene(cast, l4Chip('sp', 320, 190, 'total cost', { c: 'bad', dash: true }), l4Say('s1', 320, 240, 'A space breaks a name in two.')), ['sp', 'cast:dot']),
    stBeat('hoot', 'Join the words with an underscore: total_cost. Lower case with underscores is called snake_case.', stScene(cast, l4Chip('sn', 320, 190, 'total_cost', { solid: true }), l4Say('s1', 320, 240, 'Python writers use snake_case.')), ['sn'], [0, 2]),
    stBeat('hoot', 'A name for a yes or no value reads like a question: is_empty, has_tax. Then if is_empty: reads like English.', stScene(cast, l4Chip('q1', 200, 190, 'is_empty', { solid: true }), l4Chip('q2', 440, 190, 'has_tax', { solid: true }), l4Say('s1', 320, 250, 'The answer is True or False.')), ['q1', 'q2']),
    stBeat('hoot', 'Never let a name lie. A list called count that holds names will trick the next reader. That reader may be you.', stScene(cast, l4Jar('lie', 230, 150, '["Kai", "Noor"]', 'count', { c: 'bad', size: 17, w: 190 }), l4Say('s1', 325, 262, 'Count of what? These are names.')), ['lie']),
    stBeat('dot', 'Is a short name ever fine?', stScene(cast, l4Chip('i', 320, 200, 'i')), ['i', 'cast:dot']),
    stBeat('hoot', 'In a tiny loop, i is fine. Everywhere else, take a few seconds to choose a clear name. It saves minutes later.', stScene(cast, good([])), ['good']),
    stBeat('bolt', 'I run both versions in the same way. I only see steps. Names are for the people who read the code.', stScene(cast, bad), ['bad', 'cast:bolt'])
  ];
}
START_LESSON('clean-names', {
  code: ST401_CODE, story: st401Story(),
  watch: { code: 'def total_cost(price, count):\n    return price * count\n\ndef with_tax(amount):\n    return amount + amount // 10\n\napple_price = 3\napple_count = 4\nsubtotal = total_cost(apple_price, apple_count)\nprint("subtotal", subtotal)\nprint("to pay", with_tax(subtotal))\n' },
  tryit: { py: 'def total_cost(price, count):\n    return price * count\n\ndef with_tax(amount):\n    return amount + amount // 10\n\napple_price = 3\napple_count = 4\nsubtotal = total_cost(apple_price, apple_count)\nprint("subtotal", subtotal)\nprint("to pay", with_tax(subtotal))\nshelf_size = 20\nfree_space = shelf_size - apple_count\nprint("free space", free_space)\n',
    js: 'function total_cost(price, count) {\n  return price * count;\n}\n\nfunction with_tax(amount) {\n  return amount + Math.floor(amount / 10);\n}\n\nlet apple_price = 3;\nlet apple_count = 4;\nlet subtotal = total_cost(apple_price, apple_count);\nconsole.log("subtotal", subtotal);\nconsole.log("to pay", with_tax(subtotal));\nlet shelf_size = 20;\nlet free_space = shelf_size - apple_count;\nconsole.log("free space", free_space);\n',
    goals: ['Press Run.', 'Rename apple_price to cost_each in every place. It must still run.', 'Change a name in only one place. Read the error and fix it.'] },
  check: { q: 'Which function name tells the reader the most?', choices: [['total_cost', true, 'Right. It says what the function works out.'], ['f', false, 'A single letter says nothing about the job.'], ['do_it', false, 'Do what? A name should say what the function does.'], ['thing2', false, 'This name says nothing, and the 2 only adds a mystery.']] }
});

// ---------- L4.2 A function does what its name says ----------
const ST402_CODE = {
  py: ['def doubled(numbers):', '    result = []', '    for n in numbers:', '        result.append(n * 2)', '    return result', 'def double_them(numbers):', '    for i in range(len(numbers)):', '        numbers[i] = numbers[i] * 2', 'scores = [1, 2, 3]', 'print(doubled(scores))', 'print(scores)', 'double_them(scores)', 'print(scores)'],
  js: ['function doubled(numbers) {', '  let result = [];', '  for (let n of numbers) {', '    result.push(n * 2); }', '  return result; }', 'function double_them(numbers) {', '  for (let i = 0; i < numbers.length; i++) {', '    numbers[i] = numbers[i] * 2; } }', 'let scores = [1, 2, 3];', 'console.log(doubled(scores));', 'console.log(scores);', 'double_them(scores);', 'console.log(scores);']
};
function st402Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const one = (names, objs) => stRefs(names, objs, 60, 130);
  return [
    stBeat('dot', 'I asked a function for a total. Afterwards my cart was empty! What happened?', stScene(cast, one([['cart', 'o1']], [{ id: 'o1', text: '[ ]', sub: 'it held [4, 6]' }])), ['name:cart', 'obj:o1', 'cast:dot']),
    stBeat('hoot', 'The function changed your list as well as giving an answer. A change made outside the function, without warning, is a side effect.', stScene(cast, one([['cart', 'o1']], [{ id: 'o1', text: '[ ]', sub: 'changed behind your back' }])), ['obj:o1']),
    stBeat('hoot', 'Remember: passing a list does not copy it. The caller and the function share one list.', stScene(cast, one([['scores', 'o1'], ['numbers', 'o1']], [{ id: 'o1', text: '[1, 2, 3]' }])), ['name:scores', 'name:numbers', 'obj:o1'], [8, 11]),
    stBeat('hoot', 'doubled builds a new list and hands it back. Your scores stay [1, 2, 3].', stScene(cast, one([['scores', 'o1'], ['result', 'o2']], [{ id: 'o1', text: '[1, 2, 3]' }, { id: 'o2', text: '[2, 4, 6]', sub: 'a new list' }])), ['name:result', 'obj:o2'], [0, 1, 2, 3, 4]),
    stBeat('hoot', 'double_them changes the list you gave it. Its name warns you that it changes the numbers.', stScene(cast, one([['scores', 'o1'], ['numbers', 'o1']], [{ id: 'o1', text: '[2, 4, 6]', sub: 'changed in place' }])), ['obj:o1'], [5, 6, 7]),
    stBeat('dot', 'So is changing a list always wrong?', stScene(cast, l4Chip('q', 320, 200, 'change a list?')), ['q', 'cast:dot']),
    stBeat('hoot', 'No. A change is fine when the name warns you. The surprise is a quiet change inside a function called total or get_price.', stScene(cast, l4Chip('ok', 200, 190, 'double_them', { solid: true }), l4Chip('no', 440, 190, 'get_total', { c: 'bad', dash: true }), l4Say('s1', 200, 242, 'warns you'), l4Say('s2', 440, 242, 'hides a change')), ['ok', 'no']),
    stBeat('hoot', 'Second habit: one job per function. If its description needs the word and, split it in two.', stScene(cast, l4Chip('j1', 190, 190, 'read_prices'), l4Chip('j2', 450, 190, 'add_up'), l4Say('s1', 320, 250, 'two functions, one job each')), ['j1', 'j2']),
    stBeat('hoot', 'Third habit: do not repeat yourself. If you copy the same lines twice, make a function and call it twice.', stScene(cast, st1Card('rep', 90, 140, 460, ['price1 = 10 + 10 // 10', 'price2 = 20 + 20 // 10', '# same sum copied', 'price = add_tax(10)'], [])), ['rep']),
    stBeat('dot', 'Before I write a function I will ask two things. What is its one job? Does its name say so?', stScene(cast, l4Chip('a', 320, 200, 'one job, honest name', { solid: true })), ['a', 'cast:dot'])
  ];
}
START_LESSON('no-surprises', {
  code: ST402_CODE, story: st402Story(),
  watch: { code: 'def doubled(numbers):\n    result = []\n    for n in numbers:\n        result.append(n * 2)\n    return result\n\ndef double_them(numbers):\n    for i in range(len(numbers)):\n        numbers[i] = numbers[i] * 2\n\nscores = [1, 2, 3]\nprint(doubled(scores))\nprint(scores)\ndouble_them(scores)\nprint(scores)\n' },
  tryit: { py: 'def doubled(numbers):\n    result = []\n    for n in numbers:\n        result.append(n * 2)\n    return result\n\ndef double_them(numbers):\n    for i in range(len(numbers)):\n        numbers[i] = numbers[i] * 2\n\nscores = [1, 2, 3]\nprint(doubled(scores))\nprint(scores)\ndouble_them(scores)\nprint(scores)\n',
    js: 'function doubled(numbers) {\n  let result = [];\n  for (let n of numbers) {\n    result.push(n * 2);\n  }\n  return result;\n}\n\nfunction double_them(numbers) {\n  for (let i = 0; i < numbers.length; i++) {\n    numbers[i] = numbers[i] * 2;\n  }\n}\n\nlet scores = [1, 2, 3];\nconsole.log(doubled(scores));\nconsole.log(scores);\ndouble_them(scores);\nconsole.log(scores);\n', differs: true,
    goals: ['Press Run and compare the three lines.', 'Call double_them(scores) twice. What does scores hold now?', 'Write halved(numbers) that returns a new list and leaves scores alone.'] },
  check: { q: 'A function named total_of(cart) adds up the prices but also empties the cart. What is wrong?', choices: [['Its name hides a change it makes', true, 'Right. The name promises a total. The empty cart is a surprise.'], ['Nothing, because lists can always change', false, 'A change is fine only when the name warns you.'], ['It should use a longer name', false, 'The length is fine. The name does not tell the whole truth.'], ['It should print the total', false, 'Printing is not the problem. The hidden change is.']] }
});

// ---------- L4.3 Building a list in one line ----------
const ST403_CODE = {
  py: ['def squares_of(numbers):', '    return [n * n for n in numbers]', 'def big_ones(numbers):', '    return [n for n in numbers if n > 2]', 'nums = [1, 2, 3, 4]', 'print(squares_of(nums))', 'print(big_ones(nums))'],
  js: ['function squares_of(numbers) {', '  return numbers.map((n) => n * n); }', 'function big_ones(numbers) {', '  return numbers.filter((n) => n > 2); }', 'let nums = [1, 2, 3, 4];', 'console.log(squares_of(nums));', 'console.log(big_ones(nums));']
};
function st403Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const row = (id, y, vals, o) => ({ tokens: vals.map((v, i) => Object.assign({ id: id + i, x: 190 + i * 80, y, text: String(v), w: 56 }, o || {})) });
  const loop = st1Card('loop', 50, 130, 360, ['result = []', 'for n in numbers:', '    result.append(n * n)'], []);
  return [
    stBeat('dot', 'To square every number, I write a loop, an empty list and an append. That is three lines for one idea.', stScene(cast, loop), ['loop', 'cast:dot']),
    stBeat('hoot', 'A list comprehension builds a whole new list in one line. Read it out loud: n times n, for each n in numbers.', stScene(cast, st1Card('one', 60, 150, 520, ['squares = [n * n for n in numbers]'], [0])), ['one'], 1),
    stBeat('hoot', 'Picture a stamping machine. Each number goes in, the stamp n * n changes it, and a new list comes out.', stScene(cast, row('in', 150, [1, 2, 3, 4]), row('out', 280, [1, 4, 9, 16], { solid: true }), l4Say('s1', 320, 215, 'stamp: n * n')), ['in0', 'out0', 'out3'], 1),
    stBeat('hoot', 'The old list is not touched. A comprehension always makes a new list.', stScene(cast, row('in', 150, [1, 2, 3, 4]), row('out', 280, [1, 4, 9, 16], { solid: true }), l4Say('s1', 320, 215, 'nums is still [1, 2, 3, 4]')), ['in0', 'in3'], [4, 5]),
    stBeat('dot', 'Can I skip some numbers? I only want the big ones.', stScene(cast, row('in', 170, [1, 2, 3, 4])), ['in0', 'cast:dot']),
    stBeat('hoot', 'Add if and a yes-or-no test at the end. Only items that pass go through. [n for n in numbers if n > 2] keeps 3 and 4.', stScene(cast, row('in', 150, [1, 2, 3, 4]), row('out', 280, [3, 4], { solid: true }), l4Say('s1', 320, 215, 'if n > 2: only big ones')), ['out0', 'out1'], [2, 3, 6]),
    stBeat('hoot', 'The shape never changes. First what to put in, then for and the list, then an optional if and a test.', stScene(cast, st1Card('shape', 40, 150, 560, ['[ what to put in   for item in list   if test ]'], [])), ['shape']),
    stBeat('dot', 'Then I should write everything as a comprehension!', stScene(cast, l4Chip('all', 320, 200, 'always shorter?')), ['all', 'cast:dot']),
    stBeat('hoot', 'No. Shorter is not always clearer. If the line is hard to read out loud, write a plain loop instead.', stScene(cast, st1Card('long', 20, 150, 600, ['[f(x) for row in rows for x in row if x and g(x)]'], []), l4Say('s1', 320, 240, 'too much in one line', { c: 'bad' })), ['long'])
  ];
}
START_LESSON('comprehensions', {
  code: ST403_CODE, story: st403Story(),
  watch: { code: 'def squares_of(numbers):\n    result = []\n    for n in numbers:\n        result.append(n * n)\n    return result\n\ndef squares_in_one_line(numbers):\n    return [n * n for n in numbers]\n\ndef big_ones(numbers):\n    return [n for n in numbers if n > 2]\n\nnums = [1, 2, 3, 4]\nprint(squares_of(nums))\nprint(squares_in_one_line(nums))\nprint(big_ones(nums))\n' },
  tryit: { py: 'def squares_of(numbers):\n    return [n * n for n in numbers]\n\ndef big_ones(numbers):\n    return [n for n in numbers if n > 2]\n\nnums = [1, 2, 3, 4]\nprint(squares_of(nums))\nprint(big_ones(nums))\n',
    js: 'function squares_of(numbers) {\n  return numbers.map((n) => n * n);\n}\n\nfunction big_ones(numbers) {\n  return numbers.filter((n) => n > 2);\n}\n\nlet nums = [1, 2, 3, 4];\nconsole.log(squares_of(nums));\nconsole.log(big_ones(nums));\n', differs: true,
    goals: ['Press Run.', 'Change big_ones so it keeps the numbers 3 or smaller.', 'Write evens_of(numbers) that keeps only the even numbers.'] },
  check: { q: 'What does [n for n in numbers if n > 2] give for numbers = [1, 2, 3, 4]?', choices: [['[3, 4]', true, 'Right. Only 3 and 4 pass the question n > 2.'], ['[1, 2]', false, 'Those fail the question. The if keeps what passes.'], ['[1, 2, 3, 4]', false, 'The if removes the numbers that fail n > 2.'], ['[True, True]', false, 'A comprehension with if keeps the items, not yes or no answers.']] }
});

// ---------- L4.4 Labels for what goes in and out ----------
const ST404_CODE = {
  py: ['def total_cost(price: int, count: int) -> int:', '    return price * count', 'print(total_cost(3, 4))', 'print(total_cost("ab", 2))'],
  js: ['function total_cost(price /* number */, count /* number */) /* gives a number */ {', '  return price * count; }', 'console.log(total_cost(3, 4));', 'console.log(total_cost("ab", 2));']
};
function st404Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const sig = (cur) => st1Card('sig', 20, 140, 600, [ST404_CODE.py[0].replace('def ', 'def ')], cur);
  return [
    stBeat('dot', 'I see total_cost(price, count). Should price be a number or text? I cannot tell.', stScene(cast, st1Card('plain', 100, 140, 440, ['def total_cost(price, count):'], [])), ['plain', 'cast:dot']),
    stBeat('hoot', 'A type hint answers that. It is a label on a box: this box holds an int, which is a whole number.', stScene(cast, l4Jar('j1', 245, 150, '3', 'price: int')), ['j1']),
    stBeat('hoot', 'After a name, write a colon and the type: price: int. Now readers know what to pass in.', stScene(cast, st1Card('sig', 20, 150, 600, ['def total_cost(price: int, count: int) -> int:'], [0])), ['sig'], 0),
    stBeat('hoot', 'The arrow -> and a type, after the brackets, says what the function hands back.', stScene(cast, st1Card('sig', 20, 150, 600, ['def total_cost(price: int, count: int) -> int:'], [0]), l4Arrow('ar', [560, 210], [560, 188]), l4Say('s1', 560, 236, 'gives back an int')), ['sig', 'ar'], 0),
    stBeat('hoot', 'Other common types: float for decimals, str for text, and bool for True or False.', stScene(cast, l4Chip('t1', 120, 200, 'int'), l4Chip('t2', 240, 200, 'float'), l4Chip('t3', 360, 200, 'str'), l4Chip('t4', 480, 200, 'bool')), ['t1', 't2', 't3', 't4']),
    stBeat('dot', 'So what happens if I pass text where it says int?', stScene(cast, l4Chip('x', 320, 200, 'total_cost("ab", 2)')), ['x', 'cast:dot']),
    stBeat('hoot', 'Python does not check. It runs anyway. "ab" times 2 repeats the text and gives abab.', stScene(cast, l4Chip('x', 200, 190, 'total_cost("ab", 2)'), l4Arrow('ar', [320, 190], [410, 190]), l4Chip('r', 500, 190, 'abab', { c: 'bad' })), ['x', 'r'], 3),
    stBeat('hoot', 'So a hint is a note for people. Editors and checking tools can read it and warn you before you run.', stScene(cast, l4Chip('n', 320, 190, 'a note, not a lock', { solid: true })), ['n']),
    stBeat('dot', 'Then I will add hints to the functions other people will read.', stScene(cast, l4Chip('n', 320, 190, 'hints help readers', { solid: true })), ['n', 'cast:dot'])
  ];
}
START_LESSON('type-hints', {
  code: ST404_CODE, story: st404Story(),
  watch: { code: 'def total_cost(price: int, count: int) -> int:\n    return price * count\n\ndef greeting(name: str) -> str:\n    return "Hi " + name\n\nprint(total_cost(3, 4))\nprint(greeting("Kai"))\nprint(total_cost("ab", 2))\n' },
  tryit: { py: 'def total_cost(price: int, count: int) -> int:\n    return price * count\n\nprint(total_cost(3, 4))\nprint(total_cost("ab", 2))\n',
    js: 'function total_cost(price /* number */, count /* number */) /* gives a number */ {\n  return price * count;\n}\n\nconsole.log(total_cost(3, 4));\nconsole.log(total_cost(2, 5));\n', differs: true,
    goals: ['Press Run and read the second answer.', 'Add a hint to a function of your own: name: str and -> str.', 'Pass a decimal like 2.5 as price. Does Python complain?'] },
  check: { q: 'A function says count: int. You pass the text "ab". What does Python do?', choices: [['Runs it anyway and uses the text', true, 'Right. The hint is a note for people. Python does not enforce it.'], ['Stops with a type error before running', false, 'Python does not check hints. Only separate tools can.'], ['Turns the text into a number', false, 'Python never changes a value because of a hint.'], ['Ignores the function call', false, 'It runs the call. The hint changes nothing.']] }
});
