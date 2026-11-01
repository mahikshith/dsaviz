// @@LESSONFRAME@@ — generated block (from shared/lessonframe.js): the frame around every lesson page.
// lessonFrame(cmp, spec) gives the holes behind the sidebar, the Back link and Previous / Next (markup: shared/ui/lesson_side.html,
// lesson_back.html, lesson_pager.html). One function for all five lesson pages; each page only says what its lessons are.
// spec: { label: 'DSA concept lessons', parent: { page: 'Concepts.dc.html', label: 'DSA concepts' },
//         sections: [{ title, items: [{ title, done, cur, href?, go? }] }], prev: item | null, next: item | null }
// An item with an href is a link to another page (the runtime opens it); one with only go() changes the lesson in place.
// The "On this page" rail (wide screens only, see .sh-rail in shell.html): lists the elements of the lesson page marked data-rail="Label"
// (Steps, About, Key words, The math, Cheat sheet; only those that exist) and highlights the one being read. It fills a nav with no React
// children of its own, so the list is plain DOM, rebuilt only when the set of sections changes.
function lessonRail(el) {
  try {
    const main = document.querySelector('main.sh-lesson');
    if (!el || !main) return;
    const marks = [...main.querySelectorAll('[data-rail]')];
    const sig = marks.map((m) => m.getAttribute('data-rail')).join('|');
    if (el.__sig !== sig) {
      el.__sig = sig; el.textContent = '';
      if (marks.length >= 2) {
        const h = document.createElement('div'); h.className = 'sh-label'; h.textContent = 'On this page'; el.appendChild(h);
        marks.forEach((m, i) => {
          const a = document.createElement('a'); a.href = '#' + i; a.textContent = m.getAttribute('data-rail'); a.setAttribute('data-i', i);
          a.addEventListener('click', (ev) => { ev.preventDefault(); const t = main.querySelectorAll('[data-rail]')[i]; if (t) t.scrollIntoView({ behavior: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); });
          el.appendChild(a);
        });
      }
    }
    const mark = () => {
      if (!document.contains(el)) { window.removeEventListener('scroll', el.__on); return; }
      const all = [...document.querySelectorAll('main.sh-lesson [data-rail]')]; let at = 0;
      all.forEach((m, i) => { if (m.getBoundingClientRect().top <= 120) at = i; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) at = all.length - 1;
      el.querySelectorAll('a').forEach((a) => { if (Number(a.getAttribute('data-i')) === at) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    };
    if (!el.__on) { let q = 0; el.__on = () => { if (!q) q = requestAnimationFrame(() => { q = 0; mark(); }); }; window.addEventListener('scroll', el.__on, { passive: true }); }
    mark();
  } catch (x) {}
}
function lessonFrame(cmp, spec) {
  const open = !!cmp.state.sideOpen;
  const link = (it) => {
    const own = !it.href;
    return {
      title: it.title, href: it.href || '#lesson', cur: it.cur ? 'page' : 'false', tick: it.done ? '✓' : '',
      aria: it.title + (it.done ? ', done' : ''),
      go: (e) => {
        if (own) { try { if (e && e.preventDefault) e.preventDefault(); } catch (x) {} }
        if (it.go) it.go(e);
        if (own) { try { cmp.setState({ sideOpen: false }); window.scrollTo(0, 0); } catch (x) {} }
      }
    };
  };
  const end = (it) => (it ? Object.assign(link(it), { show: true }) : { show: false, title: '', href: '#lesson', go: () => {} });
  return {
    side: {
      label: spec.label, open: open ? 'true' : 'false', sign: open ? '−' : '+',
      toggle: () => cmp.setState({ sideOpen: !open }),
      // Bring the current lesson into view in a long list, once per lesson.
      ref: (el) => {
        try {
          const cur = el && el.querySelector('[aria-current="page"]'), box = el && el.closest('.sh-side');
          const key = cur ? cur.textContent : '';
          if (!cur || !box || el.getAttribute('data-cur') === key) return;
          el.setAttribute('data-cur', key);
          setTimeout(() => { if (box.scrollHeight > box.clientHeight + 4) box.scrollTop = Math.max(0, cur.offsetTop - box.clientHeight / 3); }, 0);
        } catch (x) {}
      },
      sections: spec.sections.map((sec) => ({ title: sec.title, items: sec.items.map(link) }))
    },
    rail: { ref: lessonRail },
    back: lessonBack(spec.parent),
    prev: end(spec.prev), next: end(spec.next)
  };
}
// @@END-LESSONFRAME@@
