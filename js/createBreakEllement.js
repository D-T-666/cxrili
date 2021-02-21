function addBreakEllement(day, duration, id) {
	if (duration > 0) {
		let BreakEllement;

		BreakEllement = document.createElement("div");
		BreakEllement.classList.add("break");
		BreakEllement.classList.add("time-line-block");
		BreakEllement.classList.add(`${id}`);
		BreakEllement.classList.add(duration > 300 ? "long" : "short");

		// Timeline creation
		let timelineContainer, timeline;
		timeline = document.createElement("div");
		timelineContainer = document.createElement("div");
		timeline.classList.add("time-line");
		timelineContainer.classList.add("time-line-container");

		// ClassDesctiprion creation
		let ClassDesctiprion;
		ClassDesctiprion = document.createElement("div");
		ClassDesctiprion.classList.add("class-description");

		let classTimers, timerTimeLeft;
		// classTimers
		classTimers = document.createElement("div");
		classTimers.classList.add("class-timers");
		ClassDesctiprion.appendChild(classTimers);
		// timerTimeLeft
		timerTimeLeft = document.createElement("div");
		timerTimeLeft.classList.add("timer-left");
		timerTimeLeft.classList.add("timer");
		timerTimeLeft.innerHTML = `<p class="timer-time">00:00</p>`;
		classTimers.appendChild(timerTimeLeft);

		// === Appending ===

		let root = document.getElementById(`${day}-table`);

		root.appendChild(BreakEllement);

		// Appending timeline
		BreakEllement.appendChild(timelineContainer);
		timelineContainer.appendChild(timeline);

		// Appending ClassDescription
		BreakEllement.appendChild(ClassDesctiprion);
	}
}

function max(a, b) {
	return a > b ? a : b;
}
