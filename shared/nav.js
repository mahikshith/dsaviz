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
      guest: dv.guest && page === 'Main', member: !(dv.guest && page === 'Main')
    }
  });
}
// @@END-NAV@@
