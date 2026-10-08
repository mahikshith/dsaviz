def ways_up(n):
    if n <= 1:
        return 1
    return ways_up(n - 1) + ways_up(n - 2)
