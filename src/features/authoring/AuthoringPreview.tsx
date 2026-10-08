'use client';

import { useEffect, useState } from 'react';
import { PlayerProvider, usePlayer } from '@/features/player/PlayerProvider';
import { Stage } from '@/features/player/Stage';
import { CodePanel } from '@/features/player/CodePanel';
import type { LessonData } from '@/features/player/types';
import styles from './authoring.module.css';

export type AuthoringProblem = {
  id: string;
  slug: string;
  title: string;
  status: 'published' | 'draft';
  lesson: LessonData | null;
  error: string | null;
};

type Issue = { level: 'error' | 'warning'; where: string; message: string };

export function AuthoringPreview({
  problems,
  patterns,
  issues,
}: {
  problems: AuthoringProblem[];
  patterns: { id: string; name: string; status: string }[];
  issues: Issue[];
}) {
  const [selected, setSelected] = useState<string>(problems[0]?.id ?? '');

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('problem');
    if (p && problems.some((x) => x.id === p)) setSelected(p);
  }, [problems]);

  const choose = (id: string) => {
    setSelected(id);
    const url = new URL(window.location.href);
    url.searchParams.set('problem', id);
    window.history.replaceState(null, '', url);
  };

  const current = problems.find((p) => p.id === selected);

  return (
    <div className={styles.wrap}>
      <section className={styles.panel} aria-labelledby="issues-h">
        <h2 id="issues-h">Validation</h2>
        {issues.length === 0 ? (
          <p className={styles.ok}>No errors or warnings.</p>
        ) : (
          <ul className={styles.issues}>
            {issues.map((i, k) => (
              <li key={k} data-level={i.level}>
                <strong>{i.level}</strong> {i.where}: {i.message}
              </li>
            ))}
          </ul>
        )}
        <h3>Patterns</h3>
        <ul className={styles.records}>
          {patterns.map((p) => (
            <li key={p.id}>
              {p.name} <span data-status={p.status}>{p.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.panel} aria-labelledby="lessons-h">
        <h2 id="lessons-h">Lessons</h2>
        <div className={styles.picker} role="radiogroup" aria-label="Lesson to preview">
          {problems.map((p) => (
            <button key={p.id} type="button" role="radio" aria-checked={p.id === selected} onClick={() => choose(p.id)}>
              {p.title} <span data-status={p.status}>{p.status}</span>
            </button>
          ))}
        </div>
      </section>

      {current?.error && <p className={styles.error}>This lesson cannot be previewed: {current.error}</p>}
      {current?.lesson && (
        <PlayerProvider key={current.id} lesson={current.lesson}>
          <div className={styles.preview}>
            <div className={styles.public}>
              <p className={styles.label}>Public presentation</p>
              <Stage />
              <CodePanel />
            </div>
            <RawFrame />
          </div>
        </PlayerProvider>
      )}
    </div>
  );
}

function RawFrame() {
  const { state } = usePlayer();
  const frame = state.run.frames[state.cursor]!;
  const view = state.run.views[state.cursor]!;
  return (
    <div className={styles.raw}>
      <p className={styles.label}>
        Raw frame {frame.id} · {state.run.adapterId}@{state.run.adapterVersion} · example {state.run.exampleId}
      </p>
      <h3>event</h3>
      <pre>{JSON.stringify(frame.event, null, 2)}</pre>
      <h3>state</h3>
      <pre>{JSON.stringify(frame.state, null, 2)}</pre>
      <h3>counters{frame.checkpointId ? ` · checkpoint ${frame.checkpointId}` : ''}</h3>
      <pre>{JSON.stringify(frame.counters)}</pre>
      <h3>view summary</h3>
      <p>{view.summary}</p>
      <h3>output</h3>
      <pre>{state.run.outputText}</pre>
    </div>
  );
}
