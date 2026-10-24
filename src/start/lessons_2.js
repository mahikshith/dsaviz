// Level 1, chapter 2 (lessons 7 to 12): asking and deciding. Every word is our own.

// ---------- L7. Asking and answering ----------
const ST7_CODE = {
  py: ['name = input("Your name? ")', 'print("Hi,", name)', 'age = int(input("Age? "))', 'print(age + 1)'],
  js: ['let name = prompt("Your name? ");', 'console.log("Hi,", name);', 'let age = Number(prompt("Age? "));', 'console.log(age + 1);']
};
function st7Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const card = (cur) => st1Card('card', 40, 124, 360, ST7_CODE.py, cur);
  const boxes = (name, age, ageTag) => ({ boxes: [stVar('bname', 'name', name, 430, 130, { w: 170 })].concat(age === null ? [] : [stVar('bage', 'age', age, 430, 230, { w: 170, sub: ageTag, subMono: true })]) });
  const screen = (lines) => st1Screen(40, 270, 360, lines, 88);
  return [
    stBeat('hoot', 'Welcome to the treehouse club. The door asks every visitor a question.', stScene(cast, card()), ['card']),
    stBeat('hoot', 'input shows a question and waits. Whatever the person types comes back as a value.', stScene(cast, card([0]), { tokens: [{ id: 'typed', x: 510, y: 160, text: 'Dot', solid: true }] }), ['typed'], 0),
    stBeat('dot', 'So name = input(...) puts my answer in a box called name!', stScene(cast, card([0]), boxes('"Dot"', null)), ['bname'], 0),
    stBeat('hoot', 'Then print greets you by name.', stScene(cast, card([1]), boxes('"Dot"', null), screen(['Your name? Dot', 'Hi, Dot'])), ['screen'], 1),
    stBeat('dot', 'Next it asks my age. I type 12, so next year I will be 13.', stScene(cast, card([2]), boxes('"Dot"', null), screen(['Your name? Dot', 'Hi, Dot'])), ['card'], 2),
    stBeat('hoot', 'Careful: input always gives back text. "12" + 1 is an error, and "12" + "1" is "121".', stScene(cast, card([2]), boxes('"Dot"', '"12"', 'str'), screen(['Your name? Dot', 'Hi, Dot'])), ['bage']),
    stBeat('hoot', 'So wrap it in int(...). int(input("Age? ")) turns the answer into a number first.', stScene(cast, card([2]), boxes('"Dot"', '12', 'int'), screen(['Your name? Dot', 'Hi, Dot'])), ['bage', 'card'], 2),
    stBeat('dot', 'Then age + 1 is 13. Ask, convert, then use!', stScene(cast, card([3]), boxes('"Dot"', '12', 'int'), screen(['Age? 12', '13'])), ['screen'], 3)
  ];
}
START_LESSON('input-output', {
  code: ST7_CODE, story: st7Story(),
  watch: { code: 'name = input("Your name? ")\nprint("Hi,", name)\nage = int(input("Age? "))\nprint(age + 1)\n', stdin: ['Dot', '12'] },
  tryit: { py: 'name = input("Your name? ")\nprint("Hi,", name)\nage = int(input("Age? "))\nprint("Next year you will be", age + 1)\n',
    js: 'let name = prompt("Your name? ");\nconsole.log("Hi,", name);\nlet age = Number(prompt("Age? "));\nconsole.log("Next year you will be", age + 1);\n',
    stdin: ['Dot', '12'],
    goals: ['Press Run. The answers come from the Input box, one per line.', 'Change the answers in the Input box and run it again.', 'Add a question that asks for a favourite food and prints it back.'] },
  check: { q: { py: 'What does int(input()) do with the answer?', js: 'What does Number(prompt()) do with the answer?' },
    choices: [['Turns the typed text into a number', true, 'Right. The answer arrives as text, and the conversion makes it a number you can do sums with.'],
      ['Checks the answer is correct', false, 'It does not check anything. It only changes the type.'],
      ['Prints the answer', false, 'Nothing is printed. The number goes back to wherever you put it.'],
      ['Asks the question twice', false, 'The question is asked once. The conversion happens to the answer.']] }
});

// ---------- L8. True or false questions ----------
const ST8_CODE = {
  py: ['age = 12', 'print(age >= 10)', 'print(age == 13)', 'print(age != 13)'],
  js: ['let age = 12;', 'console.log(age >= 10);', 'console.log(age === 13);', 'console.log(age !== 13);']
};
function st8Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const q = (expr, ans, id, y) => ({ tokens: [{ id: id, x: 220, y, text: expr }, { id: id + 'a', x: 460, y, text: ans, solid: ans === 'True', c: ans === 'False' ? 'c' : 'l' }],
    arrows: [{ id: id + 'r', from: [320, y], to: [420, y], c: 'm' }] });
  return [
    stBeat('bolt', 'Club rule: you must be 10 or older. Visitor age: 12. Checking.', stScene(cast, { boxes: [stVar('age', 'age', '12', 260, 180)] }), ['age', 'cast:bolt']),
    stBeat('hoot', 'A comparison asks a yes or no question. The answer is always True or False.', stScene(cast, q('age >= 10', 'True', 'q1', 200)), ['q1', 'q1a']),
    stBeat('hoot', '< is less than and > is more than. <= and >= also count the edge itself.', stScene(cast, { tokens: [['o1', '<'], ['o2', '>'], ['o3', '<='], ['o4', '>=']].map(([id, t], i) => ({ id, x: 170 + i * 100, y: 200, text: t, size: 22 })) }), ['o3', 'o4']),
    stBeat('dot', 'How do I ask "is the age exactly 13?"', stScene(cast, q('age == 13', '?', 'q2', 200)), ['q2', 'cast:dot']),
    stBeat('hoot', 'Use two equals signs. One = puts a value in a box. Two == asks if two values are equal.', stScene(cast, { tokens: [{ id: 'set', x: 190, y: 190, text: 'age = 13', sub: 'puts 13 in age' }, { id: 'ask', x: 450, y: 190, text: 'age == 13', sub: 'asks a question', solid: true }] }), ['set', 'ask']),
    stBeat('hoot', '!= asks "are they different?" age != 13 is True, because 12 is not 13.', stScene(cast, q('age == 13', 'False', 'q2', 180), q('age != 13', 'True', 'q3', 260)), ['q3', 'q3a']),
    stBeat('bolt', 'age >= 10 is True. The door opens.', stScene(cast, q('age >= 10', 'True', 'q1', 200)), ['q1a', 'cast:bolt'])
  ];
}
START_LESSON('compare', {
  code: ST8_CODE, story: st8Story(),
  watch: { code: 'age = 12\nold_enough = age >= 10\nis_thirteen = age == 13\nprint(old_enough, is_thirteen)\n' },
  tryit: { py: 'age = 12\nprint(age >= 10)\nprint(age == 13)\nprint(age != 13)\nprint(5 < 3)\n', js: 'let age = 12;\nconsole.log(age >= 10);\nconsole.log(age === 13);\nconsole.log(age !== 13);\nconsole.log(5 < 3);\n', differs: true,
    goals: ['Press Run and read each True or False.', 'Change age to 13 and predict what changes before you run it.', 'Add a line that asks whether 7 is less than or equal to 7.'] },
  check: { q: { py: 'What is the difference between = and ==?', js: 'What is the difference between = and ===?' },
    choices: [['They mean the same thing', false, 'They look alike but do different jobs. One stores, one asks.'],
      [{ py: '= stores a value; == asks if two values are equal', js: '= stores a value; === asks if two values are equal' }, true, 'Right. Mixing them up is one of the most common beginner bugs.'],
      [{ py: '== stores a value; = asks a question', js: '=== stores a value; = asks a question' }, false, 'The other way round: a single = stores.'],
      ['= is for numbers and == is for text', false, 'Both work with any type. The difference is storing versus asking.']] }
});

// ---------- L9. Choosing a path ----------
const ST9_CODE = {
  py: ['temp = 25', 'if temp > 20:', '    print("Sunglasses")', 'elif temp > 10:', '    print("Coat")', 'else:', '    print("Umbrella")'],
  js: ['let temp = 25;', 'if (temp > 20) {', '  console.log("Sunglasses");', '} else if (temp > 10) {', '  console.log("Coat");', '} else {', '  console.log("Umbrella"); }']
};
function st9Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const card = (cur) => st1Card('card', 30, 122, 330, ST9_CODE.py.slice(1), (cur || []).map((i) => i - 1));
  const door = (lit, temp) => ({ boxes: [stVar('temp', 'temp', String(temp), 400, 128, { w: 120 })].concat(
    [['d1', 'Sunglasses'], ['d2', 'Coat'], ['d3', 'Umbrella']].map(([id, t], i) => ({ id, x: 390, y: 208 + i * 50, w: 220, h: 44, text: t, size: 18, mono: false, solid: lit === i, c: lit === i ? 'a' : 'l', dash: lit !== null && lit !== i }))) });
  return [
    stBeat('dot', 'The weather door picks what I wear. How does it decide?', stScene(cast, door(null, 25)), ['d1', 'd2', 'd3']),
    stBeat('hoot', 'With if. if asks a question. When the answer is True, the lines inside it run.', stScene(cast, card([1, 2]), door(null, 25)), ['card'], [1, 2]),
    stBeat('hoot', 'Inside means indented: four spaces in. That is how Python knows which lines belong to the if.', stScene(cast, card([2]), door(null, 25)), ['card'], 2),
    stBeat('hoot', 'Today temp is 25. Is 25 > 20? True. So it shows Sunglasses and skips the rest.', stScene(cast, card([1, 2]), door(0, 25)), ['d1', 'temp'], [1, 2]),
    stBeat('dot', 'What if it is 15 degrees?', stScene(cast, card([1]), door(null, 15)), ['temp', 'cast:dot'], 1),
    stBeat('hoot', 'Then the first question is False, so elif asks the next one: is 15 > 10? True. Coat.', stScene(cast, card([3, 4]), door(1, 15)), ['d2', 'card'], [3, 4]),
    stBeat('hoot', 'If every question is False, else runs. Exactly one path runs, never two.', stScene(cast, card([5, 6]), door(2, 5)), ['d3', 'temp'], [5, 6]),
    stBeat('dot', 'Ask from the top, the first True wins, and else catches the rest!', stScene(cast, card([1, 3, 5]), door(0, 25)), ['cast:dot'], [1, 3, 5])
  ];
}
START_LESSON('if-else', {
  code: ST9_CODE, story: st9Story(),
  watch: { code: 'temp = 15\nif temp > 20:\n    print("Sunglasses")\nelif temp > 10:\n    print("Coat")\nelse:\n    print("Umbrella")\nprint("Have a nice day")\n' },
  tryit: { py: 'temp = 25\nif temp > 20:\n    print("Sunglasses")\nelif temp > 10:\n    print("Coat")\nelse:\n    print("Umbrella")\n',
    js: 'let temp = 25;\nif (temp > 20) {\n  console.log("Sunglasses");\n} else if (temp > 10) {\n  console.log("Coat");\n} else {\n  console.log("Umbrella");\n}\n',
    goals: ['Press Run.', 'Set temp to 15, then to 5. Which path runs each time?', 'Add a new first rule: above 30, print "Stay inside".'] },
  check: { q: 'x is 15. The program checks if x > 20, then elif x > 10, then elif x > 5. Which paths run?',
    choices: [['Only the x > 10 path', true, 'Right. The first True question wins, and the rest are skipped.'],
      ['The x > 10 and x > 5 paths', false, '15 > 5 is also True, but an elif is only asked when everything above it was False.'],
      ['All three paths', false, 'At most one path of an if, elif, else chain runs.'],
      ['None of them', false, 'x > 20 is False, but x > 10 is True, so that path runs.']] }
});

// ---------- L10. and, or, not ----------
const ST10_CODE = {
  py: ['badge = True', 'password = "owl"', 'if badge and password == "owl":', '    print("Come in")', 'if not badge or password != "owl":', '    print("Sorry")'],
  js: ['let badge = true;', 'let password = "owl";', 'if (badge && password === "owl") {', '  console.log("Come in"); }', 'if (!badge || password !== "owl") {', '  console.log("Sorry"); }']
};
function st10Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const table = (op, rows, lit) => ({ tokens: rows.map(([a, b, r], i) => [
    { id: 'a' + i, x: 150, y: 150 + i * 50, text: a, w: 90 }, { id: 'op' + i, x: 250, y: 150 + i * 50, text: op, w: 70, c: 'm' }, { id: 'b' + i, x: 350, y: 150 + i * 50, text: b, w: 90 },
    { id: 'r' + i, x: 490, y: 150 + i * 50, text: r, w: 90, solid: r === 'True' }]).reduce((x, y) => x.concat(y), []) });
  const T = 'True', F = 'False';
  return [
    stBeat('hoot', 'The treehouse has two rules: wear the badge, and say the password.', stScene(cast, { boxes: [stVar('badge', 'badge', 'True', 150, 170), stVar('pw', 'password', '"owl"', 340, 170, { w: 150 })] }), ['badge', 'pw']),
    stBeat('dot', 'Both rules? So I need the badge and the password?', stScene(cast, { boxes: [stVar('badge', 'badge', 'True', 150, 170), stVar('pw', 'password', '"owl"', 340, 170, { w: 150 })] }), ['cast:dot']),
    stBeat('hoot', 'Yes. and is True only when both sides are True.', stScene(cast, table('and', [[T, T, T], [T, F, F], [F, T, F], [F, F, F]])), ['r0']),
    stBeat('hoot', 'or is True when at least one side is True. It is kinder, but looser.', stScene(cast, table('or', [[T, T, T], [T, F, T], [F, T, T], [F, F, F]])), ['r1', 'r2']),
    stBeat('hoot', 'not flips the answer: not True is False, and not False is True.', stScene(cast, { tokens: [{ id: 'n1', x: 220, y: 190, text: 'not True' }, { id: 'n1r', x: 460, y: 190, text: 'False', c: 'c' }, { id: 'n2', x: 220, y: 260, text: 'not False' }, { id: 'n2r', x: 460, y: 260, text: 'True', solid: true }] }), ['n1', 'n2']),
    stBeat('dot', 'Can I write x == 1 or 2 to mean "x is 1 or 2"?', stScene(cast, { tokens: [{ id: 'bad', x: 320, y: 210, text: 'x == 1 or 2' }] }), ['bad', 'cast:dot']),
    stBeat('hoot', 'That is always True, because 2 alone counts as True. Write x == 1 or x == 2.', stScene(cast, { tokens: [{ id: 'bad', x: 320, y: 180, text: 'x == 1 or 2', c: 'bad' }, { id: 'good', x: 320, y: 260, text: 'x == 1 or x == 2', solid: true }] }), ['good']),
    stBeat('dot', 'A full question on each side. Got it!', stScene(cast, { tokens: [{ id: 'good', x: 320, y: 220, text: 'x == 1 or x == 2', solid: true }] }), ['cast:dot', 'good'])
  ];
}
START_LESSON('and-or-not', {
  code: ST10_CODE, story: st10Story(),
  watch: { code: 'age = 12\nhas_ticket = True\ncan_enter = age >= 10 and has_ticket\nprint(can_enter)\nis_weekend = False\nprint(is_weekend or can_enter)\nprint(not can_enter)\n' },
  tryit: { py: 'badge = True\npassword = "owl"\nif badge and password == "owl":\n    print("Come in")\nelse:\n    print("Sorry")\n',
    js: 'let badge = true;\nlet password = "owl";\nif (badge && password === "owl") {\n  console.log("Come in");\n} else {\n  console.log("Sorry");\n}\n',
    goals: ['Press Run.', 'Change the password and run it. Then set badge to False.', 'Change and to or. Which visitors get in now?'] },
  check: { q: { py: 'When is a and b True?', js: 'When is a && b true?' },
    choices: [['When either one is True', false, 'That is or. and is stricter.'],
      ['Only when both are True', true, 'Right. One False side makes the whole thing False.'],
      ['When both are False', false, 'Two False sides give False.'],
      ['Always', false, 'and depends on both sides.']] }
});
