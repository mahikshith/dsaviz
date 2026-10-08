'use client';

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { DocsLayout, Panel, SideNav } from '@/components/docs/DocsLayout';
import { COMMANDS, GROUPS } from './commands';
import { TOURS } from './tours';
import { headId, initialState, labelsByCommit, reachable, run, stages, type Commit, type FileChip, type GitState, type LogEntry } from './sim';
import styles from './git.module.css';

const NAV = GROUPS.map((g) => ({ title: g.title, items: g.commands.map((c) => ({ id: c.id, label: c.name })) }));

/** The Git page: command reference on the side, a live simulator in the main area. */
export function GitLab() {
  const [state, setState] = useState<GitState>(initialState);
  const [cmdId, setCmdId] = useState(COMMANDS[0]!.id);
  const [tourId, setTourId] = useState(TOURS[0]!.id);
  const [step, setStep] = useState(0);

  const exec = (input: string) => setState((s) => run(s, input).state);
  const cmd = COMMANDS.find((c) => c.id === cmdId) ?? COMMANDS[0]!;
  const tour = TOURS.find((t) => t.id === tourId) ?? TOURS[0]!;
  const current = tour.steps[step - 1];
  const next = tour.steps[step];

  const restart = (id = tourId) => {
    setTourId(id);
    setStep(0);
    setState(initialState());
  };
  const prev = () => {
    setState(tour.steps.slice(0, step - 1).reduce((s, st) => run(s, st.command).state, initialState()));
    setStep(step - 1);
  };
  const forward = () => {
    if (!next) return;
    exec(next.command);
    setStep(step + 1);
  };
  const pick = (id: string) => {
    setCmdId(id);
    document.getElementById('git-command')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  const cols = stages(state);
  const id = headId(state);
  const headNote = !state.repo
    ? 'No repository yet'
    : state.detached
      ? `HEAD detached at ${state.head}`
      : id
        ? `HEAD → ${state.head} at ${id}`
        : `HEAD → ${state.head}, no commits yet`;
  const top = state.stash[0];

  return (
    <DocsLayout
      title="Git"
      lede="Type real Git commands and watch what moves: from your files, to the staging area, to commits, branches and a remote. Nothing here touches a real repository."
      sideLabel="Git commands"
      side={<SideNav groups={NAV} current={cmdId} onSelect={pick} />}
    >
      <Panel>
        <div className={styles.tourBar}>
          <label className={styles.row}>
            <span className={styles.strong}>Guided tour</span>
            <select className={styles.select} value={tourId} onChange={(e) => restart(e.target.value)}>
              {TOURS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.row}>
            <span className={styles.stepCount}>{step ? `Step ${step} of ${tour.steps.length}` : `${tour.steps.length} steps`}</span>
            <button type="button" className="btn btn-small" onClick={prev} disabled={step === 0}>
              Prev
            </button>
            <button type="button" className="btn btn-small btn-primary" onClick={forward} disabled={!next}>
              Next
            </button>
          </div>
        </div>
        <p className={styles.say}>
          {current ? (
            <>
              <code className={styles.code}>{current.command}</code> {current.say}
            </>
          ) : (
            <>
              Press Next to run the first command, <code className={styles.code}>{next?.command}</code>, from an empty folder.
            </>
          )}
        </p>
      </Panel>

      <Panel title="Inside Git">
        <div className={styles.stagesBox}>
          <div className={styles.stages}>
            <Stage title="Working directory" note="Files on disk" files={cols.work} empty="No files yet. Try edit app.js." />
            <Flow forward="git add" back="git restore" />
            <Stage title="Staging area" note="Draft of the next commit" files={cols.index} empty="Empty" />
            <Flow forward="git commit" back="git restore --staged" />
            <Stage title="Repository (HEAD)" note={headNote} files={cols.head} empty={state.repo ? 'No commits yet' : 'Run git init or git clone'} />
          </div>
        </div>
        {top ? (
          <p className={styles.meta}>
            Stash: {state.stash.length === 1 ? '1 entry' : `${state.stash.length} entries`}, newest{' '}
            <code className={styles.code}>stash@{'{0}'}</code> {top.label}
          </p>
        ) : null}
        <h3 className={styles.subTitle}>Commit graph</h3>
        <Graph s={state} />
      </Panel>

      <Terminal log={state.log} onRun={exec} onReset={() => restart()} />

      <Panel id="git-command">
        <h2 className={styles.cmdName}>{cmd.name}</h2>
        <pre className="code-block">
          <code>{cmd.syntax}</code>
        </pre>
        <p className={styles.summary}>{cmd.summary}</p>
        <p className={styles.detail}>{cmd.detail}</p>
        <div className={styles.row}>
          <button type="button" className="btn btn-small btn-primary" aria-label={`Try it: run ${cmd.example}`} onClick={() => exec(cmd.example)}>
            Try it
          </button>
          <code className={styles.code}>{cmd.example}</code>
        </div>
      </Panel>
    </DocsLayout>
  );
}

function Stage({ title, note, files, empty }: { title: string; note: string; files: FileChip[]; empty: string }) {
  return (
    <section className={styles.stage} aria-label={title}>
      <div>
        <h3 className={styles.stageTitle}>{title}</h3>
        <p className={styles.stageNote}>{note}</p>
      </div>
      {files.length ? (
        <ul className={styles.chips}>
          {/* Keyed by version and status so a change replays the entrance animation. */}
          {files.map((f) => (
            <li key={`${f.name}:${f.version}:${f.status}`} className={styles.chip} data-status={f.status}>
              <span className={styles.chipName}>{f.name}</span>
              <span className={styles.chipVer}>v{f.version}</span>
              <span className={styles.chipStatus}>{f.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>{empty}</p>
      )}
    </section>
  );
}

function Flow({ forward, back }: { forward: string; back: string }) {
  return (
    <div className={styles.flow}>
      <p className={styles.arrow}>
        <span>{forward}</span>
        <span className={styles.glyph} aria-hidden="true">
          →
        </span>
        <span className="sr-only">copies to the next area</span>
      </p>
      <p className={styles.arrow}>
        <span className={styles.glyph} aria-hidden="true">
          ←
        </span>
        <span>{back}</span>
        <span className="sr-only">copies back from the next area</span>
      </p>
    </div>
  );
}

// ---- Commit graph ----

const STEP = 76;
const PAD = 52;
const TOP = 30;
const ROW = 50;
const TAG = 20;

/** Every edge has the same shape (line, curve, line) so CSS can animate `d` between layouts. */
function edgePath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const [x0, x1] = b.y > a.y ? [a.x, Math.min(b.x, a.x + STEP)] : [Math.max(a.x, b.x - STEP), b.x];
  const m = (x0 + x1) / 2;
  return `M${a.x} ${a.y} H${x0} C${m} ${a.y} ${m} ${b.y} ${x1} ${b.y} H${b.x}`;
}

function Graph({ s }: { s: GitState }) {
  const box = useRef<HTMLDivElement>(null);
  const commits = Object.values(s.commits).sort((a, b) => a.seq - b.seq);
  const head = headId(s);
  const headIndex = commits.findIndex((c) => c.id === head);
  // Keep HEAD in view when the graph is wider than its box (narrow screens, long histories).
  useEffect(() => {
    const el = box.current;
    if (el && headIndex >= 0) el.scrollLeft = PAD + headIndex * STEP - el.clientWidth / 2;
  }, [headIndex]);
  if (!commits.length) return <p className={styles.empty}>No commits yet. Stage a file and run git commit to make the first one.</p>;

  const labels = labelsByCommit(s);
  const live = reachable(s);
  // Commits nothing points at drop to a last row of their own, so they never sit on a live line.
  const rowOf = (c: Commit) => (live.has(c.id) ? c.lane : Infinity);
  const rows = [...new Set(commits.map(rowOf))].sort((a, b) => a - b);
  const rowY = new Map<number, number>();
  let y = TOP;
  for (const r of rows) {
    rowY.set(r, y);
    y += ROW + TAG * Math.max(0, ...commits.filter((c) => rowOf(c) === r).map((c) => labels[c.id]?.length ?? 0));
  }
  const height = y - ROW + 30;
  const width = PAD * 2 + (commits.length - 1) * STEP;
  const pos = new Map(commits.map((c, i) => [c.id, { x: PAD + i * STEP, y: rowY.get(rowOf(c))! }]));
  const tags = commits.flatMap((c) => {
    const p = pos.get(c.id)!;
    return (labels[c.id] ?? []).map((l, j) => ({ ...l, x: p.x, y: p.y + 16 + j * TAG }));
  });
  const remoteOnly = commits.some((c) => !c.local);
  const orphans = commits.some((c) => !live.has(c.id));
  const where = head ? (s.detached ? `HEAD is detached at ${head}` : `HEAD is on ${s.head} at ${head}`) : 'HEAD has no commit yet';
  const summary = `Commit graph, oldest on the left: ${commits.length} commits. ${where}. ${Object.entries(s.branches)
    .map(([b, c]) => `${b} at ${c}`)
    .join(', ')}.`;

  return (
    <>
      <div ref={box} className={styles.graphBox}>
        <svg className={styles.graph} width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={summary}>
          {commits.flatMap((c) =>
            c.parents.map((p) => {
              const a = pos.get(p);
              const b = pos.get(c.id);
              return a && b ? (
                <path
                  key={`${p}-${c.id}`}
                  className={styles.edge}
                  d={edgePath(a, b)}
                  data-remote-only={!c.local || undefined}
                  data-orphan={!live.has(c.id) || undefined}
                />
              ) : null;
            }),
          )}
          {commits.map((c) => {
            const p = pos.get(c.id)!;
            return (
              <g
                key={c.id}
                className={styles.node}
                style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
                data-head={c.id === head || undefined}
                data-remote-only={!c.local || undefined}
                data-orphan={!live.has(c.id) || undefined}
              >
                <title>{`${c.id} ${c.message}`}</title>
                <circle r={9} className={styles.dot} />
                <text y={-15} className={styles.cid}>
                  {c.id}
                </text>
              </g>
            );
          })}
          {/* Keyed by name, so a label slides when its branch moves. */}
          {tags.map((t) => {
            const w = t.name.length * 6.8 + 14;
            return (
              <g
                key={`${t.kind}:${t.name}`}
                className={styles.tag}
                data-kind={t.kind}
                data-current={(t.kind === 'branch' && !s.detached && t.name === s.head) || undefined}
                style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
              >
                <rect x={-w / 2} width={w} height={17} rx={4} className={styles.tagBox} />
                <text y={12.5} className={styles.tagText}>
                  {t.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <ul className={styles.legend}>
        <li>
          <span className={styles.key} data-kind="head" />
          HEAD commit
        </li>
        <li>
          <span className={styles.key} />
          Commit
        </li>
        {s.remote ? (
          <li>
            <span className={styles.keyTag}>origin/main</span>
            Last seen position of origin’s branch
          </li>
        ) : null}
        {remoteOnly ? (
          <li>
            <span className={styles.key} data-kind="remote" />
            On origin only, not fetched yet
          </li>
        ) : null}
        {orphans ? (
          <li>
            <span className={styles.key} data-kind="orphan" />
            Nothing points here any more
          </li>
        ) : null}
      </ul>
      {s.remote ? (
        <p className={styles.meta}>
          On origin:{' '}
          {Object.entries(s.remote).map(([b, c]) => (
            <span key={b}>
              <code className={styles.code}>
                {b} at {c}
              </code>
              {s.tracking[b] !== c ? ' (newer than your origin/' + b + ')' : ''}
            </span>
          ))}
        </p>
      ) : null}
    </>
  );
}

// ---- Terminal ----

function Terminal({ log, onRun, onReset }: { log: readonly LogEntry[]; onRun: (input: string) => void; onReset: () => void }) {
  const inputId = useId();
  const [draft, setDraft] = useState('');
  const recall = useRef<number | null>(null);
  const out = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = out.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onRun(draft);
    setDraft('');
    recall.current = null;
  };
  // Up and Down walk back through earlier commands, as in a real shell.
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    const pos = (recall.current ?? log.length) + (e.key === 'ArrowUp' ? -1 : 1);
    if (pos < 0) return;
    e.preventDefault();
    recall.current = pos >= log.length ? null : pos;
    setDraft(log[pos]?.input ?? '');
  };

  return (
    <Panel>
      <div className={styles.termHead}>
        <h2 className={styles.termTitle}>Terminal</h2>
        <button type="button" className="btn btn-small" onClick={onReset}>
          Reset
        </button>
      </div>
      <div className={styles.term}>
        <div ref={out} className={styles.out} role="log" aria-live="polite">
          {log.length ? (
            log.map((e) => (
              <div key={e.n} className={styles.entry} data-ok={e.ok}>
                <p className={styles.echo}>
                  <span className={styles.prompt} aria-hidden="true">
                    ${' '}
                  </span>
                  {e.input}
                </p>
                {e.output.map((line, i) => (
                  <p key={i} className={styles.line}>
                    {line || ' '}
                  </p>
                ))}
                {e.explain ? <p className={styles.explain}>{e.explain}</p> : null}
              </div>
            ))
          ) : (
            <p className={styles.hint}>
              Type a command and press Enter, or press Next in the tour. New here? Start with git init, then edit app.js. Type help for the full
              list.
            </p>
          )}
        </div>
        <form className={styles.inputRow} onSubmit={submit}>
          <label htmlFor={inputId} className="sr-only">
            Command
          </label>
          <span className={styles.prompt} aria-hidden="true">
            $
          </span>
          <input
            id={inputId}
            className={styles.input}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKey}
            placeholder="git status"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
          />
          <button type="submit" className="btn btn-small btn-primary">
            Run
          </button>
        </form>
      </div>
    </Panel>
  );
}
