const $jo = require('./../joQuery/lib/main');
const View = require('./snake-view');

$jo( () => {
  const view = new View($jo('.grid'));
  view.drawBoard();
  $jo(window).on("keydown", function(e) {
    view.handleKeyEvent(e);
  });
  let highScore = localStorage.getItem('snakeScore') || 50;
  $jo('.highscore').text(`Highscore: ${highScore}`);
});
