// Site search check: builds the index from the shared data (scripts/build_search.js), checks it covers every
// item type with no duplicate keys, that every page carries the current index, and that known queries put the
// expected result first. Runs the same scorer the pages use (shared/search.js).
const fs = require('fs');
const path = require('path');
const { build } = require('../scripts/build_search.js');

const root = path.join(__dirname, '..');
let problems = 0;
const fail = (msg) => { problems++; console.log('  ✗', msg); };

const SITE_INDEX = build();
const store = {};
const window = { localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } } };
const S = new Function('SITE_INDEX', 'window', fs.readFileSync(path.join(root, 'shared', 'search.js'), 'utf8') +
  '\nreturn { SEARCH_TYPES, siteSearch, searchTarget, searchFocus, searchNorm };')(SITE_INDEX, window);

// 1. coverage and counts
const byType = {};
SITE_INDEX.items.forEach(([type]) => { byType[type] = (byType[type] || 0) + 1; });
Object.keys(S.SEARCH_TYPES).forEach((type) => { if (!byType[type]) fail('no items of type ' + type); });
Object.keys(byType).forEach((type) => { if (!S.SEARCH_TYPES[type]) fail('unknown type ' + type); });
const C = SITE_INDEX.counts;
// Stories and sheet rows are no longer results of their own: a problem is found by its title (the problem type holds every sheet row).
const want = { start: C.start, pattern: C.patterns, problem: C.runnable + C.sql, git: C.git, sd: C.sd, ai: C.ai, dsa: C.dsa, term: C.terms };
Object.keys(want).forEach((type) => { if (byType[type] !== want[type]) fail(type + ': ' + byType[type] + ' items, counts say ' + want[type]); });
if (C.sheet < 500) fail('sheet count looks wrong: ' + C.sheet);
// Every problem on the Problems page (every sheet row) is a search result by its title.
const DATA = new Function('window', fs.readFileSync(path.join(root, 'shared', 'catalog.js'), 'utf8') + '\n' + fs.readFileSync(path.join(root, 'shared', 'sheet.js'), 'utf8') + '\nreturn { SHEET, PROBLEMS };')(window);
{
  const have = new Set(SITE_INDEX.items.filter((it) => it[0] === 'problem').map((it) => it[1]));
  const missing = DATA.SHEET.filter((r) => !have.has(r.pid));
  if (missing.length) fail(missing.length + ' Problems page rows are not search results, e.g. ' + missing[0].id);
}
// No result subtitle carries a story name.
const storyNames = new Set(); DATA.PROBLEMS.forEach((p) => { if (p.story) storyNames.add(p.story); });
SITE_INDEX.items.forEach(([type, id, , sub]) => { storyNames.forEach((n) => { if (sub.includes(n)) fail(type + ':' + id + ' subtitle shows the story name "' + n + '"'); }); });
if (C.storyPatterns !== C.patterns) console.log('  note: stories cover ' + C.storyPatterns + ' of ' + C.patterns + ' patterns');

// 2. keys, fields, targets
const keys = new Set();
SITE_INDEX.items.forEach((it) => {
  const [type, id, title, sub] = it;
  const key = type + ':' + id;
  if (keys.has(key)) fail('duplicate key ' + key); else keys.add(key);
  if (!id || !title || !sub) fail('empty field in ' + key);
  if (!S.searchNorm(title)) fail('title has no searchable letters: ' + key);
});
Object.entries(S.SEARCH_TYPES).forEach(([type, [, page]]) => {
  if (!fs.existsSync(path.join(root, 'pages', page))) fail(type + ' opens a missing page ' + page);
});

// 3. known queries
const first = (q) => { const g = S.siteSearch(q); return g.length ? g[0].type + ':' + g[0].items[0].id : '(none)'; };
[['two sum', 'problem:two-sum'], ['lru', 'problem:lru-cache'], ['rebase', 'git:rebase'], ['attention', 'ai:attention'],
  ['sliding window', 'pattern:Sliding Window'], ['enumerate', 'term:enumerate'], ['sharding', 'sd:sharding'],
  ['lantern bridge', 'problem:two-sum-ii'], ['design hashset', 'problem:design-hashset'], ['rotting orngs', 'problem:rotting-oranges'], ['bubble sort', 'dsa:bubble'], ['open addressing', 'dsa:openaddr']]
  .forEach(([q, k]) => { const got = first(q); if (got !== k) fail('"' + q + '" first result ' + got + ', expected ' + k); else console.log('  ✓ "' + q + '" → ' + k); });
const g = S.siteSearch('tree');
const flat = [].concat(...g.map((x) => x.items));
if (flat.length > 12) fail('too many results: ' + flat.length);
g.forEach((x) => { if (x.items.length > 4) fail('more than 4 results in group ' + x.label); });
if (S.siteSearch('').length || S.siteSearch('   ').length) fail('an empty query returned results');
if (S.siteSearch('zzqxj').length) fail('nonsense query returned results');

// 4. opening a result writes the key the page reads, and the page reads it once. A problem result opens the problem page itself.
const it = { type: 'problem', id: 'lru-cache' };
if (S.searchTarget(it) !== 'Code.dc.html' || store['dsaviz-problem'] !== 'lru-cache') fail('a problem result does not open its problem page');
if (S.searchFocus('dsaviz-problem') !== 'lru-cache' || S.searchFocus('dsaviz-problem') !== null) fail('searchFocus should read once');
const reads = { 'Patterns.dc.html': 'dsaviz-pattern-focus', 'Git.dc.html': 'dsaviz-git-lesson', 'Glossary.dc.html': 'dsaviz-glossary-term' };
Object.entries(reads).forEach(([page, key]) => {
  if (!fs.readFileSync(path.join(root, 'pages', page), 'utf8').includes("searchFocus('" + key + "')")) fail(page + ' does not read ' + key);
});
// The search box shows no count: no counts in the hint or the status, and the placeholder is the plain one.
{
  const nav = fs.readFileSync(path.join(root, 'shared', 'nav.js'), 'utf8'), navHtml = fs.readFileSync(path.join(root, 'shared', 'ui', 'nav.html'), 'utf8');
  if (/SITE_INDEX\.counts|C\.sheet|C\.runnable|flat\.length \+/.test(nav)) fail('shared/nav.js still builds a count into the search text');
  if (!navHtml.includes('placeholder="Search lessons and problems"')) fail('the search placeholder is not "Search lessons and problems"');
}

// 5. every page with the pill nav carries the current index (run the build after changing data)
const fresh = 'const SITE_INDEX = ' + JSON.stringify(SITE_INDEX) + ';';
fs.readdirSync(path.join(root, 'pages')).filter((f) => f.endsWith('.dc.html')).forEach((f) => {
  const src = fs.readFileSync(path.join(root, 'pages', f), 'utf8');
  if (src.includes('<!-- PILL NAV -->') && !src.includes(fresh)) fail(f + ' has a stale or missing search index; run the build');
});

console.log('search: ' + SITE_INDEX.items.length + ' items · ' + Object.entries(byType).map(([k, v]) => k + ' ' + v).join(', '));
console.log(problems ? problems + ' search problem(s)' : 'search clean');
if (problems) process.exitCode = 1;
