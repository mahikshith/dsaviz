def seatings(nums):
    orders, chairs, seated = [], [], [False] * len(nums)

    def fill():
        if len(chairs) == len(nums):
            orders.append(chairs[:])
            return
        for i, guest in enumerate(nums):
            if not seated[i]:
                seated[i] = True
                chairs.append(guest)
                fill()
                chairs.pop()
                seated[i] = False

    fill()
    return orders
