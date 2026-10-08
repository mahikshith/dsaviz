'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { narrate } from '@/engine/narrate';
import { SceneView } from '@/visuals/scenes/SceneView';
import { useProgress } from '@/features/progress/ProgressProvider';
import { usePlayer } from './PlayerProvider';
import { Controls } from './Controls';
import { CheckpointCard } from './CheckpointCard';
import { InputPanel } from './InputPanel';
import { Segmented } from './Segmented';
import styles from './player.module.css';

type Props = {
  /** Compact stage for previews: no approach tabs, input editing or transcript. */
  compact?: boolean;
  headingLevel?: 'h2' | 'h3';
};

export function Stage({ compact = false, headingLevel = 'h2' }: Props) {
  const { state, dispatch, lesson, load, loading } = usePlayer();
  const progress = useProgress();
  const rootRef = useRef<HTMLElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [editing, setEditing] = useState(false);
  const titleId = useId();

  const { run, cursor } = state;
  const frame = run.frames[cursor]!;
  const view = run.views[cursor]!;
  const approach = lesson.approaches.find((a) => a.id === run.approachId)!;
  const set = lesson.narration[run.approachId] ?? {};
  const story = narrate(set, frame.event, state.mode);
  const total = run.frames.length;
  const atEnd = cursor === total - 1;
  const instant = Math.abs(cursor - state.previous) > 1;
  const checkpoint = frame.checkpointId ? lesson.checkpoints.find((c) => c.id === frame.checkpointId) : undefined;

  // Reaching the final frame counts as exploring the walkthrough. It is not evidence of solving the problem.
  useEffect(() => {
    if (atEnd && !compact) progress.mark(lesson.problemId, lesson.contentVersion, 'walkthroughExplored');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atEnd, compact, lesson.problemId, lesson.contentVersion]);

  // Previously answered checkpoints do not block again (review mode).
  useEffect(() => {
    for (const c of lesson.checkpoints) {
      if (progress.doc.checkpoints[`${lesson.problemId}/${c.id}`]) dispatch({ type: 'clear-checkpoint', id: c.id });
    }
  }, [progress.doc.checkpoints, lesson.checkpoints, lesson.problemId, dispatch]);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen?.();
  };

  // Keyboard shortcuts apply only while focus is inside the stage, never in form fields.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowRight') dispatch({ type: 'next' });
    else if (e.key === 'ArrowLeft') dispatch({ type: 'prev' });
    else if (e.key === 'Home') dispatch({ type: 'seek', index: 0 });
    else if (e.key === 'End') dispatch({ type: 'seek', index: total - 1 });
    else if (e.key === ' ' && target.tagName !== 'BUTTON') dispatch({ type: state.playing ? 'pause' : 'play' });
    else return;
    e.preventDefault();
  };

  const Heading = headingLevel;
  const exampleIndex = lesson.examples.findIndex((e) => e.id === run.exampleId);

  const facts = (
    <p className={styles.facts}>
      {view.facts.map((f) => (
        <span key={f.name}>
          {f.name} = <strong>{f.value}</strong>
        </span>
      ))}
    </p>
  );

  return (
    <section
      ref={rootRef}
      className={`${styles.stage} ${compact ? styles.compact : ''}`}
      aria-labelledby={titleId}
      onKeyDown={onKeyDown}
      data-fullscreen={fullscreen || undefined}
    >
      <div className={styles.stageHead}>
        <div className={styles.stageTitle}>
          <Heading id={titleId} className={compact ? styles.stageHeading : 'sr-only'}>
            {compact ? 'Live walkthrough' : 'Walkthrough'}
          </Heading>
          {lesson.approaches.length > 1 && !compact ? (
            <Segmented
              label="Approach"
              value={run.approachId}
              options={lesson.approaches.map((a) => ({ value: a.id, label: a.name }))}
              onChange={(id) => {
                const exampleId = run.exampleId === 'custom' ? lesson.examples[0]!.id : run.exampleId;
                void load({ approachId: id, exampleId, input: run.exampleId === 'custom' ? run.input : undefined });
              }}
            />
          ) : (
            <span className={styles.approachName}>{approach.name}</span>
          )}
        </div>
        <Segmented
          label="Explanation style"
          small
          value={state.mode}
          options={[
            { value: 'story', label: 'Story' },
            { value: 'formal', label: 'Formal' },
          ]}
          onChange={(mode) => dispatch({ type: 'mode', mode: mode as 'story' | 'formal' })}
        />
      </div>

      <div className={styles.goalRow}>
        <p className={styles.goal}>{lesson.goal}</p>
        {compact && facts}
      </div>

      {!compact && (
        <div className={styles.inputRow}>
          <label className={styles.exampleSelect}>
            <span>Example</span>
            <select
              value={run.exampleId}
              onChange={(e) => {
                if (e.target.value === 'custom') return setEditing(true);
                void load({ approachId: run.approachId, exampleId: e.target.value });
              }}
            >
              {lesson.examples.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.label}
                </option>
              ))}
              <option value="custom">{run.exampleId === 'custom' ? 'Your input' : 'Your own input…'}</option>
            </select>
          </label>
          <button type="button" className="btn btn-quiet btn-small" onClick={() => setEditing((v) => !v)} aria-expanded={editing}>
            {editing ? 'Close input editor' : 'Edit input'}
          </button>
          {loading && <span className={styles.loading}>Loading…</span>}
          {facts}
        </div>
      )}
      {editing && !compact && <InputPanel onClose={() => setEditing(false)} />}

      <div className={styles.sceneWrap} role="img" aria-label={`Step ${cursor + 1} of ${total}. ${view.summary}`}>
        <SceneView scene={view.scene} instant={instant} />
      </div>

      <div className={styles.explain} data-final={atEnd || undefined}>
        <span className={styles.opLabel}>{story.label}</span>
        <p key={`${cursor}-${state.mode}`} className={styles.narration}>
          {story.text}
        </p>
      </div>

      <dl className={styles.vars} aria-label="Variables at this step">
        {view.variables.map((v, i) => {
          const before = run.views[state.previous]?.variables[i]?.value;
          const changed = cursor !== state.previous && before !== undefined && before !== v.value;
          return (
            <div key={v.name} className={styles.var} data-changed={changed || undefined}>
              <dt>{v.name}</dt>
              <dd>
                {v.value}
                {changed && <span className="sr-only"> (changed)</span>}
              </dd>
            </div>
          );
        })}
      </dl>

      {checkpoint && !compact && <CheckpointCard checkpoint={checkpoint} gated={state.gate === checkpoint.id} />}

      <Controls fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen} compact={compact} />

      {atEnd && (
        <p className={styles.outcome}>
          Output: <code>{run.outputText}</code>
          {exampleIndex >= 0 && lesson.examples[exampleIndex] && (
            <span className={styles.outcomeNote}> {lesson.examples[exampleIndex]!.explanation}</span>
          )}
        </p>
      )}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {state.source === 'manual' ? `Step ${cursor + 1} of ${total}. ${story.label}. ${story.text}` : state.playing ? '' : `Paused at step ${cursor + 1} of ${total}.`}
      </p>

      {!compact && (
        <details className={styles.transcript}>
          <summary>Read every step as text</summary>
          <ol>
            {run.frames.map((f, i) => {
              const n = narrate(set, f.event, state.mode);
              return (
                <li key={f.id} aria-current={i === cursor ? 'step' : undefined}>
                  <button type="button" onClick={() => dispatch({ type: 'seek', index: i })}>
                    <strong>{n.label}.</strong> {n.text}
                  </button>
                </li>
              );
            })}
          </ol>
        </details>
      )}
    </section>
  );
}
