const ROWS = 25;
const COLS = 30;
// BOARD SIZE (px) IN Game.css
const INITIAL_DIRECTION = "RIGHT";
const INITIAL_SPEED = 200;
const INITIAL_SPEED_INCREASE = 100;
const FPS = 60;
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

const INITIAL_EMPTY_BOARD = {
    rows: ROWS,
    cols: COLS,
    cells: cells,
};

module.exports = {
    INITIAL_DIRECTION,
    INITIAL_SPEED,
    INITIAL_SPEED_INCREASE,
    FPS,
    INITIAL_EMPTY_BOARD,
};
