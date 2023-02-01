const { INITIAL_SPEED } = require("../game_logic/config");
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
  insertFood(cells, food);
  const interval = setInterval(() => {
    if (isFood(snake1, food)) {
      snake1 = eat(snake1);
      score1++;
      const food = getRandomFood(initialBoard, snake1);
      insertFood(cells, food);
    }
    if (isFood(snake2, food)) {
      snake2 = eat(snake2);
      score2++;
      const food = getRandomFood(initialBoard, snake2);
      insertFood(cells, food);
    }
    snake1 = move(snake1, direction1);
    snake2 = move(snake2, direction2);
    cells = insertSnake(cells, snake1);
    cells = insertSnake(cells, snake2);
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
    io.to(roomId).emit("cells", cells);
  }, INITIAL_SPEED);
};

module.exports = run;
