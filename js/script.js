let eltDurations = {};
const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const workdays = ["mon", "tue", "wed", "thu", "fri"];
let CURRENT_DAY = getCurrentDay();
let REAL_CURRENT_DAY = getCurrentDay(true);
let switchedToNextDay = false;

let timerUpdaterInterval;

(async function main() {
	fetch("/cxrili/updateCache");

	initializeTheme();

	for (let day of workdays) {
		CURRENT_DAY = day;
		// Build table from the current day
		await loadTimeTable(day).then((objects) => buildTable(objects, day));
		createTotalTimeLeftBlock(day);
	}

	CURRENT_DAY = getCurrentDay();

	updateBlocks();

	await loadWebsiteVersion();

	// Initialize the weekday buttons
	initializeButtons();

	updateBlocks();
	// Update timers every 1000 milliseconds (1 second)
	timerUpdaterInterval = setInterval(updateBlocks, 1000);
})();
