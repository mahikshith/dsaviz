// Level 3, lessons 8 to 14: the family tree, override and super(), the same call doing different things, parts,
// special methods, contracts, and when not to use a class. Still the robot workshop. Every word is our own.

// ---------- L3.8 The family tree ----------
const ST308_CODE = {
  py: ['class Robot:', '    def __init__(self, name):', '        self.name = name', '    def beep(self):', '        print(self.name, "beeps")', 'class Cleaner(Robot):', '    def sweep(self):', '        print(self.name, "sweeps")', 'mop = Cleaner("Eli")', 'mop.beep()', 'mop.sweep()'],
  js: ['class Robot {', '  constructor(name) {', '    this.name = name; }', '  beep() {', '    console.log(this.name, "beeps"); } }', 'class Cleaner extends Robot {', '  sweep() {', '    console.log(this.name, "sweeps"); } }', 'let mop = new Cleaner("Eli");', 'mop.beep();', 'mop.sweep();']
};
function st308Story() {
  const cast = l3Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const tree = (kids, lit) => stFamily([['robot', 'Robot', 245, 140]].concat(kids.map(([id, name], i) => [id, name, kids.length === 1 ? 245 : 90 + i * 310, 270, 'robot'])), { lit });
  const notes = (o) => ({ labels: [{ id: 'rn', x: 405, y: 172, text: o.r || '__init__, beep', anchor: 'start', size: 15, mono: true, c: 't2' }].concat(o.c ? [{ id: 'cn', x: o.cx || 405, y: 302, text: o.c, anchor: 'start', size: 15, mono: true, c: 't2' }] : []) });
  return [
    stBeat('dot', 'Our guide wants a cleaning robot. It beeps like every robot, and it also sweeps. Copy the whole Robot class?', stScene(cast, tree([]), notes({})), ['cls:robot', 'cast:dot']),
    stBeat('hoot', 'No copying. Write class Cleaner(Robot):. Cleaner is a child of Robot and gets everything Robot has.', stScene(cast, tree([['cleaner', 'Cleaner']], ['cleaner']), notes({ c: 'sweep' })), ['cls:cleaner', 'isa:cleaner'], 5),
    stBeat('hoot', 'Cleaner only writes what is new: sweep(). __init__ and beep come down from the parent.', stScene(cast, tree([['cleaner', 'Cleaner']]), notes({ c: 'sweep' })), ['cn', 'rn'], [6, 7]),
    stBeat('bolt', 'mop = Cleaner("Eli") runs Robot’s __init__, because Cleaner has no __init__ of its own.', stScene(cast, tree([['cleaner', 'Cleaner']], ['robot']), notes({ c: 'sweep' })), ['cls:robot'], 8),
    stBeat('dot', 'mop.beep(): where does Python find beep? Cleaner has no beep.', stScene(cast, tree([['cleaner', 'Cleaner']], ['cleaner']), notes({ c: 'sweep' })), ['cls:cleaner', 'cast:dot'], 9),
    stBeat('hoot', 'It looks in Cleaner first, then climbs to the parent. Found in Robot. That climb is inheritance at work.', stScene(cast, tree([['cleaner', 'Cleaner']], ['robot']), notes({ c: 'sweep' })), ['isa:cleaner', 'cls:robot'], [3, 9]),
    stBeat('hoot', 'The family grows. Courier(Robot) is a second child. Cleaners and Couriers are both Robots.', stScene(cast, tree([['cleaner', 'Cleaner'], ['courier', 'Courier']], ['courier']), notes({})), ['cls:courier', 'isa:courier']),
    stBeat('dot', 'A child gets everything from its parent and writes only what is different. A Cleaner is a Robot!', stScene(cast, tree([['cleaner', 'Cleaner'], ['courier', 'Courier']]), notes({})), ['cast:dot'])
  ];
}
START_LESSON('inheritance', {
  code: ST308_CODE, story: st308Story(),
  watch: { code: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def beep(self):\n        print(self.name, "beeps")\n\nclass Cleaner(Robot):\n    def sweep(self):\n        print(self.name, "sweeps")\n\nmop = Cleaner("Eli")\nmop.beep()\nmop.sweep()\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def beep(self):\n        print(self.name, "beeps")\n\nclass Cleaner(Robot):\n    def sweep(self):\n        print(self.name, "sweeps")\n\nmop = Cleaner("Eli")\nmop.beep()\nmop.sweep()\nprint(isinstance(mop, Robot))\n',
    js: 'class Robot {\n  constructor(name) {\n    this.name = name;\n  }\n  beep() {\n    console.log(this.name, "beeps");\n  }\n}\n\nclass Cleaner extends Robot {\n  sweep() {\n    console.log(this.name, "sweeps");\n  }\n}\n\nlet mop = new Cleaner("Eli");\nmop.beep();\nmop.sweep();\nconsole.log(mop instanceof Robot);\n', differs: true,
    goals: ['Press Run.', 'Add class Courier(Robot) with a deliver method, and build one.', 'Try bolt = Robot("Ray") and bolt.sweep(). Why does that fail?'] },
  check: { q: 'class Cleaner(Robot): has a sweep method. Robot has beep. What can a Cleaner object do?',
    choices: [['Both beep and sweep', true, 'Right. A child gets everything from its parent, plus what it adds.'], ['Only sweep', false, 'Cleaner also gets every method of Robot, its parent.'], ['Only beep', false, 'sweep is written in Cleaner, so a Cleaner can sweep too.'], ['Nothing until it copies Robot', false, 'No copying is needed. The (Robot) in the class line does it.']] }
});

// ---------- L3.9 Override, then call super() ----------
const ST309_CODE = {
  py: ['class Courier(Robot):', '    def __init__(self, name, bag):', '        super().__init__(name)', '        self.bag = bag', '    def beep(self):', '        super().beep()', '        print("Parcel for you!")', 'dash = Courier("Tom", 3)', 'dash.beep()'],
  js: ['class Courier extends Robot {', '  constructor(name, bag) {', '    super(name);', '    this.bag = bag; }', '  beep() {', '    super.beep();', '    console.log("Parcel for you!"); } }', 'let dash = new Courier("Tom", 3);', 'dash.beep();']
};
function st309Story() {
  const cast = l3Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const tree = (lit) => stFamily([['robot', 'Robot', 30, 140], ['courier', 'Courier', 30, 270, 'robot']], { lit });
  const bot = (fields, lit) => l3Bot('d1', 400, 150, fields, { tag: 'Courier object', lit });
  return [
    stBeat('dot', 'Couriers carry a bag. But if Courier writes its own __init__, does Robot’s __init__ still run?', stScene(cast, tree(['courier'])), ['cls:courier', 'cast:dot'], 1),
    stBeat('hoot', 'A child method with the same name overrides the parent’s. Python finds the child’s first and stops looking.', stScene(cast, tree(['courier'])), ['cls:courier'], [1, 4]),
    stBeat('hoot', 'So call the parent on purpose: super().__init__(name). The parent sets up name, then the child adds bag.', stScene(cast, st1Card('card', 40, 140, 560, ST309_CODE.py.slice(1, 4), [1, 2])), ['card'], [2, 3]),
    stBeat('bolt', 'dash = Courier("Tom", 3). Robot’s part writes the name first.', stScene(cast, tree(['robot']), bot([['name', '"Tom"']], ['name'])), ['d1', 'cls:robot'], [2, 7]),
    stBeat('bolt', 'Then Courier’s own line adds bag = 3. Both parts of the setup ran.', stScene(cast, tree(['courier']), bot([['name', '"Tom"'], ['bag', '3']], ['bag'])), ['d1'], 3),
    stBeat('dot', 'What if I forget the super().__init__(name) line?', stScene(cast, tree([]), bot([['bag', '3']])), ['d1', 'cast:dot']),
    stBeat('hoot', 'Then name is never set, and dash.beep() fails: AttributeError, no name. The parent’s setup was skipped.', stScene(cast, bot([['bag', '3']], []), { tokens: [{ id: 'err', x: 180, y: 220, text: 'AttributeError: name', c: 'bad' }] }), ['err']),
    stBeat('hoot', 'super() works for any method. super().beep() does the usual beep, then the child adds its own line.', stScene(cast, tree([]), bot([['name', '"Tom"'], ['bag', '3']]), st1Screen(400, 270, 220, ['Tom beeps', 'Parcel for you!'], 86)), ['screen'], [5, 6, 8]),
    stBeat('dot', 'Override to change it, super() to keep the parent’s part and add mine.', stScene(cast, tree([]), bot([['name', '"Tom"'], ['bag', '3']])), ['cast:dot'])
  ];
}
const ST_ROBOT_PY = 'class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def beep(self):\n        print(self.name, "beeps")\n\n';
const ST_ROBOT_JS = 'class Robot {\n  constructor(name) {\n    this.name = name;\n  }\n  beep() {\n    console.log(this.name, "beeps");\n  }\n}\n\n';
START_LESSON('super', {
  code: ST309_CODE, story: st309Story(),
  watch: { code: ST_ROBOT_PY + 'class Courier(Robot):\n    def __init__(self, name, bag):\n        super().__init__(name)\n        self.bag = bag\n\n    def beep(self):\n        super().beep()\n        print("Parcel for you!")\n\ndash = Courier("Tom", 3)\ndash.beep()\n', heap: true },
  tryit: { py: ST_ROBOT_PY + 'class Courier(Robot):\n    def __init__(self, name, bag):\n        super().__init__(name)\n        self.bag = bag\n\n    def beep(self):\n        super().beep()\n        print("Parcel for you!")\n\ndash = Courier("Tom", 3)\ndash.beep()\nprint(dash.name, dash.bag)\n',
    js: ST_ROBOT_JS + 'class Courier extends Robot {\n  constructor(name, bag) {\n    super(name);\n    this.bag = bag;\n  }\n  beep() {\n    super.beep();\n    console.log("Parcel for you!");\n  }\n}\n\nlet dash = new Courier("Tom", 3);\ndash.beep();\nconsole.log(dash.name, dash.bag);\n',
    goals: ['Press Run.', 'Delete the super().beep() line. What does dash.beep() print now?', 'Delete the super().__init__(name) line and read the error.'] },
  check: { q: 'Courier writes its own __init__. What does super().__init__(name) inside it do?',
    choices: [['Runs Robot’s __init__ on this same object, so name gets set', true, 'Right. The parent’s setup runs first, then the child adds its own part.'], ['Builds a separate Robot object', false, 'No new object. super() runs the parent’s method on self.'], ['Deletes the parent’s __init__', false, 'Nothing is deleted. It calls the parent’s version.'], ['Nothing: Python runs both anyway', false, 'Once the child overrides __init__, only the child’s runs unless you call super().']] }
});

// ---------- L3.10 Same call, different robots ----------
const ST310_CODE = {
  py: ['class Cleaner(Robot):', '    def work(self): return "sweeps the floor"', 'class Courier(Robot):', '    def work(self): return "delivers a parcel"', 'team = [Cleaner("Eli"), Courier("Tom")]', 'for bot in team:', '    print(bot.name, bot.work())'],
  js: ['class Cleaner extends Robot {', '  work() { return "sweeps the floor"; } }', 'class Courier extends Robot {', '  work() { return "delivers a parcel"; } }', 'let team = [new Cleaner("Eli"), new Courier("Tom")];', 'for (const bot of team) {', '  console.log(bot.name, bot.work()); }']
};
function st310Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const team = (lit, says) => ({ boxes: [['mop', 'Eli', 'Cleaner'], ['dash', 'Tom', 'Courier'], ['kettle', 'Kettle', 'Kettle']].filter((b, i) => i < 2 || lit === 'kettle').map(([id, n, tag], i) => ({ id, x: 30 + i * 205, y: 170, w: 180, h: 60, text: n, size: 18, tag, tc: id === 'kettle' ? 'c' : 'a', solid: lit === id })),
    labels: (says || []).map(([id, t], i) => ({ id: 'say' + i, x: 120 + ['mop', 'dash', 'kettle'].indexOf(id) * 205, y: 262, text: t, size: 15, c: 't2' })) });
  return [
    stBeat('hoot', 'Morning! I shout one word to the whole team: work!', stScene(cast, team()), ['mop', 'dash']),
    stBeat('dot', 'And each robot does something different?', stScene(cast, team(null, [['mop', 'sweeps the floor'], ['dash', 'delivers a parcel']])), ['say0', 'say1']),
    stBeat('hoot', 'Yes. Cleaner’s work sweeps, Courier’s work delivers. Same call, and each class answers in its own way.', stScene(cast, st1Card('card', 30, 140, 580, ST310_CODE.py.slice(0, 4), [1, 3])), ['card'], [1, 3]),
    stBeat('penny', 'The loop only says bot.work(). bot points at Eli first. The loop never asks what kind of robot it is.', stScene(cast, team('mop', [['mop', 'sweeps the floor']]), { tokens: [{ id: 'bot', x: 320, y: 320, text: 'bot', w: 80 }], arrows: [{ id: 'botA', from: [282, 312], to: [150, 236], c: 'a' }] }), ['mop', 'botA'], [5, 6]),
    stBeat('penny', 'Without this I would write one check for every new kind of robot. That is a lot of work!', stScene(cast, { tokens: [{ id: 'bad1', x: 320, y: 180, text: 'if type(bot) == Cleaner: ...', c: 'bad' }, { id: 'bad2', x: 320, y: 240, text: 'elif type(bot) == Courier: ...', c: 'bad' }] }), ['bad1', 'bad2']),
    stBeat('hoot', 'Next lap, bot points at Tom and the same line runs Courier’s work. A new kind of robot needs no change to the loop.', stScene(cast, team('dash', [['dash', 'delivers a parcel']]), { tokens: [{ id: 'bot', x: 320, y: 320, text: 'bot', w: 80 }], arrows: [{ id: 'botA', from: [320, 300], to: [320, 236], c: 'a' }] }), ['dash', 'botA']),
    stBeat('hoot', 'Python does not even need a family tree. Any object with a work method fits the loop. That is duck typing.', stScene(cast, team('kettle', [['kettle', 'boils water']])), ['kettle']),
    stBeat('dot', 'One call, many answers. Each object knows its own job!', stScene(cast, team(null, [['mop', 'sweeps the floor'], ['dash', 'delivers a parcel']])), ['cast:dot'])
  ];
}
START_LESSON('polymorphism', {
  code: ST310_CODE, story: st310Story(),
  watch: { code: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n\nclass Cleaner(Robot):\n    def work(self):\n        return "sweeps the floor"\n\nclass Courier(Robot):\n    def work(self):\n        return "delivers a parcel"\n\nteam = [Cleaner("Eli"), Courier("Tom")]\nfor bot in team:\n    print(bot.name, bot.work())\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n\nclass Cleaner(Robot):\n    def work(self):\n        return "sweeps the floor"\n\nclass Courier(Robot):\n    def work(self):\n        return "delivers a parcel"\n\nclass Kettle:\n    name = "Kettle"\n    def work(self):\n        return "boils water"\n\nteam = [Cleaner("Eli"), Courier("Tom"), Kettle()]\nfor bot in team:\n    print(bot.name, bot.work())\n',
    js: 'class Robot {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nclass Cleaner extends Robot {\n  work() {\n    return "sweeps the floor";\n  }\n}\n\nclass Courier extends Robot {\n  work() {\n    return "delivers a parcel";\n  }\n}\n\nclass Kettle {\n  name = "Kettle";\n  work() {\n    return "boils water";\n  }\n}\n\nlet team = [new Cleaner("Eli"), new Courier("Tom"), new Kettle()];\nfor (const bot of team) {\n  console.log(bot.name, bot.work());\n}\n',
    goals: ['Press Run.', 'Add a Painter robot whose work returns "paints the door", and put one in the team.', 'Notice that the loop never changed.'] },
  check: { q: 'A loop calls bot.work() on a Cleaner and on a Courier. What decides which work runs?',
    choices: [['Each object’s own class', true, 'Right. Python looks up work on the object, so each class’s version runs.'], ['The first object in the list', false, 'Each object answers for itself.'], ['An if inside the loop', false, 'No if is needed. That is the point.'], ['The Robot parent class, always', false, 'The child’s own work is found first.']] }
});

// ---------- L3.11 Built from parts ----------
const ST311_CODE = {
  py: ['class Battery:', '    def __init__(self):', '        self.level = 100', 'class Robot:', '    def __init__(self, name):', '        self.name = name', '        self.battery = Battery()', 'bolt = Robot("Ray")', 'bolt.battery.level = 40', 'print(bolt.battery.level)'],
  js: ['class Battery {', '  constructor() {', '    this.level = 100; } }', 'class Robot {', '  constructor(name) {', '    this.name = name;', '    this.battery = new Battery(); } }', 'let bolt = new Robot("Ray");', 'bolt.battery.level = 40;', 'console.log(bolt.battery.level);']
};
function st311Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const parts = (lvl, o) => stScene(l3Bot('b1', 150, 160, [['name', '"Ray"'], ['battery', '→']], { lit: o && o.litBot }), stObj('bat', 'Battery object', 430, o && o.newBat ? 250 : 170, [['level', lvl]], { w: 180, lit: o && o.litLvl ? ['level'] : [] }),
    { arrows: [{ id: 'part', from: [344, 232], to: [426, o && o.newBat ? 285 : 205], c: 'a' }] }, o && o.tag ? l3Tag('bolt', 60, 200, [146, 200], true) : null,
    o && o.old ? stObj('old', 'old Battery', 430, 140, [['level', '40']], { w: 180, dash: true }) : null);
  return [
    stBeat('penny', 'Robots need batteries. Should I write class Robot(Battery):, so a robot gets the battery’s stuff?', stScene(cast, { tokens: [{ id: 'q', x: 320, y: 210, text: 'class Robot(Battery):', c: 'bad' }] }), ['q', 'cast:penny']),
    stBeat('hoot', 'Say it out loud first. Is a robot a battery? No. A robot has a battery.', stScene(cast, { tokens: [{ id: 'isa', x: 180, y: 200, text: 'a robot IS a battery?', c: 'bad', mono: false }, { id: 'hasa', x: 470, y: 200, text: 'a robot HAS a battery', solid: true, mono: false }] }), ['hasa']),
    stBeat('hoot', 'Has-a means composition: the robot keeps a Battery object as one of its parts.', stScene(cast, parts('100')), ['part', 'bat'], 6),
    stBeat('dot', 'self.battery = Battery() builds a fresh battery inside __init__, and Ray’s battery slot points at it.', stScene(cast, parts('100', { litBot: ['battery'] })), ['b1', 'part'], [4, 5, 6]),
    stBeat('dot', 'bolt.battery.level = 40 follows two arrows: from bolt to the robot, then on to its battery.', stScene(cast, parts('40', { litLvl: true, tag: true })), ['ar:bolt', 'part', 'bat'], 8),
    stBeat('hoot', 'Parts can be swapped. bolt.battery = Battery() fits a new one, and nothing else about Ray changes.', stScene(cast, parts('100', { newBat: true, old: true, litLvl: true })), ['bat', 'part']),
    stBeat('hoot', 'Is-a gets a family tree, like a Cleaner is a Robot. Has-a gets a part. Inherit only for a true is-a.', stScene(cast, stFamily([['robot', 'Robot', 60, 150], ['cleaner', 'Cleaner', 60, 270, 'robot']], { noLabel: true }), stObj('bat', 'Battery object', 400, 190, [['level', '100']], { w: 180 }), { labels: [{ id: 'l1', x: 230, y: 250, text: 'is a', size: 16, c: 't2' }, { id: 'l2', x: 490, y: 175, text: 'has a', size: 16, c: 't2' }] }), ['l1', 'l2']),
    stBeat('dot', 'Build from parts when it has one. Inherit only when it truly is one.', stScene(cast, parts('100')), ['cast:dot'])
  ];
}
START_LESSON('composition', {
  code: ST311_CODE, story: st311Story(),
  watch: { code: 'class Battery:\n    def __init__(self):\n        self.level = 100\n\nclass Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = Battery()\n\nbolt = Robot("Ray")\nbolt.battery.level = 40\nbolt.battery = Battery()\nprint(bolt.battery.level)\n', heap: true },
  tryit: { py: 'class Battery:\n    def __init__(self):\n        self.level = 100\n\n    def drain(self, n):\n        self.level = max(0, self.level - n)\n\nclass Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = Battery()\n\n    def work(self):\n        self.battery.drain(30)\n\nbolt = Robot("Ray")\nbolt.work()\nprint(bolt.name, bolt.battery.level)\n',
    js: 'class Battery {\n  constructor() {\n    this.level = 100;\n  }\n  drain(n) {\n    this.level = Math.max(0, this.level - n);\n  }\n}\n\nclass Robot {\n  constructor(name) {\n    this.name = name;\n    this.battery = new Battery();\n  }\n  work() {\n    this.battery.drain(30);\n  }\n}\n\nlet bolt = new Robot("Ray");\nbolt.work();\nconsole.log(bolt.name, bolt.battery.level);\n',
    goals: ['Press Run.', 'Add an Arm part with a grab method, and give every Robot an arm.', 'Give two robots the same Battery object. What happens when one works?'] },
  check: { q: 'A robot needs wheels. Which design fits best?',
    choices: [['The robot keeps a Wheels object as a part: self.wheels = Wheels()', true, 'Right. A robot has wheels. Has-a is composition.'], ['class Robot(Wheels):', false, 'A robot is not a kind of wheels. Inheritance is for is-a.'], ['class Wheels(Robot):', false, 'Wheels are not a kind of robot either.'], ['Copy the Wheels code into Robot', false, 'Copying makes two places to fix. Keep Wheels as its own part.']] }
});

// ---------- L3.12 Teaching objects print, == and len ----------
const ST312_CODE = {
  py: ['class Robot:', '    def __init__(self, name):', '        self.name = name', '    def __str__(self):', '        return "Robot " + self.name', '    def __eq__(self, other):', '        return self.name == other.name', 'print(Robot("Ray"))', 'print(Robot("Ray") == Robot("Ray"))'],
  js: ['class Robot {', '  constructor(name) {', '    this.name = name; }', '  toString() {', '    return "Robot " + this.name; }', '  equals(other) {', '    return this.name === other.name; } }', 'console.log(String(new Robot("Ray")));', 'console.log(new Robot("Ray").equals(new Robot("Ray")));']
};
function st312Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const pair = (lit) => stScene(l3Bot('a1', 60, 150, [['name', '"Ray"']]), l3Bot('a2', 370, 150, [['name', '"Ray"']]),
    { tokens: [{ id: 'na', x: 165, y: 300, text: 'a', w: 60 }, { id: 'nb', x: 475, y: 300, text: 'b', w: 60 }], arrows: [{ id: 'aa', from: [165, 280], to: [165, 216], c: 'm' }, { id: 'ab', from: [475, 280], to: [475, 216], c: 'm' }] },
    lit ? { tokens: [{ id: 'eq', x: 320, y: 300, text: lit, solid: lit.indexOf('True') >= 0, c: lit.indexOf('False') >= 0 ? 'bad' : 'l' }] } : null);
  return [
    stBeat('dot', 'print(bolt) shows something like <__main__.Robot object at 0x7f3a>. That is not friendly.', stScene(cast, { tokens: [{ id: 'ugly', x: 320, y: 210, text: '<__main__.Robot object at 0x7f3a>', c: 'bad' }] }), ['ugly', 'cast:dot']),
    stBeat('hoot', 'Teach it. A method named __str__ returns the text that print should show.', stScene(cast, st1Card('card', 60, 150, 520, ST312_CODE.py.slice(3, 5), [0, 1])), ['card'], [3, 4]),
    stBeat('dot', 'Now print(Robot("Ray")) shows Robot Ray. Python called __str__ for me.', stScene(cast, st1Screen(160, 170, 320, ['Robot Ray'], 88)), ['screen'], 7),
    stBeat('dot', 'But Robot("Ray") == Robot("Ray") was False before. They have the same name!', pair('== → False'), ['eq', 'a1', 'a2']),
    stBeat('hoot', 'Two separate boxes, one arrow each. Unless the class says otherwise, == only asks: is it the very same box?', pair(), ['a1', 'a2', 'aa', 'ab']),
    stBeat('hoot', 'Write __eq__ to say what equal means: the same name. Now == compares the data.', pair('== → True'), ['eq'], [5, 6, 8]),
    stBeat('penny', 'And __len__ lets len(team) work on my own Team class. The double underscores are hooks Python calls.', stScene(cast, { tokens: [{ id: 'len', x: 320, y: 180, text: 'len(team) → team.__len__()' }, { id: 'pr', x: 320, y: 240, text: 'print(x) → x.__str__()' }, { id: 'eq2', x: 320, y: 300, text: 'a == b → a.__eq__(b)' }] }), ['len', 'pr', 'eq2']),
    stBeat('dot', 'I never call __str__ myself. print, == and len call them for me!', stScene(cast, st1Screen(160, 170, 320, ['Robot Ray', 'True'], 110)), ['cast:dot'], [7, 8])
  ];
}
START_LESSON('dunder', {
  code: ST312_CODE, story: st312Story(),
  watch: { code: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def __str__(self):\n        return "Robot " + self.name\n\n    def __eq__(self, other):\n        return self.name == other.name\n\na = Robot("Ray")\nb = Robot("Ray")\nprint(a)\nprint(a == b, a is b)\n', heap: true },
  tryit: { py: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def __str__(self):\n        return "Robot " + self.name\n\n    def __eq__(self, other):\n        return self.name == other.name\n\nclass Team:\n    def __init__(self, bots):\n        self.bots = bots\n\n    def __len__(self):\n        return len(self.bots)\n\nteam = Team([Robot("Ray"), Robot("Kim")])\nprint(len(team))\nprint(Robot("Ray"))\nprint(Robot("Ray") == Robot("Ray"))\n',
    js: 'class Robot {\n  constructor(name) {\n    this.name = name;\n  }\n  toString() {\n    return "Robot " + this.name;\n  }\n  equals(other) {\n    return this.name === other.name;\n  }\n}\n\nclass Team {\n  constructor(bots) {\n    this.bots = bots;\n  }\n  get length() {\n    return this.bots.length;\n  }\n}\n\nlet team = new Team([new Robot("Ray"), new Robot("Kim")]);\nconsole.log(team.length);\nconsole.log(String(new Robot("Ray")));\nconsole.log(new Robot("Ray").equals(new Robot("Ray")));\n', differs: true,
    goals: ['Press Run.', 'Delete __eq__ and run again. What does == say now?', 'Make __str__ show the battery too, like Robot Ray (100%).'] },
  check: { q: 'You wrote __str__ in Robot. When does it run?',
    choices: [['When print (or str) needs the robot as text', true, 'Right. Python calls it for you. You never need to call __str__ yourself.'], ['Only when you call robot.__str__() yourself', false, 'You can, but the point is that print calls it for you.'], ['When the robot is built', false, 'That is __init__.'], ['Never: it is just a comment', false, 'It is a real method that Python calls.']] }
});

// ---------- L3.13 A contract every class signs ----------
const ST313_CODE = {
  py: ['from abc import ABC, abstractmethod', 'class Worker(ABC):', '    @abstractmethod', '    def work(self):', '        pass', 'class Cleaner(Worker):', '    def work(self):', '        return "sweeping"', 'print(Cleaner().work())'],
  js: ['class Worker {', '  constructor() {', '    if (new.target === Worker) throw new Error("Worker is a contract"); }', '  work() {', '    throw new Error("work() is missing"); } }', 'class Cleaner extends Worker {', '  work() {', '    return "sweeping"; } }', 'console.log(new Cleaner().work());']
};
function st313Story() {
  const cast = l3Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const contract = (lit) => ({ boxes: [{ id: 'contract', x: 210, y: 140, w: 220, h: 80, text: 'must have work()', size: 16, mono: false, tag: 'class Worker(ABC)', tc: 'b', c: 'b', dash: true, solid: !!lit }] });
  const kid = (id, name, x, ok) => ({ boxes: [{ id, x, y: 270, w: 170, h: 56, text: name, size: 17, tag: ok ? 'signed' : 'missing work', tc: ok ? 'a' : 'c', c: ok ? 'a' : 'bad' }], arrows: [{ id: 'up:' + id, from: [x + 85, 256], to: [320, 224], c: 'm' }] });
  return [
    stBeat('hoot', 'Every worker in my workshop signs a contract: you must have a work() method.', stScene(cast, contract()), ['contract']),
    stBeat('hoot', 'class Worker(ABC) is that contract. @abstractmethod marks work as must-write.', stScene(cast, st1Card('card', 60, 130, 520, ST313_CODE.py.slice(1, 5), [0, 1, 2])), ['card'], [1, 2, 3]),
    stBeat('dot', 'Can I hire a plain Worker, straight from the contract?', stScene(cast, contract(), { tokens: [{ id: 'bad', x: 320, y: 290, text: 'Worker() → TypeError', c: 'bad' }] }), ['bad', 'cast:dot']),
    stBeat('hoot', 'No. A contract alone cannot do any work, so Python refuses to build it.', stScene(cast, contract(true)), ['contract']),
    stBeat('bolt', 'Cleaner(Worker) writes work(). Contract signed. Cleaner() builds fine.', stScene(cast, contract(), kid('cleaner', 'Cleaner', 60, true)), ['cleaner', 'up:cleaner'], [5, 6, 7]),
    stBeat('dot', 'And a child that forgets to write work()?', stScene(cast, contract(), kid('cleaner', 'Cleaner', 60, true), kid('lazy', 'Lazy', 410, false)), ['lazy', 'cast:dot']),
    stBeat('hoot', 'Python stops it the moment you try to build one, not halfway through a busy day. Mistakes show up early.', stScene(cast, contract(), kid('lazy', 'Lazy', 410, false), { tokens: [{ id: 'err', x: 200, y: 300, text: 'Lazy() → TypeError', c: 'bad' }] }), ['err']),
    stBeat('dot', 'The abstract class says what must exist. Each child says how.', stScene(cast, contract(), kid('cleaner', 'Cleaner', 60, true)), ['cast:dot'], 8)
  ];
}
START_LESSON('interfaces', {
  code: ST313_CODE, story: st313Story(),
  watch: { code: 'from abc import ABC, abstractmethod\n\nclass Worker(ABC):\n    @abstractmethod\n    def work(self):\n        pass\n\nclass Cleaner(Worker):\n    def work(self):\n        return "sweeping"\n\nc = Cleaner()\nprint(c.work())\n', heap: true },
  tryit: { py: 'from abc import ABC, abstractmethod\n\nclass Worker(ABC):\n    @abstractmethod\n    def work(self):\n        pass\n\nclass Cleaner(Worker):\n    def work(self):\n        return "sweeping"\n\nclass Courier(Worker):\n    def work(self):\n        return "delivering"\n\nfor w in [Cleaner(), Courier()]:\n    print(w.work())\n',
    js: 'class Worker {\n  constructor() {\n    if (new.target === Worker) throw new Error("Worker is a contract");\n  }\n  work() {\n    throw new Error("work() is missing");\n  }\n}\n\nclass Cleaner extends Worker {\n  work() {\n    return "sweeping";\n  }\n}\n\nclass Courier extends Worker {\n  work() {\n    return "delivering";\n  }\n}\n\nfor (const w of [new Cleaner(), new Courier()]) {\n  console.log(w.work());\n}\n',
    goals: ['Press Run.', 'Add print(Worker()) at the end and read the error.', 'Write class Lazy(Worker) with no work method and try to build one.'] },
  check: { q: 'Worker is an abstract class with an abstract work method. What happens on Worker()?',
    choices: [['Python refuses: you cannot build an object from the contract itself', true, 'Right. Only children that write every abstract method can be built.'], ['You get a Worker that does nothing', false, 'Python stops before building it.'], ['It works, and work() returns None', false, 'It never gets that far: building it is an error.'], ['It builds a Cleaner instead', false, 'Python never picks a child for you.']] }
});

// ---------- L3.14 When not to use a class ----------
const ST314_CODE = {
  py: ['class Adder:', '    def add(self, a, b):', '        return a + b', 'print(Adder().add(2, 3))', 'def add(a, b):', '    return a + b', 'print(add(2, 3))', 'spec = {"name": "Ray", "size": 3}', 'print(spec["name"])'],
  js: ['class Adder {', '  add(a, b) {', '    return a + b; } }', 'console.log(new Adder().add(2, 3));', 'function add(a, b) {', '  return a + b; }', 'console.log(add(2, 3));', 'let spec = { "name": "Ray", "size": 3 };', 'console.log(spec["name"]);']
};
function st314Story() {
  const cast = l3Cast([['hoot', 60], ['penny', 320], ['dot', 580]]);
  const tools = (lit) => ({ boxes: [['fn', 'function', 'one action'], ['dict', 'dictionary', 'plain data'], ['cls', 'class', 'data + actions']].map(([id, tag, t], i) => ({ id: 'tool:' + id, x: 30 + i * 205, y: 180, w: 180, h: 70, text: t, size: 16, mono: false, tag, solid: lit === id })) });
  return [
    stBeat('dot', 'I love classes now! I made class Adder with one method, add, and nothing else.', stScene(cast, st1Card('card', 60, 140, 520, ST314_CODE.py.slice(0, 4), [0, 1, 2])), ['card', 'cast:dot'], [0, 1, 2, 3]),
    stBeat('hoot', 'A class with no data and one method is a function in disguise. It does the same job as def add(a, b).', stScene(cast, st1Card('card', 60, 140, 520, ST314_CODE.py.slice(4, 7), [0, 1])), ['card'], [4, 5, 6]),
    stBeat('penny', 'And my robot spec is only a name and a size, with no actions. Does that need a class?', stScene(cast, { tokens: [{ id: 'spec', x: 320, y: 210, text: 'name: Ray, size: 3', mono: false }] }), ['spec', 'cast:penny']),
    stBeat('hoot', 'Plain data with no actions fits a dictionary: {"name": "Ray", "size": 3}.', stScene(cast, stObj('dict', 'dict', 300, 160, [['"name"', '"Ray"'], ['"size"', '3']], { w: 260 }), l3Tag('spec', 160, 210, [296, 210], true)), ['dict', 'ar:spec'], [7, 8]),
    stBeat('dot', 'So when is a class worth it?', stScene(cast, tools()), ['cast:dot']),
    stBeat('hoot', 'Use a class when data and its actions belong together. A Robot with a battery and a charge method is an example.', stScene(cast, tools('cls')), ['tool:cls']),
    stBeat('hoot', 'Beware the do-everything class: a Workshop that builds, sells, cleans and pays. Split it into small parts.', stScene(cast, { boxes: [{ id: 'god', x: 150, y: 150, w: 340, h: 110, text: 'build, sell, clean, pay, log...', size: 16, mono: false, tag: 'class Workshop', c: 'bad', tc: 'c' }] }), ['god']),
    stBeat('dot', 'Function for one action, dictionary for plain data, class when they live together.', stScene(cast, tools()), ['cast:dot'])
  ];
}
START_LESSON('no-class', {
  code: ST314_CODE, story: st314Story(),
  watch: { code: 'class Adder:\n    def add(self, a, b):\n        return a + b\n\nprint(Adder().add(2, 3))\n\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))\nspec = {"name": "Ray", "size": 3}\nprint(spec["name"])\n', heap: true },
  tryit: { py: 'def add(a, b):\n    return a + b\n\nspec = {"name": "Ray", "size": 3}\n\nclass Robot:\n    def __init__(self, name):\n        self.name = name\n        self.battery = 100\n\n    def work(self):\n        self.battery = self.battery - 30\n\nprint(add(2, 3))\nprint(spec["name"], spec["size"])\nbolt = Robot("Ray")\nbolt.work()\nprint(bolt.battery)\n',
    js: 'function add(a, b) {\n  return a + b;\n}\n\nlet spec = { "name": "Ray", "size": 3 };\n\nclass Robot {\n  constructor(name) {\n    this.name = name;\n    this.battery = 100;\n  }\n  work() {\n    this.battery = this.battery - 30;\n  }\n}\n\nconsole.log(add(2, 3));\nconsole.log(spec["name"], spec["size"]);\nlet bolt = new Robot("Ray");\nbolt.work();\nconsole.log(bolt.battery);\n',
    goals: ['Press Run.', 'Turn class Greeter with one method greet(name) into a plain function.', 'Pick one thing from your own life and decide: function, dictionary or class?'] },
  check: { q: 'You need to store a book’s title and year. Nothing happens to it. What fits best?',
    choices: [['A dictionary: {"title": ..., "year": ...}', true, 'Right. Plain data with no actions fits a dictionary.'], ['A class with an __init__ and no other methods', false, 'It works, but a dictionary says the same thing with less code.'], ['A function', false, 'A function is for an action. Here there is only data.'], ['A class that inherits from list', false, 'Much too much for two values.']] }
});
