def merge_yard(lists):
    values = []
    for node in lists:
        while node:
            values.append(node.val)
            node = node.next
    dummy = tail = ListNode(0)
    for v in sorted(values):
        tail.next = ListNode(v)
        tail = tail.next
    return dummy.next
