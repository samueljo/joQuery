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
	
	    this.intervalID = setInterval(this.step.bind(this), 100);
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
	    if (this.lost()) {
	      window.alert('You lost!');
	      clearInterval(this.intervalID);
	    } else {
	      this.board.snake.move();
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
	
	    for (let i = 0; i < snakeSegs.length; i++) {
	      let snakeIdx = this.getLiIndex(snakeSegs[i]);
	      let snakeLi = $($('li').get(snakeIdx));
	
	      if (i === 0) {
	        snakeLi.addClass('snake-head');
	      }
	
	      snakeLi.addClass('snake');
	    }
	  }
	
	  // isSnake (coord) {
	  //   const $li = $($('li').get(Coord.getLiIndex(coord)));
	  //
	  //   if ($li.classList.includes("snake")) {
	  //     return true;
	  //   } else {
	  //     return false;
	  //   }
	  // }
	  //
	  // isApple (coord) {
	  //   const $li = $($('li').get(Coord.getLiIndex(coord)));
	  //
	  //   if ($li.classList.includes("apple")) {
	  //     return true;
	  //   } else {
	  //     return false;
	  //   }
	  // }
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
	                                Math.floor(board.size / 2) + 2),
	                      new Coord(Math.floor(board.size / 2),
	                                Math.floor(board.size / 2) + 3),
	                      new Coord(Math.floor(board.size / 2),
	                                Math.floor(board.size / 2) + 4)];
	    this.setHead();
	  }
	
	  move () {
	    this.grow();
	    this.segments.pop();
	    this.setHead();
	  }
	
	  turn (newDirection) {
	    if (Snake.DIRS[this.direction].isOpposite(Snake.DIRS[newDirection])) {
	      this.direction = this.direction;
	    } else {
	      this.direction = newDirection;
	    }
	  }
	
	  hitSelf () {
	    for (let i = 0; i < this.segments.length; i++) {
	      if (this.segments[i].equals(this.nextMoveCoord())) {
	        return true;
	      }
	    }
	    return false;
	  }
	
	  hitWall () {
	    const newCoord = this.nextMoveCoord();
	
	    if (newCoord.xPos < 0 || newCoord.yPos < 0 || newCoord.xPos > 19 || newCoord.yPos > 19) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  nextMoveCoord () {
	    const incCoord = Snake.DIRS[this.direction];
	    return this.segments[0].plus(incCoord);
	  }
	
	  grow () {
	    this.segments.unshift(this.nextMoveCoord());
	  }
	
	  setHead () {
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
	  constructor (xPos, yPos, boardSize) {
	    this.xPos = xPos;
	    this.yPos = yPos;
	    this.boardSize = boardSize;
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map