const Coord = require('./coord');

class Snake {
  constructor (board) {
    this.direction = "N"; // direction is key in DIRS (i.e. "N")
    this.segments = [ new Coord(Math.floor(board.size / 2),
                                Math.floor(board.size / 2))];
  }

  move () {
    const incCoord = Snake.DIRS[this.direction];
    this.segments.unshift(this.segments[0].plus(incCoord));
    this.segments.pop();
  }

  turn (newDirection) {
    this.direction = newDirection;
  }
}

Snake.DIRS = {  "N": new Coord(0, 1),
                "S": new Coord(0, -1),
                "E": new Coord(1, 0),
                "W": new Coord(-1, 0)};

module.exports = Snake;
