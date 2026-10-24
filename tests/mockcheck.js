// Mock interview, end to end: runs the built Interview page script headlessly with a stubbed code runner and
// plays whole sessions: setup, start, hints, think-aloud notes, Run and Submit, switching problems, the review
// rubric, saving to history, the streak, a session that runs out of time, and a reload in the middle of one.
// The stub answers like a correct solution when the learner's code contains "SOLVED", and wrongly otherwise.
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'pages', 'Interview.dc.html'), 'utf8');
const script = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
let problems = 0;
const check = (cond, msg) => { if (!cond) { problems++; console.log('  ✗', msg); } else console.log('  ✓', msg); };

const store = {};
const runs = [];
const sandbox = `
  const window = { localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } },
    addEventListener: () => {}, removeEventListener: () => {} };
  const timers = []; const setInterval = (fn) => { timers.push(fn); return timers.length; }; const clearInterval = () => {};
  class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, typeof o === 'function' ? o(this.state) : o); } forceUpdate() {} }
  ${script}
  // The stubbed runner: synchronous, no workers.
  canRunCode = () => true;
  const stub = (lang) => (code, fn, cases, onCase, onEnd) => {
    const pid = Object.keys(TEST_SPECS).find((id) => TEST_SPECS[id].fn === fn && cases.length && JSON.stringify(TEST_SPECS[id].examples[0][0]) === JSON.stringify(cases[0]));
    runs.push({ lang, fn, n: cases.length });
    cases.forEach((args, i) => {
      const want = runRef(TEST_SPECS[pid], args);
      onCase(i, { got: /SOLVED/.test(code) ? want : '__wrong__', logs: [] });
    });
    onEnd({});
    return () => {};
  };
  runJs = stub('js'); runPython = stub('py'); PY.state = 'ready';
  return { Component, timers, DS, TEST_SPECS, specInfo, MOCK_HINTS, MOCK_CANDS, mockHints };`;
const env = new Function('store', 'runs', sandbox)(store, runs);
const { Component, timers, DS, TEST_SPECS, specInfo, MOCK_CANDS, mockHints } = env;
let now = new Date(2026, 9, 21, 9, 0, 0).getTime();
DS.setClock(() => now);
const tick = (c) => timers.forEach((fn) => fn());

console.log('problem pool');
{
  check(MOCK_CANDS.length === Object.keys(TEST_SPECS).filter((id) => !TEST_SPECS[id].langs).length && MOCK_CANDS.every((c) => !TEST_SPECS[c.id].langs) && MOCK_CANDS.every((c) => ['Easy', 'Medium', 'Hard'].includes(c.diff) && c.pattern && c.total > 0), 'every runnable problem can be picked, with a difficulty, a pattern and a test count');
  const short = MOCK_CANDS.filter((c) => mockHints(c).length !== 3).map((c) => c.id + ' (' + c.pattern + ')');
  check(short.length === 0, 'every runnable problem has three hints' + (short.length ? ': ' + short.slice(0, 5).join(', ') : ''));
}

console.log('setup');
let c = new Component({});
c.componentDidMount();
let v = c.renderVals();
v.tabs.find((x) => x.label.startsWith('Mock')).pick();
v = c.renderVals();
check(v.isMock && v.mock.setup && !v.mock.session && v.chrome, 'the Mock tab opens on setup, with the page header');
check(v.mock.noHistory && v.mock.lengths.length === 3 && v.mock.mixes.length === 3 && v.mock.langs.length === 2, 'setup offers length, difficulty mix and language, and no history yet');
check(v.mock.patterns[0].label === 'Any pattern' && v.mock.patterns.length > 10, 'pattern focus is optional');
v.mock.lengths.find((x) => x.label === '45 min').pick();
v = c.renderVals(); v.mock.mixes.find((x) => x.label === 'Standard').pick();
v = c.renderVals(); v.mock.langs.find((x) => x.label === 'JavaScript').pick();
v = c.renderVals();
check(/Two problems, Easy then Medium/.test(v.mock.summary) && /JavaScript/.test(v.mock.summary) && /45 minutes/.test(v.mock.summary), 'the summary says what will happen: ' + v.mock.summary);
check(JSON.parse(store['dsaviz-mock-cfg']).lang === 'js', 'the setup choices are remembered');
DS.passCode('two-sum');
v.mock.start();

console.log('session');
v = c.renderVals();
const s = DS.mockSession();
check(v.mock.session && !v.chrome && s && s.problems.length === 2, 'Start opens the session with two problems and hides the page header');
check(s.problems.every((p) => TEST_SPECS[p.id] && p.id !== 'two-sum'), 'both problems are runnable and not already solved');
check(s.problems[0].diff === 'Easy' && s.problems[1].diff === 'Medium', 'Easy first, then Medium');
check(c.runner.pid === s.problems[0].id && c.runner.s.lang === 'js', 'the code pane opens problem 1 in the chosen language');
check(v.cr.showLangs === false && v.cr.showClock === false && v.cr.runnable, 'the pane hides its own language tabs and clock; Run and Submit are there');
check(v.mock.s.clock === '45:00' && v.mock.s.many && v.mock.s.tabs.length === 2, 'a 45:00 countdown and a switch between the two problems');
const info1 = specInfo(s.problems[0].id);
const sessionText = JSON.stringify(v.mock.s);
// Before a hint, nothing the page adds may name a problem's pattern. The problem's own title and statement are
// exempt (a problem can be called "Binary Search"), so they are cut out of every string before the scan.
{
  const own = s.problems.flatMap((p) => [p.title, TEST_SPECS[p.id].ask]).filter(Boolean).sort((a, b) => b.length - a.length);
  const added = [];
  const walk = (x, key) => {
    if (['ask', 'title', 'examples'].includes(key) || typeof x === 'function') return;
    if (typeof x === 'string') { let rest = x; own.forEach((o) => { rest = rest.split(o).join(''); }); added.push(rest); }
    else if (Array.isArray(x)) x.forEach((y) => walk(y, key));
    else if (x && typeof x === 'object') Object.keys(x).forEach((k) => walk(x[k], k));
  };
  walk(v.mock.s, '');
  const leaks = s.problems.map((p) => p.pattern).filter((pat) => pat && added.some((str) => str.toLowerCase().includes(pat.toLowerCase())));
  check(!('pattern' in v.mock.s) && v.mock.s.hintList.length === 0 && added.length > 10 && leaks.length === 0, 'the pattern is not named before a hint' + (leaks.length ? ': ' + leaks.join(', ') : ''));
}
check(!info1.story || !sessionText.includes(info1.story), 'the story title is hidden');
check(v.mock.s.ask === TEST_SPECS[s.problems[0].id].ask && v.mock.s.examples.length === 3, 'the problem statement and its examples are shown');
check(v.mock.s.hintsOpen === false && v.mock.s.hintList.length === 0, 'hints start folded and unused');
now += 60 * 1000; tick(c); v = c.renderVals();
check(v.mock.s.clock === '44:00', 'the countdown runs: ' + v.mock.s.clock);
v.mock.s.hintsToggle(); v = c.renderVals();
check(v.mock.s.hintsOpen && v.mock.s.canHint && /−3 points/.test(v.mock.s.hintBtn), 'opening the fold shows the hint button and its cost');
v.mock.s.useHint(); v = c.renderVals();
check(v.mock.s.hintList.length === 1 && DS.mockSession().problems[0].hints === 1, 'a hint is shown and counted');
v.mock.s.useHint(); v.mock.s.useHint(); v = c.renderVals();
check(v.mock.s.hintList.length === 3 && v.mock.s.noMoreHints && !v.mock.s.canHint, 'three hints per problem, then no more');
check(v.mock.s.hintList[1].text.includes(s.problems[0].pattern), 'the second hint names the pattern');
v.mock.s.setNotes({ target: { value: 'Restate: sorted input. Plan: two pointers, O(n).' } }); v = c.renderVals();
check(v.mock.s.notes.startsWith('Restate') && DS.mockSession().notes.startsWith('Restate'), 'the think-aloud box saves as you type');
c.runner.s.code = 'function wrong() {}';
v.cr.run(); v = c.renderVals();
check(runs.length === 1 && runs[0].lang === 'js' && runs[0].n === 3 && DS.mockSession().problems[0].runs === 1, 'Run tries the examples with the chosen language and is counted');
check(v.cr.badge === '0 / 3 passed', 'the pane shows the run result: ' + v.cr.badge);
c.runner.s.code = '// SOLVED';
v.cr.submit(); v = c.renderVals();
const p1 = DS.mockSession().problems[0];
check(p1.submitted && p1.best === p1.total && p1.total === TEST_SPECS[p1.id].examples.length + TEST_SPECS[p1.id].hidden.length, 'Submit runs every test and records the pass');
check(v.mock.session && v.mock.s.tabs[0].label.endsWith('submitted'), 'one problem submitted: the session goes on and says so');
check(DS.codePasses().ids.includes(p1.id), 'a full pass counts as solved on the site');
v.mock.s.tabs[1].pick(); v = c.renderVals();
check(c.runner.pid === s.problems[1].id && v.mock.s.count === 'Problem 2 of 2' && v.mock.s.hintList.length === 0, 'switching opens problem 2 with its own hints');
v.mock.s.extend(); v = c.renderVals();
check(DS.mockSession().limit === 50 * 60, '+5 min adds time');
now += 20 * 60 * 1000;
c.runner.s.code = 'function nope() {}';
v.cr.submit(); v = c.renderVals();

console.log('review');
check(v.mock.review && !v.mock.session && v.chrome, 'submitting the last problem ends the interview and opens the review');
check(v.mock.r.why === 'You submitted every problem', 'the review says why it ended');
const total = DS.mockSession().problems.reduce((a, p) => a + p.total, 0);
check(v.mock.r.tiles[0].value === p1.total + ' / ' + total, 'tests passed: ' + v.mock.r.tiles[0].value);
check(v.mock.r.tiles[1].value === '21:00' && /50 minutes/.test(v.mock.r.tiles[1].sub), 'time used: ' + v.mock.r.tiles[1].value + ' ' + v.mock.r.tiles[1].sub);
check(v.mock.r.tiles[2].value === '3' && v.mock.r.tiles[2].sub === '−9 points', 'hints used and what they cost');
check(v.mock.r.problems.length === 2 && v.mock.r.problems.every((p) => p.pattern), 'the review reveals each pattern');
check(v.mock.r.areas.length === 6 && v.mock.r.areas.every((a) => a.levels.length === 4 && a.levels.every((l) => l.text.length > 10)), 'six rubric areas, four described levels each');
check(v.mock.r.saveDisabled && v.mock.r.score === '—', 'save waits for all six areas');
now += 60 * 60 * 1000; tick(c); v = c.renderVals();
check(DS.mockSession().used === 21 * 60, 'the clock stays stopped during the review');
const pick = [4, 3, 3, 2, 3, 4];
v.mock.r.areas.forEach((a, i) => { v = c.renderVals(); v.mock.r.areas[i].levels[pick[i] - 1].pick(); });
v = c.renderVals();
const expect = DS.mockScore({ understanding: 4, approach: 3, code: 3, correctness: 2, complexity: 3, communication: 4 }, 3);
check(!v.mock.r.saveDisabled && v.mock.r.score === String(expect.score) && v.mock.r.bandLabel === expect.label, 'all six rated: score ' + v.mock.r.score + ', ' + v.mock.r.bandLabel);
check(v.mock.r.areas[0].levels[3].on && !v.mock.r.areas[0].levels[0].on, 'the picked level is marked');
const xp0 = DS.xp().total;
v.mock.r.save(); v = c.renderVals();

console.log('saved');
check(v.mock.saved && v.mock.v.score === String(expect.score) && DS.mockSession() === null, 'saving shows the score and clears the session');
check(DS.mockHistory().count === 1 && v.mock.hasHistory && v.mock.chart.pts.length === 1, 'the mock is in history and on the trend chart');
check(DS.xp().total === xp0 + DS.XP.mock && DS.days()[DS.dayKey(now)].mock === 1 && DS.streak().activeToday, 'it counts for today and the streak');
check(/first mock/.test(v.mock.v.line), 'the first save says how the trend starts');
v.mock.v.again(); v = c.renderVals();
check(v.mock.setup && v.mock.hasHistory && /1 mock/.test(v.mock.histLine), 'Set up another mock goes back to setup, with history');

console.log('time runs out, and a reload');
now = new Date(2026, 9, 22, 19, 0, 0).getTime();
v.mock.lengths.find((x) => x.label === '30 min').pick(); v = c.renderVals();
v.mock.start(); v = c.renderVals();
check(v.mock.session && DS.mockSession().problems.length === 1 && DS.mockSession().problems[0].diff === 'Medium', '30 minutes is one Medium problem');
c.componentWillUnmount();
now += 10 * 60 * 1000;
c = new Component({}); c.componentDidMount(); v = c.renderVals();
check(v.isMock && v.mock.session && v.mock.s.clock === '20:00' && c.runner.pid === DS.mockSession().problems[0].id, 'a reload returns to the running session with the clock still going');
v.mock.s.end(); v = c.renderVals();
check(v.mock.session && v.mock.s.endLabel === 'Click again to end', 'End interview asks for a second click');
now += 25 * 60 * 1000; tick(c); v = c.renderVals();
check(v.mock.review && v.mock.r.why === 'Time ran out' && v.mock.r.tiles[1].value === '30:00', 'when time runs out the review opens with the full 30 minutes used');
check(/^0 \/ [1-9]\d*$/.test(v.mock.r.tiles[0].value) && /did not submit/.test(v.mock.r.tiles[0].sub), 'an unsubmitted problem counts as no tests passed, out of its real test count: ' + v.mock.r.tiles[0].value);
v.mock.r.areas.forEach((a, i) => { v = c.renderVals(); v.mock.r.areas[i].levels[3].pick(); });
v = c.renderVals(); v.mock.r.save(); v = c.renderVals();
check(DS.mockHistory().count === 2 && v.mock.chart.pts.length === 2 && /Up \d+ points/.test(v.mock.v.line), 'the second save extends the trend: ' + v.mock.v.line);
check(DS.streak().current === 2, 'mocks on two days make a 2-day streak');
v.mock.v.again(); v = c.renderVals(); v.mock.start(); v = c.renderVals();
v.mock.s.end(); v = c.renderVals(); v.mock.s.end(); v = c.renderVals();
check(v.mock.review && v.mock.r.why === 'You ended the interview', 'two clicks on End interview end it early');
v.mock.r.discard(); v = c.renderVals();
check(v.mock.setup && DS.mockSession() === null && DS.mockHistory().count === 2, 'Discard drops the session and keeps the history');
c.componentWillUnmount();

console.log(problems ? problems + ' problem(s)' : 'mock interview clean');
if (problems) process.exitCode = 1;
