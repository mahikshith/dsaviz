// A tiny, deterministic Git model for the Git page. It knows only what the lessons need:
// files with versions (v1, v2...), a staging area, commits with parents, branches, HEAD,
// one remote called origin, and a stash. gitRun(state, command) never mutates its input
// and throws a plain-language Error when Git would refuse the command.
const GIT_ZONES = ['work', 'stage', 'repo', 'remote'];
const GIT_HASHES = ['a1f', 'b72', 'c3e', 'd94', 'e5b', 'f06', '1c8', '2da', '3fe', '47b', '5e1', '6a9', '7c2', '8d4', '9b0', '0ef', '4aa', 'c81', 'e27', '93d'];

function gitEmpty() {
  return { inited: false, work: {}, idx: {}, vers: {}, commits: {}, order: [], branches: {}, head: null, lanes: {}, remote: null, tracking: {}, stash: [], seq: 0 };
}
function gitCopy(s) { return JSON.parse(JSON.stringify(s)); }
function gitHead(s) { return s.head ? s.branches[s.head] || null : null; }
function gitTree(s, id) { return id ? s.commits[id].tree : {}; }
function gitNames(...objs) { const set = {}; objs.forEach((o) => Object.keys(o).forEach((k) => { set[k] = 1; })); return Object.keys(set).sort(); }
function gitAncestors(s, id) {
  const seen = {}; const todo = id ? [id] : [];
  while (todo.length) { const c = todo.pop(); if (seen[c]) continue; seen[c] = 1; s.commits[c].parents.forEach((p) => todo.push(p)); }
  return seen;
}
function gitIsAncestor(s, a, b) { return !!(a && gitAncestors(s, b)[a]); }
function gitMergeBase(s, a, b) {
  const A = gitAncestors(s, a); const B = gitAncestors(s, b);
  let best = null;
  Object.keys(A).forEach((c) => { if (B[c] && (!best || s.commits[c].n > s.commits[best].n)) best = c; });
  return best;
}
function gitStaged(s) { const h = gitTree(s, gitHead(s)); return gitNames(s.idx, h).filter((n) => s.idx[n] !== h[n]); }
function gitUnstaged(s) { return gitNames(s.work, s.idx).filter((n) => n in s.idx && s.work[n] !== s.idx[n]); }
function gitUntracked(s) { return Object.keys(s.work).filter((n) => !(n in s.idx)).sort(); }
function gitClean(s) { return !gitStaged(s).length && !gitUnstaged(s).length; }
function gitReachable(s) {
  const roots = Object.values(s.branches).concat(Object.values(s.tracking));
  const out = {};
  roots.forEach((r) => { if (r) Object.assign(out, gitAncestors(s, r)); });
  return out;
}
function gitLane(s, branch) {
  if (s.lanes[branch] !== undefined) return s.lanes[branch];
  const used = {};
  Object.keys(s.lanes).forEach((b) => { if (b !== branch && b in s.branches) used[s.lanes[b]] = 1; });
  let lane = branch === 'main' ? 0 : 1;
  while (used[lane]) lane++;
  s.lanes[branch] = lane;
  return lane;
}
function gitMakeCommit(s, msg, tree, parents, extra) {
  const id = GIT_HASHES[s.seq++ % GIT_HASHES.length];
  s.commits[id] = Object.assign({ id, msg, tree: gitCopy(tree), parents, lane: gitLane(s, s.head || 'main'), n: s.order.length }, extra || {});
  s.order.push(id);
  return id;
}
// Point the working directory and staging area at a new snapshot. Untracked files stay.
function gitCheckout(s, from, to) {
  const changed = [];
  gitNames(from, to).forEach((n) => {
    if (from[n] === to[n]) return;
    changed.push(n);
    if (n in to) s.work[n] = to[n]; else delete s.work[n];
  });
  s.idx = gitCopy(to);
  return changed;
}
function gitResolve(s, ref) {
  let id;
  const m = /^(.*)~(\d+)$/.exec(ref);
  const base = m ? m[1] : ref;
  if (base === 'HEAD') id = gitHead(s);
  else if (base.indexOf('origin/') === 0) id = s.tracking[base.slice(7)];
  else id = s.branches[base];
  if (!id) throw new Error('Git does not know "' + ref + '" yet.');
  for (let i = 0; m && i < Number(m[2]); i++) {
    id = s.commits[id].parents[0];
    if (!id) throw new Error(ref + ' goes back past the first commit.');
  }
  return id;
}
function gitNeedRepo(s) { if (!s.inited) throw new Error('Not a Git repository yet. Run git init first.'); }
function gitNeedClean(s, what) { if (!gitClean(s)) throw new Error('You have uncommitted changes. Commit or stash them before you ' + what + '.'); }
function gitNeedRemote(s) { if (!s.remote) throw new Error('There is no remote called origin.'); }
function gitStatusLines(s) {
  const out = ['On branch ' + s.head];
  const here = gitHead(s); const there = s.tracking[s.head];
  if (s.remote && there) {
    const A = gitAncestors(s, here); const B = gitAncestors(s, there);
    const ahead = Object.keys(A).filter((c) => !B[c]).length; const behind = Object.keys(B).filter((c) => !A[c]).length;
    if (ahead && behind) out.push('You and origin/' + s.head + ' have ' + ahead + ' and ' + behind + ' different commits.');
    else if (ahead) out.push('Ahead of origin/' + s.head + ' by ' + ahead + ' commit' + (ahead > 1 ? 's' : '') + '.');
    else if (behind) out.push('Behind origin/' + s.head + ' by ' + behind + ' commit' + (behind > 1 ? 's' : '') + '.');
    else out.push('Up to date with origin/' + s.head + '.');
  }
  const st = gitStaged(s); const un = gitUnstaged(s); const ut = gitUntracked(s);
  if (st.length) out.push('Ready to commit: ' + st.join(', '));
  if (un.length) out.push('Changed, not staged: ' + un.join(', '));
  if (ut.length) out.push('Untracked: ' + ut.join(', '));
  if (!st.length && !un.length && !ut.length) out.push('Nothing to commit. Everything is saved.');
  return out;
}
function gitDiffLines(a, b, names) {
  return names.map((n) => n + '   ' + (a[n] || 'none') + ' → ' + (b[n] || 'deleted'));
}

// Run one command. Returns { state, out, flows, fresh }.
// flows: [{ from, to, label }] between GIT_ZONES, for the animation.
// fresh: keys like 'stage:app.js', 'commit:c3e', 'ref:feature' that should light up.
function gitRun(s0, cmd) {
  const s = gitCopy(s0);
  const out = []; const flows = []; const fresh = [];
  const flow = (from, to, label) => flows.push({ from, to, label });
  let m;
  if (cmd === 'git init') {
    if (s.inited) throw new Error('This folder is already a repository.');
    s.inited = true; s.branches = { main: null }; s.head = 'main';
    out.push('Created an empty repository in .git/');
    fresh.push('ref:main');
  } else if ((m = /^git clone (\S+)$/.exec(cmd))) {
    if (s.inited) throw new Error('This folder is already a repository.');
    s.inited = true; s.head = 'main'; s.branches = { main: null };
    s.vers = { 'readme.md': 1, 'app.js': 1 };
    const c1 = gitMakeCommit(s, 'Start project', { 'readme.md': 'v1' }, []);
    const c2 = gitMakeCommit(s, 'Add app', { 'readme.md': 'v1', 'app.js': 'v1' }, [c1]);
    s.remote = { branches: { main: c2 }, commits: [c1, c2] };
    s.branches.main = c2; s.tracking = { main: c2 };
    gitCheckout(s, {}, gitTree(s, c2));
    out.push('Copied 2 commits from ' + m[1]);
    flow('remote', 'repo', c1 + ' ' + c2); flow('repo', 'work', 'readme.md app.js');
    fresh.push('commit:' + c1, 'commit:' + c2, 'work:readme.md', 'work:app.js');
  } else if ((m = /^edit (\S+)$/.exec(cmd))) {
    const v = 'v' + (s.vers[m[1]] = (s.vers[m[1]] || 0) + 1);
    const isNew = !(m[1] in s.work);
    s.work[m[1]] = v;
    out.push((isNew ? 'Created ' : 'Saved ') + m[1] + ' (' + v + ')');
    fresh.push('work:' + m[1]);
  } else if ((m = /^git add (\S+)$/.exec(cmd))) {
    gitNeedRepo(s);
    const names = m[1] === '.' ? gitNames(s.work, s.idx) : [m[1]];
    const moved = [];
    names.forEach((n) => {
      if (!(n in s.work) && !(n in s.idx)) throw new Error('There is no file called ' + n + '.');
      if (s.work[n] === s.idx[n]) return;
      if (n in s.work) s.idx[n] = s.work[n]; else delete s.idx[n];
      moved.push(n);
    });
    if (!moved.length) throw new Error('Nothing new to add: the staging area already has this version.');
    flow('work', 'stage', moved.join(' '));
    moved.forEach((n) => fresh.push('stage:' + n));
  } else if ((m = /^git commit -m "([^"]+)"$/.exec(cmd))) {
    gitNeedRepo(s);
    const st = gitStaged(s);
    if (!st.length) throw new Error('Nothing is staged, so there is nothing to commit. Use git add first.');
    const parent = gitHead(s);
    const id = gitMakeCommit(s, m[1], s.idx, parent ? [parent] : []);
    s.branches[s.head] = id;
    out.push('[' + s.head + ' ' + id + '] ' + m[1], st.length + ' file' + (st.length > 1 ? 's' : '') + ' saved in this commit');
    flow('stage', 'repo', id);
    fresh.push('commit:' + id, 'ref:' + s.head);
  } else if (cmd === 'git status') {
    gitNeedRepo(s);
    gitStatusLines(s).forEach((l) => out.push(l));
  } else if (cmd === 'git diff') {
    gitNeedRepo(s);
    const un = gitUnstaged(s);
    if (un.length) gitDiffLines(s.idx, s.work, un).forEach((l) => out.push(l)); else out.push('No changes waiting outside the staging area.');
  } else if (cmd === 'git diff --staged') {
    gitNeedRepo(s);
    const st = gitStaged(s);
    if (st.length) gitDiffLines(gitTree(s, gitHead(s)), s.idx, st).forEach((l) => out.push(l)); else out.push('Nothing staged.');
  } else if (cmd === 'git log --oneline') {
    gitNeedRepo(s);
    const A = gitAncestors(s, gitHead(s));
    const list = Object.keys(A).sort((a, b) => s.commits[b].n - s.commits[a].n);
    if (!list.length) out.push('No commits yet.');
    list.slice(0, 3).forEach((c) => out.push(c + '  ' + s.commits[c].msg));
    if (list.length > 3) out.push('… ' + (list.length - 3) + ' older');
  } else if ((m = /^git branch -d (\S+)$/.exec(cmd))) {
    gitNeedRepo(s);
    if (!(m[1] in s.branches)) throw new Error('There is no branch called ' + m[1] + '.');
    if (m[1] === s.head) throw new Error('You cannot delete the branch you are on.');
    if (!gitIsAncestor(s, s.branches[m[1]], gitHead(s))) throw new Error(m[1] + ' has commits that are not merged yet.');
    delete s.branches[m[1]]; delete s.lanes[m[1]];
    out.push('Deleted branch ' + m[1] + '. Its commits stay.');
  } else if ((m = /^git branch (\S+)$/.exec(cmd))) {
    gitNeedRepo(s);
    if (!gitHead(s)) throw new Error('Make a first commit before you branch.');
    if (m[1] in s.branches) throw new Error('A branch called ' + m[1] + ' already exists.');
    s.branches[m[1]] = gitHead(s);
    out.push('New label ' + m[1] + ' on ' + gitHead(s) + '. You are still on ' + s.head + '.');
    fresh.push('ref:' + m[1]);
  } else if ((m = /^git switch (-c )?(\S+)$/.exec(cmd))) {
    gitNeedRepo(s);
    gitNeedClean(s, 'switch');
    const name = m[2];
    if (m[1]) {
      if (name in s.branches) throw new Error('A branch called ' + name + ' already exists.');
      if (!gitHead(s)) throw new Error('Make a first commit before you branch.');
      s.branches[name] = gitHead(s);
    } else if (!(name in s.branches)) throw new Error('There is no branch called ' + name + '.');
    if (name === s.head) throw new Error('You are already on ' + name + '.');
    const from = gitTree(s, gitHead(s));
    s.head = name;
    const changed = gitCheckout(s, from, gitTree(s, gitHead(s)));
    out.push("Switched to " + (m[1] ? 'a new ' : '') + "branch '" + name + "'");
    if (changed.length) { flow('repo', 'work', changed.join(' ')); changed.forEach((n) => fresh.push('work:' + n)); }
    fresh.push('ref:' + name);
  } else if ((m = /^git merge (\S+)$/.exec(cmd))) {
    gitNeedRepo(s);
    gitNeedClean(s, 'merge');
    gitMerge(s, m[1], out, flow, fresh);
  } else if ((m = /^git rebase (\S+)$/.exec(cmd))) {
    gitNeedRepo(s);
    gitNeedClean(s, 'rebase');
    const onto = gitResolve(s, m[1]); const cur = gitHead(s);
    if (gitIsAncestor(s, onto, cur)) throw new Error('Already up to date: ' + s.head + ' already sits on ' + m[1] + '.');
    const base = gitMergeBase(s, cur, onto);
    const list = [];
    for (let c = cur; c && c !== base; c = s.commits[c].parents[0]) list.unshift(c);
    let tip = onto;
    list.forEach((c) => {
      const before = gitTree(s, s.commits[c].parents[0]); const after = s.commits[c].tree;
      const tree = gitCopy(gitTree(s, tip));
      gitNames(before, after).forEach((n) => {
        if (before[n] === after[n]) return;
        if (tree[n] !== before[n]) throw new Error('Conflict in ' + n + ' while replaying ' + c + '.');
        if (n in after) tree[n] = after[n]; else delete tree[n];
      });
      tip = gitMakeCommit(s, s.commits[c].msg, tree, [tip], { copyOf: c });
      fresh.push('commit:' + tip);
    });
    const from = gitTree(s, cur);
    s.branches[s.head] = tip;
    const changed = gitCheckout(s, from, gitTree(s, tip));
    out.push('Replayed ' + list.length + ' commit' + (list.length > 1 ? 's' : '') + ' on top of ' + m[1] + '.');
    if (changed.length) flow('repo', 'work', changed.join(' '));
  } else if (cmd === 'git push') {
    gitNeedRepo(s); gitNeedRemote(s);
    const here = gitHead(s); const there = s.remote.branches[s.head];
    if (there && !gitIsAncestor(s, there, here)) throw new Error('Rejected: origin has commits you do not have. Pull first.');
    const A = gitAncestors(s, here);
    const add = Object.keys(A).filter((c) => s.remote.commits.indexOf(c) < 0).sort((a, b) => s.commits[a].n - s.commits[b].n);
    if (!add.length) { out.push('Everything up to date.'); }
    else {
      add.forEach((c) => { s.remote.commits.push(c); fresh.push('remote:' + c); });
      out.push('Sent ' + add.length + ' commit' + (add.length > 1 ? 's' : '') + ' to origin/' + s.head + '.');
      flow('repo', 'remote', add.join(' '));
    }
    s.remote.branches[s.head] = here; s.tracking[s.head] = here;
    fresh.push('ref:origin/' + s.head);
  } else if (cmd === 'teammate push') {
    gitNeedRemote(s);
    const tip = s.remote.branches.main;
    const tree = gitCopy(gitTree(s, tip));
    tree['notes.md'] = 'v' + (s.vers['notes.md'] = (s.vers['notes.md'] || 0) + 1);
    const keepHead = s.head; s.head = 'main';
    const id = gitMakeCommit(s, 'Add notes', tree, [tip], { hidden: true });
    s.head = keepHead;
    s.remote.commits.push(id); s.remote.branches.main = id;
    out.push('origin/main now has ' + id + ' Add notes. Your laptop does not know yet.');
    fresh.push('remote:' + id);
  } else if (cmd === 'git fetch') {
    gitNeedRepo(s); gitNeedRemote(s);
    const got = gitFetch(s);
    out.push(got.length ? 'Downloaded ' + got.join(' ') + '. origin/main moved. Your files did not change.' : 'Nothing new on origin.');
    if (got.length) { flow('remote', 'repo', got.join(' ')); got.forEach((c) => fresh.push('commit:' + c)); fresh.push('ref:origin/main'); }
  } else if (cmd === 'git pull') {
    gitNeedRepo(s); gitNeedRemote(s); gitNeedClean(s, 'pull');
    const got = gitFetch(s);
    if (got.length) { flow('remote', 'repo', got.join(' ')); got.forEach((c) => fresh.push('commit:' + c)); }
    gitMerge(s, 'origin/' + s.head, out, flow, fresh);
  } else if (cmd === 'git stash') {
    gitNeedRepo(s);
    const head = gitTree(s, gitHead(s));
    const names = gitNames(gitStaged(s).concat(gitUnstaged(s)).reduce((o, n) => { o[n] = 1; return o; }, {}));
    if (!names.length) throw new Error('Nothing to stash: no changes since the last commit.');
    const entry = { label: 'WIP on ' + s.head, files: {} };
    names.forEach((n) => { entry.files[n] = n in s.work ? s.work[n] : null; });
    s.idx = gitCopy(head);
    names.forEach((n) => { if (n in head) s.work[n] = head[n]; else delete s.work[n]; });
    s.stash.unshift(entry);
    out.push('Saved ' + names.join(', ') + ' to the stash. Files are back to the last commit.');
    flow('work', 'repo', names.join(' '));
    fresh.push('stash:0');
  } else if (cmd === 'git stash pop') {
    gitNeedRepo(s);
    if (!s.stash.length) throw new Error('The stash is empty.');
    const e = s.stash.shift(); const head = gitTree(s, gitHead(s));
    const names = Object.keys(e.files).sort();
    names.forEach((n) => {
      if (s.work[n] !== head[n]) throw new Error('Conflict: ' + n + ' changed since you stashed.');
      if (e.files[n] === null) delete s.work[n]; else s.work[n] = e.files[n];
      fresh.push('work:' + n);
    });
    out.push('Brought back ' + names.join(', ') + '. The stash is empty again.');
    flow('repo', 'work', names.join(' '));
  } else if ((m = /^git reset --(soft|mixed|hard) (\S+)$/.exec(cmd))) {
    gitNeedRepo(s);
    const target = gitResolve(s, m[2]); const old = gitHead(s);
    const tree = gitTree(s, target);
    s.branches[s.head] = target;
    const moved = gitNames(gitTree(s, old), tree).filter((n) => gitTree(s, old)[n] !== tree[n]);
    if (m[1] === 'soft') {
      out.push(s.head + ' moved back to ' + target + '. The staging area still has your changes.');
      if (moved.length) { flow('repo', 'stage', moved.join(' ')); moved.forEach((n) => fresh.push('stage:' + n)); }
    } else if (m[1] === 'mixed') {
      const unstaged = gitNames(s.idx, tree).filter((n) => s.idx[n] !== tree[n]);
      s.idx = gitCopy(tree);
      out.push(s.head + (old === target ? ' stays on ' : ' moved back to ') + target + '. Your edits are still in your files, not staged.');
      if (unstaged.length) { flow(old === target ? 'stage' : 'repo', 'work', unstaged.join(' ')); unstaged.forEach((n) => fresh.push('work:' + n)); }
    } else {
      const lost = gitNames(s.work, s.idx, gitTree(s, old)).filter((n) => (n in s.idx || n in gitTree(s, old)) && s.work[n] !== tree[n]);
      lost.forEach((n) => { if (n in tree) s.work[n] = tree[n]; else delete s.work[n]; fresh.push('work:' + n); });
      s.idx = gitCopy(tree);
      out.push(s.head + (old === target ? ' stays on ' : ' moved back to ') + target + '. Files match it again. The edits are gone.');
      if (lost.length) flow('repo', 'work', lost.join(' '));
    }
    fresh.push('ref:' + s.head);
  } else if ((m = /^git revert (\S+)$/.exec(cmd))) {
    gitNeedRepo(s); gitNeedClean(s, 'revert');
    const c = gitResolve(s, m[1]); const cm = s.commits[c];
    const before = gitTree(s, cm.parents[0]); const after = cm.tree;
    const head = gitHead(s); const tree = gitCopy(gitTree(s, head));
    gitNames(before, after).forEach((n) => {
      if (before[n] === after[n]) return;
      if (tree[n] !== after[n]) throw new Error('Conflict in ' + n + ' while undoing ' + c + '.');
      if (n in before) tree[n] = before[n]; else delete tree[n];
    });
    const id = gitMakeCommit(s, 'Undo ' + cm.msg, tree, [head]);
    s.branches[s.head] = id;
    const changed = gitCheckout(s, gitTree(s, head), tree);
    out.push('[' + s.head + ' ' + id + '] Undo ' + cm.msg, 'New commit. ' + c + ' is still in history.');
    if (changed.length) flow('repo', 'work', changed.join(' '));
    fresh.push('commit:' + id, 'ref:' + s.head);
  } else {
    throw new Error('This page does not model "' + cmd + '".');
  }
  return { state: s, out, flows, fresh };
}
function gitFetch(s) {
  const got = [];
  s.remote.commits.forEach((c) => { if (s.commits[c].hidden) { delete s.commits[c].hidden; got.push(c); } });
  s.tracking = gitCopy(s.remote.branches);
  return got;
}
function gitMerge(s, ref, out, flow, fresh) {
  const tip = gitResolve(s, ref); const cur = gitHead(s);
  if (gitIsAncestor(s, tip, cur)) { out.push('Already up to date.'); return; }
  const from = gitTree(s, cur);
  if (gitIsAncestor(s, cur, tip)) {
    s.branches[s.head] = tip;
    const changed = gitCheckout(s, from, gitTree(s, tip));
    out.push('Fast-forward: ' + s.head + ' slid ahead to ' + tip + '. No new commit.');
    if (changed.length) { flow('repo', 'work', changed.join(' ')); changed.forEach((n) => fresh.push('work:' + n)); }
    fresh.push('ref:' + s.head);
    return;
  }
  const base = gitTree(s, gitMergeBase(s, cur, tip)); const ours = from; const theirs = gitTree(s, tip);
  const tree = {};
  gitNames(base, ours, theirs).forEach((n) => {
    let v;
    if (ours[n] === theirs[n]) v = ours[n];
    else if (ours[n] === base[n]) v = theirs[n];
    else if (theirs[n] === base[n]) v = ours[n];
    else throw new Error('Conflict in ' + n + ': both sides changed it.');
    if (v !== undefined) tree[n] = v;
  });
  const id = gitMakeCommit(s, 'Merge ' + ref, tree, [cur, tip]);
  s.branches[s.head] = id;
  const changed = gitCheckout(s, from, tree);
  out.push('Merge commit ' + id + ' joins ' + cur + ' and ' + tip + '. It has two parents.');
  if (changed.length) { flow('repo', 'work', changed.join(' ')); changed.forEach((n) => fresh.push('work:' + n)); }
  fresh.push('commit:' + id, 'ref:' + s.head);
}
// Starting points for lessons: an empty folder, a local repo with two commits, or a clone.
function gitStart(kind) {
  let s = gitEmpty();
  const steps = kind === 'local'
    ? ['git init', 'edit readme.md', 'git add readme.md', 'git commit -m "Start project"', 'edit app.js', 'git add app.js', 'git commit -m "Add app"']
    : kind === 'cloned' ? ['git clone github.com/you/app'] : [];
  steps.forEach((c) => { s = gitRun(s, c).state; });
  return s;
}
