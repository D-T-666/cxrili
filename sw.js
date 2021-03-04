let cacheVersion = "unknown";
// Versioning scheme:
// # . # . # . #
// |   |   |   |
// |   |   |   > timetable updates, minor bug fixes
// |   |   > major bug fixes, feature updates, design updates
// |   > major feature updates, restructuring updates, big cleanups
// > versions

async function updateCache() {
	return await fetch("/cxrili/static.json")
		.then((assetsResponse) => assetsResponse.json())
		.then((assets) => {
			console.log(assets);

			return caches.open(`site-static-${cacheVersion}`).then((cache) => {
				console.log("caching shell assets");
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

self.addEventListener("install", (evt) => {
	evt.waitUntil(async () => {
		await fetch("/cxrili/info.json")
			.then((appInfoResponse) => appInfoResponse.json())
			.then((appInfo) => {
				console.log(`sw activated. app info: ${appInfo}`);
				cacheVersion = appInfo.version;

				return updateCache();
			});
	});
});

self.addEventListener("activate", (evt) => {
	// evt.waitUntil(
	// 	fetch("/cxrili/info.json")
	// 		.then((appInfoResponse) => appInfoResponse.json())
	// 		.then((appInfo) => {
	// 			console.log(`sw activated. app info: ${appInfo}`);
	// 			if (appInfo && cacheVersion !== appInfo.version) {
	// 				cacheVersion = appInfo.version;

	// 				return updateCache();
	// 			}
	// 		})
	// );

	evt.waitUntil(async () => {
		await fetch("/cxrili/info.json")
			.then((appInfoResponse) => appInfoResponse.json())
			.then((appInfo) => {
				console.log(`sw activated. app info: ${appInfo}`);
				if (appInfo && cacheVersion !== appInfo.version) {
					cacheVersion = appInfo.version;

					return updateCache();
				}
			});
	});
});

self.addEventListener("fetch", async (evt) => {
	let reqList = evt.request.url.toString().split("/");

	if (reqList.includes("updateCache") || reqList.includes("version")) {
		evt.respondWith(
			fetch("/cxrili/info.json")
				.catch((err) => {
					return new Response(
						new Blob(
							[JSON.stringify({ status: "failed!" }, null, 2)],
							{
								type: "application/json",
							}
						),
						{ status: 404 }
					);
				})
				.then((appInfoResponse) => appInfoResponse.json())
				.then((appInfo) => {
					if (appInfo && cacheVersion !== appInfo.version) {
						cacheVersion = appInfo.version;

						updateCache();
					}

					return new Response(
						new Blob(
							[JSON.stringify({ status: "success!" }, null, 2)],
							{
								type: "application/json",
							}
						),
						{ status: 200 }
					);
				})
		);
	} else if (reqList.includes("info.json")) {
		evt.respondWith(
			fetch("/cxrili/info.json")
				.catch((err) => {
					caches.match(evt.request).then((cacheRes) => {
						return cacheRes;
					});
				})
				.then((appInfoResponse) => appInfoResponse)
		);
	} else {
		evt.respondWith(
			caches.match(evt.request).then((cacheRes) => {
				return cacheRes || fetch(evt.request.url);
			})
		);
	}
});
