let pauseScrollDetection = false;

function initializeButtons() {
	for (let day of workdays) {
		let button = document.getElementById(day);

		button.addEventListener(
			"click",
			(evt) => {
				if (CURRENT_DAY !== day) {
					CURRENT_DAY = day;

					updateTablesAndButtons();
				}
			},
			false
		);

		if (day === getCurrentDay(true)) {
			button.classList.add("today");
		}
	}
	document.getElementById("root-div").addEventListener("scroll", (evt) => {
		if (!pauseScrollDetection) {
			const w = document.body.scrollWidth;
			const pageN = Math.floor(
				(document.getElementById("root-div").scrollLeft + w / 2) / w
			);

			CURRENT_DAY = workdays[pageN];

			updateButtons();
		}
	});
	document.getElementById("menu").addEventListener("click", (evt) => {
		window.location.href = "/cxrili/pages/weekview/";
	});
	updateTablesAndButtons();
}

async function updateTables() {
	const tables = document.getElementsByClassName("table-container");
	for (let table of tables) {
		if (table.id !== `${CURRENT_DAY}-table`) {
			table.classList.remove("active");
		} else {
			table.classList.add("active");
			table.scrollIntoView();

			pauseScrollDetection = true;
			setTimeout((_) => {
				pauseScrollDetection = false;
			}, 400);
		}
	}
}

async function updateButtons() {
	// Update weekday buttons
	const buttons = document.getElementsByClassName("weekday");
	for (let btn of buttons) {
		if (btn.id !== CURRENT_DAY) btn.classList.remove("selected");
		else btn.classList.add("selected");
	}
}

async function updateTablesAndButtons() {
	await updateButtons();

	await updateTables();
}
