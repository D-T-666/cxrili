function initializeButtons(){
	const workdays = ['mon', 'tue', 'wed', 'thu', 'fri'];

	const today = getCurrentDay(true);

	for(let day of workdays){
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

function buildTables(){
	
}

(() => {
	console.log('Hello, world!');
	buildTables();
	initializeButtons();
})()