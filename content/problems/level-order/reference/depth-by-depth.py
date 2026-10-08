def floors(root):
    def at_depth(node, depth):
        if node is None:
            return []
        if depth == 0:
            return [node.val]
        return at_depth(node.left, depth - 1) + at_depth(node.right, depth - 1)
    out, depth = [], 0
    while True:
        level = at_depth(root, depth)
        if not level:
            return out
        out.append(level)
        depth += 1
