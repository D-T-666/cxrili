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
	return evt.waitUntil(async () => {
		await fetch("/cxrili/info.json")
			.then((appInfoResponse) => appInfoResponse.json())
			.then((appInfo) => {
				cacheVersion = appInfo.version;

				return updateCache();
			});
	});
});

self.addEventListener("activate", (evt) => {
	evt.waitUntil((_) => {
		fetch("/cxrili/info.json")
			.catch((err) => {
				return new Response(
					new Blob([JSON.stringify({ status: "failed!" }, null, 2)], {
						type: "application/json",
					}),
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
			});
	});
});

self.addEventListener("fetch", async (evt) => {
	let reqList = evt.request.url.toString().split("/");

	if (reqList.includes("updateCache")) {
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
	} else {
		evt.respondWith(
			caches.match(evt.request).then((cacheRes) => {
				return cacheRes || fetch(evt.request.url);
			})
		);
	}
});
