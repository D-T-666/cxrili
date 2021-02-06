function createClassEllement(name, duration, start, end, id){
	let ClassEllement;

	ClassEllement = document.createElement("div");
	ClassEllement.classList.add("class")
	ClassEllement.classList.add("time-line-block");
	ClassEllement.style.height = `${duration/2}rem`;
	ClassEllement.id = `${id}`;

	// Timeline creation
	let timelineContainer, timeline;
	timeline = document.createElement("div");
	timelineContainer = document.createElement("div");
	timeline.classList.add("time-line");
	timelineContainer.classList.add("time-line-container");

	// ClassDesctiprion creation
	let ClassDesctiprion, className;
	// classDescription
	ClassDesctiprion = document.createElement("div");
	ClassDesctiprion.classList.add("class-description");
	// className
	className = document.createElement("div");
	className.classList.add("class-name")
	className.innerHTML = name;
	ClassDesctiprion.appendChild(className);
	// timers
	let classTimers, timerTimeLeft, timerStart, timerEnd;
	// classTimers
	classTimers = document.createElement("div");
	classTimers.classList.add("class-timers")
	ClassDesctiprion.appendChild(classTimers);
	// timerTimeLeft
	timerTimeLeft = document.createElement("div");
	timerTimeLeft.classList.add("timer-left");
	timerTimeLeft.classList.add("timer");
	timerTimeLeft.innerHTML = `<p>დარჩა:</p><p class="timer-time">0:00:00</p>`
	classTimers.appendChild(timerTimeLeft);
	// timerStart
	timerStart = document.createElement("div");
	timerStart.classList.add("timer-start");
	timerStart.classList.add("timer");
	timerStart.innerHTML = `<p>იწყება:</p><p class="timer-time">${start}</p>`
	classTimers.appendChild(timerStart);
	// timerEnd
	timerEnd = document.createElement("div");
	timerEnd.classList.add("timer-end");
	timerEnd.classList.add("timer");
	timerEnd.innerHTML = `<p>სრულდება:</p><p class="timer-time">${end}</p>`
	classTimers.appendChild(timerEnd);


	// === Appending ===

	let root = document.getElementById("root-div");
	
	root.appendChild(ClassEllement);

	// Appending timeline
	ClassEllement.appendChild(timelineContainer);
	timelineContainer.appendChild(timeline);

	// Appending ClassDescription
	ClassEllement.appendChild(ClassDesctiprion);
}