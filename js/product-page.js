document.addEventListener('DOMContentLoaded', function() {
	// Set the data of the game requested by the user,
	// taking the data from games.js
	updateProduct(games);
	function updateProduct(games) {
		// Get which game the user has requested
		var gamePermalink = getURLParams().game.replace(/%20/g, '-');
		// Set the data of the game in the page
		setProductData(games[gamePermalink]);
		// Set the page title according to the game name
		updatePageTitle(games[gamePermalink].name);
	}

	function setProductData(game) {
		// Get HTML elements to fill with game's data
		var productCover = document.getElementById('product-cover');
		var productName = document.getElementById('product-name');
		var purchaseLink = document.getElementById('purchase-link');
		var productConsole = document.getElementById('product-console');
		var productPrice = document.getElementById('product-price');
		var productRating = document.getElementById('product-rating');
		var productReviewCount = document.getElementById('product-review-count');
		var productDescription = document.getElementById('product-description');
		// Get HTML ul where additional images of the
		// game will be displayed
		var productAdditionalImgsUL = document.getElementById('additional-imgs-ul');

		// Fill HTML elements with game's data
		productCover.setAttribute('src', game.coverURL);
		productCover.setAttribute('alt', game.coverAlt);
		productName.textContent = game.name;
		// purchaseLink.setAttribute('href', 'purchase.html?game=' + game.permalink);
		productConsole.textContent = game.console;
		productPrice.textContent = game.price;
		productRating.textContent = game.rating;
		productReviewCount.textContent = game.reviewCount;
		productDescription.textContent = game.description;


		// If user is logged in purchase button will redirect
		// to purchase page, else it will redirect to log in
		// page
		if (userIsLoggedIn()) {
			purchaseLink.setAttribute('href', 'purchase.html?game=' + game.permalink);
		} else {
			purchaseLink.setAttribute('href', 'log-in.html?game=' + game.permalink);
		}

		// Fill additional images ul with images' data
		game.additionalImages.forEach(function(image) {
			// Create the new li element to put the image
			var newLi = document.createElement('li');
			// Fill it with the image and its data
			newLi.innerHTML = '<div class="additional-img"> <img src="'
			+ image.imageURL + '" alt="'
			+ image.imageAlt + '"> </div>';
			// Append it to the ul
			productAdditionalImgsUL.appendChild(newLi);
		});

	}
});