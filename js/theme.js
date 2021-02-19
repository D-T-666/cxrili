function initializeThemeButton() {
	document
		.getElementById("theme-switcher")
		.addEventListener("click", (evt) => {
			const myStorage = window.localStorage;

			const darkTheme = document.body.classList.toggle("dark-theme");

			myStorage.setItem("colorTheme", darkTheme);

			console.log({ darkTheme });
		});
}

function initializeTheme() {
	const myStorage = window.localStorage;

	const darkTheme = myStorage.getItem("colorTheme") == "true";

	if (darkTheme) {
		document.body.classList.add("dark-theme");
	} else {
		document.body.classList.remove("dark-theme");
	}

	initializeThemeButton();

	console.log({ darkTheme });
}
