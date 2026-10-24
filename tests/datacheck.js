// Data layer test: loads shared/data.js with a fake localStorage and a fake clock, then checks
// the empty state, activity logging, streak math across days, sheet ticks, medals and demo flags.
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
  const window = { localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } } };
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
  check(day && day.story === 2 && day.code === 1 && day.revisit === 1 && day.total === 4, 'today holds every activity');
  check(DS.xp().total === DS.XP.story + DS.XP.code + DS.XP.revisit, 'XP adds story, code and revisit');
  check(DS.streak().current === 1 && DS.streak().activeToday, 'one active day is a 1-day streak');
  check(JSON.parse(store['dsaviz-activity-v1']).v === 1, 'log is versioned in dsaviz-activity-v1');
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

console.log(problems ? problems + ' problem(s)' : 'data clean');
if (problems) process.exitCode = 1;
