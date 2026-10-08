/**
 * Scene models: plain data a renderer can draw. Adapters project frames onto
 * these, so one renderer serves many algorithms. No React or DOM here.
 */

export type Tone = 'primary' | 'comparison' | 'success' | 'danger' | 'accent' | 'neutral';

export type CellState =
  | 'idle'
  | 'primary'
  | 'comparison'
  | 'success'
  | 'danger'
  | 'window'
  | 'entering'
  | 'leaving'
  | 'discarded'
  | 'muted'
  | 'pending';

export type ArrayCell = {
  id: string;
  label: string;
  sub: string;
  state: CellState;
  /** For rows drawn with bars: the value the bar's height represents. */
  bar?: number;
};

export type Pointer = { id: string; label: string; index: number; tone: Tone; side: 'above' | 'below' };

export type Band = { id: string; from: number; to: number; label: string; tone: Tone; side: 'above' | 'below' };

export type ArrayRow = {
  id: string;
  label: string;
  cells: ArrayCell[];
  pointers: Pointer[];
  bands: Band[];
  /** Horizontal shift in cell widths. A prefix row uses -0.5 so P[i] sits between items. */
  offset?: number;
  /** Draw a bar above each cell, scaled so `max` fills the bar zone. Pointers then go below. */
  bars?: { max: number };
};

export type StackItem = { id: string; label: string; sub: string; state: CellState };
export type StackModel = { label: string; items: StackItem[]; capacity: number; emptyText: string };

export type TableRow = { id: string; key: string; value: string; state: CellState };
/** A small key → value table, such as a hash map or a tally. Height is fixed by `capacity`. */
export type TableModel = { label: string; columns: [string, string]; rows: TableRow[]; capacity: number; emptyText: string };

export type QueueItem = { id: string; label: string; sub: string };
export type QueueModel = { label: string; items: QueueItem[]; capacity: number; emptyText: string };

export type GraphNodeState = 'idle' | 'queued' | 'current' | 'visited' | 'success';
export type GraphNode = {
  id: string;
  label: string;
  caption?: string;
  x: number;
  y: number;
  state: GraphNodeState;
  badge?: string;
  goal?: boolean;
};
export type GraphEdgeState = 'idle' | 'checking' | 'tree' | 'success';
export type GraphEdge = { id: string; from: string; to: string; state: GraphEdgeState };
export type GraphModel = { nodes: GraphNode[]; edges: GraphEdge[]; width: number; height: number };

export type LegendItem = { label: string; swatch: 'primary' | 'comparison' | 'success' | 'danger' | 'discarded' | 'window' | 'accent' | 'neutral' };

export type SceneModel = {
  arrays?: ArrayRow[];
  graph?: GraphModel;
  stack?: StackModel;
  queue?: QueueModel;
  table?: TableModel;
  legend: LegendItem[];
};

export type Variable = { name: string; value: string };

/** Everything the stage draws for one frame, besides the narration text. */
export type FrameView = {
  scene: SceneModel;
  variables: Variable[];
  /** Short facts shown next to the goal line, such as `target = 18`. */
  facts: Variable[];
  /** A plain-text description of the state, for screen readers and the transcript. */
  summary: string;
};
