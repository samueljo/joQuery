const Coord = require('./coord');

class Snake {
  constructor(board) {
    this.direction = "N"; // direction is key in DIRS (i.e. "N")
    this.segments = [ new Coord(Math.floor(board.size / 2),
                                Math.floor(board.size / 2)),
                      new Coord(Math.floor(board.size / 2),
                                Math.floor(board.size / 2) + 1),
                      new Coord(Math.floor(board.size / 2),
                                Math.floor(board.size / 2) + 2),
                      new Coord(Math.floor(board.size / 2),
                                Math.floor(board.size / 2) + 3),
                      new Coord(Math.floor(board.size / 2),
                                Math.floor(board.size / 2) + 4)];
    this.setHead();
  }

  move() {
    this.segments.unshift(this.nextMoveCoord());
    if (this.growing) {
      this.growing--;
    } else {
      this.segments.pop();
    }
    this.setHead();
  }

  turn(newDirection) {
    if (Snake.DIRS[this.direction].isOpposite(Snake.DIRS[newDirection])) {
      this.direction = this.direction;
    } else {
      this.direction = newDirection;
    }
  }

  hitSelf() {
    for (let i = 0; i < this.segments.length; i++) {
      if (this.segments[i].equals(this.nextMoveCoord())) {
        return true;
      }
    }
    return false;
  }

  hitWall() {
    const newCoord = this.nextMoveCoord();

    if (
      newCoord.xPos < 0 ||
      newCoord.yPos < 0 ||
      newCoord.xPos > 19 ||
      newCoord.yPos > 19
    ) {
      return true;
    } else {
      return false;
    }
  }

  nextMoveCoord() {
    const incCoord = Snake.DIRS[this.direction];
    return this.segments[0].plus(incCoord);
  }

  grow() {
    this.growing = 3;
  }

  setHead() {
    this.head = this.segments[0];
  }

}

Snake.DIRS = {  "N": new Coord(0, -1),
                "S": new Coord(0, 1),
                "E": new Coord(1, 0),
                "W": new Coord(-1, 0)};

module.exports = Snake;
