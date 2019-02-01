var dropdownElements = document.getElementsByClassName('dropdown');

function toggleDropdown () {
	for (var i = 0; i < dropdownElements.length; i++) {
		dropdownElements[i].classList.toggle('show');
	}
}

