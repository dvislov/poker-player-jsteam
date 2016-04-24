var getCards = require('./libs/cards');

const request = require('request');
const qs = require('querystring');



module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    const max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));

    bet(max_bet);
  },

  get_rank: function(cards, callback) {
    const encoded = qs.escape(JSON.stringify(cards));

    request("http://rainman.leanpoker.org/rank?cards=" + encoded, function(error, response, body) {
      if(error) {
        console.log(error);
      }
      callback(body);
    });
  },

  showdown: function(game_state) {

  }
};
