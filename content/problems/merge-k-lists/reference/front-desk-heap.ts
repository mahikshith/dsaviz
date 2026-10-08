class ListNode {
  constructor(public val: number, public next: ListNode | null = null) {}
}

function mergeYard(lists: (ListNode | null)[]): ListNode | null {
  // A small binary heap of nodes ordered by value.
  const desk: ListNode[] = [];
  const swap = (i: number, j: number) => ([desk[i], desk[j]] = [desk[j], desk[i]]);
  const push = (n: ListNode) => {
    desk.push(n);
    for (let i = desk.length - 1; i > 0 && desk[(i - 1) >> 1].val > desk[i].val; i = (i - 1) >> 1) swap(i, (i - 1) >> 1);
  };
  const pop = () => {
    const top = desk[0];
    const last = desk.pop()!;
    if (desk.length) {
      desk[0] = last;
      for (let i = 0; ; ) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < desk.length && desk[l].val < desk[m].val) m = l;
        if (r < desk.length && desk[r].val < desk[m].val) m = r;
        if (m === i) break;
        swap(m, i);
        i = m;
      }
    }
    return top;
  };
  for (const node of lists) if (node) push(node);
  const dummy = new ListNode(0);
  let tail = dummy;
  while (desk.length) {
    const node = pop();
    tail.next = node;
    tail = node;
    if (node.next) push(node.next);
  }
  return dummy.next;
}
