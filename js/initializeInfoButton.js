const notificationVersion = "0.1.0";

function initializeInfoButton() {
	const notified =
		window.localStorage.notificationVersion === notificationVersion;

	console.log({ notified });

	if (!notified) {
		window.localStorage.setItem("notificationVersion", notificationVersion);

		alert(
			`cxrili-ს პროგრესი დროებით დაპაუზებულია. მუშაობას ალბათ 05/03/21-დან განვაგრძობ.`
		);
	}

	document.getElementById("cxrili-info").addEventListener("click", (evt) => {
		var w = window.innerWidth;
		var h = window.innerHeight;
		alert(
			`version: ${VERSION}\nwidth: ${w}\nheight: ${h}\ncxrili-ს პროგრესი დროებით დაპაუზებულია. მუშაობას ალბათ 05/03/21-დან განვაგრძობ.`
		);
	});
}
