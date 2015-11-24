'use strict';
let request = require('request');

let Game = (function() {
  // variables
  // players, judge, phases
  // submitted cards for judge
  // question
  let players = [];
  let judge = undefined;
  let phases = ['round start', 'player chooses', 'judging', 'winner revealed'];
  let currentPhase = 0;

  return {

    // start round
    startRound: function(users) {

      console.log('Game Module: Start round');

      // reset players and add in all players
      players = [];
      for(let i = 0, j = users.length; i < j; i++) {
        let newPlayer = {};
        newPlayer.id = users[i]['id'];
        newPlayer.name = users[i]['name'];
        this.dealCards(newPlayer);

        players.push(newPlayer);

      }
      return players;
    },

    // deal cards
    dealCards: function(user) {
      console.log('Game.js : dealing cards');

      // use request module to hit route and populate our hand
      request('http://localhost:3000/api/randomTerms/6', (err, res, body) => {
        console.log('inside of request');
        if(!err && res.statusCode == 200) {
          user['hand'] = body;
          // print out player and their hand
          console.log(user['name'] + ': ' + user['hand']);
        }
      });
    },

    // show players hand
    showHand: function(userName) {
      for(let i = 0, j = players.length; i < j; i++) {
        if(players[i]['name'] === userName) {
          console.log(userName + '\'s hand: ' + players[i]['hand']);
          return players[i]['hand'];
        }
      }
    },

    // player selects card

    // judge selects winner

    // award the winner

    // round is over

    // next phase
    nextPhase: function() {
      if (currentPhase === phases.length) {
        currentPhase = 0;
      } else {
        currentPhase++;
      }
    },

    // play a card

  }

})();

module.exports = Game;
