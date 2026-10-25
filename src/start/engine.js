// Start here: programming from zero. The engine for the hub (Start) and the chapter player (Chapter).
// Data lives next to it: chapters.js (the 21 chapters, their stories, try-its and checks), exercises.js (the
// practice), needs.js (what each easy runnable problem needs) and traces.js (generated: "Watch it run" traces).
// The story stage is drawn with stFlatten() below and eased with aiTween()/aiPaint() from src/ai/render.js.
// tests/startcheck.js loads these files and checks every chapter, exercise, trace and needs tag.

// ---------- cast ----------
// Old Hoot is the mentor everywhere. Dot is new to coding too: she asks what a beginner would ask.
// color is a theme key (or a hex), like STORY_CAST in the story engine (src/story/tail.js registers Dot there too).
const START_CAST = {
  hoot: { name: 'Old Hoot', initial: 'H', color: 'muted', role: 'the mentor who has seen every bug twice' },
  dot: { name: 'Dot', initial: 'D', color: 'accent', role: 'new to coding, so she asks the questions you are thinking' },
  bolt: { name: 'Bolt', initial: 'B', color: 'right', role: 'a robot who does exactly what it is told, nothing more' },
  penny: { name: 'Penny', initial: 'P', color: 'left', role: 'who keeps every count and every list tidy' },
  pip: { name: 'Pip', initial: 'P', color: 'ok', role: 'the plate-stacker at the busy canteen, who knows which plate is on top' }
};
// The ladder: levels, each made of parts (the chapters learners see). Lessons say their level and part.
const START_LEVELS = [
  { n: 1, title: 'Basics', blurb: 'From your first line of code to your first real problem.' },
  { n: 2, title: 'Functions in depth', blurb: 'Calls, the call stack, scope, arguments, functions as values, closures and recursion.' },
  { n: 3, title: 'Objects and classes', blurb: 'Blueprints, objects, references, family trees, and when a class is not worth it.' },
  { n: 4, title: 'Writing better code', blurb: 'Names, small functions, tests and tidy files.' },
  { n: 5, title: 'Waiting without freezing', blurb: 'Async code: the event loop, tasks and callbacks.' }
];
const START_PARTS = [
  { n: 1, level: 1, title: 'Talking to the computer', blurb: 'Run a line, do sums, read an error, name a value.' },
  { n: 2, level: 1, title: 'Asking and deciding', blurb: 'Ask a question, compare, choose a path.' },
  { n: 3, level: 1, title: 'Repeating and collecting', blurb: 'Loop, keep a total, fill a list.' },
  { n: 4, level: 1, title: 'Reusing and organising', blurb: 'Write functions, look things up, fix bugs.' },
  { n: 5, level: 1, title: 'The bridge', blurb: 'Plan in words, then read a real problem.' },
  { n: 6, level: 1, title: 'After your first problems', blurb: 'Count the steps your code takes.' },
  { n: 7, level: 2, title: 'Calls and the stack', blurb: 'What a call does, the pile of plates, and where names live.' },
  { n: 8, level: 2, title: 'Arguments in depth', blurb: 'Defaults, names, any number of inputs, and shared lists.' },
  { n: 9, level: 2, title: 'Functions as values', blurb: 'Hand a function over, and functions that remember.' },
  { n: 10, level: 2, title: 'Calling yourself', blurb: 'Recursion, plate by plate.' },
  { n: 11, level: 3, title: 'Blueprints and objects', blurb: 'Classes, self, __init__, data and methods.' },
  { n: 12, level: 3, title: 'Names and shared data', blurb: 'Follow the arrows, share data, guard it.' },
  { n: 13, level: 3, title: 'Family trees', blurb: 'Inheritance, super() and the same call doing different things.' },
  { n: 14, level: 3, title: 'Building well', blurb: 'Parts, special methods, contracts, and when to skip the class.' },
  { n: 15, level: 4, title: 'Code people can read', blurb: 'Clear names and short functions.' },
  { n: 16, level: 5, title: 'The event loop', blurb: 'A queue of jobs that never blocks.' }
];
function startLevel(c) { return c.level || 1; }
// What a lesson can teach. A runnable problem's needs (needs.js) use the same keys.
const START_NEEDS_KEYS = {
  program: 'what a program is', print: 'printing', math: 'arithmetic', errors: 'reading errors', variables: 'variables', types: 'types',
  io: 'input', logic: 'comparisons', if: 'if / else', boolops: 'and / or / not', edges: 'edge cases', loops: 'for loops',
  while: 'while loops', accumulate: 'running totals', lists: 'lists', scan: 'looping over a list', strings: 'strings',
  nested: 'nested loops', functions: 'functions', return: 'return values', dicts: 'dictionaries', debug: 'debugging',
  plan: 'planning in words', problems: 'reading a problem', bigo: 'counting steps', recursion: 'recursion', stack: 'the call stack',
  calls: 'calling functions', scope: 'scope', defaults: 'default and keyword arguments', varargs: 'any number of arguments',
  mutation: 'shared lists in calls', callbacks: 'functions as values', closures: 'closures',
  objects: 'classes and objects', self: 'self', init: '__init__', methods: 'attributes and methods', refs: 'references',
  classattrs: 'class attributes', encapsulation: 'encapsulation', inheritance: 'inheritance', super: 'super()',
  polymorphism: 'polymorphism', composition: 'composition', dunder: 'special methods', interfaces: 'abstract classes',
  design: 'when to use a class', style: 'clean code', async: 'async code'
};
const START_STAGES = [['story', 'Story'], ['watch', 'Watch it run'], ['try', 'Try it'], ['practice', 'Practice'], ['check', 'Check']];
const START_EASE_MS = 600;

// A lessons_*.js file fills in a lesson written in chapters.js and marks it ready:
// START_LESSON(id, { code, story, watch, tryit, check, first }).
function START_LESSON(id, data) {
  const c = START_CHAPTERS.find((x) => x.id === id);
  if (!c) throw new Error('START_LESSON: no lesson ' + id + ' in chapters.js');
  Object.assign(c, data, { ready: true });
}

// ---------- the path ----------
function startIndex(id) { return START_CHAPTERS.findIndex((c) => c.id === id); }
function startById(id) { return START_CHAPTERS[startIndex(id)] || null; }
function startUnlocks(id) { return START_CHAPTERS.filter((c) => (c.after || []).includes(id)).map((c) => c.id); }
// Everything a chapter builds on, directly or not.
function startAncestors(id) {
  const seen = {}, todo = (startById(id) || {}).after ? startById(id).after.slice() : [];
  while (todo.length) { const x = todo.pop(); if (!seen[x]) { seen[x] = 1; ((startById(x) || {}).after || []).forEach((y) => todo.push(y)); } }
  return Object.keys(seen);
}
// The needs keys taught by this chapter and every chapter before it in the track.
function startTaughtBy(id) {
  const out = {};
  START_CHAPTERS.slice(0, startIndex(id) + 1).forEach((c) => (c.teaches || []).forEach((k) => { out[k] = 1; }));
  return Object.keys(out);
}
// Learner progress over the chapters: done, known (placement), passed exercises, the one "next" chapter.
function startProgress(st) {
  const S = st || (typeof DS !== 'undefined' ? DS.start() : { done: {}, ex: {}, skip: {} });
  const rows = START_CHAPTERS.map((c, i) => {
    const ex = (START_EXERCISES[c.id] || []);
    const passed = ex.filter((e) => S.ex[e.id]).length;
    return { c, i, done: !!S.done[c.id], known: !!S.skip[c.id] && !S.done[c.id], passed, total: ex.length, ready: !!c.ready };
  });
  const settled = (r) => r.done || r.known;
  const next = rows.find((r) => r.ready && !settled(r)) || null;
  rows.forEach((r) => {
    const pre = (r.c.after || []).map((a) => rows[startIndex(a)]);
    r.open = pre.every(settled);
    r.next = !!next && r === next;
    r.missing = pre.filter((p) => !settled(p)).map((p) => p.c);
  });
  const done = rows.filter((r) => r.done).length;
  const ready = rows.filter((r) => r.ready).length;
  return { rows, next, done, known: rows.filter((r) => r.known).length, ready, total: rows.length, finished: ready > 0 && rows.filter((r) => r.ready).every(settled), last: S.last || '' };
}
// Easy runnable problems a learner can try once this chapter is done: every need is already taught.
function startFirstProblems(id, limit) {
  const taught = startTaughtBy(id);
  const ch = startById(id);
  const own = (ch && ch.first) || [];
  return own.filter((pid) => (START_NEEDS[pid] || ['?']).every((k) => taught.includes(k))).slice(0, limit || 6);
}
// Every first problem the whole track opens, in chapter order.
function startAllFirstProblems() {
  const seen = {}, out = [];
  START_CHAPTERS.forEach((c) => (c.first || []).forEach((pid) => { if (!seen[pid]) { seen[pid] = 1; out.push({ pid, ch: c }); } }));
  return out;
}

// ---------- plain error help ----------
// One or two short sentences for the first error a beginner sees. Order matters: the first match wins.
const START_HELP = [
  [/IndentationError|unexpected indent|expected an indented block|unindent/i, 'IndentationError means the spaces at the start of a line are off. Lines inside an if, loop or def need the same indent, usually 4 spaces.'],
  [/SyntaxError: unterminated string|Unterminated string|EOL while scanning|unterminated string literal|Invalid or unexpected token/i, 'A string is missing its closing quote. Every " or \' needs a partner at the other end.'],
  [/was never closed|unexpected EOF|Unexpected end of input|missing \) after/i, 'A bracket was opened and never closed. Count your ( and ) or [ and ] on that line.'],
  [/expected ':'|SyntaxError: invalid syntax.*:|missing :/i, 'Python expected a colon. Lines that start an if, else, for, while or def end with :'],
  [/SyntaxError/i, 'SyntaxError means Python cannot read the line, like a sentence with a typo. Check the line it names for a missing quote, bracket or colon.'],
  [/NameError: name '([^']+)' is not defined|ReferenceError: (\S+) is not defined/i, (m) => 'NameError means Python does not know the name ' + (m[1] || m[2]) + ' yet. Check the spelling, or give it a value before you use it.'],
  [/UnboundLocalError/i, 'The function uses a variable before giving it a value inside the function. Set it first, or pass it in.'],
  [/TypeError: can only concatenate str|TypeError: unsupported operand type\(s\) for \+: 'int' and 'str'|must be str, not int/i, 'You tried to join text and a number with +. Turn the number into text first with str(), or print them with a comma.'],
  [/TypeError: '(\w+)' object is not callable|is not a function/i, 'Something that is not a function was called with ( ). Check that the name is spelled right and is not reused for a value.'],
  [/TypeError: (\w+)\(\) missing \d+ required positional argument|takes \d+ positional argument/i, 'The function was called with the wrong number of values. Count the values in the call and the names in its def line.'],
  [/TypeError: '(\w+)' object is not subscriptable|Cannot read propert/i, 'Square brackets were used on something that is not a list, string or dictionary. Check what the variable really holds.'],
  [/TypeError/i, 'TypeError means two kinds of value were mixed in a way that does not work, like adding text to a number. Check the types on that line.'],
  [/ZeroDivisionError/i, 'ZeroDivisionError means the program divided by zero, which has no answer. Check the number after / or // or %.'],
  [/IndexError/i, 'IndexError means you asked for a position the list does not have. Positions start at 0, so the last one is len(list) - 1.'],
  [/KeyError: (.+)/i, (m) => 'KeyError means the dictionary has no key ' + m[1].trim() + '. Add it first, or use .get() to ask safely.'],
  [/ValueError: invalid literal for int/i, 'int() could only turn text that looks like a whole number into a number. Check the input.'],
  [/ValueError/i, 'ValueError means the type was right but the value was not, like int("hi"). Check the value on that line.'],
  [/AttributeError: '(\w+)' object has no attribute '(\w+)'/i, (m) => 'AttributeError means a ' + m[1] + ' has nothing called ' + m[2] + '. Check the spelling of the method.'],
  [/RecursionError|Maximum call stack/i, 'The function called itself forever. Every recursive function needs a base case that returns without calling again.'],
  [/EOFError/i, 'The program asked for more input than it was given. Add another line in the Input box.'],
  [/^Timeout$/, 'The program never finished. A while loop whose condition never turns false keeps going forever. Check that something inside the loop changes.'],
  [/No function named (\w+)/i, (m) => 'Keep the name ' + m[1] + ' from the starter code. The checker calls it by that name.']
];
function startHelp(msg, lang) {
  const s = String(msg || '');
  for (const [re, say] of START_HELP) {
    const m = re.exec(s);
    if (m) { const text = typeof say === 'function' ? say(m) : say; return lang === 'js' ? text.replace(/Python/g, 'JavaScript').replace(/NameError/g, 'ReferenceError').replace(/str\(\)/g, 'String()').replace(/\.get\(\)/g, 'an if check').replace(/ def line/g, ' function line') : text; }
  }
  return '';
}

// ---------- "Watch it run": captions and predictions for a trace from tracer.py ----------
function startFrameVars(step) { const f = step && step.s && step.s.length ? step.s[step.s.length - 1] : null; return f ? f[2] : []; }
function startClip(s, n) { s = String(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
// One plain caption per step: what the line before it did, then what happens next. At most 140 characters.
function startTraceSay(steps, i) {
  const cur = steps[i], prev = i > 0 ? steps[i - 1] : null;
  if (!cur) return '';
  const fname = (step) => { const f = step.s[step.s.length - 1]; return f ? f[0] : ''; };
  if (cur.e === 'error') return startClip('The program stops on line ' + (cur.l || '?') + ': ' + cur.r, 140);
  const bits = [];
  if (prev) {
    const newOut = cur.o.slice(prev.o.length).replace(/\n$/, '');
    if (cur.e === 'call') {
      const args = startFrameVars(cur).map((v) => v[0] + ' = ' + startClip(v[1], 14)).join(', ');
      bits.push(fname(cur) + ' starts' + (args ? ' with ' + args : '') + '. A new frame opens on the stack.');
    } else if (cur.e === 'return') {
      bits.push(fname(cur) + ' hands back ' + startClip(cur.r, 18) + '. Its frame closes.');
    } else {
      const was = {}; (prev.s.length === cur.s.length ? startFrameVars(prev) : []).forEach((v) => { was[v[0]] = v[1]; });
      const changes = [];
      startFrameVars(cur).forEach(([n, v, ty]) => {
        if (ty === 'function' || ty === 'class') { if (!(n in was)) changes.push(n + ' is now a ' + ty + '.'); return; }
        if (!(n in was)) changes.push(n + ' gets a box holding ' + startClip(v, 18) + '.');
        else if (was[n] !== v) changes.push(n + ' changes from ' + startClip(was[n], 12) + ' to ' + startClip(v, 12) + '.');
      });
      if (newOut) changes.unshift('It prints “' + startClip(newOut.split('\n').pop(), 28) + '”.');
      bits.push(changes.length ? changes.slice(0, 2).join(' ') : 'Line ' + prev.l + ' ran. Nothing in memory changed.');
    }
  } else bits.push('The program starts at the top.');
  if (cur.e === 'end') bits.push('The program is done.');
  else if (cur.e === 'line' || cur.e === 'call') bits.push('Next: line ' + cur.l + '.');
  let s = bits.join(' ');
  if (s.length > 140) s = bits[bits.length - 1].length < 40 ? startClip(bits[0], 139 - bits[bits.length - 1].length) + ' ' + bits[bits.length - 1] : startClip(s, 140);
  return s;
}
// Predict: "Which line runs next?" The right line plus up to two other lines of the program, in line order.
function startPredictLines(steps, i, nLines) {
  const nxt = steps[i + 1];
  if (!nxt || !nxt.l || nxt.e === 'error') return null;
  const right = nxt.l, here = steps[i].l || 1;
  const pool = [here + 1, right + 1, right - 1, here, 1].filter((x) => x >= 1 && x <= nLines && x !== right);
  const pick = [];
  pool.forEach((x) => { if (pick.length < 2 && !pick.includes(x)) pick.push(x); });
  return { right, choices: pick.concat([right]).sort((a, b) => a - b) };
}

// ---------- the story stage: a small scene vocabulary on a 640 x 360 canvas ----------
// boxes   { id, x, y, w, h, text, tag, c, solid, dash, size }       a labelled box; tag is the name tag on its top edge
// tokens  { id, x, y, text, c, solid, size }                        a value chip, centred on x, y
// arrows  { id, from: [x, y], to: [x, y], c, dash, label }
// labels  { id, x, y, text, size, c, anchor, weight, mono }
// cast    { id: 'hoot' | 'dot', x, y }                               a character badge with its name
// screens { id, x, y, w, h, lines: [...] }                           the output screen
// cards   { id, x, y, w, lines: [...], cur: [index] }                a code card, the current lines lit
// Colours are names (a accent, b second, c flame, ok, bad, m muted, t text); never literal colours.
const ST_VIEW = { w: 640, h: 360 };
const ST_MONO_W = 0.6; // width of one monospace character, in font sizes
function stTokW(text, size) { return Math.round(String(text).length * (size || 18) * ST_MONO_W + 22); }
function stScene() {
  const out = {};
  Array.prototype.slice.call(arguments).forEach((L) => {
    if (!L) return;
    Object.keys(L).forEach((k) => {
      const cur = out[k] || [];
      (L[k] || []).forEach((it) => { const i = cur.findIndex((c) => c.id === it.id); if (i >= 0) cur[i] = it; else cur.push(it); });
      out[k] = cur;
    });
  });
  return out;
}
function stFlatten(scene, C, focus) {
  const R = [], P = [], O = [], T = [], H = [];
  const F = {}; (focus || []).forEach((f) => { F[f] = 1; });
  // A focus on characters alone only rings them; a focus on scene items dims everything else.
  const hasF = (focus || []).some((f) => f.indexOf('cast:') !== 0);
  const dim = (id) => (hasF && !F[id] ? 0.38 : 1);
  const dimT = (id) => (hasF && !F[id] ? 0.6 : 1);
  const col = (c, d) => C[c] || C[d] || C.t;
  const text = (k, x, y, s, o) => T.push({ k, x, y, text: String(s), fill: o.fill, size: o.size || 18, weight: o.weight || 500, anchor: o.anchor || 'middle', op: o.op === undefined ? 1 : o.op, mono: !!o.mono });
  const halo = (id, x, y, w, h, rx) => { if (F[id]) H.push({ k: 'h:' + id, x: x - 6, y: y - 6, w: w + 12, h: h + 12, rx: rx + 6 }); };
  (scene.screens || []).forEach((s) => {
    const op = dim(s.id);
    R.push({ k: 'sc:' + s.id, x: s.x, y: s.y, w: s.w, h: s.h, rx: 12, fill: C.sunk, stroke: C.l, sw: 2, dash: '', op });
    text('sct:' + s.id, s.x + 14, s.y + 22, 'Output', { fill: C.m, size: 14, anchor: 'start', weight: 600, op: dimT(s.id) });
    (s.lines || []).forEach((l, i) => text('scl:' + s.id + ':' + i, s.x + 14, s.y + 52 + i * 28, l, { fill: C.t, size: 20, anchor: 'start', mono: true, op: dimT(s.id) }));
    halo(s.id, s.x, s.y, s.w, s.h, 12);
  });
  (scene.cards || []).forEach((cd) => {
    const op = dim(cd.id), h = 20 + cd.lines.length * 30;
    R.push({ k: 'cd:' + cd.id, x: cd.x, y: cd.y, w: cd.w, h, rx: 12, fill: C.bg, stroke: C.l, sw: 2, dash: '', op });
    cd.lines.forEach((l, i) => {
      const lit = (cd.cur || []).includes(i);
      if (lit) R.push({ k: 'cdl:' + cd.id + ':' + i, x: cd.x + 4, y: cd.y + 10 + i * 30, w: cd.w - 8, h: 30, rx: 6, fill: C.a, stroke: 'none', sw: 0, dash: '', op: 0.18 * op });
      text('cdt:' + cd.id + ':' + i, cd.x + 14, cd.y + 32 + i * 30, l, { fill: lit ? C.t : C.t2, size: 18, anchor: 'start', mono: true, weight: lit ? 700 : 500, op: dimT(cd.id) });
    });
    halo(cd.id, cd.x, cd.y, cd.w, h, 12);
  });
  (scene.arrows || []).forEach((a) => {
    const [x1, y1] = a.from, [x2, y2] = a.to, L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L, s = 10;
    const c = col(a.c, 'm'), op = dim(a.id);
    P.push({ k: 'ar:' + a.id, pts: [[x1, y1], [x2 - ux * 6, y2 - uy * 6]], mode: 'L', fill: 'none', stroke: c, sw: a.thin ? 2 : 3, dash: a.dash ? (a.thin ? '5 5' : '7 7') : '', op });
    P.push({ k: 'ah:' + a.id, pts: [[x2, y2], [x2 - ux * s - uy * s * 0.6, y2 - uy * s + ux * s * 0.6], [x2 - ux * s + uy * s * 0.6, y2 - uy * s - ux * s * 0.6]], mode: 'Z', fill: c, stroke: 'none', sw: 0, dash: '', op });
    if (a.label) text('arl:' + a.id, (x1 + x2) / 2 + (a.lx || 0), (y1 + y2) / 2 + (a.ly === undefined ? -10 : a.ly), a.label, { fill: C.t2, size: 15, op: dimT(a.id) });
  });
  (scene.boxes || []).forEach((b) => {
    const c = col(b.c, 'l'), op = dim(b.id), opT = dimT(b.id), size = b.size || 22;
    R.push({ k: 'b:' + b.id, x: b.x, y: b.y, w: b.w, h: b.h, rx: b.rx === undefined ? 12 : b.rx, fill: b.solid ? C.a : C.sunk, stroke: b.solid ? C.a : c, sw: 2.5, dash: b.dash ? '7 6' : '', op });
    if (b.text !== undefined && b.text !== '') text('bt:' + b.id, b.x + b.w / 2, b.y + b.h / 2 + size * 0.36, b.text, { fill: b.solid ? C.on : C.t, size, weight: 700, mono: b.mono !== false, op: opT });
    if (b.tag) {
      const tw = stTokW(b.tag, 15) - 6;
      R.push({ k: 'bg:' + b.id, x: b.x + 12, y: b.y - 13, w: tw, h: 26, rx: 7, fill: col(b.tc, 'a'), stroke: 'none', sw: 0, dash: '', op });
      text('bgt:' + b.id, b.x + 12 + tw / 2, b.y + 5, b.tag, { fill: C.on, size: 15, weight: 700, mono: true, op });
    }
    if (b.sub) text('bs:' + b.id, b.x + b.w / 2, b.y + b.h + 22, b.sub, { fill: C.t2, size: 15, op: opT, mono: !!b.subMono });
    halo(b.id, b.x, b.y, b.w, b.h, 12);
  });
  (scene.tokens || []).forEach((k) => {
    const size = k.size || 18, w = k.w || stTokW(k.text, size), op = dim(k.id);
    R.push({ k: 'k:' + k.id, x: k.x - w / 2, y: k.y - 18, w, h: 36, rx: 9, fill: k.solid ? C.a : C.sunk, stroke: k.solid ? C.a : col(k.c, 'l'), sw: 2, dash: k.dash ? '5 5' : '', op });
    text('kt:' + k.id, k.x, k.y + size * 0.36, k.text, { fill: k.solid ? C.on : C.t, size, weight: 600, mono: k.mono !== false, op: dimT(k.id) });
    if (k.sub) text('ks:' + k.id, k.x, k.y + 40, k.sub, { fill: C.t2, size: 14, mono: true, op: dimT(k.id) });
    halo(k.id, k.x - w / 2, k.y - 18, w, 36, 9);
  });
  (scene.dots || []).forEach((d) => O.push({ k: 'dt:' + d.id, cx: d.x, cy: d.y, r: d.r || 5, fill: col(d.c, 't2'), stroke: 'none', sw: 0, dash: '', op: dim(d.id) }));
  (scene.cast || []).forEach((p) => {
    const who = START_CAST[p.id] || START_CAST.hoot, r = p.r || 26, op = dim('cast:' + p.id);
    const solid = p.id === 'dot', c = solid ? C.a : p.id === 'bolt' ? C.b : p.id === 'penny' ? C.c : p.id === 'pip' ? C.ok : C.t2;
    O.push({ k: 'cs:' + p.id, cx: p.x, cy: p.y, r, fill: solid ? C.a : C.sunk, stroke: c, sw: 2.5, dash: '', op });
    text('csi:' + p.id, p.x, p.y + 8, who.initial, { fill: solid ? C.on : C.t, size: 22, weight: 800, op });
    text('csn:' + p.id, p.x, p.y + r + 24, who.name, { fill: C.t2, size: 17, weight: 600, op: dimT('cast:' + p.id) });
    if (F['cast:' + p.id]) H.push({ k: 'h:cast:' + p.id, x: p.x - r - 6, y: p.y - r - 6, w: 2 * r + 12, h: 2 * r + 12, rx: r + 6 });
  });
  (scene.labels || []).forEach((l) => text('l:' + l.id, l.x, l.y, l.text, { fill: col(l.c, 't'), size: l.size || 18, weight: l.weight || 500, anchor: l.anchor || 'middle', mono: !!l.mono, op: (l.op === undefined ? 1 : l.op) * dimT(l.id) }));
  return { rects: R, paths: P, tags: [], circles: O, texts: T, halos: H };
}
// Problems in a scene: missing ids, duplicates, items off the canvas, NaN.
function stSceneProblems(scene, focus, view) {
  const V = view || ST_VIEW;
  const out = [], ids = {};
  ['boxes', 'tokens', 'arrows', 'labels', 'screens', 'cards', 'dots'].forEach((k) => (scene[k] || []).forEach((it) => {
    if (!it.id) out.push(k + ' item without an id');
    else if (ids[it.id]) out.push('duplicate id ' + it.id); else ids[it.id] = 1;
    let xs, ys;
    if (k === 'arrows') { xs = [it.from[0], it.to[0]]; ys = [it.from[1], it.to[1]]; }
    else if (k === 'tokens') { const w = it.w || stTokW(it.text, it.size); xs = [it.x - w / 2, it.x + w / 2]; ys = [it.y - 18, it.y + 18]; }
    else if (k === 'labels' || k === 'dots') { xs = [it.x]; ys = [it.y]; }
    else if (k === 'cards') { xs = [it.x, it.x + it.w]; ys = [it.y, it.y + 20 + it.lines.length * 30]; }
    else { xs = [it.x, it.x + (it.w || 0)]; ys = [it.y, it.y + (it.h || 0)]; }
    if (xs.concat(ys).some((v) => typeof v !== 'number' || !isFinite(v))) out.push(it.id + ' has a bad number');
    else if (xs.some((v) => v < -2 || v > V.w + 2) || ys.some((v) => v < -2 || v > V.h + 2)) out.push(it.id + ' is off the canvas');
  }));
  (scene.cast || []).forEach((p) => { if (!START_CAST[p.id]) out.push('unknown cast ' + p.id); ids['cast:' + p.id] = 1; });
  (focus || []).forEach((f) => { if (!ids[f]) out.push('focus on missing id ' + f); });
  return out;
}
// Short-hands used by chapters.js.
function stVar(id, name, value, x, y, o) { return Object.assign({ id, tag: name, text: value, x, y, w: (o && o.w) || Math.max(120, stTokW(value, 22) + 16), h: 64 }, o || {}); }
function stBeat(who, say, scene, focus, line) { return { who, say, scene, focus: focus || [], line: line === undefined ? null : line }; }

// Visuals for the later levels, built from the same vocabulary (scene layers to pass to stScene).
// The call stack as a pile of plates: frames bottom first, the top plate lit.
function stPlates(frames, x, y, o) {
  const w = (o && o.w) || 220, h = 40, gap = 6;
  return { boxes: frames.map((f, i) => ({ id: 'plate' + i, x, y: y - (i + 1) * (h + gap), w, h, rx: 20, text: f, size: 16, solid: i === frames.length - 1 })) };
}
// Names pointing at objects: names on the left, objects on the right, an arrow from each name to its object.
function stRefs(names, objects, x, y) {
  const ob = objects.map((ob, i) => ({ id: 'obj:' + ob.id, x: x + 240, y: y + i * 84, w: 180, h: 60, text: ob.text, size: 16, sub: ob.sub }));
  const nm = names.map(([name], i) => ({ id: 'name:' + name, x, y: y + 12 + i * 60, text: name, w: 90 }));
  const at = {}; ob.forEach((b, i) => { at[objects[i].id] = b; });
  return { boxes: ob, tokens: nm.map((t) => Object.assign(t, { x: t.x + 45 })),
    arrows: names.map(([name, to], i) => ({ id: 'ref:' + name, from: [x + 94, y + 12 + i * 60], to: [at[to].x - 4, at[to].y + 30], c: 'a' })) };
}
// The event loop: a queue of waiting jobs, the job running now, and what is done.
function stQueue(waiting, running, done, y) {
  return stScene({ labels: [{ id: 'qw', x: 40, y: y - 30, text: 'Waiting', anchor: 'start', c: 'm', size: 15 }, { id: 'qr', x: 300, y: y - 30, text: 'Running', anchor: 'start', c: 'm', size: 15 }, { id: 'qd', x: 470, y: y - 30, text: 'Done', anchor: 'start', c: 'm', size: 15 }] },
    { tokens: waiting.map((j, i) => ({ id: 'job:' + j, x: 100, y: y + i * 46, text: j, w: 120 })) },
    { tokens: running ? [{ id: 'job:' + running, x: 360, y, text: running, w: 120, solid: true }] : [] },
    { tokens: done.map((j, i) => ({ id: 'job:' + j, x: 540, y: y + i * 46, text: j, w: 120 })) });
}

// Objects for the Level 3 stories: a box with a type tag and one row per field. fields: [[name, value]] where a value
// that starts with '→' is drawn as a dot (the start of an arrow). Returns scene layers; dots sit at x + w - 16.
function stObj(id, tag, x, y, fields, o) {
  const w = (o && o.w) || 200, h = 22 + Math.max(1, fields.length) * 40;
  const rows = fields.map(([n, v], i) => ({ n, v, y: y + 32 + i * 40 }));
  return {
    boxes: [Object.assign({ id, tag, x, y, w, h, text: '', tc: (o && o.tc) || 'a', c: (o && o.c) || 'l', dash: o && o.dash }, o && o.box)],
    labels: rows.map((r, i) => ({ id: id + ':n' + i, x: x + 14, y: r.y + 5, text: r.n, anchor: 'start', mono: true, size: 15, c: 't2' })),
    tokens: rows.filter((r) => r.v !== '' && String(r.v).charAt(0) !== '→').map((r) => ({ id: id + ':v' + rows.indexOf(r), x: x + w - 14 - stTokW(r.v, 15) / 2, y: r.y, text: String(r.v), size: 15, solid: o && (o.lit || []).includes(r.n) })),
    dots: rows.filter((r) => String(r.v).charAt(0) === '→').map((r) => ({ id: id + ':d' + rows.indexOf(r), x: x + w - 16, y: r.y }))
  };
}
// The family tree: classes as boxes, an arrow from each child up to its parent. nodes: [[id, name, x, y, parent id]].
function stFamily(nodes, o) {
  const w = (o && o.w) || 150, h = 52, at = {};
  nodes.forEach((n) => { at[n[0]] = n; });
  return {
    boxes: nodes.map(([id, name, x, y]) => ({ id: 'cls:' + id, x, y, w, h, text: name, size: 17, tag: 'class', tc: 'b', c: 'b', solid: o && (o.lit || []).includes(id) })),
    arrows: nodes.filter((n) => n[4] && at[n[4]]).map(([id, , x, y, p]) => ({ id: 'isa:' + id, from: [x + w / 2, y - 14], to: [at[p][2] + w / 2, at[p][3] + h + 4], c: 'm', label: (o && o.noLabel) ? '' : 'is a', lx: 22, ly: 4 }))
  };
}

// ---------- "Watch it run" as a picture ----------
// The call stack is a pile of plates (the main program at the bottom, the running call on top). A name holding a plain
// value shows it on its plate; a name that points at an object (a list, a dict, an object, a class, a function worth
// showing) gets an arrow to that object's box. Classes form a family tree above the objects, each child pointing to
// its parent. One layout for every step of a trace, so the canvas never jumps and each step eases into the next.
const ST_MEM = { plateX: 8, plateW: 276, row: 40, heapX: 330, objW: 236, clsW: 140, gap: 16, top: 40 };
function stMemNeeded(trace) { return !!trace && (trace.steps || []).some((s) => s.h || (s.s || []).length > 1); }
function stMemShown(step) {
  const H = step.h || {}, refs = {}, fromFrame = {}, fromField = {};
  const bump = (id, o) => { if (!id || !H[id]) return; refs[id] = (refs[id] || 0) + 1; if (o) o[id] = 1; };
  (step.s || []).forEach((f, fi) => f[2].forEach((v) => { if (v[3]) { bump(v[3]); if (fi > 0) fromFrame[v[3]] = 1; } }));
  if (step.rr) { bump(step.rr); fromFrame[step.rr] = 1; }
  Object.keys(H).forEach((id) => { const o = H[id]; o[2].forEach((fl) => bump(fl[3], fromField)); bump(o[3], fromField); (o[4] || []).forEach((b) => bump(b, fromField)); });
  const subs = {}; Object.keys(H).forEach((id) => (H[id][4] || []).forEach((b) => { subs[b] = 1; }));
  const show = {};
  Object.keys(H).forEach((id) => {
    const [, kind, fields, , bases] = H[id];
    if (kind === 'function') show[id] = fields.length > 0 || refs[id] > 1 || !!fromFrame[id] || !!fromField[id];
    else if (kind === 'class') show[id] = !!fromField[id] || (bases || []).length > 0 || !!subs[id] || refs[id] > 1;
    else show[id] = true;
  });
  return { show, fromField };
}
// The layout of one step: plates, class boxes and object boxes with their positions (canvas height not applied yet).
function stMemLayout(step) {
  const H = step.h || {}, { show } = stMemShown(step), M = ST_MEM;
  // classes by depth in the family tree
  const depth = {};
  const dOf = (id, seen) => { if (depth[id] !== undefined) return depth[id]; if ((seen || {})[id]) return 0; const bs = (H[id][4] || []).filter((b) => show[b]); const d = bs.length ? 1 + Math.max(...bs.map((b) => dOf(b, Object.assign({ [id]: 1 }, seen)))) : 0; depth[id] = d; return d; };
  const classes = Object.keys(H).filter((id) => H[id][1] === 'class' && show[id]);
  classes.forEach((id) => dOf(id));
  const boxes = {};
  let y = M.top;
  const levels = Math.max(-1, ...classes.map((id) => depth[id])) + 1;
  for (let d = 0; d < levels; d++) {
    const row = classes.filter((id) => depth[id] === d);
    let hRow = 0;
    row.forEach((id, i) => {
      const o = H[id], rows = o[2].length + (o[5].length ? 1 : 0), h = 22 + Math.max(1, rows) * 34;
      boxes[id] = { x: M.heapX + i * (M.clsW + 12), y, w: M.clsW, h, cls: true };
      hRow = Math.max(hRow, h);
    });
    y += hRow + 34;
  }
  // other objects: column B if a name on a plate points at them, column C if only other objects do
  const onPlate = {};
  (step.s || []).forEach((f) => f[2].forEach((v) => { if (v[3]) onPlate[v[3]] = 1; }));
  if (step.rr) onPlate[step.rr] = 1;
  const others = Object.keys(H).filter((id) => H[id][1] !== 'class' && show[id]);
  const colY = [y + (levels ? 10 : 0), y + (levels ? 10 : 0)];
  others.forEach((id) => {
    const o = H[id], col = onPlate[id] ? 0 : 1;
    const summary = stMemSummary(o, show);
    const rows = summary ? 1 : Math.max(1, o[2].length), h = 22 + rows * 40;
    boxes[id] = { x: M.heapX + col * (M.objW + 44), y: colY[col], w: M.objW, h, summary };
    colY[col] += h + M.gap + 8;
  });
  // plates, main program first
  const plates = (step.s || []).map((f, fi) => {
    const vars = f[2];
    return { key: fi, name: f[0], vars, h: 26 + Math.max(1, vars.length) * M.row };
  });
  const stackH = plates.reduce((n, p) => n + p.h + 18, 0);
  const heapH = Math.max(y, colY[0], colY[1]);
  const wide = Math.max(M.heapX + M.objW, ...Object.keys(boxes).map((id) => boxes[id].x + boxes[id].w)) + 12;
  return { H, show, boxes, plates, stackH: stackH + M.top, heapH, w: Math.max(640, wide) };
}
// A list, tuple or set of plain values reads best on one line: [3, 1, 4].
function stMemSummary(o, show) {
  if (!['list', 'tuple', 'set'].includes(o[1])) return '';
  if (o[2].some((fl) => fl[3] && show[fl[3]])) return '';
  const vals = o[2].map((fl) => fl[1]);
  const s = o[1] === 'tuple' ? '(' + vals.join(', ') + (vals.length === 1 ? ',)' : ')') : o[1] === 'set' ? (vals.length ? '{' + vals.join(', ') + '}' : 'set()') : '[' + vals.join(', ') + ']';
  return s.length > 24 ? s.slice(0, 22) + '…]' : s;
}
// Every step of a trace as a scene, on one canvas: { w, h, scenes }.
function stMemScenes(trace) {
  const steps = (trace && trace.steps) || [];
  const lays = steps.map((s) => stMemLayout(s));
  const W = Math.max(640, ...lays.map((l) => l.w)), Hh = Math.max(240, ...lays.map((l) => Math.max(l.stackH, l.heapH) + 16));
  const clip = (s, n) => { s = String(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
  const scenes = lays.map((L, si) => {
    const step = steps[si], prev = si > 0 ? steps[si - 1] : null, M = ST_MEM;
    const was = {};
    if (prev) {
      (prev.s || []).forEach((f, fi) => f[2].forEach((v) => { was['v' + fi + ':' + v[0]] = v[3] || v[1]; }));
      Object.keys(prev.h || {}).forEach((id) => prev.h[id][2].forEach((fl) => { was[id + ':' + fl[0]] = fl[3] || fl[1]; }));
    }
    const S = { boxes: [], tokens: [], arrows: [], labels: [], dots: [] };
    S.labels.push({ id: 'hd:stack', x: M.plateX + 4, y: 20, text: 'Call stack', anchor: 'start', size: 14, weight: 700, c: 'm' });
    if (Object.keys(L.boxes).length) S.labels.push({ id: 'hd:heap', x: M.heapX, y: 20, text: 'Objects', anchor: 'start', size: 14, weight: 700, c: 'm' });
    const target = (id, fromX, fromY) => {
      const b = L.boxes[id]; if (!b) return null;
      if (b.x > fromX + 4) return [b.x - 3, Math.min(b.y + b.h - 10, Math.max(b.y + 14, fromY))];
      return fromY < b.y ? [b.x + b.w - 24, b.y - 3] : [b.x + b.w - 24, b.y + b.h + 3];
    };
    // plates, the pile standing on the bottom of the canvas
    let base = Hh - 12;
    L.plates.forEach((p, i) => {
      const top = i === L.plates.length - 1, y = base - p.h;
      base = y - 18;
      const running = top && step.e !== 'end';
      S.boxes.push({ id: 'plate:' + p.key, x: M.plateX, y, w: M.plateW, h: p.h, rx: 18, text: '', tag: clip(p.name, 22), tc: running ? 'a' : 'm', c: running ? 'a' : 'l' });
      if (!p.vars.length) S.labels.push({ id: 'pe:' + p.key, x: M.plateX + M.plateW / 2, y: y + 38, text: 'no names yet', size: 14, c: 'm' });
      p.vars.forEach((v, k) => {
        const ry = y + 34 + k * M.row, key = 'v' + p.key + ':' + v[0];
        const changed = !!prev && was[key] !== (v[3] || v[1]);
        S.labels.push({ id: 'pn:' + key, x: M.plateX + 14, y: ry + 5, text: clip(v[0], 11), anchor: 'start', mono: true, size: 15, c: 't2' });
        const ref = v[3] && L.boxes[v[3]];
        if (ref) {
          const at = [M.plateX + M.plateW - 18, ry];
          S.dots.push({ id: 'pd:' + key, x: at[0], y: at[1], c: changed ? 'a' : 't2' });
          const to = target(v[3], at[0], ry);
          if (to) S.arrows.push({ id: 'pa:' + key, from: [at[0] + 6, at[1]], to, c: 'a', thin: true });
        } else {
          const txt = v[2] === 'function' || v[2] === 'class' ? v[2] : clip(v[1], 14);
          S.tokens.push({ id: 'pv:' + key, x: M.plateX + M.plateW - 14 - stTokW(txt, 15) / 2, y: ry, text: txt, size: 15, solid: changed });
        }
      });
      if (top && step.e === 'return') {
        const txt = 'returns ' + clip(step.r, 12);
        S.tokens.push({ id: 'ret', x: M.plateX + M.plateW - 8 - stTokW(txt, 14) / 2, y: y - 2, text: txt, size: 14, solid: true });
        if (step.rr && L.boxes[step.rr]) { const to = target(step.rr, M.plateX + M.plateW, y); if (to) S.arrows.push({ id: 'ra', from: [M.plateX + M.plateW, y - 2], to, c: 'a', thin: true }); }
      }
    });
    // objects and classes
    Object.keys(L.boxes).forEach((id) => {
      const b = L.boxes[id], o = L.H[id], kind = o[1];
      const tag = kind === 'class' ? 'class ' + o[0] : kind === 'object' ? o[0] + ' object' : kind === 'function' ? 'function ' + o[0] : o[0];
      const fresh = !!prev && !(prev.h || {})[id];
      S.boxes.push({ id: 'ob:' + id, x: b.x, y: b.y, w: b.w, h: b.h, text: '', tag: clip(tag, b.cls ? 15 : 24), tc: b.cls ? 'b' : 'a', c: b.cls ? 'b' : fresh ? 'a' : 'l' });
      if (b.summary) {
        S.tokens.push({ id: 'os:' + id, x: b.x + b.w / 2, y: b.y + 32, text: b.summary, size: 15 });
        return;
      }
      const rh = b.cls ? 34 : 40;
      const fields = o[2].slice();
      if (!fields.length && !(b.cls && o[5].length)) S.labels.push({ id: 'oe:' + id, x: b.x + b.w / 2, y: b.y + 37, text: kind === 'function' ? 'remembers nothing' : kind === 'class' ? 'no shared data' : 'empty', size: 14, c: 'm' });
      fields.forEach((fl, k) => {
        const ry = b.y + 32 + k * rh, key = id + ':' + fl[0];
        const changed = !!prev && !fresh && was[key] !== (fl[3] || fl[1]);
        const nm = kind === 'list' || kind === 'tuple' ? '[' + fl[0] + ']' : fl[0];
        S.labels.push({ id: 'on:' + key, x: b.x + 12, y: ry + 5, text: clip(nm, b.cls ? 7 : 10), anchor: 'start', mono: true, size: 14, c: 't2' });
        const ref = fl[3] && L.boxes[fl[3]];
        if (ref) {
          const at = [b.x + b.w - 16, ry];
          S.dots.push({ id: 'od:' + key, x: at[0], y: at[1], c: changed ? 'a' : 't2' });
          const to = target(fl[3], at[0], ry);
          if (to) S.arrows.push({ id: 'oa:' + key, from: [at[0] + 6, at[1]], to, c: 'm', thin: true });
        } else {
          const txt = clip(fl[1], b.cls ? 7 : 12);
          S.tokens.push({ id: 'ov:' + key, x: b.x + b.w - 10 - stTokW(txt, 14) / 2, y: ry, text: txt, size: 14, solid: changed });
        }
      });
      if (b.cls && o[5].length) S.labels.push({ id: 'om:' + id, x: b.x + 12, y: b.y + 32 + fields.length * rh + 5, text: clip(o[5].join(' '), 15), anchor: 'start', mono: true, size: 13, c: 'm' });
      // an object points at its class (dashed), a class at its parent ("is a")
      if (o[3] && L.boxes[o[3]]) { const c = L.boxes[o[3]]; S.arrows.push({ id: 'oc:' + id, from: [b.x + 30, b.y - 14], to: [c.x + c.w / 2, c.y + c.h + 3], c: 'm', dash: true, thin: true }); }
      (o[4] || []).forEach((p) => { const c = L.boxes[p]; if (c) S.arrows.push({ id: 'isa:' + id + ':' + p, from: [b.x + b.w / 2, b.y - 14], to: [c.x + c.w / 2, c.y + c.h + 3], c: 'b', label: 'is a', lx: 20, ly: 4 }); });
    });
    return S;
  });
  return { w: W, h: Hh, scenes };
}

// The picture in words, for screen readers: the plates from the top, then the objects and what points at them.
function stMemSay(step) {
  if (!step) return '';
  const H = step.h || {}, { show } = stMemShown(step), name = {};
  Object.keys(H).forEach((id) => { const o = H[id]; name[id] = o[1] === 'class' ? 'class ' + o[0] : o[1] === 'object' ? 'a ' + o[0] + ' object' : o[1] === 'function' ? 'function ' + o[0] : 'a ' + o[0]; });
  const val = (v) => (v[3] && show[v[3]] ? v[0] + ' points at ' + name[v[3]] : v[0] + ' = ' + v[1]);
  const plates = (step.s || []).slice().reverse().map((f, i) => (i === 0 ? 'Top plate ' : 'then ') + f[0] + (f[2].length ? ': ' + f[2].map(val).join(', ') : ''));
  const objs = Object.keys(H).filter((id) => show[id]).map((id) => { const o = H[id]; return name[id] + (o[2].length ? ' holding ' + o[2].map((fl) => fl[0] + (fl[3] && show[fl[3]] ? ' → ' + name[fl[3]] : ' ' + fl[1])).join(', ') : '') + ((o[4] || []).length ? ', a child of ' + o[4].map((b) => name[b]).join(' and ') : ''); });
  const s = 'Call stack. ' + plates.join('; ') + '.' + (objs.length ? ' Objects: ' + objs.join('; ') + '.' : '');
  return s.length > 600 ? s.slice(0, 599) + '…' : s;
}

// ---------- "Where are you starting?" ----------
// Eight quick questions. A right answer marks its lessons as known: they stay open and can be skipped.
// Each question: q, code (optional, Python), choices, answer, marks (lesson ids).
const START_PLACEMENT = [
  { q: 'What does this line print?', code: 'print("4 + 4")', choices: ['4 + 4', '8', '"4 + 4"', 'An error'], answer: 0, marks: ['what-is-a-program', 'first-run'] },
  { q: 'What do 7 // 2 and 7 % 2 give?', code: 'print(7 // 2, 7 % 2)', choices: ['3 1', '3.5 0', '3 0.5', '1 3'], answer: 0, marks: ['calculator'] },
  { q: 'What does this print?', code: 'x = 3\nx = x + 2\nprint(x)', choices: ['5', '3', 'x + 2', 'An error'], answer: 0, marks: ['variables'] },
  { q: 'What happens here?', code: 'print("5" + 3)', choices: ['An error: text and a number cannot be added', '8', '53', '"53"'], answer: 0, marks: ['types', 'first-error'] },
  { q: 'Which line asks "is score equal to 10?"', choices: ['score == 10', 'score = 10', 'score => 10', 'if score is 10 then'], answer: 0, marks: ['compare'] },
  { q: 'What does this print?', code: 'x = 7\nif x > 10:\n    print("big")\nelif x > 5:\n    print("medium")\nelse:\n    print("small")', choices: ['medium', 'big', 'small', 'medium and small'], answer: 0, marks: ['if-else'] },
  { q: 'What does this print?', code: 'for i in range(1, 4):\n    print(i)', choices: ['1 2 3, one per line', '1 2 3 4, one per line', '0 1 2 3, one per line', '4'], answer: 0, marks: ['for-range'] },
  { q: 'What does this print?', code: 'nums = [4, 8, 15]\nprint(nums[1])', choices: ['8', '4', '15', 'An error'], answer: 0, marks: ['lists'] }
];
// The road map on the hub: one obvious next place after another.
const START_ROAD = [
  { id: 'start', title: 'Start here', sub: 'Level 1: from your first line to your first problem', href: 'Start.dc.html' },
  { id: 'first', title: 'First problems', sub: 'Easy problems that use only what you learned', href: 'Start.dc.html?view=first' },
  { id: 'patterns', title: 'Patterns', sub: 'The pattern map: the tricks behind most problems', href: 'Patterns.dc.html' },
  { id: 'sheet', title: 'Sheet', sub: 'The master sheet of problems, easiest first', href: 'Sheet.dc.html' }
];
// Level 1 up to the bridge: what a learner finishes before the first problems.
function startCore() { return START_CHAPTERS.filter((c) => startLevel(c) === 1 && c.part <= 5); }
function startInLevel(n) { return START_CHAPTERS.filter((c) => startLevel(c) === n); }
