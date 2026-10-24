# Core programming after the basics (Levels 2-5 of "Start here")

Research bucket for DSAMaxxing, 2026-10-25. All site content will be our own writing. This file records topic order, prerequisites, misconceptions, visual devices and exercise formats only. Links and licences: `docs/research/links/core-programming.md`.

## Method

- REA MCP server, Edge launch mode, 2.5-3 s between pages, 3 pages per call, no login. robots.txt read first (GitHub allows repo roots and /topics; MDN, Real Python, docs.python.org fine).
- Done: 12 GitHub repos and 6 topic pages, Python docs (classes, errors, asyncio, asyncio-task), MDN (guide, classes, promises, execution model, async module), W3Schools (Python classes, JS async).
- Skipped: **Real Python** (both OOP and asyncio pages: bot check "Just a moment...", stopped, no alternate copy), **Programiz** OOP (page timed out twice, nothing loaded), **freeCodeCamp** articles (no stable URL without web search; the Python v9 outline from the beginners bucket is reused: classes 71 steps, OOP 123 steps, error handling 7, recursion 9).
- Because Real Python was blocked, GitHub teaching repos stand in for it (per the coordinator's instruction).
- Caveat: repo READMEs and doc outlines give order and headings well; they show less about misconceptions, so the misconception part of the synthesis below is partly drawn from how the quiz and "anti-pattern" sources frame mistakes, and partly our own reasoning. Marked "(ours)" where it is not directly from a source.

## Per source

### faif/python-patterns (43.1k stars, no licence shown)
- Covers: design patterns in Python, grouped Creational, Structural, Behavioral, plus Design for Testability, Fundamental, Others.
- Notable order: a late **Anti-Patterns** block: Singleton, God Object, Inheritance overuse. A rare source that says "do not do this" about OOP.
- Misconceptions addressed: patterns are not a goal; inheritance is overused; one giant class doing everything.
- Teaching devices: one small file per pattern; no animation.
- Use for us: the "when NOT to use classes / inheritance" lessons and the bridge to LLD.

### zedr/clean-code-python (4.9k stars, MIT) and ryanmcdermott/clean-code-javascript (94.7k stars, licence named only as "License")
- Order (both): Variables (meaningful names, same vocabulary, searchable names, explanatory variables, avoid mental mapping, no unneeded context, default args) -> Functions (do one thing, 2 or fewer args, name says what it does, one level of abstraction, no flags, avoid side effects) -> Classes (SRP, OCP, LSP, ISP, DIP) -> DRY. The JS one adds objects/data structures (getters/setters, private members), method chaining, composition over inheritance, testing (single concept per test), concurrency (promises not callbacks, async/await cleaner), error handling (do not ignore caught errors or rejected promises), formatting, comments.
- Misconceptions: short names are fine; one function can do three things; flags are harmless; commented-out code is a safe backup; swallowing errors is OK.
- Device: bad example then good example, side by side. Exercise format: none (reading only).
- Use for us: clean-naming lessons, "compare two versions" exercise, and SOLID as the bridge to LLD.

### trekhleb/learn-python (18.5k stars, MIT)
- Order: syntax, variables, operators, types (numbers, strings, lists with comprehensions, tuples, sets, dicts), casting, control flow, **functions** (definition, scope with global and nonlocal, default args, keyword args, arbitrary arg lists, unpacking, lambda, docstrings, annotations, decorators), **classes** (definition, class objects, instance objects, method objects, class vs instance variables, inheritance, multiple inheritance), modules and packages, **errors** (handling, raising), files (with), pass, **generators**, standard library tour, input.
- Devices: every topic is a runnable test file; run the tests to check understanding (exercise format: tests as the lesson).
- Note the order: functions -> classes -> modules -> errors -> files -> generators. Functions come with decorators in the same block.
- Misconception hint: scope gets `global`/`nonlocal` right in the functions block, before classes.

### getify/You-Dont-Know-JS (184.8k stars, CC BY-NC-ND 4.0: read-only, never reuse)
- 2nd-edition reading order: Get Started -> Scope & Closures -> Objects & Classes -> Types & Grammar; Sync & Async and ES.Next were cancelled.
- Insight: scope and closures come BEFORE objects and classes, and the first book is about "how the language actually works".
- Use for us: place scope and closures in L2 before OOP in L3. Do not copy anything.

### lydiahallie/javascript-questions (65.3k stars, MIT)
- About 150 numbered questions "What's the output?" with four options A-D; answer and explanation are collapsed below each. Topics span hoisting (var vs let), scope, `this`, references, equality, closures, event loop and promise ordering.
- Device: predict-the-output, then reveal. Misconception style: surprising output teaches the real rule.
- Use for us: the "predict then run" exercise format, used heavily in async ordering.

### arvimal/oop_with_python (368 stars, MIT)
- 17 sections: classes -> instances, instance methods and attributes -> **class attributes (with attribute lookup order and shared state)** -> `__init__` (and "`__init__` is not `__new__`") -> encapsulation (breaking it, name mangling, properties) -> inheritance (inheriting `__init__`, overriding) -> multiple inheritance and lookup -> MRO (C3, diamond) -> polymorphism (inheritance, duck typing, built-in) -> bound methods -> class methods (with a "what each method type can see" visual) -> static methods -> decorators -> magic methods -> abstract base classes (what happens when you miss an abstract method) -> overloading -> `super()`.
- Misconceptions addressed directly: shared class attributes, attribute lookup order, `__init__` vs `__new__`, "private" is by convention, MRO diamond.
- Device: a table "what each method type can see"; a lookup-chain diagram idea.
- Use for us: the OOP module spine; "lookup chain" as a visual (instance -> class -> parent).

### ashishps1/awesome-low-level-design (27.6k stars, GPL-3.0: structure only)
- Order: how to learn LLD, 15 must-know OOP concepts -> OOP fundamentals (classes and objects, enums, interfaces, encapsulation, abstraction, inheritance, polymorphism) -> **class relationships** (association, aggregation, composition, dependency) -> design principles (DRY, YAGNI, KISS, SOLID) -> 23 design patterns -> UML (class, use case, sequence, activity, state) -> **concurrency** (concurrency vs parallelism, processes vs threads, thread lifecycle, race conditions; mutex, semaphores, locks; deadlock; producer-consumer, thread pool) -> "How to answer an LLD interview problem" -> problems: easy (parking lot, vending machine, logging framework, traffic signal), medium (ATM, LRU cache, tic tac toe, pub-sub, elevator, library), hard (Splitwise, chess, snake and ladder, ride sharing).
- Use for us: this is exactly where L3 hands off to LLD. The practice-problem names (parking lot, vending machine, LRU cache) are generic ideas; we write our own stories.

### dabeaz-course/python-mastery (13.4k stars, CC-BY-SA-4.0; archived by the author in Oct 2026)
- Exercise-driven advanced course, 30-50 hours, fork/clone, exercises build on each other, a Solutions folder is provided. Supplemental topics: generator tricks, coroutines and concurrency, metaprogramming, modules and packages.
- Device: exercises that build one program through the whole course (a growing codebase); tests/data files supplied.
- Use for us: the idea of one running program that grows across lessons (our cast's "Foundry" town).

### Akuli/python-tutorial (1.6k stars, licence named only as "License")
- Order: Basics (what is programming, variables, functions, if/elif, strings, lists/tuples, loops, zip/enumerate, dicts, defining functions, writing a larger program, truthiness, files, modules, exceptions, classes, docstrings) then Advanced (handy data types, advanced functions, magic methods, iterables/iterators/generators). Says explicitly: prefer the simple techniques; "Simple is better than complex."
- Device: "no long explanations; show everything with simple code examples"; answers to exercises provided.
- Use for us: classes come after exceptions and files; advanced topics are labelled optional.

### frontarm/async-javascript-cheatsheet (1.9k stars, MIT)
- README is a promo for a 47-example live course (first lesson "Why async, anyway?"). No topic list on the page.
- Takeaway: the course starts with *why* async, before promises syntax.

### Other repos seen
- Deepali-Srivastava OOP repo: course promo, "all rights reserved", nothing used.
- Topic pages: `python-oop` is mostly student projects; `asyncio` and `async-await` return libraries (fastapi, aiohttp, uvloop, trio, anyio), not teaching material; `clean-code` returns the JS repo plus .NET architecture repos. Conclusion: for async, the official docs and MDN are the order source.

### docs.python.org (PSF docs licence, facts only)
- Tutorial order: ... errors (ch 8) -> classes (ch 9). Errors: syntax errors vs exceptions (two different things) -> handling -> raising -> chaining -> user-defined -> clean-up (`finally`, `with`) -> groups -> notes.
- Classes: **"A word about names and objects"** (aliasing) -> **scopes and namespaces** (with a worked example) -> class syntax (class objects, instance objects, method objects, class vs instance variables) -> random remarks -> inheritance (multiple) -> private variables -> odds and ends -> iterators -> generators -> generator expressions.
- Key order fact: names/objects/scope are taught BEFORE class syntax. We should do the same.
- asyncio: starts with a tiny sleep-based hello world, claims fit for IO-bound work; task page order: coroutines -> awaitables -> creating tasks -> cancellation -> task groups -> sleeping -> running concurrently -> timeouts -> waiting -> running in threads.

### MDN (CC licence per footer, facts only)
- JS Guide order: types, control flow and error handling, loops, functions, expressions, numbers/strings, collections, working with objects, **using classes**, **promises**, iterators and generators, modules, advanced topics.
- Classes: overview -> declaring -> constructor -> instance methods -> private fields -> accessors -> public fields -> static -> extends -> **"Why classes?"** (motivation last).
- Promises: chaining -> error handling -> composition -> cancellation -> wrapping old callback APIs -> timing (task queues vs microtasks).
- Execution model: engine and host -> stack and execution contexts -> closures -> **job queue and event loop** -> "run-to-completion" -> "never blocking".
- Async module: introducing async (sync vs async, why it matters) -> how to use promises (introducing async/await) -> implementing a promise API -> workers (a separate thread) -> an animation-sequencing challenge. Prerequisite listed: "dynamic scripting" modules first; "fairly advanced topic".
- Teaching shape: why async -> promises -> async/await -> workers.

### W3Schools (structure only)
- Python OOP sidebar order: classes/objects -> `__init__` -> `self` -> class properties -> class methods -> magic methods (`__str__`, `__repr__`, `__eq__`, `__add__`, `__len__`, `__lt__`, `__contains__`, `__call__`) -> inheritance -> polymorphism -> encapsulation -> inner classes. A "Code Challenge" follows nearly every page.
- JS async page: what does async mean -> synchronous JS -> control flow -> function sequence -> blocking code -> why async -> concepts -> common operations -> ways to handle results -> **async vs parallel** (with an analogy).
- Note the micro-lesson size and the per-page challenge. `self` gets its own lesson, which signals how confusing it is.

## Synthesis: where learners get confused

### OOP
1. **Class vs object.** Blueprint/stamp vs the thing made. Learners think one `Dog` class "is" the dog. Fix: always show one class and two objects with different data.
2. **`self`.** Why it appears in the definition but not in the call. It is the object the method was called on. W3Schools gives it its own page; Python docs have "method objects". Visual: `rex.speak()` is an arrow from rex into `speak(self)`.
3. **Instance vs class attributes.** Shared state; assigning on an instance makes a new instance attribute that shadows the class one; lookup order instance -> class -> parent (arvimal makes this a section).
4. **References.** Two names, one object ("a word about names and objects" in the Python docs). Mutating through one name shows through the other. (ours: the core of most OOP bugs.)
5. **Inheritance vs composition.** "Is-a" vs "has-a". Inheritance is over-taught; python-patterns calls "inheritance overuse" an anti-pattern; clean-code-javascript says prefer composition. Diamond and MRO confuse; teach single inheritance plus `super()` first, MRO only as a short optional lesson.
6. **When to use a class.** Beginners wrap everything in classes. Akuli: prefer simple techniques. Show a function or a dict doing the job first, then the point where state plus behaviour want to live together.
7. **Encapsulation/privacy.** Python "private" is a convention; underscore vs name mangling is rarely needed. Properties. (arvimal)
8. **Dunder methods.** `__init__` is not "the constructor that makes the object". `__str__` vs `__repr__`; `__eq__` and hashing together.
9. **Abstract classes and polymorphism.** Duck typing vs enforced interfaces.

### Functions
1. **Call stack.** Each call gets its own frame; return pops it. Recursion is the stack made visible.
2. **Scope.** Where a name is visible; reading vs assigning (`global`, `nonlocal`); JS var/let/hoisting (javascript-questions leans on this).
3. **Closures.** A function remembering the variables around where it was made, not where it is called. (YDKJS puts scope and closures first.)
4. **Mutability and arguments.** Arguments are passed as references to objects; mutating a list inside a function changes the caller's list; reassigning does not. Mutable default arguments (ours: the classic trap).
5. **Return vs print.** Already flagged in the beginners bucket.
6. **Functions as values.** Passing, returning and storing functions; lambda; decorators as the next step.

### Async
1. **Blocking vs waiting.** `sleep` that freezes everything vs waiting that lets others go. MDN and W3Schools both open with "blocking code".
2. **The event loop.** One worker, a queue of tasks, run-to-completion (MDN). Learners think async means "another thread". Microtasks vs tasks order is a late, optional detail.
3. **`await`.** It does not make things faster; it marks "I'm waiting, someone else can go". `await` must be inside `async`; forgetting `await` gives a promise/coroutine object, not the value (ours).
4. **Concurrency vs parallelism.** W3Schools has an "async vs parallel" section with an analogy; awesome-LLD lists them as separate lessons. Threads/processes are the parallel tools; asyncio is concurrency on one thread.
5. **Callback hell -> promises -> async/await** in JS, and why each step happened.
6. **Errors in async code.** Unhandled rejections; try/except around await. (clean-code-javascript: do not ignore rejected promises.)

### Exceptions and generators
- Exceptions: syntax error vs exception; `try` does not "fix" errors, it chooses what happens next; catching too broadly; `finally`/`with` for clean-up; raising your own.
- Iterators/generators: an iterable is not an iterator; a generator function does not run until asked; `yield` pauses and remembers its place; a generator is used up after one pass (ours). Python docs teach iterators then generators then generator expressions.

### Testing and clean code
- Testing: CS50P gives tests a whole week; learn-python makes each lesson a test file; Exercism makes every exercise "make tests pass". For us, tests are native: our exercises already check output.
- Clean code: names, one job per function, no flags, no side effects, comments only for "why", DRY; SOLID as the later bridge.

## Pseudocode and "plan it first"

What the sources show (thin, mostly from the earlier beginners bucket and the LLD roadmap):
- MIT 6.100L: decomposition, abstraction and specifications are taught alongside functions, before algorithms.
- CS50x: Scratch first, so planning is "what steps, in what order" before syntax.
- Jiki (Exercism): a small custom pseudo-language with a visual result and rewind.
- awesome-low-level-design: "How to answer a LLD interview problem" is a fixed checklist: clarify requirements -> list entities -> relationships -> write the interface -> code. A plan-first routine for objects.
- futurecoder (earlier bucket): Parsons problems (arrange the lines).

Proposed "Plan it first" step, on every problem from Level 2 on:
1. **Say it in one sentence**: input, output, and one example ("given X, I return Y").
2. **Steps in plain words** (3-7 numbered lines, no syntax). Example: "start total at 0; for each item, add its price; return total".
3. **Name the pieces**: for OOP, "what things exist, what does each know (data), what can each do (methods)". For async: "what do we wait on?"
4. **Dry-run on the example** by hand with our cast, before typing.
5. Only then code. The editor starts with the plan lines as comments (pseudocode lines become comments the learner fills in).
Exercise formats for it: (a) put these plan lines in order (Parsons for pseudocode), (b) "which plan solves it?" pick one of three, (c) spot the missing step, (d) write the plan, then the app shows the animation of the plan on the example and the learner compares, (e) turn plan lines into code lines (matching). In the animation, the plan appears as a speech bubble from Leela and each line lights up as the cast acts it out. Pseudocode is not graded for syntax, only for order and completeness.

Dedicated lesson: **4.1 "Plan it before you code it"** (see below), and the habit continues in every later lesson as a collapsed "plan" row above the editor.

## Proposed track: Levels 2-5 (45 lessons)

Cast conventions (from `docs/research/` visual notes): objects are boxes with their own data labelled on them; method calls are arrows; inheritance is a family tree; the call stack is a stack of plates; the event loop is a waiter with a ticket queue.

Format per lesson: **Idea** / **Needs** / **Misconception** / **Story** / **Exercises** / **Bridge**.

### Level 2 - Functions in depth (9 lessons)

**2.1 Calling a function (call, arguments, return).** Idea: a function takes values in and gives one back. Needs: L1 functions. Misconception: return vs print. Story: a vending machine takes coins, returns a snack; print is just the machine shouting. Exercises: predict the output; fill the return; fix the print-vs-return bug. Bridge: functions as steps of an algorithm.

**2.2 The call stack.** Idea: each call stacks a plate; return takes it off. Needs: 2.1. Misconception: "the function remembers where to come back to" feels like magic. Story: plates stack up as Leela calls helpers, then come off one by one. Exercises: drag plates into order; predict the print order; "what is on top now?". Bridge: recursion, DFS stack, stack overflow.

**2.3 Scope: which names can I see?** Idea: names live in the function that made them. Needs: 2.2. Misconception: a variable made inside is visible outside; shadowing. Story: rooms with doors; a name painted on the wall of one room. Exercises: predict (like the JS-questions "what's the output"); mark every visible name; fix NameError. Bridge: variable lifetimes in recursion, closures.

**2.4 Default and keyword arguments.** Idea: optional inputs and naming them in the call. Needs: 2.1. Misconception: argument order; the mutable default trap shown as a warning. Story: ordering coffee with defaults. Exercises: match call to result; fix the call; spot the default. Bridge: readable APIs, options in system design.

**2.5 `*args` and `**kwargs` (and JS rest/spread).** Idea: take any number of inputs. Needs: 2.4. Misconception: they are special words (they are not, the stars are). Story: a bag that collects loose items. Exercises: predict; write a function that sums any number of numbers; unpack a list into a call. Bridge: variadic helpers.

**2.6 Mutable arguments: two names, one list.** Idea: passing a list lets the function change the caller's list. Needs: 2.3. Misconception: "the function got a copy". Story: two sticky notes pointing at one box. Exercises: predict then run; make a safe copy; find the surprise bug. Bridge: aliasing bugs in DSA (copying a path in backtracking, shallow copies in 2D grids).

**2.7 Functions as values (callbacks, lambda).** Idea: a function is a thing you can hand to another function. Needs: 2.1. Misconception: calling `f` vs `f()`. Story: handing a recipe card vs cooking it. Exercises: predict; use `sorted(key=...)`; write a lambda. Bridge: comparators in sorting, heap keys.

**2.8 Closures.** Idea: a function carries the variables around where it was made. Needs: 2.3, 2.7. Misconception: it uses the variable value at call time vs creation time (JS loop trap). Story: a lunchbox packed in one room and opened in another. Exercises: predict (JS-questions style); write a counter maker; fix the loop bug. Bridge: memoization, decorators.

**2.9 Recursion through the stack.** Idea: a function that calls a smaller copy of itself, with a base case. Needs: 2.2. Misconception: where the base case goes; "it loops by itself". Story: plates stack down, answers return up. Exercises: step through the stack; fill the base case; predict the call count. Bridge: the first DSA recursion lessons, trees, DFS, DP.

### Level 3 - OOP (14 lessons; the biggest confusion point, best stories)

Running story: **the Foundry roster** (cast members with boxes of their own data) growing across all 14 lessons, plus a small shop for composition.

**3.1 Blueprint vs object.** Idea: a class is a plan; objects are the things built. Needs: 2.1. Misconception: class = object. Story: a stamp and the stamped cards, each card gets its own ink. Exercises: count the objects; "class or object?" sorting; predict. Bridge: data modelling in LLD.

**3.2 `self`: who is calling?** Idea: `self` is the object the method was called on. Needs: 3.1. Misconception: `self` is a keyword; why the call has fewer arguments. Story: `rex.speak()` is an arrow from rex into the method; the arrow lands on `self`. Exercises: trace the arrow; fix a missing `self`; predict. Bridge: `this` in JS; method calls in LLD sequence diagrams.

**3.3 `__init__`: setting up a new object.** Idea: runs once when the object is made, to fill in its starting data. Needs: 3.2. Misconception: `__init__` creates the object. Story: unpacking a new box and labelling shelves. Exercises: fill the constructor; predict; find the missing assignment. Bridge: object construction, builders.

**3.4 Attributes and methods.** Idea: data a thing knows vs what it can do. Needs: 3.3. Misconception: attributes vs local variables. Story: the box has labelled slots (data) and buttons (methods). Exercises: sort into data/behaviour; add a method; predict. Bridge: entities vs behaviours in LLD.

**3.5 References: two names, one object.** Idea: `b = a` does not copy the object. Needs: 2.6, 3.4. Misconception: assignment copies. Story: two name tags tied to one box; mutate through one. Exercises: predict (diagram with arrows); fix by copying; `is` vs `==`. Bridge: shared state bugs in graphs and linked lists (the pointer idea).

**3.6 Instance vs class attributes.** Idea: data per object vs data shared by all. Needs: 3.4. Misconception: assigning through an instance changes the shared one; lookup order. Story: each member has a badge, one noticeboard for everyone; lookup walks instance -> class. Exercises: predict the lookup; find the shared-list bug; counter of instances. Bridge: static counters, caches, singletons (and why to avoid).

**3.7 Encapsulation: keeping data safe.** Idea: control how data is read and changed (properties, validation). Needs: 3.4. Misconception: underscore makes it private. Story: the box has a lid with a guard. Exercises: break the rule and fix it; add a property; predict. Bridge: invariants in LLD (a bank account cannot go negative).

**3.8 Inheritance: the family tree.** Idea: a child class gets the parent's attributes and methods. Needs: 3.4. Misconception: "is-a" vs copy-paste; deep trees. Story: a family tree of cast roles, the new role only adds what's different. Exercises: draw the tree; predict which method runs; add a subclass. Bridge: class hierarchies in LLD.

**3.9 Override and `super()`.** Idea: change a method in the child, reuse the parent's with `super()`. Needs: 3.8. Misconception: `super()` means "the parent object". Story: a role that does the standard greeting then adds its own line. Exercises: predict; fill `super().__init__`; fix a skipped parent init. Bridge: template method pattern.

**3.10 Polymorphism: same call, different behaviour.** Idea: send the same message to different objects. Needs: 3.9. Misconception: needs inheritance (duck typing says it does not). Story: Leela shouts "work!" and every cast member does their own thing. Exercises: predict the output of a loop over mixed objects; add a new type without touching the loop; spot duck typing. Bridge: strategy pattern; open/closed principle.

**3.11 Composition vs inheritance.** Idea: has-a is often better than is-a. Needs: 3.8, 3.10. Misconception: use inheritance to share code. Story: building a robot from parts (engine, arm) instead of a family tree. Exercises: "is-a or has-a?" sort; refactor a tree into parts; predict. Bridge: composition over inheritance in LLD; dependency injection.

**3.12 Dunder methods (`__str__`, `__eq__`, `__len__`).** Idea: make your objects work with `print`, `==`, `len`. Needs: 3.4. Misconception: dunders are called directly; `__str__` vs `__repr__`; define `__eq__` and hashing together. Story: teaching an object to answer the standard questions. Exercises: predict print; add `__eq__`; make `len(deck)` work. Bridge: Python data structure internals, custom keys in hash maps.

**3.13 Abstract classes and interfaces.** Idea: a class that says what must exist without saying how. Needs: 3.10. Misconception: you can use it directly; duck typing vs forced. Story: a contract that every role must sign before joining. Exercises: forget a method and read the error; complete the contract; predict. Bridge: interfaces in LLD, dependency inversion.

**3.14 When NOT to use a class.** Idea: a function or dict is often enough. Needs: 3.8-3.11. Misconception: everything should be a class (python-patterns' anti-patterns: God Object, Singleton, inheritance overuse). Story: the over-built machine vs a simple note. Exercises: simplify a class to a function; spot the God Object; choose between class and dict. Bridge: entry to LLD lessons (parking lot, vending machine, LRU cache in awesome-LLD are the next steps).

### Level 4 - Writing better code (15 lessons)

**4.1 Plan it before you code it (pseudocode).** Idea: write the steps in plain words, then code them. Needs: 2.1. Misconception: planning is a waste; start typing. Story: Leela sketches the route before the cast moves. Exercises: order the plan lines; pick the right plan of three; turn plan to code. Bridge: every DSA and LLD problem starts here.

**4.2 Exceptions: when things go wrong.** Idea: an error stops the program unless you choose what happens. Needs: 2.2. Misconception: syntax error = exception; `try` fixes things. Story: an alarm bell travelling up the stack until someone answers. Exercises: predict who catches it; catch the right error; fix a broad `except`. Bridge: error handling in system design (retries, timeouts).

**4.3 Raising and custom exceptions; `finally` and `with`.** Idea: signal your own problems; always clean up. Needs: 4.2. Misconception: `finally` only runs on error. Story: the door always gets locked, even when something broke. Exercises: predict order; write `raise`; wrap in `with`. Bridge: resource safety, locks.

**4.4 Files.** Idea: read and write data that outlives the program. Needs: 4.3. Misconception: forgetting to close; text vs bytes. Story: Leela's notebook. Exercises: predict; write then read back; fix a path error. Bridge: logs and persistence in system design.

**4.5 Modules and imports.** Idea: split code into files and reuse it. Needs: 2.1. Misconception: `import` runs the file; circular imports. Story: borrowing a tool from another room's toolbox. Exercises: predict import order; use a standard module; fix ImportError. Bridge: project structure, packages in LLD.

**4.6 Data structures in Python and JS (side by side).** Idea: list/dict/set/tuple vs array/object/Map/Set. Needs: L1. Misconception: JS object = dict in every way. Story: same shelf, two labelling systems. Exercises: translate Python to JS and back; pick the right structure; predict. Bridge: DSA data structures.

**4.7 Comprehensions.** Idea: build a collection in one readable line. Needs: L1 loops. Misconception: shorter is always better; side effects in comprehensions. Story: an assembly line stamping items. Exercises: rewrite loop to comprehension and back; filter; predict. Bridge: array transformations in DSA solutions.

**4.8 Iterators.** Idea: anything you can loop over hands out items one at a time. Needs: 4.7, 3.12. Misconception: iterable vs iterator. Story: a ticket dispenser. Exercises: predict `next()`; make a class iterable; find the exhausted-iterator bug. Bridge: iterating trees and graphs.

**4.9 Generators (`yield`).** Idea: a function that pauses and remembers its place. Needs: 4.8, 2.2. Misconception: runs immediately; reusable after one pass. Story: the stack plate that gets paused, not removed. Exercises: predict; turn a list builder into a generator; chain generators. Bridge: streaming, lazy evaluation, in-order traversal.

**4.10 Decorators.** Idea: wrap a function to add behaviour. Needs: 2.7, 2.8. Misconception: they change the function's body. Story: gift-wrapping a function. Exercises: predict; write a timing decorator; stack two. Bridge: caching (`lru_cache`) leading to memoization and DP.

**4.11 Type hints.** Idea: say what kind of value goes in and out. Needs: 2.1. Misconception: Python enforces them. Story: labels on boxes. Exercises: add hints; read a signature; find the wrong call. Bridge: interfaces and API contracts.

**4.12 Testing basics: checks that run themselves.** Idea: write down what the function should do as examples. Needs: 4.1. Misconception: tests are extra work; one test is enough. Story: a taste-tester at the pass. Exercises: write the assert; find the failing case; fix by test. Bridge: edge cases in DSA (empty, one element, duplicates).

**4.13 Testing: edge cases and test-first.** Idea: test the boundaries; write the test before the code. Needs: 4.12. Misconception: tests must cover only the happy path. Story: the tester brings awkward orders. Exercises: list the edge cases; write failing tests then pass them; spot the missing case. Bridge: thinking in constraints for interviews.

**4.14 Clean names and small functions.** Idea: names say what and why; one job each. Needs: 2.1. Misconception: short names are fine; comments replace names. Story: a labelled workshop vs a messy one. Exercises: rename; split a function; spot the flag parameter. Bridge: readable solutions in interviews.

**4.15 Clean code: no surprises (side effects, DRY, comments).** Idea: functions that do what their name says, nothing else. Needs: 4.14, 2.6. Misconception: duplicate code is harmless; commented-out code is safe. Story: a tidy-up day. Exercises: refactor before/after; find the hidden side effect; remove duplicates. Bridge: SOLID in LLD.

### Level 5 - Async (7 lessons)

**5.1 Why waiting matters (blocking).** Idea: some jobs are mostly waiting (network, disk, timers). Needs: 2.2. Misconception: slow = lots of calculating. Story: one waiter standing at the oven doing nothing. Exercises: sort into "calculate" vs "wait"; predict total time; spot a blocking call. Bridge: I/O latency in system design.

**5.2 The event loop: the waiter and the ticket queue.** Idea: one worker keeps a queue of tickets and takes the next ready one. Needs: 5.1. Misconception: async means another thread. Story: a kitchen with one waiter and a ticket rail. Exercises: step the queue; predict the order; find the stuck ticket. Bridge: Node, web servers, message queues.

**5.3 Callbacks to promises (JS).** Idea: "call me when done" became a promise object. Needs: 2.7, 5.2. Misconception: a promise is the value. Story: a pager given at the counter. Exercises: predict (JS-questions style); chain; fix a missing return. Bridge: API calls in system design.

**5.4 `async`/`await` (JS and Python asyncio).** Idea: write waiting code that reads top to bottom. Needs: 5.3. Misconception: `await` makes it faster; forgetting `await`. Story: the waiter says "I'll come back" and takes another table. Exercises: predict output order; add the missing await; convert promises to async. Bridge: async handlers.

**5.5 Tasks and `gather`: doing several waits at once.** Idea: start many waits, then collect. Needs: 5.4. Misconception: `await` in a loop runs them together. Story: five orders cooking at once. Exercises: time the sequential vs concurrent version; fix a loop; handle one failing. Bridge: fan-out/fan-in, parallel requests.

**5.6 Errors and timeouts in async code.** Idea: a failed wait must be caught where you await. Needs: 5.4, 4.2. Misconception: try/except around creation, not await; ignoring rejected promises. Story: a ticket comes back "out of stock". Exercises: predict; add a catch; add a timeout. Bridge: retries and timeouts in system design.

**5.7 Threads vs async vs processes.** Idea: concurrency (taking turns) vs parallelism (truly at once). Needs: 5.5. Misconception: async is parallel; threads are always better. Story: one waiter vs several waiters vs several kitchens. Exercises: choose the tool for each job; sort statements true/false; predict a shared-counter race. Bridge: concurrency lessons (race conditions, locks, producer-consumer) in LLD and system design.

### Totals
L2: 9, L3: 14, L4: 15, L5: 7 = 45 lessons. With L1 (25) the track is 70.

## Top findings
1. Python docs and the classes-first sources teach names/objects and scope BEFORE class syntax; YDKJS puts scope and closures before objects. We do closures in L2 before OOP.
2. `self` is confusing enough that W3Schools gives it its own page. It gets its own lesson (3.2), taught as an arrow.
3. Class attributes vs instance attributes with lookup order (arvimal) is the best-documented OOP trap; separate lesson (3.6).
4. "Inheritance overuse" and "God Object" appear as anti-patterns (python-patterns); composition-over-inheritance appears in clean-code-javascript. Hence 3.11 and 3.14.
5. Predict-the-output with hidden answers (javascript-questions) is the strongest format for async ordering and JS scope.
6. Tests-as-lesson (learn-python, Exercism, CS50P) matches our checked-exercise product; make tests a module.
7. Async sources open with *why*: blocking code, then promises, then async/await, then workers (MDN, W3Schools, frontarm). Add "why waiting matters" first.
8. "Async vs parallel" is a named sub-lesson in W3Schools and a topic in awesome-LLD: needs a dedicated late lesson (5.7).
9. awesome-LLD gives the hand-off from OOP to LLD (relationships -> SOLID -> patterns -> problems) and a 5-step "answer an LLD problem" routine that doubles as our plan-first routine.
10. Licences to avoid reusing: YDKJS (CC BY-NC-ND), awesome-LLD (GPL-3.0), Deepali repo (all rights reserved), python-mastery (CC BY-SA, share-alike). All content is our own writing anyway.
