// Prints the Home roadmap's lesson list as JSON: { sd: [[id, title, track]...], ai: [...] }, in the hubs' order
// (SD_ORDER / AI_ORDER). scripts/build_pages.py writes it into the // @@ROADMAP-LITE@@ block of Home, so titles never go stale.
// SD track 'case' = HLD lessons with method: true (the hub's Case studies group).
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(root, ...p), 'utf8').replace(/\r\n/g, '\n');
const win = { localStorage: { getItem: () => null, setItem: () => {} }, matchMedia: () => ({ matches: false }) };
const sd = new Function('window', read('src', 'sd', 'engine.js') + '\n' + read('src', 'sd', 'lessons.js') + '\nreturn SD_LESSONS;')(win);
const ai = new Function(read('src', 'ai', 'render.js') + '\n' + read('src', 'ai', 'lessons.js') + '\nreturn AI_LESSONS;')();
process.stdout.write(JSON.stringify({
  sd: sd.map((x) => [x.id, x.title, x.track === 'hld' && x.method ? 'case' : x.track]),
  ai: ai.map((x) => [x.id, x.title, x.track])
}));
