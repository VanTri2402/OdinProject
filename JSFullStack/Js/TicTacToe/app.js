let status = document.querySelector(".status-text");
let cells = document.querySelectorAll(".square");
let reset = document.querySelector(".reset");

let gameActive = true;
let currentPlayer = "O";
let board = ["", "", "", "", "", "", "", "", ""];
let winnerPattern = [
  [0, 1, 2], //A0 B1 C2
  [3, 4, 5], //A3 B4 C5
  [6, 7, 8], //A6 B7 C8
  [0, 3, 6], //A0 B3 C6
  [1, 4, 7], //A1 B4 C7
  [2, 5, 8], //A2 B5 C8
  [0, 4, 8], //A0 B4 C8
  [2, 4, 6], //A2 B4 C6
];

if (!status || !cells.length || !reset) {
  console.error("Không tìm thấy các phần tử DOM cần thiết");
} else {
  Game();
}

function Game() {
  cells.forEach((cell, index) => {
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", () => cellClicked(cell, index));
  });
  reset.addEventListener("click", resetGame);
  gameActive = true;
}

function cellClicked(cell, index) {
  if (board[index] !== "" || gameActive == false) return;
  updateCell(cell, index);
  checkWinner();
}
function updateCell(cell, index) {
  cell.textContent = currentPlayer;
  board[index] = currentPlayer;
  currentPlayer = currentPlayer === "O" ? "X" : "O";
  status.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  for (let pattern of winnerPattern) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      status.textContent = `${board[a]} WIN`;
    }
  }
  if (!board.includes("")) {
    gameActive = false;
    status.textContent = "DRAW";
  }
}
function resetGame() {
  cells.forEach((cell, index) => {
    cell.textContent = "";
    board[index] = "";
  });
  currentPlayer = "O";
  gameActive = true;
  status.textContent = `${currentPlayer} 's turn`;
}
