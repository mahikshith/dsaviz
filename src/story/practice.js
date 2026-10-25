// ---- Practice: "Try your own input" and "Predict the next step" ----
// A scene that can re-run on new values registers SCENE_INPUT[id] in its own scenes_*.js file:
//   { hint, example, presets: [[label, () => input]], random: () => input,
//     parse(text) → input (throws inErr('plain message')), show(input) → text, check(input) → '' or a plain message,
//     make(input) → a scene with the same shape as the story's. make() with no input runs the story's own example. }
// Custom runs keep the story's code, rules, hints and quiz, and rebuild items, steps and the example.
// Their captions come from short templates per step kind, filled with the run's own values.

function inErr(msg) { const e = new Error(msg); e.plain = true; return e; }
function showList(a) { return '[' + a.join(', ') + ']'; }
function rint(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function rpick(list) { return list[Math.floor(Math.random() * list.length)]; }
function rlist(n, lo, hi) { return Array.from({ length: n }, () => rint(lo, hi)); }
function rdistinct(n, lo, hi) {
  const pool = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  return pool.slice(0, n);
}

// ---- parsers: forgiving about brackets, commas and spaces; strict about what the values are ----
function parseNums(text) {
  const body = String(text || '').trim().replace(/^\[/, '').replace(/\]$/, '').trim();
  if (!body) throw inErr('Type some numbers first, like 1, 3, 4.');
  const parts = body.split(/[\s,]+/).filter(Boolean);
  if (!parts.every((p) => /^-?\d+$/.test(p))) throw inErr('Use whole numbers separated by commas, like 1, 3, 4.');
  return parts.map(Number);
}
function parseNumsTarget(text) {
  const m = String(text || '').trim().match(/^\[([^\]]*)\]\s*,?\s*(-?\d+)\s*$/);
  if (!m) throw inErr('Write the list in square brackets, then the target, like [1, 3, 4, 6], 7.');
  return { nums: parseNums(m[1]), target: Number(m[2]) };
}
function showNumsTarget(v) { return showList(v.nums) + ', ' + v.target; }
function parseText(text) {
  const s = String(text || '').trim().replace(/^(["'])(.*)\1$/, '$2');
  if (!s) throw inErr('Type some letters first.');
  return { s };
}
function parseWords(text) {
  const parts = String(text || '').trim().replace(/["']/g, '').split(/[\s,]+/).filter(Boolean);
  if (parts.length !== 2) throw inErr('Type two words with a comma between them, like listen, silent.');
  return { s: parts[0], t: parts[1] };
}
// A grid of 0s and 1s: rows split by "/", ";" or new lines, or written as [[1,0],[0,1]].
function parseGrid(text) {
  const raw = String(text || '').trim();
  if (!raw) throw inErr('Type the rows of 0s and 1s, like 110 / 011.');
  const rows = /^\[\s*\[/.test(raw) ? (raw.match(/\[[^[\]]*\]/g) || []) : raw.split(/[\/;\n]+/);
  const grid = rows.map((r) => r.replace(/[\s,[\]'"]/g, '')).filter(Boolean).map((r) => r.split(''));
  if (!grid.length || !grid.every((r) => r.every((x) => x === '0' || x === '1'))) throw inErr('Use only 0 (water) and 1 (land), one row at a time, like 110 / 011.');
  return { grid };
}
function showGrid(v) { return v.grid.map((r) => r.join('')).join(' / '); }
// A tree in level order, null for a gap: [8, 3, 10, null, 6].
function parseTree(text) {
  const body = String(text || '').trim().replace(/^\[/, '').replace(/\]$/, '').trim();
  const parts = body.split(/[\s,]+/).filter(Boolean);
  if (!parts.length || !parts.every((p) => /^(-?\d+|null)$/i.test(p))) throw inErr('Write the tree level by level, with null for a gap, like [8, 3, 10, null, 6].');
  return { arr: parts.map((p) => (/^null$/i.test(p) ? null : Number(p))) };
}
function showTree(v) { return '[' + v.arr.map((x) => (x == null ? 'null' : x)).join(', ') + ']'; }
function parseInts(text, k, sample) {
  const parts = String(text || '').trim().split(/[\s,x×]+/i).filter(Boolean);
  if (parts.length !== k || !parts.every((p) => /^-?\d+$/.test(p))) throw inErr('Type ' + (k === 1 ? 'one whole number' : k + ' whole numbers') + ', like ' + sample + '.');
  return parts.map(Number);
}

// ---- checks: each returns '' when fine, or one plain sentence ----
function checkCount(list, lo, hi, what) { return list.length < lo || list.length > hi ? 'Use ' + lo + ' to ' + hi + ' ' + what + ', so every tile stays readable. You have ' + list.length + '.' : ''; }
function checkRange(list, lo, hi, what) { return list.every((x) => Number.isInteger(x) && x >= lo && x <= hi) ? '' : what + ' must be whole numbers from ' + lo + ' to ' + hi + '.'; }
function checkSorted(list, strict) { return list.every((x, i) => !i || (strict ? x > list[i - 1] : x >= list[i - 1])) ? '' : strict ? 'The list must go up from small to big, with no number twice.' : 'The list must be sorted from small to big.'; }
function checkDistinct(list) { return new Set(list).size === list.length ? '' : 'Use each number only once.'; }
// a sorted list of different numbers, cut once and the parts swapped (or not cut at all)
function checkRotated(list) {
  if (checkDistinct(list)) return checkDistinct(list);
  const drops = list.filter((x, i) => i && x < list[i - 1]).length;
  return drops === 0 || (drops === 1 && list[list.length - 1] < list[0]) ? '' : 'It must be a sorted list cut once with the parts swapped, like 5, 7, 9, 1, 3.';
}
function pairsTo(nums, target) { const out = []; for (let i = 0; i < nums.length; i++) for (let j = i + 1; j < nums.length; j++) if (nums[i] + nums[j] === target) out.push([i, j]); return out; }
function checkOnePair(nums, target) {
  const n = pairsTo(nums, target).length;
  return n === 1 ? '' : n === 0 ? 'No two numbers add up to ' + target + '. Pick a target that two of them make.' : n + ' pairs add up to ' + target + '. The problem promises exactly one, so change a number or the target.';
}
// a random list with exactly one pair that makes the target
function randOnePair(sorted, n, lo, hi) {
  for (let tries = 0; tries < 400; tries++) {
    const nums = rlist(n || rint(4, 8), lo, hi);
    if (sorted) nums.sort((a, b) => a - b);
    const i = rint(0, nums.length - 1), j = rint(0, nums.length - 1);
    if (i === j) continue;
    const target = nums[i] + nums[j];
    if (pairsTo(nums, target).length === 1) return { nums, target };
  }
  return sorted ? { nums: [1, 3, 4, 6, 8, 11], target: 10 } : { nums: [4, 9, 2, 7, 5], target: 12 };
}

// ---- layout: shrink a row of tiles so up to 9 fit the stage ----
function fitRow(base, n, maxW) {
  const gap = base.pitch - base.tile;
  const pitch = Math.min(base.pitch, Math.floor(maxW / n));
  const k = pitch / base.pitch, tile = pitch - Math.round(gap * k);
  const o = { pitch, tile, width: (n - 1) * pitch + tile };
  if (base.tileH) o.tileH = Math.round(base.tileH * Math.max(k, 0.75));
  if (base.font) o.font = Math.max(16, Math.round(base.font * Math.max(k, 0.7)));
  return o;
}
// planks: heights scale so the tallest stays under the stage roof
function fitPlanks(base, list, maxW) { return Object.assign(fitRow(base, list.length, maxW), { unit: Math.min(base.unit, Math.floor(150 / Math.max(1, Math.max.apply(null, list)))) }); }

// ---- building a run ----
function runStep(kind, fields, dialog, kid, builder, expert) { return Object.assign({ kind, dialog, nar: { kid, builder, expert } }, fields); }
function runFinish(steps, T, each) {
  steps.forEach((st, i) => { st.verdict = T[st.kind][0]; st.tone = T[st.kind][1]; st.done = !!st.done; each(st, i); });
  return steps;
}
// Lines for step kinds the story never needed (such as "not found"): the last code line matching re, per language.
function runLines(base, extra) {
  const out = {};
  Object.keys(base.code).forEach((lang) => {
    const own = Object.assign({}, base.lines[lang] || base.lines.py);
    Object.keys(extra).forEach((k) => { base.code[lang].forEach(([c], i) => { if (extra[k].test(c)) own[k] = i + 1; }); });
    out[lang] = own;
  });
  return out;
}
function runScene(id, over, steps) { return Object.assign({}, SCENES[id], over, { steps, custom: true }); }
// One call for the page and the tests: text → { scene } or { error }.
function runFromText(id, text) {
  const spec = SCENE_INPUT[id];
  if (!spec) return { error: 'This story has no custom input yet.' };
  let input;
  try { input = spec.parse(text); } catch (e) { return { error: e.plain ? e.message : 'That input could not be read. Try the format in the example.' }; }
  const bad = spec.check(input);
  if (bad) return { error: bad };
  return { scene: spec.make(input), input };
}

// ---- Predict the next step ----
// The question is built from the scene's rules: each rule names a step kind, and its words after "→" are the choice.
// The right choice is the next step's kind. predictAlias folds kinds that share one rule (the left marker or the right marker skipping a space).
// predictFull keeps the whole rule when the short forms would sound alike; predictCue(step) replaces the meter text as the cue.
function predictKind(S, k) { return (S.predictAlias && S.predictAlias[k]) || k; }
function predictQuestion(S, j) {
  const st = S.steps[j];
  if (!st || j < 1) return null;
  const seen = new Set();
  const rules = (S.rules || []).filter(([, k]) => k !== 'intro' && !seen.has(k) && seen.add(k));
  const kind = predictKind(S, st.kind);
  const right = rules.find(([, k]) => k === kind);
  if (!right) return null;
  const used = new Set(S.steps.map((x) => predictKind(S, x.kind)));
  const others = rules.filter((r) => r !== right);
  const pool = others.filter(([, k]) => used.has(k)).concat(others.filter(([, k]) => !used.has(k))).slice(0, 2);
  const short = (txt) => {
    if (S.predictFull) return txt;
    const i = txt.indexOf('→');
    const a = i >= 0 ? txt.slice(i + 1).trim() : txt;
    return a.charAt(0).toUpperCase() + a.slice(1);
  };
  const choices = rules.filter((r) => r === right || pool.includes(r)).map(([txt, k]) => ({ label: short(txt), right: k === kind }));
  if (choices.length < 2 || new Set(choices.map((c) => c.label)).size !== choices.length) return null;
  const cue = String(S.predictCue ? S.predictCue(st, j) : st.meter.text);
  return { at: j, cue, choices, answer: choices.find((c) => c.right).label };
}
