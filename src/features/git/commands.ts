/** Reference data for the Git page's side panel. Every example runs in the simulator. */

export interface GitCommand {
  id: string;
  name: string;
  syntax: string;
  summary: string;
  /** What moves where, in two or three sentences. */
  detail: string;
  example: string;
}

export interface CommandGroup {
  title: string;
  commands: GitCommand[];
}

export const GROUPS: CommandGroup[] = [
  {
    title: 'Getting started',
    commands: [
      {
        id: 'init',
        name: 'git init',
        syntax: 'git init',
        summary: 'Turn the current folder into a Git repository.',
        detail:
          'Creates the hidden .git folder that will hold the staging area and every commit. HEAD points at a main branch that has no commits yet. Your files are not touched.',
        example: 'git init',
      },
      {
        id: 'clone',
        name: 'git clone',
        syntax: 'git clone <url>',
        summary: 'Copy an existing repository with its full history.',
        detail:
          'Downloads every commit, names the source origin, and records where its branches are as remote-tracking branches such as origin/main. Then it checks out main into a fresh working directory. Here it loads a small starter project.',
        example: 'git clone https://example.com/project.git',
      },
      {
        id: 'status',
        name: 'git status',
        syntax: 'git status',
        summary: 'Show what changed and what is staged.',
        detail:
          'Compares the working directory with the staging area, and the staging area with the last commit (HEAD). Files show up as untracked, changed but not staged, or staged for the next commit. Nothing moves.',
        example: 'git status',
      },
      {
        id: 'log',
        name: 'git log',
        syntax: 'git log [--oneline] [--all]',
        summary: 'List commits, newest first.',
        detail:
          'Starts at HEAD and follows each commit’s parent back to the first commit. The names in brackets show which branches point where. With --all it lists every branch, not just the current one.',
        example: 'git log --oneline',
      },
      {
        id: 'diff',
        name: 'git diff',
        syntax: 'git diff [--staged]',
        summary: 'Show what changed.',
        detail:
          'On its own it compares the working directory with the staging area: edits you have not staged yet. With --staged it compares the staging area with HEAD: what the next commit will contain. Real Git shows changed lines; this simulator shows changed files and versions.',
        example: 'git diff',
      },
    ],
  },
  {
    title: 'Saving changes',
    commands: [
      {
        id: 'add',
        name: 'git add',
        syntax: 'git add <file>\ngit add .',
        summary: 'Stage a file: copy its current version into the staging area.',
        detail:
          'The staging area, also called the index, is the draft of your next commit. git add copies the file as it is right now, so if you edit it again you need to add it again. git add . stages every change at once.',
        example: 'git add app.js',
      },
      {
        id: 'commit',
        name: 'git commit',
        syntax: 'git commit -m "message"',
        summary: 'Save the staging area as a new commit.',
        detail:
          'A commit is a snapshot of the whole staging area, plus a message and a link to its parent commit. The current branch then moves forward to point at it. Your files and the staging area stay as they are.',
        example: 'git commit -m "Update app"',
      },
      {
        id: 'amend',
        name: 'git commit --amend',
        syntax: 'git commit --amend -m "message"',
        summary: 'Replace the last commit with a corrected one.',
        detail:
          'Makes a new commit from the staging area with the same parent as the last one, and moves the branch to it. The old commit is not edited; it is left behind with nothing pointing at it. Avoid amending commits you have already pushed.',
        example: 'git commit --amend -m "Better message"',
      },
    ],
  },
  {
    title: 'Undoing',
    commands: [
      {
        id: 'restore',
        name: 'git restore',
        syntax: 'git restore <file>',
        summary: 'Throw away unstaged edits to a file.',
        detail:
          'Copies the file from the staging area back over the working directory, so your unstaged edits are lost. Staged changes and commits are not affected.',
        example: 'git restore app.js',
      },
      {
        id: 'restore-staged',
        name: 'git restore --staged',
        syntax: 'git restore --staged <file>',
        summary: 'Unstage a file but keep the edit.',
        detail:
          'Copies the file from HEAD back into the staging area. The working directory keeps your edit, which now shows as changed but not staged.',
        example: 'git restore --staged app.js',
      },
      {
        id: 'reset-soft',
        name: 'git reset --soft',
        syntax: 'git reset --soft <commit>',
        summary: 'Undo commits but keep their changes staged.',
        detail:
          'Moves the current branch back to the given commit, such as HEAD~1 (one before HEAD). The staging area and working directory are not touched, so the undone work is ready to commit again.',
        example: 'git reset --soft HEAD~1',
      },
      {
        id: 'reset-mixed',
        name: 'git reset --mixed',
        syntax: 'git reset [--mixed] <commit>',
        summary: 'Undo commits and unstage their changes.',
        detail:
          'Moves the branch back and resets the staging area to match that commit. Your edits stay in the working directory as unstaged changes. This is what git reset does when you give no option.',
        example: 'git reset HEAD~1',
      },
      {
        id: 'reset-hard',
        name: 'git reset --hard',
        syntax: 'git reset --hard <commit>',
        summary: 'Undo commits and discard their changes.',
        detail:
          'Moves the branch back and overwrites both the staging area and the working directory to match. Uncommitted work is lost, so use it with care. Untracked files are left alone.',
        example: 'git reset --hard HEAD~1',
      },
      {
        id: 'revert',
        name: 'git revert',
        syntax: 'git revert <commit>',
        summary: 'Undo a commit by adding a new one.',
        detail:
          'Works out the opposite of the chosen commit’s changes and commits that. History is kept, which makes it the safe way to undo something other people already have.',
        example: 'git revert HEAD',
      },
    ],
  },
  {
    title: 'Branches',
    commands: [
      {
        id: 'branch',
        name: 'git branch',
        syntax: 'git branch',
        summary: 'List branches; the current one has a star.',
        detail: 'A branch is just a name that points at a commit. Listing them changes nothing.',
        example: 'git branch',
      },
      {
        id: 'branch-create',
        name: 'git branch <name>',
        syntax: 'git branch <name>',
        summary: 'Create a branch at the current commit.',
        detail:
          'Adds a new name pointing at the same commit as HEAD. It does not switch to it: HEAD still points at your current branch.',
        example: 'git branch feature',
      },
      {
        id: 'branch-delete',
        name: 'git branch -d',
        syntax: 'git branch -d <name>',
        summary: 'Delete a branch that has been merged.',
        detail:
          'Removes only the name; the commits stay in the repository. Git refuses if the branch has commits that are not in the current branch, and -D deletes it anyway.',
        example: 'git branch -d feature',
      },
      {
        id: 'switch',
        name: 'git switch',
        syntax: 'git switch <branch>',
        summary: 'Move HEAD to another branch.',
        detail:
          'HEAD now points at that branch, and the working directory and staging area are updated to its latest commit. Uncommitted changes come along if they do not clash; otherwise Git refuses.',
        example: 'git switch main',
      },
      {
        id: 'switch-create',
        name: 'git switch -c',
        syntax: 'git switch -c <new-branch>',
        summary: 'Create a branch and switch to it.',
        detail:
          'The same as git branch <name> followed by git switch <name>. The new branch starts at the current commit, so no files change.',
        example: 'git switch -c feature',
      },
      {
        id: 'checkout',
        name: 'git checkout',
        syntax: 'git checkout <branch | commit>\ngit checkout -b <new-branch>',
        summary: 'The older command for switching branches.',
        detail:
          'With a branch name it works like git switch, and -b creates the branch first. With a commit id it points HEAD straight at that commit, which is called a detached HEAD. Newer Git splits this job between git switch and git restore.',
        example: 'git checkout -b experiment',
      },
      {
        id: 'merge',
        name: 'git merge',
        syntax: 'git merge <branch>',
        summary: 'Bring another branch’s commits into the current branch.',
        detail:
          'If the current branch has no commits of its own, Git just moves it forward: a fast-forward. Otherwise it makes a merge commit with two parents. When both sides changed the same lines real Git stops with a conflict; this simulator says so and keeps going.',
        example: 'git merge feature',
      },
      {
        id: 'rebase',
        name: 'git rebase',
        syntax: 'git rebase <branch>',
        summary: 'Replay your commits on top of another branch.',
        detail:
          'Copies each of your branch’s own commits onto the tip of the other branch, giving every copy a new id, then moves your branch to the last copy. History becomes a straight line. Do not rebase commits other people already have.',
        example: 'git rebase main',
      },
    ],
  },
  {
    title: 'Remotes',
    commands: [
      {
        id: 'fetch',
        name: 'git fetch',
        syntax: 'git fetch',
        summary: 'Download new commits without changing your branches.',
        detail:
          'Copies new commits from origin into your repository and moves the remote-tracking branches, such as origin/main. Your own branches, staging area and files stay as they were.',
        example: 'git fetch',
      },
      {
        id: 'pull',
        name: 'git pull',
        syntax: 'git pull',
        summary: 'Fetch, then merge the remote branch into yours.',
        detail:
          'Runs git fetch, then merges origin/<branch> into the current branch: a fast-forward when you have no new commits of your own, a merge commit when both sides moved.',
        example: 'git pull',
      },
      {
        id: 'push',
        name: 'git push',
        syntax: 'git push [-u origin <branch>]',
        summary: 'Upload your commits and move the remote branch.',
        detail:
          'Sends the commits origin does not have yet, moves origin’s branch to your commit, and updates origin/<branch>. Git refuses if origin has commits you have not pulled, so nobody’s work is overwritten.',
        example: 'git push',
      },
    ],
  },
  {
    title: 'Stash',
    commands: [
      {
        id: 'stash',
        name: 'git stash',
        syntax: 'git stash',
        summary: 'Put uncommitted changes aside for later.',
        detail:
          'Saves your staged and unstaged changes to tracked files on a stack, then resets the staging area and working directory to HEAD. Untracked files stay put. Handy when you need to switch branches in the middle of a task.',
        example: 'git stash',
      },
      {
        id: 'stash-pop',
        name: 'git stash pop',
        syntax: 'git stash pop [--index]',
        summary: 'Bring back the most recently stashed changes.',
        detail:
          'Re-applies the top entry of the stash to the working directory and removes it from the stack. Edits that were staged come back unstaged unless you add --index.',
        example: 'git stash pop',
      },
      {
        id: 'stash-list',
        name: 'git stash list',
        syntax: 'git stash list',
        summary: 'List the stashed entries, newest first.',
        detail: 'Each entry records the branch and commit you were on when you stashed. Listing them changes nothing.',
        example: 'git stash list',
      },
    ],
  },
  {
    title: 'Simulator helpers',
    commands: [
      {
        id: 'edit',
        name: 'edit',
        syntax: 'edit <file>',
        summary: 'Change a file, or create it if it is new. Not a Git command.',
        detail:
          'Stands in for opening the file in your editor and saving it. The file gets a new version number in the working directory; the staging area and commits do not change.',
        example: 'edit app.js',
      },
      {
        id: 'touch',
        name: 'touch',
        syntax: 'touch <file>',
        summary: 'Create an empty file. Not a Git command.',
        detail: 'Adds a new, untracked file to the working directory. If the file already exists, nothing changes.',
        example: 'touch notes.txt',
      },
      {
        id: 'teammate',
        name: 'teammate push',
        syntax: 'teammate push',
        summary: 'Pretend a teammate pushed a commit to origin. Not a Git command.',
        detail:
          'Adds a commit to origin’s main without telling your repository, the way a colleague’s push would. Your origin/main stays put until you run git fetch or git pull.',
        example: 'teammate push',
      },
    ],
  },
];

export const COMMANDS: GitCommand[] = GROUPS.flatMap((g) => g.commands);
