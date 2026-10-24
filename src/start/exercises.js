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
// hints    a ladder of two or three hints, gentlest first. After the last one the page offers the answer; fix and write
//          exercises also offer "Stuck? Put the lines in order", a drag-to-order puzzle made from the reference.
// tests/startcheck.js runs every reference and predict snippet in JavaScript, and in Python when it is installed.
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
  ]
};
