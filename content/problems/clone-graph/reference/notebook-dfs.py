class Node:
    def __init__(self, val=0, neighbors=None):
        self.val, self.neighbors = val, neighbors or []

def photocopy(node, notebook=None):
    if node is None:
        return None
    notebook = {} if notebook is None else notebook
    if node in notebook:
        return notebook[node]
    copy = Node(node.val)
    notebook[node] = copy
    copy.neighbors = [photocopy(friend, notebook) for friend in node.neighbors]
    return copy
