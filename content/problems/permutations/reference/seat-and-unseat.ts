function seatings(nums: number[]): number[][] {
  const orders: number[][] = [];
  const chairs: number[] = [];
  const seated = new Array<boolean>(nums.length).fill(false);
  const fill = (): void => {
    if (chairs.length === nums.length) {
      orders.push([...chairs]);
      return;
    }
    nums.forEach((guest, i) => {
      if (seated[i]) return;
      seated[i] = true;
      chairs.push(guest);
      fill();
      chairs.pop();
      seated[i] = false;
    });
  };
  fill();
  return orders;
}
