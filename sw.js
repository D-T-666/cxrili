const staticCacheName = 'site-static';
const assets = [
	'cxrili/',
	'cxrili/index.html',
	'cxrili/css/style.css',
	'cxrili/fonts/bpg_glaho_sylfaen.ttf',
	'cxrili/js/app.js',
	'cxrili/js/script.js',
	'cxrili/js/createBreakEllement.js',
	'cxrili/js/createClassEllement.js',
	'cxrili/js/loadTimeTable.js',
	'cxrili/timetable/mon.csv',
	'cxrili/timetable/tue.csv',
	'cxrili/timetable/wed.csv',
	'cxrili/timetable/thu.csv'
];

self.addEventListener('install', evt => {
	evt.waitUntil(
		caches.open(staticCacheName).then(cache => {
			console.log('caching shell assets');
			cache.addAll(assets);
		})
	)
});

self.addEventListener('activate', evt => {
	console.log('service worker has been activated');
})

self.addEventListener('fetch', evt => {
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			return cacheRes || fetch(evt.request);
		})
	)
})