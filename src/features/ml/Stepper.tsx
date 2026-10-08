'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ml.module.css';

/**
 * Play / pause / step through `total` frames. Frame 0 is the starting state.
 * Autoplay stops at the last frame and never starts by itself.
 */
export function useStepper(total: number, msPerStep = 600) {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = Math.max(0, total - 1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setFrame((f) => {
        if (f >= last) {
          setPlaying(false);
          return f;
        }
        return f + 1;
      });
    }, msPerStep);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, last, msPerStep]);

  // Keep the frame in range when the number of frames changes (new data or settings).
  useEffect(() => {
    setFrame((f) => Math.min(f, last));
  }, [last]);

  const reset = useCallback(() => {
    setPlaying(false);
    setFrame(0);
  }, []);

  return {
    frame,
    total,
    playing,
    atEnd: frame >= last,
    setFrame: (f: number) => setFrame(Math.max(0, Math.min(last, f))),
    next: () => setFrame((f) => Math.min(last, f + 1)),
    prev: () => setFrame((f) => Math.max(0, f - 1)),
    toggle: () => {
      if (frame >= last) setFrame(0);
      setPlaying((p) => !p);
    },
    reset,
  };
}

export type Stepper = ReturnType<typeof useStepper>;

/** Reset, previous, play/pause, next, a scrubber and a frame label. */
export function StepperControls({ stepper, label = 'Step' }: { stepper: Stepper; label?: string }) {
  const { frame, total, playing } = stepper;
  return (
    <div className={styles.controls}>
      <button type="button" className="btn btn-small" onClick={stepper.reset} aria-label="Reset">
        ↺
      </button>
      <button type="button" className="btn btn-small" onClick={stepper.prev} disabled={frame === 0} aria-label="Previous step">
        ‹
      </button>
      <button type="button" className="btn btn-primary btn-small" onClick={stepper.toggle}>
        {playing ? 'Pause' : stepper.atEnd ? 'Replay' : 'Play'}
      </button>
      <button type="button" className="btn btn-small" onClick={stepper.next} disabled={stepper.atEnd} aria-label="Next step">
        ›
      </button>
      <input
        type="range"
        min={0}
        max={Math.max(0, total - 1)}
        value={frame}
        onChange={(e) => stepper.setFrame(Number(e.target.value))}
        aria-label={label}
        className={styles.scrub}
      />
      <span className={styles.count}>
        {label} {frame} of {Math.max(0, total - 1)}
      </span>
    </div>
  );
}

/** A labelled slider for a numeric setting (learning rate, k, depth...). */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (v: number) => String(v),
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <label className={styles.slider}>
      <span>
        {label} <strong>{format(value)}</strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

/** A short live readout under a plot: "epoch 12 · loss 0.84". */
export function Readout({ items }: { items: [string, string | number][] }) {
  return (
    <dl className={styles.readout} aria-live="polite">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
