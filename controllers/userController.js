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
  User.findOne({username: req.params.username}, (err, user) => {
    // returns entire user object
    res.send(user);
  });
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

function logout(req, res){

  let token = req.auth;
  console.log(req.auth);
  // if(message === token.message) return next();

  // let userParams = req.body;
  // console.log(userParams);


  // User.findOne({token: userParams.token}, (err, user) => {
  //   console.log(user.token);
  //   user.token = null;
  //   console.log(user.token);
  // });
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

  let userParams = req.body;
  // Validation for undefined email or password
  if (userParams.username == undefined || userParams.password == undefined)
  res.status(401).send({message: "incorrect credentials"});

  User.findOne({ username: userParams.username }, (err, user) => {
    user.authenticate(userParams.password, (err, isMatch) => {
      if (err) throw err;
      // check if passwords match and token generation
      if (isMatch) {
        // token is made and set to expire in 5 hours / not related to logout
        res.status(200).send({message: "valid credentials", token: jwt.sign(user, secret, {expiresIn: '5h'})});

        // cert = fs.readFileSync('public.pem');
        // jwt.verify(token, cert, function(err, decoded) {
        //   console.log(decoded.foo)
        // });

      } else {
        res.status(401).send({message: "invalid credentials"});
      };
    });
  });
}

// function checkAuth(message) {
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

module.exports = {
  create: create,
  retrieve: retrieve,
  update: update,
  logout: logout,
  destroy: destroy,
  auth: auth,
  // checkAuth: checkAuth
}
