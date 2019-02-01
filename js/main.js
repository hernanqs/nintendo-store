document.addEventListener('DOMContentLoaded', function() {
	
	// Update log navbar if user is logged in

	// Get log sub-dropdown HTML elements
	var logSubDropdownBtn = document.getElementById('log-sub-dropdown-btn');
	var logUl = document.getElementById('log-ul');

	// If user is logged in, update log navbar
	// if (userData) {
	if (userIsLoggedIn()) {
		// Get data of logged in user
		var userData = JSON.parse(window.localStorage.getItem('loggedInUserData'));

		logSubDropdownBtn.innerHTML = '<span class="fa fa-user navbar-item">';
		// Update log sub-dropdown button's styles to show that it now 
		// represents the logged in user
		logSubDropdownBtn.style = 'background-color: #fff; color: #de0000;' +
			'width: 28px; height: 27px; border-radius: 50%; margin: 2px 3px;' + 
			'font-size: 14px;';
		// Create log out button
		logUl.innerHTML = '<li class="navbar-item navbar-li">' +
		'<button class="navbar-item log-out-btn" onclick="deleteAccount()">Eliminar cuenta</button> </li>' +
		'<li class="navbar-item navbar-li">' +
		'<button class="navbar-item log-out-btn" onclick="logOut()">Cerrar sesión</button> </li>';
	}

	// Search function

	// Get HTML search form elements
	var searchForm = document.getElementById('search-form');
	var searchText = document.getElementById('search-text');

	searchForm.addEventListener('submit', search);

	function search (e) {
		// Prevent reloading the page
		e.preventDefault();

		// Get user's search words
		var searchWords = searchText.value.split(/\W/gi);

		var searchResults = [];

		// Search in every game's name and push matches in search results
		for(game in games) {
			searchWords.forEach(function (searchWord) {
				if (games[game].name.toLowerCase().search(searchWord.toLowerCase()) > -1) {
					// Avoid duplicated results
					if (searchResults.indexOf(games[game].permalink) === -1) {
						searchResults.push(games[game].permalink);
					}
				}
			});
		}

		// Redirect to search results page with search results as URL parameters
		window.location.href = 'search-results.html?search-words=' + searchText.value + '&results=' + searchResults.join(',');

	}

});

// Toggle dropdown menu function for menu icon button in smartphones
function toggleDropdown () {
	var dropdownElements = document.getElementsByClassName('dropdown');
	for (var i = 0; i < dropdownElements.length; i++) {
		dropdownElements[i].classList.toggle('show');
	}
}

// Toggle sub-dropdown menus function for devices with touchscreens

// Toggle catalog subdropdown when user clicks catalog sub-dropsown
// button
function toggleCatalogSubDropdown () {
	// Get HTML catalog sub-dropdown element
	var catalogSubDropdown = document.getElementById('catalog-sub-dropdown');
	// Toggle catalog subdropdown
	catalogSubDropdown.classList.toggle('show-sub-dropdown');
}

// If catalog sub-dropdown is shown and user clicks outside, 
// hide catalog sub-dropdown
document.addEventListener('click', removeCatalogSubDropdown);
function removeCatalogSubDropdown (e) {
	// Get HTML catalog sub-dropdown element
	var catalogSubDropdown = document.getElementById('catalog-sub-dropdown');

	if (!e.target.closest('#catalog-sub-dropdown')) {
		if (catalogSubDropdown.classList.contains('show-sub-dropdown')) {
			catalogSubDropdown.classList.remove('show-sub-dropdown');
		}
	}
}

// Toggle log subdropdown when user clicks catalog sub-dropsown
// button
function toggleLogSubDropdown () {
	// Get HTML log sub-dropdown element
	var logSubDropdown = document.getElementById('log-sub-dropdown');
	// Toggle log subdropdown
	logSubDropdown.classList.toggle('show-sub-dropdown');
}

// If log sub-dropdown is shown and user clicks outside, 
// hide log sub-dropdown
document.addEventListener('click', removeLogSubDropdown);
function removeLogSubDropdown (e) {
	// Get HTML log sub-dropdown element
	var logSubDropdown = document.getElementById('log-sub-dropdown');

	if (!e.target.closest('#log-sub-dropdown')) {
		if (logSubDropdown.classList.contains('show-sub-dropdown')) {
			logSubDropdown.classList.remove('show-sub-dropdown');
		}
	}
}


// Logging Functions

// Log out function for log out button
function logOut() {
	// Remove loggedInUserData item from local storage to imitate logging out
	window.localStorage.removeItem('loggedInUserData');
	// Reload page to update log navbar
    window.location.reload(false);    
}


// Display a message that gives the user the option
// of deleting the user account
function deleteAccount() {
	// If user is in the index page delete carousel to
	// display message correctly (carousel is outside
	// of main content)
	var carousel = document.getElementById('carousel');
	if (carousel) {
		carousel.parentNode.removeChild(carousel);
	}
	// Display a message to ask for confirmation
	displayAcceptOrCancelMessage(
		// Replace the content of the page for a message box
		document.getElementById('main-content'),
		// Message
		'¿Realmente desea eliminar su cuenta?',
		// Name of the function for deleting the account
		'acceptDeleteAccount',
		// Name of the function for not deleting the account
		'cancelDeleteAccount'
	)
}

// Function for accepting deleting the account,
// delete the account from local storage
function acceptDeleteAccount() {
	// Get data current user and parse it
	var currUser = JSON.parse(window.localStorage.getItem('loggedInUserData'));
	// Get data for all users and parse it
	var usersData = JSON.parse(window.localStorage.getItem('usersData'));
	// Delete current user data from the object
	// that contains all users data
	delete usersData[currUser.email]
	// Set the new usersData object without current user's
	// data in the local storage
	window.localStorage.setItem('usersData', JSON.stringify(usersData));
	// Remove loggedInUserData item from local
	// storage to imitate logging out
	window.localStorage.removeItem('loggedInUserData');
	// Reload page to update log navbar
	window.location.reload(false);    
}

// Function for canceling deleting the account,
// reload the page to remove the message
function cancelDeleteAccount() {
	window.location.reload(false);    
}


// Helper functions to be used from other .js files

// Factory that uses the items passed as second argument to create
// HTML li elements inside the ul passed as first argument and 
// returns a function that accepts as argument the data used to
// fill those HTML li elements
function setUlDataFactory (ul, items) {
	// Return the function that accepts the data use to fill
	// the HTML li elements
	return function (games) {
		// Empty ul to avoid accumulation with li elements
		// previously added to it
		ul.innerHTML = '';
		// Iterate over all items to create a li element, fill it
		// with the data taken from games and append it to the ul
		items.forEach(function(game) {
			// Check that game is not an empty string
			if (game) {
				var newLi = document.createElement('li');
				newLi.innerHTML = '<article class="product"> <div class="product-image"> <a href="product.html?game='
				+ games[game].permalink +'"> <img src="'
				+ games[game].coverURL + '" alt="' + games[game].coverAlt
				+ '"> </a> </div> <h3 class="product-name">' + games[game].name
				+ '</h3> <p class="product-price">US$' + games[game].price + '</p> </article>';
				ul.appendChild(newLi);
			}
		});
	}
}

// Get URL Parameters and return them in an object
function getURLParams() {
	// Get a string containing the URL parameters 
	var paramsString = window.location.href.split('?')[1];

	// If there are not URL parameters, return an empty object
	if (!paramsString) {
		return {};
	}
	// Split the string containg the URL parameters into
	// key-value pairs
	var pairs = paramsString.split('&');

	// Create an object containing the URL parameters and return it
	var paramsObj = {};
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split('=');
		paramsObj[pair[0]] = pair[1];
	}
	return paramsObj;
}

// Replace container's content with a message and the option
// of go to the URL passed as third argument
function displayContinueMessage(container, message, continueURL) {
	container.innerHTML = '<div class="message-box">' +
	    '<h2 class="message-heading">' + message + '</h2>' +
	    '<div class="message-link-div">' +
	        '<a href="' + continueURL + '" class="message-link">Continuar</a>'
	    '</div>' +
	'</div>';
}

// // Replace container's content with a accept or cancel message
function displayAcceptOrCancelMessage(container, message, acceptFunctionName, cancelFunctionName) {
	container.innerHTML = '<div class="message-box">' +
	    '<h2 class="message-heading">' + message + '</h2>' +
    	'<button class="main-button" onclick="' +
    	cancelFunctionName + '()">Cancelar</button>' +
    	'<button class="main-button" onclick="' + 
    	acceptFunctionName + '()">Aceptar</button>' +
	'</div>';
}

// If the user is logged in return true, else return false
function userIsLoggedIn() {
	if (window.localStorage.getItem('loggedInUserData')) {
		return true;
	} else {
		return false;
	}
}

// Update the title of the HTML page
function updatePageTitle(titleText) {
	var pageTitle = document.getElementsByTagName('title')[0];
	pageTitle.textContent = 'Nintendo Store | ' + titleText;
}