def best_route(money):
    two_back, one_back = 0, 0
    for gift in money:
        two_back, one_back = one_back, max(one_back, gift + two_back)
    return one_back
