def days_to_warmer(temps):
    answer = [0] * len(temps)
    waiting = []
    for day, t in enumerate(temps):
        while waiting and temps[waiting[-1]] < t:
            cold = waiting.pop()
            answer[cold] = day - cold
        waiting.append(day)
    return answer
