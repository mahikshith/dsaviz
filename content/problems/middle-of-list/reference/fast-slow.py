class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def middle_carriage(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
