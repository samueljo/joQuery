const Snake = require('./snake.js');

class Board {
  constructor (size) {
    this.size = size; // length of (square) board
    this.snake = new Snake(this);
  }
}

module.exports = Board;
