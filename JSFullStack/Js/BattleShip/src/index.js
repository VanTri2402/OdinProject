// Import các class từ modules
import { Game } from "./modules/game.js";
import { GameBoard } from "./modules/gameboard.js"; // Sửa tên file
import { Player } from "./modules/player.js";
import { Ship, SHIPS } from "./modules/ship.js";

// Game state variables
let currentGame = null;
let selectedShip = null;
let shipDirection = "horizontal";
let gamePhase = "setup";
let currentShipType = null;
let shipsToPlace = [];
let currentShipIndex = 0;

// DOM Elements
let playerBoardElement, enemyBoardElement;
let currentPlayerElement, totalShotsElement;
let p1HitsElement, p1MissesElement, p2HitsElement, p2MissesElement;

// Initialize DOM references
function initializeDOMReferences() {
  playerBoardElement = document.getElementById("playerBoard");
  enemyBoardElement = document.getElementById("enemyBoard");
  currentPlayerElement = document.getElementById("currentPlayer");
  totalShotsElement = document.getElementById("totalShots");
  p1HitsElement = document.getElementById("p1Hits");
  p1MissesElement = document.getElementById("p1Misses");
  p2HitsElement = document.getElementById("p2Hits");
  p2MissesElement = document.getElementById("p2Misses");
}

// Initialize grids with proper event handlers
function initializeGrids() {
  if (!playerBoardElement || !enemyBoardElement) return;

  playerBoardElement.innerHTML = "";
  enemyBoardElement.innerHTML = "";

  // Create grids with labels
  for (let row = 0; row <= 10; row++) {
    for (let col = 0; col <= 10; col++) {
      // Player board
      const playerCell = document.createElement("div");
      playerCell.className = "grid-cell";

      // Enemy board
      const enemyCell = document.createElement("div");
      enemyCell.className = "grid-cell";

      if (row === 0 && col === 0) {
        // Empty corner
        playerCell.className += " label";
        enemyCell.className += " label";
      } else if (row === 0) {
        // Column numbers
        playerCell.className += " label";
        playerCell.textContent = col;
        enemyCell.className += " label";
        enemyCell.textContent = col;
      } else if (col === 0) {
        // Row letters
        playerCell.className += " label";
        playerCell.textContent = String.fromCharCode(64 + row);
        enemyCell.className += " label";
        enemyCell.textContent = String.fromCharCode(64 + row);
      } else {
        // Game cells
        const coord = String.fromCharCode(64 + row) + " " + col;
        playerCell.dataset.coord = coord;
        enemyCell.dataset.coord = coord;

        // Add click handlers
        playerCell.addEventListener("click", () =>
          handlePlayerCellClick(coord)
        );
        enemyCell.addEventListener("click", () => handleEnemyCellClick(coord));

        // Add hover effects for ship placement
        playerCell.addEventListener("mouseenter", () =>
          handleCellHover(coord, true)
        );
        playerCell.addEventListener("mouseleave", () =>
          handleCellHover(coord, false)
        );
      }

      playerBoardElement.appendChild(playerCell);
      enemyBoardElement.appendChild(enemyCell);
    }
  }
}

// Start new game
function startNewGame() {
  showMessage("Đang khởi tạo game mới...", "info");

  // Initialize game instance
  currentGame = new Game();
  currentGame.initGame("Player 1", "Computer", true);

  // Prepare ships for placement
  prepareShipsForPlacement();

  gamePhase = "placement";
  document.getElementById("shipPlacement").classList.remove("hidden");
  document.getElementById("gameSetup").classList.add("hidden");

  initializeGrids();
  updateDisplay();
  updateShipList();
}

// Prepare ships for manual placement
function prepareShipsForPlacement() {
  shipsToPlace = [];
  Object.entries(SHIPS).forEach(([type, config]) => {
    for (let i = 0; i < config.quantity; i++) {
      shipsToPlace.push({
        type: type,
        length: config.length,
        ship: new Ship(config.length),
      });
    }
  });
  currentShipIndex = 0;
  selectFirstShip();
}

// Select first available ship
function selectFirstShip() {
  if (shipsToPlace.length > 0) {
    const firstShip = shipsToPlace[0];
    selectedShip = firstShip;
    currentShipType = firstShip.type;

    // Update UI to show selected ship
    document.querySelectorAll(".ship-item").forEach((item) => {
      item.classList.remove("selected");
      if (
        item.dataset.type === firstShip.type &&
        !item.classList.contains("placed")
      ) {
        item.classList.add("selected");
      }
    });
  }
}

// Auto place ships
function autoPlaceShips() {
  if (!currentGame) return;

  showMessage("Đang đặt tàu tự động...", "info");

  // Auto place ships for player 1
  currentGame.autoPlaceShips(currentGame.player1); // Sửa tên hàm

  // Update visual representation
  updatePlayerBoardVisual();

  setTimeout(() => {
    gamePhase = "playing";
    currentGame.startPlaying();
    document.getElementById("shipPlacement").classList.add("hidden");
    showMessage("Tàu đã được đặt! Bắt đầu trận chiến! 🚀", "success");
    updateDisplay();
  }, 1500);
}

// Reset game
function resetGame() {
  if (currentGame) {
    currentGame.reset();
  }
  currentGame = null;
  selectedShip = null;
  shipsToPlace = [];
  currentShipIndex = 0;

  gamePhase = "setup";
  document.getElementById("shipPlacement").classList.add("hidden");
  document.getElementById("gameSetup").classList.remove("hidden");

  initializeGrids();
  hideMessage();
  updateDisplay();
  resetStats();
}

// Handle player cell click (for ship placement)
function handlePlayerCellClick(coord) {
  if (gamePhase === "placement" && selectedShip) {
    // Kiểm tra tọa độ hợp lệ
    if (!currentGame.player1.gameBoard.isValidCoordinate(coord)) {
      showMessage("Tọa độ không hợp lệ!", "error");
      return;
    }

    // Try to place the ship
    const success = currentGame.player1.placeShip(
      selectedShip.ship,
      coord,
      shipDirection
    );

    if (success) {
      // Remove the placed ship from the list
      shipsToPlace = shipsToPlace.filter((ship) => ship !== selectedShip);

      // Mark ship as placed in UI
      document.querySelectorAll(".ship-item").forEach((item) => {
        if (
          item.dataset.type === selectedShip.type &&
          !item.classList.contains("placed")
        ) {
          item.classList.add("placed");
          item.classList.remove("selected");
          return;
        }
      });

      // Update visual representation
      updatePlayerBoardVisual();

      // Check if all ships are placed
      if (shipsToPlace.length === 0) {
        // All ships placed, start game
        gamePhase = "playing";
        currentGame.startPlaying();
        document.getElementById("shipPlacement").classList.add("hidden");
        showMessage(
          "Tất cả tàu đã được đặt! Bắt đầu trận chiến! 🚀",
          "success"
        );
        updateDisplay();
      } else {
        // Select next ship
        selectFirstShip();
        showMessage(
          `Đã đặt ${selectedShip.type}! Tiếp tục đặt tàu khác.`,
          "success"
        );
      }
    } else {
      showMessage("Không thể đặt tàu ở vị trí này!", "error");
    }
  }
}

// Handle enemy cell click (for attacks)
function handleEnemyCellClick(coord) {
  if (
    gamePhase === "playing" &&
    currentGame &&
    currentGame.currentPlayer === currentGame.player1
  ) {
    const result = currentGame.makeAttack(coord);

    if (!result) {
      showMessage("Lượt bắn không hợp lệ!", "error");
      return;
    }

    if (result.result !== "already-shot" && result.result !== "invalid-coord") {
      // Update enemy board visual
      updateEnemyCell(coord, result.result);

      // Update stats
      updateStatsDisplay();

      // Show result message
      showMessage(
        result.message,
        result.result === "miss" ? "info" : "success"
      );

      // Check if game ended
      if (result.gameEnded) {
        endGame(result.winner);
        return;
      }

      // If it's a miss, switch to computer turn
      if (result.result === "miss") {
        setTimeout(() => {
          handleComputerTurn();
        }, 1000);
      }
    } else {
      showMessage(result.message, "error");
    }
  }
}

// Handle computer turn
function handleComputerTurn() {
  if (
    gamePhase === "playing" &&
    currentGame &&
    currentGame.currentPlayer === currentGame.player2
  ) {
    const result = currentGame.makeComputerAttack();

    if (result && result.result) {
      // Update player board visual (show where computer attacked)
      updatePlayerCell(result.coord, result.result); // Sử dụng result.coord

      // Update stats
      updateStatsDisplay();

      // Show computer's attack result
      showMessage(
        `Máy tính: ${currentGame.getResultMessage(result.result)}`,
        result.result === "miss" ? "info" : "error"
      );

      // Check if game ended
      if (result.gameEnded) {
        endGame(result.winner);
        return;
      }

      // If computer missed, switch back to player
      if (result.result === "miss") {
        updateDisplay();
      } else {
        // Computer hit, continues its turn
        setTimeout(() => {
          handleComputerTurn();
        }, 1500);
      }
    } else if (result) {
      showMessage(result.message, "error");
    }
  }
}

// Handle cell hover for ship placement preview
function handleCellHover(coord, isEntering) {
  if (gamePhase === "placement" && selectedShip) {
    // Clear previous preview
    document.querySelectorAll(".grid-cell.preview").forEach((cell) => {
      cell.classList.remove("preview", "preview-valid", "preview-invalid");
    });

    if (isEntering) {
      // Show preview of ship placement
      const positions = currentGame.player1.gameBoard.getShipPositions(
        // Sửa GameBoard thành gameBoard
        coord,
        selectedShip.length,
        shipDirection
      );
      const canPlace = currentGame.player1.gameBoard.canPlaceShip(
        // Sửa GameBoard thành gameBoard
        coord,
        selectedShip.length,
        shipDirection
      );

      positions.forEach((pos) => {
        const cell = document.querySelector(
          `#playerBoard [data-coord="${pos}"]`
        );
        if (cell) {
          cell.classList.add(
            "preview",
            canPlace ? "preview-valid" : "preview-invalid"
          );
        }
      });
    }
  }
}

// Update player board visual representation
function updatePlayerBoardVisual() {
  if (!currentGame) return;

  // Clear existing ship visuals
  document.querySelectorAll("#playerBoard .grid-cell").forEach((cell) => {
    cell.classList.remove("ship", "hit", "miss");
  });

  // Show placed ships
  Object.entries(currentGame.player1.gameBoard.shipPositions).forEach(
    // Sửa GameBoard thành gameBoard
    ([coord, shipIndex]) => {
      const cell = document.querySelector(
        `#playerBoard [data-coord="${coord}"]`
      );
      if (cell) {
        cell.classList.add("ship");
      }
    }
  );

  // Show hits and misses on player board
  Object.entries(currentGame.player1.gameBoard.shots).forEach(
    ([coord, result]) => {
      const cell = document.querySelector(
        `#playerBoard [data-coord="${coord}"]`
      );
      if (cell) {
        cell.classList.add(result);
      }
    }
  );
}

// Update enemy cell visual
function updateEnemyCell(coord, result) {
  const cell = document.querySelector(`#enemyBoard [data-coord="${coord}"]`);
  if (cell) {
    cell.classList.add(result);
  }
}

// Update player cell visual (for computer attacks)
function updatePlayerCell(coord, result) {
  const cell = document.querySelector(`#playerBoard [data-coord="${coord}"]`);
  if (cell) {
    cell.classList.add(result);
  }
}

// Set ship direction
function setDirection(direction) {
  shipDirection = direction;
  document.querySelectorAll(".direction-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
}

// Update ship list UI
function updateShipList() {
  document.querySelectorAll(".ship-item").forEach((item) => {
    item.classList.remove("placed", "selected");
  });
}

// Update display based on game phase
function updateDisplay() {
  if (!currentPlayerElement) return;

  switch (gamePhase) {
    case "setup":
      currentPlayerElement.textContent = "Chuẩn bị trận chiến...";
      break;
    case "placement":
      currentPlayerElement.textContent = "🚢 Đang đặt tàu chiến...";
      break;
    case "playing":
      if (currentGame && currentGame.currentPlayer) {
        if (currentGame.currentPlayer.isComputer) {
          currentPlayerElement.textContent = "🤖 Lượt máy tính...";
        } else {
          currentPlayerElement.textContent = "⚔️ Lượt của bạn - Hãy tấn công!";
        }
      }
      break;
    case "ended":
      currentPlayerElement.textContent = "🏁 Trận chiến kết thúc!";
      break;
  }
}

// Update stats display
function updateStatsDisplay() {
  if (!currentGame) return;

  if (totalShotsElement)
    totalShotsElement.textContent = currentGame.gameStats.totalShots;
  if (p1HitsElement)
    p1HitsElement.textContent = currentGame.gameStats.player1Stats.hits;
  if (p1MissesElement)
    p1MissesElement.textContent = currentGame.gameStats.player1Stats.misses;
  if (p2HitsElement)
    p2HitsElement.textContent = currentGame.gameStats.player2Stats.hits;
  if (p2MissesElement)
    p2MissesElement.textContent = currentGame.gameStats.player2Stats.misses;
}

// Reset stats display
function resetStats() {
  if (totalShotsElement) totalShotsElement.textContent = "0";
  if (p1HitsElement) p1HitsElement.textContent = "0";
  if (p1MissesElement) p1MissesElement.textContent = "0";
  if (p2HitsElement) p2HitsElement.textContent = "0";
  if (p2MissesElement) p2MissesElement.textContent = "0";
}

// End game
function endGame(winner) {
  gamePhase = "ended";
  updateDisplay();

  const modal = document.getElementById("gameOverModal");
  const title = document.getElementById("gameOverTitle");
  const message = document.getElementById("gameOverMessage");
  const finalStats = document.getElementById("finalStats");

  if (winner === "Player 1") {
    title.textContent = "🎉 Chiến thắng!";
    message.textContent = "Chúc mừng bạn đã thắng!";
  } else {
    title.textContent = "💥 Thất bại!";
    message.textContent = "Máy tính đã thắng!";
  }

  // Show final stats
  finalStats.innerHTML = `
    <div class="stat-item">
      <div>🎯 Tổng số lần bắn</div>
      <div>${currentGame.gameStats.totalShots}</div>
    </div>
    <div class="stat-item">
      <div>✅ Bạn: Trúng/Trượt</div>
      <div>${currentGame.gameStats.player1Stats.hits}/${currentGame.gameStats.player1Stats.misses}</div>
    </div>
    <div class="stat-item">
      <div>🤖 Máy: Trúng/Trượt</div>
      <div>${currentGame.gameStats.player2Stats.hits}/${currentGame.gameStats.player2Stats.misses}</div>
    </div>
  `;

  modal.classList.add("show");
}

// Close game over modal
function closeGameOver() {
  document.getElementById("gameOverModal").classList.remove("show");
}

// Show message
function showMessage(text, type = "info") {
  const messageArea = document.getElementById("messageArea");
  if (messageArea) {
    messageArea.textContent = text;
    messageArea.className = `message ${type}`;
    messageArea.classList.remove("hidden");

    setTimeout(() => {
      hideMessage();
    }, 3000);
  }
}

// Hide message
function hideMessage() {
  const messageArea = document.getElementById("messageArea");
  if (messageArea) {
    messageArea.classList.add("hidden");
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeDOMReferences();
  initializeGrids();

  // Add ship selection listeners
  document.querySelectorAll(".ship-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (!item.classList.contains("placed") && gamePhase === "placement") {
        // Find the corresponding ship to place
        const shipType = item.dataset.type;
        const availableShip = shipsToPlace.find(
          (ship) => ship.type === shipType
        );

        if (availableShip) {
          document
            .querySelectorAll(".ship-item")
            .forEach((i) => i.classList.remove("selected"));
          item.classList.add("selected");
          selectedShip = availableShip;
          currentShipType = shipType;
        }
      }
    });
  });
});

// Make functions available globally
window.startNewGame = startNewGame;
window.autoPlaceShips = autoPlaceShips;
window.resetGame = resetGame;
window.setDirection = setDirection;
window.closeGameOver = closeGameOver;
