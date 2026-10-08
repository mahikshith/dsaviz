import { describe, expect, it } from 'vitest';
import { ancestors, headId, headTree, initialState, reachable, run, stages, type GitState } from '@/features/git/sim';
import { COMMANDS } from '@/features/git/commands';
import { TOURS } from '@/features/git/tours';

/** Runs commands in order and fails loudly on the first one the simulator rejects. */
function play(cmds: string[], from: GitState = initialState()): GitState {
  return cmds.reduce((s, c) => {
    const r = run(s, c);
    if (!r.ok) throw new Error(`"${c}" failed: ${r.output.join(' / ')}`);
    return r.state;
  }, from);
}
const clone = 'git clone https://example.com/project.git';
const head = (s: GitState) => s.commits[headId(s)!]!;

describe('git simulator', () => {
  it('moves a file from working directory to staging area to a commit', () => {
    let s = play(['git init', 'edit app.js']);
    expect(stages(s).work).toEqual([{ name: 'app.js', version: 1, status: 'untracked' }]);
    s = play(['git add app.js'], s);
    expect(s.index).toEqual({ 'app.js': 1 });
    expect(stages(s).index[0]!.status).toBe('staged');
    const r = run(s, 'git commit -m "Add app"');
    expect(r.ok).toBe(true);
    expect(r.explain).toMatch(/commit/);
    expect(head(r.state)).toMatchObject({ message: 'Add app', parents: [], tree: { 'app.js': 1 } });
    expect(head(r.state).id).toMatch(/^[0-9a-f]{7}$/);
    expect(stages(r.state).index[0]!.status).toBe('unchanged');
    expect(run(r.state, 'git commit -m "again"').ok).toBe(false);
  });

  it('is deterministic and never mutates its input', () => {
    const a = play([clone, 'edit app.js', 'git add .', 'git commit -m "x"']);
    const b = play([clone, 'edit app.js', 'git add .', 'git commit -m "x"']);
    expect(headId(a)).toBe(headId(b));
    const frozen = JSON.stringify(a);
    run(a, 'git reset --hard HEAD~2');
    expect(JSON.stringify(a)).toBe(frozen);
  });

  it('rejects git commands before init and unknown commands', () => {
    expect(run(initialState(), 'git status').ok).toBe(false);
    expect(run(initialState(), 'git frobnicate').ok).toBe(false);
    expect(run(initialState(), 'ls').ok).toBe(false);
  });

  it('fast-forwards a branch with no commits of its own', () => {
    const s = play([clone, 'git switch -c feature', 'edit app.js', 'git add app.js', 'git commit -m "Improve"', 'git switch main']);
    const featureTip = s.branches.feature!;
    const r = run(s, 'git merge feature');
    expect(r.output).toContain('Fast-forward');
    expect(r.state.branches.main).toBe(featureTip);
    expect(r.state.counter).toBe(s.counter);
    expect(r.state.work['app.js']).toBe(2);
  });

  it('makes a merge commit with two parents when branches diverged', () => {
    const s = play([
      clone,
      'git switch -c login',
      'edit login.js',
      'git add login.js',
      'git commit -m "Add login"',
      'git switch main',
      'edit readme.md',
      'git add readme.md',
      'git commit -m "Readme"',
    ]);
    const r = run(s, 'git merge login');
    expect(r.ok).toBe(true);
    const m = head(r.state);
    expect(m.parents).toEqual([s.branches.main, s.branches.login]);
    expect(m.tree).toMatchObject({ 'login.js': 1, 'readme.md': 2 });
    expect(r.state.work['login.js']).toBe(1);
  });

  it('notes, but does not model, a conflict', () => {
    const s = play([clone, 'git switch -c a', 'edit app.js', 'git add .', 'git commit -m "a"', 'git switch main', 'edit app.js', 'git add .', 'git commit -m "b"']);
    const r = run(s, 'git merge a');
    expect(r.ok).toBe(true);
    expect(r.output.join(' ')).toMatch(/conflict/);
  });

  it('rebase replays commits with new ids and gives a linear history', () => {
    const s = play([
      clone,
      'git switch -c feature',
      'edit login.js',
      'git add .',
      'git commit -m "Add login"',
      'edit login.js',
      'git add .',
      'git commit -m "Style login"',
      'git switch main',
      'edit readme.md',
      'git add .',
      'git commit -m "Readme"',
      'git switch feature',
    ]);
    const old = s.branches.feature!;
    const r = run(s, 'git rebase main');
    expect(r.ok).toBe(true);
    const tip = r.state.branches.feature!;
    expect(tip).not.toBe(old);
    expect(ancestors(r.state, tip).has(old)).toBe(false);
    expect(ancestors(r.state, tip).has(s.branches.main!)).toBe(true);
    // Linear: every commit back to the root has exactly one parent.
    for (const id of ancestors(r.state, tip)) expect(r.state.commits[id]!.parents.length).toBeLessThanOrEqual(1);
    expect(head(r.state).tree).toMatchObject({ 'login.js': 2, 'readme.md': 2 });
    expect(reachable(r.state).has(old)).toBe(false);
  });

  it('reset --soft, --mixed and --hard touch different areas', () => {
    const s = play([clone, 'edit app.js', 'git add app.js', 'git commit -m "Tweak"']);
    const parent = head(s).parents[0]!;

    const soft = play(['git reset --soft HEAD~1'], s);
    expect(soft.branches.main).toBe(parent);
    expect(soft.index['app.js']).toBe(2);
    expect(soft.work['app.js']).toBe(2);

    const mixed = play(['git reset HEAD~1'], s);
    expect(mixed.index['app.js']).toBe(1);
    expect(mixed.work['app.js']).toBe(2);

    const hard = play(['touch notes.txt', 'git reset --hard HEAD~1'], s);
    expect(hard.index['app.js']).toBe(1);
    expect(hard.work['app.js']).toBe(1);
    expect(hard.work['notes.txt']).toBe(1); // untracked files survive
  });

  it('revert adds a new commit that undoes an old one', () => {
    const s = play([clone]);
    const before = headId(s)!;
    const r = run(s, 'git revert HEAD');
    expect(r.ok).toBe(true);
    expect(head(r.state).parents).toEqual([before]);
    expect(head(r.state).message).toBe('Revert "Add styles"');
    expect(headTree(r.state)['style.css']).toBeUndefined();
    expect(r.state.work['style.css']).toBeUndefined();
  });

  it('amend replaces the last commit and leaves the old one unreachable', () => {
    const s = play([clone, 'edit app.js', 'git add .', 'git commit -m "Tweak"']);
    const r = run(s, 'git commit --amend -m "Tweak layout"');
    expect(head(r.state).message).toBe('Tweak layout');
    expect(head(r.state).parents).toEqual(head(s).parents);
    expect(reachable(r.state).has(headId(s)!)).toBe(false);
  });

  it('restore and restore --staged move a file back', () => {
    const s = play([clone, 'edit app.js', 'git add app.js']);
    const unstaged = play(['git restore --staged app.js'], s);
    expect(unstaged.index['app.js']).toBe(1);
    expect(unstaged.work['app.js']).toBe(2);
    const discarded = play(['git restore app.js'], unstaged);
    expect(discarded.work['app.js']).toBe(1);
    expect(run(play(['touch new.txt'], s), 'git restore new.txt').ok).toBe(false);
  });

  it('stash and pop round-trip uncommitted work', () => {
    const s = play([clone, 'edit app.js', 'git add app.js', 'edit readme.md']);
    const stashed = play(['git stash'], s);
    expect(stashed.work).toEqual(headTree(stashed));
    expect(stashed.index).toEqual(headTree(stashed));
    expect(stashed.stash).toHaveLength(1);
    const popped = play(['git stash pop --index'], stashed);
    expect(popped.work).toEqual(s.work);
    expect(popped.index).toEqual(s.index);
    expect(popped.stash).toHaveLength(0);
    // Without --index, staged edits come back unstaged.
    expect(play(['git stash pop'], stashed).index['app.js']).toBe(1);
  });

  it('refuses to switch when local changes would be overwritten', () => {
    const s = play([clone, 'git switch -c feature', 'edit app.js', 'git add .', 'git commit -m "f"', 'git switch main', 'edit app.js']);
    expect(run(s, 'git switch feature').ok).toBe(false);
  });

  it('push updates the remote branch and origin/main; a stale push is rejected', () => {
    const s = play([clone, 'edit app.js', 'git add .', 'git commit -m "Update"']);
    const tip = headId(s)!;
    const pushed = play(['git push'], s);
    expect(pushed.remote?.main).toBe(tip);
    expect(pushed.tracking.main).toBe(tip);
    expect(pushed.commits[tip]!.remote).toBe(true);

    const behind = play(['teammate push', 'edit readme.md', 'git add .', 'git commit -m "Mine"'], pushed);
    const teammateTip = behind.remote!.main!;
    expect(behind.commits[teammateTip]!.local).toBe(false);
    expect(run(behind, 'git push').ok).toBe(false);

    const fetched = play(['git fetch'], behind);
    expect(fetched.tracking.main).toBe(teammateTip);
    expect(fetched.branches.main).toBe(behind.branches.main);
    expect(fetched.commits[teammateTip]!.local).toBe(true);

    const pulled = play(['git pull', 'git push'], fetched);
    expect(head(pulled).parents).toHaveLength(2);
    expect(pulled.remote?.main).toBe(headId(pulled));
  });

  it('runs every tour step successfully, in order', () => {
    for (const tour of TOURS) {
      let s = initialState();
      tour.steps.forEach((step, i) => {
        const r = run(s, step.command);
        expect(r.ok, `${tour.id} step ${i + 1}: ${step.command} -> ${r.output.join(' / ')}`).toBe(true);
        expect(r.explain.length).toBeGreaterThan(0);
        s = r.state;
      });
    }
  });

  it('runs every command example successfully from a sensible state', () => {
    const feature = [clone, 'git switch -c feature', 'edit login.js', 'git add .', 'git commit -m "Add login"'];
    const setups: Record<string, string[]> = {
      init: [],
      clone: [],
      add: [clone, 'edit app.js'],
      commit: [clone, 'edit app.js', 'git add app.js'],
      restore: [clone, 'edit app.js'],
      'restore-staged': [clone, 'edit app.js', 'git add app.js'],
      'branch-delete': [clone, 'git branch feature'],
      switch: [clone, 'git switch -c feature'],
      merge: [...feature, 'git switch main'],
      rebase: [...feature, 'git switch main', 'edit readme.md', 'git add .', 'git commit -m "Readme"', 'git switch feature'],
      stash: [clone, 'edit app.js'],
      'stash-pop': [clone, 'edit app.js', 'git stash'],
      pull: [clone, 'teammate push'],
    };
    expect(COMMANDS.length).toBeGreaterThanOrEqual(22);
    expect(new Set(COMMANDS.map((c) => c.id)).size).toBe(COMMANDS.length);
    for (const c of COMMANDS) {
      const r = run(play(setups[c.id] ?? [clone]), c.example);
      expect(r.ok, `${c.id}: ${c.example} -> ${r.output.join(' / ')}`).toBe(true);
    }
  });
});
