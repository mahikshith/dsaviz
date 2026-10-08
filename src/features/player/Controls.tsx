'use client';

import { useId } from 'react';
import { usePlayer } from './PlayerProvider';
import type { Speed } from './reducer';
import { CollapseIcon, ExpandIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, RestartIcon } from './icons';
import styles from './player.module.css';

export function Controls({ fullscreen, onToggleFullscreen, compact }: { fullscreen: boolean; onToggleFullscreen: () => void; compact: boolean }) {
  const { state, dispatch } = usePlayer();
  const seekId = useId();
  const total = state.run.frames.length;
  const atEnd = state.cursor === total - 1;

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <button type="button" className={styles.iconBtn} onClick={() => dispatch({ type: 'restart' })} aria-label="Restart" title="Restart" disabled={state.cursor === 0}>
          <RestartIcon />
        </button>
        <button type="button" className={styles.iconBtn} onClick={() => dispatch({ type: 'prev' })} aria-label="Previous step" title="Previous step (←)" disabled={state.cursor === 0}>
          <PrevIcon />
        </button>
        <button
          type="button"
          className={styles.playBtn}
          onClick={() => dispatch({ type: state.playing ? 'pause' : 'play' })}
          disabled={atEnd}
          aria-label={state.playing ? 'Pause' : 'Play'}
        >
          {state.playing ? <PauseIcon /> : <PlayIcon />}
          <span>{state.playing ? 'Pause' : 'Play'}</span>
        </button>
        <button type="button" className={styles.iconBtn} onClick={() => dispatch({ type: 'next' })} aria-label="Next step" title="Next step (→)" disabled={atEnd}>
          <NextIcon />
        </button>
        <span className={styles.count} aria-hidden>
          Step {state.cursor + 1} of {total}
        </span>
        {!compact && (
          <>
            <label className={styles.speed}>
              <span className="sr-only">Playback speed</span>
              <select value={state.speed} onChange={(e) => dispatch({ type: 'speed', speed: e.target.value as Speed })}>
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
            </label>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={onToggleFullscreen}
              aria-label={fullscreen ? 'Exit full screen' : 'Full screen'}
              title={fullscreen ? 'Exit full screen' : 'Full screen'}
            >
              {fullscreen ? <CollapseIcon /> : <ExpandIcon />}
            </button>
          </>
        )}
      </div>
      <div className={styles.seek}>
        <label htmlFor={seekId} className="sr-only">
          Step
        </label>
        <input
          id={seekId}
          type="range"
          min={0}
          max={total - 1}
          step={1}
          value={state.cursor}
          aria-valuetext={`Step ${state.cursor + 1} of ${total}`}
          onChange={(e) => dispatch({ type: 'seek', index: Number(e.target.value) })}
        />
      </div>
    </div>
  );
}
