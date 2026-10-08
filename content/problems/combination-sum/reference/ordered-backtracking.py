def exact_baskets(candidates, target):
    items = sorted(candidates)
    baskets, basket = [], []

    def fill(start, left):
        if left == 0:
            baskets.append(basket[:])
            return
        for i in range(start, len(items)):
            if items[i] > left:
                break
            basket.append(items[i])
            fill(i, left - items[i])
            basket.pop()

    fill(0, target)
    return baskets
