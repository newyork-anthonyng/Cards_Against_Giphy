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

// variable sets what game phase we are in
// judging, checkingForSubmissions?
let currentPhase = 'drawing cards';

// hide user signup and game views
$('.container').hide();			// Naturally hidden
$('.usersignup').hide();		// Naturally hidden
$('.userlogin').show();			// Naturally shown
// $('#side-profile').show();		// Naturally shown
// $('#side-chat').hide();		// Naturally n/a

$(function() {

	// Setup for Handlebars (May Refactor Later)
	let renderTemplate_userProfile = Handlebars.compile($('template#profile-template').html());

  //////////////////
  // User Sign Up //
  //////////////////

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
    }).done(() => {
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

    myUser = username;
		myId = socket.id;
    socket.emit('add user', username);

    $.ajax({
      url: "/user/auth",
      method: "POST",
      data: userData

    }).done((user) => {
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

  $('#msg-submit').click((event) => {
    event.preventDefault();

    let message = $('#message').val();
    socket.emit('send message', {name: myUser, message: message});
    $('#message').val('');
  });

  $('#start-round').click((event) => {
    event.preventDefault();

    $.ajax({
      url: 'http://localhost:3000/startRound'
    });
  });

	//////////////////
	// User Profile //
	//////////////////


	// Show User Profile
	$('#nav-profile').click((event) => {
		event.preventDefault();
		console.log(myUser);

		$.ajax({
			url: "/user/" + myUser,
			method: "GET",

		}).done((user) => {
			// entire user object returned
			let $list = $('#profile-receiver');
			let compiledTemplate = renderTemplate_userProfile(user);
			$list.html('').append(compiledTemplate);
			$('#side-chat').hide();
			$('#side-profile').show();
		})
	})

	// Hide User Profile
	$('#side-back-button').click((event) => {
		$('#side-profile').hide();
		$('#side-chat').show();
	})


	//////////////////
	// User Actions //
	//////////////////

	// user update (username, password)
	$('#update-submit').click((event) => {
		let username = $("#update-username").val();
		let password = $("#update-password").val();
		let userData = {
			username: username,
			password: password
		}

		$.ajax({
			url: "/user",
			method: "PUT",
			data: userData

		}).done(() => {
			$('.container').show();
			$('.userlogin').hide();
		});
	});

	//User Delete Account
	$('#nav-profile').click((event) => {

		let userData = {
			username: myUser
		};

		$.ajax({
			url: "/user",
			method: "DELETE",
			data: userData

		}).done(() => {
			$('.container').hide();
			$('.userlogin').show();
		});
	});

	// User Logout
	$('#nav-logout').click((event) => {
		event.preventDefault();

		$.ajax({
			url: '/user/logout'
		}).done(function(){
			$('.container').hide();
			$('.usersignup').hide();
			$('.userlogin').show();
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
    priorSelectedCards.removeAttr('id');

    let currentlySelectedCard = event.target;

    // add ID of selected to the clicked card
    $(currentlySelectedCard).attr('id', 'selected');
  });

	$(document.body).on('click', '.judging-card', (event) => {
		if(!isJudge) {
			return false;
		}

		console.log('Judge is selecting a card');

		// remove the ID from any other card
		let priorSelectedCards = $('#winner');
		priorSelectedCards.removeAttr('id');

		let currentlySelectedCard = event.target;

		// add ID of "winner" to the clicked card
		$(currentlySelectedCard).attr('id', 'winner');
	});

  // user or judge submits card
  $(document.body).keypress((event) => {
    let enterKeyPressed = (event.keyCode === 13);

		if(currentPhase === 'checking for submissions') {
			// check for players selecting cards
			let cardSelected = $('#selected').length > 0;
	    if(enterKeyPressed && cardSelected) {
	      let data = {};
	      data['userId'] = myId;
	      data['myCard'] = $('#selected img').attr('src');

	      socket.emit('submit card', data);
	    }

		} else if(currentPhase === 'judging') {
			if(!isJudge) {
				return false;
			}
			
			// check for judge selecting card
			let winnerSelected = $('#winner').length > 0;
			if(enterKeyPressed && winnerSelected) {
				currentPhase = 'reveal winner';
			}
		}

  });

  // set up interval method
  let timerID = window.setInterval(() => {
		console.log('current phase: ' + currentPhase);

		// update client's views of their
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
			console.log('my card: ' + data['myCard']);

			socket.emit('reveal winner', data);
		}

  }, 500);
});



///////////////////////////////
// Socket Events - Chat Room //
///////////////////////////////

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

socket.on('send message', (data) => {
  // update chat messages
  console.log(data);
  let chatList = $('#messages');
  let message = $('<li>');
  message.text(data.name + ' : ' + data.message);
  chatList.append(message);

});

//////////////////////////
// Socket Events - Game //
//////////////////////////

// data is an object that contains "users" and "judge"
socket.on('start round', (data) => {
	// reset all client variables
	resetClientVariables();

  let currentUser = getCurrentUser(data['users'], myId);

	if(myId === data['judge']) {
		isJudge = true;
		console.log(data[''])
	}

  let imageList = $('div#user-cards');
  imageList.append('<p>' + currentUser['name'] + '</p>');
});

socket.on('show hand', (users) => {
	if(areCardsShowing) return false;

	// set a different view for judges
	if(isJudge) {
		let gameBoard = $('.gameboard');
		gameBoard.css('background-color', 'yellow');
		return false;
	}

	console.log('script.js : showing hand');
  // only show hand when there are current hands
  let currentUser = getCurrentUser(users, myId);

  let handList = $('div#user-cards');

  if (currentUser === undefined || isJudge) {
    handList.html('').append($('<p>You are the judge</p>'));
  } else {

		// show the card images
	  handList.html('').append($('<li>' + currentUser['name'] + '</li>'));
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
			console.log('line 341 next phase');
			nextPhase();
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
	console.log('script.js socket.on submit card');

	// check to see if it's current user
	// console.log(data['userId']);
	// console.log(myId);
	if(data['userId'] != myId) {
		return false;
	}

	if(didSubmitCard) {
		return false;
	}

	// move the submitted card to the game field
	let submittedContainer = $('#cards-in-play');
	submittedContainer.append($('<img src=' + data['myCard'] + '></img>'));
	didSubmitCard = true;
});

// "submitted" is boolean that tells you if all player's cards are submitted
socket.on('check for submissions', (submitted) => {
	if(submitted === true) {
		// console.log('all players have submitted their cards. Moving into judging');
		console.log('line 384 next phase');
		currentPhase = 'reveal cards';
	}
});

// "submittedCards" is an array of imgUrl's
socket.on('reveal cards', (submittedCards) => {
	// set up judge's view
	let cardsInPlay = $('#cards-in-play');
	cardsInPlay.empty();

	for(let i = 0, j = submittedCards.length; i < j; i++) {
		cardsInPlay.append($('<div class="judging-card"><img src='
													+ submittedCards[i] + '></img></div>'));
	}

	let cardsInHand = $('#user-cards');
	cardsInHand.empty();

	// change all of the classes of the cards

	currentPhase = 'judging';
});

socket.on('judging', () => {
	if(!isJudge) {
		return false;
	}

});

// data contains key, myCard, which contains imgURL
socket.on('reveal winner', (data) => {
	// empty all other cards from the game screen
	let cardsInPlay = $('#cards-in-play');
	cardsInPlay.empty();

	// show the winning card on everyone's screen
	let winnerCard = $('<div><img src=' + data['myCard'] + '></img></div>');
	cardsInPlay.append(winnerCard);

	currentPhase = 'end round';
});

// ==========================================================================
// Convenience Methods ======================================================
// ==========================================================================

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
}

let nextPhase = function() {
	console.log('next phase');
	let phases = ['drawing cards', 'checking for submissions',
								'reveal cards', 'judging', 'reveal winner'];

	// get index of the current phase
	// get the next phase
	let myIndex = phases.indexOf(currentPhase);
	currentPhase = phases[myIndex + 1];
}
