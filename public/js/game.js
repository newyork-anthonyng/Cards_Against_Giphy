'use strict';
let request = require('request');

let Game = (function() {

  // each player will be an object with an id, name, images, and submitted card
  let players         = [];
  let judge           = undefined;
  let judgeIndex      = undefined;
  let currentQuestion = undefined;

  // game phases. We still need to check if this is necessary.
  let phases          = ['round start', 'player chooses', 'judging', 'winner revealed'];
  let currentPhase    = 0;

  return {
    getPlayers: function() {
      return players;
    },

    getQuestion: function() {
      return currentQuestion;
    },

    // return the UserId of the judge
    getJudge: function() {
      return judge;
    },

    // start round
    startRound: function(users) {
      this.resetGame();
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
        newPlayer.submitted = undefined;
        this.dealCards(newPlayer);

        // add new player objects into our player array
        players.push(newPlayer);
      }

      // create question
      this.createQuestion();

      // set up initial judge
      if(!judge) {
        for(let i = 0, j = users.length; i < j; i++) {
          if(users[i]['isJudge']) {
            console.log('user: ' + users[i]['name'] + ' is the judge.');
            judge = users[i]['id'];
            judgeIndex = i;
            break;
          }
        }
      } else {
        // make the next player the judge
        if(judgeIndex === players.length - 1) {
          judgeIndex = 0;
        } else {
          judgeIndex += 1;
        }
        judge = players[judgeIndex]['id'];
      }

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
      // console.log('Game.js : getting img_url');

      // format search term so that we are able to use it in Giphy API
      // replace spaces with '+'s
      let formattedSearchTerm = searchTerm.split(' ').join('+');

      // use request module to hit route and get img_url for our searchTerm
      request('http://localhost:3000/api/createCards/' + searchTerm,
        (err, res, body) => {
          if(!err && res.statusCode == 200) {
            let image = JSON.parse(body);
            user['images'].push(image);
          }
      });
    },

    // get question for current round
    createQuestion: function() {
      console.log('Game.js : getting question');

      // use request module to hit route and get a question
      request('http://localhost:3000/api/createQuestion', (err, res, body) => {
        if(!err && res.statusCode == 200) {
          currentQuestion = body;
          // console.log('Current question is: ' + currentQuestion);
        }
      });

    },

    // player submitted card
    // takes a User's ID, and a card giphy url
    submitCard: function(userId, imgURL) {
      console.log('Game.js submit card');

      // find player object
      let currentPlayer = undefined;
      for(let i = 0, j = players.length; i < j; i++) {
        if(players[i]['id'] === userId) {
          currentPlayer = players[i];
          break;
        }
      }

      // set their Submitted key equal to the image
      currentPlayer['submitted'] = imgURL;
    },

    // check if all players have submitted a card
    allPlayersSubmitted: function() {
      for(let i = 0, j = players.length; i < j; i++) {
        // check if player has submitted and is not the judge
        let playerSubmitted = players[i]['submitted'];
        let isJudge         = judge === players[i]['id'];

        if(!playerSubmitted && !isJudge) {
          return false;
        }
      }
      return true;
    },

    // return an array of all submitted cards
    getSubmittedCards: function() {
      // check to see if all players are submitted
      if(!this.allPlayersSubmitted()) {
        return false;
      }

      let submittedCards = [];

      // go through all players
      for(let i = 0, j = players.length; i < j; i++) {
        submittedCards.push(players[i]['submitted']);
      }

      // add all of the submitted cards into an array
      return submittedCards;
    },

    // reset all game variables
    resetGame: function() {
      players         = [];
      judge           = undefined;
      currentQuestion = undefined;
    }

  }

})();

module.exports = Game;
