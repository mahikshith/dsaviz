// About-this-lesson content for the Start here track (programming from zero, in Python). Our own writing; facts checked against the sources listed per lesson.
const PY_TUT = 'The Python Tutorial, docs.python.org/3/tutorial/';
const PY_LIB = 'The Python Standard Library reference, docs.python.org/3/library/';
const PY_REF = 'The Python Language Reference, docs.python.org/3/reference/';
const PY_FUNCS = 'Python built-in functions, docs.python.org/3/library/functions.html';
const START_ABOUT = {
  'what-is-a-program': {
    what: 'A program is a list of steps for a computer. The computer follows them one at a time, from the top. It does exactly what is written and nothing more.',
    analogy: 'Think of a recipe card. The cook reads each line in order and cannot guess what you meant.',
    uses: ['A game that moves your character when you press a key', 'A phone app that shows today\'s weather', 'A website that plays a video when you tap play'],
    before: [],
    words: [
      ['program', 'A list of steps that tells a computer what to do.'],
      ['code', 'The words and symbols we write to make a program.'],
      ['line', 'One row of code. Most lines hold one step.'],
      ['run', 'To ask the computer to follow the steps in a program.'],
      ['Python', 'The language we write our steps in. It reads a lot like plain English.']
    ],
    math: null,
    steps: ['You write the steps, one on each line.', 'You press run.', 'The computer reads line 1 and does it. Then it moves to line 2.', 'It stops after the last line.'],
    use: ['You want the computer to do a job the same way every time.', 'You can break the job into small, exact steps.'],
    avoid: ['Steps that are vague, like "make it nice". The computer cannot guess.', 'Steps in the wrong order. Order changes the result.'],
    mistakes: ['Expecting the computer to guess what you meant. Fix: write each step exactly.', 'Putting steps in the wrong order. Fix: read the program from the top, as the computer does.', 'Thinking the computer sees the whole program at once. Fix: it reads one line at a time.'],
    cheat: ['program = a list of exact steps', 'the computer runs it top to bottom', 'one step per line', 'the computer never guesses'],
    next: ['first-run'],
    sources: [PY_TUT + 'introduction.html', PY_TUT + 'interpreter.html']
  },
  'first-run': {
    what: 'The print function shows text on the screen. A function is a named tool that does one job. Text goes inside quote marks, so the computer knows where the text starts and ends. Text written this way is called a string.',
    analogy: 'Quote marks work like the two ends of a sticky label. Everything between them is the words to show.',
    uses: ['A game that shows "Game over" when you lose', 'A quiz app that shows your score', 'A website that shows "Welcome back" after you sign in'],
    before: ['what-is-a-program'],
    words: [
      ['print', 'A function that shows something on the screen.'],
      ['string', 'Text inside quote marks, such as "hello". It can hold letters, digits and spaces.'],
      ['quotes', 'The marks " or \' around a string. They show where the text starts and ends.'],
      ['function', 'A named tool that does one job. print is a function.'],
      ['output', 'What a program shows or gives back.']
    ],
    math: null,
    steps: ['Write print, then round brackets ( ).', 'Put your text inside the brackets, between quote marks.', 'Run the program.', 'The computer shows the text without the quote marks.'],
    use: ['You want to show a message to the person using the program.', 'You want to check what a program is doing while you build it.'],
    avoid: ['Writing print without the brackets.', 'Mixing quote marks, such as an opening " with a closing \'.'],
    mistakes: ['Leaving out a closing quote. Fix: every opening quote needs a matching closing quote.', 'Writing Print with a capital P. Fix: Python cares about capital letters, so write print.', 'Putting a sum in quotes and expecting an answer. Fix: print("2 + 2") shows the text 2 + 2. Write print(2 + 2) to get 4.'],
    cheat: ['print("hello")', 'quotes wrap the text', 'print("a", "b") shows a b', 'no quotes means a calculation or a name'],
    next: ['calculator', 'first-error'],
    sources: [PY_TUT + 'introduction.html#strings', PY_LIB + 'functions.html#print']
  },
  calculator: {
    what: 'Python can work out sums, like a calculator. It uses + to add, - to take away, * to multiply and / to divide. Two more signs give a whole-number answer and the leftover.',
    analogy: 'Sharing 17 sweets among 5 friends gives each friend 3 sweets. There are 2 sweets left over. Python can tell you both numbers.',
    uses: ['A shop app that adds up your basket', 'A game that takes away health when you are hit', 'A clock app that turns seconds into minutes and seconds'],
    before: ['first-run'],
    words: [
      ['operator', 'A sign that does a calculation, such as + or *.'],
      ['integer', 'A whole number with no decimal point, such as 7 or -3.'],
      ['float', 'A number with a decimal point, such as 3.5.'],
      ['//', 'Divide and keep only the whole part. So 7 // 2 is 3.'],
      ['%', 'Divide and keep only what is left over. So 7 % 2 is 1.'],
      ['order of operations', 'The rule about which sums happen first. *, /, // and % go before + and -.']
    ],
    math: {
      lines: ['7 = 2 \\times 3 + 1', '7 \\mathbin{//} 2 = 3', '7 \\mathbin{\\%} 2 = 1'],
      symbols: [
        ['7', 'the number we are sharing out'],
        ['2', 'how many friends share'],
        ['3', 'how many each friend gets (the answer to //)'],
        ['1', 'what is left over (the answer to %)'],
        ['\\times', 'multiply']
      ],
      example: [
        'Share 17 sweets among 5 friends.',
        'Each friend gets 17 // 5 = 3 sweets.',
        'There are 17 % 5 = 2 sweets left over.',
        'Check it: 5 × 3 + 2 = 17.'
      ]
    },
    steps: ['Write the sum inside print, such as print(12 + 30).', 'Python works out brackets first.', 'Then it does *, /, // and % from left to right.', 'Then it does + and -, from left to right.', 'It shows the answer.'],
    use: ['You need a number worked out while the program runs.', 'You want whole groups and a leftover, using // and %.'],
    avoid: ['Using / when you need a whole number. It always gives a decimal, such as 3.5.', 'Relying on order of operations without brackets when a reader could be unsure.'],
    mistakes: ['Forgetting that * and / go before + and -. Fix: 2 + 3 * 4 is 14, not 20. Use brackets to change the order: (2 + 3) * 4.', 'Using x to multiply. Fix: the sign is *.', 'Expecting 7 / 2 to give 3. Fix: / gives 3.5. Use // to get 3.'],
    cheat: ['+  -  *  /', '7 / 2 gives 3.5', '7 // 2 gives 3', '7 % 2 gives 1', 'brackets go first', '* / // % before + and -'],
    next: ['variables'],
    sources: [PY_TUT + 'introduction.html#numbers', PY_LIB + 'stdtypes.html#numeric-types-int-float-complex', PY_REF + 'expressions.html#operator-precedence']
  },
  'first-error': {
    what: 'An error is a red message that appears when Python cannot follow a line. The message is help. It names the line and the kind of mistake.',
    analogy: 'A road sign saying "bridge closed" does not mean you are a bad driver. It tells you where to turn.',
    uses: ['A game developer finds why a level will not load', 'A website team fixes a broken sign-in button', 'A phone app maker finds why a screen shows nothing'],
    before: ['first-run'],
    words: [
      ['error', 'A message that says Python could not follow a line.'],
      ['traceback', 'The full error message. It shows where the problem happened.'],
      ['syntax error', 'A spelling or punctuation mistake, such as a missing quote.'],
      ['name error', 'You used a word Python does not know, such as a misspelled command.'],
      ['type error', 'You mixed two kinds of value that do not fit, such as text and a number.']
    ],
    math: null,
    steps: ['Run your program and see the red message.', 'Read the last line first. It names the kind of error.', 'Find the line number in the message.', 'Look at that line, and the one above it.', 'Fix one thing, then run again.'],
    use: ['A program stops and you do not know why.', 'You want to learn what Python expects.'],
    avoid: ['Ignoring the message and changing random things.', 'Reading only the top of the message.'],
    mistakes: ['Reading only the top of the message. Fix: the last line says what went wrong. The line number says where.', 'Changing many things at once. Fix: change one thing, then run again.', 'Fearing errors. Fix: every programmer sees them all day. They are normal.'],
    cheat: ['read the last line first', 'find the line number', 'SyntaxError: spelling or punctuation', 'NameError: unknown word', 'TypeError: values that do not fit'],
    next: ['variables', 'debugging'],
    sources: [PY_TUT + 'errors.html', PY_LIB + 'exceptions.html']
  },
  variables: {
    what: 'A variable is a box with a name tag that holds a value. You write name = value, and Python puts the value in the box with that name. You can put a new value in at any time.',
    analogy: 'Picture a box with a name tag on it. You put something inside, and you can swap it later.',
    uses: ['A game that keeps your score', 'A shopping app that remembers how many items are in your basket', 'A music player that remembers the song number'],
    before: ['calculator'],
    words: [
      ['variable', 'A box with a name tag that holds a value, so you can use the value later.'],
      ['value', 'A piece of data, such as the number 12 or the text "hi".'],
      ['assignment', 'Putting a value into a variable with the = sign.'],
      ['name', 'The label you pick for a variable, such as score.'],
      ['=', 'In Python this means "store the value on the right under the name on the left".']
    ],
    math: null,
    steps: ['Pick a name, such as acorns.', 'Write acorns = 12. Python stores 12 under that name.', 'Use the name later, such as print(acorns).', 'Store a new value any time. The old one is replaced.', 'A line like acorns = acorns + 5 reads the old value, adds 5, and stores the result.'],
    use: ['You need to remember something while the program runs.', 'You use the same value in many places and want to change it in one.'],
    avoid: ['Names that say nothing, such as x, when a clearer name fits.', 'Using a name before you have stored a value in it.'],
    mistakes: ['Using a name before giving it a value. Fix: store a value first, then use it.', 'Thinking = means "equal to" as in maths. Fix: it means "store this". The next lessons show how to ask if two values are equal.', 'Mixing capital letters, such as Score and score. Fix: they are two different names. Pick one style.'],
    cheat: ['score = 0', 'score = score + 1', 'a name holds one value at a time', 'new value replaces the old', 'a name has no spaces: write my_score, with an underscore _ between the words'],
    next: ['types'],
    sources: [PY_TUT + 'introduction.html#using-python-as-a-calculator', PY_REF + 'simple_stmts.html#assignment-statements']
  },
  types: {
    what: 'Every value has a type, which is its kind. The number 5 and the text "5" look alike but are different kinds. They do not mix, so Python needs you to convert one first.',
    analogy: 'Numbers and words are like coins and keys. Both fit in a pocket, but you cannot add a key to a coin.',
    uses: ['A game that treats your score as a number and your name as text', 'A shop app that adds prices but shows product names', 'A form on a website that checks an age is a number'],
    before: ['variables'],
    words: [
      ['type', 'The kind of a value, such as whole number, decimal, text or True/False.'],
      ['int', 'The type for whole numbers, such as 5.'],
      ['float', 'The type for numbers with a decimal point, such as 2.5.'],
      ['str', 'Short for string. The type for text, such as "5".'],
      ['bool', 'The type with only two values, True and False.'],
      ['convert', 'To change a value from one type to another, such as int("5").']
    ],
    math: null,
    steps: ['Look at the value. Quotes mean text. Digits alone mean a number.', 'Use type(value) to ask Python what kind it is.', 'Check the two sides of a + match. Two numbers add. Two strings join.', 'Convert when they do not match, with int(), float() or str().'],
    use: ['You get text from a person but need to do a sum with it.', 'You want to join a number into a message.'],
    avoid: ['Adding a string and a number with +.', 'Assuming a value is a number because it looks like one.'],
    mistakes: ['Adding text and a number with +. Fix: convert one, for example "Age: " + str(7).', 'Thinking "5" and 5 are the same. Fix: the quotes make "5" text. Text joins, numbers add.', 'Writing true or false in lower case. Fix: Python needs True and False with capitals.'],
    cheat: ['int  float  str  bool', 'type(5)', '"5" is text, 5 is a number', 'int("5") gives 5', 'str(5) gives "5"', '"a" + "b" gives "ab"'],
    next: ['input-output', 'compare'],
    sources: [PY_LIB + 'stdtypes.html', PY_FUNCS]
  },
  'input-output': {
    what: 'The input function asks a question and waits for an answer. The answer always comes back as text, even if the person types digits. Convert it with int() if you need a number.',
    analogy: 'A paper form has a blank line. A paper form holds only marks. You must read the marks as a number before you add them.',
    uses: ['A game that asks for your player name', 'A calculator app that reads the numbers you type', 'A sign-in page that reads your username'],
    before: ['types'],
    words: [
      ['input', 'A function that shows a question, waits, and gives back what the person typed.'],
      ['string', 'Text. Everything input gives back is a string.'],
      ['int()', 'A function that turns text such as "8" into the whole number 8.'],
      ['prompt', 'The question you put inside input(), such as "Your name? ".'],
      ['output', 'What the program shows with print.']
    ],
    math: null,
    steps: ['Write name = input("Your name? ").', 'The program shows the question and waits.', 'The person types and presses Enter.', 'The typed text is stored in name.', 'For a number, put int( ) around it: age = int(input("Age? ")). The input part runs first.'],
    use: ['The program needs something from the person using it.', 'You want to make a program feel like a conversation.'],
    avoid: ['Doing sums on the raw answer before converting it.', 'Converting text that is not a number, such as "ten".'],
    mistakes: ['Adding two answers and getting "53" instead of 8. Fix: both are text, so + joins them. Convert with int() first.', 'Forgetting the space at the end of the question. Fix: write "Age? " so the answer does not touch the question.', 'Calling int() on words. Fix: int only works on text made of digits.'],
    cheat: ['name = input("Name? ")', 'age = int(input("Age? "))', 'input always gives text', 'int() makes whole numbers', 'float() makes decimals'],
    next: ['if-else'],
    sources: [PY_LIB + 'functions.html#input', PY_FUNCS]
  },
  compare: {
    what: 'A comparison asks a yes-or-no question about two values. The answer is True or False. A single = stores a value, and a double == asks if two values are equal.',
    analogy: 'It is like a guard at a door asking "are you 12 or older?". The answer is yes or no, and nothing else.',
    uses: ['A game that checks if your health is zero', 'A website that checks if you typed the right password', 'A shop app that checks if you have enough money'],
    before: ['types'],
    words: [
      ['comparison', 'A question about two values, such as age >= 10.'],
      ['bool', 'A value that is only True or False. Its type is called bool.'],
      ['==', 'Asks "are these two equal?".'],
      ['!=', 'Asks "are these two different?".'],
      ['<  >  <=  >=', 'Less than, greater than, at most, at least.']
    ],
    math: null,
    steps: ['Write two values with a comparison sign between them.', 'Python checks the question.', 'It gives back True or False.', 'You can store that answer in a variable or use it to choose a path.'],
    use: ['You need a yes-or-no answer before the program picks what to do.', 'You want to check a rule, such as "old enough".'],
    avoid: ['Comparing a string and a number, such as "5" == 5. The answer is False.', 'Using = when you want to ask a question.'],
    mistakes: ['Writing = when you mean ==. Fix: one = stores, two == asks.', 'Mixing up < and <=. Fix: < leaves out the boundary value, <= includes it.', 'Writing true in lower case. Fix: Python needs True with a capital.'],
    cheat: ['==  equal', '!=  different', '<  >  <=  >=', 'the answer is True or False', '= stores, == asks'],
    next: ['if-else'],
    sources: [PY_TUT + 'datastructures.html#comparisons', PY_LIB + 'stdtypes.html#comparisons']
  },
  'if-else': {
    what: 'The if command runs a block of lines only when its question is True. Use elif for a second question and else for everything left. Only one block runs.',
    analogy: 'It is like a fork in a path with signs. If the sign says left, you go left. Otherwise you check the next sign.',
    uses: ['A game that shows "You win" or "Try again"', 'A weather app that suggests a coat or sunglasses', 'A website that shows a different page when you are signed in'],
    before: ['compare'],
    words: [
      ['if', 'Runs the lines under it only when its question is True.'],
      ['elif', 'Short for "else if". A second question, asked only if the first was False.'],
      ['else', 'The block that runs when none of the questions was True.'],
      ['block', 'The lines indented under an if, elif or else.'],
      ['indentation', 'The spaces at the start of a line. They show which block the line belongs to.']
    ],
    math: null,
    steps: ['Write if, a question, and a colon.', 'Indent the lines that belong to it.', 'Python checks the question. If True, it runs the block and skips the rest.', 'If False, it tries the next elif, and then the else.', 'The program carries on after the whole group.'],
    use: ['The program must do different things in different situations.', 'You have several choices and only one should happen.'],
    avoid: ['A long chain of questions when a short one fits.', 'Questions in the wrong order, where an early one hides a later one.'],
    mistakes: ['Forgetting the colon at the end of the if line. Fix: add a : after the question.', 'Wrong indentation, so a line falls outside its block. Fix: indent every line of the block by the same amount.', 'Writing = in the question. Fix: use == to ask if two values are equal.'],
    cheat: ['if x > 5:', 'elif x > 2:', 'else:', 'indent the block', 'only one block runs'],
    next: ['and-or-not', 'for-range'],
    sources: [PY_TUT + 'controlflow.html#if-statements', PY_REF + 'compound_stmts.html#the-if-statement']
  },
  'and-or-not': {
    what: 'The words and, or and not join True/False questions. The word and needs both sides True. The word or needs at least one side True. The word not flips the answer.',
    analogy: 'To enter the treehouse you need a badge and the password. With or, either one is enough. With not, you may enter only if you are not on the banned list.',
    uses: ['A game door that needs a key and a high enough level', 'A website that lets you in with a password or a saved sign-in', 'A shop that gives a discount to children or seniors'],
    before: ['if-else'],
    words: [
      ['and', 'True only when both sides are True.'],
      ['or', 'True when at least one side is True.'],
      ['not', 'Flips True to False and False to True.'],
      ['condition', 'The question after if, which is True or False.'],
      ['truth table', 'A small chart listing the answer for every True/False mix.']
    ],
    math: null,
    steps: ['Write each small question on its own, such as badge and password == "owl".', 'Python works out each side to True or False.', 'It joins them with and, or or not.', 'The final True or False decides the path.'],
    use: ['One rule depends on two or more facts.', 'You want to say "anything except this".'],
    avoid: ['Long mixes of and, or and not without brackets.', 'Writing the same question twice when one would do.'],
    mistakes: ['Writing x == 1 or 2 instead of x == 1 or x == 2. Fix: each side of or needs its own full question.', 'Mixing up and with or. Fix: say the rule out loud. "Both" means and. "Either" means or.', 'Forgetting brackets. Fix: and goes before or, so add brackets to be clear.'],
    cheat: ['a and b: both True', 'a or b: one True is enough', 'not a: flips it', 'x == 1 or x == 2', 'use brackets to be clear'],
    next: ['edge-cases'],
    sources: [PY_TUT + 'datastructures.html#more-on-conditions', PY_REF + 'expressions.html#boolean-operations']
  },
  'edge-cases': {
    what: 'An edge case is an unusual input at the edge of what your program expects. Examples are zero, a negative number and the exact boundary value. Test these first, because bugs hide there.',
    analogy: 'A lift sign says "no more than 3 people". A tester tries exactly 3 people, not only 1.',
    uses: ['A game that must not let your health go below zero', 'A ticket app that checks a child is exactly the age limit', 'A shop that handles an empty basket'],
    before: ['and-or-not'],
    words: [
      ['edge case', 'An unusual input at the edge of what is allowed, such as 0 or the limit itself.'],
      ['boundary', 'The exact value where the rule changes, such as 10 in "10 or more".'],
      ['bug', 'A mistake in a program that makes it do the wrong thing.'],
      ['test', 'Running a program with chosen inputs to see if the answers are right.'],
      ['empty', 'Holding nothing, such as zero items.']
    ],
    math: null,
    steps: ['Read the rule, such as "10 cups or more get a discount".', 'List the odd inputs: zero, a negative, one step below the boundary, exactly on it, one step above.', 'Run the program with each one.', 'Check each answer against the rule.', 'Fix the line that is wrong, then test them all again.'],
    use: ['You finish a rule with if and want to be sure it is right.', 'The program takes numbers from a person, who may type anything.'],
    avoid: ['Testing only the easy middle values.', 'Assuming a person will always give sensible input.'],
    mistakes: ['Using < where the rule says "or more". Fix: "10 or more" needs >=, so 10 itself is included.', 'Never testing zero. Fix: always try 0 and a negative number.', 'Fixing one case and forgetting the others. Fix: test the whole list after every change.'],
    cheat: ['try 0', 'try a negative', 'try the exact boundary', 'try one below and one above', 'test again after every fix'],
    next: ['path-project'],
    sources: [PY_TUT + 'controlflow.html#if-statements', PY_LIB + 'stdtypes.html#comparisons']
  },
  'path-project': {
    what: 'In this project you join input and if to build a small adventure with three endings. The program asks where you go and picks a story from your answer.',
    analogy: 'It is like a book where you choose which page to turn to. Each answer sends you to a different ending.',
    uses: ['A text adventure game', 'A quiz that tells you which kind of animal you are', 'A help bot that picks a reply from your answer'],
    before: ['edge-cases', 'input-output'],
    words: [
      ['project', 'A small program that uses several ideas together.'],
      ['input', 'A command that asks a question and gives back the typed text.'],
      ['if', 'A command that runs a block only when its question is True.'],
      ['ending', 'One of the possible results the story can reach.'],
      ['branch', 'One of the paths the program can take.']
    ],
    math: null,
    steps: ['Ask a question with input and store the answer.', 'Use if to check the answer.', 'Use elif for the other choices.', 'Use else for any answer you did not plan for.', 'Print the ending for the path chosen.'],
    use: ['You want to practise input and if together.', 'You want a program people can play with.'],
    avoid: ['Forgetting an else, so an odd answer gives no ending.', 'Checking the answer with = instead of ==.'],
    mistakes: ['Typing "Left" when the program checks "left". Fix: tell the player to type small letters, or check both: door == "left" or door == "Left".', 'Writing = in the if line. Fix: use == to compare.', 'Forgetting the else. Fix: add one so every answer gets an ending.'],
    cheat: ['door = input("Left or right? ")', 'if door == "left":', 'elif door == "right":', 'else:', 'every path ends with a print'],
    next: ['for-range'],
    sources: [PY_TUT + 'controlflow.html#if-statements', PY_LIB + 'stdtypes.html#str.lower']
  },
  'for-range': {
    what: 'A for loop repeats a block of lines once for each item in a group. The command range(1, 6) hands out the numbers 1, 2, 3, 4 and 5. The loop stops before the last number.',
    analogy: 'Think of hiding an acorn in each of five trees. You do the same job at each tree, then stop.',
    uses: ['A game that draws every enemy on the screen', 'A music app that goes through each song in a playlist', 'A website that builds a row for each message'],
    before: ['variables', 'if-else'],
    words: [
      ['loop', 'A way to repeat lines of code.'],
      ['for', 'The command that starts a loop which goes through a group of values.'],
      ['range', 'A command that makes a run of numbers. It starts at the first and stops before the last.'],
      ['lap', 'One time through the loop block.'],
      ['loop variable', 'The name that holds the current value on each lap, such as tree.']
    ],
    math: null,
    steps: ['Write for, a name you choose, the word in, a range of numbers, and a colon.', 'Python puts the first number in the name.', 'It runs the indented block.', 'It moves to the next number and runs the block again.', 'When the numbers run out, the loop ends and the program carries on.'],
    use: ['You know how many times to repeat.', 'You want to do the same thing for every number in a run.'],
    avoid: ['Writing the same line many times by hand.', 'Changing the loop variable inside the block.'],
    mistakes: ['Off by one: range(5) stops at 4. Fix: range(5) gives 0 to 4. For 1 to 5 write range(1, 6).', 'Forgetting the colon after range. Fix: add a : at the end of the for line.', 'Forgetting to indent the block. Fix: indent every line that should repeat.'],
    cheat: ['for i in range(3):', 'range(3) gives 0, 1, 2', 'range(1, 6) gives 1 to 5', 'the last number is left out', 'indent the repeated lines'],
    next: ['while', 'accumulator'],
    sources: [PY_TUT + 'controlflow.html#for-statements', PY_TUT + 'controlflow.html#the-range-function']
  },
  while: {
    what: 'A while loop repeats its block as long as its question stays True. Something inside the block must change, or the question never turns False and the loop never stops.',
    analogy: 'Filling a bucket: keep pouring while the bucket is not full. Each pour changes the water level, so the pouring ends.',
    uses: ['A game that keeps running until you quit', 'A chat app that keeps waiting for new messages', 'A guessing game that repeats until you guess right'],
    before: ['for-range'],
    words: [
      ['while', 'The command that repeats a block as long as its question is True.'],
      ['condition', 'The True/False question that decides if the loop goes again.'],
      ['infinite loop', 'A loop that never stops, because its question never becomes False.'],
      ['counter', 'A variable that changes on each lap, such as water.'],
      ['iteration', 'One lap of a loop.']
    ],
    math: null,
    steps: ['Set up a starting value, such as water = 0.', 'Write while, a question and a colon.', 'Python checks the question. If False, the loop ends.', 'If True, it runs the block once.', 'It goes back to the question and checks again.'],
    use: ['You do not know in advance how many laps you need.', 'You want to repeat until something happens.'],
    avoid: ['Using while when a for loop over a known range is clearer.', 'A question that can never become False.'],
    mistakes: ['A loop that never stops because nothing changes. Fix: change the checked value inside the block. Press Stop to end a runaway loop.', 'Forgetting to set the starting value. Fix: create the variable before the loop.', 'Using < when you need <=. Fix: check the last lap by hand.'],
    cheat: ['while water < 3:', 'set the start before the loop', 'change something inside', 'False means stop', 'for = known count, while = until done'],
    next: ['accumulator', 'guess-project'],
    sources: [PY_TUT + 'introduction.html#first-steps-towards-programming', PY_REF + 'compound_stmts.html#the-while-statement']
  },
  accumulator: {
    what: 'An accumulator is a variable that builds up a result. It starts at 0, and each lap of a loop adds to it. When the loop ends, the variable holds the total.',
    analogy: 'A piggy bank starts empty. Each day you drop in a coin, and the total grows.',
    uses: ['A game that adds up your points', 'A shop app that adds up the price of every item in your basket', 'A fitness app that totals your steps for the week'],
    before: ['while'],
    words: [
      ['accumulator', 'A variable that collects a result, a bit at a time, across loop laps.'],
      ['total', 'The running sum so far.'],
      ['start value', 'The first value you give a variable before the loop, such as total = 0.'],
      ['change', 'To give a variable a new value made from its old one, such as total = total + day.'],
      ['loop', 'Lines that repeat, lap after lap.']
    ],
    math: {
      lines: ['start: total = 0', 'each lap: new total = old total + this value'],
      symbols: [
        ['total', 'the sum so far'],
        ['old total', 'the total before this lap'],
        ['this value', 'the number added on this lap']
      ],
      example: [
        'The numbers are 1, 2, 3 and 4. We start with total = 0.',
        'Lap 1 adds 1, so the new total is 0 + 1 = 1.',
        'Lap 2 adds 2, so the new total is 1 + 2 = 3.',
        'Lap 3 adds 3, so the new total is 3 + 3 = 6.',
        'Lap 4 adds 4, so the new total is 6 + 4 = 10. The loop ends.'
      ]
    },
    steps: ['Before the loop, set total = 0.', 'Start a loop over the numbers.', 'On each lap, change the total with total = total + day.', 'Do not touch the total anywhere else.', 'After the loop ends, use the total.'],
    use: ['You need a sum, a count, or a product across many values.', 'You want one answer from many numbers.'],
    avoid: ['Starting the total inside the loop, which wipes it each lap.', 'Using it for a task with one value.'],
    mistakes: ['Resetting the total inside the loop. Fix: put total = 0 before the loop, not inside it.', 'Forgetting to start at 0. Fix: a variable must have a value before you add to it.', 'Printing inside the loop when you want one total. Fix: print after the loop ends.'],
    cheat: ['total = 0', 'for day in range(1, 5):', '    total = total + day', 'print(total) after the loop', 'start before, change inside'],
    next: ['lists'],
    sources: [PY_TUT + 'controlflow.html#for-statements', PY_REF + 'simple_stmts.html#augmented-assignment-statements']
  },
  lists: {
    what: 'A list keeps many values in order inside one variable. Each value sits in a numbered place called an index. The first place is number 0, not 1.',
    analogy: 'A backpack with numbered pockets. Pocket 0 holds the first thing you packed.',
    uses: ['A game that keeps your inventory of items', 'A music app that keeps a playlist of songs', 'A website that keeps a list of messages'],
    before: ['accumulator'],
    words: [
      ['list', 'An ordered group of values in square brackets, such as [3, 9, 4].'],
      ['item', 'One value inside a list.'],
      ['index', 'The number of an item\'s place. The first index is 0.'],
      ['append', 'A command that adds an item to the end of a list.'],
      ['len', 'A command that gives how many items a list holds.']
    ],
    math: null,
    steps: ['Write the items between square brackets, split by commas.', 'Read an item with its index, such as bag[0].', 'Use bag[-1] to read the last item.', 'Use bag.append("snack") to add one at the end.', 'Use len(bag) to count the items.'],
    use: ['You need to keep many related values together.', 'You want to add, find or go through values in order.'],
    avoid: ['Making many separate variables, like item1, item2, item3.', 'Using an index you have not checked against len.'],
    mistakes: ['Asking for index len(list), which is one past the end. Fix: the last index is len(list) - 1, or use -1.', 'Thinking the first item is 1. Fix: counting starts at 0.', 'Forgetting the commas between items. Fix: split items with commas.'],
    cheat: ['bag = ["map", "torch"]', 'bag[0] is the first', 'bag[-1] is the last', 'bag.append("rope")', 'len(bag) counts items'],
    next: ['list-loops', 'strings'],
    sources: [PY_TUT + 'introduction.html#lists', PY_TUT + 'datastructures.html#more-on-lists']
  },
  'list-loops': {
    what: 'A for loop can visit every item in a list, one at a time. Add an accumulator to add them up, count them, or find the biggest.',
    analogy: 'A teacher checks every student in a row, one after another. She notes down the tallest as she goes.',
    uses: ['A game that adds up the score of every player', 'A shop that finds the cheapest item in a list', 'A weather app that finds the hottest day of the week'],
    before: ['lists'],
    words: [
      ['for item in items', 'A loop that puts each item of the list into a name, one per lap.'],
      ['traverse', 'To visit every item in a list.'],
      ['biggest', 'A variable that keeps the largest value seen so far.'],
      ['accumulator', 'A variable that builds a result across laps.'],
      ['count', 'How many items matched some rule.']
    ],
    math: null,
    steps: ['Write for w in weights: to visit each item.', 'Before the loop, set up your accumulator.', 'Inside the loop, compare or add using w.', 'Update the accumulator if needed.', 'After the loop, use the result.'],
    use: ['You want to sum, count or search a list.', 'You want to find the biggest or smallest item.'],
    avoid: ['Looping by index when you only need the items.', 'Changing the list while you loop over it.'],
    mistakes: ['Starting the biggest at 0 when every value is negative. Fix: start from the first item, weights[0].', 'Resetting the accumulator inside the loop. Fix: set it up before the loop.', 'Forgetting to indent the body. Fix: indent every line that belongs to the loop.'],
    cheat: ['for w in weights:', 'biggest = weights[0]', 'if w > biggest:', '    biggest = w', 'set up before, update inside'],
    next: ['strings', 'dicts'],
    sources: [PY_TUT + 'controlflow.html#for-statements', PY_FUNCS + '#max']
  },
  strings: {
    what: 'A string is text, and it acts like a list of letters. You can count the letters, read one by its index, cut out a piece, and loop over it.',
    analogy: 'A necklace of beads, one letter on each bead. You can count them, point at one, or take a few in a row.',
    uses: ['A website that checks the length of a password', 'A chat app that finds a word in a message', 'A game that shows your name in capital letters'],
    before: ['lists'],
    words: [
      ['string', 'Text in quote marks. It is a row of letters.'],
      ['index', 'The number of a letter\'s place. The first is 0.'],
      ['slice', 'A piece cut out of a string, such as note[1:4].'],
      ['immutable', 'Cannot be changed in place. A string stays the same. You make a new one instead.'],
      ['len', 'A command that gives how many letters a string has.']
    ],
    math: null,
    steps: ['Use len(note) to count the letters.', 'Use note[0] for the first letter and note[-1] for the last.', 'Use note[1:4] for letters 1 to 3. It stops before 4.', 'Use note[::-1] to read the letters backwards.', 'Use for letter in note: to visit each letter.'],
    use: ['You need to read or check parts of some text.', 'You want to build a new string from an old one.'],
    avoid: ['Trying to change one letter in place.', 'Forgetting that spaces count as letters.'],
    mistakes: ['Trying to change one letter in place, as in note[0] = "j". Fix: strings cannot change. Build a new string.', 'Reading past the end. Fix: the last index is len(note) - 1.', 'Forgetting that a slice leaves out its end number. Fix: note[1:4] gives letters 1, 2 and 3.'],
    cheat: ['len(note)', 'note[0] first, note[-1] last', 'note[1:4] a slice', 'note[::-1] backwards', 'for ch in note:'],
    next: ['nested-loops', 'dicts'],
    sources: [PY_TUT + 'introduction.html#strings', PY_LIB + 'stdtypes.html#text-sequence-type-str']
  },
  'nested-loops': {
    what: 'A nested loop is a loop inside another loop. The inner loop runs all its laps for each single lap of the outer loop. This is how you work through grids and tables.',
    analogy: 'A clock: the minute hand goes round fully for each step of the hour hand.',
    uses: ['A game that draws a grid of squares', 'A spreadsheet that fills every row and column', 'A photo app that visits every pixel in a picture'],
    before: ['strings'],
    words: [
      ['nested loop', 'A loop written inside another loop.'],
      ['outer loop', 'The loop on the outside. It runs fewer times.'],
      ['inner loop', 'The loop on the inside. It runs fully each time the outer loop goes once.'],
      ['row', 'A line across a grid.'],
      ['column', 'A line down a grid.']
    ],
    math: null,
    steps: ['Write the outer for loop, such as for row in range(3):.', 'Inside it, indent and write the inner loop.', 'The outer loop starts lap 1.', 'The inner loop runs all its laps.', 'Then the outer loop starts lap 2, and the inner loop runs all its laps again.'],
    use: ['You need to visit every cell in a grid.', 'You need every pairing of two groups.'],
    avoid: ['Nesting when one loop would do.', 'Nesting many loops deep, which gets slow.'],
    mistakes: ['Mixing up the inner and outer counters. Fix: give them names that say what they count, such as row and col.', 'Wrong indentation, so the print is in the wrong loop. Fix: line it up with the loop it belongs to.', 'Forgetting that the inner loop restarts every time. Fix: set up its variables inside the outer loop.'],
    cheat: ['for row in range(3):', '    for col in range(4):', 'inner loop finishes first', '3 * 4 = 12 laps in all', 'indent each level more'],
    next: ['functions'],
    sources: [PY_TUT + 'controlflow.html#for-statements', PY_REF + 'compound_stmts.html#the-for-statement']
  },
  functions: {
    what: 'A function is a named set of lines you can use again. You write it once with def. Then you call it by name whenever you need it, handing in the values it needs.',
    analogy: 'A recipe card. The card lists the steps. You give it ingredients and the cook follows the same steps each time.',
    uses: ['A game that calls the same "draw the player" function every frame', 'A website that uses one "check password" function on many pages', 'A phone app that reuses one "send message" function'],
    before: ['input-output', 'if-else', 'list-loops'],
    words: [
      ['function', 'A named group of lines you can use again.'],
      ['def', 'The word that starts a function. It means "define".'],
      ['parameter', 'A name in the def line that waits for a value, like an ingredient on the card.'],
      ['argument', 'The real value you hand in when you call the function.'],
      ['call', 'Using a function by writing its name and brackets.']
    ],
    math: null,
    steps: ['Write def, the name, brackets with parameters, and a colon.', 'Indent the lines of the function body.', 'The function does nothing yet. It is only written down.', 'Call it by name, such as feed("Wren").', 'Python runs the body with the argument in the parameter.'],
    use: ['You repeat the same lines in many places.', 'You want to give a group of steps a clear name.'],
    avoid: ['Functions that do many unrelated jobs.', 'Copying lines around instead of writing a function.'],
    mistakes: ['Calling a function before it is defined. Fix: put the def above the call.', 'Forgetting the brackets and the value when calling. Fix: write feed("Wren"), not feed.', 'Forgetting the colon on the def line. Fix: add a : at the end.'],
    cheat: ['def feed(bird):', 'indent the body', 'feed("Wren") calls it', 'define first, call after', 'parameters in, work done'],
    next: ['return-print', 'calls'],
    sources: [PY_TUT + 'controlflow.html#defining-functions', PY_REF + 'compound_stmts.html#function-definitions']
  },
  'return-print': {
    what: 'The return command hands a value back to whoever called the function. The print command only shows a value on the screen. If you need the value later, use return.',
    analogy: 'Shouting out a dish name (print) is not the same as handing over the plate (return).',
    uses: ['A game function that gives back your new score', 'A shop function that gives back the total price', 'A calculator app that gives back the answer to use again'],
    before: ['functions'],
    words: [
      ['return', 'Sends a value back to the line that called the function, and ends the function.'],
      ['print', 'Shows a value on the screen. It does not hand it back.'],
      ['None', 'The value Python gives when a function returns nothing.'],
      ['result', 'The value a function gives back.'],
      ['caller', 'The line of code that called the function.']
    ],
    math: null,
    steps: ['Write the function with the work inside.', 'End with return and the answer, such as return w * h.', 'Call it and store the result: size = area(3, 4).', 'Use the stored value in more steps.', 'Show it with print only when a person needs to see it.'],
    use: ['The result is needed by other lines of your program.', 'You want a function that can be combined with others.'],
    avoid: ['Using print where the caller needs the value.', 'Putting lines after return. They never run.'],
    mistakes: ['Printing the answer instead of returning it. Fix: use return, so the caller can use the value.', 'Forgetting return and getting None. Fix: add return before the value.', 'Writing code after return and expecting it to run. Fix: return ends the function at once.'],
    cheat: ['return w * h', 'size = area(3, 4)', 'print shows, return hands back', 'no return means None', 'return ends the function'],
    next: ['dicts', 'debugging'],
    sources: [PY_TUT + 'controlflow.html#defining-functions', PY_REF + 'simple_stmts.html#the-return-statement']
  },
  dicts: {
    what: 'A dictionary stores values under names called keys. You find a value by its key, not by its place. It works well for counting things.',
    analogy: 'You hand in a coat and get a ticket. Later, the ticket finds your coat.',
    uses: ['A game that stores each player\'s score under their name', 'A phone book app that finds a number from a name', 'A website that stores your settings by setting name'],
    before: ['list-loops'],
    words: [
      ['dictionary', 'A group of key and value pairs, written in curly brackets.'],
      ['key', 'The label used to find a value, like the coat ticket.'],
      ['value', 'The data stored under a key.'],
      ['pair', 'One key together with its value.'],
      ['.get', 'A command that reads a key and gives a backup answer if the key is missing.']
    ],
    math: null,
    steps: ['Make an empty dictionary: counts = {}.', 'Store a pair: counts["oak"] = 4.', 'Read by key: counts["oak"].', 'Use counts.get("elm", 0) when a key may be missing.', 'Loop over the keys with for key in counts:.'],
    use: ['You need to find something fast by its name.', 'You want to count how often things appear.'],
    avoid: ['Using a list when you search by name every time.', 'Reading a key that may not exist, without .get.'],
    mistakes: ['Reading a key that is not there yet. Fix: use counts.get(key, 0), or check key in counts first.', 'Using square brackets to make a dictionary. Fix: curly brackets make dictionaries.', 'Expecting a key twice. Fix: a key is unique. Storing it again replaces the old value.'],
    cheat: ['counts = {}', 'counts["oak"] = 4', 'counts["oak"]', 'counts.get("elm", 0)', '"oak" in counts'],
    next: ['debugging'],
    sources: [PY_TUT + 'datastructures.html#dictionaries', PY_LIB + 'stdtypes.html#mapping-types-dict']
  },
  debugging: {
    what: 'Debugging means finding and fixing a mistake in a program. Ask three questions: what did I expect, what happened, and where did the two first differ? Then change one thing at a time.',
    analogy: 'A detective walks back through the day to find the exact minute things went wrong.',
    uses: ['A game team finds why a character walks through a wall', 'A website team finds why a button does nothing', 'A phone app team finds why a total comes out wrong'],
    before: ['first-error', 'return-print'],
    words: [
      ['bug', 'A mistake in a program.'],
      ['debugging', 'Finding and fixing bugs.'],
      ['trace', 'Following a program step by step, writing down each value.'],
      ['debug print', 'A print line added to see a value while the program runs.'],
      ['expected', 'The answer you think the program should give.']
    ],
    math: null,
    steps: ['Write down what you expected.', 'Run it and write down what happened.', 'Add print lines to see values along the way.', 'Find the first line where the real value differs from the expected one.', 'Fix that one thing, then run again.'],
    use: ['Your program gives a wrong answer without an error.', 'Your program stops and you do not know why.'],
    avoid: ['Changing many things at once.', 'Guessing without looking at real values.'],
    mistakes: ['Changing many things at once. Fix: change one thing, then run again, so you know what helped.', 'Staring at the code without running it. Fix: add print lines and look at the real values.', 'Forgetting to remove print lines later. Fix: delete them when the bug is fixed.'],
    cheat: ['what did I expect?', 'what happened?', 'where did it first differ?', 'print to see values', 'change one thing at a time'],
    next: ['guess-project', 'plan-it'],
    sources: [PY_TUT + 'errors.html', PY_LIB + 'functions.html#print']
  },
  'guess-project': {
    what: 'In this project you build a guessing game. The program holds a secret number. A while loop keeps asking until you guess it, and if tells you "Higher" or "Lower".',
    analogy: 'A friend hides a number and says closer or further until you find it.',
    uses: ['A number guessing game', 'A game that repeats a round until you win', 'A quiz that keeps asking until you answer correctly'],
    before: ['while', 'dicts', 'return-print'],
    words: [
      ['secret', 'The hidden number the player must find.'],
      ['guess', 'The number the player types in each round.'],
      ['while', 'Repeats a block as long as its question is True.'],
      ['input', 'Asks the player and gives back the typed text.'],
      ['int()', 'Turns the typed text into a whole number.']
    ],
    math: null,
    steps: ['Store the secret number and a starting guess.', 'Start a while loop that runs while guess != secret.', 'Inside, ask with input and convert with int().', 'Use if and elif to print "Higher" or "Lower".', 'When the guess matches, the loop ends. Print a win message.'],
    use: ['You want to practise while, input and if together.', 'You want a program people can play.'],
    avoid: ['A starting guess that equals the secret, so the loop never runs.', 'Forgetting int(), so the comparison never matches.'],
    mistakes: ['Comparing text with a number. Fix: wrap the input in int().', 'Starting the guess at the secret number. Fix: start at a value the secret can never be, such as 0.', 'Using = in the loop line. Fix: use != to mean "not equal".'],
    cheat: ['while guess != secret:', 'guess = int(input("Guess? "))', 'if guess < secret:', 'elif guess > secret:', 'print the win after the loop'],
    next: ['plan-it'],
    sources: [PY_TUT + 'controlflow.html#if-statements', PY_REF + 'compound_stmts.html#the-while-statement']
  },
  'plan-it': {
    what: 'Before you write code, write the steps in plain words. Then turn each step into one or two lines of code. A plan stops you from getting lost halfway.',
    analogy: 'Builders draw a plan before they lay any bricks. The plan shows what comes first.',
    uses: ['A game team plans how a level works before coding it', 'A website team writes the steps of a sign-up form first', 'A phone app maker plans what each screen must do'],
    before: ['return-print'],
    words: [
      ['plan', 'A list of steps, written in plain words.'],
      ['step', 'One small job in the plan.'],
      ['input', 'What goes into the program.'],
      ['output', 'What comes out of the program.'],
      ['function', 'A named set of lines that does one job.']
    ],
    math: null,
    steps: ['Write what goes in and what must come out.', 'Write the steps in plain words, in order.', 'Turn each step into one or two lines of code.', 'Run it with a small example.', 'Check the answer, and fix the plan if needed.'],
    use: ['The job has more than two or three steps.', 'You feel unsure where to start.'],
    avoid: ['Typing code before you know the steps.', 'Plans so long they take longer than the code.'],
    mistakes: ['Typing code before you know the steps. Fix: write the steps first, as comments. A comment is a line that starts with #.', 'Steps that are too big. Fix: split any step that needs more than a few lines.', 'Never checking the plan on an example. Fix: walk a small example through your steps by hand.'],
    cheat: ['what goes in?', 'what comes out?', 'steps in plain words', 'one or two lines per step', 'try a small example'],
    next: ['read-a-problem'],
    sources: [PY_TUT + 'controlflow.html#defining-functions', PY_TUT + 'introduction.html#using-python-as-a-calculator']
  },
  'read-a-problem': {
    what: 'A coding problem always has an input, an output and examples. Read all three before you write anything. Plan in words, try the simple way first, then test it.',
    analogy: 'It is like a puzzle box with instructions. Read what you are given, what you must produce, and the sample.',
    uses: ['A coding class exercise', 'A game feature request from a designer', 'A bug report from a user'],
    before: ['plan-it', 'debugging'],
    words: [
      ['problem', 'A job described in words, with an input and an expected output.'],
      ['input', 'What the function receives, such as a list of whole numbers.'],
      ['output', 'What the function must give back, such as a count.'],
      ['example', 'A sample input with its correct output.'],
      ['test', 'Running your code on chosen inputs to check the answers.']
    ],
    math: null,
    steps: ['Read the problem twice.', 'Write the input and the output in your own words.', 'Work through the example by hand.', 'Plan the simple, plain idea in words.', 'Code it, then test it on the example and the edge cases.'],
    use: ['You face a new problem and are unsure how to start.', 'You want to avoid solving the wrong problem.'],
    avoid: ['Skipping the examples.', 'Hunting for a clever idea before a working one.'],
    mistakes: ['Coding before you know what the answer looks like. Fix: write one example answer by hand first.', 'Missing a small word like "below" or "at least". Fix: underline the rule words.', 'Skipping the edge cases. Fix: try an empty list, zero and negatives.'],
    cheat: ['find the input', 'find the output', 'work an example by hand', 'try the simple way first', 'test, then improve'],
    next: ['counting-steps'],
    sources: [PY_TUT + 'controlflow.html#defining-functions', PY_TUT + 'datastructures.html#more-on-lists']
  },
  'counting-steps': {
    what: 'To compare two solutions, count the laps your loop makes. Then ask what happens when the input doubles. If the work doubles too, the cost grows in step with the input.',
    analogy: 'Checking every exam paper in a pile takes twice as long when the pile is twice as tall.',
    uses: ['A game that must stay fast with a thousand enemies', 'A search box that must answer quickly on a big website', 'A music app that sorts a long playlist'],
    before: ['read-a-problem'],
    words: [
      ['step', 'One small action, such as one lap of a loop.'],
      ['n', 'The size of the input, such as how many items are in the list.'],
      ['worst case', 'The input that makes the program do the most work.'],
      ['linear', 'Work that grows in step with n. Double the input, double the work.'],
      ['Big O', 'A short way to describe how the work grows, such as O(n).']
    ],
    math: {
      lines: ['\\text{laps} = n', '\\text{nested laps} = n \\times n'],
      symbols: [
        ['n', 'how many items are in the input'],
        ['\\text{laps}', 'how many times the loop block runs'],
        ['\\times', 'multiply']
      ],
      example: [
        'A list has n = 10 items. In the worst case, one loop runs 10 laps.',
        'With 20 items, it runs 20 laps. Doubling the input doubled the work.',
        'Now a loop inside a loop over 10 items runs 10 * 10 = 100 laps.',
        'With 20 items, it runs 20 * 20 = 400 laps. Doubling the input made the work four times bigger.'
      ]
    },
    steps: ['Find the loops in your code.', 'Count how many laps each makes for an input of size n.', 'For a loop inside a loop, multiply the laps.', 'Think about the worst case, such as a value not being in the list.', 'Double n in your head and see how the laps change.'],
    use: ['You want to know if a solution will stay fast on big inputs.', 'You are choosing between two ways to solve a problem.'],
    avoid: ['Counting lines of code instead of laps.', 'Worrying about speed before the solution works.'],
    mistakes: ['Counting lines of code instead of laps. Fix: count how many times the loop runs, not how many lines it has.', 'Only checking the lucky case. Fix: ask what happens if the answer is not found.', 'Forgetting that a loop inside a loop multiplies. Fix: multiply the laps of the two loops.'],
    cheat: ['count laps, not lines', 'n = size of the input', 'one loop: n laps', 'loop in a loop: n * n laps', 'think of the worst case', 'double n: what happens?'],
    next: ['calls'],
    sources: [PY_TUT + 'controlflow.html#for-statements', 'Python Wiki, TimeComplexity, wiki.python.org/moin/TimeComplexity']
  },
  calls: {
    what: 'A call hands values to a function. The function does its work. One value comes back to the spot that made the call. The names of the values you hand in do not have to match the names in the function.',
    analogy: 'You give a vending machine coins. It does its work inside and hands one snack back to you.',
    uses: ['A game that calls a function to work out damage', 'A website that calls a function to check a form', 'A calculator app that calls a function for each button'],
    before: ['return-print'],
    words: [
      ['call', 'Using a function by writing its name and brackets.'],
      ['argument', 'A real value handed in when you call.'],
      ['parameter', 'The name inside the function that receives the argument.'],
      ['return value', 'The one value that comes back to the caller.'],
      ['caller', 'The line of code that made the call.']
    ],
    math: null,
    steps: ['Write the call, such as snack(3).', 'Python matches 3 to the parameter coins.', 'The function body runs with coins = 3.', 'A return line sends back a value.', 'The call is replaced by that value, so got = snack(3) stores it.'],
    use: ['You need a piece of work done and an answer back.', 'You want to reuse the same work with different values.'],
    avoid: ['Forgetting that the call needs its brackets.', 'Handing in too many or too few values.'],
    mistakes: ['Thinking the values you pass must have the same names as the parameters. Fix: only the order matters, not the names.', 'Throwing away the return value. Fix: store it, as in got = snack(3).', 'Passing the wrong number of values. Fix: match the count in the def line.'],
    cheat: ['snack(3) is a call', '3 is the argument', 'coins is the parameter', 'return sends a value back', 'got = snack(3) keeps it'],
    next: ['call-stack', 'defaults', 'callbacks'],
    sources: [PY_TUT + 'controlflow.html#defining-functions', PY_REF + 'expressions.html#calls']
  },
  'call-stack': {
    what: 'Python keeps track of running functions in a pile called the call stack. Each call puts a new plate on top. When a function returns, its plate comes off, and the plate below carries on.',
    analogy: 'A pile of plates in a cafe. You add to the top and take from the top. The one on the bottom waits longest.',
    uses: ['A game where one action starts a chain of smaller actions', 'A website where one click starts a chain of checks', 'A phone app where a button calls a function that calls others'],
    before: ['calls'],
    words: [
      ['call stack', 'The pile that keeps track of which functions are running.'],
      ['frame', 'One plate on the pile. It holds one call\'s names and where it stopped.'],
      ['top', 'The plate that is running now.'],
      ['return', 'Takes the top plate off and gives a value to the plate below.'],
      ['push and pop', 'Add a plate to the top, and take the top plate off.']
    ],
    math: null,
    steps: ['The program starts. One plate sits on the pile.', 'A function calls another. A new plate lands on top.', 'The top plate runs. The one below waits.', 'The top function returns. Its plate comes off and the value passes down.', 'The plate below continues from the line where it stopped.'],
    use: ['You want to follow which function is running.', 'You want to read an error that lists several calls.'],
    avoid: ['Thinking only one function exists at a time.', 'Ignoring the order of the plates in an error message.'],
    mistakes: ['Thinking a function forgets where it was when it calls another one. Fix: its plate stays on the pile and it resumes.', 'Thinking the first function ends when it calls the second. Fix: it waits until the second one returns.', 'Reading an error from the top only. Fix: the last line is where it failed. Lines above show how it got there.'],
    cheat: ['call = add a plate', 'return = take a plate off', 'top plate is running', 'plates below wait', 'last in, first out'],
    next: ['scope', 'recursion'],
    sources: [PY_REF + 'executionmodel.html', PY_TUT + 'controlflow.html#defining-functions']
  },
  scope: {
    what: 'Scope is the area where a name can be seen. A name made inside a function lives on that function\'s plate. When the plate comes off, the name is gone.',
    analogy: 'A note pinned in your classroom can be read in the classroom. It cannot be read in another room.',
    uses: ['A game where each level has its own private values', 'A website where each function keeps its own temporary values', 'A phone app that keeps helper values hidden inside a function'],
    before: ['call-stack'],
    words: [
      ['scope', 'The part of a program where a name can be seen.'],
      ['local', 'A name made inside a function. Only that function sees it.'],
      ['global', 'A name made outside every function. Functions can read it.'],
      ['NameError', 'The error Python shows when you use a name it cannot see.'],
      ['shadowing', 'Giving a local name the same label as an outer one, which hides the outer one.']
    ],
    math: null,
    steps: ['A function starts. Python makes a plate for it.', 'Names made inside go on that plate.', 'The function looks first on its own plate, then outside.', 'The function ends and the plate comes off.', 'Its local names are gone.'],
    use: ['You want helper values that do not leak out.', 'You want to know why a name works in one place but not another.'],
    avoid: ['Using the same name for different things in nested places.', 'Relying on many global values.'],
    mistakes: ['Expecting a variable made inside a function to exist outside it. Fix: return the value, then store it where you need it.', 'Changing a global name inside a function and expecting it to change outside. Fix: assigning inside makes a new local name. Return the value instead.', 'Reusing a name by accident. Fix: use clear, different names.'],
    cheat: ['inside = local', 'outside = global', 'local names vanish when the function ends', 'look inside first, then outside', 'return the value to share it'],
    next: ['mutable-args', 'closures'],
    sources: [PY_TUT + 'classes.html#python-scopes-and-namespaces', PY_REF + 'executionmodel.html#naming-and-binding']
  },
  defaults: {
    what: 'A parameter can have a default value that is used when the caller leaves it out. A keyword argument names the parameter it fills, so the order stops mattering.',
    analogy: 'At a cafe, tea comes with no sugar unless you ask. You can also say "sugar: 2, size: big" in any order.',
    uses: ['A game function where speed has a normal value', 'A website function where the page size has a standard number', 'A phone app function where the volume starts at a sensible level'],
    before: ['calls'],
    words: [
      ['default value', 'The value a parameter takes when the caller does not give one.'],
      ['keyword argument', 'An argument written as name=value, so it fills the named parameter.'],
      ['positional argument', 'An argument matched by its place in the list.'],
      ['optional', 'Allowed to be left out.'],
      ['parameter', 'A name in the def line that receives a value.']
    ],
    math: null,
    steps: ['In the def line, write a default: sugar=0.', 'Call with every value to fill each place in order.', 'Leave out a value to use the default.', 'Or name a value to set it: tea(sugar=1, size="big").', 'Parameters without defaults must come first.'],
    use: ['Most calls use the same value for a parameter.', 'A call has many values and names make it easier to read.'],
    avoid: ['A list or dictionary as a default value.', 'Many positional values in a row, which is easy to mix up.'],
    mistakes: ['Passing values in the wrong order when you call without names. Fix: use keyword arguments, such as size="big".', 'Putting a default before a parameter without one. Fix: parameters with defaults come last.', 'Giving the same parameter twice. Fix: pass each parameter once.'],
    cheat: ['def tea(size, sugar=0):', 'tea("big") uses the default', 'tea("small", 2)', 'tea(sugar=1, size="big")', 'defaults go last'],
    next: ['many-args'],
    sources: [PY_TUT + 'controlflow.html#default-argument-values', PY_TUT + 'controlflow.html#keyword-arguments']
  },
  'many-args': {
    what: 'A star in front of a parameter gathers any number of values into one group. The function can then loop over the group. The star does the work, not the name.',
    analogy: 'A shopping bag that stretches. It holds three items or thirty, and you carry it as one thing.',
    uses: ['A game function that adds any number of scores', 'A shop function that totals any number of prices', 'A chat app function that sends one message to many friends'],
    before: ['defaults'],
    words: [
      ['*args', 'A parameter with a star. It gathers extra values into a group.'],
      ['tuple', 'A group of values in order that cannot be changed.'],
      ['gather', 'To collect many values into one name.'],
      ['unpack', 'To spread a group into separate arguments with a star when calling.'],
      ['variable-length', 'Able to take a different number of values each call.']
    ],
    math: null,
    steps: ['Write def total(*acorns): with a star.', 'Call it with any number of values: total(3, 4, 5).', 'Python gathers them into the group acorns.', 'Loop over the group inside the function.', 'Return the result.'],
    use: ['You do not know how many values will be handed in.', 'You want a function that works with two values or twenty.'],
    avoid: ['Using it when a list would be clearer.', 'Putting it before parameters that need names.'],
    mistakes: ['Thinking args is a magic word. Fix: only the star matters, so *acorns works as well.', 'Forgetting the star. Fix: without it, the function takes exactly one value.', 'Passing a list and expecting it to spread. Fix: add a star when calling: total(*mylist).'],
    cheat: ['def total(*acorns):', 'total(3, 4, 5)', 'acorns is a group', 'the star does the work', 'total(*mylist) spreads a list'],
    next: ['mutable-args'],
    sources: [PY_TUT + 'controlflow.html#arbitrary-argument-lists', PY_TUT + 'controlflow.html#unpacking-argument-lists']
  },
  'mutable-args': {
    what: 'Passing a list to a function does not copy it. The caller and the function share the same list, so a change made inside shows on both sides.',
    analogy: 'Two people hold the same notebook. When one writes a page, the other sees it.',
    uses: ['A game function that adds an item to your bag', 'A to-do app function that adds a task to the list', 'A shop function that removes an item from the basket'],
    before: ['scope'],
    words: [
      ['mutable', 'Can be changed in place. Lists are mutable.'],
      ['immutable', 'Cannot be changed in place. Numbers and strings are immutable.'],
      ['shared', 'Used by two names that point at the same thing.'],
      ['copy', 'A new list with the same items, which does not share changes.'],
      ['side effect', 'A change a function makes outside its own plate.']
    ],
    math: null,
    steps: ['You make a list and store it: mine = ["nut"].', 'You call add_acorn(mine).', 'The parameter bag points at the same list, not a copy.', 'bag.append("acorn") changes that one list.', 'mine shows the change after the call.'],
    use: ['You want a function to change a list in place.', 'You want to know why a list changed unexpectedly.'],
    avoid: ['Changing a list the caller did not expect you to touch.', 'Passing a list when you meant to pass a copy.'],
    mistakes: ['Thinking the function got its own copy of the list. Fix: it is the same list. Use bag.copy() to work on a copy.', 'Being surprised that numbers do not change. Fix: numbers cannot change in place, so the caller keeps the old one.', 'Changing a list while looping over it. Fix: loop over a copy.'],
    cheat: ['lists are shared when passed', 'append changes the one list', 'bag.copy() makes a copy', 'numbers and strings do not change in place', 'return a new list to be safe'],
    next: ['callbacks', 'references'],
    sources: [PY_TUT + 'datastructures.html#more-on-lists', PY_REF + 'datamodel.html#objects-values-and-types']
  },
  callbacks: {
    what: 'A function is a value, like a number or a string. Writing its name alone hands over the recipe. Adding brackets cooks it and hands over the result.',
    analogy: 'Handing someone a recipe card is not the same as handing them a cooked meal. The brackets mean "cook it now".',
    uses: ['A game that runs a function when you press a key', 'A website that runs a function when you click a button', 'A music app that sorts songs using a function you choose'],
    before: ['calls'],
    words: [
      ['callback', 'A function you hand to another function, to be called later.'],
      ['first-class', 'Treated like any other value. You can store it, pass it and return it.'],
      ['higher-order function', 'A function that takes another function or returns one.'],
      ['f', 'In this lesson, a parameter name that holds a function.'],
      ['call', 'Running a function by adding brackets after its name.']
    ],
    math: null,
    steps: ['Define a function, such as shout.', 'Pass its name, without brackets, to another function: twice(shout, "hi").', 'Inside, the parameter f holds shout.', 'Writing f(x) calls it.', 'The result is returned as usual.'],
    use: ['You want a function to be told what to do each time.', 'You want to run code later, when something happens.'],
    avoid: ['Passing shout() when you mean shout.', 'Long chains of callbacks that are hard to read.'],
    mistakes: ['Writing f() when you meant to pass f itself. Fix: leave off the brackets to hand over the function.', 'Forgetting the brackets when you do want to run it. Fix: add () to call it.', 'Passing a function that needs a different number of values. Fix: check what the receiving function will give it.'],
    cheat: ['shout is the function', 'shout("hi") runs it', 'pass the name, no brackets', 'f(x) runs the function inside', 'functions are values'],
    next: ['closures'],
    sources: [PY_TUT + 'controlflow.html#defining-functions', PY_REF + 'datamodel.html#the-standard-type-hierarchy']
  },
  closures: {
    what: 'A function made inside another function keeps the names around it. This is called a closure. Those names stay alive even after the outer function has finished.',
    analogy: 'A packed lunchbox. You leave home, but the lunch still goes with you.',
    uses: ['A game that makes a counter function for each player', 'A website that makes a greeting function for each user', 'A shop app that makes a discount function for each coupon'],
    before: ['scope', 'callbacks'],
    words: [
      ['closure', 'An inner function that keeps the outer names it uses.'],
      ['inner function', 'A function written inside another function.'],
      ['outer function', 'The function that contains the inner one.'],
      ['enclosing scope', 'The outer function\'s names that the inner function can see.'],
      ['factory', 'A function that makes and returns other functions.']
    ],
    math: null,
    steps: ['Write an outer function with a parameter, such as name.', 'Inside, define an inner function that uses name.', 'Return the inner function without brackets.', 'Call the outer function and store what it returns.', 'Call the stored function later. It still remembers name.'],
    use: ['You want small functions that each remember their own value.', 'You want to hold on to a value without a global name.'],
    avoid: ['Closures when a plain function with a parameter is clearer.', 'Changing the outer names from inside without care.'],
    mistakes: ['Expecting the inner function to forget the outer names once the outer call ends. Fix: it keeps them.', 'Returning greet() instead of greet. Fix: leave off the brackets to return the function itself.', 'Trying to change an outer number from inside. Fix: you need the nonlocal word to assign it.'],
    cheat: ['def outer(name):', '    def inner():', 'return inner (no brackets)', 'inner remembers name', 'each call makes a new inner'],
    next: ['recursion', 'objects'],
    sources: [PY_TUT + 'controlflow.html#defining-functions', PY_REF + 'executionmodel.html#resolution-of-names']
  },
  recursion: {
    what: 'Recursion is when a function calls itself with a smaller job. A base case stops it. Plates pile up on the call stack, and then answers come back down.',
    analogy: 'Russian dolls: each doll holds a smaller one, until the smallest, which holds nothing.',
    uses: ['A game that explores a maze', 'A file browser that opens folders inside folders', 'A website that shows comments with replies inside replies'],
    before: ['call-stack'],
    words: [
      ['recursion', 'A function that calls itself on a smaller job.'],
      ['base case', 'The smallest job, which the function answers directly. It stops the calls.'],
      ['recursive case', 'The part where the function calls itself with a smaller job.'],
      ['call stack', 'The pile of plates that keeps track of running calls.'],
      ['RecursionError', 'The error when calls pile up without end.']
    ],
    math: null,
    steps: ['Check the base case first. If it is true, answer and return.', 'Otherwise, do a little of the work.', 'Call the same function with a smaller job.', 'Each call puts a new plate on the stack.', 'At the base case, plates come off and answers pass back down.'],
    use: ['A job holds smaller copies of itself, such as folders in folders.', 'A loop would be awkward to write.'],
    avoid: ['Recursion for plain counting, where a loop is simpler.', 'Very deep recursion, which can fill the stack.'],
    mistakes: ['Forgetting the base case, so the calls never stop. Fix: write the stop rule first.', 'Making the job bigger or the same each call. Fix: each call must move closer to the base case.', 'Forgetting to return the result of the inner call. Fix: write return before the call when you need its answer.'],
    cheat: ['base case first', 'call yourself with a smaller job', 'each call = a plate', 'no base case = error', 'smaller each time'],
    next: ['objects'],
    sources: [PY_TUT + 'controlflow.html#defining-functions', PY_LIB + 'sys.html#sys.getrecursionlimit']
  },
  objects: {
    what: 'A class is a blueprint. Each object built from it is a separate thing with its own data. One blueprint can build many objects.',
    analogy: 'A cookie cutter is the class. Each cookie it makes is an object, and each can have its own icing.',
    uses: ['A game where every enemy is an object built from one Enemy class', 'A website where every user is an object built from one User class', 'A music app where every song is an object'],
    before: ['calls', 'dicts'],
    words: [
      ['class', 'A blueprint that says what kind of thing you can build.'],
      ['object', 'One thing built from a class, with its own data.'],
      ['instance', 'Another word for an object made from a class.'],
      ['attribute', 'A piece of data that belongs to an object, such as its name.'],
      ['dot', 'The . that reaches inside an object, as in robot1.name.']
    ],
    math: null,
    steps: ['Write class Robot: to make the blueprint.', 'Build an object by calling it: robot1 = Robot().', 'Build another: robot2 = Robot().', 'Store data on each with a dot: robot1.name = "Mira".', 'Each object keeps its own data.'],
    use: ['You have many similar things, each with its own data.', 'You want data and actions to belong together.'],
    avoid: ['A class for a thing you only need once.', 'Putting everything in one giant class.'],
    mistakes: ['Thinking the class is the object. Fix: the class is the blueprint. Robot() builds an object.', 'Forgetting the brackets when building. Fix: write Robot(), not Robot.', 'Expecting objects to share data they set separately. Fix: each object has its own.'],
    cheat: ['class Robot:', 'robot1 = Robot()', 'robot1.name = "Mira"', 'one class, many objects', 'each object has its own data'],
    next: ['self'],
    sources: [PY_TUT + 'classes.html', PY_REF + 'compound_stmts.html#class-definitions']
  },
  self: {
    what: 'Inside a class, a method is a function that belongs to an object. The word self is the object the method was called on. In robot1.beep(), self points at robot1.',
    analogy: 'A teacher says "open your own book". The words "your own" mean a different book for each student.',
    uses: ['A game where each enemy moves using its own position', 'A website where each user\'s page shows that user\'s name', 'A music app where each song object plays its own file'],
    before: ['objects'],
    words: [
      ['method', 'A function written inside a class.'],
      ['self', 'The first parameter of a method. It points at the object being used.'],
      ['dot call', 'Calling a method with a dot, as in robot1.beep().'],
      ['attribute', 'A piece of data on an object, read as self.name.'],
      ['object', 'One thing built from a class.']
    ],
    math: null,
    steps: ['Write a method with self first: def beep(self):.', 'Call it on an object: robot1.beep().', 'Python hands robot1 in as self.', 'Inside, self.name means this object\'s name.', 'Another object gives its own name.'],
    use: ['A method needs to read or change its object\'s data.', 'You want the same action to work on any object of the class.'],
    avoid: ['Using a plain name where you need self.name.', 'Passing self yourself when you call.'],
    mistakes: ['Leaving self out of the def line, so the call has one value too many. Fix: always write self first.', 'Writing name instead of self.name. Fix: use self. to reach the object\'s data.', 'Passing self when calling. Fix: write robot1.beep(), and Python adds self.'],
    cheat: ['def beep(self):', 'self is the object', 'robot1.beep() makes self = robot1', 'self.name reads its data', 'never pass self yourself'],
    next: ['init'],
    sources: [PY_TUT + 'classes.html#method-objects', PY_TUT + 'classes.html#random-remarks']
  },
  init: {
    what: 'The __init__ method runs once on a brand-new object to fill in its starting data. Python makes the object, then __init__ sets it up.',
    analogy: 'When a new student joins, the school writes a name card and hands over a starting kit.',
    uses: ['A game that gives each new player full health', 'A website that creates a user with a name and an empty list of friends', 'A shop app that creates an order with a date and no items'],
    before: ['self'],
    words: [
      ['__init__', 'The special method that sets up a new object. People say "init".'],
      ['initializer', 'The __init__ method. It sets up a new object. It does not build it.'],
      ['self', 'The new object being set up.'],
      ['attribute', 'A piece of data stored on the object, such as self.name.'],
      ['dunder', 'A name with double underscores on each side.']
    ],
    math: null,
    steps: ['Write def __init__(self, name): inside the class.', 'Store each value on self: self.name = name.', 'Add default data too: self.battery = 100.', 'Build an object: robot1 = Robot("Mira").', 'Python makes it, runs __init__ with it, and gives it back.'],
    use: ['Every object needs some starting data.', 'You want to give values when you build an object.'],
    avoid: ['Doing heavy work inside __init__.', 'Leaving some attributes unset until later.'],
    mistakes: ['Forgetting self. in front of a name, so the value never lands on the object. Fix: write self.name = name.', 'Writing _init_ with one underscore. Fix: use two on each side.', 'Returning a value from __init__. Fix: it must not return anything.'],
    cheat: ['def __init__(self, name):', 'self.name = name', 'robot1 = Robot("Mira")', 'runs once, when built', 'two underscores each side'],
    next: ['attributes'],
    sources: [PY_TUT + 'classes.html#class-objects', PY_REF + 'datamodel.html#object.__init__']
  },
  attributes: {
    what: 'Attributes are what an object knows. Methods are what it can do. A method can change what the object knows by changing its attributes.',
    analogy: 'A phone knows its battery level. When you play a game, the phone does work, and its battery level drops.',
    uses: ['A game where a hit method lowers health', 'A music app where a play method changes the song position', 'A shop app where an add method puts an item in the basket'],
    before: ['init'],
    words: [
      ['attribute', 'Data stored on an object, such as self.battery.'],
      ['method', 'A function inside a class that works on the object.'],
      ['state', 'All the attribute values an object holds right now.'],
      ['update', 'Changing an attribute to a new value.'],
      ['self', 'The object the method works on.']
    ],
    math: null,
    steps: ['Set attributes in __init__, such as self.battery = 100.', 'Write a method with self first.', 'Inside, change an attribute: self.battery = self.battery - 30.', 'Call it: robot1.work().', 'Read the new value: robot1.battery.'],
    use: ['An object needs to remember something that changes.', 'You want one place that holds all the actions for a thing.'],
    avoid: ['Changing attributes from many places in the program.', 'Adding new attributes in odd methods.'],
    mistakes: ['Making a plain variable inside a method and expecting the object to keep it. Fix: use self.name so it stays on the object.', 'Forgetting self in the def line. Fix: every method starts with self.', 'Reading an attribute that was never set. Fix: set it in __init__.'],
    cheat: ['attribute = what it knows', 'method = what it does', 'self.battery = 70', 'robot1.work() changes robot1', 'set attributes in __init__'],
    next: ['references', 'class-attributes', 'encapsulation', 'inheritance', 'dunder'],
    sources: [PY_TUT + 'classes.html#instance-objects', PY_TUT + 'classes.html#method-objects']
  },
  references: {
    what: 'The line b = a does not copy an object. Both names point at the same one, so a change through b shows through a. You can check with the word is.',
    analogy: 'Two keys to the same house. Whoever uses a key to paint the door changes it for both.',
    uses: ['A game where two lists of enemies point at the same group', 'A website where two parts of a page share one user object', 'A music app where two views share one playlist'],
    before: ['attributes', 'mutable-args'],
    words: [
      ['reference', 'An arrow from a name to an object.'],
      ['twin', 'A second name for the same object, such as twin = robot1.'],
      ['is', 'Asks if two names point at the very same object.'],
      ['copy', 'A new object with the same data, which is separate.'],
      ['same object', 'Two names that point at one object. The word is asks about this.']
    ],
    math: null,
    steps: ['Build an object: robot1 = Robot("Mira").', 'Write twin = robot1. No new object is made.', 'Both names point at one object.', 'twin.name = "Twin" changes that one object.', 'robot1.name now shows "Twin" too.'],
    use: ['You want two parts of a program to share one object.', 'You want to know why a change showed up in an unexpected place.'],
    avoid: ['Sharing an object when you wanted a separate copy.', 'Comparing objects with is when you mean ==.'],
    mistakes: ['Thinking = makes a copy of the object. Fix: it makes another name. Build a new object with Robot(robot1.name).', 'Confusing is and ==. Fix: is asks about the same object. == asks about equal data.', 'Changing a shared object by accident. Fix: make a copy when you want separate data.'],
    cheat: ['b = a: two names, one object', 'a is b asks if same', 'change through one, see in both', 'Robot(a.name) makes a new one', 'arrows, not boxes'],
    next: ['class-attributes'],
    sources: [PY_REF + 'datamodel.html#objects-values-and-types', PY_LIB + 'copy.html']
  },
  'class-attributes': {
    what: 'Data written on the class is shared by every object built from it. When you read a name, Python looks on the object first, then on its class.',
    analogy: 'A school rule is posted on the school wall. Every student can read it, but a student may also keep a private note.',
    uses: ['A game where every enemy shares the same maximum speed', 'A website where every user object shares the same site name', 'A shop app where every item shares the same tax rate'],
    before: ['attributes'],
    words: [
      ['class attribute', 'Data stored on the class and shared by all its objects.'],
      ['instance attribute', 'Data stored on one object only.'],
      ['search order', 'How Python finds a name: the object first, then the class.'],
      ['shared', 'Seen by every object of the class.'],
      ['override', 'Setting the same name on an object, which hides the class value for that object.']
    ],
    math: null,
    steps: ['Write a name inside the class, outside any method: maker = "Hana".', 'Build objects. They do not store maker themselves.', 'Reading robot1.maker finds it on the class.', 'Setting robot2.maker = "Maria" creates a new name on robot2 only.', 'robot1 still sees the class value.'],
    use: ['Every object of the class should share the same value.', 'You want a constant that belongs to the class.'],
    avoid: ['Putting a list on the class when each object needs its own.', 'Setting through an object and expecting all to see it.'],
    mistakes: ['Setting a value through one object and expecting every object to see it. Fix: set it on the class, such as Robot.maker = "Maria".', 'Putting a list on the class and changing it from an object. Fix: the list is shared, so use an instance attribute.', 'Forgetting the class name. Fix: write Robot.maker to reach the shared value.'],
    cheat: ['maker = "Hana" in the class', 'objects read it from the class', 'robot2.maker = "Maria" only changes robot2', 'Robot.maker = "Priya" changes all', 'object first, then class'],
    next: ['encapsulation'],
    sources: [PY_TUT + 'classes.html#class-and-instance-variables']
  },
  encapsulation: {
    what: 'Let methods guard every change to an object\'s data. Then it stays valid when everyone uses the methods. A name starting with an underscore says "please leave this to the methods".',
    analogy: 'A bank counter. You ask the teller to move money, instead of reaching into the safe.',
    uses: ['A game that never lets health go above the maximum', 'A bank app that never lets a balance break a rule', 'A website that checks a new age before saving it'],
    before: ['attributes'],
    words: [
      ['encapsulation', 'Keeping an object\'s data behind methods that protect it.'],
      ['guard', 'A check inside a method that refuses a bad change.'],
      ['underscore', 'A leading _ in a name. It is a polite sign to others to keep out.'],
      ['valid', 'Allowed by the rules, such as a battery between 0 and 100.'],
      ['min', 'A command that gives the smaller of two values.']
    ],
    math: null,
    steps: ['Keep the data in a name with an underscore: self._battery.', 'Write a method for each allowed change, such as charge.', 'Inside, check the change is allowed.', 'Use min to stop the value going above a limit.', 'Other code calls the method instead of changing the data.'],
    use: ['Some values must follow rules, such as staying within limits.', 'You want to change the rules in one place later.'],
    avoid: ['Guards for data that has no rules.', 'Trusting that an underscore stops anyone.'],
    mistakes: ['Thinking a leading underscore locks the data. Fix: it is only a polite sign. The methods do the real guarding.', 'Changing the data directly from outside. Fix: call the method.', 'Forgetting to check in every method that changes the data. Fix: all changes must pass the guard.'],
    cheat: ['_battery is a polite sign', 'change it with methods', 'check inside the method', 'min(100, value) caps it', 'one place to fix the rules'],
    next: ['inheritance'],
    sources: [PY_TUT + 'classes.html#private-variables', PY_LIB + 'functions.html#min']
  },
  inheritance: {
    what: 'A child class gets everything its parent class has. It only writes what is different. The child can add new methods.',
    analogy: 'A child inherits the family surname and some habits, and then adds their own skills.',
    uses: ['A game where Boss and Enemy share most of their behaviour', 'A website where Admin and User share most of a profile', 'A music app where Podcast and Song share play and pause'],
    before: ['attributes'],
    words: [
      ['inheritance', 'A child class getting what its parent class has.'],
      ['parent class', 'The class being built on. Also called the base class.'],
      ['child class', 'The class that builds on the parent. Also called a subclass.'],
      ['subclass', 'Another word for a child class.'],
      ['is-a', 'The test for inheritance: a Cleaner is a Robot.']
    ],
    math: null,
    steps: ['Write the parent class with the shared parts.', 'Write the child with the parent in brackets: class Cleaner(Robot):.', 'The child gets all the parent\'s attributes and methods.', 'Add the methods that are new, such as sweep.', 'Build a child and use both kinds of methods.'],
    use: ['Several classes share most of their behaviour.', 'One kind of thing is a special version of another.'],
    avoid: ['Inheritance when the link is "has a", not "is a".', 'Deep family trees that are hard to follow.'],
    mistakes: ['Copying a whole class to change one method. Fix: inherit and write only the change.', 'Forgetting the parent in brackets. Fix: write class Cleaner(Robot):.', 'Inheriting when it is not an is-a link. Fix: ask "is a Cleaner a Robot?" before you inherit.'],
    cheat: ['class Cleaner(Robot):', 'child gets parent\'s methods', 'add only what is new', 'is-a test', 'parent = base, child = subclass'],
    next: ['super'],
    sources: [PY_TUT + 'classes.html#inheritance', PY_REF + 'compound_stmts.html#class-definitions']
  },
  super: {
    what: 'A child can replace a parent\'s method with its own. The super() command runs the parent\'s version too. The child adds to the work instead of repeating it.',
    analogy: 'A new team leader follows the old morning routine, and then adds one more task.',
    uses: ['A game where a boss does the enemy attack and adds a special move', 'A website where an admin does the user setup and adds extra rights', 'A shop app where a sale item does the normal price and adds a discount'],
    before: ['inheritance'],
    words: [
      ['override', 'To write a method in a child that replaces the parent\'s version.'],
      ['super()', 'A command that reaches the parent class\'s methods.'],
      ['parent method', 'The version of the method written in the parent class.'],
      ['setup', 'The work __init__ does to prepare an object.'],
      ['extend', 'To add to what the parent does.']
    ],
    math: null,
    steps: ['Write the same method name in the child.', 'Call super().method() to run the parent\'s version first.', 'Add the extra lines after it.', 'In __init__, call super().__init__(name) for the parent\'s setup.', 'Then set the child\'s own attributes.'],
    use: ['The child must do what the parent does and a little more.', 'You want the parent\'s setup to still run.'],
    avoid: ['Rewriting parent code in the child.', 'Using super() when nothing needs to be shared.'],
    mistakes: ['Forgetting super().__init__(), so the parent\'s setup never runs. Fix: call it at the start of the child\'s __init__.', 'Leaving out the brackets in super(). Fix: write super(), not super.', 'Passing the wrong values to the parent. Fix: match the parent\'s __init__ parameters.'],
    cheat: ['override: same name in the child', 'super().beep() runs the parent', 'super().__init__(name) for setup', 'add after calling super', 'child adds, not repeats'],
    next: ['polymorphism'],
    sources: [PY_LIB + 'functions.html#super', PY_TUT + 'classes.html#inheritance']
  },
  polymorphism: {
    what: 'Ask every object to do the same thing, and each does its own version. The loop never needs to know which kind it has. The word polymorphism means "many forms".',
    analogy: 'A teacher says "pack up". Each student packs their own bag in their own way.',
    uses: ['A game that calls update on every kind of character', 'A drawing app that calls draw on every shape', 'A website that calls render on every kind of page block'],
    before: ['super'],
    words: [
      ['polymorphism', 'Different classes answering the same method name in their own ways.'],
      ['method name', 'The shared name, such as work, that each class writes in its own way.'],
      ['override', 'A child writing its own version of a parent\'s method.'],
      ['list of objects', 'A list that holds objects of different classes together.'],
      ['dispatch', 'Python picking the right version of the method for each object.']
    ],
    math: null,
    steps: ['Give each class a method with the same name, such as work.', 'Each class writes its own version.', 'Put different objects in one list.', 'Loop over the list and call bot.work() on each.', 'Python picks the right version for every object.'],
    use: ['You have several kinds of object and want to treat them alike.', 'You want to add a new kind without changing the loop.'],
    avoid: ['Long if and elif chains that check the type.', 'Classes that use the same method name for different jobs.'],
    mistakes: ['Writing a long if and elif on the type instead of letting each class answer. Fix: give each class the same method name.', 'Forgetting a class has no such method. Fix: every class in the list needs it.', 'Using different method names in each class. Fix: use one shared name.'],
    cheat: ['same call, different answers', 'for bot in team: bot.work()', 'each class writes its own work', 'no type checks needed', 'new class, same loop'],
    next: ['composition', 'interfaces'],
    sources: [PY_TUT + 'classes.html#inheritance', PY_REF + 'datamodel.html#special-method-names']
  },
  composition: {
    what: 'Is-a means inheritance. Has-a means an object keeps another object as one of its parts. Has-a is often the better fit.',
    analogy: 'A car is not an engine, but it has an engine. You build the car from parts.',
    uses: ['A game where a player has a weapon and a backpack', 'A website where a page has a header and a menu', 'A phone app where a screen has a list and a button'],
    before: ['inheritance', 'polymorphism'],
    words: [
      ['composition', 'Building an object from other objects kept as parts.'],
      ['has-a', 'The test for composition: a Robot has a Battery.'],
      ['is-a', 'The test for inheritance: a Cleaner is a Robot.'],
      ['part', 'An object stored as an attribute of another object.'],
      ['delegate', 'Letting the part do a job instead of doing it yourself.']
    ],
    math: null,
    steps: ['Write a class for the part, such as Battery.', 'Write the main class, such as Robot.', 'In __init__, build the part: self.battery = Battery().', 'Reach inside with dots: robot1.battery.level.', 'Let the part do its own jobs.'],
    use: ['One thing is made of other things.', 'You want to swap or change a part later.'],
    avoid: ['Inheriting only to reuse some code.', 'Building huge objects with too many parts.'],
    mistakes: ['Inheriting from a class only to borrow some of its code. Fix: keep it as a part with has-a.', 'Forgetting to build the part in __init__. Fix: create it with self.battery = Battery().', 'Sharing one part between objects by accident. Fix: build a new part for each object.'],
    cheat: ['is-a: inherit', 'has-a: keep as a part', 'self.battery = Battery()', 'robot1.battery.level', 'prefer has-a when unsure'],
    next: ['dunder', 'no-class'],
    sources: [PY_TUT + 'classes.html', PY_REF + 'datamodel.html#objects-values-and-types']
  },
  dunder: {
    what: 'Methods with double underscores let print, == and len work on your own objects. Python calls them for you at the right time.',
    analogy: 'A hotel front desk has set phrases for each guest need. When you say "check in", the right routine starts.',
    uses: ['A game that prints a readable description of a character', 'A shop app that compares two products as equal', 'A music app that counts the songs in a playlist'],
    before: ['attributes'],
    words: [
      ['dunder', 'Short for "double underscore", a name like __str__.'],
      ['__str__', 'Decides what print shows for an object.'],
      ['__eq__', 'Decides what == means for two objects.'],
      ['__len__', 'Decides what len gives for an object.'],
      ['special method', 'Another name for a dunder method.']
    ],
    math: null,
    steps: ['Pick the behaviour: print, ==, or len.', 'Write the matching method in your class.', 'Give it self, and other for ==.', 'Return what Python needs: a string for print, True or False for ==.', 'Use print(obj) or obj == other. Python calls your method.'],
    use: ['You want print to show something readable.', 'You want == to compare the data inside two objects.'],
    avoid: ['Adding dunder methods you do not need.', 'Writing __eq__ that crashes for other types.'],
    mistakes: ['Expecting == to compare the data when the class never said how. Fix: write __eq__.', 'Returning a number from __str__. Fix: it must return a string.', 'Spelling the name wrongly. Fix: use two underscores on each side.'],
    cheat: ['__str__ for print', '__eq__ for ==', '__len__ for len', 'self and other', 'Python calls them for you'],
    next: ['interfaces'],
    sources: [PY_REF + 'datamodel.html#special-method-names', PY_REF + 'datamodel.html#object.__str__']
  },
  interfaces: {
    what: 'An abstract class lists the methods every child must write. Forget one, and Python stops you before anything runs. It works as a contract.',
    analogy: 'A job contract lists the tasks you must do. You cannot start work until you agree to all of them.',
    uses: ['A game that insists every character class has an attack method', 'A website that insists every payment class has a pay method', 'A music app that insists every file type can play'],
    before: ['polymorphism'],
    words: [
      ['abstract class', 'A class that lists required methods but cannot be built on its own.'],
      ['abstract method', 'A method with no body that every child must write.'],
      ['ABC', 'The helper class that makes a class abstract.'],
      ['contract', 'The list of methods a child promises to write.'],
      ['TypeError', 'The error Python shows when you build a class with a missing method.']
    ],
    math: null,
    steps: ['Bring in the tools with: from abc import ABC, abstractmethod.', 'Write the abstract class with ABC in brackets.', 'Mark each required method with @abstractmethod.', 'Write children that fill in every method.', 'Python refuses to build a child that missed one.'],
    use: ['Many classes must offer the same set of methods.', 'You want mistakes to show up early.'],
    avoid: ['Abstract classes in very small programs.', 'Long lists of required methods.'],
    mistakes: ['Trying to build an object straight from the abstract class. Fix: build one of the children.', 'Forgetting to write one of the required methods. Fix: write every one, or Python raises a TypeError.', 'Forgetting @abstractmethod. Fix: add it above each required method.'],
    cheat: ['from abc import ABC, abstractmethod', 'class Worker(ABC):', '@abstractmethod', 'children must fill in all', 'missing method = error early'],
    next: ['no-class'],
    sources: [PY_LIB + 'abc.html']
  },
  'no-class': {
    what: 'A class earns its place when data and behaviour belong together. Otherwise a function or a dictionary is simpler. Choose the simplest tool that fits.',
    analogy: 'You do not need a toolbox with a hammer rack to hang one picture. Sometimes one hammer is enough.',
    uses: ['A game that uses a plain function for a one-off sum', 'A website that uses a dictionary for a small settings list', 'A phone app that uses a class only for things with their own changing data'],
    before: ['composition'],
    words: [
      ['design', 'Choosing how to arrange a program.'],
      ['function', 'A set of lines that does one job and gives back a result.'],
      ['dictionary', 'A group of key and value pairs.'],
      ['class', 'A blueprint for objects that hold data and actions together.'],
      ['simple', 'Easy to read and change.']
    ],
    math: null,
    steps: ['Ask: does this thing keep data that changes?', 'Ask: do actions need that data?', 'If both are yes, a class may fit.', 'If it only computes a result, use a function.', 'If it only holds fixed data, use a dictionary.'],
    use: ['You are about to write a class and want to check it is needed.', 'You want to keep your program easy to read.'],
    avoid: ['A class with one method and no data.', 'Wrapping every little thing in a class.'],
    mistakes: ['Wrapping every little thing in a class. Fix: ask if the thing keeps data that changes.', 'Using a dictionary when many actions belong with the data. Fix: that is a sign for a class.', 'Thinking classes are always better. Fix: simple code wins.'],
    cheat: ['data + actions together: class', 'only a result: function', 'only fixed data: dictionary', 'start simple', 'add a class when it helps'],
    next: [],
    sources: [PY_TUT + 'classes.html', PY_TUT + 'datastructures.html#dictionaries']
  },
  'clean-names': {
    what: 'A good name says what a value or a function means. The computer does not care what a name means, but people read it. Clear names make code read like a sentence.',
    analogy: 'Think of labels on kitchen jars. A jar marked "sugar" saves you from tasting each one.',
    uses: ['A game where score and lives_left tell the next reader what each number is', 'A shop app where total_cost says what the function works out', 'A school website where is_late reads like a question'],
    before: ['functions'],
    words: [
      ['name', 'The label you give a variable or a function.'],
      ['snake_case', 'Lower case words joined by underscores, like total_cost.'],
      ['readable', 'Easy for a person to read and understand.'],
      ['misleading', 'Making the reader believe something that is not true.'],
      ['boolean', 'A value that is True or False. Its name often reads like a question.']
    ],
    math: null,
    steps: ['Ask: what does this value mean?', 'Write that meaning as the name, such as price.', 'Name a function after what it does, such as total_cost.', 'Join words with underscores. A name cannot have spaces.', 'Name yes or no values like questions, such as is_empty.', 'Read the code again and check that no name lies.'],
    use: ['Any name that other people, or you next month, will read.', 'A function whose job is not clear from its first line.'],
    avoid: ['One-letter names, except in a tiny loop where i is common.', 'Names that lie, such as a list of names called count.'],
    mistakes: ['Using a and b for everything. Fix: name each value for what it means.', 'Writing a space in a name. Fix: join the words with an underscore.', 'Changing a name in one place only. Fix: change every place, then run the program.'],
    cheat: ['name = what the value means', 'function name = what it does', 'snake_case: total_cost', 'yes or no: is_empty, has_tax', 'never let a name lie'],
    next: ['no-surprises'],
    sources: ['PEP 8, the Python style guide, peps.python.org/pep-0008/#naming-conventions', PY_TUT + 'controlflow.html#defining-functions']
  },
  'no-surprises': {
    what: 'A function should do one job, and its name should tell the truth about it. A hidden change outside the function is a side effect. Surprises like that cause bugs.',
    analogy: 'A vending machine that also takes coins out of your pocket would be a bad machine. A good tool does only what its label says.',
    uses: ['A game where get_score only reads the score and never changes it', 'A shop app where total_of adds up prices and leaves the cart alone', 'A website where sorted_copy gives a new list and keeps the old one'],
    before: ['clean-names', 'mutable-args'],
    words: [
      ['side effect', 'A change a function makes outside itself, such as changing a list it was given.'],
      ['one job', 'A function that does a single clear thing.'],
      ['in place', 'Changing the original list instead of making a new one.'],
      ['copy', 'A new list with the same items, so the original stays safe.'],
      ['repeat code', 'The same lines copied in many places. Put them in one function instead.']
    ],
    math: null,
    steps: ['Decide the one job of the function.', 'Choose a name that says that job.', 'If it should give an answer, build a new list and return it.', 'If it must change your list, put that in the name.', 'If you copy the same lines twice, move them into a function.'],
    use: ['You write a function other people will call.', 'You see the same lines in two places.'],
    avoid: ['A function that does two jobs joined by "and".', 'A quiet change to a list the caller still uses.'],
    mistakes: ['Changing the list that was passed in, with no warning in the name. Fix: build and return a new list.', 'Putting two jobs in one function. Fix: split it, one job each.', 'Copying lines instead of calling a function. Fix: write the function once.'],
    cheat: ['one job per function', 'the name tells the truth', 'new list: return it', 'changes your list: say so in the name', 'repeated lines: make a function'],
    next: ['comprehensions'],
    sources: [PY_TUT + 'datastructures.html#more-on-lists', PY_TUT + 'controlflow.html#defining-functions']
  },
  comprehensions: {
    what: 'A list comprehension builds a new list in one line. It says what goes in the list and which items to use. An if can keep only some. The old list is not changed.',
    analogy: 'Think of a stamping machine. Each item goes in, the stamp changes it, and a new row comes out.',
    uses: ['A game that makes a list of every enemy\'s position from a list of enemies', 'A shop app that makes a list of prices with tax added', 'A school website that keeps only the names that start with a letter'],
    before: ['list-loops', 'clean-names'],
    words: [
      ['comprehension', 'One line that builds a new list from another list.'],
      ['filter', 'Keeping only the items that pass a question.'],
      ['for', 'The word that says "do this for each item".'],
      ['new list', 'A fresh list. The list you started from stays the same.'],
      ['readable', 'Easy to understand at a glance.']
    ],
    math: null,
    steps: ['Start with a list, such as numbers = [1, 2, 3, 4].', 'Write square brackets: [ ].', 'Inside, write what to keep, such as n * n.', 'Then write for n in numbers.', 'Add if n > 2 at the end to keep only some items.', 'Read it out loud. If it is hard to say, use a loop.'],
    use: ['You build one list from another list.', 'The idea fits on one short line.'],
    avoid: ['Lines with loops inside loops and many questions.', 'Using a comprehension only to run a print or another action.'],
    mistakes: ['Expecting the old list to change. Fix: a comprehension makes a new list.', 'Leaving out the if, so nothing is removed. Fix: add if and a question.', 'Cramming too much into one line. Fix: write a plain loop instead.'],
    cheat: ['[n * n for n in numbers]', 'add if to keep some: [n for n in numbers if n > 2]', 'makes a NEW list', 'too long to read? use a loop'],
    next: ['type-hints'],
    sources: [PY_TUT + 'datastructures.html#list-comprehensions']
  },
  'type-hints': {
    what: 'A type hint says what kind of value a function takes and gives back. It is a note for people and for checking tools. Python does not enforce it when the program runs.',
    analogy: 'Think of a label on a shelf that says "tins only". It helps people, but it does not stop someone putting a box there.',
    uses: ['A game function that says it takes an int for damage and gives back an int', 'A shop app where price: float shows decimals are expected', 'A school website where a name: str hint tells readers to pass text'],
    before: ['types', 'clean-names'],
    words: [
      ['type hint', 'A note in the code that says what kind of value is expected.'],
      ['int', 'A whole number, such as 3.'],
      ['float', 'A number with a decimal part, such as 2.5.'],
      ['str', 'Text, such as "Kai".'],
      ['enforce', 'To force a rule to be followed. Python does not enforce hints.']
    ],
    math: null,
    steps: ['After a parameter name, write a colon and a type: price: int.', 'After the brackets, write -> and the type the function gives back.', 'Read the first line to learn how to call the function.', 'Remember that Python still runs a wrong call.', 'Use a checking tool or editor to find wrong calls before you run.'],
    use: ['Functions that other people will read or call.', 'Code where a wrong kind of value would be easy to pass.'],
    avoid: ['Believing a hint protects you while the program runs.', 'Hints that do not match what the function really returns.'],
    mistakes: ['Thinking Python stops a wrong value. Fix: it only runs; a separate tool checks.', 'A hint that says int but the function returns a decimal. Fix: make the hint match.', 'Forgetting the colon after the name. Fix: write price: int.'],
    cheat: ['name: type', '-> type for the result', 'int, float, str, bool, list', 'a note, not a lock'],
    next: ['exceptions'],
    sources: [PY_TUT + 'controlflow.html#function-annotations', PY_LIB + 'typing.html']
  },
  exceptions: {
    what: 'An exception is an alarm Python rings when something goes wrong. It stops the program unless some code answers it. The words try and except let you choose what happens next.',
    analogy: 'Think of a fire bell in a building. It rings until someone who knows what to do answers it.',
    uses: ['A game that keeps running when a save file is missing', 'A shop app that asks again when someone types text instead of a number', 'A website that shows a friendly message when a page fails to load'],
    before: ['debugging', 'call-stack'],
    words: [
      ['exception', 'An alarm that Python raises when something goes wrong.'],
      ['try', 'Marks lines that might ring an alarm.'],
      ['except', 'Marks the lines that answer one kind of alarm.'],
      ['ValueError', 'The alarm for a value that cannot be used, such as the text "twelve" given to int().'],
      ['bare except', 'An except with no kind named. It answers every alarm, even a typo.']
    ],
    math: null,
    steps: ['Put the risky line inside try.', 'Write except and the kind of alarm you expect.', 'Write the lines that run when that alarm rings.', 'If an alarm rings, Python skips the rest of the try lines.', 'After the except lines, the program carries on.'],
    use: ['You expect a known problem, such as bad text typed by a user.', 'You can choose a sensible next step, such as a default value.'],
    avoid: ['A bare except that hides every bug.', 'Using try to hide a mistake in your own code.'],
    mistakes: ['Thinking try fixes the error. Fix: try only picks what happens next.', 'Catching every kind with a bare except. Fix: name the kind you expect.', 'Printing a message but returning nothing. Fix: return a value the caller can use.'],
    cheat: ['try: the risky line', 'except ValueError: the answer', 'name the kind you expect', 'no answer: the program stops', 'the alarm travels down the calls'],
    next: ['raise'],
    sources: [PY_TUT + 'errors.html', PY_REF + 'compound_stmts.html#the-try-statement']
  },
  raise: {
    what: 'The word raise rings the alarm yourself when a rule is broken. The word finally adds lines that run every time, whether or not an alarm rang. Together they keep code safe and tidy.',
    analogy: 'Think of closing time at a shop. The door gets locked whether the day went well or badly.',
    uses: ['A bank app that stops a withdrawal larger than the balance', 'A game that closes a save file even when saving fails', 'A school website that rejects a negative age'],
    before: ['exceptions'],
    words: [
      ['raise', 'Rings an alarm on purpose, such as raise ValueError("bad age").'],
      ['message', 'The text that comes with an alarm and says what went wrong.'],
      ['as', 'Gives a name to the alarm you caught, as in except ValueError as problem.'],
      ['finally', 'Lines that run every time, even after an alarm.'],
      ['clean-up', 'Work that must happen at the end, such as closing a file.']
    ],
    math: null,
    steps: ['Check the rule with an if.', 'If the rule is broken, write raise and a kind with a message.', 'The function stops at that line.', 'Catch the alarm where you can handle it, with except.', 'Put clean-up lines in finally so they always run.'],
    use: ['An input breaks a rule and carrying on would give a wrong answer.', 'You must close or lock something even if an error happens.'],
    avoid: ['Raising an error for normal, expected work.', 'Putting your main work in finally.'],
    mistakes: ['Building an error without raise, so nothing happens. Fix: write raise in front of it.', 'Thinking finally runs only on error. Fix: it runs every time.', 'Raising a vague error with no message. Fix: say what went wrong.'],
    cheat: ['raise ValueError("message")', 'except ValueError as problem:', 'finally: always runs', 'raise stops the function', 'clean-up goes in finally'],
    next: ['tests'],
    sources: [PY_TUT + 'errors.html#raising-exceptions', PY_TUT + 'errors.html#defining-clean-up-actions']
  },
  tests: {
    what: 'A check calls your function with an input you know and compares the answer with the one you expect. It prints pass or FAIL. A set of checks tells you at once if a change broke something.',
    analogy: 'Think of a cook who tastes every dish before it leaves the kitchen.',
    uses: ['A game that checks the score rules after every change', 'A shop app that checks the tax maths with many prices', 'A school website that checks a name-tidying function on odd names'],
    before: ['raise', 'return-print'],
    words: [
      ['check', 'A line that compares what a function gives with what you expect.'],
      ['expected', 'The answer you know is right, written down before you run.'],
      ['pass', 'The answer matched what you expected.'],
      ['FAIL', 'The answer did not match. Something is wrong.'],
      ['assert', 'A Python word that raises an error when a statement is false and stays quiet when it is true.']
    ],
    math: null,
    steps: ['Pick an input and work out the right answer by hand.', 'Write a check that calls the function with that input.', 'Compare the answer with the one you expect.', 'Write several checks, not one.', 'Run all the checks after every change.'],
    use: ['You change code and want to know nothing else broke.', 'You find a bug and want to be sure it stays fixed.'],
    avoid: ['Trusting a single passing check.', 'Working out the expected answer by running the code you are testing.'],
    mistakes: ['Writing one check and stopping. Fix: try different inputs.', 'Taking the expected answer from the buggy code. Fix: work it out by hand.', 'Running checks only once. Fix: run them after every change.'],
    cheat: ['check(name, got, want)', 'pass or FAIL', 'many checks, not one', 'run them after every change', 'assert f(2) == 4'],
    next: ['edge-tests'],
    sources: [PY_TUT + 'controlflow.html#defining-functions', PY_REF + 'simple_stmts.html#the-assert-statement']
  },
  'edge-tests': {
    what: 'Edge cases are the awkward inputs where bugs hide: an empty list, one item, negatives and ties. Test-first means you write the check before the code, watch it fail, then write code until it passes.',
    analogy: 'Think of a shop. The easy customer buys three apples. The awkward one wants nothing, or a refund.',
    uses: ['A game that handles an empty inventory without crashing', 'A shop app that handles a basket with no items', 'A school website that handles a class with one student'],
    before: ['tests', 'edge-cases'],
    words: [
      ['edge case', 'An unusual input at the limit of what a function must handle.'],
      ['empty', 'Holding nothing, such as a list with no items.'],
      ['tie', 'Two items with the same value.'],
      ['test-first', 'Writing the check before the code that passes it.'],
      ['happy path', 'The easy, ordinary case where nothing odd happens.']
    ],
    math: null,
    steps: ['List the awkward inputs: empty, one item, negatives, ties.', 'Decide the right answer for each, such as 0 for an empty list.', 'Write a check for each one.', 'Run them and watch the broken ones fail.', 'Change the code until every check passes.'],
    use: ['You write a function that takes a list or a number.', 'You are about to say a function is finished.'],
    avoid: ['Testing only the happy path.', 'Skipping the empty case because it looks silly.'],
    mistakes: ['Testing only ordinary inputs. Fix: add empty, one item and negatives.', 'Starting best at 0 when every number may be below 0. Fix: start from the first item.', 'Forgetting to decide what an empty input should give. Fix: choose the answer, then check it.'],
    cheat: ['empty list', 'one item', 'negatives', 'ties and repeats', 'write the check first'],
    next: [],
    sources: [PY_TUT + 'controlflow.html#for-statements', PY_TUT + 'datastructures.html#more-on-lists']
  },
  blocking: {
    what: 'Many jobs are mostly waiting, for a web page, a file or a timer. Blocking means standing still until the wait ends. While a program blocks, it does nothing else. Our programs use a pretend clock that counts ticks, not seconds. That way each one runs the same everywhere in your browser, and every step can be shown. Real Python waits with time.sleep(3), which stops for 3 real seconds.',
    analogy: 'Think of a waiter who stares at the oven until the soup is done. The bread and the tables wait.',
    uses: ['A phone app that freezes while it waits for a slow download', 'A game that stutters while it reads a big file', 'A website that waits for ten pictures one after another'],
    before: ['functions'],
    words: [
      ['blocking', 'Standing still until a wait ends, doing nothing else.'],
      ['tick', 'One step of our pretend clock. A real clock counts seconds.'],
      ['waiting', 'Time spent waiting for something outside the program, such as a reply from the network. The network is the link to other computers.'],
      ['calculating', 'Time spent when the computer is busy doing sums and steps.'],
      ['disk', 'The place where files are stored.'],
      ['pretend clock', 'Ticks that our programs count instead of real seconds. It runs the same everywhere in your browser and shows every step.']
    ],
    math: null,
    steps: ['Spot a job that mostly waits, such as a download.', 'Add up the waits if they come one after another.', 'See that the total is the sum of the waits.', 'Notice that overlapping waits would finish with the longest one.', 'Look for a way to use the waiting time.'],
    use: ['Your program feels slow but the computer is not busy.', 'Several waits come one after another.'],
    avoid: ['Calling a program slow when it is only waiting.', 'Waiting for independent jobs in a row.'],
    mistakes: ['Thinking slow always means busy. Fix: ask if the program is calculating or waiting.', 'Adding the waits when the jobs could overlap. Fix: use the longest wait for overlapping jobs.', 'Forgetting the clock moves during every wait. Fix: add the ticks to the clock.'],
    cheat: ['real Python: time.sleep(3) blocks for 3 seconds', 'waiting is not working', 'blocking = standing still', 'in a row: add the waits', 'at once: the longest wait', 'look for idle time to use'],
    next: ['event-loop'],
    sources: [PY_LIB + 'asyncio.html', 'MDN Web Docs, developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous']
  },
  'event-loop': {
    what: 'The event loop is one worker that keeps a list of jobs that are waiting. It goes round and round, takes the next job that is ready, and runs it. Nothing freezes while a job waits. Our loop uses a pretend clock of ticks. That way it runs the same everywhere in your browser, and every step can be shown. The real loop is in Python\'s asyncio and uses real time.',
    analogy: 'Think of a waiter with a row of order tickets. He always takes the next dish that is ready.',
    uses: ['A web browser that keeps clicks working while a picture loads', 'A chat server that looks after thousands of people with one worker', 'A game that reads the keyboard while sounds play'],
    before: ['blocking'],
    words: [
      ['event loop', 'One worker that repeats: find a ready job, run it, look again.'],
      ['queue', 'A list of things waiting for their turn.'],
      ['ready', 'Its waiting time is over, so it can run now.'],
      ['job', 'One piece of work waiting in the list.'],
      ['clock', 'The tick counter that says what time it is. Ours is a pretend clock.'],
      ['pretend clock', 'Ticks that our programs count instead of real seconds. It runs the same everywhere in your browser and shows every step.']
    ],
    math: null,
    steps: ['Keep a list of waiting jobs, each with the time it is ready.', 'Start the clock at 0.', 'Look through the list for a job ready now.', 'If one is ready, run it and remove it from the list.', 'Move the clock forward and look again until the list is empty.'],
    use: ['Many things wait at once and one worker must look after them all.', 'You want a program that stays responsive.'],
    avoid: ['A job that never lets go of the worker.', 'Assuming jobs run in the order they were added.'],
    mistakes: ['Expecting the first added job to run first. Fix: the first ready job runs first.', 'Forgetting to remove a finished job. Fix: remove it so it does not run again.', 'Never moving the clock. Fix: add one to the clock each round.'],
    cheat: ['real Python: loop.call_later(3, print, "soup is ready")', 'one worker, one queue', 'take the next ready job', 'remove it when done', 'clock moves forward', 'ready order, not added order'],
    next: ['later'],
    sources: [PY_LIB + 'asyncio-eventloop.html', 'MDN Web Docs, developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop']
  },
  later: {
    what: 'A callback is a function you hand over, so the loop can call it when a job is ready. You leave a note and carry on with other work. The loop calls you back later. Our loop uses a pretend clock of ticks. That way it runs the same everywhere in your browser, and every step can be shown. Real code uses loop.call_later(3, serve, "soup") in Python, or setTimeout in JavaScript.',
    analogy: 'Think of a pager from a restaurant. You do other things, and it buzzes when your table is ready.',
    uses: ['A website that shows a message when a download finishes', 'A game that plays a sound when a level loads', 'A shop app that sends a receipt when a payment clears'],
    before: ['event-loop', 'callbacks'],
    words: [
      ['callback', 'A function handed over to be called later.'],
      ['hand over', 'Pass a function by its name, with no brackets.'],
      ['call', 'To run a function by writing brackets after its name.'],
      ['when_done', 'Our name for the note that says what to run after the job.'],
      ['later', 'After the wait is over, not now.'],
      ['pretend clock', 'Ticks that our programs count instead of real seconds. It runs the same everywhere in your browser and shows every step.']
    ],
    math: null,
    steps: ['Write the function that should run afterwards, such as serve.', 'Put its name, with no brackets, in the job: "when_done": serve.', 'Start the job and carry on with other work.', 'When the job is ready, the loop reads the note.', 'The loop writes the brackets and calls it with the dish.'],
    use: ['Something should happen after a wait ends.', 'The code that starts the job should not wait around.'],
    avoid: ['Putting brackets after the name when you only want to hand it over.', 'Stacking callbacks inside callbacks until the code is hard to read.'],
    mistakes: ['Writing serve() and running it too early. Fix: write serve, with no brackets.', 'Giving a callback the wrong number of values. Fix: match the function\'s parameters.', 'Forgetting the callback exists. Fix: keep it in the job so the loop can find it.'],
    cheat: ['real Python: loop.call_later(3, serve, "soup")', 'real JavaScript: setTimeout(serve, 3000, "soup")', 'serve = hand it over', 'serve() = run it now', 'the loop calls it when ready', 'leave a note and move on'],
    next: ['async-await'],
    sources: [PY_TUT + 'controlflow.html#defining-functions', 'MDN Web Docs, developer.mozilla.org/en-US/docs/Glossary/Callback_function']
  },
  'async-await': {
    what: 'An async task can pause at an await and let other tasks use the worker. When its wait is over, it carries on after the await. await does not make the wait shorter. Our turns use a pretend clock, one tick each. That way they run the same everywhere in your browser, and every step can be shown. Real Python writes await asyncio.sleep(3) and waits 3 real seconds.',
    analogy: 'Think of a waiter who says "I will come back". He goes to another table while your food cooks.',
    uses: ['A web server that answers many visitors with one worker', 'A chat app that waits for messages from many friends', 'A game that loads pictures while the menu keeps working'],
    before: ['later'],
    words: [
      ['task', 'A job that can pause and carry on later.'],
      ['async', 'The word that marks a function that can pause. When it runs as a job, it is a task.'],
      ['await', 'The word that marks where a task waits and lets others go.'],
      ['turn', 'One short go at the worker before it moves to the next task.'],
      ['coroutine', 'The object you get when you call an async function. It runs only when awaited or scheduled.'],
      ['pretend clock', 'Ticks that our programs count instead of real seconds. It runs the same everywhere in your browser and shows every step.']
    ],
    math: null,
    steps: ['Mark the function with async def so it can pause.', 'Write await in front of the slow call.', 'The task pauses there and the worker picks another task.', 'When the wait is over, the task carries on with the next line.', 'The loop gives every task turns until all are finished.'],
    use: ['Many jobs spend most of their time waiting.', 'You want code that reads from top to bottom.'],
    avoid: ['Using await for work that is all calculating.', 'Expecting await to make a wait shorter.'],
    mistakes: ['Thinking await makes things faster. Fix: it only shares the waiting time.', 'Forgetting await in front of a slow call. Fix: add it, or the task does not wait.', 'Using await outside an async function. Fix: put it inside async def.'],
    cheat: ['real Python: await asyncio.sleep(3)', 'use asyncio.sleep, not time.sleep', 'async def makes a function that can pause', 'await = wait here, others go', 'same wait, shared time', 'turns, not threads', 'one worker takes turns'],
    next: ['gather'],
    sources: [PY_LIB + 'asyncio-task.html', 'MDN Web Docs, developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises']
  },
  gather: {
    what: 'To do several waits at once, start them all first and then collect the answers. Together, the waits take as long as the slowest one. One after another, they take the sum of all the waits. Our waits use a pretend clock of ticks. That way they run the same everywhere in your browser, and every step can be shown. Real Python uses await asyncio.gather and waits real seconds.',
    analogy: 'Think of three pots on three burners. The meal is ready when the slowest pot is ready, not when the three times are added up.',
    uses: ['A weather app that asks five cities for their forecast at the same moment', 'A shop app that loads prices and pictures together', 'A chat app that fetches many friends\' photos in one go'],
    before: ['async-await'],
    words: [
      ['gather', 'Start many waits and collect all their answers.'],
      ['one by one', 'Each wait finishes before the next one starts.'],
      ['together', 'All the waits start at once and overlap.'],
      ['longest', 'The slowest wait. It decides when everything is done.'],
      ['total', 'All the waits added up.'],
      ['pretend clock', 'Ticks that our programs count instead of real seconds. It runs the same everywhere in your browser and shows every step.']
    ],
    math: null,
    steps: ['List the waits that do not depend on each other.', 'Start every wait before collecting any answer.', 'Let the waits overlap.', 'Collect the answers, in the order you asked for them.', 'The total time is the longest wait.'],
    use: ['Several waits do not depend on each other.', 'You want the page or program to finish sooner.'],
    avoid: ['Waiting for each job in a loop when they could overlap.', 'Starting jobs together when one needs the answer of another.'],
    mistakes: ['Awaiting inside a loop and expecting an overlap. Fix: start them all first, then collect.', 'Adding the waits when they overlap. Fix: use the longest wait.', 'Thinking answers come back in finishing order. Fix: they come back in the order you asked.'],
    cheat: ['real Python: await asyncio.gather(soup(), bread(), cake())', 'one by one = add the waits', 'together = the longest wait', 'start all, then collect', 'answers keep your order'],
    next: ['timeouts'],
    sources: [PY_LIB + 'asyncio-task.html#asyncio.gather', 'MDN Web Docs, developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all']
  },
  timeouts: {
    what: 'A job can fail, or it can take too long. Catch the failure where you wait for the job, so the others carry on. A timeout is a time limit after which you stop waiting. Our jobs use a pretend clock of ticks. That way they run the same everywhere in your browser, and every step can be shown. Real Python uses await asyncio.wait_for(job(), timeout=4).',
    analogy: 'Think of a customer who says, Cancel the pizza if it is late. The limit says when to give up.',
    uses: ['A browser that stops waiting for a page after a while', 'A game that shows an error when the server does not answer', 'A shop app that tells you a payment failed instead of freezing'],
    before: ['gather', 'exceptions'],
    words: [
      ['timeout', 'A time limit. When it passes, you stop waiting.'],
      ['failure', 'A job that could not finish, such as an item sold out.'],
      ['catch', 'To answer an alarm with except so the program carries on.'],
      ['limit', 'The longest wait you accept.'],
      ['safety net', 'A try and except that stops one failure from spoiling the rest.'],
      ['pretend clock', 'Ticks that our programs count instead of real seconds. It runs the same everywhere in your browser and shows every step.']
    ],
    math: null,
    steps: ['Decide the longest time you will wait.', 'Raise an alarm if a job fails or takes longer.', 'Put try and except around each job inside the loop.', 'Print or store what went wrong.', 'Carry on with the next job.'],
    use: ['Jobs run over a network or other things you do not control.', 'One bad job must not stop all the others.'],
    avoid: ['A try around the whole loop that stops at the first failure.', 'Waiting for ever with no limit.'],
    mistakes: ['Putting the try outside the loop. Fix: put it around each job.', 'Hiding the failure with no message. Fix: print or save the reason.', 'Setting no limit. Fix: choose a time to give up.'],
    cheat: ['real Python: await asyncio.wait_for(job(), timeout=4)', 'try inside the loop', 'one failure, others carry on', 'a limit decides when to give up', 'report what went wrong'],
    next: ['retries'],
    sources: [PY_LIB + 'asyncio-task.html#timeouts', PY_TUT + 'errors.html#handling-exceptions']
  },
  retries: {
    what: 'Some failures pass quickly. You can try again a few times, waiting longer each time, and then stop. Doubling the wait is called backoff. A limit on the tries makes sure you give up in the end. Our waits are on a pretend clock: the code prints the wait but never pauses. That way it runs the same everywhere in your browser, and every step can be shown. Real Python pauses with await asyncio.sleep(wait).',
    analogy: 'Think of knocking on a busy door. You wait a little, knock again, then wait longer, and after a few tries you leave a note.',
    uses: ['A phone app that tries again when the network drops', 'A game that reconnects to a busy server', 'A shop app that retries a payment check a few times'],
    before: ['timeouts'],
    words: [
      ['retry', 'Trying a failed job again.'],
      ['backoff', 'Waiting longer after each failed try, often doubling the wait.'],
      ['attempt', 'One try. The first try is attempt 1.'],
      ['give up', 'To stop trying and report the failure.'],
      ['busy', 'Too crowded to answer right now.'],
      ['service', 'A program or computer that answers requests, such as a website.'],
      ['pretend clock', 'Ticks that our programs count instead of real seconds. It runs the same everywhere in your browser and shows every step.']
    ],
    math: null,
    steps: ['Choose the most tries you will allow.', 'Try the job.', 'If it works, return the result.', 'If it fails, wait, then double the wait.', 'After the last try, give up and report it.'],
    use: ['A failure is likely to pass soon, such as a busy network.', 'You can safely repeat the job.'],
    avoid: ['Trying again with no wait.', 'Trying again for ever.'],
    mistakes: ['Retrying at once, again and again. Fix: wait, and wait longer each time.', 'Having no limit on tries. Fix: stop after a few tries.', 'Forgetting to double the wait. Fix: update wait after each failure.'],
    cheat: ['real Python: await asyncio.sleep(wait)', 'few tries, longer waits, then stop', 'wait = wait * 2', 'success: return', 'last failure: give up and say so'],
    next: ['threads'],
    sources: [PY_TUT + 'errors.html#handling-exceptions', PY_TUT + 'controlflow.html#for-statements']
  },
  threads: {
    what: 'Threads and processes give a program more than one worker. Async takes turns on one worker. Processes truly work at the same moment, and threads can switch at any moment. When two workers share one number, an update can be lost. That mistake is called a race. Our race is on a pretend clock: we write the reads and writes in a fixed order. That way it runs the same everywhere in your browser, and every step can be shown. Real Python uses threading.Lock.',
    analogy: 'Think of two cashiers who both write the day\'s total on one board. If both read the old number first, one sale vanishes.',
    uses: ['A server that uses many processes to use every core of the machine', 'A chat app that keeps a shared count safe with a lock', 'A photo app that processes several pictures at once'],
    before: ['gather'],
    words: [
      ['thread', 'A second worker inside the same program. Threads share memory.'],
      ['process', 'A separate copy of the program with its own memory.'],
      ['race', 'A bug where the result depends on which worker is quicker.'],
      ['lock', 'A rule that lets only one worker use shared data at a time.'],
      ['shared', 'Used by more than one worker.'],
      ['core', 'One of the separate workers inside a computer chip. Many cores can work at once.'],
      ['pretend clock', 'Ticks that our programs count instead of real seconds. It runs the same everywhere in your browser and shows every step.']
    ],
    math: null,
    steps: ['Ask: is the job waiting or calculating?', 'Mostly waiting: use async.', 'Heavy calculating: use processes.', 'If workers share data, protect it with a lock.', 'Let one worker finish its read and write before the next starts.'],
    use: ['Many workers must do jobs at the same moment.', 'You must pick between async, threads and processes.'],
    avoid: ['Sharing a number between threads with no lock.', 'Using threads for work that is only waiting.'],
    mistakes: ['Thinking async runs two things at the same moment. Fix: async takes turns on one worker.', 'Letting two threads read and write a shared number. Fix: use a lock.', 'Using more workers than the job needs. Fix: pick the tool for the job.'],
    cheat: ['real Python: with lock: lets one thread in at a time', 'async: turns, one worker', 'threads: many workers, shared memory', 'processes: many kitchens, own memory', 'shared number: use a lock', 'a race loses an update'],
    next: [],
    sources: [PY_LIB + 'threading.html', PY_LIB + 'multiprocessing.html']
  }
};
if (typeof module !== 'undefined') module.exports = { START_ABOUT };
