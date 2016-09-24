const Coord = require('./coord');

class Apple {
  constructor (boardSize) {
    this.coord = Coord.randomCoord(boardSize);
  }
}

module.exports = Apple;
