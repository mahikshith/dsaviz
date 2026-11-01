// The picture of a lesson never opens empty: step 1 of every AI & ML and DSA concept lesson (and of both ends of its slider) must show
// something besides a bare chart, i.e. at least one point, bar, box, node, token, arrow, ring or a line that is not a grid line.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const rd = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8').replace(/\r\n/g, '\n');
const AI = new Function(rd('src', 'ai', 'render.js') + '\n' + rd('src', 'ai', 'lessons.js') + '\nreturn { L: AI_LESSONS, steps: aiSteps };')();
const CS = new Function(rd('src', 'ai', 'render.js') + '\n' + rd('src', 'concepts', 'lessons.js') + '\nreturn { L: CS_LESSONS, steps: csSteps };')();
const MARKS = ['bars', 'boxes', 'nodes', 'tokens', 'arrows', 'edges', 'links', 'rings', 'points'];
const marks = (sc) => MARKS.reduce((n, k) => n + ((sc[k] || []).length), 0) + (sc.paths || []).filter((p) => p.c !== 'ln' && p.c !== undefined).length;
let bad = 0, n = 0;
for (const [name, M] of [['AI & ML', AI], ['DSA concepts', CS]]) {
  M.L.forEach((L, i) => {
    const vals = L.param ? [undefined, L.param.min, L.param.max] : [undefined];
    vals.forEach((v) => {
      n++;
      const sc = M.steps(i, v)[0].scene;
      if (sc.axes && marks(sc) === 0) { bad++; console.log('  ✗ ' + name + ' ' + L.id + ': the first frame is a bare chart'); }
    });
  });
}
console.log(n + ' first frames checked');
console.log(bad ? bad + ' blank' : 'first frames clean');
if (bad) process.exitCode = 1;
