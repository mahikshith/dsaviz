class TreeNode {
  constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

function followsRule(root: TreeNode | null, low = -Infinity, high = Infinity): boolean {
  if (!root) return true;
  if (!(low < root.val && root.val < high)) return false;
  return followsRule(root.left, low, root.val) && followsRule(root.right, root.val, high);
}
