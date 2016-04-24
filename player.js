
module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    const max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));

    bet(max_bet);
  },



  showdown: function(game_state) {

  }
};
