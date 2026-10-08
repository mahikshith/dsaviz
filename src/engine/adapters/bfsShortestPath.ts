/**
 * Breadth-first search for the fewest edges between two nodes of an
 * undirected, unweighted graph. Story: the fewest streets across a neighborhood.
 * The distance is final the moment a node is discovered, because BFS discovers
 * nodes in nondecreasing order of distance. This holds only for unweighted (or
 * equal-weight) edges.
 */
import { defineAdapter, type FieldError } from '@/engine/contracts/trace';
import { createTracer } from '@/engine/contracts/tracer';
import type { GraphEdge, GraphNode, GraphNodeState } from '@/visuals/scenes/model';
import { readObject, result } from './validate';

export type BfsInput = { edges: [string, string][]; start: string; goal: string };
export type BfsOutput = { distance: number; path: string[] } | null;
export type BfsDisplay = { positions?: Record<string, [number, number]>; captions?: Record<string, string> };

const MAX_NODES = 10;
const MAX_EDGES = 16;

type State = {
  nodes: string[];
  dist: Record<string, number | null>;
  parent: Record<string, string | null>;
  queue: string[];
  current: string | null;
  checking: [string, string] | null;
  path: string[] | null;
  finished: boolean;
};

type Ev =
  | { kind: 'present'; anchor: 'signature'; start: string; goal: string; nodeCount: number; edgeCount: number }
  | { kind: 'same-node'; anchor: 'return-same'; start: string }
  | { kind: 'initialize'; anchor: 'initialize'; start: string }
  | { kind: 'dequeue'; anchor: 'dequeue'; node: string; distance: number; waiting: number }
  | { kind: 'skip-seen'; anchor: 'skip-seen'; from: string; to: string; known: number }
  | { kind: 'discover'; anchor: 'discover'; from: string; to: string; distance: number }
  | { kind: 'reach-goal'; anchor: 'reach-goal'; from: string; to: string; distance: number }
  | { kind: 'found'; anchor: 'return-found'; goal: string; distance: number; route: string }
  | { kind: 'not-found'; anchor: 'return-none'; goal: string; reached: number };

export function nodesOf(edges: readonly (readonly [string, string])[]): string[] {
  const seen: string[] = [];
  for (const [a, b] of edges) {
    if (!seen.includes(a)) seen.push(a);
    if (!seen.includes(b)) seen.push(b);
  }
  return seen;
}

export const adapter = defineAdapter<BfsInput, State, Ev, BfsOutput>({
  id: 'bfs-shortest-path-v1',
  version: '1.0.0',
  scene: 'graph',
  events: {
    present: { anchor: 'signature', fields: ['start', 'goal', 'nodeCount', 'edgeCount'] },
    'same-node': { anchor: 'return-same', fields: ['start'] },
    initialize: { anchor: 'initialize', fields: ['start'] },
    dequeue: { anchor: 'dequeue', fields: ['node', 'distance', 'waiting'] },
    'skip-seen': { anchor: 'skip-seen', fields: ['from', 'to', 'known'] },
    discover: { anchor: 'discover', fields: ['from', 'to', 'distance'] },
    'reach-goal': { anchor: 'reach-goal', fields: ['from', 'to', 'distance'] },
    found: { anchor: 'return-found', fields: ['goal', 'distance', 'route'] },
    'not-found': { anchor: 'return-none', fields: ['goal', 'reached'] },
  },
  inputFields: [
    {
      name: 'edges',
      label: 'Streets',
      kind: 'edge-list',
      help: `Up to ${MAX_EDGES} streets, each two corner letters joined by a dash, separated by commas. Example: A-B, B-C`,
      maxEdges: MAX_EDGES,
    },
    { name: 'start', label: 'Start corner', kind: 'node', help: 'A corner letter that appears in the streets.', nodesFrom: 'edges' },
    { name: 'goal', label: 'Goal corner', kind: 'node', help: 'A corner letter that appears in the streets.', nodesFrom: 'edges' },
  ],

  parseInput(raw) {
    const errors: FieldError[] = [];
    const obj = readObject(raw, errors);
    let edges: [string, string][] | null = null;
    if (!Array.isArray(obj.edges)) {
      errors.push({ field: 'edges', message: 'Streets must be a list of corner pairs.' });
    } else if (obj.edges.length === 0 || obj.edges.length > MAX_EDGES) {
      errors.push({ field: 'edges', message: `Use 1 to ${MAX_EDGES} streets; this has ${obj.edges.length}.` });
    } else {
      edges = [];
      for (let i = 0; i < obj.edges.length; i++) {
        const e = obj.edges[i];
        if (!Array.isArray(e) || e.length !== 2 || !e.every((x) => typeof x === 'string' && /^[A-Z]$/.test(x))) {
          errors.push({ field: 'edges', message: `Street ${i + 1} must be two capital letters, like A-B.` });
          edges = null;
          break;
        }
        if (e[0] === e[1]) {
          errors.push({ field: 'edges', message: `Street ${i + 1} (${e[0]}-${e[1]}) connects a corner to itself. Each street joins two different corners.` });
          edges = null;
          break;
        }
        edges.push([e[0] as string, e[1] as string]);
      }
    }
    const nodes = edges ? nodesOf(edges) : [];
    if (edges && nodes.length > MAX_NODES) {
      errors.push({ field: 'edges', message: `Use at most ${MAX_NODES} different corners; this has ${nodes.length}.` });
    }
    const readNode = (v: unknown, field: string, label: string) => {
      if (typeof v !== 'string' || !/^[A-Z]$/.test(v)) {
        errors.push({ field, message: `${label} must be one capital letter.` });
        return null;
      }
      if (edges && !nodes.includes(v)) {
        errors.push({ field, message: `${label} ${v} is not on any street. Choose one of ${nodes.join(', ')}.` });
        return null;
      }
      return v;
    };
    const start = readNode(obj.start, 'start', 'Start corner');
    const goal = readNode(obj.goal, 'goal', 'Goal corner');
    return result(edges && start && goal ? { edges, start, goal } : null, errors);
  },

  trace({ edges, start, goal }) {
    const t = createTracer<State, Ev>('bfs-shortest-path-v1', '1.0.0');
    const nodes = nodesOf(edges);
    const neighbors: Record<string, string[]> = Object.fromEntries(nodes.map((v) => [v, [] as string[]]));
    for (const [a, b] of edges) {
      neighbors[a]!.push(b);
      neighbors[b]!.push(a);
    }
    const s: State = {
      nodes,
      dist: Object.fromEntries(nodes.map((v) => [v, null])),
      parent: Object.fromEntries(nodes.map((v) => [v, null])),
      queue: [],
      current: null,
      checking: null,
      path: null,
      finished: false,
    };
    t.emit(s, { kind: 'present', anchor: 'signature', start, goal, nodeCount: nodes.length, edgeCount: edges.length });
    if (start === goal) {
      s.dist = { ...s.dist, [start]: 0 };
      s.path = [start];
      s.finished = true;
      t.emit(s, { kind: 'same-node', anchor: 'return-same', start });
      return t.finish<BfsOutput>({ distance: 0, path: [start] });
    }
    s.dist = { ...s.dist, [start]: 0 };
    s.queue = [start];
    t.write();
    t.emit(s, { kind: 'initialize', anchor: 'initialize', start });

    while (s.queue.length) {
      const [corner, ...rest] = s.queue;
      s.queue = rest;
      s.current = corner!;
      s.checking = null;
      const d = s.dist[corner!]!;
      t.emit(s, { kind: 'dequeue', anchor: 'dequeue', node: corner!, distance: d, waiting: rest.length });
      for (const next of neighbors[corner!]!) {
        t.compare();
        s.checking = [corner!, next];
        const known = s.dist[next];
        if (known !== null && known !== undefined) {
          t.emit(s, { kind: 'skip-seen', anchor: 'skip-seen', from: corner!, to: next, known });
          continue;
        }
        s.dist = { ...s.dist, [next]: d + 1 };
        s.parent = { ...s.parent, [next]: corner! };
        t.write();
        if (next === goal) {
          t.emit(s, { kind: 'reach-goal', anchor: 'reach-goal', from: corner!, to: next, distance: d + 1 });
          const path: string[] = [];
          for (let v: string | null = goal; v !== null; v = s.parent[v] ?? null) path.unshift(v);
          s.path = path;
          s.checking = null;
          s.finished = true;
          t.emit(s, { kind: 'found', anchor: 'return-found', goal, distance: d + 1, route: path.join(' → ') });
          return t.finish<BfsOutput>({ distance: d + 1, path });
        }
        s.queue = [...s.queue, next];
        t.emit(s, { kind: 'discover', anchor: 'discover', from: corner!, to: next, distance: d + 1 });
      }
    }
    s.current = null;
    s.checking = null;
    s.finished = true;
    const reached = Object.values(s.dist).filter((v) => v !== null).length;
    t.emit(s, { kind: 'not-found', anchor: 'return-none', goal, reached });
    return t.finish<BfsOutput>(null);
  },

  view(frame, { input, frames, display }) {
    const st = frame.state;
    const { edges, start, goal } = input;
    const layout = graphLayout(st.nodes, display as BfsDisplay | undefined);
    const inQueue = new Set(st.queue);
    const onPath = new Set(st.path ?? []);
    const nodes: GraphNode[] = st.nodes.map((id) => {
      let state: GraphNodeState = 'idle';
      if (onPath.has(id)) state = 'success';
      else if (id === st.current) state = 'current';
      else if (inQueue.has(id)) state = 'queued';
      else if (st.dist[id] !== null) state = 'visited';
      const d = st.dist[id];
      const p = layout.positions[id]!;
      return {
        id,
        label: id,
        caption: layout.captions[id],
        x: p[0],
        y: p[1],
        state,
        badge: d === null || d === undefined ? undefined : String(d),
        goal: id === goal,
      };
    });
    const pathEdges = new Set<string>();
    if (st.path) for (let i = 1; i < st.path.length; i++) pathEdges.add(key(st.path[i - 1]!, st.path[i]!));
    const treeEdges = new Set<string>();
    for (const [child, parent] of Object.entries(st.parent)) if (parent) treeEdges.add(key(child, parent));
    const seenEdges = new Set<string>();
    const graphEdges: GraphEdge[] = [];
    for (const [a, b] of edges) {
      const k = key(a, b);
      if (seenEdges.has(k)) continue;
      seenEdges.add(k);
      let state: GraphEdge['state'] = 'idle';
      if (pathEdges.has(k)) state = 'success';
      else if (st.checking && key(st.checking[0], st.checking[1]) === k) state = 'checking';
      else if (treeEdges.has(k)) state = 'tree';
      graphEdges.push({ id: k, from: a, to: b, state });
    }
    const capacity = Math.max(1, ...frames.map((f) => (f.state as State).queue.length));
    const goalDist = st.dist[goal];
    return {
      scene: {
        graph: { nodes, edges: graphEdges, width: layout.width, height: layout.height },
        queue: {
          label: 'queue (front on the left)',
          items: st.queue.map((v) => ({ id: v, label: v, sub: `d ${st.dist[v]}` })),
          capacity,
          emptyText: 'empty',
        },
        legend: [
          { label: 'Taken from queue', swatch: 'primary' },
          { label: 'Waiting in queue', swatch: 'comparison' },
          { label: 'Distance known', swatch: 'window' },
          { label: 'Shortest route', swatch: 'success' },
        ],
      },
      variables: [
        { name: 'corner', value: st.current ?? '—' },
        { name: 'queue', value: st.queue.length ? `[${st.queue.join(', ')}]` : '[]' },
        { name: `distance[${goal}]`, value: goalDist === null || goalDist === undefined ? 'unknown' : String(goalDist) },
        { name: 'streets checked', value: String(frame.counters.comparisons) },
      ],
      facts: [
        { name: 'start', value: start },
        { name: 'goal', value: goal },
      ],
      summary:
        (st.current ? `Exploring from ${st.current}. ` : '') +
        `Queue: ${st.queue.length ? st.queue.join(', ') : 'empty'}. Known distances: ` +
        st.nodes
          .filter((v) => st.dist[v] !== null)
          .map((v) => `${v} ${st.dist[v]}`)
          .join(', ') +
        '.' +
        (st.path ? ` Route: ${st.path.join(', ')}.` : ''),
    };
  },

  formatOutput: (o) => {
    const out = o as BfsOutput;
    return out ? `${out.distance} streets via ${out.path.join(' → ')}` : 'None (unreachable)';
  },
  toRaw: (i) => {
    const input = i as BfsInput;
    return { edges: input.edges.map(([a, b]) => `${a}-${b}`).join(', '), start: input.start, goal: input.goal };
  },
});

function key(a: string, b: string) {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

/**
 * Deterministic layout: lesson coordinates when every node has one, otherwise
 * an even circle. Positions never change between frames of a run.
 */
export function graphLayout(nodes: string[], display?: BfsDisplay) {
  const positions: Record<string, [number, number]> = {};
  const given = display?.positions;
  if (given && nodes.every((v) => given[v])) {
    for (const v of nodes) positions[v] = given[v]!;
  } else {
    const r = 130;
    nodes.forEach((v, i) => {
      const a = -Math.PI / 2 + (2 * Math.PI * i) / Math.max(1, nodes.length);
      positions[v] = [Math.round(200 + r * Math.cos(a)), Math.round(160 + r * Math.sin(a))];
    });
  }
  const xs = nodes.map((v) => positions[v]![0]);
  const ys = nodes.map((v) => positions[v]![1]);
  const pad = 48;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  for (const v of nodes) positions[v] = [positions[v]![0] - minX, positions[v]![1] - minY];
  const captions: Record<string, string> = {};
  for (const v of nodes) if (display?.captions?.[v]) captions[v] = display.captions[v]!;
  return {
    positions,
    captions,
    width: Math.max(...xs) - minX + pad,
    height: Math.max(...ys) - minY + pad + 14,
  };
}
