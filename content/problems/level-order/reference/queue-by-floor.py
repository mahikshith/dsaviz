class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

from collections import deque

def floors(root):
    if root is None:
        return []
    out, queue = [], deque([root])
    while queue:
        floor = []
        for _ in range(len(queue)):
            node = queue.popleft()
            floor.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        out.append(floor)
    return out
