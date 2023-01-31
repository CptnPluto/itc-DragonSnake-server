import { checkSelfCollision, checkWallCollision, eat, move } from "./snake";

describe("move snake", () => {
  test("move right", () => {
    const snake = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ];
    const newSnake = move(snake, "RIGHT");
    expect(newSnake).toEqual([
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ]);
  });
  test("move left", () => {
    const snake = [
      { row: 3, col: 3 },
      { row: 3, col: 4 },
    ];
    const newSnake = move(snake, "LEFT");
    expect(newSnake).toEqual([
      { row: 3, col: 4 },
      { row: 3, col: 3 },
    ]);
  });
  test("move up", () => {
    const snake = [
      { row: 4, col: 4 },
      { row: 3, col: 4 },
    ];
    const newSnake = move(snake, "UP");
    expect(newSnake).toEqual([
      { row: 3, col: 4 },
      { row: 2, col: 4 },
    ]);
  });
  test("move down", () => {
    const snake = [
      { row: 4, col: 5 },
      { row: 5, col: 5 },
    ];
    const newSnake = move(snake, "DOWN");
    expect(newSnake).toEqual([
      { row: 5, col: 5 },
      { row: 6, col: 5 },
    ]);
  });
  test("move right 3 times", () => {
    const snake = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ];
    const newSnake = move(snake, "RIGHT");
    const newSnake2 = move(newSnake, "RIGHT");
    const newSnake3 = move(newSnake2, "RIGHT");
    expect(newSnake3).toEqual([
      { row: 0, col: 3 },
      { row: 0, col: 4 },
    ]);
  });
});

describe("check wall collision", () => {
  test("no collision", () => {
    const board = { cols: 5, rows: 5 };
    const snake = [
      { row: 2, col: 0 },
      { row: 3, col: 0 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(false);
  });
  test("no collision at left edge", () => {
    const board = { cols: 5, rows: 5 };
    const snake = [
      { row: 1, col: 4 },
      { row: 0, col: 4 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(false);
  });
  test("right wall collision", () => {
    const board = { cols: 3, rows: 3 };
    const snake = [
      { row: 2, col: 0 },
      { row: 3, col: 0 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(true);
  });
  test("left wall collision", () => {
    const board = { cols: 21, rows: 21 };
    const snake = [
      { row: 0, col: 15 },
      { row: -1, col: 15 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(true);
  });
  test("bottom wall collision", () => {
    const board = { cols: 21, rows: 21 };
    const snake = [
      { row: 12, col: 19 },
      { row: 12, col: 21 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(true);
  });
  test("top wall collision", () => {
    const board = { cols: 7, rows: 7 };
    const snake = [
      { row: 4, col: 0 },
      { row: 4, col: -1 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(true);
  });
});

describe("eat", () => {
  test("check that snake has an extra tail after eating", () => {
    const snake = [
      { row: 3, col: 4 },
      { row: 3, col: 5 },
    ];
    const newSnake = eat(snake);
    expect(newSnake).toEqual([
      { row: 3, col: 4 },
      { row: 3, col: 4 },
      { row: 3, col: 5 },
    ]);
  });
});

describe("check self collision", () => {
  test("no self collision", () => {
    const snake = [
      { row: 1, col: 3 },
      { row: 2, col: 3 },
      { row: 3, col: 3 },
      { row: 4, col: 3 },
      { row: 5, col: 3 },
      { row: 6, col: 3 },
      { row: 7, col: 3 },
      { row: 8, col: 3 },
      { row: 9, col: 3 },
    ];
    const isSelfCollision = checkSelfCollision(snake);
    expect(isSelfCollision).toBe(false);
  });
  test("snake ran into its tail", () => {
    const snake = [
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 3, col: 3 },
      { row: 4, col: 3 },
      { row: 4, col: 2 },
      { row: 3, col: 2 },
      { row: 2, col: 2 },
    ];
    const isSelfCollision = checkSelfCollision(snake);
    expect(isSelfCollision).toBe(true);
  });
  test("snake ran into its body", () => {
    const snake = [
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 3, col: 3 },
      { row: 4, col: 3 },
      { row: 4, col: 2 },
      { row: 3, col: 2 },
      { row: 2, col: 2 },
    ];
    const isSelfCollision = checkSelfCollision(snake);
    expect(isSelfCollision).toBe(true);
  });
});

describe("eat and move", () => {
  test("snake eats and moves right", () => {
    const snake = [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
    ];
    const snakeThatAte = eat(snake);
    const snakeThatAteAndMoved = move(snakeThatAte, "RIGHT");
    expect(snakeThatAteAndMoved).toEqual([
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ]);
  });
  test("snake eats and moves left", () => {
    const snake = [
      { row: 10, col: 10 },
      { row: 11, col: 10 },
      { row: 12, col: 10 },
    ];
    const snakeThatAte = eat(snake);
    const snakeThatAteAndMoved = move(snakeThatAte, "LEFT");
    expect(snakeThatAteAndMoved).toEqual([
      { row: 10, col: 10 },
      { row: 11, col: 10 },
      { row: 12, col: 10 },
      { row: 12, col: 9 },
    ]);
  });
});
