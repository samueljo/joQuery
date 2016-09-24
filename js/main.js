const View = require('./snake-view');

$( () => {
  const view = new View($('.grid'));
  view.drawBoard();
  $(window).keydown(function(e) {
    view.handleKeyEvent(e);
  });
});
