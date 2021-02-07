const staticCacheName = 'site-static-v.1.10';
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
	'/cxrili/icons/32x32.png',
	'/cxrili/icons/48x48.png',
	'/cxrili/icons/64x64.png',
	'/cxrili/icons/96x96.png',
	'/cxrili/icons/128x128.png',
	'/cxrili/icons/160x160.png',
	'/cxrili/icons/512x512.png',
	'/cxrili/icons/calendar.svg',
	'/cxrili/favicon.ico',
	'/cxrili/manifest.json',
	'/favicon.ico'
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
	evt.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key != staticCacheName)
				.map(key => caches.delete(key))
			)
		})
	)
});

self.addEventListener('fetch', evt => {
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			if(cacheRes != undefined)
				return cacheRes
			else
				return fetch(evt.request)
		})
	)
})