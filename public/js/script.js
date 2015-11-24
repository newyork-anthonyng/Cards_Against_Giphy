'use strict';

let socket = io();
let myUser;
let myId;

// hide user signup and game views
$('.container').hide();
$('.usersignup').hide();

$(function() {

  // ==========================================================================
  // User Sign Up =============================================================
  // ==========================================================================
  
  // user signup
  $('#signuplink').click((event) => {
    $('.userlogin').hide();
    $('.usersignup').show();
  });

  $('#signup-submit').click((event) => {
    let username = $("#signup-username").val();
    let password = $("#signup-password").val();
    let userData = {
      username: username,
      password: password
    }

    // if(password === password)

    $.ajax({
      url: "/user/signup",
      method: "post",
      data: userData
    }).done(function(user){
      // if (save error)
        $('.usersignup').hide();
        $('.userlogin').show();
    });
  });

  $('#loginlink').click((event) => {
    $('.usersignup').hide();
    $('.userlogin').show();
  });

  // login user using token
  $('#login-submit').click((event) => {

    let username = $("#login-username").val();
    let password = $("#login-password").val();
    let userData = {
      username: username,
      password: password
    }

    $.ajax({
      url: "/user/auth",
      method: "post",
      data: userData
    }).done(function(user){
      console.log("hi there");
      $('.container').show();
      $('.userlogin').hide();
    });
  });

  // Login entered
  $('#login-input').keypress((event) => {
    if(event.keyCode === 13) {
      let username = $('#login-input').val();
      // set variables on client side
      myUser = username;
      myId = socket.id;
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

socket.on('start round', (users) => {
  console.log('socket on start round');

  let currentUser = undefined;

  // find our current user
  // match it by checking the Socket ID's
  for(let i = 0, j = users.length; i < j; i++) {
    if(users[i]['id'] === myId) {
      currentUser = users[i];
      break;
    }
  }

  let imageList = $('#hand');
  imageList.append('<p>' + currentUser['name'] + '</p>');
});

socket.on('show hand', (hand) => {
  console.log('Script.js: Showing Hand');

  let handList = $('#myHand');

  // go through each card and add it to list
  let myHand = $('<img src=' + hand + '></img>');
  handList.append(myHand);
});
