// Level 1, the bridge (lessons 25 and 26) and Counting steps (lesson 27, after the first problems). Every word is our own.

// ---------- L25. Plan it before you code it ----------
const ST25_CODE = {
  py: ['def average(nums):', '    total = 0', '    for n in nums:', '        total = total + n', '    return total / len(nums)'],
  js: ['function average(nums) {', '  let total = 0;', '  for (const n of nums) {', '    total = total + n; }', '  return total / nums.length; }']
};
function st25Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const plan = (lit, done) => ({ tokens: ['1. Start a total at 0', '2. Add every number to it', '3. Divide by how many there are'].map((t, i) => ({ id: 's' + i, x: 200, y: 150 + i * 60, text: t, w: 320, mono: false, solid: lit === i, dash: done !== undefined && i > done })) });
  const code = (i) => ({ cards: [{ id: 'cl', x: 380, y: 130 + i * 60, w: 240, lines: [[ST25_CODE.py[1], 'for n in nums: ...', 'total / len(nums)'][i].trim()], cur: [0] }] });
  return [
    stBeat('penny', 'I need the average of my acorn counts. I opened the editor, and my mind went blank.', stScene(cast, { tokens: [{ id: 'blank', x: 320, y: 210, text: '?', w: 80 }] }), ['blank', 'cast:penny']),
    stBeat('hoot', 'Close the editor for a moment. First write the steps in plain words, like a recipe.', stScene(cast, plan(null)), ['s0', 's1', 's2']),
    stBeat('dot', 'Step one: start a total at 0. I know how to write that!', stScene(cast, plan(0, 0), code(0)), ['s0', 'cl'], 1),
    stBeat('hoot', 'Step two: add every number. That is a loop with an accumulator, from chapter 3.', stScene(cast, plan(1, 1), code(1)), ['s1', 'cl'], [2, 3]),
    stBeat('penny', 'Step three: divide by how many there are. len(nums) counts them.', stScene(cast, plan(2, 2), code(2)), ['s2', 'cl'], 4),
    stBeat('hoot', 'Each plain step became one or two lines. The plan did the hard thinking.', stScene(cast, st1Card('card', 60, 130, 520, ST25_CODE.py, [0, 1, 2, 3, 4])), ['card'], [0, 1, 2, 3, 4]),
    stBeat('dot', 'And the plan shows the odd case too: an empty list would divide by zero!', stScene(cast, plan(2), { tokens: [{ id: 'zero', x: 320, y: 330, text: 'len([]) is 0', c: 'bad' }] }), ['zero', 'cast:dot'])
  ];
}
START_LESSON('plan-it', {
  code: ST25_CODE, story: st25Story(),
  watch: { code: 'def average(nums):\n    total = 0\n    for n in nums:\n        total = total + n\n    return total / len(nums)\n\nprint(average([4, 8, 6]))\n' },
  tryit: { py: '# Plan: 1) start a total at 0  2) add every number  3) divide by how many\ndef average(nums):\n    total = 0\n    for n in nums:\n        total = total + n\n    return total / len(nums)\n\nprint(average([4, 8, 6]))\n',
    js: '// Plan: 1) start a total at 0  2) add every number  3) divide by how many\nfunction average(nums) {\n  let total = 0;\n  for (const n of nums) {\n    total = total + n;\n  }\n  return total / nums.length;\n}\n\nconsole.log(average([4, 8, 6]));\n', differs: true,
    goals: ['Press Run.', 'Write a plan in comments for "the biggest number", then code it below.', 'Make average return 0 for an empty list.'] },
  check: { q: 'You are stuck in front of an empty editor. What is the best first move?',
    choices: [['Type something and hope it works', false, 'Guessing at code is slow. A plan tells you what to type.'], ['Write the steps in plain words, then turn each step into code', true, 'Right. Each step usually becomes one or two lines.'], ['Copy a different program', false, 'It will not fit your problem. Plan your own steps.'], ['Give up', false, 'Write the plan first. The code gets much easier.']] }
});

// ---------- L26. How to read a problem ----------
const ST26_CODE = {
  py: ['# In:  a list of whole numbers', '# Out: how many are below zero', '# Example: [3, -1, -7, 2] gives 2', 'def count_negatives(nums):', '    count = 0', '    for n in nums:', '        if n < 0:', '            count = count + 1', '    return count'],
  js: ['// In:  a list of whole numbers', '// Out: how many are below zero', '// Example: [3, -1, -7, 2] gives 2', 'function countNegatives(nums) {', '  let count = 0;', '  for (const n of nums) {', '    if (n < 0) {', '      count = count + 1; } }', '  return count; }']
};
function st26Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const card = (lit) => ({ boxes: [['in', 'In', 'a list of numbers'], ['out', 'Out', 'how many are < 0'], ['ex', 'Example', '[3, -1, -7, 2] → 2'], ['edge', 'Watch out', 'empty list → 0']].map(([id, tag, t], i) => ({ id, tag, x: 80 + (i % 2) * 250, y: 140 + Math.floor(i / 2) * 104, w: 230, h: 64, text: t, size: 16, mono: true, solid: (lit || []).includes(id) })) });
  return [
    stBeat('hoot', 'Here is your first real problem: count how many numbers in a list are below zero.', stScene(cast, card([])), ['cast:hoot']),
    stBeat('dot', 'Where do I even start?', stScene(cast, card([])), ['cast:dot']),
    stBeat('hoot', 'Fill in a job card. In: what do you get? A list of whole numbers.', stScene(cast, card(['in'])), ['in']),
    stBeat('hoot', 'Out: what must you give back? One number: how many are below zero. Return it, do not print it.', stScene(cast, card(['in', 'out'])), ['out']),
    stBeat('dot', 'Example: [3, -1, -7, 2] has two numbers below zero, so the answer is 2.', stScene(cast, card(['ex'])), ['ex']),
    stBeat('hoot', 'Watch out for odd cases: an empty list gives 0. Zero itself is not below zero.', stScene(cast, card(['edge'])), ['edge']),
    stBeat('hoot', 'Then plan in words, try the simple way first, and test with the example before you check.', stScene(cast, st1Card('card', 40, 124, 560, ST26_CODE.py.slice(3), [])), ['card'], [3, 4, 5, 6, 7, 8]),
    stBeat('dot', 'In, out, example, odd cases, plan, test. I can do this!', stScene(cast, card(['in', 'out', 'ex', 'edge'])), ['cast:dot'])
  ];
}
START_LESSON('read-a-problem', {
  code: ST26_CODE, story: st26Story(),
  watch: { code: 'def count_negatives(nums):\n    count = 0\n    for n in nums:\n        if n < 0:\n            count = count + 1\n    return count\n\nprint(count_negatives([3, -1, -7, 2]))\n' },
  tryit: { py: ST26_CODE.py.join('\n') + '\n\nprint(count_negatives([3, -1, -7, 2]))\nprint(count_negatives([]))\n', js: ST26_CODE.js.join('\n') + '\n\nconsole.log(countNegatives([3, -1, -7, 2]));\nconsole.log(countNegatives([]));\n',
    goals: ['Press Run and compare with the example.', 'Add a test with 0 in the list. Is 0 counted?', 'Change it to count numbers above 10.'] },
  check: { q: 'What is the first thing to work out when you read a problem?',
    choices: [['Which loop to use', false, 'That comes later, in the plan.'], ['What goes in and what must come out', true, 'Right. In and out first, then an example, then the odd cases.'], ['How fast it runs', false, 'First make it right. Speed comes later.'], ['The variable names', false, 'Names matter, but only once you know the job.']] },
  first: ['best-time-stock', 'valid-palindrome', 'merge-strings-alternately', 'is-subsequence', 'add-digits', 'single-number']
});

// ---------- L27. Counting steps ----------
const ST27_CODE = {
  py: ['def has_seven(nums):', '    for n in nums:', '        if n == 7:', '            return True', '    return False'],
  js: ['function hasSeven(nums) {', '  for (const n of nums) {', '    if (n === 7) {', '      return true; } }', '  return false; }']
};
function st27Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const bars = (vals, lit) => ({ boxes: vals.map(([label, h], i) => ({ id: 'bar' + i, x: 110 + i * 150, y: 320 - h, w: 100, h, text: '', solid: lit === i, c: 'a' })), labels: vals.map(([label, h, laps], i) => ({ id: 'bl' + i, x: 160 + i * 150, y: 340, text: label, size: 15, c: 'm' })).concat(vals.map(([label, h, laps], i) => ({ id: 'bt' + i, x: 160 + i * 150, y: 310 - h, text: laps, size: 16, mono: true }))) });
  return [
    stBeat('penny', 'My program checks a list for a 7. With 10 numbers it is instant. With a million, is it still fine?', stScene(cast, st1Card('card', 60, 130, 520, ST27_CODE.py, [1])), ['card'], 1),
    stBeat('hoot', 'Do not time it. Count the steps. In the worst case, the loop visits every number once.', stScene(cast, st1Card('card', 60, 130, 520, ST27_CODE.py, [1, 2])), ['card'], [1, 2]),
    stBeat('hoot', '10 numbers: up to 10 laps. 20 numbers: up to 20 laps. The work grows in step with the list.', stScene(cast, bars([['10 items', 45, '10'], ['20 items', 90, '20'], ['40 items', 180, '40']])), ['bar0', 'bar1', 'bar2']),
    stBeat('dot', 'So if the list doubles, the work doubles too?', stScene(cast, bars([['10 items', 45, '10'], ['20 items', 90, '20'], ['40 items', 180, '40']], 1)), ['bar1', 'cast:dot']),
    stBeat('hoot', 'Yes. We call that O(n): steps grow like n, the size of the input. One loop over the list is O(n).', stScene(cast, { tokens: [{ id: 'on', x: 320, y: 220, text: 'one loop → O(n)', solid: true }] }), ['on']),
    stBeat('hoot', 'A loop inside a loop over the same list is different: 10 items give 100 laps, 20 give 400.', stScene(cast, bars([['10 items', 11, '100'], ['20 items', 45, '400'], ['40 items', 180, '1600']])), ['bar2']),
    stBeat('penny', 'Double the list and the work goes up four times. That is O(n²). It gets slow fast!', stScene(cast, { tokens: [{ id: 'on2', x: 320, y: 220, text: 'loop in a loop → O(n²)', c: 'c' }] }), ['on2']),
    stBeat('dot', 'Count the laps, then ask what happens when the input doubles. That is the whole idea!', stScene(cast, { tokens: [{ id: 'on', x: 320, y: 180, text: 'one loop → O(n)', solid: true }, { id: 'on2', x: 320, y: 260, text: 'loop in a loop → O(n²)', c: 'c' }] }), ['cast:dot'])
  ];
}
START_LESSON('counting-steps', {
  code: ST27_CODE, story: st27Story(),
  watch: { code: 'laps = 0\nnums = [4, 8, 15, 16]\nfor a in nums:\n    for b in nums:\n        laps = laps + 1\nprint(laps)\n' },
  tryit: { py: 'laps = 0\nn = 10\nfor i in range(n):\n    laps = laps + 1\nprint("one loop:", laps)\n\nlaps = 0\nfor i in range(n):\n    for j in range(n):\n        laps = laps + 1\nprint("loop in a loop:", laps)\n',
    js: 'let laps = 0;\nlet n = 10;\nfor (let i = 0; i < n; i++) {\n  laps = laps + 1;\n}\nconsole.log("one loop:", laps);\n\nlaps = 0;\nfor (let i = 0; i < n; i++) {\n  for (let j = 0; j < n; j++) {\n    laps = laps + 1;\n  }\n}\nconsole.log("loop in a loop:", laps);\n',
    goals: ['Press Run.', 'Set n to 20, then 40. How do the two counts grow?', 'Predict the counts for n = 100 before you run it.'] },
  check: { q: 'A loop inside a loop goes over the same list. The list doubles in size. What happens to the work?',
    choices: [['It stays the same', false, 'More items mean more laps.'], ['It doubles', false, 'That is one loop. Two nested loops multiply.'], ['It grows about four times', true, 'Right. Twice as many outer laps, each with twice as many inner laps: O(n²).'], ['It halves', false, 'More input never means less work here.']] }
});
