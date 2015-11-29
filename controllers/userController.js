'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = "iahsofh";
// const secret = process.env.SECRET;

function create(req, res){

  let userObject = new User(req.body);

  userObject.save((err, user) => {
    if(err) res.status(401).send({message: err.errmsg});
      res.status(200).send(user);
  });
}

function retrieve(req, res){
  User.findOne({username: req.params.username}, (err, user) => {
    if(err) res.status(401).send({message: err.errmsg});
    // returns entire user object
    res.status(200).send(user);
  });
}

function update(req, res){
  let userParams = req.body;
  // find by username
  let query = {username: req.params.username};
  // fields to update
  let update = {username: userParams.username, password: userParams.password};
  let options = {new: true};
  // find and update user
  User.findOneAndUpdate(query, update, options, (err, user) => {
    if (err) res.status(401).send({message: err.errmsg});
    res.send(user);
  });

}

function addWins(req, res){
  let userParams = req.body;
  // find by username
  let query = {username: req.params.username};
  // fields to update
  let update = {wins: userParams.username};
  let options = {new: true};
  // find and update user
  User.findOneAndUpdate(query, update, options, (err, user) => {
    if (err) res.status(401).send({message: err.errmsg});
    res.send(user);
  });
}

function destroy(req, res){
  let userParams = req.body;
  // find by username
  let query = {username: userParams.username};
  // find and remove
  User.findOneAndRemove(query, (err, user) => {
    if (err) throw err;
    res.send({"record" : "deleted"});
  })
}

function auth(req, res){

  let userParams = req.body;
  // Validation for undefined email or password
  if (userParams.username == undefined || userParams.password == undefined)
    res.status(401).send({message: "incorrect credentials"});

  User.findOne({ username: userParams.username }, (err, user) => {
    user.authenticate(userParams.password, (err, isMatch) => {
      if (err) console.log(err);
      // check if passwords match and token generation
      if (isMatch) {
        // token is made and set to expire in 5 hours / not related to logout
        res.status(200).send({message: "valid credentials",
            token: jwt.sign(user, secret, {expiresIn: '5h'})});
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
  addWins: addWins,
  destroy: destroy,
  auth: auth
}
