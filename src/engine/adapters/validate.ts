import type { FieldError } from '@/engine/contracts/trace';

/** Small, explicit validators. Each returns a value or pushes an actionable error for one field. */

export function readObject(raw: unknown, errors: FieldError[]): Record<string, unknown> {
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw as Record<string, unknown>;
  errors.push({ field: 'input', message: 'The input must be an object with named fields.' });
  return {};
}

export function readIntList(
  value: unknown,
  field: string,
  label: string,
  opts: { minItems: number; maxItems: number; min: number; max: number },
  errors: FieldError[],
): number[] | null {
  if (!Array.isArray(value)) {
    errors.push({ field, message: `${label} must be a list of whole numbers.` });
    return null;
  }
  if (value.length < opts.minItems || value.length > opts.maxItems) {
    const range = opts.minItems === opts.maxItems ? `${opts.minItems}` : `${opts.minItems} to ${opts.maxItems}`;
    errors.push({ field, message: `${label} needs ${range} values; this has ${value.length}.` });
    return null;
  }
  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (typeof v !== 'number' || !Number.isInteger(v)) {
      errors.push({ field, message: `${label}: position ${i} is not a whole number.` });
      return null;
    }
    if (v < opts.min || v > opts.max) {
      errors.push({ field, message: `${label}: position ${i} is ${v}; use values from ${opts.min} to ${opts.max}.` });
      return null;
    }
  }
  return value.slice() as number[];
}

export function readInt(
  value: unknown,
  field: string,
  label: string,
  opts: { min: number; max: number },
  errors: FieldError[],
): number | null {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    errors.push({ field, message: `${label} must be a whole number.` });
    return null;
  }
  if (value < opts.min || value > opts.max) {
    errors.push({ field, message: `${label} is ${value}; use a value from ${opts.min} to ${opts.max}.` });
    return null;
  }
  return value;
}

export function readText(
  value: unknown,
  field: string,
  label: string,
  opts: { maxLength: number; allowed?: RegExp; allowedText?: string },
  errors: FieldError[],
): string | null {
  if (typeof value !== 'string') {
    errors.push({ field, message: `${label} must be text.` });
    return null;
  }
  if (value.length > opts.maxLength) {
    errors.push({ field, message: `${label} can be at most ${opts.maxLength} characters; this has ${value.length}.` });
    return null;
  }
  if (opts.allowed) {
    for (let i = 0; i < value.length; i++) {
      const ch = value[i]!;
      if (!opts.allowed.test(ch)) {
        const shown = ch === ' ' ? 'a space' : `“${ch}”`;
        errors.push({ field, message: `${label}: position ${i} is ${shown}. ${opts.allowedText ?? ''}`.trim() });
        return null;
      }
    }
  }
  return value;
}

export function result<I>(value: I | null, errors: FieldError[]) {
  return errors.length || value === null
    ? ({ ok: false as const, errors: errors.length ? errors : [{ field: 'input', message: 'The input is not valid.' }] })
    : ({ ok: true as const, value });
}
