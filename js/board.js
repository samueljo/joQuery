const Snake = require('./snake.js');
const Apple = require('./apple.js');

class Board {
  constructor (size) {
    this.size = size; // length of (square) board
    this.snake = new Snake(this);
    this.addApple();
  }

  isValidApple (coord) {
    this.snake.segments.forEach ( (segment) => {
      if (segment.equals(coord)) {
        return false;
      }
    });
    return true;
  }

  addApple () {
    this.apple = new Apple(this.size);
    while (!this.isValidApple(this.apple.coord)) {
      this.apple = new Apple(this.size);
    }
  }

  eatsApple () {
    if (this.snake.segments[0].equals(this.apple.coord)) {
      this.snake.grow();
      this.addApple();
    }
  }
}

module.exports = Board;
