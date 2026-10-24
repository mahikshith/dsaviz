// @@FIND@@ — generated block (from shared/search.js): site search over SITE_INDEX, the @@SEARCH@@ block that
// scripts/build_search.js builds from the shared data. The pill nav (shared/nav.js, shared/ui/nav.html) shows the box.
// A small scorer, no library: exact title, title prefix, word prefixes, substring, then a loose in-order letter match.
// type: [group label, page, localStorage key the page reads to open the item, tie-break bonus]
const SEARCH_TYPES = {
  story: ['Stories', 'Story.dc.html', 'dsaviz-problem', 3],
  start: ['Start here lessons', 'Chapter.dc.html', 'dsaviz-start-lesson', 2.6],
  pattern: ['Patterns', 'Patterns.dc.html', 'dsaviz-pattern-focus', 2.5],
  problem: ['Problems', 'Code.dc.html', 'dsaviz-problem', 2],
  git: ['Git', 'Git.dc.html', 'dsaviz-git-lesson', 2],
  sd: ['System design', 'SDLesson.dc.html', 'dsaviz-sd-lesson', 2],
  ai: ['AI & ML', 'AILesson.dc.html', 'dsaviz-ai-lesson', 2],
  dsa: ['DSA concepts', 'ConceptLesson.dc.html', 'dsaviz-concept-lesson', 2.2],
  term: ['Glossary', 'Glossary.dc.html', 'dsaviz-glossary-term', 1.5],
  sheet: ['Master sheet', 'Sheet.dc.html', 'dsaviz-sheet-focus', 1]
};
const SEARCH_ORDER = Object.keys(SEARCH_TYPES);
function searchNorm(s) {
  return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9+#]+/g, ' ').trim();
}
let SEARCH_PREP = null;
function searchPrep() {
  if (!SEARCH_PREP) {
    SEARCH_PREP = SITE_INDEX.items.map(([type, id, title, sub, kw]) => {
      const t = searchNorm(title), o = searchNorm(sub + ' ' + kw);
      return { key: type + ':' + id, type, id, title, sub, t, tw: t.split(' '), o, ow: o.split(' ') };
    });
  }
  return SEARCH_PREP;
}
// Letters of q in order inside s, with few gaps: up to 35 points, or 0.
function searchLoose(q, s) {
  if (q.length < 3) return 0;
  let i = 0, start = -1, end = -1;
  for (let j = 0; j < s.length && i < q.length; j++) {
    if (s[j] === q[i]) { if (start < 0) start = j; end = j; i++; }
  }
  if (i < q.length) return 0;
  const span = end - start + 1;
  return span > q.length * 3 ? 0 : 35 * q.length / span;
}
function searchScore(q, qw, it) {
  const pre = (words) => qw.every((w) => words.some((x) => x.indexOf(w) === 0));
  let s = 0;
  if (it.t === q) s = 100;
  else if (it.t.indexOf(q) === 0) s = 90;
  else if (pre(it.tw)) s = 80;
  else if (it.t.indexOf(q) >= 0) s = 70;
  else if (qw.length === 1 && it.ow.indexOf(q) >= 0) s = 60;
  else if (qw.every((w) => it.tw.some((x) => x.indexOf(w) === 0) || it.ow.some((x) => x.indexOf(w) === 0))) s = 55;
  else if (it.o.indexOf(q) >= 0) s = 45;
  else s = searchLoose(q.replace(/ /g, ''), it.t.replace(/ /g, ''));
  if (!s) return 0;
  return s - Math.min(5, it.t.length / 20) + SEARCH_TYPES[it.type][3];
}
// Best matches, at most `per` of each type and `limit` in all, grouped by type in the order of each group's best match.
function siteSearch(query, limit, per) {
  limit = limit || 12; per = per || 4;
  const q = searchNorm(query);
  if (!q) return [];
  const qw = q.split(' ');
  const hits = [];
  searchPrep().forEach((it) => { const s = searchScore(q, qw, it); if (s > 0) hits.push([s, it]); });
  hits.sort((a, b) => b[0] - a[0] || SEARCH_ORDER.indexOf(a[1].type) - SEARCH_ORDER.indexOf(b[1].type) || a[1].title.localeCompare(b[1].title));
  const groups = [], byType = {};
  let n = 0;
  for (const [, it] of hits) {
    if (n >= limit) break;
    let g = byType[it.type];
    if (!g) { g = byType[it.type] = { type: it.type, label: SEARCH_TYPES[it.type][0], items: [] }; groups.push(g); }
    if (g.items.length >= per) continue;
    g.items.push(it);
    n++;
  }
  return groups;
}
// Read and forget a key a search result wrote (Sheet, Library, Git and Glossary use it on load).
function searchFocus(key) {
  try { const v = window.localStorage.getItem(key); if (v != null) window.localStorage.removeItem(key); return v; } catch (e) { return null; }
}
// Scroll an element into view once the page has drawn it.
function searchReveal(sel) {
  setTimeout(() => { try { const el = document.querySelector(sel); if (el && el.scrollIntoView) el.scrollIntoView({ block: 'center' }); } catch (e) {} }, 60);
}
// Remember what to open, and return the page that opens it.
function searchTarget(it) {
  const [, page, key] = SEARCH_TYPES[it.type];
  try { window.localStorage.setItem(key, it.id); } catch (e) {}
  return page;
}
// @@END-FIND@@
