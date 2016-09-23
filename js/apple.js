const Coord = require('./coord');

class Apple {
  constructor(boardSize) {
    min = Math.ceil(0);
    max = Math.floor(boardSize);
    const xPos = Math.floor(Math.random() * (max - min)) + min;
    const yPos = Math.floor(Math.random() * (max - min)) + min;
    this.coord = new Coord(xPos, yPos);
  }

  
}
