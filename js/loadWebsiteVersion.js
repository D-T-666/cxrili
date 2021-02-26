let VERSION = "version unavailable";

const loadWebsiteVersion = async () => {
	const response = await fetch("/cxrili/version");
	let data = await response.text();
	data = JSON.parse(data);

	let elt = document.getElementById("version-number");

	VERSION = data.version;
	elt.innerHTML = data.version;
};
