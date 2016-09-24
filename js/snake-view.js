const Board = require('./board.js');

class View {
  constructor ($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.points = 0;
    this.setupBoard();

    this.playing = false;
  }

  handleKeyEvent (e) {
    console.log(this.intervalID);
    $(window).off();
    if (e.keyCode === 32 && this.playing) {
      this.playing = false;
      console.log("pause");
      clearInterval(this.intervalID);
    } else if (e.keyCode === 32 && !this.playing) {
      console.log("resume");
      this.playing = true;
      this.intervalID = setInterval(this.step.bind(this), 100);
      return;
    } else if (Object.keys(View.MOVES).includes(`${e.keyCode}`)) {
      const direction = e.keyCode;
      this.board.snake.turn(View.MOVES[direction]);
    }
    $(window).keydown(function(e) {
      this.handleKeyEvent(e);
    }.bind(this));
  }

  setupBoard () {
    const $board = $('<ul>');
    $board.addClass('group');
    this.$el.append($board);

    for (let i = 0; i < this.board.size * this.board.size; i++) {
      $board.append($('<li>').addClass('tile').addClass('empty'));
    }
    const points = this.points;
    const $points = $('<h2>');
    $('.grid').append($points);
    $points.addClass('points');
    $points.text(`${points}`);
  }

  step () {
    if (this.lost()) {
      clearInterval(this.intervalID);
      window.alert('You lost!');
    } else {
      $(window).keydown(function(e) {
        this.handleKeyEvent(e);
      }.bind(this));
      this.board.snake.move();
      if (this.board.eatsApple()) {
        this.points += 10;
      }
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
    const points = this.points;
    $('.points').text(`${points}`);

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
