def fewest_coins(coins, amount, memo=None):
    memo = {} if memo is None else memo
    if amount == 0:
        return 0
    if amount in memo:
        return memo[amount]
    best = float("inf")
    for c in coins:
        if c <= amount:
            rest = fewest_coins(coins, amount - c, memo)
            if rest >= 0:
                best = min(best, rest + 1)
    memo[amount] = -1 if best == float("inf") else best
    return memo[amount]
