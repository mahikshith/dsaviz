// Level 1, chapter 3 (lessons 13 to 19): repeating and collecting. Every word is our own.

// ---------- L13. Counting laps with for ----------
const ST13_CODE = {
  py: ['for tree in range(1, 6):', '    print("Acorn in tree", tree)', 'print("All hidden!")'],
  js: ['for (let tree = 1; tree < 6; tree++) {', '  console.log("Acorn in tree", tree); }', 'console.log("All hidden!");']
};
function st13Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const card = (cur) => st1Card('card', 40, 124, 380, ST13_CODE.py, cur);
  const nums = (lit, upto) => ({ tokens: [1, 2, 3, 4, 5].map((n, i) => ({ id: 'n' + n, x: 90 + i * 70, y: 240, text: String(n), w: 54, solid: n === lit, dash: upto !== undefined && n > upto })).concat([{ id: 'n6', x: 440, y: 240, text: '6', w: 54, c: 'bad', dash: true }]) });
  const box = (v) => ({ boxes: [stVar('tree', 'tree', v, 450, 140, { w: 130 })] });
  const screen = (lines) => st1Screen(40, 236, 560, lines.slice(-3), 116);
  return [
    stBeat('penny', 'I want to hide one acorn in each of 5 trees. Do I write print five times?', stScene(cast, { tokens: [1, 2, 3, 4, 5].map((n, i) => ({ id: 'tr' + n, x: 140 + i * 90, y: 210, text: 'tree ' + n, w: 80 })) }), ['cast:penny']),
    stBeat('hoot', 'No. A for loop repeats a block for you, once per lap.', stScene(cast, card([0, 1])), ['card'], [0, 1]),
    stBeat('hoot', 'range(1, 6) hands out 1, 2, 3, 4 and 5. It stops before 6.', stScene(cast, card([0]), nums(null)), ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'], 0),
    stBeat('hoot', 'On each lap, tree holds the next number, and the indented line runs once.', stScene(cast, card([1]), box('1'), screen(['Acorn in tree 1'])), ['tree', 'screen'], 1),
    stBeat('penny', 'Lap two: tree is 2. Lap three: tree is 3. The box changes every lap.', stScene(cast, card([1]), box('3'), screen(['Acorn in tree 1', 'Acorn in tree 2', 'Acorn in tree 3'])), ['tree'], 1),
    stBeat('hoot', 'After the last lap the loop ends, and the line after it runs once.', stScene(cast, card([2]), box('5'), screen(['Acorn in tree 4', 'Acorn in tree 5', 'All hidden!'])), ['screen'], 2),
    stBeat('dot', 'And range(5) gives 0, 1, 2, 3, 4. Five numbers, but it starts at 0!', stScene(cast, { tokens: [0, 1, 2, 3, 4].map((n, i) => ({ id: 'z' + n, x: 140 + i * 90, y: 220, text: String(n), w: 60, solid: n === 0 })) }), ['z0', 'cast:dot']),
    stBeat('hoot', 'Being off by one is the classic slip. Check the first and the last number every time.', stScene(cast, nums(1, 5)), ['n1', 'n5', 'n6'])
  ];
}
START_LESSON('for-range', {
  code: ST13_CODE, story: st13Story(),
  watch: { code: 'for tree in range(1, 4):\n    print("Acorn in tree", tree)\nprint("All hidden!")\n' },
  tryit: { py: 'for tree in range(1, 6):\n    print("Acorn in tree", tree)\nprint("All hidden!")\n', js: 'for (let tree = 1; tree < 6; tree++) {\n  console.log("Acorn in tree", tree);\n}\nconsole.log("All hidden!");\n',
    goals: ['Press Run and count the lines.', 'Change it to hide acorns in trees 1 to 10.', 'Use range(0, 20, 5) and see what the third number does.'] },
  check: { q: { py: 'How many times does the loop body run for range(2, 7)?', js: 'How many times does the body of for (let i = 2; i < 7; i++) run?' },
    choices: [['7', false, 'It starts at 2, not 0.'], ['6', false, 'It stops before 7, so 7 itself is not included.'], ['5', true, 'Right: 2, 3, 4, 5, 6. Last minus first is 7 - 2 = 5.'], ['4', false, 'Count them: 2, 3, 4, 5, 6.']] }
});

// ---------- L14. Repeat while it is true ----------
const ST14_CODE = {
  py: ['water = 0', 'while water < 3:', '    water = water + 1', '    print("Pour. Water:", water)', 'print("Full!")'],
  js: ['let water = 0;', 'while (water < 3) {', '  water = water + 1;', '  console.log("Pour. Water:", water); }', 'console.log("Full!");']
};
function st14Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const card = (cur) => st1Card('card', 30, 124, 390, ST14_CODE.py, cur);
  const cup = (level, flood) => ({ boxes: [{ id: 'cup', x: 470, y: 150, w: 110, h: 150, rx: 10, text: '', c: flood ? 'bad' : 'l' }, { id: 'water', x: 474, y: 296 - Math.min(level, 3) * 48, w: 102, h: Math.max(2, Math.min(level, 3) * 48), rx: 6, text: '', solid: true }],
    labels: [{ id: 'lvl', x: 525, y: 330, text: 'water ' + level, mono: true, c: flood ? 'bad' : 'm', size: 16 }] });
  return [
    stBeat('bolt', 'Task: fill the cup. Cup holds 3 scoops. Starting.', stScene(cast, cup(0)), ['cup', 'cast:bolt']),
    stBeat('hoot', 'A while loop repeats its block for as long as its question stays True.', stScene(cast, card([1, 2, 3]), cup(0)), ['card'], [1, 2, 3]),
    stBeat('hoot', 'water < 3 is True, so the computer pours: water goes up by 1. Then the question is asked again.', stScene(cast, card([2]), cup(1)), ['water', 'lvl'], 2),
    stBeat('bolt', 'Water: 2. Still less than 3. Pouring. Water: 3.', stScene(cast, card([3]), cup(3)), ['water', 'cast:bolt'], 3),
    stBeat('hoot', 'Now water < 3 is False. The loop stops and the program goes on: Full!', stScene(cast, card([4]), cup(3)), ['card'], 4),
    stBeat('dot', 'What if I forget the line that adds 1?', stScene(cast, card([1, 3]), cup(0)), ['cast:dot'], [1, 3]),
    stBeat('bolt', 'Water: 0. Pouring. Water: 0. Pouring. Water: 0. Pouring...', stScene(cast, cup(0, true), { tokens: [{ id: 'flood', x: 240, y: 230, text: 'never ends', c: 'bad' }] }), ['flood', 'cup']),
    stBeat('hoot', 'The question never turns False, so the loop never stops. Something inside must change.', stScene(cast, card([2]), cup(3)), ['card'], 2)
  ];
}
START_LESSON('while', {
  code: ST14_CODE, story: st14Story(),
  watch: { code: 'water = 0\nwhile water < 3:\n    water = water + 1\n    print("Pour. Water:", water)\nprint("Full!")\n' },
  tryit: { py: 'n = 5\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint("Liftoff!")\n', js: 'let n = 5;\nwhile (n > 0) {\n  console.log(n);\n  n = n - 1;\n}\nconsole.log("Liftoff!");\n',
    goals: ['Press Run to count down.', 'Start from 10 instead.', 'Delete the n = n - 1 line and run it. The runner stops it for you. Then put it back.'] },
  check: { q: 'When does a while loop stop?',
    choices: [['After 10 laps', false, 'There is no fixed number of laps. It depends on the question.'], ['When its question becomes False', true, 'Right. That is why something inside the loop has to change.'], ['When it reaches the end of the file', false, 'The loop goes back to its question after each lap.'], ['Never', false, 'It stops as soon as the question is False.']] }
});

// ---------- L15. Keeping a running total ----------
const ST15_CODE = {
  py: ['counts = [4, 7, 2]', 'total = 0', 'for c in counts:', '    total = total + c', 'print(total)'],
  js: ['let counts = [4, 7, 2];', 'let total = 0;', 'for (const c of counts) {', '  total = total + c; }', 'console.log(total);']
};
function st15Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const card = (cur) => st1Card('card', 30, 124, 380, ST15_CODE.py, cur);
  const boxes = (c, total) => ({ boxes: [stVar('c', 'c', c, 450, 136, { w: 140 }), stVar('total', 'total', total, 450, 236, { w: 140, tc: 'c' })] });
  return [
    stBeat('penny', 'Three trees hold 4, 7 and 2 acorns. I want the total, one tree at a time.', stScene(cast, { tokens: [4, 7, 2].map((n, i) => ({ id: 'k' + i, x: 200 + i * 120, y: 210, text: String(n) })) }), ['k0', 'k1', 'k2']),
    stBeat('hoot', 'Start an empty box: total = 0. It will collect the count as we go.', stScene(cast, card([1]), boxes('-', '0')), ['total'], 1),
    stBeat('hoot', 'Lap one: c is 4. total = total + c, so 0 + 4 puts 4 in the box.', stScene(cast, card([2, 3]), boxes('4', '4')), ['c', 'total'], [2, 3]),
    stBeat('penny', 'Lap two: c is 7, so the total becomes 4 + 7, which is 11.', stScene(cast, card([3]), boxes('7', '11')), ['total'], 3),
    stBeat('hoot', 'Lap three: 11 + 2 is 13. The loop is out of trees, so print shows 13.', stScene(cast, card([4]), boxes('2', '13')), ['total'], 4),
    stBeat('dot', 'What if I put total = 0 inside the loop?', stScene(cast, card([1, 3]), boxes('2', '2')), ['cast:dot']),
    stBeat('hoot', 'Then the box is emptied every lap, and you only keep the last tree. Set it up once, before the loop.', stScene(cast, card([1]), boxes('2', '13')), ['card'], 1),
    stBeat('dot', 'Start before the loop, add inside, use after. That is an accumulator!', stScene(cast, card([1, 3, 4]), boxes('2', '13')), ['cast:dot', 'total'], [1, 3, 4])
  ];
}
START_LESSON('accumulator', {
  code: ST15_CODE, story: st15Story(),
  watch: { code: 'counts = [4, 7, 2]\ntotal = 0\nfor c in counts:\n    total = total + c\nprint(total)\n' },
  tryit: { py: 'total = 0\nfor n in range(1, 6):\n    total = total + n\nprint(total)\n', js: 'let total = 0;\nfor (let n = 1; n < 6; n++) {\n  total = total + n;\n}\nconsole.log(total);\n',
    goals: ['Press Run: it adds 1 to 5.', 'Press Watch my code run and switch to the Step-by-step table.', 'Make it add 1 to 100 instead.'] },
  check: { q: 'Where does total = 0 go in an accumulator loop?',
    choices: [['Inside the loop', false, 'Then it is reset every lap and you only keep the last value.'], ['Before the loop', true, 'Right. Set it up once, add inside, use it after.'], ['After the loop', false, 'Then the loop has nothing to add to, and the answer is lost.'], ['Anywhere', false, 'The place changes the answer. It belongs before the loop.']] }
});

// ---------- L16. Lists are backpacks ----------
const ST16_CODE = {
  py: ['bag = ["map", "torch", "rope"]', 'bag.append("snack")', 'print(bag[0])', 'print(bag[-1])', 'print(len(bag))'],
  js: ['let bag = ["map", "torch", "rope"];', 'bag.push("snack");', 'console.log(bag[0]);', 'console.log(bag[bag.length - 1]);', 'console.log(bag.length);']
};
function st16Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const pockets = (items, o) => {
    o = o || {};
    return { boxes: items.map((v, i) => ({ id: 'p' + i, x: 50 + i * 138, y: 160, w: 126, h: 64, text: v, size: 18, solid: (o.lit || []).includes(i), dash: o.gone === i, c: o.fresh === i ? 'a' : 'l' })),
      labels: items.map((v, i) => ({ id: 'ix' + i, x: 113 + i * 138, y: 250, text: '[' + i + ']', mono: true, c: 'm', size: 16 })) };
  };
  const card = (cur) => st1Card('card', 50, 270, 540, [ST16_CODE.py[cur]], [0]);
  return [
    stBeat('dot', 'I am packing for a hike: a map, a torch and a rope. Three boxes with three names?', stScene(cast, pockets(['"map"', '"torch"', '"rope"'])), ['cast:dot']),
    stBeat('hoot', 'Use one backpack. A list keeps many values in order, under one name: bag.', stScene(cast, pockets(['"map"', '"torch"', '"rope"']), card(0)), ['p0', 'p1', 'p2']),
    stBeat('hoot', 'Each pocket has a number. The first pocket is number 0, not 1.', stScene(cast, pockets(['"map"', '"torch"', '"rope"'], { lit: [0] })), ['p0', 'ix0']),
    stBeat('penny', 'Add a snack! append puts a new pocket at the very end.', stScene(cast, pockets(['"map"', '"torch"', '"rope"', '"snack"'], { fresh: 3 }), card(1)), ['p3', 'ix3'], 1),
    stBeat('hoot', 'bag[0] is the first pocket: "map". bag[-1] counts from the back: "snack".', stScene(cast, pockets(['"map"', '"torch"', '"rope"', '"snack"'], { lit: [0, 3] }), card(3)), ['p0', 'p3'], [2, 3]),
    stBeat('dot', 'len(bag) is 4, so the last pocket must be bag[4]?', stScene(cast, pockets(['"map"', '"torch"', '"rope"', '"snack"']), card(4)), ['cast:dot', 'ix3'], 4),
    stBeat('hoot', 'No: four pockets are numbered 0 to 3. bag[4] does not exist, so Python says IndexError.', stScene(cast, pockets(['"map"', '"torch"', '"rope"', '"snack"'], { lit: [3] }), { tokens: [{ id: 'bad', x: 320, y: 300, text: 'bag[4] → IndexError', c: 'bad' }] }), ['bad', 'ix3']),
    stBeat('dot', 'First pocket 0. Last pocket len - 1, or -1 for short. Got it!', stScene(cast, pockets(['"map"', '"torch"', '"rope"', '"snack"'], { lit: [0, 3] })), ['cast:dot'])
  ];
}
START_LESSON('lists', {
  code: ST16_CODE, story: st16Story(),
  watch: { code: 'bag = ["map", "torch", "rope"]\nbag.append("snack")\nfirst = bag[0]\nlast = bag[-1]\nsize = len(bag)\nprint(first, last, size)\n' },
  tryit: { py: 'bag = ["map", "torch", "rope"]\nbag.append("snack")\nprint(bag)\nprint(bag[0], bag[-1])\nprint(len(bag))\n', js: 'let bag = ["map", "torch", "rope"];\nbag.push("snack");\nconsole.log(bag);\nconsole.log(bag[0], bag[bag.length - 1]);\nconsole.log(bag.length);\n', differs: true,
    goals: ['Press Run.', 'Append two more things to the bag.', 'Print the second pocket. Which number is it?'] },
  check: { q: 'A list holds 5 items. What is the number of the last pocket?',
    choices: [['5', false, 'Pockets start at 0, so 5 items use 0 to 4.'], ['4', true, 'Right. The last pocket is always len - 1, or -1 from the back.'], ['1', false, 'That is the second pocket.'], ['0', false, 'That is the first pocket.']] }
});

// ---------- L17. Visiting every item ----------
const ST17_CODE = {
  py: ['weights = [3, 9, 4]', 'biggest = weights[0]', 'for w in weights:', '    if w > biggest:', '        biggest = w', 'print(biggest)'],
  js: ['let weights = [3, 9, 4];', 'let biggest = weights[0];', 'for (const w of weights) {', '  if (w > biggest) {', '    biggest = w; } }', 'console.log(biggest);']
};
function st17Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const row = (lit) => ({ boxes: [3, 9, 4].map((v, i) => ({ id: 'w' + i, x: 60 + i * 110, y: 140, w: 96, h: 60, text: String(v), solid: lit === i })) });
  const best = (v) => ({ boxes: [stVar('best', 'biggest', String(v), 430, 140, { w: 160, tc: 'c' })] });
  const card = (cur) => st1Card('card', 40, 222, 560, [ST17_CODE.py[cur[0]]].concat(cur.length > 1 ? [ST17_CODE.py[cur[1]]] : []), [0]);
  return [
    stBeat('penny', 'I weighed my acorns: 3, 9 and 4 grams. Which is the heaviest?', stScene(cast, row(null)), ['w0', 'w1', 'w2']),
    stBeat('hoot', 'for w in weights visits every item once, from the first to the last.', stScene(cast, row(0), card([2])), ['w0'], 2),
    stBeat('hoot', 'Keep a box for the best so far. Start it with the first item, not 0.', stScene(cast, row(0), best(3), card([1])), ['best'], 1),
    stBeat('penny', 'Next is 9. Is 9 > 3? Yes, so 9 goes in the box.', stScene(cast, row(1), best(9), card([3, 4])), ['w1', 'best'], [3, 4]),
    stBeat('penny', 'Then 4. Is 4 > 9? No, so the box keeps 9.', stScene(cast, row(2), best(9), card([3])), ['w2', 'best'], 3),
    stBeat('hoot', 'The loop is done and biggest holds 9. One pass over the list was enough.', stScene(cast, row(null), best(9), card([5])), ['best'], 5),
    stBeat('dot', 'Why not start biggest at 0?', stScene(cast, { boxes: [-5, -2, -8].map((v, i) => ({ id: 'n' + i, x: 60 + i * 110, y: 140, w: 96, h: 60, text: String(v) })) }, best(0)), ['cast:dot']),
    stBeat('hoot', 'If every weight is below 0, nothing beats 0 and you get a wrong answer. Start from a real item.', stScene(cast, { boxes: [-5, -2, -8].map((v, i) => ({ id: 'n' + i, x: 60 + i * 110, y: 140, w: 96, h: 60, text: String(v), solid: i === 1 })) }, best(-2)), ['best', 'n1'])
  ];
}
START_LESSON('list-loops', {
  code: ST17_CODE, story: st17Story(),
  watch: { code: 'weights = [3, 9, 4]\nbiggest = weights[0]\nfor w in weights:\n    if w > biggest:\n        biggest = w\nprint(biggest)\n' },
  tryit: { py: 'weights = [3, 9, 4, 12, 1]\ntotal = 0\ncount = 0\nfor w in weights:\n    total = total + w\n    if w > 3:\n        count = count + 1\nprint("total", total)\nprint("more than 3:", count)\n',
    js: 'let weights = [3, 9, 4, 12, 1];\nlet total = 0;\nlet count = 0;\nfor (const w of weights) {\n  total = total + w;\n  if (w > 3) {\n    count = count + 1;\n  }\n}\nconsole.log("total", total);\nconsole.log("more than 3:", count);\n',
    goals: ['Press Run.', 'Add more weights to the list and run again.', 'Add a box that finds the smallest weight.'] },
  check: { q: 'To find the biggest number in a list, what should the "best so far" box start as?',
    choices: [['0', false, 'If every number is negative, 0 would win, and it is not even in the list.'], ['The first item of the list', true, 'Right. It is a real value from the list, so the answer is always one of the items.'], ['The last item, and never change it', false, 'The box has to be updated whenever a bigger item turns up.'], ['A random number', false, 'A random start could be bigger than every item.']] }
});

// ---------- L18. Text is a row of letters ----------
const ST18_CODE = {
  py: ['note = "hello"', 'print(len(note))', 'print(note[0], note[-1])', 'print(note[1:4])', 'print(note[::-1])'],
  js: ['let note = "hello";', 'console.log(note.length);', 'console.log(note[0], note[note.length - 1]);', 'console.log(note.slice(1, 4));', 'console.log(note.split("").reverse().join(""));']
};
function st18Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const beads = (s, lit) => ({ boxes: s.split('').map((ch, i) => ({ id: 'b' + i, x: 110 + i * 86, y: 150, w: 74, h: 64, text: ch, solid: (lit || []).includes(i) })), labels: s.split('').map((ch, i) => ({ id: 'bi' + i, x: 147 + i * 86, y: 240, text: String(i), mono: true, c: 'm', size: 16 })) });
  const card = (i) => st1Card('card', 60, 266, 520, [ST18_CODE.py[i]], [0]);
  return [
    stBeat('dot', 'I wrote a secret note: hello. Can Python read it letter by letter?', stScene(cast, beads('hello')), ['cast:dot']),
    stBeat('hoot', 'Yes. A string is a row of letters. They are numbered from 0, like a list.', stScene(cast, beads('hello'), card(0)), ['bi0', 'bi1', 'bi2', 'bi3', 'bi4']),
    stBeat('hoot', 'len(note) counts the letters: 5. note[0] is h and note[-1] is o.', stScene(cast, beads('hello', [0, 4]), card(2)), ['b0', 'b4'], [1, 2]),
    stBeat('bolt', 'A slice: note[1:4]. Taking letters 1, 2 and 3. Stopping before 4. Result: ell.', stScene(cast, beads('hello', [1, 2, 3]), card(3)), ['b1', 'b2', 'b3'], 3),
    stBeat('bolt', 'Reversing: note[::-1] reads from the back. Result: olleh.', stScene(cast, beads('olleh'), card(4)), ['b0', 'b1', 'b2', 'b3', 'b4'], 4),
    stBeat('dot', 'Can I change one letter, like note[0] = "j"?', stScene(cast, beads('hello', [0])), ['b0', 'cast:dot']),
    stBeat('hoot', 'No. Strings never change. Build a new one instead: "j" + note[1:] gives jello.', stScene(cast, beads('jello', [0])), ['b0']),
    stBeat('dot', 'Count it, read a letter, slice a piece, or build a new string. Like a list of letters!', stScene(cast, beads('jello')), ['cast:dot'])
  ];
}
START_LESSON('strings', {
  code: ST18_CODE, story: st18Story(),
  watch: { code: 'note = "hello"\nsize = len(note)\nfirst = note[0]\nmiddle = note[1:4]\nback = note[::-1]\nprint(size, first, middle, back)\n' },
  tryit: { py: 'note = "hello"\nprint(len(note))\nprint(note[0], note[-1])\nprint(note[1:4])\nprint(note.upper())\nfor letter in note:\n    print(letter)\n',
    js: 'let note = "hello";\nconsole.log(note.length);\nconsole.log(note[0], note[note.length - 1]);\nconsole.log(note.slice(1, 4));\nconsole.log(note.toUpperCase());\nfor (const letter of note) {\n  console.log(letter);\n}\n',
    goals: ['Press Run.', 'Put your own name in note.', 'Print only the first three letters with a slice.'] },
  check: { q: { py: 'What does "python"[1:3] give?', js: 'What does "python".slice(1, 3) give?' },
    choices: [['"pyt"', false, 'Letter 0 is p, and the slice starts at 1.'], ['"yt"', true, 'Right: letters 1 and 2, stopping before 3.'], ['"yth"', false, 'The slice stops before position 3.'], ['"py"', false, 'That would be [0:2].']] }
});

// ---------- L19. Loops inside loops (optional) ----------
const ST19_CODE = {
  py: ['for row in range(3):', '    line = ""', '    for col in range(4):', '        line = line + "*"', '    print(line)'],
  js: ['for (let row = 0; row < 3; row++) {', '  let line = "";', '  for (let col = 0; col < 4; col++) {', '    line = line + "*"; }', '  console.log(line); }']
};
function st19Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const grid = (rows, cols, curR, curC) => ({ boxes: [].concat(...[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => ({ id: 'g' + r + c, x: 90 + c * 64, y: 140 + r * 64, w: 54, h: 54, text: r < rows || (r === rows && c < cols) ? '*' : '', solid: r === curR && c === curC })))) });
  const boxes = (r, c) => ({ boxes: [stVar('row', 'row', String(r), 400, 140, { w: 120 }), stVar('col', 'col', String(c), 400, 240, { w: 120 })] });
  return [
    stBeat('bolt', 'Task: tile the treehouse floor. 3 rows, 4 tiles in each row.', stScene(cast, grid(0, 0)), ['cast:bolt']),
    stBeat('hoot', 'One loop counts the rows. Inside it, another loop counts the tiles in that row.', stScene(cast, grid(0, 1, 0, 0), boxes(0, 0)), ['row', 'col']),
    stBeat('bolt', 'Row 0: tile, tile, tile, tile. The inner loop ran 4 times.', stScene(cast, grid(1, 0, 0, 3), boxes(0, 3)), ['col', 'g03']),
    stBeat('hoot', 'Only now does the outer loop take its next lap. row becomes 1 and col starts again at 0.', stScene(cast, grid(1, 1, 1, 0), boxes(1, 0)), ['row', 'col']),
    stBeat('bolt', 'Row 1 done. Row 2 done. 3 rows times 4 tiles: 12 tiles.', stScene(cast, grid(3, 0, 2, 3), boxes(2, 3)), ['g23']),
    stBeat('dot', 'So the inner loop runs all its laps for every single lap of the outer one!', stScene(cast, grid(3, 0), boxes(2, 3)), ['cast:dot']),
    stBeat('hoot', 'Give the counters clear names, like row and col, so you never mix up which is which.', stScene(cast, grid(3, 0), boxes(2, 3)), ['row', 'col'])
  ];
}
START_LESSON('nested-loops', {
  code: ST19_CODE, story: st19Story(),
  watch: { code: 'for row in range(2):\n    line = ""\n    for col in range(3):\n        line = line + "*"\n    print(line)\n' },
  tryit: { py: 'for row in range(3):\n    line = ""\n    for col in range(4):\n        line = line + "*"\n    print(line)\n', js: 'for (let row = 0; row < 3; row++) {\n  let line = "";\n  for (let col = 0; col < 4; col++) {\n    line = line + "*";\n  }\n  console.log(line);\n}\n',
    goals: ['Press Run.', 'Make the floor 5 rows by 2 tiles.', 'Make row number r get r + 1 stars, to draw a triangle.'] },
  check: { q: 'An outer loop runs 3 laps and the inner loop runs 4 laps each time. How many times does the inner body run in all?',
    choices: [['7', false, 'The laps multiply, they do not add.'], ['4', false, 'That is only one row.'], ['12', true, 'Right: 3 rows times 4 each.'], ['3', false, 'That is the number of rows.']] }
});
