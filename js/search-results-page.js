document.addEventListener('DOMContentLoaded', function() {

	// Get the terms the user has search and the results of
	// that search from URL parameters
	var searchWords = getSearchWords().replace(/%20/g, ' ');
	var searchResults = getSearchResults();

	// Set search results page according to user's search terms
	// and the results of that search, and using the data from
	// games.js file
	updateSearchResultsPage(games, searchResults, searchWords);

	// Get filter options form HTML element
	var filterOptionsForm = document.getElementById('filter-options-form');

	// Uncheck all-checkbox if user checks a console checkbox
	filterOptionsForm.addEventListener('change', updateFilterOptions);
	// Show only the results for the console(s) the user has selected
	filterOptionsForm.addEventListener('submit', filterByConsole);

	// Get filter options HTML elements
	var allCheckbox = document.getElementById('all');
	var switchCheckbox = document.getElementById('switch');
	var n3dsCheckbox = document.getElementById('n3ds');
	var wiiUCheckbox = document.getElementById('wii-u');
	var dsCheckbox = document.getElementById('ds');
	var wiiCheckbox = document.getElementById('wii');


	// Get the terms of user's search from URL parameters
	function getSearchWords() {
		// Get URL parameters
		var URLParams = getURLParams();
		// Get search terms from URL parameters and return them
		var searchWords = URLParams['search-words'];
		return searchWords;
	}

	// Get the results of user's search from URL parameters
	function getSearchResults() {
		// Get URL parameters
		var URLParams = getURLParams();
		// Get search results from URL parameters and return them
		var results = URLParams.results.split(',');
		return results;
	}

	// Update the page according to the search terms of the user and
	// the results of that search
	function updateSearchResultsPage(games, searchResults, searchWords) {
		// Set the page heading according to the search terms
		var searchResultsHeading = document.getElementById('search-results-heading');
		searchResultsHeading.textContent = searchWords;
		// Set the page title according to the search terms
		updatePageTitle('Resultados de "' + searchWords + '"');

		// Fill search results ul with the data of the games in
		// search results
		var searchResultsUl = document.getElementById('search-results-ul');
		var setSearchResultsUlData = setUlDataFactory(searchResultsUl, searchResults);
		setSearchResultsUlData(games);
	}

	// Uncheck all-checkbox if user checks a console checkbox
	function updateFilterOptions(e) {
		// If user clicks all-checkbox, return
		if (e.target === allCheckbox) {
			return;
		}
		// Else, if user checked a console checkbox and all-checkbox is
		// checked, uncheck all-checkbox
		else if (e.target.checked && allCheckbox.checked) {
			allCheckbox.click();
		}
	}

	// Show only the results for the console(s) the user has selected
	function filterByConsole(e) {
		// Prevent reloading the page when user submits the form
		e.preventDefault();
		// If user selected 'all', show all games in the results 
		if (document.getElementById('all').checked) {
			updateSearchResultsPage(games, searchResults, searchWords);
			return;
		}
		// Else show only the games of the consoles the user
		// has selected
		else {
			// Create an array to contain all consoles the
			// user has selected
			var consoles = [];

			// Push all consoles the user has selected into
			// the consoles array
			if (switchCheckbox.checked) {
				consoles.push('Switch');
			}
			if (n3dsCheckbox.checked) {
				consoles.push('N3DS');
			}
			if (wiiUCheckbox.checked) {
				consoles.push('Wii U');
			}
			if (dsCheckbox.checked) {
				consoles.push('DS');
			}
			if (wiiCheckbox.checked) {
				consoles.push('Wii');
			}

			// Filter out all search results that are not for games
			// of the consoles the user has selected
			var filteredResults = searchResults.filter(function(result) {
				return consoles.indexOf(games[result].console) > -1;
			});

			// Update the page displaying only the search results
			// for the consoles the user has selected
			updateSearchResultsPage(games, filteredResults, searchWords);

		}

	}

});