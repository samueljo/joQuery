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
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	
	class View {
	  constructor ($el) {
	    this.$el = $el;
	    this.board = new Board(20);
	    this.setupBoard();
	
	    $(window).keydown(function(e) {
	      this.handleKeyEvent(e);
	    }.bind(this));
	    setInterval(this.step.bind(this), 100);
	  }
	
	  handleKeyEvent (e) {
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
	    this.board.snake.move();
	    this.drawBoard();
	  }
	
	  drawBoard () {
	    $('li').removeClass();
	    const snakeSegs = this.board.snake.segments;
	
	    for (let i = 0; i < snakeSegs.length; i++) {
	      let snakeX = snakeSegs[i].xPos;
	      let snakeY = snakeSegs[i].yPos;
	
	      let snakeIdx = snakeY * this.board.size + snakeX;
	
	      $($('li').get(snakeIdx)).addClass('snake');
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
	
	class Board {
	  constructor (size) {
	    this.size = size; // length of (square) board
	    this.snake = new Snake(this);
	  }
	}
	
	module.exports = Board;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	
	class Snake {
	  constructor (board) {
	    this.direction = "N"; // direction is key in DIRS (i.e. "N")
	    this.segments = [ new Coord(Math.floor(board.size / 2),
	                                Math.floor(board.size / 2)),
	                      new Coord(Math.floor(board.size / 2),
	                                Math.floor(board.size / 2) + 1),
	                      new Coord(Math.floor(board.size / 2),
	                                Math.floor(board.size / 2) + 2)];
	  }
	
	  move () {
	    this.grow();
	    this.segments.pop();
	  }
	
	  turn (newDirection) {
	    if (Snake.DIRS[this.direction].isOpposite(Snake.DIRS[newDirection])) {
	      this.direction = this.direction;
	    } else {
	      this.direction = newDirection;
	    }
	  }
	
	  grow () {
	    const incCoord = Snake.DIRS[this.direction];
	    this.segments.unshift(this.segments[0].plus(incCoord));
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map