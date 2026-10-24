// "Plan it first" and the hint ladder: every runnable problem (each code spec and each SQL spec) has a plan of 4 to 8
// plain steps of at most 100 characters, whose line ranges sit inside its reference; story plans name only story step
// kinds that the scene really plays; every coding problem has exactly three hints and one note per example; nothing
// names an outside problem site; the order game accepts the plan's order and rejects a reversed one; and the plan can be
// dropped into code as comments in every language.
const fs = require('fs');
const path = require('path');
const { TEST_SPECS, CODE_LANGS, starterCode } = require('../shared/tests_spec.js');
const { SQL_SPECS } = require('../shared/sql_spec.js');
const P = require('../shared/plans.js');
const { HINTS } = require('../shared/hints.js');

let bad = 0;
const fail = (id, msg) => { bad++; if (bad <= 60) console.log('  ✗', id, msg); };
const OUTSIDE = /leet\s*code|leetcode|\blc\s*#?\d|neetcode|hackerrank|codeforces/i;

// The story scenes, for their step kinds.
const src = fs.readFileSync(path.join(__dirname, '..', 'pages', 'Story.dc.html'), 'utf8');
const script = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const store = {};
const { SCENES } = new Function('store', `const window = { localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; } }, location: { search: '' }, addEventListener(){}, removeEventListener(){} };
const setInterval = () => 1, clearInterval = () => {};
class DCLogic { constructor(p) { this.props = p || {}; } setState(o) { Object.assign(this.state, o); } }
${script}; return { SCENES };`)(store);

const ids = Object.keys(TEST_SPECS).concat(Object.keys(SQL_SPECS));
for (const id of ids) {
  const spec = TEST_SPECS[id] || SQL_SPECS[id], plan = P.PLANS[id];
  if (!plan) { fail(id, 'has no plan'); continue; }
  if (typeof plan.goal !== 'string' || !plan.goal.includes(' → ')) fail(id, 'goal should read "input → output"');
  if (plan.goal.length > 120) fail(id, 'goal is longer than 120 characters');
  if (!Array.isArray(plan.steps) || plan.steps.length < 4 || plan.steps.length > 8) { fail(id, 'needs 4 to 8 steps, has ' + (plan.steps || []).length); continue; }
  const lines = P.planRefLines(id, spec);
  if (!lines.length) fail(id, 'reference has no lines');
  const scene = SCENES[id];
  const kinds = scene ? new Set(scene.steps.map((s) => s.kind)) : null;
  plan.steps.forEach((st, i) => {
    const [text, a, b, k] = st;
    if (typeof text !== 'string' || !text.trim()) fail(id, 'step ' + (i + 1) + ' is empty');
    else if (text.length > 100) fail(id, 'step ' + (i + 1) + ' is ' + text.length + ' characters (at most 100)');
    if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < a || b >= lines.length) fail(id, 'step ' + (i + 1) + ' lines ' + a + '-' + b + ' are outside the reference (' + lines.length + ' lines)');
    if (k !== undefined) {
      if (!kinds) fail(id, 'step ' + (i + 1) + ' names story kinds but the problem has no story');
      else k.split('|').forEach((x) => { if (!kinds.has(x)) fail(id, 'step ' + (i + 1) + ' names story kind ' + x + ', which the scene never plays'); });
    }
  });
  if (OUTSIDE.test(JSON.stringify(plan))) fail(id, 'plan names an outside problem site');
  // the order game
  const n = plan.steps.length, right = plan.steps.map((_, i) => i);
  if (!P.planOrderRight(plan, right)) fail(id, 'order check rejects the right order');
  if (P.planOrderRight(plan, right.slice().reverse())) fail(id, 'order check accepts a reversed order');
  const sh = P.planShuffle(id, n);
  if (sh.slice().sort((x, y) => x - y).join() !== right.join()) fail(id, 'shuffle is not a reordering of the steps');
  if (sh.join() === right.join()) fail(id, 'shuffle gives the answer away');
  // insert as comments, in every language
  const langs = SQL_SPECS[id] ? ['sql'] : CODE_LANGS.map(([k]) => k);
  for (const lang of langs) {
    const code = SQL_SPECS[id] ? '-- start\nSELECT 1;\n' : starterCode(spec, lang);
    const out = P.insertPlanComments(code, plan, lang, SQL_SPECS[id] ? '' : spec.sig && spec.sig[lang]);
    const want = P.planCommentLines(plan, lang);
    if (!want.every((l) => out.includes(l))) fail(id, lang + ': plan comments missing after insert');
    if (P.insertPlanComments(out, plan, lang, SQL_SPECS[id] ? '' : spec.sig && spec.sig[lang]) !== out) fail(id, lang + ': inserting twice adds the plan twice');
    if (!out.includes(code.trim().split('\n').pop())) fail(id, lang + ': insert lost the starter code');
  }
}
for (const id of Object.keys(P.PLANS)) if (!TEST_SPECS[id] && !SQL_SPECS[id]) fail(id, 'plan for an unknown problem');

// Every story problem lights at least one plan line during its animation.
for (const id of Object.keys(SCENES)) {
  const plan = P.PLANS[id];
  if (!plan) continue;
  if (!plan.steps.some((s) => s[3])) fail(id, 'story plan maps no step to the animation');
}

// The hint ladder: nudge, approach, key trick, and a why for each example.
for (const id of Object.keys(TEST_SPECS)) {
  const h = HINTS[id], spec = TEST_SPECS[id];
  if (!h) { fail(id, 'has no hints'); continue; }
  if (!Array.isArray(h.hints) || h.hints.length !== 3) fail(id, 'needs exactly 3 hints, has ' + (h.hints || []).length);
  else h.hints.forEach((x, i) => { if (typeof x !== 'string' || x.trim().length < 12) fail(id, 'hint ' + (i + 1) + ' is empty or too short'); });
  if (h.hints && new Set(h.hints).size !== h.hints.length) fail(id, 'two hints are the same');
  if (!Array.isArray(h.why) || h.why.length !== spec.examples.length) fail(id, 'needs one example note per example (' + spec.examples.length + ')');
  else h.why.forEach((x, i) => { if (typeof x !== 'string' || !x.trim() || x.length > 140) fail(id, 'example ' + (i + 1) + ' note is empty or over 140 characters'); });
  if (OUTSIDE.test(JSON.stringify(h))) fail(id, 'hints name an outside problem site');
}
for (const id of Object.keys(HINTS)) if (!TEST_SPECS[id]) fail(id, 'hints for an unknown problem');

if (bad > 60) console.log('  … and ' + (bad - 60) + ' more');
console.log(bad ? bad + ' plan problem(s)' : 'plans clean (' + ids.length + ' plans, ' + Object.keys(HINTS).length + ' hint ladders)');
process.exit(bad ? 1 : 0);
