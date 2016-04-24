var _ = require('lodash');

module.exports = function(state) {
    var tableCards = state.community_cards;

    var ourCards = [];
    state.players.forEach(function(item) {
      if (item.hole_cards) {
        ourCards = item.hole_cards;
      }
    });

    return _.concat(tableCards, ourCards);
  }
