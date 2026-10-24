// Registry check: data/problem-registry.json (built by scripts/build_registry.js) is current, covers every sheet
// problem once, and holds no duplicates: two problems may not share a normalized title or alias, nor share a
// signature and pattern with near-identical statements (token overlap of FAIL_AT or more fails; FLAG_AT or more is
// listed for review). It carries no outside problem numbers or site names.
const fs = require('fs');
const path = require('path');
const R = require('../scripts/build_registry.js');
const { TEST_SPECS } = require('../shared/tests_spec.js');
const { SQL_SPECS } = require('../shared/sql_spec.js');

const root = path.join(__dirname, '..');
let problems = 0;
const fail = (msg) => { problems++; console.log('  ✗', msg); };
const FAIL_AT = 0.9, FLAG_AT = 0.6;

const file = path.join(root, 'data', 'problem-registry.json');
const fresh = R.build();
let reg = null;
try { reg = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { fail('data/problem-registry.json is missing or not JSON: run npm run build'); }
if (reg && JSON.stringify(reg) !== JSON.stringify(fresh)) fail('data/problem-registry.json is stale: run npm run build');
const md = path.join(root, 'docs', 'problems', 'REGISTRY.md');
if (!fs.existsSync(md) || fs.readFileSync(md, 'utf8').replace(/\r\n/g, '\n') !== R.markdown(fresh)) fail('docs/problems/REGISTRY.md is stale: run npm run build');

const E = fresh.entries;
const text = JSON.stringify(E) + fs.readFileSync(md, 'utf8');
if (/leet\s*code/i.test(text)) fail('the registry names an outside problem site');
E.forEach((e) => { if ('n' in e || 'number' in e) fail(e.id + ': carries a problem number'); });

// one entry per problem page, every entry complete
const seen = new Map();
E.forEach((e) => {
  if (seen.has(e.id)) fail('page id ' + e.id + ' is used by ' + seen.get(e.id) + ' and ' + e.row); else seen.set(e.id, e.row);
  if (!e.title || !e.norm || !e.pattern || !e.diff || !e.sig) fail(e.row + ': incomplete entry ' + JSON.stringify(e));
});

// names: a normalized title or alias belongs to one problem
const names = new Map();
E.forEach((e) => [e.norm].concat(e.aliases).forEach((n) => {
  if (names.has(n) && names.get(n) !== e.id) fail('"' + n + '" names both ' + names.get(n) + ' and ' + e.id);
  else names.set(n, e.id);
}));

// statements: same signature and pattern with near-identical wording
const ask = (e) => (e.kind === 'sql' ? SQL_SPECS[e.id].ask : TEST_SPECS[e.id].ask);
const flagged = [];
const groups = new Map();
E.forEach((e) => { const k = e.pattern + '|' + e.sig; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(e); });
groups.forEach((list) => {
  for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
    const a = new Set(R.tokens(ask(list[i]))), b = new Set(R.tokens(ask(list[j])));
    const inter = [...a].filter((w) => b.has(w)).length, sim = inter / (a.size + b.size - inter || 1);
    if (sim >= FAIL_AT) fail(list[i].id + ' and ' + list[j].id + ' look like the same problem (' + Math.round(sim * 100) + '% of statement words shared, same signature and pattern)');
    else if (sim >= FLAG_AT) flagged.push(list[i].id + ' / ' + list[j].id + ' ' + Math.round(sim * 100) + '%');
  }
});

console.log('registry: ' + E.length + ' problems, ' + names.size + ' names, ' + groups.size + ' signature groups');
if (flagged.length) console.log('  for review (similar statements, not failures): ' + flagged.join('; '));
console.log(problems ? problems + ' registry problem(s)' : 'registry clean');
if (problems) process.exitCode = 1;
