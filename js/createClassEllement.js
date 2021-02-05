function createClassEllement(name, duration, start, end){
	let id, ClassEllement;

	id = `${name}-${start}`;

	ClassEllement = document.createElement("div");
	ClassEllement.classList.add("class")
	ClassEllement.classList.add("time-line-block");
	ClassEllement.style.height = `${duration/2}rem`;

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
	let classTimers, timerStart, timerEllapsed, timerEnd;
	// classTimers
	classTimers = document.createElement("div");
	classTimers.classList.add("class-timers")
	ClassDesctiprion.appendChild(classTimers);
	// timerStart
	timerStart = document.createElement("div");
	timerStart.classList.add("timer-start");
	timerStart.classList.add("timer");
	timerStart.innerHTML = `<p>დაიწყება</p><p class="timer-time">${start}</p>`
	classTimers.appendChild(timerStart);
	// timerEllapsed
	timerEllapsed = document.createElement("div");
	timerEllapsed.classList.add("timer-start");
	timerEllapsed.classList.add("timer");
	timerEllapsed.innerHTML = `<p>გასულია</p><p class="timer-time">${NaN}</p>`
	classTimers.appendChild(timerEllapsed);
	// timerEnd
	timerEnd = document.createElement("div");
	timerEnd.classList.add("timer-start");
	timerEnd.classList.add("timer");
	timerEnd.innerHTML = `<p>დასრუკლდება</p><p class="timer-time">${end}</p>`
	classTimers.appendChild(timerEnd);


	// === Appending ===

	let root = document.getElementById("root-div");
	
	root.appendChild(ClassEllement);

	// Appending timeline
	ClassEllement.appendChild(timelineContainer);
	timelineContainer.appendChild(timeline);

	// Appending ClassDescription
	ClassEllement.appendChild(ClassDesctiprion);
	
	return id;
}