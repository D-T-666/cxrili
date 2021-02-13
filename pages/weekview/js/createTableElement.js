function createTableElement(day){
	let tableElement = document.createElement('div');
	tableElement.classList.add('table');
	tableElement.id = `${day}-table`;

	document.getElementById('root-div').appendChild(tableElement);
}