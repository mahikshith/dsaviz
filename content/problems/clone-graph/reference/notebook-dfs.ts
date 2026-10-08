class GraphNode {
  constructor(public val: number, public neighbors: GraphNode[] = []) {}
}

function photocopy(node: GraphNode | null, notebook = new Map<GraphNode, GraphNode>()): GraphNode | null {
  if (!node) return null;
  const seen = notebook.get(node);
  if (seen) return seen;
  const copy = new GraphNode(node.val);
  notebook.set(node, copy);
  copy.neighbors = node.neighbors.map((friend) => photocopy(friend, notebook)!);
  return copy;
}
