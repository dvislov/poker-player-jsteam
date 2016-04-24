var _ = require('lodash');

module.exports = {

  getCards(state) {
    let tableCards = state.community_cards;

    let ourCards = [];
    state.players.forEach(function(item) {
      if (item.hole_cards) {
        ourCards = item.hole_cards;
      }
    });

    return _.concat(tableCards, ourCards);
  }

};
