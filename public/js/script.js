'use strict';

let socket = io();
let myUser;

$(function() {

  // Login entered
  $('#login-input').keypress((event) => {
    if(event.keyCode === 13) {
      let username = $('#login-input').val();
      myUser = username;
      socket.emit('add user', username);
      $('#login-input').val('');
      $('#login-view').hide();
      // $('#form').show();
    }
  });

  // Message entered
  $('#message').keypress(function(event) {
    if(event.keyCode === 13) {
      let message = $('#message').val();
      socket.emit('send message', {name: myUser, message: message});
      $('#message').val('');
    }
  });

  $('#start-round').click((event) => {
    event.preventDefault();

    $.ajax({
      url: 'http://localhost:3000/startRound'
    });
  });

// ===========================================================================
// Test Events ===============================================================
// ===========================================================================
  $('#createGiphy').click((event) => {
    event.preventDefault();

    let searchTerm = $('#giphyInput').val();
    console.log('Search Term: ' + searchTerm);

    $.ajax({
      url: 'http://localhost:3000/api/createCards',
      data: { search: searchTerm }
    }).done((data) => {
      $('#giphy').empty();
      $('#giphy').append('<div><img src=' + data[1] +'></img></div>');
    });
  });


  $('#showHand').click((event) => {
    event.preventDefault();

    // go through ever single term and get the img_url for them
    // get the img_url
    let searchTerms = ['dog', 'kitten', 'tarzan'];
    for(let i = 0, j = searchTerms.length; i < j; i++) {
      (function(i) {
        $.ajax({
          url: 'http://localhost:3000/api/createCards/' + searchTerms[i]
        }).done((data) => {
          console.log(i + ': ' + data['giphy']);
        });
      })(i);
    }
  });

});

// ===========================================================================
// Socket Events - Chat Room =================================================
// ===========================================================================

socket.on('user joined', (users) => {
    // update list of users online
    let usersList = $('#game-status');
    usersList.empty();
    users.forEach((user) => {
      let userElement = $('<li>');
      userElement.text(user.name);
      usersList.append(userElement);
    });
});

socket.on('show judge', (user) => {
  let container = $('#cards-in-play');
  let text = '';
  if(user.isJudge) {
    text = 'I\'m a judge';
  } else {
    text = 'I\'m a player';
  }

  container.text(text);
});

socket.on('send message', (data) => {
  // update chat messages
  let chatList = $('#messages');
  let message = $('<li>');
  message.text(data.name + ' : ' + data.message);
  chatList.append(message);

});

// get giphy's for hand
// data will be an array of search terms
socket.on('get hand', (data) => {
  // get search terms
  let searchTerm = data;

  for(let i = 0, j = searchTerm.length; i < j; i++) {
    let currentTerm = searchTerm[i];

    $.ajax({
      url: 'http://localhost:3000/api/createCards',
      data: { search: currentTerm }
    }).done((data) => {
      $('#myHand').empty();
      let newHand = $('<ul>');
      for(let i = 0, j = data.length; i < j; i++) {
        let newCard = $('<li><img src=' + data[i] + '></img></li>');
        newHand.append(newCard);
      }

      $('#myHand').append(newHand);
    });
  }

});

// ===========================================================================
// Socket Events - Game ======================================================
// ===========================================================================

socket.on('start round', (data) => {
  console.log(data);

});

socket.on('show hand', (hand) => {
  console.log('Script.js: Showing Hand');



  let handList = $('#myHand');

  // go through each card and add it to list
  let myHand = $('<img src=' + hand + '></img>');
  handList.append(myHand);
});
