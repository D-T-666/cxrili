function initializeThemeButton() {
	document
		.getElementById("theme-switcher")
		.addEventListener("click", (evt) => {
			const myStorage = window.localStorage;

			const darkTheme = document.body.classList.toggle("dark-theme");

			myStorage.setItem("colorTheme", darkTheme);
		});
}

async function initializeTheme() {
	const myStorage = window.localStorage;

	const darkTheme = myStorage.getItem("colorTheme") == "true";

	if (darkTheme) {
		document.body.classList.add("dark-theme");
		document.getElementById("theme-color").content = "#1d1d22";
	} else {
		document.body.classList.remove("dark-theme");
		document.getElementById("theme-color").content = "#e4d2b8";
	}

	initializeThemeButton();
}
