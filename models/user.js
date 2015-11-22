'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

UserSchema.pre('save', function(next) {
  let user = this;

  // hash if new or update
  if (!user.isModified('password')) return next();

  // salt password
  bcrypt.genSalt(5, (err, salt) => {
    if (err) return next(err);

    // hash password using salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

User.methods.authenticate = function(password, callback) {
  // if the first password once encrypted matches to the second argument
  bcrypt.compare(password, this.password, (err, isMatch) => {
    callback(null, isMatch);
  });
};


let User = mongoose.model('User', UserSchema);

module.exports = User;


// --------------------------
// below user controllers
// -----------------------

'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = "iahsofh"; // this needs to be moved out of the app!

function create(req, res){

  console.log(req.body.user);
  let userObject = new User(req.body.user);

  userObject.save((err, user) => {
    if(err){
      return res.status(401).send({message: err.errmsg});
    } else {
      return res.status(200).send(user);
    }
  });
}

function retrieve(req, res){
  // find only usernames
  User.find({}, 'username', (err, users) => {
    // return all user usernames
    res.send(users);
  })
}

function update(req, res){

  let userParams = req.body.user;
  // find by username
  let query = {username: userParams.username};
  // fields to update
  let update = {username: userParams.username, password: userParams.password};
  let options = {new: true};
  // find and update user
  User.findOneAndUpdate(query, update, options, (err, user) => {
    if (err) throw err;
  });

}

function destroy(req, res){

  let userParams = req.body.user;
  // find by username
  let query = {username: userParams.username};
  // find and remove
  User.findOneAndRemove(query, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
}

function auth(req, res){

  var userParams = req.body.user;
  console.log(req.body.user);
  // Validation for undefined email or password
  if (userParams.username == undefined || userParams.password == undefined)
  return res.status(401).send({message: "incorrect credentials"});

  User.findOne({ username: userParams.username }, (err, user) => {
    console.log(user);
    user.authenticate(userParams.password, (err, isMatch) => {
      if (err) throw err;
      // check if passwords match and token generation
      if (isMatch) {
        return res.status(200).send({message: "valid credentials", token: jwt.sign(user, secret)});
      } else {
        return res.status(401).send({message: "invalid credentials"});
      }
    });
  });
}

module.exports = {
  create: create,
  retrieve: retrieve,
  update: update,
  destroy: destroy,
  auth: auth
}

// --------------------
// user routes
// -----------------
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
  .delete(user.destroy);

router.route('/user/auth')
  .post(user.auth);

router.route('/user/signup')
  .post(user.create);

module.exports = router;
