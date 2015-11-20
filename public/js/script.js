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
      $('#loginpage').hide();
      $('#form').show();
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

});

// ===========================================================================
// Socket Events =============================================================
// ===========================================================================

socket.on('user joined', (users) => {
    let usersList = $('#users ul');
    usersList.empty();
    // update user list
    users.forEach((user) => {
      let userElement = $('<li>');
      userElement.text(user.name);
      usersList.append(userElement);
    });
});

socket.on('send message', (data) => {
  // update chat messages
  let chatList = $('#messages');
  let message = $('<li>');
  message.text(data.name + ' : ' + data.message);
  chatList.append(message);
});
