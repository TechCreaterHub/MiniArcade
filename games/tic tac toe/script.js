const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  if (!gameActive) return;

  cell.textContent = currentPlayer;

  const winningPattern = getWinningPattern(currentPlayer);
  if (winningPattern) {
    message.textContent = `${currentPlayer} wins!`;
    highlightWinningCells(winningPattern);
    gameActive = false;
    return;
  }

  if ([...cells].every(cell => cell.textContent)) {
    message.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function getWinningPattern(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (const pattern of winPatterns) {
    if (pattern.every(index => cells[index].textContent === player)) {
      return pattern;
    }
  }
  return null;
}

function highlightWinningCells(pattern) {
  pattern.forEach(index => cells[index].classList.add("win"));
}

restartBtn.addEventListener("click", () => {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
    cell.addEventListener("click", handleClick, { once: true });
  });
  currentPlayer = "X";
  gameActive = true;
  message.textContent = "";
});
