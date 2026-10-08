def turn_around(head):
    values = []
    while head:
        values.append(head.val)
        head = head.next
    new_head = None
    for v in values:
        new_head = ListNode(v, new_head)
    return new_head
