// try {
//   const request = require('request');
//   const qs = require('querystring');
//
//   function call(bet, game_state) {
//     const max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));
//     bet(max_bet);
//   }
//
//   function raise(bet, game_state) {
//     const max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));
//     bet(max_bet + 100);
//   }
//
//   function fold(bet) {
//     bet(0);
//   }

  module.exports = {

    VERSION: 'Default JavaScript folding player',

    bet_request: function(game_state, bet) {
      const max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));

      bet(max_bet);
    },

    // get_rank: function(cards, callback) {
    //   const encoded = qs.escape(JSON.stringify(cards));
    //
    //   request("http://rainman.leanpoker.org/rank?cards=" + encoded, function(error, response, body) {
    //     if(error) {
    //       console.log(error);
    //     }
    //     callback(body);
    //   });
    // },

    getDecision: function(rank, state) {
      var bet = 0;
      if (rank > 0) {
        raise(bet, state);
      } else {
        fold(bet, state);
      }
    },

    showdown: function(game_state) {

    }
  };
//
// }
// catch(e){
//   console.log(e);
// }
