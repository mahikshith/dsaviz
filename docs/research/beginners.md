# Absolute beginners: "Start here" track research

For the DSAMaxxing rebrand. Written 2026-10-25.

**Rule for this whole file (owner decision):** every source below is used for structure, order and teaching ideas only. Nothing is copied or adapted. All lesson text, stories, exercises, tests and code on the site are written fresh by us. Licences are recorded in `links/beginners.md` for reference only. No source is "adapt with credit".

Lesson names, section order and counts below are facts read from public pages. Descriptions are my own words.

## 1. Method

- Tool: REA MCP `capture_browser_scenario`, Edge launch mode, 1280x720, DOM capture after each step. 2-4 pages per call. Parsed with the scratchpad `parse.py`. Date 2026-10-25.
- robots.txt read first for docs.python.org, freecodecamp.org, exercism.org, codecademy.com, w3schools.com, programiz.com, scrimba.com. No crawl-delay found on any. Nothing I visited is disallowed (Codecademy disallows `/courses/` only; I used `/learn/`). futurecoder.io and cs50.harvard.edu return no robots file (404 / not-found page). github.com and ocw.mit.edu: pages are public and I did not fetch their robots.txt (not checked; gap).
- No logins, no CAPTCHAs solved. Bot check seen once: khanacademy.org returned a "Client Challenge" page for `/computing/intro-to-programming` and for the first robots.txt fetch. Per our rule, a bot check means skip: Khan Academy is not covered, and notes briefly taken from an older Khan URL were deleted.
- Gaps (see section 2 and the links file): Grasshopper (grasshopper.app, www.grasshopper.app) did not resolve in DNS from this laptop, so it is not covered. Scrimba: my guessed course URL returned a CSS Flexbox course, so Scrimba's Python/JS beginner course is not covered, only its model (paid tiers, screencasts) from that page. Exercism's `/tracks/python/exercises` list is rendered client-side and the learning-exercise names did not come through; concept order did. AlgoMaster `/learn/dsa/python-for-dsa` returned 404 (slug guess wrong); the warm-up list came from the 771-item sidebar of the course page. Chapter bodies of AlgoMaster were not rendered (matches the earlier bucket). algosimplified.dev and codolio.com: no beginner/language-basics track exists in the structure already recorded in `algosimplified.md` and `codolio.md` (blog posts and sheets only), so there is nothing new to add; they are not re-crawled. prachub skipped as instructed (bot check).
- Source quote limits: no passages reproduced. Short phrases are product names or section titles.

## 2. Per source

Template per source: audience, order from zero, how lesson 1 starts, lesson size, exercise format, how errors are taught, motivation and progress, editor UX, business model and licence.

### 2.1 Python official tutorial (docs.python.org/3/tutorial)
- Audience: the first box on the page says the tutorial is for programmers new to Python, not for people new to programming. That is useful for us: the official source tells beginners to go elsewhere.
- Order: whetting your appetite, using the interpreter, "informal introduction" (calculator on numbers, then text, then lists, then a first loop-based program), then control flow tools, data structures, modules, I/O, errors, classes, standard library tour.
- Lesson 1 for real beginners (chapter 3): you type expressions into the `>>>` prompt and read the value back. Numbers first, `+ - * /`, then text, then lists. Comments explained in the first paragraph.
- Size: one long page per chapter, prose plus REPL transcripts. No exercises.
- Errors: not taught in the intro chapters. Errors and exceptions arrive at chapter 8.
- Business: free, PSF. Licence: Python docs licence (not reviewed; facts only).
- Takeaway: "REPL as a calculator first" is the oldest and still the commonest first step.

### 2.2 CS50 (CS50x week 0-1, CS50 Python)
- Audience: CS50x is for everyone with no experience. CS50P (Intro to Programming with Python) says "with or without prior experience".
- CS50x order: week 0 Scratch (computational thinking, inputs/outputs, representation: unary, binary, ASCII, RGB; abstraction; algorithms; then Scratch functions, variables, conditionals, loops, events), week 1 C, week 2 arrays, 3 algorithms, 4 memory, 5 data structures, 6 Python, 7 SQL, 8 web, 9 Flask.
- CS50P order (10 weeks): functions and variables, conditionals, loops, exceptions, libraries, unit tests, file I/O, regular expressions, OOP, et cetera, then a final project. Note: functions come first (you call `print` and pass arguments before you learn variables), and unit tests get a whole week.
- Lesson 1: a lecture video (about an hour or more), notes and slides, "shorts" (small clips), a problem set. Lesson is large; the short clips are the small units.
- Exercises: problem sets autochecked with `check50`; write programs to a spec. Not covered here: the checker UX (needs login/edX for submission).
- Errors: exceptions get their own week (week 3 in the Python course).
- Motivation: certificate paid on edX; free OpenCourseWare; community channels.
- Business: free to take; verified/professional certificates sold via edX. Licence: CC BY-NC-SA 4.0 (read earlier from `/x/license/`). Structure only.
- Takeaway: Scratch-first week teaches "program = instructions + variables + conditions + loops" with no syntax fights. A "unit tests" week is a rare strong idea for us, because our product is test-based.

### 2.3 freeCodeCamp (Python Certification, JavaScript Certification)
- Audience: anyone, no signup needed to read; "Sign in to save your progress (it's free)".
- Python curriculum seen: 579 steps in total. "Python Basics" is 141 steps. Order inside Basics: Introduction to Python (theory, what Python is used for in industry), variables and data types, then strings, numbers and maths, booleans and conditionals, then functions and scope. Each theory block is followed by a "workshop" or "lab" that builds a small named thing (a report card printer, employee profile generator and validator, bill splitter, movie ticket calculator, travel weather planner, kitchen inventory tracker, discount function, Caesar cipher, RPG character). Then loops and sequences (31 steps), dictionaries and sets (50), error handling (7), classes and objects (71), OOP (123), linear data structures (32), recursion (9), algorithms (49), graphs and trees (51), dynamic programming (4), review, exam.
- Lesson 1: theory page "What is Python and what are some common uses in the industry" then a variables and data types page. Install-Python is the last Basics item (browser editor handles the start).
- Size: very small steps (hundreds per course); theory blocks are short, workshops are step lists of tiny edits.
- Exercise format: step-by-step guided workshops (complete the next line, pass a test), labs (spec + tests), quizzes, review pages, five certification projects and an exam.
- Motivation: certificates (free), projects as portfolio, daily coding challenge, forum.
- Editor: in-browser editor with a test panel, prior art I did not interact with (no login). Not measured.
- Business: charity, donations. Licence: not checked this session; treat as unknown.
- Takeaway: flow is variables, strings, numbers, booleans, functions before loops; the algorithms/graphs/DP block is inside the same certification, which is the same path we want, but the leap from Basics to Algorithms has dictionaries, classes and OOP in between that our users may not need.

### 2.4 Khan Academy

Skipped: bot check ("Client Challenge") on khanacademy.org. No notes taken; nothing from Khan is used.

### 2.5 Exercism (Python and JavaScript tracks, plus Jiki)
- Audience: track is for people with some programming in other languages; the track page now says "Learning to code? Check out our new dedicated beginners platform - Jiki". So Exercism itself routes true beginners away.
- Python concept tree (17): Basics, Numbers, Bools, Conditionals, Strings, Comparisons, String Methods, Lists, List Methods, Loops, Tuples, Dicts, Dict Methods, Sets, Unpacking and Multiple Assignment, Classes, Generators. 146 exercises. Note the order: strings come before comparisons, lists before loops (differs from futurecoder and others).
- JavaScript concept tree (~40): Basics, Numbers, Arithmetic Operators, Strings, Booleans, Arrays, Conditionals, Comparison, Increment/Decrement, For Loops, While Loops, Switch, Objects, Null and Undefined, Type Conversion, Functions, Template Strings, Ternary, Closures, Randomness, Callbacks, destructuring, array analysis/transformations/loops, arrow functions, rest/spread, prototypes and classes, dates, errors, inheritance, sets, regex, recursion, type checking, promises.
- Exercise format: download or open in the browser, make unit tests pass; mentoring optional. Concept exercises have friendly names and tiny stories; practice exercises are classic katas (Pangram, Proverb, Simple Cipher on the Python page).
- Business: nonprofit, free; donations; Insiders thank-you tier. Licence: Python track repo shows MIT on the repo page and "Zero-Clause BSD" plus "Exercism Python Track License" lines; I did not open the LICENSE file. Reference only.
- Jiki (jiki.io): "Learn to Code the Fun Way". Exercises are visual games and puzzles (the home page shows a space-invaders lane-cannon exercise written in a small block-like pseudo language with `if`, `repeat_until_game_over`, `move_right()`, `shoot()`), step back through every line to watch what happened, hints, "Ask Jiki" help, video explanations, community. Free signup plus a premium tier. Teaches TypeScript, Python, Ruby after the fundamentals. Takeaway: a custom beginner pseudo-language with a visual outcome and rewind is a serious current bet by the biggest free practice site.

### 2.6 Codecademy (Learn Python 3)
- Audience: absolute beginners; catalogue page also lists "Learn the Basics of Programming" (1 hour) and "Code Foundations" (4 hours, beginner).
- Learn Python 3: 14 lessons, 14 projects, 13 quizzes (page). Syllabus order of the first seven: Hello World (with a point-of-sale project), Control Flow (if/else/elif, booleans, logical operators), Lists, Loops, Functions (physics formula project), Code Challenges (optional), Strings. Note lists and loops before functions; strings after functions; later modules extend to dictionaries, files, classes.
- Lesson 1: syntax plus a project in a furniture store. Business-flavoured stories.
- Size: a lesson is a series of short instruction-plus-editor screens with a "Run" check; an AI Learning Assistant explains errors in a side panel (page).
- Exercise format: fill in the next step in the editor; a project per lesson; quizzes. Practice projects, assessments and certificate are paid.
- Business: freemium; Plus/Pro unlock projects, quizzes, certificates. Claims 4.6 average from 12k+ ratings, and that Python 3 course learners are in the millions. Licence: proprietary.
- Takeaway: "AI explains my error" is now table stakes; the order (control flow, lists, loops, functions) is the commonest in commercial courses.

### 2.7 W3Schools Python
- Audience: wide; reference style. Sidebar order: Intro, Get Started, Syntax, Output (print text, print numbers), Comments, Variables (names, multiple values, global), Data Types, Numbers, Casting, Strings (slice, modify, concatenate, format, escape, methods), Booleans, Operators, Lists (and all the list operations), Tuples, then sets, dicts, conditions, loops, functions and on.
- Lesson 1: a page of text and a "Try it Yourself" editor box. Each topic ends with "Code Challenge" (fill the missing word) and exercise pages.
- Motivation: a new "Python Adventure" mobile app with XP and streaks; $95 certificate. Business: ads plus certificates, paid courses. Licence: proprietary.
- Takeaway: strings, operators and lists are covered at great length before the first conditional. Reference-first order; many beginners drown in it. We should not copy this order.

### 2.8 futurecoder (futurecoder.io, github alexmojaki/futurecoder)
- Audience: "complete beginners", Python from scratch, 100% free and open source. The strongest dedicated beginner product I found.
- Chapter list (from the repo): 1 the shell, 2 string basics, 3 variables, 4 for loops, 5 if statements, 6 lists, 7 a bit more about strings, 8 nested loops, 9 functions, 10 boolean operators, 11 tic-tac-toe project, 12 dictionaries. Note: for loops come before if, and functions come late (9th).
- Lesson 1: "Introducing the shell". The shell is a place to run small bits of code. You type `1+2`, press Enter, and see `3`. Then it tells you to experiment and ask "what happens if I run X", with the line that nothing bad happens if you get it wrong.
- Step size: each page is one tiny task with "Requirements", "Assessment" (explains what is wrong), "Hints and Solution" (hint ladder, then "solution breadcrumbs" revealing the answer piece by piece), a Run button and Next.
- Exercise formats: run exactly this code; predict then run; write code that passes; Parsons problems (shuffle the solution lines into order) when stuck; debuggers on one click (Python Tutor, Snoop, Bird's Eye).
- Errors: "enhanced error messages": tracebacks are rewritten into plain, helpful explanations. The site calls normal tracebacks intimidating to beginners and removes the fear. Their repo has a screenshot titled linting and messages.
- Motivation: users love the encouraging, no-lectures tone; it claims "100% active learning" in a quote. No streaks seen. Progress is per page; sign up saves it.
- In-browser editor: code runs fully in the browser (a commit note says the app now "works completely statically"). Shell on the right, editor on the left, Run button.
- Business: free, donations. Licence: MIT shown on the repo page (1.5k stars). I did not open the LICENSE file; recorded in links.
- Takeaway: the best model for our first 10 lessons: tiny steps, shell first, hint ladders, Parsons as the stuck-helper, and friendly error rewrites.

### 2.9 Programiz (Python programming)
- Audience: beginners. Order: How to get started, first Python program, comments, variables and literals, type conversion, basic input and output, operators, then flow control (if/else, for, while, break/continue, pass), data types (numbers, lists, tuples, sets, dicts), functions (arguments, scope, global, recursion), modules and packages, main, files and CSV, exceptions, classes and OOP, advanced topics (comprehensions, lambda, iterators, generators, closures, decorators, regex, date and time), extras (keywords, asserts, JSON, pip, args and kwargs).
- Lesson 1: not "Hello, World!". The page explicitly chooses a program that adds two numbers (two variables, a `+`, a print) as the first program and walks it line by line, then says "if you don't completely understand this, that's fine; our tutorials cover it step by step". Run Code and Visualize buttons beside it.
- Editor: online Python editor with a visualizer, "no account needed".
- Business: ads plus Programiz PRO (a 40% off banner is on the page). Licence: proprietary.
- Takeaway: "line-by-line walk-through then reassure the learner" plus a visualizer button is a good first-run pattern.

### 2.10 Codedex (codedex.io/python and github codedex-io/python-101)
- Audience: beginners (the badge says BEGINNER). 22 hours, 1.22M+ learners claimed.
- Order and exercise count (43 exercises): Hello World (setting up, hello world, pattern, initials, snail mail), Variables (data types, temperature, BMI, Pythagorean, currency; input is inside this chapter), Control Flow (coin flip, grades, pH levels, magic 8 ball, cyclone, sorting hat), Loops (enter PIN, guess number, detention, 99 bottles, fizz buzz), a checkpoint project, Lists (grocery, to-do, inventory, reading, mixtape, bucket list), Functions (D.R.Y., fortune cookie, Mars orbiter, calculator, stonks, drive-thru), Classes and Objects, Modules (slot machine, solar system, countdown, forty-two, Zen of Python), final project.
- Each chapter ends with a bonus article and a challenge pack that unlock after finishing.
- Motivation: XP (685 total), 8 badges, levels, a chapter-based unlock, mentor-reviewed checkpoint and final projects. A "Club" (paid) tier gates many chapters and projects.
- Business: freemium, Club subscription. Licence: the repo python-101 shows MIT on its page (817 stars); folders 1-hello-world through 8-modules. Reference only.
- Takeaway: every exercise has a tiny named story (Sorting Hat, Magic 8 Ball, Fizz Buzz). Games and playful names from lesson 5 on. The same order as Codecademy: variables, conditions, loops, lists, functions.

### 2.11 MIT OpenCourseWare (6.0001, 6.100L)
- Audience: "students with little or no programming experience". Licence CC BY-NC-SA: facts only.
- 6.100L (Fall 2022) week by week: L1 knowledge, machines, objects, types, variables, bindings, IDEs. L2 strings, input/output, f-strings, operators, branching, indentation. L3 control flow, loops. L4 iteration, guess and check, binary, fractions. L5 approximation, floats. L6 bisection search, Newton-Raphson. L7 functions: decomposition, abstraction, specifications. L8 environments, scope, functions as objects. L9 tuples and lists. Then (from the course page) aliasing, mutability, recursion, dictionaries, testing, debugging, classes.
- Exercise format: "finger exercises" after each lecture (tiny), problem sets, microquizzes (30 minutes on a computer, every other lecture).
- Takeaway: MIT puts "guess and check" and bisection (a first algorithm) before functions. That is the natural bridge from loops to algorithmic thinking and is exactly what our site needs. 6.0001 stays in the same shape (lecture 1-9 over half a semester).

### 2.12 Other structures read
- **Python for Everybody (py4e.com/lessons)**: 17 chapters: install, why program, variables/expressions/statements, conditionals, functions, loops, strings, files, lists, dictionaries, tuples, regex, networking, web services, OOP, databases, visualization. Each is a short blurb. The "why program" chapter is explicitly its own lesson 2.
- **Automate the Boring Stuff (3rd ed.)**: Python basics, if-else and flow control, loops, functions, **debugging as chapter 5 (before lists)**, lists, dictionaries and structuring data, strings, regex, files. Motivation is the "do hours of tedious work in minutes" pitch. Licence CC BY-NC-SA; facts only.
- **30 Days of Python (Asabeneh)** (77k stars, no licence file visible): intro, variables and built-in functions, operators, strings, lists, tuples, sets, dicts, conditionals, loops, functions, modules, list comprehension, higher-order functions, type errors, dates, exceptions, regex, files, packages, classes, scraping, venv, statistics. One topic per day. No licence shown, so facts only.
- **trekhleb/learn-python** (18.5k stars, MIT on page): a topic-per-folder playground of scripts with tests; reference only.
- **Akuli/python-tutorial** (1.6k, "Python 3 tutorial for beginners", licence shown as "Other"): basics/ and advanced/ folders. Facts only.
- **animator/learn-python** (506 stars, CC-BY-SA-4.0): SA, facts only.
- **4GeeksAcademy/python-beginner-programming-exercises** (465): auto-graded exercises folder with `learn.json`; licence shown as "Other"; facts only.
- **Upendhar10/LogicBuilding101** (850): 101 exercises, one folder per day (DAY01...DAY34). No licence file seen.
- **zhiwehu/Python-programming-exercises** (29.8k): 100+ exercises in one README. No licence seen.
- **PythonFreeCourse/Notebooks** (1.1k, Hebrew notebooks, licence "Other") and **ProgrammingHero1/100-plus-python-coding-problems**: lists of beginner exercises.
- **GitHub topic pages** (`python-tutorial` 300+, `learn-python`, `programming-exercises`, `beginner-friendly`): top repos by stars are mostly not beginner-first: python-mastery (13.4k, advanced), codebasics/py (7.4k, sample programs), rustlings (64k, fix-the-broken-file format; for Rust), ziglings (4.7k, same format). The "fix tiny broken programs" format from rustlings/ziglings is a good exercise type to remember.
- **AlgoMaster** (the closest competitor to our "Start here"): the DSA course has a "Programming Fundamentals" section of 7 pages named "X for DSA" (Java, Python, C++, C#, Go, JavaScript, TypeScript) and then a 65-item "DSA Warmup" before Big O. Warm-up groups, in order: Variables, I/O and operators (swap two numbers, temperature converter, simple and compound interest, seconds to h/m/s, absolute value without built-in, quotient and remainder, area and perimeter); Conditionals (even/odd, sign, leap year, grade, valid triangle, vowel/consonant, collinear points); Loops (1 to N, times table, sum even/odd, count digits, sum of divisors); Pattern printing (stars, pyramids, diamond, Floyd, butterfly, hourglass, spiral); Number theory (prime check, primes up to N, factorial, Fibonacci, GCD, LCM, perfect number, decimal to binary); Array warm-ups (sum, average, max, second max, count even/odd, linear search, reverse in place, is sorted, count frequency); String warm-ups (length, vowels, words, palindrome, count a character, replace spaces, toggle case, longest word); Recursion (sum, factorial, Fibonacci, power, reverse a string, digit sum, print 1..N, count digits, GCD). Then Big O (8), Math (24), Sorting, Arrays, etc.
  - Where it falls short for true beginners (my reading of the structure): no lesson on what a program is, no input/output format teaching, no explicit "reading an error" lesson, the Python page for beginners was not reachable at the slug I tried, and the jump from warm-ups to Big O/recurrence relations/Master theorem (before Arrays) is large. Whether the warm-up pages teach or only list problems was not visible (chapter bodies not rendered). algosimplified.dev has only blog posts on beginner subjects and codolio.com is a tracker (no learning content), so neither competes with this track.

### 2.13 Scrimba, Grasshopper
- Scrimba: public course pages show interactive screencasts (you pause and edit the teacher's code in the video), tier labels (Pro), student counts, and "Account required to save your progress". Not covered for JS/Python beginner courses (URL guess failed).
- Grasshopper: not reachable (DNS).

## 3. Synthesis

### 3.1 What makes beginners stick or quit (from the sources, plus inference)
Evidence in the sources:
- Official docs tell beginners they are not the audience (Python tutorial), and Exercism redirects beginners to a separate product (Jiki). Beginners quit first because the material was written for someone else.
- The best-reviewed beginner products (futurecoder, Codecademy, Codedex, Jiki, freeCodeCamp) all use tiny steps with an immediate Run, a playful project per chapter, and an explicit "stuck" ladder (hints, breadcrumbs, AI helper).
- Reviews quoted on futurecoder's page praise "no lectures", encouraging tone, and active learning. Codecademy quotes praise slow pace and small chunks.
- Tracebacks are named as intimidating (futurecoder). ATBS puts debugging in chapter 5, before lists.
Inference (flag for validation with real beginners):
- They quit on: install and setup; a wall of reference (W3Schools style); first red error with no explanation; jumping to a concept whose prerequisite was skipped (functions before variables are used; lists before loops); `=` versus `==`; indentation; `input()` returning text; "return vs print"; off-by-one; they cannot tell what the problem is asking.
- They stick on: seeing a result within the first minute, small named stories, streak/XP only if it does not punish a missed day, a visible "you can do this" progress map, and lessons that end in something playable.

### 3.2 Common first 20 topics, in order (consensus of the 12 curricula)
1. What a program is / why program (py4e, CS50 W0, MIT L1)
2. Run something: print / REPL / shell (all)
3. Numbers and arithmetic as a calculator (Python tutorial, futurecoder)
4. Text (strings) and quotes (futurecoder ch2, FCC, Exercism)
5. Variables (names for values), assignment (all)
6. Data types and conversion (FCC, Programiz, Codedex)
7. Input and output (Programiz, Codedex ch2, MIT L2)
8. Operators and expressions (W3, Programiz, MIT)
9. Booleans and comparisons (Exercism, FCC, Codecademy)
10. if / else / elif (all)
11. and / or / not (Codecademy, futurecoder ch10, Codedex)
12. for loops over a range or a list (all)
13. while loops and stopping (all)
14. Lists (index, append, loop over)
15. More on strings: indexing, slicing, methods (futurecoder ch7, Codecademy last, W3 early)
16. Nested loops / patterns (futurecoder ch8, AlgoMaster patterns)
17. Functions: define, call, parameters, return (Codecademy 5th, futurecoder ch9, FCC before loops, CS50P first)
18. Dictionaries (futurecoder ch12, FCC, Codedex later)
19. Errors and debugging (ATBS ch5, CS50P exceptions wk 3, FCC error handling late)
20. A small project (tic-tac-toe in futurecoder, checkpoint projects in Codedex, 5 FCC projects)

### 3.3 Where sources disagree (flow disputes) and my decision
| Question | Sources | Our decision |
|---|---|---|
| Functions early or late? | CS50P: first (as a user of print). FCC: before loops. Codecademy and Codedex: after lists. futurecoder: 9th. | Use functions early as a user (call `print`, `len`), define your own after lists and loops, because our bridge needs "write a function that returns a value". |
| Loops before conditionals? | futurecoder: for loops then if. Everyone else: if first. | Conditionals first: fewer moving parts, and loops need a stop condition. |
| Lists before or after loops? | Exercism Python: lists then loops. Codecademy/Codedex: lists, then loops (Codecademy) / loops then lists (Codedex). | Loops first (repeat a thing), then lists (what to loop over). |
| Strings early? | W3: early and long. Codecademy: last. | Text in lesson 2 (just print text). Deeper string work after lists, because indexing is the same idea. |
| Debugging when? | ATBS: ch5. CS50P: week 4 of 10 (exceptions). FCC: late. futurecoder: from the start (errors rewritten). | Two touches: tiny "read the red message" lesson very early, full debugging toolkit after functions. |
| Hello World first? | Programiz: no, adds two numbers. Codedex: yes plus tiny patterns. | Hello World is not lesson 1's idea: lesson 1 is "a program is instructions"; the first run is a one-line print with immediate feedback. |

### 3.4 Patterns that work
- Tiny steps, immediate run: a step is one idea and one visible change (futurecoder, FCC step counts, Codecademy screens).
- Predict-then-run: show a snippet, ask "what will it print?", then run to reveal (futurecoder, MIT finger exercises).
- Friendly, rewritten error messages and an "ask for help" button (futurecoder, Codecademy AI, Jiki "Ask Jiki").
- Hint ladder: hint 1, hint 2, show a piece, then reveal the solution (futurecoder breadcrumbs). Parsons problems as a "stuck" fallback.
- Rewind/step visualizer (Jiki, Programiz Visualize, futurecoder debuggers).
- A named, playful story for every exercise (Codedex, Exercism concept exercises).
- A project at the end of each chapter, plus a checkpoint (Codedex, FCC).
- Fix-the-broken-file tasks (rustlings/ziglings idea).
- Unit tests as exercise spec (Exercism, CS50P week 6, FCC labs).
- Progress that rewards completion not time: chapter unlocks, XP, badges (Codedex). Streaks exist on W3Schools app; unknown effect.

### 3.5 Where learners get lost, and how sites route to first problems
- Setup. Everyone good now runs in the browser.
- The jump from "I followed the lesson" to "solve a problem from a blank file" is the gap. Sources handle it with: guided workshops where each step is given (FCC), small projects (Codedex, futurecoder), or hand-held warm-up lists (AlgoMaster). None of the ones I saw explicitly teaches how to read a problem statement, make a test table, and plan in words before coding.
- AlgoMaster sends a beginner from "Warm-up" (65 pages, low difficulty) straight to Big O (including recurrence relations and the Master theorem) and then topic chapters. The warm-ups never say "now you can solve interview problems". That is a missing bridge.
- MIT 6.100L is the best evidence that the natural bridge is: loops, then guess and check, then approximation and bisection, then functions as abstraction. Guess-and-check is the brute force of the DSA world.
- ATBS puts debugging before lists. freeCodeCamp puts a small data-structures section (linear structures) before algorithms.

## 4. Proposed DSAMaxxing "Start here" curriculum

Language: Python first (every strong beginner product teaches Python first; the closest competitor offers seven languages but its beginner page for Python was not found). Later: JavaScript variant of the same lessons. Browser runs the code (futurecoder shows a fully static in-browser Python is possible).

Cast: **Old Hoot** is the mentor owl. Friendly characters below are placeholders; replace with our real cast names. Suggested: **Pip** (a small robot helper who follows instructions too literally, perfect for "the computer is literal"), **Mossy** (a tidy squirrel who keeps counts and lists), **Juno** (an eager new learner who asks the obvious questions).

Exercise-style key: PR = predict output; FB = fill in the blank; FX = fix the bug; WF = write a function and pass tests; PZ = Parsons (reorder lines); TR = fill in a trace table; MC = multiple choice.
Test style: every coding exercise has visible tests (input to expected output) plus hidden ones, and a friendly message on failure.

The Start-here track is 4 chapters plus the bridge. Each lesson is 5-12 minutes (6-14 tiny steps). Chapter 4 ends in a mini project.

### Chapter 1: Talking to the computer (L1-L6)
**L1. What is a program?** One idea: a program is a list of exact instructions, and the computer does exactly what is written.
- Story: Pip the robot is told "make toast" and puts the whole loaf in the toaster. Old Hoot says to be precise.
- Exercises: PZ order the steps to make a sandwich in the right order (no code); MC "which instruction is missing?"; PR a three-line toy program that moves Pip on a grid (button-click, no typing).
- Source of idea: CS50 week 0 (instructions and algorithms), py4e "Why program", Jiki (pseudo-language with a visual result). Structure only.

**L2. Your first run.** One idea: `print` shows text on the screen, and Run executes it.
- Story: Pip must announce the shop opening. First line of code.
- Exercises: FB fill in the quotes in `print("____")`; WF-lite change the message and see it change; PR one print with two lines.
- Tests: output equals expected text.
- Inspired by: futurecoder shell step, Programiz first run.

**L3. Calculator mode.** One idea: Python can evaluate expressions; numbers and `+ - * / // % **`.
- Story: Mossy counts acorns for the winter stockpile.
- Exercises: PR evaluate five expressions; FB complete an expression to print 42; FX operator-precedence trap (brackets); WF-lite print total acorns.
- Inspired by: Python tutorial chapter 3, futurecoder ch1.

**L4. Reading your first error.** One idea: the red message names the file line and the kind of mistake; it is help, not a verdict.
- Story: Juno panics at red text; Old Hoot shows how to read "line, kind, hint".
- Exercises: MC match each message to the cause (SyntaxError, NameError, TypeError - three only); FX missing quote; FX typo in `print`.
- Our error messages rewritten into plain words (futurecoder idea, our own text).

**L5. Variables: names for values.** One idea: `name = value` stores a value; a name can be re-bound.
- Story: Mossy labels jars. First show repeated numbers in a story, then introduce the label.
- Exercises: PR what is `b` after `a = 3; b = a; a = 4`?; TR fill a trace table; FX using a name before defining it; WF-lite store price and quantity and print the total.
- Inspired by: Programiz first program (two variables, add them), MIT "bindings".

**L6. Types: numbers, text, True/False.** One idea: values have a kind, and `"5"` is not `5`.
- Story: the shop's price tag says "5" in ink; Pip cannot add ink.
- Exercises: PR `type()` of six values; FX `"5" + 3` (TypeError, which ties to L4); MC choose int/float/str/bool; WF-lite convert `str` to `int` and add.
- Inspired by: Programiz type conversion, Exercism numbers/strings/bools concepts.

### Chapter 2: Asking and deciding (L7-L12)
**L7. Input and output.** One idea: `input()` always gives text; convert it, then use it.
- Story: Juno enters the treehouse club; Hoot asks the password.
- Exercises: FB `int(input())`; FX the "5" + "3" = "53" bug; WF read two numbers and print the sum (tests feed stdin); PZ order lines of a greeting program.
- Inspired by: Codedex variables chapter (input is inside it), MIT L2.

**L8. True or False questions.** One idea: comparisons produce booleans; `=` stores, `==` asks.
- Story: the club bouncer Pip checks age.
- Exercises: PR six comparisons; FX `=` used instead of `==` (SyntaxError, friendly rewrite); MC.
- Inspired by: Exercism comparisons concept, FCC booleans.

**L9. If, else, elif.** One idea: the program picks one path; indentation is the "inside".
- Story: the weather door: umbrella, coat or sunglasses.
- Exercises: PR which branch runs; FX wrong indentation; WF `grade(score)` returns a letter (tests at the edges 59/60/89/90); PZ order an if/elif/else.
- Inspired by: Codedex "Grades", "Magic 8 Ball", Codecademy control flow.

**L10. and, or, not.** One idea: join questions together; read them like English but check the truth table.
- Story: the treehouse has two rules: wear the badge and say the password.
- Exercises: TR truth-table fill; PR nested conditions; WF `can_enter(age, has_ticket)`; FX misuse of `or`.

**L11. Nested decisions and "what could go wrong".** One idea: check the odd cases first; edge cases are where programs break.
- Story: a lemonade stand refuses negative quantities.
- Exercises: WF `shipping_cost(weight)` with tests at the boundaries; PR trap with two overlapping ifs; FX an unreachable branch.

**L12. Checkpoint: a tiny choose-your-path story.** (mini project, 10-15 minutes)
- Story: Juno's cave choose-your-path using input and conditionals.
- Tests: the game output for three scripted input sequences.
- Inspired by: Codedex "Sorting Hat", futurecoder tic-tac-toe as a checkpoint.

### Chapter 3: Repeating and collecting (L13-L19)
**L13. For loops.** One idea: repeat a block a known number of times; `range` makes the counting.
- Story: Mossy hides 10 acorns, one per tree.
- Exercises: PR loop output; FB `range(1, ____)`; FX off-by-one (prints 0..4, not 1..5); TR trace table of `i`; WF print a times table.
- Inspired by: futurecoder ch4, Codedex loops, MIT L3.

**L14. While loops and stopping.** One idea: repeat until something becomes false; make sure it changes.
- Story: Pip pours water until the cup is full - and floods the floor when the condition never changes.
- Exercises: FX infinite loop (Run has a safe stop and a friendly message); WF count down; PR break/continue.
- Inspired by: Codedex "Enter PIN", "Guess Number".

**L15. The accumulator.** One idea: start with an empty box (`total = 0`), update it each time round the loop.
- Story: Mossy adds the acorn count for each tree.
- Exercises: WF `sum_to(n)` with tests; WF `count_evens(n)`; PR what total after 3 passes; TR trace table.
- This is the first "pattern" lesson, the same shape as running sum and counting in later chapters. Also AlgoMaster warm-ups: sum, count digits.

**L16. Lists.** One idea: a list holds many values in order; index from 0.
- Story: Mossy's grocery list of nuts.
- Exercises: PR index and length; FX off-by-one on the last index; FB `append`; WF `last_item(list)`; PZ.
- Inspired by: Codecademy/Codedex lists, Exercism lists.

**L17. Loop over a list.** One idea: `for x in items` visits every item; combine with the accumulator.
- Story: Mossy weighs each acorn and finds the heaviest.
- Exercises: WF `total(items)`; WF `largest(items)` (tests with negatives and a single item); WF `count_matches(items, target)`; PR.
- Hand-off idea to the first problems: this is "scan once".
- Inspired by: AlgoMaster array warm-ups (sum, max, count), MIT tuples and lists.

**L18. Text is a sequence too.** One idea: strings can be indexed, sliced, looped and measured like lists; methods return new text.
- Story: Juno writes a secret note; Pip reverses it.
- Exercises: PR slices; WF `count_vowels(s)`; WF `is_palindrome(s)` (tests with case and spaces); FX modifying a string in place (TypeError).
- Inspired by: futurecoder ch7, Exercism string methods.

**L19. Nested loops and patterns (optional / fun).** One idea: a loop inside a loop gives rows and columns.
- Story: Pip tiles the treehouse floor with stars.
- Exercises: PR; WF print a rectangle and a triangle of stars (output-match tests); FX swapped loop variables.
- Inspired by: futurecoder ch8; AlgoMaster pattern printing. Mark as optional; core path continues at L20.

### Chapter 4: Reusing and organising (L20-L25)
**L20. Functions: define and call.** One idea: `def` names a recipe you can reuse; parameters are its inputs.
- Story: Old Hoot's "feed the owlets" recipe, reused three times.
- Exercises: PR call a function twice; FB parameters; WF `double(n)`; PZ order a function definition; FX call before define.
- Inspired by: Codedex "D.R.Y.", futurecoder ch9, CS50P functions week.

**L21. return versus print.** One idea: `return` hands a value back; `print` only shows it; tests check returns.
- Story: Pip delivers a parcel (return) versus shouts about it (print).
- Exercises: FX function that prints instead of returns; PR `None` surprise; WF `area(w, h)` with tests; WF a function that calls another.
- Why: this is where beginners fail the first judged problem, so give it its own lesson. (Inference from sources; test with learners.)

**L22. Dictionaries: look-ups by name.** One idea: a dictionary pairs keys with values; counting things is a common use.
- Story: Mossy's tally of acorns by tree.
- Exercises: PR; WF `count_letters(s)`; FX KeyError (friendly message); WF `first_repeat(items)` (preview of hash maps).
- Inspired by: futurecoder ch12, Codedex lists/dict neighbours, ATBS ch7.

**L23. Debugging toolkit.** One idea: when it fails, change one thing at a time, print, trace by hand, shrink the example.
- Story: Juno's code fails; Old Hoot teaches "three questions": what did I expect, what happened, where did they split.
- Exercises: FX five different small bugs (one per type: off-by-one, `=` vs `==`, wrong indent, wrong type, missing return); TR trace table; step through with a visualizer.
- Inspired by: ATBS ch5, CS50P (exceptions/tests), futurecoder debuggers, rustlings-style fix tasks.

**L24. Mini project: Guess the number (or a small text adventure).** (15-20 minutes)
- Story: Old Hoot's number game with hot/cold hints.
- Tests: scripted guesses give scripted outputs.
- Inspired by: Codedex "Guess Number", MIT guess-and-check / bisection (the same idea of halving).

**L25. How to read a problem (bridge).** One idea: every problem has input, output, examples, constraints; plan in plain words, try a brute-force idea first, then write tests.
- Story: Old Hoot hands Juno a "job card" (input / output / example / traps).
- Exercises: MC identify inputs/outputs from a statement; PZ order the planning steps; WF a first judged easy problem written as a function with visible and hidden tests; TR write your own two tests (edge cases) before coding.
- Gap addressed: no source taught problem-reading explicitly.

## 5. Dependency graph (zero to first easy problems)

Arrows read "needs".

```
L1 program -> L2 print -> L3 arithmetic -> L5 variables -> L6 types -> L7 input
L2 -> L4 first error (L4 reused by every later lesson that has a TypeError/NameError)
L6 -> L8 comparisons -> L9 if -> L10 and/or/not -> L11 edge cases -> L12 story project
L5 + L9 -> L13 for -> L14 while -> L15 accumulator
L15 -> L16 lists -> L17 loop over a list ( scan once )
L16 -> L18 strings as sequences -> L19 nested loops (optional)
L7 + L9 + L17 -> L20 functions -> L21 return vs print
L17 -> L22 dictionaries
L4 + L21 -> L23 debugging toolkit
L14 + L22 + L21 -> L24 guess-the-number project
L21 + L23 -> L25 reading a problem -> FIRST PROBLEMS
```

Hard prerequisites (do not skip): L5 before anything with a name; L8 before L9; L13 before L15; L16 before L17; L20 before L21; L21 before L25 (a judged problem needs a function that returns).
Soft prerequisites (can be unlocked in parallel): L18 and L22 in any order; L19 optional; L4 and L23 are "debugging" and can be reopened.

Where the common failure points sit in this graph (inference): L7 (`input` returns text), L8 (`=` vs `==`), L13 (off-by-one), L16 (index 0), L21 (return vs print), L22 (KeyError). Each has an exercise of type FX in its lesson.

## 6. How it connects to the rest of the site

1. **Start here** (L1-L25) is open and free to start, never blocked by a paywall in the first chapters (monetisation: the track is the funnel; gate later practice, certificate-style summaries, extra projects, not the first 10 lessons). Business-model evidence: futurecoder and Jiki are free and community-driven; Codecademy and Codedex gate the later chapters and projects behind plans; W3Schools sells a certificate.
2. **L25 unlocks "First problems"**: a set of about 10-15 easy problems chosen to use only what the track taught (scan once, count, max, reverse, palindrome, FizzBuzz-style, two-sum-by-brute-force, first repeated item with a dictionary). Each problem page shows the "job card" format from L25.
3. **Then the pattern map**: the first problems each tag the pattern they hint at (scan, counting/hash map, two pointers, ...); finishing First problems opens the pattern map, with Big O introduced right after, via "how many steps did my loop do?" using the trace tables from L13-L17. This avoids the AlgoMaster jump (warm-up straight to recurrence relations).
4. **Re-entry**: any problem failing on a basic error (NameError, TypeError, off-by-one) links back to L4, L23 or the relevant lesson ("review this"), not a generic wiki.
5. **Language variants**: Python version first. Later: JavaScript version of the same graph (Exercism's JS concept tree and freeCodeCamp's JS certification are all available to compare).

## 7. Open questions and gaps

- Grasshopper (DNS failure), Scrimba beginner course, Exercism learning-exercise names, AlgoMaster beginner page bodies, MIT lectures 10-25 order (only weeks 1-5 read in the calendar excerpt) and Khan Academy (skipped: bot check) were not covered.
- Validation with real learners is needed for the inferred failure points.
- Cast names are placeholders pending the real cast list.
- No licence file was opened; licences are as shown on repo pages. Not relevant for the final plan because we write everything ourselves.
