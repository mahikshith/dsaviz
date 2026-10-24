// Git page check: replays every lesson through the Git model and checks each step is consistent.
// A file must be staged before it is committed, a commit saves exactly what was staged, refs and
// parents always point at real commits, and captions stay short. Also checks that the model
// refuses what Git refuses. Reads src/git/*.js and the copy built into pages/Git.dc.html.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const src = ['sim.js', 'lessons.js'].map((f) => fs.readFileSync(path.join(root, 'src', 'git', f), 'utf8').replace(/\r\n/g, '\n')).join('\n');
const load = (code) => new Function(code + '\nreturn { gitRun, gitStart, gitEmpty, gitFrames, gitStaged, gitUnstaged, gitAncestors, gitReachable, GIT_LESSONS, GIT_ZONES };')();
const G = load(src);
let problems = 0;
const fail = (where, msg) => { problems++; console.log('  ✗', where, msg); };

// The page must carry the same model the test checks (run the build after editing src/git).
const page = fs.readFileSync(path.join(root, 'pages', 'Git.dc.html'), 'utf8').replace(/\r\n/g, '\n');
const a = page.indexOf('// @@GITSIM@@'); const b = page.indexOf('// @@END-GITSIM@@');
if (a < 0 || b < 0) fail('Git.dc.html', 'missing the @@GITSIM@@ block');
else if (page.slice(a, b).indexOf(src.trim().slice(0, 200)) < 0 || page.slice(a, b).indexOf(src.trim().slice(-200)) < 0) fail('Git.dc.html', 'model is out of date: run python scripts/build_pages.py');

const same = (x, y) => JSON.stringify(x) === JSON.stringify(y);
function checkState(where, s) {
  Object.keys(s.branches).forEach((br) => { const id = s.branches[br]; if (id !== null && !s.commits[id]) fail(where, 'branch ' + br + ' points at a missing commit'); });
  if (s.inited && !(s.head in s.branches)) fail(where, 'HEAD points at a missing branch ' + s.head);
  Object.values(s.commits).forEach((c) => c.parents.forEach((p) => {
    if (!s.commits[p]) fail(where, c.id + ' has a missing parent ' + p);
    else if (s.commits[p].n >= c.n) fail(where, c.id + ' is older than its parent ' + p);
  }));
  Object.keys(s.tracking).forEach((br) => { if (!s.commits[s.tracking[br]]) fail(where, 'origin/' + br + ' points at a missing commit'); });
  if (s.remote) Object.keys(s.remote.branches).forEach((br) => { if (s.remote.commits.indexOf(s.remote.branches[br]) < 0) fail(where, 'origin has a branch tip it does not store'); });
  Object.values(s.commits).forEach((c) => { if (c.hidden && (!s.remote || s.remote.commits.indexOf(c.id) < 0)) fail(where, c.id + ' is hidden but not on origin'); });
}

const kinds = {};
for (const lesson of G.GIT_LESSONS) {
  if (!lesson.steps.length) fail(lesson.id, 'has no steps');
  let frames;
  try { frames = G.gitFrames(lesson); } catch (e) {
    // find the step that broke
    let s = G.gitStart(lesson.start);
    for (const [cmd] of lesson.steps) { try { s = G.gitRun(s, cmd).state; } catch (err) { fail(lesson.id, '"' + cmd + '" was refused: ' + err.message); break; } }
    continue;
  }
  frames.forEach((f, i) => {
    const where = lesson.id + ' step ' + (i + 1) + ' (' + f.cmd + ')';
    const p = f.prev; const s = f.state;
    checkState(where, s);
    // captions: one idea, short sentences, everyday words
    const say = f.say.trim();
    if (!say) fail(where, 'missing caption');
    if (say.length > 120) fail(where, 'caption is ' + say.length + ' chars (max 120)');
    const sentences = say.split(/(?<=[.!?])\s+/);
    if (sentences.length > 3) fail(where, 'caption has ' + sentences.length + ' sentences (max 3)');
    sentences.forEach((x) => { if (x.split(/\s+/).length > 16) fail(where, 'sentence too long: ' + x); });
    if (!/[.!?]$/.test(say)) fail(where, 'caption should end with a full stop');
    // flows only between real zones, and never from a zone to itself
    f.flows.forEach((fl) => {
      if (G.GIT_ZONES.indexOf(fl.from) < 0 || G.GIT_ZONES.indexOf(fl.to) < 0) fail(where, 'flow to unknown zone ' + fl.from + '→' + fl.to);
      if (fl.from === fl.to) fail(where, 'flow from a zone to itself');
    });
    const cmd = f.cmd;
    if (/^git commit /.test(cmd)) {
      kinds.commit = 1;
      const id = s.branches[s.head];
      if (!G.gitStaged(p).length) fail(where, 'committed with nothing staged');
      if (!same(s.commits[id].tree, p.idx)) fail(where, 'commit does not save exactly what was staged');
      if (!same(s.work, p.work)) fail(where, 'commit changed the working directory');
      Object.keys(s.commits[id].tree).forEach((n) => { if (s.commits[id].tree[n] !== p.idx[n]) fail(where, n + ' committed before it was staged'); });
      if (!f.flows.some((fl) => fl.from === 'stage' && fl.to === 'repo')) fail(where, 'commit should animate staging → repository');
    }
    if (/^git add /.test(cmd)) {
      kinds.add = 1;
      Object.keys(s.idx).forEach((n) => { if (s.idx[n] !== p.idx[n] && s.idx[n] !== p.work[n]) fail(where, n + ' staged a version that is not in the folder'); });
      if (!same(s.work, p.work)) fail(where, 'add changed the working directory');
      if (!f.flows.some((fl) => fl.from === 'work' && fl.to === 'stage')) fail(where, 'add should animate working directory → staging');
    }
    if (/^edit /.test(cmd)) {
      if (!same(s.idx, p.idx) || !same(s.branches, p.branches)) fail(where, 'editing a file touched Git');
    }
    if (/^git (status|diff|log)/.test(cmd)) {
      kinds[cmd.split(' ')[1]] = 1;
      if (!same(s, p)) fail(where, cmd + ' should only look, never change anything');
      if (!f.out.length) fail(where, cmd + ' printed nothing');
    }
    if (/^git switch/.test(cmd)) {
      kinds.switch = 1;
      if (G.gitStaged(p).length || G.gitUnstaged(p).length) fail(where, 'switched with unsaved changes');
      if (!same(s.idx, s.commits[s.branches[s.head]].tree)) fail(where, 'after switch the staging area should match the new branch');
    }
    if (/^git branch [^-]/.test(cmd)) { kinds.branch = 1; if (s.head !== p.head) fail(where, 'git branch should not move HEAD'); }
    if (/^git merge /.test(cmd) || cmd === 'git pull') {
      const id = s.branches[s.head]; const old = p.branches[p.head];
      if (s.commits[id].parents.length === 2) kinds.merge3 = 1;
      else if (id !== old && G.gitAncestors(s, id)[old]) kinds.mergeFF = 1;
    }
    if (/^git rebase /.test(cmd)) {
      kinds.rebase = 1;
      const id = s.branches[s.head];
      if (s.commits[id].parents.length !== 1) fail(where, 'rebase should give a straight line');
      if (G.gitReachable(s)[p.branches[p.head]]) fail(where, 'old commits should be left behind after rebase');
    }
    if (cmd === 'git push') { kinds.push = 1; if (s.remote.branches[s.head] !== s.branches[s.head]) fail(where, 'push did not update origin'); }
    if (cmd === 'git fetch') { kinds.fetch = 1; if (!same(s.branches, p.branches) || !same(s.work, p.work)) fail(where, 'fetch must not touch your branches or files'); }
    if (cmd === 'git pull') kinds.pull = 1;
    if (cmd === 'git stash') { kinds.stash = 1; if (G.gitStaged(s).length || G.gitUnstaged(s).length) fail(where, 'stash should leave a clean folder'); }
    if (cmd === 'git stash pop') kinds.pop = 1;
    if (/^git reset --soft/.test(cmd)) { kinds.soft = 1; if (!same(s.idx, p.idx) || !same(s.work, p.work)) fail(where, '--soft must keep staging and files'); }
    if (/^git reset --mixed/.test(cmd)) { kinds.mixed = 1; if (!same(s.work, p.work)) fail(where, '--mixed must keep files'); if (G.gitStaged(s).length) fail(where, '--mixed should leave nothing staged'); }
    if (/^git reset --hard/.test(cmd)) { kinds.hard = 1; if (G.gitStaged(s).length || G.gitUnstaged(s).length) fail(where, '--hard should leave files matching the commit'); }
    if (/^git revert/.test(cmd)) {
      kinds.revert = 1;
      if (Object.keys(s.commits).length !== Object.keys(p.commits).length + 1) fail(where, 'revert should add exactly one commit');
      if (!G.gitAncestors(s, s.branches[s.head])[p.branches[p.head]]) fail(where, 'revert must keep the old commit in history');
    }
  });
  console.log('✓ ' + lesson.id + ': ' + frames.length + ' steps');
}
['commit', 'add', 'status', 'diff', 'log', 'switch', 'branch', 'mergeFF', 'merge3', 'rebase', 'push', 'fetch', 'pull', 'stash', 'pop', 'soft', 'mixed', 'hard', 'revert']
  .forEach((k) => { if (!kinds[k]) fail('lessons', 'no lesson covers ' + k); });

// The model must refuse what Git refuses.
const refuse = (start, cmds, why) => {
  let s = G.gitStart(start);
  try { cmds.forEach((c) => { s = G.gitRun(s, c).state; }); fail('refusals', 'allowed: ' + why); } catch (e) { /* refused, good */ }
};
refuse('empty', ['git add app.js'], 'add before init');
refuse('local', ['git commit -m "x"'], 'commit with nothing staged');
refuse('local', ['edit app.js', 'git commit -m "x"'], 'commit a file that was never staged');
refuse('local', ['edit app.js', 'git switch -c x'], 'switch with unsaved changes');
refuse('local', ['git branch -d main'], 'delete the branch you are on');
refuse('cloned', ['teammate push', 'edit app.js', 'git add app.js', 'git commit -m "x"', 'git push'], 'push when origin has new commits');
refuse('local', ['git stash'], 'stash with nothing changed');
refuse('local', ['git switch -c a', 'edit app.js', 'git add app.js', 'git commit -m "a"', 'git switch main', 'edit app.js', 'git add app.js', 'git commit -m "b"', 'git merge a'], 'merge a real conflict silently');
// gitRun never mutates its input
const s0 = G.gitStart('local'); const snap = JSON.stringify(s0);
G.gitRun(s0, 'edit app.js');
if (JSON.stringify(s0) !== snap) fail('model', 'gitRun changed its input');

console.log(problems ? problems + ' problem(s)' : 'all git steps consistent');
if (problems) process.exitCode = 1;
