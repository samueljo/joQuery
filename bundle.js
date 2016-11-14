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

	const $jo = __webpack_require__(6);
	const View = __webpack_require__(1);
	
	$jo( () => {
	  const view = new View($jo('.grid'));
	  view.drawBoard();
	  $jo(window).on("keydown", function(e) {
	    view.handleKeyEvent(e);
	  });
	  let highScore = localStorage.getItem('snakeScore') || 50;
	  $jo('.highscore').text(`Highscore: ${highScore}`);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const $jo = __webpack_require__(6);
	const Board = __webpack_require__(2);
	
	class View {
	  constructor($jo) {
	    this.$jo = $jo;
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);
	const Apple = __webpack_require__(5);
	
	class Board {
	  constructor(size) {
	    this.size = size;
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
	                                Math.floor(board.size / 2))];
	    this.setHead();
	    this.turning = false;
	  }
	
	  move() {
	    this.segments.unshift(this.nextMoveCoord());
	    this.turning = false;
	    if (this.growing) {
	      this.growing--;
	    } else {
	      this.segments.pop();
	    }
	    this.setHead();
	  }
	
	  turn(newDirection) {
	    if (Snake.DIRS[this.direction].isOpposite(Snake.DIRS[newDirection])
	      || this.turning) {
	      return;
	    } else {
	      this.turning = true;
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(7);
	
	const funcQueue = [];
	
	const $jo = function (arg) {
	  if (arg === window) {
	    return new DOMNodeCollection(
	      [window]
	    );
	  } else if (typeof arg === "string") {
	    if (arg[0] === "<") {
	      const tag = arg.slice(1, -1);
	      return new DOMNodeCollection(
	        [document.createElement(tag)]
	      );
	    } else {
	      return new DOMNodeCollection(
	        Array.from(document.querySelectorAll(arg))
	      );
	    }
	  } else if (arg instanceof HTMLElement) {
	    return new DOMNodeCollection(
	      [arg]
	    );
	  } else if (typeof arg === "function") {
	    if (document.readyState === "complete") {
	      arg();
	    } else {
	      funcQueue.push(arg);
	    }
	  }
	};
	
	function execute() {
	  funcQueue.forEach( (func) => {
	    func();
	  });
	}
	
	$jo.extend = function (...objects) {
	  const result = objects[0];
	  objects.slice(1).forEach( (object) => {
	    Object.keys(object).forEach( (key) => {
	      result[key] = object[key];
	    });
	  });
	
	  return result;
	};
	
	$jo.ajax = function (options) {
	  let defaults = {
	    method: "GET",
	    url: "./",
	    data: {},
	    success: function() {},
	    error: function() {},
	  };
	
	  const xhr = new XMLHttpRequest();
	  this.extend(defaults, options);
	
	  xhr.open(defaults.method, defaults.url);
	  xhr.onload = function () {
	    if (xhr.status === 200) {
	      defaults.success(JSON.parse(xhr.response));
	    } else {
	      defaults.error(JSON.parse(xhr.response));
	    }
	  };
	
	  xhr.send(defaults.data);
	};
	
	document.addEventListener("DOMContentLoaded", execute);
	
	module.exports = $jo;


/***/ },
/* 7 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(htmlElements) {
	    this.htmlElements = htmlElements;
	  }
	
	  html(string) {
	    if (string === undefined) {
	      return this.htmlElements[0].innerHTML;
	    } else {
	      this.htmlElements[0].innerHTML = string;
	      return;
	    }
	  }
	
	  empty() {
	    this.htmlElements.forEach( (htmlElement) => {
	      htmlElement.innerHTML = "";
	    });
	    return;
	  }
	
	  append(content) {
	    if (content instanceof DOMNodeCollection) {
	      this.htmlElements.forEach( (parentElement) => {
	        content.htmlElements.forEach( (childElement) => {
	          parentElement.innerHTML += childElement.outerHTML;
	        });
	      });
	    } else if (typeof content === 'string') {
	      this.htmlElements.forEach( (htmlElement) => {
	        htmlElement.innerHTML += content;
	      });
	    } else if (content instanceof HTMLElement) {
	      this.htmlElements.forEach( (htmlElement) => {
	        htmlElement.innerHTML += content.outerHTML;
	      });
	    }
	  }
	
	  attr(name, value) {
	    if (value === undefined) {
	      return this.htmlElements[0].getAttribute(name);
	    } else {
	      this.htmlElements[0].setAttribute(name, value);
	      return;
	    }
	  }
	
	  addClass(name) {
	    this.htmlElements.forEach( (htmlElement) => {
	      name.split(" ").forEach ( (className) => {
	        htmlElement.classList.add(className);
	      });
	    });
	  }
	
	  removeClass(name) {
	    this.htmlElements.forEach( (htmlElement) => {
	      htmlElement.classList.remove(name);
	    });
	  }
	
	  children() {
	    let childrenCollection = [];
	    this.htmlElements.forEach( (htmlElement) => {
	      childrenCollection = childrenCollection.concat(htmlElement.children);
	    });
	
	    return new DOMNodeCollection(childrenCollection);
	  }
	
	  parent() {
	    const parentCollection = this.htmlElements.map( (htmlElement) => {
	      return htmlElement.parentElement;
	    });
	
	    return new DOMNodeCollection(parentCollection);
	  }
	
	  find(selector) {
	    let queryResult = [];
	    this.htmlElements.forEach( (htmlElement) => {
	      queryResult = queryResult.concat(htmlElement.querySelectorAll(selector));
	    });
	
	    return new DOMNodeCollection(queryResult);
	  }
	
	  remove() {
	    this.htmlElements.forEach( (htmlElement) => {
	      htmlElement.innerHTML = "";
	      htmlElement.outerHTML = "";
	    });
	    return;
	  }
	
	  on(e, cb) {
	    this.htmlElements.forEach( (htmlElement) => {
	      htmlElement.addEventListener(e, cb);
	    });
	    return;
	  }
	
	  off(e, cb) {
	    this.htmlElements.forEach( (htmlElement) => {
	      htmlElement.removeEventListener(e, cb);
	    });
	    return;
	  }
	
	  text(textString) {
	    this.htmlElements.forEach( (htmlElement) => {
	      htmlElement.textContent = textString;
	    });
	    return;
	  }
	
	  get(index) {
	    return this.htmlElements[index];
	  }
	}
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map