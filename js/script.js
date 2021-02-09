let mainStart;
let eltCount = 0;
let eltDurations = [0];
let CURRENT_DAY = undefined;

function getCurrentDay(real = false) {
	const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

	if (CURRENT_DAY == undefined) {
		let d = new Date();

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const url_Day = urlParams.get('d');

		if (!real)
			CURRENT_DAY = url_Day || days[d.getDay()];
		else
			CURRENT_DAY = days[d.getDay()];
	}
	return CURRENT_DAY;
}

function updateTimers() {
	let date = new Date();
	let time = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 60 * 60;

	for (let i = 0; i < eltDurations.length - 1; i++) {
		let elt = document.getElementById(i);
		let left = (eltDurations[i] * 60 + mainStart * 60) - time;
		if (left <= 0) {
			left += (eltDurations[i + 1] - eltDurations[i]) * 60;
			if (!elt.classList.contains("break")) elt.childNodes[1].childNodes[1].childNodes[0].style.backgroundColor = 'var(--end-color)';
		} else {
			if (!elt.classList.contains("break")) elt.childNodes[1].childNodes[1].childNodes[0].style.backgroundColor = 'var(--start-color)';
		}

		// Updating timers
		if ((i) % 2 == 0) {
			timer = elt.childNodes[1].childNodes[1].childNodes[0].childNodes[1];
			if (left > 0) {
				let s = String(left % 60).padStart(2, "0"); left = Math.floor(left / 60);
				let m = String(left % 60).padStart(2, "0"); left = Math.floor(left / 60);
				let h = String(left);

				timer.innerHTML = `${h}:${m}:${s}`;
			} else {
				timer.innerHTML = `0:00:00`;
			}
		}

		// Updating timelines
		timer = elt.childNodes[0].childNodes[0];
		if (time / 60 < eltDurations[i + 1] + mainStart) {
			if (time / 60 > eltDurations[i] + mainStart) {
				let p = (time / 60 - (eltDurations[i] + mainStart)) / (eltDurations[i + 1] - eltDurations[i]);
				timer.style.height = `${p * 100}%`;
				elt.style.color = "var(--class-color-bright)";

				if (!elt.classList.contains("break")) {
					elt.style.backgroundImage = "repeating-linear-gradient(30deg, var(--class-color-trans), var(--class-color-trans) 0.4rem, #0006 0.4rem, #0006 1rem)";
				} else {
					elt.style.backgroundImage = "repeating-linear-gradient(-25deg, var(--break-color), var(--break-color) 0.4rem, var(--break-color-dark) 0, var(--break-color-dark) 0.8rem)";
				}
			} else {
				timer.style.height = "0%";
			}
		} else {
			if (elt.classList.contains("break")) {
				elt.style.backgroundColor = "var(--break-color-trans)";
			} else {
				elt.style.backgroundColor = "#0006";
			}
			elt.style.backgroundImage = "";
			timer.style.height = "100%";
			elt.style.color = "var(--class-color)";
		}
	}
}

function buildTable(objects) {
	mainStart = objects[0].start;

	let total_duration = 0;

	for (let obj of objects) {
		if (obj.name == 'break') {
			addBreakEllement(obj.duration, eltCount);
		} else {
			start = `${String(Math.floor(obj.start / 60)).padStart(2, "0")}:${String(obj.start % 60).padStart(2, "0")}`
			end = `${String(Math.floor(obj.end / 60)).padStart(2, "0")}:${String(obj.end % 60).padStart(2, "0")}`
			createClassEllement(obj.name, obj.duration, start, end, eltCount);
		}
		eltCount++;
		total_duration += obj.duration;
		eltDurations.push(Number(total_duration));
	}
}

(async function main() {
	let day = getCurrentDay();

	initializeButtons();

	let objects = await loadTimeTable(day);

	buildTable(objects)

	updateTimers();
	setInterval(updateTimers, 1000);
})();