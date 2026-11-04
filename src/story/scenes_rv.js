// ---------- In-place Reversal: the conductor ----------

// Turning the Train Around — Reverse Linked List
function rvTrainScene() {
  const vals = [2, 7, 4, 9, 5];
  const n = vals.length;
  const hook = vals.map((_, i) => (i + 1 < n ? i + 1 : -1)); // where each carriage points; -1 is None
  const name = (i) => (i < 0 || i >= n ? 'None' : String(vals[i]));
  const sheet = (changed) => vals.map((v, i) => [String(v), '→ ' + name(hook[i]), i === changed ? 'fresh' : '']);
  const steps = [];
  let prev = -1, curr = 0;
  steps.push({ L: 0, kind: 'intro', prev, curr, nxt: 1, flipped: 0, board: sheet(-1),
    dialog: [say('narr', 'The train has five carriages: 2, 7, 4, 9, 5. Each hook points to the next carriage. Turn the train around.'), say('conductor', 'I will not move any carriage. I will turn each hook to point backward.'), say('narr', 'What do you hold while you work?'), say('conductor', 'Three things: the carriage behind me, the carriage I am on, and the carriage ahead.')],
    nar: { kid: 'The conductor walks from the front of the train. At each carriage, the conductor unhooks it from the carriage ahead and hooks it to the carriage behind.', builder: 'Start with prev = None (nothing behind) and curr = head (the first carriage). The hook of a carriage is its .next. Each turn, save nxt = curr.next (the carriage ahead). Then set curr.next = prev (turn the hook back). Then move prev and curr one step ahead.', expert: 'Three references (names that point at carriages) are enough. Each carriage’s hook is rewritten once. That takes O(n) time and O(1) extra space, meaning only a fixed bit of memory.' } });
  while (curr >= 0 && curr < n) {
    const nxt = hook[curr];
    hook[curr] = prev;
    const kind = prev < 0 ? 'tail' : 'flip';
    const flipped = curr + 1;
    steps.push({ L: curr, kind, prev, curr, nxt, flipped, board: sheet(curr),
      dialog: kind === 'tail'
        ? [say('conductor', 'Carriage ' + vals[curr] + '. I remember the next one, ' + name(nxt) + ', so I do not lose the rest of the train.'), say('conductor', 'Nothing is behind me, so ' + vals[curr] + ' now points to None.'), say('narr', 'The old front will be the new back.')]
        : [say('conductor', 'Carriage ' + vals[curr] + '. I remember the next one: ' + name(nxt) + '.'), say('conductor', 'Now ' + vals[curr] + ' points back to ' + vals[prev] + '.'), say('narr', flipped + ' of 5 carriages face backward.')],
      nar: { kid: kind === 'tail' ? 'The conductor unhooks carriage ' + vals[curr] + ' from ' + name(nxt) + '. There is nothing behind it, so it becomes the end of the turned train.' : (nxt < 0 ? 'Carriage ' + vals[curr] + ' is the last one, so nothing is ahead of it. The conductor hooks it back to ' + vals[prev] + '. Then the conductor steps forward.' : 'The conductor unhooks carriage ' + vals[curr] + ' from ' + name(nxt) + ' and hooks it back to ' + vals[prev] + '. Then the conductor steps forward.'), builder: 'nxt = ' + name(nxt) + '. Then set ' + vals[curr] + '.next = ' + name(prev) + ', prev = ' + vals[curr] + ', curr = ' + name(nxt) + '.', expert: 'The carriages already turned (' + flipped + ') start at prev. The carriages not yet touched start at curr. Saving nxt first keeps the rest of the train reachable.' } });
    prev = curr; curr = nxt;
  }
  steps.push({ L: prev, kind: 'found', prev, curr: -1, nxt: -1, flipped: n, board: sheet(-1),
    dialog: [say('conductor', 'No carriage is left ahead of me.'), say('narr', 'So the last carriage, ' + vals[prev] + ', is the new front. The train reads 5, 9, 4, 7, 2.')],
    nar: { kid: 'Every hook now points backward. The train reads 5, 9, 4, 7, 2.', builder: 'curr is None, so return prev (' + vals[prev] + ').', expert: n + ' hooks rewritten and no new carriages. A version where the function calls itself (recursion) is also O(n) time, but it needs O(n) extra memory.' } });
  const T = { intro: ['Every hook points forward', 'plain'], tail: ['First carriage → points to None', 'cool'], flip: ['Hook turned → points back', 'warn'], found: ['Train turned around', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = vals.map((_, i) => (st.done ? 'ok' : st.kind === 'intro' ? 'in' : i === st.curr ? 'cur' : i < st.curr ? 'stored' : 'in'));
    // the new train, read from its new front: 5, 9, 4, 7, 2 — tile p is carriage n - 1 - p
    st.cells2 = vals.map((_, p) => {
      const i = n - 1 - p;
      if (st.done) return 'ok';
      if (st.kind === 'intro' || i > st.curr) return 'future';
      return i === st.curr ? 'cur' : 'stored';
    });
    st.meter = { text: 'turned ' + st.flipped + ' / ' + n, pct: (st.flipped / n) * 100, mark: 100, markLabel: 'all ' + n + ' hooks turned' };
    st.watch = [['prev', name(st.prev), 'right'], ['curr', st.done ? 'None' : name(st.curr), 'left'], ['nxt', st.kind === 'intro' ? '—' : name(st.nxt), 'text'], ['curr.next', st.kind === 'intro' ? name(1) : st.done ? '—' : name(st.prev), 'text'], ['turned', st.flipped + ' / ' + n, 'text'], ['result', st.done ? '5→9→4→7→2' : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'reverse-linked-list', pattern: 'In-place Reversal', cast: 'rv', short: 'Turn Around', visual: 'letters', items: vals.map(String), items2: vals.slice().reverse().map(String), rowLabels: ['before', 'after'], pitch: 66, tile: 52, tileH: 54, gap: 14, font: 26, width: 316,
    board: true, boardTitle: 'The conductor’s hook sheet',
    actorLabels: ['Conductor · curr'],
    goal: 'Turn the train around by turning every hook', status: ['Re-coupling…', 'Train turned'],
    lines: { py: { intro: 2, tail: 5, flip: 5, found: 7 }, js: { intro: 2, tail: 5, flip: 5, found: 9 } },
    code: {
      py: [['def reverseList(head):', ''], ['    prev, curr = None, head', ''], ['    while curr:', ''], ['        nxt = curr.next', '  # remember the next carriage'], ['        curr.next = prev', '  # turn the hook backward'], ['        prev, curr = curr, nxt', ''], ['    return prev', '']],
      js: [['function reverseList(head) {', ''], ['  let prev = null, curr = head;', ''], ['  while (curr) {', ''], ['    const nxt = curr.next;', '  // remember the next carriage'], ['    curr.next = prev;', '  // turn the hook backward'], ['    prev = curr;', ''], ['    curr = nxt;', ''], ['  }', ''], ['  return prev;', ''], ['}', '']],
    },
    rules: [['Start at the front, nothing behind', 'intro'], ['First carriage → hook it to None', 'tail'], ['Next carriage → hook it to the one behind', 'flip'], ['Nothing ahead → the last carriage is the new front', 'found']],
    complexity: [['O(n)', 'each hook is turned once'], ['O(1)', 'three hands, no spare train']],
    quest: ['A train of five carriages, 2, 7, 4, 9, 5, has to leave the station facing the other way. There is no turntable and no spare track.', 'The conductor may only change where each carriage’s hook points. A hook that points to nothing is written as None. Can the conductor turn the whole train around?'],
    example: ['head = 2 → 7 → 4 → 9 → 5', 'answer = 5 → 9 → 4 → 7 → 2'],
    hints: ['“You cannot pick up the carriages. What can you change about each one?”', '“If you turn a hook to point backward, how do you still reach the rest of the train?”', '“Hold three things: the carriage behind, the carriage you are on, and the carriage ahead. Save the one ahead before you turn the hook.”'],
    clues: ['each carriage only knows the next one', 'no spare train allowed', 'every hook must point the other way'],
    quizFb: ['“Building a second train works, but it needs a whole spare train. The conductor has no spare track.”', '“A stack works too, but the stack holds every carriage. That needs O(n) extra memory: space that grows in step with n, the number of carriages.”', '“Yes! Walk once from the front and turn each hook as you go. Save the next carriage first.”', '“To swap from both ends you must walk backward, and these carriages only point forward.”'],
    steps
  };
}

SCENE_REGISTRY.push(rvTrainScene);
PATTERN_KITS['In-place Reversal'] = { right: 2, spot: 'Why turn the hooks, not the carriages?', ask: 'How should the conductor turn the train around?',
  quiz: [['Build a second train', 'Copy every carriage into a new train, back to front'], ['Pile carriages on a stack', 'Push them all, then take them off in reverse'], ['Turn hooks as you walk', 'Point each hook backward, one carriage at a time'], ['Swap numbers from both ends', 'One at each end, trading values']] };
STORY_CAST.conductor = { name: 'Conductor', initial: 'C', color: 'left', radius: '12px' };
