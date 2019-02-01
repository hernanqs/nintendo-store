document.addEventListener('DOMContentLoaded', function() {

	// Map the category identifiers (used in HTML id's) to
	// categories' names (used in the page title and heading
	// and in games' data)
	var categoryNames = {
		ALL: 'Todos',
		switch: 'Switch',
		n3ds: '3DS',
		'wii-u': 'Wii U',
		ds: 'DS',
		wii: 'Wii'
	}

	// Get the category requested by user
	var category = getCategory();

	// Set the page title according to the category name
	updatePageTitle(categoryNames[category]);

	// Write category in the heading of the page
	updateCatalogHeading(category);

	// Get the games that are in category
	var gamesInCategory = getGamesInCategory(category);

	// Display the games in category
	updateCatalogPage(games, gamesInCategory);


	// Function definitions

	// Return the category from the URL parameters
	function getCategory() {
		var URLParams = getURLParams();
		var category = URLParams.category;
		return category;
	}

	// Write category in the heading of the page
	function updateCatalogHeading(category) {
		// Get HTML span in the heading
		var catalogHeading = document.getElementById('catalog-heading');
		// Write the category
		catalogHeading.textContent = categoryNames[category];
	}

	// Update the page to display the games in category
	function updateCatalogPage(games, gamesInCategory) {
		// Get HTML where games will be displayed
		var gamesInCategoryUl = document.getElementById('games-in-category-ul');
		// Create the function for filling the ul where
		// games will be displayed
		var setGamesInCategoryUlData = setUlDataFactory(gamesInCategoryUl, gamesInCategory);
		// Feed the function with games' data and display them
		setGamesInCategoryUlData(games);

	}

	// Returna an array with the games that are in category
	function getGamesInCategory(category) {
		// If category is ALL return all games
		if (category === 'ALL') {
			return Object.keys(games);
		} else {
			// Else return only the games for the
			// requested console
			return Object.keys(games).filter(function(game) {
				return games[game].console === categoryNames[category];
			});

		}

	}

});