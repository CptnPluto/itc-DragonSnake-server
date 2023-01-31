// Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_View/Coordinate_systems#example
// top left is 0, 0
// col increases to the right, row increases down

// cell: {row, col, isHead, isTail, isFood}
// board: {rows: number, cols: number, cells: cell[]}

// coordinate: {row: number, col: number}
// snake: coordinate[]
// food: coordinate
// direction: "UP", "DOWN", "LEFT", or "RIGHT"

// STATES:
// direction
// board
// snake
// food
