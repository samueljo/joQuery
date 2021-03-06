const $jo = require('./../joQuery/lib/main');
const Board = require('./board.js');

class View {
  constructor($) {
    this.$jo = $;
    this.initialGameConfig();
    this.eventFunction = this.handleKeyEvent;
    this.keyEvent();
  }

  initialGameConfig() {
    this.board = new Board(20);
    this.points = 0;
    this.setupBoard();
    this.playing = false;
  }

  restart() {
    this.$jo.empty();
    this.initialGameConfig();
    this.drawBoard();
  }

  isValidDir(keyCode) {
    return Object.keys(View.MOVES).includes(keyCode);
  }

  handleKeyEvent(e) {
    if (e.keyCode === 32 && this.lost()) {
      this.restart();
    } else if (e.keyCode === 32 && !this.playing) {
      this.start();
    } else if (this.isValidDir(e.keyCode.toString()) && this.playing) {
      const direction = e.keyCode;
      this.board.snake.turn(View.MOVES[direction]);
    }
  }

  start(e) {
    this.playing = true;
    this.intervalID = window.setInterval(this.step.bind(this), 75);
    $jo('.notice').remove();
  }

  keyEvent() {
    this.eventFunction = this.handleKeyEvent;
    $jo(window).on("keydown", function(e) {
      this.eventFunction(e);
    }.bind(this));

    $jo('.close').on('click', function(e) {
      this.handleCloseModal(e);
    }.bind(this));

    $jo('.leader-link').on('click', function(e) {
      this.handleOpenModal(e);
    }.bind(this));
  }

  handleCloseModal(e) {
    $jo('.modal').addClass('hidden');
  }

  handleOpenModal(e) {
    $jo('.modal').removeClass('hidden');
  }

  setupBoard() {
    const $h3 = $jo('<h3>');
    $h3.addClass('notice start');
    $h3.text('Hit Space to Start');
    this.$jo.append($h3);

    const $board = $jo('<ul>');
    $board.addClass('board group');

    for (let i = 0; i < this.board.size * this.board.size; i++) {
      let $li = $jo('<li>');
      $li.addClass('tile');
      $board.append($li);
    }

    this.$jo.append($board);

    const points = this.points;
    const $points = $jo('<h2>');
    $points.addClass('points');
    $points.text(`${points}`);
    this.$jo.append($points);
  }

  step() {
    if (this.lost()) {
      let isNewHighScore = (this.points > localStorage.getItem('snakeScore'));
      if (!localStorage.getItem('snakeScore') || isNewHighScore) {
        localStorage.setItem('snakeScore', this.points);
      }
      $jo('.highscore').text(`Highscore: ${localStorage.getItem('snakeScore')}`);
      window.clearInterval(this.intervalId);
      window.clearInterval(this.intervalID);
      window.alert('You lost!');
      const $h3 = $jo('<h3>');
      $h3.addClass('notice restart');
      $h3.text('Restart');
      this.$jo.append($h3);
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
    $jo('.points').text(`${ this.points }`);

    const snakeSegs = this.board.snake.segments;
    const appleIdx = this.getLiIndex(this.board.apple.coord);

    $jo('li').removeClass('snake-head');
    $jo('li').removeClass('snake');
    $jo('li').removeClass('apple');

    const apple = $jo($jo('li').get(appleIdx));
    apple.addClass('apple');

    for (let i = 0; i < snakeSegs.length; i++) {
      let snakeIdx = this.getLiIndex(snakeSegs[i]);
      let snakeLi = $jo($jo('li').get(snakeIdx));

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
