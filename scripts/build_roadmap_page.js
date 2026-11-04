// Prints the Roadmap page's data as JSON: every track's lessons in the order the site teaches them.
// scripts/build_pages.py writes it into the // @@ROADMAP-DATA@@ block of pages/Patterns.dc.html (the Roadmap page).
// start: [{ n, title, lessons: [[id, title]] }] by chapter (a chapter is a "part" of the Start here ladder); the others are [[id, title]].
// Everything comes from the same data the search index uses, so a lesson that exists is on the Roadmap and nothing else is.
const { build } = require('./build_search.js');
const path = require('path');
const { startSource } = require('./start_files.js');
const { START_CHAPTERS, START_PARTS } = new Function(startSource(false) + '\nreturn { START_CHAPTERS, START_PARTS };')();
const items = build().items;
const of = (type) => items.filter((x) => x[0] === type).map((x) => [x[1], x[2]]);
const ready = START_CHAPTERS.filter((c) => c.ready);
const start = START_PARTS.map((p) => ({ n: p.n, title: p.title, lessons: ready.filter((c) => c.part === p.n).map((c) => [c.id, c.title]) })).filter((p) => p.lessons.length);
process.stdout.write(JSON.stringify({ start, dsa: of('dsa'), cplx: of('cplx'), git: of('git'), sd: of('sd'), ai: of('ai') }));
