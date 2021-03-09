let VERSION = "version unavailable";
let updateMessage = undefined;

const loadWebsiteVersion = async () => {
	await fetch("/cxrili/info.json")
		.then((res) => res.json())
		.then((appInfo) => {
			VERSION = appInfo.version;
			updateMessage = appInfo.message;

			if (appInfo.updated) {
				if (confirm("ახალი ვერსია ხელმისაწვდომია!\nგსურს განახლება?"))
					window.location.reload();
			}
		});
};
