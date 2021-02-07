const staticCacheName = 'site-static';
const assets = [
	'/',
	'/index.html',
	'/css/style.css',
	'/fonts/bpg_glaho_sylfaen.ttf',
	'/js/app.js',
	'/js/script.js',
	'/js/createBreakEllement.js',
	'/js/createClassEllement.js',
	'/js/loadTimeTable.js',
	'/timetable/mon.csv',
	'/timetable/tue.csv',
	'/timetable/wed.csv',
	'/timetable/thu.csv'
];

self.addEventListener('install', evt => {
	evt.waitUntil(
		caches.open(staticCacheName).then(cache => {
			console.log('caching shell assets');
			cache.addAll(assets);
		})
	)
});

// self.addEventListener('activate', evt => {
// 	console.log('service worker has been activated');
// })

self.addEventListener('fetch', evt => {
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			return cacheRes || fetch(evt.request);
		})
	)
})