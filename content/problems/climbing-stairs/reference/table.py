def ways_up(n):  # @anchor signature
    ways = [1, 1] + [0] * (n - 1)  # @anchor base
    for i in range(2, n + 1):
        ways[i] = ways[i - 1] + ways[i - 2]  # @anchor fill
    return ways[n]  # @anchor return
