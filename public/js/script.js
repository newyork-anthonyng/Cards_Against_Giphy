'use strict';

// Client user information
let socket = io();
let myUser;
let myId;
let token;

// Client board information
let isQuestionShowing = false;
let areCardsShowing = false;
let didSubmitCard = false;
let isJudge = false;

// after the winner is revealed, set a timer for when the next round starts
let nextRoundTimer;
let winnerInformation;

// variable sets what game phase we are in
let currentPhase = 'drawing cards';

function verifyToken(xhr) {
	if (localStorage.getItem('userToken')) {
		xhr.setRequestHeader('Authorization',
					'Bearer ' + localStorage.getItem('userToken'));
	}
}

// hide user signup and game views
$('.container').hide();			// Naturally hidden
$('.user-signup').hide();		// Naturally hidden
$('.user-login').show();		// Naturally shown
$('#profile-status').hide();	// Naturally hidden

$(function() {

	// Setup for Handlebars (May Refactor Later)
	let renderTemplate_userProfile = Handlebars.compile($('template#profile-template').html());
	let renderTemplate_updateProfile = Handlebars.compile($('template#profile-update').html());

/////////////////////////////////////////////////
// User Sign Up /////////////////////////////////
/////////////////////////////////////////////////

  $('#signuplink').click((event) => {
		event.preventDefault();
    $('.user-login').hide();
    $('.user-signup').show();
  });

  $('#signup-submit').click((event) => {
		signup();
  });

	$('#signup-password').keypress(function(event) {
		if(event.keyCode === 13) {
			signup();
		}
	});

  $('#loginlink').click((event) => {
		event.preventDefault();
    $('.user-signup').hide();
    $('.user-login').show();
  });

  // login user using token
  $('#login-submit').click((event) => {
		login();
  });

	// allow user to press "enter" to login
	$('#login-password').keypress(function(event) {
		if(event.keyCode === 13) {
			login();
		}
	});

  // Message entered
  $('#message').keypress(function(event) {
    if(event.keyCode === 13) {
      enterMessage();
    }
  });

  $('#msg-submit').click((event) => {
    event.preventDefault();

		enterMessage();
  });

  $('#start-round').click((event) => {
    event.preventDefault();

    $.ajax({
      url: 'https://secret-stream-8173.herokuapp.com/startRound'
    });
  });

/////////////////////////////////////////////////
//User Profile //////////////////////////////////
/////////////////////////////////////////////////

	// Show User Profile
	$('#nav-profile').click((event) => {
		event.preventDefault();
		console.log(myUser);

		$.ajax({
			'beforeSend': verifyToken,
			url: "/user/" + myUser,
			method: "GET"
		}).done((user) => {
			// entire user object returned
			let $list = $('#profile-status');
			let compiledTemplate = renderTemplate_userProfile(user);
			$list.empty().append(compiledTemplate);
		})
	})

	// Hide User Profile
	$(document.body).on('click', '#side-back-button',  function() {
		console.log('HIT PROFILE HIDE');
		let profileView = $('#profile-status');
		profileView.html('');
		profileView.empty();
		profileView.hide();
		$('#game-status').show();
	});


/////////////////////////////////////////////////
//User Actions //////////////////////////////////
/////////////////////////////////////////////////

	$(document.body).on('click', '#profile-edit',  function() {
		event.preventDefault();

		$.ajax({
			'beforeSend': verifyToken,
			url: "/user/" + myUser,
			method: "GET"
		}).done((user) => {
			// entire user object returned
			let $list = $('#profile-status');
			let compiledTemplate = renderTemplate_updateProfile(user);
			$list.empty().append(compiledTemplate);
		})
	})

	// user update (username, password)
	$(document.body).on('click', '#update-submit',  function() {
		let username = $("#update-username").val();
		let password = $("#update-password").val();
		let userData = {
			username: username,
			password: password
		}

		$.ajax({
			'beforeSend': verifyToken,
			url: "/user/" + myUser,
			method: "PUT",
			data: userData
		}).done(() => {
			let profileView = $('#profile-status');
			profileView.html('');
			profileView.empty();
			profileView.hide();
			$('#game-status').show();
		});
	});

	// User Delete Account
	$(document.body).on('click', '#profile-delete',  function() {

		let userData = {
			username: myUser
		};

		$.ajax({
			'beforeSend': verifyToken,
			url: "/user",
			method: "DELETE",
			data: userData

		}).done(() => {
			$('.container').hide();
			$('.user-login').show();
		});
	});

	// User Logout
	$('#nav-logout').click((event) => {
		event.preventDefault();
		$.ajax({
			'beforeSend': verifyToken,
			url: '/user/logout'
		}).done(function(){
			localStorage.removeItem('userToken');
			$('.container').hide();
			$('.user-signup').hide();
			$('.user-login').show();
		});
	});

	$('#nav-profile').click((event) => {
		event.preventDefault();
		console.log(myUser);

		$.ajax({
			'beforeSend': verifyToken,
			url: "/user/" + myUser,
			method: "GET"
		}).done((user) => {
			// entire user object returned
			$('#game-status').hide();
			let $list = $('#profile-status');
			let compiledTemplate = renderTemplate_userProfile(user);
			$list.empty().append(compiledTemplate);
			$('#profile-status').show();
		})
	})

/////////////////////////////////////////////////
// Giphy Cards //////////////////////////////////
/////////////////////////////////////////////////

  // user can click and select card
  // must use document.body because cards are dynamically added to DOM
  $(document.body).on('click', '.card', (event) => {
    // remove the ID from any other card
    let priorSelectedCards = $('#selected');
    priorSelectedCards.removeAttr('id');

    let currentlySelectedCard = event.target;

    // add ID of selected to the clicked card
    $(currentlySelectedCard).attr('id', 'selected');

		if($(event.target).attr('class') === 'card-img') {
			if(window.confirm('Submit this card?')) {

				if(currentPhase === 'checking for submissions') {
					let data = {};
					data['userId'] = myId;
					data['myCard'] = $('#selected').attr('src');

					socket.emit('submit card', data);
				}
			}
		}

  });

	$(document.body).on('click', '.judging-card', (event) => {
		if(!isJudge) {
			return false;
		}

		// remove the ID from any other card
		let priorSelectedCards = $('#winner');
		priorSelectedCards.removeAttr('id');

		let currentlySelectedCard = event.target;

		// add ID of "winner" to the clicked card
		$(currentlySelectedCard).attr('id', 'winner');
		if($(event.target).attr('id') === 'winner') {
			if(window.confirm('Choose this card as winner?')) {
				if(currentPhase === 'judging') {
					currentPhase = 'reveal winner';
				}
			}
		}
	});

  // set up interval method
  let timerID = window.setInterval(() => {
    if(!areCardsShowing) socket.emit('show hand');

    if(!isQuestionShowing) socket.emit('show question');

		if(currentPhase === 'checking for submissions') {
			socket.emit('check for submissions');
		}

		if(currentPhase === 'reveal cards') {
			socket.emit('reveal cards');
		}

		if(currentPhase === 'judging') {
			socket.emit('judging');
		}

		if(currentPhase === 'reveal winner') {
			// declare winner
			let data = {};
			data['myCard'] = $('#winner').attr('src');

			socket.emit('reveal winner', data);

			// if timer isn't created, make one
			if (!nextRoundTimer) {
				nextRoundTimer = window.setTimeout(function() {
					currentPhase = 'start round';

					// on the judge's client side, award points
					if(isJudge) {
						let winner = winnerInformation['name'];

						// increase the score of player
						let userData = {
							wins: winner
						};

						$.ajax({
							'beforeSend' : verifyToken,
							url: "/user/addWins/" + winner,
							method: "PUT",
							data: userData

						});
					}

					// start next round
					$.ajax({
						url: 'https://secret-stream-8173.herokuapp.com/startRound'
					});

				}, 2000);
			}
		}
  }, 500);
});

/////////////////////////////////////////////////
// Socket Events - Chat Room ////////////////////
/////////////////////////////////////////////////

socket.on('user joined', (users) => {
    // update list of users online
    let usersList = $('#messages');
    usersList.empty();
    users.forEach((user) => {
      let userElement = $('<li>');
      userElement.text(user.name + ' joined the room');
      usersList.append(userElement);
    });
});

socket.on('send message', (data) => {
  // update chat messages
  console.log(data);
  let chatList = $('#messages');
  let message = $('<li>');
  message.text(data.name + ' : ' + data.message);
  chatList.append(message);

});

/////////////////////////////////////////////////
// Socket Events - Game /////////////////////////
/////////////////////////////////////////////////

// data is an object that contains "users" and "judge"
socket.on('start round', (data) => {
	resetClientVariables();

  let currentUser = getCurrentUser(data['users'], myId);

	if(myId === data['judge']) {
		isJudge = true;
	}

	currentPhase = 'show hand';
});

// users is an array of all of the players
socket.on('show hand', (users) => {
	if(areCardsShowing) return false;

	// set a different view for judges
	let gameBoard = $('.gameboard');

	if(isJudge) {
		gameBoard.css('background-color', 'yellow');
		return false;
	} else {
		gameBoard.css('background-color', 'white');
	}


  // only show hand when there are current hands
  let currentUser = getCurrentUser(users, myId);
  let handList = $('#user-cards');
  if (currentUser === undefined || isJudge) {
    handList.html('').append($('<p>Welcome to the start of the game</p>'));
	// console.log(currentUser);
	// console.log(isJudge);
  } else {

		// show the card images
	  for(let i = 0, j = currentUser['images'].length; i < j; i++) {
	    let myCard =
	      $('<div class="card"><img class="card-img" src=' +
	      currentUser['images'][i]['giphy']
	      + '></img></div>');
	    handList.append(myCard);
	  }

	  // stop updating this when all cards are shown
	  if(currentUser['images'].length === 6) {
	    areCardsShowing = true;
			currentPhase = 'checking for submissions';
	  }
	}
});

socket.on('show question', (question) => {
  if(!question) {
    return false;
  }

  let questionContainer = $('#question');
  questionContainer.html('').append($('<p>' + question + '</p>'));
  isQuestionShowing = true;
});

// data is an object with keys of "userId" and...
// "myCard", which holds the Giphy imgUrl
socket.on('submit card', (data) => {
	// check to see if it's current user
	if(data['userId'] != myId) {
		return false;
	}

	if(didSubmitCard) {
		return false;
	}

	// move the submitted card to the game field
	let submittedContainer = $('#cards-in-play');
	submittedContainer.append($('<img id="user-selected" src=' + data['myCard'] + '></img>'));
	didSubmitCard = true;
});

// "submitted" is boolean that tells you if all player's cards are submitted
socket.on('check for submissions', (submitted) => {
	if(submitted === true) {
		currentPhase = 'reveal cards';
	}
});

// "submittedCards" is an array of objects...
// with keys of 'userId', 'name' and 'imgURL'
socket.on('reveal cards', (submittedCards) => {
	// set up judge's view
	let cardsInPlay = $('#cards-in-play');
	cardsInPlay.empty().append('<ul class="cards-in-play-list"></ul>');

	let cardsInPlayList = $('.cards-in-play-list');

	for(let i = 0, j = submittedCards.length; i < j; i++) {
		cardsInPlayList.append($('<li class="judging-card"><img src='
													+ submittedCards[i]['imgURL'] + '></img></li>'));
	}

	let cardsInHand = $('#user-cards');
	cardsInHand.empty();

	currentPhase = 'judging';
});

socket.on('judging', () => {
	if(!isJudge) {
		return false;
	}

});

// data contains key, myCard, which contains imgURL
socket.on('reveal winner', (data) => {
	winnerInformation = data;

	// empty all other cards from the game screen
	let cardsInPlay = $('#cards-in-play');
	cardsInPlay.empty();

	// show the winning card on everyone's screen
	let winnerCard = $('<img id="winning-card" src=' + data['imgURL'] + '></img><br>');
	cardsInPlay.append(winnerCard);
	cardsInPlay.append('<h3>' + data['name'] + ' won this round.</h3>');

	currentPhase = 'end round';
});

/////////////////////////////////////////////////
// Convenience Methods //////////////////////////
/////////////////////////////////////////////////

// pass in all users in the game, and the client's unique ID
// return the user object for the client
let getCurrentUser = function(allUsers, currentUserId) {
  for(let i = 0, j = allUsers.length; i < j; i++) {
    if(allUsers[i]['id'] === currentUserId) {
      return allUsers[i];
    }
  }
}

let resetClientVariables = function() {
	isQuestionShowing = false;
	areCardsShowing = false;
	didSubmitCard = false;
	isJudge = false;
	nextRoundTimer = false;

	// reset the gameboard
	$('#cards-in-play').empty();
	$('#user-cards').empty();
}

let login = function() {
	event.preventDefault();

	let username = $("#login-username").val();
	let password = $("#login-password").val();
	let userData = {
		username: username,
		password: password
	}

	myUser = username;
	myId = socket.id;
	socket.emit('add user', username);

	$.ajax({
		url: "/user/auth",
		method: "POST",
		data: userData

	}).done((user) => {
		localStorage.setItem('userToken', user.token);
		$('.container').show();
		$('.user-login').hide();
	});
}

let signup = function() {
	let username = $("#signup-username").val();
	let password = $("#signup-password").val();
	let userData = {
		username: username,
		password: password,
		wins: 0
	}

	$.ajax({
		url: "/user/signup",
		method: "POST",
		data: userData
	}).done(() => {
			$('.user-signup').hide();
			$('.user-login').show();
	});
}

let enterMessage = function() {
	let message = $('#message').val();
	socket.emit('send message', {name: myUser, message: message});
	$('#message').val('');
}
