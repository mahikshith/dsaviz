// ---------- In-place Reversal: Cole the conductor ----------

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
    dialog: [say('hoot', 'Five carriages: 2, 7, 4, 9, 5. Each hook points to the next one. Turn the train around.'), say('cole', 'I will not move any carriage. I will just turn each hook to point backward.'), say('hoot', 'What do you hold while you work?'), say('cole', 'Three things: the carriage behind me, the one I am on, and the one ahead.')],
    nar: { kid: 'Cole walks from the front of the train. At each carriage he unhooks it from the one ahead and hooks it to the one behind.', builder: 'prev = None, curr = head. Each turn: save nxt = curr.next, set curr.next = prev, then move prev and curr one step on.', expert: 'In-place reversal with three references. Each node’s next is rewritten once: O(n) time, O(1) extra space.' } });
  while (curr >= 0 && curr < n) {
    const nxt = hook[curr];
    hook[curr] = prev;
    const kind = prev < 0 ? 'tail' : 'flip';
    const flipped = curr + 1;
    steps.push({ L: curr, kind, prev, curr, nxt, flipped, board: sheet(curr),
      dialog: kind === 'tail'
        ? [say('cole', 'Carriage ' + vals[curr] + '. I remember the next one, ' + name(nxt) + ', so I do not lose the train.'), say('cole', 'Nothing is behind me, so ' + vals[curr] + ' now points to None.'), say('hoot', 'The old front will be the new back.')]
        : [say('cole', 'Carriage ' + vals[curr] + '. I remember the next one: ' + name(nxt) + '.'), say('cole', 'Now ' + vals[curr] + ' points back to ' + vals[prev] + '.'), say('hoot', flipped + ' of 5 carriages face backward.')],
      nar: { kid: kind === 'tail' ? 'Cole unhooks carriage ' + vals[curr] + ' from ' + name(nxt) + '. There is nothing behind it, so it becomes the end of the turned train.' : 'Cole unhooks carriage ' + vals[curr] + ' from ' + name(nxt) + ' and hooks it back to ' + vals[prev] + '. Then he steps forward.', builder: 'nxt = ' + name(nxt) + '; ' + vals[curr] + '.next = ' + name(prev) + '; prev = ' + vals[curr] + ', curr = ' + name(nxt) + '.', expert: 'Invariant: prev heads the reversed prefix (' + flipped + ' node' + (flipped === 1 ? '' : 's') + '), curr heads the untouched suffix. Saving nxt first keeps the suffix reachable.' } });
    prev = curr; curr = nxt;
  }
  steps.push({ L: prev, kind: 'found', prev, curr: -1, nxt: -1, flipped: n, board: sheet(-1),
    dialog: [say('cole', 'No carriage left ahead of me.'), say('hoot', 'Then the last carriage, ' + vals[prev] + ', is the new front. The train reads 5, 9, 4, 7, 2.')],
    nar: { kid: 'Every hook now points backward. The train reads 5, 9, 4, 7, 2.', builder: 'curr is None → return prev (' + vals[prev] + ').', expert: n + ' rewrites, no new nodes. A recursive version is also O(n) but uses O(n) call stack.' } });
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
    board: true, boardTitle: 'Cole’s hook sheet',
    actorLabels: ['Cole · curr'],
    goal: 'Turn the train around by turning every hook', status: ['Re-coupling…', 'Train turned'],
    lines: { py: { intro: 2, tail: 5, flip: 5, found: 7 }, java: { intro: 2, tail: 5, flip: 5, found: 9 }, cpp: { intro: 2, tail: 5, flip: 5, found: 9 }, js: { intro: 2, tail: 5, flip: 5, found: 9 }, go: { intro: 2, tail: 6, flip: 6, found: 9 } },
    code: {
      py: [['def reverseList(head):', ''], ['    prev, curr = None, head', ''], ['    while curr:', ''], ['        nxt = curr.next', '  # remember the next carriage'], ['        curr.next = prev', '  # turn the hook backward'], ['        prev, curr = curr, nxt', ''], ['    return prev', '']],
      java: [['ListNode reverseList(ListNode head) {', ''], ['    ListNode prev = null, curr = head;', ''], ['    while (curr != null) {', ''], ['        ListNode nxt = curr.next;', '  // remember the next carriage'], ['        curr.next = prev;', '  // turn the hook backward'], ['        prev = curr;', ''], ['        curr = nxt;', ''], ['    }', ''], ['    return prev;', ''], ['}', '']],
      cpp: [['ListNode* reverseList(ListNode* head) {', ''], ['    ListNode *prev = nullptr, *curr = head;', ''], ['    while (curr) {', ''], ['        ListNode* nxt = curr->next;', '  // remember the next carriage'], ['        curr->next = prev;', '  // turn the hook backward'], ['        prev = curr;', ''], ['        curr = nxt;', ''], ['    }', ''], ['    return prev;', ''], ['}', '']],
      js: [['function reverseList(head) {', ''], ['  let prev = null, curr = head;', ''], ['  while (curr) {', ''], ['    const nxt = curr.next;', '  // remember the next carriage'], ['    curr.next = prev;', '  // turn the hook backward'], ['    prev = curr;', ''], ['    curr = nxt;', ''], ['  }', ''], ['  return prev;', ''], ['}', '']],
      go: [['func reverseList(head *ListNode) *ListNode {', ''], ['    var prev *ListNode', ''], ['    curr := head', ''], ['    for curr != nil {', ''], ['        nxt := curr.Next', '  // remember the next carriage'], ['        curr.Next = prev', '  // turn the hook backward'], ['        prev, curr = curr, nxt', ''], ['    }', ''], ['    return prev', ''], ['}', '']]
    },
    rules: [['Start at the front, nothing behind', 'intro'], ['First carriage → hook it to None', 'tail'], ['Next carriage → hook it to the one behind', 'flip'], ['Nothing ahead → the last carriage is the new front', 'found']],
    complexity: [['O(n)', 'each hook is turned once'], ['O(1)', 'three hands, no spare train']],
    quest: ['A train of five carriages, 2, 7, 4, 9, 5, has to leave the station the other way round. There is no turntable and no spare track.', 'Cole the conductor may only change where each carriage’s hook points. Can he turn the whole train around?'],
    example: ['head = 2 → 7 → 4 → 9 → 5', 'answer = 5 → 9 → 4 → 7 → 2'],
    hints: ['Old Hoot: “You cannot pick up the carriages. What can you change about each one?”', '“If you turn a hook to point backward, how do you still reach the rest of the train?”', '“Hold three things: the carriage behind, the one you are on, and the one ahead. Save the one ahead before you turn the hook.”'],
    clues: ['each carriage only knows the next', 'no spare train allowed', 'every hook must point the other way'],
    quizFb: ['Old Hoot: “Building a second train works, but it needs a whole spare train. Cole has no spare track.”', 'Old Hoot: “A stack works too, but the stack holds every carriage. That is O(n) extra space.”', 'Old Hoot: “Yes! Walk once from the front and turn each hook as you go. Just save the next carriage first.”', 'Old Hoot: “To swap from both ends you must walk backward, and these carriages only point forward.”'],
    steps
  };
}

SCENE_REGISTRY.push(rvTrainScene);
PATTERN_KITS['In-place Reversal'] = { right: 2, spot: 'Why turn the hooks, not the carriages?', ask: 'How should Cole turn the train around?',
  quiz: [['Build a second train', 'Copy every carriage into a new train, back to front'], ['Pile carriages on a stack', 'Push them all, then take them off in reverse'], ['Turn hooks as you walk', 'Point each hook backward, one carriage at a time'], ['Swap numbers from both ends', 'One at each end, trading values']] };
STORY_CAST.cole = { name: 'Cole', initial: 'Co', color: 'left', radius: '12px' };
