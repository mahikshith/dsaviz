// ---- Story engine: one scene frame, one cast per pattern, many problems ----
const LEVELS = [['kid', 'Kid'], ['builder', 'Builder'], ['expert', 'Expert']];
const LANGS = [['py', 'Python'], ['java', 'Java'], ['cpp', 'C++'], ['js', 'JS'], ['go', 'Go']];
const STORY_EXTRA = {
  paper: { btnBg: '#1D1B18', btnFg: '#FFFDF8', activeBg: '#1D1B18', activeFg: '#FFFDF8', scene: '#1B1E26', sceneText: '#F3F0E8', sceneMuted: '#9DA2AE', dead: '#2A2E38', deadInk: '#6E7380', hue: 42, sat: 90, water: 'rgba(111,152,230,0.45)', waterTop: '#8FB0EA' },
  ink: { btnBg: '#F5A06E', btnFg: '#111317', activeBg: '#ECE9E2', activeFg: '#111317', scene: '#0B0D11', sceneText: '#F3F0E8', sceneMuted: '#8B909B', dead: '#1C1F26', deadInk: '#5A5F6A', hue: 42, sat: 92, water: 'rgba(111,152,230,0.4)', waterTop: '#6F98E6' },
  field: { btnBg: '#9FE870', btnFg: '#0C110B', activeBg: '#9FE870', activeFg: '#0C110B', scene: '#070B06', sceneText: '#C9EBB4', sceneMuted: '#6E8A60', dead: '#131B11', deadInk: '#435A38', hue: 95, sat: 70, water: 'rgba(159,232,112,0.28)', waterTop: '#9FE870' }
};
const say = (who, text) => [who, text];
// Newer patterns register themselves from their own scenes_*.js file, so adding one never touches tail.js or comp.js:
//   SCENE_REGISTRY.push(myScene);                 a function returning the scene
//   PATTERN_KITS['Binary Search'] = { right, spot, ask, quiz: [[title, story] x4] };
//   STORY_CAST.gus = { name: 'Gus', initial: 'G', color: 'left', radius: '999px' };   color is a theme key
const SCENE_REGISTRY = [];
const PATTERN_KITS = {};
const STORY_CAST = {};

// ---------- The Lantern Bridge (hand-written) ----------
function lanternScene() {
  const nums = [1, 3, 4, 6, 8, 11], target = 10;
  const raw = [
    [0, 5, 'intro', [say('hoot', 'Six lanterns, lined up dimmest to brightest. The gate opens for exactly two whose glow adds up to 10.'), say('lumi', 'I’ll stand at the dimmest end.'), say('roo', 'And I’ll take the brightest. We’ll squeeze in until we find it.')],
      ['Two friends start at opposite ends of a row of lanterns. They’ll walk toward each other until their two lanterns add up to exactly 10.', 'numbers is sorted. Set left = 0 and right = n − 1. Each step we check numbers[left] + numbers[right] and move exactly one pointer inward.', 'Sorted input ⇒ pair sums are monotone in each index. Invariant: if an answer exists, it lies inside [left, right]. Every step shrinks the window by one.']],
    [0, 5, 'over', [say('lumi', 'Mine glows 1.'), say('roo', 'Mine glows 11… together that’s 12. Too bright!'), say('hoot', 'Roo, even Lumi’s dimmest lantern can’t tame your 11. Yours can never be in the answer — step left.')],
      ['1 + 11 = 12. That’s too bright! The only way to get dimmer is for Roo to swap to a dimmer lantern — so Roo steps left.', 'total = 12 > target. Every pair that uses 11 is at least 1 + 11 = 12, so index 5 can never be in the answer. right -= 1.', 'numbers[L] is the window minimum, so numbers[i] + numbers[R] ≥ 12 > t for every i in [L, R). Column R is dominated — discard it in O(1).']],
    [0, 4, 'under', [say('roo', 'Now I’m holding 8.'), say('lumi', '1 + 8 = 9. Too dim now!'), say('hoot', 'Lumi, 8 is the brightest partner you have left and it still isn’t enough. Your 1 is out — step right.')],
      ['1 + 8 = 9. Too dim! To get brighter, Lumi swaps to a brighter lantern and steps right.', 'total = 9 < target. 8 is the biggest partner left for 1 and it still falls short, so 1 is useless. left += 1.', 'numbers[R] is the window maximum, so numbers[L] + numbers[j] ≤ 9 < t for every j. Row L is dominated; discard it.']],
    [1, 4, 'over', [say('lumi', 'I’ve got 3.'), say('roo', '3 + 8 = 11. A little too bright — I’ll step left again.'), say('hoot', 'Same rule as before: too bright means the bright end moves in.')],
      ['3 + 8 = 11. Still a bit too bright, so Roo steps left again.', '11 > 10, so right -= 1. Notice nobody ever walks back — every lantern we leave is ruled out for good.', 'Symmetric to step 2. Each index is discarded at most once ⇒ at most n − 1 moves ⇒ O(n) time.']],
    [1, 3, 'under', [say('roo', 'Down to 6.'), say('lumi', '3 + 6 = 9. Just one short!'), say('hoot', 'Too dim means the dim end moves up, Lumi.')],
      ['3 + 6 = 9. One too dim — Lumi steps right.', '9 < 10, so left += 1. The window is now just #3 and #4: only one pair left to try.', 'Window size 2. Either this pair hits t or no answer exists — and the problem guarantees one does.']],
    [2, 3, 'found', [say('lumi', 'I’m holding 4!'), say('roo', '4 + 6 = 10!'), say('hoot', 'The gate swings open. Lanterns #3 and #4 — your answer is [3, 4].')],
      ['4 + 6 = 10. Exactly right! The gate opens. The answer is lantern #3 and lantern #4.', 'total == target → return [left + 1, right + 1] = [3, 4]. (This problem counts positions from 1.)', 'Found after 5 comparisons for n = 6. O(n) time, O(1) space — beats the O(n) memory a hash map needs in Two Sum I.']]
  ];
  const verdicts = { intro: ['Ready at both ends', 'plain'], over: ['Too bright → Roo steps left', 'warn'], under: ['Too dim → Lumi steps right', 'cool'], found: ['Exactly 10 — gate opens!', 'ok'] };
  const steps = raw.map(([L, R, kind, dialog, nar]) => {
    const sum = nums[L] + nums[R];
    return {
      L, R, kind, dialog, nar: { kid: nar[0], builder: nar[1], expert: nar[2] },
      verdict: verdicts[kind][0], tone: verdicts[kind][1],
      meter: { text: nums[L] + ' + ' + nums[R] + ' = ' + sum, pct: Math.min(100, (sum / 20) * 100), mark: 50, markLabel: 'target 10' },
      watch: [['left', L, 'left'], ['right', R, 'right'], ['target', target, 'text'], ['numbers[left]', nums[L], 'left'], ['numbers[right]', nums[R], 'right'], ['total', sum, kind === 'found' ? 'ok' : 'text']],
      done: kind === 'found'
    };
  });
  return {
    id: 'two-sum-ii', pattern: 'Two Pointers', cast: 'tp', short: 'Lantern', visual: 'lanterns', items: nums, pitch: 106, tile: 88, width: 618,
    goal: 'Gate opens when two lanterns glow exactly 10', status: ['Gate locked', 'Gate open'],
    lines: { py: { intro: 2, over: 8, under: 10, found: 6 } },
    code: {
      py: [['def twoSum(numbers, target):', ''], ['    left, right = 0, len(numbers) - 1', ''], ['    while left < right:', ''], ['        total = numbers[left] + numbers[right]', ''], ['        if total == target:', ''], ['            return [left + 1, right + 1]', ''], ['        if total > target:', ''], ['            right -= 1', '    # too bright'], ['        else:', ''], ['            left += 1', '     # too dim'], ['    return []', '']],
      java: [['int[] twoSum(int[] numbers, int target) {', ''], ['    int left = 0, right = numbers.length - 1;', ''], ['    while (left < right) {', ''], ['        int total = numbers[left] + numbers[right];', ''], ['        if (total == target)', ''], ['            return new int[]{left + 1, right + 1};', ''], ['        if (total > target)', ''], ['            right--;', '   // too bright'], ['        else', ''], ['            left++;', '    // too dim'], ['    }', ''], ['    return new int[0];', ''], ['}', '']],
      cpp: [['vector<int> twoSum(vector<int>& numbers, int target) {', ''], ['    int left = 0, right = numbers.size() - 1;', ''], ['    while (left < right) {', ''], ['        int total = numbers[left] + numbers[right];', ''], ['        if (total == target)', ''], ['            return {left + 1, right + 1};', ''], ['        if (total > target)', ''], ['            right--;', '   // too bright'], ['        else', ''], ['            left++;', '    // too dim'], ['    }', ''], ['    return {};', ''], ['}', '']],
      js: [['function twoSum(numbers, target) {', ''], ['  let left = 0, right = numbers.length - 1;', ''], ['  while (left < right) {', ''], ['    const total = numbers[left] + numbers[right];', ''], ['    if (total === target)', ''], ['      return [left + 1, right + 1];', ''], ['    if (total > target)', ''], ['      right--;', '   // too bright'], ['    else', ''], ['      left++;', '    // too dim'], ['  }', ''], ['  return [];', ''], ['}', '']],
      go: [['func twoSum(numbers []int, target int) []int {', ''], ['    left, right := 0, len(numbers)-1', ''], ['    for left < right {', ''], ['        total := numbers[left] + numbers[right]', ''], ['        if total == target {', ''], ['            return []int{left + 1, right + 1}', ''], ['        } else if total > target {', ''], ['            right--', '   // too bright'], ['        } else {', ''], ['            left++', '    // too dim'], ['        }', ''], ['    }', ''], ['    return nil', ''], ['}', '']]
    },
    rules: [['Start one friend at each end', 'intro'], ['Exactly 10? Open the gate', 'found'], ['Too bright → Roo steps left', 'over'], ['Too dim → Lumi steps right', 'under']],
    complexity: [['O(n)', 'each step, one lantern leaves for good'], ['O(1)', 'two friends, no notebook']],
    quest: ['Night has fallen on the old rope bridge. Six lanterns hang in a row, already lined up from dimmest to brightest. The gate on the far side opens only when two lanterns shine together with a glow of exactly 10.', 'Lumi and Roo must find which two, and tell the gatekeeper their positions, counting from 1.'],
    example: ['numbers = [1, 3, 4, 6, 8, 11]   target = 10', 'answer  = [3, 4]   (4 + 6 = 10)'],
    hints: ['Old Hoot: “Look how the lanterns are lined up — dimmest to brightest. When things are already in order, what can you safely skip?”', '“If two lanterns shine too brightly together, which one is surely to blame? Could it ever be part of the answer?”', '“Put one friend at each end. Too bright → the bright end steps in. Too dim → the dim end steps in. Nobody ever walks back.”'],
    clues: ['the lanterns are sorted', 'we need a pair that hits a target', 'no notebook allowed (O(1) space)'],
    quizFb: ['Old Hoot: “That works for 6 lanterns. With 30,000 it’s about 450 million checks. The lanterns are sorted — can that save us work?”', 'Old Hoot: “Yes! Because the row is sorted, one look at the two ends tells you which lantern can never be in the answer.”', 'Old Hoot: “A window looks at neighbours next to each other. Our two lanterns might be far apart, like #1 and #6.”', 'Old Hoot: “Clever — that’s how plain Two Sum is solved. But the notebook grows with the bridge, and this gate allows no notebook: O(1) space.”'],
    steps
  };
}

// ---------- The Mirror Hallway (generated) ----------
function mirrorScene() {
  const s = ['t', 'a', 'c', 'o', ' ', 'c', 'a', 't'];
  const ok = (c) => /[a-z0-9]/i.test(c);
  const steps = [];
  let L = 0, R = s.length - 1, pairs = 0;
  const shown = (c) => (c === ' ' ? 'a space' : '“' + c + '”');
  steps.push({ L, R, kind: 'intro',
    dialog: [say('hoot', 'A hallway painted with letters: “taco cat”. If it reads the same from both ends, the mirror door opens.'), say('lumi', 'I’ll start at the first letter.'), say('roo', 'I’ll take the last one. Spaces and commas don’t count.')],
    nar: { kid: 'Lumi and Roo start at the two ends of the hallway and compare letters as they walk toward each other.', builder: 'left = 0, right = n − 1. Skip characters that aren’t letters or digits, compare lowercase letters, and move both inward on a match.', expert: 'Two converging indices, each character visited at most once ⇒ O(n) time and O(1) space — no reversed copy needed.' } });
  while (L < R) {
    if (!ok(s[L])) {
      steps.push({ L, R, kind: 'skipL', dialog: [say('lumi', 'Just ' + shown(s[L]) + ' here. It doesn’t count.'), say('hoot', 'Lumi steps over it.')],
        nar: { kid: 'Lumi is standing on ' + shown(s[L]) + '. It isn’t a letter, so Lumi steps past it.', builder: 's[left] is not alphanumeric → left += 1 (no comparison).', expert: 'Skipping keeps both indices monotone; total work stays O(n).' } });
      L++; continue;
    }
    if (!ok(s[R])) {
      steps.push({ L, R, kind: 'skipR', dialog: [say('roo', 'Just ' + shown(s[R]) + ' here. It doesn’t count.'), say('hoot', 'Roo steps over it.')],
        nar: { kid: 'Roo is standing on ' + shown(s[R]) + '. It isn’t a letter, so Roo steps past it without comparing.', builder: 's[right] is not alphanumeric → right -= 1 (no comparison).', expert: 'Skipping keeps both indices monotone; total work stays O(n).' } });
      R--; continue;
    }
    if (s[L].toLowerCase() !== s[R].toLowerCase()) {
      steps.push({ L, R, kind: 'mismatch', dialog: [say('lumi', 'I see ' + shown(s[L]) + '.'), say('roo', 'And I see ' + shown(s[R]) + '.'), say('hoot', 'They don’t match. Not a mirror.')],
        nar: { kid: 'The letters don’t match, so the hallway isn’t a mirror.', builder: 's[left] != s[right] → return False.', expert: 'First mismatch is a certificate: no palindrome.' } });
      break;
    }
    pairs++;
    steps.push({ L, R, kind: 'match', pairs, dialog: [say('lumi', 'I see ' + shown(s[L]) + '.'), say('roo', 'Me too — ' + shown(s[R]) + '! A match.'), say('hoot', 'Both of you, one step inward.')],
      nar: { kid: shown(s[L]) + ' and ' + shown(s[R]) + ' match, so both friends take one step inward.', builder: 's[left] == s[right] (' + shown(s[L]) + ') → left += 1, right -= 1.', expert: 'Invariant: s[0..left) mirrors s(right..n−1]. Each match extends it by one pair.' } });
    L++; R--;
  }
  steps.push({ L: Math.min(L, s.length - 1), R: Math.max(Math.min(L, s.length - 1), R), kind: 'found', pairs,
    dialog: [say('lumi', 'We’ve met in the middle!'), say('hoot', 'Every pair matched. The mirror door opens: it’s a palindrome.')],
    nar: { kid: 'They met in the middle and every pair matched. The hallway is a perfect mirror!', builder: 'left >= right → return True.', expert: pairs + ' comparisons for n = 8, O(1) extra space. Reversing a cleaned copy would cost O(n) memory.' } });
  let matched = 0;
  const T = { intro: ['Ready at both ends', 'plain'], skipL: ['Not a letter → Lumi skips', 'cool'], skipR: ['Not a letter → Roo skips', 'cool'], match: ['Match → both step in', 'warn'], mismatch: ['Mismatch → not a mirror', 'warn'], found: ['Mirror! Door opens', 'ok'] };
  steps.forEach((st) => {
    if (st.kind === 'match') matched = st.pairs;
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    st.matched = matched;
    const a = s[st.L] === ' ' ? '␣' : s[st.L], b = s[st.R] === ' ' ? '␣' : s[st.R];
    st.meter = { text: '‘' + a + '’ vs ‘' + b + '’', pct: (matched / 3) * 100, mark: 100, markLabel: 'pairs matched ' + matched + ' / 3' };
    st.watch = [['left', st.L, 'left'], ['right', st.R, 'right'], ['pairs', matched, 'text'], ['s[left]', '“' + a + '”', 'left'], ['s[right]', '“' + b + '”', 'right'], ['result', st.done ? 'True' : '…', st.done ? 'ok' : 'text']];
  });
  return {
    id: 'valid-palindrome', pattern: 'Two Pointers', cast: 'tp', short: 'Mirror', visual: 'letters', items: s, pitch: 78, tile: 64, tileH: 84, gap: 14, font: 34, width: 610,
    predictAlias: { skipL: 'skipR' },
    goal: 'The mirror door opens if the hallway reads the same both ways', status: ['Door shut', 'Door open'],
    lines: { py: { intro: 2, skipL: 5, skipR: 7, mismatch: 9, match: 11, found: 12 }, java: { intro: 2, skipL: 5, skipR: 6, mismatch: 8, match: 9, found: 11 }, cpp: { intro: 2, skipL: 4, skipR: 5, mismatch: 7, match: 8, found: 10 }, js: { intro: 2, skipL: 6, skipR: 7, mismatch: 8, match: 9, found: 11 }, go: { intro: 2, skipL: 5, skipR: 7, mismatch: 9, match: 11, found: 14 } },
    code: {
      py: [['def isPalindrome(s):', ''], ['    left, right = 0, len(s) - 1', ''], ['    while left < right:', ''], ['        if not s[left].isalnum():', ''], ['            left += 1', ''], ['        elif not s[right].isalnum():', ''], ['            right -= 1', '       # skip spaces'], ['        elif s[left].lower() != s[right].lower():', ''], ['            return False', ''], ['        else:', ''], ['            left, right = left + 1, right - 1', ''], ['    return True', '']],
      java: [['boolean isPalindrome(String s) {', ''], ['    int left = 0, right = s.length() - 1;', ''], ['    while (left < right) {', ''], ['        char a = s.charAt(left), b = s.charAt(right);', ''], ['        if (!Character.isLetterOrDigit(a)) left++;', ''], ['        else if (!Character.isLetterOrDigit(b)) right--;', ''], ['        else if (Character.toLowerCase(a)', ''], ['                 != Character.toLowerCase(b)) return false;', ''], ['        else { left++; right--; }', '  // a match'], ['    }', ''], ['    return true;', ''], ['}', '']],
      cpp: [['bool isPalindrome(string s) {', ''], ['    int left = 0, right = s.size() - 1;', ''], ['    while (left < right) {', ''], ['        if (!isalnum(s[left])) left++;', ''], ['        else if (!isalnum(s[right])) right--;', ''], ['        else if (tolower(s[left]) != tolower(s[right]))', ''], ['            return false;', ''], ['        else { left++; right--; }', '  // a match'], ['    }', ''], ['    return true;', ''], ['}', '']],
      js: [['function isPalindrome(s) {', ''], ['  let left = 0, right = s.length - 1;', ''], ['  const ok = (c) => /[a-z0-9]/i.test(c);', ''], ['  const lo = (c) => c.toLowerCase();', ''], ['  while (left < right) {', ''], ['    if (!ok(s[left])) left++;', ''], ['    else if (!ok(s[right])) right--;', ''], ['    else if (lo(s[left]) !== lo(s[right])) return false;', ''], ['    else { left++; right--; }', '  // a match'], ['  }', ''], ['  return true;', ''], ['}', '']],
      go: [['func isPalindrome(s string) bool {', ''], ['    left, right := 0, len(s)-1', ''], ['    for left < right {', ''], ['        if !isAlnum(s[left]) {', ''], ['            left++', ''], ['        } else if !isAlnum(s[right]) {', ''], ['            right--', ''], ['        } else if lower(s[left]) != lower(s[right]) {', ''], ['            return false', ''], ['        } else {', ''], ['            left++; right--', '  // a match'], ['        }', ''], ['    }', ''], ['    return true', ''], ['}', '  // isAlnum, lower: small helpers']]
    },
    rules: [['Start one friend at each end', 'intro'], ['Not a letter? Step over it', 'skipR'], ['Letters match → both step in', 'match'], ['Letters differ → not a mirror', 'mismatch'], ['Met in the middle → it’s a mirror', 'found']],
    complexity: [['O(n)', 'each letter is looked at once'], ['O(1)', 'no reversed copy of the hallway']],
    quest: ['A long hallway is painted with letters, spaces and the odd comma. Legend says the far door is a mirror: it opens only if the letters read the same from both ends.', 'Lumi and Roo must decide, without copying the whole hallway, whether it’s a true mirror.'],
    example: ['s = "taco cat"', 'answer = True   ("tacocat" reads the same both ways)'],
    hints: ['Old Hoot: “A mirror pairs the first letter with the last. Who should stand where?”', '“What should a friend do when they’re standing on a space?”', '“Compare, then both step inward. One mismatch and the door stays shut.”'],
    clues: ['compare first with last', 'ignore spaces and punctuation', 'no copies allowed'],
    quizFb: ['Old Hoot: “Reversing a cleaned copy works, but it doubles the memory. The friends can compare in place.”', 'Old Hoot: “Yes! Compare from both ends and walk inward — that’s Two Pointers again.”', 'Old Hoot: “A window watches neighbours; our pairs are far apart.”', 'Old Hoot: “No notebook needed: each letter’s partner is fixed by position.”'],
    steps
  };
}

// ---------- The Rain Barrel Builders (generated) ----------
function waterScene() {
  const h = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  const steps = [];
  let L = 0, R = h.length - 1, best = 0;
  steps.push({ L, R, kind: 'intro', area: 0, best: 0,
    dialog: [say('hoot', 'Nine planks of different heights. Pick two as the walls of a rain barrel — the wider and taller, the more water.'), say('lumi', 'I’ll start at the first plank.'), say('roo', 'I’ll take the last. Widest barrel first!')],
    nar: { kid: 'Two builders start at the two ends of a fence. The water in their barrel can only rise as high as the shorter plank.', builder: 'left = 0, right = n − 1, best = 0. Area = min(h[left], h[right]) × (right − left).', expert: 'Start at maximum width; every move trades one unit of width for a chance at more height.' } });
  while (L < R) {
    const m = Math.min(h[L], h[R]), w = R - L, area = m * w;
    const record = area > best;
    best = Math.max(best, area);
    const moveLeft = h[L] < h[R];
    const mover = moveLeft ? 'Lumi' : 'Roo';
    steps.push({ L, R, kind: moveLeft ? 'moveL' : 'moveR', area, best,
      dialog: [say('lumi', 'My plank is ' + h[L] + '.'), say('roo', 'Mine is ' + h[R] + '.'), say('hoot', 'Water rises to the shorter wall: ' + m + ' × ' + w + ' = ' + area + '.' + (record ? ' A new record!' : '') + ' ' + mover + ' has the shorter plank, so ' + mover + ' steps in.')],
      nar: { kid: 'The shorter plank is ' + m + ' and the barrel is ' + w + ' wide, so it holds ' + area + '. ' + mover + '’s plank is the short one, so ' + mover + ' steps inward to look for a taller one.',
        builder: 'area = min(' + h[L] + ', ' + h[R] + ') × ' + w + ' = ' + area + '; best = ' + best + '. ' + (moveLeft ? 'h[left] < h[right] → left += 1.' : 'h[right] ≤ h[left] → right -= 1.'),
        expert: 'Every narrower barrel that keeps the shorter wall (index ' + (moveLeft ? L : R) + ') holds at most ' + area + ', so that wall is dominated. Discard it: O(1) per step, O(n) total.' } });
    if (moveLeft) L++; else R--;
  }
  steps.push({ L, R, kind: 'found', area: 0, best,
    dialog: [say('lumi', 'We’ve bumped into each other!'), say('hoot', 'Then the search is over. The biggest barrel held ' + best + ' units of rain.')],
    nar: { kid: 'The builders met in the middle. The best barrel held ' + best + ' units of rain.', builder: 'left == right → return best = ' + best + '.', expert: 'n − 1 = 8 moves and O(1) space. Brute force would try all 36 pairs.' } });
  const T = { intro: ['Widest barrel first', 'plain'], moveL: ['Left wall shorter → Lumi steps in', 'warn'], moveR: ['Right wall shorter → Roo steps in', 'cool'], found: ['Best barrel: ' + best, 'ok'] };
  steps.forEach((st) => {
    st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = st.kind === 'found';
    const m = Math.min(h[st.L], h[st.R]), w = st.R - st.L;
    st.meter = { text: st.done ? 'best = ' + st.best : 'min(' + h[st.L] + ', ' + h[st.R] + ') × ' + w + ' = ' + m * w, pct: Math.min(100, ((st.done ? st.best : m * w) / 56) * 100), mark: (st.best / 56) * 100, markLabel: 'best so far ' + st.best };
    st.watch = [['left', st.L, 'left'], ['right', st.R, 'right'], ['width', w, 'text'], ['h[left]', h[st.L], 'left'], ['h[right]', h[st.R], 'right'], ['best', st.best, st.done ? 'ok' : 'text']];
  });
  return {
    id: 'container', pattern: 'Two Pointers', cast: 'tp', short: 'Rain Barrel', visual: 'planks', items: h, pitch: 70, tile: 40, width: 600, unit: 18, water: true,
    goal: 'The widest, tallest barrel holds the most rain', status: ['Measuring…', 'Record found'],
    lines: { py: { intro: 2, moveL: 8, moveR: 10, found: 11 }, java: { intro: 2, moveL: 8, moveR: 10, found: 12 }, cpp: { intro: 2, moveL: 8, moveR: 10, found: 12 }, js: { intro: 2, moveL: 8, moveR: 10, found: 12 }, go: { intro: 2, moveL: 8, moveR: 10, found: 13 } },
    code: {
      py: [['def maxArea(height):', ''], ['    left, right = 0, len(height) - 1', ''], ['    best = 0', ''], ['    while left < right:', ''], ['        h = min(height[left], height[right])', ''], ['        best = max(best, h * (right - left))', ''], ['        if height[left] < height[right]:', ''], ['            left += 1', '    # left wall is shorter'], ['        else:', ''], ['            right -= 1', '   # right wall is shorter'], ['    return best', '']],
      java: [['int maxArea(int[] height) {', ''], ['    int left = 0, right = height.length - 1;', ''], ['    int best = 0;', ''], ['    while (left < right) {', ''], ['        int h = Math.min(height[left], height[right]);', ''], ['        best = Math.max(best, h * (right - left));', ''], ['        if (height[left] < height[right])', ''], ['            left++;', '     // left wall is shorter'], ['        else', ''], ['            right--;', '    // right wall is shorter'], ['    }', ''], ['    return best;', ''], ['}', '']],
      cpp: [['int maxArea(vector<int>& height) {', ''], ['    int left = 0, right = height.size() - 1;', ''], ['    int best = 0;', ''], ['    while (left < right) {', ''], ['        int h = min(height[left], height[right]);', ''], ['        best = max(best, h * (right - left));', ''], ['        if (height[left] < height[right])', ''], ['            left++;', '     // left wall is shorter'], ['        else', ''], ['            right--;', '    // right wall is shorter'], ['    }', ''], ['    return best;', ''], ['}', '']],
      js: [['function maxArea(height) {', ''], ['  let left = 0, right = height.length - 1;', ''], ['  let best = 0;', ''], ['  while (left < right) {', ''], ['    const h = Math.min(height[left], height[right]);', ''], ['    best = Math.max(best, h * (right - left));', ''], ['    if (height[left] < height[right])', ''], ['      left++;', '     // left wall is shorter'], ['    else', ''], ['      right--;', '    // right wall is shorter'], ['  }', ''], ['  return best;', ''], ['}', '']],
      go: [['func maxArea(height []int) int {', ''], ['    left, right := 0, len(height)-1', ''], ['    best := 0', ''], ['    for left < right {', ''], ['        h := min(height[left], height[right])', ''], ['        best = max(best, h*(right-left))', ''], ['        if height[left] < height[right] {', ''], ['            left++', '   // left wall is shorter'], ['        } else {', ''], ['            right--', '  // right wall is shorter'], ['        }', ''], ['    }', ''], ['    return best', ''], ['}', '']]
    },
    rules: [['Start with the widest barrel', 'intro'], ['Left wall shorter → Lumi steps in', 'moveL'], ['Right wall shorter → Roo steps in', 'moveR'], ['Builders meet → report the best', 'found']],
    complexity: [['O(n)', 'each plank is dropped once'], ['O(1)', 'two builders and one record']],
    quest: ['After the storm, the village needs a rain barrel. Nine fence planks of different heights stand in a row. Any two can be the walls; water fills up to the shorter one.', 'Lumi and Roo must find the pair of planks that holds the most water.'],
    example: ['height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', 'answer = 49   (planks 8 and 7, width 7)'],
    hints: ['Old Hoot: “Which barrel is the widest one you can build? Start there.”', '“The water only rises to the shorter wall. Can keeping that wall ever help as the barrel gets narrower?”', '“Always move the builder at the shorter plank. The taller one might still be useful.”'],
    clues: ['two walls from a row', 'wider and taller is better', 'try to beat O(n²)'],
    quizFb: ['Old Hoot: “All 36 pairs works here, but with 100,000 planks it’s 5 billion pairs.”', 'Old Hoot: “Yes! Start widest, and always move the shorter wall — it can never do better.”', 'Old Hoot: “A window of neighbours misses the wide barrels, which are often the best.”', 'Old Hoot: “Remembering heights doesn’t tell you which wall to drop.”'],
    steps
  };
}

