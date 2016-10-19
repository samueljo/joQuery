const View = require('./snake-view');

$jo( () => {
  const view = new View($jo('.grid'));
  view.drawBoard();
  $jo(window).on("keydown", function(e) {
    view.handleKeyEvent(e);
  });
});
