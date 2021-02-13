let mainStart;
let eltDurations = {};
const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const workdays = ["mon", "tue", "wed", "thu", "fri"];
let CURRENT_DAY = getCurrentDay();
let switchedToNextDay = false;

let timerUpdaterInterval;

(async function main() {
	for (let day of workdays) {
		CURRENT_DAY = day;
		// Build table from the current day
		await loadTimeTable(day)
			.then(objects => buildTable(objects, day));
	}

	CURRENT_DAY = getCurrentDay();

	updateTimers();

	// Initialize the weekday buttons
	initializeButtons();

	// Update timers every 1000 milliseconds (1 second)
	timerUpdaterInterval = setInterval(updateTimers, 1000);
})();