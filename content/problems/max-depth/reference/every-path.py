def depth(root):
    best = 0
    stack = [(root, [root])] if root else []
    while stack:
        node, path = stack.pop()
        if not node.left and not node.right:
            best = max(best, len(path))
        for child in (node.left, node.right):
            if child:
                stack.append((child, path + [child]))
    return best
