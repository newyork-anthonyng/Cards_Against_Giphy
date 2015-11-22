'use strict';

let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
