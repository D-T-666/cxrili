let mainStart;
let eltCount = 0;
let eltDurations = [0];
const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
let CURRENT_DAY = getCurrentDay();
let switchedToNextDay = false;

let timerUpdaterInterval;

function getCurrentDay(real) {

	let d = new Date();

	// Get the URL parameter
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const url_Day = urlParams.get('d');

	if (real)
		return DAYS[d.getDay()];
	else
		return url_Day || DAYS[d.getDay()];
}

(async function main() {
	// Get the current day from the URL or the date
	let day = getCurrentDay();

	// Initialize the weekday buttons
	initializeButtons();

	// Build tabel from the current day
	loadTimetabel(day)
		.then(objects => buildtabel(objects));

	// Update timers every 1000 milliseconds (1 second)
	timerUpdaterInterval = setInterval(updateTimers, 1000);
})();