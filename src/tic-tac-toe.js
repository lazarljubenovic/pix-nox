function isNothing(symbol) {
  switch (symbol) {
    case '.':
    case '':
    case null:
    case undefined:
      return true;
    default:
      return false;
  }
}

function isX(symbol) {
  switch (symbol) {
    case 'x':
    case 'X':
      return true;
    default:
      return false;
  }
}

function isO(symbol) {
  switch (symbol) {
    case 'o':
    case 'O':
      return true;
    default:
      return false;
  }
}

function normalizeSymbol(symbol) {
  if (isNothing(symbol)) return '.';
  if (isX(symbol)) return 'x';
  if (isO(symbol)) return 'o';
  throw new Error(`${symbol} is not a valid symbol!`);
}

function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map(x => x[i]));
}

export function isFull(board) {
  return !board.some(row => row.some(isNothing));
}

// Returns null if array doesn't have three in a row
// Returns 'x' if array has all x's
// Returns 'o' if array has all o's
function checkArray(arr) {
  if (arr.every(isX)) return 'x';
  if (arr.every(isO)) return 'o';
  return null;
}

function checkRow(i, board) {
  return checkArray(board[i]);
}

function checkColumn(i, board) {
  return checkRow(i, transpose(board));
}

function checkMainDiagonal(board) {
  const diagonal = [board[0][0], board[1][1], board[2][2]];
  return checkArray(diagonal);
}

function checkTheOtherDiagonal(board) {
  const otherDiagonal = [board[0][2], board[1][1], board[2][0]];
  return checkArray(otherDiagonal);
}

export function getWinner(board) {
  const results = [
    checkRow(0, board),
    checkRow(1, board),
    checkRow(2, board),
    checkColumn(0, board),
    checkColumn(1, board),
    checkColumn(2, board),
    checkMainDiagonal(board),
    checkTheOtherDiagonal(board),
  ];
  if (results.some(isX)) return 'x';
  if (results.some(isO)) return 'o';
  return null;
}

// eg: [[0, 0], [1, 0], [0 2]] for:
//
//    0  1  2
// 0  .  x  .
// 1  .  o  x
// 2  x  o  x
function getFreeCells(board) {
  let freeCells = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (isNothing(cell)) freeCells.push([i, j]);
    });
  });
  return freeCells;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getSymbol(board, position) {
  return board[position[0]][position[1]];
}

// does not mutate, returns a new board
function setSymbol(board, position, symbol) {
  const boardClone = [...board.map(row => [...row])];
  boardClone[position[0]][position[1]] = symbol;
  return boardClone;
}

export function play(board, position, player) {
  const symbol = getSymbol(board, position);
  if (!isNothing(symbol)) throw new Error('Woah, you cannot play there!');
  return setSymbol(board, position, player);
}

// returns a new board with a new move
export function playRandomly(board, player) {
  if (isFull(board)) throw new Error('Cannot play on full board!');
  const freeCells = getFreeCells(board);
  const randomIndex = getRandomInt(0, freeCells.length);
  const position = freeCells[randomIndex];
  return play(board, position, player);
}

export const EMPTY_BOARD = [
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.'],
];

export const SOME_BOARD = [
  ['x', 'o', '.'],
  ['x', 'x', 'o'],
  ['.', 'o', '.'],
]
