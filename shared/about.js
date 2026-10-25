// @@ABOUT@@ — "About this lesson" tab, shared by the lesson players (markup in shared/ui/about.html).
// A lesson with about data gets two tabs under its title: Watch it and About this lesson. About opens by itself
// the first time a learner opens that lesson (remembered in dsaviz-about-seen), Watch it after that.
// aboutVals(cmp, key, a, t, link): key is the lesson's id, a its about data ({ what, analogy, uses, before, words,
// math: { lines: [mathml], symbols: [[mathml, meaning]], example }, steps, use, avoid, mistakes, cheat, next }),
// link(ref) turns a 'before' or 'next' entry into { label, go } (go null for a plain topic name).
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
function aboutVals(cmp, key, a, t, link) {
  const v = cmp.state.aboutView;
  let view = !a ? 'watch' : v && v.key === key ? v.view : aboutSeenList().includes(key) ? 'watch' : 'about';
  if (view === 'about') markAboutSeen(key);
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
    watch: () => set('watch')
  };
  return { has: !!a, about: view === 'about', watch: view !== 'about', tabs: a ? [tab('watch', 'Watch it'), tab('about', 'About this lesson')] : [], A };
}
// @@END-ABOUT@@
