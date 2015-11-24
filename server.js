'use strict';

const express     = require('express');
const app         = express();
const server      = require('http').createServer(app);
const io          = require('socket.io')(server);
const request     = require('request');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const users        = require('./public/js/global');

let addedUser = false;

const userRoutes  = require('./routes/userRoutes');
const gameRoutes  = require('./routes/gameRoutes.js');
const apiRoutes   = require('./routes/apiRoutes');
const Game        = require('./public/js/game');

// Temporary Link to Models
let Question	  = require('./models/question');
let answer		  = require('./controllers/answerController');

// set up port that our server will be using
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoutes);
app.use('/game', gameRoutes);
app.use('/api', apiRoutes);

app.use(express.static('public'));

// connect to MongoDB
mongoose.connect('mongodb://localhost/giphy', (err) => {
  if(err) {
    console.log('Mongo connection error.', err);
  } else {
    console.log('Mongo connection successful');
  }
});

// ===========================================================================
// Emit events ===============================================================
// user joined, send message, disconnect
// ===========================================================================
// Socket pattern: IO will emit events from server.js
// In script.js, we will receive these events and manipulate the DOM as needed
// ===========================================================================

io.on('connection', (socket) => {
  console.log('User has connected.');

  socket.on('add user', (username) => {
    let userObj = {};

    // check if user was first
    if (users.length === 0) {
      userObj.isJudge = true;
    } else {
      userObj.isJudge = false;
    }

    userObj.name = username;
    userObj.id = socket.id;
    users.push(userObj);
    addedUser = true;

    // displaying users
    io.emit('user joined', users);

    // show judge
    io.emit('show judge', userObj);
  });

  socket.on('send message', (data) => {
    io.emit('send message', data);
  });

  socket.on('start round', (data) => {
    io.emit('start round', data);
  });

  socket.on('disconnect', () => {
    console.log('User has disconnected.');
    if(addedUser) {
      // go through each user and remove the person who logged out
      users.forEach((user) => {
        if(user.id === socket.id) {
          users.splice(users.indexOf(user), 1);
        }
      });
    }
  });
});

// Show user's hand
app.get('/showHand/:userName', (req, res) => {
  let userName = req.params.userName;
  let myHand = Game.showHand(userName);

  let searchTerm = myHand[0];
  let searchURL = 'http://api.giphy.com/v1/gifs/search?q='
                  + searchTerm + '&limit=1&api_key=dc6zaTOxFJmzC';

  request(searchURL, (err, response, body) => {
    let info = JSON.parse(body);
    let giphyObject = {};
    let handImage;

    // giphyArray will hold onto the ID, GIF, and still image
    giphyObject['id'] = info['data'][0]['id'];
    giphyObject['giphy'] = info['data'][0]['images']['fixed_height']['url'];
    giphyObject['still'] = info['data'][0]['images']['fixed_height_still']['url'];

    handImage = giphyObject['giphy'];

    console.log('Server.js show hand: ' + myHand);
    io.emit('show hand', handImage);

    res.send(giphyObject);
  });

});

// Start Round
app.get('/startRound', (req, res) => {
  let playersArray = Game.startRound(users);
  console.log('get /startRound');

  // for (var i = 0; i < playersArray.length; i++) {
  //   let termsArray = answer(6);
  //   playersArray[i]['hand'] = termsArray;
  // }
  // console.log('Server.js get /startRound :' + playersArray);
  // console.log(playersArray);
  io.emit('start round', playersArray);
});


// set up server
server.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = app.get('port');

  console.log('Express is running:', host, port);
});
