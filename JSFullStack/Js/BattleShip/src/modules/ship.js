export const SHIPS = {
  carrier: { length: 5, quantity: 1 },
  battleship: { length: 4, quantity: 1 },
  cruiser: { length: 3, quantity: 1 },
  submarine: { length: 3, quantity: 1 },
  destroyer: { length: 2, quantity: 1 },
};

export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
    this.checkIfSunk();
  }

  checkIfSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
    }
  }

  isSunk() {
    return this.sunk;
  }

  reset() {
    this.hits = 0;
    this.sunk = false;
  }
}
