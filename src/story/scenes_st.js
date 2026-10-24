
// ---------- Stack: Pip, the plate-stacker at the busy canteen ----------
// Pip's pile is drawn in the side board, top plate first.

// The Stack of Plates — Valid Parentheses
function platesScene() {
  const s = ['(', '[', '{', '}', ']', ')', '(', ')'];
  const opener = { ')': '(', ']': '[', '}': '{' };
  const steps = [];
  const pile = [];   // indexes into s
  const matched = [];
  const shape = (c) => ({ '(': 'round', ')': 'round', '[': 'square', ']': 'square', '{': 'curly', '}': 'curly' })[c];
  const pileText = () => (pile.length ? pile.map((j) => s[j]).join(' ') : 'empty');
  const pileRows = (fresh) => pile.slice().reverse().map((j, k) => [s[j], k === 0 ? 'top · #' + j : '#' + j, j === fresh ? 'fresh' : '']);
  steps.push({ L: 0, kind: 'intro', board: [], pileText: 'empty', size: 0, top: '—', hits: [], matched: [],
    dialog: [say('hoot', 'Eight brackets on the order slip: ( [ { } ] ) ( ). Every opener needs its own closer, in the right order.'), say('pip', 'Each opener is a plate. I put it on my pile.'), say('hoot', 'And each closer?'), say('pip', 'It has to match the plate on top. Only the top one can come off.')],
    nar: { kid: 'Pip stacks plates at the canteen. An opening bracket is a new plate on top. A closing bracket must match the top plate, and then that plate comes off.', builder: 'pile = []. Opener → push it. Closer → the top of the pile must be its partner; pop it. If the pile is empty at the end, every bracket was matched.', expert: 'A closer can only pair with the most recent unmatched opener, which is exactly what a stack returns. One pass, O(n) time, O(n) space in the worst case.' } });
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!(c in opener)) {
      pile.push(i);
      steps.push({ L: i, kind: 'push', board: pileRows(i), pileText: pileText(), size: pile.length, top: c, hits: [], matched: matched.slice(),
        dialog: [say('pip', 'A ' + shape(c) + ' opener, “' + c + '”. On the pile it goes.'), say('hoot', 'The pile is ' + pile.length + (pile.length === 1 ? ' plate' : ' plates') + ' high. “' + c + '” is on top now.')],
        nar: { kid: '“' + c + '” opens something, so Pip puts a new plate on top of the pile. Now there ' + (pile.length === 1 ? 'is 1 plate' : 'are ' + pile.length + ' plates') + '.', builder: '“' + c + '” is an opener → pile.append("' + c + '"). pile = [' + pile.map((j) => s[j]).join(', ') + '].', expert: 'Push is O(1). The pile holds exactly the openers that are still waiting for a closer, newest on top.' } });
      continue;
    }
    const topIdx = pile.length ? pile[pile.length - 1] : -1;
    if (topIdx < 0 || s[topIdx] !== opener[c]) {
      steps.push({ L: i, kind: 'mismatch', board: pileRows(-1), pileText: pileText(), size: pile.length, top: topIdx < 0 ? '—' : s[topIdx], hits: [i], matched: matched.slice(),
        dialog: [say('pip', '“' + c + '” wants a “' + opener[c] + '” on top, but it isn’t there.'), say('hoot', 'Then the brackets are out of order. The answer is False.')],
        nar: { kid: 'The top plate doesn’t match “' + c + '”, so the brackets are not in order.', builder: 'top != "' + opener[c] + '" → return False.', expert: 'The first closer whose partner is not on top proves the string is invalid.' } });
      break;
    }
    pile.pop();
    matched.push(topIdx, i);
    steps.push({ L: i, kind: 'pop', board: pileRows(-1), pileText: pileText(), size: pile.length, top: pile.length ? s[pile[pile.length - 1]] : '—', hits: [topIdx, i], matched: matched.slice(),
      dialog: [say('pip', '“' + c + '” closes a ' + shape(c) + ' one. The top plate is “' + s[topIdx] + '”. A match!'), say('hoot', 'Take that plate off. ' + (pile.length ? 'Now “' + s[pile[pile.length - 1]] + '” is on top.' : 'The pile is empty again.'))],
      nar: { kid: '“' + c + '” matches the “' + s[topIdx] + '” on top of the pile, so Pip lifts that plate off. ' + (pile.length ? (pile.length === 1 ? '1 plate is' : pile.length + ' plates are') + ' still waiting.' : 'No plates are left.'), builder: 'top == "' + opener[c] + '" → pile.pop(). pile = [' + pile.map((j) => s[j]).join(', ') + '].', expert: 'Brackets ' + topIdx + ' and ' + i + ' pair up. Everything between them was already matched, so the pair nests correctly.' } });
  }
  steps.push({ L: s.length - 1, kind: 'found', board: [], pileText: 'empty', size: 0, top: '—', hits: [], matched: matched.slice(),
    dialog: [say('pip', 'That was the last bracket, and my pile is empty.'), say('hoot', 'Every opener found its closer, in the right order. The answer is True.')],
    nar: { kid: 'All the plates came off and the pile is empty. Every bracket found its partner!', builder: 'Loop ends with pile = [] → return True.', expert: '8 characters, 4 pushes and 4 pops. A non-empty pile here would mean some opener was never closed.' } });
  const T = { intro: ['Empty pile', 'plain'], push: ['Opener → new plate on top', 'cool'], pop: ['Closer matches the top → plate off', 'warn'], mismatch: ['Wrong plate on top → False', 'warn'], found: ['Pile empty → True', 'ok'] };
  steps.forEach((st, n) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = s.map((_, i) => {
      if (st.kind === 'intro') return 'future';
      if (st.done) return 'ok';
      if (st.hits.includes(i)) return 'hit';
      if (st.matched.includes(i)) return 'ok';
      if (i === st.L) return 'cur';
      if (i < st.L) return 'buy';
      return 'future';
    });
    const read = st.kind === 'intro' ? 0 : st.L + 1;
    st.meter = { text: 'pile: ' + st.pileText, pct: (read / s.length) * 100, mark: 100, markLabel: 'brackets read ' + read + ' / 8' };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['s[i]', st.kind === 'intro' ? '—' : '“' + s[st.L] + '”', 'left'], ['top', st.top === '—' ? '—' : '“' + st.top + '”', 'right'], ['pile', st.pileText === 'empty' ? 'empty' : st.pileText, 'right'], ['len(pile)', st.size, 'text'], ['result', st.done ? 'True' : st.kind === 'mismatch' ? 'False' : '…', st.done ? 'ok' : 'text']];
    st.n = n;
  });
  return {
    id: 'valid-parentheses', pattern: 'Stack', cast: 'st', short: 'Plates', visual: 'letters', items: s, pitch: 54, tile: 44, tileH: 60, gap: 10, font: 28, width: 422,
    board: true, boardTitle: 'Pip’s pile',
    actorLabels: ['Pip · i'],
    goal: 'Does every opener get the right closer?', status: ['Stacking plates…', 'All matched'],
    lines: { py: { intro: 2, push: 6, mismatch: 8, pop: 10, found: 11 }, java: { intro: 2, push: 6, mismatch: 8, pop: 10, found: 12 }, cpp: { intro: 2, push: 6, mismatch: 8, pop: 10, found: 12 }, js: { intro: 2, push: 6, mismatch: 8, pop: 10, found: 12 }, go: { intro: 2, push: 6, mismatch: 8, pop: 10, found: 13 } },
    code: {
      py: [['def isValid(s):', ''], ['    pile = []', ''], ['    pairs = {")": "(", "]": "[", "}": "{"}', ''], ['    for c in s:', ''], ['        if c not in pairs:', ''], ['            pile.append(c)', '  # an opener: new plate'], ['        elif not pile or pile[-1] != pairs[c]:', ''], ['            return False', '  # wrong plate on top'], ['        else:', ''], ['            pile.pop()', '  # top plate matches'], ['    return not pile', '']],
      java: [['boolean isValid(String s) {', ''], ['    Deque<Character> pile = new ArrayDeque<>();', ''], ['    for (char c : s.toCharArray()) {', ''], ['        int k = ")]}".indexOf(c);', ''], ['        if (k < 0)', ''], ['            pile.push(c);', '  // an opener: new plate'], ['        else if (pile.isEmpty() || pile.peek() != "([{".charAt(k))', ''], ['            return false;', '  // wrong plate on top'], ['        else', ''], ['            pile.pop();', '  // top plate matches'], ['    }', ''], ['    return pile.isEmpty();', ''], ['}', '']],
      cpp: [['bool isValid(string s) {', ''], ['    stack<char> pile;', ''], ['    for (char c : s) {', ''], ['        size_t k = string(")]}").find(c);', ''], ['        if (k == string::npos)', ''], ['            pile.push(c);', '  // an opener: new plate'], ['        else if (pile.empty() || pile.top() != "([{"[k])', ''], ['            return false;', '  // wrong plate on top'], ['        else', ''], ['            pile.pop();', '  // top plate matches'], ['    }', ''], ['    return pile.empty();', ''], ['}', '']],
      js: [['function isValid(s) {', ''], ['  const pile = [];', ''], ['  for (const c of s) {', ''], ['    const k = ")]}".indexOf(c);', ''], ['    if (k < 0)', ''], ['      pile.push(c);', '  // an opener: new plate'], ['    else if (!pile.length || pile[pile.length - 1] !== "([{"[k])', ''], ['      return false;', '  // wrong plate on top'], ['    else', ''], ['      pile.pop();', '  // top plate matches'], ['  }', ''], ['  return pile.length === 0;', ''], ['}', '']],
      go: [['func isValid(s string) bool {', ''], ['    pile := []rune{}', ''], ['    for _, c := range s {', ''], ['        k := strings.IndexRune(")]}", c)', ''], ['        if k < 0 {', ''], ['            pile = append(pile, c)', '  // an opener: new plate'], ['        } else if len(pile) == 0 || pile[len(pile)-1] != rune("([{"[k]) {', ''], ['            return false', '  // wrong plate on top'], ['        } else {', ''], ['            pile = pile[:len(pile)-1]', '  // top plate matches'], ['        }', ''], ['    }', ''], ['    return len(pile) == 0', ''], ['}', '']]
    },
    rules: [['Start with an empty pile', 'intro'], ['Opener → put a plate on top', 'push'], ['Closer matches the top → lift it off', 'pop'], ['Closer meets the wrong plate → False', 'mismatch'], ['Slip done and pile empty → True', 'found']],
    complexity: [['O(n)', 'each bracket is read once'], ['O(n)', 'the pile can hold every opener']],
    quest: ['Lunch rush at the canteen. An order slip comes in covered in brackets: ( [ { } ] ) ( ).', 'Pip must say whether every opening bracket is closed by the right kind, in the right order, using nothing but his pile of plates.'],
    example: ['s = "([{}])()"', 'answer = True'],
    hints: ['Old Hoot: “Which opener should a closer be matched with? The first one you saw, or the latest one still open?”', '“The latest one still open sounds like the top of a pile of plates.”', '“Opener: put a plate on. Closer: the top plate must match, then lift it off. An empty pile at the end means True.”'],
    clues: ['brackets must nest', 'the latest open one closes first', 'one pass through the slip'],
    quizFb: ['Old Hoot: “Matching every bracket against every other is O(n²), and it still can’t tell “([)]” from “([])”.”', 'Old Hoot: “Yes! The newest open bracket must close first, and that is the top of Pip’s pile.”', 'Old Hoot: “From both ends works for “(())”, but “()()” has its partners side by side, not mirrored.”', 'Old Hoot: “Counting opens and closes misses the order. “)(” has one of each and is still wrong.”'],
    steps
  };
}

// The Weather Watchers — Daily Temperatures
function weatherScene() {
  const temps = [73, 70, 68, 71, 69, 75, 72];
  const steps = [];
  const pile = [];
  const answer = temps.map(() => 0);
  const answered = [];
  const pileRows = (fresh) => pile.slice().reverse().map((j, k) => ['day ' + j, temps[j] + '°' + (k === 0 ? ' top' : ''), j === fresh ? 'fresh' : '']);
  const pileText = () => '[' + pile.join(', ') + ']';
  const snap = (o) => Object.assign({ board: pileRows(o.fresh), pileText: pileText(), size: pile.length, answer: answer.slice(), answered: answered.slice() }, o);
  steps.push(snap({ L: 0, kind: 'intro', fresh: -1, j: -1,
    dialog: [say('hoot', 'Seven days of weather: 73, 70, 68, 71, 69, 75, 72. For each day, how long until a warmer one?'), say('pip', 'Each day waits on my pile until a warmer day shows up.'), say('hoot', 'And when one does?'), say('pip', 'Every colder day on top gets its answer and comes off.')],
    nar: { kid: 'Pip writes each day on a plate and puts it on his pile. When a warmer day comes, the colder days on top finally know how long they waited.', builder: 'answer = [0] * n, pile = []. For each day i: while the top day is colder than today, pop it and set answer[top] = i − top. Then push i.', expert: 'The pile keeps days with falling temperatures from bottom to top. Each day is pushed once and popped at most once, so the whole pass is O(n).' } }));
  for (let i = 0; i < temps.length; i++) {
    while (pile.length && temps[pile[pile.length - 1]] < temps[i]) {
      const j = pile.pop();
      answer[j] = i - j;
      answered.push(j);
      steps.push(snap({ L: i, kind: 'pop', fresh: -1, j,
        dialog: [say('pip', 'Today is ' + temps[i] + '°. Day ' + j + ' on top was only ' + temps[j] + '°.'), say('hoot', 'Then day ' + j + ' waited ' + i + ' − ' + j + ' = ' + (i - j) + (i - j === 1 ? ' day' : ' days') + '. Lift that plate off.')],
        nar: { kid: 'Day ' + i + ' is warmer than day ' + j + ', the plate on top. So day ' + j + ' gets its answer: ' + (i - j) + (i - j === 1 ? ' day' : ' days') + ' of waiting. Pip takes that plate off.', builder: 'temps[' + j + '] = ' + temps[j] + ' < ' + temps[i] + ' → pop ' + j + ', answer[' + j + '] = ' + i + ' − ' + j + ' = ' + (i - j) + '.', expert: 'Day ' + i + ' is the first warmer day after day ' + j + ': every day between them is already off the pile or was colder than day ' + j + '.' } }));
    }
    pile.push(i);
    const below = pile.length > 1 ? pile[pile.length - 2] : -1;
    steps.push(snap({ L: i, kind: 'push', fresh: i, j: -1,
      dialog: [say('pip', 'Day ' + i + ', ' + temps[i] + '°. ' + (below < 0 ? 'Nobody else is waiting.' : 'Day ' + below + ' below is ' + temps[below] + '°, not colder.')), say('hoot', 'Day ' + i + ' waits on the pile for a warmer day.')],
      nar: { kid: 'Day ' + i + ' does not know its answer yet, so Pip puts it on top of the pile to wait. ' + (pile.length === 1 ? 'It is the only plate.' : 'There are ' + pile.length + ' plates now.'), builder: (below < 0 ? 'Pile is empty' : 'temps[' + below + '] = ' + temps[below] + ' ≥ ' + temps[i]) + ' → pile.append(' + i + '). pile = ' + pileText() + '.', expert: 'Temperatures on the pile, bottom to top: ' + pile.map((x) => temps[x]).join(' ≥ ') + '. They never rise toward the top.' } }));
  }
  steps.push(snap({ L: temps.length - 1, kind: 'found', fresh: -1, j: -1,
    dialog: [say('pip', 'The week is over. Days ' + pile.join(' and ') + ' are still on my pile.'), say('hoot', 'No warmer day came for them, so their answer stays 0. The full answer is [' + answer.join(', ') + '].')],
    nar: { kid: 'The week is done. Days still on the pile never saw a warmer day, so they get 0. Answer: ' + answer.join(', ') + '.', builder: 'Loop ends → return answer = [' + answer.join(', ') + ']. Days ' + pile.join(', ') + ' keep 0.', expert: '7 pushes and 5 pops: O(n) time, O(n) space. Checking every later day for every day would be O(n²).' } }));
  const T = { intro: ['Empty pile', 'plain'], push: ['No answer yet → wait on the pile', 'cool'], pop: ['Warmer today → top day gets its answer', 'warn'], found: ['Answer: [' + answer.join(', ') + ']', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    const onPile = st.board.map((r) => Number(r[0].slice(4)));
    st.cells = temps.map((_, i) => {
      if (st.kind === 'intro') return 'future';
      if (st.done) return st.answered.includes(i) ? 'ok' : 'out';
      if (i === st.j) return 'hit';
      if (i === st.L) return 'cur';
      if (st.answered.includes(i)) return 'ok';
      if (onPile.includes(i)) return 'buy';
      return 'future';
    });
    const n = st.answered.length;
    st.meter = { text: st.kind === 'intro' ? 'pile = []' : st.done ? 'answer = [' + st.answer.join(', ') + ']' : 'today ' + temps[st.L] + '°', pct: (n / 5) * 100, mark: 100, markLabel: 'days answered ' + n + ' / 5' };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['temps[i]', st.kind === 'intro' ? '—' : temps[st.L], 'left'], ['top', st.size ? 'day ' + st.board[0][0].slice(4) : '—', 'right'], ['pile', st.pileText, 'right'], ['answer', '[' + st.answer.join(', ') + ']', 'text'], ['result', st.done ? 'done' : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'daily-temperatures', pattern: 'Stack', cast: 'st', short: 'Weather', visual: 'letters', items: temps.map(String), pitch: 60, tile: 50, tileH: 62, gap: 10, font: 24, width: 410,
    board: true, boardTitle: 'Pip’s pile',
    actorLabels: ['Pip · i'],
    goal: 'For each day, how many days until a warmer one?', status: ['Watching the sky…', 'Every day answered'],
    lines: { py: { intro: 3, pop: 7, push: 8, found: 9 }, java: { intro: 3, pop: 7, push: 9, found: 11 }, cpp: { intro: 3, pop: 7, push: 9, found: 11 }, js: { intro: 3, pop: 7, push: 9, found: 11 }, go: { intro: 3, pop: 8, push: 10, found: 12 } },
    code: {
      py: [['def dailyTemperatures(temps):', ''], ['    answer = [0] * len(temps)', ''], ['    pile = []', '  # days still waiting'], ['    for i, t in enumerate(temps):', ''], ['        while pile and temps[pile[-1]] < t:', ''], ['            j = pile.pop()', ''], ['            answer[j] = i - j', '  # days waited'], ['        pile.append(i)', ''], ['    return answer', '']],
      java: [['int[] dailyTemperatures(int[] temps) {', ''], ['    int[] answer = new int[temps.length];', ''], ['    Deque<Integer> pile = new ArrayDeque<>();', '  // days still waiting'], ['    for (int i = 0; i < temps.length; i++) {', ''], ['        while (!pile.isEmpty() && temps[pile.peek()] < temps[i]) {', ''], ['            int j = pile.pop();', ''], ['            answer[j] = i - j;', '  // day j waited i - j days'], ['        }', ''], ['        pile.push(i);', ''], ['    }', ''], ['    return answer;', ''], ['}', '']],
      cpp: [['vector<int> dailyTemperatures(vector<int>& temps) {', ''], ['    vector<int> answer(temps.size(), 0);', ''], ['    stack<int> pile;', '  // days still waiting'], ['    for (int i = 0; i < temps.size(); i++) {', ''], ['        while (!pile.empty() && temps[pile.top()] < temps[i]) {', ''], ['            int j = pile.top(); pile.pop();', ''], ['            answer[j] = i - j;', '  // day j waited i - j days'], ['        }', ''], ['        pile.push(i);', ''], ['    }', ''], ['    return answer;', ''], ['}', '']],
      js: [['function dailyTemperatures(temps) {', ''], ['  const answer = new Array(temps.length).fill(0);', ''], ['  const pile = [];', '  // days still waiting'], ['  for (let i = 0; i < temps.length; i++) {', ''], ['    while (pile.length && temps[pile[pile.length - 1]] < temps[i]) {', ''], ['      const j = pile.pop();', ''], ['      answer[j] = i - j;', '  // day j waited i - j days'], ['    }', ''], ['    pile.push(i);', ''], ['  }', ''], ['  return answer;', ''], ['}', '']],
      go: [['func dailyTemperatures(temps []int) []int {', ''], ['    answer := make([]int, len(temps))', ''], ['    pile := []int{}', '  // days still waiting'], ['    for i, t := range temps {', ''], ['        for len(pile) > 0 && temps[pile[len(pile)-1]] < t {', ''], ['            j := pile[len(pile)-1]', ''], ['            pile = pile[:len(pile)-1]', ''], ['            answer[j] = i - j', '  // day j waited i - j days'], ['        }', ''], ['        pile = append(pile, i)', ''], ['    }', ''], ['    return answer', ''], ['}', '']]
    },
    rules: [['Start with an empty pile', 'intro'], ['Top day is colder than today → answer it and lift it off', 'pop'], ['Nothing colder on top → today waits on the pile', 'push'], ['Week over → leftovers keep 0', 'found']],
    complexity: [['O(n)', 'each day goes on and comes off once'], ['O(n)', 'a cold spell can fill the pile']],
    quest: ['Pip keeps a weather log pinned above the canteen sink. This week reads 73, 70, 68, 71, 69, 75 and 72 degrees.', 'For every day he wants to know how many days pass before a warmer one. If none ever comes, the answer is 0.'],
    example: ['temps = [73, 70, 68, 71, 69, 75, 72]', 'answer = [5, 2, 1, 2, 1, 0, 0]'],
    hints: ['Old Hoot: “A day can’t know its answer until a warmer day arrives. Where should it wait?”', '“When a warm day comes, which waiting days does it answer? The newest ones, from the top down, while they are colder.”', '“Pop while the top is colder and write i − top. Then push today. Whatever is left at the end gets 0.”'],
    clues: ['the next warmer day, for every day', 'days wait until they are answered', 'the newest waiting day is answered first'],
    quizFb: ['Old Hoot: “Scanning ahead from every day is O(n²). A whole cold month makes that slow.”', 'Old Hoot: “Yes! Waiting days sit on the pile, and a warm day clears colder ones from the top.”', 'Old Hoot: “Two friends from both ends compare far-apart days. Each day needs its nearest warmer day to the right.”', 'Old Hoot: “A running count says how many days passed, but not which day is still waiting. The pile remembers that.”'],
    steps
  };
}

SCENE_REGISTRY.push(platesScene, weatherScene);
PATTERN_KITS['Stack'] = { right: 1, spot: 'Why a pile, not a list?', ask: 'How should Pip keep track?',
  quiz: [['Check every pair', 'Compare each item with every other one'], ['A pile of plates', 'New things go on top, and the top comes off first'], ['Two friends from both ends', 'One at each end, walking inward'], ['A running count', 'Keep one number and add or subtract as you go']] };
STORY_CAST.pip = { name: 'Pip', initial: 'P', color: 'left', radius: '999px' };
