class ListNode {
  constructor(public val: number, public next: ListNode | null = null) {}
}

function zipTrains(first: ListNode | null, second: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let tail = dummy;
  while (first && second) {
    if (first.val <= second.val) {
      tail.next = first;
      first = first.next;
    } else {
      tail.next = second;
      second = second.next;
    }
    tail = tail.next;
  }
  tail.next = first ?? second;
  return dummy.next;
}
