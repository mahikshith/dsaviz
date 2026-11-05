// Level 5, lessons 5 to 8: doing several waits at once, errors and timeouts, trying again, and turns versus working at once.
// Still the kitchen with one waiter, with a pretend clock counted in ticks. Every word is our own.

// ---------- L5.5 Doing several waits at once ----------
const ST505_REAL = ['async def main():', '    results = await asyncio.gather(', '        soup(), bread(), cake())', '    print(results)', 'asyncio.run(main())'];
const ST505_CODE = {
  py: ['def one_by_one(waits):', '    total = 0', '    for w in waits:', '        total = total + w', '    return total', 'def together(waits):', '    longest = 0', '    for w in waits:', '        if w > longest:', '            longest = w', '    return longest', 'waits = [3, 2, 4]', 'print("one by one:", one_by_one(waits))', 'print("together:", together(waits))'],
  js: ['function one_by_one(waits) {', '  let total = 0;', '  for (let w of waits) {', '    total = total + w; }', '  return total; }', 'function together(waits) {', '  let longest = 0;', '  for (let w of waits) {', '    if (w > longest) {', '      longest = w; } }', '  return longest; }', 'let waits = [3, 2, 4];', 'console.log("one by one:", one_by_one(waits));', 'console.log("together:", together(waits));']
};
function st505Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const seq = l5Timeline([{ id: 'soup', name: 'soup', from: 0, to: 3, y: 130, text: '3', solid: true }, { id: 'bread', name: 'bread', from: 3, to: 5, y: 180, text: '2' }, { id: 'cake', name: 'cake', from: 5, to: 9, y: 230, text: '4' }], 9, { S: 48, x0: 110 });
  const par = l5Timeline([{ id: 'soup', name: 'soup', from: 0, to: 3, y: 130, text: '3' }, { id: 'bread', name: 'bread', from: 0, to: 2, y: 180, text: '2' }, { id: 'cake', name: 'cake', from: 0, to: 4, y: 230, text: '4', solid: true }], 9, { S: 48, x0: 110 });
  return [
    stBeat('dot', 'Three dishes need 3, 2 and 4 ticks. If I wait for each one in turn, how long does the whole meal take?', stScene(cast, seq), ['soup', 'bread', 'cake', 'cast:dot']),
    stBeat('hoot', 'When each wait ends before the next begins, the times add up. 3 + 2 + 4 is 9 ticks.', stScene(cast, seq), ['soup', 'bread', 'cake'], [0, 1, 2, 3, 4]),
    stBeat('hoot', 'A loop that waits on each dish, one after another, does exactly this. Each wait finishes before the loop moves on.', stScene(cast, seq, l4Say('s1', 320, 335, 'one after another: 9 ticks')), ['cake']),
    stBeat('dot', 'But the oven can cook all three at the same time! Why wait in a row?', stScene(cast, seq), ['soup', 'bread', 'cake', 'cast:dot']),
    stBeat('hoot', 'Start all the waits first, then collect the answers. Python\'s async toolbox, called asyncio, has a tool for this: gather.', l5Real(cast, ST505_REAL, [1, 2], 460), ['real']),
    stBeat('hoot', 'The functions soup(), bread() and cake() wait 3, 2 and 4 real seconds. Then gather runs all three, so main takes 4.', l5Real(cast, ST505_REAL, [0, 4], 460), ['real']),
    stBeat('hoot', 'Now all three bars start at tick 0. The meal is done when the slowest dish is done: tick 4.', stScene(cast, par), ['cake'], [5, 6, 7, 8, 9, 10]),
    stBeat('hoot', 'These sums use a pretend clock of ticks, so every step shows and it runs the same everywhere. Real gather waits real seconds.', l5Pretend(cast, 'sums with ticks', 'gather with seconds'), ['pc', 'rc']),
    stBeat('hoot', 'one_by_one adds the waits. together keeps the longest wait. 9 ticks against 4 saves 5 ticks.', stScene(cast, st1Screen(120, 140, 400, ['one by one: 9', 'together: 4'], 100)), ['screen'], [12, 13]),
    stBeat('hoot', 'gather also gives you the answers in the order you asked. It does not matter which dish finished first.', stScene(cast, l4Chip('r1', 190, 190, 'soup answer', { solid: true }), l4Chip('r2', 320, 190, 'bread answer'), l4Chip('r3', 450, 190, 'cake answer'), l4Say('s1', 320, 240, 'same order as the list')), ['r1', 'r2', 'r3']),
    stBeat('dot', 'Start all the waits, then collect. One slow dish no longer slows down the others.', stScene(cast, par), ['cake', 'cast:dot'])
  ];
}
START_LESSON('gather', {
  code: ST505_CODE, story: st505Story(),
  watch: { code: 'def one_by_one(waits):\n    total = 0\n    for w in waits:\n        total = total + w\n    return total\n\ndef together(waits):\n    longest = 0\n    for w in waits:\n        if w > longest:\n            longest = w\n    return longest\n\nwaits = [3, 2, 4]\nprint("one by one:", one_by_one(waits))\nprint("together:", together(waits))\n' },
  tryit: { py: 'def one_by_one(waits):\n    total = 0\n    for w in waits:\n        total = total + w\n    return total\n\ndef together(waits):\n    longest = 0\n    for w in waits:\n        if w > longest:\n            longest = w\n    return longest\n\nwaits = [3, 2, 4]\nprint("one by one:", one_by_one(waits))\nprint("together:", together(waits))\n',
    js: 'function one_by_one(waits) {\n  let total = 0;\n  for (let w of waits) {\n    total = total + w;\n  }\n  return total;\n}\n\nfunction together(waits) {\n  let longest = 0;\n  for (let w of waits) {\n    if (w > longest) {\n      longest = w;\n    }\n  }\n  return longest;\n}\n\nlet waits = [3, 2, 4];\nconsole.log("one by one:", one_by_one(waits));\nconsole.log("together:", together(waits));\n',
    goals: ['Press Run.', 'Change waits to [5, 1, 1, 1]. Which way saves more time?', 'Try an empty list: waits = []. What do both functions give?'] },
  check: { q: 'Three waits of 3, 2 and 4 ticks run together. How long until all are done?', choices: [['4 ticks', true, 'Right. Together, the meal is done when the slowest wait ends.'], ['9 ticks', false, 'That is the total when they run one after another.'], ['3 ticks', false, 'The 4 tick wait is still running at tick 3.'], ['2 ticks', false, 'That is the shortest wait. The slowest one decides.']] }
});

// ---------- L5.6 Errors and timeouts ----------
const ST506_REAL = ['try:', '    await asyncio.wait_for(cake(), timeout=4)', 'except asyncio.TimeoutError:', '    print("cake failed: took too long")'];
const ST506_CODE = {
  py: ['def run_job(job, limit):', '    if job["fails"]:', '        raise ValueError("out of stock")', '    if job["ticks"] > limit:', '        raise ValueError("took too long")', '    return job["dish"] + " is ready"', 'def run_all(jobs, limit):', '    for job in jobs:', '        try:', '            print(run_job(job, limit))', '        except ValueError as problem:', '            print(job["dish"], "failed:", problem)', 'jobs = [{"dish": "soup", "ticks": 2, "fails": False},', '        {"dish": "fish", "ticks": 1, "fails": True},', '        {"dish": "cake", "ticks": 9, "fails": False}]', 'run_all(jobs, 4)'],
  js: ['function run_job(job, limit) {', '  if (job.fails) {', '    throw new Error("out of stock"); }', '  if (job.ticks > limit) {', '    throw new Error("took too long"); }', '  return job.dish + " is ready"; }', 'function run_all(jobs, limit) {', '  for (let job of jobs) {', '    try {', '      console.log(run_job(job, limit)); }', '    catch (problem) {', '      console.log(job.dish, "failed:", problem.message); } } }', 'let jobs = [{ dish: "soup", ticks: 2, fails: false },', '  { dish: "fish", ticks: 1, fails: true },', '  { dish: "cake", ticks: 9, fails: false }];', 'run_all(jobs, 4);']
};
function st506Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const trio = (a, b, c) => ({ tokens: [{ id: 'a', x: 130, y: 190, text: a[0], w: 150, solid: a[1] === 'ok', c: a[1] === 'bad' ? 'bad' : undefined }, { id: 'b', x: 320, y: 190, text: b[0], w: 150, solid: b[1] === 'ok', c: b[1] === 'bad' ? 'bad' : undefined }, { id: 'c', x: 510, y: 190, text: c[0], w: 150, solid: c[1] === 'ok', c: c[1] === 'bad' ? 'bad' : undefined }] });
  return [
    stBeat('dot', 'The fish is sold out, and the cake would take forever. Should one problem spoil the whole evening?', stScene(cast, trio(['soup', ''], ['fish', ''], ['cake', ''])), ['a', 'b', 'c', 'cast:dot']),
    stBeat('hoot', 'No. Real jobs fail or run slowly all the time, such as a network that drops. Code must expect that.', stScene(cast, trio(['soup: fine', 'ok'], ['fish: fails', 'bad'], ['cake: slow', 'bad'])), ['b', 'c']),
    stBeat('hoot', 'A failing job raises an alarm, as you saw in Level 4. Here run_job raises ValueError("out of stock") for the fish.', stScene(cast, st1Card('code', 40, 140, 560, ST506_CODE.py.slice(0, 3), [1, 2])), ['code'], [1, 2]),
    stBeat('hoot', 'Catch the alarm right where you wait for the job. Here the try is inside the loop, so each job gets its own try.', stScene(cast, st1Card('code', 40, 140, 560, ST506_CODE.py.slice(7, 12), [1, 2, 3, 4])), ['code'], [7, 8, 9, 10, 11]),
    stBeat('hoot', 'Soup is fine. The fish raises its alarm and the except prints it. The loop then carries on with the cake.', stScene(cast, st1Screen(120, 140, 400, ['soup is ready', 'fish failed: out of stock'], 100)), ['screen'], [10, 11]),
    stBeat('hoot', 'A timeout is a time limit. If a job needs more ticks than the limit, we stop waiting for it and call it failed.', stScene(cast, st1Card('code', 40, 150, 560, ST506_CODE.py.slice(3, 5), [0, 1])), ['code'], [3, 4]),
    stBeat('hoot', 'The cake needs 9 ticks and the limit is 4, so run_job raises took too long.', stScene(cast, st1Screen(120, 140, 400, ['soup is ready', 'fish failed: out of stock', 'cake failed: took too long'], 130)), ['screen'], [3, 4, 15]),
    stBeat('hoot', 'run_job uses a pretend clock: it compares ticks with the limit. That runs the same everywhere and shows each step.', l5Pretend(cast, 'compare ticks to the limit', 'watch a real clock'), ['pc', 'rc']),
    stBeat('hoot', 'In real asyncio, wait_for stops waiting after 4 real seconds. It raises TimeoutError, and you catch it with except.', l5Real(cast, ST506_REAL, [1, 2], 540), ['real']),
    stBeat('dot', 'What if I put the try around the whole loop instead?', stScene(cast, l4Chip('w', 320, 200, 'try around the loop?')), ['w', 'cast:dot']),
    stBeat('hoot', 'Then the fish would end the loop at once, and the cake would never get a try. Keep the try close to the one wait.', stScene(cast, trio(['soup: done', 'ok'], ['fish: stops all', 'bad'], ['cake: never tried', ''])), ['b', 'c'])
  ];
}
const ST506_JOBS_PY = 'jobs = [{"dish": "soup", "ticks": 2, "fails": False},\n        {"dish": "fish", "ticks": 1, "fails": True},\n        {"dish": "cake", "ticks": 9, "fails": False}]\n';
START_LESSON('timeouts', {
  code: ST506_CODE, story: st506Story(),
  watch: { code: 'def run_job(job, limit):\n    if job["fails"]:\n        raise ValueError("out of stock")\n    if job["ticks"] > limit:\n        raise ValueError("took too long")\n    return job["dish"] + " is ready"\n\ndef run_all(jobs, limit):\n    for job in jobs:\n        try:\n            print(run_job(job, limit))\n        except ValueError as problem:\n            print(job["dish"], "failed:", problem)\n\n' + ST506_JOBS_PY + 'run_all(jobs, 4)\n' },
  tryit: { py: 'def run_job(job, limit):\n    if job["fails"]:\n        raise ValueError("out of stock")\n    if job["ticks"] > limit:\n        raise ValueError("took too long")\n    return job["dish"] + " is ready"\n\ndef run_all(jobs, limit):\n    for job in jobs:\n        try:\n            print(run_job(job, limit))\n        except ValueError as problem:\n            print(job["dish"], "failed:", problem)\n\n' + ST506_JOBS_PY + 'run_all(jobs, 4)\n',
    js: 'function run_job(job, limit) {\n  if (job.fails) {\n    throw new Error("out of stock");\n  }\n  if (job.ticks > limit) {\n    throw new Error("took too long");\n  }\n  return job.dish + " is ready";\n}\n\nfunction run_all(jobs, limit) {\n  for (let job of jobs) {\n    try {\n      console.log(run_job(job, limit));\n    } catch (problem) {\n      console.log(job.dish, "failed:", problem.message);\n    }\n  }\n}\n\nlet jobs = [{ dish: "soup", ticks: 2, fails: false },\n  { dish: "fish", ticks: 1, fails: true },\n  { dish: "cake", ticks: 9, fails: false }];\nrun_all(jobs, 4);\n',
    goals: ['Press Run.', 'Raise the limit to 10. Which dishes finish now?', 'Move the try outside the loop. What changes?'] },
  check: { q: 'Where should the try go so one failed job does not stop the others?', choices: [['Inside the loop, around each wait', true, 'Right. Each job then has its own safety net.'], ['Around the whole loop', false, 'The first failure would end the loop and skip the rest.'], ['Only at the very top of the program', false, 'That would stop everything at the first failure.'], ['Nowhere. Failures fix themselves', false, 'Failures need an answer, or the program stops.']] }
});

// ---------- L5.7 Try again, but wait longer ----------
const ST507_REAL = ['except ValueError:', '    await asyncio.sleep(wait)', '    wait = wait * 2'];
const ST507_CODE = {
  py: ['def flaky(attempt):', '    if attempt < 3:', '        raise ValueError("busy")', '    return "ok"', 'def try_again(max_tries):', '    wait = 1', '    for attempt in range(1, max_tries + 1):', '        try:', '            print("try", attempt, flaky(attempt))', '            return attempt', '        except ValueError:', '            print("try", attempt, "busy, waiting", wait)', '            wait = wait * 2', '    return -1', 'print(try_again(4))'],
  js: ['function flaky(attempt) {', '  if (attempt < 3) {', '    throw new Error("busy"); }', '  return "ok"; }', 'function try_again(max_tries) {', '  let wait = 1;', '  for (let attempt = 1; attempt <= max_tries; attempt++) {', '    try {', '      console.log("try", attempt, flaky(attempt));', '      return attempt; }', '    catch (problem) {', '      console.log("try", attempt, "busy, waiting", wait);', '      wait = wait * 2; } }', '  return -1; }', 'console.log(try_again(4));']
};
function st507Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const line = (rows) => l5Timeline(rows, 6, { S: 66, x0: 110, base: 290 });
  const t1 = { id: 't1', name: 'try 1', from: 0, to: 1, y: 140, text: 'busy', c: 'bad' };
  const t2 = { id: 't2', name: 'try 2', from: 2, to: 3, y: 190, text: 'busy', c: 'bad' };
  const t3 = { id: 't3', name: 'try 3', from: 5, to: 6, y: 240, text: 'ok', solid: true };
  return [
    stBeat('dot', 'I phoned the kitchen to place an order and the line was busy. Should I ring again right away?', stScene(cast, line([t1])), ['t1', 'cast:dot']),
    stBeat('hoot', 'Some failures pass quickly, such as a busy phone line. Trying again often works.', stScene(cast, line([t1])), ['t1']),
    stBeat('hoot', 'But ringing again and again at once adds to the crowd. A busy kitchen gets busier. So wait a little first.', stScene(cast, l4Chip('x', 320, 190, 'ring, ring, ring, ring', { c: 'bad' }), l4Say('s1', 320, 240, 'too fast: it makes things worse')), ['x']),
    stBeat('hoot', 'A common plan is to wait longer each time: 1 tick, then 2, then 4. Doubling the wait is called backoff.', stScene(cast, line([t1, t2])), ['t2'], [5, 12]),
    stBeat('hoot', 'In the code, wait starts at 1. After each failure it prints the wait and doubles it: wait = wait * 2.', stScene(cast, st1Card('code', 60, 150, 520, ['except ValueError:', '    print("try", attempt, "busy, waiting", wait)', '    wait = wait * 2'], [1, 2])), ['code'], [11, 12]),
    stBeat('hoot', 'The waits are on a pretend clock. The code prints the wait but never pauses, so it runs the same everywhere and shows every step.', l5Pretend(cast, 'prints the wait', 'really pauses'), ['pc', 'rc']),
    stBeat('hoot', 'Real code pauses with await asyncio.sleep(wait). Other tasks can run during the pause. Then the wait doubles, as before.', l5Real(cast, ST507_REAL, [1, 2], 480), ['real']),
    stBeat('hoot', 'Try 1 fails and waits 1 tick. Try 2 fails and waits 2 ticks. Try 3 works, and the function returns 3.', stScene(cast, line([t1, t2, t3])), ['t3'], [8, 9]),
    stBeat('hoot', 'Always set a limit. The loop only runs max_tries times. If every try fails, return -1 so the caller knows it gave up.', stScene(cast, st1Card('code', 60, 150, 520, ST507_CODE.py.slice(5, 7).concat([ST507_CODE.py[13]]), [1, 2])), ['code'], [6, 13]),
    stBeat('hoot', 'With max_tries 2, both tries fail. The code still prints a wait after the last one. Real code would skip it and give up.', stScene(cast, st1Screen(100, 130, 440, ['try 1 busy, waiting 1', 'try 2 busy, waiting 2', '-1'], 140)), ['screen']),
    stBeat('dot', 'What if I never stop trying?', stScene(cast, l4Chip('q', 320, 200, 'try forever?', { c: 'bad' })), ['q', 'cast:dot']),
    stBeat('hoot', 'Then a broken service could keep one program trying all day. A few tries, a longer wait each time, then stop.', stScene(cast, l4Chip('a', 320, 200, 'few tries, longer waits, then stop', { solid: true })), ['a'])
  ];
}
START_LESSON('retries', {
  code: ST507_CODE, story: st507Story(),
  watch: { code: 'def flaky(attempt):\n    if attempt < 3:\n        raise ValueError("busy")\n    return "ok"\n\ndef try_again(max_tries):\n    wait = 1\n    for attempt in range(1, max_tries + 1):\n        try:\n            print("try", attempt, flaky(attempt))\n            return attempt\n        except ValueError:\n            print("try", attempt, "busy, waiting", wait)\n            wait = wait * 2\n    return -1\n\nprint(try_again(4))\n' },
  tryit: { py: 'def flaky(attempt):\n    if attempt < 3:\n        raise ValueError("busy")\n    return "ok"\n\ndef try_again(max_tries):\n    wait = 1\n    for attempt in range(1, max_tries + 1):\n        try:\n            print("try", attempt, flaky(attempt))\n            return attempt\n        except ValueError:\n            print("try", attempt, "busy, waiting", wait)\n            wait = wait * 2\n    return -1\n\nprint(try_again(4))\n',
    js: 'function flaky(attempt) {\n  if (attempt < 3) {\n    throw new Error("busy");\n  }\n  return "ok";\n}\n\nfunction try_again(max_tries) {\n  let wait = 1;\n  for (let attempt = 1; attempt <= max_tries; attempt++) {\n    try {\n      console.log("try", attempt, flaky(attempt));\n      return attempt;\n    } catch (problem) {\n      console.log("try", attempt, "busy, waiting", wait);\n      wait = wait * 2;\n    }\n  }\n  return -1;\n}\n\nconsole.log(try_again(4));\n',
    goals: ['Press Run.', 'Change try_again(4) to try_again(2). What does it return?', 'Make the wait grow by 3 times instead of 2 times.'] },
  check: { q: 'Why wait longer after each failed try?', choices: [['So a busy service gets room to recover', true, 'Right. Quick repeats add to the crowd.'], ['So the program finishes sooner', false, 'Waiting longer makes the program slower, not faster.'], ['So every try is certain to work', false, 'No wait guarantees success. The tries have a limit.'], ['So the error message changes', false, 'The message stays the same. Only the pause grows.']] }
});

// ---------- L5.8 Taking turns or working at once ----------
const ST508_REAL = ['lock = threading.Lock()', 'def add_one():', '    with lock:', '        write_count(read_count() + 1)'];
const ST508_CODE = {
  py: ['shared = {"count": 0}', 'def read_count():', '    return shared["count"]', 'def write_count(value):', '    shared["count"] = value', 'a = read_count()', 'b = read_count()', 'write_count(a + 1)', 'write_count(b + 1)', 'print("count is", shared["count"])'],
  js: ['let shared = { count: 0 };', 'function read_count() {', '  return shared.count; }', 'function write_count(value) {', '  shared.count = value; }', 'let a = read_count();', 'let b = read_count();', 'write_count(a + 1);', 'write_count(b + 1);', 'console.log("count is", shared.count);']
};
function st508Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const board = (n, lit) => l4Jar('board', 245, 150, String(n), 'count', { solid: !!lit });
  const mine = (id, x, text) => l4Chip(id, x, 285, text);
  return [
    stBeat('dot', 'Async was one waiter taking turns. Can I hire more waiters and work at the same moment?', stScene(cast, l4Chip('one', 320, 200, 'one waiter, taking turns')), ['one', 'cast:dot']),
    stBeat('hoot', 'Yes. One waiter taking turns is async. Several waiters in one kitchen are threads. Several kitchens are processes.', stScene(cast, l4Chip('t1', 150, 190, 'async'), l4Chip('t2', 320, 190, 'threads'), l4Chip('t3', 490, 190, 'processes'), l4Say('s1', 150, 240, 'one waiter'), l4Say('s2', 320, 240, 'many waiters'), l4Say('s3', 490, 240, 'many kitchens')), ['t1', 't2', 't3']),
    stBeat('hoot', 'Taking turns is not working at once. Async switches only at an await. Threads switch at any moment. Processes truly work at once.', stScene(cast, l4Chip('t1', 200, 190, 'turns'), l4Chip('t2', 440, 190, 'at once', { solid: true })), ['t1', 't2']),
    stBeat('hoot', 'Choose the tool for the job. Mostly waiting: async. Heavy calculating: processes. Old code that blocks: threads.', stScene(cast, l4Chip('j1', 160, 170, 'waiting'), l4Chip('j2', 160, 230, 'calculating'), l4Chip('j3', 160, 290, 'blocking code'), l4Chip('k1', 440, 170, 'async', { solid: true }), l4Chip('k2', 440, 230, 'processes', { solid: true }), l4Chip('k3', 440, 290, 'threads', { solid: true })), ['k1', 'k2', 'k3']),
    stBeat('hoot', 'Threads share one kitchen, which means one memory. Sharing is handy, but it has a trap. Here is a board with a count.', stScene(cast, board(0)), ['board'], 0),
    stBeat('dot', 'Two waiters each add 1 to the count. It starts at 0. What is it after both finish?', stScene(cast, board(0), mine('wa', 130, 'waiter A'), mine('wb', 510, 'waiter B')), ['board', 'cast:dot']),
    stBeat('hoot', 'Both read 0 at the same time. A writes 1. B still holds the old 0, adds 1, and writes 1 too. One update is lost.', stScene(cast, board(1, true), mine('wa', 130, 'A read 0'), mine('wb', 510, 'B read 0')), ['board'], [5, 6, 7, 8]),
    stBeat('hoot', 'This race is on a pretend clock too. We write the reads and writes in a fixed order. So it is the same every time, and it shows every step.', l5Pretend(cast, 'a fixed order', 'varies every run'), ['pc', 'rc']),
    stBeat('hoot', 'The count is 1, not 2. This is a race: the answer depends on who is quicker. Races are hard to find.', stScene(cast, board(1, true), l4Say('s1', 320, 290, 'expected 2, got 1', { c: 'bad' })), ['board'], 9),
    stBeat('hoot', 'A lock fixes it. One waiter does read, add and write all together. Then the other starts. The count ends at 2.', stScene(cast, board(2, true), l4Say('s1', 320, 290, 'one at a time: correct')), ['board']),
    stBeat('hoot', 'In real Python, threading.Lock does this. with lock: lets one thread in at a time. The others wait outside until it leaves.', l5Real(cast, ST508_REAL, [2, 3], 480), ['real']),
    stBeat('hoot', 'Processes avoid this by having their own copy of the data. That is safe, but it costs more to share results.', stScene(cast, l4Chip('p1', 200, 190, 'copy A'), l4Chip('p2', 440, 190, 'copy B')), ['p1', 'p2'])
  ];
}
START_LESSON('threads', {
  code: ST508_CODE, story: st508Story(),
  watch: { code: 'shared = {"count": 0}\n\ndef read_count():\n    return shared["count"]\n\ndef write_count(value):\n    shared["count"] = value\n\na = read_count()\nb = read_count()\nwrite_count(a + 1)\nwrite_count(b + 1)\nprint("without a lock:", shared["count"])\n\nshared["count"] = 0\na = read_count()\nwrite_count(a + 1)\nb = read_count()\nwrite_count(b + 1)\nprint("one at a time:", shared["count"])\n' },
  tryit: { py: 'shared = {"count": 0}\n\ndef read_count():\n    return shared["count"]\n\ndef write_count(value):\n    shared["count"] = value\n\na = read_count()\nb = read_count()\nwrite_count(a + 1)\nwrite_count(b + 1)\nprint("without a lock:", shared["count"])\n\nshared["count"] = 0\na = read_count()\nwrite_count(a + 1)\nb = read_count()\nwrite_count(b + 1)\nprint("one at a time:", shared["count"])\n',
    js: 'let shared = { count: 0 };\n\nfunction read_count() {\n  return shared.count;\n}\n\nfunction write_count(value) {\n  shared.count = value;\n}\n\nlet a = read_count();\nlet b = read_count();\nwrite_count(a + 1);\nwrite_count(b + 1);\nconsole.log("without a lock:", shared.count);\n\nshared.count = 0;\na = read_count();\nwrite_count(a + 1);\nb = read_count();\nwrite_count(b + 1);\nconsole.log("one at a time:", shared.count);\n',
    goals: ['Press Run and compare the two counts.', 'Add a third waiter, C, that reads at the same time as A and B. What is the count?', 'Change the starting count to 10. What do both lines print?'] },
  check: { q: 'Two threads each add 1 to a shared count that starts at 0. They both read before either writes. What is the count?', choices: [['1, because one update is lost', true, 'Right. Both wrote 1 from the old 0. That is a race.'], ['2, because both added 1', false, 'That happens only if one finishes before the other starts.'], ['0, because nothing changes', false, 'Both write a new value, so it changes.'], ['An error, because threads cannot share', false, 'Threads can share. That is exactly why a race can happen.']] }
});
