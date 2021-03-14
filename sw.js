let cacheVersion = "unknown";
let previousUpdateMessage = "";

const cachedTables = new Set();

async function updateCache() {
	return fetch("/cxrili/static.json")
		.then((assetsResponse) => assetsResponse.json())
		.then((assets) => {
			return caches.open(`site-static-${cacheVersion}`).then((cache) => {
				cache.addAll(assets.files);

				caches.keys().then((keys) => {
					return Promise.all(
						keys
							.filter(
								(key) => key != `site-static-${cacheVersion}`
							)
							.map((key) => caches.delete(key))
					);
				});
			});
		});
}

const getAppInfoResponse = async () => {
	return fetch("/cxrili/info.json").then((appInfoResponse) => {
		if (appInfoResponse) return appInfoResponse;
		else return caches.match(evt.request).then((cacheRes) => cacheRes);
	});
};

self.addEventListener("install", (evt) => {
	evt.waitUntil(
		fetch("/cxrili/info.json")
			.then((appInfoResponse) => appInfoResponse.json())
			.then((appInfo) => {
				console.log(
					`service worker installed. app version - ${appInfo.version}`
				);
				cacheVersion = appInfo.version;
				previousUpdateMessage = appInfo.message;

				updateCache();
			})
	);
});

self.addEventListener("activate", (evt) => {
	evt.waitUntil(
		fetch("/cxrili/info.json")
			.then((appInfoResponse) => appInfoResponse.json())
			.then((appInfo) => {
				console.log(
					`service worker activated. app version - ${appInfo.version}`
				);
				if (appInfo && cacheVersion !== appInfo.version) {
					cacheVersion = appInfo.version;
					previousUpdateMessage = appInfo.message;

					updateCache();
				}
			})
	);
});

self.addEventListener("fetch", (evt) => {
	let reqList = evt.request.url.toString().split("/");

	if (reqList.includes("info.json")) {
		evt.respondWith(
			(async () => {
				let data = await fetch("/cxrili/info.json")
					.then((appInfoResponse) => {
						return appInfoResponse.json();
					})
					.then((appInfo) => {
						if (cacheVersion !== appInfo.version) {
							previousUpdateMessage = appInfo.message;
							updateCache();
						}
						return {
							...appInfo,
							updated:
								cacheVersion !== "unknown" &&
								cacheVersion !==
									(cacheVersion = appInfo.version),
							offline: false,
						};
					})
					.catch((err) => {
						return {
							version: cacheVersion,
							message: previousUpdateMessage,
							offline: true,
							updated: false,
						};
					});

				return new Response(
					new Blob([JSON.stringify(data, null, 2)], {
						type: "application/json",
					}),
					{ status: 200 }
				);
			})()
		);
	} else if (reqList.includes("timetable")) {
		if (reqList.includes("tables.json")) {
			evt.respondWith(
				caches
					.match(evt.request)
					.then((cacheRes) => cacheRes.json())
					.then((tables) => {
						return new Response(
							new Blob(
								[
									JSON.stringify(
										{
											...tables,
											savedTables: Array.from(
												cachedTables
											),
										},
										null,
										2
									),
								],
								{
									type: "application/json",
								}
							),
							{ status: 200 }
						);
					})
					.catch((err) => fetch(evt.request.url))
			);
		} else {
			evt.respondWith(
				caches.match(evt.request).then((cacheRes) => {
					if (cacheRes) {
						cachedTables.add(
							decodeURIComponent(reqList[reqList.length - 2])
						);
						return cacheRes;
					} else {
						caches
							.open(`site-static-${cacheVersion}`)
							.then((cache) =>
								cache.addAll(
									["mon", "tue", "wed", "thu", "fri"].map(
										(a) =>
											`/cxrili/timetable/${
												reqList[reqList.length - 2]
											}/${a}.csv`
									)
								)
							)
							.then((res) =>
								cachedTables.add(
									decodeURIComponent(
										reqList[reqList.length - 2]
									)
								)
							);
						return fetch(evt.request.url);
					}
				})
			);
		}
	} else {
		evt.respondWith(
			caches
				.match(evt.request)
				.then((cacheRes) => cacheRes || fetch(evt.request.url))
		);
	}
});
