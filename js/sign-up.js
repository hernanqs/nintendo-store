document.addEventListener('DOMContentLoaded', function() {
	
	// Get HTML sign up form and its inputs

	var signUpForm = document.getElementById('sign-up-form');

	var nameInput = document.getElementById('name');
	var surnameInput = document.getElementById('surname');
	var emailInput = document.getElementById('email');
	var addressInput = document.getElementById('address');

	var creditCardRadioButton = document.getElementById('credit-card');
	var paypalRadioButton = document.getElementById('paypal');
	var paymentAccountInput = document.getElementById('payment-account');

	var passwordInput = document.getElementById('password');
	var repeatPasswordInput = document.getElementById('repeat-password');

	// Get label for payment account to be able to change its text
	// according to selected payment means
	var paymentAccountLabel = document.getElementById('payment-account-label');

	// Set sign up form
	updateSignUpForm();

	// Handle changes in sign up form according to
	// user's choices 
	signUpForm.addEventListener('change', updateSignUpForm);

	// Handle sign up form's submit
	signUpForm.addEventListener('submit', function(e) {
		e.preventDefault();

		// Check that the password and the confirmation
		// password are the same
		if (passwordInput.value !== repeatPasswordInput.value) {

			// If password and repeated password are not the same,
			// alert user and don't create the account
			alert('La contraseña no coincide con la contraseña repetida.');
			return;

		} else {

			// Get the data entered by the user
			var name = nameInput.value;
			var surname = surnameInput.value;
			var email = emailInput.value;
			var address = addressInput.value;

			var paymentMeans = creditCardRadioButton.checked ?
				'credit-card' : 
				paypalRadioButton.checked ? 'paypal' : undefined;
			var paymentAccount = paymentAccountInput.value;

			var password = passwordInput.value;

			// If there's no usersData object in localStorage create it
			if (!window.localStorage.getItem('usersData')) {
				window.localStorage.setItem('usersData', '{}')
			}

			// Get data for all users and parse it
			var usersData = JSON.parse(window.localStorage.getItem('usersData'));

			// Create an object with the data entered by the user
			var currUserData = {
				'name': name,
				'surname': surname,
				'email': email,
				'address': address,
				'paymentMeans': paymentMeans,
				'paymentAccount': paymentAccount,
				'password': password
			}

			// Write/overwrite current user data in local storage
			// using user's email as user's unique id
			usersData[email] = currUserData;
			window.localStorage.setItem('usersData', JSON.stringify(usersData));

			// Log in into the new account
			window.localStorage.setItem('loggedInUserData', JSON.stringify(currUserData));

			// Get main content HTML element to be able to change
			// the totallity of the page content, except header and
			// footer
			var mainContent = document.getElementById('main-content');

			// Show success message, if game URL parameter is
			// present the continue button will redirect to
			// game's purchase page, else it will redirect
			// to index page
			URLParams = getURLParams();
			if (URLParams.game) {
				displayContinueMessage(mainContent,'¡La cuenta ha sido creada con éxito!', 'purchase.html?game=' + URLParams.game);
			} else {
				displayContinueMessage(mainContent,'¡La cuenta ha sido creada con éxito!', 'index.html');
			}
			
		}
	});

	// Update content of sign up form elements according to
	// user's choices 
	function updateSignUpForm() {
		// Change payment account text according to the 
		// selected payment means
		if (paypalRadioButton.checked) {
			paymentAccountLabel.innerText = 'Cuenta de Paypal';
		} else if (creditCardRadioButton.checked) {
			paymentAccountLabel.innerText = 'Número de tarjeta de crédito';
		}
	}

});