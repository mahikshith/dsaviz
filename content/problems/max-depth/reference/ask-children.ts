class TreeNode {
  constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

function depth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(depth(root.left), depth(root.right));
}
