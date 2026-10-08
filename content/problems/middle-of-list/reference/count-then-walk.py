def middle_carriage(head):
    count, node = 0, head
    while node:
        count, node = count + 1, node.next
    node = head
    for _ in range(count // 2):
        node = node.next
    return node
