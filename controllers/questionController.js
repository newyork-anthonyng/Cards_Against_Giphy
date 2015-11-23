'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Question = require('../models/question');

let makeQuestion = (req, res) => {
	Question.find({})

	let questionObject = new Question;
	// console.log(req.body.question);
	console.log(questionObject);

	let temp = questionObject[0].Math.floor(Math.random()*423).text;
	console.log(temp);
	return temp;
};

makeQuestion();

module.exports = {
	makeQuestion: makeQuestion
}
