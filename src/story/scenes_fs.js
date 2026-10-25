// ---------- Fast & Slow Pointers: the tortoise and the hare ----------
// When both stand on the same carriage, nudge them apart a little so both stay visible.
function fsPlace(st) {
  if (st.slow === st.fast) { st.L = st.slow - 0.5; st.R = st.fast + 0.5; } else { st.L = st.slow; st.R = st.fast; }
}

// Halfway Across the Bridge — Middle of the Linked List
function fsBridgeScene() {
  const vals = [5, 1, 8, 3, 7, 2, 6];
  const n = vals.length;
  const steps = [];
  let slow = 0, fast = 0;
  steps.push({ slow, fast, kind: 'intro',
    dialog: [say('narr', 'A train of 7 carriages. Find the middle one. You may not count them first.'), say('tortoise', 'I will walk one carriage at a time.'), say('hare', 'And I will hop two at a time. We both start at the front.')],
    nar: { kid: 'The tortoise walks one carriage per turn. The hare hops two per turn. When the hare reaches the end, the tortoise will be in the middle.', builder: 'slow = fast = head. Each turn: slow moves 1, fast moves 2. Stop when fast has no next carriage.', expert: 'fast covers 2t links after t turns while slow covers t, so slow sits at ⌊len/2⌋ when fast stops. One pass, O(1) space.' } });
  while (fast + 1 < n) {
    slow += 1; fast += 2;
    const last = fast + 1 >= n;
    steps.push({ slow, fast, kind: 'stride',
      dialog: [say('tortoise', 'One step. I am on carriage ' + slow + ', number ' + vals[slow] + '.'), say('hare', 'Two hops. I am on carriage ' + fast + ', number ' + vals[fast] + '.'), say('narr', last ? 'Hare, is there a carriage after yours?' : 'The hare has gone twice as far as the tortoise.')],
      nar: { kid: 'The tortoise moves one carriage to ' + vals[slow] + '. The hare moves two carriages to ' + vals[fast] + '. The hare is always twice as far along.', builder: 'slow = ' + slow + ', fast = ' + fast + '. fast.next is ' + (last ? 'None' : 'carriage ' + (fast + 1)) + '.', expert: 'Invariant: fast = 2 · slow. ' + (last ? 'fast is the tail, so the loop condition fails next.' : 'fast and fast.next exist, so another turn runs.') } });
  }
  steps.push({ slow, fast, kind: 'found',
    dialog: [say('hare', 'No more carriages after me. I am at the end.'), say('narr', 'Then the tortoise stands in the middle. Carriage ' + slow + ', number ' + vals[slow] + '.')],
    nar: { kid: 'The hare reached the last carriage. The tortoise went half as far, so the tortoise is in the middle: ' + vals[slow] + '.', builder: 'fast.next is None → stop. return slow (carriage ' + slow + ', value ' + vals[slow] + ').', expert: n + ' carriages, ' + slow + ' turns, O(1) space. With an even count, this loop stops on the second of the two middles.' } });
  const T = { intro: ['Both at the front', 'plain'], stride: ['The tortoise steps 1, the hare hops 2', 'cool'], found: ['The hare at the end → the tortoise is the middle', 'ok'] };
  steps.forEach((st) => {
    fsPlace(st);
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = vals.map((_, i) => (st.done ? (i === st.slow ? 'ok' : 'in') : i === st.slow ? 'cur' : i === st.fast ? 'buy' : i < st.slow ? 'stored' : 'in'));
    const nx = st.fast + 1 < n ? vals[st.fast + 1] : 'None';
    st.meter = { text: 'The tortoise ' + st.slow + ' · the hare ' + st.fast, pct: (st.fast / (n - 1)) * 100, mark: 50, markLabel: 'halfway' };
    st.watch = [['slow', st.slow, 'left'], ['fast', st.fast, 'right'], ['slow.val', vals[st.slow], 'left'], ['fast.val', vals[st.fast], 'right'], ['fast.next', nx, 'text'], ['result', st.done ? vals[st.slow] : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'middle-of-list', pattern: 'Fast & Slow Pointers', cast: 'fs', short: 'Halfway', visual: 'letters', items: vals.map(String), pitch: 74, tile: 58, tileH: 70, gap: 16, font: 28, width: 502,
    actorLabels: ['Tortoise', 'Hare'],
    goal: 'Find the middle carriage without counting first', status: ['Walking…', 'Middle found'],
    lines: { py: { intro: 2, stride: 5, found: 6 }, java: { intro: 2, stride: 5, found: 7 }, cpp: { intro: 2, stride: 5, found: 7 }, js: { intro: 2, stride: 5, found: 7 }, go: { intro: 2, stride: 5, found: 7 } },
    code: {
      py: [['def middleNode(head):', ''], ['    slow = fast = head', ''], ['    while fast and fast.next:', ''], ['        slow = slow.next', '  # the tortoise: one carriage'], ['        fast = fast.next.next', '  # the hare: two carriages'], ['    return slow', '']],
      java: [['ListNode middleNode(ListNode head) {', ''], ['    ListNode slow = head, fast = head;', ''], ['    while (fast != null && fast.next != null) {', ''], ['        slow = slow.next;', '  // the tortoise: one carriage'], ['        fast = fast.next.next;', '  // the hare: two carriages'], ['    }', ''], ['    return slow;', ''], ['}', '']],
      cpp: [['ListNode* middleNode(ListNode* head) {', ''], ['    ListNode *slow = head, *fast = head;', ''], ['    while (fast && fast->next) {', ''], ['        slow = slow->next;', '  // the tortoise: one carriage'], ['        fast = fast->next->next;', '  // the hare: two carriages'], ['    }', ''], ['    return slow;', ''], ['}', '']],
      js: [['function middleNode(head) {', ''], ['  let slow = head, fast = head;', ''], ['  while (fast && fast.next) {', ''], ['    slow = slow.next;', '  // the tortoise: one carriage'], ['    fast = fast.next.next;', '  // the hare: two carriages'], ['  }', ''], ['  return slow;', ''], ['}', '']],
      go: [['func middleNode(head *ListNode) *ListNode {', ''], ['    slow, fast := head, head', ''], ['    for fast != nil && fast.Next != nil {', ''], ['        slow = slow.Next', '  // the tortoise: one carriage'], ['        fast = fast.Next.Next', '  // the hare: two carriages'], ['    }', ''], ['    return slow', ''], ['}', '']]
    },
    rules: [['Both start at the front', 'intro'], ['The tortoise steps one, the hare hops two', 'stride'], ['The hare is at the end → the tortoise is the middle', 'found']],
    complexity: [['O(n)', 'The hare crosses the train once'], ['O(1)', 'two walkers, no notes']],
    quest: ['A train of 7 carriages stands on the bridge: 5, 1, 8, 3, 7, 2, 6.', 'The tortoise and the hare must find the middle carriage. Each carriage only knows the next one, and nobody may count the train first.'],
    example: ['head = 5 → 1 → 8 → 3 → 7 → 2 → 6', 'answer = the carriage holding 3'],
    hints: ['“If one walker goes twice as fast as the other, how far has the slow one gone when the fast one finishes?”', '“Start both at the front. Move the tortoise one carriage and the hare two, every turn.”', '“Stop when the hare has no carriage to hop to. The tortoise is then in the middle.”'],
    clues: ['each carriage only knows the next', 'the length is not given', 'one walk, no notes'],
    quizFb: ['“Writing every carriage in a notebook works, but the notebook grows with the train. Two walkers need no notes.”', '“Counting first, then walking again, takes two trips. The tortoise and the hare can do it in one.”', '“Yes! The hare goes twice as fast. When she finishes, the tortoise is halfway.”', '“Nobody can walk backward from the end of this train. Each carriage only points forward.”'],
    steps
  };
}

// The Tortoise and the Hare — Linked List Cycle
function fsLoopScene() {
  const vals = [3, 7, 1, 9, 4, 6];
  const next = [1, 2, 3, 4, 5, 2]; // carriage 5 links back to carriage 2
  const loopStart = 2, loopLen = 4;
  const steps = [];
  let slow = 0, fast = 0;
  const gapOf = (s, f) => (s < loopStart || f < loopStart ? '—' : ((s - f) % loopLen + loopLen) % loopLen);
  steps.push({ slow, fast, kind: 'intro', gap: '—',
    dialog: [say('narr', 'Six carriages. Does this track end, or does it loop back on itself?'), say('tortoise', 'I walk one carriage per turn.'), say('hare', 'I hop two. If there is a loop, I will catch up with the tortoise from behind.')],
    nar: { kid: 'The tortoise is slow and the hare is fast. On a straight track, the hare just reaches the end. On a loop, the hare comes round and meets the tortoise.', builder: 'slow = fast = head. Each turn: slow moves 1, fast moves 2. If they land on the same carriage, there is a loop.', expert: 'Floyd’s cycle check. Inside a loop the gap shrinks by 1 each turn, so they meet within one lap. O(n) time, O(1) space.' } });
  while (true) {
    slow = next[slow];
    const mid = next[fast];
    fast = next[mid];
    const wrapped = mid === 5 || fast < mid;
    const gap = gapOf(slow, fast);
    if (slow === fast) {
      steps.push({ slow, fast, kind: 'found', gap,
        dialog: [say('tortoise', 'One step to carriage ' + slow + '.'), say('hare', 'Two hops… and I land on carriage ' + fast + ' too!'), say('narr', 'You met. A straight track could never do that. The track loops: the answer is True.')],
        nar: { kid: 'The hare caught up with the tortoise on carriage ' + slow + ' (number ' + vals[slow] + '). That can only happen if the track goes round in a loop.', builder: 'slow == fast (carriage ' + slow + ') → return True.', expert: 'Met after 4 turns. Loop length ' + loopLen + ', tail length ' + loopStart + '. Total work is O(tail + loop).' } });
      break;
    }
    steps.push({ slow, fast, kind: wrapped ? 'wrap' : 'stride', gap,
      dialog: wrapped
        ? [say('tortoise', 'One step to carriage ' + slow + '.'), say('hare', 'Two hops: carriage ' + mid + ', then back round to carriage ' + fast + '!'), say('narr', 'Carriage 5 hooks back to carriage 2. The hare is now behind the tortoise, ' + gap + ' carriage' + (gap === 1 ? '' : 's') + ' back.')]
        : [say('tortoise', 'One step to carriage ' + slow + '.'), say('hare', 'Two hops to carriage ' + fast + '.'), say('narr', gap === '—' ? 'Not the same carriage. Keep going.' : 'Not the same carriage. The hare is ' + gap + ' carriages behind the tortoise in the loop.')],
      nar: { kid: wrapped ? 'the hare ran off carriage 5 and came back to carriage 2. The track is a loop! Now the hare is chasing the tortoise.' : 'The tortoise moves one carriage to ' + vals[slow] + '. The hare moves two carriages to ' + vals[fast] + '. They are not together yet.', builder: 'slow = ' + slow + ', fast = ' + fast + '. slow != fast → keep going.', expert: gap === '—' ? 'slow has not entered the loop yet; no gap to measure.' : 'Both are in the loop. Gap (fast behind slow) = ' + gap + '. It drops by exactly 1 per turn.' } });
  }
  const T = { intro: ['Both at the front', 'plain'], stride: ['The tortoise steps 1, the hare hops 2', 'cool'], wrap: ['The hare goes round the loop', 'warn'], found: ['They meet → the track loops', 'ok'] };
  steps.forEach((st) => {
    fsPlace(st);
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = vals.map((_, i) => (st.done ? (i === st.slow ? 'ok' : 'in') : i === st.slow ? 'cur' : i === st.fast ? (st.kind === 'wrap' ? 'hit' : 'buy') : 'in'));
    st.meter = { text: st.gap === '—' ? 'gap = —' : 'gap = ' + st.gap, pct: st.gap === '—' ? 0 : ((loopLen - st.gap) / loopLen) * 100, mark: 100, markLabel: 'gap 0 means they meet' };
    st.watch = [['slow', st.slow, 'left'], ['fast', st.fast, 'right'], ['slow.val', vals[st.slow], 'left'], ['fast.val', vals[st.fast], 'right'], ['gap in loop', st.gap, 'text'], ['result', st.done ? 'True' : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'linked-list-cycle', pattern: 'Fast & Slow Pointers', cast: 'fs', short: 'Loop Track', visual: 'letters', items: vals.map((v, i) => (i === 5 ? v + '↩' : String(v))), pitch: 78, tile: 60, tileH: 70, gap: 18, font: 28, width: 450,
    actorLabels: ['Tortoise', 'Hare'],
    goal: 'Does the track loop? (6↩ hooks back to carriage 2)', status: ['Running…', 'Loop found'],
    lines: { py: { intro: 2, stride: 5, wrap: 5, found: 7 }, java: { intro: 2, stride: 5, wrap: 5, found: 6 }, cpp: { intro: 2, stride: 5, wrap: 5, found: 6 }, js: { intro: 2, stride: 5, wrap: 5, found: 6 }, go: { intro: 2, stride: 5, wrap: 5, found: 7 } },
    code: {
      py: [['def hasCycle(head):', ''], ['    slow = fast = head', ''], ['    while fast and fast.next:', ''], ['        slow = slow.next', ''], ['        fast = fast.next.next', ''], ['        if slow is fast:', ''], ['            return True', '  # the hare caught up'], ['    return False', '']],
      java: [['boolean hasCycle(ListNode head) {', ''], ['    ListNode slow = head, fast = head;', ''], ['    while (fast != null && fast.next != null) {', ''], ['        slow = slow.next;', ''], ['        fast = fast.next.next;', ''], ['        if (slow == fast) return true;', '  // the hare caught up'], ['    }', ''], ['    return false;', ''], ['}', '']],
      cpp: [['bool hasCycle(ListNode* head) {', ''], ['    ListNode *slow = head, *fast = head;', ''], ['    while (fast && fast->next) {', ''], ['        slow = slow->next;', ''], ['        fast = fast->next->next;', ''], ['        if (slow == fast) return true;', '  // the hare caught up'], ['    }', ''], ['    return false;', ''], ['}', '']],
      js: [['function hasCycle(head) {', ''], ['  let slow = head, fast = head;', ''], ['  while (fast && fast.next) {', ''], ['    slow = slow.next;', ''], ['    fast = fast.next.next;', ''], ['    if (slow === fast) return true;', '  // the hare caught up'], ['  }', ''], ['  return false;', ''], ['}', '']],
      go: [['func hasCycle(head *ListNode) bool {', ''], ['    slow, fast := head, head', ''], ['    for fast != nil && fast.Next != nil {', ''], ['        slow = slow.Next', ''], ['        fast = fast.Next.Next', ''], ['        if slow == fast {', ''], ['            return true', '  // the hare caught up'], ['        }', ''], ['    }', ''], ['    return false', ''], ['}', '']]
    },
    rules: [['Both start at the front', 'intro'], ['The tortoise steps one, the hare hops two', 'stride'], ['The hare runs round the loop and comes up behind', 'wrap'], ['Same carriage → the track loops', 'found']],
    complexity: [['O(n)', 'they meet within one lap'], ['O(1)', 'two walkers, no notes']],
    quest: ['Six carriages sit on a track: 3, 7, 1, 9, 4, 6. The last one, 6, might hook back to an earlier carriage. Nobody can see the whole track.', 'The tortoise and the hare must find out: does the track end, or go round in a loop?'],
    example: ['head = 3 → 7 → 1 → 9 → 4 → 6 → back to 1', 'answer = True   (the track loops)'],
    hints: ['“On a straight track, a fast runner just reaches the end. What happens to a fast runner on a round track?”', '“Send the tortoise one carriage per turn and the hare two. Watch whether they ever stand on the same carriage.”', '“If the hare reaches the end, there is no loop. If they meet, there is one.”'],
    clues: ['the track may loop', 'you cannot see the whole track', 'no notebook allowed'],
    quizFb: ['“A notebook of visited carriages works, but it can grow as long as the train. The tortoise and the hare need no notes.”', '“On a loop there is no end to count to. You would walk forever.”', '“Yes! The hare gains one carriage per turn. On a loop she must catch the tortoise.”', '“There is no back end to start from. Each carriage only points forward.”'],
    steps
  };
}

SCENE_REGISTRY.push(fsBridgeScene, fsLoopScene);
PATTERN_KITS['Fast & Slow Pointers'] = { right: 2, spot: 'Why two speeds, not one walker?', ask: 'How should the tortoise and the hare search?',
  quiz: [['A notebook of every carriage', 'Write down each carriage you pass'], ['Count the train, then walk again', 'Walk to the end, then go back in'], ['Two walkers, two speeds', 'One steps once, the other steps twice'], ['Two friends from both ends', 'One at each end, walking inward']] };
STORY_CAST.tortoise = { name: 'Tortoise', initial: 'T', color: 'left', radius: '999px' };
STORY_CAST.hare = { name: 'Hare', initial: 'H', color: 'right', radius: '9px' };
