function getClasses(data) {
	const classes = data.filter(event => event.name != 'break');

	const classList = classes.map(cls => cls.name);

	return classList;
}

async function createTableElement(day) {
	const data = await loadTimeTable(day);

	const classes = getClasses(data);

	console.log({ day, classes });

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

	for (let cls of classes) {
		const listItem = document.createElement('div');
		listItem.classList.add('item');
		listItem.innerHTML = cls;

		tableList.appendChild(listItem);
	}

	tableElement.appendChild(tableList);

}