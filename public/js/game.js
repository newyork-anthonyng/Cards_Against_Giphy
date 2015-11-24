'use strict';
let request = require('request');

let Game = (function() {

  let players         = [];
  let judge           = undefined;
  let currentQuestion = undefined;

  // game phases. We still need to check if this is necessary.
  let phases          = ['round start', 'player chooses', 'judging', 'winner revealed'];
  let currentPhase    = 0;

  return {

    // start round
    startRound: function(users) {
      console.log('Game.js : starting round');

      // reset players and add in all players
      players = [];
      for(let i = 0, j = users.length; i < j; i++) {
        let newPlayer = {};
        newPlayer.id = users[i]['id'];
        newPlayer.name = users[i]['name'];
        this.dealCards(newPlayer);

        players.push(newPlayer);

      }
      this.getQuestion();
      return players;
    },

    // deal cards (random terms) to user
    dealCards: function(user) {
      console.log('Game.js : dealing cards');

      // use request module to hit route and populate our hand
      request('http://localhost:3000/api/randomTerms/6', (err, res, body) => {
        if(!err && res.statusCode == 200) {
          user['hand'] = body;
          console.log(user['name'] + ': ' + user['hand']);
        }
      });
    },

    // convert the random terms
    dealImgURL: function() {

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


    // get question for current round
    getQuestion: function() {
      console.log('Game.js : getting question');

      // use request module to hit route and get a question
      request('http://localhost:3000/api/createQuestion', (err, res, body) => {
        if(!err && res.statusCode == 200) {
          currentQuestion = body;
          console.log('Current question is: ' + currentQuestion);
        }
      });

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
