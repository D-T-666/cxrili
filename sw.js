const cacheVersion = 'v.1.15.3.6';
const assets = [
	'/',
	'/cxrili/',
	'/cxrili/?d=mon',
	'/cxrili/?d=tue',
	'/cxrili/?d=wed',
	'/cxrili/?d=thu',
	'/cxrili/?d=fri',
	'/cxrili/index.html',

	'/cxrili/css/root.css',
	'/cxrili/css/style.css',
	'/cxrili/css/main.css',
	'https://d-t-666.github.io/time-table/fonts/bpg_glaho_sylfaen.ttf',

	'/cxrili/js/app.js',
	'/cxrili/js/script.js',
	'/cxrili/js/buttons.js',
	'/cxrili/js/createBreakEllement.js',
	'/cxrili/js/createClassEllement.js',
	'/cxrili/js/loadTimeTable.js',
	'/cxrili/js/buildTable.js',
	'/cxrili/js/updateBlocks.js',
	'/cxrili/js/getCurrentDay.js',

	'/cxrili/timetable/mon.csv',
	'/cxrili/timetable/tue.csv',
	'/cxrili/timetable/wed.csv',
	'/cxrili/timetable/thu.csv',
	'/cxrili/timetable/fri.csv',

	'/cxrili/favicon.ico',
	'/cxrili/manifest.json',

	'/cxrili/pages/weekview/',
	'/cxrili/pages/weekview/index.html',
	'/cxrili/pages/weekview/css/style.css',
	'/cxrili/pages/weekview/js/script.js'
];

self.addEventListener('install', evt => {
	evt.waitUntil(
		caches.open(`site-static-${cacheVersion}`).then(cache => {
			console.log('caching shell assets');
			cache.addAll(assets);
		})
	)
});

self.addEventListener('activate', evt => {
	evt.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key != cacheVersion)
				.map(key => caches.delete(key))
			)
		})
	)
});

self.addEventListener('fetch', evt => {
	if (evt.request.url.toString().split('/').includes('version')){
		let data = new Blob([JSON.stringify({version: cacheVersion}, null, 2)], {type : 'application/json'});
		let res = new Response(data, {status: 200});
		evt.respondWith(res);
		return
	}
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			if (cacheRes)
				return cacheRes
			else
				return fetch(evt.request)
		})
	)
})
