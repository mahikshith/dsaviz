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
const want = { start: C.start, story: C.stories, pattern: C.patterns, problem: C.runnable + C.sql, git: C.git, sd: C.sd, ai: C.ai, dsa: C.dsa, term: C.terms, sheet: C.sheet };
Object.keys(want).forEach((type) => { if (byType[type] !== want[type]) fail(type + ': ' + byType[type] + ' items, counts say ' + want[type]); });
if (C.sheet < 500) fail('sheet count looks wrong: ' + C.sheet);
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
[['two sum', 'story:two-sum'], ['lru', 'story:lru-cache'], ['rebase', 'git:rebase'], ['attention', 'ai:attention'],
  ['sliding window', 'pattern:Sliding Window'], ['enumerate', 'term:enumerate'], ['sharding', 'sd:sharding'],
  ['lantern bridge', 'story:two-sum-ii'], ['design hashset', 'problem:design-hashset'], ['rotting orngs', 'story:rotting-oranges'], ['bubble sort', 'dsa:bubble'], ['open addressing', 'dsa:openaddr']]
  .forEach(([q, k]) => { const got = first(q); if (got !== k) fail('"' + q + '" first result ' + got + ', expected ' + k); else console.log('  ✓ "' + q + '" → ' + k); });
const g = S.siteSearch('tree');
const flat = [].concat(...g.map((x) => x.items));
if (flat.length > 12) fail('too many results: ' + flat.length);
g.forEach((x) => { if (x.items.length > 4) fail('more than 4 results in group ' + x.label); });
if (S.siteSearch('').length || S.siteSearch('   ').length) fail('an empty query returned results');
if (S.siteSearch('zzqxj').length) fail('nonsense query returned results');

// 4. opening a result writes the key the page reads, and the page reads it once
const it = { type: 'sheet', id: 'lru-cache' };
if (S.searchTarget(it) !== 'Sheet.dc.html' || store['dsaviz-sheet-focus'] !== 'lru-cache') fail('sheet result does not set its focus key');
if (S.searchFocus('dsaviz-sheet-focus') !== 'lru-cache' || S.searchFocus('dsaviz-sheet-focus') !== null) fail('searchFocus should read once');
const reads = { 'Sheet.dc.html': 'dsaviz-sheet-focus', 'Patterns.dc.html': 'dsaviz-pattern-focus', 'Git.dc.html': 'dsaviz-git-lesson', 'Glossary.dc.html': 'dsaviz-glossary-term' };
Object.entries(reads).forEach(([page, key]) => {
  if (!fs.readFileSync(path.join(root, 'pages', page), 'utf8').includes("searchFocus('" + key + "')")) fail(page + ' does not read ' + key);
});

// 5. every page with the pill nav carries the current index (run the build after changing data)
const fresh = 'const SITE_INDEX = ' + JSON.stringify(SITE_INDEX) + ';';
fs.readdirSync(path.join(root, 'pages')).filter((f) => f.endsWith('.dc.html')).forEach((f) => {
  const src = fs.readFileSync(path.join(root, 'pages', f), 'utf8');
  if (src.includes('<!-- PILL NAV -->') && !src.includes(fresh)) fail(f + ' has a stale or missing search index; run the build');
});

console.log('search: ' + SITE_INDEX.items.length + ' items · ' + Object.entries(byType).map(([k, v]) => k + ' ' + v).join(', '));
console.log(problems ? problems + ' search problem(s)' : 'search clean');
if (problems) process.exitCode = 1;
