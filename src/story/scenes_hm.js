
// ---------- Hash Map: the shopkeeper at the coat-check counter ----------

// The Coat-Check Counter — Two Sum
function coatScene() {
  const nums = [4, 9, 2, 7, 5], target = 12;
  const steps = [];
  const seen = {};
  const book = (fresh, hit) => Object.keys(seen).map((k) => [k, 'seat ' + seen[k], Number(k) === hit ? 'hit' : Number(k) === fresh ? 'fresh' : '']);
  steps.push({ L: 0, kind: 'intro', board: [], need: '—',
    dialog: [say('narr', 'Five guests will arrive, each wearing a number. Two of them together make 12 — find them.'), say('shop', 'I won’t compare everyone with everyone. I’ll keep a ticket book.'), say('narr', 'And for each new guest?'), say('shop', 'I ask: is the partner who makes 12 already in my book?')],
    nar: { kid: 'The  coat-check clerk, has a ticket book. Every guest who arrives gets written down, so she can find anyone again in a blink.', builder: 'seen = {}. For each i: need = target − nums[i]. If need is in seen, we’re done; otherwise store nums[i] → i.', expert: 'One pass with an O(1) average-time lookup replaces the inner loop of the O(n²) brute force.' } });
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i], need = target - x;
    if (need in seen) {
      steps.push({ L: i, kind: 'found', need, partner: seen[need], board: book(-1, need),
        dialog: [say('shop', 'Guest ' + x + ' needs a ' + need + '…'), say('shop', 'And a ' + need + ' is in my book, at seat ' + seen[need] + '!'), say('narr', 'Seats ' + seen[need] + ' and ' + i + '. ' + need + ' + ' + x + ' = 12. Well done, shopkeeper.')],
        nar: { kid: 'Guest ' + x + ' needs a partner worth ' + need + ' — and the shopkeeper already wrote one down! The answer is seats ' + seen[need] + ' and ' + i + '.', builder: 'need = 12 − ' + x + ' = ' + need + ' is in seen → return [' + seen[need] + ', ' + i + '].', expert: 'Found at i = ' + i + ' after ' + i + ' inserts: O(n) time, O(n) space. Trading memory for time is the whole Hash Map pattern.' } });
      break;
    }
    seen[x] = i;
    steps.push({ L: i, kind: 'store', need, board: book(x, -1),
      dialog: [say('shop', 'Guest ' + x + '. Their partner would be ' + need + '.'), say('shop', 'No ' + need + ' in my book yet, so I write down: ' + x + ' → seat ' + i + '.')],
      nar: { kid: 'Guest ' + x + ' needs a ' + need + ' to make 12. Nobody like that has arrived yet, so the shopkeeper writes ' + x + ' in her ticket book and waits.', builder: 'need = ' + need + ' not in seen → seen[' + x + '] = ' + i + '.', expert: 'Insert after checking, so a guest never pairs with themselves. Average O(1) per step.' } });
  }
  const T = { intro: ['Empty ticket book', 'plain'], store: ['No partner yet → write a ticket', 'cool'], found: ['Partner found → [3, 4]', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.noActor = false;
    st.cells = nums.map((_, i) => (st.kind === 'intro' ? 'future' : st.done && (i === st.L || i === st.partner) ? 'ok' : i < st.L ? 'stored' : i === st.L ? 'cur' : 'future'));
    const n = st.kind === 'intro' ? 0 : st.L + 1;
    st.meter = { text: st.kind === 'intro' ? 'target = 12' : 'need = 12 − ' + nums[st.L] + ' = ' + st.need, pct: (n / nums.length) * 100, mark: 100, markLabel: 'guests checked ' + n + ' / 5' };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['nums[i]', st.kind === 'intro' ? '—' : nums[st.L], 'left'], ['need', st.need, 'right'], ['need in seen', st.done ? 'True' : st.kind === 'intro' ? '—' : 'False', st.done ? 'ok' : 'text'], ['len(seen)', st.board.length, 'text'], ['result', st.done ? '[' + st.partner + ', ' + st.L + ']' : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'two-sum', pattern: 'Hash Map', cast: 'hm', short: 'Coat-Check', visual: 'letters', items: nums.map(String), pitch: 72, tile: 56, tileH: 70, gap: 16, font: 28, width: 344,
    board: true, boardTitle: 'The shopkeeper’s ticket book',
    actorLabels: ['Shopkeeper · i'],
    goal: 'Find the two guests whose numbers make 12', status: ['Checking coats…', 'Pair found'],
    lines: { py: { intro: 2, store: 7, found: 6 }, java: { intro: 2, found: 6, store: 7 }, cpp: { intro: 2, found: 6, store: 7 }, js: { intro: 2, found: 6, store: 7 }, go: { intro: 2, found: 6, store: 8 } },
    code: {
      py: [['def twoSum(nums, target):', ''], ['    seen = {}', '                  # value -> seat'], ['    for i, x in enumerate(nums):', ''], ['        need = target - x', ''], ['        if need in seen:', ''], ['            return [seen[need], i]', ''], ['        seen[x] = i', '              # write the ticket'], ['    return []', '']],
      java: [['int[] twoSum(int[] nums, int target) {', ''], ['    Map<Integer, Integer> seen = new HashMap<>();', ''], ['    for (int i = 0; i < nums.length; i++) {', ''], ['        int need = target - nums[i];', ''], ['        if (seen.containsKey(need))', ''], ['            return new int[]{seen.get(need), i};', ''], ['        seen.put(nums[i], i);', '  // write the ticket'], ['    }', ''], ['    return new int[0];', ''], ['}', '']],
      cpp: [['vector<int> twoSum(vector<int>& nums, int target) {', ''], ['    unordered_map<int, int> seen;', ''], ['    for (int i = 0; i < nums.size(); i++) {', ''], ['        int need = target - nums[i];', ''], ['        if (seen.count(need))', ''], ['            return {seen[need], i};', ''], ['        seen[nums[i]] = i;', '  // write the ticket'], ['    }', ''], ['    return {};', ''], ['}', '']],
      js: [['function twoSum(nums, target) {', ''], ['  const seen = new Map();', ''], ['  for (let i = 0; i < nums.length; i++) {', ''], ['    const need = target - nums[i];', ''], ['    if (seen.has(need))', ''], ['      return [seen.get(need), i];', ''], ['    seen.set(nums[i], i);', '  // write the ticket'], ['  }', ''], ['  return [];', ''], ['}', '']],
      go: [['func twoSum(nums []int, target int) []int {', ''], ['    seen := map[int]int{}', ''], ['    for i, x := range nums {', ''], ['        need := target - x', ''], ['        if j, ok := seen[need]; ok {', ''], ['            return []int{j, i}', ''], ['        }', ''], ['        seen[x] = i', '  // write the ticket'], ['    }', ''], ['    return nil', ''], ['}', '']]
    },
    rules: [['Open an empty ticket book', 'intro'], ['Partner not in the book → write a ticket', 'store'], ['Partner in the book → return both seats', 'found']],
    complexity: [['O(n)', 'each guest is checked once'], ['O(n)', 'the ticket book can hold everyone']],
    quest: ['The coat-check counter is busy tonight. Five guests arrive one by one wearing numbers: 4, 9, 2, 7, 5.', 'Somewhere in the line are two guests whose numbers add up to exactly 12. The shopkeeper must find their seats — without checking every pair.'],
    example: ['nums = [4, 9, 2, 7, 5]   target = 12', 'answer = [3, 4]   (7 + 5 = 12)'],
    hints: ['“For each guest, you already know exactly what number their partner must wear. What would make finding that partner instant?”', '“A ticket book: number in, seat out. Looking something up in it takes no time at all.”', '“Check the book first, then write the guest down — so nobody pairs with themselves.”'],
    clues: ['find a pair that hits a target', 'the line is not sorted', 'one pass would be ideal'],
    quizFb: ['“Checking every pair works — 10 checks here, but 50 million for 10,000 guests.”', '“Two friends from the ends only works if the line is sorted. This one isn’t, and sorting loses the seats.”', '“A window watches neighbours. Our two guests might be far apart.”', '“Yes! Write down every guest you pass, and each new guest just asks the book for their partner.”'],
    steps
  };
}

// The Guest List — Contains Duplicate
function guestScene() {
  const nums = [3, 8, 4, 6, 8];
  const steps = [];
  const seen = [];
  const list = (fresh, hit) => seen.map((k) => [String(k), 'on list', k === hit ? 'hit' : k === fresh ? 'fresh' : '']);
  steps.push({ L: 0, kind: 'intro', board: [],
    dialog: [say('narr', 'Five guests at the door. Did anyone sneak in twice?'), say('shop', 'My guest list starts empty. Each guest, I check the list, then add them.')],
    nar: { kid: 'The shopkeeper stands at the door with an empty guest list. If someone arrives who is already on it, they came twice!', builder: 'seen = set(). For each x: if x in seen → True; else add x.', expert: 'Set membership is O(1) on average, so one pass is O(n). Sorting first would be O(n log n).' } });
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (seen.includes(x)) {
      steps.push({ L: i, kind: 'found', board: list(-1, x), first: seen.indexOf(x) === -1 ? 0 : nums.indexOf(x),
        dialog: [say('shop', 'Guest ' + x + '… wait. ' + x + ' is already on my list!'), say('narr', 'Then someone came twice. The answer is True — no need to check the rest.')],
        nar: { kid: 'Guest ' + x + ' is already on the list. Somebody came twice!', builder: x + ' in seen → return True.', expert: 'Early exit on the first repeat; worst case still O(n).' } });
      break;
    }
    seen.push(x);
    steps.push({ L: i, kind: 'add', board: list(x, -1),
      dialog: [say('shop', 'Guest ' + x + '. Not on my list.'), say('shop', 'Added. Next, please!')],
      nar: { kid: 'Guest ' + x + ' is new, so the shopkeeper writes them on the list.', builder: x + ' not in seen → seen.add(' + x + ').', expert: 'The set now holds ' + seen.length + ' distinct values.' } });
  }
  const T = { intro: ['Empty guest list', 'plain'], add: ['New guest → add to the list', 'cool'], found: ['Already on the list → True', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = nums.map((v, i) => (st.kind === 'intro' ? 'future' : st.done && (i === st.L || i === st.first) ? 'hit' : i < st.L ? 'stored' : i === st.L ? 'cur' : 'future'));
    const n = st.kind === 'intro' ? 0 : st.L + 1;
    st.meter = { text: st.kind === 'intro' ? 'list = {}' : 'is ' + nums[st.L] + ' on the list?', pct: (n / nums.length) * 100, mark: 100, markLabel: 'guests checked ' + n + ' / 5' };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['x', st.kind === 'intro' ? '—' : nums[st.L], 'left'], ['x in seen', st.done ? 'True' : st.kind === 'intro' ? '—' : 'False', st.done ? 'ok' : 'text'], ['len(seen)', st.board.length, 'text'], ['seen', '{' + st.board.map((r) => r[0]).join(', ') + '}', 'right'], ['result', st.done ? 'True' : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'contains-duplicate', pattern: 'Hash Map', cast: 'hm', short: 'Guest List', visual: 'letters', items: nums.map(String), pitch: 72, tile: 56, tileH: 70, gap: 16, font: 28, width: 344,
    board: true, boardTitle: 'The shopkeeper’s guest list',
    actorLabels: ['Shopkeeper · i'],
    goal: 'Did any guest arrive twice?', status: ['At the door…', 'Repeat spotted'],
    lines: { py: { intro: 2, add: 6, found: 5 }, java: { intro: 2, found: 5, add: 6 }, cpp: { intro: 2, found: 5, add: 6 }, js: { intro: 2, found: 5, add: 6 }, go: { intro: 2, found: 5, add: 7 } },
    code: {
      py: [['def containsDuplicate(nums):', ''], ['    seen = set()', ''], ['    for x in nums:', ''], ['        if x in seen:', ''], ['            return True', '          # a guest came twice'], ['        seen.add(x)', ''], ['    return False', '']],
      java: [['boolean containsDuplicate(int[] nums) {', ''], ['    Set<Integer> seen = new HashSet<>();', ''], ['    for (int x : nums) {', ''], ['        if (seen.contains(x))', ''], ['            return true;', '  // a guest came twice'], ['        seen.add(x);', ''], ['    }', ''], ['    return false;', ''], ['}', '']],
      cpp: [['bool containsDuplicate(vector<int>& nums) {', ''], ['    unordered_set<int> seen;', ''], ['    for (int x : nums) {', ''], ['        if (seen.count(x))', ''], ['            return true;', '  // a guest came twice'], ['        seen.insert(x);', ''], ['    }', ''], ['    return false;', ''], ['}', '']],
      js: [['function containsDuplicate(nums) {', ''], ['  const seen = new Set();', ''], ['  for (const x of nums) {', ''], ['    if (seen.has(x))', ''], ['      return true;', '  // a guest came twice'], ['    seen.add(x);', ''], ['  }', ''], ['  return false;', ''], ['}', '']],
      go: [['func containsDuplicate(nums []int) bool {', ''], ['    seen := map[int]bool{}', ''], ['    for _, x := range nums {', ''], ['        if seen[x] {', ''], ['            return true', '  // a guest came twice'], ['        }', ''], ['        seen[x] = true', ''], ['    }', ''], ['    return false', ''], ['}', '']]
    },
    rules: [['Start with an empty guest list', 'intro'], ['New guest → add them to the list', 'add'], ['Already on the list → someone came twice', 'found']],
    complexity: [['O(n)', 'one look per guest'], ['O(n)', 'the list can hold everyone']],
    quest: ['It’s a small party, but the host suspects a gatecrasher who came in twice. Five guests arrive wearing numbers: 3, 8, 4, 6, 8.', 'The shopkeeper, at the door, must say whether any number shows up more than once.'],
    example: ['nums = [3, 8, 4, 6, 8]', 'answer = True   (8 appears twice)'],
    hints: ['“Comparing every guest with every other is slow. What could the shopkeeper keep in her hand instead?”', '“A list she can check instantly — a set.”', '“Check first, then add. The first guest already on the list gives you the answer.”'],
    clues: ['has anything repeated?', 'order doesn’t matter', 'one pass would be ideal'],
    quizFb: ['“Every pair is 10 checks here, but 5 billion for 100,000 guests.”', '“Sorting and then checking neighbours works too, but costs O(n log n). The list is faster.”', '“The repeats might be far apart. A window of neighbours can miss them.”', '“Yes! A guest list you can check in a blink. That’s a set — a Hash Map without values.”'],
    steps
  };
}

// The Scrabble Swap — Valid Anagram
function scrabbleScene() {
  const s = ['l', 'i', 's', 't', 'e', 'n'], u = ['s', 'i', 'l', 'e', 'n', 't'];
  const steps = [];
  const count = {};
  const order = [];
  const tally = (a, b) => order.map((k) => [k, (count[k] > 0 ? '+' : '') + count[k], (k === a || k === b) ? (count[k] === 0 ? 'hit' : 'fresh') : count[k] === 0 ? 'zero' : '']);
  steps.push({ L: 0, kind: 'intro', board: [],
    dialog: [say('narr', 'Two bags of Scrabble tiles. Bag one spells “listen”, bag two spells “silent”. Same tiles?'), say('shop', 'I’ll keep a tally. Every tile from bag one is +1, every tile from bag two is −1.'), say('narr', 'And at the end?'), say('shop', 'If every letter is back to zero, the bags hold the same tiles.')],
    nar: { kid: 'The shopkeeper pulls one tile from each bag at a time. She adds for bag one and takes away for bag two. If everything cancels out, the words use the same letters.', builder: 'Lengths match. count = {}. For each i: count[s[i]] += 1, count[t[i]] −= 1. Anagram iff every count is 0.', expert: 'One counting pass, O(n) time and O(1) space for a fixed alphabet. Sorting both words would be O(n log n).' } });
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = u[i];
    [a, b].forEach((k) => { if (!(k in count)) { count[k] = 0; order.push(k); } });
    count[a]++; count[b]--;
    const zeroed = [a, b].filter((k) => count[k] === 0 && a !== b);
    const kind = zeroed.length ? 'cancel' : 'tally';
    steps.push({ L: i, kind, board: tally(a, b),
      dialog: kind === 'cancel'
        ? [say('shop', 'Bag one gives “' + a + '”, bag two gives “' + b + '”.'), say('narr', '“' + zeroed.join('” and “') + '” ' + (zeroed.length > 1 ? 'are' : 'is') + ' back to zero — they balance out.')]
        : [say('shop', 'Bag one gives “' + a + '” (+1), bag two gives “' + b + '” (−1).'), say('narr', a === b ? 'Same letter from both bags — it cancels straight away.' : 'Nothing balances yet. Keep drawing.')],
      nar: { kid: 'From bag one, “' + a + '”: one more. From bag two, “' + b + '”: one less.' + (kind === 'cancel' ? ' The “' + zeroed.join('” and “') + '” count' + (zeroed.length > 1 ? 's are' : ' is') + ' back to zero!' : ''), builder: 'count["' + a + '"] = ' + count[a] + ', count["' + b + '"] = ' + count[b] + '.', expert: 'Invariant: count[c] = (occurrences of c in s[0..i]) − (occurrences in t[0..i]). Each step is O(1).' } });
  }
  steps.push({ L: s.length - 1, kind: 'found', board: order.map((k) => [k, '0', 'zero']),
    dialog: [say('shop', 'Both bags are empty, and every letter in my tally is 0.'), say('narr', 'Then “listen” and “silent” hold the very same tiles. It’s an anagram — True.')],
    nar: { kid: 'Every letter came out even. The two bags have exactly the same tiles!', builder: 'all counts are 0 → return True.', expert: '2n updates plus one scan of at most 26 counters. If any count were non-zero, the extra (or missing) letter would be the proof.' } });
  const T = { intro: ['Empty tally', 'plain'], tally: ['+1 for bag one, −1 for bag two', 'cool'], cancel: ['A letter balances back to 0', 'warn'], found: ['All zero → anagram!', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = s.map((_, i) => (st.kind === 'intro' ? 'future' : st.done ? 'ok' : i < st.L ? 'stored' : i === st.L ? 'cur' : 'future'));
    st.cells2 = st.cells.slice();
    const nz = st.board.filter((r) => r[1] !== '0').length;
    const drawn = st.kind === 'intro' ? 0 : st.L + 1;
    st.meter = { text: st.done ? 'all counts = 0' : 'letters off balance: ' + nz, pct: (drawn / 6) * 100, mark: 100, markLabel: 'tiles drawn ' + drawn + ' / 6' };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['s[i]', st.kind === 'intro' ? '—' : '“' + s[st.L] + '”', 'left'], ['t[i]', st.kind === 'intro' ? '—' : '“' + u[st.L] + '”', 'right'], ['non-zero', nz, 'text'], ['letters', st.board.length, 'text'], ['result', st.done ? 'True' : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'valid-anagram', pattern: 'Hash Map', cast: 'hm', short: 'Scrabble', visual: 'letters', items: s, items2: u, rowLabels: ['bag one', 'bag two'], pitch: 58, tile: 46, tileH: 48, gap: 12, font: 22, width: 336,
    board: true, boardTitle: 'The shopkeeper’s tally',
    actorLabels: ['Shopkeeper · i'],
    goal: 'Do both bags hold exactly the same tiles?', status: ['Tallying…', 'Same tiles'],
    lines: { py: { intro: 4, tally: 6, cancel: 7, found: 8 }, java: { intro: 3, tally: 5, cancel: 6, found: 9 }, cpp: { intro: 3, tally: 5, cancel: 6, found: 9 }, js: { intro: 3, tally: 5, cancel: 6, found: 8 }, go: { intro: 5, tally: 7, cancel: 8, found: 15 } },
    code: {
      py: [['def isAnagram(s, t):', ''], ['    if len(s) != len(t):', ''], ['        return False', ''], ['    count = {}', ''], ['    for a, b in zip(s, t):', ''], ['        count[a] = count.get(a, 0) + 1', '  # bag one'], ['        count[b] = count.get(b, 0) - 1', '  # bag two'], ['    return all(v == 0 for v in count.values())', '']],
      java: [['boolean isAnagram(String s, String t) {', ''], ['    if (s.length() != t.length()) return false;', ''], ['    int[] count = new int[26];', ''], ['    for (int i = 0; i < s.length(); i++) {', ''], ['        count[s.charAt(i) - \'a\']++;', '  // bag one'], ['        count[t.charAt(i) - \'a\']--;', '  // bag two'], ['    }', ''], ['    for (int c : count) if (c != 0) return false;', ''], ['    return true;', ''], ['}', '']],
      cpp: [['bool isAnagram(string s, string t) {', ''], ['    if (s.size() != t.size()) return false;', ''], ['    int count[26] = {0};', ''], ['    for (int i = 0; i < s.size(); i++) {', ''], ['        count[s[i] - \'a\']++;', '  // bag one'], ['        count[t[i] - \'a\']--;', '  // bag two'], ['    }', ''], ['    for (int c : count) if (c != 0) return false;', ''], ['    return true;', ''], ['}', '']],
      js: [['function isAnagram(s, t) {', ''], ['  if (s.length !== t.length) return false;', ''], ['  const count = {};', ''], ['  for (let i = 0; i < s.length; i++) {', ''], ['    count[s[i]] = (count[s[i]] || 0) + 1;', '  // bag one'], ['    count[t[i]] = (count[t[i]] || 0) - 1;', '  // bag two'], ['  }', ''], ['  return Object.values(count).every((v) => v === 0);', ''], ['}', '']],
      go: [['func isAnagram(s, t string) bool {', ''], ['    if len(s) != len(t) {', ''], ['        return false', ''], ['    }', ''], ['    count := [26]int{}', ''], ['    for i := 0; i < len(s); i++ {', ''], ['        count[s[i]-\'a\']++', '  // bag one'], ['        count[t[i]-\'a\']--', '  // bag two'], ['    }', ''], ['    for _, c := range count {', ''], ['        if c != 0 {', ''], ['            return false', ''], ['        }', ''], ['    }', ''], ['    return true', ''], ['}', '']]
    },
    rules: [['Start with an empty tally', 'intro'], ['+1 for bag one, −1 for bag two', 'tally'], ['A letter back at 0 has balanced out', 'cancel'], ['Everything at 0 → same tiles', 'found']],
    complexity: [['O(n)', 'every tile is counted once'], ['O(1)', 'at most 26 letters in the tally']],
    quest: ['Two friends each hold a bag of Scrabble tiles. One bag spells “listen”, the other spells “silent”.', 'Can one bag spell exactly the other’s word — nothing extra, nothing missing? The shopkeeper will keep the tally.'],
    example: ['s = "listen"   t = "silent"', 'answer = True'],
    hints: ['“Order doesn’t matter for an anagram. Only how many of each letter.”', '“Could one tally sheet serve both bags? Add for one, subtract for the other.”', '“If every letter ends at zero, nothing was extra and nothing was missing.”'],
    clues: ['same letters, any order', 'count, don’t compare positions', 'one pass is enough'],
    quizFb: ['“Matching every tile against every other is O(n²) and fiddly with repeats.”', '“Walking in from both ends checks mirror images, not shuffles.”', '“A window of neighbours can’t see letters that moved far away.”', '“Yes! A tally of letters — +1 for one bag, −1 for the other — is a Hash Map of counts.”'],
    steps
  };
}

// ---------- Your own input (see practice.js) ----------
function coatRun(input) {
  const v = input || SCENE_INPUT['two-sum'].default;
  const nums = v.nums.slice(), T = v.target, n = nums.length;
  const seen = {}, steps = [];
  const book = (fresh, hit) => Object.keys(seen).map((k) => [k, 'seat ' + seen[k], Number(k) === hit ? 'hit' : Number(k) === fresh ? 'fresh' : '']);
  let ans = [];
  steps.push(runStep('intro', { L: 0, board: [], need: '—' }, [say('narr', n + ' guests arrive. Two of them add up to ' + T + '. Find them.'), say('shop', 'I’ll keep a ticket book of everyone I’ve seen.')],
    'The shopkeeper writes every guest in her ticket book, so she can find a partner in a blink.', 'seen = {}. need = target − nums[i].', 'One pass with quick lookups: O(n) time, O(n) space.'));
  for (let i = 0; i < n; i++) {
    const x = nums[i], need = T - x;
    if (need in seen) {
      ans = [seen[need], i];
      steps.push(runStep('found', { L: i, need, partner: seen[need], board: book(-1, need), done: true }, [say('shop', 'Guest ' + x + ' needs ' + need + ', and ' + need + ' is in my book!'), say('narr', 'Seats ' + seen[need] + ' and ' + i + '.')],
        'Guest ' + x + ' needs a ' + need + ', and ' + need + ' is in the book at seat ' + seen[need] + '. The answer is [' + seen[need] + ', ' + i + '].', need + ' in seen → return [' + seen[need] + ', ' + i + '].', 'Found after ' + (i + 1) + ' of ' + n + ' guests.'));
      break;
    }
    seen[x] = i;
    steps.push(runStep('store', { L: i, need, board: book(x, -1) }, [say('shop', 'Guest ' + x + ' needs ' + need + '. Not in my book yet.'), say('shop', 'I write down ' + x + ' → seat ' + i + '.')],
      'Guest ' + x + ' needs a ' + need + '. Nobody like that has come yet, so the shopkeeper writes ' + x + ' down.', need + ' not in seen → seen[' + x + '] = ' + i + '.', 'Check first, then write, so a guest never pairs with themselves.'));
  }
  runFinish(steps, { intro: ['Empty ticket book', 'plain'], store: ['No partner yet → write a ticket', 'cool'], found: ['Partner found → ' + showList(ans), 'ok'] }, (st) => {
    st.cells = nums.map((_, i) => (st.kind === 'intro' ? 'future' : st.done && (i === st.L || i === st.partner) ? 'ok' : i < st.L ? 'stored' : i === st.L ? 'cur' : 'future'));
    const k = st.kind === 'intro' ? 0 : st.L + 1;
    st.meter = { text: st.kind === 'intro' ? 'target = ' + T : 'need = ' + T + ' − ' + nums[st.L] + ' = ' + st.need, pct: (k / n) * 100, mark: 100, markLabel: 'guests checked ' + k + ' / ' + n };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['nums[i]', st.kind === 'intro' ? '—' : nums[st.L], 'left'], ['need', st.need, 'right'], ['need in seen', st.done ? 'True' : st.kind === 'intro' ? '—' : 'False', st.done ? 'ok' : 'text'], ['len(seen)', st.board.length, 'text'], ['answer', st.done ? showList(ans) : '…', st.done ? 'ok' : 'text']];
  });
  return runScene('two-sum', Object.assign(fitRow({ pitch: 72, tile: 56, tileH: 70, font: 28 }, n, 440), {
    items: nums.map(String), goal: 'Find the two guests whose numbers make ' + T,
    example: ['nums = ' + showList(nums) + '   target = ' + T, 'answer = ' + showList(ans)],
    answer: ans, input: { nums, target: T }
  }), steps);
}
SCENE_INPUT['two-sum'] = {
  hint: 'a list in brackets, then the target', example: '[4, 9, 2, 7, 5], 12',
  default: { nums: [4, 9, 2, 7, 5], target: 12 },
  presets: [['Story example', () => ({ nums: [4, 9, 2, 7, 5], target: 12 })], ['Random', () => randOnePair(false, rint(4, 8), 0, 30)], ['Sorted', () => ({ nums: [1, 4, 6, 10, 15], target: 25 })], ['Pair at once', () => ({ nums: [3, 3, 8], target: 6 })]],
  random: () => randOnePair(false, rint(3, 9), 0, 99),
  parse: parseNumsTarget, show: showNumsTarget,
  check: (v) => checkCount(v.nums, 3, 9, 'guests') || checkRange(v.nums, 0, 99, 'Guest numbers') || checkOnePair(v.nums, v.target),
  make: coatRun
};

function guestRun(input) {
  const nums = (input || SCENE_INPUT['contains-duplicate'].default).nums.slice(), n = nums.length;
  const seen = [], steps = [];
  const list = (fresh, hit) => seen.map((k) => [String(k), 'on list', k === hit ? 'hit' : k === fresh ? 'fresh' : '']);
  let answer = false;
  steps.push(runStep('intro', { L: 0, board: [] }, [say('narr', n + ' guests at the door. Did anyone come twice?'), say('shop', 'I check my list first, then add each guest.')],
    'The shopkeeper starts with an empty guest list. A guest already on it came twice.', 'seen = set(). For each x: x in seen → True, else add it.', 'Set lookups are quick, so one pass is O(n).'));
  for (let i = 0; i < n; i++) {
    const x = nums[i];
    if (seen.includes(x)) {
      answer = true;
      steps.push(runStep('found', { L: i, first: nums.indexOf(x), board: list(-1, x), done: true }, [say('shop', x + ' is already on my list!'), say('narr', 'Someone came twice. The answer is True.')],
        'Guest ' + x + ' is already on the list. Somebody came twice!', x + ' in seen → return True.', 'Stop at the first repeat. The rest is never read.'));
      break;
    }
    seen.push(x);
    steps.push(runStep('add', { L: i, board: list(x, -1) }, [say('shop', 'Guest ' + x + '. Not on my list. Added.')],
      'Guest ' + x + ' is new, so the shopkeeper writes them on the list.', x + ' not in seen → seen.add(' + x + ').', 'The list now holds ' + seen.length + ' different numbers.'));
  }
  if (!answer) {
    steps.push(runStep('none', { L: n - 1, board: list(-1, -1), done: true }, [say('shop', 'That was the last guest.'), say('narr', 'Nobody came twice. The answer is False.')],
      'Every guest was new. Nobody came twice.', 'loop ends → return False.', n + ' lookups, one per guest.'));
  }
  runFinish(steps, { intro: ['Empty guest list', 'plain'], add: ['New guest → add to the list', 'cool'], found: ['Already on the list → True', 'ok'], none: ['Everyone was new → False', 'ok'] }, (st) => {
    st.cells = nums.map((_, i) => (st.kind === 'intro' ? 'future' : st.kind === 'none' ? 'stored' : st.kind === 'found' && (i === st.L || i === st.first) ? 'hit' : i < st.L ? 'stored' : i === st.L ? 'cur' : 'future'));
    const k = st.kind === 'intro' ? 0 : st.L + 1;
    st.meter = { text: st.kind === 'intro' ? 'list = {}' : st.kind === 'none' ? 'no repeats' : 'is ' + nums[st.L] + ' on the list?', pct: (k / n) * 100, mark: 100, markLabel: 'guests checked ' + k + ' / ' + n };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['x', st.kind === 'intro' ? '—' : nums[st.L], 'left'], ['x in seen', st.kind === 'found' ? 'True' : st.kind === 'intro' ? '—' : 'False', st.kind === 'found' ? 'ok' : 'text'], ['len(seen)', st.board.length, 'text'], ['seen', '{' + st.board.map((r) => r[0]).join(', ') + '}', 'text'], ['result', st.kind === 'found' ? 'True' : st.kind === 'none' ? 'False' : '…', st.done ? 'ok' : 'text']];
  });
  const base = SCENES['contains-duplicate'];
  return runScene('contains-duplicate', Object.assign(fitRow({ pitch: 72, tile: 56, tileH: 70, font: 28 }, n, 440), {
    items: nums.map(String), status: ['At the door…', answer ? 'Repeat spotted' : 'No repeats'],
    lines: runLines(base, { none: /return false/i }), rules: base.rules.concat([['Everyone checked → nobody came twice', 'none']]),
    example: ['nums = ' + showList(nums), 'answer = ' + (answer ? 'True' : 'False')],
    answer, input: { nums }
  }), steps);
}
SCENE_INPUT['contains-duplicate'] = {
  hint: 'numbers from 0 to 99', example: '3, 8, 4, 6, 8',
  default: { nums: [3, 8, 4, 6, 8] },
  presets: [['Story example', () => ({ nums: [3, 8, 4, 6, 8] })], ['Random', () => ({ nums: rlist(rint(4, 8), 1, 12) })], ['All different', () => ({ nums: [1, 2, 3, 4, 5] })], ['Twice at once', () => ({ nums: [7, 7, 1] })]],
  random: () => ({ nums: rlist(rint(3, 9), 0, rpick([9, 20, 99])) }),
  parse: (t) => ({ nums: parseNums(t) }), show: (v) => v.nums.join(', '),
  check: (v) => checkCount(v.nums, 3, 9, 'guests') || checkRange(v.nums, 0, 99, 'Guest numbers'),
  make: guestRun
};

function scrabbleRun(input) {
  const v = input || SCENE_INPUT['valid-anagram'].default;
  const s = v.s.split(''), u = v.t.split(''), n = s.length;
  const count = {}, order = [], steps = [];
  const tally = (a, b) => order.map((k) => [k, (count[k] > 0 ? '+' : '') + count[k], (k === a || k === b) ? (count[k] === 0 ? 'hit' : 'fresh') : count[k] === 0 ? 'zero' : '']);
  steps.push(runStep('intro', { L: 0, board: [] }, [say('narr', 'Bag one spells “' + v.s + '”, bag two spells “' + v.t + '”. Same tiles?'), say('shop', 'Bag one adds 1, bag two takes 1 away. All zeros means yes.')],
    'The shopkeeper draws one tile from each bag at a time. Bag one adds, bag two takes away. If all counts end at zero, the tiles match.', 'Lengths match. count = {}. count[s[i]] += 1, count[t[i]] −= 1.', 'One pass and at most 26 counters: O(n) time, O(1) space.'));
  for (let i = 0; i < n; i++) {
    const a = s[i], b = u[i];
    [a, b].forEach((k) => { if (!(k in count)) { count[k] = 0; order.push(k); } });
    count[a]++; count[b]--;
    const zeroed = [a, b].filter((k) => count[k] === 0 && a !== b);
    const both = zeroed.length > 1 ? '“' + zeroed.join('” and “') + '” are' : '“' + zeroed[0] + '” is';
    if (zeroed.length) {
      steps.push(runStep('cancel', { L: i, board: tally(a, b) }, [say('shop', 'Bag one gives “' + a + '”, bag two gives “' + b + '”.'), say('narr', both + ' back to zero.')],
        '“' + a + '” adds one and “' + b + '” takes one away. ' + both + ' back to zero.', 'count["' + a + '"] = ' + count[a] + ', count["' + b + '"] = ' + count[b] + '.', 'A count back at zero means that letter balances so far.'));
    } else {
      steps.push(runStep('tally', { L: i, board: tally(a, b) }, [say('shop', 'Bag one gives “' + a + '” (+1), bag two gives “' + b + '” (−1).'), say('narr', a === b ? 'The same letter from both bags cancels at once.' : 'Nothing balances yet.')],
        '“' + a + '” adds one and “' + b + '” takes one away.', 'count["' + a + '"] = ' + count[a] + ', count["' + b + '"] = ' + count[b] + '.', 'Order never matters, only the counts.'));
    }
  }
  const off = order.filter((k) => count[k] !== 0);
  const answer = off.length === 0;
  steps.push(answer
    ? runStep('found', { L: n - 1, board: order.map((k) => [k, '0', 'zero']), done: true }, [say('shop', 'Every letter in my tally is 0.'), say('narr', 'Same tiles. It is an anagram: True.')],
      'Every letter came out even. The two bags hold exactly the same tiles.', 'all counts are 0 → return True.', '2n updates, then one look at each counter.')
    : runStep('differ', { L: n - 1, board: tally(off[0], off[0]), done: true }, [say('shop', '“' + off[0] + '” is still at ' + (count[off[0]] > 0 ? '+' : '') + count[off[0]] + '.'), say('narr', 'The tiles differ. Not an anagram: False.')],
      'Some letters did not cancel, like “' + off[0] + '”. The bags hold different tiles.', 'count["' + off[0] + '"] = ' + count[off[0]] + ' != 0 → return False.', 'One counter that is not zero is proof enough.'));
  runFinish(steps, { intro: ['Empty tally', 'plain'], tally: ['+1 for bag one, −1 for bag two', 'cool'], cancel: ['A letter balances back to 0', 'warn'], found: ['All zero → anagram', 'ok'], differ: ['A letter is left over → False', 'ok'] }, (st) => {
    st.cells = s.map((_, i) => (st.kind === 'intro' ? 'future' : st.done ? (answer ? 'ok' : 'stored') : i < st.L ? 'stored' : i === st.L ? 'cur' : 'future'));
    st.cells2 = st.cells.slice();
    const nz = st.board.filter((r) => r[1] !== '0').length, drawn = st.kind === 'intro' ? 0 : st.L + 1;
    st.meter = { text: st.kind === 'found' ? 'all counts = 0' : 'letters off balance: ' + nz, pct: (drawn / n) * 100, mark: 100, markLabel: 'tiles drawn ' + drawn + ' / ' + n };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['s[i]', st.kind === 'intro' ? '—' : '“' + s[st.L] + '”', 'left'], ['t[i]', st.kind === 'intro' ? '—' : '“' + u[st.L] + '”', 'right'], ['non-zero', nz, 'text'], ['letters', st.board.length, 'text'], ['result', st.kind === 'found' ? 'True' : st.kind === 'differ' ? 'False' : '…', st.done ? 'ok' : 'text']];
  });
  const base = SCENES['valid-anagram'];
  return runScene('valid-anagram', Object.assign(fitRow({ pitch: 58, tile: 46, tileH: 48, font: 22 }, n, 420), {
    items: s, items2: u, status: ['Tallying…', answer ? 'Same tiles' : 'Different tiles'],
    lines: runLines(base, { differ: /return all|return Object\.values|if \(c != 0\)|^\s*return false\s*$/ }), rules: base.rules.concat([['A letter left over → not an anagram', 'differ']]),
    example: ['s = "' + v.s + '"   t = "' + v.t + '"', 'answer = ' + (answer ? 'True' : 'False')],
    answer, input: { s: v.s, t: v.t }
  }), steps);
}
function randAnagram() {
  const w = Array.from({ length: rint(3, 7) }, () => rpick('abcdeilnorst'.split('')));
  const t = w.slice();
  for (let i = t.length - 1; i > 0; i--) { const j = rint(0, i); [t[i], t[j]] = [t[j], t[i]]; }
  if (Math.random() < 0.4) t[rint(0, t.length - 1)] = rpick('abcdeilnorst'.split(''));
  return { s: w.join(''), t: t.join('') };
}
SCENE_INPUT['valid-anagram'] = {
  hint: 'two words of the same length', example: 'listen, silent',
  default: { s: 'listen', t: 'silent' },
  presets: [['Story example', () => ({ s: 'listen', t: 'silent' })], ['Random', randAnagram], ['Not an anagram', () => ({ s: 'rat', t: 'car' })], ['Repeats', () => ({ s: 'aab', t: 'abb' })]],
  random: randAnagram,
  parse: parseWords, show: (v) => v.s + ', ' + v.t,
  check: (v) => (!/^[a-z]+$/.test(v.s + v.t) ? 'Use lowercase letters a to z only.'
    : v.s.length !== v.t.length ? 'Use two words of the same length. Words of different lengths are never anagrams.'
    : v.s.length < 3 || v.s.length > 9 ? 'Use words of 3 to 9 letters, so every tile stays readable.' : ''),
  make: scrabbleRun
};
