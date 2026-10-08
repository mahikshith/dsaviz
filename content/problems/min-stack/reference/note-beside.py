class PlatePile:
    def __init__(self):
        self.plates = []  # pairs: (value, smallest at or below)

    def push(self, value):
        smallest = min(value, self.plates[-1][1]) if self.plates else value
        self.plates.append((value, smallest))

    def pop(self):
        self.plates.pop()

    def top(self):
        return self.plates[-1][0]

    def get_min(self):
        return self.plates[-1][1]
