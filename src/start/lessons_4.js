// Level 1, chapter 4 (lessons 20 to 24): reusing and organising. Every word is our own.

// ---------- L20. Functions are recipes ----------
const ST20_CODE = {
  py: ['def feed(owlet):', '    print("Feeding", owlet)', '    print(owlet, "is full")', 'feed("Fluff")', 'feed("Tuft")'],
  js: ['function feed(owlet) {', '  console.log("Feeding", owlet);', '  console.log(owlet, "is full"); }', 'feed("Fluff");', 'feed("Tuft");']
};
function st20Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const card = (cur) => st1Card('card', 30, 124, 360, ST20_CODE.py, cur);
  const stack = (frames, owlet) => stScene(stPlates(frames, 420, 340, { w: 190 }), owlet ? { boxes: [stVar('owlet', 'owlet', owlet, 440, 130, { w: 150 })] } : null);
  return [
    stBeat('hoot', 'Every evening I feed my owlets. The same two steps, owlet after owlet.', stScene(cast, { tokens: [{ id: 'o1', x: 220, y: 200, text: 'Fluff' }, { id: 'o2', x: 420, y: 200, text: 'Tuft' }] }), ['o1', 'o2']),
    stBeat('dot', 'So you write the same lines again for every owlet?', stScene(cast, { cards: [{ id: 'rep', x: 120, y: 130, w: 400, lines: ['print("Feeding", "Fluff")', 'print("Fluff", "is full")', 'print("Feeding", "Tuft")', 'print("Tuft", "is full")'], cur: [] }] }), ['rep', 'cast:dot']),
    stBeat('hoot', 'No. I write the steps once and give them a name. def feed(owlet): starts a recipe called feed.', stScene(cast, card([0, 1, 2])), ['card'], [0, 1, 2]),
    stBeat('hoot', 'owlet is a parameter: an empty box that is filled each time the recipe is used.', stScene(cast, card([0]), stack(['main program'])), ['card'], 0),
    stBeat('hoot', 'feed("Fluff") calls the recipe. A new plate goes on the stack, and owlet holds "Fluff".', stScene(cast, card([3]), stack(['main program', 'feed()'], '"Fluff"')), ['plate1', 'owlet'], 3),
    stBeat('dot', 'When the steps are done, its plate comes off. Then feed("Tuft") runs them again with "Tuft".', stScene(cast, card([4]), stack(['main program', 'feed()'], '"Tuft"')), ['owlet', 'card'], 4),
    stBeat('hoot', 'Define before you call. Python reads from the top, so the def must come before feed(...).', stScene(cast, card([0, 3])), ['card'], [0, 3]),
    stBeat('dot', 'Write it once, call it as often as I like. That is a function!', stScene(cast, card([0, 1, 2, 3, 4]), stack(['main program'])), ['cast:dot'], [3, 4])
  ];
}
START_LESSON('functions', {
  code: ST20_CODE, story: st20Story(),
  watch: { code: 'def feed(owlet):\n    print("Feeding", owlet)\n    print(owlet, "is full")\n\nfeed("Fluff")\nfeed("Tuft")\n' },
  tryit: { py: 'def feed(owlet):\n    print("Feeding", owlet)\n    print(owlet, "is full")\n\nfeed("Fluff")\nfeed("Tuft")\n', js: 'function feed(owlet) {\n  console.log("Feeding", owlet);\n  console.log(owlet, "is full");\n}\n\nfeed("Fluff");\nfeed("Tuft");\n',
    goals: ['Press Run.', 'Feed a third owlet called Wisp.', 'Give feed a second parameter, food, and print what each owlet eats.'] },
  check: { q: 'What is a parameter?',
    choices: [['The name of the function', false, 'The name comes right after def. Parameters go inside the brackets.'], ['A box the function fills with the value you pass in when you call it', true, 'Right. Each call can pass a different value.'], ['A line that runs first', false, 'Parameters are not lines of code.'], ['An error message', false, 'Parameters are how a function gets its ingredients.']] }
});

// ---------- L21. return versus print ----------
const ST21_CODE = {
  py: ['def area(w, h):', '    return w * h', 'size = area(3, 4)', 'print(size + 1)'],
  js: ['function area(w, h) {', '  return w * h; }', 'let size = area(3, 4);', 'console.log(size + 1);']
};
function st21Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const card = (cur) => st1Card('card', 30, 124, 330, ST21_CODE.py, cur);
  return [
    stBeat('dot', 'I asked Bolt for the area of a 3 by 4 rug, and it shouted 12. But I needed the number back!', stScene(cast, { tokens: [{ id: 'shout', x: 320, y: 200, text: 'print: 12 !', c: 'c' }] }), ['shout', 'cast:dot']),
    stBeat('hoot', 'print only shouts a value at the screen. The program around it never gets to keep it.', stScene(cast, { tokens: [{ id: 'shout', x: 220, y: 190, text: 'print(w * h)' }, { id: 'screen', x: 460, y: 190, text: 'screen', c: 'm' }] }, { arrows: [{ id: 'a', from: [300, 190], to: [410, 190], c: 'm' }] }), ['shout', 'a']),
    stBeat('hoot', 'return hands the value back, like a parcel, to the line that called the function.', stScene(cast, card([1]), { boxes: [stVar('parcel', 'returns', '12', 420, 150, { w: 160, tc: 'c' })] }), ['parcel'], 1),
    stBeat('bolt', 'size = area(3, 4). Parcel received: 12. Stored in size.', stScene(cast, card([2]), { boxes: [stVar('size', 'size', '12', 420, 150, { w: 160 })] }), ['size', 'cast:bolt'], 2),
    stBeat('hoot', 'Now the program can use it: size + 1 is 13. A shouted value could never be used like that.', stScene(cast, card([3]), { boxes: [stVar('size', 'size', '12', 420, 150, { w: 160 })] }, st1Screen(400, 250, 200, ['13'], 88)), ['screen'], 3),
    stBeat('dot', 'What does a function give back if it only prints?', stScene(cast, { tokens: [{ id: 'none', x: 320, y: 210, text: 'x = shout()  →  None' }] }), ['none', 'cast:dot']),
    stBeat('hoot', 'Nothing: None in Python, undefined in JavaScript. That is the usual reason a test says "got nothing".', stScene(cast, { tokens: [{ id: 'none', x: 320, y: 210, text: 'None', c: 'c' }] }), ['none']),
    stBeat('dot', 'print to show a person, return to hand a value to the program. Tests check the return!', stScene(cast, card([1, 2, 3])), ['cast:dot'], [1, 2, 3])
  ];
}
START_LESSON('return-print', {
  code: ST21_CODE, story: st21Story(),
  watch: { code: 'def area(w, h):\n    return w * h\n\nsize = area(3, 4)\nprint(size + 1)\n' },
  tryit: { py: 'def area(w, h):\n    return w * h\n\nsize = area(3, 4)\nprint(size + 1)\nprint(area(10, 2))\n', js: 'function area(w, h) {\n  return w * h;\n}\n\nlet size = area(3, 4);\nconsole.log(size + 1);\nconsole.log(area(10, 2));\n',
    goals: ['Press Run.', 'Change return to print inside area and run it. What breaks?', 'Write a function perimeter(w, h) that returns 2 * (w + h).'] },
  check: { q: 'What is the difference between return and print?',
    choices: [['They do the same thing', false, 'One shows a value on the screen, the other hands it back to the program.'], ['return hands a value back to the caller; print only shows it', true, 'Right. Code that calls a function can only use what it returns.'], ['print hands a value back; return shows it', false, 'The other way round.'], ['return stops the whole program', false, 'return only ends the function it is in.']] },
  first: ['running-sum-of-1d-array', 'find-the-highest-altitude', 'fizz-buzz', 'length-of-last-word', 'number-of-good-pairs', 'missing-number']
});

// ---------- L22. Dictionaries are coat checks ----------
const ST22_CODE = {
  py: ['counts = {}', 'counts["oak"] = 4', 'counts["pine"] = 2', 'print(counts["oak"])', 'print(counts.get("elm", 0))'],
  js: ['let counts = {};', 'counts["oak"] = 4;', 'counts["pine"] = 2;', 'console.log(counts["oak"]);', 'console.log(counts["elm"] ?? 0);']
};
function st22Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const pairs = (rows, lit) => ({ boxes: [].concat(...rows.map(([k, v], i) => [{ id: 'k' + i, x: 120, y: 130 + i * 70, w: 150, h: 56, text: '"' + k + '"', size: 18, solid: lit === i }, { id: 'v' + i, x: 360, y: 130 + i * 70, w: 120, h: 56, text: String(v), size: 18, solid: lit === i }])),
    arrows: rows.map((r, i) => ({ id: 'a' + i, from: [276, 158 + i * 70], to: [354, 158 + i * 70], c: 'm' })) });
  return [
    stBeat('penny', 'I count acorns per tree: oak, pine, elm. A list of numbers would not say which tree is which.', stScene(cast, { tokens: [{ id: 't1', x: 200, y: 210, text: 'oak' }, { id: 't2', x: 320, y: 210, text: 'pine' }, { id: 't3', x: 440, y: 210, text: 'elm' }] }), ['cast:penny']),
    stBeat('hoot', 'Use a dictionary, like a coat check. Hand in a key, and get its value back.', stScene(cast, pairs([['oak', 4], ['pine', 2]])), ['k0', 'v0', 'k1', 'v1']),
    stBeat('hoot', 'counts["oak"] = 4 stores 4 under the key "oak". Keys are the tickets.', stScene(cast, pairs([['oak', 4]], 0)), ['k0', 'v0'], 1),
    stBeat('penny', 'counts["oak"] finds 4 straight away. No need to search every tree.', stScene(cast, pairs([['oak', 4], ['pine', 2]], 0)), ['v0'], 3),
    stBeat('dot', 'What about counts["elm"]? I never added elm.', stScene(cast, pairs([['oak', 4], ['pine', 2]]), { tokens: [{ id: 'bad', x: 320, y: 320, text: 'counts["elm"] → KeyError', c: 'bad' }] }), ['bad', 'cast:dot']),
    stBeat('hoot', 'A missing key is a KeyError. Ask safely with .get("elm", 0), which gives 0 if elm is not there.', stScene(cast, pairs([['oak', 4], ['pine', 2]]), { tokens: [{ id: 'safe', x: 320, y: 320, text: 'counts.get("elm", 0) → 0', solid: true }] }), ['safe'], 4),
    stBeat('penny', 'To count, add 1 to whatever is there: counts[t] = counts.get(t, 0) + 1.', stScene(cast, pairs([['oak', 5], ['pine', 2], ['elm', 1]], 2)), ['k2', 'v2']),
    stBeat('dot', 'Key in, value out, and get() when the key might be missing!', stScene(cast, pairs([['oak', 5], ['pine', 2], ['elm', 1]])), ['cast:dot'])
  ];
}
START_LESSON('dicts', {
  code: ST22_CODE, story: st22Story(),
  watch: { code: 'counts = {}\nfor tree in ["oak", "pine", "oak"]:\n    counts[tree] = counts.get(tree, 0) + 1\nprint(counts)\n' },
  tryit: { py: 'counts = {}\nfor letter in "banana":\n    counts[letter] = counts.get(letter, 0) + 1\nprint(counts)\nprint(counts["a"])\n', js: 'let counts = {};\nfor (const letter of "banana") {\n  counts[letter] = (counts[letter] ?? 0) + 1;\n}\nconsole.log(counts);\nconsole.log(counts["a"]);\n', differs: true,
    goals: ['Press Run.', 'Count the letters of your own name.', 'Print how many times b appears.'] },
  check: { q: 'What happens when you read a key that is not in the dictionary with [ ]?',
    choices: [['You get 0', false, 'Only .get(key, 0) gives 0 for a missing key.'], ['Python stops with a KeyError', true, 'Right. Use .get() when the key might be missing.'], ['It adds the key', false, 'Reading does not add anything.'], ['You get the last value', false, 'There is no "last value" to fall back on.']] },
  first: ['two-sum', 'contains-duplicate', 'valid-anagram', 'first-unique-character-in-a-string', 'ransom-note', 'majority-element']
});

// ---------- L23. Your debugging toolkit ----------
const ST23_CODE = {
  py: ['total = 0', 'for i in range(1, 5):', '    total = total + i', '    print("i:", i, "total:", total)', 'print(total)'],
  js: ['let total = 0;', 'for (let i = 1; i < 5; i++) {', '  total = total + i;', '  console.log("i:", i, "total:", total); }', 'console.log(total);']
};
function st23Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const qs = (lit) => ({ tokens: ['1. What did I expect?', '2. What happened?', '3. Where did they split?'].map((t, i) => ({ id: 'q' + i, x: 320, y: 150 + i * 56, text: t, w: 360, mono: false, solid: lit === i })) });
  const card = (cur) => st1Card('card', 40, 124, 560, ST23_CODE.py, cur);
  return [
    stBeat('dot', 'My program should add 1 to 5 and print 15. It prints 10. I have stared at it for ages.', stScene(cast, card([])), ['cast:dot']),
    stBeat('hoot', 'Do not stare. Ask three questions, one at a time.', stScene(cast, qs(null)), ['q0', 'q1', 'q2']),
    stBeat('hoot', 'What did you expect? 15. What happened? 10. Write both down, so the gap is clear.', stScene(cast, qs(1)), ['q0', 'q1']),
    stBeat('hoot', 'Where did they split? Look inside: a print in the loop shows each lap.', stScene(cast, card([3])), ['card'], 3),
    stBeat('dot', 'It prints i: 1, 2, 3, 4. It never reaches 5! range(1, 5) stops before 5.', stScene(cast, card([1]), { tokens: [{ id: 'lap', x: 320, y: 300, text: 'i: 4  total: 10' }] }), ['lap'], 1),
    stBeat('hoot', 'Change one thing, then run it again: range(1, 6). One change at a time, so you know what fixed it.', stScene(cast, card([1])), ['card'], 1),
    stBeat('hoot', 'If it is still unclear, shrink the example: try range(1, 2) and check one lap by hand.', stScene(cast, qs(2)), ['q2']),
    stBeat('dot', 'Expect, observe, find the split, change one thing. Then take the debug print out.', stScene(cast, qs(null)), ['cast:dot'])
  ];
}
START_LESSON('debugging', {
  code: ST23_CODE, story: st23Story(),
  watch: { code: 'total = 0\nfor i in range(1, 5):\n    total = total + i\n    print("i:", i, "total:", total)\nprint(total)\n' },
  tryit: { py: 'total = 0\nfor i in range(1, 5):\n    total = total + i\n    print("i:", i, "total:", total)\nprint(total)\n', js: 'let total = 0;\nfor (let i = 1; i < 5; i++) {\n  total = total + i;\n  console.log("i:", i, "total:", total);\n}\nconsole.log(total);\n',
    goals: ['Press Run and read the debug prints.', 'Fix it so it adds 1 to 5 and prints 15.', 'Remove the debug print once it works.'] },
  check: { q: 'Your fix did not work. What should you change next?',
    choices: [['Everything at once, to be sure', false, 'Then you cannot tell which change mattered.'], ['One thing, then run it again', true, 'Right. One change at a time shows you what fixed it.'], ['Nothing, run it again until it works', false, 'The same code gives the same result.'], ['Delete the program', false, 'The bug is usually small. Find the split instead.']] }
});

// ---------- L24. Project: guess the number ----------
const ST24_CODE = {
  py: ['secret = 7', 'guess = 0', 'while guess != secret:', '    guess = int(input("Guess? "))', '    if guess < secret:', '        print("Higher")', '    elif guess > secret:', '        print("Lower")', 'print("You got it!")'],
  js: ['let secret = 7;', 'let guess = 0;', 'while (guess !== secret) {', '  guess = Number(prompt("Guess? "));', '  if (guess < secret) {', '    console.log("Higher");', '  } else if (guess > secret) {', '    console.log("Lower"); } }', 'console.log("You got it!");']
};
function st24Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const line = (lo, hi, g) => ({ tokens: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, i) => ({ id: 'n' + n, x: 74 + i * 54, y: 200, text: String(n), w: 46, solid: n === g, dash: n < lo || n > hi })) });
  return [
    stBeat('hoot', 'I am thinking of a number from 1 to 10. Guess, and I will say higher or lower.', stScene(cast, line(1, 10)), ['cast:hoot']),
    stBeat('dot', 'Is it 5?', stScene(cast, line(1, 10, 5)), ['n5', 'cast:dot']),
    stBeat('hoot', 'Higher. So 1 to 5 are out. Each answer cuts the choices down.', stScene(cast, line(6, 10, 5)), ['n6', 'n7', 'n8', 'n9', 'n10']),
    stBeat('dot', 'Is it 8? Lower. Then 7? Got it, in three guesses!', stScene(cast, line(7, 7, 7)), ['n7']),
    stBeat('hoot', 'The game is a while loop: keep asking while the guess is not the secret.', stScene(cast, st1Card('card', 30, 124, 580, ST24_CODE.py.slice(2, 6), [0])), ['card'], 2),
    stBeat('hoot', 'Inside the loop: read a guess, then use if and elif to answer higher or lower.', stScene(cast, st1Card('card', 30, 124, 580, ST24_CODE.py.slice(2, 8), [1, 2, 4])), ['card'], [3, 4, 6]),
    stBeat('dot', 'And when the loop ends, the guess must be right, so I print You got it!', stScene(cast, line(7, 7, 7)), ['n7', 'cast:dot'])
  ];
}
START_LESSON('guess-project', {
  code: ST24_CODE, story: st24Story(),
  watch: { code: ST24_CODE.py.join('\n') + '\n', stdin: ['5', '8', '7'] },
  tryit: { py: ST24_CODE.py.join('\n') + '\n', js: 'let secret = 7;\nlet guess = 0;\nwhile (guess !== secret) {\n  guess = Number(prompt("Guess? "));\n  if (guess < secret) {\n    console.log("Higher");\n  } else if (guess > secret) {\n    console.log("Lower");\n  }\n}\nconsole.log("You got it!");\n',
    stdin: ['5', '8', '7'], goals: ['Press Run. The guesses come from the Input box.', 'Change the secret and the guesses.', 'Count the tries and print "You got it in 3 tries".'] },
  check: { q: 'Why is the game a while loop and not a for loop?',
    choices: [['You do not know how many guesses it will take', true, 'Right. It repeats until the guess is right, however long that takes.'], ['for loops cannot use input', false, 'They can. The point is that the number of laps is unknown.'], ['while is faster', false, 'Speed is not the reason.'], ['It has to run exactly 10 times', false, 'It stops as soon as the guess is right.']] }
});
