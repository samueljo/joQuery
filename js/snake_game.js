const Board = require('./board.js');

class SnakeGame {
  constructor() {
    this.board = new Board(20);
    this.points = 0;
  }
}

module.exports = SnakeGame;
