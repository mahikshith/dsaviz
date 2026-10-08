class ListNode {
  constructor(public val: number, public next: ListNode | null = null) {}
}

function unhookFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let scout: ListNode | null = dummy;
  let marker: ListNode = dummy;
  for (let i = 0; i <= n; i++) scout = scout!.next;
  while (scout) {
    scout = scout.next;
    marker = marker.next!;
  }
  marker.next = marker.next!.next;
  return dummy.next;
}
