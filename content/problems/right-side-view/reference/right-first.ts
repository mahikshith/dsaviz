class TreeNode {
  constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {}
}

function rightView(root: TreeNode | null): number[] {
  const view: number[] = [];
  const walk = (node: TreeNode | null, depth: number): void => {
    if (!node) return;
    if (depth === view.length) view.push(node.val);
    walk(node.right, depth + 1);
    walk(node.left, depth + 1);
  };
  walk(root, 0);
  return view;
}
