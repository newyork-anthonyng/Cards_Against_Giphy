'use strict';

const express     = require('express');
const app         = express();
const server      = require('http').createServer(app);
const io          = require('socket.io')(server);
const request     = require('request');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');

var users     = [];
let addedUser = false;

const userRoutes  = require('./routes/userRoutes');
const gameRoutes  = require('./routes/gameRoutes');
const apiRoutes   = require('./routes/apiRoutes');
const Game        = require('./public/js/game');

// Temporary Link to Models
let Question	  = require('./models/Question');
let Answer		  = require('./models/Answer')

// set up port that our server will be using
app.set('port', 3000);


app.use(bodyParser.json());
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
    userObj.name = username;
    userObj.id = socket.id;
    users.push(userObj);
    addedUser = true;
    io.emit('user joined', users);
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

// set up server
server.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = app.get('port');

  console.log('Express is running:', host, port);
});
