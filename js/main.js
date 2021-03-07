(async () => {
	await fetch("/cxrili/updateCache")
		.then((res) => res.json())
		.then((status) => {
			if (status.updated) {
				window.location.reload();
			}
		});

	setInterval(() => {
		fetch("/cxrili/updateCache")
			.then((res) => res.json())
			.then((status) => {
				if (status.updated) {
					alert("განახლება!");
					window.location.reload();
				}
			});
	}, 10000);

	await loadWebsiteVersion();

	await initializeTheme();

	await main();
})();
