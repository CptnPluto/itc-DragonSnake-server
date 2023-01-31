function getRandomFood(board, snake) {
  const food = {
    col: Math.floor(Math.random() * board.cols),
    row: Math.floor(Math.random() * board.rows),
  };
  return snake.some(
    (segment) => segment.col === food.col && segment.row === food.row
  )
    ? getRandomFood(board, snake)
    : food;
}

function isFood(snake, food) {
  return (
    snake[snake.length - 1].row === food.row &&
    snake[snake.length - 1].col === food.col
  );
}

module.exports = { getRandomFood, isFood };
