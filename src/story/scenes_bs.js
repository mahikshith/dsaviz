// ---------- Binary Search: Gus guesses the middle and halves the doubt ----------

// Cells for a search window: outside [lo, hi] is ruled out, mid is the guess.
function bsCells(n, lo, hi, mid, state) {
  return Array.from({ length: n }, (_, i) => (state === 'intro' ? 'in' : state === 'found' ? (i === mid ? 'ok' : 'out') : i < lo || i > hi ? 'out' : i === mid ? 'cur' : 'in'));
}

// The Number-Guessing Game — Binary Search
function guessScene() {
  const nums = [3, 7, 11, 15, 19, 24, 30, 36], target = 11;
  const n = nums.length;
  const steps = [];
  steps.push({ L: (n - 1) >> 1, lo: 0, hi: n - 1, mid: null, kind: 'intro',
    dialog: [say('hoot', 'Eight cards lie in a row, smallest to biggest. One of them is 11.'), say('gus', 'I’ll look at the middle card first.'), say('gus', 'If it’s too small, 11 must be to the right. If it’s too big, 11 must be to the left.')],
    nar: { kid: 'The cards are in order. Gus always looks at the middle card. Each guess rules out half of the cards that are left.', builder: 'lo = 0, hi = n − 1. While lo ≤ hi: mid = (lo + hi) // 2. Equal → done. Too small → lo = mid + 1. Too big → hi = mid − 1.', expert: 'Invariant: if the target exists, its index lies in [lo, hi]. Each probe at least halves the interval, so at most ⌊log₂ n⌋ + 1 probes.' } });
  let lo = 0, hi = n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1, v = nums[mid];
    if (v === target) {
      steps.push({ L: mid, lo, hi, mid, kind: 'found',
        dialog: [say('gus', 'Card ' + mid + ' shows ' + v + '. That’s it!'), say('hoot', 'Found in ' + (steps.length) + ' guesses. Checking one by one would take ' + (mid + 1) + '.')],
        nar: { kid: 'The middle card is ' + v + '. Gus found it at position ' + mid + '.', builder: 'nums[' + mid + '] == ' + target + ' → return ' + mid + '.', expert: steps.length + ' probes for n = ' + n + '. The bound is ⌊log₂ 8⌋ + 1 = 4.' } });
      break;
    }
    if (v < target) {
      steps.push({ L: mid, lo, hi, mid, kind: 'up',
        dialog: [say('gus', 'Card ' + mid + ' shows ' + v + '. That’s too small.'), say('gus', 'Every card left of it is even smaller. I drop them all.')],
        nar: { kid: v + ' is smaller than ' + target + '. So ' + target + ' must be to the right. Gus drops this card and everything to its left.', builder: 'nums[' + mid + '] = ' + v + ' < ' + target + ' → lo = mid + 1 = ' + (mid + 1) + '.', expert: 'Sorted ⇒ nums[0..' + mid + '] ≤ ' + v + ' < target. Discard the left half in O(1).' } });
      lo = mid + 1;
    } else {
      steps.push({ L: mid, lo, hi, mid, kind: 'down',
        dialog: [say('gus', 'Card ' + mid + ' shows ' + v + '. That’s too big.'), say('gus', 'Every card right of it is even bigger. I drop them all.')],
        nar: { kid: v + ' is bigger than ' + target + '. So ' + target + ' must be to the left. Gus drops this card and everything to its right.', builder: 'nums[' + mid + '] = ' + v + ' > ' + target + ' → hi = mid − 1 = ' + (mid - 1) + '.', expert: 'Sorted ⇒ nums[' + mid + '..' + (n - 1) + '] ≥ ' + v + ' > target. Discard the right half in O(1).' } });
      hi = mid - 1;
    }
  }
  const ans = steps[steps.length - 1].mid;
  const T = { intro: ['All 8 cards are still possible', 'plain'], up: ['Too small → drop the left half', 'warn'], down: ['Too big → drop the right half', 'cool'], found: ['Found 11 at position ' + ans, 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = bsCells(n, st.lo, st.hi, st.mid, st.kind);
    const left = st.done ? 1 : st.hi - st.lo + 1;
    const g = st.mid === null;
    st.meter = { text: g ? 'looking for 11' : nums[st.mid] + (st.done ? ' = ' : nums[st.mid] < target ? ' < ' : ' > ') + target, pct: (left / n) * 100, mark: 100, markLabel: 'cards still possible ' + left + ' / ' + n };
    st.watch = [['lo', st.lo, 'right'], ['hi', st.hi, 'right'], ['mid', g ? '—' : st.mid, 'left'], ['nums[mid]', g ? '—' : nums[st.mid], 'left'], ['target', target, 'text'], ['result', st.done ? st.mid : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'binary-search', pattern: 'Binary Search', cast: 'bs', short: 'Guessing', visual: 'letters', items: nums.map(String), pitch: 64, tile: 52, tileH: 66, gap: 12, font: 26, width: 500,
    actorLabels: ['Gus · mid'],
    goal: 'Find the card that shows 11', status: ['Guessing…', 'Found it'],
    lines: { py: { intro: 2, found: 6, up: 8, down: 10 }, java: { intro: 2, found: 6, up: 8, down: 10 }, cpp: { intro: 2, found: 6, up: 8, down: 10 }, js: { intro: 2, found: 6, up: 8, down: 10 }, go: { intro: 2, found: 6, up: 8, down: 10 } },
    code: {
      py: [['def search(nums, target):', ''], ['    lo, hi = 0, len(nums) - 1', ''], ['    while lo <= hi:', ''], ['        mid = (lo + hi) // 2', ''], ['        if nums[mid] == target:', ''], ['            return mid', ''], ['        if nums[mid] < target:', ''], ['            lo = mid + 1', '      # too small: go right'], ['        else:', ''], ['            hi = mid - 1', '      # too big: go left'], ['    return -1', '']],
      java: [['int search(int[] nums, int target) {', ''], ['    int lo = 0, hi = nums.length - 1;', ''], ['    while (lo <= hi) {', ''], ['        int mid = lo + (hi - lo) / 2;', ''], ['        if (nums[mid] == target)', ''], ['            return mid;', ''], ['        if (nums[mid] < target)', ''], ['            lo = mid + 1;', '  // too small: go right'], ['        else', ''], ['            hi = mid - 1;', '  // too big: go left'], ['    }', ''], ['    return -1;', ''], ['}', '']],
      cpp: [['int search(vector<int>& nums, int target) {', ''], ['    int lo = 0, hi = nums.size() - 1;', ''], ['    while (lo <= hi) {', ''], ['        int mid = lo + (hi - lo) / 2;', ''], ['        if (nums[mid] == target)', ''], ['            return mid;', ''], ['        if (nums[mid] < target)', ''], ['            lo = mid + 1;', '  // too small: go right'], ['        else', ''], ['            hi = mid - 1;', '  // too big: go left'], ['    }', ''], ['    return -1;', ''], ['}', '']],
      js: [['function search(nums, target) {', ''], ['  let lo = 0, hi = nums.length - 1;', ''], ['  while (lo <= hi) {', ''], ['    const mid = (lo + hi) >> 1;', ''], ['    if (nums[mid] === target)', ''], ['      return mid;', ''], ['    if (nums[mid] < target)', ''], ['      lo = mid + 1;', '  // too small: go right'], ['    else', ''], ['      hi = mid - 1;', '  // too big: go left'], ['  }', ''], ['  return -1;', ''], ['}', '']],
      go: [['func search(nums []int, target int) int {', ''], ['    lo, hi := 0, len(nums)-1', ''], ['    for lo <= hi {', ''], ['        mid := lo + (hi-lo)/2', ''], ['        if nums[mid] == target {', ''], ['            return mid', ''], ['        } else if nums[mid] < target {', ''], ['            lo = mid + 1', '  // too small: go right'], ['        } else {', ''], ['            hi = mid - 1', '  // too big: go left'], ['        }', ''], ['    }', ''], ['    return -1', ''], ['}', '']]
    },
    rules: [['Start with every card possible', 'intro'], ['Middle card is the one → done', 'found'], ['Too small → drop the left half', 'up'], ['Too big → drop the right half', 'down']],
    complexity: [['O(log n)', 'each guess halves the cards left'], ['O(1)', 'just lo, hi and mid']],
    quest: ['Gus has eight number cards in a row. They go from smallest to biggest: 3, 7, 11, 15, 19, 24, 30, 36.', 'He wants the card that shows 11. Each card he looks at costs one guess. How few guesses can he use?'],
    example: ['nums = [3, 7, 11, 15, 19, 24, 30, 36]   target = 11', 'answer = 2   (nums[2] = 11)'],
    hints: ['Old Hoot: “The cards are in order. What does one card tell you about the cards next to it?”', '“If a card is too small, can any card to its left be the one?”', '“Always look at the middle card. Then drop the half that can’t hold the answer.”'],
    clues: ['the cards are sorted', 'find one exact value', 'use as few looks as you can'],
    quizFb: ['Old Hoot: “Checking one by one works, but a million cards could take a million looks.”', 'Old Hoot: “Yes! The middle card tells you which half to drop. A million cards need only 20 guesses.”', 'Old Hoot: “A running total adds things up. Here we only need to find one card.”', 'Old Hoot: “A notebook needs you to look at every card first. The order already tells you where to go.”'],
    steps
  };
}

// The Spun Bookshelf — Search in Rotated Sorted Array
function shelfScene() {
  const nums = [12, 15, 18, 20, 25, 3, 6, 9], target = 6;
  const n = nums.length;
  const steps = [];
  steps.push({ L: (n - 1) >> 1, lo: 0, hi: n - 1, mid: null, kind: 'intro',
    dialog: [say('hoot', 'These books were in order by number. Then someone moved the first three to the end.'), say('gus', 'So the shelf has two runs. Each run is still in order.'), say('hoot', 'Find book 6.'), say('gus', 'I’ll check the middle. One side of it is always in order.')],
    nar: { kid: 'The books go up, drop once, then go up again. Gus looks at the middle book. One side of it has no drop. He checks if book 6 fits on that side.', builder: 'lo = 0, hi = n − 1. mid = (lo + hi) // 2. If nums[lo] ≤ nums[mid], the left half is sorted; otherwise the right half is. Test the target against the sorted half.', expert: 'A rotation point lies in at most one half, so one half is always sorted. Range-test the target there and discard a half per probe: O(log n).' } });
  let lo = 0, hi = n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1, v = nums[mid];
    if (v === target) {
      steps.push({ L: mid, lo, hi, mid, kind: 'found',
        dialog: [say('gus', 'The middle book is ' + v + '. Found it!'), say('hoot', 'Book 6 is at position ' + mid + '.')],
        nar: { kid: 'The middle book is ' + v + '. Gus found it at position ' + mid + '.', builder: 'nums[' + mid + '] == ' + target + ' → return ' + mid + '.', expert: steps.length + ' probes for n = ' + n + '.' } });
      break;
    }
    const leftSorted = nums[lo] <= v;
    let kind, side, fits;
    if (leftSorted) {
      fits = nums[lo] <= target && target < v;
      kind = fits ? 'leftIn' : 'leftOut';
      side = 'Books ' + nums[lo] + ' to ' + v + ' are in order.';
    } else {
      fits = v < target && target <= nums[hi];
      kind = fits ? 'rightIn' : 'rightOut';
      side = 'Books ' + v + ' to ' + nums[hi] + ' are in order.';
    }
    const goLeft = kind === 'leftIn' || kind === 'rightOut';
    const range = leftSorted ? nums[lo] + ' to ' + v : v + ' to ' + nums[hi];
    steps.push({ L: mid, lo, hi, mid, kind,
      dialog: [say('gus', 'The middle book is ' + v + '. ' + side), say('gus', fits ? '6 fits between ' + range + '. I keep that side.' : '6 does not fit between ' + range + '. I drop that side.'), say('hoot', 'So Gus searches the ' + (goLeft ? 'left' : 'right') + ' part.')],
      nar: { kid: 'The middle book is ' + v + '. The ' + (leftSorted ? 'left' : 'right') + ' side goes ' + range + ' with no drop. ' + (fits ? 'Book 6 fits in there, so Gus keeps it.' : 'Book 6 can’t be in there, so Gus drops it.'), builder: (leftSorted ? 'nums[lo] = ' + nums[lo] + ' ≤ nums[mid] = ' + v + ': left half sorted. ' : 'nums[lo] = ' + nums[lo] + ' > nums[mid] = ' + v + ': right half sorted. ') + (fits ? 'Target is inside' : 'Target is outside') + ' → ' + (goLeft ? 'hi = ' + (mid - 1) : 'lo = ' + (mid + 1)) + '.', expert: 'Sorted half [' + (leftSorted ? lo + ', ' + mid : mid + ', ' + hi) + '] spans ' + range + '. A single range test decides membership, so one half is discarded in O(1).' } });
    if (goLeft) hi = mid - 1; else lo = mid + 1;
  }
  const ans = steps[steps.length - 1].mid;
  const T = { intro: ['All 8 books are still possible', 'plain'], leftIn: ['Left side in order and 6 fits → keep left', 'warn'], leftOut: ['Left side in order, 6 doesn’t fit → go right', 'warn'], rightIn: ['Right side in order and 6 fits → keep right', 'cool'], rightOut: ['Right side in order, 6 doesn’t fit → go left', 'cool'], found: ['Found book 6 at position ' + ans, 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = bsCells(n, st.lo, st.hi, st.mid, st.kind);
    const left = st.done ? 1 : st.hi - st.lo + 1;
    const g = st.mid === null;
    st.meter = { text: g ? 'looking for book 6' : st.done ? nums[st.mid] + ' = 6' : 'middle = ' + nums[st.mid], pct: (left / n) * 100, mark: 100, markLabel: 'books still possible ' + left + ' / ' + n };
    st.watch = [['lo', st.lo, 'right'], ['hi', st.hi, 'right'], ['mid', g ? '—' : st.mid, 'left'], ['nums[mid]', g ? '—' : nums[st.mid], 'left'], ['sorted half', g ? '—' : st.done ? '—' : st.kind.startsWith('left') ? 'left' : 'right', 'text'], ['result', st.done ? st.mid : '…', st.done ? 'ok' : 'text']];
  });
  const L5 = { intro: 2, found: 5, leftIn: 7, leftOut: 8, rightIn: 10, rightOut: 11 };
  return {
    id: 'search-rotated', pattern: 'Binary Search', cast: 'bs', predictFull: true, short: 'Spun Shelf', visual: 'letters', items: nums.map(String), pitch: 64, tile: 52, tileH: 66, gap: 12, font: 26, width: 500,
    actorLabels: ['Gus · mid'],
    goal: 'Find book 6 on the moved shelf', status: ['Searching…', 'Found it'],
    lines: { py: { intro: 2, found: 6, leftIn: 9, leftOut: 11, rightIn: 14, rightOut: 16 }, java: L5, cpp: L5, js: L5, go: { intro: 2, found: 6, leftIn: 10, leftOut: 12, rightIn: 16, rightOut: 18 } },
    code: {
      py: [['def search(nums, target):', ''], ['    lo, hi = 0, len(nums) - 1', ''], ['    while lo <= hi:', ''], ['        mid = (lo + hi) // 2', ''], ['        if nums[mid] == target:', ''], ['            return mid', ''], ['        if nums[lo] <= nums[mid]:', '  # left in order'], ['            if nums[lo] <= target < nums[mid]:', ''], ['                hi = mid - 1', ''], ['            else:', ''], ['                lo = mid + 1', ''], ['        else:', '                  # right in order'], ['            if nums[mid] < target <= nums[hi]:', ''], ['                lo = mid + 1', ''], ['            else:', ''], ['                hi = mid - 1', ''], ['    return -1', '']],
      java: [['int search(int[] nums, int target) {', ''], ['    int lo = 0, hi = nums.length - 1;', ''], ['    while (lo <= hi) {', ''], ['        int mid = lo + (hi - lo) / 2;', ''], ['        if (nums[mid] == target) return mid;', ''], ['        if (nums[lo] <= nums[mid]) {', '  // left side in order'], ['            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;', ''], ['            else lo = mid + 1;', ''], ['        } else {', '  // right side in order'], ['            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;', ''], ['            else hi = mid - 1;', ''], ['        }', ''], ['    }', ''], ['    return -1;', ''], ['}', '']],
      cpp: [['int search(vector<int>& nums, int target) {', ''], ['    int lo = 0, hi = nums.size() - 1;', ''], ['    while (lo <= hi) {', ''], ['        int mid = lo + (hi - lo) / 2;', ''], ['        if (nums[mid] == target) return mid;', ''], ['        if (nums[lo] <= nums[mid]) {', '  // left side in order'], ['            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;', ''], ['            else lo = mid + 1;', ''], ['        } else {', '  // right side in order'], ['            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;', ''], ['            else hi = mid - 1;', ''], ['        }', ''], ['    }', ''], ['    return -1;', ''], ['}', '']],
      js: [['function search(nums, target) {', ''], ['  let lo = 0, hi = nums.length - 1;', ''], ['  while (lo <= hi) {', ''], ['    const mid = (lo + hi) >> 1;', ''], ['    if (nums[mid] === target) return mid;', ''], ['    if (nums[lo] <= nums[mid]) {', '  // left side in order'], ['      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;', ''], ['      else lo = mid + 1;', ''], ['    } else {', '  // right side in order'], ['      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;', ''], ['      else hi = mid - 1;', ''], ['    }', ''], ['  }', ''], ['  return -1;', ''], ['}', '']],
      go: [['func search(nums []int, target int) int {', ''], ['    lo, hi := 0, len(nums)-1', ''], ['    for lo <= hi {', ''], ['        mid := lo + (hi-lo)/2', ''], ['        if nums[mid] == target {', ''], ['            return mid', ''], ['        }', ''], ['        if nums[lo] <= nums[mid] {', '  // left side in order'], ['            if nums[lo] <= target && target < nums[mid] {', ''], ['                hi = mid - 1', ''], ['            } else {', ''], ['                lo = mid + 1', ''], ['            }', ''], ['        } else {', '  // right side in order'], ['            if nums[mid] < target && target <= nums[hi] {', ''], ['                lo = mid + 1', ''], ['            } else {', ''], ['                hi = mid - 1', ''], ['            }', ''], ['        }', ''], ['    }', ''], ['    return -1', ''], ['}', '']]
    },
    rules: [['Start with every book possible', 'intro'], ['Middle book is the one → done', 'found'], ['Left side in order and it fits → keep left', 'leftIn'], ['Left side in order, it doesn’t fit → go right', 'leftOut'], ['Right side in order and it fits → keep right', 'rightIn'], ['Right side in order, it doesn’t fit → go left', 'rightOut']],
    complexity: [['O(log n)', 'each look drops half the shelf'], ['O(1)', 'just lo, hi and mid']],
    quest: ['Eight books sat on a shelf in order by number. Then someone took the first three and put them at the end: 12, 15, 18, 20, 25, 3, 6, 9.', 'Gus must find book 6. Looking at every book is too slow. Can he still halve the shelf each time?'],
    example: ['nums = [12, 15, 18, 20, 25, 3, 6, 9]   target = 6', 'answer = 6   (nums[6] = 6)'],
    hints: ['Old Hoot: “The numbers drop only once on this shelf. Split it at the middle. Can both sides hold the drop?”', '“One side has no drop, so it is in order. You can tell at a glance if 6 fits in it.”', '“Compare the first book with the middle book to find the ordered side. If 6 fits there, keep it. If not, keep the other side.”'],
    clues: ['it was in order before the move', 'find one exact book', 'faster than checking every book'],
    quizFb: ['Old Hoot: “Checking every book works, but it ignores the order the shelf still has.”', 'Old Hoot: “Yes! One side of the middle is always in order. Check that side and drop half.”', 'Old Hoot: “A running total adds things up. Here we only need to find one book.”', 'Old Hoot: “A notebook means looking at every book first. The order lets you skip most of them.”'],
    steps
  };
}

// The Lowest Step — Find Minimum in Rotated Sorted Array
function stepScene() {
  const h = [14, 16, 18, 20, 22, 8, 10, 12];
  const n = h.length;
  const steps = [];
  steps.push({ L: 0, lo: 0, hi: n - 1, mid: null, kind: 'intro',
    dialog: [say('hoot', 'This staircase went up step by step. Then someone cut it and swapped the two pieces.'), say('gus', 'So it climbs, drops once, then climbs again.'), say('hoot', 'Find the lowest step.'), say('gus', 'I’ll compare the middle step with the last step.')],
    nar: { kid: 'The steps go up, drop down once, then go up again. The lowest step is right after the drop. Gus compares the middle step with the last step to find which side the drop is on.', builder: 'lo = 0, hi = n − 1. While lo < hi: mid = (lo + hi) // 2. If h[mid] > h[hi], the minimum is right of mid: lo = mid + 1. Else hi = mid.', expert: 'h[mid] > h[hi] means the rotation point lies in (mid, hi]. Otherwise [mid, hi] is sorted and the minimum is in [lo, mid]. Loop ends when lo == hi.' } });
  let lo = 0, hi = n - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (h[mid] > h[hi]) {
      steps.push({ L: mid, lo, hi, mid, kind: 'goRight',
        dialog: [say('gus', 'The middle step is ' + h[mid] + '. The last step is ' + h[hi] + '.'), say('gus', h[mid] + ' is higher than ' + h[hi] + '. So the drop is to the right.'), say('hoot', 'The middle step can’t be the lowest. Drop it and everything left of it.')],
        nar: { kid: 'The middle step (' + h[mid] + ') is higher than the last step (' + h[hi] + '). The stairs must drop somewhere to the right. Gus looks only there.', builder: 'h[' + mid + '] = ' + h[mid] + ' > h[' + hi + '] = ' + h[hi] + ' → lo = mid + 1 = ' + (mid + 1) + '.', expert: 'h[mid] > h[hi] proves the rotation point is in (' + mid + ', ' + hi + ']. Discard [' + lo + ', ' + mid + '].' } });
      lo = mid + 1;
    } else {
      steps.push({ L: mid, lo, hi, mid, kind: 'goLeft',
        dialog: [say('gus', 'The middle step is ' + h[mid] + '. The last step is ' + h[hi] + '.'), say('gus', h[mid] + ' is not higher than ' + h[hi] + '. From here to the end, the stairs only go up.'), say('hoot', 'So the lowest is this step or to its left. Keep the middle step.')],
        nar: { kid: 'The middle step (' + h[mid] + ') is not higher than the last step (' + h[hi] + '). There is no drop on the right side. The lowest step is here or to the left.', builder: 'h[' + mid + '] = ' + h[mid] + ' ≤ h[' + hi + '] = ' + h[hi] + ' → hi = mid = ' + mid + '.', expert: '[' + mid + ', ' + hi + '] is sorted, so its minimum is h[' + mid + ']. Keep mid as a candidate: hi = mid, not mid − 1.' } });
      hi = mid;
    }
  }
  steps.push({ L: lo, lo, hi, mid: lo, kind: 'found',
    dialog: [say('gus', 'Only one step is left. It’s ' + h[lo] + '.'), say('hoot', 'The lowest step is ' + h[lo] + ', at position ' + lo + '.')],
    nar: { kid: 'Only one step is left. The lowest step is ' + h[lo] + '.', builder: 'lo == hi = ' + lo + ' → return h[' + lo + '] = ' + h[lo] + '.', expert: (steps.length - 1) + ' probes for n = ' + n + '. O(log n) time, O(1) space.' } });
  const T = { intro: ['All 8 steps are still possible', 'plain'], goRight: ['Middle higher than last → drop is to the right', 'warn'], goLeft: ['Middle not higher → lowest is here or left', 'cool'], found: ['Lowest step: ' + h[lo], 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.cells = bsCells(n, st.lo, st.hi, st.mid, st.kind);
    const left = st.done ? 1 : st.hi - st.lo + 1;
    const g = st.mid === null;
    st.meter = { text: g ? 'compare middle with last' : st.done ? 'lowest = ' + h[st.mid] : h[st.mid] + (h[st.mid] > h[st.hi] ? ' > ' : ' ≤ ') + h[st.hi], pct: (left / n) * 100, mark: 100, markLabel: 'steps still possible ' + left + ' / ' + n };
    st.watch = [['lo', st.lo, 'right'], ['hi', st.hi, 'right'], ['mid', g ? '—' : st.mid, 'left'], ['nums[mid]', g ? '—' : h[st.mid], 'left'], ['nums[hi]', h[st.hi], 'text'], ['result', st.done ? h[st.mid] : '…', st.done ? 'ok' : 'text']];
  });
  const L4 = { intro: 2, goRight: 6, goLeft: 8, found: 10 };
  return {
    id: 'find-min-rotated', pattern: 'Binary Search', cast: 'bs', short: 'Lowest Step', visual: 'planks', items: h, pitch: 64, tile: 44, width: 492, unit: 6,
    actorLabels: ['Gus · mid'],
    goal: 'Find the lowest step on the cut staircase', status: ['Searching…', 'Lowest found'],
    lines: { py: { intro: 2, goRight: 6, goLeft: 8, found: 9 }, java: L4, cpp: L4, js: L4, go: { intro: 2, goRight: 6, goLeft: 8, found: 11 } },
    code: {
      py: [['def findMin(nums):', ''], ['    lo, hi = 0, len(nums) - 1', ''], ['    while lo < hi:', ''], ['        mid = (lo + hi) // 2', ''], ['        if nums[mid] > nums[hi]:', ''], ['            lo = mid + 1', '  # drop is on the right'], ['        else:', ''], ['            hi = mid', '      # mid may be lowest'], ['    return nums[lo]', '']],
      java: [['int findMin(int[] nums) {', ''], ['    int lo = 0, hi = nums.length - 1;', ''], ['    while (lo < hi) {', ''], ['        int mid = lo + (hi - lo) / 2;', ''], ['        if (nums[mid] > nums[hi])', ''], ['            lo = mid + 1;', '  // drop is on the right'], ['        else', ''], ['            hi = mid;', '      // mid may be lowest'], ['    }', ''], ['    return nums[lo];', ''], ['}', '']],
      cpp: [['int findMin(vector<int>& nums) {', ''], ['    int lo = 0, hi = nums.size() - 1;', ''], ['    while (lo < hi) {', ''], ['        int mid = lo + (hi - lo) / 2;', ''], ['        if (nums[mid] > nums[hi])', ''], ['            lo = mid + 1;', '  // drop is on the right'], ['        else', ''], ['            hi = mid;', '      // mid may be lowest'], ['    }', ''], ['    return nums[lo];', ''], ['}', '']],
      js: [['function findMin(nums) {', ''], ['  let lo = 0, hi = nums.length - 1;', ''], ['  while (lo < hi) {', ''], ['    const mid = (lo + hi) >> 1;', ''], ['    if (nums[mid] > nums[hi])', ''], ['      lo = mid + 1;', '  // drop is on the right'], ['    else', ''], ['      hi = mid;', '      // mid may be lowest'], ['  }', ''], ['  return nums[lo];', ''], ['}', '']],
      go: [['func findMin(nums []int) int {', ''], ['    lo, hi := 0, len(nums)-1', ''], ['    for lo < hi {', ''], ['        mid := lo + (hi-lo)/2', ''], ['        if nums[mid] > nums[hi] {', ''], ['            lo = mid + 1', '  // drop is on the right'], ['        } else {', ''], ['            hi = mid', '      // mid may be lowest'], ['        }', ''], ['    }', ''], ['    return nums[lo]', ''], ['}', '']]
    },
    rules: [['Start with every step possible', 'intro'], ['Middle higher than last → look right of the middle', 'goRight'], ['Middle not higher → keep the middle and look left', 'goLeft'], ['One step left → that’s the lowest', 'found']],
    complexity: [['O(log n)', 'each look drops half the steps'], ['O(1)', 'just lo, hi and mid']],
    quest: ['A staircase climbed step by step. Then someone cut it in two and swapped the pieces. Now the heights are 14, 16, 18, 20, 22, 8, 10, 12.', 'Gus must find the lowest step. He wants to look at as few steps as he can.'],
    example: ['nums = [14, 16, 18, 20, 22, 8, 10, 12]', 'answer = 8'],
    hints: ['Old Hoot: “The stairs drop only once. The lowest step comes right after the drop.”', '“Compare the middle step with the last step. If the middle is higher, where must the drop be?”', '“Middle higher than last → look right of the middle. Otherwise the middle might be the lowest, so keep it and look left.”'],
    clues: ['it was in order before the cut', 'find the smallest value', 'faster than checking every step'],
    quizFb: ['Old Hoot: “Checking every step works, but it ignores the order the stairs still have.”', 'Old Hoot: “Yes! The middle and the last step tell you which side the drop is on. Drop the other half.”', 'Old Hoot: “A running total adds things up. Here we only need the smallest step.”', 'Old Hoot: “A notebook means looking at every step first. The order lets you skip most of them.”'],
    steps
  };
}

SCENE_REGISTRY.push(guessScene, shelfScene, stepScene);
PATTERN_KITS['Binary Search'] = { right: 1, spot: 'Why halve, not walk?', ask: 'How should Gus search?',
  quiz: [['Check every one', 'Walk the row from the start'], ['Halve the doubt', 'Look at the middle, drop the wrong half'], ['Keep a running total', 'Write the sum so far at every step'], ['A notebook of everything seen', 'Write down every value you pass']] };
STORY_CAST.gus = { name: 'Gus', initial: 'G', color: 'right', radius: '999px' };

// ---------- Your own input (see practice.js) ----------
// Binary search and the spun shelf share one walk; only the "which half" rule differs.
function bsRun(id, input) {
  const rotated = id === 'search-rotated';
  const v = input || SCENE_INPUT[id].default;
  const nums = v.nums.slice(), T = v.target, n = nums.length;
  const what = rotated ? 'book' : 'card';
  const steps = [];
  let lo = 0, hi = n - 1, ans = -1;
  steps.push(runStep('intro', { L: (n - 1) >> 1, lo, hi, mid: null }, [say('hoot', n + ' ' + what + 's. Find the one that shows ' + T + '.'), say('gus', rotated ? 'One side of the middle is always in order. I’ll use that side.' : 'I’ll look at the middle ' + what + ' first.')],
    rotated ? 'The shelf goes up, drops once, then goes up again. Gus checks the middle book and the side of it that is in order.' : 'The cards are in order. Gus looks at the middle card, and each look rules out half of the rest.',
    'lo = 0, hi = ' + (n - 1) + '. While lo ≤ hi: mid = (lo + hi) // 2.', 'Each look halves what is left: O(log n).'));
  while (lo <= hi) {
    const mid = (lo + hi) >> 1, x = nums[mid];
    if (x === T) {
      ans = mid;
      steps.push(runStep('found', { L: mid, lo, hi, mid, done: true }, [say('gus', 'The middle ' + what + ' shows ' + x + '. Found it!'), say('hoot', 'It is at position ' + mid + '.')],
        'The middle ' + what + ' is ' + x + '. Gus found it at position ' + mid + '.', 'nums[' + mid + '] == ' + T + ' → return ' + mid + '.', steps.length + ' looks for ' + n + ' ' + what + 's.'));
      break;
    }
    if (!rotated) {
      const up = x < T;
      steps.push(runStep(up ? 'up' : 'down', { L: mid, lo, hi, mid }, [say('gus', 'Card ' + mid + ' shows ' + x + '. Too ' + (up ? 'small' : 'big') + '.'), say('gus', 'I drop it and everything to its ' + (up ? 'left' : 'right') + '.')],
        x + ' is ' + (up ? 'smaller' : 'bigger') + ' than ' + T + ', so ' + T + ' can only be to the ' + (up ? 'right' : 'left') + '. Gus drops the other half.',
        'nums[' + mid + '] = ' + x + (up ? ' < ' : ' > ') + T + ' → ' + (up ? 'lo = ' + (mid + 1) : 'hi = ' + (mid - 1)) + '.', 'The list is sorted, so one look settles a whole half.'));
      if (up) lo = mid + 1; else hi = mid - 1;
      continue;
    }
    const leftSorted = nums[lo] <= x;
    const fits = leftSorted ? nums[lo] <= T && T < x : x < T && T <= nums[hi];
    const kind = leftSorted ? (fits ? 'leftIn' : 'leftOut') : (fits ? 'rightIn' : 'rightOut');
    const range = leftSorted ? nums[lo] + ' to ' + x : x + ' to ' + nums[hi];
    const goLeft = kind === 'leftIn' || kind === 'rightOut';
    steps.push(runStep(kind, { L: mid, lo, hi, mid }, [say('gus', 'The middle book is ' + x + '. Books ' + range + ' are in order.'), say('gus', T + (fits ? ' fits in there. I keep that side.' : ' does not fit there. I drop that side.'))],
      'The ' + (leftSorted ? 'left' : 'right') + ' side runs ' + range + ' with no drop. ' + (fits ? T + ' fits in there, so Gus keeps it.' : T + ' cannot be in there, so Gus searches the other side.'),
      (leftSorted ? 'nums[lo] ≤ nums[mid]' : 'nums[lo] > nums[mid]') + ' → ' + (goLeft ? 'hi = ' + (mid - 1) : 'lo = ' + (mid + 1)) + '.', 'The side in order tells for sure if the target can be there.'));
    if (goLeft) hi = mid - 1; else lo = mid + 1;
  }
  if (ans < 0) {
    steps.push(runStep('missing', { L: Math.min(Math.max(lo, 0), n - 1), lo, hi, mid: null, done: true }, [say('gus', 'Nothing is left to look at.'), say('hoot', T + ' is not here. The answer is −1.')],
      'Every ' + what + ' that could hold ' + T + ' has been ruled out. It is not there.', 'lo > hi → return -1.', (steps.length - 1) + ' looks to prove it is missing.'));
  }
  const T5 = rotated
    ? { intro: ['All ' + n + ' books are still possible', 'plain'], leftIn: ['Left side in order and it fits → keep left', 'warn'], leftOut: ['Left side in order, it doesn’t fit → go right', 'warn'], rightIn: ['Right side in order and it fits → keep right', 'cool'], rightOut: ['Right side in order, it doesn’t fit → go left', 'cool'], found: ['Found ' + T + ' at position ' + ans, 'ok'], missing: [T + ' is not on the shelf → −1', 'ok'] }
    : { intro: ['All ' + n + ' cards are still possible', 'plain'], up: ['Too small → drop the left half', 'warn'], down: ['Too big → drop the right half', 'cool'], found: ['Found ' + T + ' at position ' + ans, 'ok'], missing: [T + ' is not there → −1', 'ok'] };
  runFinish(steps, T5, (st) => {
    st.cells = st.kind === 'missing' ? nums.map(() => 'out') : bsCells(n, st.lo, st.hi, st.mid, st.kind);
    const left = st.kind === 'found' ? 1 : st.kind === 'missing' ? 0 : st.hi - st.lo + 1, g = st.mid === null;
    st.meter = { text: st.kind === 'missing' ? 'nothing left: not found' : g ? 'looking for ' + T : st.done ? nums[st.mid] + ' = ' + T : rotated ? 'middle = ' + nums[st.mid] : nums[st.mid] + (nums[st.mid] < T ? ' < ' : ' > ') + T, pct: (left / n) * 100, mark: 100, markLabel: what + 's still possible ' + left + ' / ' + n };
    st.watch = [['lo', st.lo, 'right'], ['hi', st.hi, 'right'], ['mid', g ? '—' : st.mid, 'left'], ['nums[mid]', g ? '—' : nums[st.mid], 'left'], ['target', T, 'text'], ['result', st.kind === 'found' ? st.mid : st.kind === 'missing' ? -1 : '…', st.done ? 'ok' : 'text']];
  });
  const base = SCENES[id];
  return runScene(id, Object.assign(fitRow({ pitch: 64, tile: 52, tileH: 66, font: 26 }, n, 600), {
    items: nums.map(String), goal: rotated ? 'Find book ' + T + ' on the moved shelf' : 'Find the card that shows ' + T,
    status: ['Searching…', ans >= 0 ? 'Found it' : 'Not there'],
    lines: runLines(base, { missing: /return -1/ }), rules: base.rules.concat([['Nothing left to search → −1', 'missing']]),
    example: ['nums = ' + showList(nums) + '   target = ' + T, 'answer = ' + ans],
    answer: ans, input: { nums, target: T }
  }), steps);
}
function randSortedSearch(rot) {
  const nums = rdistinct(rint(3, 9), 1, 60).sort((a, b) => a - b);
  const cut = rot ? rint(0, nums.length - 1) : 0;
  const list = nums.slice(cut).concat(nums.slice(0, cut));
  return { nums: list, target: Math.random() < 0.75 ? rpick(list) : rint(0, 61) };
}
SCENE_INPUT['binary-search'] = {
  hint: 'a sorted list in brackets, then the target', example: '[3, 7, 11, 15, 19, 24, 30, 36], 11',
  default: { nums: [3, 7, 11, 15, 19, 24, 30, 36], target: 11 },
  presets: [['Story example', () => ({ nums: [3, 7, 11, 15, 19, 24, 30, 36], target: 11 })], ['Random', () => randSortedSearch(false)], ['Not there', () => ({ nums: [2, 4, 6, 8, 10], target: 7 })], ['Last card', () => ({ nums: [1, 5, 9, 13, 17, 21, 25, 29, 33], target: 33 })]],
  random: () => randSortedSearch(false),
  parse: parseNumsTarget, show: showNumsTarget,
  check: (v) => checkCount(v.nums, 3, 9, 'cards') || checkRange(v.nums.concat([v.target]), 0, 99, 'Numbers') || checkSorted(v.nums, true),
  make: (v) => bsRun('binary-search', v)
};
SCENE_INPUT['search-rotated'] = {
  hint: 'a sorted list cut once and swapped, then the target', example: '[12, 15, 18, 20, 25, 3, 6, 9], 6',
  default: { nums: [12, 15, 18, 20, 25, 3, 6, 9], target: 6 },
  presets: [['Story example', () => ({ nums: [12, 15, 18, 20, 25, 3, 6, 9], target: 6 })], ['Random', () => randSortedSearch(true)], ['Not cut', () => ({ nums: [1, 3, 5, 7, 9], target: 7 })], ['Not there', () => ({ nums: [8, 9, 2, 4, 6], target: 5 })]],
  random: () => randSortedSearch(true),
  parse: parseNumsTarget, show: showNumsTarget,
  check: (v) => checkCount(v.nums, 3, 9, 'books') || checkRange(v.nums.concat([v.target]), 0, 99, 'Numbers') || checkRotated(v.nums),
  make: (v) => bsRun('search-rotated', v)
};

function lowestRun(input) {
  const h = (input || SCENE_INPUT['find-min-rotated'].default).nums.slice(), n = h.length;
  const steps = [];
  let lo = 0, hi = n - 1;
  steps.push(runStep('intro', { L: 0, lo, hi, mid: null }, [say('hoot', n + ' steps that climb, maybe drop once, then climb again. Find the lowest.'), say('gus', 'I’ll compare the middle step with the last one.')],
    'The lowest step comes right after the drop. Gus compares the middle step with the last step to see which side the drop is on.', 'lo = 0, hi = ' + (n - 1) + '. While lo < hi: mid = (lo + hi) // 2.', 'Each look halves what is left: O(log n).'));
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (h[mid] > h[hi]) {
      steps.push(runStep('goRight', { L: mid, lo, hi, mid }, [say('gus', 'Middle ' + h[mid] + ' is higher than last ' + h[hi] + '.'), say('hoot', 'So the drop is to the right.')],
        'The middle step (' + h[mid] + ') is higher than the last (' + h[hi] + '). The drop must be to the right, so Gus looks there.', 'h[' + mid + '] = ' + h[mid] + ' > h[' + hi + '] = ' + h[hi] + ' → lo = ' + (mid + 1) + '.', 'The middle step cannot be the lowest: a lower one comes after it.'));
      lo = mid + 1;
    } else {
      steps.push(runStep('goLeft', { L: mid, lo, hi, mid }, [say('gus', 'Middle ' + h[mid] + ' is not higher than last ' + h[hi] + '.'), say('hoot', 'So the lowest is here or to the left.')],
        'The middle step (' + h[mid] + ') is not higher than the last (' + h[hi] + '). No drop on the right, so the lowest is here or to the left.', 'h[' + mid + '] = ' + h[mid] + ' ≤ h[' + hi + '] = ' + h[hi] + ' → hi = ' + mid + '.', 'Keep the middle: it might be the lowest step itself.'));
      hi = mid;
    }
  }
  steps.push(runStep('found', { L: lo, lo, hi, mid: lo, done: true }, [say('gus', 'Only one step is left: ' + h[lo] + '.'), say('hoot', 'The lowest step is ' + h[lo] + '.')],
    'Only one step is left. The lowest step is ' + h[lo] + '.', 'lo == hi → return h[' + lo + '] = ' + h[lo] + '.', (steps.length - 1) + ' looks for ' + n + ' steps.'));
  runFinish(steps, { intro: ['All ' + n + ' steps are still possible', 'plain'], goRight: ['Middle higher than last → drop is to the right', 'warn'], goLeft: ['Middle not higher → lowest is here or left', 'cool'], found: ['Lowest step: ' + h[lo], 'ok'] }, (st) => {
    st.cells = bsCells(n, st.lo, st.hi, st.mid, st.kind);
    const left = st.done ? 1 : st.hi - st.lo + 1, g = st.mid === null;
    st.meter = { text: g ? 'compare middle with last' : st.done ? 'lowest = ' + h[st.mid] : h[st.mid] + (h[st.mid] > h[st.hi] ? ' > ' : ' ≤ ') + h[st.hi], pct: (left / n) * 100, mark: 100, markLabel: 'steps still possible ' + left + ' / ' + n };
    st.watch = [['lo', st.lo, 'right'], ['hi', st.hi, 'right'], ['mid', g ? '—' : st.mid, 'left'], ['nums[mid]', g ? '—' : h[st.mid], 'left'], ['nums[hi]', h[st.hi], 'text'], ['result', st.done ? h[st.mid] : '…', st.done ? 'ok' : 'text']];
  });
  return runScene('find-min-rotated', Object.assign(fitPlanks({ pitch: 64, tile: 44, unit: 6 }, h, 600), {
    items: h, unit: Math.min(18, Math.floor(150 / Math.max.apply(null, h))), status: ['Searching…', 'Lowest: ' + h[lo]],
    example: ['nums = ' + showList(h), 'answer = ' + h[lo]],
    answer: h[lo], input: { nums: h }
  }), steps);
}
SCENE_INPUT['find-min-rotated'] = {
  hint: 'step heights from 1 to 30, sorted then cut once', example: '14, 16, 18, 20, 22, 8, 10, 12',
  default: { nums: [14, 16, 18, 20, 22, 8, 10, 12] },
  presets: [['Story example', () => ({ nums: [14, 16, 18, 20, 22, 8, 10, 12] })], ['Random', () => SCENE_INPUT['find-min-rotated'].random()], ['Not cut', () => ({ nums: [2, 4, 6, 8, 10] })], ['Drop at the end', () => ({ nums: [5, 9, 12, 20, 1] })]],
  random: () => { const a = rdistinct(rint(3, 9), 1, 30).sort((x, y) => x - y), c = rint(0, a.length - 1); return { nums: a.slice(c).concat(a.slice(0, c)) }; },
  parse: (t) => ({ nums: parseNums(t) }), show: (v) => v.nums.join(', '),
  check: (v) => checkCount(v.nums, 3, 9, 'steps') || checkRange(v.nums, 1, 30, 'Heights') || checkRotated(v.nums),
  make: lowestRun
};
