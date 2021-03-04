async function initializeInfoButton() {
	const notified = window.localStorage.updateMessage === updateMessage;

	if (!notified) {
		window.localStorage.setItem("updateMessage", updateMessage);

		// Clear out old localStorage Item -- REMOVE LATER --
		window.localStorage.removeItem("notificationVersion");

		alert(updateMessage);
	}

	document.getElementById("cxrili-info").addEventListener("click", (evt) => {
		alert(`cxrili version: ${VERSION}\n\nchangelog:\n${updateMessage}`);
	});
}
