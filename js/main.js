const View = require('./snake-view');

$l( () => {
  const view = new View($l('.grid'));
  view.drawBoard();
  $l(window).on("keydown", function(e) {
    view.handleKeyEvent(e);
  });
});
