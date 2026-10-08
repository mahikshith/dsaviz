def follows_rule(root):
    order = []
    def walk(node):
        if node:
            walk(node.left)
            order.append(node.val)
            walk(node.right)
    walk(root)
    return all(order[i] > order[i - 1] for i in range(1, len(order)))
