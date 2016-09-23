class Coord {
  constructor (xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  plus (otherCoord) {
    const newX = this.xPos + otherCoord.xPos;
    const newY = this.yPos + otherCoord.yPos;
    const newCoord = new Coord(newX, newY);
    if (newCoord.isValid()) {
      return newCoord;
    } else {
      window.alert("You lose!");
    }
  }

  isValid () {
    if (this.xPos < 0 || this.yPos < 0 || this.xPos > 19 || this.yPos > 19) {
      return false;
    } else {
      return true;
    }
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
