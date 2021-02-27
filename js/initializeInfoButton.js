function initializeInfoButton() {
	document.getElementById("cxrili-info").addEventListener("click", (evt) => {
		var w = window.innerWidth;
		var h = window.innerHeight;
		alert(
			`version: ${VERSION}\nwidth: ${w}\nheight: ${h}\ncxrili-ს პროგრესი დროებით დაპაუზებულია. მუშაობას ალბათ 05/03/21-ში განვაგრძობ.`
		);
	});
}
