const Coord = require('./coord');

class Apple {
  constructor (board) {
    min = Math.ceil(0);
    max = Math.floor(board.size);
    const xPos = Math.floor(Math.random() * (max - min)) + min;
    const yPos = Math.floor(Math.random() * (max - min)) + min;
    this.coord = new Coord(xPos, yPos);
  }
}
