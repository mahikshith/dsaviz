// @@DRAWER@@ — shared menu logic (every page with the pill nav)
const MENU = [
  ['Home.dc.html', 'My home', 'Streak, today’s story, progress', null],
  ['Patterns.dc.html', 'Library', 'Learning path, patterns, companies', null],
  ['Concepts.dc.html', 'DSA concepts', 'Big-O, sorts, hashing, trees, graphs and math, animated', null],
  ['Sheet.dc.html', 'Master sheet', 'Every problem by pattern, with ticks and hints', null],
  ['Code.dc.html', 'Code', 'Write and test solutions in the browser', null],
  ['Story.dc.html', 'Continue the story', 'Pick up where you left off', null],
  ['Revisit.dc.html', 'Revisit', 'Bring stories back before they fade', null],
  ['Profile.dc.html', 'My profile', 'Heatmap, medals, certificates, reminders', null],
  ['Interview.dc.html', 'Interview prep', 'Plans, company tracks, mock mode', 'plans'],
  ['Interview.dc.html', 'Resources', 'Books, repos and cheat sheets we trust', 'resources'],
  ['Glossary.dc.html', 'Keyword glossary', 'enumerate, zip, deque… in 5 languages', null],
  ['Basics.dc.html', 'Language basics', 'Refresh Python, Java, C++, JS or Go', null],
  ['Git.dc.html', 'Git, visually', 'Add, commit, branch, merge, push: step by step', null],
  ['SystemDesign.dc.html', 'System design', 'HLD and LLD as diagrams you step through', null],
  ['AIML.dc.html', 'AI & ML', 'ML foundations and AI now, animated step by step', null],
  ['Contests.dc.html', 'Contest calendar', 'AtCoder, CodeChef and Codeforces in your time', null],
  ['Leaderboard.dc.html', 'Leaderboard', 'This week’s league (demo until accounts launch)', null],
  ['About.dc.html', 'Our story & contact', 'Why one developer built this', null]
];
function drawerVals(cmp, t, themeKey) {
  const user = cmp.state.user !== undefined ? !!cmp.state.user : loadUser();
  const st = DS.streak();
  return {
    drawerOpen: !!cmp.state.drawer,
    openDrawer: () => cmp.setState({ drawer: true }),
    closeDrawer: () => cmp.setState({ drawer: false }),
    drawerKey: (e) => { if (e && e.key === 'Escape') cmp.setState({ drawer: false }); },
    user, guest: !user,
    signIn: () => { saveUser(true); cmp.setState({ user: true }); },
    signOut: () => { saveUser(false); cmp.setState({ user: false, drawer: false }); },
    drawerWeek: streakDays(t),
    drawerStreak: st.current ? st.current + '-day streak' : 'No streak yet',
    drawerStreakLine: st.activeToday ? 'Today counts. Come back tomorrow.' : st.current ? 'Finish a story today to make it ' + (st.current + 1) : 'Finish one story to start your streak',
    themeBtns: themeButtons(cmp, themeKey, t),
    menu: MENU.filter(([href]) => typeof NAV_PAGES === 'undefined' || NAV_PAGES.includes(href)).map(([href, label, sub, tab]) => {
      // "Continue the story" becomes "Continue: <problem title>" (or "Start: ...") and opens that problem.
      if (href === 'Story.dc.html' && typeof loadProblem === 'function' && typeof PROBLEMS !== 'undefined') {
        const cur = loadProblem() || PROBLEMS[0];
        if (cur) { label = resumeLabel(cur); href = solveHref(cur.id); }
      }
      return {
      href, label, sub,
      go: () => { if (tab) { try { window.localStorage.setItem('dsaviz-interview-tab', tab); } catch (e) {} } }
      };
    })
  };
}
// @@END-DRAWER@@
