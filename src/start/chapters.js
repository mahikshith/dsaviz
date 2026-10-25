// The Start here ladder: levels of lessons. Level 1 (Basics) is 24 lessons in four chapters, the bridge (plan it, read a
// problem) and Counting steps after the first problems: 27 lessons. Level 2 (Functions in depth, 9 lessons) and Level 3
// (Objects and classes, 14 lessons) follow docs/research/core-programming.md. Levels 4 and 5 list their first lesson (not ready).
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

const START_CHAPTERS = [
  // ---- Chapter 1: Talking to the computer ----
  { id: 'what-is-a-program', n: 1, part: 1, short: 'A program', title: 'What is a program?', idea: 'A program is a list of exact steps. The computer does what is written, from the top.', minutes: 7,
    teaches: ['program'], after: [], trap: 'Expecting the computer to guess what you meant.' },
  { id: 'first-run', n: 2, part: 1, short: 'First run', title: 'Your first run', idea: 'print shows text on the screen. Quotes mark where the text starts and ends.', minutes: 7, teaches: ['print'], after: ['what-is-a-program'], trap: 'Leaving out a quote.' },
  { id: 'calculator', n: 3, part: 1, short: 'Calculator', title: 'Calculator mode', idea: 'Python works out sums: + - * / plus // for whole parts and % for what is left over.', minutes: 8, teaches: ['math'], after: ['first-run'], trap: 'Forgetting that * and / go before + and -.' },
  { id: 'first-error', n: 4, part: 1, short: 'First error', title: 'Reading your first error', idea: 'A red message is help. It names the line and the kind of mistake.', minutes: 7, teaches: ['errors'], after: ['first-run'], trap: 'Reading only the top of the message.' },
  { id: 'variables', n: 5, part: 1, short: 'Variables', title: 'Variables are labelled boxes', idea: 'name = value puts a value in a box with a name tag. Put a new value in any time.', minutes: 9, teaches: ['variables'], after: ['calculator'], trap: 'Using a name before giving it a value.' },
  { id: 'types', n: 6, part: 1, short: 'Types', title: 'Kinds of values', idea: 'Every value has a type. "5" is text and 5 is a number, and they do not mix.', minutes: 8, teaches: ['types'], after: ['variables'], trap: 'Adding text and a number with +.' },
  // ---- Chapter 2: Asking and deciding ----
  { id: 'input-output', n: 7, part: 2, short: 'Input', title: 'Asking and answering', idea: 'input() asks a question. The answer always comes back as text, so convert it first.', minutes: 9, teaches: ['io'], after: ['types'], trap: '"5" + "3" giving 53 instead of 8.' },
  { id: 'compare', n: 8, part: 2, short: 'Compare', title: 'True or false questions', idea: 'A comparison asks a yes or no question. = stores a value, == asks if two are equal.', minutes: 8, teaches: ['logic'], after: ['types'], trap: 'Writing = when you mean ==.' },
  { id: 'if-else', n: 9, part: 2, short: 'if / else', title: 'Choosing a path', idea: 'if runs its lines only when the question is True. elif and else cover the rest.', minutes: 10, teaches: ['if'], after: ['compare'], trap: 'Wrong indentation, so a line falls outside its block.' },
  { id: 'and-or-not', n: 10, part: 2, short: 'and / or / not', title: 'and, or, not', idea: 'and needs both sides True, or needs one, and not flips the answer.', minutes: 8, teaches: ['boolops'], after: ['if-else'], trap: 'Writing x == 1 or 2 instead of x == 1 or x == 2.' },
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
  // ---- Level 2: Functions in depth (lessons_6.js, lessons_7.js) ----
  { id: 'calls', level: 2, n: 1, part: 7, short: 'Calls', title: 'Calling a function', idea: 'A call hands values in, the function does its work, and one value comes back to the spot that called it.',
    minutes: 9, teaches: ['calls'], after: ['return-print'], trap: 'Thinking the values you pass must have the same names as the parameters.' },
  { id: 'call-stack', level: 2, n: 2, part: 7, short: 'Call stack', title: 'The call stack is a pile of plates', idea: 'Each call puts a plate on the pile. return takes the top plate off, and the plate below carries on.',
    minutes: 10, teaches: ['stack'], after: ['calls'], trap: 'Thinking a function forgets where it was when it calls another one.' },
  { id: 'scope', level: 2, n: 3, part: 7, short: 'Scope', title: 'Which names can I see?', idea: 'A name made inside a function lives on that function’s plate. When the plate comes off, the name is gone.',
    minutes: 10, teaches: ['scope'], after: ['call-stack'], trap: 'Expecting a variable made inside a function to exist outside it.' },
  { id: 'defaults', level: 2, n: 4, part: 8, short: 'Defaults', title: 'Default and keyword arguments', idea: 'A parameter can have a default value. A keyword argument names the box it fills, so the order stops mattering.',
    minutes: 9, teaches: ['defaults'], after: ['calls'], trap: 'Passing values in the wrong order when you call without names.' },
  { id: 'many-args', level: 2, n: 5, part: 8, short: 'Any number', title: 'Any number of inputs', idea: 'A star in front of a parameter gathers any number of values into one group. The star does the work, not the name.',
    minutes: 9, teaches: ['varargs'], after: ['defaults'], trap: 'Thinking args is a magic word. Only the star matters.' },
  { id: 'mutable-args', level: 2, n: 6, part: 8, short: 'Shared lists', title: 'Two names, one list', idea: 'Passing a list does not copy it. The caller and the function share one list, so a change shows on both sides.',
    minutes: 10, teaches: ['mutation'], after: ['scope'], trap: 'Thinking the function got its own copy of the list.' },
  { id: 'callbacks', level: 2, n: 7, part: 9, short: 'Callbacks', title: 'Functions are values too', idea: 'A function is a value. Its name alone hands over the recipe; adding () cooks it and hands over the result.',
    minutes: 10, teaches: ['callbacks'], after: ['calls'], trap: 'Writing f() when you meant to pass f itself.' },
  { id: 'closures', level: 2, n: 8, part: 9, short: 'Closures', title: 'Functions that remember', idea: 'A function made inside another keeps the names around it, like a packed lunchbox it carries everywhere.',
    minutes: 11, teaches: ['closures'], after: ['scope', 'callbacks'], trap: 'Expecting the inner function to forget the outer names once the outer call ends.' },
  { id: 'recursion', level: 2, n: 9, part: 10, short: 'Recursion', title: 'A function that calls itself', idea: 'Recursion hands a smaller copy of the job to itself until a base case stops it. Plates pile up, answers come back down.',
    minutes: 12, teaches: ['recursion'], after: ['call-stack'], trap: 'Forgetting the base case, so the calls never stop.' },
  // ---- Level 3: Objects and classes (lessons_8.js and lessons_9.js). One world all the way through: the robot workshop. ----
  { id: 'objects', level: 3, n: 1, part: 11, short: 'Objects', title: 'Blueprints and objects', idea: 'A class is a blueprint. Each object built from it is a separate thing with its own data.',
    minutes: 10, teaches: ['objects'], after: ['calls', 'dicts'], trap: 'Thinking the class is the object. One blueprint builds many robots.' },
  { id: 'self', level: 3, n: 2, part: 11, short: 'self', title: 'self: which robot is it?', idea: 'self is the object a method was called on. bolt.beep() runs beep with self pointing at bolt.',
    minutes: 10, teaches: ['self'], after: ['objects'], trap: 'Leaving self out of the def line, so the call has one value too many.' },
  { id: 'init', level: 3, n: 3, part: 11, short: '__init__', title: 'Setting up a new object', idea: '__init__ runs once on a brand-new object to fill in its starting data. Python makes the object, then __init__ sets it up.',
    minutes: 10, teaches: ['init'], after: ['self'], trap: 'Forgetting self. in front of a name, so the value never lands on the object.' },
  { id: 'attributes', level: 3, n: 4, part: 11, short: 'Attributes', title: 'What it knows, what it does', idea: 'Attributes are what an object knows. Methods are what it can do, and they can change what it knows.',
    minutes: 10, teaches: ['methods'], after: ['init'], trap: 'Making a plain variable inside a method and expecting the object to keep it.' },
  { id: 'references', level: 3, n: 5, part: 12, short: 'References', title: 'Two names, one object', idea: 'b = a does not copy an object. Both names point at the same one, so a change through b shows through a.',
    minutes: 11, teaches: ['refs'], after: ['attributes', 'mutable-args'], trap: 'Thinking = makes a copy of the object.' },
  { id: 'class-attributes', level: 3, n: 6, part: 12, short: 'Shared data', title: 'Data the whole class shares', idea: 'Data on the class is shared by every object. Python looks on the object first, then on its class.',
    minutes: 10, teaches: ['classattrs'], after: ['attributes'], trap: 'Setting a value through one object and expecting every object to see it.' },
  { id: 'encapsulation', level: 3, n: 7, part: 12, short: 'Guarded data', title: 'Keeping data safe', idea: 'Let methods guard every change to an object’s data, so it can never end up in a broken state.',
    minutes: 10, teaches: ['encapsulation'], after: ['attributes'], trap: 'Thinking a leading underscore locks the data. It is only a polite sign.' },
  { id: 'inheritance', level: 3, n: 8, part: 13, short: 'Inheritance', title: 'The family tree', idea: 'A child class gets everything its parent has. It only writes what is different.',
    minutes: 11, teaches: ['inheritance'], after: ['attributes'], trap: 'Copying a whole class to change one method, instead of building on it.' },
  { id: 'super', level: 3, n: 9, part: 13, short: 'super()', title: 'Override, then call super()', idea: 'A child can replace a parent’s method. super() runs the parent’s version too, so the child adds instead of repeats.',
    minutes: 10, teaches: ['super'], after: ['inheritance'], trap: 'Forgetting super().__init__(), so the parent’s setup never runs.' },
  { id: 'polymorphism', level: 3, n: 10, part: 13, short: 'Same call', title: 'Same call, different robots', idea: 'Ask every object to do the same thing and each does its own version. The loop never needs to know which kind it has.',
    minutes: 10, teaches: ['polymorphism'], after: ['super'], trap: 'Writing a long if and elif on the type instead of letting each class answer.' },
  { id: 'composition', level: 3, n: 11, part: 14, short: 'Composition', title: 'Built from parts', idea: 'Is-a means inheritance. Has-a means an object keeps another object as a part. Has-a is often the better fit.',
    minutes: 11, teaches: ['composition'], after: ['inheritance', 'polymorphism'], trap: 'Inheriting from a class just to borrow some of its code.' },
  { id: 'dunder', level: 3, n: 12, part: 14, short: 'Dunders', title: 'Teaching objects print, == and len', idea: 'Methods with double underscores let print, == and len work on your own objects.',
    minutes: 10, teaches: ['dunder'], after: ['attributes'], trap: 'Expecting == to compare the data when the class never said how.' },
  { id: 'interfaces', level: 3, n: 13, part: 14, short: 'Contracts', title: 'A contract every class signs', idea: 'An abstract class lists the methods every child must write. Forget one and Python stops you before anything runs.',
    minutes: 10, teaches: ['interfaces'], after: ['polymorphism'], trap: 'Trying to build an object straight from the abstract class.' },
  { id: 'no-class', level: 3, n: 14, part: 14, short: 'No class?', title: 'When not to use a class', idea: 'A class earns its place when data and behaviour belong together. Otherwise a function or a dictionary is simpler.',
    minutes: 9, teaches: ['design'], after: ['composition'], trap: 'Wrapping every little thing in a class.' },
  // ---- Level 4: Writing better code (coming later) ----
  { id: 'clean-names', level: 4, n: 1, part: 15, short: 'Good names', title: 'Names that explain themselves', idea: 'A good name says what a value means, so the code reads like a sentence.', minutes: 8, teaches: ['style'], after: ['functions'] },
  // ---- Level 5: Waiting without blocking (coming later) ----
  { id: 'event-loop', level: 5, n: 1, part: 16, short: 'Event loop', title: 'The event loop is a queue', idea: 'Slow jobs wait in a queue. The loop takes the next ready one, so nothing freezes.', minutes: 10, teaches: ['async'], after: ['functions'] }
];
