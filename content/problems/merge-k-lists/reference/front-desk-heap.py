class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

import heapq

def merge_yard(lists):
    desk = [(node.val, i, node) for i, node in enumerate(lists) if node]
    heapq.heapify(desk)
    dummy = tail = ListNode(0)
    while desk:
        _, i, node = heapq.heappop(desk)
        tail.next = node
        tail = node
        if node.next:
            heapq.heappush(desk, (node.next.val, i, node.next))
    return dummy.next
