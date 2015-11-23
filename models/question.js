'use strict';
let mongoose = require('mongoose');

let QuestionSchema = new mongoose.Schema({
	// id: Number,
	text: String,
	pick: Number,
});

module.exports = Question;
let Question = mongoose.model('Question', QuestionSchema);
