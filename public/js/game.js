'use strict';

let Game = (function() {

  // variables
  // players, judge, phases
  // submitted cards for judge
  // question
  let players = ['Anthony', 'Amy', 'Trevor'];
  let judge = undefined;
  let phases = ['round start', 'player chooses', 'judging', 'winner revealed'];
  let currentPhase = phases[0];

  return {

    test: function() {
      console.log('Testing game module');
    },

    // start round
    startRound: function() {
      console.log('Game Module: Start round');
    }

    // deal cards

    // player selects card

    // judge selects winner

    // award the winner

    // round is over

    // next phase

    // play a card

  }

})();

module.exports = Game;
