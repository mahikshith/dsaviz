def right_view(root):
    view, level = [], [root] if root else []
    while level:
        view.append(level[-1].val)
        level = [child for node in level for child in (node.left, node.right) if child]
    return view
