const { INITIAL_SPEED, INITIAL_EMPTY_BOARD } = require("../game_logic/config");
const { insertFood, insertSnake } = require("../game_logic/board");
const { getRandomFood, isFood } = require("../game_logic/food");
const {
  checkSelfCollision,
  checkWallCollision,
  eat,
  move,
} = require("../game_logic/snake");

// on ("key", player1), direction1 = key
// on ("key", player2), direction2 = key
const run = (game, io, roomId) => {
  let {
    initialBoard,
    snake1,
    snake2,
    cells,
    food,
    direction1,
    direction2,
    score1,
    score2,
    winner,
  } = game;
  const interval = setInterval(() => {
    let freshCells = JSON.parse(JSON.stringify(INITIAL_EMPTY_BOARD.cells));
    insertFood(freshCells, food);
    if (isFood(snake1, food)) {
      snake1 = eat(snake1);
      score1++;
      const food = getRandomFood(initialBoard, snake1);
      insertFood(freshCells, food);
    }
    if (isFood(snake2, food)) {
      snake2 = eat(snake2);
      score2++;
      const food = getRandomFood(initialBoard, snake2);
      insertFood(freshCells, food);
    }
    snake1 = move(snake1, direction1);
    snake2 = move(snake2, direction2);
    freshCells = insertSnake(freshCells, snake1);
    freshCells = insertSnake(freshCells, snake2);
    if (
      checkWallCollision(snake1, initialBoard) ||
      checkSelfCollision(snake1)
    ) {
      winner = 2;
      clearInterval(interval);
      return;
    }
    if (
      checkWallCollision(snake2, initialBoard) ||
      checkSelfCollision(snake2)
    ) {
      winner = 1;
      clearInterval(interval);
      return;
    }
    io.to(roomId).emit("cells", freshCells);
  }, INITIAL_SPEED);
};

module.exports = run;
