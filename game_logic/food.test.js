import { getRandomFood } from "./food";

describe("food", () => {
  test("food is on the board", () => {
    const board = { width: 5, height: 5 };
    const snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];
    const food = getRandomFood(board, snake);
    expect(food.x).toBeGreaterThanOrEqual(0);
    expect(food.x).toBeLessThan(board.width);
    expect(food.y).toBeGreaterThanOrEqual(0);
    expect(food.y).toBeLessThan(board.height);
  });
  test("food is not on snake", () => {
    const board = { width: 5, height: 5 };
    const snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];
    const food = getRandomFood(board, snake);
    snake.forEach((segment) => {
      expect(segment).not.toEqual(food);
    });
  });
});
