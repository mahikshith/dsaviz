def best_route(money):
    best = [0] * (len(money) + 1)
    for i, gift in enumerate(money):
        best[i + 1] = max(best[i], gift + (best[i - 1] if i >= 1 else 0))
    return best[-1]
