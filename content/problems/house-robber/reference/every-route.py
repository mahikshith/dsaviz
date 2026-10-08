def best_route(money):
    def best_from(i):
        if i >= len(money):
            return 0
        return max(best_from(i + 1), money[i] + best_from(i + 2))
    return best_from(0)
