
  const request = require('request');
  const qs = require('querystring');
  const get_cards = require('./libs/cards');

  function call(bet, game_state) {
    const max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));
    bet(max_bet);
  }

  function raise(bet, game_state) {
    const max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));
    bet(max_bet + 100);
  }

  function fold(bet) {
    bet(0);
  }

  function get_rank(cards, callback) {
    const encoded = qs.escape(JSON.stringify(cards));

    request("http://rainman.leanpoker.org/rank?cards=" + encoded, function(error, response, body) {
      if(error) {
        console.log(error);
      }
      callback(body);
    });
  }


  function getDecision(rank, bet, state) {
    if (rank > 0) {
      raise(bet, state);
    } else {
      fold(bet, state);
    }
  }

  module.exports = {

    VERSION: 'Default JavaScript folding player',

    bet_request: function(game_state, bet) {
      var cards = get_cards(game_state);
      get_rank(cards, function(state) {
        getDecision(state.rank, bet, game_state);
      });
    },

    showdown: function(game_state) {

    }
  };
