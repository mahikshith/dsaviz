'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { FieldError, InputField } from '@/engine/contracts/trace';
import { usePlayer } from './PlayerProvider';
import { parseFields } from './fields';
import styles from './player.module.css';

/** Bounded custom input. Errors name the field to fix; focus never jumps away from what you typed. */
export function InputPanel({ onClose }: { onClose: () => void }) {
  const { state, lesson, load, getAdapter, loading } = usePlayer();
  const approach = lesson.approaches.find((a) => a.id === state.run.approachId)!;
  const fields = lesson.inputFields[approach.adapterId] ?? [];
  const [values, setValues] = useState<Record<string, string> | null>(null);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const formId = useId();
  const firstRef = useRef<HTMLInputElement>(null);

  // Prefill with the input currently shown, using the adapter's own formatting.
  useEffect(() => {
    let live = true;
    void getAdapter(approach.id).then((a) => {
      if (live) setValues(a.toRaw(state.run.input));
    });
    return () => {
      live = false;
    };
    // Only when the panel opens or the approach changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approach.id]);

  useEffect(() => {
    if (values) firstRef.current?.focus();
    // Focus once, when the prefilled form first appears.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values === null]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values) return;
    const parsed = parseFields(fields, values);
    if (parsed.errors.length) return setErrors(parsed.errors);
    const result = await load({ approachId: approach.id, exampleId: 'custom', input: parsed.value });
    if (!result.ok) setErrors(result.errors);
    else {
      setErrors([]);
      onClose();
    }
  };

  const errorFor = (name: string) => errors.filter((er) => er.field === name);
  const general = errors.filter((er) => !fields.some((f) => f.name === er.field));
  const nodes = nodeOptions(fields, values);

  return (
    <form className={styles.inputPanel} onSubmit={submit} aria-labelledby={`${formId}-title`} noValidate>
      <p id={`${formId}-title`} className={styles.inputTitle}>
        Try your own input
      </p>
      {!values ? (
        <p className={styles.loading}>Preparing the form…</p>
      ) : (
        fields.map((f, i) => {
          const errs = errorFor(f.name);
          const id = `${formId}-${f.name}`;
          return (
            <div key={f.name} className={styles.field}>
              <label htmlFor={id}>{f.label}</label>
              {f.kind === 'node' && nodes.length > 0 ? (
                <select id={id} value={values[f.name] ?? ''} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} aria-describedby={`${id}-help`}>
                  {!nodes.includes(values[f.name] ?? '') && <option value={values[f.name]}>{values[f.name] || 'Choose'}</option>}
                  {nodes.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  ref={i === 0 ? firstRef : undefined}
                  value={values[f.name] ?? ''}
                  onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  aria-invalid={errs.length > 0 || undefined}
                  aria-describedby={`${id}-help${errs.length ? ` ${id}-err` : ''}`}
                  inputMode={f.kind === 'int' ? 'numeric' : undefined}
                  autoComplete="off"
                  spellCheck={false}
                />
              )}
              <p id={`${id}-help`} className={styles.help}>
                {f.help}
              </p>
              {errs.length > 0 && (
                <p id={`${id}-err`} className={styles.fieldError}>
                  {errs.map((er) => er.message).join(' ')}
                </p>
              )}
            </div>
          );
        })
      )}
      {general.length > 0 && (
        <p className={styles.fieldError} role="alert">
          {general.map((er) => er.message).join(' ')}
        </p>
      )}
      <div className={styles.inputActions}>
        <button type="submit" className="btn btn-primary btn-small" disabled={!values || loading}>
          Run walkthrough
        </button>
        <button type="button" className="btn btn-quiet btn-small" onClick={onClose}>
          Cancel
        </button>
      </div>
      <p className={styles.srAlert} role="status" aria-live="polite">
        {errors.length ? `${errors.length} problem${errors.length > 1 ? 's' : ''} with the input.` : ''}
      </p>
    </form>
  );
}

function nodeOptions(fields: readonly InputField[], values: Record<string, string> | null): string[] {
  const source = fields.find((f) => f.kind === 'node');
  if (!source || source.kind !== 'node' || !values) return [];
  const text = values[source.nodesFrom] ?? '';
  return [...new Set((text.toUpperCase().match(/[A-Z]/g) ?? []).sort())];
}
