'use client';

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { PlayerProvider, usePlayer } from '@/features/player/PlayerProvider';
import { Stage } from '@/features/player/Stage';
import { CodePanel } from '@/features/player/CodePanel';
import type { LessonData } from '@/features/player/types';
import { useProgress } from '@/features/progress/ProgressProvider';
import { InnerTabs, type InnerTab } from '@/components/ui/InnerTabs';
import { Ladder, type LadderRungView } from '@/components/ui/Ladder';
import type { Language } from '@/lib/content/schema';
import { GlossaryLayer } from './GlossaryLayer';
import { LessonRail, type RelatedGroup } from './LessonRail';
import { PracticeEditor, PracticeChecklist, type Sample } from './Practice';
import { StaticCodePanel, type SolutionCode } from './StaticCodePanel';
import styles from './lesson.module.css';

export type Mode = 'understand' | 'visualize' | 'practice';

export type WorkspaceProps = {
  problemId: string;
  contentVersion: number;
  /** Null for a reading lesson, which has no walkthrough yet. */
  lesson: LessonData | null;
  brief: InnerTab[];
  ladder: LadderRungView[];
  why: ReactNode;
  complexity: ReactNode;
  edgeCases: ReactNode;
  transfer: { problem: string; answer: string; answerHref: string; explanation: string };
  statement: ReactNode;
  samples: Sample[];
  selfCheck: string[];
  starter: Partial<Record<Language, string>>;
  solutions: SolutionCode[];
  practiceLink?: { label: string; url: string };
  related: RelatedGroup[];
  glossary: { id: string; term: string; definition: string }[];
};

export function Workspace(props: WorkspaceProps) {
  if (!props.lesson) return <WorkspaceInner {...props} walkthrough={false} />;
  return (
    <PlayerProvider lesson={props.lesson}>
      <WorkspaceInner {...props} walkthrough />
    </PlayerProvider>
  );
}

function WorkspaceInner(props: WorkspaceProps & { walkthrough: boolean }) {
  const { walkthrough, problemId, contentVersion } = props;
  const modes: { id: Mode; label: string }[] = [
    { id: 'understand', label: 'Understand' },
    { id: 'visualize', label: walkthrough ? 'Visualize' : 'Solution' },
    { id: 'practice', label: 'Practice' },
  ];
  const [mode, setModeState] = useState<Mode>('understand');
  const progress = useProgress();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get('mode');
    if (m === 'visualize' || m === 'solution' || m === 'practice') setModeState(m === 'solution' ? 'visualize' : m);
    progress.view(problemId, contentVersion);
    // Run once on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMode = useCallback(
    (m: Mode, focusPanel = false) => {
      setModeState(m);
      const url = new URL(window.location.href);
      if (m === 'understand') url.searchParams.delete('mode');
      else url.searchParams.set('mode', m === 'visualize' && !walkthrough ? 'solution' : m);
      window.history.replaceState(window.history.state, '', url);
      if (focusPanel) {
        requestAnimationFrame(() => {
          const panel = document.getElementById(`${baseId}-panel`);
          panel?.focus({ preventScroll: true });
          panel?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        });
      }
    },
    [baseId, walkthrough],
  );

  // Reading lessons: opening the solution counts as studying it.
  useEffect(() => {
    if (!walkthrough && mode === 'visualize') progress.mark(problemId, contentVersion, 'solutionStudied');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, walkthrough, problemId]);

  // Reaching the end of the brief and the ladder counts as reading the story.
  useEffect(() => {
    if (mode !== 'understand' || !endRef.current) return;
    const el = endRef.current;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        progress.mark(problemId, contentVersion, 'storyRead');
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, problemId]);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const n = modes.length;
    const next = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i + n - 1) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setMode(modes[next]!.id);
    tabRefs.current[next]?.focus();
  };

  const rail = (
    <LessonRail mode={mode} onMode={(m) => setMode(m, true)} problemId={problemId} groups={props.related} walkthrough={walkthrough} />
  );

  const ladderCard = (
    <section className={styles.paper} aria-labelledby={`${baseId}-ladder`}>
      <h2 id={`${baseId}-ladder`} className={styles.cardTitle}>
        From brute force to optimal
      </h2>
      {walkthrough ? (
        <PlayerLadder rungs={props.ladder} onShow={() => setMode('visualize', true)} />
      ) : (
        <Ladder rungs={props.ladder} />
      )}
    </section>
  );

  const next = (
    <div ref={endRef} className={styles.nextStep}>
      <p>{walkthrough ? 'See the idea work, one decision at a time.' : 'Read the reference solution, then write your own.'}</p>
      <button type="button" className="btn btn-primary" onClick={() => setMode('visualize', true)}>
        {walkthrough ? 'Step through the walkthrough' : 'Open the solution'}
      </button>
    </div>
  );

  return (
    <div className={styles.workspace} data-mode={mode} data-walkthrough={walkthrough || undefined}>
      <div className={styles.modeBar}>
        <div role="tablist" aria-label="Lesson mode" className={styles.tabs}>
          {modes.map((m, i) => (
            <button
              key={m.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${m.id}`}
              aria-selected={mode === m.id}
              aria-controls={`${baseId}-panel`}
              tabIndex={mode === m.id ? 0 : -1}
              className={styles.tab}
              onClick={() => setMode(m.id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              <span className={styles.tabNum} aria-hidden>
                {i + 1}
              </span>
              {m.label}
            </button>
          ))}
        </div>
        <details className={styles.railDrawer}>
          <summary>Lesson outline</summary>
          {rail}
        </details>
      </div>

      <div className={styles.grid}>
        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${mode}`} tabIndex={-1} className={styles.reading}>
          {mode === 'understand' && (
            <>
              <section className={styles.paper} aria-label="The problem">
                <InnerTabs label="About this problem" tabs={props.brief} />
              </section>
              {walkthrough && ladderCard}
              {walkthrough && next}
            </>
          )}

          {mode === 'visualize' && (
            <>
              {walkthrough ? (
                <>
                  <section className={styles.paper} aria-label="Approaches">
                    <PlayerLadder rungs={props.ladder} followPlayer />
                  </section>
                  <CodePanel />
                </>
              ) : null}
              <div className={styles.paper}>
                {props.why}
                {props.complexity}
              </div>
              <details className={styles.fold}>
                <summary>Edge cases</summary>
                {props.edgeCases}
              </details>
              <Transfer {...props.transfer} />
              <div className={styles.nextStep}>
                <p>Now write it yourself.</p>
                <button type="button" className="btn btn-primary" onClick={() => setMode('practice', true)}>
                  Go to practice
                </button>
              </div>
            </>
          )}

          {mode === 'practice' && (
            <PracticeChecklist
              statement={props.statement}
              samples={props.samples}
              selfCheck={props.selfCheck}
              problemId={problemId}
              contentVersion={contentVersion}
              practiceLink={props.practiceLink}
            />
          )}
        </div>

        <div className={styles.stageCol}>
          {mode === 'practice' ? (
            <PracticeEditor problemId={problemId} starter={props.starter} />
          ) : walkthrough ? (
            <Stage />
          ) : mode === 'visualize' ? (
            <StaticCodePanel solutions={props.solutions} />
          ) : (
            <div className={styles.readingSide}>
              {ladderCard}
              {next}
            </div>
          )}
        </div>
      </div>
      <GlossaryLayer entries={props.glossary} />
    </div>
  );
}

/** The ladder wired to the player: rungs with a walkthrough load it. */
function PlayerLadder({ rungs, onShow, followPlayer = false }: { rungs: LadderRungView[]; onShow?: () => void; followPlayer?: boolean }) {
  const { state, lesson, load } = usePlayer();
  const current = rungs.find((r) => r.approachId === state.run.approachId)?.id;
  const watch = (approachId: string) => {
    if (approachId !== state.run.approachId) {
      const exampleId = state.run.exampleId === 'custom' ? lesson.examples[0]!.id : state.run.exampleId;
      void load({ approachId, exampleId });
    }
    onShow?.();
  };
  return (
    <Ladder
      key={followPlayer ? current : 'fixed'}
      rungs={rungs}
      initial={followPlayer ? current : undefined}
      onWatch={watch}
      watchLabel={followPlayer ? 'Show this approach' : 'Watch this approach'}
    />
  );
}

function Transfer({ problem, answer, answerHref, explanation }: WorkspaceProps['transfer']) {
  return (
    <details className={styles.fold}>
      <summary>Transfer: which pattern fits this one?</summary>
      <p className={styles.transferProblem}>{problem}</p>
      <details className={styles.reveal}>
        <summary>Reveal the pattern</summary>
        <p>
          <a href={answerHref}>{answer}</a>. {explanation}
        </p>
      </details>
    </details>
  );
}
