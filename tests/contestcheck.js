// Contest calendar check: loads shared/contests.js and checks that the recurrence rules give the expected
// dates and local times for fixed reference times in several time zones (across the October and November
// daylight-saving changes), that the 14-day view groups runs by local day, and that the .ics file is valid.
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'shared', 'contests.js'), 'utf8');
const K = new Function(src + '\nreturn { CONTESTS, CONTEST_PLATFORMS, contestRule, contestRuns, contestParts, contestKey, contestDays, contestIcs, icsFold, icsText, contestSave };')();

let problems = 0;
const check = (cond, msg) => { if (!cond) { problems++; console.log('  ✗', msg); } else console.log('  ✓', msg); };
const at = (s) => Date.parse(s);
const byId = (id) => K.CONTESTS.find((c) => c.id === id);
const hm = (ms, tz) => { const p = K.contestParts(ms, tz); return K.contestKey(ms, tz) + ' ' + String(p.hh).padStart(2, '0') + ':' + String(p.mm).padStart(2, '0'); };
const next = (id, from, n) => K.contestRuns(byId(id), at(from), at(from) + 60 * 86400000).slice(0, n || 1).map((r) => r.start);

console.log('rules');
check(K.CONTESTS.every((c) => c.id && c.platform && c.name && c.minutes > 0 && /^https:\/\//.test(c.link)), 'every contest has id, platform, name, duration and an https link');
check(K.CONTESTS.every((c) => K.CONTEST_PLATFORMS.includes(c.platform)), 'every platform has a filter chip');
check(K.CONTEST_PLATFORMS.every((p) => K.CONTESTS.some((c) => c.platform === p)), 'every chip has a contest');
check(K.CONTESTS.every((c) => c.rrule === null || (K.contestRule(c.rrule) && /Z$/.test(c.start))), 'rules are weekly RRULEs anchored to a UTC start');
check(K.CONTESTS.filter((c) => !c.rrule).every((c) => c.note), 'contests with no fixed day explain where to look');
check(new Set(K.CONTESTS.map((c) => c.id)).size === K.CONTESTS.length, 'ids are unique');
check(K.contestRule('FREQ=WEEKLY;INTERVAL=2').interval === 2 && K.contestRule('FREQ=DAILY') === null, 'RRULE parser reads INTERVAL and skips other frequencies');

console.log('next dates (UTC), from Sat 24 Oct 2026 00:00 UTC');
const ref = '2026-10-24T00:00:00Z';
check(next('atcoder-abc', ref, 2).join() === [at('2026-10-24T12:00:00Z'), at('2026-10-31T12:00:00Z')].join(), 'AtCoder ABC: 24 Oct, then 31 Oct');
check(next('atcoder-abc', ref)[0] === at('2026-10-24T12:00:00Z'), 'AtCoder ABC: Sat 24 Oct 12:00 UTC');
check(K.contestRuns(byId('atcoder-abc'), at(ref), at(ref) + 365 * 86400000).every((r) => new Date(r.start).getUTCDay() === 6), 'every computed ABC in the next year falls on a Saturday (UTC)');
check(K.contestRuns(byId('codechef-starters'), at(ref), Date.now() + 365 * 86400000).some((r) => r.start >= Date.now() - 14 * 86400000), 'the Starters rule still produces runs around today');
check(K.contestRuns({ start: '2026-10-24T14:30:00Z', rrule: 'FREQ=WEEKLY;INTERVAL=2', minutes: 90 }, at(ref), at(ref) + 20 * 86400000).map((r) => r.start).join() === [at('2026-10-24T14:30:00Z'), at('2026-11-07T14:30:00Z')].join(), 'an every-other-week rule skips a week');
check(next('codechef-starters', ref)[0] === at('2026-10-28T14:30:00Z'), 'CodeChef Starters: Wed 28 Oct 14:30 UTC');
check(K.contestRuns(byId('codeforces'), at(ref), at(ref) + 14 * 86400000).length === 0, 'Codeforces has no generated dates');
check(next('atcoder-abc', '2026-10-24T12:00:00Z')[0] === at('2026-10-24T12:00:00Z'), 'a run starting exactly at the window start is included');
check(next('atcoder-abc', '2026-10-24T13:00:00Z')[0] === at('2026-10-24T12:00:00Z'), 'a run in progress is included');
check(next('atcoder-abc', '2026-10-24T13:40:00Z')[0] === at('2026-10-31T12:00:00Z'), 'a run that just ended is not');

console.log('local times across time zones and daylight saving');
check(hm(at('2026-10-25T02:30:00Z'), 'Asia/Kolkata') === '2026-10-25 08:00', 'India: a Sunday 02:30 UTC start is 08:00');
check(hm(at('2026-10-28T14:30:00Z'), 'Asia/Kolkata') === '2026-10-28 20:00', 'India: Starters is Wednesday 20:00');
check(hm(at('2026-10-24T12:00:00Z'), 'Asia/Tokyo') === '2026-10-24 21:00', 'Japan: ABC is Saturday 21:00');
check(hm(at('2026-10-18T02:30:00Z'), 'Europe/London') === '2026-10-18 03:30', 'London, summer time: 02:30 UTC is 03:30');
check(hm(at('2026-10-25T02:30:00Z'), 'Europe/London') === '2026-10-25 02:30', 'London, after clocks go back on 25 Oct: 02:30 UTC is 02:30');
check(hm(at('2026-10-24T12:00:00Z'), 'Europe/London') === '2026-10-24 13:00' && hm(at('2026-10-31T12:00:00Z'), 'Europe/London') === '2026-10-31 12:00', 'London: ABC moves from 13:00 to 12:00 local');
check(hm(at('2026-10-25T02:30:00Z'), 'America/Los_Angeles') === '2026-10-24 19:30', 'Los Angeles: a Sunday 02:30 UTC start falls on Saturday evening, 19:30 PDT');
check(hm(at('2026-11-01T02:30:00Z'), 'America/Los_Angeles') === '2026-10-31 19:30', 'Los Angeles: still 19:30 the night before clocks change');
check(hm(at('2026-11-08T02:30:00Z'), 'America/Los_Angeles') === '2026-11-07 18:30', 'Los Angeles: 18:30 PST after 1 Nov');
check(hm(at('2026-10-24T12:00:00Z'), 'Pacific/Auckland') === '2026-10-25 01:00', 'Auckland: ABC is early Sunday, 01:00');

console.log('14-day view');
{
  const now = at(ref);
  const india = K.contestDays(now, 'Asia/Kolkata', 14);
  check(india.length === 14 && india[0].today && india.filter((d) => d.today).length === 1, '14 days, only the first is today');
  check(india[0].key === '2026-10-24' && india[13].key === '2026-11-06' && india[0].wd === 6, 'India: Sat 24 Oct to Fri 6 Nov');
  check(india[0].runs.map((r) => r.c.id).join() === 'atcoder-abc', 'India today: ABC (17:30)');
  check(india.reduce((n, d) => n + d.runs.length, 0) === 4, 'India: 4 runs in the window (2 ABC, 2 Starters)');
  const la = K.contestDays(now, 'America/Los_Angeles', 14);
  check(la[0].key === '2026-10-23' && la[1].runs.map((r) => r.c.id).join() === 'atcoder-abc', 'Los Angeles: Saturday holds ABC');
  const nz = K.contestDays(now, 'Pacific/Auckland', 14);
  check(nz[0].key === '2026-10-24' && nz[1].runs.map((r) => r.c.id).join() === 'atcoder-abc', 'Auckland: ABC lands on Sunday');
  const chef = K.contestDays(now, 'Asia/Kolkata', 14, ['CodeChef']);
  check(chef.reduce((n, d) => n + d.runs.length, 0) === 2 && chef.every((d) => d.runs.every((r) => r.c.platform === 'CodeChef')), 'platform filter keeps only CodeChef');
  const live = K.contestDays(at('2026-10-24T12:30:00Z'), 'Asia/Kolkata', 14)[0].runs[0];
  check(live.live && !live.past, 'ABC is live at 12:30 UTC');
  const done = K.contestDays(at('2026-10-24T13:50:00Z'), 'Asia/Kolkata', 14)[0].runs[0];
  check(done.past && !done.live, 'ABC is past at 13:50 UTC and still listed today');
}

console.log('.ics file');
{
  const now = at(ref);
  const runs = K.contestDays(now, 'Asia/Kolkata', 14).flatMap((d) => d.runs);
  const odd = { c: { id: 'x', platform: 'Test', name: 'Round; with, commas \\ and a very long name that has to fold across more than one line ✓ ok', link: 'https://example.com/' }, start: now, end: now + 3600000 };
  const ics = K.contestIcs(runs.concat([odd]), now);
  check(ics.endsWith('\r\n') && !/[^\r]\n/.test(ics), 'every line ends in CRLF');
  check(ics.split('\r\n').every((l) => Buffer.byteLength(l, 'utf8') <= 75), 'no line is longer than 75 octets');
  const lines = ics.replace(/\r\n /g, '').split('\r\n').filter(Boolean);
  check(lines[0] === 'BEGIN:VCALENDAR' && lines[lines.length - 1] === 'END:VCALENDAR', 'one VCALENDAR wraps the file');
  check(lines.includes('VERSION:2.0') && lines.some((l) => l.startsWith('PRODID:')), 'VERSION and PRODID present');
  const events = [];
  let cur = null, nested = false;
  lines.slice(1, -1).forEach((l) => {
    if (l === 'BEGIN:VEVENT') { if (cur) nested = true; cur = {}; return; }
    if (l === 'END:VEVENT') { events.push(cur); cur = null; return; }
    if (cur) { const i = l.indexOf(':'); cur[l.slice(0, i)] = l.slice(i + 1); }
  });
  check(!nested && !cur && events.length === runs.length + 1, 'BEGIN and END:VEVENT balance, one event per run');
  const stamp = /^\d{8}T\d{6}Z$/;
  check(events.every((e) => e.UID && stamp.test(e.DTSTAMP) && stamp.test(e.DTSTART) && stamp.test(e.DTEND) && e.SUMMARY), 'each event has UID, DTSTAMP, DTSTART, DTEND (UTC) and SUMMARY');
  check(events.every((e) => e.DTEND > e.DTSTART), 'each event ends after it starts');
  check(new Set(events.map((e) => e.UID)).size === events.length, 'UIDs are unique');
  check(events[0].DTSTART === '20261024T120000Z' && events[0].DTEND === '20261024T134000Z', 'first event is ABC, 12:00 to 13:40 UTC');
  const last = events[events.length - 1];
  check(last.SUMMARY.startsWith('Test Round\\; with\\, commas \\\\ and') && last.SUMMARY.endsWith('✓ ok'), 'commas, semicolons and backslashes are escaped and folding keeps the text');
  check(K.contestSave('x.ics', ics) === false, 'saving without a page does not throw');
}

console.log(problems ? problems + ' contest problem(s)' : 'contests clean');
if (problems) process.exitCode = 1;
