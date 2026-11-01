// @@LESSONFRAME@@ — generated block (from shared/lessonframe.js): the frame around every lesson page.
// lessonFrame(cmp, spec) gives the holes behind the sidebar, the Back link and Previous / Next (markup: shared/ui/lesson_side.html,
// lesson_back.html, lesson_pager.html). One function for all five lesson pages; each page only says what its lessons are.
// spec: { label: 'DSA concept lessons', parent: { page: 'Concepts.dc.html', label: 'DSA concepts' },
//         sections: [{ title, items: [{ title, done, cur, href?, go? }] }], prev: item | null, next: item | null }
// An item with an href is a link to another page (the runtime opens it); one with only go() changes the lesson in place.
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
    back: lessonBack(spec.parent),
    prev: end(spec.prev), next: end(spec.next)
  };
}
// @@END-LESSONFRAME@@
