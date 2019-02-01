document.addEventListener('DOMContentLoaded', function() {
	// If user is not logged in, redirect to log in page
	if (!userIsLoggedIn()) {
		if (getURLParams().game) {
			window.location.href = 'log-in.html?game=' + getURLParams().game;
		} else {
			window.location.href = 'log-in.html';
		}
	}

	// Get HTML elements
	var productCover = document.getElementById('product-cover');
	var productName = document.getElementById('product-name');
	var purchaseForm = document.getElementById('purchase-form');

	// Get purchase form HTML elements
	var creditCardRadioButton = document.getElementById('credit-card');
	var paypalRadioButton = document.getElementById('paypal');
	var paymentAccountInput = document.getElementById('payment-account');
	var CDFormatInput = document.getElementById('cd');
	var deliveryMethodFieldset = document.getElementById('delivery-method-fieldset');
	var addressFieldset = document.getElementById('address-fieldset');
	var numberOfItems = document.getElementById('number-of-items');

	// Get label for payment account to be able to change its text
	// according to selected payment means
	var paymentAccountLabel = document.getElementById('payment-account-label');

	// Get price table HTML elements
	var priceTableOriginalPrice = document.getElementById('price-table-original-price');
	var priceTableDeliveryCost = document.getElementById('price-table-delivery-cost');
	var priceTableTaxes = document.getElementById('price-table-taxes');
	var priceTablePricePerUnit = document.getElementById('price-table-price-per-unit');
	var priceTableTotalPrice = document.getElementById('price-table-total-price');
	var commonMethodInput = document.getElementById('common-method');
	var specialMethodInput = document.getElementById('special-method');
	var premiumMethodInput = document.getElementById('premium-method');

	// Get h2 HTML element to display total price
	var purchasePrice = document.getElementById('purchase-price');

	// Listen for changes in the options selected by the
	// user and update the form fields and price table
	// according to them
	purchaseForm.addEventListener('change', updatePurchaseInfo);

	// Set the info of the game requested by the user
	// using the data in games.js
	updatePurchasePage(games);

	// Variable used for calculations about the total cost
	var originalPrice;

	// Set the info of the game requested by the user
	// using the data in games.js
	function updatePurchasePage(games) {
		// Get the game requested by the user
		var gamePermalink = getURLParams().game.replace(/%20/g, '-');
		// Set game data in the page and the form
		setPurchasePageData(games[gamePermalink]);
		updatePurchaseInfo();
		// Set the page title according to the game name
		updatePageTitle(games[gamePermalink].name);
	}

	// Set game data in the page
	function setPurchasePageData(game) {
		// Set game cover
		productCover.setAttribute('src', game.coverURL);
		productCover.setAttribute('alt', game.coverAlt);
		// Set game name
		productName.textContent = game.name;
		// Set game price in the page
		priceTableOriginalPrice.textContent = game.price;
		// Set game price in the variable used for
		// calculations about the total cost
		originalPrice = game.price;

	}

	// Update the information in the form and in the
	// price table
	function updatePurchaseInfo() {
		updatePurchaseForm();
		updatePriceTable();
	}

	// Update the form fields according to user choices
	function updatePurchaseForm() {
		// If user choses to buy the game in fisical
		// format enable address and delivery
		// methods fields
		if (CDFormatInput.checked) {
			addressFieldset.removeAttribute('disabled');	
			deliveryMethodFieldset.removeAttribute('disabled');	
		} else {
			// If user choses digital format, disable
			// those fields
			addressFieldset.setAttribute('disabled', '');	
			deliveryMethodFieldset.setAttribute('disabled', '');	
		}
		// Change payment account text according to the 
		// selected payment means
		if (paypalRadioButton.checked) {
			paymentAccountLabel.innerText = 'Cuenta de Paypal:';
		} else if (creditCardRadioButton.checked) {
			paymentAccountLabel.innerText = 'Número de tarjeta de crédito:';
		}
	}

	// Update the information in price table according
	// to user coises
	function updatePriceTable() {
		// Set delivery cost to 0 in order to avoid errors
		// for calculating with undefined
		var deliveryCost = 0;

		// Percentage of the original game price added to 
		// total cost according to the method selected
		// by the user
		var commonMethodPercentage = 0.5;
		var specialMethodPercentage = 2;
		var premiumMethodPercentage = 5;

		// Calculate delivery cost according to the
		// delivery method selected by the user
		if (!deliveryMethodFieldset.disabled) {
			if (commonMethodInput.checked) {
				deliveryCost = calcPercentage(commonMethodPercentage, originalPrice);
			} else if (specialMethodInput.checked) {
				deliveryCost = calcPercentage(specialMethodPercentage, originalPrice);
			} else if (premiumMethodInput.checked) {
				deliveryCost = calcPercentage(premiumMethodPercentage, originalPrice);
			}
		}

		// Percentage of the original game price added
		// to total cost because of taxes
		var taxesPercentage = 22;

		// Calculate cost of taxes
		var taxes = calcPercentage(taxesPercentage, originalPrice);

		// Calculate price of one unit of the game
		var pricePerUnit = originalPrice + deliveryCost + taxes;
		// Calculate the price of the number of units
		// of the game the user wants to buy
		var totalPrice = numberOfItems.value * pricePerUnit;

		// Display calculated cost in price table
		priceTableDeliveryCost.textContent = deliveryCost;
		priceTableTaxes.textContent = taxes;
		priceTablePricePerUnit.textContent = pricePerUnit;
		priceTableTotalPrice.textContent = totalPrice;
		purchasePrice.textContent = totalPrice;
	}

	// Calculate the percentage passed as first argument of
	// the number passed as second argument
	function calcPercentage(percentage, num) {
		return (num * percentage) / 100;
	}

	// Handle purchase form submit

	// Get main content HTML element to be able to change
	// the totallity of the page content, except header and
	// footer
	var mainContent = document.getElementById('main-content');

	// When user submits purchase form show success message
	purchaseForm.addEventListener('submit', handlePurchaseFormSubmit);
	function handlePurchaseFormSubmit(e) {
		// Prevent reloading the page
		e.preventDefault();
		// Show success message
		displayContinueMessage(mainContent,'¡Compra realizada con éxito!', 'index.html');
	}

	// Handle when user is logged in

	// Get purchase form HTML elements
	var userNameField = document.getElementById('name');
	var userSurnameField = document.getElementById('surname');
	var userEmailField = document.getElementById('email');

	var creditCardField = document.getElementById('credit-card');
	var paypalField = document.getElementById('paypal');
	var paymentAccountField = document.getElementById('payment-account');
	var addressField = document.getElementById('address');

	// If there is a user logged in then pre-fill purchase form
	// with user's account data
	if (userIsLoggedIn()) {
		// Get data of logged in user
		var userData = JSON.parse(window.localStorage.getItem('loggedInUserData'));

		// Get HMTL form intput to be filled with
		// user's data

		userNameField.value = userData.name;
		userSurnameField.value = userData.surname;
		userEmailField.value = userData.email;

		// Check the payment means the user has chosen
		if (userData.paymentMeans === 'credit-card') {
			creditCardField.checked = true;
		} else if (userData.paymentMeans === 'paypal') {
			paypalField.checked = true;
		}

		paymentAccountField.value = userData.paymentAccount;
		addressField.value = userData.address;

		// Update the form fields according to user choices
		updatePurchaseForm();
	}

});