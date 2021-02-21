let cacheVersion = "v.2.1.1.1";

self.addEventListener("install", (evt) => {
	evt.waitUntil(
		(async () => {
			const assetsResponse = await fetch("/cxrili/static.json");
			const assetsData = await assetsResponse.text();
			let assets = JSON.parse(assetsData).files;

			caches.open(`site-static-${cacheVersion}`).then((cache) => {
				console.log("caching shell assets");
				cache.addAll(assets);
			});
		})()
	);
});

self.addEventListener("activate", (evt) => {
	evt.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key != `site-static-${cacheVersion}`)
					.map((key) => caches.delete(key))
			);
		})
	);
});

self.addEventListener("fetch", (evt) => {
	if (evt.request.url.toString().split("/").includes("version")) {
		let data = new Blob(
			[JSON.stringify({ version: cacheVersion }, null, 2)],
			{ type: "application/json" }
		);
		let res = new Response(data, { status: 200 });
		evt.respondWith(res);
		return;
	}
	evt.respondWith(
		caches.match(evt.request).then((cacheRes) => {
			if (cacheRes) return cacheRes;
			else return fetch(evt.request);
		})
	);
});
