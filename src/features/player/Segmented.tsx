'use client';

import { useId } from 'react';
import styles from './player.module.css';

type Option = { value: string; label: string };

/** A small single-choice control built from a radio group, so it works with arrow keys. */
export function Segmented({
  label,
  value,
  options,
  onChange,
  small = false,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  small?: boolean;
}) {
  const name = useId();
  return (
    <fieldset className={`${styles.segmented} ${small ? styles.segmentedSmall : ''}`}>
      <legend className="sr-only">{label}</legend>
      {options.map((o) => (
        <label key={o.value} className={styles.segment} data-checked={o.value === value || undefined}>
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={o.value === value}
            onChange={() => onChange(o.value)}
            className="sr-only"
          />
          {o.label}
        </label>
      ))}
    </fieldset>
  );
}
