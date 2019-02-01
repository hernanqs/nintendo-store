document.addEventListener('DOMContentLoaded', function() {
	// get HTML log in form and its inputs
	var logInForm = document.getElementById('log-in-form');
	var emailInput = document.getElementById('email');
	var passwordInput = document.getElementById('password');

	// Pass the game URL parameter so the page can be redirected
	// to the game's purchase page once the user has created
	// the account
	if (getURLParams().game) {
		var signUpLink = document.getElementById('sign-up-link');
		signUpLink.setAttribute('href', 'sign-up.html?game=' + getURLParams().game)
	}

	// handle log in form's submit
	logInForm.addEventListener('submit', handleLogInFormSubmit);

	function handleLogInFormSubmit(e) {
		// Prevent reloading the page
		e.preventDefault();

		// get users data from localStorage
		var usersData = JSON.parse(window.localStorage.getItem('usersData'));

		// If there are not created accounts
		if (!usersData || Object.keys(usersData).length === 0) {
			// Get main content HTML element to be able to change
			// the totallity of the page content, except header and
			// footer
			var mainContent = document.getElementById('main-content');

			// Tell the user that there is no created accounts and
			// suggest to create an account
			if (getURLParams().game) {
				// If game URL paramater is present, pass it so the
				// page can redirect to game's purchase page once
				// the user has logged in
				displayContinueMessage(mainContent,'No hay ninguna cuenta de usuario creada, ¡crea una!', 'sign-up.html?game=' + getURLParams().game);
			} else {
				displayContinueMessage(mainContent,'No hay ninguna cuenta de usuario creada, ¡crea una!', 'sign-up.html');
			}
			return;
		}

		// Set variable to know outside the for loop if the
		// atempt to log in was successful or not 
		var wasLogInSuccessful = false;

		// Check if there is the user's account (email) entered
		// by current user exist and if the password is correct
		for (var userId of Object.keys(usersData)) {
			if (userId === emailInput.value && usersData[userId].password === passwordInput.value) {
				// get data of the user account entered by current user
				var userData = usersData[userId];
				// load user data into a new item in localStorage
				// to imitate logging in in a user account
				window.localStorage.setItem('loggedInUserData', JSON.stringify(userData));
				// Inform outside the loop that the log in was
				// successful and end the loop
				wasLogInSuccessful = true;
				break;
			}
		}

		// If the user has logged in, redirect to
		// the the game's purchase page if there
		// is a game passed as URL parameter, if
		// there is not redirect to the index page
		if (wasLogInSuccessful) {
			var URLParams = getURLParams();
			if (URLParams.game) {
				window.location.href = 'purchase.html?game=' + URLParams.game;
			}
			else {
				window.location.href = 'index.html';
			}
		}
		// Else if the account the user entered does not exist
		// or the password is incorrect display an error message
		else {
			var failToLogInMessageP = document.getElementById('fail-to-log-in-message');
			// If it is not the first time the user enters a
			// wrong account/password, display the hidden
			// error message
			if (failToLogInMessageP) {
				failToLogInMessageP.style.display = 'inline-block';
			}
			// If it is the first time, create the error message
			else {
				// Create the HTML elemenent
				var failToLogInMessage = document.createElement('div');
				failToLogInMessage.innerHTML = '<p id="fail-to-log-in-message" class="fail-to-log-in-message">' +
	            		'Cuenta o contraseña incorrecta.' +
	        		'</p>'
				// Get main content HTML element to be able to change
				// the totallity of the page content, except header and
				// footer
				var mainContent = document.getElementById('main-content');
				// Append the message to main content
				mainContent.appendChild(failToLogInMessage);

				// Hide the message when the user changes the
				// account/password
				failToLogInMessageP = document.getElementById('fail-to-log-in-message');
				logInForm.addEventListener('change', function() {
					failToLogInMessageP.style.display = 'none';
				});
			}
		}
	}

});