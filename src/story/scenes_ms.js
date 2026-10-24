// ---------- Monotonic stack: Pip keeps a pile of planks that only get taller toward the top ----------

// The Biggest Poster — Largest Rectangle in Histogram
function posterBuild(h) {
  const n = h.length, bars = h.concat([0]), pile = [], steps = [];
  let best = 0, bestAt = null;
  const rows = () => pile.slice().reverse().map((j, k) => ['#' + j, 'h ' + h[j] + (k === 0 ? ' top' : ''), '']);
  const snap = (kind, i, extra) => Object.assign({ kind, L: Math.min(i, n - 1), i, pile: pile.slice(), board: rows(), best, bestAt: bestAt && bestAt.slice() }, extra);
  steps.push(runStep('intro', snap('intro', 0, { area: null }), [say('hoot', 'A wall of ' + n + ' planks. Pip wants the biggest poster that fits flat against them.'), say('pip', 'A poster can’t be taller than the shortest plank under it.'), say('hoot', 'So for each plank, how wide can a poster of its height go?'), say('pip', 'My pile tells me. Its planks only get taller toward the top.')],
    'Pip wants the biggest poster that fits on the planks. A poster as tall as a plank can stretch left and right until it meets a shorter plank.',
    'pile = [] holds plank indexes, heights rising to the top. A shorter plank pops every taller one and measures its poster.',
    'A monotonic stack. Each plank is pushed once and popped once, and its poster is measured at the pop, so the whole pass is O(n).'));
  for (let i = 0; i <= n; i++) {
    const cur = bars[i], end = i === n;
    while (pile.length && bars[pile[pile.length - 1]] >= cur) {
      const top = pile.pop(), left = pile.length ? pile[pile.length - 1] + 1 : 0, w = i - left, area = h[top] * w;
      const isBest = area > best;
      if (isBest) { best = area; bestAt = [left, i - 1, top]; }
      const span = [left, i - 1];
      const who = end ? 'The end of the wall' : 'Plank ' + i + ' (' + cur + ')';
      steps.push(runStep(isBest ? 'best' : 'pop', snap(isBest ? 'best' : 'pop', i, { area, span, top }), [say('pip', who + ' is not taller than plank ' + top + ' (' + h[top] + ').'), say('hoot', 'So plank ' + top + '’s poster stops here: ' + h[top] + ' tall, ' + w + ' wide, ' + area + (isBest ? '. The best so far.' : '. Not better than ' + best + '.'))],
        who + ' is not taller than plank ' + top + ', so plank ' + top + '’s poster can’t reach past it. Pip lifts plank ' + top + ' off and measures: ' + h[top] + ' × ' + w + ' = ' + area + '.' + (isBest ? ' That is the biggest so far.' : ''),
        'pop ' + top + '. left edge = ' + left + ', width = ' + i + ' − ' + left + ' = ' + w + ', area = ' + h[top] + ' × ' + w + ' = ' + area + '. best = ' + best + '.',
        'The plank below ' + top + ' on the pile is the nearest shorter plank on its left, and plank ' + (end ? n + ' (a 0 placed after the wall)' : i) + ' is the nearest shorter one on its right. Those two walls fix the width.'));
    }
    if (end) break;
    pile.push(i);
    steps.push(runStep('push', snap('push', i, { area: null }), [say('pip', 'Plank ' + i + ' is ' + h[i] + ' tall. ' + (pile.length > 1 ? 'The plank under it is shorter.' : 'The pile was empty.')), say('hoot', 'Its poster might still grow to the right. Put it on the pile.')],
      'Plank ' + i + ' (' + h[i] + ') is taller than everything on the pile, so its poster might keep growing to the right. Pip puts it on top.',
      'pile.append(' + i + '). Heights on the pile: ' + pile.map((j) => h[j]).join(' < ') + '.',
      'The pile only ever rises toward the top. A plank waits there until a shorter plank shows where its poster must stop.'));
  }
  steps.push(runStep('done', snap('done', n, { area: null, done: true }), [say('pip', 'The pile is empty and every plank was measured.'), say('hoot', 'The biggest poster is ' + best + '.')],
    'Every plank has been measured. The biggest poster covers planks ' + bestAt[0] + ' to ' + bestAt[1] + ', ' + h[bestAt[2]] + ' tall: ' + best + '.',
    'return best = ' + best + '.',
    n + ' pushes and ' + n + ' pops: O(n) time and O(n) space. Trying every pair of edges would be O(n²).'));
  runFinish(steps, { intro: ['An empty pile', 'plain'], push: ['Taller than the top → push', 'cool'], pop: ['Shorter plank → pop and measure', 'warn'], best: ['Shorter plank → pop, new biggest poster', 'ok'], done: ['Biggest poster: ' + best, 'ok'] }, (st) => {
    const on = new Set(st.pile);
    st.cells = h.map((_, j) => {
      if (st.kind === 'intro') return 'future';
      if (st.done) return j >= st.bestAt[0] && j <= st.bestAt[1] ? 'best' : 'in';
      if (st.span && j === st.top) return 'hit';
      if (st.span && j >= st.span[0] && j <= st.span[1]) return 'paint';
      if (j === st.i && st.kind === 'push') return 'cur';
      if (on.has(j)) return 'buy';
      return j > st.i ? 'future' : 'in';
    });
    const read = Math.min(st.i + (st.kind === 'push' ? 1 : 0), n);
    st.meter = { text: st.area == null ? 'best = ' + st.best : h[st.top] + ' × ' + (st.span[1] - st.span[0] + 1) + ' = ' + st.area, pct: (read / n) * 100, mark: 100, markLabel: 'planks read ' + read + ' / ' + n };
    st.watch = [['i', st.kind === 'intro' ? '—' : st.i === n ? n + ' (end)' : st.i, 'left'], ['h[i]', st.kind === 'intro' ? '—' : st.i === n ? '0' : h[st.i], 'left'], ['popped', st.span ? st.top : '—', 'right'], ['area', st.area == null ? '—' : st.area, 'right'], ['pile', '[' + st.pile.join(', ') + ']', 'text'], ['best', st.best, st.done ? 'ok' : 'text']];
    ['i', 'pile', 'best', 'bestAt', 'area', 'span', 'top'].forEach((k) => delete st[k]);
  });
  return { steps, best };
}
function posterScene() {
  const h = SCENE_INPUT['largest-rectangle-in-histogram'].default.nums;
  const run = posterBuild(h);
  const code = {
    py: [['def largestRectangleArea(heights):', ''], ['    bars = heights + [0]', '  # a 0 at the end empties the pile', 'intro'], ['    pile, best = [], 0', '  # indexes, heights rising'], ['    for i, h in enumerate(bars):', ''], ['        while pile and bars[pile[-1]] >= h:', ''], ['            top = pile.pop()', ''], ['            left = pile[-1] + 1 if pile else 0', ''], ['            area = bars[top] * (i - left)', '  # its poster stops here', 'pop'], ['            best = max(best, area)', '', 'best'], ['        pile.append(i)', '', 'push'], ['    return best', '', 'done']],
    java: [['int largestRectangleArea(int[] heights) {', ''], ['    int n = heights.length, best = 0;', '', 'intro'], ['    Deque<Integer> pile = new ArrayDeque<>();', '  // indexes, heights rising'], ['    for (int i = 0; i <= n; i++) {', ''], ['        int h = i == n ? 0 : heights[i];', '  // a 0 at the end'], ['        while (!pile.isEmpty() && heights[pile.peek()] >= h) {', ''], ['            int top = pile.pop();', ''], ['            int left = pile.isEmpty() ? 0 : pile.peek() + 1;', ''], ['            int area = heights[top] * (i - left);', '  // its poster stops here', 'pop'], ['            best = Math.max(best, area);', '', 'best'], ['        }', ''], ['        pile.push(i);', '', 'push'], ['    }', ''], ['    return best;', '', 'done'], ['}', '']],
    cpp: [['int largestRectangleArea(vector<int>& heights) {', ''], ['    int n = heights.size(), best = 0;', '', 'intro'], ['    stack<int> pile;', '  // indexes, heights rising'], ['    for (int i = 0; i <= n; i++) {', ''], ['        int h = i == n ? 0 : heights[i];', '  // a 0 at the end'], ['        while (!pile.empty() && heights[pile.top()] >= h) {', ''], ['            int top = pile.top(); pile.pop();', ''], ['            int left = pile.empty() ? 0 : pile.top() + 1;', ''], ['            int area = heights[top] * (i - left);', '  // its poster stops here', 'pop'], ['            best = max(best, area);', '', 'best'], ['        }', ''], ['        pile.push(i);', '', 'push'], ['    }', ''], ['    return best;', '', 'done'], ['}', '']],
    js: [['function largestRectangleArea(heights) {', ''], ['  const n = heights.length, pile = [];', '  // indexes, heights rising', 'intro'], ['  let best = 0;', ''], ['  for (let i = 0; i <= n; i++) {', ''], ['    const h = i === n ? 0 : heights[i];', '  // a 0 at the end'], ['    while (pile.length && heights[pile[pile.length - 1]] >= h) {', ''], ['      const top = pile.pop();', ''], ['      const left = pile.length ? pile[pile.length - 1] + 1 : 0;', ''], ['      const area = heights[top] * (i - left);', '  // its poster stops here', 'pop'], ['      best = Math.max(best, area);', '', 'best'], ['    }', ''], ['    pile.push(i);', '', 'push'], ['  }', ''], ['  return best;', '', 'done'], ['}', '']],
    go: [['func largestRectangleArea(heights []int) int {', ''], ['    n, best, pile := len(heights), 0, []int{}', '  // indexes, heights rising', 'intro'], ['    for i := 0; i <= n; i++ {', ''], ['        h := 0', '  // a 0 at the end'], ['        if i < n { h = heights[i] }', ''], ['        for len(pile) > 0 && heights[pile[len(pile)-1]] >= h {', ''], ['            top := pile[len(pile)-1]', ''], ['            pile = pile[:len(pile)-1]', ''], ['            left := 0', ''], ['            if len(pile) > 0 { left = pile[len(pile)-1] + 1 }', ''], ['            area := heights[top] * (i - left)', '  // its poster stops here', 'pop'], ['            best = max(best, area)', '', 'best'], ['        }', ''], ['        pile = append(pile, i)', '', 'push'], ['    }', ''], ['    return best', '', 'done'], ['}', '']]
  };
  return {
    id: 'largest-rectangle-in-histogram', pattern: 'Stack', cast: 'st', short: 'Poster', visual: 'planks', items: h, pitch: 70, tile: 48, unit: 26, width: 398,
    board: true, boardTitle: 'Pip’s pile',
    actorLabels: ['Pip · i'],
    goal: 'What is the biggest poster that fits on the planks?', status: ['Measuring…', 'Biggest poster: ' + run.best],
    lines: tagLines(code), code,
    rules: [['Start with an empty pile', 'intro'], ['Plank taller than the top → push it', 'push'], ['Plank not taller than the top → pop and measure', 'pop'], ['Every plank popped → the best poster', 'done']],
    predictAlias: { best: 'pop' },
    complexity: [['O(n)', 'each plank is pushed once and popped once'], ['O(n)', 'the pile can hold every plank']],
    quest: ['A wall of six planks, each one wide: 2, 4, 5, 3, 1 and 3 tall.', 'Pip wants to paste the biggest rectangular poster that fits flat on the planks. How big can it be?'],
    example: ['heights = [2, 4, 5, 3, 1, 3]', 'answer = ' + run.best + '  (3 tall across planks 1 to 3)'],
    answer: run.best,
    hints: ['Old Hoot: “Suppose the poster is exactly as tall as plank i. How far left and right can it go?”', '“It stops at the nearest shorter plank on each side. Which tool finds the nearest shorter plank?”', '“Keep a pile of indexes with rising heights. When a plank is not taller than the top, pop the top: its width runs from just after the plank below it to just before i.”'],
    clues: ['the shortest plank limits a poster', 'the nearest shorter plank on each side', 'one pass would be ideal'],
    kit: { right: 1, spot: 'Why a rising pile?', ask: 'How should Pip measure the posters?',
      quiz: [['Try every left and right edge', 'Measure the poster between every pair of planks'], ['A pile that only rises', 'A shorter plank pops the taller ones and measures them'], ['Use the tallest plank', 'The biggest poster must cover the tallest plank'], ['Two friends from both ends', 'Walk inward, keeping the taller ends']] },
    quizFb: ['Old Hoot: “That works, but it costs O(n²) pairs. A long wall takes ages.”', 'Old Hoot: “Yes! A plank waits on the pile until a shorter one shows where its poster ends.”', 'Old Hoot: “The tallest plank here is 5, but the best poster is 3 tall and 3 wide.”', 'Old Hoot: “The walkers fit Container With Most Water. Here the shortest plank in between matters, not just the ends.”'],
    steps: run.steps
  };
}
SCENE_INPUT['largest-rectangle-in-histogram'] = {
  hint: 'plank heights from 0 to 12', example: '2, 1, 5, 6, 2, 3',
  default: { nums: [2, 4, 5, 3, 1, 3] },
  presets: [['Story example', () => SCENE_INPUT['largest-rectangle-in-histogram'].default], ['Random', () => SCENE_INPUT['largest-rectangle-in-histogram'].random()], ['All the same', () => ({ nums: [3, 3, 3, 3] })], ['A staircase', () => ({ nums: [1, 2, 3, 4, 5] })]],
  random: () => ({ nums: rlist(rint(3, 9), 0, 12) }),
  parse: (t) => ({ nums: parseNums(t) }), show: (v) => v.nums.join(', '),
  check: (v) => checkCount(v.nums, 3, 9, 'planks') || checkRange(v.nums, 0, 12, 'Heights') || (Math.max.apply(null, v.nums) ? '' : 'At least one plank must be taller than 0.'),
  make: (v) => {
    const h = v.nums, run = posterBuild(h);
    return runScene('largest-rectangle-in-histogram', Object.assign(fitPlanks({ pitch: 70, tile: 48, unit: 26 }, h, 440), {
      items: h, status: ['Measuring…', 'Biggest poster: ' + run.best],
      example: ['heights = ' + showList(h), 'answer = ' + run.best], answer: run.best, input: { nums: h }
    }), run.steps);
  }
};

SCENE_REGISTRY.push(posterScene);
