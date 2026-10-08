import { describe, expect, it } from 'vitest';
import { fill, narrate, pickTemplate, placeholders } from '@/engine/narrate';
import { parseFields } from '@/features/player/fields';
import { ADAPTERS } from '@/engine/registry/all';

describe('narration', () => {
  const set = {
    'compare-sum:less': { label: 'Compare', story: '{sum} is low', formal: 'sum={sum}' },
    'compare-sum': { label: 'Compare', story: 'generic {sum}', formal: 'generic' },
  };

  it('prefers the variant template and falls back to the kind', () => {
    expect(pickTemplate(set, { kind: 'compare-sum', anchor: 'c', variant: 'less' })!.story).toBe('{sum} is low');
    expect(pickTemplate(set, { kind: 'compare-sum', anchor: 'c', variant: 'equal' })!.story).toBe('generic {sum}');
  });

  it('fills placeholders from the event and formats lists and nulls', () => {
    const ev = { kind: 'x', anchor: 'a', sum: 17, pair: [2, 3], none: null };
    expect(fill('{sum} {pair} {none}', ev)).toBe('17 [2, 3] none');
    expect(narrate(set, { kind: 'compare-sum', anchor: 'c', variant: 'less', sum: 3 } as never, 'formal').text).toBe('sum=3');
  });

  it('lists placeholder names for validation', () => {
    expect(placeholders('{a} and {bC1}')).toEqual(['a', 'bC1']);
  });
});

describe('custom input fields', () => {
  const fields = ADAPTERS['sorted-target-pair-v1'].inputFields;

  it('parses comma or space separated whole numbers', () => {
    expect(parseFields(fields, { prices: '2, 4 7,11', target: '18' })).toEqual({ value: { prices: [2, 4, 7, 11], target: 18 }, errors: [] });
  });

  it('names the field and the bad token', () => {
    const r = parseFields(fields, { prices: '2, x, 7', target: '1.5' });
    expect(r.errors.map((e) => e.field)).toEqual(['prices', 'target']);
    expect(r.errors[0]!.message).toMatch(/“x” is not a whole number/);
  });

  it('parses street lists for the graph lesson', () => {
    const bfs = ADAPTERS['bfs-shortest-path-v1'].inputFields;
    expect(parseFields(bfs, { edges: 'a-b, B - c', start: 'a', goal: 'c' }).value).toEqual({
      edges: [
        ['A', 'B'],
        ['B', 'C'],
      ],
      start: 'A',
      goal: 'C',
    });
    expect(parseFields(bfs, { edges: 'AB', start: 'A', goal: 'B' }).errors[0]!.message).toMatch(/like A-B/);
  });
});
