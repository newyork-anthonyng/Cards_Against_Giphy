'use strict';
const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const expressJwt = require('express-jwt');
const secret = "iahsofh"; // this needs to be moved out of the app!

router.route('/user/:username')
  // .all(expressJwt({
  //   secret: secret,
  //   userProperty: 'auth'
  // }))
  .get(user.retrieve);

router.route('/user')
  // .all(expressJwt({
  //   secret: secret,
  //   userProperty: 'auth'
  // }))
  .put(user.update)
  .delete(user.destroy);

router.route('/user/logout')
  // .all(expressJwt({
  //   secret: secret,
  //   userProperty: 'auth'
  // }))
  .get(user.logout);

router.route('/user/auth')
  .post(user.auth);

router.route('/user/signup')
  .post(user.create);


// function check_auth(message) {
//   return function(req, res, next) {
//     //
//     // check if any of the scopes defined in the token,
//     // is one of the scopes declared on check_scopes
//     //
//     let token = req.auth;
//     console.log(token);
//     if(message === token.message) return next();
//
//     // for (var i =0; i<token.message.length; i++){
//     //   for (var j=0; j<message.length; j++){
//     //       if(message[j] === token.message[i]) return next();
//     //   }
//     // }
//
//     return res.send(401, 'insufficient scopes')
//   }
// }

module.exports = router;
