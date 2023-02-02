const { INITIAL_SPEED, INITIAL_EMPTY_BOARD } = require("../game_logic/config");
const { insertFood, insertSnake } = require("../game_logic/board");
const { getRandomFood, isFood } = require("../game_logic/food");
const {
  checkSelfCollision,
  checkWallCollision,
  eat,
  move,
} = require("../game_logic/snake");

const run = (game, io, roomId, client) => {
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

  const clients = [];
  const roomMap = io.sockets.adapter.rooms.get(roomId);
  roomMap.forEach((id) => {
    clients.push(io.sockets.sockets.get(id));
  });

  clients[0].on(
    "direction",
    ({ directionEntered, playerNum, playerRoomId }) => {
      if (playerRoomId !== roomId)
        return console.log("roomId:", roomId, "playerRoomId:", playerRoomId);
      console.log("playerNum (server/game.js): ", playerNum);

      direction1 = directionEntered;
    }
  );

  clients[1].on(
    "direction",
    ({ directionEntered, playerNum, playerRoomId }) => {
      if (playerRoomId !== roomId)
        return console.log("roomId:", roomId, "playerRoomId:", playerRoomId);
      console.log("playerNum (server/game.js): ", playerNum);
      direction2 = directionEntered;
    }
  );

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
      io.to(roomId).emit("win", winner);
      clearInterval(interval);
      return;
    }
    if (
      checkWallCollision(snake2, initialBoard) ||
      checkSelfCollision(snake2)
    ) {
      winner = 1;
      io.to(roomId).emit("win", winner);
      clearInterval(interval);
      return;
    }
    io.to(roomId).emit("cells", freshCells);
  }, INITIAL_SPEED);
};

module.exports = run;
