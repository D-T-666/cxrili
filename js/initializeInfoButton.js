const initializeInfoButton = async () => {
	// Check if the previous update message is the same as the current one
	const notified = window.localStorage.updateMessage === updateMessage;

	// If not, print the message and update the previous message variable
	if (!notified) {
		window.localStorage.setItem("updateMessage", updateMessage);

		//  -- REMOVE LATER --
		// Clear out old localStorage Item
		window.localStorage.removeItem("notificationVersion");
		//  -- REMOVE LATER --

		alert(updateMessage);
	}

	document
		.getElementById("cxrili-info")
		.addEventListener("click", async (evt) => {
			const promptMessage = `cxrili version: ${VERSION}\n\nchangelog:\n${updateMessage}\n\nგაქვს რაიმე კარგი იდეა ან პრობლემა?`;
			const formLink =
				"https://docs.google.com/forms/d/e/1FAIpQLSftI2MmEJyTZCgSSb5CzLfq9oBB94mzWRcWlRGnS09Pg1qm8A/viewform?usp=sf_link";
			if (confirm(promptMessage)) {
				window.location = formLink;
			}
		});

	const homeButton = document.getElementById("home");
	if (homeButton) {
		homeButton.addEventListener("click", (evt) => {
			window.location = "/cxrili/pages/home/";
		});
	}
};
