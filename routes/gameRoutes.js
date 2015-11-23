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

module.exports = router;

// module.exports = function(io) {
//
//   router.get('/startGame', function (req, res) {
//     io.whatever
//   })
//
// };
//
// //server.js
// var gameRoutes = require('./gameRoutes.js')(io)
