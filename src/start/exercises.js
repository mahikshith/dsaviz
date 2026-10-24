// Practice for each Start here lesson: 3 to 5 tiny exercises, every one written for DSAMaxxing.
// kind     predict  read the code, pick what it prints        code {py, js}, choices {py: [...], js: [...]}, answer (index), why
//          choose   a multiple-choice question, no code run   choices [...], answer, why (choices may be { py, js })
//          order    drag the lines into the right order        lines {py: [...], js: [...]} in the right order, shuffle (the order shown)
//          fill     type the missing piece in each blank ___   code {py, js} with ___ blanks, answers {py: [...], js: [...]}
//          trace    fill a trace table: a variable's value     code (Python), var, answer [values in order, as Python shows them]
//                   after each change
//          fix      the program has one bug: fix it            starter {py, js}, ref {py, js}
//          write    write a small program or function          starter {py, js}, ref {py, js}
// tests    order, fill, fix and write run in the real runner. A program is checked by what it prints:
//          cases: [{ stdin: [lines], out }] (out may be { py, js } when the two languages print differently).
//          A function exercise sets fn and params instead, and cases: [[args, want]].
// hints    a ladder of two or three hints, gentlest first (a hint may be { py, js }). After the last one the page offers the answer; fix and write
//          exercises also offer "Stuck? Put the lines in order", a drag-to-order puzzle made from the reference.
// tests/startcheck.js runs every reference and predict snippet in JavaScript, and in Python when it is installed.
// stSame(choices): the same predict choices in Python and JavaScript.
const stSame = (a) => ({ py: a, js: a });
const START_EXERCISES = {
  'what-is-a-program': [
    { id: 'what-is-a-program:1', kind: 'order', title: 'A sandwich for Bolt', ask: 'Bolt needs exact steps. Put them in an order that makes a sandwich.',
      lines: { py: ['print("Take two slices of bread")', 'print("Spread butter on one slice")', 'print("Put the slices together")'],
        js: ['console.log("Take two slices of bread");', 'console.log("Spread butter on one slice");', 'console.log("Put the slices together");'] },
      shuffle: [2, 0, 1], cases: [{ out: 'Take two slices of bread\nSpread butter on one slice\nPut the slices together' }],
      hints: ['You cannot spread butter before you have the bread.', 'The slices go together last.'] },
    { id: 'what-is-a-program:2', kind: 'choose', title: 'The missing step', ask: 'Bolt must water a plant. Step 1: fill the can. Step 3: pour the water on the plant. What is step 2?',
      choices: ['Carry the can to the plant', 'Fill the can again', 'Put the can away', 'Buy a new plant'], answer: 0,
      why: 'Bolt cannot pour on the plant from the tap. It needs to be told to walk over first.',
      hints: ['Where is Bolt standing after step 1?', 'Step 3 only works if Bolt is next to the plant.'] },
    { id: 'what-is-a-program:3', kind: 'predict', title: 'Quotes or no quotes', ask: 'What does this program print?',
      code: { py: 'print(2 + 3)\nprint("2 + 3")', js: 'console.log(2 + 3);\nconsole.log("2 + 3");' },
      choices: { py: ['5\n2 + 3', '5\n5', '2 + 3\n2 + 3', '2 + 3\n5'], js: ['5\n2 + 3', '5\n5', '2 + 3\n2 + 3', '2 + 3\n5'] }, answer: 0,
      why: 'Without quotes the computer does the sum. With quotes it is just text, shown exactly as written.',
      hints: ['Look at which line has quotes.', 'Quotes mean "show this text as it is".'] },
    { id: 'what-is-a-program:4', kind: 'write', title: 'Let the computer add', ask: 'Write one line that prints the sum of 10 and 15. Let the computer do the adding.',
      starter: { py: '# Write your line below\n', js: '// Write your line below\n' }, ref: { py: 'print(10 + 15)\n', js: 'console.log(10 + 15);\n' },
      cases: [{ out: '25' }], hints: ['Start with print( and end with ).', 'Put 10 + 15 inside the brackets, with no quotes.'] }
  ],
  'first-run': [
    { id: 'first-run:1', kind: 'fill', title: 'Good morning, Bolt', ask: 'Fill the blank so the program prints Good morning',
      code: { py: 'print(___)', js: 'console.log(___);' }, answers: { py: ['"Good morning"'], js: ['"Good morning"'] },
      cases: [{ out: 'Good morning' }], hints: ['Text goes inside quotes.', 'Type "Good morning" with a quote at each end.'] },
    { id: 'first-run:2', kind: 'predict', title: 'Two pieces', ask: 'What does this print?',
      code: { py: 'print("Hi", "there")', js: 'console.log("Hi", "there");' },
      choices: stSame(['Hithere', '"Hi", "there"', 'Hi there', 'Hi, there']), answer: 2,
      why: 'A comma between two pieces prints them with one space in between.', hints: ['The quotes are not printed.', 'Think about what the comma adds.'] },
    { id: 'first-run:3', kind: 'fix', title: 'The missing quote', ask: 'This should print Welcome but it stops with an error. Fix it.',
      starter: { py: 'print("Welcome)\n', js: 'console.log("Welcome);\n' }, ref: { py: 'print("Welcome")\n', js: 'console.log("Welcome");\n' },
      cases: [{ out: 'Welcome' }], hints: ['Count the quotes. There should be two.', 'Add a quote right after the word Welcome.'] },
    { id: 'first-run:4', kind: 'order', title: 'Ready, set, go', ask: 'Put the lines in order so Bolt counts down to the race.',
      lines: { py: ['print("Ready")', 'print("Set")', 'print("Go!")'], js: ['console.log("Ready");', 'console.log("Set");', 'console.log("Go!");'] },
      shuffle: [1, 2, 0], cases: [{ out: 'Ready\nSet\nGo!' }], hints: ['The race starts with Ready.', 'Go! comes last.'] },
    { id: 'first-run:5', kind: 'write', title: 'Bolt says hello', ask: 'Write two lines. The first prints Bolt and the second prints beep boop.',
      starter: { py: '# Two lines, two prints\n', js: '// Two lines, two prints\n' }, ref: { py: 'print("Bolt")\nprint("beep boop")\n', js: 'console.log("Bolt");\nconsole.log("beep boop");\n' },
      cases: [{ out: 'Bolt\nbeep boop' }], hints: ['Each print shows one line.', 'Write print("Bolt") on the first line.'] }
  ],
  'calculator': [
    { id: 'calculator:1', kind: 'predict', title: 'Times goes first', ask: 'What does this print?',
      code: { py: 'print(10 - 2 * 3)', js: 'console.log(10 - 2 * 3);' }, choices: stSame(['24', '4', '10', '-4']), answer: 1,
      why: '2 * 3 is worked out first, giving 6, and 10 - 6 is 4.', hints: ['Which comes first, * or -?', 'Work out 2 * 3 before the take-away.'] },
    { id: 'calculator:2', kind: 'predict', title: 'Sharing 17 acorns', ask: 'Penny shares 17 acorns between 5 friends. What does this print?',
      code: { py: 'print(17 // 5, 17 % 5)', js: 'console.log(Math.floor(17 / 5), 17 % 5);' }, choices: stSame(['3.4 0', '3 2', '2 3', '3 3']), answer: 1,
      why: 'Each friend gets 3 whole acorns (15 in all), and 2 are left over.', hints: ['How many whole fives fit in 17?', 'Three fives make 15. What is left?'] },
    { id: 'calculator:3', kind: 'fill', title: 'Make 42', ask: 'Fill in the sign so the program prints 42.',
      code: { py: 'print(6 ___ 7)', js: 'console.log(6 ___ 7);' }, answers: { py: ['*'], js: ['*'] },
      cases: [{ out: '42' }], hints: ['6 + 7 is only 13.', 'Use the times sign.'] },
    { id: 'calculator:4', kind: 'fix', title: 'The average', ask: 'This should print the average of 4 and 6 (that is 5) but it prints 7. Fix it.',
      starter: { py: 'print(4 + 6 / 2)\n', js: 'console.log(4 + 6 / 2);\n' }, ref: { py: 'print((4 + 6) / 2)\n', js: 'console.log((4 + 6) / 2);\n' },
      cases: [{ out: { py: '5.0', js: '5' } }], hints: ['Division happens before addition.', 'Put brackets around 4 + 6 so it is added first.'] },
    { id: 'calculator:5', kind: 'write', title: 'Minutes in a day', ask: 'Print how many minutes are in a day: 24 hours, each with 60 minutes.',
      starter: { py: '# One line\n', js: '// One line\n' }, ref: { py: 'print(24 * 60)\n', js: 'console.log(24 * 60);\n' },
      cases: [{ out: '1440' }], hints: ['Hours times minutes per hour.', 'print(24 * 60)'] }
  ],
  'first-error': [
    { id: 'first-error:1', kind: 'choose', title: 'Name it', ask: 'The error says a name is not defined. What most likely went wrong?',
      choices: ['A quote is missing', 'A name is misspelled, or used before it has a value', 'Text was added to a number', 'The computer is broken'], answer: 1,
      why: 'Python only knows names it has seen. A typo makes a brand new name it has never seen.', hints: ['Look at the word "name" in the message.', 'Check the spelling of every word on that line.'] },
    { id: 'first-error:2', kind: 'choose', title: 'A string that never ends', ask: 'The error says a piece of text never ends. What should you look for on that line?',
      choices: ['A missing closing quote', 'A misspelled name', 'A missing number', 'An extra line'], answer: 0,
      why: 'Text starts at one quote and ends at the next. Without the second quote it runs on forever.', hints: ['What marks the end of a piece of text?', 'Count the quotes on the line.'] },
    { id: 'first-error:3', kind: 'fix', title: 'Ready, steady, typo', ask: 'This should print Ready, Steady and Go on three lines. Read the error and fix it.',
      starter: { py: 'print("Ready")\npirnt("Steady")\nprint("Go")\n', js: 'console.log("Ready");\nconsloe.log("Steady");\nconsole.log("Go");\n' },
      ref: { py: 'print("Ready")\nprint("Steady")\nprint("Go")\n', js: 'console.log("Ready");\nconsole.log("Steady");\nconsole.log("Go");\n' },
      cases: [{ out: 'Ready\nSteady\nGo' }], hints: ['The error names line 2.', 'Compare the spelling on line 2 with lines 1 and 3.'] },
    { id: 'first-error:4', kind: 'fix', title: 'A bracket short', ask: 'This should print Go but it stops with an error. Fix it.',
      starter: { py: 'print("Go"\n', js: 'console.log("Go";\n' }, ref: { py: 'print("Go")\n', js: 'console.log("Go");\n' },
      cases: [{ out: 'Go' }], hints: ['Every ( needs a matching ).', 'Add ) after "Go".'] },
    { id: 'first-error:5', kind: 'choose', title: 'Where does it stop?', ask: 'A program has four print lines and a typo on line 3. What do you see when it runs?',
      choices: ['Nothing at all', 'Lines 1 and 2, then the error', 'All four lines and then the error', 'Only the error for line 3, then line 4'], answer: 1,
      why: 'The lines before the problem already ran. The program stops at the line it cannot run.', hints: ['Programs run from the top.', 'Does line 4 ever get a turn?'] }
  ],
  'variables': [
    { id: 'variables:1', kind: 'trace', title: 'Watch the boxes', ask: 'Follow the code line by line. Write the value of b each time it changes.',
      code: 'a = 3\nb = a\na = 4\nb = b + a', var: 'b', answer: ['3', '7'],
      hints: ['b = a copies the value 3 into b. Changing a later does not change b.', 'At the end, b + a is 3 + 4.'] },
    { id: 'variables:2', kind: 'predict', title: 'A copy, not a link', ask: 'What does this print?',
      code: { py: 'a = 3\nb = a\na = 4\nprint(b)', js: 'let a = 3;\nlet b = a;\na = 4;\nconsole.log(b);' }, choices: stSame(['4', '7', 'a', '3']), answer: 3,
      why: 'b got the value 3. Putting 4 in a later does not touch the b box.', hints: ['What was in a when b was made?', 'b and a are two separate boxes.'] },
    { id: 'variables:3', kind: 'fix', title: 'Too early', ask: 'This should print 10, but Python does not know score yet. Fix the order.',
      starter: { py: 'print(score)\nscore = 10\n', js: 'console.log(score);\nlet score = 10;\n' }, ref: { py: 'score = 10\nprint(score)\n', js: 'let score = 10;\nconsole.log(score);\n' },
      cases: [{ out: '10' }], hints: ['Programs run from the top.', 'Give score its value before you print it.'] },
    { id: 'variables:4', kind: 'fill', title: 'Two more apples', ask: 'apples starts at 5. Fill the blank so it ends up as 7.',
      code: { py: 'apples = 5\napples = apples ___ 2\nprint(apples)', js: 'let apples = 5;\napples = apples ___ 2;\nconsole.log(apples);' }, answers: { py: ['+'], js: ['+'] },
      cases: [{ out: '7' }], hints: ['5 and 2 should make 7.', 'Use the plus sign.'] },
    { id: 'variables:5', kind: 'write', title: 'Name tag', ask: 'Make a variable called name holding "Dot". Then print Hi, Dot by printing "Hi," and name.',
      starter: { py: '# Make the box, then print\n', js: '// Make the box, then print\n' }, ref: { py: 'name = "Dot"\nprint("Hi,", name)\n', js: 'let name = "Dot";\nconsole.log("Hi,", name);\n' },
      cases: [{ out: 'Hi, Dot' }], hints: ['name = "Dot" makes the box.', 'Print two pieces with a comma between them.'] }
  ],
  'types': [
    { id: 'types:1', kind: 'choose', title: 'Spot the text', ask: 'Which of these values is a string (text)?',
      choices: [{ py: '42', js: '42' }, { py: '4.2', js: '4.2' }, { py: '"42"', js: '"42"' }, { py: 'True', js: 'true' }], answer: 2,
      why: 'The quotes make it text, even though it looks like a number.', hints: ['Which one has quotes?', 'Quotes always mean text.'] },
    { id: 'types:2', kind: 'predict', title: 'Text plus text', ask: 'What does this print?',
      code: { py: 'print("4" + "2")', js: 'console.log("4" + "2");' }, choices: stSame(['6', '42', '"42"', '4 2']), answer: 1,
      why: '+ joins two pieces of text end to end. No quotes are printed.', hints: ['Are these numbers or text?', '+ on text joins it.'] },
    { id: 'types:3', kind: 'fix', title: 'Next birthday', ask: 'age holds "12" as text. This should print 13. Fix the second line.',
      starter: { py: 'age = "12"\nprint(age + 1)\n', js: 'let age = "12";\nconsole.log(age + 1);\n' }, ref: { py: 'age = "12"\nprint(int(age) + 1)\n', js: 'let age = "12";\nconsole.log(Number(age) + 1);\n' },
      cases: [{ out: '13' }], hints: ['Text and a number do not add up to 13.', { py: 'Turn age into a number with int(age).', js: 'Turn age into a number with Number(age).' }] },
    { id: 'types:4', kind: 'predict', title: 'Convert, then multiply', ask: 'What does this print?',
      code: { py: 'print(int("3") * 2)', js: 'console.log(Number("3") * 2);' }, choices: stSame(['33', '"6"', '6', 'An error']), answer: 2,
      why: 'The text "3" becomes the number 3 first, and 3 * 2 is 6.', hints: ['What does the conversion turn "3" into?', 'Then it is plain maths.'] },
    { id: 'types:5', kind: 'fill', title: 'Make it a number', ask: 'Fill the blank so n is a number and the program prints 10.',
      code: { py: 'n = ___("8")\nprint(n + 2)', js: 'let n = ___("8");\nconsole.log(n + 2);' }, answers: { py: ['int'], js: ['Number'] },
      cases: [{ out: '10' }], hints: ['You need the function that turns text into a whole number.', { py: 'It is int.', js: 'It is Number.' }] }
  ],
  'input-output': [
    { id: 'input-output:1', kind: 'fill', title: 'One more', ask: 'The program reads a number and prints the number after it. Fill the blank.',
      code: { py: 'n = ___(input("Number? "))\nprint(n + 1)', js: 'let n = ___(prompt("Number? "));\nconsole.log(n + 1);' }, answers: { py: ['int'], js: ['Number'] },
      cases: [{ stdin: ['21'], out: '22' }, { stdin: ['5'], out: '6' }], hints: ['The answer arrives as text.', { py: 'Convert it with int.', js: 'Convert it with Number.' }] },
    { id: 'input-output:2', kind: 'fix', title: '5 plus 3 is not 53', ask: 'This should add the two numbers you type. For 5 and 3 it prints 53. Fix it.',
      starter: { py: 'a = input("First? ")\nb = input("Second? ")\nprint(a + b)\n', js: 'let a = prompt("First? ");\nlet b = prompt("Second? ");\nconsole.log(a + b);\n' },
      ref: { py: 'a = int(input("First? "))\nb = int(input("Second? "))\nprint(a + b)\n', js: 'let a = Number(prompt("First? "));\nlet b = Number(prompt("Second? "));\nconsole.log(a + b);\n' },
      cases: [{ stdin: ['5', '3'], out: '8' }, { stdin: ['10', '20'], out: '30' }], hints: ['Both answers are text, so + joins them.', 'Convert each answer to a number before adding.'] },
    { id: 'input-output:3', kind: 'write', title: 'Greet anyone', ask: 'Read a name with input, then print Hello, followed by the name and an exclamation mark. For Sam: Hello, Sam!',
      starter: { py: '# Read a name, then greet it\n', js: '// Read a name, then greet it\n' },
      ref: { py: 'name = input("Name? ")\nprint("Hello, " + name + "!")\n', js: 'let name = prompt("Name? ");\nconsole.log("Hello, " + name + "!");\n' },
      cases: [{ stdin: ['Dot'], out: 'Hello, Dot!' }, { stdin: ['Sam'], out: 'Hello, Sam!' }], hints: ['Store the answer in a box first.', 'Join the pieces with +: "Hello, " + name + "!"'] },
    { id: 'input-output:4', kind: 'order', title: 'Welcome desk', ask: 'Order the lines so the desk says Welcome!, asks a name, then greets the visitor.',
      lines: { py: ['print("Welcome!")', 'name = input("Name? ")', 'print("Nice to meet you,", name)'], js: ['console.log("Welcome!");', 'let name = prompt("Name? ");', 'console.log("Nice to meet you,", name);'] },
      shuffle: [2, 1, 0], cases: [{ stdin: ['Dot'], out: 'Welcome!\nNice to meet you, Dot' }], hints: ['You cannot use name before you have asked for it.', 'The greeting line comes last.'] },
    { id: 'input-output:5', kind: 'choose', title: 'What comes back', ask: 'Someone types 7 when the program asks for input. What type is the answer?',
      choices: ['A whole number', 'Text (a string)', 'A decimal', 'True or False'], answer: 1,
      why: 'Whatever the person types comes back as text. Convert it when you need a number.', hints: ['Even digits arrive one way.', 'Remember "12" + "1".'] }
  ],
  'compare': [
    { id: 'compare:1', kind: 'predict', title: 'Two questions', ask: 'What does this print?',
      code: { py: 'print(7 > 3)\nprint(7 == 3)', js: 'console.log(7 > 3);\nconsole.log(7 === 3);' },
      choices: { py: ['False\nTrue', 'True\nTrue', 'True\nFalse', '7\n3'], js: ['false\ntrue', 'true\ntrue', 'true\nfalse', '7\n3'] }, answer: 2,
      why: '7 is more than 3, so the first is True. 7 is not equal to 3, so the second is False.', hints: ['Each line answers a yes or no question.', 'Is 7 equal to 3?'] },
    { id: 'compare:2', kind: 'fix', title: 'Store or ask?', ask: 'This should check whether score is 10 and print the answer. Fix the comparison.',
      starter: { py: 'score = 10\nprint(score = 10)\n', js: 'let score = 10;\nconsole.log(score = 10);\n' }, ref: { py: 'score = 10\nprint(score == 10)\n', js: 'let score = 10;\nconsole.log(score === 10);\n' },
      cases: [{ out: { py: 'True', js: 'true' } }], hints: ['One = stores a value.', { py: 'Use == to ask a question.', js: 'Use === to ask a question.' }] },
    { id: 'compare:3', kind: 'fill', title: 'Exactly eight', ask: 'Fill the blank so the program asks whether n is exactly 8.',
      code: { py: 'n = 8\nprint(n ___ 8)', js: 'let n = 8;\nconsole.log(n ___ 8);' }, answers: { py: ['=='], js: ['==='] },
      cases: [{ out: { py: 'True', js: 'true' } }], hints: ['Asking is not storing.', { py: 'Two equals signs.', js: 'Three equals signs.' }] },
    { id: 'compare:4', kind: 'choose', title: 'Which is True?', ask: 'x is 5. Which question is True?',
      choices: ['x < 5', 'x > 5', 'x <= 5', 'x != 5'], answer: 2,
      why: '<= means less than or equal, and 5 is equal to 5.', hints: ['Is 5 less than 5?', 'Look for the one that counts the edge.'] },
    { id: 'compare:5', kind: 'predict', title: 'On the edge', ask: 'What does this print?',
      code: { py: 'print(10 >= 10)', js: 'console.log(10 >= 10);' }, choices: { py: ['False', 'True', '10', 'An error'], js: ['false', 'true', '10', 'An error'] }, answer: 1,
      why: '>= is True when the left side is more or exactly equal.', hints: ['>= means "more than or equal to".', 'Is 10 equal to 10?'] }
  ],
  'if-else': [
    { id: 'if-else:1', kind: 'predict', title: 'Big or small', ask: 'What does this print?',
      code: { py: 'x = 7\nif x > 5:\n    print("big")\nelse:\n    print("small")', js: 'let x = 7;\nif (x > 5) {\n  console.log("big");\n} else {\n  console.log("small");\n}' },
      choices: stSame(['small', 'big\nsmall', 'big', 'nothing']), answer: 2, why: '7 > 5 is True, so the if block runs and else is skipped.', hints: ['Is 7 more than 5?', 'Only one of the two blocks runs.'] },
    { id: 'if-else:2', kind: 'fix', title: 'Inside the if', ask: 'This should print positive. Fix it so the print is inside the if.',
      starter: { py: 'n = 3\nif n > 0:\nprint("positive")\n', js: 'let n = 3;\nif n > 0 {\n  console.log("positive");\n}\n' },
      ref: { py: 'n = 3\nif n > 0:\n    print("positive")\n', js: 'let n = 3;\nif (n > 0) {\n  console.log("positive");\n}\n' },
      cases: [{ out: 'positive' }], hints: [{ py: 'Lines inside an if are indented.', js: 'In JavaScript the question needs brackets.' }, { py: 'Put four spaces before print.', js: 'Write if (n > 0) {' }] },
    { id: 'if-else:3', kind: 'order', title: 'Grade it', ask: 'score is 75. Order the lines so the program prints B.',
      lines: { py: ['score = 75', 'if score >= 90:', '    print("A")', 'elif score >= 70:', '    print("B")', 'else:', '    print("C")'],
        js: ['let score = 75;', 'if (score >= 90) {', '  console.log("A");', '} else if (score >= 70) {', '  console.log("B");', '} else {', '  console.log("C"); }'] },
      shuffle: [0, 3, 4, 1, 2, 5, 6], cases: [{ out: 'B' }], hints: ['The score has to exist before any question.', 'Ask the highest grade first, then the next one.'] },
    { id: 'if-else:4', kind: 'write', title: 'Even or odd', ask: 'Read a whole number. Print even if it divides by 2 with nothing left over, otherwise print odd.',
      starter: { py: 'n = int(input("Number? "))\n# Your if and else here\n', js: 'let n = Number(prompt("Number? "));\n// Your if and else here\n' },
      ref: { py: 'n = int(input("Number? "))\nif n % 2 == 0:\n    print("even")\nelse:\n    print("odd")\n', js: 'let n = Number(prompt("Number? "));\nif (n % 2 === 0) {\n  console.log("even");\n} else {\n  console.log("odd");\n}\n' },
      cases: [{ stdin: ['4'], out: 'even' }, { stdin: ['7'], out: 'odd' }, { stdin: ['0'], out: 'even' }], hints: ['n % 2 is the leftover after sharing into twos.', 'The leftover is 0 for even numbers.'] },
    { id: 'if-else:5', kind: 'fill', title: 'Teenager', ask: 'Fill the blank so the program prints teen for anyone aged 13 or more.',
      code: { py: 'age = 15\nif age ___ 13:\n    print("teen")', js: 'let age = 15;\nif (age ___ 13) {\n  console.log("teen");\n}' }, answers: { py: ['>='], js: ['>='] },
      cases: [{ out: 'teen' }], hints: ['13 itself counts.', 'More than or equal to.'] }
  ],
  'and-or-not': [
    { id: 'and-or-not:1', kind: 'predict', title: 'and, then or', ask: 'What does this print?',
      code: { py: 'print(True and False)\nprint(True or False)', js: 'console.log(true && false);\nconsole.log(true || false);' },
      choices: { py: ['True\nTrue', 'False\nTrue', 'False\nFalse', 'True\nFalse'], js: ['true\ntrue', 'false\ntrue', 'false\nfalse', 'true\nfalse'] }, answer: 1,
      why: 'and needs both sides True. or needs only one.', hints: ['Do both sides of the first line hold?', 'or is happy with one True.'] },
    { id: 'and-or-not:2', kind: 'fix', title: 'One or two?', ask: 'x is 3, so this should print something else. It prints one or two. Fix the question.',
      starter: { py: 'x = 3\nif x == 1 or 2:\n    print("one or two")\nelse:\n    print("something else")\n', js: 'let x = 3;\nif (x === 1 || 2) {\n  console.log("one or two");\n} else {\n  console.log("something else");\n}\n' },
      ref: { py: 'x = 3\nif x == 1 or x == 2:\n    print("one or two")\nelse:\n    print("something else")\n', js: 'let x = 3;\nif (x === 1 || x === 2) {\n  console.log("one or two");\n} else {\n  console.log("something else");\n}\n' },
      cases: [{ out: 'something else' }], hints: ['2 on its own always counts as True.', 'Write a full question on each side of or.'] },
    { id: 'and-or-not:3', kind: 'fill', title: 'Both rules', ask: 'A ride needs you to be 12 or older and to have a pass. Fill the blank.',
      code: { py: 'age = 15\nhas_pass = True\nif age >= 12 ___ has_pass:\n    print("ride")', js: 'let age = 15;\nlet hasPass = true;\nif (age >= 12 ___ hasPass) {\n  console.log("ride");\n}' }, answers: { py: ['and'], js: ['&&'] },
      cases: [{ out: 'ride' }], hints: ['Both rules must hold.', { py: 'The word is and.', js: 'Use &&.' }] },
    { id: 'and-or-not:4', kind: 'choose', title: 'Which is True?', ask: 'Which of these is True?',
      choices: [{ py: 'True and False', js: 'true && false' }, { py: 'False or False', js: 'false || false' }, { py: 'not True', js: '!true' }, { py: 'not False', js: '!false' }], answer: 3,
      why: 'not flips False into True.', hints: ['Work out each one.', 'not turns an answer around.'] },
    { id: 'and-or-not:5', kind: 'write', title: 'In range', ask: 'Read a whole number. Print in range if it is from 1 to 10 (both included), otherwise print out of range.',
      starter: { py: 'n = int(input("Number? "))\n', js: 'let n = Number(prompt("Number? "));\n' },
      ref: { py: 'n = int(input("Number? "))\nif n >= 1 and n <= 10:\n    print("in range")\nelse:\n    print("out of range")\n', js: 'let n = Number(prompt("Number? "));\nif (n >= 1 && n <= 10) {\n  console.log("in range");\n} else {\n  console.log("out of range");\n}\n' },
      cases: [{ stdin: ['5'], out: 'in range' }, { stdin: ['1'], out: 'in range' }, { stdin: ['10'], out: 'in range' }, { stdin: ['0'], out: 'out of range' }, { stdin: ['11'], out: 'out of range' }],
      hints: ['Two questions must both be True.', 'n >= 1 and n <= 10'] }
  ]
};
