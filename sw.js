const staticCacheName = 'site-static';
const assets = [
	'/cxrili/',
	'/cxrili/index.html',
	'/cxrili/css/style.css',
	'https://d-t-666.github.io/time-table/fonts/bpg_glaho_sylfaen.ttf',
	'/cxrili/js/app.js',
	'/cxrili/js/script.js',
	'/cxrili/js/createBreakEllement.js',
	'/cxrili/js/createClassEllement.js',
	'/cxrili/js/loadTimeTable.js',
	'/cxrili/timetable/mon.csv',
	'/cxrili/timetable/tue.csv',
	'/cxrili/timetable/wed.csv',
	'/cxrili/timetable/thu.csv',
	'/cxrili/favicon.ico',
	'/cxrili/manifest.json'
];

self.addEventListener('install', evt => {
	evt.waitUntil(
		caches.open(staticCacheName).then(cache => {
			console.log('caching shell assets');
			cache.addAll(assets);
		})
	)
});

self.addEventListener('fetch', evt => {
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			return cacheRes || fetch(evt.request);
		})
	)
})