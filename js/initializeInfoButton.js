async function initializeInfoButton() {
	const notified = window.localStorage.updateMessage === updateMessage;

	if (!notified) {
		window.localStorage.setItem("updateMessage", updateMessage);

		// Clear out old localStorage Item -- REMOVE LATER --
		window.localStorage.removeItem("notificationVersion");

		alert(updateMessage);
	}

	document
		.getElementById("cxrili-info")
		.addEventListener("click", async (evt) => {
			await fetch("/cxrili/updateCache");

			alert(`cxrili version: ${VERSION}\n\nchangelog:\n${updateMessage}`);
		});

	document.getElementById("home").addEventListener("click", (evt) => {
		window.location = "/cxrili/pages/home/";
	});
}
