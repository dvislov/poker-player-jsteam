var request = require('request');
var qs = require('querystring');
var get_cards = require('./libs/cards');
var _ = require('lodash');

function call(bet, game_state) {
  var max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));
  bet(max_bet + 1);
}

function raise(bet, game_state, value) {
  var max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));
  bet(max_bet + value);
}

function fold(bet) {
  bet(0);
}

function get_rank(cards, callback) {
  var encoded = qs.escape(JSON.stringify(cards));

  request("http://rainman.leanpoker.org/rank?cards=" + encoded, function (error, response, body) {
    if (error) {
      console.log(error);
    }
    console.log("response", body);
    callback(body);
  });
}

function isFreePair(community_cards, rank) {
  return _.filter(community_cards, function(e){return e.rank == rank;}).length == 2;
}


function getDecision(rank, bet, state, cards, value) {
  console.log(rank, cards);

  if (rank > 1) {
    raise(bet, state, 200);
  } else if (rank > 0 && state.current_buy_in < 300 && !isFreePair(state.community_cards, value)) {
    raise(bet, state, 100);
    console.log("raise");
  } else {
    fold(bet, state);
    console.log("fold");
  }
  console.log("end");

}

function isPair(rank1, rank2) {
  return rank1 == rank2;
}

function isKicker(cards) {
  return _.some(cards,
    function(x) {
      return x.rank == 'A' || x.rank == 'K';
    }
  );
}

var raisLimit = 20;
var kickerLimit = 50;

module.exports = {

  VERSION: 'Default JavaScript folding player',

  bet_request: function (game_state, bet) {
    try {
      var cards = get_cards(game_state);

      if (cards.length == 2) {
        if (isPair(cards[0].rank, cards[1].rank) || game_state.current_buy_in < raisLimit || (isKicker(cards)) && game_state.current_buy_in < kickerLimit) {
          console.log("call");
          call(bet, game_state);
        } else {
          console.log("fold");
          fold(bet)
        }
      } else {
        get_rank(cards, function (state) {
          var res = JSON.parse(state);
          getDecision(res.rank, bet, game_state, cards, res.value);
        });
      }
    } catch (e) {
      console.log(e);
      var max_bet = Math.max.apply(null, game_state.players.map(p => p.bet));
      bet(max_bet);
    }
  },

  showdown: function (game_state) {}
};
