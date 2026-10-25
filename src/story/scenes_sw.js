
// ---------- Sliding Window: the window-keeper on the night train ----------
const winText = (s, L, R) => (R < L ? '' : s.slice(L, R + 1).join(''));

// The Train of Unique Faces — Longest Substring Without Repeating Characters
function facesScene() {
  const s = ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'];
  const steps = [];
  const last = {};
  let L = 0, best = 0;
  steps.push({ L: 0, R: 0, kind: 'intro', noFrame: true, best: 0, board: [],
    dialog: [say('narr', 'Eight passengers board the night train, each with a letter badge. The window-keeper wants the longest run of carriages where no badge repeats.'), say('window', 'I’ll hold my window open and let it grow, one passenger at a time.'), say('narr', 'And if a familiar badge climbs in?'), say('window', 'Then the back of my window jumps past the old one.')],
    nar: { kid: 'The window-keeper looks through a window that can stretch. She wants the biggest window where every passenger’s badge is different.', builder: 'left = 0, best = 0, last = {}. For each right, if s[right] was seen inside the window, move left past its last position.', expert: 'Variable-size window with a last-seen map. left only moves forward, so each index enters and leaves once: O(n).' } });
  s.forEach((c, R) => {
    const seenAt = c in last ? last[c] : -1;
    const jump = seenAt >= L;
    const oldL = L;
    if (jump) L = seenAt + 1;
    last[c] = R;
    const size = R - L + 1;
    const record = size > best;
    best = Math.max(best, size);
    const w = winText(s, L, R);
    const board = Object.keys(last).sort().map((k) => [k, String(last[k]), k === c ? (jump ? 'hit' : 'fresh') : '']);
    const cells = s.map((_, i) => (i < L ? 'out' : i > R ? 'future' : i === R ? (jump ? 'hit' : 'cur') : 'in'));
    if (jump) cells[seenAt] = 'dup';
    steps.push(jump ? { L, R, kind: 'jump', best, board, cells,
      dialog: [say('window', 'A second “' + c + '” just boarded!'), say('narr', 'The old “' + c + '” sat at carriage ' + seenAt + '. Everything up to it has to leave.'), say('window', 'Back of the window jumps to ' + L + '. Now I see “' + w + '”.')],
      nar: { kid: 'A passenger with a “' + c + '” badge was already in the window. The window-keeper slides the back of the window past the old “' + c + '”, so every badge is different again.', builder: 'last["' + c + '"] = ' + seenAt + ' ≥ left (' + oldL + ') → left = ' + L + '. Window "' + w + '", size ' + size + ', best = ' + best + '.', expert: 'Jumping left to last[c] + 1 skips the O(k) shrinking loop. Correct because nothing between old left and last[c] can start a valid window containing this c.' } }
      : { L, R, kind: 'grow', best, board, cells,
      dialog: [say('window', '“' + c + '” is new. Come on in!'), say('narr', 'Window “' + w + '” — ' + size + ' different faces.' + (record ? ' A new record!' : ''))],
      nar: { kid: 'The “' + c + '” badge isn’t in the window yet, so the window stretches to let it in. It now holds ' + size + (size === 1 ? ' passenger.' : ' different passengers.') + (record ? ' That’s the longest so far!' : ''), builder: '"' + c + '" not in window → last["' + c + '"] = ' + R + '; size = ' + size + ', best = ' + best + '.', expert: 'Window invariant holds: s[left..right] has no repeats. best = max(best, right − left + 1) in O(1).' } });
  });
  steps.push({ L, R: s.length - 1, kind: 'found', best, board: Object.keys(last).sort().map((k) => [k, String(last[k]), '']), cells: s.map((_, i) => (i >= 0 && i <= 2 ? 'ok' : 'out')), noFrame: false, frameAt: [0, 2],
    dialog: [say('window', 'That’s the last passenger.'), say('narr', 'The longest stretch of all-different badges was 3 — “abc”. That’s your answer.')],
    nar: { kid: 'The train has passed. The biggest window with no repeated badge held 3 passengers: a, b and c.', builder: 'Loop ends → return best = 3.', expert: 'n = 8, one pass, O(min(n, alphabet)) space for the map. A brute force would check all O(n²) windows.' } });
  const T = { intro: ['Window closed, ready to grow', 'plain'], grow: ['New face → window grows', 'cool'], jump: ['Repeat → back of window jumps', 'warn'], found: ['Longest run: 3', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    const size = st.noFrame ? 0 : st.done ? 3 : st.R - st.L + 1;
    st.meter = { text: st.noFrame ? 'window = “”' : st.done ? 'best = “abc” = 3' : 'window “' + winText(s, st.L, st.R) + '” = ' + size, pct: (size / 5) * 100, mark: (st.best / 5) * 100, markLabel: 'best so far ' + st.best };
    st.watch = [['left', st.L, 'right'], ['right', st.noFrame ? '—' : st.R, 'left'], ['s[right]', st.noFrame ? '—' : '“' + s[st.R] + '”', 'left'], ['window', st.noFrame ? '“”' : '“' + (st.done ? 'abc' : winText(s, st.L, st.R)) + '”', 'text'], ['size', size, 'text'], ['best', st.best, st.done ? 'ok' : 'text']];
  });
  return {
    id: 'longest-substring', pattern: 'Sliding Window', cast: 'sw', short: 'Unique Faces', visual: 'letters', items: s, pitch: 56, tile: 46, tileH: 62, gap: 10, font: 24, width: 438,
    board: true, boardTitle: 'The window-keeper’s notebook · last seen',
    actorLabels: ['back · L', 'Window-keeper · R'],
    goal: 'Longest run of carriages where no badge repeats', status: ['Watching…', 'Longest run found'],
    lines: { py: { intro: 3, grow: 8, jump: 6, found: 9 }, java: { intro: 3, jump: 7, grow: 9, found: 11 }, cpp: { intro: 3, jump: 7, grow: 9, found: 11 }, js: { intro: 3, jump: 7, grow: 9, found: 11 }, go: { intro: 3, jump: 7, grow: 10, found: 12 } },
    code: {
      py: [['def lengthOfLongestSubstring(s):', ''], ['    last = {}', '              # badge -> carriage'], ['    left = best = 0', ''], ['    for right, c in enumerate(s):', ''], ['        if c in last and last[c] >= left:', ''], ['            left = last[c] + 1', '  # familiar face'], ['        last[c] = right', ''], ['        best = max(best, right - left + 1)', ''], ['    return best', '']],
      java: [['int lengthOfLongestSubstring(String s) {', ''], ['    Map<Character, Integer> last = new HashMap<>();', ''], ['    int left = 0, best = 0;', ''], ['    for (int right = 0; right < s.length(); right++) {', ''], ['        char c = s.charAt(right);', ''], ['        if (last.containsKey(c) && last.get(c) >= left)', ''], ['            left = last.get(c) + 1;', '  // familiar face'], ['        last.put(c, right);', ''], ['        best = Math.max(best, right - left + 1);', ''], ['    }', ''], ['    return best;', ''], ['}', '']],
      cpp: [['int lengthOfLongestSubstring(string s) {', ''], ['    unordered_map<char, int> last;', ''], ['    int left = 0, best = 0;', ''], ['    for (int right = 0; right < s.size(); right++) {', ''], ['        char c = s[right];', ''], ['        if (last.count(c) && last[c] >= left)', ''], ['            left = last[c] + 1;', '  // familiar face'], ['        last[c] = right;', ''], ['        best = max(best, right - left + 1);', ''], ['    }', ''], ['    return best;', ''], ['}', '']],
      js: [['function lengthOfLongestSubstring(s) {', ''], ['  const last = new Map();', ''], ['  let left = 0, best = 0;', ''], ['  for (let right = 0; right < s.length; right++) {', ''], ['    const c = s[right];', ''], ['    if (last.has(c) && last.get(c) >= left)', ''], ['      left = last.get(c) + 1;', '  // familiar face'], ['    last.set(c, right);', ''], ['    best = Math.max(best, right - left + 1);', ''], ['  }', ''], ['  return best;', ''], ['}', '']],
      go: [['func lengthOfLongestSubstring(s string) int {', ''], ['    last := map[byte]int{}', ''], ['    left, best := 0, 0', ''], ['    for right := 0; right < len(s); right++ {', ''], ['        c := s[right]', ''], ['        if i, ok := last[c]; ok && i >= left {', ''], ['            left = i + 1', '  // familiar face'], ['        }', ''], ['        last[c] = right', ''], ['        best = max(best, right-left+1)', ''], ['    }', ''], ['    return best', ''], ['}', '']]
    },
    rules: [['Open an empty window at the front', 'intro'], ['New face → stretch the window', 'grow'], ['Familiar face → back jumps past the old one', 'jump'], ['Train has passed → report the best', 'found']],
    complexity: [['O(n)', 'each carriage enters and leaves once'], ['O(k)', 'one notebook line per distinct badge']],
    quest: ['The night train is boarding. Eight passengers climb in one after another, each wearing a letter badge: a, b, c, a, b, c, b, b.', 'The  window-keeper, wants the longest run of neighbouring carriages in which no badge appears twice.'],
    example: ['s = "abcabcbb"', 'answer = 3   ("abc")'],
    hints: ['“You’re looking for the longest stretch of neighbours with one rule. That smells like a window, not a pair.”', '“When a badge repeats, do you really need to start over from scratch? Or can the back of the window just move?”', '“Write down where you last saw each badge. A repeat inside the window tells you exactly where the back should jump.”'],
    clues: ['neighbouring carriages only', 'longest stretch with a rule', 'one pass, no restarting'],
    quizFb: ['“Checking every stretch is O(n²) windows, each checked for repeats. Far too slow for 50,000 passengers.”', '“Two friends from the ends is for pairs. Here we need a whole stretch of neighbours.”', '“Yes! A window that grows at the front and slides at the back, never going backwards.”', '“The notebook helps — The window-keeper keeps one! — but on its own it doesn’t tell you which stretch is longest. Pair it with a window.”'],
    steps
  };
}

// The Paint Touch-up — Longest Repeating Character Replacement
function paintScene() {
  const s = ['A', 'A', 'B', 'A', 'B', 'B', 'A'], k = 1;
  const steps = [];
  const count = {};
  let L = 0, top = 0, best = 0;
  const tally = (c) => ['A', 'B'].map((x) => [x, String(count[x] || 0), x === c ? 'fresh' : '']);
  steps.push({ L: 0, R: 0, kind: 'intro', noFrame: true, best: 0, top: 0, board: tally(''),
    dialog: [say('narr', 'A wall of seven tiles: A A B A B B A. The painter may repaint just one tile.'), say('window', 'I’ll frame a stretch of the wall. Whatever isn’t the most common colour inside my frame needs repainting.'), say('narr', 'Then keep the frame honest: no more than one repaint at a time.')],
    nar: { kid: 'The window-keeper frames a stretch of wall. The painter can fix one tile. How long can a one-colour stretch be?', builder: 'For each right: count[s[right]] += 1, top = max count. If size − top > k, slide left by one. best = max(best, size).', expert: 'Window is valid iff (right − left + 1) − maxFreq ≤ k. We only ever slide, never shrink below the best size, so best is monotone.' } });
  s.forEach((c, R) => {
    count[c] = (count[c] || 0) + 1;
    top = Math.max(top, count[c]);
    let size = R - L + 1;
    const need = size - top;
    let kind = 'grow', dropped = null;
    if (need > k) { dropped = s[L]; count[s[L]]--; L++; kind = 'slide'; size = R - L + 1; }
    best = Math.max(best, size);
    const win = s.slice(L, R + 1);
    const major = (win.filter((x) => x === 'A').length >= win.filter((x) => x === 'B').length) ? 'A' : 'B';
    const cells = s.map((x, i) => (i < L ? 'out' : i > R ? 'future' : x !== major ? 'paint' : i === R ? 'cur' : 'in'));
    const repaints = win.filter((x) => x !== major).length;
    steps.push(kind === 'slide' ? { L, R, kind, best, top, need, board: tally(c), cells, repaints,
      dialog: [say('window', '“' + c + '” joined. That’s ' + need + ' tiles to repaint — one too many!'), say('narr', 'Then slide: the back of the frame lets go of its “' + dropped + '”.'), say('window', 'Same size, one step along: “' + win.join('') + '”.')],
      nar: { kid: 'Adding this tile would need ' + need + ' repaints, but the painter only has 1. So the whole frame slides one tile to the right instead of growing.', builder: 'size − top = ' + (R - L + 2) + ' − ' + top + ' = ' + need + ' > k → count["' + dropped + '"] -= 1, left = ' + L + '. best stays ' + best + '.', expert: 'We slide rather than shrink: a smaller window can never beat best, so the window size never decreases. top may be stale, but that only delays growth — it never overcounts best.' } }
      : { L, R, kind, best, top, need, board: tally(c), cells, repaints,
      dialog: [say('window', '“' + c + '” joined. The frame holds “' + win.join('') + '”.'), say('narr', 'Size ' + size + ', most common colour ' + top + ' times, so ' + (size - top) + ' repaint' + (size - top === 1 ? '' : 's') + '. ' + (size - top <= k ? 'Still fine.' : ''))],
      nar: { kid: 'The new tile fits: the painter needs ' + (size - top) + ' repaint' + (size - top === 1 ? '' : 's') + ' at most, so the frame grows to ' + size + ' tiles.', builder: 'count["' + c + '"] = ' + count[c] + ', top = ' + top + '; size − top = ' + (size - top) + ' ≤ k → grow. best = ' + best + '.', expert: 'Valid window: (right − left + 1) − maxFreq ≤ k. best = max(best, size) in O(1).' } });
  });
  steps.push({ L: 0, R: 3, kind: 'found', best, top, board: tally(''), cells: s.map((x, i) => (i <= 3 ? (x === 'B' ? 'paint' : 'ok') : 'out')), frameAt: [0, 3],
    dialog: [say('window', 'Wall finished.'), say('narr', 'Longest stretch after one repaint: 4 tiles — repaint the B in “AABA” and you get “AAAA”.')],
    nar: { kid: 'The best stretch is 4 tiles long: A A B A. Paint the B, and it’s all one colour!', builder: 'return best = 4.', expert: 'One pass, O(26) space. Each index enters once and leaves at most once: O(n).' } });
  const T = { intro: ['Frame ready, one repaint allowed', 'plain'], grow: ['Fits → frame grows', 'cool'], slide: ['Too many repaints → frame slides', 'warn'], found: ['Longest stretch: 4', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    const size = st.noFrame ? 0 : st.R - st.L + 1;
    const rp = st.noFrame ? 0 : st.done ? 1 : st.repaints;
    st.meter = { text: st.noFrame ? 'repaints = 0' : 'size ' + size + ' − most ' + (size - rp) + ' = ' + rp + ' repaint' + (rp === 1 ? '' : 's'), pct: (rp / 2) * 100, mark: 50, markLabel: 'k = 1 allowed' };
    st.watch = [['left', st.L, 'right'], ['right', st.noFrame ? '—' : st.R, 'left'], ['size', size, 'text'], ['top', st.top, 'text'], ['repaints', rp, rp > k ? 'left' : 'text'], ['best', st.best, st.done ? 'ok' : 'text']];
  });
  return {
    id: 'char-replacement', pattern: 'Sliding Window', cast: 'sw', short: 'Paint', visual: 'letters', items: s, pitch: 62, tile: 50, tileH: 64, gap: 12, font: 26, width: 422,
    board: true, boardTitle: 'Paint tally · inside the frame',
    actorLabels: ['back · L', 'Window-keeper · R'],
    goal: 'Longest one-colour stretch with at most 1 repaint', status: ['Framing…', 'Best stretch found'],
    lines: { py: { intro: 3, grow: 10, slide: 9, found: 11 }, java: { intro: 3, slide: 8, grow: 10, found: 12 }, cpp: { intro: 3, slide: 8, grow: 10, found: 12 }, js: { intro: 3, slide: 10, grow: 12, found: 14 }, go: { intro: 3, slide: 9, grow: 11, found: 13 } },
    code: {
      py: [['def characterReplacement(s, k):', ''], ['    count = {}', ''], ['    left = top = best = 0', ''], ['    for right, c in enumerate(s):', ''], ['        count[c] = count.get(c, 0) + 1', ''], ['        top = max(top, count[c])', ''], ['        if (right - left + 1) - top > k:', ''], ['            count[s[left]] -= 1', ''], ['            left += 1', '        # too many repaints'], ['        best = max(best, right - left + 1)', ''], ['    return best', '']],
      java: [['int characterReplacement(String s, int k) {', ''], ['    int[] count = new int[26];', ''], ['    int left = 0, top = 0, best = 0;', ''], ['    for (int right = 0; right < s.length(); right++) {', ''], ['        top = Math.max(top, ++count[s.charAt(right) - \'A\']);', ''], ['        if (right - left + 1 - top > k) {', ''], ['            count[s.charAt(left) - \'A\']--;', ''], ['            left++;', '  // too many repaints'], ['        }', ''], ['        best = Math.max(best, right - left + 1);', ''], ['    }', ''], ['    return best;', ''], ['}', '']],
      cpp: [['int characterReplacement(string s, int k) {', ''], ['    int count[26] = {0};', ''], ['    int left = 0, top = 0, best = 0;', ''], ['    for (int right = 0; right < s.size(); right++) {', ''], ['        top = max(top, ++count[s[right] - \'A\']);', ''], ['        if (right - left + 1 - top > k) {', ''], ['            count[s[left] - \'A\']--;', ''], ['            left++;', '  // too many repaints'], ['        }', ''], ['        best = max(best, right - left + 1);', ''], ['    }', ''], ['    return best;', ''], ['}', '']],
      js: [['function characterReplacement(s, k) {', ''], ['  const count = {};', ''], ['  let left = 0, top = 0, best = 0;', ''], ['  for (let right = 0; right < s.length; right++) {', ''], ['    const c = s[right];', ''], ['    count[c] = (count[c] || 0) + 1;', ''], ['    top = Math.max(top, count[c]);', ''], ['    if (right - left + 1 - top > k) {', ''], ['      count[s[left]]--;', ''], ['      left++;', '  // too many repaints'], ['    }', ''], ['    best = Math.max(best, right - left + 1);', ''], ['  }', ''], ['  return best;', ''], ['}', '']],
      go: [['func characterReplacement(s string, k int) int {', ''], ['    count := [26]int{}', ''], ['    left, top, best := 0, 0, 0', ''], ['    for right := 0; right < len(s); right++ {', ''], ['        count[s[right]-\'A\']++', ''], ['        top = max(top, count[s[right]-\'A\'])', ''], ['        if right-left+1-top > k {', ''], ['            count[s[left]-\'A\']--', ''], ['            left++', '  // too many repaints'], ['        }', ''], ['        best = max(best, right-left+1)', ''], ['    }', ''], ['    return best', ''], ['}', '']]
    },
    rules: [['Start with an empty frame', 'intro'], ['Repaints ≤ k → the frame grows', 'grow'], ['Repaints > k → the whole frame slides', 'slide'], ['Wall finished → report the best', 'found']],
    complexity: [['O(n)', 'every tile enters the frame once'], ['O(1)', '26 counters, whatever the wall length']],
    quest: ['A painter is touching up a wall of tiles: A A B A B B A. She has just enough paint for one tile.', 'The window-keeper must find the longest stretch of neighbouring tiles that can be made one colour with that single repaint.'],
    example: ['s = "AABABBA", k = 1', 'answer = 4   ("AABA" → repaint the B)'],
    hints: ['“A stretch of neighbours with a limit on changes… where have you seen that before?”', '“Inside the frame, which tiles never need repainting? Only the most common colour.”', '“If size minus the most common count is more than k, don’t shrink — slide. You only care about beating your best.”'],
    clues: ['neighbouring tiles', 'at most k changes', 'longest stretch'],
    quizFb: ['“Every stretch times every colour: slow, and it repeats work the frame already did.”', '“The ends of the wall don’t move toward each other here. The stretch moves along.”', '“Yes! Grow the frame while repaints ≤ k, slide it when you go over.”', '“Counting colours is part of it — but only the colours inside a moving frame.”'],
    steps
  };
}

// The Market Stall Diary — Best Time to Buy and Sell Stock
function stockScene() {
  const p = [7, 1, 5, 3, 6, 4];
  const steps = [];
  let buy = 0, best = 0;
  steps.push({ L: 0, R: 0, kind: 'intro', best: 0, profit: 0,
    dialog: [say('narr', 'Six mornings at the mango stall. Buy once, sell once, later — how much can you make?'), say('window', 'The back of my window marks the cheapest morning so far. The front is today.'), say('narr', 'So every day you only ask: what if I sold today?')],
    nar: { kid: 'The window-keeper writes down the mango price every morning. She wants to buy on a cheap day and sell on a later, pricier day.', builder: 'buy = 0 (cheapest day so far), best = 0. For each later day: cheaper → move buy; else profit = price[day] − price[buy].', expert: 'The window [buy, day] always starts at the running minimum. One pass, O(1) space.' } });
  for (let d = 1; d < p.length; d++) {
    if (p[d] < p[buy]) {
      const old = buy; buy = d;
      steps.push({ L: buy, R: d, kind: 'cheaper', best, profit: 0,
        dialog: [say('window', 'Mangoes are only ' + p[d] + ' today — cheaper than ' + p[old] + '!'), say('narr', 'Then any sale later is better from here. Move the back of the window.')],
        nar: { kid: 'Day ' + (d + 1) + ' is the cheapest yet (' + p[d] + '). The window-keeper would rather buy today, so the window starts again here.', builder: 'prices[' + d + '] = ' + p[d] + ' < prices[buy] = ' + p[old] + ' → buy = ' + d + '.', expert: 'New running minimum. Any future sale earns more against ' + p[d] + ' than against ' + p[old] + ', so the old buy day is dominated.' } });
    } else {
      const profit = p[d] - p[buy], record = profit > best;
      best = Math.max(best, profit);
      steps.push({ L: buy, R: d, kind: 'profit', best, profit,
        dialog: [say('window', 'Today it’s ' + p[d] + '. Bought at ' + p[buy] + ', that’s ' + profit + ' profit.'), say('narr', record ? 'A new best!' : 'Not better than ' + best + '. Keep the old record.')],
        nar: { kid: 'If the window-keeper had bought at ' + p[buy] + ' and sold today at ' + p[d] + ', she’d make ' + profit + '. ' + (record ? 'That’s her best yet!' : 'Her best is still ' + best + '.'), builder: 'profit = ' + p[d] + ' − ' + p[buy] + ' = ' + profit + '; best = max(best, profit) = ' + best + '.', expert: 'Only one candidate per day matters: sell today against the running minimum. O(1) per day.' } });
    }
  }
  steps.push({ L: 1, R: 4, kind: 'found', best, profit: best,
    dialog: [say('window', 'The week’s done.'), say('narr', 'Buy on day 2 at 1, sell on day 5 at 6. Best profit: 5.')],
    nar: { kid: 'The best plan was to buy at 1 and sell at 6. That’s 5 profit.', builder: 'return best = 5.', expert: 'n − 1 comparisons, O(1) space. Checking every buy/sell pair would be O(n²).' } });
  const T = { intro: ['Day 1: nothing to sell yet', 'plain'], cheaper: ['Cheaper morning → move the buy day', 'cool'], profit: ['Sell today? Check the profit', 'warn'], found: ['Best profit: 5', 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = p.map((_, i) => (st.done ? (i === 1 || i === 4 ? 'best' : 'out') : i < st.L ? 'out' : i > st.R ? 'future' : i === st.L ? 'buy' : i === st.R ? 'cur' : 'in'));
    st.meter = { text: st.done ? 'best = 6 − 1 = 5' : st.kind === 'profit' ? 'sell ' + p[st.R] + ' − buy ' + p[st.L] + ' = ' + st.profit : 'buy at ' + p[st.L], pct: (st.profit / 6) * 100, mark: (st.best / 6) * 100, markLabel: 'best so far ' + st.best };
    st.watch = [['buy', st.L, 'right'], ['day', st.R, 'left'], ['prices[buy]', p[st.L], 'right'], ['prices[day]', p[st.R], 'left'], ['profit', st.profit, 'text'], ['best', st.best, st.done ? 'ok' : 'text']];
  });
  return {
    id: 'best-time-stock', pattern: 'Sliding Window', cast: 'sw', short: 'Market Stall', predictCue: (st) => 'Day ' + (st.R + 1) + ' costs ' + st.watch[3][1], visual: 'planks', items: p, pitch: 84, tile: 44, width: 464, unit: 18,
    actorLabels: ['buy · L', 'Window-keeper · today'],
    goal: 'Buy on one morning, sell on a later one', status: ['Watching prices…', 'Best deal found'],
    lines: { py: { intro: 2, cheaper: 5, profit: 7, found: 8 }, java: { intro: 2, cheaper: 5, profit: 7, found: 9 }, cpp: { intro: 2, cheaper: 5, profit: 7, found: 9 }, js: { intro: 2, cheaper: 5, profit: 7, found: 9 }, go: { intro: 2, cheaper: 5, profit: 7, found: 10 } },
    code: {
      py: [['def maxProfit(prices):', ''], ['    buy, best = 0, 0', ''], ['    for day in range(1, len(prices)):', ''], ['        if prices[day] < prices[buy]:', ''], ['            buy = day', '        # a cheaper morning'], ['        else:', ''], ['            best = max(best, prices[day] - prices[buy])', ''], ['    return best', '']],
      java: [['int maxProfit(int[] prices) {', ''], ['    int buy = 0, best = 0;', ''], ['    for (int day = 1; day < prices.length; day++) {', ''], ['        if (prices[day] < prices[buy])', ''], ['            buy = day;', '  // a cheaper morning'], ['        else', ''], ['            best = Math.max(best, prices[day] - prices[buy]);', ''], ['    }', ''], ['    return best;', ''], ['}', '']],
      cpp: [['int maxProfit(vector<int>& prices) {', ''], ['    int buy = 0, best = 0;', ''], ['    for (int day = 1; day < prices.size(); day++) {', ''], ['        if (prices[day] < prices[buy])', ''], ['            buy = day;', '  // a cheaper morning'], ['        else', ''], ['            best = max(best, prices[day] - prices[buy]);', ''], ['    }', ''], ['    return best;', ''], ['}', '']],
      js: [['function maxProfit(prices) {', ''], ['  let buy = 0, best = 0;', ''], ['  for (let day = 1; day < prices.length; day++) {', ''], ['    if (prices[day] < prices[buy])', ''], ['      buy = day;', '  // a cheaper morning'], ['    else', ''], ['      best = Math.max(best, prices[day] - prices[buy]);', ''], ['  }', ''], ['  return best;', ''], ['}', '']],
      go: [['func maxProfit(prices []int) int {', ''], ['    buy, best := 0, 0', ''], ['    for day := 1; day < len(prices); day++ {', ''], ['        if prices[day] < prices[buy] {', ''], ['            buy = day', '  // a cheaper morning'], ['        } else {', ''], ['            best = max(best, prices[day]-prices[buy])', ''], ['        }', ''], ['    }', ''], ['    return best', ''], ['}', '']]
    },
    rules: [['Start on day 1, nothing sold', 'intro'], ['Cheaper morning → move the buy day', 'cheaper'], ['Otherwise → try selling today', 'profit'], ['Week over → report the best', 'found']],
    complexity: [['O(n)', 'one look at each morning'], ['O(1)', 'remember one buy day and one record']],
    quest: ['The window-keeper keeps a diary at the mango stall. Each morning she writes the price: 7, 1, 5, 3, 6, 4.', 'She may buy mangoes once and sell them once, on a later morning. What’s the most she could earn?'],
    example: ['prices = [7, 1, 5, 3, 6, 4]', 'answer = 5   (buy at 1, sell at 6)'],
    hints: ['“You must buy before you sell. So on any given morning, what’s the best day you could have bought?”', '“You don’t need every past price — only the cheapest one so far.”', '“Each morning: if it’s the cheapest yet, buy here instead. Otherwise, check what selling today would earn.”'],
    clues: ['buy before you sell', 'one transaction', 'one pass through the week'],
    quizFb: ['“Every buy/sell pair is 15 checks here, but 5 billion for 100,000 days.”', '“The seller must come after the buyer, so both ends can’t walk inward.”', '“Yes! The window’s back sits on the cheapest morning, the front is today.”', '“You don’t need every price — just one: the cheapest so far.”'],
    steps
  };
}

// ---------- Your own input (see practice.js) ----------
function facesRun(input) {
  const text = (input || SCENE_INPUT['longest-substring'].default).s;
  const s = text.split(''), n = s.length;
  const steps = [], last = {};
  let L = 0, best = 0, bestL = 0, bestR = 0;
  const book = (c, flag) => Object.keys(last).sort().map((k) => [k, String(last[k]), k === c ? flag : '']);
  steps.push(runStep('intro', { L: 0, R: 0, noFrame: true, best: 0, board: [] }, [say('narr', n + ' passengers board: ' + s.join(', ') + '. Find the longest run with no repeated badge.'), say('window', 'I’ll grow my window one passenger at a time.')],
    'The window-keeper’s window grows at the front. If a badge repeats, the back of the window jumps forward.', 'left = 0, best = 0, last = {}.', 'Each passenger enters and leaves the window once: O(n).'));
  s.forEach((c, R) => {
    const seenAt = c in last ? last[c] : -1, jump = seenAt >= L;
    if (jump) L = seenAt + 1;
    last[c] = R;
    const size = R - L + 1, record = size > best;
    if (record) { best = size; bestL = L; bestR = R; }
    const w = s.slice(L, R + 1).join('');
    const cells = s.map((_, i) => (i < L ? 'out' : i > R ? 'future' : i === R ? (jump ? 'hit' : 'cur') : 'in'));
    if (jump) cells[seenAt] = 'dup';
    if (jump) {
      steps.push(runStep('jump', { L, R, best, cells, board: book(c, 'hit') }, [say('window', 'Another “' + c + '”!'), say('narr', 'The old one sat at ' + seenAt + '. The back jumps to ' + L + '.')],
        '“' + c + '” was already in the window, so the back jumps past the old “' + c + '”. Now the window is “' + w + '”.', 'last["' + c + '"] = ' + seenAt + ' ≥ left → left = ' + L + '. best = ' + best + '.', 'The back jumps straight past the repeat instead of creeping one step at a time.'));
    } else {
      steps.push(runStep('grow', { L, R, best, cells, board: book(c, 'fresh') }, [say('window', '“' + c + '” is new. Come in!'), say('narr', 'Window “' + w + '”: ' + size + (size === 1 ? ' badge.' : ' different badges.') + (record ? ' A new record!' : ''))],
        '“' + c + '” is not in the window yet, so the window grows to ' + size + '.' + (record ? ' That is the longest so far.' : ''), 'last["' + c + '"] = ' + R + '; size = ' + size + ', best = ' + best + '.', 'Every badge between left and right is different.'));
    }
  });
  const bestW = s.slice(bestL, bestR + 1).join('');
  steps.push(runStep('found', { L: bestL, R: bestR, best, frameAt: [bestL, bestR], board: book('', ''), cells: s.map((_, i) => (i >= bestL && i <= bestR ? 'ok' : 'out')), done: true },
    [say('window', 'That is the last passenger.'), say('narr', 'The longest run is ' + best + ': “' + bestW + '”.')],
    'The train has passed. The longest run with no repeat is “' + bestW + '”, ' + best + (best === 1 ? ' passenger.' : ' passengers.'), 'return best = ' + best + '.', 'One pass over ' + n + ' passengers and one notebook line per badge.'));
  runFinish(steps, { intro: ['Window closed, ready to grow', 'plain'], grow: ['New face → window grows', 'cool'], jump: ['Repeat → back of window jumps', 'warn'], found: ['Longest run: ' + best, 'ok'] }, (st) => {
    const size = st.noFrame ? 0 : st.R - st.L + 1, win = st.noFrame ? '' : s.slice(st.L, st.R + 1).join('');
    st.meter = { text: st.noFrame ? 'window = “”' : st.done ? 'best = “' + win + '” = ' + size : 'window “' + win + '” = ' + size, pct: (size / n) * 100, mark: (st.best / n) * 100, markLabel: 'best so far ' + st.best };
    st.watch = [['left', st.L, 'right'], ['right', st.noFrame ? '—' : st.R, 'left'], ['s[right]', st.noFrame ? '—' : '“' + s[st.R] + '”', 'left'], ['window', '“' + win + '”', 'text'], ['size', size, 'text'], ['best', st.best, st.done ? 'ok' : 'text']];
  });
  return runScene('longest-substring', Object.assign(fitRow({ pitch: 56, tile: 46, tileH: 62, font: 24 }, n, 440), {
    items: s, status: ['Watching…', 'Longest run: ' + best],
    example: ['s = "' + text + '"', 'answer = ' + best + '   ("' + bestW + '")'],
    answer: best, input: { s: text }
  }), steps);
}
const randWord = (lo, hi, abc) => ({ s: Array.from({ length: rint(lo, hi) }, () => rpick((abc || 'abcde').split(''))).join('') });
SCENE_INPUT['longest-substring'] = {
  hint: 'lowercase letters, no spaces', example: 'abcabcbb',
  default: { s: 'abcabcbb' },
  presets: [['Story example', () => ({ s: 'abcabcbb' })], ['Random', () => randWord(5, 9, 'abcd')], ['All the same', () => ({ s: 'aaaa' })], ['All different', () => ({ s: 'abcdefg' })]],
  random: () => randWord(3, 9, rpick(['ab', 'abc', 'abcde', 'abcdefgh'])),
  parse: parseText, show: (v) => v.s,
  check: (v) => (v.s.length < 3 || v.s.length > 9 ? 'Use 3 to 9 letters, so every tile stays readable. You have ' + v.s.length + '.' : /^[a-z]+$/.test(v.s) ? '' : 'Use lowercase letters a to z only, with no spaces.'),
  make: facesRun
};

function stockRun(input) {
  const p = (input || SCENE_INPUT['best-time-stock'].default).nums.slice(), n = p.length;
  const top = Math.max.apply(null, p);
  const steps = [];
  let buy = 0, best = 0, bestBuy = -1, bestSell = -1;
  steps.push(runStep('intro', { L: 0, R: 0, best: 0, profit: 0 }, [say('narr', n + ' mornings of prices. Buy once, then sell once on a later morning.'), say('window', 'The back of my window is the cheapest morning so far. The front is today.')],
    'The window-keeper keeps the cheapest morning so far as the back of her window. The front is today.', 'buy = 0, best = 0.', 'Only the cheapest morning so far matters: O(n) time, O(1) space.'));
  for (let d = 1; d < n; d++) {
    if (p[d] < p[buy]) {
      const old = p[buy];
      buy = d;
      steps.push(runStep('cheaper', { L: buy, R: d, best, profit: 0 }, [say('window', 'Only ' + p[d] + ' today. Cheaper than ' + old + '!'), say('narr', 'Then buy here instead.')],
        p[d] + ' is the cheapest so far, so the window-keeper moves her buy day to day ' + (d + 1) + '.', 'prices[' + d + '] = ' + p[d] + ' < ' + old + ' → buy = ' + d + '.', 'A cheaper buy day beats the old one for every later sale.'));
    } else {
      const profit = p[d] - p[buy], record = profit > best;
      if (record) { best = profit; bestBuy = buy; bestSell = d; }
      steps.push(runStep('profit', { L: buy, R: d, best, profit }, [say('window', 'Bought at ' + p[buy] + ', sold today at ' + p[d] + ': ' + profit + '.'), say('narr', record ? 'A new best!' : 'The best is still ' + best + '.')],
        'Bought at ' + p[buy] + ' and sold today at ' + p[d] + ', the window-keeper makes ' + profit + '.' + (record ? ' Her best yet.' : ' Her best is still ' + best + '.'), 'profit = ' + p[d] + ' − ' + p[buy] + ' = ' + profit + '; best = ' + best + '.', 'One sale per day matters: today against the cheapest morning before it.'));
    }
  }
  const made = bestBuy >= 0;
  steps.push(runStep('found', { L: made ? bestBuy : buy, R: made ? bestSell : buy, best, profit: best, done: true },
    [say('window', 'The week is over.'), say('narr', made ? 'Buy at ' + p[bestBuy] + ', sell at ' + p[bestSell] + '. Best profit: ' + best + '.' : 'No later morning was dearer. The best profit is 0.')],
    made ? 'The best plan: buy at ' + p[bestBuy] + ' and sell at ' + p[bestSell] + '. That makes ' + best + '.' : 'Prices never went up after a buy, so no trade makes money. The answer is 0.', 'return best = ' + best + '.', (n - 1) + ' comparisons, O(1) space.'));
  runFinish(steps, { intro: ['Day 1: nothing to sell yet', 'plain'], cheaper: ['Cheaper morning → move the buy day', 'cool'], profit: ['Sell today? Check the profit', 'warn'], found: ['Best profit: ' + best, 'ok'] }, (st) => {
    st.cells = p.map((_, i) => (st.done ? (made && (i === bestBuy || i === bestSell) ? 'best' : 'out') : i < st.L ? 'out' : i > st.R ? 'future' : i === st.L ? 'buy' : i === st.R ? 'cur' : 'in'));
    st.meter = { text: st.done ? 'best = ' + best : st.kind === 'profit' ? 'sell ' + p[st.R] + ' − buy ' + p[st.L] + ' = ' + st.profit : 'buy at ' + p[st.L], pct: (st.profit / top) * 100, mark: (st.best / top) * 100, markLabel: 'best so far ' + st.best };
    st.watch = [['buy', st.L, 'right'], ['day', st.R, 'left'], ['prices[buy]', p[st.L], 'right'], ['prices[day]', p[st.R], 'left'], ['profit', st.profit, 'text'], ['best', st.best, st.done ? 'ok' : 'text']];
  });
  return runScene('best-time-stock', Object.assign(fitPlanks({ pitch: 84, tile: 44, unit: 18 }, p, 600), {
    items: p, status: ['Watching prices…', 'Best profit: ' + best],
    example: ['prices = ' + showList(p), 'answer = ' + best],
    answer: best, input: { nums: p }
  }), steps);
}
SCENE_INPUT['best-time-stock'] = {
  hint: 'prices from 1 to 9, one per morning', example: '7, 1, 5, 3, 6, 4',
  default: { nums: [7, 1, 5, 3, 6, 4] },
  presets: [['Story example', () => ({ nums: [7, 1, 5, 3, 6, 4] })], ['Random', () => ({ nums: rlist(rint(4, 9), 1, 9) })], ['Rising', () => ({ nums: [1, 2, 4, 6, 9] })], ['Falling', () => ({ nums: [9, 7, 5, 3, 1] })]],
  random: () => ({ nums: rlist(rint(3, 9), 1, 9) }),
  parse: (t) => ({ nums: parseNums(t) }), show: (v) => v.nums.join(', '),
  check: (v) => checkCount(v.nums, 3, 9, 'prices') || checkRange(v.nums, 1, 9, 'Prices'),
  make: stockRun
};
