/**
 * A small, pure Git simulator for the Git page. A file is a name plus a version
 * number instead of real content: a new version means the file changed, which
 * is all the visual needs. Every function returns new objects and never mutates.
 * Conflicts are not modelled: where real Git would stop, the output says so and
 * the simulator keeps the incoming version.
 */

export type Tree = Readonly<Record<string, number>>;

export interface Commit {
  readonly id: string;
  readonly message: string;
  readonly parents: readonly string[];
  readonly tree: Tree;
  /** Graph row: the lane of the branch the commit was made on. */
  readonly lane: number;
  /** Creation order, used for the graph's x position. */
  readonly seq: number;
  /** In the local repository. */
  readonly local: boolean;
  /** On origin. */
  readonly remote: boolean;
}

export interface StashEntry {
  readonly label: string;
  readonly base: string;
  readonly index: Tree;
  readonly work: Tree;
}

export interface LogEntry {
  /** Running number, a stable key for the terminal. */
  readonly n: number;
  readonly input: string;
  readonly output: readonly string[];
  readonly ok: boolean;
  readonly explain: string;
}

export interface GitState {
  /** `git init` (or clone) has run. */
  readonly repo: boolean;
  readonly work: Tree;
  /** The staging area: always the full snapshot of the next commit. */
  readonly index: Tree;
  readonly commits: Readonly<Record<string, Commit>>;
  readonly branches: Readonly<Record<string, string>>;
  readonly lanes: Readonly<Record<string, number>>;
  /** A branch name, or a commit id when detached. */
  readonly head: string;
  readonly detached: boolean;
  /** origin's own branches, or null when there is no remote. */
  readonly remote: Readonly<Record<string, string>> | null;
  /** Remote-tracking branches (origin/<name>) as of the last fetch or push. */
  readonly tracking: Readonly<Record<string, string>>;
  /** Newest first. */
  readonly stash: readonly StashEntry[];
  /** Highest version ever written per file, so every edit is a new version. */
  readonly versions: Readonly<Record<string, number>>;
  readonly counter: number;
  readonly log: readonly LogEntry[];
}

export interface RunResult {
  state: GitState;
  output: string[];
  ok: boolean;
  explain: string;
}

export type FileStatus = 'untracked' | 'modified' | 'staged' | 'unchanged' | 'committed';
export interface FileChip {
  name: string;
  version: number;
  status: FileStatus;
}
export interface Label {
  name: string;
  kind: 'head' | 'branch' | 'tracking';
}

const LOG_LIMIT = 60;
const REFUSED = 'Git refused, so nothing changed.';
const BRANCH = /^[A-Za-z0-9][\w-]*(\/[\w-]+)*$/;
const FILE = /^\w[\w.-]*(\/[\w.-]+)*$/;

export function initialState(): GitState {
  return {
    repo: false,
    work: {},
    index: {},
    commits: {},
    branches: {},
    lanes: {},
    head: 'main',
    detached: false,
    remote: null,
    tracking: {},
    stash: [],
    versions: {},
    counter: 0,
    log: [],
  };
}

/** Deterministic 7-hex-digit id: n times an odd constant mod 2^28 is a bijection, so ids never repeat. */
export const shortId = (n: number) => ((Math.imul(n, 0x9e3779b1) >>> 0) & 0xfffffff).toString(16).padStart(7, '0');

// ---- Small helpers ----

const keys = (...trees: Tree[]) => [...new Set(trees.flatMap((t) => Object.keys(t)))].sort();
const changed = (a: Tree, b: Tree) => keys(a, b).filter((f) => a[f] !== b[f]);
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
const pick = (t: Tree, keep: (f: string) => boolean): Tree => Object.fromEntries(Object.entries(t).filter(([f]) => keep(f)));
const tracked = (s: GitState) => pick(s.work, (f) => f in s.index);
const untracked = (s: GitState) => pick(s.work, (f) => !(f in s.index));

function put(tree: Tree, file: string, v: number | undefined): Tree {
  const next = { ...tree };
  if (v === undefined) delete next[file];
  else next[file] = v;
  return next;
}
function omit<T>(rec: Readonly<Record<string, T>>, key: string): Record<string, T> {
  const next = { ...rec };
  delete next[key];
  return next;
}
function mapCommits(s: GitState, f: (c: Commit) => Commit) {
  return Object.fromEntries(Object.entries(s.commits).map(([id, c]) => [id, f(c)]));
}

const done = (state: GitState, output: string[], explain: string): RunResult => ({ state, output, ok: true, explain });
const fail = (state: GitState, output: string | string[], explain = REFUSED): RunResult => ({
  state,
  output: typeof output === 'string' ? [output] : output,
  ok: false,
  explain,
});
const overwrite = (s: GitState, files: string[]) =>
  fail(
    s,
    [`error: your local changes to ${files.join(', ')} would be overwritten.`, 'Commit them, or run git stash, then try again.'],
    'Git refused so that your uncommitted work is not lost; nothing changed.',
  );

// ---- Reading the repository ----

export const headId = (s: GitState): string | undefined => (s.detached ? s.head : s.branches[s.head]);
export const headTree = (s: GitState): Tree => s.commits[headId(s) ?? '']?.tree ?? {};

/** The commit and everything it descends from. */
export function ancestors(s: GitState, id: string | undefined): Set<string> {
  const seen = new Set<string>();
  const stack = id ? [id] : [];
  while (stack.length) {
    const c = stack.pop()!;
    if (seen.has(c)) continue;
    seen.add(c);
    stack.push(...(s.commits[c]?.parents ?? []));
  }
  return seen;
}
const isAncestor = (s: GitState, a: string, b: string) => ancestors(s, b).has(a);

function mergeBase(s: GitState, a: string, b: string): string | undefined {
  const inA = ancestors(s, a);
  let best: Commit | undefined;
  for (const id of ancestors(s, b)) {
    const c = s.commits[id];
    if (c && inA.has(id) && (!best || c.seq > best.seq)) best = c;
  }
  return best?.id;
}

/** Commits that some ref (HEAD, a branch, origin, a stash) still leads to. The rest are left behind. */
export function reachable(s: GitState): Set<string> {
  const refs = [headId(s), ...Object.values(s.branches), ...Object.values(s.tracking), ...Object.values(s.remote ?? {}), ...s.stash.map((e) => e.base)];
  return new Set(refs.flatMap((r) => [...ancestors(s, r)]));
}

/** Ref labels per commit id: HEAD first, then the current branch, other branches, origin/*. */
export function labelsByCommit(s: GitState): Record<string, Label[]> {
  const out: Record<string, Label[]> = {};
  const add = (id: string, l: Label) => (out[id] ??= []).push(l);
  const h = headId(s);
  if (h) add(h, { name: 'HEAD', kind: 'head' });
  const branches = Object.entries(s.branches).sort(([a], [b]) => (a === s.head ? -1 : b === s.head ? 1 : a.localeCompare(b)));
  for (const [b, id] of branches) add(id, { name: b, kind: 'branch' });
  for (const [b, id] of Object.entries(s.tracking).sort()) add(id, { name: `origin/${b}`, kind: 'tracking' });
  return out;
}

/** What each of the three areas holds, for the visual. */
export function stages(s: GitState): { work: FileChip[]; index: FileChip[]; head: FileChip[] } {
  const head = headTree(s);
  return {
    work: Object.keys(s.work)
      .sort()
      .map((name): FileChip => ({
        name,
        version: s.work[name]!,
        status: !(name in s.index) ? 'untracked' : s.work[name] !== s.index[name] ? 'modified' : 'unchanged',
      })),
    index: Object.keys(s.index)
      .sort()
      .map((name): FileChip => ({ name, version: s.index[name]!, status: s.index[name] !== head[name] ? 'staged' : 'unchanged' })),
    head: Object.keys(head)
      .sort()
      .map((name): FileChip => ({ name, version: head[name]!, status: 'committed' })),
  };
}

/** Resolves HEAD, branch, origin/branch or an id prefix, with an optional ~n or ^ suffix. */
function resolve(s: GitState, ref: string): string | undefined {
  const m = /^(.+?)(?:~(\d*)|(\^))?$/.exec(ref);
  if (!m) return undefined;
  const name = m[1] ?? '';
  let id =
    name === 'HEAD'
      ? headId(s)
      : (s.branches[name] ?? (name.startsWith('origin/') ? s.tracking[name.slice(7)] : undefined) ?? byPrefix(s, name));
  let n = m[2] !== undefined ? (m[2] === '' ? 1 : Number(m[2])) : m[3] ? 1 : 0;
  while (id && n-- > 0) id = s.commits[id]?.parents[0];
  return id;
}
function byPrefix(s: GitState, p: string) {
  if (!/^[0-9a-f]{4,7}$/.test(p)) return undefined;
  const hits = Object.values(s.commits).filter((c) => c.local && c.id.startsWith(p));
  return hits.length === 1 ? hits[0]!.id : undefined;
}

// ---- Changing the repository ----

function addCommit(
  s: GitState,
  message: string,
  parents: string[],
  tree: Tree,
  lane: number,
  where = { local: true, remote: false },
): [GitState, Commit] {
  const counter = s.counter + 1;
  const c: Commit = { id: shortId(counter), message, parents, tree, lane, seq: counter, ...where };
  return [{ ...s, counter, commits: { ...s.commits, [c.id]: c } }, c];
}

const setHead = (s: GitState, id: string): GitState =>
  s.detached ? { ...s, head: id } : { ...s, branches: { ...s.branches, [s.head]: id } };

function freeLane(s: GitState) {
  const used = new Set(Object.values(s.lanes));
  let l = 0;
  while (used.has(l)) l++;
  return l;
}
/** Detached commits get a row of their own so they never sit on a branch's line. */
const laneOf = (s: GitState) => (s.detached ? freeLane(s) : (s.lanes[s.head] ?? 0));
const headName = (s: GitState) => (s.detached ? 'HEAD' : s.head);

const withBranch = (s: GitState, name: string, at: string): GitState => ({
  ...s,
  branches: { ...s.branches, [name]: at },
  lanes: { ...s.lanes, [name]: freeLane(s) },
});
function branchError(s: GitState, name: string) {
  if (!BRANCH.test(name) || name === 'HEAD') return `fatal: '${name}' is not a valid branch name.`;
  if (s.branches[name]) return `fatal: a branch named '${name}' already exists.`;
  return undefined;
}

/**
 * Moves the working directory and staging area from HEAD's snapshot to `target`, carrying
 * uncommitted changes along. Returns the blocked files instead when a change would be lost.
 */
function checkoutTree(s: GitState, target: Tree): { work: Tree; index: Tree } | string[] {
  const head = headTree(s);
  const files = changed(head, target);
  const blocked = files.filter((f) => (s.index[f] !== head[f] || s.work[f] !== s.index[f]) && s.work[f] !== target[f]);
  if (blocked.length) return blocked;
  let { work, index } = s;
  for (const f of files) {
    work = put(work, f, target[f]);
    index = put(index, f, target[f]);
  }
  return { work, index };
}

function describe(f: string, from: number | undefined, to: number | undefined) {
  if (from === undefined) return `new file:   ${f} (v${to})`;
  if (to === undefined) return `deleted:    ${f}`;
  return `modified:   ${f} (v${from} -> v${to})`;
}

// ---- Commands ----

function init(s: GitState): RunResult {
  if (s.repo) return done(s, ['Reinitialized existing Git repository in .git/'], 'The repository already existed, so nothing changed.');
  return done(
    { ...s, repo: true, head: 'main', detached: false, lanes: { main: 0 } },
    ['Initialized empty Git repository in .git/'],
    'Created an empty repository: HEAD points at a main branch that has no commits yet, and your files are untouched.',
  );
}

/** The starter project every clone gets: three commits on main, all of them on origin too. */
function clone(s: GitState): RunResult {
  let next: GitState = { ...initialState(), repo: true, lanes: { main: 0 }, log: s.log };
  const snaps: [string, Tree][] = [
    ['Initial commit', { 'readme.md': 1 }],
    ['Add app', { 'readme.md': 1, 'app.js': 1 }],
    ['Add styles', { 'readme.md': 1, 'app.js': 1, 'style.css': 1 }],
  ];
  let tip = '';
  for (const [message, tree] of snaps) {
    const [n, c] = addCommit(next, message, tip ? [tip] : [], tree, 0, { local: true, remote: true });
    next = n;
    tip = c.id;
  }
  const tree = next.commits[tip]!.tree;
  next = { ...next, branches: { main: tip }, remote: { main: tip }, tracking: { main: tip }, work: tree, index: tree, versions: tree };
  return done(
    next,
    ["Cloning into 'project'...", 'Receiving objects: 3 commits, done.'],
    'Copied every commit from origin, created origin/main to remember where origin’s main is, and checked out main into the working directory.',
  );
}

function status(s: GitState): RunResult {
  const id = headId(s);
  const lines = [s.detached ? `HEAD detached at ${s.head}` : `On branch ${s.head}`];
  const up = s.detached ? undefined : s.tracking[s.head];
  if (!id) lines.push('', 'No commits yet');
  else if (up) {
    const mine = ancestors(s, id);
    const theirs = ancestors(s, up);
    const ahead = [...mine].filter((c) => !theirs.has(c)).length;
    const behind = [...theirs].filter((c) => !mine.has(c)).length;
    const o = `'origin/${s.head}'`;
    lines.push(
      ahead && behind
        ? `Your branch and ${o} have diverged, with ${ahead} and ${behind} different commits each.`
        : ahead
          ? `Your branch is ahead of ${o} by ${plural(ahead, 'commit')}.`
          : behind
            ? `Your branch is behind ${o} by ${plural(behind, 'commit')}, and can be fast-forwarded.`
            : `Your branch is up to date with ${o}.`,
    );
  }
  const head = headTree(s);
  const staged = changed(head, s.index);
  const unstaged = changed(s.index, tracked(s));
  const fresh = Object.keys(untracked(s)).sort();
  if (staged.length) lines.push('', 'Changes to be committed:', ...staged.map((f) => `  ${describe(f, head[f], s.index[f])}`));
  if (unstaged.length) lines.push('', 'Changes not staged for commit:', ...unstaged.map((f) => `  ${describe(f, s.index[f], s.work[f])}`));
  if (fresh.length) lines.push('', 'Untracked files:', ...fresh.map((f) => `  ${f}`));
  if (!staged.length && !unstaged.length && !fresh.length) lines.push('', 'nothing to commit, working tree clean');
  return done(
    s,
    lines,
    `Compared the working directory, staging area and HEAD without moving anything: ${staged.length} staged, ${unstaged.length} changed but not staged, ${fresh.length} untracked.`,
  );
}

function add(s: GitState, args: string[]): RunResult {
  if (!args.length) return fail(s, ['Nothing specified, nothing added.', 'Try git add <file>, or git add . for every change.']);
  const all = args.includes('.') || args.includes('-A');
  const files = all ? keys(s.work, s.index).filter((f) => s.work[f] !== s.index[f]) : args;
  let index = s.index;
  for (const f of files) {
    if (f in s.work) index = put(index, f, s.work[f]);
    else if (f in s.index) index = put(index, f, undefined);
    else return fail(s, `fatal: pathspec '${f}' did not match any files`);
  }
  const one = files.length === 1 ? files[0]! : undefined;
  const what = one ? (one in s.work ? `${one} (v${s.work[one]})` : `the deletion of ${one}`) : plural(files.length, 'file');
  return done(
    { ...s, index },
    [],
    files.length
      ? `Copied ${what} from the working directory into the staging area, ready for the next commit.`
      : 'The staging area already matched the working directory, so nothing was copied.',
  );
}

function commit(s: GitState, args: string[]): RunResult {
  let message: string | undefined;
  let amend = false;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '-m') message = args[++i];
    else if (a === '--amend') amend = true;
    else if (a !== '--no-edit') return fail(s, `error: unknown option '${a}'. Try git commit -m "message".`);
  }
  if (message === '') return fail(s, 'Aborting commit due to empty commit message.');
  const name = s.detached ? 'detached HEAD' : s.head;
  const old = headId(s);

  if (amend) {
    if (!old) return fail(s, 'fatal: you have nothing to amend.');
    const prev = s.commits[old]!;
    const [n, c] = addCommit(s, message ?? prev.message, [...prev.parents], s.index, prev.lane);
    return done(
      setHead(n, c.id),
      [`[${name} ${c.id}] ${c.message}`],
      `Made a new commit ${c.id} from the staging area to replace ${old}, and moved ${headName(s)} to it; the old commit still exists but nothing points at it.`,
    );
  }

  if (message === undefined) return fail(s, ['error: add a message with -m, for example:', '  git commit -m "Add login form"']);
  const files = changed(headTree(s), s.index);
  if (!files.length) {
    const hint = Object.keys(untracked(s)).length
      ? 'nothing added to commit but untracked files present (use "git add" to track)'
      : changed(s.index, tracked(s)).length
        ? 'no changes added to commit (use "git add" first)'
        : 'nothing to commit, working tree clean';
    return fail(s, hint, 'The staging area matches HEAD, so there was nothing new to save.');
  }
  const [n, c] = addCommit(s, message, old ? [old] : [], s.index, laneOf(s));
  return done(
    setHead(n, c.id),
    [`[${name}${old ? '' : ' (root-commit)'} ${c.id}] ${message}`, ` ${plural(files.length, 'file')} changed`],
    `Saved a snapshot of the staging area as commit ${c.id} and moved ${headName(s)} to point at it; your files did not change.`,
  );
}

function log(s: GitState, args: string[]): RunResult {
  const roots = args.includes('--all') ? [headId(s), ...Object.values(s.branches), ...Object.values(s.tracking)] : [headId(s)];
  const ids = new Set(roots.flatMap((r) => [...ancestors(s, r)]));
  if (!ids.size) return fail(s, `fatal: your current branch '${s.head}' does not have any commits yet`);
  const labels = labelsByCommit(s);
  const decorate = (id: string) => {
    const names = (labels[id] ?? [])
      .filter((l) => s.detached || !(l.kind === 'branch' && l.name === s.head))
      .map((l) => (l.kind === 'head' && !s.detached ? `HEAD -> ${s.head}` : l.name));
    return names.length ? ` (${names.join(', ')})` : '';
  };
  const lines = [...ids]
    .map((id) => s.commits[id]!)
    .sort((a, b) => b.seq - a.seq)
    .map((c) => `${c.id}${decorate(c.id)} ${c.message}`);
  return done(s, lines, 'Walked back from HEAD through each commit’s parents, newest first; nothing moved.');
}

function diff(s: GitState, args: string[]): RunResult {
  const staged = args.includes('--staged') || args.includes('--cached');
  const [from, to] = staged ? [headTree(s), s.index] : [s.index, tracked(s)];
  return done(
    s,
    changed(from, to).map((f) => describe(f, from[f], to[f])),
    staged
      ? 'Compared the staging area with HEAD to show what the next commit would contain; nothing moved.'
      : 'Compared the working directory with the staging area to show edits you have not staged yet; nothing moved.',
  );
}

function branch(s: GitState, args: string[]): RunResult {
  const [a, b] = args;
  if (!a) {
    const lines = Object.keys(s.branches)
      .sort()
      .map((n) => `${!s.detached && n === s.head ? '*' : ' '} ${n}`);
    if (s.detached) lines.unshift(`* (HEAD detached at ${s.head})`);
    return done(s, lines, 'Listed the branches; each one is just a name that points at a commit.');
  }
  if (a === '-d' || a === '-D') {
    if (!b) return fail(s, `usage: git branch ${a} <name>`);
    const id = s.branches[b];
    if (!id) return fail(s, `error: branch '${b}' not found.`);
    if (!s.detached && s.head === b) return fail(s, `error: cannot delete branch '${b}' while HEAD points at it. Switch to another branch first.`);
    const cur = headId(s);
    if (a === '-d' && !(cur && isAncestor(s, id, cur)))
      return fail(s, [`error: the branch '${b}' is not fully merged.`, `Merge it first, or run git branch -D ${b} to delete it anyway.`]);
    return done(
      { ...s, branches: omit(s.branches, b), lanes: omit(s.lanes, b) },
      [`Deleted branch ${b} (was ${id}).`],
      `Removed the name ${b}; the commits it pointed at are still in the repository.`,
    );
  }
  if (a.startsWith('-')) return fail(s, `error: unknown option '${a}'.`);
  const at = resolve(s, b ?? 'HEAD');
  if (!at) return fail(s, b ? `fatal: not a valid commit: '${b}'` : 'fatal: make a commit first; a branch needs a commit to point at.');
  const err = branchError(s, a);
  if (err) return fail(s, err);
  return done(withBranch(s, a, at), [], `Created branch ${a} pointing at ${at}; HEAD did not move, so you are still on ${headName(s)}.`);
}

function switchTo(s: GitState, name: string): RunResult {
  if (!s.detached && s.head === name) return done(s, [`Already on '${name}'`], `HEAD already points at ${name}, so nothing changed.`);
  const id = s.branches[name]!;
  const moved = checkoutTree(s, s.commits[id]!.tree);
  if (Array.isArray(moved)) return overwrite(s, moved);
  return done(
    { ...s, ...moved, head: name, detached: false },
    [`Switched to branch '${name}'`],
    `HEAD now points at ${name}, and the working directory and staging area were updated to its commit ${id}.`,
  );
}

function createAndSwitch(s: GitState, name: string | undefined): RunResult {
  if (!name) return fail(s, 'usage: git switch -c <new-branch>');
  const at = headId(s);
  if (!at) return fail(s, 'fatal: make a commit first; a new branch needs a commit to point at.');
  const err = branchError(s, name);
  if (err) return fail(s, err);
  return done(
    { ...withBranch(s, name, at), head: name, detached: false },
    [`Switched to a new branch '${name}'`],
    `Created ${name} at ${at} and pointed HEAD at it; no files changed because both branches point at the same commit.`,
  );
}

function detach(s: GitState, id: string): RunResult {
  const moved = checkoutTree(s, s.commits[id]!.tree);
  if (Array.isArray(moved)) return overwrite(s, moved);
  return done(
    { ...s, ...moved, head: id, detached: true },
    [`HEAD is now at ${id} ${s.commits[id]!.message}`, 'You are in detached HEAD state: new commits here will not belong to any branch.'],
    `HEAD now points straight at commit ${id} instead of at a branch, and the working directory was updated to match it.`,
  );
}

function switchCmd(s: GitState, [a, b]: string[]): RunResult {
  if (a === '-c' || a === '--create') return createAndSwitch(s, b);
  if (a === '--detach') {
    const id = b ? resolve(s, b) : headId(s);
    return id ? detach(s, id) : fail(s, `fatal: invalid reference: ${b}`);
  }
  if (!a) return fail(s, 'usage: git switch <branch>, or git switch -c <new-branch>');
  if (s.branches[a] !== undefined) return switchTo(s, a);
  return fail(
    s,
    resolve(s, a)
      ? [`fatal: a branch is expected, got commit '${a}'.`, `Use git switch --detach ${a}, or git checkout ${a}, to look at a commit.`]
      : `fatal: invalid reference: ${a}`,
  );
}

function checkout(s: GitState, [a, b]: string[]): RunResult {
  if (a === '-b') return createAndSwitch(s, b);
  if (!a) return fail(s, 'usage: git checkout <branch>, or git checkout -b <new-branch>');
  if (s.branches[a] !== undefined) return switchTo(s, a);
  const id = resolve(s, a);
  if (id) return detach(s, id);
  if (a in s.work || a in s.index) return fail(s, [`'${a}' is a file, not a branch.`, `To throw away edits to it, use git restore ${a}.`]);
  return fail(s, `error: pathspec '${a}' did not match any branch or commit.`);
}

/** Fast-forward when possible, otherwise a merge commit with two parents. Shared by merge and pull. */
function mergeInto(s: GitState, target: string, label: string): RunResult {
  const cur = headId(s);
  const name = headName(s);
  if (!cur) return fail(s, 'fatal: make a commit first; there is nothing to merge into.');
  if (isAncestor(s, target, cur)) return done(s, ['Already up to date.'], `${name} already contains every commit in ${label}, so nothing changed.`);
  if (isAncestor(s, cur, target)) {
    const moved = checkoutTree(s, s.commits[target]!.tree);
    if (Array.isArray(moved)) return overwrite(s, moved);
    return done(
      { ...setHead(s, target), ...moved },
      [`Updating ${cur}..${target}`, 'Fast-forward'],
      `${name} simply moved forward to ${target} (a fast-forward) because it had no commits of its own, so no new commit was needed.`,
    );
  }
  const base = s.commits[mergeBase(s, cur, target) ?? '']?.tree ?? {};
  const ours = s.commits[cur]!.tree;
  const theirs = s.commits[target]!.tree;
  let tree: Tree = {};
  const notes: string[] = [];
  for (const f of keys(base, ours, theirs)) {
    const [b, o, t] = [base[f], ours[f], theirs[f]];
    if (o !== b && t !== b && o !== t)
      notes.push(`Both sides changed ${f}: real Git would stop here with a merge conflict. This simulator keeps the version from ${label}.`);
    tree = put(tree, f, o === b ? t : t === b ? o : t);
  }
  const moved = checkoutTree(s, tree);
  if (Array.isArray(moved)) return overwrite(s, moved);
  const msg = label.startsWith('origin/') ? `Merge remote-tracking branch '${label}'` : `Merge branch '${label}'`;
  const [n, c] = addCommit({ ...s, ...moved }, msg, [cur, target], tree, laneOf(s));
  return done(
    setHead(n, c.id),
    ["Merge made by the 'ort' strategy.", ...notes],
    `${name} got a new merge commit ${c.id} with two parents, ${cur} and ${target}, which joins both lines of work.`,
  );
}

function merge(s: GitState, [ref]: string[]): RunResult {
  if (!ref) return fail(s, 'usage: git merge <branch>');
  const id = resolve(s, ref);
  return id ? mergeInto(s, id, ref) : fail(s, `merge: ${ref} - not something we can merge`);
}

function rebase(s: GitState, [ref]: string[]): RunResult {
  if (!ref) return fail(s, 'usage: git rebase <branch>');
  const up = resolve(s, ref);
  const cur = headId(s);
  const name = headName(s);
  if (!up) return fail(s, `fatal: invalid upstream '${ref}'`);
  if (!cur) return fail(s, 'fatal: make a commit first; there is nothing to rebase.');
  if (changed(headTree(s), s.index).length || changed(s.index, tracked(s)).length)
    return fail(s, ['error: cannot rebase: you have uncommitted changes.', 'Commit them, or run git stash, first.']);
  if (isAncestor(s, up, cur)) return done(s, [`Current branch ${name} is up to date.`], `${name} already sits on top of ${ref}, so there was nothing to replay.`);
  const moveTo = (next: GitState, id: string): GitState => {
    const tree = next.commits[id]!.tree;
    return { ...setHead(next, id), index: tree, work: { ...untracked(s), ...tree } };
  };
  if (isAncestor(s, cur, up))
    return done(moveTo(s, up), [`Successfully rebased and updated ${name}.`], `${name} had no commits of its own, so it simply moved forward to ${up}.`);

  const upstream = ancestors(s, up);
  const todo = [...ancestors(s, cur)]
    .filter((id) => !upstream.has(id))
    .map((id) => s.commits[id]!)
    .filter((c) => c.parents.length < 2)
    .sort((a, b) => a.seq - b.seq);
  let next = s;
  let base = up;
  const lines: string[] = [];
  for (const c of todo) {
    const before = s.commits[c.parents[0] ?? '']?.tree ?? {};
    let tree = next.commits[base]!.tree;
    for (const f of changed(before, c.tree)) {
      if (tree[f] !== before[f] && tree[f] !== c.tree[f])
        lines.push(`Both sides changed ${f}: real Git would stop for you to resolve it. This simulator keeps ${c.id}'s version.`);
      tree = put(tree, f, c.tree[f]);
    }
    const [n, nc] = addCommit(next, c.message, [base], tree, laneOf(s));
    next = n;
    base = nc.id;
    lines.push(`${c.id} -> ${nc.id} ${c.message}`);
  }
  return done(
    moveTo(next, base),
    [...lines, `Successfully rebased and updated ${name}.`],
    `Copied ${plural(todo.length, 'commit')} from ${name} onto ${ref} as new commits with new ids; the originals are left behind with nothing pointing at them.`,
  );
}

function reset(s: GitState, args: string[]): RunResult {
  const modes = args.filter((a) => a.startsWith('-'));
  const refs = args.filter((a) => !a.startsWith('-'));
  const mode = modes[0] ?? '--mixed';
  if (modes.length > 1 || refs.length > 1 || !['--soft', '--mixed', '--hard'].includes(mode))
    return fail(s, 'usage: git reset [--soft | --mixed | --hard] <commit>');
  const ref = refs[0] ?? 'HEAD';
  const id = resolve(s, ref);
  const old = headId(s);
  if (!old) return fail(s, 'fatal: make a commit first; there is nothing to reset to.');
  if (!id) {
    const hint = ref in s.index ? [`To unstage a file, use git restore --staged ${ref}.`] : [];
    return fail(s, [`fatal: ambiguous argument '${ref}': unknown revision.`, ...hint]);
  }
  const tree = s.commits[id]!.tree;
  const name = headName(s);
  const moved = setHead(s, id);
  if (mode === '--soft')
    return done(moved, [], `Moved ${name} from ${old} to ${id} without touching the staging area or working directory, so the undone changes are still staged.`);
  if (mode === '--mixed') {
    const next = { ...moved, index: tree };
    const unstaged = changed(tree, tracked(next));
    return done(
      next,
      unstaged.length ? ['Unstaged changes after reset:', ...unstaged.map((f) => `M\t${f}`)] : [],
      `Moved ${name} to ${id} and reset the staging area to match it; your edits are still in the working directory, now unstaged.`,
    );
  }
  return done(
    { ...moved, index: tree, work: { ...untracked(s), ...tree } },
    [`HEAD is now at ${id} ${s.commits[id]!.message}`],
    `Moved ${name} to ${id} and overwrote the staging area and working directory to match it, so uncommitted changes are gone.`,
  );
}

function revert(s: GitState, [ref]: string[]): RunResult {
  if (!ref) return fail(s, 'usage: git revert <commit>');
  const id = resolve(s, ref);
  const cur = headId(s);
  if (!id || !cur) return fail(s, `fatal: bad revision '${ref}'`);
  const c = s.commits[id]!;
  if (c.parents.length > 1)
    return fail(s, [`error: commit ${id} is a merge.`, 'Real Git needs -m to choose a side; this simulator reverts ordinary commits only.']);
  const parent = s.commits[c.parents[0] ?? '']?.tree ?? {};
  let tree = headTree(s);
  const notes: string[] = [];
  for (const f of changed(c.tree, parent)) {
    if (tree[f] !== c.tree[f]) notes.push(`${f} changed again after ${id}: real Git would stop with a conflict. This simulator restores the older version.`);
    tree = put(tree, f, parent[f]);
  }
  const moved = checkoutTree(s, tree);
  if (Array.isArray(moved)) return overwrite(s, moved);
  const [n, nc] = addCommit({ ...s, ...moved }, `Revert "${c.message}"`, [cur], tree, laneOf(s));
  return done(
    setHead(n, nc.id),
    [`[${s.detached ? 'detached HEAD' : s.head} ${nc.id}] ${nc.message}`, ...notes],
    `Made a new commit ${nc.id} that undoes the changes from ${id}; history is kept, which is why this is safe on shared branches.`,
  );
}

function restore(s: GitState, args: string[]): RunResult {
  const staged = args.includes('--staged') || args.includes('-S');
  const bad = args.find((a) => a.startsWith('-') && a !== '--staged' && a !== '-S');
  if (bad) return fail(s, `error: unknown option '${bad}'.`);
  const named = args.filter((a) => !a.startsWith('-'));
  if (!named.length) return fail(s, 'fatal: you must name the file to restore, for example git restore app.js');
  const head = headTree(s);
  const files = named.includes('.') ? (staged ? changed(head, s.index) : changed(s.index, tracked(s))) : named;
  let { work, index } = s;
  for (const f of files) {
    if (staged) {
      if (!(f in s.index) && !(f in head)) return fail(s, `error: pathspec '${f}' did not match any file known to git`);
      index = put(index, f, head[f]);
    } else {
      if (!(f in s.index))
        return fail(s, f in s.work ? `error: ${f} is untracked, so Git has no saved copy to restore it from.` : `error: pathspec '${f}' did not match any file known to git`);
      work = put(work, f, s.index[f]);
    }
  }
  const what = files.length === 1 ? files[0]! : plural(files.length, 'file');
  if (!files.length) return done(s, [], 'There was nothing to restore, so nothing changed.');
  return done(
    { ...s, work, index },
    [],
    staged
      ? `Copied ${what} from HEAD back into the staging area, so it is no longer staged; the working directory keeps your edit.`
      : `Copied ${what} from the staging area over the working directory, throwing away the unstaged edit.`,
  );
}

function stash(s: GitState, [sub, ...rest]: string[]): RunResult {
  if (!sub || sub === 'push') {
    const base = headId(s);
    if (!base) return fail(s, 'fatal: make a commit first; the stash needs a commit to start from.');
    const head = headTree(s);
    const work = tracked(s);
    if (!changed(head, s.index).length && !changed(s.index, work).length)
      return done(s, ['No local changes to save'], 'There were no changes to tracked files, so nothing was stashed.');
    const label = `WIP on ${s.detached ? '(no branch)' : s.head}: ${base} ${s.commits[base]!.message}`;
    return done(
      { ...s, stash: [{ label, base, index: s.index, work }, ...s.stash], index: head, work: { ...untracked(s), ...head } },
      [`Saved working directory and index state ${label}`],
      'Saved your staged and unstaged changes on the stash stack, then reset the staging area and working directory to HEAD; untracked files stay put.',
    );
  }
  if (sub === 'list') return done(s, s.stash.map((e, i) => `stash@{${i}}: ${e.label}`), 'Listed the stash stack, newest first; nothing moved.');
  if (sub !== 'pop') return fail(s, `error: unknown stash command '${sub}'. Try git stash, git stash pop or git stash list.`);

  const [top, ...below] = s.stash;
  if (!top) return fail(s, 'error: no stash entries found.');
  const withIndex = rest.includes('--index');
  const base = s.commits[top.base]!.tree;
  const files = keys(base, top.index, top.work).filter((f) => top.work[f] !== base[f] || top.index[f] !== base[f]);
  const head = headTree(s);
  const blocked = files.filter((f) => s.index[f] !== head[f] || s.work[f] !== s.index[f]);
  if (blocked.length) return overwrite(s, blocked);
  let { work, index } = s;
  for (const f of files) {
    work = put(work, f, top.work[f]);
    // Without --index only brand-new files go back into the staging area, as in real Git.
    if (withIndex || (base[f] === undefined && top.index[f] !== undefined)) index = put(index, f, top.index[f]);
  }
  return done(
    { ...s, work, index, stash: below },
    [`Dropped stash@{0} (${top.label})`],
    withIndex
      ? 'Re-applied the stashed changes to the working directory and staging area, then removed the entry from the stash.'
      : 'Re-applied the stashed changes to the working directory and removed the entry from the stash; edits that were staged come back unstaged.',
  );
}

const NO_REMOTE = ['fatal: there is no remote called origin yet.', 'This simulator sets one up with git clone.'];

function push(s: GitState, args: string[]): RunResult {
  if (!s.remote) return fail(s, NO_REMOTE);
  if (s.detached) return fail(s, 'fatal: you are not on a branch. Switch to a branch, then push it.');
  const b = s.head;
  const local = s.branches[b];
  if (args.some((a) => !['-u', '--set-upstream', 'origin', b].includes(a)))
    return fail(s, `error: this simulator pushes the current branch only: git push, or git push -u origin ${b}.`);
  if (!local) return fail(s, `error: src refspec ${b} does not match any (make a commit first).`);
  const theirs = s.remote[b];
  if (theirs === local) return done(s, ['Everything up-to-date'], `origin already has ${b} at ${local}, so nothing was sent.`);
  if (theirs && !isAncestor(s, theirs, local))
    return fail(
      s,
      [`! [rejected]  ${b} -> ${b} (fetch first)`, 'error: origin has commits you do not have. Run git pull, then push again.'],
      `Git refused because moving origin’s ${b} would throw away commits someone else pushed.`,
    );
  const send = ancestors(s, local);
  const count = [...send].filter((id) => !s.commits[id]!.remote).length;
  return done(
    {
      ...s,
      commits: mapCommits(s, (c) => (send.has(c.id) && !c.remote ? { ...c, remote: true } : c)),
      remote: { ...s.remote, [b]: local },
      tracking: { ...s.tracking, [b]: local },
    },
    ['To origin', theirs ? `   ${theirs}..${local}  ${b} -> ${b}` : ` * [new branch]      ${b} -> ${b}`],
    `Uploaded ${plural(count, 'commit')} to origin and moved origin’s ${b} to ${local}; your origin/${b} moved with it.`,
  );
}

function fetchFrom(s: GitState) {
  const lines: string[] = [];
  const need = new Set<string>();
  for (const [b, id] of Object.entries(s.remote ?? {})) {
    const old = s.tracking[b];
    if (old === id) continue;
    lines.push(old ? `   ${old}..${id}  ${b} -> origin/${b}` : ` * [new branch]      ${b} -> origin/${b}`);
    for (const c of ancestors(s, id)) need.add(c);
  }
  const got = [...need].filter((id) => !s.commits[id]!.local).length;
  const state: GitState = {
    ...s,
    commits: mapCommits(s, (c) => (need.has(c.id) && !c.local ? { ...c, local: true } : c)),
    tracking: { ...s.remote },
  };
  return { state, lines: lines.length ? ['From origin', ...lines] : [], got };
}

function fetch(s: GitState): RunResult {
  if (!s.remote) return fail(s, NO_REMOTE);
  const f = fetchFrom(s);
  return done(
    f.state,
    f.lines,
    f.lines.length
      ? `Downloaded ${plural(f.got, 'new commit')} from origin and moved the remote-tracking branches; your own branches and files did not change.`
      : 'Asked origin for new commits; there were none, so nothing changed.',
  );
}

function pull(s: GitState): RunResult {
  if (!s.remote) return fail(s, NO_REMOTE);
  if (s.detached) return fail(s, 'fatal: you are not on a branch. Switch to a branch, then pull.');
  const f = fetchFrom(s);
  const up = f.state.tracking[s.head];
  if (!up) return fail(s, [`There is no tracking information for the branch ${s.head}.`, `Push it first with git push -u origin ${s.head}.`]);
  const m = mergeInto(f.state, up, `origin/${s.head}`);
  const output = [...f.lines, ...m.output];
  return m.ok ? done(m.state, output, `Fetched from origin, then merged origin/${s.head}: ${m.explain}`) : { ...m, output };
}

// ---- Simulator helpers (not Git) ----

function edit(s: GitState, [file, ...rest]: string[], touch: boolean): RunResult {
  const cmd = touch ? 'touch' : 'edit';
  if (!file || rest.length || !FILE.test(file)) return fail(s, `usage: ${cmd} <file>, for example ${cmd} app.js`, 'Nothing changed.');
  const was = s.work[file];
  if (touch && was !== undefined) return done(s, [], `${file} already exists; touch leaves its content alone, so Git sees no change.`);
  const v = (s.versions[file] ?? 0) + 1;
  return done(
    { ...s, work: put(s.work, file, v), versions: { ...s.versions, [file]: v } },
    [was === undefined ? `Created ${file} (v${v}).` : `Edited ${file}: v${was} -> v${v}.`],
    was === undefined
      ? `Created ${file} in the working directory only; Git does not track it until you git add it.`
      : !(file in s.index)
        ? `Changed ${file} in the working directory; it is still untracked, so Git ignores it until you git add it.`
        : `Changed ${file} in the working directory only; the staging area and commits keep v${s.index[file]} until you git add and git commit.`,
  );
}

function teammate(s: GitState, args: string[]): RunResult {
  if (args.join(' ') !== 'push') return fail(s, 'usage: teammate push', 'Nothing changed.');
  const tip = s.remote?.main;
  if (!s.remote || !tip) return fail(s, 'There is no remote with a main branch yet. Run git clone first.', 'Nothing changed.');
  const v = (s.versions['notes.md'] ?? 0) + 1;
  // A row of its own, so origin-only work never sits on top of your main line.
  const [n, c] = addCommit(
    { ...s, versions: { ...s.versions, 'notes.md': v } },
    'Update notes (teammate)',
    [tip],
    put(s.commits[tip]!.tree, 'notes.md', v),
    freeLane(s),
    { local: false, remote: true },
  );
  return done(
    { ...n, remote: { ...s.remote, main: c.id } },
    [`A teammate pushed ${c.id} "${c.message}" to origin's main.`],
    `Origin’s main moved to ${c.id}, but your repository does not know yet: origin/main only moves when you run git fetch or git pull.`,
  );
}

const HELP = [
  'Git: init, clone, status, log [--all], diff [--staged], add <file|.>,',
  '  commit -m "msg" [--amend], restore [--staged] <file>, reset [--soft|--mixed|--hard] <commit>,',
  '  revert <commit>, branch [-d] [name], switch [-c] <branch>, checkout [-b] <branch|commit>,',
  '  merge <branch>, rebase <branch>, stash [pop|list], fetch, pull, push',
  'Simulator: edit <file> changes a file, touch <file> creates one,',
  '  teammate push adds a commit to origin, clear empties this terminal',
];

const GIT: Record<string, (s: GitState, args: string[]) => RunResult> = {
  status,
  add,
  commit,
  log,
  diff,
  branch,
  switch: switchCmd,
  checkout,
  merge,
  rebase,
  reset,
  revert,
  restore,
  stash,
  push,
  fetch,
  pull,
};

function exec(s: GitState, [cmd, ...args]: string[]): RunResult {
  if (cmd === 'edit' || cmd === 'touch') return edit(s, args, cmd === 'touch');
  if (cmd === 'teammate') return teammate(s, args);
  if (cmd === 'help') return done(s, HELP, 'Listed the commands this simulator understands.');
  if (cmd !== 'git') return fail(s, [`${cmd}: command not found.`, 'Commands start with git, and edit <file> changes a file. Type help for the full list.'], 'Nothing changed.');
  const [sub, ...rest] = args;
  if (sub === 'init') return init(s);
  if (sub === 'clone') return clone(s);
  const handler = sub ? GIT[sub] : undefined;
  if (!handler) return fail(s, [sub ? `git: '${sub}' is not a command this simulator knows.` : 'usage: git <command>', 'Type help to see what it supports.'], 'Nothing changed.');
  if (!s.repo) return fail(s, ['fatal: not a git repository.', 'Run git init to start one here, or git clone to copy one.'], 'Nothing changed, because there is no repository yet.');
  return handler(s, rest);
}

/** Splits a command line into words, keeping "quoted strings" together. */
const tokenize = (line: string) => [...line.matchAll(/"([^"]*)"|'([^']*)'|(\S+)/g)].map((m) => m[1] ?? m[2] ?? m[3] ?? '');

/** Runs one command line and records it in the state's log. */
export function run(state: GitState, input: string): RunResult {
  const line = input.trim();
  if (!line) return { state, output: [], ok: true, explain: '' };
  if (line === 'clear') return { state: { ...state, log: [] }, output: [], ok: true, explain: 'Cleared the terminal.' };
  const r = exec(state, tokenize(line));
  const entry: LogEntry = { n: (state.log.at(-1)?.n ?? 0) + 1, input: line, output: r.output, ok: r.ok, explain: r.explain };
  return { ...r, state: { ...r.state, log: [...r.state.log, entry].slice(-LOG_LIMIT) } };
}
