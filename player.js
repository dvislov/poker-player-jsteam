
  var request = require('request');
  var qs = require('querystring');
  var get_cards = require('./libs/cards');

  function call(bet, game_state) {
    var max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));
    bet(max_bet);
  }

  function raise(bet, game_state) {
    var max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));
    bet(max_bet + 100);
  }

  function fold(bet) {
    bet(0);
  }

  function get_rank(cards, callback) {
    var encoded = qs.escape(JSON.stringify(cards));

    request("http://rainman.leanpoker.org/rank?cards=" + encoded, function(error, response, body) {
      if(error) {
        console.log(error);
      }
      callback(body);
    });
  }


  function getDecision(rank, bet, state, cards) {
    console.log(rank, cards);

    if(cards.length == 2) {
      call(bet, state);
      console.log("call");
    } else if (rank > 0) {
      raise(bet, state);
      console.log("raise");
    } else {
      fold(bet, state);
      console.log("fold");
    }
    console.log("end");

  }

  module.exports = {

    VERSION: 'Default JavaScript folding player',

    bet_request: function(game_state, bet) {
      try {
        var cards = get_cards(game_state);
        get_rank(cards, function(state) {
          getDecision(state.rank, bet, game_state, cards);
        });
      }
      catch(e){
        console.log(e);
        var max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));
        bet(max_bet);
      }
    },

    showdown: function(game_state) {
    }
  };
