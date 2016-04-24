
module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    const min = 0;
    const max = 100;
    const result = Math.random() * (max - min) + min;
    bet(300);
  },

  showdown: function(game_state) {

  }
};
