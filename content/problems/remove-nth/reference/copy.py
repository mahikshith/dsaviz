def unhook_from_end(head, n):
    values = []
    while head:
        values.append(head.val)
        head = head.next
    del values[len(values) - n]
    dummy = tail = ListNode(0)
    for v in values:
        tail.next = ListNode(v)
        tail = tail.next
    return dummy.next
