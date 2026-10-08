class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def mirror(root):
    if root is None:
        return None
    root.left, root.right = root.right, root.left
    mirror(root.left)
    mirror(root.right)
    return root
