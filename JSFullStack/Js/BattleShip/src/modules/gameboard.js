export class GameBoard {
  constructor() {
    this.size = 10;
    this.ships = [];
    this.shipPositions = {};
    this.shots = {};
    this.missedShots = [];
  }

  getCoordinate(row, col) {
    const letter = String.fromCharCode(65 + row);
    const number = col + 1;
    return `${letter} ${number}`;
  }

  parseCoordinate(coord) {
    if (!coord.match(/^([A-J]) (\d+)$/)) {
      throw new Error(`Tọa độ không hợp lệ: ${coord}`);
    }
    const letter = coord.charCodeAt(0) - 65;
    const number = parseInt(coord.split(" ")[1]) - 1;
    return [letter, number];
  }

  isValidCoordinate(coord) {
    if (typeof coord !== "string" || !coord.match(/^([A-J]) (\d+)$/)) {
      return false;
    }
    const [row, col] = this.parseCoordinate(coord);
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }

  placeShip(ship, startCoord, direction) {
    if (!this.canPlaceShip(startCoord, ship.length, direction)) {
      return false;
    }
    const shipIndex = this.ships.length;
    this.ships.push(ship);
    const positions = this.getShipPositions(startCoord, ship.length, direction);
    positions.forEach((coord) => {
      this.shipPositions[coord] = shipIndex;
    });
    return true;
  }

  getShipPositions(startCoord, length, direction) {
    const positions = [];
    const [startRow, startCol] = this.parseCoordinate(startCoord);
    for (let i = 0; i < length; i++) {
      let coord;
      if (direction === "horizontal") {
        coord = this.getCoordinate(startRow, startCol + i);
      } else {
        coord = this.getCoordinate(startRow + i, startCol);
      }
      positions.push(coord);
    }
    return positions;
  }

  canPlaceShip(startCoord, length, direction) {
    const positions = this.getShipPositions(startCoord, length, direction);
    return positions.every((coord) => {
      return this.isValidCoordinate(coord) && !this.shipPositions[coord];
    });
  }

  receiveAttack(coord) {
    if (!this.isValidCoordinate(coord)) {
      return "invalid-coord";
    }
    if (this.shots[coord]) {
      return "already-shot";
    }
    if (this.shipPositions[coord] !== undefined) {
      const shipIndex = this.shipPositions[coord];
      const ship = this.ships[shipIndex];
      if (!ship) {
        console.error(`Tàu không tồn tại tại chỉ số ${shipIndex}`);
        return "error";
      }
      ship.hit();
      this.shots[coord] = "hit";
      if (ship.isSunk()) {
        return "sunk";
      }
      return "hit";
    } else {
      this.shots[coord] = "miss";
      this.missedShots.push(coord);
      return "miss";
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  reset() {
    this.ships = [];
    this.shipPositions = {};
    this.shots = {};
    this.missedShots = [];
  }
}
