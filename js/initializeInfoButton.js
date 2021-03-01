const notificationVersion = "0.1.1";

function initializeInfoButton() {
	const notified =
		window.localStorage.notificationVersion === notificationVersion;

	console.log({ notified });

	if (!notified) {
		window.localStorage.setItem("notificationVersion", notificationVersion);

		alert(
			`გაფუჭებული რაც იყო შევასწორე, წესით ყველაფერმა რიგზე უნდა იმუშავოს.\n\nმაგრამ რამის დამატებას ჯერ არ ვაპირებ 05/03/21-მდე.`
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
