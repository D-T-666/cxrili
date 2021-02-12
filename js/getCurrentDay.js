function getCurrentDay(real) {
	const DAYS = ['mon', 'mon', 'tue', 'wed', 'thu', 'fri', 'mon'];
	
	let d = new Date();

	// Get the URL parameter
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const url_Day = urlParams.get('d');

	if (real)
		return DAYS[d.getDay()];
	else
		return url_Day || DAYS[d.getDay()];
}