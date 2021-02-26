function initializeInfoButton() {
	document.getElementById("cxrili-info").addEventListener("click", (evt) => {
		var w = window.innerWidth;
		var h = window.innerHeight;
		alert(
			`version: ${VERSION}\nwidth: ${w}\nheight: ${h}\nThanks for using cxrili!`
		);
	});
}
