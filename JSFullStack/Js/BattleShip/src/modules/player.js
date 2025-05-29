import { GameBoard } from "./gameboard";

export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameBoard = new GameBoard();
    this.attackBoard = new GameBoard();
  }

  placeShip(ship, startCoord, direction) {
    return this.gameBoard.placeShip(ship, startCoord, direction);
  }

  attack(enemyBoard, coord) {
    if (!enemyBoard.isValidCoordinate(coord)) {
      return "invalid-coord";
    }
    const result = enemyBoard.receiveAttack(coord);
    this.attackBoard.shots[coord] = result === "miss" ? "miss" : "hit";
    return result;
  }

  makeRandomAttack(enemyBoard) {
    if (!this.isComputer) return null;
    const availableCoords = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const coord = String.fromCharCode(65 + row) + " " + (col + 1);
        if (!enemyBoard.shots[coord]) availableCoords.push(coord);
      }
    }
    if (availableCoords.length === 0) {
      console.warn("Không còn ô hợp lệ để tấn công!");
      return null;
    }
    const coord =
      availableCoords[Math.floor(Math.random() * availableCoords.length)];
    const result = this.attack(enemyBoard, coord);
    return { result, coord }; // Trả về cả result và coord
  }

  reset() {
    this.gameBoard.reset();
    this.attackBoard.reset();
  }
}
