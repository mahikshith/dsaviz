def follows_rule(root):
    def values(node):
        return values(node.left) + [node.val] + values(node.right) if node else []
    if root is None:
        return True
    if any(v >= root.val for v in values(root.left)) or any(v <= root.val for v in values(root.right)):
        return False
    return follows_rule(root.left) and follows_rule(root.right)
