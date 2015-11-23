'use strict';
let mongoose = require('mongoose');

let AnswerSchema = new mongoose.Schema({
	id: Number,
	text: String,
	// total wins: Number,
});

module.exports = Answer;
let Answer = mongoose.model('Answer', AnswerSchema);
