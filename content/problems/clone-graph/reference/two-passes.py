def photocopy(node):
    if node is None:
        return None
    people, stack = {node}, [node]
    while stack:
        for friend in stack.pop().neighbors:
            if friend not in people:
                people.add(friend)
                stack.append(friend)
    copy = {p: Node(p.val) for p in people}
    for p in people:
        copy[p].neighbors = [copy[f] for f in p.neighbors]
    return copy[node]
