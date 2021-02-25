function initializeInfoButton() {
	document.getElementById("cxrili-info").addEventListener("click", (evt) => {
		alert(`version: ${VERSION}\nThanks for using cxrili!`);
	});
}
