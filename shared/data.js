// @@DATA@@ — generated block (from shared/data.js): DS, the one data layer every page reads.
// Real learner data lives in this browser's localStorage. Features that need a server (league, buddies,
// other learners) return sample data marked demo: true, and pages show a "Demo" tag next to it.
// docs/BACKEND.md lists every function, its return shape and where a real API plugs in.
const DS = (function () {
  const KEY = { log: 'dsaviz-activity-v1', sheet: 'dsaviz-sheet-v1', deck: 'dsaviz-deck', onboard: 'dsaviz-onboard', prefs: 'dsaviz-prefs', user: 'dsaviz-user', medals: 'dsaviz-medals-seen', problem: 'dsaviz-problem' };
  const XP = { story: 50, code: 30, lesson: 30, sheet: 10, revisit: 5 };
  const XP_RULES = [['Finishing a story', XP.story], ['Passing a problem’s code tests', XP.code], ['Finishing a Git, system design or AI lesson', XP.lesson], ['Ticking a problem on the sheet', XP.sheet], ['Rating a revisit card', XP.revisit]];
  const LEVEL_XP = 500;
  const SHEET_SIZE = /*@@SHEET-SIZE@@*/216; // rows in the master sheet; the build fills in the count from shared/sheet.js
  const DAY = 86400000;
  let now = () => Date.now();

  function store() { try { return window.localStorage; } catch (e) { return null; } }
  function get(k) { const s = store(); try { return s ? s.getItem(k) : null; } catch (e) { return null; } }
  function set(k, v) { const s = store(); try { if (s) s.setItem(k, v); } catch (e) {} }
  // Parsed reads are cached by their raw string, so a render can ask many times for free.
  const cache = {};
  function json(k, fallback) {
    const raw = get(k);
    if (cache[k] && cache[k].raw === raw) return cache[k].val;
    let val = fallback;
    try { const v = JSON.parse(raw); if (v != null && typeof v === 'object') val = v; } catch (e) {}
    cache[k] = { raw, val };
    return val;
  }
  const pad = (n) => String(n).padStart(2, '0');
  function dayKey(ts) { const d = new Date(ts); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function midnight(ts) { const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function addDays(ts, n) { const d = new Date(ts); d.setDate(d.getDate() + n); return d.getTime(); }

  // -- the activity log: { v: 1, days: { 'YYYY-MM-DD': { story, code, lesson, revisit, xp } }, stories: { id: ts }, code: { id: ts }, lessons: { id: ts } }
  function readLog() {
    const o = json(KEY.log, null);
    const out = { v: 1, days: {}, stories: {}, code: {}, lessons: {} };
    if (!o || o.v !== 1) return out;
    ['days', 'stories', 'code', 'lessons'].forEach((k) => { if (o[k] && typeof o[k] === 'object' && !Array.isArray(o[k])) out[k] = o[k]; });
    return out;
  }
  function readSheet() {
    const o = json(KEY.sheet, null);
    const done = {}, star = {};
    if (o && o.v === 1) {
      if (o.done && typeof o.done === 'object') Object.keys(o.done).forEach((k) => { const ts = Number(o.done[k]); if (isFinite(ts) && ts > 0) done[k] = ts; });
      if (o.star && typeof o.star === 'object') Object.keys(o.star).forEach((k) => { if (o.star[k]) star[k] = 1; });
    }
    return { done, star };
  }
  // kind: 'story' | 'code' | 'lesson' | 'revisit'. Lesson ids are prefixed: 'git:', 'sd:', 'ai:'. Sheet ticks need no call: they are read from dsaviz-sheet-v1.
  function logActivity(kind, id) {
    if (!XP[kind] || kind === 'sheet') return null;
    const ts = now();
    const log = JSON.parse(JSON.stringify(readLog()));
    const k = dayKey(ts);
    const day = log.days[k] = Object.assign({ story: 0, code: 0, lesson: 0, revisit: 0, xp: 0 }, log.days[k]);
    day[kind] = (day[kind] || 0) + 1;
    let first = true;
    if (kind === 'story' || kind === 'code' || kind === 'lesson') {
      const book = kind === 'story' ? log.stories : kind === 'code' ? log.code : log.lessons;
      first = !(id in book);
      if (first && id) book[id] = ts;
    }
    if (first) day.xp = (day.xp || 0) + XP[kind];
    set(KEY.log, JSON.stringify(log));
    return { day: k, first, xp: first ? XP[kind] : 0 };
  }

  // -- per-day activity: the log plus sheet ticks, keyed by local date
  function days() {
    const log = readLog(), sheet = readSheet();
    const out = {};
    const at = (k) => out[k] || (out[k] = { story: 0, code: 0, lesson: 0, sheet: 0, revisit: 0, xp: 0, total: 0 });
    Object.keys(log.days).forEach((k) => {
      const d = log.days[k] || {}, o = at(k);
      ['story', 'code', 'lesson', 'revisit'].forEach((x) => { o[x] += Math.max(0, Number(d[x]) || 0); });
      o.xp += Math.max(0, Number(d.xp) || 0);
    });
    Object.keys(sheet.done).forEach((id) => { const o = at(dayKey(sheet.done[id])); o.sheet++; o.xp += XP.sheet; });
    Object.keys(out).forEach((k) => { const o = out[k]; o.total = o.story + o.code + o.lesson + o.sheet + o.revisit; if (!o.total) delete out[k]; });
    return out;
  }

  // -- streak: consecutive active days. A streak that ran through yesterday is still alive today (atRisk).
  function streak() {
    const map = days();
    const today = midnight(now());
    const on = (ts) => !!map[dayKey(ts)];
    const activeToday = on(today);
    let current = 0;
    let cur = activeToday ? today : addDays(today, -1);
    while (on(cur)) { current++; cur = addDays(cur, -1); }
    const keys = Object.keys(map).sort();
    let longest = 0, run = 0, prev = null;
    keys.forEach((k) => {
      const [y, m, d] = k.split('-').map(Number);
      const ts = new Date(y, m - 1, d).getTime();
      run = prev !== null && dayKey(addDays(prev, 1)) === k ? run + 1 : 1;
      longest = Math.max(longest, run);
      prev = ts;
    });
    // This week, Monday first.
    const dow = (new Date(today).getDay() + 6) % 7;
    const monday = addDays(today, -dow);
    const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => {
      const ts = addDays(monday, i);
      return { d, date: dayKey(ts), on: on(ts), today: i === dow, future: ts > today };
    });
    return { current, longest: Math.max(longest, current), activeToday, atRisk: current > 0 && !activeToday, week };
  }

  // -- heatmap: `weeks` columns ending this week, Sunday first (GitHub layout)
  function heatmap(weeks) {
    weeks = weeks || 26;
    const map = days();
    const today = midnight(now());
    const start = addDays(today, -(new Date(today).getDay()) - (weeks - 1) * 7);
    const cells = [];
    let total = 0, active = 0;
    for (let i = 0; i < weeks * 7; i++) {
      const ts = addDays(start, i);
      const k = dayKey(ts);
      const d = map[k];
      const n = d ? d.total : 0;
      const future = ts > today;
      if (!future) { total += n; if (n) active++; }
      cells.push({ date: k, ts, n, story: d ? d.story : 0, sheet: d ? d.sheet : 0, code: d ? d.code : 0, lesson: d ? d.lesson : 0, revisit: d ? d.revisit : 0,
        level: n === 0 ? 0 : n < 2 ? 1 : n < 4 ? 2 : n < 6 ? 3 : 4, future, today: ts === today });
    }
    return { weeks, cells, total, activeDays: active, todayIndex: cells.findIndex((c) => c.today) };
  }

  // -- XP: earned per day, so "this week" is a real sum
  function xp() {
    const map = days();
    const today = midnight(now());
    const monday = addDays(today, -((new Date(today).getDay() + 6) % 7));
    let total = 0, week = 0, todayXp = 0;
    Object.keys(map).forEach((k) => {
      const [y, m, d] = k.split('-').map(Number);
      const ts = new Date(y, m - 1, d).getTime();
      total += map[k].xp;
      if (ts >= monday && ts <= today) week += map[k].xp;
      if (ts === today) todayXp += map[k].xp;
    });
    const level = Math.floor(total / LEVEL_XP) + 1;
    const into = total % LEVEL_XP;
    return { total, week, today: todayXp, level, into, need: LEVEL_XP, pct: Math.round((into / LEVEL_XP) * 100) };
  }

  // -- problems and stories
  function stories() { const s = readLog().stories; return { ids: Object.keys(s), count: Object.keys(s).length, at: s }; }
  function lessons() { const l = readLog().lessons; return { ids: Object.keys(l), count: Object.keys(l).length }; }
  function codePasses() { const c = readLog().code; return { ids: Object.keys(c), count: Object.keys(c).length }; }
  function sheet() { const s = readSheet(); return { ticked: Object.keys(s.done).length, starred: Object.keys(s.star).length, total: typeof SHEET !== 'undefined' && SHEET.length ? SHEET.length : SHEET_SIZE, done: s.done }; }
  function problemStatus(id) {
    const log = readLog();
    if (id in log.stories || id in log.code) return 'done';
    return get(KEY.problem) === id ? 'now' : 'todo';
  }
  // The catalog ships every problem as "todo"; this makes `p.status` read the learner's real progress.
  function bindCatalog(list) {
    (list || []).forEach((p) => { try { Object.defineProperty(p, 'status', { get: () => problemStatus(p.id), configurable: true, enumerable: true }); } catch (e) {} });
  }
  function patterns(list, pats) {
    return (pats || []).map(([name, tag, who]) => {
      const all = (list || []).filter((p) => p.pattern === name);
      const done = all.filter((p) => problemStatus(p.id) === 'done').length;
      return { name, tag, companion: who, done, total: all.length, pct: all.length ? Math.round((done / all.length) * 100) : 0 };
    });
  }

  // -- medals: bronze = first story in the pattern, silver = half its stories, gold = all of them and each rated in Revisit
  const TIERS = ['bronze', 'silver', 'gold'];
  function medals(list, pats) {
    const deck = json(KEY.deck, {});
    const seen = json(KEY.medals, {});
    return patterns(list, pats).filter((p) => p.total > 0).map((p) => {
      const ids = (list || []).filter((x) => x.pattern === p.name).map((x) => x.id);
      const rated = ids.filter((id) => problemStatus(id) === 'done' && deck[id]).length;
      const half = Math.ceil(p.total / 2);
      const tier = p.done === p.total && rated === p.total ? 'gold' : p.done >= half ? 'silver' : p.done >= 1 ? 'bronze' : null;
      const nextTier = tier === 'gold' ? null : TIERS[tier ? TIERS.indexOf(tier) + 1 : 0];
      const next = !nextTier ? null : nextTier === 'bronze' ? { tier: nextTier, have: 0, need: 1, unit: 'story' }
        : nextTier === 'silver' ? { tier: nextTier, have: p.done, need: half, unit: 'stories' }
        : p.done < p.total ? { tier: nextTier, have: p.done, need: p.total, unit: 'stories' } : { tier: nextTier, have: rated, need: p.total, unit: 'rated' };
      if (next) next.pct = Math.round((next.have / Math.max(1, next.need)) * 100);
      const key = p.name + ':' + tier;
      return { pattern: p.name, mark: p.name.split(/[\s&-]+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase(), tier, next, fresh: !!tier && !seen[key], key, done: p.done, total: p.total };
    });
  }
  function markMedalsSeen(list) {
    const seen = Object.assign({}, json(KEY.medals, {}));
    (list || []).forEach((m) => { if (m.tier) seen[m.key] = 1; });
    set(KEY.medals, JSON.stringify(seen));
  }

  // -- the learner, as far as this browser knows them
  function profile() {
    const ob = json(KEY.onboard, {});
    const prefs = json(KEY.prefs, {});
    const name = typeof ob.name === 'string' && ob.name.trim() ? ob.name.trim().slice(0, 40) : '';
    const initials = name ? name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase() : '';
    const s = stories(), sh = sheet();
    return { name, initials, signedIn: get(KEY.user) === '1', isNew: !s.count && !sh.ticked && !codePasses().count && !lessons().count,
      lang: prefs.lang || '', goal: prefs.goal || '', reason: ob.reason || '', date: ob.date || '', demo: false };
  }

  // -- demo-only data: these need accounts and a server. The learner's own row is always real.
  const PEOPLE = [['Priya Iyer', 'Chennai', 2140, 31], ['Karthik Reddy', 'Hyderabad', 1985, 27], ['Sneha Kulkarni', 'Pune', 1760, 22], ['Arjun Mehta', 'Jaipur', 1640, 19],
    ['Fatima Shaikh', 'Mumbai', 1590, 17], ['Vikram Singh', 'Chandigarh', 1520, 15], ['Ananya Rao', 'Bengaluru', 1470, 12], ['Rohit Verma', 'Delhi', 1400, 5],
    ['Meera Nair', 'Kochi', 1350, 2], ['Aditya Joshi', 'Indore', 1290, 9], ['Kavya Pillai', 'Thiruvananthapuram', 1240, 8], ['Harsh Agarwal', 'Lucknow', 1180, 6],
    ['Ritika Banerjee', 'Kolkata', 1120, 4], ['Rahul Menon', 'Noida', 1060, 7], ['Pooja Desai', 'Surat', 990, 3], ['Nikhil Bhat', 'Mangaluru', 920, 2],
    ['Zoya Khan', 'Bhopal', 860, 1], ['Aman Chauhan', 'Dehradun', 780, 1], ['Lakshmi Narayanan', 'Coimbatore', 690, 1]];
  const BOARDS = { league: [1, 19], all: [42, 19], friends: [1, 6], college: [3, 12] };
  function leaderboard(tab) {
    tab = BOARDS[tab] ? tab : 'league';
    const [scale, size] = BOARDS[tab];
    const me = profile(), x = xp(), st = streak();
    const pool = tab === 'friends' ? PEOPLE.filter((p, i) => [6, 7, 8, 1, 4, 15].includes(i)) : PEOPLE.slice(0, size);
    const rows = pool.map(([name, where, w, streakDays], i) => ({ name, where, xp: Math.round(w * scale), streak: streakDays, me: false, seed: i }))
      .concat([{ name: me.name || 'You', where: 'This browser', xp: tab === 'league' || tab === 'friends' ? x.week : x.total, streak: st.current, me: true, seed: 99 }])
      .sort((a, b) => b.xp - a.xp || (a.me ? 1 : -1));
    rows.forEach((r, i) => { r.rank = i + 1; });
    const you = rows.find((r) => r.me);
    const promoteAt = tab === 'league' ? rows[6] : null;
    return { demo: true, tab, rows, you: { rank: you.rank, of: rows.length, xp: you.xp, toPromotion: promoteAt && !promoteAt.me && you.rank > 7 ? promoteAt.xp - you.xp + 1 : 0 } };
  }
  function buddies() {
    return { demo: true, list: [['Ananya Rao', 'AR', 'Final year · PES University', 12, true], ['Rohit Verma', 'RV', 'SDE-1 · Bengaluru', 5, false], ['Meera Nair', 'MN', 'M.Tech · IIIT Hyderabad', 2, false]]
      .map(([name, initials, where, streakDays, today]) => ({ name, initials, where, streak: streakDays, learnedToday: today })) };
  }
  function feed() {
    return { demo: true, list: [['Sneha in Pune', 'started', 'The Campfire Trio', '2P'], ['Karthik in Bengaluru', 'finished', 'Islands on the Map', 'DFS'],
      ['Farhan in Hyderabad', 'hit a 30-day streak on', 'The Coat-Check Counter', 'HM'], ['Divya in Chennai', 'unlocked', 'Stacks, queues & heaps', 'LVL'],
      ['Rahul in Gurugram', 'started a mock on', 'The Train Yard Merge', 'MOCK'], ['Neha in Kolkata', 'solved at expert depth', 'The Exact Change Counter', 'DP']]
      .map(([who, verb, what, tag]) => ({ who, verb, what, tag })) };
  }

  return {
    KEY, XP, XP_RULES, LEVEL_XP, dayKey,
    logActivity, finishStory: (id) => logActivity('story', id), passCode: (id) => logActivity('code', id), finishLesson: (id) => logActivity('lesson', id), rateCard: (id) => logActivity('revisit', id),
    days, streak, heatmap, xp, stories, codePasses, lessons, sheet, problemStatus, bindCatalog, patterns, medals, markMedalsSeen, profile,
    leaderboard, buddies, feed,
    setClock: (fn) => { now = typeof fn === 'function' ? fn : () => Date.now(); }
  };
})();
if (typeof PROBLEMS !== 'undefined') DS.bindCatalog(PROBLEMS);
// @@END-DATA@@
