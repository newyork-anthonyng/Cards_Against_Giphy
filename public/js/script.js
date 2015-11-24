'use strict';

// Client user information
let socket = io();
let myUser;
let myId;
let token;

// Client board information
let isQuestionShowing = false;
let areCardsShowing = false;

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
      // token expire
      token = user.token;
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

// ==========================================================================
// Giphy Cards ==============================================================
// ==========================================================================

  // user can click and select card
  // must use document.body because cards are dynamically added to DOM
  $(document.body).on('click', '.card', (event) => {
    // remove the ID from any other card
    let priorSelectedCards = $('#selected');
    $('#selected').removeAttr('id');

    let currentlySelectedCard = event.target;

    // add ID of selected to the clicked card
    $(currentlySelectedCard).attr('id', 'selected');
  });

  // user submits card
  $(document.body).keypress((event) => {
    let enterKeyPressed = (event.keyCode === 13);
    let cardSelected = $('#selected').length > 0;

    if(enterKeyPressed && cardSelected) {
      let data = {};
      data['userId'] = myId;
      data['myCard'] = $('#selected img').attr('src');

      console.log('Enter was pressed');
      socket.emit('submit card', data);
    }
  });

  // set up interval method
  let timerID = window.setInterval(() => {
    if(!areCardsShowing) socket.emit('show hand');

    if(!isQuestionShowing) socket.emit('show question');

  }, 500);
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
  // only show hand when there are current hands
  let currentUser = getCurrentUser(users, myId);
  if (currentUser === undefined) {
    return false;
  }

  // append all of our card images into the hand list
  let handList = $('#hand');
  handList.empty();
  handList.append($('<li>' + currentUser['name'] + '</li>'));
  for(let i = 0, j = currentUser['images'].length; i < j; i++) {
    let myCard =
      $('<li><div class="card"><img src=' +
      currentUser['images'][i]['giphy']
      + '></img></div></li>');
    handList.append(myCard);
  }

  // stop updating this when all cards are shown
  if(currentUser['images'].length === 6) {
    areCardsShowing = true;
  }
});

socket.on('show question', (question) => {
  if(!question) {
    return false;
  }
  console.log('Script.js: Showing Hand');

  let questionContainer = $('#question');
  questionContainer.empty();

  questionContainer.append($('<p>' + question + '</p>'));
  isQuestionShowing = true;
});

socket.on('submit card', (data) => {
  console.log('script.js: submit card');
  console.log(data);
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
