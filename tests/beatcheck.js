// Story words stay out of lesson chrome (docs/design/PLAN-2026-11.md): in Start here a lesson's moves are called steps, never "beats",
// and the first stage tab is "Watch", not "Story". Story words are for a problem's story mode only. Reads the markup and the UI strings
// of the five lesson pages and src/start/engine.js; the lesson data (stBeat(...) calls, story: [...]) is left alone.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8').replace(/\r\n/g, '\n');
let bad = 0;
const fail = (where, msg) => { bad++; console.log('  ✗', where, msg); };
const UI = [/aria-label="[^"]*\bbeats?\b/i, /title="[^"]*\bbeats?\b/i, />[^<{]*\bBeat \d/, /['"`]Beat ['"`]/, /['"`] · beat ['"`]/, /\bBeat [{$]/, /in this story/i];
for (const pg of ['Chapter', 'ConceptLesson', 'SDLesson', 'AILesson', 'Git']) {
  const s = read('pages', pg + '.dc.html');
  const body = s.slice(s.indexOf('</helmet>'), s.indexOf('<script type="text/x-dc"'));
  const code = s.slice(s.indexOf('// ---- page ----') > 0 ? s.indexOf('// ---- page ----') : s.lastIndexOf('class Component'));
  // UI strings built in the page script: look at the renderVals part only.
  const vals = code.slice(code.indexOf('renderVals()'));
  for (const re of UI) {
    if (re.test(body)) fail(pg, 'markup matches ' + re);
    if (re.test(vals)) fail(pg, 'renderVals matches ' + re);
  }
}
if (/\['story', 'Story'\]/.test(read('src', 'start', 'engine.js'))) fail('src/start/engine.js', 'the first stage tab is still called Story');
console.log(bad ? bad + ' problem(s)' : 'lesson chrome has no story words');
if (bad) process.exitCode = 1;
