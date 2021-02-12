let mainStart;
let eltDurations = {};
const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const workdays = ["mon", "tue", "wed", "thu", "fri"];
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
	for(let day of workdays) {
		CURRENT_DAY = day;
		// Build tabel from the current day
		await loadTimeTabel(day)
			.then(objects => buildTabel(objects, day));
	}

	CURRENT_DAY = getCurrentDay();

	updateTimers();

	// Initialize the weekday buttons
	initializeButtons();

	// Update timers every 1000 milliseconds (1 second)
	timerUpdaterInterval = setInterval(updateTimers, 1000);
})();