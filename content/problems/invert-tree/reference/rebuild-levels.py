def mirror(root):
    if root is None:
        return None
    level = [root]
    while any(level):
        for node in level:
            if node:
                node.left, node.right = node.right, node.left
        level = [child for node in level if node for child in (node.left, node.right)]
    return root
