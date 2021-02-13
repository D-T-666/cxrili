async function loadTimes() {
	let times = [];

	const response = await fetch('/cxrili/timetable/times.csv');
	const data = await response.text();

	const table = data.split("\n").map(a => a.split(",").map(b => b.trim()));

	for (let i = 0; i < table.length; i++) {
		const start = table[i][0];
		const end = table[i][0];
		times.push(`${start} - ${end}`);
	}

	return times;
}

function getClasses(data) {
	const classes = data.filter(event => event.name != 'break');

	const classList = classes.map(cls => cls.name);

	return classList;
}

async function createTableElement(day) {
	const tableElement = document.createElement('div');
	tableElement.classList.add('table');
	tableElement.id = `${day}-table`;

	document.getElementById('root-div').appendChild(tableElement);

	const tableTitle = document.createElement('div');
	tableTitle.classList.add('title');
	tableTitle.innerHTML = georgian_days[day];

	tableElement.appendChild(tableTitle);

	const tableList = document.createElement('div');
	tableList.classList.add('list');


	if (day === 'times') {
		const times = await loadTimes(day);

		for (let time of times) {
			const listItem = document.createElement('div');
			listItem.classList.add('item');
			listItem.innerHTML = time;

			tableList.appendChild(listItem);
		}

	} else {
		const data = await loadTimeTable(day);

		const classes = getClasses(data);

		for (let cls of classes) {
			const listItem = document.createElement('div');
			listItem.classList.add('item');
			listItem.innerHTML = cls;

			tableList.appendChild(listItem);
		}
	}

	tableElement.appendChild(tableList);
}