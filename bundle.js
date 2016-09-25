/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	
	$( () => {
	  const view = new View($('.grid'));
	  view.drawBoard();
	  $(window).keydown(function(e) {
	    view.handleKeyEvent(e);
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	
	// Need to modularize 'SnakeGame' to remove some functionality from view
	
	class View {
	  constructor($el) {
	    this.$el = $el;
	    this.board = new Board(20);
	    this.points = 0;
	    this.setupBoard();
	
	    this.playing = false;
	  }
	
	  isValidDir(keyCode) {
	    return Object.keys(View.MOVES).includes(keyCode);
	  }
	
	  handleKeyEvent(e) {
	    console.log(this.intervalID);
	    $(window).off();
	    if (e.keyCode === 32) {
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
	      // Pauses the game
	      this.playing = false;
	      clearInterval(this.intervalID);
	      this.keyEvent();
	      const $grid =
	      $('.grid').append($('<h3>').addClass('pause').text('Paused'));
	    } else {
	      // Resumes the game
	      this.playing = true;
	      this.intervalID = setInterval(this.step.bind(this), 75);
	      $('.pause').remove();
	    }
	
	  }
	
	  keyEvent() {
	    $(window).keydown(function(event) {
	      this.handleKeyEvent(event);
	    }.bind(this));
	  }
	
	  setupBoard() {
	    const $board = $('<ul>');
	    $board.addClass('group');
	    this.$el.append($board);
	
	    for (let i = 0; i < this.board.size * this.board.size; i++) {
	      $board.append($('<li>').addClass('tile').addClass('empty'));
	    }
	
	    const points = this.points;
	    const $points = $('<h2>');
	    this.$el.append($points);
	    $points.addClass('points');
	    $points.text(`${points}`);
	
	    // Restart button
	  }
	
	  step() {
	    if (this.lost()) {
	      clearInterval(this.intervalID);
	      window.alert('You lost!');
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
	    $('.points').text(`${ this.points }`);
	
	    const snakeSegs = this.board.snake.segments;
	    const appleIdx = this.getLiIndex(this.board.apple.coord);
	
	    $('li').removeClass();
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);
	const Apple = __webpack_require__(5);
	
	class Board {
	  constructor(size) {
	    this.size = size; // length of (square) board
	    this.snake = new Snake(this);
	    this.addApple();
	  }
	
	  isValidApple(coord) {
	    for (let i = 0; i < this.snake.segments.length; i++) {
	      if (this.snake.segments[i].equals(coord)) {
	        return false;
	      }
	    }
	    return true;
	  }
	
	  addApple() {
	    this.apple = new Apple(this.size);
	    while (!this.isValidApple(this.apple.coord)) {
	      this.apple = new Apple(this.size);
	    }
	  }
	
	  eatsApple() {
	    if (this.snake.segments[0].equals(this.apple.coord)) {
	      this.snake.grow();
	      this.addApple();
	      return true;
	    }
	    return false;
	  }
	}
	
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	
	class Snake {
	  constructor(board) {
	    this.direction = "N"; // direction is key in DIRS (i.e. "N")
	    this.segments = [ new Coord(Math.floor(board.size / 2),
	                                Math.floor(board.size / 2)),
	                      new Coord(Math.floor(board.size / 2),
	                                Math.floor(board.size / 2) + 1),
	                      new Coord(Math.floor(board.size / 2),
	                                Math.floor(board.size / 2) + 2),
	                      new Coord(Math.floor(board.size / 2),
	                                Math.floor(board.size / 2) + 3),
	                      new Coord(Math.floor(board.size / 2),
	                                Math.floor(board.size / 2) + 4)];
	    this.setHead();
	  }
	
	  move() {
	    this.segments.unshift(this.nextMoveCoord());
	    if (this.growing) {
	      this.growing--;
	    } else {
	      this.segments.pop();
	    }
	    this.setHead();
	  }
	
	  turn(newDirection) {
	    if (Snake.DIRS[this.direction].isOpposite(Snake.DIRS[newDirection])) {
	      this.direction = this.direction;
	    } else {
	      this.direction = newDirection;
	    }
	  }
	
	  hitSelf() {
	    for (let i = 0; i < this.segments.length; i++) {
	      if (this.segments[i].equals(this.nextMoveCoord())) {
	        return true;
	      }
	    }
	    return false;
	  }
	
	  hitWall() {
	    const newCoord = this.nextMoveCoord();
	
	    if (
	      newCoord.xPos < 0 ||
	      newCoord.yPos < 0 ||
	      newCoord.xPos > 19 ||
	      newCoord.yPos > 19
	    ) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  nextMoveCoord() {
	    const incCoord = Snake.DIRS[this.direction];
	    return this.segments[0].plus(incCoord);
	  }
	
	  grow() {
	    this.growing = 3;
	  }
	
	  setHead() {
	    this.head = this.segments[0];
	  }
	
	}
	
	Snake.DIRS = {  "N": new Coord(0, -1),
	                "S": new Coord(0, 1),
	                "E": new Coord(1, 0),
	                "W": new Coord(-1, 0)};
	
	module.exports = Snake;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	
	class Apple {
	  constructor(boardSize) {
	    this.coord = Coord.randomCoord(boardSize);
	  }
	}
	
	module.exports = Apple;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map