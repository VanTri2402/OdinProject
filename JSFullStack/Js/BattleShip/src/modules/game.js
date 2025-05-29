import { Player } from "./player.js";
import { Ship, SHIPS } from "./ship.js";

export class Game {
  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.currentPlayer = null;
    this.gamePhase = "setup";
    this.winner = null;
    this.gameStats = {
      totalShots: 0,
      player1Stats: { hits: 0, misses: 0 },
      player2Stats: { hits: 0, misses: 0 },
    };
  }

  initGame(player1Name, player2Name, isPlayer2Computer = false) {
    this.player1 = new Player(player1Name, false);
    this.player2 = new Player(player2Name, isPlayer2Computer);
    this.currentPlayer = this.player1;
    this.gamePhase = "setup";
    this.winner = null;
    this.resetStats();
  }

  createShips() {
    const ships = [];
    Object.entries(SHIPS).forEach(([type, config]) => {
      if (config.length <= 0 || config.quantity <= 0) {
        console.error(`Cấu hình tàu không hợp lệ: ${type}`);
        return;
      }
      for (let i = 0; i < config.quantity; i++) {
        ships.push(new Ship(config.length));
      }
    });
    return ships;
  }

  autoPlaceShips(player) {
    const ships = this.createShips();
    const directions = ["horizontal", "vertical"];
    const availableCoords = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        availableCoords.push(String.fromCharCode(65 + row) + " " + (col + 1));
      }
    }
    ships.forEach((ship) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100 && availableCoords.length > 0) {
        const idx = Math.floor(Math.random() * availableCoords.length);
        const coord = availableCoords.splice(idx, 1)[0];
        const direction = directions[Math.floor(Math.random() * 2)];
        if (
          player.gameBoard.isValidCoordinate(coord) &&
          player.placeShip(ship, coord, direction)
        ) {
          placed = true;
        }
        attempts++;
      }
      if (!placed) {
        console.warn(
          `Không thể đặt tàu kích thước ${ship.length} sau ${attempts} lần thử!`
        );
        for (let row = 0; row < 10 && !placed; row++) {
          for (let col = 0; col < 10 && !placed; col++) {
            const coord = String.fromCharCode(65 + row) + " " + (col + 1);
            if (player.placeShip(ship, coord, directions[0])) {
              placed = true;
            }
          }
        }
      }
    });
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  makeAttack(coord) {
    if (
      this.gamePhase !== "playing" ||
      !this.player1.gameBoard.isValidCoordinate(coord)
    ) {
      return { result: null, message: "Lượt bắn không hợp lệ!" };
    }
    const attacker = this.currentPlayer;
    const defender =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
    const result = attacker.attack(defender.gameBoard, coord);
    if (result === "already-shot" || result === "invalid-coord") {
      return {
        result,
        message:
          result === "already-shot"
            ? "Vị trí này đã bắn rồi!"
            : "Tọa độ không hợp lệ!",
      };
    }
    this.updateStats(attacker, result);
    this.gameStats.totalShots++;
    if (defender.gameBoard.allShipsSunk()) {
      this.gamePhase = "ended";
      this.winner = attacker;
      return {
        result,
        message: this.getResultMessage(result),
        gameEnded: true,
        winner: attacker.name,
      };
    }
    if (result === "miss") {
      this.switchTurn();
    }
    return {
      result,
      message: this.getResultMessage(result),
      nextPlayer: this.currentPlayer.name,
    };
  }

  makeComputerAttack() {
    if (this.gamePhase !== "playing" || !this.currentPlayer.isComputer) {
      return { result: null, message: "Không phải lượt của máy tính!" };
    }
    const defender =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
    const attackResult = this.currentPlayer.makeRandomAttack(
      defender.gameBoard
    );
    if (!attackResult) {
      return { result: null, message: "Không còn vị trí để tấn công!" };
    }
    const { result, coord } = attackResult; // Lấy result và coord từ makeRandomAttack
    this.updateStats(this.currentPlayer, result);
    this.gameStats.totalShots++;
    if (defender.gameBoard.allShipsSunk()) {
      this.gamePhase = "ended";
      this.winner = this.currentPlayer;
      return {
        result,
        coord,
        gameEnded: true,
        winner: this.currentPlayer.name,
      };
    }
    if (result === "miss") {
      this.switchTurn();
    }
    return { result, coord, nextPlayer: this.currentPlayer.name };
  }

  updateStats(player, result) {
    const playerStats =
      player === this.player1
        ? this.gameStats.player1Stats
        : this.gameStats.player2Stats;
    if (result === "hit" || result === "sunk") {
      playerStats.hits++;
    } else if (result === "miss") {
      playerStats.misses++;
    }
  }

  getResultMessage(result) {
    switch (result) {
      case "hit":
        return "Trúng đích! 🎯";
      case "miss":
        return "Trượt! 💦";
      case "sunk":
        return "Đánh chìm tàu! 🚢💥";
      default:
        return "Hành động không hợp lệ!";
    }
  }

  resetStats() {
    this.gameStats = {
      totalShots: 0,
      player1Stats: { hits: 0, misses: 0 },
      player2Stats: { hits: 0, misses: 0 },
    };
  }

  startPlaying() {
    if (this.gamePhase !== "setup") {
      console.warn("Không thể bắt đầu: Trò chơi không ở trạng thái setup!");
      return false;
    }
    this.gamePhase = "playing";
    if (this.player2.isComputer) {
      this.autoPlaceShips(this.player2);
    }
    return true;
  }

  reset() {
    if (this.player1) this.player1.reset();
    if (this.player2) this.player2.reset();
    this.currentPlayer = this.player1;
    this.gamePhase = "setup";
    this.winner = null;
    this.resetStats();
  }
}
