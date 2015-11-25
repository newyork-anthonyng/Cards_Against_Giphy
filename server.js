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
    console.log('server.js '+ username);
    let userObj = {};

    userObj.name = username;
    userObj.id = socket.id;
    // check if user was first
    if (users.length === 0) {
      userObj.isJudge = true;
    } else {
      userObj.isJudge = false;
    }

    users.push(userObj);
    addedUser = true;

    // displaying users
    io.emit('user joined', users);
  });

  socket.on('send message', (data) => {
    io.emit('send message', data);
  });

  socket.on('show hand', (data) => {
    io.emit('show hand', Game.getPlayers());
  });

  socket.on('show question', () => {
    io.emit('show question', Game.getQuestion());
  });

  socket.on('check for submissions', () => {
    // console.log('server.js : check for submissions');
    // console.log('all players submitted: ' + Game.allPlayersSubmitted());
    io.emit('check for submissions', Game.allPlayersSubmitted());
  });

  // userId and myCard are getting passed as keys in an object
  socket.on('submit card', (data) => {
    console.log('server.js submitting card');
    Game.submitCard(data['userId'], data['myCard']);

    io.emit('submit card', data);
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

// // Show user's hand
app.get('/showHand', (req, res) => {
  res.send('Showing Hand');
});

// Start Round
app.get('/startRound', (req, res) => {
  // console.log('get /startRound');

  // start game round, and save all the players and judge information
  Game.startRound(users);
  let data = {};
  data['users'] = Game.getPlayers();
  data['judge'] = Game.getJudge();

  io.emit('start round', data);

  res.send('Starting Round');
});

// set up server
server.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = app.get('port');

  console.log('Express is running:', host, port);
});
