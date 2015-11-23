// apiRoutes.js will store all of our API generating routes
// 1. Generate an array of random terms to use for giphy cards
// 2. Generate an array of img_url from giphy api
// 3. Generate an array of questions

'use strict';
const express     = require('express');
const router      = express.Router();
const request     = require('request');
const bodyParser  = require('body-parser');

router.get('/', (req, res) => {
  console.log('hit / route inside of apiRoute.js');
  res.send('Hello World');
});

// go into our database and get random terms
// the 'numberOfTerms' is how many documents from the
// database that you want to get
router.get('/randomTerms/:numberOfTerms', (req, res) => {
  console.log('get /randomTerms/:numberOfTerms');
});

// hit the Giphy API and grab random giphys
// grab all of the array of player cards,
// and retrieve the image_url's from giphy
// http://api.giphy.com/v1/gifs/search?q=cat&limit=1&api_key=dc6zaTOxFJmzC
router.get('/createCards', (req, res) => {
  console.log('get /createCards');

  let searchTerm = req.query.search;
  let searchURL = 'http://api.giphy.com/v1/gifs/search?q='
                  + searchTerm + '&limit=1&api_key=dc6zaTOxFJmzC';

  request(searchURL, (err, response, body) => {
    let info = JSON.parse(body);
    let giphyArray = [];

    // giphyArray will hold onto the ID, GIF, and still image
    giphyArray[0] = info['data'][0]['id'];
    giphyArray[1] = info['data'][0]['images']['fixed_height']['url'];
    giphyArray[2] = info['data'][0]['images']['fixed_height_still']['url'];

    res.send(giphyArray);
  });

});

// hit the 'Cards Against Humanity' API
// http://www.crhallberg.com/cah/json
// grab a list of questions and save it into our database
router.get('/createQuestions', (req, res) => {
  console.log('get /createQuestions');
});

// app.get('/createQuestions', (req, res) => {
//   console.log('get /createQuestions');
//   Question.find({}, (err, data) => {
// 	  console.log(data);
// 	  console.log(datad[0][Math.floor(Math.random()*423)].text);
// 	  res.send(datad[0][Math.floor(Math.random()*423)].text);
//   });

// });

module.exports = router;
