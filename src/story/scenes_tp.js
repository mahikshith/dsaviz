// ---- Story engine: one scene frame, one cast per pattern, many problems ----
const LEVELS = [['kid', 'Kid'], ['builder', 'Builder'], ['expert', 'Expert']];
const LANGS = [['py', 'Python'], ['java', 'Java'], ['cpp', 'C++'], ['js', 'JS'], ['go', 'Go']];
const STORY_EXTRA = {
  max: { btnBg: '#C5F04A', btnFg: '#0A0A0A', activeBg: '#F5F5F7', activeFg: '#0A0A0B', scene: '#111114', sceneText: '#F5F5F7', sceneMuted: '#8E8E93', dead: '#1F1F23', deadInk: '#6E6E75', hue: 42, sat: 90, water: 'rgba(90,200,250,0.35)', waterTop: '#5AC8FA', path: '#5AC8FA', treeEdge: '#686872' },
  paper: { btnBg: '#1D1B18', btnFg: '#FFFDF8', activeBg: '#1D1B18', activeFg: '#FFFDF8', scene: '#1B1E26', sceneText: '#F3F0E8', sceneMuted: '#9DA2AE', dead: '#2A2E38', deadInk: '#6E7380', hue: 42, sat: 90, water: 'rgba(111,152,230,0.45)', waterTop: '#8FB0EA', path: '#8FB0EA', treeEdge: '#6B7386' },
  ink: { btnBg: '#F5A06E', btnFg: '#111317', activeBg: '#ECE9E2', activeFg: '#111317', scene: '#0B0D11', sceneText: '#F3F0E8', sceneMuted: '#8B909B', dead: '#1C1F26', deadInk: '#5A5F6A', hue: 42, sat: 92, water: 'rgba(111,152,230,0.4)', waterTop: '#6F98E6', path: '#8FB0EA', treeEdge: '#626A7C' },
  field: { btnBg: '#9FE870', btnFg: '#0C110B', activeBg: '#9FE870', activeFg: '#0C110B', scene: '#070B06', sceneText: '#C9EBB4', sceneMuted: '#6E8A60', dead: '#131B11', deadInk: '#435A38', hue: 95, sat: 70, water: 'rgba(159,232,112,0.28)', waterTop: '#9FE870', path: '#6FD3E0', treeEdge: '#4F7343' }
};
const say = (who, text) => [who, text];
// Newer patterns register themselves from their own scenes_*.js file, so adding one never touches tail.js or comp.js:
//   SCENE_REGISTRY.push(myScene);                 a function returning the scene
//   PATTERN_KITS['Binary Search'] = { right, spot, ask, quiz: [[title, story] x4] };
//   STORY_CAST.guesser = { name: 'Guesser', initial: 'G', color: 'left', radius: '999px' };   color is a theme key
//   SCENE_INPUT['my-id'] = { ... make(input) };    optional: lets learners re-run the story on their own values (see practice.js)
const SCENE_REGISTRY = [];
const PATTERN_KITS = {};
const SCENE_INPUT = {};
const STORY_CAST = {};

// ---------- The Lantern Bridge (hand-written) ----------
function lanternScene() {
  const nums = [1, 3, 4, 6, 8, 11], target = 10;
  const raw = [
    [0, 5, 'intro', [say('narr', 'Six lanterns stand in a row, dimmest to brightest. The gate opens for two lanterns whose glow adds up to exactly 10.'), say('lmark', 'I will stand at the dimmest end.'), say('rmark', 'I will take the brightest end. We will walk inward until we find the pair.')],
      ['Two markers start at opposite ends of a row of lanterns. They walk toward each other until their two lanterns add up to exactly 10.', 'The list numbers is sorted from small to big. Set left = 0 and right = n − 1, the first and last spots (n is how many lanterns there are). Each step, add numbers[left] and numbers[right]. Then move one marker inward.', 'The list is sorted. So moving left up can only raise the sum, and moving right down can only lower it. This stays true: if an answer exists, it sits between left and right. Every step shrinks that gap by one.']],
    [0, 5, 'over', [say('lmark', 'Mine glows 1.'), say('rmark', 'Mine glows 11. Together that is 12. Too bright!'), say('narr', 'The 11 is too bright, even with the dimmest lantern. It can never be in the answer, so the right marker steps left.')],
      ['1 + 11 = 12. That is too bright. To get dimmer, the right marker must move to a dimmer lantern, so it steps left.', 'total is 12, which is more than target. Any pair with 11 adds up to at least 1 + 11 = 12, so spot 5 can never be in the answer. So right -= 1 (move the right marker one spot left).', 'The left lantern is the dimmest one still in play. So every partner for the right lantern gives at least 12, which is over the target t. Drop the right lantern at once, in O(1) time (a fixed amount of work).']],
    [0, 4, 'under', [say('rmark', 'Now I hold 8.'), say('lmark', '1 + 8 = 9. Too dim now.'), say('narr', 'Even 8, the brightest partner left, is not enough for the 1. The 1 is out, so the left marker steps right.')],
      ['1 + 8 = 9. Too dim. To get brighter, the left marker must move to a brighter lantern, so it steps right.', 'total = 9 is less than target. 8 is the biggest partner left for 1, and it is still too small. So 1 is out: left += 1 (move the left marker one spot right).', 'The right lantern is the brightest one still in play. So every partner for the left lantern gives at most 9, which is under the target t. Drop the left lantern.']],
    [1, 4, 'over', [say('lmark', 'I hold 3.'), say('rmark', '3 + 8 = 11. A little too bright, so I step left again.'), say('narr', 'The rule is the same as before. Too bright means the bright end moves in.')],
      ['3 + 8 = 11. Still a bit too bright, so the right marker steps left again.', '11 is more than 10, so right -= 1 (move the right marker one spot left). No marker ever walks back. Every lantern we leave is ruled out for good.', 'Same idea as step 2. Each lantern is dropped at most once, so there are at most n − 1 moves. That is O(n) time: the work grows in step with the number of lanterns.']],
    [1, 3, 'under', [say('rmark', 'Now I hold 6.'), say('lmark', '3 + 6 = 9. Only one short!'), say('narr', 'Too dim means the dim end moves up. That is the left marker.')],
      ['3 + 6 = 9. That is one too dim. The left marker steps right.', '9 is less than 10, so left += 1 (the left marker steps right). Only lanterns #3 and #4 are left, so there is one pair to try.', 'Only two lanterns are left in play. Either this pair hits the target t, or no answer exists. The problem promises that one does.']],
    [2, 3, 'found', [say('lmark', 'I hold 4!'), say('rmark', '4 + 6 = 10!'), say('narr', 'The gate swings open. Lanterns #3 and #4 are the answer: [3, 4].')],
      ['4 + 6 = 10. Exactly right! The gate opens. The answer is lantern #3 and lantern #4.', 'total equals target, so return [left + 1, right + 1] = [3, 4]. (This problem counts places from 1, not 0.)', 'Found after 5 checks for n = 6 lanterns. It takes O(n) time and O(1) space, which is a fixed bit of memory. A hash map (a lookup notebook) would need O(n) memory.']]
  ];
  const verdicts = { intro: ['Ready at both ends', 'plain'], over: ['Too bright → the right marker steps left', 'warn'], under: ['Too dim → the left marker steps right', 'cool'], found: ['Exactly 10 — gate opens!', 'ok'] };
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
    rules: [['Start one marker at each end', 'intro'], ['Exactly 10? Open the gate', 'found'], ['Too bright → the right marker steps left', 'over'], ['Too dim → the left marker steps right', 'under']],
    complexity: [['O(n)', 'each step, one lantern leaves for good'], ['O(1)', 'two markers, no notebook']],
    quest: ['Night has fallen on the old rope bridge. Six lanterns hang in a row, from dimmest to brightest. The gate on the far side opens only when two lanterns shine together with a glow of exactly 10.', 'The two markers must find which two lanterns. They tell the gatekeeper their places, counting from 1.'],
    example: ['numbers = [1, 3, 4, 6, 8, 11]   target = 10', 'answer  = [3, 4]   (4 + 6 = 10)'],
    hints: ['“Look at how the lanterns are lined up, dimmest to brightest. When things are in order, what can you skip?”', '“Two lanterns shine too brightly together. Which one is to blame? Could it ever be part of the answer?”', '“Put one marker at each end. If the glow is too bright, the bright end steps in. If it is too dim, the dim end steps in. No marker walks back.”'],
    clues: ['the lanterns are sorted', 'we need a pair that hits a target', 'no notebook allowed (O(1) space means a fixed, tiny amount of memory)'],
    quizFb: ['“That works for 6 lanterns. With 30,000 lanterns it is about 450 million checks. The lanterns are sorted. Can that save work?”', '“Yes! The row is sorted. One look at the two ends shows a lantern that can never be in the answer.”', '“A window is a short stretch of lanterns side by side. Our two lanterns might be far apart, like #1 and #6.”', '“Clever. That is how the plain Two Sum problem is solved. But the notebook grows with the bridge, and this gate allows no notebook.”'],
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
    dialog: [say('narr', 'A hallway is painted with the letters “taco cat”. If it reads the same from both ends, the mirror door opens.'), say('lmark', 'I will start at the first letter.'), say('rmark', 'I will take the last one. Spaces and commas do not count.')],
    nar: { kid: 'The two markers start at the two ends of the hallway. They compare letters as they walk toward each other.', builder: 'left = 0, right = n − 1: the first and last spots (n is how many characters there are). Skip anything that is not a letter or digit. Compare in lowercase. On a match, move both markers inward.', expert: 'Two markers move toward each other, and each character is seen at most once. That is O(n) time, so the work grows in step with the text length. It is also O(1) space, so there is no reversed copy.' } });
  while (L < R) {
    if (!ok(s[L])) {
      steps.push({ L, R, kind: 'skipL', dialog: [say('lmark', 'I am on ' + shown(s[L]) + '. It does not count.'), say('narr', 'The left marker steps over it.')],
        nar: { kid: 'The left marker is on ' + shown(s[L]) + '. It is not a letter, so the left marker steps past it.', builder: 'The character at s[left] is not a letter or digit, so left += 1 (the marker steps right without comparing).', expert: 'Skipping never moves a marker back. So the total work stays O(n), which grows in step with the text length.' } });
      L++; continue;
    }
    if (!ok(s[R])) {
      steps.push({ L, R, kind: 'skipR', dialog: [say('rmark', 'I am on ' + shown(s[R]) + '. It does not count.'), say('narr', 'The right marker steps over it.')],
        nar: { kid: 'The right marker is on ' + shown(s[R]) + '. It is not a letter, so the right marker steps past it without comparing.', builder: 'The character at s[right] is not a letter or digit, so right -= 1 (the marker steps left without comparing).', expert: 'Skipping never moves a marker back. So the total work stays O(n), which grows in step with the text length.' } });
      R--; continue;
    }
    if (s[L].toLowerCase() !== s[R].toLowerCase()) {
      steps.push({ L, R, kind: 'mismatch', dialog: [say('lmark', 'I see ' + shown(s[L]) + '.'), say('rmark', 'And I see ' + shown(s[R]) + '.'), say('narr', 'They do not match. It is not a mirror.')],
        nar: { kid: 'The letters do not match, so the hallway is not a mirror.', builder: 'The characters at s[left] and s[right] differ, so return False.', expert: 'One mismatch is enough proof that the text is not a palindrome.' } });
      break;
    }
    pairs++;
    steps.push({ L, R, kind: 'match', pairs, dialog: [say('lmark', 'I see ' + shown(s[L]) + '.'), say('rmark', 'Me too: ' + shown(s[R]) + '! A match.'), say('narr', 'Both markers take one step inward.')],
      nar: { kid: shown(s[L]) + ' and ' + shown(s[R]) + ' match, so both markers take one step inward.', builder: 'The characters at s[left] and s[right] are equal (' + shown(s[L]) + '), so left += 1 and right -= 1.', expert: 'This stays true: everything left of the left marker mirrors everything right of the right marker. Each match adds one more pair.' } });
    L++; R--;
  }
  steps.push({ L: Math.min(L, s.length - 1), R: Math.max(Math.min(L, s.length - 1), R), kind: 'found', pairs,
    dialog: [say('lmark', 'We met in the middle!'), say('narr', 'Every pair matched. The mirror door opens. A word that reads the same both ways is called a palindrome.')],
    nar: { kid: 'They met in the middle and every pair matched. The hallway is a perfect mirror!', builder: 'left has reached right, so return True.', expert: pairs + ' comparisons for n = 8 characters, with O(1) extra space (no new copy). Reversing a cleaned copy would cost O(n) memory.' } });
  let matched = 0;
  const T = { intro: ['Ready at both ends', 'plain'], skipL: ['Not a letter → the left marker skips', 'cool'], skipR: ['Not a letter → the right marker skips', 'cool'], match: ['Match → both step in', 'warn'], mismatch: ['Mismatch → not a mirror', 'warn'], found: ['Mirror! Door opens', 'ok'] };
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
    rules: [['Start one marker at each end', 'intro'], ['Not a letter? Step over it', 'skipR'], ['Letters match → both step in', 'match'], ['Letters differ → not a mirror', 'mismatch'], ['Met in the middle → it’s a mirror', 'found']],
    complexity: [['O(n)', 'each letter is looked at once'], ['O(1)', 'no reversed copy of the hallway']],
    quest: ['A long hallway is painted with letters, spaces and a few commas. Legend says the far door is a mirror. It opens only if the letters read the same from both ends.', 'The two markers must decide if it is a true mirror, without copying the whole hallway.'],
    example: ['s = "taco cat"', 'answer = True   ("tacocat" reads the same both ways)'],
    hints: ['“A mirror pairs the first letter with the last. Who should stand where?”', '“What should a marker do when it stands on a space?”', '“Compare, then both step inward. One mismatch keeps the door shut.”'],
    clues: ['compare first with last', 'ignore spaces and punctuation', 'no copies allowed'],
    quizFb: ['“Reversing a cleaned copy works, but it doubles the memory. The markers can compare in place.”', '“Yes! Compare from both ends and walk inward. That is the same two-marker idea as before.”', '“A window is a short stretch of letters side by side. Our pairs are far apart.”', '“No notebook is needed. Each letter’s partner is fixed by its place.”'],
    steps
  };
}

// ---------- The Rain Barrel Builders (generated) ----------
function waterScene() {
  const h = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  const steps = [];
  let L = 0, R = h.length - 1, best = 0;
  steps.push({ L, R, kind: 'intro', area: 0, best: 0,
    dialog: [say('narr', 'Nine planks stand at different heights. Pick two as the walls of a rain barrel. The wider and taller it is, the more water it holds.'), say('lmark', 'I will start at the first plank.'), say('rmark', 'I will take the last plank. Widest barrel first!')],
    nar: { kid: 'Two markers start at the two ends of a fence. The water in their barrel can only rise as high as the shorter plank.', builder: 'left = 0, right = n − 1, best = 0 (n is how many planks there are; best is the biggest area so far). Area = the shorter of h[left] and h[right], times the width (right − left). Here h[left] is the height of the left plank.', expert: 'Start at maximum width; every move trades one unit of width for a chance at more height.' } });
  while (L < R) {
    const m = Math.min(h[L], h[R]), w = R - L, area = m * w;
    const record = area > best;
    best = Math.max(best, area);
    const moveLeft = h[L] < h[R];
    const mover = moveLeft ? 'left marker' : 'right marker';
    steps.push({ L, R, kind: moveLeft ? 'moveL' : 'moveR', area, best,
      dialog: [say('lmark', 'My plank is ' + h[L] + '.'), say('rmark', 'Mine is ' + h[R] + '.'), say('narr', 'Water rises to the shorter wall: ' + m + ' × ' + w + ' = ' + area + '.' + (record ? ' A new record!' : '') + ' The ' + mover + ' has the shorter plank, so it steps in.')],
      nar: { kid: 'The shorter plank is ' + m + ' and the barrel is ' + w + ' wide, so it holds ' + area + '. The ' + mover + ' has the short plank, so it steps inward to look for a taller one.',
        builder: 'area = min(' + h[L] + ', ' + h[R] + ') × ' + w + ' = ' + area + '; best = ' + best + '. ' + (moveLeft ? 'The left plank is shorter, so left += 1.' : 'The right plank is shorter or equal, so right -= 1.'),
        expert: 'Any narrower barrel that keeps the shorter wall (spot ' + (moveLeft ? L : R) + ') holds at most ' + area + '. So that wall can never win, and we drop it. Each step costs O(1), a fixed amount of work, and the total is O(n).' } });
    if (moveLeft) L++; else R--;
  }
  steps.push({ L, R, kind: 'found', area: 0, best,
    dialog: [say('lmark', 'We bumped into each other!'), say('narr', 'The search is over. The biggest barrel held ' + best + ' units of rain.')],
    nar: { kid: 'The markers met in the middle. The best barrel held ' + best + ' units of rain.', builder: 'left == right (the markers meet), so return best = ' + best + '.', expert: 'n − 1 = 8 moves and O(1) space. Brute force (trying every pair) would test all 36 pairs.' } });
  const T = { intro: ['Widest barrel first', 'plain'], moveL: ['Left wall shorter → the left marker steps in', 'warn'], moveR: ['Right wall shorter → the right marker steps in', 'cool'], found: ['Best barrel: ' + best, 'ok'] };
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
    rules: [['Start with the widest barrel', 'intro'], ['Left wall shorter → the left marker steps in', 'moveL'], ['Right wall shorter → the right marker steps in', 'moveR'], ['The markers meet → report the best', 'found']],
    complexity: [['O(n)', 'each plank is dropped once'], ['O(1)', 'two markers and one record']],
    quest: ['After the storm, the village needs a rain barrel. Nine fence planks of different heights stand in a row. Any two can be the walls. Water fills up to the shorter one.', 'The two markers must find the pair of planks that holds the most water.'],
    example: ['height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', 'answer = 49   (planks 8 and 7, width 7)'],
    hints: ['“Which barrel is the widest one you can build? Start there.”', '“The water only rises to the shorter wall. As the barrel gets narrower, can keeping that wall ever help?”', '“Always move the marker at the shorter plank. The taller one might still be useful.”'],
    clues: ['two walls from a row', 'wider and taller is better', 'try to beat O(n²)'],
    quizFb: ['“Trying all 36 pairs works here. With 100,000 planks it is 5 billion pairs.”', '“Yes! Start widest, and always move the shorter wall. It can never do better.”', '“A window is a short stretch of planks side by side. It misses the wide barrels, which are often the best.”', '“Remembering heights does not tell you which wall to drop.”'],
    steps
  };
}


// ---------- Your own input: the same three stories on new values (see practice.js) ----------
function lanternRun(input) {
  const v = input || SCENE_INPUT['two-sum-ii'].default;
  const nums = v.nums.slice(), T = v.target, n = nums.length;
  const steps = [];
  let L = 0, R = n - 1, checks = 0;
  steps.push(runStep('intro', { L, R }, [say('narr', n + ' lanterns, dimmest to brightest. Find two that glow ' + T + ' together.'), say('lmark', 'I will take the dimmest end.'), say('rmark', 'And I will take the brightest.')],
    'The two markers start at the two ends. They look for two lanterns that add up to ' + T + '.', 'left = 0, right = ' + (n - 1) + ' (the first and last spots).', 'The row is sorted, so one look at the two ends rules out one lantern each step.'));
  while (L < R) {
    const a = nums[L], b = nums[R], s = a + b;
    checks++;
    if (s === T) {
      steps.push(runStep('found', { L, R, done: true }, [say('lmark', a + ' + ' + b + ' = ' + T + '!'), say('narr', 'The gate opens. Lanterns #' + (L + 1) + ' and #' + (R + 1) + '.')],
        a + ' + ' + b + ' = ' + T + '. The gate opens. The answer is lantern #' + (L + 1) + ' and lantern #' + (R + 1) + '.', 'total equals target, so return [' + (L + 1) + ', ' + (R + 1) + '] (this problem counts places from 1).', 'Found after ' + checks + ' checks for ' + n + ' lanterns. O(n) time means the work grows in step with the number of lanterns. O(1) space means a small fixed amount of memory.'));
      break;
    }
    if (s > T) {
      steps.push(runStep('over', { L, R }, [say('lmark', a + ' + ' + b + ' = ' + s + '.'), say('rmark', 'Too bright. I step left.')],
        a + ' + ' + b + ' = ' + s + '. That is more than ' + T + ', so the right marker steps left to a dimmer lantern.', 'total = ' + s + ' is more than ' + T + ', so right -= 1 (the right marker moves one spot left).', 'Even the dimmest lantern left makes ' + s + ' with ' + b + ', so ' + b + ' is out for good.'));
      R--;
    } else {
      steps.push(runStep('under', { L, R }, [say('rmark', a + ' + ' + b + ' = ' + s + '.'), say('lmark', 'Too dim. I step right.')],
        a + ' + ' + b + ' = ' + s + '. That is less than ' + T + ', so the left marker steps right to a brighter lantern.', 'total = ' + s + ' is less than ' + T + ', so left += 1 (the left marker moves one spot right).', 'Even the brightest lantern left makes only ' + s + ' with ' + a + ', so ' + a + ' is out for good.'));
      L++;
    }
  }
  const last = steps[steps.length - 1];
  const ans = last.kind === 'found' ? [last.L + 1, last.R + 1] : [];
  runFinish(steps, { intro: ['Ready at both ends', 'plain'], over: ['Too bright → the right marker steps left', 'warn'], under: ['Too dim → the left marker steps right', 'cool'], found: ['Exactly ' + T + ', the gate opens', 'ok'] }, (st) => {
    const sum = nums[st.L] + nums[st.R];
    st.meter = { text: nums[st.L] + ' + ' + nums[st.R] + ' = ' + sum, pct: Math.min(100, (sum / (2 * T)) * 100), mark: 50, markLabel: 'target ' + T };
    st.watch = [['left', st.L, 'left'], ['right', st.R, 'right'], ['target', T, 'text'], ['numbers[left]', nums[st.L], 'left'], ['numbers[right]', nums[st.R], 'right'], ['total', sum, st.done ? 'ok' : 'text']];
  });
  return runScene('two-sum-ii', Object.assign(fitRow({ pitch: 106, tile: 88 }, n, 640), {
    items: nums, glow: Math.min(1, 11 / Math.max.apply(null, nums)),
    goal: 'Gate opens when two lanterns glow exactly ' + T,
    rules: [['Start one marker at each end', 'intro'], ['Exactly ' + T + '? Open the gate', 'found'], ['Too bright → the right marker steps left', 'over'], ['Too dim → the left marker steps right', 'under']],
    example: ['numbers = ' + showList(nums) + '   target = ' + T, 'answer  = ' + showList(ans)],
    answer: ans, input: { nums, target: T }
  }), steps);
}
SCENE_INPUT['two-sum-ii'] = {
  hint: 'a list in brackets from smallest to biggest, then the target sum', example: '[1, 3, 4, 6, 8, 11], 10',
  default: { nums: [1, 3, 4, 6, 8, 11], target: 10 },
  presets: [['Story example', () => ({ nums: [1, 3, 4, 6, 8, 11], target: 10 })], ['Random', () => randOnePair(true, rint(4, 8), 1, 20)], ['Smallest', () => ({ nums: [1, 2, 3], target: 5 })], ['Repeats', () => ({ nums: [1, 3, 3, 7, 9], target: 6 })]],
  random: () => randOnePair(true, rint(3, 9), 1, 30),
  parse: parseNumsTarget, show: showNumsTarget,
  check: (v) => checkCount(v.nums, 3, 9, 'lanterns') || checkRange(v.nums, 1, 30, 'Lantern glows') || checkSorted(v.nums) || checkOnePair(v.nums, v.target),
  make: lanternRun
};

function mirrorRun(input) {
  const text = (input || SCENE_INPUT['valid-palindrome'].default).s;
  const s = text.split(''), n = s.length;
  const ok = (c) => /[a-z0-9]/i.test(c), lo = (c) => c.toLowerCase();
  const shown = (c) => (c === ' ' ? 'a space' : '“' + c + '”');
  const pairsAll = Math.max(1, Math.floor(s.filter(ok).length / 2));
  const steps = [];
  let L = 0, R = n - 1, pairs = 0, answer = true;
  steps.push(runStep('intro', { L, R }, [say('narr', 'The hallway reads “' + text + '”. Does it read the same both ways?'), say('lmark', 'I will start at the first letter.'), say('rmark', 'And I will take the last.')],
    'The two markers start at the two ends. They compare letters as they walk toward each other.', 'left = 0, right = ' + (n - 1) + ' (the first and last spots). Skip anything that is not a letter or digit.', 'Each character is looked at once. That is O(n) time: the work grows in step with the text length, n. O(1) space means a small fixed amount of memory.'));
  while (L < R) {
    if (!ok(s[L])) {
      steps.push(runStep('skipL', { L, R }, [say('lmark', 'I am on ' + shown(s[L]) + '. It does not count.')], 'The left marker stands on ' + shown(s[L]) + '. It is not a letter, so the left marker steps past it.', 'The character at s[left] is not a letter or digit, so left += 1 (the marker steps right without comparing).', 'A marker never moves back, so the work stays O(n), which grows in step with the text length.'));
      L++; continue;
    }
    if (!ok(s[R])) {
      steps.push(runStep('skipR', { L, R }, [say('rmark', 'I am on ' + shown(s[R]) + '. It does not count.')], 'The right marker stands on ' + shown(s[R]) + '. It is not a letter, so the right marker steps past it.', 'The character at s[right] is not a letter or digit, so right -= 1 (the marker steps left without comparing).', 'A marker never moves back, so the work stays O(n), which grows in step with the text length.'));
      R--; continue;
    }
    if (lo(s[L]) !== lo(s[R])) {
      answer = false;
      steps.push(runStep('mismatch', { L, R, done: true }, [say('lmark', 'I see ' + shown(s[L]) + '.'), say('rmark', 'I see ' + shown(s[R]) + '.'), say('narr', 'They differ. Not a mirror.')],
        shown(s[L]) + ' and ' + shown(s[R]) + ' differ. The hallway is not a mirror.', 'The characters at left and right differ, so return False.', 'One mismatch is enough proof. The rest is never read.'));
      break;
    }
    pairs++;
    steps.push(runStep('match', { L, R, pairs }, [say('lmark', 'I see ' + shown(s[L]) + '.'), say('rmark', 'Me too. A match!')],
      shown(s[L]) + ' and ' + shown(s[R]) + ' match, so both markers step inward.', 'The characters at left and right are equal, so left += 1 and right -= 1 (both markers step inward).', 'Everything outside the two markers already mirrors.'));
    L++; R--;
  }
  if (answer) {
    const m = Math.min(L, n - 1);
    steps.push(runStep('found', { L: m, R: Math.max(m, R), pairs, done: true }, [say('lmark', 'We met in the middle!'), say('narr', 'Every pair matched. It is a mirror.')],
      'They met in the middle and every pair matched. The hallway is a mirror!', 'left has reached right, so return True.', pairs + (pairs === 1 ? ' comparison' : ' comparisons') + ', and O(1) extra space: no new copy of the text.'));
  }
  let matched = 0;
  runFinish(steps, { intro: ['Ready at both ends', 'plain'], skipL: ['Not a letter → the left marker skips', 'cool'], skipR: ['Not a letter → the right marker skips', 'cool'], match: ['Match → both step in', 'warn'], mismatch: ['Mismatch → not a mirror', 'warn'], found: ['Mirror! Door opens', 'ok'] }, (st) => {
    if (st.kind === 'match') matched = st.pairs;
    st.cells = s.map((c, i) => {
      if (st.kind === 'found') return ok(c) ? 'ok' : 'out';
      if (st.kind === 'mismatch' && (i === st.L || i === st.R)) return 'hit';
      if (i === st.L || i === st.R) return st.kind === 'intro' ? 'in' : 'cur';
      if (i < st.L || i > st.R) return ok(c) ? 'ok' : 'out';
      return 'in';
    });
    const a = s[st.L] === ' ' ? '␣' : s[st.L], b = s[st.R] === ' ' ? '␣' : s[st.R];
    st.meter = { text: '‘' + a + '’ vs ‘' + b + '’', pct: Math.min(100, (matched / pairsAll) * 100), mark: 100, markLabel: 'pairs matched ' + matched + ' / ' + pairsAll };
    st.watch = [['left', st.L, 'left'], ['right', st.R, 'right'], ['pairs', matched, 'text'], ['s[left]', '“' + a + '”', 'left'], ['s[right]', '“' + b + '”', 'right'], ['result', st.kind === 'found' ? 'True' : st.kind === 'mismatch' ? 'False' : '…', st.done ? 'ok' : 'text']];
  });
  return runScene('valid-palindrome', Object.assign(fitRow({ pitch: 78, tile: 64, tileH: 84, font: 34 }, n, 600), {
    items: s.map((c) => (c === ' ' ? '␣' : c)),
    status: ['Door shut', answer ? 'Door open' : 'Not a mirror'],
    example: ['s = "' + text + '"', 'answer = ' + (answer ? 'True' : 'False')],
    answer, input: { s: text }
  }), steps);
}
function randMirror() {
  const abc = 'abcdeilmnorst'.split('');
  const half = Array.from({ length: rint(2, 4) }, () => rpick(abc));
  const mid = Math.random() < 0.5 ? [rpick(abc)] : [];
  const w = half.concat(mid, half.slice().reverse());
  if (Math.random() < 0.4) w[rint(0, w.length - 1)] = rpick(abc);
  if (Math.random() < 0.4 && w.length < 9) w.splice(rint(1, w.length - 1), 0, ' ');
  return { s: w.join('') };
}
SCENE_INPUT['valid-palindrome'] = {
  hint: 'a word or a short sentence', example: 'taco cat',
  default: { s: 'taco cat' },
  presets: [['Story example', () => ({ s: 'taco cat' })], ['Random', randMirror], ['Not a mirror', () => ({ s: 'rocket' })], ['Punctuation', () => ({ s: 'No, on!' })]],
  random: randMirror,
  parse: parseText, show: (v) => v.s,
  check: (v) => (v.s.length < 3 || v.s.length > 9 ? 'Use 3 to 9 characters, so every tile stays readable. You have ' + v.s.length + '.'
    : !/^[a-z0-9 ,.!?'-]+$/i.test(v.s) ? 'Use letters, digits, spaces and simple punctuation like , . ! or ?'
    : v.s.replace(/[^a-z0-9]/gi, '').length < 2 ? 'Use at least two letters or digits.' : ''),
  make: mirrorRun
};

function waterRun(input) {
  const h = (input || SCENE_INPUT.container.default).nums.slice(), n = h.length;
  const bound = Math.max(1, (n - 1) * Math.max.apply(null, h));
  const steps = [];
  let L = 0, R = n - 1, best = 0, moves = 0;
  steps.push(runStep('intro', { L, R, best: 0 }, [say('narr', n + ' planks. Pick two walls. Water fills up to the shorter one.'), say('lmark', 'I will take the first plank.'), say('rmark', 'I will take the last plank. Widest barrel first!')],
    'The two markers start at the two ends: the widest barrel.', 'left = 0, right = ' + (n - 1) + ' (the first and last spots), best = 0 (the most water found so far).', 'Start widest. Each move gives up one unit of width for a chance at a taller wall.'));
  while (L < R) {
    const m = Math.min(h[L], h[R]), w = R - L, area = m * w, record = area > best;
    best = Math.max(best, area);
    moves++;
    const left = h[L] < h[R];
    const who = left ? 'The left marker' : 'The right marker', plank = left ? h[L] : h[R];
    steps.push(runStep(left ? 'moveL' : 'moveR', { L, R, best }, [say('narr', m + ' × ' + w + ' = ' + area + '.' + (record ? ' A new best!' : '')), say(left ? 'lmark' : 'rmark', 'My plank is ' + (left ? 'the shorter one' : 'not taller') + '. I step in.')],
      'The barrel holds ' + m + ' × ' + w + ' = ' + area + '. ' + who + '’s plank (' + plank + ') is ' + (left ? 'shorter' : 'not taller') + ', so ' + who.toLowerCase() + ' steps in.',
      'area = min(' + h[L] + ', ' + h[R] + ') × ' + w + ' = ' + area + ' (the shorter wall times the width); best = ' + best + '. ' + (left ? 'left += 1' : 'right -= 1') + ' (that marker steps in).',
      'Any narrower barrel that keeps the ' + plank + ' wall holds at most ' + area + ', so that wall is done.'));
    if (left) L++; else R--;
  }
  steps.push(runStep('found', { L, R, best, done: true }, [say('lmark', 'We bumped into each other!'), say('narr', 'The best barrel held ' + best + '.')],
    'The markers met. The best barrel holds ' + best + ' units of rain.', 'left equals right (the markers met), so return best = ' + best + '.', moves + ' moves. O(1) space means a small fixed amount of memory. Trying every pair would take ' + (n * (n - 1)) / 2 + ' checks.'));
  runFinish(steps, { intro: ['Widest barrel first', 'plain'], moveL: ['Left wall shorter → the left marker steps in', 'warn'], moveR: ['Right wall shorter → the right marker steps in', 'cool'], found: ['Best barrel: ' + best, 'ok'] }, (st) => {
    const m = Math.min(h[st.L], h[st.R]), w = st.R - st.L;
    st.meter = { text: st.done ? 'best = ' + st.best : 'min(' + h[st.L] + ', ' + h[st.R] + ') × ' + w + ' = ' + m * w, pct: Math.min(100, ((st.done ? st.best : m * w) / bound) * 100), mark: (st.best / bound) * 100, markLabel: 'best so far ' + st.best };
    st.watch = [['left', st.L, 'left'], ['right', st.R, 'right'], ['width', w, 'text'], ['h[left]', h[st.L], 'left'], ['h[right]', h[st.R], 'right'], ['best', st.best, st.done ? 'ok' : 'text']];
  });
  return runScene('container', Object.assign(fitPlanks({ pitch: 70, tile: 40, unit: 18 }, h, 600), {
    items: h, status: ['Measuring…', 'Best: ' + best],
    example: ['height = ' + showList(h), 'answer = ' + best],
    answer: best, input: { nums: h }
  }), steps);
}
SCENE_INPUT.container = {
  hint: 'plank heights from 1 to 9', example: '1, 8, 6, 2, 5, 4, 8, 3, 7',
  default: { nums: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
  presets: [['Story example', () => ({ nums: [1, 8, 6, 2, 5, 4, 8, 3, 7] })], ['Random', () => ({ nums: rlist(rint(4, 9), 1, 9) })], ['Sorted', () => ({ nums: [1, 2, 3, 4, 5, 6, 7] })], ['All equal', () => ({ nums: [5, 5, 5, 5] })]],
  random: () => ({ nums: rlist(rint(3, 9), 1, 9) }),
  parse: (t) => ({ nums: parseNums(t) }), show: (v) => v.nums.join(', '),
  check: (v) => checkCount(v.nums, 3, 9, 'planks') || checkRange(v.nums, 1, 9, 'Heights'),
  make: waterRun
};
