'use strict';

require('./game');
require('../form/form');

var game = new window.Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(window.Game.Verdict.INTRO);

var formOpenButton = document.querySelector('.reviews-controls-new');

/** @param {MouseEvent} evt */
formOpenButton.onclick = function(evt) {
  evt.preventDefault();

  window.form.open(function() {
    game.setGameStatus(window.Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
};

window.form.onClose = function() {
  game.setDeactivated(false);
};

module.exports = {
  game: game
};