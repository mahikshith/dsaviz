class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def follows_rule(root, low=float("-inf"), high=float("inf")):
    if root is None:
        return True
    if not low < root.val < high:
        return False
    return follows_rule(root.left, low, root.val) and follows_rule(root.right, root.val, high)
