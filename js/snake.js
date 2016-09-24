const Coord = require('./coord');

class Snake {
  constructor (board) {
    this.direction = "N"; // direction is key in DIRS (i.e. "N")
    this.segments = [ new Coord(Math.floor(board.size / 2),
                                Math.floor(board.size / 2)),
                      new Coord(Math.floor(board.size / 2),
                                Math.floor(board.size / 2) + 1),
                      new Coord(Math.floor(board.size / 2),
                                Math.floor(board.size / 2) + 2)];
    this.setHead();
  }

  move () {
    this.grow();
    this.segments.pop();
    this.setHead();
  }

  turn (newDirection) {
    if (Snake.DIRS[this.direction].isOpposite(Snake.DIRS[newDirection])) {
      this.direction = this.direction;
    } else {
      this.direction = newDirection;
    }
  }

  nextMove () {
    const incCoord = Snake.DIRS[this.direction];
    return this.segments[0].plus(incCoord);
  }

  grow () {
    this.segments.unshift(this.nextMove());
  }

  setHead () {
    this.head = this.segments[0];
  }

}

Snake.DIRS = {  "N": new Coord(0, -1),
                "S": new Coord(0, 1),
                "E": new Coord(1, 0),
                "W": new Coord(-1, 0)};

module.exports = Snake;
