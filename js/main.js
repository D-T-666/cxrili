(async () => {
	await loadWebsiteVersion();
	setInterval(loadWebsiteVersion, 10000);

	await initializeTheme();

	await main();
})();
