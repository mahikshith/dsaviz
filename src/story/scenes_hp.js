// ---------- Heap: the triage nurse at the triage desk ----------
const hpList = (xs) => '[' + xs.join(', ') + ']';

// The Talent Show Top K — Kth Largest Element in an Array
function hpTalentScene() {
  const nums = [3, 2, 1, 5, 6, 4], k = 2;
  const steps = [];
  let room = []; // indices of the acts inside, kept weakest first; room[0] sits at the door
  const vals = () => room.map((j) => nums[j]);
  const sortRoom = () => { room.sort((a, b) => nums[a] - nums[b]); };
  const board = (fresh, hit) => room.map((j, p) => [String(nums[j]), p === 0 ? 'door' : 'inside', j === hit ? 'hit' : j === fresh ? 'fresh' : '']);
  steps.push({ L: 0, kind: 'intro', at: -1, room: [], gone: [], board: [],
    dialog: [say('narr', 'Six acts will perform tonight, each with a score. The triage nurse must name the act with the 2nd highest score.'), say('triage', 'My green room has only 2 chairs. I keep the weakest act in the chair by the door.'), say('narr', 'And when a new act comes along?'), say('triage', 'I only look at the one by the door. Beat them and you get a chair.')],
    nar: { kid: 'The triage nurse runs a small green room with 2 chairs. She lets in the best acts she has seen so far, and the weakest of them always sits by the door.', builder: 'room = [] is a min-heap. For each x: if the room has a free chair, push x. Otherwise, if x beats room[0], replace room[0] with x.', expert: 'A min-heap of size k keeps the k largest values seen so far. Its root is the kth largest of that prefix, and each step costs O(log k).' } });
  const gone = [];
  nums.forEach((x, i) => {
    if (room.length < k) {
      room.push(i); sortRoom();
      const v = vals();
      steps.push({ L: i, kind: 'push', at: i, room: v, gone: gone.slice(), board: board(i, -1),
        dialog: [say('triage', 'Score ' + x + '. ' + (room.length === 1 ? 'The room is empty' : 'One chair is still free') + ', so in you come.'), say('narr', 'The room holds ' + hpList(v) + '. The weakest, ' + v[0] + ', takes the chair by the door.')],
        nar: { kid: 'Act ' + x + ' walks straight in because a chair is free. The room now holds ' + v.join(' and ') + '.', builder: 'len(room) = ' + (room.length - 1) + ' < k → heappush(room, ' + x + '). room = ' + hpList(v) + ', room[0] = ' + v[0] + '.', expert: 'Fill phase: the first k values go in unconditionally. Each push sifts up in O(log k).' } });
    } else if (x > nums[room[0]]) {
      const out = room.shift(); gone.push(out);
      room.push(i); sortRoom();
      const v = vals();
      steps.push({ L: i, kind: 'replace', at: i, room: v, gone: gone.slice(), out, board: board(i, -1),
        dialog: [say('triage', 'Score ' + x + ' beats ' + nums[out] + ' by the door.'), say('triage', nums[out] + ', please leave. ' + x + ', take a chair.'), say('narr', 'The room is now ' + hpList(v) + '. ' + v[0] + ' moves to the door.')],
        nar: { kid: x + ' is better than ' + nums[out] + ', the weakest act inside. So ' + nums[out] + ' goes home and ' + x + ' sits down. Now ' + v[0] + ' is the weakest one.', builder: x + ' > room[0] = ' + nums[out] + ' → heapreplace(room, ' + x + '). room = ' + hpList(v) + '.', expert: nums[out] + ' now has at least k larger values ahead of it, so it can never be the kth largest. Pop and push in one O(log k) sift.' } });
    } else {
      const v = vals();
      steps.push({ L: i, kind: 'turnaway', at: i, room: v, gone: gone.concat([i]), board: board(-1, -1),
        dialog: [say('triage', 'Score ' + x + '. That does not beat ' + v[0] + ' by the door.'), say('narr', 'Then ' + x + ' can never be in the top 2. The triage nurse sends it home and the room stays as it is.')],
        nar: { kid: x + ' is not better than ' + v[0] + ', the weakest act inside. The room is full, so ' + x + ' goes home.', builder: x + ' ≤ room[0] = ' + v[0] + ' → skip. room stays ' + hpList(v) + '.', expert: 'k values already beat or tie ' + x + ', so it is below the kth largest. One O(1) peek, no heap work.' } });
      gone.push(i);
    }
  });
  const v = vals(), ans = v[0], ansAt = room[0];
  steps.push({ L: ansAt, kind: 'found', at: -1, room: v, gone: gone.slice(), board: board(-1, ansAt),
    dialog: [say('triage', 'That was the last act.'), say('narr', 'The room holds the top 2: ' + v.join(' and ') + '. The act by the door, ' + ans + ', is the 2nd best. The answer is ' + ans + '.')],
    nar: { kid: 'The show is over. The two best acts are ' + v.join(' and ') + ', and the one by the door, ' + ans + ', is second best.', builder: 'Loop ends → return room[0] = ' + ans + '.', expert: 'n = 6, k = 2: O(n log k) time, O(k) space. Sorting everything would cost O(n log n).' } });
  const T = { intro: ['Empty room, 2 chairs', 'plain'], push: ['Free chair → the act walks in', 'cool'], replace: ['Beats the door → swap them', 'warn'], turnaway: ['Not better than the door → sent home', 'plain'], found: ['2nd best: ' + ans, 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    const inside = st.board.map((r) => Number(r[0]));
    const doorIdx = st.room.length ? nums.indexOf(st.room[0]) : -1;
    st.cells = nums.map((x, j) => {
      if (st.done) return j === ansAt ? 'best' : inside.includes(x) ? 'ok' : 'out';
      if (st.kind === 'intro' || j > st.L) return 'future';
      if (j === st.at) return st.kind === 'turnaway' ? 'hit' : 'cur';
      if (st.gone.includes(j)) return 'out';
      return j === doorIdx ? 'buy' : 'in';
    });
    const seen = st.kind === 'intro' ? 0 : st.done ? 6 : st.L + 1;
    st.meter = { text: st.room.length ? 'door = ' + st.room[0] + ' · room ' + hpList(st.room) : 'room = []', pct: (seen / 6) * 100, mark: 100, markLabel: 'acts seen ' + seen + ' / 6' };
    st.watch = [['x', st.at >= 0 ? nums[st.at] : '—', 'left'], ['k', k, 'text'], ['room', hpList(st.room), 'right'], ['len(room)', st.room.length, 'text'], ['room[0]', st.room.length ? st.room[0] : '—', 'right'], ['result', st.done ? ans : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'kth-largest', pattern: 'Heap', cast: 'hp', short: 'Talent Show', visual: 'letters', items: nums.map(String), pitch: 72, tile: 56, tileH: 70, gap: 16, font: 28, width: 416,
    board: true, boardTitle: 'The triage nurse’s room · door on top',
    actorLabels: ['Triage nurse · x'],
    goal: 'Name the act with the 2nd highest score', status: ['Show running…', 'Answer found'],
    lines: { py: { intro: 2, push: 5, turnaway: 6, replace: 7, found: 8 }, java: { intro: 2, push: 5, turnaway: 6, replace: 7, found: 11 }, cpp: { intro: 2, push: 5, turnaway: 6, replace: 7, found: 11 }, js: { intro: 2, push: 5, turnaway: 6, replace: 7, found: 11 }, go: { intro: 2, push: 5, turnaway: 6, replace: 7, found: 11 } },
    code: {
      py: [['def findKthLargest(nums, k):', ''], ['    room = []', '  # min-heap, weakest at the door'], ['    for x in nums:', ''], ['        if len(room) < k:', ''], ['            heapq.heappush(room, x)', ''], ['        elif x > room[0]:', ''], ['            heapq.heapreplace(room, x)', '  # beat the door'], ['    return room[0]', '']],
      java: [['int findKthLargest(int[] nums, int k) {', ''], ['    PriorityQueue<Integer> room = new PriorityQueue<>();', ''], ['    for (int x : nums) {', ''], ['        if (room.size() < k)', ''], ['            room.offer(x);', ''], ['        else if (x > room.peek()) {', ''], ['            room.poll();', '  // the door leaves'], ['            room.offer(x);', ''], ['        }', ''], ['    }', ''], ['    return room.peek();', ''], ['}', '']],
      cpp: [['int findKthLargest(vector<int>& nums, int k) {', ''], ['    priority_queue<int, vector<int>, greater<int>> room;', ''], ['    for (int x : nums) {', ''], ['        if (room.size() < k)', ''], ['            room.push(x);', ''], ['        else if (x > room.top()) {', ''], ['            room.pop();', '  // the door leaves'], ['            room.push(x);', ''], ['        }', ''], ['    }', ''], ['    return room.top();', ''], ['}', '']],
      js: [['function findKthLargest(nums, k) {', ''], ['  const room = new MinHeap();', '  // push, pop, peek, size'], ['  for (const x of nums) {', ''], ['    if (room.size() < k)', ''], ['      room.push(x);', ''], ['    else if (x > room.peek()) {', ''], ['      room.pop();', '  // the door leaves'], ['      room.push(x);', ''], ['    }', ''], ['  }', ''], ['  return room.peek();', ''], ['}', '']],
      go: [['func findKthLargest(nums []int, k int) int {', ''], ['    room := &IntHeap{}', '  // min-heap via container/heap'], ['    for _, x := range nums {', ''], ['        if room.Len() < k {', ''], ['            heap.Push(room, x)', ''], ['        } else if x > (*room)[0] {', ''], ['            (*room)[0] = x', '  // the door leaves'], ['            heap.Fix(room, 0)', ''], ['        }', ''], ['    }', ''], ['    return (*room)[0]', ''], ['}', '']]
    },
    rules: [['Open an empty room with k chairs', 'intro'], ['Free chair → the act walks in', 'push'], ['Beats the one by the door → swap them', 'replace'], ['Not better than the door → sent home', 'turnaway'], ['Show over → the door holds the answer', 'found']],
    complexity: [['O(n log k)', 'each act costs one small sift'], ['O(k)', 'the room never holds more than k']],
    quest: ['Six acts perform at the village talent show. Their scores come in one at a time: 3, 2, 1, 5, 6, 4.', 'The judges want the act with the 2nd highest score. The triage nurse has a green room with just 2 chairs, and she must decide who gets one.'],
    example: ['nums = [3, 2, 1, 5, 6, 4]   k = 2', 'answer = 5   (6 is first, 5 is second)'],
    hints: ['“You only need the top 2. Do you really have to remember all six scores?”', '“Keep the best 2 you have seen so far. Which of those two is the one in danger of losing a chair?”', '“Seat the weakest of the room by the door. A newcomer only has to beat that one act.”'],
    clues: ['the kth best, not the best', 'scores arrive in any order', 'no need to sort everything'],
    quizFb: ['“Sorting works, but it orders all six acts when you only care about two. With a million acts that is a lot of wasted work.”', '“Rescanning every act each time is O(n·k) or worse. The triage nurse only needs one glance at the door.”', '“Yes! A small room of k, weakest by the door. Each newcomer is one comparison and maybe one swap.”', '“The scores are not sorted, so walking in from both ends tells you nothing.”'],
    steps
  };
}

// The Most-Requested Songs — Top K Frequent Elements
function hpSongsScene() {
  const nums = [1, 2, 3, 2, 4, 3, 2], k = 2;
  const songs = [], plays = {};
  nums.forEach((x) => { if (!(x in plays)) { plays[x] = 0; songs.push(x); } plays[x]++; });
  const steps = [];
  let room = []; // song positions, fewest plays first
  const sortRoom = () => { room.sort((a, b) => plays[songs[a]] - plays[songs[b]]); };
  const tup = (j) => '(' + plays[songs[j]] + ', ' + songs[j] + ')';
  const board = (fresh, hit) => room.map((j, p) => ['song ' + songs[j], '×' + plays[songs[j]], hit ? 'hit' : j === fresh ? 'fresh' : '']);
  const tally = songs.map((s) => s + ' ×' + plays[s]).join(', ');
  steps.push({ L: 0, kind: 'intro', at: -1, room: [], gone: [], board: [],
    dialog: [say('narr', 'The radio got seven requests: 1, 2, 3, 2, 4, 3, 2. Which 2 songs were asked for most?'), say('shop', 'I tallied them for you: ' + tally + '.'), say('triage', 'Thanks, shopkeeper. My booth has 2 slots. The song with the fewest plays sits by the door.')],
    nar: { kid: 'The shopkeeper counted how often each song was asked for. Now the triage nurse picks the 2 most popular, keeping a small booth with room for only 2 songs.', builder: 'plays = Counter(nums) → {' + songs.map((s) => s + ': ' + plays[s]).join(', ') + '}. room is a min-heap of (plays, song) with at most k entries.', expert: 'Counting is O(n). The heap then sweeps the m distinct songs in O(m log k), cheaper than sorting all m when k is small.' } });
  const gone = [];
  songs.forEach((s, j) => {
    const c = plays[s];
    if (room.length < k) {
      room.push(j); sortRoom();
      steps.push({ L: j, kind: 'push', at: j, room: room.slice(), gone: gone.slice(), board: board(j, false),
        dialog: [say('triage', 'Song ' + s + ', asked for ' + c + (c === 1 ? ' time' : ' times') + '. A slot is free, so it goes in.'), say('narr', 'By the door now: song ' + songs[room[0]] + ' with ' + plays[songs[room[0]]] + '.')],
        nar: { kid: 'Song ' + s + ' gets a slot because the booth is not full yet.', builder: 'len(room) < k → heappush(room, (' + c + ', ' + s + ')). room[0] = ' + tup(room[0]) + '.', expert: 'Tuples compare by plays first, so the root is always the least-requested song in the booth.' } });
    } else if (c > plays[songs[room[0]]]) {
      const out = room.shift(); gone.push(out);
      room.push(j); sortRoom();
      steps.push({ L: j, kind: 'replace', at: j, room: room.slice(), gone: gone.slice(), out, board: board(j, false),
        dialog: [say('triage', 'Song ' + s + ' has ' + c + ' plays. Song ' + songs[out] + ' by the door has only ' + plays[songs[out]] + '.'), say('triage', 'Song ' + songs[out] + ' is out, song ' + s + ' is in.'), say('narr', 'Now song ' + songs[room[0]] + ' guards the door with ' + plays[songs[room[0]]] + ' plays.')],
        nar: { kid: 'Song ' + s + ' was asked for more often than song ' + songs[out] + ', so they swap. Song ' + songs[out] + ' leaves the booth.', builder: c + ' > room[0][0] = ' + plays[songs[out]] + ' → heapreplace(room, (' + c + ', ' + s + ')).', expert: 'Two songs now beat song ' + songs[out] + ', so it can never be in the top 2. One O(log k) sift.' } });
    } else {
      steps.push({ L: j, kind: 'turnaway', at: j, room: room.slice(), gone: gone.concat([j]), board: board(-1, false),
        dialog: [say('triage', 'Song ' + s + ', just ' + c + (c === 1 ? ' play' : ' plays') + '. That does not beat song ' + songs[room[0]] + ' by the door.'), say('narr', 'So it stays outside. The booth does not change.')],
        nar: { kid: 'Song ' + s + ' was not asked for often enough, so it does not get into the booth.', builder: c + ' ≤ room[0][0] = ' + plays[songs[room[0]]] + ' → skip.', expert: 'A single O(1) peek rules it out; the heap is untouched.' } });
      gone.push(j);
    }
  });
  const ans = room.map((j) => songs[j]);
  steps.push({ L: room[room.length - 1], kind: 'found', at: -1, room: room.slice(), gone: gone.slice(), board: board(-1, true),
    dialog: [say('triage', 'Every song has had its turn.'), say('narr', 'The booth holds song ' + ans.join(' and song ') + '. Those are the 2 most requested. The answer is ' + hpList(ans) + ', in any order.')],
    nar: { kid: 'The two songs left in the booth, ' + ans.join(' and ') + ', are the most requested ones.', builder: 'return [song for c, song in room] = ' + hpList(ans) + '.', expert: 'O(n + m log k) time and O(m) space for the tally. A bucket list by count can reach O(n), but the heap is the general tool.' } });
  const T = { intro: ['Tally done, booth empty', 'plain'], push: ['Free slot → the song goes in', 'cool'], replace: ['More plays than the door → swap', 'warn'], turnaway: ['Fewer plays than the door → stays out', 'plain'], found: ['Top 2: songs ' + ans.join(' and '), 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    const door = st.room.length ? st.room[0] : -1;
    st.cells = songs.map((_, j) => {
      if (st.done) return st.room.includes(j) ? 'ok' : 'out';
      if (st.kind === 'intro' || j > st.L) return 'future';
      if (j === st.at) return st.kind === 'turnaway' ? 'hit' : 'cur';
      if (st.gone.includes(j)) return 'out';
      return j === door ? 'buy' : 'in';
    });
    const seen = st.kind === 'intro' ? 0 : st.done ? songs.length : st.L + 1;
    const inside = st.room.map((j) => songs[j]);
    st.meter = { text: door >= 0 ? 'door = song ' + songs[door] + ' ×' + plays[songs[door]] : 'booth = []', pct: (seen / songs.length) * 100, mark: 100, markLabel: 'songs checked ' + seen + ' / ' + songs.length };
    st.watch = [['song', st.at >= 0 ? songs[st.at] : '—', 'left'], ['plays[song]', st.at >= 0 ? plays[songs[st.at]] : '—', 'left'], ['room songs', hpList(inside), 'right'], ['len(room)', st.room.length, 'text'], ['room[0]', door >= 0 ? tup(door) : '—', 'right'], ['result', st.done ? hpList(ans) : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'top-k-frequent', pattern: 'Heap', cast: 'hp', short: 'Song Requests', visual: 'letters', items: songs.map(String), pitch: 72, tile: 56, tileH: 70, gap: 16, font: 28, width: 272,
    board: true, boardTitle: 'The triage nurse’s booth · door on top',
    actorLabels: ['Triage nurse · song'],
    goal: 'Find the 2 songs people asked for most', status: ['Sorting requests…', 'Top 2 found'],
    lines: { py: { intro: 2, push: 6, turnaway: 7, replace: 8, found: 9 }, java: { intro: 3, push: 8, turnaway: 9, replace: 10, found: 14 }, cpp: { intro: 3, push: 7, turnaway: 8, replace: 9, found: 15 }, js: { intro: 3, push: 7, turnaway: 8, replace: 9, found: 13 }, go: { intro: 3, push: 7, turnaway: 8, replace: 9, found: 15 } },
    code: {
      py: [['def topKFrequent(nums, k):', ''], ['    plays = Counter(nums)', '  # the shopkeeper’s tally'], ['    room = []', '  # min-heap of (plays, song)'], ['    for song, c in plays.items():', ''], ['        if len(room) < k:', ''], ['            heapq.heappush(room, (c, song))', ''], ['        elif c > room[0][0]:', ''], ['            heapq.heapreplace(room, (c, song))', ''], ['    return [song for c, song in room]', '']],
      java: [['int[] topKFrequent(int[] nums, int k) {', ''], ['    Map<Integer, Integer> plays = new HashMap<>();', ''], ['    for (int x : nums) plays.merge(x, 1, Integer::sum);', ''], ['    PriorityQueue<int[]> room = new PriorityQueue<>((a, b) -> a[0] - b[0]);', ''], ['    for (var e : plays.entrySet()) {', ''], ['        int c = e.getValue(), song = e.getKey();', ''], ['        if (room.size() < k)', ''], ['            room.offer(new int[]{c, song});', ''], ['        else if (c > room.peek()[0]) {', ''], ['            room.poll();', '  // the door leaves'], ['            room.offer(new int[]{c, song});', ''], ['        }', ''], ['    }', ''], ['    return room.stream().mapToInt(a -> a[1]).toArray();', ''], ['}', '']],
      cpp: [['vector<int> topKFrequent(vector<int>& nums, int k) {', ''], ['    map<int, int> plays;', ''], ['    for (int x : nums) plays[x]++;', ''], ['    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> room;', ''], ['    for (auto [song, c] : plays) {', ''], ['        if (room.size() < k)', ''], ['            room.push({c, song});', ''], ['        else if (c > room.top().first) {', ''], ['            room.pop();', '  // the door leaves'], ['            room.push({c, song});', ''], ['        }', ''], ['    }', ''], ['    vector<int> out;', ''], ['    for (; !room.empty(); room.pop()) out.push_back(room.top().second);', ''], ['    return out;', ''], ['}', '']],
      js: [['function topKFrequent(nums, k) {', ''], ['  const plays = new Map();', ''], ['  for (const x of nums) plays.set(x, (plays.get(x) || 0) + 1);', ''], ['  const room = new MinHeap((a, b) => a[0] - b[0]);', ''], ['  for (const [song, c] of plays) {', ''], ['    if (room.size() < k)', ''], ['      room.push([c, song]);', ''], ['    else if (c > room.peek()[0]) {', ''], ['      room.pop();', '  // the door leaves'], ['      room.push([c, song]);', ''], ['    }', ''], ['  }', ''], ['  return room.toArray().map(([c, song]) => song);', ''], ['}', '']],
      go: [['func topKFrequent(nums []int, k int) []int {', ''], ['    plays := map[int]int{}', ''], ['    for _, x := range nums { plays[x]++ }', ''], ['    room := &PairHeap{}', '  // min-heap on p[0]'], ['    for song, c := range plays {', ''], ['        if room.Len() < k {', ''], ['            heap.Push(room, [2]int{c, song})', ''], ['        } else if c > (*room)[0][0] {', ''], ['            (*room)[0] = [2]int{c, song}', ''], ['            heap.Fix(room, 0)', ''], ['        }', ''], ['    }', ''], ['    out := []int{}', ''], ['    for _, p := range *room { out = append(out, p[1]) }', ''], ['    return out', ''], ['}', '']]
    },
    rules: [['Tally first, then open an empty booth', 'intro'], ['Free slot → the song goes in', 'push'], ['More plays than the door → swap them', 'replace'], ['Fewer plays than the door → stays out', 'turnaway'], ['Every song checked → the booth is the answer', 'found']],
    complexity: [['O(n log k)', 'one count each, one small sift per song'], ['O(n)', 'the tally can hold every song']],
    quest: ['The village radio took seven song requests tonight: 1, 2, 3, 2, 4, 3, 2.', 'The DJ will only play the 2 songs people asked for most. The shopkeeper has counted the requests, and the triage nurse must choose which songs get a slot in her tiny booth.'],
    example: ['nums = [1, 2, 3, 2, 4, 3, 2]   k = 2', 'answer = [2, 3]   (song 2 ×3, song 3 ×2, any order)'],
    hints: ['“Before you can pick favourites, you need to know how often each song was asked for. Who is good at counting?”', '“Once the counts are known, this is the talent show again: keep only the best k.”', '“Seat the least-requested song of the booth by the door. A new song only has to beat that one.”'],
    clues: ['how often, not how big', 'only the top k matter', 'counts first, then choose'],
    quizFb: ['“Sorting every song by plays works, but it orders songs you will throw away. The booth only needs k.”', '“Rescanning all songs for the most popular one, k times over, repeats a lot of work.”', '“Yes! The shopkeeper counts, then the triage nurse keeps a booth of k, least-requested by the door.”', '“The requests are not in any order, so two friends from the ends have nothing to squeeze.”'],
    steps
  };
}

// The Train Yard Merge — Merge k Sorted Lists
function hpYardScene() {
  const trains = [['A', [2, 5, 8]], ['B', [1, 6]], ['C', [3, 4]]];
  const cars = []; // every carriage in the yard, train by train
  trains.forEach(([name, vs]) => vs.forEach((v, pos) => cars.push({ name, v, pos, idx: cars.length })));
  const carOf = (name, pos) => cars.find((c) => c.name === name && c.pos === pos);
  const total = cars.length;
  const steps = [];
  let desk = [];
  const sortDesk = () => { desk.sort((a, b) => a.v - b.v); };
  const merged = [];
  const deskVals = () => desk.map((c) => c.v);
  const board = (fresh) => desk.map((c) => [String(c.v), 'train ' + c.name, c === fresh ? 'fresh' : '']);
  steps.push({ L: 0, kind: 'intro', sent: -1, desk: [], deskIdx: [], merged: [], board: [],
    dialog: [say('narr', 'Three sorted trains wait in the yard: A is 2, 5, 8. B is 1, 6. C is 3, 4. Make one sorted train out of them.'), say('triage', 'I only need to see the front carriage of each train. The smallest front always leaves next.'), say('narr', 'And your desk keeps the smallest one on top?'), say('triage', 'Always. That is what my desk is for.')],
    nar: { kid: 'Three trains are already in order from small to big. The triage nurse will build one long train by always sending out the smallest front carriage.', builder: 'desk is a min-heap of front carriages, one per train. Pop the smallest, couple it to the out train, then push the next carriage of that same train.', expert: 'The heap holds at most k nodes. Every one of the N nodes is pushed and popped once, so the merge is O(N log k).' } });
  trains.forEach(([name]) => desk.push(carOf(name, 0)));
  sortDesk();
  steps.push({ L: desk[0].idx, kind: 'seed', sent: -1, desk: deskVals(), deskIdx: desk.map((c) => c.idx), merged: [], board: board(null),
    dialog: [say('triage', 'Fronts on my desk: ' + trains.map(([name]) => name + carOf(name, 0).v).join(', ') + '.'), say('narr', 'The smallest is on top: ' + desk[0].v + ' from train ' + desk[0].name + '.')],
    nar: { kid: 'The triage nurse puts the first carriage of each train on her desk: ' + deskVals().join(', ') + '. She can see at once that ' + desk[0].v + ' is the smallest.', builder: 'Push every non-empty head: desk = ' + hpList(deskVals()) + ', desk[0] = ' + desk[0].v + '.', expert: 'Seeding costs O(k log k), or O(k) with heapify.' } });
  while (desk.length) {
    const c = desk.shift();
    merged.push(c.v);
    const nxt = carOf(c.name, c.pos + 1);
    if (nxt) {
      desk.push(nxt); sortDesk();
      steps.push({ L: c.idx, kind: 'send', sent: c.idx, desk: deskVals(), deskIdx: desk.map((d) => d.idx), merged: merged.slice(), board: board(nxt), from: c.name,
        dialog: [say('triage', c.v + ' from train ' + c.name + ' is the smallest. Out it goes.'), say('triage', 'Train ' + c.name + ' moves up its next carriage: ' + nxt.v + '.'), say('narr', 'Desk: ' + hpList(deskVals()) + '. Out train: ' + merged.join(' → ') + '.')],
        nar: { kid: 'The triage nurse sends ' + c.v + ' to the out train. Train ' + c.name + ' still has carriages, so its next one, ' + nxt.v + ', comes up to the desk.', builder: 'heappop → ' + c.v + ' (train ' + c.name + '); tail.next = it; push its next, ' + nxt.v + '. desk = ' + hpList(deskVals()) + '.', expert: 'The popped node is the global minimum of every carriage not yet sent, because each train is sorted and its front is on the desk.' } });
    } else {
      steps.push({ L: c.idx, kind: 'empty', sent: c.idx, desk: deskVals(), deskIdx: desk.map((d) => d.idx), merged: merged.slice(), board: board(null), from: c.name,
        dialog: [say('triage', c.v + ' from train ' + c.name + ' is the smallest. Out it goes.'), say('narr', 'Train ' + c.name + ' has no carriages left, so nothing new comes to the desk.' + (desk.length ? ' Desk: ' + hpList(deskVals()) + '.' : ' The desk is empty.'))],
        nar: { kid: 'The triage nurse sends ' + c.v + ' out. That was the last carriage of train ' + c.name + ', so the desk gets smaller.', builder: 'heappop → ' + c.v + '; node.next is None → push nothing. desk = ' + hpList(deskVals()) + '.', expert: 'A finished list simply drops out; the heap shrinks toward empty, which ends the loop.' } });
    }
  }
  steps.push({ L: cars.find((c) => c.v === merged[merged.length - 1]).idx, kind: 'found', sent: -1, desk: [], deskIdx: [], merged: merged.slice(), board: [],
    dialog: [say('triage', 'The desk is empty. Every carriage has left the yard.'), say('narr', 'One sorted train: ' + merged.join(' → ') + '. Well done, triage nurse.')],
    nar: { kid: 'All ' + total + ' carriages are in one train, smallest to biggest: ' + merged.join(', ') + '.', builder: 'desk is empty → return head.next = ' + merged.join(' → ') + '.', expert: 'N = ' + total + ', k = 3: O(N log k) time and O(k) extra space. Merging the trains one after another would cost O(N·k).' } });
  const T = { intro: ['Three sorted trains in the yard', 'plain'], seed: ['Fronts go on the desk', 'cool'], send: ['Smallest out → its train moves up', 'warn'], empty: ['Smallest out → that train is finished', 'cool'], found: ['One sorted train', 'ok'] };
  const order = cars.slice().sort((a, b) => a.v - b.v).map((c) => c.idx);
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    const out = order.slice(0, st.merged.length);
    st.cells = cars.map((c) => (st.done ? 'ok' : c.idx === st.sent ? 'cur' : out.includes(c.idx) ? 'stored' : st.deskIdx.includes(c.idx) ? 'in' : 'future'));
    st.cells2 = order.map((_, p) => (st.done ? 'ok' : p < st.merged.length - 1 ? 'stored' : p === st.merged.length - 1 && st.sent >= 0 ? 'cur' : 'future'));
    const n = st.merged.length;
    st.meter = { text: st.desk.length ? 'desk[0] = ' + st.desk[0] : st.done ? 'desk = []' : 'desk = []', pct: (n / total) * 100, mark: 100, markLabel: 'carriages out ' + n + ' / ' + total };
    st.watch = [['popped', st.sent >= 0 ? cars[st.sent].v : '—', 'left'], ['train', st.sent >= 0 ? cars[st.sent].name : '—', 'left'], ['desk', hpList(st.desk), 'right'], ['len(desk)', st.desk.length, 'text'], ['desk[0]', st.desk.length ? st.desk[0] : '—', 'right'], ['merged', n ? st.merged.join('→') : '—', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'merge-k-lists', pattern: 'Heap', cast: 'hp', short: 'Train Yard', visual: 'letters', items: cars.map((c) => c.name + c.v), items2: order.map((i) => String(cars[i].v)), rowLabels: ['yard', 'out'], pitch: 54, tile: 44, tileH: 48, gap: 10, font: 18, width: 368,
    board: true, boardTitle: 'The triage nurse’s desk · smallest on top',
    actorLabels: ['Triage nurse · sent'],
    goal: 'Couple three sorted trains into one sorted train', status: ['Merging…', 'One train'],
    lines: { py: { intro: 2, seed: 5, empty: 10, send: 12, found: 13 }, java: { intro: 2, seed: 4, empty: 9, send: 10, found: 12 }, cpp: { intro: 3, seed: 5, empty: 10, send: 11, found: 13 }, js: { intro: 2, seed: 4, empty: 10, send: 11, found: 13 }, go: { intro: 2, seed: 5, empty: 13, send: 15, found: 18 } },
    code: {
      py: [['def mergeKLists(lists):', ''], ['    desk = []', '  # min-heap of front carriages'], ['    for i, node in enumerate(lists):', ''], ['        if node:', ''], ['            heapq.heappush(desk, (node.val, i, node))', ''], ['    head = tail = ListNode(0)', ''], ['    while desk:', ''], ['        val, i, node = heapq.heappop(desk)', ''], ['        tail.next = node', ''], ['        tail = node', ''], ['        if node.next:', ''], ['            heapq.heappush(desk, (node.next.val, i, node.next))', ''], ['    return head.next', '']],
      java: [['ListNode mergeKLists(ListNode[] lists) {', ''], ['    PriorityQueue<ListNode> desk = new PriorityQueue<>((a, b) -> a.val - b.val);', ''], ['    for (ListNode node : lists)', ''], ['        if (node != null) desk.offer(node);', ''], ['    ListNode head = new ListNode(0), tail = head;', ''], ['    while (!desk.isEmpty()) {', ''], ['        ListNode node = desk.poll();', ''], ['        tail.next = node;', ''], ['        tail = node;', ''], ['        if (node.next != null) desk.offer(node.next);', ''], ['    }', ''], ['    return head.next;', ''], ['}', '']],
      cpp: [['ListNode* mergeKLists(vector<ListNode*>& lists) {', ''], ['    auto later = [](ListNode* a, ListNode* b) { return a->val > b->val; };', ''], ['    priority_queue<ListNode*, vector<ListNode*>, decltype(later)> desk(later);', ''], ['    for (ListNode* node : lists)', ''], ['        if (node) desk.push(node);', ''], ['    ListNode head(0), *tail = &head;', ''], ['    while (!desk.empty()) {', ''], ['        ListNode* node = desk.top(); desk.pop();', ''], ['        tail->next = node;', ''], ['        tail = node;', ''], ['        if (node->next) desk.push(node->next);', ''], ['    }', ''], ['    return head.next;', ''], ['}', '']],
      js: [['function mergeKLists(lists) {', ''], ['  const desk = new MinHeap((a, b) => a.val - b.val);', ''], ['  for (const node of lists)', ''], ['    if (node) desk.push(node);', ''], ['  const head = new ListNode(0);', ''], ['  let tail = head;', ''], ['  while (desk.size() > 0) {', ''], ['    const node = desk.pop();', ''], ['    tail.next = node;', ''], ['    tail = node;', ''], ['    if (node.next) desk.push(node.next);', ''], ['  }', ''], ['  return head.next;', ''], ['}', '']],
      go: [['func mergeKLists(lists []*ListNode) *ListNode {', ''], ['    desk := &NodeHeap{}', '  // min-heap on Val'], ['    for _, node := range lists {', ''], ['        if node != nil {', ''], ['            heap.Push(desk, node)', ''], ['        }', ''], ['    }', ''], ['    head := &ListNode{}', ''], ['    tail := head', ''], ['    for desk.Len() > 0 {', ''], ['        node := heap.Pop(desk).(*ListNode)', ''], ['        tail.Next = node', ''], ['        tail = node', ''], ['        if node.Next != nil {', ''], ['            heap.Push(desk, node.Next)', ''], ['        }', ''], ['    }', ''], ['    return head.Next', ''], ['}', '']]
    },
    rules: [['Start with an empty desk', 'intro'], ['Put every train’s front on the desk', 'seed'], ['Send the smallest, bring up its next carriage', 'send'], ['Send the smallest, its train is finished', 'empty'], ['Desk empty → the out train is done', 'found']],
    complexity: [['O(N log k)', 'each carriage passes the desk once'], ['O(k)', 'one front per train on the desk']],
    quest: ['Three trains pull into the yard, each already sorted from small to big: A carries 2, 5, 8. B carries 1, 6. C carries 3, 4.', 'The station master wants one long train, still sorted. The triage nurse keeps the front carriage of every train on her desk and always knows which one is smallest.'],
    example: ['lists = [[2, 5, 8], [1, 6], [3, 4]]', 'answer = 1 → 2 → 3 → 4 → 5 → 6 → 8'],
    hints: ['“Each train is already sorted. Where in a train is its smallest carriage?”', '“So the next carriage of the big train must be one of the fronts. How many fronts are there?”', '“Keep the fronts on a desk that always shows the smallest. Send it out, then bring up the next carriage from the same train.”'],
    clues: ['every train is sorted', 'only the fronts can be next', 'many trains, one output'],
    quizFb: ['“Pouring every carriage into one pile and sorting works, but it throws away the order the trains already had.”', '“Comparing all k fronts every time is O(k) per carriage. The desk gets it down to O(log k).”', '“Yes! A desk of fronts, smallest on top. Send it, bring up the next from that train, repeat.”', '“Two friends from both ends only works on one sorted row. We have three trains to weave together.”'],
    steps
  };
}

SCENE_REGISTRY.push(hpTalentScene, hpSongsScene, hpYardScene);
PATTERN_KITS['Heap'] = { right: 2, spot: 'Why a small room, not a full sort?', ask: 'How should the triage nurse choose?',
  quiz: [['Sort the whole line', 'Put everything in order, then read from the top'], ['Rescan everyone each time', 'Look over every candidate whenever you need the next'], ['A triage desk', 'Keep only the few that matter, weakest at the door'], ['Two friends from both ends', 'One at each end, walking inward']] };
STORY_CAST.triage = { name: 'Triage nurse', initial: 'N', color: 'left', radius: '10px' };
