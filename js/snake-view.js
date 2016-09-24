const Board = require('./board.js');

class View {
  constructor ($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.setupBoard();

    this.intervalID = setInterval(this.step.bind(this), 100);
  }

  handleKeyEvent (e) {
    $(window).off();
    const direction = e.keyCode;
    this.board.snake.turn(View.MOVES[direction]);
  }

  setupBoard () {
    const $board = $('<ul>');
    $board.addClass('group');
    this.$el.append($board);

    for (let i = 0; i < this.board.size * this.board.size; i++) {
      $board.append($('<li>').addClass('tile').addClass('empty'));
    }
  }

  step () {
    if (this.lost()) {
      window.alert('You lost!');
      clearInterval(this.intervalID);
    } else {
      $(window).keydown(function(e) {
        this.handleKeyEvent(e);
      }.bind(this));
      this.board.snake.move();
      this.board.eatsApple();
      this.drawBoard();
    }
  }

  lost() {
    if (this.board.snake.hitSelf() || this.board.snake.hitWall()) {
      return true;
    } else {
      return false;
    }
  }

  getLiIndex (coord) {
    return coord.yPos * this.board.size + coord.xPos;
  }

  drawBoard () {
    $('li').removeClass();
    const snakeSegs = this.board.snake.segments;
    const appleIdx = this.getLiIndex(this.board.apple.coord);
    $($('li').get(appleIdx)).addClass('apple');

    for (let i = 0; i < snakeSegs.length; i++) {
      let snakeIdx = this.getLiIndex(snakeSegs[i]);
      let snakeLi = $($('li').get(snakeIdx));

      if (i === 0) {
        snakeLi.addClass('snake-head');
      }

      snakeLi.addClass('snake');
    }
  }
}

View.MOVES = { 37: "W", 38: "N", 39: "E", 40: "S" };
            // left: 37, up: 38, right: 39, down: 40

module.exports = View;
