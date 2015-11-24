'use strict';

let socket = io();
let myUser;
let myId;
let token;

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
      method: "POST",
      data: userData
    }).done(function(){
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
      method: "POST",
      data: userData
    }).done(function(user){
      // ajax setup token default header
      token = user.token;
      console.log(token);
      $('.container').show();
      $('.userlogin').hide();

      // log the user into the chatroom and game
    });
  });

  $('#nav-logout').click((event) => {
    console.log('hitting here');
    // Authorization: Bearer token

    let userData = {
      token: token
    }

    console.log(userData);

    $.ajax({
      url: "/user/logout",
      method: "POST",
      data: userData
      // Authorization: Bearer token
    }).done(function(){
      // ajax setup token default header
      // user.token = null;
      $('.container').hide();
      $('.userlogin').show();
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

  // set up interval method
  // let timerID = window.setInterval(() => {
  //   socket.emit('show hand');
  // }, 200);

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

// ===========================================================================
// Socket Events - Game ======================================================
// ===========================================================================

socket.on('start round', (users) => {
  let currentUser = getCurrentUser(users, myId);

  let imageList = $('#hand');
  imageList.append('<p>' + currentUser['name'] + '</p>');
});

socket.on('show hand', (users) => {
  console.log('Script.js: Showing Hand');

  let currentUser = getCurrentUser(users, myId);

  // append all of our card images into the hand list
  let handList = $('#hand');
  handList.empty();
  handList.append($('<li>' + currentUser['name'] + '</li>'));
  for(let i = 0, j = currentUser['images'].length; i < j; i++) {
    let myCard = $('<li><img src=' + currentUser['images'][i]['giphy'] + '></img></li>');
    handList.append(myCard);
  }
});

// convenience method
// pass in all users in the game, and the client's unique ID
// return the user object for the client
let getCurrentUser = function(allUsers, currentUserId) {
  for(let i = 0, j = allUsers.length; i < j; i++) {
    if(allUsers[i]['id'] === currentUserId) {
      return allUsers[i];
    }
  }
}
