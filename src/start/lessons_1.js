// Level 1, chapter 1 (lessons 1 to 6): stories, code cards, watch programs, try-its and checks.
// Every word is our own. START_LESSON(id, data) fills in the lesson record from chapters.js and marks it ready.

// ---------- L1. What is a program? ----------
const ST1_CODE = {
  py: ['print("Take one slice")', 'print("Put it in the toaster")', 'print(2 + 3)'],
  js: ['console.log("Take one slice");', 'console.log("Put it in the toaster");', 'console.log(2 + 3);']
};
function st1Story() {
  const cast = (only) => ({ cast: [{ id: 'hoot', x: 60, y: 64 }, { id: 'bolt', x: 320, y: 64 }, { id: 'dot', x: 580, y: 64 }].filter((c) => !only || only.includes(c.id)) });
  const toaster = (inside, smoke) => ({ boxes: [{ id: 'toaster', x: 250, y: 190, w: 140, h: 96, text: inside || '', size: 18, c: smoke ? 'bad' : 'l', sub: 'toaster' }] });
  const steps = (lit) => ({ tokens: ['Take one slice', 'Put it in the toaster', 'Press the lever'].map((s, i) => ({ id: 'step' + i, x: 320, y: 160 + i * 52, text: (i + 1) + '. ' + s, w: 300, solid: lit === i })) });
  const card = (cur) => ({ cards: [{ id: 'card', x: 120, y: 120, w: 400, lines: ST1_CODE.py, cur: cur || [] }] });
  const screen = (lines) => ({ screens: [{ id: 'screen', x: 120, y: 238, w: 400, h: 116, lines }] });
  return [
    stBeat('hoot', 'Meet the computer, our robot. The computer does exactly what it is told, and only that.', stScene(cast(), toaster()), ['cast:bolt']),
    stBeat('dot', 'Computer, make toast, please!', stScene(cast(), toaster(), { tokens: [{ id: 'loaf', x: 320, y: 150, text: 'the whole loaf' }] }), ['loaf', 'cast:dot']),
    stBeat('hoot', 'The computer put the whole loaf in. We never said one slice. It does only what you say. It does not guess.', stScene(cast(), toaster('whole loaf', true)), ['toaster']),
    stBeat('dot', 'So I need to say every step, exactly, in the right order?', stScene(cast(['hoot', 'dot']), steps()), ['step0', 'step1', 'step2']),
    stBeat('hoot', 'Yes. A list of exact steps is a program. The computer runs them from the top down.', stScene(cast(['hoot', 'dot']), steps(0), { arrows: [{ id: 'down', from: [150, 150], to: [150, 280], c: 'a' }] }), ['step0', 'down']),
    stBeat('hoot', 'We write the steps in a language the computer reads: Python. Each line is one step. print shows something on the screen.', stScene(cast(['hoot', 'dot']), card()), ['card']),
    stBeat('dot', 'Why does the last line have no quotes around 2 + 3?', stScene(cast(['hoot', 'dot']), card([2])), ['card'], 2),
    stBeat('hoot', 'Text in quotes is shown as it is. With no quotes, the computer works it out: print(2 + 3) shows 5.', stScene(cast(['hoot', 'dot']), card([2]), screen(['5'])), ['screen'], 2),
    stBeat('dot', 'All three lines run in order. Now I want to run one myself!', stScene(cast(['hoot', 'dot']), card([0, 1, 2]), screen(['Take one slice', 'Put it in the toaster', '5'])), ['cast:dot', 'screen'], [0, 1, 2])
  ];
}

START_LESSON('what-is-a-program', {
  code: ST1_CODE, story: st1Story(),
  watch: { code: 'print("Take one slice")\nprint("Put it in the toaster")\nprint(2 + 3)\n' },
  tryit: { py: 'print(2 + 3)\nprint(10 - 4)\n', js: 'console.log(2 + 3);\nconsole.log(10 - 4);\n',
    goals: ['Press Run. The computer works out each sum.', 'Change 10 - 4 to 100 - 1 and run it again.', 'Add a third line that prints 6 + 7.'] },
  check: { q: 'What does a computer do with the steps in a program?',
    choices: [['Runs them exactly as written, from top to bottom', true, 'Right. It never skips ahead or guesses. That is why the order and the details matter.'],
      ['Works out what you meant and does that', false, 'It cannot guess. Remember the computer and the whole loaf: it does what is written.'],
      ['Runs the most important step first', false, 'Every step runs in order, from the first line down.'],
      ['Runs the steps in any order it likes', false, 'The order is fixed: top to bottom, one line at a time.']] },
  first: []
});

// Shared stage pieces for chapter 1.
const st1Cast = (ids) => ({ cast: ids.map(([id, x]) => ({ id, x, y: 60 })) });
const st1Card = (id, x, y, w, lines, cur) => ({ cards: [{ id, x, y, w, lines, cur: cur || [] }] });
const st1Screen = (x, y, w, lines, h) => ({ screens: [{ id: 'screen', x, y, w, h: h || Math.max(88, 60 + 28 * Math.max(1, lines.length)), lines }] });

// ---------- L2. Your first run ----------
const ST2_CODE = {
  py: ['print("The shop is open!")', 'print("Hello,", "Maria")', 'print("2 + 2")'],
  js: ['console.log("The shop is open!");', 'console.log("Hello,", "Maria");', 'console.log("2 + 2");']
};
function st2Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const card = (cur) => st1Card('card', 120, 120, 400, ST2_CODE.py, cur);
  const screen = (lines) => st1Screen(120, 238, 400, lines, 116);
  return [
    stBeat('dot', 'The computer has to tell everyone the shop is open. How do I make it speak?', stScene(cast, card(), screen([])), ['cast:bolt', 'cast:dot']),
    stBeat('hoot', 'With print. print is a function: a named tool that does one job. It shows what is inside the round brackets ( ).', stScene(cast, card([0]), screen([])), ['card'], 0),
    stBeat('hoot', 'The quotes mark where the text starts and ends. Text in quotes is called a string.', stScene(cast, { tokens: [{ id: 'text', x: 320, y: 190, text: '"The shop is open!"', solid: true }] },
      { labels: [{ id: 'l1', x: 196, y: 262, text: 'starts here', c: 'm', size: 16 }, { id: 'l2', x: 444, y: 262, text: 'ends here', c: 'm', size: 16 }] },
      { arrows: [{ id: 'a1', from: [196, 244], to: [206, 212], c: 'a' }, { id: 'a2', from: [444, 244], to: [434, 212], c: 'a' }] }), ['text', 'a1', 'a2', 'l1', 'l2']),
    stBeat('bolt', 'The shop is open!', stScene(cast, card([0]), screen(['The shop is open!'])), ['screen', 'cast:bolt'], 0),
    stBeat('dot', 'Can one print show two things at once?', stScene(cast, card([1]), screen(['The shop is open!'])), ['card'], 1),
    stBeat('hoot', 'Yes. Put a comma between them, and print adds one space in between.', stScene(cast, card([1]), screen(['The shop is open!', 'Hello, Maria'])), ['screen'], 1),
    stBeat('dot', 'And "2 + 2" in quotes stays as text. It shows 2 + 2, not 4!', stScene(cast, card([2]), screen(['The shop is open!', 'Hello, Maria', '2 + 2'])), ['screen'], 2),
    stBeat('hoot', 'Each print starts a new line. Now print an announcement of your own.', stScene(cast, card([0, 1, 2]), screen(['The shop is open!', 'Hello, Maria', '2 + 2'])), ['cast:dot'], [0, 1, 2])
  ];
}
START_LESSON('first-run', {
  code: ST2_CODE, story: st2Story(),
  watch: { code: 'print("The shop is open!")\nprint("Hello,", "Maria")\nprint("2 + 2")\n' },
  tryit: { py: 'print("The shop is open!")\nprint("Today we sell", "apples")\n', js: 'console.log("The shop is open!");\nconsole.log("Today we sell", "apples");\n',
    goals: ['Press Run and read both lines.', 'Change apples to something you like, then run it again.', 'Add a third line that prints your name.'] },
  check: { q: { py: 'What does print("Hi", "Maria") show?', js: 'What does console.log("Hi", "Maria") show?' },
    choices: [['HiMaria', false, 'The comma adds a space between the two pieces.'],
      ['Hi Maria', true, 'Right. Two pieces, one space between them, no quotes on the screen.'],
      ['"Hi", "Maria"', false, 'The quotes only mark the text in the code. They are not shown.'],
      ['Hi, Maria', false, 'The comma separates the pieces in the code. It is not printed.']] }
});

// ---------- L3. Calculator mode ----------
const ST3_CODE = {
  py: ['print(12 + 30)', 'print(7 * 6)', 'print(7 / 2)', 'print(7 // 2, 7 % 2)'],
  js: ['console.log(12 + 30);', 'console.log(7 * 6);', 'console.log(7 / 2);', 'console.log(Math.floor(7 / 2), 7 % 2);']
};
function st3Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const card = (cur) => st1Card('card', 110, 122, 420, ST3_CODE.py, cur);
  const screen = (lines) => st1Screen(110, 268, 420, lines, 88);
  const acorns = { tokens: [0, 1, 2, 3, 4, 5, 6].map((i) => ({ id: 'acorn' + i, x: 200 + i * 40, y: 170, text: '●', w: 34, size: 16 })) };
  return [
    stBeat('penny', 'I have 12 acorns in one tree and 30 in another. How many is that?', stScene(cast, { boxes: [stVar('tree1', 'tree 1', '12', 170, 180), stVar('tree2', 'tree 2', '30', 350, 180)] }), ['tree1', 'tree2']),
    stBeat('hoot', 'Ask Python. + adds and - takes away. print(12 + 30) shows 42.', stScene(cast, card([0]), screen(['42'])), ['screen'], 0),
    stBeat('hoot', '* means times. 7 * 6 is 42 as well.', stScene(cast, card([1]), screen(['42', '42'])), ['card'], 1),
    stBeat('penny', 'Now I want to share 7 acorns between 2 friends.', stScene(cast, acorns, { boxes: [stVar('fa', 'friend A', '?', 170, 240), stVar('fb', 'friend B', '?', 350, 240)] }), ['acorn0', 'acorn1', 'acorn2', 'acorn3', 'acorn4', 'acorn5', 'acorn6']),
    stBeat('hoot', '/ divides and can give a decimal: 7 / 2 is 3.5. Half an acorn is messy!', stScene(cast, card([2]), screen(['3.5'])), ['screen'], 2),
    stBeat('hoot', '// keeps the whole part, so 3 each. % gives what is left over: 1.', stScene(cast, { boxes: [stVar('fa', 'friend A', '3', 90, 200), stVar('fb', 'friend B', '3', 260, 200), stVar('left', 'left over', '1', 430, 200, { c: 'c' })] },
      { labels: [{ id: 'la', x: 150, y: 300, text: '7 // 2', mono: true, c: 'm' }, { id: 'lb', x: 490, y: 300, text: '7 % 2', mono: true, c: 'm' }] }), ['fa', 'fb', 'left'], 3),
    stBeat('dot', 'Like sharing sweets: the whole part first, then the leftovers.', stScene(cast, card([3]), screen(['3 1'])), ['screen'], 3),
    stBeat('hoot', 'One more rule: * and / go before + and -. Brackets change the order.', stScene(cast, { tokens: [{ id: 'e1', x: 220, y: 190, text: '2 + 3 * 4' }, { id: 'r1', x: 460, y: 190, text: '14', solid: true }, { id: 'e2', x: 220, y: 270, text: '(2 + 3) * 4' }, { id: 'r2', x: 460, y: 270, text: '20', solid: true }] },
      { arrows: [{ id: 'x1', from: [300, 190], to: [430, 190], c: 'a' }, { id: 'x2', from: [310, 270], to: [430, 270], c: 'a' }] }), ['e1', 'r1', 'e2', 'r2'])
  ];
}
START_LESSON('calculator', {
  code: ST3_CODE, story: st3Story(),
  watch: { code: 'print(12 + 30)\nprint(7 * 6)\nprint(7 / 2)\nprint(7 // 2, 7 % 2)\nprint(2 + 3 * 4)\n' },
  tryit: { py: 'print(12 + 30)\nprint(7 // 2)\nprint(7 % 2)\nprint(2 + 3 * 4)\nprint((2 + 3) * 4)\n', js: 'console.log(12 + 30);\nconsole.log(Math.floor(7 / 2));\nconsole.log(7 % 2);\nconsole.log(2 + 3 * 4);\nconsole.log((2 + 3) * 4);\n',
    goals: ['Press Run and match each line to its answer.', 'Share 20 acorns between 6 friends: change the 7 and the 2.', 'Add a line that works out how many seconds are in an hour.'] },
  check: { q: 'What does 9 % 4 give?',
    choices: [['2', false, '% does not halve. It gives what is left after taking out whole fours.'],
      ['2.25', false, 'That is 9 / 4. % gives the leftover instead.'],
      ['1', true, 'Right. Two fours make 8, and 1 is left over.'],
      ['0', false, '9 does not split evenly into fours, so something is left over.']] }
});

// ---------- L4. Reading your first error ----------
const ST4_CODE = {
  py: ['print("Hello)', 'prnt("Hi")', 'print("Age: " + 7)'],
  js: ['console.log("Hello);', 'consol.log("Hi");', 'console.log(null.length);']
};
function st4Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const err = (lines, cur) => ({ cards: [{ id: 'err', x: 90, y: 100, w: 460, lines, cur: cur || [] }] });
  const code = (cur) => st1Card('code', 90, 250, 460, ST4_CODE.py, cur);
  const E1 = ['File "main.py", line 1', '  print("Hello)', 'SyntaxError: unterminated string literal'];
  const E2 = ['Traceback (most recent call last):', '  File "main.py", line 2, in <module>', '    prnt("Hi")', "NameError: name 'prnt' is not defined"];
  const E3 = ['Traceback (most recent call last):', '  File "main.py", line 3, in <module>', '    print("Age: " + 7)', 'TypeError: can only concatenate str', '(not "int") to str'];
  return [
    stBeat('dot', 'I pressed Run and got a scary message. Did I break something?', stScene(cast, err(E1)), ['err', 'cast:dot']),
    stBeat('hoot', 'Nothing is broken. An error is the computer telling you where it got stuck. It is help.', stScene(cast, err(E1)), ['err']),
    stBeat('hoot', 'Read the last line first. It names the kind of mistake and says what is wrong.', stScene(cast, err(E1, [2])), ['err']),
    stBeat('hoot', 'A line above it gives the line number. This site also adds "(line 1)" at the end of the message.', stScene(cast, err(E1, [0]), code([0])), ['err', 'code'], 0),
    stBeat('dot', 'What does SyntaxError mean?', stScene(cast, err(E1, [2]), code([0])), ['code', 'cast:dot'], 0),
    stBeat('hoot', 'The line is not written right. "Unterminated string literal" means the text has no closing quote.', stScene(cast, err(E1, [2]), code([0])), ['err', 'code'], 0),
    stBeat('hoot', 'A longer message like this is called a traceback. NameError means Python does not know a name. prnt is a typo for print.', stScene(cast, err(E2, [0, 3]), code([1])), ['err', 'code'], 1),
    stBeat('hoot', 'TypeError means a value of the wrong kind was used, like adding text to a number.', stScene(cast, err(E3, [3, 4]), code([2])), ['err', 'code'], 2),
    stBeat('dot', 'Kind, then line, then look closely. I can read these now!', stScene(cast, err(E3, [1, 3, 4]), code([2])), ['cast:dot'], 2)
  ];
}
START_LESSON('first-error', {
  code: ST4_CODE, story: st4Story(),
  watch: { code: 'print("Ready")\nprint("Steady")\nprnt("Go")\nprint("This line never runs")\n', error: true },
  tryit: { py: 'print("Hello")\nprnt("Maria")\n', js: 'console.log("Hello");\nconsol.log("Maria");\n', errors: true,
    goals: ['Press Run and read the message from the bottom up.', 'Fix the typo on line 2 and run it again.', 'Now remove a quote on purpose and read the new message.'] },
  check: { q: 'Where should you start reading an error message?',
    choices: [['At the top, where it says Traceback', false, 'The top is the start of the report. The useful part is at the end.'],
      ['At the last line, which names the kind of mistake', true, 'Right. Then look for the line number, and go to that line.'],
      ['Nowhere. Delete the code and start again', false, 'The message is there to help. It usually points right at the problem.'],
      ['At the first line of your program', false, 'The message tells you which line to look at. It is often not the first.']] }
});

// ---------- L5. Variables are labelled boxes ----------
const ST5_CODE = {
  py: ['acorns = 12', 'print(acorns)', 'acorns = acorns + 5', 'print(acorns)'],
  js: ['let acorns = 12;', 'console.log(acorns);', 'acorns = acorns + 5;', 'console.log(acorns);']
};
function st5Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const card = (cur) => st1Card('card', 40, 130, 300, ST5_CODE.py, cur);
  const box = (v, o) => ({ boxes: [stVar('box', 'acorns', v, 400, 150, Object.assign({ w: 160 }, o || {}))] });
  const screen = (lines) => st1Screen(380, 250, 220, lines, 100);
  return [
    stBeat('penny', 'I count my acorns, then forget the number before I need it again.', stScene(cast, { tokens: [{ id: 'twelve', x: 320, y: 200, text: '12', solid: true }] }), ['twelve', 'cast:penny']),
    stBeat('hoot', 'Give the number a box with a name tag. That box is called a variable. acorns = 12 puts 12 in the variable acorns.', stScene(cast, card([0]), box('12')), ['box'], 0),
    stBeat('dot', 'Does = mean "is equal" here, like in maths?', stScene(cast, card([0]), box('12')), ['box', 'card'], 0),
    stBeat('hoot', 'No. In Python, = means: put this value in that box.', stScene(cast, card([0]), box('12')), ['box', 'card'], 0),
    stBeat('hoot', 'print(acorns) looks in the box and shows 12. No quotes, so acorns is a name, not text.', stScene(cast, card([1]), box('12'), screen(['12'])), ['box', 'screen'], 1),
    stBeat('penny', 'I just found 5 more acorns!', stScene(cast, card([1]), box('12'), screen(['12']), { tokens: [{ id: 'more', x: 596, y: 182, text: '+ 5', c: 'c' }] }), ['more', 'cast:penny']),
    stBeat('hoot', 'acorns = acorns + 5 works out the right side first: 12 + 5 is 17. Then 17 goes in the box.', stScene(cast, card([2]), box('17'), screen(['12'])), ['box', 'card'], 2),
    stBeat('hoot', 'The old 12 is gone. A box holds one value at a time.', stScene(cast, card([3]), box('17'), screen(['12', '17'])), ['box', 'screen'], 3),
    stBeat('dot', 'And a name needs a value before I use it. Otherwise Python says NameError.', stScene(cast, card([0, 1, 2, 3]), box('17'), screen(['12', '17'])), ['cast:dot'])
  ];
}
START_LESSON('variables', {
  code: ST5_CODE, story: st5Story(),
  watch: { code: 'acorns = 12\nprint(acorns)\nacorns = acorns + 5\nprint(acorns)\nfriends = 3\neach = acorns // friends\nprint(each)\n' },
  tryit: { py: 'price = 4\nhow_many = 3\ntotal = price * how_many\nprint(total)\n', js: 'let price = 4;\nlet howMany = 3;\nlet total = price * howMany;\nconsole.log(total);\n',
    goals: ['Press Run. Then press Watch my code run to see the three boxes fill.', 'Change how many you buy to 10.', 'Add a discount box and take it away from the total.'] },
  check: { q: { py: 'x = 5, then x = x * 2. What is in the box x now?', js: 'let x = 5, then x = x * 2. What is in the box x now?' },
    choices: [['5', false, 'The second line puts a new value in the box. The old 5 is replaced.'],
      ['x * 2', false, 'The right side is worked out first, so the box gets a number, not the words.'],
      ['10', true, 'Right. 5 * 2 is 10, and 10 replaces the 5.'],
      ['5 and 10', false, 'A box holds one value at a time.']] }
});

// ---------- L6. Kinds of values ----------
const ST6_CODE = {
  py: ['print(type(5))', 'print(type(2.5))', 'print(type("5"))', 'print(type(True))'],
  js: ['console.log(typeof 5);', 'console.log(typeof 2.5);', 'console.log(typeof "5");', 'console.log(typeof true);']
};
function st6Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const kinds = (focus) => ({ boxes: [['k1', '5', 'int'], ['k2', '2.5', 'float'], ['k3', '"5"', 'str'], ['k4', 'True', 'bool']].map(([id, v, ty], i) => ({ id, x: 50 + i * 140, y: 170, w: 120, h: 64, text: v, sub: ty, subMono: true, c: focus && focus.includes(id) ? 'a' : 'l' })) });
  const sum = (a, b, r, bad) => ({ tokens: [{ id: 'sa', x: 150, y: 200, text: a }, { id: 'sb', x: 300, y: 200, text: b }, { id: 'sr', x: 490, y: 200, text: r, solid: !bad, c: bad ? 'bad' : 'l' }],
    labels: [{ id: 'plus', x: 225, y: 207, text: '+', size: 22, weight: 700 }, { id: 'eq', x: 385, y: 207, text: '→', size: 22, weight: 700 }] });
  return [
    stBeat('bolt', 'Two prices are text: "5" and "3". Adding them gives "53".', stScene(cast, sum('"5"', '"3"', '"53"')), ['sr', 'cast:bolt']),
    stBeat('hoot', 'The computer joined two pieces of text. In quotes, "5" is text, not a number.', stScene(cast, sum('"5"', '"3"', '"53"')), ['sa', 'sb']),
    stBeat('hoot', 'Every value has a type. 5 is a whole number, an int. 2.5 is a decimal, a float.', stScene(cast, kinds(['k1', 'k2'])), ['k1', 'k2']),
    stBeat('hoot', 'Text in quotes is a str, short for string. True and False have a type of their own: bool.', stScene(cast, kinds(['k3', 'k4'])), ['k3', 'k4']),
    stBeat('hoot', "type(5) runs first and finds the type. print then shows it: <class 'int'>. The type is int.", stScene(cast, st1Card('card', 120, 120, 400, ST6_CODE.py, [0]), st1Screen(120, 258, 400, ["<class 'int'>"], 88)), ['card', 'screen'], 0),
    stBeat('dot', 'So what is "5" + 3? Text plus a number?', stScene(cast, sum('"5"', '3', '?')), ['sa', 'sb', 'cast:dot']),
    stBeat('hoot', 'Python stops with a TypeError. It will not guess whether you meant 8 or "53".', stScene(cast, sum('"5"', '3', 'TypeError', true)), ['sr']),
    stBeat('hoot', 'Convert first. int("5") gives the number 5, and str(5) gives the text "5".', stScene(cast, { tokens: [{ id: 'c1', x: 170, y: 180, text: 'int("5")' }, { id: 'c1r', x: 450, y: 180, text: '5', solid: true }, { id: 'c2', x: 170, y: 270, text: 'str(5)' }, { id: 'c2r', x: 450, y: 270, text: '"5"', solid: true }] },
      { arrows: [{ id: 'ca1', from: [250, 180], to: [420, 180], c: 'a' }, { id: 'ca2', from: [240, 270], to: [410, 270], c: 'a' }] }), ['c1', 'c1r', 'c2', 'c2r']),
    stBeat('dot', 'int("5") + 3 is 8, and "5" + str(3) is "53". Same values, different types!', stScene(cast, sum('int("5")', '3', '8')), ['sr', 'cast:dot'])
  ];
}
START_LESSON('types', {
  code: ST6_CODE, story: st6Story(),
  watch: { code: 'price = "5"\nmore = 3\ntotal = int(price) + more\nprint(total)\nlabel = price + str(more)\nprint(label)\n' },
  tryit: { py: 'print(type(7))\nprint(type("7"))\nprint(int("7") + 1)\nprint("7" + "1")\n', js: 'console.log(typeof 7);\nconsole.log(typeof "7");\nconsole.log(Number("7") + 1);\nconsole.log("7" + "1");\n', differs: true,
    goals: ['Press Run and compare the last two lines.', 'Try type(7.5) and type(False) too.', 'Turn "12" into a number and double it.'] },
  check: { q: 'What type is "True", written with quotes?',
    choices: [['True or False (a bool)', false, 'The quotes make it text, even though the word inside is True.'],
      ['Text (a string)', true, 'Right. Anything in quotes is text.'],
      ['A whole number', false, 'There is no number here, just the word True in quotes.'],
      ['It is an error', false, 'Text can hold any words, including True.']] }
});
