class Coord {
  constructor(xPos, yPos, boardSize) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.boardSize = boardSize;
  }

  plus(otherCoord) {
    const newX = this.xPos + otherCoord.xPos;
    const newY = this.yPos + otherCoord.yPos;
    const newCoord = new Coord(newX, newY);
    return newCoord;
  }

  equals(otherCoord) {
    return ((this.xPos === otherCoord.xPos) && (this.yPos === otherCoord.yPos));
  }

  isOpposite(otherCoord) {
    if (otherCoord.xPos + this.xPos === 0 && otherCoord.yPos + this.yPos === 0) {
      return true;
    } else {
      return false;
    }
  }

  static randomCoord(boardSize) {
    const min = Math.ceil(0);
    const max = Math.floor(boardSize);
    const xPos = Math.floor(Math.random() * (max - min)) + min;
    const yPos = Math.floor(Math.random() * (max - min)) + min;
    return new Coord(xPos, yPos);
  }
}

module.exports = Coord;
