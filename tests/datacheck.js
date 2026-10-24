// Data layer test: loads shared/data.js with a fake localStorage and a fake clock, then checks
// the empty state, activity logging, streak math across days, sheet ticks, medals, demo flags,
// the spaced-repetition scheduler and queue, notes, and the sheet backup file.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const dataSrc = fs.readFileSync(path.join(root, 'shared', 'data.js'), 'utf8');
const catalogSrc = fs.readFileSync(path.join(root, 'shared', 'catalog.js'), 'utf8');

let problems = 0;
const check = (cond, msg) => { if (!cond) { problems++; console.log('  ✗', msg); } else console.log('  ✓', msg); };

// A fresh DS over its own store and clock. withCatalog binds the 58-problem catalog like a page does.
function load(withCatalog) {
  const store = {};
  const window = { localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } } };
  const body = (withCatalog ? catalogSrc : '') + '\n' + dataSrc + '\nreturn { DS, PROBLEMS: typeof PROBLEMS !== "undefined" ? PROBLEMS : null, PATTERNS: typeof PATTERNS !== "undefined" ? PATTERNS : null };';
  const out = new Function('window', body)(window);
  let now = new Date(2026, 9, 21, 20, 0, 0).getTime(); // Wed 21 Oct 2026, 8 pm local
  out.DS.setClock(() => now);
  out.store = store;
  out.at = (y, m, d, h) => { now = new Date(y, m - 1, d, h || 12, 0, 0).getTime(); return now; };
  return out;
}

console.log('empty state');
{
  const { DS, PROBLEMS, PATTERNS } = load(true);
  const st = DS.streak();
  check(st.current === 0 && st.longest === 0 && !st.activeToday && !st.atRisk, 'new learner has no streak');
  check(st.week.length === 7 && st.week[0].d === 'M' && st.week.every((w) => !w.on), 'week strip is Monday first and empty');
  check(st.week.filter((w) => w.today).length === 1 && st.week[2].today, 'today is Wednesday in the strip');
  const xp = DS.xp();
  check(xp.total === 0 && xp.week === 0 && xp.level === 1 && xp.pct === 0, 'zero XP, level 1');
  const hm = DS.heatmap(26);
  check(hm.cells.length === 182 && hm.total === 0 && hm.activeDays === 0, 'heatmap has 26 empty weeks');
  check(hm.cells[hm.todayIndex].today && hm.cells.slice(hm.todayIndex + 1).every((c) => c.future), 'heatmap ends this week, future days marked');
  check(DS.stories().count === 0 && DS.sheet().ticked === 0, 'no stories, no sheet ticks');
  check(PROBLEMS.every((p) => p.status === 'todo'), 'catalog statuses read as todo, not the shipped sample data');
  const me = DS.profile();
  check(me.isNew && me.name === '' && me.demo === false, 'profile is new, unnamed and real');
  const medals = DS.medals(PROBLEMS, PATTERNS);
  check(medals.length > 0 && medals.every((m) => m.tier === null && m.next.tier === 'bronze'), 'no medals earned, every pattern aims at bronze');
}

console.log('logging activity');
{
  const { DS, PROBLEMS, store } = load(true);
  const r1 = DS.finishStory('two-sum-ii');
  check(r1.first && r1.xp === DS.XP.story, 'first finish earns story XP');
  const r2 = DS.finishStory('two-sum-ii');
  check(!r2.first && r2.xp === 0, 'finishing the same story again earns no XP');
  check(DS.stories().count === 1 && PROBLEMS.find((p) => p.id === 'two-sum-ii').status === 'done', 'story counts once and shows as done in the catalog');
  DS.passCode('two-sum-ii');
  DS.rateCard('two-sum-ii');
  const day = DS.days()[DS.dayKey(new Date(2026, 9, 21).getTime())];
  check(day && day.story === 2 && day.code === 1 && day.revisit === 1 && day.lesson === 0 && day.total === 4, 'today holds every activity');
  check(DS.xp().total === DS.XP.story + DS.XP.code + DS.XP.revisit, 'XP adds story, code and revisit');
  check(DS.streak().current === 1 && DS.streak().activeToday, 'one active day is a 1-day streak');
  check(JSON.parse(store['dsaviz-activity-v1']).v === 1, 'log is versioned in dsaviz-activity-v1');
  const l1 = DS.finishLesson('sd:url-shortener'), l2 = DS.finishLesson('sd:url-shortener');
  check(l1.first && l1.xp === DS.XP.lesson && !l2.first && DS.lessons().count === 1, 'a finished lesson counts once and earns lesson XP once');
  store['dsaviz-problem'] = 'valid-palindrome';
  check(PROBLEMS.find((p) => p.id === 'valid-palindrome').status === 'now', 'the open problem reads as in progress');
  check(DS.logActivity('nonsense', 'x') === null && DS.logActivity('sheet', 'x') === null, 'unknown kinds and sheet are not logged');
  store['dsaviz-activity-v1'] = '{broken';
  check(DS.xp().total === 0 && DS.streak().current === 0, 'a corrupted log reads as empty, no crash');
}

console.log('streak math across days');
{
  const { DS, at } = load(false);
  at(2026, 10, 18); DS.finishStory('a');
  at(2026, 10, 19); DS.finishStory('b');
  at(2026, 10, 20, 23); DS.finishStory('c');
  at(2026, 10, 21, 9);
  let st = DS.streak();
  check(st.current === 3 && st.atRisk && !st.activeToday, 'three days through yesterday: alive but at risk');
  DS.rateCard('a');
  st = DS.streak();
  check(st.current === 4 && st.activeToday && !st.atRisk, 'learning today makes it four');
  at(2026, 10, 23, 9);
  st = DS.streak();
  check(st.current === 0 && st.longest === 4, 'a missed day resets current, longest stays 4');
  DS.finishStory('d');
  check(DS.streak().current === 1, 'a new streak starts');
  at(2026, 11, 1, 0); DS.finishStory('e');
  at(2026, 11, 1, 23); DS.finishStory('f');
  at(2026, 11, 2, 0); DS.finishStory('g');
  check(DS.streak().current === 2, 'midnight boundaries split days by local date');
  at(2026, 12, 31, 22); DS.finishStory('h');
  at(2027, 1, 1, 8); DS.finishStory('i');
  check(DS.streak().current === 2, 'streak runs across the new year');
  const wk = DS.streak().week;
  check(wk.length === 7 && wk.filter((w) => w.on).length === 2, 'week strip shows Thursday and Friday of new year week');
  check(DS.xp().week === 2 * DS.XP.story, 'weekly XP counts this Monday to today only');
}

console.log('sheet ticks');
{
  const { DS, store, at } = load(false);
  const t0 = at(2026, 10, 20, 10);
  store['dsaviz-sheet-v1'] = JSON.stringify({ v: 1, done: { 'two-sum': t0, 'valid-anagram': t0 + 1000 }, star: { 'two-sum': 1 } });
  at(2026, 10, 21, 10);
  check(DS.sheet().ticked === 2 && DS.sheet().starred === 1, 'reads ticks and stars from dsaviz-sheet-v1');
  check(DS.streak().current === 1 && DS.streak().atRisk, 'a sheet tick yesterday counts toward the streak');
  check(DS.xp().total === 2 * DS.XP.sheet, 'each tick earns sheet XP');
  store['dsaviz-sheet-v1'] = JSON.stringify({ v: 2, done: { x: 1 } });
  check(DS.sheet().ticked === 0, 'an unknown sheet version is ignored');
}

console.log('medals');
{
  const { DS, PROBLEMS, PATTERNS, store } = load(true);
  const hm = PROBLEMS.filter((p) => p.pattern === 'Hash Map');
  DS.finishStory(hm[0].id);
  let m = DS.medals(PROBLEMS, PATTERNS).find((x) => x.pattern === 'Hash Map');
  check(m.tier === 'bronze' && m.fresh && m.next.tier === 'silver', 'first story earns bronze, fresh, next is silver');
  DS.markMedalsSeen(DS.medals(PROBLEMS, PATTERNS));
  check(!DS.medals(PROBLEMS, PATTERNS).find((x) => x.pattern === 'Hash Map').fresh, 'a seen medal does not shine again');
  hm.forEach((p) => DS.finishStory(p.id));
  m = DS.medals(PROBLEMS, PATTERNS).find((x) => x.pattern === 'Hash Map');
  check(m.tier === 'silver' && m.next.tier === 'gold' && m.next.unit === 'rated', 'all stories but none rated: silver, gold needs ratings');
  const deck = {}; hm.forEach((p) => { deck[p.id] = { due: 3, rated: 'Good' }; });
  store['dsaviz-deck'] = JSON.stringify(deck);
  m = DS.medals(PROBLEMS, PATTERNS).find((x) => x.pattern === 'Hash Map');
  check(m.tier === 'gold' && m.next === null && m.fresh, 'all done and rated: gold, freshly earned');
}

console.log('demo flags');
{
  const { DS, at } = load(false);
  const lb = DS.leaderboard('league');
  check(lb.demo === true && lb.rows.length === 20, 'league is demo data with 20 rows');
  const you = lb.rows.filter((r) => r.me);
  check(you.length === 1 && you[0].xp === 0 && you[0].rank === 20, 'the learner row is real: 0 XP ranks last');
  check(lb.rows.every((r, i) => r.rank === i + 1) && lb.rows.every((r, i) => !i || lb.rows[i - 1].xp >= r.xp), 'ranks follow XP');
  at(2026, 10, 21); for (let i = 0; i < 50; i++) DS.finishStory('s' + i);
  const lb2 = DS.leaderboard('league');
  check(lb2.you.rank === 1 && lb2.you.toPromotion === 0, 'real XP moves the learner up');
  check(DS.buddies().demo === true && DS.feed().demo === true, 'buddies and feed are flagged demo');
  check(DS.leaderboard('nope').tab === 'league' && DS.leaderboard('friends').rows.length === 7, 'unknown tabs fall back; friends board is small');
  check(DS.profile().demo === false && DS.streak().demo === undefined, 'real data carries no demo flag');
}

console.log('spaced repetition scheduler');
{
  const { DS } = load(false);
  const t0 = new Date(2026, 9, 21, 20).getTime();
  let c = DS.schedule(null, 3, t0);
  check(c.interval === 3 && c.reps === 1 && c.due === '2026-10-24', 'first Good: 3 days, due on the 24th');
  check(DS.schedule(null, 2, t0).interval === 1 && DS.schedule(null, 4, t0).interval === 6, 'first Hard is 1 day, first Easy is 6');
  const goods = [c.interval];
  for (let i = 0; i < 4; i++) { c = DS.schedule(c, 3, t0); goods.push(c.interval); }
  check(goods.every((n, i) => !i || n > goods[i - 1]), 'intervals grow on every Good: ' + goods.join(', '));
  let e = DS.schedule(null, 4, t0); const easies = [e.interval];
  for (let i = 0; i < 3; i++) { e = DS.schedule(e, 4, t0); easies.push(e.interval); }
  check(easies.every((n, i) => n > goods[i]), 'Easy grows faster than Good: ' + easies.join(', '));
  check(e.ease > 2.5 && e.ease <= 3, 'Easy raises ease, capped at 3.0');
  const again = DS.schedule(c, 1, t0);
  check(again.interval === 1 && again.reps === 0 && again.lapses === 1 && again.ease < c.ease && again.due === '2026-10-22', 'Again resets to tomorrow, counts a lapse, lowers ease');
  check(DS.schedule(again, 3, t0).interval === 3, 'after Again the card starts over');
  const h = DS.schedule({ interval: 10, reps: 3, ease: 1.35 }, 2, t0);
  check(h.interval === 12 && h.ease === 1.3, 'Hard grows by 1.2 and ease never drops below 1.3');
  check(DS.schedule({ interval: 300, reps: 9, ease: 3 }, 4, t0).interval === 365, 'intervals cap at a year');
  check(DS.schedule({ interval: 1, reps: 1, ease: 1.3 }, 2, t0).interval === 2, 'every pass moves the card at least a day');
  check(DS.schedule(null, 3, new Date(2026, 11, 30, 23).getTime()).due === '2027-01-02', 'due dates cross the new year by local date');
}

console.log('review queue across days');
{
  const { DS, store, at } = load(true);
  at(2026, 10, 21, 20);
  check(DS.reviewCards().length === 0 && DS.reviewDue().length === 0 && DS.retention().pct === null, 'empty queue, no retention yet');
  DS.finishStory('two-sum-ii');
  DS.addCard('two-sum-ii', { rule: 'Move the end that cannot be in the answer.' });
  let cards = DS.reviewCards();
  check(cards.length === 1 && cards[0].kind === 'story' && !cards[0].isDue && cards[0].due === '2026-10-22', 'a finished story is due tomorrow');
  check(cards[0].rule === 'Move the end that cannot be in the answer.', 'the key rule is kept on the card');
  const up = DS.reviewUpcoming(7);
  check(up.counts.length === 7 && up.counts[0].n === 1 && up.counts[0].date === '2026-10-22', 'upcoming counts it for tomorrow');
  store['dsaviz-sheet-v1'] = JSON.stringify({ v: 1, done: { 'reverse-string': at(2026, 10, 21, 21), 'two-sum-ii': at(2026, 10, 21, 21) }, star: {} });
  DS.addCard('sheet:reverse-string', { name: 'Reverse String', pattern: 'Two Pointers', hint: 'Swap the ends.' });
  cards = DS.reviewCards();
  check(cards.length === 2 && cards.some((x) => x.id === 'sheet:reverse-string' && x.kind === 'sheet' && x.name === 'Reverse String'), 'a ticked sheet problem joins the queue; a slug that is a story is not counted twice');
  at(2026, 10, 22, 1);
  check(DS.reviewDue().length === 2, 'just after midnight both are due');
  const before = DS.xp().total;
  const r = DS.review('two-sum-ii', 3);
  check(r.interval === 3 && r.due === '2026-10-25', 'Good on day one sets the 25th');
  check(DS.reviewDue().length === 1 && DS.reviewDue()[0].id === 'sheet:reverse-string', 'the rated card leaves today');
  check(DS.xp().total === before + DS.XP.revisit && DS.streak().activeToday, 'a review earns revisit XP and counts for the streak');
  DS.review('sheet:reverse-string', 1);
  check(DS.retention().pct === 50 && DS.retention().reviews === 2 && DS.retention().today === 2, 'retention: one recalled of two');
  at(2026, 10, 23, 9);
  check(DS.reviewDue().map((x) => x.id).join() === 'sheet:reverse-string', 'Again comes back the next day');
  at(2026, 10, 25, 9);
  const due = DS.reviewDue();
  check(due.length === 2 && due[0].id === 'sheet:reverse-string' && due[0].late === 2, 'unreviewed cards stay due and show how late they are');
  check(DS.reviewPreview('two-sum-ii').map((p) => p.interval).join() === '1,4,8,10', 'preview shows each grade: ' + DS.reviewPreview('two-sum-ii').map((p) => p.when).join(', '));
  const xpBefore = DS.xp().total;
  DS.review('two-sum-ii', 4);
  const redo = DS.review('two-sum-ii', 2, { redo: true });
  check(redo.interval === 4 && DS.xp().total === xpBefore + DS.XP.revisit, 'changing your mind re-rates from the state before, without extra XP');
  check(DS.retention().reviews === 3, 'a re-rate replaces the last log entry');
  at(2026, 12, 20, 9);
  check(DS.retention().pct === null, 'retention looks back 30 days');
  store['dsaviz-review-v1'] = '{nope';
  check(DS.reviewCards().length === 2 && DS.reviewCards()[0].due === '2026-10-22', 'a broken review store falls back to the day after finishing');
  const two = load(true);
  const hm = two.PROBLEMS.filter((p) => p.pattern === 'Hash Map');
  hm.forEach((p) => { two.DS.finishStory(p.id); two.DS.review(p.id, 3); });
  check(two.DS.medals(two.PROBLEMS, two.PATTERNS).find((x) => x.pattern === 'Hash Map').tier === 'gold', 'reviewed stories count as rated for gold');
}

console.log('notes and the backup file');
{
  const { DS, store, at } = load(false);
  at(2026, 10, 21, 10);
  check(DS.note('two-sum') === '', 'no note yet');
  DS.setNote('two-sum', 'Store each value, look up the complement.');
  check(DS.note('two-sum') === 'Store each value, look up the complement.', 'a note round-trips');
  check(JSON.parse(store['dsaviz-notes-v1']).v === 1, 'notes are versioned in dsaviz-notes-v1');
  DS.setNote('two-sum', '   ');
  check(DS.note('two-sum') === '' && !('two-sum' in DS.notes()), 'an empty note is removed');
  DS.setNote('two-sum', 'x'.repeat(5000));
  check(DS.note('two-sum').length === 2000, 'notes are capped at 2000 characters');
  DS.setNote('two-sum', 'Hash the complement.');
  DS.setNote('valid-anagram', 'Count letters.');
  store['dsaviz-sheet-v1'] = JSON.stringify({ v: 1, done: { 'two-sum': 1000, 'move-zeroes': 2000 }, star: { 'two-sum': 1 } });
  const file = JSON.parse(JSON.stringify(DS.exportBackup()));
  check(file.v === 1 && file.done['two-sum'] === 1000 && file.star['two-sum'] === 1 && file.notes['two-sum'].text === 'Hash the complement.', 'export holds ticks, stars and notes');
  const fresh = load(false);
  fresh.at(2026, 10, 22, 10);
  fresh.store['dsaviz-sheet-v1'] = JSON.stringify({ v: 1, done: { 'two-sum': 500 }, star: {} });
  fresh.DS.setNote('valid-anagram', 'My newer note.');
  const res = fresh.DS.importBackup(file);
  check(res && res.ticks === 1 && res.notes === 1, 'import adds the missing tick and the missing note: ' + JSON.stringify(res));
  check(fresh.DS.sheet().ticked === 2 && fresh.DS.sheet().done['two-sum'] === 500 && fresh.DS.sheet().starred === 1, 'import merges ticks, keeps the earliest time, adds stars');
  check(fresh.DS.note('two-sum') === 'Hash the complement.' && fresh.DS.note('valid-anagram') === 'My newer note.', 'an older note never overwrites a newer one');
  file.notes['valid-anagram'] = { text: 'Even newer.', at: new Date(2026, 10, 1).getTime() };
  fresh.DS.importBackup(file);
  check(fresh.DS.note('valid-anagram') === 'Even newer.', 'a newer note from the file wins');
  check(fresh.DS.importBackup({ v: 2 }) === null && fresh.DS.importBackup(null) === null, 'a file that is not a backup is refused');
  const old = fresh.DS.importBackup({ v: 1, done: { 'reverse-string': 3000 } });
  check(old.ticks === 1 && old.notes === 0, 'an older backup without notes still imports');
}

console.log('predict the next step');
{
  const { DS, store } = load(false);
  const p0 = DS.predict();
  check(p0.streak === 0 && p0.best === 0 && p0.total === 0, 'predict starts empty');
  DS.logPredict(true); DS.logPredict(true);
  check(DS.predict().streak === 2 && DS.predict().best === 2, 'two right picks make a streak of 2');
  DS.logPredict(false);
  const p1 = DS.predict();
  check(p1.streak === 0 && p1.best === 2 && p1.right === 2 && p1.total === 3, 'a wrong pick resets the streak and keeps the best: ' + JSON.stringify(p1));
  check(JSON.parse(store['dsaviz-predict-v1']).v === 1, 'predict is versioned in dsaviz-predict-v1');
  store['dsaviz-predict-v1'] = '{broken';
  check(DS.predict().streak === 0, 'a broken predict record reads as empty');
  store['dsaviz-predict-v1'] = JSON.stringify({ v: 1, streak: 9, best: 1, right: 3, total: 2 });
  const p2 = DS.predict();
  check(p2.right <= p2.total && p2.streak <= p2.right && p2.best >= p2.streak, 'impossible counts are clamped: ' + JSON.stringify(p2));
  DS.eraseProgress();
  check(DS.predict().total === 0, 'erasing progress clears the predict streak');
}

console.log('mock interviews');
{
  const { DS, store } = load(false);
  const clock = (mo, d, h, mi) => DS.setClock(() => new Date(2026, mo - 1, d, h, mi || 0, 0).getTime());
  const cands = [
    { id: 'e1', title: 'E1', diff: 'Easy', pattern: 'Hash Map' }, { id: 'e2', title: 'E2', diff: 'Starter', pattern: 'Two Pointers' },
    { id: 'm1', title: 'M1', diff: 'Medium', pattern: 'Hash Map' }, { id: 'm2', title: 'M2', diff: 'Medium', pattern: 'Stack' },
    { id: 'h1', title: 'H1', diff: 'Hard', pattern: 'Stack' }
  ];
  const first = () => 0;
  check(DS.mockSession() === null && DS.mockHistory().count === 0, 'no live session and no history at first');
  // picking
  const p30 = DS.mockPick(cands, { mins: 30, mix: 'standard' }, first);
  check(p30.length === 1 && p30[0].diff === 'Medium', '30 minutes picks one problem, the harder half of the mix');
  const p45 = DS.mockPick(cands, { mins: 45, mix: 'standard' }, first);
  check(p45.length === 2 && p45[0].diff !== 'Medium' && p45[1].diff === 'Medium' && p45[0].id !== p45[1].id, '45 minutes picks two different problems, Easy then Medium');
  check(DS.mockPick(cands, { mins: 60, mix: 'hard' }, first).map((p) => p.diff).join() === 'Medium,Hard', 'the tough mix is Medium then Hard');
  check(DS.mockPick(cands, { mins: 45, mix: 'standard', pattern: 'Stack' }, first).every((p) => p.pattern === 'Stack'), 'a pattern focus keeps to that pattern');
  clock(10, 20, 12);
  DS.passCode('m1');
  check(DS.mockPick(cands, { mins: 30, mix: 'standard' }, first)[0].id === 'm2', 'solved problems are skipped');
  DS.passCode('m2');
  check(DS.mockPick(cands, { mins: 30, mix: 'standard', pattern: 'Stack' }, first)[0].id === 'h1', 'with no unsolved problem of that difficulty, another unsolved one is picked');
  check(DS.mockPick([], { mins: 45 }).length === 0 && DS.mockStart({ mins: 45 }, []) === null, 'nothing to pick starts nothing');
  // the session store and its clock
  clock(10, 21, 9);
  const s0 = DS.mockStart({ mins: 45, mix: 'standard', lang: 'js' }, DS.mockPick(cands, { mins: 45, mix: 'standard' }, first));
  check(s0 && s0.limit === 2700 && s0.left === 2700 && !s0.ended && s0.lang === 'js' && s0.problems.length === 2, 'a 45-minute session starts with 45 minutes on the clock');
  check(JSON.parse(store['dsaviz-mock-v1']).v === 1, 'mock data is versioned in dsaviz-mock-v1');
  const [pa, pb] = s0.problems.map((p) => p.id);
  clock(10, 21, 9, 10);
  check(DS.mockSession().used === 600 && DS.mockSession().left === 2100, 'the clock runs from the start time, so a reload carries on');
  DS.mockRecord(pa, 'run', 2, 3);
  DS.mockRecord(pa, 'submit', 6, 8);
  DS.mockRecord(pa, 'submit', 4, 8);
  const sA = DS.mockSession().problems[0];
  check(sA.submitted && sA.best === 6 && sA.total === 8 && sA.runs === 1, 'the best submit is kept; runs are counted separately');
  check(DS.mockRecord('nope', 'submit', 1, 1).problems.every((p) => p.id !== 'nope' && (p.id === pa || !p.submitted)), 'results for other problems are ignored');
  check(!DS.mockSession().allSubmitted, 'not every problem is submitted yet');
  DS.mockHint(pa); DS.mockHint(pb);
  check(DS.mockSession().problems.reduce((a, p) => a + p.hints, 0) === 2, 'hints are counted per problem');
  DS.mockNotes('restate, edge cases, plan');
  check(DS.mockSession().notes === 'restate, edge cases, plan', 'think-aloud notes are kept');
  DS.mockExtend(5);
  check(DS.mockSession().limit === 3000, '+5 minutes extends the clock');
  DS.mockExtend(100);
  check(DS.mockSession().limit === 4500, 'extra time stops at 30 minutes');
  check(DS.mockSave({ understanding: 4 }) === null, 'a session cannot be saved before it ends');
  // time runs out
  clock(10, 21, 11);
  const over = DS.mockSession();
  check(over.over && over.left === 0 && over.used === 4500, 'past the limit the clock reads zero and over');
  const ended = DS.mockEnd();
  check(ended.ended && ended.used === 4500, 'ending after time ran out records the full limit, not the late click');
  DS.mockHint(pa); DS.mockRecord(pb, 'submit', 5, 5);
  check(DS.mockSession().problems[1].submitted === false && DS.mockSession().problems[0].hints === 1, 'an ended session takes no more hints or results');
  // rubric math
  const all = (v) => ({ understanding: v, approach: v, code: v, correctness: v, complexity: v, communication: v });
  check(DS.MOCK_AREAS.reduce((a, x) => a + x[1], 0) === 100 && DS.MOCK_AREAS.length === 6, 'six areas weighted to 100');
  const top = DS.mockScore(all(4), 0), low = DS.mockScore(all(1), 0);
  check(top.score === 100 && top.band === 'pass' && low.score === 0 && low.band === 'nohire', 'all 4s is 100 (pass), all 1s is 0 (no hire)');
  const mid = DS.mockScore(all(3), 0);
  check(mid.raw === 67 && mid.band === 'borderline', 'all 3s is 67, borderline: ' + mid.raw);
  check(DS.mockScore(all(3), 2).score === 61 && DS.mockScore(all(3), 2).penalty === 6, 'each hint takes 3 points off');
  check(DS.mockScore(Object.assign(all(4), { approach: 3 }), 0).score === 92, 'one area one level down costs a third of its weight');
  check(DS.mockScore(all(1), 5).score === 0, 'the score never drops below zero');
  const edge = DS.mockScore(Object.assign(all(4), { correctness: 1, understanding: 1 }), 0);
  check(edge.score === 70 && edge.band === 'pass' && DS.mockScore(Object.assign(all(4), { correctness: 1, understanding: 1 }), 1).band === 'borderline', 'the pass line is 70; one hint below it is borderline');
  check(DS.mockScore({ understanding: 4 }, 0).complete === false && DS.mockScore(Object.assign(all(4), { code: 5 }), 0).complete === false && DS.mockScore(Object.assign(all(4), { code: 2.5 }), 0).complete === false, 'missing, out-of-range or fractional scores are incomplete');
  // saving to history
  check(DS.mockSave({ understanding: 3 }) === null && DS.mockSession(), 'an incomplete rubric is not saved');
  const xpBefore = DS.xp().total;
  const res = DS.mockSave(all(3));
  check(res && res.score === 61 && res.band === 'borderline' && res.hints === 2 && res.passed === 6 && res.total === 8, 'the saved result carries score, band, hints and tests: ' + JSON.stringify(res && { s: res.score, h: res.hints, p: res.passed, t: res.total }));
  check(DS.mockSession() === null, 'saving clears the live session');
  const today = DS.days()[DS.dayKey(new Date(2026, 9, 21).getTime())];
  check(today && today.mock === 1 && DS.xp().total === xpBefore + DS.XP.mock && DS.streak().activeToday, 'a saved mock logs activity for the streak and XP');
  // a second mock, a day later, ended by the learner
  clock(10, 22, 18);
  DS.mockStart({ mins: 30, mix: 'easy' }, DS.mockPick(cands, { mins: 30, mix: 'easy' }, first));
  clock(10, 22, 18, 12);
  check(DS.mockEnd().used === 720, 'ending early records the time used');
  DS.mockSave(all(4));
  const h = DS.mockHistory();
  check(h.count === 2 && h.trend.length === 2 && h.trend[0].score === 61 && h.trend[1].score === 100, 'history keeps both mocks, oldest first');
  check(h.best === 100 && h.avg === 81 && h.change === 39, 'trend: best, average and change since the last one');
  check(DS.streak().current === 3, 'with the code pass the day before, mocks keep the streak going');
  // abandoning, broken data and erase
  DS.mockStart({ mins: 60 }, cands.slice(0, 2));
  DS.mockAbandon();
  check(DS.mockSession() === null && DS.mockHistory().count === 2, 'discarding a session keeps the history');
  store['dsaviz-mock-v1'] = '{broken';
  check(DS.mockSession() === null && DS.mockHistory().count === 0, 'a broken mock record reads as empty');
  store['dsaviz-mock-v1'] = JSON.stringify({ v: 1, live: { problems: [], startedAt: 1, mins: 45 }, history: [{ at: 1, score: 'x' }, null] });
  check(DS.mockSession() === null && DS.mockHistory().count === 0, 'a live session with no problems or bad history rows is ignored');
  DS.mockStart({ mins: 45 }, cands.slice(0, 1));
  DS.eraseProgress();
  check(DS.mockSession() === null, 'erasing progress clears mock interviews');
}

console.log(problems ? problems + ' problem(s)' : 'data clean');
if (problems) process.exitCode = 1;
