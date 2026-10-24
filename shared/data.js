// @@DATA@@ — generated block (from shared/data.js): DS, the one data layer every page reads.
// Real learner data lives in this browser's localStorage. Features that need a server (league, buddies,
// other learners) return sample data marked demo: true, and pages show a "Demo" tag next to it.
// docs/BACKEND.md lists every function, its return shape and where a real API plugs in.
const DS = (function () {
  const KEY = { log: 'dsaviz-activity-v1', sheet: 'dsaviz-sheet-v1', deck: 'dsaviz-deck', onboard: 'dsaviz-onboard', prefs: 'dsaviz-prefs', user: 'dsaviz-user', medals: 'dsaviz-medals-seen', problem: 'dsaviz-problem', review: 'dsaviz-review-v1', notes: 'dsaviz-notes-v1' };
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
  // sheet rows use their story id when they have one (so both places share a note), else the LeetCode slug.
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

  // -- the sheet backup file: { v: 1, done, star, notes }. Import adds ticks, stars and notes, keeps the earliest tick time and never removes anything.
  function exportBackup() {
    const s = readSheet();
    return { v: 1, done: s.done, star: s.star, notes: readNotes() };
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
    return { ticks, notes: mergeNotes(data.notes) };
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
      ['Rahul in Gurugram', 'started a mock on', 'The Train Yard Merge', 'MOCK'], ['Neha in Kolkata', 'finished', 'The Exact Change Counter', 'DP']]
      .map(([who, verb, what, tag]) => ({ who, verb, what, tag })) };
  }

  // -- erase this browser's progress: activity log, sheet ticks, revisit cards, medals, saved stories, code and lesson progress. Notes stay.
  // Theme, profile and settings stay.
  function eraseProgress() {
    const s = store();
    [KEY.log, KEY.sheet, KEY.deck, KEY.medals, 'dsaviz-review-v1', 'dsaviz-saved', 'dsaviz-code-v1', 'dsaviz-sd-progress'].forEach((k) => { try { if (s) s.removeItem(k); } catch (e) {} });
  }

  return {
    KEY, XP, XP_RULES, LEVEL_XP, dayKey, eraseProgress,
    logActivity, finishStory: (id) => logActivity('story', id), passCode: (id) => logActivity('code', id), finishLesson: (id) => logActivity('lesson', id), rateCard: (id) => logActivity('revisit', id),
    days, streak, heatmap, xp, stories, codePasses, lessons, sheet, problemStatus, bindCatalog, patterns, medals, markMedalsSeen, profile,
    GRADES, schedule, reviewCards, reviewDue, reviewUpcoming, addCard, review, reviewPreview, whenLabel, retention,
    note, notes: readNotes, setNote, mergeNotes, exportBackup, importBackup,
    leaderboard, buddies, feed,
    setClock: (fn) => { now = typeof fn === 'function' ? fn : () => Date.now(); }
  };
})();
if (typeof PROBLEMS !== 'undefined') DS.bindCatalog(PROBLEMS);
// @@END-DATA@@
