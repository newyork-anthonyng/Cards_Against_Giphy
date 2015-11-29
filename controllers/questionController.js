'use strict';

const express 	= require('express');
const router		= express.Router();
const mongoose	= require('mongoose');
const Question 	= require('../models/question');

let makeQuestion = (req, res) => {
	Question.find({});

	let questionObject = new Question;
	let temp = questionObject[0].Math.floor(Math.random() * 423).text;

	return temp;
};

makeQuestion();

module.exports = {
	makeQuestion: makeQuestion
}
