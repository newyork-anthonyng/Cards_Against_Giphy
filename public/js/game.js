'use strict';

const request = require('request');

let Game = (function() {

  let players         = [];
  let judge           = undefined;
  let judgeIndex      = undefined;
  let currentQuestion = undefined;

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

    startRound: function(users) {
      this.resetGame();

      // reset players and add in all players
      players = [];

      for(let i = 0, j = users.length; i < j; i++) {
        let newPlayer = {};
        newPlayer.id = users[i]['id'];
        newPlayer.name = users[i]['name'];
        // The key, "images" will hold an array of objects, which have keys of
        // 'id', 'giphy', 'still'
        newPlayer.images = [];
        newPlayer.submitted = undefined;
        this.dealCards(newPlayer);

        // add new player objects into our player array
        players.push(newPlayer);
      }

      // create question
      this.createQuestion();

      // set up judge
      if(!judge) {
        for(let i = 0, j = users.length; i < j; i++) {
          if(users[i]['isJudge']) {
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

    // deal random terms to user
    dealCards: function(user) {
      // use request module to hit route and populate our hand
      request('http://localhost:3000/api/randomTerms/6', (err, res, body) => {
        if(!err && res.statusCode == 200) {
          // use JSON.parse to transform body into Array
          user['hand'] = JSON.parse(body);

          for(let i = 0, j = user['hand'].length; i < j; i++) {
            this.getImgURL(user, user['hand'][i]);
          }
        }
      });
    },

    // convert the random terms into img_urls
    getImgURL: function(user, searchTerm) {
      // format search term so that we are able to use it in Giphy API
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
      // use request module to hit route and get a question
      request('http://localhost:3000/api/createQuestion', (err, res, body) => {
        if(!err && res.statusCode == 200) {
          currentQuestion = body;
        }
      });

    },

    // player submitted card
    submitCard: function(userId, imgURL) {
      // find player object
      let currentPlayer = undefined;
      for(let i = 0, j = players.length; i < j; i++) {
        if(players[i]['id'] === userId) {
          currentPlayer = players[i];
          break;
        }
      }

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

      for(let i = 0, j = players.length; i < j; i++) {
        if(players[i]['submitted']) {
          let myPlayer = {};
          myPlayer['userId'] = players[i]['id'];
          myPlayer['imgURL'] = players[i]['submitted'];
          myPlayer['name']   = players[i]['name'];
          submittedCards.push(myPlayer);
        }
      }

      return submittedCards;
    },

    // reset all game variables
    resetGame: function() {
      players         = [];
      currentQuestion = undefined;
    },

    // return the username of the Player who submitted that card
    getCardsOwner: function(imgURL) {
      let mySubmittedCards = this.getSubmittedCards();

      for(let i = 0, j = mySubmittedCards.length; i < j; i++) {
        if(imgURL === mySubmittedCards[i]['imgURL']) {
          return mySubmittedCards[i]['name'];
        }
      }
    }

  }

})();

module.exports = Game;
