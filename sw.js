self.addEventListener("install", function (e) {
	self.setTimeout(self.skipWaiting(), 2000);
});

self.addEventListener("activate", function (e) {
	self.registration
		.unregister()
		.then(function () {
			return self.clients.matchAll();
		})
		.then(function (clients) {
			clients.forEach((client) => client.navigate(client.url));
		});
});

self.addEventListener("fetch", (evt) => {
	if (evt.request.url === "https://d-t-666.github.io/cxrili/") {
		evt.respondWith(
			new Response(
				new Blob(
					[
						"<html><body><h1>გამთიშე და თავიდან ჩამრთე გასაახლებლად</h1><h3>სხვანაირად ვერ იხილავ ვებსაიტს</h3></body></html>",
					],
					{
						type: "text/html",
					}
				),
				{ status: 200 }
			)
		);
	} else {
		evt.respondWith(fetch(evt.request.url));
	}
});
