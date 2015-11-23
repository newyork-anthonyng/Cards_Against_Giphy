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
    res.send(user);
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
      res.send({"record" : "deleted"});
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
