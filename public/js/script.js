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

  // giphy test
  $('#createGiphy').click((event) => {
    event.preventDefault();
    console.log('Button clicked');

    // for testing
    let searchTerm = $('#giphyInput').val();
    console.log('Search Term: ' + searchTerm);

    $.ajax({
      url: 'http://localhost:3000/createCards',
      // for testing purposes
      data: { search: searchTerm }
    }).done((data) => {
      $('#giphy').empty();
      $('#giphy').append('<div><img src=' + data[1] +'></img></div>');
    });
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
