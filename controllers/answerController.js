'use strict';
let mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/giphy', (err) => {
//   if(err) {
//     console.log('Mongo connection error.', err);
//   };
// });

let Answer = require('../models/answer.js')

// console.log('get /randomTerms/:numberOfTerms');

// let searchTermsFunc = function(number) {
//   console.log('Inside answerController: ' + number);
// }

let searchTermsFunc = function(numberOfTerms) {
  // let termsArray = [];
  // console.log('Inside answerController: ' + numberOfTerms);
  // Answer.find({id: {$gt: 1}}).sort('-id').limit(1).exec((err, result) => {
  //   console.log(numberOfTerms);
  //   console.log(result.id);
  //   // Loop to find needed number of gif search-terms
  //   for (let i = 0; i < numberOfTerms; i++) {
  //     Answer.find({id: (Math.ceil(Math.random()*result.id))}, (er, output) => {
  //       termsArray.push(output.text);
  //     });
  //   }
  // });
  // return termsArray;
}

module.exports = searchTermsFunc;
