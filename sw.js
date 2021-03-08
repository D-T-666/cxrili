let cacheVersion = "unknown";
let previousUpdateMessage = "";
// Versioning scheme:
// # . # . # . #
// |   |   |   |
// |   |   |   > timetable updates, minor bug fixes
// |   |   > major bug fixes, feature updates, design updates
// |   > major feature updates, restructuring updates, big cleanups
// > versions

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
				console.log(`service worker installed. app info: ${appInfo}`);
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
				console.log(`service worker activated. app info: ${appInfo}`);
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
			fetch("/cxrili/info.json")
				.then((appInfoResponse) => {
					return appInfoResponse.json();
				})
				.then((appInfo) => {
					if (appInfo && cacheVersion !== appInfo.version) {
						cacheVersion = appInfo.version;
						previousUpdateMessage = appInfo.message;
						updateCache();

						return new Response(
							new Blob(
								[
									JSON.stringify(
										{ ...appInfo, updated: true },
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
					}
					return new Response(
						new Blob(
							[
								JSON.stringify(
									{
										...appInfo,
										updated:
											appInfo &&
											cacheVersion !== appInfo.version,
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
				.catch((err) => {
					return new Response(
						new Blob(
							[
								JSON.stringify(
									{
										version: cacheVersion,
										message: previousUpdateMessage,
										updated: false,
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
