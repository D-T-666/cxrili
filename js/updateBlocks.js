const updateTimer = (elt, time) => {
	if (time > 0) {
		const s = String(time % 60).padStart(2, "0");
		time = Math.floor(time / 60);
		const m = String(time % 60).padStart(2, "0");

		elt.innerHTML = `${m}:${s}`;
	} else {
		elt.innerHTML = `0:00:00`;
	}
};

const updateTimeLine = (elt, time, currentEltDurations, i) => {
	if (time < currentEltDurations[i + 1]) {
		if (time >= currentEltDurations[i]) {
			let p =
				(time - currentEltDurations[i]) /
				(currentEltDurations[i + 1] - currentEltDurations[i]);
			elt.style.height = `${p * 100}%`;
		} else {
			elt.style.height = "0%";
		}
	} else {
		elt.style.height = "100%";
	}
};

const updateBlockBackground = (elt, time, currentEltDurations, i) => {
	if (time < currentEltDurations[i + 1]) {
		if (time >= currentEltDurations[i]) {
			elt.classList.add("active");
			// if (elt.classList.contains("break")) {
			// 	elt.style.backgroundImage = "repeating-linear-gradient(-25deg, var(--break-color), var(--break-color) 0.4rem, var(--break-color-dark) 0, var(--break-color-dark) 0.8rem)";
			// } else {
			// 	elt.style.color = "var(--class-color-bright)";
			// 	elt.style.backgroundImage = "repeating-linear-gradient(30deg, var(--class-color-trans), var(--class-color-trans) 0.4rem, #0006 0.4rem, #0006 1rem)";
			// }
		} else {
			elt.classList.remove("active");
		}
	} else {
		// if (elt.classList.contains("break"))
		// 	elt.style.backgroundColor = "var(--break-color-trans)";
		// else
		// 	elt.style.backgroundColor = "var(--grey-trans)";
		// elt.style.backgroundImage = "";
		// elt.style.color = "var(--class-color)";
	}
};

function updateBlocks() {
	const date = new Date();
	let d, h, m, s;
	d = date.getDay();
	h = 10; //date.getHours();
	m = date.getMinutes();
	s = date.getSeconds();

	// Current time in seconds
	const time = s + m * 60 + h * 60 * 60;
	const day = DAYS[d];

	const currentEltDurations = eltDurations[day];
	const nBlocks = currentEltDurations.length - 1; // The first element is ignored

	const tableElement = document.getElementById(`${day}-table`);

	tableElement.classList.add("today");

	for (let i = 0; i < nBlocks; i++) {
		const elt = tableElement.getElementsByClassName(`${i}`)[0];

		const timerElement = elt.getElementsByClassName("timer-left")[0];

		const timeLineElement = elt.getElementsByClassName("time-line")[0];

		let timeLeft = currentEltDurations[i] - time;

		// If the ellement is not of class 'break' we can
		// update timers it displays
		if (!elt.classList.contains("break")) {
			// If it's past the start time of this class, switch
			// countdown to be counting down towards the end of the class.
			if (timeLeft <= 0)
				timeLeft += currentEltDurations[i + 1] - currentEltDurations[i];

			// Update the timer
			updateTimer(timerElement, timeLeft);
		}

		// Update the time line
		updateTimeLine(timeLineElement, time, currentEltDurations, i);

		// Update the block background
		updateBlockBackground(elt, time, currentEltDurations, i);
	}

	// Total time left
	const timeTillEndOfDay =
		currentEltDurations[currentEltDurations.length - 1] - time;

	// If the day has ended more than 5 minutes ago, automatically
	// switch to the next day (If not already switched)
	if (timeTillEndOfDay < -5 * 60 && !switchedToNextDay) {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const urlDay = urlParams.get("d");

		// If there is a day provided in the url bar, don't switch.
		if (urlDay === null) {
			CURRENT_DAY = d + 1 !== 0 && d + 1 !== 6 ? DAYS[d + 1] : DAYS[1];
			updateTablesAndButtons();
		}
		switchedToNextDay = true;
	}
}
