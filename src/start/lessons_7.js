// Level 2, lessons 6 to 9: shared lists, functions as values, closures and recursion. Every word is our own.

// Names with arrows to boxes, for the Level 2 and 3 stories. names: [[label, x, y, target id]], boxes: [{ id, x, y, w, h, text, tag }].
// Each arrow leaves the right edge of its name and lands on the left edge of its box.
function st2Arrows(names, boxes, o) {
  const at = {}; boxes.forEach((b) => { at[b.id] = b; });
  const lit = (o && o.lit) || [];
  return {
    boxes: boxes.map((b) => Object.assign({ h: 64, size: 18 }, b)),
    tokens: names.map(([n, x, y]) => ({ id: 'nm:' + n, x, y, text: n, w: Math.max(80, stTokW(n, 18)), solid: lit.includes(n) })),
    arrows: names.filter((n) => at[n[3]]).map(([n, x, y, to]) => {
      const w = Math.max(80, stTokW(n, 18)), b = at[to], h = b.h || 64;
      return { id: 'ar:' + n, from: [x + w / 2 + 4, y], to: [b.x - 4, Math.max(b.y + 12, Math.min(b.y + h - 12, y))], c: lit.includes(n) ? 'a' : 'm' };
    })
  };
}

// ---------- L2.6 Two names, one list ----------
const ST206_CODE = {
  py: ['def add_acorn(bag):', '    bag.append("acorn")', 'mine = ["nut"]', 'add_acorn(mine)', 'print(mine)'],
  js: ['function addAcorn(bag) {', '  bag.push("acorn"); }', 'let mine = ["nut"];', 'addAcorn(mine);', 'console.log(mine);']
};
function st206Story() {
  const cast = st1Cast([['hoot', 60], ['penny', 220], ['bolt', 420], ['dot', 580]]);
  const list = (items, o) => Object.assign({ id: 'list', x: 340, y: 180, w: 260, h: 64, text: '[' + items.map((s) => '"' + s + '"').join(', ') + ']', tag: 'list', size: 18 }, o || {});
  return [
    stBeat('penny', 'I hand my list to Bolt so it can add an acorn. I thought Bolt would fill a copy of it.', stScene(cast, st2Arrows([['mine', 130, 212, 'list']], [list(['nut'])])), ['cast:penny', 'list']),
    stBeat('hoot', 'mine is not the list itself. It is a name with an arrow pointing at the list.', stScene(cast, st2Arrows([['mine', 130, 212, 'list']], [list(['nut'])], { lit: ['mine'] })), ['nm:mine', 'ar:mine'], 2),
    stBeat('hoot', 'add_acorn(mine) hands over the same arrow. Inside, bag points at that very same list.', stScene(cast, st2Arrows([['mine', 130, 180, 'list'], ['bag', 130, 250, 'list']], [list(['nut'])], { lit: ['bag'] })), ['nm:bag', 'ar:bag', 'list'], 3),
    stBeat('bolt', 'bag.append("acorn"). Done. One acorn added to the list bag points at.', stScene(cast, st2Arrows([['mine', 130, 180, 'list'], ['bag', 130, 250, 'list']], [list(['nut', 'acorn'], { solid: true })])), ['list'], 1),
    stBeat('dot', 'So Penny’s list changed too! There was only ever one list, with two arrows on it.', stScene(cast, st2Arrows([['mine', 130, 212, 'list']], [list(['nut', 'acorn'])], { lit: ['mine'] }), st1Screen(340, 270, 260, ["['nut', 'acorn']"], 80)), ['screen', 'cast:dot'], 4),
    stBeat('hoot', 'But bag = [] inside only moves bag’s own arrow to a new list. Penny’s list stays as it was.', stScene(cast, st2Arrows([['mine', 130, 180, 'list'], ['bag', 130, 290, 'empty']], [list(['nut'], { y: 150 }), { id: 'empty', x: 340, y: 260, w: 260, text: '[]', tag: 'new list' }], { lit: ['bag'] })), ['ar:bag', 'empty']),
    stBeat('penny', 'To keep mine safe, I can pass a copy: add_acorn(mine.copy()). Then Bolt fills the copy.', stScene(cast, st2Arrows([['mine', 130, 180, 'list'], ['bag', 130, 290, 'copy']], [list(['nut'], { y: 150 }), list(['nut', 'acorn'], { id: 'copy', y: 260, tag: 'the copy', solid: true })])), ['copy', 'list']),
    stBeat('hoot', 'One more trap: never write bag=[] as a default. That one list is made once and shared by every call.', stScene(cast, { tokens: [{ id: 'trap', x: 320, y: 200, text: 'def add_acorn(bag=[]):', c: 'bad', w: 320 }, { id: 'fix', x: 320, y: 280, text: 'def add_acorn(bag=None):', w: 320 }] }), ['trap']),
    stBeat('dot', 'Two names, one list. Change it through either name, and both see it.', stScene(cast, st2Arrows([['mine', 130, 180, 'list'], ['bag', 130, 250, 'list']], [list(['nut', 'acorn'])])), ['cast:dot'])
  ];
}
START_LESSON('mutable-args', {
  code: ST206_CODE, story: st206Story(),
  watch: { code: 'def add_acorn(bag):\n    bag.append("acorn")\n\nmine = ["nut"]\nadd_acorn(mine)\nprint(mine)\n\ndef fresh_bag(bag):\n    bag = []\n    bag.append("pine cone")\n\nfresh_bag(mine)\nprint(mine)\n', heap: true },
  tryit: { py: 'def add_acorn(bag):\n    bag.append("acorn")\n\nmine = ["nut"]\nadd_acorn(mine)\nprint(mine)\n\nsafe = ["nut"]\nadd_acorn(safe.copy())\nprint(safe)\n',
    js: 'function addAcorn(bag) {\n  bag.push("acorn");\n}\n\nlet mine = ["nut"];\naddAcorn(mine);\nconsole.log(mine);\n\nlet safe = ["nut"];\naddAcorn(safe.slice());\nconsole.log(safe);\n', differs: true,
    goals: ['Press Run. Which list changed, and which did not?', 'Write a function that clears a list with bag.clear(). Does the caller’s list empty too?', 'Press Watch my code run and follow the arrows.'] },
  check: { q: 'You pass a list to a function, and the function appends to it. What happens to your list?',
    choices: [['It changes too: both names point at the same list', true, 'Right. Passing a list hands over an arrow to it, not a copy.'], ['Nothing: the function had its own copy', false, 'No copy is made unless you ask for one, like mine.copy().'], ['It becomes empty', false, 'Appending adds an item. Nothing is removed.'], ['Python stops with an error', false, 'Changing a list inside a function is allowed.']] }
});

// ---------- L2.7 Functions are values too ----------
const ST207_CODE = {
  py: ['def shout(word):', '    return word.upper() + "!"', 'def twice(f, x):', '    return f(f(x))', 'print(twice(shout, "hi"))'],
  js: ['function shout(word) {', '  return word.toUpperCase() + "!"; }', 'function twice(f, x) {', '  return f(f(x)); }', 'console.log(twice(shout, "hi"));']
};
function st207Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const recipe = (o) => Object.assign({ id: 'recipe', x: 360, y: 160, w: 240, h: 70, text: 'word.upper() + "!"', size: 16, tag: 'function shout' }, o || {});
  return [
    stBeat('hoot', 'Here is a recipe card for shouting. I hand Bolt the card, not a dish I already cooked.', stScene(cast, { boxes: [recipe()] }), ['recipe']),
    stBeat('dot', 'What is the difference? shout and shout("hi") look nearly the same.', stScene(cast, { tokens: [{ id: 'card', x: 200, y: 200, text: 'shout' }, { id: 'dish', x: 440, y: 200, text: 'shout("hi")' }] }), ['card', 'dish']),
    stBeat('hoot', 'shout alone is the recipe: a value you can pass around. shout("hi") cooks it and gives "HI!".', stScene(cast, { tokens: [{ id: 'card', x: 200, y: 200, text: 'shout', sub: 'the recipe' }, { id: 'dish', x: 440, y: 200, text: '"HI!"', solid: true, sub: 'the dish' }] }), ['card', 'dish'], [0, 1]),
    stBeat('hoot', 'twice(f, x) takes a recipe as f and uses it two times on x.', stScene(cast, st1Card('card', 60, 130, 520, ST207_CODE.py.slice(2, 4), [0, 1])), ['card'], [2, 3]),
    stBeat('bolt', 'twice(shout, "hi"): f points at the shout card. f("hi") gives "HI!", then f("HI!") gives "HI!!".', stScene(cast, st2Arrows([['shout', 120, 175, 'recipe'], ['f', 120, 255, 'recipe']], [recipe()], { lit: ['f'] }), { tokens: [{ id: 'out', x: 480, y: 290, text: '"HI!!"', solid: true }] }), ['ar:f', 'out'], 4),
    stBeat('dot', 'And twice(shout(), "hi")? That cooks shout with no word at all, before twice even starts!', stScene(cast, { tokens: [{ id: 'bad', x: 320, y: 210, text: 'twice(shout(), "hi") → TypeError', c: 'bad' }] }), ['bad']),
    stBeat('hoot', 'Python’s sorted uses this too. sorted(names, key=len) is handed the len recipe to rank by.', stScene(cast, { tokens: [{ id: 'sort', x: 320, y: 180, text: 'sorted(["Pip", "Dot", "Penny"], key=len)' }, { id: 'res', x: 320, y: 260, text: '["Pip", "Dot", "Penny"]', solid: true }] }), ['sort', 'res']),
    stBeat('hoot', 'A lambda is a tiny recipe with no name: lambda w: w + "?" is a card you can write inline.', stScene(cast, { tokens: [{ id: 'lam', x: 320, y: 210, text: 'twice(lambda w: w + "?", "hi") → "hi??"' }] }), ['lam']),
    stBeat('dot', 'Without () I hand over the recipe. With () I hand over what it makes!', stScene(cast, { boxes: [recipe()] }), ['cast:dot'])
  ];
}
START_LESSON('callbacks', {
  code: ST207_CODE, story: st207Story(),
  watch: { code: 'def shout(word):\n    return word.upper() + "!"\n\ndef twice(f, x):\n    return f(f(x))\n\nyell = shout\nprint(twice(yell, "hi"))\n', heap: true },
  tryit: { py: 'def shout(word):\n    return word.upper() + "!"\n\ndef twice(f, x):\n    return f(f(x))\n\nprint(twice(shout, "hi"))\nprint(twice(lambda w: w + "?", "hi"))\nprint(sorted(["Penny", "Pip", "Hoot"], key=len))\n',
    js: 'function shout(word) {\n  return word.toUpperCase() + "!";\n}\n\nfunction twice(f, x) {\n  return f(f(x));\n}\n\nconsole.log(twice(shout, "hi"));\nconsole.log(twice((w) => w + "?", "hi"));\nconsole.log(["Penny", "Pip", "Hoot"].sort((a, b) => a.length - b.length));\n', differs: true,
    goals: ['Press Run.', 'Write whisper(word) that returns word.lower() + "..." and pass it to twice.', 'Change twice(shout, "hi") to twice(shout(), "hi") and read the error.'] },
  check: { q: 'What is the difference between shout and shout("hi")?',
    choices: [['shout is the function itself; shout("hi") runs it and gives its answer', true, 'Right. Pass shout to hand over the recipe. Add () only when you want it to run now.'], ['There is no difference', false, 'One is the recipe, the other is what the recipe makes.'], ['shout("hi") is the function; shout is an error', false, 'shout on its own is fine: it is the function as a value.'], ['shout runs the function twice', false, 'Without () it does not run at all.']] }
});

// ---------- L2.8 Functions that remember ----------
const ST208_CODE = {
  py: ['def make_greeter(name):', '    def greet():', '        return "Hi, " + name', '    return greet', 'hi_dot = make_greeter("Dot")', 'print(hi_dot())'],
  js: ['function makeGreeter(name) {', '  function greet() {', '    return "Hi, " + name; }', '  return greet; }', 'let hiDot = makeGreeter("Dot");', 'console.log(hiDot());']
};
function st208Story() {
  const cast = st1Cast([['hoot', 60], ['pip', 320], ['dot', 580]]);
  const box = (name, o) => Object.assign({ id: 'box:' + name, x: 360, y: 150, w: 240, h: 80, text: 'remembers name = "' + name + '"', size: 15, tag: 'function greet' }, o || {});
  return [
    stBeat('hoot', 'A lunchbox is packed in the kitchen and opened somewhere else, hours later. Functions can carry one too.', stScene(cast, { boxes: [{ id: 'lunch', x: 240, y: 170, w: 160, h: 90, text: 'lunch', size: 20, tag: 'packed' }] }), ['lunch']),
    stBeat('dot', 'make_greeter("Dot") puts a plate on the stack with name = "Dot". Then it makes greet inside.', stScene(cast, st2Plates(['main program', 'make_greeter()'], { x: 40, w: 230 }), { boxes: [stVar('name', 'name', '"Dot"', 60, 120, { w: 190 })] }, st1Card('card', 300, 124, 320, ST208_CODE.py.slice(0, 4), [0, 1, 2])), ['name', 'card'], [0, 1, 2]),
    stBeat('hoot', 'greet uses name, so it packs name in its lunchbox. Then make_greeter returns greet itself.', stScene(cast, st2Plates(['main program', 'make_greeter()'], { x: 40, w: 230 }), { boxes: [box('Dot', { solid: true })] }), ['box:Dot'], 3),
    stBeat('pip', 'make_greeter’s plate comes off the pile. Is name gone now?', stScene(cast, st2Plates(['main program'], { x: 40, w: 230 }), { boxes: [box('Dot')] }), ['plate0', 'box:Dot'], 4),
    stBeat('hoot', 'Not for greet. Its lunchbox still holds name = "Dot". hi_dot points at that greet.', stScene(cast, st2Arrows([['hi_dot', 140, 190, 'box:Dot']], [box('Dot')], { lit: ['hi_dot'] })), ['ar:hi_dot', 'box:Dot'], 4),
    stBeat('dot', 'So hi_dot() opens the lunchbox and gives "Hi, Dot", long after make_greeter finished!', stScene(cast, st2Arrows([['hi_dot', 140, 190, 'box:Dot']], [box('Dot')]), st1Screen(360, 260, 240, ['Hi, Dot'], 80)), ['screen'], 5),
    stBeat('hoot', 'Each call packs its own box. make_greeter("Pip") makes a second greet that remembers "Pip".', stScene(cast, st2Arrows([['hi_dot', 140, 170, 'box:Dot'], ['hi_pip', 140, 280, 'box:Pip']], [box('Dot', { y: 130 }), box('Pip', { y: 240, solid: true })])), ['box:Pip']),
    stBeat('pip', 'In Python, to change a packed number, say nonlocal count first. Otherwise Python makes a new box.', stScene(cast, { tokens: [{ id: 'nl', x: 320, y: 200, text: 'nonlocal count', solid: true }, { id: 'up', x: 320, y: 270, text: 'count = count + 1' }] }), ['nl']),
    stBeat('dot', 'A function made inside another keeps the names around it. That is a closure!', stScene(cast, { boxes: [box('Dot')] }), ['cast:dot'])
  ];
}
START_LESSON('closures', {
  code: ST208_CODE, story: st208Story(),
  watch: { code: 'def make_greeter(name):\n    def greet():\n        return "Hi, " + name\n    return greet\n\nhi_dot = make_greeter("Dot")\nhi_pip = make_greeter("Pip")\nprint(hi_dot())\nprint(hi_pip())\n', heap: true },
  tryit: { py: 'def make_counter():\n    count = 0\n    def tick():\n        nonlocal count\n        count = count + 1\n        return count\n    return tick\n\nc = make_counter()\nc()\nc()\nprint(c())\nother = make_counter()\nprint(other())\n',
    js: 'function makeCounter() {\n  let count = 0;\n  function tick() {\n    count = count + 1;\n    return count;\n  }\n  return tick;\n}\n\nlet c = makeCounter();\nc();\nc();\nconsole.log(c());\nlet other = makeCounter();\nconsole.log(other());\n',
    goals: ['Press Run. Why does other start again at 1?', 'Take out the nonlocal line and read the error.', 'Write make_adder(n) that returns a function adding n to its input.'] },
  check: { q: 'make_greeter("Dot") has returned. Later, hi_dot() still says "Hi, Dot". Why?',
    choices: [['greet packed the name it used, so it still has it', true, 'Right. A closure keeps the outer names it needs, even after the outer plate is gone.'], ['name is a global variable', false, 'name was only on make_greeter’s plate.'], ['Python runs make_greeter again', false, 'make_greeter ran once. greet carries its own copy of the names it used.'], ['It is luck and may fail later', false, 'Closures are reliable: the packed names stay as long as the function does.']] }
});

// ---------- L2.9 A function that calls itself ----------
const ST209_CODE = {
  py: ['def count_down(n):', '    if n == 0:', '        print("Lift off!")', '        return', '    print(n)', '    count_down(n - 1)', 'count_down(3)'],
  js: ['function countDown(n) {', '  if (n === 0) {', '    console.log("Lift off!");', '    return; }', '  console.log(n);', '  countDown(n - 1); }', 'countDown(3);']
};
function st209Story() {
  const cast = st1Cast([['hoot', 60], ['pip', 320], ['dot', 580]]);
  const pile = (frames, extra, none) => stScene(cast, st2Plates(frames, { x: 400, w: 220, none, h: 36, gap: 6 }), extra);
  const card = (cur) => st1Card('card', 20, 124, 350, ST209_CODE.py.slice(0, 6), cur);
  return [
    stBeat('dot', 'Bolt’s rocket needs a countdown from 3. Can a function count down by calling itself?', pile(['main program'], card([])), ['cast:dot']),
    stBeat('hoot', 'Yes. count_down(n) says n, then hands the smaller job, count_down(n - 1), to a new copy of itself.', stScene(pile(['main program', 'count_down(3)']), card([4, 5])), ['plate1', 'card'], [4, 5]),
    stBeat('pip', 'Each call gets its own plate with its own n. Three, then two, then one: the pile grows.', pile(['main program', 'count_down(3)', 'count_down(2)', 'count_down(1)']), ['plate3'], 5),
    stBeat('dot', 'When does it stop? It could call itself forever!', pile(['main program', 'count_down(3)', 'count_down(2)', 'count_down(1)', 'count_down(0)']), ['plate4', 'cast:dot']),
    stBeat('hoot', 'The base case stops it. When n is 0, it prints Lift off! and returns without calling again.', stScene(pile(['main program', 'count_down(3)', 'count_down(2)', 'count_down(1)', 'count_down(0)']), card([1, 2, 3])), ['plate4', 'card'], [1, 2, 3]),
    stBeat('pip', 'Then the plates come off one by one, each call finishing where it left off.', pile(['main program', 'count_down(3)'], { tokens: [{ id: 'up', x: 200, y: 200, text: 'plates come off', w: 200 }] }), ['plate1', 'up']),
    stBeat('hoot', 'Answers can travel back down too: sum_to(3) is 3 + sum_to(2), and so on down to sum_to(0) = 0.', stScene(cast, { tokens: [{ id: 's3', x: 320, y: 150, text: 'sum_to(3) = 3 + sum_to(2)' }, { id: 's2', x: 320, y: 200, text: 'sum_to(2) = 2 + sum_to(1)' }, { id: 's1', x: 320, y: 250, text: 'sum_to(1) = 1 + sum_to(0)' }, { id: 's0', x: 320, y: 300, text: 'sum_to(0) = 0', solid: true }] }), ['s0']),
    stBeat('dot', 'Then 1, then 3, then 6 come back up the pile. And with no base case?', stScene(cast, { tokens: [{ id: 'r', x: 320, y: 170, text: '0 → 1 → 3 → 6', solid: true }, { id: 'bad', x: 320, y: 260, text: 'RecursionError', c: 'bad' }] }), ['r', 'bad']),
    stBeat('hoot', 'Then the pile grows until Python gives up with RecursionError. Base case first, smaller job second.', pile(['main program', 'count_down(3)', 'count_down(2)', 'count_down(1)', 'count_down(0)'], null, true), ['cast:hoot'])
  ];
}
START_LESSON('recursion', {
  code: ST209_CODE, story: st209Story(),
  watch: { code: 'def sum_to(n):\n    if n == 0:\n        return 0\n    return n + sum_to(n - 1)\n\nprint(sum_to(3))\n' },
  tryit: { py: 'def count_down(n):\n    if n == 0:\n        print("Lift off!")\n        return\n    print(n)\n    count_down(n - 1)\n\ncount_down(3)\n\ndef sum_to(n):\n    if n == 0:\n        return 0\n    return n + sum_to(n - 1)\n\nprint(sum_to(4))\n',
    js: 'function countDown(n) {\n  if (n === 0) {\n    console.log("Lift off!");\n    return;\n  }\n  console.log(n);\n  countDown(n - 1);\n}\n\ncountDown(3);\n\nfunction sumTo(n) {\n  if (n === 0) {\n    return 0;\n  }\n  return n + sumTo(n - 1);\n}\n\nconsole.log(sumTo(4));\n',
    goals: ['Press Run.', 'Move print(n) below the call to count_down(n - 1). Predict the new order first.', 'Write factorial(n): 1 when n is 0, otherwise n * factorial(n - 1).'] },
  check: { q: 'What stops a recursive function from calling itself forever?',
    choices: [['A base case that returns without calling itself again', true, 'Right. Every call must move toward it, usually with a smaller n.'], ['Python stops after ten calls', false, 'Python allows about a thousand, then stops with RecursionError. That is a crash, not a plan.'], ['The return value', false, 'Returning helps only if some call returns without recursing.'], ['print', false, 'Printing does not end anything.']] }
});
