// Level 3, lessons 1 to 7: blueprints and objects, self, __init__, attributes and methods, references, shared class
// data, and guarded data. One world all the way through Level 3: the robot workshop, where you build robots
// from a blueprint, and the first robot is Ray. Every object is a box, every name has an arrow. Every word is our own.

// A name with an arrow to a point (usually the left edge of an object box).
function l3Tag(name, x, y, to, lit) {
  const w = Math.max(80, stTokW(name, 18));
  return { tokens: [{ id: 'nm:' + name, x, y, text: name, w, solid: !!lit }], arrows: to ? [{ id: 'ar:' + name, from: [x + w / 2 + 4, y], to, c: lit ? 'a' : 'm' }] : [] };
}
// A robot object: a box tagged with its class, one row per field. fields: [[name, value]].
function l3Bot(id, x, y, fields, o) {
  return stObj(id, (o && o.tag) || 'Robot object', x, y, fields, Object.assign({ w: 210 }, o || {}, fields.length ? {} : { box: { text: 'no data yet', size: 15, mono: false } }));
}
// The blueprint on the wall: a dashed class box with a few plain lines inside.
function l3Class(x, y, lines, o) {
  const w = (o && o.w) || 210, h = 26 + lines.length * 28;
  return {
    boxes: [{ id: (o && o.id) || 'cls', x, y, w, h, text: '', tag: (o && o.tag) || 'class Robot', tc: 'b', c: 'b', dash: !(o && o.solidLine), solid: false }],
    labels: lines.map((l, i) => ({ id: ((o && o.id) || 'cls') + ':l' + i, x: x + 14, y: y + 36 + i * 28, text: l, anchor: 'start', size: 15, mono: true, c: 't2' }))
  };
}
const l3Cast = (ids) => st1Cast(ids);

// ---------- L3.1 Blueprints and objects ----------
const ST301_CODE = {
  py: ['class Robot:', '    pass', 'bolt = Robot()', 'nova = Robot()', 'bolt.name = "Ray"', 'nova.name = "Kim"', 'print(bolt.name, nova.name)'],
  js: ['class Robot {', '}', 'let bolt = new Robot();', 'let nova = new Robot();', 'bolt.name = "Ray";', 'nova.name = "Kim";', 'console.log(bolt.name, nova.name);']
};
function st301Story() {
  const cast = l3Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const plan = (x, y) => l3Class(x, y, ['a robot has', 'a name'], { w: 170 });
  const two = (bn, nn, lit) => stScene(cast, plan(20, 150), l3Bot('b1', 410, 128, bn ? [['name', bn]] : [], { lit: lit === 'b' ? ['name'] : [] }), l3Bot('b2', 410, 250, nn ? [['name', nn]] : [], { lit: lit === 'n' ? ['name'] : [] }),
    l3Tag('bolt', 300, 160, [406, 160], lit === 'b'), l3Tag('nova', 300, 282, [406, 282], lit === 'n'));
  return [
    stBeat('hoot', 'Welcome to my workshop. Every robot here is built from one blueprint, pinned to the wall.', stScene(cast, plan(230, 170)), ['cls']),
    stBeat('dot', 'So the blueprint is a robot?', stScene(cast, plan(230, 170)), ['cls', 'cast:dot']),
    stBeat('hoot', 'No. class Robot: is only the plan. It says what robots are like, but you cannot charge a drawing.', stScene(cast, plan(20, 150), st1Card('card', 250, 150, 360, ST301_CODE.py.slice(0, 2), [0, 1])), ['cls', 'card'], [0, 1]),
    stBeat('hoot', 'Robot() builds a real robot from the plan. That robot is an object. bolt is a name that points to it.', stScene(cast, plan(20, 150), l3Bot('b1', 410, 128, []), l3Tag('bolt', 300, 160, [406, 160], true)), ['b1', 'nm:bolt', 'ar:bolt'], 2),
    stBeat('dot', 'Robot() again builds a second, separate robot. nova points at that one.', stScene(cast, plan(20, 150), l3Bot('b1', 410, 128, []), l3Tag('bolt', 300, 160, [406, 160]), l3Bot('b2', 410, 250, []), l3Tag('nova', 300, 282, [406, 282], true)), ['b2', 'nm:nova'], 3),
    stBeat('hoot', 'Each object keeps its own data. bolt.name = "Ray" writes on Ray’s box, and only there.', two('"Ray"', null, 'b'), ['b1'], 4),
    stBeat('bolt', 'I am a robot. The other box is a second robot. Same blueprint, two different robots.', two('"Ray"', '"Kim"', 'n'), ['b1', 'b2'], [5, 6]),
    stBeat('dot', 'One blueprint, many objects, each with its own data!', two('"Ray"', '"Kim"'), ['cast:dot'], 6)
  ];
}
START_LESSON('objects', {
  code: ST301_CODE, story: st301Story(),
  watch: { code: 'class Robot:\n    pass\n\nbolt = Robot()\nnova = Robot()\nbolt.name = "Ray"\nnova.name = "Kim"\nprint(bolt.name, nova.name)\n', heap: true },
  tryit: { py: 'class Robot:\n    pass\n\nbolt = Robot()\nnova = Robot()\nbolt.name = "Ray"\nnova.name = "Kim"\nprint(bolt.name, nova.name)\nprint(bolt is nova)\n',
    js: 'class Robot {\n}\n\nlet bolt = new Robot();\nlet nova = new Robot();\nbolt.name = "Ray";\nnova.name = "Kim";\nconsole.log(bolt.name, nova.name);\nconsole.log(bolt === nova);\n', differs: true,
    goals: ['Press Run.', 'Build a third robot called Kai and give it a name.', 'Give only bolt a size. What happens when you print nova.size?'] },
  check: { q: 'You write class Robot: and then bolt = Robot() and nova = Robot(). How many robot objects are there?',
    choices: [['Two, each with its own data', true, 'Right. The class is the blueprint. Each Robot() builds one new object.'], ['One: the class', false, 'The class is only the plan. It is not a robot object.'], ['Three: the class and two robots', false, 'The class describes robots but is not one of them.'], ['None until they have a name', false, 'Robot() builds the object straight away, even with no data on it.']] }
});

// ---------- L3.2 self: which robot is it? ----------
const ST302_CODE = {
  py: ['class Robot:', '    def beep(self):', '        print(self.name, "says beep")', 'bolt = Robot()', 'bolt.name = "Ray"', 'bolt.beep()'],
  js: ['class Robot {', '  beep() {', '    console.log(this.name, "says beep"); } }', 'let bolt = new Robot();', 'bolt.name = "Ray";', 'bolt.beep();']
};
function st302Story() {
  const cast = l3Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const plan = l3Class(20, 140, ['def beep(self):', '  print(self.name, ...)'], { w: 250 });
  const bots = (selfAt) => stScene(l3Bot('b1', 410, 128, [['name', '"Ray"']]), l3Bot('b2', 410, 250, [['name', '"Kim"']]),
    selfAt ? l3Tag('self', 300, selfAt === 'b1' ? 175 : 295, [406, selfAt === 'b1' ? 175 : 290], true) : null);
  return [
    stBeat('dot', 'I gave the blueprint a beep method. But why does def beep(self) have self in it?', stScene(cast, st1Card('card', 60, 140, 520, ST302_CODE.py.slice(0, 3), [1])), ['card'], 1),
    stBeat('hoot', 'A method is a function that lives in the class. It has to know which robot it is working on.', stScene(cast, plan, bots()), ['cls']),
    stBeat('hoot', 'bolt.beep() is how you call it. Python reads it as Robot.beep(bolt): the object goes in first.', stScene(cast, { tokens: [{ id: 'call', x: 180, y: 210, text: 'bolt.beep()', solid: true }, { id: 'real', x: 450, y: 210, text: 'Robot.beep(bolt)' }], arrows: [{ id: 'same', from: [260, 210], to: [358, 210], c: 'a', label: 'means' }] }), ['call', 'real'], 5),
    stBeat('bolt', 'Inside beep, self points at me. So self.name is "Ray".', stScene(cast, plan, bots('b1')), ['nm:self', 'ar:self', 'b1'], 2),
    stBeat('dot', 'And nova.beep() runs the very same method, with self pointing at Kim!', stScene(cast, plan, bots('b2')), ['nm:self', 'ar:self', 'b2']),
    stBeat('hoot', 'One method in the blueprint, any number of objects. self is how it knows which one called.', stScene(cast, plan, bots()), ['cls', 'b1', 'b2']),
    stBeat('dot', 'What if I write def beep(): with no self?', stScene(cast, { tokens: [{ id: 'bad', x: 320, y: 210, text: 'TypeError: beep() takes 0 positional arguments but 1 was given', size: 14, c: 'bad' }] }), ['bad', 'cast:dot']),
    stBeat('hoot', 'Python still hands the object in, and finds no box to put it in. JavaScript calls the same idea this.', stScene(cast, st1Card('card', 60, 140, 520, [ST302_CODE.py[1], ST302_CODE.js[1] + '  // this is the object'], [0, 1])), ['card'], 1)
  ];
}
START_LESSON('self', {
  code: ST302_CODE, story: st302Story(),
  watch: { code: 'class Robot:\n    def beep(self):\n        print(self.name, "says beep")\n\nbolt = Robot()\nbolt.name = "Ray"\nnova = Robot()\nnova.name = "Kim"\nbolt.beep()\nnova.beep()\n', heap: true },
  tryit: { py: 'class Robot:\n    def beep(self):\n        print(self.name, "says beep")\n\nbolt = Robot()\nbolt.name = "Ray"\nnova = Robot()\nnova.name = "Kim"\nbolt.beep()\nnova.beep()\nRobot.beep(bolt)\n',
    js: 'class Robot {\n  beep() {\n    console.log(this.name, "says beep");\n  }\n}\n\nlet bolt = new Robot();\nbolt.name = "Ray";\nlet nova = new Robot();\nnova.name = "Kim";\nbolt.beep();\nnova.beep();\nRobot.prototype.beep.call(bolt);\n',
    goals: ['Press Run. The last line calls beep the long way.', 'Add a method shout(self, word) that prints the name and the word.', 'Remove self from def beep and read the error.'] },
  check: { q: 'In bolt.beep(), what is self inside beep?',
    choices: [['The bolt object, the one the method was called on', true, 'Right. Python passes the object in as the first value, and self is its name inside.'], ['The Robot class', false, 'self is one object, not the blueprint.'], ['A new robot made for the call', false, 'No new robot is built. self points at the one that called.'], ['Nothing until you set it', false, 'Python fills self in for you on every method call.']] }
});

// ---------- L3.3 Setting up a new object ----------
const ST303_CODE = {
  py: ['class Robot:', '    def __init__(self, name):', '        self.name = name', '        self.battery = 100', 'bolt = Robot("Ray")', 'print(bolt.name, bolt.battery)'],
  js: ['class Robot {', '  constructor(name) {', '    this.name = name;', '    this.battery = 100; } }', 'let bolt = new Robot("Ray");', 'console.log(bolt.name, bolt.battery);']
};
function st303Story() {
  const cast = l3Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const plate = (vars) => stScene({ boxes: [{ id: 'initP', x: 20, y: 160, w: 250, h: 130, rx: 18, text: '', tag: '__init__()', tc: 'a', c: 'a' }] },
    { tokens: [{ id: 'selfT', x: 90, y: 200, text: 'self', w: 90 }], arrows: [{ id: 'selfA', from: [139, 200], to: [376, 200], c: 'a' }] }, vars ? { boxes: [stVar('nameV', 'name', '"Ray"', 40, 228, { w: 160, h: 50, size: 18 })] } : null);
  const bot = (fields, lit) => l3Bot('b1', 380, 160, fields, { lit });
  return [
    stBeat('dot', 'Every new robot needs a name and a full battery. Setting them yourself after each Robot() is tiring work.', stScene(cast, bot([])), ['b1', 'cast:dot']),
    stBeat('hoot', 'Write __init__. Python calls it once, right after it builds a brand-new, empty object.', stScene(cast, st1Card('card', 40, 140, 560, ST303_CODE.py.slice(0, 4), [1, 2, 3])), ['card'], [1, 2, 3]),
    stBeat('hoot', 'Robot("Ray") first builds an empty box. Then __init__ runs with self pointing at it and name holding "Ray".', stScene(cast, plate(true), bot([])), ['selfA', 'nameV', 'b1'], 4),
    stBeat('bolt', 'self.name = name writes the name onto my box.', stScene(cast, plate(true), bot([['name', '"Ray"']], ['name'])), ['b1'], 2),
    stBeat('bolt', 'self.battery = 100 adds a full battery. Now I am set up.', stScene(cast, plate(true), bot([['name', '"Ray"'], ['battery', '100']], ['battery'])), ['b1'], 3),
    stBeat('dot', 'So __init__ does not build the robot. It sets up the robot Python already built?', stScene(cast, bot([['name', '"Ray"'], ['battery', '100']]), l3Tag('bolt', 250, 190, [376, 190], true)), ['nm:bolt', 'cast:dot'], 4),
    stBeat('hoot', 'Exactly. And forget self. and name = name only writes on __init__’s plate, which is gone a moment later.', stScene(cast, plate(true), bot([]), { tokens: [{ id: 'oops', x: 145, y: 320, text: 'name = name', c: 'bad' }] }), ['oops', 'b1']),
    stBeat('dot', 'Python builds the object, __init__ fills it in. Every new robot starts ready!', stScene(cast, bot([['name', '"Ray"'], ['battery', '100']]), l3Tag('bolt', 250, 190, [376, 190])), ['cast:dot'], 5)
  ];
}
START_LESSON('init', {
  code: ST303_CODE, story: st303Story(),
  watch: { code: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = 100\n\nbolt = Robot("Ray")\nnova = Robot("Kim")\nprint(bolt.name, bolt.battery)\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = 100\n\nbolt = Robot("Ray")\nnova = Robot("Kim")\nprint(bolt.name, bolt.battery)\nprint(nova.name, nova.battery)\n',
    js: 'class Robot {\n  constructor(name) {\n    this.name = name;\n    this.battery = 100;\n  }\n}\n\nlet bolt = new Robot("Ray");\nlet nova = new Robot("Kim");\nconsole.log(bolt.name, bolt.battery);\nconsole.log(nova.name, nova.battery);\n',
    goals: ['Press Run.', 'Add a second parameter, size, and store it on the robot.', 'Change self.name = name to name = name. What does print(bolt.name) say now?'] },
  check: { q: 'What does __init__ do?',
    choices: [['Fills in the starting data of an object Python has already built', true, 'Right. Python builds the empty object, then calls __init__ with self pointing at it.'], ['Builds the object out of nothing', false, 'Python has already built it by the time __init__ runs.'], ['Runs every time you use the object', false, 'It runs once, when the object is built.'], ['Deletes the old object', false, 'It only sets up the new one.']] }
});

// ---------- L3.4 What it knows, what it does ----------
const ST304_CODE = {
  py: ['class Robot:', '    def __init__(self, name):', '        self.name = name', '        self.battery = 100', '    def work(self):', '        self.battery = self.battery - 30', 'bolt = Robot("Ray")', 'bolt.work()', 'print(bolt.battery)'],
  js: ['class Robot {', '  constructor(name) {', '    this.name = name;', '    this.battery = 100; }', '  work() {', '    this.battery = this.battery - 30; } }', 'let bolt = new Robot("Ray");', 'bolt.work();', 'console.log(bolt.battery);']
};
function st304Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const plan = l3Class(20, 150, ['__init__(self, name)', 'work(self)'], { w: 230 });
  const bot = (b, lit) => l3Bot('b1', 390, 150, [['name', '"Ray"'], ['battery', b]], { lit: lit ? ['battery'] : [] });
  return [
    stBeat('penny', 'I keep the workshop log. What does the computer know, and what can it do?', stScene(cast, plan, bot('100')), ['cast:penny']),
    stBeat('hoot', 'What it knows are attributes: data stored on the object, like name and battery.', stScene(cast, plan, bot('100')), ['b1'], [2, 3]),
    stBeat('hoot', 'What it can do are methods: functions in the class, like work(). Think of them as its buttons.', stScene(cast, plan, bot('100')), ['cls'], [4, 5]),
    stBeat('dot', 'bolt.work() presses the button. Inside, self is Ray, so self.battery goes from 100 to 70.', stScene(cast, plan, bot('70', true), l3Tag('self', 300, 232, [386, 232], true)), ['b1', 'nm:self'], [5, 7]),
    stBeat('hoot', 'So a method can change what its object knows. That is the point of keeping them together.', stScene(cast, plan, bot('70')), ['b1', 'cls'], 5),
    stBeat('penny', 'What if work wrote battery = battery - 30, with no self?', stScene(cast, { tokens: [{ id: 'bad', x: 320, y: 200, text: 'battery = battery - 30', c: 'bad' }, { id: 'err', x: 320, y: 270, text: 'UnboundLocalError', c: 'bad' }] }), ['bad', 'err']),
    stBeat('hoot', 'Then battery is a plain name on work’s plate, gone when work returns. The object keeps only self. data.', stScene(cast, { boxes: [{ id: 'workP', x: 30, y: 170, w: 230, h: 90, rx: 18, text: 'battery = ?', size: 16, tag: 'work()', c: 'l' }] }, bot('100')), ['workP', 'b1']),
    stBeat('dot', 'Attributes are what it knows, methods are what it does, and self. ties them together.', stScene(cast, plan, bot('70')), ['cast:dot'], 8)
  ];
}
START_LESSON('attributes', {
  code: ST304_CODE, story: st304Story(),
  watch: { code: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = 100\n\n    def work(self):\n        self.battery = self.battery - 30\n\nbolt = Robot("Ray")\nbolt.work()\nbolt.work()\nprint(bolt.battery)\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = 100\n\n    def work(self):\n        self.battery = self.battery - 30\n\n    def charge(self):\n        self.battery = 100\n\nbolt = Robot("Ray")\nbolt.work()\nbolt.work()\nprint(bolt.battery)\nbolt.charge()\nprint(bolt.battery)\n',
    js: 'class Robot {\n  constructor(name) {\n    this.name = name;\n    this.battery = 100;\n  }\n  work() {\n    this.battery = this.battery - 30;\n  }\n  charge() {\n    this.battery = 100;\n  }\n}\n\nlet bolt = new Robot("Ray");\nbolt.work();\nbolt.work();\nconsole.log(bolt.battery);\nbolt.charge();\nconsole.log(bolt.battery);\n',
    goals: ['Press Run.', 'Add an attribute jobs that starts at 0 and goes up by 1 in work.', 'Write a method status(self) that returns the name and battery as one line of text.'] },
  check: { q: 'Which of these is a method of a Robot object?',
    choices: [['work(), which changes the battery', true, 'Right. A method is something the object can do. Attributes like name are what it knows.'], ['name', false, 'name is an attribute: data the object knows.'], ['battery', false, 'battery is an attribute: data the object knows.'], ['Robot', false, 'Robot is the class, the blueprint.']] }
});

// ---------- L3.5 Two names, one object ----------
const ST305_CODE = {
  py: ['class Robot:', '    def __init__(self, n): self.name = n', 'bolt = Robot("Ray")', 'twin = bolt', 'twin.name = "Twin"', 'print(bolt.name)', 'print(twin is bolt)'],
  js: ['class Robot {', '  constructor(n) { this.name = n; } }', 'let bolt = new Robot("Ray");', 'let twin = bolt;', 'twin.name = "Twin";', 'console.log(bolt.name);', 'console.log(twin === bolt);']
};
function st305Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const one = (name, lit, litName) => stScene(cast, l3Bot('b1', 380, 170, [['name', name]], { lit: litName ? ['name'] : [] }), l3Tag('bolt', 200, 175, [376, 190], lit === 'bolt'), l3Tag('twin', 200, 260, [376, 220], lit === 'twin'));
  return [
    stBeat('dot', 'I wanted a spare Ray, so I wrote twin = bolt. Now I have two robots, right?', stScene(cast, l3Bot('b1', 380, 170, [['name', '"Ray"']]), l3Tag('bolt', 200, 190, [376, 190])), ['cast:dot'], 3),
    stBeat('hoot', 'Look at the arrows. twin = bolt copies the arrow, not the robot. Both names point at one box.', one('"Ray"', 'twin'), ['ar:twin', 'ar:bolt', 'b1'], 3),
    stBeat('dot', 'So twin.name = "Twin" renames...', one('"Twin"', 'twin', true), ['b1'], 4),
    stBeat('hoot', 'The one and only robot. bolt.name is "Twin" now too. Two names, one object.', one('"Twin"', 'bolt'), ['nm:bolt', 'b1'], 5),
    stBeat('hoot', 'is asks: the same box? twin is bolt is True. For robots, == asks the same unless the class says more.', stScene(one('"Twin"'), { tokens: [{ id: 'is', x: 200, y: 330, text: 'twin is bolt → True', solid: true }] }), ['is'], 6),
    stBeat('penny', 'For a real second robot, build one: copy = Robot(bolt.name). Now there are two boxes.', stScene(cast, l3Bot('b1', 380, 130, [['name', '"Twin"']]), l3Bot('b2', 380, 250, [['name', '"Twin"']], { lit: ['name'] }), l3Tag('bolt', 200, 160, [376, 160]), l3Tag('copy', 200, 280, [376, 280], true)), ['b2', 'nm:copy']),
    stBeat('hoot', 'Arrows between objects build linked lists and graphs: each box points at the next one.', stScene(cast, { boxes: [{ id: 'n1', x: 40, y: 180, w: 120, h: 60, text: '3' }, { id: 'n2', x: 260, y: 180, w: 120, h: 60, text: '7' }, { id: 'n3', x: 480, y: 180, w: 120, h: 60, text: '9' }], arrows: [{ id: 'l1', from: [164, 210], to: [254, 210], c: 'a', label: 'next' }, { id: 'l2', from: [384, 210], to: [474, 210], c: 'a', label: 'next' }] }), ['l1', 'l2']),
    stBeat('dot', '= copies the arrow, never the object. For a new object, build a new one!', one('"Twin"'), ['cast:dot'])
  ];
}
START_LESSON('references', {
  code: ST305_CODE, story: st305Story(),
  watch: { code: 'class Robot:\n    def __init__(self, n):\n        self.name = n\n\nbolt = Robot("Ray")\ntwin = bolt\ntwin.name = "Twin"\nprint(bolt.name)\ncopy = Robot(bolt.name)\nprint(twin is bolt, copy is bolt)\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self, n):\n        self.name = n\n\nbolt = Robot("Ray")\ntwin = bolt\ntwin.name = "Twin"\nprint(bolt.name)\ncopy = Robot(bolt.name)\ncopy.name = "Copy"\nprint(bolt.name, copy.name)\nprint(twin is bolt, copy is bolt)\n',
    js: 'class Robot {\n  constructor(n) {\n    this.name = n;\n  }\n}\n\nlet bolt = new Robot("Ray");\nlet twin = bolt;\ntwin.name = "Twin";\nconsole.log(bolt.name);\nlet copy = new Robot(bolt.name);\ncopy.name = "Copy";\nconsole.log(bolt.name, copy.name);\nconsole.log(twin === bolt, copy === bolt);\n', differs: true,
    goals: ['Press Run and press Watch my code run to see the arrows.', 'Make a list team = [bolt, copy] and rename team[0]. Which robot changed?', 'Write a function rename(r, new) and call it on bolt. Does bolt change?'] },
  check: { q: 'b = a, where a points at a robot. Then b.name = "Kai". What is a.name?',
    choices: [['"Kai": a and b point at the same robot', true, 'Right. = copies the arrow, so both names reach the one object.'], ['Its old name: b is a copy', false, 'No copy was made. There is still only one robot.'], ['An error', false, 'Changing an object through any of its names is fine.'], ['None', false, 'The name was set to "Kai" on the shared object.']] }
});

// ---------- L3.6 Data the whole class shares ----------
const ST306_CODE = {
  py: ['class Robot:', '    maker = "Jay"', '    def __init__(self, name): self.name = name', 'bolt = Robot("Ray")', 'nova = Robot("Kim")', 'print(bolt.maker, nova.maker)', 'nova.maker = "Sam"', 'print(bolt.maker, nova.maker)'],
  js: ['class Robot {', '  constructor(name) { this.name = name; } }', 'Robot.prototype.maker = "Jay";', 'let bolt = new Robot("Ray");', 'let nova = new Robot("Kim");', 'console.log(bolt.maker, nova.maker);', 'nova.maker = "Sam";', 'console.log(bolt.maker, nova.maker);']
};
function st306Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const plan = (v, lit) => stObj('cls', 'class Robot', 30, 150, [['maker', v || '"Jay"']], { w: 210, tc: 'b', c: 'b', lit: lit ? ['maker'] : [] });
  const bots = (novaMaker) => stScene(l3Bot('b1', 400, 128, [['name', '"Ray"']]), l3Bot('b2', 400, 236, novaMaker ? [['name', '"Kim"'], ['maker', novaMaker]] : [['name', '"Kim"']], { lit: novaMaker ? ['maker'] : [] }));
  const up = (id, y) => ({ arrows: [{ id: 'up:' + id, from: [396, y], to: [244, 180], c: 'm', dash: true, thin: true, label: 'not here? ask the class', ly: -12 }] });
  return [
    stBeat('hoot', 'Every robot from my workshop carries the same maker stamp. Should each robot store its own copy?', stScene(cast, bots()), ['b1', 'b2']),
    stBeat('hoot', 'No. Put maker = "Jay" in the class itself. It is stored once, on the blueprint, for all of them.', stScene(cast, plan(), bots()), ['cls'], [1, 2]),
    stBeat('dot', 'But bolt.maker gives "Jay", and Ray’s box has no maker on it!', stScene(cast, plan(), bots(), { tokens: [{ id: 'ask', x: 140, y: 300, text: 'bolt.maker → "Jay"', solid: true }] }), ['ask', 'b1'], 5),
    stBeat('hoot', 'Python looks on the object first. Not there? It looks on the class. That is the lookup order.', stScene(cast, plan(null, true), bots(), up('b1', 160)), ['up:b1', 'cls']),
    stBeat('penny', 'Then nova.maker = "Sam" changes the stamp for everyone?', stScene(cast, plan(), bots()), ['cast:penny', 'b2'], 6),
    stBeat('hoot', 'No! Setting it through nova writes a new maker on Kim’s own box. It hides the class one, for Kim only.', stScene(cast, plan(), bots('"Sam"')), ['b2'], 6),
    stBeat('hoot', 'Ray still finds "Jay" on the class. To change it for every robot, set Robot.maker on the class.', stScene(cast, plan(), bots('"Sam"'), up('b1', 160)), ['up:b1', 'b1'], 7),
    stBeat('dot', 'Shared data lives on the class. Python checks the object first, then the class.', stScene(cast, plan(), bots()), ['cast:dot'])
  ];
}
START_LESSON('class-attributes', {
  code: ST306_CODE, story: st306Story(),
  watch: { code: 'class Robot:\n    maker = "Jay"\n\n    def __init__(self, name):\n        self.name = name\n\nbolt = Robot("Ray")\nnova = Robot("Kim")\nprint(bolt.maker, nova.maker)\nnova.maker = "Sam"\nprint(bolt.maker, nova.maker)\n', heap: true },
  tryit: { py: 'class Robot:\n    maker = "Jay"\n    count = 0\n\n    def __init__(self, name):\n        self.name = name\n        Robot.count = Robot.count + 1\n\nbolt = Robot("Ray")\nnova = Robot("Kim")\nprint(bolt.maker, Robot.count)\nnova.maker = "Sam"\nprint(bolt.maker, nova.maker)\n',
    js: 'class Robot {\n  static count = 0;\n  constructor(name) {\n    this.name = name;\n    Robot.count = Robot.count + 1;\n  }\n}\nRobot.prototype.maker = "Jay";\n\nlet bolt = new Robot("Ray");\nlet nova = new Robot("Kim");\nconsole.log(bolt.maker, Robot.count);\nnova.maker = "Sam";\nconsole.log(bolt.maker, nova.maker);\n',
    goals: ['Press Run. count goes up each time a robot is built.', 'Set Robot.maker = "Ana" at the end and print both makers.', 'Build a third robot. What is Robot.count now?'] },
  check: { q: 'maker = "Jay" is set on the Robot class. Then nova.maker = "Sam". What is bolt.maker?',
    choices: [['"Jay": nova got its own maker, the class kept "Jay"', true, 'Right. Setting through an object writes on that object only.'], ['"Sam": the class changed', false, 'nova.maker = ... writes on Kim’s box. The class is untouched.'], ['An error', false, 'bolt finds maker on the class, so no error.'], ['None', false, 'bolt.maker is found on the class: "Jay".']] }
});

// ---------- L3.7 Keeping data safe ----------
const ST307_CODE = {
  py: ['class Robot:', '    def __init__(self):', '        self._battery = 50', '    def charge(self, n):', '        if n > 0:', '            self._battery = min(100, self._battery + n)', 'bolt = Robot()', 'bolt.charge(80)', 'print(bolt._battery)'],
  js: ['class Robot {', '  constructor() {', '    this._battery = 50; }', '  charge(n) {', '    if (n > 0) {', '      this._battery = Math.min(100, this._battery + n); } } }', 'let bolt = new Robot();', 'bolt.charge(80);', 'console.log(bolt._battery);']
};
function st307Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const bot = (b, o) => l3Bot('b1', 400, 160, [['_battery', b]], o);
  const guard = { boxes: [{ id: 'guard', x: 30, y: 150, w: 260, h: 110, rx: 14, text: '', tag: 'charge(n)', tc: 'b', c: 'b' }], labels: [{ id: 'g1', x: 46, y: 200, text: 'n must be more than 0', anchor: 'start', size: 15, c: 't2' }, { id: 'g2', x: 46, y: 232, text: 'never past 100', anchor: 'start', size: 15, c: 't2' }] };
  return [
    stBeat('penny', 'Someone typed bolt.battery = -20. The log says Ray has less than nothing. That cannot happen!', stScene(cast, l3Bot('b1', 400, 160, [['battery', '-20']], { c: 'bad' })), ['b1', 'cast:penny']),
    stBeat('hoot', 'Let the object guard its own data. Every change goes through a method that checks it first.', stScene(cast, guard, bot('50'), { arrows: [{ id: 'gate', from: [294, 205], to: [396, 205], c: 'a' }] }), ['guard', 'gate'], 3),
    stBeat('hoot', 'charge(n) accepts only a positive n, and never lets the battery go past 100.', stScene(cast, st1Card('card', 20, 150, 600, ST307_CODE.py.slice(3, 6).map((l) => l.slice(4)), [1, 2])), ['card'], [4, 5]),
    stBeat('dot', 'charge(80) with 50 inside: 50 + 80 is 130, and min(100, 130) is 100. Full, never overfull.', stScene(cast, guard, bot('100', { lit: ['_battery'] }), { arrows: [{ id: 'gate', from: [294, 205], to: [396, 205], c: 'a', label: '80' }] }), ['b1'], 7),
    stBeat('dot', 'Why the underscore in _battery?', stScene(cast, bot('100')), ['b1', 'cast:dot']),
    stBeat('hoot', 'It is a polite sign that says inside use only. Python does not lock it. Good code respects the sign.', stScene(cast, bot('100'), { tokens: [{ id: 'sign', x: 160, y: 210, text: '_ means: please use the methods', w: 290, mono: false }] }), ['sign']),
    stBeat('hoot', 'To let others read it safely, add a property: bolt.battery reads _battery, but cannot set it.', stScene(cast, bot('100'), { tokens: [{ id: 'read', x: 170, y: 180, text: 'bolt.battery → 100', solid: true }, { id: 'set', x: 170, y: 260, text: 'bolt.battery = -20 → error', c: 'bad' }] }), ['read', 'set']),
    stBeat('dot', 'The object guards its own data, so it can never end up broken.', stScene(cast, guard, bot('100')), ['cast:dot'])
  ];
}
START_LESSON('encapsulation', {
  code: ST307_CODE, story: st307Story(),
  watch: { code: 'class Robot:\n    def __init__(self):\n        self._battery = 50\n\n    def charge(self, n):\n        if n > 0:\n            self._battery = min(100, self._battery + n)\n\nbolt = Robot()\nbolt.charge(80)\nbolt.charge(-30)\nprint(bolt._battery)\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self):\n        self._battery = 50\n\n    def charge(self, n):\n        if n > 0:\n            self._battery = min(100, self._battery + n)\n\n    @property\n    def battery(self):\n        return self._battery\n\nbolt = Robot()\nbolt.charge(80)\nbolt.charge(-30)\nprint(bolt.battery)\n',
    js: 'class Robot {\n  constructor() {\n    this._battery = 50;\n  }\n  charge(n) {\n    if (n > 0) {\n      this._battery = Math.min(100, this._battery + n);\n    }\n  }\n  get battery() {\n    return this._battery;\n  }\n}\n\nlet bolt = new Robot();\nbolt.charge(80);\nbolt.charge(-30);\nconsole.log(bolt.battery);\n',
    goals: ['Press Run. Did charge(-30) change anything?', 'Write a method use(n) that never lets the battery go below 0.', 'Try bolt.battery = 5 at the end and read the error.'] },
  check: { q: 'What does the underscore in self._battery do?',
    choices: [['It is a sign that says use the methods, not this name directly', true, 'Right. Python does not lock it. The methods are where the checks live.'], ['It locks the value so nothing can change it', false, 'Nothing is locked. It is only a polite sign.'], ['It makes the value shared by every robot', false, 'Shared data lives on the class. The underscore is only a naming habit.'], ['It is required by Python', false, 'It is a habit, not a rule.']] }
});
