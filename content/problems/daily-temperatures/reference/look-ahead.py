def days_to_warmer(temps):
    answer = [0] * len(temps)
    for i in range(len(temps)):
        for j in range(i + 1, len(temps)):
            if temps[j] > temps[i]:
                answer[i] = j - i
                break
    return answer
