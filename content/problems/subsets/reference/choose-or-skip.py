def all_baskets(nums):
    baskets, basket = [], []

    def explore(i):
        if i == len(nums):
            baskets.append(basket[:])
            return
        basket.append(nums[i])  # choose
        explore(i + 1)
        basket.pop()  # undo
        explore(i + 1)  # skip

    explore(0)
    return baskets
