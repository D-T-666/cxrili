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
			if (
				confirm(
					`cxrili version: ${VERSION}\n\nchangelog:\n${updateMessage}\n\nგაქვს რაიმე კარგი იდეან ან პრობლემა?`
				)
			) {
				window.location =
					"https://docs.google.com/forms/d/e/1FAIpQLSftI2MmEJyTZCgSSb5CzLfq9oBB94mzWRcWlRGnS09Pg1qm8A/viewform?usp=sf_link";
			}
		});

	document.getElementById("home").addEventListener("click", (evt) => {
		window.location = "/cxrili/pages/home/";
	});
}
