// Git lessons for the Git page. Each step is one command and one short caption.
// start: 'empty' (a new folder), 'local' (two commits on main) or 'cloned' (copied from origin).
// tests/gitcheck.js replays every step through gitRun, so a step that Git would refuse fails the build.
const GIT_LESSONS = [
  {
    id: 'first-commit', title: 'Your first commit', tag: 'init · add · commit', start: 'empty',
    steps: [
      ['git init', 'Git makes a hidden .git folder. That is your local repository. It starts empty.'],
      ['edit readme.md', 'You write a new file. Only your folder has it. Git calls it untracked.'],
      ['git add readme.md', 'git add copies the file into the staging area. Think of packing a box.'],
      ['git commit -m "Start project"', 'git commit seals the box and stores it. That is your first commit. main points to it.'],
      ['edit app.js', 'Add a second file. Again, only your folder has it.'],
      ['git add app.js', 'Stage it. The staging area holds exactly what the next commit will save.'],
      ['git commit -m "Add app"', 'A second commit. It points back to the first one, so history grows in a line.'],
      ['edit app.js', 'Change app.js. Your folder has v2 now. The last commit still has v1.'],
      ['git add app.js', 'Stage the new version. The box now holds app.js v2.'],
      ['git commit -m "Say hello"', 'Each commit is a full snapshot. You can go back to any of them later.']
    ]
  },
  {
    id: 'status-diff', title: 'What changed?', tag: 'status · diff', start: 'local',
    steps: [
      ['git log --oneline', 'We start with a small project. It has two commits on main.'],
      ['edit app.js', 'You change app.js. Git has not looked yet.'],
      ['git status', 'git status is your quick check. app.js changed, but it is not staged.'],
      ['git diff', 'git diff shows what changed in your files. app.js went from v1 to v2.'],
      ['git add app.js', 'Stage the change. It moves into the box for the next commit.'],
      ['git diff', 'Plain git diff is empty now. It only compares your files with the staging area.'],
      ['git diff --staged', 'Add --staged to see what the next commit will save.'],
      ['edit readme.md', 'Now edit the readme too, but do not stage it.'],
      ['git status', 'Status shows both. app.js is ready. readme.md is not.'],
      ['git commit -m "Update app"', 'Only staged work goes in. The commit takes app.js and leaves readme.md alone.'],
      ['git status', 'readme.md still waits in your folder. Stage it when you are ready.']
    ]
  },
  {
    id: 'branches', title: 'Branches', tag: 'branch · switch', start: 'local',
    steps: [
      ['git log --oneline', 'Two commits on main. HEAD marks the branch you are on.'],
      ['git branch feature', 'git branch sticks a new label on the same commit. You are still on main.'],
      ['git switch feature', 'git switch moves HEAD to feature. Your files stay the same, since both labels share a commit.'],
      ['edit app.js', 'Start the new feature. Change app.js.'],
      ['git add app.js', 'Stage it.'],
      ['git commit -m "Add search"', 'The commit lands on feature. feature moves ahead. main stays put.'],
      ['git switch main', 'Switch back. Git puts main’s app.js back in your folder. Your work is safe on feature.'],
      ['git switch -c fix', 'switch -c makes a branch and moves onto it in one step.'],
      ['edit readme.md', 'Fix a typo in the readme.'],
      ['git add readme.md', 'Stage it.'],
      ['git commit -m "Fix typo"', 'Now two lines grow from main. Branches are cheap, so use one per idea.']
    ]
  },
  {
    id: 'merge', title: 'Merging', tag: 'fast-forward · 3-way', start: 'local',
    steps: [
      ['git switch -c feature', 'Make a feature branch and move onto it.'],
      ['edit app.js', 'Build the feature in app.js.'],
      ['git add app.js', 'Stage it.'],
      ['git commit -m "Add search"', 'Commit it. feature is one step ahead of main.'],
      ['git switch main', 'Go back to main to bring the work in.'],
      ['git merge feature', 'main has no new work of its own. Git just slides main forward. That is a fast-forward.'],
      ['git branch -d feature', 'Remove the feature label. The commits stay, because main points at them now.'],
      ['git switch -c login', 'Start another branch for a login page.'],
      ['edit login.js', 'Write the login page.'],
      ['git add login.js', 'Stage it.'],
      ['git commit -m "Add login"', 'Commit it on login.'],
      ['git switch main', 'Back on main. login.js leaves your folder, because main does not have it.'],
      ['edit readme.md', 'Meanwhile, someone updates the readme on main.'],
      ['git add readme.md', 'Stage it.'],
      ['git commit -m "Update readme"', 'Now main and login each have a commit the other lacks. They have split apart.'],
      ['git merge login', 'Sliding is not possible now. Git makes a merge commit with two parents. That is a 3-way merge.']
    ]
  },
  {
    id: 'rebase', title: 'Rebase', tag: 'replay commits', start: 'local',
    steps: [
      ['git switch -c feature', 'Make a feature branch.'],
      ['edit app.js', 'Start the feature.'],
      ['git add app.js', 'Stage it.'],
      ['git commit -m "Add search"', 'First commit on feature.'],
      ['edit app.js', 'Keep going.'],
      ['git add app.js', 'Stage it.'],
      ['git commit -m "Style search"', 'Second commit on feature.'],
      ['git switch main', 'Meanwhile, main moves on.'],
      ['edit readme.md', 'Change the readme on main.'],
      ['git add readme.md', 'Stage it.'],
      ['git commit -m "Update readme"', 'main and feature have split. A merge would join them with a merge commit.'],
      ['git switch feature', 'Instead, go back to feature to rebase it.'],
      ['git rebase main', 'Rebase lifts your two commits and replays them on top of main. The copies get new ids.'],
      ['git switch main', 'Switch to main to bring the feature in.'],
      ['git merge feature', 'feature now sits on top of main, so this is a fast-forward. History is one straight line.'],
      ['git log --oneline', 'Rebase only commits nobody else has. It rewrites ids, which confuses teammates.']
    ]
  },
  {
    id: 'remote', title: 'Remotes', tag: 'push · fetch · pull', start: 'empty',
    steps: [
      ['git clone github.com/you/app', 'git clone copies the project from the server. origin/main remembers where the server’s main was.'],
      ['edit app.js', 'Make a change.'],
      ['git add app.js', 'Stage it.'],
      ['git commit -m "Faster app"', 'Commit it. Your main moves ahead. origin/main stays behind.'],
      ['git status', 'Status says you are one commit ahead of the server.'],
      ['git push', 'git push sends your commit up. The server and origin/main catch up.'],
      ['teammate push', 'A teammate pushes a commit. It is on the server, not on your laptop.'],
      ['git status', 'Status still says up to date. Git only knows what it last downloaded.'],
      ['git fetch', 'git fetch downloads new commits. origin/main moves. Your main and your files do not.'],
      ['git status', 'Now Git can see you are one commit behind.'],
      ['git pull', 'git pull is fetch plus merge. main slides forward and notes.md lands in your folder.']
    ]
  },
  {
    id: 'stash', title: 'Stash', tag: 'park unfinished work', start: 'local',
    steps: [
      ['edit app.js', 'You are halfway through a change to app.js.'],
      ['edit readme.md', 'And the readme too.'],
      ['git status', 'Two files changed, nothing committed.'],
      ['git stash', 'An urgent bug comes in. git stash puts your edits on a shelf. Your files go back to the last commit.'],
      ['git status', 'Clean again. Safe to work on something else.'],
      ['edit fix.js', 'Write the quick fix.'],
      ['git add fix.js', 'Stage it.'],
      ['git commit -m "Fix crash"', 'Commit the fix. Your half-done work never got in the way.'],
      ['git stash pop', 'Take your edits back off the shelf. Carry on where you left off.'],
      ['git status', 'Both edits are back, waiting to be staged.']
    ]
  },
  {
    id: 'undo', title: 'Undo', tag: 'reset vs revert', start: 'local',
    steps: [
      ['edit app.js', 'Try out an idea in app.js.'],
      ['git add app.js', 'Stage it.'],
      ['git commit -m "Try idea"', 'Commit it. Then you change your mind.'],
      ['git reset --soft HEAD~1', 'reset moves main back one commit. --soft keeps the change staged, ready to commit again.'],
      ['git reset --mixed HEAD', '--mixed also empties the staging area. Your edit stays in app.js.'],
      ['git reset --hard HEAD', '--hard throws the edit away. Files match the last commit. Use it with care.'],
      ['edit app.js', 'Now a different case. Make a change.'],
      ['git add app.js', 'Stage it.'],
      ['git commit -m "Add bug"', 'Commit it. Say teammates already have this commit.'],
      ['git revert HEAD', 'Do not rewrite shared history. git revert adds a new commit that undoes the old one.'],
      ['git log --oneline', 'Both commits stay in history. Teammates get the undo, and nothing breaks.']
    ]
  }
];
// Replay a lesson: one frame per step with the state after it, plus what moved.
function gitFrames(lesson) {
  let s = gitStart(lesson.start);
  return lesson.steps.map(([cmd, say]) => {
    const prev = s;
    const r = gitRun(s, cmd);
    s = r.state;
    return { cmd, say, prev, state: s, out: r.out, flows: r.flows, fresh: r.fresh };
  });
}
