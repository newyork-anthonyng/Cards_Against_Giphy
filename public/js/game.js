'use strict';
let request = require('request');

let Game = (function() {

  // each player will be an object with an id, name, and images
  let players         = [];
  let judge           = undefined;
  let currentQuestion = undefined;

  // game phases. We still need to check if this is necessary.
  let phases          = ['round start', 'player chooses', 'judging', 'winner revealed'];
  let currentPhase    = 0;

  return {
    getPlayers: function() {
      return players;
    },

    // start round
    startRound: function(users) {
      console.log('Game.js : starting round');

      // reset players and add in all players
      players = [];
      for(let i = 0, j = users.length; i < j; i++) {
        let newPlayer = {};
        newPlayer.id = users[i]['id'];
        newPlayer.name = users[i]['name'];
        // key: images will hold an array of objects, which have keys of...
        // 'id', 'giphy', 'still'
        newPlayer.images = [];
        this.dealCards(newPlayer);

        // add new player objects into our player array
        players.push(newPlayer);
      }

      // get question
      this.getQuestion();
      return players;
    },

    // deal cards (random terms) to user
    dealCards: function(user) {
      console.log('Game.js : dealing cards');

      // use request module to hit route and populate our hand
      request('http://localhost:3000/api/randomTerms/6', (err, res, body) => {
        if(!err && res.statusCode == 200) {
          // use JSON.parse to transform body into Array
          user['hand'] = JSON.parse(body);
          // console.log(user['name'] + ': ' + user['hand']);

          for(let i = 0, j = user['hand'].length; i < j; i++) {
            this.getImgURL(user, user['hand'][i]);
          }
        }
      });
    },

    // convert the random terms into img_urls
    getImgURL: function(user, searchTerm) {
      console.log('Game.js : getting img_url');

      // format search term so that we are able to use it in Giphy API
      // replace spaces with '+'s
      let formattedSearchTerm = searchTerm.split(' ').join('+');

      // use request module to hit route and get img_url for our searchTerm
      request('http://localhost:3000/api/createCards/' + searchTerm,
        (err, res, body) => {
          if(!err && res.statusCode == 200) {
            let image = JSON.parse(body);
            user['images'].push(image);

            // Test code to print out user images
            // console.log('User hand:');
            // for( let i = 0, j = user['images'].length; i < j; i++) {
              // console.log(user['images'][i]['giphy']);
            // }
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
