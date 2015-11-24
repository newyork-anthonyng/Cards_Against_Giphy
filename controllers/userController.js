'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = "iahsofh"; // this needs to be moved out of the app!

function create(req, res){

  let userObject = new User(req.body);

  userObject.save((err, user) => {
    if(err){
      res.status(401).send({message: err.errmsg});
    } else {
      res.status(200).send(user);
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

  let userParams = req.body;
  // find by username
  let query = {username: userParams.username};
  // fields to update
  let update = {username: userParams.username, password: userParams.password};
  let options = {new: true};
  // find and update user
  User.findOneAndUpdate(query, update, options, (err, user) => {
    if (err) throw err;
    res.send(user);
  });

}

function destroy(req, res){

  let userParams = req.body;
  // find by username
  let query = {username: userParams.username};
  // find and remove
  User.findOneAndRemove(query, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.send({"record" : "deleted"});
    }
  })
}

function auth(req, res){

  var userParams = req.body;
  // Validation for undefined email or password
  if (userParams.username == undefined || userParams.password == undefined)
  res.status(401).send({message: "incorrect credentials"});

  User.findOne({ username: userParams.username }, (err, user) => {
    user.authenticate(userParams.password, (err, isMatch) => {
      if (err) throw err;
      // check if passwords match and token generation
      if (isMatch) {
        console.log({message: "valid credentials", token: jwt.sign(user, secret)});
        // res.setHeader(200, token: jwt.sign(user, secret)});
        res.status(200).send({message: "valid credentials", token: jwt.sign(user, secret)});

      } else {
        res.status(401).send({message: "invalid credentials"});
      };
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
