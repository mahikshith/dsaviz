// Level 1, lessons 1 to 12 (chapters 1 and 2): stories, code cards, watch programs, try-its and checks.
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
    stBeat('hoot', 'Meet Bolt, our robot. Bolt does exactly what it is told. Nothing more, nothing less.', stScene(cast(), toaster()), ['cast:bolt']),
    stBeat('dot', 'Bolt, make toast, please!', stScene(cast(), toaster(), { tokens: [{ id: 'loaf', x: 320, y: 150, text: 'the whole loaf' }] }), ['loaf', 'cast:dot']),
    stBeat('hoot', 'Bolt put the whole loaf in. We never said one slice. A computer is just as literal.', stScene(cast(), toaster('whole loaf', true)), ['toaster']),
    stBeat('dot', 'So I need to say every step, exactly, in the right order?', stScene(cast(['hoot', 'dot']), steps()), ['step0', 'step1', 'step2']),
    stBeat('hoot', 'Yes. A list of exact steps is a program. The computer runs them from the top down.', stScene(cast(['hoot', 'dot']), steps(0), { arrows: [{ id: 'down', from: [150, 150], to: [150, 280], c: 'a' }] }), ['step0', 'down']),
    stBeat('hoot', 'We write the steps in a language the computer reads. Ours is Python. Each line is one step.', stScene(cast(['hoot', 'dot']), card()), ['card']),
    stBeat('dot', 'The last line has no quotes. It says print(2 + 3).', stScene(cast(['hoot', 'dot']), card([2])), ['card'], 2),
    stBeat('hoot', 'With no quotes, the computer works it out. print(2 + 3) shows 5. You just used Python as a calculator.', stScene(cast(['hoot', 'dot']), card([2]), screen(['5'])), ['screen'], 2),
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
      ['Works out what you meant and does that', false, 'It cannot guess. Remember Bolt and the whole loaf: it does what is written.'],
      ['Runs the most important step first', false, 'Every step runs in order, from the first line down.'],
      ['Runs the steps in any order it likes', false, 'The order is fixed: top to bottom, one line at a time.']] },
  first: []
});
