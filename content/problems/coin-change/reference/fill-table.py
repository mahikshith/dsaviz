def fewest_coins(coins, amount):
    fewest = [0] + [float("inf")] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                fewest[a] = min(fewest[a], fewest[a - c] + 1)
    return -1 if fewest[amount] == float("inf") else fewest[amount]
