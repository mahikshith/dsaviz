
// ---------- Hash Map: Cleo at the coat-check counter ----------

// The Coat-Check Counter — Two Sum
function coatScene() {
  const nums = [4, 9, 2, 7, 5], target = 12;
  const steps = [];
  const seen = {};
  const book = (fresh, hit) => Object.keys(seen).map((k) => [k, 'seat ' + seen[k], Number(k) === hit ? 'hit' : Number(k) === fresh ? 'fresh' : '']);
  steps.push({ L: 0, kind: 'intro', board: [], need: '—',
    dialog: [say('hoot', 'Five guests will arrive, each wearing a number. Two of them together make 12 — find them.'), say('cleo', 'I won’t compare everyone with everyone. I’ll keep a ticket book.'), say('hoot', 'And for each new guest?'), say('cleo', 'I ask: is the partner who makes 12 already in my book?')],
    nar: { kid: 'Cleo, the coat-check clerk, has a ticket book. Every guest who arrives gets written down, so she can find anyone again in a blink.', builder: 'seen = {}. For each i: need = target − nums[i]. If need is in seen, we’re done; otherwise store nums[i] → i.', expert: 'One pass with an O(1) average-time lookup replaces the inner loop of the O(n²) brute force.' } });
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i], need = target - x;
    if (need in seen) {
      steps.push({ L: i, kind: 'found', need, partner: seen[need], board: book(-1, need),
        dialog: [say('cleo', 'Guest ' + x + ' needs a ' + need + '…'), say('cleo', 'And a ' + need + ' is in my book, at seat ' + seen[need] + '!'), say('hoot', 'Seats ' + seen[need] + ' and ' + i + '. ' + need + ' + ' + x + ' = 12. Well done, Cleo.')],
        nar: { kid: 'Guest ' + x + ' needs a partner worth ' + need + ' — and Cleo already wrote one down! The answer is seats ' + seen[need] + ' and ' + i + '.', builder: 'need = 12 − ' + x + ' = ' + need + ' is in seen → return [' + seen[need] + ', ' + i + '].', expert: 'Found at i = ' + i + ' after ' + i + ' inserts: O(n) time, O(n) space. Trading memory for time is the whole Hash Map pattern.' } });
      break;
    }
    seen[x] = i;
    steps.push({ L: i, kind: 'store', need, board: book(x, -1),
      dialog: [say('cleo', 'Guest ' + x + '. Their partner would be ' + need + '.'), say('cleo', 'No ' + need + ' in my book yet, so I write down: ' + x + ' → seat ' + i + '.')],
      nar: { kid: 'Guest ' + x + ' needs a ' + need + ' to make 12. Nobody like that has arrived yet, so Cleo writes ' + x + ' in her ticket book and waits.', builder: 'need = ' + need + ' not in seen → seen[' + x + '] = ' + i + '.', expert: 'Insert after checking, so a guest never pairs with themselves. Average O(1) per step.' } });
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
    board: true, boardTitle: 'Cleo’s ticket book',
    actorLabels: ['Cleo · i'],
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
    quest: ['The coat-check counter is busy tonight. Five guests arrive one by one wearing numbers: 4, 9, 2, 7, 5.', 'Somewhere in the line are two guests whose numbers add up to exactly 12. Cleo must find their seats — without checking every pair.'],
    example: ['nums = [4, 9, 2, 7, 5]   target = 12', 'answer = [3, 4]   (7 + 5 = 12)'],
    hints: ['Old Hoot: “For each guest, you already know exactly what number their partner must wear. What would make finding that partner instant?”', '“A ticket book: number in, seat out. Looking something up in it takes no time at all.”', '“Check the book first, then write the guest down — so nobody pairs with themselves.”'],
    clues: ['find a pair that hits a target', 'the line is not sorted', 'one pass would be ideal'],
    quizFb: ['Old Hoot: “Checking every pair works — 10 checks here, but 50 million for 10,000 guests.”', 'Old Hoot: “Two friends from the ends only works if the line is sorted. This one isn’t, and sorting loses the seats.”', 'Old Hoot: “A window watches neighbours. Our two guests might be far apart.”', 'Old Hoot: “Yes! Write down every guest you pass, and each new guest just asks the book for their partner.”'],
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
    dialog: [say('hoot', 'Five guests at the door. Did anyone sneak in twice?'), say('cleo', 'My guest list starts empty. Each guest, I check the list, then add them.')],
    nar: { kid: 'Cleo stands at the door with an empty guest list. If someone arrives who is already on it, they came twice!', builder: 'seen = set(). For each x: if x in seen → True; else add x.', expert: 'Set membership is O(1) on average, so one pass is O(n). Sorting first would be O(n log n).' } });
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (seen.includes(x)) {
      steps.push({ L: i, kind: 'found', board: list(-1, x), first: seen.indexOf(x) === -1 ? 0 : nums.indexOf(x),
        dialog: [say('cleo', 'Guest ' + x + '… wait. ' + x + ' is already on my list!'), say('hoot', 'Then someone came twice. The answer is True — no need to check the rest.')],
        nar: { kid: 'Guest ' + x + ' is already on the list. Somebody came twice!', builder: x + ' in seen → return True.', expert: 'Early exit on the first repeat; worst case still O(n).' } });
      break;
    }
    seen.push(x);
    steps.push({ L: i, kind: 'add', board: list(x, -1),
      dialog: [say('cleo', 'Guest ' + x + '. Not on my list.'), say('cleo', 'Added. Next, please!')],
      nar: { kid: 'Guest ' + x + ' is new, so Cleo writes them on the list.', builder: x + ' not in seen → seen.add(' + x + ').', expert: 'The set now holds ' + seen.length + ' distinct values.' } });
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
    board: true, boardTitle: 'Cleo’s guest list',
    actorLabels: ['Cleo · i'],
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
    quest: ['It’s a small party, but the host suspects a gatecrasher who came in twice. Five guests arrive wearing numbers: 3, 8, 4, 6, 8.', 'Cleo, at the door, must say whether any number shows up more than once.'],
    example: ['nums = [3, 8, 4, 6, 8]', 'answer = True   (8 appears twice)'],
    hints: ['Old Hoot: “Comparing every guest with every other is slow. What could Cleo keep in her hand instead?”', '“A list she can check instantly — a set.”', '“Check first, then add. The first guest already on the list gives you the answer.”'],
    clues: ['has anything repeated?', 'order doesn’t matter', 'one pass would be ideal'],
    quizFb: ['Old Hoot: “Every pair is 10 checks here, but 5 billion for 100,000 guests.”', 'Old Hoot: “Sorting and then checking neighbours works too, but costs O(n log n). The list is faster.”', 'Old Hoot: “The repeats might be far apart. A window of neighbours can miss them.”', 'Old Hoot: “Yes! A guest list you can check in a blink. That’s a set — a Hash Map without values.”'],
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
    dialog: [say('hoot', 'Two bags of Scrabble tiles. Bag one spells “listen”, bag two spells “silent”. Same tiles?'), say('cleo', 'I’ll keep a tally. Every tile from bag one is +1, every tile from bag two is −1.'), say('hoot', 'And at the end?'), say('cleo', 'If every letter is back to zero, the bags hold the same tiles.')],
    nar: { kid: 'Cleo pulls one tile from each bag at a time. She adds for bag one and takes away for bag two. If everything cancels out, the words use the same letters.', builder: 'Lengths match. count = {}. For each i: count[s[i]] += 1, count[t[i]] −= 1. Anagram iff every count is 0.', expert: 'One counting pass, O(n) time and O(1) space for a fixed alphabet. Sorting both words would be O(n log n).' } });
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = u[i];
    [a, b].forEach((k) => { if (!(k in count)) { count[k] = 0; order.push(k); } });
    count[a]++; count[b]--;
    const zeroed = [a, b].filter((k) => count[k] === 0 && a !== b);
    const kind = zeroed.length ? 'cancel' : 'tally';
    steps.push({ L: i, kind, board: tally(a, b),
      dialog: kind === 'cancel'
        ? [say('cleo', 'Bag one gives “' + a + '”, bag two gives “' + b + '”.'), say('hoot', '“' + zeroed.join('” and “') + '” ' + (zeroed.length > 1 ? 'are' : 'is') + ' back to zero — they balance out.')]
        : [say('cleo', 'Bag one gives “' + a + '” (+1), bag two gives “' + b + '” (−1).'), say('hoot', a === b ? 'Same letter from both bags — it cancels straight away.' : 'Nothing balances yet. Keep drawing.')],
      nar: { kid: 'From bag one, “' + a + '”: one more. From bag two, “' + b + '”: one less.' + (kind === 'cancel' ? ' The “' + zeroed.join('” and “') + '” count' + (zeroed.length > 1 ? 's are' : ' is') + ' back to zero!' : ''), builder: 'count["' + a + '"] = ' + count[a] + ', count["' + b + '"] = ' + count[b] + '.', expert: 'Invariant: count[c] = (occurrences of c in s[0..i]) − (occurrences in t[0..i]). Each step is O(1).' } });
  }
  steps.push({ L: s.length - 1, kind: 'found', board: order.map((k) => [k, '0', 'zero']),
    dialog: [say('cleo', 'Both bags are empty, and every letter in my tally is 0.'), say('hoot', 'Then “listen” and “silent” hold the very same tiles. It’s an anagram — True.')],
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
    board: true, boardTitle: 'Cleo’s tally',
    actorLabels: ['Cleo · i'],
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
    quest: ['Two friends each hold a bag of Scrabble tiles. One bag spells “listen”, the other spells “silent”.', 'Can one bag spell exactly the other’s word — nothing extra, nothing missing? Cleo will keep the tally.'],
    example: ['s = "listen"   t = "silent"', 'answer = True'],
    hints: ['Old Hoot: “Order doesn’t matter for an anagram. Only how many of each letter.”', '“Could one tally sheet serve both bags? Add for one, subtract for the other.”', '“If every letter ends at zero, nothing was extra and nothing was missing.”'],
    clues: ['same letters, any order', 'count, don’t compare positions', 'one pass is enough'],
    quizFb: ['Old Hoot: “Matching every tile against every other is O(n²) and fiddly with repeats.”', 'Old Hoot: “Walking in from both ends checks mirror images, not shuffles.”', 'Old Hoot: “A window of neighbours can’t see letters that moved far away.”', 'Old Hoot: “Yes! A tally of letters — +1 for one bag, −1 for the other — is a Hash Map of counts.”'],
    steps
  };
}
