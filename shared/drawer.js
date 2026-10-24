// @@DRAWER@@ — shared menu logic (landing + home)
const MENU = [
  ['Home.dc.html', 'My home', 'Streak, daily story, progress', null],
  ['Patterns.dc.html', 'Library', 'Learning path, patterns, companies', null],
  ['Sheet.dc.html', 'Master sheet', '553 problems by pattern, with ticks and hints', null],
  ['Story.dc.html', 'Continue the story', 'The Lantern Bridge · step 3 of 6', null],
  ['Revisit.dc.html', 'Revisit', '5 stories fading · about 6 minutes', null],
  ['Profile.dc.html', 'My profile', 'Heatmap, certificates, buddies, reminders', null],
  ['Interview.dc.html', 'Interview prep', 'Plans, company tracks, mock mode', 'plans'],
  ['Interview.dc.html', 'Resources', 'Books, repos and cheat sheets we trust', 'resources'],
  ['Glossary.dc.html', 'Keyword glossary', 'enumerate, zip, deque… in 5 languages', null],
  ['Basics.dc.html', 'Language basics', 'Refresh Python, Java, C++, JS or Go', null],
  ['Git.dc.html', 'Git, visually', 'Add, commit, branch, merge, push: step by step', null],
  ['SystemDesign.dc.html', 'System design', 'HLD and LLD as diagrams you step through', null],
  ['AIML.dc.html', 'AI & ML', 'ML foundations and AI now, animated step by step', null],
  ['Leaderboard.dc.html', 'Leaderboard', 'This week’s league and who’s learning what', null],
  ['About.dc.html', 'Our story & contact', 'Why one developer built this', null]
];
function drawerVals(cmp, t, themeKey) {
  return {
    drawerOpen: !!cmp.state.drawer,
    openDrawer: () => cmp.setState({ drawer: true }),
    closeDrawer: () => cmp.setState({ drawer: false }),
    user: !!cmp.state.user, guest: !cmp.state.user,
    signIn: () => { saveUser(true); cmp.setState({ user: true }); },
    signOut: () => { saveUser(false); cmp.setState({ user: false, drawer: false }); },
    week: streakDays(t),
    themeBtns: themeButtons(cmp, themeKey, t),
    menu: MENU.map(([href, label, sub, tab]) => ({
      href, label, sub,
      go: () => { if (tab) { try { window.localStorage.setItem('dsaviz-interview-tab', tab); } catch (e) {} } }
    }))
  };
}
// @@END-DRAWER@@
