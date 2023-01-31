import { getMiddle, getRandomDirection, insertSnake } from "./board";
import { move } from "./snake";

describe("get middle coordinate of board", () => {
  test("3x3 board", () => {
    const board = { width: 3, height: 3 };
    const middle = getMiddle(board);
    expect(middle).toEqual({ row: 2, col: 2 });
  });
  test("21x21 board", () => {
    const board = { width: 21, height: 21 };
    const middle = getMiddle(board);
    expect(middle).toEqual({ row: 11, col: 11 });
  });
});

describe("get random direction", () => {
  test("get random direction", () => {
    const direction = getRandomDirection();
    expect(direction).toMatch(/UP|DOWN|LEFT|RIGHT/);
  });
});

describe("inserting snakes", () => {
  test("snake inserted at top left", () => {
    const ROWS = 3;
    const COLS = 3;
    const cells = [];

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        cells.push({
          row: i,
          col: j,
          isHead: false,
          isTail: false,
          isFood: false,
        });
      }
    }

    const snake = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ];
    const newBoard = insertSnake(cells, snake);
    expect(newBoard).toEqual([
      { row: 0, col: 0, isTail: true, isHead: false, isFood: false },
      { row: 0, col: 1, isTail: true, isHead: false, isFood: false },
      { row: 0, col: 2, isTail: false, isHead: true, isFood: false },
      { row: 1, col: 0, isTail: false, isHead: false, isFood: false },
      { row: 1, col: 1, isTail: false, isHead: false, isFood: false },
      { row: 1, col: 2, isTail: false, isHead: false, isFood: false },
      { row: 2, col: 0, isTail: false, isHead: false, isFood: false },
      { row: 2, col: 1, isTail: false, isHead: false, isFood: false },
      { row: 2, col: 2, isTail: false, isHead: false, isFood: false },
    ]);
  });
});

describe("inserting and move snake", () => {
  test("snake inserted at top left and moved right", () => {
    const ROWS = 4;
    const COLS = 4;
    const cells = [];

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        cells.push({
          row: i,
          col: j,
          isHead: false,
          isTail: false,
          isFood: false,
        });
      }
    }

    const snake = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ];
    const movedSnake = move(snake, "RIGHT");
    const newBoard = insertSnake(cells, movedSnake);
    expect(newBoard).toEqual([
      { row: 0, col: 0, isTail: false, isHead: false, isFood: false },
      { row: 0, col: 1, isTail: true, isHead: false, isFood: false },
      { row: 0, col: 2, isTail: true, isHead: false, isFood: false },
      { row: 0, col: 3, isTail: false, isHead: true, isFood: false },
      { row: 1, col: 0, isTail: false, isHead: false, isFood: false },
      { row: 1, col: 1, isTail: false, isHead: false, isFood: false },
      { row: 1, col: 2, isTail: false, isHead: false, isFood: false },
      { row: 1, col: 3, isTail: false, isHead: false, isFood: false },
      { row: 2, col: 0, isTail: false, isHead: false, isFood: false },
      { row: 2, col: 1, isTail: false, isHead: false, isFood: false },
      { row: 2, col: 2, isTail: false, isHead: false, isFood: false },
      { row: 2, col: 3, isTail: false, isHead: false, isFood: false },
      { row: 3, col: 0, isTail: false, isHead: false, isFood: false },
      { row: 3, col: 1, isTail: false, isHead: false, isFood: false },
      { row: 3, col: 2, isTail: false, isHead: false, isFood: false },
      { row: 3, col: 3, isTail: false, isHead: false, isFood: false },
    ]);
  });
});
