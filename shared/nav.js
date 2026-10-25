// @@NAV@@ — generated block (from shared/nav.js): the floating pill nav at the top of every page.
// Markup: shared/ui/nav.html, copied between the PILL NAV comment markers together with the menu drawer.
// A page adds `...navVals(this, t, themeKey, 'Home')` to its renderVals.
// NAV_PAGES is filled in by scripts/build_pages.py with the boards that exist, so a section
// whose page is not built yet shows as "Soon" instead of a dead link.
const NAV_PAGES = /*@@PAGES@@*/[];
// key, label, page, icon, hidden on phones unless active
const NAV_ITEMS = [
  ['home', 'Home', 'Home.dc.html', 'home', false],
  ['start', 'Start here', 'Start.dc.html', 'start', false],
  ['learn', 'Learn', 'Patterns.dc.html', 'learn', false],
  ['sheet', 'Sheet', 'Sheet.dc.html', 'sheet', false],
  ['code', 'Code', 'Code.dc.html', 'code', false],
  ['git', 'Git', 'Git.dc.html', 'git', true],
  ['design', 'System design', 'SystemDesign.dc.html', 'design', true],
  ['ai', 'AI/ML', 'AIML.dc.html', 'ai', true]
];
// Which section each page belongs to.
const NAV_SECTION = { Home: 'home', Patterns: 'learn', Briefing: 'learn', Story: 'learn', Revisit: 'learn', Concepts: 'learn', ConceptLesson: 'learn', Glossary: 'learn', Interview: 'learn',
  Start: 'start', Chapter: 'start', Basics: 'start',
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
// The daily check-in: on the first visit of each day (once the learner has done anything), a small modal says which
// streak day today is, with one action. When yesterday was missed and the week's freeze can save the streak, that is the action.
// It is marked seen as soon as it shows, so it never comes back the same day.
function dailyVals(cmp, t) {
  if (cmp.__daily === undefined) {
    let d = null;
    try { d = DS.daily(); } catch (e) {}
    cmp.__daily = d && d.show ? d : null;
    if (cmp.__daily) { try { DS.markDailySeen(); } catch (e) {} setTimeout(() => { try { const el = document.querySelector('[data-daily-go]'); if (el) el.focus(); } catch (e) {} }, 60); }
  }
  const d = cmp.__daily || { day: 1, keeps: 0, offer: false, broken: false, activeToday: false }, open = !!cmp.__daily && !cmp.state.dailyClosed;
  const close = () => cmp.setState({ dailyClosed: true });
  const saved = !!cmp.state.dailySaved;
  const offer = d.offer && !saved;
  const day = saved ? d.keeps + 1 : d.day;
  return {
    open, close,
    title: offer ? 'You missed yesterday' : d.broken ? 'Day 1. Start again' : 'Day ' + day + '. Keep it going',
    body: offer ? 'Your ' + d.keeps + '-day streak can still live. Use this week’s freeze to cover yesterday.'
      : saved ? 'Freeze used. Yesterday is covered, so your streak is safe. Do one thing today to make it day ' + day + '.'
      : d.broken ? 'Your last streak ended. One problem, story or revisit card today starts a new one.'
      : d.activeToday ? 'You have already done something today. Your streak is ' + day + (day === 1 ? ' day.' : ' days.')
      : 'One problem, story or revisit card today keeps your ' + (day - 1) + '-day streak going.',
    action: offer ? 'Use my freeze' : 'Pick up where you left off',
    isFreeze: offer, isGo: !offer,
    freeze: () => { try { if (DS.useFreeze()) cmp.setState({ dailySaved: true }); } catch (e) {} setTimeout(() => { try { const el = document.querySelector('[data-daily-go]'); if (el) el.focus(); } catch (e) {} }, 0); },
    go: () => { close(); try { if (window.__dsNav) window.__dsNav('Code.dc.html'); } catch (e) {} },
    // Esc closes; Tab stays inside the dialog while it is open.
    onKey: (e) => {
      if (!e) return;
      if (e.key === 'Escape') { if (e.preventDefault) e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      try {
        const box = document.querySelector('[data-daily] [role="dialog"]');
        const f = box ? [...box.querySelectorAll('button, a[href]')] : [];
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1], at = document.activeElement;
        if (e.shiftKey && at === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && at === last) { e.preventDefault(); first.focus(); }
      } catch (x) {}
    },
    flame: offer ? t.muted : t.flame
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
      srch: searchVals(cmp, t),
      daily: dailyVals(cmp, t)
    }
  });
}
// @@END-NAV@@
