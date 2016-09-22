const Snake = require('./snake.js');

class Board {
  constructor (size) {
    this.snake = new Snake(board);
    this.size = size; // length of (square) board
  }
}

module.exports = Board;
