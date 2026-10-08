class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def turn_around(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev, curr = curr, nxt
    return prev
