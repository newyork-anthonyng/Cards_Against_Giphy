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

let User = mongoose.model('User', UserSchema);

User.methods.authenticate = function(password, callback) {
  // if the first password once encrypted matches to the second argument
  bcrypt.compare(password, this.password, (err, isMatch) => {
    callback(null, isMatch);
  });
};

module.exports = User;
