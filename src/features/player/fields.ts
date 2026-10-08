/**
 * Turns custom-input form strings into typed values, field by field, with
 * messages that say exactly what to fix. Semantic checks happen afterwards in
 * the adapter's parseInput.
 */
import type { FieldError, InputField } from '@/engine/contracts/trace';

export function parseFields(fields: readonly InputField[], raw: Record<string, string>) {
  const errors: FieldError[] = [];
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const text = raw[f.name] ?? '';
    switch (f.kind) {
      case 'int-list': {
        const parts = text.split(/[\s,]+/).filter(Boolean);
        const bad = parts.find((p) => !/^-?\d+$/.test(p));
        if (bad !== undefined) errors.push({ field: f.name, message: `${f.label}: “${bad}” is not a whole number. ${f.help}` });
        else out[f.name] = parts.map(Number);
        break;
      }
      case 'int': {
        const t = text.trim();
        if (!/^-?\d+$/.test(t)) errors.push({ field: f.name, message: `${f.label} must be a whole number. ${f.help}` });
        else out[f.name] = Number(t);
        break;
      }
      case 'text':
        out[f.name] = text;
        break;
      case 'edge-list': {
        // "B - C" and "B-C" mean the same street.
        const parts = text
          .replace(/\s*-\s*/g, '-')
          .split(/[\s,]+/)
          .filter(Boolean);
        const edges: [string, string][] = [];
        for (const p of parts) {
          const m = /^([A-Za-z])\s*-\s*([A-Za-z])$/.exec(p);
          if (!m) {
            errors.push({ field: f.name, message: `${f.label}: “${p}” should be two corner letters joined by a dash, like A-B.` });
            break;
          }
          edges.push([m[1]!.toUpperCase(), m[2]!.toUpperCase()]);
        }
        out[f.name] = edges;
        break;
      }
      case 'node':
        out[f.name] = text.trim().toUpperCase();
        break;
    }
  }
  return { value: out, errors };
}
