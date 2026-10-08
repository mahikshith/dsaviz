def fewest_coins(coins, amount):
    if amount == 0:
        return 0
    best = float("inf")
    for c in coins:
        if c <= amount:
            rest = fewest_coins(coins, amount - c)
            if rest >= 0:
                best = min(best, rest + 1)
    return -1 if best == float("inf") else best
