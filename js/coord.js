class Coord {
  constructor (xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  plus (otherCoord) {
    const newX = this.xPos + otherCoord.xPos;
    const newY = this.yPos + otherCoord.yPos;
    return new Coord(newX, newY);
  }

  equals (otherCoord) {
    return ((this.xPos === otherCoord.xPos) && (this.yPos === otherCoord.yPos));
  }

  isOpposite () {

  }
}

module.exports = Coord;
