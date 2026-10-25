
// ---------- Greedy: the  stone-hopper who always leaps as far as he can ----------

// The Stepping Stones — Jump Game
function stonesScene() {
  const nums = [1, 2, 0, 1, 3, 0, 2];
  const last = nums.length - 1;
  const steps = [];
  let reach = 0;
  steps.push({ L: 0, kind: 'intro', reach: 0, prev: 0,
    dialog: [say('narr', 'Seven stones cross the river. The number on each stone is the longest leap the jumper can make from it.'), say('jumper', 'I don’t need to plan every route. I’ll just remember the farthest stone I could reach.'), say('narr', 'And if you ever stand on a stone past that mark?'), say('jumper', 'Then I could never have got there. I’d be stuck.')],
    nar: { kid: 'The jumper hops along the stones from the first one. He keeps one number in his head: the farthest stone he could get to so far.', builder: 'reach = 0. For each stone i: if i > reach, we are stuck. Otherwise reach = max(reach, i + nums[i]). If reach covers the last stone, return True.', expert: 'Every stone at or before reach is reachable, because reach only grows from stones we could stand on. One pass, O(n) time, O(1) space.' } });
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) {
      steps.push({ L: i, kind: 'stuck', reach, prev: reach,
        dialog: [say('jumper', 'Stone ' + i + ' is past my mark of ' + reach + '.'), say('narr', 'Then nobody can land here. The answer is False.')],
        nar: { kid: 'The jumper can only get as far as stone ' + reach + '. Stone ' + i + ' is out of reach, so he can’t cross.', builder: 'i = ' + i + ' > reach = ' + reach + ' → return False.', expert: 'No reachable stone leaps past ' + reach + ', so every later stone is unreachable too.' } });
      break;
    }
    const prev = reach;
    reach = Math.max(reach, i + nums[i]);
    const grew = reach > prev;
    if (reach >= last) {
      steps.push({ L: i, kind: 'found', reach, prev,
        dialog: [say('jumper', 'From stone ' + i + ' I can leap ' + nums[i] + ', all the way to stone ' + (i + nums[i]) + '.'), say('narr', 'That covers the last stone, number ' + last + '. The answer is True.')],
        nar: { kid: 'From stone ' + i + ', a leap of ' + nums[i] + ' lands at stone ' + (i + nums[i]) + '. That is past the far bank, so the jumper can cross!', builder: 'reach = max(' + prev + ', ' + i + ' + ' + nums[i] + ') = ' + reach + ' ≥ ' + last + ' → return True.', expert: 'Stopped after ' + (i + 1) + ' of ' + nums.length + ' stones. Once reach covers the end, the rest of the row can’t change the answer.' } });
      break;
    }
    steps.push(grew
      ? { L: i, kind: 'grow', reach, prev,
        dialog: [say('jumper', 'Stone ' + i + ' says ' + nums[i] + '. From here I could land on stone ' + (i + nums[i]) + '.'), say('narr', 'That beats your old mark of ' + prev + '. Your farthest stone is now ' + reach + '.')],
        nar: { kid: 'A leap of ' + nums[i] + ' from stone ' + i + ' reaches stone ' + (i + nums[i]) + '. That is farther than before, so the jumper moves his mark to ' + reach + '.', builder: 'i + nums[i] = ' + i + ' + ' + nums[i] + ' = ' + (i + nums[i]) + ' > ' + prev + ' → reach = ' + reach + '.', expert: 'reach is the maximum of j + nums[j] over every stone j ≤ i. It only ever grows, so one pass is enough.' } }
      : { L: i, kind: 'hold', reach, prev,
        dialog: [say('jumper', 'Stone ' + i + ' says ' + nums[i] + '. ' + (nums[i] === 0 ? 'I can’t leap at all from here.' : 'That only gets me to stone ' + (i + nums[i]) + '.')), say('narr', 'No matter. You already know you can reach stone ' + reach + '. Keep the old mark.')],
        nar: { kid: 'Stone ' + i + ' doesn’t help the jumper go any farther. His mark stays at stone ' + reach + ', and he keeps hopping.', builder: 'i + nums[i] = ' + (i + nums[i]) + ' ≤ ' + prev + ' → reach stays ' + reach + '.', expert: 'A weak stone is harmless while i ≤ reach. Only a stone past reach would end the walk.' } });
  }
  const T = { intro: ['Mark at stone 0', 'plain'], grow: ['Longer leap → move the mark', 'cool'], hold: ['Shorter leap → keep the mark', 'warn'], stuck: ['Past the mark → stuck', 'warn'], found: ['Mark covers the far bank → True', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = nums.map((_, i) => {
      if (st.kind === 'intro') return i === 0 ? 'cur' : 'future';
      if (st.done) return i <= st.L || i === last ? 'ok' : 'in';
      if (i === st.L) return st.kind === 'stuck' ? 'hit' : 'cur';
      if (i < st.L) return 'stored';
      if (i <= st.reach) return 'in';
      return 'future';
    });
    st.meter = { text: st.kind === 'intro' ? 'reach = 0' : 'reach = max(' + st.prev + ', ' + st.L + ' + ' + nums[st.L] + ') = ' + st.reach, pct: (Math.min(st.reach, last) / last) * 100, mark: 100, markLabel: 'far bank: stone ' + last };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['nums[i]', st.kind === 'intro' ? '—' : nums[st.L], 'left'], ['i + nums[i]', st.kind === 'intro' ? '—' : st.L + nums[st.L], 'right'], ['reach', st.reach, 'right'], ['last', last, 'text'], ['result', st.done ? 'True' : st.kind === 'stuck' ? 'False' : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'jump-game', pattern: 'Greedy', cast: 'gr', short: 'Stones', visual: 'letters', items: nums.map(String), pitch: 66, tile: 54, tileH: 64, gap: 12, font: 28, width: 450,
    actorLabels: ['Jumper · i'],
    goal: 'Can the jumper reach the last stone?', status: ['Hopping…', 'Far bank reached'],
    lines: { py: { intro: 2, stuck: 5, grow: 6, hold: 6, found: 8 }, java: { intro: 2, stuck: 5, grow: 6, hold: 6, found: 8 }, cpp: { intro: 2, stuck: 5, grow: 6, hold: 6, found: 8 }, js: { intro: 2, stuck: 5, grow: 6, hold: 6, found: 8 }, go: { intro: 2, stuck: 5, grow: 7, hold: 7, found: 9 } },
    code: {
      py: [['def canJump(nums):', ''], ['    reach = 0', '  # farthest stone so far'], ['    for i, step in enumerate(nums):', ''], ['        if i > reach:', ''], ['            return False', '  # past the mark: stuck'], ['        reach = max(reach, i + step)', ''], ['        if reach >= len(nums) - 1:', ''], ['            return True', ''], ['    return True', '']],
      java: [['boolean canJump(int[] nums) {', ''], ['    int reach = 0;', '  // farthest stone so far'], ['    for (int i = 0; i < nums.length; i++) {', ''], ['        if (i > reach)', ''], ['            return false;', '  // past the mark: stuck'], ['        reach = Math.max(reach, i + nums[i]);', ''], ['        if (reach >= nums.length - 1)', ''], ['            return true;', ''], ['    }', ''], ['    return true;', ''], ['}', '']],
      cpp: [['bool canJump(vector<int>& nums) {', ''], ['    int reach = 0;', '  // farthest stone so far'], ['    for (int i = 0; i < nums.size(); i++) {', ''], ['        if (i > reach)', ''], ['            return false;', '  // past the mark: stuck'], ['        reach = max(reach, i + nums[i]);', ''], ['        if (reach >= (int)nums.size() - 1)', ''], ['            return true;', ''], ['    }', ''], ['    return true;', ''], ['}', '']],
      js: [['function canJump(nums) {', ''], ['  let reach = 0;', '  // farthest stone so far'], ['  for (let i = 0; i < nums.length; i++) {', ''], ['    if (i > reach)', ''], ['      return false;', '  // past the mark: stuck'], ['    reach = Math.max(reach, i + nums[i]);', ''], ['    if (reach >= nums.length - 1)', ''], ['      return true;', ''], ['  }', ''], ['  return true;', ''], ['}', '']],
      go: [['func canJump(nums []int) bool {', ''], ['    reach := 0', '  // farthest stone so far'], ['    for i, step := range nums {', ''], ['        if i > reach {', ''], ['            return false', '  // past the mark: stuck'], ['        }', ''], ['        reach = max(reach, i+step)', ''], ['        if reach >= len(nums)-1 {', ''], ['            return true', ''], ['        }', ''], ['    }', ''], ['    return true', ''], ['}', '']]
    },
    rules: [['Set the mark at the first stone', 'intro'], ['Leap goes farther → move the mark', 'grow'], ['Leap falls short → keep the mark', 'hold'], ['Standing past the mark → stuck', 'stuck'], ['Mark covers the last stone → True', 'found']],
    complexity: [['O(n)', 'each stone is looked at once'], ['O(1)', 'one number: the farthest mark']],
    quest: ['A row of seven stepping stones crosses the river: 1, 2, 0, 1, 3, 0, 2. Each number is the longest leap the jumper can make from that stone. He may also leap shorter.', 'Starting on the first stone, can the jumper land on the last one?'],
    example: ['nums = [1, 2, 0, 1, 3, 0, 2]', 'answer = True   (0 → 1 → 3 → 4 → 6)'],
    hints: ['“You don’t need the exact route. What single fact would tell you whether a stone can be reached?”', '“Keep the farthest stone you could reach so far. Any stone before that mark is reachable.”', '“At each stone: if you’re past the mark, you’re stuck. Otherwise push the mark to i + nums[i] if that is farther.”'],
    clues: ['yes or no, not the route', 'a leap may be shorter than the number', 'one pass would be ideal'],
    quizFb: ['“Trying every route branches at every stone. With 10,000 stones that never ends.”', '“A note for every stone works, but it can cost O(n²) leaps. One number is enough here.”', '“Yes! Keep only the farthest mark. If it ever covers the last stone, the jumper can cross.”', '“Both ends walking inward helps with sorted pairs. The jumper must cross from left to right.”'],
    steps
  };
}

SCENE_REGISTRY.push(stonesScene);
PATTERN_KITS['Greedy'] = { right: 2, spot: 'Why one mark, not every route?', ask: 'How should the jumper decide?',
  quiz: [['Try every route', 'Follow each possible leap and back up when it fails'], ['A note for every stone', 'Work out, stone by stone, whether each one can be reached'], ['Keep the farthest mark', 'Remember only the farthest stone reachable so far'], ['Two friends from both ends', 'One at each end, walking inward']] };
STORY_CAST.jumper = { name: 'Jumper', initial: 'J', color: 'right', radius: '9px' };
