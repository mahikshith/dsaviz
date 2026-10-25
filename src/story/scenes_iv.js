
// ---------- Intervals: the  scheduler with the fat diary ----------
const ivText = (m) => m[0] + '-' + m[1];
const ivList = (list) => '[' + list.map((m) => '[' + m[0] + ',' + m[1] + ']').join(', ') + ']';

// The Meeting Room Diary — Merge Intervals
function diaryScene() {
  const given = [[6, 8], [1, 3], [14, 16], [2, 5], [9, 12], [10, 11]];
  const meets = given.slice().sort((a, b) => a[0] - b[0]);
  const steps = [];
  const merged = [];
  const owner = [];   // which merged block each meeting went into
  const rows = (fresh) => merged.map((m, k) => [ivText(m), 'block ' + (k + 1), k === fresh ? 'fresh' : '']);
  const snap = (o) => Object.assign({ board: rows(o.fresh), merged: merged.map((m) => m.slice()), owner: owner.slice() }, o);
  steps.push(snap({ L: 0, kind: 'intro', fresh: -1,
    dialog: [say('narr', 'Six meetings for one room, written in no order. Some of them overlap.'), say('sched', 'First I sort them by start time: 1-3, 2-5, 6-8, 9-12, 10-11, 14-16.'), say('narr', 'Then?'), say('sched', 'I walk through once. If a meeting starts before my last block ends, I stretch that block.')],
    nar: { kid: 'The scheduler puts the meetings in order of when they start. Then she copies them into her diary, joining any that overlap into one long block.', builder: 'Sort by start. merged = []. For each meeting: if it starts after the last block ends, add a new block; otherwise set last.end = max(last.end, end).', expert: 'After sorting, a meeting can only overlap the most recent block, so one comparison per meeting is enough. O(n log n) for the sort, O(n) for the sweep.' } }));
  meets.forEach((m, i) => {
    const lastB = merged[merged.length - 1];
    if (!lastB || lastB[1] < m[0]) {
      const before = lastB ? lastB[1] : null;
      merged.push(m.slice());
      owner.push(merged.length - 1);
      steps.push(snap({ L: i, kind: 'add', fresh: merged.length - 1,
        dialog: lastB
          ? [say('sched', 'Meeting ' + ivText(m) + ' starts at ' + m[0] + '. My last block ended at ' + before + '.'), say('narr', 'No overlap. Write it down as a new block.')]
          : [say('sched', 'Meeting ' + ivText(m) + ' is the first one.'), say('narr', 'An empty diary, so it starts the first block.')],
        nar: { kid: lastB ? 'Meeting ' + ivText(m) + ' starts after the last block is over, so the scheduler writes it as a new block.' : 'The diary is empty, so meeting ' + ivText(m) + ' becomes the first block.', builder: lastB ? 'last.end = ' + before + ' < start = ' + m[0] + ' → merged.append([' + m[0] + ', ' + m[1] + ']).' : 'merged is empty → merged.append([' + m[0] + ', ' + m[1] + ']).', expert: lastB ? 'Every later meeting starts at ' + m[0] + ' or later, so block ' + (merged.length - 1) + ' is final now.' : 'merged = ' + ivList(merged) + '.' } }));
      return;
    }
    const oldEnd = lastB[1];
    lastB[1] = Math.max(lastB[1], m[1]);
    owner.push(merged.length - 1);
    const grew = lastB[1] > oldEnd;
    steps.push(snap({ L: i, kind: grew ? 'extend' : 'inside', fresh: merged.length - 1,
      dialog: grew
        ? [say('sched', 'Meeting ' + ivText(m) + ' starts at ' + m[0] + ', before my block ends at ' + oldEnd + '.'), say('narr', 'They overlap. Stretch the block to end at ' + lastB[1] + '.')]
        : [say('sched', 'Meeting ' + ivText(m) + ' starts at ' + m[0] + ', inside my block ' + lastB[0] + '-' + oldEnd + '.'), say('narr', 'It ends at ' + m[1] + ', before the block does. The block stays ' + ivText(lastB) + '.')],
      nar: { kid: grew ? 'Meeting ' + ivText(m) + ' begins before the last block is over, so they overlap. The scheduler stretches the block to ' + ivText(lastB) + '.' : 'Meeting ' + ivText(m) + ' fits completely inside the block ' + ivText(lastB) + ', so the block does not change.', builder: 'start = ' + m[0] + ' ≤ last.end = ' + oldEnd + ' → last.end = max(' + oldEnd + ', ' + m[1] + ') = ' + lastB[1] + '.', expert: grew ? 'Overlap with the newest block only: an older block ended before this block started.' : 'This is why we take the max. Writing last.end = ' + m[1] + ' would shrink the block and lose 11-12.' } }));
  });
  steps.push(snap({ L: meets.length - 1, kind: 'found', fresh: -1,
    dialog: [say('sched', 'That was the last meeting.'), say('narr', 'The diary holds ' + merged.length + ' blocks: ' + merged.map(ivText).join(', ') + '. That is the answer.')],
    nar: { kid: 'All six meetings are in the diary. Joined together, they make ' + merged.length + ' blocks: ' + merged.map(ivText).join(', ') + '.', builder: 'return merged = ' + ivList(merged) + '.', expert: 'O(n log n) time for the sort, O(n) extra space for the output. Comparing every pair of meetings would be O(n²).' } }));
  const T = { intro: ['Sorted by start', 'plain'], add: ['Starts after the block → new block', 'cool'], extend: ['Overlaps → stretch the block', 'warn'], inside: ['Inside the block → keep it', 'warn'], found: [merged.length + ' blocks in the diary', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = meets.map((_, i) => {
      if (st.kind === 'intro') return 'future';
      if (st.done) return 'ok';
      if (i === st.L) return 'cur';
      if (i < st.L) return 'stored';
      return 'future';
    });
    const last = st.merged[st.merged.length - 1];
    const n = st.kind === 'intro' ? 0 : st.L + 1;
    st.meter = { text: st.kind === 'intro' ? 'diary = []' : st.done ? 'diary = ' + st.merged.length + ' blocks' : 'last block = ' + ivText(last), pct: (n / meets.length) * 100, mark: 100, markLabel: 'meetings placed ' + n + ' / ' + meets.length };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['meeting', st.kind === 'intro' ? '—' : ivText(meets[st.L]), 'left'], ['last block', last ? ivText(last) : '—', 'right'], ['last.end', last ? last[1] : '—', 'right'], ['len(merged)', st.merged.length, 'text'], ['result', st.done ? ivList(st.merged) : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'merge-intervals', pattern: 'Intervals', cast: 'iv', short: 'Diary', visual: 'letters', items: meets.map(ivText), pitch: 68, tile: 58, tileH: 56, gap: 10, font: 18, width: 398,
    board: true, boardTitle: 'The scheduler’s diary',
    actorLabels: ['Scheduler · i'],
    goal: 'Join every overlapping meeting into one block', status: ['Writing the diary…', 'Diary tidy'],
    lines: { py: { intro: 2, add: 6, extend: 8, inside: 8, found: 9 }, java: { intro: 2, add: 7, extend: 9, inside: 9, found: 11 }, cpp: { intro: 2, add: 6, extend: 8, inside: 8, found: 10 }, js: { intro: 2, add: 7, extend: 9, inside: 9, found: 11 }, go: { intro: 2, add: 7, extend: 9, inside: 9, found: 12 } },
    code: {
      py: [['def merge(intervals):', ''], ['    intervals.sort(key=lambda m: m[0])', ''], ['    merged = []', ''], ['    for start, end in intervals:', ''], ['        if not merged or merged[-1][1] < start:', ''], ['            merged.append([start, end])', ''], ['        else:', ''], ['            merged[-1][1] = max(merged[-1][1], end)', ''], ['    return merged', '']],
      java: [['int[][] merge(int[][] intervals) {', ''], ['    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);', '  // by start time'], ['    List<int[]> merged = new ArrayList<>();', ''], ['    for (int[] m : intervals) {', ''], ['        int[] last = merged.isEmpty() ? null : merged.get(merged.size() - 1);', ''], ['        if (last == null || last[1] < m[0])', ''], ['            merged.add(new int[]{m[0], m[1]});', '  // a new block'], ['        else', ''], ['            last[1] = Math.max(last[1], m[1]);', ''], ['    }', ''], ['    return merged.toArray(new int[0][]);', ''], ['}', '']],
      cpp: [['vector<vector<int>> merge(vector<vector<int>>& intervals) {', ''], ['    sort(intervals.begin(), intervals.end());', '  // by start time'], ['    vector<vector<int>> merged;', ''], ['    for (auto& m : intervals) {', ''], ['        if (merged.empty() || merged.back()[1] < m[0])', ''], ['            merged.push_back(m);', '  // a new block'], ['        else', ''], ['            merged.back()[1] = max(merged.back()[1], m[1]);', ''], ['    }', ''], ['    return merged;', ''], ['}', '']],
      js: [['function merge(intervals) {', ''], ['  intervals.sort((a, b) => a[0] - b[0]);', '  // by start time'], ['  const merged = [];', ''], ['  for (const [start, end] of intervals) {', ''], ['    const last = merged[merged.length - 1];', ''], ['    if (!last || last[1] < start)', ''], ['      merged.push([start, end]);', '  // a new block'], ['    else', ''], ['      last[1] = Math.max(last[1], end);', ''], ['  }', ''], ['  return merged;', ''], ['}', '']],
      go: [['func merge(intervals [][]int) [][]int {', ''], ['    sort.Slice(intervals, func(a, b int) bool { return intervals[a][0] < intervals[b][0] })', ''], ['    merged := [][]int{}', ''], ['    for _, m := range intervals {', ''], ['        n := len(merged)', ''], ['        if n == 0 || merged[n-1][1] < m[0] {', ''], ['            merged = append(merged, []int{m[0], m[1]})', '  // a new block'], ['        } else {', ''], ['            merged[n-1][1] = max(merged[n-1][1], m[1])', ''], ['        }', ''], ['    }', ''], ['    return merged', ''], ['}', '']]
    },
    rules: [['Sort the meetings by start time', 'intro'], ['Starts after the last block ends → new block', 'add'], ['Overlaps the last block → stretch its end', 'extend'], ['Fits inside the last block → keep the end', 'inside'], ['Every meeting placed → hand over the diary', 'found']],
    complexity: [['O(n log n)', 'the sort; the sweep is one pass'], ['O(n)', 'the diary can hold every meeting']],
    quest: ['The meeting room has been double-booked all week. The bookings are 6-8, 1-3, 14-16, 2-5, 9-12 and 10-11, written down in no order.', 'The scheduler must rewrite the diary so that overlapping meetings become one long block, and nothing overlaps any more.'],
    example: ['intervals = [[6,8], [1,3], [14,16], [2,5], [9,12], [10,11]]', 'answer = [[1,5], [6,8], [9,12], [14,16]]'],
    hints: ['“Meetings in a muddle are hard to compare. What order would make overlaps sit next to each other?”', '“Once they are sorted by start, a meeting can only overlap the last block you wrote.”', '“Starts after the last block ends: new block. Otherwise stretch the end, but only if this meeting ends later.”'],
    clues: ['overlapping meetings join up', 'the input is not in order', 'one sweep after sorting'],
    quizFb: ['“Comparing every pair finds the overlaps, but joining chains of them gets messy, and it costs O(n²).”', '“A pile helps with nesting brackets. Here the latest block is all the scheduler needs, and the diary already keeps it.”', '“Marking every hour works for small days, but a booking can run to hour 10,000. Sort and sweep instead.”', '“Yes! Sorted by start, each meeting only needs to look at the last block in the diary.”'],
    steps
  };
}

// The Late Booking — Insert Interval
function bookingScene() {
  const meets = [[1, 2], [3, 4], [6, 8], [9, 10], [13, 15], [17, 18]];
  let late = [5, 9];
  const first = late.slice();
  const steps = [];
  const out = [];
  const status = [];   // per meeting: 'copied' | 'merged'
  const rows = (fresh) => out.map((m, k) => [ivText(m), m.late ? 'booking' : 'copied', k === fresh ? 'fresh' : '']);
  const snap = (o) => Object.assign({ board: rows(o.fresh), late: late.slice(), outText: ivList(out), size: out.length, status: status.slice() }, o);
  steps.push(snap({ L: 0, kind: 'intro', fresh: -1,
    dialog: [say('narr', 'The diary is tidy: 1-2, 3-4, 6-8, 9-10, 13-15, 17-18. Then a late booking comes in for 5-9.'), say('sched', 'I copy every meeting that ends before 5. Then I join everything that overlaps the booking.'), say('narr', 'And the rest?'), say('sched', 'Once the booking is written, the rest are copied as they are.')],
    nar: { kid: 'The scheduler has a neat diary and one new meeting to fit in. She copies the early meetings, joins any that clash with the new one, and copies the late ones.', builder: 'Three loops. Copy while end < late.start. Merge while start ≤ late.end, growing late. Append late. Copy the rest.', expert: 'The input is sorted and has no overlaps, so the meetings split into three runs: before, overlapping, after. One pass, O(n).' } }));
  let i = 0;
  const n = meets.length;
  while (i < n && meets[i][1] < late[0]) {
    out.push(meets[i].slice()); status[i] = 'copied';
    steps.push(snap({ L: i, kind: 'before', fresh: out.length - 1,
      dialog: [say('sched', 'Meeting ' + ivText(meets[i]) + ' ends at ' + meets[i][1] + ', before the booking starts at ' + late[0] + '.'), say('narr', 'No clash. Copy it across as it is.')],
      nar: { kid: 'Meeting ' + ivText(meets[i]) + ' is over before the new booking begins, so the scheduler copies it into the new diary.', builder: 'end = ' + meets[i][1] + ' < late.start = ' + late[0] + ' → out.append([' + meets[i][0] + ', ' + meets[i][1] + ']).', expert: 'Everything in this first run ends before the booking, so it can be copied without a check against it again.' } }));
    i++;
  }
  while (i < n && meets[i][0] <= late[1]) {
    const was = late.slice();
    late = [Math.min(late[0], meets[i][0]), Math.max(late[1], meets[i][1])];
    status[i] = 'merged';
    steps.push(snap({ L: i, kind: 'merge', fresh: -1,
      dialog: [say('sched', 'Meeting ' + ivText(meets[i]) + ' starts at ' + meets[i][0] + ', before the booking ends at ' + was[1] + '.'), say('narr', 'They clash. Join them: the booking is now ' + ivText(late) + '.')],
      nar: { kid: 'Meeting ' + ivText(meets[i]) + ' overlaps the booking ' + ivText(was) + ', so the scheduler joins them into one: ' + ivText(late) + '.', builder: 'start = ' + meets[i][0] + ' ≤ late.end = ' + was[1] + ' → late = [min(' + was[0] + ', ' + meets[i][0] + '), max(' + was[1] + ', ' + meets[i][1] + ')] = [' + late[0] + ', ' + late[1] + '].', expert: 'Ends touching counts as overlap here (start ≤ end). The booking only grows, so later meetings are tested against the bigger block.' } }));
    i++;
  }
  const placed = late.slice(); placed.late = true;
  out.push(placed);
  const at = Math.min(i, n - 1);
  steps.push(snap({ L: at, kind: 'place', fresh: out.length - 1,
    dialog: i < n
      ? [say('sched', 'Meeting ' + ivText(meets[i]) + ' starts at ' + meets[i][0] + ', after the booking ends at ' + late[1] + '.'), say('narr', 'So nothing else clashes. Write the booking in now: ' + ivText(late) + '.')]
      : [say('sched', 'No meetings left to check.'), say('narr', 'Write the booking in now: ' + ivText(late) + '.')],
    nar: { kid: 'Nothing else overlaps the booking, so the scheduler writes it into the diary as one block, ' + ivText(late) + '.', builder: 'start = ' + (i < n ? meets[i][0] : '—') + ' > late.end = ' + late[1] + ' → out.append([' + late[0] + ', ' + late[1] + ']).', expert: 'The booking goes in exactly once, after every meeting that ends before it and before every meeting that starts after it. Order is kept with no sort.' } }));
  while (i < n) {
    out.push(meets[i].slice()); status[i] = 'copied';
    steps.push(snap({ L: i, kind: 'after', fresh: out.length - 1,
      dialog: [say('sched', 'Meeting ' + ivText(meets[i]) + ' comes after the booking.'), say('narr', 'Copy it across as it is.')],
      nar: { kid: 'Meeting ' + ivText(meets[i]) + ' starts after the booking is over, so the scheduler copies it unchanged.', builder: 'Third loop → out.append([' + meets[i][0] + ', ' + meets[i][1] + ']).', expert: 'The rest of the list is already sorted and clash-free, so it is copied with no checks.' } }));
    i++;
  }
  steps.push(snap({ L: n - 1, kind: 'found', fresh: -1,
    dialog: [say('sched', 'The new diary is done.'), say('narr', 'It reads ' + out.map(ivText).join(', ') + '. Sorted, and no two meetings clash.')],
    nar: { kid: 'The late booking is in, joined with the meetings it clashed with. The diary is ' + out.map(ivText).join(', ') + '.', builder: 'return out = ' + ivList(out) + '.', expert: 'Each meeting was looked at once: O(n) time, O(n) space for the new list. No sort was needed.' } }));
  const T = { intro: ['Late booking: ' + ivText(first), 'plain'], before: ['Ends before the booking → copy it', 'cool'], merge: ['Clashes → join it into the booking', 'warn'], place: ['No more clashes → write the booking', 'ok'], after: ['Starts after the booking → copy it', 'cool'], found: ['Diary rewritten', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = meets.map((_, k) => {
      if (st.kind === 'intro') return 'future';
      if (st.done) return st.status[k] === 'merged' ? 'paint' : 'ok';
      if (k === st.L && st.kind !== 'place') return st.kind === 'merge' ? 'hit' : 'cur';
      if (k === st.L) return 'cur';
      if (st.status[k] === 'merged') return 'paint';
      if (st.status[k] === 'copied') return 'stored';
      return 'future';
    });
    const n2 = st.kind === 'intro' ? 0 : st.status.filter(Boolean).length;
    st.meter = { text: st.done ? 'diary = ' + st.size + ' meetings' : 'booking = ' + ivText(st.late), pct: (n2 / meets.length) * 100, mark: 100, markLabel: 'meetings handled ' + n2 + ' / ' + meets.length };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.L, 'left'], ['meeting', st.kind === 'intro' ? '—' : ivText(meets[st.L]), 'left'], ['late', ivText(st.late), 'right'], ['len(out)', st.size, 'text'], ['clash', st.kind === 'merge' ? 'yes' : st.kind === 'intro' || st.done ? '—' : 'no', st.kind === 'merge' ? 'left' : 'text'], ['result', st.done ? st.outText : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'insert-interval', pattern: 'Intervals', cast: 'iv', short: 'Late Booking', visual: 'letters', items: meets.map(ivText), pitch: 68, tile: 58, tileH: 56, gap: 10, font: 18, width: 398,
    board: true, boardTitle: 'The scheduler’s new diary',
    actorLabels: ['Scheduler · i'],
    goal: 'Fit the late booking 5-9 into the diary', status: ['Rewriting…', 'Booking fitted'],
    lines: { py: { intro: 2, before: 4, merge: 6, place: 8, after: 10, found: 11 }, java: { intro: 2, before: 4, merge: 6, place: 9, after: 11, found: 12 }, cpp: { intro: 2, before: 4, merge: 6, place: 9, after: 11, found: 12 }, js: { intro: 2, before: 4, merge: 6, place: 9, after: 11, found: 12 }, go: { intro: 2, before: 4, merge: 7, place: 10, after: 12, found: 14 } },
    code: {
      py: [['def insert(intervals, late):', ''], ['    out, i, n = [], 0, len(intervals)', ''], ['    while i < n and intervals[i][1] < late[0]:', ''], ['        out.append(intervals[i]); i += 1', ''], ['    while i < n and intervals[i][0] <= late[1]:', ''], ['        late = [min(late[0], intervals[i][0]), max(late[1], intervals[i][1])]', ''], ['        i += 1', ''], ['    out.append(late)', '  # the booking, joined'], ['    while i < n:', ''], ['        out.append(intervals[i]); i += 1', ''], ['    return out', '']],
      java: [['int[][] insert(int[][] intervals, int[] late) {', ''], ['    List<int[]> out = new ArrayList<>(); int i = 0, n = intervals.length;', ''], ['    while (i < n && intervals[i][1] < late[0])', ''], ['        out.add(intervals[i++]);', '  // ends before it'], ['    while (i < n && intervals[i][0] <= late[1]) {', ''], ['        late = new int[]{Math.min(late[0], intervals[i][0]), Math.max(late[1], intervals[i][1])};', ''], ['        i++;', ''], ['    }', ''], ['    out.add(late);', '  // the booking, joined'], ['    while (i < n)', ''], ['        out.add(intervals[i++]);', '  // starts after it'], ['    return out.toArray(new int[0][]);', ''], ['}', '']],
      cpp: [['vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int> late) {', ''], ['    vector<vector<int>> out; int i = 0, n = intervals.size();', ''], ['    while (i < n && intervals[i][1] < late[0])', ''], ['        out.push_back(intervals[i++]);', '  // ends before it'], ['    while (i < n && intervals[i][0] <= late[1]) {', ''], ['        late = {min(late[0], intervals[i][0]), max(late[1], intervals[i][1])};', ''], ['        i++;', ''], ['    }', ''], ['    out.push_back(late);', '  // the booking, joined'], ['    while (i < n)', ''], ['        out.push_back(intervals[i++]);', '  // starts after it'], ['    return out;', ''], ['}', '']],
      js: [['function insert(intervals, late) {', ''], ['  const out = []; let i = 0; const n = intervals.length;', ''], ['  while (i < n && intervals[i][1] < late[0])', ''], ['    out.push(intervals[i++]);', '  // ends before it'], ['  while (i < n && intervals[i][0] <= late[1]) {', ''], ['    late = [Math.min(late[0], intervals[i][0]), Math.max(late[1], intervals[i][1])];', ''], ['    i++;', ''], ['  }', ''], ['  out.push(late);', '  // the booking, joined'], ['  while (i < n)', ''], ['    out.push(intervals[i++]);', '  // starts after it'], ['  return out;', ''], ['}', '']],
      go: [['func insert(intervals [][]int, late []int) [][]int {', ''], ['    out, i, n := [][]int{}, 0, len(intervals)', ''], ['    for i < n && intervals[i][1] < late[0] {', ''], ['        out = append(out, intervals[i]); i++', '  // ends before it'], ['    }', ''], ['    for i < n && intervals[i][0] <= late[1] {', ''], ['        late = []int{min(late[0], intervals[i][0]), max(late[1], intervals[i][1])}', ''], ['        i++', ''], ['    }', ''], ['    out = append(out, late)', '  // the booking, joined'], ['    for i < n {', ''], ['        out = append(out, intervals[i]); i++', '  // starts after it'], ['    }', ''], ['    return out', ''], ['}', '']]
    },
    rules: [['Start a new, empty diary', 'intro'], ['Ends before the booking → copy it', 'before'], ['Clashes with the booking → join them', 'merge'], ['No more clashes → write the booking in', 'place'], ['Starts after the booking → copy it', 'after'], ['Every meeting handled → hand it over', 'found']],
    complexity: [['O(n)', 'each meeting is looked at once'], ['O(n)', 'a new diary as long as the old one']],
    quest: ['The scheduler’s diary is already sorted and nothing in it clashes: 1-2, 3-4, 6-8, 9-10, 13-15 and 17-18.', 'Then a late booking arrives for 5-9. The scheduler must fit it in so the diary stays sorted, joining it with anything it clashes with.'],
    example: ['intervals = [[1,2], [3,4], [6,8], [9,10], [13,15], [17,18]]   late = [5,9]', 'answer = [[1,2], [3,4], [5,10], [13,15], [17,18]]'],
    hints: ['“The diary is already sorted. Which meetings can the booking never touch?”', '“Meetings that end before 5 come first, untouched. Meetings that start after the booking ends come last, untouched.”', '“In between, join each clashing meeting into the booking: smallest start, biggest end. Write the booking, then copy the rest.”'],
    clues: ['the diary is sorted already', 'nothing in it clashes yet', 'only one new meeting'],
    quizFb: ['“Checking the booking against every pair of meetings repeats work. The diary is already in order.”', '“A pile is for things that close in reverse order. A diary is read straight through.”', '“Marking every hour wastes space when meetings run far apart, like 1-2 and 13-15.”', '“Yes! Sweep once: copy the early ones, join the clashes, then copy the late ones.”'],
    steps
  };
}

SCENE_REGISTRY.push(diaryScene, bookingScene);
PATTERN_KITS['Intervals'] = { right: 3, spot: 'Why sort first, not compare every pair?', ask: 'How should the scheduler tidy the diary?',
  quiz: [['Compare every pair', 'Check each meeting against every other one'], ['A pile of plates', 'Put each meeting on top and lift off the ones it closes'], ['Mark every hour', 'Shade each hour on a chart and read off the shaded runs'], ['Sort and sweep', 'Go through in order of start and keep only the latest block']] };
STORY_CAST.sched = { name: 'Scheduler', initial: 'S', color: 'left', radius: '10px' };
