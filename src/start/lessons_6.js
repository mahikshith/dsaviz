// Level 2, lessons 1 to 5: calls, the call stack, scope, defaults and keyword arguments, any number of inputs.
// The canteen worker runs the canteen, where every order gets a plate: the call stack. Every word is our own.

// The pile of plates for the Level 2 stories: frames bottom first, the running one on top, with optional notes on a plate.
function st2Plates(frames, o) {
  const x = (o && o.x) || 400, w = (o && o.w) || 210, base = (o && o.y) || 340, h = (o && o.h) || 44, gap = (o && o.gap) || 8;
  return { boxes: frames.map((f, i) => ({ id: 'plate' + i, x, y: base - (i + 1) * (h + gap), w, h, rx: 22, text: f, size: 16, solid: i === frames.length - 1 && !(o && o.none) })) };
}

// ---------- L2.1 Calling a function ----------
const ST201_CODE = {
  py: ['def snack(coins):', '    if coins >= 2:', '        return "crisps"', '    return "nothing"', 'got = snack(3)', 'print(got)'],
  js: ['function snack(coins) {', '  if (coins >= 2) {', '    return "crisps"; }', '  return "nothing"; }', 'let got = snack(3);', 'console.log(got);']
};
function st201Story() {
  const cast = st1Cast([['hoot', 60], ['pip', 220], ['bolt', 420], ['dot', 580]]);
  const machine = (inside, lit) => ({ boxes: [{ id: 'machine', x: 230, y: 150, w: 180, h: 120, text: '', tag: 'snack( )', c: lit ? 'a' : 'l', sub: 'The snack machine' }].concat(inside ? [stVar('coins', 'coins', inside, 255, 180, { w: 130 })] : []) });
  const card = (cur) => st1Card('card', 30, 124, 340, ST201_CODE.py.slice(0, 4), cur);
  return [
    stBeat('pip', 'Welcome to my canteen. Today the snack machine is the computer: coins go in, one snack comes out.', stScene(cast, machine()), ['machine', 'cast:bolt']),
    stBeat('hoot', 'A function works the same way. snack(coins) takes coins in and hands one value back out.', stScene(cast, card([0, 1, 2, 3])), ['card'], [0, 1, 2, 3]),
    stBeat('dot', 'I call it with snack(3). Where does the 3 go?', stScene(cast, machine(), { tokens: [{ id: 'three', x: 120, y: 210, text: '3', w: 60, solid: true }] }), ['three', 'machine'], 4),
    stBeat('hoot', 'Into the parameter box. coins is the name inside the machine. From outside, you only hand over a value.', stScene(cast, machine('3')), ['coins'], 0),
    stBeat('bolt', 'coins >= 2 is True. Returning "crisps".', stScene(cast, machine('3', true), { tokens: [{ id: 'snack', x: 320, y: 320, text: '"crisps"', solid: true }] }), ['snack'], [1, 2]),
    stBeat('hoot', 'The value travels back to the spot of the call. snack(3) becomes "crisps", and got keeps it.', stScene(cast, { boxes: [stVar('got', 'got', '"crisps"', 230, 170, { w: 180 })] }, { tokens: [{ id: 'call', x: 320, y: 300, text: 'got = snack(3)', w: 230 }] }), ['got'], 4),
    stBeat('dot', 'Do the names have to match? What if my box is called money?', stScene(cast, { boxes: [stVar('money', 'money', '3', 80, 170, { w: 130 }), stVar('coins', 'coins', '3', 430, 170, { w: 130 })], arrows: [{ id: 'pass', from: [214, 202], to: [424, 202], c: 'a', label: 'snack(money)' }] }), ['money', 'coins', 'pass']),
    stBeat('hoot', 'They never need to match. A call passes values, not names. snack(money) still fills coins with 3.', stScene(cast, { boxes: [stVar('money', 'money', '3', 80, 170, { w: 130 }), stVar('coins', 'coins', '3', 430, 170, { w: 130 })], arrows: [{ id: 'pass', from: [214, 202], to: [424, 202], c: 'a', label: 'the value 3' }] }), ['pass']),
    stBeat('dot', 'Values go in, one value comes back to where I called. That is a call!', stScene(cast, card([0, 1, 2, 3])), ['cast:dot'], [4, 5])
  ];
}
START_LESSON('calls', {
  code: ST201_CODE, story: st201Story(),
  watch: { code: 'def snack(coins):\n    if coins >= 2:\n        return "crisps"\n    return "nothing"\n\nmoney = 3\ngot = snack(money)\nprint(got)\nprint(snack(1))\n' },
  tryit: { py: 'def snack(coins):\n    if coins >= 2:\n        return "crisps"\n    return "nothing"\n\nmoney = 3\ngot = snack(money)\nprint(got)\nprint(snack(1))\n',
    js: 'function snack(coins) {\n  if (coins >= 2) {\n    return "crisps";\n  }\n  return "nothing";\n}\n\nlet money = 3;\nlet got = snack(money);\nconsole.log(got);\nconsole.log(snack(1));\n',
    goals: ['Press Run.', 'Add a rule: 5 coins or more gives "a sandwich". Where must that if go?', 'Call snack with three different amounts and print each answer.'] },
  check: { q: 'money = 3, then snack(money). What does the function receive?',
    choices: [['The value 3, in its own box called coins', true, 'Right. The call hands over the value. Inside, the box has the parameter’s name.'], ['The name money', false, 'Names stay where they are. Only the value travels into the call.'], ['Nothing until it returns', false, 'The value goes in at the call, before the body runs.'], ['A copy of the whole program', false, 'Only the values in the brackets go in.']] }
});

// ---------- L2.2 The call stack ----------
const ST202_CODE = {
  py: ['def boil():', '    return "hot water"', 'def make_tea():', '    w = boil()', '    return w + " and leaves"', 'print(make_tea())'],
  js: ['function boil() {', '  return "hot water"; }', 'function makeTea() {', '  let w = boil();', '  return w + " and leaves"; }', 'console.log(makeTea());']
};
function st202Story() {
  const cast = st1Cast([['pip', 60], ['hoot', 320], ['dot', 580]]);
  const card = (cur) => st1Card('card', 20, 124, 350, ST202_CODE.py, cur);
  const pile = (frames, extra) => stScene(cast, st2Plates(frames, { x: 400, w: 220 }), extra);
  return [
    stBeat('pip', 'Every order in my canteen gets a plate. Plates pile up, and I always serve the top one first.', pile(['order 1', 'order 2', 'order 3']), ['plate2', 'cast:pip']),
    stBeat('hoot', 'Python keeps calls the same way, on the call stack. The program starts on the bottom plate.', stScene(pile(['main program']), card([5])), ['plate0'], 5),
    stBeat('dot', 'print(make_tea()) needs the tea first. Does a plate go on for make_tea?', stScene(pile(['main program', 'make_tea()']), card([5])), ['plate1'], 5),
    stBeat('hoot', 'Yes. make_tea() runs on its own plate on top. The main program waits underneath, mid-line.', stScene(pile(['main program', 'make_tea()']), card([3])), ['plate0', 'plate1'], 3),
    stBeat('pip', 'make_tea calls boil. Another plate goes on top: boil(). Now make_tea waits too.', stScene(pile(['main program', 'make_tea()', 'boil()']), card([0, 1])), ['plate2'], [0, 1]),
    stBeat('hoot', 'boil returns "hot water". Its plate comes off, and the value lands where boil was called.', stScene(pile(['main program', 'make_tea()'], { tokens: [{ id: 'water', x: 510, y: 140, text: '"hot water"', solid: true }] }), card([3])), ['water', 'plate1'], 3),
    stBeat('dot', 'And make_tea did not forget anything. It carries on from that same line, with w ready!', stScene(pile(['main program', 'make_tea()'], { boxes: [stVar('w', 'w', '"hot water"', 420, 110, { w: 190 })] }), card([4])), ['w'], 4),
    stBeat('pip', 'make_tea returns, its plate comes off, and the main program prints the tea.', stScene(pile(['main program']), card([5]), st1Screen(400, 130, 230, ['hot water and leaves'], 88)), ['screen', 'plate0'], 5),
    stBeat('dot', 'Last on, first off. The top plate is the one running, and the rest wait their turn.', pile(['main program', 'make_tea()', 'boil()'], null), ['cast:dot', 'plate2'])
  ];
}
START_LESSON('call-stack', {
  code: ST202_CODE, story: st202Story(),
  watch: { code: 'def boil():\n    return "hot water"\n\ndef make_tea():\n    w = boil()\n    return w + " and leaves"\n\nprint(make_tea())\n' },
  tryit: { py: 'def boil():\n    print("  boil starts")\n    return "hot water"\n\ndef make_tea():\n    print(" make_tea starts")\n    w = boil()\n    print(" make_tea carries on")\n    return w + " and leaves"\n\nprint("main starts")\nprint(make_tea())\n',
    js: 'function boil() {\n  console.log("  boil starts");\n  return "hot water";\n}\n\nfunction makeTea() {\n  console.log(" make_tea starts");\n  let w = boil();\n  console.log(" make_tea carries on");\n  return w + " and leaves";\n}\n\nconsole.log("main starts");\nconsole.log(makeTea());\n',
    goals: ['Press Run and read the order of the lines.', 'Add a function add_milk that make_tea calls after boil. Predict the order, then run.', 'Press Watch my code run and count the plates at the busiest moment.'] },
  check: { q: 'make_tea() calls boil(). While boil is running, what is make_tea doing?',
    choices: [['Waiting on its plate, ready to carry on from the same line', true, 'Right. Its plate stays on the stack with all its names, under boil’s plate.'], ['It has finished', false, 'It has not returned yet. It is waiting for boil.'], ['Running at the same time as boil', false, 'Only the top plate runs. The others wait.'], ['It starts again from the top later', false, 'It carries on from the line that called boil.']] }
});

// ---------- L2.3 Scope: which names can I see? ----------
const ST203_CODE = {
  py: ['sugar = 2', 'def bake():', '    flour = 3', '    print(sugar, flour)', 'bake()', 'print(flour)'],
  js: ['let sugar = 2;', 'function bake() {', '  let flour = 3;', '  console.log(sugar, flour); }', 'bake();', 'console.log(flour);']
};
function st203Story() {
  const cast = st1Cast([['hoot', 60], ['pip', 320], ['dot', 580]]);
  const card = (cur) => st1Card('card', 20, 124, 330, ST203_CODE.py, cur);
  const main = (more) => [{ id: 'main', x: 390, y: 270, w: 230, h: 76, rx: 18, text: '', tag: 'main program', c: 'l' }, stVar('sugar', 'sugar', '2', 410, 290, { w: 110, h: 44, size: 18 })].concat(more || []);
  const bakeP = (vars, gone) => [{ id: 'bakeP', x: 390, y: 150, w: 230, h: 96, rx: 18, text: '', tag: 'bake()', c: gone ? 'l' : 'a', dash: !!gone }].concat(vars || []);
  return [
    stBeat('hoot', 'Every plate on the stack has its own names written on it. Where a name can be seen is its scope.', stScene(cast, { boxes: main() }), ['main']),
    stBeat('dot', 'bake() makes flour = 3. Which plate does flour go on?', stScene(cast, card([2]), { boxes: main(bakeP([stVar('flour', 'flour', '3', 410, 178, { w: 110, h: 44, size: 18 })])) }), ['flour', 'bakeP'], 2),
    stBeat('hoot', 'On bake’s own plate. Inside bake you can also read sugar from the main program below.', stScene(cast, card([3]), { boxes: main(bakeP([stVar('flour', 'flour', '3', 410, 178, { w: 110, h: 44, size: 18 })])) }, { arrows: [{ id: 'look', from: [560, 246], to: [560, 286], c: 'a', label: 'reads sugar', lx: -50 }] }), ['look', 'sugar'], 3),
    stBeat('pip', 'When bake returns, its plate comes off the pile, and every name on it goes too.', stScene(cast, card([4]), { boxes: main(bakeP([], true)) }), ['bakeP'], 4),
    stBeat('dot', 'So print(flour) in the main program fails?', stScene(cast, card([5]), { boxes: main() }, { tokens: [{ id: 'err', x: 505, y: 200, text: 'NameError: flour', c: 'bad' }] }), ['err', 'cast:dot'], 5),
    stBeat('hoot', 'Yes. The main program never had a box called flour. It only lived on bake’s plate.', stScene(cast, { boxes: main() }, { tokens: [{ id: 'err', x: 320, y: 200, text: 'NameError: flour', c: 'bad' }] }), ['err', 'main']),
    stBeat('pip', 'Careful: if bake writes sugar = 9, that makes a new sugar on bake’s plate. The main sugar stays 2.', stScene(cast, { boxes: main(bakeP([stVar('s2', 'sugar', '9', 410, 178, { w: 110, h: 44, size: 18 })])) }), ['s2', 'sugar']),
    stBeat('hoot', 'To get a value out, return it. f = bake() catches it on the main program’s plate.', stScene(cast, { boxes: main([stVar('f', 'f', '3', 530, 290, { w: 80, h: 44, size: 18 })]) }, { tokens: [{ id: 'ret', x: 200, y: 220, text: 'return flour', solid: true }] }), ['ret', 'f']),
    stBeat('dot', 'Names live on their own plate. If I need one outside, I return it!', stScene(cast, { boxes: main() }), ['cast:dot'])
  ];
}
START_LESSON('scope', {
  code: ST203_CODE, story: st203Story(),
  watch: { code: 'sugar = 2\n\ndef bake():\n    flour = 3\n    print(sugar, flour)\n\nbake()\nprint(flour)\n', error: true },
  tryit: { py: 'sugar = 2\n\ndef bake():\n    flour = 3\n    print(sugar, flour)\n    return flour\n\nf = bake()\nprint("outside:", f)\n',
    js: 'let sugar = 2;\n\nfunction bake() {\n  let flour = 3;\n  console.log(sugar, flour);\n  return flour;\n}\n\nlet f = bake();\nconsole.log("outside:", f);\n',
    goals: ['Press Run.', 'Add print(flour) at the very end and read the error.', 'Inside bake, write sugar = 9 before the print. Does the sugar outside change?'] },
  check: { q: 'A function makes a variable inside it. Can the main program use it after the call?',
    choices: [['No. It lived on the function’s plate, which is gone. Return it instead', true, 'Right. Hand the value back with return and keep it in a name outside.'], ['Yes, every variable is visible everywhere', false, 'Names made inside a function only live while that call runs.'], ['Yes, but only if it has the same name', false, 'A name made inside is gone when the call ends, whatever it is called.'], ['Only if you print it first', false, 'Printing shows the value but does not keep it.']] }
});

// ---------- L2.4 Default and keyword arguments ----------
const ST204_CODE = {
  py: ['def tea(size, sugar=0):', '    print(size, "tea,", sugar, "sugar")', 'tea("big")', 'tea("small", 2)', 'tea(sugar=1, size="big")'],
  js: ['function tea(size, sugar = 0) {', '  console.log(size, "tea,", sugar, "sugar"); }', 'tea("big");', 'tea("small", 2);', 'tea("big", 1); // no names in JS calls']
};
function st204Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const boxes = (size, sugar, lit) => ({ boxes: [stVar('size', 'size', size, 150, 200, { w: 150, solid: lit === 'size' }), stVar('sugar', 'sugar', sugar, 360, 200, { w: 150, solid: lit === 'sugar' })] });
  const call = (t) => ({ tokens: [{ id: 'call', x: 320, y: 150, text: t, w: Math.max(200, stTokW(t, 18)) }] });
  return [
    stBeat('bolt', 'Order up. Most people want no sugar. Must every order still say sugar = 0?', stScene(cast, boxes('?', '?')), ['cast:bolt']),
    stBeat('hoot', 'Give the parameter a default: sugar=0 in the def line. If the call leaves it out, 0 is used.', stScene(cast, st1Card('card', 60, 130, 520, ST204_CODE.py.slice(0, 2), [0])), ['card'], 0),
    stBeat('dot', 'tea("big") fills size and leaves sugar to its default.', stScene(cast, call('tea("big")'), boxes('"big"', '0', 'sugar')), ['sugar', 'call'], 2),
    stBeat('hoot', 'tea("small", 2) fills the boxes in order: first size, then sugar. The 2 replaces the default.', stScene(cast, call('tea("small", 2)'), boxes('"small"', '2', 'sugar')), ['size', 'sugar'], 3),
    stBeat('dot', 'What if I mix up the order? tea(2, "small") would make a 2 tea with small sugar!', stScene(cast, call('tea(2, "small")'), { boxes: [stVar('size', 'size', '2', 150, 200, { w: 150, c: 'bad' }), stVar('sugar', 'sugar', '"small"', 360, 200, { w: 150, c: 'bad' })] }), ['size', 'sugar']),
    stBeat('hoot', 'So name them. A keyword argument says which box it fills: tea(sugar=1, size="big").', stScene(cast, call('tea(sugar=1, size="big")'), boxes('"big"', '1')), ['call', 'size', 'sugar'], 4),
    stBeat('bolt', 'With names, the order does not matter. I read the label on each value.', stScene(cast, call('tea(sugar=1, size="big")'), boxes('"big"', '1'), { arrows: [{ id: 'a1', from: [380, 168], to: [435, 196], c: 'a' }, { id: 'a2', from: [250, 168], to: [225, 196], c: 'a' }] }), ['a1', 'a2']),
    stBeat('hoot', 'One rule: parameters with defaults go after the ones without. JavaScript has defaults but no keyword names.', stScene(cast, st1Card('card', 60, 130, 520, [ST204_CODE.py[0], ST204_CODE.js[0]], [0, 1])), ['card'], 0),
    stBeat('dot', 'Defaults for the usual case, names when the order could get mixed up!', stScene(cast, boxes('"big"', '0')), ['cast:dot'])
  ];
}
START_LESSON('defaults', {
  code: ST204_CODE, story: st204Story(),
  watch: { code: 'def tea(size, sugar=0):\n    print(size, "tea,", sugar, "sugar")\n\ntea("big")\ntea("small", 2)\ntea(sugar=1, size="big")\n' },
  tryit: { py: 'def tea(size, sugar=0, milk=False):\n    print(size, "tea,", sugar, "sugar, milk:", milk)\n\ntea("big")\ntea("small", 2)\ntea(milk=True, size="big")\n',
    js: 'function tea(size, sugar = 0, milk = false) {\n  console.log(size, "tea,", sugar, "sugar, milk:", milk);\n}\n\ntea("big");\ntea("small", 2);\ntea("big", 0, true);\n', differs: true,
    goals: ['Press Run.', 'Order a small tea with 3 sugars and milk, using keyword names.', 'Give size a default of "medium" too. What happens to tea() with nothing in it?'] },
  check: { q: 'def tea(size, sugar=0). What does tea("big") use for sugar?',
    choices: [['0, the default', true, 'Right. A parameter with a default only needs a value when you want something else.'], ['Nothing: it is an error', false, 'sugar has a default, so leaving it out is fine.'], ['"big"', false, '"big" fills the first box, size.'], ['It asks you for one', false, 'Python never asks. It uses the default.']] }
});

// ---------- L2.5 Any number of inputs ----------
const ST205_CODE = {
  py: ['def total(*acorns):', '    s = 0', '    for a in acorns:', '        s = s + a', '    return s', 'print(total(3, 4, 5))'],
  js: ['function total(...acorns) {', '  let s = 0;', '  for (const a of acorns) {', '    s = s + a; }', '  return s; }', 'console.log(total(3, 4, 5));']
};
function st205Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const loose = (vals, y, pre) => ({ tokens: vals.map((v, i) => ({ id: (pre || 'n') + i, x: 140 + i * 90, y: y || 200, text: String(v), w: 60 })) });
  const bag = (vals, lit) => ({ boxes: [{ id: 'bag', x: 380, y: 160, w: 220, h: 80, text: '(' + vals.join(', ') + ')', size: 20, tag: 'acorns', solid: !!lit }] });
  return [
    stBeat('penny', 'Some days I count 2 trees, some days 5. Must I write a new total function for each?', stScene(cast, loose([3, 4], 170, 'a'), loose([3, 4, 5, 2, 6], 260, 'b')), ['cast:penny']),
    stBeat('hoot', 'Put a star in front of the parameter. *acorns gathers every value in the call into one group.', stScene(cast, st1Card('card', 60, 130, 520, ['def total(*acorns):'], [0])), ['card'], 0),
    stBeat('dot', 'So total(3, 4, 5) drops three loose values into one bag called acorns?', stScene(cast, loose([3, 4, 5]), bag([3, 4, 5]), { arrows: [{ id: 'in', from: [330, 200], to: [374, 200], c: 'a' }] }), ['bag', 'in'], 5),
    stBeat('hoot', 'Yes. Inside, acorns is a tuple: (3, 4, 5). Loop over it like a list.', stScene(cast, bag([3, 4, 5], true), st1Card('card', 30, 124, 330, ST205_CODE.py.slice(1, 5), [1, 2])), ['bag', 'card'], [2, 3]),
    stBeat('dot', 'Is acorns a magic word, like args in other code I have seen?', stScene(cast, { tokens: [{ id: 'w1', x: 200, y: 200, text: '*args' }, { id: 'w2', x: 320, y: 200, text: '*acorns' }, { id: 'w3', x: 450, y: 200, text: '*nums' }] }), ['cast:dot']),
    stBeat('hoot', 'No. The star does the gathering. *args is only a habit. Pick a name that says what is inside.', stScene(cast, { tokens: [{ id: 'star', x: 320, y: 200, text: '*', w: 70, solid: true }] }), ['star']),
    stBeat('penny', 'The star works the other way in a call: total(*bag) spreads my list out into loose values.', stScene(cast, bag([3, 4, 5]), { tokens: [{ id: 'spread', x: 180, y: 290, text: 'total(*[3, 4, 5])', w: 230, solid: true }] }), ['spread']),
    stBeat('hoot', 'Two stars, **opts, gather named values into a dictionary. JavaScript’s three dots, ...acorns, gather too.', stScene(cast, { tokens: [{ id: 'kw', x: 320, y: 180, text: '**opts → {"size": "big"}' }, { id: 'js', x: 320, y: 260, text: '...acorns → [3, 4, 5]' }] }), ['kw', 'js']),
    stBeat('dot', 'A star in the def gathers. A star in the call spreads.', stScene(cast, bag([3, 4, 5])), ['cast:dot'])
  ];
}
START_LESSON('many-args', {
  code: ST205_CODE, story: st205Story(),
  watch: { code: 'def total(*acorns):\n    s = 0\n    for a in acorns:\n        s = s + a\n    return s\n\nprint(total(3, 4, 5))\nprint(total())\n', heap: true },
  tryit: { py: 'def total(*acorns):\n    s = 0\n    for a in acorns:\n        s = s + a\n    return s\n\nprint(total(3, 4, 5))\nprint(total(10))\nbag = [1, 2, 3, 4]\nprint(total(*bag))\n',
    js: 'function total(...acorns) {\n  let s = 0;\n  for (const a of acorns) {\n    s = s + a;\n  }\n  return s;\n}\n\nconsole.log(total(3, 4, 5));\nconsole.log(total(10));\nlet bag = [1, 2, 3, 4];\nconsole.log(total(...bag));\n',
    goals: ['Press Run.', 'What does total() with nothing inside return? Predict, then run.', 'Write biggest(*nums) that returns the largest value it is given.'] },
  check: { q: 'def total(*acorns). Inside the function, what is acorns after total(3, 4, 5)?',
    choices: [['One group holding 3, 4 and 5', true, 'Right. The star gathers every value into one tuple: (3, 4, 5).'], ['Just 3, the first value', false, 'The star gathers all of them, not only the first.'], ['An error: total takes one value', false, 'With the star it takes any number.'], ['The text "3, 4, 5"', false, 'It is a group of numbers, not text.']] }
});
