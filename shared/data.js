// @@DATA@@ — generated block (from shared/data.js): DS, the one data layer every page reads.
// Real learner data lives in this browser's localStorage. Features that need a server (league, buddies,
// other learners) return sample data marked demo: true, and pages show a "Demo" tag next to it.
// docs/BACKEND.md lists every function, its return shape and where a real API plugs in.
const DS = (function () {
  const KEY = { log: 'dsaviz-activity-v1', sheet: 'dsaviz-sheet-v1', deck: 'dsaviz-deck', onboard: 'dsaviz-onboard', prefs: 'dsaviz-prefs', user: 'dsaviz-user', medals: 'dsaviz-medals-seen', problem: 'dsaviz-problem', review: 'dsaviz-review-v1', notes: 'dsaviz-notes-v1', predict: 'dsaviz-predict-v1', mock: 'dsaviz-mock-v1', start: 'dsaviz-start-v1', editor: 'dsaviz-editor-v1', subs: 'dsaviz-submissions-v1', streak: 'dsaviz-streak-v1' };
  const XP = { story: 50, code: 30, lesson: 30, sheet: 10, revisit: 5, mock: 20, start: 10 };
  const XP_RULES = [['Finishing a story', XP.story], ['Passing a problem’s code tests', XP.code], ['Finishing a Git, system design or AI lesson', XP.lesson], ['Ticking a problem on the sheet', XP.sheet], ['Rating a revisit card', XP.revisit], ['Finishing a mock interview', XP.mock], ['Passing a Start here exercise', XP.start]];
  const LEVEL_XP = 500;
  const SHEET_SIZE = /*@@SHEET-SIZE@@*/216;
  // Start here medals: Level 1 has one per chapter and one for the bridge; Levels 2 and 3 have one per part.
  // { level, part, label, mark, lessons: [ids], exercises: [ids] }. The build fills it in from src/start (scripts/build_start.js).
  const START_MEDALS = /*@@START-MEDALS@@*/[];
  // Every Start here lesson, in order: [id, level, part, n, short, ready (1 or 0)]. The one source of lesson counts on
  // every page (the hub, the roadmap, Home, Profile): startCounts() below. Built from src/start/chapters.js.
  const START_OUTLINE = /*@@START-OUTLINE@@*/[];
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
    const out = { v: 1, days: {}, stories: {}, code: {}, lessons: {}, start: {} };
    if (!o || o.v !== 1) return out;
    ['days', 'stories', 'code', 'lessons', 'start'].forEach((k) => { if (o[k] && typeof o[k] === 'object' && !Array.isArray(o[k])) out[k] = o[k]; });
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
  // kind: 'story' | 'code' | 'lesson' | 'revisit' | 'mock' | 'start'. Lesson ids are prefixed: 'git:', 'sd:', 'ai:', 'dsa:' (a DSA concept lesson), 'start:' (a Start here chapter).
  // 'start' is one Start here exercise passed (its id is the exercise id); it counts once per exercise. Sheet ticks need no call: they are read from dsaviz-sheet-v1.
  function logActivity(kind, id) {
    if (!XP[kind] || kind === 'sheet') return null;
    const ts = now();
    const log = JSON.parse(JSON.stringify(readLog()));
    const k = dayKey(ts);
    const day = log.days[k] = Object.assign({ story: 0, code: 0, lesson: 0, revisit: 0, mock: 0, start: 0, xp: 0 }, log.days[k]);
    day[kind] = (day[kind] || 0) + 1;
    let first = true;
    if (kind === 'story' || kind === 'code' || kind === 'lesson' || kind === 'start') {
      if (kind === 'start' && !log.start) log.start = {};
      const book = kind === 'story' ? log.stories : kind === 'code' ? log.code : kind === 'start' ? log.start : log.lessons;
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
    const at = (k) => out[k] || (out[k] = { story: 0, code: 0, lesson: 0, sheet: 0, revisit: 0, mock: 0, start: 0, xp: 0, total: 0 });
    Object.keys(log.days).forEach((k) => {
      const d = log.days[k] || {}, o = at(k);
      ['story', 'code', 'lesson', 'revisit', 'mock', 'start'].forEach((x) => { o[x] += Math.max(0, Number(d[x]) || 0); });
      o.xp += Math.max(0, Number(d.xp) || 0);
    });
    Object.keys(sheet.done).forEach((id) => { const o = at(dayKey(sheet.done[id])); o.sheet++; o.xp += XP.sheet; });
    Object.keys(out).forEach((k) => { const o = out[k]; o.total = o.story + o.code + o.lesson + o.sheet + o.revisit + o.mock + o.start; if (!o.total) delete out[k]; });
    return out;
  }

  // -- streak: consecutive active days. A streak that ran through yesterday is still alive today (atRisk).
  // A freeze (dsaviz-streak-v1, below) bridges one missed day: the streak runs through it, but it adds no day.
  function streak() {
    const map = days(), frozen = readStreakX().frozen;
    const today = midnight(now());
    const on = (ts) => !!map[dayKey(ts)];
    const kept = (ts) => on(ts) || !!frozen[dayKey(ts)];
    const activeToday = on(today);
    const current = runFrom(activeToday ? today : addDays(today, -1), on, kept);
    const keys = Object.keys(Object.assign({}, map, frozen)).sort();
    let longest = 0, run = 0, prev = null;
    keys.forEach((k) => {
      const [y, m, d] = k.split('-').map(Number);
      const ts = new Date(y, m - 1, d).getTime();
      const add = map[k] ? 1 : 0;
      run = prev !== null && dayKey(addDays(prev, 1)) === k ? run + add : add;
      longest = Math.max(longest, run);
      prev = ts;
    });
    // This week, Monday first.
    const dow = (new Date(today).getDay() + 6) % 7;
    const monday = addDays(today, -dow);
    const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => {
      const ts = addDays(monday, i);
      return { d, date: dayKey(ts), on: on(ts), frozen: !on(ts) && !!frozen[dayKey(ts)], today: i === dow, future: ts > today };
    });
    const fz = freezeState();
    return { current, longest: Math.max(longest, current), activeToday, atRisk: current > 0 && !activeToday, week,
      freeze: { available: fz.available, offer: fz.offer, usedThisWeek: fz.usedThisWeek } };
  }
  // Active days counted back from `from` while the chain holds (a frozen day keeps it going without counting).
  function runFrom(from, on, kept) {
    let n = 0, cur = from;
    while (kept(cur)) { if (on(cur)) n++; cur = addDays(cur, -1); }
    return n;
  }

  // -- streak freeze and the daily check-in: dsaviz-streak-v1 = { v: 1, frozen: { 'YYYY-MM-DD': ts used }, seen: 'YYYY-MM-DD' }.
  // One freeze a week (Monday to Sunday, by the day it is used), earned by a run of at least FREEZE_RUN active days.
  // It only bridges yesterday, when yesterday was missed and the day before was active: exactly one day missed.
  const FREEZE_RUN = 3;
  function readStreakX() {
    const o = json(KEY.streak, null);
    const out = { v: 1, frozen: {}, seen: '' };
    if (!o || o.v !== 1) return out;
    if (o.frozen && typeof o.frozen === 'object' && !Array.isArray(o.frozen)) Object.keys(o.frozen).forEach((k) => { const ts = Number(o.frozen[k]); if (/^\d{4}-\d\d-\d\d$/.test(k) && isFinite(ts) && ts > 0) out.frozen[k] = ts; });
    if (typeof o.seen === 'string' && /^\d{4}-\d\d-\d\d$/.test(o.seen)) out.seen = o.seen;
    return out;
  }
  function writeStreakX(o) { set(KEY.streak, JSON.stringify({ v: 1, frozen: o.frozen, seen: o.seen })); }
  function weekStart(ts) { const t = midnight(ts); return addDays(t, -((new Date(t).getDay() + 6) % 7)); }
  function freezeState() {
    const map = days(), frozen = readStreakX().frozen;
    const today = midnight(now()), yest = addDays(today, -1), before = addDays(today, -2);
    const on = (ts) => !!map[dayKey(ts)];
    const kept = (ts) => on(ts) || !!frozen[dayKey(ts)];
    const monday = weekStart(now());
    const usedThisWeek = Object.keys(frozen).some((k) => frozen[k] >= monday);
    const keeps = on(before) ? runFrom(before, on, kept) : 0;
    const live = runFrom(on(today) ? today : yest, on, kept);
    const offer = !usedThisWeek && !kept(yest) && keeps >= FREEZE_RUN;
    return { offer, usedThisWeek, keeps, missed: dayKey(yest), available: !usedThisWeek && (live >= FREEZE_RUN || offer) };
  }
  // Use the week's freeze on yesterday. Returns the new streak, or null when no freeze can be used.
  function useFreeze() {
    const f = freezeState();
    if (!f.offer) return null;
    const o = readStreakX();
    o.frozen[f.missed] = now();
    writeStreakX(o);
    return streak();
  }
  // The daily modal: shown on the first visit of each local day, once the learner has done anything.
  // day is the streak day today counts as (the streak so far plus today); broken: the streak ended and no freeze can save it.
  function daily() {
    const st = streak(), f = freezeState();
    const any = Object.keys(days()).length > 0;
    return { show: any && readStreakX().seen !== dayKey(now()), day: st.activeToday ? st.current : st.current + 1, current: st.current,
      activeToday: st.activeToday, broken: !st.activeToday && st.current === 0 && !f.offer, offer: f.offer, keeps: f.keeps };
  }
  function markDailySeen() { const o = readStreakX(); o.seen = dayKey(now()); writeStreakX(o); }

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
      cells.push({ date: k, ts, n, story: d ? d.story : 0, sheet: d ? d.sheet : 0, code: d ? d.code : 0, lesson: d ? d.lesson : 0, revisit: d ? d.revisit : 0, mock: d ? d.mock : 0,
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
    return patternMedals(list, pats).concat(startMedals());
  }
  function patternMedals(list, pats) {
    const deck = json(KEY.deck, {});
    const seen = json(KEY.medals, {});
    return patterns(list, pats).filter((p) => p.total > 0).map((p) => {
      const ids = (list || []).filter((x) => x.pattern === p.name).map((x) => x.id);
      const rev = readReview().cards;
      const rated = ids.filter((id) => problemStatus(id) === 'done' && (deck[id] || (rev[id] && rev[id].last))).length;
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
  // The beginner medal set: bronze for one lesson of the chapter, silver for half, gold for every lesson and exercise.
  function startMedals() {
    const S = readStart(), seen = json(KEY.medals, {});
    return START_MEDALS.map((g) => {
      const done = g.lessons.filter((id) => S.done[id]).length, total = g.lessons.length;
      const ex = g.exercises.filter((id) => S.ex[id]).length;
      const half = Math.ceil(total / 2);
      const tier = done === total && ex === g.exercises.length ? 'gold' : done >= half ? 'silver' : done >= 1 ? 'bronze' : null;
      const nextTier = tier === 'gold' ? null : TIERS[tier ? TIERS.indexOf(tier) + 1 : 0];
      const next = !nextTier ? null : nextTier === 'bronze' ? { tier: nextTier, have: 0, need: 1, unit: 'lesson' }
        : nextTier === 'silver' ? { tier: nextTier, have: done, need: half, unit: 'lessons' }
        : done < total ? { tier: nextTier, have: done, need: total, unit: 'lessons' } : { tier: nextTier, have: ex, need: g.exercises.length, unit: 'exercises' };
      if (next) next.pct = Math.round((next.have / Math.max(1, next.need)) * 100);
      const key = 'start:' + g.part + ':' + tier;
      return { pattern: g.label, mark: g.mark, tier, next, fresh: !!tier && !seen[key], key, done, total, start: true };
    });
  }
  // Lesson counts for a level (a number, or null for every level) or for a list of lesson ids (a roadmap node).
  // done counts finished lessons and lessons the placement check marked known. Ids that are not lessons are left out.
  function startCounts(level, ids) {
    const S = readStart(), pick = ids ? {} : null;
    (ids || []).forEach((id) => { pick[id] = 1; });
    const rows = START_OUTLINE.filter((r) => (level == null || r[1] === level) && (!pick || pick[r[0]]));
    const done = rows.filter((r) => S.done[r[0]] || S.skip[r[0]]).length;
    return { total: rows.length, ready: rows.filter((r) => r[5]).length, done, pct: rows.length ? Math.round((done / rows.length) * 100) : 0, ids: rows.map((r) => r[0]) };
  }
  function startOutline() { return START_OUTLINE; }
  // Level 1 of Start here as one ring: lessons done (or marked known) out of all of them. null before the learner starts.
  function startRing() {
    const S = readStart(), c = startCounts(1);
    if (!c.total || (!c.done && !Object.keys(S.ex).length && !S.last)) return null;
    return { name: 'Start here', done: c.done, total: c.total, pct: c.pct };
  }
  function markMedalsSeen(list) {
    const seen = Object.assign({}, json(KEY.medals, {}));
    (list || []).forEach((m) => { if (m.tier) seen[m.key] = 1; });
    set(KEY.medals, JSON.stringify(seen));
  }

  // -- spaced repetition. Every finished story and every ticked sheet problem is a card; the card's schedule
  // lives in dsaviz-review-v1: { v: 1, cards: { id: { due, interval, ease, reps, lapses, last, grade, name, pattern, rule, hint, story } }, log: [{ id, at, grade }] }.
  // Sheet cards are 'sheet:<slug>'. A card with no schedule yet is due the day after it was finished or ticked.
  const GRADES = ['Again', 'Hard', 'Good', 'Easy'];
  const EASE = { start: 2.5, min: 1.3, max: 3.0 };
  const MAX_INTERVAL = 365;
  function readReview() {
    const o = json(KEY.review, null);
    const out = { v: 1, cards: {}, log: [] };
    if (!o || o.v !== 1) return out;
    if (o.cards && typeof o.cards === 'object' && !Array.isArray(o.cards)) Object.keys(o.cards).forEach((id) => { const c = o.cards[id]; if (c && typeof c === 'object') out.cards[id] = c; });
    if (Array.isArray(o.log)) out.log = o.log.filter((x) => x && typeof x.id === 'string' && isFinite(x.at) && x.grade >= 1 && x.grade <= 4);
    return out;
  }
  function writeReview(r) { set(KEY.review, JSON.stringify(r)); }
  const fromKey = (k) => { const [y, m, d] = String(k).split('-').map(Number); return new Date(y, m - 1, d).getTime(); };
  const daysBetween = (a, b) => Math.round((midnight(b) - midnight(a)) / DAY);
  // The scheduler, SM-2 style: grade 1 Again, 2 Hard, 3 Good, 4 Easy. Pure: takes a card's state, returns the next one.
  // First review: Hard 1 day, Good 3, Easy 6. After that the gap grows by 1.2 (Hard), the ease (Good) or ease x 1.3 (Easy),
  // always by at least a day. Again resets the card to tomorrow and lowers its ease. Ease stays within 1.3 to 3.0.
  function schedule(card, grade, ts) {
    grade = Math.max(1, Math.min(4, Math.round(Number(grade) || 1)));
    const c = card || {};
    const reps = Math.max(0, Number(c.reps) || 0), prev = Math.max(0, Number(c.interval) || 0);
    let ease = Math.max(EASE.min, Math.min(EASE.max, Number(c.ease) || EASE.start));
    let interval;
    if (grade === 1) { interval = 1; ease = Math.max(EASE.min, ease - 0.2); }
    else if (reps === 0) interval = [0, 0, 1, 3, 6][grade];
    else {
      const grow = grade === 2 ? 1.2 : grade === 3 ? ease : ease * 1.3;
      interval = Math.max(prev + 1, Math.round(prev * grow));
      if (grade === 2) ease = Math.max(EASE.min, ease - 0.15);
      if (grade === 4) ease = Math.min(EASE.max, ease + 0.15);
    }
    interval = Math.min(MAX_INTERVAL, interval);
    const at = ts == null ? now() : ts;
    return { interval, ease: Math.round(ease * 100) / 100, reps: grade === 1 ? 0 : reps + 1, lapses: (Number(c.lapses) || 0) + (grade === 1 ? 1 : 0),
      grade, last: at, due: dayKey(addDays(midnight(at), interval)) };
  }
  // Every card the learner has earned, merged with its schedule and any details pages stored. Soonest due first.
  function reviewCards() {
    const log = readLog(), sh = readSheet(), rev = readReview();
    const today = dayKey(now());
    const out = [];
    const add = (id, kind, added) => {
      const c = rev.cards[id] || {};
      const due = typeof c.due === 'string' && /^\d{4}-\d\d-\d\d$/.test(c.due) ? c.due : dayKey(addDays(midnight(added), 1));
      out.push({ id, kind, added, due, isDue: due <= today, late: Math.max(0, daysBetween(fromKey(due), now())), inDays: Math.max(0, daysBetween(now(), fromKey(due))),
        interval: Number(c.interval) || 0, ease: Number(c.ease) || EASE.start, reps: Number(c.reps) || 0, lapses: Number(c.lapses) || 0, last: Number(c.last) || 0, grade: Number(c.grade) || 0,
        name: c.name || '', pattern: c.pattern || '', rule: c.rule || '', hint: c.hint || '', story: c.story || '' });
    };
    Object.keys(log.stories).forEach((id) => add(id, 'story', Number(log.stories[id]) || now()));
    // Finished Start here lessons come back as cards too: 'start:<lesson>'.
    Object.keys(log.lessons).filter((id) => id.indexOf('start:') === 0).forEach((id) => add(id, 'start', Number(log.lessons[id]) || now()));
    Object.keys(sh.done).forEach((slug) => {
      const c = rev.cards['sheet:' + slug];
      if (slug in log.stories || (c && c.story && c.story in log.stories)) return; // the story card already covers this problem
      add('sheet:' + slug, 'sheet', sh.done[slug]);
    });
    return out.sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : a.added - b.added));
  }
  function reviewDue() { return reviewCards().filter((c) => c.isDue); }
  // Upcoming: cards not due today, soonest first, plus a count per day for the next `days` days (index 0 is tomorrow).
  function reviewUpcoming(days) {
    days = days || 7;
    const cards = reviewCards().filter((c) => !c.isDue);
    const counts = [];
    for (let i = 1; i <= days; i++) { const k = dayKey(addDays(midnight(now()), i)); counts.push({ date: k, n: cards.filter((c) => c.due === k).length }); }
    return { cards, counts };
  }
  // Remember details a page knows (name, pattern, key rule, hint, story id) without changing the schedule.
  function addCard(id, meta) {
    if (!id) return;
    const r = readReview();
    const c = Object.assign({}, r.cards[id]);
    ['name', 'pattern', 'rule', 'hint', 'story'].forEach((k) => { if (meta && typeof meta[k] === 'string' && meta[k]) c[k] = meta[k].slice(0, 400); });
    r.cards[id] = c;
    writeReview(r);
  }
  // Rate a card 1-4. Logs a revisit for the streak and XP, and returns the card's new schedule.
  // With { redo: true } a learner who changes their mind straight after rating re-rates from the state before
  // that rating: the last log entry is replaced and no extra XP is given.
  const SCHED = ['interval', 'ease', 'reps', 'lapses', 'grade', 'last', 'due'];
  function review(id, grade, opts) {
    if (!id) return null;
    const r = readReview();
    const cur = r.cards[id] || {};
    const last = r.log[r.log.length - 1];
    const redo = !!(opts && opts.redo && cur.prev && last && last.id === id);
    const base = redo ? cur.prev : cur;
    const next = schedule(base, grade, now());
    const prev = {};
    SCHED.forEach((k) => { if (base[k] !== undefined) prev[k] = base[k]; });
    const card = Object.assign({}, cur, next, { prev });
    SCHED.forEach((k) => { if (next[k] === undefined) delete card[k]; });
    r.cards[id] = card;
    if (redo) r.log.pop();
    r.log.push({ id, at: now(), grade: next.grade });
    if (r.log.length > 2000) r.log = r.log.slice(-2000);
    writeReview(r);
    if (!redo) logActivity('revisit', id);
    return next;
  }
  function whenLabel(n) { return n <= 1 ? 'tomorrow' : n < 14 ? 'in ' + n + ' days' : n < 60 ? 'in ' + Math.round(n / 7) + ' weeks' : 'in ' + Math.round(n / 30) + ' months'; }
  // What each grade would do to a card now: [{ grade, label, interval, when }].
  function reviewPreview(id, opts) {
    const c = (opts && opts.redo && (readReview().cards[id] || {}).prev) || readReview().cards[id];
    return GRADES.map((label, i) => { const s = schedule(c, i + 1, now()); return { grade: i + 1, label, interval: s.interval, when: whenLabel(s.interval) }; });
  }
  // Retention: the share of reviews in the last 30 days that were not "Again". pct is null until the first review.
  function retention(windowDays) {
    windowDays = windowDays || 30;
    const since = addDays(midnight(now()), -windowDays + 1);
    const recent = readReview().log.filter((x) => x.at >= since);
    const recalled = recent.filter((x) => x.grade > 1).length;
    const today = dayKey(now());
    return { pct: recent.length ? Math.round((recalled / recent.length) * 100) : null, reviews: recent.length, recalled, windowDays,
      today: recent.filter((x) => dayKey(x.at) === today).length };
  }

  // -- notes per problem: dsaviz-notes-v1 = { v: 1, notes: { id: { text, at } } }. The story page uses the catalog id;
  // sheet rows use their story id when they have one (so both places share a note), else the row id.
  const NOTE_MAX = 2000;
  function readNotes() {
    const o = json(KEY.notes, null);
    const out = {};
    if (o && o.v === 1 && o.notes && typeof o.notes === 'object') Object.keys(o.notes).forEach((id) => { const n = o.notes[id]; if (n && typeof n.text === 'string' && n.text.trim()) out[id] = { text: n.text.slice(0, NOTE_MAX), at: Number(n.at) || 0 }; });
    return out;
  }
  function note(id) { const n = readNotes()[id]; return n ? n.text : ''; }
  function setNote(id, text) {
    if (!id) return;
    const all = Object.assign({}, readNotes());
    const t = typeof text === 'string' ? text.slice(0, NOTE_MAX) : '';
    if (t.trim()) all[id] = { text: t, at: now() }; else delete all[id];
    set(KEY.notes, JSON.stringify({ v: 1, notes: all }));
  }
  // Merge notes from a backup: a missing note is added; a different one replaces ours only when it is newer. Returns how many changed.
  function mergeNotes(incoming) {
    if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) return 0;
    const all = Object.assign({}, readNotes());
    let changed = 0;
    Object.keys(incoming).forEach((id) => {
      const n = incoming[id];
      const text = n && typeof n === 'object' ? n.text : n;
      if (typeof text !== 'string' || !text.trim()) return;
      const at = (n && typeof n === 'object' && Number(n.at)) || 0;
      if (!all[id] || (all[id].text !== text && at > all[id].at)) { all[id] = { text: text.slice(0, NOTE_MAX), at }; changed++; }
    });
    if (changed) set(KEY.notes, JSON.stringify({ v: 1, notes: all }));
    return changed;
  }

  // -- editor preferences: dsaviz-editor-v1 = { v: 1, fontSize, tabSize, wrap, relative, vim, brackets, autocomplete, celebrate }.
  // tabSize 0 means the language's own indent (4 spaces, 2 for JavaScript and SQL).
  const EDITOR_DEFAULTS = { fontSize: 16, tabSize: 0, wrap: false, relative: false, vim: false, brackets: true, autocomplete: true, celebrate: true };
  const EDITOR_FONT = [12, 20];
  function editorPrefs() {
    const o = json(KEY.editor, null);
    const out = Object.assign({}, EDITOR_DEFAULTS);
    if (!o || o.v !== 1) return out;
    const fs = Number(o.fontSize);
    if (fs === Math.round(fs) && fs >= EDITOR_FONT[0] && fs <= EDITOR_FONT[1]) out.fontSize = fs;
    if (o.tabSize === 0 || o.tabSize === 2 || o.tabSize === 4) out.tabSize = o.tabSize;
    ['wrap', 'relative', 'vim', 'brackets', 'autocomplete', 'celebrate'].forEach((k) => { if (typeof o[k] === 'boolean') out[k] = o[k]; });
    return out;
  }
  // Change some preferences; a value that does not fit is dropped on the next read. Returns them all.
  function setEditorPrefs(patch) {
    const next = Object.assign(editorPrefs(), patch && typeof patch === 'object' ? patch : {});
    set(KEY.editor, JSON.stringify(Object.assign({ v: 1 }, next)));
    return editorPrefs();
  }
  function resetEditorPrefs() { set(KEY.editor, JSON.stringify(Object.assign({ v: 1 }, EDITOR_DEFAULTS))); return editorPrefs(); }

  // -- submission history: dsaviz-submissions-v1 = { v: 1, subs: { pid: [{ at, lang, passed, total, code }] } }, oldest first.
  // Only the last SUB_MAX submissions per problem are kept, each up to SUB_CODE_MAX characters of code.
  const SUB_MAX = 20, SUB_CODE_MAX = 20000;
  const SUB_LANGS = ['py', 'js', 'java', 'cpp', 'go', 'sql'];
  function cleanSub(x) {
    if (!x || typeof x !== 'object') return null;
    const at = Number(x.at);
    if (!isFinite(at) || at <= 0 || SUB_LANGS.indexOf(x.lang) < 0 || typeof x.code !== 'string') return null;
    const total = Math.max(0, Math.floor(Number(x.total) || 0));
    const passed = Math.max(0, Math.min(total, Math.floor(Number(x.passed) || 0)));
    return { at, lang: x.lang, passed, total, code: x.code.slice(0, SUB_CODE_MAX) };
  }
  function cleanSubList(list) { return (Array.isArray(list) ? list : []).map(cleanSub).filter(Boolean).sort((a, b) => a.at - b.at).slice(-SUB_MAX); }
  function readSubs() {
    const o = json(KEY.subs, null);
    const out = {};
    if (o && o.v === 1 && o.subs && typeof o.subs === 'object' && !Array.isArray(o.subs)) Object.keys(o.subs).forEach((pid) => { const l = cleanSubList(o.subs[pid]); if (l.length) out[pid] = l; });
    return out;
  }
  function writeSubs(all) { set(KEY.subs, JSON.stringify({ v: 1, subs: all })); }
  // A problem's submissions, newest first. Each gets an id (its time and language) to pick it by.
  function submissions(pid) { return (readSubs()[pid] || []).slice().reverse().map((x) => Object.assign({ id: x.at + ':' + x.lang }, x)); }
  // Record one Submit: { lang, passed, total, code }. The time is now.
  function addSubmission(pid, rec) {
    if (!pid) return null;
    const x = cleanSub(Object.assign({}, rec, { at: now() }));
    if (!x) return null;
    const all = Object.assign({}, readSubs());
    all[pid] = cleanSubList((all[pid] || []).concat([x]));
    writeSubs(all);
    return Object.assign({ id: x.at + ':' + x.lang }, x);
  }
  function clearSubmissions(pid) { const all = Object.assign({}, readSubs()); delete all[pid]; writeSubs(all); }
  // Merge submissions from a backup: ones we lack (same time and language) are added, then each problem is capped again.
  function mergeSubmissions(incoming) {
    if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) return 0;
    const all = Object.assign({}, readSubs());
    let added = 0;
    Object.keys(incoming).forEach((pid) => {
      const have = all[pid] || [];
      const keys = new Set(have.map((x) => x.at + ':' + x.lang));
      const fresh = cleanSubList(incoming[pid]).filter((x) => !keys.has(x.at + ':' + x.lang));
      if (!fresh.length) return;
      const next = cleanSubList(have.concat(fresh));
      const kept = new Set(next.map((x) => x.at + ':' + x.lang));
      added += fresh.filter((x) => kept.has(x.at + ':' + x.lang)).length;
      all[pid] = next;
    });
    if (added) writeSubs(all);
    return added;
  }

  // -- the sheet backup file: { v: 1, done, star, notes, subs }. Import adds ticks, stars, notes and submissions, keeps the earliest tick time and never removes anything.
  function exportBackup() {
    const s = readSheet();
    return { v: 1, done: s.done, star: s.star, notes: readNotes(), subs: readSubs() };
  }
  function importBackup(data) {
    if (!data || typeof data !== 'object' || data.v !== 1) return null;
    const cur = readSheet();
    const done = Object.assign({}, cur.done), star = Object.assign({}, cur.star);
    let ticks = 0;
    if (data.done && typeof data.done === 'object') Object.keys(data.done).forEach((k) => {
      const ts = Number(data.done[k]);
      if (!isFinite(ts) || ts <= 0) return;
      if (!done[k]) ticks++;
      done[k] = done[k] ? Math.min(done[k], ts) : ts;
    });
    if (data.star && typeof data.star === 'object') Object.keys(data.star).forEach((k) => { if (data.star[k]) star[k] = 1; });
    set(KEY.sheet, JSON.stringify({ v: 1, done, star }));
    return { ticks, notes: mergeNotes(data.notes), subs: mergeSubmissions(data.subs) };
  }

  // -- the learner, as far as this browser knows them
  function profile() {
    const ob = json(KEY.onboard, {});
    const prefs = json(KEY.prefs, {});
    const name = typeof ob.name === 'string' && ob.name.trim() ? ob.name.trim().slice(0, 40) : '';
    const initials = name ? name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase() : '';
    const s = stories(), sh = sheet();
    return { name, initials, signedIn: get(KEY.user) === '1', isNew: !s.count && !sh.ticked && !codePasses().count && !lessons().count && !Object.keys(readLog().start).length,
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
      ['Rahul in Gurugram', 'started a mock on', 'The Train Yard Merge', 'MOCK'], ['Neha in Kolkata', 'finished', 'The Exact Change Counter', 'DP']]
      .map(([who, verb, what, tag]) => ({ who, verb, what, tag })) };
  }

  // -- predict the next step: dsaviz-predict-v1 = { v: 1, streak, best, right, total }. A wrong pick resets the streak.
  function predict() {
    const o = json(KEY.predict, null);
    const n = (x) => Math.max(0, Math.floor(Number(x) || 0));
    if (!o || o.v !== 1) return { streak: 0, best: 0, right: 0, total: 0 };
    const total = n(o.total), right = Math.min(n(o.right), total), streak = Math.min(n(o.streak), right);
    return { streak, best: Math.max(streak, Math.min(n(o.best), right)), right, total };
  }
  function logPredict(ok) {
    const p = predict();
    const streak = ok ? p.streak + 1 : 0;
    const next = { v: 1, streak, best: Math.max(p.best, streak), right: p.right + (ok ? 1 : 0), total: p.total + 1 };
    set(KEY.predict, JSON.stringify(next));
    return { streak: next.streak, best: next.best, right: next.right, total: next.total };
  }

  // -- mock interviews: dsaviz-mock-v1 = { v: 1, live: session | null, history: [result] }.
  // A session: { id, startedAt, mins, extra, mix, pattern, lang, problems: [{ id, title, diff, pattern, hints, best, total, submitted, runs }], notes, endedAt }.
  // The clock is the start time plus mins (and any extra minutes), so a reload carries on where it was. endedAt set = waiting for the self-score.
  // A saved result: { id, at, mins, used, hints, passed, total, problems, scores: { area: 1-4 }, score, band }.
  const MOCK_LENGTHS = { 30: 1, 45: 2, 60: 2 };             // minutes -> how many problems
  const MOCK_MIX = { easy: ['Easy', 'Easy'], standard: ['Easy', 'Medium'], hard: ['Medium', 'Hard'] };
  // Six areas, weighted to 100 (the split follows common interview rubrics; the words are ours).
  const MOCK_AREAS = [['understanding', 10], ['approach', 25], ['code', 20], ['correctness', 20], ['complexity', 15], ['communication', 10]];
  const MOCK_HINT_COST = 3;                                  // points off the final score per hint
  const MOCK_BANDS = [[70, 'pass', 'Pass'], [50, 'borderline', 'Borderline'], [0, 'nohire', 'No hire']];
  const MOCK_HISTORY_MAX = 100;
  const MOCK_NOTES_MAX = 4000;
  function readMock() {
    const o = json(KEY.mock, null);
    const out = { v: 1, live: null, history: [] };
    if (!o || o.v !== 1) return out;
    if (o.live && typeof o.live === 'object' && Array.isArray(o.live.problems) && o.live.problems.length && isFinite(o.live.startedAt) && MOCK_LENGTHS[o.live.mins]) out.live = o.live;
    if (Array.isArray(o.history)) out.history = o.history.filter((h) => h && isFinite(h.at) && isFinite(h.score) && h.scores && typeof h.scores === 'object');
    return out;
  }
  function writeMock(m) { set(KEY.mock, JSON.stringify(m)); }
  const easyish = (d) => (d === 'Starter' ? 'Easy' : d);
  // Pick problems for a session. cands: [{ id, diff, pattern, title }] (every runnable problem). Unsolved ones first,
  // matching the mix (and the pattern when one is chosen). Falls back to any difficulty, then to solved ones, so a
  // session can always start. rand is injectable for tests.
  function mockPick(cands, cfg, rand) {
    rand = rand || Math.random;
    const n = MOCK_LENGTHS[cfg && cfg.mins] || 2;
    const mix = MOCK_MIX[cfg && cfg.mix] || MOCK_MIX.standard;
    const want = n === 1 ? [mix[1]] : mix.slice(0, n);
    const log = readLog();
    const solved = (id) => id in log.code || id in log.stories;
    let pool = (cands || []).filter((c) => c && c.id);
    if (cfg && cfg.pattern) { const p = pool.filter((c) => c.pattern === cfg.pattern); if (p.length) pool = p; }
    const fresh = pool.filter((c) => !solved(c.id));
    const out = [];
    want.forEach((d) => {
      const tries = [fresh.filter((c) => easyish(c.diff) === d), fresh, pool.filter((c) => easyish(c.diff) === d), pool];
      for (const list of tries) {
        const left = list.filter((c) => !out.some((o) => o.id === c.id));
        if (left.length) { out.push(left[Math.floor(rand() * left.length) % left.length]); return; }
      }
    });
    return out;
  }
  function mockStart(cfg, picks) {
    if (!picks || !picks.length) return null;
    const mins = MOCK_LENGTHS[cfg && cfg.mins] ? Number(cfg.mins) : 45;
    const live = { id: 'm' + now(), startedAt: now(), mins, extra: 0, mix: (cfg && cfg.mix) || 'standard', pattern: (cfg && cfg.pattern) || '', lang: (cfg && cfg.lang) || 'py',
      problems: picks.map((p) => ({ id: p.id, title: p.title || p.id, diff: easyish(p.diff) || '', pattern: p.pattern || '', hints: 0, best: 0, total: Math.max(0, Number(p.total) || 0), submitted: false, runs: 0 })),
      notes: '', endedAt: null };
    const m = readMock(); m.live = live; writeMock(m);
    return mockSession();
  }
  // The live session with its clock worked out: limit, used and left (seconds), over (time ran out), ended, allSubmitted.
  function mockSession() {
    const live = readMock().live;
    if (!live) return null;
    const limit = (live.mins + (live.extra || 0)) * 60;
    const end = live.endedAt || now();
    const used = Math.max(0, Math.min(limit, Math.floor((end - live.startedAt) / 1000)));
    return Object.assign({}, live, { limit, used, left: limit - used, over: used >= limit, ended: !!live.endedAt,
      allSubmitted: live.problems.every((p) => p.submitted) });
  }
  function mockEdit(fn) { const m = readMock(); if (!m.live || m.live.endedAt) return null; fn(m.live); writeMock(m); return mockSession(); }
  // A Run or Submit finished. Submit results count towards "tests passed"; the best one is kept.
  function mockRecord(pid, mode, passed, total) {
    return mockEdit((live) => {
      const p = live.problems.find((x) => x.id === pid);
      if (!p) return;
      if (mode === 'submit') { p.submitted = true; p.total = Math.max(0, Number(total) || 0); p.best = Math.max(p.best || 0, Math.min(p.total, Math.max(0, Number(passed) || 0))); }
      else p.runs = (p.runs || 0) + 1;
    });
  }
  function mockHint(pid) { return mockEdit((live) => { const p = live.problems.find((x) => x.id === pid); if (p) p.hints = Math.min(9, (p.hints || 0) + 1); }); }
  function mockNotes(text) { return mockEdit((live) => { live.notes = typeof text === 'string' ? text.slice(0, MOCK_NOTES_MAX) : ''; }); }
  // More time, up to 30 extra minutes in all (a time limit must be adjustable).
  function mockExtend(minutes) { return mockEdit((live) => { live.extra = Math.min(30, (live.extra || 0) + Math.max(0, Number(minutes) || 0)); }); }
  // Stop the clock. The session then waits for the self-score.
  function mockEnd() {
    const m = readMock();
    if (!m.live) return null;
    if (!m.live.endedAt) {
      const limit = (m.live.mins + (m.live.extra || 0)) * 60 * 1000;
      m.live.endedAt = Math.min(now(), m.live.startedAt + limit);
      writeMock(m);
    }
    return mockSession();
  }
  function mockAbandon() { const m = readMock(); m.live = null; writeMock(m); }
  // Rubric math. scores: { area: 1-4 }. Each area gives (score - 1) / 3 of its weight; each hint takes MOCK_HINT_COST off.
  // Returns { raw, penalty, score (0-100), band, label, complete }.
  function mockScore(scores, hints) {
    let raw = 0, complete = true;
    MOCK_AREAS.forEach(([k, w]) => {
      const v = Number(scores && scores[k]);
      if (!(v >= 1 && v <= 4 && v === Math.round(v))) { complete = false; return; }
      raw += ((v - 1) / 3) * w;
    });
    raw = Math.round(raw);
    const penalty = Math.max(0, Math.floor(Number(hints) || 0)) * MOCK_HINT_COST;
    const score = Math.max(0, raw - penalty);
    const b = MOCK_BANDS.find(([min]) => score >= min);
    return { raw, penalty, score, band: b[1], label: b[2], complete };
  }
  // Save the ended session and its self-score to history, log the activity for the streak, clear the live session.
  function mockSave(scores) {
    const live = mockSession();
    if (!live || !live.ended) return null;
    const hints = live.problems.reduce((a, p) => a + (p.hints || 0), 0);
    const sc = mockScore(scores, hints);
    if (!sc.complete) return null;
    const clean = {};
    MOCK_AREAS.forEach(([k]) => { clean[k] = Number(scores[k]); });
    const res = { id: live.id, at: now(), mins: live.mins + (live.extra || 0), used: live.used, hints,
      passed: live.problems.reduce((a, p) => a + (p.best || 0), 0), total: live.problems.reduce((a, p) => a + (p.total || 0), 0),
      problems: live.problems.map((p) => ({ id: p.id, title: p.title, diff: p.diff, pattern: p.pattern, best: p.best || 0, total: p.total || 0, submitted: !!p.submitted, hints: p.hints || 0 })),
      scores: clean, score: sc.score, band: sc.band };
    const m = readMock();
    m.history = m.history.filter((h) => h.id !== res.id).concat([res]).slice(-MOCK_HISTORY_MAX);
    m.live = null;
    writeMock(m);
    logActivity('mock', res.id);
    return res;
  }
  // History, oldest first, plus the trend: the last n scores (default 10), the best, the average and the change since the one before.
  function mockHistory(n) {
    const list = readMock().history.slice().sort((a, b) => a.at - b.at);
    const scores = list.map((h) => h.score);
    return { list, count: list.length, trend: list.slice(-(n || 10)).map((h) => ({ at: h.at, day: dayKey(h.at), score: h.score, band: h.band })),
      best: scores.length ? Math.max.apply(null, scores) : null,
      avg: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
      change: scores.length > 1 ? scores[scores.length - 1] - scores[scores.length - 2] : null };
  }

  // -- Start here (the programming-from-zero track). Stored in dsaviz-start-v1 as
  //    { v: 1, done: { chapter: ts }, ex: { exercise: ts }, skip: { chapter: 1 }, placed: ts, last: chapter, stage: { chapter: stage } }.
  //    Passing an exercise logs a 'start' activity (XP.start, once); finishing a chapter logs the lesson 'start:<chapter>'.
  function readStart() {
    const o = json(KEY.start, null);
    const out = { v: 1, done: {}, ex: {}, skip: {}, placed: 0, last: '', stage: {} };
    if (!o || o.v !== 1) return out;
    ['done', 'ex', 'skip', 'stage'].forEach((k) => { if (o[k] && typeof o[k] === 'object' && !Array.isArray(o[k])) out[k] = Object.assign({}, o[k]); });
    out.placed = Number(o.placed) || 0;
    out.last = typeof o.last === 'string' ? o.last : '';
    return out;
  }
  function writeStart(o) { set(KEY.start, JSON.stringify(o)); }
  function start() { return readStart(); }
  function startPass(exId) {
    const o = readStart();
    if (!o.ex[exId]) { o.ex[exId] = now(); writeStart(o); }
    return logActivity('start', exId);
  }
  function startFinish(ch) {
    const o = readStart();
    if (!o.done[ch]) { o.done[ch] = now(); writeStart(o); }
    return logActivity('lesson', 'start:' + ch);
  }
  function startVisit(ch, stage) {
    const o = readStart();
    o.last = ch;
    if (stage) o.stage[ch] = stage;
    writeStart(o);
  }
  // The placement check: chapters the learner already knows can be skipped (they stay open, marked "known").
  function startPlace(ids) {
    const o = readStart();
    o.skip = {};
    (ids || []).forEach((id) => { o.skip[id] = 1; });
    o.placed = now();
    writeStart(o);
    return o;
  }

  // -- erase this browser's progress: activity log, sheet ticks, revisit cards, medals, saved stories, code, submissions, streak freezes and lesson progress. Notes stay.
  // Theme, profile and settings stay.
  function eraseProgress() {
    const s = store();
    [KEY.log, KEY.sheet, KEY.deck, KEY.medals, KEY.predict, KEY.mock, KEY.start, KEY.subs, KEY.streak, 'dsaviz-review-v1', 'dsaviz-saved', 'dsaviz-code-v1', 'dsaviz-sd-progress'].forEach((k) => { try { if (s) s.removeItem(k); } catch (e) {} });
  }

  return {
    KEY, XP, XP_RULES, LEVEL_XP, dayKey, eraseProgress,
    logActivity, finishStory: (id) => logActivity('story', id), passCode: (id) => logActivity('code', id), finishLesson: (id) => logActivity('lesson', id), rateCard: (id) => logActivity('revisit', id),
    days, streak, FREEZE_RUN, useFreeze, daily, markDailySeen, heatmap, xp, stories, codePasses, lessons, sheet, problemStatus, bindCatalog, patterns, medals, markMedalsSeen, profile,
    GRADES, schedule, reviewCards, reviewDue, reviewUpcoming, addCard, review, reviewPreview, whenLabel, retention,
    predict, logPredict,
    start, startPass, startFinish, startVisit, startPlace, startMedals, startRing, startCounts, startOutline,
    MOCK_LENGTHS, MOCK_MIX, MOCK_AREAS, MOCK_HINT_COST, MOCK_BANDS, mockPick, mockStart, mockSession, mockRecord, mockHint, mockNotes, mockExtend, mockEnd, mockAbandon, mockScore, mockSave, mockHistory,
    note, notes: readNotes, setNote, mergeNotes, exportBackup, importBackup,
    EDITOR_DEFAULTS, EDITOR_FONT, editorPrefs, setEditorPrefs, resetEditorPrefs,
    SUB_MAX, SUB_CODE_MAX, submissions, addSubmission, clearSubmissions, mergeSubmissions,
    leaderboard, buddies, feed,
    setClock: (fn) => { now = typeof fn === 'function' ? fn : () => Date.now(); }
  };
})();
if (typeof PROBLEMS !== 'undefined') DS.bindCatalog(PROBLEMS);
// @@END-DATA@@
