const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(cellClicked) {
  const cellIndex = parseInt(cellClicked.getAttribute('data-index'));

  if (gameState[cellIndex] || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  cellClicked.textContent = currentPlayer;
  cellClicked.classList.add(currentPlayer);

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function reset() {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });

  status.textContent = "Player X's turn";
}

cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell));
});
