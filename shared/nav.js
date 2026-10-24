// @@NAV@@ — generated block (from shared/nav.js): the floating pill nav at the top of every page.
// Markup: shared/ui/nav.html, copied between the PILL NAV comment markers together with the menu drawer.
// A page adds `...navVals(this, t, themeKey, 'Home')` to its renderVals.
// NAV_PAGES is filled in by scripts/build_pages.py with the boards that exist, so a section
// whose page is not built yet shows as "Soon" instead of a dead link.
const NAV_PAGES = /*@@PAGES@@*/[];
// key, label, page, icon, hidden on phones unless active
const NAV_ITEMS = [
  ['home', 'Home', 'Home.dc.html', 'home', false],
  ['learn', 'Learn', 'Patterns.dc.html', 'learn', false],
  ['sheet', 'Sheet', 'Sheet.dc.html', 'sheet', false],
  ['code', 'Code', 'Code.dc.html', 'code', false],
  ['git', 'Git', 'Git.dc.html', 'git', true],
  ['design', 'System design', 'SystemDesign.dc.html', 'design', true],
  ['ai', 'AI/ML', 'AIML.dc.html', 'ai', true]
];
// Which section each page belongs to.
const NAV_SECTION = { Home: 'home', Patterns: 'learn', Briefing: 'learn', Story: 'learn', Revisit: 'learn', Glossary: 'learn', Basics: 'learn', Interview: 'learn',
  Sheet: 'sheet', Code: 'code', Git: 'git', SystemDesign: 'design', SDLesson: 'design', AIML: 'ai', AILesson: 'ai' };
// The search box: "/" anywhere (outside a text field) opens it on the page that is showing.
function searchShow(cmp) {
  cmp.setState({ sOpen: true, sAct: 0 });
  setTimeout(() => { try { const el = document.querySelector('[data-pn-search-input]'); if (el) el.focus(); } catch (e) {} }, 0);
}
function searchHide(cmp, refocus) {
  cmp.setState({ sOpen: false, sQ: '', sAct: 0 });
  if (refocus) setTimeout(() => { try { const el = document.querySelector('[data-pn-search-btn]'); if (el) el.focus(); } catch (e) {} }, 0);
}
function searchGo(cmp, it) {
  const page = searchTarget(it);
  searchHide(cmp, false);
  if (typeof window !== 'undefined' && window.__dsNav) window.__dsNav(page);
}
if (typeof window !== 'undefined' && !window.__dsSearchKeys) {
  window.__dsSearchKeys = true;
  try {
    window.addEventListener('keydown', (e) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      const el = e.target, tag = el && el.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (el && el.isContentEditable)) return;
      const cmp = window.__dsSearchCmp;
      if (!cmp || !cmp.__host || !cmp.__host.__mounted) return;
      e.preventDefault();
      searchShow(cmp);
    });
  } catch (e) {}
}
function searchVals(cmp, t) {
  if (typeof window !== 'undefined') window.__dsSearchCmp = cmp;
  const st = cmp.state;
  const q = st.sQ || '';
  const groups = st.sOpen ? siteSearch(q) : [];
  const flat = [];
  groups.forEach((g) => g.items.forEach((it) => flat.push(it)));
  const act = Math.max(0, Math.min(flat.length - 1, st.sAct || 0));
  let i = 0;
  const C = SITE_INDEX.counts;
  return {
    open: !!st.sOpen, closed: !st.sOpen, q, icon: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
    expanded: st.sOpen && flat.length ? 'true' : 'false',
    active: flat.length ? 'pn-opt-' + act : '',
    hint: q.trim() ? '' : 'Stories, ' + C.sheet + ' sheet problems, ' + C.runnable + ' runnable problems, lessons and glossary terms',
    hasHint: !q.trim(), none: !!q.trim() && !flat.length,
    status: q.trim() ? (flat.length ? flat.length + ' results' : 'No results') : '',
    groups: groups.map((g) => ({
      label: g.label, gid: 'pn-grp-' + g.type,
      items: g.items.map((it) => {
        const k = i++;
        const on = k === act;
        return { id: 'pn-opt-' + k, title: it.title, sub: it.sub, href: SEARCH_TYPES[it.type][1], sel: on ? 'true' : 'false',
          bg: on ? t.sunk : 'transparent', bar: on ? t.accent : 'transparent',
          go: (e) => { searchTarget(it); searchHide(cmp, false); },
          hover: () => { if ((cmp.state.sAct || 0) !== k) cmp.setState({ sAct: k }); } };
      })
    })),
    show: () => searchShow(cmp),
    hide: () => searchHide(cmp, true),
    onInput: (e) => cmp.setState({ sQ: e && e.target ? e.target.value : '', sAct: 0 }),
    onKey: (e) => {
      if (!e) return;
      if (e.stopPropagation) e.stopPropagation();
      const n = flat.length;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (e.preventDefault) e.preventDefault();
        if (n) cmp.setState({ sAct: (act + (e.key === 'ArrowDown' ? 1 : n - 1)) % n });
      } else if (e.key === 'Home' && n) { if (e.preventDefault) e.preventDefault(); cmp.setState({ sAct: 0 }); }
      else if (e.key === 'End' && n) { if (e.preventDefault) e.preventDefault(); cmp.setState({ sAct: n - 1 }); }
      else if (e.key === 'Enter') { if (e.preventDefault) e.preventDefault(); if (n) searchGo(cmp, flat[act]); }
      else if (e.key === 'Escape') { if (e.preventDefault) e.preventDefault(); searchHide(cmp, true); }
    }
  };
}
function navVals(cmp, t, themeKey, page) {
  const section = NAV_SECTION[page] || '';
  const me = DS.profile();
  const st = DS.streak();
  const dv = drawerVals(cmp, t, themeKey);
  return Object.assign(dv, {
    nav: {
      glass: tint(t.surface, 'EB'), shadow: t.shadow,
      items: NAV_ITEMS.map(([key, label, href, icon, extra]) => {
        const on = key === section;
        const live = NAV_PAGES.includes(href);
        return { label, href, d: ICONS[icon], on: on ? 'true' : 'false', current: on ? 'page' : 'false', extra: extra ? 'true' : 'false',
          live, soon: !live, title: live ? label : label + ' · coming soon',
          bg: on ? t.accent : 'transparent', fg: on ? t.onAccent : t.text2 };
      }),
      streak: st.current, streakLabel: st.current ? st.current + '-day streak' : 'No streak yet',
      flame: st.current ? t.flame : t.muted,
      initials: me.initials, hasName: !!me.initials, noName: !me.initials, userIcon: ICONS.user,
      profileOn: page === 'Profile' ? 'page' : 'false',
      avatarBg: page === 'Profile' ? t.accent : t.sunk, avatarFg: page === 'Profile' ? t.onAccent : t.text,
      guest: dv.guest && page === 'Main', member: !(dv.guest && page === 'Main'),
      srch: searchVals(cmp, t)
    }
  });
}
// @@END-NAV@@
