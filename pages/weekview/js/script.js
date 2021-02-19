const workdays = ["mon", "tue", "wed", "thu", "fri"];
const georgian_days = {
	mon: "ორშაბათი",
	tue: "სამშაბათი",
	wed: "ოთხშაბათი",
	thu: "ხუთშაბათი",
	fri: "პარასკევი",
	times: "დროები",
};

function initializeButtons() {
	const today = getCurrentDay(true);

	for (let day of workdays) {
		let elt = document.getElementById(`${day}-table`);

		if (elt) {
			if (today === day) {
				elt.classList.add("today");
			}

			elt.addEventListener(
				"click",
				(evt) => {
					window.location.href = `/cxrili/?d=${day}`;
				},
				false
			);
		} else {
			console.error(`no element with id '${day}-table' found.`);
		}
	}

	document.getElementById("menu").addEventListener(
		"click",
		(evt) => {
			window.location.href = "/cxrili/";
		},
		false
	);

	document
		.getElementById("theme-switcher")
		.addEventListener("click", (evt) => {
			document.body.classList.toggle("dark-theme");
		});
}

async function buildTables() {
	for (let day of workdays) {
		await createTableElement(day);
	}
	// await createTableElement("times");
}

(async () => {
	await buildTables();
	initializeButtons();

	loadWebsiteVersion();
})();
