const Board = require('./board.js');

class View {
  constructor($el) {
    this.$el = $el;
    this.initialGameConfig();
  }

  initialGameConfig() {
    this.board = new Board(20);
    this.points = 0;
    this.setupBoard();
    this.playing = false;
  }

  restart() {
    this.$el.empty();
    this.initialGameConfig();
    this.drawBoard();
  }

  isValidDir(keyCode) {
    return Object.keys(View.MOVES).includes(keyCode);
  }

  handleKeyEvent(e) {
    console.log(this.intervalID);
    $l(window).off();
    if (e.keyCode === 32 && this.lost()) {
      this.restart();
      this.togglePause();
    } else if (e.keyCode === 32 && !this.lost()) {
      this.togglePause(e);
    } else if (this.isValidDir(e.keyCode.toString()) && this.playing) {
      const direction = e.keyCode;
      this.board.snake.turn(View.MOVES[direction]);
    } else {
      this.keyEvent();
    }
  }

  togglePause(e) {
    if (this.playing) {
      this.playing = false;
      clearInterval(this.intervalID);
      this.keyEvent();
      const $grid =
      this.$el.append($l('h3').addClass('notice pause').text('Paused'));
    } else {
      this.playing = true;
      this.intervalID = setInterval(this.step.bind(this), 75);
      $l('.notice').remove();
    }

  }

  keyEvent() {
    $l(window).keydown(function(event) {
      this.handleKeyEvent(event);
    }.bind(this));
  }

  setupBoard() {
    this.$el.append($l('h3').addClass('notice start')
      .text('Hit Space to Start'));

    const $board = $l('ul');
    $board.addClass('group');
    this.$el.append($board);

    for (let i = 0; i < this.board.size * this.board.size; i++) {
      $board.append($l('li').addClass('tile').addClass('empty'));
    }

    const points = this.points;
    const $points = $l('h2');
    this.$el.append($points);
    $points.addClass('points');
    $points.text(`${points}`);
  }

  step() {
    if (this.lost()) {
      clearInterval(this.intervalID);
      window.alert('You lost!');
      this.$el.append($l('h3').addClass('notice restart').text('Restart'));
      this.keyEvent();
    } else {
      this.keyEvent();
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

  getLiIndex(coord) {
    return coord.yPos * this.board.size + coord.xPos;
  }

  drawBoard() {
    $l('.points').text(`${ this.points }`);

    const snakeSegs = this.board.snake.segments;
    const appleIdx = this.getLiIndex(this.board.apple.coord);

    $l('li').removeClass();

    $l($l('li').get(appleIdx)).addClass('apple');

    for (let i = 0; i < snakeSegs.length; i++) {
      let snakeIdx = this.getLiIndex(snakeSegs[i]);
      let snakeLi = $l($l('li').get(snakeIdx));

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
