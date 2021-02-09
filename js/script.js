let mainStart;
let eltCount = 0;
let eltDurations = [0];
let CURRENT_DAY = getCurrentDay();

function getCurrentDay(real) {
	const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

	let d = new Date();

	// Get the URL parameter
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const url_Day = urlParams.get('d');


	if (real)
		return days[d.getDay()];
	else
		return url_Day || days[d.getDay()];
}

(async function main() {
	// Get the current day from the URL or the date
	let day = getCurrentDay();

	// Initialize the weekday buttons
	initializeButtons();

	// Build table from the current day
	loadTimeTable(day)
		.then(objects => buildTable(objects));

	// Update timers every 1000 milliseconds (1 second)
	setInterval(updateTimers, 1000);
})();