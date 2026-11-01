// Level 5, lessons 1 to 4: why waiting matters, the event loop, call-me-back functions, and async with await.
// One world all the way through Level 5: the kitchen with one waiter, where time is counted in ticks.
// The programs are small simulations with a pretend clock. They run the same everywhere and need no timers.
// Every word is our own.

// A timeline: one bar per job, drawn on a row of ticks. rows: [{ id, name, from, to, y, solid }]
function l5Timeline(rows, ticks, o) {
  const x0 = (o && o.x0) || 130, S = (o && o.S) || Math.min(80, Math.floor(440 / Math.max(1, ticks))), base = (o && o.base) || 300;
  const labels = [];
  for (let t = 0; t <= ticks; t++) labels.push({ id: 'tk' + t, x: x0 + t * S, y: base, text: String(t), size: 14, c: 'm' });
  labels.push({ id: 'tkn', x: x0 - 8, y: base, text: 'tick', size: 14, c: 'm', anchor: 'end' });
  rows.forEach((r) => labels.push({ id: 'nm' + r.id, x: 20, y: r.y + 25, text: r.name, anchor: 'start', size: 16, mono: true, c: 't2' }));
  return {
    boxes: rows.map((r) => ({ id: r.id, x: x0 + r.from * S, y: r.y, w: (r.to - r.from) * S, h: 38, rx: 8, text: r.text || '', size: 16, solid: !!r.solid, c: r.c })),
    labels
  };
}

// ---------- L5.1 Why waiting matters ----------
const ST501_CODE = {
  py: ['def wait_for(dish, ticks, now):', '    ready_at = now + ticks', '    print("tick", ready_at, dish, "is ready")', '    return ready_at', 'now = 0', 'now = wait_for("soup", 3, now)', 'now = wait_for("bread", 2, now)', 'print("all done at tick", now)'],
  js: ['function wait_for(dish, ticks, now) {', '  let ready_at = now + ticks;', '  console.log("tick", ready_at, dish, "is ready");', '  return ready_at; }', 'let now = 0;', 'now = wait_for("soup", 3, now);', 'now = wait_for("bread", 2, now);', 'console.log("all done at tick", now);']
};
function st501Story() {
  const cast = st1Cast([['hoot', 60], ['bolt', 320], ['dot', 580]]);
  const one = l5Timeline([{ id: 'soup', name: 'soup', from: 0, to: 3, y: 150, text: 'cooking', solid: true }, { id: 'bread', name: 'bread', from: 3, to: 5, y: 210, text: 'cooking' }], 5);
  const two = l5Timeline([{ id: 'soup', name: 'soup', from: 0, to: 3, y: 150, text: 'cooking', solid: true }, { id: 'bread', name: 'bread', from: 0, to: 2, y: 210, text: 'cooking' }], 5);
  return [
    stBeat('dot', 'I run a small kitchen with one waiter. The soup needs 3 ticks to cook and the bread needs 2. A tick is one step of the clock.', stScene(cast, l4Chip('soup', 200, 190, 'soup: 3 ticks'), l4Chip('bread', 440, 190, 'bread: 2 ticks')), ['soup', 'bread', 'cast:dot']),
    stBeat('hoot', 'Some jobs need the waiter\'s hands, like chopping. Others are only waiting, because the oven does the work.', stScene(cast, l4Chip('chop', 200, 190, 'chopping', { solid: true }), l4Chip('oven', 440, 190, 'oven cooking'), l4Say('s1', 200, 240, 'the waiter is busy'), l4Say('s2', 440, 240, 'the waiter is free')), ['chop', 'oven']),
    stBeat('hoot', 'Programs wait too. They wait for a web page, a file from the disk, or a timer. A disk is where files are kept.', stScene(cast, l4Chip('w1', 160, 190, 'web page'), l4Chip('w2', 320, 190, 'disk'), l4Chip('w3', 480, 190, 'timer'), l4Say('s1', 320, 245, 'the computer is idle meanwhile')), ['w1', 'w2', 'w3']),
    stBeat('hoot', 'Blocking means standing still until the wait ends. The waiter watches the soup for 3 ticks, then the bread for 2.', stScene(cast, one), ['soup', 'bread']),
    stBeat('hoot', 'wait_for does the same. It adds the ticks to the clock. The soup is ready at tick 3 and the bread at tick 5.', stScene(cast, one), ['soup', 'bread'], [5, 6, 7]),
    stBeat('dot', 'But the oven can cook the bread while the soup cooks! Why does the waiter wait for the soup first?', stScene(cast, one), ['bread', 'cast:dot']),
    stBeat('hoot', 'He should not. If both cook together, everything is ready at tick 3 instead of tick 5. Two ticks were wasted.', stScene(cast, two), ['soup', 'bread']),
    stBeat('hoot', 'Waits add up fast. A page that waits for ten slow downloads, one after another, feels frozen.', stScene(cast, l4Chip('x', 320, 190, '10 downloads in a row', { c: 'bad' }), l4Say('s1', 320, 240, 'the page looks frozen')), ['x']),
    stBeat('bolt', 'I did nothing during those waits. I wait only when I am told to. Next you will see how to use the time.', stScene(cast, one), ['cast:bolt'])
  ];
}
START_LESSON('blocking', {
  code: ST501_CODE, story: st501Story(),
  watch: { code: 'def wait_for(dish, ticks, now):\n    ready_at = now + ticks\n    print("tick", ready_at, dish, "is ready")\n    return ready_at\n\nnow = 0\nnow = wait_for("soup", 3, now)\nnow = wait_for("bread", 2, now)\nprint("all done at tick", now)\n' },
  tryit: { py: 'def wait_for(dish, ticks, now):\n    ready_at = now + ticks\n    print("tick", ready_at, dish, "is ready")\n    return ready_at\n\nnow = 0\nnow = wait_for("soup", 3, now)\nnow = wait_for("bread", 2, now)\nnow = wait_for("tea", 1, now)\nprint("all done at tick", now)\n',
    js: 'function wait_for(dish, ticks, now) {\n  let ready_at = now + ticks;\n  console.log("tick", ready_at, dish, "is ready");\n  return ready_at;\n}\n\nlet now = 0;\nnow = wait_for("soup", 3, now);\nnow = wait_for("bread", 2, now);\nnow = wait_for("tea", 1, now);\nconsole.log("all done at tick", now);\n',
    goals: ['Press Run and read the tick numbers.', 'Change the soup to 5 ticks. When is everything done?', 'Add a dish of your own with a wait of 2.'] },
  check: { q: 'A waiter waits for the soup, then for the bread, one after another. This is called what?', choices: [['Blocking', true, 'Right. Blocking means standing still until each wait ends.'], ['Cooking together', false, 'Together would mean both waits overlap. Here they do not.'], ['Calculating', false, 'The waiter is not working. He is waiting.'], ['Looping', false, 'A loop repeats steps. Here the problem is waiting in turn.']] }
});

// ---------- L5.2 The event loop is a queue ----------
const ST502_CODE = {
  py: ['def run_loop(waiting):', '    now = 0', '    while len(waiting) > 0:', '        for job in waiting:', '            if job["ready_at"] == now:', '                print("tick", now, job["dish"], "is ready")', '                waiting.remove(job)', '                break', '        now = now + 1', 'orders = [{"dish": "soup", "ready_at": 3},', '          {"dish": "bread", "ready_at": 1},', '          {"dish": "tea", "ready_at": 2}]', 'run_loop(orders)'],
  js: ['function run_loop(waiting) {', '  let now = 0;', '  while (waiting.length > 0) {', '    for (let job of waiting) {', '      if (job.ready_at === now) {', '        console.log("tick", now, job.dish, "is ready");', '        waiting.splice(waiting.indexOf(job), 1);', '        break; } }', '    now = now + 1; } }', 'let orders = [{ dish: "soup", ready_at: 3 },', '  { dish: "bread", ready_at: 1 },', '  { dish: "tea", ready_at: 2 }];', 'run_loop(orders);']
};
function st502Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const q = (waiting, running, done) => stQueue(waiting, running, done, 170);
  return [
    stBeat('dot', 'Three orders are cooking: soup, bread and tea. Does the waiter serve them in the order they were written down?', stScene(cast, q(['soup', 'bread', 'tea'], null, [])), ['job:soup', 'job:bread', 'job:tea', 'cast:dot'], [9, 10, 11]),
    stBeat('hoot', 'No. The waiter keeps a list of jobs that are waiting. He always takes the next job that is ready, not the first one written.', stScene(cast, q(['soup', 'bread', 'tea'], null, [])), ['job:soup', 'job:bread', 'job:tea']),
    stBeat('hoot', 'This waiter is called the event loop. It is one worker that goes round and round, looking for a job that is ready.', stScene(cast, q(['soup', 'bread', 'tea'], null, []), l4Say('lp', 320, 320, 'look, take, serve, look again')), ['qr']),
    stBeat('hoot', 'Each job carries a number: the tick when it will be ready. soup 3, bread 1, tea 2. The clock starts at 0.', stScene(cast, q(['soup', 'bread', 'tea'], null, []), l4Say('sn', 320, 320, 'soup: 3   bread: 1   tea: 2')), ['job:soup', 'job:bread', 'job:tea'], [9, 10, 11]),
    stBeat('hoot', 'At tick 0 nothing is ready. At tick 1 the bread is ready. The loop takes it, prints it, and removes it from the list.', stScene(cast, q(['soup', 'tea'], 'bread', [])), ['job:bread'], [4, 5, 6, 7]),
    stBeat('hoot', 'Tick 2: tea is ready. Tick 3: soup is ready. The loop ends when the waiting list is empty.', stScene(cast, q(['soup'], 'tea', ['bread'])), ['job:tea'], [2, 8]),
    stBeat('hoot', 'The order served is bread, tea, soup. That is the order they became ready, not the order they were added.', stScene(cast, q([], 'soup', ['bread', 'tea'])), ['job:soup', 'job:bread', 'job:tea']),
    stBeat('dot', 'And while the soup cooks, the waiter is free to take the tea. Nothing freezes!', stScene(cast, q(['soup'], null, ['bread', 'tea'])), ['job:soup', 'cast:dot']),
    stBeat('hoot', 'This idea runs web browsers and many servers. They have one worker, a list of jobs, and always take the next ready job.', stScene(cast, l4Chip('e', 320, 200, 'one worker, a queue of jobs', { solid: true })), ['e'])
  ];
}
START_LESSON('event-loop', {
  code: ST502_CODE, story: st502Story(),
  watch: { code: 'def run_loop(waiting):\n    now = 0\n    while len(waiting) > 0:\n        for job in waiting:\n            if job["ready_at"] == now:\n                print("tick", now, job["dish"], "is ready")\n                waiting.remove(job)\n                break\n        now = now + 1\n\norders = [{"dish": "soup", "ready_at": 3},\n          {"dish": "bread", "ready_at": 1},\n          {"dish": "tea", "ready_at": 2}]\nrun_loop(orders)\n' },
  tryit: { py: 'def run_loop(waiting):\n    now = 0\n    while len(waiting) > 0:\n        for job in waiting:\n            if job["ready_at"] == now:\n                print("tick", now, job["dish"], "is ready")\n                waiting.remove(job)\n                break\n        now = now + 1\n\norders = [{"dish": "soup", "ready_at": 3},\n          {"dish": "bread", "ready_at": 1},\n          {"dish": "tea", "ready_at": 2}]\nrun_loop(orders)\n',
    js: 'function run_loop(waiting) {\n  let now = 0;\n  while (waiting.length > 0) {\n    for (let job of waiting) {\n      if (job.ready_at === now) {\n        console.log("tick", now, job.dish, "is ready");\n        waiting.splice(waiting.indexOf(job), 1);\n        break;\n      }\n    }\n    now = now + 1;\n  }\n}\n\nlet orders = [{ dish: "soup", ready_at: 3 },\n  { dish: "bread", ready_at: 1 },\n  { dish: "tea", ready_at: 2 }];\nrun_loop(orders);\n',
    goals: ['Press Run and check the order the dishes are served.', 'Add a dish called cake that is ready at tick 0.', 'Give two dishes the same ready_at. Which does the loop serve first?'] },
  check: { q: 'Which job does the event loop take next?', choices: [['The next job that is ready', true, 'Right. It looks for a job whose time has come.'], ['The first job that was added', false, 'Order of adding does not matter. Being ready does.'], ['The slowest job', false, 'The loop never picks by slowness. It picks what is ready.'], ['A job chosen at random', false, 'The loop is not random. It follows the clock.']] }
});

// ---------- L5.3 Call me when it is done ----------
const ST503_CODE = {
  py: ['def serve(dish):', '    print("take", dish, "to table 4")', 'def pour(dish):', '    print("pour", dish, "into cups")', 'def run_loop(waiting):', '    now = 0', '    while len(waiting) > 0:', '        for job in waiting:', '            if job["ready_at"] == now:', '                job["when_done"](job["dish"])', '                waiting.remove(job)', '                break', '        now = now + 1', 'orders = [{"dish": "soup", "ready_at": 3, "when_done": serve},', '          {"dish": "tea", "ready_at": 1, "when_done": pour}]', 'run_loop(orders)'],
  js: ['function serve(dish) {', '  console.log("take", dish, "to table 4"); }', 'function pour(dish) {', '  console.log("pour", dish, "into cups"); }', 'function run_loop(waiting) {', '  let now = 0;', '  while (waiting.length > 0) {', '    for (let job of waiting) {', '      if (job.ready_at === now) {', '        job.when_done(job.dish);', '        waiting.splice(waiting.indexOf(job), 1);', '        break; } }', '    now = now + 1; } }', 'let orders = [{ dish: "soup", ready_at: 3, when_done: serve },', '  { dish: "tea", ready_at: 1, when_done: pour }];', 'run_loop(orders);']
};
function st503Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const job = (id, x, y, dish, fn, lit) => ({ boxes: [{ id, x, y, w: 200, h: 78, text: dish, size: 18, tag: 'job', solid: !!lit }], tokens: [{ id: id + 'f', x: x + 100, y: y + 108, text: 'then ' + fn, w: 150, c: 'b' }], arrows: [{ id: id + 'a', from: [x + 100, y + 80], to: [x + 100, y + 90], c: 'm' }] });
  return [
    stBeat('dot', 'The waiter takes the soup out when it is ready. But who carries it to table 4? I want to leave a note with the order.', stScene(cast, job('j1', 220, 130, 'soup', 'serve')), ['j1', 'cast:dot']),
    stBeat('hoot', 'Leave a function with the job. It is called a callback: a function you hand over so someone else can call it later.', stScene(cast, job('j1', 220, 130, 'soup', 'serve')), ['j1f', 'j1'], [13]),
    stBeat('hoot', 'In the order we write "when_done": serve. There are no brackets after serve. We hand the function over. We do not run it yet.', stScene(cast, st1Card('c', 100, 140, 440, ['{"dish": "soup", "when_done": serve}'], [0]), l4Say('s1', 320, 230, 'serve, not serve()')), ['c'], 13),
    stBeat('hoot', 'The loop runs, and at tick 1 the tea is ready. The loop reads the note: pour. Now it adds brackets and calls it.', stScene(cast, job('j1', 60, 130, 'tea', 'pour', true), l4Chip('call', 450, 190, 'pour("tea")', { solid: true }), l4Arrow('ar', [270, 190], [380, 190])), ['j1', 'call'], 9),
    stBeat('hoot', 'job["when_done"](job["dish"]) means: take the function from the job, then call it with the dish. It prints: pour tea into cups.', stScene(cast, st1Screen(120, 150, 400, ['pour tea into cups'], 80)), ['screen'], [9, 3]),
    stBeat('hoot', 'At tick 3 the soup is ready. The loop calls serve and prints: take soup to table 4.', stScene(cast, st1Screen(120, 150, 400, ['pour tea into cups', 'take soup to table 4'], 110)), ['screen'], [0, 1, 9]),
    stBeat('dot', 'So the part that starts the soup does not wait around. It leaves a note and goes on with other work!', stScene(cast, l4Chip('a', 320, 190, 'start the job, leave a note, move on', { solid: true })), ['a', 'cast:dot']),
    stBeat('hoot', 'That is the big idea. Say what should happen later, and let the loop call you back when the time comes.', stScene(cast, l4Chip('a', 320, 190, 'call me back', { solid: true })), ['a']),
    stBeat('hoot', 'Watch one mistake. serve() with brackets runs the function now. Without brackets, you hand it over to run later.', stScene(cast, l4Chip('n1', 200, 190, 'serve()', { c: 'bad' }), l4Chip('n2', 440, 190, 'serve', { solid: true }), l4Say('s1', 200, 240, 'runs right now'), l4Say('s2', 440, 240, 'runs later')), ['n1', 'n2'])
  ];
}
START_LESSON('later', {
  code: ST503_CODE, story: st503Story(),
  watch: { code: 'def serve(dish):\n    print("take", dish, "to table 4")\n\ndef pour(dish):\n    print("pour", dish, "into cups")\n\ndef run_loop(waiting):\n    now = 0\n    while len(waiting) > 0:\n        for job in waiting:\n            if job["ready_at"] == now:\n                job["when_done"](job["dish"])\n                waiting.remove(job)\n                break\n        now = now + 1\n\norders = [{"dish": "soup", "ready_at": 3, "when_done": serve},\n          {"dish": "tea", "ready_at": 1, "when_done": pour}]\nrun_loop(orders)\n' },
  tryit: { py: 'def serve(dish):\n    print("take", dish, "to table 4")\n\ndef pour(dish):\n    print("pour", dish, "into cups")\n\ndef run_loop(waiting):\n    now = 0\n    while len(waiting) > 0:\n        for job in waiting:\n            if job["ready_at"] == now:\n                job["when_done"](job["dish"])\n                waiting.remove(job)\n                break\n        now = now + 1\n\norders = [{"dish": "soup", "ready_at": 3, "when_done": serve},\n          {"dish": "tea", "ready_at": 1, "when_done": pour}]\nrun_loop(orders)\n',
    js: 'function serve(dish) {\n  console.log("take", dish, "to table 4");\n}\n\nfunction pour(dish) {\n  console.log("pour", dish, "into cups");\n}\n\nfunction run_loop(waiting) {\n  let now = 0;\n  while (waiting.length > 0) {\n    for (let job of waiting) {\n      if (job.ready_at === now) {\n        job.when_done(job.dish);\n        waiting.splice(waiting.indexOf(job), 1);\n        break;\n      }\n    }\n    now = now + 1;\n  }\n}\n\nlet orders = [{ dish: "soup", ready_at: 3, when_done: serve },\n  { dish: "tea", ready_at: 1, when_done: pour }];\nrun_loop(orders);\n',
    goals: ['Press Run.', 'Write a function called sing(dish) that prints the dish and a song line. Use it as a when_done.', 'Change when_done: serve to when_done: serve(). Read the error.'] },
  check: { q: 'In {"when_done": serve} why are there no brackets after serve?', choices: [['The function is handed over, to be called later', true, 'Right. Brackets would run it now and hand over its result.'], ['Brackets are not allowed in a dictionary', false, 'They are allowed. They would call the function right away.'], ['serve has no job to do', false, 'It does have a job. It runs when the loop calls it.'], ['Python adds them for you', false, 'Python never adds brackets. The loop adds them when it calls.']] }
});

// ---------- L5.4 async and await ----------
const ST504_CODE = {
  py: ['def take_turn(task):', '    task["left"] = task["left"] - 1', '    if task["left"] == 0:', '        print(task["dish"], "is ready")', '    else:', '        print(task["dish"], "waits,", task["left"], "left")', 'def run_all(tasks):', '    while len(tasks) > 0:', '        for task in tasks:', '            take_turn(task)', '        tasks = [t for t in tasks if t["left"] > 0]', 'run_all([{"dish": "soup", "left": 3}, {"dish": "bread", "left": 2}])'],
  js: ['function take_turn(task) {', '  task.left = task.left - 1;', '  if (task.left === 0) {', '    console.log(task.dish, "is ready"); }', '  else {', '    console.log(task.dish, "waits,", task.left, "left"); } }', 'function run_all(tasks) {', '  while (tasks.length > 0) {', '    for (let task of tasks) {', '      take_turn(task); }', '    tasks = tasks.filter((t) => t.left > 0); } }', 'run_all([{ dish: "soup", left: 3 }, { dish: "bread", left: 2 }]);']
};
const ST504_REAL = ['async def cook(dish, ticks):', '    print(dish, "starts")', '    await asyncio.sleep(ticks)', '    print(dish, "is ready")'];
function st504Story() {
  const cast = st1Cast([['hoot', 60], ['dot', 580]]);
  const real = (cur) => st1Card('real', 90, 135, 460, ST504_REAL, cur || []);
  const turn = (a, b, lit) => ({ tokens: [{ id: 'ts', x: 170, y: 190, text: 'soup: ' + a, w: 150, solid: lit === 'a' }, { id: 'tb', x: 400, y: 190, text: 'bread: ' + b, w: 150, solid: lit === 'b' }] });
  return [
    stBeat('dot', 'One cook is slow. The waiter has two dishes to watch. Must he stare at one until it is done?', stScene(cast, turn('3 left', '2 left')), ['ts', 'tb', 'cast:dot']),
    stBeat('hoot', 'No. He can share his time. Give each dish one turn, then go round again. A task is a job that takes turns like this.', stScene(cast, turn('3 left', '2 left')), ['ts', 'tb']),
    stBeat('hoot', 'In take_turn, a task uses one tick of waiting. If nothing is left it prints is ready. Otherwise it says it waits.', stScene(cast, turn('2 left', '2 left', 'a')), ['ts'], [1, 2, 3, 4, 5]),
    stBeat('hoot', 'run_all gives every task one turn, then drops the finished ones. A for loop inside a while loop does the going round.', stScene(cast, turn('2 left', '1 left', 'b')), ['tb'], [7, 8, 9, 10]),
    stBeat('hoot', 'Round after round: soup waits, bread waits, soup waits, bread is ready, soup is ready. Both finish by tick 3.', stScene(cast, st1Screen(120, 140, 400, ['soup waits, 2 left', 'bread waits, 1 left', 'soup waits, 1 left', 'bread is ready', 'soup is ready'], 200)), ['screen'], [3, 5]),
    stBeat('hoot', 'Real Python uses two new words. The words async def make a task. The word await marks where it waits.', stScene(cast, real([0, 2])), ['real']),
    stBeat('hoot', 'await means: I am waiting now, so let the other tasks go. When the wait ends, the task carries on after the await.', stScene(cast, real([2, 3])), ['real']),
    stBeat('dot', 'Does await make the cooking faster?', stScene(cast, l4Chip('q', 320, 200, 'faster?')), ['q', 'cast:dot']),
    stBeat('hoot', 'No. The soup still needs 3 ticks. await only lets other tasks use that waiting time. Forget it, and the task never waits at all.', stScene(cast, l4Chip('a', 320, 200, 'await = share the waiting', { solid: true })), ['a'])
  ];
}
START_LESSON('async-await', {
  code: ST504_CODE, story: st504Story(),
  watch: { code: 'def take_turn(task):\n    task["left"] = task["left"] - 1\n    if task["left"] == 0:\n        print(task["dish"], "is ready")\n    else:\n        print(task["dish"], "waits,", task["left"], "left")\n\ndef run_all(tasks):\n    while len(tasks) > 0:\n        for task in tasks:\n            take_turn(task)\n        tasks = [t for t in tasks if t["left"] > 0]\n\nrun_all([{"dish": "soup", "left": 3}, {"dish": "bread", "left": 2}])\n' },
  tryit: { py: 'def take_turn(task):\n    task["left"] = task["left"] - 1\n    if task["left"] == 0:\n        print(task["dish"], "is ready")\n    else:\n        print(task["dish"], "waits,", task["left"], "left")\n\ndef run_all(tasks):\n    while len(tasks) > 0:\n        for task in tasks:\n            take_turn(task)\n        tasks = [t for t in tasks if t["left"] > 0]\n\nrun_all([{"dish": "soup", "left": 3}, {"dish": "bread", "left": 2}])\n',
    js: 'function take_turn(task) {\n  task.left = task.left - 1;\n  if (task.left === 0) {\n    console.log(task.dish, "is ready");\n  } else {\n    console.log(task.dish, "waits,", task.left, "left");\n  }\n}\n\nfunction run_all(tasks) {\n  while (tasks.length > 0) {\n    for (let task of tasks) {\n      take_turn(task);\n    }\n    tasks = tasks.filter((t) => t.left > 0);\n  }\n}\n\nrun_all([{ dish: "soup", left: 3 }, { dish: "bread", left: 2 }]);\n',
    goals: ['Press Run and follow the turns.', 'Add a third dish, tea, that needs 1 tick. When does it finish?', 'Give soup 5 ticks. Who finishes first now?'] },
  check: { q: 'What does await do in an async task?', choices: [['Marks where the task waits and lets other tasks go', true, 'Right. The task resumes after the wait, when its turn comes.'], ['Makes the wait shorter', false, 'The wait takes as long as before. Others use that time.'], ['Stops the whole program', false, 'Only this task waits. The others keep going.'], ['Runs the task in a new computer', false, 'Everything still runs on the one worker.']] }
});
