'use strict';

let express     = require('express');
let app         = express();
let server      = require('http').createServer(app);
let io          = require('socket.io')(server);

// set up port that our server will be using
app.set('port', 3000);
app.use(express.static('public'));

let users     = [];
let addedUser = false;

// ===========================================================================
// Emit events ===============================================================
// user joined, send message, disconnect
// ===========================================================================

io.on('connection', (client) => {
  console.log('User has connected.');

  client.on('add user', (username) => {
    let userObj = {};
    userObj.name = username;
    userObj.id = client.id;
    users.push(userObj);
    addedUser = true;
    io.emit('user joined', users);
  });

  client.on('send message', (data) => {
    io.emit('send message', data);
  });

  client.on('disconnect', () => {
    console.log('User has disconnected.');
    if(addedUser) {
      // go through each user and remove the person who logged out
      users.forEach((user) => {
        if(user.id === client.id) {
          users.splice(users.indexOf(user), 1);
        }
      });
    }
  });
});

// ===========================================================================
// Set up routes =============================================================
// ===========================================================================

// go to homepage
app.get('/', (req, res) => {
  console.log('get \'/\'');
});

// go into our database and get random terms
// the 'numberOfTerms' is how many documents from the
// database that you want to get
app.get('/randomTerms/:numberOfTerms', (req, res) => {
  console.log('get /randomTerms/:numberOfTerms');
});

// hit the Giphy API and grab random giphys
// grab all of the array of player cards,
// and retrieve the image_url's from giphy
app.get('/createCards', (req, res) => {
  console.log('get /createCards');
});


// set up server
server.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = app.get('port');

  console.log('Express is running:', host, port);
});
