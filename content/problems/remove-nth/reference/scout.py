class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def unhook_from_end(head, n):
    dummy = ListNode(0, head)
    scout = marker = dummy
    for _ in range(n + 1):
        scout = scout.next
    while scout:
        scout, marker = scout.next, marker.next
    marker.next = marker.next.next
    return dummy.next
