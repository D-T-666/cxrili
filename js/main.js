window.addEventListener("load", () => {
	console.log("'load' event triggered");

	window.addEventListener("online", () => {
		loadWebsiteVersion();
		alert("ინტერნეტთან წვდომა აღდგენილია!");
	});
	window.addEventListener("offline", () => {
		alert("ინტერნეტთან წვდომა შეზღუდულია");
	});
});

(async () => {
	await loadWebsiteVersion();

	await initializeTheme();

	await main();
})();
