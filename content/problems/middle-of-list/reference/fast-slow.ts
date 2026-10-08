class ListNode {
  constructor(public val: number, public next: ListNode | null = null) {}
}

function middleCarriage(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  return slow;
}
