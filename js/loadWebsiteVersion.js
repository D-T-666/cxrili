let VERSION = "version unavailable";
let updateMessage = undefined;

const loadWebsiteVersion = async () => {
	const response = await fetch("/cxrili/info.json");
	let appInfo = await response.json();

	VERSION = appInfo.version;
	updateMessage = appInfo.message;
};
