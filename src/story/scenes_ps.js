// ---------- Prefix Sum: the tally keeper writes the running total after every step ----------

// The Group Photo Scores — Product of Array Except Self
function photoScene() {
  const nums = [2, 3, 1, 4, 2, 3];
  const n = nums.length;
  const answer = nums.map(() => 1);
  const steps = [];
  const notes = (cur, pass) => answer.map((v, i) => {
    const flag = pass === 'intro' ? 'zero' : i === cur ? 'fresh' : pass === 'left' ? (i < cur ? '' : 'zero') : pass === 'right' ? (i > cur ? 'hit' : '') : 'hit';
    return ['seat ' + i, String(v), flag];
  });
  steps.push({ L: 0, kind: 'intro', left: 1, right: 1, board: notes(-1, 'intro'),
    dialog: [say('narr', 'Six friends hold number cards. A friend’s score is all the other cards multiplied.'), say('tally', 'I may not divide.'), say('narr', 'Then walk the row twice: left to right, then back.'), say('tally', 'Every note starts at 1. I carry one number: the product so far.')],
    nar: { kid: 'Each friend gets a note. Walking right, the tally keeper writes the product of the cards on their left. Walking back, she multiplies in the cards on their right.', builder: 'answer = [1] * n. Pass 1: answer[i] = product of nums[0..i−1]. Pass 2: answer[i] *= product of nums[i+1..n−1].', expert: 'Score(i) = prefix(i) × suffix(i), where prefix and suffix are running products. Two linear passes, no division, O(1) extra space besides the output.' } });
  let left = 1;
  for (let i = 0; i < n; i++) {
    const before = left;
    answer[i] = left;
    left *= nums[i];
    steps.push({ L: i, kind: 'left', left, right: 1, wrote: before, board: notes(i, 'left'),
      dialog: i === 0
        ? [say('tally', 'Seat 0 has nobody on the left. Their note stays 1.'), say('tally', '1 × 2 = 2. Now I carry 2.')]
        : [say('tally', 'I carry ' + before + '. I write ' + before + ' on seat ' + i + '’s note.'), say('tally', before + ' × ' + nums[i] + ' = ' + left + '. Now I carry ' + left + '.')],
      nar: { kid: 'The tally keeper writes ' + before + ' on seat ' + i + '’s note. That is all the cards on the left, multiplied. Then she multiplies her number by ' + nums[i] + '. It becomes ' + left + '.', builder: 'answer[' + i + '] = left = ' + before + '. Then left *= nums[' + i + '], so left = ' + left + '.', expert: 'Invariant before the write: left = ∏ nums[0..' + (i - 1) + '] (empty product = 1). One multiply and one write per seat.' } });
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    const note = answer[i], before = right;
    answer[i] *= right;
    right *= nums[i];
    steps.push({ L: i, kind: 'right', left, right, wrote: answer[i], board: notes(i, 'right'),
      dialog: i === n - 1
        ? [say('tally', 'Now I walk back. I start carrying 1 again.'), say('tally', 'Seat ' + i + ' has nobody on the right. Their note stays ' + note + '.'), say('tally', '1 × ' + nums[i] + ' = ' + right + '. Now I carry ' + right + '.')]
        : [say('tally', 'I carry ' + before + '. Seat ' + i + '’s note says ' + note + '.'), say('tally', note + ' × ' + before + ' = ' + answer[i] + '. That is their score.'), say('tally', before + ' × ' + nums[i] + ' = ' + right + '. Now I carry ' + right + '.')],
      nar: { kid: 'The note had ' + note + ' from the left side. The tally keeper multiplies it by ' + before + ', the right side. Seat ' + i + '’s score is ' + answer[i] + '. That note is done.', builder: 'answer[' + i + '] *= right, so ' + note + ' × ' + before + ' = ' + answer[i] + '. Then right *= nums[' + i + '], so right = ' + right + '.', expert: 'Invariant before the write: right = ∏ nums[' + (i + 1) + '..' + (n - 1) + ']. After it, answer[' + i + '] = prefix × suffix, final.' } });
  }
  const result = '[' + answer.join(', ') + ']';
  steps.push({ L: 0, kind: 'found', left, right, wrote: answer[0], board: notes(-1, 'found'),
    dialog: [say('tally', 'All six notes are done.'), say('narr', 'Two walks and no dividing. Well done.')],
    nar: { kid: 'The tally keeper walked the row twice. Each note now holds all the other cards, multiplied.', builder: 'return answer = ' + result + '.', expert: '2n multiplies, O(n) time, O(1) extra space. The divide-by-self shortcut would break on any zero card.' } });
  const T = { intro: ['Every note starts at 1', 'plain'], left: ['Walking right → write the left side', 'warn'], right: ['Walking back → multiply in the right side', 'cool'], found: ['All scores written', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = nums.map((_, i) => (st.kind === 'intro' ? 'future' : st.done ? 'ok' : i === st.L ? 'cur' : st.kind === 'left' ? (i < st.L ? 'stored' : 'future') : i > st.L ? 'ok' : 'stored'));
    const visits = st.kind === 'intro' ? 0 : st.done ? 2 * n : st.kind === 'left' ? st.L + 1 : n + (n - st.L);
    const finished = st.done ? n : st.kind === 'right' ? n - st.L : 0;
    const blank = st.kind === 'intro' || st.done;
    st.meter = { text: st.kind === 'intro' ? 'carry = 1' : st.done ? 'all ' + n + ' scores done' : st.kind === 'left' ? 'left = ' + st.left : 'right = ' + st.right, pct: (visits / (2 * n)) * 100, mark: 50, markLabel: 'scores done ' + finished + ' / ' + n };
    st.watch = [['i', blank ? '—' : st.L, 'left'], ['nums[i]', blank ? '—' : nums[st.L], 'left'], ['left', st.left, 'right'], ['right', st.right, 'right'], ['answer[i]', blank ? '—' : st.wrote, 'text'], ['result', st.done ? n + ' scores' : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'product-except-self', pattern: 'Prefix Sum', cast: 'ps', short: 'Group Photo', visual: 'letters', items: nums.map(String), pitch: 66, tile: 54, tileH: 68, gap: 12, font: 28, width: 384,
    board: true, boardTitle: 'The tally keeper’s notes',
    actorLabels: ['Tally keeper · i'],
    goal: 'Each score: all the other cards multiplied', status: ['Writing notes…', 'All scores in'],
    lines: { py: { intro: 2, left: 5, right: 9, found: 11 }, java: { intro: 3, left: 6, right: 11, found: 14 }, cpp: { intro: 3, left: 6, right: 11, found: 14 }, js: { intro: 3, left: 6, right: 11, found: 14 }, go: { intro: 3, left: 6, right: 11, found: 14 } },
    code: {
      py: [['def productExceptSelf(nums):', ''], ['    answer = [1] * len(nums)', ''], ['    left = 1', ''], ['    for i in range(len(nums)):', ''], ['        answer[i] = left', '        # the left side'], ['        left *= nums[i]', ''], ['    right = 1', ''], ['    for i in range(len(nums) - 1, -1, -1):', ''], ['        answer[i] *= right', '   # times the right side'], ['        right *= nums[i]', ''], ['    return answer', '']],
      java: [['int[] productExceptSelf(int[] nums) {', ''], ['    int n = nums.length;', ''], ['    int[] answer = new int[n];', ''], ['    int left = 1;', ''], ['    for (int i = 0; i < n; i++) {', ''], ['        answer[i] = left;', '   // the left side'], ['        left *= nums[i];', ''], ['    }', ''], ['    int right = 1;', ''], ['    for (int i = n - 1; i >= 0; i--) {', ''], ['        answer[i] *= right;', '  // times the right side'], ['        right *= nums[i];', ''], ['    }', ''], ['    return answer;', ''], ['}', '']],
      cpp: [['vector<int> productExceptSelf(vector<int>& nums) {', ''], ['    int n = nums.size();', ''], ['    vector<int> answer(n, 1);', ''], ['    int left = 1;', ''], ['    for (int i = 0; i < n; i++) {', ''], ['        answer[i] = left;', '   // the left side'], ['        left *= nums[i];', ''], ['    }', ''], ['    int right = 1;', ''], ['    for (int i = n - 1; i >= 0; i--) {', ''], ['        answer[i] *= right;', '  // times the right side'], ['        right *= nums[i];', ''], ['    }', ''], ['    return answer;', ''], ['}', '']],
      js: [['function productExceptSelf(nums) {', ''], ['  const n = nums.length;', ''], ['  const answer = new Array(n).fill(1);', ''], ['  let left = 1;', ''], ['  for (let i = 0; i < n; i++) {', ''], ['    answer[i] = left;', '   // the left side'], ['    left *= nums[i];', ''], ['  }', ''], ['  let right = 1;', ''], ['  for (let i = n - 1; i >= 0; i--) {', ''], ['    answer[i] *= right;', '  // times the right side'], ['    right *= nums[i];', ''], ['  }', ''], ['  return answer;', ''], ['}', '']],
      go: [['func productExceptSelf(nums []int) []int {', ''], ['    n := len(nums)', ''], ['    answer := make([]int, n)', ''], ['    left := 1', ''], ['    for i := 0; i < n; i++ {', ''], ['        answer[i] = left', '   // the left side'], ['        left *= nums[i]', ''], ['    }', ''], ['    right := 1', ''], ['    for i := n - 1; i >= 0; i-- {', ''], ['        answer[i] *= right', '  // times the right side'], ['        right *= nums[i]', ''], ['    }', ''], ['    return answer', ''], ['}', '']]
    },
    rules: [['Start every note at 1', 'intro'], ['Walking right → write what you carry, then multiply by this card', 'left'], ['Walking back → multiply the note by what you carry, then by this card', 'right'], ['Both walks done → return the notes', 'found']],
    complexity: [['O(n)', 'two walks along the row'], ['O(1)', 'two numbers carried, plus the notes we return']],
    quest: ['Six friends stand in a row for a photo. Each holds a number card: 2, 3, 1, 4, 2, 3.', 'Each friend gets a score: all the other cards multiplied. The tally keeper must find every score without dividing.'],
    example: ['nums = [2, 3, 1, 4, 2, 3]', 'answer = [72, 48, 144, 36, 72, 48]'],
    hints: ['“A score is the cards on the left times the cards on the right. Can you get each part?”', '“Walk from the left. Multiply as you go. At each seat, your number is the left part.”', '“Write the left part on each note. Then walk back from the right and multiply in the right part.”'],
    clues: ['every seat needs all the others', 'no dividing', 'one score per seat'],
    quizFb: ['“Multiplying the other five for each seat is 30 steps here. With 100,000 friends it is 10 billion.”', '“Yes! Keep a product from the left, then one from the right. Multiply the two.”', '“Nobody meets in the middle here. Every seat needs both sides.”', '“Sorting moves friends out of their seats. Each score belongs to one seat.”'],
    steps
  };
}

// The Coin Jar Checkpoints — Subarray Sum Equals K
function coinJarScene() {
  const nums = [3, 1, -2, 2, 3, -1, 1], k = 3;
  const show = (x) => (x < 0 ? '−' + -x : String(x));
  const totals = [];
  { let s = 0; nums.forEach((x) => { s += x; totals.push(s); }); }
  const seen = { 0: 1 }, order = [0];
  const lastAt = { 0: -1 };
  const times = (c) => (c === 1 ? 'once' : c === 2 ? 'twice' : c + ' times');
  const book = (hit, fresh) => order.map((t) => [show(t), '× ' + seen[t], t === hit ? 'hit' : t === fresh ? 'fresh' : '']);
  const steps = [];
  steps.push({ L: 0, kind: 'intro', total: 0, count: 0, need: '—', got: 0, board: book(null, 0),
    dialog: [say('narr', 'Seven stops. At each stop, coins go in the jar or come out.'), say('narr', 'Count the runs of stops, side by side, that add exactly 3.'), say('tally', 'I’ll write the jar’s total after every stop.'), say('shop', 'I’ll count how often each total shows up. The jar starts at 0, so 0 is in my book once.')],
    nar: { kid: 'The tally keeper writes the jar’s total after every stop. If the total now is 3 more than an earlier total, the stops in between added exactly 3.', builder: 'seen = {0: 1}, total = 0, count = 0. For each x: total += x; count += seen[total − k]; seen[total] += 1.', expert: 'sum(i..j) = P[j+1] − P[i]. Counting pairs with P[j+1] − P[i] = k is a Two Sum over prefix totals, done in one pass.' } });
  let total = 0, count = 0;
  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
    const need = total - k, got = seen[need] || 0;
    count += got;
    const from = got ? lastAt[need] : null;
    if (!(total in seen)) { seen[total] = 0; order.push(total); }
    seen[total] += 1;
    lastAt[total] = i;
    const moved = nums[i] < 0 ? 'take out ' + -nums[i] : 'put in ' + nums[i];
    if (got) {
      steps.push({ L: i, kind: 'hit', total, count, need, got, from, board: book(need, total),
        dialog: [say('tally', 'Stop ' + i + ': ' + moved + '. The jar holds ' + show(total) + '.'), say('shop', show(total) + ' − 3 = ' + show(need) + '. ' + show(need) + ' is in my book ' + times(got) + '.'), say('narr', 'So ' + got + (got === 1 ? ' run ends' : ' runs end') + ' here. The count is ' + count + '.')],
        nar: { kid: 'The jar holds ' + show(total) + '. Earlier it held ' + show(need) + ' ' + times(got) + '. From each of those times to now, exactly 3 coins went in. The tally keeper adds ' + got + ' to the count.', builder: 'total = ' + show(total) + '. seen[' + show(need) + '] = ' + got + ', so count += ' + got + ' → ' + count + '. Then seen[' + show(total) + '] = ' + seen[total] + '.', expert: 'Every earlier index with P = ' + show(need) + ' starts a run ending at ' + i + ' with sum k. Adding the count, not 1, handles repeated totals.' } });
    } else {
      steps.push({ L: i, kind: 'miss', total, count, need, got, board: book(null, total),
        dialog: [say('tally', 'Stop ' + i + ': ' + moved + '. The jar holds ' + show(total) + '.'), say('shop', show(total) + ' − 3 = ' + show(need) + '. My book has no ' + show(need) + '.'), say('shop', 'No run ends here. I write ' + show(total) + ' down.')],
        nar: { kid: 'The jar holds ' + show(total) + '. No earlier total was ' + show(need) + '. So no run ending here adds to 3. The shopkeeper writes ' + show(total) + ' in her book.', builder: 'total = ' + show(total) + '. seen[' + show(need) + '] = 0, so count stays ' + count + '. Then seen[' + show(total) + '] = ' + seen[total] + '.', expert: 'No prefix equals total − k, so no run ending at index ' + i + ' sums to k. The new total is stored for later stops.' } });
    }
  }
  steps.push({ L: nums.length - 1, kind: 'found', total, count, need: '—', got: 0, board: book(null, null),
    dialog: [say('tally', 'That was the last stop.'), say('narr', 'Six runs add exactly 3. Nobody added up a run twice.')],
    nar: { kid: 'The tally keeper and the shopkeeper found 6 runs of stops that add exactly 3 coins.', builder: 'return count = ' + count + '.', expert: 'O(n) time and O(n) space for the book. Summing every run would be O(n²), and two pointers fail because values can be negative.' } });
  const T = { intro: ['The jar starts at 0', 'plain'], miss: ['Not in the book → write the total down', 'cool'], hit: ['Total − 3 is in the book → count it', 'warn'], found: ['Runs that make 3: ' + count, 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    const start = st.kind === 'hit' ? st.from + 1 : st.L;
    st.cells = nums.map((_, i) => (st.kind === 'intro' ? 'future' : st.done ? 'stored' : i === st.L ? (st.kind === 'hit' ? 'hit' : 'cur') : st.kind === 'hit' && i >= start && i < st.L ? 'ok' : i < st.L ? 'stored' : 'future'));
    st.cells2 = totals.map((_, i) => (st.kind === 'intro' ? 'future' : st.done ? 'stored' : i === st.L ? 'cur' : i < st.L ? 'stored' : 'future'));
    const blank = st.kind === 'intro' || st.done;
    st.meter = { text: st.kind === 'intro' ? 'total = 0' : st.done ? 'count = ' + st.count : show(st.total) + ' − 3 = ' + show(st.need), pct: (st.count / 6) * 100, mark: 100, markLabel: 'runs found ' + st.count };
    st.watch = [['i', blank ? '—' : st.L, 'left'], ['x', blank ? '—' : show(nums[st.L]), 'left'], ['total', show(st.total), 'right'], ['total − k', st.need === '—' ? '—' : show(st.need), 'right'], ['seen[total − k]', blank ? '—' : st.got, st.got ? 'ok' : 'text'], ['count', st.count, st.done ? 'ok' : 'text']];
  });
  return {
    id: 'subarray-sum-k', pattern: 'Prefix Sum', cast: 'ps', short: 'Coin Jar', visual: 'letters', items: nums.map(show), items2: totals.map(show), rowLabels: ['coins', 'total'], pitch: 52, tile: 42, tileH: 44, gap: 10, font: 20, width: 354,
    board: true, boardTitle: 'The shopkeeper’s book',
    actorLabels: ['Tally keeper · i'],
    goal: 'Count the runs of stops that add exactly 3', status: ['Counting coins…', 'Count done'],
    lines: { py: { intro: 2, hit: 6, miss: 7, found: 8 }, java: { intro: 3, hit: 7, miss: 8, found: 10 }, cpp: { intro: 2, hit: 6, miss: 7, found: 9 }, js: { intro: 2, hit: 6, miss: 7, found: 9 }, go: { intro: 2, hit: 6, miss: 7, found: 9 } },
    code: {
      py: [['def subarraySum(nums, k):', ''], ['    seen = {0: 1}', '              # the empty jar'], ['    total = count = 0', ''], ['    for x in nums:', ''], ['        total += x', ''], ['        count += seen.get(total - k, 0)', ''], ['        seen[total] = seen.get(total, 0) + 1', ''], ['    return count', '']],
      java: [['int subarraySum(int[] nums, int k) {', ''], ['    Map<Integer, Integer> seen = new HashMap<>();', ''], ['    seen.put(0, 1);', '  // the empty jar'], ['    int total = 0, count = 0;', ''], ['    for (int x : nums) {', ''], ['        total += x;', ''], ['        count += seen.getOrDefault(total - k, 0);', ''], ['        seen.merge(total, 1, Integer::sum);', ''], ['    }', ''], ['    return count;', ''], ['}', '']],
      cpp: [['int subarraySum(vector<int>& nums, int k) {', ''], ['    unordered_map<int, int> seen{{0, 1}};', '  // the empty jar'], ['    int total = 0, count = 0;', ''], ['    for (int x : nums) {', ''], ['        total += x;', ''], ['        if (seen.count(total - k)) count += seen[total - k];', ''], ['        seen[total]++;', ''], ['    }', ''], ['    return count;', ''], ['}', '']],
      js: [['function subarraySum(nums, k) {', ''], ['  const seen = new Map([[0, 1]]);', '  // the empty jar'], ['  let total = 0, count = 0;', ''], ['  for (const x of nums) {', ''], ['    total += x;', ''], ['    count += seen.get(total - k) || 0;', ''], ['    seen.set(total, (seen.get(total) || 0) + 1);', ''], ['  }', ''], ['  return count;', ''], ['}', '']],
      go: [['func subarraySum(nums []int, k int) int {', ''], ['    seen := map[int]int{0: 1}', '  // the empty jar'], ['    total, count := 0, 0', ''], ['    for _, x := range nums {', ''], ['        total += x', ''], ['        count += seen[total-k]', ''], ['        seen[total]++', ''], ['    }', ''], ['    return count', ''], ['}', '']]
    },
    rules: [['Start the book with 0, seen once', 'intro'], ['Total − k is in the book → add its count', 'hit'], ['Not in the book → just write the total down', 'miss'], ['Last stop → report the count', 'found']],
    complexity: [['O(n)', 'one look at each stop'], ['O(n)', 'the book can hold every total']],
    quest: ['A path has seven stops. At each stop, coins go into a jar or come out: +3, +1, −2, +2, +3, −1, +1.', 'How many runs of stops, side by side, add exactly 3? The tally keeper writes the total after each stop. The shopkeeper counts how often each total shows up.'],
    example: ['nums = [3, 1, −2, 2, 3, −1, 1]   k = 3', 'answer = 6'],
    hints: ['“The jar held 4, and later 7. How many coins went in between?”', '“A run adds to k when total now − k was an earlier total. What should you remember?”', '“Count how often each total appears. Start with 0 once. At each stop, add the count for total − k.”'],
    clues: ['runs of stops side by side', 'coins can come out too', 'count every run'],
    quizFb: ['“Adding up every run is 28 sums here. With 100,000 stops it is 5 billion.”', '“Yes! Write the total at each stop. A run is one total minus another.”', '“Coins can come out, so two walkers can’t tell which way to move.”', '“Sorting mixes up the stops. A run only makes sense in path order.”'],
    steps
  };
}

SCENE_REGISTRY.push(photoScene, coinJarScene);
PATTERN_KITS['Prefix Sum'] = { right: 1, spot: 'Why a running total, not a recount?', ask: 'How should the tally keeper add things up?',
  quiz: [['Add it all up again', 'Recount the whole run for every question'], ['Keep a running total', 'Write the total so far after every step'], ['Two friends from both ends', 'One at each end, walking inward'], ['Sort the numbers first', 'Put them in order, then look']] };
STORY_CAST.tally = { name: 'Tally keeper', initial: 'T', color: 'left', radius: '12px' };
