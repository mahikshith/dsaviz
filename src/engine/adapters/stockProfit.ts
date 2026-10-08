/**
 * One pass with the cheapest price so far: the best sale on any day uses the
 * cheapest earlier day to buy. Story: a market stall diary of mango prices.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { ArrayCell, Band, CellState, Pointer } from '@/visuals/scenes/model';
import { readIntList, readObject, result } from './validate';

export type StockInput = { prices: number[] };

type State = { day: number | null; buy: number; best: number; bestPair: [number, number] | null; finished: boolean };

type Ev =
  | { kind: 'present'; anchor: 'signature'; n: number }
  | { kind: 'initialize'; anchor: 'initialize'; price: number }
  | { kind: 'cheaper'; anchor: 'cheaper'; day: number; price: number; from: number; oldPrice: number }
  | { kind: 'sell-check'; anchor: 'profit'; variant: 'record' | 'keep'; day: number; price: number; buyDay: number; buyPrice: number; profit: number; best: number }
  | { kind: 'done'; anchor: 'return'; variant: 'profit' | 'none'; best: number; buyDay: number; sellDay: number };

const LIMITS = { minItems: 1, maxItems: 12, min: 0, max: 99 };

export const adapter = defineAdapter<StockInput, State, Ev, number>({
  id: 'stock-profit-v1',
  version: '1.0.0',
  scene: 'array',
  events: {
    present: { anchor: 'signature', fields: ['n'] },
    initialize: { anchor: 'initialize', fields: ['price'] },
    cheaper: { anchor: 'cheaper', fields: ['day', 'price', 'from', 'oldPrice'] },
    'sell-check': { anchor: 'profit', fields: ['day', 'price', 'buyDay', 'buyPrice', 'profit', 'best'], variants: ['record', 'keep'] },
    done: { anchor: 'return', fields: ['best', 'buyDay', 'sellDay'], variants: ['profit', 'none'] },
  },
  inputFields: [{ name: 'prices', label: 'Prices, one per morning', kind: 'int-list', help: '1 to 12 whole numbers from 0 to 99.', ...LIMITS }],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const prices = readIntList(readObject(raw, errors).prices, 'prices', 'Prices', LIMITS, errors);
    return result(prices ? { prices } : null, errors);
  },

  trace({ prices }) {
    const t = createTracer<State, Ev>('stock-profit-v1', '1.0.0');
    const s: State = { day: null, buy: 0, best: 0, bestPair: null, finished: false };
    t.emit(s, { kind: 'present', anchor: 'signature', n: prices.length });
    t.emit(s, { kind: 'initialize', anchor: 'initialize', price: prices[0]! });
    for (let day = 1; day < prices.length; day++) {
      s.day = day;
      t.compare();
      if (prices[day]! < prices[s.buy]!) {
        const from = s.buy;
        s.buy = day;
        t.emit(s, { kind: 'cheaper', anchor: 'cheaper', day, price: prices[day]!, from, oldPrice: prices[from]! });
      } else {
        const profit = prices[day]! - prices[s.buy]!;
        const record = profit > s.best;
        if (record) {
          s.best = profit;
          s.bestPair = [s.buy, day];
        }
        t.emit(s, {
          kind: 'sell-check',
          anchor: 'profit',
          variant: record ? 'record' : 'keep',
          day,
          price: prices[day]!,
          buyDay: s.buy,
          buyPrice: prices[s.buy]!,
          profit,
          best: s.best,
        });
      }
    }
    s.day = null;
    s.finished = true;
    const [b, d] = s.bestPair ?? [0, 0];
    t.emit(s, { kind: 'done', anchor: 'return', variant: s.best > 0 ? 'profit' : 'none', best: s.best, buyDay: b, sellDay: d });
    return t.finish(s.best);
  },

  view(frame, { input }) {
    const { prices } = input;
    const st = frame.state;
    const started = frame.event.kind !== 'present';
    const cells: ArrayCell[] = prices.map((v, i) => {
      let state: CellState = 'idle';
      if (st.finished && st.bestPair && (i === st.bestPair[0] || i === st.bestPair[1])) state = 'success';
      else if (started && !st.finished && i === st.buy) state = 'primary';
      else if (i === st.day) state = 'comparison';
      else if (st.day !== null && i < st.day) state = 'muted';
      return { id: `c${i}`, label: String(v), sub: `day ${i}`, state, bar: v };
    });
    const pointers: Pointer[] = [];
    if (started && !st.finished) pointers.push({ id: 'buy', label: 'cheapest', index: st.buy, tone: 'primary', side: 'above' });
    if (st.day !== null) pointers.push({ id: 'day', label: 'today', index: st.day, tone: 'comparison', side: 'above' });
    const bands: Band[] = st.bestPair
      ? [{ id: 'best', from: st.bestPair[0], to: st.bestPair[1], label: `best profit ${st.best}`, tone: 'success', side: 'below' }]
      : [];
    return {
      scene: {
        arrays: [{ id: 'p', label: 'price each morning', cells, bars: { max: Math.max(1, ...prices) }, pointers, bands }],
        legend: [
          { label: 'Cheapest morning so far', swatch: 'primary' },
          { label: 'Today', swatch: 'comparison' },
          { label: 'Best buy and sell', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'day', value: st.day === null ? '—' : String(st.day) },
        { name: 'cheapest', value: started ? String(prices[st.buy]) : '—' },
        { name: 'best', value: String(st.best) },
      ],
      facts: [{ name: 'mornings', value: String(prices.length) }],
      summary: `Cheapest so far ${prices[st.buy]} on day ${st.buy}. Best profit ${st.best}.`,
    };
  },

  formatOutput: (o) => String(o),
  toRaw: (i) => ({ prices: (i as StockInput).prices.join(', ') }),
});
