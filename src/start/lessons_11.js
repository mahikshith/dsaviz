// Level 4, lessons 5 to 8: when things go wrong (try and except), raising your own errors and finally, checks that run
// themselves, and awkward inputs with test-first. Still the school shop. Every word is our own.

// ---------- L4.5 When things go wrong ----------
const ST405_CODE = {
  py: ['def read_age(text):', '    try:', '        return int(text)', '    except ValueError:', '        return -1', 'print(read_age("12"))', 'print(read_age("twelve"))'],
  js: ['function read_age(text) {', '  try {', '    return JSON.parse(text); }', '  catch (problem) {', '    return -1; } }', 'console.log(read_age("12"));', 'console.log(read_age("twelve"));']
};
function st405Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const pile = (frames, lit) => stScene(stPlates(frames, 40, 340, { w: 230 }), lit ? { boxes: [] } : null);
  const alarm = (x, y, text) => l4Chip('alarm', x, y, text || 'ValueError', { c: 'bad', solid: false });
  return [
    stBeat('dot', 'My program asks for an age. Someone types the word twelve. The program stops with an error message!', stScene(cast, st1Screen(120, 140, 400, ['ValueError: invalid literal', 'for int(): twelve'], 100), l4Say('s1', 320, 270, 'the program crashed')), ['screen', 'cast:dot']),
    stBeat('hoot', 'Python raised an exception. That is an alarm that says something went wrong. It stops the program unless someone answers.', stScene(cast, pile(['main program', 'read_age()']), alarm(450, 220)), ['plate1', 'alarm'], 2),
    stBeat('hoot', 'The alarm leaves the function that failed. Then it travels down the pile of plates, one call at a time.', stScene(cast, pile(['main program', 'show_age()', 'read_age()']), alarm(450, 210), l4Arrow('ar', [400, 238], [400, 290]), l4Say('s1', 450, 330, 'looking for an answer')), ['plate2', 'alarm']),
    stBeat('hoot', 'A try block says: I will answer an alarm. except ValueError: names the alarm it answers.', stScene(cast, st1Card('code', 130, 130, 380, ST405_CODE.py.slice(1, 5), [0, 2])), ['code'], [1, 3]),
    stBeat('hoot', 'Lines inside try run as normal. If an alarm rings, Python jumps straight to the matching except lines.', stScene(cast, st1Card('code', 130, 130, 380, ST405_CODE.py.slice(1, 5), [1, 2]), alarm(320, 300)), ['code', 'alarm'], [2, 3]),
    stBeat('dot', 'So try fixes the error?', stScene(cast, l4Chip('q', 320, 200, 'try = fix?')), ['q', 'cast:dot']),
    stBeat('hoot', 'No. try only chooses what happens next. Here we hand back -1, and the program carries on.', stScene(cast, st1Screen(150, 150, 340, ['12', '-1'], 100)), ['screen'], [4, 5, 6]),
    stBeat('hoot', 'Name the alarm you expect. A bare except answers every alarm, even a typo, and hides real bugs.', stScene(cast, l4Chip('ok', 200, 190, 'except ValueError', { solid: true }), l4Chip('no', 450, 190, 'except (anything)', { c: 'bad', dash: true }), l4Say('s1', 200, 240, 'only the one you expect'), l4Say('s2', 450, 240, 'hides real bugs')), ['ok', 'no']),
    stBeat('bolt', 'If nobody answers, I stop and print the error. That is the error message you learned to read in Level 1.', stScene(cast, pile(['main program', 'read_age()']), alarm(450, 250, 'no answer')), ['alarm', 'cast:bolt'])
  ];
}
START_LESSON('exceptions', {
  code: ST405_CODE, story: st405Story(),
  watch: { code: 'def read_age(text):\n    return int(text)\n\ndef show_age(text):\n    try:\n        age = read_age(text)\n        print("age", age)\n    except ValueError:\n        print("not a number:", text)\n\nshow_age("12")\nshow_age("twelve")\nprint("done")\n' },
  tryit: { py: 'def read_age(text):\n    try:\n        return int(text)\n    except ValueError:\n        return -1\n\nprint(read_age("12"))\nprint(read_age("twelve"))\nprint(read_age(""))\n',
    js: 'function read_age(text) {\n  try {\n    return JSON.parse(text);\n  } catch (problem) {\n    return -1;\n  }\n}\n\nconsole.log(read_age("12"));\nconsole.log(read_age("twelve"));\nconsole.log(read_age(""));\n',
    goals: ['Press Run.', 'Change the fallback from -1 to 0.', 'Remove the try and except. Run it again and read the error.'] },
  check: { q: 'A function raises a ValueError. Its caller has try and except ValueError. What happens?', choices: [['The except lines run and the program carries on', true, 'Right. The alarm reaches the except that answers it.'], ['The program always stops', false, 'It stops only when nobody answers the alarm.'], ['Python fixes the value and retries', false, 'Python never fixes or retries. You choose what happens in except.'], ['The except lines are skipped', false, 'They run, because the alarm named ValueError rang.']] }
});

// ---------- L4.6 Raising your own errors ----------
const ST406_CODE = {
  py: ['def withdraw(balance, amount):', '    if amount > balance:', '        raise ValueError("not enough money")', '    return balance - amount', 'try:', '    print(withdraw(10, 25))', 'except ValueError as problem:', '    print("Stopped:", problem)', 'finally:', '    print("Door locked")'],
  js: ['function withdraw(balance, amount) {', '  if (amount > balance) {', '    throw new Error("not enough money"); }', '  return balance - amount; }', 'try {', '  console.log(withdraw(10, 25)); }', 'catch (problem) {', '  console.log("Stopped:", problem.message); }', 'finally {', '  console.log("Door locked"); }']
};
function st406Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const card = (lines, cur, x, y, w) => st1Card('code', x || 100, y || 130, w || 440, lines, cur);
  return [
    stBeat('dot', 'Python raises alarms for its own problems. What if my code finds a problem, like taking out more money than there is?', stScene(cast, l4Jar('bal', 245, 150, '10', 'balance'), l4Say('s1', 320, 262, 'withdraw 25?')), ['bal', 'cast:dot']),
    stBeat('hoot', 'Ring the alarm yourself with raise. Give it a kind and a message: raise ValueError("not enough money").', stScene(cast, card(ST406_CODE.py.slice(0, 4), [2])), ['code'], 2),
    stBeat('hoot', 'raise stops the function at once. The line after it never runs. The alarm travels to whoever has a matching except.', stScene(cast, card(ST406_CODE.py.slice(0, 4), [2]), l4Chip('al', 320, 290, 'ValueError: not enough money', { c: 'bad' })), ['code', 'al'], [2, 3]),
    stBeat('hoot', 'except ValueError as problem catches it. The name problem holds the alarm, so print(problem) shows its message.', stScene(cast, card(ST406_CODE.py.slice(4, 8), [2, 3]), st1Screen(100, 270, 440, ['Stopped: not enough money'], 70)), ['code', 'screen'], [6, 7]),
    stBeat('dot', 'What if I opened a door, a file or a till first? An error might skip the lines that close it.', stScene(cast, l4Chip('d', 320, 190, 'open', { solid: true }), l4Chip('d2', 320, 250, 'close?', { dash: true }), l4Arrow('ar', [320, 208], [320, 232], { dash: true })), ['d2', 'cast:dot']),
    stBeat('hoot', 'Add finally. Its lines run every time: after success, after a caught alarm, or when the alarm is still travelling.', stScene(cast, card(ST406_CODE.py.slice(4, 10), [4, 5], 100, 130, 440)), ['code'], [8, 9]),
    stBeat('hoot', 'Think of locking a door at closing time. It gets locked whether the day went well or badly.', stScene(cast, l4Chip('o', 150, 190, 'good day'), l4Chip('b', 320, 190, 'bad day'), l4Chip('l', 490, 190, 'door locked', { solid: true }), l4Arrow('a1', [196, 208], [450, 230]), l4Arrow('a2', [320, 212], [430, 230])), ['o', 'b', 'l'], 9),
    stBeat('hoot', 'So finally does not mean only on error. It means always. Use it for clean-up, such as closing a file.', stScene(cast, l4Chip('f', 320, 200, 'finally = always', { solid: true })), ['f']),
    stBeat('dot', 'I will raise an error when a rule is broken, and use finally for clean-up.', stScene(cast, card(ST406_CODE.py.slice(4, 10), [1, 5], 100, 130, 440)), ['code', 'cast:dot'], [2, 9])
  ];
}
START_LESSON('raise', {
  code: ST406_CODE, story: st406Story(),
  watch: { code: 'def withdraw(balance, amount):\n    if amount > balance:\n        raise ValueError("not enough money")\n    return balance - amount\n\ndef try_withdraw(balance, amount):\n    try:\n        print("left", withdraw(balance, amount))\n    except ValueError as problem:\n        print("Stopped:", problem)\n    finally:\n        print("Door locked")\n\ntry_withdraw(30, 10)\ntry_withdraw(10, 25)\n' },
  tryit: { py: 'def withdraw(balance, amount):\n    if amount > balance:\n        raise ValueError("not enough money")\n    return balance - amount\n\ntry:\n    print(withdraw(10, 25))\nexcept ValueError as problem:\n    print("Stopped:", problem)\nfinally:\n    print("Door locked")\n',
    js: 'function withdraw(balance, amount) {\n  if (amount > balance) {\n    throw new Error("not enough money");\n  }\n  return balance - amount;\n}\n\ntry {\n  console.log(withdraw(10, 25));\n} catch (problem) {\n  console.log("Stopped:", problem.message);\n} finally {\n  console.log("Door locked");\n}\n',
    goals: ['Press Run.', 'Change 25 to 5. Which lines run now?', 'Add a rule: raise an error if amount is below 0.'] },
  check: { q: 'When does the finally block run?', choices: [['Every time, whether or not there was an error', true, 'Right. That is why it is used for clean-up.'], ['Only when there is an error', false, 'It also runs when everything goes well.'], ['Only when there is no error', false, 'It also runs when an alarm rings.'], ['Never, unless you call it', false, 'Python runs it for you, every time.']] }
});

// ---------- L4.7 Checks that run themselves ----------
const ST407_CODE = {
  py: ['def double(n):', '    return n * n', 'def check(name, got, want):', '    if got == want:', '        print("pass", name)', '    else:', '        print("FAIL", name)', 'check("two", double(2), 4)', 'check("zero", double(0), 0)', 'check("negative", double(-3), -6)'],
  js: ['function double(n) {', '  return n * n; }', 'function check(name, got, want) {', '  if (got === want) {', '    console.log("pass", name); }', '  else {', '    console.log("FAIL", name); } }', 'check("two", double(2), 4);', 'check("zero", double(0), 0);', 'check("negative", double(-3), -6);']
};
function st407Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const rows = (items) => ({ tokens: items.map(([id, text, solid, c], i) => ({ id, x: 320, y: 150 + i * 56, text, w: 340, solid: !!solid, c })) });
  return [
    stBeat('dot', 'I wrote double and tried it once by hand. It looked fine. How do I know it is right?', stScene(cast, st1Card('code', 150, 140, 340, ST407_CODE.py.slice(0, 2), [])), ['code', 'cast:dot'], [0, 1]),
    stBeat('hoot', 'Write a check. A check calls your function with an input you know, and compares the answer to the one you expect.', stScene(cast, st1Card('code', 90, 140, 460, [ST407_CODE.py[7]], [0]), l4Say('s1', 320, 230, 'input 2, expect 4')), ['code'], 7),
    stBeat('hoot', 'check compares got with want. If they match it prints pass. If not it prints FAIL and the name of the check.', stScene(cast, st1Card('code', 100, 130, 440, ST407_CODE.py.slice(2, 7), [1, 2, 4])), ['code'], [3, 4, 5, 6]),
    stBeat('hoot', 'Run the first check. double(2) gives 4. The answer matches, so it prints pass two.', stScene(cast, rows([['r1', 'pass two', true], ['r2', '...'], ['r3', '...']])), ['r1'], 7),
    stBeat('hoot', 'The second check also passes. But look at the code: n * n. It squares, it does not double!', stScene(cast, rows([['r1', 'pass two', true], ['r2', 'pass zero', true], ['r3', '...']])), ['r2'], 8),
    stBeat('hoot', 'The third check uses -3. The answer is 9, but we wanted -6. It prints FAIL negative. Now we know where to look.', stScene(cast, rows([['r1', 'pass two', true], ['r2', 'pass zero', true], ['r3', 'FAIL negative', false, 'bad']])), ['r3'], 9),
    stBeat('dot', 'The bug passed two checks! It only showed up on the third.', stScene(cast, rows([['r1', 'pass two', true], ['r2', 'pass zero', true], ['r3', 'FAIL negative', false, 'bad']])), ['r1', 'r2', 'cast:dot']),
    stBeat('hoot', 'That is why one passing check proves little. Write many, and run them all after every change.', stScene(cast, l4Chip('m', 320, 200, 'many checks, run often', { solid: true })), ['m']),
    stBeat('hoot', 'Python has a short form: assert double(-3) == -6. It stays quiet when true and raises an AssertionError when false.', stScene(cast, st1Card('as', 90, 150, 460, ['assert double(-3) == -6'], []), l4Say('s1', 320, 240, 'quiet if true, an error if false')), ['as'])
  ];
}
START_LESSON('tests', {
  code: ST407_CODE, story: st407Story(),
  watch: { code: 'def double(n):\n    return n * n\n\ndef check(name, got, want):\n    if got == want:\n        print("pass", name)\n    else:\n        print("FAIL", name)\n\ncheck("two", double(2), 4)\ncheck("zero", double(0), 0)\ncheck("negative", double(-3), -6)\n' },
  tryit: { py: 'def double(n):\n    return n * n\n\ndef check(name, got, want):\n    if got == want:\n        print("pass", name)\n    else:\n        print("FAIL", name)\n\ncheck("two", double(2), 4)\ncheck("zero", double(0), 0)\ncheck("negative", double(-3), -6)\ncheck("ten", double(10), 20)\n',
    js: 'function double(n) {\n  return n * n;\n}\n\nfunction check(name, got, want) {\n  if (got === want) {\n    console.log("pass", name);\n  } else {\n    console.log("FAIL", name);\n  }\n}\n\ncheck("two", double(2), 4);\ncheck("zero", double(0), 0);\ncheck("negative", double(-3), -6);\ncheck("ten", double(10), 20);\n',
    goals: ['Press Run and find the checks that fail.', 'Fix double so every check passes.', 'Add a check of your own with a negative number.'] },
  check: { q: 'double(2) gives 4 and the check passes. Does that prove double is right?', choices: [['No. More checks may find a bug that this one misses', true, 'Right. One case can pass by luck. Try different inputs.'], ['Yes. A passing check means no bugs', false, 'The bug above passed two checks before it failed on the third.'], ['Yes, if the answer is a whole number', false, 'Whole numbers can still be wrong. Try more inputs.'], ['No, because checks never pass', false, 'Checks do pass. They just need to cover many cases.']] }
});

// ---------- L4.8 Awkward inputs and test-first ----------
const ST408_CODE = {
  py: ['def biggest(numbers):', '    best = 0', '    for n in numbers:', '        if n > best:', '            best = n', '    return best', 'check("normal", biggest([3, 9, 4]), 9)', 'check("one", biggest([7]), 7)', 'check("empty", biggest([]), 0)', 'check("negatives", biggest([-5, -2]), -2)'],
  js: ['function biggest(numbers) {', '  let best = 0;', '  for (let n of numbers) {', '    if (n > best) {', '      best = n; } }', '  return best; }', 'check("normal", biggest([3, 9, 4]), 9);', 'check("one", biggest([7]), 7);', 'check("empty", biggest([]), 0);', 'check("negatives", biggest([-5, -2]), -2);']
};
function st408Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const list = (id, y, vals, o) => ({ tokens: vals.map((v, i) => Object.assign({ id: id + i, x: 320 + (i - (vals.length - 1) / 2) * 76, y, text: String(v), w: 60 }, o || {})) });
  return [
    stBeat('dot', 'My biggest function passed three checks with ordinary lists. Is it finished?', stScene(cast, list('n', 170, [3, 9, 4]), l4Say('s1', 320, 220, 'a normal list')), ['n0', 'n1', 'cast:dot'], [6, 7]),
    stBeat('hoot', 'Not yet. The bugs hide at the edges. Test the awkward inputs: an empty list, one item, negatives, and ties.', stScene(cast, l4Chip('e1', 150, 170, 'empty'), l4Chip('e2', 270, 170, 'one item'), l4Chip('e3', 400, 170, 'negatives'), l4Chip('e4', 520, 170, 'ties')), ['e1', 'e2', 'e3', 'e4']),
    stBeat('hoot', 'Picture a shop. The easy customer buys three apples. The awkward one wants nothing, or a refund.', stScene(cast, l4Chip('c1', 190, 190, 'three apples'), l4Chip('c2', 450, 190, 'a refund', { c: 'bad' })), ['c2']),
    stBeat('hoot', 'We decide that biggest of an empty list is 0. The check for the empty list passes. So does one item.', stScene(cast, list('p', 170, ['normal', 'one', 'empty'], { w: 110, solid: true }), l4Say('s1', 320, 225, 'pass pass pass')), ['p0', 'p1', 'p2'], [8]),
    stBeat('hoot', 'Now the negatives check. biggest of -5 and -2 should be -2. But best starts at 0, and nothing is above 0.', stScene(cast, list('q', 170, [-5, -2]), l4Jar('bst', 245, 230, '0', 'best', { c: 'bad' }), l4Say('s1', 480, 275, 'never beaten')), ['bst'], [1, 3]),
    stBeat('hoot', 'The check prints FAIL negatives. Without this awkward check, the bug would reach a real user.', stScene(cast, l4Chip('f', 320, 200, 'FAIL negatives', { c: 'bad' })), ['f'], 9),
    stBeat('hoot', 'A fix: start best at the first number, numbers[0], and guard the empty list with an if.', stScene(cast, st1Card('fix', 100, 140, 440, ['if len(numbers) == 0:', '    return 0', 'best = numbers[0]'], [2])), ['fix']),
    stBeat('dot', 'Could I write the checks before the code?', stScene(cast, l4Chip('t', 320, 200, 'checks first?')), ['t', 'cast:dot']),
    stBeat('hoot', 'Yes, and it is a good habit. That is called test-first. Write a check, watch it fail, then write code until it passes.', stScene(cast, l4Chip('a', 150, 190, 'check fails'), l4Chip('b', 320, 190, 'write code'), l4Chip('c', 490, 190, 'check passes', { solid: true }), l4Arrow('x', [210, 190], [262, 190]), l4Arrow('y', [380, 190], [432, 190])), ['a', 'b', 'c']),
    stBeat('bolt', 'I run what you wrote. Good checks tell you what to write next, and tell you when you are done.', stScene(cast, l4Chip('d', 320, 200, 'checks are your guide', { solid: true })), ['d', 'cast:bolt'])
  ];
}
START_LESSON('edge-tests', {
  code: ST408_CODE, story: st408Story(),
  watch: { code: 'def check(name, got, want):\n    if got == want:\n        print("pass", name)\n    else:\n        print("FAIL", name)\n\ndef biggest(numbers):\n    best = 0\n    for n in numbers:\n        if n > best:\n            best = n\n    return best\n\ncheck("normal", biggest([3, 9, 4]), 9)\ncheck("one", biggest([7]), 7)\ncheck("empty", biggest([]), 0)\ncheck("negatives", biggest([-5, -2]), -2)\n' },
  tryit: { py: 'def check(name, got, want):\n    if got == want:\n        print("pass", name)\n    else:\n        print("FAIL", name)\n\ndef biggest(numbers):\n    best = 0\n    for n in numbers:\n        if n > best:\n            best = n\n    return best\n\ncheck("normal", biggest([3, 9, 4]), 9)\ncheck("one", biggest([7]), 7)\ncheck("empty", biggest([]), 0)\ncheck("negatives", biggest([-5, -2]), -2)\ncheck("tie", biggest([4, 4]), 4)\n',
    js: 'function check(name, got, want) {\n  if (got === want) {\n    console.log("pass", name);\n  } else {\n    console.log("FAIL", name);\n  }\n}\n\nfunction biggest(numbers) {\n  let best = 0;\n  for (let n of numbers) {\n    if (n > best) {\n      best = n;\n    }\n  }\n  return best;\n}\n\ncheck("normal", biggest([3, 9, 4]), 9);\ncheck("one", biggest([7]), 7);\ncheck("empty", biggest([]), 0);\ncheck("negatives", biggest([-5, -2]), -2);\ncheck("tie", biggest([4, 4]), 4);\n',
    goals: ['Press Run and find the failing check.', 'Fix biggest so best starts at numbers[0]. Keep the empty case working.', 'Add a check for a list with a zero in it.'] },
  check: { q: 'Which input is the best edge case to check for a function that finds the biggest number?', choices: [['An empty list', true, 'Right. Empty, one item and negatives are where bugs hide.'], ['A list of three small numbers', false, 'That is an ordinary case. Try something awkward.'], ['The list [1, 2, 3]', false, 'Sorted lists are easy. Edge cases are unusual lists.'], ['A list you already tested', false, 'A repeat finds nothing new.']] }
});
