document.addEventListener('DOMContentLoaded', function() {

	// Display the games indicated in index-games.js
	// in the different sections of the page, using
	// the data stored in games.js
	updateIndex(games, indexGames);
	
	function updateIndex(games, indexGames) {

		// Get the HTML ul's where the games will be
		// displayed
		var latestUl = document.getElementById('latest-ul');
		var featuredUl = document.getElementById('featured-ul');
		var offersUl = document.getElementById('offers-ul');

		// Create the functions that will display the
		// games passed as second argument in the ul
		// passed as first argument
		var setLatestUlData = setUlDataFactory(latestUl, indexGames.latest);
		var setFeaturedUlData = setUlDataFactory(featuredUl, indexGames.featured);
		var setOffersUlData = setUlDataFactory(offersUl, indexGames.offers);

		// Use the functions to display the games with
		// the data taken from games.js file
		setLatestUlData(games);
		setFeaturedUlData(games);
		setOffersUlData(games);
	}

});