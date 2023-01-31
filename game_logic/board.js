// export function createBoard(rows, cols, snake)

function insertSnake(cells, snake) {
  // loop through snake
  for (let segmentI = 0; segmentI < snake.length; segmentI++) {
    // loop through cells
    for (let cellsI = 0; cellsI < cells.length; cellsI++) {
      // if the cell matches the snake segment
      if (
        cells[cellsI].row === snake[segmentI].row &&
        cells[cellsI].col === snake[segmentI].col
      ) {
        // if its the last segment, it's the head
        if (segmentI === snake.length - 1) {
          cells[cellsI].isHead = true;
          return cells;
          // otherwise, it's the tail
        } else {
          cells[cellsI].isTail = true;
        }
      }
    }
  }
  return cells;
}

function insertFood(cells, food) {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].row === food.row && cells[i].col === food.col) {
      cells[i].isFood = true;
      return cells;
    }
  }
}

function getMiddle(board) {
  return {
    row: Math.ceil(board.width / 2),
    col: Math.ceil(board.height / 2),
  };
}

function getRandomDirection() {
  const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
  const randomIndex = Math.floor(Math.random() * directions.length);
  return directions[randomIndex];
}

module.exports = { getRandomDirection, getMiddle, insertFood, insertSnake };
