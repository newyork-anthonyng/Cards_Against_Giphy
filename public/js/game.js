'use strict';

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
        // this.dealCards(newPlayer);

        players.push(newPlayer);

      }
      return players;

      // test: print out all player's name
      console.log('Player\'s name:');
      for(let i = 0, j = players.length; i < j; i++) {
        console.log(players[i]['name'] + ': ' + players[i]['hand']);
      }
    },

    // deal cards
    dealCards: function(user) {
      // grab user and deal a new hand of 6 terms to them
      $.ajax({
        url: 'http://localhost:3000/api/randomTerms/6'
      }).done((data) => {
        let searchTerms = data;
        user.hand = searchTerms;
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
