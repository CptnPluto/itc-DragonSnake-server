const { INITIAL_SPEED } = require("../game_logic/config");
const { insertFood, insertSnake } = require("../game_logic/board");
const { getRandomFood, isFood } = require("../game_logic/food");

// on ("key", player1), direction1 = key
// on ("key", player2), direction2 = key

const interval = setInterval(() => {
  insertFood(cells, food);

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
  if (checkWallCollision(snake1, initialBoard) || checkSelfCollision(snake1)) {
    winner = 2;
    clearInterval(interval);
    return;
  }
  if (checkWallCollision(snake2, initialBoard) || checkSelfCollision(snake2)) {
    winner = 1;
    clearInterval(interval);
    return;
  }
}, INITIAL_SPEED);
