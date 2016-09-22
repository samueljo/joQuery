const Board = require('./board.js');

class View {
  constructor ($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.$el.keydown(function(e) {
      handleKeyEvent(e);
    }.bind(this));
    setInterval(this.step.bind(this), 500);
  }

  handleKeyEvent (e) {
    const direction = e.keyCode;
    this.board.snake.turn(direction);
  }

  step () {

  }
}

View.MOVES = { 37: "W", 38: "N", 39: "E", 40: "S" };
            // left: 37, up: 38, right: 39, down: 40
