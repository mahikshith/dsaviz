// @@ABOUT@@ — "About this lesson" sections, shared by the lesson players (markup in shared/ui/about.html).
// A lesson with about data shows its sections in the page, under the lesson: no tab and no fold.
// aboutVals(cmp, key, a, t, link): key is the lesson's id, a its about data ({ what, analogy, uses, before, words,
// math: { lines: [mathml], symbols: [[mathml, meaning]], example }, steps, use, avoid, mistakes, cheat, next }),
// link(ref) turns a 'before' or 'next' entry into { label, go } (go null for a plain topic name); watchLabel names
// the other tab (Watch it by default).
const ABOUT_SEEN_KEY = 'dsaviz-about-seen';
function aboutSeenList() { try { const v = JSON.parse(window.localStorage.getItem(ABOUT_SEEN_KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
function markAboutSeen(key) {
  const seen = aboutSeenList();
  if (seen.includes(key)) return;
  seen.push(key);
  try { window.localStorage.setItem(ABOUT_SEEN_KEY, JSON.stringify(seen)); } catch (e) {}
}
// Puts build-time MathML (our own about files, rendered by KaTeX in scripts/build_about.js) into an element.
function aboutMath(html) { return (el) => { if (el && el.nodeType === 1 && el.getAttribute('data-math') !== html) { el.innerHTML = html; el.setAttribute('data-math', html); } }; }
function aboutVals(cmp, key, a, t, link, watchLabel) {
  // The first look at a lesson decides its opening view; it is kept on the component so marking the lesson as
  // seen does not flip it to Watch it on the next render.
  if (!cmp.aboutFirst || cmp.aboutFirst.key !== key) cmp.aboutFirst = { key, view: 'watch' };
  const v = cmp.state.aboutView;
  const view = !a ? 'watch' : v && v.key === key ? v.view : cmp.aboutFirst.view;
  if (a) markAboutSeen(key);
  const set = (k) => cmp.setState({ aboutView: { key, view: k } });
  const tab = (k, label) => ({ label, on: view === k ? 'true' : 'false', bg: view === k ? t.text : 'transparent', fg: view === k ? t.bg : t.muted, pick: () => set(k) });
  const refs = (list) => (list || []).map((r) => { const l = link(r) || { label: r, go: null }; return { label: l.label, go: l.go || (() => {}), link: !!l.go, plain: !l.go }; });
  const items = (list) => (list || []).map((text, i) => ({ text, n: i + 1 }));
  const b = a || {};
  const A = {
    what: b.what || '', analogy: b.analogy || '', hasAnalogy: !!b.analogy,
    uses: items(b.uses), before: refs(b.before), hasBefore: !!(b.before && b.before.length), noBefore: !(b.before && b.before.length),
    words: (b.words || []).map(([term, mean]) => ({ term, mean })),
    math: {
      lines: ((b.math && b.math.lines) || []).map((h) => ({ put: aboutMath(h) })),
      symbols: ((b.math && b.math.symbols) || []).map(([h, mean]) => ({ put: aboutMath(h), mean })),
      example: items(b.math && b.math.example), hasExample: !!(b.math && b.math.example && b.math.example.length)
    }, hasMath: !!b.math,
    steps: items(b.steps), use: items(b.use), avoid: items(b.avoid), mistakes: items(b.mistakes), cheat: items(b.cheat),
    next: refs(b.next), hasNext: !!(b.next && b.next.length),
    hasGate: false, gateText: '', gateLink: '', gateHref: '', gateGo: () => {},
    watch: () => set('watch')
  };
  return { has: false, about: !!a, watch: true, tabs: [], A };
}
// "Why learn this?" fold (markup: shared/ui/why.html, text for patterns and hubs: src/why.js). A lesson with About data builds it from
// the About fields: the first sentence of `what`, then the first two `uses`. Patterns and hubs read WHY: [does, app, interview].
function whyFromAbout(a) {
  if (!a || !a.what) return null;
  const m = String(a.what).match(/^.*?[.!?](?=\s|$)/);
  return { does: m ? m[0] : String(a.what), where: (a.uses || []).slice(0, 2) };
}
function whyFromWhy(list) { return list ? { does: list[0], where: list.slice(1) } : null; }
function whyPattern(name) { return typeof WHY !== 'undefined' ? whyFromWhy(WHY.patterns[name]) : null; }
function whyHub(key) { return typeof WHY !== 'undefined' ? whyFromWhy(WHY.hubs[key]) : null; }
// w: { does, where: [text] } or null. The markup shows nothing when w is null.
function whyVals(w) {
  const b = w || { does: '', where: [] };
  return { has: !!w, does: b.does, where: b.where.map((text) => ({ text })), hasWhere: b.where.length > 0 };
}
// @@END-ABOUT@@
