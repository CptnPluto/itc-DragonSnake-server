const {
  INITIAL_EMPTY_BOARD,
  INITIAL_DIRECTION,
} = require("../game_logic/config");
const { getRandomFood } = require("../game_logic/food");
const { insertFood, insertSnake } = require("../game_logic/board");

let initialBoard = JSON.parse(JSON.stringify(INITIAL_EMPTY_BOARD));
let snake1 = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
];
let snake2 = [
  { row: 5, col: 0 },
  { row: 5, col: 1 },
  { row: 5, col: 2 },
];
let cells = initialBoard.cells;
let food = getRandomFood(initialBoard, [...snake1, ...snake2]);
insertFood(cells, food);
insertSnake(cells, snake1);
insertSnake(cells, snake2);
const direction1 = INITIAL_DIRECTION;
const direction2 = INITIAL_DIRECTION;
let score1 = 0;
let score2 = 0;
let winner = null;

const game = {
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
};

module.exports = game;
