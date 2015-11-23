'use strict';
let mongoose = require('mongoose');

let AnswerSchema = new mongoose.Schema({
	id: Number,
	text: String,
	// total wins: Number,
});

let Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;
