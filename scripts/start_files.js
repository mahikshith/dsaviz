// The Start here source files, in the order they are joined: the engine, the lesson list, each lessons_*.js file
// (stories, code, try-its and checks), the exercises, the needs tags and the generated traces.
// scripts/build_pages.py joins the same list in the same order.
const fs = require('fs');
const path = require('path');
function startFiles(withTraces) {
  const dir = path.join(__dirname, '..', 'src', 'start');
  const lessons = fs.readdirSync(dir).filter((f) => /^lessons_.*\.js$/.test(f)).sort();
  return ['engine.js', 'chapters.js'].concat(lessons, ['exercises.js', 'needs.js'], withTraces === false ? [] : ['traces.js']);
}
function startSource(withTraces) {
  const dir = path.join(__dirname, '..', 'src', 'start');
  return startFiles(withTraces).map((f) => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
}
module.exports = { startFiles, startSource };
