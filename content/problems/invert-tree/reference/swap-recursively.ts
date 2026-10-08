class TreeNode {
  constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

function mirror(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  [root.left, root.right] = [root.right, root.left];
  mirror(root.left);
  mirror(root.right);
  return root;
}
