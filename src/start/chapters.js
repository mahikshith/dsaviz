// The Start here ladder: levels of lessons. Level 1 (Basics) is 24 lessons in four chapters, the bridge (plan it, read a
// problem) and Counting steps after the first problems. Levels 2 to 5 are planned: their first lessons are listed (not ready).
// (Internally a lesson is a "chapter" record: START_CHAPTERS, Chapter.dc.html. START_PARTS are the chapters shown to
// learners.) The order and the arrows follow docs/research/beginners.md section 5. Every word here is our own.
// A lesson: id, level (default 1), n (its number in the level), part, short (the map label), title, idea (one line), minutes, teaches (START_NEEDS_KEYS), after (hard prerequisites:
// the path map's arrows), soft (lessons that help but can be skipped), optional, trap (the likely mistake, which the
// lesson's fix-the-bug exercise targets), ready (written and playable), and when ready:
//   code     { py: [lines], js: [lines] }   the story's code card; both languages have the same number of lines
//   story    [stBeat(who, say, scene, focus, line)]   one idea per beat, say at most 140 characters; line = card line(s) lit
//   watch    { code, stdin }   a Python program for "Watch it run" (traced at build time into traces.js)
//   tryit    { py, js, stdin, goals: [...] }   the runnable starting program and what to try
//   check    { q, choices: [[text, right, why]] }   one question; text may be { py, js }
//   first    [spec ids]   easy runnable problems this lesson opens (each one's needs are in needs.js)
// Scenes use the vocabulary in engine.js on a 640 x 360 canvas.

// ---------- L1. What is a program? ----------
const ST1_CODE = {
  py: ['print("Take one slice")', 'print("Put it in the toaster")', 'print(2 + 3)'],
  js: ['console.log("Take one slice");', 'console.log("Put it in the toaster");', 'console.log(2 + 3);']
};
function st1Story() {
  const cast = (only) => ({ cast: [{ id: 'hoot', x: 60, y: 64 }, { id: 'bolt', x: 320, y: 64 }, { id: 'dot', x: 580, y: 64 }].filter((c) => !only || only.includes(c.id)) });
  const toaster = (inside, smoke) => ({ boxes: [{ id: 'toaster', x: 250, y: 190, w: 140, h: 96, text: inside || '', size: 18, c: smoke ? 'bad' : 'l', sub: 'toaster' }] });
  const steps = (lit) => ({ tokens: ['Take one slice', 'Put it in the toaster', 'Press the lever'].map((s, i) => ({ id: 'step' + i, x: 320, y: 160 + i * 52, text: (i + 1) + '. ' + s, w: 300, solid: lit === i })) });
  const card = (cur) => ({ cards: [{ id: 'card', x: 120, y: 140, w: 400, lines: ST1_CODE.py, cur: cur || [] }] });
  const screen = (lines) => ({ screens: [{ id: 'screen', x: 170, y: 250, w: 300, h: 90, lines }] });
  return [
    stBeat('hoot', 'Meet Bolt, our robot. Bolt does exactly what it is told. Nothing more, nothing less.', stScene(cast(), toaster()), ['cast:bolt']),
    stBeat('dot', 'Bolt, make toast, please!', stScene(cast(), toaster(), { tokens: [{ id: 'loaf', x: 320, y: 150, text: 'the whole loaf' }] }), ['loaf', 'cast:dot']),
    stBeat('hoot', 'Bolt put the whole loaf in. We never said one slice. A computer is just as literal.', stScene(cast(), toaster('whole loaf', true)), ['toaster']),
    stBeat('dot', 'So I need to say every step, exactly, in the right order?', stScene(cast(['hoot', 'dot']), steps()), ['step0', 'step1', 'step2']),
    stBeat('hoot', 'Yes. A list of exact steps is a program. The computer runs them from the top down.', stScene(cast(['hoot', 'dot']), steps(0), { arrows: [{ id: 'down', from: [150, 150], to: [150, 280], c: 'a' }] }), ['step0', 'down']),
    stBeat('hoot', 'We write the steps in a language the computer reads. Ours is Python. Each line is one step.', stScene(cast(['hoot', 'dot']), card()), ['card']),
    stBeat('dot', 'The last line has no quotes. It says print(2 + 3).', stScene(cast(['hoot', 'dot']), card([2])), ['card'], 2),
    stBeat('hoot', 'With no quotes, the computer works it out. print(2 + 3) shows 5. You just used Python as a calculator.', stScene(cast(['hoot', 'dot']), card([2]), screen(['5'])), ['screen'], 2),
    stBeat('dot', 'All three lines run in order. Now I want to run one myself!', stScene(cast(['hoot', 'dot']), card([0, 1, 2]), screen(['Take one slice', 'Put it in the toaster', '5'].slice(1))), ['cast:dot', 'screen'], [0, 1, 2])
  ];
}

const START_CHAPTERS = [
  // ---- Chapter 1: Talking to the computer ----
  { id: 'what-is-a-program', n: 1, part: 1, short: 'A program', title: 'What is a program?', idea: 'A program is a list of exact steps. The computer does just what is written, from the top.', minutes: 7,
    teaches: ['program'], after: [], trap: 'Expecting the computer to guess what you meant.', ready: true,
    code: ST1_CODE, story: st1Story(),
    watch: { code: 'print("Take one slice")\nprint("Put it in the toaster")\nprint(2 + 3)\n' },
    tryit: { py: 'print(2 + 3)\nprint(10 - 4)\n', js: 'console.log(2 + 3);\nconsole.log(10 - 4);\n',
      goals: ['Press Run. The computer works out each sum.', 'Change 10 - 4 to 100 - 1 and run it again.', 'Add a third line that prints 6 + 7.'] },
    check: { q: 'What does a computer do with the steps in a program?',
      choices: [['Runs them exactly as written, from top to bottom', true, 'Right. It never skips ahead or guesses. That is why the order and the details matter.'],
        ['Works out what you meant and does that', false, 'It cannot guess. Remember Bolt and the whole loaf: it does what is written.'],
        ['Runs the most important step first', false, 'Every step runs in order, from the first line down.'],
        ['Runs the steps in any order it likes', false, 'The order is fixed: top to bottom, one line at a time.']] },
    first: [] },
  { id: 'first-run', n: 2, part: 1, short: 'First run', title: 'Your first run', idea: 'print shows text on the screen. Quotes mark where the text starts and ends.', minutes: 7, teaches: ['print'], after: ['what-is-a-program'], trap: 'Leaving out a quote.' },
  { id: 'calculator', n: 3, part: 1, short: 'Calculator', title: 'Calculator mode', idea: 'Python works out sums: + - * / plus // for whole parts and % for what is left over.', minutes: 8, teaches: ['math'], after: ['first-run'], trap: 'Forgetting that * and / go before + and -.' },
  { id: 'first-error', n: 4, part: 1, short: 'First error', title: 'Reading your first error', idea: 'A red message is help. It names the line and the kind of mistake.', minutes: 7, teaches: ['errors'], after: ['first-run'], trap: 'Reading only the top of the message.' },
  { id: 'variables', n: 5, part: 1, short: 'Variables', title: 'Variables are labelled boxes', idea: 'name = value puts a value in a box with a name tag. Put a new value in any time.', minutes: 9, teaches: ['variables'], after: ['calculator'], trap: 'Using a name before giving it a value.' },
  { id: 'types', n: 6, part: 1, short: 'Types', title: 'Kinds of values', idea: 'Every value has a type. "5" is text and 5 is a number, and they do not mix.', minutes: 8, teaches: ['types'], after: ['variables'], trap: 'Adding text and a number with +.' },
  // ---- Chapter 2: Asking and deciding ----
  { id: 'input-output', n: 7, part: 2, short: 'Input', title: 'Asking and answering', idea: 'input() asks a question. The answer always comes back as text, so convert it first.', minutes: 9, teaches: ['io'], after: ['types'], trap: '"5" + "3" giving 53 instead of 8.' },
  { id: 'compare', n: 8, part: 2, short: 'Compare', title: 'True or false questions', idea: 'A comparison asks a yes or no question. = stores a value, == asks if two are equal.', minutes: 8, teaches: ['logic'], after: ['types'], trap: 'Writing = when you mean ==.' },
  { id: 'if-else', n: 9, part: 2, short: 'if / else', title: 'Choosing a path', idea: 'if runs its block only when the question is True. elif and else cover the rest.', minutes: 10, teaches: ['if'], after: ['compare'], trap: 'Wrong indentation, so a line falls outside its block.' },
  { id: 'and-or-not', n: 10, part: 2, short: 'and / or / not', title: 'and, or, not', idea: 'and needs both sides True, or needs just one, and not flips the answer.', minutes: 8, teaches: ['boolops'], after: ['if-else'], trap: 'Writing x == 1 or 2 instead of x == 1 or x == 2.' },
  { id: 'edge-cases', n: 11, part: 2, short: 'Edge cases', title: 'What could go wrong?', idea: 'Test the odd cases first: zero, negatives and the exact boundary.', minutes: 8, teaches: ['edges'], after: ['and-or-not'], trap: 'Using < where the rule says "or more".' },
  { id: 'path-project', n: 12, part: 2, short: 'Project: path', title: 'Project: choose your path', idea: 'Put input and if together into a tiny adventure with three endings.', minutes: 12, teaches: [], after: ['edge-cases', 'input-output'], project: true },
  // ---- Chapter 3: Repeating and collecting ----
  { id: 'for-range', n: 13, part: 3, short: 'for loops', title: 'Counting laps with for', idea: 'for repeats a block once per number. range(1, 6) hands out 1, 2, 3, 4, 5.', minutes: 10, teaches: ['loops'], after: ['variables', 'if-else'], trap: 'Off by one: range(5) stops at 4.' },
  { id: 'while', n: 14, part: 3, short: 'while loops', title: 'Repeat while it is true', idea: 'A while loop repeats while its question is True. Something inside must change.', minutes: 10, teaches: ['while'], after: ['for-range'], trap: 'A loop that never stops because nothing changes.' },
  { id: 'accumulator', n: 15, part: 3, short: 'Running total', title: 'Keeping a running total', idea: 'Start a box at 0, then add to it on every lap. That box is an accumulator.', minutes: 9, teaches: ['accumulate'], after: ['while'], trap: 'Resetting the total inside the loop.' },
  { id: 'lists', n: 16, part: 3, short: 'Lists', title: 'Lists are backpacks', idea: 'A list keeps many values in order. The first pocket is number 0.', minutes: 10, teaches: ['lists'], after: ['accumulator'], trap: 'Asking for pocket len(list), one past the end.' },
  { id: 'list-loops', n: 17, part: 3, short: 'Loop a list', title: 'Visiting every item', idea: 'for item in items visits each value once. Add an accumulator to sum, count or find the biggest.', minutes: 10, teaches: ['scan'], after: ['lists'], trap: 'Starting the biggest at 0 when every value is negative.' },
  { id: 'strings', n: 18, part: 3, short: 'Strings', title: 'Text is a row of letters', idea: 'A string is like a list of letters: count it, read one letter, slice a piece, loop over it.', minutes: 10, teaches: ['strings'], after: ['lists'], soft: ['list-loops'], trap: 'Trying to change one letter in place.' },
  { id: 'nested-loops', n: 19, part: 3, short: 'Nested loops', title: 'Loops inside loops', idea: 'A loop inside a loop runs all its laps for every lap of the outer one.', minutes: 9, teaches: ['nested'], after: ['strings'], optional: true, trap: 'Mixing up the inner and outer counters.' },
  // ---- Chapter 4: Reusing and organising ----
  { id: 'functions', n: 20, part: 4, short: 'Functions', title: 'Functions are recipes', idea: 'def names a recipe. Its parameters are the ingredients you hand it when you call it.', minutes: 10, teaches: ['functions'], after: ['input-output', 'if-else', 'list-loops'], trap: 'Calling a function before it is defined.' },
  { id: 'return-print', n: 21, part: 4, short: 'return / print', title: 'return versus print', idea: 'return hands a value back to whoever called. print only shows it on the screen.', minutes: 9, teaches: ['return'], after: ['functions'], trap: 'Printing the answer instead of returning it.' },
  { id: 'dicts', n: 22, part: 4, short: 'Dictionaries', title: 'Dictionaries are coat checks', idea: 'A dictionary finds a value by its key, like a coat by its ticket. Great for counting.', minutes: 10, teaches: ['dicts'], after: ['list-loops'], soft: ['strings'], trap: 'Reading a key that is not there yet.' },
  { id: 'debugging', n: 23, part: 4, short: 'Debugging', title: 'Your debugging toolkit', idea: 'Ask three questions: what did I expect, what happened, and where did they split?', minutes: 10, teaches: ['debug'], after: ['first-error', 'return-print'], trap: 'Changing many things at once.' },
  { id: 'guess-project', n: 24, part: 4, short: 'Project: guess', title: 'Project: guess the number', idea: 'A while loop, input and if make a game that says higher or lower until you win.', minutes: 14, teaches: [], after: ['while', 'dicts', 'return-print'], project: true },
  // ---- The bridge ----
  { id: 'plan-it', n: 25, part: 5, short: 'Plan it first', title: 'Plan it before you code it', idea: 'Write the steps in plain words first. Then turn each step into one or two lines of code.', minutes: 10, teaches: ['plan'], after: ['return-print'], trap: 'Typing code before you know the steps.' },
  { id: 'read-a-problem', n: 26, part: 5, short: 'Read a problem', title: 'How to read a problem', idea: 'Find the input, the output and the examples. Plan in words, try the slow idea, then test.', minutes: 12, teaches: ['problems'], after: ['plan-it', 'debugging'], trap: 'Coding before you know what the answer looks like.' },
  // ---- After your first problems ----
  { id: 'counting-steps', n: 27, part: 6, short: 'Counting steps', title: 'Counting steps', idea: 'Count the laps your loop makes. When the input doubles, does the work double too?', minutes: 10, teaches: ['bigo'], after: ['read-a-problem'], trap: 'Counting lines of code instead of laps.' },
  // ---- Level 2: Functions in depth (coming next) ----
  { id: 'recursion', level: 2, n: 1, part: 7, short: 'Recursion', title: 'A function that calls itself', idea: 'Recursion hands a smaller copy of the job to itself, until a base case stops it.', minutes: 11, teaches: ['recursion'], after: ['return-print'] },
  { id: 'call-stack', level: 2, n: 2, part: 7, short: 'The call stack', title: 'The call stack is a pile of plates', idea: 'Each call puts a plate on the pile. return takes the top plate off.', minutes: 10, teaches: ['stack'], after: ['recursion'] },
  // ---- Level 3: Objects (coming later) ----
  { id: 'objects', level: 3, n: 1, part: 8, short: 'Objects', title: 'A first look at objects', idea: 'A class is a blueprint. Each object built from it keeps its own data.', minutes: 10, teaches: ['objects'], after: ['dicts', 'return-print'] },
  { id: 'references', level: 3, n: 2, part: 8, short: 'References', title: 'Names point at objects', idea: 'Two names can point at one object. Change it through one and the other sees it.', minutes: 10, teaches: ['refs'], after: ['objects'] },
  // ---- Level 4: Writing better code (coming later) ----
  { id: 'clean-names', level: 4, n: 1, part: 9, short: 'Good names', title: 'Names that explain themselves', idea: 'A good name says what a value means, so the code reads like a sentence.', minutes: 8, teaches: ['style'], after: ['functions'] },
  // ---- Level 5: Waiting without blocking (coming later) ----
  { id: 'event-loop', level: 5, n: 1, part: 10, short: 'Event loop', title: 'The event loop is a queue', idea: 'Slow jobs wait in a queue. The loop takes the next ready one, so nothing freezes.', minutes: 10, teaches: ['async'], after: ['functions'] }
];
