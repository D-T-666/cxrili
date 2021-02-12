function addBreakEllement(day, duration, id) {
	let BreakEllement;

	BreakEllement = document.createElement("div");
	BreakEllement.classList.add("break");
	BreakEllement.classList.add("time-line-block");
	BreakEllement.classList.add(`${id}`);
	BreakEllement.style.height = `${duration / 2}rem`;

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

	// === Appending ===

	let root = document.getElementById(`${day}-tabel`);

	root.appendChild(BreakEllement);

	// Appending timeline
	BreakEllement.appendChild(timelineContainer);
	timelineContainer.appendChild(timeline);

	// Appending ClassDescription
	BreakEllement.appendChild(ClassDesctiprion);
}