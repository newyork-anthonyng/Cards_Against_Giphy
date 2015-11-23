'use strict';
const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const expressJwt = require('express-jwt');
const secret = "iahsofh"; // this needs to be moved out of the app!

router.route('/user')
  .all(expressJwt({
    secret: secret,
    userProperty: 'auth'
  }))
  .get(user.retrieve);

router.route('/user/edit')
  .put(user.update);
  // must check unexpected token error
  // .delete(user.destroy);

router.route('/user/auth')
  .post(user.auth);

router.route('/user/signup')
  .post(user.create);

module.exports = router;
