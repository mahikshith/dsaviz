class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def zip_trains(first, second):
    dummy = tail = ListNode(0)
    while first and second:
        if first.val <= second.val:
            tail.next, first = first, first.next
        else:
            tail.next, second = second, second.next
        tail = tail.next
    tail.next = first or second
    return dummy.next
