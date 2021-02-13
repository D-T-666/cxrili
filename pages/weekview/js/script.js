const workdays = ['mon', 'tue', 'wed', 'thu', 'fri'];
const georgian_days = {
	'mon': 'ორშაბათი',
	'tue': 'სამშაბათი',
	'wed': 'ოთხშაბათი',
	'thu': 'ხუთშაბათი',
	'fri': 'პარასკევი',
}

function initializeButtons() {
	const today = getCurrentDay(true);

	for (let day of workdays) {
		let elt = document.getElementById(`${day}-table`);

		if (today === day) {
			elt.classList.add("today");
		}

		elt.addEventListener('click', evt => {
			window.location.href = `/cxrili/?d=${day}`;
			console.log(day);
		}, false);
	}

	document.getElementById('menu').addEventListener('click', evt => {
		window.location.href = '/cxrili/';
	}, false)
}

async function buildTables() {
	for (let day of workdays) {
		createTableElement(day);
	}
}

(async () => {
	console.log('Hello, world!');
	await buildTables();
	initializeButtons();
})()