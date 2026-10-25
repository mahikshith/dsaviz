// Readability check: lesson text a complete beginner (about a 12-year-old reader) can follow.
// For every AI & ML lesson it reads the idea line, every step caption (as built by aiSteps) and the About tab,
// and fails on:
//   - a sentence over 18 words (numbers and symbols don't count as words)
//   - a lesson whose sentences average over 13 words
//   - long words (13+ letters) above 4% of the words, not counting the lesson's own key words and title
//   - words that talk down or hide a jump ("just", "simply", "obviously", "clearly") and idioms a
//     second-language reader can miss
//   - a jargon word in the idea or a step caption that the lesson's About tab does not explain (its key words)
//     and that is not explained in the same sentence ("X is", "X means", "called X")
// Tracks not rewritten yet (system design, Start here, stories) are measured and reported, not
// failed: add a track to ENFORCED once its text has been rewritten in plain English.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8').replace(/\r\n/g, '\n');

const MAX_WORDS = 18, MAX_AVG = 13, MAX_LONG = 0.04, LONG = 13;
const BANNED = ['just', 'simply', 'obviously', 'clearly', 'trivially', 'earn their keep', 'blurt', 'the catch', 'fiddly', 'gist', 'a piece of cake', 'in a nutshell', 'ballpark'];
const JARGON = ['gradient', 'loss', 'token', 'embedding', 'vector', 'matrix', 'softmax', 'sigmoid', 'neuron', 'parameter', 'derivative',
  'logit', 'entropy', 'variance', 'regularization', 'overfitting', 'transformer', 'cosine', 'dimension', 'centroid', 'classifier',
  'kernel', 'epoch', 'hyperparameter', 'logarithm', 'divergence', 'backprop', 'tanh', 'residual', 'benchmark', 'quantization'];
const ENFORCED = ['ai', 'sd', 'dsa'];

let problems = 0;
const fail = (where, msg) => { problems++; console.log('  ✗', where, msg); };

const sentences = (text) => String(text || '').replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-Z0-9“"(])/).map((s) => s.trim()).filter(Boolean);
const words = (s) => s.split(/\s+/).map((w) => w.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '')).filter((w) => /[A-Za-z]{2,}/.test(w) || /^[aI]$/.test(w));
const has = (text, term) => new RegExp('\\b' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(s|es)?\\b', 'i').test(text);
const explainedHere = (s, term) => new RegExp('\\b' + term + '(s|es)?\\b[^.]{0,4}\\b(is|are|means|mean)\\b|called (an? |the )?' + term + '|' + term + '(s)?\\s*[(,—–-]', 'i').test(s);

// Measures a list of [where, text] for one lesson; returns stats and reports failures when enforced.
function measure(id, parts, keep, enforce) {
  let n = 0, total = 0, long = 0, all = 0, over = 0, banned = 0;
  const keepSet = new Set(keep.map((w) => w.toLowerCase()));
  parts.forEach(([where, text]) => {
    sentences(text).forEach((s) => {
      const w = words(s);
      if (!w.length) return;
      n++; total += w.length; all += w.length;
      w.forEach((x) => { if (x.replace(/-/g, '').length >= LONG && !keepSet.has(x.toLowerCase()) && ![...keepSet].some((k) => k.includes(x.toLowerCase()))) long++; });
      if (w.length > MAX_WORDS) over++;
      BANNED.forEach((b) => { if (has(s, b)) banned++; });
      if (enforce && w.length > MAX_WORDS) fail(id + ' ' + where, w.length + ' words: "' + s.slice(0, 90) + (s.length > 90 ? '…' : '') + '"');
      if (enforce) BANNED.forEach((b) => { if (has(s, b)) fail(id + ' ' + where, '"' + b + '" in "' + s.slice(0, 70) + '"'); });
    });
  });
  const avg = n ? total / n : 0;
  const ratio = all ? long / all : 0;
  if (enforce && avg > MAX_AVG) fail(id, 'sentences average ' + avg.toFixed(1) + ' words (max ' + MAX_AVG + ')');
  if (enforce && ratio > MAX_LONG) fail(id, Math.round(ratio * 100) + '% long words (max ' + MAX_LONG * 100 + '%)');
  return { n, avg, ratio, over, banned };
}

// ---------- AI & ML ----------
const src = ['render.js', 'lessons.js'].map((f) => read('src', 'ai', f)).join('\n');
const M = new Function(src + '\nreturn { AI_LESSONS, aiSteps };')();
const { AI_ABOUT_ML } = require(path.join(root, 'src', 'ai', 'about_ml.js'));
const { AI_ABOUT_NOW } = require(path.join(root, 'src', 'ai', 'about_now.js'));
const ABOUT = Object.assign({}, AI_ABOUT_ML, AI_ABOUT_NOW);
const report = {};
M.AI_LESSONS.forEach((L, li) => {
  const a = ABOUT[L.id] || {};
  const enforce = ENFORCED.includes('ai');
  const say = M.aiSteps(li).map((s, i) => ['step ' + (i + 1), s.say]);
  const about = [['about what', a.what], ['about analogy', a.analogy]]
    .concat((a.uses || []).map((x) => ['about uses', x]), (a.words || []).map((x) => ['about words', x[1]]), (a.steps || []).map((x) => ['about steps', x]),
      (a.use || []).map((x) => ['about use', x]), (a.avoid || []).map((x) => ['about avoid', x]), (a.mistakes || []).map((x) => ['about mistakes', x]),
      ((a.math && a.math.symbols) || []).map((x) => ['about symbols', x[1]]), ((a.math && a.math.example) || []).map((x) => ['about example', x]));
  const keep = (a.words || []).map((x) => x[0]).concat(L.title.split(/\W+/));
  report[L.id] = measure(L.id, [['idea', L.idea]].concat(say, about), keep, enforce);
  // Jargon in the idea and the captions must be a key word in the About tab, or explained where it is used.
  const defined = (a.words || []).map((x) => x[0].toLowerCase()).join(' | ');
  [['idea', L.idea]].concat(say).forEach(([where, text]) => sentences(text).forEach((s) => JARGON.forEach((j) => {
    if (!has(s, j) || defined.includes(j) || explainedHere(s, j)) return;
    if (enforce) fail(L.id + ' ' + where, '"' + j + '" is not in the About tab\'s key words and not explained here: "' + s.slice(0, 70) + '"');
  })));
});
const ai = Object.values(report);
console.log('AI & ML: ' + ai.length + ' lessons, ' + ai.reduce((s, r) => s + r.n, 0) + ' sentences, average ' + (ai.reduce((s, r) => s + r.avg, 0) / ai.length).toFixed(1) + ' words');

// ---------- tracks measured but not enforced yet ----------
function strings(files, re) { const out = []; files.forEach((file) => { let m; const s = read(...file); re.lastIndex = 0; while ((m = re.exec(s))) out.push(m[1] || m[2]); }); return out; }
const startFiles = fs.readdirSync(path.join(root, 'src', 'start')).filter((f) => /^lessons_\d+\.js$/.test(f)).map((f) => ['src', 'start', f]);
[['sd', 'System design', [['src', 'sd', 'lessons.js']], /\bsay:\s*'((?:[^'\\]|\\.)*)'/g], ['dsa', 'DSA concepts', [['src', 'concepts', 'lessons.js']], /csStep\(\s*'((?:[^'\\]|\\.)*)'/g],
  ['start', 'Start here', startFiles, /\bsay:\s*'((?:[^'\\]|\\.)*)'|stBeat\('\w+',\s*'((?:[^'\\]|\\.)*)'/g]].filter(([key]) => key !== 'dsa').forEach(([key, name, files, re]) => {
  const list = strings(files, re).filter(Boolean);
  const enforce = ENFORCED.includes(key);
  const r = measure(name, list.map((t) => ['', t]), [], enforce);
  console.log(name + ': ' + r.n + ' sentences, average ' + r.avg.toFixed(1) + ' words, ' + Math.round(r.ratio * 100) + '% long words, ' + r.over + ' over ' + MAX_WORDS + ' words, ' + r.banned + ' talking-down words or idioms' + (enforce ? '' : ' (not enforced yet)'));
});

// ---------- DSA concepts (enforced) ----------
// Reads the real captions the player shows (at every slider position), plus each lesson's idea line and tag.
const CS = new Function(read('src', 'concepts', 'lessons.js') + '\nreturn { CS_LESSONS, csSteps };')();
{
  let n = 0, total = 0, over = 0, banned = 0;
  CS.CS_LESSONS.forEach((L, li) => {
    const P = L.param;
    const vals = P ? Array.from({ length: Math.floor((P.max - P.min) / P.step) + 1 }, (_, k) => P.min + k * P.step) : [undefined];
    const seen = new Set();
    const parts = [['idea', L.idea], ['tag', L.tag]];
    vals.forEach((v) => CS.csSteps(li, v).forEach((s, i) => { if (!seen.has(s.say)) { seen.add(s.say); parts.push(['step ' + (i + 1) + (v === undefined ? '' : ' @' + v), s.say]); } }));
    const r = measure('dsa:' + L.id, parts, L.title.split(/\W+/), ENFORCED.includes('dsa'));
    n += r.n; total += r.avg * r.n; over += r.over; banned += r.banned;
  });
  console.log('DSA concepts: ' + n + ' sentences, average ' + (total / n).toFixed(1) + ' words, ' + over + ' over ' + MAX_WORDS + ' words, ' + banned + ' talking-down words or idioms');
}

console.log(problems ? problems + ' problem(s)' : 'readability clean');
if (problems) process.exitCode = 1;
