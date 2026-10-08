def turn_around(head):
    if head is None or head.next is None:
        return head
    new_head = turn_around(head.next)
    head.next.next = head
    head.next = None
    return new_head
