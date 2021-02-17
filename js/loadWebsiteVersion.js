const loadWebsiteVersion = async () => {
	const response = await fetch('/cxrili/version');
	let data = await response.text();
	data = JSON.parse(data);

	let elt = document.getElementById('version-number');

	elt.innerHTML = data.version;
};