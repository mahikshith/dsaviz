class PlatePile {
  private plates: [number, number][] = []; // [value, smallest at or below]

  push(value: number): void {
    const below = this.plates[this.plates.length - 1];
    this.plates.push([value, below ? Math.min(value, below[1]) : value]);
  }

  pop(): void {
    this.plates.pop();
  }

  top(): number {
    return this.plates[this.plates.length - 1][0];
  }

  getMin(): number {
    return this.plates[this.plates.length - 1][1];
  }
}
