def zip_trains(first, second):
    values = []
    for node in (first, second):
        while node:
            values.append(node.val)
            node = node.next
    dummy = tail = ListNode(0)
    for v in sorted(values):
        tail.next = ListNode(v)
        tail = tail.next
    return dummy.next
