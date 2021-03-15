window.addEventListener(
	"load",
	() => {
		console.log("'load' event triggered");

		window.addEventListener("online", () => {
			loadWebsiteVersion();
			alert("ინტერნეტთან წვდომა აღდგენილია!");
		});
		window.addEventListener("offline", () => {
			alert("ინტერნეტთან წვდომა შეზღუდულია");
		});
	},
	false
);

(async () => {
	loadWebsiteVersion().then((a) => initializeInfoButton());

	await initializeTheme();

	await main();
})();
