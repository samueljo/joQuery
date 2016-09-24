class Coord {
  constructor (xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  plus (otherCoord) {
    const newX = this.xPos + otherCoord.xPos;
    const newY = this.yPos + otherCoord.yPos;
    const newCoord = new Coord(newX, newY);
    return newCoord;
  }

  equals (otherCoord) {
    return ((this.xPos === otherCoord.xPos) && (this.yPos === otherCoord.yPos));
  }

  isOpposite (otherCoord) {
    if (otherCoord.xPos + this.xPos === 0 && otherCoord.yPos + this.yPos === 0) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Coord;
