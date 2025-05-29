import { Ship } from "./modules/ship";
import { GameBoard } from "./modules/GameBoard";
const ship = new Ship(3);
console.log("ship length :", ship.length);
ship.hit();
console.log("after 1 hit ", ship.hits, ship.isSunk());

const board = new GameBoard();
const testShip = new Ship(2);
console.log("can place ship ", board.placeShip(testShip, "A1", "horizonta"));
console.log("can place ship ", board.receiveAttack("A1"));
