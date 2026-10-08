class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def right_view(root):
    view = []
    def walk(node, depth):
        if node is None:
            return
        if depth == len(view):
            view.append(node.val)
        walk(node.right, depth + 1)
        walk(node.left, depth + 1)
    walk(root, 0)
    return view
