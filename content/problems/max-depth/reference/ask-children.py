class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def depth(root):
    if root is None:
        return 0
    return 1 + max(depth(root.left), depth(root.right))
