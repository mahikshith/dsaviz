def unhook_from_end(head, n):
    length, node = 0, head
    while node:
        length, node = length + 1, node.next
    dummy = ListNode(0, head)
    node = dummy
    for _ in range(length - n):
        node = node.next
    node.next = node.next.next
    return dummy.next
