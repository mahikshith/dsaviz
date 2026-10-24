// Link check: every problem is ours. The shipped site never names or links an outside problem site, problem links
// (sheet titles, Today's 5, the random pick, Revisit cards, briefings, pattern cards) open our own pages, and no
// problem shows an outside catalogue number next to its title.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8');
let problems = 0;
const fail = (where, msg) => { problems++; console.log('  ✗', where, msg); };

// 1. No outside problem site named anywhere that ships: the built site, the pages and their sources.
const OUTSIDE = /leet\s*code/i;
const dist = read('dist', 'index.html');
if (OUTSIDE.test(dist)) fail('dist/index.html', 'names an outside problem site: ' + dist.match(new RegExp('.{0,60}' + OUTSIDE.source + '.{0,60}', 'i'))[0]);
const shipped = [];
const walk = (dir) => fs.readdirSync(path.join(root, dir)).forEach((f) => {
  const p = path.join(dir, f);
  if (fs.statSync(path.join(root, p)).isDirectory()) walk(p);
  else if (/\.(js|html|json|css|py)$/.test(f)) shipped.push(p);
});
['pages', 'shared', 'src'].forEach(walk);
shipped.forEach((p) => {
  const lines = read(p).split('\n');
  lines.forEach((l, i) => { if (OUTSIDE.test(l)) fail(p + ':' + (i + 1), 'names an outside problem site: ' + l.trim().slice(0, 100)); });
});

// 2. Problem links stay on the site. These pages show problem names that can be clicked; outside of fonts,
// the Python and SQLite runtimes and SVG namespaces they link nowhere off the site.
const ALLOWED = /^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net\/pyodide\/|cdn\.jsdelivr\.net\/npm\/sql\.js@)|^http:\/\/www\.w3\.org\//;
['Sheet', 'Revisit', 'Briefing', 'Patterns', 'Code', 'Story', 'Home'].forEach((name) => {
  // The test data of the problem specs is not page content (the web-crawler tests hold made-up addresses).
  const src = read('pages', name + '.dc.html').replace(/\/\/ @@TESTS-SPEC@@[\s\S]*?\/\/ @@END-TESTS-SPEC@@/, '');
  for (const m of src.matchAll(/https?:\/\/[^\s"'`)<>]+/g)) if (!ALLOWED.test(m[0])) fail(name + '.dc.html', 'links off the site: ' + m[0]);
  const markup = src.slice(src.indexOf('<x-dc>'), src.indexOf('</x-dc>'));
  for (const m of markup.matchAll(/<a\b[^>]*>/g)) if (/target="_blank"/.test(m[0]) && !/fonts\./.test(m[0])) fail(name + '.dc.html', 'a link opens a new tab, off the site: ' + m[0].slice(0, 100));
});
// The sheet's clickable names use the row's own problem page.
{
  const sheetPage = read('pages', 'Sheet.dc.html');
  ['{{r.href}}', '{{td.href}}', '{{pick.href}}'].forEach((h) => { if (!sheetPage.includes('href="' + h + '"')) fail('Sheet.dc.html', 'no link to ' + h); });
  const win = { localStorage: { getItem: () => null, setItem: () => {} } };
  const { SHEET, PROBLEMS } = new Function('window', read('shared', 'catalog.js') + '\n' + read('shared', 'sheet.js') + '\nreturn { SHEET, PROBLEMS };')(win);
  SHEET.forEach((r) => { if (!/^Code\.dc\.html\?problem=[a-z0-9-]+$/.test(r.href)) fail('sheet ' + r.id, 'opens ' + r.href); });
  // Revisit cards, briefings and pattern cards build their links from our own pages.
  const revisit = read('src', 'pages', 'revisit.js');
  if (!/solveHref\(slug\)/.test(revisit)) fail('src/pages/revisit.js', 'a sheet card does not open its problem page');
  if (!/solveHref: 'Code\.dc\.html\?problem='/.test(read('pages', 'Briefing.dc.html'))) fail('Briefing.dc.html', 'the briefing does not link its problem page');
  if (!/href: solveHref\(id\)/.test(read('pages', 'Patterns.dc.html'))) fail('Patterns.dc.html', 'pattern cards do not open problem pages');

  // 3. No outside catalogue numbers: the data carries none, the markup prints none, the built site shows none.
  PROBLEMS.forEach((p) => { if ('n' in p) fail('catalog ' + p.id, 'carries a problem number'); });
  SHEET.forEach((r) => { if ('n' in r) fail('sheet ' + r.id, 'carries a problem number'); });
  const { SQL_SPECS } = require('../shared/sql_spec.js');
  Object.keys(SQL_SPECS).forEach((id) => { if ('n' in SQL_SPECS[id]) fail('sql ' + id, 'carries a problem number'); });
  const { TEST_SPECS } = require('../shared/tests_spec.js');
  Object.keys(TEST_SPECS).forEach((id) => { const m = TEST_SPECS[id].meta; if (m && m.some((x) => typeof x === 'number')) fail('spec ' + id, 'meta carries a problem number'); });
  fs.readdirSync(path.join(root, 'pages')).filter((f) => f.endsWith('.dc.html')).forEach((f) => {
    const src = read('pages', f), markup = src.slice(src.indexOf('<x-dc>'), src.indexOf('</x-dc>'));
    for (const m of markup.matchAll(/\{\{(r|P|p|td|pick|pp|card|cp|sp|row|info)\.n\}\}/g)) fail(f, 'prints a problem number: ' + m[0]);
  });
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const titles = [...new Set(SHEET.map((r) => r.name))];
  titles.forEach((t) => {
    const after = new RegExp(esc(t) + '\\s*(#\\d|·\\s*#?\\d{1,4}\\b|\\(\\d{1,4}\\))'), before = new RegExp('(#|\\b)\\d{1,4}[.:]\\s+' + esc(t) + '\\b');
    const m = dist.match(after) || dist.match(before);
    if (m) fail('dist/index.html', 'shows a number next to "' + t + '": ' + m[0]);
  });
}

console.log('links: ' + shipped.length + ' shipped files and the built site checked');
console.log(problems ? problems + ' link problem(s)' : 'links clean');
if (problems) process.exitCode = 1;
