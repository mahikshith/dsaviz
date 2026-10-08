class TreeNode {
  constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

function floors(root: TreeNode | null): number[][] {
  const out: number[][] = [];
  let level = root ? [root] : [];
  while (level.length) {
    out.push(level.map((n) => n.val));
    const next: TreeNode[] = [];
    for (const n of level) {
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    level = next;
  }
  return out;
}
