// @@CONTESTS@@ — generated block (from shared/contests.js): the contest calendar's rules (Contests page).
// No live data: each contest is a recurrence rule in UTC, written the iCalendar way (a first start plus
// an RRULE). The page shows the next 14 days in the learner's time zone. Platforms move contests now and
// then, so the page tells learners to check the platform before they start. A backend that fetches the
// real schedules can replace CONTESTS later (docs/BACKEND.md).
// Fields: id, platform, name, start (one known start, UTC), rrule (FREQ=WEEKLY with optional INTERVAL;
// null when there is no fixed day), minutes, link, note.
const CONTESTS = [
  { id: 'lc-weekly', platform: 'LeetCode', name: 'Weekly Contest', start: '2024-09-29T02:30:00Z', rrule: 'FREQ=WEEKLY', minutes: 90, link: 'https://leetcode.com/contest/' },
  // Biweekly anchor: Biweekly Contest 194, Sat 24 Oct 2026, as listed on clist.by (checked 2026-10-24). LeetCode's own page sits behind a bot check.
  { id: 'lc-biweekly', platform: 'LeetCode', name: 'Biweekly Contest', start: '2026-10-24T14:30:00Z', rrule: 'FREQ=WEEKLY;INTERVAL=2', minutes: 90, link: 'https://leetcode.com/contest/' },
  { id: 'atcoder-abc', platform: 'AtCoder', name: 'Beginner Contest (ABC)', start: '2024-09-28T12:00:00Z', rrule: 'FREQ=WEEKLY', minutes: 100, link: 'https://atcoder.jp/contests/' },
  { id: 'codechef-starters', platform: 'CodeChef', name: 'Starters', start: '2024-09-25T14:30:00Z', rrule: 'FREQ=WEEKLY', minutes: 120, link: 'https://www.codechef.com/contests' },
  { id: 'codeforces', platform: 'Codeforces', name: 'Codeforces rounds', start: null, rrule: null, minutes: 120, link: 'https://codeforces.com/calendar',
    note: 'Rounds run most weeks, on no fixed day. Their calendar has the dates.' }
];
const CONTEST_PLATFORMS = ['LeetCode', 'Codeforces', 'AtCoder', 'CodeChef'];
const CONTEST_DAY = 86400000;

// { freq, interval } from an RRULE string. Only weekly rules are used.
function contestRule(rrule) {
  if (!rrule) return null;
  const o = {};
  rrule.split(';').forEach((p) => { const [k, v] = p.split('='); o[k] = v; });
  if (o.FREQ !== 'WEEKLY') return null;
  return { freq: 'WEEKLY', interval: Math.max(1, parseInt(o.INTERVAL || '1', 10)) };
}
// Every run of contest c that overlaps [a, b) (ms), as { c, start, end }.
function contestRuns(c, a, b) {
  const r = contestRule(c.rrule);
  if (!r || !c.start) return [];
  const t0 = Date.parse(c.start), step = r.interval * 7 * CONTEST_DAY, len = c.minutes * 60000;
  let k = Math.max(0, Math.ceil((a - len - t0) / step));
  const out = [];
  for (let s = t0 + k * step; s < b; k++, s = t0 + k * step) if (s + len > a) out.push({ c, start: s, end: s + len });
  return out;
}
// Wall-clock parts of ms in a time zone (undefined = the browser's own).
function contestParts(ms, tz) {
  const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'short' });
  const p = {};
  f.formatToParts(new Date(ms)).forEach((x) => { p[x.type] = x.value; });
  return { y: +p.year, m: +p.month, d: +p.day, hh: +p.hour % 24, mm: +p.minute, wd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday) };
}
const contestPad = (n) => String(n).padStart(2, '0');
function contestKey(ms, tz) { const p = contestParts(ms, tz); return p.y + '-' + contestPad(p.m) + '-' + contestPad(p.d); }
function contestZone(tz) {
  try { return tz || Intl.DateTimeFormat().resolvedOptions().timeZone || 'your time zone'; } catch (e) { return 'your time zone'; }
}
// Local clock time, like "8:00 PM" (the browser's locale unless one is given).
function contestClock(ms, tz, locale) {
  try { return new Intl.DateTimeFormat(locale, { timeZone: tz, hour: 'numeric', minute: '2-digit' }).format(new Date(ms)); } catch (e) { const p = contestParts(ms, tz); return contestPad(p.hh) + ':' + contestPad(p.mm); }
}
// The next `days` local calendar days from `now`, each with the runs that start on it (in time zone tz).
// platforms: a list to keep, or null for all. Runs that already ended are kept and marked past.
function contestDays(now, tz, days, platforms) {
  days = days || 14;
  const p = contestParts(now, tz);
  const list = [];
  for (let i = 0; i < days; i++) {
    const u = new Date(Date.UTC(p.y, p.m - 1, p.d + i));
    list.push({ key: u.getUTCFullYear() + '-' + contestPad(u.getUTCMonth() + 1) + '-' + contestPad(u.getUTCDate()), y: u.getUTCFullYear(), m: u.getUTCMonth() + 1, d: u.getUTCDate(), wd: u.getUTCDay(), today: i === 0, runs: [] });
  }
  const byKey = {};
  list.forEach((x) => { byKey[x.key] = x; });
  // Wide window: local days can sit up to 14 hours either side of UTC.
  const a = now - 2 * CONTEST_DAY, b = now + (days + 2) * CONTEST_DAY;
  CONTESTS.filter((c) => !platforms || platforms.includes(c.platform)).forEach((c) => {
    contestRuns(c, a, b).forEach((r) => {
      const day = byKey[contestKey(r.start, tz)];
      if (day) day.runs.push(Object.assign(r, { past: r.end <= now, live: r.start <= now && now < r.end }));
    });
  });
  list.forEach((x) => x.runs.sort((u, v) => u.start - v.start));
  return list;
}

// ---------- iCalendar (.ics) ----------
function icsStamp(ms) { const d = new Date(ms); return d.getUTCFullYear() + contestPad(d.getUTCMonth() + 1) + contestPad(d.getUTCDate()) + 'T' + contestPad(d.getUTCHours()) + contestPad(d.getUTCMinutes()) + contestPad(d.getUTCSeconds()) + 'Z'; }
function icsText(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }
// Lines longer than 75 octets continue on the next line after a space (RFC 5545 section 3.1).
function icsFold(line) {
  const out = [];
  let cur = '', bytes = 0;
  for (const ch of line) {
    const code = ch.charCodeAt(0);
    const n = ch.length > 1 ? 4 : code < 0x80 ? 1 : code < 0x800 ? 2 : 3;
    if (bytes + n > (out.length ? 74 : 75)) { out.push(cur); cur = ''; bytes = 0; }
    cur += ch; bytes += n;
  }
  out.push(cur);
  return out.join('\r\n ');
}
// A calendar file for a list of runs ({ c, start, end }). stamp: when the file was made (ms).
function contestIcs(runs, stamp) {
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//DSAMaxxing//Contest calendar//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
  runs.forEach((r) => {
    L.push('BEGIN:VEVENT', 'UID:' + r.c.id + '-' + icsStamp(r.start) + '@dsamaxxing', 'DTSTAMP:' + icsStamp(stamp), 'DTSTART:' + icsStamp(r.start), 'DTEND:' + icsStamp(r.end),
      'SUMMARY:' + icsText(r.c.platform + ' ' + r.c.name),
      'DESCRIPTION:' + icsText('Time from ' + r.c.platform + '’s usual schedule. Check ' + r.c.link + ' before you start.'),
      'URL:' + r.c.link, 'END:VEVENT');
  });
  L.push('END:VCALENDAR');
  return L.map(icsFold).join('\r\n') + '\r\n';
}
// Saves text as a file (a Blob link, so it works from file:// too). Returns false where there is no DOM.
function contestSave(name, text) {
  try {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = name; a.style.display = 'none';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return true;
  } catch (e) { return false; }
}
// @@END-CONTESTS@@
