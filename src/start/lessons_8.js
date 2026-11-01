// Level 3, lessons 1 to 7: blueprints and objects, self, __init__, attributes and methods, references, shared class
// data, and guarded data. One world all the way through Level 3: the robot workshop, where you build robots
// from a blueprint, and the first robot is Mira. Every object is a box, every name has an arrow. Every word is our own.

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
  py: ['class Robot:', '    pass', 'robot1 = Robot()', 'robot2 = Robot()', 'robot1.name = "Mira"', 'robot2.name = "Kofi"', 'print(robot1.name, robot2.name)'],
  js: ['class Robot {', '}', 'let robot1 = new Robot();', 'let robot2 = new Robot();', 'robot1.name = "Mira";', 'robot2.name = "Kofi";', 'console.log(robot1.name, robot2.name);']
};
function st301Story() {
  const cast = l3Cast([['hoot', 60], ['dot', 580]]);
  const plan = (x, y) => l3Class(x, y, ['a robot has', 'a name'], { w: 170 });
  const two = (bn, nn, lit) => stScene(cast, plan(20, 150), l3Bot('b1', 410, 128, bn ? [['name', bn]] : [], { lit: lit === 'b' ? ['name'] : [] }), l3Bot('b2', 410, 250, nn ? [['name', nn]] : [], { lit: lit === 'n' ? ['name'] : [] }),
    l3Tag('robot1', 300, 160, [406, 160], lit === 'b'), l3Tag('robot2', 300, 282, [406, 282], lit === 'n'));
  return [
    stBeat('hoot', 'In this workshop, every robot is built from one blueprint, pinned to the wall.', stScene(cast, plan(230, 170)), ['cls']),
    stBeat('dot', 'So the blueprint is a robot?', stScene(cast, plan(230, 170)), ['cls', 'cast:dot']),
    stBeat('hoot', 'No. class Robot: is only the plan. The line pass means nothing inside yet. You cannot charge a drawing.', stScene(cast, plan(20, 150), st1Card('card', 250, 150, 360, ST301_CODE.py.slice(0, 2), [0, 1])), ['cls', 'card'], [0, 1]),
    stBeat('hoot', 'Robot() builds a real robot from the plan. A robot built this way is called an object.', stScene(cast, plan(20, 150), l3Bot('b1', 410, 128, [])), ['b1'], 2),
    stBeat('hoot', 'The picture changes here. A name is no longer a box with a value. Now robot1 is a name with an arrow to the object.', stScene(cast, plan(20, 150), l3Bot('b1', 410, 128, []), l3Tag('robot1', 300, 160, [406, 160], true)), ['nm:robot1', 'ar:robot1', 'b1'], 2),
    stBeat('dot', 'Robot() again builds a second, separate robot. robot2 points at that one.', stScene(cast, plan(20, 150), l3Bot('b1', 410, 128, []), l3Tag('robot1', 300, 160, [406, 160]), l3Bot('b2', 410, 250, []), l3Tag('robot2', 300, 282, [406, 282], true)), ['b2', 'nm:robot2'], 3),
    stBeat('hoot', 'robot1.name = "Mira" adds a name to that object. The dot means: this object’s name. Only this robot gets it.', two('"Mira"', null, 'b'), ['b1'], 4),
    stBeat('hoot', 'The other box is a second robot. Same blueprint, two different robots.', two('"Mira"', '"Kofi"', 'n'), ['b1', 'b2'], [5, 6]),
    stBeat('dot', 'One blueprint, many objects, each with its own data!', two('"Mira"', '"Kofi"'), ['cast:dot'], 6)
  ];
}
START_LESSON('objects', {
  code: ST301_CODE, story: st301Story(),
  watch: { code: 'class Robot:\n    pass\n\nrobot1 = Robot()\nrobot2 = Robot()\nrobot1.name = "Mira"\nrobot2.name = "Kofi"\nprint(robot1.name, robot2.name)\n', heap: true },
  tryit: { py: 'class Robot:\n    pass\n\nrobot1 = Robot()\nrobot2 = Robot()\nrobot1.name = "Mira"\nrobot2.name = "Kofi"\nprint(robot1.name, robot2.name)\nprint(robot1 is robot2)\n',
    js: 'class Robot {\n}\n\nlet robot1 = new Robot();\nlet robot2 = new Robot();\nrobot1.name = "Mira";\nrobot2.name = "Kofi";\nconsole.log(robot1.name, robot2.name);\nconsole.log(robot1 === robot2);\n', differs: true,
    goals: ['Press Run.', 'Build a third robot called Kai and give it a name.', 'Give only robot1 a size. What happens when you print robot2.size?'] },
  check: { q: 'You write class Robot: and then robot1 = Robot() and robot2 = Robot(). How many robot objects are there?',
    choices: [['Two, each with its own data', true, 'Right. The class is the blueprint. Each Robot() builds one new object.'], ['One: the class', false, 'The class is only the plan. It is not a robot object.'], ['Three: the class and two robots', false, 'The class describes robots but is not one of them.'], ['None until they have a name', false, 'Robot() builds the object straight away, even with no data on it.']] }
});

// ---------- L3.2 self: which robot is it? ----------
const ST302_CODE = {
  py: ['class Robot:', '    def beep(self):', '        print(self.name, "says beep")', 'robot1 = Robot()', 'robot1.name = "Mira"', 'robot1.beep()'],
  js: ['class Robot {', '  beep() {', '    console.log(this.name, "says beep"); } }', 'let robot1 = new Robot();', 'robot1.name = "Mira";', 'robot1.beep();']
};
function st302Story() {
  const cast = l3Cast([['hoot', 60], ['dot', 580]]);
  const plan = l3Class(20, 140, ['def beep(self):', '  print(self.name)'], { w: 250 });
  const bots = (selfAt) => stScene(l3Bot('b1', 410, 128, [['name', '"Mira"']]), l3Bot('b2', 410, 250, [['name', '"Kofi"']]),
    selfAt ? l3Tag('self', 300, selfAt === 'b1' ? 175 : 295, [406, selfAt === 'b1' ? 175 : 290], true) : null);
  return [
    stBeat('dot', 'Why does def beep(self) have self in it?', stScene(cast, st1Card('card', 60, 140, 520, ST302_CODE.py.slice(0, 3), [1])), ['card'], 1),
    stBeat('hoot', 'A function that lives in a class is called a method. It has to know which robot it is working on.', stScene(cast, plan, bots()), ['cls']),
    stBeat('hoot', 'robot1.beep() is how you call it. Python reads it as Robot.beep(robot1): the object goes in first.', stScene(cast, { tokens: [{ id: 'call', x: 180, y: 210, text: 'robot1.beep()', solid: true }, { id: 'real', x: 450, y: 210, text: 'Robot.beep(robot1)' }], arrows: [{ id: 'same', from: [260, 210], to: [358, 210], c: 'a', label: 'means' }] }), ['call', 'real'], 5),
    stBeat('hoot', 'Inside beep, self points at robot1. So self.name is "Mira".', stScene(cast, plan, bots('b1')), ['nm:self', 'ar:self', 'b1'], 2),
    stBeat('dot', 'And robot2.beep() runs the very same method, with self pointing at Kofi!', stScene(cast, plan, bots('b2')), ['nm:self', 'ar:self', 'b2']),
    stBeat('hoot', 'One method in the blueprint, any number of objects. self is how it knows which one called.', stScene(cast, plan, bots()), ['cls', 'b1', 'b2']),
    stBeat('dot', 'What if I write def beep(): with no self?', stScene(cast, { tokens: [{ id: 'bad', x: 320, y: 210, text: 'TypeError: beep() takes 0 positional arguments but 1 was given', size: 14, c: 'bad' }] }), ['bad', 'cast:dot']),
    stBeat('hoot', 'Python still hands the object in. With no self, there is nowhere to put it, so you get a TypeError.', stScene(cast, st1Card('card', 60, 140, 520, [ST302_CODE.py[1]], [0])), ['card'], 1)
  ];
}
START_LESSON('self', {
  code: ST302_CODE, story: st302Story(),
  watch: { code: 'class Robot:\n    def beep(self):\n        print(self.name, "says beep")\n\nrobot1 = Robot()\nrobot1.name = "Mira"\nrobot2 = Robot()\nrobot2.name = "Kofi"\nrobot1.beep()\nrobot2.beep()\n', heap: true },
  tryit: { py: 'class Robot:\n    def beep(self):\n        print(self.name, "says beep")\n\nrobot1 = Robot()\nrobot1.name = "Mira"\nrobot2 = Robot()\nrobot2.name = "Kofi"\nrobot1.beep()\nrobot2.beep()\nRobot.beep(robot1)\n',
    js: 'class Robot {\n  beep() {\n    console.log(this.name, "says beep");\n  }\n}\n\nlet robot1 = new Robot();\nrobot1.name = "Mira";\nlet robot2 = new Robot();\nrobot2.name = "Kofi";\nrobot1.beep();\nrobot2.beep();\nRobot.prototype.beep.call(robot1);\n',
    goals: ['Press Run. The last line calls beep the long way.', 'Add a method shout(self, word) that prints the name and the word.', 'Remove self from def beep and read the error.'] },
  check: { q: 'In robot1.beep(), what is self inside beep?',
    choices: [['The robot1 object, the one the method was called on', true, 'Right. Python passes the object in as the first value, and self is its name inside.'], ['The Robot class', false, 'self is one object, not the blueprint.'], ['A new robot made for the call', false, 'No new robot is built. self points at the one that called.'], ['Nothing until you set it', false, 'Python fills self in for you on every method call.']] }
});

// ---------- L3.3 Setting up a new object ----------
const ST303_CODE = {
  py: ['class Robot:', '    def __init__(self, name):', '        self.name = name', '        self.battery = 100', 'robot1 = Robot("Mira")', 'print(robot1.name, robot1.battery)'],
  js: ['class Robot {', '  constructor(name) {', '    this.name = name;', '    this.battery = 100; } }', 'let robot1 = new Robot("Mira");', 'console.log(robot1.name, robot1.battery);']
};
function st303Story() {
  const cast = l3Cast([['hoot', 60], ['dot', 580]]);
  const plate = (vars) => stScene({ boxes: [{ id: 'initP', x: 20, y: 160, w: 250, h: 130, rx: 18, text: '', tag: '__init__()', tc: 'a', c: 'a' }] },
    { tokens: [{ id: 'selfT', x: 90, y: 200, text: 'self', w: 90 }], arrows: [{ id: 'selfA', from: [139, 200], to: [376, 200], c: 'a' }] }, vars ? { boxes: [stVar('nameV', 'name', '"Mira"', 40, 228, { w: 160, h: 50, size: 18 })] } : null);
  const bot = (fields, lit) => l3Bot('b1', 380, 160, fields, { lit });
  return [
    stBeat('dot', 'Every new robot needs a name and a full battery. Setting them by hand after each Robot() is boring.', stScene(cast, bot([])), ['b1', 'cast:dot']),
    stBeat('hoot', 'Write __init__. Python calls it once, right after it builds a brand-new, empty object.', stScene(cast, st1Card('card', 40, 140, 560, ST303_CODE.py.slice(0, 4), [1, 2, 3])), ['card'], [1, 2, 3]),
    stBeat('hoot', 'Robot("Mira") first builds an empty box. Then __init__ runs with self pointing at it and name holding "Mira".', stScene(cast, plate(true), bot([])), ['selfA', 'nameV', 'b1'], 4),
    stBeat('hoot', 'self.name = name writes the name onto the new object.', stScene(cast, plate(true), bot([['name', '"Mira"']], ['name'])), ['b1'], 2),
    stBeat('hoot', 'self.battery = 100 adds a full battery. Now the robot is set up.', stScene(cast, plate(true), bot([['name', '"Mira"'], ['battery', '100']], ['battery'])), ['b1'], 3),
    stBeat('dot', 'So __init__ does not build the robot. It sets up the one Python already built?', stScene(cast, bot([['name', '"Mira"'], ['battery', '100']]), l3Tag('robot1', 250, 190, [376, 190], true)), ['nm:robot1', 'cast:dot'], 4),
    stBeat('hoot', 'Exactly. Without self., name = name makes a plain name that vanishes when __init__ ends.', stScene(cast, plate(true), bot([]), { tokens: [{ id: 'oops', x: 145, y: 320, text: 'name = name', c: 'bad' }] }), ['oops', 'b1']),
    stBeat('dot', 'Python builds the object, __init__ fills it in. Every new robot starts ready!', stScene(cast, bot([['name', '"Mira"'], ['battery', '100']]), l3Tag('robot1', 250, 190, [376, 190])), ['cast:dot'], 5)
  ];
}
START_LESSON('init', {
  code: ST303_CODE, story: st303Story(),
  watch: { code: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = 100\n\nrobot1 = Robot("Mira")\nrobot2 = Robot("Kofi")\nprint(robot1.name, robot1.battery)\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = 100\n\nrobot1 = Robot("Mira")\nrobot2 = Robot("Kofi")\nprint(robot1.name, robot1.battery)\nprint(robot2.name, robot2.battery)\n',
    js: 'class Robot {\n  constructor(name) {\n    this.name = name;\n    this.battery = 100;\n  }\n}\n\nlet robot1 = new Robot("Mira");\nlet robot2 = new Robot("Kofi");\nconsole.log(robot1.name, robot1.battery);\nconsole.log(robot2.name, robot2.battery);\n',
    goals: ['Press Run.', 'Add a second parameter, size, and store it on the robot.', 'Change self.name = name to name = name. What does print(robot1.name) say now?'] },
  check: { q: 'What does __init__ do?',
    choices: [['Fills in the starting data of an object Python has just built', true, 'Right. Python builds the empty object, then calls __init__ with self pointing at it.'], ['Builds the object out of nothing', false, 'Python has already built it by the time __init__ runs.'], ['Runs every time you use the object', false, 'It runs once, when the object is built.'], ['Deletes the old object', false, 'It only sets up the new one.']] }
});

// ---------- L3.4 What it knows, what it does ----------
const ST304_CODE = {
  py: ['class Robot:', '    def __init__(self, name):', '        self.name = name', '        self.battery = 100', '    def work(self):', '        self.battery = self.battery - 30', 'robot1 = Robot("Mira")', 'robot1.work()', 'print(robot1.battery)'],
  js: ['class Robot {', '  constructor(name) {', '    this.name = name;', '    this.battery = 100; }', '  work() {', '    this.battery = this.battery - 30; } }', 'let robot1 = new Robot("Mira");', 'robot1.work();', 'console.log(robot1.battery);']
};
function st304Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const plan = l3Class(20, 150, ['__init__(self, name)', 'work(self)'], { w: 230 });
  const bot = (b, lit) => l3Bot('b1', 390, 150, [['name', '"Mira"'], ['battery', b]], { lit: lit ? ['battery'] : [] });
  return [
    stBeat('penny', 'I keep the workshop log. What does the robot know, and what can it do?', stScene(cast, plan, bot('100')), ['cast:penny']),
    stBeat('hoot', 'What it knows are attributes: data stored on the object, like name and battery.', stScene(cast, plan, bot('100')), ['b1'], [2, 3]),
    stBeat('hoot', 'What it can do are methods: functions in the class, like work(). Think of them as its buttons.', stScene(cast, plan, bot('100')), ['cls'], [4, 5]),
    stBeat('hoot', 'robot1.work() presses the button. Inside, self is robot1, so self.battery goes from 100 to 70.', stScene(cast, plan, bot('70', true), l3Tag('self', 300, 232, [386, 232], true)), ['b1', 'nm:self'], [5, 7]),
    stBeat('hoot', 'So a method can change what its object knows. That is the point of keeping them together.', stScene(cast, plan, bot('70')), ['b1', 'cls'], 5),
    stBeat('penny', 'What if work wrote battery = battery - 30, with no self?', stScene(cast, { tokens: [{ id: 'bad', x: 320, y: 200, text: 'battery = battery - 30', c: 'bad' }, { id: 'err', x: 320, y: 270, text: 'UnboundLocalError', c: 'bad' }] }), ['bad', 'err']),
    stBeat('hoot', 'A plain name inside work is lost when work ends. Only self.battery stays on the object.', stScene(cast, { boxes: [{ id: 'workP', x: 30, y: 170, w: 230, h: 90, rx: 18, text: 'battery = ?', size: 16, tag: 'work()', c: 'l' }] }, bot('100')), ['workP', 'b1']),
    stBeat('dot', 'Attributes are what it knows, methods are what it does, and self. ties them together.', stScene(cast, plan, bot('70')), ['cast:dot'], 8)
  ];
}
START_LESSON('attributes', {
  code: ST304_CODE, story: st304Story(),
  watch: { code: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = 100\n\n    def work(self):\n        self.battery = self.battery - 30\n\nrobot1 = Robot("Mira")\nrobot1.work()\nrobot1.work()\nprint(robot1.battery)\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = 100\n\n    def work(self):\n        self.battery = self.battery - 30\n\n    def charge(self):\n        self.battery = 100\n\nrobot1 = Robot("Mira")\nrobot1.work()\nrobot1.work()\nprint(robot1.battery)\nrobot1.charge()\nprint(robot1.battery)\n',
    js: 'class Robot {\n  constructor(name) {\n    this.name = name;\n    this.battery = 100;\n  }\n  work() {\n    this.battery = this.battery - 30;\n  }\n  charge() {\n    this.battery = 100;\n  }\n}\n\nlet robot1 = new Robot("Mira");\nrobot1.work();\nrobot1.work();\nconsole.log(robot1.battery);\nrobot1.charge();\nconsole.log(robot1.battery);\n',
    goals: ['Press Run.', 'Add an attribute jobs that starts at 0 and goes up by 1 in work.', 'Write a method status(self) that returns the name and battery as one line of text.'] },
  check: { q: 'Which of these is a method of a Robot object?',
    choices: [['work(), which changes the battery', true, 'Right. A method is something the object can do. Attributes like name are what it knows.'], ['name', false, 'name is an attribute: data the object knows.'], ['battery', false, 'battery is an attribute: data the object knows.'], ['Robot', false, 'Robot is the class, the blueprint.']] }
});

// ---------- L3.5 Two names, one object ----------
const ST305_CODE = {
  py: ['class Robot:', '    def __init__(self, n):', '        self.name = n', 'robot1 = Robot("Mira")', 'twin = robot1', 'twin.name = "Twin"', 'print(robot1.name)', 'print(twin is robot1)'],
  js: ['class Robot {', '  constructor(n) {', '    this.name = n; } }', 'let robot1 = new Robot("Mira");', 'let twin = robot1;', 'twin.name = "Twin";', 'console.log(robot1.name);', 'console.log(twin === robot1);']
};
function st305Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const one = (name, lit, litName) => stScene(cast, l3Bot('b1', 380, 170, [['name', name]], { lit: litName ? ['name'] : [] }), l3Tag('robot1', 200, 175, [376, 190], lit === 'robot1'), l3Tag('twin', 200, 260, [376, 220], lit === 'twin'));
  return [
    stBeat('dot', 'I wanted a spare Mira, so I wrote twin = robot1. Now I have two robots, right?', stScene(cast, l3Bot('b1', 380, 170, [['name', '"Mira"']]), l3Tag('robot1', 200, 190, [376, 190])), ['cast:dot'], 4),
    stBeat('hoot', 'Look at the arrows. twin = robot1 copies the arrow, not the robot. Both names point at one box.', one('"Mira"', 'twin'), ['ar:twin', 'ar:robot1', 'b1'], 4),
    stBeat('dot', 'So does twin.name = "Twin" rename a second robot?', one('"Twin"', 'twin', true), ['b1'], 5),
    stBeat('hoot', 'The one and only robot. robot1.name is "Twin" now too. Two names, one object.', one('"Twin"', 'robot1'), ['nm:robot1', 'b1'], 6),
    stBeat('hoot', 'is asks: do both names point at the same robot? twin is robot1 is True.', stScene(one('"Twin"'), { tokens: [{ id: 'is', x: 200, y: 330, text: 'twin is robot1 → True', solid: true }] }), ['is'], 7),
    stBeat('penny', 'For a real second robot, build one: copy = Robot(robot1.name). Now there are two boxes.', stScene(cast, l3Bot('b1', 380, 130, [['name', '"Twin"']]), l3Bot('b2', 380, 250, [['name', '"Twin"']], { lit: ['name'] }), l3Tag('robot1', 200, 160, [376, 160]), l3Tag('copy', 200, 280, [376, 280], true)), ['b2', 'nm:copy']),
    stBeat('dot', '= copies the arrow, never the object. For a new object, build a new one!', one('"Twin"'), ['cast:dot'])
  ];
}
START_LESSON('references', {
  code: ST305_CODE, story: st305Story(),
  watch: { code: 'class Robot:\n    def __init__(self, n):\n        self.name = n\n\nrobot1 = Robot("Mira")\ntwin = robot1\ntwin.name = "Twin"\nprint(robot1.name)\ncopy = Robot(robot1.name)\nprint(twin is robot1, copy is robot1)\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self, n):\n        self.name = n\n\nrobot1 = Robot("Mira")\ntwin = robot1\ntwin.name = "Twin"\nprint(robot1.name)\ncopy = Robot(robot1.name)\ncopy.name = "Copy"\nprint(robot1.name, copy.name)\nprint(twin is robot1, copy is robot1)\n',
    js: 'class Robot {\n  constructor(n) {\n    this.name = n;\n  }\n}\n\nlet robot1 = new Robot("Mira");\nlet twin = robot1;\ntwin.name = "Twin";\nconsole.log(robot1.name);\nlet copy = new Robot(robot1.name);\ncopy.name = "Copy";\nconsole.log(robot1.name, copy.name);\nconsole.log(twin === robot1, copy === robot1);\n', differs: true,
    goals: ['Press Run and press Watch my code run to see the arrows.', 'Make a list team = [robot1, copy] and rename team[0]. Which robot changed?', 'Write a function rename(r, new) and call it on robot1. Does robot1 change?'] },
  check: { q: 'b = a, where a points at a robot. Then b.name = "Kai". What is a.name?',
    choices: [['"Kai": a and b point at the same robot', true, 'Right. = copies the arrow, so both names reach the one object.'], ['Its old name: b is a copy', false, 'No copy was made. There is still only one robot.'], ['An error', false, 'Changing an object through any of its names is fine.'], ['None', false, 'The name was set to "Kai" on the shared object.']] }
});

// ---------- L3.6 Data the whole class shares ----------
const ST306_CODE = {
  py: ['class Robot:', '    maker = "Hana"', '    def __init__(self, name): self.name = name', 'robot1 = Robot("Mira")', 'robot2 = Robot("Kofi")', 'print(robot1.maker, robot2.maker)', 'robot2.maker = "Maria"', 'print(robot1.maker, robot2.maker)'],
  js: ['class Robot {', '  constructor(name) { this.name = name; } }', 'Robot.prototype.maker = "Hana";', 'let robot1 = new Robot("Mira");', 'let robot2 = new Robot("Kofi");', 'console.log(robot1.maker, robot2.maker);', 'robot2.maker = "Maria";', 'console.log(robot1.maker, robot2.maker);']
};
function st306Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const plan = (v, lit) => stObj('cls', 'class Robot', 30, 150, [['maker', v || '"Hana"']], { w: 210, tc: 'b', c: 'b', lit: lit ? ['maker'] : [] });
  const bots = (novaMaker) => stScene(l3Bot('b1', 400, 128, [['name', '"Mira"']]), l3Bot('b2', 400, 236, novaMaker ? [['name', '"Kofi"'], ['maker', novaMaker]] : [['name', '"Kofi"']], { lit: novaMaker ? ['maker'] : [] }));
  const up = (id, y) => ({ arrows: [{ id: 'up:' + id, from: [396, y], to: [244, 180], c: 'm', dash: true, thin: true, label: 'not here? ask the class', ly: -12 }] });
  return [
    stBeat('hoot', 'Every robot from my workshop carries the same maker stamp. Should each robot store its own copy?', stScene(cast, bots()), ['b1', 'b2']),
    stBeat('hoot', 'No. Put maker = "Hana" in the class itself. It is stored once, on the blueprint, for all of them.', stScene(cast, plan(), bots()), ['cls'], [1, 2]),
    stBeat('dot', 'But robot1.maker gives "Hana", and Mira’s box has no maker on it!', stScene(cast, plan(), bots(), { tokens: [{ id: 'ask', x: 140, y: 300, text: 'robot1.maker → "Hana"', solid: true }] }), ['ask', 'b1'], 5),
    stBeat('hoot', 'Python looks on the object first. Not there? It looks on the class. That is the search order.', stScene(cast, plan(null, true), bots(), up('b1', 160)), ['up:b1', 'cls']),
    stBeat('penny', 'Then robot2.maker = "Maria" changes the stamp for everyone?', stScene(cast, plan(), bots()), ['cast:penny', 'b2'], 6),
    stBeat('hoot', 'No! Setting it through robot2 writes a new maker on Kofi’s own box. It hides the class one, for Kofi only.', stScene(cast, plan(), bots('"Maria"')), ['b2'], 6),
    stBeat('hoot', 'Mira still finds "Hana" on the class. To change it for all, write Robot.maker = "Priya", using the class name.', stScene(cast, plan(), bots('"Maria"'), up('b1', 160)), ['up:b1', 'b1'], 7),
    stBeat('hoot', 'A counter on the class counts all robots. Robot.count = Robot.count + 1 inside __init__ adds 1 for each new robot.', stScene(cast, plan(), bots()), ['cls']),
    stBeat('dot', 'Shared data lives on the class. Python checks the object first, then the class.', stScene(cast, plan(), bots()), ['cast:dot'])
  ];
}
START_LESSON('class-attributes', {
  code: ST306_CODE, story: st306Story(),
  watch: { code: 'class Robot:\n    maker = "Hana"\n\n    def __init__(self, name):\n        self.name = name\n\nrobot1 = Robot("Mira")\nrobot2 = Robot("Kofi")\nprint(robot1.maker, robot2.maker)\nrobot2.maker = "Maria"\nprint(robot1.maker, robot2.maker)\n', heap: true },
  tryit: { py: 'class Robot:\n    maker = "Hana"\n    count = 0\n\n    def __init__(self, name):\n        self.name = name\n        Robot.count = Robot.count + 1\n\nrobot1 = Robot("Mira")\nrobot2 = Robot("Kofi")\nprint(robot1.maker, Robot.count)\nrobot2.maker = "Maria"\nprint(robot1.maker, robot2.maker)\n',
    js: 'class Robot {\n  static count = 0;\n  constructor(name) {\n    this.name = name;\n    Robot.count = Robot.count + 1;\n  }\n}\nRobot.prototype.maker = "Hana";\n\nlet robot1 = new Robot("Mira");\nlet robot2 = new Robot("Kofi");\nconsole.log(robot1.maker, Robot.count);\nrobot2.maker = "Maria";\nconsole.log(robot1.maker, robot2.maker);\n',
    goals: ['Press Run. count goes up each time a robot is built.', 'Set Robot.maker = "Priya" at the end and print both makers.', 'Build a third robot. What is Robot.count now?'] },
  check: { q: 'maker = "Hana" is set on the Robot class. Then robot2.maker = "Maria". What is robot1.maker?',
    choices: [['"Hana": robot2 got its own maker, the class kept "Hana"', true, 'Right. Setting through an object writes on that object only.'], ['"Maria": the class changed', false, 'robot2.maker = ... writes on Kofi’s box. The class is untouched.'], ['An error', false, 'robot1 finds maker on the class, so no error.'], ['None', false, 'robot1.maker is found on the class: "Hana".']] }
});

// ---------- L3.7 Keeping data safe ----------
const ST307_CODE = {
  py: ['class Robot:', '    def __init__(self):', '        self._battery = 50', '    def charge(self, n):', '        if n > 0:', '            self._battery = min(100, self._battery + n)', 'robot1 = Robot()', 'robot1.charge(80)', 'print(robot1._battery)'],
  js: ['class Robot {', '  constructor() {', '    this._battery = 50; }', '  charge(n) {', '    if (n > 0) {', '      this._battery = Math.min(100, this._battery + n); } } }', 'let robot1 = new Robot();', 'robot1.charge(80);', 'console.log(robot1._battery);']
};
function st307Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const bot = (b, o) => l3Bot('b1', 400, 160, [['_battery', b]], o);
  const guard = { boxes: [{ id: 'guard', x: 30, y: 150, w: 260, h: 110, rx: 14, text: '', tag: 'charge(n)', tc: 'b', c: 'b' }], labels: [{ id: 'g1', x: 46, y: 200, text: 'n must be more than 0', anchor: 'start', size: 15, c: 't2' }, { id: 'g2', x: 46, y: 232, text: 'never past 100', anchor: 'start', size: 15, c: 't2' }] };
  return [
    stBeat('penny', 'Someone typed robot1.battery = -20. The log says Mira has a battery below zero. That cannot happen!', stScene(cast, l3Bot('b1', 400, 160, [['battery', '-20']], { c: 'bad' })), ['b1', 'cast:penny']),
    stBeat('hoot', 'Let the object guard its own data. Every change goes through a method that checks it first.', stScene(cast, guard, bot('50'), { arrows: [{ id: 'gate', from: [294, 205], to: [396, 205], c: 'a' }] }), ['guard', 'gate'], 3),
    stBeat('hoot', 'charge(n) accepts only a positive n. min(100, x) picks the smaller one, so the battery never passes 100.', stScene(cast, st1Card('card', 20, 150, 600, ST307_CODE.py.slice(3, 6).map((l) => l.slice(4)), [1, 2])), ['card'], [4, 5]),
    stBeat('hoot', 'charge(80) with 50 inside: 50 + 80 is 130, and min(100, 130) is 100. Full, never overfull.', stScene(cast, guard, bot('100', { lit: ['_battery'] }), { arrows: [{ id: 'gate', from: [294, 205], to: [396, 205], c: 'a', label: '80' }] }), ['b1'], 7),
    stBeat('dot', 'Why the underscore in _battery?', stScene(cast, bot('100')), ['b1', 'cast:dot']),
    stBeat('hoot', 'It is a polite sign for use inside the class only. Python does not lock it. Good code respects the sign.', stScene(cast, bot('100'), { tokens: [{ id: 'sign', x: 160, y: 210, text: '_ means: please use the methods', w: 290, mono: false }] }), ['sign']),
    stBeat('hoot', 'To let others read it, add a small method that returns it: def battery(self): return self._battery.', stScene(cast, bot('100'), { tokens: [{ id: 'read', x: 170, y: 200, text: 'robot1.battery() → 100', solid: true }] }), ['read']),
    stBeat('dot', 'The object guards its own data, so it stays valid when everyone uses the methods.', stScene(cast, guard, bot('100')), ['cast:dot'])
  ];
}
START_LESSON('encapsulation', {
  code: ST307_CODE, story: st307Story(),
  watch: { code: 'class Robot:\n    def __init__(self):\n        self._battery = 50\n\n    def charge(self, n):\n        if n > 0:\n            self._battery = min(100, self._battery + n)\n\nrobot1 = Robot()\nrobot1.charge(80)\nrobot1.charge(-30)\nprint(robot1._battery)\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self):\n        self._battery = 50\n\n    def charge(self, n):\n        if n > 0:\n            self._battery = min(100, self._battery + n)\n\n    def battery(self):\n        return self._battery\n\nrobot1 = Robot()\nrobot1.charge(80)\nrobot1.charge(-30)\nprint(robot1.battery())\n',
    js: 'class Robot {\n  constructor() {\n    this._battery = 50;\n  }\n  charge(n) {\n    if (n > 0) {\n      this._battery = Math.min(100, this._battery + n);\n    }\n  }\n  battery() {\n    return this._battery;\n  }\n}\n\nlet robot1 = new Robot();\nrobot1.charge(80);\nrobot1.charge(-30);\nconsole.log(robot1.battery());\n',
    goals: ['Press Run. Did charge(-30) change anything?', 'Write a method use(n) that never lets the battery go below 0.', 'Set robot1._battery = -20 at the end. Python lets you. Why is that a bad habit?'] },
  check: { q: 'What does the underscore in self._battery do?',
    choices: [['It is a sign that says use the methods, not this name directly', true, 'Right. Python does not lock it. The methods are where the checks live.'], ['It locks the value so nothing can change it', false, 'Nothing is locked. It is only a polite sign.'], ['It makes the value shared by every robot', false, 'Shared data lives on the class. The underscore is only a naming habit.'], ['It is required by Python', false, 'It is a habit, not a rule.']] }
});
