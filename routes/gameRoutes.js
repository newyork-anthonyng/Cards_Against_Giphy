'use strict';
const express     = require('express');
const app         = express();
const server      = require('http').createServer(app);
const io          = require('socket.io')(server);
const router      = express.Router();
const request     = require('request');
const bodyParser  = require('body-parser');
const Game        = require('../public/js/game');
const users       = require('../public/js/global');

router.get('/', (req, res) => {
  console.log('hit / route inside of gameRoutes.js');
  res.send('Hello World');
});

// Start Round
router.get('/startRound', (req, res) => {
  Game.startRound(users);
  io.emit('start round');
});

// Show user's hand
router.get('/showHand/:userName', (req, res) => {
  let userName = req.params.userName;
  let myHand = Game.showHand(userName);

  let searchTerm = myHand[0];
  let searchURL = 'http://api.giphy.com/v1/gifs/search?q='
                  + searchTerm + '&limit=1&api_key=dc6zaTOxFJmzC';

  request(searchURL, (err, response, body) => {
    let info = JSON.parse(body);
    let giphyArray = [];
    let handImage;

    // giphyArray will hold onto the ID, GIF, and still image
    giphyArray[0] = info['data'][0]['id'];
    giphyArray[1] = info['data'][0]['images']['fixed_height']['url'];
    giphyArray[2] = info['data'][0]['images']['fixed_height_still']['url'];

    handImage = giphyArray[1];

    console.log('Server.js show hand: ' + myHand);
    io.emit('show hand', handImage);

    res.send(giphyArray);
  });

});

module.exports = router;
